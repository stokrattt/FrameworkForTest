module.exports = function main(SF, JS, MF, LF, JSstep, VD, V, By, until,FileDetector, system, condition, config,constants) {
    global.fiber = Fiber.current;
    V.client = {};
    V.client.name = SF.randomBukva(6) + '_t';
    V.client.fam = SF.randomBukva(6) + '_t';
    V.client.phone = SF.randomCifra(10);
    V.client.email = SF.randomBukvaSmall(6) + '@' + SF.randomBukvaSmall(4) + '.tes';
    V.client.passwd = 123;

    //=========================начинаем писать тест=============================
    SF.get(V.adminURL);

condition.nowWeDoing = 'создаем реквест, ставим нот конферм и резервируем его с админки';
    LF.LoginToBoardAsCustom(V.adminLogin,V.adminPassword);
    LF.CreateLocalMovingFromBoard (V.client);
    LF.addInventoryBoard();
    MF.EditRequest_SetAdressToFrom ();
    MF.EditRequest_SetToNotConfirmed();
    V.boardNumbers = {};
    LF.RememberDigitsRequestBoard (V.boardNumbers);
    JS.step(JSstep.selectTruck((V.boardNumbers.LaborTimeMax + V.boardNumbers.TravelTime)/60));
    MF.WaitWhileBusy();
    driver.wait(driver.findElement(By.xpath('//span[contains(text(),"c.f.")]/preceding-sibling::span[1]')).getText().then(function(text){
        V.cbf = text;
    }),config.timeout);
    MF.EditRequest_SaveChanges ();
    MF.EditRequest_OpenClient ();
    LF.SetClientPasswd(V.client.passwd);
    MF.EditRequest_OpenRequest ();
    MF.EditRequest_OpenPaymentModalWindow();
    SF.click(By.xpath('//a[@ng-click="addReservationPayment()"]'));
    SF.waitForLocated (By.xpath('//button[@ng-click="goStepTwo();"]'));
    SF.click (By.xpath('//button[@ng-click="goStepTwo();"]'));
    LF.FillCardPayModal ();
    JS.waitForExist ('button[ng-click=\\"cancel()\\"]:visible');
    JS.click('button[ng-click=\\"cancel()\\"]:visible');
    MF.Board_Refresh ();
    MF.Board_OpenReserved();
    MF.Board_OpenRequest (V.boardNumbers.Id);
    LF.closeEditRequest ();
    MF.Board_LogoutAdmin ();

condition.nowWeDoing = 'идем в аккаунт букать работу просто подписью и  проверить что появился блок с инфой (дата, ип адрес и браузер) после подпписи';
    SF.get(V.accountURL);
    LF.LoginToAccountAsClient (V.client);
    MF.Account_CheckRequestStatus_NotConfirmed(V.boardNumbers.Id);
    MF.Account_OpenRequest(V.boardNumbers.Id);
    MF.Account_ClickViewRequest ();
    MF.Account_ClickProceedBookYourMove();
    JS.waitForExist('div.confirm');
    JS.scroll('div.confirm');
    MF.Account_ClickIAgreeWithAll();
    SF.click(By.xpath('//input[@ng-click="confirmReservation()"]'));
    SF.waitForVisible(By.xpath('//canvas[@id="signatureCanvasReserv"]'));
    LF.MakeSignJS('signatureCanvasReserv');
    SF.click(By.xpath('//button[@ng-click="saveReservSignature();logClickButtons(\'Save reservation sign button clicked\')"]'));
    MF.Account_WaitForGreenTextAfterConfirm();
    MF.Account_ClickViewConfirmationPage();
    driver.wait(driver.executeScript("return $('div[class=\"confirmation-signed-information\"]').length").then(function (text) {
        VD.IWant(VD.ToEqual, text, 1, 'на конфирмешине после подписи не нашло блок где показывается дата, ip адррес и браузер');
    }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//div[@ng-if="confirmationData.browser"]')).getText().then(function (text) {
        VD.IWant(VD.ToEqual, text, 'Client`s browser: Chrome', 'после подписи конфирмейшин, не нашло блок с названием браузера');
    }),config.timeout);
    SF.sleep(3);
    LF.LogoutFromAccount ();
    SF.get(V.adminURL);
    LF.LoginToBoardAsCustom(V.adminLogin,V.adminPassword);
    MF.Board_OpenConfirmed ();
    driver.wait(driver.findElement(By.xpath('//td[@ng-click="requestEditModal(request)"][contains(text(),"' + V.boardNumbers.Id + '")]/../td[2]/span')).getText().then(function (text) {
        VD.IWant (VD.ToEqual, text, 'Confirmed', 'реквест не стал конферм а должен был');
    }), config.timeout);
    MF.Board_OpenRequest (V.boardNumbers.Id);
    LF.RememberDigitsRequestBoard_Down(V.boardNumbers);
    LF.closeEditRequest();

condition.nowWeDoing = 'идем в стораджи создать и привязать реквест наш и проверить что подтянется актуальный вес';
    MF.Board_OpenStorages();
    MF.ClickCreateStorageTenant();
    SF.click(By.xpath('//span[@ng-click="changeRequestNid()"]'));
    SF.sleep(4);
    SF.click(By.xpath('//input[@ng-model="requestId"]'));
    SF.send(By.xpath('//input[@ng-model="requestId"]'), V.boardNumbers.Id);
    SF.click(By.xpath('//button[@ng-click="search(requestId, buttonText)"]'));
    MF.WaitWhileToaster();
    SF.sleep(4);
    driver.wait(driver.findElement(By.xpath('//input[@ng-model="data.rentals.volume_cuft"]')).getAttribute('value').then(function (text) {
        VD.IWant(VD.ToEqual, text, V.cbf, 'не совпал кубик фит с реквеста в сторадж тенанте');
    }),config.timeout);
    SF.sleep(1);
    MF.EditStorage_CloseOpenModal();
    MF.SweetConfirm();

condition.nowWeDoing = 'идем в паймент колектед, выбираем фильтр за день оплаты, то есть сегодняшинй, и  проверяем что есть резервация by company за  наш реквест';
    MF.Board_OpenSideBar();
    MF.Board_OpenPaymentCollected();
    LF.PaymentCollected_ChooseCurrentDateStartEnd();
    MF.PaymentCollected_ChoosePaymentFilter('Credit card');
    MF.PaymentCollected_ChooseAdvancedFilter('Reservation by company');
    MF.PaymentCollected_ClickApplyFilters();
    driver.wait(driver.findElement(By.xpath('//td[contains(text(), "'+ V.boardNumbers.Id+'")]/following-sibling::td[2]')).getText().then(function (text) {
        VD.IWant(VD.ToEqual, text, 'Credit card', 'не нашло слово Credit card после резеервации с реквеста компанией или не нашло этот платеж');
    }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//td[contains(text(), "'+ V.boardNumbers.Id+'")]/following-sibling::td[3]')).getText().then(function (text) {
        VD.IWant(VD.ToEqual, text, 'Reservation by company', 'не нашло слово  Reservation by company после резеервации с реквеста компанией или не нашло этот платеж');
    }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//td[contains(text(), "'+ V.boardNumbers.Id+'")]/following-sibling::td[6]')).getText().then(function (text) {
        VD.IWant(VD.ToEqual, SF.cleanPrice(text), V.boardNumbers.Payment, 'не совпало 150 долларов после резеервации с реквеста компанией или не нашло этот платеж');
    }),config.timeout);
    SF.sleep(1);



    //=========================закончили писать тест=============================
    SF.endOfTest();
};
