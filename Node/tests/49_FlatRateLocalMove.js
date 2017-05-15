module.exports = function main(SF, JS, MF, LF, JSstep, VD, V, By, until,FileDetector, system, condition, config,constants) {
    global.fiber = Fiber.current;
    V.client = {};
    V.client.name = SF.randomBukva(6) + '_t';
    V.client.fam = SF.randomBukva(6) + '_t';
    V.client.phone = SF.randomCifra(10);
    V.client.email = SF.randomBukvaSmall(6) + '@' + SF.randomBukvaSmall(4) + '.tes';
    V.client.passwd = 123;

    //=========================начинаем писать тест=============================
    SF.get(V.adminURL);

    LF.LoginToBoardAsCustom(V.adminLogin,V.adminPassword);
    LF.CreateFlatRateFromBoard (V.client);
    SF.click(By.xpath('//input[@ng-model="request.request_all_data.localMove"]/..'));
    SF.clear (By.xpath('//input[@ng-model="request.flat_rate_quote.value"]'));
    SF.send (By.xpath('//input[@ng-model="request.flat_rate_quote.value"]'), 3000);
    MF.EditRequest_SetAdressToFrom ();
    V.boardNumbers = {};
    LF.RememberDigitsRequestBoard (V.boardNumbers);
    SF.sleep (1);
    JS.step(JSstep.selectTruck((V.boardNumbers.LaborTimeMax + V.boardNumbers.TravelTime)/60));
    SF.sleep (1);
    MF.EditRequest_SetToNotConfirmed ();
    SF.sleep (2);
    MF.EditRequest_SaveChanges ();
    MF.EditRequest_RememberId (V.request);
    LF.addToCleanerJob (V.request.Id);
    MF.EditRequest_OpenClient ();
    LF.SetClientPasswd (V.client.passwd);
    MF.EditRequest_OpenSettings ();
    SF.sleep(2);
    SF.click (By.xpath('//button[contains(text(),"Assign sales person")]'));
    SF.click (By.xpath('//div[@ng-show="::PermissionsServices.hasPermission(\'canSignedSales\');"]//ul[@class="dropdown-menu"]/li/a[contains(text(), "JackSales")]'));
    MF.SweetConfirm();
    SF.sleep (5);
    LF.closeEditRequest ();
    LF.LogoutFromBoardAdmin();
    SF.get(V.accountURL);
    LF.LoginToAccountAsClient(V.client);

condition.nowWeDoing = 'идем в акк букаем работу';
    MF.Account_CheckRequestStatus_NotConfirmed(V.request.Id);
    MF.Account_OpenRequest(V.request.Id);
    MF.Account_ClickViewRequest ();
    MF.WaitWhileBusy ();
    driver.wait(driver.findElement(By.xpath('//span[@ng-hide="vm.calculateFlatRateTotal() == 0"]')).getText().then(function (text) {
        text = SF.cleanPrice (text);
        VD.IWant (VD.VToEqual, 3000, text, 'не нашло флет рейт квоту на акке')
    }),config.timeout);
    LF.ConfirmRequestInAccount_NoReservation();
    MF.Account_WaitForGreenTextAfterConfirm();
    MF.WaitWhileBusy();
    LF.LogoutFromAccount ();
    SF.get(V.adminURL);
    LF.LoginToBoardAsCustom(V.adminLogin,V.adminPassword);
    MF.Board_OpenLocalDispatch();
    LF.findDayInLocalDispatch(V.boardNumbers.moveDate.Year, V.boardNumbers.moveDate.Month, V.boardNumbers.moveDate.Day);
    MF.WaitWhileBusy();
    MF.WaitWhileBusy();
    MF.Dispatch_GridView();
    LF.SelectRequestDispatch(V.request.Id);
    LF.selectCrewFlatRatePickUp(V.ForemanName);
    LF.LogoutFromBoardAdmin();

condition.nowWeDoing = 'заходим под форменом, открываем контракт';
    LF.LoginToBoardAsCustom (V.foremanLogin, V.foremanPassword);
    LF.OpenRequestDispatch(V.request.Id);
    MF.Contract_WaitConfirmationPage();
    MF.Contract_OpenBillOfLading();
    SF.sleep(1);
    LF.MakeSignInContract();
    LF.MakeSignInContract();
    MF.Contract_DeclarationValueA();
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
    SF.click (By.xpath('//button[@ng-click="submitContractBtn({pickup: true, isBtn: true })"]'));
    MF.WaitWhileBusy ();
    MF.SweetConfirm ();
    MF.Contract_ReturnToForeman();
    LF.LogoutFromBoardForeman ();

condition.nowWeDoing = 'возвращаемся в диспатч, смотрим пейролл';
    LF.LoginToBoardAsCustom(V.adminLogin,V.adminPassword);
    MF.Board_OpenLocalDispatch();
    LF.findDayInLocalDispatch(V.boardNumbers.moveDate.Year, V.boardNumbers.moveDate.Month, V.boardNumbers.moveDate.Day);
    MF.WaitWhileBusy();
    MF.WaitWhileBusy();
    MF.Dispatch_GridView();
    MF.Dispatch_ShowDoneJobs();
    LF.OpenRequestDispatch(V.request.Id);
    MF.EditRequest_WaitForBalanceVisible();
    LF.RememberDigitsRequestBoard_Down(V.boardNumbers);
    MF.EditRequest_ScrollDown();
    VD.IWant(VD.VToEqual, V.boardNumbers.Balance, 0, 'Баланс после закрытия не равен 0');
    MF.EditRequest_OpenPayroll();
    SF.sleep (2);
    LF.RememberAndValidatePayroll_In_EditRequest(V.boardNumbers);
    SF.sleep (2);
    MF.EditRequest_CloseModal();
    LF.closeEditRequest();

condition.nowWeDoing = 'сейчас идём в пейролл';
    MF.Board_OpenPayroll();
    LF.selectDateInPayroll(V.boardNumbers.moveDate);
    LF.findTestForemanInPayroll(V.ForemanName);

condition.nowWeDoing = 'выбираем цифры формена';
    V.payrollNumbers = {
        Foreman:{}, Sale:{}
    };
    driver.wait(driver.executeScript(JSstep.Payroll_GetForemanTotalForRequest(V.request.Id)).then(function (text) {
        V.payrollNumbers.Foreman.Total = SF.cleanPrice(text);
        VD.IWant(VD.VToEqual, V.payrollNumbers.Foreman.Total, V.boardNumbers.Payroll.foremanForCommission.total, 'не совпали цифры в Payroll foreman\n' +
            'id=' + V.request.Id);
    }), config.timeout);
    SF.sleep(1);
    MF.Payroll_ClickAllDepartment();
    MF.WaitWhileBusy();

condition.nowWeDoing = 'выбираем цифры менеджера';
    LF.findSaleInPayroll('JackSales do not delete');
    driver.wait(driver.executeScript(JSstep.Payroll_GetSaleTotalForRequest(V.request.Id)).then(function (text) {
        V.payrollNumbers.Sale.Total = SF.cleanPrice(text);
    }), config.timeout);
    SF.sleep(1);

    VD.IWant(VD.VToEqual, V.payrollNumbers.Sale.Total, V.boardNumbers.Payroll.managerForCommission.total, 'не совпали цифры в Payroll manager\n' +
        'id=' + V.request.Id);


    //=========================закончили писать тест=============================
    SF.endOfTest();
};
