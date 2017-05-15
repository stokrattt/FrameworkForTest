module.exports = function(config,V) {
    config.suite = [
        './tests/SetReservationPrice.js',
        './tests/DefaultSettings.js',
        './tests/20_LDTopForm.js',
        './tests/22_WeDontMoveToThisState.js',
        './tests/23_FiltrationMoveDate.js',
        './tests/24_FiltrationMoveDateCreateDate.js',
        './tests/25_ChangeDateDispatch.js',
        './tests/26_CloneRequest.js',
        './tests/27_Receipt.js',
        './tests/28_CalcWarnAndTurnOffWhenManual.js',
        './tests/29_CheckFewMoverForUser.js',
        './tests/TheCleaner.js',//==============================уборка=========================
    ];
    config.chainFail = false;
    config.browser = 'chrome';
    V.frontURL = 'http://stage.themoveboard.com:8001/front_site/';
    V.accountURL = 'http://stage.themoveboard.com:8001/account/#/login';
    V.adminURL = 'http://stage.themoveboard.com:8001/moveBoard/#/login';
    V.adminLogin = 'AdminFlow3@test.com';
    V.adminPassword = 'test';
    V.foremanLogin = 'ForemanFlow3@test.com';
    V.foremanPassword = '123';
    V.foremanName = 'Foreman Flow3';

};
