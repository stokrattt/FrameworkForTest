module.exports = function main(SF, JS, MF, LF, JSstep, VD, V, By, until,FileDetector, system, condition, config,constants) {
    global.fiber = Fiber.current;
    V.client = {};
    V.client.name = SF.randomBukva(6) + '_t';
    V.client.fam = SF.randomBukva(6) + '_t';
    V.client.phone = SF.randomCifra(10);
    V.client.email = SF.randomBukvaSmall(6) + '@' + SF.randomBukvaSmall(4) + '.tes';
    V.client.passwd = 123;

    //=========================начинаем писать тест=============================
condition.nowWeDoing = 'В дашборде (через Create Request) создаем Long Distance реквест, при создании выбираем Size of Move: Commercial Move, запоминаем cubic feet и выбираем этажи.';
    SF.get(V.adminURL);
    LF.LoginToBoardAsCustom(V.adminLogin,V.adminPassword);
    MF.Board_ClickCreate();
    MF.CreateRequest_ClickMoveDateInput();
    V.request = {};
    driver.wait(driver.executeScript(JSstep.Click4DaysCalendar).then(function (calDate) {
        V.request.moveDate = calDate;
    }),config.timeout);
    SF.sleep(0.5);
    SF.click(By.xpath('//select[@ng-model="editrequest.data.field_size_of_move"]/option[@value="number:11"]'));
    SF.click(By.xpath('//oi-select[@ng-model="commercialSize"]'));
    SF.click(By.xpath('//oi-select[@ng-model="commercialSize"]/div[2]//li[1]'));
    SF.click(By.xpath('//select[@id="edit-type-from"]/option[@value="string:2"]'));
    SF.click(By.xpath('//select[@id="edit-type-to"]/option[@value="string:2"]'));
    MF.CreateRequest_SendZipToZipFrom ('02032', '90001');
    SF.sleep(2);
    MF.CreateRequest_ClickCalculate();
    MF.CreateRequest_ClickContinue();
    MF.CreateRequest_SendClientInfo(V.client);
    MF.CreateRequest_ClickCreate();

condition.nowWeDoing = 'Добавляем инвентарь, меняем Fuel и этажи, ставим статус Confirmed. Запоминаем данные (Total, Fuel, AdServices), сохраянем изменения и закрываем реквест';
    V.requestNumber={};
    MF.EditRequest_RememberId(V.requestNumber);
    SF.sleep(0.5);
    driver.wait(driver.findElement(By.xpath('//span[contains(text(),"c.f.")]/preceding-sibling::span[1]')).getText().then(function(text){
        V.defaultcbf = SF.cleanPrice(text.substring(text.indexOf('$')));
    }),config.timeout);
    SF.sleep(0.5);
    MF.EditRequest_OpenClient();
    LF.SetClientPasswd(V.client.passwd);
    LF.addInventoryBoard();
    MF.EditRequest_OpenRequest();
    SF.waitForVisible(By.xpath('//label[@ng-click="OpenSurchargeModal();"]'));
    MF.EditRequest_OpenFuelSurchModal();
    SF.click(By.xpath('//input[@ng-model="request.request_all_data.surcharge_fuel_perc"]'));
    SF.send(By.xpath('//input[@ng-model="request.request_all_data.surcharge_fuel_perc"]'),213);
    MF.EditRequest_ClickApplyInFuelWindow();
    SF.click(By.xpath('//select[@oldvalue="request.type_from.raw"]/option[@value="3"]'));//меняем этаж
    MF.EditRequest_SetAdressToFrom ();
    SF.sleep(1);
    V.boardNumbers = {};
    LF.RememberDigitsRequestBoard(V.boardNumbers);
    JS.step(JSstep.selectTruck((V.boardNumbers.LaborTimeMax + V.boardNumbers.TravelTime)/60));
    MF.WaitWhileBusy();
    MF.EditRequest_SetToConfirmed();
    MF.EditRequest_SaveChanges();
    LF.closeEditRequest ();

condition.nowWeDoing = 'Открываем реквест заново, проверяем что цифры (Total, Fuel, Additional services) не изменились после закрытия реквеста.';
    MF.Board_OpenConfirmed();
    MF.Board_RefreshDashboard();
    MF.Board_OpenRequest (V.requestNumber.Id);
    V.boardNumbersAfterClose = {};
    LF.RememberDigitsRequestBoard(V.boardNumbersAfterClose);
    VD.IWant(VD.ToEqual, V.boardNumbersAfterClose.Total,V.boardNumbers.Total, 'не совпал Total после закрытия реквеста');
    VD.IWant(VD.ToEqual, V.boardNumbersAfterClose.Fuel, V.boardNumbers.Fuel, 'не совпал Fuel после закрытия реквеста');
    VD.IWant(VD.ToEqual, V.boardNumbersAfterClose.Packing, V.boardNumbers.Packing, 'не совпал Packing после закрытия реквеста');
    VD.IWant(VD.ToEqual, V.boardNumbersAfterClose.AdServices, V.boardNumbers.AdServices, 'не совпал Additional после закрытия реквеста');
    LF.closeEditRequest ();

condition.nowWeDoing = 'Выходим с дашборда, логинимся под клиентом, на странице аккаунта и Confirmation page проверяем, что цифры совпали с теми, что мы вводили в дашборде.';
    MF.Board_LogoutAdmin ();
    SF.get(V.accountURL);
    LF.LoginToAccountAsClient (V.client, V.client.passwd);
    MF.Account_OpenRequest(V.boardNumbers.Id);
    MF.Account_ClickViewRequest();
    V.accountNumbersLD={};
    LF.RememberAccountNumbersLD(V.accountNumbersLD);
    LF.Validation_Compare_Account_Admin_LongDistance(V.boardNumbersAfterClose, V.accountNumbersLD);
    MF.Account_ClickViewConfirmationPage();
    driver.wait(driver.findElement(By.xpath('//h2[contains(text(),"Grand Total")]/following-sibling::span')).getText().then(function(text){
        text = SF.cleanPrice(text.substring(text.indexOf('$')));
        VD.IWant(VD.ToEqual, text,V.boardNumbersAfterClose.Total, 'не совпал Total на Confirmation Page с Total в дашборде');
    }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//span[@ng-if="!!vm.longDistanceServicesTotal"]')).getText().then(function (text) {
        text = SF.cleanPrice(text.substring(text.indexOf('$')));
        VD.IWant(VD.ToEqual, text,V.boardNumbersAfterClose.AdServices, 'не совпал AddServices на Confirmation Page с AddServices в дашборде');
    }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//span[@ng-if="!!vm.fuelSurcharge"]')).getText().then(function (text) {
        text = SF.cleanPrice(text.substring(text.indexOf('$')));
        VD.IWant(VD.ToEqual, text,V.boardNumbersAfterClose.Fuel, 'не совпал Fuel на Confirmation Page с Fuel в дашборде');
    }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//span[@ng-if="!!vm.longDistanceQuote"]')).getText().then(function (text) {
        text = SF.cleanPrice(text.substring(text.indexOf('$')));
        VD.IWant(VD.ToEqual, text,V.boardNumbersAfterClose.Quote, 'не совпал Quote на Confirmation Page c Quote в дашборде');
    }),config.timeout);
    MF.Account_ConfirmationBackToRequest();

