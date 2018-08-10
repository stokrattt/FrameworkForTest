module.exports = function main(SF, JS, MF, LF, JSstep, VD, V, By, until,FileDetector, system, condition, config,constants) {
    global.fiber = Fiber.current;
    V.client = {};
    V.client.name = SF.randomBukva(6) + '_t';
    V.client.fam = SF.randomBukva(6) + '_t';
    V.client.phone = SF.randomCifra(10);
    V.client.email = SF.randomBukvaSmall(6) + '@' + SF.randomBukvaSmall(4) + '.tes';
    V.client.passwd = 123;

    SF.get(V.adminURL);
    LF.LoginToBoardAsCustom(V.adminLogin,V.adminPassword);

condition.nowWeDoing = 'Идем в настройки  ЛД. Так же проверяем, что в настройках valuation выбран valuation plan by percent (вклюачаем если он выключен)';
    MF.Board_OpenSettingsGeneral ();
    MF.Board_OpenSettingsLongDistance ();
    MF.BoardOpenSettingsLongDistanceStatus();
    V.flag = SF.randomBukva(6) + '_flag';
    LF.LongDistanceSettings_AddLDStatusFlag(V.flag);
    MF.Board_OpenSettingsGeneral ();
    MF.Board_OpenSettingsValuation();
    driver.wait(driver.executeScript("if ($('md-radio-button[area-label=\"By percent\"]').hasClass('md-checked')){" +
        "return true;} else {$('md-radio-button[area-label=\"By percent\"]').click()}"),config.timeout);
    driver.wait(driver.executeScript("if($('button[ng-click=\"saveChanges()\"]').hasClass('disabled')){" +
        ";}else{$('button[ng-click=\"saveChanges()\"]').click()}"),config.timeout);
    MF.WaitWhileToaster();

condition.nowWeDoing = 'Создаем LD реквест, выставляем флаг. Закрываем и открываем заново реквест, проверяем сохранился ли флаг';
    LF.CreateLongDistanceFromBoard(V.client);
    MF.EditRequest_OpenClient();
    LF.SetClientPasswd(V.client.passwd);
    MF.EditRequest_OpenRequest();
    SF.click(By.xpath('//select[@ng-model="request.ld_status"]/option[contains(text(),"'+V.flag+'")]'));
    MF.WaitWhileToaster();
    V.boardNumbers = {};
    LF.RememberDigitsRequestBoard(V.boardNumbers);
    LF.closeEditRequest();
    MF.Board_OpenDashboard();
    MF.Board_OpenRequest(V.boardNumbers.Id);
    driver.wait(driver.findElement(By.xpath('//select[@ng-model="request.ld_status"]/option[@selected="selected"]')).getText().then(function(text) {
        VD.IWant(VD.ToEqual, text ,V.flag,'Не сохранился или не совпал флаг после закрытия реквеста');
    }),config.timeout);
    LF.closeEditRequest();

condition.nowWeDoing = 'Идем в настройки  ЛД и выставляем резервэйшин  прайс в процентах.';
    MF.Board_OpenSettingsSchedule();
    SF.send(By.xpath('//input[@ng-model="vm.scheduleSettings.longReservationRate"]'), 0);
    SF.select(By.xpath('//select[@ng-model="vm.scheduleSettings.longReservation"]'), 25);
    MF.WaitWhileBusySymbol();
    MF.Board_LogoutAdmin();

condition.nowWeDoing = 'пришли на аккаунт,добавляем инвентарь, вносим детали, выходим из аккаунта.';
    SF.get(V.accountURL);
    LF.LoginToAccountAsClient(V.client);
    MF.Account_OpenRequest(V.boardNumbers.Id);
    MF.Account_ClickViewRequest();
    V.accountNumbersLD={};
    LF.RememberAccountNumbersLD(V.accountNumbersLD);
    LF.Validation_Compare_Account_Admin_LongDistance(V.accountNumbersLD, V.boardNumbers);
    MF.Account_OpenAdressModal();
    MF.Account_SendAdressFromModalWindow();
    MF.Account_SendAdressToModalWindow();
    MF.Account_ClickUpdateClientInModalWindow();
    MF.SweetConfirm();
    LF.AccountLocalAddInventory(V.accountNumbersLD);
    SF.sleep(2);
    driver.wait(driver.findElement(By.xpath('//span[@ng-if="vm.request.field_useweighttype.value == \'2\' && vm.request.inventory_weight.cfs"]')).getText().then(function(text) {
        V.CBFinAccount = SF.cleanPrice(text);
    }),config.timeout);
    // MF.SweetConfirm();
    LF.Account_LongDistanceDetailsAdd();
    MF.Account_WaitForDetailsCheck();
    V.accountNumbersLD1={};
    LF.RememberAccountNumbersLD(V.accountNumbersLD1);
    LF.LogoutFromAccount();

condition.nowWeDoing = 'переходим на мувборд, менем статус у реквеста на нот конферм, сохраняем.';
    SF.get(V.adminURL);
    LF.LoginToBoardAsCustom(V.adminLogin,V.adminPassword);
    MF.Board_OpenRequest(V.boardNumbers.Id);
    V.boardNumbers2 = {};
    LF.RememberDigitsRequestBoard(V.boardNumbers2);
    LF.Validation_Compare_Account_Admin_LongDistance(V.accountNumbersLD1,V.boardNumbers2);
    MF.EditRequest_SetToNotConfirmed();
    driver.wait(driver.findElement(By.xpath('//div[@ng-show="!request.isInventory"]')).getText().then(function(text) {
        V.CBFinAdmin = SF.cleanPrice(text);
        VD.IWant(VD.ToEqual, V.CBFinAccount ,V.CBFinAdmin,'не совпал вес после первого добавления инвентаря в аккаунте и реквесте на мувборде');
    }),config.timeout);
    JS.step(JSstep.selectTruck((V.boardNumbers2.LaborTimeMax + V.boardNumbers2.TravelTime)/60));
    MF.WaitWhileBusy();
    MF.EditRequest_SaveChanges();
    MF.EditRequest_CloseEditRequest();
    MF.Board_LogoutAdmin();

condition.nowWeDoing = 'идем на аккаунт клиентом, проверяем статус нот конферм, вносим инвентарь. Проверяем, что статус реквеста поменялся на Pending Info ';
    SF.get(V.accountURL);
    LF.LoginToAccountAsClient(V.client);
    MF.Account_OpenRequest(V.boardNumbers.Id);
    driver.wait(driver.findElement(By.xpath('//div[@ng-include="vm.statusTemplate"]/div/p[contains(text(),"Status: Not Confirmed")]')).getText().then(function (Status) {
        VD.IWant(VD.ToEqual, Status, 'Status: Not Confirmed');
    }), config.timeout);
    LF.AccountLocalAddAdditionalInventory();
    MF.SweetConfirm();
    MF.WaitWhileBusy();
    // MF.SweetConfirm();
    MF.Account_WaitForInventoryCheck();
    driver.wait(driver.findElement(By.xpath('//span[@ng-if="vm.request.field_useweighttype.value == \'2\' && vm.request.inventory_weight.cfs"]')).getText().then(function(text) {
        V.CBFinAccountAfterInventory = SF.cleanPrice(text);
    }),config.timeout);

condition.nowWeDoing = 'Открываем Full value protection, меняем amount of liability и выбираем deductible level. Проверяем, что charge посчитан правильно и появился блок explanation';
    MF.Account_ClickAndOpenFullValueModal();
    SF.click(By.xpath('//input[@ng-change="changeOnlyLiabilityAmount()"]'));
    SF.send(By.xpath('//input[@ng-change="changeOnlyLiabilityAmount()"]'),4000);
    SF.click(By.xpath('//td[contains(text(), "Select Valuation")]/following-sibling::td[3]'));
    SF.click(By.xpath('//td[contains(text(), "Select Valuation")]/following-sibling::td[3]'));
    driver.wait(driver.findElement(By.xpath('//div[@ng-if="valuation.selected.valuation_charge"]/div[2]')).getText().then(function(text) {
        V.valuationCharge = SF.cleanPrice(text);
        VD.IWant(VD.ToEqual, V.valuationCharge ,4000/100*20,'Неправильно посчитан valuation charge');
    }),config.timeout);
    MF.Account_ClickSaveFullValueModal();
    driver.wait(driver.executeScript("return $('div[class=\"valuation-explanation-text\"]:visible').length").then(function (text) {
        VD.IWant(VD.ToEqual, text, 1, 'Не появился блок Full Value protection explanation');
    }),config.timeout);
    V.accountNumbersLD2={};
    LF.RememberAccountNumbersLD(V.accountNumbersLD2);
    LF.LogoutFromAccount();

condition.nowWeDoing = 'Идём в админку, ставим статус not confirmed, проверяем reservation price, провеяем что valuation соответствует тому, что мы выбрали на аккаунте. Сохраняем. ';
    SF.get(V.adminURL);
    LF.LoginToBoardAsCustom(V.adminLogin,V.adminPassword);
    MF.Board_OpenRequest(V.boardNumbers.Id);
    V.boardNumbers3 = {};
    LF.RememberDigitsRequestBoard(V.boardNumbers3);
    LF.Validation_Compare_Account_Admin_LongDistance(V.accountNumbersLD2,V.boardNumbers3);
    MF.EditRequest_SetToNotConfirmed();
    driver.wait(driver.findElement(By.xpath('//div[@ng-show="!request.isInventory"]')).getText().then(function(text) {
        text = SF.cleanPrice(text);
        VD.IWant(VD.ToEqual, V.CBFinAccountAfterInventory , text ,'не совпал вес после второго раза добавления ' +
            'инвентаря в аккаунте и в реквесте на мувборде');
    }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//span[@ng-if="request.request_all_data.valuation.selected.valuation_charge"]')).getText().then(function(text) {
        text = SF.cleanPrice(text);
        VD.IWant(VD.ToEqual, text ,V.valuationCharge,'Неправильно посчитан valuation charge');
    }),config.timeout);
    driver.wait(driver.executeScript('return $("input#reserv_price").val()').then(function(text){
        V.Deposit = SF.cleanPrice(text);
        VD.IWant(VD.ToEqual, V.Deposit ,V.boardNumbers3.Quote * 0.25,'не совпали reservation price у реквеста с расчетами по формулам');
    }),config.timeout);
    MF.EditRequest_SaveChanges();
    MF.EditRequest_CloseEditRequest();
    MF.Board_LogoutAdmin();

