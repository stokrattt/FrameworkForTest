module.exports = function main(SF, JS, MF, LF, JSstep, VD, V, By, until,FileDetector, system, condition, config,constants){
    global.fiber = Fiber.current;
    V.client = {};
    V.client.name = SF.randomBukva(6) + '_t';
    V.client.fam = SF.randomBukva(6) + '_t';
    V.client.phone = SF.randomCifra(10);
    V.client.email = SF.randomBukvaSmall(6) + '@' + SF.randomBukvaSmall(4) + '.tes';
    V.client.passwd = 123;

    SF.get(V.frontURL);

condition.nowWeDoing = 'заполняем калькулятор верхний, мувинг';
    LF.FullSmallCalcAsLocal(V.client);

condition.nowWeDoing = 'первый раз в аккаунте, добавляю инвентарь, детали, отправляю сообщение,проверяю прогрес бар';
    MF.Account_ClickViewRequest();
    driver.wait(driver.findElement(By.xpath('//div [contains (@class, "request-score-box__percent-label")]')).getText().then(function(text) {
        V.ScorePercent1 = SF.cleanPrice(text);
        VD.IWant(VD.ToEqual, V.ScorePercent1, 25,'при входе в аккаунт 1й раз в аккаунт не посчитались проценты за создание реквеста');
    }),config.timeout);
    LF.AccountLocalEnterAddress();
    LF.AccountLocalAddInventory();
    driver.wait(driver.findElement(By.xpath('//div [contains (@class, "request-score-box__percent-label")]')).getText().then(function(text) {
        V.ScorePercent2 = SF.cleanPrice(text);
        VD.IWant(VD.ToEqual, V.ScorePercent2, 65,'не посчитались проценты за добавление инвентаря');
    }),config.timeout);
    LF.AccountLocalDetails();
    driver.wait(driver.findElement(By.xpath('//div [contains (@class, "request-score-box__percent-label")]')).getText().then(function(text) {
        V.ScorePercent3 = SF.cleanPrice(text);
        VD.IWant(VD.ToEqual, V.ScorePercent3, 85,'не посчитались проценты за добавление деталей');
    }),config.timeout);
    MF.Account_WaitForInventoryCheck();
    MF.Account_WaitForDetailsCheck();
    V.accountNumbers={};
    LF.RememberAccountNumbers(V.accountNumbers);
    MF.Account_OpenMessage();
    V.toAdmin = SF.randomBukva(6) + '_toAdmin';
    MF.BoardAccount_SendMessage(V.toAdmin);
    SF.sleep(3);
    LF.LogoutFromAccount();

condition.nowWeDoing = 'первый раз в админке,сверяю очки,проверяю логи, включаю дисконт';
    SF.get(V.adminURL);
    LF.LoginToBoardAsCustom(V.adminLogin,V.adminPassword);
    SF.sleep(130);
    MF.Board_RefreshDashboard();
    MF.Board_OpenRequest(V.accountNumbers.Id);
    V.boardNumbers = {};
    LF.RememberDigitsRequestBoard(V.boardNumbers);
    JS.step(JSstep.selectTruck((V.boardNumbers.LaborTimeMax + V.boardNumbers.TravelTime)/60));
    MF.WaitWhileBusy();
    driver.wait(driver.findElement(By.xpath('//input[@ng-model="request.field_total_score"]')).getAttribute('value').then(function(text) {
        V.PointReq1  = text;
        VD.IWant(VD.ToEqual, V.PointReq1, 50 ,'сверяем очки 1й раз');
    }),config.timeout);
    MF.EditRequest_OpenLogs();
    driver.wait(driver.findElement(By.xpath('//h2[contains(text(), "Request score updated ")]/..//span/b/span[text()=\'10 points were added for "A customer sends a message" action\']')).getText().then(function (text) {
        VD.IWant(VD.ToEqual, text, '10 points were added for "A customer sends a message" action', 'нет лога про сообщение');
    }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//h2[contains(text(), "Request score updated ")]/..//span/b/span[text()=\'15 points were added for "When a customer submits inventory" action\']')).getText().then(function (text) {
        VD.IWant(VD.ToEqual, text, '15 points were added for "When a customer submits inventory" action','нет лога про инвентарь');
    }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//h2[contains(text(), "Request score updated ")]/..//span/b/span[text()=\'10 points were added for "A customer sends a message" action\']')).getText().then(function (text) {
        VD.IWant(VD.ToEqual, text, '10 points were added for "A customer sends a message" action','нет лога про детали');
    }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//h2[contains(text(), "Request score updated ")]/..//span/b/span[text()=\'5 points were added for "When a customer views a request" action\']')).getText().then(function (text) {
        VD.IWant(VD.ToEqual, text, '5 points were added for "When a customer views a request" action','нет лога про просмотре реквеста');
    }),config.timeout);
    MF.EditRequest_OpenSettings ();
    SF.click(By.xpath('//input[@ng-model="request.request_all_data.showCoupons"]/following-sibling::span'));
    SF.sleep(1);
    MF.EditRequest_OpenClient();
    LF.SetClientPasswd(V.client.passwd);
    MF.EditRequest_OpenRequest();
    MF.EditRequest_SetToNotConfirmed();
    MF.EditRequest_SaveChanges();
    LF.closeEditRequest();
    MF.Board_LogoutAdmin();

