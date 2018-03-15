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
    MF.Board_OpenSettingsGeneral ();
    JS.scroll ('input[ng-model=\\"vm.basicSettings.isflat_rate_miles\\"]');
    driver.wait(driver.executeScript("if($('input[ng-model=\"vm.basicSettings.isflat_rate_miles\"]').hasClass('ng-not-empty')){" +
        "return true;}else{$('input[ng-model=\"vm.basicSettings.isflat_rate_miles\"]').click()}"),config.timeout);
    LF.CreateFlatRateFromBoard (V.client);
    MF.EditRequest_ClickFlatRateLocalMove();
    MF.EditRequest_SendFlatRateSumm(3000);
    MF.EditRequest_SetAdressToFrom ();
    V.boardNumbers = {};
    LF.RememberDigitsRequestBoard (V.boardNumbers);
    SF.sleep (1);
    JS.step(JSstep.selectTruck((V.boardNumbers.LaborTimeMax + V.boardNumbers.TravelTime)/60));
    MF.WaitWhileBusy();
    MF.EditRequest_SetToNotConfirmed ();
    MF.EditRequest_SaveChanges ();
    MF.EditRequest_RememberId (V.request);
    MF.EditRequest_OpenClient ();
    LF.SetClientPasswd (V.client.passwd);
    MF.EditRequest_OpenSettings ();
    LF.SetManager('JackSales');
    LF.closeEditRequest ();
    MF.Board_LogoutAdmin();
    SF.get(V.accountURL);
    LF.LoginToAccountAsClient(V.client);

condition.nowWeDoing = 'идем в акк букаем работу';
    MF.Account_CheckRequestStatus_NotConfirmed(V.request.Id);
    MF.Account_OpenRequest(V.request.Id);
    MF.Account_ClickViewRequest ();
    driver.wait(driver.findElement(By.xpath('//span[@ng-hide="vm.calculateFlatRateTotal() == 0"]')).getText().then(function (text) {
        text = SF.cleanPrice (text);
        VD.IWant (VD.ToEqual, 3000, text, 'не нашло флет рейт квоту на акке')
    }),config.timeout);
    LF.ConfirmRequestInAccount_WithReservation();
    MF.Account_WaitForGreenTextAfterConfirm();
    LF.LogoutFromAccount ();
    SF.get(V.adminURL);
    LF.LoginToBoardAsCustom(V.adminLogin,V.adminPassword);
    MF.Board_OpenLocalDispatch();
    LF.findDayInLocalDispatch(V.boardNumbers.moveDate.Year, V.boardNumbers.moveDate.Month, V.boardNumbers.moveDate.Day);
    MF.Dispatch_GridView();
    LF.SelectRequestDispatch(V.request.Id);
    LF.selectCrewFlatRatePickUp(V.foremanName);
    MF.Board_LogoutAdmin();

condition.nowWeDoing = 'заходим под форменом, открываем контракт';
    LF.LoginToBoardAsCustomForeman(V.foremanLogin, V.foremanPassword);
    LF.OpenRequestInForemanPage(V.request.Id);
    MF.Contract_WaitConfirmationPage();
    MF.Contract_OpenBillOfLading();
    LF.MakeSignInContractFlatRate();
    LF.MakeSignInContractFlatRate();
    MF.Contract_DeclarationValueA();
    LF.MakeSignInContractFlatRate();
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
    LF.MakeSignInContractFlatRate();
    LF.MakeSignInContractFlatRate();
    MF.WaitWhileBusy();
    V.contractNumbers = {};
    driver.wait(driver.executeScript('return $(\'tr[ng-if="contract_page.paymentTax.creditCharge.state"] span\').text()').then(function (text) {
        V.contractNumbers.CreditCardPercentSumm = SF.cleanPrice(text);
    }),config.timeout);
    SF.click (By.xpath('//button[@ng-click="submitContractBtn({pickup: true, isBtn: true, lastPageSubmit: true})"]'));
    SF.sleep(15);
    MF.SweetConfirm ();
    MF.Contract_ReturnToForeman();
    LF.LogoutFromBoardForeman ();

