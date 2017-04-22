module.exports = function main(SF, JS, JSstep, VD, V, By, until,FileDetector, system, condition, LF,config,constants){
    global.fiber = Fiber.current;
    V.client = {};
    V.client.name = SF.randomBukva(6) + '_t';
    V.client.fam = SF.randomBukva(6) + '_t';
    V.client.phone = SF.randomCifra(10);
    V.client.email = SF.randomBukvaSmall(6) + '@' + SF.randomBukvaSmall(4) + '.tes';

    //=========================начинаем писать тест=============================
    SF.get(V.adminURL);
    LF.LoginToBoardAsAdmin();
condition.nowWeDoing = 'идем в настройки контракт пейдж';
    SF.waitForVisible (By.xpath('//button[@ng-click="toggleLeft()"]'));
    SF.click (By.xpath('//button[@ng-click="toggleLeft()"]'));
    SF.click (By.xpath('//a[@ng-click="vm.goToPage(\'settings.general\', \'\')"]'));
    SF.waitForVisible (By.xpath('//a[@ng-click="vm.goToPage(\'settings.general\', \'\')"]'));
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
//condition.nowWeDoing = 'выставляем время и всякие сервисы, проценты';
/*    SF.clear (By.id('edit-start-time'));
    SF.send(By.id('edit-start-time'), "02:00 AM");
    SF.clear (By.id('edit-time-off'));
    SF.send (By.id('edit-time-off'), "01:00");
    SF.clear (By.id('edit-end-time'));
    SF.send (By.id('edit-end-time'), "03:00 AM");
    SF.clear (By.xpath('//input[@class="large"]'));
    V.packing = SF.randomBukva(10);
    SF.send (By.xpath('//input[@class="large"]'), V.packing);
    SF.select(By.xpath('//select[@id="quantity"]'), 3);
    SF.clear (By.xpath('//input[@class="small"]'));
    SF.send(By.xpath('//input[@class="small"]'), 20);
*/  V.declaration = '+' + SF.randomBukva(4) + '+';
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
    JS.waitForNotExist('div.busyoverlay:visible');
    SF.click (By.xpath('//li[@ng-click="vm.selectTab(id)"][contains(text(), "Release Form")]'));
    SF.sleep (2);
condition.nowWeDoing = 'перешли на вкладку релейз тоже вводим текст';
    SF.clear (By.xpath('//input[@ng-model="setting.title"]'));
    V.releaseSettingsTitle = '+' + SF.randomBukva(4) + '+';
    SF.send (By.xpath('//input[@ng-model="setting.title"]'), V.releaseSettingsTitle);
    SF.clear (By.xpath('//text-angular[@ng-model="setting.body"]/div[2]/div[3]'));
    V.releaseMiddle = '+' + SF.randomBukva(4) + '+';
    SF.send (By.xpath('//text-angular[@ng-model="setting.body"]/div[2]/div[3]'), V.releaseMiddle);
    SF.click(By.xpath('//button[@ng-click="vm.save(true)"]'));
    JS.waitForNotExist('div.busyoverlay:visible');
    SF.click (By.xpath('//li[@ng-click="vm.selectTab(id)"][contains(text(), "Storage Agreement")]'));
    SF.sleep (2);
condition.nowWeDoing = 'перешли на вкладку Storage Agreement тоже вводим текст';
    V.storageAgreement = '+' + SF.randomBukva(3) + '+';
    SF.send (By.xpath('//text-angular[@ng-model="vm.contract_page.rentalAgreement.noticeOfLien"]/div[2]/div[3]'), V.storageAgreement);
    SF.click(By.xpath('//button[@ng-click="vm.save(true)"]'));
    JS.waitForNotExist('div.busyoverlay:visible');
    SF.click (By.xpath('//li[@ng-click="vm.selectTab(id)"][contains(text(), "Terms and Conditions")]'));
    SF.sleep (2);
condition.nowWeDoing = 'перешли на вкладку Terms and Conditions тоже вводим текст';
    V.termsCondition = '+' + SF.randomBukva(3) + '+';
    SF.send (By.xpath('//text-angular[@ng-model="vm.contract_page.terms"]/div[2]/div[3]'), V.termsCondition);
    SF.click(By.xpath('//button[@ng-click="vm.save(true)"]'));
    JS.waitForNotExist('div.busyoverlay:visible');

//тут должны сохранить обновить и зайти обратно в настройки контракта


condition.nowWeDoing = 'ищем в contract page текст который мы вводили';

    driver.wait(driver.findElement(By.xpath('//text-angular[@ng-model="vm.contract_page.textContent.header"]//div[@ng-model="html"]')).getText().then(function (text) {
        VD.IWant(VD.VNotToEqual, text.indexOf(V.content), -1, 'не нашло текст contenta');
    }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//text-angular[@ng-model="vm.contract_page.textContent.welcome"]//div[@ng-model="html"]')).getText().then(function (text) {
        VD.IWant(VD.VNotToEqual, text.indexOf(V.welcome), -1, 'не нашло текст welcome');
    }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//text-angular[@ng-model="vm.contract_page.textContent.localHourlyRate"]//div[@ng-model="html"]')).getText().then(function (text) {
        VD.IWant(VD.VNotToEqual, text.indexOf(V.rate), -1, 'не нашло текст rate');
    }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//text-angular[@ng-model="vm.contract_page.textContent.longRates"]//div[@ng-model="html"]')).getText().then(function (text) {
        VD.IWant(VD.VNotToEqual, text.indexOf(V.longrate), -1, 'не нашло текст longrate');
    }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//textarea[@ng-model="vm.contract_page.textContent.declarUp"]')).getText().then(function (text) {
        VD.IWant(VD.VNotToEqual, text.indexOf(V.declaration), -1, 'не нашло текст declaration');
    }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//span[contains (text(), "a")]/following-sibling::textarea[@ng-model="declarObj.description"]')).getText().then(function (text) {
        VD.IWant(VD.VNotToEqual, text.indexOf(V.declarationA), -1, 'не нашло текст declarationA');
    }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//span[contains (text(), "b")]/following-sibling::textarea[@ng-model="declarObj.description"]')).getText().then(function (text) {
        VD.IWant(VD.VNotToEqual, text.indexOf(V.declarationB), -1, 'не нашло текст declarationB');
    }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//span[contains (text(), "c")]/following-sibling::textarea[@ng-model="declarObj.description"]')).getText().then(function (text) {
        VD.IWant(VD.VNotToEqual, text.indexOf(V.declarationC), -1, 'не нашло текст declarationC');
    }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//textarea[@ng-model="vm.contract_page.textContent.declarDown"]')).getText().then(function (text) {
        VD.IWant(VD.VNotToEqual, text.indexOf(V.declarationDown), -1, 'не нашло текст declarationDown');
    }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//textarea[@ng-model="vm.contract_page.textContent.declarCustomer"]')).getText().then(function (text) {
        VD.IWant(VD.VNotToEqual, text.indexOf(V.declarationCustomer), -1, 'не нашло текст declarationCustomer');
    }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//textarea[@ng-model="sf.text"]')).getText().then(function (text) {
        VD.IWant(VD.VNotToEqual, text.indexOf(V.storage1), -1, 'не нашло текст storage1');
    }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//label[@for="show_1"]/../..//textarea[@ng-model="sf.text"]')).getText().then(function (text) {
        VD.IWant(VD.VNotToEqual, text.indexOf(V.storage2), -1, 'не нашло текст storage2');
    }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//text-angular[@ng-model="vm.contract_page.textContent.last"]/div[2]/div[3]')).getText().then(function (text) {
        VD.IWant(VD.VNotToEqual, text.indexOf(V.textContent), -1, 'не нашло текст textContent');
    }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//text-angular[@ng-model="vm.contract_page.textContent.footer"]/div[2]/div[3]')).getText().then(function (text) {
       //let firstPlus = text.indexOf('+');
      //  let secondPlus = text.indexOf( '+',firstPlus+1 );
      //  let t = text.substring( firstPlus, secondPlus+1);
        VD.IWant(VD.VNotToEqual, text.indexOf(V.footer), -1, 'не нашло текст футера');
    }),config.timeout);
