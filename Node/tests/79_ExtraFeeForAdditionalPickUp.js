

module.exports = function main(SF, JS, MF, LF, JSstep, VD, V, By, until,FileDetector, system, condition, config,constants){
    global.fiber = Fiber.current;
    V.client = {};
    V.client.name = SF.randomBukva(6) + '_t';
    V.client.fam = SF.randomBukva(6) + '_t';
    V.client.phone = SF.randomCifra(10);
    V.client.email = SF.randomBukvaSmall(6) + '@' + SF.randomBukvaSmall(4) + '.tes';
    V.client.passwd = 123;
    SF.get(V.adminURL);
    LF.LoginToBoardAsAdmin();
    condition.nowWeDoing = 'Создаем Long Distance работу в админке и добавляем Extra pickup и Extra Drop off';
    LF.CreateLongDistanceFromBoard(V.client);
    SF.click(By.xpath('//i[@ng-click="request.extraPickup=true"]'));
    SF.sleep(1);
    V.extraPickUpAddress = SF.randomBukva(6) + '_t';
    V.extraDropOffAddress = SF.randomBukva(6) + '_t';
    SF.send(By.xpath('//input[@ng-model="request.field_extra_pickup.thoroughfare"]'),V.extraPickUpAddress);
    SF.send(By.xpath('//input[@ng-model="request.field_extra_pickup.postal_code"]'),V.client.zipFrom);
    SF.select(By.xpath('//select[@ng-change="changeRequestField(\'field_extra_pickup\')"]'),3);
    SF.sleep(2);

    SF.click(By.xpath('//i[@ng-click="request.extraDropoff=true"]'));
    SF.sleep(1);
    SF.send(By.xpath('//input[@ng-model="request.field_extra_dropoff.thoroughfare"]'),V.extraDropOffAddress);
    SF.send(By.xpath('//input[@ng-model="request.field_extra_dropoff.postal_code"]'),V.client.zipTo);
    SF.select(By.xpath('//select[@ng-change="changeRequestField(\'field_extra_dropoff\')"]'),3);
    SF.sleep(2);
    MF.EditRequest_SaveChanges();
    SF.click(By.xpath('//a[@ng-click="select(tabs[7])"]'));
    SF.waitForVisible(By.xpath('//button[@ng-click="goToRequest()"]'));
    SF.sleep(2);
    condition.nowWeDoing = 'Заходим на акаунт и проверяем Extra pickup и Extra Drop off';
    SF.click(By.xpath('//button[@ng-click="goToRequest()"]'));
    SF.openTab(1);
    SF.waitForVisible(By.xpath('//div[contains(text(), "Extra Drop off:")]/following-sibling::div'));
    driver.wait(driver.findElement(By.xpath('//div[contains(text(), "Extra Drop off:")]/following-sibling::div')).getText().then(function(text){
        V.extraDropOffPrice = SF.cleanPrice(text);
    }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//div[contains(text(), "Extra Pick up:")]/following-sibling::div')).getText().then(function(text){
        V.extraPickUpPrice = SF.cleanPrice(text);
    }),config.timeout);

    SF.endOfTest();
};
