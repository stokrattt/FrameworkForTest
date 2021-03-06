module.exports = function main(SF, JS, MF, LF, JSstep, VD, V, By, until,FileDetector, system, condition, config,constants) {
    global.fiber = Fiber.current;
    V.client = {};
    V.client.name = SF.randomBukva(6) + '_t';
    V.client.fam = SF.randomBukva(6) + '_t';
    V.client.phone = SF.randomCifra(10);
    V.client.email = SF.randomBukvaSmall(6) + '@' + SF.randomBukvaSmall(4) + '.tes';
    V.client.passwd = 123;
    V.boardNumbers = {};

    //=========================начинаем писать тест=============================
    SF.get(V.adminURL);
    LF.LoginToBoardAsCustom(V.adminLogin,V.adminPassword);
    MF.Board_OpenSettingsGeneral ();
    MF.Board_OpenSettingsAccountPageCustomBlock ();
    MF.Board_OpenSideBar ();

condition.nowWeDoing = 'зашли в настройки кастомных блоков Loading для Pending и включаем их если они выключены';
    driver.wait(driver.executeScript("if ($('div[class=\"custom-block loadinghelp\"] tr[ng-repeat=\"pending_tab in movingPendingBody[$index]\"]" +
        " h3:contains(\"Show in account\") ~input').hasClass('ng-not-empty')){return true;} else {$('div[class=\"custom-block loadinghelp\"]" +
        " tr[ng-repeat=\"pending_tab in movingPendingBody[$index]\"] h3:contains(\"Show in account\") ~span').click()}"));
    SF.sleep(1);
    SF.click(By.xpath('//div[@class="custom-block loadinghelp"]//tr[@ng-repeat="pending_tab in movingPendingBody[$index]"][1]//button[@ng-click="saveCustomBlockSettings()"]'));
    SF.sleep (2);

condition.nowWeDoing = 'создаем Loading help, пендинг, и идем в аккаунт проверять что есть кастомный блок';
    LF.CreateLoadingHelpFromBoard (V.client);
    LF.RememberDigitsRequestBoard (V.boardNumbers);
    MF.EditRequest_OpenSettings ();
    MF.EditRequest_ClickViewRequest ();
    SF.openTab (1);
    SF.sleep(5);
    MF.WaitWhileBusy();
    SF.waitForLocated (By.id('tab_Move Overview'));
    SF.sleep(5);
    driver.wait(driver.executeScript("return $('div[ng-repeat=\"block in customBlocks\"]').length").then(function (text) {
        VD.IWant(VD.ToEqual, text, 1, 'не нашло кастомный блок для Loading пендинг на аккаунте');
    }),config.timeout);
    SF.openTab (0);
    SF.sleep(1);
    LF.closeEditRequest ();

condition.nowWeDoing = 'выключаем кастомный блок пендинг и идем проверять в акк';
    SF.click(By.xpath('//div[@class="custom-block loadinghelp"]//tr[@ng-repeat="pending_tab in movingPendingBody[$index]"][1]//h3[contains(text(), "Show in account")]/following-sibling::span'));
    SF.click(By.xpath('//div[@class="custom-block loadinghelp"]//tr[@ng-repeat="pending_tab in movingPendingBody[$index]"][1]//button[@ng-click="saveCustomBlockSettings()"]'));
    SF.sleep(2);
    SF.openTab (1);
    SF.sleep(1);
    MF.Account_Refresh ();
    driver.wait(driver.executeScript("return $('div[ng-repeat=\"block in customBlocks\"]').length").then(function (text) {
        VD.IWant(VD.ToEqual, text, 0, 'не отключило кастомный блок для Loading пендинг на аккаунте');
    }),config.timeout);
    SF.openTab (0);
    SF.sleep(1);

condition.nowWeDoing = 'тут включаем чекбоксы для пендинг* и переходим на вкладку нот конферм и включаем там чекбоксы и идем проверять в акк и ставим реквесту нот конферм';
    SF.click(By.xpath('//div[@class="custom-block loadinghelp"]//tr[@ng-repeat="pending_tab in movingPendingBody[$index]"][1]//h3[contains(text(), "Show in account")]/following-sibling::span'));
    SF.click(By.xpath('//div[@class="custom-block loadinghelp"]//tr[@ng-repeat="pending_tab in movingPendingBody[$index]"][1]//button[@ng-click="saveCustomBlockSettings()"]'));
    SF.sleep(2);
    SF.click(By.xpath('//div[@class="custom-block loadinghelp"]//li[@ng-repeat="tab in service.tabs track by $index"][2]'));
    SF.sleep(1);
    driver.wait(driver.executeScript("if ($('div[class=\"custom-block loadinghelp\"] input[ng-model=\"not_confirmed_tab.showCustomBlock\"]').hasClass('ng-not-empty')){return true;} else {$('div[class=\"custom-block loadinghelp\"]" +
        " input[ng-model=\"not_confirmed_tab.showCustomBlock\"] ~span').click()}"));
    SF.sleep(1);
    driver.wait(driver.executeScript("if ($('div[class=\"custom-block loadinghelp\"] input[ng-model=\"not_confirmed_tab.showOnConfirmationPage\"]').hasClass('ng-not-empty')){return true;} else {$('div[class=\"custom-block loadinghelp\"]" +
        " input[ng-model=\"not_confirmed_tab.showOnConfirmationPage\"] ~span').click()}"));
    SF.sleep(1);
    SF.click(By.xpath('//div[@class="custom-block loadinghelp"]//tr[@ng-repeat="not_confirmed_tab in movingNotConfirmedBody[$index]"][1]//button[@ng-click="saveCustomBlockSettings()"]'));
    SF.sleep(2);
    MF.Board_SearchRequest(V.boardNumbers.Id);
    MF.Board_SearchOpenRequest (V.boardNumbers);
    MF.EditRequest_SetToNotConfirmed ();
    MF.EditRequest_SetAdressFrom ();
    JS.step(JSstep.selectTruck((V.boardNumbers.LaborTimeMax + V.boardNumbers.TravelTime)/60));
    MF.WaitWhileBusy();
    MF.EditRequest_SaveChanges ();
    LF.closeEditRequest ();
    SF.openTab (1);
    SF.sleep(1);
    MF.Account_Refresh ();
    driver.wait(driver.executeScript("return $('div[ng-repeat=\"block in customBlocks\"]').length").then(function (text) {
        VD.IWant(VD.ToEqual, text, 1, 'не нашло кастомный блок для Loading not confirmed на аккаунте');
    }),config.timeout);
    MF.Account_ClickProceedBookYourMove();
    driver.wait(driver.executeScript("return $('div[ng-repeat=\"block in customBlocks\"]').length").then(function (text) {
        VD.IWant(VD.ToEqual, text, 1, 'не нашло кастомный блок для Loading not confirmed на аккаунте на confirmation page');
    }),config.timeout);
    MF.AccountConfirmationPage_ClickBackToRequest ();
    SF.openTab (0);
    SF.sleep(1);

condition.nowWeDoing = 'выключаем кастомный блок not confirmed и идем проверять в акк';
    SF.click(By.xpath('//div[@class="custom-block loadinghelp"]//input[@ng-model="not_confirmed_tab.showCustomBlock"]/following-sibling::span'));
    SF.click(By.xpath('//div[@class="custom-block loadinghelp"]//input[@ng-model="not_confirmed_tab.showOnConfirmationPage"]/following-sibling::span'));
    SF.click(By.xpath('//div[@class="custom-block loadinghelp"]//tr[@ng-repeat="not_confirmed_tab in movingNotConfirmedBody[$index]"][1]//button[@ng-click="saveCustomBlockSettings()"]'));
    SF.sleep(2);
    SF.openTab (1);
    SF.sleep(1);
    MF.Account_Refresh ();
    driver.wait(driver.executeScript("return $('div[ng-repeat=\"block in customBlocks\"]').length").then(function (text) {
        VD.IWant(VD.ToEqual, text, 0, 'не отключило кастомный блок для Loading not confirmed на аккаунте');
    }),config.timeout);
    MF.Account_ClickProceedBookYourMove();
    driver.wait(driver.executeScript("return $('div[ng-repeat=\"block in customBlocks\"]').length").then(function (text) {
        VD.IWant(VD.ToEqual, text, 0, 'не отключило кастомный блок для Loading not confirmed на аккаунте на confirmation page');
    }),config.timeout);
    MF.AccountConfirmationPage_ClickBackToRequest ();
    SF.openTab (0);
    SF.sleep(1);

condition.nowWeDoing = 'тут включаем чекбоксы для нот конферм* и переходим на вкладку конферм и включаем там чекбоксы и идем проверять в акк';
    SF.click(By.xpath('//div[@class="custom-block loadinghelp"]//input[@ng-model="not_confirmed_tab.showCustomBlock"]/following-sibling::span'));
    SF.click(By.xpath('//div[@class="custom-block loadinghelp"]//input[@ng-model="not_confirmed_tab.showOnConfirmationPage"]/following-sibling::span'));
    SF.click(By.xpath('//div[@class="custom-block loadinghelp"]//tr[@ng-repeat="not_confirmed_tab in movingNotConfirmedBody[$index]"][1]//button[@ng-click="saveCustomBlockSettings()"]'));
    SF.sleep(2);
    SF.click(By.xpath('//div[@class="custom-block loadinghelp"]//li[@ng-repeat="tab in service.tabs track by $index"][3]'));
    SF.sleep(1.5);
    driver.wait(driver.executeScript("if ($('div[class=\"custom-block loadinghelp\"] input[ng-model=\"confirmed_tab.showCustomBlock\"]').hasClass('ng-not-empty')){return true;} else {$('div[class=\"custom-block loadinghelp\"]" +
        " input[ng-model=\"confirmed_tab.showCustomBlock\"] ~span').click()}"));
    SF.sleep(1);
    driver.wait(driver.executeScript("if ($('div[class=\"custom-block loadinghelp\"] input[ng-model=\"confirmed_tab.showOnConfirmationPage\"]').hasClass('ng-not-empty')){return true;} else {$('div[class=\"custom-block loadinghelp\"]" +
        " input[ng-model=\"confirmed_tab.showOnConfirmationPage\"] ~span').click()}"));
    SF.sleep(1);
    SF.click(By.xpath('//div[@class="custom-block loadinghelp"]//tr[@ng-repeat="confirmed_tab in movingConfirmedBody[$index]"][1]//button[@ng-click="saveCustomBlockSettings()"]'));
    SF.sleep(2);
    MF.Board_SearchRequest(V.boardNumbers.Id);
    MF.Board_SearchOpenRequest (V.boardNumbers);
    MF.EditRequest_SetToConfirmed ();
    MF.EditRequest_SaveChanges ();
    LF.closeEditRequest ();
    SF.openTab (1);
    SF.sleep(1);
    MF.Account_Refresh ();
    driver.wait(driver.executeScript("return $('div[ng-repeat=\"block in customBlocks\"]').length").then(function (text) {
        VD.IWant(VD.ToEqual, text, 1, 'не нашло кастомный блок для Loading confirmed на аккаунте');
    }),config.timeout);
    MF.Account_ClickViewConfirmationPage ();
    SF.sleep(3);
    driver.wait(driver.executeScript("return $('div[ng-repeat=\"block in customBlocks\"]').length").then(function (text) {
        VD.IWant(VD.ToEqual, text, 1, 'не нашло кастомный блок для loading confirmed на аккаунте на confirmation page');
    }),config.timeout);
    MF.AccountConfirmationPage_ClickBackToRequest ();
    SF.openTab (0);
    SF.sleep(1);

condition.nowWeDoing = 'выключаем кастомный блок confirmed и идем проверять в акк';
    SF.click(By.xpath('//div[@class="custom-block loadinghelp"]//input[@ng-model="confirmed_tab.showCustomBlock"]/following-sibling::span'));
    SF.click(By.xpath('//div[@class="custom-block loadinghelp"]//input[@ng-model="confirmed_tab.showOnConfirmationPage"]/following-sibling::span'));
    SF.click(By.xpath('//div[@class="custom-block loadinghelp"]//tr[@ng-repeat="confirmed_tab in movingConfirmedBody[$index]"][1]//button[@ng-click="saveCustomBlockSettings()"]'));
    SF.sleep(2);
    SF.openTab (1);
    SF.sleep(1);
    MF.Account_Refresh ();
    driver.wait(driver.executeScript("return $('div[ng-repeat=\"block in customBlocks\"]').length").then(function (text) {
        VD.IWant(VD.ToEqual, text, 0, 'не отключило кастомный блок для loading confirmed на аккаунте');
    }),config.timeout);
    MF.Account_ClickViewConfirmationPage ();
    driver.wait(driver.executeScript("return $('div[ng-repeat=\"block in customBlocks\"]').length").then(function (text) {
        VD.IWant(VD.ToEqual, text, 0, 'не отключило кастомный блок для loading confirmed на аккаунте на confirmation page');
    }),config.timeout);
    SF.openTab (0);
    SF.sleep(1);

condition.nowWeDoing = 'тут включаем чекбоксы для конферм* и все ';
    SF.click(By.xpath('//div[@class="custom-block loadinghelp"]//input[@ng-model="confirmed_tab.showCustomBlock"]/following-sibling::span'));
    SF.click(By.xpath('//div[@class="custom-block loadinghelp"]//input[@ng-model="confirmed_tab.showOnConfirmationPage"]/following-sibling::span'));
    SF.click(By.xpath('//div[@class="custom-block loadinghelp"]//tr[@ng-repeat="confirmed_tab in movingConfirmedBody[$index]"][1]//button[@ng-click="saveCustomBlockSettings()"]'));
    SF.sleep(1);


    //=========================закончили писать тест=============================
    SF.endOfTest();
};
