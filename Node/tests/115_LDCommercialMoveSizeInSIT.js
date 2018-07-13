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
    LF.CreateLongDistanceFromBoardWithCommercialMoveSizeAndStairs();

condition.nowWeDoing = 'Добавляем инвентарь, меняем Fuel и этажи, ставим статус Confirmed. Запоминаем данные (Total, Fuel, AdServices), сохраянем изменения и закрываем реквест';
    V.requestNumber={};
    MF.EditRequest_RememberId(V.requestNumber);
    driver.wait(driver.findElement(By.xpath('//span[contains(text(),"c.f.")]/preceding-sibling::span[1]')).getText().then(function(text){
        V.defaultcbf = SF.cleanPrice(text.substring(text.indexOf('$')));
    }),config.timeout);
    SF.sleep(0.5);
    MF.EditRequest_OpenClient();
    LF.SetClientPasswd(V.client.passwd);
    LF.addInventoryBoard();
    MF.EditRequest_OpenRequest();
    MF.EditRequest_OpenFuelSurchModal();
    MF.EditRequest_SendFlatSurchargeInFuelWindow(213);
    MF.EditRequest_ClickApplyInFuelWindow();
    SF.sleep(3);
    MF.EditRequest_ChangeStairsFrom(3);
    MF.EditRequest_SetAdressToFrom ();
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
    LF.Validation_Compare_Account_Admin_LongDistance(V.boardNumbersAfterClose, V.boardNumbers);
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
    LF.RememberAndCompare_Admin_ConfirmationPage_LongDistance(V.boardNumbersAfterClose);
    MF.Account_ConfirmationBackToRequest();

condition.nowWeDoing = 'В аккаунте удаляем весь инвентарь, проверяем что cubic feet стал дефолтным. Добавляем Full packing, проверяем что цена посчитана правильно и прибавлена к тоталу.';
    MF.Account_ClickInventoryOpenTab();
    LF.Account_DeleteInventory();
    driver.wait(driver.findElement(By.xpath('//div[contains(text(),"Move Size")]/following-sibling::div[2]/div')).getText().then(function(text){
        text = SF.cleanPrice(text.substring(text.indexOf('100 Offices and 1000 employees ')+17, text.indexOf('c.f.')));
        VD.IWant(VD.ToEqual, V.defaultcbf, text, 'Cubic feet не ушел в дефолтные 1500 после удаления инвентаря на аккаунте');
    }),config.timeout);
    V.accountNumbersBeforeFullPacking = {};
    LF.RememberAccountNumbersLD(V.accountNumbersBeforeFullPacking);
    MF.Account_ClickFullPacking();
    SF.sleep(3);
    V.accountNumbersAfterFullPacking = {};
    LF.RememberAccountNumbersLD(V.accountNumbersAfterFullPacking);
    VD.IWant(VD.ToEqual, V.accountNumbersAfterFullPacking.Packing ,V.defaultcbf*0.7, 'Неправильно посчитался Full packing');
    V.totalWithPacking = V.accountNumbersBeforeFullPacking.Total + V.accountNumbersAfterFullPacking.Packing;
    VD.IWant(VD.ToEqual, V.totalWithPacking  ,V.accountNumbersAfterFullPacking.Total, 'Цена за full packing не была прибавлена к grand total');
    SF.sleep(1);
    LF.LogoutFromAccount();

condition.nowWeDoing = 'Возвращаемся на дашборд. Сверяем данные с аккаунта с данными на мувборде и проверяем, что cubic feet стал дефолтным. В табе Sales меняем Fuel, добавляем Packing и Discount, запоминаем эти изменения';
    SF.get(V.adminURL);
    LF.LoginToBoardAsCustom(V.adminLogin,V.adminPassword);
    MF.Board_OpenConfirmed();
    MF.Board_OpenRequest (V.requestNumber.Id);
    V.boardNumbersAfterDeleteInventory = {};
    LF.RememberDigitsRequestBoard(V.boardNumbersAfterDeleteInventory);
    LF.Validation_Compare_Account_Admin_LongDistance(V.accountNumbersAfterFullPacking, V.boardNumbersAfterDeleteInventory);
    driver.wait(driver.findElement(By.xpath('//span[@ng-if="!states.invoiceState"]')).getText().then(function (text) {
        VD.IWant(VD.ToEqual, text, '1500', 'Cubic feet на дашборде не вернулся к дефолтному значению в 1500 после удаления инвентаря на аккаунте')
    }),config.timeout);
    MF.EditRequest_OpenFuelSurchModal();
    MF.EditRequest_SendFlatSurchargeInFuelWindow(222);
    MF.EditRequest_ClickApplyInFuelWindow();
    SF.sleep(3); //soft тупит
    MF.EditRequest_OpenDiscountModal();
    MF.EditRequest_SendMoneyDiscount(30);
    SF.sleep(3); //soft тупит
    LF.EditRequest_AddPacking();
    V.boardNumbersBeforeSITSales = {};
    LF.RememberDigitsRequestBoard_Down (V.boardNumbersBeforeSITSales);

