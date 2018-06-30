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

condition.nowWeDoing = 'Создаем Long Distance работу с мувборда, добавляем partial packing, меняем статус реквеста на Confirmed и меняем мув сайз';
    LF.CreateLongDistanceFromBoard(V.client);
    V.requestNumber={};
    MF.EditRequest_RememberId(V.requestNumber);
    V.boardNumbers = {};
    driver.wait(driver.findElement(By.xpath('//input[@ng-click="openCalendar()"]')).getAttribute("value").then(function (dateString) {
        dateString = dateString.toUpperCase();
        V.boardNumbers.moveDate = {};
        V.boardNumbers.moveDate.Month = SF.FindMonthInString(dateString);
        V.boardNumbers.moveDate.Day = SF.cleanPrice(dateString.substring(0, dateString.indexOf(',')));
        V.boardNumbers.moveDate.Year = SF.cleanPrice(dateString.substring(dateString.indexOf(',')));
    }),config.timeout);
    MF.EditRequest_OpenClient();
    LF.SetClientPasswd(V.client.passwd);
    MF.EditRequest_OpenRequest();
    LF.EditRequest_AddPartialPacking();
    MF.EditRequest_SetToConfirmed();
    SF.select(By.xpath('//select[@ng-model="request.ld_status"]'), 'number:1');
    SF.sleep(1);
    MF.EditRequest_SetSizeOfMoveNumber(8);
    LF.RememberDigitsRequestBoard_Down (V.boardNumbers);

condition.nowWeDoing = 'Проверяем пэймент в пэндинге. Выключаем калькулятор, закрываем роботу, заходим в SIT и заполняем поля';
    JS.step(JSstep.selectTruck(5));
    MF.WaitWhileBusy();
    MF.EditRequest_OpenPaymentModalWindow();
    MF.EditRequest_ClickAddCustomPayment();
    V.cashPayment = 100;
    SF.clear(By.xpath('//input[@ng-model="receipt.amount"]'));
    SF.send(By.xpath('//input[@ng-model="receipt.amount"]'), V.cashPayment);
    SF.click(By.xpath('//button[@ng-click="Save()"]'));
    SF.waitForLocated (By.xpath('//input[@ng-model="receipt.account_number"]'));
    MF.WaitWhileBusy();
    JS.click('button[ng-click=\\"save()\\"]:visible');
    MF.WaitWhileBusy();
    driver.wait(driver.findElement(By.xpath('//label[@ng-click="OpenPaymentModal();"]/following-sibling::div')).getText().then(function(text){
        V.cleanPayment = SF.cleanPrice(text);
        VD.IWant(VD.ToEqual, V.cleanPayment, V.cashPayment, 'не совпали Payment в модалке реквеста до включения галочки pending');
    }),config.timeout);
    MF.EditRequest_OpenPaymentModalWindow();
    SF.sleep(3);
    driver.wait(driver.findElement(By.xpath('//div[contains(text(),"Total")]')).getText().then(function(text){
        V.cleanTotal = SF.cleanPrice(text);
        VD.IWant(VD.ToEqual, V.cleanTotal, V.cashPayment, 'не совпали Payment и тотал в модалке реквеста до включения галочки pending');
    }),config.timeout);
    SF.click(By.xpath('//input[@ng-click="changePending(receipt)"]'));
    driver.wait(driver.findElement(By.xpath('//div[contains(text(),"Total")]')).getText().then(function(text){
        V.cleanTotal = SF.cleanPrice(text);
        VD.IWant(VD.ToEqual, '0', V.cleanTotal, 'тотал после включения галочки pending должен бить 0');
    }),config.timeout);
    SF.click(By.xpath('//button[contains(text(), "Ok")]'));
    MF.WaitWhileBusy();
    driver.wait(driver.findElement(By.xpath('//label[@ng-click="OpenPaymentModal();"]/following-sibling::div')).getText().then(function(text){
        V.cleanPayment = SF.cleanPrice(text);
        VD.IWant(VD.ToEqual, V.cleanPayment, '0', 'Payment в модалке реквеста после включения галочки pending должен бить 0');
    }),config.timeout);
    MF.WaitWhileBusy();
    V.perCubicFeet = '5';
    MF.EditRequest_SendRateForLD (V.perCubicFeet);
    MF.ConfirmCalculatorOff();
    MF.EditRequest_SetAdressToFrom();
    MF.EditRequest_SaveChanges();
    MF.EditRequest_WaitForOpenRequest();
    MF.EditRequest_RememberCbf(V.boardNumbers);
    MF.EditRequest_RememberLbs(V.boardNumbers);
    MF.EditRequest_CloseConfirmWork();
    V.boardNumbersClosing = {};
    LF.RememberDigitsRequestBoard_Down (V.boardNumbersClosing);
    VD.IWant(VD.ToEqual, V.boardNumbersClosing.Packing, 0, 'Partial packing был перенесен в табу closing после изменения мув сайза в зелёном реквесте');
    MF.EditRequest_OpenSITmodal();
    MF.EditRequest_SITmodalSetForeman('Test Foreman');
    MF.EditRequest_SITmodalSetStorage('test');
    MF.EditRequest_SITmodalSetBlankets(5);
    V.SITRooms = 1;
    MF.EditRequest_SITmodalSendNumberRooms(V.SITRooms);
    MF.EditRequest_SITmodalSetMoveDate(V.request);
    MF.EditRequest_SITmodalClickSave();
    LF.closeEditRequest ();

