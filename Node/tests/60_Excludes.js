module.exports = function main(SF, JS, MF, LF, JSstep, VD, V, By, until,FileDetector, system, condition, config,constants) {
    global.fiber = Fiber.current;
    V.client = {};
    V.client.name = SF.randomBukva(6) + '_t';
    V.client.fam = SF.randomBukva(6) + '_t';
    V.client.phone = SF.randomCifra(10);
    V.client.email = SF.randomBukvaSmall(6) + '@' + SF.randomBukvaSmall(4) + '.tes';
    V.client.passwd = 123;

    //=========================начинаем писать тест=============================
    SF.get(V.adminURL);
    LF.LoginToBoardAsCustom(V.adminLogin,V.adminPassword);

condition.nowWeDoing = 'Создаем локал мув, добавляем пеккинги, аддишинал сервисы, валюейшн, конфермим его';
    LF.CreateLocalMovingFromBoard (V.client);
    MF.EditRequest_SetAdressToFrom ();
    MF.EditRequest_AddPacking ();
    // MF.EditRequest_AddAdditionalServicesFullPack ();
    MF.EditRequest_SetSizeOfMoveNumber (3);
    MF.EditRequest_AddValuation ();
    V.boardNumbers = {};
    LF.RememberDigitsRequestBoard (V.boardNumbers);
    JS.step(JSstep.selectTruck((V.boardNumbers.LaborTimeMax + V.boardNumbers.TravelTime)/60));
    MF.WaitWhileBusy();
    MF.EditRequest_SetToConfirmed ();
    MF.EditRequest_SaveChanges ();
    MF.EditRequest_OpenSettings ();
    LF.SetManager('SalesExclude');
    LF.closeEditRequest();

condition.nowWeDoing = 'идем в диспач назначать команду';
    MF.Board_OpenLocalDispatch();
    LF.findDayInLocalDispatch(V.boardNumbers.moveDate.Year, V.boardNumbers.moveDate.Month, V.boardNumbers.moveDate.Day);
    MF.WaitWhileBusy();
    MF.WaitWhileBusy();
    MF.Dispatch_GridView();
    LF.SelectRequestDispatch(V.boardNumbers.Id);
    V.foremanName = 'ForemanExclude Test';
    LF.selectCrew(V.foremanName);
    MF.Board_LogoutAdmin();

condition.nowWeDoing = 'заходим под фореманом и подписываем контракт';
    V.foremanExcludeLogin = 'ForemanExclude';
    V.foremanExcludePassword = 123;
    LF.LoginToBoardAsCustomForeman(V.foremanExcludeLogin, V.foremanExcludePassword);
    LF.OpenRequestDispatch(V.boardNumbers.Id);
    MF.Contract_WaitConfirmationPage();
    MF.Contract_OpenBillOfLading();
    SF.sleep(1);
    // driver.wait(driver.executeScript(JSstep.CheckSumsInContract).then(function (costs) {
    //     // VD.IWant(VD.ToEqual, costs.sumPacking, costs.totalPacking, 'Не совпали суммы Packing');
    //     VD.IWant(VD.ToEqual, costs.sumServices, costs.totalServices, 'Не совпали суммы Services');
    // }),config.timeout);
    // SF.sleep(2);

    JS.click('a[ng-click=\\"showAdditionalServicesRef.show = !showAdditionalServicesRef.show\\"]:visible');
    // JS.click('li[ng-click=\\"addService(s)\\"]:contains(\\"Tip\\")');

    SF.click(By.xpath('//div[@id="main-contract"]//li[@ng-click="addService(s)"][contains(text(), "Tip")]'));
    SF.sleep(3);
    // tr[@ng-repeat="service in additionalServices track by $index"]/td[3]/
    SF.clear(By.xpath('//div[@id="main-contract"]//input[@ng-model="service.extra_services[0].services_default_value"]'));
    SF.send(By.xpath('//div[@id="main-contract"]//tr[@ng-repeat="service in additionalServices track by $index"]/td[3]/input'), 200);

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
    SF.sleep(1);function HideFlyingCircle() {
		driver.wait(driver.executeScript("$('#FlyingCircle').css('display','none');"), config.timeout);
	}
	function ShowFlyingCircle() {
		driver.wait(driver.executeScript("$('#FlyingCircle').css('display','block');"), config.timeout);
	}
    MF.Contract_UploadImage(V.path);
    MF.Contract_UploadImage(V.path);
    MF.Contract_SaveImages();
    LF.MakeSignInContract();
    LF.MakeSignInContract();
    V.contractNumbers = {};
    MF.Contract_Submit(V.contractNumbers);
    MF.Contract_ReturnToForeman();
    LF.LogoutFromBoardForeman();

    LF.LoginToBoardAsCustom(V.adminLogin,V.adminPassword);
    MF.Board_OpenLocalDispatch();
    LF.findDayInLocalDispatch(V.boardNumbers.moveDate.Year, V.boardNumbers.moveDate.Month, V.boardNumbers.moveDate.Day);
    MF.WaitWhileBusy();
    MF.WaitWhileBusy();
    MF.Dispatch_GridView();
    MF.Dispatch_ShowDoneJobs();
    LF.OpenRequestDispatch(V.boardNumbers.Id);
    MF.EditRequest_WaitForBalanceVisible();
    LF.RememberDigitsRequestBoard_Down(V.boardNumbers);
    SF.sleep(1);
    MF.EditRequest_ScrollDown();
    VD.IWant(VD.ToEqual, V.boardNumbers.Balance, 0, 'Баланс после закрытия не равен 0');
    MF.EditRequest_OpenPayroll();
    SF.sleep (2);

condition.nowWeDoing = 'тут открываем пейрол в реквесте и начинаем всех проверять, первый сейлс';
    V.boardNumbers.Payroll = {
        managerForCommission: {},
        foremanForCommission: {},
        helpersForComission: []
    };
    SF.sleep(3);
    driver.wait(driver.executeScript('return $(\'input[ng-model="sale.for_commission "]\').val()').then(function (text) {
        V.boardNumbers.Payroll.managerForCommission.office = SF.cleanPrice(text);
    }),config.timeout);
    SF.sleep(1);
    VD.IWant(VD.ToEqual, Math.floor(V.boardNumbers.Payroll.managerForCommission.office),
        Math.floor(V.boardNumbers.Total
            - V.boardNumbers.Packing - V.boardNumbers.Fuel - V.boardNumbers.Tips - 200 - V.contractNumbers.CreditCardPercentSumm),
        'Не совпал ForCommission менеджера');
    driver.wait(driver.findElement(By.xpath('//label[@ng-init="calcWorkerTotal(\'salesPerson\')"]')).getText().then(function (text) {
        V.boardNumbers.Payroll.managerForCommission.total = SF.cleanPrice(text);
    }),config.timeout);
    SF.sleep(1);

condition.nowWeDoing = 'проверяем фореманан в пейроле в реквесте';
    SF.click(By.xpath('//li[@heading="Foreman"]/a'));
    driver.wait(driver.executeScript('return $(\'input[ng-model="foreman.for_commission"]\').val()').then(function (text) {
        V.boardNumbers.Payroll.foremanForCommission.office = SF.cleanPrice(text);
    }),config.timeout);
    SF.sleep(1);
    VD.IWant(VD.ToEqual, Math.floor(V.boardNumbers.Payroll.foremanForCommission.office),
        Math.floor(V.boardNumbers.Total
            - V.boardNumbers.Packing - V.boardNumbers.Fuel - V.boardNumbers.Tips - 200- V.contractNumbers.CreditCardPercentSumm),
        'Не совпал ForCommission foremana');
    driver.wait(driver.executeScript('return ' +
        '$(\'tr:has(td>select>option[selected="selected"]:contains("Tips"))>td>input[ng-model="foreman.for_commission"]\').val()'
    ).then(function (text) {
        V.boardNumbers.Payroll.foremanForCommission.Tips = SF.cleanPrice(text);
    }),config.timeout);
    SF.sleep(1);
    VD.IWant(VD.ToEqual, Math.floor(V.boardNumbers.Payroll.foremanForCommission.Tips),
        Math.floor(V.boardNumbers.Tips / V.boardNumbers.CrewSize),
        'Не совпал Tips формена');
    driver.wait(driver.executeScript('return ' +
        '$(\'tr:has(td>select>option[selected="selected"]:contains("Extras Commission"))>td>input[ng-model="foreman.for_commission"]\').val()'
    ).then(function (text) {
        V.boardNumbers.Payroll.foremanForCommission.AdServices = SF.cleanPrice(text);
    }),config.timeout);
    SF.sleep(1);
    VD.IWant(VD.ToEqual, Math.floor(V.boardNumbers.Payroll.foremanForCommission.AdServices),
        Math.floor(V.boardNumbers.AdServices),
        'Не совпал Extras формена');
    driver.wait(driver.executeScript('return ' +
        '$(\'tr:has(td>select>option[selected="selected"]:contains("Packing Commission"))>td>input[ng-model="foreman.for_commission"]\').val()'
    ).then(function (text) {
        V.boardNumbers.Payroll.foremanForCommission.Packing = SF.cleanPrice(text);
    }),config.timeout);
    SF.sleep(1);
    VD.IWant(VD.ToEqual, Math.floor(V.boardNumbers.Payroll.foremanForCommission.Packing),
        Math.floor(V.boardNumbers.Packing),
        'Не совпал Packing формена');
    driver.wait(driver.findElement(By.xpath('//label[@ng-init="calcWorkerTotal(\'foreman\')"]')).getText().then(function (text) {
        V.boardNumbers.Payroll.foremanForCommission.total = SF.cleanPrice(text);
    }),config.timeout);
    SF.sleep(1);

condition.nowWeDoing = 'проверяем хелпера в пейроле в реквесте';
    SF.click(By.xpath('//li[@heading="Helpers"]/a'));
    By.xpath('//div[@ng-repeat="helpers in helper track by $index"][1]//tr[@ng-repeat="helper in helpers.commissions track by $index"][1]/td[3]/input[@ng-model="helper.for_commission "]');
    driver.wait(driver.findElement(By.xpath('//div[@ng-repeat="helpers in helper track by $index"][1]' +
        '//tr[@ng-repeat="helper in helpers.commissions track by $index"][1]/td[3]/input[@ng-model="helper.for_commission"]')).getAttribute('value').then(function (text) {
        V.boardNumbers.Payroll.helpersForComission.office = SF.cleanPrice(text);
    }),config.timeout);
    SF.sleep(1);
    VD.IWant(VD.ToEqual, Math.floor(V.boardNumbers.Payroll.helpersForComission.office),
        Math.floor(V.boardNumbers.Total
            - V.boardNumbers.Fuel - V.boardNumbers.Tips - 200- V.contractNumbers.CreditCardPercentSumm),
        'Не совпал ForCommission хелпера');
    driver.wait(driver.executeScript('return ' +
        '$(\'tr:has(td>select>option[selected="selected"]:contains("Tips"))>td>input[ng-model="foreman.for_commission"]\').val()'
    ).then(function (text) {
        V.boardNumbers.Payroll.helpersForComission.Tips = SF.cleanPrice(text);
    }),config.timeout);
    SF.sleep(1);
    VD.IWant(VD.ToEqual, Math.floor(V.boardNumbers.Payroll.helpersForComission.Tips),
        Math.floor(V.boardNumbers.Tips / V.boardNumbers.CrewSize),
        'Не совпал Tips Helpera');
    SF.sleep(1);
    driver.wait(driver.findElement(By.xpath('//label[@ng-init="calcWorkerTotal(\'helper\'); calcWorkerTotal(\'foremanAsHelper\')"]')).getText().then(function (text) {
        V.boardNumbers.Payroll.helpersForComission.total = SF.cleanPrice(text);
    }),config.timeout);
    SF.sleep(1);

    MF.EditRequest_CloseModal();
    // MF.SweetConfirm ();
    LF.closeEditRequest();
    Debug.pause();

condition.nowWeDoing = 'сейчас идём в пейролл';

    SF.click(By.xpath("//a[@ui-sref=\"dispatch.payroll\"]"));
    MF.WaitWhileBusy();
    LF.selectDateInPayroll(V.boardNumbers.moveDate);
    LF.findTestForemanInPayroll(V.foremanName);

condition.nowWeDoing = 'выбираем цифры формена';
    V.payrollNumbers = {
        Foreman:{}, Sale:{}, Helper:{}
    };
	MF.Payroll_getTotalById(V.boardNumbers.Id, V.payrollNumbers.Foreman);
	VD.IWant(VD.ToEqual, V.payrollNumbers.Foreman.Total, V.boardNumbers.Payroll.foremanForCommission.total, 'не совпали цифры в Payroll foreman\n' +
		'id=' + V.boardNumbers.Id);
    MF.Payroll_ClickAllDepartment();
    MF.WaitWhileBusy();

condition.nowWeDoing = 'выбираем цифры менеджера';
    LF.findSaleInPayroll('SalesExclude');

    MF.Payroll_getTotalById(V.boardNumbers.Id, V.payrollNumbers.Sale);
    SF.sleep(1);
    VD.IWant(VD.ToEqual, V.payrollNumbers.Sale.Total, V.boardNumbers.Payroll.managerForCommission.total, 'не совпали цифры в Payroll manager\n' +
        'id=' + V.boardNumbers.Id);
    SF.sleep(1);

condition.nowWeDoing = 'выбираем цифры хелпера';
    MF.Payroll_ClickAllDepartment();
    MF.WaitWhileBusy();
    LF.findHelperInPayroll('Test Helper1');

    MF.Payroll_getTotalById(V.boardNumbers.Id, V.payrollNumbers.Helper);
    SF.sleep(1);

    VD.IWant(VD.ToEqual, V.payrollNumbers.Helper.Total, (V.boardNumbers.Payroll.helpersForComission.total/2), 'не совпали цифры в Payroll helper\n' +
        'id=' + V.boardNumbers.Id);
    SF.sleep(1);


    //=========================закончили писать тест=============================
    SF.endOfTest();
};
