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
    SF.sleep(2);
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
    // MF.SweetConfirm();
    SF.sleep(3);
    SF.click(By.xpath('//div[@class="inventory__filters opened"]//a[@class="inventory__filter"]/span[contains(text(),"Miscellaneous")]'));
    SF.sleep(3);
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

condition.nowWeDoing = 'открываем инвенторий, через поиск ищем несуществующий элемент и проверяем что нам подставит система ввести кастомный айтем' +
        'создаем сразу кастомный айтем и потом делаем нот конферм и проверим в емейле что отправляется правильный кубик фит и тотал айтемс';
    MF.EditRequest_OpenInventoryTab();
    SF.sleep(2);
    driver.wait(driver.findElement(By.xpath('//div[@class="inventory__toolbar-item inventory__toolbar-item_info"]/span[@ng-bind="total.count"]')).getText().then(function (text) {
        V.InventoryTotalRequest = SF.cleanPrice(text.replace('Total Items:', ''));
        VD.IWant(VD.ToEqual,V.InventoryTotalItemsAccount, V.InventoryTotalRequest, 'Сравниваем кол-во аитемов в аккаунте и модалке');
    }), config.timeout);
    SF.click(By.xpath('//div[@class="inventory__toolbar-item"]/input[@ng-change="search()"]'));
    SF.send(By.xpath('//div[@class="inventory__toolbar-item"]/input[@ng-change="search()"]'), 'tralala');
    SF.sleep(2);
    driver.wait(driver.findElement(By.xpath('//input[@ng-model="newItem.title.value"]')).getAttribute('value').then(function (text) {
        VD.IWant(VD.ToEqual, text, 'tralala', 'не открылся ввод для кастомного айтема и не подставилось наше имя в поле item name');
    }),config.timeout);
    SF.send(By.xpath('//input[@ng-model="newItem.pounds.value"]'), 100);
    SF.send(By.xpath('//input[@ng-model="newItem.count.value"]'), 2);
    SF.click(By.xpath('//button[@ng-click="customItemForm.$setSubmitted()"]'));
    MF.EditRequest_ClickSaveInventory();
    driver.wait(driver.findElement(By.xpath("(//div[@ng-show='!request.isInventory']/span)[1]")).getText().then(function (text){
        V.CubFitWithCustomItem = SF.cleanPrice (text);
        VD.IWant(VD.ToEqual,V.boardNumbersCubFit1+200, V.CubFitWithCustomItem, 'не совпал кубик фит в реквесте после того как мы добавили кастомный айтем');
    }),config.timeout);
    JS.step(JSstep.selectTruck((V.boardNumbers.LaborTimeMax + V.boardNumbers.TravelTime)/60));
    MF.WaitWhileBusy();
    MF.EditRequest_SetToNotConfirmed();
    MF.EditRequest_SaveChanges();
    MF.EditRequest_OpenLogs();
    SF.click(By.xpath('//span[@ng-show="!allLogsShow[allLogsIndex]"]'));
    SF.sleep(1);
    driver.wait(driver.findElement(By.xpath('//td[@ng-bind-html="enableStyle(block.template)"]//th[contains(text(), "Total items: ")]')).getText().then(function (text) {
        V.TotalItemsEmail = SF.cleanPrice(text.substring(text.indexOf(': '), text.indexOf(' Total Boxes: 0')));
        VD.IWant(VD.ToEqual, V.InventoryTotalRequest+2, V.TotalItemsEmail, 'не совпало количество айтемов в емейле с реквестом');
    }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//td[@ng-bind-html="enableStyle(block.template)"]//th[contains(text(), "Total Volume/Weight: ")]')).getText().then(function (text) {
        V.TotalCubicFitEmail = SF.cleanPrice(text.substring(text.indexOf(': '), text.indexOf('CuFt')));
        VD.IWant(VD.ToEqual, V.boardNumbersCubFit1+200, V.TotalCubicFitEmail, 'не совпал total cubiс  fit в емейле с реквестом');
    }),config.timeout);
    MF.EditRequest_OpenRequest();

condition.nowWeDoing = 'тут открываем в новой вкладке аккаунт и конфирмейшн с реквеста и проверяем там кубик фиты что все правильно потом проверяем тоже самое и в табличке нижней' +
        'и на конфирмейшине это проверяем';
    MF.EditRequest_OpenAccountPageInNewWindow();
    driver.wait(driver.findElement(By.xpath('//span[contains(text()," Total Estimated: ")]/span')).getText().then(function (text) {
        V.InvTotalAccountDownTableAfterAddCustomItem = SF.cleanPrice(text.substring(0, text.indexOf('c')));
        VD.IWant(VD.ToEqual, V.InvTotalAccountDownTableAfterAddCustomItem, V.boardNumbersCubFit1+200, 'не совпал тотал кубик фит с реквеста и на аккаунте в нижней табличке поссле кастомного айтема');
    }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//div[@class="row inventory-box"]//div[@class="col-md-8 total-right total-indicators"]/span[1]')).getText().then(function (text) {
        V.InvTotalItemsDownTableAfterAddCustomItem = SF.cleanPrice(text.replace('Total Items:', ''));
        VD.IWant(VD.ToEqual,V.InventoryTotalRequest+2, V.InvTotalItemsDownTableAfterAddCustomItem, 'не совпал тотал items с реквеста и на аккаунте в нижней табличке поссле кастомного айтема');
    }), config.timeout);
    driver.wait(driver.findElement(By.xpath('//span[@ng-if="vm.request.field_useweighttype.value == \'2\' && vm.request.inventory_weight.cfs"]')).getText().then(function(text){
        V.accountcbf = SF.cleanPrice(text.substring(text.indexOf('Inventory ')+9, text.indexOf('c.f.')));
        VD.IWant(VD.ToEqual, V.accountcbf, V.boardNumbersCubFit1+200, 'не совпал тотал кубик фит с реквеста и на аккаунте поссле кастомного айтема');
    }),config.timeout);
//    MF.Account_ClickProceedBookYourMove();
// добавить еще сюда проверки на конфирмейшине нижнюю табличку что все сходится.
    driver.close();
    SF.openTab(0);

condition.nowWeDoing = 'удаляем все аитемы, и проверяем что вес вернулся в дефолтный';
    MF.EditRequest_OpenInventoryTab();
    SF.sleep(2);
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


