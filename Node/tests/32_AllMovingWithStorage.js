module.exports = function main(SF, JS, MF, LF, JSstep, VD, V, By, until,FileDetector, system, condition, config,constants) {
    global.fiber = Fiber.current;

    //=========================начинаем писать тест=============================
    V.client = {};
    V.client.name = SF.randomBukva(6) + '_t';
    V.client.fam = SF.randomBukva(6) + '_t';
    V.client.phone = SF.randomCifra(10);
    V.client.email = SF.randomBukvaSmall(6) + '@' + SF.randomBukvaSmall(4) + '.tes';
    V.client.passwd = 123;
    V.managerName = 'emilia clark';

condition.nowWeDoing = 'заполняем верхнюю форму как MovingWithStorage';

    SF.get(V.frontURL);
    LF.FullSmallCalcAsMovingWithStorage(V.client);

condition.nowWeDoing = 'зашли первый раз в аккаунт';
    MF.Account_ClickViewRequest();
    LF.AccountToStorageEnterAddress();
    LF.AccountLocalAddInventory();
    SF.sleep(3);
    LF.AccountLocalDetails();
    MF.Account_WaitForInventoryCheck();
	driver.wait(driver.findElement(By.xpath('//span[@ng-if="vm.request.field_useweighttype.value == \'2\' && vm.request.inventory_weight.cfs"]')).getText().then(function(text) {
		V.CBFinAccount = SF.cleanPrice(text);
	}),config.timeout);
    MF.Account_WaitForDetailsCheck();
    SF.sleep(2);
    V.accountNumbersTo = {};
    LF.RememberAccountNumbers(V.accountNumbersTo);
    // LF.addToCleanerJob(V.accountNumbersTo.Id);

condition.nowWeDoing = 'запомнили цифры ToStorage идём на From';
    MF.Account_ClickFromStorage();
    SF.sleep(5);
    LF.AccountFromStorageEnterAddress();
    SF.sleep(8);
    V.accountNumbersFrom = {};
    MF.WaitWhileBusy();
    LF.RememberAccountNumbers(V.accountNumbersFrom);
    // LF.addToCleanerJob(V.accountNumbersFrom.Id);
    LF.LogoutFromAccount();

condition.nowWeDoing = 'Зайти на админку, найти реквест To storage, выставить трак, проверить, запомнить и сравнить все цифры с аккаунтом, выставить sales, дать клиенту пароль, поставить Not Confirmed, сохранить.';
    SF.get(V.adminURL);
    LF.LoginToBoardAsCustom(V.adminLogin,V.adminPassword);
    MF.Board_OpenRequest(V.accountNumbersTo.Id);
    V.boardNumbersTo = {};
    LF.RememberDigitsRequestBoard(V.boardNumbersTo);
	JS.scroll('div[ng-show="!request.isInventory"]');
	driver.wait(driver.findElement(By.xpath('//div[@ng-show="!request.isInventory"]')).getText().then(function(text) {
		V.CBFinAdmin = SF.cleanPrice(text);
		VD.IWant(VD.ToEqual, V.CBFinAccount ,V.CBFinAdmin,'не совпал вес после добавления инвентаря в аккаунте и реквесте на мувборде');
	}),config.timeout);
    JS.step(JSstep.selectTruck((V.boardNumbersTo.LaborTimeMax + V.boardNumbersTo.TravelTime) / 60));
    MF.WaitWhileBusy();
    JS.scroll('div.ServicesCost:visible');
    LF.Validation_Compare_Account_Admin(V.accountNumbersTo, V.boardNumbersTo);
    MF.EditRequest_OpenSettings();
    LF.SetManager('emilia');
    MF.EditRequest_OpenClient();
    LF.SetClientPasswd(V.client.passwd);
    MF.EditRequest_OpenLogs();
    MF.EditRequest_Check1EmailExist(V.client.email, "Thank you for submitting a quote.");
    MF.EditRequest_Check1EmailExist(V.client.email, "How To Work With Your New Account.");
    MF.EditRequest_Check1EmailExist(V.client.email, "Request Moving and Storage Quote (Pending Status)");
    MF.EditRequest_Check1EmailExist(V.adminEmail, "New Request Notification");
    MF.EditRequest_OpenRequest();
    MF.EditRequest_SetToNotConfirmed();
    MF.EditRequest_SaveChanges();
    MF.EditRequest_OpenLogs();
    MF.EditRequest_Check1EmailExist(V.client.email, "Change status to Not Confirmed");
    LF.closeEditRequest();
    MF.Board_OpenRequest(V.accountNumbersFrom.Id);
    V.boardNumbersFrom = {};
    LF.RememberDigitsRequestBoard(V.boardNumbersFrom);
    JS.step(JSstep.selectTruck((V.boardNumbersFrom.LaborTimeMax + V.boardNumbersFrom.TravelTime) / 60));
    MF.WaitWhileBusy();
    MF.EditRequest_ScrollDown();
    LF.Validation_Compare_Account_Admin(V.accountNumbersFrom, V.boardNumbersFrom);
    MF.EditRequest_OpenSettings();
    LF.SetManager('emilia');
    MF.EditRequest_OpenClient();
    LF.SetClientPasswd(V.client.passwd);
    MF.EditRequest_OpenRequest();
    MF.EditRequest_SetToNotConfirmed();
    MF.EditRequest_SaveChanges();
    LF.closeEditRequest();
    MF.Board_LogoutAdmin();

condition.nowWeDoing = 'Зайти в аккаунт и подтвердить первый реквест. Можно ещё раз сравнить все цифры с админкой';
    SF.get(V.accountURL);
    LF.LoginToAccountAsClient(V.client);
    MF.Account_CheckRequestStatus_NotConfirmed(V.accountNumbersTo.Id);
    MF.Account_OpenRequest(V.accountNumbersTo.Id);
    V.accountNumbersTo = {};
    LF.RememberAccountNumbers(V.accountNumbersTo);
    LF.Validation_Compare_Account_Admin(V.accountNumbersTo, V.boardNumbersTo);
    LF.ConfirmRequestInAccount_WithReservation();
    MF.Account_WaitForGreenTextAfterConfirm();
	MF.Account_ClickViewConfirmationPage();
	JS.scroll('div[class="inventory row"]');
	driver.wait(driver.findElement(By.xpath('//div[@class="inventory row"]/h2/span/span[4]')).getText().then(function(text) {
		V.CBFinConfPage = SF.cleanPrice(text);
		VD.IWant(VD.ToEqual, V.CBFinConfPage ,V.CBFinAccount,'не совпал вес на первом реквсете( ту сторадж) и на конфирмейшн пэйдж');
	}),config.timeout);
	LF.LogoutFromAccount();

condition.nowWeDoing = 'Зайти в аккаунт и подтвердить второй реквест. Можно ещё раз сравнить все цифры с админкой';
    LF.LoginToAccountAsClient(V.client);
    MF.Account_CheckRequestStatus_NotConfirmed(V.accountNumbersFrom.Id);
    MF.Account_OpenRequest(V.accountNumbersFrom.Id);
	driver.wait(driver.findElement(By.xpath('//span[@ng-if="vm.request.field_useweighttype.value == \'2\' && vm.request.inventory_weight.cfs"]')).getText().then(function(text) {
		V.CBFinAccountFromStorage = SF.cleanPrice(text);
		VD.IWant(VD.ToEqual, V.CBFinAccount ,V.CBFinAccountFromStorage,'не совпал вес в аккаунте на первом реквесте ( ту сторадж) ' +
            'и на втором (фром сторадж)');
	}),config.timeout);
    V.accountNumbersFrom = {};
    LF.RememberAccountNumbers(V.accountNumbersFrom);
    LF.Validation_Compare_Account_Admin(V.accountNumbersFrom, V.boardNumbersFrom);
    LF.ConfirmRequestInAccount_WithReservation();
    SF.waitForVisible(By.xpath('//div[contains(text(),"Your move is confirmed and scheduled")]'));
	MF.Account_ClickViewConfirmationPage();
	JS.scroll('div[class="inventory row"]');
	driver.wait(driver.findElement(By.xpath('//div[@class="inventory row"]/h2/span/span[4]')).getText().then(function(text) {
		V.CBFinConfPage = SF.cleanPrice(text);
		VD.IWant(VD.ToEqual, V.CBFinConfPage ,V.CBFinAccountFromStorage,'не совпал вес на втором реквесте аккаунте( фром сторадж) и на конфирмейшн пэйдж');
	}),config.timeout);
    LF.LogoutFromAccount();

condition.nowWeDoing = 'Зайти в local Dispatch, найти первый реквест, назначить команду и отправить работу.';
    SF.get(V.adminURL);
    LF.LoginToBoardAsCustom(V.adminLogin,V.adminPassword);
    MF.Board_OpenLocalDispatch();
    LF.findDayInLocalDispatch(V.boardNumbersTo.moveDate.Year, V.boardNumbersTo.moveDate.Month, V.boardNumbersTo.moveDate.Day);
    MF.Dispatch_GridView();
    LF.SelectRequestDispatch(V.accountNumbersTo.Id);
    LF.selectCrew(V.foremanName);
    LF.OpenRequestDispatch(V.accountNumbersTo.Id);
    SF.sleep(60); //почта на бэк перенесена и потому так долго отправляется письмо
    MF.EditRequest_OpenLogs();
    MF.EditRequest_Check1EmailExist(V.client.email, "Request Moving With Storage Quote (Confirmed)");
    MF.EditRequest_Check1EmailExist(V.adminEmail, "Request Confirmed");
    MF.EditRequest_Check1EmailExist(V.foremanEmail, "New Job");
    LF.closeEditRequest();
    MF.Board_LogoutAdmin();

condition.nowWeDoing = 'Зайти под форменом, найти первую работу, зайти в Inventory, добавить состояния предметов, запомнить их';
    LF.LoginToBoardAsCustomForeman(V.foremanLogin, V.foremanPassword);
    LF.OpenRequestInForemanPage(V.accountNumbersTo.Id);
    MF.Contract_WaitConfirmationPage();
    MF.Contract_OpenInventory();
    LF.Contract_AddInventory(13);
    MF.Contract_SetTapeNumber(1);
    MF.Contract_SetTapeColorGreen('Green');
    LF.MakeSignInInventory(0);
    LF.MakeSignInInventory(1);
    MF.Contract_SubmitInventory();
    MF.SweetCancel();
    MF.WaitWhileBusy();
    MF.Contract_WaitForRental();
    MF.Contract_SetRentalPhone(V.client.phone);
    MF.Contract_SetRentalAddress('Address To');
    MF.Contract_SetRentalZip('02461');
    LF.MakeSignInRental();
    MF.SweetConfirm ();
    MF.WaitWhileBusy();
    LF.payRentalInventory();
    JS.waitForExist('input#inputImage');
    driver.wait(new FileDetector().handleFile(driver, system.path.resolve('./files/squirrel.jpg')).then(function (path) {
        V.path = path;
    }), config.timeout);
    SF.sleep(1);
    MF.Contract_UploadImage(V.path);
    MF.Contract_UploadImage(V.path);
    MF.Contract_SaveImages();

condition.nowWeDoing = 'закончили с инвентарём, подписываем первый контракт';
    driver.wait(driver.executeScript(JSstep.CheckSumsInContract).then(function (costs) {
        VD.IWant(VD.ToEqual, costs.sumPacking, (costs.totalPacking).toFixed(2), 'Не совпали суммы Packing');
        // VD.IWant(VD.ToEqual, costs.sumServices, costs.totalServices, 'Не совпали суммы Services');
    }), config.timeout);
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
    V.contractNumbersTo = {};
    MF.Contract_Submit(V.contractNumbersTo);
    MF.Contract_ReturnToForeman();
    LF.LogoutFromBoardForeman();

    //*****************************************второй реквест******************************************

condition.nowWeDoing = 'From storage, выставить трак, проверить, запомнить и сравнить все цифры с аккаунтом, выставить sales, дать клиенту пароль, поставить Not Confirmed, сохранить.';
    SF.get(V.adminURL);
    LF.LoginToBoardAsCustom(V.adminLogin,V.adminPassword);
    MF.Board_OpenRequest(V.accountNumbersFrom.Id);
    LF.RememberDigitsRequestBoard(V.boardNumbersFrom);
    MF.EditRequest_SetToConfirmed();
    MF.EditRequest_SaveChanges();
    LF.closeEditRequest();
    MF.Board_LogoutAdmin();

condition.nowWeDoing = 'Найти второй реквест, назначить команду и отправить работу.';
    SF.get(V.adminURL);
    LF.LoginToBoardAsCustom(V.adminLogin,V.adminPassword);
    MF.Board_OpenLocalDispatch();
    LF.findDayInLocalDispatch(V.boardNumbersFrom.moveDate.Year, V.boardNumbersFrom.moveDate.Month, V.boardNumbersFrom.moveDate.Day);
    MF.Dispatch_GridView();
    LF.SelectRequestDispatch(V.accountNumbersFrom.Id);
    LF.selectCrew(V.foremanName);
    MF.Board_LogoutAdmin();

condition.nowWeDoing = 'Найти вторую работу у формена, зайти в Inventory, подтвердить состояния предметов, запомнить их';
    LF.LoginToBoardAsCustomForeman(V.foremanLogin, V.foremanPassword);
    LF.OpenRequestInForemanPage(V.accountNumbersFrom.Id);
    MF.Contract_WaitConfirmationPage();
    MF.Contract_OpenInventory();

condition.nowWeDoing = 'валидация инвентаря на контракте from storage';

    driver.wait(driver.executeScript("return $('tr[ng-repeat=\"n in rangeArr\"] button span').text()").then(function (text) {
        VD.IWant(VD.ToEqual, text, ' Sofa, With Bed  Sofa, With Bed  Sofa, Recliner  Sofa, Recliner  Sofa, Chaise  Sofa, 4 Seat  Sofa, 4 Seat  Sofa, 3 Seat  Sofa, 3 Seat  Sofa, 2pcs Sectional  Loveseat  Futon  Futon                         ',
            'не нашло инвенторий на контракте от первого реквеста to storage '+V.accountNumbersTo.Id+'');
    }),config.timeout);
    driver.wait(driver.executeScript("return $('div[ng-if=\"data[fieldName].signatures[stepId]\"] img').length").then(function (chislo) {
        VD.IWant(VD.ToEqual, chislo, '2',  'не нашло подписи для инвентаря на контракте от первого реквеста to storage '+V.accountNumbersTo.Id+'');
    }),config.timeout);
    LF.Contract_SubmitInventoryDelivery(13);
    SF.sleep(1);
    LF.MakeSignInInventory(2);
    LF.MakeSignInInventory(3);
    MF.Contract_SubmitInventory();
    MF.SweetConfirm();

condition.nowWeDoing = 'закончили с инвентарём, подписываем второй контракт';
    MF.Contract_WaitBillOfLading();
    driver.wait(driver.executeScript(JSstep.CheckSumsInContract).then(function (costs) {
        VD.IWant(VD.ToEqual, costs.sumPacking, (costs.totalPacking).toFixed(2), 'Не совпали суммы Packing');
        // VD.IWant(VD.ToEqual, costs.sumServices, costs.totalServices, 'Не совпали суммы Services');
    }),config.timeout);
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
    V.contractNumbersFrom = {};
    MF.Contract_Submit(V.contractNumbersFrom);
    MF.Contract_ReturnToForeman();
    LF.LogoutFromBoardForeman();

condition.nowWeDoing="Вернуться в localDispatch, найти первый реквест, проверить и запомнить Payroll";
    LF.LoginToBoardAsCustom(V.adminLogin,V.adminPassword);
    MF.Board_OpenLocalDispatch();
    LF.findDayInLocalDispatch(V.boardNumbersTo.moveDate.Year, V.boardNumbersTo.moveDate.Month, V.boardNumbersTo.moveDate.Day);
    MF.Dispatch_GridView();
    MF.Dispatch_ShowDoneJobs();
    LF.OpenRequestDispatch(V.accountNumbersTo.Id);
    MF.EditRequest_WaitForBalanceVisible();
    LF.RememberDigitsRequestBoard_Down(V.boardNumbersTo);
    MF.EditRequest_ScrollDown();
    VD.IWant(VD.ToEqual, V.boardNumbersTo.Balance, 0, 'Баланс после закрытия не равен 0');
    MF.EditRequest_OpenPayroll();
    LF.RememberAndValidatePayroll_In_EditRequest(V.managerName, V.boardNumbersTo, V.contractNumbersTo);
    SF.click(By.xpath('//div[@class="modal-footer"]/button[@ng-click="cancel()"]'));
    SF.sleep(2);
    // MF.SweetConfirm();
    LF.closeEditRequest();

condition.nowWeDoing="найти второй реквест, проверить и запомнить Payroll";
    MF.Dispatch_WaitForCalendar();
    LF.findDayInLocalDispatch(V.boardNumbersFrom.moveDate.Year, V.boardNumbersFrom.moveDate.Month, V.boardNumbersFrom.moveDate.Day);
    MF.Dispatch_GridView();
    MF.Dispatch_ShowDoneJobs();
    LF.OpenRequestDispatch(V.accountNumbersFrom.Id);
    MF.EditRequest_WaitForBalanceVisible();
    LF.RememberDigitsRequestBoard_Down(V.boardNumbersFrom);
    MF.EditRequest_ScrollDown();
    VD.IWant(VD.ToEqual, V.boardNumbersFrom.Balance, 0, 'Баланс после закрытия не равен 0');
    MF.EditRequest_OpenPayroll();
    LF.RememberAndValidatePayroll_In_EditRequest(V.managerName, V.boardNumbersFrom, V.contractNumbersFrom);
    MF.EditRequest_CloseModal();
    LF.closeEditRequest();

condition.nowWeDoing = 'сейчас идём в пейролл и проверяем первую работы';
    MF.Board_OpenPayroll();
    LF.selectDateInPayroll(V.boardNumbersTo.moveDate);
    LF.findTestForemanInPayroll(V.foremanName);
    V.payrollNumbersTo = {
        Foreman:{}, Sale:{}
    };
	MF.Payroll_getTotalById(V.accountNumbersTo.Id, V.payrollNumbersTo.Foreman);
	VD.IWant(VD.ToEqual, V.payrollNumbersTo.Foreman.Total, V.boardNumbersTo.Payroll.foremanForCommission.total, 'не совпали цифры ToStorage в Payroll foreman\n' +
		'id=' + V.accountNumbersTo.Id);
    LF.selectDateInPayroll(V.boardNumbersFrom.moveDate);
    V.payrollNumbersFrom = {
        Foreman:{}, Sale:{}
    };
	MF.Payroll_getTotalById(V.accountNumbersFrom.Id, V.payrollNumbersFrom.Foreman);
	VD.IWant(VD.ToEqual, V.payrollNumbersFrom.Foreman.Total, V.boardNumbersFrom.Payroll.foremanForCommission.total, 'не совпали цифры ToStorage в Payroll foreman\n' +
		'id=' + V.accountNumbersFrom.Id);
    MF.Payroll_ClickAllDepartment();

condition.nowWeDoing = 'выбираем цифры менеджера';
    LF.findSaleInPayroll('emilia clark');
    LF.selectDateInPayroll(V.boardNumbersTo.moveDate);
	MF.Payroll_getTotalById(V.accountNumbersTo.Id, V.payrollNumbersTo.Sale);
	VD.IWant(VD.ToEqual, V.payrollNumbersTo.Sale.Total, V.boardNumbersTo.Payroll.managerForCommission.total, 'не совпали цифры в Payroll manager\n' +
		'id=' + V.accountNumbersTo.Id);
    LF.selectDateInPayroll(V.accountNumbersFrom.moveDate);
	MF.Payroll_getTotalById(V.boardNumbersFrom.Id, V.payrollNumbersFrom.Sale);
    VD.IWant(VD.ToEqual, V.payrollNumbersFrom.Sale.Total, V.boardNumbersFrom.Payroll.managerForCommission.total, 'не совпали цифры в Payroll manager\n' +
        'id=' + V.accountNumbersFrom.Id);
    SF.sleep(1);

    //=========================закончили писать тест=============================
    SF.endOfTest();
};
