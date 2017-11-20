module.exports = function main(SF, JS, MF, LF, JSstep, VD, V, By, until,FileDetector, system, condition, config,constants) {
    global.fiber = Fiber.current;
    V.client = {};
    V.client.name = SF.randomBukva(6) + '_t';
    V.client.fam = SF.randomBukva(6) + '_t';
    V.client.phone = SF.randomCifra(10);
    V.client.email = SF.randomBukvaSmall(6) + '@' + SF.randomBukvaSmall(4) + '.tes';
    V.client.passwd = 123;

    //=========================начинаем писать тест=============================
    SF.get(V.frontURL);

condition.nowWeDoing = 'создаем с фронтового сайта мувинг сторадж и на калькуляторе проверяем что в заголовке стоит комершиал';
    MF.FrontSite_ClickQuoteCalculator();
    MF.FrontSite_ClickDesireMoveDate();
    V.request={};
    driver.wait(driver.executeScript(JSstep.Click4DaysNewCalendar).then(function(MovDateFront){
        V.request.moveDate = MovDateFront;
    }), config.timeout);
    SF.sleep (0.5);
    MF.FrontSite_SelectServiceType(2);
    MF.FrontSite_ClickDeliveryDate();
    driver.wait(driver.executeScript(JSstep.Click8DaysNewCalendar).then(function(DelDateFront){
        V.request.DelDate = DelDateFront;
    }), config.timeout);
    MF.CreateRequest_SendZipToZipFrom('02136', '02032');
    MF.FrontDown_SelectMoveSize(11);
    MF.FrontSite_SelectCommercialExtraRooms(2);
    MF.FrontDown_SetEntrance();
    MF.FrontSite_ClickCalculate();
    MF.FrontSite_SetClientInfoDown(V.client);
    MF.FrontSite_SelectPreferedStartTime();
    MF.FrontSite_SelectPreferedDeliveryTime();
    MF.FrontSite_SelectGoogleSearch();
    MF.FrontSite_ClickGoToCalculatorResults();
    driver.wait(driver.findElement(By.xpath('//span[@ng-show="request.moveSize == 11"]')).getText().then(function (text) {
        VD.IWant(VD.ToEqual, text, '- Commercial Move', 'на фронтовом калькуляторе не отобразился сервис тип комершиал');
    }),config.timeout);
    MF.FrontSite_GoToConfirmation();
    MF.FrontSite_ViewRequestPage();
    SF.openTab(1);
    MF.Account_ClickViewRequest ();

condition.nowWeDoing = 'первый раз в аккаунте, добавляем инвенторий в сторадж реквест ТО, и проверяем что кубик фит стал таким сколкьо инвентаря добавили, что пишется сервис тип с комершиал' +
    'что мувсайз комершиал вместе с инвентарем и запоминаем все числа';
    LF.AccountLocalAddInventory();
    SF.sleep(15);
    driver.wait(driver.findElement(By.xpath('//span[@ng-if="vm.request.move_size.raw == 11"]')).getText().then(function (text) {
        VD.IWant(VD.ToEqual, text, '- COMMERCIAL MOVE', 'после выбора мувсайза комершиал не сменился сервис тип на комершиал на аккаунте To реквеста');
    }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//div[contains(text(),"Move Size")]/following-sibling::div[2]')).getText().then(function(text){
        V.accountcbfTo = SF.cleanPrice(text.substring(text.indexOf('Inventory ')+9, text.indexOf('c.f.')));
    }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//div[contains(text(),"Move Size")]/following-sibling::div[2]')).getText().then(function(text){
        V.accountMoveSize = text.substring('', text.indexOf('('));
        VD.IWant(VD.ToEqual, V.accountMoveSize, 'Commercial Move ', 'на аккаунте не отобразился move size - commercial  реквест To');
    }),config.timeout);
    SF.sleep(10);
    V.accountNumbersTo = {};
    LF.RememberAccountNumbers(V.accountNumbersTo);

