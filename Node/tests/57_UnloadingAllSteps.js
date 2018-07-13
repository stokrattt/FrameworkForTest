module.exports = function main(SF, JS, MF, LF, JSstep, VD, V, By, until,FileDetector, system, condition, config,constants){
    global.fiber = Fiber.current;
    V.client = {};
    V.client.name = SF.randomBukva(6) + '_t';
    V.client.fam = SF.randomBukva(6) + '_t';
    V.client.phone = SF.randomCifra(10);
    V.client.email = SF.randomBukvaSmall(6) + '@' + SF.randomBukvaSmall(4) + '.tes';
    V.client.passwd = 123;
    SF.get(V.frontURL);
    
condition.nowWeDoing = 'заполняем калькулятор верхний';
    LF.FullSmallCalcAsUnloading(V.client);

condition.nowWeDoing = 'первый раз в аккаунте';
    MF.Account_ClickViewRequest();
    MF.Account_ClickPartialPacking();
    LF.AccountUnloadingEnterAddress();
    LF.AccountLocalAddInventory();
    LF.AccountUnLoadingDetails();
    MF.Account_WaitForInventoryCheck();
    MF.Account_WaitForDetailsCheck();
    V.accountNumbers={};
    LF.RememberAccountNumbers(V.accountNumbers);
    // LF.addToCleanerJob(V.accountNumbers.Id);
    SF.click(By.xpath('//a[@ng-click="openModal()"]'));
    JS.waitForExist('input[ng-model=\\"client.mail\\"]');
    SF.clear(By.xpath('//input[@ng-model="client.mail"]'));
    V.client.newEmail = SF.randomBukvaSmall(6) + '@' + SF.randomBukvaSmall(4) + '.tes';
    SF.send(By.xpath('//input[@ng-model="client.mail"]'),V.client.newEmail);
    JS.click('button[ng-click=\\"update(client)\\"]:visible');
    MF.WaitWhileBusy();
    SF.sleep(1);
    driver.wait(driver.findElement(By.xpath('//address/i[@class="icon-envelope"]/following-sibling::span')).getText().then(function(text){
        VD.IWant(VD.ToEqual, V.client.newEmail, text, 'не совпали Email на акаунте после изменения на акаунте');
    }),config.timeout);
    LF.LogoutFromAccount();

condition.nowWeDoing = 'первый раз в админке';
    SF.get(V.adminURL);
    LF.LoginToBoardAsCustom(V.adminLogin,V.adminPassword);
    MF.Board_OpenRequest(V.accountNumbers.Id);
    V.boardNumbers = {};
    LF.RememberDigitsRequestBoard(V.boardNumbers);
    LF.Validation_Compare_Account_Admin(V.accountNumbers, V.boardNumbers);
    JS.step(JSstep.selectTruck((V.boardNumbers.LaborTimeMax + V.boardNumbers.TravelTime)/60));
    MF.WaitWhileBusy();
    MF.EditRequest_OpenSettings();
    LF.SetManager('emilia');
    MF.EditRequest_OpenClient();
    SF.waitForVisible(By.xpath('//input[@ng-model="client.mail"]'));
    driver.wait(driver.findElement(By.xpath('//input[@ng-model="client.mail"]')).getAttribute('value').then(function(text){
        VD.IWant(VD.ToEqual, V.client.newEmail, text, 'не совпали client email в реквесте после изменения на акаунте');
    }),config.timeout);
    SF.clear(By.xpath('//input[@ng-model="client.mail"]'));
    SF.send(By.xpath('//input[@ng-model="client.mail"]'),V.client.email);
    LF.SetClientPasswd(V.client.passwd);
    MF.EditRequest_OpenLogs();
    MF.EditRequest_Check1EmailExist(V.client.email, "Thank you for submitting a quote.");
    MF.EditRequest_Check1EmailExist(V.client.email, "How To Work With Your New Account.");
    MF.EditRequest_Check1EmailExist(V.client.email, "Unloading created (Pending)");
    MF.EditRequest_Check1EmailExist(V.adminEmail, "New Request Notification");
    MF.EditRequest_OpenRequest();
    MF.EditRequest_SetToNotConfirmed();
    MF.EditRequest_SaveChanges();
    MF.EditRequest_OpenLogs();
    MF.EditRequest_Check1EmailExist(V.client.email, "Unloading Not Confirmed");
    LF.closeEditRequest();
    MF.Board_LogoutAdmin();

condition.nowWeDoing = 'второй раз в аккаунте, конфёрмим';
    SF.get(V.accountURL);
    LF.LoginToAccountAsClient(V.client);
    MF.Account_CheckRequestStatus_NotConfirmed(V.accountNumbers.Id);
    MF.Account_OpenRequest(V.accountNumbers.Id);
    V.accountNumbers={};
    LF.RememberAccountNumbers(V.accountNumbers);
    driver.wait(driver.findElement(By.xpath('//address/i[@class="icon-envelope"]/following-sibling::span')).getText().then(function(text){
        VD.IWant(VD.ToEqual, V.client.email, text, 'не совпали Email на акаунте после изменения на акаунте');
    }),config.timeout);
    LF.Validation_Compare_Account_Admin(V.accountNumbers, V.boardNumbers);
    LF.ConfirmRequestInAccount_WithReservation();
    MF.Account_WaitForGreenTextAfterConfirm();
    MF.Account_OpenMessage();
    MF.BoardAccount_SendMessage('first message');
    LF.LogoutFromAccount();

condition.nowWeDoing = 'второй раз в админке, локал диспатч';
    SF.get(V.adminURL);
    LF.LoginToBoardAsCustom(V.adminLogin,V.adminPassword);
    MF.Board_OpenMessage ();
    SF.click (By.xpath('//tr[@ng-click="showComments(request)"]/td[contains(text(), "'+V.accountNumbers.Id+'")]'));
    MF.WaitWhileBusy ();
    MF.BoardAccount_SendMessage('some message');
    MF.Board_OpenLocalDispatch();
    LF.findDayInLocalDispatch(V.boardNumbers.moveDate.Year, V.boardNumbers.moveDate.Month, V.boardNumbers.moveDate.Day);
    MF.Dispatch_GridView();
    LF.SelectRequestDispatch(V.accountNumbers.Id);
    V.foremanName = 'Test Foreman';
    LF.selectCrew(V.foremanName);
    LF.OpenRequestDispatch(V.accountNumbers.Id);
    SF.sleep(60); //почта на бэк перенесена и потому так долго отправляется письмо
    MF.EditRequest_OpenLogs();
    MF.EditRequest_Check1EmailExist(V.client.email, "Unloading Confirmed");
    MF.EditRequest_Check1EmailExist(V.client.email, 'New Message From emilia');
    MF.EditRequest_Check1EmailExist(V.adminEmail, "Send to Admin when confirmed");
    MF.EditRequest_Check1EmailExist(V.foremanEmail, "New Job");
    LF.closeEditRequest();
    MF.Board_LogoutAdmin();

condition.nowWeDoing = 'заходим под форменом, открываем контракт';
    LF.LoginToBoardAsCustomForeman(V.foremanLogin, V.foremanPassword);
    LF.OpenRequestInForemanPage(V.accountNumbers.Id);
    MF.Contract_WaitConfirmationPage();
    MF.Contract_OpenBillOfLading();
    driver.wait(driver.executeScript(JSstep.CheckSumsInContract).then(function (costs) {
        VD.IWant(VD.ToEqual, costs.sumPacking, costs.totalPacking, 'Не совпали суммы Packing');
        VD.IWant(VD.ToEqual, costs.sumServices, costs.totalServices, 'Не совпали суммы Services');
    }),config.timeout);
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
    SF.sleep(1);
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
    MF.Dispatch_GridView();
    MF.Dispatch_ShowDoneJobs();
    LF.OpenRequestDispatch(V.accountNumbers.Id);
    MF.EditRequest_WaitForBalanceVisible();
    LF.RememberDigitsRequestBoard_Down(V.boardNumbers);
    MF.EditRequest_ScrollDown();
    VD.IWant(VD.ToEqual, V.boardNumbers.Balance, 0, 'Баланс после закрытия не равен 0');
    MF.EditRequest_OpenPayroll();
    V.managerName = 'emilia clark';
    LF.RememberAndValidatePayroll_In_EditRequest(V.managerName, V.boardNumbers, V.contractNumbers);
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

condition.nowWeDoing = 'выбираем цифры менеджера';
    LF.findSaleInPayroll('emilia clark');
    MF.Payroll_getTotalById(V.boardNumbers.Id, V.payrollNumbers.Sale);
    VD.IWant(VD.ToEqual, V.payrollNumbers.Sale.Total, V.boardNumbers.Payroll.managerForCommission.total, 'не совпали цифры в Payroll manager\n' +
        'id=' + V.boardNumbers.Id);
    SF.sleep(1);
    SF.endOfTest();
};