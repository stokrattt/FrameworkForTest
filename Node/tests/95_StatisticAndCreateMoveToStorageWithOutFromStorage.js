module.exports = function main(SF, JS, MF, LF, JSstep, VD, V, By, until,FileDetector, system, condition, config,constants) {
    global.fiber = Fiber.current;
    V.client = {};
    V.client.name = SF.randomBukva(6) + '_t';
    V.client.fam = SF.randomBukva(6) + '_t';
    V.client.phone = SF.randomCifra(10);
    V.client.email = SF.randomBukvaSmall(6) + '@' + SF.randomBukvaSmall(4) + '.tes';
    V.client.passwd = 123;
    V.salesLogin = 'Emilia';
    V.salesPassword = '123';

    //=========================начинаем писать тест=============================
    SF.get(V.adminURL);
    LF.LoginToBoardAsCustom(V.adminLogin,V.adminPassword);

condition.nowWeDoing = 'запоминаем на дашборде кол-во конфермнутых работ по Move дата и Booked дата';
    MF.Board_OpenConfirmed();
    SF.click(By.xpath('//select[@ng-model="vm.searchParams.conf_filter"]/option[contains(text(),"Booked This month")]'));
    SF.sleep(1);
    driver.wait(driver.findElement(By.xpath('//div[@ng-click="vm.select(2)"]//span[@ng-show="vm.searchParams.conf_filter == 1"]')).getText().then(function (text) {
        V.ConfBoard = SF.cleanPrice(text);
    }),config.timeout);
    SF.sleep(1);

condition.nowWeDoing = 'открываем статистику и проверяем там цифры';
    MF.Board_OpenStatistic ();
    MF.WaitWhileBusy();
    MF.WaitWhileBusy();
    MF.WaitWhileBusy();
    driver.wait(driver.findElement(By.xpath('//div[@class="statistics-conversions"][3]')).getText().then(function(text) {
        V.Confirmedinperiod = SF.cleanPrice(text);
        VD.IWant(VD.ToEqual, V.Confirmedinperiod, V.ConfBoard,'не совпал Common stat и работы из дашборда');
    }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//statistic-table[@index="5"]//tr[@class="advanced-info-total"]/td[3]')).getText().then(function(text) {
        V.Source = SF.cleanPrice(text);
        VD.IWant(VD.ToEqual, V.Source, V.Confirmedinperiod,'не совпал  Source и Common stat');
    }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//statistic-table[@index="4"]//tr[@class="advanced-info-total"]/td[3]')).getText().then(function(text) {
        V.Size = SF.cleanPrice(text);
        VD.IWant(VD.ToEqual, V.Size, V.Confirmedinperiod,'не совпал Size of Move и Common stat');
    }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//statistic-table[@index="5"]//tr[@class="advanced-info-total"]/td[3]')).getText().then(function(text) {
        V.SerType = SF.cleanPrice(text);
        VD.IWant(VD.ToEqual, V.SerType, V.Confirmedinperiod,'не совпал Service Type и Common stat');
    }),config.timeout);

condition.nowWeDoing = 'запоминаем кол-во Amount и Booked, и ассаин за тудэй у сеилса Эмилия';
    driver.wait(driver.findElement(By.xpath('//td[contains(text(), "emilia clark")]/following-sibling::td[1]')).getText().then(function (text) {
        V.SalesAmount = SF.cleanPrice(text);
    }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//td[contains(text(), "emilia clark")]/following-sibling::td[2]')).getText().then(function (text) {
        V.SalesBooked = SF.cleanPrice(text);
    }),config.timeout);
    SF.sleep(1);
    SF.click(By.xpath('//statistic-table[@header="vm.HEADING_TABLES[0]"]//span[@class="switchery switchery-small"]'));
    MF.WaitWhileBusy ();
    SF.sleep(2);
    driver.wait(driver.findElement(By.xpath('//tr[@ng-repeat="data in tableData track by $index"]//td[contains(text(), "emilia clark")]/following-sibling::td[1]')).getText().then(function (text) {
        V.SalesAssignToday = SF.cleanPrice(text);
    }),config.timeout);