condition.nowWeDoing = 'возвращаемся в диспатч, смотрим пейролл';
    LF.LoginToBoardAsCustom(V.adminLogin,V.adminPassword);
    MF.Board_OpenLocalDispatch();
    LF.findDayInLocalDispatch(V.boardNumbers.moveDate.Year, V.boardNumbers.moveDate.Month, V.boardNumbers.moveDate.Day);
    MF.Dispatch_GridView();
    MF.Dispatch_ShowDoneJobs();
    LF.OpenRequestDispatch(V.request.Id);
    MF.EditRequest_WaitForBalanceVisible();
    LF.RememberDigitsRequestBoard_Down(V.boardNumbers);
    MF.EditRequest_ScrollDown();
    VD.IWant(VD.ToEqual, V.boardNumbers.Balance, 0, 'Баланс после закрытия не равен 0');
    MF.EditRequest_OpenPayroll();
    SF.sleep (2);
    V.managerName = 'JackSales donotdelete';
    LF.RememberAndValidatePayroll_In_EditRequest(V.managerName, V.boardNumbers,  V.contractNumbers);
    SF.sleep (2);
    MF.EditRequest_CloseModal();
    LF.closeEditRequest();

condition.nowWeDoing = 'сейчас идём в пейролл';
    // MF.Board_OpenSideBar();
    MF.Board_OpenPayroll();
    LF.selectDateInPayroll(V.boardNumbers.moveDate);
    LF.findTestForemanInPayroll(V.foremanName);

condition.nowWeDoing = 'выбираем цифры формена';
    V.payrollNumbers = {
        Foreman:{}, Sale:{}, Helper:{}
    };
	MF.Payroll_getTotalById(V.request.Id, V.payrollNumbers.Foreman);
	VD.IWant(VD.ToEqual, V.payrollNumbers.Foreman.Total, V.boardNumbers.Payroll.foremanForCommission.total, 'не совпали цифры в Payroll foreman\n' +
		'id=' + V.request.Id);
    MF.Payroll_ClickAllDepartment();

condition.nowWeDoing = 'выбираем цифры менеджера';
    LF.findSaleInPayroll('JackSales donotdelete');
    driver.wait(driver.executeScript(JSstep.Payroll_GetSaleTotalForRequest(V.request.Id)).then(function (text) {
        V.payrollNumbers.Sale.Total = SF.cleanPrice(text);
    }), config.timeout);
    SF.sleep(1);
    MF.Payroll_getTotalById(V.request.Id, V.payrollNumbers.Sale);

    VD.IWant(VD.ToEqual, V.payrollNumbers.Sale.Total, V.boardNumbers.Payroll.managerForCommission.total, 'не совпали цифры в Payroll manager\n' +
        'id=' + V.request.Id);

