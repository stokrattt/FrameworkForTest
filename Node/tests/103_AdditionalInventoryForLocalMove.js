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
    V.foremanName = 'FlatRate Foreman';
    LF.selectCrew(V.foremanName);
    MF.Board_LogoutAdmin();

condition.nowWeDoing = 'заходим под форменом, открываем контракт';
    LF.LoginToBoardAsCustomForeman(V.foremanLoginFlatRate, V.foremanPassword);
    LF.OpenRequestInForemanPage(V.boardNumbers.Id);
    MF.Contract_WaitConfirmationPage();
    MF.Contract_OpenBillOfLading();
    LF.MakeSignInContract();
    LF.MakeSignInContract();
    MF.Contract_DeclarationValueA();
    LF.MakeSignInContract();
    LF.MakeSignInContract();

condition.nowWeDoing = 'добавляем сторадж и инвентарь на контракте а также кастомный айтем';
    MF.Contract_ClickPlusForOpenSubMenuStorageAndOvernight();
    MF.Contract_ClickCorningToStorage();
    LF.ContractAdditionalInventoryAdd();
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
    SF.sleep(8);
    SF.click(By.xpath('//button[@ng-click="openAdditionalInventory()"]'));
    JS.waitForExist('div[class=\"inventory__toolbar\"]');
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
    SF.click(By.xpath('//span[contains(text(), "Save Inventory")]'));
    SF.sleep(3);

condition.nowWeDoing = 'добавляем артикли к инвентарю, нажимаем done with inventory и идем дальше подписывать контракт и рентал агримент';
    LF.Contract_AddInventory(17);
    MF.Contract_ClickDoneWithInventory();
    driver.wait(driver.findElement(By.xpath('//input[@ng-model="data[fieldName].numberedItems"]')).getAttribute('value').then(function (text) {
        VD.IWant(VD.ToEqual, text, 17, 'не сработал done with inventory или другая бага нужно проверить');
    }),config.timeout);
    MF.Contract_SetTapeNumber(1);
    MF.Contract_SetTapeColorGreen('Green');
    LF.MakeSignInInventory(0);
    LF.MakeSignInInventory(1);
    MF.Contract_SubmitInventory();
    MF.WaitWhileBusy();
    MF.Contract_WaitForRental();
    MF.Contract_SetRentalPhone(V.client.phone);
    MF.Contract_SetRentalAddress('Address To');
    MF.Contract_SetRentalZip('02461');
    driver.wait(driver.findElement(By.xpath('//input[@ng-model="storageVolume"]')).getAttribute('value').then(function (text) {
        V.RentalCF = SF.cleanPrice(text);
    }),config.timeout);
    LF.MakeSignInRental();
    MF.SweetConfirm ();
    MF.WaitWhileBusy();
    LF.payRentalInventoryCash(V.boardNumbers);
    JS.waitForExist('input#inputImage');
    driver.wait(new FileDetector().handleFile(driver, system.path.resolve('./files/squirrel.jpg')).then(function (path) {
        V.path = path;
    }), config.timeout);
    SF.sleep(2);
    JS.click('button[ng-click=\\"saveFile();logClickButtons(\\\'Save Images button clicked\\\')\\"]');
    SF.sleep(5);
    LF.MakeSignInContract();
    MF.Contract_ClickPay();
    MF.Contract_ClickTips10();
    MF.Contract_ClickAddTips();
    MF.Contract_ClickPaymentInfo();
    MF.Contract_PayCash();
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
    driver.wait(driver.findElement(By.xpath('//span[@ng-if="!longDistance && states.invoiceState"]')).getText().then(function(text) {
        V.ClosingCF = SF.cleanPrice(text);
        VD.IWant(VD.ToEqual, V.RentalCF, V.ClosingCF,'не совпал  c f клоузинга и рентал агримент');
    }),config.timeout);
    MF.EditRequest_OpenConfirmWork();
    driver.wait(driver.findElement(By.xpath('//div[@ng-show="!request.isInventory"]')).getText().then(function(text) {
        V.SalesCF = SF.cleanPrice(text);
        VD.IWant(VD.NotToEqual, V.RentalCF,V.SalesCF,'совпал сеилс к ф с рентал агримент а не должен, потому что ы на акке добавили адишинал инвентаря');
    }),config.timeout);
    MF.EditRequest_CloseConfirmWork ();
    MF.EditRequest_WaitForBalanceVisible();
    MF.EditRequest_OpenPayroll();
    LF.RememberAndValidatePayroll_In_EditRequest(V.managerName, V.boardNumbers, V.contractNumbers);
    MF.EditRequest_CloseModal();
    // MF.SweetConfirm();
    MF.WaitWhileBusy();
    SF.click(By.xpath('//div[@ng-if="states.invoiceState"]//span[@ng-if="request.request_all_data.storage_request_id"]'));
    MF.WaitWhileBusy();
    driver.wait(driver.findElement(By.xpath('//input[@id="volume"]')).getAttribute('value').then(function(text) {
        V.StorageCF = SF.cleanPrice(text);
        VD.IWant(VD.ToEqual, V.RentalCF, V.StorageCF,'не совпал c f рентал агримент и сторадж');
    }),config.timeout);
    MF.WaitWhileBusy();
    SF.click(By.xpath('//button[@ng-click="closeModal()"]'));
    SF.sleep(2);
    MF.EditRequest_WaitForBalanceVisible();
