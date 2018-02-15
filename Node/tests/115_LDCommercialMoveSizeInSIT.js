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
   // MF.CreateRequest_SelectServiceType(7);
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
    SF.sleep(5);
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
    SF.sleep(1);
    MF.EditRequest_OpenFuelSurchModal();
    SF.click(By.xpath('//input[@ng-model="request.request_all_data.surcharge_fuel_perc"]'));
    SF.send(By.xpath('//input[@ng-model="request.request_all_data.surcharge_fuel_perc"]'),213);
    SF.click(By.xpath('//button[@ng-click="Apply()"]'));
    SF.sleep(5);
    SF.click(By.xpath('//select[@oldvalue="request.type_from.raw"]/option[@value="3"]'));
    MF.EditRequest_SetAdressToFrom ();
    SF.sleep(1);
    V.boardNumbers = {};
    LF.RememberDigitsRequestBoard(V.boardNumbers);
    JS.step(JSstep.selectTruck((V.boardNumbers.LaborTimeMax + V.boardNumbers.TravelTime)/60));
    MF.WaitWhileBusy();
    SF.sleep(5);
    MF.EditRequest_SetToConfirmed(3);
    MF.EditRequest_SaveChanges();
    LF.closeEditRequest ();

condition.nowWeDoing = 'Открываем реквест заново, проверяем что цифры (Total, Fuel, Additional services) не изменились после закрытия реквеста.';
    MF.Board_OpenConfirmed();
    MF.Board_RefreshDashboard();
    MF.Board_OpenRequest (V.requestNumber.Id);
    V.boardNumbersAfterClose = {};
    LF.RememberDigitsRequestBoard(V.boardNumbersAfterClose);
    VD.IWant(VD.ToEqual, V.boardNumbersAfterClose.Total,V.boardNumbers.Total, 'не совпал Total после закрытия');
    VD.IWant(VD.ToEqual, V.boardNumbersAfterClose.Fuel, V.boardNumbers.Fuel, 'не совпал Fuel после закрытия');
    VD.IWant(VD.ToEqual, V.boardNumbersAfterClose.Packing, V.boardNumbers.Packing, 'не совпал Packing после закрытия');
    VD.IWant(VD.ToEqual, V.boardNumbersAfterClose.AdServices, V.boardNumbers.AdServices, 'не совпал Additional после закрытияг');
    SF.sleep(1);
    LF.closeEditRequest ();

condition.nowWeDoing = 'Выходим с дашборда, логинимся под клиентом, на странице аккаунта и Confirmation page проверяем, что цифры совпали с теми, что мы вводили в дашборде.';
    MF.Board_LogoutAdmin ();
    SF.get(V.accountURL);
    LF.LoginToAccountAsClient (V.client, V.client.passwd);
    MF.Account_OpenRequest(V.boardNumbers.Id);
    MF.Account_ClickViewRequest();
    V.accountNumbersLD={};
    LF.RememberAccountNumbersLD(V.accountNumbersLD);
    SF.sleep(1);
    LF.Validation_Compare_Account_Admin_LongDistance(V.boardNumbersAfterClose, V.accountNumbersLD);
    MF.Account_ClickViewConfirmationPage();
    driver.wait(driver.findElement(By.xpath('//h2[contains(text(),"Grand Total")]/following-sibling::span')).getText().then(function(text){
        V.ConfirmationTotal = SF.cleanPrice(text.substring(text.indexOf('$')));
    }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//span[@ng-if="!!vm.longDistanceServicesTotal"]')).getText().then(function (text) {
        V.ConfirmationServices = SF.cleanPrice(text.substring(text.indexOf('$')));
    }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//span[@ng-if="!!vm.fuelSurcharge"]')).getText().then(function (text) {
        V.ConfirmationFuelSurcharge = SF.cleanPrice(text.substring(text.indexOf('$')));
    }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//span[@ng-if="!!vm.longDistanceQuote"]')).getText().then(function (text) {
        V.ConfirmationQuote = SF.cleanPrice(text.substring(text.indexOf('$')));
    }),config.timeout);
    SF.sleep(1);
    VD.IWant(VD.ToEqual, V.ConfirmationTotal,V.boardNumbersAfterClose.Total, 'не совпал Total c борда');
    VD.IWant(VD.ToEqual, V.ConfirmationServices,V.boardNumbersAfterClose.AdServices, 'не совпал Additional c борда');
    VD.IWant(VD.ToEqual, V.ConfirmationFuelSurcharge,V.boardNumbersAfterClose.Fuel, 'не совпал Fuel c борда');
    VD.IWant(VD.ToEqual, V.ConfirmationQuote,V.boardNumbersAfterClose.Quote, 'не совпал Quote c борда');
    MF.Account_ConfirmationBackToRequest();

