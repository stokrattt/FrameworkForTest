module.exports = function main(SF, JS, MF, LF, JSstep, VD, V, By, until,FileDetector, system, condition, config,constants) {
    global.fiber = Fiber.current;
    V.client = {};
    V.client.name = SF.randomBukva(6) + '_t';
    V.client.fam = SF.randomBukva(6) + '_t';
    V.client.phone = SF.randomCifra(10);
    V.client.email = SF.randomBukvaSmall(6) + '@' + SF.randomBukvaSmall(4) + '.tes';
    V.client.passwd = 123;
    V.secondclient = {};
    V.secondclient.name = SF.randomBukva(6) + '_t';
    V.secondclient.fam = SF.randomBukva(6) + '_t';
    V.secondclient.phone = SF.randomCifra(10);
    V.secondclient.email = SF.randomBukvaSmall(6) + '@' + SF.randomBukvaSmall(4) + '.tes';
    V.secondclient.passwd = 123;

    //=========================начинаем писать тест=============================
    SF.get(V.frontURL);
    condition.nowWeDoing = 'заполняем калькулятор верхний';
    LF.FullSmallCalcAsLocal(V.client);

condition.nowWeDoing = 'первый раз в аккаунте';
    MF.Account_ClickViewRequest();
    MF.Account_ClickPartialPacking();
    LF.AccountLocalEnterAddress();
    LF.AccountLocalAddInventory();
    MF.Account_WaitForInventoryCheck();
    V.accountNumbers={};
    LF.RememberAccountNumbers(V.accountNumbers);
    LF.LogoutFromAccount();

condition.nowWeDoing = 'первый раз в админке открываем наш реквест и делаем из него пекинг дей';
    SF.get(V.adminURL);
    LF.LoginToBoardAsCustom(V.adminLogin,V.adminPassword);
    MF.Board_OpenRequest(V.accountNumbers.Id);
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
    MF.EditRequest_ClickCreatePAckingDay();
    SF.waitForLocated (By.xpath('//div[contains(@class,"requestModal status_1")]//a[@ng-click="select(tabs[0])"]'));
    MF.WaitWhileBusy();
    driver.wait(driver.findElement(By.xpath('//div[contains(@class,"requestModal status_1")]//a[@ng-click="select(tabs[0])"]')).getText().then(function(text){
        V.PackingDayID = SF.cleanPrice(text);
    }),config.timeout);
    MF.EditRequest_CloseCloneRequest();

condition.nowWeDoing = 'тут проверяем что наш пекинг открывается с реквеста по кнопке и закрываем оба реквеста';
    MF.EditRequest_OpenBindingPackingDayRequest();
    SF.waitForLocated (By.xpath('//div[contains(@class,"requestModal status_1")]//a[@ng-click="select(tabs[0])"]'));
    MF.WaitWhileBusy();
    JS.click('button[ng-click="cancel()"]:visible');
    MF.Board_RefreshDashboard();

condition.nowWeDoing = 'тут открываем наш пекинг дей и сравниваем данные с род реквестом, что все скопировалось правильно и ' +
    'проверяем что род реквест открывается с пекинг реквеста';
    MF.Board_OpenRequest (V.PackingDayID);
    driver.wait(driver.findElement(By.xpath('//div[contains(@class, "service-type-label")]')).getText().then(function (text) {
        VD.IWant (VD.ToEqual, text, "PACKING DAY", 'тип реквеста не совпал, должен быть Packing Day');
    }),config.timeout);
    V.packingday = {};
    LF.RememberDigitsRequestBoard (V.packingday);
    VD.IWant(VD.NotToEqual, V.frontNumbers.moveDate.Day, V.packingday.moveDate.Day, 'даты одинаковые а должны быть разные');
    LF.Validation_Compare_Account_Admin_PackingDay(V.packingday, V.boardNumbers);
    JS.step(JSstep.selectTruck((V.packingday.LaborTimeMax + V.packingday.TravelTime)/60));
    MF.WaitWhileBusy();
    MF.EditRequest_SetToNotConfirmed();
    MF.EditRequest_SaveChanges();
    MF.EditRequest_OpenPackingRequestFromRequest();
    SF.waitForLocated (By.xpath('//div[contains(@class,"requestModal status_2")]//a[@ng-click="select(tabs[0])"]'));
    MF.WaitWhileBusy();
    JS.click('button[ng-click="cancel()"]:visible');
    MF.WaitWhileBusy();
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
    SF.sleep(100); //ожидалка для оплаты пекинг дея
    MF.Account_ViewPackingRequest();
    V.packingdayAccount = {};
    LF.RememberAccountNumbers(V.packingdayAccount);
    LF.Validation_Compare_Account_Admin(V.packingdayAccount, V.packingday);
    LF.ConfirmRequestInAccount_WithReservation();
    SF.sleep(1);
    LF.LogoutFromAccount();

    condition.nowWeDoing = 'возвращаемся на moveboard, создаем реквест, привязываем к реквесту пэкинг дей.';
    SF.get(V.adminURL);
    LF.LoginToBoardAsCustom(V.adminLogin, V.adminPassword);
    LF.CreateLocalMovingFromBoard(V.secondclient);
    MF.EditRequest_SetAdressToFrom();
    MF.EditRequest_SaveChanges();
    V.boardNumbersparentRequest = {};
    LF.RememberDigitsRequestBoard(V.boardNumbersparentRequest);
    MF.EditRequest_ClickCreatePAckingDay();
    V.numbersPackingDayRequest = {};
    LF.RememberDigitsRequestBoard(V.numbersPackingDayRequest);
    driver.wait(driver.findElement(By.xpath('//div[@ng-if="request.request_all_data.packing_request_id"]/label')).getText().then(function (text) {
        text = SF.cleanPrice(text);
        VD.IWant(VD.ToEqual, text,V.boardNumbersparentRequest.Id , 'не совпал номер реквеста с которого создавался пэкинг дей, в области,где указан адрес FROM');
    }),config.timeout);
    SF.click(By.xpath('//i[@ng-click="unbindPackingDay()"]'));
    MF.WaitWhileToaster();
    MF.EditRequest_CloseEditRequest();
    MF.EditRequest_CloseEditRequest();
    MF.Board_RefreshDashboard();
    MF.Board_OpenRequest(V.numbersPackingDayRequest.Id);
    SF.click(By.xpath('//div[@ng-if="!request.request_all_data.packing_request_id"]'));
    SF.waitForVisible(By.xpath('//input[@ng-model="secondRequestNid"]'));
    SF.send(By.xpath('//input[@ng-model="secondRequestNid"]'),V.boardNumbersparentRequest.Id);
    SF.click(By.xpath('//button[@ng-click="update()"]'));
    MF.WaitWhileBusy();
    MF.WaitWhileToaster();
    driver.wait(driver.findElement(By.xpath('//div[@ng-if="request.request_all_data.packing_request_id"]/label')).getText().then(function (text) {
        text = SF.cleanPrice(text);
        VD.IWant(VD.ToEqual, text,V.boardNumbersparentRequest.Id , 'после привязки пэкинг дея к родительскому реквесту указан не верный номер родительского реквеста в адрес форме');
    }),config.timeout);
    MF.EditRequest_CloseEditRequest();
    MF.Board_RefreshDashboard();
    MF.Board_OpenRequest(V.boardNumbersparentRequest.Id);
    driver.wait(driver.findElement(By.xpath('//span[@ng-click="openBindingRequest(request.request_all_data.packing_request_id)"]')).getText().then(function (text) {
        text = SF.cleanPrice(text);
        VD.IWant(VD.ToEqual, text,V.numbersPackingDayRequest.Id , 'в родительском реквесте указан не тот номер пэкинг дея,который должен быть');
    }),config.timeout);

    //=========================закончили писать тест=============================
    SF.endOfTest();
};
