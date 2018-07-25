module.exports = function main(SF, JS, MF, LF, JSstep, VD, V, By, until,FileDetector, system, condition, config,constants) {
    global.fiber = Fiber.current;
    V.client = {};
    V.client.name = SF.randomBukva(6) + '_t';
    V.client.fam = SF.randomBukva(6) + '_t';
    V.client.phone = SF.randomCifra(10);
    V.client.email = SF.randomBukvaSmall(6) + '@' + SF.randomBukvaSmall(4) + '.tes';
    V.SalesLogin = ('jack2@ya.com');
    V.SalesPass = ('123');
    SF.get(V.adminURL);
    LF.LoginToBoardAsCustom(V.adminLogin,V.adminPassword);

condition.nowWeDoing = 'идем в настройки и ставим пермишины для сейлса';
    MF.Board_OpenSettingsDepartment();
    MF.Department_OpenSales();
    MF.WaitWhileBusy ();
    MF.Department_OpenHuman("JackSales donotdelete");
    MF.WaitWhileBusy ();

condition.nowWeDoing = 'тут проверяем переключение табов нотификейшинов';
    MF.Department_OpenNotificationTab();
    driver.wait(driver.findElement(By.xpath('//md-switch[@ng-model="notification.selected"]//span[contains(text(), "A customer sends a message")]')).getText().then(function (text) {
        VD.IWant(VD.ToEqual, text, 'A customer sends a message', 'не нашло нотификейшн на табе sales');
    }),config.timeout);
    SF.click(By.xpath('//li[@ng-click="notificationsGroup = 1"]'));
    SF.sleep(1);
    driver.wait(driver.findElement(By.xpath('//md-switch[@ng-model="notification.selected"]//span[contains(text(), "A customer buys a coupon")]')).getText().then(function (text) {
        VD.IWant(VD.ToEqual, text, 'A customer buys a coupon', 'не нашло нотификейшн на табе admin');
    }),config.timeout);
    SF.click(By.xpath('//li[@ng-click="notificationsGroup = 2"]'));
    SF.sleep(1);
    driver.wait(driver.findElement(By.xpath('//md-switch[@ng-model="notification.selected"]//span[contains(text(), "When a customer pays by check from the contract")]')).getText().then(function (text) {
        VD.IWant(VD.ToEqual, text, 'When a customer pays by check from the contract', 'не нашло нотификейшн на табе dispach');
    }),config.timeout);
    MF.Department_OpenMansPermissions();
    MF.Department_ClickPermissionsRequests();
    LF.PermissionsClear ();
    MF.Department_ClickCanSeeOtherLeads();
    MF.Department_ClickCanSearchOtherLeads();
    MF.Department_ClickCanEditOtherLeads();
    MF.Department_ClickCanAssignToOther();
    MF.Department_SaveUser();

condition.nowWeDoing = 'создаем реквест из под админа';
    LF.CreateLocalMovingFromBoard(V.client);
    V.requestAdmin={};
    MF.EditRequest_RememberId(V.requestAdmin);
    MF.EditRequest_OpenSettings();
    MF.EditRequest_RememberSale(V.requestAdmin);
    MF.EditRequest_CloseEditRequest();
    MF.Board_LogoutAdmin ();

condition.nowWeDoing = 'заходим под сейлсом и проверяем разные галочки';
    LF.LoginToBoardAsCustom(V.SalesLogin,V.SalesPass);
    MF.Board_OpenRequest(V.requestAdmin.Id);
    MF.EditRequest_OpenSettings();
    V.requestSale={};
    MF.EditRequest_RememberSale(V.requestSale);
    VD.IWant (VD.ToEqual, V.requestAdmin.SaleName, V.requestSale.SaleName, 'Сейлсы не совпадают на админке и на менеджере');
    MF.EditRequest_SetSaleNumber(5);
    V.requestNew={};
    MF.EditRequest_RememberSale(V.requestNew);
    VD.IWant (VD.NotToEqual, V.requestNew.SaleName, V.requestSale.SaleName, 'пермишины не сработали, так как сейл не изменился');
    MF.EditRequest_OpenRequest();
    MF.EditRequest_SetSizeOfMoveNumber(8);
    SF.sleep(2);
    MF.EditRequest_SaveChanges();
    MF.EditRequest_CloseEditRequest();
    MF.Board_RefreshDashboard();
    SF.sleep(2);
    MF.Board_SearchRequest(V.requestAdmin.Id);
    V.SearchRequest={};
    SF.sleep(2);
    MF.Board_GetFirstFoundedId(V.SearchRequest);
    VD.IWant (VD.ToEqual, V.requestAdmin.Id, V.SearchRequest.Id, 'Поиск по другим пермишинам не работает');
    SF.sleep(1);
    SF.endOfTest();
};
