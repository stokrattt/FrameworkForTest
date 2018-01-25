module.exports = function main(SF, JS, MF, LF, JSstep, VD, V, By, until,FileDetector, system, condition, config,constants) {
    global.fiber = Fiber.current;
    V.client = {};
    V.client.name = SF.randomBukva(6) + '_t';
    V.client.fam = SF.randomBukva(6) + '_t';
    V.client.phone = SF.randomCifra(10);
    V.client.email = SF.randomBukvaSmall(6) + '@' + SF.randomBukvaSmall(4) + '.tes';
    V.extraPickUpAddress = SF.randomBukva(4);
    V.extraDropOffAddress = SF.randomBukva(4);


    SF.get(V.adminURL);

    condition.nowWeDoing = 'создаем рекевст с борда, добавляем еестра сервисы, вводим адрес, апт, и этаж. Зип не вводим';
    LF.LoginToBoardAsCustom(V.adminLogin,V.adminPassword);
    LF.CreateLocalMovingFromBoard(V.client);
    SF.click(By.xpath('//i[@ng-click="request.extraPickup=true"]'));
    SF.sleep(1);
    SF.send(By.xpath('//input[@ng-model="request.field_extra_pickup.thoroughfare"]'),V.extraPickUpAddress);
    SF.click(By.xpath('//input[@id="edit-moving-from-apt"]'));
    SF.send(By.xpath('//input[@id="edit-moving-from-apt"]'),12);
    SF.select(By.xpath('//select[@ng-change="changeRequestField(\'field_extra_pickup\')"]'),3);
    SF.click(By.xpath('//i[@ng-click="request.extraDropoff=true"]'));
    SF.sleep(1);
    SF.send(By.xpath('//input[@ng-model="request.field_extra_dropoff.thoroughfare"]'),V.extraDropOffAddress);
    SF.send(By.xpath('//input[@ng-model="request.field_extra_dropoff.premise"]'), 21);
    SF.select(By.xpath('//select[@ng-change="changeRequestField(\'field_extra_dropoff\')"]'),3);
    MF.EditRequest_SaveChanges();
    V.boardNumbers = {};
    LF.RememberDigitsRequestBoard(V.boardNumbers);
    LF.closeEditRequest();

    condition.nowWeDoing = 'заходим заново в реквест, и проверяем сохранились ли сервисы';
    MF.Board_RefreshDashboard();
    MF.Board_OpenRequest (V.boardNumbers.Id);
    driver.wait(driver.findElement(By.xpath('//div//h4[contains(text(),"Extra Drop-off")]')).getText().then(function(text) {
        V.ExtraDropoff = text;
        VD.IWant(VD.ToEqual, V.ExtraDropoff, text,'нет сервиса экстра дропофф');
    }),config.timeout);
    SF.sleep(1);
    driver.wait(driver.findElement(By.xpath('//div//h4[contains(text(),"Extra Pickup")]')).getText().then(function(text) {
        V.ExtraPickUp = SF.cleanPrice(text);
        VD.IWant(VD.ToEqual, V.ExtraPickUp, text,'нет сервиса экстра прикап');
    }),config.timeout);
    SF.sleep(1);


    condition.nowWeDoing = 'идем в аккаунт, и на конфирмеишен от админа проверяем экстра';
    //MF.EditRequest_OpenSettings();
    //MF.EditRequest_ClickViewRequest();
    //SF.sleep(10);
   // SF.openTab(1);
  //  SF.sleep(2);
  //  driver.close();
   // SF.openTab(0);
   // SF.waitForLocated(By.xpath('//button[@ng-click="goToConfirmation()"]'));
   // SF.click (By.xpath('//button[@ng-click="goToConfirmation()"]'));
   // SF.openTab(1);
   // SF.sleep(2);



    SF.endOfTest();
};