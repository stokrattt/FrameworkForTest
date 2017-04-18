module.exports = function main(SF, JS, JSstep, VD, V, By, until,FileDetector, system, condition, LF,config,constants){
    global.fiber = Fiber.current;
    V.client = {};
    V.client.name = SF.randomBukva(6) + '_t';
    V.client.fam = SF.randomBukva(6) + '_t';
    V.client.phone = SF.randomCifra(10);
    V.client.email = SF.randomBukvaSmall(6) + '@' + SF.randomBukvaSmall(4) + '.tes';
    V.client.long = SF.randomBukva(6) + 'Name   ' + SF.randomBukva(6) + 'Fam';
    V.client.passwd = 123;

    //=========================начинаем писать тест=============================
    SF.get('http://stage.themoveboard.com/moveBoard/#/login');
    LF.LoginToBoardAsAdmin();
condition.nowWeDoing = 'идем в сторадж и создаем сторадж тенант';
    SF.click(By.xpath('//a[@ng-click="vm.goToPage(\'pending\', \'\')"]'));
    JS.waitForNotExist ('div.busyoverlay:visible');
    SF.click(By.xpath('//button[@ng-click="pending.createModal()"]'));
    JS.waitForNotExist('div.busyoverlay:visible');
    SF.send(By.xpath('//input[@ng-model="data.user_info.name"]'), V.client.long);

    SF.send(By.xpath('//input[@ng-model="data.user_info.zip"]'), '02136');
    SF.send(By.xpath('//input[@ng-model="data.user_info.phone1"]'), V.client.phone);
    SF.send(By.xpath('//input[@ng-model="data.user_info.email"]'), V.client.email);
    var now = new Date();
    var msInDay = 86400000;
    var future = new Date(now.getTime() + msInDay * 4);
    var options = { month: 'short', day: 'numeric', year: 'numeric' };
    V.changedate = (future.toLocaleDateString('en-US', options));
    SF.send(By.xpath('//input[@ng-model="data.rentals.moved_in_date"]'), V.changedate);
    SF.click(By.xpath('//input[@ng-model="data.user_info.phone2"]'));
    SF.click(By.xpath('//button[@ng-click="createNewStorageRequest()"]'));
    JS.waitForNotExist('div.busyoverlay:visible');
condition.nowWeDoing = 'идем в леджер и создаем пайменты';
    SF.click(By.xpath('//a[@ng-click="tabs.setTab(4)"]'));
    JS.click('button[ng-click=\\"openPayment()\\"]:visible');
    SF.sleep (1);
    JS.click('a[ng-click=\\"addCustomPayment()\\"]:visible');
    SF.waitForVisible (By.xpath('//form[@name="clientForm"]'));

    SF.click (By.xpath('//input[@ng-model="receipt.amount"]'));
    SF.send (By.xpath('//input[@ng-model="receipt.amount"]'),150);
    /*driver.actions().sendKeys(Key.TAB).sendKeys(Key.TAB).sendKeys(Key.TAB).sendKeys(Key.TAB)
        .sendKeys('1').sendKeys('5').sendKeys('0').sendKeys(Key.TAB).perform();
*/
    SF.click(By.xpath('//textarea[@ng-model="receipt.description"]'));
    SF.click(By.xpath('//button[@ng-click="Save()"]'));
    SF.sleep (2);
    JS.waitForNotExist('div.toast-message:visible');
    JS.waitForNotExist('div.toast-top-right:visible');
    JS.waitForNotExist('div.toast-success:visible');
    SF.click(By.xpath('//button[@ng-click="save()"]'));
    SF.sleep (2);
    JS.waitForNotExist('div.busyoverlay:visible');
    JS.click('a[ng-click=\\"addAuthPayment()\\"]:visible');
    SF.click (By.xpath('//input[@ng-model="charge_value.value"]'));
    SF.send (By.xpath('//input[@ng-model="charge_value.value"]'),1050);

    SF.click(By.xpath('//button[@ng-click="goStepTwo();"]'));
    LF.FillCardPayModal ();
    SF.sleep (2);
    JS.waitForNotExist('div.toast-success:visible');
    JS.click('button[ng-click=\\"cancel()\\"]:visible');
    JS.click('button[ng-click=\\"openPayment()\\"]:visible');
    SF.sleep(2);
condition.nowWeDoing = 'идем в леджер и создаем инвойс';
    JS.waitForNotExist ('.sweet-overlay:visible');
    SF.click(By.xpath('//button[@ng-click="createInvoice()"]'));
    SF.send (By.xpath('//input[@ng-model="charge.name"]'), 'Item for test');
    SF.send (By.xpath('//input[@ng-model="charge.description"]'), 'test');
    SF.clear (By.xpath('//input[@ng-model="charge.cost"]'));
    SF.send (By.xpath('//input[@ng-model="charge.description"]'), 100);
    SF.clear (By.xpath('//input[@ng-model="charge.qty"]'));
    SF.send (By.xpath('//input[@ng-model="charge.qty"]'), 10);
    driver.wait(driver.findElement(By.xpath('//div[contains(text(), "Total Due")]/following-sibling::div')).getText().then(function (text) {
        V.due = SF.cleanPrice (text);
        VD.IWant (VD.VToEqual, V.due, 1000, 'не совпал тотал с введенной суммой')
    }), config.timeout);
    SF.click (By.xpath('//input[@ng-model="invoice.discount"]'));
    SF.send (By.xpath('//input[@ng-model="invoice.discount"]'), 10);
    driver.wait(driver.findElement(By.xpath('//div[contains(text(), "Total Due")]/following-sibling::div')).getText().then(function (text) {
        V.discount = SF.cleanPrice (text);
        VD.IWant (VD.VToEqual, V.discount, 900, 'не посчитал дискаунт с введенной суммой')
    }), config.timeout);







    Debug.pause();


    //=========================закончили писать тест=============================
    SF.endOfTest();
};
