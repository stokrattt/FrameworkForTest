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
        VD.IWant(VD.ToEqual, V.nameRequest, 'Moving With Storage', 'тип реквеста не совпал с созданным');
    }), config.timeout);

condition.nowWeDoing = 'запоминаем данные которые посчитал кальк';
    LF.RememberFrontNumbersMovAndStorDown(V.frontNumbersDown);
    MF.FrontSite_GoToConfirmation();
    MF.FrontSite_ViewRequestPage();
    SF.openTab (1);

condition.nowWeDoing = 'пошли в аккаунт';
    MF.Account_ClickViewRequest ();

condition.nowWeDoing = 'запомнили данные в аке и сравниваем с калькулятором';
    LF.RememberAccountNumbers(V.accountNumbersTo);
    V.MonthlyStorageMin = V.accountNumbersTo.cbf*0.35;
    V.MonthlyStorageMax = V.accountNumbersTo.cbf*0.45;
    driver.wait(driver.findElement(By.xpath('//div[@ng-if="!vm.request.request_all_data.toStorage && !vm.basicSettings.storage_rate.hide_estimated"][2]')).getText().then(function(text){
        V.accountNumbersTo.MonthlyStorageMin = SF.cleanPrice(text.substring(0, text.indexOf('-')));
        V.accountNumbersTo.MonthlyStorageMax = SF.cleanPrice(text.substring(text.indexOf('-') + 1));
        VD.IWant(VD.ToEqual, V.MonthlyStorageMin, V.accountNumbersTo.MonthlyStorageMin, 'не совпал montly storage fee min по формуле кубик фиты умножить на 0,35, такой рейт стоит в настройках за один кубик фит на  аккаунте');
        VD.IWant(VD.ToEqual, V.MonthlyStorageMax, V.accountNumbersTo.MonthlyStorageMax, 'не совпал montly storage fee max по формуле кубик фиты умножить на 0,45, такой рейт стоит в настройках за один кубик фит на  аккаунте');
        VD.IWant(VD.ToEqual, V.frontNumbersDown.MonthlyStorageMin, V.accountNumbersTo.MonthlyStorageMin, 'не совпал montly storage fee min с фронта и с аккаунтом');
        VD.IWant(VD.ToEqual, V.frontNumbersDown.MonthlyStorageMax, V.accountNumbersTo.MonthlyStorageMax, 'не совпал montly storage fee max с фронта и с аккаунтом');
    }), config.timeout);
    LF.Validation_Compare_Account_Front_MovStorTo(V.accountNumbersTo,V.frontNumbersDown);
    MF.Account_ClickFromStorage();
    V.accountNumbersFrom = {};
    SF.sleep (0.5);
    LF.RememberAccountNumbers(V.accountNumbersFrom);
    // LF.addToCleanerJob(V.accountNumbersFrom.Id);
    LF.Validation_Compare_Account_Front_MovStorFrom (V.accountNumbersFrom,V.frontNumbersDown);
    LF.LogoutFromAccount ();
    SF.get (V.adminURL);
    LF.LoginToBoardAsCustom(V.adminLogin,V.adminPassword);

condition.nowWeDoing = 'зашли под админом заполнили данные и сравниваем с акком первый реквест';
    MF.Board_OpenRequest(V.accountNumbersTo.Id);
    V.boardNumbersTo = {};
    LF.RememberDigitsRequestBoard(V.boardNumbersTo);

