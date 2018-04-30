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
    LF.LoginToBoardAsCustom(V.adminLogin,V.adminPassword);

condition.nowWeDoing = 'Создаем Long Distance работу';
    LF.CreateLongDistanceFromBoard(V.client);
    V.perCubicFeet = '5';
    MF.EditRequest_SendRateForLD (V.perCubicFeet);
    MF.ConfirmCalculatorOff();
    MF.EditRequest_SetAdressToFrom();
    JS.step(JSstep.selectTruck(5));
    MF.WaitWhileBusy();
    MF.EditRequest_SetToConfirmed();
    MF.EditRequest_SaveChanges();
    LF.closeEditRequest ();
    MF.Board_OpenSideBar ();
    MF.Board_OpenCourier ();
    MF.Board_OpenSideBar ();
    V.carrierNew = {};
    V.carrierNew2 = {};
    V.carrierNew3 = {};

condition.nowWeDoing = 'Создаем карьера';
    MF.SIT_ClickAddCarrier();
    V.carrierNew.name = SF.randomBukva(6) + '_t';
    V.carrierNew.contactPerson = SF.randomBukva(6) + '_t';
    V.carrierNew.contactPersonPhone = SF.randomCifra(10);
    SF.send(By.xpath('//input[@ng-model="agentModel.name"]'), V.carrierNew.name);
    SF.send(By.xpath('//input[@ng-model="agentModel.contact_person"]'), V.carrierNew.contactPerson);
    SF.send(By.xpath('//input[@ng-model="agentModel.contact_person_phone"]'), V.carrierNew.contactPersonPhone);
    V.carrierNew.address = SF.randomBukva(6) + '_t';
    V.carrierNew.zipCode = "90001";
    SF.send(By.xpath('//textarea[@ng-model="agentModel.address"]'), V.carrierNew.address);
    SF.send(By.xpath('//input[@ng-model="agentModel.zip_code"]'), V.carrierNew.zipCode);
    SF.sleep(2);
    SF.click(By.xpath('//md-checkbox[@ng-model="agentModel.company_carrier"]'));
    V.carrierNew.perCf = "2";
    V.carrierNew.iccMc = SF.randomCifra(10);
    SF.send(By.xpath('//input[@ng-model="agentModel.per_cf"]'), V.carrierNew.perCf);
    SF.send(By.xpath('//input[@ng-model="agentModel.icc_mc_number"]'), V.carrierNew.iccMc);
    V.carrierNew.usdot = SF.randomCifra(10);
    V.carrierNew.eMail = SF.randomBukvaSmall(6) + '@' + SF.randomBukvaSmall(4) + '.tes';
    SF.send(By.xpath('//input[@ng-model="agentModel.usdot_number"]'), V.carrierNew.usdot);
    SF.send(By.xpath('//input[@ng-model="agentModel.email"]'), V.carrierNew.eMail);
    V.carrierNew.webSite = "fdsfd.com";
    V.carrierNew.phoneNumber1 = SF.randomCifra(10);
    SF.send(By.xpath('//input[@ng-model="agentModel.web_site"]'), V.carrierNew.webSite);
    SF.send(By.xpath('//input[@ng-model="agentModel.phones[$index]"]'), V.carrierNew.phoneNumber1);
    SF.sleep(2);
    MF.SIT_ClickSaveCarrier();
    MF.Board_ClickLongDistanceDispach();

condition.nowWeDoing = 'Создаем Трип';
    MF.SIT_ClickAddTrip();
    MF.SIT_ChangeStatusTrip('Pending');
    V.internalCode = SF.randomCifra(10);
    V.decription = SF.randomBukva(6) + '_t';
    MF.SIT_AddDescriptionAndInternalCode(V.decription, V.internalCode);
    let now = new Date();
    let msInDay = 86400000;
    let future = new Date(now.getTime() + msInDay * 10);
    let options = {month: 'short', day: '2-digit', year: 'numeric'};
    V.dateStart = (now.toLocaleDateString('en-US', options));
    V.dateEnd = (future.toLocaleDateString('en-US', options));
    SF.clear(By.xpath('//md-datepicker[@ng-model="trip.data.details.start"]/div/input'));
    SF.send(By.xpath('//md-datepicker[@ng-model="trip.data.details.start"]/div/input'), V.dateStart);
    SF.sleep(1);
    SF.clear(By.xpath('//md-datepicker[@ng-model="trip.data.details.end"]/div/input'));
    SF.send(By.xpath('//md-datepicker[@ng-model="trip.data.details.end"]/div/input'), V.dateEnd);
    SF.sleep(2);
    SF.click(By.xpath('//input[@ng-model="search"]'));
    MF.SIT_SelectCarrierName(V.carrierNew.name);
    V.driverPhone = SF.randomCifra(10);
    V.driverName = SF.randomBukva(6) + '_t';
    V.notes = SF.randomBukva(25) + '_t';
    SF.sleep(1);
    SF.send (By.xpath('//input[@ng-model="trip.data.carrier.driver_name"]'), V.driverName);
    SF.send (By.xpath('//input[@ng-model="trip.data.carrier.driver_phone"]'), V.driverPhone);
    SF.send (By.xpath('//textarea[@ng-model="trip.data.note"]'), V.notes);

