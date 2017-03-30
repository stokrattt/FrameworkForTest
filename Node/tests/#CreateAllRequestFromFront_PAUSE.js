function main() {
    global.fiber = Fiber.current;
    V.ReservationPrice = {};
    V.client = {};
    V.client.name = SFrandomBukva(6) + '_t';
    V.client.fam = SFrandomBukva(6) + '_t';
    V.client.phone = SFrandomCifra(10);
    V.client.email = SFrandomBukvaSmall(6) + '@' + SFrandomBukvaSmall(4) + '.tes';

    SFget(frontURL);

    SFclick (By.xpath('//a[@href="#request"]'));
    SFsleep (2);
    SFclick (By.xpath('//label[contains(text(), "Desired Move Date:")]/following-sibling::input[1]'));
    V.request={};
    driver.wait(driver.executeScript(Click4DaysNewCalendar)).then(function(MovDateFront){
        V.request.moveDate = MovDateFront;
        console.log(V.request);
    });
    SFsleep (0.5);
    SFclick (By.xpath('//label[contains(text(), "Service Type:")]/following-sibling::select/option[2]'));
    SFclick (By.xpath('//label[contains(text(), "Desired Delivery Date:")]/following-sibling::input[1]'));
    driver.wait(driver.executeScript(Click8DaysNewCalendar)).then(function(DelDateFront){
        V.request.DelDate = DelDateFront;
        console.log(V.request.DelDate);
    });
    SFsend (By.id('edit-zip-code-from'), '02136');
    SFsend (By.id('edit-zip-code-to'), '02032');
    JSselect ('#edit-size-move', 10);
    JSselect ('#edit-type-from', 2);
    JSselect ('#edit-type-to', 5);
    SFsleep (0.5);
    JSclick ('#calculate_btn');
    SFwaitForLocated (By.xpath('//div[@class="form_block calc-form"]'));
    SFsleep (2);
    driver.wait(driver.findElement(By.xpath('//div[@class="box_info general"]/div/span')).getText().then(function(text){
        V.nameRequest = text;
        IWant(VToEqual, V.nameRequest, 'Moving & Storage', 'тип реквеста не совпал с созданным');
    }));
    // запоминаем данные с мувинг ТУ сторадж
    driver.wait(driver.findElement(By.xpath('//div[@class="box_info from_storage storage"]//div[@ng-if="storageCalcResult.to.surcharge_fuel"]/span')).getText().then(function(text){
        V.frontNumbersFuelTo = SFcleanPrice (text.replace('$', ''))/100;
    }));
    driver.wait(driver.findElement(By.xpath('//div[@class="box_info from_storage storage"]//div[@ng-if="storageCalcResult.to.isMinHourLessThenMaxTime"]/span')).getText().then(function(text){
        V.frontNumbersQuoteMinTo = SFcleanPrice (text.substring(0, text.indexOf('$',3)))/100;
        V.frontNumbersQuoteMaxTo = SFcleanPrice(text.substring(text.indexOf('$',3)))/100;
        console.log (V.frontNumbersQuoteMin, V.frontNumbersQuoteMax);
    }));








    endOfTest();
}

//==================================================================================================

module.exports = main;