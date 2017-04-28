module.exports = function main(SF, JS, MF, LF, JSstep, VD, V, By, until,FileDetector, system, condition, config,constants) {    global.fiber = Fiber.current;
    V.client = {};
    V.client.name = SF.randomBukva(6) + '_t';
    V.client.fam = SF.randomBukva(6) + '_t';
    V.client.phone = SF.randomCifra(10);
    V.client.email = SF.randomBukvaSmall(6) + '@' + SF.randomBukvaSmall(4) + '.tes';

    SF.get(V.adminURL);

    SF.send(By.id('email'), 'TestAdmin');
    SF.send(By.id('password'), 'test');
    JS.click('.btn-primary');
    SF.sleep(3);

    LF.CreateLocalMovingFromBoard(V.client);
    SF.sleep (2);
    V.boardNumbers = {};
    LF.RememberDigitsRequestBoard(V.boardNumbers);


    //*****************************************************************************
    condition.nowWeDoing = 'считаем бензин';
    SF.click (By.xpath("//div[not(contains(@class,'ng-if'))]/label[contains(text(), 'Fuel Surcharge:')]"));
    SF.sleep (3);
    driver.wait(driver.findElement(By.xpath('//input[@ng-model="request.request_all_data.surcharge_fuel_avg"]')).getAttribute('value').then(function(value){
        V.boardNumbers.FuelPerc = SF.cleanPrice(value.replace('%', ''));
    }),config.timeout);

    SF.click (By.xpath("//div[@class='modal-footer']/button[@ng-click='cancel()']"));
    SF.sleep (3);
    V.summQuote = (parseFloat((V.boardNumbers.QuoteMin + V.boardNumbers.QuoteMax)/2)).toFixed(2);
    V.calcFuel = (V.summQuote * V.boardNumbers.FuelPerc/100).toFixed(2);
    VD.IWant(VD.VToEqual, V.calcFuel, V.boardNumbers.Fuel, 'Бензин посчитан неправильно');
    SF.sleep (3);
//*******************************************************************************************
    SF.endOfTest();
};
