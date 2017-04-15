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

    LF.CreateLocalMovingFromBoard ();
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
    SF.sleep (10);


    driver.switchTo().window();
    driver.getWindowHandle();

   f = function  (){modals = driver.wait(driver.executeScript('$("div.requestModal")'.then (function (asd) {
        V.zIndexBig = asd;
        var maxz=0;
        var curz;
        for (var i = 0; i<modals.length; i++){
            curz = getComputedStyle(modals[i]).zIndex;
            if (curz>maxz) {maxz=curz;}
        }
        return maxz;
   })))};


    console.log(V.zIndexBig);

    //  вот эта функция возвращает самый большой z-index из открытых модалок

 //   сунь её в executeScript, потом полученный индекс вставь в xpath типа:
   //     '//div[contains(@class,"requestModal")][contains(@style,"'+zIndexFromScript+'")]//и дальше нужный элемент активной модалки'

    driver.wait(driver.findElement(By.xpath('//div[contains(@class,"requestModal")][contains(@style,"'+V.zIndexBig+'")]//a[@ng-click="select(tabs[0])"]')).getText().then(function(text){
        V.IdClone = SF.cleanPrice(text);
        LF.addToCleanerJob(V.IdClone);
        console.log(V.IdClone);
    }),config.timeout);


    Debug.pause();


    //=========================закончили писать тест=============================
    SF.endOfTest();
};
