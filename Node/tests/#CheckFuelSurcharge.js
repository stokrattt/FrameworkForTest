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

    // запомнили все цифры реквеста

    V.boardNumbers={};
    driver.findElement(By.xpath("//div[not(contains(@class,'ng-hide'))]/label[contains(text(), 'Quote:')]/following-sibling::div[1]")).getText().then(function(text){
        V.boardNumbers.QuoteMin = SFcleanPrice(text.substring(0, text.indexOf('$',3)))/100;
        V.boardNumbers.QuoteMax = SFcleanPrice(text.substring(text.indexOf('$',3)))/100;
        console.log(V.boardNumbers.QuoteMin);
        console.log(V.boardNumbers.QuoteMax);

        V.summQuote = parseFloat(V.boardNumbers.QuoteMin + V.boardNumbers.QuoteMax);
        console.log (V.summQuote);
    });
    driver.findElement(By.xpath("//div[not(contains(@class,'ng-if'))]/label[contains(text(), 'Fuel Surcharge:')]/following-sibling::div[1]")).getText().then(function(text) {
        V.boardNumbers.Fuel = SFcleanPrice(text.substring(text.indexOf('$'))) / 100;
        console.log(V.boardNumbers.Fuel);
    });
        //SFclick (By.xpath("//div[not(contains(@class,'ng-if'))]/label[contains(text(), 'Fuel Surcharge:')]"));
        //driver.findElement(By.xpath('//div[@class="modal-content"]//div[@ng-if="type != \'invoice\'"]')).getText().then(function(text) {
          //  V.boardNumbers.FuelPerc = text.substring(text.valueOf());
            //console.log(V.boardNumbers.FuelPerc);

        //});
    //});
    driver.findElement(By.xpath("//div/label[contains(text(), 'Valuation:')]/following-sibling::div[1]")).getText().then(function(text) {
        V.boardNumbers.Valuation = SFcleanPrice (text.substring(text.indexOf('$')))/100;
        console.log (V.boardNumbers.Valuation);

    });
    driver.findElement(By.xpath("//div/label[contains(text(), 'Packing:')]/following-sibling::div[1]")).getText().then(function(text) {
        V.boardNumbers.Packing = SFcleanPrice (text.substring(text.indexOf('$')))/100;
        console.log (V.boardNumbers.Packing);

    });
    driver.findElement(By.xpath("//div/label[contains(text(), 'Additional Services:')]/following-sibling::div[2]")).getText().then(function(text) {
        V.boardNumbers.AdServices = SFcleanPrice (text.substring(text.indexOf('$')))/100;
        console.log (V.boardNumbers.AdServices);

    });
    driver.findElement(By.xpath("//div/label[contains(text(), 'Discount:')]/following-sibling::div[1]")).getText().then(function(text) {
        V.boardNumbers.Discount = SFcleanPrice (text.substring(text.indexOf('$')))/100;
        console.log (V.boardNumbers.Discount);

    });
    driver.findElement(By.xpath("//div[not(contains(@class,'ng-hide'))]/label[contains(text(), 'Grand Total:')]/following-sibling::div[1]")).getText().then(function(text){
        V.boardNumbers.GrandTotalMin = SFcleanPrice(text.substring(0, text.indexOf('$',3)))/100;
        V.boardNumbers.GrandTotalMax = SFcleanPrice(text.substring(text.indexOf('$',3)))/100;
        console.log(V.boardNumbers.GrandTotalMin);
        console.log(V.boardNumbers.GrandTotalMax);
    });
    driver.findElement(By.xpath("//div/label[contains(text(), 'Payment:')]/following-sibling::div[1]")).getText().then(function(text) {
        V.boardNumbers.Payment = SFcleanPrice (text.substring(text.indexOf('$')))/100;
        console.log (V.boardNumbers.Payment);

    });
    driver.findElement(By.xpath("//div[not(contains(@class,'ng-if'))]/label[contains(text(), 'Balance:')]/following-sibling::div[1]")).getText().then(function(text){
        V.boardNumbers.BalanceMin = SFcleanPrice(text.substring(0, text.indexOf('$',3)))/100;
        V.boardNumbers.BalanceMax = SFcleanPrice(text.substring(text.indexOf('$',3)))/100;
        console.log(V.boardNumbers.BalanceMin);
        console.log(V.boardNumbers.BalanceMax);
    });
//считаем бензин




        endOfTest();
}



//==================================================================================================

module.exports = main;
