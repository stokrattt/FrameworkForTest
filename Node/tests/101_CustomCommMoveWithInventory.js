module.exports = function main(SF, JS, MF, LF, JSstep, VD, V, By, until,FileDetector, system, condition, config,constants) {
    global.fiber = Fiber.current;
    V.client = {};
    V.client.name = SF.randomBukva(6) + '_t';
    V.client.fam = SF.randomBukva(6) + '_t';
    V.client.phone = SF.randomCifra(10);
    V.client.email = SF.randomBukvaSmall(6) + '@' + SF.randomBukvaSmall(4) + '.tes';
    V.client.passwd = 123;

    //=========================начинаем писать тест=============================
    SF.get(V.adminURL);
    LF.LoginToBoardAsCustom(V.adminLogin,V.adminPassword);

condition.nowWeDoing = 'создаем лонг дистанс и добавляем кастомный комершиал мувсайз';
    LF.CreateLongDistanceFromBoard (V.client);
    MF.EditRequest_SetSizeOfMoveNumber (11);
    LF.EditRequest_AddCustomCommersialMove('TrasirCompany', 777);

condition.nowWeDoing = 'проверяем что сервис тип стал тоже комершиалом, также проверяем что кубик фит стал тем какой мы ввели, ' +
        'идем в клиента инфо и добавляем company name и проверяем что вверху отобразился он. Также запоминаем все данные';
    driver.wait(driver.findElement(By.xpath('//span[@ng-if="request.move_size.raw == 11"]')).getText().then(function (text) {
        VD.IWant(VD.ToEqual, text, '- COMMERCIAL MOVE', 'после выбора мувсайза комершиал не сменился сервис тип на комершиал')
    }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//span[contains(text(),"c.f.")]/preceding-sibling::span[1]')).getText().then(function(text){
        VD.IWant(VD.ToEqual, text, '777', 'после добавления мувсайза комершиал кубик фит не сменился')
    }),config.timeout);
    MF.EditRequest_OpenClient ();
    MF.EditRequest_ClientTabSendCompanyName('TrastovuyFond');
    LF.SetClientPasswd(V.client.passwd);
    driver.wait(driver.findElement(By.xpath('//span[@ng-if="request.move_size.raw == 11 && request.field_commercial_company_name.value.length"]')).getText().then(function (text) {
        VD.IWant(VD.ToEqual, text, 'TrastovuyFond', 'вверху реквеста не показалось company name');
    }),config.timeout);
    MF.EditRequest_OpenRequest();
    MF.EditRequest_SetAdressToFrom();
    V.boardNumbers = {};
    LF.RememberDigitsRequestBoard(V.boardNumbers);

condition.nowWeDoing = 'ставим трак и идем в логи проверять, что есть все нужные письма и что квота клиенту правильная отправилась';
    JS.step(JSstep.selectTruck((V.boardNumbers.LaborTimeMax + V.boardNumbers.TravelTime)/60));
    MF.WaitWhileBusy();
    MF.EditRequest_SaveChanges();
    V.managerFirstName = 'emilia';
    MF.EditRequest_OpenSettings();
    LF.SetManager(V.managerFirstName);
    MF.EditRequest_OpenLogs();
    MF.EditRequest_Check1EmailExist(V.client.email, "Thank you for submitting a quote.");
    MF.EditRequest_Check1EmailExist(V.client.email, "How To Work With Your New Account.");
    MF.EditRequest_Check1EmailExist(V.client.email, "Request Long Distance Quote (Pending Status");
    MF.EditRequest_Check1EmailExist(V.adminEmail, "New Request Notification");
    LF.closeEditRequest();

condition.nowWeDoing = 'закрываем и открываем наш реквест и еще раз сверяем данные которые были до закрытия';
    MF.Board_RefreshDashboard();
    MF.Board_OpenRequest(V.boardNumbers.Id);
    V.boardNumbers2Pending = {};
    LF.RememberDigitsRequestBoard(V.boardNumbers2Pending);
    LF.Validation_Compare_Account_Admin (V.boardNumbers, V.boardNumbers2Pending);
    driver.wait(driver.findElement(By.xpath('//span[contains(text(),"c.f.")]/preceding-sibling::span[1]')).getText().then(function(text){
        VD.IWant(VD.ToEqual, text, '777', 'открыл нот конферм работу и смотрим что кубик фит остался 777')
    }),config.timeout);
    LF.closeEditRequest();
    MF.Board_LogoutAdmin();

