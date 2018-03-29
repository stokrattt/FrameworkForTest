module.exports = function main(SF, JS, MF, LF, JSstep, VD, V, By, until,FileDetector, system, condition, config,constants) {
    global.fiber = Fiber.current;
    V.client = {};
    V.client.name = SF.randomBukva(6) + '_t';
    V.client.fam = SF.randomBukva(6) + '_t';
    V.client.phone = SF.randomCifra(10);
    V.client.email = SF.randomBukvaSmall(6) + '@' + SF.randomBukvaSmall(4) + '.tes';
    V.client.passwd = 123;
    //=========================начинаем писать тест=============================
    SF.get(V.adminURL);
    LF.LoginToBoardAsCustom(V.adminLogin,V.adminPassword);

condition.nowWeDoing = 'создаем реквест с борда';
    LF.CreateLocalMovingFromBoard (V.client);
    MF.EditRequest_RememberId (V.request);
    V.boardNumbers = {};
    driver.wait(driver.findElement(By.xpath("(//div[@ng-show='!request.isInventory']/span)[1]")).getText().then(function (text) {
        V.InventoryCFDefault = SF.cleanPrice(text.replace('Total Estimated Cubic Feet:', ''));
    }), config.timeout);
    SF.sleep(1);
    MF.EditRequest_OpenInventoryTab();

condition.nowWeDoing = 'создаем кастомный аитем и кастомный бедрум';
    MF.EditRequest_CreateCustomBedroom();
    SF.click(By.xpath('//div[@class="inventory__filters opened"]//a[@ng-click="selectFilter(filter);"]/span[contains(text(),"Dresser, Mirror")]'));
    SF.click (By.xpath('//div[@class="inventory__item"][1]//button[@ng-click="onClickCounter(1)"]'));
    SF.click (By.xpath('//div[@class="inventory__item"][2]//button[@ng-click="onClickCounter(1)"]'));
    SF.click (By.xpath('//div[@class="inventory__item"][3]//button[@ng-click="onClickCounter(1)"]'));
    MF.EditRequest_CreateCustomRoom();
    SF.click(By.xpath('//div[@class="inventory__filters opened"]//a[@ng-click="selectFilter(item);"]/span[contains(text(),"Miscellaneous")]'));
    SF.click (By.xpath('//div[@class="inventory__item"][1]//button[@ng-click="onClickCounter(1)"]'));
    SF.click (By.xpath('//div[@class="inventory__item"][2]//button[@ng-click="onClickCounter(1)"]'));
    SF.click (By.xpath('//div[@class="inventory__item"][3]//button[@ng-click="onClickCounter(1)"]'));
    driver.wait(driver.findElement(By.xpath('//div[@ng-if="total.total_cf > 0 && (!isAccount || isContractPage)"]/span[@ng-bind="total.total_cf"][1]')).getText().then(function (text) {
        V.boardNumbers.InventoryCubicFit = SF.cleanPrice(text.replace('Total Estimated Cubic Feet:', ''));
    }), config.timeout);
    MF.EditRequest_ClickSaveInventory();
    driver.wait(driver.findElement(By.xpath("(//div[@ng-show='!request.isInventory']/span)[1]")).getText().then(function (text){
        V.boardNumbersCubFit = SF.cleanPrice (text);
        VD.IWant(VD.ToEqual,V.boardNumbersCubFit, V.boardNumbers.InventoryCubicFit, 'Сравниваем инвенторий на 1й странице и в табе инвентаря');
    }),config.timeout);
    LF.RememberDigitsRequestBoard(V.boardNumbers);
    MF.EditRequest_OpenClient();
    LF.SetClientPasswd(V.client.passwd);
    MF.EditRequest_OpenRequest();
    MF.EditRequest_SaveChanges();
    LF.closeEditRequest();
    MF.Board_LogoutAdmin();

condition.nowWeDoing = 'иду в аккаунт добавляем еще кастом рум и бедрум, проверяем кол-во аитемов ';
    SF.get(V.accountURL);
    LF.LoginToAccountAsClient(V.client);
    MF.Account_OpenRequest(V.request.Id);
    MF.Account_ClickViewRequest();
    MF.Account_ClickInventoryOpenTab();
    MF.EditRequest_CreateCustomBedroom();
    SF.click(By.xpath('//div[@class="inventory__filters opened"]//a[@ng-click="selectFilter(filter);"]/span[contains(text(),"Bed, Mattress")]'));
    SF.click (By.xpath('//div[@class="inventory__item"][1]//button[@ng-click="onClickCounter(1)"]'));
    SF.click (By.xpath('//div[@class="inventory__item"][2]//button[@ng-click="onClickCounter(1)"]'));
    SF.click (By.xpath('//div[@class="inventory__item"][3]//button[@ng-click="onClickCounter(1)"]'));
    MF.EditRequest_CreateCustomRoom();
    SF.click(By.xpath('//div[@class="inventory__filters opened"]//a[@class="inventory__filter"]/span[contains(text(),"Miscellaneous")]'));
    SF.click (By.xpath('//div[@class="inventory__item"][1]//button[@ng-click="onClickCounter(1)"]'));
    SF.click (By.xpath('//div[@class="inventory__item"][2]//button[@ng-click="onClickCounter(1)"]'));
    SF.click (By.xpath('//div[@class="inventory__item"][3]//button[@ng-click="onClickCounter(1)"]'));
    driver.wait(driver.findElement(By.xpath('//div[@class="inventory__toolbar-item inventory__toolbar-item_info"]/span[@ng-bind="total.count"]')).getText().then(function (text) {
        V.InventoryTotalItemsAccount = SF.cleanPrice(text.replace('Total Items:', ''));
    }), config.timeout);
    SF.click(By.xpath('//div[@class="inventory__filters opened"]//a[@class="inventory__filter"]/span[contains(text(),"Custom item")]'));
    SF.sleep(3);
    SF.send(By.id('customInventoryName'), 'big piano');
    SF.sleep(0.5);
    SF.send(By.xpath('//input[@ng-model="newItem.height.value"]'), 70);
    SF.sleep(0.5);
    SF.send(By.xpath('//input[@ng-model="newItem.depth.value"]'), 70);
    SF.sleep(0.5);
    SF.send(By.xpath('//input[@ng-model="newItem.width.value"]'), 70);
    SF.sleep(0.5);
    SF.send(By.xpath('//input[@ng-model="newItem.count.value"]'), 3);
    SF.sleep(0.5);
    SF.click(By.xpath('//button[@ng-click="customItemForm.$setSubmitted()"]'));
    MF.SweetCancel();
    MF.Account_ClickSaveInventory();
    V.accountNumbers={};
    LF.RememberAccountNumbers(V.accountNumbers);
    driver.wait(driver.findElement(By.xpath('//div[@class="row inventory-box"]//div[@class="col-md-8 total-right total-indicators"]/span[1]')).getText().then(function (text) {
        V.InventoryTotalItemsDownTable = SF.cleanPrice(text.replace('Total Items:', ''));
        VD.IWant(VD.ToEqual,V.InventoryTotalItemsAccount, V.InventoryTotalItemsDownTable, 'Сравниваем кол-во аитемов аккаунт/нижняя таблица');
    }), config.timeout);
    LF.LogoutFromAccount();

condition.nowWeDoing = 'иду в админку в наш реквест, сверяем к.ф. инвентаря и тотал аитемов';
    SF.get(V.adminURL);
    LF.LoginToBoardAsCustom(V.adminLogin,V.adminPassword);
    MF.Board_OpenRequest(V.request.Id);
    LF.RememberDigitsRequestBoard(V.boardNumbers);
    driver.wait(driver.findElement(By.xpath("(//div[@ng-show='!request.isInventory']/span)[1]")).getText().then(function (text){
        V.boardNumbersCubFit1 = SF.cleanPrice (text);
        VD.IWant(VD.ToEqual,V.boardNumbersCubFit1, V.accountNumbers.cbf, 'Сравниваем к.ф. в модалке с аккаунтом');
    }),config.timeout);
    MF.EditRequest_OpenInventoryTab();
    SF.sleep(20);
    driver.wait(driver.findElement(By.xpath('//div[@class="inventory__toolbar-item inventory__toolbar-item_info"]/span[@ng-bind="total.count"]')).getText().then(function (text) {
        V.InventoryTotalRequest = SF.cleanPrice(text.replace('Total Items:', ''));
        VD.IWant(VD.ToEqual,V.InventoryTotalItemsAccount, V.InventoryTotalRequest, 'Сравниваем кол-во аитемов в аккаунте и модалке');
    }), config.timeout);

condition.nowWeDoing = 'удаляем все аитемы, и проверяем что вес вернулся в дефолтный';
    SF.click (By.xpath('//div[@class="inventory__item"]//button[@ng-click="onClickCounter(-1)"]'));
    SF.click (By.xpath('//div[@class="inventory__item"]//button[@ng-click="onClickCounter(-1)"]'));
    SF.click (By.xpath('//div[@class="inventory__item"]//button[@ng-click="onClickCounter(-1)"]'));
    SF.click (By.xpath('//div[@class="inventory__item"]//button[@ng-click="onClickCounter(-1)"]'));
    SF.click (By.xpath('//div[@class="inventory__item"]//button[@ng-click="onClickCounter(-1)"]'));
    SF.click (By.xpath('//div[@class="inventory__item"]//button[@ng-click="onClickCounter(-1)"]'));
    SF.click (By.xpath('//div[@class="inventory__item"]//button[@ng-click="onClickCounter(-1)"]'));
    SF.click (By.xpath('//div[@class="inventory__item"]//button[@ng-click="onClickCounter(-1)"]'));
    SF.click (By.xpath('//div[@class="inventory__item"]//button[@ng-click="onClickCounter(-1)"]'));
    SF.click (By.xpath('//div[@class="inventory__item"]//button[@ng-click="onClickCounter(-1)"]'));
    SF.click (By.xpath('//div[@class="inventory__item"]//button[@ng-click="onClickCounter(-1)"]'));
    SF.click (By.xpath('//div[@class="inventory__item"]//button[@ng-click="onClickCounter(-1)"]'));
    MF.EditRequest_ClickSaveInventory();
    driver.wait(driver.findElement(By.xpath("(//div[@ng-show='!request.isInventory']/span)[1]")).getText().then(function (text){
        V.boardNumbersCubFitAfterDeleteInventory = SF.cleanPrice (text);
        VD.IWant(VD.ToEqual,V.boardNumbersCubFitAfterDeleteInventory, V.InventoryCFDefault, 'Проверяем, что вес вернулся в дефолтный');
    }),config.timeout);
    SF.sleep(1);

    SF.endOfTest();
};


