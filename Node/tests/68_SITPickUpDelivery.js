
module.exports = function main(SF, JS, MF, LF, JSstep, VD, V, By, until,FileDetector, system, condition, config,constants) {
    global.fiber = Fiber.current;
    V.client = {};
    V.client.name = SF.randomBukva(6) + '_t';
    V.client.fam = SF.randomBukva(6) + '_t';
    V.client.phone = SF.randomCifra(10);
    V.client.email = SF.randomBukvaSmall(6) + '@' + SF.randomBukvaSmall(4) + '.tes';
    V.client.passwd = 123;
    V.client.zipFrom = '02222';
    V.client.zipTo = '32132';

    //=========================начинаем писать тест=============================
    SF.get(V.adminURL);
    LF.LoginToBoardAs_Roma4ke_Admin ();

    condition.nowWeDoing = 'Создаем Long Distance работу';
    LF.CreateLongDistanceFromBoard(V.client);
    MF.EditRequest_SetToConfirmed();
    SF.select(By.xpath('//select[@id="edit-service"]'), 7);
    SF.sleep(1);

    condition.nowWeDoing = 'Закриваем роботу заходим в СІТ и заполняем поля';
    JS.step(JSstep.selectTruck(5));
    V.perCubicFeet = '5';
    SF.clear(By.xpath('//input[@ng-model="request.field_long_distance_rate.value"]'));
    SF.send(By.xpath('//input[@ng-model="request.field_long_distance_rate.value"]'), V.perCubicFeet);
    MF.EditRequest_SetAdressToFrom();
    MF.EditRequest_SaveChanges();
    SF.waitForVisible(By.xpath('//div[@ng-click="chooseTruck(tid)"]'))
    SF.click(By.xpath('//div[@ng-click="changeSalesClosingTab(\'closing\')"]'));
    SF.sleep(2);
    SF.click(By.xpath('//a[@ng-click="openSendRequestToSITModal()"]'));
    MF.WaitWhileBusy();
    SF.click(By.xpath('//select[@ng-model="sit.storage_id"]'));
    SF.click(By.xpath('//option[text()="test"]'));
    V.SITRooms = 1;
    SF.clear(By.xpath('//input[@ng-model="sit.rooms"]'));
    SF.send(By.xpath('//input[@ng-model="sit.rooms"]'), V.SITRooms);

    SF.send(By.xpath('//input[@ng-model="moveInDate"]'),SF.dateToStringMMMDDYYYY(V.request.moveDate));

    SF.click(By.xpath('//a[@ng-click="save()"]'));
    SF.sleep(2);
    SF.click(By.xpath('//button[@ng-click="UpdateRequestInvoice()"]'));
    JS.waitForExist('button[ng-click="update(request)"]:visible');
    SF.sleep(2);
    SF.click(By.xpath('//button[@ng-click="update(request)"]'));
    JS.waitForExist("div.toast-success:visible");
    LF.closeEditRequest ();

    condition.nowWeDoing = 'Заходим в Jobs in SIT Проверям есть ли ета робота и совпали ли Storage NAme';
    MF.Board_OpenSideBar();
    SF.sleep(2);
    MF.Board_OpenJobsInSIT();
    MF.Board_OpenSideBar();

    driver.wait(driver.findElement(By.xpath('//div[contains(text(),"'+ V.client.name +'")]/..//div[4]')).getText().then(function(text){
        V.storageName = text;
        VD.IWant(VD.ToEqual, V.storageName, 'test', 'Starage Name не совпали');
    }),config.timeout);

    condition.nowWeDoing = 'Заходим в реквест , виставляем Delivery day и Schedule day и LD status';
    SF.click(By.xpath('//div[contains(text(), "'+ V.client.name +'")]/..//div[@ng-click="openRequest(id)"]'));
    SF.waitForVisible(By.xpath('//div[@ng-click="chooseTruck(tid)"]'));
    MF.WaitWhileBusy();
    SF.sleep(2);
    MF.WaitWhileBusy();
    SF.click(By.xpath('//a[@ng-click="select(tabs[2])"]'));
    MF.WaitWhileBusy();
    SF.click(By.xpath('//input[@ng-model="delivery_disable"]'));
    SF.sleep(2);
    SF.click(By.xpath('//input[@ng-model="details.delivery"]'));
    driver.wait(driver.executeScript(JSstep.Click4DaysCalendar),config.timeout);
    SF.sleep(2);
    SF.click(By.xpath('//button[@ng-click="saveDetails()"]'));
    SF.send(By.xpath('//input[@ng-model="scheduleDeliveryDate"]'),SF.dateToStringMMMMDDYYYY(V.request.moveDate));
    SF.select(By.xpath('//select[@ng-model="request.ld_status"]'), 1);

    LF.closeEditRequest ();
    condition.nowWeDoing = 'Заходим в PickUp и проверям по филтрам и по введенним даним';
    MF.Board_OpenSideBar();
    SF.click(By.xpath('//a[@ng-click="vm.goToPage(\'lddispatch.trip\', \'\')"]'));
    SF.sleep(2);
    MF.Board_OpenPickup();
    MF.Board_OpenSideBar();
    SF.sleep(2);
    SF.click(By.xpath('//md-select[@ng-model="selectedStatus"]'));
    SF.sleep(1);
    SF.click(By.xpath('//md-option[@ng-repeat="item in ldStatuses"]/div[text()="LD"]'));
    SF.click(By.xpath('//div[@ng-click="openModalFrom()"]'));
    SF.sleep(2);
    SF.click(By.xpath('//div[text()="MA - Massachusetts"]'));
    SF.sleep(2);
    SF.click(By.xpath('//button[@ng-click="closeModal()"]'));
    SF.sleep(5);

    driver.wait(driver.findElement(By.xpath('//div[contains(text(),"'+ V.client.name +'")]/..//div[9]')).getText().then(function(text){
        V.readyForDelivery = text;
        VD.IWant(VD.ToEqual, V.readyForDelivery, 'Ready', 'Ready for Delivery должен бить Ready');
    }),config.timeout);

    driver.wait(driver.findElement(By.xpath('//div[contains(text(),"'+ V.client.name +'")]/..//div[4]')).getText().then(function(text){
        V.pickupFrom =  SF.cleanPrice(text);
        VD.IWant(VD.ToEqual, V.pickupFrom, '234234234242402200', 'picupFrom не совпали');
    }),config.timeout);

    driver.wait(driver.findElement(By.xpath('//div[contains(text(),"'+ V.client.name +'")]/..//div[5]')).getText().then(function(text){
        V.deliveryTo =  SF.cleanPrice(text);
        VD.IWant(VD.ToEqual, V.deliveryTo, '3465456456432132', 'delivery to не совпали');
    }),config.timeout);

    driver.wait(driver.findElement(By.xpath('//div[contains(text(),"'+ V.client.name +'")]/..//div[8]')).getText().then(function(text){
        V.statusLD =  text;
        VD.IWant(VD.ToEqual, V.statusLD, 'LD', 'LD status не совпали');
    }),config.timeout);
    // VD.IWant(VD.ToEqual,V.request.moveDate.Date, V.SITdate.Date,'не совпала дата');
    // VD.IWant(VD.ToEqual,V.request.moveDate.Date, V.SITdate.Date,'не совпала дата');
    // VD.IWant(VD.ToEqual,V.request.moveDate.Date, V.SITdate.Date,'не совпала дата');
    // V.SITScheduleDate = SF.parseDateInSIT(V.request.moveDate);
    // driver.wait(driver.findElement(By.xpath('//div[contains(text(),"'+ V.SITScheduleDate +'")]/..//div[9]')).getText().then(function(text){
    //     V.scheduleDate  =  text;
    //     VD.IWant(VD.ToEqual, V.scheduleDate, V.SITScheduleDate, 'schedule Date не совпали');
    // }),config.timeout);
    SF.endOfTest();

};