module.exports = function main(SF, JS, MF, LF, JSstep, VD, V, By, until,FileDetector, system, condition, config,constants) {
    global.fiber = Fiber.current;
    V.client = {};
    V.client.name = SF.randomBukva(6) + '_t';
    V.client.fam = SF.randomBukva(6) + '_t';
    V.client.phone = SF.randomCifra(10);
    V.client.email = SF.randomBukvaSmall(6) + '@' + SF.randomBukvaSmall(4) + '.tes';
    V.client.passwd = 123;

    //=========================начинаем писать тест=============================
condition.nowWeDoing = 'создаем флет рейт с верхней фронтовой формы';

    SF.get(V.frontURL);
    LF.FullSmallCalcAsFlateRate (V.client);

condition.nowWeDoing = 'перешли в аккаунт добавляем опции';
    MF.Account_ClickViewRequest();
    LF.AccountFlatRate_ChoosePickupAndDeliveryDate();
    SF.click(By.xpath('//div[contains(@class, "ng-pristine")]'));
    LF.AccountFR_SeelectOptions();

condition.nowWeDoing = 'добавляем инвенторий в акке';
    LF.AccountFlatRateAddInventory();
    MF.Account_SubmitFlatRateAfterAddInventory ();
	driver.wait(driver.findElement(By.xpath('//span[@ng-if="vm.request.field_useweighttype.value == \'2\' && vm.request.inventory_weight.cfs"]')).getText().then(function(text) {
		V.CBFinAccount = SF.cleanPrice(text);
	}),config.timeout);
    JS.scroll ('a[ng-click=\\"vm.Logout()\\"]');
    driver.wait(driver.findElement(By.xpath('//div[contains(text(),"Request ID")]/span')).getText().then(function (text) {
        V.FRId = SF.cleanPrice(text);
    }),config.timeout);
    SF.sleep(10);
    // LF.addToCleanerJob (V.FRId);
    LF.LogoutFromAccount ();
    SF.get(V.adminURL);

condition.nowWeDoing = 'пошли в админку, открыли реквест и заполняем опции';
    LF.LoginToBoardAsCustom(V.adminLogin,V.adminPassword);
    LF.OpenRequestFlatRate (V.FRId);
	MF.EditRequest_OpenRequest();
	JS.scroll('div[ng-show="!request.isInventory"]');
	driver.wait(driver.findElement(By.xpath('//div[@ng-show="!request.isInventory"]')).getText().then(function(text) {
		V.CBFinAdmin = SF.cleanPrice(text);
		VD.IWant(VD.ToEqual, V.CBFinAccount ,V.CBFinAdmin,'не совпал вес после добавления инвентаря в аккаунте и реквесте на мувборде');
	}),config.timeout);
	// JS.scroll('a[ng-click="select(tabs[6])"]');
    MF.EditRequest_OpenTabFlatRateOption();
    LF.FlatRateEditRequest_AddTwoOption();
    /*********************************************************************************************/
    MF.EditRequest_OpenClient ();
    LF.SetClientPasswd (V.client.passwd);
    LF.closeEditRequest ();
    MF.WaitWhileToaster();
    MF.Board_LogoutAdmin ();
    SF.get(V.accountURL);
    LF.LoginToAccountAsClient (V.client);
    
condition.nowWeDoing = 'идем в акк подтвердить выбранную опцию';
    MF.Account_OpenRequest (V.FRId);
    MF.Account_ChooseOptionFlatRate();
    LF.LogoutFromAccount ();
    SF.get(V.adminURL);
    LF.LoginToBoardAsCustom(V.adminLogin,V.adminPassword);

condition.nowWeDoing = 'идем в админку ставить нот конферм, трак....';
    MF.Board_OpenRequest (V.FRId);
    V.boardNumbers = {};
    LF.RememberDigitsRequestBoard (V.boardNumbers);
    SF.sleep (1);
    MF.EditRequest_SetAdressToFrom ();
    LF.FlatRateEditRequest_SendDeliveryDates();
    MF.EditRequest_SetDeliveryStartTime();
    SF.sleep (1);
    /**************************************************************************************************************/
    JS.step(JSstep.selectTruck((V.boardNumbers.LaborTimeMax + V.boardNumbers.TravelTime)/60));
    MF.WaitWhileBusy();
    VD.IWant (VD.ToEqual, 5000, V.boardNumbers.Total, 'тотал не совпал с выбранной суммой' );
    MF.EditRequest_SetToNotConfirmed ();
    SF.sleep (2);
    MF.EditRequest_SaveChanges ();
    V.boardNumbersDeliveryDate = {};
    driver.wait(driver.findElement(By.xpath('//input[@ng-click="openCalendar()"]')).getAttribute("value").then(function (dateString) {
        V.boardNumbersDeliveryDate.moveDate = {};
        V.boardNumbersDeliveryDate.moveDate.Month = SF.FindShortMonthInString(dateString);
        V.boardNumbersDeliveryDate.moveDate.Day = SF.cleanPrice(dateString.substring(0, dateString.indexOf(',')));
        V.boardNumbersDeliveryDate.moveDate.Year = SF.cleanPrice(dateString.substring(dateString.indexOf(',')));
    }),config.timeout);
    MF.EditRequest_OpenSettings ();
    SF.sleep(1);
    MF.EditRequest_SetSaleNumber(4);
    LF.closeEditRequest ();
    MF.WaitWhileToaster();
    MF.Board_LogoutAdmin ();
    SF.get(V.accountURL);

condition.nowWeDoing = 'идем в акк под клиентом букать работу';
    LF.LoginToAccountAsClient (V.client);
    MF.Account_OpenRequest (V.FRId);
    driver.wait(driver.findElement(By.xpath('//div[@ng-if="showQuote"]/div[contains(text(), "Flat Rate")]/following-sibling::div[1]/div/span')).getText().then(function (text) {
        V.quoteFlatRate = SF.cleanPrice (text);
        VD.IWant (VD.ToEqual, V.quoteFlatRate, 5000, 'не нашло цену флет рейт')
    }),config.timeout);
    LF.ConfirmRequestInAccount_WithReservation ();
	MF.Account_ClickViewConfirmationPage();
	JS.scroll('div[class="inventory row"]');
    driver.wait(driver.findElement(By.xpath('//div[@class="inventory row"]/h2/span/span[4]')).getText().then(function(text) {
		V.CBFinConfPage = SF.cleanPrice(text);
		VD.IWant(VD.ToEqual, V.CBFinConfPage ,V.CBFinAdmin,'не совпал вес на мувборде и на конфирмейшн пэйдж');
	}),config.timeout);
    LF.LogoutFromAccount ();
    SF.get (V.adminURL);
    LF.LoginToBoardAsCustom(V.adminLogin,V.adminPassword);

condition.nowWeDoing = 'идем в админку в диспач';
    MF.Board_OpenLocalDispatch ();
    LF.findDayInLocalDispatch (V.boardNumbers.moveDate.Year, V.boardNumbers.moveDate.Month, V.boardNumbers.moveDate.Day);
    MF.Dispatch_GridView();
    LF.SelectRequestDispatch(V.FRId);
    LF.selectCrewFlatRatePickUp(V.foremanName);
    LF.OpenRequestDispatch(V.FRId);
    MF.WaitWhileBusy ();
    SF.sleep(60); //почта на бэк перенесена и потому так долго отправляется письмо
    MF.EditRequest_OpenLogs();
    MF.EditRequest_Check1EmailExistForHelper (V.testHelper1email, V.testHelper2email, "New Job Helper");
    MF.EditRequest_Check1EmailExist(V.client.email, "Confirmed flat rate");
    MF.EditRequest_Check1EmailExist(V.adminEmail, "Request Confirmed");
    MF.EditRequest_Check1EmailExist(V.foremanEmail, "New Job");
    LF.closeEditRequest();
    MF.Board_LogoutAdmin ();
    LF.LoginToBoardAsCustomForeman(V.foremanLogin, V.foremanPassword);

condition.nowWeDoing = 'заходим под первым фореманом подписывать pick up контракт';
    LF.OpenRequestInForemanPage(V.FRId);
    MF.Contract_WaitConfirmationPage();
    MF.Contract_OpenBillOfLading ();
    driver.wait(driver.findElement(By.xpath('//td[@ng-init="grandTotal = totalFlatRateClosing()"]/following-sibling::td')).getText().then(function (text) {
        VD.IWant(VD.ToEqual, SF.cleanPrice(text), 5000, 'не показался полный тотал на флет рейт пикап на контракте');
    }),config.timeout);
    LF.MakeSignInContractFlatRate();
    LF.MakeSignInContractFlatRate();
    MF.Contract_DeclarationValueA();
    LF.MakeSignInContractFlatRate();
    MF.Contract_ClickPay();
    MF.Contract_ClickTips10();
    MF.Contract_ClickAddTips();
    MF.Contract_ClickPaymentInfo();
    LF.FillCardPayModal();
    LF.MakeSignJS('signatureCanvasPayment');
    SF.click(By.xpath('//div[@ng-init="payment.canvasInit(\'signatureCanvasPayment\')"]//button[@ng-click="saveSignature()"]'));
    JS.waitForExist('input#inputImage');
    driver.wait(new FileDetector().handleFile(driver, system.path.resolve('./files/squirrel.jpg')).then(function (path) {
        V.path = path;
    }), config.timeout);
    SF.sleep(1);
    MF.Contract_UploadImage(V.path);
    MF.Contract_UploadImage(V.path);
    MF.Contract_SaveImages();
    MF.WaitWhileBusy ();
    driver.wait(driver.findElement(By.xpath('//tr[@ng-if="contract_page.paymentTax.creditCharge.state"]/td[2]/span')).getText().then(function (text) {
        VD.IWant(VD.NotToEqual, SF.cleanPrice(text), 0, 'не посчитало процент от оплаты карточкой для флет рейт пикап контракта')
    }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//td[@ng-init="grandTotal = totalFlatRateClosing()"]/following-sibling::td')).getText().then(function (text) {
        V.pickupTotalCost = SF.cleanPrice(text);
    }),config.timeout);
    LF.MakeSignInContractFlatRate();
    LF.MakeSignInContractFlatRate();
    MF.WaitWhileBusy ();
    V.contractNumbersPickup = {};
    driver.wait(driver.executeScript('return $(\'tr[ng-if="contract_page.paymentTax.creditCharge.state"] span\').text()').then(function (text) {
        V.contractNumbersPickup.CreditCardPercentSumm = SF.cleanPrice(text);
    }),config.timeout);
    SF.click (By.xpath('//button[@ng-click="submitContractBtn({pickup: true, isBtn: true })"]'));
    SF.sleep(15);
    MF.WaitWhileBusy();
    MF.SweetConfirm ();
    MF.Contract_ReturnToForeman();
    LF.LogoutFromBoardForeman ();

