module.exports = function(config,V) {
    config.suite = [
        './tests/3_CheckChangeCubicFitAdmin&AddInventory.js',
        './tests/10_CompareQuotesLocal.js',
        './tests/19_SignForemanJobAndUnssignetJob.js',
        './tests/23_FiltrationMoveDate.js',
        './tests/24_FiltrationMoveDateCreateDate.js',
        './tests/25_ChangeDateDispatch.js',
        './tests/31_FlateRateBooking.js',
        './tests/49_FlatRateLocalMove.js',
        './tests/52_AllFlatRate.js',
        './tests/DefaultSettings.js',
        './tests/37_PendingStorage.js',
        './tests/43_WeightType.js',
        './tests/49_FlatRateLocalMove.js',
        './tests/TheCleaner.js'//==============================уборка=========================

    ];
    config.chainFail = false;
    config.browser = 'chrome';
    V.frontURL = 'http://stage.themoveboard.com:8001/front_site/';
    V.accountURL = 'http://stage.themoveboard.com:8001/account/#/login';
    V.adminURL = 'http://stage.themoveboard.com:8001/moveBoard/#/login';
    V.adminLogin = 'AdminFlow3';
    V.adminPassword = 'test';
    V.foremanLogin = 'ForemanFlow3';
    V.foremanPassword = '123';
    V.foremanName = 'Foreman Flow3';
    V.adminName = 'Admin';

};
