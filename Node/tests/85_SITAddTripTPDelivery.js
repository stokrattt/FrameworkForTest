
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

condition.nowWeDoing = 'Создаем Long Distance работу с мувборда. Добавляем full packing, конфёрмим работу, меняем мув сайз, меняем рейт и выключаем калькулятор';
    LF.CreateLongDistanceFromBoard(V.client);
    V.requestNumber={};
    MF.EditRequest_RememberId(V.requestNumber);
    MF.EditRequest_OpenClient();
    LF.SetClientPasswd(V.client.passwd);
    MF.EditRequest_OpenRequest();
    LF.EditRequest_AddFullPacking();
    MF.EditRequest_SetToConfirmed();
    MF.EditRequest_SetSizeOfMoveNumber(8);
    V.boardNumbers = {};
    LF.RememberDigitsRequestBoard(V.boardNumbers);
    JS.step(JSstep.selectTruck(5));
    MF.WaitWhileBusy();
    V.perCubicFeet = '5';
    MF.EditRequest_SendRateForLD (V.perCubicFeet);
    MF.ConfirmCalculatorOff();
    MF.EditRequest_SetAdressToFrom();
    MF.EditRequest_SaveChanges();
    SF.click(By.xpath('//div[@ng-click="changeSalesClosingTab(\'closing\')"]'));
    V.boardNumbersClosing = {};
    LF.RememberDigitsRequestBoard_Down (V.boardNumbersClosing);
    VD.IWant(VD.ToEqual, V.boardNumbersClosing.Packing, 0, 'Full packing был перенесен в табу closing после изменения мув сайза в зелёном реквесте');
    driver.wait(driver.findElement(By.xpath('//label[contains(text(),"Balance:")]/..//div')).getText().then(function(text){
        V.tpCollected = SF.cleanPrice(text);
    }),config.timeout);
    SF.sleep(1);
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

condition.nowWeDoing = 'Создаем Трип Foreman/Helper';
    MF.SIT_ClickAddTrip();
    MF.SIT_ChangeStatusTrip('Pending');
    MF.SIT_ChangeStatusTripForemanHelper();
    driver.wait(driver.findElement(By.xpath('//h3[contains(text(),"Trip Info #")]')).getText().then(function(text){
        V.tripId = SF.cleanPrice(text);
    }),config.timeout);
    V.internalCode = SF.randomCifra(10);
    V.decription = SF.randomBukva(6) + '_t';
    MF.SIT_AddDescriptionAndInternalCode(V.decription, V.internalCode);
    let now = new Date();
    let msInDay = 86400000;
    let future = new Date(now.getTime() + msInDay * 10);
    let options = {month: 'short', day: '2-digit', year: 'numeric'};
    V.dateStart = (now.toLocaleDateString('en-US', options));
    V.dateEnd = (future.toLocaleDateString('en-US', options));
    SF.clear(By.xpath('//md-datepicker[@ng-model="trip.data.details.end"]/div/input'));
    SF.send(By.xpath('//md-datepicker[@ng-model="trip.data.details.end"]/div/input'), V.dateEnd);
    SF.click(By.xpath('//input[@ng-model="search"]'));
    SF.sleep(2);
    V.notes = SF.randomBukva(25) + '_t';
    SF.send (By.xpath('//textarea[@ng-model="trip.data.note"]'), V.notes);
    V.foremanName = 'Test Foreman';
    SF.click(By.xpath('//md-select[@ng-model="trip.data.foreman"]'));
    SF.sleep(1);
    SF.click(By.xpath('//md-option[@ng-repeat="item in foremen"]/div[text()="'+V.foremanName+'"]'));
    SF.sleep(1);
    SF.click(By.xpath('//md-select[@ng-model="trip.data.helper"]'));
    SF.waitForVisible (By.xpath('//div[text()="helper test1"]'));
    SF.click(By.xpath('//div[text()="helper test1"]'));
    SF.click(By.xpath('//div[text()="helper test2"]'));
    SF.click(By.xpath('//button[@ng-click="closeSelectBox($event)"]'));
    SF.sleep(1);

