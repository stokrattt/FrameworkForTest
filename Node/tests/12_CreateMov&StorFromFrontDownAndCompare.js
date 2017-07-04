module.exports = function main(SF, JS, MF, LF, JSstep, VD, V, By, until,FileDetector, system, condition, config,constants) {    global.fiber = Fiber.current;
    V.ReservationPrice = {};
    V.client = {};
    V.frontNumbersDown ={};
    V.accountNumbersTo = {};
    V.client.name = SF.randomBukva(6) + '_t';
    V.client.fam = SF.randomBukva(6) + '_t';
    V.client.phone = SF.randomCifra(10);
    V.client.email = SF.randomBukvaSmall(6) + '@' + SF.randomBukvaSmall(4) + '.tes';

    SF.get(V.frontURL);
    SF.sleep (4);
condition.nowWeDoing = 'заполняем нижний калькулятор на фронте';
    LF.CreateMovAndStorFromFrontDown (V.client);
    driver.wait(driver.findElement(By.xpath('//div[@class="box_info general"]/div/span')).getText().then(function(text){
        V.nameRequest = text;
        VD.IWant(VD.ToEqual, V.nameRequest, 'Moving & Storage', 'тип реквеста не совпал с созданным');
    }), config.timeout);
    SF.sleep(1);
condition.nowWeDoing = 'запоминаем данные которые посчитал кальк';
    LF.RememberFrontNumbersMovAndStorDown(V.frontNumbersDown);
    Debug.pause ();
    SF.click(By.id('submitRequestButton'));
    SF.sleep (2);
    SF.click(By.linkText('View Request Page'));
    SF.sleep(6);
    SF.openTab (1);
condition.nowWeDoing = 'пошли в аккаунт';
    SF.sleep (8);
    MF.Account_ClickViewRequest ();
condition.nowWeDoing = 'запомнили данные в аке и сравниваем с калькулятором';
    LF.RememberAccountNumbers(V.accountNumbersTo);
    LF.addToCleanerJob(V.accountNumbersTo.Id);
    LF.Validation_Compare_Account_Front_MovStorTo(V.accountNumbersTo,V.frontNumbersDown);
    MF.Account_ClickFromStorage();
    SF.sleep (2);
    V.accountNumbersFrom = {};
    SF.sleep (0.5);
    LF.RememberAccountNumbers(V.accountNumbersFrom);
    LF.addToCleanerJob(V.accountNumbersFrom.Id);
    LF.Validation_Compare_Account_Front_MovStorFrom (V.accountNumbersFrom,V.frontNumbersDown);
    Debug.pause();
    LF.LogoutFromAccount ();
    SF.get (V.adminURL);
    LF.LoginToBoardAsCustom(V.adminLogin,V.adminPassword);

condition.nowWeDoing = 'зашли под админом заполнили данные и сравниваем с акком первый реквест';
    MF.Board_OpenRequest(V.accountNumbersTo.Id);
    driver.wait(driver.findElement(By.xpath('//div[contains(@class, "service_type")]')).getText().then(function (text) {
        VD.IWant (VD.ToEqual, text, 'MOVE TO STORAGE', 'не нашло или не совпал сервис тип реквеста сторадж TO');
        console.log(text);
    }),config.timeout);
    SF.sleep(0.5);
    V.boardNumbersTo = {};
    LF.RememberDigitsRequestBoard(V.boardNumbersTo);

condition.nowWeDoing = 'сравниваем аккаунт и админку';
    LF.Validation_Compare_Account_Admin(V.accountNumbersTo,V.boardNumbersTo);
    JS.step(JSstep.selectTruck((V.boardNumbersTo.LaborTimeMax + V.boardNumbersTo.TravelTime)/60));
    MF.EditRequest_SetToNotConfirmed ();
    MF.EditRequest_SetAdressFrom ();
    MF.EditRequest_SaveChanges ();
    MF.EditRequest_OpenClient ();
    V.client.passwd = 123;
    LF.SetClientPasswd(V.client.passwd);
    LF.closeEditRequest ();

condition.nowWeDoing = 'сравниваем с акком второй реквест';
    MF.Board_OpenRequest(V.accountNumbersFrom.Id);
    driver.wait(driver.findElement(By.xpath('//div[contains(@class, "service_type")]')).getText().then(function (text) {
        VD.IWant (VD.ToEqual, text, 'MOVE FROM STORAGE', 'не нашло или не совпал сервис тип реквеста сторадж FROM');
        console.log(text);
    }),config.timeout);
    SF.sleep(0.5);
    V.boardNumbersFrom = {};
    LF.RememberDigitsRequestBoard(V.boardNumbersFrom);
    condition.nowWeDoing = 'сравниваем аккаунт и админку';
    LF.Validation_Compare_Account_Admin(V.accountNumbersFrom,V.boardNumbersFrom);
    JS.step(JSstep.selectTruck((V.boardNumbersFrom.LaborTimeMax + V.boardNumbersFrom.TravelTime)/60));
    MF.EditRequest_SetToNotConfirmed ();
    MF.EditRequest_SetAdressTo ();
    MF.EditRequest_SaveChanges ();
    LF.closeEditRequest ();
    MF.Board_LogoutAdmin ();
    SF.get(V.accountURL);

condition.nowWeDoing = 'зашли под клиентом и букаем первую работу';
    LF.LoginToAccountAsClient (V.client, V.client.passwd);
    SF.waitForVisible(By.xpath('//td[contains(text(),"'+V.accountNumbersTo.Id+'")]/following-sibling::td[1]'));
    driver.wait(driver.findElement(By.xpath('//td[contains(text(),"'+V.accountNumbersTo.Id+'")]/following-sibling::td[1]')).getText().then(function(Status){
        VD.IWant(VD.ToEqual,Status,'Not Confirmed');
    }), config.timeout);
    //*******************************************************************************
    MF.Account_OpenRequest (V.accountNumbersTo.Id);
    SF.click (By.xpath('//div[@class="field-status notconfirmed ng-scope"]/a'));
    SF.click (By.xpath('//i[@class="fa fa-angle-down arrow-down"]'));
    SF.sleep (0.5);
    SF.click (By.id('terms'));
    SF.click (By.id('cancel_policy'));
    SF.click (By.id('paybutton'));

    SF.waitForVisible(By.xpath('//canvas[@id="signatureCanvasReserv"]'));
    LF.MakeSignJS('signatureCanvasReserv');
    SF.sleep(0.5);
    // MF.SweetConfirm ();
    SF.sleep (1);
    SF.click(By.xpath('//button[@ng-click="saveReservSignature();logClickButtons(\'Save reservation sign button clicked\')"]'));
    SF.sleep (1);
    LF.FillCardPayModal ();
    SF.waitForVisible (By.xpath('//div[@class="field-status confirm ng-scope"]'));
    driver.wait(driver.findElement(By.xpath('//div[@class="field-status confirm ng-scope"]/div')).getText().then(function(confirmed){
        VD.IWant (VD.ToEqual, confirmed, 'YOUR MOVE IS CONFIRMED AND SCHEDULED', 'статус не конферм, хотя должен был быть');
    }), config.timeout);
    condition.nowWeDoing = 'зашли под клиентом и букаем вторую работу';
    MF.WaitWhileBusy ();
    SF.sleep(2);
    MF.Account_ClickFromStorage ();
    SF.sleep (2);
condition.nowWeDoing = 'букаем вторую работу мувинга и стораджа';
    SF.click (By.xpath('//div[@class="field-status notconfirmed ng-scope"]/a'));
    SF.click (By.xpath('//i[@class="fa fa-angle-down arrow-down"]'));
    SF.sleep (0.5);
    SF.click (By.id('terms'));
    SF.click (By.id('cancel_policy'));
    SF.click (By.id('paybutton'));

    SF.waitForVisible(By.xpath('//canvas[@id="signatureCanvasReserv"]'));
    LF.MakeSignJS('signatureCanvasReserv');
    SF.sleep(0.5);
    SF.click (By.xpath('//button[@ng-click="saveReservSignature();logClickButtons(\'Save reservation sign button clicked\')"]'));
    SF.sleep (1);
    LF.FillCardPayModal ();
    MF.WaitWhileSpinner ();
    SF.waitForVisible (By.xpath('//div[@class="field-status confirm ng-scope"]'));
    driver.wait(driver.findElement(By.xpath('//div[@class="field-status confirm ng-scope"]/div')).getText().then(function(confirmed){
        VD.IWant (VD.ToEqual, confirmed, 'YOUR MOVE IS CONFIRMED AND SCHEDULED', 'статус не конферм, хотя должен был быть');
    }), config.timeout);
    MF.WaitWhileBusy ();
    // LF.LogoutFromAccount ();

    SF.endOfTest();
};
