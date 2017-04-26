module.exports = function main(SF, JS, JSstep, VD, V, By, until,FileDetector, system, condition, LF,config,constants){
    global.fiber = Fiber.current;

    //=========================начинаем писать тест=============================
    SF.get(V.adminURL);
    LF.LoginToBoardAsAdmin();
    SF.click (By.xpath('//button[@ng-click="toggleLeft()"]'));
    SF.click (By.xpath('//a[@ng-click="vm.goToPage(\'dispatch.local\', \'\')"]'));
    SF.sleep(1);
    SF.click (By.xpath('//a[@ui-sref="dispatch.payroll"]'));
    JS.waitForNotExist('div.busyoverlay:visible');
    let now = new Date();
    let msInDay = 86400000;
    let future = new Date(now.getTime() - msInDay *25);
    let options = { month: 'short', day: 'numeric', year: 'numeric' };
    V.payrollDateFrom = (future.toLocaleDateString('en-US', options));
    console.log( V.payrollDateFrom);
     now = new Date();
     msInDay = 86400000;
     future = new Date(now.getTime() + msInDay *25);
     options = { month: 'short', day: 'numeric', year: 'numeric' };
    V.payrollDateTo = (future.toLocaleDateString('en-US', options));
    console.log( V.payrollDateTo);
    SF.clear(By.xpath('//input[@ng-model="dateRange.from"]'));
    SF.send(By.xpath('//input[@ng-model="dateRange.from"]'), V.payrollDateFrom);
    SF.clear(By.xpath('//input[@ng-model="dateRange.to"]'));
    SF.send(By.xpath('//input[@ng-model="dateRange.to"]'), V.payrollDateTo);
    SF.click(By.xpath('//button[@ng-click="getByDate();bDateChange=false"]'));
    SF.sleep(1);
    JS.waitForNotExist('div.busyoverlay:visible');

    driver.wait(driver.executeScript("return $('tr[ng-repeat=\"(id, dataObj) in dataTbl track by $index\"]').length").then(function (depart) {
        V.department = depart;
        console.log(V.department)
    }),config.timeout);
    for (let i=0; i<V.department; i++){
        SF.click(By.xpath('//tr[@ng-repeat="(id, dataObj) in dataTbl track by $index"][' + i + ']'));
        SF.click(By.xpath('//tr[@ng-repeat="(id, dataObj) in dataTbl track by $index"][' + i + ']'));

        //driver.wait(driver.executeScript("$('tr[ng-repeat=\"(id, dataObj) in dataTbl track by $index\"]:eq('+i+')').click();"),config.timeout);
        //driver.wait(driver.executeScript("$('tr[ng-repeat=\"(id, dataObj) in dataTbl track by $index\"]:eq('+i+')').click();"),config.timeout);

        JS.waitForNotExist('div.busyoverlay:visible');
        driver.wait(driver.executeScript("return $('tr[ng-repeat=\"(idUser, dataObj) in workersTbl\"]').length").then(function (worker) {
            V.worker = worker;
        }),config.timeout);
        for (let m=0; m<V.worker; m++) {
               // driver.wait(driver.findElement(By.xpath('//td[@ng-show="columns.fields[\'count_jobs\'].selected"]')).getText().then(function (text) {
               //     V.jobsDriver = text;
               //     console.log(text);
              //  }),config.timeout);
            SF.click(By.xpath('//tr[@ng-click="selectUser(idUser, dataObj)"][' + m + ']'));
            SF.click(By.xpath('//tr[@ng-click="selectUser(idUser, dataObj)"][' + m + ']'));
                //driver.wait(driver.executeScript("$('tr[ng-click=\"selectUser(idUser, dataObj)\"]:eq('+m+')').dblclick();"),config.timeout);
                JS.waitForNotExist('div.busyoverlay:visible');
               // for (let q=0; q<driver.executeScript("$('tr[ng-repeat=\"(idUser, dataObj) in workersTbl\"]').length"); q++) {

                 //   driver.wait(driver.executeScript("return $('tr[ng-repeat=\"(id, dataObj) in userCurrentTbl.jobs\"]').length").then(function (jobs) {
                //        VD.IWant(VD.VToEqual, V.jobsDriver, jobs, 'работы чувака не совпали внутри и снаружи')
                //    }), config.timeout);
                    driver.wait(driver.executeScript("return $('div.total-payroll-panel div.total-title:contains(\"Balance\")').next().text()").then(function (balanceTop) {
                        V.balanceTop = SF.cleanPrice(balanceTop);
                        console.log(balanceTop);
                    }), config.timeout);
                    driver.wait(driver.executeScript("return $('.mdDataTable-header-alternate td:last-child').text()").then(function (balanceDown) {
                        V.balanceDown = SF.cleanPrice(balanceDown);
                        console.log(balanceDown);
                    }), config.timeout);
                    VD.IWant(VD.VToEqual, V.balanceTop, V.balanceDown, 'сумма сврехру на балансе не совпала с суммой снизу ИТОГО');
                    JS.click('a[ng-click=\\"dTable=\'workers\';employee=\'\'\\"]:visible');
                    JS.waitForNotExist('div.busyoverlay:visible');
               // }
            //JS.click('a[ng-click=\\"dTable=\'departments\';employee=\'\'\\"]:visible');
            //JS.waitForNotExist('div.busyoverlay:visible');
        }
        JS.click('a[ng-click=\\"dTable=\'departments\';employee=\'\'\\"]:visible');
        JS.waitForNotExist('div.busyoverlay:visible');
    }


    Debug.pause();

    //=========================закончили писать тест=============================
    SF.endOfTest();
};
