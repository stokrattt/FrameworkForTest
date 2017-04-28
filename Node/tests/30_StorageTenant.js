module.exports = function main(SF, JS, MF, LF, JSstep, VD, V, By, until,FileDetector, system, condition, config,constants) {
    global.fiber = Fiber.current;
    V.client = {};
    V.client.name = SF.randomBukva(6) + '_t';
    V.client.fam = SF.randomBukva(6) + '_t';
    V.client.phone = SF.randomCifra(10);
    V.client.email = SF.randomBukvaSmall(6) + '@' + SF.randomBukvaSmall(4) + '.tes';
    V.client.long = SF.randomBukva(6) + 'Name ' + SF.randomBukva(6) + 'Fam';
    V.client.passwd = 123;

    //=========================начинаем писать тест=============================
    SF.get(V.adminURL);
    SF.send(By.id('email'), 'TestAdmin');
    SF.send(By.id('password'), 'test');
    JS.click('.btn-primary');
    SF.sleep(3);
   // LF.LoginToBoardAsAdmin();
condition.nowWeDoing = 'идем в сторадж и создаем сторадж тенант';
    SF.click(By.xpath('//a[@ng-click="vm.goToPage(\'pending\', \'\')"]'));
    JS.waitForNotExist ('div.busyoverlay:visible');
    SF.sleep (4);
    JS.waitForNotExist ('div.busyoverlay:visible');
    SF.click(By.xpath('//button[@ng-click="pending.createModal()"]'));
    JS.waitForNotExist('div.busyoverlay:visible');
    SF.sleep (2);
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
    var now = new Date();
    var msInDay = 86400000;
    var future = new Date(now.getTime() + msInDay * 8);
    var options = { month: 'short', day: 'numeric', year: 'numeric' };
    V.changedateOut = (future.toLocaleDateString('en-US', options));
    SF.send(By.xpath('//input[@ng-model="data.rentals.moved_out_date"]'), V.changedateOut);
    SF.click(By.xpath('//input[@ng-model="data.user_info.phone2"]'));
    SF.click(By.xpath('//button[@ng-click="createNewStorageRequest()"]'));
    JS.waitForNotExist('div.busyoverlay:visible');
    SF.sleep (3);
    driver.wait(driver.findElement(By.xpath('//a[@ng-click="tabs.setTab(1)"]/span')).getText().then(function(text){
        V.storageId = SF.cleanPrice(text);
    }),config.timeout);
    SF.sleep(1);
condition.nowWeDoing = 'идем в леджер и создаем пайменты';
Debug.pause();
    SF.click(By.xpath('//a[@ng-click="tabs.setTab(4)"]'));
    //driver.actions().mouseMove(driver.findElement(By.xpath('//button[@ng-click="openPayment()"]'))).click();
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
    SF.sleep (1);
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
    JS.click('button[ng-click=\\"cancel()\\"]:visible');
condition.nowWeDoing = 'идем в леджер и создаем инвойс';
    JS.waitForNotExist ('.sweet-overlay:visible');
    SF.sleep (3);
    SF.click(By.xpath('//button[@ng-click="createInvoice()"]'));
    SF.send (By.xpath('//input[@ng-model="charge.name"]'), 'Item for test');
    SF.sleep(0.5);
    SF.send (By.xpath('//input[@ng-model="charge.description"]'), 'test');
    SF.sleep(0.5);
    SF.clear (By.xpath('//input[@ng-model="charge.cost"]'));
    SF.send (By.xpath('//input[@ng-model="charge.cost"]'), 100);
    SF.sleep(0.5);
    SF.clear (By.xpath('//input[@ng-model="charge.qty"]'));
    SF.send (By.xpath('//input[@ng-model="charge.qty"]'), 10);
    SF.sleep(0.5);
    driver.wait(driver.findElement(By.xpath('//div[contains(text(), "Total Due")]/following-sibling::div')).getText().then(function (text) {
        V.due = SF.cleanPrice (text);
        VD.IWant (VD.VToEqual, V.due, 1000, 'не совпал тотал с введенной суммой')
    }), config.timeout);
    SF.click (By.xpath('//input[@ng-model="invoice.discount"]'));
    SF.send (By.xpath('//input[@ng-model="invoice.discount"]'), 10);
    SF.sleep(0.5);
    driver.wait(driver.findElement(By.xpath('//div[contains(text(), "Total Due")]/following-sibling::div')).getText().then(function (text) {
        V.discount = SF.cleanPrice (text);
        VD.IWant (VD.VToEqual, V.discount, 900, 'не посчитал дискаунт с введенной суммы')
    }), config.timeout);
    SF.click (By.xpath('//input[@ng-model="invoice.tax"]'));
    SF.send (By.xpath('//input[@ng-model="invoice.tax"]'), 10);
    SF.sleep(0.5);
    driver.wait(driver.findElement(By.xpath('//div[contains(text(), "Total Due")]/following-sibling::div')).getText().then(function (text) {
        V.tax = SF.cleanPrice (text);
        VD.IWant (VD.VToEqual, V.tax, 990, 'не посчитал tax с введенной суммы')
    }), config.timeout);
    SF.click(By.xpath('//textarea[@ng-model="invoice.notes"]'));
    SF.click(By.xpath('//a[@ng-click="sendInvoice()"]'));
    JS.waitForNotExist ('div.busyoverlay:visible');
    SF.waitForLocated (By.xpath('//h2[contains(text(), "Template preview")]'));
    SF.click(By.xpath('//a[@ng-click="save()"]'));
    JS.waitForNotExist('div.toast-message:visible');
    SF.click(By.xpath('//button[@ng-click="proRate()"]'));
condition.nowWeDoing = 'идем в леджер и создаем про рейт';
    JS.waitForNotExist ('.sweet-overlay:visible');
    SF.clear (By.xpath('//input[@ng-model="charge.name"]'));
    SF.send (By.xpath('//input[@ng-model="charge.name"]'), 'StorageTest Pro-Rate');
    SF.sleep(0.5);
    SF.clear (By.xpath('//input[@ng-model="charge.description"]'));
    SF.send (By.xpath('//input[@ng-model="charge.description"]'), 'test month');
    SF.sleep(0.5);
    SF.clear (By.xpath('//input[@ng-model="charge.cost"]'));
    SF.send (By.xpath('//input[@ng-model="charge.cost"]'), 100);
    SF.sleep(0.5);
    SF.clear (By.xpath('//input[@ng-model="charge.qty"]'));
    SF.send (By.xpath('//input[@ng-model="charge.qty"]'), 10);
    SF.sleep(0.5);
    driver.wait(driver.findElement(By.xpath('//div[contains(text(), "Total Due")]/following-sibling::div')).getText().then(function (text) {
        V.dueRate = SF.cleanPrice (text);
        VD.IWant (VD.VToEqual, V.dueRate, 1000, 'не совпал тотал с введенной суммой')
    }), config.timeout);
    SF.click (By.xpath('//input[@ng-model="invoice.discount"]'));
    SF.send (By.xpath('//input[@ng-model="invoice.discount"]'), 10);
    SF.sleep(0.5);
    driver.wait(driver.findElement(By.xpath('//div[contains(text(), "Total Due")]/following-sibling::div')).getText().then(function (text) {
        V.discountRate = SF.cleanPrice (text);
        VD.IWant (VD.VToEqual, V.discountRate, 900, 'не посчитал дискаунт с введенной суммы')
    }), config.timeout);
    SF.click (By.xpath('//input[@ng-model="invoice.tax"]'));
    SF.send (By.xpath('//input[@ng-model="invoice.tax"]'), 10);
    SF.sleep(0.5);
    driver.wait(driver.findElement(By.xpath('//div[contains(text(), "Total Due")]/following-sibling::div')).getText().then(function (text) {
        V.taxRate = SF.cleanPrice (text);
        VD.IWant (VD.VToEqual, V.taxRate, 990, 'не посчитал tax с введенной суммы')
    }), config.timeout);
    SF.click(By.xpath('//textarea[@ng-model="invoice.notes"]'));
    SF.click(By.xpath('//button[@ng-click="saveAsDraft()"]'));
    JS.waitForNotExist ('div.busyoverlay:visible');
    JS.waitForNotExist('div.toast-message:visible');
    SF.click(By.xpath('//button[@ng-click="updateStorageRequest(data)"]'));
    JS.waitForNotExist ('div.busyoverlay:visible');
    JS.waitForNotExist('div.toast-message:visible');
    driver.wait(driver.findElement(By.xpath('//span[contains(text(),"Balance :")]/span')).getText().then(function (text) {
        V.balanceTenant = SF.cleanPrice (text);
        VD.IWant (VD.VToEqual, V.balanceTenant, -780, 'баланс не совпадает с суммой оплаты')
    }),config.timeout);
condition.nowWeDoing = 'добавляем лот намберс';
    SF.click(By.xpath('//a[@ng-click="tabs.setTab(6)"]'));
    SF.click(By.xpath('//button[@id="addColor"]'));
    SF.send(By.xpath('//input[@ng-model="lotNumber.number"]'), 'test');
    SF.click(By.xpath('//button[@id="colorPick"]'));
    SF.click(By.xpath('//button[@id="colorPick"]/following-sibling::ul/li[3]'));
    SF.send(By.xpath('//input[@ng-model="lotNumber.from"]'), 111111);
    SF.send(By.xpath('//input[@ng-model="lotNumber.to"]'), 222222);
    SF.click(By.xpath('//button[@ng-click="updateStorageRequest(data)"]'));
    JS.waitForNotExist ('div.busyoverlay:visible');
    JS.waitForNotExist('div.toast-message:visible');
    SF.select (By.xpath('//select[@ng-model="data.rentals.status_flag"]'), 'string:2');
condition.nowWeDoing = 'старт рекуринг';
    SF.click(By.xpath('//a[@ng-click="tabs.setTab(5)"]'));
    JS.click('span[ng-hide=\\"data.recurring.start\\"]');
    JS.waitForNotExist ('div.busyoverlay:visible');
    SF.click(By.xpath('//button[@ng-click="closeModal()"]'));
    SF.sleep (3);
    SF.click (By.xpath('//button[@ng-click="toggleLeft()"]'));
    SF.waitForVisible (By.xpath('//button[@ng-click="toggleLeft()"]'));
    SF.click(By.xpath('//a[@ng-click="vm.goToPage(\'pending\', \'\')"]'));
    SF.click(By.xpath('//a[@ui-sref="tenants"]'));
    JS.waitForNotExist ('div.busyoverlay:visible');
condition.nowWeDoing = 'идем проверять что он есть в Move in';
    JS.waitForNotExist ('div.busyoverlay:visible');
    SF.sleep(4);
    driver.wait(driver.findElement(By.xpath('//tr[@ng-click="openModal(request, id)"]/td[contains(text(),"' + V.storageId + '")]')).click(), config.timeout);
    driver.wait(driver.findElement(By.xpath('//tr[@ng-click="openModal(request, id)"]/td[contains(text(),"' + V.storageId + '")]')).click(), config.timeout);
    JS.waitForNotExist ('div.busyoverlay:visible');
    SF.click(By.xpath('//button[@ng-click="closeModal()"]'));
    LF.LogoutFromBoardAdmin ();
    //=========================закончили писать тест=============================
    SF.endOfTest();
};
