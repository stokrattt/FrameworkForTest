
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

condition.nowWeDoing = 'тут идем в настройки лонг дистанса и создадим driver expense and cash advanced';
    V.driverExpense = SF.randomBukva(6) + '_driver';
    V.cashWires = SF.randomBukva(6) + '_cash';
    MF.Board_OpenSettingsGeneral ();
    MF.Board_OpenSettingsLongDistance ();
    SF.click(By.xpath('//li[@ng-repeat="tab in vm.tabs"][7]'));
    SF.sleep(0.5);
    SF.click(By.xpath('//button[@ng-click="data.addExpenses = true"]'));
    SF.click(By.xpath('//input[@ng-model="newExpenses.amount"]'));
    SF.send(By.xpath('//input[@ng-model="newExpenses.amount"]'), 20);
    SF.click(By.xpath('//input[@ng-model="newExpenses.description"]'));
    SF.send(By.xpath('//input[@ng-model="newExpenses.description"]'), V.driverExpense);
    SF.click(By.xpath('//button[@ng-click="saveNewItem(\'expenses\', newExpenses)"]'));
    SF.sleep(2);
    SF.click(By.xpath('//a[contains(text(), "Cash Advanced and Wires")]'));

    SF.sleep(0.5);
    SF.click(By.xpath('//button[@ng-click="data.addCash = true"]'));
    SF.click(By.xpath('//input[@ng-model="newCash.amount"]'));
    SF.send(By.xpath('//input[@ng-model="newCash.amount"]'), 40);
    SF.click(By.xpath('//input[@ng-model="newCash.description"]'));
    SF.send(By.xpath('//input[@ng-model="newCash.description"]'), V.cashWires);
    SF.click(By.xpath('//button[@ng-click="saveNewItem(\'cash\', newCash)"]'));
    SF.sleep(2);
    MF.Board_OpenCourier ();
    MF.Board_OpenSideBar ();
    V.carrierNew = {};

condition.nowWeDoing = 'Создаем карьера';
    LF.SIT_CreateCarrier(V.carrierNew);
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
    LF.SIT_SetDateTripForemanHelper(4);
    V.notes = SF.randomBukva(25) + '_t';
    SF.send (By.xpath('//textarea[@ng-model="trip.data.note"]'), V.notes);
    SF.click(By.xpath('//md-select[@ng-model="trip.data.foreman"]'));
    V.foremanName = 'Test Foreman';
    SF.sleep(1);
    SF.click(By.xpath('//md-option[@ng-repeat="item in foremen"]/div[text()="'+V.foremanName+'"]'));
    SF.sleep(1.5);
    SF.click(By.xpath('//md-select[@ng-model="trip.data.helper"]'));
    SF.waitForVisible (By.xpath('//div[text()="helper test1"]'));
    SF.click(By.xpath('//div[text()="helper test1"]'));
    SF.click(By.xpath('//div[text()="helper test2"]'));
    SF.click(By.xpath('//button[@ng-click="closeSelectBox($event)"]'));
    SF.sleep(1);

