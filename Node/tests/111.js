module.exports = function main(SF, JS, MF, LF, JSstep, VD, V, By, until,FileDetector, system, condition, config, constants) {
	global.fiber = Fiber.current;
	V.client = {};
	V.client.name = SF.randomBukva(6) + '_t';
	V.client.fam = SF.randomBukva(6) + '_t';
	V.client.phone = SF.randomCifra(10);
	V.client.email = SF.randomBukvaSmall(6) + '@' + SF.randomBukvaSmall(4) + '.tes';
	V.client.passwd = 123;


	condition.nowWeDoing = 'Заходим в админку, создаем лонг дистанс с фронта';
	SF.get(V.adminURL);
	LF.LoginToBoardAsCustom(V.adminLogin,  V.adminPassword);
	LF.CreateLongDistanceFromBoard(V.client);
	MF.EditRequest_WaitForOpenRequest();
	MF.EditRequest_OpenClient();
	LF.SetClientPasswd(V.client.passwd);
	MF.EditRequest_OpenRequest();
	V.boardNumbers = {};
	LF.RememberDigitsRequestBoard(V.boardNumbers);
	MF.EditRequest_CloseEditRequest();
	MF.Board_LogoutAdmin();


	condition.nowWeDoing = 'заходимм в аккаунт, добавляем инвентарь первый раз, делаем сверку чисел борда и аккаунта, добавили детали';
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
	MF.Account_ClickDetails();
	SF.select(By.xpath('//select[@id="current_door_to_parking"]'), 250);
	SF.select(By.xpath('//select[@id="new_door_to_parking"]'), 250);
	SF.select(By.xpath('//select[@id="current_parking_permit"]'), "PR");
	SF.select(By.xpath('//select[@id="new_parking_permit"]'), "PM");
	SF.select(By.xpath('//select[@ng-model="details.steps_origin"]'),100);
	SF.select(By.xpath('//select[@ng-model="details.steps_destination"]'),100);
	driver.executeScript("$('select#new_parking_permit').get(0).scrollIntoView();");
	MF.Account_ClickSaveDetails();
	MF.Account_WaitForDetailsCheck();
	MF.Account_ClickInventoryOpenTab();
	SF.waitForVisible(By.xpath('//span[contains(text(),"Dining Room")]'));
	SF.click(By.xpath('//span[contains(text(),"Dining Room")]'));
	SF.click(By.xpath('(//div[@class="new-inventory-item"])[1]//button[@ng-click="onClickCounter(1)"]'));
	SF.click(By.xpath('(//div[@class="new-inventory-item"])[2]//button[@ng-click="onClickCounter(1)"]'));
	SF.click(By.xpath('(//div[@class="new-inventory-item"])[3]//button[@ng-click="onClickCounter(1)"]'));
	SF.click(By.xpath('(//div[@class="new-inventory-item"])[4]//button[@ng-click="onClickCounter(1)"]'));
	MF.Account_ClickSaveInventory();
	MF.Account_WaitForInventoryCheck();
	MF.Account_WaitForLoadingAccount();
	V.AdditionalServices={};
	driver.wait(driver.findElement(By.xpath('//div[@ng-repeat="service in vm.extraServices"]/div[contains(text(),"$880.00")]')).getText().then(function (text) {
		V.AdditionalServices=text;
		console.log(V.AdditionalServices);
	}), config.timeout);
	V.accountNumbers1={};
	LF.RememberAccountNumbersLD(V.accountNumbers1);
	LF.LogoutFromAccount();

	condition.nowWeDoing = 'заходи на мувборд под админом' +
		'добавляем адишинал дискаунт, изменяем рейт, меняем количество крю сайз,выбираем трак,еще раз применяем скидку' +
		'ставим сттатус нот конферм и сохраняем изменения в реквесте';
	SF.get(V.adminURL);
	LF.LoginToBoardAsCustom(V.adminLogin, V.adminPassword);
	MF.WaitVisibleDashboard();
	MF.Board_OpenRequest(V.boardNumbers.Id);
	MF.EditRequest_WaitForOpenRequest();
	V.boardNumbers2 = {};
	LF.RememberDigitsRequestBoard(V.boardNumbers2);
	LF.Validation_Compare_Account_Admin_LongDistance(V.accountNumbers1,V.boardNumbers2);
	SF.click(By.xpath('//label[@ng-click="openAddServicesModal();"]'));
	SF.waitForVisible(By.xpath('//li[@ng-repeat="extra_charge in extra_charges"][10]'))
	V.AdditionalServicesBoard={};
	driver.wait(driver.findElement(By.xpath('//div[@ng-repeat="add_extra_charge in add_extra_charges track by $index"]//tbody//tr//td[5]')).getText().then(function (text) {
		V.AdditionalServicesBoard=text;
		console.log(V.AdditionalServicesBoard);
	}), config.timeout);
	SF.sleep(1);
	VD.IWant(VD.ToEqual, V.AdditionalServices, V.AdditionalServicesBoard, 'не cовпали адишинал сервисы на аккаунте и мувборде');
	SF.click(By.xpath('//button[@ng-click="cancel()"][contains(text(),"Cancel")]'));
	MF.EditRequest_OpenDiscountModal();
	MF.EditRequest_SendMoneyDiscount(555);
	MF.WaitWhileToaster();
	MF.EditRequest_SendRateForLD(5);
	SF.click(By.xpath('//button[@tabindex="1"]'));
	MF.EditRequest_ChangeCrew(3);
	JS.step(JSstep.selectTruck((V.boardNumbers.LaborTimeMax + V.boardNumbers.TravelTime)/60));
	SF.sleep(2);
	MF.EditRequest_OpenDiscountModal();
	MF.EditRequest_SendMoneyDiscount(333);
	MF.EditRequest_SetToNotConfirmed();
	MF.WaitWhileBusy();
	V.boardNumbers.AfterEdit = {};
	LF.RememberDigitsRequestBoard(V.boardNumbers.AfterEdit);
	MF.EditRequest_SaveChanges();
	MF.EditRequest_CloseEditRequest();
	MF.Board_LogoutAdmin();

	condition.nowWeDoing = 'заходим в аккаунт, проверять все числа и адишинал сервисы,которые должны быть.';



};
