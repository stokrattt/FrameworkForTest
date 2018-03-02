module.exports = function main(SF, JS, MF, LF, JSstep, VD, V, By, until,FileDetector, system, condition, config,constants) {
    global.fiber = Fiber.current;
    //=========================начинаем писать тест=============================
    SF.get(V.adminURL);
    LF.LoginToBoardAsCustom(V.adminLogin,V.adminPassword);

condition.nowWeDoing = 'идем в настройки контракт пейдж';
    MF.Board_OpenSettingsGeneral ();
    SF.sleep(2);
    SF.click(By.linkText('Contract page'));
    SF.sleep (2);
    SF.click (By.xpath('//a[@href="/account/#/request/contract"]'));
    SF.openTab (1);
    SF.waitForLocated (By.id('contract-page'));

condition.nowWeDoing = 'заполняем верхние и средние кастомные contract page блоки';
    V.content = '+' + SF.randomBukva(4) + '+';
    SF.click (By.xpath('//text-angular[@ng-model="vm.contract_page.textContent.header"]//div[@ng-model="html"]/p'));
    SF.send (By.xpath('//text-angular[@ng-model="vm.contract_page.textContent.header"]//div[@ng-model="html"]'), V.content);
    V.welcome = '+' + SF.randomBukva(4) + '+';
    SF.click (By.xpath('//text-angular[@ng-model="vm.contract_page.textContent.welcome"]//div[@ng-model="html"]/p'));
    SF.send (By.xpath('//text-angular[@ng-model="vm.contract_page.textContent.welcome"]//div[@ng-model="html"]'), V.welcome );
    V.rate = '+' + SF.randomBukva(4) + '+';
    SF.click (By.xpath('//text-angular[@ng-model="vm.contract_page.textContent.localHourlyRate"]//div[@ng-model="html"]/p'));
    SF.send (By.xpath('//text-angular[@ng-model="vm.contract_page.textContent.localHourlyRate"]//div[@ng-model="html"]'), V.rate );
    V.longrate = '+' + SF.randomBukva(4) + '+';
    SF.click (By.xpath('//text-angular[@ng-model="vm.contract_page.textContent.longRates"]//div[@ng-model="html"]/p'));
    SF.send (By.xpath('//text-angular[@ng-model="vm.contract_page.textContent.longRates"]//div[@ng-model="html"]'), V.longrate );
    V.declaration = '+' + SF.randomBukva(4) + '+';
    SF.send (By.xpath('//textarea[@ng-model="vm.contract_page.textContent.declarUp"]'),  V.declaration);
    V.declarationA = '+' + SF.randomBukva(4) + '+';
    SF.send (By.xpath('//span[contains (text(), "a")]/following-sibling::textarea[@ng-model="declarObj.description"]'),  V.declarationA);
    V.declarationB = '+' + SF.randomBukva(4) + '+';
    SF.send (By.xpath('//span[contains (text(), "b")]/following-sibling::textarea[@ng-model="declarObj.description"]'),  V.declarationB);
    V.declarationC = '+' + SF.randomBukva(4) + '+';
    SF.send (By.xpath('//span[contains (text(), "c")]/following-sibling::textarea[@ng-model="declarObj.description"]'),  V.declarationC);
    V.declarationDown = '+' + SF.randomBukva(4) + '+';
    SF.send (By.xpath('//textarea[@ng-model="vm.contract_page.textContent.declarDown"]'),  V.declarationDown);
    V.declarationCustomer = '+' + SF.randomBukva(4) + '+';
    SF.send (By.xpath('//textarea[@ng-model="vm.contract_page.textContent.declarCustomer"]'),  V.declarationCustomer);

condition.nowWeDoing = 'заполняем блок storage transit и футер';
    V.storage1 = '+' + SF.randomBukva(4) + '+';
    SF.send (By.xpath('//textarea[@ng-model="sf.text"]'),  V.storage1);
    V.storage2 = '+' + SF.randomBukva(4) + '+';
    SF.send (By.xpath('//label[@for="show_1"]/../..//textarea[@ng-model="sf.text"]'),  V.storage2);
    V.textContent = '+' + SF.randomBukva(4) + '+';
    SF.send (By.xpath('//text-angular[@ng-model="vm.contract_page.textContent.last"]/div[2]/div[3]'),  V.textContent);
    V.footer = '+' + SF.randomBukva(4) + '+';
    SF.send (By.xpath('//text-angular[@ng-model="vm.contract_page.textContent.footer"]/div[2]/div[3]'),  V.footer);

condition.nowWeDoing = 'сохраняем все в контракте';
    SF.click(By.xpath('//button[@ng-click="vm.save(true)"]'));
    MF.WaitWhileBusy ();
    MF.SweetConfirm ();
    SF.click (By.xpath('//li[@ng-click="vm.selectTab(id)"][contains(text(), "Release Form")]'));
    SF.sleep (1);

condition.nowWeDoing = 'перешли на вкладку релейз тоже вводим текст';
    V.releaseHeader = '+' + SF.randomBukva(4) + '+';
    SF.send (By.xpath('//text-angular[@ng-model="releaseSettings.releaseForm.header"]/div[2]/div[3]'),  V.releaseHeader);
    SF.clear (By.xpath('//input[@ng-model="setting.title"]'));
    V.releaseSettingsTitle = '+' + SF.randomBukva(4) + '+';
    SF.send (By.xpath('//input[@ng-model="setting.title"]'), V.releaseSettingsTitle);
    SF.clear (By.xpath('//text-angular[@ng-model="setting.body"]/div[2]/div[3]'));
    V.releaseMiddle = '+' + SF.randomBukva(4) + '+';
    SF.send (By.xpath('//text-angular[@ng-model="setting.body"]/div[2]/div[3]'), V.releaseMiddle);
    V.releaseFooter = '+' + SF.randomBukva(4) + '+';
    SF.send (By.xpath('//text-angular[@ng-model="releaseSettings.releaseForm.footer"]/div[2]/div[3]'),  V.releaseFooter);
    SF.click(By.xpath('//button[@ng-click="vm.save(true)"]'));
    MF.WaitWhileBusy ();
    MF.SweetConfirm ();
    SF.click (By.xpath('//li[@ng-click="vm.selectTab(id)"][contains(text(), "Storage Agreement")]'));
    SF.sleep (1);

condition.nowWeDoing = 'перешли на вкладку Storage Agreement тоже вводим текст';
    V.storageAgreement = '+' + SF.randomBukva(3) + '+';
    SF.send (By.xpath('//text-angular[@ng-model="vm.contract_page.rentalAgreement.noticeOfLien"]/div[2]/div[3]'), V.storageAgreement);
    SF.sleep (3);
    SF.click(By.xpath('//button[@ng-click="vm.save(true)"]'));
    MF.WaitWhileBusy ();
    MF.SweetConfirm ();
    SF.click (By.xpath('//li[@ng-click="vm.selectTab(id)"][contains(text(), "Terms and Conditions")]'));
    SF.sleep (1);

condition.nowWeDoing = 'перешли на вкладку Terms and Conditions тоже вводим текст';
    V.termsCondition = '+' + SF.randomBukva(4) + '+';
    SF.send (By.xpath('//text-angular[@ng-model="vm.contract_page.terms"]/div[2]/div[3]'), V.termsCondition);
    SF.sleep (3);
    SF.click(By.xpath('//button[@ng-click="vm.save(true)"]'));
    MF.WaitWhileBusy ();
    MF.SweetConfirm ();
    SF.sleep (1);
    driver.close();
    SF.sleep (2);
    SF.openTab (0);
    SF.sleep (2);
//тут должны сохранить обновить и зайти обратно в настройки контракта
    driver.navigate().refresh();
    SF.sleep (5);
    SF.click(By.linkText('Contract page'));
    SF.sleep (2);
    SF.click (By.xpath('//a[@href="/account/#/request/contract"]'));
    SF.openTab (1);
    SF.waitForLocated (By.id('contract-page'));
    SF.sleep (1);

condition.nowWeDoing = 'ищем в contract page текст который мы вводили, потом удаляем его';
    driver.wait(driver.findElement(By.xpath('//text-angular[@ng-model="vm.contract_page.textContent.header"]//div[@ng-model="html"]')).getText().then(function (text) {
        q = text.indexOf(V.content);
        VD.IWant(VD.NotToEqual, q, -1, 'не нашло текст contenta');
        V.contentClear = text.replace(V.content, '');
    }),config.timeout);
    SF.clear (By.xpath('//text-angular[@ng-model="vm.contract_page.textContent.header"]//div[@ng-model="html"]'));
    SF.send (By.xpath('//text-angular[@ng-model="vm.contract_page.textContent.header"]//div[@ng-model="html"]'), V.contentClear );
    driver.wait(driver.findElement(By.xpath('//text-angular[@ng-model="vm.contract_page.textContent.welcome"]//div[@ng-model="html"]')).getText().then(function (text) {
        q = text.indexOf(V.welcome);
        VD.IWant(VD.NotToEqual, q, -1, 'не нашло текст welcome');
        V.welcomeClear = text.replace(V.welcome, '');
    }),config.timeout);
    SF.clear (By.xpath('//text-angular[@ng-model="vm.contract_page.textContent.welcome"]//div[@ng-model="html"]'));
    SF.send (By.xpath('//text-angular[@ng-model="vm.contract_page.textContent.welcome"]//div[@ng-model="html"]'), V.welcomeClear );
    driver.wait(driver.findElement(By.xpath('//text-angular[@ng-model="vm.contract_page.textContent.localHourlyRate"]//div[@ng-model="html"]')).getText().then(function (text) {
        q = text.indexOf(V.rate);
        VD.IWant(VD.NotToEqual, q, -1, 'не нашло текст rate');
        V.rateClear = text.replace(V.rate, '');
    }),config.timeout);
    SF.clear (By.xpath('//text-angular[@ng-model="vm.contract_page.textContent.localHourlyRate"]//div[@ng-model="html"]'));
    SF.send (By.xpath('//text-angular[@ng-model="vm.contract_page.textContent.localHourlyRate"]//div[@ng-model="html"]'), V.rateClear );
    driver.wait(driver.findElement(By.xpath('//text-angular[@ng-model="vm.contract_page.textContent.longRates"]//div[@ng-model="html"]')).getText().then(function (text) {
        q = text.indexOf(V.longrate);
        VD.IWant(VD.NotToEqual, q, -1, 'не нашло текст longrate');
        V.longrateClear = text.replace(V.longrate, '');
    }),config.timeout);
    SF.clear (By.xpath('//text-angular[@ng-model="vm.contract_page.textContent.longRates"]//div[@ng-model="html"]'));
    SF.send (By.xpath('//text-angular[@ng-model="vm.contract_page.textContent.longRates"]//div[@ng-model="html"]'), V.longrateClear );
    driver.wait(driver.findElement(By.xpath('//textarea[@ng-model="vm.contract_page.textContent.declarUp"]')).getText().then(function (text) {
        q = text.indexOf(V.declaration);
        VD.IWant(VD.NotToEqual, q, -1, 'не нашло текст declaration');
        V.declarationClear = text.replace(V.declaration, '');
    }),config.timeout);
    SF.clear (By.xpath('//textarea[@ng-model="vm.contract_page.textContent.declarUp"]'));
    SF.send (By.xpath('//textarea[@ng-model="vm.contract_page.textContent.declarUp"]'), V.declarationClear);
    driver.wait(driver.findElement(By.xpath('//span[contains (text(), "a")]/following-sibling::textarea[@ng-model="declarObj.description"]')).getText().then(function (text) {
        q = text.indexOf(V.declarationA);
        VD.IWant(VD.NotToEqual, q, -1, 'не нашло текст declarationA');
        V.declarationAclear = text.replace(V.declarationA, '');
    }),config.timeout);
    SF.clear (By.xpath('//span[contains (text(), "a")]/following-sibling::textarea[@ng-model="declarObj.description"]'));
    SF.send (By.xpath('//span[contains (text(), "a")]/following-sibling::textarea[@ng-model="declarObj.description"]'), V.declarationAclear);
    driver.wait(driver.findElement(By.xpath('//span[contains (text(), "b")]/following-sibling::textarea[@ng-model="declarObj.description"]')).getText().then(function (text) {
        q = text.indexOf(V.declarationB);
        VD.IWant(VD.NotToEqual, q, -1, 'не нашло текст declarationB');
        V.declarationBclear = text.replace(V.declarationB, '');
    }),config.timeout);
    SF.clear (By.xpath('//span[contains (text(), "b")]/following-sibling::textarea[@ng-model="declarObj.description"]'));
    SF.send (By.xpath('//span[contains (text(), "b")]/following-sibling::textarea[@ng-model="declarObj.description"]'), V.declarationBclear );
    driver.wait(driver.findElement(By.xpath('//span[contains (text(), "c")]/following-sibling::textarea[@ng-model="declarObj.description"]')).getText().then(function (text) {
        q = text.indexOf(V.declarationC);
        VD.IWant(VD.NotToEqual, q, -1, 'не нашло текст declarationC');
        V.declarationCclear = text.replace(V.declarationC, '');
    }),config.timeout);
    SF.clear (By.xpath('//span[contains (text(), "c")]/following-sibling::textarea[@ng-model="declarObj.description"]'));
    SF.send (By.xpath('//span[contains (text(), "c")]/following-sibling::textarea[@ng-model="declarObj.description"]'), V.declarationCclear );
    driver.wait(driver.findElement(By.xpath('//textarea[@ng-model="vm.contract_page.textContent.declarDown"]')).getText().then(function (text) {
        q = text.indexOf(V.declarationDown);
        VD.IWant(VD.NotToEqual, q, -1, 'не нашло текст declarationDown');
        V.declarationDownClear = text.replace(V.declarationDown, '');
    }),config.timeout);
    SF.clear (By.xpath('//textarea[@ng-model="vm.contract_page.textContent.declarDown"]'));
    SF.send (By.xpath('//textarea[@ng-model="vm.contract_page.textContent.declarDown"]'), V.declarationDownClear );
    driver.wait(driver.findElement(By.xpath('//textarea[@ng-model="vm.contract_page.textContent.declarCustomer"]')).getText().then(function (text) {
        q = text.indexOf(V.declarationCustomer);
        VD.IWant(VD.NotToEqual, q, -1, 'не нашло текст declarationCustomer');
        V.declarationCustomerClear = text.replace(V.declarationCustomer, '');
    }),config.timeout);
    SF.clear (By.xpath('//textarea[@ng-model="vm.contract_page.textContent.declarCustomer"]'));
    SF.send (By.xpath('//textarea[@ng-model="vm.contract_page.textContent.declarCustomer"]'), V.declarationCustomerClear );
    driver.wait(driver.findElement(By.xpath('//textarea[@ng-model="sf.text"]')).getAttribute('value').then(function (text) {
        q = text.indexOf(V.storage1);
        VD.IWant(VD.NotToEqual, q, -1, 'не нашло текст storage1');
    }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//label[@for="show_1"]/../..//textarea[@ng-model="sf.text"]')).getAttribute('value').then(function (text) {
        q = text.indexOf(V.storage2);
        VD.IWant(VD.NotToEqual, q, -1, 'не нашло текст storage2');
    }),config.timeout);
    SF.click (By.xpath('//button[@ng-click="vm.setDefaultStorage()"]'));
    JS.waitForNotExist('div.busyoverlay:visible');
    driver.wait(driver.findElement(By.xpath('//text-angular[@ng-model="vm.contract_page.textContent.last"]/div[2]/div[3]')).getText().then(function (text) {
        q = text.indexOf(V.textContent);
        VD.IWant(VD.NotToEqual, q, -1, 'не нашло текст textContent');
        V.textContentClear = text.replace(V.textContent, '');
    }),config.timeout);
    SF.clear (By.xpath('//text-angular[@ng-model="vm.contract_page.textContent.last"]/div[2]/div[3]'));
    SF.send (By.xpath('//text-angular[@ng-model="vm.contract_page.textContent.last"]/div[2]/div[3]'), V.textContentClear );
    driver.wait(driver.findElement(By.xpath('//text-angular[@ng-model="vm.contract_page.textContent.footer"]/div[2]/div[3]')).getText().then(function (text) {
        q = text.indexOf(V.footer);
        VD.IWant(VD.NotToEqual, q, -1, 'не нашло текст футера');
        V.footerClear = text.replace(V.footer, '');
    }),config.timeout);
    SF.clear (By.xpath('//text-angular[@ng-model="vm.contract_page.textContent.footer"]/div[2]/div[3]'));
    SF.send (By.xpath('//text-angular[@ng-model="vm.contract_page.textContent.footer"]/div[2]/div[3]'), V.footerClear );
    SF.sleep (2);
    SF.click(By.xpath('//button[@ng-click="vm.save(true)"]'));
    MF.WaitWhileBusy ();
    MF.SweetConfirm ();
    SF.click (By.xpath('//li[@ng-click="vm.selectTab(id)"][contains(text(), "Release Form")]'));
    SF.sleep (2);

