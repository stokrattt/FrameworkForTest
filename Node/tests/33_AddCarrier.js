module.exports = function main(SF, JS, MF, LF, JSstep, VD, V, By, until,FileDetector, system, condition, config,constants) {
    global.fiber = Fiber.current;
    V.client = {};
    V.client.name = SF.randomBukva(6) + '_t';
    V.client.fam = SF.randomBukva(6) + '_t';
    V.client.phone = SF.randomCifra(10);
    V.client.email = SF.randomBukvaSmall(6) + '@' + SF.randomBukvaSmall(4) + '.tes';
    V.client.passwd = 123;

    //=========================начинаем писать тест=============================
    SF.get('http://stage.themoveboard.com:8090/moveBoard/#/login');
    SF.send(By.id('email'), 'TestAdmin');
    SF.send(By.id('password'), 'test');
    JS.click('.btn-primary');

    SF.click(By.xpath('//button[@ng-click="toggleLeft()"]'));
    SF.sleep(2);
    SF.click(By.xpath('//a[@ng-click="vm.goToPage(\'couriers\', \'\')"]'));
    SF.sleep(2);
    SF.click(By.xpath('//button[@ng-click="toggleLeft()"]'));
    SF.sleep(2);
    V.carrierNew={};
    V.carrierNew2={};
    V.carrierNew3={};
    condition.nowWeDoing = 'Создаем карьера';
    SF.click(By.xpath('//button[@ng-click="addCarrier()"]'));
    JS.waitForExist('input[ng-model=\\"agentModel.data.name\\"]');
    SF.sleep(1);
    V.carrierNew.name = SF.randomBukva(6) + '_t';
    V.carrierNew.contactPerson = SF.randomBukva(6) + '_t';
    SF.send (By.xpath('//input[@ng-model="agentModel.data.name"]'), V.carrierNew.name);
    SF.send (By.xpath('//input[@ng-model="agentModel.data.contact_person"]'), V.carrierNew.contactPerson);
    V.carrierNew.address = SF.randomBukva(6) + '_t';
    V.carrierNew.zipCode = "56743";
    SF.send (By.xpath('//textarea[@ng-model="agentModel.data.address"]'), V.carrierNew.address);
    SF.send (By.xpath('//input[@ng-model="agentModel.data.zip_code"]'), V.carrierNew.zipCode);
    SF.click (By.xpath('//md-checkbox[@ng-model="agentModel.data.company_carrier"]'));
    SF.click (By.xpath('//md-checkbox[@ng-model="agentModel.data.active"]'));
    V.carrierNew.perCf = "2";
    V.carrierNew.iccMc = SF.randomCifra(10);
    SF.send (By.xpath('//input[@ng-model="agentModel.data.per_cf"]'), V.carrierNew.perCf);
    SF.send (By.xpath('//input[@ng-model="agentModel.data.icc_mc_number"]'), V.carrierNew.iccMc);
    V.carrierNew.usdot = SF.randomCifra(10);
    V.carrierNew.eMail = SF.randomBukvaSmall(6) + '@' + SF.randomBukvaSmall(4) + '.tes';
    SF.send (By.xpath('//input[@ng-model="agentModel.data.usdot_number"]'), V.carrierNew.usdot);
    SF.send (By.xpath('//input[@ng-model="agentModel.data.email"]'), V.carrierNew.eMail);
    V.carrierNew.webSite = "fdsfd.com";
    V.carrierNew.phoneNumber1 = SF.randomCifra(10);
    SF.send (By.xpath('//input[@ng-model="agentModel.data.web_site"]'), V.carrierNew.webSite);
    SF.send (By.xpath('//input[@ng-model="agentModel.data.phones[$index]"]'), V.carrierNew.phoneNumber1);
    JS.click('span:contains(\\"Save\\")');

    condition.nowWeDoing = 'Редактируем карьера';
    SF.sleep(3);
    SF.click(By.xpath('//div[text()="'+ V.carrierNew.name +'"]'));

    JS.waitForExist('input[ng-model=\\"agentModel.data.name\\"]');
    SF.sleep(1);
    V.carrierNew2.name = SF.randomBukva(6) + '_t';
    V.carrierNew2.contactPerson = SF.randomBukva(6) + '_t';
    SF.clear (By.xpath('//input[@ng-model="agentModel.data.name"]'));

    SF.send (By.xpath('//input[@ng-model="agentModel.data.name"]'), V.carrierNew2.name);

    SF.clear (By.xpath('//input[@ng-model="agentModel.data.contact_person"]'));
    SF.send (By.xpath('//input[@ng-model="agentModel.data.contact_person"]'), V.carrierNew2.contactPerson);

    V.carrierNew2.address = SF.randomBukva(6) + '_t';
    V.carrierNew2.zipCode = "32142";
    SF.clear (By.xpath('//textarea[@ng-model="agentModel.data.address"]'));
    SF.send (By.xpath('//textarea[@ng-model="agentModel.data.address"]'), V.carrierNew2.address);

    SF.clear (By.xpath('//input[@ng-model="agentModel.data.zip_code"]'));
    SF.send (By.xpath('//input[@ng-model="agentModel.data.zip_code"]'), V.carrierNew2.zipCode);

    SF.click (By.xpath('//md-checkbox[@ng-model="agentModel.data.company_carrier"]'));
    V.carrierNew2.perCf = "4";
    V.carrierNew2.iccMc = SF.randomCifra(10);
    SF.clear (By.xpath('//input[@ng-model="agentModel.data.per_cf"]'));
    SF.send (By.xpath('//input[@ng-model="agentModel.data.per_cf"]'), V.carrierNew2.perCf);

    SF.clear (By.xpath('//input[@ng-model="agentModel.data.icc_mc_number"]'));
    SF.send (By.xpath('//input[@ng-model="agentModel.data.icc_mc_number"]'), V.carrierNew2.iccMc);

    V.carrierNew2.usdot = SF.randomCifra(10);
    V.carrierNew2.eMail = SF.randomBukvaSmall(6) + '@' + SF.randomBukvaSmall(4) + '.tes';
    SF.clear (By.xpath('//input[@ng-model="agentModel.data.usdot_number"]'));
    SF.send (By.xpath('//input[@ng-model="agentModel.data.usdot_number"]'), V.carrierNew2.usdot);

    SF.clear (By.xpath('//input[@ng-model="agentModel.data.email"]'));
    SF.send (By.xpath('//input[@ng-model="agentModel.data.email"]'), V.carrierNew2.eMail);

    V.carrierNew2.webSite = "Starks.com";
    V.carrierNew2.phoneNumber1 = SF.randomCifra(10);
    SF.clear (By.xpath('//input[@ng-model="agentModel.data.web_site"]'));
    SF.send (By.xpath('//input[@ng-model="agentModel.data.web_site"]'), V.carrierNew2.webSite);

    SF.clear (By.xpath('//input[@ng-model="agentModel.data.phones[$index]"]'));
    SF.send (By.xpath('//input[@ng-model="agentModel.data.phones[$index]"]'), V.carrierNew2.phoneNumber1);

    SF.sleep(2);
    JS.click('span:contains(\\"Save\\")');
    SF.sleep(5);
    condition.nowWeDoing = 'сравниваем сохранились ли изменения';
    SF.click(By.xpath('//div[text()="'+ V.carrierNew2.name +'"]'));
    JS.waitForExist('input[ng-model=\\"agentModel.data.name\\"]');
    SF.sleep(1);

    LF.RememberCarrier(V.carrierNew3);
    console.log(V.carrierNew3);
    VD.IWant(VD.VNotToEqual,V.carrierNew.name, V.carrierNew2.name,'Поля совпадают');
    VD.IWant(VD.VNotToEqual,V.carrierNew.contactPerson, V.carrierNew2.contactPerson,'Поля совпадают');
    VD.IWant(VD.VNotToEqual,V.carrierNew.address, V.carrierNew2.address,'Поля совпадают');
    VD.IWant(VD.VNotToEqual,V.carrierNew.zipCode, V.carrierNew2.zipCode,'Поля совпадают');
    VD.IWant(VD.VNotToEqual,V.carrierNew.perCf, V.carrierNew2.perCf,'Поля совпадают');
    VD.IWant(VD.VNotToEqual,V.carrierNew.iccMc, V.carrierNew2.iccMc,'Поля совпадают');
    VD.IWant(VD.VNotToEqual,V.carrierNew.usdot, V.carrierNew2.usdot,'Поля совпадают');
    VD.IWant(VD.VNotToEqual,V.carrierNew.eMail, V.carrierNew2.eMail,'Поля совпадают');
    VD.IWant(VD.VNotToEqual,V.carrierNew.webSite, V.carrierNew2.webSite,'Поля совпадают');
    VD.IWant(VD.VNotToEqual,V.carrierNew.phoneNumber1, V.carrierNew2.phoneNumber1,'Поля совпадают');

    VD.IWant(VD.VToEqual,V.carrierNew3.name, V.carrierNew2.name,'Поля не совпадают');
    VD.IWant(VD.VToEqual,V.carrierNew3.contactPerson, V.carrierNew2.contactPerson,'Поля не совпадают');
    VD.IWant(VD.VToEqual,V.carrierNew3.address, V.carrierNew2.address,'Поля не совпадают');
    VD.IWant(VD.VToEqual,V.carrierNew3.zipCode, V.carrierNew2.zipCode,'Поля не совпадают');
    VD.IWant(VD.VToEqual,V.carrierNew3.perCf, V.carrierNew2.perCf,'Поля не совпадают');
    VD.IWant(VD.VToEqual,V.carrierNew3.iccMc, V.carrierNew2.iccMc,'Поля не совпадают');
    VD.IWant(VD.VToEqual,V.carrierNew3.usdot, V.carrierNew2.usdot,'Поля не совпадают');
    VD.IWant(VD.VToEqual,V.carrierNew3.eMail, V.carrierNew2.eMail,'Поля не совпадают');
    VD.IWant(VD.VToEqual,V.carrierNew3.webSite, V.carrierNew2.webSite,'Поля не совпадают');
    VD.IWant(VD.VToEqual,-SF.cleanPrice(V.carrierNew3.phoneNumber1), V.carrierNew2.phoneNumber1,'Поля не совпадают');

    JS.click('span:contains(\\"Save\\")');

    condition.nowWeDoing = 'Проверяем есть ли карьер в списке при добалении трипа';
    SF.click(By.xpath('//button[@ng-click="toggleLeft()"]'));
    SF.sleep(2);
    SF.click(By.xpath('//a[@ng-class="{active:vm.isCurrent(\'trip planner\')}"]'));
    SF.sleep(2);
    SF.click(By.xpath('//button[@ng-click="toggleLeft()"]'));
    SF.sleep(2);
    SF.click(By.xpath('//button[@ng-click="addTrip()"]'));
    SF.sleep(2);
    SF.click(By.xpath('//md-select[@ng-model="trip.data.carrier.carrier_id"]'));
    SF.click(By.xpath('//div[text()="'+ V.carrierNew2.name +'"]'));
    SF.click(By.xpath('//button[@ng-click="toggleLeft()"]'));
    SF.click(By.xpath('//a[@ng-class="{active:vm.isCurrent(\'carriers and agents\')}"]'));
    SF.click(By.xpath('//button[@ng-click="toggleLeft()"]'));
    SF.sleep(3);
    SF.click(By.xpath('//div[text()="'+ V.carrierNew2.name +'"]'));

    condition.nowWeDoing = 'удаляем карьера';
    driver.wait(driver.executeScript('return location.toString();').then(function(url){
        let c='a';
        for (let i=0; i<url.length; i++) {
            if (url[i]=='/'){c=i;}
        }
        let id = url.substring(c+1);
        driver.executeScript(
            JSstep.sendRequestNoParam('DELETE', 'http://api.moversboard.net:8083/server/long_distance_carrier/'+id)
        );
    }),config.timeout);

    SF.sleep(2);

    SF.click(By.xpath('//ng-md-icon[@icon="chevron_left"]'));

    //=========================закончили писать тест=============================
    SF.endOfTest();
};