condition.nowWeDoing = 'Сохраняем трип и добавляем работу в трип';
    driver.actions().mouseMove(driver.findElement(By.xpath('//button[@ng-click="createTrip(trip)"]'))).doubleClick().perform();
    JS.waitForNotExist('span.toast-message:visible');
    SF.sleep(1);
    SF.click(By.xpath('//md-tab-item[@ng-click="$mdTabsCtrl.select(tab.getIndex())"]/span[contains(text(),"Add Pickup/Delivery")]'));
    SF.waitForVisible (By.xpath('//md-datepicker[@ng-model="pickupDateFrom"]/div/input'));
    SF.clear(By.xpath('//md-datepicker[@ng-model="pickupDateFrom"]/div/input'));
    SF.send(By.xpath('//md-datepicker[@ng-model="pickupDateFrom"]/div/input'), V.dateStart);
    SF.clear(By.xpath('//md-datepicker[@ng-model="pickupDateTo"]/div/input'));
    SF.send(By.xpath('//md-datepicker[@ng-model="pickupDateTo"]/div/input'), V.dateEnd);
    SF.click(By.xpath('//input[@ng-model="search"]'));
    SF.waitForVisible (By.xpath('//md-datepicker[@ng-model="pickupDateFrom"]/div/input'));
    SF.sleep(3);
    SF.click(By.xpath('//div[contains(text(), "' + V.client.name + '")]/..//md-checkbox[@ng-model="item.a_a_selected"]/div[1]'));
    JS.click('span:contains(\\"Add requests to trip\\")');
    SF.waitForVisible (By.xpath('//md-select[@ng-model="trip.data.details.flag"]'));
    SF.sleep(2);
    MF.SIT_ChangeStatusTrip('Delivered/Closed');

condition.nowWeDoing = 'Заходим в пейрол и заполняем и сравниваем циферки для формена';
    SF.click(By.xpath('//md-tab-item[@ng-click="$mdTabsCtrl.select(tab.getIndex())"]/span[contains(text(),"Closing")]'));
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
    SF.sleep(3);


condition.nowWeDoing = 'а тут добавим наши созданные driver expense and cash wires';
    SF.click(By.xpath('//button[@ng-click="addExpenses(event)"]'));
    SF.sleep(3);
    driver.wait(driver.findElement(By.xpath('//div[@ng-repeat="item in expensesDialogItem track by $index"]/div[contains(text(),"' + V.driverExpense + '")]')).getText().then(function (text) {
        VD.IWant(VD.ToEqual, text, V.driverExpense, 'не нашло наш созданный driver expense');
    }),config.timeout);
    SF.click(By.xpath('//div[@ng-repeat="item in expensesDialogItem track by $index"]/div[1]'));
    SF.click(By.xpath('//button[@ng-click="add()"]'));
    SF.sleep(2);

    SF.click(By.xpath('//h2[contains(text(), "Cash Advanced and Wires")]/../following-sibling::div/button[@ng-click="addExpenses(event)"]'));
    SF.sleep(2);
    driver.wait(driver.findElement(By.xpath('//div[@ng-repeat="item in expensesDialogItem track by $index"]/div[contains(text(),"' + V.cashWires + '")]')).getText().then(function (text) {
        VD.IWant(VD.ToEqual, text, V.cashWires, 'не нашло наш созданный cash wires');
    }),config.timeout);
    SF.click(By.xpath('//div[@ng-repeat="item in expensesDialogItem track by $index"]/div[1]'));
    SF.click(By.xpath('//button[@ng-click="add()"]'));
    SF.sleep(3);

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
    V.totalPayroll = V.totalMileage + V.totalHourly + V.totalDaily - V.totalCollected + 20 + V.driverExpensesAmount - 40 - V.cashAmount + V.helper1Total + V.helper2Total;
    V.foremanTotal = V.totalPayroll - V.helper2Total - V.helper1Total;
    driver.wait(driver.findElement(By.xpath('//div[contains(text(),"Total Payroll:")]')).getText().then(function(text){
        V.payroll = SF.cleanPrice(text);
        VD.IWant(VD.ToEqual, V.totalPayroll, V.payroll, 'total Payroll не совпали');
    }),config.timeout);
    SF.click(By.xpath('//button[@ng-click="submitPayroll()"]'));
    SF.waitForVisible(By.xpath('//button[@ng-click="dialog.hide()"]'));
    SF.sleep(1);
    SF.click(By.xpath('//button[@ng-click="dialog.hide()"]'));
    SF.sleep(1);

