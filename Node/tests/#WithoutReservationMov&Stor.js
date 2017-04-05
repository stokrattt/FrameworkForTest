module.exports = function main(driver, SF, JS, JSstep, VD, V, By, until,FileDetector, system, condition, LF,config,constants){
    global.fiber = Fiber.current;
    V.ReservationPrice = {};
    V.client = {};
    V.client.name = SF.randomBukva(6) + '_t';
    V.client.fam = SF.randomBukva(6) + '_t';
    V.client.phone = SF.randomCifra(10);
    V.client.email = SF.randomBukvaSmall(6) + '@' + SF.randomBukvaSmall(4) + '.tes';

    SF.get(V.adminURL);

    SF.send(By.id('email'), 'TestAdmin');
    SF.send(By.id('password'), 'test');
    JS.click('.btn-primary');
    SF.sleep (2);
    SF.click (By.xpath('//button[@ng-click="toggleLeft()"]'));
    SF.waitForVisible (By.xpath('//button[@ng-click="toggleLeft()"]'));
    SF.click (By.xpath('//a[@ng-click="vm.goToPage(\'settings.general\', \'\')"]'));
    SF.waitForVisible (By.xpath('//a[@ng-click="vm.goToPage(\'settings.general\', \'\')"]'));
    SF.click (By.xpath('//a[@ui-sref="settings.schedule"]'));
    SF.waitForVisible (By.xpath('//a[@ui-sref="settings.schedule"]'));
    SF.sleep(6);
    JS.select ('select[ng-model="vm.scheduleSettings.localReservation"]', 0);
    SF.sleep (2);

    V.ReservationPrice = 0;
    SF.click (By.xpath('//input[@ng-model="vm.scheduleSettings.localReservationRate"]'));
    SF.sleep (2);
    SF.send (By.xpath('//input[@ng-model="vm.scheduleSettings.localReservationRate"]'), 0);
    SF.sleep (2);
    SF.click (By.xpath('//input[@ng-model="vm.scheduleSettings.flatReservationRate"]'));
    SF.sleep(2);
    driver.navigate().refresh();
    SF.sleep(6);
    JS.select ('select[ng-model="vm.scheduleSettings.localReservation"]', 0);
    SF.sleep (2);
    SF.waitForLocated(By.linkText('Create Request'));
    SF.sleep (3);
    LF.CreateMovAndStorFromBoard ();


    driver.wait(driver.findElement(By.xpath('//a[@ng-click="select(tabs[0])"]')).getText().then(function(text){
        V.request.Id = SF.cleanPrice(text);
    }));
    JS.select ('#edit-status', 2);
    JS.step(JSstep.selectTruck);
    SF.click (By.xpath('//button[@ng-click="UpdateRequest()"]'));
    SF.waitForVisible (By.xpath('//button[@ng-click="update(request)"]'));
    SF.click (By.xpath('//button[@ng-click="update(request)"]'));
    SF.sleep (5);
    SF.click (By.xpath('//a[@ng-click="select(tabs[4])"]'));
    SF.sleep (0.5);
    V.client.pass = 123;
    SF.send (By.id('inputPassword3'), V.client.pass);
    SF.click (By.xpath('//button[@ng-click="update(client)"]'));
    SF.sleep (3);
    JS.waitForNotExist('div.toast-success');

    SF.click (By.xpath('//button[@ng-click="cancel()"]'));
    SF.sleep (5);
    LF.LogoutFromBoardAdmin ();
    SF.get(V.accountURL);

    LF.LoginToAccountAsClient (V.client);

    SF.waitForVisible(By.xpath('//td[contains(text(),"'+V.request.Id+'")]/following-sibling::td[1]'));
    driver.wait(driver.findElement(By.xpath('//td[contains(text(),"'+V.request.Id+'")]/following-sibling::td[1]')).getText().then(function(Status){
        VD.IWant(VD.VToEqual,Status,'Not Confirmed');
    }));
    SF.click(By.xpath('//td[contains(text(),"'+V.request.Id+'")]/following-sibling::td/button[contains(text(),"View")]'));
    SF.sleep(2);
    SF.waitForVisible (By.xpath('//div[@class="storagehelp"]'));
    SF.click (By.xpath('//button[@ng-click="cancel()"]'));
    SF.sleep (0.5);
    SF.click (By.xpath('//div[@class="field-status notconfirmed ng-scope"]/a'));
    SF.click (By.xpath('//i[@class="fa fa-angle-down arrow-down"]'));
    SF.sleep (0.5);
    SF.click (By.id('terms'));
    SF.click (By.id('cancel_policy'));
    SF.sleep (2);

    SF.click (By.id('adminbutton'));
    SF.waitForVisible (By.xpath('//div[@class="sweet-alert showSweetAlert visible"]'));
    SF.click (By.xpath('//button[@class="confirm"]'));
    SF.waitForVisible (By.xpath('//div[@class="modal-body form-horizontal"]'));
    SF.send (By.id('edit-moving-from'), 'otkuda edem');
    SF.send (By.id('edit-moving-from-apt'), 324535);
    SF.click (By.xpath('//button[@ng-click="update(client)"]'));
    SF.sleep (0.5);
    SF.waitForVisible(By.xpath('//canvas[@id="signatureCanvasReservation"]'));
    SF.sleep (0.5);

    LF.MakeSignJS('signatureCanvasReservation');
    SF.click(By.xpath('//button[@ng-click="saveSignature()"]'));
    SF.waitForVisible (By.xpath('//div[@class="field-status confirm ng-scope"]'));
    SF.click (By.xpath('//button[@class="confirm"]'));

    driver.wait(driver.findElement(By.xpath('//div[@class="field-status confirm ng-scope"]/div')).getText().then(function(confirmed){
        VD.IWant (VD.VToEqual, confirmed, 'YOUR MOVE IS CONFIRMED AND SCHEDULED', 'статус не конферм, хотя должен был быть');
    }));
    LF.LogoutFromAccount ();

    // возвращаем резервацию на 150

    SF.get(V.adminURL);

    LF.LoginToBoardAsAdmin();

    SF.click (By.xpath('//button[@ng-click="toggleLeft()"]'));
    SF.waitForVisible (By.xpath('//button[@ng-click="toggleLeft()"]'));
    SF.click (By.xpath('//a[@ng-click="vm.goToPage(\'settings.general\', \'\')"]'));
    SF.waitForVisible (By.xpath('//a[@ng-click="vm.goToPage(\'settings.general\', \'\')"]'));
    SF.click (By.xpath('//a[@ui-sref="settings.schedule"]'));
    SF.waitForVisible (By.xpath('//a[@ui-sref="settings.schedule"]'));
    SF.sleep(3);

    SF.click (By.xpath('//input[@ng-model="vm.scheduleSettings.localReservationRate"]'));
    SF.sleep (2);
    SF.send (By.xpath('//input[@ng-model="vm.scheduleSettings.localReservationRate"]'), 150);
    SF.sleep (2);
    SF.click (By.xpath('//input[@ng-model="vm.scheduleSettings.flatReservationRate"]'));
    SF.sleep(2);
    driver.navigate().refresh();
    SF.waitForLocated(By.linkText('Create Request'));
    SF.sleep (3);
    LF.LogoutFromBoardAdmin ();


    SF.endOfTest();
};