condition.nowWeDoing = 'В аккаунте удаляем весь инвентарь, проверяем что cubic feet стал дефолтным.';
    MF.Account_ClickInventoryOpenTab();
    SF.click (By.xpath('//div[@class="new-inventory-item__col"]//button[@ng-click="onClickCounter(-1)"]'));
    SF.click (By.xpath('//div[@class="new-inventory-item__col"]//button[@ng-click="onClickCounter(-1)"]'));
    SF.click (By.xpath('//div[@class="new-inventory-item__col"]//button[@ng-click="onClickCounter(-1)"]'));
    SF.click (By.xpath('//div[@class="new-inventory-item__col"]//button[@ng-click="onClickCounter(-1)"]'));
    SF.click (By.xpath('//div[@class="new-inventory-item__col"]//button[@ng-click="onClickCounter(-1)"]'));
    SF.click (By.xpath('//div[@class="new-inventory-item__col"]//button[@ng-click="onClickCounter(-1)"]'));
    SF.click (By.xpath('//div[@class="new-inventory-item__col"]//button[@ng-click="onClickCounter(-1)"]'));
    SF.click (By.xpath('//div[@class="new-inventory-item__col"]//button[@ng-click="onClickCounter(-1)"]'));
    SF.click (By.xpath('//div[@class="new-inventory-item__col"]//button[@ng-click="onClickCounter(-1)"]'));
    MF.Account_ClickSaveInventory();
    MF.Account_WaitForLoadingAccount();
    SF.sleep(5);
    SF.waitForLocated (By.xpath('//div[contains(text(),"Move Size")]'));
    driver.wait(driver.findElement(By.xpath('//div[contains(text(),"Move Size")]/following-sibling::div[2]/div')).getText().then(function(text){
        V.accountcbf = SF.cleanPrice(text.substring(text.indexOf('100 Offices and 1000 employees ')+17, text.indexOf('c.f.')));
        console.log(V.accountcbf);
        VD.IWant(VD.ToEqual, V.defaultcbf, V.accountcbf, 'Cubic feet не ушел в дефолтные 1500 после удаления инвентаря на аккаунте');
    }),config.timeout);
    Debug.pause();
    LF.LogoutFromAccount();