condition.nowWeDoing = 'Идем в сторадж реквест FROM, и проверяем, что инвенторий скопировался в парный реквест ' +
    'что кубик фит стал таким сколкьо инвентаря добавили, что пишется сервис тип с комершиал' +
        'что мувсайз комершиал вместе с инвентарем и запоминаем все числа';
    MF.Account_ClickFromStorage();
    SF.sleep(10);
    driver.wait(driver.findElement(By.xpath('//div[contains(text(),"Move Size")]/following-sibling::div[2]')).getText().then(function(text){
        V.accountcbfFrom = SF.cleanPrice(text.substring(text.indexOf('Inventory')+9, text.indexOf('c.f.')));
        VD.IWant(VD.ToEqual, V.accountcbfTo, V.accountcbfFrom, 'не совпал кубик фит мувинга From с мувинг To');
    }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//div[contains(text(),"Move Size")]/following-sibling::div[2]')).getText().then(function(text){
        V.accountMoveSize = text.substring('', text.indexOf('('));
        VD.IWant(VD.ToEqual, V.accountMoveSize, 'Commercial Move ', 'на аккаунте не отобразился move size - commercial у парного from request');
    }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//span[@ng-if="vm.request.move_size.raw == 11"]')).getText().then(function (text) {
        VD.IWant(VD.ToEqual, text, '- COMMERCIAL MOVE', 'после выбора мувсайза комершиал не сменился сервис тип на комершиал на аккаунте From реквеста');
    }),config.timeout);
    V.accountNumbersFrom = {};
    LF.RememberAccountNumbers (V.accountNumbersFrom);
    LF.LogoutFromAccount();

condition.nowWeDoing = 'идем в админку, открываем реквест ТО, проверяем заголовок с комершиал, кубик фит, что есть инвентарь, что в списке комершиал остался наш выбранный мувсайз' +
    'и сравниваем все остальные цифры с аккаунтом';
    SF.get(V.adminURL);
    LF.LoginToBoardAsCustom (V.adminLogin, V.adminPassword);
    MF.Board_OpenRequest(V.accountNumbersTo.Id);
    MF.EditRequest_SetAdressFrom();
    driver.wait(driver.findElement(By.xpath('//li[@ng-click="removeItem($index)"]')).getText().then(function (text) {
        VD.IWant(VD.ToEqual, SF.cleanPrice(text), '5200', 'не совпал или не нашелся выбраный при создании мувсайз реквест To');
    }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//span[@ng-if="request.move_size.raw == 11"]')).getText().then(function (text) {
        VD.IWant(VD.ToEqual, text, '- COMMERCIAL MOVE', 'после выбора мувсайза комершиал не сменился сервис тип на комершиал реквест To')
    }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//span[contains(text(),"c.f.")]/preceding-sibling::span[1]')).getText().then(function(text){
        VD.IWant(VD.ToEqual, text, V.accountcbfTo, 'в админке не совпал кубик фит с аккаунтом реквест To');
    }),config.timeout);
    SF.sleep(0.5);
    V.boardNumbersTo = {};
    LF.RememberDigitsRequestBoard(V.boardNumbersTo);
    LF.Validation_Compare_Account_Admin (V.accountNumbersTo, V.boardNumbersTo);
    JS.step(JSstep.selectTruck((V.boardNumbersTo.LaborTimeMax + V.boardNumbersTo.TravelTime)/60));
    MF.WaitWhileBusy();
    MF.EditRequest_OpenClient();
    LF.SetClientPasswd(V.client.passwd);
    MF.EditRequest_OpenRequest();
    MF.EditRequest_SetToNotConfirmed();
    MF.EditRequest_SaveChanges();
    LF.closeEditRequest();

