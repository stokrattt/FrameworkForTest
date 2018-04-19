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
    LF.LongDistanceSettings_AddLDStatusFlag('Flag');

condition.nowWeDoing = 'Создаем реквест, и проверяем есть ли в нем флаг';
    MF.Board_CreateDraftRequest();
    SF.click(By.xpath('//select[@id="edit-service"]/option[@value="7"]'));
    SF.click(By.xpath('//select[@ng-model="request.ld_status"]/option[contains(text(),"Flag")]'));
    LF.closeEditRequest();
    SF.click(By.xpath('//button[@ng-click="quit()"]'));

condition.nowWeDoing = 'Проверяем есть ли в SIT флаг в Пикап и в Деливери';
    MF.Board_OpenSideBar();
    MF.Board_ClickLongDistanceDispach();
    MF.Board_OpenPickup();
    MF.Board_OpenSideBar();
    SF.click(By.xpath('//md-select[@ng-model="selectedStatus"]'));
    SF.sleep(1);
    SF.click(By.xpath('//md-option[@ng-repeat="item in ldStatuses"]/div[text()="Flag"]'));
    MF.Board_OpenSideBar();
    MF.Board_ClickLongDistanceDispach();
    SF.click(By.xpath('//a[@ui-sref="lddispatch.pick_up"]'));
    SF.sleep(2);
    SF.click(By.xpath('//a[@ui-sref="lddispatch.ld_delivery"]'));
    SF.sleep(2);
    SF.click(By.xpath('//md-select[@ng-model="selectedStatus"]'));
    SF.sleep(1);
    SF.click(By.xpath('//md-option[@ng-repeat="item in ldStatuses"]/div[text()="Flag"]'));
    SF.sleep(2);

condition.nowWeDoing = 'Идем в настройки  ЛД и удаляем флаг';
    MF.Board_OpenSideBar();
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
	MF.EditRequest_WaitForOpenRequest();
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
	MF.Account_WaitForLoadingAccount();
	V.accountNumbersLD={};
	LF.RememberAccountNumbersLD(V.accountNumbersLD);
	LF.Validation_Compare_Account_Admin_LongDistance(V.accountNumbersLD, V.boardNumbers);
	LF.AccountLocalAddInventory(V.accountNumbersLD);
	MF.Account_WaitForInventoryCheck();
	LF.AccountLocalDetails();
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
	MF.Account_WaitForLoadingAccount();
	SF.waitForVisible(By.xpath('//div[@ng-include="vm.statusTemplate"]/div/p[contains(text(),"Status: Not Confirmed")]'));
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
	SF.waitForVisible(By.xpath('//input[@ng-model="request.reservation_rate.value"]'));
	V.Deposit={};
	driver.wait(driver.findElement(By.xpath('//input[@ng-model="request.reservation_rate.value"]')).getAttribute('value').then(function (text) {
		V.Deposit= text;
		VD.IWant(VD.ToEqual, text, '$2,462.50');
	}), config.timeout);
	MF.EditRequest_SaveChanges();
	MF.EditRequest_CloseEditRequest();
	MF.Board_LogoutAdmin();

	condition.nowWeDoing = 'идем на аккаунт букаться, проверяем нашу цифру на резервейшн прайс ';
	SF.get(V.accountURL);
	LF.LoginToAccountAsClient(V.client);
	MF.Account_OpenRequest(V.boardNumbers.Id);
	MF.Account_WaitForLoadingAccount();
	MF.Account_ClickProceedBookYourMove();
	JS.scroll('div[ng-if="vm.request.reservation_rate.value !=0 && vm.request.status.raw != 3 && vm.request.status.raw == 2"]');
	V.DepositinConfPage={};
	driver.wait(driver.findElement(By.xpath('//div[@ng-if="vm.request.reservation_rate.value !=0 && vm.request.status.raw != 3 && vm.request.status.raw == 2"]/h2[contains(text(),"Deposit:")]')).getAttribute('value').then(function (text) {
		V.DepositinComfPage = text;
		VD.IWant(VD.ToEqual, V.Deposit, V.DepositinConfPage);
	}), config.timeout);
	SF.endOfTest();
};