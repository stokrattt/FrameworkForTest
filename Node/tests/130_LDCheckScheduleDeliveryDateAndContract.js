module.exports = function main(SF, JS, MF, LF, JSstep, VD, V, By, until,FileDetector, system, condition, config,constants) {
    global.fiber = Fiber.current;
    V.client = {};
    V.client.name = SF.randomBukva(6) + '_t';
    V.client.fam = SF.randomBukva(6) + '_t';
    V.client.phone = SF.randomCifra(10);
    V.client.email = SF.randomBukvaSmall(6) + '@' + SF.randomBukvaSmall(4) + '.tes';
    V.client.passwd = 123;

    //=========================начинаем писать тест=============================
    condition.nowWeDoing = 'Создаем ЛД реквест с борда. Создаём кастомный айтем, выставляем delivery day и schedule delivery day. Меняем топливо, добавляем пэкинг, дискаунт.';
    SF.get(V.adminURL);
    LF.LoginToBoardAsCustom(V.adminLogin,V.adminPassword);
    MF.Board_OpenSettingsContract();
    MF.Board_TurnOnAdditionalContract();
    MF.Board_OpenSettingsValuation();
    driver.wait(driver.executeScript("if ($('md-radio-button[area-label=\"By fixed price\"]').hasClass('md-checked')){return true;} else {$('md-radio-button[area-label=\"By fixed price\"]').click()}"), config.timeout);
    SF.waitForVisible(By.xpath('//md-radio-button[@class="valuation-plan-settings__radio md-primary md-checked"]'));
    driver.wait(driver.executeScript("if($('button[ng-click=\"saveChanges()\"]').hasClass('disabled')){" +
        ";}else{$('button[ng-click=\"saveChanges()\"]').click()}"), config.timeout);
    MF.WaitWhileToaster();
    LF.CreateLongDistanceFromBoard(V.client);
    V.requestNumber={};
    MF.EditRequest_RememberId(V.requestNumber);
    MF.EditRequest_OpenInventoryTab();
    MF.EditRequest_CreateCustomItem();
    MF.EditRequest_CustomItemSetPounds(40);
    MF.EditRequest_CustomItemSetCount(10);
    MF.EditRequest_ClickSaveInventory();
    V.boardNumbers = {};
    JS.step(JSstep.selectTruck((V.boardNumbers.LaborTimeMax + V.boardNumbers.TravelTime)/60));
    SF.sleep(1);
    LF.EditRequest_SetFirstDeliveryDay(4);
    MF.EditRequest_OpenClient();
    LF.SetClientPasswd(V.client.passwd);
    MF.EditRequest_OpenRequest();
    LF.EditRequest_SetScheduleDeliveryDate(4);
    MF.EditRequest_SetAdressFrom();
    MF.EditRequest_SetAdressTo();
    MF.EditRequest_OpenFuelSurchModal();
    MF.EditRequest_SendFlatSurchargeInFuelWindow(222);
    MF.EditRequest_ClickApplyInFuelWindow();
    SF.sleep(4);
    MF.EditRequest_OpenDiscountModal();
    MF.EditRequest_SendMoneyDiscount(30);
    SF.sleep(5);
    LF.EditRequest_AddPartialPacking();
    LF.RememberDigitsRequestBoard(V.boardNumbers);
    MF.EditRequest_SaveChanges();
    MF.EditRequest_CloseEditRequest();

    condition.nowWeDoing = 'Открываем реквест заново и проверяем, что всё сохранилось.';
    MF.Board_OpenDashboard();
    MF.Board_OpenRequest(V.requestNumber.Id);
    V.boardNumbers2 = {};
    LF.RememberDigitsRequestBoard(V.boardNumbers2);
    VD.IWant(VD.ToEqual, V.boardNumbers.Total ,V.boardNumbers2.Total, 'Total не сохранился после того как мы выставили schedule delivery day и открыли реквест заново');
    VD.IWant(VD.ToEqual, V.boardNumbers.moveDate.Month ,V.boardNumbers2.moveDate.Month, 'Total не сохранился после того как мы выставили schedule delivery day и открыли реквест заново');
    VD.IWant(VD.ToEqual, V.boardNumbers.moveDate.Day ,V.boardNumbers2.moveDate.Day, 'Total не сохранился после того как мы выставили schedule delivery day и открыли реквест заново');
    VD.IWant(VD.ToEqual, V.boardNumbers.moveDate.Year ,V.boardNumbers2.moveDate.Year, 'Total не сохранился после того как мы выставили schedule delivery day и открыли реквест заново');
    VD.IWant(VD.ToEqual, V.boardNumbers.CrewSize ,V.boardNumbers2.CrewSize, 'Total не сохранился после того как мы выставили schedule delivery day и открыли реквест заново');
    VD.IWant(VD.ToEqual, V.boardNumbers.HourlyRate ,V.boardNumbers2.HourlyRate, 'Total не сохранился после того как мы выставили schedule delivery day и открыли реквест заново');
    VD.IWant(VD.ToEqual, V.boardNumbers.Trucks ,V.boardNumbers2.Trucks, 'Total не сохранился после того как мы выставили schedule delivery day и открыли реквест заново');
    VD.IWant(VD.ToEqual, V.boardNumbers.Quote ,V.boardNumbers2.Quote, 'Total не сохранился после того как мы выставили schedule delivery day и открыли реквест заново');
    VD.IWant(VD.ToEqual, V.boardNumbers.Fuel ,V.boardNumbers2.Fuel, 'Total не сохранился после того как мы выставили schedule delivery day и открыли реквест заново');
    VD.IWant(VD.ToEqual, V.boardNumbers.Valuation ,V.boardNumbers2.Valuation, 'Total не сохранился после того как мы выставили schedule delivery day и открыли реквест заново');
    VD.IWant(VD.ToEqual, V.boardNumbers.Packing ,V.boardNumbers2.Packing, 'Total не сохранился после того как мы выставили schedule delivery day и открыли реквест заново');
    VD.IWant(VD.ToEqual, V.boardNumbers.AdServices ,V.boardNumbers2.AdServices, 'Total не сохранился после того как мы выставили schedule delivery day и открыли реквест заново');
    VD.IWant(VD.ToEqual, V.boardNumbers.Discount ,V.boardNumbers2.Discount, 'Total не сохранился после того как мы выставили schedule delivery day и открыли реквест заново');
    MF.EditRequest_CloseEditRequest();

    condition.nowWeDoing = 'Идём на аккаунт, сверяем всё. Добавляем экстра айтемы, проверяем что они добавлены на аккаунт.';
    MF.Board_LogoutAdmin();
    SF.get(V.accountURL);
    LF.LoginToAccountAsClient (V.client, V.client.passwd);
    MF.Account_OpenRequest(V.boardNumbers.Id);
    MF.Account_ClickViewRequest();
    V.accountNumbersLD={};
    LF.RememberAccountNumbersLD(V.accountNumbersLD);
    LF.Validation_Compare_Account_Admin_LongDistance(V.boardNumbers, V.accountNumbersLD);
    MF.Account_ClickInventoryOpenTab();
    SF.click(By.xpath('//span[@ng-bind="::room.name"][contains(text(),"Patio")]'));
    SF.click(By.xpath('(//div[@class="new-inventory-item"])[1]//button[@ng-click="onClickCounter(1)"]'));
    SF.click(By.xpath('(//div[@class="new-inventory-item"])[2]//button[@ng-click="onClickCounter(1)"]'));
    SF.click(By.xpath('(//div[@class="new-inventory-item"])[3]//button[@ng-click="onClickCounter(1)"]'));
    MF.Account_ClickSaveInventory();
    driver.wait(driver.findElement(By.xpath('//div[@id="extra-services-account"]/div[2]/div[4]')).getText().then(function (text) {
        text = SF.cleanPrice(text.substring(text.indexOf('$')));
        VD.IWant (VD.ToEqual, text, '60', 'Не отображаются или неправильно посчитаны экстра айтемы добавленные на аккаунте');
    }),config.timeout);
    LF.LogoutFromAccount();

    condition.nowWeDoing = 'Возвращаемся на дашборд. Ставим статус Confirmed, меняем Weight type. В табе Closing добавляем Packing. Проверяем, что квота и топливо при этом не пересчитались';
    SF.get(V.adminURL);
    LF.LoginToBoardAsCustom(V.adminLogin,V.adminPassword);
    MF.Board_OpenRequest (V.requestNumber.Id);
    V.boardNumbersAfterDeleteInventory = {};
    LF.RememberDigitsRequestBoard(V.boardNumbersAfterDeleteInventory);
    MF.EditRequest_SetToConfirmed();
    JS.step(JSstep.selectTruck((V.boardNumbers.LaborTimeMax + V.boardNumbers.TravelTime)/60));
    MF.EditRequest_SaveChanges();
    MF.EditRequest_CloseConfirmWork();
    V.boardNumbersBeforeChangeWeightType = {};
    LF.RememberDigitsRequestBoard_Down(V.boardNumbersBeforeChangeWeightType);
    VD.IWant(VD.ToEqual, V.boardNumbersAfterDeleteInventory.Total - V.boardNumbersAfterDeleteInventory.Packing ,V.boardNumbersBeforeChangeWeightType.Total, 'не совпал Total после перевода реквеста с Sales в Closing');
    VD.IWant(VD.ToEqual, V.boardNumbersAfterDeleteInventory.Fuel, V.boardNumbersBeforeChangeWeightType.Fuel, 'не совпал Fuel  после перевода реквеста с Sales в Closing');
    VD.IWant(VD.ToEqual, V.boardNumbersBeforeChangeWeightType.Packing, 0, 'Partial packing перенесён в табу closing');
    VD.IWant(VD.ToEqual, V.boardNumbersAfterDeleteInventory.AdServices, V.boardNumbersBeforeChangeWeightType.AdServices, 'не совпал AdServices после перевода реквеста с Sales в Closing');
    VD.IWant (VD.ToEqual, V.boardNumbersAfterDeleteInventory.Discount, V.boardNumbersBeforeChangeWeightType.Discount, 'Пересчиталась квота на табе closing после добавляния packing');
    MF.EditRequest_OpenSettings();
    MF.EditRequest_ClickCustomCubFit();
    MF.EditRequest_SendNumberCustomCubFit(500);
    MF.EditRequest_OpenRequest();
    MF.EditRequest_SaveChanges();
    LF.closeEditRequest();
    MF.Board_OpenConfirmed();
    MF.Board_RefreshDashboard();
    MF.Board_OpenRequest (V.requestNumber.Id);
    V.boardNumbersClosing1 = {};
    LF.RememberDigitsRequestBoard_Down (V.boardNumbersClosing1);
    MF.EditRequest_CloseConfirmWork();
    LF.EditRequest_AddPackingClosingTab();
    SF.sleep(3);
    V.boardNumbersClosing2 = {};
    LF.RememberDigitsRequestBoard_Down (V.boardNumbersClosing2);
    VD.IWant (VD.ToEqual, V.boardNumbersClosing2.Fuel, V.boardNumbersClosing1.Fuel, 'Пересчиталось топливо на табе closing после добавляния packing');
    VD.IWant (VD.ToEqual, V.boardNumbersClosing2.Quote, V.boardNumbersClosing1.Quote, 'Пересчиталась квота на табе closing после добавляния packing');
    LF.closeEditRequest();
    
    condition.nowWeDoing = 'Открываем реквест заново, проверяем что на табе sales всё осталось старым. Идём в диспач, проверяем что можно добавить и удалить доп.команду. Назначаем основную команду';
    MF.Board_OpenConfirmed();
    MF.Board_RefreshDashboard();
    MF.Board_OpenRequest (V.requestNumber.Id);
    V.boardNumbersClosing = {};
    LF.RememberDigitsRequestBoard_Down (V.boardNumbersClosing);
    VD.IWant (VD.ToEqual, V.boardNumbersClosing1.Fuel, V.boardNumbersClosing.Fuel, 'Пересчиталось топливо на табе sales после добавляения packing на closing');
    VD.IWant (VD.ToEqual, V.boardNumbersClosing1.Quote, V.boardNumbersClosing.Quote, 'Пересчиталась квота на табе sales после добавляения packing на closing');/////
    SF.sleep(1);
    MF.EditRequest_CloseEditRequest();
    MF.Board_OpenLocalDispatch();
    LF.findDayInLocalDispatch(V.boardNumbers.moveDate.Year, V.boardNumbers.moveDate.Month, V.boardNumbers.moveDate.Day);
    MF.Dispatch_GridView();
    LF.SelectRequestDispatch(V.boardNumbers.Id);
    SF.click(By.xpath('//li[@ng-click="vm.addCrew()"]'));
    driver.wait(driver.executeScript("return $('li[ng-click=\"vm.data.active = $index + 1\"]').length").then(function (text) {
        VD.IWant(VD.ToEqual, text, 1, 'Нет блока Crew 2 после нажатия на Add Crew в диспаче');
    }),config.timeout);
    SF.click(By.xpath('//a[@ng-click="vm.removeCrew($index)"]'));
    driver.wait(driver.executeScript("return $('li[ng-click=\"vm.data.active = $index + 1\"]').length").then(function (text) {
        VD.IWant(VD.ToEqual, text, 0, 'Не удаляется блок Crew 2 после нажатия на иконку remove');
    }),config.timeout);
    SF.sleep(1);
    V.foremanName = 'Test Foreman';
    LF.selectCrew(V.foremanName);
    MF.Board_LogoutAdmin();

    condition.nowWeDoing = 'заходим под форменом, открываем контракт и проверяем третью табличку валюэйшена';
    LF.LoginToBoardAsCustomForeman(V.foremanLogin, V.foremanPassword);
    LF.OpenRequestInForemanPage(V.boardNumbers.Id);
    MF.Contract_WaitConfirmationPage();
    driver.wait(driver.findElement(By.xpath('//div[@ng-if="isPerPoundValuation"]')).getText().then(function (text){
        VD.IWant(VD.ToEqual,text,'Basic Value Protection: 60 cents per pound (included)', 'При выброннам валюэйшене 60 центов на конфирмейшен пэйдж не стоит included  ');
    }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//span[@ng-if="!isFullAmount"]')).getText().then(function (text){
        VD.IWant(VD.ToEqual,text,'(optional)', 'При выбранном валэйшене 60 центов возле full value не стоит optional');
    }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//td[@ng-repeat="total in totalEstimatePlus track by $index"][1]')).getText().then(function (text){
        text = SF.cleanPrice (text);
        VD.IWant(VD.ToEqual,text,V.boardNumbersClosing.Total + 250, 'Неправильная сумма в третьей строке таблицы валюэйшена. Total Estimate + Valuation Charge.(First deductible level) ');
    }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//td[@ng-repeat="total in totalEstimatePlus track by $index"][2]')).getText().then(function (text){
        text = SF.cleanPrice (text);
        VD.IWant(VD.ToEqual,text,V.boardNumbersClosing.Total + 300, 'Неправильная сумма в третьей строке таблицы валюэйшена. Total Estimate + Valuation Charge.(Second deductible level)');
    }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//td[@ng-repeat="total in totalEstimatePlus track by $index"][3]')).getText().then(function (text){
        text = SF.cleanPrice (text);
        VD.IWant(VD.ToEqual,text,V.boardNumbersClosing.Total + 350, 'Неправильная сумма в третьей строке таблицы валюэйшена. Total Estimate + Valuation Charge.(Third deductible level) ');
    }),config.timeout);

    condition.nowWeDoing = 'Добавляем ещё сервисов и пэкингов, подписываем и самбитим контракт';
    MF.Contract_OpenBillOfLading();
    driver.wait(driver.findElement(By.xpath('//tr[@ng-if="showAddPackingBtn()"]/following-sibling::tr/td[@ng-if="request.service_type.raw == \'7\' || request.service_type.raw == \'5\'"]/following-sibling::td')).getText().then(function (text){
        text = SF.cleanPrice (text);
        VD.IWant(VD.ToEqual, V.boardNumbersClosing2.Packing, text, 'На контракте не совпали или не отображаются пэкинги добавленные в модалке реквеста');
    }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//tr[@ng-if="showAddServicesBtn()"]/following-sibling::tr/td[@ng-if="request.service_type.raw == \'7\' || request.service_type.raw == \'5\'"]/following-sibling::td')).getText().then(function (text){
        text = SF.cleanPrice (text);
        VD.IWant(VD.ToEqual, V.boardNumbersAfterDeleteInventory.AdServices, text, 'На контракте не совпали или не отображаются сервисы добавленные на аккаунте');
    }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//input[@id="contract_total"]')).getAttribute('value').then(function(value){
        V.ContractTotal = SF.cleanPrice(value.replace('%', ''));
        VD.IWant(VD.ToEqual,  V.ContractTotal, V.boardNumbersClosing2.Total, 'Не совпал тотал на контракте и в модалке реквеста');
    }),config.timeout);
    SF.select(By.xpath('//tr[@ng-repeat="p in extra.selectedPackings track by $index "][1]//select[@ng-model="p.quantity"]'),5);
    SF.select(By.xpath('//tr[@ng-repeat="p in extra.selectedPackings track by $index "][2]//select[@ng-model="p.quantity"]'),5);
    SF.select(By.xpath('//tr[@ng-repeat="p in extra.selectedPackings track by $index "][6]//select[@ng-model="p.quantity"]'),5);
    SF.click(By.xpath('//a[@ng-click="showAdditionalServicesRef.show = !showAdditionalServicesRef.show"]'));
    SF.click(By.xpath('//li[@ng-click="addService(s)"][contains(text(), "Piano Handling")]'));
    SF.sleep(2);
    driver.wait(driver.findElement(By.xpath('//tr[@ng-if="showAddPackingBtn()"]/following-sibling::tr/td[@ng-if="request.service_type.raw == \'7\' || request.service_type.raw == \'5\'"]/following-sibling::td')).getText().then(function (text){
        V.TotalPackingContract = SF.cleanPrice (text);
    }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//tr[@ng-if="showAddServicesBtn()"]/following-sibling::tr/td[@ng-if="request.service_type.raw == \'7\' || request.service_type.raw == \'5\'"]/following-sibling::td')).getText().then(function (text){
        V.TotalAdServicesContract = SF.cleanPrice (text);
    }),config.timeout);
    LF.MakeSignInAddContract();
    LF.MakeSignInAddContract();
    LF.MakeSignInAddContract();
    //driver.wait(driver.executeScript("return $('div[ng-if=\"data.signatures[stepId].value\"] img').length").then(function (text) {
        //VD.IWant(VD.ToEqual, text, 3, 'не сохранились подписи на доп.контракте');
    //}),config.timeout);
    MF.Contract_ClickPay();
    MF.Contract_ClickTips10();
    MF.Contract_ClickAddTips();
    MF.Contract_ClickPaymentInfo();
    MF.Contract_PayCash();
    MF.Contract_SubmitAddContract();
    MF.Contract_ReturnToForeman();
    LF.LogoutFromBoardForeman();

    condition.nowWeDoing = 'Возвращаемся на мувборд. Проверяем, что сервисы и пэкинги добавленные на аккаунте добавились в табу клоузинг. Выключаем доп.контракт';
    LF.LoginToBoardAsCustom(V.adminLogin,V.adminPassword);
    MF.Board_OpenConfirmed();
    MF.Board_OpenRequest (V.requestNumber.Id);
    V.boardNumbersClosingAfterSubmit = {};
    LF.RememberDigitsRequestBoard_Down (V.boardNumbersClosingAfterSubmit);
    VD.IWant (VD.ToEqual, V.boardNumbersClosingAfterSubmit.AdServices, V.TotalAdServicesContract, 'На табу клоузинг не добавились сервисы которые были добавлены на контракте');
    VD.IWant (VD.ToEqual, V.boardNumbersClosingAfterSubmit.Packing, V.TotalPackingContract, 'На табу клоузинг не добавились пэкинги которые были добавлены на контракте');
    MF.EditRequest_CloseEditRequest();
    MF.Board_OpenSettingsContract();
    MF.Board_TurnOffAdditionalContract();
    SF.sleep(1);
    SF.endOfTest();
};