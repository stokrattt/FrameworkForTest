module.exports = function main(SF, JS, MF, LF, JSstep, VD, V, By, until,FileDetector, system, condition, config, constants) {
	global.fiber = Fiber.current;
	V.client = {};
	V.client.name = SF.randomBukva(6) + '_t';
	V.client.fam = SF.randomBukva(6) + '_t';
	V.client.phone = SF.randomCifra(10);
	V.client.email = SF.randomBukvaSmall(6) + '@' + SF.randomBukvaSmall(4) + '.tes';
	V.client.passwd = 123;
	V.salesName = "emilia clarck";
	V.salesLogin = "emilia";
	V.salesPassword = 123;

	condition.nowWeDoing = 'создаем мувинг с фронта, ставим статус инхом эстимеит';
	SF.get(V.adminURL);
	LF.LoginToBoardAsCustom(V.salesLogin,V.salesPassword);
	LF.CreateLocalMovingFromBoard(V.client);
	MF.EditRequest_SetAdressToFrom();
	MF.EditRequest_ChangeStatusRequest (4);
	MF.EditRequest_ClickHomeEstimateDate();
	driver.wait(driver.executeScript(JSstep.Click4DaysCalendar).then(function (calDate) {
		V.RequestInhomeDate = calDate;
	}),config.timeout);
	JS.click('div[uib-tooltip="emilia clark"]');
	MF.WaitWhileBusy();
	SF.click(By.id('home-estimate-start-time'));
	SF.send(By.id('home-estimate-start-time'),"12:30 AM");
	SF.click(By.xpath('//input[@ng-model="request.home_estimate_start_time.value"]'));
	SF.send(By.xpath('//input[@ng-model="request.home_estimate_start_time.value"]'),"02:00 AM");
	V.boardNumbers = {};
	MF.EditRequest_OpenClient();
	LF.SetClientPasswd(V.client.passwd);
	MF.EditRequest_OpenRequest();
	MF.EditRequest_SaveChanges();

condition.nowWeDoing = 'делаем проплату, чтобы проверить Insert %';
	MF.EditRequest_OpenPayment();
	LF.EditRequest_Payment_AddOnlinePayment();
	MF.EditRequest_ClosePayment();
	LF.RememberDigitsRequestBoard(V.boardNumbers);
	LF.closeEditRequest();

	condition.nowWeDoing = 'идем в Requests открываем Inhome Estimate для проверки что работа есть';
	LF.HomeEstimateRequest_Check(V.boardNumbers);

	condition.nowWeDoing = 'идем на дащборд проверить реквест в табе Inhome Estimate';
	MF.Board_OpenDashboard();
	MF.Board_OpenInhomeEstimateTab();
	driver.wait(driver.findElement(By.xpath('//td[contains(text(), "' + V.boardNumbers.Id + '")]')).getText().then(function (text) {
		VD.IWant(VD.ToEqual, SF.cleanPrice(text), V.boardNumbers.Id, 'реквеста нет в табе Inhome Estimate на дашборде')
	}), config.timeout);
	MF.Board_LogoutAdmin();

	condition.nowWeDoing = 'идем в аккаунт, проверить что статус реквеста инхом эстимеит';
	SF.get(V.accountURL);
	LF.LoginToAccountAsClient(V.client);
	MF.Account_OpenRequest(V.boardNumbers.Id);
	MF.Account_ClickViewRequest();
	driver.wait(driver.findElement(By.xpath('//div[@ng-show="vm.statusText.length"]//div[contains(text()," In-home Estimate")]')).getText().then(function (Status) {
		VD.IWant(VD.ToEqual, Status, 'IN-HOME ESTIMATE');
	}), config.timeout);
	MF.Board_LogoutAdmin();

	condition.nowWeDoing = 'заходим в портал как сейлс';
	SF.get(V.adminURL);
	LF.HomeEstimate_SalesGoInPortalandOpenRequest(V.salesLogin,V.salesPassword, V.boardNumbers);

	condition.nowWeDoing = 'добавляем пэкинг и адишенал сервисы';
	JS.scroll('label[ng-click="openAddPackingModal();"]');
	MF.EditRequest_AddPackingAndFullPAcking();
	MF.EditRequest_AddAdditionalServSalesTab();

	condition.nowWeDoing = 'запоминаем исходное значение c/f';
	driver.wait(driver.findElement(By.xpath('//span[@ng-if="!states.invoiceState"]')).getText().then(function(text){
		V.boardNumbersPortalcf=text;
		console.log(V.boardNumbersPortalcf);
	}),config.timeout);


	condition.nowWeDoing = 'добавляем инвентарь';
	LF.AddInventory_InHomeEstimate();
	JS.scroll('span[ng-if="!states.invoiceState"]');
	driver.wait(driver.findElement(By.xpath('//span[@ng-if="!states.invoiceState"]')).getText().then(function(text){
		V.boardNumbersPortalnewcf=text;
		console.log(V.boardNumbersPortalnewcf);
	}),config.timeout);
	SF.sleep(1);
	VD.IWant(VD.NotToEqual, V.boardNumbersPortalcf , V.boardNumbersPortalnewcf , 'если не равны, то пересчет произошел на новые cf, если равные, то баг ');

	condition.nowWeDoing = 'изменяем информацию о клиенте, выбираем трак и конфермим работу';
	MF.EditRequest_WaitForOpenRequest();
	SF.waitForVisible(By.xpath('//div[@ng-class="{\'mobile-subbox-wrapper\': isMobile}"]'));
	LF.HomeEstimate_EditClientInfo();
	MF.EditRequest_OpenRequest();
	JS.step(JSstep.selectTruck((V.boardNumbers.LaborTimeMax + V.boardNumbers.TravelTime)/60));
	MF.WaitWhileBusy();
	MF.EditRequest_SetToNotConfirmed();
	MF.EditRequest_HomeEstimate_SaveChanges();
	LF.HomeEstimate_ReservationPage();
	SF.waitForVisible(By.xpath('//div[@ng-class="{\'mobile-subbox-wrapper\': isMobile}"]'));
	V.boardNumbersPortal = {};
	LF.RememberDigitsRequestBoard(V.boardNumbersPortal);
	SF.click(By.xpath('//div/button[@ng-click="cancel()"]'));
	MF.HomeEstimate_Logout();

	condition.nowWeDoing = 'идем на дэшборд, сверяем цифры портала с цифрами в реквесте';
	SF.get(V.adminURL);
	LF.LoginToBoardAsCustom(V.salesLogin,V.salesPassword);
	MF.WaitVisibleDashboard();
	MF.Board_OpenConfirmed();
	MF.WaitWhileBusy();
	MF.Board_OpenRequest(V.boardNumbers.Id);
	V.boardAfterPortal = {};
	LF.RememberDigitsRequestBoard(V.boardAfterPortal);
	LF.Validation_Compare_Account_Admin(V.boardNumbersPortal,V.boardAfterPortal);
	SF.sleep(1);

	SF.endOfTest();
};