condition.nowWeDoing = 'В аккаунте удаляем весь инвентарь, проверяем что cubic feet стал дефолтным.';
    MF.Account_ClickInventoryOpenTab();
    //потом написать функцию на удаление инвентаря
    SF.click (By.xpath('//div[@class="inventory__item"]//button[@ng-click="onClickCounter(-1)"]'));
    SF.click (By.xpath('//div[@class="inventory__item"]//button[@ng-click="onClickCounter(-1)"]'));
    SF.click (By.xpath('//div[@class="inventory__item"]//button[@ng-click="onClickCounter(-1)"]'));
    SF.click (By.xpath('//div[@class="inventory__item"]//button[@ng-click="onClickCounter(-1)"]'));
    SF.click (By.xpath('//div[@class="inventory__item"]//button[@ng-click="onClickCounter(-1)"]'));
    SF.click (By.xpath('//div[@class="inventory__item"]//button[@ng-click="onClickCounter(-1)"]'));
    SF.click (By.xpath('//div[@class="inventory__item"]//button[@ng-click="onClickCounter(-1)"]'));
    SF.click (By.xpath('//div[@class="inventory__item"]//button[@ng-click="onClickCounter(-1)"]'));
    SF.click (By.xpath('//div[@class="inventory__item"]//button[@ng-click="onClickCounter(-1)"]'));
    MF.Account_ClickSaveInventory();
    MF.Account_WaitForLoadingAccount();
    driver.wait(driver.findElement(By.xpath('//div[contains(text(),"Move Size")]/following-sibling::div[2]/div')).getText().then(function(text){
        V.accountcbf = SF.cleanPrice(text.substring(text.indexOf('100 Offices and 1000 employees ')+18, text.indexOf('c.f.')));
        console.log(V.accountcbf);
    }),config.timeout);
    SF.sleep(0.5);
    VD.IWant(VD.ToEqual, V.defaultcbf, V.accountcbf, 'cubic feet не ушел в дефолтный после удаления инвентаря');
    LF.LogoutFromAccount();

condition.nowWeDoing = 'Возвращаемся на дашборд и проверяем что cubic feet стал дефолтным. В табе Sales меняем Fuel, добавляем Packing и Discount.';
    SF.get(V.adminURL);
    LF.LoginToBoardAsCustom(V.adminLogin,V.adminPassword);
    MF.Board_OpenConfirmed();
    MF.Board_OpenRequest (V.requestNumber.Id);
    driver.wait(driver.findElement(By.xpath('//span[@ng-if="!states.invoiceState"]')).getText().then(function (text) {
        VD.IWant(VD.ToEqual, text, '1500', 'проверяем, что вес дефолтный')
    }),config.timeout);
    MF.EditRequest_OpenFuelSurchModal();
    SF.click(By.xpath('//input[@ng-model="request.request_all_data.surcharge_fuel_perc"]'));
    SF.send(By.xpath('//input[@ng-model="request.request_all_data.surcharge_fuel_perc"]'),222);
    SF.click(By.xpath('//button[@ng-click="Apply()"]'));
    MF.WaitWhileToaster();
    SF.sleep(10);
    MF.EditRequest_OpenDiscountModal();
    MF.EditRequest_SendMoneyDiscount(30);
    MF.EditRequest_AddPacking();
    SF.sleep(2);

condition.nowWeDoing = 'Запоминаем суммы. Переводим работу в Closing, добавляем работу в SIT. Сохраняем, закрываем реквест и идём в Jobs in SIT проверять, что реквест добавлен в SIT.';
    SF.click(By.xpath('//div[@ng-click="changeSalesClosingTab(\'closing\')"]'));
    SF.waitForVisible (By.xpath('//a[@ng-click="openSendRequestToSITModal()"]'));
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
    SF.sleep(1);
    V.boardNumbersAfterSIT = {};
    LF.RememberDigitsRequestBoard_Down(V.boardNumbersAfterSIT);
    LF.closeEditRequest();
    MF.Board_OpenSideBar();
    MF.Board_OpenJobsInSIT();
    SF.sleep(1);
    driver.wait(driver.findElement(By.xpath('//div[@ng-click="openRequest(id)"][contains(text(),"' + V.requestNumber.Id  + '")]')).getText().then(function(text){
        VD.IWant(VD.ToEqual, text, V.requestNumber.Id, 'не найден реквест в Jobs in SIT')
    }),config.timeout);