condition.nowWeDoing = 'Создаем TP Delivery, заполняем поля и проверяем рассчеты';
    driver.actions().mouseMove(driver.findElement(By.xpath('//button[@ng-click="createTrip(trip)"]'))).doubleClick().perform();
    JS.waitForNotExist('span.toast-message:visible');
    SF.sleep(2);
    SF.click(By.xpath('//span[contains(text(),"Add TP Delivery")]'));
    SF.waitForVisible (By.xpath('//input[@ng-model="tp.delivery_job_id"]'));
    V.tpDeliveryJobId = SF.randomCifra(1);
    SF.send(By.xpath('//input[@ng-model="tp.delivery_job_id"]'), V.tpDeliveryJobId);
    SF.click(By.xpath('//md-select[@ng-model="selectedCarrier"]'));
    SF.waitForVisible (By.xpath('//div[contains(text(), "'+V.carrierNew.name+'")]'));
    SF.click(By.xpath('//div[contains(text(), "'+V.carrierNew.name+'")]'));
    SF.sleep(2);
    V.customer = SF.randomBukva(6) + '_t';
    V.tpDeliveryEmail = SF.randomBukvaSmall(6) + '@' + SF.randomBukvaSmall(4) + '.tes';
    V.tpDeliveryPhone1 = SF.randomCifra(10);
    SF.send(By.xpath('//input[@ng-model="tp.details.customer"]'), V.customer);
    SF.send(By.xpath('//input[@ng-model="tp.details.email"]'), V.tpDeliveryEmail);
    SF.send(By.xpath('//input[@ng-model="tp.details.phones[$index]"]'), V.tpDeliveryPhone1);

    V.tpDeliveryRatePerCF = 2;
    V.tpDeliveryVolumeCF = 80;
    V.orderBalance = 150;
    SF.clear(By.xpath('//input[@ng-model="tp.closing.rate_per_cf"]'));
    SF.send(By.xpath('//input[@ng-model="tp.closing.rate_per_cf"]'), V.tpDeliveryRatePerCF);
    SF.sleep(1);
    SF.clear(By.xpath('//input[@ng-model="tp.closing.volume_cf"]'));
    SF.send(By.xpath('//input[@ng-model="tp.closing.volume_cf"]'), V.tpDeliveryVolumeCF);
    SF.sleep(1);
    SF.clear(By.xpath('//input[@ng-model="tp.closing.order_balance"]'));
    SF.send(By.xpath('//input[@ng-model="tp.closing.order_balance"]'), V.orderBalance);
    SF.click(By.xpath('//div[@ng-click="addServices(tp)"]'));
    SF.waitForVisible (By.xpath('//li[contains(text(), "Parking Ticket")]'));
    JS.click('li:contains(\\"Parking Ticket\\")');
    V.parkingCost = 250;
    SF.clear(By.xpath('//input[@ng-model="add_extra_charge.extra_services[0].services_default_value"]'));
    SF.send(By.xpath('//input[@ng-model="add_extra_charge.extra_services[0].services_default_value"]'), V.parkingCost);
    SF.sleep(1);
    SF.click(By.xpath('//button[contains(text(), "Ok")]'));
    SF.waitForVisible (By.xpath('//input[@ng-model="tp.closing.job_cost"]'));
    V.tpJobCost = V.tpDeliveryRatePerCF * V.tpDeliveryVolumeCF;
    V.tpTotalJob = V.tpJobCost + V.parkingCost;
    SF.sleep(3);
    driver.wait(driver.findElement(By.xpath('//input[@ng-model="tp.closing.job_cost"]')).getAttribute('value').then(function (text) {
        V.cleanTpJobCost = SF.cleanPrice(text);
        VD.IWant(VD.ToEqual, V.cleanTpJobCost, V.tpJobCost, 'Job cost не совпали');
    }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//input[@ng-model="tp.closing.job_total"]')).getAttribute('value').then(function (text) {
        V.cleanTpTotalJob = SF.cleanPrice(text);
        VD.IWant(VD.ToEqual, V.cleanTpTotalJob, V.tpTotalJob, 'Total Job не совпали');
    }),config.timeout);
    V.tpAddress = SF.randomCifra(10);
    V.tpZip = '90001';
    SF.send(By.xpath('//input[@ng-model="tp.details.address"]'), V.tpAddress);
    SF.send(By.xpath('//input[@ng-model="tp.details.zip"]'), V.tpZip);
    SF.sleep(3);
    now = new Date();
    msInDay = 86400000;
    future = new Date(now.getTime() + msInDay * 10);
    options = {month: 'short', day: '2-digit', year: 'numeric'};
    V.dateStart = (now.toLocaleDateString('en-US', options));
    V.dateEnd = (future.toLocaleDateString('en-US', options));
    SF.clear(By.xpath('//md-datepicker[@ng-model="date_from"]/div/input'));
    SF.send(By.xpath('//md-datepicker[@ng-model="date_from"]/div/input'), V.dateStart);
    SF.clear(By.xpath('//md-datepicker[@ng-model="date_to"]/div/input'));
    SF.send(By.xpath('//md-datepicker[@ng-model="date_to"]/div/input'), V.dateEnd);
    SF.click(By.xpath('//input[@ng-model="search"]'));
    SF.sleep(2);
    SF.click(By.xpath('//button[@ng-click="openNewPayment($event)"]'));
    SF.waitForVisible (By.xpath('//input[@ng-model="payment.amount"]'));
    SF.sleep(2);
    V.tpPayment = 200;
    SF.clear(By.xpath('//input[@ng-model="payment.amount"]'));
    SF.send(By.xpath('//input[@ng-model="payment.amount"]'), V.tpPayment);
    SF.sleep(2);
    V.tpToReceive = V.tpTotalJob - V.tpPayment - V.orderBalance;
    SF.click(By.xpath('//button[@ng-click="save()"]'));
    SF.waitForVisible (By.xpath('//input[@ng-model="tp.closing.to_receive"]'));
    SF.sleep(5);
    driver.wait(driver.findElement(By.xpath('//input[@ng-model="tp.closing.to_receive"]')).getAttribute('value').then(function (text) {
        V.cleanTpToReceive = SF.cleanPrice(text);
        VD.IWant(VD.ToEqual, V.cleanTpToReceive, V.tpToReceive, 'to receive не совпали 1');
    }),config.timeout);
    SF.click(By.xpath('//button[@ng-click="openModal(\'new\')"]'));
    SF.click(By.xpath('//md-select[@ng-model="storage"]'));
    SF.waitForVisible (By.xpath('//md-option[@ng-value="storage"]/div[contains(text(), "test")]'));
    SF.click(By.xpath('//md-option[@ng-value="storage"]/div[contains(text(), "test")]'));
    SF.sleep(1);
    SF.click(By.xpath('//md-select[@ng-model="foreman"]'));
    SF.waitForVisible (By.xpath('//div[contains(text(), "Test Foreman")]'));
    SF.click(By.xpath('//div[contains(text(), "Test Foreman")]'));
    SF.sleep(1);
    SF.clear(By.xpath('//md-datepicker[@ng-model="date"]/div/input'));
    SF.send(By.xpath('//md-datepicker[@ng-model="date"]/div/input'), V.dateEnd);
    SF.click(By.xpath('//input[@ng-model="search"]'));
    SF.sleep(2);
    SF.click(By.xpath('//button[@ng-click="updateSit()"]'));
    SF.waitForVisible (By.xpath('//button[@ng-click="createTpDelivery()"]'));
    JS.click('button[ng-click=\\"createTpDelivery()\\"]');
    SF.sleep(5);
    SF.waitForVisible (By.xpath('//div[@ng-if="item.ld_tp_delivery_id && item.ld_tp_delivery_id != null"]//span[contains(text(), "'+V.tpDeliveryJobId+'")]'));
    SF.sleep(3);