condition.nowWeDoing = 'сравниваем аккаунт и админку, прооверяем монсли фи, меняем разные вейт тайпы и смотрим что все правильно пересчитывается';
    LF.Validation_Compare_Account_Admin(V.accountNumbersTo,V.boardNumbersTo);
    driver.wait(driver.findElement(By.xpath('//div[@ng-if="request.service_type.raw != 6"]')).getText().then(function (text) {
        V.boardNumbersTo.MonthlyStorageMin = SF.cleanPrice(text.substring(0, text.indexOf('-')));
        V.boardNumbersTo.MonthlyStorageMax = SF.cleanPrice(text.substring(text.indexOf('-') + 1));
        VD.IWant(VD.ToEqual, V.frontNumbersDown.MonthlyStorageMin, V.accountNumbersTo.MonthlyStorageMin, 'не совпал montly storage fee min с мувбордом и с аккаунтом');
        VD.IWant(VD.ToEqual, V.frontNumbersDown.MonthlyStorageMax, V.accountNumbersTo.MonthlyStorageMax, 'не совпал montly storage fee max с мувбордом и с аккаунтом');
    }),config.timeout);
    MF.EditRequest_OpenSettings();
    MF.EditRequest_ClickCustomCubFit();
    MF.EditRequest_SendNumberCustomCubFit(1000);
    MF.EditRequest_OpenRequest();
    V.boardNumbersToAfterCustomCBF = {};
    driver.wait(driver.findElement(By.xpath('//div[@ng-if="request.service_type.raw != 6"]')).getText().then(function (text) {
        V.boardNumbersToAfterCustomCBF.MonthlyStorageMin = SF.cleanPrice(text.substring(0, text.indexOf('-')));
        V.boardNumbersToAfterCustomCBF.MonthlyStorageMax = SF.cleanPrice(text.substring(text.indexOf('-') + 1));
        VD.IWant(VD.ToEqual, V.boardNumbersToAfterCustomCBF.MonthlyStorageMin, 350, 'не совпал montly storage fee min на мувборде после смены кубик фита на касомный. Мы поставили 1000, значит ее нужно умножить на 0,35');
        VD.IWant(VD.ToEqual, (V.boardNumbersToAfterCustomCBF.MonthlyStorageMax).toFixed(2), 450, 'не совпал montly storage fee max на мувборде после смены кубик фита на касомный. Мы поставили 1000, значит ее нужно умножить на 0,45');
    }),config.timeout);
    LF.addInventoryBoard();
    driver.wait(driver.findElement(By.xpath('//div[@ng-show="!request.isInventory"]')).getText().then(function(text){
        V.CBFInventory = SF.cleanPrice(text);
    }),config.timeout);
    MF.WaitWhileBusy();
    V.boardNumbersToAfterInventoryCBF = {};
    driver.wait(driver.findElement(By.xpath('//div[@ng-if="request.service_type.raw != 6"]')).getText().then(function (text) {
        V.boardNumbersToAfterInventoryCBF.MonthlyStorageMin = SF.cleanPrice(text.substring(0, text.indexOf('-')));
        V.boardNumbersToAfterInventoryCBF.MonthlyStorageMax = SF.cleanPrice(text.substring(text.indexOf('-') + 1));
        VD.IWant(VD.ToEqual, V.boardNumbersToAfterInventoryCBF.MonthlyStorageMin, (V.CBFInventory*0.35), 'не совпал montly storage fee min на мувборде после добавления инвентаря');
        VD.IWant(VD.ToEqual, (V.boardNumbersToAfterInventoryCBF.MonthlyStorageMax).toFixed(2), (V.CBFInventory*0.45), 'не совпал montly storage fee max на мувборде после добавления инвентаря');
    }),config.timeout);
    V.boardNumbersToAfterInventory = {};
    LF.RememberDigitsRequestBoard(V.boardNumbersToAfterInventory);
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
    MF.Board_OpenRequest(V.accountNumbersFrom.Id);
    V.boardNumbersFrom = {};
    LF.RememberDigitsRequestBoard(V.boardNumbersFrom);

condition.nowWeDoing = 'сравниваем аккаунт и админку';
    // LF.Validation_Compare_Account_Admin(V.accountNumbersFrom,V.boardNumbersFrom);
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
    V.accountNumbersToAfterInventory = {};
    LF.RememberAccountNumbers(V.accountNumbersToAfterInventory);
    LF.Validation_Compare_Account_Admin(V.accountNumbersToAfterInventory,V.boardNumbersToAfterInventory);
    driver.wait(driver.findElement(By.xpath('//div[@ng-if="!vm.request.request_all_data.toStorage && !vm.basicSettings.storage_rate.hide_estimated"][2]')).getText().then(function(text){
        V.accountNumbersToAfterInventory.MonthlyStorageMin = SF.cleanPrice(text.substring(0, text.indexOf('-')));
        V.accountNumbersToAfterInventory.MonthlyStorageMax = SF.cleanPrice(text.substring(text.indexOf('-') + 1));
        VD.IWant(VD.ToEqual, V.accountNumbersToAfterInventory.MonthlyStorageMin, V.boardNumbersToAfterInventoryCBF.MonthlyStorageMin, 'не совпал montly storage fee min с мувбордом и с аккаунтом (после добавления инветнтаря) уже на аккаунте');
        VD.IWant(VD.ToEqual, V.accountNumbersToAfterInventory.MonthlyStorageMax, (V.boardNumbersToAfterInventoryCBF.MonthlyStorageMax).toFixed(2), 'не совпал montly storage fee max с мувбордом и с аккаунтом (после добавления инветнтаря) уже на аккаунте');
    }), config.timeout);
    LF.ConfirmRequestInAccount_WithReservation();
    MF.Account_WaitForGreenTextAfterConfirm();

condition.nowWeDoing = 'букаем вторую работу и проверяем подпись';
    MF.Account_ClickViewConfirmationPage ();
    MF.Account_CheckSignOnConfirmationPage();
    MF.Account_ConfirmationBackToRequest ();
    MF.Account_ClickFromStorage ();
    SF.sleep (2);

condition.nowWeDoing = 'букаем вторую работу мувинга и стораджа';
    V.accountNumbersFromAfterInventory = {};
    LF.RememberAccountNumbers(V.accountNumbersFromAfterInventory);
    LF.Validation_Compare_Account_Admin(V.accountNumbersFromAfterInventory,V.boardNumbersFrom);
    LF.ConfirmRequestInAccount_WithReservation();
    MF.Account_WaitForGreenTextAfterConfirm();
    SF.endOfTest();
};
