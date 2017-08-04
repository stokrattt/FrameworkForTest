module.exports = function main(SF, JS, MF, LF, JSstep, VD, V, By, until,FileDetector, system, condition, config,constants) {    global.fiber = Fiber.current;
    V.ReservationPrice = {};
    V.client = {};
    V.frontNumbersDown={};
    V.client.name = SF.randomBukva(6) + '_t';
    V.client.fam = SF.randomBukva(6) + '_t';
    V.client.phone = SF.randomCifra(10);
    V.client.email = SF.randomBukvaSmall(6) + '@' + SF.randomBukvaSmall(4) + '.tes';


    SF.get(V.frontURL);
    JS.waitForExist ('#loader');
    SF.sleep (4);
    LF.CreateOvernightDownForm (V.client);
condition.nowWeDoing = 'запоминаем данные калькулятора PICK UP';
    // LF.RememberFrontNumbersMovAndStorDown(V.frontNumbersDown);
    V.frontNumbersOvernightDown_UP = {};
    driver.wait(driver.findElement(By.xpath('//div[contains(@class, from_storage)]//div[@ng-if="storageCalcResult.to.surcharge_fuel"]/span')).getText().then(function(text){
        V.frontNumbersOvernightDown_UP.FuelTo = SF.cleanPrice (text.replace('$', ''));
    }), config.timeout);
    driver.wait(driver.findElement(By.xpath('//div[contains(@class, from_storage)]/div[@ng-if="!storageCalcResult.to.small_job"]/span')).getText().then(function(text){
        V.frontNumbersOvernightDown_UP.QuoteMinTo = SF.cleanPrice(text.substring(0, text.indexOf('-')));
        V.frontNumbersOvernightDown_UP.QuoteMaxTo = SF.cleanPrice(text.substring(text.indexOf('-') + 1));
    }), config.timeout);
    driver.wait(driver.findElement(By.xpath('//div[@ng-if="storageCalcResult.to.travelTime"]/span')).getText().then(function (text) {
        V.frontNumbersOvernightDown_UP.TravelTimeTo = SF.cleanPrice(text.substring(text.indexOf('min')));
    }), config.timeout);
    driver.wait(driver.findElement(By.xpath('//div[contains(@class, from_storage)]//div[4]/span')).getText().then(function (text) {
        V.frontNumbersOvernightDown_UP.OverStorTo = SF.cleanPrice (text.replace('$', ''));
    }), config.timeout);
    driver.wait(driver.findElement(By.xpath('//div[contains(@class, from_storage)]//h3[contains(text(), "Crew Size:")]/following-sibling::span')).getText().then(function (text) {
        V.frontNumbersOvernightDown_UP.CrewTo = SF.cleanPrice (text);
    }), config.timeout);
    SF.sleep (1);
    driver.wait(driver.findElement(By.xpath('//div[contains(@class, from_storage)]//div[@class="moving-date rate"]/span')).getText().then(function (text) {
        V.frontNumbersOvernightDown_UP.RateTo = text.indexOf('$', 4) == -1 ?
            SF.cleanPrice(text) :
            SF.cleanPrice(text.substring(text.indexOf('$', 4)));
    }), config.timeout);
    driver.wait(driver.findElement(By.xpath('//span[@ng-if="!storageCalcResult.to.small_job"]')).getText().then(function (text) {
        let textMin = text.substring(0, text.indexOf('-'));
        let textMax = text.substring(text.indexOf('-') + 1);
        let hoursMin = textMin.indexOf('Hrs') == -1 ? 0 : SF.cleanPrice(textMin.substring(0, textMin.indexOf('Hrs')));
        let minutesMin = textMin.indexOf('Min') == -1 ? 0 : SF.cleanPrice(textMin.substring((textMin.indexOf('Hrs') + 1), textMin.indexOf('Min')));
        V.frontNumbersOvernightDown_UP.JobTimeMinTo = hoursMin * 60 + minutesMin;
        let hoursMax = textMax.indexOf('Hrs') == -1 ? 0 : SF.cleanPrice(textMax.substring(0, textMax.indexOf('Hrs')));
        let minutesMax = textMax.indexOf('Min') == -1 ? 0 : SF.cleanPrice(textMax.substring((textMax.indexOf('Hrs') + 1), textMax.indexOf('Min')));
        V.frontNumbersOvernightDown_UP.JobTimeMaxTo = hoursMax * 60 + minutesMax;
    }), config.timeout);
    SF.sleep (2);
    V.frontNumbersOvernightDown_Del = {};

condition.nowWeDoing = 'запоминаем данные с калькулятора DELIVERY';
    driver.wait(driver.findElement(By.xpath('//div[contains(@class, to_storage)]//div[@ng-if="storageCalcResult.from.surcharge_fuel"]/span')).getText().then(function(text){
        V.frontNumbersOvernightDown_Del.FuelFrom = SF.cleanPrice (text.replace('$', ''));
    }), config.timeout);
    driver.wait(driver.findElement(By.xpath('//div[contains(@class, to_storage)]//div[@ng-if="!storageCalcResult.from.small_job"]/span')).getText().then(function(text){
        V.frontNumbersOvernightDown_Del.QuoteMinFrom = SF.cleanPrice(text.substring(0, text.indexOf('-')));
        V.frontNumbersOvernightDown_Del.QuoteMaxFrom = SF.cleanPrice(text.substring(text.indexOf('-') + 1));
    }), config.timeout);
    driver.wait(driver.findElement(By.xpath('//div[@ng-if="storageCalcResult.from.travelTime"]/span')).getText().then(function (text) {
        V.frontNumbersOvernightDown_Del.TravelTimeFrom = SF.cleanPrice(text.substring(text.indexOf('min')));
    }), config.timeout);
    /*driver.wait(driver.findElement(By.xpath('//div[@class="box_info to_storage storage"]//div[4]/span')).getText().then(function (text) {
        V.frontNumbersOvernightDown_Del.OverStorFrom = SF.cleanPrice (text.replace('$', ''));
    }), config.timeout);*/
    driver.wait(driver.findElement(By.xpath('//div[contains(@class, to_storage)]//h3[contains(text(), "Crew Size:")]/following-sibling::span')).getText().then(function (text) {
        V.frontNumbersOvernightDown_Del.CrewFrom = SF.cleanPrice(text);
        console.log(V.frontNumbersOvernightDown_Del.CrewFrom);
    }), config.timeout);
    driver.wait(driver.findElement(By.xpath('//div[contains(@class, to_storage)]//h3[contains(text(), "Hourly Rate:")]/following-sibling::span')).getText().then(function (text) {
        V.frontNumbersOvernightDown_Del.RateFrom = text.indexOf('$', 4) == -1 ?
            SF.cleanPrice(text) :
            SF.cleanPrice(text.substring(text.indexOf('$', 4)));
    }), config.timeout);
    driver.wait(driver.findElement(By.xpath('//span[@ng-if="!storageCalcResult.from.small_job"]')).getText().then(function (text) {
        let textMin = text.substring(0, text.indexOf('-'));
        let textMax = text.substring(text.indexOf('-') + 1);
        let hoursMin = textMin.indexOf('Hrs') == -1 ? 0 : SF.cleanPrice(textMin.substring(0, textMin.indexOf('Hrs')));
        let minutesMin = textMin.indexOf('Min') == -1 ? 0 : SF.cleanPrice(textMin.substring((textMin.indexOf('Hrs') + 1), textMin.indexOf('Min')));
        V.frontNumbersOvernightDown_Del.JobTimeMinFrom = hoursMin * 60 + minutesMin;
        let hoursMax = textMax.indexOf('Hrs') == -1 ? 0 : SF.cleanPrice(textMax.substring(0, textMax.indexOf('Hrs')));
        let minutesMax = textMax.indexOf('Min') == -1 ? 0 : SF.cleanPrice(textMax.substring((textMax.indexOf('Hrs') + 1), textMax.indexOf('Min')));
        V.frontNumbersOvernightDown_Del.JobTimeMaxFrom = hoursMax * 60 + minutesMax;
    }), config.timeout);
    SF.sleep(2);
    console.log (V.frontNumbersOvernightDown_UP, V.frontNumbersOvernightDown_Del);
    Debug.pause();
/*condition.nowWeDoing = 'запоминаем данные Estimated Labor и Overnight Storage';

    driver.wait(driver.findElement(By.xpath('//div[@class="box_info total storage"]//div/span')).getText().then(function(text){
        V.frontNumbersOvernightDown.EstimatedLaborMin = SF.cleanPrice(text.substring(0, text.indexOf('-')));
        V.frontNumbersOvernightDown.EstimatedLaborMax = SF.cleanPrice(text.substring(text.indexOf('-') + 1));
    }), config.timeout);
/*    driver.wait(driver.findElement(By.xpath('//div[@ng-if="!overnightMove"]/span')).getText().then(function(text){
        V.frontNumbersOvernightDown.OvernightStorageMin = SF.cleanPrice(text.substring(0, text.indexOf('-')));
        V.frontNumbersOvernightDown.OvernightStorageMax = SF.cleanPrice(text.substring(text.indexOf('-') + 1));
    }), config.timeout);
*/
    SF.sleep(2);
    SF.click(By.id('submitRequestButton'));
    SF.sleep (4);
    SF.click(By.linkText('View Request Page'));
    SF.sleep(4);
    SF.openTab (1);

condition.nowWeDoing = 'пошли в аккаунт';
    SF.sleep (3);
    MF.WaitWhileBusy ();
    MF.Account_ClickViewRequest();
    MF.WaitWhileBusy ();
    SF.sleep(2);
    V.accountNumbersUp = {};
    LF.RememberAccountNumbers (V.accountNumbersUp);
    LF.addToCleanerJob(V.accountNumbersUp.Id);
    LF.Validation_Compare_Account_Front_MovStorTo(V.accountNumbersUp, V.frontNumbersOvernightDown_UP);
    MF.Account_ClickFromStorage ();
    V.accountNumbersDelivery = {};
    SF.sleep (0.5);
    MF.WaitWhileBusy ();
    SF.sleep(3);
    LF.RememberAccountNumbers(V.accountNumbersDelivery);
    LF.addToCleanerJob(V.accountNumbersDelivery.Id);
    LF.Validation_Compare_Account_Front_MovStorFrom (V.accountNumbersDelivery, V.frontNumbersOvernightDown_Del);
    LF.LogoutFromAccount ();
    SF.get (V.adminURL);

condition.nowWeDoing = 'зашли в админку';
    LF.LoginToBoardAsCustom(V.adminLogin,V.adminPassword);
    MF.Board_OpenRequest(V.accountNumbersUp.Id);
    V.boardNumbersUp = {};
    LF.RememberDigitsRequestBoard(V.boardNumbersUp);
    JS.step(JSstep.selectTruck((V.boardNumbersUp.LaborTimeMax + V.boardNumbersUp.TravelTime)/60));
    condition.nowWeDoing = 'сравниваем аккаунт и админку';
    LF.Validation_Compare_Account_Admin(V.accountNumbersUp,V.boardNumbersUp);
    MF.EditRequest_SetToNotConfirmed ();
    MF.EditRequest_SetAdressFrom ();
    MF.EditRequest_SaveChanges ();
    MF.EditRequest_OpenClient ();
    SF.sleep (0.5);
    V.client.passwd = 123;
    LF.SetClientPasswd (V.client.passwd);


    LF.closeEditRequest ();
    MF.Board_OpenRequest(V.accountNumbersDelivery.Id); /********************************************************************/
    V.boardNumbersDelivery = {};
    LF.RememberDigitsRequestBoard(V.boardNumbersDelivery);
    JS.step(JSstep.selectTruck((V.boardNumbersDelivery.LaborTimeMax + V.boardNumbersDelivery.TravelTime)/60));

condition.nowWeDoing = 'сравниваем аккаунт и админку второй реквест';
    LF.Validation_Compare_Account_Admin(V.accountNumbersDelivery,V.boardNumbersDelivery);
    MF.EditRequest_SetToNotConfirmed ();
    MF.EditRequest_SetAdressTo ();
    MF.EditRequest_SaveChanges ();
    LF.closeEditRequest ();
    MF.Board_LogoutAdmin ();
    SF.get(V.accountURL);
    LF.LoginToAccountAsClient (V.client, V.client.passwd);

    condition.nowWeDoing = 'зашли под клиентом букаем первую работу';
    MF.Account_CheckRequestStatus_NotConfirmed(V.accountNumbersUp.Id);
    MF.Account_OpenRequest(V.accountNumbersUp.Id);

    MF.WaitWhileBusy();
    SF.sleep(2);
    MF.WaitWhileBusy();

    SF.click (By.xpath('//div[@class="field-status notconfirmed ng-scope"]/a'));
    SF.sleep(2);
    SF.click (By.xpath('//i[@class="fa fa-angle-down arrow-down"]'));
    SF.sleep (0.5);
    SF.click (By.id('terms'));
    SF.click (By.id('cancel_policy'));
    SF.click (By.id('paybutton'));

    SF.waitForVisible(By.xpath('//canvas[@id="signatureCanvasReserv"]'));
    LF.MakeSignJS('signatureCanvasReserv');
    SF.sleep(3);
    // MF.SweetConfirm ();
    SF.click(By.xpath('//button[@ng-click="saveReservSignature();logClickButtons(\'Save reservation sign button clicked\')"]'));
    SF.sleep (1);
    LF.FillCardPayModal ();
    MF.WaitWhileSpinner ();
    SF.waitForVisible (By.xpath('//div[@class="field-status confirm ng-scope"]'));
    driver.wait(driver.findElement(By.xpath('//div[@class="field-status confirm ng-scope"]/div')).getText().then(function(confirmed){
        VD.IWant (VD.ToEqual, confirmed, 'YOUR MOVE IS CONFIRMED AND SCHEDULED', 'статус не конферм, хотя должен был быть');
    }), config.timeout);
    MF.WaitWhileBusy ();
    SF.click(By.xpath('//a[@ng-click="vm.goToRequest(vm.request.storage_id)"]'));
    SF.sleep (2);
condition.nowWeDoing = 'букаем вторую работу овернайта';
    SF.click (By.xpath('//div[@class="field-status notconfirmed ng-scope"]/a'));
    SF.click (By.xpath('//i[@class="fa fa-angle-down arrow-down"]'));
    SF.sleep (0.5);
    SF.click (By.id('terms'));
    SF.click (By.id('cancel_policy'));
    SF.click (By.id('paybutton'));
    // // MF.SweetConfirm ();
    // SF.waitForVisible (By.xpath('//div[@class="modal-body form-horizontal"]'));
    // SF.click (By.xpath('//input[@ng-model="request.field_moving_to.thoroughfare"]'));
    // SF.send (By.xpath('//input[@ng-model="request.field_moving_to.thoroughfare"]'), 'otkuda edem');
    // SF.click (By.xpath('//button[@ng-click="update(client)"]'));
    // SF.sleep(2);
    // //SF.waitForVisible (By.xpath('//div[@class="sweet-alert showSweetAlert visible"]'));
    // //SF.click (By.xpath('//button[@class="confirm"]'));
    // MF.SweetConfirm ();
    SF.waitForVisible(By.xpath('//canvas[@id="signatureCanvasReserv"]'));
    LF.MakeSignJS('signatureCanvasReserv');
    SF.sleep(0.5);
    SF.click (By.xpath('//button[@ng-click="saveReservSignature();logClickButtons(\'Save reservation sign button clicked\')"]'));
    SF.sleep (1);
    //MF.SweetConfirm ();
    LF.FillCardPayModal ();
    MF.WaitWhileSpinner ();
    SF.waitForVisible (By.xpath('//div[@class="field-status confirm ng-scope"]'));
    driver.wait(driver.findElement(By.xpath('//div[@class="field-status confirm ng-scope"]/div')).getText().then(function(confirmed){
        VD.IWant (VD.ToEqual, confirmed, 'YOUR MOVE IS CONFIRMED AND SCHEDULED', 'статус не конферм, хотя должен был быть');
    }), config.timeout);
    MF.WaitWhileBusy ();
    // LF.LogoutFromAccount ();

    SF.endOfTest();
};
