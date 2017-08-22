module.exports = function main(SF, JS, MF, LF, JSstep, VD, V, By, until,FileDetector, system, condition, config,constants){
    global.fiber = Fiber.current;
    V.client = {};
    V.client.name = SF.randomBukva(6) + '_t';
    V.client.fam = SF.randomBukva(6) + '_t';
    V.client.phone = SF.randomCifra(10);
    V.client.email = SF.randomBukvaSmall(6) + '@' + SF.randomBukvaSmall(4) + '.tes';
    V.client.passwd = 123;
    SF.get(V.adminURL);

    condition.nowWeDoing = 'Логинимся и заходим в темплейт билдер';
    SF.waitForVisible(By.xpath('//div[@ng-controller="LoginController"]//span[contains(text(),"Move")]'));
    SF.send(By.xpath('//input[@id="email"]'), V.adminLogin);
    SF.send(By.xpath('//input[@id="password"]'), V.adminPassword);
    SF.click(By.xpath('//button[@type="submit"]'));
    SF.waitForVisible(By.xpath('//td[@ng-click="requestEditModal(request)"]'));
    MF.Board_OpenSettingsTemplateBuilder();
    MF.WaitWhileBusy();
    SF.waitForVisible(By.xpath('//select[@ng-model="filterByKeyName.key_name"]'));
    SF.click(By.xpath("//button[@ng-click=\"toggleLeft()\"]"));

    condition.nowWeDoing = 'запоминаем Storage invoice template';
    SF.click (By.xpath('//select[@ng-model="filterByKeyName.key_name"]'));
    SF.sleep (1);
    SF.click(By.xpath('//option[@value="storage_invoice_template"]'));
    SF.click(By.xpath('//span[contains(text(),"Default")]'));
    SF.sleep (2);
    driver.actions().mouseMove(driver.findElement(By.xpath('//div[@ng-click="vm.editTemplate(template)"]'))).doubleClick().perform();
    SF.waitForVisible(By.xpath('//label[contains(text(),"Template subject:")]'));
    driver.wait(driver.findElement(By.xpath('//h2[contains(text(),"Storage Invoice")]')).getText().then(function(text){
        V.storageInvoiceTemplate = text;
    }),config.timeout);

    condition.nowWeDoing = 'запоминаем Storage reminder1 template';
    SF.click (By.xpath('//select[@ng-model="filterByKeyName.key_name"]'));
    SF.sleep (1);
    SF.click(By.xpath('//option[@value="storage_reminder1"]'));
    SF.sleep (2);
    driver.actions().mouseMove(driver.findElement(By.xpath('//div[@ng-click="vm.editTemplate(template)"]'))).doubleClick().perform();
    SF.waitForVisible(By.xpath('//span[contains(text(),"your storage fee is now 2 days overdue")]'));
    driver.wait(driver.findElement(By.xpath('//span[contains(text(),"your storage fee is now 2 days overdue")]')).getText().then(function(text){
        V.storageReminder1 = text;
    }),config.timeout);

    condition.nowWeDoing = 'запоминаем Storage reminder2 template';
    SF.click (By.xpath('//select[@ng-model="filterByKeyName.key_name"]'));
    SF.sleep (1);
    SF.click(By.xpath('//option[@value="storage_reminder2"]'));
    SF.sleep (2);
    driver.actions().mouseMove(driver.findElement(By.xpath('//div[@ng-click="vm.editTemplate(template)"]'))).doubleClick().perform();
    SF.waitForVisible(By.xpath('//span[contains(text(),"your storage fee is now 4 days overdue")]'));
    driver.wait(driver.findElement(By.xpath('//span[contains(text(),"your storage fee is now 4 days overdue")]')).getText().then(function(text){
        V.storageReminder2 = text;
    }),config.timeout);

    condition.nowWeDoing = 'запоминаем Storage reminder3 template';
    SF.click (By.xpath('//select[@ng-model="filterByKeyName.key_name"]'));
    SF.sleep (1);
    SF.click(By.xpath('//option[@value="storage_reminder3"]'));
    SF.sleep (2);
    driver.actions().mouseMove(driver.findElement(By.xpath('//div[@ng-click="vm.editTemplate(template)"]'))).doubleClick().perform();
    SF.waitForVisible(By.xpath('//span[contains(text(),"your storage fee is now 6 days overdue")]'));
    driver.wait(driver.findElement(By.xpath('//span[contains(text(),"your storage fee is now 6 days overdue")]')).getText().then(function(text){
        V.storageReminder3 = text;
    }),config.timeout);

    condition.nowWeDoing = 'запоминаем Storage Fee Storage invoice template';
    SF.click (By.xpath('//select[@ng-model="filterByKeyName.key_name"]'));
    SF.sleep (1);
    SF.click(By.xpath('//option[@value="fee_invoice_template"]'));
    SF.sleep (2);
    driver.actions().mouseMove(driver.findElement(By.xpath('//div[@ng-click="vm.editTemplate(template)"]'))).doubleClick().perform();
    SF.waitForVisible(By.xpath('//h2[contains(text(),"Storage Late Fee")]'));
    driver.wait(driver.findElement(By.xpath('//h2[contains(text(),"Storage Late Fee")]')).getText().then(function(text){
        V.feeStorageInvoiceTemplate = text;
    }),config.timeout);

    condition.nowWeDoing = 'заходим в сторадж и проверяем есть ли там темплейти и совпадают ли они';
    MF.Board_OpenStorage();
    SF.click (By.xpath('//img[@ng-src="content/img/storage-icons/Storage.jpg"]'));
    SF.waitForVisible(By.xpath('//a[@ng-click="tabs.setTab(2)"]'));
    SF.sleep (2);
    SF.click (By.xpath('//a[@ng-click="tabs.setTab(2)"]'));
    SF.waitForVisible(By.xpath('//label[contains(text(),"Template subject:")]'));
    driver.wait(driver.findElement(By.xpath('//h2[contains(text(),"Storage Invoice")]')).getText().then(function(text){
        V.storageInvoiceTemplateInStorages = text;
        VD.IWant(VD.ToEqual, V.storageInvoiceTemplateInStorages, V.storageInvoiceTemplate, 'не совпали темплейти Storage');
    }),config.timeout);
    SF.sleep (1);

    SF.click (By.xpath('//a[@ng-click="tabs.setTab(3)"]'));
    SF.waitForVisible(By.xpath('//span[contains(text(),"your storage fee is now 2 days overdue")]'));
    driver.wait(driver.findElement(By.xpath('//span[contains(text(),"your storage fee is now 2 days overdue")]')).getText().then(function(text){
        V.storageReminder1InStorages = text;
        VD.IWant(VD.ToEqual, V.storageReminder1InStorages, V.storageReminder1, 'не совпали темплейти Reminder 1');
    }),config.timeout);
    SF.sleep (1);

    SF.click (By.xpath('//a[@ng-click="tabs.setTab(4)"]'));
    SF.waitForVisible(By.xpath('//span[contains(text(),"your storage fee is now 4 days overdue")]'));
    driver.wait(driver.findElement(By.xpath('//span[contains(text(),"your storage fee is now 4 days overdue")]')).getText().then(function(text){
        V.storageReminder2InStorages = text;
        VD.IWant(VD.ToEqual, V.storageReminder2InStorages, V.storageReminder2, 'не совпали темплейти Reminder 2');
    }),config.timeout);
    SF.sleep (1);

    SF.click (By.xpath('//a[@ng-click="tabs.setTab(5)"]'));
    SF.waitForVisible(By.xpath('//span[contains(text(),"your storage fee is now 6 days overdue")]'));
    driver.wait(driver.findElement(By.xpath('//span[contains(text(),"your storage fee is now 6 days overdue")]')).getText().then(function(text){
        V.storageReminder3InStorages = text;
        VD.IWant(VD.ToEqual, V.storageReminder3InStorages, V.storageReminder3, 'не совпали темплейти Reminder 3');
    }),config.timeout);
    SF.sleep (1);

    SF.click (By.xpath('//a[@ng-click="tabs.setTab(6)"]'));
    SF.waitForVisible(By.xpath('//h2[contains(text(),"Storage Late Fee")]'));
    driver.wait(driver.findElement(By.xpath('//h2[contains(text(),"Storage Late Fee")]')).getText().then(function(text){
        V.feeStorageInvoiceTemplateInStorages = text;
        VD.IWant(VD.ToEqual, V.feeStorageInvoiceTemplateInStorages, V.feeStorageInvoiceTemplate, 'не совпали темплейти Fee Storage Invoice');
    }),config.timeout);
    SF.sleep (1);
    SF.click (By.xpath('//button[@ng-click="closeModal()"]'));
    SF.sleep (2);

    condition.nowWeDoing = 'заходим в Storage Tenants, создаем инвоис и проверяем есть ли там темплейт и совпадает ли он';
    MF.Board_OpenSideBar ();
    SF.click(By.xpath('//a[@ng-click="vm.goToPage(\'storages.pending\', \'\')"]'));
    MF.Board_OpenStoragesTenant();
    MF.WaitWhileBusy();
    SF.sleep (1);
    SF.click(By.xpath('//span[contains(text(),"Move in")]'));
    SF.click(By.xpath('//span[contains(text(),"Move in")]'));
    SF.sleep (4);
    SF.click (By.xpath('//button[@ng-click="openPayment()"]'));
    JS.waitForExist ('a[ng-click=\\"createInvoice()\\"]:visible');
    SF.sleep (1);
    SF.click (By.xpath('//a[@ng-click="createInvoice()"]'));
    JS.waitForExist ('input[ng-model=\\"charge.name\\"]:visible');
    SF.sleep (1);
    V.chargeName = SF.randomCifra(4) + '_t';
    V.chargeDescriptipn = SF.randomBukva(6) + '_t';
    V.movingFrom = SF.randomBukva(10) + '_t';
    V.chargeCost = 10;
    V.chargeQty = 10;
    SF.send(By.xpath('//input[@ng-model="charge.name"]'), V.chargeName);
    SF.send(By.xpath('//input[@ng-model="charge.description"]'), V.chargeDescriptipn);
    SF.send(By.xpath('//input[@ng-model="charge.cost"]'), V.chargeCost);
    SF.send(By.xpath('//input[@ng-model="charge.qty"]'), V.chargeQty);
    SF.send(By.xpath('//input[@ng-model="invoice.field_moving_from.thoroughfare"]'), V.movingFrom);
    SF.sleep (1);
    SF.click (By.xpath('//a[@ng-click="sendInvoice()"]'));
    MF.WaitWhileBusy();
    SF.waitForVisible(By.xpath('//label[contains(text(),"Template subject:")]'));;
    driver.wait(driver.findElement(By.xpath('//h2[contains(text(),"Storage Invoice")]')).getText().then(function(text){
        V.storageInvoiceTemplateInTenants = text;
        VD.IWant(VD.ToEqual, V.storageInvoiceTemplateInTenants, V.storageInvoiceTemplate, 'не совпали темплейти Storage');
    }),config.timeout);
    SF.sleep (1);
    SF.click(By.xpath('//a[@ng-click="cancel()"]'));
    SF.sleep (2);
    SF.click(By.xpath('//button[@ng-click="cancel()"]'));
    SF.sleep (2);
    SF.click(By.xpath('//a[@ng-click="tabs.setTab(4)"]'));
    SF.waitForVisible(By.xpath('//button[@ng-click="sendEmail()"]'));
    SF.click(By.xpath('//button[@ng-click="sendEmail()"]'));
    SF.waitForVisible(By.xpath('//label[contains(text(),"Template subject:")]'));
    driver.wait(driver.findElement(By.xpath('//h2[contains(text(),"Storage Invoice")]')).getText().then(function(text){
        VD.IWant(VD.ToEqual, text, V.storageInvoiceTemplate, 'не совпали темплейти Storage');
    }),config.timeout);

    SF.endOfTest();
};
