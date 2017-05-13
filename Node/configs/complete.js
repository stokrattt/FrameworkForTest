module.exports = function(config,V) {
    config.suite = [
        './tests/DefaultSettings.js',
        './tests/3_CheckChangeCubicFitAdmin&AddInventory.js',
        './tests/4_CheckFuelSurcharge.js',
        './tests/7_DepartmenTest.js',
        './tests/5_ReservationMov&Stor.js',
        './tests/DefaultSettings.js',
        './tests/21_LDFromAdmin.js',
        './tests/TheCleaner.js',//==============================уборка=========================
        './tests/6_WithoutReservationMov&Stor.js',
        './tests/SetReservationPrice.js',
        './tests/9_TestNotes.js',
        './tests/1_AllLocalMoving.js',
        './tests/2_CheckPermissions.js',
        './tests/11_CheckBillOfLadding.js',
        './tests/TheCleaner.js',//==============================уборка=========================
        './tests/DefaultSettings.js',
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
        './tests/DefaultSettings.js',
        './tests/20_LDTopForm.js',
        './tests/TheCleaner.js',//==============================уборка=========================
        './tests/22_WeDontMoveToThisState.js',
        './tests/23_FiltrationMoveDate.js',
        './tests/24_FiltrationMoveDateCreateDate.js',
        './tests/25_ChangeDateDispatch.js',
        './tests/26_CloneRequest.js',
        './tests/27_Receipt.js',
        './tests/28_CalcWarnAndTurnOffWhenManual.js',
        './tests/29_CheckFewMoverForUser.js',
        './tests/TheCleaner.js',//==============================уборка=========================
        './tests/30_StorageTenant.js',
        './tests/31_FlateRateBooking.js',
        './tests/49_FlatRateLocalMove.js',
        './tests/32_AllMovingWithStorage.js',
        './tests/33_AddCarrier.js',
        './tests/34_ContractPageCustomBlock.js',
        './tests/35_InventoryLocalMoving.js',
        './tests/36_DatePending.js',
        './tests/37_PendingStorage.js',
        './tests/38_CustomPayrollInRequest.js',
        // './tests/39_CloneRequest.js',
        './tests/TheCleaner.js',//==============================уборка=========================
        './tests/40_PayrollTableCheckSumJobs.js',
        './tests/41_ContractPageSettings.js',
        './tests/42_DrivingTimeLocalMove.js',
        './tests/43_WeightType.js',
        './tests/44_CreateForemanAndAssignCheck.js',
        './tests/45_MovStorAddInventConfirmClient.js',
        './tests/46_FuelByMileage.js',
        './tests/47_SendMessage.js',
        './tests/48_Review.js'


    ];
    config.chainFail = false;
    config.browser = 'chrome';
    V.frontURL = 'http://stage.themoveboard.com:8001/front_site/';
    V.accountURL = 'http://stage.themoveboard.com:8001/account/#/login';
    V.adminURL = 'http://stage.themoveboard.com:8001/moveBoard/#/login';

/*список тестов  для вставки выше
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
 './tests/26_CloneRequest.js',
 './tests/27_Receipt.js',
 './tests/28_CalcWarnAndTurnOffWhenManual.js',
 './tests/29_CheckFewMoverForUser.js',
 './tests/TheCleaner.js',//==============================уборка=========================
 './tests/30_StorageTenant.js',
 './tests/31_FlateRateBooking.js',
 './tests/32_AllMovingWithStorage.js',
 './tests/34_ContractPageCustomBlock.js',
 './tests/35_InventoryLocalMoving.js',
 './tests/DefaultSettings.js',




 */
};