condition.nowWeDoing = 'Идём клиентом на аккаунт букать работу. Проверяем, чтобы reservation price везде совпадал ';
    SF.get(V.accountURL);
    LF.LoginToAccountAsClient(V.client);
    MF.Account_OpenRequest(V.boardNumbers.Id);
    MF.Account_ClickProceedBookYourMove();
    // JS.scroll('div[ng-if="vm.request.reservation_rate.value !=0 && vm.request.status.raw != 3 && vm.request.status.raw == 2"]');
    driver.wait(driver.findElement(By.xpath('//h2[contains(text(),"Deposit:")]')).getText().then(function (text) {
        text = SF.cleanPrice(text);
        VD.IWant(VD.ToEqual, V.Deposit, text,'не совпал reservation price на реквесте и на странице confirmation page');
    }), config.timeout);
    MF.Account_ClickIAgreeWithAll();
    MF.Account_ConfirmationClickPayDeposit();
    LF.MakeSignJS('signatureCanvasReserv');
    MF.Account_ConfirmationClickSaveSignature();
    driver.wait(driver.findElement(By.xpath('//div[@ng-init="payment.setPaymentBlockHeight(\'.credit_form.credit-pay\')"]/div')).getText().then(function (text) {
        text = SF.cleanPrice(text);
        VD.IWant(VD.ToEqual,V.Deposit, text,'не совпали reservation price на реквесте и в окне при оплате reservation price');
    }), config.timeout);
    LF.FillCardPayModal();
    MF.WaitWhileSpinner();
    MF.Account_WaitForGreenTextAfterConfirm();
    V.accountNumbersLD3={};
    LF.RememberAccountNumbersLD(V.accountNumbersLD3);
    LF.LogoutFromAccount();

