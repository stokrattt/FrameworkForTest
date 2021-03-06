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
    MF.Board_SettingsPendingInfoOFF();

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

condition.nowWeDoing = 'выходим с аккаунта, проверяем все изменения на мувборде, ' +
    'включаем настройку пэдинг-инфо, делаем проверку на кастомер-онлайн';
	SF.get(V.adminURL);
	LF.LoginToBoardAsCustom(V.adminLogin,V.adminPassword);
    driver.wait(driver.findElement(By.xpath('//div[@ng-click="openCustomerOnlineModal()"]/div/h3')).getText().then(function(text){
        VD.IWant(VD.ToEqual, text , 0 , 'онлайн кастомеров больше,чем 0.баг ');
    }),config.timeout);
	MF.Board_OpenNotConfirmed();
	MF.Board_OpenRequest(V.boardNumbers.Id);
	V.boardNumbers.New = {};
	LF.RememberDigitsRequestBoard(V.boardNumbers.New);
	LF.Validation_Compare_Account_Admin(V.accountNumbersNew, V.boardNumbers.New);
	MF.EditRequest_CloseEditRequest();
	MF.Board_OpenSettingsGeneral();
	MF.Board_OpenSettingsAccountPagePendingInfo();
    MF.Board_SettingsPendingInfoON();

condition.nowWeDoing = 'создаем реквест, добавляем ему инвентарь,добавляем страховку со своим амаунт оф лиабилити,сохраняем все' +
		'переводим его в статус конферм';
    LF.CreateLocalMovingFromBoard(V.client);
    MF.EditRequest_OpenInventoryTab();
    LF.addInventoryBoard(V.boardNumbers);
    MF.EditRequest_OpenRequest();
    MF.EditRequest_OpenValuationModal();
    MF.EditRequest_ClickTabFullValue();
    MF.EditRequest_SendAmountOfLiability(7000);
    SF.click(By.xpath('//td[@ng-repeat="value in currentPlan.header track by $index"][2]/div[@ng-click="setDeductibleLevel(value)"]'));
	MF.EditRequest_ClickSaveValuation();
    JS.step(JSstep.selectTruck((V.boardNumbers.LaborTimeMax + V.boardNumbers.TravelTime)/60));
    MF.WaitWhileBusy();
    MF.EditRequest_SetToConfirmed();
    MF.EditRequest_SetAdressToFrom();
    V.boardNumbers= {};
    LF.RememberDigitsRequestBoard(V.boardNumbers);
    MF.EditRequest_SaveChanges();

condition.nowWeDoing = 'идем на контракт, сравнить наш тотал + страховку, для того,что бы и там,и там были одинаковые значения. ';
	MF.EditRequest_CloseConfirmWork();
    MF.EditRequest_OpenContractCloseJob();
    SF.openTab(1);
    MF.SweetConfirm();
    driver.wait(driver.findElement(By.xpath('//table[@ng-if="confirmation_table_show || isFullAmount"]/tbody/tr[3]/td[3]/span')).getText().then(function(text) {
        V.IpartofTotalEstimate = V.boardNumbers.Fuel + V.boardNumbers.QuoteMin + V.boardNumbers.Valuation;
        V.IIpartofTotalEstimate = V.boardNumbers.Fuel + V.boardNumbers.QuoteMax + V.boardNumbers.Valuation;
        VD.IWant(VD.ToEqual,text,('$ ' + V.IpartofTotalEstimate + ' - ' + '$ ' + V.IIpartofTotalEstimate),"не совпал тотал плюс страховка с тем,что должно было быть(первый левел)");
    }), config.timeout);

condition.nowWeDoing = 'подписываем частично контракт, создаем сторадж, частично вносим туда инвентарь' +
		'оплачиваем рентал эгринмент, сабмитим до конца контракт';
    MF.Contract_OpenBillOfLading();
    LF.MakeSignInContract();
    LF.MakeSignInContract();
    MF.Contract_DeclarationValueA();
    LF.MakeSignInContract();
    LF.MakeSignInContract();
    LF.MakeSignInContract();
	MF.Contract_ClickPlusForOpenSubMenuStorageAndOvernight();
    MF.Contract_ClickCorningToStorage();
    LF.Contract_AddInventory(3);
    MF.Contract_ClickDoneWithInventory();
    MF.Contract_SetTapeNumber(1);
    MF.Contract_SetTapeColorGreen('Green');
    LF.MakeSignInInventory(0);
    LF.MakeSignInInventory(1);
	MF.Contract_SubmitInventory();
	MF.Contract_SetRentalPhone('9999999999');
	MF.Contract_SetRentalAddress('4384029384230');
	MF.Contract_SetRentalZip('02222');
    LF.MakeSignInRental();
    MF.SweetConfirm();
    LF.payRentalInventory();
    JS.waitForExist('input#inputImage');
    driver.wait(new FileDetector().handleFile(driver, system.path.resolve('./files/squirrel.jpg')).then(function (path) {
        V.path = path;
    }), config.timeout);
    SF.sleep(1);
    MF.Contract_UploadImage(V.path);
    MF.Contract_UploadImage(V.path);
    MF.Contract_SaveImages();
    MF.WaitWhileBusy();
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

condition.nowWeDoing = 'переходи на наш реквест, сравниваем числа в реквесте и на контракте';
    SF.openTab(0);
    driver.wait(driver.findElement(By.xpath('//div[@ng-click="openCustomerOnlineModal()"]/div/h3')).getText().then(function(text){
        VD.IWant(VD.ToEqual, text , 0 , 'онлайн кастомеров больше,чем 0.баг');
    }),config.timeout);
	MF.EditRequest_CloseEditRequest();
	MF.Board_OpenDashboard();
	MF.Board_OpenConfirmed();
	MF.Board_RefreshDashboard();
	MF.Board_OpenRequest(V.boardNumbers.Id);
    V.boardNumbersAfterContract= {};
    LF.RememberDigitsRequestBoard( V.boardNumbersAfterContract);
    VD.IWant(VD.ToEqual, V.boardNumbersAfterContract.Balance, 0, 'Баланс после закрытия не равен 0');
    SF.endOfTest();
};