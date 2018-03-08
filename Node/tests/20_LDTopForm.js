module.exports = function main(SF, JS, MF, LF, JSstep, VD, V, By, until,FileDetector, system, condition, config,constants) {    global.fiber = Fiber.current;
    V.client = {};
    V.client.name = SF.randomBukva(6) + '_t';
    V.client.fam = SF.randomBukva(6) + '_t';
    V.client.phone = SF.randomCifra(10);
    V.client.email = SF.randomBukvaSmall(6) + '@' + SF.randomBukvaSmall(4) + '.tes';

    //=========================начинаем писать тест=============================
    SF.get(V.adminURL);
    LF.LoginToBoardAsCustom(V.adminLogin,V.adminPassword);

condition.nowWeDoing = 'выставляем настройки лонг дистанс для калифорнии';
    MF.Board_OpenSettingsGeneral();
    MF.Board_OpenSettingsLongDistance ();
    MF.LongDistanceSettings_ClickOnMapState('#jqvmap1_ca');
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


condition.nowWeDoing = 'заполняем калькулятор верхний';
    SF.get(V.frontURL);
    SF.sleep (2);
    LF.FullSmallCalcAsLD (V.client);
    MF.Account_ClickViewRequest();

condition.nowWeDoing = 'запоминаем данные по лонг дистансу';
    V.accountNumbersLD={};
    LF.RememberAccountNumbersLD(V.accountNumbersLD);
    SF.sleep(10); //для вылогинивания нормального
    LF.LogoutFromAccount ();
    SF.get(V.adminURL);
    LF.LoginToBoardAsCustom(V.adminLogin,V.adminPassword);

condition.nowWeDoing = 'зашли на админку для сравнения';
    MF.Board_OpenRequest (V.accountNumbersLD.Id);
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
    LF.Validation_Compare_Account_Admin_LongDistance (V.accountNumbersLD, V.boardNumbers);
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
    LF.AccountLocalAddInventory();
    SF.sleep(13);

condition.nowWeDoing = 'запоминаем данные по лонг дистансу после добавления инвентори на аккаунте';
    V.accountNumbersLDWithInvent={};
    LF.RememberAccountNumbersLD(V.accountNumbersLDWithInvent);
    driver.wait(driver.findElement(By.xpath('//span[contains(text()," Total Estimated: ")]/span')).getText().then(function (text) {
        V.accountNumbersLDWithInvent.CubicFit = SF.cleanPrice(text.substring(0, text.indexOf('c')));
    }),config.timeout);
    SF.sleep(1);
    LF.LogoutFromAccount ();
    SF.get(V.adminURL);
    LF.LoginToBoardAsCustom(V.adminLogin,V.adminPassword);

condition.nowWeDoing = 'зашли на админку второй раз для сравнения с инвенторием';
    MF.Board_OpenRequest (V.accountNumbersLD.Id);
    V.boardNumbersCubFit = {};
    driver.wait(driver.findElement(By.xpath("(//div[@ng-show='!request.isInventory']/span)[1]")).getText().then(function (text){
        V.boardNumbersCubFit = SF.cleanPrice (text);
        VD.IWant(VD.ToEqual, V.boardNumbersCubFit, V.accountNumbersLDWithInvent.CubicFit, 'Кубик фит не совпадает с аккаунтом');
    }),config.timeout);
    V.boardNumbers = {};
    driver.wait(driver.findElement(By.xpath('//input[@ng-model="moveDateInput"]')).getAttribute("value").then(function (dateString) {
        dateString = dateString.toUpperCase();
        V.boardNumbers.moveDate = {};
        V.boardNumbers.moveDate.Month = SF.FindMonthInString(dateString);
        V.boardNumbers.moveDate.Day = SF.cleanPrice(dateString.substring(0, dateString.indexOf(',')));
        V.boardNumbers.moveDate.Year = SF.cleanPrice(dateString.substring(dateString.indexOf(',')));
    }),config.timeout);
    LF.RememberDigitsRequestBoard_Down (V.boardNumbers);
    SF.sleep (1);
    LF.Validation_Compare_Account_Admin_LongDistance (V.accountNumbersLDWithInvent, V.boardNumbers);

condition.nowWeDoing = 'конфермим работу, делаем клозинг и на этой табе вносим изменения в реквест. Потом запомним все, сохраним';
    JS.step(JSstep.selectTruck(3));
    MF.WaitWhileBusy();
    MF.EditRequest_SetToConfirmed();
    MF.EditRequest_SetAdressToFrom();
    MF.EditRequest_SaveChanges();
    MF.EditRequest_CloseConfirmWork();
    SF.click(By.xpath('//input[@ng-model="invoice.closing_weight.value"]'));
    SF.clear(By.xpath('//input[@ng-model="invoice.closing_weight.value"]'));
    SF.send(By.xpath('//input[@ng-model="invoice.closing_weight.value"]'), 1200);
    MF.EditRequest_AddPackingClosingTab();
    MF.EditRequest_AddAdditionalServClosingTab();
    V.boardNumbersClosingTab = {};
    LF.RememberDigitsRequestBoard_Down (V.boardNumbersClosingTab);
    SF.sleep (1);
    MF.EditRequest_SaveChangesClosingTab();
    LF.closeEditRequest ();

condition.nowWeDoing = 'открываем наш реквест с измененными данными на табе клозинг и сверяем что все осталось измененным';
    MF.Board_OpenConfirmed();
    MF.Board_RefreshDashboard();
    MF.Board_OpenRequest (V.accountNumbersLD.Id);
    MF.EditRequest_CloseConfirmWork();

    driver.wait(driver.findElement(By.xpath("//input[@ng-model=\"invoice.closing_weight.value\"]")).getAttribute('value').then(function (text){
        V.boardNumbersCubFitClosingTab = SF.cleanPrice (text);
        VD.IWant(VD.ToEqual, V.boardNumbersCubFitClosingTab, 1200, 'Кубик фит не совпадает с клозингом, ' +
            'тоесть мы на клозинге поменяли, сохранили, закрыли и сравниваем и он не совпадает а должен');
    }),config.timeout);
    V.boardNumbersClosingAfterReopenedAndCloseRequest = {};
    LF.RememberDigitsRequestBoard_Down (V.boardNumbersClosingAfterReopenedAndCloseRequest);
    SF.sleep (1);
    VD.IWant(VD.ToEqual, V.boardNumbersClosingAfterReopenedAndCloseRequest.Total, V.boardNumbersClosingTab.Total, 'не сохранился Total на табе клозинг');
    VD.IWant(VD.ToEqual, V.boardNumbersClosingAfterReopenedAndCloseRequest.Fuel, V.boardNumbersClosingTab.Fuel, 'не сохранился Fuel на табе клозинга');
    VD.IWant(VD.ToEqual, V.boardNumbersClosingAfterReopenedAndCloseRequest.Packing, V.boardNumbersClosingTab.Packing, 'не сохранился Packing на табе клозинг');
    VD.IWant(VD.ToEqual, V.boardNumbersClosingAfterReopenedAndCloseRequest.AdServices, V.boardNumbersClosingTab.AdServices, 'не сохранился Services на табе клозинг');

condition.nowWeDoing = 'идем на страничку аккаунта и конфирмейшн и проверяем, что изменения в клозинге не коснулись аккаунта';
    SF.click(By.xpath('//a[@ng-click="goTo()"]'));
    SF.sleep(8);
    SF.openTab(1);
    V.accountNumbersLDAfterConfirm={};
    LF.RememberAccountNumbersLD(V.accountNumbersLDAfterConfirm);
    LF.Validation_Compare_Account_Admin_LongDistance (V.accountNumbersLDWithInvent, V.accountNumbersLDAfterConfirm);
    SF.sleep(1);
    MF.Account_ClickViewConfirmationPage();
    driver.wait(driver.findElement(By.xpath('//h2[contains(text(),"Grand Total")]/following-sibling::span')).getText().then(function(text){
        V.ConfirmationTotal = SF.cleanPrice(text.substring(text.indexOf('$')));
        VD.IWant(VD.ToEqual, V.accountNumbersLDWithInvent.Total, V.ConfirmationTotal, 'не совпал гранд тотал в реквесте и на конфирмейшн пейдж после смены данных в клозинге');
    }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//h2[contains(text(),"Move Size")]/following-sibling::span/span[1]')).getText().then(function(text){
        V.cf = SF.cleanPrice(text.substring(text.indexOf('Inventory ')+9, text.indexOf('c.f.')));
        VD.IWant(VD.ToEqual, V.cf, V.boardNumbersCubFit, 'поменялся вес, стал не по инвенторию на конфирмейшине');
    }),config.timeout);
    SF.sleep(1);


    //=========================закончили писать тест=============================
    SF.endOfTest();
};
