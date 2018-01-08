module.exports = function main(SF, JS, MF, LF, JSstep, VD, V, By, until,FileDetector, system, condition, config,constants) {    global.fiber = Fiber.current;
    V.client = {};
    V.client.name = SF.randomBukva(6) + '_t';
    V.client.fam = SF.randomBukva(6) + '_t';
    V.client.phone = SF.randomCifra(10);
    V.client.email = SF.randomBukvaSmall(6) + '@' + SF.randomBukvaSmall(4) + '.tes';
    V.client.passwd = 123;


    //=========================начинаем писать тест=============================

    SF.get(V.adminURL);
    LF.LoginToBoardAsCustom(V.adminLogin,V.adminPassword);

condition.nowWeDoing = 'создаем реквест ';
    LF.CreateLocalMovingFromBoard (V.client);
    LF.addInventoryBoard ();
    SF.sleep (2);
    MF.EditRequest_OpenSettings();
    LF.SetManager(V.managerFirstName);
    MF.EditRequest_OpenClient();
    LF.SetClientPasswd(V.client.passwd);
    MF.EditRequest_OpenRequest();
    MF.EditRequest_SetToConfirmed ();
    MF.EditRequest_SetAdressToFrom ();
    V.boardNumbers = {};
    LF.RememberDigitsRequestBoard(V.boardNumbers);
    JS.step(JSstep.selectTruck((V.boardNumbers.LaborTimeMax + V.boardNumbers.TravelTime)/60));
    MF.WaitWhileBusy();
    driver.wait(driver.findElement(By.xpath('//span[contains(text(),"c.f.")]/preceding-sibling::span[1]')).getText().then(function(text){
        V.CFRequest = text;
    }),config.timeout);
    SF.sleep(1);
    MF.EditRequest_SaveChanges ();
    LF.closeEditRequest();

condition.nowWeDoing = 'идем в диспач и назначаем команду';
    MF.Board_OpenLocalDispatch();
    LF.findDayInLocalDispatch(V.boardNumbers.moveDate.Year, V.boardNumbers.moveDate.Month, V.boardNumbers.moveDate.Day);
    MF.Dispatch_GridView();
    LF.SelectRequestDispatch(V.boardNumbers.Id);
    V.foremanName = 'Test Foreman';
    LF.selectCrew(V.foremanName);
    MF.Board_LogoutAdmin();

condition.nowWeDoing = 'заходим под форменом, открываем контракт';
    LF.LoginToBoardAsCustomForeman(V.foremanLogin, V.foremanPassword);
    LF.OpenRequestInForemanPage(V.boardNumbers.Id);
    MF.Contract_WaitConfirmationPage();
    MF.Contract_OpenBillOfLading();
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
    LF.ContractAdditionalInventoryAdd();
    Debug.pause();
    driver.wait(driver.findElement(By.xpath('//div[contains(text(), "Total Items:")]/span[@ng-bind="total.count"]')).getText().then(function (text) {
        V.totalCountAddInventory = text;
    }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//div[@class="inventory__toolbar"]/div[contains(text(), "Custom:")]/span[@ng-bind="total.total_custom"]')).getText().then(function (text) {
        V.totalCustomAddInventory = text;
    }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//div[@class="inventory__toolbar"]/div[contains(text(), "Total Estimated Cubic Feet:")]/span[@ng-bind="total.total_cf"]')).getText().then(function (text) {
        V.totalCubicFitAddInventory = text;
    }),config.timeout);
    SF.sleep(1);
    SF.click(By.xpath('//span[contains(text(), "Save Inventory")]'));
    SF.sleep(3);
    SF.click(By.xpath('//button[@ng-click="openAdditionalInventory()"]'));
    JS.waitForExist('a[ng-repeat="filter in room.filters track by $id(filter)"]');
    SF.sleep(4);

condition.nowWeDoing = 'тут после добавления адишинал инвентаря и кастомного айтема мы закрыли модалку с инвентарем и опять октрыли для сравнения что все что добавили осталось на месте';
    driver.wait(driver.findElement(By.xpath('//div[contains(text(), "Total Items:")]/span[@ng-bind="total.count"]')).getText().then(function (text) {
        V.totalCountAddInventoryAfterReopened = text;
        VD.IWant(VD.ToEqual, V.totalCountAddInventoryAfterReopened, V.totalCountAddInventory, 'не совпало коунт инвентаря после открытия модалки. что то удалиось');
    }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//div[@class="inventory__toolbar"]/div[contains(text(), "Total Estimated Cubic Feet:")]/span[@ng-bind="total.total_cf"]')).getText().then(function (text) {
        V.totalCubicFitAddInventoryAfterReopened = text;
        VD.IWant(VD.ToEqual, V.totalCubicFitAddInventoryAfterReopened, V.totalCubicFitAddInventory, 'не совпало кубик фит инвентаря после открытия модалки что то удалиось');
    }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//div[@class="inventory__toolbar"]/div[contains(text(), "Custom:")]/span[@ng-bind="total.total_custom"]')).getText().then(function (text) {
        V.totalCustomAddInventoryAfterReopened = text;
        VD.IWant(VD.ToEqual, V.totalCustomAddInventoryAfterReopened, V.totalCustomAddInventory, 'не совпало кастом айтем инвентаря после открытия модалки, что то удалиось');
    }),config.timeout);
    SF.sleep(1);
    SF.click(By.xpath('//span[contains(text(), "Save Inventory")]'));
    SF.sleep(3);

