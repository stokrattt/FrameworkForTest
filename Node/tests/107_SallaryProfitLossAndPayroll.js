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

condition.nowWeDoing = 'идем в пейрол выставляем нужные даты и запоминаем paid, потом идем в профит лосс выставляем те же даты и сравниваем салари профит лос и пейрола';
    LF.LoginToBoardAsCustom(V.adminLogin,V.adminPassword);
    MF.Board_OpenPayroll ();
    LF.Payroll_SelectPeriod20Days();
    driver.wait(driver.executeScript(JSstep.payrollTableMainPage('hours_pay', 'Paid')).then(function (summa) {
        VD.IWant(VD.ToEqual, (summa.sum), summa.balTop, 'All Departments: сумма Paid снизу не совпадает с суммой Paid сверху');
        V.paidPayroll = summa.balTop;
    }),config.timeout);
    MF.Board_OpenSideBar();
    MF.Board_OpenStatistic ();
    MF.Board_OpenProfitLoss ();
    LF.ProfitAndLoss_SelectPeriod20Days();
    driver.wait(driver.findElement(By.xpath('//tr[@ng-click="openSalary()"]/td[1]')).getText().then(function (text) {
        VD.IWant(VD.ToEqual, V.paidPayroll, SF.cleanPrice(text), 'не совпала сумма paid в пейроле за 20 дней с суммой salllary in profit and loss');
    }),config.timeout);
    SF.sleep(2);


    //=========================закончили писать тест=============================
    SF.endOfTest();
};
