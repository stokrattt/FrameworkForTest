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
    condition.nowWeDoing = 'запоминаем на дашборде кол-во конфермнутых работ';
    MF.Board_OpenConfirmed();
    MF.WaitWhileBusy();
    driver.wait(driver.findElement(By.xpath('//div[@ng-click="vm.select(2)"]//span[@ng-hide="vm.conf_filter == 2"]')).getText().then(function (text) {
        V.ConfBoard = SF.cleanPrice(text);
    }),config.timeout);
    SF.sleep(2);
    condition.nowWeDoing = 'открываем статистику и проверяем там цифры, запоминаем Estimate Income';
    MF.Board_OpenStatistic ();
    MF.WaitWhileBusy();
    MF.WaitWhileBusy();
    driver.wait(driver.findElement(By.xpath('//div[@class="statistics-conversions"][3]')).getText().then(function(text) {
        V.Confirmedinperiod = SF.cleanPrice(text);
        VD.IWant(VD.ToEqual, V.Confirmedinperiod, V.ConfBoard,'не совпал Common stat и работы из дашборда');
    }),config.timeout);
    SF.sleep(2);
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
    SF.sleep(2);
    driver.wait(driver.findElement(By.xpath('//chart-statistic-tab[@ng-if="vm.halfYearProfit"]//p[@class="no-margins"]')).getText().then(function (text) {
        V.EstIncStat = SF.cleanPrice(text);
    }),config.timeout);
    SF.sleep(3);
    condition.nowWeDoing = 'идем в профит анд лосс, сверяем Estimate Income';
    MF.Board_OpenProfitLoss ();
    MF.WaitWhileBusy();
    MF.WaitWhileBusy();
    driver.wait(driver.findElement(By.xpath('//div[@class="panel-body redBox"]/span[1]')).getText().then(function(text) {
        V.EstIncPrLos = SF.cleanPrice(text);
        VD.IWant(VD.ToEqual, V.EstIncPrLos, V.EstIncStat,'не совпал Estimate Income в профит анд лосс и статистике');
    }),config.timeout);
    SF.sleep(2);


    SF.endOfTest();
};