condition.nowWeDoing = 'добавляем артикли к инвентарю, нажимаем done with inventory и идем дальше подписывать контракт и рентал агримент';
    LF.Contract_AddInventory(17);
    SF.click(By.xpath('//button[@ng-click="doneWithInventory()"]'));
    MF.SweetConfirm();
    MF.WaitWhileBusy();
    driver.wait(driver.findElement(By.xpath('//input[@ng-model="data[fieldName].numberedItems"]')).getAttribute('value').then(function (text) {
        VD.IWant(VD.ToEqual, text, 16, 'не сработал done with inventory или другая бага нужно проверить');
    }),config.timeout);
    SF.sleep(0.5);
    MF.Contract_SetTapeNumber(1);
    MF.Contract_SetTapeColorGreen('Green');
    LF.MakeSignInInventory(0);
    LF.MakeSignInInventory(1);
    MF.Contract_SubmitInventory();
    MF.Contract_WaitForRental();
    driver.wait(driver.findElement(By.xpath('//input[@ng-model="storageVolume"]')).getAttribute('value').then(function (text) {
        VD.IWant(VD.ToEqual, text, (V.CFRequest + V.totalCubicFitAddInventory), 'не совпал кубик фит всего добавленного инвентрая и кубик фит реквеста');
    }),config.timeout);
    SF.sleep(0.5);
    MF.Contract_SetRentalPhone(V.client.phone);
    MF.Contract_SetRentalAddress('Address To');
    MF.Contract_SetRentalZip('02461');
    LF.MakeSignInRental();
    MF.SweetConfirm ();
    LF.payRentalInventory();
    driver.wait(new FileDetector().handleFile(driver, system.path.resolve('./files/squirrel.jpg')).then(function (path) {
        V.path = path;
    }), config.timeout);
    SF.sleep(1);
    MF.Contract_UploadImage(V.path);
    MF.Contract_UploadImage(V.path);
    MF.Contract_SaveImages();

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

condition.nowWeDoing="Вернуться в localDispatch, найти реквест, проверить и запомнить Payroll";
    LF.LoginToBoardAsCustom(V.adminLogin,V.adminPassword);
    MF.Board_OpenLocalDispatch();
    LF.findDayInLocalDispatch(V.boardNumbers.moveDate.Year, V.boardNumbers.moveDate.Month, V.boardNumbers.moveDate.Day);
    MF.Dispatch_GridView();
    MF.Dispatch_ShowDoneJobs();
    LF.OpenRequestDispatch(V.boardNumbers.Id);
    MF.EditRequest_WaitForBalanceVisible();
    LF.RememberDigitsRequestBoard_Down(V.boardNumbers);
    MF.EditRequest_ScrollDown();
    VD.IWant(VD.ToEqual, V.boardNumbers.Balance, 0, 'Баланс после закрытия не равен 0');
    MF.EditRequest_OpenPayroll();
    LF.RememberAndValidatePayroll_In_EditRequest(V.managerName, V.boardNumbers, V.contractNumbers);
    MF.EditRequest_CloseModal();
    LF.closeEditRequest();

condition.nowWeDoing = 'сейчас идём в пейролл';
    MF.Board_OpenPayroll();
    LF.selectDateInPayroll(V.boardNumbers.moveDate);
    LF.findTestForemanInPayroll(V.foremanName);

condition.nowWeDoing = 'выбираем цифры формена';
    V.payrollNumbers = {
        Foreman:{}, Sale:{}
    };
    MF.Payroll_getTotalById(V.boardNumbers.Id, V.payrollNumbers.Foreman);
    VD.IWant(VD.ToEqual, V.payrollNumbers.Foreman.Total, V.boardNumbers.Payroll.foremanForCommission.total, 'не совпали цифры в Payroll foreman\n' +
        'id=' + V.boardNumbers.Id);
    MF.Payroll_ClickAllDepartment();

condition.nowWeDoing = 'выбираем цифры менеджера';
    LF.findSaleInPayroll(V.managerName);
    MF.Payroll_getTotalById(V.boardNumbers.Id, V.payrollNumbers.Sale);
    VD.IWant(VD.ToEqual, V.payrollNumbers.Sale.Total, V.boardNumbers.Payroll.managerForCommission.total, 'не совпали цифры в Payroll manager\n' +
        'id=' + V.boardNumbers.Id);
    SF.sleep(1);

    //=========================закончили писать тест=============================
    SF.endOfTest();
};

