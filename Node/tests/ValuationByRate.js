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
    MF.Board_OpenSettingsValuation();
	driver.wait(driver.executeScript("if ($('md-radio-button[area-label=\"By rate\"]').hasClass('md-checked')){return true;} else {$('md-radio-button[area-label=\"By rate\"]').click()}"), config.timeout);
	SF.waitForVisible(By.xpath('//md-radio-button[@class="valuation-plan-settings__radio md-primary md-checked"]'));
	driver.wait(driver.executeScript("if($('button[ng-click=\"saveChanges()\"]').hasClass('disabled')){" +
		";}else{$('button[ng-click=\"saveChanges()\"]').click()}"), config.timeout);
	MF.Board_ShowProtectionOnAccountPage();
	JS.scroll('div[class="btn btn-primary btn-block"]');
	SF.click(By.xpath('//md-checkbox[@aria-label="Full value protection"]'));
	JS.click('button[ng-click="vm.updateValuationSetting(directivePresets)"]');
	MF.WaitWhileToaster();
	MF.Board_LogoutAdmin();

condition.nowWeDoing = 'выходим из админки, идем на фронт и создаем с верхней формы реквест. идем на аккаунт.';
	SF.get(V.frontURL);
	LF.FullSmallCalcAsLocal(V.client);

condition.nowWeDoing = 'первый раз на аккаунте';
	MF.Account_ClickViewRequest();
	MF.Account_OpenAdressModal();
	MF.Account_SendAdressFromModalWindow();
	MF.Account_SendAdressToModalWindow();
	MF.Account_ClickUpdateClientInModalWindow();
	MF.SweetConfirm();
	MF.SweetConfirm();
    LF.AccountLocalAddInventory();
    MF.Account_WaitForInventoryCheck();
	V.accountNumbers={};
	LF.RememberAccountNumbers(V.accountNumbers);
	LF.LogoutFromAccount();
	condition.nowWeDoing = 'идем в админку, проверяем наши числа,сверяем страховку( должна быть ))' +
		'ставим фулл вэлью протекшен,нот конферм';
	SF.get(V.adminURL);
	LF.LoginToBoardAsCustom(V.adminLogin,V.adminPassword);
	MF.Board_OpenRequest(V.accountNumbers.Id);
    V.boardNumbers={};
    LF.RememberDigitsRequestBoard(V.boardNumbers);
    LF.Validation_Compare_Account_Admin(V.accountNumbers,V.boardNumbers);
	MF.EditRequest_OpenValuationModal();
	MF.EditRequest_OpenFullValueProtection();
	driver.wait(driver.findElement(By.xpath('//input[@ng-change="changeOnlyLiabilityAmount()"]')).getAttribute('value').then(function (text) {
		V.AmountOfLiability = text;
		V.AmountOfLiability = SF.cleanPrice(text.substring(text.indexOf('$')));
	}), config.timeout);
	SF.sleep(1);
	driver.wait(driver.findElement(By.xpath('//td[contains(text(),"Valuation Charge")]/following-sibling::td[1]')).getText().then(function (text) {
		text = SF.cleanPrice(text.substring(text.indexOf('$')));
		VD.IWant(VD.ToEqual, (V.AmountOfLiability * 30)/1000 ,text,'не совпали Valuation Charge у реквеста с расчетами по формулам(первый дедактбл левел)');
	}), config.timeout);
	SF.sleep(1);
	driver.wait(driver.findElement(By.xpath('//td[contains(text(),"Valuation Charge")]/following-sibling::td[2]')).getText().then(function (text) {
		text = SF.cleanPrice(text.substring(text.indexOf('$')));
		VD.IWant(VD.ToEqual, (V.AmountOfLiability * 35)/1000 ,text,'не совпали Valuation Charge у реквеста с расчетами по формулам(второй дедактбл левел)');
	}), config.timeout);
	SF.sleep(1);
	driver.wait(driver.findElement(By.xpath('//td[contains(text(),"Valuation Charge")]/following-sibling::td[3]')).getText().then(function (text) {
		text = SF.cleanPrice(text.substring(text.indexOf('$')));
		VD.IWant(VD.ToEqual, (V.AmountOfLiability * 40)/1000 ,text,'не совпали Valuation Charge у реквеста с расчетами по формулам(третий дедактбл левел)');
	}), config.timeout);
	//выбираем уровень страховки (2)
	SF.click(By.xpath('//td[3]/div[@ng-click="setDeductibleLevel(value)"]'));
	V.SelectLevel= {};
	driver.wait(driver.findElement(By.xpath('//td[contains(text(),"Valuation Charge")]/following-sibling::td[2]')).getText().then(function (text) {
		V.SelectLevel = text;
		V.SelectLevel = SF.cleanPrice(text.substring(text.indexOf('$')));
	}), config.timeout);
    MF.Account_ClickSaveFullValueModal();
    MF.SweetConfirm();
    MF.WaitWhileBusy();
    MF.EditRequest_SetToNotConfirmed();
    JS.step(JSstep.selectTruck((V.boardNumbers.LaborTimeMax + V.boardNumbers.TravelTime)/60));
    MF.WaitWhileBusy();
    MF.EditRequest_OpenClient();
    LF.SetClientPasswd(V.client.passwd);
    MF.EditRequest_OpenRequest();
    V.boardNumbersAfterValuation={};
    LF.RememberDigitsRequestBoard(V.boardNumbersAfterValuation);
    MF.EditRequest_SaveChanges();
    MF.EditRequest_CloseEditRequest();
    MF.Board_LogoutAdmin();

condition.nowWeDoing = 'идем на аккаунт  проверять нашу страховку, все числа,выбираем 60 уент пер паунд, букаем работу';
    SF.get(V.accountURL);
    LF.LoginToAccountAsClient(V.client);
    MF.Account_OpenRequest(V.boardNumbers.Id);
    V.accountNumbersAfterValuation = {};
    LF.RememberAccountNumbers(V.accountNumbersAfterValuation);
    driver.wait(driver.findElement(By.xpath('//div[@ng-class="{\'disabled\': readOnly}"]/div[6]')).getText().then(function (text) {
    	text = SF.cleanPrice(text.substring(text.indexOf('$')));
        VD.IWant(VD.ToEqual,text,V.SelectLevel ,'не совпал валюэйшен чардж выбранный в админке и на аккаунте');
    }), config.timeout);
    MF.Account_Click60centPerPound();
    MF.Account_ClickProceedBookYourMove();
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
    condition.nowWeDoing = 'идем в админку, ставим дискаунт, переходим на табу клоузинг, идем на конфирмейшн пэйдж со стороны админа' +
		'проверяем что там нет отрицательных чисел в третьей строке с тоталом ивалюэйшн чардж';
    SF.get(V.adminURL);
    LF.LoginToBoardAsCustom(V.adminLogin, V.adminPassword);
    MF.Board_OpenConfirmed();
    MF.Board_OpenRequest(V.boardNumbers.Id);
    MF.EditRequest_OpenDiscountModal();
    MF.EditRequest_SendMoneyDiscount(500);
    MF.EditRequest_ClosingTabDiscountModalClickSave();
    MF.EditRequest_CloseConfirmWork();
    MF.EditRequest_OpenContractCloseJob();
    SF.openTab(1);
    MF.SweetConfirm();
    //здесь будем проверять что бы в таблицу в 3ей строке не было отрицательных чисел



    SF.endOfTest();
};