module.exports = function main(SF, JS, MF, LF, JSstep, VD, V, By, until,FileDetector, system, condition, config, constants) {
	global.fiber = Fiber.current;
	V.client = {};
	V.client.name = SF.randomBukva(6) + '_t';
	V.client.fam = SF.randomBukva(6) + '_t';
	V.client.phone = SF.randomCifra(10);
	V.client.email = SF.randomBukvaSmall(6) + '@' + SF.randomBukvaSmall(4) + '.tes';
	V.client.passwd = 123;

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
	SF.sleep(1);
	driver.wait(driver.executeScript(JSstep.selectHomeEstimator(4, V.salesName)));
	SF.sleep(1);
	V.boardNumbers = {};
	LF.RememberDigitsRequestBoard(V.boardNumbers);
	MF.EditRequest_OpenClient();
	LF.SetClientPasswd(V.client.passwd);
	MF.EditRequest_OpenRequest();
	MF.EditRequest_SaveChanges();
	condition.nowWeDoing = 'делаем проплату, чтобы проверить Insert %';
	MF.EditRequest_OpenPayment();
	LF.EditRequest_Payment_AddOnlinePayment();
	MF.EditRequest_ClosePayment();
	LF.closeEditRequest();
	condition.nowWeDoing = 'идем в Requests открываем Inhome Estimate для проверки что работа есть';
	LF.HomeEstimateRequest_Check();
	condition.nowWeDoing = 'идем на дащборд проверить реквест в табе Inhome Estimate';
	LF.HomeEstimate_CheckStatusinMoveboard();
	condition.nowWeDoing = 'идем в аккаунт, проверить что статус реквеста инхом эстимеит';
	LF.HomeEstimate_CheckAccount();
	condition.nowWeDoing = 'заходим в портал как сейлс';
	LF.HomeEstimate_SalesGoInPortal();
	SF.sleep(3);
	//Добавляем  пэкинг
	MF.WaitWhileBusy ();
	MF.EditRequest_AddPackingAndFullPAcking();
	SF.click(By.xpath('//button[@ng-click="save()"]'));
	MF.WaitWhileBusy ();
	//добавляем адишинал
	MF.EditRequest_AddAdditionalServSalesTab();
	//добавление инвентаря
	LF.AddInventory_InHomeEstimate();
	SF.sleep(5);
	// меняем имя юзера
	MF.WaitWhileBusy();
	LF.HomeEstimate_EditClientInfo();
	SF.click(By.xpath('//li/a[@ng-click="select(tabs[0])"]'));
	//выбираем трак и конфермим работу
	JS.step(JSstep.selectTruck((V.boardNumbers.LaborTimeMax + V.boardNumbers.TravelTime)/60));
	MF.EditRequest_SetToNotConfirmed();
	SF.click(By.xpath('//button[@ng-click="saveChanges()"]'));
	JS.waitForExist('button[ng-click="update(request)"]:visible');
	SF.click(By.xpath('//button[@ng-click="update(request)"]'));
	SF.sleep(2);
	MF.WaitWhileBusy ();
	LF.HomeEstimate_ReservationPage();
	MF.WaitWhileBusy();
	SF.click(By.xpath('//div/button[@ng-click="cancel()"]'));
	MF.HomeEstimate_Logout();
	// идем на дэшборд и проверяем статус конферм
	MF.WaitWhileBusy ();
	SF.get(V.adminURL);
	LF.LoginToBoardAsCustom(V.salesLogin,V.salesPassword);
	MF.WaitVisibleDashboard();
	MF.Board_OpenConfirmed();
	MF.WaitWhileBusy();
	MF.Board_OpenRequest(V.boardNumbers.Id);
	MF.EditRequest_CloseEditRequest();
	SF.endOfTest();
};


