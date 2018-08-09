module.exports = function main(SF, JS, MF, LF, JSstep, VD, V, By, until,FileDetector, system, condition, config,constants) {
    global.fiber = Fiber.current;
    V.client = {};
    V.client.name = SF.randomBukva(6) + '_t';
    V.client.fam = SF.randomBukva(6) + '_t';
    V.client.phone = SF.randomCifra(10);
    V.client.email = SF.randomBukvaSmall(6) + '@' + SF.randomBukvaSmall(4) + '.tes';

    //=========================начинаем писать тест=============================
    SF.get(V.adminURL);
    LF.LoginToBoardAsCustom(V.adminLogin,V.adminPassword);

condition.nowWeDoing = 'создаем реквест и добавляем разного';
    LF.CreateLocalMovingFromBoard (V.client);
    MF.EditRequest_RememberId (V.request);
    // LF.addToCleanerJob(V.request.Id);
    MF.EditRequest_AddRoomNumber (4);
    MF.EditRequest_AddRoomNumber (5);
    MF.EditRequest_AddRoomNumber (6);
    V.boardNumbers = {};
    LF.addInventoryBoard (V.boardNumbers);
    MF.EditRequest_SetSizeOfMoveNumber (9);
    MF.EditRequest_SetAdressToFrom ();
    LF.EditRequest_AddPackingAndFullPAcking();
    LF.EditRequest_AddAdditionalServicesFullPack();
    MF.EditRequest_SetToNotConfirmed ();
    driver.wait(driver.findElement(By.xpath("(//div[@ng-show='!request.isInventory']/span)[1]")).getText().then(function (text){
        V.boardNumbersCubFit = SF.cleanPrice (text);
    }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//select[@id="edit-size-move"]')).getAttribute("value").then(function (text){
        V.sizemove = (text);
    }),config.timeout);
    LF.RememberDigitsRequestBoard(V.boardNumbers);
    JS.step(JSstep.selectTruck((V.boardNumbers.LaborTimeMax + V.boardNumbers.TravelTime)/60));
    MF.WaitWhileBusy();
    MF.EditRequest_SaveChanges ();

condition.nowWeDoing = 'идём в настройки клонировать реквест';
    MF.EditRequest_OpenSettings();
    MF.EditRequest_ClickCloneRequest();
    MF.EditRequest_WaitForVisibleCloneRequest();
    driver.wait(driver.findElement(By.xpath('//div[contains(@class,"requestModal status_1")]//a[@ng-click="select(tabs[0])"]')).getText().then(function(text){
        V.IdClone = SF.cleanPrice(text);
        // LF.addToCleanerJob(V.IdClone);
    }),config.timeout);
    SF.click(By.xpath('//div[contains(@class,"requestModal status_1")]//button[@ng-click="cancel()"]'));
    SF.sleep (2);
    LF.closeEditRequest ();

condition.nowWeDoing = 'проверяем что клон в пендинге и открываем его';
    MF.Board_RefreshDashboard();
    MF.Board_OpenRequest (V.IdClone);
    SF.sleep (2);
    V.boardCloneForCompare = {};
    LF.RememberDigitsRequestBoard (V.boardCloneForCompare);
    SF.sleep(2);
    LF.Validation_Compare_Account_Admin (V.boardNumbers, V.boardCloneForCompare);

condition.nowWeDoing = 'ждем и добавляем инвентория';
    LF.addAdditionalInventoryBoard();
    MF.EditRequest_SetSizeOfMoveNumber (6);
    SF.clear (By.id('edit-moving-from'));
    SF.send (By.id('edit-moving-from'), 'From Addres Clone');
    SF.clear (By.xpath('//input[@id="edit-moving-to"]'));
    SF.send (By.xpath('//input[@id="edit-moving-to"]'), 'To Addres Clone');
    driver.wait(driver.findElement(By.xpath("(//div[@ng-show='!request.isInventory']/span)[1]")).getText().then(function (text){
        V.boardNumbersCubFitClone = SF.cleanPrice (text);
    }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//select[@id="edit-size-move"]')).getAttribute("value").then(function (text){
        V.sizemoveClone = (text);
    }),config.timeout);
    V.boardNumbersClone = {};
    LF.RememberDigitsRequestBoard(V.boardNumbersClone);
    MF.EditRequest_SaveChanges ();
    LF.closeEditRequest ();

condition.nowWeDoing = 'идем открывать первый реквест и проверять что клон не затер данные первого';
    MF.Board_OpenNotConfirmed();
    MF.Board_OpenRequest (V.request.Id);
    VD.IWant (VD.NotToEqual, V.boardNumbersCubFit, V.boardNumbersCubFitClone, 'клон затер cubic fit первого реквеста');
    VD.IWant (VD.NotToEqual, V.sizemove, V.sizemoveClone, 'клон затер sizemove первого реквеста');
    driver.wait(driver.findElement(By.id('edit-moving-from')).getText().then(function (text){
        VD.IWant (VD.NotToEqual, text, 'From Addres Clone', 'клон затер adress from первого реквеста');
    }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//input[@id="edit-moving-to"]')).getText().then(function (text){
        VD.IWant (VD.NotToEqual, text, 'To Addres Clone', 'клон затер adress to первого реквеста');
    }),config.timeout);
    VD.IWant(VD.NotToEqual, V.boardNumbers.QuoteMin, V.boardNumbersClone.QuoteMin, 'совпали QuoteMin первого реквеста и клона, хотя не должно было');
    VD.IWant(VD.NotToEqual, V.boardNumbers.QuoteMax, V.boardNumbersClone.QuoteMax, 'совпали QuoteMax первого реквеста и клона, хотя не должно было');
    VD.IWant(VD.NotToEqual, V.boardNumbers.TotalMin, V.boardNumbersClone.TotalMin, 'совпали TotalMin первого реквеста и клона, хотя не должно было');
    VD.IWant(VD.NotToEqual, V.boardNumbers.TotalMax, V.boardNumbersClone.TotalMax, 'совпали TotalMax первого реквеста и клона, хотя не должно было');
    VD.IWant(VD.NotToEqual, V.boardNumbers.Fuel, V.boardNumbersClone.Fuel, 'совпали Fuel первого реквеста и клона, хотя не должно было');
    SF.sleep(2);


    //=========================закончили писать тест=============================
    SF.endOfTest();
};
