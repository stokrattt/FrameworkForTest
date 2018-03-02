module.exports = function main(SF, JS, MF, LF, JSstep, VD, V, By, until,FileDetector, system, condition, config,constants) {
    global.fiber = Fiber.current;
    V.client = {};
    V.client.name = SF.randomBukva(6) + '_t';
    V.client.fam = SF.randomBukva(6) + '_t';
    V.client.phone = SF.randomCifra(10);
    V.client.email = SF.randomBukvaSmall(6) + '@' + SF.randomBukvaSmall(4) + '.tes';
    V.client.passwd = 123;
    V.salesLogin = 'Emilia';
    V.salesPassword = '123';

    //=========================начинаем писать тест=============================
    SF.get(V.adminURL);
    LF.LoginToBoardAsCustom(V.adminLogin,V.adminPassword);

condition.nowWeDoing = 'запоминаем на дашборде кол-во конфермнутых работ по Move дата и Booked дата';
    MF.Board_OpenConfirmed();
    driver.wait(driver.findElement(By.xpath('//div[@ng-click="vm.select(2)"]//span[@ng-hide="vm.conf_filter == 2"]')).getText().then(function (text) {
        V.ConfBoard = SF.cleanPrice(text);
    }),config.timeout);
    SF.sleep(1);

condition.nowWeDoing = 'открываем статистику и проверяем там цифры';
    MF.Board_OpenStatistic ();
    MF.WaitWhileBusy();
    MF.WaitWhileBusy();
    driver.wait(driver.findElement(By.xpath('//div[@class="statistics-conversions"][3]')).getText().then(function(text) {
        V.Confirmedinperiod = SF.cleanPrice(text);
        VD.IWant(VD.ToEqual, V.Confirmedinperiod, V.ConfBoard,'не совпал Common stat и работы из дашборда');
    }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//statistic-table[@index="5"]//tr[@class="advanced-info-total"]/td[3]')).getText().then(function(text) {
        V.Source = SF.cleanPrice(text);
        VD.IWant(VD.ToEqual, V.Source, V.Confirmedinperiod,'не совпал  Source и Common stat');
    }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//statistic-table[@index="4"]//tr[@class="advanced-info-total"]/td[3]')).getText().then(function(text) {
        V.Size = SF.cleanPrice(text);
        VD.IWant(VD.ToEqual, V.Size, V.Confirmedinperiod,'не совпал Size of Move и Common stat');
    }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//statistic-table[@index="5"]//tr[@class="advanced-info-total"]/td[3]')).getText().then(function(text) {
        V.SerType = SF.cleanPrice(text);
        VD.IWant(VD.ToEqual, V.SerType, V.Confirmedinperiod,'не совпал Service Type и Common stat');
    }),config.timeout);

condition.nowWeDoing = 'запоминаем кол-во Amount и Booked, и ассаин за тудэй у сеилса Эмилия';
    driver.wait(driver.findElement(By.xpath('//tr[@ng-repeat="data in tableData track by $index"][2]//td[2]')).getText().then(function (text) {
        V.SalesAmount = SF.cleanPrice(text);
            }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//tr[@ng-repeat="data in tableData track by $index"][2]//td[3]')).getText().then(function (text) {
        V.SalesBooked = SF.cleanPrice(text);
            }),config.timeout);
    SF.sleep(1);
    SF.click(By.xpath('//statistic-table[@header="vm.HEADING_TABLES[0]"]//span[@class="switchery switchery-small"]'));
    MF.WaitWhileBusy ();
    SF.sleep(8);
    driver.wait(driver.findElement(By.xpath('//tr[@ng-repeat="data in tableData track by $index"]//td[contains(text(), "emilia clark")]/following-sibling::td[1]')).getText().then(function (text) {
        V.SalesAssignToday = SF.cleanPrice(text);
            }),config.timeout);

condition.nowWeDoing = 'запоминаем Estimate Income';
    SF.sleep(2);
    driver.wait(driver.findElement(By.xpath('//chart-statistic-tab[@ng-if="vm.halfYearProfit"]//p[@class="no-margins"]')).getText().then(function (text) {
        V.EstIncStat = SF.cleanPrice(text);
    }),config.timeout);
    SF.sleep(1);

condition.nowWeDoing = 'идем в профит анд лосс, сверяем Estimate Income';
    MF.Board_OpenProfitLoss ();
    driver.wait(driver.findElement(By.xpath('//div[@class="panel-body redBox"]/span[1]')).getText().then(function(text) {
        V.EstIncPrLos = SF.cleanPrice(text);
        VD.IWant(VD.ToEqual, V.EstIncPrLos, V.EstIncStat,'не совпал Estimate Income в профит анд лосс и статистике');
    }),config.timeout);
    MF.Board_LogoutAdmin();

condition.nowWeDoing = 'заходим за сеилса, в статистике сверяем кол-во забуканных и общее кол-во работ со страницей оунера';
    LF.LoginToBoardAsCustom(V.salesLogin, V.salesPassword);
    MF.Board_OpenStatistic ();
    MF.WaitWhileBusy();
    MF.WaitWhileBusy();
    driver.wait(driver.findElement(By.xpath('//chart-statistic-tab[@ng-if="vm.request_daily"]//p[@class="no-margins"]')).getText().then(function(text) {
        V.SalesBookedSalesPageTableAssignToday = SF.cleanPrice(text);
        VD.IWant(VD.ToEqual, V.SalesAssignToday, V.SalesBookedSalesPageTableAssignToday,'не совпало кол-во ассаинутых работ за Today с оунерпеидж и салеспеидж в верхней табличке Assign');
    }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//div[@class="col-lg-3"]//p[@class="no-margins margtop"]')).getText().then(function(text) {
        V.SalesAmountAsMainSales = SF.cleanPrice(text);
    }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//div[@class="col-lg-3"]//p[@ng-if="!!vm.secondConfirmedJobs"]')).getText().then(function(text) {
        V.SalesAmountAsAdditionalSales = SF.cleanPrice(text);
        }),config.timeout);
    SF.sleep(1);
    V.SalesCommonAmountSalesPage = V.SalesAmountAsMainSales + V.SalesAmountAsAdditionalSales;
    SF.sleep(1);
    VD.IWant(VD.ToEqual, V.SalesAmount, V.SalesCommonAmountSalesPage,'не совпало общее кол-во работ оунерпеидж/салеспеидж из коммон стата');
    driver.wait(driver.findElement(By.xpath('//div[@class="col-lg-3"]//p[@class="no-margins margtop"][2]')).getText().then(function(text) {
        V.SalesBookedSalesPageCommonStat = SF.cleanPrice(text);
        VD.IWant(VD.ToEqual,V.SalesBooked, V.SalesBookedSalesPageCommonStat,'не совпало общее кол-во забуканных работ оунерпеидж/салеспеидж из коммон стата');
    }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//chart-statistic-tab[@ng-if="vm.confirmed_monthly"]//p[@class="no-margins"]')).getText().then(function(text) {
        V.SalesBookedSalesPageTableBooked = SF.cleanPrice(text);
        VD.IWant(VD.ToEqual, V.SalesBookedSalesPageCommonStat, V.SalesBookedSalesPageTableBooked,'не совпало кол-во забуканных работ в коммон стате, и верхней табличке Booked');
    }),config.timeout);
    SF.sleep(1);

    SF.endOfTest();
};

