module.exports = function main(SF, JS, MF, LF, JSstep, VD, V, By, until,FileDetector, system, condition, config,constants) {    global.fiber = Fiber.current;
    V.client = {};
    V.client.name = SF.randomBukva(6) + '_t';
    V.client.fam = SF.randomBukva(6) + '_t';
    V.client.phone = SF.randomCifra(10);
    V.client.email = SF.randomBukvaSmall(6) + '@' + SF.randomBukvaSmall(4) + '.tes';

    //=========================начинаем писать тест=============================
    SF.get(V.adminURL);
    LF.LoginToBoardAsCustom(V.adminLogin,V.adminPassword);
    SF.sleep (3);
condition.nowWeDoing = 'выставляем настройки лонг дистанс для калифорнии';
    MF.Board_OpenSettingsGeneral();
    MF.Board_OpenSettingsLongDistance ();
    MF.LongDistanceSettings_ClickOnMapCaliforniya();
    driver.wait(driver.executeScript("if($('input[ng-model=\"vm.longdistance.stateRates[vm.longdistance.basedState][vm.stateCode].longDistance\"]').hasClass('ng-not-empty')){" +
        "return true;}else{" +
        "$('input[ng-model=\"vm.longdistance.stateRates[vm.longdistance.basedState][vm.stateCode].longDistance\"]').click()}"),config.timeout);
    SF.clear (By.xpath('//input[@ng-model="vm.longdistance.stateRates[vm.longdistance.basedState][vm.stateCode].min_weight"]'));
    SF.send(By.xpath('//input[@ng-model="vm.longdistance.stateRates[vm.longdistance.basedState][vm.stateCode].min_weight"]'), 200);
    SF.sleep (2);
    SF.clear (By.xpath('//input[@ng-model="vm.longdistance.stateRates[vm.longdistance.basedState][vm.stateCode].state_rate"]'));
    SF.send(By.xpath('//input[@ng-model="vm.longdistance.stateRates[vm.longdistance.basedState][vm.stateCode].state_rate"]'), 10);
    SF.sleep (2);
    driver.wait(driver.executeScript("if($('input[ng-model=\"vm.longdistance.acceptAllQuotes\"]').hasClass('ng-not-empty')){" +
        "return true;}else{" +
        "$('input[ng-model=\"vm.longdistance.acceptAllQuotes\"]').click()}"),config.timeout);
    SF.sleep (2);
    MF.LongDistanceSettings_SelectMABasedState();
    SF.click(By.xpath('//input[@ng-model="vm.longdistance.stateRates[vm.longdistance.basedState][vm.stateCode].delivery_days"]'));
    MF.Board_LogoutAdmin ();
    SF.get(V.frontURL);
    SF.sleep (4);
condition.nowWeDoing = 'заполняем калькулятор верхний';
    LF.FullSmallCalcAsLD (V.client);
    condition.nowWeDoing = 'первый раз в аккаунте';
    MF.Account_ClickViewRequest();
    MF.WaitWhileBusy ();
    MF.WaitWhileBusy ();
    SF.sleep(3);
condition.nowWeDoing = 'запоминаем данные по лонг дистансу';
    V.accountNumbersLD={};
    driver.wait(driver.executeScript('return $("div:contains(\\"Move Date (Pick Up Day):\\"):last").next().text()').then(function (dateString) {
        dateString = dateString.toUpperCase();
        V.accountNumbersLD.moveDate = {};
        V.accountNumbersLD.moveDate.Month = SF.FindMonthInString(dateString);
        V.accountNumbersLD.moveDate.Day = SF.cleanPrice(dateString.substring(0, dateString.indexOf(',')));
        V.accountNumbersLD.moveDate.Year = SF.cleanPrice(dateString.substring(dateString.indexOf(',')));
    }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//span[contains(text(),"Fuel Surcharge")]/../../div[2]')).getText().then(function (text) {
        V.accountNumbersLD.Fuel = SF.cleanPrice(text);
    }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//div[contains(text(),"Long Distance Grand Total")]/following-sibling::div[1]')).getText().then(function (text) {
        if (text.indexOf("You save") !== -1) {
            let t = text.substring(0, text.indexOf("You save"));
            t = t.substring(t.indexOf('$', t.indexOf('$', t.indexOf('$') + 1)));
            V.accountNumbersLD.Total = SF.cleanPrice(t);
        } else {
            console.log('ещё не делали без скидок');
        }
    }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//div[contains(text(),"Request ID")]/span')).getText().then(function (text) {
        V.accountNumbersLD.Id = SF.cleanPrice(text);
    }),config.timeout);
    console.log(V.accountNumbersLD);
    SF.sleep(1);
    LF.addToCleanerJob(V.accountNumbersLD.Id);
    LF.LogoutFromAccount ();
    SF.get(V.adminURL);
    LF.LoginToBoardAsCustom(V.adminLogin,V.adminPassword);
