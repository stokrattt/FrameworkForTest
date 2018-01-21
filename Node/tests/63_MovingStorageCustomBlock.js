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
    MF.Board_OpenSettingsGeneral ();
    MF.Board_OpenSettingsAccountPageCustomBlock ();
    MF.Board_OpenSideBar ();

condition.nowWeDoing = 'зашли в настройки кастомных блоков мувинга стораджа для Pending и включаем их если они выключены';
    driver.wait(driver.executeScript("if ($('div[class=\"custom-block movingstorage\"] tr[ng-repeat=\"pending_tab in movingPendingBody[$index]\"]" +
        " h3:contains(\"Show in account\") ~input').hasClass('ng-not-empty')){return true;} else {$('div[class=\"custom-block movingstorage\"]" +
        " tr[ng-repeat=\"pending_tab in movingPendingBody[$index]\"] h3:contains(\"Show in account\") ~span').click()}"));
    SF.sleep(1);
    SF.click(By.xpath('//div[@class="custom-block movingstorage"]//tr[@ng-repeat="pending_tab in movingPendingBody[$index]"][1]//button[@ng-click="saveCustomBlockSettings()"]'));
    SF.sleep (2);

condition.nowWeDoing = 'создаем мувинг сторадж, пендинг, и идем в аккаунт проверять что есть кастомный блок';
    LF.CreateMovAndStorFromBoard (V.client);
    MF.EditRequest_OpenSettings ();
    MF.EditRequest_ClickViewRequest ();
    SF.openTab (1);
    SF.sleep(5);
    SF.waitForLocated (By.id('tab_Move Overview'));
    SF.sleep(5);
    V.accountNumbersTo = {};
    LF.RememberAccountNumbers (V.accountNumbersTo);
    driver.wait(driver.executeScript("return $('div[ng-repeat=\"service_explanation in vm.serviceExplanation\"]').length").then(function (text) {
        VD.IWant(VD.ToEqual, text, 1, 'не нашло кастомный блок для мувинг сторадж To пендинг на аккаунте');
    }),config.timeout);
    SF.sleep(0.5);
    MF.Account_ClickFromStorage ();
    V.accountNumbersFrom = {};
    LF.RememberAccountNumbers (V.accountNumbersFrom);
    driver.wait(driver.executeScript("return $('div[ng-repeat=\"service_explanation in vm.serviceExplanation\"]').length").then(function (text) {
        VD.IWant(VD.ToEqual, text, 1, 'не нашло кастомный блок для мувинг сторадж From пендинг на аккаунте');
    }),config.timeout);
    SF.sleep(0.5);
    SF.openTab (0);
    SF.sleep(1);
    LF.closeEditRequest ();

condition.nowWeDoing = 'выключаем кастомный блок пендинг и идем проверять в акк';
    SF.click(By.xpath('//div[@class="custom-block movingstorage"]//tr[@ng-repeat="pending_tab in movingPendingBody[$index]"][1]//h3[contains(text(), "Show in account")]/following-sibling::span'));
    SF.click(By.xpath('//div[@class="custom-block movingstorage"]//tr[@ng-repeat="pending_tab in movingPendingBody[$index]"][1]//button[@ng-click="saveCustomBlockSettings()"]'));
    SF.sleep(2);
    SF.openTab (1);
    SF.sleep(1);
    MF.Account_Refresh ();
    driver.wait(driver.executeScript("return $('div[ng-repeat=\"service_explanation in vm.serviceExplanation\"]').length").then(function (text) {
        VD.IWant(VD.ToEqual, text, 0, 'не отключило кастомный блок для мувинг сторадж From пендинг на аккаунте');
    }),config.timeout);
    SF.sleep(0.5);
    MF.Account_ClickToStorage ();
    driver.wait(driver.executeScript("return $('div[ng-repeat=\"service_explanation in vm.serviceExplanation\"]').length").then(function (text) {
        VD.IWant(VD.ToEqual, text, 0, 'не отключило кастомный блок для мувинг сторадж From пендинг на аккаунте');
    }),config.timeout);
    SF.sleep(0.5);
    SF.openTab (0);
    SF.sleep(1);

