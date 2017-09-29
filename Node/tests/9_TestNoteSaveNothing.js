module.exports = function main(SF, JS, MF, LF, JSstep, VD, V, By, until,FileDetector, system, condition, config,constants) {    global.fiber = Fiber.current;
    V.client = {};
    V.client.name = SF.randomBukva(6) + '_t';
    V.client.fam = SF.randomBukva(6) + '_t';
    V.client.phone = SF.randomCifra(10);
    V.client.email = SF.randomBukvaSmall(6) + '@' + SF.randomBukvaSmall(4) + '.tes';
    V.note = {};

    condition.nowWeDoing = 'создаем реквест и вводим нотсы для сейлса, форемана и клиента';
    SF.get(V.adminURL);
    LF.LoginToBoardAsCustom(V.adminLogin,V.adminPassword);
    LF.CreateLocalMovingFromBoard(V.client);
    driver.wait(driver.findElement(By.xpath('//a[@ng-click="select(tabs[0])"]')).getText().then(function(text){
        V.request.Id = SF.cleanPrice(text);
        LF.addToCleanerJob(V.request.Id);
    }),config.timeout);
    SF.click(By.xpath('//div[contains(@class, "sales_notes")]'));
    V.note = SF.randomBukva(7);
    SF.send(By.xpath('//div[contains(@class, "sales_notes")]/div[2]/div[3]'), V.note);
    MF.EditRequest_SaveNotesSales ();
    SF.click(By.xpath('//a[@ng-click="select(key)"][contains(text(), "Foreman notes")]'));
    V.noteForeman = SF.randomBukva(7);
    SF.click(By.xpath('//div[contains(@class, "foreman_notes")]'));
    SF.send(By.xpath('//div[contains(@class, "foreman_notes")]/div[2]/div[3]'), V.noteForeman);
    MF.EditRequest_SaveNotesForeman ();
    SF.click(By.xpath('//a[@ng-click="select(key)"][contains(text(), "Client notes")]'));
    SF.click(By.xpath('//div[contains(@class, "client_notes")]'));
    V.noteClient = SF.randomBukva(7);
    SF.send(By.xpath('//div[contains(@class, "client_notes")]/div[2]/div[3]'), V.noteClient);
    MF.EditRequest_SaveNotesClient ();

    V.boardNumbers = {};
    LF.RememberDigitsRequestBoard(V.boardNumbers);
    JS.step(JSstep.selectTruck((V.boardNumbers.LaborTimeMax + V.boardNumbers.TravelTime)/60));
    MF.WaitWhileBusy();
    MF.EditRequest_SaveChanges ();
condition.nowWeDoing = 'закрываем реквест и открываем и проверяем что заметочки сохранились';
    LF.closeEditRequest ();
    MF.WaitWhileBusy ();
    MF.WaitWhileBusy ();
    MF.Board_OpenRequest(V.request.Id);
    driver.wait(driver.findElement(By.xpath('//div[contains(@class, "sales_notes")]')).getText().then(function(text) {
      VD.IWant(VD.ToEqual, text, V.note, 'Не совпали заметочки сейлса');
    }),config.timeout);
    SF.sleep(1);
    SF.click(By.xpath('//a[@ng-click="select(key)"][contains(text(), "Foreman notes")]'));
    driver.wait(driver.findElement(By.xpath('//div[contains(@class, "foreman_notes")]')).getText().then(function(text) {
        VD.IWant(VD.ToEqual, text, V.noteForeman, 'Не совпали заметочки форемана');
    }),config.timeout);
    SF.sleep(1);
    SF.click(By.xpath('//a[@ng-click="select(key)"][contains(text(), "Client notes")]'));
    driver.wait(driver.findElement(By.xpath('//div[contains(@class, "client_notes")]/div[2]/div[3]')).getText().then(function(text) {
        VD.IWant(VD.ToEqual, text, V.noteClient, 'Не совпали заметочки clienta');
    }),config.timeout);
    SF.sleep(1);

condition.nowWeDoing = 'очищаем старые заметки и вводим новые, добавляем инвентори и ставим нот конферм';
    SF.clear(By.xpath('//div[contains(@class, "client_notes")]/div[2]/div[3]'));
    V.noteClientNew = SF.randomBukva(10);
    SF.send(By.xpath('//div[contains(@class, "client_notes")]/div[2]/div[3]'), V.noteClientNew);
    MF.EditRequest_SaveNotesClient ();
    V.noteForemanNew = SF.randomBukva(10);
    SF.click(By.xpath('//a[@ng-click="select(key)"][contains(text(), "Foreman notes")]'));
    SF.clear(By.xpath('//div[contains(@class, "foreman_notes")]/div[2]/div[3]'));
    SF.click(By.xpath('//div[contains(@class, "foreman_notes")]'));
    SF.send(By.xpath('//div[contains(@class, "foreman_notes")]/div[2]/div[3]'), V.noteForemanNew);
    MF.EditRequest_SaveNotesForeman ();
    SF.click(By.xpath('//a[@ng-click="select(key)"][contains(text(), "Sales notes")]'));
    SF.click(By.xpath('//div[contains(@class, "sales_notes")]'));
    SF.clear(By.xpath('//div[contains(@class, "sales_notes")]/div[2]/div[3]'));
    V.noteNew = SF.randomBukva(10);
    SF.send(By.xpath('//div[contains(@class, "sales_notes")]/div[2]/div[3]'), V.noteNew);
    MF.EditRequest_SaveNotesSales ();
    LF.addInventoryBoard ();
    MF.EditRequest_SetToNotConfirmed ();
    MF.EditRequest_SaveChanges ();
    LF.closeEditRequest ();

condition.nowWeDoing = 'переходим на табу нот конферм и проверяем что новые нотсы сохранились';
    MF.Board_OpenNotConfirmed ();
    MF.Board_RefreshDashboard ();
    MF.WaitWhileBusy();
    MF.Board_OpenRequest(V.request.Id);
    driver.wait(driver.findElement(By.xpath('//div[contains(@class, "sales_notes")]')).getText().then(function(text) {
        VD.IWant(VD.ToEqual, text, V.noteNew, 'Не совпали новые заметочки у сейлса после затирания старых');
    }),config.timeout);
    SF.sleep(1);
    SF.click(By.xpath('//a[@ng-click="select(key)"][contains(text(), "Foreman notes")]'));
    driver.wait(driver.findElement(By.xpath('//div[contains(@class, "foreman_notes")]')).getText().then(function(text) {
        VD.IWant(VD.ToEqual, text, V.noteForemanNew, 'Не совпали новые заметочки форемана после затирания старых');
    }),config.timeout);
    SF.sleep(1);
    SF.click(By.xpath('//a[@ng-click="select(key)"][contains(text(), "Client notes")]'));
    driver.wait(driver.findElement(By.xpath('//div[contains(@class, "client_notes")]/div[2]/div[3]')).getText().then(function(text) {
        VD.IWant(VD.ToEqual, text, V.noteClientNew, 'Не совпали новые заметочки clienta после затирания старых');
    }),config.timeout);
    SF.sleep(1);

condition.nowWeDoing='сейчас должно появиться Nothing to Update!';
    JS.click('button[ng-click=\\"UpdateRequest()\\"]');
    JS.waitForExist("h2:contains(\"Nothing to Update!\")");
    MF.SweetConfirm();

condition.nowWeDoing = 'ставим конферм, закрываем работу и идем на страницы форемана и клиента проверять что нотсы там есть новые';
    MF.EditRequest_SetToConfirmed ();
    MF.EditRequest_SetAdressToFrom ();
    MF.EditRequest_SaveChanges ();
    MF.EditRequest_OpenSettings ();
    MF.EditRequest_SetSaleNumber (5);
    SF.click(By.xpath('//button[@ng-click="goToRequest()"]'));
    SF.openTab (1);
    MF.Account_WaitForGreenTextAfterConfirm();
    SF.sleep(3);
    MF.WaitWhileBusy ();
    driver.wait(driver.findElement(By.xpath('//div[@ng-bind-html="noteClient"]')).getText().then(function (text) {
        VD.IWant(VD.ToEqual, text, V.noteClientNew, 'не нашло или не совпали заметки clienta с реквеста с аккаунтом клиента');
    }),config.timeout);
    SF.sleep(1);
    MF.Account_ClickViewConfirmationPage ();
    SF.sleep(4);
    driver.wait(driver.findElement(By.xpath('//div[@ng-bind-html="noteClient"]')).getText().then(function (text) {
        VD.IWant(VD.ToEqual, text, V.noteClientNew, 'не нашло или не совпали заметки clienta с реквеста na confirmation page');
    }),config.timeout);
    SF.sleep(1);
    JS.scroll('i[ng-if="!showNotes"]');
    SF.click(By.xpath('//i[@ng-if="!showNotes"]'));
    driver.wait(driver.findElement(By.xpath('//div[@ng-bind-html="noteForeman"]')).getText().then(function (text) {
        VD.IWant(VD.ToEqual, text, V.noteForemanNew, 'не нашло или не совпали заметки foremana с реквеста na confirmation page')
    }),config.timeout);
    SF.sleep(0.5);
     SF.openTab (0);

condition.nowWeDoing = 'тут проверим на сохранение нотсов при закрытии реквеста без нажатия кнопки сейв';
    MF.EditRequest_OpenRequest ();
    SF.clear(By.xpath('//div[contains(@class, "client_notes")]/div[2]/div[3]'));
    V.noteClientNew1 = SF.randomBukva(10);
    SF.send(By.xpath('//div[contains(@class, "client_notes")]/div[2]/div[3]'), V.noteClientNew1);
    V.noteForemanNew1 = SF.randomBukva(10);
    SF.click(By.xpath('//a[@ng-click="select(key)"][contains(text(), "Foreman notes")]'));
    SF.clear(By.xpath('//div[contains(@class, "foreman_notes")]/div[2]/div[3]'));
    SF.click(By.xpath('//div[contains(@class, "foreman_notes")]'));
    SF.send(By.xpath('//div[contains(@class, "foreman_notes")]/div[2]/div[3]'), V.noteForemanNew1);
    SF.click(By.xpath('//a[@ng-click="select(key)"][contains(text(), "Sales notes")]'));
    SF.click(By.xpath('//div[contains(@class, "sales_notes")]'));
    SF.clear(By.xpath('//div[contains(@class, "sales_notes")]/div[2]/div[3]'));
    V.noteNew1 = SF.randomBukva(10);
    SF.send(By.xpath('//div[contains(@class, "sales_notes")]/div[2]/div[3]'), V.noteNew1);
    SF.click(By.xpath('//button[@ng-click="UpdateRequest()"]'));
    SF.waitForVisible(By.xpath('//div[@class="modal-content"]'));
    SF.sleep (1);
    driver.wait(driver.findElement(By.xpath('//div[@ng-if="message.label == \'custom\' || message.label == \'notes\'"]')).getText().then(function(text) {
        VD.IWant(VD.ToEqual, text, 'Notes was changed');
    }),config.timeout);
    SF.click(By.xpath('//button[@ng-click="update(request)"]'));
    MF.WaitWhileBusy();
    LF.closeEditRequest ();
    MF.Board_OpenConfirmed ();
    MF.WaitWhileBusy ();
    MF.Board_OpenRequest(V.request.Id);
    driver.wait(driver.findElement(By.xpath('//div[contains(@class, "sales_notes")]')).getText().then(function(text) {
        VD.IWant(VD.ToEqual, text, V.noteNew1, 'Не совпали заметочки сейлса после сохранения через закрытие реквеста');
    }),config.timeout);
    SF.sleep(1);
    SF.click(By.xpath('//a[@ng-click="select(key)"][contains(text(), "Foreman notes")]'));
    driver.wait(driver.findElement(By.xpath('//div[contains(@class, "foreman_notes")]')).getText().then(function(text) {
        VD.IWant(VD.ToEqual, text, V.noteForemanNew1, 'Не совпали заметочки форемана после сохранения через закрытие реквеста');
    }),config.timeout);
    SF.sleep(1);
    SF.click(By.xpath('//a[@ng-click="select(key)"][contains(text(), "Client notes")]'));
    driver.wait(driver.findElement(By.xpath('//div[contains(@class, "client_notes")]/div[2]/div[3]')).getText().then(function(text) {
        VD.IWant(VD.ToEqual, text, V.noteClientNew1, 'Не совпали заметочки clienta после сохранения через закрытие реквеста');
    }),config.timeout);
    SF.sleep(2);


    SF.endOfTest();
};
