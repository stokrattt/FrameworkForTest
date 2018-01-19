module.exports = function main(SF, JS, MF, LF, JSstep, VD, V, By, until,FileDetector, system, condition, config,constants){
    global.fiber = Fiber.current;
    V.boardNumbers = {};
    V.client = {};
    V.client.name = SF.randomBukva(6) + '_t';
    V.client.fam = SF.randomBukva(6) + '_t';
    V.client.phone = SF.randomCifra(10);
    V.client.email = SF.randomBukvaSmall(6) + '@' + SF.randomBukvaSmall(4) + '.tes';
    V.NewPrice1 = 500;
    V.NewPrice2 = 5005;
    V.NewVolume = 999;
    V.NewHourlyTime = 20;
    V.NewHourlyRate = 10;
    V.NewHourlyRateLast = 3;
    V.NewHourlyTime2 = 5;

    SF.get(V.adminURL);
    LF.LoginToBoardAsCustom(V.adminLogin,V.adminPassword);

condition.nowWeDoing = 'создаем ЛД реквест с борда';
    LF.CreateLongDistanceFromBoard(V.client);
    V.boardNumbers = {};
    LF.RememberDigitsRequestBoard(V.boardNumbers);
    MF.EditRequest_SetAdressToFrom ();
    SF.click(By.xpath('//div[@class="delivery-days-inline delivery-days-inline_margin"]'));
    driver.wait(driver.executeScript(JSstep.Click4DaysCalendar).then(function (calDate) {
        V.request.moveDate = calDate;
    }),config.timeout);
    SF.sleep(1);
    JS.step(JSstep.selectTruck((V.boardNumbers.LaborTimeMax + V.boardNumbers.TravelTime)/60));
    MF.WaitWhileBusy();
    MF.EditRequest_ChangeStatusRequest (3);
    MF.EditRequest_SaveChanges();

condition.nowWeDoing = '1й раз меняем только цену в minimum c.f.';
    SF.click(By.xpath('//div[@ng-click="openMinWeight()"]'));
    SF.waitForVisible(By.xpath('//input[@ng-model="min_price"]'));
    SF.click(By.xpath('//div[@class="col-md-5 text-center"]//span[@class="switchery switchery-small"]'));
    SF.clear(By.xpath('//input[@ng-model="min_price"]'));
    SF.send(By.xpath('//input[@ng-model="min_price"]'), V.NewPrice1);
    SF.click(By.xpath('//button[@ng-click="Apply()"]'));
    driver.wait(driver.executeScript('return $(\'div.quote-cost:visible\').text()').then(function (text) {
        if (text.indexOf('$', text.indexOf('$') + 3) !== -1) {
        } else {
            V.boardNumbers.QuoteSales1 = SF.cleanPrice(text);
            console.log(V.boardNumbers.QuoteSales1);
        }
    }),config.timeout);
    SF.sleep (1);
    MF.EditRequest_CloseConfirmWork ();
    driver.wait(driver.executeScript('return $(\'div.quote-cost:visible\').text()').then(function (text) {
        if (text.indexOf('$', text.indexOf('$') + 3) !== -1) {
        } else {
            V.boardNumbers.QuoteClosing1 = SF.cleanPrice(text);
            console.log(V.boardNumbers.QuoteClosing1);
        }
    }),config.timeout);
    SF.sleep (1);
    VD.IWant (VD.ToEqual, V.boardNumbers.QuoteSales1, V.boardNumbers.QuoteClosing1, 'не совпала квота в сэилс и клоузинг первый раз');

condition.nowWeDoing = '2й раз меняем  цену и объем в minimum c.f.';
    MF.EditRequest_CloseConfirmWork();
    SF.click(By.xpath('//div[@ng-click="openMinWeight()"]'));
    SF.waitForVisible(By.xpath('//input[@ng-model="min_price"]'));
    SF.clear(By.xpath('//input[@ng-model="min_price"]'));
    SF.send(By.xpath('//input[@ng-model="min_price"]'), V.NewPrice2);
    SF.clear(By.xpath('//input[@ng-model="min_weight"]'));
    SF.send(By.xpath('//input[@ng-model="min_weight"]'), V.NewVolume);
    SF.click(By.xpath('//button[@ng-click="Apply()"]'));
    driver.wait(driver.executeScript('return $(\'div.quote-cost:visible\').text()').then(function (text) {
        if (text.indexOf('$', text.indexOf('$') + 3) !== -1) {
        } else {
            V.boardNumbers.QuoteSales2 = SF.cleanPrice(text);
            console.log(V.boardNumbers.QuoteSales2);
        }
    }),config.timeout);
    SF.sleep (1);
    MF.EditRequest_CloseConfirmWork ();
    driver.wait(driver.executeScript('return $(\'div.quote-cost:visible\').text()').then(function (text) {
        if (text.indexOf('$', text.indexOf('$') + 3) !== -1) {
        } else {
            V.boardNumbers.QuoteClosing2 = SF.cleanPrice(text);
            console.log(V.boardNumbers.QuoteClosing2);
        }
    }),config.timeout);
    SF.sleep (1);
    VD.IWant (VD.ToEqual, V.boardNumbers.QuoteSales2, V.boardNumbers.QuoteClosing2, 'не совпала квота в сэилс и клоузинг второй раз');
    LF.closeEditRequest();

condition.nowWeDoing = 'идем в локал диспач назначать команду. Выбираем хелпера,как драивера';
    MF.Board_OpenLocalDispatch();
    LF.findDayInLocalDispatch(V.boardNumbers.moveDate.Year, V.boardNumbers.moveDate.Month, V.boardNumbers.moveDate.Day);
    MF.Dispatch_GridView();
    LF.SelectRequestDispatch(V.boardNumbers.Id);
    V.foremanName = 'Test Foreman';
    SF.click(By.xpath("//select[@ng-model='vm.data.foreman']"));
    SF.click(By.xpath("//select[@ng-model='vm.data.foreman']/option[contains(text(),'"+V.foremanName+"')]"));
    SF.click(By.xpath("//label[contains(text(),'Helper No. 2')]/following-sibling::select[@ng-model='vm.data.baseCrew.helpers[$index]']"));
    SF.click(By.xpath("//label[contains(text(),'Helper No. 2')]/following-sibling::select[@ng-model='vm.data.baseCrew.helpers[$index]']//option[contains(text(),'test driver')]"));
    JS.scroll('a[ng-click=\"vm.assignTeam(request)\"]');
    SF.sleep(1);
    SF.click(By.xpath("//a[@ng-click=\"vm.assignTeam(request)\"]"));
    JS.waitForExist('div.toast-success');
    MF.WaitWhileToaster();
    LF.OpenRequestDispatch(V.boardNumbers.Id);
    MF.EditRequest_CloseJob();

condition.nowWeDoing = 'идем первый раз в маленький пеирол добаялем и назначаем комиссии драивера,как хелпера';
    MF.EditRequest_OpenPayroll();
    MF.EditRequest_PayrollOpenHelperTab();
    SF.click(By.xpath('//div[@id="invoice_content"]//button[@ng-click="addNewCommission(\'driver\', driverIndex, drivers.uid)"]'));
    SF.click(By.xpath('//tr[2]//select[@ng-model="driver.id"]/option[@value="4"]'));
    SF.click(By.xpath('//tr[2]//input[@ng-model="driver.for_commission"]'));
    SF.clear(By.xpath('//tr[2]//input[@ng-model="driver.for_commission"]'));
    SF.send(By.xpath('//tr[2]//input[@ng-model="driver.for_commission"]'),V.NewHourlyTime);
    SF.send(By.xpath('//input[@ng-model="driver.rate"]'),V.NewHourlyRate);
    MF.EditRequest_PayrollSubmit();
    MF.EditRequest_CloseModal();

condition.nowWeDoing = 'идем второй раз в маленький пеирол проверяем что комиссии драивера,как хелпера есть и соответсвуют';
    MF.EditRequest_OpenPayroll();
    MF.EditRequest_PayrollOpenHelperTab();
    driver.wait(driver.findElement(By.xpath('//input[@ng-model="driver.for_commission"]')).getAttribute('value').then(function(text){
        V.NewHourlyTime2 = SF.cleanPrice(text);
        VD.IWant(VD.ToEqual, V.NewHourlyTime2, V.NewHourlyTime, 'Time не совпадает');
    }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//input[@ng-model="driver.rate"]')).getAttribute('value').then(function(text){
        V.NewHourlyRate2 = SF.cleanPrice(text);
        VD.IWant(VD.ToEqual, V.NewHourlyRate2, V.NewHourlyRate, 'Rate не совпадает');
    }),config.timeout);
    condition.nowWeDoing = 'запоминаем тотал Rate';
    driver.wait(driver.findElement(By.xpath('//span[@ng-hide="disableRate(\'driver\', driverIndex,  driver.id)"]')).getText().then(function (text) {
        V.TotalRate1 = SF.cleanPrice(text);
        console.log(V.TotalRate1);
    }),config.timeout);
    SF.sleep(1);
    MF.EditRequest_CloseModal();
    LF.closeEditRequest();