condition.nowWeDoing = 'тут включаем чекбоксы для пендинг* мувинг сторадж и переходим на вкладку нот конферм и включаем там чекбоксы и идем проверять в акк';
    SF.click(By.xpath('//div[@class="custom-block movingstorage"]//tr[@ng-repeat="pending_tab in movingPendingBody[$index]"][1]//h3[contains(text(), "Show in account")]/following-sibling::span'));
    SF.click(By.xpath('//div[@class="custom-block movingstorage"]//tr[@ng-repeat="pending_tab in movingPendingBody[$index]"][1]//button[@ng-click="saveCustomBlockSettings()"]'));
    SF.sleep(2);
    SF.click(By.xpath('//div[@class="custom-block movingstorage"]//li[@ng-repeat="tab in service.tabs track by $index"][2]'));
    SF.sleep(2);
    driver.wait(driver.executeScript("if ($('div[class=\"custom-block movingstorage\"] input[ng-model=\"not_confirmed_tab.showCustomBlock\"]').hasClass('ng-not-empty')){" +
        "return true;} else {$('div[class=\"custom-block movingstorage\"]" +
        " input[ng-model=\"not_confirmed_tab.showCustomBlock\"] ~span').click()}"));
    SF.sleep(1);
    driver.wait(driver.executeScript("if ($('div[class=\"custom-block movingstorage\"] input[ng-model=\"not_confirmed_tab.showOnConfirmationPage\"]').hasClass('ng-not-empty')){" +
        "return true;} else {$('div[class=\"custom-block movingstorage\"]" +
        " input[ng-model=\"not_confirmed_tab.showOnConfirmationPage\"] ~span').click()}"));
    SF.sleep(1);
    SF.click(By.xpath('//div[@class="custom-block movingstorage"]//tr[@ng-repeat="not_confirmed_tab in movingNotConfirmedBody[$index]"][1]//button[@ng-click="saveCustomBlockSettings()"]'));
    SF.sleep(2);
    MF.Board_SearchRequest(V.accountNumbersTo.Id);
    SF.sleep(3);
    MF.Board_SearchOpenRequest (V.accountNumbersTo);
    V.boardNumbers = {};
    LF.RememberDigitsRequestBoard (V.boardNumbers);
    MF.EditRequest_SetToNotConfirmed ();
    MF.EditRequest_SetAdressFrom ();
    JS.step(JSstep.selectTruck((V.boardNumbers.LaborTimeMax + V.boardNumbers.TravelTime)/60));
    MF.WaitWhileBusy();
    MF.EditRequest_SaveChanges ();
    LF.closeEditRequest ();
    MF.Board_SearchRequest(V.accountNumbersFrom.Id);
    MF.Board_SearchOpenRequest (V.accountNumbersFrom);
    MF.EditRequest_SetToNotConfirmed ();
    MF.EditRequest_SetAdressTo ();
    JS.step(JSstep.selectTruck((V.boardNumbers.LaborTimeMax + V.boardNumbers.TravelTime)/60));
    MF.WaitWhileBusy();
    MF.EditRequest_SaveChanges ();
    LF.closeEditRequest ();
    SF.openTab (1);
    SF.sleep(1);
    MF.Account_Refresh ();
    driver.wait(driver.executeScript("return $('div[ng-repeat=\"service_explanation in vm.serviceExplanation\"]').length").then(function (text) {
        VD.IWant(VD.ToEqual, text, 1, 'не нашло кастомный блок для мувинг сторадж To not confirmed на аккаунте');
    }),config.timeout);
    SF.sleep(0.5);
    MF.Account_ClickProceedBookYourMove();
    driver.wait(driver.executeScript("return $('div[ng-repeat=\"customBlock in vm.customBlocks\"]').length").then(function (text) {
        VD.IWant(VD.ToEqual, text, 1, 'не нашло кастомный блок для мувинг сторадж To not confirmed на аккаунте на confirmation page');
    }),config.timeout);
    SF.sleep(0.5);
    MF.AccountConfirmationPage_ClickBackToRequest ();
    MF.Account_ClickFromStorage ();
    driver.wait(driver.executeScript("return $('div[ng-repeat=\"service_explanation in vm.serviceExplanation\"]').length").then(function (text) {
        VD.IWant(VD.ToEqual, text, 1, 'не нашло кастомный блок для мувинг сторадж From not confirmed на аккаунте');
    }),config.timeout);
    SF.sleep(0.5);
    MF.Account_ClickProceedBookYourMove();
    driver.wait(driver.executeScript("return $('div[ng-repeat=\"customBlock in vm.customBlocks\"]').length").then(function (text) {
        VD.IWant(VD.ToEqual, text, 1, 'не нашло кастомный блок для мувинг сторадж From not confirmed на аккаунте на confirmation page');
    }),config.timeout);
    SF.sleep(0.5);
    MF.AccountConfirmationPage_ClickBackToRequest ();
    SF.openTab (0);
    SF.sleep(1);

