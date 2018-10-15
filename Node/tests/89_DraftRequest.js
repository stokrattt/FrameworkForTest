module.exports = function main(SF, JS, MF, LF, JSstep, VD, V, By, until, FileDetector, system, condition, config, constants) {
    global.fiber = Fiber.current;
    V.client = {};
    V.client.name = SF.randomBukva(6) + '_t';
    V.client.fam = SF.randomBukva(6) + '_t';
    V.client.phone = SF.randomCifra(10);
    V.client.email = SF.randomBukvaSmall(6) + '@' + SF.randomBukvaSmall(4) + '.tes';
    V.client.passwd = 123;

    //=========================начинаем писать тест=============================

condition.nowWeDoing = 'идем в настройки контракта и меняем тайтл для локал мува, чтобы потом проверить что он (тайтл) добавлен на аккаунте';
    SF.get(V.adminURL);
    LF.LoginToBoardAsCustom(V.adminLogin,V.adminPassword);
    MF.Board_OpenSettingsGeneral ();
    MF.Board_OpenSettingsAccountPageAccountTopText();
    V.RandomTextTitleForAccount = SF.randomBukva(6) + '_title';
    MF.BoardSettingsAccountTopText_SendLocalMoveTitleText(V.RandomTextTitleForAccount);

condition.nowWeDoing = 'создаем драфт реквест и  сразу открываем в новой вкладке аккаунт проверить что есть наш тайтл что мы добавили';
    MF.Board_CreateDraftRequest();
    MF.EditRequest_OpenAccountPageInNewWindow();
    driver.wait(driver.findElement(By.xpath('//div[contains(@class, "service-type-title")]')).getText().then(function (text) {
        VD.IWant(VD.ToEqual, text, (V.RandomTextTitleForAccount).toUpperCase(), 'не нашло на аккаунте тайтл который мы добавили, статус реквеста пендинг');
    }),config.timeout);
    driver.close();
    SF.openTab(0);
    MF.EditRequest_OpenClient();
    LF.SendClientInfoForDraftRequest(V.client);
    LF.SetClientPasswd(V.client.passwd);
    MF.EditRequest_OpenRequest();
    LF.addInventoryBoard();
    LF.addAdditionalInventoryBoard();
    LF.EditRequest_AddPacking ();
    LF.EditRequest_AddAdditionalServicesFullPack ();
    MF.EditRequest_ChangeZipCodeDestinationTo("01247");
    MF.EditRequest_SetAdressToFrom ();
    SF.sleep(2);
    V.boardNumbers = {};
    LF.RememberDigitsRequestBoard (V.boardNumbers);

condition.nowWeDoing = 'тут меняем этажи и проверяем что время пересчитывается и рейт и крю';
    MF.EditRequest_ChangeStairsFrom(5);
    V.boardNumbersChangeStairsFrom = {};
    LF.RememberDigitsRequestBoard (V.boardNumbersChangeStairsFrom);
    VD.IWant(VD.NotToEqual, V.boardNumbers.LaborTimeMin, V.boardNumbersChangeStairsFrom.LaborTimeMin, 'не пересчитало LaborTimeMin в реквесте после смены этажей from');
    VD.IWant(VD.NotToEqual, V.boardNumbers.LaborTimeMax, V.boardNumbersChangeStairsFrom.LaborTimeMax, 'не пересчитало LaborTimeMax в реквесте после смены этажей from');
    VD.IWant(VD.NotToEqual, V.boardNumbers.CrewSize, V.boardNumbersChangeStairsFrom.CrewSize, 'не пересчитало crew size в реквесте после смены этажей from');
    VD.IWant(VD.NotToEqual, V.boardNumbers.HourlyRate, V.boardNumbersChangeStairsFrom.HourlyRate, 'не пересчитало Rate в реквесте после смены этажей from');
    MF.EditRequest_ChangeStairsTo(5);
    V.boardNumbersChangeStairsTo = {};
    LF.RememberDigitsRequestBoard (V.boardNumbersChangeStairsTo);
    VD.IWant(VD.NotToEqual, V.boardNumbers.LaborTimeMin, V.boardNumbersChangeStairsTo.LaborTimeMin, 'не пересчитало LaborTimeMin в реквесте после смены этажей to');
    VD.IWant(VD.NotToEqual, V.boardNumbers.LaborTimeMax, V.boardNumbersChangeStairsTo.LaborTimeMax, 'не пересчитало LaborTimeMax в реквесте после смены этажей to');
    JS.step(JSstep.selectTruck((V.boardNumbersChangeStairsTo.LaborTimeMax + V.boardNumbersChangeStairsTo.TravelTime)/60));
    MF.WaitWhileBusy();
    MF.EditRequest_SetToNotConfirmed ();
    MF.EditRequest_SaveChanges ();
    MF.EditRequest_CloseEditRequest();
    MF.Board_LogoutAdmin();

condition.nowWeDoing = 'идем на аккаунт сверять все чилса с админкой и  проверить тайтл на нот конферм работе';
    SF.get(V.accountURL);
    LF.LoginToAccountAsClient (V.client);
    MF.Account_CheckRequestStatus_NotConfirmed(V.boardNumbers.Id);
    MF.Account_OpenRequest(V.boardNumbers.Id);
    MF.Account_ClickViewRequest();
    driver.wait(driver.findElement(By.xpath('//div[contains(@class, "service-type-title")]')).getText().then(function (text) {
        VD.IWant(VD.ToEqual, text, (V.RandomTextTitleForAccount).toUpperCase(), 'не нашло на аккаунте тайтл который мы добавили, статус реквеста not confirm');
    }),config.timeout);
    V.accountNumbers={};
    LF.RememberAccountNumbers(V.accountNumbers);
    LF.Validation_Compare_Account_Admin(V.accountNumbers, V.boardNumbersChangeStairsTo);
    LF.ConfirmRequestInAccount_WithReservation();
    MF.Account_WaitForGreenTextAfterConfirm();
    driver.wait(driver.findElement(By.xpath('//div[contains(@class, "service-type-title")]')).getText().then(function (text) {
        VD.IWant(VD.ToEqual, text, (V.RandomTextTitleForAccount).toUpperCase(), 'не нашло на аккаунте тайтл который мы добавили, статус реквеста confirm');
    }),config.timeout);
    SF.sleep(1);
    LF.LogoutFromAccount();

condition.nowWeDoing = 'второй раз в админке, добаавим платеж и сделаем его пендинг или тот который был за резервацию, а потом откроем контракт и проверим чтобы он там не учитывался';
    SF.get(V.adminURL);
    LF.LoginToBoardAsCustom(V.adminLogin,V.adminPassword);
    MF.Board_OpenConfirmed();
    SF.select(By.xpath('//select[@ng-model="vm.searchParams.conf_filter"]'), 1);
    MF.WaitWhileBusy ();
    SF.sleep(1);
    MF.Board_OpenRequest(V.boardNumbers.Id);
    MF.EditRequest_OpenPaymentModalWindow();
    SF.click(By.xpath('//input[@ng-click="changePending(receipt)"]'));
    driver.wait(driver.findElement(By.xpath('//div[contains(text(),"Total")]')).getText().then(function(text){
        V.cleanTotal = SF.cleanPrice(text);
        VD.IWant(VD.ToEqual, '0', V.cleanTotal, 'тотал после включения галочки pending должен бить 0');
    }),config.timeout);
    MF.EditRequest_ClosePayment();
    driver.wait(driver.findElement(By.xpath('//label[@ng-click="OpenPaymentModal();"]/following-sibling::div')).getText().then(function(text){
        V.cleanPayment = SF.cleanPrice(text);
        VD.IWant(VD.ToEqual, V.cleanPayment, '0', 'Payment в модалке реквеста после включения галочки pending должен бить 0');
    }),config.timeout);
    MF.EditRequest_CloseConfirmWork();
    MF.EditRequest_OpenContractCloseJob();
    SF.openTab (1);
    SF.sleep (3);
    MF.SweetConfirm();
    MF.Contract_OpenBillOfLading();
    MF.Contract_WaitBillOfLading ();
    driver.wait(driver.findElement(By.xpath('//span[@ng-if="finance.deposit == 0 || !finance.deposit "]')).getText().then(function (text) {
        VD.IWant(VD.ToEqual, SF.cleanPrice(text), 0, 'не сработала галочка пендинг возле платежа за резервацию, потому что должно быть ноль на контракте');
    }),config.timeout);
    driver.close();
    SF.openTab(0);
    MF.EditRequest_OpenConfirmWork();
    MF.EditRequest_OpenPaymentModalWindow();
    MF.EditRequest_ClickAddOnlinePayment();
    MF.EditRequest_SetSumOnlinePaymentAndClickPaymentInfo(500);
    MF.EditRequest_PayCustomOnlinePayment('forTestNotDelete');
    MF.EditRequest_ClosePayment();
    MF.EditRequest_CloseConfirmWork();
    MF.EditRequest_OpenContractCloseJob();
    SF.openTab (1);
    SF.sleep (3);
    MF.SweetConfirm();
    MF.Contract_OpenBillOfLading();
    MF.Contract_WaitBillOfLading ();
    driver.wait(driver.findElement(By.xpath('//span[@ng-if="finance.deposit != 0 && finance.deposit "]')).getText().then(function (text) {
        VD.IWant(VD.ToEqual, SF.cleanPrice(text), -500, 'оплата в реквесте была кастомным онлайн платежом, но он не отобразился на контракте');
    }),config.timeout);
    driver.close();
    SF.openTab(0);
    MF.EditRequest_OpenConfirmWork();
    MF.EditRequest_OpenPaymentModalWindow();
    SF.click(By.xpath('//span[@ng-if="receipt.transaction_id != \'Custom Payment\'"]'));
    SF.sleep(0.5);
    MF.EditRequest_RemoveSelectedPayment();
    SF.sleep(1);
    SF.click(By.xpath('//input[@ng-click="changePending(receipt)"]'));
    MF.EditRequest_ClosePayment();
    LF.RememberDigitsRequestBoard_Down (V.boardNumbers);
    VD.IWant(VD.ToEqual, V.boardNumbers.Payment, 150, 'выключили галочку пендинг и удалили кастомный онлайн платеж, но что то не сработало раз первая переменная тут не  150, должно быть 150');
    MF.EditRequest_CloseConfirmWork();
    MF.EditRequest_OpenContractCloseJob();
    SF.openTab (1);
    SF.sleep (3);
    MF.SweetConfirm();
    MF.Contract_OpenBillOfLading();
    MF.Contract_WaitBillOfLading ();
    driver.wait(driver.findElement(By.xpath('//span[@ng-if="finance.deposit != 0 && finance.deposit "]')).getText().then(function (text) {
        VD.IWant(VD.ToEqual, SF.cleanPrice(text), -150, 'быыл удален кастомный онлайн паймент (500) и выключена галочка пендинг, ' +
            'после этого на контракте долно быть 150 дол за резервацию, если видите эту ошибку значит что то не то. Или не сработала галочка пендинг или платеж не удалился');
    }),config.timeout);
    SF.sleep(1);





    //=========================закончили писать тест=============================
    SF.endOfTest();
};
