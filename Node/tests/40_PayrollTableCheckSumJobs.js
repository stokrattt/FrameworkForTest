module.exports = function main(SF, JS, MF, LF, JSstep, VD, V, By, until,FileDetector, system, condition, config,constants) {
    global.fiber = Fiber.current;

    //=========================начинаем писать тест=============================
    SF.get(V.adminURL);
    LF.LoginToBoardAsCustom(V.adminLogin,V.adminPassword);

condition.nowWeDoing = 'идем в пейролл и віставляем дату в промежутке месяц';
    MF.Board_OpenPayroll ();
    let now = new Date();
    let msInDay = 86400000;
    let future = new Date(now.getTime() - msInDay *15);
    let options = { month: 'short', day: 'numeric', year: 'numeric' };
    V.payrollDateFrom = (future.toLocaleDateString('en-US', options));
     now = new Date();
     msInDay = 86400000;
     future = new Date(now.getTime() + msInDay *15);
     options = { month: 'short', day: 'numeric', year: 'numeric' };
    V.payrollDateTo = (future.toLocaleDateString('en-US', options));
    SF.clear(By.xpath('//input[@ng-model="dateRange.from"]'));
    SF.send(By.xpath('//input[@ng-model="dateRange.from"]'), V.payrollDateFrom);
    SF.clear(By.xpath('//input[@ng-model="dateRange.to"]'));
    SF.send(By.xpath('//input[@ng-model="dateRange.to"]'), V.payrollDateTo);
    SF.click(By.xpath('//button[@ng-click="getByDate();bDateChange=false"]'));
    SF.sleep(1);
    MF.WaitWhileBusy ();

condition.nowWeDoing = 'тут запускаем цикл на перебор всех категорий и всех юзеров';
    driver.wait(driver.executeScript("return $('tr[ng-repeat=\"(id, dataObj) in dataTbl track by $index\"]').length").then(function (depart) {
        V.department = depart;
    }), config.timeout);
    SF.sleep(1);
    for (let i = 1; i <= V.department; i++) {
        SF.click(By.xpath('//tr[@ng-repeat="(id, dataObj) in dataTbl track by $index"][' + i + ']'));
        SF.click(By.xpath('//tr[@ng-repeat="(id, dataObj) in dataTbl track by $index"][' + i + ']'));

        MF.WaitWhileBusy ();

condition.nowWeDoing = 'тут заходим в должность';
        SF.sleep (3);
        MF.WaitWhileBusy ();
        driver.wait(driver.executeScript("return $('tr[ng-repeat=\"(idUser, dataObj) in workersTbl\"]').length").then(function (worker) {
            V.worker = worker;
        }), config.timeout);
        SF.sleep(1);
        for (let m = 1; m <= V.worker; m++) {
            driver.wait(driver.findElement(By.xpath('(//tr[@ng-repeat="(idUser, dataObj) in workersTbl"])[' + m + ']/td[@ng-show="columns.fields[\'count_jobs\'].selected"]')).getText().then(function (text) {
                V.jobsUser = text;
            }), config.timeout);
            SF.sleep(0,5);
            driver.wait(driver.findElement(By.xpath('(//tr[@ng-repeat="(idUser, dataObj) in workersTbl"])[' + m + ']/td[@ng-show="columns.fields[\'paid\'].selected"]')).getText().then(function (paid) {
                V.paid = SF.cleanPrice (paid);
            }),config.timeout);
            SF.sleep(0,5);
            driver.wait(driver.findElement(By.xpath('(//tr[@ng-repeat="(idUser, dataObj) in workersTbl"])[' + m + ']/td[@ng-show="columns.fields[\'a_name\'].selected"]')).getText().then(function (text) {
                V.jobsName = text;
            }), config.timeout);
            SF.sleep(1);
            SF.click(By.xpath('//tr[@ng-click="selectUser(idUser, dataObj)"][' + m + ']'));
            SF.click(By.xpath('//tr[@ng-click="selectUser(idUser, dataObj)"][' + m + ']'));
            MF.WaitWhileBusy ();

condition.nowWeDoing = 'тут заходим в конкретного мужика и сравниваем циферки и запоминаем и смотрим';
            SF.sleep (3);
            MF.WaitWhileBusy ();
            driver.wait(driver.executeScript("return $('tr[ng-repeat=\"(id, dataObj) in userCurrentTbl.jobs\"]').length").then(function (jobs) {
                VD.IWant(VD.ToEqual, V.jobsUser, jobs, 'работы чувака не совпали снаружи и внутри "' + V.jobsName +'"')
            }),config.timeout);
            driver.wait(driver.executeScript("return $('div.total-payroll-panel div.total-title:contains(\"Paid\")').next().text()").then(function (paid) {
                paid = SF.cleanPrice(paid);
                VD.IWant (VD.ToEqual, V.paid, paid, 'не совпало пейд снаружи и внутри чувака "' + V.jobsName +'"');
            }), config.timeout);
            driver.wait(driver.executeScript("return $('div.total-payroll-panel div.total-title:contains(\"Balance\")').next().text()").then(function (balanceTop) {
                V.balanceTop = SF.cleanPrice(balanceTop);
            }), config.timeout);
            SF.sleep(1);
            driver.wait(driver.executeScript("return $('.mdDataTable-header-alternate td:last-child').text()").then(function (balanceDown) {
                V.balanceDown = SF.cleanPrice(balanceDown);
            }), config.timeout);
            SF.sleep(1);
            driver.wait(driver.executeScript(JSstep.payrollTableSum).then(function (summa) {
                VD.IWant(VD.ToEqual, summa.sum, summa.balTop, 'Не совпали сумма посчитанная в таблице с балансом сверху "' + V.jobsName +'"');
            }),config.timeout);
            VD.IWant(VD.ToEqual, V.balanceTop, V.balanceDown, 'сумма сврехру на балансе не совпала с суммой снизу ИТОГО  "' + V.jobsName +'"');
            MF.Payroll_ClickStepBackToNameWorker();
        }
        MF.Payroll_ClickStepBackToAllDepartments ();
    }

    //=========================закончили писать тест=============================
    SF.endOfTest();
};