condition.nowWeDoing = 'выключаем кастомный блок not confirmed и идем проверять в акк';
    SF.click(By.xpath('//div[@class="custom-block movingstorage"]//input[@ng-model="not_confirmed_tab.showCustomBlock"]/following-sibling::span'));
    SF.click(By.xpath('//div[@class="custom-block movingstorage"]//input[@ng-model="not_confirmed_tab.showOnConfirmationPage"]/following-sibling::span'));
    SF.click(By.xpath('//div[@class="custom-block movingstorage"]//tr[@ng-repeat="not_confirmed_tab in movingNotConfirmedBody[$index]"][1]//button[@ng-click="saveCustomBlockSettings()"]'));
    SF.sleep(2);
    SF.openTab (1);
    SF.sleep(1);
    MF.Account_Refresh ();
    driver.wait(driver.executeScript("return $('div[ng-repeat=\"service_explanation in vm.serviceExplanation\"]').length").then(function (text) {
        VD.IWant(VD.ToEqual, text, 0, 'не отключило кастомный блок для мувинг сторадж From not confirmed на аккаунте');
    }),config.timeout);
    SF.sleep(0.5);
    MF.Account_ClickProceedBookYourMove();
    driver.wait(driver.executeScript("return $('div[ng-repeat=\"customBlock in vm.customBlocks\"]').length").then(function (text) {
        VD.IWant(VD.ToEqual, text, 0, 'не отключило кастомный блок для мувинг сторадж From not confirmed на аккаунте на confirmation page');
    }),config.timeout);
    SF.sleep(0.5);
    MF.AccountConfirmationPage_ClickBackToRequest ();
    MF.Account_ClickToStorage ();
    driver.wait(driver.executeScript("return $('div[ng-repeat=\"service_explanation in vm.serviceExplanation\"]').length").then(function (text) {
        VD.IWant(VD.ToEqual, text, 0, 'не отключило кастомный блок для мувинг сторадж To not confirmed на аккаунте');
    }),config.timeout);
    SF.sleep(0.5);
    MF.Account_ClickProceedBookYourMove();
    driver.wait(driver.executeScript("return $('div[ng-repeat=\"customBlock in vm.customBlocks\"]').length").then(function (text) {
        VD.IWant(VD.ToEqual, text, 0, 'не отключило кастомный блок для мувинг сторадж To not confirmed на аккаунте на confirmation page');
    }),config.timeout);
    SF.sleep(0.5);
    MF.AccountConfirmationPage_ClickBackToRequest ();
    SF.openTab (0);
    SF.sleep(1);

