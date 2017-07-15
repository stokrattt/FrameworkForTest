
module.exports = function main(SF, JS, MF, LF, JSstep, VD, V, By, until,FileDetector, system, condition, config,constants) {
    global.fiber = Fiber.current;
    V.client = {};
    V.client.name = SF.randomBukva(6) + '_t';
    V.client.fam = SF.randomBukva(6) + '_t';
    V.client.phone = SF.randomCifra(10);
    V.client.email = SF.randomBukvaSmall(6) + '@' + SF.randomBukvaSmall(4) + '.tes';
    V.client.passwd = 123;
    V.client.zipFrom = '02222';
    V.client.zipTo = '32132';

    //=========================начинаем писать тест=============================
    SF.get(V.adminURL);
    LF.LoginToBoardAs_Roma4ke_Admin ();

    condition.nowWeDoing = 'Заходим в SIT Storages и создаем Storage';
    MF.Board_OpenSideBar();
    SF.sleep(2);
    MF.BoardSIT_OpenStorages();
    MF.Board_OpenSideBar();
    SF.sleep(2);
    SF.click(By.xpath('//button[@ng-click="addStorage()"]'));
    SF.sleep(2);
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
    SF.sleep(3);
    SF.send (By.xpath('//input[@ng-model="newStorage.name"]'), V.storage.name);
    SF.send (By.xpath('//textarea[@ng-model="newStorage.address"]'), V.storage.address);
    SF.send (By.xpath('//input[@ng-model="newStorage.zip_code"]'), V.storage.zip);
    SF.sleep(2);
    SF.click (By.xpath('//md-checkbox[@ng-model="newStorage.default_storage"]'));
    SF.send (By.xpath('//input[@ng-model="newStorage.notes"]'), V.storage.notes);
    SF.send (By.xpath('//input[@ng-model="newStorage.email"]'), V.storage.email);
    SF.send (By.xpath('//input[@ng-model="newStorage.phones[$index]"]'), V.storage.phone);
    SF.sleep(4);
    JS.click('span:contains(\\"Save\\")');
    // SF.click(By.xpath('//button[@ng-click="create()"]/span'));

    condition.nowWeDoing = 'Редактируем Storage';
    SF.sleep(5);
    V.last=false;
    V.found=false;
    do {
        driver.wait(driver.findElements(By.xpath('//div[text()="'+ V.storage.name +'"]')).then(function (elements) {
            V.count = elements.length;
            console.log(V.count);
        }), config.timeout);
        SF.sleep(1);
        driver.wait(driver.findElements(By.xpath('//a[@ng-click="selectPage(page + 1, $event)"]/parent::li[contains(@class,"disabled")]')).then(function (elements) {
            V.last = (elements.length==1);
            console.log(V.last);
        }), config.timeout);
        SF.sleep(1);
        if ((V.count == 0)&&(!V.last)) {
            SF.click(By.xpath('//a[@ng-click="selectPage(page + 1, $event)"]'));
        } else {
            V.found=true;
        }
    }while ((V.count==0)&&(!V.last)&&(!V.found));

    VD.INeed(VD.ToEqual, V.found, true, 'не нашёл нужный storage');

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
    // SF.click(By.xpath('//button[@ng-click="create()"]'));
    SF.sleep(5);
    condition.nowWeDoing = 'сравниваем сохранились ли изменения';
    V.last2=false;
    V.found2=false;
    do {
        driver.wait(driver.findElements(By.xpath('//div[text()="'+ V.storage2.name +'"]')).then(function (elements) {
            V.count2 = elements.length;
            console.log(V.count2);
        }), config.timeout);
        SF.sleep(1);
        driver.wait(driver.findElements(By.xpath('//a[@ng-click="selectPage(page + 1, $event)"]/parent::li[contains(@class,"disabled")]')).then(function (elements) {
            V.last2 = (elements.length==1);
            console.log(V.last2);
        }), config.timeout);
        SF.sleep(1);
        if ((V.count == 0)&&(!V.last2)) {
            SF.click(By.xpath('//a[@ng-click="selectPage(page + 1, $event)"]'));
        } else {
            V.found2=true;
        }
    }while ((V.count2==0)&&(!V.last2)&&(!V.found2));

    VD.INeed(VD.ToEqual, V.found, true, 'не нашёл нужный storage');

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
    // SF.click(By.xpath('//button[@ng-click="create()"]'));
    JS.click('span:contains(\\"Save\\")');
    SF.sleep(5);

    condition.nowWeDoing = 'Создаем Long Distance работу';
    LF.CreateLongDistanceFromBoard(V.client);
    MF.EditRequest_SetToConfirmed();
    SF.select(By.xpath('//select[@id="edit-service"]'), 7);
    SF.sleep(1);

    condition.nowWeDoing = 'Проверяем есть ли сторадж в реквести в SIT';
    JS.step(JSstep.selectTruck(5));
    V.perCubicFeet = '5';
    SF.clear(By.xpath('//input[@ng-model="request.field_long_distance_rate.value"]'));
    SF.send(By.xpath('//input[@ng-model="request.field_long_distance_rate.value"]'), V.perCubicFeet);
    MF.EditRequest_SetAdressToFrom();
    MF.EditRequest_SaveChanges();
    SF.sleep(2);
    SF.click(By.xpath('//div[@ng-click="changeSalesClosingTab(\'closing\')"]'));
    SF.sleep(3);
    SF.click(By.xpath('//a[@ng-click="openSendRequestToSITModal()"]'));
    SF.sleep(3);
    SF.click(By.xpath('//select[@ng-model="sit.storage_id"]'));
    SF.click(By.xpath('//option[text()="'+ V.storage2.name +'"]'));


    SF.endOfTest();

};