condition.nowWeDoing = 'идем в админку, открываем реквест FROM, проверяем заголовок с комершиал, кубик фит, что есть инвентарь, что в списке комершиал остался наш выбранный мувсайз' +
        'и сравниваем все остальные цифры с аккаунтом';
    MF.Board_OpenRequest(V.accountNumbersFrom.Id);
    MF.EditRequest_SetAdressTo();
    driver.wait(driver.findElement(By.xpath('//li[@ng-click="removeItem($index)"]')).getText().then(function (text) {
        VD.IWant(VD.ToEqual, SF.cleanPrice(text), '5200', 'не совпал или не нашелся выбраный при создании мувсайз реквест From');
    }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//span[@ng-if="request.move_size.raw == 11"]')).getText().then(function (text) {
        VD.IWant(VD.ToEqual, text, '- COMMERCIAL MOVE', 'после выбора мувсайза комершиал не сменился сервис тип на комершиал реквест From')
    }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//span[contains(text(),"c.f.")]/preceding-sibling::span[1]')).getText().then(function(text){
        VD.IWant(VD.ToEqual, text, V.accountcbfFrom, 'в админке не совпал кубик фит с аккаунтом реквест From');
    }),config.timeout);
    SF.sleep(0.5);
    V.boardNumbersFrom = {};
    LF.RememberDigitsRequestBoard(V.boardNumbersFrom);
    LF.Validation_Compare_Account_Admin (V.accountNumbersFrom, V.boardNumbersFrom);
    JS.step(JSstep.selectTruck((V.boardNumbersTo.LaborTimeMax + V.boardNumbersTo.TravelTime)/60));
    MF.WaitWhileBusy();
    MF.EditRequest_SetToNotConfirmed();
    MF.EditRequest_SaveChanges();
    LF.closeEditRequest();
    MF.Board_LogoutAdmin();

condition.nowWeDoing = 'второй раз в аккаунте, букаем работы и соответственно проверять что все цыфры совпадают и ничего не изменилось  to storage.';
    SF.get(V.accountURL);
    LF.LoginToAccountAsClient(V.client);
    MF.Account_CheckRequestStatus_NotConfirmed(V.accountNumbersTo.Id);
    MF.Account_OpenRequest(V.accountNumbersTo.Id);
    V.accountNumbersToNotConfirm={};
    LF.RememberAccountNumbers(V.accountNumbersToNotConfirm);
    LF.Validation_Compare_Account_Admin(V.accountNumbersToNotConfirm, V.accountNumbersTo);
    MF.Account_ClickProceedBookYourMove();

condition.nowWeDoing = 'перешли на конфирмейшн пейдж и сравним данные с бордом и потом букаем работу TO storage';
    driver.wait(driver.findElement(By.xpath('//span[@ng-if="vm.request.move_size.raw == 11"]')).getText().then(function (text) {
        VD.IWant(VD.ToEqual, text, '- COMMERCIAL MOVE', 'после выбора мувсайза комершиал не сменился сервис тип на комершиал  To storage')
    }),config.timeout);
    V.ConfirmationPageTo = {};
    driver.wait(driver.findElement(By.xpath('//h2[contains(text(), "Estimated Quote")]/following-sibling::div[1]/div')).getText().then(function (text) {
        if (text.indexOf('$', text.indexOf('$') + 3) !== -1) {
            V.ConfirmationPageTo.TotalMin = SF.cleanPrice(text.substring(text.indexOf('$'), text.indexOf('-')));
            V.ConfirmationPageTo.TotalMax = SF.cleanPrice(text.substring(text.indexOf('$', text.indexOf('$') + 3)));
        } else {
            V.ConfirmationPageTo.Total = SF.cleanPrice(text);
        }
    }),config.timeout);
    SF.sleep(1);
    driver.wait(driver.findElement(By.xpath('//h2[contains(text(),"Fuel Surcharge")]/..')).getText().then(function(text){
        V.ConfirmationPageTo.Fuel = SF.cleanPrice(text.substring(text.indexOf('$')));
    }),config.timeout);
    SF.sleep(1);
    driver.wait(driver.findElement(By.xpath('//h2[contains(text(),"Move Size")]/following-sibling::span[2]')).getText().then(function(text){
        V.ConfirmationPageTo.cbf = SF.cleanPrice(text.substring(text.indexOf('Inventory')+9, text.indexOf('c.f.')));
        VD.IWant(VD.ToEqual, V.ConfirmationPageTo.cbf, V.accountcbfTo, 'на конфирмейшн пейдж ту стораджа не показало кубик фит инвентаря или показало неправильно');
    }),config.timeout);
    VD.IWant(VD.ToEqual, V.ConfirmationPageTo.TotalMin, V.boardNumbersTo.TotalMin, 'не совпали TotalMin в конфирмейшн пейдж и борда до резервации To storage');
    VD.IWant(VD.ToEqual, V.ConfirmationPageTo.TotalMax, V.boardNumbersTo.TotalMax, 'не совпали TotalMax в конфирмейшн пейдж и борда до резервации To storage');
    VD.IWant(VD.ToEqual, V.ConfirmationPageTo.Fuel, V.boardNumbersTo.Fuel, 'не совпали Fuel в конфирмейшн пейдж и борда до резервации To storage');
    SF.sleep(1);
    MF.Account_ConfirmationBackToRequest ();
    LF.ConfirmRequestInAccount_WithReservation();

