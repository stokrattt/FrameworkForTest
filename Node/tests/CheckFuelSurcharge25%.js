function main() {
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

    // пошла проверка fuel sercharge

    V.boardNumbers={};
    driver.findElement(By.xpath("//div[not(contains(@class,'ng-hide'))]/label[contains(text(), 'Quote:')]/following-sibling::div[1]")).getText().then(function(text){
        V.boardNumbers.QuoteMin = SFcleanPrice(text.substring(0, text.indexOf('$',3)))/100;
        V.boardNumbers.QuoteMax = SFcleanPrice(text.substring(text.indexOf('$',3)))/100;
        console.log(V.boardNumbers);
    });


    endOfTest();
}



//==================================================================================================

module.exports = main;
