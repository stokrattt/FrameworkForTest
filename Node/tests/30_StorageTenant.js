module.exports = function main(SF, JS, MF, LF, JSstep, VD, V, By, until,FileDetector, system, condition, config,constants) {
    global.fiber = Fiber.current;
    V.client = {};
    V.storage = {};
    V.client.name = SF.randomBukva(6) + '_t';
    V.client.fam = SF.randomBukva(6) + '_t';
    V.client.phone = SF.randomCifra(10);
    V.client.email = SF.randomBukvaSmall(6) + '@' + SF.randomBukvaSmall(4) + '.tes';
    V.client.long = SF.randomBukva(6) + 'Name ' + SF.randomBukva(6) + 'Fam';
    V.client.passwd = 123;

    //=========================начинаем писать тест=============================
    SF.get(V.adminURL);
    LF.LoginToBoardAsCustom(V.adminLogin,V.adminPassword);

condition.nowWeDoing = 'идем в сторадж и создаем сторадж тенант';
    MF.Board_OpenStorages();
    LF.CreateStorageTenant(V.client);
    MF.EditStorage_RememberId (V.storage);

condition.nowWeDoing = 'идем в леджер и создаем пайменты';
    MF.EditStorage_OpenLedger();
    //driver.actions().mouseMove(driver.findElement(By.xpath('//button[@ng-click="openPayment()"]'))).click();
    JS.click('button[ng-click=\\"openPayment()\\"]:visible');
    SF.sleep (1);
    JS.click('a[ng-click=\\"addCustomPayment()\\"]:visible');
    SF.waitForVisible (By.xpath('//form[@name="clientForm"]'));
    SF.click (By.xpath('//input[@ng-model="receipt.amount"]'));
    SF.send (By.xpath('//input[@ng-model="receipt.amount"]'),150);
    SF.click(By.xpath('//textarea[@ng-model="receipt.description"]'));
    SF.sleep (1);
    SF.click(By.xpath('//button[@ng-click="Save()"]'));
    SF.sleep (2);
    MF.WaitToastExit();
    SF.click(By.xpath('//button[@ng-click="save()"]'));
    SF.sleep (2);
    MF.WaitWhileBusy ();
    JS.click('a[ng-click=\\"addAuthPayment()\\"]:visible');
    SF.click (By.xpath('//input[@ng-model="charge_value.value"]'));
    SF.send (By.xpath('//input[@ng-model="charge_value.value"]'),1050);
    SF.click(By.xpath('//button[@ng-click="goStepTwo();"]'));
    LF.FillCardPayModal ();
    SF.sleep (2);
    MF.WaitToastExit();
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
    MF.WaitWhileBusy ();
    SF.waitForLocated (By.xpath('//h2[contains(text(), "Template preview")]'));
    SF.click(By.xpath('//a[@ng-click="save()"]'));
    MF.WaitToastExit();
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
    MF.WaitWhileBusy ();
    MF.WaitToastExit();
    SF.click(By.xpath('//button[@ng-click="updateStorageRequest(data)"]'));
    MF.WaitWhileBusy ();
    MF.WaitToastExit();
    driver.wait(driver.findElement(By.xpath('//span[contains(text(),"Balance :")]/span')).getText().then(function (text) {
        V.balanceTenant = SF.cleanPrice (text);
        VD.IWant (VD.VToEqual, V.balanceTenant, -780, 'баланс не совпадает с суммой оплаты')
    }),config.timeout);

condition.nowWeDoing = 'добавляем лот намберс';
    MF.EditStorage_OpenLotNumbers();
    MF.EditStorage_AddLotNumber ();
    MF.EditStorage_SelectMoveIn ();

condition.nowWeDoing = 'старт рекуринг';
    MF.EditStorage_OpenReccuring();
    MF.EditStorage_StartReccuring();
    MF.EditStorage_CloseOpenModal();
    MF.Board_OpenStoragesTenant ();

condition.nowWeDoing = 'идем проверять что он есть в Move in';
    MF.StorageTenant_OpenStorages(V.storage.Id);
    MF.EditStorage_CloseOpenModal();
    LF.LogoutFromBoardAdmin ();
    //=========================закончили писать тест=============================
    SF.endOfTest();
};
