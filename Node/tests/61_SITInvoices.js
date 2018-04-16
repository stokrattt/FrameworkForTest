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

    //=========================начинаем писать тест=============================

    SF.get(V.adminURL);
    LF.LoginToBoardAsCustom(V.adminLogin,V.adminPassword);
    MF.Board_OpenSideBar ();
    MF.Board_OpenCourier ();
    MF.Board_OpenSideBar ();

condition.nowWeDoing = 'Создаем карьера';
    V.carrierNew = {};
    V.carrierNew2 = {};
    V.carrierNew3 = {};
    condition.nowWeDoing = 'Создаем карьера';
    MF.SIT_ClickAddCarrier();
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
    MF.SIT_ClickSaveCarrier();

condition.nowWeDoing = 'Создаем Long Distance работу';
    LF.CreateLongDistanceFromBoard(V.client);
    MF.EditRequest_SetToConfirmed();
    SF.select(By.xpath('//select[@id="edit-service"]'), 7);
    SF.sleep(1);
    JS.step(JSstep.selectTruck(5));
    MF.WaitWhileBusy();
    V.perCubicFeet = '5';
    MF.EditRequest_SendRateForLD (V.perCubicFeet);
    MF.ConfirmCalculatorOff();
    MF.EditRequest_SetAdressToFrom();
    MF.EditRequest_SaveChanges();
    LF.closeEditRequest ();
    MF.Board_OpenSideBar();
    MF.Board_OpenTripPlanner();
    MF.Board_OpenSideBar();

condition.nowWeDoing = 'Создаем Трип';
    MF.SIT_ClickAddTrip();
    MF.SIT_ChangeStatusTrip('Pending');
    V.internalCode = SF.randomCifra(10);
    V.decription = SF.randomBukva(6) + '_t';
    SF.send (By.xpath('//textarea[@ng-model="trip.data.details.description"]'), V.decription);
    let now = new Date();
    let msInDay = 86400000;
    let future = new Date(now.getTime() + msInDay * 10);
    let options = { month: 'numeric', day: 'numeric', year: 'numeric' };
    V.dateStart = (now.toLocaleDateString('en-US', options));
    V.dateEnd = (future.toLocaleDateString('en-US', options));
    SF.clear(By.xpath('//md-datepicker[@ng-model="trip.data.details.start"]/div/input'));
    SF.send(By.xpath('//md-datepicker[@ng-model="trip.data.details.start"]/div/input'), V.dateStart);
    SF.clear(By.xpath('//md-datepicker[@ng-model="trip.data.details.end"]/div/input'));
    SF.send(By.xpath('//md-datepicker[@ng-model="trip.data.details.end"]/div/input'), V.dateEnd);
    SF.sleep(1);
    SF.click(By.xpath('//input[@ng-model="search"]'));
    SF.sleep(1);
    MF.SIT_SelectCarrierName(V.carrierNew.name);
    SF.sleep(1);
    V.driverPhone = SF.randomCifra(10);
    V.driverName = SF.randomBukva(6) + '_t';
    V.notes = SF.randomBukva(25) + '_t';
    SF.send (By.xpath('//input[@ng-model="trip.data.carrier.driver_name"]'), V.driverName);
    SF.send (By.xpath('//input[@ng-model="trip.data.carrier.driver_phone"]'), V.driverPhone);
    SF.send (By.xpath('//textarea[@ng-model="trip.data.note"]'), V.notes);

condition.nowWeDoing = 'Сохраняем трип и добавляем работу в трип';
    MF.SIT_ClickUpdateTrip();
    JS.click('span:contains(\\"Add Pickup/Delivery\\")');
    SF.waitForVisible(By.xpath('//div[contains(text(), "' + V.client.name + '")]'));
    SF.clear(By.xpath('//md-datepicker[@ng-model="pickupDateFrom"]/div/input'));
    SF.send(By.xpath('//md-datepicker[@ng-model="pickupDateFrom"]/div/input'), V.dateStart);
    SF.clear(By.xpath('//md-datepicker[@ng-model="pickupDateTo"]/div/input'));
    SF.send(By.xpath('//md-datepicker[@ng-model="pickupDateTo"]/div/input'), V.dateEnd);
    SF.click(By.xpath('//input[@ng-model="search"]'));
    SF.sleep(3);
    SF.click(By.xpath('//div[contains(text(), "' + V.client.name + '")]/..//md-checkbox[@ng-model="item.a_a_selected"]/div[1]'));
    driver.wait(driver.findElement(By.xpath('//div[contains(text(),"' + V.client.name + '")]/..//div[@ng-click="openRequest(id)"]')).getText().then(function(text){
        V.ldJobId = text;
    }),config.timeout);
    MF.SIT_AddRequestToTrip();
    MF.SIT_GoToClosingTab();
    SF.waitForVisible(By.xpath('//div[@ng-click="showTpCollected(item, item.balance)"]'));
    SF.click(By.xpath('//div[@ng-click="showTpCollected(item, item.balance)"]'));
    SF.waitForVisible(By.xpath('//h2[contains(text(), "Custom Payment")]'));
    SF.sleep(1);
    V.somePayment = 900;
    SF.clear(By.xpath('//input[@ng-model="payment.amount"]'));
    SF.send(By.xpath('//input[@ng-model="payment.amount"]'), V.somePayment);
    SF.click(By.xpath('//button[@ng-click="save()"]'));
    SF.waitForVisible (By.xpath('//div[contains(text(), "$'+V.somePayment+'.00")]'));
    SF.sleep(2);
    SF.click(By.xpath('//button[@ng-click="back()"]'));
    SF.waitForVisible(By.xpath('//div[@ng-click="showTpCollected(item, item.balance)"]'));
    MF.SIT_ClickTripDetails();
    MF.SIT_ClickUpdateTrip();

