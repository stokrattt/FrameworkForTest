module.exports = function main(SF, JS, JSstep, VD, V, By, until,FileDetector, system, condition, LF,config,constants){
    global.fiber = Fiber.current;
    V.client = {};
    V.client.name = SF.randomBukva(6) + '_t';
    V.client.fam = SF.randomBukva(6) + '_t';
    V.client.phone = SF.randomCifra(10);
    V.client.email = SF.randomBukvaSmall(6) + '@' + SF.randomBukvaSmall(4) + '.tes';

    global.fiber = Fiber.current;
    SF.get(V.adminURL);

    SF.send(By.id('email'), 'TestAdmin');
    SF.send(By.id('password'), 'test');
    JS.click('.btn-primary');
    SF.sleep (3);
    JS.waitForNotExist ('div.busyoverlay:visible');
    LF.CreateLocalMovingFromBoard();
    SF.sleep (2);
    JS.step (JSstep.selectTruck);
    driver.wait(driver.findElement(By.xpath('//a[@ng-click="select(tabs[0])"]')).getText().then(function(text){
        V.request.Id = SF.cleanPrice(text);
        LF.addToCleanerJob(V.request.Id);
    }));
    JS.select ('#edit-status', 3); // выбор статуса конфермед
    SF.send (By.id('edit-moving-from'), 2342342342424);
    SF.send (By.xpath('//input[@ng-model="request.field_moving_to.thoroughfare"]'), 34654564564);
    JS.click ('button[ng-click=\\"UpdateRequest()\\"]');
    SF.waitForVisible (By.xpath('//button[@ng-click="update(request)"]'));
    SF.click (By.xpath('//button[@ng-click="update(request)"]'));
    SF.sleep (3);
    JS.waitForNotExist('div.toast-success');
    JS.waitForNotExist ('div.busyoverlay:visible');
    SF.click(By.xpath('//a[@ng-click="select(tabs[7])"]'));
    SF.sleep(1);
    LF.SetManager('Max');
    JS.waitForNotExist('div.toast-success');
    SF.click(By.xpath('//a[@ng-click="select(tabs[0])"]'));
    SF.click (By.xpath('//div[@ng-click="changeSalesClosingTab(\'closing\')"]'));
    JS.waitForNotExist ('div.busyoverlay:visible');
    SF.sleep (0.5);
    SF.clear (By.xpath('//input[@ng-model="invoice.work_time"]'));
    JS.waitForNotExist ('div.busyoverlay:visible');
    SF.send (By.xpath('//input[@ng-model="invoice.work_time"]'), '01:00');
    JS.waitForNotExist ('div.busyoverlay:visible');

    SF.click (By.xpath('//div[@ng-click="closeJob();"]'));
    SF.sleep (8);
    JS.waitForNotExist ('div.busyoverlay:visible');
    JS.waitForNotExist('div.toast-success');
    driver.findElement(By.xpath('//a[contains(@class,"open_button_contract")]')).click();
    SF.sleep (3);
    SF.openTab (1);
    SF.sleep (3);
    JS.waitForNotExist ('div.busyoverlay:visible');
    SF.waitForLocated (By.xpath('//div[@class="sweet-alert showSweetAlert visible"]'));
    SF.click (By.xpath('//button[@class="confirm"]'));
    SF.sleep (0.5);
    SF.click (By.linkText('Bill of lading'));
    SF.sleep (2);
    driver.wait(driver.findElement(By.xpath('//button[@ng-if="data.isSubmitted"]')).getText().then(function(text) {
        VD.IWant (VD.VToEqual, text, 'Job is Done', 'страница бил оф ладинг не загрузилась')
    }));
    SF.endOfTest();
};
