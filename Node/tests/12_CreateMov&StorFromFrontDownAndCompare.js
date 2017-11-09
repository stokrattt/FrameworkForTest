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
    MF.FrontSite_GoToConfirmation();
    MF.FrontSite_ViewRequestPage();
    SF.openTab (1);

condition.nowWeDoing = 'пошли в аккаунт';
    SF.sleep (8);
    MF.Account_ClickViewRequest ();

condition.nowWeDoing = 'запомнили данные в аке и сравниваем с калькулятором';
    LF.RememberAccountNumbers(V.accountNumbersTo);
    LF.addToCleanerJob(V.accountNumbersTo.Id);
    LF.Validation_Compare_Account_Front_MovStorTo(V.accountNumbersTo,V.frontNumbersDown);
    MF.Account_ClickFromStorage();
    V.accountNumbersFrom = {};
    SF.sleep (0.5);
    LF.RememberAccountNumbers(V.accountNumbersFrom);
    LF.addToCleanerJob(V.accountNumbersFrom.Id);
    LF.Validation_Compare_Account_Front_MovStorFrom (V.accountNumbersFrom,V.frontNumbersDown);
    LF.LogoutFromAccount ();
    SF.get (V.adminURL);
    LF.LoginToBoardAsCustom(V.adminLogin,V.adminPassword);

condition.nowWeDoing = 'зашли под админом заполнили данные и сравниваем с акком первый реквест';
    MF.Board_OpenRequest(V.accountNumbersTo.Id);
    // driver.wait(driver.findElement(By.xpath('//div[contains(@class, "service_type")]')).getText().then(function (text) {
    //     VD.IWant (VD.ToEqual, text, 'MOVE TO STORAGE', 'не нашло или не совпал сервис тип реквеста сторадж TO');
    //     console.log(text);
    // }),config.timeout);
    SF.sleep(0.5);
    V.boardNumbersTo = {};
    LF.RememberDigitsRequestBoard(V.boardNumbersTo);

condition.nowWeDoing = 'сравниваем аккаунт и админку';
    LF.Validation_Compare_Account_Admin(V.accountNumbersTo,V.boardNumbersTo);
    JS.step(JSstep.selectTruck((V.boardNumbersTo.LaborTimeMax + V.boardNumbersTo.TravelTime)/60));
    MF.WaitWhileBusy();
    MF.EditRequest_SetToNotConfirmed ();
    MF.EditRequest_SetAdressFrom ();
    MF.EditRequest_SaveChanges ();
    MF.EditRequest_OpenClient ();
    V.client.passwd = 123;
    LF.SetClientPasswd(V.client.passwd);
    LF.closeEditRequest ();

condition.nowWeDoing = 'сравниваем с акком второй реквест';
    // MF.WaitWhileBusy();
    MF.Board_OpenRequest(V.accountNumbersFrom.Id);
    // driver.wait(driver.findElement(By.xpath('//div[contains(@class, "service_type")]')).getText().then(function (text) {
    //     VD.IWant (VD.ToEqual, text, 'MOVE FROM STORAGE', 'не нашло или не совпал сервис тип реквеста сторадж FROM');
    //     console.log(text);
    // }),config.timeout);
    SF.sleep(0.5);
    V.boardNumbersFrom = {};
    LF.RememberDigitsRequestBoard(V.boardNumbersFrom);
    condition.nowWeDoing = 'сравниваем аккаунт и админку';
    LF.Validation_Compare_Account_Admin(V.accountNumbersFrom,V.boardNumbersFrom);
    JS.step(JSstep.selectTruck((V.boardNumbersFrom.LaborTimeMax + V.boardNumbersFrom.TravelTime)/60));
    MF.WaitWhileBusy();
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
    MF.Account_OpenRequest (V.accountNumbersTo.Id);
    LF.ConfirmRequestInAccount_WithReservation();
    MF.Account_WaitForGreenTextAfterConfirm();

condition.nowWeDoing = 'букаем вторую работу и проверяем подпись';
    MF.Account_ClickViewConfirmationPage ();
    MF.Account_CheckSignOnConfirmationPage();
    MF.Account_ConfirmationBackToRequest ();
    MF.Account_ClickFromStorage ();
    SF.sleep (2);

condition.nowWeDoing = 'букаем вторую работу мувинга и стораджа';
    LF.ConfirmRequestInAccount_WithReservation();
    MF.Account_WaitForGreenTextAfterConfirm();
    SF.endOfTest();
};
