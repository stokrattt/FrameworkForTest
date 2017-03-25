function main() {
    global.fiber = Fiber.current;
    V.client = {};
    V.client.name = SFrandomBukva(6) + '_t';
    V.client.fam = SFrandomBukva(6) + '_t';
    V.client.phone = SFrandomCifra(10);
    V.client.email = SFrandomBukvaSmall(6) + '@' + SFrandomBukvaSmall(4) + '.tes';

    global.fiber = Fiber.current;
    var URL = 'http://stage.themoveboard.com/moveBoard/#/login';
    SFget(URL);

    SFsend(By.id('email'), 'TestAdmin');
    SFsend(By.id('password'), 'test');
    JSclick('.btn-primary');

    CreateLocalMovingFromBoard();
    SFsleep (2);
    RememberDigitsRequestBoard ();


    //*****************************************************************************
    //считаем бензин

    SFclick (By.xpath("//div[not(contains(@class,'ng-if'))]/label[contains(text(), 'Fuel Surcharge:')]"));
    SFsleep (3);
    driver.findElement(By.xpath('//input[@ng-model="request.request_all_data.surcharge_fuel_avg"]')).getAttribute('value').then(function(value){
        V.boardNumbers.FuelPerc = SFcleanPrice(value.replace('%', ''));
    });

    SFclick (By.xpath("//div[@class='modal-footer']/button[@ng-click='cancel()']"));
    SFsleep (3);
    V.summQuote = (parseFloat((V.boardNumbers.QuoteMin + V.boardNumbers.QuoteMax)/2)).toFixed(2);
    V.calcFuel = (V.summQuote * V.boardNumbers.FuelPerc/100).toFixed(2);
    IWant(VToEqual, V.calcFuel, V.boardNumbers.Fuel, 'Бензин посчитан неправильно');
//*******************************************************************************************





    endOfTest();
}



//==================================================================================================

module.exports = main;
