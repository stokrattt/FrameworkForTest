module.exports = function main(SF, JS, MF, LF, JSstep, VD, V, By, until,FileDetector, system, condition, config,constants){
    global.fiber = Fiber.current;
    V.client = {};
    V.client.name = SF.randomBukva(6) + '_t';
    V.client.fam = SF.randomBukva(6) + '_t';
    V.client.phone = SF.randomCifra(10);
    V.client.email = SF.randomBukvaSmall(6) + '@' + SF.randomBukvaSmall(4) + '.tes';
    V.client.passwd = 123;
    SF.get(V.frontURL);

condition.nowWeDoing = 'заполняем калькулятор верхний';
    LF.FullSmallCalcAsLocal(V.client);

condition.nowWeDoing = 'первый раз в аккаунте, добавляю Partial Packing';
    MF.Account_ClickViewRequest();
    MF.Account_ClickPartialPacking();
    LF.AccountLocalEnterAddress();
    LF.AccountLocalAddInventory();
    LF.AccountLocalDetails();
    MF.Account_WaitForInventoryCheck();
    MF.Account_WaitForDetailsCheck();
    SF.sleep(3);
    V.accountNumbers={};
    LF.RememberAccountNumbers(V.accountNumbers);
    // LF.addToCleanerJob(V.accountNumbers.Id);
    LF.LogoutFromAccount();

condition.nowWeDoing = 'первый раз в админке,сверяю тотал, добавляю коробки, захожу еще раз в пакинг и меняю размер и цену пакинга';
    SF.get(V.adminURL);
    LF.LoginToBoardAsCustom(V.adminLogin,V.adminPassword);
    MF.Board_OpenRequest(V.accountNumbers.Id);
    V.boardNumbers = {};
    LF.RememberDigitsRequestBoard(V.boardNumbers);
    LF.Validation_Compare_Account_Admin(V.accountNumbers, V.boardNumbers);
    JS.step(JSstep.selectTruck((V.boardNumbers.LaborTimeMax + V.boardNumbers.TravelTime)/60));
    MF.WaitWhileBusy();
    V.managerFirstName = 'emilia';
    MF.EditRequest_OpenSettings();
    LF.SetManager(V.managerFirstName);
    MF.EditRequest_OpenClient();
    LF.SetClientPasswd(V.client.passwd);
    MF.EditRequest_OpenRequest();
    LF.EditRequest_AddPacking();
    LF.EditRequest_AddCustomPacking(888, 1);
    MF.EditRequest_SetToNotConfirmed();
    MF.EditRequest_SaveChanges();
    V.boardNumbers = {};
    LF.RememberDigitsRequestBoard(V.boardNumbers);
    LF.closeEditRequest();
    MF.Board_LogoutAdmin();

condition.nowWeDoing = 'второй раз в аккаунте,проверяю наличие коробок, сравниваю тотал packing с реквестом';
    SF.get(V.accountURL);
    LF.LoginToAccountAsClient(V.client);
    MF.Account_CheckRequestStatus_NotConfirmed(V.accountNumbers.Id);
    MF.Account_OpenRequest(V.accountNumbers.Id);
    driver.wait(driver.findElement(By.xpath('//div[@ng-show="vm.isVisiblePackingTotal()"]/div[2]')).getText().then(function(text) {
        V.cleanTotalPacking = SF.cleanPrice(text);
        VD.IWant(VD.ToEqual, V.cleanTotalPacking, V.boardNumbers.Packing,'не совпала новая сумма packing');
    }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//div[contains(text(), "Custom Packing:")]')).getText().then(function(text){
        V.BoxCust = text;
    }),config.timeout);
        driver.wait(driver.findElement(By.xpath('//div[contains(text(),"Small Box:")]')).getText().then(function(text){
        V.BoxSm = text;
        }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//div[contains(text(),"Estimate Partial Packing:")]')).getText().then(function(text){
       V.EstPP = text;
       }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//div[contains(text(),"Middium Box")]')).getText().then(function(text){
       V.BoxMed = text;
       }),config.timeout);
    SF.sleep(1);
    V.accountNumbers = {};
    LF.RememberAccountNumbers(V.accountNumbers);
    SF.sleep(1);
    V.boxCostAc = V.boardNumbers.Packing - 888;
    LF.Validation_Compare_Account_Admin(V.accountNumbers, V.boardNumbers);
    LF.ConfirmRequestInAccount_WithReservation();
    MF.Account_WaitForGreenTextAfterConfirm();
    LF.Account_CheckSignature();
    LF.LogoutFromAccount();

