module.exports = function main(SF, JS, MF, LF, JSstep, VD, V, By, until,FileDetector, system, condition, config, constants) {
	global.fiber = Fiber.current;
	V.client = {};
	V.client.name = SF.randomBukva(6) + '_t';
	V.client.fam = SF.randomBukva(6) + '_t';
	V.client.phone = SF.randomCifra(10);
	V.client.email = SF.randomBukvaSmall(6) + '@' + SF.randomBukvaSmall(4) + '.tes';
	V.client.passwd = 123;


	condition.nowWeDoing = 'заходим под админом в настройки валюэйшн,создаем реквест и проверяем ' +
		'сходятся ли расчеты в таблице Valuation с формулой расчетов ';
	SF.get(V.adminURL);
	LF.LoginToBoardAsCustom(V.adminLogin, V.adminPassword);
	MF.Board_OpenSettingsGeneral();
	MF.Board_OpenSideBar();
	SF.click(By.xpath('//li[@ng-repeat="tab in vm.tabs"][13]'));
	JS.scroll('div[class="pageheader"]');
	SF.sleep(1);
	driver.wait(driver.executeScript("if ($('md-radio-button[area-label=\"By fixed price\"]').hasClass('md-checked')){return true;} else {$('md-radio-button[area-label=\"By fixed price\"]').click()}"), config.timeout);
	SF.waitForVisible(By.xpath('//md-radio-button[@class="valuation-plan-settings__radio md-primary md-checked"]'));
	driver.wait(driver.executeScript("if($('button[ng-click=\"saveChanges()\"]').hasClass('disabled')){" +
		";}else{$('button[ng-click=\"saveChanges()\"]').click()}"), config.timeout);
	MF.WaitWhileToaster();
	LF.CreateLocalMovingFromBoard(V.client);
	JS.scroll('label[ng-click="openValuationModal()"]');
	SF.click(By.xpath('//label[@ng-click="openValuationModal()"]'));
	SF.waitForVisible(By.xpath('//div[@ng-if="valuation.selected.valuation_type == valuationTypes.PER_POUND"]'));
	SF.click(By.xpath('//div[@ng-click="setValuationType(valuationTypes.FULL_VALUE)"]'));
	MF.WaitWhileToaster();
	driver.wait(driver.findElement(By.xpath('//div[@ng-if="valuation.selected.valuation_type == valuationTypes.FULL_VALUE"]//tr[2]/td')).getText().then(function (text) {
		V.Weight= text;
	}), config.timeout);
	SF.sleep(1);
	const centPerPound= 0.6;
	const Weight = V.Weight;
	let AmountOfLiability = centPerPound * Weight;
	driver.wait(driver.findElement(By.xpath('//input[@ng-model="valuation.selected.liability_amount"]')).getAttribute('value').then(function (text) {
		V.AmountOfLiability1= text;
		V.AmountOfLiability1 = SF.cleanPrice(text.substring(text.indexOf('$')));
		VD.IWant(VD.ToEqual, AmountOfLiability ,V.AmountOfLiability1,'не совпали Valuation у реквеста с расчетами по формулам');
	}), config.timeout);
	// проверка Valuation Charge
	Debug.pause();
	driver.wait(driver.findElement(By.xpath('//td[contains(text(),"Valuation Charge")]/following-sibling::td[1]')).getText().then(function (text) {
		V.DeductibleLevel1= text;
		V.DeductibleLevel1 = SF.cleanPrice(text.substring(text.indexOf('$')));
		VD.IWant(VD.ToEqual, 150 ,V.DeductibleLevel1,'не совпали Valuation у реквеста с расчетами по формулам(первый дедактбл левел)');
	}), config.timeout);
	driver.wait(driver.findElement(By.xpath('//td[contains(text(),"Valuation Charge")]/following-sibling::td[2]')).getText().then(function (text) {
		V.DeductibleLevel2= text;
		V.DeductibleLevel2 = SF.cleanPrice(text.substring(text.indexOf('$')));
		VD.IWant(VD.ToEqual, 200 ,V.DeductibleLevel2,'не совпали Valuation у реквеста с расчетами по формулам(второй дедактбл левел)');
	}), config.timeout);
	SF.click(By.xpath('//td[3]/div[@ng-click="setDeductibleLevel(value)"]'));
	V.SelectLevel= {};
	driver.wait(driver.findElement(By.xpath('//td[contains(text(),"Valuation Charge")]/following-sibling::td[2]')).getText().then(function (text) {
		V.SelectLevel = text;
		V.SelectLevel = SF.cleanPrice(text.substring(text.indexOf('$')));
		console.log(V.SelectLevel);
	}), config.timeout);
	SF.click(By.xpath('//button[@ng-click="clickSave()"]'));
	MF.SweetConfirm();
	MF.WaitWhileBusy();
	MF.WaitWhileToaster();
	MF.EditRequest_OpenClient();
	LF.SetClientPasswd(V.client.passwd);
	MF.EditRequest_OpenSettings();
	LF.SetManager('emilia');
	MF.EditRequest_OpenRequest();
	V.boardNumbers = {};
	LF.RememberDigitsRequestBoard(V.boardNumbers);
	MF.EditRequest_SetToNotConfirmed();
	JS.step(JSstep.selectTruck((V.boardNumbers.LaborTimeMax + V.boardNumbers.TravelTime)/60));
	MF.WaitWhileBusy();
	MF.EditRequest_SaveChanges();
	MF.EditRequest_CloseEditRequest();
	MF.Board_LogoutAdmin();
	condition.nowWeDoing = 'идем на аккаунт, ставим свой amount of liability,добавляем инвентарь, проверяем,что бы не пересчитывалось все.';
	SF.get(V.accountURL);
	LF.LoginToAccountAsClient(V.client);
	MF.Account_OpenRequest(V.boardNumbers.Id);
	MF.Account_ClickViewRequest();
	V.accountNumbers={};
	LF.RememberAccountNumbers(V.accountNumbers);
	LF.Validation_Compare_Account_Admin(V.accountNumbers,V.boardNumbers);
	MF.Account_OpenAdressModal();
	MF.Account_SendAdressToModalWindow();
	MF.Account_SendAdressFromModalWindow();
	SF.click(By.xpath('//button[@ng-click="update(client)"]'));
	MF.SweetConfirm();
	MF.SweetConfirm();
	MF.Account_WaitForLoadingAccount();
	driver.wait(driver.findElement(By.xpath('//div[@ng-include="vm.statusTemplate"]/div/p[contains(text(),"Status: Not Confirmed")]')).getText().then(function (Status) {
		VD.IWant(VD.ToEqual, Status, 'Status: Not Confirmed');
	}), config.timeout);
	V.SelectLevelinAccount= {};
	driver.wait(driver.findElement(By.xpath('//div[@ng-if="request.request_all_data.valuation.selected.valuation_type == valuationTypes.FULL_VALUE"]/div[6]')).getText().then(function (text) {
		V.SelectLevelinAccount = text;
		V.SelectLevelinAccount = SF.cleanPrice(text.substring(text.indexOf('$')));
		console.log(V.SelectLevelinAccount);
		VD.IWant(VD.ToEqual, V.SelectLevelinAccount ,V.SelectLevel,'не совпали Valuation выбранный на реквесте и на аккаунте');
	}), config.timeout);
	SF.click(By.xpath('//div[@ng-click="openValuationAccountModalForFullValue()"]'));
	SF.click(By.xpath('//input[@ng-model-options="{\'updateOn\': \'blur\'}"]'));
	SF.send(By.xpath('//input[@ng-model-options="{\'updateOn\': \'blur\'}"]'),15001);
	SF.click(By.xpath('//div[@ng-bind-html="textforshow"]'));
	MF.SweetConfirm(); //если тут вальнется, то бага, не появился свит аллерт о том,чо страховка превышает лимиты компании
	SF.waitForVisible(By.xpath('//div[@ng-click="openValuationAccountModalForFullValue()"]'));
	SF.click(By.xpath('//input[@ng-model-options="{\'updateOn\': \'blur\'}"]'));
	SF.send(By.xpath('//input[@ng-model-options="{\'updateOn\': \'blur\'}"]'),9000);
	SF.click(By.xpath('//button[@ng-click="clickSave()"]'));
	driver.wait(driver.findElement(By.xpath('//div[@ng-if="request.request_all_data.valuation.selected.valuation_type == valuationTypes.FULL_VALUE"]/div[6]')).getText().then(function (text) {
		V.SelectLevelinAccount2 = text;
		V.SelectLevelinAccount2 = SF.cleanPrice(text.substring(text.indexOf('$')));
		console.log(V.SelectLevelinAccount2);
		VD.IWant(VD.NotToEqual, V.SelectLevelinAccount2 ,V.SelectLevel,'совпали Valuation выбранный на реквесте и на аккаунте');
	}), config.timeout);
	LF.AccountLocalAddInventory(V.accountNumbers);
	MF.SweetConfirm();
	MF.Account_WaitForInventoryCheck();
	MF.SweetConfirm();
	MF.Account_CheckRequestStatus_PendingInfo();
	SF.click(By.xpath('//div[@ng-click="openValuationAccountModalForFullValue()"]'));
	SF.click(By.xpath('//input[@ng-model-options="{\'updateOn\': \'blur\'}"]'));
	SF.click(By.xpath('//td[contains(text(),"Select Valuation")]/following-sibling::td[1]'));
	SF.click(By.xpath('//button[@ng-click="clickSave()"]'));
	driver.wait(driver.findElement(By.xpath('//div[@ng-if="request.request_all_data.valuation.selected.valuation_type == valuationTypes.FULL_VALUE"]/div[6]')).getText().then(function (text) {
		V.SelectLevelinAccount2 = text;
		V.SelectLevelinAccount2 = SF.cleanPrice(text.substring(text.indexOf('$')));
		console.log(V.SelectLevelinAccount2);
		VD.IWant(VD.NotToEqual, V.SelectLevelinAccount2 ,V.SelectLevel,'после внесения амаунт оф лиабилити не поменялась страховка( такого быть не должно)');
	}), config.timeout);
	V.accountNumbersAfterInventory= {};
	LF.RememberAccountNumbers(V.accountNumbersAfterInventory);
	LF.LogoutFromAccount();
	condition.nowWeDoing = 'идем на мувборд, проверяем наш инвенторий и страховку,ставим статус нот конферм.';
	SF.get(V.adminURL);
	LF.LoginToBoardAsCustom(V.adminLogin,V.adminPassword);
	MF.Board_OpenRequest(V.boardNumbers.Id);
	V.boardNumbersAfterInventory={};
	LF.RememberDigitsRequestBoard(V.boardNumbersAfterInventory);
	LF.Validation_Compare_Account_Admin(V.accountNumbersAfterInventory,V.boardNumbersAfterInventory);
	JS.scroll('label[ng-click="openValuationModal()"]');
	SF.click(By.xpath('//label[@ng-click="openValuationModal()"]'));
	SF.waitForVisible(By.xpath('//div[@ng-if="valuation.selected.valuation_type == valuationTypes.FULL_VALUE"]'));
	driver.wait(driver.findElement(By.xpath('//td[contains(text(),"Valuation Charge")]/following-sibling::td[1]')).getText().then(function (text) {
		V.SelectLevelinAdmin = text;
		V.SelectLevelinAdmin = SF.cleanPrice(text.substring(text.indexOf('$')));
		console.log(V.SelectLevelinAdmin);
		VD.IWant(VD.ToEqual, V.SelectLevelinAccount2 ,V.SelectLevelinAdmin,'не совпала страховка после добавления инвентаря на аккаунте и на мувборде');
	}), config.timeout);












};
