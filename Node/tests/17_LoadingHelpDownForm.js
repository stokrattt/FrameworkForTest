module.exports = function main(SF, JS, MF, LF, JSstep, VD, V, By, until,FileDetector, system, condition, config,constants) {    global.fiber = Fiber.current;
    V.ReservationPrice = {};
    V.client = {};
    V.frontNumbersLoadingDown ={};
    V.accountNumbers = {};
    V.boardNumbers = {};
    V.client.name = SF.randomBukva(6) + '_t';
    V.client.fam = SF.randomBukva(6) + '_t';
    V.client.phone = SF.randomCifra(10);
    V.client.email = SF.randomBukvaSmall(6) + '@' + SF.randomBukvaSmall(4) + '.tes';

    SF.get(V.frontURL);
    JS.waitForExist ('#loader');
    SF.sleep (4);
condition.nowWeDoing = 'заполняем нижний кальк';
    LF.CreateLoadingHelpDownForm (V.client);
condition.nowWeDoing = 'запоминаем данные';
    driver.wait(driver.findElement(By.xpath('//div[@class="box_info detailsinfo ng-scope"]/div/span')).getText().then(function (text) {
        V.frontNumbersLoadingDown.Crew = text.replace('Movers', '');
    }), config.timeout);
    driver.wait(driver.findElement(By.xpath('//div[@class="box_info detailsinfo ng-scope"]/div[2]/span')).getText().then(function (text) {
        V.frontNumbersLoadingDown.Truck = SF.cleanPrice (text);
    }), config.timeout);
    driver.wait(driver.findElement(By.xpath('//div[@ng-if="calcsettings.travelTime"]/span')).getText().then(function (text) {
        let hours = text.indexOf('Hr') == -1 ? 0 : SF.cleanPrice(text.substring(0, text.indexOf('Hr')));
        let minutes = text.indexOf('Min') == -1 ? 0 : SF.cleanPrice(text.substring((text.indexOf('Hrs') + 1), text.indexOf('Min')));
        V.frontNumbersLoadingDown.TravelTime = hours * 60 + minutes;
    }), config.timeout);
    SF.sleep (1);
    driver.wait(driver.findElement(By.xpath('//div[@class="box_info detailsinfo ng-scope"]//div[@class="moving-date rate"]/span')).getText().then(function (text) {
        V.frontNumbersLoadingDown.Rate = text.indexOf('$', 4) == -1 ?
            SF.cleanPrice(text) :
            SF.cleanPrice(text.substring(text.indexOf('$', 4)));
    }), config.timeout);

    SF.sleep(1);
    SF.click(By.id('submitRequestButton'));
    SF.sleep (2);
    SF.click(By.linkText('View Request Page'));
    SF.sleep(4);
    SF.openTab (1);
condition.nowWeDoing = 'пошли в аккаунт';
    SF.sleep (2);
    MF.Account_ClickViewRequest ();
    SF.sleep (3);
condition.nowWeDoing = 'сравниваем данные калькулятора и акка';
    LF.RememberAccountNumbers (V.accountNumbers);
    LF.addToCleanerJob(V.accountNumbers.Id);
    VD.IWant(VD.ToEqual, V.accountNumbers.CrewSize, V.frontNumbersLoadingDown.Crew, 'не совпали CrewSize аккаунта и фронта');
    VD.IWant(VD.ToEqual, V.accountNumbers.HourlyRate, V.frontNumbersLoadingDown.Rate, 'не совпали HourlyRate аккаунта и фронта');
    VD.IWant(VD.ToEqual, V.accountNumbers.TravelTime, V.frontNumbersLoadingDown.TravelTime, 'не совпали TravelTime аккаунта и фронта');
    VD.IWant(VD.ToEqual, V.accountNumbers.Trucks, V.frontNumbersLoadingDown.Truck, 'не совпали Trucks аккаунта и фронта');

    LF.LogoutFromAccount ();
    SF.get (V.adminURL);
    LF.LoginToBoardAsCustom(V.adminLogin,V.adminPassword);
condition.nowWeDoing = 'зашли под админом и сравниваем данные акка и админки';
    MF.Board_OpenRequest(V.accountNumbers.Id);
    LF.RememberDigitsRequestBoard(V.boardNumbers);
    JS.step(JSstep.selectTruck((V.boardNumbers.LaborTimeMax + V.boardNumbers.TravelTime)/60));
    MF.WaitWhileBusy();
    condition.nowWeDoing = 'сравниваем аккаунт и админку';
    LF.Validation_Compare_Account_Admin(V.accountNumbers,V.boardNumbers);
    MF.EditRequest_SetToNotConfirmed ();
    MF.EditRequest_SaveChanges ();
    MF.EditRequest_OpenClient ();
    V.client.passwd = 123;
    LF.SetClientPasswd (V.client.passwd);

    MF.EditRequest_OpenLogs();

    MF.EditRequest_Check1EmailExist(V.client.email, "Thank you for submitting a quote.");
    MF.EditRequest_Check1EmailExist(V.client.email, "How To Work With Your New Account.");
    MF.EditRequest_Check1EmailExist(V.adminEmail, "Request Quote (Pending Status)");

    LF.closeEditRequest ();
    MF.Board_LogoutAdmin ();
    SF.get(V.accountURL);
    LF.LoginToAccountAsClient (V.client, V.client.passwd);
condition.nowWeDoing = 'зашли под клиенто и букаем работу';
    MF.Account_CheckRequestStatus_NotConfirmed (V.accountNumbers.Id);
    MF.Account_OpenRequest (V.accountNumbers.Id);
    SF.click (By.xpath('//div[@class="field-status notconfirmed ng-scope"]/a'));
    SF.sleep(2);
    SF.click (By.xpath('//i[@class="fa fa-angle-down arrow-down"]'));
    SF.sleep (0.5);
    SF.click (By.id('terms'));
    SF.click (By.id('cancel_policy'));
    SF.click (By.id('paybutton'));
    MF.SweetConfirm();
    SF.waitForVisible (By.xpath('//div[@class="modal-body form-horizontal"]'));
    SF.sleep(2);
    SF.send (By.id('edit-moving-from'), 'otkuda edem');
    SF.send (By.id('edit-moving-from-apt'), 324535);
    SF.click (By.xpath('//button[@ng-click="update(client)"]'));
    SF.sleep(2);
    MF.SweetConfirm();
    MF.SweetConfirm();
    SF.waitForVisible(By.xpath('//canvas[@id="signatureCanvasReserv"]'));
    LF.MakeSignJS('signatureCanvasReserv');
    SF.sleep(0.5);
    SF.click(By.xpath('//button[@ng-click="saveReservSignature();logClickButtons(\'Save reservation sign button clicked\')"]'));
    SF.sleep (1);
    LF.FillCardPayModal ();
    MF.WaitWhileSpinner ();
    SF.waitForVisible (By.xpath('//div[@class="field-status confirm ng-scope"]'));
    driver.wait(driver.findElement(By.xpath('//div[@class="field-status confirm ng-scope"]/div')).getText().then(function(confirmed){
        VD.IWant (VD.ToEqual, confirmed, 'YOUR MOVE IS CONFIRMED AND SCHEDULED', 'статус не конферм, хотя должен был быть');
    }), config.timeout);
    LF.LogoutFromAccount ();

    SF.endOfTest();
};
