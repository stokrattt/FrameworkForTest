
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

condition.nowWeDoing = 'Заходим в SIT Storages и создаем Storage';
    V.storage = {};
    V.storage2 = {};
    V.storage3 = {};
    V.storage.name = SF.randomBukva(6) + '_t';
    V.storage.address = SF.randomBukva(10) + '_t';
    V.storage.email = SF.randomBukvaSmall(6) + '@' + SF.randomBukvaSmall(4) + '.tes';
    V.storage.zip = '02222';
    V.storage.notes = SF.randomBukva(10) + '_t';
    V.storage.phone = SF.randomCifra(10);
    MF.Board_OpenSideBar();
    MF.BoardSIT_OpenStorages();
    MF.Board_OpenSideBar();
    MF.SIT_ClickCreateNewStorage();
    LF.SIT_CreateStorage(V.storage);

condition.nowWeDoing = 'Редактируем Storage';
    SF.waitForVisible (By.xpath('//input[@ng-model="searchTerm"]'));
    SF.send(By.xpath('//input[@ng-model="searchTerm"]'), V.storage.name);
    SF.waitForVisible (By.xpath('//div[text()="'+ V.storage.name +'"]'));
    SF.sleep(3);
    SF.click(By.xpath('//div[text()="'+ V.storage.name +'"]'));
    JS.waitForExist('input[ng-model=\\"newStorage.name\\"]');
    SF.sleep(5);
    V.storage2.name = SF.randomBukva(6) + '_t';
    V.storage2.address = SF.randomBukva(10) + '_t';
    V.storage2.email = SF.randomBukvaSmall(6) + '@' + SF.randomBukvaSmall(4) + '.tes';
    V.storage2.zip = '32142';
    V.storage2.notes = SF.randomBukva(10) + '_t';
    V.storage2.phone = SF.randomCifra(10);
    LF.SIT_CreateStorage(V.storage2);
    SF.waitForVisible (By.xpath('//input[@ng-model="searchTerm"]'));

condition.nowWeDoing = 'сравниваем сохранились ли изменения';
    SF.send(By.xpath('//input[@ng-model="searchTerm"]'), V.storage2.name);
    SF.waitForVisible (By.xpath('//div[text()="'+ V.storage2.name +'"]'));
    SF.sleep(2);
    SF.click(By.xpath('//div[text()="'+ V.storage2.name +'"]'));
    JS.waitForExist('input[ng-model=\\"newStorage.name\\"]');
    SF.sleep(2);
    LF.RememberStorage(V.storage3);
    LF.Validation_Compare_SITstorageInfo(V.storage, V.storage2, V.storage3);
    SF.click(By.xpath('//md-checkbox[@ng-model="newStorage.active"]'));
    SF.sleep(5);
    JS.click('span:contains(\\"Save\\")');
    SF.waitForVisible (By.xpath('//input[@ng-model="searchTerm"]'));

condition.nowWeDoing = 'Создаем Long Distance работу';
    LF.CreateLongDistanceFromBoard(V.client);
    LF.RememberDigitsRequestBoard(V.boardNumbers);
    MF.EditRequest_SetToConfirmed();

condition.nowWeDoing = 'Проверяем есть ли сторадж в реквести в SIT';
    JS.step(JSstep.selectTruck(5));
    MF.WaitWhileBusy();
    V.perCubicFeet = '5';
    MF.EditRequest_SendRateForLD (V.perCubicFeet);
    MF.ConfirmCalculatorOff();
    MF.EditRequest_SetAdressToFrom();
    MF.EditRequest_SaveChanges();
    SF.click(By.xpath('//div[@ng-click="changeSalesClosingTab(\'closing\')"]'));
    SF.sleep(2);
    MF.EditRequest_OpenSITmodal();
    SF.waitForVisible (By.xpath('//select[@ng-model="sit.storage_id"]'));
    SF.click(By.xpath('//select[@ng-model="sit.storage_id"]'));
    SF.click(By.xpath('//option[text()="'+ V.storage2.name +'"]'));
    SF.click(By.xpath('//a[@ng-click="save()"]'));
    MF.EditRequest_OpenClient();
    LF.SetClientPasswd(V.client.passwd);
    SF.sleep(13);
    MF.WaitWhileBusySymbol();

condition.nowWeDoing = 'заходим в настройки аккаунта в реквесте и выключаем галку для смены инвентаря на конферм работе';
    MF.EditRequest_OpenSettings();
    MF.EditRequest_OpenSettingsAccountPage();
    driver.wait(driver.executeScript("if($('input[ng-model=\"localInventoryDetails\"]').hasClass('ng-empty')){" +
        "return true;}else{$('input[ng-model=\"localInventoryDetails\"] ~span').click()}"),config.timeout);
    MF.EditRequest_SaveAccountPageSettings();
    LF.closeEditRequest();
    MF.Board_LogoutAdmin();

condition.nowWeDoing = 'идем в аккаунт проверять что детали и инвенторий заблокированы, если  тест упадет значит ошибка';
    SF.get(V.accountURL);
    LF.LoginToAccountAsClient(V.client);
    MF.Account_OpenRequest(V.boardNumbers.Id);
    MF.Account_ClickViewRequest();
    driver.wait(driver.executeScript("return $('li[id=\"tab_Inventory\"]').hasClass('disabled')").then(function (text) {
        VD.IWant(VD.ToEqual, text, true, 'на аккаунте после выключения настройки Allow a customer to make changes to the Inventory & Details when the job is confirmed инвенторий остался не заблокирован' +
            'хотя должен быть заблокирован');
    }),config.timeout);
    driver.wait(driver.executeScript("return $('li[id=\"tab_Details\"]').hasClass('disabled')").then(function (text) {
        VD.IWant(VD.ToEqual, text, true, 'на аккаунте после выключения настройки Allow a customer to make changes to the Inventory & Details when the job is confirmed Details остался не заблокирован' +
            'хотя должен быть заблокирован');
    }),config.timeout);
    SF.sleep(1);

    SF.endOfTest();

};