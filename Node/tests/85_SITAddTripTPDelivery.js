
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
    MF.EditRequest_SetToConfirmed();
    V.boardNumbers = {};
    LF.RememberDigitsRequestBoard(V.boardNumbers);
    SF.select(By.xpath('//select[@id="edit-service"]'), 7);
    SF.sleep(1);
    JS.step(JSstep.selectTruck(5));
    MF.WaitWhileBusy();
    V.perCubicFeet = '5';
    MF.EditRequest_SendRateForLD (V.perCubicFeet);
    MF.ConfirmCalculatorOff();
    MF.EditRequest_SetAdressToFrom();
    MF.EditRequest_SaveChanges();
    driver.wait(driver.findElement(By.xpath('//label[contains(text(),"Balance:")]/..//div')).getText().then(function(text){
        V.tpCollected = SF.cleanPrice(text);
    }),config.timeout);
    SF.sleep(1);
    LF.closeEditRequest ();
    MF.Board_OpenSideBar ();
    MF.Board_OpenCourier ();
    MF.Board_OpenSideBar ();
    LF.CreateCarrier();
    MF.Board_ClickLongDistanceDispach();

condition.nowWeDoing = 'Создаем Трип Foreman/Helper';
    MF.SIT_ClickAddTrip();
    MF.SIT_ChangeStatusTrip('Pending');
    SF.click(By.xpath('//md-select[@ng-model="type"]'));
    SF.waitForVisible (By.xpath('//div[text()="Foreman/Helper"]'));
    SF.click(By.xpath('//div[text()="Foreman/Helper"]'));
    driver.wait(driver.findElement(By.xpath('//h3[contains(text(),"Trip Info #")]')).getText().then(function(text){
        V.tripId = SF.cleanPrice(text);
    }),config.timeout);
    V.internalCode = SF.randomCifra(10);
    V.decription = SF.randomBukva(6) + '_t';
    SF.send (By.xpath('//textarea[@ng-model="trip.data.details.description"]'), V.decription);
    SF.send (By.xpath('//input[@ng-model="trip.data.details.internal_code"]'), V.internalCode);
    now = new Date();
    msInDay = 86400000;
    future = new Date(now.getTime() + msInDay * 10);
    options = { month: 'numeric', day: 'numeric', year: 'numeric' };
    V.dateStart = (now.toLocaleDateString('en-US', options));
    V.dateEnd = (future.toLocaleDateString('en-US', options));
    SF.clear(By.xpath('//md-datepicker[@ng-model="trip.data.details.start"]/div/input'));
    SF.send(By.xpath('//md-datepicker[@ng-model="trip.data.details.start"]/div/input'), V.dateStart);
    SF.clear(By.xpath('//md-datepicker[@ng-model="trip.data.details.end"]/div/input'));
    SF.send(By.xpath('//md-datepicker[@ng-model="trip.data.details.end"]/div/input'), V.dateEnd);
    SF.click(By.xpath('//input[@ng-model="search"]'));
    SF.sleep(2);
    V.notes = SF.randomBukva(25) + '_t';
    SF.send (By.xpath('//textarea[@ng-model="trip.data.note"]'), V.notes);
    SF.click(By.xpath('//md-select[@ng-model="trip.data.foreman"]'));
    SF.waitForVisible (By.xpath('//div[text()="'+V.foremanName+'"]'));
    SF.click(By.xpath('//div[text()="'+V.foremanName+'"]'));
    SF.sleep(1);
    SF.click(By.xpath('//md-select[@ng-model="trip.data.helper"]'));
    SF.waitForVisible (By.xpath('//div[text()="helper test1"]'));
    SF.click(By.xpath('//div[text()="helper test1"]'));
    SF.click(By.xpath('//div[text()="helper test2"]'));
    SF.click(By.xpath('//button[@ng-click="closeSelectBox($event)"]'));
    SF.sleep(1);

