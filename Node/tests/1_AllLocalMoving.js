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
    LF.FullSmallCalcAsLocal(V.client);

    condition.nowWeDoing = 'первый раз в аккаунте';
    MF.Account_ClickViewRequest();
    MF.WaitWhileBusy();
    SF.sleep(5);
    MF.WaitWhileBusy();
    MF.Account_ClickPartialPacking();
    LF.AccountLocalEnterAddress();
    LF.AccountLocalAddInventory();
    LF.AccountLocalDetails();
    MF.Account_WaitForInventoryCheck();
    MF.Account_WaitForDetailsCheck();
    MF.WaitWhileBusy();
    V.accountNumbers={};
    LF.RememberAccountNumbers(V.accountNumbers);
    LF.addToCleanerJob(V.accountNumbers.Id);

    LF.LogoutFromAccount();

    condition.nowWeDoing = 'первый раз в админке';
    SF.get(V.adminURL);
    LF.LoginToBoardAsCustom(V.adminLogin,V.adminPassword);
    LF.OpenRequest(V.accountNumbers.Id);

    V.boardNumbers = {};
    LF.RememberDigitsRequestBoard(V.boardNumbers);
    LF.Validation_Compare_Account_Admin(V.accountNumbers, V.boardNumbers);
    JS.step(JSstep.selectTruck((V.boardNumbers.LaborTimeMax + V.boardNumbers.TravelTime)/60));
    V.managerFirstName = 'emilia';

    MF.EditRequest_OpenSettings();
    LF.SetManager(V.managerFirstName);
    MF.EditRequest_OpenClient();
    LF.SetClientPasswd(V.client.passwd);
    MF.EditRequest_OpenLogs();
    MF.EditRequest_Check1EmailExist(V.client.email, "Thank you for submitting a quote.");
    MF.EditRequest_Check1EmailExist(V.client.email, "How To Work With Your New Account.");
    MF.EditRequest_Check1EmailExist(V.client.email, "Request Quote (Pending Status)");
    MF.EditRequest_Check1EmailExist("roman@elromco.com", "Request Quote (Pending Status)");
    MF.EditRequest_OpenRequest();
    MF.EditRequest_SetToNotConfirmed();
    MF.EditRequest_SaveChanges();
    MF.EditRequest_OpenLogs();
    MF.EditRequest_Check1EmailExist(V.client.email, "Thank you for submitting a quote.");
    LF.closeEditRequest();
    SF.sleep(2);
    MF.Board_LogoutAdmin();

    condition.nowWeDoing = 'второй раз в аккаунте, конфёрмим';
    SF.get(V.accountURL);
    LF.LoginToAccountAsClient(V.client);
    MF.Account_CheckRequestStatus_NotConfirmed(V.accountNumbers.Id);
    MF.Account_OpenRequest(V.accountNumbers.Id);
    V.accountNumbers={};
    LF.RememberAccountNumbers(V.accountNumbers);
    LF.Validation_Compare_Account_Admin(V.accountNumbers, V.boardNumbers);
    LF.ConfirmRequestInAccount_WithReservation();
    MF.Account_WaitForGreenTextAfterConfirm();
    LF.LogoutFromAccount();

    condition.nowWeDoing = 'второй раз в админке, локал диспатч';
    SF.get(V.adminURL);
    LF.LoginToBoardAsCustom(V.adminLogin,V.adminPassword);
    MF.Board_OpenLocalDispatch();
    LF.findDayInLocalDispatch(V.boardNumbers.moveDate.Year, V.boardNumbers.moveDate.Month, V.boardNumbers.moveDate.Day);
    MF.WaitWhileBusy();
    MF.WaitWhileBusy();
    MF.Dispatch_GridView();
    LF.SelectRequestDispatch(V.accountNumbers.Id);
    LF.selectCrew(V.foremanName);
    LF.OpenRequestDispatch(V.accountNumbers.Id);
    MF.EditRequest_OpenLogs();
    MF.EditRequest_Check1EmailExist(V.client.email, "Request Local Quote (Confirmed)");
    MF.EditRequest_Check1EmailExist(V.client.email, "YOUR MOVE IS CONFIRMED AND SCHEDULED!");
    MF.EditRequest_Check1EmailExist("roman@elromco.com", "Send to Admin when confirmed");
    MF.EditRequest_Check1EmailExist(V.foremanEmail, "Send TO Foreman");
    LF.closeEditRequest();
    MF.Board_LogoutAdmin();

    condition.nowWeDoing = 'заходим под форменом, открываем контракт';
    LF.LoginToBoardAsCustomForeman(V.foremanLogin, V.foremanPassword);
    LF.OpenRequestDispatch(V.accountNumbers.Id);
    MF.Contract_WaitConfirmationPage();
    MF.Contract_OpenBillOfLading();
    SF.sleep(1);
    driver.wait(driver.executeScript(JSstep.CheckSumsInContract).then(function (costs) {
        VD.IWant(VD.VToEqual, costs.sumPacking, costs.totalPacking, 'Не совпали суммы Packing');
        VD.IWant(VD.VToEqual, costs.sumServices, costs.totalServices, 'Не совпали суммы Services');
    }),config.timeout);
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
    SF.sleep(1);
    MF.Contract_UploadImage(V.path);
    MF.Contract_UploadImage(V.path);
    MF.Contract_SaveImages();
    LF.MakeSignInContract();
    LF.MakeSignInContract();
    MF.Contract_Submit();
    MF.Contract_ReturnToForeman();
    LF.LogoutFromBoardForeman();

    condition.nowWeDoing = 'возвращаемся в диспатч, смотрим пейролл';
    LF.LoginToBoardAsCustom(V.adminLogin,V.adminPassword);
    MF.Board_OpenLocalDispatch();
    LF.findDayInLocalDispatch(V.boardNumbers.moveDate.Year, V.boardNumbers.moveDate.Month, V.boardNumbers.moveDate.Day);
    MF.WaitWhileBusy();
    MF.WaitWhileBusy();
    MF.Dispatch_GridView();
    MF.Dispatch_ShowDoneJobs();
    LF.OpenRequestDispatch(V.accountNumbers.Id);
    MF.EditRequest_WaitForBalanceVisible();
    LF.RememberDigitsRequestBoard_Down(V.boardNumbers);
    MF.EditRequest_ScrollDown();
    VD.IWant(VD.VToEqual, V.boardNumbers.Balance, 0, 'Баланс после закрытия не равен 0');
    MF.EditRequest_OpenPayroll();
    SF.sleep (2);
    LF.RememberAndValidatePayroll_In_EditRequest(V.managerName, V.boardNumbers);
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
    driver.wait(driver.executeScript(JSstep.Payroll_GetForemanTotalForRequest(V.boardNumbers.Id)).then(function (text) {
        V.payrollNumbers.Foreman.Total = SF.cleanPrice(text);
        VD.IWant(VD.VToEqual, V.payrollNumbers.Foreman.Total, V.boardNumbers.Payroll.foremanForCommission.total, 'не совпали цифры в Payroll foreman\n' +
            'id=' + V.boardNumbers.Id);
    }), config.timeout);
    SF.sleep(1);

    MF.Payroll_ClickAllDepartment();
    MF.WaitWhileBusy();

    condition.nowWeDoing = 'выбираем цифры менеджера';
    LF.findSaleInPayroll(V.managerName);
    driver.wait(driver.executeScript(JSstep.Payroll_GetSaleTotalForRequest(V.boardNumbers.Id)).then(function (text) {
        V.payrollNumbers.Sale.Total = SF.cleanPrice(text);
    }), config.timeout);
    SF.sleep(1);

    VD.IWant(VD.VToEqual, V.payrollNumbers.Sale.Total, V.boardNumbers.Payroll.managerForCommission.total, 'не совпали цифры в Payroll manager\n' +
        'id=' + V.boardNumbers.Id);


    SF.endOfTest();
};