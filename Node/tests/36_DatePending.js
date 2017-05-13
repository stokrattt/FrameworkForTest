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
    LF.LoginToBoardAsAdmin();

condition.nowWeDoing = 'создаем первый реквест';
    LF.CreateLocalMovingFromBoard(V.client);
    V.boardNumbers = {};
    LF.RememberDigitsRequestBoard(V.boardNumbers);
    JS.step(JSstep.selectTruck((V.boardNumbers.LaborTimeMax + V.boardNumbers.TravelTime)/60));
    SF.sleep(2);
    driver.wait(driver.executeScript("return $('#edit-start-time').val()").then(function (text) {
        V.time = text;
        console.log (V.time);
    }),config.timeout);
    driver.wait(driver.executeScript("return $('div .choosen[ng-click=\"chooseTruck(tid)\"]').text()").then(function (text) {
        V.truck = text;
        console.log(V.truck);
    }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//a[@ng-click="select(tabs[0])"]')).getText().then(function(text){
        V.Id1 = SF.cleanPrice(text);
        LF.addToCleanerJob(V.Id1);
    }), config.timeout);
    MF.EditRequest_SetToNotConfirmed ();
    MF.EditRequest_SaveChanges ();
    LF.closeEditRequest ();
    V.client2 = {};
    V.client2.name = SF.randomBukva(6) + '_t';
    V.client2.fam = SF.randomBukva(6) + '_t';
    V.client2.phone = SF.randomCifra(10);
    V.client2.email = SF.randomBukvaSmall(6) + '@' + SF.randomBukvaSmall(4) + '.tes';

condition.nowWeDoing = 'создаем второй реквест, ставим нот конферм и выбираем трак такой же как у первого и время тоже самое';
    LF.CreateLocalMovingFromBoard(V.client2);
    driver.wait(driver.findElement(By.xpath('//a[@ng-click="select(tabs[0])"]')).getText().then(function(text){
        V.Id2 = SF.cleanPrice(text);
        LF.addToCleanerJob(V.Id2);
    }), config.timeout);
    SF.clear(By.id('edit-start-time'));
    SF.send(By.id('edit-start-time'), V.time);
    SF.sleep (1);
    SF.click (By.xpath('//div[@ng-click="chooseTruck(tid)"][contains(text(), "'+V.truck+'")]'));
    MF.EditRequest_SetToNotConfirmed ();
    MF.EditRequest_SaveChanges ();
    LF.closeEditRequest ();
    V.client3 = {};
    V.client3.name = SF.randomBukva(6) + '_t';
    V.client3.fam = SF.randomBukva(6) + '_t';
    V.client3.phone = SF.randomCifra(10);
    V.client3.email = SF.randomBukvaSmall(6) + '@' + SF.randomBukvaSmall(4) + '.tes';

condition.nowWeDoing = 'создаем третий реквест, ставим нот конферм и выбираем трак такой же как у первого и время тоже самое';
    LF.CreateLocalMovingFromBoard(V.client3);
    driver.wait(driver.findElement(By.xpath('//a[@ng-click="select(tabs[0])"]')).getText().then(function(text){
        V.Id3 = SF.cleanPrice(text);
        LF.addToCleanerJob(V.Id3);
    }), config.timeout);
    SF.clear(By.id('edit-start-time'));
    SF.send(By.id('edit-start-time'), V.time);
    SF.sleep (1);
    SF.click (By.xpath('//div[@ng-click="chooseTruck(tid)"][contains(text(), "'+V.truck+'")]'));
    MF.EditRequest_SetToNotConfirmed ();
    MF.EditRequest_SaveChanges ();
    MF.EditRequest_OpenClient ()
    SF.sleep (0.5);
    V.client3.passwd = 123;
    LF.SetClientPasswd (V.client3.passwd);
    LF.closeEditRequest ();
    LF.LogoutFromBoardAdmin ();
    SF.get(V.accountURL);

condition.nowWeDoing = 'идем в аккаунт букать третью работу';
    LF.LoginToAccountAsClient (V.client3);
    SF.waitForVisible(By.xpath('//td[contains(text(),"'+V.Id3+'")]/following-sibling::td[1]'));
    driver.wait(driver.findElement(By.xpath('//td[contains(text(),"'+V.Id3+'")]/following-sibling::td[1]')).getText().then(function(Status){
        VD.IWant(VD.VToEqual,Status,'Not Confirmed');
    }),config.timeout);
    SF.click(By.xpath('//td[contains(text(),"'+V.Id3+'")]/following-sibling::td/button[contains(text(),"View")]'));
    MF.Account_ClickViewRequest ();
    SF.sleep (2);
    LF.ConfirmRequestInAccount_WithReservationWithAdress ();
    LF.LogoutFromAccount ();
    SF.get (V.adminURL);
    LF.LoginToBoardAsAdmin ();
condition.nowWeDoing = 'идем в админку проверять или два реквеста ушли в дата пендинг';
    driver.wait(driver.findElement(By.xpath('//td[@ng-click="requestEditModal(request)"][contains(text(),"' + V.Id1 + '")]/../td[2]/span')).getText().then(function (text) {
        VD.IWant (VD.VToEqual, text, 'Date Pending', 'первый реквест не ушел в дата пендинг а должен был');
    }), config.timeout);
    SF.sleep(1);
    driver.wait(driver.findElement(By.xpath('//td[@ng-click="requestEditModal(request)"][contains(text(),"' + V.Id2 + '")]/../td[2]/span')).getText().then(function (text) {
        VD.IWant (VD.VToEqual, text, 'Date Pending', 'второй реквест не ушел в дата пендинг а должен был');
    }), config.timeout);
    SF.sleep(1);
    LF.LogoutFromBoardAdmin ();
    //=========================закончили писать тест=============================
    SF.endOfTest();
};
