module.exports = function(config,V) {
    config.suite = [
        './tests/DefaultSettings.js',
        './tests/3_CheckChangeCubicFitAdmin&AddInventory.js',
        './tests/4_CheckFuelSurcharge.js',
        './tests/7_DepartmenTest.js',
        './tests/5_ReservationMov&Stor.js',
        './tests/DefaultSettings.js',
        './tests/21_LDFromAdmin.js',
        './tests/6_WithoutReservationMov&Stor.js',
        './tests/SetReservationPrice.js',
        './tests/9_TestNotes.js',
        './tests/2_CheckPermissions.js',
        './tests/11_CheckBillOfLadding.js',
        './tests/TheCleaner.js',//==============================уборка=========================
    ];
    config.chainFail = false;
    config.browser = 'chrome';
    V.frontURL = 'http://stage.themoveboard.com:8001/front_site/';
    V.accountURL = 'http://stage.themoveboard.com:8001/account/#/login';
    V.adminURL = 'http://stage.themoveboard.com:8001/moveBoard/#/login';
    V.adminLogin = 'AdminFlow1@test.com';
    V.adminPassword = 'test';
    V.foremanLogin = 'ForemanFlow1@test.com';
    V.foremanPassword = '123';
    V.foremanName = 'Foreman Flow1';

};
