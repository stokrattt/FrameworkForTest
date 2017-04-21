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
condition.nowWeDoing = 'заполняем верхние кастомные блоки';
    V.content = ' + ' + SF.randomBukva(10) + ' + ';
    SF.click (By.xpath('//text-angular[@ng-model="vm.contract_page.textContent.header"]//div[@ng-model="html"]/p'));
    SF.send (By.xpath('//text-angular[@ng-model="vm.contract_page.textContent.header"]//div[@ng-model="html"]'), V.content);
    V.welcome = ' + ' + SF.randomBukva(10) + ' + ';
    SF.click (By.xpath('//text-angular[@ng-model="vm.contract_page.textContent.welcome"]//div[@ng-model="html"]/p'));
    SF.send (By.xpath('//text-angular[@ng-model="vm.contract_page.textContent.welcome"]//div[@ng-model="html"]'), V.welcome );
    V.rate = ' + ' + SF.randomBukva(10) + ' + ';
    SF.click (By.xpath('//text-angular[@ng-model="vm.contract_page.textContent.localHourlyRate"]//div[@ng-model="html"]/p'));
    SF.send (By.xpath('//text-angular[@ng-model="vm.contract_page.textContent.localHourlyRate"]//div[@ng-model="html"]'), V.rate );
    V.longrate = ' + ' + SF.randomBukva(10) + ' + ';
    SF.click (By.xpath('//text-angular[@ng-model="vm.contract_page.textContent.longRates"]//div[@ng-model="html"]/p'));
    SF.send (By.xpath('//text-angular[@ng-model="vm.contract_page.textContent.longRates"]//div[@ng-model="html"]'), V.longrate );
condition.nowWeDoing = 'выставляем время и всякие сервисы, проценты';
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
*/  V.declaration = ' + ' + SF.randomBukva(10) + ' + ';
    SF.send (By.xpath('//textarea[@ng-model="vm.contract_page.textContent.declarUp"]'),  V.declaration);
    V.declarationA = ' + ' + SF.randomBukva(10) + ' + ';
    SF.send (By.xpath('//span[contains (text(), "a")]/following-sibling::textarea[@ng-model="declarObj.description"]'),  V.declarationA);
    V.declarationB = ' + ' + SF.randomBukva(10) + ' + ';
    SF.send (By.xpath('//span[contains (text(), "b")]/following-sibling::textarea[@ng-model="declarObj.description"]'),  V.declarationB);
    V.declarationC = ' + ' + SF.randomBukva(10) + ' + ';
    SF.send (By.xpath('//span[contains (text(), "c")]/following-sibling::textarea[@ng-model="declarObj.description"]'),  V.declarationC);
    V.declarationDown = ' + ' + SF.randomBukva(10) + ' + ';
    SF.send (By.xpath('//textarea[@ng-model="vm.contract_page.textContent.declarDown"]'),  V.declarationDown);
    V.declarationCustomer = ' + ' + SF.randomBukva(10) + ' + ';
    SF.send (By.xpath('//textarea[@ng-model="vm.contract_page.textContent.declarCustomer"]'),  V.declarationCustomer);
condition.nowWeDoing = 'заполняем блок storage transit';
    V.storage1 = ' + ' + SF.randomBukva(10) + ' + ';
    SF.send (By.xpath('//textarea[@ng-model="vm.contract_page.textContent.declarCustomer"]'),  V.storage1);


    Debug.pause();


    //=========================закончили писать тест=============================
    SF.endOfTest();
};
