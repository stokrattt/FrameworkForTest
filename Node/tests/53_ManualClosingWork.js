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

condition.nowWeDoing= 'зосдаем локал мув и сразу его конфермим';
    LF.CreateLocalMovingFromBoard(V.client);
    V.boardNumbers = {};
    LF.RememberDigitsRequestBoard(V.boardNumbers);
    JS.step(JSstep.selectTruck((V.boardNumbers.LaborTimeMax + V.boardNumbers.TravelTime)/60));
    MF.WaitWhileBusy();
    MF.EditRequest_SetAdressToFrom ();
    MF.EditRequest_SetToConfirmed ();
    LF.addToCleanerJob (V.boardNumbers.Id);
    MF.EditRequest_SaveChanges ();

condition.nowWeDoing = 'закрываем конферм работу, выставляем лабор тайм';
    MF.EditRequest_CloseConfirmWork ();
    MF.EditRequest_SetLaborTimeCloseJob ();
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
    VD.IWant (VD.ToEqual, V.boardNumbersClose.QuoteMax, V.QuoteLaborTravelRate, 'не правильно посчитало квоту по формуле лабор+травел*rate');
    V.TotalSum = V.boardNumbersClose.QuoteMax + V.boardNumbersClose.Fuel;
    VD.IWant (VD.ToEqual, V.boardNumbersClose.Total, V.TotalSum, 'не правильно посчитало гранд  по формуле фуел + квота');
    SF.sleep(2);
condition.nowWeDoing = 'добавляем два паймента, один кастомный, один карточкой, так чтобы баланс был равен 0 и закрываем реквест';
    MF.EditRequest_OpenPayment();
    SF.click(By.xpath('//a[@ng-click="addCustomPayment()"]'));
    // JS.click('a[ng-click=\\"addCustomPayment()\\"]:visible');
    SF.waitForVisible (By.xpath('//form[@name="clientForm"]'));
    SF.click (By.xpath('//input[@ng-model="receipt.amount"]'));
    SF.send (By.xpath('//input[@ng-model="receipt.amount"]'),100);
    SF.click(By.xpath('//textarea[@ng-model="receipt.description"]'));
    SF.sleep (1);
    Debug.pause();
    SF.click(By.xpath('//button[@ng-click="Save()"]'));
    MF.WaitWhileToaster();
    MF.WaitWhileBusy ();
    Debug.pause();
    JS.click('button[ng-click=\\"save()\\"]:visible');
    Debug.pause();
    SF.sleep (3);
    MF.WaitWhileBusy ();
    MF.EditRequest_OpenPayment();
    MF.WaitWhileBusy();
    V.cardInput = V.boardNumbersClose.Total - 100;
    SF.click(By.xpath('//a[@ng-click="addAuthPayment()"]'));
    SF.sleep(2);

    SF.click (By.xpath('//input[@ng-model="charge_value.value"]'));
    SF.send (By.xpath('//input[@ng-model="charge_value.value"]'),V.cardInput);
    SF.click(By.xpath('//button[@ng-click="goStepTwo();"]'));
    LF.FillCardPayModal ();
    JS.waitForExist('div.payment-receipt-modal');
    MF.WaitWhileToaster();
    SF.sleep(2);
    MF.WaitWhileBusy ();
    MF.WaitWhileBusy ();
    SF.click(By.xpath('//div[contains(@class,"payment-receipt-modal")]/following-sibling::div[1]/button[@ng-click="cancel()"]'));
    SF.sleep(1);

    // SF.click(By.xpath('//div[@ng-show="receiptLoader"]/following-sibling::div[contains(@class,"modal-footer")]/button[@ng-click="cancel()" and contains(text(),"Cancel")]'));
    SF.click(By.xpath('//div[contains(@class,"modal-footer")]/button[@ng-click="cancel()" and contains(text(),"Cancel")]'));

    SF.sleep(1);
    MF.EditRequest_CloseEditRequest();

condition.nowWeDoing = 'идем в коферм работы на борде,открываем наш реквест, закрываем работу и проверяем что баланс равен 0';
    MF.Board_OpenConfirmed ();
    MF.WaitWhileBusy ();
    SF.sleep(2);
    MF.WaitWhileBusy ();
    MF.Board_OpenRequest (V.boardNumbers.Id);
    MF.EditRequest_CloseConfirmWork ();
    MF.EditRequest_CloseJob();
    V.boardNumbersCloseJob = {};
    LF.RememberDigitsRequestBoard_Down(V.boardNumbersCloseJob);
    VD.IWant(VD.ToEqual,V.boardNumbersCloseJob.Balance, 0, 'баланс не ноль');
    SF.sleep(2);
    // LF.closeEditRequest ();
    // MF.Board_LogoutAdmin ();
  //=========================закончили писать тест=============================
    SF.endOfTest();
};