condition.nowWeDoing = 'зашли на админку для сравнения';
    SF.sleep (2);
    MF.Board_OpenRequest (V.accountNumbersLD.Id);
    Debug.pause();
    V.boardNumbers = {};
    driver.wait(driver.findElement(By.xpath('//input[@ng-model="moveDateInput"]')).getAttribute("value").then(function (dateString) {
        dateString = dateString.toUpperCase();
        V.boardNumbers.moveDate = {};
        V.boardNumbers.moveDate.Month = SF.FindMonthInString(dateString);
        V.boardNumbers.moveDate.Day = SF.cleanPrice(dateString.substring(0, dateString.indexOf(',')));
        V.boardNumbers.moveDate.Year = SF.cleanPrice(dateString.substring(dateString.indexOf(',')));
    }),config.timeout);
    LF.RememberDigitsRequestBoard_Down (V.boardNumbers);
    SF.sleep (2);
    VD.IWant(VD.ToEqual, V.accountNumbersLD.moveDate.Day, V.boardNumbers.moveDate.Day, 'не совпали даты аккаунта и борда');
    VD.IWant(VD.ToEqual, V.accountNumbersLD.moveDate.Month, V.boardNumbers.moveDate.Month, 'не совпали даты аккаунта и борда');
    VD.IWant(VD.ToEqual, V.accountNumbersLD.moveDate.Year, V.boardNumbers.moveDate.Year, 'не совпали даты аккаунта и борда');
    VD.IWant(VD.ToEqual, V.accountNumbersLD.Total, V.boardNumbers.Total, 'не совпали Total аккаунта и борда');
    VD.IWant(VD.ToEqual, V.accountNumbersLD.Fuel, V.boardNumbers.Fuel, 'не совпали Fuel аккаунта и борда');
    SF.sleep (2);
    // MF.EditRequest_SaveChanges ();
    MF.EditRequest_OpenClient ();
    V.client.passwd = 123;
    LF.SetClientPasswd (V.client.passwd);
    LF.closeEditRequest ();
    MF.Board_LogoutAdmin ();
    SF.get(V.accountURL);
    LF.LoginToAccountAsClient (V.client, V.client.passwd);
condition.nowWeDoing = 'зашли в аккаунт и добавляем инвентори';
    MF.Account_CheckRequestStatus_Pending (V.accountNumbersLD.Id);
    MF.Account_OpenRequest (V.accountNumbersLD.Id);
    // MF.Account_ClickViewRequest();
    LF.AccountLocalAddInventory();
    SF.sleep(5);
