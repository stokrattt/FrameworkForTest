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
    SF.select(By.xpath('//select[@ng-model="request.ld_status"]'), 'number:1');
    SF.sleep(1);
    JS.step(JSstep.selectTruck(2));
    MF.WaitWhileBusy();
    MF.EditRequest_SetAdressToFrom ();
    MF.EditRequest_SaveChanges();
    V.boardNumbers = {};
    MF.EditRequest_CloseConfirmWork ();
    MF.EditRequest_OpenSITmodal();
    MF.EditRequest_SITmodalSetStorage('test');
    V.SITRooms = 1;
    MF.EditRequest_SITmodalSendNumberRooms(V.SITRooms);
    MF.EditRequest_SITmodalSetMoveDate(V.request);
    MF.EditRequest_SITmodalClickSave();

condition.nowWeDoing = 'добавляем адишенал, типсы, делаем проплату в клоузинге';
    MF.EditRequest_SendTipsOnClosingTab(50);
    LF.EditRequest_AddAdditionalServClosingTab();
    MF.EditRequest_OpenFuelModalClosingTab();
    MF.EditRequest_SendSumFuelModalClocingTab(200);
    MF.EditRequest_ClickApplyInFuelWindow();
    SF.sleep(5); //софт тупит
    V.boardNumbersClosingTab1 = {};
    LF.RememberDigitsRequestBoard_Down (V.boardNumbersClosingTab1);
    // MF.EditRequest_SaveChangesClosingTab();
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
    MF.EditRequest_OpenPayment();
    MF.EditRequest_ClickAddCustomPayment();
    V.cashPayment = 100;
    LF.EditRequest_CustomPay(V.cashPayment);
    V.boardNumbersClosingAfterPaymentInRequest = {};
    LF.RememberDigitsRequestBoard_Down (V.boardNumbersClosingAfterPaymentInRequest);
    SF.sleep(1);
    LF.closeEditRequest ();

condition.nowWeDoing = 'идем в SIT создаем трип, добавляем в него наш реквест';
    MF.Board_OpenSideBar();
    MF.Board_ClickLongDistanceDispach();
    MF.Board_OpenTripPlanner();
    MF.Board_OpenSideBar();
    MF.SIT_ClickAddTrip();
    SF.sleep(2);
    MF.SIT_ChangeStatusTrip('Pending');
    MF.SIT_ChangeStatusTripForemanHelper();
    V.internalCode = SF.randomCifra(10);
    V.decription = SF.randomBukva(6) + '_t';
    MF.SIT_AddDescriptionAndInternalCode(V.decription, V.internalCode);
    SF.click(By.xpath('//md-select[@ng-model="trip.data.foreman"]'));
    V.foremanName = 'Test Foreman';
    SF.sleep(1);
    SF.click(By.xpath('//md-option[@ng-repeat="item in foremen"]/div[text()="'+V.foremanName+'"]'));
    SF.sleep(1);
    SF.click(By.xpath('//md-select[@ng-model="trip.data.helper"]'));
    SF.waitForVisible (By.xpath('//div[text()="helper test1"]'));
    SF.click(By.xpath('//div[text()="helper test1"]'));
    SF.click(By.xpath('//div[text()="helper test2"]'));
    SF.click(By.xpath('//button[@ng-click="closeSelectBox($event)"]'));
    SF.sleep(3);
    MF.SIT_ClickAddPickupDelivery();
    SF.click(By.xpath('//div[contains(text(), "' + V.client.name + '")]/..//md-checkbox[@ng-model="item.a_a_selected"]/div[1]'));
    MF.SIT_AddRequestToTrip();
    MF.SIT_RefreshJobsInTrip();
    driver.wait(driver.findElement(By.xpath('//div[@ng-click="openDialog(item)"]/following-sibling::div[@class="big-form__jobs-list__body__item"][5]')).getText().then(function (text) {
        V.TripBalance1 = SF.cleanPrice(text);
        VD.IWant(VD.ToEqual, V.boardNumbersClosingAfterPaymentInRequest.Balance, V.TripBalance1, 'не совпал баланс после добавления работы в трип');
    }),config.timeout);
    JS.scroll('button[ng-click="getJobs()"]');

condition.nowWeDoing = 'идем в реквест, делаем в клоузинге дисконт, еще одну проплату, запоминаем баланс, и проверям его в трипе';
    driver.wait(driver.findElement(By.xpath('//div[@ng-click="openRequest(id)"][contains(text(),"' + V.requestNumber.Id  + '")]')).click(), config.timeout);
    MF.EditRequest_WaitForBalanceVisible();
    MF.EditRequest_ClosingTabOpenDiscountModal();
    MF.EditRequest_ClosingTabDiscountModalSendMoney(99);
    MF.EditRequest_ClosingTabDiscountModalClickSave();
    SF.sleep(5);
    MF.WaitWhileToaster();
    MF.EditRequest_OpenPayment();
    MF.WaitWhileBusy();
    SF.sleep(1);
    MF.EditRequest_ClickAddCustomPayment();
    V.cashPayment2 = 200;
    LF.EditRequest_CustomPay(V.cashPayment2);
    V.boardNumbersClosingAfterDiscountAndPaymentInRequest = {};
    LF.RememberDigitsRequestBoard_Down (V.boardNumbersClosingAfterDiscountAndPaymentInRequest);
    LF.closeEditRequest();
    MF.SIT_RefreshJobsInTrip();
    driver.wait(driver.findElement(By.xpath('//div[@ng-click="openDialog(item)"]/following-sibling::div[@class="big-form__jobs-list__body__item"][5]')).getText().then(function (text) {
        V.TripBalance2 = SF.cleanPrice(text);
        VD.IWant(VD.ToEqual, V.boardNumbersClosingAfterDiscountAndPaymentInRequest.Balance, V.TripBalance2, 'не совпал баланс после дисконта и 2й оплаты');
    }),config.timeout);