condition.nowWeDoing = 'идем в большой пеирол, ищем драивера, сверяем Rate и Time 1й раз';
    MF.Board_OpenPayroll();
    LF.selectDateInPayroll(V.boardNumbers.moveDate);
    MF.Payroll_GoToWorkerJobs('driver');
    MF.Payroll_GoToWorkerJobs('test driver');
    SF.click(By.xpath('//td[contains(text(),"' +V.boardNumbers.Id+ '")]'));
    driver.wait(driver.findElement(By.xpath('//td[contains(text(),"'+V.boardNumbers.Id+'")]/../td[@ng-click="editRequest(\'ca_hours\', id, \'request\', dataObj.trip_job)"]')).getText().then(function(text){
        V.PayrollHourlyTime = SF.cleanPrice(text);
        VD.IWant(VD.ToEqual, V.PayrollHourlyTime, V.NewHourlyTime, 'в большом пеироле не совпал Time 1й раз');
    }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//td[contains(text(),"'+V.boardNumbers.Id+'")]/../td[@ng-click="editRequest(\'cb_hourly_rate\', id, \'request\', dataObj.trip_job)"]')).getText().then(function(text){
        V.PayrollHourlyRate = SF.cleanPrice(text);
        VD.IWant(VD.ToEqual, V.PayrollHourlyRate, V.TotalRate1, 'в большом пеироле не совпал Rate 1й раз');
    }),config.timeout);

