module.exports = function main(SF, JS, MF, LF, JSstep, VD, V, By, until,FileDetector, system, condition, config,constants) {    global.fiber = Fiber.current;
    V.client = {};
    V.client.name = SF.randomBukva(6) + '_t';
    V.client.fam = SF.randomBukva(6) + '_t';
    V.client.phone = SF.randomCifra(10);
    V.client.email = SF.randomBukvaSmall(6) + '@' + SF.randomBukvaSmall(4) + '.tes';

    SF.get(V.adminURL);

    LF.LoginToBoardAsAdmin ();
    LF.CreateLocalMovingFromBoard(V.client);
    SF.sleep (2);
    V.boardNumbers = {};
    LF.addInventoryBoard (V.boardNumbers);
condition.nowWeDoing = 'запоминаем все данные';
    LF.RememberDigitsRequestBoard(V.boardNumbers);
    JS.step(JSstep.selectTruck((V.boardNumbers.LaborTimeMax + V.boardNumbers.TravelTime)/60));
    LF.RememberDateFromRequest (V.boardNumbers);
    MF.EditRequest_RememberId (V.request);
    LF.addToCleanerJob(V.request.Id);
    MF.EditRequest_SetToConfirmed ();
    MF.EditRequest_SetAdressToFrom ();
    MF.EditRequest_SaveChanges ();
    LF.closeEditRequest();
    SF.sleep (2);
condition.nowWeDoing = 'идем в диспач первый раз';
    MF.Board_OpenLocalDispatch ();
    LF.findDayInLocalDispatch(V.boardNumbers.moveDate.Year,V.boardNumbers.moveDate.Month,V.boardNumbers.moveDate.Day);
    MF.WaitWhileBusy ();
    SF.sleep(1);
    MF.WaitWhileBusy ();
    MF.Dispatch_GridView();
    LF.SelectRequestDispatch (V.request.Id);
    LF.selectCrew();
    LF.LogoutFromBoardAdmin();
condition.nowWeDoing = 'заходим под форменом, открываем контракт';
    LF.LoginToBoardAsForeman();
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
    MF.WaitWhileBusy ();
    LF.MakeSignInContract();
    LF.MakeSignInContract();
    MF.Contract_Submit();
    MF.Contract_ReturnToForeman();
    LF.LogoutFromBoardForeman();
condition.nowWeDoing = 'идем в админку в диспач второй раз, проверить что работа есть в done и что баланс равен 0 после подписания';
    LF.LoginToBoardAsAdmin();
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
    VD.IWant(VD.VToEqual, V.boardNumbers.Balance, 0, 'Баланс после закрытия не равен 0');
    // LF.closeEditRequest ();
    // LF.LogoutFromBoardAdmin ();
    //=========================закончили писать тест=============================
    SF.endOfTest();
};
