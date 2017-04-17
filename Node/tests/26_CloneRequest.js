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
    JS.waitForNotExist ('div.busyoverlay:visible');

condition.nowWeDoing = 'создаем реквест и добавляем разного';

    LF.CreateLocalMovingFromBoard (V.client);
    SF.sleep (2);
    driver.wait(driver.findElement(By.xpath('//a[@ng-click="select(tabs[0])"]')).getText().then(function(text){
        V.request.Id = SF.cleanPrice(text);
        LF.addToCleanerJob(V.request.Id);
    }),config.timeout);

    SF.click(By.xpath('//ul[@class="chosen-choices"]'));
    SF.click(By.xpath('//ul[@class="chosen-results"]/li[@data-option-array-index="4"]'));
    SF.click(By.xpath('//ul[@class="chosen-choices"]'));
    SF.click(By.xpath('//ul[@class="chosen-results"]/li[@data-option-array-index="5"]'));
    SF.click(By.xpath('//ul[@class="chosen-choices"]'));
    SF.click(By.xpath('//ul[@class="chosen-results"]/li[@data-option-array-index="6"]'));
    SF.sleep (2);
    SF.click(By.xpath('//ul[@class="nav nav-tabs"]//a[@ng-click="select(tabs[1])"]'));
    JS.waitForExist('div.busyoverlay');
condition.nowWeDoing = 'ждем инвентория';
    SF.sleep (7);
    SF.click (By.xpath('//div[@ng-if="!myInventory.opened && !searchText && currentFilter"]//div[@ng-if="!showAdd"]/descendant::button[1]'));
    SF.click (By.xpath('//div[@ng-if="!myInventory.opened && !searchText && currentFilter"]//div[@ng-if="!showAdd"]/descendant::button[1]'));
    SF.click (By.xpath('//div[@ng-if="!myInventory.opened && !searchText && currentFilter"]//div[@ng-if="!showAdd"]/descendant::button[1]'));
    SF.click (By.xpath('//div[@ng-if="!myInventory.opened && !searchText && currentFilter"]//div[@ng-if="!showAdd"]/descendant::button[1]'));
    SF.click (By.xpath('//div[@ng-if="!myInventory.opened && !searchText && currentFilter"]//div[@ng-if="!showAdd"]/descendant::button[1]'));
    SF.click (By.xpath('//div[@ng-if="!myInventory.opened && !searchText && currentFilter"]//div[@ng-if="!showAdd"]/descendant::button[1]'));
    SF.click (By.xpath('//div[@ng-if="!myInventory.opened && !searchText && currentFilter"]//div[@ng-if="!showAdd"]/descendant::button[1]'));
    SF.click(By.id("save-inventory"));
    SF.sleep (4);
    SF.click (By.xpath('//select[@id="edit-size-move"]/option[9]'));

    SF.send (By.id('edit-moving-from'), 'From Addres');
    SF.send (By.xpath('//input[@ng-model="request.field_moving_to.thoroughfare"]'), 'To Addres');
    V.boardNumbers = {};
    LF.RememberDigitsRequestBoard(V.boardNumbers);
    JS.step(JSstep.selectTruck((V.boardNumbers.LaborTimeMax + V.boardNumbers.TravelTime)/60));
    JS.select ('#edit-status', 2); // выбор статуса конфермед
    driver.wait(driver.findElement(By.xpath("(//div[@ng-show='!request.isInventory']/span)[1]")).getText().then(function (text){
        V.boardNumbersCubFit = SF.cleanPrice (text);
    }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//select[@id="edit-size-move"]')).getAttribute("value").then(function (text){
        V.sizemove = (text);
    }),config.timeout);
    JS.click ("button[ng-click=\\\"UpdateRequest()\\\"]");
    SF.waitForVisible (By.xpath('//button[@ng-click="update(request)"]'));
    SF.click (By.xpath('//button[@ng-click="update(request)"]'));
    SF.sleep (2);
    JS.waitForNotExist ('div.busyoverlay:visible');
    JS.waitForNotExist('div.toast-success');
condition.nowWeDoing = 'идём в настройки клонировать реквест';
    SF.click(By.xpath('//a[@ng-click="select(tabs[7])"]'));
    SF.sleep(2);
    SF.click(By.xpath('//button[@ng-click="cloneRequest(request)"]'));
    SF.waitForVisible (By.xpath('//div[@class="sweet-alert showSweetAlert visible"]'));
    SF.click (By.xpath('//button[@class="confirm"]'));
    JS.waitForNotExist('div.busyoverlay:visible');
    JS.waitForNotExist('div.busy:visible');
    SF.sleep (20);

    SF.waitForLocated (By.xpath('//div[contains(@class,"requestModal status_1")]//a[@ng-click="select(tabs[0])"]'));
    driver.wait(driver.findElement(By.xpath('//div[contains(@class,"requestModal status_1")]//a[@ng-click="select(tabs[0])"]')).getText().then(function(text){
        V.IdClone = SF.cleanPrice(text);
        LF.addToCleanerJob(V.IdClone);
        console.log(V.IdClone);
    }),config.timeout);

    SF.click(By.xpath('//div[contains(@class,"requestModal status_1")]//button[@ng-click="cancel()"]'));
    SF.sleep (2);
    LF.closeEditRequest ();
