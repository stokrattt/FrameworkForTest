module.exports = function main(SF, JS, JSstep, VD, V, By, until,FileDetector, system, condition, LF,config,constants){
    global.fiber = Fiber.current;
    V.boardNumbers = {};
    V.client = {};
    V.client.name = SF.randomBukva(6) + '_t';
    V.client.fam = SF.randomBukva(6) + '_t';
    V.client.phone = SF.randomCifra(10);
    V.client.email = SF.randomBukvaSmall(6) + '@' + SF.randomBukvaSmall(4) + '.tes';

    SF.get(V.adminURL);
    LF.LoginToBoardAsAdmin();
    SF.sleep (3);
    condition.nowWeDoing = 'выставляем настройки лонг дистанс для калифорнии';
    SF.click (By.xpath('//button[@ng-click="toggleLeft()"]'));
    SF.waitForVisible (By.xpath('//button[@ng-click="toggleLeft()"]'));
    SF.click (By.xpath('//a[@ng-click="vm.goToPage(\'settings.general\', \'\')"]'));
    SF.waitForVisible (By.xpath('//a[@ng-click="vm.goToPage(\'settings.general\', \'\')"]'));
    SF.click(By.xpath('//a[@ui-sref="settings.longdistance"]'));
    SF.waitForVisible (By.xpath('//a[@ui-sref="settings.longdistance"]'));
    SF.sleep (4);
    JS.click('#jqvmap1_ca');
    SF.waitForVisible (By.xpath('//div[@ng-if="vm.showSidebar"]'));
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
    SF.select (By.xpath('//select[@ng-model="vm.longdistance.basedState"]'), 'MA');
    SF.sleep (2);
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
        console.log(V.request);
    }),config.timeout);
    SF.sleep(0.5);
    SF.click(By.xpath('//ul[@class="chosen-choices"]'));
    SF.click(By.xpath('//ul[@class="chosen-results"]/li[@data-option-array-index="1"]'));
    SF.send(By.id("edit-zip-code-from"), "02032");
    SF.send(By.id("edit-zip-code-to"), "90001");
    SF.sleep(4);
    SF.click(By.xpath('//button[@ng-click="Calculate()"]'));
    SF.sleep(1);
    JS.waitForNotExist('div.busyoverlay:visible');
    SF.sleep(1);

    condition.nowWeDoing = 'запоминаем данные с калькулятора при создании реквеста';
    V.LDAdminCalc = {};
    driver.wait(driver.findElement(By.xpath('//td[contains(text(), "Long Distance Quote ")]/following-sibling::td[1]')).getText().then(function(quote){
        V.LDAdminCalc.Quote = SF.cleanPrice (quote);
        console.log (V.LDQuote);
    }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//td[contains(text(), "Fuel Surcharge ")]/following-sibling::td[1]')).getText().then(function(fuel){
        V.LDAdminCalc.Fuel = SF.cleanPrice (fuel);
    }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//td[contains(text(), "Grand Total")]/following-sibling::td[1]')).getText().then(function(total){
        V.LDAdminCalc.Total = SF.cleanPrice (total);
    }),config.timeout);
    SF.sleep (1);
    console.log (V.LDAdminCalc);

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
    LF.RememberDigitsRequestBoard_Down (V.boardNumbers);
    SF.sleep (1);
    console.log(V.boardNumbers);
    V.request.Id = {};
        driver.wait(driver.findElement(By.xpath('//a[@ng-click="select(tabs[0])"]')).getText().then(function(text){
        V.request.Id = SF.cleanPrice(text);
        LF.addToCleanerJob(V.request.Id);
    }), config.timeout);
    condition.nowWeDoing = 'сравниваем данные калькулятора и реквеста';
    VD.IWant(VD.VToEqual, V.LDAdminCalc.Total, V.boardNumbers.Total, 'не совпали Total калькулятора и борда');
    VD.IWant(VD.VToEqual, V.LDAdminCalc.Fuel, V.boardNumbers.Fuel, 'не совпали Fuel калькулятора и борда');
    VD.IWant(VD.VToEqual, V.LDAdminCalc.Quote, V.boardNumbers.Quote, 'не совпали Quote калькулятора и борда');
    SF.sleep (2);
    SF.click(By.xpath('//ul[@class="nav nav-tabs"]//a[@ng-click="select(tabs[1])"]'));
    JS.waitForExist('div.busyoverlay');
    condition.nowWeDoing = 'ждем инвентория';
    SF.sleep (7);
    SF.click (By.xpath('//div[@ng-if="!myInventory.opened && !searchText && currentFilter"]//div[@ng-if="!showAdd"]/descendant::button[1]'));
    SF.click (By.xpath('//div[@ng-if="!myInventory.opened && !searchText && currentFilter"]//div[@ng-if="!showAdd"]/descendant::button[1]'));
    SF.click (By.xpath('//div[@ng-if="!myInventory.opened && !searchText && currentFilter"]//div[@ng-if="!showAdd"]/descendant::button[1]'));
    SF.click (By.xpath('//div[@ng-if="!myInventory.opened && !searchText && currentFilter"]//div[@ng-if="!showAdd"]/descendant::button[1]'));
    SF.click (By.xpath('//div[@ng-if="!myInventory.opened && !searchText && currentFilter"]//div[@ng-if="!showAdd"]/descendant::button[1]'));
    SF.click (By.xpath('//div[@ng-if="!myInventory.opened && !searchText && currentFilter"]//div[@ng-if="!showAdd"]/descendant::button[1]'));
    SF.click (By.xpath('//div[@ng-if="!myInventory.opened && !searchText && currentFilter"]//div[@ng-if="!showAdd"]/descendant::button[1]'));
    SF.click (By.xpath('//div[@ng-if="!myInventory.opened && !searchText && currentFilter"]//div[@ng-if="!showAdd"]/descendant::button[1]'));
    SF.click (By.xpath('//div[@ng-if="!myInventory.opened && !searchText && currentFilter"]//div[@ng-if="!showAdd"]/descendant::button[1]'));
    SF.click (By.xpath('//div[@ng-if="!myInventory.opened && !searchText && currentFilter"]//div[@ng-if="!showAdd"]/descendant::button[1]'));
    SF.click (By.xpath('//div[@ng-if="!myInventory.opened && !searchText && currentFilter"]//div[@ng-if="!showAdd"]/descendant::button[1]'));
    SF.click (By.xpath('//div[@ng-if="!myInventory.opened && !searchText && currentFilter"]//div[@ng-if="!showAdd"]/descendant::button[1]'));
    SF.click(By.id("save-inventory"));
    SF.sleep (4);
    SF.click(By.xpath('//label[@ng-click="openAddServicesModal();"]'));
    SF.waitForVisible (By.id('extra-service-modal'));
    SF.click(By.xpath('//label[@ng-model="packing_service"][3]'));
    SF.click(By.xpath('//button[@ng-click="save()"]'));
    SF.waitForNotVisible (By.id('extra-service-modal'));
    SF.sleep (2);
    SF.click(By.xpath('//label[@ng-click="openAddPackingModal();"]'));
    SF.waitForVisible (By.xpath('//div[@class="inside_box"]'));

    SF.click(By.xpath('//li[@ng-click="addExtraCharges(extra_charge)"][1]'));
    SF.sleep (0.5);
    SF.click(By.xpath('//li[@ng-click="addExtraCharges(extra_charge)"][2]'));
    SF.sleep (0.5);
    SF.click(By.xpath('//li[@ng-click="addExtraCharges(extra_charge)"][3]'));
    SF.sleep (0.5);
    SF.click(By.xpath('//button[@ng-click="save()"]'));
    SF.waitForNotVisible (By.xpath('//div[@class="inside_box"]'));
    SF.sleep (4);
    condition.nowWeDoing = 'запоминаем данные после добавления всех сервисов ';
    V.boardNumbersWithAddServices = {};
    LF.RememberDigitsRequestBoard_Down (V.boardNumbersWithAddServices);
    SF.sleep (1);
    console.log(V.boardNumbersWithAddServices);
    JS.select ('#edit-status', 2);
    JS.step(JSstep.selectTruck);
    SF.click (By.xpath('//button[@ng-click="UpdateRequest()"]'));
    SF.waitForVisible (By.xpath('//button[@ng-click="update(request)"]'));
    SF.click (By.xpath('//button[@ng-click="update(request)"]'));
    SF.sleep (5);
    SF.click (By.xpath('//a[@ng-click="select(tabs[4])"]'));
    SF.sleep (0.5);
    V.client.passwd = 123;
    SF.send (By.id('inputPassword3'), V.client.passwd);
    SF.click (By.xpath('//button[@ng-click="update(client)"]'));
    SF.sleep (3);
    JS.waitForNotExist('div.toast-success');
    LF.closeEditRequest ();
    SF.sleep (1);
    SF.click (By.xpath('//a[@ui-sref="dashboard"]'));
    SF.waitForVisible (By.xpath('//div[@ng-click="vm.select(3)"]'));
    SF.click (By.xpath('//div[@ng-click="vm.select(3)"]'));
    SF.sleep (3);
    LF.OpenRequest(V.request.Id);
    condition.nowWeDoing = 'идём в логи';
    SF.click(By.xpath('//a[@ng-click="select(tabs[5])"]'));
    SF.sleep(2);
    JS.waitForNotExist('div.busyoverlay:visible');
    V.logNumbers={};
    SF.click(By.xpath('//span[@ng-bind-html="toTrustedHTML(item.text)"][contains(text(),"Request Long Distance Quote (Not Confirmed Status)")][contains(text(),"'+V.client.email+'")]/../../../following-sibling::div[1]'));
    driver.wait(driver.findElement(By.xpath('//span[@aria-hidden="false"]//h3[contains(text(),"Estimated Quote")]/../../../../../../' +
        'following-sibling::td[1]//div')).getText().then(function(text){
        V.logNumbers.Quote = SF.cleanPrice(text);
    }),config.timeout);
    SF.sleep(1);
    console.log(V.logNumbers);
    VD.IWant(VD.VToEqual, V.logNumbers.Quote, V.boardNumbersWithAddServices.Total, 'не совпал гранд тотал в письме и в реквесте');
    SF.sleep(1);
    LF.closeEditRequest ();
    LF.LogoutFromBoardAdmin ();
    SF.get(V.accountURL);
