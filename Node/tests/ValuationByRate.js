module.exports = function main(SF, JS, MF, LF, JSstep, VD, V, By, until,FileDetector, system, condition, config, constants) {
	global.fiber = Fiber.current;
	V.client = {};
	V.client.name = SF.randomBukva(6) + '_t';
	V.client.fam = SF.randomBukva(6) + '_t';
	V.client.phone = SF.randomCifra(10);
	V.client.email = SF.randomBukvaSmall(6) + '@' + SF.randomBukvaSmall(4) + '.tes';
	V.client.passwd = 123;


	condition.nowWeDoing = 'заходим под админом в настройки валюэйшн by rate,создаем реквест и проверяем ' +
		'сходятся ли расчеты в таблице Valuation с формулой расчетов ';
	SF.get(V.adminURL);
	LF.LoginToBoardAsCustom(V.adminLogin, V.adminPassword);
	MF.Board_OpenSettingsGeneral();
	MF.Board_OpenSideBar();
	SF.click(By.xpath('//li[@ng-repeat="tab in vm.tabs"][13]'));
	JS.scroll('div[class="pageheader"]');
	SF.sleep(1);
	driver.wait(driver.executeScript("if ($('md-radio-button[area-label=\"By rate\"]').hasClass('md-checked')){return true;} else {$('md-radio-button[area-label=\"By rate\"]').click()}"), config.timeout);
	SF.waitForVisible(By.xpath('//md-radio-button[@class="valuation-plan-settings__radio md-primary md-checked"]'));
	driver.wait(driver.executeScript("if($('button[ng-click=\"saveChanges()\"]').hasClass('disabled')){" +
		";}else{$('button[ng-click=\"saveChanges()\"]').click()}"), config.timeout);
	MF.Board_LogoutAdmin();

	condition.nowWeDoing = 'выходим из админки, идем на фронт и создаем с верхней формы реквест. идем на аккаунт.';
	SF.get(V.frontURL);
	LF.FullSmallCalcAsLocal(V.client);
	condition.nowWeDoing = 'первый раз на аккаунте';
	MF.Account_ClickViewRequest();
    MF.Account_ClickAndOpenFullValueModal();
	driver.wait(driver.findElement(By.xpath('//input[@ng-change="changeOnlyLiabilityAmount()"]')).getAttribute('value').then(function (text) {
		V.AmountOfLiability = text;
		V.AmountOfLiability = SF.cleanPrice(text.substring(text.indexOf('$')));
		console.log(V.AmountOfLiability);
	}), config.timeout);
	SF.sleep(1);
	let rate= 30;
	V.ValuationCharge = (V.AmountOfLiability * rate)/1000 ;
	SF.sleep(1);
	driver.wait(driver.findElement(By.xpath('//td[contains(text(),"Valuation Charge")]/following-sibling::td[1]')).getText().then(function (text) {
		V.ValuationCharge1= text;
		V.ValuationCharge1 = SF.cleanPrice(text.substring(text.indexOf('$')));
		VD.IWant(VD.ToEqual, V.ValuationCharge ,V.ValuationCharge1,'не совпали Valuation Charge у реквеста с расчетами по формулам(первый дедактбл левел)');
	}), config.timeout);

	let rate1= 35;
	V.ValuationCharge1 = (V.AmountOfLiability * rate1)/1000 ;
	SF.sleep(1);
	driver.wait(driver.findElement(By.xpath('//td[contains(text(),"Valuation Charge")]/following-sibling::td[2]')).getText().then(function (text) {
		V.ValuationCharge2= text;
		V.ValuationCharge2 = SF.cleanPrice(text.substring(text.indexOf('$')));
		VD.IWant(VD.ToEqual, V.ValuationCharge1 ,V.ValuationCharge2,'не совпали Valuation Charge у реквеста с расчетами по формулам(второй дедактбл левел)');
	}), config.timeout);

	let rate2= 40;
	V.ValuationCharge2 = (V.AmountOfLiability * rate2)/1000 ;
	SF.sleep(1);
	driver.wait(driver.findElement(By.xpath('//td[contains(text(),"Valuation Charge")]/following-sibling::td[3]')).getText().then(function (text) {
		V.ValuationCharge3= text;
		V.ValuationCharge3 = SF.cleanPrice(text.substring(text.indexOf('$')));
		VD.IWant(VD.ToEqual, V.ValuationCharge2 ,V.ValuationCharge3,'не совпали Valuation Charge у реквеста с расчетами по формулам(третий дедактбл левел)');
	}), config.timeout);
	//выбираем уровень страховки (2)
	SF.click(By.xpath('//td[3]/md-checkbox[@ng-change="setDeductibleLevel(value)"]'));
	V.SelectLevel= {};
	driver.wait(driver.findElement(By.xpath('//td[contains(text(),"Valuation Charge")]/following-sibling::td[2]')).getText().then(function (text) {
		V.SelectLevel = text;
		V.SelectLevel = SF.cleanPrice(text.substring(text.indexOf('$')));
	}), config.timeout);
    MF.Account_ClickSaveFullValueModal();
	LF.AccountLocalAddInventory();
	MF.Account_WaitForInventoryCheck();
	driver.wait(driver.findElement(By.xpath('//div[@ng-show="request.request_all_data.valuation.selected.valuation_charge"][2]')).getText().then(function (text) {
		V.SelectLevelAfterInnventory = text;
		V.SelectLevelAfterInnventory = SF.cleanPrice(text.substring(text.indexOf('$')));
		VD.IWant(VD.NotToEqual, V.SelectLevel ,V.SelectLevelAfterInnventory,'совпали Valuation Charge до добавления инвентаря и после ( хотя должен произойти пересчет)');
	}), config.timeout);
	V.accountNumbersAfterInventory= {};
	LF.RememberAccountNumbers(V.accountNumbersAfterInventory);
	LF.LogoutFromAccount();

	condition.nowWeDoing = 'выходим из аккаунта, идем проверять наш реквест,все цифры и страховку. ставим статус нот конферм, идем букаться';
	SF.get(V.adminURL);
	LF.LoginToBoardAsCustom(V.adminLogin,V.adminPassword);
	MF.Board_OpenRequest(V.accountNumbersAfterInventory.Id);
	V.boardNumbersAfterInventory={};
	LF.RememberDigitsRequestBoard(V.boardNumbersAfterInventory);
	LF.Validation_Compare_Account_Admin(V.accountNumbersAfterInventory,V.boardNumbersAfterInventory);
	MF.EditRequest_OpenClient();
	LF.SetClientPasswd(V.client.passwd);
	MF.EditRequest_OpenRequest();
	MF.EditRequest_OpenValuationModal();
	driver.wait(driver.findElement(By.xpath('//td[contains(text(),"Valuation Charge")]/following-sibling::td[2]')).getText().then(function (text) {
		V.SelectLevelinAdmin = text;
		V.SelectLevelinAdmin = SF.cleanPrice(text.substring(text.indexOf('$')));
		VD.IWant(VD.ToEqual, V.SelectLevelAfterInnventory ,V.SelectLevelinAdmin,'не совпала страховка после добавления инвентаря на аккаунте и на мувборде');
		console.log(V.SelectLevelAfterInnventory);
	}), config.timeout);
    MF.Account_ClickSaveFullValueModal();
	MF.SweetConfirm();
	MF.WaitWhileBusy();

	condition.nowWeDoing = 'назначаем менеджера,назначаем клиенту пароль,выбираем трак, ставим нот конферм';
	MF.EditRequest_OpenSettings();
	LF.SetManager('emilia');
	MF.EditRequest_OpenRequest();
	V.boardNumbers = {};
	LF.RememberDigitsRequestBoard(V.boardNumbers);
	MF.EditRequest_SetToNotConfirmed();
	JS.step(JSstep.selectTruck((V.boardNumbers.LaborTimeMax + V.boardNumbers.TravelTime) / 60));
	MF.WaitWhileBusy();
	Debug.pause();
	MF.EditRequest_OpenClient();
	LF.SetClientPasswd(V.client.passwd);
	MF.EditRequest_OpenRequest();
	MF.EditRequest_SaveChanges();
	MF.EditRequest_CloseEditRequest();
	MF.Board_LogoutAdmin();

	condition.nowWeDoing = 'идем конфермить работу,сравниваем значения и все цифры на конфирмейшн пэйдж';
	SF.get(V.accountURL);
	LF.LoginToAccountAsClient(V.client);
	MF.Account_OpenRequest(V.boardNumbers.Id);




	SF.endOfTest();
};