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
    SF.click(By.linkText('Fuel Surcharge'));
    SF.sleep (2);
    driver.wait(driver.executeScript("return $('tr[ng-repeat=\"(index, amount) in vm.surcharge\"]').length").then(function (check) {
        V.FuelMileage = check;
        console.log(V.FuelMileage);
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
    SF.click(By.xpath('//button[@ng-click="vm.saveNewSurcharge(); "]'));
    SF.sleep(0.5);
    SF.click(By.xpath('//button[@ng-click="vm.addNewSurcharge(); vm.addSurcharge = true"]'));
    SF.send(By.xpath('//tr[@ng-if="vm.addSurcharge"]//input[@ng-model="vm.newSurcharge.from"]'), 100);
    SF.send(By.xpath('//tr[@ng-if="vm.addSurcharge"]//input[@ng-model="vm.newSurcharge.to"]'), 140);
    SF.clear (By.xpath('//tr[@ng-if="vm.addSurcharge"]//input[@ng-model="vm.newSurcharge.amount"]'));
    SF.send (By.xpath('//tr[@ng-if="vm.addSurcharge"]//input[@ng-model="vm.newSurcharge.amount"]'), 800);
    SF.click(By.xpath('//button[@ng-click="vm.saveNewSurcharge(); "]'));
    SF.sleep(3);

condition.nowWeDoing = 'создаем локал мув где расстояние будет от 60 до 100 миль';
    SF.click(By.linkText('Create Request'));
    SF.sleep(2);
    SF.click(By.xpath('//div[@class="step1"]//select[@name="move_service_type"]/option[@value="number:1"]'));
    SF.click(By.xpath('//input[@id="edit-move-date-datepicker-popup-0"]'));
    V.request = {};
    driver.wait(driver.executeScript(JSstep.Click4DaysCalendar).then(function (calDate) {
        V.request.moveDate = calDate;
        console.log(V.request);
    }),config.timeout);
    SF.sleep(0.5);
    SF.click(By.xpath('//ul[@class="chosen-choices"]'));
    SF.click(By.xpath('//ul[@class="chosen-results"]/li[@data-option-array-index="1"]'));
    driver.wait(driver.findElement(By.xpath('//input[@ng-model="editrequest.data.field_date"]')).getAttribute("value").then(function(mdate){
        V.request.mdate = (mdate);
    }),config.timeout);
    console.log (V.request.mdate);
    SF.send(By.id("edit-zip-code-from"), "02121");
    SF.send(By.id("edit-zip-code-to"), "01452");
    SF.sleep(4);
    SF.click(By.xpath('//button[@ng-click="Calculate()"]'));
    SF.sleep(1);
    MF.WaitWhileBusy ();
    SF.click(By.xpath('//button[@ng-click="step2 = false;step3 = true;"]'));
    SF.sleep(2);
    SF.send(By.xpath('//div[@class="step3"]//input[@ng-model="editrequest.account.fields.field_user_first_name"]'), V.client.name);
    SF.send(By.xpath('//div[@class="step3"]//input[@ng-model="editrequest.account.fields.field_user_last_name"]'), V.client.fam);
    SF.send(By.xpath('//div[@class="step3"]//input[@ng-model="editrequest.account.mail"]'), V.client.email);
    SF.send(By.xpath('//div[@class="step3"]//input[@ng-model="editrequest.account.fields.field_primary_phone"]'), V.client.phone);
    SF.click(By.xpath('//button[@ng-click="create()"]'));
    SF.waitForVisible(By.xpath('//div[@ng-click="chooseTruck(tid)"]'));
    SF.sleep(4);
    console.log('создали реквест');
    V.boardNumbers60_100 = {};
    LF.RememberDigitsRequestBoard (V.boardNumbers60_100);
    SF.sleep(1);
    VD.IWant (VD.VToEqual, V.boardNumbers60_100.Fuel, 500, 'не совпал фуел с выставленными настройками на 60 - 100 миль');
    SF.sleep (2);

condition.nowWeDoing = 'меняем зип код в реквесте, чтобы расстояние было в промежутке 100 - 140 миль и проверяем фуель';
    SF.clear(By.xpath('//input[@ng-model="request.field_moving_to.postal_code"]'));
    SF.sleep(0.3);
    SF.send(By.xpath('//input[@ng-model="request.field_moving_to.postal_code"]'), "01247");
    SF.sleep(10);
    MF.EditRequest_SetAdressToFrom ();
    SF.sleep(6);
    MF.EditRequest_SaveChanges ();
    Debug.pause();
    SF.sleep(3);
    V.boardNumbers100_140 = {};
    LF.RememberDigitsRequestBoard_Down (V.boardNumbers100_140);
    SF.sleep(0.5);
    VD.IWant (VD.VToEqual, V.boardNumbers100_140.Fuel, 800, 'не совпал фуел с выставленными настройками на 100 - 140 миль');
    SF.sleep(0.5);
    Debug.pause();
    LF.closeEditRequest ();

condition.nowWeDoing = 'идем на дашборд, открываем реквест и проверяем что там осталось 800 дол';
    MF.Board_OpenDashboard ();
    JS.scroll ('div[ng-click=\"vm.select(0)\"]');
    SF.sleep(0.5);
    LF.OpenRequest (V.boardNumbers60_100.Id);
    V.boardNumbers100_140Last = {};
    LF.RememberDigitsRequestBoard_Down (V.boardNumbers100_140Last);
    SF.sleep(1);
    VD.IWant (VD.VToEqual, V.boardNumbers100_140Last.Fuel, 800, 'не совпал фуел с выставленными настройками на 100 - 140 миль, когда второй раз открываем реквест');
    SF.sleep(2);

    //=========================закончили писать тест=============================
    SF.endOfTest();
};