//
//
// condition.nowWeDoing = 'создаем клон из реквеста, конфермим его и идем подписывать контракт и сделаем трансфер инвентаря с уже подписанного реквеста в этот клон';
//     MF.EditRequest_ClickCreateClone();
//     MF.EditRequest_WaitForVisibleCloneRequest();
//     driver.wait(driver.findElement(By.xpath('//div[contains(@class,"requestModal status_1")]//a[@ng-click="select(tabs[0])"]')).getText().then(function(text){
//         V.Clone = {};
//         V.Clone.Id = SF.cleanPrice(text);
//     }),config.timeout);
//     MF.EditRequest_CloseCloneRequest();
//     MF.EditRequest_OpenContractCloseJob();
//     SF.openTab (1);
//     SF.sleep (3);
//     MF.Contract_OpenBillOfLading();
//     // MF.Contract_WaitBillOfLading ();
//     MF.Contract_OpenInventory();
//     SF.click(By.xpath('//button[@ng-click="openTransferModal(fieldName)"]'));
//     SF.waitForLocated(By.xpath('//button[@ng-click="transfer()"]'));
//     SF.click(By.xpath('//input[@ng-model="requestNid"]'));
//     SF.send(By.xpath('//input[@ng-model="requestNid"]'), V.Clone.Id);
//     MF.WaitWhileBusy();
//     SF.sleep(5); //тут идет долго трансфер инвентаря
//     MF.WaitWhileToaster();
//     driver.close();
//     SF.openTab(0);
//     LF.closeEditRequest();
//     MF.Board_SearchRequest(V.Clone.Id);
//     SF.sleep(3);
//     SF.click(By.xpath('//div[@ng-bind-html="request.nid | searchfilter:search"]/span[contains(text(),"' + V.Clone.Id + '")]/..'));
//     MF.EditRequest_WaitForBalanceVisible();
//     SF.sleep(2);// тут  нужно
//     SF.click (By.xpath('//input[@ng-click="openCalendar()"]'));
//     let now = new Date();
//     let msInDay = 86400000;
//     let future = new Date(now.getTime() + msInDay * 10);
//     let month = { month: 'numeric'};
//     let day = {day: 'numeric'};
//     V.firstDate = {};
//     V.firstDate.Month = (future.toLocaleDateString('en-US', month)) - 1;
//     V.firstDate.Day = (future.toLocaleDateString('en-US', day));
//     SF.click(By.xpath('//div[@id="ui-datepicker-div"]//td[@data-month="'+ V.firstDate.Month +'"]/a[contains(text(),"'+ V.firstDate.Day +'")]'));
//     MF.WaitWhileBusy();
//     MF.EditRequest_SetToConfirmed ();
//     V.boardNumbersClone = {};
//     LF.RememberDigitsRequestBoard(V.boardNumbersClone);
//     JS.step(JSstep.selectTruck((V.boardNumbersClone.LaborTimeMax + V.boardNumbersClone.TravelTime)/60));
//     MF.WaitWhileBusy();
//     driver.wait(driver.findElement(By.xpath('//span[contains(text(),"c.f.")]/preceding-sibling::span[1]')).getText().then(function(text){
//         V.CFRequest = text;
//         VD.IWant(VD.ToEqual, V.CFRequest, V.SalesCF, 'не совпал кубик фит с родительского реквеста с табы сейлс с клоном');
//     }),config.timeout);
//     SF.sleep(1);
//     MF.EditRequest_SaveChanges ();
    LF.closeEditRequest();