condition.nowWeDoing = 'запоминаем Estimate Income';
    SF.sleep(2);
    driver.wait(driver.findElement(By.xpath('//chart-statistic-tab[@ng-if="vm.halfYearProfit"]//p[@class="no-margins"]')).getText().then(function (text) {
        V.EstIncStat = SF.cleanPrice(text);
    }),config.timeout);
    SF.sleep(1);

condition.nowWeDoing = 'идем в профит анд лосс, сверяем Estimate Income';
    MF.Board_OpenProfitLoss ();
    driver.wait(driver.findElement(By.xpath('//div[@class="panel-body redBox"]/span[1]')).getText().then(function(text) {
        V.EstIncPrLos = SF.cleanPrice(text);
        VD.IWant(VD.ToEqual, V.EstIncPrLos, V.EstIncStat,'не совпал Estimate Income в профит анд лосс и статистике');
    }),config.timeout);
    MF.Board_LogoutAdmin();

condition.nowWeDoing = 'заходим за сеилса, в статистике сверяем кол-во забуканных и общее кол-во работ со страницей оунера';
    LF.LoginToBoardAsCustom(V.salesLogin, V.salesPassword);
    MF.Board_OpenStatistic ();
    MF.WaitWhileBusy();
    MF.WaitWhileBusy();
    MF.WaitWhileBusy();
    MF.WaitWhileBusy();
    driver.wait(driver.findElement(By.xpath('//chart-statistic-tab[@ng-if="vm.request_daily"]//p[@class="no-margins"]')).getText().then(function(text) {
        V.SalesBookedSalesPageTableAssignToday = SF.cleanPrice(text);
        VD.IWant(VD.ToEqual, V.SalesAssignToday, V.SalesBookedSalesPageTableAssignToday,'не совпало кол-во ассаинутых работ за Today с оунерпеидж и салеспеидж в верхней табличке Assign');
    }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//div[@class="col-lg-3"]//p[@class="no-margins margtop"]')).getText().then(function(text) {
        V.SalesAmountAsMainSales = SF.cleanPrice(text);
    }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//div[@class="col-lg-3"]//p[@ng-if="!!vm.secondConfirmedJobs"]')).getText().then(function(text) {
        V.SalesAmountAsAdditionalSales = SF.cleanPrice(text);
        }),config.timeout);
    SF.sleep(1);
    V.SalesCommonAmountSalesPage = V.SalesAmountAsMainSales + V.SalesAmountAsAdditionalSales;
    SF.sleep(1);
    VD.IWant(VD.ToEqual, V.SalesAmount, V.SalesCommonAmountSalesPage,'не совпало общее кол-во работ оунерпеидж/салеспеидж из коммон стата');
    driver.wait(driver.findElement(By.xpath('//div[@class="col-lg-3"]//p[@class="no-margins margtop"][2]')).getText().then(function(text) {
        V.SalesBookedSalesPageCommonStat = SF.cleanPrice(text);
        VD.IWant(VD.ToEqual,V.SalesBooked, V.SalesBookedSalesPageCommonStat,'не совпало общее кол-во забуканных работ оунерпеидж/салеспеидж из коммон стата');
    }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//chart-statistic-tab[@ng-if="vm.confirmed_monthly"]//p[@class="no-margins"]')).getText().then(function(text) {
        V.SalesBookedSalesPageTableBooked = SF.cleanPrice(text);
        VD.IWant(VD.ToEqual, V.SalesBookedSalesPageCommonStat, V.SalesBookedSalesPageTableBooked,'не совпало кол-во забуканных работ в коммон стате, и верхней табличке Booked');
    }),config.timeout);
    SF.sleep(1);

