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
		VD.IWant(VD.ToEqual, AmountOfLiability ,V.AmountOfLiability1,'не совпали Amount Of Liability у реквеста с расчетами по формулам');
	}), config.timeout);
	// проверка Valuation Charge
	driver.wait(driver.findElement(By.xpath('//td[contains(text(),"Valuation Charge")]/following-sibling::td[1]')).getText().then(function (text) {
		V.DeductibleLevel1= text;
		V.DeductibleLevel1 = SF.cleanPrice(text.substring(text.indexOf('$')));
		VD.IWant(VD.ToEqual, 150 ,V.DeductibleLevel1,'не совпали Valuation Charge у реквеста с расчетами по формулам(первый дедактбл левел)');
	}), config.timeout);
	driver.wait(driver.findElement(By.xpath('//td[contains(text(),"Valuation Charge")]/following-sibling::td[2]')).getText().then(function (text) {
		V.DeductibleLevel2= text;
		V.DeductibleLevel2 = SF.cleanPrice(text.substring(text.indexOf('$')));
		VD.IWant(VD.ToEqual, 200 ,V.DeductibleLevel2,'не совпали Valuation Charge у реквеста с расчетами по формулам(второй дедактбл левел)');
	}), config.timeout);
	SF.click(By.xpath('//td[3]/div[@ng-click="setDeductibleLevel(value)"]'));
	// выбираем второй Valuation Charge
	V.SelectLevel= {};
	driver.wait(driver.findElement(By.xpath('//td[contains(text(),"Valuation Charge")]/following-sibling::td[2]')).getText().then(function (text) {
		V.SelectLevel = text;
		V.SelectLevel = SF.cleanPrice(text.substring(text.indexOf('$')));
	}), config.timeout);
	SF.click(By.xpath('//button[@ng-click="clickSave()"]'));
	MF.SweetConfirm();
	MF.WaitWhileBusy();
	MF.WaitWhileToaster();

	condition.nowWeDoing = 'назначаем менеджера,назначаем клиенту пароль,выбираем трак, ставим нот конферм';
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
	SF.click(By.xpath('//button[@ng-click="update(client)"]'));
	MF.SweetConfirm();
	MF.SweetConfirm();
	MF.Account_WaitForLoadingAccount();
	driver.wait(driver.findElement(By.xpath('//div[@ng-include="vm.statusTemplate"]/div/p[contains(text(),"Status: Not Confirmed")]')).getText().then(function (Status) {
		VD.IWant(VD.ToEqual, Status, 'Status: Not Confirmed');
	}), config.timeout);
	V.SelectLevelinAccount= {};
	driver.wait(driver.findElement(By.xpath('//div[@ng-show="request.request_all_data.valuation.selected.valuation_charge"][2]')).getText().then(function (text) {
		V.SelectLevelinAccount = text;
		V.SelectLevelinAccount = SF.cleanPrice(text.substring(text.indexOf('$')));
		VD.IWant(VD.ToEqual, V.SelectLevelinAccount ,V.SelectLevel,'не совпали Valuation Charge выбранный на реквесте и на аккаунте');
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
	driver.wait(driver.findElement(By.xpath('//div[@ng-show="request.request_all_data.valuation.selected.valuation_charge"][2]')).getText().then(function (text) {
		V.SelectLevelinAccount2 = text;
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
		V.SelectLevelinAccount3 = text;
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
	JS.scroll('label[ng-click="openValuationModal()"]');
	SF.click(By.xpath('//label[@ng-click="openValuationModal()"]'));
	SF.waitForVisible(By.xpath('//div[@ng-if="valuation.selected.valuation_type == valuationTypes.FULL_VALUE"]'));
	driver.wait(driver.findElement(By.xpath('//td[contains(text(),"Valuation Charge")]/following-sibling::td[2]')).getText().then(function (text) {
		V.SelectLevelinAdmin = text;
		V.SelectLevelinAdmin = SF.cleanPrice(text.substring(text.indexOf('$')));
		VD.IWant(VD.ToEqual, V.SelectLevelinAccount3 ,V.SelectLevelinAdmin,'не совпала страховка после добавления инвентаря на аккаунте и на мувборде');
	}), config.timeout);
	SF.click(By.xpath('//button[@ng-click="cancel()"]'));
	MF.WaitWhileBusy();
	MF.EditRequest_SetToNotConfirmed();
	MF.EditRequest_SaveChanges();
	MF.EditRequest_CloseEditRequest();
	MF.Board_LogoutAdmin();

	condition.nowWeDoing = 'идем на аккаунт букать работу';
	SF.get(V.accountURL);
	LF.LoginToAccountAsClient(V.client);
	MF.Account_OpenRequest(V.boardNumbers.Id);
	MF.Account_ClickProceedBookYourMove();
	JS.scroll('div[ng-if="confirmation_table_show || isFullAmount"]');
	driver.wait(driver.findElement(By.xpath('//div[@ng-if="request.request_all_data.valuation.selected.valuation_charge"]/h2/span')).getText().then(function (text) {
		V.SelectLevelinConfPage = text;
		V.SelectLevelinConfPage = SF.cleanPrice(text.substring(text.indexOf('$')));
		VD.IWant(VD.ToEqual, V.SelectLevelinAdmin ,V.SelectLevelinConfPage,'не совпал выбраный deductible level на админке и на конфирмейшн пэйдж');
	}), config.timeout);
	JS.scroll('div[ng-click="addReservationPayment()"]');
	MF.Account_ClickIAgreeWithAll();
	SF.click(By.xpath('//div[@ng-click="addReservationPayment()"]'));
	SF.waitForVisible(By.xpath('//canvas[@id="signatureCanvasReserv"]'));
	LF.MakeSignJS('signatureCanvasReserv');
	SF.click(By.xpath('//button[contains(@ng-click,"saveReservSignature()")]'));
	LF.FillCardPayModal();
	MF.WaitWhileSpinner();
	MF.Account_WaitForGreenTextAfterConfirm();
	V.accountNumbersAfterConfirmed={};
	LF.RememberAccountNumbers(V.accountNumbersAfterConfirmed);
	LF.LogoutFromAccount();

	condition.nowWeDoing = 'выходим из аккаунта,назначаем команду,идем на контракт со стороны форемана';
	SF.get(V.adminURL);
	LF.LoginToBoardAsCustom(V.adminLogin,V.adminPassword);
	MF.Board_OpenConfirmed();
	MF.Board_OpenRequest(V.boardNumbers.Id);
	V.boardAfterConfirmed = {};
	LF.RememberDigitsRequestBoard(V.boardAfterConfirmed);
	LF.Validation_Compare_Account_Admin(V.accountNumbersAfterConfirmed,V.boardAfterConfirmed);
	JS.scroll('div[ng-if="Invoice"]');
	V.ValuationSales= {};
	driver.wait(driver.findElement(By.xpath('//span[@ng-if="request.request_all_data.valuation.selected.valuation_charge"]')).getText().then(function (text) {
		V.ValuationSales = text;
	}), config.timeout);
	SF.click(By.xpath('//div[@ng-click="changeSalesClosingTab(\'closing\')"]'));
	MF.WaitWhileBusy();
	V.ValuationClosing= {};
	driver.wait(driver.findElement(By.xpath('//span[@ng-if="invoice.request_all_data.valuation.selected.valuation_charge && invoice.request_all_data.valuation.selected.valuation_type == valuationTypes.FULL_VALUE"]')).getText().then(function (text) {
		V.ValuationClosing = text;
		VD.IWant(VD.ToEqual, V.ValuationSales ,V.ValuationClosing,'не совпали Valuation на Sales и Closing');
	}), config.timeout);

	condition.nowWeDoing = 'идем в локалдиспатч, назначаем работников';
	MF.EditRequest_CloseEditRequest();
	MF.Board_OpenLocalDispatch();
	LF.findDayInLocalDispatch(V.boardNumbers.moveDate.Year, V.boardNumbers.moveDate.Month, V.boardNumbers.moveDate.Day);
	MF.Dispatch_GridView();
	LF.SelectRequestDispatch(V.boardNumbers.Id);
	LF.selectCrew(V.foremanName);
	MF.Board_LogoutAdmin();

	condition.nowWeDoing = 'заходим под фореманом, идем на контракт';
	LF.LoginToBoardAsCustomForeman(V.foremanLogin, V.foremanPassword);
	LF.OpenRequestInForemanPage(V.boardNumbers.Id);
	MF.Contract_WaitConfirmationPage();
	MF.Contract_OpenBillOfLading();
	LF.MakeSignInContract();
	LF.MakeSignInContract();
	MF.Contract_DeclarationValueA();
	LF.MakeSignInContract();
	driver.wait(driver.findElement(By.xpath('//tr[@ng-if="finance.valuation && finance.valuation != 0"]/td[2]')).getText().then(function (text) {
		V.ValuationinContract = text;
		VD.IWant(VD.ToEqual, V.ValuationinContract ,V.ValuationClosing,'не совпали Valuation Charge на клозинге в реквесте и на контракте');
	}), config.timeout);
	LF.MakeSignInContract();
	LF.MakeSignInContract();
	MF.Contract_ClickPay();
	MF.Contract_ClickTips10();
	MF.Contract_ClickAddTips();
	MF.Contract_ClickPaymentInfo();
	LF.FillCardPayModal();
	LF.Contract_SignMainPayment();
	driver.wait(new FileDetector().handleFile(driver, system.path.resolve('./files/squirrel.jpg')).then(function (path) {
		V.path = path;
	}), config.timeout);
	SF.sleep(1);
	MF.Contract_UploadImage(V.path);
	MF.Contract_UploadImage(V.path);
	MF.Contract_SaveImages();
	LF.MakeSignInContract();
	LF.MakeSignInContract();
	V.contractNumbers = {};
	MF.Contract_Submit(V.contractNumbers);
	MF.Contract_ReturnToForeman();
	LF.LogoutFromBoardForeman();

	condition.nowWeDoing = 'возвращаемся в диспатч, смотрим пейролл';
	LF.LoginToBoardAsCustom(V.adminLogin,V.adminPassword);
	MF.Board_OpenLocalDispatch();
	LF.findDayInLocalDispatch(V.boardNumbers.moveDate.Year, V.boardNumbers.moveDate.Month, V.boardNumbers.moveDate.Day);
	MF.Dispatch_GridView();
	MF.Dispatch_ShowDoneJobs();
	LF.OpenRequestDispatch(V.boardNumbers.Id);
	MF.EditRequest_WaitForBalanceVisible();
	LF.RememberDigitsRequestBoard_Down(V.boardNumbers);
	MF.EditRequest_ScrollDown();
	VD.IWant(VD.ToEqual, V.boardNumbers.Balance, 0, 'Баланс после закрытия не равен 0');
	MF.EditRequest_OpenPayroll();
	V.managerName = 'emilia clark';
	LF.RememberAndValidatePayroll_In_EditRequest(V.managerName, V.boardNumbers, V.contractNumbers);
	SF.sleep (1);
	MF.EditRequest_CloseModal();
	LF.closeEditRequest();

	condition.nowWeDoing = 'сейчас идём в пейролл';
	MF.Board_OpenPayroll();
	LF.selectDateInPayroll(V.boardNumbers.moveDate);
	LF.findTestForemanInPayroll(V.foremanName);

	condition.nowWeDoing = 'выбираем цифры формена';
	V.payrollNumbers = {
		Foreman:{}, Sale:{}
	};
	MF.Payroll_getTotalById(V.boardNumbers.Id, V.payrollNumbers.Foreman);
	VD.IWant(VD.ToEqual, V.payrollNumbers.Foreman.Total, V.boardNumbers.Payroll.foremanForCommission.total, 'не совпали цифры в Payroll foreman\n' +
		'id=' + V.boardNumbers.Id);
	MF.Payroll_ClickAllDepartment();

	condition.nowWeDoing = 'выбираем цифры менеджера';
	LF.findSaleInPayroll(V.managerName);
	MF.Payroll_getTotalById(V.boardNumbers.Id, V.payrollNumbers.Sale);
	VD.IWant(VD.ToEqual, V.payrollNumbers.Sale.Total, V.boardNumbers.Payroll.managerForCommission.total, 'не совпали цифры в Payroll manager\n' +
		'id=' + V.boardNumbers.Id);
	SF.sleep(1);

	condition.nowWeDoing = 'возвращаем настройку на By percent';
	MF.Board_OpenSettingsGeneral();
	MF.Board_OpenSideBar();
	SF.click(By.xpath('//li[@ng-repeat="tab in vm.tabs"][13]'));
	JS.scroll('div[class="pageheader"]');
	SF.sleep(1);
	driver.wait(driver.executeScript("if ($('md-radio-button[area-label=\"By percent\"]').hasClass('md-checked')){return true;} else {$('md-radio-button[area-label=\"By percent\"]').click()}"),config.timeout);
	SF.waitForVisible(By.xpath('//md-radio-button[@class="valuation-plan-settings__radio md-primary md-checked"]'));
	driver.wait(driver.executeScript("if($('button[ng-click=\"saveChanges()\"]').hasClass('disabled')){" +
		";}else{$('button[ng-click=\"saveChanges()\"]').click()}"),config.timeout);
	MF.WaitWhileToaster();

	SF.endOfTest();
};