condition.nowWeDoing = 'Возвращаемся на мувборд, проверяем оплачена ли наша резервация. Так же сверяем, чтобы всё совпадало с аккаунтом. ';
    SF.get(V.adminURL);
    LF.LoginToBoardAsCustom(V.adminLogin,V.adminPassword);
    MF.Board_OpenConfirmed();
    MF.Board_OpenRequest(V.boardNumbers.Id);
    V.boardNumbers4 = {};
    LF.RememberDigitsRequestBoard(V.boardNumbers4);
    LF.Validation_Compare_Account_Admin_LongDistance(V.accountNumbersLD3,V.boardNumbers4);
    driver.wait(driver.findElement(By.xpath('//label[@ng-click="cancelReservation();"][contains(text(),"Reservation Received")]')).getText().then(function (Status) {
        VD.IWant(VD.ToEqual, Status, 'Reservation Received','после оплаты на реквесте не отобразился статус, что резервация была оплачена');
    }), config.timeout);
    MF.EditRequest_CloseEditRequest();

condition.nowWeDoing = 'Проверяем есть ли в SIT флаг в Пикап и в Деливери. Проверяем, что в LD delivery есть наш реквест под созданным флагом';
    MF.Board_OpenSideBar();
    MF.Board_OpenPickup();
    SF.sleep(1);
    SF.click(By.xpath('//md-select[@ng-model="selectedStatus"]'));
    SF.sleep(3);
    SF.click(By.xpath('//md-option[@ng-repeat="item in ldStatuses"]/div[text()="'+V.flag+'"]'));
    SF.sleep(2);
    driver.wait(driver.findElement(By.xpath('//div[contains(text(),"'+ V.client.name +'")]/..//div[8]')).getText().then(function(text){
        VD.IWant(VD.ToEqual, text, V.flag, 'Реквест не найден или флаг не совпадает');
    }),config.timeout);
    SF.click(By.xpath('//a[@ui-sref="lddispatch.ld_delivery"]'));
    SF.sleep(2);
    SF.click(By.xpath('//md-select[@ng-model="selectedStatus"]'));
    SF.sleep(3);
    SF.click(By.xpath('//md-option[@ng-repeat="item in ldStatuses"]/div[text()="'+V.flag+'"]'));
    SF.sleep(2);

condition.nowWeDoing = 'Идем в настройки  ЛД и удаляем флаг';
    MF.Board_OpenSettingsGeneral ();
    MF.Board_OpenSettingsLongDistance ();
    SF.click(By.xpath('//input[@ng-model="search"]'));
    MF.BoardOpenSettingsLongDistanceStatus();
    SF.click(By.xpath('//tr[@ng-repeat="values in longdistance.ldStatus track by $index"]/../tr[last()]/td/div[@ng-click="removeFlag($index,values)"]'));
    SF.sleep(1);

    SF.endOfTest();
};