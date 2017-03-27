function main() {
    global.fiber = Fiber.current;
    V.ReservationPrice = {};
    V.client = {};
    V.client.name = SFrandomBukva(6) + '_t';
    V.client.fam = SFrandomBukva(6) + '_t';
    V.client.phone = SFrandomCifra(10);
    V.client.email = SFrandomBukvaSmall(6) + '@' + SFrandomBukvaSmall(4) + '.tes';
    var URL = 'http://stage.themoveboard.com/moveBoard/#/login';
    var accountURL = 'http://stage.themoveboard.com/account/#/login';
    var adminURL = 'http://stage.themoveboard.com/moveBoard/#/login';
    SFget(URL);

    SFsend(By.id('email'), 'TestAdmin');
    SFsend(By.id('password'), 'test');
    JSclick('.btn-primary');

    SFclick (By.xpath('//button[@ng-click="toggleLeft()"]'));
    SFwaitForLocated (By.xpath('//button[@ng-click="toggleLeft()"]'));
    SFclick (By.xpath('//a[@ng-click="vm.goToPage(\'settings.general\', \'\')"]'));
    SFwaitForVisible (By.xpath('//a[@ng-click="vm.goToPage(\'settings.general\', \'\')"]'));
    SFclick (By.xpath('//a[@ui-sref="settings.schedule"]'));
    SFwaitForVisible (By.xpath('//a[@ui-sref="settings.schedule"]'));
    SFsleep(1);
    V.ReservationPrice = 150;
    SFclick (By.xpath('//input[@ng-model="vm.scheduleSettings.localReservationRate"]'));
    SFsend (By.xpath('//input[@ng-model="vm.scheduleSettings.localReservationRate"]'), V.ReservationPrice);
    SFsleep(1);
    SFclick (By.xpath('//input[@ng-model="vm.scheduleSettings.flatReservationRate"]'));
    SFsleep(1);
    driver.navigate().refresh();
    SFwaitForLocated(By.linkText('Create Request'));
    SFsleep (3);

    CreateMovAndStorFromBoard ();

    driver.wait(driver.findElement(By.xpath('//a[@ng-click="select(tabs[0])"]')).getText().then(function(text){
        V.request.Id = SFcleanPrice(text);
    }));
    JSselect ('#edit-status', 2);
    JSstep(selectTruck);
    SFclick (By.xpath('//button[@ng-click="UpdateRequest()"]'));
    SFwaitForVisible (By.xpath('//button[@ng-click="update(request)"]'));
    SFclick (By.xpath('//button[@ng-click="update(request)"]'));
    SFsleep (5);
    SFclick (By.xpath('//a[@ng-click="select(tabs[4])"]'));
    SFsleep (0.5);
    V.client.pass = 123;
    SFsend (By.id('inputPassword3'), V.client.pass);
    SFclick (By.xpath('//button[@ng-click="update(client)"]'));
    SFsleep (3);
    JSwaitForNotExist('div.toast-success');

    SFclick (By.xpath('//button[@ng-click="cancel()"]'));
    SFsleep (5);
    LogoutFromBoard ();
    SFget('http://stage.themoveboard.com/account/#/login');

    LoginToAccountAsClient ();

    SFwaitForVisible(By.xpath('//td[contains(text(),"'+V.request.Id+'")]/following-sibling::td[1]'));
    driver.wait(driver.findElement(By.xpath('//td[contains(text(),"'+V.request.Id+'")]/following-sibling::td[1]')).getText().then(function(Status){
        IWant(VToEqual,Status,'Not Confirmed');
    }));
    SFclick(By.xpath('//td[contains(text(),"'+V.request.Id+'")]/following-sibling::td/button[contains(text(),"View")]'));
    SFsleep(2);
    SFwaitForVisible (By.xpath('//div[@class="storagehelp"]'));
    SFclick (By.xpath('//button[@ng-click="cancel()"]'));
    SFsleep (0.5);
    SFclick (By.xpath('//div[@class="field-status notconfirmed ng-scope"]/a'));
    SFclick (By.xpath('//i[@class="fa fa-angle-down arrow-down"]'));
    SFsleep (0.5);
    SFclick (By.id('terms'));
    SFclick (By.id('cancel_policy'));
    driver.wait(driver.findElement(By.xpath('//div[@class="confirm ng-scope"]')).getText().then(function(deposit){
        V.DepositReservation = SFcleanPrice (deposit);
    }));
    IWant (VToEqual, V.DepositReservation, V.ReservationPrice, 'Резервация которую мы выставили в настройках не совпадает');
    SFclick (By.id('paybutton'));
    SFwaitForVisible (By.xpath('//div[@class="sweet-alert showSweetAlert visible"]'));
    SFclick (By.xpath('//button[@class="confirm"]'));
    SFwaitForVisible (By.xpath('//div[@class="modal-body form-horizontal"]'));
    SFsend (By.id('edit-moving-from'), 'otkuda edem');
    SFsend (By.id('edit-moving-from-apt'), 324535);
    SFclick (By.xpath('//button[@ng-click="update(client)"]'));
    SFwaitForVisible (By.xpath('//div[@class="sweet-alert showSweetAlert visible"]'));
    SFclick (By.xpath('//button[@class="confirm"]'));
    SFsleep (0.5);
    SFwaitForVisible (By.xpath('//div[@class="sweet-alert showSweetAlert visible"]'));
    SFsleep (0.5);
    SFclick (By.xpath('//button[@class="confirm"]'));
    SFsleep (0.5);

    FillCardPayModal ();

    SFwaitForVisible(By.xpath('//canvas[@id="signatureCanvasReserv"]'));
    JSmakeSign('signatureCanvasReserv');
    SFclick(By.xpath('//button[@ng-click="saveReservSignature()"]'));
    SFwaitForVisible (By.xpath('//div[@class="field-status confirm ng-scope"]'));
    driver.wait(driver.findElement(By.xpath('//div[@class="field-status confirm ng-scope"]/div')).getText().then(function(confirmed){
        IWant (VToEqual, confirmed, 'YOUR MOVE IS CONFIRMED AND SCHEDULED', 'статус не конферм, хотя должен был быть');
    }));
    LogoutFromAccount ();












    endOfTest();
}



//==================================================================================================

module.exports = main;