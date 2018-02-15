module.exports = function main(SF, JS, MF, LF, JSstep, VD, V, By, until,FileDetector, system, condition, config,constants) {
    global.fiber = Fiber.current;
    V.client = {};
    V.client.name = SF.randomBukva(6) + '_t';
    V.client.fam = SF.randomBukva(6) + '_t';
    V.client.phone = SF.randomCifra(10);
    V.client.email = SF.randomBukvaSmall(6) + '@' + SF.randomBukvaSmall(4) + '.tes';
    V.client.passwd = 123;

    SF.get(V.adminURL);
    LF.LoginToBoardAsCustom(V.adminLogin,V.adminPassword);

condition.nowWeDoing = 'идем в пейролл и ставим дату в промежутке 20 дней';
    MF.Board_OpenPayroll ();
    LF.Payroll_SelectPeriod20Days();

condition.nowWeDoing = 'сравниваем все суммы снизу с суммами сверху';
    driver.wait(driver.executeScript(JSstep.payrollTableMainPage('jobs_count', 'Jobs')).then(function (summa) {
        VD.IWant(VD.ToEqual, (summa.sum), summa.balTop, 'All Departments: сумма Jobs снизу не совпадает с суммой Jobs сверху');
    }),config.timeout);
    driver.wait(driver.executeScript(JSstep.payrollTableMainPage('hours', 'Hours')).then(function (summa) {
        VD.IWant(VD.ToEqual, (summa.sum), summa.balTop, 'All Departments: сумма Hours снизу не совпадает с суммой Hours сверху');
    }),config.timeout);
    driver.wait(driver.executeScript(JSstep.payrollTableMainPage('materials', 'Packing')).then(function (summa) {
        VD.IWant(VD.ToEqual, (summa.sum), summa.balTop, 'All Departments: сумма Packing снизу не совпадает с суммой Packing сверху');
    }),config.timeout);
    driver.wait(driver.executeScript(JSstep.payrollTableMainPage('m_extra', 'Extra')).then(function (summa) {
        VD.IWant(VD.ToEqual, (summa.sum), summa.balTop, 'All Departments: сумма Extra снизу не совпадает с суммой Extra сверху');
    }),config.timeout);
    driver.wait(driver.executeScript(JSstep.payrollTableMainPage('total', 'Total')).then(function (summa) {
        VD.IWant(VD.ToEqual, (summa.sum), summa.balTop, 'All Departments: сумма Total снизу не совпадает с суммой Total сверху');
    }),config.timeout);
    driver.wait(driver.executeScript(JSstep.payrollTableMainPage('hours_pay', 'Paid')).then(function (summa) {
        VD.IWant(VD.ToEqual, (summa.sum), summa.balTop, 'All Departments: сумма Paid снизу не совпадает с суммой Paid сверху');
    }),config.timeout);
condition.nowWeDoing = 'тут запускаем цикл на перебор всех категорий';
    driver.wait(driver.executeScript("return $('tr[ng-repeat=\"(id, dataObj) in dataTbl track by $index\"]').length").then(function (depart) {
        V.department = depart;
    }), config.timeout);
    SF.sleep(1);
    for (let i = 1; i <= V.department; i++) {
        driver.wait(driver.findElement(By.xpath('(//tr[@ng-repeat="(id, dataObj) in dataTbl track by $index"])[' + i + ']/td[@ng-show="columns.fields[\'department\'].selected"]')).getText().then(function (text) {
            V.departmentName = text;
        }), config.timeout);
        SF.click(By.xpath('//tr[@ng-repeat="(id, dataObj) in dataTbl track by $index"][' + i + ']'));
        SF.click(By.xpath('//tr[@ng-repeat="(id, dataObj) in dataTbl track by $index"][' + i + ']'));
        MF.WaitWhileBusy ();
condition.nowWeDoing = 'тут заходим в каждую должность и сравниваем те же данные';
        MF.WaitWhileBusy ();
        driver.wait(driver.executeScript(JSstep.payrollTableMainPage('count_jobs', 'Jobs')).then(function (summa) {
            VD.IWant(VD.ToEqual, summa.sum, summa.balTop, 'В должности ' + V.departmentName + ': сумма Jobs снизу не совпадает с суммой Jobs сверху');
        }),config.timeout);
        driver.wait(driver.executeScript(JSstep.payrollTableMainPage('hours', 'Hours')).then(function (summa) {
            VD.IWant(VD.ToEqual, summa.sum, summa.balTop, 'В должности ' + V.departmentName + ': сумма Hours снизу не совпадает с суммой Hours сверху');
        }),config.timeout);
        driver.wait(driver.executeScript(JSstep.payrollTableMainPage('materials', 'Packing')).then(function (summa) {
            VD.IWant(VD.ToEqual, summa.sum, summa.balTop, 'В должности ' + V.departmentName + ': сумма Packing снизу не совпадает с суммой Packing сверху');
        }),config.timeout);
        driver.wait(driver.executeScript(JSstep.payrollTableMainPage('hours_pay', 'Hours Pay')).then(function (summa) {
            VD.IWant(VD.ToEqual, summa.sum, summa.balTop, 'В должности ' + V.departmentName + ': сумма Hours Pay снизу не совпадает с суммой Hours Pay сверху');
        }),config.timeout);
        driver.wait(driver.executeScript(JSstep.payrollTableMainPage('m_extra', 'Extra')).then(function (summa) {
            VD.IWant(VD.ToEqual, summa.sum, summa.balTop, 'В должности ' + V.departmentName + ': сумма Extra снизу не совпадает с суммой Extra сверху');
        }),config.timeout);
        driver.wait(driver.executeScript(JSstep.payrollTableMainPage('total', 'Total')).then(function (summa) {
            VD.IWant(VD.ToEqual, summa.sum, summa.balTop, 'В должности ' + V.departmentName + ': сумма Total снизу не совпадает с суммой Total сверху');
        }),config.timeout);
        driver.wait(driver.executeScript(JSstep.payrollTableMainPage('paid', 'Paid')).then(function (summa) {
            VD.IWant(VD.ToEqual, summa.sum, summa.balTop, 'В должности ' + V.departmentName + ': сумма Paid снизу не совпадает с суммой Paid сверху');
        }),config.timeout);
        SF.sleep(1);
        MF.Payroll_ClickStepBackToAllDepartments ();
    }

    SF.endOfTest();
};