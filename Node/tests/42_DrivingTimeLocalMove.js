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
    SF.click(By.linkText('Create Request'));
    SF.sleep(2);
    SF.click(By.xpath('//div[@class="step1"]//select[@name="move_service_type"]/option[@value="number:1"]'));
    SF.click(By.xpath('//input[@id="edit-move-date-datepicker-popup-0"]'));
    V.request = {};
    driver.wait(driver.executeScript(JSstep.Click4DaysCalendar).then(function (calDate) {
        V.request.moveDate = calDate;
        console.log(V.request);
    }),config.timeout);
    SF.sleep(0.5);
    SF.click(By.xpath('//ul[@class="chosen-choices"]'));
    SF.click(By.xpath('//ul[@class="chosen-results"]/li[@data-option-array-index="1"]'));
    driver.wait(driver.findElement(By.xpath('//input[@ng-model="editrequest.data.field_date"]')).getAttribute("value").then(function(mdate){
        V.request.mdate = (mdate);
    }),config.timeout);
    console.log (V.request.mdate);
    SF.send(By.id("edit-zip-code-from"), "07030");
    SF.send(By.id("edit-zip-code-to"), "02148");
    SF.sleep(4);
    SF.click(By.xpath('//button[@ng-click="Calculate()"]'));
    SF.sleep(1);
    JS.waitForNotExist('div.busyoverlay:visible');
    SF.sleep(1);
condition.nowWeDoing = 'запоминаем данные с калькулятора при создании реквеста';
    V.LocalMoveAdminCalc = {};
    LF.RememberLocalMoveDigitsCalc (V.LocalMoveAdminCalc);
    SF.click(By.xpath('//button[@ng-click="step2 = false;step3 = true;"]'));
    SF.sleep(2);
    SF.send(By.xpath('//div[@class="step3"]//input[@ng-model="editrequest.account.fields.field_user_first_name"]'), V.client.name);
    SF.send(By.xpath('//div[@class="step3"]//input[@ng-model="editrequest.account.fields.field_user_last_name"]'), V.client.fam);
    SF.send(By.xpath('//div[@class="step3"]//input[@ng-model="editrequest.account.mail"]'), V.client.email);
    SF.send(By.xpath('//div[@class="step3"]//input[@ng-model="editrequest.account.fields.field_primary_phone"]'), V.client.phone);
    SF.click(By.xpath('//button[@ng-click="create()"]'));
    SF.waitForVisible(By.xpath('//div[@ng-click="chooseTruck(tid)"]'));
    SF.sleep(4);
    console.log('создали реквест');
    V.boardNumbersClean = {};
    LF.RememberDigitsRequestBoard(V.boardNumbersClean);
condition.nowWeDoing = 'сравниваем данные которые были в калькуляторе при создании и внутри реквеста, первый раз';
    LF.Validation_Compare_CalcLocalMove_Admin (V.LocalMoveAdminCalc, V.boardNumbersClean);
    driver.wait(driver.findElement(By.xpath('//span[@ng-click="showWarningBeforeSendEmail()"]/following-sibling::div[1]')).getText().then(function (text) {
        VD.IWant (VD.VToEqual, text, "LOCAL MOVE", 'тип реквеста не совпал, должен быть локал мув');
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
    LF.OpenRequest (V.request.Id);
    JS.step(JSstep.selectTruck((V.boardNumbersClean.LaborTimeMax + V.boardNumbersClean.TravelTime)/60));
    MF.EditRequest_SetToNotConfirmed ();
    MF.EditRequest_SaveChanges ();
    LF.closeEditRequest ();
    MF.Board_OpenNotConfirmed ();
    LF.OpenRequest (V.request.Id);
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
    console.log(V.logNumbers);
    VD.IWant(VD.VToEqual, V.logNumbers.TotalMin, V.boardNumbersNotConfirmed.TotalMin, 'не совпали TotalMin в логах и борда');
    VD.IWant(VD.VToEqual, V.logNumbers.TotalMax, V.boardNumbersNotConfirmed.TotalMax, 'не совпали TotalMax в логах и борда');
    VD.IWant(VD.VToEqual, V.logNumbers.Fuel, V.boardNumbersNotConfirmed.Fuel, 'не совпали Fuel в логах и борда');
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
    SF.click(By.xpath('//div[contains(@class,"notconfirmed")]'));
    SF.sleep(2);
condition.nowWeDoing = 'перешли на конфирмейшн пейдж и сравним данные с бордом';
    V.ConfirmationPage = {};
    driver.wait(driver.findElement(By.xpath('//h2[contains(text(), "Estimated Quote")]/following-sibling::div[1]/div/div/div')).getText().then(function (text) {
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
    VD.IWant(VD.VToEqual, V.ConfirmationPage.TotalMin, V.boardNumbersNotConfirmed.TotalMin, 'не совпали TotalMin в конфирмейшн пейдж и борда');
    VD.IWant(VD.VToEqual, V.ConfirmationPage.TotalMax, V.boardNumbersNotConfirmed.TotalMax, 'не совпали TotalMax в конфирмейшн пейдж и борда');
    VD.IWant(VD.VToEqual, V.ConfirmationPage.Fuel, V.boardNumbersNotConfirmed.Fuel, 'не совпали Fuel в конфирмейшн пейдж и борда');
    Debug.pause ();
    LF.LogoutFromAccount ();

    //=========================закончили писать тест=============================
    SF.endOfTest();
};