condition.nowWeDoing = 'Возвращаемся на дашборд и проверяем что cubic feet стал дефолтным. В табе Sales меняем Fuel, добавляем Packing и Discount, запоминаем эти изменения';
    SF.get(V.adminURL);
    LF.LoginToBoardAsCustom(V.adminLogin,V.adminPassword);
    MF.Board_OpenConfirmed();
    MF.Board_OpenRequest (V.requestNumber.Id);
    Debug.pause();
    driver.wait(driver.findElement(By.xpath('//span[@ng-if="!states.invoiceState"]')).getText().then(function (text) {
        VD.IWant(VD.ToEqual, text, '1500', 'Cubic feet на дашборде не вернулся к дефолтному значению в 1500 после удаления инвентаря на аккаунте')
    }),config.timeout);
    MF.EditRequest_OpenFuelSurchModal();
    SF.click(By.xpath('//input[@ng-model="request.request_all_data.surcharge_fuel_perc"]'));
    SF.send(By.xpath('//input[@ng-model="request.request_all_data.surcharge_fuel_perc"]'),222);
    MF.EditRequest_ClickApplyInFuelWindow();
    MF.EditRequest_OpenDiscountModal();
    MF.EditRequest_SendMoneyDiscount(30);
    MF.EditRequest_AddPacking();
    V.boardNumbersBeforeSITSales = {};
    LF.RememberDigitsRequestBoard_Down (V.boardNumbersBeforeSITSales);

condition.nowWeDoing = 'Переводим работу в Closing, проверяем чтобы все цифры сходились с теми что были в Sales, добавляем работу в SIT. Сохраняем, закрываем реквест и идём в Jobs in SIT проверять, что реквест добавлен в SIT.';
    MF.EditRequest_CloseConfirmWork();
    V.boardNumbersBeforeSITClosing = {};
    LF.RememberDigitsRequestBoard_Down (V.boardNumbersBeforeSITClosing);
    VD.IWant(VD.ToEqual, V.boardNumbersBeforeSITSales.Total,V.boardNumbersBeforeSITClosing.Total, 'не совпал Total после перевода реквеста с Sales в Closing');
    VD.IWant(VD.ToEqual, V.boardNumbersBeforeSITSales.Fuel, V.boardNumbersBeforeSITClosing.Fuel, 'не совпал Fuel  после перевода реквеста с Sales в Closing');
    VD.IWant(VD.ToEqual, V.boardNumbersBeforeSITSales.Packing, V.boardNumbersBeforeSITClosing.Packing, 'не совпал Packing  после перевода реквеста с Sales в Closing');
    VD.IWant(VD.ToEqual, V.boardNumbersBeforeSITSales.AdServices, V.boardNumbersBeforeSITClosing.AdServices, 'не совпал AdServices после перевода реквеста с Sales в Closing');
    SF.click(By.xpath('//a[@ng-click="openSendRequestToSITModal()"]'));
    MF.WaitWhileBusy();
    SF.click(By.xpath('//select[@ng-model="sit.storage_id"]'));
    SF.click(By.xpath('//option[text()="test"]'));
    V.SITRooms = 1;
    SF.clear(By.xpath('//input[@ng-model="sit.rooms"]'));
    SF.send(By.xpath('//input[@ng-model="sit.rooms"]'), V.SITRooms);
    SF.clear(By.xpath('//input[@ng-model="moveInDate"]'));
    SF.send(By.xpath('//input[@ng-model="moveInDate"]'),SF.dateToStringMMMDDYYYY(V.request.moveDate));
    SF.click(By.xpath('//a[@ng-click="save()"]'));
    LF.closeEditRequest();
    MF.Board_OpenSideBar();
    MF.Board_OpenJobsInSIT();
    driver.wait(driver.findElement(By.xpath('//div[@ng-click="openRequest(id)"][contains(text(),"' + V.requestNumber.Id  + '")]')).getText().then(function(text){
        VD.IWant(VD.ToEqual, text, V.requestNumber.Id, 'не найден реквест в Jobs in SIT')
    }),config.timeout);