condition.nowWeDoing = 'Переводим работу в Closing, проверяем чтобы все цифры сходились с теми что были в Sales, добавляем работу в SIT. ' +
    'Сохраняем, закрываем реквест и идём в Jobs in SIT проверять, что реквест добавлен в SIT.';
    MF.EditRequest_CloseConfirmWork();
    V.boardNumbersBeforeSITClosing = {};
    LF.RememberDigitsRequestBoard_Down (V.boardNumbersBeforeSITClosing);
    VD.IWant(VD.ToEqual, V.boardNumbersBeforeSITSales.Total - V.accountNumbersAfterFullPacking.Packing ,V.boardNumbersBeforeSITClosing.Total, 'не совпал Total после перевода реквеста с Sales в Closing');
    VD.IWant(VD.ToEqual, V.boardNumbersBeforeSITSales.Fuel, V.boardNumbersBeforeSITClosing.Fuel, 'не совпал Fuel  после перевода реквеста с Sales в Closing');
    VD.IWant(VD.ToEqual, (V.boardNumbersBeforeSITSales.Packing - V.boardNumbersAfterDeleteInventory.Packing), V.boardNumbersBeforeSITClosing.Packing, 'не совпал Packing после перевода реквеста с Sales в Closing');
    VD.IWant(VD.ToEqual, V.boardNumbersBeforeSITSales.AdServices, V.boardNumbersBeforeSITClosing.AdServices, 'не совпал AdServices после перевода реквеста с Sales в Closing');
    MF.EditRequest_OpenSITmodal();
    MF.EditRequest_SITmodalSetStorage('test');
    V.SITRooms = 1;
    MF.EditRequest_SITmodalSendNumberRooms(V.SITRooms);
    MF.EditRequest_SITmodalSetMoveDate(V.request);
    MF.EditRequest_SITmodalClickSave();
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
    LF.SIT_CreateCarrier(V.carrierNew);
    MF.Board_OpenSideBar ();
    MF.Board_ClickLongDistanceDispach();
    MF.Board_OpenTripPlanner();
    MF.SIT_ClickAddTrip();
    MF.SIT_ChangeStatusTrip('Pending');
    V.internalCode = SF.randomCifra(10);
    V.decription = SF.randomBukva(6) + '_t';
    V.driver = SF.randomBukva(6);
    V.driverPhone = SF.randomCifra(10);
    MF.SIT_AddDescriptionAndInternalCode(V.decription, V.internalCode);
    MF.SIT_SelectCarrierName(V.carrierNew.name);
    MF.SIT_TripSendDriveNameAndPhone(V.driver, V.driverPhone);

condition.nowWeDoing = 'Открываем реквест в Trip-Planner. Меняем Additional Services, Fuel, Packing. Запоминаем эти изменения.';
    MF.SIT_ClickAddPickupDelivery();
    driver.wait(driver.findElement(By.xpath('//div[@ng-click="openRequest(id)"][contains(text(),"' + V.requestNumber.Id  + '")]')).click(), config.timeout);
    MF.EditRequest_OpenFuelModalClosingTab();
    MF.EditRequest_SendSumFuelModalClocingTab(300);
    MF.EditRequest_ClickSaveFuelModalClosingTab();
    LF.EditRequest_AddPAckingOnClosingTab();
    MF.EditRequest_ClosingTabOpenDiscountModal();
    MF.EditRequest_ClosingTabDiscountModalSendMoney(180);
    MF.EditRequest_ClosingTabDiscountModalClickSave();
    V.boardNumbersBeforeAddToTrip = {};
    LF.RememberDigitsRequestBoard_Down (V.boardNumbersBeforeAddToTrip);
    LF.closeEditRequest ();