condition.nowWeDoing = 'Заходим в Агент фолио';
    MF.Board_OpenSideBar ();
    MF.Board_ClickLongDistanceDispach();
    MF.Board_OpenAgentFolio ();
    MF.Board_OpenSideBar ();
    SF.click(By.xpath('//md-switch[@ng-model="hideZero"]'));
    SF.sleep(2);

condition.nowWeDoing = 'вибираем карьера, вибираем работи и отправляем инвоис';
    SF.send(By.xpath('//input[@ng-model="searchTerm"]'), V.carrierNew.name);
    SF.waitForVisible (By.xpath('//div[text()="'+ V.carrierNew.name +'"]'));
    SF.click(By.xpath('//div[text()="'+ V.carrierNew.name +'"]'));
    SF.sleep(1);
    SF.click(By.xpath('//md-checkbox[@ng-model="selectAll"]'));
    SF.waitForVisible (By.xpath('//button[@ng-click="openInvoice($event, charge, false, selectedJobs, total.balance)"]'));
    SF.click(By.xpath('//button[@ng-click="openInvoice($event, charge, false, selectedJobs, total.balance)"]'));
    SF.waitForVisible(By.xpath('//button[@ng-click="sendInvoice()"]'));
    SF.sleep(2);
    SF.click(By.xpath('//button[@ng-click="sendInvoice()"]'));
    SF.waitForVisible(By.xpath('//a[@ng-click="save()"]'));
    SF.sleep(2);
    SF.click(By.xpath('//a[@ng-click="save()"]'));
    SF.sleep(2);

condition.nowWeDoing = 'переходим на страницу просмотра иновоиса и делаем оплату инвоиса';
    MF.WaitWhileToaster();
    SF.waitForVisible(By.xpath('//md-fab-trigger[@aria-haspopup="true"]'));
    SF.click(By.xpath('//md-fab-trigger[@aria-haspopup="true"]'));
    SF.sleep(2);
    SF.click(By.xpath('//button[@aria-label="Show"]/ng-md-icon[@icon="remove_red_eye"]'));
    SF.openTab(1);
    SF.waitForVisible(By.xpath('//a[@ng-click="vm.invoicePayment();"]'));
    SF.sleep(3);
    SF.click(By.xpath('//a[@ng-click="vm.invoicePayment();"]'));
    LF.InvoiceOnlinePayment();
    SF.openTab(0);

condition.nowWeDoing = 'Проверяем есть ли в реситах оплачений инвоис';
    SF.sleep(3);
    driver.wait(driver.findElement(By.xpath('//span[contains(text(), "Amount")]/..')).getText().then(function(text){
        V.amount = SF.cleanPrice(text);
    }),config.timeout);
    driver.wait(driver.executeScript("if($('md-switch[ng-change=\"setHideZero()\"]').hasClass('ng-empty')){" +
        "return true;}else{$('md-switch[ng-change=\"setHideZero()\"]').click()}"),config.timeout);
    SF.waitForVisible(By.xpath('//span[contains(text(), "Amount")]'));
    driver.wait(driver.findElement(By.xpath('//span[contains(text(), "Amount")]/..')).getText().then(function(text){
        V.receiptsAmount = SF.cleanPrice(text);
        VD.IWant(VD.ToEqual, V.amount, V.receiptsAmount, 'не совпали Amount');
    }),config.timeout);
    condition.nowWeDoing = 'Проверяем есть ли в вкладке Invoices инвоис';
    JS.click('span:contains(\\"Invoices\\")');
    SF.waitForVisible(By.xpath('//span[contains(text(), "Amount")]'));
    driver.wait(driver.findElement(By.xpath('//span[contains(text(), "Amount")]/..')).getText().then(function(text){
        V.invoicesAmount = SF.cleanPrice(text);
        VD.IWant(VD.ToEqual, V.amount, V.invoicesAmount, 'не совпали Amount');
    }),config.timeout);
    SF.click(By.xpath('//div[@ng-click="showList(item)"]'));

condition.nowWeDoing = 'удаляем инвоис';
    JS.click('span:contains(\\"Payment details\\")');
    SF.sleep(2);
    MF.Board_OpenSideBar ();
    MF.Board_OpenCarriersAndAgents ();
    MF.Board_OpenSideBar ();
    SF.send(By.xpath('//input[@ng-model="searchTerm"]'), V.carrierNew.name);
    SF.waitForVisible(By.xpath('//div[text()="'+ V.carrierNew.name +'"]'));
    SF.click(By.xpath('//div[text()="'+ V.carrierNew.name +'"]'));

condition.nowWeDoing = 'удаляем карьера';
    driver.wait(driver.executeScript('return location.toString();').then(function(url){
        let c='a';
        for (let i=0; i<url.length; i++) {
            if (url[i]=='/'){c=i;}
        }
        let id = url.substring(c+1);
        driver.executeScript(
            JSstep.sendRequestNoParam('DELETE', 'http://api.moversboard.net:8082/server/long_distance_carrier/'+id)
        );
    }),config.timeout);
    SF.sleep(1);

    //=========================закончили писать тест=============================
    SF.endOfTest();
};