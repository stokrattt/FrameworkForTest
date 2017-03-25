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

    SFget('http://stage.themoveboard.com');

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







    endOfTest();
}

//==================================================================================================

module.exports = main;