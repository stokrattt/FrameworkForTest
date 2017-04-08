module.exports = function main(SF, JS, JSstep, VD, V, By, until,FileDetector, system, condition, LF,config,constants){
    global.fiber = Fiber.current;
    V.ReservationPrice = {};
    V.client = {};
    V.frontNumbersOvernightDown ={};
    V.client.name = SF.randomBukva(6) + '_t';
    V.client.fam = SF.randomBukva(6) + '_t';
    V.client.phone = SF.randomCifra(10);
    V.client.email = SF.randomBukvaSmall(6) + '@' + SF.randomBukvaSmall(4) + '.tes';

    SF.get(V.frontURL);
    JS.waitForExist ('#loader');
    SF.sleep (4);

    LF.CreateOvernightDownForm ();

condition.nowWeDoing = 'запоминаем данные калькулятора PICK UP';

    driver.wait(driver.findElement(By.xpath('//div[@class="box_info from_storage storage"]//div[@ng-if="storageCalcResult.to.surcharge_fuel"]/span')).getText().then(function(text){
        V.frontNumbersOvernightDown.FuelUP = SF.cleanPrice (text.replace('$', ''));
    }), config.timeout);
    driver.wait(driver.findElement(By.xpath('//div[@class="box_info from_storage storage"]//div[@ng-if="storageCalcResult.to.isMinHourLessThenMaxTime"]/span')).getText().then(function(text){
        V.frontNumbersOvernightDown.QuoteMinUP = SF.cleanPrice(text.substring(0, text.indexOf('-')));
        V.frontNumbersOvernightDown.QuoteMaxUP = SF.cleanPrice(text.substring(text.indexOf('-') + 1));
    }), config.timeout);
    driver.wait(driver.findElement(By.xpath('//div[@ng-if="storageCalcResult.to.travelTime"]/span')).getText().then(function (text) {
        V.frontNumbersOvernightDown.TravelTimeUP = SF.cleanPrice(text.substring(text.indexOf('min')));
    }), config.timeout);
    driver.wait(driver.findElement(By.xpath('//div[@class="box_info from_storage storage"]//div[4]/span')).getText().then(function (text) {
        V.frontNumbersOvernightDown.OverStorUP = SF.cleanPrice (text.replace('$', ''));
    }), config.timeout);
    driver.wait(driver.findElement(By.xpath('//div[@class="box_info from_storage storage"]//div[5]/span')).getText().then(function (text) {
        V.frontNumbersOvernightDown.CrewUP = text.replace('Movers', '');
    }), config.timeout);
    SF.sleep (1);
    driver.wait(driver.findElement(By.xpath('//div[@class="box_info from_storage storage"]//div[@class="moving-date rate"]/span')).getText().then(function (text) {
        V.frontNumbersOvernightDown.RateUP = text.indexOf('$', 4) == -1 ?
            SF.cleanPrice(text) :
            SF.cleanPrice(text.substring(text.indexOf('$', 4)));
    }), config.timeout);
    driver.wait(driver.findElement(By.xpath('//span[@ng-if="storageCalcResult.to.isMinHourLessThenMaxTime"]')).getText().then(function (text) {
        let textMin = text.substring(0, text.indexOf('-'));
        let textMax = text.substring(text.indexOf('-') + 1);
        let hoursMin = textMin.indexOf('Hrs') == -1 ? 0 : SF.cleanPrice(textMin.substring(0, textMin.indexOf('Hrs')));
        let minutesMin = textMin.indexOf('Min') == -1 ? 0 : SF.cleanPrice(textMin.substring((textMin.indexOf('Hrs') + 1), textMin.indexOf('Min')));
        V.frontNumbersOvernightDown.JobTimeMinUP = hoursMin * 60 + minutesMin;
        let hoursMax = textMax.indexOf('Hrs') == -1 ? 0 : SF.cleanPrice(textMax.substring(0, textMax.indexOf('Hrs')));
        let minutesMax = textMax.indexOf('Min') == -1 ? 0 : SF.cleanPrice(textMax.substring((textMax.indexOf('Hrs') + 1), textMax.indexOf('Min')));
        V.frontNumbersOvernightDown.JobTimeMaxUP = hoursMax * 60 + minutesMax;
    }), config.timeout);
    SF.sleep (1);

condition.nowWeDoing = 'запоминаем данные с калькулятора DELIVERY';

    driver.wait(driver.findElement(By.xpath('//div[@class="box_info to_storage storage"]//div[@ng-if="storageCalcResult.from.surcharge_fuel"]/span')).getText().then(function(text){
        V.frontNumbersOvernightDown.FuelFromDel = SF.cleanPrice (text.replace('$', ''));
    }), config.timeout);
    driver.wait(driver.findElement(By.xpath('//div[@class="box_info to_storage storage"]//div[@ng-if="storageCalcResult.from.isMinHourLessThenMaxTime"]/span')).getText().then(function(text){
        V.frontNumbersOvernightDown.QuoteMinDel = SF.cleanPrice(text.substring(0, text.indexOf('-')));
        V.frontNumbersOvernightDown.QuoteMaxDel = SF.cleanPrice(text.substring(text.indexOf('-') + 1));
    }), config.timeout);
    driver.wait(driver.findElement(By.xpath('//div[@ng-if="storageCalcResult.from.travelTime"]/span')).getText().then(function (text) {
        V.frontNumbersOvernightDown.TravelTimeDel = SF.cleanPrice(text.substring(text.indexOf('min')));
    }), config.timeout);
    driver.wait(driver.findElement(By.xpath('//div[@class="box_info to_storage storage"]//div[4]/span')).getText().then(function (text) {
        V.frontNumbersOvernightDown.OverStorDel = SF.cleanPrice (text.replace('$', ''));
    }), config.timeout);
    driver.wait(driver.findElement(By.xpath('//div[@class="box_info to_storage storage"]//div[5]/span')).getText().then(function (text) {
        V.frontNumbersOvernightDown.CrewDel = text.replace('Movers', '');
    }), config.timeout);
    driver.wait(driver.findElement(By.xpath('//div[@class="box_info to_storage storage"]//div[6]/span')).getText().then(function (text) {
        V.frontNumbersOvernightDown.RateDel = text.indexOf('$', 4) == -1 ?
            SF.cleanPrice(text) :
            SF.cleanPrice(text.substring(text.indexOf('$', 4)));
    }), config.timeout);
    driver.wait(driver.findElement(By.xpath('//span[@ng-if="storageCalcResult.from.isMinHourLessThenMaxTime"]')).getText().then(function (text) {
        let textMin = text.substring(0, text.indexOf('-'));
        let textMax = text.substring(text.indexOf('-') + 1);
        let hoursMin = textMin.indexOf('Hrs') == -1 ? 0 : SF.cleanPrice(textMin.substring(0, textMin.indexOf('Hrs')));
        let minutesMin = textMin.indexOf('Min') == -1 ? 0 : SF.cleanPrice(textMin.substring((textMin.indexOf('Hrs') + 1), textMin.indexOf('Min')));
        V.frontNumbersOvernightDown.JobTimeMinDel = hoursMin * 60 + minutesMin;
        let hoursMax = textMax.indexOf('Hrs') == -1 ? 0 : SF.cleanPrice(textMax.substring(0, textMax.indexOf('Hrs')));
        let minutesMax = textMax.indexOf('Min') == -1 ? 0 : SF.cleanPrice(textMax.substring((textMax.indexOf('Hrs') + 1), textMax.indexOf('Min')));
        V.frontNumbersOvernightDown.JobTimeMaxDel = hoursMax * 60 + minutesMax;
    }), config.timeout);

condition.nowWeDoing = 'запоминаем данные Estimated Labor и Overnight Storage';

    driver.wait(driver.findElement(By.xpath('//div[@class="box_info total storage"]//div/span')).getText().then(function(text){
        V.frontNumbersOvernightDown.EstimatedLaborMin = SF.cleanPrice(text.substring(0, text.indexOf('-')));
        V.frontNumbersOvernightDown.EstimatedLaborMax = SF.cleanPrice(text.substring(text.indexOf('-') + 1));
    }), config.timeout);
/*    driver.wait(driver.findElement(By.xpath('//div[@ng-if="!overnightMove"]/span')).getText().then(function(text){
        V.frontNumbersOvernightDown.OvernightStorageMin = SF.cleanPrice(text.substring(0, text.indexOf('-')));
        V.frontNumbersOvernightDown.OvernightStorageMax = SF.cleanPrice(text.substring(text.indexOf('-') + 1));
    }), config.timeout);
*/
    SF.sleep(1);
    console.log(V.frontNumbersOvernightDown);

    SF.click(By.id('submitRequestButton'));
    SF.sleep (2);
    SF.click(By.linkText('View Request Page'));
    SF.sleep(4);
    SF.openTab (1);

    condition.nowWeDoing = 'пошли в аккаунт';

    SF.sleep (3);
    SF.waitForVisible (By.xpath('//div[@class="calc-confirm ng-binding"]'));
    SF.click (By.xpath('//button[@ng-click="cancel()"]'));
    SF.sleep (0.5);

    V.accountNumbersUp = {};
    LF.RememberAccountNumbers (V.accountNumbersUp);
    LF.Validation_Compare_Account_Front_MovStorTo(V.accountNumbersUp,V.frontNumbersOvernightDown);

    SF.click(By.xpath('//a[@ng-click="vm.goToRequest(vm.request.storage_id)"]'));
    SF.sleep (2);

    V.accountNumbersDelivery = {};
    SF.sleep (0.5);
    LF.RememberAccountNumbers(V.accountNumbersDelivery);
    LF.Validation_Compare_Account_Front_MovStorFrom (V.accountNumbersDelivery,V.frontNumbersOvernightDown);

    LF.LogoutFromAccount ();
    SF.get (V.adminURL);
    LF.LoginToBoardAsAdmin();

    LF.OpenRequest(V.accountNumbersUp.Id);

    JS.step(JSstep.selectTruck);

    V.boardNumbersUp = {};
    LF.RememberDigitsRequestBoard(V.boardNumbersUp);
    condition.nowWeDoing = 'сравниваем аккаунт и админку';
    LF.Validation_Compare_Account_Admin(V.accountNumbersUp,V.boardNumbersUp);
    JS.select ('#edit-status', 2);

    SF.click (By.xpath('//button[@ng-click="UpdateRequest()"]'));
    SF.waitForVisible (By.xpath('//button[@ng-click="update(request)"]'));
    SF.click (By.xpath('//button[@ng-click="update(request)"]'));
    SF.sleep (5);
    SF.click (By.xpath('//a[@ng-click="select(tabs[4])"]'));
    SF.sleep (0.5);
    V.client.passwd = 123;
    SF.send (By.id('inputPassword3'), V.client.passwd);
    SF.click (By.xpath('//button[@ng-click="update(client)"]'));
    SF.sleep (3);
    JS.waitForNotExist('div.toast-success');
    SF.click (By.xpath('//button[@ng-click="cancel()"]'));
    SF.sleep (5);

    LF.OpenRequest(V.accountNumbersDelivery.Id); /********************************************************************/

    JS.step(JSstep.selectTruck);
    V.boardNumbersDelivery = {};
    LF.RememberDigitsRequestBoard(V.boardNumbersDelivery);
    condition.nowWeDoing = 'сравниваем аккаунт и админку';
    LF.Validation_Compare_Account_Admin(V.accountNumbersDelivery,V.boardNumbersDelivery);
    JS.select ('#edit-status', 2);


    SF.click (By.xpath('//button[@ng-click="UpdateRequest()"]'));
    SF.waitForVisible (By.xpath('//button[@ng-click="update(request)"]'));
    SF.click (By.xpath('//button[@ng-click="update(request)"]'));
    JS.waitForNotExist('button[ng-click="update(request)"]:visible');
    JS.waitForNotExist('div.toast-success:visible');
    LF.closeEditRequest ();

    LF.LogoutFromBoardAdmin ();
    SF.get(V.accountURL);
    LF.LoginToAccountAsClient (V.client, V.client.passwd);

    SF.waitForVisible(By.xpath('//td[contains(text(),"'+V.accountNumbersUp.Id+'")]/following-sibling::td[1]'));
    driver.wait(driver.findElement(By.xpath('//td[contains(text(),"'+V.accountNumbersUp.Id+'")]/following-sibling::td[1]')).getText().then(function(Status){
        VD.IWant(VD.VToEqual,Status,'Not Confirmed');
    }), config.timeout);
    SF.sleep (1);
    SF.click(By.xpath('//td[contains(text(),"'+V.accountNumbersUp.Id+'")]/following-sibling::td/button[contains(text(),"View")]'));
    SF.sleep(3);
    SF.click (By.xpath('//div[@class="field-status notconfirmed ng-scope"]/a'));
    SF.click (By.xpath('//i[@class="fa fa-angle-down arrow-down"]'));
    SF.sleep (0.5);
    SF.click (By.id('terms'));
    SF.click (By.id('cancel_policy'));
    SF.click (By.id('paybutton'));
    SF.waitForVisible (By.xpath('//div[@class="sweet-alert showSweetAlert visible"]'));
    SF.click (By.xpath('//button[@class="confirm"]'));
    SF.waitForVisible (By.xpath('//div[@class="modal-body form-horizontal"]'));
    SF.send (By.id('edit-moving-from'), 'otkuda edem');
    SF.send (By.id('edit-moving-from-apt'), 324535);
    SF.click (By.xpath('//button[@ng-click="update(client)"]'));
    SF.waitForVisible (By.xpath('//div[@class="sweet-alert showSweetAlert visible"]'));
    SF.click (By.xpath('//button[@class="confirm"]'));

    SF.waitForVisible(By.xpath('//canvas[@id="signatureCanvasReserv"]'));
    LF.MakeSignJS('signatureCanvasReserv');
    SF.sleep(0.5);
    SF.click(By.xpath('//button[@ng-click="saveReservSignature();logClickButtons(\'Save reservation sign button clicked\')"]'));
    SF.sleep (1);
    LF.FillCardPayModal ();
    SF.waitForVisible (By.xpath('//div[@class="field-status confirm ng-scope"]'));
    driver.wait(driver.findElement(By.xpath('//div[@class="field-status confirm ng-scope"]/div')).getText().then(function(confirmed){
        VD.IWant (VD.VToEqual, confirmed, 'YOUR MOVE IS CONFIRMED AND SCHEDULED', 'статус не конферм, хотя должен был быть');
    }), config.timeout);

    SF.click(By.xpath('//a[@ng-click="vm.goToRequest(vm.request.storage_id)"]'));
    SF.sleep (2);
condition.nowWeDoing = 'букаем вторую работу овернайта';

    SF.click (By.xpath('//div[@class="field-status notconfirmed ng-scope"]/a'));
    SF.click (By.xpath('//i[@class="fa fa-angle-down arrow-down"]'));
    SF.sleep (0.5);
    SF.click (By.id('terms'));
    SF.click (By.id('cancel_policy'));
    SF.click (By.id('paybutton'));

    SF.waitForVisible(By.xpath('//canvas[@id="signatureCanvasReserv"]'));
    LF.MakeSignJS('signatureCanvasReserv');
    SF.sleep(0.5);




    SF.endOfTest();
};
