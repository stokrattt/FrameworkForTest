module.exports = function main(SF, JS, MF, LF, JSstep, VD, V, By, until,FileDetector, system, condition, config,constants) {
    global.fiber = Fiber.current;
    V.client = {};
    V.client.name = SF.randomBukva(6) + '_t';
    V.client.fam = SF.randomBukva(6) + '_t';
    V.client.phone = SF.randomCifra(10);
    V.client.email = SF.randomBukvaSmall(6) + '@' + SF.randomBukvaSmall(4) + '.tes';
    V.client.passwd = 123;
    V.carrierNew = {};
    V.carrierNew2 = {};
    V.carrierNew3 = {};
    //=========================начинаем писать тест=============================
    SF.get(V.adminURL);
    LF.LoginToBoardAsCustom(V.adminLogin,V.adminPassword);
    MF.Board_OpenSideBar ();
    MF.Board_OpenCourier ();
    MF.Board_OpenSideBar ();

    V.carrierNew = {};
    V.carrierNew2 = {};
    V.carrierNew3 = {};
    condition.nowWeDoing = 'Создаем карьера';
    SF.click(By.xpath('//button[@ng-click="addCarrier()"]'));
    JS.waitForExist('input[ng-model=\\"agentModel.name\\"]');
    SF.sleep(2);
    V.carrierNew.name = SF.randomBukva(6) + '_t';
    V.carrierNew.contactPerson = SF.randomBukva(6) + '_t';
    V.carrierNew.contactPersonPhone = SF.randomCifra(10);
    SF.send(By.xpath('//input[@ng-model="agentModel.name"]'), V.carrierNew.name);
    SF.send(By.xpath('//input[@ng-model="agentModel.contact_person"]'), V.carrierNew.contactPerson);
    SF.send(By.xpath('//input[@ng-model="agentModel.contact_person_phone"]'), V.carrierNew.contactPersonPhone);
    V.carrierNew.address = SF.randomBukva(6) + '_t';
    V.carrierNew.zipCode = "90001";
    SF.send(By.xpath('//textarea[@ng-model="agentModel.address"]'), V.carrierNew.address);
    SF.send(By.xpath('//input[@ng-model="agentModel.zip_code"]'), V.carrierNew.zipCode);
    SF.sleep(2);
    SF.click(By.xpath('//md-checkbox[@ng-model="agentModel.company_carrier"]'));
    V.carrierNew.perCf = "2";
    V.carrierNew.iccMc = SF.randomCifra(10);
    SF.send(By.xpath('//input[@ng-model="agentModel.per_cf"]'), V.carrierNew.perCf);
    SF.send(By.xpath('//input[@ng-model="agentModel.icc_mc_number"]'), V.carrierNew.iccMc);
    V.carrierNew.usdot = SF.randomCifra(10);
    V.carrierNew.eMail = SF.randomBukvaSmall(6) + '@' + SF.randomBukvaSmall(4) + '.tes';
    SF.send(By.xpath('//input[@ng-model="agentModel.usdot_number"]'), V.carrierNew.usdot);
    SF.send(By.xpath('//input[@ng-model="agentModel.email"]'), V.carrierNew.eMail);
    V.carrierNew.webSite = "fdsfd.com";
    V.carrierNew.phoneNumber1 = SF.randomCifra(10);
    SF.send(By.xpath('//input[@ng-model="agentModel.web_site"]'), V.carrierNew.webSite);
    SF.send(By.xpath('//input[@ng-model="agentModel.phones[$index]"]'), V.carrierNew.phoneNumber1);
    SF.sleep(2);
    SF.click(By.xpath('//button[@ng-click="create(agentModel)"]'));
    SF.waitForVisible(By.xpath('//input[@ng-model="searchTerm"]'));

condition.nowWeDoing = 'Редактируем карьера';
    SF.waitForVisible(By.xpath('//input[@ng-model="searchTerm"]'));
    SF.send(By.xpath('//input[@ng-model="searchTerm"]'), V.carrierNew.name);
    SF.waitForVisible(By.xpath('//div[text()="'+ V.carrierNew.name +'"]'));
    SF.sleep(2);
    SF.click(By.xpath('//div[text()="'+ V.carrierNew.name +'"]'));
    JS.waitForExist('input[ng-model=\\"agentModel.name\\"]');
    SF.sleep(2);
    V.carrierNew2.name = SF.randomBukva(6) + '_t';
    V.carrierNew2.contactPerson = SF.randomBukva(6) + '_t';
    V.carrierNew2.contactPersonPhone = SF.randomCifra(10);
    SF.clear (By.xpath('//input[@ng-model="agentModel.name"]'));
    SF.send (By.xpath('//input[@ng-model="agentModel.name"]'), V.carrierNew2.name);
    SF.clear (By.xpath('//input[@ng-model="agentModel.contact_person"]'));
    SF.send (By.xpath('//input[@ng-model="agentModel.contact_person"]'), V.carrierNew2.contactPerson);
    SF.clear (By.xpath('//input[@ng-model="agentModel.contact_person_phone"]'));
    SF.send (By.xpath('//input[@ng-model="agentModel.contact_person_phone"]'), V.carrierNew2.contactPersonPhone);

    V.carrierNew2.address = SF.randomBukva(6) + '_t';
    V.carrierNew2.zipCode = "32142";
    SF.clear (By.xpath('//textarea[@ng-model="agentModel.address"]'));
    SF.send (By.xpath('//textarea[@ng-model="agentModel.address"]'), V.carrierNew2.address);
    SF.clear (By.xpath('//input[@ng-model="agentModel.zip_code"]'));
    SF.send (By.xpath('//input[@ng-model="agentModel.zip_code"]'), V.carrierNew2.zipCode);
    SF.sleep(2);

    V.carrierNew2.perCf = "4";
    V.carrierNew2.iccMc = SF.randomCifra(10);
    SF.clear (By.xpath('//input[@ng-model="agentModel.per_cf"]'));
    SF.send (By.xpath('//input[@ng-model="agentModel.per_cf"]'), V.carrierNew2.perCf);
    SF.clear (By.xpath('//input[@ng-model="agentModel.icc_mc_number"]'));
    SF.send (By.xpath('//input[@ng-model="agentModel.icc_mc_number"]'), V.carrierNew2.iccMc);

    V.carrierNew2.usdot = SF.randomCifra(10);
    V.carrierNew2.eMail = SF.randomBukvaSmall(6) + '@' + SF.randomBukvaSmall(4) + '.tes';
    SF.clear (By.xpath('//input[@ng-model="agentModel.usdot_number"]'));
    SF.send (By.xpath('//input[@ng-model="agentModel.usdot_number"]'), V.carrierNew2.usdot);
    SF.clear (By.xpath('//input[@ng-model="agentModel.email"]'));
    SF.send (By.xpath('//input[@ng-model="agentModel.email"]'), V.carrierNew2.eMail);

    V.carrierNew2.webSite = "Starks.com";
    V.carrierNew2.phoneNumber1 = SF.randomCifra(10);
    SF.clear (By.xpath('//input[@ng-model="agentModel.web_site"]'));
    SF.send (By.xpath('//input[@ng-model="agentModel.web_site"]'), V.carrierNew2.webSite);
    SF.clear (By.xpath('//input[@ng-model="agentModel.phones[$index]"]'));
    SF.send (By.xpath('//input[@ng-model="agentModel.phones[$index]"]'), V.carrierNew2.phoneNumber1);
    SF.sleep(2);
    JS.click('span:contains(\\"Save\\")');
    SF.waitForVisible(By.xpath('//input[@ng-model="searchTerm"]'));

condition.nowWeDoing = 'сравниваем сохранились ли изменения';
    SF.send(By.xpath('//input[@ng-model="searchTerm"]'), V.carrierNew2.name);
    SF.waitForVisible(By.xpath('//div[text()="'+ V.carrierNew2.name +'"]'));
    SF.sleep(2);
    SF.click(By.xpath('//div[text()="'+ V.carrierNew2.name +'"]'));
    JS.waitForExist('input[ng-model=\\"agentModel.name\\"]');
    SF.sleep(2);
Debug.pause();
    LF.RememberCarrier(V.carrierNew3);
    VD.IWant(VD.NotToEqual,V.carrierNew.name, V.carrierNew2.name,'Поля совпадают');
    VD.IWant(VD.NotToEqual,V.carrierNew.contactPerson, V.carrierNew2.contactPerson,'Поля совпадают');
    VD.IWant(VD.NotToEqual,V.carrierNew.contactPersonPhone, V.carrierNew2.contactPersonPhone,'Поля совпадают');
    VD.IWant(VD.NotToEqual,V.carrierNew.address, V.carrierNew2.address,'Поля совпадают');
    VD.IWant(VD.NotToEqual,V.carrierNew.zipCode, V.carrierNew2.zipCode,'Поля совпадают');
    VD.IWant(VD.NotToEqual,V.carrierNew.perCf, V.carrierNew2.perCf,'Поля совпадают');
    VD.IWant(VD.NotToEqual,V.carrierNew.iccMc, V.carrierNew2.iccMc,'Поля совпадают');
    VD.IWant(VD.NotToEqual,V.carrierNew.usdot, V.carrierNew2.usdot,'Поля совпадают');
    VD.IWant(VD.NotToEqual,V.carrierNew.eMail, V.carrierNew2.eMail,'Поля совпадают');
    VD.IWant(VD.NotToEqual,V.carrierNew.webSite, V.carrierNew2.webSite,'Поля совпадают');
    VD.IWant(VD.NotToEqual,V.carrierNew.phoneNumber1, V.carrierNew2.phoneNumber1,'Поля совпадают');
    VD.IWant(VD.ToEqual,V.carrierNew3.name, V.carrierNew2.name,'Поля не совпадают');
    VD.IWant(VD.ToEqual,V.carrierNew3.contactPerson, V.carrierNew2.contactPerson,'Поля не совпадают');
    VD.IWant(VD.ToEqual,-SF.cleanPrice(V.carrierNew3.contactPersonPhone), V.carrierNew2.contactPersonPhone,'Поля не совпадают');
    VD.IWant(VD.ToEqual,V.carrierNew3.address, V.carrierNew2.address,'Поля не совпадают');
    VD.IWant(VD.ToEqual,V.carrierNew3.zipCode, V.carrierNew2.zipCode,'Поля не совпадают');
    VD.IWant(VD.ToEqual,V.carrierNew3.perCf, V.carrierNew2.perCf,'Поля не совпадают');
    VD.IWant(VD.ToEqual,V.carrierNew3.iccMc, V.carrierNew2.iccMc,'Поля не совпадают');
    VD.IWant(VD.ToEqual,V.carrierNew3.usdot, V.carrierNew2.usdot,'Поля не совпадают');
    VD.IWant(VD.ToEqual,V.carrierNew3.eMail, V.carrierNew2.eMail,'Поля не совпадают');
    VD.IWant(VD.ToEqual,V.carrierNew3.webSite, V.carrierNew2.webSite,'Поля не совпадают');
    VD.IWant(VD.ToEqual,-SF.cleanPrice(V.carrierNew3.phoneNumber1), V.carrierNew2.phoneNumber1,'Поля не совпадают');
    JS.click('span:contains(\\"Save\\")');
    SF.waitForVisible(By.xpath('//input[@ng-model="searchTerm"]'));

condition.nowWeDoing = 'Проверяем есть ли карьер в списке при добалении трипа';
    MF.Board_OpenSideBar ();
    MF.Board_OpenTripPlanner ();
    MF.Board_OpenSideBar ();
    MF.SIT_ClickAddTrip();
    MF.SIT_SelectCarrierName(V.carrierNew2.name);
    MF.Board_OpenSideBar ();
    MF.Board_OpenCarriersAndAgents ();
    MF.Board_OpenSideBar ();
    SF.waitForVisible(By.xpath('//input[@ng-model="searchTerm"]'));
    SF.send(By.xpath('//input[@ng-model="searchTerm"]'), V.carrierNew2.name);
    SF.waitForVisible(By.xpath('//div[text()="'+ V.carrierNew2.name +'"]'));
    SF.click(By.xpath('//div[text()="'+ V.carrierNew2.name +'"]'));

condition.nowWeDoing = 'удаляем карьера';
    driver.wait(driver.executeScript('return location.toString();').then(function(url){
        let c='a';
        for (let i=0; i<url.length; i++) {
            if (url[i]=='/'){c=i;}
        }
        let id = url.substring(c+1);
        driver.executeScript(
            JSstep.sendRequestNoParam('DELETE', 'http://api.moversboard.net:8084/server/long_distance_carrier/'+id)
        );
    }),config.timeout);
    SF.sleep(1);
    //=========================закончили писать тест=============================
    SF.endOfTest();
};
