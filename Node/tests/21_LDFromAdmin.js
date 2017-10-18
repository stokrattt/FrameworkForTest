module.exports = function main(SF, JS, MF, LF, JSstep, VD, V, By, until,FileDetector, system, condition, config,constants) {    global.fiber = Fiber.current;
    V.boardNumbers = {};
    V.client = {};
    V.client.name = SF.randomBukva(6) + '_t';
    V.client.fam = SF.randomBukva(6) + '_t';
    V.client.phone = SF.randomCifra(10);
    V.client.email = SF.randomBukvaSmall(6) + '@' + SF.randomBukvaSmall(4) + '.tes';

    SF.get(V.adminURL);
    LF.LoginToBoardAsCustom(V.adminLogin,V.adminPassword);
    SF.sleep (3);

condition.nowWeDoing = 'выставляем настройки лонг дистанс для калифорнии';
    MF.Board_OpenSettingsGeneral();
    MF.Board_OpenSettingsLongDistance ();
    MF.LongDistanceSettings_ClickOnMapCaliforniya();
    driver.wait(driver.executeScript("if($('input[ng-model=\"vm.longdistance.stateRates[vm.longdistance.basedState][vm.stateCode].longDistance\"]').hasClass('ng-not-empty')){" +
        "return true;}else{" +
        "$('input[ng-model=\"vm.longdistance.stateRates[vm.longdistance.basedState][vm.stateCode].longDistance\"]').click()}"),config.timeout);
    SF.clear (By.xpath('//input[@ng-model="vm.longdistance.stateRates[vm.longdistance.basedState][vm.stateCode].min_weight"]'));
    SF.send(By.xpath('//input[@ng-model="vm.longdistance.stateRates[vm.longdistance.basedState][vm.stateCode].min_weight"]'), 200);
    SF.sleep (2);
    SF.clear (By.xpath('//input[@ng-model="vm.longdistance.stateRates[vm.longdistance.basedState][vm.stateCode].state_rate"]'));
    SF.send(By.xpath('//input[@ng-model="vm.longdistance.stateRates[vm.longdistance.basedState][vm.stateCode].state_rate"]'), 10);
    SF.sleep (2);
    driver.wait(driver.executeScript("if($('input[ng-model=\"vm.longdistance.acceptAllQuotes\"]').hasClass('ng-not-empty')){" +
        "return true;}else{" +
        "$('input[ng-model=\"vm.longdistance.acceptAllQuotes\"]').click()}"),config.timeout);
    SF.sleep (2);
    MF.LongDistanceSettings_SelectMABasedState();
    SF.click(By.xpath('//input[@ng-model="vm.longdistance.stateRates[vm.longdistance.basedState][vm.stateCode].delivery_days"]'));
    SF.sleep (2);

condition.nowWeDoing = 'создаем ЛД реквест';

    SF.click(By.linkText('Create Request'));
    SF.sleep(5);
    SF.click(By.xpath('//div[@class="step1"]//select[@name="move_service_type"]/option[@value="number:7"]'));
    SF.click(By.xpath('//input[@id="edit-move-date-datepicker-popup-0"]'));
    V.request = {};
    driver.wait(driver.executeScript(JSstep.Click4DaysCalendar).then(function (calDate) {
        V.request.moveDate = calDate;
    }),config.timeout);
    SF.sleep(0.5);
    SF.click(By.xpath('//ul[@class="chosen-choices"]'));
    SF.click(By.xpath('//ul[@class="chosen-results"]/li[@data-option-array-index="1"]'));
    SF.send(By.id("edit-zip-code-from"), "02032");
    SF.send(By.id("edit-zip-code-to"), "90001");
    SF.sleep(6);
    SF.click(By.xpath('//button[@ng-click="Calculate()"]'));
    SF.sleep(1);
    MF.WaitWhileBusy ();
    SF.sleep(1);
condition.nowWeDoing = 'запоминаем данные с калькулятора при создании реквеста';
    V.LDAdminCalc = {};
    driver.wait(driver.findElement(By.xpath('//td[contains(text(), "Long Distance Quote ")]/following-sibling::td[1]')).getText().then(function(quote){
        V.LDAdminCalc.Quote = SF.cleanPrice (quote);
    }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//td[contains(text(), "Fuel Surcharge ")]/following-sibling::td[1]')).getText().then(function(fuel){
        V.LDAdminCalc.Fuel = SF.cleanPrice (fuel);
    }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//td[contains(text(), "Grand Total")]/following-sibling::td[1]')).getText().then(function(total){
        V.LDAdminCalc.Total = SF.cleanPrice (total);
    }),config.timeout);
    SF.sleep (1);

    SF.click(By.xpath('//button[@ng-click="step2 = false;step3 = true;"]'));
    SF.sleep(2);
    SF.send(By.xpath('//div[@class="step3"]//input[@ng-model="editrequest.account.fields.field_user_first_name"]'), V.client.name);
    SF.send(By.xpath('//div[@class="step3"]//input[@ng-model="editrequest.account.fields.field_user_last_name"]'), V.client.fam);
    SF.send(By.xpath('//div[@class="step3"]//input[@ng-model="editrequest.account.mail"]'), V.client.email);
    SF.send(By.xpath('//div[@class="step3"]//input[@ng-model="editrequest.account.fields.field_primary_phone"]'), V.client.phone);
    SF.click(By.xpath('//button[@ng-click="create()"]'));
    SF.waitForVisible(By.xpath('//div[@ng-click="chooseTruck(tid)"]'));
    SF.sleep(4);
    LF.RememberDigitsRequestBoard_Down (V.boardNumbers);
    SF.sleep (1);
    V.request.Id = {};
        driver.wait(driver.findElement(By.xpath('//a[@ng-click="select(tabs[0])"]')).getText().then(function(text){
        V.request.Id = SF.cleanPrice(text);
        LF.addToCleanerJob(V.request.Id);
    }), config.timeout);