condition.nowWeDoing = 'Создаём Carrier, заходим в Trip-Planner, создаём трип (Type: Carrier/Agent).';
    MF.Board_OpenSideBar ();
    MF.Board_OpenCourier ();//Создаем Carrier
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
    MF.Board_OpenSideBar ();
    MF.Board_ClickLongDistanceDispach();
    MF.Board_OpenTripPlanner();
    MF.SIT_ClickAddTrip();
    SF.waitForVisible(By.xpath('//div[@class="trip-create-modal-form__form"]'));
    MF.SIT_ChangeStatusTrip('Pending');
    V.internalCode = SF.randomCifra(10);
    V.decription = SF.randomBukva(6) + '_t';
    V.driver = SF.randomBukva(6);
    V.driverPhone = SF.randomCifra(10);
    SF.send (By.xpath('//textarea[@ng-model="trip.data.details.description"]'), V.decription);
    SF.send (By.xpath('//input[@ng-model="trip.data.details.internal_code"]'), V.internalCode);
    SF.click(By.xpath('//md-select[@ng-model="carrierId"]'));
    SF.waitForVisible(By.xpath('//div[text()="'+ V.carrierNew.name +'"]'));
    SF.click(By.xpath('//div[text()="'+ V.carrierNew.name +'"]'));
    SF.send (By.xpath('//input[@ng-model="trip.data.carrier.driver_name"]'), V.driver);
    SF.send (By.xpath('//input[@ng-model="trip.data.carrier.driver_phone"]'), V.driverPhone);
    MF.WaitWhileToaster();

condition.nowWeDoing = 'Открываем реквест в Trip-Planner. Меняем Additional Services, Fuel, Packing. Запоминаем эти изменения.';
    JS.click('span:contains(\\"Add Pickup/Delivery\\")');
    MF.WaitWhileBusy();
    driver.wait(driver.findElement(By.xpath('//div[@ng-click="openRequest(id)"][contains(text(),"' + V.requestNumber.Id  + '")]')).click(), config.timeout);
    SF.click(By.xpath('//label[@ng-click="OpenSurchargeInvoiceModal();"]'));
    SF.waitForVisible(By.xpath('//input[@ng-model="invoice.request_all_data.surcharge_fuel"]'));
    SF.click(By.xpath('//input[@ng-model="invoice.request_all_data.surcharge_fuel"]'));
    SF.send(By.xpath('//input[@ng-model="invoice.request_all_data.surcharge_fuel"]'),300);
    SF.click(By.xpath('//button[@ng-click="Apply()"]'));
    SF.waitForVisible(By.xpath('//div[@class="toast toast-success"]'));
    SF.sleep(1);
    SF.click(By.xpath('//label[@ng-click="openAddPackingInvoiceModal();"]'));
    SF.waitForVisible (By.xpath('//li[@ng-click="addExtraCharges(extra_charge)"][1]'));
    SF.click(By.xpath('//li[@ng-click="addExtraCharges(extra_charge)"][1]'));
    SF.click(By.xpath('//li[@ng-click="addExtraCharges(extra_charge)"][2]'));
    SF.click(By.xpath('//li[@ng-click="addExtraCharges(extra_charge)"][3]'));
    SF.click(By.xpath('//button[@ng-click="save()"]'));
    MF.WaitWhileToaster();
    SF.click(By.xpath('//label[@ng-click="OpenDiscountInvoiceModal();"]'));
    SF.waitForLocated (By.xpath('//button[@ng-click="openCouponModal()"]'));
    SF.sleep(2);
    SF.click(By.xpath('//input[@ng-model="invoice.request_all_data.add_money_discount"]'));
    SF.send(By.xpath('//input[@ng-model="invoice.request_all_data.add_money_discount"]'), 180);
    SF.click(By.xpath('//input[@ng-model="invoice.request_all_data.add_percent_discount"]'));
    SF.click(By.xpath('//button[@ng-click="Apply()"]'));
    MF.SweetConfirm ();
    SF.waitForVisible(By.xpath('//div[@class="toast-message"]'));
    V.boardNumbersBeforeAddToTrip = {};
    LF.RememberDigitsRequestBoard_Down (V.boardNumbersBeforeAddToTrip);
    LF.closeEditRequest ();

