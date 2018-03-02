module.exports = function main(SF, JS, MF, LF, JSstep, VD, V, By, until,FileDetector, system, condition, config,constants) {
    global.fiber = Fiber.current;
    V.client = {};
    V.client.name = SF.randomBukva(6) + '_t';
    V.client.fam = SF.randomBukva(6) + '_t';
    V.client.phone = SF.randomCifra(10);
    V.client.email = SF.randomBukvaSmall(6) + '@' + SF.randomBukvaSmall(4) + '.tes';
    V.client.passwd = 123;
    V.client.zipFrom = '02222';
    V.client.zipTo = '84004';

    SF.get(V.adminURL);
    LF.LoginToBoardAsCustom(V.adminLogin,V.adminPassword);

condition.nowWeDoing = 'Создаем Long Distance работу, добавляем ее в SIT';
    LF.CreateLongDistanceFromBoard(V.client);
    V.requestNumber={};
    MF.EditRequest_RememberId(V.requestNumber);
    MF.EditRequest_SetToConfirmed();
    MF.FrontSiteSmallCalc_SelectServiceType(7);
    SF.select(By.xpath('//select[@ng-model="request.ld_status"]'), 1);
    SF.sleep(1);
    JS.step(JSstep.selectTruck(5));
    MF.WaitWhileBusy();
    MF.EditRequest_SetAdressToFrom ();
    MF.EditRequest_SaveChanges();
    V.boardNumbers = {};
    MF.EditRequest_CloseConfirmWork ();
    SF.click(By.xpath('//a[@ng-click="openSendRequestToSITModal()"]'));
    V.SITRooms = 3;
    SF.clear(By.xpath('//input[@ng-model="sit.rooms"]'));
    SF.send(By.xpath('//input[@ng-model="sit.rooms"]'), V.SITRooms);
    SF.clear(By.xpath('//input[@ng-model="moveInDate"]'));
    SF.send(By.xpath('//input[@ng-model="moveInDate"]'),SF.dateToStringMMMDDYYYY(V.request.moveDate));
    SF.click(By.xpath('//a[@ng-click="save()"]'));

condition.nowWeDoing = 'добавляем адишенал, типсы, делаем проплату в клоузинге';
    SF.click(By.xpath('//input[@ng-model="tips.value"]'));
    SF.send(By.xpath('//input[@ng-model="tips.value"]'),50);
    SF.sleep(3);
    MF.EditRequest_AddAdditionalServClosingTab();
    SF.click(By.xpath('//label[@ng-click="OpenSurchargeInvoiceModal();"]'));
    SF.click(By.xpath('//input[@ng-model="invoice.request_all_data.surcharge_fuel"]'));
    SF.clear(By.xpath('//input[@ng-model="invoice.request_all_data.surcharge_fuel"]'));
    SF.send(By.xpath('//input[@ng-model="invoice.request_all_data.surcharge_fuel"]'),200);
    MF.EditRequest_ClickApplyInFuelWindow();
    V.boardNumbersClosingTab1 = {};
    LF.RememberDigitsRequestBoard_Down (V.boardNumbersClosingTab1);
    MF.EditRequest_SaveChangesClosingTab();
    LF.closeEditRequest ();

condition.nowWeDoing = 'идем заново в реквест сверяем цифры на клоузинге, делаем проплату';
    MF.Board_OpenConfirmed();
    MF.Board_RefreshDashboard();
    MF.Board_OpenRequest (V.requestNumber.Id);
    MF.EditRequest_CloseConfirmWork();
    V.boardNumbersClosingAfterClosedRequest = {};
    LF.RememberDigitsRequestBoard_Down (V.boardNumbersClosingAfterClosedRequest);
    VD.IWant(VD.ToEqual, V.boardNumbersClosingAfterClosedRequest.Total,V.boardNumbersClosingTab1.Total, 'не совпал Total после закрытия');
    VD.IWant(VD.ToEqual, V.boardNumbersClosingAfterClosedRequest.Fuel, V.boardNumbersClosingTab1.Fuel, 'не совпал Fuel после закрытия');
    VD.IWant(VD.ToEqual, V.boardNumbersClosingAfterClosedRequest.Packing, V.boardNumbersClosingTab1.Packing, 'не совпал Packing после закрытия');
    VD.IWant(VD.ToEqual, V.boardNumbersClosingAfterClosedRequest.AdServices, V.boardNumbersClosingTab1.AdServices, 'не совпал Additional после закрытияг');
    VD.IWant(VD.ToEqual, V.boardNumbersClosingAfterClosedRequest.Tips, V.boardNumbersClosingTab1.Tips, 'не совпали Tips после закрытия');
    SF.sleep(1);
    MF.EditRequest_OpenPayment();
    MF.EditRequest_ClickAddCustomPayment();
    V.cashPayment = 100;
    SF.clear(By.xpath('//input[@ng-model="receipt.amount"]'));
    SF.send(By.xpath('//input[@ng-model="receipt.amount"]'), V.cashPayment);
    SF.click(By.xpath('//button[@ng-click="Save()"]'));
    SF.waitForLocated (By.xpath('//input[@ng-model="receipt.account_number"]'));
    MF.WaitWhileBusy();
    JS.click('button[ng-click=\\"save()\\"]:visible');
    V.boardNumbersClosingAfterPaymentInRequest = {};
    LF.RememberDigitsRequestBoard_Down (V.boardNumbersClosingAfterPaymentInRequest);
    LF.closeEditRequest ();

condition.nowWeDoing = 'идем в SIT создаем трип, добавляем в него наш реквест';
    MF.Board_OpenSideBar();
    MF.Board_ClickLongDistanceDispach();
    MF.Board_OpenTripPlanner();
    MF.Board_OpenSideBar();
    MF.SIT_ClickAddTrip();
    SF.sleep(2);
    MF.SIT_ChangeStatusTrip('Pending');
    SF.click(By.xpath('//md-select[@ng-model="type"]'));
    SF.waitForVisible (By.xpath('//div[text()="Foreman/Helper"]'));
    SF.click(By.xpath('//div[text()="Foreman/Helper"]'));
    V.internalCode = SF.randomCifra(10);
    V.decription = SF.randomBukva(6) + '_t';
    SF.send (By.xpath('//textarea[@ng-model="trip.data.details.description"]'), V.decription);
    SF.send (By.xpath('//input[@ng-model="trip.data.details.internal_code"]'), V.internalCode);
    SF.sleep(3);
    SF.click(By.xpath('//md-select[@ng-model="trip.data.foreman"]'));
    SF.waitForVisible (By.xpath('//div[text()="'+V.foremanName+'"]'));
    SF.click(By.xpath('//div[text()="'+V.foremanName+'"]'));
    SF.sleep(1);
    SF.click(By.xpath('//md-select[@ng-model="trip.data.helper"]'));
    SF.waitForVisible (By.xpath('//div[text()="helper test1"]'));
    SF.click(By.xpath('//div[text()="helper test1"]'));
    SF.click(By.xpath('//div[text()="helper test2"]'));
    SF.click(By.xpath('//button[@ng-click="closeSelectBox($event)"]'));
    SF.sleep(3);
    JS.click('span:contains(\\"Add Pickup/Delivery\\")');
    MF.WaitWhileBusy();
    SF.click(By.xpath('//div[contains(text(), "' + V.client.name + '")]/..//md-checkbox[@ng-model="item.a_a_selected"]/div[1]'));
    JS.click('span:contains(\\"Add requests to trip\\")');
    SF.sleep(3);
    SF.click(By.xpath('//button[@ng-click="getJobs()"]'));
    SF.sleep(5);
    driver.wait(driver.findElement(By.xpath('//div[@ng-repeat="item in jobs"]/div[@class="big-form__jobs-list__body__item ng-binding"][4]')).getText().then(function (text) {
        V.TripBalance1 = SF.cleanPrice(text);
        VD.IWant(VD.ToEqual, V.boardNumbersClosingAfterPaymentInRequest.Balance, V.TripBalance1, 'не совпал баланс после добавления работы в трип');
    }),config.timeout);
    SF.sleep(2);
    JS.scroll('button[ng-click="getJobs()"]');

condition.nowWeDoing = 'идем в реквест, делаем в клоузинге дисконт, еще одну проплату, запоминаем баланс, и проверям его в трипе';
    SF.click(By.xpath('//div[@ng-click="openRequest(id)"]'));
    MF.EditRequest_WaitForBalanceVisible();
    SF.click(By.xpath('//label[@ng-click="OpenDiscountInvoiceModal();"]'));
    SF.waitForLocated (By.xpath('//button[@ng-click="openCouponModal()"]'));
    SF.sleep(2);
    SF.click(By.xpath('//input[@ng-model="invoice.request_all_data.add_money_discount"]'));
    SF.send(By.xpath('//input[@ng-model="invoice.request_all_data.add_money_discount"]'), 99);
    SF.click(By.xpath('//input[@ng-model="invoice.request_all_data.add_percent_discount"]'));
    SF.click(By.xpath('//button[@ng-click="Apply()"]'));
    MF.SweetConfirm ();
    SF.sleep(8);
    MF.WaitWhileToaster();
    MF.EditRequest_OpenPayment();
    MF.WaitWhileBusy();
    SF.sleep(1);
    MF.EditRequest_ClickAddCustomPayment();
    V.cashPayment2 = 200;
    SF.clear(By.xpath('//input[@ng-model="receipt.amount"]'));
    SF.send(By.xpath('//input[@ng-model="receipt.amount"]'), V.cashPayment2);
    SF.click(By.xpath('//button[@ng-click="Save()"]'));
    SF.waitForLocated (By.xpath('//input[@ng-model="receipt.account_number"]'));
    MF.WaitWhileBusy();
    JS.click('button[ng-click=\\"save()\\"]:visible');
    V.boardNumbersClosingAfterDiscountAndPaymentInRequest = {};
    LF.RememberDigitsRequestBoard_Down (V.boardNumbersClosingAfterDiscountAndPaymentInRequest);
    LF.closeEditRequest();
    JS.scroll('button[ng-click="getJobs()"]');
    SF.click(By.xpath('//button[@ng-click="getJobs()"]'));
    SF.sleep(5);
    driver.wait(driver.findElement(By.xpath('//div[@ng-repeat="item in jobs"]/div[@class="big-form__jobs-list__body__item ng-binding"][4]')).getText().then(function (text) {
        V.TripBalance2 = SF.cleanPrice(text);
        VD.IWant(VD.ToEqual, V.boardNumbersClosingAfterDiscountAndPaymentInRequest.Balance, V.TripBalance2, 'не совпал баланс после дисконта и 2й оплаты');
    }),config.timeout);
    SF.sleep(1);

condition.nowWeDoing = 'идем в реквест 2й раз, на одной проплате ставим галочку пендинг, запоминаем баланс реквеста и сравниваем его в трипе';
    SF.click(By.xpath('//div[@ng-click="openRequest(id)"]'));
    MF.EditRequest_WaitForBalanceVisible();
    MF.EditRequest_OpenPayment();
    SF.click(By.xpath('//input[@ng-click="changePending(receipt)"]'));
    JS.click('button[ng-click=\\"save()\\"]:visible');
    SF.sleep(3);
    MF.EditRequest_WaitForBalanceVisible();
    V.boardNumbersClosingAfterPendingPayment = {};
    LF.RememberDigitsRequestBoard_Down (V.boardNumbersClosingAfterPendingPayment);
    LF.closeEditRequest();
    SF.click(By.xpath('//button[@ng-click="getJobs()"]'));
    SF.sleep(5);
    driver.wait(driver.findElement(By.xpath('//div[@ng-repeat="item in jobs"]/div[@class="big-form__jobs-list__body__item ng-binding"][4]')).getText().then(function (text) {
        V.TripBalance3 = SF.cleanPrice(text);
        VD.IWant(VD.ToEqual, V.boardNumbersClosingAfterPendingPayment.Balance, V.TripBalance3, 'не совпал баланс после перевода одной проплаты в пендинг');
    }),config.timeout);
    SF.sleep(2);

 condition.nowWeDoing = 'идем в реквест 3й раз, в салесе добавляем инвентарь и пакинг, а в клоузинг меняем сумму дисконта ';
    SF.click(By.xpath('//div[@ng-click="openRequest(id)"]'));
    MF.EditRequest_WaitForBalanceVisible();
    SF.click(By.xpath('//div[@ng-click="changeSalesClosingTab(\'sales\')"]'));
    MF.EditRequest_OpenInventoryTab();
    LF.addInventoryBoard();
    MF.EditRequest_AddPackingAndFullPAcking();
    MF.EditRequest_SaveChanges();
    MF.EditRequest_CloseConfirmWork ();
    SF.click(By.xpath('//label[@ng-click="OpenDiscountInvoiceModal();"]'));
    SF.waitForLocated (By.xpath('//button[@ng-click="openCouponModal()"]'));
    SF.sleep(2);
    SF.click(By.xpath('//input[@ng-model="invoice.request_all_data.add_money_discount"]'));
    SF.clear(By.xpath('//input[@ng-model="invoice.request_all_data.add_money_discount"]'));
    SF.send(By.xpath('//input[@ng-model="invoice.request_all_data.add_money_discount"]'),300);
    SF.click(By.xpath('//input[@ng-model="invoice.request_all_data.add_percent_discount"]'));
    SF.click(By.xpath('//button[@ng-click="Apply()"]'));
    MF.SweetConfirm ();
    SF.sleep(8);
    MF.WaitWhileToaster();
    V.boardNumbersClosingAfterAddInventory = {};
    LF.RememberDigitsRequestBoard_Down (V.boardNumbersClosingAfterAddInventory);
    LF.closeEditRequest();
    JS.scroll('button[ng-click="getJobs()"]');
    SF.click(By.xpath('//button[@ng-click="getJobs()"]'));
    SF.sleep(5);
    driver.wait(driver.findElement(By.xpath('//div[@ng-repeat="item in jobs"]/div[@class="big-form__jobs-list__body__item ng-binding"][4]')).getText().then(function (text) {
        V.TripBalance4 = SF.cleanPrice(text);
        VD.IWant(VD.ToEqual, V.boardNumbersClosingAfterAddInventory.Balance, V.TripBalance4, 'не совпал баланс после добавления инвентаря и пакинга');
    }),config.timeout);
    SF.sleep(3);



condition.nowWeDoing = 'запоминаем номер трипа, выходим из него и проверяем, что он есть в трипах ';
    driver.wait(driver.findElement(By.xpath('//h2[@class="trip-create-modal-form__toolbar__label ng-binding md-truncate flex"]')).getText().then(function (text) {
        V.TripID = SF.cleanPrice(text);
        console.log(V.TripID);
    }),config.timeout);
    SF.sleep(1);
    MF.Board_OpenSideBar();
    MF.Board_ClickLongDistanceDispach();
    MF.Board_OpenTripPlanner();
    SF.sleep(7);
    driver.wait(driver.findElement(By.xpath('//div[@class="trip-list__body trip-list__body_not-selected"]//div[contains(text(), "'+V.TripID+'")]')).getText().then(function (text) {
        V.TripPlannerID = SF.cleanPrice(text);
        VD.IWant(VD.ToEqual,  V.TripID, V.TripPlannerID, 'нет работы в трипе');
    }),config.timeout);
    SF.sleep(2);


    SF.endOfTest();
};