condition.nowWeDoing = 'тут включаем чекбоксы для нот конферм* и переходим на вкладку конферм и включаем там чекбоксы и идем проверять в акк';
    SF.click(By.xpath('//div[@class="custom-block movingstorage"]//input[@ng-model="not_confirmed_tab.showCustomBlock"]/following-sibling::span'));
    SF.click(By.xpath('//div[@class="custom-block movingstorage"]//input[@ng-model="not_confirmed_tab.showOnConfirmationPage"]/following-sibling::span'));
    SF.click(By.xpath('//div[@class="custom-block movingstorage"]//tr[@ng-repeat="not_confirmed_tab in movingNotConfirmedBody[$index]"][1]//button[@ng-click="saveCustomBlockSettings()"]'));
    SF.sleep(2);
    SF.click(By.xpath('//div[@class="custom-block movingstorage"]//li[@ng-repeat="tab in service.tabs track by $index"][3]'));
    SF.sleep(1.5);
    driver.wait(driver.executeScript("if ($('div[class=\"custom-block movingstorage\"] input[ng-model=\"confirmed_tab.showCustomBlock\"]').hasClass('ng-not-empty')){" +
        "return true;} else {$('div[class=\"custom-block movingstorage\"]" +
        " input[ng-model=\"confirmed_tab.showCustomBlock\"] ~span').click()}"));
    SF.sleep(1);
    driver.wait(driver.executeScript("if ($('div[class=\"custom-block movingstorage\"] input[ng-model=\"confirmed_tab.showOnConfirmationPage\"]').hasClass('ng-not-empty')){" +
        "return true;} else {$('div[class=\"custom-block movingstorage\"]" +
        " input[ng-model=\"confirmed_tab.showOnConfirmationPage\"] ~span').click()}"));
    SF.sleep(1);
    SF.click(By.xpath('//div[@class="custom-block movingstorage"]//tr[@ng-repeat="confirmed_tab in movingConfirmedBody[$index]"][1]//button[@ng-click="saveCustomBlockSettings()"]'));
    SF.sleep(2);
    MF.Board_SearchRequest(V.accountNumbersTo.Id);
    SF.sleep(3);
    MF.Board_SearchOpenRequest (V.accountNumbersTo);
    MF.EditRequest_SetToConfirmed ();
    MF.EditRequest_SaveChanges ();
    LF.closeEditRequest ();
    MF.Board_SearchRequest(V.accountNumbersFrom.Id);
    MF.Board_SearchOpenRequest (V.accountNumbersFrom);
    MF.EditRequest_SetToConfirmed ();
    MF.EditRequest_SaveChanges ();
    LF.closeEditRequest ();
    SF.openTab (1);
    SF.sleep(1);
    MF.Account_Refresh ();
    driver.wait(driver.executeScript("return $('div[ng-repeat=\"service_explanation in vm.serviceExplanation\"]').length").then(function (text) {
        VD.IWant(VD.ToEqual, text, 1, 'не нашло кастомный блок для мувинг сторадж To confirmed на аккаунте');
    }),config.timeout);
    MF.Account_ClickViewConfirmationPage ();
    SF.sleep(3);
    driver.wait(driver.executeScript("return $('div[ng-repeat=\"customBlock in vm.customBlocks\"]').length").then(function (text) {
        VD.IWant(VD.ToEqual, text, 1, 'не нашло кастомный блок для мувинг сторадж To confirmed на аккаунте на confirmation page');
    }),config.timeout);
    SF.sleep(0.5);
    MF.AccountConfirmationPage_ClickBackToRequest ();
    MF.Account_ClickFromStorage ();
    driver.wait(driver.executeScript("return $('div[ng-repeat=\"service_explanation in vm.serviceExplanation\"]').length").then(function (text) {
        VD.IWant(VD.ToEqual, text, 1, 'не нашло кастомный блок для мувинг сторадж From confirmed на аккаунте');
    }),config.timeout);
    SF.sleep(0.5);
    MF.Account_ClickViewConfirmationPage ();
    SF.sleep(3);
    driver.wait(driver.executeScript("return $('div[ng-repeat=\"customBlock in vm.customBlocks\"]').length").then(function (text) {
        VD.IWant(VD.ToEqual, text, 1, 'не нашло кастомный блок для мувинг сторадж From confirmed на аккаунте на confirmation page');
    }),config.timeout);
    SF.sleep(0.5);
    MF.AccountConfirmationPage_ClickBackToRequest ();
    SF.openTab (0);
    SF.sleep(1);

