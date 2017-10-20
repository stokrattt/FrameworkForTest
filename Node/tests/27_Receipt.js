module.exports = function main(SF, JS, MF, LF, JSstep, VD, V, By, until,FileDetector, system, condition, config,constants) {
    global.fiber = Fiber.current;
    V.client = {};
    V.client.name = SF.randomBukva(6) + '_t';
    V.client.fam = SF.randomBukva(6) + '_t';
    V.client.phone = SF.randomCifra(10);
    V.client.email = SF.randomBukvaSmall(6) + '@' + SF.randomBukvaSmall(4) + '.tes';

    SF.get(V.adminURL);
    LF.LoginToBoardAsCustom(V.adminLogin,V.adminPassword);
    LF.CreateLocalMovingFromBoard(V.client);
    SF.sleep(2);
    V.boardNumbers = {};
    LF.addInventoryBoard(V.boardNumbers);

condition.nowWeDoing = 'запоминаем все данные';
    LF.RememberDigitsRequestBoard(V.boardNumbers);
    JS.step(JSstep.selectTruck((V.boardNumbers.LaborTimeMax + V.boardNumbers.TravelTime) / 60));
    MF.WaitWhileBusy();
    LF.RememberDateFromRequest(V.boardNumbers);
    MF.EditRequest_RememberId (V.request);
    LF.addToCleanerJob(V.request.Id);
    MF.EditRequest_SetToNotConfirmed ();
    MF.EditRequest_SetAdressToFrom();

    MF.EditRequest_SaveChanges ();
    MF.EditRequest_OpenClient ();
    SF.sleep (0.5);
    V.client.passwd = 123;
    LF.SetClientPasswd (V.client.passwd);
    SF.sleep (2);
    LF.closeEditRequest();

condition.nowWeDoing = 'зашли под клиентом в акк';
    MF.Board_LogoutAdmin ();
    SF.get(V.accountURL);
    LF.LoginToAccountAsClient (V.client, V.client.passwd);
    MF.Account_CheckRequestStatus_NotConfirmed(V.request.Id);
    MF.Account_OpenRequest(V.request.Id);
    MF.Account_ClickViewRequest();
    SF.sleep (0.5);
    LF.ConfirmRequestInAccount_WithReservation();
    MF.Account_WaitForGreenTextAfterConfirm();
    LF.LogoutFromAccount ();

    SF.get (V.adminURL);
    LF.LoginToBoardAsCustom(V.adminLogin,V.adminPassword);

condition.nowWeDoing = 'идем в диспач первый раз';
    MF.Board_OpenLocalDispatch();
    LF.findDayInLocalDispatch(V.boardNumbers.moveDate.Year, V.boardNumbers.moveDate.Month, V.boardNumbers.moveDate.Day);
    MF.WaitWhileBusy();
    MF.WaitWhileBusy();
    MF.Dispatch_GridView();
    LF.SelectRequestDispatch(V.request.Id);
    LF.selectCrew(V.foremanName);
    MF.Board_LogoutAdmin();

condition.nowWeDoing = 'заходим под форменом, открываем контракт';
    LF.LoginToBoardAsCustomForeman(V.foremanLogin, V.foremanPassword);
    LF.OpenRequestInForemanPage(V.request.Id);
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
    SF.sleep(1);
    MF.Contract_UploadImage(V.path);
    MF.Contract_UploadImage(V.path);
    MF.Contract_SaveImages();
    // LF.Contract_ReviewGive(3, "test text for review");
    LF.MakeSignInContract();
    LF.MakeSignInContract();
    V.contractNumbers = {};
    MF.Contract_Submit(V.contractNumbers);
    MF.Contract_ReturnToForeman();
    LF.LogoutFromBoardForeman();

condition.nowWeDoing = 'идем в админку в диспач второй раз, проверить что работа есть в done и что баланс равен 0 после подписания';
    LF.LoginToBoardAsCustom(V.adminLogin,V.adminPassword);
    MF.Board_OpenLocalDispatch();
    LF.findDayInLocalDispatch(V.boardNumbers.moveDate.Year, V.boardNumbers.moveDate.Month, V.boardNumbers.moveDate.Day);
    MF.WaitWhileBusy();
    MF.WaitWhileBusy();
    MF.Dispatch_GridView();
    MF.Dispatch_ShowDoneJobs();
    LF.OpenRequestDispatch(V.request.Id);
    MF.EditRequest_WaitForBalanceVisible();
    SF.sleep(3);
    LF.RememberDigitsRequestBoard_Down(V.boardNumbers);
    MF.EditRequest_ScrollDown();
    VD.IWant(VD.ToEqual, V.boardNumbers.Balance, 0, 'Баланс после закрытия не равен 0');

condition.nowWeDoing = 'идем в паймент и проверяем что данные оплаты совпадают с тем что написано в receipt';
    MF.EditRequest_OpenPayment();
    driver.wait(driver.findElement(By.xpath('//tbody/tr[1][@ng-click="prepareToDelete($index, receipt.id)"]/td[4]')).getText().then(function(text){
        V.payment1 = SF.cleanPrice (text);
    }),config.timeout);
    driver.actions().mouseMove(driver.findElement(By.xpath('//tr[@ng-click="prepareToDelete($index, receipt.id)"]'))).doubleClick().perform();
    MF.WaitWhileBusy ();
    SF.waitForVisible (By.xpath('//span[contains(text(), "Amount: ")]'));
    driver.wait(driver.findElement(By.xpath('//span[contains(text(), "Amount: ")]/following-sibling::span')).getText().then(function(text){
        V.paymentAmount1 = SF.cleanPrice (text);
        VD.IWant (VD.ToEqual, V.paymentAmount1, V.payment1, 'оплата не совпала')
    }),config.timeout);
    SF.sleep (3);
    SF.click (By.xpath('//h2[contains(text(), "Receipt ")]/../../..//button[@ng-click="cancel()"]'));
    SF.sleep(3);

    driver.wait(driver.findElement(By.xpath('//tbody/tr[2][@ng-click="prepareToDelete($index, receipt.id)"]/td[4]')).getText().then(function(text){
        V.payment2 = SF.cleanPrice (text);
    }),config.timeout);
    driver.actions().mouseMove(driver.findElement(By.xpath('//tr[2][@ng-click="prepareToDelete($index, receipt.id)"]'))).doubleClick().perform();
    SF.sleep(3);
    MF.WaitWhileBusy ();
    SF.waitForVisible (By.xpath('//span[contains(text(), "Amount: ")]'));
    driver.wait(driver.findElement(By.xpath('//span[contains(text(), "Amount: ")]/following-sibling::span')).getText().then(function(text){
        V.paymentAmount2 = SF.cleanPrice (text);
        VD.IWant (VD.ToEqual, V.paymentAmount2, V.payment2, 'оплата не совпала')
    }),config.timeout);
    SF.sleep (2);

    //=========================закончили писать тест=============================
    SF.endOfTest();
};
