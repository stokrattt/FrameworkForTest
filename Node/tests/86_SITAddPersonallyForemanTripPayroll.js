
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
    condition.nowWeDoing = 'Сохраняем трип и добавляем работу в трип';
    driver.actions().mouseMove(driver.findElement(By.xpath('//button[@ng-click="createTrip(trip)"]'))).doubleClick().perform();
    JS.waitForNotExist('span.toast-message:visible');
    SF.click(By.xpath('//md-tab-item[@ng-click="$mdTabsCtrl.select(tab.getIndex())"]/span[contains(text(),"Add Pickup/Delivery")]'));
    SF.waitForVisible (By.xpath('//md-datepicker[@ng-model="pickupDateFrom"]/div/input'));
    SF.clear(By.xpath('//md-datepicker[@ng-model="pickupDateFrom"]/div/input'));
    SF.send(By.xpath('//md-datepicker[@ng-model="pickupDateFrom"]/div/input'), V.dateStart);
    SF.clear(By.xpath('//md-datepicker[@ng-model="pickupDateTo"]/div/input'));
    SF.send(By.xpath('//md-datepicker[@ng-model="pickupDateTo"]/div/input'), V.dateEnd);
    SF.click(By.xpath('//input[@ng-model="search"]'));
    SF.waitForVisible (By.xpath('//md-datepicker[@ng-model="pickupDateFrom"]/div/input'));
    SF.sleep(2);
    SF.click(By.xpath('//div[contains(text(), "' + V.client.name + '")]/..//md-checkbox[@ng-model="item.a_a_selected"]/div[1]'));
    JS.click('span:contains(\\"Add requests to trip\\")');
    SF.waitForVisible (By.xpath('//md-select[@ng-model="trip.data.details.flag"]'));
    SF.sleep(2);
    MF.SIT_ChangeStatusTrip('Delivered/Closed');

    condition.nowWeDoing = 'Заходим в пейрол и заполняем и сравниваем циферки для формена';
    SF.click(By.xpath('//md-tab-item[@ng-click="$mdTabsCtrl.select(tab.getIndex())"]/span[contains(text(),"Closing")]'));
    SF.waitForVisible (By.xpath('//input[@ng-model="payroll.foreman.mileage_start"]'));
    SF.sleep(3);
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
    // SF.click(By.xpath('//div[@ng-click="openAmountEditDialog(item)"]'));
    SF.sleep(2);
    SF.click(By.xpath('//div[@ng-click="openEditDialog(item, \'amountEditDialogOpen\')"]'));
    SF.sleep(4);
    SF.clear(By.xpath('//div[@value="item.amount"]//input[@ng-model="data.value"]'));
    SF.send(By.xpath('//div[@value="item.amount"]//input[@ng-model="data.value"]'), V.driverExpensesAmount);
    SF.click(By.xpath('//div[@value="item.amount"]//button[@ng-click="update()"]'));
    SF.sleep(3);
    SF.click(By.xpath('//h2[contains(text(), "Cash Advanced and Wires")]/../following-sibling::div/button[@ng-click="addNewExpense()"]'));
    SF.sleep(2);
    V.cashAmount = 80;
    SF.click(By.xpath('//div[@ng-click="openEditDialog(item, \'amountEditDialogOpen\')"]/div/div[contains(text(),"$0.00")]'));
    SF.sleep(1);
    SF.clear(By.xpath('//h2[contains(text(), "Cash Advanced and Wires")]/../../following-sibling::div//div[@value="item.amount"]//input[@ng-model="data.value"]'));
    SF.send(By.xpath('//h2[contains(text(), "Cash Advanced and Wires")]/../../following-sibling::div//div[@value="item.amount"]//input[@ng-model="data.value"]'), V.cashAmount);
    SF.click(By.xpath('//h2[contains(text(), "Cash Advanced and Wires")]/../../following-sibling::div//div[@value="item.amount"]//button[@ng-click="update()"]'));
    SF.sleep(1);
    condition.nowWeDoing = 'заполняем и сравниваем циферки для хелперов';
    SF.click(By.xpath('//md-tab-item[@ng-click="$mdTabsCtrl.select(tab.getIndex())"]/span[contains(text(),"helper")]'));
    SF.waitForVisible (By.xpath('//div[contains(text(), "helper test1")]/following-sibling::div[@ng-click="openDailyAmountEditDialog(item)"]'));
    SF.sleep(3);
    SF.click(By.xpath('//div[contains(text(), "helper test1")]/following-sibling::div[@ng-click="openDailyAmountEditDialog(item)"]'));
    SF.sleep(2);
    V.helper1DailyAmount = 60;
    SF.clear(By.xpath('//div[@value="item.daily_amount"]//input[@ng-model="data.value"]'));
    SF.send(By.xpath('//div[@value="item.daily_amount"]//input[@ng-model="data.value"]'), V.helper1DailyAmount);
    SF.click(By.xpath('//div[@value="item.daily_amount"]//button[@ng-click="update()"]'));
    SF.sleep(4);

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

    SF.click(By.xpath('//div[contains(text(), "helper test2")]/following-sibling::div[@ng-click="openOtherEditDialog(item)"]'));
    SF.sleep(2);
    V.helper2Other = 45;
    SF.clear(By.xpath('//div[contains(text(), "helper test2")]/following-sibling::div[@value="item.other"]//input[@ng-model="data.value"]'));
    SF.send(By.xpath('//div[contains(text(), "helper test2")]/following-sibling::div[@value="item.other"]//input[@ng-model="data.value"]'), V.helper2Other);
    SF.click(By.xpath('//div[contains(text(), "helper test2")]/following-sibling::div[@value="item.other"]//button[@ng-click="update()"]'));
    SF.sleep(4);
    V.helper2Total = V.helper2DailyAmount * V.totalDays + V.helper2Other;
    condition.nowWeDoing = 'сравниваем циферки общий пейрол';
    V.totalPayroll = V.totalMileage + V.totalHourly + V.totalDaily - V.totalCollected + V.driverExpensesAmount - V.cashAmount + V.helper1Total + V.helper2Total;
    V.foremanTotal = V.totalPayroll - V.helper2Total - V.helper1Total;
    SF.sleep(2);
    driver.wait(driver.findElement(By.xpath('//div[contains(text(),"Total Payroll:")]')).getText().then(function(text){
        V.payroll = SF.cleanPrice(text);
        VD.IWant(VD.ToEqual, V.totalPayroll, V.payroll, 'total Payroll не совпали');
    }),config.timeout);
    SF.sleep(2);
    condition.nowWeDoing = 'сабмитим пейрол, виходим и заходим обратно и проверяем сохранились ли изменения';
    SF.click(By.xpath('//button[@ng-click="submitPayroll()"]'));
    SF.waitForVisible(By.xpath('//button[@ng-click="dialog.hide()"]'));
    SF.sleep(1);
    SF.click(By.xpath('//button[@ng-click="dialog.hide()"]'));
    SF.sleep(1);
    SF.click(By.xpath('//md-tab-item[@ng-click="$mdTabsCtrl.select(tab.getIndex())"]/span[contains(text(),"Trip details")]'));
    SF.waitForVisible (By.xpath('//md-select[@ng-model="trip.data.details.flag"]'));
    SF.sleep(1);

    SF.click(By.xpath('//md-tab-item[@ng-click="$mdTabsCtrl.select(tab.getIndex())"]/span[contains(text(),"Closing")]'));
    SF.waitForVisible (By.xpath('//input[@ng-model="payroll.foreman.mileage_start"]'));
    SF.sleep(3);

    driver.wait(driver.findElement(By.xpath('//input[@ng-model="payroll.foreman.mileage_start"]')).getAttribute('value').then(function (text) {
        V.сleanMileageStart = SF.cleanPrice (text);
        VD.IWant(VD.ToEqual, V.сleanMileageStart, V.mileageStart, 'mileageStart не совпали');
    }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//input[@ng-model="payroll.foreman.mileage_end"]')).getAttribute('value').then(function (text) {
        V.сleanMileageEnd = SF.cleanPrice (text);
        VD.IWant(VD.ToEqual, V.сleanMileageEnd, V.mileageEnd, 'mileageEnd не совпали');
    }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//input[@ng-model="payroll.foreman.total_collected"]')).getAttribute('value').then(function (text) {
        V.cleanTotalCollected = SF.cleanPrice (text);
        VD.IWant(VD.ToEqual, V.cleanTotalCollected, V.totalCollected, 'totalCollected не совпали');
    }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//input[@ng-model="payroll.foreman.mileage"]')).getAttribute('value').then(function (text) {
        VD.IWant(VD.ToEqual, text, V.mileage, 'mileage не совпали');
    }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//input[@ng-model="payroll.foreman.daily_amount"]')).getAttribute('value').then(function (text) {
        V.cleanDailyAmount = SF.cleanPrice (text);
        VD.IWant(VD.ToEqual, V.cleanDailyAmount, V.dailyAmount, 'dailyAmount не совпали');
    }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//input[@ng-model="payroll.foreman.total_days"]')).getAttribute('value').then(function (text) {
        V.cleanTotalDays = SF.cleanPrice (text);
        VD.IWant(VD.ToEqual, V.cleanTotalDays, V.totalDays, 'totalDays не совпали');
    }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//input[@ng-model="payroll.foreman.total_daily"]')).getAttribute('value').then(function (text) {
        V.сleanTotalDaily = SF.cleanPrice (text);
        VD.IWant(VD.ToEqual, V.сleanTotalDaily, V.totalDaily, 'total Daily не совпали');
    }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//input[@ng-model="payroll.foreman.hourly_rate"]')).getAttribute('value').then(function (text) {
        V.cleanHourlyRate = SF.cleanPrice (text);
        VD.IWant(VD.ToEqual, V.cleanHourlyRate, V.hourlyRate, 'hourlyRate не совпали');
    }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//input[@ng-model="payroll.foreman.total_hours"]')).getAttribute('value').then(function (text) {
        V.cleanTotalHours = SF.cleanPrice (text);
        VD.IWant(VD.ToEqual, V.cleanTotalHours, V.totalHours, 'totalHours не совпали');
    }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//input[@ng-model="payroll.foreman.total_hourly"]')).getAttribute('value').then(function (text) {
        V.сleanTotalHourly = SF.cleanPrice (text);
        VD.IWant(VD.ToEqual, V.сleanTotalHourly, V.totalHourly, 'total Hourly не совпали');
    }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//input[@ng-model="payroll.foreman.mileage_rate"]')).getAttribute('value').then(function (text) {
        V.сleanMileageRate = SF.cleanPrice (text);
        VD.IWant(VD.ToEqual, V.сleanMileageRate, V.mileageRate, 'mileageRate не совпали');
    }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//input[@ng-model="payroll.foreman.total_mileage"]')).getAttribute('value').then(function (text) {
        V.сleanTotalMileage = SF.cleanPrice (text);
        VD.IWant(VD.ToEqual, V.сleanTotalMileage, V.totalMileage, 'total Mileage не совпали');
    }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//div[@ng-click="openEditDialog(item, \'amountEditDialogOpen\')"]' +
        '//div[contains(text(),"'+V.driverExpensesAmount+'")]')).getText().then(function (text) {
        V.сleanDriverExpensesAmount = SF.cleanPrice (text);
        VD.IWant(VD.ToEqual, V.сleanDriverExpensesAmount, V.driverExpensesAmount, 'driverExpensesAmount не совпали');
    }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//div[@ng-click="openEditDialog(item, \'amountEditDialogOpen\')"]' +
        '//div[contains(text(),"'+V.cashAmount+'")]')).getText().then(function (text) {
        V.cleanCashAmount = SF.cleanPrice (text);
        VD.IWant(VD.ToEqual, V.cleanCashAmount, V.cashAmount, 'cashAmount не совпали');
    }),config.timeout);
    SF.click(By.xpath('//md-tab-item[@ng-click="$mdTabsCtrl.select(tab.getIndex())"]/span[contains(text(),"helper")]'));
    SF.waitForVisible (By.xpath('//div[contains(text(), "helper test1")]/following-sibling::div[@ng-click="openDailyAmountEditDialog(item)"]'));
    SF.sleep(3);
    driver.wait(driver.findElement(By.xpath('//div[contains(text(), "helper test1")]/following-sibling::div[@ng-click="openDailyAmountEditDialog(item)"]//div[contains(text(),"'+V.helper1DailyAmount+'")]')).getText().then(function (text) {
        V.cleanHelper1DailyAmount = SF.cleanPrice (text);
        VD.IWant(VD.ToEqual, V.cleanHelper1DailyAmount, V.helper1DailyAmount, 'helper1DailyAmount не совпали');
    }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//div[contains(text(), "helper test1")]/following-sibling::div[@ng-click="openOtherEditDialog(item)"]//div[contains(text(),"'+V.helper1Other+'")]')).getText().then(function (text) {
        V.cleanHelper1Other = SF.cleanPrice (text);
        VD.IWant(VD.ToEqual, V.cleanHelper1Other, V.helper1Other, 'helper1Other не совпали');
    }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//div[contains(text(), "helper test2")]/following-sibling::div[@ng-click="openDailyAmountEditDialog(item)"]//div[contains(text(),"'+V.helper2DailyAmount+'")]')).getText().then(function (text) {
        V.cleanHelper2DailyAmount = SF.cleanPrice (text);
        VD.IWant(VD.ToEqual, V.cleanHelper2DailyAmount, V.helper2DailyAmount, 'helper2DailyAmount не совпали');
    }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//div[contains(text(), "helper test2")]/following-sibling::div[@ng-click="openOtherEditDialog(item)"]//div[contains(text(),"'+V.helper2Other+'")]')).getText().then(function (text) {
        V.cleanHelper2Other = SF.cleanPrice (text);
        VD.IWant(VD.ToEqual, V.cleanHelper2Other, V.helper2Other, 'helper2Other не совпали');
    }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//div[contains(text(),"Total Payroll:")]')).getText().then(function(text){
        V.payroll = SF.cleanPrice(text);
        VD.IWant(VD.ToEqual, V.totalPayroll, V.payroll, 'total Payroll не совпали');
    }),config.timeout);
    condition.nowWeDoing = 'делаем revoke пейрола и изменяем значения';
    SF.click(By.xpath('//md-tab-item[@ng-click="$mdTabsCtrl.select(tab.getIndex())"]/span[contains(text(),"foreman")]'));
    SF.sleep(1);
    SF.click(By.xpath('//button[@ng-click="revokePayroll()"]'));
    SF.waitForVisible(By.xpath('//button[@ng-click="dialog.hide()"]'));
    SF.sleep(1);
    SF.click(By.xpath('//button[@ng-click="dialog.hide()"]'));
    SF.sleep(1);

    V.newMileageStart = 20;
    V.newMileageEnd = 610;
    V.newMileage = V.newMileageEnd - V.newMileageStart;
    V.newTotalCollected = 1550;
    SF.clear(By.xpath('//input[@ng-model="payroll.foreman.mileage_start"]'));
    SF.send(By.xpath('//input[@ng-model="payroll.foreman.mileage_start"]'), V.newMileageStart);
    SF.click(By.xpath('//input[@ng-model="search"]'));
    SF.sleep(3);
    SF.clear(By.xpath('//input[@ng-model="payroll.foreman.mileage_end"]'));
    SF.send(By.xpath('//input[@ng-model="payroll.foreman.mileage_end"]'), V.newMileageEnd);
    SF.click(By.xpath('//input[@ng-model="search"]'));
    SF.sleep(3);
    SF.clear(By.xpath('//input[@ng-model="payroll.foreman.total_collected"]'));
    SF.send(By.xpath('//input[@ng-model="payroll.foreman.total_collected"]'), V.newTotalCollected);
    SF.click(By.xpath('//input[@ng-model="search"]'));
    SF.sleep(3);
    driver.wait(driver.findElement(By.xpath('//input[@ng-model="payroll.foreman.mileage"]')).getAttribute('value').then(function (text) {
        VD.IWant(VD.ToEqual, text, V.newMileage, 'mileage не совпали');
    }),config.timeout);
    V.newDailyAmount = 60;
    V.newTotalDays = 4;
    V.newTotalDaily = V.newDailyAmount * V.newTotalDays;
    SF.clear(By.xpath('//input[@ng-model="payroll.foreman.daily_amount"]'));
    SF.send(By.xpath('//input[@ng-model="payroll.foreman.daily_amount"]'), V.newDailyAmount);
    SF.click(By.xpath('//input[@ng-model="search"]'));
    SF.sleep(3);
    SF.clear(By.xpath('//input[@ng-model="payroll.foreman.total_days"]'));
    SF.send(By.xpath('//input[@ng-model="payroll.foreman.total_days"]'), V.newTotalDays);
    SF.click(By.xpath('//input[@ng-model="search"]'));
    SF.sleep(3);
    driver.wait(driver.findElement(By.xpath('//input[@ng-model="payroll.foreman.total_daily"]')).getAttribute('value').then(function (text) {
        V.newCleanTotalDaily = SF.cleanPrice (text);
        VD.IWant(VD.ToEqual, V.newCleanTotalDaily, V.newTotalDaily, 'total Daily не совпали');
    }),config.timeout);

    V.newHourlyRate = 15;
    V.newTotalHours = 8;
    V.newTotalHourly = V.newHourlyRate * V.newTotalHours;
    SF.clear(By.xpath('//input[@ng-model="payroll.foreman.hourly_rate"]'));
    SF.send(By.xpath('//input[@ng-model="payroll.foreman.hourly_rate"]'), V.newHourlyRate);
    SF.click(By.xpath('//input[@ng-model="search"]'));
    SF.sleep(3);
    SF.clear(By.xpath('//input[@ng-model="payroll.foreman.total_hours"]'));
    SF.send(By.xpath('//input[@ng-model="payroll.foreman.total_hours"]'), V.newTotalHours);
    SF.click(By.xpath('//input[@ng-model="search"]'));
    SF.sleep(3);
    driver.wait(driver.findElement(By.xpath('//input[@ng-model="payroll.foreman.total_hourly"]')).getAttribute('value').then(function (text) {
        V.newCleanTotalHourly = SF.cleanPrice (text);
        VD.IWant(VD.ToEqual, V.newCleanTotalHourly, V.newTotalHourly, 'total Hourly не совпали');
    }),config.timeout);

    V.newMileageRate = 6;
    V.newTotalMileage = V.newMileage * V.newMileageRate;
    SF.clear(By.xpath('//input[@ng-model="payroll.foreman.mileage_rate"]'));
    SF.send(By.xpath('//input[@ng-model="payroll.foreman.mileage_rate"]'), V.newMileageRate);
    SF.click(By.xpath('//input[@ng-model="search"]'));
    SF.sleep(3);
    driver.wait(driver.findElement(By.xpath('//input[@ng-model="payroll.foreman.total_mileage"]')).getAttribute('value').then(function (text) {
        V.newCleanTotalMileage = SF.cleanPrice (text);
        VD.IWant(VD.ToEqual, V.newCleanTotalMileage, V.newTotalMileage, 'total Mileage не совпали');
    }),config.timeout);

    SF.sleep(2);
    V.newDriverExpensesAmount = 30;
    SF.click(By.xpath('//div[@ng-click="openEditDialog(item, \'amountEditDialogOpen\')"]'));
    SF.sleep(2);
    SF.clear(By.xpath('//div[@value="item.amount"]//input[@ng-model="data.value"]'));
    SF.send(By.xpath('//div[@value="item.amount"]//input[@ng-model="data.value"]'), V.newDriverExpensesAmount);
    SF.click(By.xpath('//div[@value="item.amount"]//button[@ng-click="update()"]'));
    SF.sleep(1);

    SF.sleep(2);
    V.newCashAmount = 70;
    SF.click(By.xpath('//div[@ng-click="openEditDialog(item, \'amountEditDialogOpen\')"]/div/div[contains(text(),"'+V.cashAmount+'")]'));
    SF.sleep(1);
    SF.clear(By.xpath('//h2[contains(text(), "Cash Advanced and Wires")]/../../following-sibling::div//div[@value="item.amount"]//input[@ng-model="data.value"]'));
    SF.send(By.xpath('//h2[contains(text(), "Cash Advanced and Wires")]/../../following-sibling::div//div[@value="item.amount"]//input[@ng-model="data.value"]'), V.newCashAmount);
    SF.click(By.xpath('//h2[contains(text(), "Cash Advanced and Wires")]/../../following-sibling::div//div[@value="item.amount"]//button[@ng-click="update()"]'));
    SF.sleep(1);

    SF.click(By.xpath('//md-tab-item[@ng-click="$mdTabsCtrl.select(tab.getIndex())"]/span[contains(text(),"helper")]'));
    SF.waitForVisible (By.xpath('//div[contains(text(), "helper test1")]/following-sibling::div[@ng-click="openDailyAmountEditDialog(item)"]'));
    SF.sleep(3);
    SF.click(By.xpath('//div[contains(text(), "helper test1")]/following-sibling::div[@ng-click="openDailyAmountEditDialog(item)"]'));
    SF.sleep(2);
    V.newHelper1DailyAmount = 20;
    SF.clear(By.xpath('//div[@value="item.daily_amount"]//input[@ng-model="data.value"]'));
    SF.send(By.xpath('//div[@value="item.daily_amount"]//input[@ng-model="data.value"]'), V.newHelper1DailyAmount);
    SF.click(By.xpath('//div[@value="item.daily_amount"]//button[@ng-click="update()"]'));
    SF.sleep(4);

    SF.click(By.xpath('//div[contains(text(), "helper test1")]/following-sibling::div[@ng-click="openOtherEditDialog(item)"]'));
    SF.sleep(2);
    V.newHelper1Other = 90;
    SF.clear(By.xpath('//div[@value="item.other"]//input[@ng-model="data.value"]'));
    SF.send(By.xpath('//div[@value="item.other"]//input[@ng-model="data.value"]'), V.newHelper1Other);
    SF.click(By.xpath('//div[@value="item.other"]//button[@ng-click="update()"]'));
    SF.sleep(4);
    V.newHelper1Total = V.newHelper1DailyAmount * V.newTotalDays + V.newHelper1Other;

    SF.click(By.xpath('//div[contains(text(), "helper test2")]/following-sibling::div[@ng-click="openDailyAmountEditDialog(item)"]'));
    SF.sleep(2);
    V.newHelper2DailyAmount = 70;
    SF.clear(By.xpath('//div[contains(text(), "helper test2")]/following-sibling::div[@value="item.daily_amount"]//input[@ng-model="data.value"]'));
    SF.send(By.xpath('//div[contains(text(), "helper test2")]/following-sibling::div[@value="item.daily_amount"]//input[@ng-model="data.value"]'), V.newHelper2DailyAmount);
    SF.click(By.xpath('//div[contains(text(), "helper test2")]/following-sibling::div[@value="item.daily_amount"]//button[@ng-click="update()"]'));
    SF.sleep(4);

    SF.click(By.xpath('//div[contains(text(), "helper test2")]/following-sibling::div[@ng-click="openOtherEditDialog(item)"]'));
    SF.sleep(2);
    V.newHelper2Other = 55;
    SF.clear(By.xpath('//div[contains(text(), "helper test2")]/following-sibling::div[@value="item.other"]//input[@ng-model="data.value"]'));
    SF.send(By.xpath('//div[contains(text(), "helper test2")]/following-sibling::div[@value="item.other"]//input[@ng-model="data.value"]'), V.newHelper2Other);
    SF.click(By.xpath('//div[contains(text(), "helper test2")]/following-sibling::div[@value="item.other"]//button[@ng-click="update()"]'));
    SF.sleep(4);
    V.newHelper2Total = V.newHelper2DailyAmount * V.newTotalDays + V.newHelper2Other;
    V.newTotalPayroll = V.newTotalMileage + V.newTotalHourly + V.newTotalDaily - V.newTotalCollected + V.newDriverExpensesAmount - V.newCashAmount + V.newHelper1Total + V.newHelper2Total;
    V.newForemanTotal = V.newTotalPayroll - V.newHelper2Total - V.newHelper1Total;

    driver.wait(driver.findElement(By.xpath('//div[contains(text(),"Total Payroll:")]')).getText().then(function(text){
        V.newPayroll = SF.cleanPrice(text);
        VD.IWant(VD.ToEqual, V.newTotalPayroll, V.newPayroll, 'total Payroll не совпали');
    }),config.timeout);
    condition.nowWeDoing = 'сабмитим и опять проверяем';
    SF.click(By.xpath('//button[@ng-click="submitPayroll()"]'));
    SF.waitForVisible(By.xpath('//button[@ng-click="dialog.hide()"]'));
    SF.sleep(1);
    SF.click(By.xpath('//button[@ng-click="dialog.hide()"]'));
    SF.sleep(1);
    SF.click(By.xpath('//md-tab-item[@ng-click="$mdTabsCtrl.select(tab.getIndex())"]/span[contains(text(),"Trip details")]'));
    SF.waitForVisible (By.xpath('//md-select[@ng-model="trip.data.details.flag"]'));
    SF.sleep(1);

    SF.click(By.xpath('//md-tab-item[@ng-click="$mdTabsCtrl.select(tab.getIndex())"]/span[contains(text(),"Closing")]'));
    SF.waitForVisible (By.xpath('//input[@ng-model="payroll.foreman.mileage_start"]'));
    SF.sleep(3);

    driver.wait(driver.findElement(By.xpath('//input[@ng-model="payroll.foreman.mileage_start"]')).getAttribute('value').then(function (text) {
        V.newCleanMileageStart = SF.cleanPrice (text);
        VD.IWant(VD.ToEqual, V.newCleanMileageStart, V.newMileageStart, 'mileageStart не совпали');
    }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//input[@ng-model="payroll.foreman.mileage_end"]')).getAttribute('value').then(function (text) {
        V.newCleanMileageEnd = SF.cleanPrice (text);
        VD.IWant(VD.ToEqual, V.newCleanMileageEnd, V.newMileageEnd, 'mileageEnd не совпали');
    }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//input[@ng-model="payroll.foreman.total_collected"]')).getAttribute('value').then(function (text) {
        V.newCleanTotalCollected = SF.cleanPrice (text);
        VD.IWant(VD.ToEqual, V.newCleanTotalCollected, V.newTotalCollected, 'totalCollected не совпали');
    }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//input[@ng-model="payroll.foreman.mileage"]')).getAttribute('value').then(function (text) {
        VD.IWant(VD.ToEqual, text, V.newMileage, 'mileage не совпали');
    }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//input[@ng-model="payroll.foreman.daily_amount"]')).getAttribute('value').then(function (text) {
        V.newCleanDailyAmount = SF.cleanPrice (text);
        VD.IWant(VD.ToEqual, V.newCleanDailyAmount, V.newDailyAmount, 'dailyAmount не совпали');
    }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//input[@ng-model="payroll.foreman.total_days"]')).getAttribute('value').then(function (text) {
        V.newCleanTotalDays = SF.cleanPrice (text);
        VD.IWant(VD.ToEqual, V.newCleanTotalDays, V.newTotalDays, 'totalDays не совпали');
    }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//input[@ng-model="payroll.foreman.total_daily"]')).getAttribute('value').then(function (text) {
        V.newCleanTotalDaily = SF.cleanPrice (text);
        VD.IWant(VD.ToEqual, V.newCleanTotalDaily, V.newTotalDaily, 'total Daily не совпали');
    }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//input[@ng-model="payroll.foreman.hourly_rate"]')).getAttribute('value').then(function (text) {
        V.newCleanHourlyRate = SF.cleanPrice (text);
        VD.IWant(VD.ToEqual, V.newCleanHourlyRate, V.newHourlyRate, 'hourlyRate не совпали');
    }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//input[@ng-model="payroll.foreman.total_hours"]')).getAttribute('value').then(function (text) {
        V.newCleanTotalHours = SF.cleanPrice (text);
        VD.IWant(VD.ToEqual, V.newCleanTotalHours, V.newTotalHours, 'totalHours не совпали');
    }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//input[@ng-model="payroll.foreman.total_hourly"]')).getAttribute('value').then(function (text) {
        V.newCleanTotalHourly = SF.cleanPrice (text);
        VD.IWant(VD.ToEqual, V.newCleanTotalHourly, V.newTotalHourly, 'total Hourly не совпали');
    }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//input[@ng-model="payroll.foreman.mileage_rate"]')).getAttribute('value').then(function (text) {
        V.newCleanMileageRate = SF.cleanPrice (text);
        VD.IWant(VD.ToEqual, V.newCleanMileageRate, V.newMileageRate, 'mileageRate не совпали');
    }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//input[@ng-model="payroll.foreman.total_mileage"]')).getAttribute('value').then(function (text) {
        V.newCleanTotalMileage = SF.cleanPrice (text);
        VD.IWant(VD.ToEqual, V.newCleanTotalMileage, V.newTotalMileage, 'total Mileage не совпали');
    }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//div[@ng-click="openEditDialog(item, \'amountEditDialogOpen\')"]//div[contains(text(),"'+V.newDriverExpensesAmount+'")]')).getText().then(function (text) {
        V.newCleanDriverExpensesAmount = SF.cleanPrice (text);
        VD.IWant(VD.ToEqual, V.newCleanDriverExpensesAmount, V.newDriverExpensesAmount, 'driverExpensesAmount не совпали');
    }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//div[@ng-click="openEditDialog(item, \'amountEditDialogOpen\')"]//div[contains(text(),"'+V.newCashAmount+'")]')).getText().then(function (text) {
        V.newCleanCashAmount = SF.cleanPrice (text);
        VD.IWant(VD.ToEqual, V.newCleanCashAmount, V.newCashAmount, 'cashAmount не совпали');
    }),config.timeout);
    SF.click(By.xpath('//md-tab-item[@ng-click="$mdTabsCtrl.select(tab.getIndex())"]/span[contains(text(),"helper")]'));
    SF.waitForVisible (By.xpath('//div[contains(text(), "helper test1")]/following-sibling::div[@ng-click="openDailyAmountEditDialog(item)"]'));
    SF.sleep(3);
    driver.wait(driver.findElement(By.xpath('//div[contains(text(), "helper test1")]/following-sibling::div[@ng-click="openDailyAmountEditDialog(item)"]//div[contains(text(),"'+V.newHelper1DailyAmount+'")]')).getText().then(function (text) {
        V.newCleanHelper1DailyAmount = SF.cleanPrice (text);
        VD.IWant(VD.ToEqual, V.newCleanHelper1DailyAmount, V.newHelper1DailyAmount, 'new helper1DailyAmount не совпали');
    }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//div[contains(text(), "helper test1")]/following-sibling::div[@ng-click="openOtherEditDialog(item)"]//div[contains(text(),"'+V.newHelper1Other+'")]')).getText().then(function (text) {
        V.newCleanHelper1Other = SF.cleanPrice (text);
        VD.IWant(VD.ToEqual, V.newCleanHelper1Other, V.newHelper1Other, 'new helper1Other не совпали');
    }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//div[contains(text(), "helper test2")]/following-sibling::div[@ng-click="openDailyAmountEditDialog(item)"]//div[contains(text(),"'+V.newHelper2DailyAmount+'")]')).getText().then(function (text) {
        V.newCleanHelper2DailyAmount = SF.cleanPrice (text);
        VD.IWant(VD.ToEqual, V.newCleanHelper2DailyAmount, V.newHelper2DailyAmount, 'new helper2DailyAmount не совпали');
    }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//div[contains(text(), "helper test2")]/following-sibling::div[@ng-click="openOtherEditDialog(item)"]//div[contains(text(),"'+V.newHelper2Other+'")]')).getText().then(function (text) {
        V.newCleanHelper2Other = SF.cleanPrice (text);
        VD.IWant(VD.ToEqual, V.newCleanHelper2Other, V.newHelper2Other, 'new helper2Other не совпали');
    }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//div[contains(text(),"Total Payroll:")]')).getText().then(function(text){
        V.newPayroll = SF.cleanPrice(text);
        VD.IWant(VD.ToEqual, V.newTotalPayroll, V.newPayroll, 'new total Payroll не совпали');
    }),config.timeout);
    SF.sleep(2);


    SF.endOfTest();
};