condition.nowWeDoing = 'ищем в Release Form текст который мы вводили, потом удаляем его';
    driver.wait(driver.findElement(By.xpath('//text-angular[@ng-model="releaseSettings.releaseForm.header"]/div[2]/div[3]')).getText().then(function (text) {
        q = text.indexOf(V.releaseHeader);
        VD.IWant(VD.NotToEqual, q, -1, 'не нашло текст storageAgreement');
        V.releaseHeaderClear = text.replace(V.releaseHeader, '');
    }),config.timeout);
    SF.clear (By.xpath('//text-angular[@ng-model="releaseSettings.releaseForm.header"]/div[2]/div[3]'));
    SF.send (By.xpath('//text-angular[@ng-model="releaseSettings.releaseForm.header"]/div[2]/div[3]'), V.releaseHeaderClear );
    driver.wait(driver.findElement(By.xpath('//input[@ng-model="setting.title"]')).getAttribute('value').then(function (text) {
        VD.IWant(VD.ToEqual, text, V.releaseSettingsTitle, 'не нашло текст releaseSettingsTitle');
    }),config.timeout);
    SF.clear (By.xpath('//input[@ng-model="setting.title"]'));
    driver.wait(driver.findElement(By.xpath('//text-angular[@ng-model="setting.body"]/div[2]/div[3]')).getAttribute('value').then(function (text) {
        VD.IWant(VD.NotToEqual, text, V.releaseMiddle, 'не нашло текст releaseMiddle');
    }),config.timeout);
    SF.clear (By.xpath('//text-angular[@ng-model="setting.body"]/div[2]/div[3]'));
    driver.wait(driver.findElement(By.xpath('//text-angular[@ng-model="releaseSettings.releaseForm.footer"]/div[2]/div[3]')).getText().then(function (text) {
        q = text.indexOf(V.releaseFooter);
        VD.IWant(VD.NotToEqual, q, -1, 'не нашло текст storageAgreement');
        V.releaseFooterClear = text.replace(V.releaseFooter, '');
    }),config.timeout);
    SF.clear (By.xpath('//text-angular[@ng-model="releaseSettings.releaseForm.footer"]/div[2]/div[3]'));
    SF.send (By.xpath('//text-angular[@ng-model="releaseSettings.releaseForm.footer"]/div[2]/div[3]'), V.releaseFooterClear );
    SF.sleep (2);
    SF.click(By.xpath('//button[@ng-click="vm.save(true)"]'));
    MF.WaitWhileBusy ();
    MF.SweetConfirm ();
    SF.click (By.xpath('//li[@ng-click="vm.selectTab(id)"][contains(text(), "Storage Agreement")]'));
    SF.sleep (2);

