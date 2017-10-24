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

condition.nowWeDoing = 'создаем реквест, ставим нот конферм и резервируем его с админки';
    LF.LoginToBoardAsCustom(V.adminLogin,V.adminPassword);
    LF.CreateLocalMovingFromBoard (V.client);
    MF.EditRequest_SetAdressToFrom ();
    MF.EditRequest_SetToNotConfirmed();
    V.boardNumbers = {};
    LF.RememberDigitsRequestBoard (V.boardNumbers);
    JS.step(JSstep.selectTruck((V.boardNumbers.LaborTimeMax + V.boardNumbers.TravelTime)/60));
    MF.WaitWhileBusy();
    MF.EditRequest_SaveChanges ();
    MF.EditRequest_OpenClient ();
    LF.SetClientPasswd(V.client.passwd);
    MF.EditRequest_OpenRequest ();
    MF.EditRequest_OpenPaymentModalWindow();
    SF.click(By.xpath('//a[@ng-click="addReservationPayment()"]'));
    SF.waitForLocated (By.xpath('//button[@ng-click="goStepTwo();"]'));
    SF.click (By.xpath('//button[@ng-click="goStepTwo();"]'));
    LF.FillCardPayModal ();
    JS.waitForExist ('button[ng-click=\\"cancel()\\"]:visible');
    JS.click('button[ng-click=\\"cancel()\\"]:visible');
    MF.Board_Refresh ();
    MF.Board_OpenReserved();
    MF.Board_OpenRequest (V.boardNumbers.Id);
    LF.closeEditRequest ();
    MF.Board_LogoutAdmin ();
    SF.get(V.accountURL);
    LF.LoginToAccountAsClient (V.client);
    MF.Account_CheckRequestStatus_NotConfirmed(V.boardNumbers.Id);
    MF.Account_OpenRequest(V.boardNumbers.Id);
    MF.Account_ClickViewRequest ();
    MF.Account_ClickProceedBookYourMove();

    JS.waitForExist('div.confirm');
    JS.scroll('div.confirm');
    MF.Account_ClickIAgreeWithAll();
    SF.click(By.xpath('//input[@ng-click="confirmReservation()"]'));
    SF.waitForVisible(By.xpath('//canvas[@id="signatureCanvasReserv"]'));
    LF.MakeSignJS('signatureCanvasReserv');
    SF.click(By.xpath('//button[@ng-click="saveReservSignature();logClickButtons(\'Save reservation sign button clicked\')"]'));

    SF.waitForVisible (By.xpath('//div[@class="field-status confirm"]'));
    driver.wait(driver.findElement(By.xpath('//div[@class="field-status confirm"]/div')).getText().then(function(confirmed){
        VD.IWant (VD.ToEqual, confirmed, 'YOUR MOVE IS CONFIRMED AND SCHEDULED', 'статус не конферм, хотя должен был быть');
    }), config.timeout);
    SF.sleep(2);
    LF.LogoutFromAccount ();
    SF.get(V.adminURL);
    LF.LoginToBoardAsCustom(V.adminLogin,V.adminPassword);
    MF.Board_OpenConfirmed ();
    MF.Board_OpenRequest (V.boardNumbers.Id);

    //=========================закончили писать тест=============================
    SF.endOfTest();
};
