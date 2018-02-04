module.exports = function main(SF, JS, MF, LF, JSstep, VD, V, By, until,FileDetector, system, condition, config,constants) {
    global.fiber = Fiber.current;
    V.client = {};
    V.client.name = SF.randomBukva(6) + '_t';
    V.client.fam = SF.randomBukva(6) + '_t';
    V.client.phone = SF.randomCifra(10);
    V.client.email = SF.randomBukvaSmall(6) + '@' + SF.randomBukvaSmall(4) + '.tes';


    SF.get(V.adminURL);

    condition.nowWeDoing = 'создаем рекевст с борда, добавляем еестра сервисы, вводим адрес, апт, и этаж. Зип не вводим';
    LF.LoginToBoardAsCustom(V.adminLogin,V.adminPassword);
    LF.CreateLocalMovingFromBoard(V.client);
    SF.click(By.xpath('//i[@ng-click="request.extraPickup=true"]'));
    SF.sleep(1);
    V.extraPickUpAddress = SF.randomBukva(6) + '_t';
    V.extraDropOffAddress = SF.randomBukva(6) + '_t';
    V.extraPickUpApt = 123;
    V.extraDropOffpApt = 321;
    SF.send(By.xpath('//input[@ng-model="request.field_extra_pickup.thoroughfare"]'),V.extraPickUpAddress);
    SF.send(By.xpath('//input[@ng-model="request.field_extra_pickup.postal_code"]'),'01101');
    SF.send(By.xpath('//input[@ng-model="request.field_extra_pickup.premise"]'), V.extraPickUpApt);
    SF.select(By.xpath('//select[@ng-change="changeRequestField(\'field_extra_pickup\')"]'),3);
    SF.sleep(2);
    SF.click(By.xpath('//i[@ng-click="request.extraDropoff=true"]'));
    SF.sleep(1);
    SF.send(By.xpath('//input[@ng-model="request.field_extra_dropoff.thoroughfare"]'),V.extraDropOffAddress);
    SF.send(By.xpath('//input[@ng-model="request.field_extra_dropoff.postal_code"]'),'02222');
    SF.send(By.xpath('//input[@ng-model="request.field_extra_dropoff.premise"]'), V.extraDropOffpApt);
    SF.select(By.xpath('//select[@ng-change="changeRequestField(\'field_extra_dropoff\')"]'),3);
    MF.EditRequest_SaveChanges();
    V.boardNumbers = {};
    LF.RememberDigitsRequestBoard(V.boardNumbers);
    LF.closeEditRequest();

    condition.nowWeDoing = 'заходим заново в реквест, и проверяем сохранились ли сервисы, меняем этажи';
    MF.Board_RefreshDashboard();
    MF.Board_OpenRequest (V.boardNumbers.Id);
    driver.wait(driver.findElement(By.xpath('//div//h4[contains(text(),"Extra Drop-off")]')).getText().then(function(text) {
        V.ExtraDropoff = text;
        VD.IWant(VD.ToEqual, V.ExtraDropoff, text,'нет сервиса экстра дропофф');
    }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//div//h4[contains(text(),"Extra Pickup")]')).getText().then(function(text) {
        V.ExtraPickU = text;
        VD.IWant(VD.ToEqual, V.ExtraPickU, text,'нет сервиса экстра пикап');
    }),config.timeout);
    SF.sleep(1);
    SF.select(By.xpath('//select[@ng-change="changeRequestField(\'field_extra_pickup\')"]'),2);
    SF.select(By.xpath('//select[@ng-change="changeRequestField(\'field_extra_dropoff\')"]'),2);
    MF.EditRequest_SaveChanges();
    V.boardNumbers = {};
    LF.RememberDigitsRequestBoard(V.boardNumbers);

    condition.nowWeDoing = 'идем в аккаунт, и на конфирмеишен от админа проверяем эналичие экстра сервисов ';
    MF.EditRequest_OpenSettings();
    MF.EditRequest_ClickViewRequest();
    SF.openTab(1);
    SF.sleep(15);
    driver.wait(driver.findElement(By.xpath('//div[contains(text(), "Extra Drop-off")]')).getText().then(function(text){
        V.extraDropOffAcc = text;
        VD.IWant(VD.ToEqual, V.extraDropOffAcc , V.extraDropOffAcc, 'нет ектра дроп офф на аккаунте');
    }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//div[contains(text(), "Extra Pickup:")]')).getText().then(function(text){
        V.extraPickUpAcc = text;
        VD.IWant(VD.ToEqual, (V.ExtraPickU  + ':'), text, 'нет екстра пик ап на аккаунте');
    }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//div[@ng-if="extraPickup"]//div[contains(text(), "Stairs - 2nd Floor")]')).getText().then(function(text){
        V.extraPickNewStairs = text;
        VD.IWant(VD.ToEqual, V.extraPickNewStairs, 'Stairs - 2nd Floor', 'не совпали этажи с админкой и аккаунтом пикап ');
    }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//div[@ng-if="extraPickup"]//div[contains(text(), "Stairs - 2nd Floor")]')).getText().then(function(text){
        V.extraDropOffNewStairs = text;
        VD.IWant(VD.ToEqual, V.extraDropOffNewStairs, 'Stairs - 2nd Floor', 'не совпали этажи с админкой и аккаунтом дропоф');
    }),config.timeout);
    SF.sleep(1);
    driver.close();
    SF.openTab(0);
    SF.waitForLocated(By.xpath('//button[@ng-click="goToConfirmation()"]'));
    SF.click (By.xpath('//button[@ng-click="goToConfirmation()"]'));
    SF.openTab(1);
    SF.sleep(12);
    driver.wait(driver.findElement(By.xpath('//div[contains(text(), "Extra Drop-off")]')).getText().then(function(text){
        V.extraDropOffConf = text;
        VD.IWant(VD.ToEqual, V.extraDropOffAcc , text, 'нет ектра дроп офф на конфирмеишен');
    }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//div[contains(text(), "Extra Pickup:")]')).getText().then(function(text){
        V.extraPickUpConf = text;
        VD.IWant(VD.ToEqual, (V.ExtraPickU  + ':'), text, 'нет екстра дроп оф на конфирмеишен');
    }),config.timeout);
    SF.sleep(2);

    SF.endOfTest();
};