condition.nowWeDoing = 'идем заново в маленький пеирол, и меняем цифры';
    SF.click(By.xpath('//td[contains(text(),"' +V.boardNumbers.Id+ '")]'));
    MF.EditRequest_OpenPayroll();
    MF.EditRequest_PayrollOpenHelperTab();
    SF.send(By.xpath('//input[@ng-model="driver.rate"]'),V.NewHourlyRateLast);
    driver.wait(driver.findElement(By.xpath('//span[@ng-hide="disableRate(\'driver\', driverIndex,  driver.id)"]')).getText().then(function (text) {
        V.TotalRateLast = SF.cleanPrice(text);
        console.log(V.TotalRateLast);
    }),config.timeout);
    SF.sleep(1);
    SF.clear(By.xpath('//tr[2]//input[@ng-model="driver.for_commission"]'));
    SF.send(By.xpath('//tr[2]//input[@ng-model="driver.for_commission"]'),V.NewHourlyTime2);
    SF.sleep(1);
    MF.EditRequest_PayrollSubmit();
    MF.EditRequest_CloseModal();
    LF.closeEditRequest();

condition.nowWeDoing = '2й раз в большом пеироле сверяем новые цифры и общий тотал';
    driver.wait(driver.findElement(By.xpath('//td[contains(text(),"'+V.boardNumbers.Id+'")]/../td[@ng-click="editRequest(\'cb_hourly_rate\', id, \'request\', dataObj.trip_job)"]')).getText().then(function(text){
        V.PayrollHourlyRate2 = SF.cleanPrice(text);
        VD.IWant(VD.ToEqual, V.PayrollHourlyRate2, V.TotalRateLast, 'Rate не совпадает после 2й смены в пеироле');
    }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//td[contains(text(),"'+V.boardNumbers.Id+'")]/../td[@ng-click="editRequest(\'ca_hours\', id, \'request\', dataObj.trip_job)"]')).getText().then(function(text){
        V.PayrollHourlyTime2 = SF.cleanPrice(text);
        VD.IWant(VD.ToEqual, V.PayrollHourlyTime2, V.NewHourlyTime2, 'Time не совпадает после 2й смены в пеироле');
    }),config.timeout);
    SF.sleep(2);

    SF.endOfTest();
};