condition.nowWeDoing = 'Сохраняем трип и добавляем работу в трип';
    MF.SIT_ClickUpdateTrip();
    JS.click('span:contains(\\"Add Pickup/Delivery\\")');
    SF.sleep(3);
    SF.waitForVisible (By.xpath('//md-datepicker[@ng-model="pickupDateFrom"]/div/input'));
    SF.clear(By.xpath('//md-datepicker[@ng-model="pickupDateFrom"]/div/input'));
    SF.send(By.xpath('//md-datepicker[@ng-model="pickupDateFrom"]/div/input'), V.dateStart);
    SF.clear(By.xpath('//md-datepicker[@ng-model="pickupDateTo"]/div/input'));
    SF.send(By.xpath('//md-datepicker[@ng-model="pickupDateTo"]/div/input'), V.dateEnd);
    SF.click(By.xpath('//input[@ng-model="search"]'));
    SF.waitForVisible(By.xpath('//div[contains(text(),"' + V.client.name + '")]/..//div[@ng-click="openRequest(id)"]'));
    SF.sleep(2);
    SF.click(By.xpath('//div[contains(text(),"' + V.client.name + '")]/..//div[@ng-click="openRequest(id)"]'));
    MF.EditRequest_WaitForOpenRequest();
    MF.EditRequest_CloseConfirmWork();
    V.boardNumbers = {};
    LF.RememberDigitsRequestBoard_Down(V.boardNumbers);
    V.tpCollected = V.boardNumbers.Balance;
    LF.closeEditRequest();
    SF.click(By.xpath('//div[contains(text(), "' + V.client.name + '")]/..//md-checkbox[@ng-model="item.a_a_selected"]/div[1]'));
    driver.wait(driver.findElement(By.xpath('//div[contains(text(),"' + V.client.name + '")]/..//div[@ng-click="openRequest(id)"]')).getText().then(function(text){
        V.ldJobId = text;
    }),config.timeout);
    MF.SIT_AddRequestToTrip();
    MF.SIT_GoToClosingTab();

condition.nowWeDoing = 'редактируем поля и проверяем циферки';
    SF.waitForVisible(By.xpath('//div[@ng-repeat="item in jobs track by $index"]//div[@ng-click="openRequest(id)"]'));
    SF.click(By.xpath('//div[@ng-repeat="item in jobs track by $index"]//div[@ng-click="openRequest(id)"]'));
    MF.EditRequest_WaitForOpenRequest();
    V.boardNumbers = {};
    LF.RememberDigitsRequestBoard_Down(V.boardNumbers);
    VD.IWant(VD.ToEqual, V.boardNumbers.Balance, 0.00, 'Баланс в окне реквеста должен бить 0 после добавления работи в трип');
    VD.IWant(VD.ToEqual, V.boardNumbers.Payment, V.tpCollected, 'Пеймент должен бить равен тпКолектед');
    LF.closeEditRequest ();
    driver.wait(driver.findElement(By.xpath('//div[@ng-click="showTpCollected(item, item.balance)"]')).getText().then(function(text){
        V.cleanTPCollected = SF.cleanPrice(text);
        VD.IWant(VD.ToEqual, V.tpCollected, V.cleanTPCollected, 'не совпали TP Collected в клоузинге c Payment в модалке реквеста');
    }),config.timeout);
    SF.click(By.xpath('//div[@ng-click="openRateModal(item)"]'));
    V.ratePerCf= 4;
    SF.waitForVisible(By.xpath('//input[@ng-model="rate_per_cf"]'));
    SF.clear(By.xpath('//input[@ng-model="rate_per_cf"]'));
    SF.send(By.xpath('//input[@ng-model="rate_per_cf"]'), V.ratePerCf);
    SF.click(By.xpath('//button[@ng-click="update()"]'));
    SF.sleep(3);
    SF.click(By.xpath('//div[@ng-click="openVolumeModal(item)"]'));
    SF.waitForVisible(By.xpath('//div[@show-text="'+V.ldJobId+'"]/..//input[@ng-model="volume_cf"]'));
    V.volumeCf= 350;
    SF.clear(By.xpath('//div[@show-text="'+V.ldJobId+'"]/..//input[@ng-model="volume_cf"]'));
    SF.send(By.xpath('//div[@show-text="'+V.ldJobId+'"]/..//input[@ng-model="volume_cf"]'), V.volumeCf);
    JS.click('button[ng-click=\\"update()\\"]:visible');
    SF.sleep(3);
    SF.click(By.xpath('//div[@ng-click="addServices(item, $index)"]'));
    JS.waitForExist('li:contains(\\"Parking Ticket\\")');
    JS.click('li:contains(\\"Parking Ticket\\")');
    V.parkingCost = 250;
    SF.clear(By.xpath('//input[@ng-model="add_extra_charge.extra_services[0].services_default_value"]'));
    SF.send(By.xpath('//input[@ng-model="add_extra_charge.extra_services[0].services_default_value"]'), V.parkingCost);
    SF.click(By.xpath('//button[@ng-click="save()"]'));
    SF.sleep(5);
    SF.click(By.xpath('//div[@ng-click="showTpCollected(item, item.balance)"]'));
    SF.waitForVisible(By.xpath('//input[@ng-model="payment.amount"]'));
    V.somePayment = 100;
    SF.clear(By.xpath('//input[@ng-model="payment.amount"]'));
    SF.send(By.xpath('//input[@ng-model="payment.amount"]'), V.somePayment);
    SF.click(By.xpath('//button[@ng-click="save()"]'));
    SF.waitForVisible (By.xpath('//div[contains(text(), "$'+V.somePayment+'.00")]'));
    SF.sleep(2);
    SF.click(By.xpath('//button[@ng-click="back()"]'));
    SF.waitForVisible(By.xpath('//div[@ng-click="showTpCollected(item, item.balance)"]'));
    SF.sleep(2);
    V.totalTPCollected = V.somePayment + V.tpCollected;
    driver.wait(driver.findElement(By.xpath('//div[@ng-click="showTpCollected(item, item.balance)"]')).getText().then(function(text){
        V.cleanTotalTPCollected = SF.cleanPrice(text);
        VD.IWant(VD.ToEqual, V.totalTPCollected, V.cleanTotalTPCollected, 'не совпали TPcollected после добавления кастомного пеймента');
    }),config.timeout);
    V.jobCost = V.volumeCf * V.ratePerCf;
    driver.wait(driver.findElement(By.xpath('//div[@ng-click="openVolumeModal(item)"]/following-sibling::div[1]')).getText().then(function(text){
        V.cleanJobCost = SF.cleanPrice(text);
        VD.IWant(VD.ToEqual, V.jobCost, V.cleanJobCost, 'не совпали Job Cost');
    }),config.timeout);
    V.jobTotal = V.jobCost + V.parkingCost;
    driver.wait(driver.findElement(By.xpath('//div[@ng-click="addServices(item, $index)"]/following-sibling::div[1]')).getText().then(function(text){
        V.cleanJobTotal = SF.cleanPrice(text);
        VD.IWant(VD.ToEqual, V.jobTotal, V.cleanJobTotal, 'не совпали Total Job Cost');
    }),config.timeout);
    V.balance = V.totalTPCollected - V.jobTotal;
    driver.wait(driver.findElement(By.xpath('//div[@ng-click="openVolumeModal(item)"]/following-sibling::div[last()]')).getText().then(function(text){
        V.cleanBalance = SF.cleanPrice(text);
        VD.IWant(VD.ToEqual, V.balance, V.cleanBalance, 'не совпали Balance');
    }),config.timeout);