condition.nowWeDoing = 'проверяем что клон в пендинге и открываем его';
    SF.click(By.xpath('//i[@ng-click="vm.refreshDashboard();"]'));
    SF.sleep (4);
    LF.OpenRequest (V.IdClone);
    SF.sleep (2);
    SF.click(By.xpath('//ul[@class="nav nav-tabs"]//a[@ng-click="select(tabs[1])"]'));
    JS.waitForExist('div.busyoverlay');
condition.nowWeDoing = 'ждем и добавляем инвентория';
    SF.sleep (6);
    SF.click (By.xpath('//button[@ng-click="changeValue(1, item)"]'));
    SF.click (By.xpath('//button[@ng-click="changeValue(1, item)"]'));
    SF.click (By.xpath('//button[@ng-click="changeValue(1, item)"]'));
    SF.click (By.xpath('//button[@ng-click="changeValue(1, item)"]'));
    SF.click (By.xpath('//button[@ng-click="changeValue(1, item)"]'));
    SF.click (By.xpath('//button[@ng-click="changeValue(1, item)"]'));
    SF.click (By.xpath('//button[@ng-click="changeValue(1, item)"]'));
    SF.click(By.id("save-inventory"));
    SF.sleep (5);
    SF.click (By.xpath('//select[@id="edit-size-move"]/option[6]'));
    SF.clear (By.id('edit-moving-from'));
    SF.send (By.id('edit-moving-from'), 'From Addres Clone');
    SF.clear (By.xpath('//input[@ng-model="request.field_moving_to.thoroughfare"]'));
    SF.send (By.xpath('//input[@ng-model="request.field_moving_to.thoroughfare"]'), 'To Addres Clone');
    driver.wait(driver.findElement(By.xpath("(//div[@ng-show='!request.isInventory']/span)[1]")).getText().then(function (text){
        V.boardNumbersCubFitClone = SF.cleanPrice (text);
    }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//select[@id="edit-size-move"]')).getAttribute("value").then(function (text){
        V.sizemoveClone = (text);
    }),config.timeout);
    V.boardNumbersClone = {};
    LF.RememberDigitsRequestBoard(V.boardNumbersClone);
    SF.click(By.xpath('//div[@ng-model="request.inventory.move_details.admincomments"]//div[@ng-model="html"]'));
    SF.clear(By.xpath('//div[@ng-model="request.inventory.move_details.admincomments"]//div[@ng-model="html"]'));
    V.note = SF.randomBukva(7);
    SF.send(By.xpath('//div[@ng-model="request.inventory.move_details.admincomments"]//div[@ng-model="html"]'), V.note);
    JS.click ("button[ng-click=\\\"UpdateRequest()\\\"]");
    SF.waitForVisible (By.xpath('//button[@ng-click="update(request)"]'));
    SF.click (By.xpath('//button[@ng-click="update(request)"]'));
    SF.sleep (2);
    JS.waitForNotExist ('div.busyoverlay:visible');
    JS.waitForNotExist('div.toast-success');
    LF.closeEditRequest ();
condition.nowWeDoing = 'идем открывать первый реквест и проверять что клон не затер данные первого';
    SF.click(By.xpath('//div[@ng-click="vm.select(3)"]'));
    LF.OpenRequest (V.request.Id);
    VD.IWant (VD.VNotToEqual, V.boardNumbersCubFit, V.boardNumbersCubFitClone, 'клон затер cubic fit первого реквеста');
    VD.IWant (VD.VNotToEqual, V.sizemove, V.sizemoveClone, 'клон затер sizemove первого реквеста');
    driver.wait(driver.findElement(By.id('edit-moving-from')).getText().then(function (text){
        VD.IWant (VD.VNotToEqual, text, 'From Addres Clone', 'клон затер adress from первого реквеста');
    }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//input[@ng-model="request.field_moving_to.thoroughfare"]')).getText().then(function (text){
        VD.IWant (VD.VNotToEqual, text, 'To Addres Clone', 'клон затер adress to первого реквеста');
    }),config.timeout);
    VD.IWant(VD.VNotToEqual, V.boardNumbers.QuoteMin, V.boardNumbersClone.QuoteMin, 'совпали QuoteMin первого реквеста и клона, хотя не должно было');
    VD.IWant(VD.VNotToEqual, V.boardNumbers.QuoteMax, V.boardNumbersClone.QuoteMax, 'совпали QuoteMax первого реквеста и клона, хотя не должно было');
    VD.IWant(VD.VNotToEqual, V.boardNumbers.TotalMin, V.boardNumbersClone.TotalMin, 'совпали TotalMin первого реквеста и клона, хотя не должно было');
    VD.IWant(VD.VNotToEqual, V.boardNumbers.TotalMax, V.boardNumbersClone.TotalMax, 'совпали TotalMax первого реквеста и клона, хотя не должно было');
    VD.IWant(VD.VNotToEqual, V.boardNumbers.Fuel, V.boardNumbersClone.Fuel, 'совпали Fuel первого реквеста и клона, хотя не должно было');
    LF.closeEditRequest ();
    LF.LogoutFromBoardAdmin ();

    //=========================закончили писать тест=============================
    SF.endOfTest();
};
