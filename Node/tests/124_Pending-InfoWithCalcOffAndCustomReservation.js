module.exports = function main(SF, JS, MF, LF, JSstep, VD, V, By, until,FileDetector, system, condition, config, constants) {
	global.fiber = Fiber.current;
	V.client = {};
	V.client.name = SF.randomBukva(6) + '_t';
	V.client.fam = SF.randomBukva(6) + '_t';
	V.client.phone = SF.randomCifra(10);
	V.client.email = SF.randomBukvaSmall(6) + '@' + SF.randomBukvaSmall(4) + '.tes';
	V.client.passwd = 123;

condition.nowWeDoing = 'создаем мувинг с борда, отключаем калькулятор, заполняем форму адреса, ставим пароль у клиента';
	SF.get(V.adminURL);
	LF.LoginToBoardAsCustom(V.adminLogin,V.adminPassword);
	LF.CreateLocalMovingFromBoard(V.client);
    V.boardNumbers= {};
	MF.EditRequest_SwitchCalculator();
	MF.EditRequest_SetAdressToFrom();
	MF.EditRequest_OpenClient();
	LF.SetClientPasswd(V.client.passwd);
	MF.EditRequest_OpenRequest();

condition.nowWeDoing = 'начинаем добавлять пэкинг, адишинал,валюэйшн, инвентарь, дисконт и меняем цену на топливо';
    LF.EditRequest_AddAdditionalServicesFullPack();
    LF.EditRequest_AddValuation();
    driver.wait(driver.findElement(By.xpath('//span[@ng-if="request.request_all_data.valuation.selected.valuation_charge"]')).getText().then(function (text) {
        V.boardNumbers.Valuation = SF.cleanPrice(text);
	}),config.timeout);
	LF.addInventoryBoard();
	LF.EditRequest_EditRateCalculOff(333);
	MF.EditRequest_SaveChanges();
	driver.wait(driver.findElement(By.xpath('//input[@ng-model="request.rateDiscount"]')).getAttribute('value').then(function (text) {
        V.boardNumbers.NewHourlyRate = SF.cleanPrice(text);
    }),config.timeout);

condition.nowWeDoing = 'отправлемя письмо, сравниваем числа в письме,запоминаем конечные цифры с реквеста при выключенном калькуляторе(начальные)';
    MF.EditRequest_OpenMailDialog();
    SF.sleep(5);
	SF.click(By.xpath('//span[contains(.,"Default")]'));
	SF.sleep(1);
	SF.click(By.xpath('//h4[contains(text(), "CalculatarOFF")][1]'));
	SF.sleep(1);
	MF.EditRequest_MailDialog_ClickSend();
	LF.RememberDigitsRequestBoard(V.boardNumbers);
	MF.EditRequest_OpenLogs();
    SF.click(By.xpath('//div[@ng-click="allLogsShow[allLogsIndex] = !allLogsShow[allLogsIndex]"]'));
	V.sendclient ={};
	MF.WaitWhileBusy();
    driver.wait(driver.findElement(By.xpath('//td//div[contains(text(),"Crew Size")]/../following-sibling::div')).getText().then(function(text){
        text = SF.cleanPrice(text);
        VD.IWant(VD.ToEqual, V.boardNumbers.CrewSize, text , ' Crew Size  в логах письма не сошелся со значением в реквесте');
    }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//td//div[contains(text(),"Hourly Rate :")]/../following-sibling::div')).getText().then(function(text){
        text = SF.cleanPrice(text);
        VD.IWant(VD.ToEqual, V.boardNumbers.NewHourlyRate, text , ' Hourly Rate в логах письма не сошелся со значением в реквесте');
    }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//td//div[contains(text(),"Valuation :")]/../following-sibling::div')).getText().then(function(text){
    	text = SF.cleanPrice(text);
        VD.IWant(VD.ToEqual,V.boardNumbers.Valuation, text , ' Valuation в логах письма не сошелся со значением в реквесте');
    }),config.timeout);
	MF.EditRequest_CloseEditRequest();
	MF.Board_LogoutAdmin();

condition.nowWeDoing = 'переходим в аккаунт,делаем сравнения';
	SF.get(V.accountURL);
	LF.LoginToAccountAsClient(V.client);
	MF.Account_OpenRequest(V.boardNumbers.Id);
	MF.Account_ClickViewRequest();