condition.nowWeDoing = 'Добавляем реквест в трип. Проверямем, что Discount, Fuel, Packing и AdServices не изменились после добавления работы в трип. Проверяем, что баланс реквеста равен 0.';
    SF.click(By.xpath('//div[contains(text(), "' + V.client.name + '")]/..//md-checkbox[@ng-model="item.a_a_selected"]/div[1]'));
    JS.click('span:contains(\\"Add requests to trip\\")');
    SF.click(By.xpath('//button[@ng-click="getJobs()"]'));
    SF.waitForNotVisible(By.xpath('//div[@class="md-toast-content"]'));
    driver.wait(driver.findElement(By.xpath('//div[@ng-click="openRequest(id)"][contains(text(),"' + V.requestNumber.Id  + '")]')).click(), config.timeout);
    MF.EditRequest_WaitForBalanceVisible();
    V.boardNumbersAddedToTrip = {};
    LF.RememberDigitsRequestBoard_Down (V.boardNumbersAddedToTrip);
    console.log(V.boardNumbersAddedToTrip);
    VD.IWant(VD.ToEqual, V.boardNumbersBeforeAddToTrip.Discount, V.boardNumbersAddedToTrip.Discount, 'не совпал Discount после добавления работы в трип');
    VD.IWant(VD.ToEqual, V.boardNumbersBeforeAddToTrip.Fuel, V.boardNumbersAddedToTrip.Fuel, 'не совпал Fuel  после после добавления работы в трип');
    VD.IWant(VD.ToEqual, V.boardNumbersBeforeAddToTrip.Packing, V.boardNumbersAddedToTrip.Packing, 'не совпал Packing  после добавления работы в трип');
    VD.IWant(VD.ToEqual, V.boardNumbersBeforeAddToTrip.AdServices, V.boardNumbersAddedToTrip.AdServices, 'не совпал AdServices после добавления работы в трип');
    VD.IWant(VD.ToEqual, V.boardNumbersAddedToTrip.Balance,'0', 'Balance в реквесте не равен 0 после добавления работы в трип');
    MF.EditRequest_OpenPayment();
    driver.wait(driver.findElement(By.xpath('//tr[@ng-click="prepareToDelete($index, receipt.id)"]/td[4]')).getText().then(function(text){
        text = SF.cleanPrice(text.substring(text.indexOf('$')));
        VD.IWant (VD.ToEqual, text, V.boardNumbersAddedToTrip.Payment, 'В payment реквеста ресит TP Collected не равен TP Collected в трипе')
    }),config.timeout);
    MF.EditRequest_ClosePayment();
    LF.closeEditRequest ();

condition.nowWeDoing = 'Сравниваем Balance и TP collected трипа с тоталом и пейментом в реквесте';
    driver.wait(driver.findElement(By.xpath('//div[@class="big-form__jobs-list__body"]//div[15]')).getText().then(function(text){
        text = SF.cleanPrice(text.substring(text.indexOf('$')));
        VD.IWant(VD.ToEqual, text,V.boardNumbersAddedToTrip.Total, 'не совпад Balance в трипе и реквесте');
    }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//div[@class="big-form__jobs-list__body"]//div[14]')).getText().then(function(text){
        V.TPCollected = SF.cleanPrice(text.substring(text.indexOf('$')));
        VD.IWant(VD.ToEqual, V.TPCollected,V.boardNumbersAddedToTrip.Payment, 'не совпад Total paid в трипе и реквесте');
    }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//div[@class="big-form__jobs-list__body"]//div[13]')).getText().then(function(text){
        text = SF.cleanPrice(text.substring(text.indexOf('$')));
        VD.IWant(VD.ToEqual, text,V.boardNumbersAddedToTrip.Balance, 'не совпад Job total в трипе и реквесте');
    }),config.timeout);
    SF.sleep(1);
    SF.endOfTest();
};