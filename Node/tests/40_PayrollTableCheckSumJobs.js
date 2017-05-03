module.exports = function main(SF, JS, MF, LF, JSstep, VD, V, By, until,FileDetector, system, condition, config,constants) {
    global.fiber = Fiber.current;

    //=========================начинаем писать тест=============================
    SF.get(V.adminURL);
    LF.LoginToBoardAsAdmin();
condition.nowWeDoing = 'идем в пейролл и віставляем дату в промежутке месяц';
    SF.click (By.xpath('//button[@ng-click="toggleLeft()"]'));
    SF.click (By.xpath('//a[@ng-click="vm.goToPage(\'dispatch.local\', \'\')"]'));
    SF.sleep(1);
    SF.click (By.xpath('//a[@ui-sref="dispatch.payroll"]'));
    JS.waitForNotExist('div.busyoverlay:visible');
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
    JS.waitForNotExist('div.busyoverlay:visible');
condition.nowWeDoing = 'тут запускаем цикл на перебор всех категорий и всех юзеров';
    driver.wait(driver.executeScript("return $('tr[ng-repeat=\"(id, dataObj) in dataTbl track by $index\"]').length").then(function (depart) {
        V.department = depart;
    }), config.timeout);
    SF.sleep(1);
    for (let i = 1; i <= V.department; i++) {
        SF.click(By.xpath('//tr[@ng-repeat="(id, dataObj) in dataTbl track by $index"][' + i + ']'));
        SF.click(By.xpath('//tr[@ng-repeat="(id, dataObj) in dataTbl track by $index"][' + i + ']'));

        JS.waitForNotExist('div.busyoverlay:visible');

condition.nowWeDoing = 'тут заходим в должность';
        SF.sleep (3);
        JS.waitForNotExist('div.busyoverlay:visible');
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
            JS.waitForNotExist('div.busyoverlay:visible');

condition.nowWeDoing = 'тут заходим в конкретного мужика и сравниваем циферки и запоминаем и смотрим';
            SF.sleep (3);
            JS.waitForNotExist('div.busyoverlay:visible');
            driver.wait(driver.executeScript("return $('div[class=\"dataTables_info\"]').text()").then(function (jobs) {
                let t = jobs.substring(jobs.indexOf('of'), jobs.indexOf(' ent', jobs.indexOf(' ent')));
                let numberjobs = t.replace('of ', '');
                console.log(numberjobs);
                VD.IWant(VD.VToEqual, V.jobsUser, numberjobs, 'работы чувака не совпали снаружи и внутри "' + V.jobsName +'"')
            }),config.timeout);
            SF.sleep(1);
            driver.wait(driver.executeScript("return $('div.total-payroll-panel div.total-title:contains(\"Paid\")').next().text()").then(function (paid) {
                paid = SF.cleanPrice(paid);
                VD.IWant (VD.VToEqual, V.paid, paid, 'не совпало пейд снаружи и внутри чувака "' + V.jobsName +'"');
            }), config.timeout);
            SF.sleep(1);
            driver.wait(driver.executeScript("return $('div.total-payroll-panel div.total-title:contains(\"Balance\")').next().text()").then(function (balanceTop) {
                V.balanceTop = SF.cleanPrice(balanceTop);
            }), config.timeout);
            SF.sleep(1);
            driver.wait(driver.executeScript("return $('.mdDataTable-header-alternate td:last-child').text()").then(function (balanceDown) {
                V.balanceDown = SF.cleanPrice(balanceDown);
            }), config.timeout);
            SF.sleep(1);
            VD.IWant(VD.VToEqual, V.balanceTop, V.balanceDown, 'сумма сврехру на балансе не совпала с суммой снизу ИТОГО  "' + V.jobsName +'"');
           // driver.wait(driver.executeScript(JSstep.payrollTableSum));
            JS.click('a[ng-click=\\"dTable=\'workers\';employee=\'\'\\"]:visible');
            JS.waitForNotExist('div.busyoverlay:visible');

        }
        JS.click('a[ng-click=\\"dTable=\'departments\';employee=\'\'\\"]:visible');
        JS.waitForNotExist('div.busyoverlay:visible');
    }

    //=========================закончили писать тест=============================
    SF.endOfTest();
};
