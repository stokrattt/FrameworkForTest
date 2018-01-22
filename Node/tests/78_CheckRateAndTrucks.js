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
    LF.CreateLocalMovingFromBoard (V.client);
    LF.addInventoryBoard ();
    LF.addAdditionalInventoryBoard ();
    LF.addAdditionalInventoryBoard ();
    LF.addAdditionalInventoryBoard ();
    LF.addAdditionalInventoryBoard ();
    SF.sleep(2);
    V.boardNumbers = {};
    LF.RememberDigitsRequestBoard (V.boardNumbers);
    SF.sleep(1);
    MF.EditRequest_SaveChanges ();
    MF.EditRequest_OpenSettings ();
    MF.EditRequest_ClickViewRequest ();
    SF.openTab (1);
    MF.Account_WaitForLoadingAccount();
    V.accountNumbers = {};
    LF.RememberAccountNumbers (V.accountNumbers);
    LF.Validation_Compare_Account_Admin (V.accountNumbers, V.boardNumbers);
    SF.sleep(1);

condition.nowWeDoing = 'тут мы сделаем пакинг дей с реквеста и отвяжем его от этого реквеста, проверим что работает отвязка';
    driver.close();
    SF.openTab(0);
    SF.sleep(1);
    MF.EditRequest_ClickCreatePAckingDay();
    SF.waitForLocated (By.xpath('//div[contains(@class,"requestModal status_1")]//a[@ng-click="select(tabs[0])"]'));
    MF.WaitWhileBusy();
    driver.wait(driver.findElement(By.xpath('//div[contains(@class,"requestModal status_1")]//a[@ng-click="select(tabs[0])"]')).getText().then(function(text){
        V.PackingDayID = SF.cleanPrice(text);
    }),config.timeout);
    JS.click('button[ng-click="cancel()"]:visible');
    MF.Board_RefreshDashboard();
    MF.Board_OpenRequest (V.boardNumbers.Id);
    SF.click(By.xpath('//i[@ng-click="unbindPackingDay()"]'));
    MF.WaitWhileToaster();
    driver.wait(driver.executeScript("return $('span[ng-click=\"openBindingRequest(request.request_all_data.packing_request_id)\"]').length").then(function (text) {
        VD.IWant(VD.ToEqual, text, 0, 'не отвязался пакинг реквест с родительского на мувборде');
    }),config.timeout);
    SF.click(By.xpath('//a[@ng-click="goTo()"]'));
    SF.openTab(1);
    MF.Account_WaitForLoadingAccount();
    driver.wait(driver.executeScript("return $('span[ng-show=\"vm.request.service_type.raw != 8\"]').length").then(function (text) {
        VD.IWant(VD.ToEqual, text, 0, 'не отвязался пакинг реквест с родительского на аккаунте');
    }),config.timeout);
    driver.close();
    SF.openTab(0);
    LF.closeEditRequest ();
    MF.Board_OpenRequest (V.PackingDayID+1);
    driver.wait(driver.executeScript("return $('div[class=\"addPackingInfo\"]').length").then(function (text) {
        VD.IWant(VD.ToEqual, text, 0, 'не пропал род реквест с пакинг дея в котором мы его отвязали на мувборде');
    }),config.timeout);
    SF.click(By.xpath('//a[@ng-click="goTo()"]'));
    SF.openTab(1);
    MF.Account_WaitForLoadingAccount();
    driver.wait(driver.executeScript("return $('a[ng-click=\"vm.goToNewRequest(vm.request.request_all_data.packing_request_id)\"]').length").then(function (text) {
        VD.IWant(VD.ToEqual, text, 0, 'не отвязался родительский от пакинг дея  на аккаунте');
    }),config.timeout);
    SF.sleep(1);
    //=========================закончили писать тест=============================
    SF.endOfTest();
};
