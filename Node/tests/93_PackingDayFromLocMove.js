module.exports = function main(SF, JS, MF, LF, JSstep, VD, V, By, until,FileDetector, system, condition, config,constants) {
    global.fiber = Fiber.current;
    V.client = {};
    V.client.name = SF.randomBukva(6) + '_t';
    V.client.fam = SF.randomBukva(6) + '_t';
    V.client.phone = SF.randomCifra(10);
    V.client.email = SF.randomBukvaSmall(6) + '@' + SF.randomBukvaSmall(4) + '.tes';
    V.client.passwd = 123;

    //=========================начинаем писать тест=============================
    SF.get(V.frontURL);
    condition.nowWeDoing = 'заполняем калькулятор верхний';
    LF.FullSmallCalcAsLocal(V.client);

condition.nowWeDoing = 'первый раз в аккаунте';
    MF.Account_ClickViewRequest();
    MF.WaitWhileBusy();
    MF.Account_ClickPartialPacking();
    SF.sleep(3);
    LF.AccountLocalEnterAddress();
    LF.AccountLocalAddInventory();
    MF.Account_WaitForInventoryCheck();
    MF.WaitWhileBusy();
    SF.sleep(5);
    V.accountNumbers={};
    LF.RememberAccountNumbers(V.accountNumbers);
    LF.LogoutFromAccount();

condition.nowWeDoing = 'первый раз в админке открываем наш реквест и делаем из него пекинг дей';
    SF.get(V.adminURL);
    LF.LoginToBoardAsCustom(V.adminLogin,V.adminPassword);
    MF.Board_OpenRequest(V.accountNumbers.Id);
    Debug.pause();
    V.boardNumbers = {};
    LF.RememberDigitsRequestBoard(V.boardNumbers);
    LF.Validation_Compare_Account_Admin(V.accountNumbers, V.boardNumbers);
    JS.step(JSstep.selectTruck((V.boardNumbers.LaborTimeMax + V.boardNumbers.TravelTime)/60));
    MF.WaitWhileBusy();
    V.managerFirstName = 'emilia';
    MF.EditRequest_OpenSettings();
    LF.SetManager(V.managerFirstName);
    MF.EditRequest_OpenClient();
    LF.SetClientPasswd(V.client.passwd);
    MF.EditRequest_OpenRequest();
    MF.EditRequest_SetToNotConfirmed();
    MF.EditRequest_SaveChanges();
    MF.EditRequest_OpenSettings ();
    MF.EditRequest_ClickCreatePAckingDay();
    MF.EditRequest_WaitForVisibleCloneRequest();
    driver.wait(driver.findElement(By.xpath('//div[contains(@class,"requestModal status_1")]//a[@ng-click="select(tabs[0])"]')).getText().then(function(text){
        V.PackingDayID = SF.cleanPrice(text);
    }),config.timeout);
    MF.EditRequest_CloseCloneRequest();
    MF.EditRequest_OpenRequest();

condition.nowWeDoing = 'тут проверяем что наш пекинг открывается с реквеста по кнопке и закрываем оба реквеста';
    MF.EditRequest_OpenBindingPackingDayRequest();
    MF.EditRequest_WaitForVisibleCloneRequest();
    JS.click('button[ng-click="cancel()"]:visible');
    MF.Board_RefreshDashboard();
    MF.WaitWhileBusy ();

condition.nowWeDoing = 'тут открываем наш пекинг дей и сравниваем данные с род реквестом, что все скопировалось правильно и ' +
    'проверяем что род реквест открывается с пекинг реквеста';
    MF.Board_OpenRequest (V.PackingDayID);
    V.packingday = {};
    LF.RememberDigitsRequestBoard (V.packingday);
    LF.Validation_Compare_Account_Admin_PackingDay(V.packingday, V.boardNumbers);
    JS.step(JSstep.selectTruck((V.packingday.LaborTimeMax + V.packingday.TravelTime)/60));
    MF.WaitWhileBusy();
    MF.EditRequest_SetToNotConfirmed();
    MF.EditRequest_SaveChanges();
    MF.EditRequest_OpenPackingRequestFromRequest();
    SF.waitForLocated (By.xpath('//div[contains(@class,"requestModal status_2")]//a[@ng-click="select(tabs[0])"]'));
    MF.WaitWhileBusy();
    JS.click('button[ng-click="cancel()"]:visible');
    MF.Board_LogoutAdmin();

condition.nowWeDoing = 'идем в аккаунт букать обе работы';
    SF.get(V.accountURL);
    LF.LoginToAccountAsClient(V.client);
    MF.Account_CheckRequestStatus_NotConfirmed(V.boardNumbers.Id);
    MF.Account_OpenRequest(V.boardNumbers.Id);
    V.accountNumbers={};
    LF.RememberAccountNumbers(V.accountNumbers);
    LF.Validation_Compare_Account_Admin(V.accountNumbers, V.boardNumbers);
    LF.ConfirmRequestInAccount_WithReservation();
    SF.sleep(60); //ожидалка для оплаты пекинг дея
    MF.Account_ViewPackingRequest();
    SF.sleep(3);
    V.packingdayAccount = {};
    LF.RememberAccountNumbers(V.packingdayAccount);
    LF.Validation_Compare_Account_Admin(V.packingdayAccount, V.packingday);
    LF.ConfirmRequestInAccount_WithReservation();
    SF.sleep(2);

    //=========================закончили писать тест=============================
    SF.endOfTest();
};