condition.nowWeDoing = 'запоминаем цифры с аккаунта,что бы сравнить реквест и аккаунт';
	V.accountNumbers= {};
	LF.RememberAccountNumbers(V.accountNumbers);
	LF.Validation_Compare_Account_Admin_WhenSetNewRate(V.boardNumbers, V.accountNumbers);
	driver.wait(driver.findElement(By.xpath('//div[@ng-show="request.request_all_data.valuation.selected.valuation_charge"][2]')).getText().then(function(text){
        text = SF.cleanPrice(text);
        VD.IWant(VD.ToEqual, V.boardNumbers.Valuation, text ,'не совпала страховка на реквест/аккаунт');
	}),config.timeout);
	MF.Account_ClickFullPacking();
	MF.Account_ClickInventoryOpenTab();
	SF.click(By.xpath('//div/span[@ng-bind="::room.name"][contains(text(),"Patio")]'));
	SF.click (By.xpath('//div[@ng-class="{disabled: item.isCannotEdit}"]'));
	SF.click (By.xpath('//div[@data-index="1"]//div[@ng-class="{disabled: item.isCannotEdit}"]'));
	SF.click (By.xpath('//div[@data-index="2"]//div[@ng-class="{disabled: item.isCannotEdit}"]'));
	JS.click('button[ng-click="close()"]');
	MF.Account_WaitForInventoryCheck();

condition.nowWeDoing = 'запоминаем новые цифры после изменений на аккаунте';
	MF.Account_Refresh();
	V.accountNumbersNew = {};
	LF.RememberAccountNumbers(V.accountNumbersNew);
	LF.LogoutFromAccount();

condition.nowWeDoing = 'идем на мувборд, что бы сверить цифры.Выбираем кастомный вес, меняем цену на топливо, рейт и устанавливаем кастомный вес';
	SF.get(V.adminURL);
	LF.LoginToBoardAsCustom(V.adminLogin, V.adminPassword);
	MF.Board_OpenRequest(V.boardNumbers.Id);
	V.boardNumbersNew = {};
	LF.RememberDigitsRequestBoard(V.boardNumbersNew);
    driver.wait(driver.findElement(By.xpath('//input[@ng-model="request.rateDiscount"]')).getAttribute('value').then(function (text) {
        V.boardNumbersNew.NewHourlyRate = SF.cleanPrice(text);
    }),config.timeout);
    SF.sleep(2);
    LF.Validation_Compare_Account_Admin_WhenSetNewRate(V.boardNumbersNew, V.accountNumbersNew);
	MF.EditRequest_OpenFuel();
	MF.EditRequest_SendFlatSurchargeInFuelWindow(222);
	MF.EditRequest_ClickApplyInFuelWindow();
	LF.EditRequest_EditRateCalculOff(444);
    SF.sleep(2);
	MF.EditRequest_OpenSettings();
	MF.EditRequest_ClickCustomCubFit();
	MF.EditRequest_SendNumberCustomCubFit(666);
	MF.EditRequest_OpenRequest();

condition.nowWeDoing ='выбираем трак,переводим работу в нот конферм';
	JS.step(JSstep.selectTruck((V.boardNumbers.LaborTimeMax + V.boardNumbers.TravelTime)/60));
    MF.WaitWhileBusy();
    MF.EditRequest_SetToNotConfirmed();
    V.boardNumbersAfterEdit = {};
	LF.RememberDigitsRequestBoard(V.boardNumbersAfterEdit);
    driver.wait(driver.findElement(By.xpath('//input[@ng-model="request.rateDiscount"]')).getAttribute('value').then(function(text){
        V.boardNumbersAfterEdit.NewHourlyRate= text;
    }),config.timeout);
	MF.EditRequest_SaveChanges();
	MF.EditRequest_CloseEditRequest();
	MF.Board_LogoutAdmin();

