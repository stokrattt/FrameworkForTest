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

condition.nowWeDoing = 'идем в настройки и выставляем настройки для драйвинг тайма и травел тайма';
    MF.Board_OpenSettingsGeneral ();
    SF.sleep(2);
    JS.scroll ('input[ng-model=\\"vm.basicSettings.isflat_rate_miles\\"]');
    driver.wait(driver.executeScript("if($('input[ng-model=\"vm.basicSettings.isflat_rate_miles\"]').hasClass('ng-empty')){" +
        "return true;}else{$('input[ng-model=\"vm.basicSettings.isflat_rate_miles\"]').click()}"));
    SF.clear (By.xpath('//input[@ng-model="vm.basicSettings.flat_rate_miles"]'));
    SF.send (By.xpath('//input[@ng-model="vm.basicSettings.flat_rate_miles"]'), 150);
    JS.scroll('td:contains("Company Address")');

condition.nowWeDoing = 'тут заходим в маркетинг тулс и выключаем их';
    SF.click(By.linkText('Marketing Tools'));
    SF.sleep(1);
    driver.wait(driver.executeScript("if($('input[ng-model=\"vm.basicSettings.promoTextOn\"]').hasClass('ng-empty')){" +
        "return true;}else{$('input[ng-model=\"vm.basicSettings.promoTextOn\"]').click()}"),config.timeout);
    SF.sleep(0.5);
    driver.wait(driver.executeScript("if($('input[ng-model=\"vm.basicSettings.localDistountOn\"]').hasClass('ng-empty')){" +
        "return true;}else{$('input[ng-model=\"vm.basicSettings.localDistountOn\"]').click()}"),config.timeout);
    SF.sleep(0.5);

    driver.wait(driver.executeScript("if($('input[ng-model=\"vm.basicSettings.longDistanceDistountOn\"]').hasClass('ng-empty')){" +
        "return true;}else{$('input[ng-model=\"vm.basicSettings.longDistanceDistountOn\"]').click()}"),config.timeout);
    SF.sleep(4);

condition.nowWeDoing = 'тут идем в калькулятор и выставляем настройки для проверки драйвинг тайма';
    SF.click(By.xpath('//a[@ui-sref="settings.calculator"]'));
    SF.sleep(1);
    SF.click(By.linkText('Travel Time'));
    SF.sleep(2);
    driver.wait(driver.executeScript("if($('input[ng-model=\"vm.calcSettings.flatTravelTime.isActive\"]').hasClass('ng-not-empty')){" +
        "return true;}else{$('input[ng-model=\"vm.calcSettings.flatTravelTime.isActive\"] ~span').click()}"));
    SF.clear (By.xpath('//input[@ng-model="vm.calcSettings.flatTravelTime.center_postalCode"]'));
    SF.send (By.xpath('//input[@ng-model="vm.calcSettings.flatTravelTime.center_postalCode"]'), "07601");
    SF.clear (By.xpath('//input[@ng-model="vm.calcSettings.flatTravelTime.radius"]'));
    SF.send (By.xpath('//input[@ng-model="vm.calcSettings.flatTravelTime.radius"]'), "15");
    SF.clear (By.xpath('//input[@ng-model="vm.calcSettings.flatTravelTime.amount"]'));
    SF.send (By.xpath('//input[@ng-model="vm.calcSettings.flatTravelTime.amount"]'), "15");
    SF.clear (By.xpath('//input[@ng-model="vm.basicSettings.local_flat_miles"]'));
    SF.send (By.xpath('//input[@ng-model="vm.basicSettings.local_flat_miles"]'), "350");
    SF.click (By.xpath('//input[@ng-model="vm.calcSettings.flatTravelTime.radius"]'));
    SF.sleep(3);
    MF.Board_OpenDashboard ();

condition.nowWeDoing = 'создаем локал мув с требуемыми зип кодами';
    MF.WaitWhileBusy ();
    MF.Board_ClickCreate();
    MF.CreateRequest_SelectServiceType(1);
    MF.CreateRequest_ClickMoveDateInput();
    V.request = {};
    driver.wait(driver.executeScript(JSstep.Click4DaysCalendar).then(function (calDate) {
        V.request.moveDate = calDate;
    }),config.timeout);
    SF.sleep(1);
    MF.CreateRequest_SelectExtraRooms(1);
    driver.wait(driver.findElement(By.xpath('//input[@ng-model="editrequest.data.field_date"]')).getAttribute("value").then(function(mdate){
        V.request.mdate = (mdate);
    }),config.timeout);
    MF.CreateRequest_SendZipToZipFrom('07030', '02148');
    MF.CreateRequest_ClickCalculate();

condition.nowWeDoing = 'запоминаем данные с калькулятора при создании реквеста';
    V.LocalMoveAdminCalc = {};
    LF.RememberLocalMoveDigitsCalc (V.LocalMoveAdminCalc);
    MF.CreateRequest_ClickContinue();
    MF.CreateRequest_SendClientInfo(V.client);
    MF.CreateRequest_ClickCreate();
    V.boardNumbersClean = {};
    LF.RememberDigitsRequestBoard(V.boardNumbersClean);

