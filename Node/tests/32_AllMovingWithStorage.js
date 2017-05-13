module.exports = function main(SF, JS, MF, LF, JSstep, VD, V, By, until,FileDetector, system, condition, config,constants) {
    global.fiber = Fiber.current;

    //=========================начинаем писать тест=============================
    V.client = {};
    V.client.name = SF.randomBukva(6) + '_t';
    V.client.fam = SF.randomBukva(6) + '_t';
    V.client.phone = SF.randomCifra(10);
    V.client.email = SF.randomBukvaSmall(6) + '@' + SF.randomBukvaSmall(4) + '.tes';
    V.client.passwd = 123;

    condition.nowWeDoing = 'заполняем верхнюю форму как MovingWithStorage';
    SF.get(V.frontURL);
    LF.FullSmallCalcAsMovingWithStorage(V.client);
    MF.FrontSite_GoToAccount();
    condition.nowWeDoing = 'зашли первый раз в аккаунт';
    MF.Account_ClickViewRequest();

    MF.WaitWhileBusy();
    SF.sleep(5);
    MF.WaitWhileBusy();
    LF.AccountToStorageEnterAddress();
    LF.AccountLocalAddInventory();
    LF.AccountLocalDetails();
    MF.Account_WaitForInventoryCheck();
    MF.Account_WaitForDetailsCheck();
    V.accountNumbersTo = {};

    LF.RememberAccountNumbers(V.accountNumbersTo);
    LF.addToCleanerJob(V.accountNumbersTo.Id);
    SF.sleep(1);

    condition.nowWeDoing = 'запомнили цифры ToStorage идём на From';
    MF.Account_ClickFromStorage();
    MF.WaitWhileBusy();
    SF.sleep(5);
    MF.WaitWhileBusy();
    LF.AccountFromStorageEnterAddress();
    V.accountNumbersFrom = {};
    MF.WaitWhileBusy();
    SF.sleep(5);
    LF.RememberAccountNumbers(V.accountNumbersFrom);
    LF.addToCleanerJob(V.accountNumbersFrom.Id);
    LF.LogoutFromAccount();

    condition.nowWeDoing = 'Зайти на админку, найти реквест To storage, выставить трак, проверить, запомнить и сравнить все цифры с аккаунтом, выставить sales, дать клиенту пароль, поставить Not Confirmed, сохранить.';
    SF.get(V.adminURL);
    V.adminLogin = "TestAdmin";
    V.adminPassword = "test";
    LF.LoginToBoardAsCustom(V.adminLogin,V.adminPassword);
    LF.OpenRequest(V.accountNumbersTo.Id);
    V.boardNumbersTo = {};
    LF.RememberDigitsRequestBoard(V.boardNumbersTo);
    JS.step(JSstep.selectTruck((V.boardNumbersTo.LaborTimeMax + V.boardNumbersTo.TravelTime) / 60));
    JS.scroll('div.ServicesCost:visible');
    LF.Validation_Compare_Account_Admin(V.accountNumbersTo, V.boardNumbersTo);
    MF.EditRequest_OpenSettings();
    LF.SetManager('emilia');
    MF.EditRequest_OpenClient();
    LF.SetClientPasswd(V.client.passwd);
    MF.EditRequest_OpenLogs();
    MF.EditRequest_Check1EmailExist(V.client.email, "Thank you for submitting a quote.");
    MF.EditRequest_Check1EmailExist(V.client.email, "How To Work With Your New Account.");
    MF.EditRequest_Check1EmailExist(V.client.email, "Request Moving and Storage Quote (Pending Status)");
    MF.EditRequest_Check1EmailExist("roman@elromco.com", "Request Quote (Pending Status)");
    MF.EditRequest_OpenRequest();
    MF.EditRequest_SetToNotConfirmed();
    MF.EditRequest_SaveChanges();
    MF.EditRequest_OpenLogs();
    MF.EditRequest_Check1EmailExist(V.client.email, "Change status to Not Confirmed");
    LF.closeEditRequest();

    LF.OpenRequest(V.accountNumbersFrom.Id);
    V.boardNumbersFrom = {};
    LF.RememberDigitsRequestBoard(V.boardNumbersFrom);
    JS.step(JSstep.selectTruck((V.boardNumbersFrom.LaborTimeMax + V.boardNumbersFrom.TravelTime) / 60));
    MF.EditRequest_ScrollDown();
    LF.Validation_Compare_Account_Admin(V.accountNumbersFrom, V.boardNumbersFrom);
    MF.EditRequest_OpenSettings();
    LF.SetManager('emilia');
    MF.EditRequest_OpenClient();
    LF.SetClientPasswd(V.client.passwd);
    MF.EditRequest_OpenRequest();
    MF.EditRequest_SetToNotConfirmed();
    MF.EditRequest_SaveChanges();
    LF.closeEditRequest();
    LF.LogoutFromBoardAdmin();

    condition.nowWeDoing = 'Зайти в аккаунт и подтвердить первый реквест. Можно ещё раз сравнить все цифры с админкой';
    SF.get(V.accountURL);
    LF.LoginToAccountAsClient(V.client);
    MF.Account_CheckRequestStatus_NotConfirmed(V.accountNumbersTo.Id);
    MF.Account_OpenRequest(V.accountNumbersTo.Id);
    V.accountNumbersTo = {};
    LF.RememberAccountNumbers(V.accountNumbersTo);
    LF.Validation_Compare_Account_Admin(V.accountNumbersTo, V.boardNumbersTo);
    LF.ConfirmRequestInAccount_WithReservation();
    MF.Account_WaitForGreenTextAfterConfirm();
    LF.LogoutFromAccount();

    condition.nowWeDoing = 'Зайти в аккаунт и подтвердить второй реквест. Можно ещё раз сравнить все цифры с админкой';
    LF.LoginToAccountAsClient(V.client);
    MF.Account_CheckRequestStatus_NotConfirmed(V.accountNumbersFrom.Id);
    MF.Account_OpenRequest(V.accountNumbersFrom.Id);
    V.accountNumbersFrom = {};
    LF.RememberAccountNumbers(V.accountNumbersFrom);
    LF.Validation_Compare_Account_Admin(V.accountNumbersFrom, V.boardNumbersFrom);
    LF.ConfirmRequestInAccount_WithReservation();
    SF.waitForVisible(By.xpath('//div[contains(text(),"Your move is confirmed and scheduled")]'));
    LF.LogoutFromAccount();

    condition.nowWeDoing = 'Зайти в local Dispatch, найти первый реквест, назначить команду и отправить работу.';
    SF.get(V.adminURL);
    LF.LoginToBoardAsCustom(V.adminLogin,V.adminPassword);
    MF.Board_OpenLocalDispatch();
    LF.findDayInLocalDispatch(V.boardNumbersTo.moveDate.Year, V.boardNumbersTo.moveDate.Month, V.boardNumbersTo.moveDate.Day);
    MF.WaitWhileBusy();
    MF.WaitWhileBusy();
    MF.Dispatch_GridView();
    LF.SelectRequestDispatch(V.accountNumbersTo.Id);
    LF.selectCrew();
    SF.sleep(2);
    LF.LogoutFromBoardAdmin();

    condition.nowWeDoing = 'Зайти под форменом, найти первую работу, зайти в Inventory, добавить состояния предметов, запомнить их';
    LF.LoginToBoardAsForeman();
    LF.OpenRequestDispatch(V.accountNumbersTo.Id);
    MF.Contract_WaitConfirmationPage();
    MF.Contract_OpenInventory();
    LF.Contract_AddInventory(7);
    MF.Contract_SetTapeNumber(1);
    MF.Contract_SetTapeColorGreen('Green');
    LF.MakeSignInInventory(0);
    LF.MakeSignInInventory(1);
    MF.Contract_SubmitInventory();
    MF.SweetCancel();
    MF.Contract_WaitForRental();
    MF.Contract_SetRentalPhone(V.client.phone);
    MF.Contract_SetRentalAddress('Address To');
    MF.Contract_SetRentalZip('02461');
    LF.MakeSignInRental();
    LF.payRentalInventory();
    driver.wait(new FileDetector().handleFile(driver, system.path.resolve('./files/squirrel.jpg')).then(function (path) {
        V.path = path;
    }), config.timeout);
    SF.sleep(1);
    MF.Contract_UploadImage(V.path);
    MF.Contract_UploadImage(V.path);
    MF.Contract_SaveImages();

    condition.nowWeDoing = 'закончили с инвентарём, подписываем первый контракт';
    driver.wait(driver.executeScript(JSstep.CheckSumsInContract).then(function (costs) {
        VD.IWant(VD.VToEqual, costs.sumPacking, costs.totalPacking, 'Не совпали суммы Packing');
        VD.IWant(VD.VToEqual, costs.sumServices, costs.totalServices, 'Не совпали суммы Services');
    }));
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

    //*****************************************второй реквест******************************************

    condition.nowWeDoing = 'From storage, выставить трак, проверить, запомнить и сравнить все цифры с аккаунтом, выставить sales, дать клиенту пароль, поставить Not Confirmed, сохранить.';
    SF.get(V.adminURL);
    LF.LoginToBoardAsCustom(V.adminLogin,V.adminPassword);
    LF.OpenRequest(V.accountNumbersFrom.Id);
    LF.RememberDigitsRequestBoard(V.boardNumbersFrom);
    MF.EditRequest_SetToConfirmed();
    MF.EditRequest_SaveChanges();
    LF.closeEditRequest();
    LF.LogoutFromBoardAdmin();

    condition.nowWeDoing = 'Найти второй реквест, назначить команду и отправить работу.';
    SF.get(V.adminURL);
    LF.LoginToBoardAsCustom(V.adminLogin,V.adminPassword);
    MF.Board_OpenLocalDispatch();
    LF.findDayInLocalDispatch(V.boardNumbersFrom.moveDate.Year, V.boardNumbersFrom.moveDate.Month, V.boardNumbersFrom.moveDate.Day);
    MF.WaitWhileBusy();
    MF.WaitWhileBusy();
    MF.Dispatch_GridView();
    LF.SelectRequestDispatch(V.accountNumbersFrom.Id);
    LF.selectCrew();
    LF.LogoutFromBoardAdmin();

    condition.nowWeDoing = 'Найти вторую работу у формена, зайти в Inventory, подтвердить состояния предметов, запомнить их';
    LF.LoginToBoardAsForeman();
    LF.OpenRequestDispatch(V.accountNumbersFrom.Id);
    MF.Contract_WaitConfirmationPage();
    MF.Contract_OpenInventory();

    //тут нужно будет вставить валидацию инвентаря на контракте from storage
    Debug.pause();

    LF.MakeSignInInventory(2);
    LF.MakeSignInInventory(3);
    MF.Contract_SubmitInventory();

    condition.nowWeDoing = 'закончили с инвентарём, подписываем второй контракт';
    MF.Contract_WaitBillOfLading();
    driver.wait(driver.executeScript(JSstep.CheckSumsInContract).then(function (costs) {
        VD.IWant(VD.VToEqual, costs.sumPacking, costs.totalPacking, 'Не совпали суммы Packing');
        VD.IWant(VD.VToEqual, costs.sumServices, costs.totalServices, 'Не совпали суммы Services');
    }));
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
    console.log(V.path);
    MF.Contract_UploadImage(V.path);
    MF.Contract_UploadImage(V.path);
    MF.Contract_SaveImages();
    LF.MakeSignInContract();
    LF.MakeSignInContract();
    MF.Contract_Submit();
    MF.Contract_ReturnToForeman();
    LF.LogoutFromBoardForeman();

    condition.nowWeDoing="Вернуться в localDispatch, найти первый реквест, проверить и запомнить Payroll";
    LF.LoginToBoardAsCustom(V.adminLogin,V.adminPassword);
    MF.Board_OpenLocalDispatch();
    LF.findDayInLocalDispatch(V.boardNumbersTo.moveDate.Year, V.boardNumbersTo.moveDate.Month, V.boardNumbersTo.moveDate.Day);
    MF.WaitWhileBusy();
    MF.WaitWhileBusy();
    MF.Dispatch_GridView();
    MF.Dispatch_ShowDoneJobs();
    LF.OpenRequestDispatch(V.accountNumbersTo.Id);
    MF.EditRequest_WaitForBalanceVisible();
    LF.RememberDigitsRequestBoard_Down(V.boardNumbersTo);
    MF.EditRequest_ScrollDown();
    VD.IWant(VD.VToEqual, V.boardNumbersTo.Balance, 0, 'Баланс после закрытия не равен 0');
    MF.EditRequest_OpenPayroll();
    LF.RememberAndValidatePayroll_In_EditRequest(V.boardNumbersTo);
    MF.EditRequest_CloseModal();
    LF.closeEditRequest();

    condition.nowWeDoing="найти второй реквест, проверить и запомнить Payroll";
    MF.Dispatch_WaitForCalendar();
    LF.findDayInLocalDispatch(V.boardNumbersFrom.moveDate.Year, V.boardNumbersFrom.moveDate.Month, V.boardNumbersFrom.moveDate.Day);
    MF.WaitWhileBusy();
    MF.WaitWhileBusy();
    MF.Dispatch_GridView();
    MF.Dispatch_ShowDoneJobs();
    LF.OpenRequestDispatch(V.accountNumbersFrom.Id);
    MF.EditRequest_WaitForBalanceVisible();
    LF.RememberDigitsRequestBoard_Down(V.boardNumbersFrom);
    MF.EditRequest_ScrollDown();
    VD.IWant(VD.VToEqual, V.boardNumbersFrom.Balance, 0, 'Баланс после закрытия не равен 0');
    MF.EditRequest_OpenPayroll();
    LF.RememberAndValidatePayroll_In_EditRequest(V.boardNumbersFrom);
    MF.EditRequest_CloseModal();
    LF.closeEditRequest();

    condition.nowWeDoing = 'сейчас идём в пейролл и проверяем первую работы';
    MF.Board_OpenPayroll();
    LF.selectDateInPayroll(V.boardNumbersTo.moveDate);
    LF.findTestForemanInPayroll();
    V.payrollNumbersTo = {
        Foreman:{}, Sale:{}
    };
    driver.wait(driver.executeScript(JSstep.Payroll_GetForemanTotalForRequest(V.accountNumbersTo.Id)).then(function (text) {
        V.payrollNumbersTo.Foreman.Total = SF.cleanPrice(text);
        VD.IWant(VD.VToEqual, V.payrollNumbersTo.Foreman.Total, V.boardNumbersTo.Payroll.foremanForCommission.total, 'не совпали цифры ToStorage в Payroll foreman\n' +
            'id=' + V.accountNumbersTo.Id);
    }), config.timeout);
    SF.sleep(1);
    LF.selectDateInPayroll(V.boardNumbersFrom.moveDate);
    V.payrollNumbersFrom = {
        Foreman:{}, Sale:{}
    };
    driver.wait(driver.executeScript(JSstep.Payroll_GetForemanTotalForRequest(V.accountNumbersFrom.Id)).then(function (text) {
        V.payrollNumbersFrom.Foreman.Total = SF.cleanPrice(text);
        VD.IWant(VD.VToEqual, V.payrollNumbersFrom.Foreman.Total, V.boardNumbersFrom.Payroll.foremanForCommission.total, 'не совпали цифры FromStorage в Payroll foreman\n' +
            'id=' + V.accountNumbersFrom.Id);
    }), config.timeout);
    SF.sleep(1);
    MF.Payroll_ClickAllDepartment();
    MF.WaitWhileBusy();

    condition.nowWeDoing = 'выбираем цифры менеджера';
    LF.findSaleInPayroll('emilia clark');
    LF.selectDateInPayroll(V.boardNumbersTo.moveDate);
    driver.wait(driver.executeScript(JSstep.Payroll_GetSaleTotalForRequest(V.accountNumbersTo.Id)).then(function (text) {
        V.payrollNumbersTo.Sale.Total = SF.cleanPrice(text);
    }), config.timeout);
    SF.sleep(1);
    VD.IWant(VD.VToEqual, V.payrollNumbersTo.Sale.Total, V.boardNumbersTo.Payroll.managerForCommission.total, 'не совпали цифры в Payroll manager\n' +
        'id=' + V.accountNumbersTo.Id);
    LF.selectDateInPayroll(V.boardNumbersFrom.moveDate);
    driver.wait(driver.executeScript(JSstep.Payroll_GetSaleTotalForRequest(V.accountNumbersFrom.Id)).then(function (text) {
        V.payrollNumbersFrom.Sale.Total = SF.cleanPrice(text);
    }), config.timeout);
    SF.sleep(1);
    VD.IWant(VD.VToEqual, V.payrollNumbersFrom.Sale.Total, V.boardNumbersFrom.Payroll.managerForCommission.total, 'не совпали цифры в Payroll manager\n' +
        'id=' + V.accountNumbersFrom.Id);


    //=========================закончили писать тест=============================
    SF.endOfTest();
};