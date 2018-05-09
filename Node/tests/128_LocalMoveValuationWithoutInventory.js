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
	LF.LoginToBoardAsCustom(V.adminLogin,V.adminPassword);
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

	// MF.WaitWhileBusy();
	// // берем опцию By persent и начинаем запихивать значения по вертикали
	// SF.click(By.xpath('//md-radio-button[@id="radio_2"]'));
	// SF.send(By.xpath('//tr[@ng-repeat="body in vm.selectedTable.body track by trackValuationTable($index)"][7]/td/input'),7000);
	// SF.click(By.xpath('//div[@class="valuation-plan-settings__header bg-blue"]/h3[contains(text(),"Valuation Plan")]'));
	// SF.sleep(1);
	// SF.send(By.xpath('//tr[@ng-repeat="body in vm.selectedTable.body track by trackValuationTable($index)"][6]/td/input'),6000);
	// SF.click(By.xpath('//div[@class="valuation-plan-settings__header bg-blue"]/h3[contains(text(),"Valuation Plan")]'));
	// SF.sleep(1);
	// SF.send(By.xpath('//tr[@ng-repeat="body in vm.selectedTable.body track by trackValuationTable($index)"][5]/td/input'),5000);
	// SF.click(By.xpath('//div[@class="valuation-plan-settings__header bg-blue"]/h3[contains(text(),"Valuation Plan")]'));
	// SF.sleep(1);
	// SF.send(By.xpath('//tr[@ng-repeat="body in vm.selectedTable.body track by trackValuationTable($index)"][4]/td/input'),4000);
	// SF.click(By.xpath('//div[@class="valuation-plan-settings__header bg-blue"]/h3[contains(text(),"Valuation Plan")]'));
	// SF.sleep(1);
	// SF.send(By.xpath('//tr[@ng-repeat="body in vm.selectedTable.body track by trackValuationTable($index)"][3]/td/input'),3000);
	// SF.click(By.xpath('//div[@class="valuation-plan-settings__header bg-blue"]/h3[contains(text(),"Valuation Plan")]'));
	// SF.sleep(1);
	// SF.send(By.xpath('//tr[@ng-repeat="body in vm.selectedTable.body track by trackValuationTable($index)"][2]/td/input'),2000);
	// SF.click(By.xpath('//div[@class="valuation-plan-settings__header bg-blue"]/h3[contains(text(),"Valuation Plan")]'));
	// SF.sleep(1);
	// SF.send(By.xpath('//tr[@ng-repeat="body in vm.selectedTable.body track by trackValuationTable($index)"][1]/td/input'),1000);
	// SF.click(By.xpath('//div[@class="valuation-plan-settings__header bg-blue"]/h3[contains(text(),"Valuation Plan")]'));
	// SF.sleep(1);
	// // берем опцию By persent и начинаем запихивать значения по горизонтали
	// SF.send(By.xpath('//th[@class="valuation-table__cell valuation-table-header-cell-index-0"]/span/input'),600);
	// SF.click(By.xpath('//div[@class="valuation-plan-settings__header bg-blue"]/h3[contains(text(),"Valuation Plan")]'));
	// SF.sleep(1);
	// SF.send(By.xpath('//th[@class="valuation-table__cell valuation-table-header-cell-index-0"]/span/input'),500);
	// SF.click(By.xpath('//div[@class="valuation-plan-settings__header bg-blue"]/h3[contains(text(),"Valuation Plan")]'));
	// SF.sleep(1);
	// SF.send(By.xpath('//th[@class="valuation-table__cell valuation-table-header-cell-index-0"]/span/input'),400);
	// SF.click(By.xpath('//div[@class="valuation-plan-settings__header bg-blue"]/h3[contains(text(),"Valuation Plan")]'));
	// SF.sleep(1);
	// SF.send(By.xpath('//th[@class="valuation-table__cell valuation-table-header-cell-index-0"]/span/input'),300);
	// SF.click(By.xpath('//div[@class="valuation-plan-settings__header bg-blue"]/h3[contains(text(),"Valuation Plan")]'));
	// SF.sleep(1);
	//
	// // берем опцию By persent и начинаем запихивать значения процентов, создаем цикл и с помощью него добавляем проценты в инпуты
	//
	// let cellArray = [
	// 	//first row
	// 	'//tr[@class="valuation-table__row body valuation-table-row-index-0"]/td[@class="valuation-table__cell valuation-table-body-cell-index-0"]/input[@ng-if="vm.percent"]',
	// 	'//tr[@class="valuation-table__row body valuation-table-row-index-0"]/td[@class="valuation-table__cell valuation-table-body-cell-index-1"]/input[@ng-if="vm.percent"]',
	// 	'//tr[@class="valuation-table__row body valuation-table-row-index-0"]/td[@class="valuation-table__cell valuation-table-body-cell-index-2"]/input[@ng-if="vm.percent"]',
	// 	//second row
	// 	'//tr[@class="valuation-table__row body valuation-table-row-index-1"]/td[@class="valuation-table__cell valuation-table-body-cell-index-0"]/input[@ng-if="vm.percent"]',
	// 	'//tr[@class="valuation-table__row body valuation-table-row-index-1"]/td[@class="valuation-table__cell valuation-table-body-cell-index-1"]/input[@ng-if="vm.percent"]',
	// 	'//tr[@class="valuation-table__row body valuation-table-row-index-1"]/td[@class="valuation-table__cell valuation-table-body-cell-index-2"]/input[@ng-if="vm.percent"]',
	// 	//third row
	// 	'//tr[@class="valuation-table__row body valuation-table-row-index-2"]/td[@class="valuation-table__cell valuation-table-body-cell-index-0"]/input[@ng-if="vm.percent"]',
	// 	'//tr[@class="valuation-table__row body valuation-table-row-index-2"]/td[@class="valuation-table__cell valuation-table-body-cell-index-1"]/input[@ng-if="vm.percent"]',
	// 	'//tr[@class="valuation-table__row body valuation-table-row-index-2"]/td[@class="valuation-table__cell valuation-table-body-cell-index-2"]/input[@ng-if="vm.percent"]',
	// 	// fourth row
	// 	'//tr[@class="valuation-table__row body valuation-table-row-index-3"]/td[@class="valuation-table__cell valuation-table-body-cell-index-0"]/input[@ng-if="vm.percent"]',
	// 	'//tr[@class="valuation-table__row body valuation-table-row-index-3"]/td[@class="valuation-table__cell valuation-table-body-cell-index-1"]/input[@ng-if="vm.percent"]',
	// 	'//tr[@class="valuation-table__row body valuation-table-row-index-3"]/td[@class="valuation-table__cell valuation-table-body-cell-index-2"]/input[@ng-if="vm.percent"]',
	// 	//firth row
	// 	'//tr[@class="valuation-table__row body valuation-table-row-index-4"]/td[@class="valuation-table__cell valuation-table-body-cell-index-0"]/input[@ng-if="vm.percent"]',
	// 	'//tr[@class="valuation-table__row body valuation-table-row-index-4"]/td[@class="valuation-table__cell valuation-table-body-cell-index-1"]/input[@ng-if="vm.percent"]',
	// 	'//tr[@class="valuation-table__row body valuation-table-row-index-4"]/td[@class="valuation-table__cell valuation-table-body-cell-index-2"]/input[@ng-if="vm.percent"]',
	// 	//six row
	// 	'//tr[@class="valuation-table__row body valuation-table-row-index-5"]/td[@class="valuation-table__cell valuation-table-body-cell-index-0"]/input[@ng-if="vm.percent"]',
	// 	'//tr[@class="valuation-table__row body valuation-table-row-index-5"]/td[@class="valuation-table__cell valuation-table-body-cell-index-1"]/input[@ng-if="vm.percent"]',
	// 	'//tr[@class="valuation-table__row body valuation-table-row-index-5"]/td[@class="valuation-table__cell valuation-table-body-cell-index-2"]/input[@ng-if="vm.percent"]',
	// 	//seven row
	// 	'//tr[@class="valuation-table__row body valuation-table-row-index-6"]/td[@class="valuation-table__cell valuation-table-body-cell-index-0"]/input[@ng-if="vm.percent"]',
	// 	'//tr[@class="valuation-table__row body valuation-table-row-index-6"]/td[@class="valuation-table__cell valuation-table-body-cell-index-1"]/input[@ng-if="vm.percent"]',
	// 	'//tr[@class="valuation-table__row body valuation-table-row-index-6"]/td[@class="valuation-table__cell valuation-table-body-cell-index-2"]/input[@ng-if="vm.percent"]',
	//
	// ];
	// let cellValue = 10;
	// cellArray.forEach(function(cell,index){
	// 	SF.send(By.xpath(cell),cellValue);
	// 	SF.click(By.xpath('//div[@class="valuation-plan-settings__header bg-blue"]/h3[contains(text(),"Valuation Plan")]'));
	// 	SF.sleep(1);
	// 	cellValue+=5;
	// 	if (index===3||index===6) cellValue = 10;
	// });
	//
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
	SF.sleep(1);
	// проверка Valuation Charge
	let percent0= 0.1;
	let ValuationCharge0 = V.AmountOfLiability1 * percent0;
	driver.wait(driver.findElement(By.xpath('//td[contains(text(),"Valuation Charge")]/following-sibling::td[1]')).getText().then(function (text) {
		V.ValuationCharge1= text;
		V.ValuationCharge1 = SF.cleanPrice(text.substring(text.indexOf('$')));
		VD.IWant(VD.ToEqual, ValuationCharge0 ,V.DeductibleLevel1,'не совпали Valuation Charge у реквеста с расчетами по формулам(первый дедактбл левел)');
	}), config.timeout);
	SF.sleep(1);
	let percent1 = 0.15;
	let ValuationCharge1 = V.AmountOfLiability1 * percent1;
	driver.wait(driver.findElement(By.xpath('//td[contains(text(),"Valuation Charge")]/following-sibling::td[2]')).getText().then(function (text) {
		V.ValuationCharge2= text;
		V.ValuationCharge2 = SF.cleanPrice(text.substring(text.indexOf('$')));
		VD.IWant(VD.ToEqual, ValuationCharge1 ,V.ValuationCharge2,'не совпали Valuation Charge у реквеста с расчетами по формулам (второй дедактбл левел)');
	}), config.timeout);
	SF.sleep(1);
	let percent2 = 0.2;
	let ValuationCharge2 = V.AmountOfLiability1 * percent2;
	driver.wait(driver.findElement(By.xpath('//td[contains(text(),"Valuation Charge")]/following-sibling::td[3]')).getText().then(function (text) {
		V.ValuationCharge3= text;
		V.ValuationCharge3 = SF.cleanPrice(text.substring(text.indexOf('$')));
		VD.IWant(VD.ToEqual, ValuationCharge2 ,V.ValuationCharge3,'не совпали Valuation Charge у реквеста с расчетами по формулам(третий дедактбл левел)');
	}), config.timeout);
	SF.sleep(1);
	let percent3 = 0.25;
	let ValuationCharge3 = V.AmountOfLiability1 * percent3;
	driver.wait(driver.findElement(By.xpath('//td[contains(text(),"Valuation Charge")]/following-sibling::td[4]')).getText().then(function (text) {
		V.ValuationCharge4= text;
		V.ValuationCharge4 = SF.cleanPrice(text.substring(text.indexOf('$')));
		VD.IWant(VD.ToEqual, ValuationCharge3 ,V.ValuationCharge4,'не совпали Valuation Charge у реквеста с расчетами по формулам(четвертый дедактбл левел)');
	}), config.timeout);
	SF.click(By.xpath('//td[@ng-repeat="value in currentPlan.header track by $index"][2]/div[@ng-click="setDeductibleLevel(value)"]'));
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
	MF.EditRequest_SetToNotConfirmed();
	V.boardNumbers = {};
	LF.RememberDigitsRequestBoard(V.boardNumbers);
	JS.step(JSstep.selectTruck((V.boardNumbers.LaborTimeMax + V.boardNumbers.TravelTime)/60));
	MF.WaitWhileBusy();
	MF.EditRequest_SaveChanges();
	MF.EditRequest_CloseEditRequest();
	MF.Board_LogoutAdmin();

	condition.nowWeDoing = 'идем на аккаунт,проверяем все значения,проверяем то,что мы выбрали на мувборде( какой дедактбл левел) ' +
		'смотрим,не переведется ли при смене страховки в статус пэдинг-инфо' +
		'после оплаты резервейшн прайс будем пытаться в статусе конферм поменять страховку ';
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
	V.ValuationChargeinAccount= {};
	driver.wait(driver.findElement(By.xpath('//div[@ng-if="request.request_all_data.valuation.selected.valuation_type == valuationTypes.FULL_VALUE"]/div[6]')).getText().then(function (text) {
		V.ValuationChargeinAccount = text;
		V.ValuationChargeinAccount = SF.cleanPrice(text.substring(text.indexOf('$')));
		console.log(V.ValuationChargeinAccount);
		VD.IWant(VD.ToEqual, V.ValuationChargeinAccount ,V.SelectLevel,'не совпали Valuation выбранный на реквесте и на аккаунте');
	}), config.timeout);
	SF.click(By.xpath('//div[@ng-click="openValuationAccountModalForFullValue()"]'));
	SF.click(By.xpath('//td[4]/md-checkbox[@aria-label="$ 500"]'));
	SF.sleep(0.5);
	SF.click(By.xpath('//button[@ng-click="clickSave()"]'));
	V.ValuationChargeinAccount2= {};
	driver.wait(driver.findElement(By.xpath('//div[@ng-if="request.request_all_data.valuation.selected.valuation_type == valuationTypes.FULL_VALUE"]/div[6]')).getText().then(function (text) {
		V.ValuationChargeinAccount2 = text;
		V.ValuationChargeinAccount2 = SF.cleanPrice(text.substring(text.indexOf('$')));
		console.log(V.ValuationChargeinAccount2);
	}), config.timeout);
	driver.wait(driver.findElement(By.xpath('//div[@ng-include="vm.statusTemplate"]/div/p[contains(text(),"Status: Not Confirmed")]')).getText().then(function (Status) {
		VD.IWant(VD.ToEqual, Status, 'Status: Not Confirmed');
	}), config.timeout);
	MF.Account_ClickProceedBookYourMove();
	V.SelectLevelinConfPage={};
	driver.wait(driver.findElement(By.xpath('//table[@class="valuation-confirmation-table"]/tbody/tr[2]/td[4]/span'))
		.getText()
		.then(function (text) {
			V.ValuationChargeinConfPage = text;
			V.ValuationChargeinConfPage = SF.cleanPrice(text.substring(text.indexOf('$')));
			console.log(V.ValuationChargeinConfPage);
			VD.IWant(VD.ToEqual, V.ValuationChargeinAccount2 ,V.ValuationChargeinConfPage,'не совпали Valuation выбранный во второй раз на аккаунте и в таблице на конфирмейшн пэйдж');
		}), config.timeout);
	JS.scroll('div[ng-if="vm.request.reservation_rate.value !=0 && vm.request.status.raw != 3 && vm.request.status.raw == 2"]');
	MF.Account_ClickIAgreeWithAll();
	SF.click(By.xpath('//div[@ng-click="addReservationPayment()"]'));
	SF.waitForVisible(By.xpath('//canvas[@id="signatureCanvasReserv"]'));
	LF.MakeSignJS('signatureCanvasReserv');
	SF.click(By.xpath('//button[contains(@ng-click,"saveReservSignature()")]'));
	LF.FillCardPayModal();
	MF.WaitWhileSpinner();
	MF.Account_WaitForGreenTextAfterConfirm();
	driver.findElement(By.xpath('//div[@ng-class="{\'disabled\': isCannotEditValuation}"]')).isDisplayed();
	V.accountNumbersAfterConfPage={};
	LF.RememberAccountNumbers(V.accountNumbersAfterConfPage);
	LF.LogoutFromAccount();
	condition.nowWeDoing = 'идем на мувборд,проверяем цифры на мувборде в реквесте и валюэушн,который мы выбрали';
	SF.get(V.adminURL);
	LF.LoginToBoardAsCustom(V.adminLogin,V.adminPassword);
	MF.Board_OpenConfirmed();
	MF.WaitWhileBusy();
	MF.Board_OpenRequest(V.boardNumbers.Id);
	MF.EditRequest_WaitForOpenRequest();
	V.boardNumbersAfterConfirmationPage = {};
	LF.RememberDigitsRequestBoard(V.boardNumbersAfterConfirmationPage);
	LF.Validation_Compare_Account_Admin(V.accountNumbersAfterConfPage,V.boardNumbersAfterConfirmationPage);
	JS.scroll('div[ng-if="Invoice"]');
	V.ValuationSales= {};
	driver.wait(driver.findElement(By.xpath('//span[@ng-if="request.request_all_data.valuation.selected.valuation_charge"]')).getText().then(function (text) {
		V.ValuationSales = text;
		console.log(V.ValuationSales);
	}), config.timeout);
	SF.click(By.xpath('//div[@ng-click="changeSalesClosingTab(\'closing\')"]'));
	MF.WaitWhileBusy();
	V.ValuationClosing= {};
	driver.wait(driver.findElement(By.xpath('//span[@ng-if="invoice.request_all_data.valuation.selected.valuation_charge"]')).getText().then(function (text) {
		V.ValuationClosing = text;
		console.log(V.ValuationClosing);
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
	LF.MakeSignInContract();
	LF.MakeSignInContract();
	driver.wait(driver.findElement(By.xpath('//tr[@ng-if="finance.valuation && finance.valuation != 0"]/td[2]')).getText().then(function (text) {
		V.ValuationContract = text;
		VD.IWant(VD.ToEqual, V.ValuationSales ,V.ValuationContract,'не совпали Valuation на реквесте в табе Sales и на контракте');
	}), config.timeout);
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


	SF.endOfTest();

};