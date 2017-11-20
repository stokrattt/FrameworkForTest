module.exports = function main(SF, JS, MF, LF, JSstep, VD, V, By, until,FileDetector, system, condition, config,constants) {
    global.fiber = Fiber.current;
    V.client = {};
    V.client.name = SF.randomBukva(6) + '_t';
    V.client.fam = SF.randomBukva(6) + '_t';
    V.client.phone = SF.randomCifra(10);
    V.client.email = SF.randomBukvaSmall(6) + '@' + SF.randomBukvaSmall(4) + '.tes';
    V.client.passwd = 123;

    //=========================начинаем писать тест=============================

condition.nowWeDoing = 'создаем пекинг дей с фронта';
    SF.get(V.adminURL);
    LF.LoginToBoardAsCustom(V.adminLogin,V.adminPassword);
    LF.CreatePackingDayFromBoard(V.client);
    LF.addInventoryBoard ();
    MF.EditRequest_SetAdressFrom ();
    MF.EditRequest_SetToNotConfirmed();
    SF.sleep(2);
    V.boardNumbers = {};
    LF.RememberDigitsRequestBoard(V.boardNumbers);
    JS.step(JSstep.selectTruck((V.boardNumbers.LaborTimeMax + V.boardNumbers.TravelTime)/60));
    MF.WaitWhileBusy();
    MF.EditRequest_SaveChanges();
    MF.EditRequest_OpenClient();
    V.client.passwd = 123;
    LF.SetClientPasswd(V.client.passwd);
    MF.EditRequest_OpenSettings();
    LF.SetManager('emilia');
    MF.EditRequest_OpenLogs();
    MF.EditRequest_Check1EmailExist(V.client.email, "Thank you for submitting a quote.");
    MF.EditRequest_Check1EmailExist(V.client.email, "How To Work With Your New Account.");
    MF.EditRequest_Check1EmailExist(V.client.email, "Packing Not Confirm Day");
    MF.EditRequest_Check1EmailExist(V.adminEmail, "Request Quote (Pending Status)");
    MF.EditRequest_Check1EmailExist(V.client.email, "Packing Day");
    SF.click(By.xpath('//span[@ng-bind-html="toTrustedHTML(item.text)"][contains(text(),"Packing Not Confirm Day")]' +
        '[contains(text(),"'+V.client.email+'")]/../../../following-sibling::div[1]'));
    driver.wait(driver.findElement(By.xpath('//h3[contains(text(),"Logistic")]/../../../../../../' +
        'following-sibling::td[1]//div')).getText().then(function(text){
            V.PackingDayQuoteMin = SF.cleanPrice(text.substring(text.indexOf('$'), text.indexOf('-')));
            V.PackingDayQuotelMax = SF.cleanPrice(text.substring(text.indexOf('$', text.indexOf('$') + 3)));
        }),config.timeout);
    SF.sleep(2);
    VD.IWant(VD.ToEqual, V.PackingDayQuoteMin, V.boardNumbers.TotalMin, 'в письме клиенту  тотал min отправился неверный');
    VD.IWant(VD.ToEqual, V.PackingDayQuotelMax, V.boardNumbers.TotalMax, 'в письме клиенту  тотал max отправился неверный');
    MF.EditRequest_CloseEditRequest();
    MF.Board_LogoutAdmin ();

condition.nowWeDoing = 'идем в аккаунт букать работу';
    SF.get(V.accountURL);
    LF.LoginToAccountAsClient (V.client, V.client.passwd);
    MF.Account_CheckRequestStatus_NotConfirmed(V.boardNumbers.Id);
    MF.Account_OpenRequest(V.boardNumbers.Id);
    MF.Account_ClickViewRequest();
    V.accountNumbers = {};
    LF.RememberAccountNumbers(V.accountNumbers);
    LF.Validation_Compare_Account_Admin (V.accountNumbers, V.boardNumbers);
    MF.Account_ClickProceedBookYourMove();

condition.nowWeDoing = 'перешли на конфирмейшн пейдж и сравним данные с бордом и потом букаем работу';
    V.ConfirmationPage = {};
    driver.wait(driver.findElement(By.xpath('//h2[contains(text(), "Estimated Quote")]/following-sibling::div[1]/div/div')).getText().then(function (text) {
        if (text.indexOf('$', text.indexOf('$') + 3) !== -1) {
            V.ConfirmationPage.TotalMin = SF.cleanPrice(text.substring(text.indexOf('$'), text.indexOf('-')));
            V.ConfirmationPage.TotalMax = SF.cleanPrice(text.substring(text.indexOf('$', text.indexOf('$') + 3)));
        } else {
            V.ConfirmationPage.Total = SF.cleanPrice(text);
        }
    }),config.timeout);
    SF.sleep(1);
    driver.wait(driver.findElement(By.xpath('//h2[contains(text(),"Fuel Surcharge")]/..')).getText().then(function(text){
        V.ConfirmationPage.Fuel = SF.cleanPrice(text.substring(text.indexOf('$')));
    }),config.timeout);
    SF.sleep(1);
    VD.IWant(VD.ToEqual, V.ConfirmationPage.TotalMin, V.boardNumbers.TotalMin, 'не совпали TotalMin в конфирмейшн пейдж и борда до резервации');
    VD.IWant(VD.ToEqual, V.ConfirmationPage.TotalMax, V.boardNumbers.TotalMax, 'не совпали TotalMax в конфирмейшн пейдж и борда до резервации');
    VD.IWant(VD.ToEqual, V.ConfirmationPage.Fuel, V.boardNumbers.Fuel, 'не совпали Fuel в конфирмейшн пейдж и борда до резервации');
    SF.sleep(1);
    MF.Account_ConfirmationBackToRequest ();
    LF.ConfirmRequestInAccount_WithReservation();
    MF.Account_WaitForGreenTextAfterConfirm();
    LF.LogoutFromAccount();

condition.nowWeDoing = 'идем в админку в локал диспач и назначаем команду';
    SF.get(V.adminURL);
    LF.LoginToBoardAsCustom(V.adminLogin,V.adminPassword);
    MF.Board_OpenLocalDispatch();
    LF.findDayInLocalDispatch(V.boardNumbers.moveDate.Year, V.boardNumbers.moveDate.Month, V.boardNumbers.moveDate.Day);
    MF.WaitWhileBusy();
    MF.Dispatch_GridView();
    LF.SelectRequestDispatch(V.boardNumbers.Id);
    LF.selectCrew(V.foremanName);
    LF.OpenRequestDispatch(V.boardNumbers.Id);
    MF.WaitWhileBusy ();
    MF.EditRequest_OpenLogs();
    MF.EditRequest_Check1EmailExist(V.client.email, "Packing Day");
    MF.EditRequest_Check1EmailExist(V.client.email, "YOUR MOVE IS CONFIRMED AND SCHEDULED!");
    MF.EditRequest_Check1EmailExist(V.adminEmail, "Send to Admin when confirmed");
    MF.EditRequest_Check1EmailExist(V.foremanEmail, "Send TO Foreman");
    LF.closeEditRequest();
    MF.Board_LogoutAdmin();

condition.nowWeDoing = 'заходим под форменом, открываем контракт';
    LF.LoginToBoardAsCustomForeman(V.foremanLogin, V.foremanPassword);
    LF.OpenRequestInForemanPage(V.boardNumbers.Id);
    MF.Contract_WaitConfirmationPage();
    MF.Contract_OpenBillOfLading();
    SF.sleep(1);
    LF.MakeSignInContract();
    LF.MakeSignInContract();
    MF.Contract_DeclarationValueA();
    LF.MakeSignInContract();
    LF.MakeSignInContract();
    LF.MakeSignInContract();
    MF.Contract_ClickPay();
    MF.Contract_ClickTips10();
    MF.Contract_ClickAddTips();
    MF.Contract_ClickPaymentInfo();
    LF.FillCardPayModal();
    LF.Contract_SignMainPayment();
    driver.wait(new FileDetector().handleFile(driver, system.path.resolve('./files/squirrel.jpg')).then(function (path) {
        V.path = path;
    }), config.timeout);
    SF.sleep(3);
    MF.Contract_UploadImage(V.path);
    MF.Contract_UploadImage(V.path);
    MF.Contract_SaveImages();
    LF.MakeSignInContract();
    LF.MakeSignInContract();
    V.contractNumbers = {};
    MF.Contract_Submit(V.contractNumbers);
    MF.Contract_ReturnToForeman();
    LF.LogoutFromBoardForeman();

condition.nowWeDoing = 'возвращаемся в диспатч, смотрим пейролл';
    LF.LoginToBoardAsCustom(V.adminLogin,V.adminPassword);
    MF.Board_OpenLocalDispatch();
    LF.findDayInLocalDispatch(V.boardNumbers.moveDate.Year, V.boardNumbers.moveDate.Month, V.boardNumbers.moveDate.Day);
    MF.WaitWhileBusy();
    MF.Dispatch_GridView();
    MF.Dispatch_ShowDoneJobs();
    LF.OpenRequestDispatch(V.boardNumbers.Id);
    MF.EditRequest_WaitForBalanceVisible();
    LF.RememberDigitsRequestBoard_Down(V.boardNumbers);
    MF.EditRequest_ScrollDown();
    VD.IWant(VD.ToEqual, V.boardNumbers.Balance, 0, 'Баланс после закрытия не равен 0');
    MF.EditRequest_OpenPayroll();
    SF.sleep (2);
    LF.RememberAndValidatePayroll_In_EditRequest(V.managerName, V.boardNumbers, V.contractNumbers);
    SF.sleep (2);
    MF.EditRequest_CloseModal();
    LF.closeEditRequest();

condition.nowWeDoing = 'сейчас идём в пейролл';
    MF.Board_OpenPayroll();
    LF.selectDateInPayroll(V.boardNumbers.moveDate);
    LF.findTestForemanInPayroll(V.foremanName);

condition.nowWeDoing = 'выбираем цифры формена';
    V.payrollNumbers = {
        Foreman:{}, Sale:{}
    };
    MF.Payroll_getTotalById(V.boardNumbers.Id, V.payrollNumbers.Foreman);
    VD.IWant(VD.ToEqual, V.payrollNumbers.Foreman.Total, V.boardNumbers.Payroll.foremanForCommission.total, 'не совпали цифры в Payroll foreman\n' +
        'id=' + V.boardNumbers.Id);
    MF.Payroll_ClickAllDepartment();
    MF.WaitWhileBusy();

condition.nowWeDoing = 'выбираем цифры менеджера';
    LF.findSaleInPayroll(V.managerName);
    MF.Payroll_getTotalById(V.boardNumbers.Id, V.payrollNumbers.Sale);
    VD.IWant(VD.ToEqual, V.payrollNumbers.Sale.Total, V.boardNumbers.Payroll.managerForCommission.total, 'не совпали цифры в Payroll manager\n' +
        'id=' + V.boardNumbers.Id);
    SF.sleep(3);
    //=========================закончили писать тест=============================
    SF.endOfTest();
};
