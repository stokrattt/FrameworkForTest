module.exports = function main(SF, JS, JSstep, VD, V, By, until,FileDetector, system, condition, LF,config,constants){
    global.fiber = Fiber.current;
    V.ReservationPrice = {};
    V.client = {};
    V.frontNumbersDown ={};
    V.client.name = SF.randomBukva(6) + '_t';
    V.client.fam = SF.randomBukva(6) + '_t';
    V.client.phone = SF.randomCifra(10);
    V.client.email = SF.randomBukvaSmall(6) + '@' + SF.randomBukvaSmall(4) + '.tes';

    SF.get(V.frontURL);
    JS.waitForExist ('#loader');

    SF.click (By.xpath('//a[@href="#request"]'));
    SF.sleep (2);
    SF.click (By.xpath('//label[contains(text(), "Desired Move Date:")]/following-sibling::input[1]'));
    V.request={};
    driver.wait(driver.executeScript(JSstep.Click4DaysNewCalendar).then(function(MovDateFront){
        V.request.moveDate = MovDateFront;
        console.log(V.request);
    }), config.timeout);
    SF.sleep (0.5);
    SF.click (By.xpath('//label[contains(text(), "Service Type:")]/following-sibling::select/option[2]'));
    SF.click (By.xpath('//label[contains(text(), "Desired Delivery Date:")]/following-sibling::input[1]'));
    driver.wait(driver.executeScript(JSstep.Click8DaysNewCalendar).then(function(DelDateFront){
        V.request.DelDate = DelDateFront;
        console.log(V.request.DelDate);
    }), config.timeout);
    SF.send (By.id('edit-zip-code-from'), '02136');
    SF.send (By.id('edit-zip-code-to'), '02032');
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
    SF.select(By.xpath('//select[@ng-model="request.prefDelivery"]'), 3);
    SF.select(By.xpath('//select[@ng-model="request.poll"]'), 'Google search');
    SF.click (By.xpath('//button[@ng-click="goToSummery()"]'));
    SF.sleep(2);
    JS.waitForNotExist ('div[ng-if="loadingImg"]');
    SF.sleep(4);

    //SF.waitForLocated(By.id('submitRequestButton'));

    driver.wait(driver.findElement(By.xpath('//div[@class="box_info general"]/div/span')).getText().then(function(text){
        V.nameRequest = text;
        VD.IWant(VD.VToEqual, V.nameRequest, 'Moving & Storage', 'тип реквеста не совпал с созданным');
    }), config.timeout);

    condition.nowWeDoing = 'запоминаем данные с мувинг сторадж TУ';

    driver.wait(driver.findElement(By.xpath('//div[@class="box_info from_storage storage"]//div[@ng-if="storageCalcResult.to.surcharge_fuel"]/span')).getText().then(function(text){
        V.frontNumbersDown.FuelTo = SF.cleanPrice (text.replace('$', ''));
    }), config.timeout);
    driver.wait(driver.findElement(By.xpath('//div[@class="box_info from_storage storage"]//div[@ng-if="storageCalcResult.to.isMinHourLessThenMaxTime"]/span')).getText().then(function(text){
        V.frontNumbersDown.QuoteMinTo = SF.cleanPrice(text.substring(0, text.indexOf('-')));
        V.frontNumbersDown.QuoteMaxTo = SF.cleanPrice(text.substring(text.indexOf('-') + 1));
    }), config.timeout);
    driver.wait(driver.findElement(By.xpath('//div[@ng-if="storageCalcResult.to.travelTime"]/span')).getText().then(function (text) {
        V.frontNumbersDown.TravelTimeTo = SF.cleanPrice(text.substring(text.indexOf('min')));
    }), config.timeout);
    driver.wait(driver.findElement(By.xpath('//div[@class="box_info from_storage storage"]//div[4]/span')).getText().then(function (text) {
        V.frontNumbersDown.CrewTo = text.replace('Movers', '');
        console.log(V.frontNumbersDown.CrewTo);
    }), config.timeout);
    driver.wait(driver.findElement(By.xpath('//div[@class="box_info from_storage storage"]//div[@class="moving-date rate"]/span')).getText().then(function (text) {
        V.frontNumbersDown.RateTo = SF.cleanPrice(text.replace('$|/|hr,/gi', ''));
        console.log(V.frontNumbersDown.RateTo);
    }), config.timeout);


    console.log(V.frontNumbersDown);

    SF.endOfTest();
};
