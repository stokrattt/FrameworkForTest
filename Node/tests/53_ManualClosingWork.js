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
    LF.LoginToBoardAsCustom(V.adminLogin,V.adminPassword);

condition.nowWeDoing= 'создаем локал мув и сразу его конфермим';
    LF.CreateLocalMovingFromBoard(V.client);
    V.boardNumbers = {};
    LF.RememberDigitsRequestBoard(V.boardNumbers);
    JS.step(JSstep.selectTruck((V.boardNumbers.LaborTimeMax + V.boardNumbers.TravelTime)/60));
    MF.WaitWhileBusy();
    MF.EditRequest_SetAdressToFrom ();
    MF.EditRequest_SetToConfirmed ();
    // LF.addToCleanerJob (V.boardNumbers.Id);
    MF.EditRequest_SaveChanges ();

condition.nowWeDoing = 'закрываем конферм работу, выставляем лабор тайм';
    MF.EditRequest_CloseConfirmWork ();
    MF.EditRequest_SetLaborTimeCloseJob ('01:00');
    driver.actions().sendKeys(Key.ENTER).perform();
    SF.sleep(2);
    driver.wait(driver.findElement(By.xpath('//input[@ng-model="invoice.work_time"]')).getAttribute('value').then(function (time) {
        V.LaborTime = SF.cleanPrice(time.substring(0, time.indexOf(':'))) * 60
            + SF.cleanPrice(time.substring(time.indexOf(':')));
    }),config.timeout);
    SF.sleep(1);

condition.nowWeDoing = 'считаем квоту от времени и гранд тотал или првильный и все это сравниваем';
    V.QuoteLaborTravelRate = ((V.LaborTime + V.boardNumbers.TravelTime)/60)*V.boardNumbers.HourlyRate;
    V.boardNumbersClose = {};
    LF.RememberDigitsRequestBoard_Down(V.boardNumbersClose);
    VD.IWant (VD.ToEqual, V.boardNumbersClose.Quote, V.QuoteLaborTravelRate, 'не правильно посчитало квоту по формуле лабор+травел*rate');
    V.TotalSum = V.boardNumbersClose.Quote + V.boardNumbersClose.Fuel + V.boardNumbersClose.AdServices;
    VD.IWant (VD.ToEqual, V.boardNumbersClose.Total, V.TotalSum, 'не правильно посчитало гранд  по формуле фуел + квота');


condition.nowWeDoing = 'добавляем два паймента, один кастомный, один карточкой, так чтобы баланс был равен 0 и закрываем реквест, так же добавляем кастомный рефанд и проверяем что он отнимается от тотала';
    MF.EditRequest_OpenPayment();
    MF.EditRequest_ClickAddCustomPayment();
    LF.EditRequest_CustomPay(100);
    MF.EditRequest_OpenPayment();
    MF.WaitWhileBusy();
    V.cardInput = V.boardNumbersClose.Total;
    MF.EditRequest_ClickAddOnlinePayment();
    MF.EditRequest_SetSumOnlinePaymentAndClickPaymentInfo(V.cardInput);
    LF.PayCheck();
    MF.WaitWhileToaster();
    MF.WaitWhileBusy ();
    driver.wait(driver.findElement(By.xpath('//div[@ng-if="entity_type != fieldData.enums.entities.STORAGEREQUEST"]')).getText().then(function (text) {
        V.totalBeforeRefund = SF.cleanPrice(text);
    }),config.timeout);
    MF.EditRequest_ClickAddCustomPayment();
    MF.EditRequest_SelectCustomTypePayment('customrefund');
    LF.EditRequest_CustomPay(100);
    MF.EditRequest_OpenPayment();
    MF.WaitWhileBusy();
    driver.wait(driver.findElement(By.xpath('//div[@ng-if="entity_type != fieldData.enums.entities.STORAGEREQUEST"]')).getText().then(function (text) {
        V.totalAfterRefund = SF.cleanPrice(text);
        VD.IWant(VD.ToEqual, V.totalAfterRefund, (V.totalBeforeRefund - 100), 'не сработал кастомный рефанд');
    }),config.timeout);
    SF.sleep(1);
    MF.EditRequest_ClosePayment();
    MF.EditRequest_ClosePayment();
    MF.EditRequest_CloseEditRequest();

condition.nowWeDoing = 'идем в коферм работы на борде,открываем наш реквест, закрываем работу и проверяем что баланс равен 0';
    MF.Board_OpenConfirmed ();
    MF.Board_OpenRequest (V.boardNumbers.Id);
    MF.EditRequest_CloseConfirmWork ();
    MF.EditRequest_CloseJob();
    V.boardNumbersCloseJob = {};
    LF.RememberDigitsRequestBoard_Down(V.boardNumbersCloseJob);
    VD.IWant(VD.ToEqual,V.boardNumbersCloseJob.Balance, 0, 'баланс не ноль');
    SF.sleep(1);

  //=========================закончили писать тест=============================
    SF.endOfTest();
};
