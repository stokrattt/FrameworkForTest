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
    MF.EditRequest_AddPacking();
    SF.click(By.xpath('//label[@ng-click="openAddPackingModal();"]'));
    SF.waitForVisible (By.xpath('//li[@ng-click="addExtraCharges(extra_charge)"][1]'));
    SF.click(By.xpath('//input[@ng-model="add_extra_charge.quantity"][1]'));
    SF.clear(By.xpath('//input[@ng-model="add_extra_charge.quantity"][1]'));
    SF.send(By.xpath('//input[@ng-model="add_extra_charge.quantity"][1]'), '888');
    SF.click(By.xpath('//input[@ng-model="add_extra_charge.rate"][1]'));
    SF.clear(By.xpath('//input[@ng-model="add_extra_charge.rate"][1]'));
    SF.send(By.xpath('//input[@ng-model="add_extra_charge.rate"][1]'), '1');
    SF.click(By.xpath('//button[@ng-click="save()"]'));
    MF.WaitWhileBusy ();
    SF.sleep (5);
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
    V.boxCostAc = V.boardNumbers.Packing - V.accountNumbers.Packing;
    LF.Validation_Compare_Account_Admin(V.accountNumbers, V.boardNumbers);
    LF.ConfirmRequestInAccount_WithReservation();
    MF.Account_WaitForGreenTextAfterConfirm();
    LF.Account_CheckSignature();
    LF.LogoutFromAccount();

condition.nowWeDoing = 'второй раз в админке, локал диспатч, назначаю Add Crew';
    SF.get(V.adminURL);
    LF.LoginToBoardAsCustom(V.adminLogin,V.adminPassword);
    MF.Board_OpenLocalDispatch();
    LF.findDayInLocalDispatch(V.boardNumbers.moveDate.Year, V.boardNumbers.moveDate.Month, V.boardNumbers.moveDate.Day);
    MF.Dispatch_GridView();
    LF.SelectRequestDispatch(V.accountNumbers.Id);
    V.foremanName = 'Test Foreman';
    LF.selectCrew(V.foremanName);
    MF.Dispach_ClickAddCrew();
    SF.click(By.xpath('//select[@ng-model="crew.helpers[$index]"]'));
    SF.sleep(1);
    SF.click(By.xpath("//label[contains(text(),'Additional Helpers')]/following-sibling::div" +
        "[@ng-repeat='addHelper in crew.helpers track by $index']/select[@ng-model='crew.helpers[$index]']//option[contains(text(),'helper test1')]"));
    SF.sleep(1);
    SF.click(By.xpath('//a[@ng-click="vm.openSettingsModal($index)"]'));
    MF.WaitWhileBusy();
    driver.wait(driver.findElement(By.xpath('//input[@ng-model="rate.value"]')).getAttribute('value').then(function(text){
        V.RateCrew = SF.cleanPrice(text);
                    }),config.timeout);
    SF.click(By.xpath('//button[@ng-click="saveSettings()"]'));
    MF.WaitWhileBusy ();
    JS.click('a[ng-click=\\"vm.assignTeam(request)\\"]:visible');
    MF.WaitWhileBusy();
    SF.sleep(4);
    JS.waitForNotExist('div.toast-success:visible');
    JS.waitForNotExist('div.toast-message:visible');
    MF.Board_LogoutAdmin();

condition.nowWeDoing = 'заходим под форменом,проверяем наличие коробок в конфирмеишен, и сумму коробок в бил оф лендинг ';
    LF.LoginToBoardAsCustomForeman(V.foremanLogin, V.foremanPassword);
    LF.OpenRequestInForemanPage(V.accountNumbers.Id);
    MF.Contract_WaitConfirmationPage();
    driver.wait(driver.findElement(By.xpath('//div[contains(text(), "Custom Packing:")]')).getText().then(function(text){
        V.BoxCust2 = text;
        VD.IWant(VD.ToEqual, V.BoxCust, V.BoxCust2, 'не совпали коробки');
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
    MF.Contract_OpenBillOfLading();
    SF.sleep(1);
    MF.WaitWhileBusy();
    LF.MakeSignInContract();
    LF.MakeSignInContract();
    MF.Contract_DeclarationValueA();
    LF.MakeSignInContract();
    LF.MakeSignInContract();
    LF.MakeSignInContract();
    MF.WaitWhileBusy();
    SF.click(By.xpath('//a[@ng-click="addCrew()"]'));
    MF.WaitWhileBusy ();
    LF.MakeSignInContract();
    LF.MakeSignInContract();
    driver.wait(driver.findElement(By.xpath('//th[contains(text(),"CREW 2")]/following-sibling::td[3]')).getText().then(function(text){
        V.RateContr = SF.cleanPrice(text);
        VD.IWant(VD.ToEqual, V.RateCrew, V.RateContr, 'Rate не совпадает');
    }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//div[@id="main-contract"]//p[contains(text(),"total packing charges")]/../following-sibling::td')).getText().then(function(text){
        V.PackingContract = SF.cleanPrice(text);
        VD.IWant(VD.ToEqual, V.PackingContract, V.boxCostAc, 'Не совпали суммы коробок аккаунт и контракт');
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
//
// condition.nowWeDoing = 'тут идем в админку открываем реквест, переходим на контракт и проверяем что наши коменты сохранилисб и отображаются';
//     LF.LoginToBoardAsCustom(V.adminLogin,V.adminPassword);
//     MF.Board_OpenConfirmed();
//     MF.Board_OpenRequest(V.accountNumbers.Id);
//     SF.click(By.xpath('//a[@ng-show="states.invoiceState"]'));
//     SF.openTab(1);
//     SF.sleep (3);
//     MF.Contract_OpenBillOfLading();
//     MF.Contract_WaitBillOfLading ();


    SF.endOfTest();
    };


