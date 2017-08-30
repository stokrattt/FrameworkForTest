
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
    MF.WaitWhileBusy();
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

    MF.Board_OpenSideBar ();
    MF.Board_OpenCourier ();
    MF.Board_OpenSideBar ();
    LF.CreateCarrier();
    SF.click(By.xpath('//a[@ng-click="vm.goToPage(\'lddispatch.trip\', \'\')"]'));

    condition.nowWeDoing = 'Создаем Трип Foreman/Helper';
    SF.click(By.xpath('//button[@ng-click="addTrip()"]'));
    SF.waitForVisible (By.xpath('//md-select[@ng-model="trip.data.details.flag"]'));
    SF.click(By.xpath('//md-select[@ng-model="trip.data.details.flag"]'));
    SF.click(By.xpath('//div[text()="Pending"]'));
    SF.click(By.xpath('//md-select[@ng-model="type"]'));
    SF.waitForVisible (By.xpath('//div[text()="Foreman/Helper"]'));
    SF.click(By.xpath('//div[text()="Foreman/Helper"]'));

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
    SF.waitForVisible (By.xpath('//div[text()="Test Foreman"]'));
    SF.click(By.xpath('//div[text()="Test Foreman"]'));
    SF.sleep(1);
    SF.click(By.xpath('//md-select[@ng-model="trip.data.helper"]'));
    SF.waitForVisible (By.xpath('//div[text()="helper test1"]'));
    SF.click(By.xpath('//div[text()="helper test1"]'));
    SF.click(By.xpath('//div[text()="helper test2"]'));
    SF.click(By.xpath('//button[@ng-click="closeSelectBox($event)"]'));
    SF.sleep(1);

    condition.nowWeDoing = 'Сохраняем трип и добавляем работу в трип';
    driver.actions().mouseMove(driver.findElement(By.xpath('//button[@ng-click="createTrip(trip)"]'))).doubleClick().perform();
    JS.waitForNotExist('span.toast-message:visible');
    // SF.waitForVisible (By.xpath('//span[contains(text(),"Trip updated!")]'));
    SF.sleep(1);
    JS.click('span:contains(\\"Add Pickup/Delivery\\")');
    SF.waitForVisible (By.xpath('//md-datepicker[@ng-model="pickupDateFrom"]/div/input'));
    SF.clear(By.xpath('//md-datepicker[@ng-model="pickupDateFrom"]/div/input'));
    SF.send(By.xpath('//md-datepicker[@ng-model="pickupDateFrom"]/div/input'), V.dateStart);
    SF.clear(By.xpath('//md-datepicker[@ng-model="pickupDateTo"]/div/input'));
    SF.send(By.xpath('//md-datepicker[@ng-model="pickupDateTo"]/div/input'), V.dateEnd);
    SF.click(By.xpath('//input[@ng-model="search"]'));
    SF.waitForVisible (By.xpath('//md-datepicker[@ng-model="pickupDateFrom"]/div/input'));
    SF.sleep(1);

    SF.click(By.xpath('//div[contains(text(), "' + V.client.name + '")]/..//md-checkbox[@ng-model="item.a_a_selected"]/div[1]'));
    JS.click('span:contains(\\"Add requests to trip\\")');
    SF.waitForVisible (By.xpath('//md-select[@ng-model="trip.data.details.flag"]'));
    SF.sleep(2);

    condition.nowWeDoing = 'Заходим в пейрол и заполняем и сравниваем циферки для формена';
    JS.click('span:contains(\\"Closing\\")');
    SF.waitForVisible (By.xpath('//input[@ng-model="payroll.foreman.mileage_start"]'));
    SF.sleep(2);

    V.mileageStart = 12;
    V.mileageEnd = 815;
    V.mileage = V.mileageEnd - V.mileageStart;
    V.totalCollected = 1500;
    SF.clear(By.xpath('//input[@ng-model="payroll.foreman.mileage_start"]'));
    SF.send(By.xpath('//input[@ng-model="payroll.foreman.mileage_start"]'), V.mileageStart);
    SF.click(By.xpath('//input[@ng-model="search"]'));
    SF.sleep(3);
    SF.clear(By.xpath('//input[@ng-model="payroll.foreman.mileage_end"]'));
    SF.send(By.xpath('//input[@ng-model="payroll.foreman.mileage_end"]'), V.mileageEnd);
    SF.click(By.xpath('//input[@ng-model="search"]'));
    SF.sleep(3);
    SF.clear(By.xpath('//input[@ng-model="payroll.foreman.total_collected"]'));
    SF.send(By.xpath('//input[@ng-model="payroll.foreman.total_collected"]'), V.totalCollected);
    SF.click(By.xpath('//input[@ng-model="search"]'));
    SF.sleep(3);
    driver.wait(driver.findElement(By.xpath('//input[@ng-model="payroll.foreman.mileage"]')).getAttribute('value').then(function (text) {
        VD.IWant(VD.ToEqual, text, V.mileage, 'mileage не совпали');
    }),config.timeout);
    V.dailyAmount = 80;
    V.totalDays = 5;
    V.totalDaily = V.dailyAmount * V.totalDays;
    SF.clear(By.xpath('//input[@ng-model="payroll.foreman.daily_amount"]'));
    SF.send(By.xpath('//input[@ng-model="payroll.foreman.daily_amount"]'), V.dailyAmount);
    SF.click(By.xpath('//input[@ng-model="search"]'));
    SF.sleep(3);
    SF.clear(By.xpath('//input[@ng-model="payroll.foreman.total_days"]'));
    SF.send(By.xpath('//input[@ng-model="payroll.foreman.total_days"]'), V.totalDays);
    SF.click(By.xpath('//input[@ng-model="search"]'));
    SF.sleep(3);
    driver.wait(driver.findElement(By.xpath('//input[@ng-model="payroll.foreman.total_daily"]')).getAttribute('value').then(function (text) {
        V.сleanTotalDaily = SF.cleanPrice (text);
        VD.IWant(VD.ToEqual, V.сleanTotalDaily, V.totalDaily, 'total Daily не совпали');
    }),config.timeout);

    V.hourlyRate = 12;
    V.totalHours = 10;
    V.totalHourly = V.hourlyRate * V.totalHours;
    SF.clear(By.xpath('//input[@ng-model="payroll.foreman.hourly_rate"]'));
    SF.send(By.xpath('//input[@ng-model="payroll.foreman.hourly_rate"]'), V.hourlyRate);
    SF.click(By.xpath('//input[@ng-model="search"]'));
    SF.sleep(3);
    SF.clear(By.xpath('//input[@ng-model="payroll.foreman.total_hours"]'));
    SF.send(By.xpath('//input[@ng-model="payroll.foreman.total_hours"]'), V.totalHours);
    SF.click(By.xpath('//input[@ng-model="search"]'));
    SF.sleep(3);
    driver.wait(driver.findElement(By.xpath('//input[@ng-model="payroll.foreman.total_hourly"]')).getAttribute('value').then(function (text) {
        V.сleanTotalHourly = SF.cleanPrice (text);
        VD.IWant(VD.ToEqual, V.сleanTotalHourly, V.totalHourly, 'total Hourly не совпали');
    }),config.timeout);

    V.mileageRate = 5;
    V.totalMileage = V.mileage * V.mileageRate;
    SF.clear(By.xpath('//input[@ng-model="payroll.foreman.mileage_rate"]'));
    SF.send(By.xpath('//input[@ng-model="payroll.foreman.mileage_rate"]'), V.mileageRate);
    SF.click(By.xpath('//input[@ng-model="search"]'));
    SF.sleep(3);
    driver.wait(driver.findElement(By.xpath('//input[@ng-model="payroll.foreman.total_mileage"]')).getAttribute('value').then(function (text) {
        V.сleanTotalMileage = SF.cleanPrice (text);
        VD.IWant(VD.ToEqual, V.сleanTotalMileage, V.totalMileage, 'total Mileage не совпали');
    }),config.timeout);

    SF.click(By.xpath('//h2[contains(text(), "Driver Expenses")]/../following-sibling::div/button[@ng-click="addNewExpense()"]'));
    SF.sleep(2);
    V.driverExpensesAmount = 50;
    SF.click(By.xpath('//div[@ng-click="openAmountEditDialog(item)"]'));
    SF.sleep(2);
    SF.clear(By.xpath('//div[@value="item.amount"]//input[@ng-model="data.value"]'));
    SF.send(By.xpath('//div[@value="item.amount"]//input[@ng-model="data.value"]'), V.driverExpensesAmount);
    SF.click(By.xpath('//div[@value="item.amount"]//button[@ng-click="update()"]'));
    SF.sleep(1);

    SF.click(By.xpath('//h2[contains(text(), "Cash Advanced and Wires")]/../following-sibling::div/button[@ng-click="addNewExpense()"]'));
    SF.sleep(2);
    V.cashAmount = 80;
    SF.click(By.xpath('//div[@ng-click="openAmountEditDialog(item)"]/div/div[contains(text(),"$0.00")]'));
    SF.sleep(1);
    SF.clear(By.xpath('//h2[contains(text(), "Cash Advanced and Wires")]/../../following-sibling::div//div[@value="item.amount"]//input[@ng-model="data.value"]'));
    SF.send(By.xpath('//h2[contains(text(), "Cash Advanced and Wires")]/../../following-sibling::div//div[@value="item.amount"]//input[@ng-model="data.value"]'), V.cashAmount);
    SF.click(By.xpath('//h2[contains(text(), "Cash Advanced and Wires")]/../../following-sibling::div//div[@value="item.amount"]//button[@ng-click="update()"]'));
    SF.sleep(1);


    condition.nowWeDoing = 'заполняем и сравниваем циферки для хелперов';
    JS.click('md-tab-item[ng-click=\\"$mdTabsCtrl.select(tab.getIndex())\\"]:contains(\\"helper\\")');
    SF.waitForVisible (By.xpath('//div[contains(text(), "helper test1")]/following-sibling::div[@ng-click="openDailyAmountEditDialog(item)"]'));
    SF.sleep(2);
    SF.click(By.xpath('//div[contains(text(), "helper test1")]/following-sibling::div[@ng-click="openDailyAmountEditDialog(item)"]'));
    SF.sleep(2);
    V.helper1DailyAmount = 60;
    SF.clear(By.xpath('//div[@value="item.daily_amount"]//input[@ng-model="data.value"]'));
    SF.send(By.xpath('//div[@value="item.daily_amount"]//input[@ng-model="data.value"]'), V.helper1DailyAmount);
    SF.click(By.xpath('//div[@value="item.daily_amount"]//button[@ng-click="update()"]'));
    SF.sleep(4);

    // SF.click(By.xpath('//div[contains(text(), "helper test1")]/following-sibling::div[@ng-click="openTotalDaysEditDialog(item)"]'));
    // SF.sleep(2);
    // SF.clear(By.xpath('//div[@value="item.total_days"]//input[@ng-model="data.value"]'));
    // SF.send(By.xpath('//div[@value="item.total_days"]//input[@ng-model="data.value"]'), V.totalDays);
    // SF.click(By.xpath('//div[@value="item.total_days"]//button[@ng-click="update()"]'));
    // SF.sleep(4);

    SF.click(By.xpath('//div[contains(text(), "helper test1")]/following-sibling::div[@ng-click="openOtherEditDialog(item)"]'));
    SF.sleep(2);
    V.helper1Other = 30;
    SF.clear(By.xpath('//div[@value="item.other"]//input[@ng-model="data.value"]'));
    SF.send(By.xpath('//div[@value="item.other"]//input[@ng-model="data.value"]'), V.helper1Other);
    SF.click(By.xpath('//div[@value="item.other"]//button[@ng-click="update()"]'));
    SF.sleep(4);
    V.helper1Total = V.helper1DailyAmount * V.totalDays + V.helper1Other;

    SF.click(By.xpath('//div[contains(text(), "helper test2")]/following-sibling::div[@ng-click="openDailyAmountEditDialog(item)"]'));
    SF.sleep(2);
    V.helper2DailyAmount = 40;
    SF.clear(By.xpath('//div[contains(text(), "helper test2")]/following-sibling::div[@value="item.daily_amount"]//input[@ng-model="data.value"]'));
    SF.send(By.xpath('//div[contains(text(), "helper test2")]/following-sibling::div[@value="item.daily_amount"]//input[@ng-model="data.value"]'), V.helper2DailyAmount);
    SF.click(By.xpath('//div[contains(text(), "helper test2")]/following-sibling::div[@value="item.daily_amount"]//button[@ng-click="update()"]'));
    SF.sleep(4);

    // SF.click(By.xpath('//div[contains(text(), "helper test2")]/following-sibling::div[@ng-click="openTotalDaysEditDialog(item)"]'));
    // SF.sleep(2);
    // SF.clear(By.xpath('//div[contains(text(), "helper test2")]/following-sibling::div[@value="item.total_days"]//input[@ng-model="data.value"]'));
    // SF.send(By.xpath('//div[contains(text(), "helper test2")]/following-sibling::div[@value="item.total_days"]//input[@ng-model="data.value"]'), V.totalDays);
    // SF.click(By.xpath('//div[contains(text(), "helper test2")]/following-sibling::div[@value="item.total_days"]//button[@ng-click="update()"]'));
    // SF.sleep(4);

    SF.click(By.xpath('//div[contains(text(), "helper test2")]/following-sibling::div[@ng-click="openOtherEditDialog(item)"]'));
    SF.sleep(2);
    V.helper2Other = 45;
    SF.clear(By.xpath('//div[contains(text(), "helper test2")]/following-sibling::div[@value="item.other"]//input[@ng-model="data.value"]'));
    SF.send(By.xpath('//div[contains(text(), "helper test2")]/following-sibling::div[@value="item.other"]//input[@ng-model="data.value"]'), V.helper2Other);
    SF.click(By.xpath('//div[contains(text(), "helper test2")]/following-sibling::div[@value="item.other"]//button[@ng-click="update()"]'));
    SF.sleep(4);
    V.helper2Total = V.helper2DailyAmount * V.totalDays + V.helper2Other;

    condition.nowWeDoing = 'сравниваем циферки общий пейрол';

    V.totalPayroll = V.totalMileage + V.totalHourly + V.totalDaily + V.totalCollected + V.driverExpensesAmount - V.cashAmount + V.helper1Total + V.helper2Total;

    driver.wait(driver.findElement(By.xpath('//div[contains(text(),"Total Payroll:")]')).getText().then(function(text){
        V.payroll = SF.cleanPrice(text);
        VD.IWant(VD.ToEqual, V.totalPayroll, V.payroll, 'total Payroll не совпали');
    }),config.timeout);

    condition.nowWeDoing = 'Создаем Add TP Delivery, заполняем поля и проверям рассчети';
    JS.click('span:contains(\\"Add Pickup/Delivery\\")');
    SF.sleep();
    JS.click('span:contains(\\"Add TP Delivery\\")');
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
    SF.clear(By.xpath('//input[@ng-model="tp.closing.rate_per_cf"]'), V.tpDeliveryRatePerCF);
    SF.send(By.xpath('//input[@ng-model="tp.closing.rate_per_cf"]'), V.tpDeliveryRatePerCF);
    SF.sleep(1);
    SF.clear(By.xpath('//input[@ng-model="tp.closing.volume_cf"]'), V.tpDeliveryVolumeCF);
    SF.send(By.xpath('//input[@ng-model="tp.closing.volume_cf"]'), V.tpDeliveryVolumeCF);
    SF.sleep(1);
    SF.clear(By.xpath('//input[@ng-model="tp.closing.order_balance"]'), V.orderBalance);
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
    V.tpPayment = 200;
    SF.clear(By.xpath('//input[@ng-model="payment.amount"]'));
    SF.send(By.xpath('//input[@ng-model="payment.amount"]'), V.tpPayment);
    SF.sleep(1);
    V.tpToReceive = V.tpTotalJob - V.tpPayment - V.orderBalance;
    SF.click(By.xpath('//button[@ng-click="save()"]'));
    SF.waitForVisible (By.xpath('//input[@ng-model="tp.closing.to_receive"]'));
    SF.sleep(5);

    driver.wait(driver.findElement(By.xpath('//input[@ng-model="tp.closing.to_receive"]')).getAttribute('value').then(function (text) {
        V.cleanTpToReceive = SF.cleanPrice(text);
        VD.IWant(VD.ToEqual, V.cleanTpToReceive, V.tpToReceive, 'to receive не совпали');
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
    JS.click('span:contains(\\"Trip details\\")');
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
        VD.IWant(VD.ToEqual, V.cleanTpToReceive, V.tpToReceive, 'to receive не совпали');
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

    SF.endOfTest();
};