condition.nowWeDoing = 'сравниваем данные калькулятора и реквеста';
    VD.IWant(VD.ToEqual, V.LDAdminCalc.Total, V.boardNumbers.Total, 'не совпали Total калькулятора и борда');
    VD.IWant(VD.ToEqual, V.LDAdminCalc.Fuel, V.boardNumbers.Fuel, 'не совпали Fuel калькулятора и борда');
    VD.IWant(VD.ToEqual, V.LDAdminCalc.Quote, V.boardNumbers.Quote, 'не совпали Quote калькулятора и борда');
    SF.sleep (2);
    SF.click(By.xpath('//ul[@class="nav nav-tabs"]//a[@ng-click="select(tabs[1])"]'));
    MF.WaitWhileBusy ();
condition.nowWeDoing = 'ждем инвентория';
    SF.sleep (7);
    SF.click (By.xpath('//div[@class="inventory-item"]//div[@ng-if="!showAdd"]/descendant::button[1]'));
    SF.click (By.xpath('//div[@class="inventory-item"]//div[@ng-if="!showAdd"]/descendant::button[1]'));
    SF.click (By.xpath('//div[@class="inventory-item"]//div[@ng-if="!showAdd"]/descendant::button[1]'));
    SF.click (By.xpath('//div[@class="inventory-item"]//div[@ng-if="!showAdd"]/descendant::button[1]'));
    SF.click (By.xpath('//div[@class="inventory-item"]//div[@ng-if="!showAdd"]/descendant::button[1]'));
    SF.click (By.xpath('//div[@class="inventory-item"]//div[@ng-if="!showAdd"]/descendant::button[1]'));
    SF.click (By.xpath('//div[@class="inventory-item"]//div[@ng-if="!showAdd"]/descendant::button[1]'));
    SF.click (By.xpath('//div[@class="inventory-item"]//div[@ng-if="!showAdd"]/descendant::button[1]'));
    SF.click (By.xpath('//div[@class="inventory-item"]//div[@ng-if="!showAdd"]/descendant::button[1]'));
    SF.click (By.xpath('//div[@class="inventory-item"]//div[@ng-if="!showAdd"]/descendant::button[1]'));
    SF.click (By.xpath('//div[@class="inventory-item"]//div[@ng-if="!showAdd"]/descendant::button[1]'));
    SF.click (By.xpath('//div[@class="inventory-item"]//div[@ng-if="!showAdd"]/descendant::button[1]'));
    SF.click(By.id("save-inventory"));
    SF.sleep (4);
    MF.EditRequest_AddPacking ();

condition.nowWeDoing = 'запоминаем данные после добавления всех сервисов ';
    V.boardNumbersWithAddServices = {};
    LF.RememberDigitsRequestBoard_Down (V.boardNumbersWithAddServices);
    SF.sleep (1);
    MF.EditRequest_SetToNotConfirmed();
    LF.RememberDigitsRequestBoard(V.boardNumbers);
    JS.step(JSstep.selectTruck((V.boardNumbers.LaborTimeMax + V.boardNumbers.TravelTime)/60));
    MF.WaitWhileBusy();
    MF.EditRequest_SaveChanges ();
    MF.EditRequest_OpenClient ();
    V.client.passwd = 123;
    LF.SetClientPasswd (V.client.passwd);

    LF.closeEditRequest ();
    MF.Board_OpenDashboard();
    MF.Board_OpenNotConfirmed();
    MF.WaitWhileBusy ();
    MF.Board_OpenRequest(V.request.Id);

