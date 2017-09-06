module.exports = function main(SF, JS, MF, LF, JSstep, VD, V, By, until,FileDetector, system, condition, config,constants) {
    global.fiber = Fiber.current;
    V.client = {};
    V.client.name = SF.randomBukva(6) + '_t';
    V.client.fam = SF.randomBukva(6) + '_t';
    V.client.phone = SF.randomCifra(10);
    V.client.email = SF.randomBukvaSmall(6) + '@' + SF.randomBukvaSmall(4) + '.tes';
    V.client.passwd = 123;
    V.client.zipFrom = '02222';
    V.client.zipTo = '75320';

    //=========================начинаем писать тест=============================

    SF.get(V.adminURL);
    LF.LoginToBoardAsCustom(V.adminLogin,  V.adminPassword);
    condition.nowWeDoing = 'Заходим в админку идем в Настройики лонг дистанса и виставляем min Price min Cubic fee и State rate для штата';
    MF.Board_OpenSettingsGeneral();
    MF.Board_OpenSettingsLongDistance ();
    SF.click(By.id('jqvmap1_tx'));
    SF.sleep(2);
    driver.wait(driver.executeScript("if($('input[ng-model=\"vm.longdistance.stateRates[vm.longdistance.basedState][vm.stateCode].minPriceEnabled\"]').hasClass('ng-not-empty')){" +
        "return true;}else{$('input[ng-model=\"vm.longdistance.stateRates[vm.longdistance.basedState][vm.stateCode].minPriceEnabled\"]').click()}"),config.timeout);
    SF.sleep(0.5);
    JS.waitForExist('input[ng-model="vm.longdistance.stateRates[vm.longdistance.basedState][vm.stateCode].minPrice"]:visible');
    V.minCF = 100;
    V.minPrice = 50;
    V.stateRate = 15;
    SF.clear(By.xpath('//input[@ng-model="vm.longdistance.stateRates[vm.longdistance.basedState][vm.stateCode].min_weight"]'));
    SF.send(By.xpath('//input[@ng-model="vm.longdistance.stateRates[vm.longdistance.basedState][vm.stateCode].min_weight"]'), V.minCF);
    SF.clear(By.xpath('//input[@ng-model="vm.longdistance.stateRates[vm.longdistance.basedState][vm.stateCode].minPrice"]'));
    SF.send(By.xpath('//input[@ng-model="vm.longdistance.stateRates[vm.longdistance.basedState][vm.stateCode].minPrice"]'), V.minPrice);
    SF.clear(By.xpath('//input[@ng-model="vm.longdistance.stateRates[vm.longdistance.basedState][vm.stateCode].state_rate"]'));
    SF.send(By.xpath('//input[@ng-model="vm.longdistance.stateRates[vm.longdistance.basedState][vm.stateCode].state_rate"]'), V.stateRate);
    SF.click(By.xpath('//input[@ng-model="search"]'));
    SF.sleep(3);
    Debug.pause();
    condition.nowWeDoing = 'Создаем ЛД работу и проверям min Price min Cubic fee и State rate а также Гранд Тотал';
    LF.CreateLongDistanceFromBoard(V.client);
    driver.wait(driver.findElement(By.xpath('//input[@ng-model="request.field_long_distance_rate.value"]')).getAttribute('value').then(function(text){
        VD.IWant(VD.ToEqual, V.stateRate, text, 'не совпали State rate');
    }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//div[@ng-show="!request.isInventory"]')).getText().then(function(text){
        V.CF = SF.cleanPrice(text);
    }),config.timeout);
    SF.sleep(1);
    V.cubicFee =  V.CF - V.minCF;
    V.modalQuote = V.cubicFee * V.stateRate +  V.minPrice;
    V.boardNumbers = {};
    LF.RememberDigitsRequestBoard_Down(V.boardNumbers);
    VD.IWant(VD.ToEqual, V.modalQuote, V.boardNumbers.Quote, 'не совпали Quote');
    V.grandTotal = V.modalQuote + V.boardNumbers.Fuel;
    VD.IWant(VD.ToEqual, V.grandTotal, V.boardNumbers.Total, 'не совпали Grand Total 1');
    condition.nowWeDoing = 'Первий раз проверям логи';
    MF.EditRequest_OpenLogs();
    SF.click(By.xpath('//span[@ng-show="!allLogsShow[allLogsIndex]"]'));
    SF.sleep(1);
    driver.wait(driver.findElement(By.xpath('//h3[contains(text(), "Estimated Quote")]/../../../../../../following-sibling::td//div/p')).getText().then(function(text){
        V.cleanGrandTotal = SF.cleanPrice(text);
        VD.IWant(VD.ToEqual, V.cleanGrandTotal, V.grandTotal, 'не совпали Grand Total 2');
    }),config.timeout);
    condition.nowWeDoing = 'Меняем в реквесте min Price min Cubic fee и State rate и снова проверям гранд тотал';
    SF.click(By.xpath('//a[@ng-click="select(tabs[0])"]'));
    SF.sleep(2);
    JS.waitForNotExist('div.busyoverlay:visible');
    V.newMinCF = 50;
    V.newMinPrice = 40;
    V.newStateRate = 10;
    SF.clear(By.xpath('//input[@ng-model="request.field_long_distance_rate.value"]'));
    SF.send(By.xpath('//input[@ng-model="request.field_long_distance_rate.value"]'), V.newStateRate);
    SF.sleep(1);

    SF.click(By.xpath('//div[@ng-click="openMinWeight()"]'));
    SF.waitForVisible(By.xpath('//input[@ng-model="min_price"]'));
    driver.wait(driver.findElement(By.xpath('//input[@ng-model="min_price"]')).getAttribute('value').then(function(text){
        VD.IWant(VD.ToEqual, V.minPrice, text, 'не совпали min price');
    }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//input[@ng-model="min_weight"]')).getAttribute('value').then(function(text){
        VD.IWant(VD.ToEqual, V.minCF, text, 'не совпали min CF');
    }),config.timeout);

    SF.clear(By.xpath('//input[@ng-model="min_price"]'));
    SF.send(By.xpath('//input[@ng-model="min_price"]'), V.newMinPrice);
    SF.clear(By.xpath('//input[@ng-model="min_weight"]'));
    SF.send(By.xpath('//input[@ng-model="min_weight"]'), V.newMinCF);

    SF.click(By.xpath('//button[@ng-click="Apply()"]'));
    SF.sleep(2);

    V.newCubicFee =  V.CF - V.newMinCF;
    V.newModalQuote = V.newCubicFee * V.newStateRate +  V.newMinPrice;
    V.boardNumbers = {};
    SF.sleep(2);
    LF.RememberDigitsRequestBoard_Down(V.boardNumbers);
    VD.IWant(VD.ToEqual, V.newModalQuote, V.boardNumbers.Quote, 'не совпали Quote');
    V.newGrandTotal = V.newModalQuote + V.boardNumbers.Fuel;
    VD.IWant(VD.ToEqual, V.newGrandTotal, V.boardNumbers.Total, 'не совпали Grand Total 3');
    MF.EditRequest_OpenLogs();
    condition.nowWeDoing = 'Второй раз проверям логи';
    driver.wait(driver.findElement(By.xpath('//span[contains(text(), "Minimum Volume was changed")]/../../following-sibling::span//span[contains(text(), "'+ V.newMinCF +'c.f.")]')).getText().then(function(text){
    }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//span[contains(text(), "Minimum Price was changed")]/../../following-sibling::span//span[contains(text(), "$'+ V.newMinPrice +'")]')).getText().then(function(text){
    }),config.timeout);

    SF.endOfTest();
};