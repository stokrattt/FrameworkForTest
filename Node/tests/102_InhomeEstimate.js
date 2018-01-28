module.exports = function main(SF, JS, MF, LF, JSstep, VD, V, By, until,FileDetector, system, condition, config,constants) {
    global.fiber = Fiber.current;
    V.client = {};
    V.client.name = SF.randomBukva(6) + '_t';
    V.client.fam = SF.randomBukva(6) + '_t';
    V.client.phone = SF.randomCifra(10);
    V.client.email = SF.randomBukvaSmall(6) + '@' + SF.randomBukvaSmall(4) + '.tes';
    V.client.passwd = 123;

condition.nowWeDoing = 'создаем мувинг с фронта, ставим статус инхом эстимеит';
    SF.get(V.adminURL);
    LF.LoginToBoardAsCustom(V.adminLogin,V.adminPassword);
    LF.CreateLocalMovingFromBoard(V.client);
    MF.EditRequest_SetAdressToFrom();
    MF.EditRequest_ChangeStatusRequest (4);
    MF.EditRequest_ClickHomeEstimateDate();
    driver.wait(driver.executeScript(JSstep.Click4DaysCalendar).then(function (calDate) {
        V.RequestInhomeDate = calDate;
    }),config.timeout);
    SF.sleep(1);
    SF.click (By.xpath('//input[@id="home-estimate-start-time"]'));
    SF.click(By.xpath('//li[contains(text(), "08:00")]'));
    SF.click (By.xpath('//input[@ng-model="request.home_estimate_start_time.value"]'));
    // SF.click(By.xpath('//li[contains(text(), "12:00")]'));
    SF.sleep(1);
    SF.click (By.xpath('//input[@id="home-estimate-duration"]'));
    SF.click(By.xpath('//ul[@class="ui-timepicker-list"]//li[contains(text(), "00:30")]'));
    SF.click (By.xpath('//div[@uib-tooltip="Dima 123"]'));
    V.boardNumbers = {};
    LF.RememberDigitsRequestBoard(V.boardNumbers);
    MF.EditRequest_OpenClient();
    LF.SetClientPasswd(V.client.passwd);
    MF.EditRequest_OpenRequest();
    MF.EditRequest_SaveChanges();

condition.nowWeDoing = 'делаем проплату, чтобы проверить Insert %';
    MF.EditRequest_OpenPayment();
    SF.click (By.xpath('//a[@ng-show="basicSettings.AuthPaymentSSL"]'));
    SF.sleep (1);
    SF.send(By.xpath('//p/input[@ng-model="charge_value.value"]'), 100);
    SF.click (By.xpath('//button[@ng-click="goStepTwo();"]'));
    MF.WaitWhileBusy();
    driver.wait(driver.findElement(By.xpath('//strong[contains(text(), "Insert Credit Card processing fee %3")]')).getText().then(function (text) {
        VD.IWant(VD.ToEqual, text, 'Insert Credit Card processing fee %3');
    }),config.timeout);
    SF.sleep(1);
    SF.click (By.xpath('//input[@ng-model="payment.creditCardFee"]'));
    LF.FillCardPayModal ();
    MF.WaitWhileBusy();
    driver.wait(driver.findElement(By.xpath('//span[contains(text(), "Amount: ")]/following-sibling::span')).getText().then(function(text){
        V.PaymentInsert = SF.cleanPrice (text);
        VD.IWant (VD.ToEqual, V.PaymentInsert, 103, 'оплата не совпала')
    }),config.timeout);
    SF.sleep (1);
    SF.click (By.xpath('//h2[contains(text(), "Receipt ")]/../../..//button[@ng-click="cancel()"]'));
    SF.sleep(2);
    SF.click (By.xpath('//button[@ng-click="save()"]'));
    LF.closeEditRequest();

condition.nowWeDoing = 'идем в Requests открываем Inhome Estimate для проверки что работа есть';
    SF.click(By.xpath('//a[@ng-click="vm.goToPage(\'requests.child\')"]'));
    MF.WaitWhileBusy();
    SF.select (By.xpath('//select[@id="fstatus"]'), 4);
    driver.wait(driver.findElement(By.xpath('//td[contains(text(),"' + V.boardNumbers.Id + '")]')).getText().then(function(text){
        V.InhomeReq = SF.cleanPrice (text);
        VD.IWant (VD.ToEqual, V.InhomeReq, V.boardNumbers.Id, 'реквеста нет в списке Inhome Estimate')
    }),config.timeout);
    SF.sleep (1);

condition.nowWeDoing = 'идем на дащборд проверить реквест в табе Inhome Estimate';
    MF.Board_OpenDashboard ();
    MF.Board_OpenInhomeEstimateTab();
    driver.wait(driver.findElement(By.xpath('//td[contains(text(), "'+V.boardNumbers.Id+'")]')).getText().then(function(text){
        V.InhomeDashboard = SF.cleanPrice (text);
        VD.IWant (VD.ToEqual, V.InhomeDashboard, V.boardNumbers.Id, 'реквеста нет в табе Inhome Estimate на дашборде')
    }),config.timeout);
    SF.sleep (1);
    MF.Board_LogoutAdmin();

condition.nowWeDoing = 'идем в аккаунт, проверить что статус реквеста инхом эстимеит';
    SF.get(V.accountURL);
    LF.LoginToAccountAsClient(V.client);
    MF.Account_OpenRequest(V.boardNumbers.Id);
    MF.Account_ClickViewRequest();
    driver.wait(driver.findElement(By.xpath('//div[@ng-show="vm.statusText.length"]//div[contains(text()," Inhome Estimate")]')).getText().then(function (Status) {
        VD.IWant(VD.ToEqual, Status, 'INHOME ESTIMATE');
    }), config.timeout);
    SF.sleep(1);


    SF.endOfTest();
};


