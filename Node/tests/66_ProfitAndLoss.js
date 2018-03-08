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
    MF.Board_OpenStatistic ();
    MF.Board_OpenProfitLoss ();
    MF.Board_OpenSideBar ();

condition.nowWeDoing = 'Заходим в профит и лосс и удаляем все експенсе которые там есть';
    driver.wait(driver.executeScript("return $('tr[ng-click=\"openExpense(expense)\"]').length").then(function (expense) {
        V.expense = expense;
    }),config.timeout);
    SF.sleep(1);
    if (V.expense != 0) {
        for (let i = 0; i < V.expense; i++) {
            SF.click(By.xpath('//tr[@ng-click="openExpense(expense)"]//span[@ng-click="removeExpense(expense)"]/i'));
            MF.SweetConfirm();
            MF.WaitWhileBusy();
        }
    }
    SF.sleep(1);
    driver.wait(driver.findElement(By.xpath('//div[@class="panel-body blueBox"]/span[1]')).getText().then(function (text) {
        V.sumExpenseClean = SF.cleanPrice (text);
    }),config.timeout);
    SF.sleep(1);

condition.nowWeDoing = 'теперь добавляем все возможные експенсе, добавляем нотес и проверяем что сумма сверху в итого увеличилась ровно настолько, сколько добавлили';
    MF.ProfitLoss_AddExpense (500, 'Trucks', 'Notes Trucks');
    MF.ProfitLoss_AddExpense (500, 'Salary', 'Notes Salary');
    MF.ProfitLoss_AddExpense (500, 'Office', 'Notes Office');
    MF.ProfitLoss_AddExpense (500, 'Tolls', 'Notes Tolls');
    MF.ProfitLoss_AddExpense (500, 'Misc', 'Notes Misc');
    driver.wait(driver.findElement(By.xpath('//div[@class="panel-body blueBox"]/span[1]')).getText().then(function (text) {
        V.sumExpenseAfterAddExpense = SF.cleanPrice (text);
        VD.IWant (VD.ToEqual, V.sumExpenseAfterAddExpense, (V.sumExpenseClean+2500), 'не совпало итого сверху с тем что мы добавили');
    }),config.timeout);

condition.nowWeDoing = 'проверяем что нотес в експенсе посохранялось';
    driver.wait(driver.findElements(By.xpath('//tr[@ng-click="openExpense(expense)"]/td[contains(text(), "Notes Trucks")]')).then(function (len) {
        VD.IWant (VD.ToEqual, 1, (len.length), 'не нашло нотес для Trucks');
    }),config.timeout);
    driver.wait(driver.findElements(By.xpath('//tr[@ng-click="openExpense(expense)"]/td[contains(text(), "Notes Salary")]')).then(function (len) {
        VD.IWant (VD.ToEqual, 1, (len.length), 'не нашло нотес для Salary');
    }),config.timeout);
    driver.wait(driver.findElements(By.xpath('//tr[@ng-click="openExpense(expense)"]/td[contains(text(), "Notes Office")]')).then(function (len) {
        VD.IWant (VD.ToEqual, 1, (len.length), 'не нашло нотес для Office');
    }),config.timeout);
    driver.wait(driver.findElements(By.xpath('//tr[@ng-click="openExpense(expense)"]/td[contains(text(), "Notes Tolls")]')).then(function (len) {
        VD.IWant (VD.ToEqual, 1, (len.length), 'не нашло нотес для Tolls');
    }),config.timeout);
    driver.wait(driver.findElements(By.xpath('//tr[@ng-click="openExpense(expense)"]/td[contains(text(), "Notes Misc")]')).then(function (len) {
        VD.IWant (VD.ToEqual, 1, (len.length), 'не нашло нотес для Misc');
    }),config.timeout);

condition.nowWeDoing = 'теперь удаляем созданные експенсе';
    driver.wait(driver.executeScript("return $('tr[ng-click=\"openExpense(expense)\"]').length").then(function (expense) {
        V.expense = expense;
    }),config.timeout);
    SF.sleep(1);
    if (V.expense != 0) {
        for (let i = 0; i < V.expense; i++) {
            SF.click(By.xpath('//tr[@ng-click="openExpense(expense)"]//span[@ng-click="removeExpense(expense)"]/i'));
            MF.SweetConfirm();
            MF.WaitWhileBusy();
        }
    }
    driver.wait(driver.findElement(By.xpath('//div[@class="panel-body blueBox"]/span[1]')).getText().then(function (text) {
        V.sumExpenseAfterDeleteExpense = SF.cleanPrice (text);
        VD.IWant (VD.ToEqual, V.sumExpenseAfterDeleteExpense, V.sumExpenseClean, 'не совпало итого сверху с тем что было вначале, после того как мы удалили все експенсе');
    }),config.timeout);
    SF.sleep(1);


    //=========================закончили писать тест=============================
    SF.endOfTest();
};