condition.nowWeDoing = 'Проверяем сохранились ли изменения в TP Delivery';
    SF.click(By.xpath('//div[@ng-if="item.ld_tp_delivery_id && item.ld_tp_delivery_id != null"]//span[contains(text(), "'+V.tpDeliveryJobId+'")]'));
    SF.waitForVisible (By.xpath('//input[@ng-model="tp.closing.rate_per_cf"]'));
    SF.sleep(2);
    driver.wait(driver.findElement(By.xpath('//input[@ng-model="tp.closing.rate_per_cf"]')).getAttribute('value').then(function (text) {
        V.cleanTpDeliveryRatePerCF = SF.cleanPrice(text);
        VD.IWant(VD.ToEqual, V.cleanTpDeliveryRatePerCF, V.tpDeliveryRatePerCF, 'Rate per cf не совпали');
    }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//input[@ng-model="tp.closing.volume_cf"]')).getAttribute('value').then(function (text) {
        VD.IWant(VD.ToEqual, text, V.tpDeliveryVolumeCF, 'Volume cf не совпали');
    }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//input[@ng-model="tp.closing.to_receive"]')).getAttribute('value').then(function (text) {
        V.cleanTpToReceive = SF.cleanPrice(text);
        VD.IWant(VD.ToEqual, V.cleanTpToReceive, V.tpToReceive, 'to receive не совпали 2');
    }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//input[@ng-model="tp.closing.job_cost"]')).getAttribute('value').then(function (text) {
        V.cleanTpJobCost = SF.cleanPrice(text);
        VD.IWant(VD.ToEqual, V.cleanTpJobCost, V.tpJobCost, 'Job cost не совпали');
    }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//input[@ng-model="tp.closing.job_total"]')).getAttribute('value').then(function (text) {
        V.cleanTpTotalJob = SF.cleanPrice(text);
        VD.IWant(VD.ToEqual, V.cleanTpTotalJob, V.tpTotalJob, 'Total Job не совпали');
    }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//input[@ng-model="tp.closing.tp_collected"]')).getAttribute('value').then(function (text) {
        V.cleanColectedByUs = SF.cleanPrice(text);
        VD.IWant(VD.ToEqual, V.cleanColectedByUs, V.orderBalance, 'Collected By us не совпали');
    }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//input[@ng-model="tp.closing.order_balance"]')).getAttribute('value').then(function (text) {
        V.cleanOrderBalance = SF.cleanPrice(text);
        VD.IWant(VD.ToEqual, V.cleanOrderBalance, V.orderBalance, 'Order Balance cf не совпали');
    }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//input[@ng-model="tp.delivery_job_id"]')).getAttribute('value').then(function (text) {
        VD.IWant(VD.ToEqual, text, V.tpDeliveryJobId, 'Job Id cf не совпали');
    }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//input[@ng-model="tp.details.customer"]')).getAttribute('value').then(function (text) {
        VD.IWant(VD.ToEqual, text, V.customer, 'customer не совпали');
    }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//input[@ng-model="tp.details.email"]')).getAttribute('value').then(function (text) {
        VD.IWant(VD.ToEqual, text, V.tpDeliveryEmail, 'email cf не совпали');
    }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//input[@ng-model="tp.details.phones[$index]"]')).getAttribute('value').then(function (text) {
        V.cleanTpDeliveryPhone1 = -SF.cleanPrice(text);
        VD.IWant(VD.ToEqual, V.cleanTpDeliveryPhone1, V.tpDeliveryPhone1, 'Phone cf не совпали');
    }),config.timeout);