condition.nowWeDoing = 'Заходим в Trip-Planner, создаём трип (Type: Carrier/Agent) и добавляем в трип наш реквест.';
    MF.Board_OpenSideBar ();
    MF.Board_OpenCourier ();//Создаем Carrier
    MF.Board_OpenSideBar ();
    LF.CreateCarrier();
    MF.Board_OpenSideBar ();
    MF.Board_OpenTripPlanner();
    MF.SIT_ClickAddTrip();
    SF.sleep(2);
    MF.SIT_ChangeStatusTrip('Pending');
    V.internalCode = SF.randomCifra(10);
    V.decription = SF.randomBukva(6) + '_t';
    V.driver = SF.randomBukva(6);
    V.driverPhone = SF.randomCifra(10);
    SF.send (By.xpath('//textarea[@ng-model="trip.data.details.description"]'), V.decription);
    SF.send (By.xpath('//input[@ng-model="trip.data.details.internal_code"]'), V.internalCode);
    SF.sleep(3);
    SF.click(By.xpath('//md-select[@ng-model="carrierId"]'));
    SF.click(By.xpath('//div[text()="'+ V.carrierNew.name +'"]'));
    SF.sleep(1);
    SF.send (By.xpath('//input[@ng-model="trip.data.carrier.driver_name"]'), V.driver);
    SF.send (By.xpath('//input[@ng-model="trip.data.carrier.driver_phone"]'), V.driverPhone);
    JS.click('span:contains(\\"Add Pickup/Delivery\\")');
    MF.WaitWhileBusy();
    SF.click(By.xpath('//div[contains(text(), "' + V.client.name + '")]/..//md-checkbox[@ng-model="item.a_a_selected"]/div[1]'));
    JS.click('span:contains(\\"Add requests to trip\\")');
    SF.sleep(2);

condition.nowWeDoing = 'Идём обратно в дашборд, открываем реквест и проверяем, что цифры в Closing (Total, Fuel, Ad.Services, Packing, Discount) не изменились после добавления реквеста в трип.';
    MF.Board_OpenSideBar();
    MF.Board_OpenDashboard();
    MF.Board_OpenConfirmed();
    MF.Board_OpenRequest (V.requestNumber.Id);
    SF.sleep(1);
    V.boardNumbersAfterTrip = {};
    LF.RememberDigitsRequestBoard_Down (V.boardNumbersAfterTrip);
    VD.IWant(VD.ToEqual, V.boardNumbersAfterTrip.Total,V.boardNumbersAfterSIT.Total, 'не совпал Total после добавления реквеста в трип');
    VD.IWant(VD.ToEqual, V.boardNumbersAfterTrip.Fuel, V.boardNumbersAfterSIT.Fuel, 'не совпал Total после добавления реквеста в трип');
    VD.IWant(VD.ToEqual, V.boardNumbersAfterTrip.Packing, V.boardNumbersAfterSIT.Packing, 'не совпал Total после добавления реквеста в трип');
    VD.IWant(VD.ToEqual, V.boardNumbersAfterTrip.AdServices, V.boardNumbersAfterSIT.AdServices, 'не совпал Total после добавления реквеста в трип');
    SF.sleep(2);

condition.nowWeDoing = 'Меняем цифры опять, выходим из реквеста';
    SF.click(By.xpath('//div[@ng-click="changeSalesClosingTab(\'sales\')"]'));
    MF.EditRequest_AddPacking();
    MF.EditRequest_OpenDiscountModal();
    MF.EditRequest_SendMoneyDiscount(20);
    SF.click(By.xpath('//div[@ng-click="changeSalesClosingTab(\'closing\')"]'));
    SF.sleep(2);
    V.boardNumbersAfterTrip2 = {};
    LF.RememberDigitsRequestBoard_Down (V.boardNumbersAfterTrip2);
    LF.closeEditRequest ();

condition.nowWeDoing = 'Заходим в этот реквест из трипа, сверяем';
    MF.Board_OpenSideBar();
    MF.Board_ClickLongDistanceDispach();
    MF.Board_OpenJobsInSIT();
    driver.wait(driver.findElement(By.xpath('//div[@ng-click="openRequest(id)"][contains(text(),"' + V.requestNumber.Id  + '")]')).click(), config.timeout);
    MF.EditRequest_WaitForBalanceVisible();
    SF.sleep(2);
    V.boardNumbersFromTrip = {};
    LF.RememberDigitsRequestBoard_Down (V.boardNumbersFromTrip);
    console.log(V.boardNumbersFromTrip);
    SF.sleep(2);
    VD.IWant(VD.ToEqual, V.boardNumbersFromTrip.Total,V.boardNumbersAfterTrip2.Total, 'не совпал Total в трипе после изменений в дашборде');
    VD.IWant(VD.ToEqual, V.boardNumbersFromTrip.Fuel, V.boardNumbersAfterTrip2.Fuel, 'не совпал Fuel в трипе после изменений в дашборде');
    VD.IWant(VD.ToEqual, V.boardNumbersFromTrip.Packing, V.boardNumbersAfterTrip2.Packing, 'не совпал Packing в трипе после изменений в дашборде');
    VD.IWant(VD.ToEqual, V.boardNumbersFromTrip.AdServices, V.boardNumbersAfterTrip2.AdServices, 'не совпал Additional в трипе после изменений в дашборде');
    SF.sleep(1);
    //=========================закончили писать тест=============================
    SF.endOfTest();
};