condition.nowWeDoing = 'сравниваем данные которые были в калькуляторе при создании и внутри реквеста, первый раз';
    LF.Validation_Compare_CalcLocalMove_Admin (V.LocalMoveAdminCalc, V.boardNumbersClean);
    driver.wait(driver.findElement(By.xpath('//div[contains(@class, "service-type-label")]')).getText().then(function (text) {
        VD.IWant (VD.ToEqual, text, "LOCAL MOVE", 'тип реквеста не совпал, должен быть локал мув');
    }),config.timeout);
    MF.EditRequest_RememberId (V.request);
    MF.EditRequest_OpenClient ();
    LF.SetClientPasswd (123);
    LF.closeEditRequest ();
    MF.WaitWhileToaster ();
    MF.Board_LogoutAdmin ();
    SF.get(V.accountURL);
    LF.LoginToAccountAsClient (V.client);
    MF.Account_OpenRequest(V.request.Id);
    MF.Account_ClickViewRequest ();

condition.nowWeDoing = 'первый раз в аккаунте, сравниваем данные с бордом, все чистое, первый раз';
    V.accountNumbersClean = {};
    LF.RememberAccountNumbers (V.accountNumbersClean);
    LF.Validation_Compare_Account_Admin (V.accountNumbersClean, V.boardNumbersClean);
    LF.LogoutFromAccount ();
    SF.get(V.adminURL);
    LF.LoginToBoardAsCustom(V.adminLogin,V.adminPassword);

condition.nowWeDoing = 'защли а админку второй раз, ставим нот конфем, трак, сохраняем, закрываем, открываем и сравниваем данные которые были первый раз в реквесте с данными после того как изменили статус';
    MF.Board_OpenRequest (V.request.Id);
    JS.step(JSstep.selectTruck((V.boardNumbersClean.LaborTimeMax + V.boardNumbersClean.TravelTime)/60));
    MF.WaitWhileBusy();
    MF.EditRequest_SetToNotConfirmed ();
    MF.EditRequest_SaveChanges ();
    LF.closeEditRequest ();
    MF.Board_OpenNotConfirmed ();
    MF.Board_OpenRequest (V.request.Id);
    V.boardNumbersNotConfirmed = {};
    LF.RememberDigitsRequestBoard(V.boardNumbersNotConfirmed);
    LF.Validation_Compare_Account_Admin (V.boardNumbersClean, V.boardNumbersNotConfirmed);

condition.nowWeDoing = 'идем в логи проверять что клиенту отправилось правильный гранд тотал и фуел';
    MF.EditRequest_OpenLogs ();
    V.logNumbers={};
    SF.click(By.xpath('//span[@ng-bind-html="toTrustedHTML(item.text)"][contains(text(),"Request Local Quote (Not Confirmed Status)")][contains(text(),"'+V.client.email+'")]/../../../following-sibling::div[1]'));
    driver.wait(driver.findElement(By.xpath('//span[@aria-hidden="false"]//h3[contains(text(),"Fuel")]/../../../../../../' +
        'following-sibling::td[1]//div')).getText().then(function(text){
        V.logNumbers.Fuel = SF.cleanPrice (text);
    }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//span[@aria-hidden="false"]//h3[contains(text(),"Estimated Quote")]/../../../../../../' +
        'following-sibling::td[1]//div')).getText().then(function(text){
        if (text.indexOf('$', text.indexOf('$') + 3) !== -1) {
            V.logNumbers.TotalMin = SF.cleanPrice(text.substring(text.indexOf('$'), text.indexOf('-')));
            V.logNumbers.TotalMax = SF.cleanPrice(text.substring(text.indexOf('$', text.indexOf('$') + 3)));
        } else {
            V.logNumbers.Total = SF.cleanPrice(text);
        }
    }),config.timeout);
    SF.sleep(1);
    VD.IWant(VD.ToEqual, V.logNumbers.TotalMin, V.boardNumbersNotConfirmed.TotalMin, 'не совпали TotalMin в логах и борда');
    VD.IWant(VD.ToEqual, V.logNumbers.TotalMax, V.boardNumbersNotConfirmed.TotalMax, 'не совпали TotalMax в логах и борда');
    VD.IWant(VD.ToEqual, V.logNumbers.Fuel, V.boardNumbersNotConfirmed.Fuel, 'не совпали Fuel в логах и борда');
    LF.closeEditRequest ();
    MF.Board_LogoutAdmin ();
    SF.get(V.accountURL);
    LF.LoginToAccountAsClient (V.client);
    MF.Account_OpenRequest(V.request.Id);