condition.nowWeDoing = 'идем в диспач нзначить команду delivery';
    LF.LoginToBoardAsCustom(V.adminLogin,V.adminPassword);
    MF.Board_OpenLocalDispatch();
    LF.findDayInLocalDispatch(V.boardNumbersDeliveryDate.moveDate.Year, V.boardNumbersDeliveryDate.moveDate.Month, V.boardNumbersDeliveryDate.moveDate.Day);
    MF.Dispatch_GridView();
    LF.SelectRequestDispatch(V.FRId);
    MF.Dispach_ClickDeliveryCrewOnlyFlatRate();
    LF.selectCrewFlatRateDelivery();
    LF.OpenRequestDispatch(V.FRId);
    MF.WaitWhileBusy ();
    SF.sleep(60); //почта на бэк перенесена и потому так долго отправляется письмо
    MF.EditRequest_OpenLogs();
    MF.EditRequest_Check1EmailExist(V.foremanFlatRateEmail, "New Job");
    LF.closeEditRequest();
    MF.Board_LogoutAdmin ();

condition.nowWeDoing = 'заходим под вторым фореманом подписывать delivery контракт';
    LF.LoginToBoardAsForemanDeliveryFlatRate();
    LF.OpenRequestInForemanPage(V.FRId);
    MF.Contract_WaitConfirmationPage();
    MF.Contract_OpenBillOfLading ();
    driver.wait(driver.findElement(By.xpath('//td[@ng-init="grandTotal = totalFlatRateClosing()"]/following-sibling::td')).getText().then(function (text) {
        VD.IWant(VD.ToEqual, SF.cleanPrice(text), V.pickupTotalCost, 'не показался правильный тотал кост деливери на контракте, тоесть не совпал с тем что был на пикап контракте после оплаты пикап');
    }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//td[@ng-class="{\'red_total\': totalLessDeposit() }"]')).getText().then(function (text) {
        VD.IWant(VD.ToEqual, SF.cleanPrice(text), 2500, 'не правильный остаток до оплаты на деливери контракте, должен быть 2500');
    }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//tr[@ng-if="contract_page.paymentTax.creditCharge.state"]/td[2]/span')).getText().then(function (text) {
        VD.IWant(VD.NotToEqual, SF.cleanPrice(text), 0, 'не перенесло с пикап контракта процент от оплаты карточкой для флет рейт деливери контракта');
    }),config.timeout);
    MF.Contract_ClickPay();
    MF.Contract_ClickTips10();
    MF.Contract_ClickAddTips();
    MF.Contract_ClickPaymentInfo();
    LF.FillCardPayModal();
    LF.MakeSignJS('signatureCanvasPayment');
    SF.click(By.xpath('//div[@ng-init="payment.canvasInit(\'signatureCanvasPayment\')"]//button[@ng-click="saveSignature()"]'));
    JS.waitForExist('input#inputImage');
    SF.sleep(1);
    MF.Contract_UploadImage(V.path);
    MF.Contract_UploadImage(V.path);
    MF.Contract_SaveImages();
    MF.WaitWhileBusy ();
    driver.wait(driver.findElement(By.xpath('//td[@ng-init="grandTotal = totalFlatRateClosing()"]/following-sibling::td')).getText().then(function (text) {
        V.fullTotalCost = SF.cleanPrice(text);
    }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//tr[@ng-if="finance.tip && finance.tip !=0"]/td[2]')).getText().then(function (text) {
        VD.IWant(VD.NotToEqual, SF.cleanPrice(text), 0, 'не насчитало типсы для флет рейт деливери контракта');
    }),config.timeout);
    LF.MakeSignInContractFlatRate();
    LF.MakeSignInContractFlatRate();
    MF.WaitWhileBusy ();
    SF.click (By.xpath('//button[@ng-click="submitContractBtn({pickup: true, delivery: true, isBtn: true, lastPageSubmit: true})"]'));
    SF.sleep(15);
    MF.WaitWhileBusy ();
    MF.SweetConfirm ();
    MF.Contract_ReturnToForeman();
    LF.LogoutFromBoardForeman ();

