module.exports = function main(SF, JS, MF, LF, JSstep, VD, V, By, until,FileDetector, system, condition, config, constants) {
	global.fiber = Fiber.current;
	V.client = {};
	V.client.name = SF.randomBukva(6) + '_t';
	V.client.fam = SF.randomBukva(6) + '_t';
	V.client.phone = SF.randomCifra(10);
	V.client.email = SF.randomBukvaSmall(6) + '@' + SF.randomBukvaSmall(4) + '.tes';
	V.client.passwd = 123;


condition.nowWeDoing = 'заходим под админом в настройки валюэйшн,создаем реквест и проверяем сходятся ли расчеты в таблице Valuation с формулой расчетов ';
	SF.get(V.adminURL);
	LF.LoginToBoardAsCustom(V.adminLogin,V.adminPassword);
	MF.Board_OpenSettingsGeneral();
    MF.Board_OpenSettingsValuation();
    driver.wait(driver.executeScript("if ($('md-radio-button[area-label=\"By percent\"]').hasClass('md-checked')){return true;} else {$('md-radio-button[area-label=\"By percent\"]').click()}"),config.timeout);
    driver.wait(driver.executeScript("if($('button[ng-click=\"saveChanges()\"]').hasClass('disabled')){" +
        ";}else{$('button[ng-click=\"saveChanges()\"]').click()}"),config.timeout);
    MF.WaitWhileToaster();
	LF.CreateLocalMovingFromBoard(V.client);
    MF.EditRequest_RememberLbs(V.request);
	MF.EditRequest_OpenValuationModal();
    MF.EditRequest_ClickTabFullValue();
	driver.wait(driver.findElement(By.xpath('//input[@ng-model="valuation.selected.liability_amount"]')).getAttribute('value').then(function (text) {
		V.AmountOfLiability1 = SF.cleanPrice(text.substring(text.indexOf('$')));
		VD.IWant(VD.ToEqual, V.request.lbs*0.6 ,V.AmountOfLiability1,'не совпали Valuation у реквеста с расчетами по формулам');
	}), config.timeout);
	// проверка Valuation Charge
	driver.wait(driver.findElement(By.xpath('//td[contains(text(),"Valuation Charge")]/following-sibling::td[1]')).getText().then(function (text) {
		text = SF.cleanPrice(text.substring(text.indexOf('$')));
		VD.IWant(VD.ToEqual, V.AmountOfLiability1*0.1 ,text,'не совпали Valuation Charge у реквеста с расчетами по формулам(первый дедактбл левел)');
	}), config.timeout);
	driver.wait(driver.findElement(By.xpath('//td[contains(text(),"Valuation Charge")]/following-sibling::td[2]')).getText().then(function (text) {
        text = SF.cleanPrice(text.substring(text.indexOf('$')));
		VD.IWant(VD.ToEqual, V.AmountOfLiability1*0.15 ,text,'не совпали Valuation Charge у реквеста с расчетами по формулам (второй дедактбл левел)');
	}), config.timeout);
	driver.wait(driver.findElement(By.xpath('//td[contains(text(),"Valuation Charge")]/following-sibling::td[3]')).getText().then(function (text) {
        text = SF.cleanPrice(text.substring(text.indexOf('$')));
		VD.IWant(VD.ToEqual, V.AmountOfLiability1*0.2 ,text,'не совпали Valuation Charge у реквеста с расчетами по формулам(третий дедактбл левел)');
	}), config.timeout);
	driver.wait(driver.findElement(By.xpath('//td[contains(text(),"Valuation Charge")]/following-sibling::td[4]')).getText().then(function (text) {
        text = SF.cleanPrice(text.substring(text.indexOf('$')));
		VD.IWant(VD.ToEqual, V.AmountOfLiability1*0.25 ,text,'не совпали Valuation Charge у реквеста с расчетами по формулам(четвертый дедактбл левел)');
	}), config.timeout);
	SF.click(By.xpath('//td[@ng-repeat="value in currentPlan.header track by $index"][2]/div[@ng-click="setDeductibleLevel(value)"]'));
	driver.wait(driver.findElement(By.xpath('//td[contains(text(),"Valuation Charge")]/following-sibling::td[2]')).getText().then(function (text) {
		V.SelectLevel = SF.cleanPrice(text.substring(text.indexOf('$')));
	}), config.timeout);
    MF.EditRequest_ClickSaveValuation();
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
	MF.Account_ClickUpdateClientInModalWindow();
	MF.SweetConfirm();
	MF.SweetConfirm();
	MF.WaitWhileBusy();
	driver.wait(driver.findElement(By.xpath('//div[@ng-show="request.request_all_data.valuation.selected.valuation_type == valuationTypes.FULL_VALUE"]/div[6]')).getText().then(function (text) {
		text = SF.cleanPrice(text.substring(text.indexOf('$')));
		VD.IWant(VD.ToEqual, text ,V.SelectLevel,'не совпали Valuation выбранный на реквесте и на аккаунте');
	}), config.timeout);
	//MF.SweetConfirm();
	MF.Account_ClickAndOpenFullValueModal();
	SF.click(By.xpath('//td[4]/md-checkbox[@aria-label="$ 500"]'));
	SF.sleep(0.5);
	MF.Account_ClickSaveFullValueModal();
	driver.wait(driver.findElement(By.xpath('//div[@ng-show="request.request_all_data.valuation.selected.valuation_type == valuationTypes.FULL_VALUE"]/div[6]')).getText().then(function (text) {
		V.ValuationChargeinAccount2 = SF.cleanPrice(text.substring(text.indexOf('$')));
	}), config.timeout);
	driver.wait(driver.findElement(By.xpath('//div[@ng-include="vm.statusTemplate"]/div/p[contains(text(),"Status: Not Confirmed")]')).getText().then(function (Status) {
		VD.IWant(VD.ToEqual, Status, 'Status: Not Confirmed', 'должен быть нот конферм статус');
	}), config.timeout);
    condition.nowWeDoing = 'после назначения нового Valuation делаем проверки 3ей строкив таблице на Confirmation Page';
    MF.Account_ClickProceedBookYourMove();
	driver.wait(driver.findElement(By.xpath('//table[@class="valuation-confirmation-table table"]/tbody/tr[2]/td[4]/span')).getText().then(function (text) {
			text = SF.cleanPrice(text.substring(text.indexOf('$')));
			VD.IWant(VD.ToEqual, V.ValuationChargeinAccount2 ,text ,'не совпали Valuation выбранный во второй раз на аккаунте и в таблице на конфирмейшн пэйдж');
		}), config.timeout);
    driver.wait(driver.findElement(By.xpath('//table[@ng-if="confirmation_table_show || isFullAmount"]/tbody/tr[3]/td[4]/span')).getText().then(function(text) {
        V.IpartofTotalEstimate = V.boardNumbers.Fuel + V.boardNumbers.QuoteMin + V.ValuationChargeinAccount2;
        V.IIpartofTotalEstimate = V.boardNumbers.Fuel + V.boardNumbers.QuoteMax + V.ValuationChargeinAccount2;
        VD.IWant(VD.ToEqual,text,('$ ' + V.IpartofTotalEstimate + ' - ' + '$ ' + V.IIpartofTotalEstimate),"не совпал тотал плюс страховка с тем,что должно было быть по расчетам");
    }), config.timeout);
	JS.scroll('div[ng-if="vm.request.reservation_rate.value !=0 && vm.request.status.raw != 3 && vm.request.status.raw == 2"]');
	MF.Account_ClickIAgreeWithAll();
	MF.Account_ConfirmationClickPayDeposit();
	LF.MakeSignJS('signatureCanvasReserv');
	MF.Account_ConfirmationClickSaveSignature();
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
	MF.Board_OpenRequest(V.boardNumbers.Id);
	V.boardNumbersAfterConfirmationPage = {};
	LF.RememberDigitsRequestBoard(V.boardNumbersAfterConfirmationPage);
	LF.Validation_Compare_Account_Admin(V.accountNumbersAfterConfPage,V.boardNumbersAfterConfirmationPage);
	driver.wait(driver.findElement(By.xpath('//span[@ng-if="request.request_all_data.valuation.selected.valuation_charge"]')).getText().then(function (text) {
		V.ValuationSales = text;
	}), config.timeout);
	MF.EditRequest_CloseConfirmWork();
	driver.wait(driver.findElement(By.xpath('//span[@ng-if="invoice.request_all_data.valuation.selected.valuation_charge && invoice.request_all_data.valuation.selected.valuation_type == valuationTypes.FULL_VALUE"]')).getText().then(function (text) {
		VD.IWant(VD.ToEqual, V.ValuationSales ,text,'не совпали Valuation на Sales и Closing');
	}), config.timeout);

condition.nowWeDoing = 'идем в локал диспатч, назначаем работников';
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
		VD.IWant(VD.ToEqual, V.ValuationSales ,text,'не совпали Valuation на реквесте в табе Sales и на контракте');
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