
module.exports = function main(SF, JS, MF, LF, JSstep, VD, V, By, until,FileDetector, system, condition, config,constants) {
    global.fiber = Fiber.current;
    V.client = {};
    V.client.name = SF.randomBukva(6) + '_t';
    V.client.fam = SF.randomBukva(6) + '_t';
    V.client.phone = SF.randomCifra(10);
    V.client.email = SF.randomBukvaSmall(6) + '@' + SF.randomBukvaSmall(4) + '.tes';
    V.client.passwd = 123;
    V.client.zipFrom = '02222';
    V.client.zipTo = '90001';
    V.boardNumbers = {};

    //=========================начинаем писать тест=============================
    SF.get(V.adminURL);
    LF.LoginToBoardAsCustom(V.adminLogin,V.adminPassword);

condition.nowWeDoing = 'Заходим в SIT Storages и создаем Storage';
    MF.Board_OpenSideBar();
    MF.BoardSIT_OpenStorages();
    MF.Board_OpenSideBar();
    SF.click(By.xpath('//button[@ng-click="addStorage()"]'));
    SF.waitForVisible (By.xpath('//input[@ng-model="newStorage.name"]'));
    SF.sleep(1);
    V.storage = {};
    V.storage2 = {};
    V.storage3 = {};
    V.storage.name = SF.randomBukva(6) + '_t';
    V.storage.address = SF.randomBukva(10) + '_t';
    V.storage.email = SF.randomBukvaSmall(6) + '@' + SF.randomBukvaSmall(4) + '.tes';
    V.storage.zip = '02222';
    V.storage.notes = SF.randomBukva(10) + '_t';
    V.storage.phone = SF.randomCifra(10);
    SF.click(By.xpath('//md-checkbox[@ng-model="newStorage.active"]'));
    SF.send (By.xpath('//input[@ng-model="newStorage.name"]'), V.storage.name);
    SF.send (By.xpath('//textarea[@ng-model="newStorage.address"]'), V.storage.address);
    SF.send (By.xpath('//input[@ng-model="newStorage.zip_code"]'), V.storage.zip);
    SF.sleep(2);
    SF.click (By.xpath('//md-checkbox[@ng-model="newStorage.default_storage"]'));
    SF.send (By.xpath('//input[@ng-model="newStorage.notes"]'), V.storage.notes);
    SF.send (By.xpath('//input[@ng-model="newStorage.email"]'), V.storage.email);
    SF.send (By.xpath('//input[@ng-model="newStorage.phones[$index]"]'), V.storage.phone);
    SF.sleep(1);
    JS.click('span:contains(\\"Save\\")');

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
    SF.sleep(2);
    SF.clear (By.xpath('//input[@ng-model="newStorage.name"]'));
    SF.send (By.xpath('//input[@ng-model="newStorage.name"]'), V.storage2.name);
    SF.clear (By.xpath('//textarea[@ng-model="newStorage.address"]'));
    SF.send (By.xpath('//textarea[@ng-model="newStorage.address"]'), V.storage2.address);
    SF.clear (By.xpath('//input[@ng-model="newStorage.zip_code"]'));
    SF.send (By.xpath('//input[@ng-model="newStorage.zip_code"]'), V.storage2.zip);
    SF.sleep(2);
    SF.click (By.xpath('//md-checkbox[@ng-model="newStorage.default_storage"]'));
    SF.clear (By.xpath('//input[@ng-model="newStorage.notes"]'));
    SF.send (By.xpath('//input[@ng-model="newStorage.notes"]'), V.storage2.notes);
    SF.clear (By.xpath('//input[@ng-model="newStorage.email"]'));
    SF.send (By.xpath('//input[@ng-model="newStorage.email"]'), V.storage2.email);
    SF.clear (By.xpath('//input[@ng-model="newStorage.phones[$index]"]'));
    SF.send (By.xpath('//input[@ng-model="newStorage.phones[$index]"]'), V.storage2.phone);
    SF.sleep(4);
    JS.click('span:contains(\\"Save\\")');
    SF.waitForVisible (By.xpath('//input[@ng-model="searchTerm"]'));

condition.nowWeDoing = 'сравниваем сохранились ли изменения';
    SF.send(By.xpath('//input[@ng-model="searchTerm"]'), V.storage2.name);
    SF.waitForVisible (By.xpath('//div[text()="'+ V.storage2.name +'"]'));
    SF.sleep(2);
    SF.click(By.xpath('//div[text()="'+ V.storage2.name +'"]'));
    JS.waitForExist('input[ng-model=\\"newStorage.name\\"]');
    SF.sleep(2);
    LF.RememberStorage(V.storage3);
    VD.IWant(VD.NotToEqual,V.storage.name, V.storage2.name,'Поля совпадают');
    VD.IWant(VD.NotToEqual,V.storage.address, V.storage2.address,'Поля совпадают');
    VD.IWant(VD.NotToEqual,V.storage.zip, V.storage2.zip,'Поля совпадают');
    VD.IWant(VD.NotToEqual,V.storage.email, V.storage2.email,'Поля совпадают');
    VD.IWant(VD.NotToEqual,V.storage.notes, V.storage2.notes,'Поля совпадают');
    VD.IWant(VD.NotToEqual,V.storage.phone, V.storage2.phone,'Поля совпадают');
    VD.IWant(VD.ToEqual,V.storage3.name, V.storage2.name,'Поля не совпадают');
    VD.IWant(VD.ToEqual,V.storage3.address, V.storage2.address,'Поля не совпадают');
    VD.IWant(VD.ToEqual,V.storage3.zip, V.storage2.zip,'Поля не совпадают');
    VD.IWant(VD.ToEqual,V.storage3.email, V.storage2.email,'Поля не совпадают');
    VD.IWant(VD.ToEqual,V.storage3.notes, V.storage2.notes,'Поля не совпадают');
    VD.IWant(VD.ToEqual,-SF.cleanPrice(V.storage3.phone), V.storage2.phone,'Поля не совпадают');
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