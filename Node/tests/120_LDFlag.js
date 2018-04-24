module.exports = function main(SF, JS, MF, LF, JSstep, VD, V, By, until,FileDetector, system, condition, config,constants) {
    global.fiber = Fiber.current;
    V.client = {};
    V.client.name = SF.randomBukva(6) + '_t';
    V.client.fam = SF.randomBukva(6) + '_t';
    V.client.phone = SF.randomCifra(10);
    V.client.email = SF.randomBukvaSmall(6) + '@' + SF.randomBukvaSmall(4) + '.tes';
    V.client.passwd = 123;


    SF.get(V.adminURL);
    LF.LoginToBoardAsCustom(V.adminLogin,V.adminPassword);

condition.nowWeDoing = 'Идем в настройки  ЛД и создаем флаг';
    MF.Board_OpenSettingsGeneral ();
    MF.Board_OpenSettingsLongDistance ();
    MF.BoardOpenSettingsLongDistanceStatus();
    V.flag = SF.randomBukva(6) + '_flag';
    LF.LongDistanceSettings_AddLDStatusFlag(V.flag);

condition.nowWeDoing = 'Создаем реквест, и проверяем есть ли в нем флаг';
    MF.Board_CreateDraftRequest();
    SF.click(By.xpath('//select[@id="edit-service"]/option[@value="7"]'));
    SF.click(By.xpath('//select[@ng-model="request.ld_status"]/option[contains(text(),"'+V.flag+'")]'));
    LF.closeEditRequest();
    SF.click(By.xpath('//button[@ng-click="quit()"]'));

condition.nowWeDoing = 'Проверяем есть ли в SIT флаг в Пикап и в Деливери';
    MF.Board_OpenSideBar();
    MF.Board_ClickLongDistanceDispach();
    MF.Board_OpenPickup();
    MF.Board_OpenSideBar();
    SF.click(By.xpath('//md-select[@ng-model="selectedStatus"]'));
    SF.sleep(1);
    SF.click(By.xpath('//md-option[@ng-repeat="item in ldStatuses"]/div[text()="'+V.flag+'"]'));
    // MF.Board_OpenSideBar();
    MF.Board_ClickLongDistanceDispach();
    SF.click(By.xpath('//a[@ui-sref="lddispatch.pick_up"]'));
	// MF.Board_ClickLongDistanceDispach();
	SF.click(By.xpath('//a[@ui-sref="lddispatch.ld_delivery"]'));
    SF.sleep(2);
    SF.click(By.xpath('//md-select[@ng-model="selectedStatus"]'));
    SF.sleep(1);
    SF.click(By.xpath('//md-option[@ng-repeat="item in ldStatuses"]/div[text()="'+V.flag+'"]'));
    SF.sleep(2);

condition.nowWeDoing = 'Идем в настройки  ЛД и удаляем флаг';
    // MF.Board_OpenSideBar();
    MF.Board_OpenSettingsGeneral ();
    MF.Board_OpenSettingsLongDistance ();
    SF.click(By.xpath('//input[@ng-model="search"]'));
    MF.BoardOpenSettingsLongDistanceStatus();
    SF.click(By.xpath('//tr[@ng-repeat="values in longdistance.ldStatus track by $index"]/../tr[last()]/td/div[@ng-click="removeFlag($index,values)"]'));
    SF.sleep(1);

condition.nowWeDoing = 'Идем в настройки  ЛД и выставляем резервэйшин  прайс в процентах';
    MF.Board_OpenSettingsSchedule();
    SF.send(By.xpath('//input[@ng-model="vm.scheduleSettings.longReservationRate"]'), 0);
    SF.select(By.xpath('//select[@ng-model="vm.scheduleSettings.longReservation"]'), 25);
    MF.WaitWhileBusySymbol();

condition.nowWeDoing = 'Создаем ЛД реквест, ставим клиенту пароль и идем на аккаунт.';
	LF.CreateLongDistanceFromBoard(V.client);
	MF.EditRequest_OpenClient();
	LF.SetClientPasswd(V.client.passwd);
	MF.EditRequest_OpenRequest();
	V.boardNumbers = {};
	LF.RememberDigitsRequestBoard(V.boardNumbers);
	MF.EditRequest_CloseEditRequest();
	MF.Board_LogoutAdmin();

condition.nowWeDoing = 'пришли на аккаунт,добавляем инвентарь, вносим детали, выходим из аккаунта.';
    SF.get(V.accountURL);
	LF.LoginToAccountAsClient(V.client);
	MF.Account_OpenRequest(V.boardNumbers.Id);
	MF.Account_ClickViewRequest();
	V.accountNumbersLD={};
	LF.RememberAccountNumbersLD(V.accountNumbersLD);
	LF.Validation_Compare_Account_Admin_LongDistance(V.accountNumbersLD, V.boardNumbers);
	MF.Account_OpenAdressModal();
	MF.Account_SendAdressFromModalWindow();
	MF.Account_SendAdressToModalWindow();
	MF.Account_ClickUpdateClientInModalWindow();
	MF.SweetConfirm();
	MF.SweetConfirm();
	LF.AccountLocalAddInventory(V.accountNumbersLD);
	MF.Account_WaitForInventoryCheck();
	MF.Account_ClickDetails();
	SF.select(By.xpath('//select[@id="current_door_to_parking"]'), 60);
	SF.select(By.xpath('//select[@id="new_door_to_parking"]'), 60);
	SF.select(By.xpath('//select[@id="current_parking_permit"]'), "PDW");
	SF.select(By.xpath('//select[@id="new_parking_permit"]'), "PDW");
	driver.executeScript("$('select#new_parking_permit').get(0).scrollIntoView();");
	SF.click(By.xpath('//div[@ng-blur="details_change(\'Additional Comments\',details.addcomment, \'addcomment\')"]'));
	MF.Account_ClickSaveDetails();
	MF.Account_WaitForDetailsCheck();
	MF.Account_WaitForLoadingAccount();
	V.accountNumbersLD1={};
	LF.RememberAccountNumbersLD(V.accountNumbersLD1);
	LF.LogoutFromAccount();

condition.nowWeDoing = 'переходим на мувборд, менем статус у реквеста на нот конферм, сохраняем. ';
	SF.get(V.adminURL);
	LF.LoginToBoardAsCustom(V.adminLogin,V.adminPassword);
	MF.Board_OpenRequest(V.boardNumbers.Id);
	V.boardNumbers2 = {};
	LF.RememberDigitsRequestBoard(V.boardNumbers2);
	LF.Validation_Compare_Account_Admin_LongDistance(V.accountNumbersLD1,V.boardNumbers2);
	MF.EditRequest_SetToNotConfirmed();
    JS.step(JSstep.selectTruck((V.boardNumbers2.LaborTimeMax + V.boardNumbers2.TravelTime)/60));
    MF.WaitWhileBusy();
	MF.EditRequest_SaveChanges();
	MF.EditRequest_CloseEditRequest();
	MF.Board_LogoutAdmin();

condition.nowWeDoing = 'идем на аккаунт клиента, проверяем статус нот конферм, вносим инвентарь. проверка статуса пэдинг-инфо' +
        'выходим из аккаунта';
	SF.get(V.accountURL);
	LF.LoginToAccountAsClient(V.client);
	MF.Account_OpenRequest(V.boardNumbers.Id);
	driver.wait(driver.findElement(By.xpath('//div[@ng-include="vm.statusTemplate"]/div/p[contains(text(),"Status: Not Confirmed")]')).getText().then(function (Status) {
		VD.IWant(VD.ToEqual, Status, 'Status: Not Confirmed');
	}), config.timeout);
	MF.Account_ClickInventoryOpenTab();
	SF.waitForVisible(By.xpath('//span[contains(text(),"Dining Room")]'));
	SF.click(By.xpath('//span[contains(text(),"Dining Room")]'));
	SF.click(By.xpath('(//div[@class="new-inventory-item"])[1]//button[@ng-click="onClickCounter(1)"]'));
	SF.click(By.xpath('(//div[@class="new-inventory-item"])[2]//button[@ng-click="onClickCounter(1)"]'));
	SF.click(By.xpath('(//div[@class="new-inventory-item"])[3]//button[@ng-click="onClickCounter(1)"]'));
	SF.click(By.xpath('(//div[@class="new-inventory-item"])[4]//button[@ng-click="onClickCounter(1)"]'));
	MF.Account_ClickSaveInventory();
	MF.SweetConfirm();
	MF.Account_WaitForInventoryCheck();
    MF.Account_CheckRequestStatus_PendingInfo();
	MF.SweetConfirm();
	V.accountNumbersLD2={};
	LF.RememberAccountNumbersLD(V.accountNumbersLD2);
	LF.LogoutFromAccount();

condition.nowWeDoing = 'переходим на мувборд, менем статус у реквеста на нот конферм, сохраняем. ';
	SF.get(V.adminURL);
	LF.LoginToBoardAsCustom(V.adminLogin,V.adminPassword);
	MF.Board_OpenRequest(V.boardNumbers.Id);
	V.boardNumbers3 = {};
	LF.RememberDigitsRequestBoard(V.boardNumbers3);
	LF.Validation_Compare_Account_Admin_LongDistance(V.accountNumbersLD2,V.boardNumbers3);
	MF.EditRequest_SetToNotConfirmed();
	driver.wait(driver.findElement(By.xpath('//input[@ng-model="request.reservation_rate.value"]')).getText().then(function (text) {
		V.Deposit= text;
		V.Deposit= Math.round((2462)*100)/100;
	}), config.timeout);
	SF.sleep(1);
	const percents= 0.25;
	const rate = 10;
	const cbf = V.boardNumbers3.cbf;
	const quote = rate * cbf;
	let reservation = quote * percents;
	reservation = Math.floor(reservation) * 100/100;
	VD.IWant(VD.ToEqual, V.Deposit , reservation,'не совпали reservation price у реквеста с расчетами по формулам');
	MF.EditRequest_SaveChanges();
	MF.EditRequest_CloseEditRequest();
	MF.Board_LogoutAdmin();

condition.nowWeDoing = 'идем на аккаунт букаться, проверяем нашу цифру на резервейшн прайс ';
	SF.get(V.accountURL);
	LF.LoginToAccountAsClient(V.client);
	MF.Account_OpenRequest(V.boardNumbers.Id);
	MF.Account_ClickProceedBookYourMove();
	JS.scroll('div[ng-if="vm.request.reservation_rate.value !=0 && vm.request.status.raw != 3 && vm.request.status.raw == 2"]');
	driver.wait(driver.findElement(By.xpath('//div[@ng-if="vm.request.reservation_rate.value !=0 && vm.request.status.raw != 3 && vm.request.status.raw == 2"]/h2[contains(text(),"Deposit: $2462")]')).getText().then(function (text) {
		V.DepositinCP = text;
        VD.IWant(VD.ToEqual, "Deposit: $"+V.Deposit, V.DepositinCP,'не совпал reservation price на реквесте и на странице confirmation page');
    }), config.timeout);
	MF.Account_ClickIAgreeWithAll();
	SF.click(By.xpath('//div[@ng-click="addReservationPayment()"]'));
	SF.waitForVisible(By.xpath('//canvas[@id="signatureCanvasReserv"]'));
	LF.MakeSignJS('signatureCanvasReserv');
	SF.click(By.xpath('//button[contains(@ng-click,"saveReservSignature()")]'));
	driver.wait(driver.findElement(By.xpath('//div[@ng-init="payment.setPaymentBlockHeight(\'.credit_form.credit-pay\')"]/div')).getText().then(function (text) {
		V.DepositPay = text;
		V.DepositPay= Math.round((2462)*100)/100;
        VD.IWant(VD.ToEqual,V.Deposit, V.DepositPay,'не совпали reservation price на реквесте и в окне при оплате reservation price');
    }), config.timeout);
	LF.FillCardPayModal();
	MF.WaitWhileSpinner();
	MF.Account_WaitForGreenTextAfterConfirm();
	V.accountNumbersLD3={};
	LF.RememberAccountNumbersLD(V.accountNumbersLD3);
	LF.LogoutFromAccount();

condition.nowWeDoing = 'выходим из аккаунта, проверяем наш реквест, ставим настройки на дефолтные ';
	SF.get(V.adminURL);
	LF.LoginToBoardAsCustom(V.adminLogin,V.adminPassword);
	MF.Board_OpenConfirmed();
	MF.Board_OpenRequest(V.boardNumbers.Id);
	V.boardNumbers4 = {};
	LF.RememberDigitsRequestBoard(V.boardNumbers4);
	LF.Validation_Compare_Account_Admin_LongDistance(V.accountNumbersLD3,V.boardNumbers4);
	driver.wait(driver.findElement(By.xpath('//label[@ng-click="cancelReservation();"][contains(text(),"Reservation Received")]')).getText().then(function (Status) {
		VD.IWant(VD.ToEqual, Status, 'Reservation Received','после оплаты на реквесте не отобразился статус, что резервация была оплачена');
	}), config.timeout);
	MF.EditRequest_CloseEditRequest();
	MF.Board_OpenSettingsSchedule();
	SF.send(By.xpath('//input[@ng-model="vm.scheduleSettings.longReservationRate"]'), 500);
	SF.select(By.xpath('//select[@ng-model="vm.scheduleSettings.longReservation"]'), 0);
	SF.click(By.xpath('//section[@ng-controller="ScheduleContorller as vm"]'));
	SF.sleep(2);

	SF.endOfTest();
};