condition.nowWeDoing = 'Проверяем логи';
    JS.click('span:contains(\\"Log\\")');
    SF.waitForVisible(By.xpath('//b[contains(text(),\'Field \"Rate per cf\" was changed from \"0\" to \"4\"\')]'));
    driver.wait(driver.findElement(By.xpath('//b[contains(text(),\'Field \"Rate per cf\" was changed from \"0\" to \"4\"\')]')).getText().then(function(text){
        VD.IWant(VD.ToEqual, text, 'Field \"Rate per cf\" was changed from \"0\" to \"4\"', 'не совпали cubic feet в клозингу и в логах');
    }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//b[contains(text(),\'Field \"Volume cf\" was changed from \"275\" to \"350\"\')]')).getText().then(function(text){
        VD.IWant(VD.ToEqual, text, 'Field \"Volume cf\" was changed from \"275\" to \"350\"', 'не совпали volume CF в клозингу и в логах');
    }),config.timeout);
    MF.SIT_ClickTripDetails();

condition.nowWeDoing = 'удаляем работу из трипа';
    SF.waitForLocated(By.xpath('//div[@ng-click="openRequest(id)"]'));
    SF.sleep(3);
    SF.click(By.xpath('//div[contains(text(), "' + V.client.name + '")]/..//div/div/md-checkbox[@ng-model="item.selected"]/div[1]'));
    JS.waitForExist ('button[ng-click=\\"removeSelectedJobs()\\"]:visible');
    SF.sleep(1);
    SF.click (By.xpath('//button[@ng-click="removeSelectedJobs()"]'));
    SF.sleep(2);
    MF.SIT_ClickUpdateTrip();
    MF.Board_OpenSideBar ();
    MF.Board_ClickLongDistanceDispach();
    MF.Board_OpenCarriersAndAgents ();
    MF.Board_OpenSideBar ();
    SF.waitForVisible(By.xpath('//input[@ng-model="searchTerm"]'));
    SF.sleep(3);
    SF.send(By.xpath('//input[@ng-model="searchTerm"]'), V.carrierNew.name);
    SF.waitForVisible(By.xpath('//div[text()="'+ V.carrierNew.name +'"]'));
    SF.click(By.xpath('//div[text()="'+ V.carrierNew.name +'"]'));

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
    SF.endOfTest();
};