condition.nowWeDoing = 'возвращаемся в диспач, проверяем что баланс 0, проверяем пейролл';
    LF.LoginToBoardAsCustom(V.adminLogin,V.adminPassword);
    MF.Board_OpenLocalDispatch();
    LF.findDayInLocalDispatch(V.boardNumbers.moveDate.Year, V.boardNumbers.moveDate.Month, V.boardNumbers.moveDate.Day);
    MF.Dispatch_GridView();
    MF.Dispatch_ShowDoneJobs();
    LF.OpenRequestDispatch(V.FRId);
    MF.EditRequest_WaitForBalanceVisible();
    LF.RememberDigitsRequestBoard_Down(V.boardNumbers);
    MF.EditRequest_ScrollDown();
    VD.IWant(VD.ToEqual, V.boardNumbers.Balance, 0, 'Баланс после закрытия не равен 0');
    VD.IWant(VD.ToEqual, V.fullTotalCost, V.boardNumbers.Payment, 'не совпал паймент в реквесте с тем что оплатили на двох контрактах');
    V.boardNumbersPickup = {};
    LF.RememberDigitsRequestBoard_Down(V.boardNumbersPickup);
    MF.EditRequest_OpenPayrollPickupFlatRate ();
    LF.RememberAndValidatePayroll_In_EditRequestFlatRatePickup(V.boardNumbersPickup, V.contractNumbersPickup);
    SF.sleep (2);
    MF.EditRequest_CloseModal();
    V.boardNumbersDelivery = {};
    LF.RememberDigitsRequestBoard_Down(V.boardNumbersDelivery);
    MF.EditRequest_OpenPayrollDeliveryFlatRate();
    LF.RememberAndValidatePayroll_In_EditRequestFlatRateDelivery(V.boardNumbersDelivery);
    SF.sleep (2);
    MF.EditRequest_CloseModal();
    LF.closeEditRequest();

