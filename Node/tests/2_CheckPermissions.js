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
    LF.LoginToBoardAsAdmin();

    condition.nowWeDoing = 'идем в настройки и ставим пермишины для сейлса';
    MF.Board_OpenSettingsDepartment();
    MF.Department_OpenSales();
    MF.Department_OpenHuman("JackSales do not delete");
    MF.Department_OpenMansPermissions();
    MF.Department_ClickPermissionsRequests();
    LF.PermissionsClear ();
    MF.Department_ClickCanSeeOtherLeads();
    MF.Department_ClickCanSearchOtherLeads();
    MF.Department_ClickCanEditOtherLeads();
    MF.Department_ClickCanAssignToOther();
    //SF.click(By.xpath('//input[@ng-model="request.permissions.canSeeUnsignedLeads"]/..'));
    MF.Department_SaveUser();

    condition.nowWeDoing = 'создаем реквест из под админа';
    LF.CreateLocalMovingFromBoard(V.client);
    V.requestAdmin={};
    MF.EditRequest_RememberId(V.requestAdmin);
    MF.EditRequest_OpenSettings();
    MF.EditRequest_RememberSale(V.requestAdmin);
    MF.EditRequest_CloseEditRequest();
    LF.LogoutFromBoardAdmin ();

    condition.nowWeDoing = 'заходим под сейлсом и проверяем разные галочки';
    LF.LoginToBoardAsCustom(V.SalesLogin,V.SalesPass);
    LF.OpenRequest(V.requestAdmin.Id);
    MF.EditRequest_OpenSettings();
    V.requestSale={};
    MF.EditRequest_RememberSale(V.requestSale);
    VD.IWant (VD.VToEqual, V.requestAdmin.SaleName, V.requestSale.SaleName, 'Сейлсы не совпадают на админке и на менеджере');

    MF.EditRequest_SetSaleNumber(2);
    V.requestNew={};
    MF.EditRequest_RememberSale(V.requestNew);
    VD.IWant (VD.VNotToEqual, V.requestNew.SaleName, V.requestSale.SaleName, 'пермишины не сработали, так как сейл не изменился');
    MF.EditRequest_OpenRequest();
    MF.EditRequest_SetSizeOfMoveNumber(8);
    MF.EditRequest_SaveChanges();
    MF.EditRequest_CloseEditRequest();
    MF.Board_RefreshDashboard();
    MF.Board_SearchRequest(V.requestAdmin.Id);
    V.SearchRequest={};
    MF.Board_GetFirstFoundedId(V.SearchRequest);
    VD.IWant (VD.VToEqual, V.requestAdmin.Id, V.SearchRequest.Id, 'Поиск по другим пермишинам не работает');
    SF.endOfTest();
};