condition.nowWeDoing = 'идем в аккаунт добавлять инвентраь и проверять что есть имя компании, сервис тип равен комершиал, что все числа поменяются после инвентрая, добавим пекинг и запомним числа опять';
    SF.get(V.accountURL);
    LF.LoginToAccountAsClient (V.client, V.client.passwd);
    MF.Account_OpenRequest(V.boardNumbers.Id);
    MF.Account_ClickViewRequest();
    V.accountNumbersLD={};
    LF.RememberAccountNumbersLD(V.accountNumbersLD);
    SF.sleep(1);
    LF.Validation_Compare_Account_Admin_LongDistance(V.boardNumbers2Pending, V.accountNumbersLD);
    driver.wait(driver.findElement(By.xpath('//h4[@ng-if="moveSize == 11 && companyName.length"]/strong')).getText().then(function (text) {
        VD.IWant(VD.ToEqual, text, 'TrastovuyFond', 'не нашло company name на аккаунте');
    }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//span[@ng-if="vm.request.move_size.raw == 11"]')).getText().then(function (text) {
        VD.IWant(VD.ToEqual, text, '- COMMERCIAL MOVE', 'после выбора мувсайза комершиал не сменился сервис тип на комершиал');
    }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//div[contains(text(),"Move Size")]/following-sibling::div[2]/div')).getText().then(function(text){
        V.accountcbf = SF.cleanPrice(text.substring(text.indexOf('TrasirCompany')+13, text.indexOf('c.f.')));
        VD.IWant(VD.ToEqual, V.accountcbf, V.boardNumbers.cbf, 'не совпал кубик фит на акке с бордом нот конферм');
    }),config.timeout);
    LF.AccountLocalAddInventory();
    SF.sleep(2);
    driver.wait(driver.findElement(By.xpath('//div[contains(text(),"Move Size")]/following-sibling::div[2]')).getText().then(function(text){
        V.accountcbfWithInventory = SF.cleanPrice(text.substring(text.indexOf('Inventory ')+9, text.indexOf('c.f.')));
        VD.IWant(VD.NotToEqual, V.accountcbfWithInventory, V.accountcbf, 'не поменялся кубик фит на инвенторий, после, добавления его');
    }),config.timeout);
    V.accountNumbersLDAfterAddInven={};
    LF.RememberAccountNumbersLD(V.accountNumbersLDAfterAddInven);
    VD.IWant(VD.NotToEqual, V.accountNumbersLDAfterAddInven.Total, V.accountNumbersLD.Total, 'не изменился гранд тотал после добавления инвентрая');
    VD.IWant(VD.NotToEqual, V.accountNumbersLDAfterAddInven.Fuel, V.accountNumbersLD.Fuel, 'не изменился fuel после добавления инвентрая');
    MF.Account_ClickFullPacking();
    V.accountNumbersLDAfterAddInvenAfterAddFullPacing={};
    LF.RememberAccountNumbersLD(V.accountNumbersLDAfterAddInvenAfterAddFullPacing);
    LF.LogoutFromAccount();

condition.nowWeDoing = 'идем в админку делать нот конферм работе и проверять что работает смена кастомного веса для комершиал';
    SF.get(V.adminURL);
    LF.LoginToBoardAsCustom(V.adminLogin,V.adminPassword);
    MF.Board_OpenRequest(V.boardNumbers.Id);
    driver.wait(driver.findElement(By.xpath('//span[contains(text(),"c.f.")]/preceding-sibling::span[1]')).getText().then(function(text){
        VD.IWant(VD.ToEqual, text, V.accountcbfWithInventory, 'в админке не совпал кубик фит с аккаунтом после добавления инвентаря');
    }),config.timeout);
    V.boardNumbers2PendingAfterAddInven = {};
    LF.RememberDigitsRequestBoard(V.boardNumbers2PendingAfterAddInven);
    LF.Validation_Compare_Account_Admin_LongDistance (V.accountNumbersLDAfterAddInvenAfterAddFullPacing, V.boardNumbers2PendingAfterAddInven);
    MF.EditRequest_OpenSettings();
    MF.EditRequest_ClickCustomCubFit();
    MF.EditRequest_SendNumberCustomCubFit(999);
    driver.wait(driver.findElement(By.xpath('//input[@ng-model="request.custom_weight.value"]')).getAttribute('value').then(function (text) {
        VD.IWant(VD.ToEqual, text, 999, 'в настройках не поменялся кубик фит для кастомного веса');
    }),config.timeout);
    MF.EditRequest_ClickSizeInventory();
    SF.sleep(2);
    MF.EditRequest_OpenRequest();
    SF.sleep(2);
    MF.EditRequest_SetToNotConfirmed();
    MF.EditRequest_SaveChanges();
    MF.EditRequest_OpenLogs();
    MF.EditRequest_Check1EmailExist(V.client.email, "Request Long Distance Quote (Not Confirmed Status)");
    SF.click(By.xpath('//span[@ng-bind-html="toTrustedHTML(item.text)"][contains(text(),"Request Long Distance Quote (Not Confirmed Status)")]' +
        '[contains(text(),"'+V.client.email+'")]/../../../following-sibling::div[1]'));
    driver.wait(driver.findElement(By.xpath('//h3[contains(text(),"Estimated Quote")]/../../../../../../' +
        'following-sibling::td[1]//div')).getText().then(function(text){
        V.LogsQuote = SF.cleanPrice(text);
        VD.IWant(VD.ToEqual, V.LogsQuote, V.boardNumbers2PendingAfterAddInven.Total, 'в письме клиенту  тотал отправился неверный в нот конферм работе');
    }),config.timeout);
    LF.closeEditRequest();
    MF.Board_LogoutAdmin();

