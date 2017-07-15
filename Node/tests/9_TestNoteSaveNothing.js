module.exports = function main(SF, JS, MF, LF, JSstep, VD, V, By, until,FileDetector, system, condition, config,constants) {    global.fiber = Fiber.current;
    V.client = {};
    V.client.name = SF.randomBukva(6) + '_t';
    V.client.fam = SF.randomBukva(6) + '_t';
    V.client.phone = SF.randomCifra(10);
    V.client.email = SF.randomBukvaSmall(6) + '@' + SF.randomBukvaSmall(4) + '.tes';
    V.note = {};

    SF.get(V.adminURL);
    LF.LoginToBoardAsCustom(V.adminLogin,V.adminPassword);
    LF.CreateLocalMovingFromBoard(V.client);
    driver.wait(driver.findElement(By.xpath('//a[@ng-click="select(tabs[0])"]')).getText().then(function(text){
        V.request.Id = SF.cleanPrice(text);
        LF.addToCleanerJob(V.request.Id);
    }),config.timeout);
    Debug.pause();
    SF.click(By.xpath('//div[contains(@class, "sales_notes")]'));
    V.note = SF.randomBukva(7);
    SF.send(By.xpath('//div[contains(@class, "sales_notes")]/div[2]/div[3]'), V.note);
    MF.EditRequest_SaveNotes ();

    V.boardNumbers = {};
    LF.RememberDigitsRequestBoard(V.boardNumbers);
    JS.step(JSstep.selectTruck((V.boardNumbers.LaborTimeMax + V.boardNumbers.TravelTime)/60));
    MF.EditRequest_SaveChanges ();

    LF.closeEditRequest ();
    MF.WaitWhileBusy ();
    MF.Board_OpenRequest(V.request.Id);
    driver.wait(driver.findElement(By.xpath('//div[contains(@class, "sales_notes")]')).getText().then(function(text) {
      VD.IWant(VD.ToEqual, text, V.note, 'Не совпали заметочки.');
    }),config.timeout);
    SF.sleep(1);
    SF.click(By.xpath('//div[contains(@class, "sales_notes")]'));
    SF.clear(By.xpath('//div[contains(@class, "sales_notes")]/div[2]/div[3]'));
    V.note = {};
    V.note = SF.randomBukva(10);
    SF.send(By.xpath('//div[contains(@class, "sales_notes")]/div[2]/div[3]'), V.note);
    MF.EditRequest_SaveNotes ();

    LF.addInventoryBoard ();
    MF.EditRequest_SetToNotConfirmed ();
    MF.EditRequest_SaveChanges ();
    LF.closeEditRequest ();
    MF.Board_OpenNotConfirmed ();
    MF.Board_RefreshDashboard ();
    MF.WaitWhileBusy ();
    MF.Board_OpenRequest(V.request.Id);
    driver.wait(driver.findElement(By.xpath('//div[contains(@class, "sales_notes")]')).getText().then(function(text) {
        VD.IWant(VD.ToEqual, text, V.note, 'Не совпали заметочки.');
    }),config.timeout);
    SF.sleep(1);
    JS.click('button[ng-click=\\"UpdateRequest()\\"]');

condition.nowWeDoing='сейчас должно появиться Nothing to Update!';
    JS.waitForExist("h2:contains(\"Nothing to Update!\")");
    MF.SweetConfirm();

    SF.endOfTest();
};
