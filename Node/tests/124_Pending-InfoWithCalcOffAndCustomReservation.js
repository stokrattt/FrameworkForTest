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
	MF.EditRequest_SwitchCalculator();
	MF.EditRequest_SetAdressToFrom();
	SF.sleep(1);
	MF.EditRequest_OpenClient();
	LF.SetClientPasswd(V.client.passwd);
	MF.EditRequest_OpenRequest();

	condition.nowWeDoing = 'начинаем добавлять пэкинг, адишинал,валюэйшн, инвентарь, дисконт и меняем цену на топливо';
	MF.EditRequest_AddAdditionalServicesFullPack();
	MF.WaitWhileBusy();
	MF.EditRequest_AddValuation();
	driver.wait(driver.findElement(By.xpath('//span[@ng-if="request.request_all_data.valuation.valuation_charge"]')).getAttribute('value').then(function(text){
		V.Valuation= text;
	}),config.timeout);
	LF.addInventoryBoard();
	JS.scroll('i[ng-click="OpenDiscountRateModal();"]');
	LF.EditRequest_EditRateCalculOff(333);
	MF.EditRequest_SaveChanges();
	driver.wait(driver.findElement(By.xpath('//input[@ng-model="request.rateDiscount"]')).getAttribute('value').then(function(text){
		V.NewHourlyRate= text;
		console.log(V.NewHourlyRate);
	}),config.timeout);
	MF.WaitWhileBusy();

	condition.nowWeDoing = 'отправлемя письмо, сравниваем числа в письме,запоминаем конечные цифры с реквеста при выключенном калькуляторе(начальные)';

	SF.click(By.xpath('//div/span[@ng-click="showWarningBeforeSendEmail()"]'));
	SF.click(By.xpath('//span[contains(.,"Default")]'));
	SF.sleep(1);
	SF.click(By.xpath('//h4[contains(text(), "CalculatarOFF")][1]'));
	SF.sleep(1);
	MF.EditRequest_MailDialog_ClickSend();
	JS.scroll('a[ng-click="select(tabs[5])"]');
	SF.sleep(1);
	V.boardNumbers= {};
	LF.RememberDigitsRequestBoard(V.boardNumbers);
	MF.EditRequest_OpenLogs();
	MF.WaitWhileBusy();

	SF.click(By.xpath('//div[@ng-click="allLogsShow[allLogsIndex] = !allLogsShow[allLogsIndex]"]'));
	V.sendclient ={};
	MF.WaitWhileBusy();
	driver.wait(driver.findElement(By.xpath('//td//div[contains(text(),"Crew Size")]/../following-sibling::div')).getText().then(function(text){
		V.sendclient.CrewSize=text;
	}),config.timeout);
	SF.sleep(1);
	VD.IWant(VD.ToEqual, V.boardNumbers.CrewSize +" movers", V.sendclient.CrewSize , ' Crew Size  в логах письма не сошелся со значением в реквесте');

	driver.wait(driver.findElement(By.xpath('//td//div[contains(text(),"Hourly Rate :")]/../following-sibling::div')).getText().then(function(text){
		V.sendclient.HourlyRate = text;
	}),config.timeout);
	SF.sleep(1);
	VD.IWant(VD.ToEqual,"$"+V.NewHourlyRate+"/hr", V.sendclient.HourlyRate , ' Hourly Rate в логах письма не сошелся со значением в реквесте');

	driver.wait(driver.findElement(By.xpath('//td//div[contains(text(),"Valuation :")]/../following-sibling::div')).getText().then(function(text){
		V.sendclient.Valuation = text;
	}),config.timeout);
	SF.sleep(1);
	VD.IWant(VD.ToEqual,"$"+V.boardNumbers.Valuation, V.sendclient.Valuation , ' Valuation в логах письма не сошелся со значением в реквесте');
	MF.EditRequest_CloseEditRequest();
	MF.Board_LogoutAdmin();

	condition.nowWeDoing = 'переходим в аккаунт,делаем сравнения';
	SF.get(V.accountURL);
	LF.LoginToAccountAsClient(V.client);
	MF.Account_OpenRequest(V.boardNumbers.Id);
	MF.Account_ClickViewRequest();
	MF.Account_WaitForLoadingAccount();

	condition.nowWeDoing = 'запоминаем цифры с аккаунта,что бы сравнить реквест и аккаунт';
	V.accountNumbers= {};
	LF.RememberAccountNumbers(V.accountNumbers);
	VD.IWant (VD.ToEqual, V.boardNumbers.TotalMin, V.accountNumbers.TotalMin, 'не совпала квота изменения на  реквест/аккаунт');
	VD.IWant (VD.ToEqual, V.boardNumbers.TotalMax, V.accountNumbers.TotalMax, 'не совпала квота  изменения на  реквест/аккаунт');
	VD.IWant(VD.ToEqual, V.boardNumbers.TravelTime,V.accountNumbers.TravelTime,'не совпал трэвел тайм изменения на реквест/аккаунт');
	VD.IWant(VD.ToEqual, V.boardNumbers.Packing , V.accountNumbers.Packing,'не совпал пэкинг изменения на реквест/аккаунт');
	VD.IWant(VD.ToEqual, V.boardNumbers.Fuel, V.accountNumbers.Fuel,'не совпал фюел изменения на  реквест/аккаунт');
	VD.IWant(VD.ToEqual, V.NewHourlyRate, V.accountNumbers.HourlyRate,'не совпал рейт  изменения на  реквест/аккаунт');
	VD.IWant(VD.ToEqual, V.boardNumbers.Trucks, V.accountNumbers.Trucks,'не совпало количество траков  изменения на  реквест/аккаунт');
	VD.IWant(VD.ToEqual, V.boardNumbers.AdServices,V.accountNumbers.AdServices,'не совпали сервисы  изменения на реквест/аккаунт');
	VD.IWant(VD.ToEqual, V.boardNumbers.CrewSize, V.accountNumbers.CrewSize,'не совпал крюсайз  изменения на  реквест/аккаунт');
	VD.IWant(VD.ToEqual, V.boardNumbers.cbf, V.accountNumbers.cbf,'не совпали кубикфиты  изменения на реквест/аккаунт');

	driver.wait(driver.findElement(By.xpath('//div[@id="valuation-block-account"]/div[6]')).getText().then(function(text){
		V.accountNumbers.Valuation= text;
		console.log();
	}),config.timeout);
	SF.sleep(1);
	VD.IWant(VD.ToEqual, "$ "+V.boardNumbers.Valuation, V.accountNumbers.Valuation ,'не совпала страховка на реквест/аккаунт');


	MF.Account_ClickFullPacking();
	JS.click('a[ng-click=\\"vm.select(tab)\\"]:contains(\\"Inventory\\")');
	SF.sleep(3);
	SF.waitForVisible(By.xpath('//div/span[@ng-bind="::room.name"][contains(text(),"Patio")]'));
	SF.click(By.xpath('//div/span[@ng-bind="::room.name"][contains(text(),"Patio")]'));
	SF.click (By.xpath('//div[@ng-class="{disabled: item.isCannotEdit}"]'));
	SF.click (By.xpath('//div[@data-index="1"]//div[@ng-class="{disabled: item.isCannotEdit}"]'));
	SF.click (By.xpath('//div[@data-index="2"]//div[@ng-class="{disabled: item.isCannotEdit}"]'));
	JS.click('button[ng-click="close()"]');
	MF.Account_WaitForInventoryCheck();
	SF.sleep(3);

	condition.nowWeDoing = 'запоминаем новые цифры после изменений на аккаунте';
	MF.Account_Refresh();
	V.accountNumbers.New = {};
	LF.RememberAccountNumbers(V.accountNumbers.New);
	LF.LogoutFromAccount();

	condition.nowWeDoing = 'идем на мувборд, что бы сверить цифры.Выбираем кастомный вес, меняем цену на топливо, и реит';
	SF.get(V.adminURL);
	LF.LoginToBoardAsCustom(V.adminLogin, V.adminPassword);
	MF.WaitVisibleDashboard();
	MF.Board_OpenRequest(V.boardNumbers.Id);
	MF.EditRequest_WaitForOpenRequest();
	V.boardNumbers.New = {};
	LF.RememberDigitsRequestBoard(V.boardNumbers.New);
	VD.IWant(VD.ToEqual, V.boardNumbers.New.TotalMin, V.accountNumbers.New.TotalMin, 'не совпала квота на аккаунт/мувборд');
	VD.IWant(VD.ToEqual, V.boardNumbers.New.TotalMax, V.accountNumbers.New.TotalMax, 'не совпала квота на аккаунт/мувборд ');
	VD.IWant(VD.ToEqual, V.boardNumbers.New.TravelTime,V.accountNumbers.New.TravelTime,'не совпал трэвел тайм на аккаунт/мувборд');
	VD.IWant(VD.ToEqual, V.boardNumbers.New.Packing , V.accountNumbers.New.Packing,'не совпал пэкинг на аккаунт/мувборд');
	VD.IWant(VD.ToEqual, V.boardNumbers.New.Fuel, V.accountNumbers.New.Fuel,'не совпал фюел  на аккаунт/мувборд');
	VD.IWant(VD.ToEqual, V.NewHourlyRate, V.accountNumbers.New.HourlyRate,'не совпал рейт,который мы в самом начале меняли на аккаунт/мувборд');
	VD.IWant(VD.ToEqual, V.boardNumbers.New.Trucks, V.accountNumbers.New.Trucks,'не совпало количество траков на аккаунт/мувборд');
	VD.IWant(VD.ToEqual, V.boardNumbers.New.AdServices,V.accountNumbers.New.AdServices,'не совпали адишинал сервисы на аккаунт/мувборд');
	VD.IWant(VD.ToEqual, V.boardNumbers.New.CrewSize, V.accountNumbers.New.CrewSize,'не совпал крюсайз на аккаунт/мувборд');
	VD.IWant(VD.ToEqual, V.boardNumbers.New.cbf, V.accountNumbers.New.cbf,'не совпали кубикфиты на аккаунт/мувборд');
	// меняем топливо
	MF.EditRequest_OpenFuel();
	SF.click(By.xpath('//input[@ng-change="changeSurcharge(\'request\',\'perc\')"]'));
	SF.send(By.xpath('//input[@ng-change="changeSurcharge(\'request\',\'perc\')"]'), 222);
	JS.click('button[ng-click="Apply()"]');
	MF.WaitWhileBusy();
	// меняем рейт
	LF.EditRequest_EditRateCalculOff(444);
	driver.wait(driver.findElement(By.xpath('//input[@ng-model="request.rateDiscount"]')).getAttribute('value').then(function(text){
		V.NewHourlyRate1= text;
		console.log(V.NewHourlyRate1);
	}),config.timeout);
	// устанавливаем кастомный вес
	JS.scroll('a[ng-click="select(tabs[7])"]');
	MF.EditRequest_OpenSettings();
	MF.EditRequest_ClickCustomCubFit();
	MF.EditRequest_SendNumberCustomCubFit(666);
	MF.EditRequest_OpenRequest();
	condition.nowWeDoing ='выбираем трак,переводим работу в нот конферм';
	JS.step(JSstep.selectTruck((V.boardNumbers.LaborTimeMax + V.boardNumbers.TravelTime)/60));
	SF.sleep(2);
	MF.EditRequest_SetToNotConfirmed();
	MF.WaitWhileBusy();
	V.boardNumbers.AfterEdit = {};
	LF.RememberDigitsRequestBoard(V.boardNumbers.AfterEdit);
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
	VD.IWant (VD.ToEqual, V.boardNumbers.AfterEdit.TotalMin, V.accountNumbersAfterEdit.TotalMin, 'не совпала  минимальная квота в реквесте и на аккаунте');
	VD.IWant (VD.ToEqual, V.boardNumbers.AfterEdit.TotalMax, V.accountNumbersAfterEdit.TotalMax, 'не совпала максимальная квота в реквесте и на аккаунте ');
	VD.IWant(VD.ToEqual, V.boardNumbers.AfterEdit.TravelTime,V.accountNumbersAfterEdit.TravelTime,'не совпал трэвел тайм в реквесте и на аккаунте');
	VD.IWant(VD.ToEqual, V.boardNumbers.AfterEdit.Packing , V.accountNumbersAfterEdit.Packing,'не совпал пэкинг в реквесте и на аккаунте');
	VD.IWant(VD.ToEqual, V.boardNumbers.AfterEdit.Fuel, V.accountNumbersAfterEdit.Fuel,'не совпал фюел в реквесте и на аккаунте');
	VD.IWant(VD.ToEqual, V.NewHourlyRate1, V.accountNumbersAfterEdit.HourlyRate,'не совпал рейт,который мы меняли во второй раз в реквесте и на аккаунте ');
	VD.IWant(VD.ToEqual, V.boardNumbers.AfterEdit.Trucks, V.accountNumbersAfterEdit.Trucks,'не совпало количество траков в реквесте и на аккаунте');
	VD.IWant(VD.ToEqual, V.boardNumbers.AfterEdit.AdServices,V.accountNumbersAfterEdit.AdServices,'не совпали адишинал сервисы в реквесте и на аккаунте');
	VD.IWant(VD.ToEqual, V.boardNumbers.AfterEdit.CrewSize, V.accountNumbersAfterEdit.CrewSize,'не совпал крюсайз в реквесте и на аккаунте');
	VD.IWant(VD.ToEqual, V.boardNumbers.AfterEdit.cbf, V.accountNumbersAfterEdit.cbf,'не совпали кастомные кубикфиты в реквесте и на аккаунте');
	MF.WaitWhileBusy();
	MF.Account_ClickProceedBookYourMove();
	driver.wait(driver.findElement(By.xpath('//div[@ng-class="{\'disabled\':vm.admin}"]/div/h2[contains(text(),"Deposit: ")]')).getText().then(function (text) {
		VD.IWant(VD.ToEqual, text, 'Deposit: $150',
			'не появился блок с оплатой ');
	}),config.timeout);
	MF.Account_ConfirmationBackToRequest();
	driver.wait(driver.findElement(By.xpath('//div[@ng-include="vm.statusTemplate"]/div/p[contains(text(),"Status: Not Confirmed")]')).getText().then(function (Status) {
		VD.IWant(VD.NotToEqual, Status, 'PENDING-INFO');
	}), config.timeout);
	MF.Account_ClickPartialPacking();
	JS.waitForExist('div[class="sa-confirm-button-container"]');
	SF.click(By.xpath('//div/button[contains(text(),"Yes, I agree")]'));
	SF.waitForVisible(By.xpath('//div[@ng-show="vm.statusText.length"]//div[contains(text(),"Pending-info")]'));
	driver.wait(driver.findElement(By.xpath('//div[@ng-show="vm.statusText.length"]//div[contains(text(),"Pending-info")]')).getText().then(function (Status) {
		VD.IWant(VD.ToEqual, Status, 'PENDING-INFO');
	}), config.timeout);
	MF.WaitWhileBusy();
	V.accountNumbers.LastEdit={};
	LF.RememberAccountNumbers(V.accountNumbers.LastEdit);
	LF.LogoutFromAccount();

	condition.nowWeDoing = 'переходим на мувборд, проверяем цифры, проверяем статус пэндинг-инфо';
	SF.get(V.adminURL);
	LF.LoginToBoardAsCustom(V.adminLogin,V.adminPassword);
	MF.WaitVisibleDashboard();
	driver.wait(driver.findElement(By.xpath('//td[contains(text(), "'+V.boardNumbers.Id+'")]')).getText().then(function(text){
		V.PendingDashboard = SF.cleanPrice (text);
		VD.IWant (VD.ToEqual, V.PendingDashboard, V.boardNumbers.Id, 'реквеста нет в табе пендинг на дашборде')
	}),config.timeout);
	MF.Board_OpenRequest(V.boardNumbers.Id);
	MF.EditRequest_WaitForOpenRequest();
	V.boardNumbers.LastNumbers={};
	LF.RememberDigitsRequestBoard(V.boardNumbers.LastNumbers);

	condition.nowWeDoing = 'проверка цифр последних изменений на аккаунте и новых чисел на мув-борде.';
	VD.IWant (VD.ToEqual, V.boardNumbers.LastNumbers.TotalMin, V.accountNumbers.LastEdit.TotalMin, 'не совпала квота последние изменения на аккаунте/реквест пэдинг-инфо');
	VD.IWant (VD.ToEqual, V.boardNumbers.LastNumbers.TotalMax, V.accountNumbers.LastEdit.TotalMax, 'не совпала квота последние изменения на аккаунте/реквест пэдинг-инфо');
	VD.IWant(VD.ToEqual, V.boardNumbers.LastNumbers.TravelTime,V.accountNumbers.LastEdit.TravelTime,'не совпал трэвел тайм последние изменения на аккаунте/реквест пэдинг-инфо');
	VD.IWant(VD.ToEqual, V.boardNumbers.LastNumbers.Packing , V.accountNumbers.LastEdit.Packing,'не совпал пэкинг последние изменения на аккаунте/реквест пэдинг-инфо');
	VD.IWant(VD.ToEqual, V.boardNumbers.LastNumbers.Fuel, V.accountNumbers.LastEdit.Fuel,'не совпал фюел последние изменения на аккаунте/реквест пэдинг-инфо');
	VD.IWant(VD.ToEqual, V.NewHourlyRate1, V.accountNumbers.LastEdit.HourlyRate,'не совпал рейт последние изменения на аккаунте/реквест пэдинг-инфо');
	VD.IWant(VD.ToEqual, V.boardNumbers.LastNumbers.Trucks, V.accountNumbers.LastEdit.Trucks,'не совпало количество траков последние изменения на аккаунте/реквест пэдинг-инфо');
	VD.IWant(VD.ToEqual, V.boardNumbers.LastNumbers.AdServices,V.accountNumbers.LastEdit.AdServices,'не совпали сервисы последние изменения на аккаунте/реквест пэдинг-инфо');
	VD.IWant(VD.ToEqual, V.boardNumbers.LastNumbers.CrewSize, V.accountNumbers.LastEdit.CrewSize,'не совпал крюсайз последние изменения на аккаунте/реквест пэдинг-инфо');
	VD.IWant(VD.ToEqual, V.boardNumbers.LastNumbers.cbf, V.accountNumbers.LastEdit.cbf,'не совпали кубикфиты последние изменения на аккаунте/реквест пэдинг-инфо');

	condition.nowWeDoing = 'переводим в статус нот конферм   снова, проверяем оплату кастомным платежом';
	MF.EditRequest_SetToNotConfirmed();
	MF.EditRequest_OpenPaymentModalWindow();
	SF.click(By.xpath('//a[@ng-click="addReservationPayment()"]'));
	SF.click(By.xpath('//button[@ng-click="goStepTwo();"]'));
	LF.FillCardPayModal();
	MF.WaitWhileToaster();
	MF.EditRequest_ClosePayment();
	MF.EditRequest_OpenClient();
	LF.SetClientPasswd(123);
	MF.EditRequest_OpenRequest();
	MF.EditRequest_SaveChanges();
	MF.EditRequest_CloseEditRequest();
	MF.Board_LogoutAdmin();

	condition.nowWeDoing = 'идем на аккаунт проверять статус реквеста и букаемся без оплаты резервейшн прайс';
	SF.get(V.accountURL);
	LF.LoginToAccountAsClient(V.client);
	MF.Account_OpenRequest(V.boardNumbers.Id);
	LF.ConfirmRequestInAccount_NoReservation();
	MF.Account_ConfirmationBackToRequest();
	driver.wait(driver.findElement(By.xpath('//div[@ng-include="vm.statusTemplate"]//div[contains(text(),"Your move is confirmed and scheduled")]')).getText().then(function (Status) {
		VD.IWant(VD.ToEqual, Status, 'YOUR MOVE IS CONFIRMED AND SCHEDULED');
	}), config.timeout);


	SF.endOfTest();
};