condition.nowWeDoing = 'Редактируем TP Delivery, заполняем поля и проверяем рассчеты';
    V.newCustomer = SF.randomBukva(6) + '_t';
    V.newTpDeliveryEmail = SF.randomBukvaSmall(6) + '@' + SF.randomBukvaSmall(4) + '.tes';
    V.newTpDeliveryPhone1 = SF.randomCifra(10);
    SF.clear(By.xpath('//input[@ng-model="tp.details.customer"]'));
    SF.send(By.xpath('//input[@ng-model="tp.details.customer"]'), V.newCustomer);
    SF.clear(By.xpath('//input[@ng-model="tp.details.email"]'));
    SF.send(By.xpath('//input[@ng-model="tp.details.email"]'), V.newTpDeliveryEmail);
    SF.clear(By.xpath('//input[@ng-model="tp.details.phones[$index]"]'));
    SF.send(By.xpath('//input[@ng-model="tp.details.phones[$index]"]'), V.newTpDeliveryPhone1);
    V.newTpDeliveryRatePerCF = 4;
    V.newTpDeliveryVolumeCF = 120;
    V.newOrderBalance = 180;
    SF.clear(By.xpath('//input[@ng-model="tp.closing.rate_per_cf"]'));
    SF.send(By.xpath('//input[@ng-model="tp.closing.rate_per_cf"]'), V.newTpDeliveryRatePerCF);
    SF.sleep(1);
    SF.clear(By.xpath('//input[@ng-model="tp.closing.volume_cf"]'));
    SF.send(By.xpath('//input[@ng-model="tp.closing.volume_cf"]'), V.newTpDeliveryVolumeCF);
    SF.sleep(1);
    SF.clear(By.xpath('//input[@ng-model="tp.closing.order_balance"]'));
    SF.send(By.xpath('//input[@ng-model="tp.closing.order_balance"]'), V.newOrderBalance);
    SF.click(By.xpath('//div[@ng-click="addServices(tp)"]'));
    SF.waitForVisible (By.xpath('//li[contains(text(), "Parking Ticket")]'));
    SF.click(By.xpath('//th[@ng-click="removeCharge($index);"]'));
    SF.sleep(1);
    JS.click('li:contains(\\"Parking Ticket\\")');
    V.newParkingCost = 150;
    SF.clear(By.xpath('//input[@ng-model="add_extra_charge.extra_services[0].services_default_value"]'));
    SF.send(By.xpath('//input[@ng-model="add_extra_charge.extra_services[0].services_default_value"]'), V.newParkingCost);
    SF.sleep(1);
    SF.click(By.xpath('//button[contains(text(), "Ok")]'));
    SF.waitForVisible (By.xpath('//input[@ng-model="tp.closing.job_cost"]'));
    V.newTpJobCost = V.newTpDeliveryRatePerCF * V.newTpDeliveryVolumeCF;
    V.newTpTotalJob = V.newTpJobCost + V.newParkingCost;
    SF.sleep(1);
    driver.wait(driver.findElement(By.xpath('//input[@ng-model="tp.closing.job_cost"]')).getAttribute('value').then(function (text) {
        V.newCleanTpJobCost = SF.cleanPrice(text);
        VD.IWant(VD.ToEqual, V.newCleanTpJobCost, V.newTpJobCost, 'Job cost не совпали');
    }),config.timeout);
    SF.sleep(1.5);
    driver.wait(driver.findElement(By.xpath('//input[@ng-model="tp.closing.job_total"]')).getAttribute('value').then(function (text) {
        V.newCleanTpTotalJob = SF.cleanPrice(text);
        VD.IWant(VD.ToEqual, V.newCleanTpTotalJob, V.newTpTotalJob, 'Total Job не совпали');
    }),config.timeout);
    V.newTpAddress = SF.randomCifra(10);
    V.newTpZip = '90001';
    SF.send(By.xpath('//input[@ng-model="tp.details.address"]'), V.newTpAddress);
    SF.send(By.xpath('//input[@ng-model="tp.details.zip"]'), V.newTpZip);
    SF.sleep(3);
    now = new Date();
    msInDay = 86400000;
    future = new Date(now.getTime() + msInDay * 12);
    options = {month: 'short', day: '2-digit', year: 'numeric'};
    V.dateStart = (now.toLocaleDateString('en-US', options));
    V.dateEnd = (future.toLocaleDateString('en-US', options));
    SF.clear(By.xpath('//md-datepicker[@ng-model="date_from"]/div/input'));
    SF.send(By.xpath('//md-datepicker[@ng-model="date_from"]/div/input'), V.dateStart);
    SF.clear(By.xpath('//md-datepicker[@ng-model="date_to"]/div/input'));
    SF.send(By.xpath('//md-datepicker[@ng-model="date_to"]/div/input'), V.dateEnd);
    SF.click(By.xpath('//input[@ng-model="search"]'));
    SF.sleep(2);
    SF.click(By.xpath('//button[@ng-click="removeReceipt(item, $index)"]'));
    SF.sleep(1);
    SF.click(By.xpath('//button[@ng-click="openNewPayment($event)"]'));
    SF.waitForVisible (By.xpath('//input[@ng-model="payment.amount"]'));
    SF.sleep(2);
    V.newTpPayment = 300;
    SF.clear(By.xpath('//input[@ng-model="payment.amount"]'));
    SF.send(By.xpath('//input[@ng-model="payment.amount"]'), V.newTpPayment);
    SF.sleep(2);
    V.newTpToReceive = V.newTpTotalJob - V.newTpPayment - V.newOrderBalance;
    SF.click(By.xpath('//button[@ng-click="save()"]'));
    SF.waitForVisible (By.xpath('//input[@ng-model="tp.closing.to_receive"]'));
    SF.sleep(7);
    driver.wait(driver.findElement(By.xpath('//input[@ng-model="tp.closing.to_receive"]')).getAttribute('value').then(function (text) {
        V.newCleanTpToReceive = SF.cleanPrice(text);
        VD.IWant(VD.ToEqual, V.newCleanTpToReceive, V.newTpToReceive, 'to receive не совпали 3');
    }),config.timeout);
    JS.click('button[ng-click=\\"createTpDelivery()\\"]');
    SF.sleep(5);
    SF.waitForVisible (By.xpath('//div[@ng-if="item.ld_tp_delivery_id && item.ld_tp_delivery_id != null"]//span[contains(text(), "'+V.tpDeliveryJobId+'")]'));

