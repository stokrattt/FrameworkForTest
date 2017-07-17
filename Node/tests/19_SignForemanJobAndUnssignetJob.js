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
    SF.sleep (2);
    V.boardNumbers={};
    LF.RememberDateFromRequest (V.boardNumbers);
    MF.EditRequest_RememberId (V.request);
    LF.addToCleanerJob(V.request.Id);
condition.nowWeDoing = 'конфермим работу';
    LF.RememberDigitsRequestBoard(V.boardNumbers);
    JS.step(JSstep.selectTruck((V.boardNumbers.LaborTimeMax + V.boardNumbers.TravelTime)/60));
    MF.EditRequest_SetToConfirmed ();
    MF.EditRequest_SetAdressFrom ();
    MF.EditRequest_SaveChanges ();
    LF.closeEditRequest();
    SF.sleep (2);
condition.nowWeDoing = 'идем в диспач первый раз тут заодно проверяем цвет или меняется когда назначем или убираем команду';
    MF.Board_OpenLocalDispatch ();
    LF.findDayInLocalDispatch(V.boardNumbers.moveDate.Year,V.boardNumbers.moveDate.Month,V.boardNumbers.moveDate.Day);
    MF.WaitWhileBusy ();
    SF.sleep(1);
    MF.WaitWhileBusy ();
    SF.click(By.id('request_'+V.request.Id+''));
    LF.selectCrew(V.foremanName);
    driver.wait (driver.findElement(By.xpath('//div[@id="request_'+V.request.Id+'"]')).getCssValue("background-color").then(function (color) {
        VD.IWant(VD.ToEqual, color, "rgba(251, 143, 80, 1)", 'после того как назначили команду цвет не стал оранжевым, а должен')
    }),config.timeout);
    SF.sleep(1);
    JS.scroll('a[ng-click=\"vm.assignTeam(request)\"]');
    SF.click(By.xpath('//a[@ng-click="vm.unAssignTeam()"]'));
    MF.SweetConfirm ();
    MF.WaitWhileBusy ();
    MF.WaitWhileToaster ();
    driver.wait (driver.findElement(By.xpath('//div[@id="request_'+V.request.Id+'"]')).getCssValue("background-color").then(function (color) {
        VD.IWant(VD.ToEqual, color, "rgba(144, 238, 144, 1)", 'после того как убрали команду цвет не стал зеленным, а должен')
    }),config.timeout);
    SF.sleep(1);
    SF.click(By.xpath('//i[@ng-click="vm.getByDate();"]'));
    MF.WaitWhileBusy ();
    SF.click(By.id('request_'+V.request.Id+''));
    SF.sleep(2);
    // MF.Dispatch_GridView();
    // LF.SelectRequestDispatch (V.request.Id);
    LF.selectCrew(V.foremanName);
    Debug.pause();
    MF.Board_LogoutAdmin();
condition.nowWeDoing = 'заходим под форменом, открываем контракт и подписываем';
    LF.LoginToBoardAsCustomForeman(V.foremanLogin, V.foremanPassword);
    LF.OpenRequestDispatch(V.request.Id);
    MF.Contract_WaitConfirmationPage();
    MF.Contract_OpenBillOfLading ();
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
    LF.MakeSignJS('signatureCanvasPayment');
    SF.click(By.xpath('//div[@ng-init="payment.canvasInit(\'signatureCanvasPayment\')"]//button[@ng-click="saveSignature()"]'));
    JS.waitForExist('input#inputImage');
    /**********************************************************************************************************************************************/
    driver.wait(new FileDetector().handleFile(driver, system.path.resolve('./files/squirrel.jpg')).then(function (path) {
        V.path = path;
    }), config.timeout);
    SF.sleep(1);
    MF.Contract_UploadImage(V.path);
    MF.Contract_UploadImage(V.path);
    MF.Contract_SaveImages();
    // LF.Contract_ReviewGive(3, "test text for review");
    LF.MakeSignInContract();
    LF.MakeSignInContract();
    MF.Contract_Submit();
    MF.Contract_ReturnToForeman();
    LF.LogoutFromBoardForeman();
condition.nowWeDoing = 'идем в админку в диспач второй раз, удалить форемана';
    LF.LoginToBoardAsCustom(V.adminLogin,V.adminPassword);
    MF.Board_OpenLocalDispatch ();
    LF.findDayInLocalDispatch(V.boardNumbers.moveDate.Year, V.boardNumbers.moveDate.Month, V.boardNumbers.moveDate.Day);
    MF.WaitWhileBusy ();
    SF.sleep(1);
    MF.WaitWhileBusy ();
    MF.Dispatch_GridView();
    MF.Dispatch_ShowDoneJobs();
    MF.WaitWhileBusy ();
    SF.sleep(3);
    LF.OpenRequestDispatch(V.request.Id);
    JS.waitForExist('label:contains("Balance:"):visible');
    LF.RememberDigitsRequestBoard_Down(V.boardNumbers);
    SF.sleep (2);
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
    SF.sleep (3);
    driver.wait(driver.executeScript("return $('td:contains("+V.request.Id+")').length").then (function (check) {
        VD.INeed(VD.ToEqual, check, 0, 'фореман не удалился с реквеста');
    }),config.timeout);
    SF.sleep (1);
    SF.click(By.xpath('//a[@ui-sref="foreman.done"]'));
    SF.sleep (5);
    driver.wait(driver.executeScript("return $('td:contains("+V.request.Id+")').length").then (function (check) {
        VD.INeed(VD.ToEqual, check, 0, 'фореман не удалился с реквеста');
    }),config.timeout);
    SF.sleep (1);

    //=========================закончили писать тест=============================
    SF.endOfTest();
};