condition.nowWeDoing = 'Заходим в Jobs in SIT Проверям есть ли эта работа и совпали ли Storage Name';
    MF.Board_OpenSideBar();
    MF.Board_OpenJobsInSIT();
    MF.Board_OpenSideBar();
    SF.waitForVisible (By.xpath('//div[contains(text(),"'+ V.client.name +'")]/..//div[4]'));
    SF.click(By.xpath('//md-select[@ng-model="selectedStorage"]'));
    SF.waitForVisible (By.xpath('//div[text()="test"]'));
    SF.click(By.xpath('//md-option[@ng-value="item"]/div[text()="test"]'));
    SF.sleep(1);
    SF.click(By.xpath('//md-select[@ng-model="selectedForeman"]'));
    SF.waitForVisible (By.xpath('//div[text()="Test Foreman"]'));
    SF.click(By.xpath('//md-option[@ng-value="item"]/div[text()="Test Foreman"]'));
    driver.wait(driver.findElement(By.xpath('//div[contains(text(),"'+ V.client.name +'")]/..//div[4]')).getText().then(function(text){
        VD.IWant(VD.ToEqual, text, 'test', 'Не совпали Storage Name в модалке SIT и Jobs in SIT ');
    }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//div[contains(text(),"'+ V.client.name +'")]/..//div[5]')).getText().then(function(text){
        V.pickUpFrom = SF.cleanPrice(text);
        VD.IWant(VD.ToEqual, V.pickUpFrom, '234234234242402200', 'Не совпали pick Up from в реквесте и в Jobs in SIT ');
    }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//div[contains(text(),"'+ V.client.name +'")]/..//div[6]')).getText().then(function(text){
        V.readyForDelivery = SF.cleanPrice(text);
        VD.IWant(VD.ToEqual, V.readyForDelivery, '3465456456490001', 'Не совпали Delivery to в реквесте и в Jobs in SIT ');
    }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//div[contains(text(),"'+ V.client.name +'")]/..//div[7]')).getText().then(function(text){
        VD.IWant(VD.ToEqual, text, 'TestForeman', 'не совпал Foreman в модалке SIT и в jobs in SIT');
    }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//div[contains(text(),"'+ V.client.name +'")]/..//div[2]')).getText().then(function(text){
        VD.IWant(VD.ToEqual, text, V.requestNumber.Id, 'не совпал ID реквеста в jobs in SIT');
    }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//div[contains(text(),"'+ V.client.name +'")]/..//div[8]')).getText().then(function(text){
        VD.IWant(VD.ToEqual, text, 5, 'не совпали SIT blankets в модалке SIT и в jobs in SIT');
    }),config.timeout);