condition.nowWeDoing = 'Добавляем реквест в трип. Проверямем, что Discount, Fuel, Packing и AdServices не изменились после добавления работы в трип. Проверяем, что баланс реквеста равен 0.';
    SF.click(By.xpath('//div[contains(text(), "' + V.client.name + '")]/..//md-checkbox[@ng-model="item.a_a_selected"]/div[1]'));
    MF.SIT_AddRequestToTrip();
    SF.sleep(9);
    MF.SIT_RefreshJobsInTrip();
    driver.wait(driver.findElement(By.xpath('//div[@ng-click="openRequest(id)"][contains(text(),"' + V.requestNumber.Id  + '")]')).click(), config.timeout);
    MF.EditRequest_WaitForBalanceVisible();
    V.boardNumbersAddedToTrip = {};
    LF.RememberDigitsRequestBoard_Down (V.boardNumbersAddedToTrip);
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

condition.nowWeDoing = 'Открываем Closing трипа, открываем TP collected и создаём кастомный пеймент. Запоминаем новый TP collected.';
    MF.SIT_GoToClosingTab();
    SF.sleep(1);
    MF.SIT_ClosingClickTpCollected();
    V.tripNumbers = {};
    LF.SIT_CreateCustomPaymentInTPcollectedInClosing(200, V.tripNumbers);

condition.nowWeDoing = 'Идём на табу Trip Details, проверяем, что суммы в колонках TP collected и Shipping Balance пересчитались в соответствии с новым TP collected.';
    MF.SIT_ClickTripDetails();
    SF.sleep(3);
    driver.wait(driver.findElement(By.xpath('//div[@class="big-form__jobs-list__body"]//div[14]')).getText().then(function(text){
        text = SF.cleanPrice(text.substring(text.indexOf('$')));
        VD.IWant(VD.ToEqual, V.tripNumbers.NewTPCollected,text, 'TP collected в трипе не пересчитался после создания кастомного пеймента на клоузинге трипа');
    }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//div[@class="big-form__jobs-list__body"]//div[15]')).getText().then(function(text){
        text = SF.cleanPrice(text.substring(text.indexOf('$')));
        VD.IWant(VD.ToEqual, V.tripNumbers.NewTPCollected, text, 'Shipping balance в трипе не пересчитался после создания кастомного пеймента на клоузинге трипа');
    }),config.timeout);

condition.nowWeDoing = 'Открываем реквест, заходим в Payment и удаляем кастомный пеймент. Проверяем, что баланс реквеста равен нулю. Закрываем реквест.';
    driver.wait(driver.findElement(By.xpath('//div[@ng-click="openRequest(id)"][contains(text(),"' + V.requestNumber.Id  + '")]')).click(), config.timeout);
    MF.EditRequest_WaitForBalanceVisible();
    MF.EditRequest_OpenPayment();
    SF.click(By.xpath('//span[@ng-if="receipt.transaction_id == \'Custom Payment\'"]'));
    MF.EditRequest_RemoveSelectedPayment();
    SF.click(By.xpath('//button[@ng-click="cancel()"][contains(text(),"Close")]'));
    SF.sleep (1);
    JS.click('button[ng-click=\\"save()\\"]:visible');
    V.boardNumbersDelCustomPayment = {};
    LF.RememberDigitsRequestBoard_Down (V.boardNumbersDelCustomPayment);
    VD.IWant(VD.ToEqual, V.boardNumbersDelCustomPayment.Balance,'0', 'Balance в реквесте не равен 0 после удаления кастомного пеймента в модалке реквеста');
    MF.EditRequest_CloseEditRequest();

condition.nowWeDoing = 'Сравниваем Balance и TP collected трипа с тоталом и пейментом в реквесте.';
    MF.SIT_RefreshJobsInTrip();
    driver.wait(driver.findElement(By.xpath('//div[@class="big-form__jobs-list__body"]//div[15]')).getText().then(function(text){
        text = SF.cleanPrice(text.substring(text.indexOf('$')));
        VD.IWant(VD.ToEqual, text,V.boardNumbersDelCustomPayment.Total, 'не совпад Balance в трипе и реквесте после удаления кастомного пеймента в модалке реквеста');
    }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//div[@class="big-form__jobs-list__body"]//div[14]')).getText().then(function(text){
        text = SF.cleanPrice(text.substring(text.indexOf('$')));
        VD.IWant(VD.ToEqual, text,V.boardNumbersDelCustomPayment.Payment, 'не совпад Total paid в трипе и реквесте после удаления кастомного пеймента в модалке реквеста');
    }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//div[@class="big-form__jobs-list__body"]//div[13]')).getText().then(function(text){
        text = SF.cleanPrice(text.substring(text.indexOf('$')));
        VD.IWant(VD.ToEqual, text,V.boardNumbersDelCustomPayment.Balance, 'не совпад Job total в трипе и реквесте после удаления кастомного пеймента в модалке реквеста');
    }),config.timeout);
    SF.sleep(1);
    SF.endOfTest();
};