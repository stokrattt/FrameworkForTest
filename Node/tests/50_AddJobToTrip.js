module.exports = function main(SF, JS, MF, LF, JSstep, VD, V, By, until,FileDetector, system, condition, config,constants) {
    global.fiber = Fiber.current;
    V.client = {};
    V.client.name = SF.randomBukva(6) + '_t';
    V.client.fam = SF.randomBukva(6) + '_t';
    V.client.phone = SF.randomCifra(10);
    V.client.email = SF.randomBukvaSmall(6) + '@' + SF.randomBukvaSmall(4) + '.tes';
    V.client.passwd = 123;
    V.client.zipFrom = '02222';
    V.client.zipTo = '90001';

    //=========================начинаем писать тест=============================
    SF.get(V.adminURL);
    LF.LoginToBoardAs_Roma4ke_Admin ();

    condition.nowWeDoing = 'Создаем Long Distance работу';
    LF.CreateLongDistanceFromBoard(V.client);
    MF.EditRequest_SetToConfirmed();
    SF.select(By.xpath('//select[@id="edit-service"]'), 7);
    SF.sleep(1);

    JS.step(JSstep.selectTruck(5));
    V.perCubicFeet = '5';
    SF.clear(By.xpath('//input[@ng-model="request.field_long_distance_rate.value"]'));
    SF.send(By.xpath('//input[@ng-model="request.field_long_distance_rate.value"]'), V.perCubicFeet);
    MF.EditRequest_SetAdressToFrom();
    MF.EditRequest_SaveChanges();
    SF.sleep(2);
    driver.wait(driver.findElement(By.xpath('//label[contains(text(),"Balance:")]/..//div')).getText().then(function(text){
        V.tpCollected = SF.cleanPrice(text);
    }),config.timeout);
    SF.sleep(2);
    LF.closeEditRequest ();

    MF.Board_OpenSideBar();
    SF.click(By.xpath('//a[@ng-click="vm.goToPage(\'lddispatch.trip\', \'\')"]'));
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
    SF.send (By.xpath('//textarea[@ng-model="trip.data.details.description"]'), V.decription);
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

    SF.sleep(2);
    SF.click(By.xpath('//input[@ng-model="search"]'));
    SF.sleep(2);
    SF.click(By.xpath('//md-select[@ng-model="trip.data.carrier.ld_carrier_id"]'));
    SF.click(By.xpath('//div[text()="'+ V.carrierNew2.name +'"]'));
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
    SF.sleep(2);
    SF.clear(By.xpath('//md-datepicker[@ng-model="pickupDateTo"]/div/input'));
    SF.send(By.xpath('//md-datepicker[@ng-model="pickupDateTo"]/div/input'), V.dateEnd);
    SF.sleep(2);
    SF.click(By.xpath('//input[@ng-model="search"]'));

    SF.click(By.xpath('//div[contains(text(), "' + V.client.name + '")]/..//md-checkbox[@ng-model="item.a_a_selected"]/div[1]'));
    driver.wait(driver.findElement(By.xpath('//div[contains(text(),"' + V.client.name + '")]/..//div[@ng-click="openRequest(id)"]')).getText().then(function(text){
        V.ldJobId = text;
    }),config.timeout);
    SF.sleep(2);
    JS.click('span:contains(\\"Add requests to trip\\")');
    SF.sleep(6);
    JS.click('span:contains(\\"Closing\\")');

    condition.nowWeDoing = 'редактируем поля и проверяем циферки';
    SF.sleep(2);
    SF.click(By.xpath('//div[@ng-repeat="item in jobsTripList track by $index"]//div[@ng-click="openRequest(id)"]'));
    SF.waitForVisible(By.xpath('//div[@ng-click="chooseTruck(tid)"]'));
    MF.WaitWhileBusy();
    SF.sleep(2);
    MF.WaitWhileBusy();
    V.boardNumbers = {};
    LF.RememberDigitsRequestBoard_Down(V.boardNumbers);
    // driver.wait(driver.findElement(By.xpath('//label[contains(text(),"Balance:")]/following-sibling::div')).getText().then(function(text){
    //     V.requestBalanceAfter = SF.cleanPrice(text);
        VD.IWant(VD.ToEqual, V.boardNumbers.Balance, 0.00, 'Баланс в окне реквеста должен бить 0 после добавления работи в трип');
    // }),config.timeout);

    // driver.wait(driver.findElement(By.xpath('//label[contains(text(),"Payment:")]/following-sibling::div')).getText().then(function(text){
    //     V.requestPaymentAfter = SF.cleanPrice(text);
        VD.IWant(VD.ToEqual, V.boardNumbers.Payment, V.tpCollected, 'Пеймент должен бить равен тпКолектед');
    // }),config.timeout);
    SF.sleep(2);
    LF.closeEditRequest ();
    SF.sleep(2);
    driver.wait(driver.findElement(By.xpath('//div[@ng-click="showTpCollected(item.job_id, item.balance)"]')).getText().then(function(text){
        V.cleanTPCollected = SF.cleanPrice(text);
        VD.IWant(VD.ToEqual, V.tpCollected, V.cleanTPCollected, 'не совпали TP Collected в клоузинге c Payment в модалке реквеста');
    }),config.timeout);
    SF.click(By.xpath('//div[@ng-click="openRateModal(item)"]'));
    V.ratePerCf= 4;
    SF.sleep(1);
    SF.clear(By.xpath('//input[@ng-model="rate_per_cf"]'));
    SF.sleep(1);
    SF.send(By.xpath('//input[@ng-model="rate_per_cf"]'), V.ratePerCf);
    SF.sleep(2);
    SF.click(By.xpath('//button[@ng-click="update()"]'));
    SF.sleep(3);

    SF.click(By.xpath('//div[@ng-click="openVolumeModal(item)"]'));
    SF.sleep(1);
    V.volumeCf= 350;
    SF.clear(By.xpath('//input[@ng-model="volume_cf"]'));
    SF.sleep(1);
    SF.send(By.xpath('//input[@ng-model="volume_cf"]'), V.volumeCf);
    SF.sleep(2);
    SF.click(By.xpath('//button[@ng-click="update()"]'));
    SF.sleep(3);
    SF.click(By.xpath('//div[@ng-click="addServices(item, $index)"]'));
    SF.sleep(4);
    JS.click('li:contains(\\"Parking Ticket\\")');
    V.parkingCost = 250;
    SF.clear(By.xpath('//input[@ng-model="add_extra_charge.extra_services[0].services_default_value"]'));
    SF.send(By.xpath('//input[@ng-model="add_extra_charge.extra_services[0].services_default_value"]'), V.parkingCost);
    SF.click(By.xpath('//button[@ng-click="save()"]'));
    SF.sleep(3);
    SF.click(By.xpath('//div[@ng-click="showTpCollected(item.job_id, item.balance)"]'));
    SF.sleep(3);
    // SF.click(By.xpath('//button[@ng-click="openCustomPayment($event, 0, item.id, [], 4)"]'));
    V.somePayment = 100;
    SF.clear(By.xpath('//input[@ng-model="payment.amount"]'));
    SF.send(By.xpath('//input[@ng-model="payment.amount"]'), V.somePayment);
    SF.sleep(2);
    SF.click(By.xpath('//button[@ng-click="save()"]'));
    SF.sleep(4);
    SF.click(By.xpath('//button[@ng-click="back()"]'));
    SF.sleep(6);
    JS.click('span:contains(\\"Closing\\")');
    SF.sleep(4);

    V.totalTPCollected = V.somePayment + V.tpCollected;
    driver.wait(driver.findElement(By.xpath('//div[@ng-click="showTpCollected(item.job_id, item.balance)"]')).getText().then(function(text){
        V.cleanTotalTPCollected = SF.cleanPrice(text);
        VD.IWant(VD.ToEqual, V.totalTPCollected, V.cleanTotalTPCollected, 'не совпали TPcollected после добавления кастомного пеймента');
    }),config.timeout);
    SF.sleep(1);
    V.jobCost = V.volumeCf * V.ratePerCf;
    driver.wait(driver.findElement(By.xpath('//div[@ng-click="openVolumeModal(item)"]/following-sibling::div[1]')).getText().then(function(text){
        V.cleanJobCost = SF.cleanPrice(text);
        VD.IWant(VD.ToEqual, V.jobCost, V.cleanJobCost, 'не совпали Job Cost');
    }),config.timeout);
    SF.sleep(2);

    V.jobTotal = V.jobCost + V.parkingCost;
    driver.wait(driver.findElement(By.xpath('//div[@ng-click="addServices(item, $index)"]/following-sibling::div[1]')).getText().then(function(text){
        V.cleanJobTotal = SF.cleanPrice(text);
        VD.IWant(VD.ToEqual, V.jobTotal, V.cleanJobTotal, 'не совпали Total Job Cost');
    }),config.timeout);
    SF.sleep(2);

    V.balance = V.totalTPCollected - V.jobTotal;
    driver.wait(driver.findElement(By.xpath('//div[@ng-click="openVolumeModal(item)"]/following-sibling::div[last()]')).getText().then(function(text){
        V.cleanBalance = SF.cleanPrice(text);
        VD.IWant(VD.ToEqual, V.balance, V.cleanBalance, 'не совпали Balance');
    }),config.timeout);
    SF.sleep(2);

    condition.nowWeDoing = 'Проверяем логи';
    JS.click('span:contains(\\"Log\\")');
    SF.sleep(5);
    driver.wait(driver.findElement(By.xpath('//b[contains(text(),"Field rate_per_cf was changed to 4")]')).getText().then(function(text){
        VD.IWant(VD.ToEqual, text, 'Field rate_per_cf was changed to 4', 'не совпали cubic feet в клозингу и в логах');
    }),config.timeout);

    driver.wait(driver.findElement(By.xpath('//b[contains(text(),"Field volume_cf was changed to 350")]')).getText().then(function(text){
        VD.IWant(VD.ToEqual, text, 'Field volume_cf was changed to 350', 'не совпали volume CF в клозингу и в логах');
    }),config.timeout);
    SF.sleep(3);

    JS.click('span:contains(\\"Trip details\\")');

    condition.nowWeDoing = 'удаляем работу из трипа';
    SF.sleep(2);
    driver.wait(driver.findElement(By.xpath('//div[@ng-click="openRequest(id)"]')).getText().then(function(text){
        V.ldJobId = text;
    }),config.timeout);
    SF.sleep(2);
    SF.click(By.xpath('//div[contains(text(), "' + V.client.name + '")]/..//div/div/md-checkbox[@ng-model="item.selected"]/div[1]'));
    SF.sleep(2);
    SF.click (By.xpath('//button[@ng-click="removeSelectedJobs()"]'));
    SF.sleep(2);
    JS.click('span:contains(\\"Update\\")');
    SF.sleep(2);

    // condition.nowWeDoing = 'Проверяем логи после того как удалили работу с трипа';
    // JS.click('span:contains(\\"Log\\")');
    // SF.sleep(4);
    // driver.wait(driver.findElement(By.xpath('//b[contains(text(),"Job #' + V.ldJobId + ' was removed")]')).getText().then(function(text){
    // }),config.timeout);

    MF.Board_OpenSideBar ();
    MF.Board_OpenCarriersAndAgents ();
    MF.Board_OpenSideBar ();
    SF.sleep(3);
    SF.click(By.xpath('//div[text()="'+ V.carrierNew2.name +'"]'));


    condition.nowWeDoing = 'удаляем карьера';
    driver.wait(driver.executeScript('return location.toString();').then(function(url){
        let c='a';
        for (let i=0; i<url.length; i++) {
            if (url[i]=='/'){c=i;}
        }
        let id = url.substring(c+1);
        driver.executeScript(
            JSstep.sendRequestNoParam('DELETE', 'http://api.moversboard.net:8084/server/long_distance_carrier/'+id)
        );
    }),config.timeout);
    SF.sleep(1);
    SF.endOfTest();
};