condition.nowWeDoing = 'второй раз в админке, локал диспатч, назначаю Add Crew добаавляем пакинг на клозинге и адишинал сервисы, закроем и откроем реквест и проверим что все сохранилось';
    SF.get(V.adminURL);
    LF.LoginToBoardAsCustom(V.adminLogin,V.adminPassword);
    MF.Board_OpenLocalDispatch();
    LF.findDayInLocalDispatch(V.boardNumbers.moveDate.Year, V.boardNumbers.moveDate.Month, V.boardNumbers.moveDate.Day);
    MF.Dispatch_GridView();
    LF.OpenRequestDispatch(V.accountNumbers.Id);
    MF.EditRequest_WaitForBalanceVisible();
    driver.wait(driver.executeScript("return $('speedy-inventory-icon[speedy-field=\"request.field_speedy_id\"]').length").then(function (text) {
        VD.IWant(VD.ToEqual, text, 1, 'не нашло спиди значок на конферм работе');
    }),config.timeout);
    LF.EditRequest_AddSpecialPackingClosingTab();
    LF.EditRequest_AddAdditionalServClosingTab();
    driver.wait(driver.executeScript('return $(\'div.PackingCost:visible\').text()').then(function (text) {
        V.ClosingPacking = SF.cleanPrice(text.substring(text.indexOf('$')));
    }), config.timeout);
    driver.wait(driver.executeScript('return $(\'div.ServicesCost:visible\').text()').then(function (text) {
        V.ClosingAdServices = SF.cleanPrice(text.substring(text.indexOf('$')));
    }), config.timeout);
    SF.sleep(5);
    LF.closeEditRequest();
    LF.OpenRequestDispatch(V.accountNumbers.Id);
    MF.EditRequest_WaitForBalanceVisible();
    driver.wait(driver.executeScript('return $(\'div.PackingCost:visible\').text()').then(function (text) {
        V.ClosingPackingAfterReopenRequest = SF.cleanPrice(text.substring(text.indexOf('$')));
        VD.IWant(VD.ToEqual, V.ClosingPacking, V.ClosingPackingAfterReopenRequest, 'не совпал пекинг после того как мы добавили пакинг на клозинге закрыли реквест и открыли для проверки')
    }), config.timeout);
    driver.wait(driver.executeScript('return $(\'div.ServicesCost:visible\').text()').then(function (text) {
        V.ClosingAdServicesAfterReopenRequest = SF.cleanPrice(text.substring(text.indexOf('$')));
        VD.IWant(VD.ToEqual, V.ClosingAdServices, V.ClosingAdServicesAfterReopenRequest, 'не совпал AdServices после того как мы добавили AdServices на клозинге закрыли реквест и открыли для проверки')
    }), config.timeout);
    LF.closeEditRequest();
    V.foremanName = 'Test Foreman';
    LF.selectCrew(V.foremanName);
    MF.Dispach_ClickAddCrew();
    MF.Dispach_SetHelperInAddCrew();
    SF.click(By.xpath('//a[@ng-click="vm.openSettingsModal($index)"]'));
    MF.WaitWhileBusy();
    driver.wait(driver.findElement(By.xpath('//input[@ng-model="rate.value"]')).getAttribute('value').then(function(text){
        V.RateCrew = SF.cleanPrice(text);
    }),config.timeout);
    SF.click(By.xpath('//button[@ng-click="saveSettings()"]'));
    MF.WaitWhileBusy ();
    JS.click('button[ng-click=\\"vm.assignTeam(request)\\"]:visible');
    MF.WaitWhileBusy();
    SF.sleep(4);
    MF.WaitWhileToaster();
    MF.Board_LogoutAdmin();