condition.nowWeDoing = 'идем в аккаунт букать работу и проверять конфирмейшн';
    SF.get(V.accountURL);
    LF.LoginToAccountAsClient (V.client, V.client.passwd);
    MF.Account_CheckRequestStatus_NotConfirmed(V.boardNumbers.Id);
    MF.Account_OpenRequest(V.boardNumbers.Id);
    driver.wait(driver.findElement(By.xpath('//div[contains(text(),"Move Size")]/following-sibling::div[2]')).getText().then(function(text){
        V.cf = SF.cleanPrice(text.substring(text.indexOf('Inventory ')+9, text.indexOf('c.f.')));
        VD.IWant(VD.ToEqual, V.cf, V.accountcbfWithInventory, 'поменялся вес, стал не по инвенторию');
    }),config.timeout);
    MF.Account_ClickProceedBookYourMove ();
    driver.wait(driver.findElement(By.xpath('//span[@ng-if="vm.request.move_size.raw == 11"]')).getText().then(function (text) {
        VD.IWant(VD.ToEqual, text, '- COMMERCIAL MOVE', 'после выбора мувсайза комершиал не сменился сервис тип на комершиал ');
    }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//h2[contains(text(),"Grand Total")]/following-sibling::span')).getText().then(function(text){
        V.ConfirmationTotal = SF.cleanPrice(text.substring(text.indexOf('$')));
        VD.IWant(VD.ToEqual, V.boardNumbers2PendingAfterAddInven.Total, V.ConfirmationTotal, 'не совпал гранд тотал в реквесте и на конфирмейшн пейдж');
    }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//h2[@ng-if="vm.isCommercial && vm.commercialName.length"]')).getText().then(function (text) {
        VD.IWant(VD.ToEqual, text, 'TrastovuyFond', 'не нашло имени компании на конфирмейшн');
    }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//span[@ng-if="!!vm.longDistancePackingTotal"]')).getText().then(function (text) {
        VD.IWant(VD.ToEqual, SF.cleanPrice(text), V.boardNumbers2PendingAfterAddInven.Packing, 'не совпал пакинг на конфирмейшн');
    }),config.timeout);
    SF.sleep(1);
    MF.Account_ConfirmationBackToRequest();
    LF.ConfirmRequestInAccount_WithReservation();

condition.nowWeDoing = 'идем в админку проверять что числа не поменялись, так же поменяем адрес закроем и откроем и проверим что все в норме';
    LF.LogoutFromAccount();
    SF.get(V.adminURL);
    LF.LoginToBoardAsCustom(V.adminLogin,V.adminPassword);
    MF.Board_OpenConfirmed();
    MF.Board_OpenRequest(V.boardNumbers.Id);
    SF.clear (By.id('edit-moving-from'));
    SF.send (By.id('edit-moving-from'), 'new adress from');
    SF.clear (By.xpath('//input[@ng-model="request.field_moving_to.thoroughfare"]'));
    SF.send (By.xpath('//input[@ng-model="request.field_moving_to.thoroughfare"]'), 'new adress to');
    MF.EditRequest_SaveChanges();
    LF.closeEditRequest();
    MF.Board_OpenRequest(V.boardNumbers.Id);
    V.boardNumbersAfterConfirm = {};
    LF.RememberDigitsRequestBoard (V.boardNumbersAfterConfirm);
    LF.Validation_Compare_Account_Admin (V.boardNumbersAfterConfirm, V.boardNumbers2PendingAfterAddInven);
    MF.EditRequest_CloseConfirmWork();
    MF.EditRequest_CloseJob();
    SF.click(By.xpath('//div[@class="request-view"]'));
    SF.openTab(1);
    SF.sleep(6);
    MF.Account_ClickViewConfirmationPage();
    driver.wait(driver.findElement(By.xpath('//h2[contains(text(),"Grand Total")]/following-sibling::span')).getText().then(function(text){
        V.ConfirmationTotal = SF.cleanPrice(text.substring(text.indexOf('$')));
        VD.IWant(VD.ToEqual, V.boardNumbers2PendingAfterAddInven.Total, V.ConfirmationTotal, 'не совпал гранд тотал в реквесте и на конфирмейшн пейдж');
    }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//h2[@ng-if="vm.isCommercial && vm.commercialName.length"]')).getText().then(function (text) {
        VD.IWant(VD.ToEqual, text, 'TrastovuyFond', 'не нашло имени компании на конфирмейшн после конферм и закрытия работы через админку');
    }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//span[@ng-if="!!vm.longDistancePackingTotal"]')).getText().then(function (text) {
        VD.IWant(VD.ToEqual, SF.cleanPrice(text), V.boardNumbers2PendingAfterAddInven.Packing, 'не совпал пакинг на конфирмейшн после конферм и закрытия работы через админк');
    }),config.timeout);
    SF.sleep(1);


    //=========================закончили писать тест=============================
    SF.endOfTest();
};