condition.nowWeDoing = 'запоминаем данные по лонг дистансу после добавления инвентори на аккаунте';
    V.accountNumbersLDWithInvent={};
    driver.wait(driver.executeScript('return $("div:contains(\\"Move Date (Pick Up Day):\\"):last").next().text()').then(function (dateString) {
        dateString = dateString.toUpperCase();
        V.accountNumbersLDWithInvent.moveDate = {};
        V.accountNumbersLDWithInvent.moveDate.Month = SF.FindMonthInString(dateString);
        V.accountNumbersLDWithInvent.moveDate.Day = SF.cleanPrice(dateString.substring(0, dateString.indexOf(',')));
        V.accountNumbersLDWithInvent.moveDate.Year = SF.cleanPrice(dateString.substring(dateString.indexOf(',')));
    }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//span[contains(text(),"Fuel Surcharge")]/../../div[2]')).getText().then(function (text) {
        V.accountNumbersLDWithInvent.Fuel = SF.cleanPrice(text);
    }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//div[contains(text(),"Long Distance Grand Total")]/following-sibling::div[1]')).getText().then(function (text) {
        if (text.indexOf("You save") !== -1) {
            let t = text.substring(0, text.indexOf("You save"));
            t = t.substring(t.indexOf('$', t.indexOf('$', t.indexOf('$') + 1)));
            V.accountNumbersLDWithInvent.Total = SF.cleanPrice(t);
        } else {
            console.log('ещё не делали без скидок');
        }
    }),config.timeout);

    driver.wait(driver.findElement(By.xpath('//span[contains(text()," Total Estimated: ")]/span')).getText().then(function (text) {
        V.accountNumbersLDWithInvent.CubicFit = SF.cleanPrice(text.substring(0, text.indexOf('c')));
    }),config.timeout);
    SF.sleep(2);
    LF.LogoutFromAccount ();
    SF.get(V.adminURL);
    LF.LoginToBoardAsCustom(V.adminLogin,V.adminPassword);
condition.nowWeDoing = 'зашли на админку второй раз для сравнения с инвенторием';
    SF.sleep (2);
    MF.Board_OpenRequest (V.accountNumbersLD.Id);
    V.boardNumbersCubFit = {};
    driver.wait(driver.findElement(By.xpath("(//div[@ng-show='!request.isInventory']/span)[1]")).getText().then(function (text){
        V.boardNumbersCubFit = SF.cleanPrice (text);
    }),config.timeout);
    SF.sleep (2);
    VD.IWant(VD.ToEqual, V.boardNumbersCubFit, V.accountNumbersLDWithInvent.CubicFit, 'Кубик фит не совпадает с аккаунтом');

    V.boardNumbers = {};
    driver.wait(driver.findElement(By.xpath('//input[@ng-model="moveDateInput"]')).getAttribute("value").then(function (dateString) {
        dateString = dateString.toUpperCase();
        V.boardNumbers.moveDate = {};
        V.boardNumbers.moveDate.Month = SF.FindMonthInString(dateString);
        V.boardNumbers.moveDate.Day = SF.cleanPrice(dateString.substring(0, dateString.indexOf(',')));
        V.boardNumbers.moveDate.Year = SF.cleanPrice(dateString.substring(dateString.indexOf(',')));
    }),config.timeout);
    LF.RememberDigitsRequestBoard_Down (V.boardNumbers);
    SF.sleep (2);

    VD.IWant(VD.ToEqual, V.accountNumbersLDWithInvent.moveDate.Day, V.boardNumbers.moveDate.Day, 'не совпали даты аккаунта и борда');
    VD.IWant(VD.ToEqual, V.accountNumbersLDWithInvent.moveDate.Month, V.boardNumbers.moveDate.Month, 'не совпали даты аккаунта и борда');
    VD.IWant(VD.ToEqual, V.accountNumbersLDWithInvent.moveDate.Year, V.boardNumbers.moveDate.Year, 'не совпали даты аккаунта и борда');
    VD.IWant(VD.ToEqual, V.accountNumbersLDWithInvent.Total, V.boardNumbers.Total, 'не совпали Total аккаунта и борда');
    VD.IWant(VD.ToEqual, V.accountNumbersLDWithInvent.Fuel, V.boardNumbers.Fuel, 'не совпали Fuel аккаунта и борда');
    SF.sleep (1);
    // MF.EditRequest_SaveChanges ();
    // LF.closeEditRequest ();
    // MF.Board_LogoutAdmin ();

    //=========================закончили писать тест=============================
    SF.endOfTest();
};
