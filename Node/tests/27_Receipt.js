module.exports = function main(SF, JS, MF, LF, JSstep, VD, V, By, until,FileDetector, system, condition, config,constants) {
    global.fiber = Fiber.current;
    V.client = {};
    V.client.name = SF.randomBukva(6) + '_t';
    V.client.fam = SF.randomBukva(6) + '_t';
    V.client.phone = SF.randomCifra(10);
    V.client.email = SF.randomBukvaSmall(6) + '@' + SF.randomBukvaSmall(4) + '.tes';

condition.nowWeDoing = 'создаем локал мув и идем в настройки контракта, включаем less initial contract и выключаем Use Credit Card Photo and ID on Contract';
    SF.get(V.adminURL);
    LF.LoginToBoardAsCustom(V.adminLogin,V.adminPassword);
    MF.Board_OpenSettingsGeneral();
    SF.click(By.linkText('Contract page'));
    SF.sleep (2);
    driver.wait(driver.executeScript("if($('input[id=\"Use Credit Card Photo and ID on Contract\"]').hasClass('ng-empty')){" +
        "return true;}else{$('input[id=\"Use Credit Card Photo and ID on Contract\"]').click()}"),config.timeout);
    SF.sleep(0.3);
    driver.wait(driver.executeScript("if($('input[ng-model=\"contract_page.lessInitialContract\"]').hasClass('ng-not-empty')){" +
        "return true;}else{$('input[ng-model=\"contract_page.lessInitialContract\"]').click()}"),config.timeout);
    SF.sleep(0.5);
    SF.click (By.xpath('//button[@ng-click="save()"]'));
    SF.sleep (2); //сохранялка
    MF.WaitWhileToaster();
    LF.CreateLocalMovingFromBoard(V.client);
    V.boardNumbers = {};
    LF.addInventoryBoard(V.boardNumbers);

condition.nowWeDoing = 'запоминаем все данные';
    LF.RememberDigitsRequestBoard(V.boardNumbers);
    JS.step(JSstep.selectTruck((V.boardNumbers.LaborTimeMax + V.boardNumbers.TravelTime) / 60));
    MF.WaitWhileBusy();
    LF.RememberDateFromRequest(V.boardNumbers);
    MF.EditRequest_RememberId (V.request);
    // LF.addToCleanerJob(V.request.Id);
    MF.EditRequest_SetToNotConfirmed ();
    MF.EditRequest_SetAdressToFrom();
    MF.EditRequest_SaveChanges ();
    MF.EditRequest_OpenClient ();
    SF.sleep (0.5);
    V.client.passwd = 123;
    LF.SetClientPasswd (V.client.passwd);
    LF.closeEditRequest();

condition.nowWeDoing = 'зашли под клиентом в акк';
    MF.Board_LogoutAdmin ();
    SF.get(V.accountURL);
    LF.LoginToAccountAsClient (V.client, V.client.passwd);
    MF.Account_CheckRequestStatus_NotConfirmed(V.request.Id);
    MF.Account_OpenRequest(V.request.Id);
    MF.Account_ClickViewRequest();
    LF.ConfirmRequestInAccount_WithReservation();
    MF.Account_WaitForGreenTextAfterConfirm();
    LF.LogoutFromAccount ();
    SF.get (V.adminURL);
    LF.LoginToBoardAsCustom(V.adminLogin,V.adminPassword);

condition.nowWeDoing = 'идем в диспач первый раз';
    MF.Board_OpenLocalDispatch();
    LF.findDayInLocalDispatch(V.boardNumbers.moveDate.Year, V.boardNumbers.moveDate.Month, V.boardNumbers.moveDate.Day);
    MF.Dispatch_GridView();
    LF.SelectRequestDispatch(V.request.Id);
    LF.selectCrew(V.foremanName);
    MF.Board_LogoutAdmin();

condition.nowWeDoing = 'заходим под форменом, открываем контракт, вводим свои значение старт и енд тайм, проверяем что все правильно считается с перерывом и что траки и команда и рейт все верно';
    LF.LoginToBoardAsCustomForeman(V.foremanLogin, V.foremanPassword);
    LF.OpenRequestInForemanPage(V.request.Id);
    MF.Contract_WaitConfirmationPage();
    MF.Contract_OpenBillOfLading();
    LF.MakeSignInContract();
    MF.Contract_DeclarationValueA();
    MF.Contract_SendStartTime("12:00 PM");
    MF.Contract_SendStopTime("15:30 PM");
    MF.Contract_SendTimeOFF("00:30");
    MF.Contract_DeclarationValueA();
    driver.wait(driver.findElement(By.xpath('//tr[@ng-repeat="crew in data.crews"]/td[1]')).getText().then(function (text) {
        VD.IWant(VD.ToEqual, V.boardNumbers.Trucks, text, 'не совпало количество траков на контракте и в реквесте');
    }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//tr[@ng-repeat="crew in data.crews"]/td[2]')).getText().then(function (text) {
        VD.IWant(VD.ToEqual, V.boardNumbers.CrewSize, text, 'не совпало количество муверов на контракте и в реквесте');
    }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//tr[@ng-repeat="crew in data.crews"]/td[3]')).getText().then(function (text) {
        VD.IWant(VD.ToEqual, V.boardNumbers.HourlyRate, SF.cleanPrice(text), 'не совпал рейт на контракте и в реквесте');
    }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//tr[@ng-repeat="crew in data.crews"]/td[4]')).getText().then(function (text) {
        VD.IWant(VD.ToEqual, 3, SF.cleanPrice(text), 'не правильно посчитало время работы, мы перед этим выставили старт тайм в 12 и енд тайм в 3,30 и добавили перерыв на пол часа, так что время работы должно быть 3 часа');
    }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//tr[@ng-repeat="crew in data.crews"]/td[5]')).getText().then(function (text) {
        VD.IWant(VD.ToEqual, (V.boardNumbers.HourlyRate*3), SF.cleanPrice(text), 'не совпал тотал по работе по формуле рейт умножено на количество часов');
    }),config.timeout);

