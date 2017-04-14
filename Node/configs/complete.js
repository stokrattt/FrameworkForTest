module.exports = function(config,V) {
    config.suite = [
        './tests/CheckChangeCubicFitAdmin&AddInventory.js',
        './tests/CheckFuelSurcharge.js',
        './tests/DepartmenTest.js',
        './tests/ReservationMov&Stor.js',
        '.tests/LDFromAdmin.js',
        './tests/TheCleaner.js',//==============================уборка=========================
        './tests/WithoutReservationMov&Stor.js',
        './tests/SetReservationPrice.js',
        './tests/TestNotes.js',
        './tests/AllLocalMoving.js',
        './tests/CheckPermissions.js',
        './tests/CheckBillOfLadding.js',
        './tests/TheCleaner.js',//==============================уборка=========================
        './tests/CompareQuotesLocal.js',
        './tests/CreateMov&StorFromFrontDownAndCompare.js',
        './tests/ForemanSignJob.js',
        './tests/LoadingHelpDownForm.js',
        './tests/LoadingHelpTopForm.js',
        './tests/SetReservationPrice.js',
        './tests/TheCleaner.js',//==============================уборка=========================
        './tests/OvernightDownForm.js',
        './tests/SaveNothing.js',
        './tests/SignForemanJobAndUnssignetJob.js',
        './tests/UnloadingHelpTopForm.js',
        './tests/UnloadHelpDownFront.js',
        './tests/SetReservationPrice.js',
        './tests/LDTopForm.js',
        './tests/TheCleaner.js',//==============================уборка=========================
        './tests/WeDontMoveToThisState.js',
        './tests/FiltrationMoveDate.js',
        './tests/FiltrationMoveDateCreateDate.js'
    ];
    config.chainFail = false;
    config.browser = 'chrome';
    V.frontURL = 'http://stage.themoveboard.com:8001/front_site/';
    V.accountURL = 'http://stage.themoveboard.com:8001/account/#/login';
    V.adminURL = 'http://stage.themoveboard.com:8001/moveBoard/#/login';
/*список тестов  для вставки выше
 './tests/CheckChangeCubicFitAdmin&AddInventory.js',
 './tests/CheckFuelSurcharge.js',
 './tests/CheckPermissions.js',
 './tests/ReservationMov&Stor.js',
 './tests/WithoutReservationMov&Stor.js',
 './tests/SetReservationPrice.js',
 './tests/DepartmenTest.js',
 './tests/allLocalMoving.js',
 './tests/TestNotes.js',
 './tests/CheckBillOfLadding.js',
 './tests/saveNothing.js',
 './tests/compareQuotesLocal.js',
 './tests/CreateMov&StorFromFrontDownAndCompare.js',
 './tests/unloadingHelpTopForm.js',
 './tests/unloadingHelpDownForm.js',
 './tests/LoadingHelpDownForm.js',
 './tests/OvernightDownForm.js',
 './tests/ForemanSignJob.js',
 './tests/SignForemanJobAndUnssignetJob.js'
 './tests/LDTopForm.js',
 './tests/WeDontMoveToThisState.js',
 './tests/FiltrationMoveDate.js',
 './tests/FiltrationMoveDateCreateDate.js'
 LDFromAdmin


 */
};
