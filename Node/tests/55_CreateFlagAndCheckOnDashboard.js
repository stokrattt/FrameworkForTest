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

condition.nowWeDoing = 'Идем в настройки и создаем флаг';
    MF.Board_OpenSettingsGeneral ();
    SF.click(By.linkText('Company Flags'));
    SF.sleep(2);
    SF.click(By.xpath('//button[@ng-click="vm.addNewFlag(); vm.addFlag = true"]'));
    SF.send(By.xpath('//input[@ng-model="vm.newFlag.name"]'), 'test flag');
    SF.clear(By.xpath('//input[@ng-model="vm.newFlag.color"]'));
    SF.send(By.xpath('//input[@ng-model="vm.newFlag.color"]'), '#b8263a');
    SF.click(By.xpath('//button[@ng-click="vm.saveNewFlag(); "]'));
    SF.sleep(4);
    MF.WaitWhileBusy ();

condition.nowWeDoing = 'Создаем реквест и ставим созданный флаг';
    LF.CreateLocalMovingFromBoard (V.client);
    SF.click(By.id('company-flags'));
    SF.sleep(0.5);
    SF.click(By.xpath('//li[@ng-repeat="(key,flag) in companyFlags track by $index"][last()]'));
    SF.sleep(4);
    V.boardNumbers = {};
    LF.RememberDigitsRequestBoard (V.boardNumbers);
    LF.closeEditRequest ();
    MF.Board_OpenDashboard ();

condition.nowWeDoing = 'идем на дашборд и проверяем что у реквеста стоит флаг созданный';
    driver.wait(driver.findElement(By.xpath('//td[@ng-click="requestEditModal(request)"][contains(text(),"' + V.boardNumbers.Id + '")]/..//div[@id="company-flag"]/span[1]')).getText().then(function (text) {
        VD.IWant(VD.VToEqual, text, 'TEST FLAG', 'не нашло флаг который мы выставили');
    }),config.timeout);
    SF.sleep(0.5);
    driver.navigate().refresh();

condition.nowWeDoing = 'обновляем страницу и проверяем что флаг остался, открываем реквест ставим нот конферм и сохраняем';
    SF.waitForVisible(By.xpath('//td[@ng-click="requestEditModal(request)"]'));
    driver.wait(driver.findElement(By.xpath('//td[@ng-click="requestEditModal(request)"][contains(text(),"' + V.boardNumbers.Id + '")]/..//div[@id="company-flag"]/span[1]')).getText().then(function (text) {
        VD.IWant(VD.VToEqual, text, 'TEST FLAG', 'не нашло флаг который мы выставили после обновления страницы');
    }),config.timeout);
    SF.sleep(0.5);
    LF.OpenRequest (V.boardNumbers.Id);
    JS.step(JSstep.selectTruck((V.boardNumbers.LaborTimeMax + V.boardNumbers.TravelTime)/60));
    MF.EditRequest_SetAdressToFrom ();
    MF.EditRequest_SetToNotConfirmed ();
    LF.addToCleanerJob (V.boardNumbers.Id);
    MF.EditRequest_SaveChanges ();
    LF.closeEditRequest ();

condition.nowWeDoing = 'пошли на страницу нот конферм и смотрим что флаг есть';
    MF.Board_OpenNotConfirmed ();
    driver.wait(driver.findElement(By.xpath('//td[@ng-click="requestEditModal(request)"][contains(text(),"' + V.boardNumbers.Id + '")]/..//div[@id="company-flag"]/span[1]')).getText().then(function (text) {
        VD.IWant(VD.VToEqual, text, 'TEST FLAG', 'не нашло флаг который мы выставили на странице нот конферм');
    }),config.timeout);
    SF.sleep(0.5);
    MF.Board_OpenAllRequest ();

condition.nowWeDoing = 'открываем страницу всех реквестов, смотрим что там есть наш флаг и что есть этот реквест, открываем реквест и удаляем флаг';
    SF.click(By.xpath('//a[@ng-click="vm.goToPage(\'requests_child\', {id: flag.id})"][contains(text(),"test flag")]'));
    MF.WaitWhileBusy ();
    driver.wait(driver.findElement(By.xpath('//td[@ng-click="requestEditModal(request)"][contains(text(),"' + V.boardNumbers.Id + '")]/..//div[@id="company-flag"]/span[1]')).getText().then(function (text) {
        VD.IWant(VD.VToEqual, text, 'TEST FLAG', 'не нашло флаг который мы выставили на странице Request Page (filtration page)');
    }),config.timeout);
    SF.sleep(0.5);
    LF.OpenRequest (V.boardNumbers.Id);
    SF.click(By.id('company-flags'));
    SF.sleep(0.5);
    JS.click('a[ng-click=\\"removeFlag(request.nid)\\"]:visible');
    SF.sleep(3);
    LF.closeEditRequest ();

condition.nowWeDoing = 'идем на дашборд и на страницу нот конферм и смотрим что флага нету';
    MF.Board_OpenDashboard ();
    MF.Board_OpenNotConfirmed ();
    driver.wait(driver.findElement(By.xpath('//td[@ng-click="requestEditModal(request)"][contains(text(),"8410")]/..//div[@id="company-flag"]/span[1]')).getText().then(function (text) {
        VD.IWant(VD.VNotToEqual, text, 'TEST FLAG', 'не удалился флаг на странице нот конферм');
    }),config.timeout);
    SF.sleep(0.5);
    MF.Board_OpenSideBar ();
    MF.Board_OpenSettingsGeneral ();

condition.nowWeDoing = 'идем в настройки и удаляем наш флаг';
    SF.click(By.linkText('Company Flags'));
    SF.sleep(2);
    SF.click(By.xpath('//tr[@ng-repeat="values in vm.companyFlags track by $index"][last()]/td[4]//i'));
    MF.SweetConfirm ();
    SF.sleep(3);
    MF.WaitWhileBusy ();
    MF.Board_LogoutAdmin ();
    //=========================закончили писать тест=============================
    SF.endOfTest();
};
