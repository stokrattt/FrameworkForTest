module.exports = function main(SF, JS, MF, LF, JSstep, VD, V, By, until,FileDetector, system, condition, config,constants) {
    global.fiber = Fiber.current;
    V.client = {};
    V.storage = {};
    V.client.name = SF.randomBukva(6) + 'Name';
    V.client.fam = SF.randomBukva(6) + 'Fam';
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
    JS.scroll ('button[ng-click=\"closeModal()\"]');
    SF.sleep(2);

condition.nowWeDoing = 'идем в леджер и создаем пайменты';
    MF.EditStorage_OpenLedger();
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
    MF.WaitWhileToaster();
    SF.sleep (2);
    MF.WaitWhileBusy ();
    JS.click('a[ng-click=\\"addAuthPayment()\\"]:visible');
    SF.click (By.xpath('//input[@ng-model="charge_value.value"]'));
    SF.send (By.xpath('//input[@ng-model="charge_value.value"]'),1050);
    SF.click(By.xpath('//button[@ng-click="goStepTwo();"]'));
    LF.FillCardPayModal ();
    SF.sleep (2);
    MF.WaitWhileToaster();
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
        VD.IWant (VD.ToEqual, V.due, 1000, 'не совпал тотал с введенной суммой')
    }), config.timeout);
    SF.click (By.xpath('//input[@ng-model="invoice.discount"]'));
    SF.send (By.xpath('//input[@ng-model="invoice.discount"]'), 10);
    SF.sleep(0.5);
    driver.wait(driver.findElement(By.xpath('//div[contains(text(), "Total Due")]/following-sibling::div')).getText().then(function (text) {
        V.discount = SF.cleanPrice (text);
        VD.IWant (VD.ToEqual, V.discount, 900, 'не посчитал дискаунт с введенной суммы')
    }), config.timeout);
    SF.click (By.xpath('//input[@ng-model="invoice.tax"]'));
    SF.send (By.xpath('//input[@ng-model="invoice.tax"]'), 10);
    SF.sleep(0.5);
    driver.wait(driver.findElement(By.xpath('//div[contains(text(), "Total Due")]/following-sibling::div')).getText().then(function (text) {
        V.tax = SF.cleanPrice (text);
        VD.IWant (VD.ToEqual, V.tax, 990, 'не посчитал tax с введенной суммы')
    }), config.timeout);
    SF.click(By.xpath('//textarea[@ng-model="invoice.notes"]'));
    SF.click(By.xpath('//a[@ng-click="sendInvoice()"]'));
    MF.WaitWhileBusy ();
    SF.waitForLocated (By.xpath('//h2[contains(text(), "Template preview")]'));
    SF.click(By.xpath('//a[@ng-click="save()"]'));
    MF.WaitWhileToaster();
    SF.sleep(3);
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
        VD.IWant (VD.ToEqual, V.dueRate, 1000, 'не совпал тотал с введенной суммой')
    }), config.timeout);
    SF.click (By.xpath('//input[@ng-model="invoice.discount"]'));
    SF.send (By.xpath('//input[@ng-model="invoice.discount"]'), 10);
    SF.sleep(0.5);
    driver.wait(driver.findElement(By.xpath('//div[contains(text(), "Total Due")]/following-sibling::div')).getText().then(function (text) {
        V.discountRate = SF.cleanPrice (text);
        VD.IWant (VD.ToEqual, V.discountRate, 900, 'не посчитал дискаунт с введенной суммы')
    }), config.timeout);
    SF.click (By.xpath('//input[@ng-model="invoice.tax"]'));
    SF.send (By.xpath('//input[@ng-model="invoice.tax"]'), 10);
    SF.sleep(0.5);
    driver.wait(driver.findElement(By.xpath('//div[contains(text(), "Total Due")]/following-sibling::div')).getText().then(function (text) {
        V.taxRate = SF.cleanPrice (text);
        VD.IWant (VD.ToEqual, V.taxRate, 990, 'не посчитал tax с введенной суммы')
    }), config.timeout);
    SF.click(By.xpath('//textarea[@ng-model="invoice.notes"]'));
    SF.click(By.xpath('//button[@ng-click="saveAsDraft()"]'));
    MF.WaitWhileBusy ();
    MF.WaitWhileToaster();
    SF.click(By.xpath('//button[@ng-click="updateStorageRequest(data)"]'));
    MF.WaitWhileBusy ();
    MF.WaitWhileToaster();
    driver.wait(driver.findElement(By.xpath('//span[contains(text(),"Balance :")]/span')).getText().then(function (text) {
        V.balanceTenant = SF.cleanPrice (text);
        VD.IWant (VD.ToEqual, V.balanceTenant, -780, 'баланс не совпадает с суммой оплаты')
    }),config.timeout);
    SF.sleep(0.5);
    SF.click(By.xpath('//tr[@ng-click="openModal(bill.bill_id, bill)"]//a[@ng-if="bill.type == \'invoice\'"]/i'));
    SF.click(By.xpath('//tr[@ng-click="openModal(bill.bill_id, bill)"]//a[@ng-if="bill.type == \'invoice\'"]/i'));
    SF.openTab(1);
    SF.waitForLocated (By.xpath('//b[contains(text(), "Account Balance Due (USD):")]'));
    SF.sleep(3);
    driver.wait(driver.findElement(By.xpath('//b[contains(text(), "Account Balance Due (USD):")]/../span/b')).getText().then(function (text) {
        VD.IWant(VD.ToEqual, text, 780, 'не совпал баланс инвойса на аккаунте при оплате стораджа через акк');
    }),config.timeout);
    SF.click(By.xpath('//a[@ng-click="vm.invoicePayment();"]'));
    JS.waitForExist('input[ng-model="payment.card_num"]');
    SF.sleep(1);
    SF.send(By.xpath('//input[@ng-model="payment.card_num"]'), 4111111111111111);
    SF.send(By.xpath('//input[@ng-model="payment.exp_month"]'), 11);
    SF.send(By.xpath('//input[@ng-model="payment.exp_year"]'), 20);
    SF.send(By.xpath('//input[@ng-model="payment.firstName"]'), V.client.name);
    SF.send(By.xpath('//input[@ng-model="payment.lastName"]'), V.client.fam);
    SF.send(By.xpath('//input[@ng-model="secure.cvc"]'), 323);
    SF.send(By.xpath('//input[@ng-model="payment.billing_zip"]'), "02032");
    SF.sleep(1);
    SF.click(By.xpath('//input[@ng-click="applyPayment()"]'));
    MF.WaitWhileSpinner ();
    SF.waitForLocated (By.xpath('//img[@ng-if="vm.invoicePaid"]'));
    driver.navigate().refresh();
    SF.waitForLocated (By.xpath('//img[@ng-if="vm.invoicePaid"]'));
    SF.sleep(3);
    driver.wait(driver.findElement(By.xpath('//b[contains(text(), "Account Balance Credit (USD):")]/../span/b')).getText().then(function (text) {
        VD.IWant(VD.ToEqual, text, 0, 'баланс не стал нульом после оплаты инвойса');
    }),config.timeout);
    SF.sleep(2);
    driver.close();
    SF.openTab (0);
    MF.EditStorage_CloseOpenModal();
    SF.click(By.xpath('//span[@ng-click="pending.refreshPending();"]'));
    MF.WaitWhileBusy ();
    SF.click(By.xpath('//tr[@ng-click="pending.openModal(request, id)"]/td[contains(text(), "' + V.storage.Id + '")]'));
    SF.click(By.xpath('//tr[@ng-click="pending.openModal(request, id)"]/td[contains(text(), "' + V.storage.Id + '")]'));
    MF.WaitWhileBusy ();
    driver.wait(driver.findElement(By.xpath('//p[contains(text(), "Balance Due")]/following-sibling::p')).getText().then(function (text) {
        VD.IWant(VD.ToEqual, SF.cleanPrice(text), 0, 'баланс не стал 0 на первой странице стораджа после оплаты инвойса')
    }),config.timeout);
    MF.EditStorage_OpenLedger();
    driver.wait(driver.findElement(By.xpath('//span[contains(text(),"Balance :")]/span')).getText().then(function (text) {
         VD.IWant (VD.ToEqual, SF.cleanPrice (text), 0, 'баланс на вкладке леджер не 0 после оплаты инвойса')
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
    //=========================закончили писать тест=============================
    SF.endOfTest();
};
