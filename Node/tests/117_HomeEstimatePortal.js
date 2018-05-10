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
    let now = new Date();
    let msInDay = 86400000;
    let future = new Date(now.getTime() + msInDay * 24);
    let month = { month: 'numeric'};
    let day = {day: 'numeric'};
    V.firstDate = {};
    V.firstDate.Month = (future.toLocaleDateString('en-US', month)) - 1;
    V.firstDate.Day = (future.toLocaleDateString('en-US', day));
    SF.click(By.xpath('//div[@id="ui-datepicker-div"]//td[@data-month="'+ V.firstDate.Month +'"]/a[contains(text(),"'+ V.firstDate.Day +'")]'));
    MF.WaitWhileBusy();
	JS.click('div[uib-tooltip="emilia clark"]');
	MF.WaitWhileBusy();
	SF.click(By.id('home-estimate-start-time'));
	SF.send(By.id('home-estimate-start-time'),"08:00 AM");
	SF.click(By.xpath('//input[@ng-model="request.home_estimate_start_time.value"]'));
	SF.send(By.xpath('//input[@ng-model="request.home_estimate_start_time.value"]'),"12:00 AM");
	SF.sleep(1);
	SF.click(By.id('home-estimate-duration'));
	SF.click(By.xpath('//div[@class="ui-timepicker-wrapper"][3]/ul/li[8]'));
	V.Duration={};
	driver.wait(driver.findElement(By.id('home-estimate-duration')).getAttribute('value').then(function (text) {
		V.Duration= text;
	}), config.timeout);
	MF.EditRequest_OpenClient();
	LF.SetClientPasswd(V.client.passwd);
	MF.EditRequest_OpenRequest();
	MF.EditRequest_SaveChanges();


	condition.nowWeDoing = 'делаем проплату, чтобы проверить Insert %';
	MF.EditRequest_OpenPayment();
	LF.EditRequest_Payment_AddOnlinePayment();
	MF.EditRequest_ClosePayment();
	MF.EditRequest_WaitForOpenRequest();
	V.boardNumbers = {};
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

	condition.nowWeDoing = 'заходим в портал как сейлс и открываем реквест';
	SF.get(V.adminURL);
	LF.HomeEstimate_SalesGoInPortalandOpenRequest(V.salesLogin,V.salesPassword, V.boardNumbers);
	SF.sleep(2);
	V.homeestimateNumbers ={};
	LF.RememberDigitsRequestBoard(V.homeestimateNumbers);

	condition.nowWeDoing = 'проверка цифр на портале';
	JS.scroll('i[ng-hide="isShowHomeEstimate"]');
	SF.click(By.xpath('//i[@ng-hide="isShowHomeEstimate"]'));
	SF.click(By.id('home-estimate-duration'));
	V.DurationPortal={};
	driver.wait(driver.findElement(By.id('home-estimate-duration')).getAttribute('value').then(function (text) {
		V.DurationPortal= text;
		console.log(V.DurationPortal);
	}), config.timeout);
	SF.sleep(1);
	VD.IWant(VD.ToEqual, V.Duration, V.DurationPortal, 'не совпал отрезок времени работы хоум эстимейтора на мувборде/ портале');
	VD.IWant (VD.ToEqual, V.boardNumbers.TotalMin, V.homeestimateNumbers.TotalMin, 'не совпала минимальная квота на мувборде/ в портале');
	VD.IWant (VD.ToEqual, V.boardNumbers.TotalMax, V.homeestimateNumbers.TotalMax, 'не совпала максимальная квота на мувборде/ в портале ');
	VD.IWant(VD.ToEqual, V.boardNumbers.TravelTime,V.homeestimateNumbers.TravelTime,'не совпал трэвел тайм на мувборде / в портале');
	VD.IWant(VD.ToEqual, V.boardNumbers.Packing , V.homeestimateNumbers.Packing,'не совпал пэкинг на мувборде/ в портале');
	VD.IWant(VD.ToEqual, V.boardNumbers.Fuel, V.homeestimateNumbers.Fuel,'не совпал фюел на мувборде/ в портале');
	VD.IWant(VD.ToEqual, V.boardNumbers.HourlyRate, V.homeestimateNumbers.HourlyRate,'не совпал рейт на мувборде / в портале');
	VD.IWant(VD.ToEqual, V.boardNumbers.Trucks, V.homeestimateNumbers.Trucks,'не совпало количество траков на мувборде/ в портале');
	VD.IWant(VD.ToEqual, V.boardNumbers.AdServices,V.homeestimateNumbers.AdServices,'не совпали адишинал сервисы на мувборде/ в портале');
	VD.IWant(VD.ToEqual, V.boardNumbers.CrewSize, V.homeestimateNumbers.CrewSize,'не совпал крюсайз на мувборде/ в портале');
	VD.IWant(VD.ToEqual, V.boardNumbers.cbf, V.homeestimateNumbers.cbf,'не совпали кубикфиты на мувборде/ в портале');


	condition.nowWeDoing = 'добавляем пэкинг и адишенал сервисы';
	JS.scroll('label[ng-click="openAddPackingModal();"]');
    LF.EditRequest_AddPackingAndFullPAcking();
	LF.EditRequest_AddAdditionalServSalesTab();

	condition.nowWeDoing = 'запоминаем исходное значение c/f';
	driver.wait(driver.findElement(By.xpath('//span[@ng-if="!states.invoiceState"]')).getText().then(function(text){
		V.boardNumbersPortalcf=text;
	}),config.timeout);


	condition.nowWeDoing = 'добавляем инвентарь, делаем проверку по кубикфитам';
	LF.AddInventory_InHomeEstimate();
	SF.waitForVisible(By.xpath('//div[@ng-show="isShowParklot"]'));
	JS.scroll('span[ng-if="!states.invoiceState"]');
	driver.wait(driver.findElement(By.xpath('//span[@ng-if="!states.invoiceState"]')).getText().then(function(text){
		V.boardNumbersPortalnewcf=text;
	}),config.timeout);
	SF.sleep(1);
	VD.IWant(VD.NotToEqual, V.boardNumbersPortalcf , V.boardNumbersPortalnewcf , 'если не равны, то пересчет произошел на новые cf, если равные, то баг ');

	condition.nowWeDoing = 'изменяем информацию о клиенте, выбираем трак и конфермим работу';
	MF.EditRequest_WaitForOpenRequest();
	SF.waitForVisible(By.xpath('//div[@ng-class="{\'mobile-subbox-wrapper\': isMobile}"]'));
	LF.HomeEstimate_EditClientInfo();
	MF.EditRequest_OpenRequest();
	JS.step(JSstep.selectTruck(4));
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
	MF.Board_OpenConfirmed();
	MF.Board_OpenRequest(V.boardNumbers.Id);
	V.boardAfterPortal = {};
	LF.RememberDigitsRequestBoard(V.boardAfterPortal);
	LF.Validation_Compare_Account_Admin(V.boardNumbersPortal,V.boardAfterPortal);
	SF.sleep(1);

	condition.nowWeDoing = 'идем в локалдиспатч, назначаем работников';
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