condition.nowWeDoing = 'сейчас идём в пейролл и проверяем работy';
    MF.Board_OpenPayroll();
    LF.selectDateInPayroll(V.boardNumbers.moveDate);
    LF.findTestForemanInPayroll(V.foremanName);
    V.payrollNumbersPickup = {
        Foreman:{}, Sale:{}, Helper:{}
    };
	MF.Payroll_getTotalById(V.FRId, V.payrollNumbersPickup.Foreman);
	VD.IWant(VD.ToEqual, V.payrollNumbersPickup.Foreman.Total, V.boardNumbersPickup.Payroll.foremanForCommission.total, 'не совпали цифры Pickup в Payroll foreman\n' +
			'id=' + V.FRId);

condition.nowWeDoing = 'выбираем цифры helper pickup';
    MF.Payroll_ClickAllDepartment();
    LF.findHelperInPayroll('Test Helper1');
    MF.Payroll_getTotalById(V.FRId, V.payrollNumbersPickup.Helper);

    VD.IWant(VD.ToEqual, V.payrollNumbersPickup.Helper.Total, (V.boardNumbersPickup.Payroll.helpersForComission.total/2), 'не совпали цифры в Payroll pickup helper\n' +
        'id=' + V.FRId);
    MF.Payroll_ClickAllDepartment();