condition.nowWeDoing = 'Создаем TP Delivery, заполняем поля и проверям рассчети';
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
    SF.sleep(1);
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
    options = { month: 'numeric', day: 'numeric', year: 'numeric' };
    V.dateStart = (now.toLocaleDateString('en-US', options));
    V.dateEnd = (future.toLocaleDateString('en-US', options));
    SF.clear(By.xpath('//md-datepicker[@ng-model="date_from"]/div/input'));
    SF.send(By.xpath('//md-datepicker[@ng-model="date_from"]/div/input'), V.dateStart);
    SF.clear(By.xpath('//md-datepicker[@ng-model="date_to"]/div/input'));
    SF.send(By.xpath('//md-datepicker[@ng-model="date_to"]/div/input'), V.dateEnd);
    SF.click(By.xpath('//input[@ng-model="search"]'));
    SF.sleep(2);
    SF.click(By.xpath('//button[@ng-click="openNewPayment($event, 0, tpId, [tpId], 1)"]'));
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
    SF.sleep(2);

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

condition.nowWeDoing = 'Редактируем TP Delivery, заполняем поля и проверям рассчети';
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
    driver.wait(driver.findElement(By.xpath('//input[@ng-model="tp.closing.job_total"]')).getAttribute('value').then(function (text) {
        V.newCleanTpTotalJob = SF.cleanPrice(text);
        VD.IWant(VD.ToEqual, V.newCleanTpTotalJob, V.newTpTotalJob, 'Total Job не совпали');
    }),config.timeout);
    Debug.pause();
    V.newTpAddress = SF.randomCifra(10);
    V.newTpZip = '90001';
    SF.send(By.xpath('//input[@ng-model="tp.details.address"]'), V.newTpAddress);
    SF.send(By.xpath('//input[@ng-model="tp.details.zip"]'), V.newTpZip);
    SF.sleep(3);
    now = new Date();
    msInDay = 86400000;
    future = new Date(now.getTime() + msInDay * 12);
    options = { month: 'numeric', day: 'numeric', year: 'numeric' };
    V.dateStart = (now.toLocaleDateString('en-US', options));
    V.dateEnd = (future.toLocaleDateString('en-US', options));
    SF.clear(By.xpath('//md-datepicker[@ng-model="date_from"]/div/input'));
    SF.send(By.xpath('//md-datepicker[@ng-model="date_from"]/div/input'), V.dateStart);
    SF.clear(By.xpath('//md-datepicker[@ng-model="date_to"]/div/input'));
    SF.send(By.xpath('//md-datepicker[@ng-model="date_to"]/div/input'), V.dateEnd);
    SF.click(By.xpath('//input[@ng-model="search"]'));
    SF.sleep(2);
    SF.click(By.xpath('//button[@    ng-click="removeReceipt(item, $index)"]'));
    SF.sleep(1);
    SF.click(By.xpath('//button[@ng-click="openNewPayment($event, 0, tpId, [tpId], 1)"]'));
    SF.waitForVisible (By.xpath('//input[@ng-model="payment.amount"]'));
    SF.sleep(2);
    V.newTpPayment = 300;
    SF.clear(By.xpath('//input[@ng-model="payment.amount"]'));
    SF.send(By.xpath('//input[@ng-model="payment.amount"]'), V.newTpPayment);
    SF.sleep(2);
    V.newTpToReceive = V.newTpTotalJob - V.newTpPayment - V.newOrderBalance;
    SF.click(By.xpath('//button[@ng-click="save()"]'));
    SF.waitForVisible (By.xpath('//input[@ng-model="tp.closing.to_receive"]'));
    SF.sleep(5);
    driver.wait(driver.findElement(By.xpath('//input[@ng-model="tp.closing.to_receive"]')).getAttribute('value').then(function (text) {
        V.newCleanTpToReceive = SF.cleanPrice(text);
        VD.IWant(VD.ToEqual, V.newCleanTpToReceive, V.newTpToReceive, 'to receive не совпали 3');
    }),config.timeout);
    JS.click('button[ng-click=\\"createTpDelivery()\\"]');
    SF.sleep(5);
    SF.waitForVisible (By.xpath('//div[@ng-if="item.ld_tp_delivery_id && item.ld_tp_delivery_id != null"]//span[contains(text(), "'+V.tpDeliveryJobId+'")]'));
    SF.sleep(2);

condition.nowWeDoing = 'Проверяем сохранились ли изменения в TP Delivery';
    SF.click(By.xpath('//div[@ng-if="item.ld_tp_delivery_id && item.ld_tp_delivery_id != null"]//span[contains(text(), "'+V.tpDeliveryJobId+'")]'));
    SF.waitForVisible (By.xpath('//input[@ng-model="tp.closing.rate_per_cf"]'));
    SF.sleep(2);
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
    SF.sleep(1);
    SF.endOfTest();
};