condition.nowWeDoing = 'пошли в аккаунт, покупаем купон, конфермим, проверяем прогрес бар';
    SF.get(V.accountURL);
    LF.LoginToAccountAsClient(V.client);
    MF.Account_OpenRequest(V.accountNumbers.Id);
    driver.wait(driver.findElement(By.xpath('//div [contains (@class, "request-score-box__percent-label")]')).getText().then(function(text) {
        V.ScorePercent4 = SF.cleanPrice(text);
        VD.IWant(VD.ToEqual, V.ScorePercent4, 85,'при входе в аккаунт 2й раз в аккаунт не совпали проценты');
    }),config.timeout);
    SF.click(By.id('tab_Coupons'));
    SF.waitForLocated (By.xpath('//a[@ng-click="setRequestNid()"]'));
    MF.WaitWhileBusy ();
    SF.click (By.xpath('//a[@ng-click="setRequestNid()"]'));
    MF.WaitWhileBusy ();
    SF.click(By.xpath('//a[@ng-click="vm.couponPayment();"]'));
    LF.FillCardPayModalBuyCoupon ();
    MF.WaitWhileBusy ();
    LF.MakeSignJS ('signatureCanvasPayment');
    SF.click(By.xpath('//button[@ng-click="saveSignature()"]'));
    JS.waitForExist('button.confirm');
    SF.sleep(1);
    driver.wait(driver.findElement(By.xpath('//h3[contains(text(), "We have sent you an email with coupon details.")]/following-sibling::h3/b')).getText().then(function (cod) {
        V.DiscountCode = cod;
    }),config.timeout);
    MF.SweetConfirm();
    LF.ConfirmRequestInAccount_WithReservation();
    MF.Account_WaitForGreenTextAfterConfirm();
    driver.wait(driver.findElement(By.xpath('//div[@class="request-score-box__percent-label"]')).getText().then(function(text) {
        V.ScorePercent5 = SF.cleanPrice(text);
        VD.IWant(VD.ToEqual, V.ScorePercent5, 100,'не добавились проценты после резервации');
    }),config.timeout);
    LF.LogoutFromAccount();

condition.nowWeDoing = 'вернулись в модалку реквеста, проверяем очки 2й раз, и логи';
    SF.get(V.adminURL);
    LF.LoginToBoardAsCustom(V.adminLogin,V.adminPassword);
    MF.Board_OpenConfirmed();
    MF.Board_OpenRequest(V.accountNumbers.Id);
    driver.wait(driver.findElement(By.xpath('//input[@ng-model="request.field_total_score"]')).getAttribute('value').then(function(text) {
        V.PointReq2  = text;
        VD.IWant(VD.ToEqual, V.PointReq2, 105 ,'сверяем очки 2й раз');
    }),config.timeout);
    MF.EditRequest_OpenLogs();
    driver.wait(driver.findElement(By.xpath('//h2[contains(text(), "Request score updated ")]/..//span/b/span[text()=\'25 points were added for "A customer views the confirmation page" action\']')).getText().then(function (text) {
        VD.IWant(VD.ToEqual, text, '25 points were added for "A customer views the confirmation page" action');
    }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//h2[contains(text(), "Request score updated ")]/..//span/b/span[text()=\'15 points were added for "A customer buys a coupon" action\']')).getText().then(function (text) {
        VD.IWant(VD.ToEqual, text, '15 points were added for "A customer buys a coupon" action','нет лога про посещение конфирмеишен');
    }),config.timeout);
    LF.closeEditRequest();
    MF.Board_LogoutAdmin();

