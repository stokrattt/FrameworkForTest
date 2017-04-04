module.exports = function main(driver, SF, JS, JSstep, VD, V, By, until,FileDetector, system, condition, Debug,LF,config,constants){
    global.fiber = Fiber.current;
    V.ReservationPrice = {};
    V.client = {};
    V.client.name = SF.randomBukva(6) + '_t';
    V.client.fam = SF.randomBukva(6) + '_t';
    V.client.phone = SF.randomCifra(10);
    V.client.email = SF.randomBukvaSmall(6) + '@' + SF.randomBukvaSmall(4) + '.tes';

    SF.get(V.frontURL);

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
    SF.sleep (2);
    driver.wait(driver.findElement(By.xpath('//div[@class="box_info general"]/div/span').getText().then(function(text){
        V.nameRequest = text;
        IWant(VToEqual, V.nameRequest, 'Moving & Storage', 'тип реквеста не совпал с созданным');
    })), config.timeout);
    // запоминаем данные с мувинг ТУ сторадж
    driver.wait(driver.findElement(By.xpath('//div[@class="box_info from_storage storage"]//div[@ng-if="storageCalcResult.to.surcharge_fuel"]/span')).getText().then(function(text){
        V.frontNumberFuelTo = SF.cleanPrice (text.replace('$', ''))/100;
    }), config.timeout);
    driver.wait(driver.findElement(By.xpath('//div[@class="box_info from_storage storage"]//div[@ng-if="storageCalcResult.to.isMinHourLessThenMaxTime"]/span')).getText().then(function(text){
        V.frontNumbersQuoteMinTo = SF.cleanPrice (text.substring(0, text.indexOf('$',3)))/100;
        V.frontNumbersQuoteMaxTo = SF.cleanPrice(text.substring(text.indexOf('$',3)))/100;
        console.log (V.frontNumbersQuoteMinTo, V.frontNumbersQuoteMaxTo);
    }), config.timeout);

    SF.endOfTest();
};
