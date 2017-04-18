module.exports = function(config,V) {
    config.suite = [
        './tests/3_CheckChangeCubicFitAdmin&AddInventory.js',
        './tests/4_CheckFuelSurcharge.js',
        './tests/7_DepartmenTest.js',
        './tests/5_ReservationMov&Stor.js',
        './tests/21_LDFromAdmin.js',
        './tests/TheCleaner.js',//==============================уборка=========================
        './tests/6_WithoutReservationMov&Stor.js',
        './tests/SetReservationPrice.js',
        './tests/9_TestNotes.js',
        './tests/1_AllLocalMoving.js',
        './tests/2_CheckPermissions.js',
        './tests/11_CheckBillOfLadding.js',
        './tests/TheCleaner.js',//==============================уборка=========================
        './tests/10_CompareQuotesLocal.js',
        './tests/12_CreateMov&StorFromFrontDownAndCompare.js',
        './tests/18_ForemanSignJob.js',
        './tests/17_LoadingHelpDownForm.js',
        './tests/14_LoadingHelpTopForm.js',
        './tests/SetReservationPrice.js',
        './tests/TheCleaner.js',//==============================уборка=========================
        './tests/15_OvernightDownForm.js',
        './tests/8_SaveNothing.js',
        './tests/19_SignForemanJobAndUnssignetJob.js',
        './tests/13_UnloadingHelpTopForm.js',
        './tests/16_UnloadHelpDownFront.js',
        './tests/SetReservationPrice.js',
        './tests/20_LDTopForm.js',
        './tests/TheCleaner.js',//==============================уборка=========================
        './tests/22_WeDontMoveToThisState.js',
        './tests/23_FiltrationMoveDate.js',
        './tests/24_FiltrationMoveDateCreateDate.js',
        './tests/25_ChangeDateDispatch.js',
        './tests/TheCleaner.js',//==============================уборка=========================
        './tests/26_CloneRequest.js',
        './tests/27_Receipt.js',
        './tests/28_CalcWarnAndTurnOffWhenManual.js',
        './tests/29_CheckFewMoverForUser.js',
        './tests/30_StorageTenant.js'





    ];
    config.chainFail = false;
    config.browser = 'chrome';
    V.frontURL = 'http://stage.themoveboard.com:8001/front_site/';
    V.accountURL = 'http://stage.themoveboard.com:8001/account/#/login';
    V.adminURL = 'http://stage.themoveboard.com:8001/moveBoard/#/login';

/*список тестов  для вставки выше
 './tests/3_CheckChangeCubicFitAdmin&AddInventory.js',
 './tests/4_CheckFuelSurcharge.js',
 './tests/2_CheckPermissions.js',
 './tests/5_ReservationMov&Stor.js',
 './tests/6_WithoutReservationMov&Stor.js',
 './tests/SetReservationPrice.js',
 './tests/7_DepartmenTest.js',
 './tests/1_AllLocalMoving.js',
 './tests/9_TestNotes.js',
 './tests/11_CheckBillOfLadding.js',
 './tests/8_SaveNothing.js',
 './tests/10_CompareQuotesLocal.js',
 './tests/12_CreateMov&StorFromFrontDownAndCompare.js',
 './tests/13_UnloadingHelpTopForm.js',
 './tests/unloadingHelpDownForm.js',
 './tests/17_LoadingHelpDownForm.js',
 './tests/15_OvernightDownForm.js',
 './tests/18_ForemanSignJob.js',
 './tests/19_SignForemanJobAndUnssignetJob.js'
 './tests/20_LDTopForm.js',
 './tests/22_WeDontMoveToThisState.js',
 './tests/23_FiltrationMoveDate.js',
 './tests/24_FiltrationMoveDateCreateDate.js',
 './tests/25_ChangeDateDispatch.js',
 './tests/21_LDFromAdmin.js',
 './tests/26_CloneRequest.js',
 './tests/27_Receipt.js',
 './tests/28_CalcWarnAndTurnOffWhenManual.js',
 './tests/29_CheckFewMoverForUser.js',
 './tests/30_StorageTenant.js'





 */
};