condition.nowWeDoing = 'идем в аккаунт, сразу на конфирмеишен';
    SF.get(V.accountURL);
    LF.LoginToAccountAsClient(V.client);
    MF.Account_OpenRequest(V.accountNumbers.Id);
    LF.Account_CheckSignature();
    LF.LogoutFromAccount();

condition.nowWeDoing = 'заходим в реквест 3й раз, проверяем еще раз очки';
    SF.get(V.adminURL);
    LF.LoginToBoardAsCustom(V.adminLogin,V.adminPassword);
    MF.Board_OpenConfirmed();
    MF.Board_OpenRequest(V.accountNumbers.Id);
    driver.wait(driver.findElement(By.xpath('//input[@ng-model="request.field_total_score"]')).getAttribute('value').then(function(text) {
        V.PointReq2  = SF.cleanPrice(text);
        VD.IWant(VD.ToEqual, V.PointReq2, 140 ,'сверяем очки 2й раз');
    }),config.timeout);
    LF.closeEditRequest();

condition.nowWeDoing = 'проверяем фильтр на дашборде';
    SF.click(By.xpath('//md-switch[@ng-model="leadScoreFilter.enabled"]'));
    SF.sleep(2);
    SF.click(By.xpath('//md-select[@ng-model="leadScoreFilter.key"]'));
    SF.click(By.xpath('//md-option[@value="hot"]'));
    driver.wait(driver.findElement(By.xpath('//td[contains(text(), "'+V.accountNumbers.Id+'")]')).getText().then(function(text){
        V.accountNumbers.Id1 = text;
        VD.IWant(VD.ToEqual, V.accountNumbers.Id1, V.accountNumbers.Id, 'не наидена работа после фильтрации HOT');
    }),config.timeout);

condition.nowWeDoing = 'заходим в реквест 4й раз, вводим очки вручную ';
    MF.Board_OpenRequest(V.accountNumbers.Id);
    SF.click (By.xpath('//input[@ng-model="request.field_total_score"]'));
    SF.clear (By.xpath('//input[@ng-model="request.field_total_score"]'));
    SF.sleep(1);
    SF.send (By.xpath('//input[@ng-model="request.field_total_score"]'), 45);
    LF.closeEditRequest();

condition.nowWeDoing = 'проверяем фильтр по новому количеству очков';
    MF.Board_RefreshDashboard ();
    SF.click(By.xpath('//md-select[@ng-model="leadScoreFilter.key"]'));
    SF.click(By.xpath('//md-option[@value="cold"]'));
    MF.WaitWhileBusy();
    driver.wait(driver.findElement(By.xpath('//td[contains(text(), "'+V.accountNumbers.Id+'")]')).getText().then(function(text){
        V.accountNumbers.Id2 = text;
        VD.IWant(VD.ToEqual, V.accountNumbers.Id2, V.accountNumbers.Id, 'не наидена работа во время фильтрации COLD после смены очков вручную');
    }),config.timeout);
    MF.Board_LogoutAdmin();

condition.nowWeDoing = 'идем в аккаунт, сразу на конфирмеишен, и выходим из аккаунта';
    SF.get(V.accountURL);
    LF.LoginToAccountAsClient(V.client);
    MF.Account_OpenRequest(V.accountNumbers.Id);
    LF.Account_CheckSignature();
    LF.LogoutFromAccount();

condition.nowWeDoing = 'заходим в реквест 5й раз, проверяем очки, после того как поменяли их вручную, и побывали в аккаунте и на конфирмеишен';
    SF.get(V.adminURL);
    LF.LoginToBoardAsCustom(V.adminLogin,V.adminPassword);
    MF.Board_OpenConfirmed();
    MF.Board_OpenRequest(V.accountNumbers.Id);
    driver.wait(driver.findElement(By.xpath('//input[@ng-model="request.field_total_score"]')).getAttribute('value').then(function(text) {
        V.PointReq5  = SF.cleanPrice(text);
        VD.IWant(VD.ToEqual, V.PointReq5, 80 ,'сверяем очки 5й раз');
    }),config.timeout);
    SF.sleep(1);

    SF.endOfTest();
};