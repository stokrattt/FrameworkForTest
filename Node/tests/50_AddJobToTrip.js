module.exports = function main(SF, JS, MF, LF, JSstep, VD, V, By, until,FileDetector, system, condition, config,constants) {
    global.fiber = Fiber.current;
    V.client = {};
    V.client.name = SF.randomBukva(6) + '_t';
    V.client.fam = SF.randomBukva(6) + '_t';
    V.client.phone = SF.randomCifra(10);
    V.client.email = SF.randomBukvaSmall(6) + '@' + SF.randomBukvaSmall(4) + '.tes';
    V.client.passwd = 123;

    //=========================начинаем писать тест=============================
    SF.get('http://stage.themoveboard.com:8000/moveBoard/#/login');
    LF.LoginToBoardAs_Roma4ke_Admin ();

    condition.nowWeDoing = 'Создаем Long Distance работу';
    SF.click(By.xpath('//a[@ng-click="vm.openEditModal()"]'));
    SF.sleep(2);
    SF.click(By.xpath('//input[@id="edit-move-date-datepicker-popup-0"]'));
    driver.wait(driver.executeScript(JSstep.Click4DaysCalendar),config.timeout);
    SF.sleep(1);
    SF.click(By.xpath('//select[@ng-model="editrequest.data.field_move_service_type"]'));
    SF.sleep(1);
    SF.click(By.xpath('//option[text()="Long Distance"]'));
    V.zipFrom = '02222';
    V.zipTo = '32132';
    SF.send(By.xpath('//input[@ng-model="editrequest.data.field_moving_from.postal_code"]'), V.zipFrom);
    SF.send(By.xpath('//input[@ng-model="editrequest.data.field_moving_to.postal_code"]'), V.zipTo);
    SF.sleep(3);
    SF.click(By.xpath('//button[@ng-click="Calculate()"]'));
    SF.sleep(8);
    SF.click(By.xpath('//button[@ng-click="step2 = false;step3 = true;"]'));
    V.user = {};
    V.user.name = SF.randomBukva(6) + '_t';
    V.user.lastName = SF.randomBukva(6) + '_t';
    V.user.eMail = SF.randomBukvaSmall(6) + '@' + SF.randomBukvaSmall(4) + '.tes';
    V.user.phone = SF.randomCifra(10);
    SF.send(By.xpath('//input[@ng-model="editrequest.account.fields.field_user_first_name"]'), V.user.name);
    SF.send(By.xpath('//input[@ng-model="editrequest.account.fields.field_user_last_name"]'), V.user.lastName);
    SF.send(By.xpath('//input[@ng-model="editrequest.account.mail"]'), V.user.eMail);
    SF.send(By.xpath('//input[@ng-model="editrequest.account.fields.field_primary_phone"]'), V.user.phone);
    SF.sleep(1);
    SF.click(By.xpath('//button[@ng-click="create()"]'));
    SF.waitForVisible(By.xpath('//div[@ng-click="chooseTruck(tid)"]'));
    MF.WaitWhileBusy();
    SF.sleep(2);
    MF.WaitWhileBusy();
    MF.EditRequest_SetToConfirmed();
    SF.select(By.xpath('//select[@id="edit-service"]'), 7);
    SF.sleep(1);

    JS.step(JSstep.selectTruck(5));
    V.perCubicFeet = '5';
    SF.clear(By.xpath('//input[@ng-model="request.field_long_distance_rate.value"]'));
    SF.send(By.xpath('//input[@ng-model="request.field_long_distance_rate.value"]'), V.perCubicFeet);
    MF.EditRequest_SetAdressToFrom();
    MF.EditRequest_SaveChanges();
    LF.closeEditRequest ();

    MF.Board_OpenSideBar();
    SF.click(By.xpath('//a[@ng-click="vm.goToPage(\'trip\', \'\')"]'));
    SF.sleep(2);
    MF.Board_OpenTripPlanner();
    MF.Board_OpenSideBar();
    SF.sleep(2);

    condition.nowWeDoing = 'Создаем Трип';
    SF.click(By.xpath('//button[@ng-click="addTrip()"]'));
    SF.sleep(2);
    SF.click(By.xpath('//md-select[@ng-model="trip.data.details.flag"]'));
    SF.click(By.xpath('//div[text()="Pending"]'));
    SF.sleep(1);
    V.internalCode = SF.randomCifra(10);
    V.decription = SF.randomBukva(6) + '_t';
    SF.send (By.xpath('//input[@ng-model="trip.data.details.description"]'), V.decription);
    now = new Date();
    msInDay = 86400000;
    future = new Date(now.getTime() + msInDay * 10);
    options = { month: 'numeric', day: 'numeric', year: 'numeric' };
    V.dateStart = (now.toLocaleDateString('en-US', options));
    V.dateEnd = (future.toLocaleDateString('en-US', options));
    SF.clear(By.xpath('//md-datepicker[@ng-model="trip.data.details.start"]/div/input'));
    SF.send(By.xpath('//md-datepicker[@ng-model="trip.data.details.start"]/div/input'), V.dateStart);
    SF.sleep(1)
    SF.clear(By.xpath('//md-datepicker[@ng-model="trip.data.details.end"]/div/input'));
    SF.send(By.xpath('//md-datepicker[@ng-model="trip.data.details.end"]/div/input'), V.dateEnd);

    SF.sleep(1);
    SF.click(By.xpath('//md-select[@ng-model="trip.data.carrier.carrier_id"]'));
    SF.click(By.xpath('//div[text()="best rate"]'));
    V.driverPhone = SF.randomCifra(10);
    V.driverName = SF.randomBukva(6) + '_t';
    V.notes = SF.randomBukva(25) + '_t';
    SF.sleep(1);
    SF.send (By.xpath('//input[@ng-model="trip.data.carrier.driver_name"]'), V.driverName);
    SF.send (By.xpath('//input[@ng-model="trip.data.carrier.driver_phone"]'), V.driverPhone);
    SF.send (By.xpath('//textarea[@ng-model="trip.data.note"]'), V.notes);

    condition.nowWeDoing = 'Сохраняем трип и добавляем работу в трип';
    JS.click('span:contains(\\"Update\\")');
    SF.sleep(3);
    JS.click('span:contains(\\"Add Pickup/Delivery\\")');
    SF.sleep(2);
    SF.clear(By.xpath('//md-datepicker[@ng-model="pickupDateFrom"]/div/input'));
    SF.send(By.xpath('//md-datepicker[@ng-model="pickupDateFrom"]/div/input'), V.dateStart);
    SF.sleep(1);
    SF.clear(By.xpath('//md-datepicker[@ng-model="pickupDateFromTo"]/div/input'));
    SF.send(By.xpath('//md-datepicker[@ng-model="pickupDateFromTo"]/div/input'), V.dateEnd);
    SF.sleep(2);
    SF.click(By.xpath('//input[@ng-model="search"]'));

    SF.click(By.xpath('//div[contains(text(), "' + V.user.name + '")]/..//md-checkbox[@ng-model="item.a_a_selected"]/div[1]'));
    SF.sleep(2);
    JS.click('span:contains(\\"Add requests to trip\\")');
    SF.sleep(3);
    JS.click('span:contains(\\"Closing\\")');

    condition.nowWeDoing = 'редактируем поля rate Per CF b Volume cf';
    SF.click(By.xpath('//div[@ng-click="openRateModal(item)"]'));
    V.ratePerCf= 4;
    SF.sleep(1);
    SF.clear(By.xpath('//input[@ng-model="rate_per_cf"]'));
    SF.send(By.xpath('//input[@ng-model="rate_per_cf"]'), V.ratePerCf);
    SF.click(By.xpath('//button[@ng-click="update()"]'));
    SF.sleep(3);

    SF.click(By.xpath('//div[@ng-click="openVolumeModal(item)"]'));
    SF.sleep(1);
    V.volumeCf= 350;
    SF.clear(By.xpath('//input[@ng-model="volume_cf"]'));
    SF.send(By.xpath('//input[@ng-model="volume_cf"]'), V.volumeCf);
    SF.click(By.xpath('//button[@ng-click="update()"]'));
    SF.sleep(3);
    SF.click(By.xpath('//div[@ng-click="addServices(item, $index)"]'));
    SF.sleep(4);
    JS.click('li:contains(\\"Estimated Full Packing\\")');
    V.packingCost = 250;
    SF.clear(By.xpath('//input[@ng-model="add_extra_charge.extra_services[0].services_default_value"]'));
    SF.send(By.xpath('//input[@ng-model="add_extra_charge.extra_services[0].services_default_value"]'), V.packingCost);
    SF.click(By.xpath('//button[@ng-click="save()"]'));
    V.jobCost = V.volumeCf * V.ratePerCf;
    driver.wait(driver.findElement(By.xpath('//div[contains(text(),"$1,400.00")]')).getText().then(function(text){
        V.cleanJobCost = SF.cleanPrice(text);
        VD.IWant(VD.VToEqual, V.jobCost, V.cleanJobCost, 'не совпали Job Cost');
    }),config.timeout);
    SF.sleep(2);

    V.jobTotal = V.jobCost + V.packingCost;
    driver.wait(driver.findElement(By.xpath('//div[contains(text(),"$1,650.00")]')).getText().then(function(text){
        V.cleanJobTotal = SF.cleanPrice(text);
        VD.IWant(VD.VToEqual, V.jobTotal, V.cleanJobTotal, 'не совпали Total Job Cost');
    }),config.timeout);

    condition.nowWeDoing = 'Проверяем логи';
    JS.click('span:contains(\\"Log\\")');
    SF.sleep(3);
    driver.wait(driver.findElement(By.xpath('//b[contains(text(),"Field rate_per_cf was changed to4")]')).getText().then(function(text){
        VD.IWant(VD.VToEqual, text, 'Field rate_per_cf was changed to4', 'не совпали cubic feet в клозингу и в логах');
    }),config.timeout);

    driver.wait(driver.findElement(By.xpath('//b[contains(text(),"Field volume_cf was changed to350")]')).getText().then(function(text){
        VD.IWant(VD.VToEqual, text, 'Field volume_cf was changed to350', 'не совпали volume CF в клозингу и в логах');
    }),config.timeout);
    SF.sleep(3);

    SF.click(By.xpath('//button[@ng-click="closeTrip()"]'));
    SF.click(By.xpath('//div[contains(text(), "' + V.driverName + '")]'));

    condition.nowWeDoing = 'удаляем работу из трипа';
    SF.sleep(2);
    SF.click(By.xpath('//div[contains(text(), "' + V.user.name + '")]/..//div/div/md-checkbox[@ng-model="item.selected"]/div[1]'));
    SF.sleep(2);
    SF.click (By.xpath('//button[@ng-click="removeSelectedJobs()"]'));
    SF.sleep(2);
    JS.click('span:contains(\\"Update\\")');

    //=========================закончили писать тест=============================
    SF.endOfTest();
};