condition.nowWeDoing = 'идем в аккаунт букать работу и сравнивать данные';
    LF.LoginToAccountAsClient (V.client, V.client.passwd);
    SF.waitForVisible(By.xpath('//td[contains(text(),"'+V.request.Id+'")]/following-sibling::td[1]'));
    driver.wait(driver.findElement(By.xpath('//td[contains(text(),"'+V.request.Id+'")]/following-sibling::td[1]')).getText().then(function(Status){
        VD.IWant(VD.VToEqual,Status,'Not Confirmed');
    }));
    SF.click(By.xpath('//td[contains(text(),"'+V.request.Id+'")]/following-sibling::td/button[contains(text(),"View")]'));
    SF.waitForVisible (By.xpath('//button[@ng-click="cancel()"]'));
    SF.click (By.xpath('//button[@ng-click="cancel()"]'));
    SF.sleep (2);
    V.accountNumbersLD = {};
    driver.wait(driver.findElement(By.xpath('//div[contains(text(),"Long Distance Grand Total")]/following-sibling::div[1]')).getText().then(function (text) {
        if (text.indexOf("You save") !== -1) {
            let t = text.substring(0, text.indexOf("You save"));
            t = t.substring(t.indexOf('$', t.indexOf('$', t.indexOf('$') + 1)));
            V.accountNumbersLD.Total = SF.cleanPrice(t);
        } else {
            console.log('ещё не делали без скидок');
        }
    }),config.timeout);
    SF.sleep (1);
    console.log(V.accountNumbersLD.Total);
    VD.IWant (VD.VToEqual, V.boardNumbersWithAddServices.Total, V.accountNumbersLD.Total, 'не совпал гранд тотал мувборда и аккаунта');
    SF.click (By.xpath('//div[@class="field-status notconfirmed ng-scope"]/a'));
    SF.sleep (2);
    driver.wait(driver.findElement(By.xpath('//div//h2[contains(text(),"Grand Total")]/..')).getText().then(function(text){
        V.ConfirmationTotal = SF.cleanPrice(text.substring(text.indexOf('$')));
        }),config.timeout);
    SF.sleep(1);
    console.log(V.ConfirmationTotal);
    VD.IWant(VD.VToEqual, V.logNumbers.Quote, V.ConfirmationTotal, 'не совпал гранд тотал в реквесте и на конфирмейшн пейдж');
    SF.click (By.xpath('//i[@class="fa fa-angle-down arrow-down"]'));
    SF.sleep (0.5);
    SF.click (By.id('terms'));
    SF.click (By.id('cancel_policy'));
    SF.click (By.id('paybutton'));
    SF.waitForVisible (By.xpath('//div[@class="sweet-alert showSweetAlert visible"]'));
    SF.click (By.xpath('//button[@class="confirm"]'));
    SF.waitForVisible (By.xpath('//div[@class="modal-body form-horizontal"]'));
    SF.send (By.id('edit-moving-from'), 'otkuda edem');
    SF.send (By.id('edit-moving-from-apt'), 324535);
    SF.send (By.xpath('//input[@ng-model="request.field_moving_to.thoroughfare"]'), 'kuda edem');
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
    driver.wait(driver.findElement(By.xpath('//div[@class="field-status confirm ng-scope"]/div')).getText().then(function(confirmed){
        VD.IWant (VD.VToEqual, confirmed, 'YOUR MOVE IS CONFIRMED AND SCHEDULED', 'статус не конферм, хотя должен был быть');
    }), config.timeout);
    LF.LogoutFromAccount ();




    //=========================закончили писать тест=============================
    SF.endOfTest();
};
