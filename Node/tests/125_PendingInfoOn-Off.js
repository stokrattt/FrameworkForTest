module.exports = function main(SF, JS, MF, LF, JSstep, VD, V, By, until,FileDetector, system, condition, config, constants) {
	global.fiber = Fiber.current;
	V.client = {};
	V.client.name = SF.randomBukva(6) + '_t';
	V.client.fam = SF.randomBukva(6) + '_t';
	V.client.phone = SF.randomCifra(10);
	V.client.email = SF.randomBukvaSmall(6) + '@' + SF.randomBukvaSmall(4) + '.tes';
	V.client.passwd = 123;

condition.nowWeDoing = 'заходим под админом, выключаем настройку пэдинг инфо';
	SF.get(V.adminURL);
	LF.LoginToBoardAsCustom(V.adminLogin,V.adminPassword);
	MF.Board_OpenSettingsGeneral();
	MF.Board_OpenSettingsAccountPagePendingInfo();
    driver.wait(driver.executeScript("if($('input[ng-model=\"setting\"] span').hasClass('ng-empty')){return true;}else{" +
		"$('input[ng-model=\"setting\"] span').click()}"),config.timeout);
    SF.sleep(2);
    MF.WaitWhileToaster();

condition.nowWeDoing = 'создаем через криейт реквест и ставим статус нот конферм';
	LF.CreateLocalMovingFromBoard(V.client);
	MF.EditRequest_OpenClient();
	LF.SetClientPasswd(V.client.passwd);
	MF.EditRequest_OpenRequest();
	MF.EditRequest_SetAdressFrom();
	MF.EditRequest_SetAdressTo();
	MF.EditRequest_SetToNotConfirmed();
	V.boardNumbers={};
	LF.RememberDigitsRequestBoard(V.boardNumbers);
	JS.step(JSstep.selectTruck((V.boardNumbers.LaborTimeMax + V.boardNumbers.TravelTime)/60));
	MF.WaitWhileBusy();
	MF.EditRequest_SaveChanges();
	MF.EditRequest_CloseEditRequest();
	MF.Board_LogoutAdmin();

condition.nowWeDoing = 'выходим с мувборда,заходим под клиентом. проверяем все значения' +
		'плюс проверка на то,что не будет статуса пендинг-инфо';
	SF.get(V.accountURL);
	LF.LoginToAccountAsClient(V.client);
	MF.Account_OpenRequest(V.boardNumbers.Id);
	MF.Account_ClickViewRequest();
	V.accountNumbers={};
	LF.RememberAccountNumbers(V.accountNumbers);
	LF.Validation_Compare_Account_Admin(V.accountNumbers,V.boardNumbers);
	LF.AccountLocalAddInventory();
	MF.SweetConfirm();
	MF.Account_WaitForInventoryCheck();
	driver.wait(driver.findElement(By.xpath('//span[@ng-if="vm.request.field_useweighttype.value == \'2\' && vm.request.inventory_weight.cfs"]')
	).getText().then(function(text){
		VD.IWant(VD.ToEqual, text, '(Inventory 755 c.f. / 5285 lbs)');
	}),config.timeout);
	MF.Account_ClickDetails();
    LF.AccountFR_SeelectOptions();
	MF.Account_WaitForDetailsCheck();
	MF.Account_ClickFullPacking();
	V.accountNumbersNew={};
	LF.RememberAccountNumbers(V.accountNumbersNew);
	driver.wait(driver.findElement(By.xpath('//div[@ng-include="vm.statusTemplate"]/div/p[contains(text(),"Status: Not Confirmed")]')).getText().then(function (Status) {
		VD.IWant(VD.ToEqual, Status, 'Status: Not Confirmed');
	}), config.timeout);
	LF.LogoutFromAccount();

condition.nowWeDoing = 'выходим с аккаунта, проверяем все изменения на мувборде, включаем настройку пэдинг-инфо';
	SF.get(V.adminURL);
	LF.LoginToBoardAsCustom(V.adminLogin,V.adminPassword);
	MF.Board_OpenNotConfirmed();
	MF.Board_OpenRequest(V.boardNumbers.Id);
	V.boardNumbers.New = {};
	LF.RememberDigitsRequestBoard(V.boardNumbers.New);
	LF.Validation_Compare_Account_Admin(V.accountNumbersNew, V.boardNumbers.New);
	MF.EditRequest_CloseEditRequest();
	MF.Board_OpenSettingsGeneral();
	MF.Board_OpenSettingsAccountPagePendingInfo();
	SF.click(By.xpath('//input[@ng-change="updateSetting()"]/../span'));
	SF.sleep(2);
	MF.WaitWhileToaster();

	SF.endOfTest();
};