//сюда еще пару проверок добавить
    MF.Contract_ClickPay();
    MF.Contract_ClickTips10();
    MF.Contract_ClickAddTips();
    MF.Contract_ClickPaymentInfo();
    LF.FillCardPayModal();
    LF.Contract_SignMainPayment();
    LF.MakeSignInContract();
    V.contractNumbers = {};
    MF.Contract_Submit(V.contractNumbers);
    MF.Contract_ReturnToForeman();
    LF.LogoutFromBoardForeman();

condition.nowWeDoing = 'идем в админку в диспач второй раз, проверить что работа есть в done и что баланс равен 0 после подписания';
    LF.LoginToBoardAsCustom(V.adminLogin,V.adminPassword);
    MF.Board_OpenLocalDispatch();
    LF.findDayInLocalDispatch(V.boardNumbers.moveDate.Year, V.boardNumbers.moveDate.Month, V.boardNumbers.moveDate.Day);
    MF.Dispatch_GridView();
    MF.Dispatch_ShowDoneJobs();
    LF.OpenRequestDispatch(V.request.Id);
    MF.EditRequest_WaitForBalanceVisible();
    SF.sleep(2);
    LF.RememberDigitsRequestBoard_Down(V.boardNumbers);
    MF.EditRequest_ScrollDown();
    VD.IWant(VD.ToEqual, V.boardNumbers.Balance, 0, 'Баланс после закрытия не равен 0');
    driver.wait(driver.findElement(By.xpath('//input[@ng-model="invoice.work_time"]')).getAttribute('value').then(function (text) {
        VD.IWant(VD.ToEqual, text, '03:00', 'не совпал лабор тайм с тем что выставили на контракте');
    }),config.timeout);

condition.nowWeDoing = 'идем в паймент и проверяем что данные оплаты совпадают с тем что написано в receipt';
    MF.EditRequest_OpenPayment();
    driver.wait(driver.findElement(By.xpath('//tbody/tr[1][@ng-click="prepareToDelete($index, receipt.id)"]/td[4]')).getText().then(function(text){
        V.payment1 = SF.cleanPrice (text);
    }),config.timeout);
    driver.actions().mouseMove(driver.findElement(By.xpath('//tr[@ng-click="prepareToDelete($index, receipt.id)"]'))).doubleClick().perform();
    MF.WaitWhileBusy ();
    SF.waitForVisible (By.xpath('//span[contains(text(), "Amount: ")]'));
    driver.wait(driver.findElement(By.xpath('//span[contains(text(), "Amount: ")]/following-sibling::span')).getText().then(function(text){
        V.paymentAmount1 = SF.cleanPrice (text);
        VD.IWant (VD.ToEqual, V.paymentAmount1, V.payment1, 'оплата не совпала')
    }),config.timeout);
    SF.click (By.xpath('//h2[contains(text(), "Receipt ")]/../../..//button[@ng-click="cancel()"]'));
    SF.sleep(3);

    driver.wait(driver.findElement(By.xpath('//tbody/tr[2][@ng-click="prepareToDelete($index, receipt.id)"]/td[4]')).getText().then(function(text){
        V.payment2 = SF.cleanPrice (text);
    }),config.timeout);
    driver.actions().mouseMove(driver.findElement(By.xpath('//tr[2][@ng-click="prepareToDelete($index, receipt.id)"]'))).doubleClick().perform();
    SF.sleep(3);
    MF.WaitWhileBusy ();
    SF.waitForVisible (By.xpath('//span[contains(text(), "Amount: ")]'));
    driver.wait(driver.findElement(By.xpath('//span[contains(text(), "Amount: ")]/following-sibling::span')).getText().then(function(text){
        V.paymentAmount2 = SF.cleanPrice (text);
        VD.IWant (VD.ToEqual, V.paymentAmount2, V.payment2, 'оплата не совпала')
    }),config.timeout);
    SF.sleep (1);
    JS.click('button[ng-click="cancel()"]');
    MF.Board_OpenSideBar();
    MF.Board_OpenSettingsGeneral();
    SF.click(By.linkText('Contract page'));
    SF.sleep (2);
    driver.wait(driver.executeScript("if($('input[ng-model=\"contract_page.lessInitialContract\"]').hasClass('ng-empty')){" +
        "return true;}else{$('input[ng-model=\"contract_page.lessInitialContract\"]').click()}"),config.timeout);
    driver.wait(driver.executeScript("if($('input[id=\"Use Credit Card Photo and ID on Contract\"]').hasClass('ng-not-empty')){" +
        "return true;}else{$('input[id=\"Use Credit Card Photo and ID on Contract\"]').click()}"),config.timeout);
    SF.sleep(0.5);
    SF.click (By.xpath('//button[@ng-click="save()"]'));
    SF.sleep (2); //сохранялка
    MF.WaitWhileToaster();
    //=========================закончили писать тест=============================
    SF.endOfTest();
};
