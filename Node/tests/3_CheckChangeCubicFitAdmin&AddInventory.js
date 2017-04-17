module.exports = function main(SF, JS, JSstep, VD, V, By, until,FileDetector, system, condition, LF,config,constants){
    global.fiber = Fiber.current;
    V.client = {};
    V.client.name = SF.randomBukva(6) + '_t';
    V.client.fam = SF.randomBukva(6) + '_t';
    V.client.phone = SF.randomCifra(10);
    V.client.email = SF.randomBukvaSmall(6) + '@' + SF.randomBukvaSmall(4) + '.tes';

    SF.get(V.adminURL);

    SF.send(By.id('email'), 'TestAdmin');
    SF.send(By.id('password'), 'test');
    JS.click('.btn-primary');

    LF.CreateLocalMovingFromBoard(V.client);

    driver.findElement(By.xpath("(//div[@ng-show='!request.isInventory']/span)[1]")).getText().then(function (text){
        V.boardNumbersCubFit = SF.cleanPrice (text);

    });
    SF.click(By.xpath('//ul[@class="chosen-choices"]'));
    SF.click(By.xpath('//ul[@class="chosen-results"]/li[@data-option-array-index="4"]'));
    SF.click(By.xpath('//ul[@class="chosen-choices"]'));
    SF.click(By.xpath('//ul[@class="chosen-results"]/li[@data-option-array-index="5"]'));
    SF.click(By.xpath('//ul[@class="chosen-choices"]'));
    SF.click(By.xpath('//ul[@class="chosen-results"]/li[@data-option-array-index="6"]'));
    SF.sleep (2);

    driver.findElement(By.xpath("(//div[@ng-show='!request.isInventory']/span)[1]")).getText().then(function (text){
        V.boardNumbersCubFitChange = SF.cleanPrice (text);
    });
    SF.sleep (0.5);
    VD.IWant(VD.VNotToEqual, V.boardNumbersCubFit, V.boardNumbersCubFitChange, 'Кубик фит не изменился, хотя должен был');
    SF.sleep (2);

///////////////////////////
    V.boardNumbersCubFit = {};
    V.boardNumbersCubFitChange = {};
    driver.findElement(By.xpath("(//div[@ng-show='!request.isInventory']/span)[1]")).getText().then(function (text){
        V.boardNumbersCubFit = SF.cleanPrice (text);
    });
condition.nowWeDoing = 'выключили калькулятор';
    SF.click(By.xpath('//div[@class="actions pull-right"]/span[@ng-click="switchCalc()"]')); //выключили калькулятор
    SF.click(By.xpath('//ul[@class="chosen-choices"]'));
    SF.click(By.xpath('//ul[@class="chosen-results"]/li[@data-option-array-index="2"]'));
    SF.click(By.xpath('//ul[@class="chosen-choices"]'));
    SF.click(By.xpath('//ul[@class="chosen-results"]/li[@data-option-array-index="7"]'));
    SF.sleep (2);

    driver.findElement(By.xpath("(//div[@ng-show='!request.isInventory']/span)[1]")).getText().then(function (text){
        V.boardNumbersCubFitChange = SF.cleanPrice (text);
    });
    SF.sleep (2);
    VD.IWant(VD.VNotToEqual, V.boardNumbersCubFit, V.boardNumbersCubFitChange, 'Кубик фит не изменился, хотя должен был');
    condition.nowWeDoing = 'включили калькулятор';
    SF.click(By.xpath('//div[@class="actions pull-right"]/span[@ng-click="switchCalc()"]')); // включили калькулятор
//выбор инвентория
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
    driver.findElement(By.xpath('//div[@ng-if="calcTotals.cfs > 0 && !isMobile"]')).getText().then(function(text) {
        V.InventoryCubicFit = SF.cleanPrice (text.replace ('Total Estimated Cubic Feet: ', ''));
        });

    SF.click(By.id("save-inventory"));
    SF.sleep (3);
    driver.findElement(By.xpath("(//div[@ng-show='!request.isInventory']/span)[1]")).getText().then(function (text){
        V.boardNumbersCubFit = SF.cleanPrice (text);
    });
    SF.sleep (3);
    VD.IWant (VD.VToEqual, V.InventoryCubicFit, V.boardNumbersCubFit, 'Кубик фит не совпадает с инвенторием, а должен');

    SF.endOfTest();
};