condition.nowWeDoing = 'выключаем кастомный блок confirmed и идем проверять в акк';
    SF.click(By.xpath('//div[@class="custom-block movingstorage"]//input[@ng-model="confirmed_tab.showCustomBlock"]/following-sibling::span'));
    SF.click(By.xpath('//div[@class="custom-block movingstorage"]//input[@ng-model="confirmed_tab.showOnConfirmationPage"]/following-sibling::span'));
    SF.click(By.xpath('//div[@class="custom-block movingstorage"]//tr[@ng-repeat="confirmed_tab in movingConfirmedBody[$index]"][1]//button[@ng-click="saveCustomBlockSettings()"]'));
    SF.sleep(2);
    SF.openTab (1);
    SF.sleep(1);
    MF.Account_Refresh ();
    driver.wait(driver.executeScript("return $('div[ng-repeat=\"service_explanation in vm.serviceExplanation\"]').length").then(function (text) {
        VD.IWant(VD.ToEqual, text, 0, 'не отключило кастомный блок для мувинг сторадж From confirmed на аккаунте');
    }),config.timeout);
    MF.Account_ClickViewConfirmationPage ();
    SF.sleep(3);
    driver.wait(driver.executeScript("return $('div[ng-repeat=\"customBlock in vm.customBlocks\"]').length").then(function (text) {
        VD.IWant(VD.ToEqual, text, 0, 'не отключило кастомный блок для мувинг сторадж From confirmed на аккаунте на confirmation page');
    }),config.timeout);
    SF.sleep(0.5);
    MF.AccountConfirmationPage_ClickBackToRequest ();
    MF.Account_ClickToStorage ();
    driver.wait(driver.executeScript("return $('div[ng-repeat=\"service_explanation in vm.serviceExplanation\"]').length").then(function (text) {
        VD.IWant(VD.ToEqual, text, 0, 'не отключило кастомный блок для мувинг сторадж To confirmed на аккаунте');
    }),config.timeout);
    SF.sleep(0.5);
    MF.Account_ClickViewConfirmationPage ();
    driver.wait(driver.executeScript("return $('div[ng-repeat=\"customBlock in vm.customBlocks\"]').length").then(function (text) {
        VD.IWant(VD.ToEqual, text, 0, 'не отключило кастомный блок для мувинг сторадж To confirmed на аккаунте на confirmation page');
    }),config.timeout);
    SF.sleep(0.5);
    MF.AccountConfirmationPage_ClickBackToRequest ();
    SF.openTab (0);
    SF.sleep(1);

condition.nowWeDoing = 'тут включаем чекбоксы для конферм* и все ';
    SF.click(By.xpath('//div[@class="custom-block movingstorage"]//input[@ng-model="confirmed_tab.showCustomBlock"]/following-sibling::span'));
    SF.click(By.xpath('//div[@class="custom-block movingstorage"]//input[@ng-model="confirmed_tab.showOnConfirmationPage"]/following-sibling::span'));
    SF.click(By.xpath('//div[@class="custom-block movingstorage"]//tr[@ng-repeat="confirmed_tab in movingConfirmedBody[$index]"][1]//button[@ng-click="saveCustomBlockSettings()"]'));
    SF.sleep(2);

    //=========================закончили писать тест=============================
    SF.endOfTest();
};