condition.nowWeDoing = 'Заходим в реквест , выставляем Delivery day и Schedule day и LD status';
    SF.click(By.xpath('//div[contains(text(), "'+ V.client.name +'")]/..//div[@ng-click="openRequest(id)"]'));
    MF.EditRequest_WaitForOpenRequest();
    MF.EditRequest_OpenConfirmWork ();
    LF.EditRequest_SetFirstDeliveryDay(4);
    MF.EditRequest_OpenConfirmWork ();
    LF.EditRequest_SetScheduleDeliveryDate(4);
    MF.EditRequest_SaveChanges();
    MF.EditRequest_CloseConfirmWork ();
    LF.closeEditRequest ();

 condition.nowWeDoing = 'Заходим в PickUp и проверям по филтрам и по введенним даним';
    MF.Board_OpenSideBar();
    SF.sleep(1);
    SF.click(By.xpath('//a[@ui-sref="lddispatch.pick_up"]'));
    SF.sleep(2);
    MF.Board_OpenSideBar();
    SF.sleep(2);
    SF.click(By.xpath('//md-select[@ng-model="selectedStatus"]'));
    SF.sleep(1);
    SF.click(By.xpath('//md-option[@ng-repeat="item in ldStatuses"]/div[text()="LD"]'));
    SF.click(By.xpath('//div[@ng-click="openModalFrom()"]'));
    SF.waitForVisible (By.xpath('//div[text()="MA - Massachusetts"]'));
    SF.click(By.xpath('//div[text()="MA - Massachusetts"]'));
    SF.sleep(2);
    SF.click(By.xpath('//button[@ng-click="closeModal()"]'));
    SF.waitForVisible (By.xpath('//div[contains(text(),"'+ V.client.name +'")]/..//div[9]'));
    SF.sleep(2);
    driver.wait(driver.findElement(By.xpath('//div[contains(text(),"'+ V.client.name +'")]/..//div[9]')).getText().then(function(text){
        VD.IWant(VD.ToEqual, text, 'Ready', 'Ready for Delivery должен быть Ready');
    }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//div[contains(text(),"'+ V.client.name +'")]/..//div[4]')).getText().then(function(text){
        VD.IWant(VD.ToEqual, V.pickUpFrom, '234234234242402200', 'Не совпали Pick Up from в реквесте и в LD dispatch pick up');
    }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//div[contains(text(),"'+ V.client.name +'")]/..//div[5]')).getText().then(function(text){
        VD.IWant(VD.ToEqual, V.readyForDelivery, '3465456456490001', 'Не совпали Delivery to в реквесте и в LD dispatch pick up');
    }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//div[contains(text(),"'+ V.client.name +'")]/..//div[8]')).getText().then(function(text){
        VD.IWant(VD.ToEqual, text, 'LD', 'Не совпали LD status в реквесте и в LD dispatch pick up');
    }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//div[contains(text(),"'+ V.client.name +'")]/..//div[2]')).getText().then(function (text) {
        VD.IWant(VD.ToEqual, text, V.requestNumber.Id, 'Не совпал Job ID реквеста в LD dispatch pick up');
    }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//div[contains(text(),"'+ V.client.name +'")]/..//div[7]')).getText().then(function (text) {
        text = SF.cleanPrice(text.substring(text.indexOf('/')));
        VD.IWant(VD.ToEqual, text, V.boardNumbers.cbf, 'Не совпал Cubic feet в реквесте и в LD dispatch pick up');
    }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//div[contains(text(),"'+ V.client.name +'")]/..//div[7]')).getText().then(function (text) {
        text = SF.cleanPrice(text.substring(0, text.indexOf('/')));
        VD.IWant(VD.ToEqual, text, V.boardNumbers.lbs, 'Не совпал Lbs в реквесте и в LD dispatch pick up');
    }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//div[contains(text(),"'+ V.client.name +'")]/..//div[10]')).getText().then(function(text){
        VD.IWant(VD.ToEqual, text, V.scheduleDate.Month + '-' + V.scheduleDate.Day + '-' + '2018' , 'Не совпал Schedule delivery date в реквесте и в LD dispatch pick up ');
    }),config.timeout);
    MF.Board_LogoutAdmin ();

condition.nowWeDoing = 'Идём клиентом на аккаунт, открываем confirmation page и проверяем, чтобы partial packing отображался на странице.';
    SF.get(V.accountURL);
    LF.LoginToAccountAsClient (V.client, V.client.passwd);
    MF.Account_OpenRequest(V.requestNumber.Id);
    MF.Account_ClickViewRequest();
    MF.Account_ClickViewConfirmationPage();
    driver.wait(driver.findElement(By.xpath('//div[@ng-repeat="packing in vm.packings"]/div[5]')).getText().then(function (text) {
        text = SF.cleanPrice(text.substring(text.indexOf('$')));
        VD.IWant(VD.ToEqual, text,V.boardNumbers.Packing, 'Не отображается partial packing на confirmation page');
    }),config.timeout);
    SF.sleep(1);
    SF.endOfTest();
};