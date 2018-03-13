module.exports = function main(SF, JS, MF, LF, JSstep, VD, V, By, until,FileDetector, system, condition, config, constants) {
	global.fiber = Fiber.current;
	V.client = {};
	V.client.name = SF.randomBukva(6) + '_t';
	V.client.fam = SF.randomBukva(6) + '_t';
	V.client.phone = SF.randomCifra(10);
	V.client.email = SF.randomBukvaSmall(6) + '@' + SF.randomBukvaSmall(4) + '.tes';
	V.client.passwd = 123;

	condition.nowWeDoing = 'создаем мувинг с фронта, отключаем калькулятор';
	SF.get(V.adminURL);
	LF.LoginToBoardAsCustom(V.adminLogin,V.adminPassword);
	LF.CreateLocalMovingFromBoard(V.client);
	MF.EditRequest_SwitchCalculator();
	MF.EditRequest_SetAdressToFrom();
	SF.sleep(1);
	V.boardNumbers = {};
	LF.RememberDigitsRequestBoard(V.boardNumbers);
	MF.EditRequest_OpenClient();
	LF.SetClientPasswd(V.client.passwd);
	MF.EditRequest_OpenRequest();

	condition.nowWeDoing = 'начинаем добавлять пэкинг, адишинал,валюэйшн, инвентарь, дисконт и меняем цену на топливо';
	MF.EditRequest_AddAdditionalServicesFullPack();
	MF.EditRequest_AddPackingAndFullPAcking();
	MF.WaitWhileBusy();
	MF.EditRequest_AddValuation();
	LF.addInventoryBoard();
	LF.EditRequest_EditRateCalculOff(333);
	MF.EditRequest_SaveChanges();
	driver.wait(driver.findElement(By.xpath('//input[@ng-model="request.rateDiscount"]')).getAttribute('value').then(function(text){
		V.NewHourlyRate= text;
		console.log(V.NewHourlyRate);
	}),config.timeout);
	MF.WaitWhileBusy();

	condition.nowWeDoing = 'запоминаем конечные цифры с реквеста при выключенном калькуляторе(начальные)';
	V.boardNumbers = {};
	SF.click(By.xpath('//div/span[@ng-click="showWarningBeforeSendEmail()"]'));
	SF.click(By.xpath('//span[contains(.,"Default")]'));
	SF.sleep(1);
	SF.click(By.xpath('//h4[contains(text(), "CalculatarOFF")][1]'));
	SF.sleep(1);
	MF.EditRequest_MailDialog_ClickSend();
	JS.scroll('a[ng-click="select(tabs[5])"]');
	SF.sleep(1);
	LF.RememberDigitsRequestBoard(V.boardNumbers);
	Debug.pause();
	MF.EditRequest_OpenLogs();
	MF.WaitWhileBusy();

	condition.nowWeDoing = 'сверяем цифры в емаиле,которое отправилось клиенту с реквестом,запоминаем то,что в письме, переменная sendclient';
	SF.click(By.xpath('//div[@ng-click="allLogsShow[allLogsIndex] = !allLogsShow[allLogsIndex]"]'));
	V.sendclient ={};

	MF.WaitWhileBusy();
	driver.wait(driver.findElement(By.xpath('//td//div[contains(text(),"Crew Size")]/../following-sibling::div')).getText().then(function(text){
		V.sendclient.CrewSize=text;
		console.log(V.sendclient.CrewSize);
	}),config.timeout);
	SF.sleep(1);
	VD.IWant(VD.ToEqual, V.boardNumbers.CrewSize +" movers", V.sendclient.CrewSize , ' Crew Size  в логах письма не сошелся со значением в реквесте');
	driver.wait(driver.findElement(By.xpath('//td//div[contains(text(),"Hourly Rate :")]/../following-sibling::div')).getText().then(function(text){
		V.sendclient.HourlyRate = text;
		console.log(V.sendclient.HourlyRate);
	}),config.timeout);
	VD.IWant(VD.ToEqual,"$"+V.NewHourlyRate+"/hr", V.sendclient.HourlyRate , ' Hourly Rate в логах письма не сошелся со значением в реквесте');
	SF.sleep(1);

	driver.wait(driver.findElement(By.xpath('//td//div[contains(text(),"Estimated Quote :")]/../following-sibling::div')).getText().then(function(text){
		V.sendclient.EstimatedQuote = text;
		V.sendclient.EstimateQuote = SF.cleanPrice(text);
		console.log(V.sendclient.EstimatedQuote);
	}),config.timeout);
	VD.IWant(VD.ToEqual,`${V.boardNumbers.TotalMin} - ${(V.boardNumbers.TotalMax).toFixed(2)}`, V.sendclient.EstimatedQuote ,' Hourly Rate в логах письма не сошелся со значением в реквесте');
	Debug.pause();

	MF.EditRequest_CloseEditRequest();
	MF.Board_LogoutAdmin();

	condition.nowWeDoing = 'переходим в аккаунт,делаем сравнения';
	Debug.pause();
	SF.get(V.accountURL);
	LF.LoginToAccountAsClient(V.client);
	MF.Account_OpenRequest(V.boardNumbers.Id);
	MF.Account_ClickViewRequest();
	MF.Account_WaitForLoadingAccount();

	condition.nowWeDoing = 'запоминаем цифры с аккаунта,что бы сравнить реквест и аккаунт';
	V.accountNumbers= {};
	LF.RememberAccountNumbers(V.accountNumbers);
	LF.Validation_Compare_Account_Admin(V.boardNumbers,V.accountNumbers);
	MF.Account_ClickFullPacking();
	JS.click('a[ng-click=\\"vm.select(tab)\\"]:contains(\\"Inventory\\")');
	MF.WaitWhileBusy();
	Debug.pause();
	SF.click(By.xpath('//div/span[@ng-bind="::room.name"][contains(text(),"Patio")]'));
	SF.click (By.xpath('//div[@ng-class="{disabled: item.isCannotEdit}"]'));
	SF.click (By.xpath('//div[@data-index="1"]//div[@ng-class="{disabled: item.isCannotEdit}"]'));
	SF.click (By.xpath('//div[@data-index="2"]//div[@ng-class="{disabled: item.isCannotEdit}"]'));
	JS.click('button[ng-click="close()"]');
	SF.sleep(3);

	condition.nowWeDoing = 'запоминаем новые цифры после изменения на аккаунте';
	V.accountNumbers.New = {};
	SF.sleep(1);
	LF.RememberAccountNumbers(V.accountNumbers.New);
	LF.RememberAccountNumbers(V.accountNumbers.New);
	Debug.pause();
	LF.LogoutFromAccount();

	condition.nowWeDoing = 'идем на мувборд, что бы сверить цифры.Выбираем кастомный вес, меняем цену на топливо, и реит. Запоминаем цифры.';
	SF.get(V.adminURL);
	LF.LoginToBoardAsCustom(V.adminLogin, V.adminPassword);
	MF.WaitVisibleDashboard();
	MF.Board_OpenRequest(V.boardNumbers.Id);

	condition.nowWeDoing = 'сравниваем цифры с аккаунта и на обновленном реквесте';
	V.boardNumbers.New = {};
	LF.RememberDigitsRequestBoard(V.boardNumbers.New);
	LF.RememberDigitsRequestBoard(V.boardNumbers.New);
	LF.Validation_Compare_Account_Admin(V.accountNumbers.New,V.boardNumbers.New);
	// меняем топливо
	MF.EditRequest_OpenFuel();
	SF.click(By.xpath('//input[@ng-change="changeSurcharge(\'request\',\'perc\')"]'));
	SF.send(By.xpath('//input[@ng-change="changeSurcharge(\'request\',\'perc\')"]'), 222);
	JS.click('button[ng-click="Apply()"]');
	MF.WaitWhileBusy();
	// меняем рейт
	LF.EditRequest_EditRateCalculOff(444);
	// устанавливаем кастомный вес
	MF.EditRequest_OpenSettings();
	JS.click('input[ng-change="setCustom()"]');
	SF.send(By.xpath('//input[@ng-change="setCustom()"]'),666);
	JS.click('a[ng-click="select(tabs[0])"]');
	JS.step(JSstep.selectTruck((V.boardNumbers.LaborTimeMax + V.boardNumbers.TravelTime)/60));
	SF.sleep(2);
	MF.EditRequest_SetToNotConfirmed();
	MF.WaitWhileBusy();
	V.boardNumbers.AfterEdit = {};
	LF.RememberDigitsRequestBoard(V.boardNumbers.AfterEdit);
	MF.EditRequest_SaveChanges();
	MF.EditRequest_CloseEditRequest();
	MF.Board_LogoutAdmin();

	condition.nowWeDoing = 'идем в аккаунт,сверяем цифры, проверяем на наличие,после внесенных изменений появления статуса нот-конферм';
	SF.get(V.accountURL);
	LF.LoginToAccountAsClient(V.client);
	MF.Account_OpenRequest(V.boardNumbers.Id);
	V.accountNumbersAfterEdit = {};
	LF.RememberAccountNumbers(V.accountNumbersAfterEdit);
	LF.RememberAccountNumbers(V.accountNumbersAfterEdit);
	LF.Validation_Compare_Account_Admin(V.boardNumbers.AfterEdit,V.accountNumbersAfterEdit);
	SF.sleep(4);
	MF.Account_ClickPartialPacking();
	SF.sleep(4);
	//SF.click(By.xpath('//div[@class="sa-confirm-button-container"]'));
	SF.sleep(2);
	driver.wait(driver.findElement(By.xpath('//div[@ng-show="vm.statusText.length"]//div[contains(text(),"Pending-info")]')).getText().then(function (Status) {
		VD.IWant(VD.ToEqual, Status, 'PENDING-INFO');
	}), config.timeout);
	MF.WaitWhileBusy();
	V.accountNumbers.LastEdit={};
	LF.RememberAccountNumbers(V.accountNumbers.LastEdit);
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
	VD.IWant(VD.ToEqual, V.boardNumbers.LastNumbers.HourlyRate, V.accountNumbers.LastEdit.HourlyRate,'не совпал рейт последние изменения на аккаунте/реквест пэдинг-инфо');
	VD.IWant(VD.ToEqual, V.boardNumbers.LastNumbers.Trucks, V.accountNumbers.LastEdit.Trucks,'не совпало количество траков последние изменения на аккаунте/реквест пэдинг-инфо');
	VD.IWant(VD.ToEqual, V.boardNumbers.LastNumbers.AdServices,V.accountNumbers.LastEdit.AdServices,'не совпали сервисы последние изменения на аккаунте/реквест пэдинг-инфо');
	VD.IWant(VD.ToEqual, V.boardNumbers.LastNumbers.CrewSize, V.accountNumbers.LastEdit.CrewSize,'не совпал крюсайз последние изменения на аккаунте/реквест пэдинг-инфо');
	VD.IWant(VD.ToEqual, V.boardNumbers.LastNumbers.cbf, V.accountNumbers.LastEdit.cbf,'не совпали кубикфиты последние изменения на аккаунте/реквест пэдинг-инфо');

	SF.endOfTest();
};