condition.nowWeDoing = 'выбираем цифры helper';
    MF.Payroll_ClickAllDepartment();
    LF.findHelperInPayroll('Test Helper1');
    driver.wait(driver.executeScript(JSstep.Payroll_GetSaleTotalForRequest(V.request.Id)).then(function (text) {
        V.payrollNumbers.Helper.Total = SF.cleanPrice(text);
    }), config.timeout);
    SF.sleep(1);
    MF.Payroll_getTotalById(V.request.Id, V.payrollNumbers.Helper);
    VD.IWant(VD.ToEqual, V.payrollNumbers.Helper.Total, (V.boardNumbers.Payroll.helpersForCommission.total/2), 'не нашло этой работы у хелпера или не совпали цифры в Payroll helper\n' +
        'id=' + V.request.Id);
    MF.Board_OpenSchedule ();
    condition.nowWeDoing = 'идем в календарь проверять что трака нету на календаре на текущую дату';
    driver.wait(driver.findElement(By.xpath('//span[contains(@class, "current-date")]')).getText().then(function(date){
        V.current = date;
        let now = new Date();
        let msInDay = 86400000;
        let future = new Date(now.getTime());
        let options = {  month: 'long', year: 'numeric' };
        V.Dates = (future.toLocaleDateString('en-US', options));
    }), config.timeout);
    SF.sleep(8);
    if (V.current == V.Dates) {
        now = new Date();
        msInDay = 86400000;
        future = new Date(now.getTime());
        options = { day: 'numeric' };
        V.datescedule = (future.toLocaleDateString('en-US', options));
        SF.click(By.xpath('//div[contains(@class, "cal-day-inmonth")]/span[contains(@class, "pull-right") and contains(text(), "' + V.datescedule + '")]'));
        MF.WaitWhileBusy();
        SF.sleep(5);
        driver.wait(driver.executeScript("return $('div.line1:contains("+V.request.Id+")').length").then (function (checkSchedule) {
            VD.INeed(VD.NotToEqual, checkSchedule, 1, 'работа есть на текущую дату на таблице траков в календаре, а должна быть через 4 дня в schedule, реквест номер '+V.request.Id+'');
        }),config.timeout);
    } else {
        SF.click(By.xpath('//i[@ng-click="vm.nextMonth()"]'));
        SF.sleep(5);
        SF.click(By.xpath('//div[contains(@class, "cal-day-inmonth")]/span[contains(@class, "pull-right")] and [contains(text(), "' + V.datescedule + '")]'));
        SF.sleep(5);
        driver.wait(driver.executeScript("return $('div.line1:contains("+V.request.Id+")').length").then (function (checkSchedule) {
            VD.INeed(VD.NotToEqual, checkSchedule, 1, 'работа есть на текущую дату на таблице траков в календаре, а должна быть через 4 дня в schedule (вторая проверка)');
        }),config.timeout);
    }
    SF.sleep(2);
    // condition.nowWeDoing = 'а теперь идем в календарь проверять что трак есть на календаре на дату на которую создали его';
    // driver.wait(driver.findElement(By.xpath('//span[contains(@class, "current-date")]')).getText().then(function(date){
    //     V.current1 = date;
    //     let now = new Date();
    //     let msInDay = 86400000;
    //     let future = new Date(now.getTime() + msInDay * 3 );
    //     let options = {  month: 'long', year: 'numeric' };
    //     V.Dates1 = (future.toLocaleDateString('en-US', options));
    // }), config.timeout);
    // SF.sleep(8);
    // if (V.current1 == V.Dates1) {
    //
    //     JS.click('.pull-right:contains("' + V.boardNumbers.moveDate.Day + '")');
    //     MF.WaitWhileBusy();
    //     SF.sleep(5);
    //     driver.wait(driver.executeScript("return $('div.line1:contains("+V.request.Id+")').length").then (function (checkSchedule) {
    //         VD.INeed(VD.ToEqual, checkSchedule, 1, 'работа не нашлась в schedule по move date ' + V.boardNumbers.moveDate.Day + ', реквест номер '+V.request.Id+'');
    //     }),config.timeout);
    // } else {
    //     SF.click(By.xpath('//i[@ng-click="vm.nextMonth()"]'));
    //     SF.sleep(5);
    //     SF.click(By.xpath('//div[contains(@class, "cal-day-inmonth")]/span[contains(@class, "pull-right")] and [contains(text(), "' + V.datescedule + '")]'));
    //     SF.sleep(5);
    //     driver.wait(driver.executeScript("return $('div.line1:contains("+V.request.Id+")').length").then (function (checkSchedule) {
    //         VD.INeed(VD.ToEqual, checkSchedule, 2, '(проверка два) работа не нашлась в schedule по move date ' + V.boardNumbers.moveDate.Day + ', реквест номер '+V.request.Id+'');
    //     }),config.timeout);
    // }
    // SF.sleep(2);

    //=========================закончили писать тест=============================
    SF.endOfTest();
};