condition.nowWeDoing = 'второй раз в аккаунте, букаем работы и соответственно проверять что все цыфры совпадают и ничего не изменилось  from storage.';
    MF.Account_ClickFromStorage();
    V.accountNumbersFromNotConfirm={};
    LF.RememberAccountNumbers(V.accountNumbersFromNotConfirm);
    LF.Validation_Compare_Account_Admin(V.accountNumbersFromNotConfirm, V.accountNumbersFrom);
    MF.Account_ClickProceedBookYourMove();
    driver.wait(driver.findElement(By.xpath('//h2[contains(text(),"Move Size")]/following-sibling::span[2]')).getText().then(function(text){
        V.accountcbfFromNotConfirm = SF.cleanPrice(text.substring(text.indexOf('Inventory')+9, text.indexOf('c.f.')));
        VD.IWant(VD.ToEqual, V.ConfirmationPageTo.cbf, V.accountcbfFrom, 'не совпал кубик фит мувинга From с мувинг To после нот конферм на работе From');
    }),config.timeout);

condition.nowWeDoing = 'перешли на конфирмейшн пейдж и сравним данные с бордом и потом букаем работу From storage';
    driver.wait(driver.findElement(By.xpath('//span[@ng-if="vm.request.move_size.raw == 11"]')).getText().then(function (text) {
        VD.IWant(VD.ToEqual, text, '- COMMERCIAL MOVE', 'после выбора мувсайза комершиал не сменился сервис тип на комершиал  From storage')
    }),config.timeout);
    V.ConfirmationPageFrom = {};
    driver.wait(driver.findElement(By.xpath('//h2[contains(text(), "Estimated Quote")]/following-sibling::div[1]/div')).getText().then(function (text) {
        if (text.indexOf('$', text.indexOf('$') + 3) !== -1) {
            V.ConfirmationPageFrom.TotalMin = SF.cleanPrice(text.substring(text.indexOf('$'), text.indexOf('-')));
            V.ConfirmationPageFrom.TotalMax = SF.cleanPrice(text.substring(text.indexOf('$', text.indexOf('$') + 3)));
        } else {
            V.ConfirmationPageFrom.Total = SF.cleanPrice(text);
        }
    }),config.timeout);
    SF.sleep(1);
    driver.wait(driver.findElement(By.xpath('//h2[contains(text(),"Fuel Surcharge")]/..')).getText().then(function(text){
        V.ConfirmationPageFrom.Fuel = SF.cleanPrice(text.substring(text.indexOf('$')));
    }),config.timeout);
    SF.sleep(1);
    driver.wait(driver.findElement(By.xpath('//h2[contains(text(),"Move Size")]/following-sibling::span[2]')).getText().then(function(text){
        V.ConfirmationPageFrom.cbf = SF.cleanPrice(text.substring(text.indexOf('Inventory')+9, text.indexOf('c.f.')));
        VD.IWant(VD.ToEqual, V.ConfirmationPageFrom.cbf, V.ConfirmationPageTo.cbf, 'на конфирмейшн пейдж From стораджа не показало кубик фит инвентаря или показало неправильно');
    }),config.timeout);
    VD.IWant(VD.ToEqual, V.ConfirmationPageFrom.TotalMin, V.boardNumbersFrom.TotalMin, 'не совпали TotalMin в конфирмейшн пейдж и борда до резервации From storage');
    VD.IWant(VD.ToEqual, V.ConfirmationPageFrom.TotalMax, V.boardNumbersFrom.TotalMax, 'не совпали TotalMax в конфирмейшн пейдж и борда до резервации From storage');
    VD.IWant(VD.ToEqual, V.ConfirmationPageFrom.Fuel, V.boardNumbersFrom.Fuel, 'не совпали Fuel в конфирмейшн пейдж и борда до резервации From storage');
    SF.sleep(1);
    MF.Account_ConfirmationBackToRequest ();
    LF.ConfirmRequestInAccount_WithReservation();

    //=========================закончили писать тест=============================
    SF.endOfTest();
};
