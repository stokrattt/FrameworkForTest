function main() {
    global.fiber = Fiber.current;
    V.client = {};
    V.client.name = SFrandomBukva(6) + '_t';
    V.client.fam = SFrandomBukva(6) + '_t';
    V.client.phone = SFrandomCifra(10);
    V.client.email = SFrandomBukvaSmall(6) + '@' + SFrandomBukvaSmall(4) + '.tes';

    global.fiber = Fiber.current;
    var URL = 'http://stage.themoveboard.com:8001/moveBoard/#/login';
    SFget(URL);

    SFsend(By.id('email'), 'TestAdmin');
    SFsend(By.id('password'), 'test');
    JSclick('.btn-primary');
    SFsleep (3);
    JSwaitForNotExist ('div.busyoverlay:visible');
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
    JSwaitForNotExist ('div.busyoverlay:visible');
    SFclick(By.xpath('//a[@ng-click="select(tabs[7])"]'));
    SFsleep(1);
    SetManager('Max');
    JSwaitForNotExist('div.toast-success');
    SFclick(By.xpath('//a[@ng-click="select(tabs[0])"]'));
    SFclick (By.xpath('//div[@ng-click="changeSalesClosingTab(\'closing\')"]'));
    JSwaitForNotExist ('div.busyoverlay:visible');
    SFsleep (0.5);
    SFclear (By.xpath('//input[@ng-model="invoice.work_time"]'));
    JSwaitForNotExist ('div.busyoverlay:visible');
    SFsend (By.xpath('//input[@ng-model="invoice.work_time"]'), '01:00');
    JSwaitForNotExist ('div.busyoverlay:visible');

    SFclick (By.xpath('//div[@ng-click="closeJob();"]'));
    SFsleep (6);
    JSwaitForNotExist ('div.busyoverlay:visible');
    JSwaitForNotExist('div.toast-success');
    driver.findElement(By.xpath('//a[contains(@class,"open_button_contract")]')).click();
    SFsleep (3);
    SFopenTab (1);
    SFsleep (3);
    JSwaitForNotExist ('div.busyoverlay:visible');
    SFwaitForLocated (By.xpath('//div[@class="sweet-alert showSweetAlert visible"]'));
    SFclick (By.xpath('//button[@class="confirm"]'));
    SFsleep (0.5);
    SFclick (By.linkText('Bill of lading'));
    SFsleep (2);
    driver.wait(driver.findElement(By.xpath('//button[@ng-if="data.isSubmitted"]')).getText().then(function(text) {
        text;
        IWant (VToEqual, text, 'Job is Done', 'страница бил оф ладинг не загрузилась')
    }));

    endOfTest();
}



//==================================================================================================

module.exports = main;
