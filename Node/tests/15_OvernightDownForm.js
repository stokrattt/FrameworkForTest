module.exports = function main(SF, JS, MF, LF, JSstep, VD, V, By, until,FileDetector, system, condition, config,constants) {    global.fiber = Fiber.current;
    V.ReservationPrice = {};
    V.client = {};
    V.frontNumbersDown={};
    V.client.name = SF.randomBukva(6) + '_t';
    V.client.fam = SF.randomBukva(6) + '_t';
    V.client.phone = SF.randomCifra(10);
    V.client.email = SF.randomBukvaSmall(6) + '@' + SF.randomBukvaSmall(4) + '.tes';


//     SF.get(V.adminURL);
//     LF.LoginToBoardAsCustom(V.adminLogin,V.adminPassword);
//
// condition.nowWeDoing = 'идем в департмент включить календарь для сеилса';
//     MF.Board_OpenSettingsDepartment ();
//     MF.Department_OpenSales();
//     MF.Department_OpenHuman('JackSales donotdelete');
//     MF.Department_User_OpenAccount();
//     MF.Department_SetGoogleMail(V.salesEmail);
//     MF.Department_TurnOnAllGmailCalendar();
//     MF.Department_SaveUser();
//     SF.sleep(15);
//     MF.WaitWhileToaster();
//     MF.Board_LogoutAdmin();

condition.nowWeDoing = 'идем на фронтовую форму';
    SF.get(V.frontURL);
    JS.waitForExist ('#loader');
    SF.sleep (4);
    LF.CreateOvernightDownForm (V.client);

condition.nowWeDoing = 'запоминаем данные калькулятора PICK UP';
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
    }), config.timeout);
    driver.wait(driver.findElement(By.xpath('//div[contains(@class, to_storage)]/span[contains(text(), "Delivery")]/..//h3[contains(text(), "Hourly Rate:")]/following-sibling::span')).getText().then(function (text) {
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
    MF.FrontSite_GoToConfirmation();
    MF.FrontSite_ViewRequestPage();
    SF.openTab (1);

condition.nowWeDoing = 'пошли в аккаунт';
    MF.Account_ClickViewRequest();
    V.accountNumbersUp = {};
    LF.RememberAccountNumbers (V.accountNumbersUp);
    // LF.addToCleanerJob(V.accountNumbersUp.Id);
    LF.Validation_Compare_Account_Front_MovStorTo(V.accountNumbersUp, V.frontNumbersOvernightDown_UP);
    MF.Account_ClickFromStorage ();
    V.accountNumbersDelivery = {};
    SF.sleep (0.5);
    LF.RememberAccountNumbers(V.accountNumbersDelivery);
    // LF.addToCleanerJob(V.accountNumbersDelivery.Id);
    LF.Validation_Compare_Account_Front_MovStorFrom (V.accountNumbersDelivery, V.frontNumbersOvernightDown_Del);
    LF.LogoutFromAccount ();
    SF.get (V.adminURL);

condition.nowWeDoing = 'зашли в админку';
    LF.LoginToBoardAsCustom(V.adminLogin,V.adminPassword);
    MF.Board_OpenRequest(V.accountNumbersUp.Id);
    V.boardNumbersUp = {};
    LF.RememberDigitsRequestBoard(V.boardNumbersUp);
    JS.step(JSstep.selectTruck((V.boardNumbersUp.LaborTimeMax + V.boardNumbersUp.TravelTime)/60));
    MF.WaitWhileBusy();

condition.nowWeDoing = 'сравниваем аккаунт и админку';
    LF.Validation_Compare_Account_Admin(V.accountNumbersUp,V.boardNumbersUp);
    MF.EditRequest_SetToNotConfirmed ();
    MF.EditRequest_SetAdressFrom ();
    MF.EditRequest_SaveChanges ();
    MF.EditRequest_OpenClient ();
    SF.sleep (0.5);
    V.client.passwd = 123;
    LF.SetClientPasswd (V.client.passwd);
    V.managerFirstName = 'JackSales';
    MF.EditRequest_OpenSettings();
    LF.SetManager(V.managerFirstName);
    LF.closeEditRequest ();
    MF.Board_OpenRequest(V.accountNumbersDelivery.Id);
    V.boardNumbersDelivery = {};
    LF.RememberDigitsRequestBoard(V.boardNumbersDelivery);
    JS.step(JSstep.selectTruck((V.boardNumbersDelivery.LaborTimeMax + V.boardNumbersDelivery.TravelTime)/60));
    MF.WaitWhileBusy();

condition.nowWeDoing = 'сравниваем аккаунт и админку второй реквест';
    LF.Validation_Compare_Account_Admin(V.accountNumbersDelivery,V.boardNumbersDelivery);
    MF.EditRequest_SetToNotConfirmed ();
    MF.EditRequest_SetAdressTo ();
    MF.EditRequest_SaveChanges ();
    V.managerFirstName = 'JackSales';
    MF.EditRequest_OpenSettings();
    LF.SetManager(V.managerFirstName);
    LF.closeEditRequest ();
    MF.Board_LogoutAdmin ();
    SF.get(V.accountURL);
    LF.LoginToAccountAsClient (V.client, V.client.passwd);

condition.nowWeDoing = 'зашли под клиентом букаем первую работу';
    MF.Account_CheckRequestStatus_NotConfirmed(V.accountNumbersUp.Id);
    MF.Account_OpenRequest(V.accountNumbersUp.Id);
    MF.Account_ClickProceedBookYourMove();
    SF.click (By.xpath('//i[@class="fa fa-angle-down arrow-down"]'));
    SF.sleep (0.5);
    SF.click (By.id('cancel_policy'));
    SF.click (By.id('paybutton'));

    SF.waitForVisible(By.xpath('//canvas[@id="signatureCanvasReserv"]'));
    LF.MakeSignJS('signatureCanvasReserv');
    SF.sleep(3);
    SF.click(By.xpath('//button[@ng-click="saveReservSignature();logClickButtons(\'Save reservation sign button clicked\')"]'));
    SF.sleep (1);
    LF.FillCardPayModal ();
    MF.WaitWhileSpinner ();
    MF.Account_WaitForGreenTextAfterConfirm();
    MF.Account_ClickFromStorage();

condition.nowWeDoing = 'букаем вторую работу овернайта';
    MF.Account_ClickProceedBookYourMove();
    SF.click (By.xpath('//i[@class="fa fa-angle-down arrow-down"]'));
    SF.sleep (0.5);
    SF.click (By.id('cancel_policy'));
    SF.click (By.id('paybutton'));
    SF.waitForVisible(By.xpath('//canvas[@id="signatureCanvasReserv"]'));
    LF.MakeSignJS('signatureCanvasReserv');
    SF.sleep(0.5);
    SF.click (By.xpath('//button[@ng-click="saveReservSignature();logClickButtons(\'Save reservation sign button clicked\')"]'));
    SF.sleep (1);
    LF.FillCardPayModal ();
    MF.WaitWhileSpinner ();
    MF.Account_WaitForGreenTextAfterConfirm();
    // LF.LogoutFromAccount ();

// condition.nowWeDoing = 'идем в гугл почту';
//     SF.get('http://gmail.com');
//     SF.sleep(10);
//     MF.Gmail_Login(V.googleloginSale, V.googlePasSale);
//
// condition.nowWeDoing = 'выбираем расписание, ищем в нем 1ю работу';
//     SF.get('https://calendar.google.com/calendar');
//     SF.sleep(2);
//     SF.click (By.xpath('//div[@class="XyKLOd"]'));
//     SF.click (By.xpath('//div[@class="jO7h3c"] [contains(text(), "День")]'));
//     SF.sleep(5);
//     SF.click (By.xpath('//div[@class="LdFQBb"]//div[@aria-label="Следующий день"]'));
//     SF.sleep(1);
//     SF.click (By.xpath('//div[@class="LdFQBb"]//div[@aria-label="Следующий день"]'));
//     SF.sleep(1);
//     SF.click (By.xpath('//div[@class="LdFQBb"]//div[@aria-label="Следующий день"]'));
//     SF.sleep(1);
//     SF.click (By.xpath('//div[@class="LdFQBb"]//div[@aria-label="Следующий день"]'));
//     SF.sleep(1);
//     SF.click (By.xpath('//div[@class="LdFQBb"]//div[@aria-label="Следующий день"]'));
//     SF.waitForLocated(By.xpath('//div[@role="presentation"]//div[@role="button"]//span/html-blob[contains(text(), "'+V.accountNumbersUp.Id+'")]'));
//     driver.wait(driver.findElement(By.xpath('//div[@role="presentation"]//div[@role="button"]//span/html-blob[contains(text(), "'+V.accountNumbersUp.Id+'")]')).getText().then(function(text) {
//         V.Req1Cal = text;
//         VD.IWant(VD.ToEqual, ('#' +V.accountNumbersUp.Id+ ' |'+ ' '+ V.client.name + ' ' +  V.client.fam),text,'не пришла в календарь 1я работа');
//     }),config.timeout);
//
//     condition.nowWeDoing = 'выбираем день 2й работы,кликаем её';
//     SF.click (By.xpath('//div[@class="LdFQBb"]//div[@aria-label="Следующий день"]'));
//     SF.waitForLocated(By.xpath('//div[@role="presentation"]//div[@role="button"]//span/html-blob[contains(text(), "'+V.accountNumbersDelivery.Id+'")]'));
//     driver.wait(driver.findElement(By.xpath('//div[@role="presentation"]//div[@role="button"]//span/html-blob[contains(text(), "'+V.accountNumbersDelivery.Id+'")]')).getText().then(function(text) {
//         V.Req2Cal = text;
//         VD.IWant(VD.ToEqual, ('#' +V.accountNumbersDelivery.Id+ ' |'+ ' '+ V.client.name + ' ' +  V.client.fam),text,'не пришла в календарь 2я работа');
//     }),config.timeout);
//
// condition.nowWeDoing = 'идем в департмент выключить календарь для сеилса';
//     SF.get(V.adminURL);
//     LF.LoginToBoardAsCustom(V.adminLogin,V.adminPassword);
//     MF.Board_OpenSettingsDepartment ();
//     MF.Department_OpenSales();
//     MF.Department_OpenHuman('JackSales donotdelete');
//     MF.Department_User_OpenAccount();
//     SF.click (By.xpath('//input[@ng-model="gmail"]'));
//     SF.clear (By.xpath('//input[@ng-model="gmail"]'));
//     MF.Department_SaveUser();

    SF.endOfTest();
};
