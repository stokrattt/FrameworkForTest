module.exports = function main(SF, JS, MF, LF, JSstep, VD, V, By, until,FileDetector, system, condition, config,constants) {
    global.fiber = Fiber.current;
    V.client = {};
    V.client.name = SF.randomBukva(6) + '_t';
    V.client.fam = SF.randomBukva(6) + '_t';
    V.client.phone = SF.randomCifra(10);
    V.client.email = SF.randomBukvaSmall(6) + '@' + SF.randomBukvaSmall(4) + '.tes';
    V.client.passwd = 123;

    //=========================начинаем писать тест=============================

condition.nowWeDoing = 'создаем пакинг дей с фронта с выбором комершиала мув сайза';
    SF.get(V.frontURL);
    MF.FrontSiteSmallCalc_ClickNeedStorageCheckbox();
    MF.FrontSiteSmallCalc_SelectServiceType(8);
    MF.FrontSiteSmallCalc_SendZipFrom('02032');
    MF.FrontSiteSmallCalc_ClickCalendar();
    V.frontNumbers = {};
    driver.wait(driver.executeScript(JSstep.Click4DaysNewCalendar).then(function (D) {
        V.frontNumbers.moveDate = D;
        console.log(V.frontNumbers.moveDate);
    }),config.timeout);
    MF.FrontSiteSmallCalc_ClickContinue();
    MF.FrontSiteSmallCalc_ClickChooseMoveSize();
    MF.FrontSiteSmallCalc_SelectMoveSize(11);
    MF.FrontSiteSmallCalc_ClickDoneMoveSize();
    MF.FrontSiteSmallCalc_SelectEntrance(4, 3);
    MF.FrontSiteSmallCalc_ClickContinueContractInfo();
    MF.FrontSiteSmallCalc_SetClientInfo(V.client);
    MF.FrontSite_SelectGoogleSearch();
    MF.FrontSiteSmallCalc_SubmitQuoteAndGoToAccount();
    MF.Account_ClickViewRequest();
    SF.click(By.xpath('//div[@ng-click="openEditModal()"]'));
    SF.click(By.xpath('//oi-select[@ng-model="commercialSize"]'));
    SF.sleep(0.3);
    SF.click(By.xpath('//oi-select[@ng-model="commercialSize"]/div[2]//li[1]'));
    SF.send(By.xpath('//input[@ng-value="request.field_moving_from.thoroughfare"]'), 'blablabla');
    SF.send(By.xpath('//input[@ng-value="request.apt_from.value"]'), 123);
    SF.click(By.xpath('//button[@ng-click="update(client)"]'));
    MF.SweetConfirm();
    MF.SweetConfirm();
    LF.AccountLocalAddInventory ();
    V.accountNumbers = {};
    LF.RememberAccountNumbers(V.accountNumbers);
    LF.LogoutFromAccount();

condition.nowWeDoing = 'идем в админку сверять данные, выключать калькулятор, поменять время ворк тай и травел тайм и еще что то)';
    SF.get(V.adminURL);
    LF.LoginToBoardAsCustom(V.adminLogin, V.adminPassword);
    MF.Board_OpenRequest(V.accountNumbers.Id);
    V.boardNumbers = {};
    LF.RememberDigitsRequestBoard (V.boardNumbers);
    LF.Validation_Compare_Account_Admin (V.accountNumbers, V.boardNumbers);
    MF.EditRequest_OpenSettings();
    V.managerFirstName = 'emilia';
    LF.SetManager(V.managerFirstName);
    MF.EditRequest_OpenRequest();
    MF.EditRequest_SwitchCalculator();
    SF.click(By.xpath('//input[@ng-model="request.maximum_time.value"]'));
    SF.click(By.xpath('//input[@ng-model="request.minimum_time.value"]'));
    SF.click(By.xpath('//input[@ng-model="request.maximum_time.value"]'));
    SF.sleep(0.5);
    SF.click(By.xpath('//div[contains(@class, "ui-timepicker-wrapper") and contains(@style,"display: block;")]/ul/li[contains(text(),"07:15")]'));
    SF.click(By.xpath('//input[@ng-model="request.travel_time.value"]'));
    SF.click(By.xpath('//input[@ng-model="request.minimum_time.value"]'));
    SF.click(By.xpath('//input[@ng-model="request.travel_time.value"]'));
    SF.sleep(0.5);
    SF.click(By.xpath('//div[contains(@class, "ui-timepicker-wrapper") and contains(@style,"display: block;")]/ul/li[contains(text(),"01:30")]'));
    SF.clear(By.xpath('//input[@ng-model="request.crew.value"]'));
    SF.send(By.xpath('//input[@ng-model="request.crew.value"]'), 2);
    SF.clear(By.xpath('//input[@ng-model="request.rate.value"]'));
    SF.send(By.xpath('//input[@ng-model="request.rate.value"]'), 98);
    JS.step(JSstep.selectTruck(2));
    MF.WaitWhileBusy();
    MF.EditRequest_OpenFuelSurchModal();
    SF.click(By.xpath('//input[@ng-change="changeSurcharge(\'request\',\'perc\')"]'));
    SF.send(By.xpath('//input[@ng-change="changeSurcharge(\'request\',\'perc\')"]'), 150);
    SF.click(By.xpath('//button[@ng-click="Apply()"]'));
    SF.sleep(3);
    MF.WaitWhileToaster();
    MF.EditRequest_AddPacking();
    MF.EditRequest_AddAdditionalServicesFullPack ();
    MF.EditRequest_SetToNotConfirmed ();
    V.boardNumbersAfterCalcOff = {};
    LF.RememberDigitsRequestBoard (V.boardNumbersAfterCalcOff);
    MF.EditRequest_SaveChanges();
    MF.EditRequest_OpenClient();
    LF.SetClientPasswd (V.client.passwd);
    MF.EditRequest_CloseEditRequest();
    MF.Board_LogoutAdmin();

condition.nowWeDoing = 'идем в аккаунт букать работу и сверять с админкой';
    SF.get(V.accountURL);
    LF.LoginToAccountAsClient (V.client);
    MF.Account_OpenRequest(V.accountNumbers.Id);
    V.accountNumbersAfterCalcOff={};
    LF.RememberAccountNumbers(V.accountNumbersAfterCalcOff);
    LF.Validation_Compare_Account_Admin(V.accountNumbersAfterCalcOff, V.boardNumbersAfterCalcOff);
    LF.ConfirmRequestInAccount_WithReservation();
    LF.LogoutFromAccount();

condition.nowWeDoing = 'второй раз в админке, локал диспатч';
    SF.get(V.adminURL);
    LF.LoginToBoardAsCustom(V.adminLogin,V.adminPassword);
    MF.Board_OpenLocalDispatch();
    LF.findDayInLocalDispatch(V.boardNumbers.moveDate.Year, V.boardNumbers.moveDate.Month, V.boardNumbers.moveDate.Day);
    MF.Dispatch_GridView();
    LF.SelectRequestDispatch(V.accountNumbers.Id);
    LF.selectCrew(V.foremanName);
    MF.Board_LogoutAdmin();

condition.nowWeDoing = 'заходим под форменом, открываем контракт';
    LF.LoginToBoardAsCustomForeman(V.foremanLogin, V.foremanPassword);
    LF.OpenRequestInForemanPage(V.accountNumbers.Id);
    MF.Contract_WaitConfirmationPage();
    MF.Contract_OpenBillOfLading();
    SF.sleep(1);
    driver.wait(driver.executeScript(JSstep.CheckSumsInContract).then(function (costs) {
        VD.IWant(VD.ToEqual, costs.sumPacking, costs.totalPacking, 'Не совпали суммы Packing');
        VD.IWant(VD.ToEqual, costs.sumServices, costs.totalServices, 'Не совпали суммы Services');
    }),config.timeout);
    SF.sleep(1);
    LF.MakeSignInContract();
    LF.MakeSignInContract();
    MF.Contract_DeclarationValueA();
    LF.MakeSignInContract();
    LF.MakeSignInContract();

condition.nowWeDoing = 'добавляем сторадж и инвентарь на контракте а также кастомный айтем';
    SF.click(By.xpath('//a[@ng-click="showTransit()"]'));
    SF.sleep(0.5);
    SF.click(By.xpath('//button[@ng-click="openInventory()"]'));
    SF.waitForVisible(By.xpath('//h4[contains(text(),"household goods descriptive inventory")]'));
    LF.Contract_AddInventory(5);
    MF.Contract_SetTapeNumber(1);
    MF.Contract_SetTapeColorGreen('Green');
    SF.click(By.xpath('//button[@ng-click="doneWithInventory()"]'));
    MF.SweetConfirm();
    MF.WaitWhileBusy();
    driver.wait(driver.findElement(By.xpath('//input[@ng-model="data[fieldName].numberedItems"]')).getAttribute('value').then(function (text) {
        VD.IWant(VD.ToEqual, text, 5, 'не сработал done with inventory или другая бага нужно проверить');
    }),config.timeout);
    LF.MakeSignInInventory(0);
    LF.MakeSignInInventory(1);
    MF.Contract_SubmitInventory();
    MF.Contract_WaitForRental();
    driver.wait(driver.findElement(By.xpath('//input[@ng-model="storageVolume"]')).getAttribute('value').then(function (text) {
        V.rentaAgreementCF = text;
        console.log(V.rentaAgreementCF);
    }),config.timeout);
    SF.sleep(0.5);
    MF.Contract_SetRentalPhone(V.client.phone);
    MF.Contract_SetRentalAddress('Address To');
    MF.Contract_SetRentalZip('02461');
    LF.MakeSignInRental();
    MF.SweetConfirm ();

condition.nowWeDoing = 'тут идем дальше доподписывать контракт и удалим monthly storage fee и проверим что контракт засабмитится';
    MF.Contract_OpenBillOfLading();
    SF.sleep(1);
    SF.click(By.xpath('//input[@value="Monthly Storage Fee"]/../following-sibling::td[3]/p[@ng-click="removeCharge($index)"]'));
    LF.MakeSignInContract();
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
    LF.MakeSignInContract();
    LF.MakeSignInContract();
    V.contractNumbers = {};
    MF.Contract_Submit(V.contractNumbers);
    MF.Contract_ReturnToForeman();
    LF.LogoutFromBoardForeman();

condition.nowWeDoing="Вернуться в localDispatch, найти реквест, проверить и запомнить Payroll и  проверять что кубик фит правильный и что на сейлс остался старый инвентарь";
    LF.LoginToBoardAsCustom(V.adminLogin,V.adminPassword);
    MF.Board_OpenLocalDispatch();
    LF.findDayInLocalDispatch(V.boardNumbers.moveDate.Year, V.boardNumbers.moveDate.Month, V.boardNumbers.moveDate.Day);
    MF.Dispatch_GridView();
    MF.Dispatch_ShowDoneJobs();
    LF.OpenRequestDispatch(V.accountNumbers.Id);
    MF.EditRequest_WaitForBalanceVisible();
    driver.wait(driver.findElement(By.xpath('//span[@ng-if="!longDistance && states.invoiceState"]')).getText().then(function (text) {
        VD.IWant(VD.ToEqual, text, V.rentaAgreementCF, 'не совпал кубик фит на клозинге с тем что мы добавили на контракте, тоесть мы там удалили часть инвентаря на контракте и на клозинге должен быть как раз этот кубик фит что остался после удаления');
    }),config.timeout);
    MF.EditRequest_OpenConfirmWork();
    driver.wait(driver.findElement(By.xpath('//span[contains(text(),"c.f.")]/preceding-sibling::span[1]')).getText().then(function(text){
        VD.IWant(VD.ToEqual, text, V.boardNumbersAfterCalcOff.cbf, 'на табе сейл изменился кубик фит после доне виз инвентори на контракте а не должен был');
    }),config.timeout);
    MF.EditRequest_CloseConfirmWork();
    LF.RememberDigitsRequestBoard_Down(V.boardNumbers);
    MF.EditRequest_ScrollDown();
    VD.IWant(VD.ToEqual, V.boardNumbers.Balance, 0, 'Баланс после закрытия не равен 0');
    MF.EditRequest_OpenPayroll();
    LF.RememberAndValidatePayroll_In_EditRequest(V.managerFirstName, V.boardNumbers, V.contractNumbers);
    MF.EditRequest_CloseModal();
    LF.closeEditRequest();

condition.nowWeDoing = 'сейчас идём в пейролл';
    MF.Board_OpenPayroll();
    LF.selectDateInPayroll(V.boardNumbers.moveDate);
    LF.findTestForemanInPayroll(V.foremanName);

condition.nowWeDoing = 'выбираем цифры формена';
    V.payrollNumbers = {
        Foreman:{}, Sale:{}, Helper:{},
    };
    MF.Payroll_getTotalById(V.accountNumbers.Id, V.payrollNumbers.Foreman);
    VD.IWant(VD.ToEqual, V.payrollNumbers.Foreman.Total, V.boardNumbers.Payroll.foremanForCommission.total, 'не совпали цифры в Payroll foreman\n' +
        'id=' + V.accountNumbers.Id);
    MF.Payroll_ClickAllDepartment();

condition.nowWeDoing = 'выбираем цифры менеджера';
    LF.findSaleInPayroll(V.managerFirstName);
    MF.Payroll_getTotalById(V.accountNumbers.Id, V.payrollNumbers.Sale);
    VD.IWant(VD.ToEqual, V.payrollNumbers.Sale.Total, V.boardNumbers.Payroll.managerForCommission.total, 'не совпали цифры в Payroll manager\n' +
        'id=' + V.accountNumbers.Id);
    SF.sleep(1);
    MF.Payroll_ClickAllDepartment();

condition.nowWeDoing = 'выбираем цифры хелпера';
    LF.findHelperInPayroll('Test Helper1');
    MF.Payroll_getTotalById(V.accountNumbers.Id, V.payrollNumbers.Helper);
    SF.sleep(1);
    VD.IWant(VD.ToEqual, V.payrollNumbers.Helper.Total, (V.boardNumbers.Payroll.helpersForCommission.total/3), 'не совпали цифры в Payroll helper\n' +
        'id=' + V.accountNumbers.Id);
    SF.sleep(1);

    //=========================закончили писать тест=============================
    SF.endOfTest();
};
