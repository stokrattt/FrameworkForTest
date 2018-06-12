module.exports = function main(SF, JS, MF, LF, JSstep, VD, V, By, until,FileDetector, system, condition, config,constants) {
    global.fiber = Fiber.current;
    V.client = {};
    V.client.name = SF.randomBukva(6) + '_t';
    V.client.fam = SF.randomBukva(6) + '_t';
    V.client.phone = SF.randomCifra(10);
    V.client.email = SF.randomBukvaSmall(6) + '@' + SF.randomBukvaSmall(4) + '.tes';
    V.client.passwd = 123;

    //=========================начинаем писать тест=============================
    SF.get(V.adminURL);
    LF.LoginToBoardAsCustom(V.adminLogin,V.adminPassword);

condition.nowWeDoing = 'идем в настройки фуела и добавляем две строки fuel by mileage';
    MF.Board_OpenSettingsGeneral();
    MF.BoardSettings_ClickFuelSurcharge();
    JS.scroll ('a[ng-click="vm.select(tab)"]:contains("Basic")');
    SF.sleep(2);
    driver.wait(driver.executeScript("return $('tr[ng-repeat=\"(index, amount) in vm.surcharge\"]').length").then(function (check) {
        V.FuelMileage = check;
    }),config.timeout);
    SF.sleep(1);
    if (V.FuelMileage != 0) {
        for (let i=0; i < V.FuelMileage; i++) {
            SF.click (By.xpath('//div[@ng-click="vm.removeSurcharge(index)"]/i'));
            MF.SweetConfirm ();
            SF.sleep(1);
        }
    }
    SF.click(By.xpath('//button[@ng-click="vm.addNewSurcharge(); vm.addSurcharge = true"]'));
    SF.send(By.xpath('//input[@ng-model="vm.newSurcharge.from"]'), 60);
    SF.send(By.xpath('//input[@ng-model="vm.newSurcharge.to"]'), 100);
    SF.clear (By.xpath('//input[@ng-model="vm.newSurcharge.amount"]'));
    SF.send (By.xpath('//input[@ng-model="vm.newSurcharge.amount"]'), 500);
    SF.sleep(1);
    SF.click(By.xpath('//button[@ng-click="vm.saveNewSurcharge();"]'));
    SF.sleep(0.5);
    SF.click(By.xpath('//button[@ng-click="vm.addNewSurcharge(); vm.addSurcharge = true"]'));
    SF.send(By.xpath('//tr[@ng-if="vm.addSurcharge"]//input[@ng-model="vm.newSurcharge.from"]'), 100);
    SF.send(By.xpath('//tr[@ng-if="vm.addSurcharge"]//input[@ng-model="vm.newSurcharge.to"]'), 140);
    SF.clear (By.xpath('//tr[@ng-if="vm.addSurcharge"]//input[@ng-model="vm.newSurcharge.amount"]'));
    SF.send (By.xpath('//tr[@ng-if="vm.addSurcharge"]//input[@ng-model="vm.newSurcharge.amount"]'), 800);
    SF.sleep(1);
    SF.click(By.xpath('//button[@ng-click="vm.saveNewSurcharge();"]'));
    SF.sleep(5);
    MF.Board_Refresh ();

condition.nowWeDoing = 'создаем локал мув где расстояние будет от 60 до 100 миль';
    MF.Board_ClickCreate();
    MF.CreateRequest_SelectServiceType(1);
    MF.CreateRequest_ClickMoveDateInput();
    V.request = {};
    driver.wait(driver.executeScript(JSstep.Click4DaysCalendar).then(function (calDate) {
        V.request.moveDate = calDate;
    }),config.timeout);
    SF.sleep(0.5);
    MF.CreateRequest_SelectExtraRooms(1);
    driver.wait(driver.findElement(By.xpath('//input[@ng-model="editrequest.data.field_date"]')).getAttribute("value").then(function(mdate){
        V.request.mdate = (mdate);
    }),config.timeout);
    MF.CreateRequest_SendZipToZipFrom('02121','01452');
    MF.CreateRequest_ClickCalculate();
    MF.CreateRequest_ClickContinue();
    MF.CreateRequest_SendClientInfo(V.client);
    MF.CreateRequest_ClickCreate();
    V.boardNumbers60_100 = {};
    LF.RememberDigitsRequestBoard (V.boardNumbers60_100);
    SF.sleep(1);
    VD.IWant (VD.ToEqual, V.boardNumbers60_100.Fuel, 500, 'не совпал фуел с выставленными настройками на 60 - 100 миль');

condition.nowWeDoing = 'меняем зип код в реквесте, чтобы расстояние было в промежутке 100 - 140 миль и проверяем фуель';
    MF.EditRequest_ChangeZipCodeDestinationTo("01247");
    SF.sleep(10);
    MF.EditRequest_SetAdressToFrom ();
    SF.sleep(8);
    MF.EditRequest_SaveChanges ();
    SF.sleep(3);
    V.boardNumbers100_140 = {};
    LF.RememberDigitsRequestBoard_Down (V.boardNumbers100_140);
    SF.sleep(0.5);
    VD.IWant (VD.ToEqual, V.boardNumbers100_140.Fuel, 800, 'не совпал фуел с выставленными настройками на 100 - 140 миль');
    LF.closeEditRequest ();

condition.nowWeDoing = 'идем на дашборд, открываем реквест и проверяем что там осталось 800 дол';
    MF.Board_OpenDashboard ();
    JS.scroll ('div[ng-click=\"vm.select(0)\"]');
    SF.sleep(0.5);
    MF.Board_OpenRequest (V.boardNumbers60_100.Id);
    V.boardNumbers100_140Last = {};
    LF.RememberDigitsRequestBoard_Down (V.boardNumbers100_140Last);
    SF.sleep(1);
    VD.IWant (VD.ToEqual, V.boardNumbers100_140Last.Fuel, 800, 'не совпал фуел с выставленными настройками на 100 - 140 миль, когда второй раз открываем реквест');
    SF.sleep(1);

    //=========================закончили писать тест=============================
    SF.endOfTest();
};