condition.nowWeDoing = 'сравниваем циферки c большим пейролом';
    MF.Board_OpenPayroll();
    LF.selectDateInPayroll(V.boardNumbers.moveDate);
    LF.findTestForemanInPayroll(V.foremanName);
    SF.waitForVisible(By.xpath('//td[contains(text(), "'+V.tripId+'")]'));
    SF.sleep(1);
    driver.wait(driver.findElement(By.xpath('//td[contains(text(), "'+V.tripId+'")]/../td[9]')).getText().then(function(text){
        V.grandTotalPayroll = SF.cleanPrice(text);
        VD.IWant(VD.ToEqual, V.grandTotalPayroll, V.payroll, 'total Payroll не совпали в большом пейроле');
    }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//td[contains(text(), "'+V.tripId+'")]/../td[10]')).getText().then(function(text){
        V.hours = SF.cleanPrice(text);
        VD.IWant(VD.ToEqual, V.hours, V.totalHours, 'hours не совпали в большом пейроле');
    }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//td[contains(text(), "'+V.tripId+'")]/../td[11]')).getText().then(function(text){
        V.totalHourlyPayroll = SF.cleanPrice(text);
        VD.IWant(VD.ToEqual, V.totalHourlyPayroll, V.totalHourly, 'total hourly rate не совпали в большом пейроле');
    }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//td[contains(text(), "'+V.tripId+'")]/../td[last()]')).getText().then(function(text){
        V.totalForemanPayroll = SF.cleanPrice(text);
        VD.IWant(VD.ToEqual, V.totalForemanPayroll, V.foremanTotal, 'зарплата форемана в большом пейроле');
    }),config.timeout);
    MF.Payroll_ClickAllDepartment();
    LF.findHelperInPayroll('helper test1');
    driver.wait(driver.findElement(By.xpath('//td[contains(text(), "'+V.tripId+'")]/../td[9]')).getText().then(function(text){
        V.grandTotalPayroll = SF.cleanPrice(text);
        VD.IWant(VD.ToEqual, V.grandTotalPayroll, V.payroll, 'total Payroll не совпали в большом пейроле');
    }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//td[contains(text(), "'+V.tripId+'")]/../td[last()]')).getText().then(function(text){
        V.helper1TotalPayroll = SF.cleanPrice(text);
        VD.IWant(VD.ToEqual, V.helper1TotalPayroll, V.helper1Total, 'зарплата helper1 в большом пейроле');
    }),config.timeout);
    MF.Payroll_ClickAllDepartment();
    LF.findHelperInPayroll('helper test2');
    driver.wait(driver.findElement(By.xpath('//td[contains(text(), "'+V.tripId+'")]/../td[9]')).getText().then(function(text){
        V.grandTotalPayroll = SF.cleanPrice(text);
        VD.IWant(VD.ToEqual, V.grandTotalPayroll, V.payroll, 'total Payroll не совпали в большом пейроле');
    }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//td[contains(text(), "'+V.tripId+'")]/../td[last()]')).getText().then(function(text){
        V.helper2TotalPayroll = SF.cleanPrice(text);
        VD.IWant(VD.ToEqual, V.helper2TotalPayroll, V.helper2Total, 'зарплата helper1 в большом пейроле');
    }),config.timeout);
    SF.sleep(1);

condition.nowWeDoing = 'тут идем в настройки лонг дистанса и удалим driver expense and cash advanced';
    MF.Board_OpenSideBar();
    MF.Board_OpenSettingsGeneral ();
    MF.Board_OpenSettingsLongDistance ();
    SF.click(By.xpath('//li[@ng-repeat="tab in vm.tabs"][7]'));
    SF.sleep(0.5);
    SF.click(By.xpath('//div[@ng-click="removeItem(\'expenses\', $index)"]'));
    SF.sleep(1);
    SF.click(By.xpath('//a[contains(text(), "Cash Advanced and Wires")]'));
    SF.sleep(0.5);
    SF.click(By.xpath('//div[@ng-click="removeItem(\'cash\', $index)"]'));
    SF.sleep(1);

    SF.endOfTest();
};