condition.nowWeDoing = 'создаем draft request, делаем из него move to storage без from storage' +
        'переводим в статус нот конферм, ставим трак, меняем zip code, добавляем packing and additional services,';

    MF.Board_CreateDraftRequest();
    JS.scroll('select[id="edit-service"]');
    SF.click(By.xpath('//select[@id="edit-service"]/option[@value=2]'));
    MF.SweetCancel();
    V.boardNumbers = {};
    MF.EditRequest_SetAdressFrom();
    MF.EditRequest_SetZipCodeFrom('01970');
    MF.EditRequest_OpenInventoryTab();
    LF.addInventoryBoard(V.boardNumbers);
    MF.EditRequest_OpenRequest();
    JS.step(JSstep.selectTruck(4));
    MF.WaitWhileBusy();
    MF.EditRequest_SetToNotConfirmed();
    LF.EditRequest_AddPackingAndFullPAcking();
    LF.EditRequest_AddAdditionalServicesFullPack();
    V.boardNumbersAfterInventory = {};
    LF.RememberDigitsRequestBoard(V.boardNumbersAfterInventory);
    MF.EditRequest_SaveChanges();
    MF.EditRequest_OpenClient();
    LF.SendClientInfoForDraftRequest(V.client);
    LF.SetClientPasswd(V.client.passwd);
    MF.EditRequest_CloseEditRequest();
    MF.Board_LogoutAdmin();

condition.nowWeDoing = 'идем на аккаунт,что бы сравнить числа и забукать работу';
    SF.get(V.accountURL);
    LF.LoginToAccountAsClient(V.client);
    MF.Account_OpenRequest(V.boardNumbersAfterInventory.Id);
    MF.Account_ClickViewRequest();
    V.accountNumbers = {};
    LF.RememberAccountNumbers(V.accountNumbers);
    LF.Validation_Compare_Account_Admin(V.accountNumbers,V.boardNumbersAfterInventory);
    MF.Account_ClickProceedBookYourMove();
    MF.Account_ClickIAgreeWithAll();
    MF.Account_ConfirmationClickPayDeposit();
    LF.MakeSignJS('signatureCanvasReserv');
    MF.Account_ConfirmationClickSaveSignature();
    LF.FillCardPayModal();
    MF.WaitWhileSpinner();
    MF.Account_WaitForGreenTextAfterConfirm();
    LF.LogoutFromAccount();

condition.nowWeDoing = 'возвращаемся на moveboard, что бы проверить что наш реквест в табе confirmed';
    SF.get(V.adminURL);
    LF.LoginToBoardAsCustom(V.salesLogin,V.salesPassword);
    MF.Board_OpenConfirmed();
    driver.wait(driver.findElement(By.xpath('//td[contains(text(), "' + V.boardNumbersAfterInventory.Id + '")]')).getText().then(function (text) {
        VD.IWant(VD.ToEqual, SF.cleanPrice(text), V.boardNumbersAfterInventory.Id, 'реквеста нет в табе Confirmed после оплаты резервации')
    }), config.timeout);
    MF.Board_OpenRequest(V.boardNumbersAfterInventory.Id);
    MF.EditRequest_CloseConfirmWork();
    MF.EditRequest_OpenContractCloseJob();
    SF.openTab(1);
    MF.SweetConfirm();

condition.nowWeDoing = 'пришли на контракт, начинаем добавлять обычный инвентарь, добавляем адишинал инвентарь и его же заносим в сторадж';
    MF.Contract_OpenInventory();
    LF.Contract_AddInventory(9);
    MF.Contract_SetTapeNumber(1);
    MF.Contract_SetTapeColorGreen('Green');
    LF.MakeSignInInventory(0);
    LF.MakeSignInInventory(1);
    MF.Contract_SubmitInventory();
    MF.SweetConfirm();
    LF.ContractAdditionalInventoryAdd();
    SF.click(By.xpath('//span[contains(text(), "Save Inventory")]'));
    SF.click(By.xpath('//canvas[@id="signatureCanvasAgreement"]'));
    LF.MakeSignJS("signatureCanvasAgreement");
    SF.click(By.xpath('//button[@ng-click="saveService()"]'));
    SF.sleep(2);
    LF.Contract_AddInventory(9);
    MF.Contract_SetTapeNumber(1);
    MF.Contract_SetTapeColorGreen('Green');
    LF.MakeSignInAddInventory(0);
    LF.MakeSignInAddInventory(1);
    MF.Contract_SubmitInventory();
    MF.SweetCancel();
    MF.Contract_WaitForRental();
    MF.Contract_SetRentalPhone("1111111111");
    MF.Contract_SetRentalAddress("123456");
    MF.Contract_SetRentalZip("02222");
    JS.scroll('div[ng-if="!data.agreement.signatures[0].value"]');
    SF.click(By.xpath('//div[@ng-if="!data.agreement.signatures[0].value"]'));
    LF.MakeSignJS("signatureCanvasService");
    SF.click(By.xpath('//button[@ng-click="saveService()"]'));
    MF.WaitWhileBusy();
    MF.SweetConfirm();
    LF.payRentalInventory(V.boardNumbersAfterInventory.Id);