condition.nowWeDoing = 'ищем в Release Form текст который мы вводили';
    driver.wait(driver.findElement(By.xpath('//input[@ng-model="setting.title"]')).getText().then(function (text) {
        VD.IWant(VD.VNotToEqual, text.indexOf(V.releaseSettingsTitle), -1, 'не нашло текст releaseSettingsTitle');
    }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//text-angular[@ng-model="setting.body"]/div[2]/div[3]')).getText().then(function (text) {
        VD.IWant(VD.VNotToEqual, text.indexOf(V.releaseMiddle), -1, 'не нашло текст releaseMiddle');
    }),config.timeout);
condition.nowWeDoing = 'ищем в Storage Agreement текст который мы вводили';
    driver.wait(driver.findElement(By.xpath('//text-angular[@ng-model="vm.contract_page.rentalAgreement.noticeOfLien"]/div[2]/div[3]')).getText().then(function (text) {
        VD.IWant(VD.VNotToEqual, text.indexOf(V.storageAgreement), -1, 'не нашло текст storageAgreement');
    }),config.timeout);
condition.nowWeDoing = 'ищем в Terms and Conditions текст который мы вводили';
    driver.wait(driver.findElement(By.xpath('//text-angular[@ng-model="vm.contract_page.terms"]/div[2]/div[3]')).getText().then(function (text) {
        VD.IWant(VD.VNotToEqual, text.indexOf(V.termsCondition), -1, 'не нашло текст termsCondition');
    }),config.timeout);




    driver.wait(driver.findElement(By.xpath('//text-angular[@ng-model="vm.contract_page.textContent.footer"]/div[2]/div[3]')).getText().then(function (text) {
       t = text.replace(V.footer, '');
        SF.clear (By.xpath('//text-angular[@ng-model="vm.contract_page.textContent.footer"]/div[2]/div[3]'));
        SF.send (By.xpath('//text-angular[@ng-model="vm.contract_page.textContent.footer"]/div[2]/div[3]'), t );
    }),config.timeout);




    Debug.pause();


    //=========================закончили писать тест=============================
    SF.endOfTest();
};