condition.nowWeDoing = 'идем в реквест 2й раз, на одной проплате ставим галочку пендинг, запоминаем баланс реквеста и сравниваем его в трипе';
    driver.wait(driver.findElement(By.xpath('//div[@ng-click="openRequest(id)"][contains(text(),"' + V.requestNumber.Id  + '")]')).click(), config.timeout);
    MF.EditRequest_WaitForBalanceVisible();
    MF.EditRequest_OpenPayment();
    SF.click(By.xpath('//input[@ng-click="changePending(receipt)"]'));
    JS.click('button[ng-click=\\"save()\\"]:visible');
    SF.sleep(3);
    MF.EditRequest_WaitForBalanceVisible();
    V.boardNumbersClosingAfterPendingPayment = {};
    LF.RememberDigitsRequestBoard_Down (V.boardNumbersClosingAfterPendingPayment);
    LF.closeEditRequest();
    MF.SIT_RefreshJobsInTrip();
    driver.wait(driver.findElement(By.xpath('//div[@ng-click="openDialog(item)"]/following-sibling::div[@class="big-form__jobs-list__body__item"][5]')).getText().then(function (text) {
        V.TripBalance3 = SF.cleanPrice(text);
        VD.IWant(VD.ToEqual, V.boardNumbersClosingAfterPendingPayment.Balance, V.TripBalance3, 'не совпал баланс после перевода одной проплаты в пендинг');
    }),config.timeout);

 condition.nowWeDoing = 'идем в реквест 3й раз, в салесе добавляем инвентарь и пакинг, а в клоузинг меняем сумму дисконта ';
    driver.wait(driver.findElement(By.xpath('//div[@ng-click="openRequest(id)"][contains(text(),"' + V.requestNumber.Id  + '")]')).click(), config.timeout);
    MF.EditRequest_WaitForBalanceVisible();
    MF.EditRequest_OpenConfirmWork();
    MF.EditRequest_OpenInventoryTab();
    LF.addInventoryBoard();
    MF.EditRequest_OpenConfirmWork();
    LF.EditRequest_AddPackingAndFullPAcking();
    MF.EditRequest_SaveChanges();
    MF.EditRequest_CloseConfirmWork ();
    MF.EditRequest_ClosingTabOpenDiscountModal();
    MF.EditRequest_ClosingTabDiscountModalSendMoney(300);
    MF.EditRequest_ClosingTabDiscountModalClickSave();
    SF.sleep(5);
    MF.WaitWhileToaster();
    V.boardNumbersClosingAfterAddInventory = {};
    LF.RememberDigitsRequestBoard_Down (V.boardNumbersClosingAfterAddInventory);
    LF.closeEditRequest();
    MF.SIT_RefreshJobsInTrip();
    driver.wait(driver.findElement(By.xpath('//div[@ng-click="openDialog(item)"]/following-sibling::div[@class="big-form__jobs-list__body__item"][5]')).getText().then(function (text) {
        V.TripBalance4 = SF.cleanPrice(text);
        VD.IWant(VD.ToEqual, V.boardNumbersClosingAfterAddInventory.Balance, V.TripBalance4, 'не совпал баланс после добавления инвентаря и пакинга');
    }),config.timeout);

condition.nowWeDoing = 'запоминаем номер трипа, выходим из него и проверяем, что он есть в трипах ';
    driver.wait(driver.findElement(By.xpath('//h2[@class="trip-create-modal-form__toolbar__label md-truncate flex"]')).getText().then(function (text) {
        V.TripID = SF.cleanPrice(text);
    }),config.timeout);
    MF.Board_ClickLongDistanceDispach();
    MF.Board_OpenSideBar();
    SF.sleep(4);
    SF.click(By.xpath('//div[contains(text(), "'+V.TripID+'")]'));
    SF.click(By.xpath('//div[contains(text(), "'+V.TripID+'")]'));
    SF.waitForLocated (By.xpath('//div[@id="trucksTimelineId"]'));
    SF.click(By.xpath('//md-tab-item[@ng-repeat="tab in $mdTabsCtrl.tabs"]/span[contains(text(), "Closing")]'));
    SF.waitForLocated(By.xpath('//label[contains(text(), "Foreman/Driver:")]/following-sibling::span[contains(text(), "Test Foreman")]'));
    SF.sleep(1);


    SF.endOfTest();
};
