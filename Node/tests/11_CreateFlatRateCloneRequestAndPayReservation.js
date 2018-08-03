module.exports = function main(SF, JS, MF, LF, JSstep, VD, V, By, until,FileDetector, system, condition, config, constants) {
    global.fiber = Fiber.current;
    V.client = {};
    V.client.name = SF.randomBukva(6) + '_t';
    V.client.fam = SF.randomBukva(6) + '_t';
    V.client.phone = SF.randomCifra(10);
    V.client.email = SF.randomBukvaSmall(6) + '@' + SF.randomBukvaSmall(4) + '.tes';
    V.client.passwd = 123;
    V.manager = {};
    V.manager.name =' manager' ;
    V.manager.passwd = '123';


    condition.nowWeDoing = 'заходим под менеджером, создаем через криет реквест флет-рейт работу';
    SF.get(V.adminURL);
    LF.LoginToBoardAsCustom(V.manager.name,V.manager.passwd);
    LF.CreateFlatRateFromBoard(V.client);
    MF.EditRequest_SetAdressToFrom();
    MF.EditRequest_SendFlatRateSumm(4000);
    MF.EditRequest_SetToNotConfirmed();
    JS.step(JSstep.selectTruck(4));
    MF.WaitWhileBusy();
    driver.wait(driver.executeScript('return $("input#reserv_price").val()').then(function(text){
        V.ReservationOnDashBoard = SF.cleanPrice(text);
    }),config.timeout);
    V.boardNumbersFlatRate = {};
    LF.RememberDigitsRequestBoard(V.boardNumbersFlatRate);
    MF.EditRequest_OpenClient();
    LF.SetClientPasswd(V.client.passwd);
    MF.EditRequest_OpenRequest();
    MF.EditRequest_SaveChanges();
    MF.EditRequest_CloseEditRequest();
    MF.Board_LogoutAdmin();

    condition.nowWeDoing = 'идем на аккаунт проверять сумму резервации и конфермить работу';
    SF.get(V.accountURL);
    LF.LoginToAccountAsClient(V.client);
    MF.Account_OpenRequest(V.boardNumbersFlatRate.Id);
    MF.Account_ClickViewRequest();
    MF.Account_ClickProceedBookYourMove();
    driver.wait(driver.findElement(By.xpath('//div[@ng-class="{\'disabled\':vm.admin}"]/div/h2[contains(text(),"Deposit: ")]')).getText().then(function (text) {
        text = SF.cleanPrice(text);
        VD.IWant(VD.ToEqual, text, V.ReservationOnDashBoard, 'резервация не совпала с той суммой, что указана на мувборде и на конфирмейшн пэйдж');
    }),config.timeout);
    MF.Account_ClickIAgreeWithAll();
    SF.click(By.xpath('//div[@ng-click="addReservationPayment()"]'));
    SF.waitForVisible(By.xpath('//canvas[@id="signatureCanvasReserv"]'));
    LF.MakeSignJS('signatureCanvasReserv');
    SF.click(By.xpath('//button[contains(@ng-click,"saveReservSignature()")]'));
    LF.FillCardPayModal();
    MF.WaitWhileSpinner();
    MF.Account_WaitForGreenTextAfterConfirm();
    LF.LogoutFromAccount();


    condition.nowWeDoing = 'выходим из аккаунта, переходим на мувборд делаем клон нашего реквеста';
    SF.get (V.adminURL);
    LF.LoginToBoardAsCustom(V.manager.name,V.manager.passwd);
    MF.Board_OpenConfirmed();
    MF.Board_OpenRequest(V.boardNumbersFlatRate.Id);
    MF.EditRequest_OpenSettings();
    MF.EditRequest_ClickCloneRequest();
    MF.EditRequest_WaitForVisibleCloneRequest();
    driver.wait(driver.findElement(By.xpath('//div[contains(@class,"requestModal status_1")]//a[@ng-click="select(tabs[0])"]')).getText().then(function(text){
        V.IdClone = SF.cleanPrice(text);
    }),config.timeout);
    SF.click(By.xpath('//div[contains(@class,"requestModal status_1")]//button[@ng-click="cancel()"]'));
    SF.sleep (2);
    LF.closeEditRequest();
    MF.Board_OpenPendingRequest();
    MF.Board_OpenRequest(V.IdClone);
    MF.EditRequest_OpenClient();
    //здесь сравниваем  данные клиента в исходном реквесте и в склонированном
    driver.wait(driver.findElement(By.xpath('//input[@ng-model="client.field_user_first_name"]')).getAttribute('value').then(function (text) {
        VD.IWant(VD.ToEqual, text, V.client.name, 'не совпало имя клиента с начальным реквестом, а должно');
    }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//input[@ng-model="client.field_user_last_name"]')).getAttribute('value').then(function (text) {
        VD.IWant(VD.ToEqual, text, V.client.fam , 'не совпало фамилия клиента с начальным реквестом, а должно');
    }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//input[@ng-model="client.field_primary_phone"]')).getAttribute('value').then(function (text) {
        text = SF.cleanPrice(text);
        VD.IWant(VD.ToEqual, text, '-'+V.client.phone , 'не совпало телефон клиента с начальным реквестом, а должно');
    }),config.timeout);
    LF.SetClientPasswd(V.client.passwd);
    MF.EditRequest_OpenRequest();
    MF.EditRequest_SendFlatRateSumm(3000);
    MF.EditRequest_SetToNotConfirmed();
    JS.step(JSstep.selectTruck(4));
    MF.WaitWhileBusy();
    SF.click(By.xpath('//input[@ng-model="request.reservation_rate.value"]'));
    SF.send(By.xpath('//input[@ng-model="request.reservation_rate.value"]'),350);
    driver.wait(driver.executeScript('return $("input#reserv_price").val()').then(function(text){
        V.CloneReservation = SF.cleanPrice(text);
    }),config.timeout);
    MF.EditRequest_SaveChanges();
    MF.EditRequest_CloseEditRequest();
    MF.Board_LogoutAdmin();

    condition.nowWeDoing = 'выходим из мувборда, заходим на аккаунт, октрываем клонированный реквест,переходим на конфирмейшн' +
        'сравниваем резервации в склонированном реквесте на мувборде и на аккаунте';
    SF.get(V.accountURL);
    LF.LoginToAccountAsClient(V.client);
    MF.Account_OpenRequest(V.IdClone);
    driver.wait(driver.findElement(By.xpath('//span[@ng-hide="vm.getGrandTotal(\'flatrate\', vm.request) == 0"]')).getText().then(function (text) {
        text = SF.cleanPrice(text);
        VD.IWant(VD.ToEqual, text, 3000, 'не совпал рейт с тем, что мы выставили вручную на мувборде');
    }),config.timeout);
    MF.Account_ClickProceedBookYourMove();
    driver.wait(driver.findElement(By.xpath('//div[@ng-class="{\'disabled\':vm.admin}"]/div/h2[contains(text(),"Deposit: ")]')).getText().then(function (text) {
        text = SF.cleanPrice(text);
        VD.IWant(VD.ToEqual, text, 350, 'резервация не совпала с той суммой, что указана на мувборде в склонированном реквесте и на конфирмейшн пэйдж');
    }),config.timeout);
    MF.Account_ClickIAgreeWithAll();
    SF.click(By.xpath('//div[@ng-click="addReservationPayment()"]'));
    SF.waitForVisible(By.xpath('//canvas[@id="signatureCanvasReserv"]'));
    LF.MakeSignJS('signatureCanvasReserv');
    SF.click(By.xpath('//button[contains(@ng-click,"saveReservSignature()")]'));
    LF.FillCardPayModal();
    MF.WaitWhileSpinner();
    MF.Account_WaitForGreenTextAfterConfirm();
    LF.LogoutFromAccount();

    condition.nowWeDoing = 'выходим из аккаунта, переходим на мувборд, делаем проверку что наш реквест в статусе конферм' +
        'и проверяем оплату в пэйментах';
    SF.get(V.adminURL);
    LF.LoginToBoardAsCustom(V.manager.name,V.manager.passwd);
    MF.Board_OpenConfirmed();
    MF.Board_OpenRequest(V.IdClone);
    JS.scroll('label[ng-click="OpenPaymentModal();"]');
    SF.click(By.xpath('//label[@ng-click="OpenPaymentModal();"]'));
    SF.sleep(1);
    driver.wait(driver.findElement(By.xpath('//tr[@ng-click="prepareToDelete($index, receipt.id)"]/td[4]')).getText().then(function (text) {
        text = SF.cleanPrice(text);
        VD.IWant(VD.ToEqual, text, 350, 'оплата не совпала с той суммой,которую мы оплатили на конфирмейшн пэйдж');
    }),config.timeout);

    SF.endOfTest();
};