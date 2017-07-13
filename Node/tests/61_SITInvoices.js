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
    LF.LoginToBoardAs_Roma4ke_Admin ();

    MF.Board_OpenSideBar ();
    MF.Board_OpenCourier ();
    MF.Board_OpenSideBar ();
    condition.nowWeDoing = 'Создаем карьера';
    SF.click(By.xpath('//button[@ng-click="addCarrier()"]'));
    JS.waitForExist('input[ng-model=\\"agentModel.data.name\\"]');
    SF.sleep(1);
    V.carrierName = SF.randomBukva(6) + '_t';
    V.carrierContactPerson = SF.randomBukva(6) + '_t';
    V.carrierContactPersonPhone = SF.randomCifra(10);
    SF.send (By.xpath('//input[@ng-model="agentModel.data.name"]'), V.carrierName);
    SF.send (By.xpath('//input[@ng-model="agentModel.data.contact_person"]'), V.carrierContactPerson);
    SF.send (By.xpath('//input[@ng-model="agentModel.data.contact_person_phone"]'), V.carrierContactPersonPhone);
    V.carrierAddress = SF.randomBukva(6) + '_t';
    V.carrierZipCode = "56743";
    SF.send (By.xpath('//textarea[@ng-model="agentModel.data.address"]'), V.carrierAddress);
    SF.send (By.xpath('//input[@ng-model="agentModel.data.zip_code"]'), V.carrierZipCode);
    SF.click (By.xpath('//md-checkbox[@ng-model="agentModel.data.company_carrier"]'));
    SF.click (By.xpath('//md-checkbox[@ng-model="agentModel.data.active"]'));
    V.carrierPerCf = "2";
    V.carrierIccMc = SF.randomCifra(10);
    SF.send (By.xpath('//input[@ng-model="agentModel.data.per_cf"]'), V.carrierPerCf);
    SF.send (By.xpath('//input[@ng-model="agentModel.data.icc_mc_number"]'), V.carrierIccMc);
    V.carrierUsdot = SF.randomCifra(10);
    V.carrierEMail = SF.randomBukvaSmall(6) + '@' + SF.randomBukvaSmall(4) + '.tes';
    SF.send (By.xpath('//input[@ng-model="agentModel.data.usdot_number"]'), V.carrierUsdot);
    SF.send (By.xpath('//input[@ng-model="agentModel.data.email"]'), V.carrierEMail);
    V.carrierWebSite = "fdsfd.com";
    V.carrierPhoneNumber1 = SF.randomCifra(10);
    SF.send (By.xpath('//input[@ng-model="agentModel.data.web_site"]'), V.carrierWebSite);
    SF.send (By.xpath('//input[@ng-model="agentModel.data.phones[$index]"]'), V.carrierPhoneNumber1);
    SF.sleep(2);
    JS.click('span:contains(\\"Save\\")');
    SF.sleep(5);

    condition.nowWeDoing = 'Создаем Long Distance работу';
    LF.CreateLongDistanceFromBoard(V.client);
    MF.EditRequest_SetToConfirmed();
    SF.select(By.xpath('//select[@id="edit-service"]'), 7);
    SF.sleep(1);

    JS.step(JSstep.selectTruck(5));
    V.perCubicFeet = '5';
    SF.clear(By.xpath('//input[@ng-model="request.field_long_distance_rate.value"]'));
    SF.send(By.xpath('//input[@ng-model="request.field_long_distance_rate.value"]'), V.perCubicFeet);
    MF.EditRequest_SetAdressToFrom();
    MF.EditRequest_SaveChanges();
    SF.sleep(2);

    LF.closeEditRequest ();

    MF.Board_OpenSideBar();
    SF.sleep(2);
    MF.Board_OpenTripPlanner();
    MF.Board_OpenSideBar();
    SF.sleep(2);

    condition.nowWeDoing = 'Создаем Трип';
    SF.click(By.xpath('//button[@ng-click="addTrip()"]'));
    SF.sleep(2);
    SF.click(By.xpath('//md-select[@ng-model="trip.data.details.flag"]'));
    SF.click(By.xpath('//div[text()="Pending"]'));
    SF.sleep(1);
    V.internalCode = SF.randomCifra(10);
    V.decription = SF.randomBukva(6) + '_t';
    SF.send (By.xpath('//textarea[@ng-model="trip.data.details.description"]'), V.decription);
    now = new Date();
    msInDay = 86400000;
    future = new Date(now.getTime() + msInDay * 10);
    options = { month: 'numeric', day: 'numeric', year: 'numeric' };
    V.dateStart = (now.toLocaleDateString('en-US', options));
    V.dateEnd = (future.toLocaleDateString('en-US', options));
    SF.clear(By.xpath('//md-datepicker[@ng-model="trip.data.details.start"]/div/input'));
    SF.send(By.xpath('//md-datepicker[@ng-model="trip.data.details.start"]/div/input'), V.dateStart);
    SF.sleep(1);
    SF.clear(By.xpath('//md-datepicker[@ng-model="trip.data.details.end"]/div/input'));
    SF.send(By.xpath('//md-datepicker[@ng-model="trip.data.details.end"]/div/input'), V.dateEnd);

    SF.sleep(2);
    SF.click(By.xpath('//input[@ng-model="search"]'));
    SF.sleep(2);
    SF.click(By.xpath('//md-select[@ng-model="trip.data.carrier.carrier_id"]'));
    SF.click(By.xpath('//div[text()="'+ V.carrierName +'"]'));
    V.driverPhone = SF.randomCifra(10);
    V.driverName = SF.randomBukva(6) + '_t';
    V.notes = SF.randomBukva(25) + '_t';
    SF.sleep(1);
    SF.send (By.xpath('//input[@ng-model="trip.data.carrier.driver_name"]'), V.driverName);
    SF.send (By.xpath('//input[@ng-model="trip.data.carrier.driver_phone"]'), V.driverPhone);
    SF.send (By.xpath('//textarea[@ng-model="trip.data.note"]'), V.notes);

    condition.nowWeDoing = 'Сохраняем трип и добавляем работу в трип';
    JS.click('span:contains(\\"Update\\")');
    SF.sleep(3);
    JS.click('span:contains(\\"Add Pickup/Delivery\\")');
    SF.sleep(2);
    SF.clear(By.xpath('//md-datepicker[@ng-model="pickupDateFrom"]/div/input'));
    SF.send(By.xpath('//md-datepicker[@ng-model="pickupDateFrom"]/div/input'), V.dateStart);
    SF.sleep(1);
    SF.clear(By.xpath('//md-datepicker[@ng-model="pickupDateTo"]/div/input'));
    SF.send(By.xpath('//md-datepicker[@ng-model="pickupDateTo"]/div/input'), V.dateEnd);
    SF.sleep(2);
    SF.click(By.xpath('//input[@ng-model="search"]'));

    SF.click(By.xpath('//div[contains(text(), "' + V.client.name + '")]/..//md-checkbox[@ng-model="item.a_a_selected"]/div[1]'));
    driver.wait(driver.findElement(By.xpath('//div[contains(text(),"' + V.client.name + '")]/..//div[@ng-click="openRequest(id)"]')).getText().then(function(text){
        V.ldJobId = text;
    }),config.timeout);
    SF.sleep(2);
    JS.click('span:contains(\\"Add requests to trip\\")');
    SF.sleep(6);
    JS.click('span:contains(\\"Closing\\")');
    SF.sleep(3);
    SF.click(By.xpath('//div[@ng-click="showTpCollected(item.job_id, item.balance)"]'));
    SF.sleep(5);
    // SF.click(By.xpath('//button[@ng-click="openCustomPayment($event, 0, item.id, [], 4)"]'));
    V.somePayment = 900;
    SF.clear(By.xpath('//input[@ng-model="payment.amount"]'));
    SF.send(By.xpath('//input[@ng-model="payment.amount"]'), V.somePayment);
    SF.sleep(2);
    SF.click(By.xpath('//button[@ng-click="save()"]'));
    SF.sleep(4);
    SF.click(By.xpath('//button[@ng-click="back()"]'));
    SF.sleep(2);
    JS.click('span:contains(\\"Update\\")');
    SF.sleep(4);

    condition.nowWeDoing = 'Заходим в Агент фолио';
    MF.Board_OpenSideBar ();
    SF.sleep(2);
    SF.click(By.xpath('//a[@ng-click="vm.goToPage(\'lddispatch.trip\', \'\')"]'));
    MF.Board_OpenAgentFolio ();
    MF.Board_OpenSideBar ();
    SF.click(By.xpath('//md-switch[@ng-model="hideZero"]'));
    SF.sleep(2);
    condition.nowWeDoing = 'вибираем карьера, вибираем работи и отправляем инвоис';
    SF.click(By.xpath('//div[text()="'+ V.carrierName +'"]'));
    SF.sleep(2);
    SF.click(By.xpath('//md-checkbox[@ng-model="selectAll"]'));
    SF.sleep(2);
    SF.click(By.xpath('//button[@ng-click="openInvoice($event, charge, false, selectedJobs, total.balance)"]'));
    SF.sleep(2);
    // JS.click('span:contains(\\"Send invoice\\")');
    SF.click(By.xpath('//button[@ng-click="sendInvoice()"]'));
    SF.sleep(4);
    SF.click(By.xpath('//a[@ng-click="save()"]'));
    SF.sleep(2);
    condition.nowWeDoing = 'переходим на страницу просмотра иновоиса и делаем оплату инвоиса';
    SF.click(By.xpath('//md-fab-trigger[@aria-haspopup="true"]'));
    SF.sleep(2);
    SF.click(By.xpath('//ng-md-icon[@icon="remove_red_eye"]'));
    SF.openTab(1);
    SF.waitForVisible(By.xpath('//a[@ng-click="vm.invoicePayment();"]'));
    SF.sleep(4);
    SF.click(By.xpath('//a[@ng-click="vm.invoicePayment();"]'));
    SF.sleep(4);
    LF.InvoiceOnlinePayment();
    SF.openTab(0);
    condition.nowWeDoing = 'Проверяем есть ли в реситах оплачений инвоис';
    SF.sleep(5);
    driver.wait(driver.findElement(By.xpath('//span[contains(text(), "Amount")]/..')).getText().then(function(text){
        V.amount = SF.cleanPrice(text);
    }),config.timeout)
    SF.sleep(3);
    JS.click('span:contains(\\"Receipts\\")');
    SF.sleep(3);
    driver.wait(driver.findElement(By.xpath('//span[contains(text(), "Amount")]/..')).getText().then(function(text){
        V.receiptsAmount = SF.cleanPrice(text);
        VD.IWant(VD.ToEqual, V.amount, V.receiptsAmount, 'не совпали Amount');
    }),config.timeout)
    SF.click(By.xpath('//div[@ng-click="showList(item)"]'));
    condition.nowWeDoing = 'Проверяем есть ли в вкладке Invoices инвоис';
    JS.click('span:contains(\\"Invoices\\")');
    SF.sleep(3);
    driver.wait(driver.findElement(By.xpath('//span[contains(text(), "Amount")]/..')).getText().then(function(text){
        V.invoicesAmount = SF.cleanPrice(text);
        VD.IWant(VD.ToEqual, V.amount, V.invoicesAmount, 'не совпали Amount');
    }),config.timeout)
    SF.click(By.xpath('//div[@ng-click="showList(item)"]'));
    condition.nowWeDoing = 'удаляем инвоис';
    JS.click('span:contains(\\"Payment details\\")');
    SF.sleep(2);
    // SF.click(By.xpath('//md-switch[@ng-change="setHideZero()"]'));
    // SF.sleep(4);
    // SF.click(By.xpath('//md-fab-trigger[@aria-haspopup="true"]'));
    // SF.sleep(2);
    // SF.click(By.xpath('//button[@ng-click="removeInvoice(item.invoice_id)"]'));

    MF.Board_OpenSideBar ();
    MF.Board_OpenCarriersAndAgents ();
    MF.Board_OpenSideBar ();
    SF.sleep(3);
    SF.click(By.xpath('//div[text()="'+ V.carrierName +'"]'));

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