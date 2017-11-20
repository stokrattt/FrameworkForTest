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
    MF.WaitWhileBusy();
    driver.wait(driver.findElement(By.xpath('//div[@class="percent-label"]')).getText().then(function(text) {
        V.ScorePercent1 = SF.cleanPrice(text);
        VD.IWant(VD.ToEqual, V.ScorePercent1, 25,'при входе в аккаунт 1й раз в аккаунт не посчитались проценты за создание реквеста');
    }),config.timeout);
   // driver.wait(driver.executeScript("return $('div[class=\"request-score-box__progress-line__column\"][2]img[ng-hide=\"isInventory\"]').length").then(function (text) {
     //   VD.IWant(VD.ToEqual, text, 0, 'прогрес бар: инвентарь без галочки');
   // }),config.timeout);
   // SF.sleep(2);
   // driver.wait(driver.executeScript("return $('div[class=\"request-score-box__progress-line__column\"][3]img[ng-hide=\"isInventory\"]').length").then(function (text) {
     //   VD.IWant(VD.ToEqual, text, 0, 'прогрес бар: детали без галочки');
   // }//),config.timeout);
    //SF.sleep(2);
   // driver.wait(driver.executeScript("return $('div[class=\"request-score-box__progress-line__column\"][3]img[ng-hide=\"isInventory\"]').length").then(function (text) {
    //}),config.timeout);
   // SF.sleep(3);
    LF.AccountLocalEnterAddress();
    LF.AccountLocalAddInventory();
    driver.wait(driver.findElement(By.xpath('//div[@class="percent-label"]')).getText().then(function(text) {
        V.ScorePercent2 = SF.cleanPrice(text);
        VD.IWant(VD.ToEqual, V.ScorePercent2, 65,'не посчитались проценты за добавление инвентаря');
    }),config.timeout);
   // driver.wait(driver.executeScript("return $('div[class=\"request-score-box__progress-line__column\"][2]div[class=\"request-score-box__progress-line__column__circle border-green\"]').length").then(function (text) {
   //     VD.IWant(VD.ToEqual, text, 0, 'прогрес бар: после добавления инвентаря, галочка не появилась');
   // }),config.timeout);
    SF.sleep(2);
    LF.AccountLocalDetails();
    SF.sleep(3);
    driver.wait(driver.findElement(By.xpath('//div[@class="percent-label"]')).getText().then(function(text) {
        V.ScorePercent3 = SF.cleanPrice(text);
        VD.IWant(VD.ToEqual, V.ScorePercent3, 85,'не посчитались проценты за добавление деталей');
    }),config.timeout);
   // driver.wait(driver.executeScript("return $('div[class=\"request-score-box__progress-line__column\"][3]div[class=\"request-score-box__progress-line__column__circle border-green\"]').length").then(function (text) {
   //     VD.IWant(VD.ToEqual, text, 1, 'прогрес бар: после добавления деталей, галочка не появилась');
    //}),config.timeout);
    SF.sleep(2);
    MF.Account_WaitForInventoryCheck();
    MF.Account_WaitForDetailsCheck();
    MF.WaitWhileBusy();
    V.accountNumbers={};
    LF.RememberAccountNumbers(V.accountNumbers);
    MF.Account_OpenMessage();
    V.toAdmin = SF.randomBukva(6) + '_toAdmin';
    MF.BoardAccount_SendMessage(V.toAdmin);
    SF.sleep(5);
    LF.LogoutFromAccount();

    condition.nowWeDoing = 'первый раз в админке,сверяю очки,проверяю логи, включаю дисконт';
    SF.get(V.adminURL);
    LF.LoginToBoardAsCustom(V.adminLogin,V.adminPassword);
    MF.Board_OpenRequest(V.accountNumbers.Id);
    V.boardNumbers = {};
    LF.RememberDigitsRequestBoard(V.boardNumbers);
    JS.step(JSstep.selectTruck((V.boardNumbers.LaborTimeMax + V.boardNumbers.TravelTime)/60));
    MF.WaitWhileBusy();
    driver.wait(driver.findElement(By.xpath('//div[@ng-if="leadscoringsettings.enabled"]')).getText().then(function(text) {
        V.PointReq1  = SF.cleanPrice(text);
        VD.IWant(VD.ToEqual, V.PointReq1, 60 ,'сверяем очки 1й раз');
    }),config.timeout);
    MF.EditRequest_OpenLogs();
    driver.wait(driver.findElement(By.xpath('//h2[contains(text(), "Request score updated ")]/..//span/b/span[text()=\'10 points added for "A customer sends a message" action\']')).getText().then(function (text) {
        VD.IWant(VD.ToEqual, text, '10 points added for "A customer sends a message" action', 'нет лога про сообщение');
    }),config.timeout);
    SF.sleep(2);
    driver.wait(driver.findElement(By.xpath('//h2[contains(text(), "Request score updated ")]/..//span/b/span[text()=\'25 points added for "When a customer submits inventory" action\']')).getText().then(function (text) {
        VD.IWant(VD.ToEqual, text, '25 points added for "When a customer submits inventory" action','нет лога про инвентарь');
    }),config.timeout);
    SF.sleep(2);
    driver.wait(driver.findElement(By.xpath('//h2[contains(text(), "Request score updated ")]/..//span/b/span[text()=\'10 points added for "A customer does any changes to their request" action\']')).getText().then(function (text) {
        VD.IWant(VD.ToEqual, text, '10 points added for "A customer does any changes to their request" action','нет лога про детали');
    }),config.timeout);
    SF.sleep(2);
    driver.wait(driver.findElement(By.xpath('//h2[contains(text(), "Request score updated ")]/..//span/b/span[text()=\'5 points added for "When a customer views a request" action\']')).getText().then(function (text) {
        VD.IWant(VD.ToEqual, text, '5 points added for "When a customer views a request" action','нет лога про просмотре реквеста');
    }),config.timeout);
    SF.sleep(2);
    MF.EditRequest_OpenSettings ();
    SF.click(By.xpath('//input[@ng-model="request.request_all_data.showCoupons"]/following-sibling::span'));
    SF.sleep(1);
    MF.EditRequest_OpenClient();
    LF.SetClientPasswd(V.client.passwd);
    MF.EditRequest_OpenRequest();
    MF.EditRequest_SetToNotConfirmed();
    MF.EditRequest_SaveChanges();
    LF.closeEditRequest();
    SF.sleep(2);
    MF.Board_LogoutAdmin();


    condition.nowWeDoing = 'пошли в аккаунт, покупаем купон, конфермим, проверяем прогрес бар';
    SF.get(V.accountURL);
    LF.LoginToAccountAsClient(V.client);
    MF.Account_OpenRequest(V.accountNumbers.Id);
    MF.WaitWhileBusy();
    driver.wait(driver.findElement(By.xpath('//div[@class="percent-label"]')).getText().then(function(text) {
        V.ScorePercent = SF.cleanPrice(text);
        VD.IWant(VD.ToEqual, V.ScorePercent, 85,'при входе в аккаунт 2й раз в аккаунт не совпали проценты');
    }),config.timeout);
    SF.sleep(2);
    SF.click(By.id('tab_Coupons'));
    SF.waitForLocated (By.xpath('//a[@ng-click="setRequestNid()"]'));
    MF.WaitWhileBusy ();
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
    SF.sleep(1);
    SF.click(By.xpath('//button[@class="confirm"]'));
    SF.sleep(3);
    MF.WaitWhileBusy();
    LF.ConfirmRequestInAccount_WithReservation();
    MF.Account_WaitForGreenTextAfterConfirm();
    MF.WaitWhileBusy();
    driver.wait(driver.findElement(By.xpath('//div[@class="percent-label"]')).getText().then(function(text) {
        V.ScorePercent4 = SF.cleanPrice(text);
        VD.IWant(VD.ToEqual, V.ScorePercent4, 100,'не добавились проценты после резервации');
    }),config.timeout);
    SF.sleep(2);
   // driver.wait(driver.executeScript("return $('//div[class=\'request-score-box__progress-line__column\'][4]//div[class=\'request-score-box__progress-line__column__circle border-green\']').length").then(function (text) {
      //  VD.IWant(VD.ToEqual, text, 1, 'прогрес бар: резерв не стал зеленый после резервации');
  // }),config.timeout);
    LF.LogoutFromAccount();


    condition.nowWeDoing = 'вернулись в модалку реквеста, проверяем очки 2й раз, и логи';
    SF.get(V.adminURL);
    LF.LoginToBoardAsCustom(V.adminLogin,V.adminPassword);
    MF.Board_OpenConfirmed();
    SF.sleep(3);
    MF.Board_OpenRequest(V.accountNumbers.Id);
    driver.wait(driver.findElement(By.xpath('//div[@ng-if="leadscoringsettings.enabled"]')).getText().then(function(text) {
        V.PointReq2  = SF.cleanPrice(text);
        VD.IWant(VD.ToEqual, V.PointReq2, 115 ,'сверяем очки 2й раз');
    }),config.timeout);
    MF.EditRequest_OpenLogs();
    driver.wait(driver.findElement(By.xpath('//h2[contains(text(), "Request score updated ")]/..//span/b/span[text()=\'25 points added for "A customer views the confirmation page" action\']')).getText().then(function (text) {
        VD.IWant(VD.ToEqual, text, '25 points added for "A customer views the confirmation page" action');
    }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//h2[contains(text(), "Request score updated ")]/..//span/b/span[text()=\'15 points added for "A customer buys a coupon" action\']')).getText().then(function (text) {
        VD.IWant(VD.ToEqual, text, '15 points added for "A customer buys a coupon" action','нет лога про посещение конфирмеишен');
    }),config.timeout);
    SF.sleep(2);

    //condition.nowWeDoing = 'создаем и оплачиваем инвоис';
    //SF.click(By.xpath('//a[@ng-click="select(tabs[0])"]'));
    //SF.sleep(2);
   // MF.EditRequest_OpenPayment();
    //SF.click(By.xpath('//a[@ng-click="createInvoice()"]'));
    //SF.send (By.xpath('//input[@ng-model="charge.name"]'), 'Item for Scoring');
    //SF.sleep(0.5);
    //SF.send (By.xpath('//input[@ng-model="charge.description"]'), 'test scoring');
    //SF.sleep(0.5);
    //SF.clear (By.xpath('//input[@ng-model="charge.cost"]'));
    //SF.send (By.xpath('//input[@ng-model="charge.cost"]'), 100);
   // SF.sleep(0.5);
  //  SF.clear (By.xpath('//input[@ng-model="charge.qty"]'));
    //SF.send (By.xpath('//input[@ng-model="charge.qty"]'), 10);
   // SF.sleep(0.5);
    //SF.click(By.xpath('//textarea[@ng-model="invoice.notes"]'));
    //SF.click(By.xpath('//a[@ng-click="sendInvoice()"]'));
    //MF.WaitWhileBusy ();
    //SF.waitForLocated (By.xpath('//h2[contains(text(), "Template preview")]'));
    //SF.click(By.xpath('//a[@ng-click="save()"]'));

    //SF.click(By.xpath('//div[@class="quick-add-block"]'));
    //SF.click(By.xpath('//div[@ id="footer-tab"]'));
    //SF.click(By.xpath('//div[@class="copy-block-in-template-button"]'));

    //MF.WaitWhileToaster();
    //SF.sleep(3);
    //SF.click(By.xpath('//a[@title="view invoice"]'));


    LF.closeEditRequest();
    MF.WaitWhileBusy();
    MF.Board_LogoutAdmin();

    condition.nowWeDoing = 'идем в аккаунт, сразу на конфирмеишен';
    SF.get(V.accountURL);
    LF.LoginToAccountAsClient(V.client);
    MF.Account_OpenRequest(V.accountNumbers.Id);
    MF.WaitWhileBusy();
    LF.Account_CheckSignature();
    MF.WaitWhileBusy();
    LF.LogoutFromAccount();

    condition.nowWeDoing = 'заходим в реквест 3й раз, проверяем еще раз очки';
    SF.get(V.adminURL);
    LF.LoginToBoardAsCustom(V.adminLogin,V.adminPassword);
    MF.Board_OpenConfirmed();
    SF.sleep(3);
    MF.Board_OpenRequest(V.accountNumbers.Id);
    driver.wait(driver.findElement(By.xpath('//div[@ng-if="leadscoringsettings.enabled"]')).getText().then(function(text) {
        V.PointReq2  = SF.cleanPrice(text);
        VD.IWant(VD.ToEqual, V.PointReq2, 150 ,'сверяем очки 2й раз');
    }),config.timeout);
    SF.sleep(2);
    LF.closeEditRequest();
    MF.WaitWhileBusy();
    MF.WaitWhileBusy();

    condition.nowWeDoing = 'проверяем фильтр на дашборде';
    SF.click(By.xpath('//md-switch[@ng-model="leadScoreFilter.enabled"]'));
    SF.sleep(2);
    SF.click(By.xpath('//md-select[@id="select_9"]'));
    SF.click(By.xpath('//md-option[@value="hot"]'));
    driver.wait(driver.findElement(By.xpath('//td[contains(text(), "'+V.accountNumbers.Id+'")]')).getText().then(function(text){
        V.accountNumbers.Id1 = text;
        VD.IWant(VD.ToEqual, V.accountNumbers.Id1, V.accountNumbers.Id, 'не наидена работа после фильтрации HOT');
    }),config.timeout);
    SF.sleep(2);




    SF.endOfTest();
};