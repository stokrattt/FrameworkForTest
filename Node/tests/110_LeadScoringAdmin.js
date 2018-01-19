module.exports = function main(SF, JS, MF, LF, JSstep, VD, V, By, until,FileDetector, system, condition, config,constants) {
    global.fiber = Fiber.current;
    V.client = {};
    V.client.name = SF.randomBukva(6) + '_t';
    V.client.fam = SF.randomBukva(6) + '_t';
    V.client.phone = SF.randomCifra(10);
    V.client.email = SF.randomBukvaSmall(6) + '@' + SF.randomBukvaSmall(4) + '.tes';
    V.client.passwd = 123;

    SF.get(V.adminURL);
    LF.LoginToBoardAsCustom(V.adminLogin,V.adminPassword);

    condition.nowWeDoing = 'создаем реквест с борда';
    LF.CreateLocalMovingFromBoard (V.client);
    MF.EditRequest_RememberId (V.request);
    V.boardNumbers = {};
    LF.RememberDigitsRequestBoard(V.boardNumbers);
    JS.step(JSstep.selectTruck((V.boardNumbers.LaborTimeMax + V.boardNumbers.TravelTime)/60));
    MF.WaitWhileBusy();
    MF.EditRequest_SetToNotConfirmed();
    MF.WaitWhileBusy();
    MF.EditRequest_SaveChanges();
    MF.EditRequest_OpenSettings();
    SF.click (By.xpath('//button[@ng-click="goToRequest()"]'));

    condition.nowWeDoing = 'идем в аккаунт, и на конфирмеишен от админа';
    MF.WaitWhileBusy ();
    MF.WaitWhileBusy ();
    SF.sleep(10);
    SF.openTab(1);
    SF.sleep(2);
    driver.close();
    SF.openTab(0);
    SF.waitForLocated(By.xpath('//button[@ng-click="goToConfirmation()"]'));
    SF.click (By.xpath('//button[@ng-click="goToConfirmation()"]'));
    SF.openTab(1);
    SF.sleep(2);
    driver.close();
    SF.openTab(0);
    LF.closeEditRequest();

    condition.nowWeDoing = 'заходим в реквест и проверяем, что очки не насчитались';
    MF.Board_OpenNotConfirmed();
    MF.Board_RefreshDashboard();
    MF.Board_OpenRequest (V.boardNumbers.Id);
    driver.wait(driver.findElement(By.xpath('//input[@ng-model="request.field_total_score"]')).getAttribute('value').then(function(text) {
        V.AdmPointReq  = text;
        VD.IWant(VD.ToEqual, V.AdmPointReq, 0 ,'добавились очки, хотя не должны были');
    }),config.timeout);
    SF.sleep(2);



    SF.endOfTest();
};


