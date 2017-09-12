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
    LF.CreateLocalMovingFromBoard (V.client);
    LF.addInventoryBoard ();
    LF.addAdditionalInventoryBoard ();
    LF.addAdditionalInventoryBoard ();
    LF.addAdditionalInventoryBoard ();
    LF.addAdditionalInventoryBoard ();
    V.boardNumbers = {};
    LF.RememberDigitsRequestBoard (V.boardNumbers);
    SF.sleep(1);
    MF.EditRequest_SaveChanges ();
    MF.EditRequest_OpenSettings ();
    SF.click(By.xpath('//button[@ng-click="goToRequest()"]'));
    SF.openTab (1);
    SF.waitForLocated (By.xpath('//div[@class="Move Overview"]'));
    MF.WaitWhileBusy ();
    SF.sleep(3);
    V.accountNumbers = {};
    LF.RememberAccountNumbers (V.accountNumbers);
    LF.Validation_Compare_Account_Admin (V.accountNumbers, V.boardNumbers);
    SF.sleep(3);
    // SF.openTab (0);
    // SF.click(By.xpath('//span[@ng-click="switchCalc()"]/following-sibling::i'));
    // MF.Board_OpenSettingsGeneral ();
    // SF.click (By.linkText('Rates'));
    // SF.sleep (3);



    //=========================закончили писать тест=============================
    SF.endOfTest();
};