//     LF.findDayInLocalDispatch(V.boardNumbersClone.moveDate.Year, V.boardNumbersClone.moveDate.Month, V.boardNumbersClone.moveDate.Day);
//     MF.Dispatch_ShowScheduledJobs();
//     LF.SelectRequestDispatch(V.boardNumbersClone.Id);
//     V.foremanName = 'Test Foreman';
//     LF.selectCrew(V.foremanName);
//     MF.Board_LogoutAdmin();
//
// condition.nowWeDoing = 'заходим под форменом, открываем контракт для клона';
//     LF.LoginToBoardAsCustomForeman(V.foremanLogin, V.foremanPassword);
//     LF.OpenRequestInForemanPage(V.boardNumbersClone.Id);
//     MF.Contract_WaitConfirmationPage();
//     MF.Contract_OpenInventory();
//     Debug.pause();
//     MF.Contract_SubmitInventory();
//     MF.WaitWhileBusy();
//     MF.Contract_WaitForRental();
//     MF.Contract_SetRentalPhone(V.client.phone);
//     MF.Contract_SetRentalAddress('Address To Clone');
//     MF.Contract_SetRentalZip('02461');
//     driver.wait(driver.findElement(By.xpath('//input[@ng-model="storageVolume"]')).getAttribute('value').then(function (text) {
//         V.RentalCFclone = SF.cleanPrice(text);
//         VD.IWant(VD.ToEqual, V.RentalCF, V.RentalCFclone,'не совпал c f рентал агримент и сторадж первого реквеста');
//     }),config.timeout);
//     LF.MakeSignInRental();
//     MF.SweetConfirm ();
//     MF.WaitWhileBusy();
//     LF.payRentalInventoryCash(V.boardNumbersClone);
//     JS.waitForExist('input#inputImage');
//     driver.wait(new FileDetector().handleFile(driver, system.path.resolve('./files/squirrel.jpg')).then(function (path) {
//         V.path = path;
//     }), config.timeout);
//     SF.sleep(2);
//     JS.click('button[ng-click=\\"saveFile();logClickButtons(\\\'Save Images button clicked\\\')\\"]');
//     SF.sleep(5);
//
//
//
//
//
//     MF.Contract_OpenBillOfLading();
//     LF.MakeSignInContract();
//     LF.MakeSignInContract();
//     MF.Contract_DeclarationValueA();
//     LF.MakeSignInContract();
//     LF.MakeSignInContract();
//
//     condition.nowWeDoing = 'добавляем сторадж и сделаем трансфер инвентаря с первого реквеста в этот клон';
//     MF.Contract_ClickPlusForOpenSubMenuStorageAndOvernight();
//     MF.Contract_ClickCorningToStorage();
//
//


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

