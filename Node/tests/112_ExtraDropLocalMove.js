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
    V.extraPickUpAddress = SF.randomBukva(6) + '_t';
    V.extraDropOffAddress = SF.randomBukva(6) + '_t';
    V.extraPickUpApt = 123;
    V.extraDropOffpApt = 321;
    MF.EditRequest_AddExtraPickUpZip('01101');
    MF.EditRequest_SetExtraPickUpAdress(V.extraPickUpAddress);
    MF.EditRequest_SetExtraPickUpApt(V.extraPickUpApt);
    MF.EditRequest_SetExtraPickUpStairs(3);
    MF.EditRequest_AddExtraDropOffZip('02222');
    MF.EditRequest_SetExtraDropOffAdress(V.extraDropOffAddress);
    MF.EditRequest_SetExtraDropOffApt(V.extraDropOffpApt);
    MF.EditRequest_SetExtraDropOffStairs(3);
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
    MF.EditRequest_SetExtraPickUpStairs(2);
    MF.EditRequest_SetExtraDropOffStairs(2);
    MF.EditRequest_SaveChanges();
    V.boardNumbers = {};
    LF.RememberDigitsRequestBoard(V.boardNumbers);

condition.nowWeDoing = 'идем в аккаунт, и на конфирмеишен от админа проверяем эналичие экстра сервисов ';
    MF.EditRequest_OpenSettings();
    MF.EditRequest_ClickViewRequest();
    SF.openTab(1);
    MF.Account_WaitForLoadingAccount();
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
    driver.close();
    SF.openTab(0);
    SF.waitForLocated(By.xpath('//button[@ng-click="goToConfirmation()"]'));
    SF.click (By.xpath('//button[@ng-click="goToConfirmation()"]'));
    SF.openTab(1);
    SF.waitForVisible(By.xpath('//font[contains(text(),"CONFIRMATION PAGE")]'));
    driver.wait(driver.findElement(By.xpath('//div[contains(text(), "Extra Drop-off")]')).getText().then(function(text){
        V.extraDropOffConf = text;
        VD.IWant(VD.ToEqual, V.extraDropOffAcc , text, 'нет ектра дроп офф на конфирмеишен');
    }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//div[contains(text(), "Extra Pickup:")]')).getText().then(function(text){
        V.extraPickUpConf = text;
        VD.IWant(VD.ToEqual, (V.ExtraPickU  + ':'), text, 'нет екстра дроп оф на конфирмеишен');
    }),config.timeout);
    SF.sleep(1);
    SF.endOfTest();
};