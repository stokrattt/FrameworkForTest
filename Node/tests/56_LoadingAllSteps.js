module.exports = function main(SF, JS, MF, LF, JSstep, VD, V, By, until,FileDetector, system, condition, config,constants){
    global.fiber = Fiber.current;
    V.client = {};
    V.client.name = SF.randomBukva(6) + '_t';
    V.client.fam = SF.randomBukva(6) + '_t';
    V.client.phone = SF.randomCifra(10);
    V.client.email = SF.randomBukvaSmall(6) + '@' + SF.randomBukvaSmall(4) + '.tes';
    V.client.passwd = 123;

    SF.get(V.adminURL);
    LF.LoginToBoardAsCustom(V.adminLogin,V.adminPassword);

condition.nowWeDoing = 'идем в департмент включить календарь для форемана';
    MF.Board_OpenSettingsDepartment ();
    MF.WaitWhileBusy();
    MF.Department_OpenForeman();
    MF.Department_OpenHuman ("Test Foreman");
    MF.Department_User_OpenAccount();
    MF.Department_ClearSendGmailAdress(V.ForEmail);
    MF.Department_SaveUser();
    MF.Board_LogoutAdmin();
    SF.get(V.frontURL);

condition.nowWeDoing = 'заполняем калькулятор верхний';
    LF.FullSmallCalcAsLoading(V.client);

condition.nowWeDoing = 'первый раз в аккаунте';
    MF.Account_ClickViewRequest();
    MF.Account_ClickPartialPacking();
    LF.AccountLoadingEnterAddress();
    LF.AccountLocalAddInventory();
    LF.AccountLoadingDetails();
    MF.Account_WaitForInventoryCheck();
    MF.Account_WaitForDetailsCheck();
	driver.wait(driver.findElement(By.xpath('//span[@ng-if="vm.request.field_useweighttype.value == \'2\' && vm.request.inventory_weight.cfs"]')).getText().then(function(text){
		V.CBFinAccount = SF.cleanPrice(text);
	}),config.timeout);
    V.accountNumbers={};
    LF.RememberAccountNumbers(V.accountNumbers);
    //LF.addToCleanerJob(V.accountNumbers.Id);
    LF.LogoutFromAccount();

condition.nowWeDoing = 'первый раз в админке';
    SF.get(V.adminURL);
    LF.LoginToBoardAsCustom(V.adminLogin,V.adminPassword);
    // MF.Board_OpenSettingsDepartment();
    // MF.WaitWhileBusy ();
    // MF.Department_OpenHuman ("Test Admin");
    // MF.WaitWhileBusy ();
    // MF.Department_OpenNotificationTab();
    // driver.wait(driver.executeScript("if($('md-switch[ng-repeat=\"selectAllNotification in selectAllNotifications track by $index\"]').hasClass('md-checked')){" +
    //     "return true;}else{$('md-switch[ng-repeat=\"selectAllNotification in selectAllNotifications track by $index\"]').click()}"),config.timeout);
    // SF.sleep(2);
    // MF.Department_SaveUser();
    MF.Board_OpenSideBar ();
    MF.Board_OpenDashboard();
    // MF.WaitWhileToaster ();
    // SF.click (By.xpath('//li[@ng-if="!vm.userRoleIs.foreman && vm.isDesktop && !vm.userRoleIs.home_estimator"]//div[@class="elromco-notifications"]'));
    // JS.waitForExist('button[ng-click=\\"checkAll()\\"]:visible');
    // JS.click ('button[ng-click=\\"checkAll()\\"]:visible');
    // SF.sleep(5);
    // SF.click (By.xpath('//button[@ng-click="openFilters = !openFilters"]'));
    // JS.waitForExist ('md-switch[ng-change=\\"turnAllNotifications()\\"]:visible');
    // driver.wait(driver.executeScript("if($('md-switch[ng-change=\"turnAllNotifications()\"]').hasClass('md-checked')){" +
    //     "return true;}else{$('md-switch[ng-change=\"turnAllNotifications()\"]').click()}"),config.timeout);
    // SF.sleep(2);
    // SF.click (By.xpath('//li[@ng-if="!vm.userRoleIs.foreman && vm.isDesktop && !vm.userRoleIs.home_estimator"]//div[@class="elromco-notifications"]'));
    MF.Board_OpenRequest(V.accountNumbers.Id);
    V.boardNumbers = {};
    LF.RememberDigitsRequestBoard(V.boardNumbers);
    LF.Validation_Compare_Account_Admin(V.accountNumbers, V.boardNumbers);
    JS.step(JSstep.selectTruck((V.boardNumbers.LaborTimeMax + V.boardNumbers.TravelTime)/60));
    MF.WaitWhileBusy();
    MF.EditRequest_OpenSettings();
    LF.SetManager('emilia');
    MF.EditRequest_OpenClient();
    LF.SetClientPasswd(V.client.passwd);
    MF.EditRequest_OpenLogs(); //===============================================================//
    MF.EditRequest_Check1EmailExist(V.client.email, "Thank you for submitting a quote.");
    MF.EditRequest_Check1EmailExist(V.client.email, "How To Work With Your New Account.");
    MF.EditRequest_Check1EmailExist(V.adminEmail, "New Request Notification");
    MF.EditRequest_OpenRequest();
    MF.EditRequest_SetToNotConfirmed();
	driver.wait(driver.findElement(By.xpath('//div[@ng-show="!request.isInventory"]')).getText().then(function(text){
		V.CBFinAdmin = SF.cleanPrice(text);
		VD.IWant(VD.ToEqual, V.CBFinAccount ,V.CBFinAdmin,'не сошелся вес после добавления инвентория на аккаунте и в реквесте на мувборде');
	}),config.timeout);
    MF.EditRequest_SaveChanges();
    MF.EditRequest_OpenLogs();
    MF.EditRequest_Check1EmailExist(V.client.email, "Loading Not Confirmed");
    LF.closeEditRequest();
    MF.Board_LogoutAdmin();

condition.nowWeDoing = 'второй раз в аккаунте, конфёрмим';
    SF.get(V.accountURL);
    LF.LoginToAccountAsClient(V.client);
    MF.Account_CheckRequestStatus_NotConfirmed(V.accountNumbers.Id);
    MF.Account_OpenRequest(V.accountNumbers.Id);
	driver.wait(driver.findElement(By.xpath('//span[@ng-if="vm.request.field_useweighttype.value == \'2\' && vm.request.inventory_weight.cfs"]')).getText().then(function(text){
		V.CBFinAccount2 = SF.cleanPrice(text);
		VD.IWant(VD.ToEqual, V.CBFinAccount ,V.CBFinAccount2,'не сошелся вес после добавления инвентория на аккаунте и в реквесте на мувборде');
	}),config.timeout);
    V.accountNumbers={};
    LF.RememberAccountNumbers(V.accountNumbers);
    LF.Validation_Compare_Account_Admin(V.accountNumbers, V.boardNumbers);
    LF.ConfirmRequestInAccount_WithReservation();
    MF.Account_WaitForGreenTextAfterConfirm();
    LF.LogoutFromAccount();

condition.nowWeDoing = 'второй раз в админке, локал диспатч';
    SF.get(V.adminURL);
    LF.LoginToBoardAsCustom(V.adminLogin,V.adminPassword);
    MF.Board_OpenLocalDispatch();
    LF.findDayInLocalDispatch(V.boardNumbers.moveDate.Year, V.boardNumbers.moveDate.Month, V.boardNumbers.moveDate.Day);
    MF.Dispatch_GridView();
    LF.SelectRequestDispatch(V.accountNumbers.Id);
    V.foremanName = 'Test Foreman';
    LF.selectCrew(V.foremanName);
    LF.OpenRequestDispatch(V.accountNumbers.Id);
    SF.sleep(108); //почта на бэк перенесена и потому так долго отправляется письмо
    MF.EditRequest_OpenLogs();
    MF.EditRequest_Check1EmailExist(V.client.email, "Loading Confirmed");
    MF.EditRequest_Check1EmailExist(V.adminEmail, "Request Confirmed");
    MF.EditRequest_Check1EmailExist(V.foremanEmail, "New Job");
    LF.closeEditRequest();
    MF.Board_LogoutAdmin();

// condition.nowWeDoing = 'идем в гугл почту';
//     SF.get('http://gmail.com');
//     SF.sleep(13);
//     MF.Gmail_Login(V.googleloginFor, V.googlePasFor);
//
// condition.nowWeDoing = 'проверяем в календаре, что работа пришла фореману';
//     SF.get('https://calendar.google.com/calendar');
//     SF.sleep(3);
//     SF.click (By.xpath('//div[@class="XyKLOd"]'));
//     SF.sleep(1);
//     SF.click (By.xpath('//div[@class="jO7h3c"] [contains(text(), "День")]'));
//     SF.sleep(3);
//     SF.click (By.xpath('//div[@jsname="OCpkoe"]'));
//     SF.sleep(1);
//     SF.click (By.xpath('//div[@jsname="OCpkoe"]'));
//     SF.sleep(1);
//     SF.click (By.xpath('//div[@jsname="OCpkoe"]'));
//     SF.sleep(1);
//     SF.click (By.xpath('//div[@jsname="OCpkoe"]'));
//     SF.sleep(3);
//     SF.waitForLocated(By.xpath('//div[@role="presentation"]//div[@role="button"]//span/html-blob[contains(text(), "'+V.accountNumbers.Id+'")]'));
//     driver.wait(driver.findElement(By.xpath('//div[@role="presentation"]//div[@role="button"]//span/html-blob[contains(text(), "'+V.accountNumbers.Id+'")]')).getText().then(function(text) {
//    V.Req1Cal = text;
//     VD.IWant(VD.ToEqual, ('#' +V.accountNumbers.Id+ ' |'+ ' '+ V.client.name + ' ' +  V.client.fam),text,'фореману в календарь не пришла работа');
//      }),config.timeout);

condition.nowWeDoing = 'заходим под форменом, открываем контракт';
    SF.get(V.adminURL);
    LF.LoginToBoardAsCustomForeman(V.foremanLogin, V.foremanPassword);
    LF.OpenRequestInForemanPage(V.accountNumbers.Id);
    MF.Contract_WaitConfirmationPage();
    MF.Contract_OpenBillOfLading();
    driver.wait(driver.executeScript(JSstep.CheckSumsInContract).then(function (costs) {
        VD.IWant(VD.ToEqual, costs.sumPacking, costs.totalPacking, 'Не совпали суммы Packing');
        VD.IWant(VD.ToEqual, costs.sumServices, costs.totalServices, 'Не совпали суммы Services');
    }),config.timeout);
    LF.MakeSignInContract();
    LF.MakeSignInContract();
    MF.Contract_DeclarationValueA();
    LF.MakeSignInContract();
    SF.click(By.xpath('//input[@ng-value="crew.timer.start  || request.start_time1.value"]'));
    SF.waitForVisible (By.xpath('//li[contains(text(), "4:00 PM")]'));
    SF.click(By.xpath('//li[contains(text(), "4:00 PM")]'));
    SF.sleep(1);
    LF.MakeSignInContract();
    SF.sleep(2);
    SF.click(By.xpath('//input[@ng-value="crew.timer.stop || request.start_time2.value"]'));
    SF.sleep(1);
    SF.waitForVisible (By.xpath('//div[4]/ul/li[contains(text(), "7:00 PM")]'));
    SF.click(By.xpath('//div[4]/ul/li[contains(text(), "7:00 PM")]'));
    SF.sleep(1);
    LF.MakeSignInContract();
    SF.sleep(2);
    driver.wait(driver.findElement(By.xpath('//tr[@ng-repeat="crew in data.crews"]/td[4]')).getText().then(function(text){
        VD.IWant(VD.ToEqual, '3', text, 'Не совпали Crew hours');
    }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//tr[@ng-repeat="crew in data.crews"]/td[3]')).getText().then(function(text){
        V.RatePerHW = SF.cleanPrice(text);
    }),config.timeout);
    SF.sleep(1);
    V.crewTotal = (V.RatePerHW * 3);
    driver.wait(driver.findElement(By.xpath('//tr[@ng-repeat="crew in data.crews"]/td[5]')).getText().then(function(text){
        V.cleanCrewTotal = SF.cleanPrice(text);
        VD.IWant(VD.ToEqual, V.crewTotal, V.cleanCrewTotal, 'Не совпали Crew total price');
    }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//tr[@ng-hide="!travelTimeSetting && !isDoubleDriveTime"]/following-sibling::tr/td[2]')).getText().then(function(text){
        V.totalHW = text;
    }),config.timeout);
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
    LF.OpenRequestDispatch(V.accountNumbers.Id);
    MF.EditRequest_WaitForBalanceVisible();
    LF.RememberDigitsRequestBoard_Down(V.boardNumbers);
    MF.EditRequest_ScrollDown();
    VD.IWant(VD.ToEqual, V.boardNumbers.Balance, 0, 'Баланс после закрытия не равен 0');
    MF.EditRequest_OpenPayroll();
    V.managerName = 'emilia clark';
    SF.sleep (2);
    LF.RememberAndValidatePayroll_In_EditRequest(V.managerName, V.boardNumbers, V.contractNumbers);
    MF.EditRequest_PayrollOpenForemanTab();
    driver.wait(driver.findElement(By.xpath('//span[contains(text(),"$40.00")]/../../td[3]/input[@ng-model="foreman.for_commission"]')).getAttribute('value').then(function (text) {
        V.cleanTotalHW = SF.cleanPrice(text);
        VD.IWant(VD.ToEqual, V.totalHW, V.cleanTotalHW, 'Не совпали total hour на контракте и в малом пейроле');
    }),config.timeout);
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
    LF.findSaleInPayroll('emilia clark');
	MF.Payroll_getTotalById(V.boardNumbers.Id, V.payrollNumbers.Sale);
	VD.IWant(VD.ToEqual, V.payrollNumbers.Sale.Total, V.boardNumbers.Payroll.managerForCommission.total, 'не совпали цифры в Payroll manager\n' +
        'id=' + V.boardNumbers.Id);
    SF.sleep(2);
    // SF.click (By.xpath('//li[@ng-if="!vm.userRoleIs.foreman && vm.isDesktop && !vm.userRoleIs.home_estimator"]//div[@class="elromco-notifications"]'));
    // driver.wait(driver.findElement(By.xpath('//div[contains(text(),"'+V.client.name+'")]/' +
    //     'following-sibling::div[contains(text(),"User has viewed their account page")]')).getText().then(function(text){
    // }),config.timeout);
    // driver.wait(driver.findElement(By.xpath('//div[contains(text(),"'+V.client.name+'")]/' +
    //     'following-sibling::div[contains(text(),"User has viewed the confirmation page")]')).getText().then(function(text){
    // }),config.timeout);
    // driver.wait(driver.findElement(By.xpath('//div[contains(text(),"'+V.client.name+'")]/' +
    //     'following-sibling::div[contains(text(),"Request #'+V.accountNumbers.Id+' status was changed to  Confirmed")]')).getText().then(function(text){
    // }),config.timeout);
    // driver.wait(driver.findElement(By.xpath('//div[contains(text(),"'+V.client.name+'")]/' +
    //     'following-sibling::div[contains(text(),"Reservation received")]')).getText().then(function(text){
    // }),config.timeout);
    // SF.click (By.xpath('//button[@ng-click="checkAll()"]'));
    // SF.sleep(5);
    // SF.click (By.xpath('//button[@ng-click="openFilters = !openFilters"]'));
    // JS.waitForExist ('md-switch[ng-change=\\"turnAllNotifications()\\"]:visible');
    // SF.click (By.xpath('//md-switch[@ng-change="turnAllNotifications()"]'));
    // SF.sleep(1);
    // SF.click (By.xpath('//li[@ng-if="!vm.userRoleIs.foreman && vm.isDesktop && !vm.userRoleIs.home_estimator"]//div[@class="elromco-notifications"]'));
    SF.endOfTest();
};
