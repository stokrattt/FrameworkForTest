module.exports = function main(SF, JS, MF, LF, JSstep, VD, V, By, until,FileDetector, system, condition, config,constants) {    global.fiber = Fiber.current;
    V.ReservationPrice = {};
    V.client = {};
    V.frontNumbersUnloadingDown ={};
    V.accountNumbers = {};
    V.client.name = SF.randomBukva(6) + '_t';
    V.client.fam = SF.randomBukva(6) + '_t';
    V.client.phone = SF.randomCifra(10);
    V.client.email = SF.randomBukvaSmall(6) + '@' + SF.randomBukvaSmall(4) + '.tes';

    SF.get(V.frontURL);
    SF.sleep (6);
    LF.CreateUnloadingHelpDownForm (V.client);
condition.nowWeDoing = 'запоминаем данные';
    driver.wait(driver.findElement(By.xpath('//div[@class="box_info detailsinfo ng-scope"]/div/span')).getText().then(function (text) {
        V.frontNumbersUnloadingDown.Crew = text.replace('Movers', '');
    }), config.timeout);
    driver.wait(driver.findElement(By.xpath('//div[@class="box_info detailsinfo ng-scope"]/div[2]/span')).getText().then(function (text) {
        V.frontNumbersUnloadingDown.Truck = SF.cleanPrice (text);
    }), config.timeout);
    driver.wait(driver.findElement(By.xpath('//div[@ng-if="calcsettings.travelTime"]/span')).getText().then(function (text) {
        let hours = text.indexOf('Hr') == -1 ? 0 : SF.cleanPrice(text.substring(0, text.indexOf('Hr')));
        let minutes = text.indexOf('Min') == -1 ? 0 : SF.cleanPrice(text.substring((text.indexOf('Hrs') + 1), text.indexOf('Min')));
        V.frontNumbersUnloadingDown.TravelTime = hours * 60 + minutes;
    }), config.timeout);
    SF.sleep (1);
    driver.wait(driver.findElement(By.xpath('//div[@class="box_info detailsinfo ng-scope"]//div[@class="moving-date rate"]/span')).getText().then(function (text) {
        V.frontNumbersUnloadingDown.Rate = text.indexOf('$', 4) == -1 ?
            SF.cleanPrice(text) :
            SF.cleanPrice(text.substring(text.indexOf('$', 4)));
    }), config.timeout);
    SF.sleep(1);

    Debug.pause();

    SF.click(By.id('submitRequestButton'));
    SF.sleep (2);
    SF.click(By.linkText('View Request Page'));
    SF.sleep(4);
    SF.openTab (1);
condition.nowWeDoing = 'пошли в аккаунт';
    SF.sleep (3);
    MF.Account_ClickViewRequest();
    SF.sleep (3.5);
    LF.RememberAccountNumbers (V.accountNumbers);
    LF.addToCleanerJob(V.accountNumbers.Id);
    VD.IWant(VD.VToEqual, V.accountNumbers.CrewSize, V.frontNumbersUnloadingDown.Crew, 'не совпали CrewSize аккаунта и фронта');
    VD.IWant(VD.VToEqual, V.accountNumbers.HourlyRate, V.frontNumbersUnloadingDown.Rate, 'не совпали HourlyRate аккаунта и фронта');
    VD.IWant(VD.VToEqual, V.accountNumbers.TravelTime, V.frontNumbersUnloadingDown.TravelTime, 'не совпали TravelTime аккаунта и фронта');
    VD.IWant(VD.VToEqual, V.accountNumbers.Trucks, V.frontNumbersUnloadingDown.Truck, 'не совпали Trucks аккаунта и фронта');

    LF.LogoutFromAccount ();
    SF.get (V.adminURL);
    LF.LoginToBoardAsCustom(V.adminLogin,V.adminPassword);
    MF.Board_OpenRequest(V.accountNumbers.Id);
    V.boardNumbers = {};
    LF.RememberDigitsRequestBoard(V.boardNumbers);
    JS.step(JSstep.selectTruck((V.boardNumbers.LaborTimeMax + V.boardNumbers.TravelTime)/60));
    SF.sleep (1);
condition.nowWeDoing = 'сравниваем аккаунт и админку';
    VD.IWant(VD.VToEqual, V.accountNumbers.moveDate.Day, V.boardNumbers.moveDate.Day, 'не совпали даты аккаунта и борда');
    VD.IWant(VD.VToEqual, V.accountNumbers.moveDate.Month, V.boardNumbers.moveDate.Month, 'не совпали даты аккаунта и борда');
    VD.IWant(VD.VToEqual, V.accountNumbers.moveDate.Year, V.boardNumbers.moveDate.Year, 'не совпали даты аккаунта и борда');
    VD.IWant(VD.VToEqual, V.accountNumbers.CrewSize, V.boardNumbers.CrewSize, 'не совпали CrewSize аккаунта и борда');
    VD.IWant(VD.VToEqual, V.accountNumbers.HourlyRate, V.boardNumbers.HourlyRate, 'не совпали HourlyRate аккаунта и борда');
    VD.IWant(VD.VToEqual, V.accountNumbers.LaborTimeMax, V.boardNumbers.LaborTimeMax, 'не совпали LaborTimeMax аккаунта и борда');
    VD.IWant(VD.VToEqual, V.accountNumbers.TravelTime, V.boardNumbers.TravelTime, 'не совпали TravelTime аккаунта и борда');
    VD.IWant(VD.VToEqual, V.accountNumbers.Packing, V.boardNumbers.Packing, 'не совпали Packing аккаунта и борда');
    VD.IWant(VD.VToEqual, V.accountNumbers.AdServices, V.boardNumbers.AdServices, 'не совпали Services аккаунта и борда');
    VD.IWant(VD.VToEqual, V.accountNumbers.Trucks, V.boardNumbers.Trucks, 'не совпали Trucks аккаунта и борда');
    VD.IWant(VD.VToEqual, V.accountNumbers.TotalMin, V.boardNumbers.TotalMin, 'не совпали TotalMin аккаунта и борда');
    VD.IWant(VD.VToEqual, V.accountNumbers.TotalMax, V.boardNumbers.TotalMax, 'не совпали TotalMax аккаунта и борда');
    VD.IWant(VD.VToEqual, V.accountNumbers.Fuel, V.boardNumbers.Fuel, 'не совпали Fuel аккаунта и борда');    MF.EditRequest_SetToNotConfirmed ();
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
condition.nowWeDoing = 'зашли под клиентом букаем  работу';
    MF.Account_CheckRequestStatus_NotConfirmed (V.accountNumbers.Id);
    MF.Account_OpenRequest (V.accountNumbers.Id);
    SF.click (By.xpath('//div[@class="field-status notconfirmed ng-scope"]/a'));
    SF.click (By.xpath('//i[@class="fa fa-angle-down arrow-down"]'));
    SF.sleep (0.5);
    SF.click (By.id('terms'));
    SF.click (By.id('cancel_policy'));
    SF.click (By.id('paybutton'));
    MF.SweetConfirm();
    SF.waitForVisible (By.xpath('//div[@class="modal-body form-horizontal"]'));
    SF.send (By.xpath('//input[@ng-model="request.field_moving_to.thoroughfare"]'), 'otkuda edem');
    SF.send (By.xpath('//input[@ng-value="request.apt_to.value"]'), 324535);
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
        VD.IWant (VD.VToEqual, confirmed, 'YOUR MOVE IS CONFIRMED AND SCHEDULED', 'статус не конферм, хотя должен был быть');
    }), config.timeout);
    LF.LogoutFromAccount ();

    SF.endOfTest();
};
