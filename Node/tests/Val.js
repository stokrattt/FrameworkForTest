module.exports = function main(SF, JS, MF, LF, JSstep, VD, V, By, until,FileDetector, system, condition, config, constants) {
	global.fiber = Fiber.current;
	V.client = {};
	V.client.name = SF.randomBukva(6) + '_t';
	V.client.fam = SF.randomBukva(6) + '_t';
	V.client.phone = SF.randomCifra(10);
	V.client.email = SF.randomBukvaSmall(6) + '@' + SF.randomBukvaSmall(4) + '.tes';
	V.client.passwd = 123;
	V.adminLogin = 'roma4ke';
	V.adminPassword = 'root';

	condition.nowWeDoing = 'заходим под админом в настройки валюэйшн,создаем реквест и проверяем ' +
		'сходятся ли расчеты в таблице Valuation с формулой расчетов ';
	SF.get(V.adminURL);
	LF.LoginToBoardAsCustom(V.adminLogin,V.adminPassword);
	MF.Board_OpenSettingsGeneral();
	SF.click(By.xpath('//*[@id="compose-wrapper"]/div[1]/aside/ul/li[3]/a'));
	let check = '//md-radio-button[@id="radio_2"]';
	if (check){
		SF.click(By.xpath('//md-radio-button[@id="radio_2"]'));
	}
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
	MF.WaitWhileBusy();
	SF.click(By.xpath('//button[@ng-click="saveChanges()"]'));
	MF.WaitWhileToaster();
	LF.CreateLocalMovingFromBoard(V.client);
	JS.scroll('label[ng-click="openValuationModal()"]');
	SF.click(By.xpath('//label[@ng-click="openValuationModal()"]'));
	SF.waitForVisible(By.xpath('//div[@class="valuation-modal__info"]'));
	SF.click(By.xpath('//div[@ng-click="setValuationType(valuationTypes.FULL_VALUE)"]'));
	MF.WaitWhileToaster();
	driver.wait(driver.findElement(By.xpath('//div[@class="req-valuation"]/div[2]/div/table/tbody/tr[2]/td[1]')).getText().then(function (text) {
		V.Weight= text;
	}), config.timeout);
	SF.sleep(1);
	const centPerPound= 0.6;
	const Weight = V.Weight;
	let AmountOfLiability = centPerPound * Weight;
	driver.wait(driver.findElement(By.xpath('//input[@ng-model="valuation.selected.liability_amount"]')).getAttribute('value').then(function (text) {
		V.AmountOfLiability= text;
		V.AmountOfLiability = SF.cleanPrice(text.substring(text.indexOf('$')));
		VD.IWant(VD.ToEqual, AmountOfLiability ,V.AmountOfLiability,'не совпали Valuation у реквеста с расчетами по формулам');
	}), config.timeout);
	SF.sleep(1);
	// проверка Deductible level
	let percent0= 0.1;
	let DeductibleLevel0 = V.AmountOfLiability * percent0;
	driver.wait(driver.findElement(By.xpath('//div[@ng-show="valuation.selected.valuation_type == valuationTypes.FULL_VALUE"]/table/tbody[2]/tr/td[2]')).getText().then(function (text) {
		V.DeductibleLevel1= text;
		V.DeductibleLevel1 = SF.cleanPrice(text.substring(text.indexOf('$')));
		VD.IWant(VD.ToEqual, DeductibleLevel0 ,V.DeductibleLevel1,'не совпали Valuation у реквеста с расчетами по формулам');
	}), config.timeout);
	SF.sleep(1);
	let percent1 = 0.15;
	let DeductibleLevel1 = V.AmountOfLiability * percent1;
	driver.wait(driver.findElement(By.xpath('//div[@ng-show="valuation.selected.valuation_type == valuationTypes.FULL_VALUE"]/table/tbody[2]/tr/td[3]')).getText().then(function (text) {
		V.DeductibleLevel2= text;
		V.DeductibleLevel2 = SF.cleanPrice(text.substring(text.indexOf('$')));
		VD.IWant(VD.ToEqual, DeductibleLevel1 ,V.DeductibleLevel2,'не совпали Valuation у реквеста с расчетами по формулам');
	}), config.timeout);
	SF.sleep(1);
	let percent2 = 0.2;
	let DeductibleLevel2 = V.AmountOfLiability * percent2;
	driver.wait(driver.findElement(By.xpath('//div[@ng-show="valuation.selected.valuation_type == valuationTypes.FULL_VALUE"]/table/tbody[2]/tr/td[4]')).getText().then(function (text) {
		V.DeductibleLevel3= text;
		V.DeductibleLevel3 = SF.cleanPrice(text.substring(text.indexOf('$')));
		VD.IWant(VD.ToEqual, DeductibleLevel2 ,V.DeductibleLevel3,'не совпали Valuation у реквеста с расчетами по формулам');
	}), config.timeout);
	SF.sleep(1);
	let percent3 = 0.25;
	let DeductibleLevel3 = V.AmountOfLiability * percent3;
	driver.wait(driver.findElement(By.xpath('//div[@ng-show="valuation.selected.valuation_type == valuationTypes.FULL_VALUE"]/table/tbody[2]/tr/td[5]')).getText().then(function (text) {
		V.DeductibleLevel4= text;
		V.DeductibleLevel4 = SF.cleanPrice(text.substring(text.indexOf('$')));
		VD.IWant(VD.ToEqual, DeductibleLevel3 ,V.DeductibleLevel4,'не совпали Valuation у реквеста с расчетами по формулам');
	}), config.timeout);
	SF.click(By.xpath('//td[3]/div[@ng-click="setDeductibleLevel(value)"]'));
	V.SelectLevel= {};
	driver.wait(driver.findElement(By.xpath('//div[@ng-show="valuation.selected.valuation_type == valuationTypes.FULL_VALUE"]/table/tbody[2]/tr/td[3]')).getText().then(function (text) {
		V.SelectLevel = text;
		console.log(V.SelectLevel);
	}), config.timeout);
	SF.click(By.xpath('//button[@ng-click="clickSave()"]'));
	MF.SweetConfirm();
	MF.WaitWhileBusy();
	MF.WaitWhileToaster();
	MF.EditRequest_OpenClient();
	LF.SetClientPasswd(V.client.passwd);
	MF.EditRequest_OpenRequest();
	MF.EditRequest_SetToNotConfirmed();
	V.boardNumbers = {};
	LF.RememberDigitsRequestBoard(V.boardNumbers);
	JS.step(JSstep.selectTruck((V.boardNumbers.LaborTimeMax + V.boardNumbers.TravelTime)/60));
	MF.WaitWhileBusy();
	MF.EditRequest_CloseEditRequest();
	MF.Board_LogoutAdmin();

	condition.nowWeDoing = 'идем на аккаунт,проверяем все значения,проверяем то,что мы выбрали на мувборде( какой дедактбл левел) ' +
		'смотрим,не переведется ли при смене страховки в статус пэдинг-инфо';
	SF.get(V.accountURL);
	LF.LoginToAccountAsClient(V.client);
	MF.Account_OpenRequest(V.boardNumbers.Id);
	MF.Account_ClickViewRequest();
	V.accountNumbers={};
	LF.Validation_Compare_Account_Admin(V.accountNumbers,V.boardNumbers);
	V.SelectLevelinAccount= {};
	driver.wait(driver.findElement(By.xpath('//table[@class="valuation-select-block__info-table"]/tbody[2]/tr/td[3]')).getText().then(function (text) {
		V.SelectLevelinAccount = text;
		console.log(V.SelectLevelinAccount);
		VD.IWant(VD.ToEqual, V.SelectLevelinAccount ,V.SelectLevel,'не совпали Valuation выбранный на реквесте и на аккаунте');
	}), config.timeout);
	SF.click(By.xpath('//table[@class="valuation-select-block__info-table"]/tbody/tr/td[4]/md-checkbox'));
	V.SelectLevelinAccount2= {};
	driver.wait(driver.findElement(By.xpath('//div[@ng-class="{\'disabled\': readOnly}"]/table/tbody[2]/tr/td[4]')).getText().then(function (text) {
		V.SelectLevelinAccount2 = text;
		console.log(V.SelectLevelinAccount2);
	}), config.timeout);
	driver.wait(driver.findElement(By.xpath('//div[@ng-include="vm.statusTemplate"]/div/p[contains(text(),"Status: Not Confirmed")]')).getText().then(function (Status) {
		VD.IWant(VD.ToEqual, Status, 'Status: Not Confirmed');
	}), config.timeout);
	MF.Account_ClickProceedBookYourMove();
	V.SelectLevelinConfPage={};
	driver.wait(driver.findElement(By.xpath('//table[@class="valuation-confirmation-table"]/tbody/tr[2]/td[4]/span[contains(text(),"$ 970.20")]'))
		.getText()
		.then(function (text) {
			V.SelectLevelinConfPage = text;
			console.log(V.SelectLevelinConfPage);
		}), config.timeout);


	SF.endOfTest();

};