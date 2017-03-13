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

    SFclick(By.linkText('Create Request'));
    driver.sleep(4000);

    //SFselect(By.xpath('//select[@ng-model="editrequest.data.field_move_service_type"]'),"number:3");


    SFclick (By.xpath('//div[@class="step1"]//select[@name="move_service_type"]/option[@value="number:1"]'));
    SFclick(By.xpath('//input[@id="edit-move-date-datepicker-popup-0"]'));
    V.date=null;
    driver.wait(driver.executeScript(Click4DaysCalendar)).then(function(calDate){
        V.date = calDate;
    });
    waitForDefined('date');
    //SFsend (By.xpath('//div/input[@name="Move_Date"]'), 'Aug 16, 2017');
    Debug.pause();
    SFclick(By.xpath('//ul[@class="chosen-choices"]'));
    SFclick(By.xpath('//ul[@class="chosen-results"]/li[@data-option-array-index="1"]'));

    SFclick (By.xpath('//div/div[@class="chosen-drop"]/li[text()="living room"]'));


    endOfTest();

}



//==================================================================================================

module.exports = main;
