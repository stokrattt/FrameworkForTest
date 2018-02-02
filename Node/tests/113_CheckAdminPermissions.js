module.exports = function main(SF, JS, MF, LF, JSstep, VD, V, By, until,FileDetector, system, condition, config,constants){
    global.fiber = Fiber.current;
    V.client = {};
    V.client.name = SF.randomBukva(6) + '_t';
    V.client.fam = SF.randomBukva(6) + '_t';
    V.client.phone = SF.randomCifra(10);
    V.client.email = SF.randomBukvaSmall(6) + '@' + SF.randomBukvaSmall(4) + '.tes';
    V.PermissionSalesLogin = 'Rick';
    V.PermissionSalesPassword = '123';

    SF.get(V.adminURL);

    condition.nowWeDoing = 'идем в департмент, заходим за сеилса, включаем все  админ пермишены и реквест виндов';
    LF.LoginToBoardAsCustom(V.adminLogin,V.adminPassword);
    MF.Board_OpenSettingsDepartment ();
    MF.Department_OpenSales();
    MF.Department_OpenHuman('Rick Pret');
    MF.Department_OpenMansPermissions();
    LF.AdminPermissionsClear();
    SF.sleep(2);
    SF.click(By.xpath('//input[@ng-model="request.permissions.canSeeSettingsMenu"]/..'));
    SF.click(By.xpath('//input[@ng-model="request.permissions.canSeeStatisticsMenu"]/..'));
    SF.click(By.xpath('//input[@ng-model="request.permissions.canSeeStorageMenu"]/..'));
    SF.click(By.xpath('//input[@ng-model="request.permissions.canSeeLongDistanceMenu"]/..'));
    SF.click(By.xpath('//input[@ng-model="request.permissions.canSeeScheduleMenu"]/..'));
    SF.click(By.xpath('//input[@ng-model="request.permissions.canSeeDispatchMenu"]/..'));
    MF.Department_ClickPermissionsRequestWindow();
    driver.wait(driver.executeScript("if($('input[ng-model=\"request.permissions.canSeeAllStatuses\"]').hasClass('ng-empty')){" +
        "return true;}else{$('input[ng-model=\"request.permissions.canSeeAllStatuses\"]').parent().click()}"));
    SF.click(By.xpath('//input[@ng-model="request.permissions.canSeeAllStatuses"]/..'));
    MF.Department_SaveUser();
    MF.Board_LogoutAdmin();

    condition.nowWeDoing = 'заходим за сеилса, и проверяем видимость меню, которые мы включили';
    LF.LoginToBoardAsCustom(V.PermissionSalesLogin, V.PermissionSalesPassword);
    MF.Board_OpenSettingsGeneral();
    MF.Board_OpenStatistic ();
    MF.Board_OpenStorages();
    MF.Board_ClickLongDistanceDispach();
    MF.Board_OpenSchedule();
    MF.Board_OpenLocalDispatch();


    SF.endOfTest();
};