condition.nowWeDoing = 'подписываем контракт до конца.';
    driver.wait(new FileDetector().handleFile(driver, system.path.resolve('./files/squirrel.jpg')).then(function (path) {
        V.path = path;
    }), config.timeout);
    SF.sleep(1);
    MF.Contract_UploadImage(V.path);
    MF.Contract_UploadImage(V.path);
    MF.Contract_SaveImages();
    LF.MakeSignInContract();
    LF.MakeSignInContract();
    MF.Contract_DeclarationValueA();
    LF.MakeSignInContract();
    LF.MakeSignInContract();
    LF.MakeSignInContract();
    MF.Contract_ClickPay();
    SF.click(By.xpath('//div[@ng-if="tips.perc == 0 && tips.amount == 0"]'));
    SF.click(By.xpath('//button[@ng-click="goStepTwo();"]'));
    LF.FillCardPayModal();
    LF.Contract_SignMainPayment();
    SF.sleep(1);
    MF.Contract_UploadImage(V.path);
    MF.Contract_UploadImage(V.path);
    MF.Contract_SaveImages();
    LF.MakeSignInContract();
    LF.MakeSignInContract();
    V.contractNumbers = {};
    MF.Contract_Submit(V.contractNumbers);
    SF.openTab(0);

condition.nowWeDoing = 'переходим на вкладку,где наш реквест, закрываем, обновляем dashboard' +
        'открываем заново наш реквест, проверяем баланс, и вес в табе клоузинг, табе сэйлс и в самом storage';
    MF.EditRequest_CloseEditRequest();
    MF.Board_RefreshDashboard();
    MF.Board_OpenRequest(V.boardNumbersAfterInventory.Id);
    V.boardNumbersAfterAddInventory = {};
    LF.RememberDigitsRequestBoard_Down(V.boardNumbersAfterAddInventory);
    MF.EditRequest_ScrollDown();
    VD.IWant(VD.ToEqual, V.boardNumbersAfterAddInventory.Balance, 0, 'Баланс после закрытия не равен 0');
    V.cbfInTabClosing = {};
    driver.wait(driver.findElement(By.xpath('//span[@ng-if="!longDistance && states.invoiceState"]')).getText().then(function(text) {
        V.cbfInTabClosing = SF.cleanPrice(text);
    }),config.timeout);
    MF.EditRequest_OpenConfirmWork();
    driver.wait(driver.findElement(By.xpath('//div[@ng-show="!request.isInventory"]')).getText().then(function(text) {
        text = SF.cleanPrice(text);
        VD.IWant(VD.NotToEqual,text ,V.cbfInTabClosing , 'вес в табе клоузинг и табе сэйлс совпал , либо какая-то другая ошибка')
    }),config.timeout);
    SF.click(By.xpath('//span[@ng-click="openStorageRequest(request.request_all_data.storage_request_id)"]'));
    MF.WaitWhileBusy();
    driver.wait(driver.findElement(By.id('volume')).getAttribute('value').then(function(text) {
        text = SF.cleanPrice(text);
        VD.IWant(VD.ToEqual,text ,V.cbfInTabClosing , 'вес в сторадже не равен весу в табе closing')
    }),config.timeout);
SF.sleep(1);
    SF.endOfTest();
};

