module.exports = function main(SF, JS, MF, LF, JSstep, VD, V, By, until,FileDetector, system, condition, config,constants) {    global.fiber = Fiber.current;
    V.client = {};
    V.client.name = SF.randomBukva(6) + '_t';
    V.client.fam = SF.randomBukva(6) + '_t';
    V.client.phone = SF.randomCifra(10);
    V.client.email = SF.randomBukvaSmall(6) + '@' + SF.randomBukvaSmall(4) + '.tes';
    V.boardNumbers = {};

    SF.get(V.adminURL);

condition.nowWeDoing = 'зашли в админку и создаем реквест';
    LF.LoginToBoardAsCustom(V.adminLogin,V.adminPassword);
    LF.CreateLoadingHelpFromBoard (V.client);
    LF.addInventoryBoard ();
    SF.sleep (3);
    V.boardNumbers={};
    LF.RememberDateFromRequest (V.boardNumbers);
    MF.EditRequest_RememberId (V.request);
    // LF.addToCleanerJob(V.request.Id);

condition.nowWeDoing = 'конфермим работу';
    LF.RememberDigitsRequestBoard(V.boardNumbers);
    JS.step(JSstep.selectTruck(9));
    MF.WaitWhileBusy();
    MF.EditRequest_SetToConfirmed ();
    MF.EditRequest_SetAdressFrom ();
    MF.EditRequest_SaveChanges ();
    LF.closeEditRequest();

condition.nowWeDoing = 'идем в диспач первый раз тут заодно проверяем цвет или меняется когда назначем или убираем команду';
    MF.Board_OpenLocalDispatch ();
    LF.findDayInLocalDispatch(V.boardNumbers.moveDate.Year,V.boardNumbers.moveDate.Month,V.boardNumbers.moveDate.Day);
    SF.click(By.id('request_'+V.request.Id+''));
    LF.selectCrew(V.foremanName);
    driver.wait (driver.findElement(By.xpath('//div[@id="request_'+V.request.Id+'"]')).getCssValue("background-color").then(function (color) {
        VD.IWant(VD.ToEqual, color, "rgba(251, 143, 80, 1)", 'после того как назначили команду цвет не стал оранжевым, а должен')
    }),config.timeout);
    JS.scroll('button[ng-click=\"vm.assignTeam()\"]');
    MF.Dispach_ClickUnassignTeam();
    MF.SweetConfirm ();
    MF.WaitWhileBusy ();
    MF.WaitWhileToaster ();
    driver.wait (driver.findElement(By.xpath('//div[@id="request_'+V.request.Id+'"]')).getCssValue("background-color").then(function (color) {
        VD.IWant(VD.ToEqual, color, "rgba(144, 238, 144, 1)", 'после того как убрали команду цвет не стал зеленным, а должен')
    }),config.timeout);
    MF.Board_Refresh ();
    SF.waitForLocated(By.xpath('//a[@class="ui-datepicker-next ui-corner-all"]'));
    MF.WaitWhileBusy ();
    LF.findDayInLocalDispatch(V.boardNumbers.moveDate.Year,V.boardNumbers.moveDate.Month,V.boardNumbers.moveDate.Day);
    MF.Dispatch_GridView();
    LF.SelectRequestDispatch (V.request.Id);
    V.foremanName = 'Test Foreman';
    LF.selectCrew(V.foremanName);
    MF.Board_LogoutAdmin();

condition.nowWeDoing = 'заходим под форменом, открываем контракт и подписываем';
    LF.LoginToBoardAsCustomForeman(V.foremanLogin, V.foremanPassword);
    LF.OpenRequestInForemanPage(V.request.Id);
    MF.Contract_WaitConfirmationPage();
    MF.Contract_OpenBillOfLading ();
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
    MF.Contract_PayCash();
    LF.MakeSignInContract();
    LF.MakeSignInContract();
    V.contractNumbers = {};
    MF.Contract_Submit(V.contractNumbers);
    MF.Contract_ReturnToForeman();
    LF.LogoutFromBoardForeman();

condition.nowWeDoing = 'идем в админку в диспач второй раз, удалить форемана';
    LF.LoginToBoardAsCustom(V.adminLogin,V.adminPassword);
    MF.Board_OpenLocalDispatch ();
    LF.findDayInLocalDispatch(V.boardNumbers.moveDate.Year, V.boardNumbers.moveDate.Month, V.boardNumbers.moveDate.Day);
    MF.Dispatch_GridView();
    MF.Dispatch_ShowDoneJobs();
    MF.WaitWhileBusy ();
    LF.OpenRequestDispatch(V.request.Id);
    JS.waitForExist('label:contains("Balance:"):visible');
    LF.RememberDigitsRequestBoard_Down(V.boardNumbers);
    SF.sleep (1);
    if (V.boardNumbers.Balance !== 0) {
        JS.scroll('div.BalanceCost:visible');
    }
    VD.IWant(VD.ToEqual, V.boardNumbers.Balance, 0, 'Баланс после закрытия не равен 0');
    SF.click(By.xpath('//div[@ng-click="openSalaryCommisionModal();"]'));
    SF.waitForVisible(By.xpath('//button[@ng-click="reSubmitPayroll()"]'));
    JS.waitForNotExist('div.busyoverlay:visible');
    SF.click(By.xpath('//div[@id="invoice"]//a[@ng-click="select(tabs[1])"]'));
    SF.sleep(1);
    SF.click(By.xpath('//span[@ng-click="removeWorker(foremanIndex, \'foreman\')"]'));
    SF.sleep(1);
    MF.SweetConfirm ();
    SF.sleep (2);
    JS.waitForNotExist('div.toast-success');
    MF.WaitWhileBusy ();
    SF.sleep(1);
    MF.WaitWhileBusy ();
    SF.click (By.xpath('//button[@ng-click="reSubmitPayroll()"]'));
    MF.SweetConfirm ();
    MF.SweetConfirm ();
    SF.sleep (3);
    SF.click(By.xpath('//button[@ng-click="cancel()"][contains(text(),"Close")]'));
    SF.sleep(2);
    LF.closeEditRequest ();
    MF.Board_LogoutAdmin();
    LF.LoginToBoardAsCustomForeman(V.foremanLogin, V.foremanPassword);

condition.nowWeDoing = 'идем на форемана проверить что он удалился с  работы';
    SF.click(By.xpath('//input[@ng-model="vm.pageParams.conditions.nid"]'));
    SF.send(By.xpath('//input[@ng-model="vm.pageParams.conditions.nid"]'), V.request.Id);
    SF.sleep(2);
    MF.WaitWhileBusy();
    driver.wait(driver.findElement(By.xpath('//div[@ng-if="vm.pageParams.totalCount == 0"]')).getText().then(function (text) {
        VD.IWant(VD.ToEqual, text, 'Nothing to show', 'реквест не пропал у форемана на страничке в new jobs после его удаление из этого ревеста');
    }),config.timeout);
    SF.click(By.xpath('//a[@ui-sref="foreman.past"]'));
    MF.WaitWhileBusy();
    SF.click(By.xpath('//input[@ng-model="vm.pageParams.conditions.nid"]'));
    SF.send(By.xpath('//input[@ng-model="vm.pageParams.conditions.nid"]'), V.request.Id);
    SF.sleep(2);
    MF.WaitWhileBusy();
    driver.wait(driver.findElement(By.xpath('//div[@ng-if="vm.pageParams.totalCount == 0"]')).getText().then(function (text) {
        VD.IWant(VD.ToEqual, text, 'Nothing to show', 'реквест не пропал у форемана на страничке в past jobs после его удаление из этого ревеста');
    }),config.timeout);
    SF.sleep (1);

    //=========================закончили писать тест=============================
    SF.endOfTest();
};