condition.nowWeDoing = 'ищем в Storage Agreement текст который мы вводили, потом удаляем его';
    driver.wait(driver.findElement(By.xpath('//text-angular[@ng-model="vm.contract_page.rentalAgreement.noticeOfLien"]/div[2]/div[3]')).getText().then(function (text) {
        q = text.indexOf(V.storageAgreement);
        VD.IWant(VD.NotToEqual, q, -1, 'не нашло текст storageAgreement');
        V.storageAgreementClear = text.replace(V.storageAgreement, '');
    }),config.timeout);
    SF.clear (By.xpath('//text-angular[@ng-model="vm.contract_page.rentalAgreement.noticeOfLien"]/div[2]/div[3]'));
    SF.send (By.xpath('//text-angular[@ng-model="vm.contract_page.rentalAgreement.noticeOfLien"]/div[2]/div[3]'), V.storageAgreementClear );
    SF.sleep (2);
    SF.click(By.xpath('//button[@ng-click="vm.save(true)"]'));
    MF.WaitWhileBusy ();
    MF.SweetConfirm ();
    SF.click (By.xpath('//li[@ng-click="vm.selectTab(id)"][contains(text(), "Terms and Conditions")]'));
    SF.sleep (2);

condition.nowWeDoing = 'ищем в Terms and Conditions текст который мы вводили, потом удаляем его';
    driver.wait(driver.findElement(By.xpath('//text-angular[@ng-model="vm.contract_page.terms"]/div[2]/div[3]')).getText().then(function (text) {
        q = text.indexOf(V.termsCondition);
        VD.IWant(VD.NotToEqual, q, -1, 'не нашло текст termsCondition');
        V.termsConditionClear = text.replace(V.termsCondition, '');
    }),config.timeout);
    SF.clear (By.xpath('//text-angular[@ng-model="vm.contract_page.terms"]/div[2]/div[3]'));
    SF.send (By.xpath('//text-angular[@ng-model="vm.contract_page.terms"]/div[2]/div[3]'), V.termsConditionClear );
    SF.sleep (2);
    SF.click(By.xpath('//button[@ng-click="vm.save(true)"]'));
    MF.WaitWhileBusy ();
    MF.SweetConfirm ();
    SF.sleep (1);
    driver.close();
    SF.sleep (2);
    SF.openTab (0);
    driver.navigate().refresh();
    SF.sleep (5);
    SF.click(By.linkText('Contract page'));
    SF.sleep (2);

condition.nowWeDoing = 'проверяем на главной странице настроек контракт пейдж А, В, С  на отсутствие текста';
    driver.wait(driver.findElement(By.xpath('//h1[contains(text(), "a")]/../../following-sibling::td/div/p')).getText().then(function (text) {
        q = text.indexOf(V.declarationA);
        VD.IWant(VD.ToEqual, q, -1, 'текст declarationA остался, а не должен был');
    }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//h1[contains(text(), "b")]/../../following-sibling::td/div/p')).getText().then(function (text) {
        q = text.indexOf(V.declarationB);
        VD.IWant(VD.ToEqual, q, -1, 'текст declarationB остался, а не должен был');
    }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//h1[contains(text(), "c")]/../../following-sibling::td/div/p')).getText().then(function (text) {
        q = text.indexOf(V.declarationC);
        VD.IWant(VD.ToEqual, q, -1, 'текст declarationB остался, а не должен был');
    }),config.timeout);
    SF.sleep(1);

    //=========================закончили писать тест=============================
    SF.endOfTest();
};
