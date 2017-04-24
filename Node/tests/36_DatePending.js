module.exports = function main(SF, JS, JSstep, VD, V, By, until,FileDetector, system, condition, LF,config,constants){
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
    JS.select ('#edit-status', 2);
    SF.click (By.xpath('//button[@ng-click="UpdateRequest()"]'));
    SF.waitForLocated (By.xpath('//button[@ng-click="update(request)"]'));
    SF.sleep (2);
    SF.click (By.xpath('//button[@ng-click="update(request)"]'));
    SF.sleep (5);
    JS.waitForNotExist("div.busyoverlay:visible");
    JS.waitForNotExist('div.toast-message:visible');
    JS.waitForNotExist('div.toast-success:visible');
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
    JS.select ('#edit-status', 2);
    SF.click (By.xpath('//button[@ng-click="UpdateRequest()"]'));
    SF.waitForLocated (By.xpath('//button[@ng-click="update(request)"]'));
    SF.sleep (2);
    SF.click (By.xpath('//button[@ng-click="update(request)"]'));
    SF.sleep (5);
    JS.waitForNotExist("div.busyoverlay:visible");
    JS.waitForNotExist('div.toast-message:visible');
    JS.waitForNotExist('div.toast-success:visible');
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
    JS.select ('#edit-status', 2);
    SF.click (By.xpath('//button[@ng-click="UpdateRequest()"]'));
    SF.waitForLocated (By.xpath('//button[@ng-click="update(request)"]'));
    SF.sleep (2);
    SF.click (By.xpath('//button[@ng-click="update(request)"]'));
    SF.sleep (5);
    JS.waitForNotExist("div.busyoverlay:visible");
    JS.waitForNotExist('div.toast-message:visible');
    JS.waitForNotExist('div.toast-success:visible');
    SF.click (By.xpath('//a[@ng-click="select(tabs[4])"]'));
    SF.sleep (0.5);
    V.client3.passwd = 123;
    SF.send (By.id('inputPassword3'), V.client3.passwd);
    SF.click (By.xpath('//button[@ng-click="update(client)"]'));
    SF.sleep (3);
    JS.waitForNotExist('div.toast-success');
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
    SF.waitForVisible (By.xpath('//button[@ng-click="cancel()"]'));
    SF.click (By.xpath('//button[@ng-click="cancel()"]'));
    SF.sleep (2);
    SF.click (By.xpath('//div[@class="field-status notconfirmed ng-scope"]/a'));
    SF.sleep(1);
    SF.click (By.xpath('//i[@class="fa fa-angle-down arrow-down"]'));
    SF.sleep (0.5);
    SF.click (By.id('terms'));
    SF.click (By.id('cancel_policy'));
    SF.click (By.id('paybutton'));
    SF.waitForVisible (By.xpath('//div[@class="sweet-alert showSweetAlert visible"]'));
    SF.click (By.xpath('//button[@class="confirm"]'));
    SF.waitForVisible (By.xpath('//div[@class="modal-body form-horizontal"]'));
    SF.send (By.id('edit-moving-from'), 'otkuda edem');
    SF.send (By.id('edit-moving-from-apt'), 324535);
    SF.send (By.xpath('//input[@ng-model="request.field_moving_to.thoroughfare"]'), 'kuda edem');
    SF.send (By.xpath('//input[@ng-value="request.apt_to.value"]'), 324535);
    SF.click (By.xpath('//button[@ng-click="update(client)"]'));
    SF.waitForVisible (By.xpath('//div[@class="sweet-alert showSweetAlert visible"]'));
    SF.click (By.xpath('//button[@class="confirm"]'));
    SF.waitForVisible (By.xpath('//div[@class="sweet-alert showSweetAlert visible"]'));
    SF.click (By.xpath('//button[@class="confirm"]'));
    SF.waitForVisible(By.xpath('//canvas[@id="signatureCanvasReserv"]'));
    LF.MakeSignJS('signatureCanvasReserv');
    SF.sleep(0.5);
    SF.click(By.xpath('//button[@ng-click="saveReservSignature();logClickButtons(\'Save reservation sign button clicked\')"]'));
    SF.sleep (1);
    LF.FillCardPayModal ();
    SF.sleep (5);
    SF.waitForVisible(By.xpath('//div[contains(text(),"Your move is confirmed and scheduled")]'));
    driver.wait(driver.findElement(By.xpath('//div[@class="field-status confirm ng-scope"]/div')).getText().then(function(confirmed){
        VD.IWant (VD.VToEqual, confirmed, 'YOUR MOVE IS CONFIRMED AND SCHEDULED', 'статус не конферм, хотя должен был быть');
    }), config.timeout);
    LF.LogoutFromAccount ();
    SF.get (V.adminURL);
    LF.LoginToBoardAsAdmin ();
condition.nowWeDoing = 'идем в админку проверять или два реквеста ушли в дата пендинг';
    driver.wait(driver.findElement(By.xpath('//td[@ng-click="requestEditModal(request)"][contains(text(),"' + V.Id1 + '")]/../td[2]/span')).getText().then(function (text) {
        VD.IWant (VD.VToEqual, text, 'Date Pending', 'первый реквест не ушел в дата пендинг а должен был');
    }), config.timeout);
    driver.wait(driver.findElement(By.xpath('//td[@ng-click="requestEditModal(request)"][contains(text(),"' + V.Id2 + '")]/../td[2]/span')).getText().then(function (text) {
        VD.IWant (VD.VToEqual, text, 'Date Pending', 'второй реквест не ушел в дата пендинг а должен был');
    }), config.timeout);
    LF.LogoutFromBoardAdmin ();
    //=========================закончили писать тест=============================
    SF.endOfTest();
};
