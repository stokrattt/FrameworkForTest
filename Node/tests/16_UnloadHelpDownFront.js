module.exports = function main(SF, JS, JSstep, VD, V, By, until,FileDetector, system, condition, LF,config,constants){
    global.fiber = Fiber.current;
    V.ReservationPrice = {};
    V.client = {};
    V.frontNumbersUnloadingDown ={};
    V.accountNumbers = {};

    V.client.name = SF.randomBukva(6) + '_t';
    V.client.fam = SF.randomBukva(6) + '_t';
    V.client.phone = SF.randomCifra(10);
    V.client.email = SF.randomBukvaSmall(6) + '@' + SF.randomBukvaSmall(4) + '.tes';

    SF.get(V.frontURL);
    //JS.waitForExist ('#loader');
    SF.sleep (6);

    LF.CreateUnloadingHelpDownForm (V.client);

condition.nowWeDoing = 'запоминаем данные';

    driver.wait(driver.findElement(By.xpath('//div[@class="box_info detailsinfo ng-scope"]/div/span')).getText().then(function (text) {
        V.frontNumbersUnloadingDown.Crew = text.replace('Movers', '');
    }), config.timeout);
    driver.wait(driver.findElement(By.xpath('//div[@class="box_info detailsinfo ng-scope"]/div[2]/span')).getText().then(function (text) {
        V.frontNumbersUnloadingDown.Truck = SF.cleanPrice (text);
    }), config.timeout);
    driver.wait(driver.findElement(By.xpath('//div[@ng-if="calcsettings.travelTime"]/span')).getText().then(function (text) {
        V.frontNumbersUnloadingDown.TravelTime = SF.cleanPrice(text.substring(text.indexOf('hr')))* 60;

    }), config.timeout);
    SF.sleep (1);
    driver.wait(driver.findElement(By.xpath('//div[@class="box_info detailsinfo ng-scope"]//div[@class="moving-date rate"]/span')).getText().then(function (text) {
        V.frontNumbersUnloadingDown.Rate = text.indexOf('$', 4) == -1 ?
            SF.cleanPrice(text) :
            SF.cleanPrice(text.substring(text.indexOf('$', 4)));
    }), config.timeout);

    SF.sleep(1);
    console.log(V.frontNumbersUnloadingDown);

    SF.click(By.id('submitRequestButton'));
    SF.sleep (2);
    SF.click(By.linkText('View Request Page'));
    SF.sleep(4);
    SF.openTab (1);

condition.nowWeDoing = 'пошли в аккаунт';

    SF.sleep (3);
    SF.waitForVisible (By.xpath('//div[@class="calc-confirm ng-binding"]'));
    SF.click (By.xpath('//button[@ng-click="cancel()"]'));
    SF.sleep (3.5);

    LF.RememberAccountNumbers (V.accountNumbers);
    LF.addToCleanerJob(V.accountNumbers.Id);

    VD.IWant(VD.VToEqual, V.accountNumbers.CrewSize, V.frontNumbersUnloadingDown.Crew, 'не совпали CrewSize аккаунта и фронта');
    VD.IWant(VD.VToEqual, V.accountNumbers.HourlyRate, V.frontNumbersUnloadingDown.Rate, 'не совпали HourlyRate аккаунта и фронта');
    VD.IWant(VD.VToEqual, V.accountNumbers.TravelTime, V.frontNumbersUnloadingDown.TravelTime, 'не совпали TravelTime аккаунта и фронта');
    VD.IWant(VD.VToEqual, V.accountNumbers.Trucks, V.frontNumbersUnloadingDown.Truck, 'не совпали Trucks аккаунта и фронта');


    LF.LogoutFromAccount ();
    SF.get (V.adminURL);
    LF.LoginToBoardAsAdmin();

    LF.OpenRequest(V.accountNumbers.Id);


    V.boardNumbers = {};
    LF.RememberDigitsRequestBoard(V.boardNumbers);
    JS.step(JSstep.selectTruck((V.boardNumbers.LaborTimeMax + V.boardNumbers.TravelTime)/60));
    SF.sleep (1);
    condition.nowWeDoing = 'сравниваем аккаунт и админку';
    LF.Validation_Compare_Account_Admin(V.accountNumbers,V.boardNumbers);

    JS.select ('#edit-status', 2);
    SF.click (By.xpath('//button[@ng-click="UpdateRequest()"]'));
    SF.waitForVisible (By.xpath('//button[@ng-click="update(request)"]'));
    SF.click (By.xpath('//button[@ng-click="update(request)"]'));
    JS.waitForNotExist('div.toast-success');
    JS.waitForNotExist("div.busyoverlay:visible");
    SF.sleep (5);
    SF.click (By.xpath('//a[@ng-click="select(tabs[4])"]'));
    SF.sleep (0.5);
    V.client.passwd = 123;
    SF.send (By.id('inputPassword3'), V.client.passwd);
    SF.click (By.xpath('//button[@ng-click="update(client)"]'));
    SF.sleep (3);
    JS.waitForNotExist('div.toast-success');
    SF.click (By.xpath('//button[@ng-click="cancel()"]'));
    SF.sleep (5);

    LF.LogoutFromBoardAdmin ();
    SF.get(V.accountURL);
    LF.LoginToAccountAsClient (V.client, V.client.passwd);
    condition.nowWeDoing = 'зашли под клиентом букаем  работу';
    SF.waitForVisible(By.xpath('//td[contains(text(),"'+V.accountNumbers.Id+'")]/following-sibling::td[1]'));
    driver.wait(driver.findElement(By.xpath('//td[contains(text(),"'+V.accountNumbers.Id+'")]/following-sibling::td[1]')).getText().then(function(Status){
        VD.IWant(VD.VToEqual,Status,'Not Confirmed');
    }), config.timeout);
    SF.sleep (1);
    SF.click(By.xpath('//td[contains(text(),"'+V.accountNumbers.Id+'")]/following-sibling::td/button[contains(text(),"View")]'));
    SF.sleep(3);

    SF.click (By.xpath('//div[@class="field-status notconfirmed ng-scope"]/a'));
    SF.click (By.xpath('//i[@class="fa fa-angle-down arrow-down"]'));
    SF.sleep (0.5);
    SF.click (By.id('terms'));
    SF.click (By.id('cancel_policy'));
    SF.click (By.id('paybutton'));
    SF.waitForVisible (By.xpath('//div[@class="sweet-alert showSweetAlert visible"]'));
    SF.click (By.xpath('//button[@class="confirm"]'));
    SF.waitForVisible (By.xpath('//div[@class="modal-body form-horizontal"]'));
    SF.send (By.xpath('//input[@ng-model="request.field_moving_to.thoroughfare"]'), 'otkuda edem');
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
    SF.waitForVisible (By.xpath('//div[@class="field-status confirm ng-scope"]'));
    driver.wait(driver.findElement(By.xpath('//div[@class="field-status confirm ng-scope"]/div')).getText().then(function(confirmed){
        VD.IWant (VD.VToEqual, confirmed, 'YOUR MOVE IS CONFIRMED AND SCHEDULED', 'статус не конферм, хотя должен был быть');
    }), config.timeout);
    LF.LogoutFromAccount ();



    SF.endOfTest();
};
