module.exports = function main(SF, JS, JSstep, VD, V, By, until,FileDetector, system, condition, LF,config,constants){
    global.fiber = Fiber.current;
    V.ReservationPrice = {};
    V.client = {};
    V.frontNumbersLoadingDown ={};
    V.accountNumbers = {};
    V.boardNumbers = {};


    V.client.name = SF.randomBukva(6) + '_t';
    V.client.fam = SF.randomBukva(6) + '_t';
    V.client.phone = SF.randomCifra(10);
    V.client.email = SF.randomBukvaSmall(6) + '@' + SF.randomBukvaSmall(4) + '.tes';

    SF.get(V.frontURL);
    JS.waitForExist ('#loader');
    SF.sleep (4);

    SF.click (By.xpath('//a[@href="#request"]'));
    SF.sleep (2);
    SF.click (By.xpath('//label[contains(text(), "Desired Move Date:")]/following-sibling::input[1]'));
    V.request={};
    driver.wait(driver.executeScript(JSstep.Click4DaysNewCalendar).then(function(MovDateFront){
        V.request.moveDate = MovDateFront;
        console.log(V.request);
    }), config.timeout);
    SF.sleep (0.5);
    SF.click (By.xpath('//label[contains(text(), "Service Type:")]/following-sibling::select/option[3]'));
    condition.nowWeDoing = 'создаем Loading реквест';

    SF.send (By.id('edit-zip-code-from'), '02032');
    JS.select ('#edit-size-move', 10);
    JS.select ('#edit-type-from', 2);
    JS.select ('#edit-type-to', 5);
    SF.sleep (0.5);
    JS.click ('#calculate_btn');
    SF.waitForLocated (By.xpath('//div[@class="form_block calc-form"]'));
    SF.sleep (4);
    SF.send(By.id('edit-first-name'), V.client.name);
    SF.send(By.id('edit-last-name'), V.client.fam);

    SF.sleep(0.3);
    SF.send(By.xpath('//div[@ng-if="!userLogin"]//input[@ng-model="request.primaryPhone"]'), V.client.phone);
    SF.sleep(0.3);
    SF.send(By.id('edit-additional-phone'), V.client.phone);
    SF.sleep(0.3);
    SF.send(By.xpath('//div[@ng-if="!userLogin"]//input[@ng-model="request.email"]'), V.client.email);
    SF.sleep(0.3);
    SF.send(By.id('edit-confirmemail'), V.client.email);
    SF.click(By.id('prefeefe'));
    SF.click (By.xpath('//div[@id="pref_popup"]//div[@class="select_item pre_2"]'));
    SF.select(By.xpath('//select[@ng-model="request.poll"]'), 'Google search');
    SF.click (By.xpath('//button[@ng-click="goToSummery()"]'));
    SF.sleep(2);
    JS.waitForNotExist ('div[ng-if="loadingImg"]');
    SF.sleep(4);
    condition.nowWeDoing = 'запоминаем данные';

    driver.wait(driver.findElement(By.xpath('//div[@class="box_info detailsinfo ng-scope"]/div/span')).getText().then(function (text) {
        V.frontNumbersLoadingDown.Crew = text.replace('Movers', '');
    }), config.timeout);
    driver.wait(driver.findElement(By.xpath('//div[@class="box_info detailsinfo ng-scope"]/div[2]/span')).getText().then(function (text) {
        V.frontNumbersLoadingDown.Truck = text.replace('Truck', '');
    }), config.timeout);
    driver.wait(driver.findElement(By.xpath('//div[@ng-if="calcsettings.travelTime"]/span')).getText().then(function (text) {
        V.frontNumbersLoadingDown.TravelTime = SF.cleanPrice(text.substring(text.indexOf('hr')))* 60;

    }), config.timeout);
    SF.sleep (1);
    driver.wait(driver.findElement(By.xpath('//div[@class="box_info detailsinfo ng-scope"]//div[@class="moving-date rate"]/span')).getText().then(function (text) {
        V.frontNumbersLoadingDown.Rate = text.indexOf('$', 4) == -1 ?
            SF.cleanPrice(text) :
            SF.cleanPrice(text.substring(text.indexOf('$', 4)));
    }), config.timeout);

    SF.sleep(1);
    console.log(V.frontNumbersLoadingDown);

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

    VD.IWant(VD.VToEqual, V.accountNumbers.CrewSize, V.frontNumbersLoadingDown.Crew, 'не совпали CrewSize аккаунта и фронта');
    VD.IWant(VD.VToEqual, V.accountNumbers.HourlyRate, V.frontNumbersLoadingDown.Rate, 'не совпали HourlyRate аккаунта и фронта');
    VD.IWant(VD.VToEqual, V.accountNumbers.TravelTime, V.frontNumbersLoadingDown.TravelTime, 'не совпали TravelTime аккаунта и фронта');
    VD.IWant(VD.VToEqual, V.accountNumbers.Trucks, V.frontNumbersLoadingDown.Truck, 'не совпали Trucks аккаунта и фронта');

    LF.LogoutFromAccount ();
    SF.get (V.adminURL);
    LF.LoginToBoardAsAdmin();

    LF.OpenRequest(V.accountNumbers.Id);

    JS.step(JSstep.selectTruck);

    LF.RememberDigitsRequestBoard(V.boardNumbers);
    SF.sleep (1);
    condition.nowWeDoing = 'сравниваем аккаунт и админку';
    LF.Validation_Compare_Account_Admin(V.accountNumbers,V.boardNumbers);

    JS.select ('#edit-status', 2);
    SF.click (By.xpath('//button[@ng-click="UpdateRequest()"]'));
    SF.waitForVisible (By.xpath('//button[@ng-click="update(request)"]'));
    SF.click (By.xpath('//button[@ng-click="update(request)"]'));
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
    SF.send (By.id('edit-moving-from'), 'otkuda edem');
    SF.send (By.id('edit-moving-from-apt'), 324535);
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
