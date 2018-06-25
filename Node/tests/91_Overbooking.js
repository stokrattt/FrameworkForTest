module.exports = function main(SF, JS, MF, LF, JSstep, VD, V, By, until,FileDetector, system, condition, config,constants){
    global.fiber = Fiber.current;
    V.client = {};
    V.client.name = SF.randomBukva(6) + '_t';
    V.client.fam = SF.randomBukva(6) + '_t';
    V.client.phone = SF.randomCifra(10);
    V.client.email = SF.randomBukvaSmall(6) + '@' + SF.randomBukvaSmall(4) + '.tes';
    V.client.passwd = 123;
    SF.get(V.adminURL);
    LF.LoginToBoardAsAdmin(V.adminLogin, V.adminPassword);

condition.nowWeDoing = 'в админке создаем первий реквест делаем его нот конферм,виключаем калькулятор , добавляем 2 трака';
    LF.CreateLocalMovingFromBoard(V.client);
    V.boardNumbers = {};
    LF.RememberDigitsRequestBoard(V.boardNumbers);
    driver.wait(driver.executeScript("if ($('span[ng-click=\"switchCalc()\"]').hasClass('off')){" +
        "return true;} else {$('span[ng-click=\"switchCalc()\"]').click()}"),config.timeout);
    SF.click(By.xpath('//div[contains(text(),"ZAZ")]'));
    MF.WaitWhileBusy();
    SF.click(By.xpath('//div[contains(text(),"qqq")]'));
    MF.WaitWhileBusy();
    driver.wait(driver.executeScript("return $('#edit-start-time').val()").then(function (text) {
        V.time = text;
    }),config.timeout);
    driver.wait(driver.executeScript("return $('div .choosen[ng-click=\"chooseTruck(tid)\"]').text()").then(function (text) {
        V.truck = text;
    }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//a[@ng-click="select(tabs[0])"]')).getText().then(function(text){
        V.Id1 = SF.cleanPrice(text);
        // LF.addToCleanerJob(V.Id1);
    }), config.timeout);
    MF.EditRequest_SetToNotConfirmed ();
    MF.EditRequest_SaveChanges ();
    LF.closeEditRequest ();
    V.client2 = {};
    V.client2.name = SF.randomBukva(6) + '_t';
    V.client2.fam = SF.randomBukva(6) + '_t';
    V.client2.phone = SF.randomCifra(10);
    V.client2.email = SF.randomBukvaSmall(6) + '@' + SF.randomBukvaSmall(4) + '.tes';

condition.nowWeDoing = 'создаем второй реквест, ставим нот конферм и выбираем трак такой же как у первого только время другое';
    LF.CreateLocalMovingFromBoard(V.client2);
    driver.wait(driver.findElement(By.xpath('//a[@ng-click="select(tabs[0])"]')).getText().then(function(text){
        V.Id2 = SF.cleanPrice(text);
        // LF.addToCleanerJob(V.Id2);
    }), config.timeout);
    SF.sleep (1);
    MF.EditRequest_SetStartTime('01:00 PM');
    SF.click(By.xpath('//div[contains(text(),"ZAZ")]'));
    MF.WaitWhileBusy();
    MF.EditRequest_SetToNotConfirmed ();
    MF.EditRequest_SaveChanges ();
    LF.closeEditRequest ();
    V.client3 = {};
    V.client3.name = SF.randomBukva(6) + '_t';
    V.client3.fam = SF.randomBukva(6) + '_t';
    V.client3.phone = SF.randomCifra(10);
    V.client3.email = SF.randomBukvaSmall(6) + '@' + SF.randomBukvaSmall(4) + '.tes';

condition.nowWeDoing = 'создаем третий реквест, ставим конферм и выбираем трак такой же как у первого и второго, и время чтоби косалось двох предидущих реквестов';
    LF.CreateLocalMovingFromBoard(V.client3);
    driver.wait(driver.findElement(By.xpath('//a[@ng-click="select(tabs[0])"]')).getText().then(function(text){
        V.Id3 = SF.cleanPrice(text);
        // LF.addToCleanerJob(V.Id3);
    }), config.timeout);
    MF.EditRequest_SetStartTime ('11:00 AM');
    SF.sleep (2);
    SF.click(By.xpath('//div[contains(text(),"ZAZ")]'));
    MF.WaitWhileBusy();
    MF.EditRequest_SetToConfirmed ();
    MF.EditRequest_SetAdressToFrom();
    JS.click('button[ng-click=\\"UpdateRequest()\\"]');
    MF.SweetConfirm();
    JS.waitForExist('button[ng-click="update(request)"]:visible');
    SF.sleep(2);
    SF.click(By.xpath('//button[@ng-click="update(request)"]'));
    JS.waitForExist("div.toast-success:visible");
    MF.WaitWhileBusy();

condition.nowWeDoing = 'проверяем логи';
    MF.EditRequest_OpenLogs ();
    driver.wait(driver.findElement(By.xpath('//h2[contains(text(), "Overbooking")]/..//span[contains(text(), "Status was changed to date pending on requests:")]')).getText().then(function (text) {
        VD.IWant(VD.ToEqual, text, 'Status was changed to date pending on requests: '+V.Id1+', '+V.Id2+'', 'не совпали реквесты которые ушли в дейт пендинг');
    }),config.timeout);
    LF.closeEditRequest ();
    MF.Board_RefreshDashboard ();

condition.nowWeDoing = 'идем в админку проверять или два первих реквеста реквеста ушли в дата пендинг';
    driver.wait(driver.findElement(By.xpath('//td[@ng-click="requestEditModal(request)"][contains(text(),"' + V.Id1 + '")]/../td[2]/span')).getText().then(function (text) {
        VD.IWant (VD.ToEqual, text, 'Date Pending', 'первый реквест не ушел в дата пендинг а должен был');
    }), 120000);
    driver.wait(driver.findElement(By.xpath('//td[@ng-click="requestEditModal(request)"][contains(text(),"' + V.Id2 + '")]/../td[2]/span')).getText().then(function (text) {
        VD.IWant (VD.ToEqual, text, 'Date Pending', 'второй реквест не ушел в дата пендинг а должен был');
    }), 120000);
    MF.Board_OpenRequest(V.Id1);
    MF.EditRequest_OpenLogs();
    driver.wait(driver.findElement(By.xpath('//h2[contains(text(), "Overbooking")]/..//span[contains(text(), "Status was changed to Date Pending, because of overbooking from request #")]')).getText().then(function (text) {
        VD.IWant(VD.ToEqual, text, 'Status was changed to Date Pending, because of overbooking from request #'+V.Id3+'', 'не совпал реквест от которого он ушел в дейт пендинг');
    }),config.timeout);
    LF.closeEditRequest ();

condition.nowWeDoing = 'идем в конфермнутие реквести проверить есть ли там третий реквест';
    MF.Board_OpenConfirmed ();
    MF.Board_RefreshDashboard ();
    driver.wait(driver.findElement(By.xpath('//td[@ng-click="requestEditModal(request)"][contains(text(),"' + V.Id3 + '")]/../td[2]/span')).getText().then(function (text) {
        VD.IWant (VD.ToEqual, text, 'Confirmed', 'третий реквест не ушел в конферм а должен был');
    }), 120000);
    MF.Board_OpenRequest(V.Id3);
    SF.select(By.xpath('//select[@id="edit-status"]'), 22);
    MF.EditRequest_SaveChanges();

    SF.endOfTest();
};