condition.nowWeDoing = 'заходим под форменом,проверяем наличие коробок в конфирмеишен, чтоо там не стало больше чем нужно, и сумму коробок в бил оф лендинг и то что екстра сервисы и пекинг который добавлен на клозинге есть на BOL';
    LF.LoginToBoardAsCustomForeman(V.foremanLogin, V.foremanPassword);
    LF.OpenRequestInForemanPage(V.accountNumbers.Id);
    MF.Contract_WaitConfirmationPage();
    driver.wait(driver.findElement(By.xpath('//div[contains(text(), "Custom Packing:")]')).getText().then(function(text){
        V.BoxCust2 = text;
        VD.IWant(VD.ToEqual, V.BoxCust, V.BoxCust2, 'не совпали коробки сумма их не совпала');
    }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//div[contains(text(),"Small Box:")]')).getText().then(function(text){
        V.BoxSm2 = text;
        VD.IWant(VD.ToEqual, V.BoxSm, V.BoxSm2, 'не совпали коробки');
    }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//div[contains(text(),"Estimate Partial Packing:")]')).getText().then(function(text){
        V.EstPP2 = text;
        VD.IWant(VD.ToEqual, V.EstPP, V.EstPP2, 'не совпал Packing');
    }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//div[contains(text(),"Middium Box")]')).getText().then(function(text){
        V.BoxMed2 = text;
        VD.IWant(VD.ToEqual, V.BoxMed, V.BoxMed2, 'не совпали коробки');
    }),config.timeout);
    driver.wait(driver.executeScript("return $('div[ng-repeat=\"packing in vm.packings\"]').length").then(function (text) {
        VD.IWant(VD.ToEqual, text, 4, 'на конфирмешине добавился пакинг который мы добавили на клозинге в реквесте, а не должен был');
    }),config.timeout);
    MF.Contract_OpenBillOfLading();
    LF.MakeSignInContract();
    driver.wait(driver.findElement(By.xpath('//tr[@ng-if="showAddPackingBtn()"]/following-sibling::tr/td[@ng-if="request.service_type.raw != \'7\' && request.service_type.raw != \'5\'"]/following-sibling::td')).getText().then(function (text) {
        V.totalPackingContract = SF.cleanPrice(text);
        VD.IWant(VD.ToEqual, V.totalPackingContract, V.ClosingPacking, 'на контракте не появился пекинг который мы добавили в реквесте на табе клозинг или не совпала сумма');
    }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//tr[@ng-if="showAddServicesBtn()"]/following-sibling::tr/td[@ng-if="request.service_type.raw != \'7\' && request.service_type.raw != \'5\'"]/following-sibling::td')).getText().then(function (text) {
        V.totalAddServices = SF.cleanPrice(text);
        VD.IWant(VD.ToEqual, V.totalAddServices, V.ClosingAdServices, 'на контракте не появился адишинал сервис который мы добавили в реквесте на табе клозинг или не совпала сумма');
    }),config.timeout);
    LF.MakeSignInContract();
    MF.Contract_DeclarationValueA();
    LF.MakeSignInContract();
    LF.MakeSignInContract();
    LF.MakeSignInContract();
    MF.Contract_ClickAddCrew();
    LF.MakeSignInContract();
    LF.MakeSignInContract();
    driver.wait(driver.findElement(By.xpath('//th[contains(text(),"CREW 2")]/following-sibling::td[3]')).getText().then(function(text){
        V.RateContr = SF.cleanPrice(text);
        VD.IWant(VD.ToEqual, V.RateCrew + V.boardNumbers.HourlyRate, V.RateContr, 'Rate Crew 2 не совпадает');
    }),config.timeout);
    MF.Contract_ClickPay();
    MF.Contract_ClickTips10();
    MF.Contract_ClickAddTips();
    MF.Contract_ClickPaymentInfo();
    LF.FillCardPayModal();
    LF.Contract_SignMainPayment();
    driver.wait(new FileDetector().handleFile(driver, system.path.resolve('./files/squirrel.jpg')).then(function (path) {
        V.path = path;
    }), config.timeout);
    SF.sleep(1);
    MF.Contract_UploadImage(V.path);
    MF.Contract_UploadImage(V.path);
    MF.Contract_SaveImages();
    SF.sleep(1);
    SF.send(By.xpath('//textarea[@ng-model="data.req_comment"]'), 'test comment 2019');

condition.nowWeDoing = 'тут оставляем коменты на контракте для слeдующей их проверки';
    LF.MakeSignInContract();
    LF.MakeSignInContract();
    V.contractNumbers = {};
    MF.Contract_Submit(V.contractNumbers);
    MF.Contract_ReturnToForeman();
    LF.LogoutFromBoardForeman();

condition.nowWeDoing = 'возвращаемся в мувборд, и проверим что в реквесте на табе клозинг все осталось на своих местах и что баланс равен нулю и что пекинги и екстра сервисы есть';
    LF.LoginToBoardAsCustom(V.adminLogin,V.adminPassword);
    MF.Board_OpenConfirmed();
    MF.Board_OpenRequest(V.accountNumbers.Id);
    MF.EditRequest_WaitForBalanceVisible();
    LF.RememberDigitsRequestBoard_Down(V.boardNumbers);
    MF.EditRequest_ScrollDown();
    VD.IWant(VD.ToEqual, V.boardNumbers.Packing, V.totalPackingContract, 'пакинг добавленный на контракте не отобразился или не совпадает с реквестом на клозинге');
    VD.IWant(VD.ToEqual, V.boardNumbers.AdServices, V.totalAddServices, 'additional services добавленный на контракте не отобразился или не совпадает с реквестом на клозинге');
    MF.EditRequest_OpenLogs();
    SF.click(By.xpath('//span[@ng-show="!allLogsShow[allLogsIndex]"]'));
    SF.click(By.linkText('VIEW CONTRACT PAGE'));
    SF.openTab(1);
    SF.sleep(2);
    SF.waitForVisible(By.xpath('//print-download[@class="download-row"]'));
    driver.wait(driver.executeScript("return $('img[ng-if=\"showContractImage && data.isSubmitted\"]').length").then(function (text) {
        VD.IWant(VD.ToEqual, text, 1, 'Не появился контракт после перехода по ссылке в логах');
    }),config.timeout);
    SF.sleep(1.5);

    SF.endOfTest();
    };


