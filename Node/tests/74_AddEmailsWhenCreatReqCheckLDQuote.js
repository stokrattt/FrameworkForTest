module.exports = function main(SF, JS, MF, LF, JSstep, VD, V, By, until,FileDetector, system, condition, config,constants) {    global.fiber = Fiber.current;
    V.boardNumbersBeforeAddInvent = {};
    V.client = {};
    V.client.name = SF.randomBukva(6) + '_t';
    V.client.fam = SF.randomBukva(6) + '_t';
    V.client.phone = SF.randomCifra(10);
    V.client.email = SF.randomBukvaSmall(6) + '@' + SF.randomBukvaSmall(4) + '.tes';
    V.client.passwd = 123;

    SF.get(V.adminURL);
    LF.LoginToBoardAsCustom(V.adminLogin,V.adminPassword);

condition.nowWeDoing = 'создаем ЛД реквест';
    MF.Board_ClickCreate();
    MF.CreateRequest_SelectServiceType(7);
    MF.CreateRequest_ClickMoveDateInput();
    V.request = {};
    driver.wait(driver.executeScript(JSstep.Click4DaysCalendar).then(function (calDate) {
        V.request.moveDate = calDate;
    }),config.timeout);
    SF.sleep(0.5);
    MF.CreateRequest_SelectExtraRooms(1);
    MF.CreateRequest_SendZipToZipFrom("02032", "90001");
    MF.CreateRequest_ClickCalculate();
    MF.CreateRequest_ClickContinue();
    MF.CreateRequest_SendClientInfo(V.client);
    MF.CreateRequest_OpenMailDialog();

condition.nowWeDoing = 'добавляем письма';
    SF.click(By.xpath('//span[contains(.,"Default")]'));
    SF.sleep(1);
    SF.click(By.xpath('//h4[contains(text(), "Review $50")][1]'));
    SF.sleep(1);
    SF.click(By.xpath('//h4[contains(text(), "Holiday test")][1]'));
    SF.sleep(1);
    SF.click(By.xpath('//div[@ng-hide="isSendEmails"]/a[@ng-click="save()"]'));
    SF.sleep(5);
    MF.CreateRequest_ClickCreate();
    V.request.Id = {};
    driver.wait(driver.findElement(By.xpath('//a[@ng-click="select(tabs[0])"]')).getText().then(function(text){
        V.request.Id = SF.cleanPrice(text);
        LF.addToCleanerJob(V.request.Id);
    }), config.timeout);

condition.nowWeDoing = 'идём в логи, потом выставляем свой рейт и запоминаем данные по реквесту';
    MF.EditRequest_OpenLogs();
    MF.EditRequest_Check1EmailExist(V.client.email, "Happy Holiday");
    MF.EditRequest_Check1EmailExist(V.client.email, "Thank You");
    SF.sleep(2);
    MF.EditRequest_OpenClient();
    LF.SetClientPasswd (V.client.passwd);
    MF.EditRequest_OpenRequest();
    MF.EditRequest_SendRateForLD (15);
    SF.sleep(8); // save
    MF.EditRequest_RememberId (V.boardNumbersBeforeAddInvent);
    LF.RememberDigitsRequestBoard (V.boardNumbersBeforeAddInvent);
    SF.sleep (1);
    MF.EditRequest_SaveChanges();
    LF.closeEditRequest();
    MF.Board_LogoutAdmin();

condition.nowWeDoing = 'идем на аккаунт, добавляем инвенторий и сравниваем первый раз данные с новым рейтом';
    SF.get(V.accountURL);
    LF.LoginToAccountAsClient(V.client);
    MF.Account_OpenRequest(V.boardNumbersBeforeAddInvent.Id);
    MF.Account_ClickViewRequest();
    SF.sleep(2);
    V.accountNumbersLDBeforeAddInvent = {};
    LF.RememberAccountNumbersLD(V.accountNumbersLDBeforeAddInvent);
    SF.sleep(1);
    LF.Validation_Compare_Account_Admin_LongDistance (V.accountNumbersLDBeforeAddInvent, V.boardNumbersBeforeAddInvent);
    LF.AccountLocalAddInventory();
    LF.AccountLocalAddAdditionalInventory();
    SF.sleep(4);
    MF.WaitWhileBusy();
    V.accountNumbersLD = {};
    LF.RememberAccountNumbersLD (V.accountNumbersLD);
    LF.LogoutFromAccount();
    SF.get(V.adminURL);

condition.nowWeDoing = 'зашли в админку и сравниваем рейт и другие цифры после того как добавили инвентарь на аккаунте, ставим нот конферм и трак';
    LF.LoginToBoardAsCustom(V.adminLogin, V.adminPassword);
    MF.Board_OpenRequest(V.boardNumbersBeforeAddInvent.Id);
    V.boardNumbers = {};
    LF.RememberDigitsRequestBoard (V.boardNumbers);

    driver.wait(driver.findElement(By.xpath('//input[@ng-model="request.field_long_distance_rate.value"]')).getAttribute('value').then(function (rate) {
        V.RateLDAfterAddInventory = rate;
        VD.IWant(VD.NotToEqual, V.RateLDAfterAddInventory, 15.00, 'сломался рейт после того как добавили инвенторий на аккаунте а с ним и все другие пересчеты');
    }),config.timeout);
    LF.Validation_Compare_Account_Admin_LongDistance (V.accountNumbersLD, V.boardNumbers);
    JS.step(JSstep.selectTruck((V.boardNumbers.LaborTimeMax + V.boardNumbers.TravelTime)/60));
    MF.WaitWhileBusy();
    MF.EditRequest_SetToNotConfirmed();
    MF.EditRequest_SetAdressToFrom();
    MF.EditRequest_SaveChanges();
    LF.closeEditRequest();
    MF.Board_LogoutAdmin();
    SF.get(V.accountURL);

condition.nowWeDoing = 'идем в аккаунт букать работу и после этого запомнить данные снова';
    LF.LoginToAccountAsClient(V.client);
    MF.Account_OpenRequest(V.boardNumbersBeforeAddInvent.Id);
    LF.ConfirmRequestInAccount_WithReservation();
    V.accountNumbersLDAfterReserv = {};
    LF.RememberAccountNumbersLD(V.accountNumbersLDAfterReserv);
    LF.LogoutFromAccount();

condition.nowWeDoing = 'идем в админку после резервации сравнить рейт и другие данные';
    SF.get(V.adminURL);
    LF.LoginToBoardAsCustom(V.adminLogin, V.adminPassword);
    MF.Board_OpenConfirmed();
    MF.Board_OpenRequest(V.boardNumbersBeforeAddInvent.Id);
    V.boardNumbersAfterConfirm = {};
    LF.RememberDigitsRequestBoard(V.boardNumbersAfterConfirm);
    driver.wait(driver.findElement(By.xpath('//input[@ng-model="request.field_long_distance_rate.value"]')).getAttribute('value').then(function (rate) {
        V.RateLDAfterReserv = rate;
        VD.IWant(VD.NotToEqual, V.RateLDAfterReserv, 15.00, 'сломался рейт после того как забукали работу на аккаунте а с ним и все другие пересчеты');
    }),config.timeout);
    LF.Validation_Compare_Account_Admin_LongDistance (V.accountNumbersLD, V.boardNumbers);
    SF.sleep(1);

    SF.endOfTest();
};