condition.nowWeDoing = 'идем в аккаунт,сверяем цифры, проверяем на наличие,после внесенных изменений появления статуса нот-конферм,' +
		'+ проверка на конфермейшн пэйдж появление блока оплаты и после возвращения на аккаунт статуса (должен оставаться нот конферм)';
	SF.get(V.accountURL);
	LF.LoginToAccountAsClient(V.client);
	MF.Account_OpenRequest(V.boardNumbers.Id);
	V.accountNumbersAfterEdit = {};
	LF.RememberAccountNumbers(V.accountNumbersAfterEdit);
    LF.Validation_Compare_Account_Admin_WhenSetNewRate(V.boardNumbersAfterEdit, V.accountNumbersAfterEdit);
	MF.Account_ClickProceedBookYourMove();
	driver.wait(driver.findElement(By.xpath('//div[@ng-class="{\'disabled\':vm.admin}"]/div/h2[contains(text(),"Deposit: ")]')).getText().then(function (text) {
		VD.IWant(VD.ToEqual, text, 'Deposit: $150', 'не появился блок с оплатой ');
	}),config.timeout);
	MF.Account_ConfirmationBackToRequest();
	driver.wait(driver.findElement(By.xpath('//div[@ng-include="vm.statusTemplate"]/div/p[contains(text(),"Status: Not Confirmed")]')).getText().then(function (Status) {
		VD.IWant(VD.NotToEqual, Status, 'PENDING-INFO', 'Реквест перешел в пендинг инфо после просмотра confirmation page');
	}), config.timeout);
	MF.Account_ClickPartialPacking();
	MF.SweetConfirm();
	SF.waitForVisible(By.xpath('//div[@ng-show="vm.statusText.length"]//div[contains(text(),"Pending-info")]'));
	driver.wait(driver.findElement(By.xpath('//div[@ng-show="vm.statusText.length"]//div[contains(text(),"Pending-info")]')).getText().then(function (Status) {
		VD.IWant(VD.ToEqual, Status, 'PENDING-INFO', 'Реквест не перешел в пендинг инфо после добавляения Partial packing');
	}), config.timeout);
	V.accountNumbersLastEdit={};
	LF.RememberAccountNumbers(V.accountNumbersLastEdit);
	LF.LogoutFromAccount();

condition.nowWeDoing = 'переходим на мувборд, проверяем цифры, проверяем статус пэндинг-инфо';
	SF.get(V.adminURL);
	LF.LoginToBoardAsCustom(V.adminLogin,V.adminPassword);
	driver.wait(driver.findElement(By.xpath('//td[contains(text(), "'+V.boardNumbers.Id+'")]')).getText().then(function(text){
		V.PendingDashboard = SF.cleanPrice (text);
		VD.IWant (VD.ToEqual, V.PendingDashboard, V.boardNumbers.Id, 'реквеста нет в табе пендинг на дашборде')
	}),config.timeout);
	MF.Board_OpenRequest(V.boardNumbers.Id);
	V.boardNumbersLastNumbers={};
    driver.wait(driver.findElement(By.xpath('//input[@ng-model="request.rateDiscount"]')).getAttribute('value').then(function(text){
        V.boardNumbersLastNumbers.NewHourlyRate= text;
    }),config.timeout);
	LF.RememberDigitsRequestBoard(V.boardNumbersLastNumbers);
	SF.sleep(2);

condition.nowWeDoing = 'проверка цифр последних изменений на аккаунте и новых чисел на мув-борде.';
    LF.Validation_Compare_Account_Admin_WhenSetNewRate(V.boardNumbersLastNumbers, V.accountNumbersLastEdit);

    condition.nowWeDoing = 'переводим в статус нот конферм   снова, проверяем оплату кастомным платежом';
    MF.EditRequest_SetToNotConfirmed();
    MF.EditRequest_OpenPaymentModalWindow();
    SF.click(By.xpath('//a[@ng-click="addReservationPayment()"]'));
    SF.click(By.xpath('//button[@ng-click="goStepTwo();"]'));
    LF.FillCardPayModal();
    SF.waitForVisible(By.xpath('//div[@ng-show="receipt.transaction_id != \'Custom Payment\' || isAccount"]'));
    MF.WaitWhileBusy();
    SF.click(By.xpath('//button[@ng-click="cancel()"]'));
    MF.EditRequest_ClosePayment();
    MF.EditRequest_SaveChanges();
    MF.EditRequest_CloseEditRequest();
    MF.Board_LogoutAdmin();

condition.nowWeDoing = 'идем на аккаунт проверять статус реквеста и букаемся без оплаты резервейшн прайс';
	SF.get(V.accountURL);
	LF.LoginToAccountAsClient(V.client);
	MF.Account_OpenRequest(V.boardNumbers.Id);
	LF.ConfirmRequestInAccount_NoReservation();
	MF.Account_ConfirmationBackToRequest();
	MF.Account_WaitForGreenTextAfterConfirm();

	SF.endOfTest();
};