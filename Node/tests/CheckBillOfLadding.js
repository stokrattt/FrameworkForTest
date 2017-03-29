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
    JSstep (selectTruck);
    driver.wait(driver.findElement(By.xpath('//a[@ng-click="select(tabs[0])"]')).getText().then(function(text){
        V.request.Id = SFcleanPrice(text);
    }));
    JSselect ('#edit-status', 3); // выбор статуса конфермед
    SFsend (By.id('edit-moving-from'), 2342342342424);
    SFsend (By.xpath('//input[@ng-model="request.field_moving_to.thoroughfare"]'), 34654564564);
    SFclick (By.xpath('//button[@ng-click="UpdateRequest()"]'));
    SFwaitForVisible (By.xpath('//button[@ng-click="update(request)"]'));
    SFclick (By.xpath('//button[@ng-click="update(request)"]'));
    SFsleep (3);
    JSwaitForNotExist('div.toast-success');
    SFclick(By.xpath('//a[@ng-click="select(tabs[7])"]'));
    SFsleep(1);
    SetManager('JackSales');
    JSwaitForNotExist('div.toast-success');
    SFclick(By.xpath('//a[@ng-click="select(tabs[0])"]'));
    SFclick (By.xpath('//div[@ng-click="changeSalesClosingTab(\'closing\')"]'));
    SFsleep (0.5);
    SFclear (By.xpath('//input[@ng-model="invoice.work_time"]'));
    SFsend (By.xpath('//input[@ng-model="invoice.work_time"]'), '01:00');
    SFclick (By.xpath('//div[@ng-click="closeJob();"]'));
    SFsleep (6);
    JSwaitForNotExist('div.toast-success');
    driver.findElement(By.xpath('//a[contains(@class,"open_button_contract")]')).click();
    SFopenNewTab (1);
    SFwaitForLocated (By.xpath('//div[@class="sweet-alert showSweetAlert visible"]'));
    SFwaitForLocated (By.xpath('//div[@class="sweet-alert showSweetAlert visible"]'));
    SFclick (By.xpath('//button[@class="confirm"]'));
    SFsleep (0.5);







    endOfTest();
}



//==================================================================================================

module.exports = main;