condition.nowWeDoing = 'проверяем цифры менеджера pickup';
    LF.findSaleInPayroll('JackSales donotdelete');
    MF.Payroll_getTotalById(V.FRId, V.payrollNumbersPickup.Sale);
    VD.IWant(VD.ToEqual, V.payrollNumbersPickup.Sale.Total, V.boardNumbersPickup.Payroll.managerForCommission.total, 'не совпали цифры в Payroll pickup manager\n' +
        'id=' + V.FRId);
    SF.sleep(2);

condition.nowWeDoing = 'начинаем проверять чувачком из delivery';
    MF.Payroll_ClickAllDepartment();
    LF.Payroll_SelectPeriod20Days();
    MF.WaitWhileBusy ();
    LF.findFlatRateDeliveryForemanInPayroll ();
    V.payrollNumbersDelivery = {
        Foreman:{}, Sale:{}, Helper:{}
    };
	MF.Payroll_getTotalById(V.FRId, V.payrollNumbersDelivery.Foreman);
	VD.IWant(VD.ToEqual, V.payrollNumbersDelivery.Foreman.Total, V.boardNumbersDelivery.Payroll.foremanForCommission.total, 'не совпали цифры delivery в Payroll foreman\n' +
		'id=' + V.FRId);

condition.nowWeDoing = 'выбираем цифры helper delivery';
    LF.Payroll_SetDeliveryDateOnlyFlatRate();
    LF.findHelperInPayroll('Test Helper1');
    MF.Payroll_getTotalById(V.FRId, V.payrollNumbersDelivery.Helper);
    VD.IWant(VD.ToEqual, V.payrollNumbersDelivery.Helper.Total, (V.boardNumbersDelivery.Payroll.helpersForComission.total/2), 'не совпали цифры в Payroll helper delivery\n' +
        'id=' + V.FRId);
    SF.sleep(1);


    //=========================закончили писать тест=============================
    SF.endOfTest();
};
