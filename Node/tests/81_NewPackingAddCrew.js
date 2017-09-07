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
    MF.WaitWhileBusy();
    SF.sleep(5);
    MF.WaitWhileBusy();
    MF.Account_ClickPartialPacking();
    LF.AccountLocalEnterAddress();
    LF.AccountLocalAddInventory();
    LF.AccountLocalDetails();
    MF.Account_WaitForInventoryCheck();
    MF.Account_WaitForDetailsCheck();
    MF.WaitWhileBusy();
    V.accountNumbers={};
    LF.RememberAccountNumbers(V.accountNumbers);
    LF.addToCleanerJob(V.accountNumbers.Id);
    LF.LogoutFromAccount();

    condition.nowWeDoing = 'первый раз в админке,сверяю тотал, добавляю коробки';
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
    MF.EditRequest_SetToNotConfirmed();
    MF.EditRequest_SaveChanges();
    V.boardNumbers = {};
    LF.RememberDigitsRequestBoard(V.boardNumbers);
    LF.closeEditRequest();
    SF.sleep(2);
    MF.Board_LogoutAdmin();


    condition.nowWeDoing = 'второй раз в аккаунте,проверяю наличие коробок, сравниваю тотал packing с реквестом';
    SF.get(V.accountURL);
    LF.LoginToAccountAsClient(V.client);
    MF.Account_CheckRequestStatus_NotConfirmed(V.accountNumbers.Id);
    MF.Account_OpenRequest(V.accountNumbers.Id);
    MF.WaitWhileBusy();
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
    MF.WaitWhileBusy();
    LF.ConfirmRequestInAccount_WithReservation();
    MF.Account_WaitForGreenTextAfterConfirm();
    LF.Account_CheckSignature();
    LF.LogoutFromAccount();

    condition.nowWeDoing = 'второй раз в админке, локал диспатч, назначаю Add Crew';
    SF.get(V.adminURL);
    LF.LoginToBoardAsCustom(V.adminLogin,V.adminPassword);
    MF.Board_OpenLocalDispatch();
    LF.findDayInLocalDispatch(V.boardNumbers.moveDate.Year, V.boardNumbers.moveDate.Month, V.boardNumbers.moveDate.Day);
    MF.WaitWhileBusy();
    MF.WaitWhileBusy();
    MF.Dispatch_GridView();
    LF.SelectRequestDispatch(V.accountNumbers.Id);
    LF.selectCrew(V.foremanName);
    SF.click(By.xpath('//a[@title="Add crew"]'));
    MF.WaitWhileBusy ();
    SF.click(By.xpath('//select[@ng-model="crew.helpers[$index]"]'));
    SF.sleep(1);
    SF.click(By.xpath("//label[contains(text(),'Additional Helpers')]/following-sibling::div[@ng-repeat='addHelper in crew.helpers track by $index']/select[@ng-model='crew.helpers[$index]']//option[contains(text(),'helper test1')]"));
    SF.sleep(1);
    SF.click(By.xpath('//a[@ng-click="vm.openSettingsModal($index)"]'));
    MF.WaitWhileBusy();
    driver.wait(driver.findElement(By.xpath('//input[@ng-model="rate.value"]')).getAttribute('value').then(function(text){
        V.RateCrew = SF.cleanPrice(text);
                    }),config.timeout);
    SF.click(By.xpath('//button[@ng-click="saveSettings()"]'));
    MF.WaitWhileBusy ();
    JS.click('a[ng-click=\\"vm.assignTeam(request)\\"]:visible');
    MF.WaitWhileToaster();
    MF.Board_LogoutAdmin();

    condition.nowWeDoing = 'заходим под форменом,проверяем наличие коробок в конфирмеишен, и сумму коробок в бил оф лендинг ';
    LF.LoginToBoardAsCustomForeman(V.foremanLogin, V.foremanPassword);
    LF.OpenRequestDispatch(V.accountNumbers.Id);
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
    SF.sleep(1);
    LF.MakeSignInContract();
    LF.MakeSignInContract();
    MF.Contract_DeclarationValueA();
    LF.MakeSignInContract();
    LF.MakeSignInContract();
    LF.MakeSignInContract();
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
        VD.IWant(VD.NotToEqual, V.PackingContract, V.cleanTotalPacking, 'Cовпали суммы коробок');
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
    SF.sleep(3);
    MF.Contract_UploadImage(V.path);
    MF.Contract_UploadImage(V.path);
    MF.Contract_SaveImages();
    LF.MakeSignInContract();
    LF.MakeSignInContract();
    MF.Contract_Submit();
    MF.Contract_ReturnToForeman();
    LF.LogoutFromBoardForeman();

        SF.endOfTest();
    };