condition.nowWeDoing = 'Проверяем сохранились ли изменения в TP Delivery';
    SF.click(By.xpath('//div[@ng-if="item.ld_tp_delivery_id && item.ld_tp_delivery_id != null"]//span[contains(text(), "'+V.tpDeliveryJobId+'")]'));
    SF.waitForVisible (By.xpath('//input[@ng-model="tp.closing.rate_per_cf"]'));
    SF.sleep(5);
    driver.wait(driver.findElement(By.xpath('//input[@ng-model="tp.closing.rate_per_cf"]')).getAttribute('value').then(function (text) {
        V.newCleanTpDeliveryRatePerCF = SF.cleanPrice(text);
        VD.IWant(VD.ToEqual, V.newCleanTpDeliveryRatePerCF, V.newTpDeliveryRatePerCF, 'Rate per cf не совпали');
    }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//input[@ng-model="tp.closing.volume_cf"]')).getAttribute('value').then(function (text) {
        VD.IWant(VD.ToEqual, text, V.newTpDeliveryVolumeCF, 'Volume cf не совпали');
    }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//input[@ng-model="tp.closing.to_receive"]')).getAttribute('value').then(function (text) {
        V.newCleanTpToReceive = SF.cleanPrice(text);
        VD.IWant(VD.ToEqual, V.newCleanTpToReceive, V.newTpToReceive, 'to receive не совпали 4');
    }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//input[@ng-model="tp.closing.job_cost"]')).getAttribute('value').then(function (text) {
        V.newCleanTpJobCost = SF.cleanPrice(text);
        VD.IWant(VD.ToEqual, V.newCleanTpJobCost, V.newTpJobCost, 'Job cost не совпали');
    }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//input[@ng-model="tp.closing.job_total"]')).getAttribute('value').then(function (text) {
        V.newCleanTpTotalJob = SF.cleanPrice(text);
        VD.IWant(VD.ToEqual, V.newCleanTpTotalJob, V.newTpTotalJob, 'Total Job не совпали');
    }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//input[@ng-model="tp.closing.tp_collected"]')).getAttribute('value').then(function (text) {
        V.newCleanColectedByUs = SF.cleanPrice(text);
        VD.IWant(VD.ToEqual, V.newCleanColectedByUs, V.newOrderBalance, 'Collected By us не совпали');
    }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//input[@ng-model="tp.closing.order_balance"]')).getAttribute('value').then(function (text) {
        V.newCleanOrderBalance = SF.cleanPrice(text);
        VD.IWant(VD.ToEqual, V.newCleanOrderBalance, V.newOrderBalance, 'Order Balance cf не совпали');
    }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//input[@ng-model="tp.delivery_job_id"]')).getAttribute('value').then(function (text) {
        VD.IWant(VD.ToEqual, text, V.tpDeliveryJobId, 'Job Id cf не совпали');
    }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//input[@ng-model="tp.details.customer"]')).getAttribute('value').then(function (text) {
        VD.IWant(VD.ToEqual, text, V.newCustomer, 'customer не совпали');
    }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//input[@ng-model="tp.details.email"]')).getAttribute('value').then(function (text) {
        VD.IWant(VD.ToEqual, text, V.newTpDeliveryEmail, 'email cf не совпали');
    }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//input[@ng-model="tp.details.phones[$index]"]')).getAttribute('value').then(function (text) {
        V.newCleanTpDeliveryPhone1 = -SF.cleanPrice(text);
        VD.IWant(VD.ToEqual, V.newCleanTpDeliveryPhone1, V.newTpDeliveryPhone1, 'Phone cf не совпали');
    }),config.timeout);
    MF.Board_LogoutAdmin ();
    condition.nowWeDoing = 'Идём клиентом на аккаунт, открываем confirmation page и проверяем, чтобы full packing отображался на странице.';
    SF.get(V.accountURL);
    LF.LoginToAccountAsClient (V.client, V.client.passwd);
    MF.Account_OpenRequest(V.requestNumber.Id);
    MF.Account_ClickViewRequest();
    MF.Account_ClickViewConfirmationPage();
    driver.wait(driver.findElement(By.xpath('//div[@ng-repeat="packing in vm.packings"]/div[5]')).getText().then(function (text) {
        text = SF.cleanPrice(text.substring(text.indexOf('$')));
        VD.IWant(VD.ToEqual, text,V.boardNumbers.Packing, 'Не отображается partial packing на confirmation page');
    }),config.timeout);
    SF.sleep(1);
    SF.endOfTest();
};