condition.nowWeDoing = 'второй раз в аккаунте, сравниваем данные с бордом, те которые запомнили после статуса нот конферм';
    V.accountNumbersNotConfirm = {};
    LF.RememberAccountNumbers (V.accountNumbersNotConfirm);
    LF.Validation_Compare_Account_Admin (V.accountNumbersNotConfirm, V.boardNumbersNotConfirmed);
    SF.sleep(1);
    MF.Account_ClickProceedBookYourMove();

    condition.nowWeDoing = 'перешли на конфирмейшн пейдж и сравним данные с бордом';
    V.ConfirmationPage = {};
    driver.wait(driver.findElement(By.xpath('//h2[contains(text(), "Estimated Quote")]/following-sibling::div[1]/div/div')).getText().then(function (text) {
        if (text.indexOf('$', text.indexOf('$') + 3) !== -1) {
            V.ConfirmationPage.TotalMin = SF.cleanPrice(text.substring(text.indexOf('$'), text.indexOf('-')));
            V.ConfirmationPage.TotalMax = SF.cleanPrice(text.substring(text.indexOf('$', text.indexOf('$') + 3)));
        } else {
            V.ConfirmationPage.Total = SF.cleanPrice(text);
        }
    }),config.timeout);
    SF.sleep(1);
    driver.wait(driver.findElement(By.xpath('//h2[contains(text(),"Fuel Surcharge")]/..')).getText().then(function(text){
        V.ConfirmationPage.Fuel = SF.cleanPrice(text.substring(text.indexOf('$')));
    }),config.timeout);
    SF.sleep(1);
    VD.IWant(VD.ToEqual, V.ConfirmationPage.TotalMin, V.boardNumbersNotConfirmed.TotalMin, 'не совпали TotalMin в конфирмейшн пейдж и борда до резервации');
    VD.IWant(VD.ToEqual, V.ConfirmationPage.TotalMax, V.boardNumbersNotConfirmed.TotalMax, 'не совпали TotalMax в конфирмейшн пейдж и борда до резервации');
    VD.IWant(VD.ToEqual, V.ConfirmationPage.Fuel, V.boardNumbersNotConfirmed.Fuel, 'не совпали Fuel в конфирмейшн пейдж и борда до резервации');
    SF.sleep(1);

condition.nowWeDoing = 'тут букаем работу и опять сравниваем данные после резервации на конфирмейшн с аккаунтом';
    MF.Account_ConfirmationBackToRequest ();
    LF.ConfirmRequestInAccount_WithReservationWithAdress ();
    MF.Account_ClickViewConfirmationPage ();

    V.ConfirmationPageAfterConfirm = {};
    driver.wait(driver.findElement(By.xpath('//h2[contains(text(), "Estimated Quote")]/following-sibling::div[1]/div/div')).getText().then(function (text) {
        if (text.indexOf('$', text.indexOf('$') + 3) !== -1) {
            V.ConfirmationPageAfterConfirm.TotalMin = SF.cleanPrice(text.substring(text.indexOf('$'), text.indexOf('-')));
            V.ConfirmationPageAfterConfirm.TotalMax = SF.cleanPrice(text.substring(text.indexOf('$', text.indexOf('$') + 3)));
        } else {
            V.ConfirmationPageAfterConfirm.Total = SF.cleanPrice(text);
        }
    }),config.timeout);
    SF.sleep(1);
    driver.wait(driver.findElement(By.xpath('//h2[contains(text(),"Fuel Surcharge")]/..')).getText().then(function(text){
        V.ConfirmationPageAfterConfirm.Fuel = SF.cleanPrice(text.substring(text.indexOf('$')));
    }),config.timeout);
    SF.sleep(1);
    VD.IWant(VD.ToEqual, V.ConfirmationPageAfterConfirm.TotalMin, V.boardNumbersNotConfirmed.TotalMin, 'не совпали TotalMin в конфирмейшн пейдж и борда после резервации');
    VD.IWant(VD.ToEqual, V.ConfirmationPageAfterConfirm.TotalMax, V.boardNumbersNotConfirmed.TotalMax, 'не совпали TotalMax в конфирмейшн пейдж и борда после резервации');
    VD.IWant(VD.ToEqual, V.ConfirmationPageAfterConfirm.Fuel, V.boardNumbersNotConfirmed.Fuel, 'не совпали Fuel в конфирмейшн пейдж и борда после резервации');
    SF.sleep(1);
    LF.LogoutFromAccount ();
    SF.get(V.adminURL);
    LF.LoginToBoardAsAdmin (V.adminLogin, V.adminPassword);

condition.nowWeDoing = 'возвращаемся на мувборд и включаем маркетинг тулс';
    MF.Board_OpenSettingsGeneral ();
    SF.sleep(2);
    SF.click(By.linkText('Marketing Tools'));
    SF.sleep(2);
    JS.click('div input[ng-model=\"vm.basicSettings.promoTextOn\"]');
    SF.sleep(3);
    JS.click('div input[ng-model=\"vm.basicSettings.localDistountOn\"]');
    SF.sleep(3);
    JS.click('div input[ng-model=\"vm.basicSettings.longDistanceDistountOn\"]');
    SF.sleep(3);

    //=========================закончили писать тест=============================
    SF.endOfTest();
};
