module.exports = function main(SF, JS, MF, LF, JSstep, VD, V, By, until,FileDetector, system, condition, config,constants) {    global.fiber = Fiber.current;
    V.client = {};
    V.client.name = SF.randomBukva(6) + '_t';
    V.client.fam = SF.randomBukva(6) + '_t';
    V.client.phone = SF.randomCifra(10);
    V.client.email = SF.randomBukvaSmall(6) + '@' + SF.randomBukvaSmall(4) + '.tes';
    V.client.passwd = 123;
    SF.get(V.frontURL);

condition.nowWeDoing = 'заполняем калькулятор верхний';
    LF.FullSmallCalcAsLocal(V.client);

condition.nowWeDoing = 'первый раз в аккаунте';
    MF.Account_ClickViewRequest();
    MF.Account_WaitForLoadingAccount();
    V.accountNumbers={};
    LF.RememberAccountNumbers(V.accountNumbers);
	driver.wait(driver.findElement(By.xpath('//span[@ng-if="vm.request.field_useweighttype.value == \'1\' && vm.request.total_weight.weight"]')).getText().then(function(text) {
		V.CBFinAccount = SF.cleanPrice(text);
	}),config.timeout);
    LF.LogoutFromAccount();

condition.nowWeDoing = 'первый раз в админке';
    SF.get(V.adminURL);
    LF.LoginToBoardAsCustom(V.adminLogin,V.adminPassword);
    MF.Board_OpenRequest(V.accountNumbers.Id);
	driver.wait(driver.findElement(By.xpath('//div[@ng-show="!request.isInventory"]')).getText().then(function(text) {
		V.CBFinAdmin = SF.cleanPrice(text);
		VD.IWant(VD.ToEqual, V.CBFinAccount ,V.CBFinAdmin,'не совпал вес инвентаря в аккаунте и реквесте на мувборде');
    }),config.timeout);
    V.boardNumbers = {};
    LF.RememberDigitsRequestBoard(V.boardNumbers);
    LF.Validation_Compare_Account_Admin(V.accountNumbers,V.boardNumbers);

condition.nowWeDoing = 'тут выключаем кальк и меняем количество крю и проверяем пересчитывается ли квота';
    MF.EditRequest_SwitchCalculator();
    MF.EditRequest_ChangeCrew(5);
    driver.wait(driver.findElements(By.xpath('//input[@ng-model="request.rate.value"]')).then(function(elements){
        if (elements.length>0) {
            elements[0].getAttribute('value').then(function (value) {
                V.boardNumbers.HourlyRateCalcOff = SF.cleanPrice(value);
            });
        } else {
            V.boardNumbers.HourlyRateCalcOff = 0;
        }
    }),config.timeout);
    SF.sleep(1);
    V.QuoteCalcOff = V.boardNumbers.HourlyRateCalcOff * 5;
    driver.wait(driver.executeScript('return $(\'div.quote-cost:visible\').text()').then(function (text) {
        if (text.indexOf('$', text.indexOf('$') + 3) !== -1) {
            V.boardNumbers.QuoteMinCalcOff = SF.cleanPrice(text.substring(text.indexOf('$'), text.indexOf('-')));
            V.boardNumbers.QuoteMaxCalcOff = SF.cleanPrice(text.substring(text.indexOf('$', text.indexOf('$') + 3)));
        } else {
            V.boardNumbers.QuoteCalcOff = SF.cleanPrice(text);
        }
    }),config.timeout);
    SF.sleep(1);
    VD.IWant(VD.ToEqual, V.QuoteCalcOff, V.boardNumbers.QuoteMaxCalcOff, 'при выключенном калькуляторе и смене крю не пересчитало квоту');

condition.nowWeDoing = 'тут включаем кальк и тест пошел дальше и проверяем что при выклю кальк все стало как и было раньше';
    MF.EditRequest_SwitchCalculator();
    SF.sleep(4);
    V.boardNumbers = {};
    LF.RememberDigitsRequestBoard(V.boardNumbers);
    LF.Validation_Compare_Account_Admin(V.accountNumbers,V.boardNumbers);

condition.nowWeDoing = 'идём в логи';
    MF.EditRequest_OpenLogs();
    V.logNumbers={};
    MF.EditRequest_ExpandPendingEmail(V.client.email);
    driver.wait(driver.findElement(By.xpath('//span[@aria-hidden="false"]//h3[contains(text(),"Estimated Quote")]/../../../../../../' +
        'following-sibling::td[1]//div/div/div')).getText().then(function(text){
            V.logNumbers.QuoteMin=SF.cleanPrice(text.substring(0,text.indexOf('-')));
            V.logNumbers.QuoteMax=SF.cleanPrice(text.substring(text.indexOf('-')+1));
            VD.IWant(VD.ToEqual, V.logNumbers.QuoteMin, V.boardNumbers.TotalMin);
            VD.IWant(VD.ToEqual, V.logNumbers.QuoteMax, V.boardNumbers.TotalMax);
    }),config.timeout);
    MF.EditRequest_OpenRequest ();
    JS.step(JSstep.selectTruck((V.boardNumbers.LaborTimeMax + V.boardNumbers.TravelTime)/60));
    MF.WaitWhileBusy();
    // LF.addToCleanerJob(V.accountNumbers.Id);
    MF.EditRequest_SetToConfirmed ();
    MF.EditRequest_SetAdressToFrom ();
    MF.EditRequest_SaveChanges ();
    MF.EditRequest_OpenSettings();
    MF.EditRequest_SetSaleNumber(2);
    MF.EditRequest_OpenRequest();

condition.nowWeDoing = 'закрываем работу и переходим в на страницу bill of lading';
    MF.EditRequest_CloseConfirmWork();
    MF.EditRequest_SetLaborTimeCloseJob('01:00');
    MF.EditRequest_CloseJob();
    MF.EditRequest_OpenContractCloseJob();
    SF.openTab (1);
    SF.sleep (3);
    MF.SweetConfirm();
    MF.Contract_OpenBillOfLading();
    MF.Contract_WaitBillOfLading ();
    driver.wait(driver.findElement(By.xpath('//button[@ng-if="data.isSubmitted"]')).getText().then(function(text) {
        VD.IWant (VD.ToEqual, text, 'Job is Done', 'страница бил оф ладинг не загрузилась')
    }),config.timeout);
    driver.close();
    SF.openTab(0);
    LF.closeEditRequest();
    MF.Board_OpenLocalDispatch();
    LF.findDayInLocalDispatch(V.boardNumbers.moveDate.Year, V.boardNumbers.moveDate.Month, V.boardNumbers.moveDate.Day);
    MF.Dispatch_GridView();
    MF.Dispatch_ShowDoneJobs();
    LF.SelectRequestDispatch(V.accountNumbers.Id);
    LF.selectCrew(V.foremanName);
    LF.OpenRequestDispatch(V.accountNumbers.Id);
    MF.EditRequest_OpenLogs ();
    SF.click(By.xpath('//span[@ng-bind-html="toTrustedHTML(item.text)"][contains(text(),"Send TO Foreman")]/../../../following-sibling::div[1]'));
    SF.sleep(2);
    SF.click(By.xpath('//a[contains(text(), "Auto login for Foreman")]'));
    SF.sleep (3);
    MF.WaitWhileBusy();
    MF.Contract_OpenBillOfLading();
    MF.Contract_WaitBillOfLading ();
    driver.wait(driver.findElement(By.xpath('//button[@ng-if="data.isSubmitted"]')).getText().then(function(text) {
        VD.IWant (VD.ToEqual, text, 'Job is Done', 'страница бил оф ладинг не загрузилась через автологин форемана (автологин не сработал)')
    }),config.timeout);
    SF.sleep(1);

    SF.endOfTest();
};