condition.nowWeDoing = 'идём в логи';
    MF.EditRequest_OpenLogs();

    MF.EditRequest_Check1EmailExist(V.client.email, "Thank you for submitting a quote.");
    MF.EditRequest_Check1EmailExist(V.client.email, "How To Work With Your New Account.");
    MF.EditRequest_Check1EmailExist(V.adminEmail, "Request Quote (Pending Status)");
    MF.EditRequest_Check1EmailExist(V.client.email, "Request Long Distance Quote (Not Confirmed Status)");

    V.logNumbers={};
    SF.click(By.xpath('//span[@ng-bind-html="toTrustedHTML(item.text)"][contains(text(),"Request Long Distance Quote (Not Confirmed Status)")]' +
        '[contains(text(),"'+V.client.email+'")]/../../../following-sibling::div[1]'));
    driver.wait(driver.findElement(By.xpath('//span[@aria-hidden="false"]//h3[contains(text(),"Estimated Quote")]/../../../../../../' +
        'following-sibling::td[1]//div')).getText().then(function(text){
        V.logNumbers.Quote = SF.cleanPrice(text);
    }),config.timeout);
    SF.sleep(1);
    VD.IWant(VD.ToEqual, V.logNumbers.Quote, V.boardNumbersWithAddServices.Total, 'не совпал гранд тотал в письме и в реквесте');
    SF.sleep(1);
    LF.closeEditRequest ();
    MF.Board_LogoutAdmin ();
    SF.get(V.accountURL);

condition.nowWeDoing = 'идем в аккаунт букать работу и сравнивать данные';
    LF.LoginToAccountAsClient (V.client, V.client.passwd);
    MF.Account_CheckRequestStatus_NotConfirmed (V.request.Id);
    MF.Account_OpenRequest (V.request.Id);
    MF.Account_ClickViewRequest ();
    MF.WaitWhileBusy ();
    SF.sleep(2);
    V.accountNumbersLD = {};
    driver.wait(driver.findElement(By.xpath('//div[contains(text(),"Long Distance Grand Total")]/following-sibling::div[1]')).getText().then(function (text) {
        if (text.indexOf("You save") !== -1) {
            let t = text.substring(0, text.indexOf("You save"));
            t = t.substring(t.indexOf('$', t.indexOf('$', t.indexOf('$') + 1)));
            V.accountNumbersLD.Total = SF.cleanPrice(t);
        } else {
            console.log(V.accountNumbersLD.Total);
            V.accountNumbersLD.Total = SF.cleanPrice(text);
        }
    }),config.timeout);
    SF.sleep (1);
    VD.IWant (VD.ToEqual, V.boardNumbersWithAddServices.Total, V.accountNumbersLD.Total, 'не совпал гранд тотал мувборда и аккаунта');
    MF.Account_ClickProceedBookYourMove();

    driver.wait(driver.findElement(By.xpath('//h2[contains(text(),"Grand Total")]/following-sibling::span')).getText().then(function(text){
        V.ConfirmationTotal = SF.cleanPrice(text.substring(text.indexOf('$')));
        console.log(V.ConfirmationTotal);
        }),config.timeout);
    SF.sleep(1);
    VD.IWant(VD.ToEqual, V.logNumbers.Quote, V.ConfirmationTotal, 'не совпал гранд тотал в реквесте и на конфирмейшн пейдж');
    SF.click (By.xpath('//i[@class="fa fa-angle-down arrow-down"]'));
    SF.sleep (0.5);
    SF.click (By.id('terms'));
    SF.click (By.id('cancel_policy'));
    SF.click (By.id('paybutton'));
    SF.waitForVisible (By.xpath('//div[@class="sweet-alert showSweetAlert visible"]'));
    SF.click (By.xpath('//button[@class="confirm"]'));
    SF.waitForVisible (By.xpath('//div[@class="modal-body form-horizontal"]'));
    SF.sleep(2);
    SF.send (By.id('edit-moving-from'), 'otkuda edem');
    SF.send (By.id('edit-moving-from-apt'), 324535);
    SF.send (By.xpath('//input[@ng-value="request.field_moving_to.thoroughfare"]'), 'kuda edem');
    SF.send (By.xpath('//input[@ng-value="request.apt_to.value"]'), 324535);
    SF.click (By.xpath('//button[@ng-click="update(client)"]'));

    SF.waitForVisible (By.xpath('//div[@class="sweet-alert showSweetAlert visible"]'));
    SF.click (By.xpath('//button[@class="confirm"]'));
    SF.waitForVisible (By.xpath('//div[@class="sweet-alert showSweetAlert visible"]'));
    SF.click (By.xpath('//button[@class="confirm"]'));
    SF.waitForVisible(By.xpath('//canvas[@id="signatureCanvasReserv"]'));
    LF.MakeSignJS('signatureCanvasReserv');
    SF.sleep(0.5);
    SF.click(By.xpath('//button[@ng-click="saveReservSignature();logClickButtons(\'Save reservation sign button clicked\')"]'));
    SF.sleep (1);
    LF.FillCardPayModal ();
    MF.WaitWhileSpinner ();
    SF.waitForVisible(By.xpath('//div[contains(text(),"Your move is confirmed and scheduled")]'));
    driver.wait(driver.findElement(By.xpath('//div[@class="field-status confirm ng-scope"]/div')).getText().then(function(confirmed){
        VD.IWant (VD.ToEqual, confirmed, 'YOUR MOVE IS CONFIRMED AND SCHEDULED', 'статус не конферм, хотя должен был быть');
    }), config.timeout);
    SF.sleep(1);


    //=========================закончили писать тест=============================
    SF.endOfTest();
};
