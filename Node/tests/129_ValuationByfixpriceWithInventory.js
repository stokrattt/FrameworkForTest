module.exports = function main(SF, JS, MF, LF, JSstep, VD, V, By, until,FileDetector, system, condition, config, constants) {
	global.fiber = Fiber.current;
	V.client = {};
	V.client.name = SF.randomBukva(6) + '_t';
	V.client.fam = SF.randomBukva(6) + '_t';
	V.client.phone = SF.randomCifra(10);
	V.client.email = SF.randomBukvaSmall(6) + '@' + SF.randomBukvaSmall(4) + '.tes';
	V.client.passwd = 123;


condition.nowWeDoing = 'заходим под админом в настройки валюэйшн by fixed price,создаем реквест и проверяем ' +
		'сходятся ли расчеты в таблице Valuation с формулой расчетов ';
	SF.get(V.adminURL);
	LF.LoginToBoardAsCustom(V.adminLogin, V.adminPassword);
	MF.Board_OpenSettingsGeneral();
    MF.Board_OpenSettingsValuation();
	driver.wait(driver.executeScript("if ($('md-radio-button[area-label=\"By fixed price\"]').hasClass('md-checked')){return true;} else {$('md-radio-button[area-label=\"By fixed price\"]').click()}"), config.timeout);
	SF.waitForVisible(By.xpath('//md-radio-button[@class="valuation-plan-settings__radio md-primary md-checked"]'));
	driver.wait(driver.executeScript("if($('button[ng-click=\"saveChanges()\"]').hasClass('disabled')){" +
		";}else{$('button[ng-click=\"saveChanges()\"]').click()}"), config.timeout);
	MF.WaitWhileToaster();
	LF.CreateLocalMovingFromBoard(V.client);
    MF.EditRequest_OpenValuationModal();
    MF.EditRequest_ClickTabFullValue();
	driver.wait(driver.findElement(By.xpath('//div[@ng-if="valuation.selected.valuation_type == valuationTypes.FULL_VALUE"]//tr[2]/td')).getText().then(function (text) {
		V.Weight= text;
	}), config.timeout);
	SF.sleep(1);
	driver.wait(driver.findElement(By.xpath('//input[@ng-model="valuation.selected.liability_amount"]')).getAttribute('value').then(function (text) {
		V.AmountOfLiability1 = SF.cleanPrice(text.substring(text.indexOf('$')));
		VD.IWant(VD.ToEqual, V.Weight*0.6 ,V.AmountOfLiability1,'не совпали Amount Of Liability у реквеста с расчетами по формулам');
	}), config.timeout);
	// проверка Valuation Charge
	driver.wait(driver.findElement(By.xpath('//td[contains(text(),"Valuation Charge")]/following-sibling::td[1]')).getText().then(function (text) {
        text = SF.cleanPrice(text.substring(text.indexOf('$')));
		VD.IWant(VD.ToEqual, 150 ,text,'не совпали Valuation Charge у реквеста с расчетами по формулам(первый дедактбл левел)');
	}), config.timeout);
	driver.wait(driver.findElement(By.xpath('//td[contains(text(),"Valuation Charge")]/following-sibling::td[2]')).getText().then(function (text) {
		text = SF.cleanPrice(text.substring(text.indexOf('$')));
		VD.IWant(VD.ToEqual, 200 ,text,'не совпали Valuation Charge у реквеста с расчетами по формулам(второй дедактбл левел)');
	}), config.timeout);
	SF.click(By.xpath('//td[3]/div[@ng-click="setDeductibleLevel(value)"]'));
	// выбираем второй Valuation Charge
	driver.wait(driver.findElement(By.xpath('//td[contains(text(),"Valuation Charge")]/following-sibling::td[2]')).getText().then(function (text) {
		V.SelectLevel = SF.cleanPrice(text.substring(text.indexOf('$')));
	}), config.timeout);
    MF.Account_ClickSaveFullValueModal();
	MF.SweetConfirm();
	MF.WaitWhileBusy();

condition.nowWeDoing = 'назначаем клиенту пароль,выбираем трак, ставим нот конферм';
	MF.EditRequest_OpenClient();
	LF.SetClientPasswd(V.client.passwd);
	MF.EditRequest_OpenRequest();
	V.boardNumbers = {};
	LF.RememberDigitsRequestBoard(V.boardNumbers);
	MF.EditRequest_SetToNotConfirmed();
	JS.step(JSstep.selectTruck((V.boardNumbers.LaborTimeMax + V.boardNumbers.TravelTime)/60));
	MF.WaitWhileBusy();
	MF.EditRequest_SaveChanges();
	MF.EditRequest_CloseEditRequest();
	MF.Board_LogoutAdmin();

condition.nowWeDoing = 'идем на аккаунт, ставим свой amount of liability,добавляем инвентарь,добавляем адрес, проверяем,что бы не пересчитывалось все, проверяем можно ли изменить страховку в статусе пэдинг-инфо,делаем проверку на то,что бы сраховка не превышала лимит компании';
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
	MF.Account_ClickUpdateClientInModalWindow();
	MF.SweetConfirm();
	MF.SweetConfirm();
	driver.wait(driver.findElement(By.xpath('//div[@ng-include="vm.statusTemplate"]/div/p[contains(text(),"Status: Not Confirmed")]')).getText().then(function (Status) {
		VD.IWant(VD.ToEqual, Status, 'Status: Not Confirmed');
	}), config.timeout);
	driver.wait(driver.findElement(By.xpath('//div[@ng-show="request.request_all_data.valuation.selected.valuation_charge"][2]')).getText().then(function (text) {
		V.SelectLevelinAccount = SF.cleanPrice(text.substring(text.indexOf('$')));
		VD.IWant(VD.ToEqual, V.SelectLevelinAccount ,V.SelectLevel,'не совпали Valuation Charge выбранный на реквесте и на аккаунте');
	}), config.timeout);
	MF.Account_ClickAndOpenFullValueModal();
	MF.Account_SendAmountOfLiability(15001);
	SF.click(By.xpath('//div[@ng-bind-html="textforshow"]'));
	MF.SweetConfirm(); //если тут вальнется, то бага, не появился свит аллерт о том,чо страховка превышает лимиты компании
	SF.waitForVisible(By.xpath('//div[@ng-show="edit_amount_of_valuation"]'));
	MF.Account_SendAmountOfLiability(9000);
    MF.Account_ClickSaveFullValueModal();
	driver.wait(driver.findElement(By.xpath('//div[@ng-show="request.request_all_data.valuation.selected.valuation_charge"][2]')).getText().then(function (text) {
		V.SelectLevelinAccount2 = SF.cleanPrice(text.substring(text.indexOf('$')));
		VD.IWant(VD.NotToEqual, V.SelectLevelinAccount2 ,V.SelectLevelinAccount,'совпали Valuation Charge выбранный на аккаунте в первый раз и во второй раз ( такого быть не должно)');
	}), config.timeout);
	LF.AccountLocalAddInventory(V.accountNumbers);
	MF.SweetConfirm();
	MF.Account_WaitForInventoryCheck();
	MF.SweetConfirm();
	MF.Account_CheckRequestStatus_PendingInfo();
	MF.Account_ChangeAmountOfLiability(15000);
	driver.wait(driver.findElement(By.xpath('//div[@ng-show="request.request_all_data.valuation.selected.valuation_charge"][2]')).getText().then(function (text) {
		V.SelectLevelinAccount3 = SF.cleanPrice(text.substring(text.indexOf('$')));
		VD.IWant(VD.NotToEqual, V.SelectLevelinAccount2 ,V.SelectLevelinAccount3,'после внесения амаунт оф лиабилити не поменялась страховка( такого быть не должно)');
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
	MF.EditRequest_OpenClient();
	LF.SetClientPasswd(V.client.passwd);
	MF.EditRequest_OpenRequest();
    MF.EditRequest_OpenValuationModal();
	driver.wait(driver.findElement(By.xpath('//input[@ng-model="valuation.selected.liability_amount"]')).getAttribute('value').then(function (text) {
		V.AmountOfLiabylytiforleter = Math.floor(SF.cleanPrice(text));
	}), config.timeout);
	driver.wait(driver.findElement(By.xpath('//td[contains(text(),"Valuation Charge")]/following-sibling::td[2]')).getText().then(function (text) {
		V.SelectLevelinAdmin = SF.cleanPrice(text.substring(text.indexOf('$')));
		VD.IWant(VD.ToEqual, V.SelectLevelinAccount3 ,V.SelectLevelinAdmin,'не совпала страховка после добавления инвентаря на аккаунте и на мувборде');
	}), config.timeout);
	SF.click(By.xpath('//button[@ng-click="cancel()"]'));
	MF.WaitWhileBusy();
	MF.EditRequest_SetToNotConfirmed();
	MF.EditRequest_SaveChanges();
	MF.EditRequest_OpenMailDialog();
	SF.waitForVisible(By.xpath('//span[@ng-class="{\'text-muted\': isDisabled}"]'));
	SF.click(By.xpath('//span[@ng-class="{\'text-muted\': isDisabled}"]'));
	SF.click(By.xpath('//h4[contains(text(), "Valuation")][1]'));
	MF.EditRequest_MailDialog_ClickSend();
	MF.EditRequest_OpenLogs();
	SF.click(By.xpath('//span[@ng-show="!allLogsShow[allLogsIndex]"]'));
	driver.wait(driver.findElement(By.xpath('//b[contains(text(),"Your valuation charge")]')).getText().then(function (text) {
		text = SF.cleanPrice(text.substring(text.indexOf('$')));
		VD.IWant(VD.ToEqual, text ,V.SelectLevelinAdmin,'не совпад valuation charge в модалке реквеста и письме');
	}), config.timeout);
	driver.wait(driver.findElement(By.xpath('//div[contains(text(), "Full Value Protection Amount of Liability: 15000$")]')).getText().then(function (number) {
		number = SF.cleanPrice(number);
		VD.IWant(VD.ToEqual, number ,V.AmountOfLiabylytiforleter,'не совпал amount of liability в модалке реквеста и письме');
	}), config.timeout);
	MF.EditRequest_CloseEditRequest();
	MF.Board_LogoutAdmin();

condition.nowWeDoing = 'идем на аккаунт букать работу,выбираем 60 цент перпаунд,проверяем на конфирмейшн пейдж что в табличке нету нулей,возвращаемся обратно,выбираем максимальный уровень страховки,букаем работу';
	SF.get(V.accountURL);
	LF.LoginToAccountAsClient(V.client);
	MF.Account_OpenRequest(V.boardNumbers.Id);
	MF.Account_Click60centPerPound();
	MF.Account_ClickProceedBookYourMove();
	driver.wait(driver.findElement(By.xpath('//td[@ng-repeat="charge in calculatedValuations track by $index"]/span')).getText().then(function (text) {
		VD.IWant(VD.NotToEqual, 0, text,'обнулился Valuation Charge, а не должен был');
	}), config.timeout);
	driver.wait(driver.findElement(By.xpath('//td[@ng-repeat="charge in calculatedValuations track by $index"][2]/span')).getText().then(function (text) {
		VD.IWant(VD.NotToEqual, 0, text,'обнулился Valuation Charge, а не должен был');
	}), config.timeout);
	MF.Account_ConfirmationBackToRequest();
	MF.Account_ChangeAmountOfLiability(15000);
	MF.Account_WaitForLoadingAccount();
	MF.Account_ClickProceedBookYourMove();
	JS.scroll('div[ng-if="confirmation_table_show || isFullAmount"]');
	driver.wait(driver.findElement(By.xpath('//div[@ng-if="request.request_all_data.valuation.selected.valuation_charge"]/h2/span')).getText().then(function (text) {
		V.SelectLevelinConfPage = SF.cleanPrice(text.substring(text.indexOf('$')));
		VD.IWant(VD.ToEqual, V.SelectLevelinAdmin ,V.SelectLevelinConfPage,'не совпал выбраный deductible level на админке и на конфирмейшн пэйдж');
	}), config.timeout);
	MF.Account_ClickIAgreeWithAll();
	MF.Account_ConfirmationClickPayDeposit();
	LF.MakeSignJS('signatureCanvasReserv');
    MF.Account_ConfirmationClickSaveSignature();
	LF.FillCardPayModal();
	MF.WaitWhileSpinner();
	MF.Account_WaitForGreenTextAfterConfirm();
	V.accountNumbersAfterConfirmed={};
	LF.RememberAccountNumbers(V.accountNumbersAfterConfirmed);
	LF.LogoutFromAccount();

condition.nowWeDoing = 'выходим из аккаунта, идем на админку,проверяем значения и сверяем что наш валюэйшен есть в табе сейлс и клозинг,переходим на контракт, сравниваем что бы там была страховка,которую мы выставили на аккаунте';
	SF.get(V.adminURL);
	LF.LoginToBoardAsCustom(V.adminLogin,V.adminPassword);
	MF.Board_OpenConfirmed();
	MF.Board_OpenRequest(V.boardNumbers.Id);
	V.boardAfterConfirmed = {};
	LF.RememberDigitsRequestBoard(V.boardAfterConfirmed);
	LF.Validation_Compare_Account_Admin(V.accountNumbersAfterConfirmed,V.boardAfterConfirmed);
	driver.wait(driver.findElement(By.xpath('//span[@ng-if="request.request_all_data.valuation.selected.valuation_charge"]')).getText().then(function (text) {
		V.ValuationSales = SF.cleanPrice(text.substring(text.indexOf('$')));
	}), config.timeout);
	MF.EditRequest_CloseConfirmWork();
	driver.wait(driver.findElement(By.xpath('//span[@ng-if="invoice.request_all_data.valuation.selected.valuation_charge && invoice.request_all_data.valuation.selected.valuation_type == valuationTypes.FULL_VALUE"]')).getText().then(function (text) {
		V.ValuationClosing = SF.cleanPrice(text.substring(text.indexOf('$')));
		VD.IWant(VD.ToEqual, V.ValuationSales ,V.ValuationClosing,'не совпали Valuation на Sales и Closing');
	}), config.timeout);
	MF.EditRequest_OpenContractCloseJob();
	SF.openTab(1);
	MF.SweetConfirm();
	driver.wait(driver.findElement(By.xpath('//div[@ng-if="request.request_all_data.valuation.selected.valuation_charge"]/h2/span')).getText().then(function (text) {
		text = SF.cleanPrice(text.substring(text.indexOf('$')));
		VD.IWant(VD.ToEqual, V.ValuationClosing ,text,'не совпал выбраный deductible level в табе клозинг и на конфирмейшн пэйдж');
	}), config.timeout);
	MF.Contract_OpenBillOfLading();
	driver.wait(driver.findElement(By.xpath('//tr[@ng-if="finance.valuation && finance.valuation != 0"]/td[2]')).getText().then(function (text) {
		text = SF.cleanPrice(text.substring(text.indexOf('$')));
		VD.IWant(VD.ToEqual, V.ValuationClosing ,text,'не совпал выбраный deductible level в табе клозинг и контракте');
	}), config.timeout);
	SF.endOfTest();
};
