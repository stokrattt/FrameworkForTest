module.exports = function(config,V) {
    config.suite = [
        './tests/1_AllLocalMoving.js',
        './tests/8_SaveNothing.js',
        './tests/11_CheckBillOfLadding.js',
        './tests/28_CalcWarnAndTurnOffWhenManual.js',
        './tests/29_CheckFewMoverForUser.js',
        './tests/32_AllMovingWithStorage.js',
        './tests/50_AddJobToTrip.js',
        './tests/TheCleaner.js'//==============================уборка=========================

    ];
    config.chainFail = false;
    config.browser = 'chrome';
    V.frontURL = 'http://stage.themoveboard.com:8001/front_site/';
    V.accountURL = 'http://stage.themoveboard.com:8001/account/#/login';
    V.adminURL = 'http://stage.themoveboard.com:8001/moveBoard/#/login';
    V.adminLogin = 'AdminFlow1';
    V.adminPassword = 'test';
    V.foremanLogin = 'ForemanFlow1';
    V.foremanPassword = '123';
    V.foremanName = 'Foreman Flow1';
    V.adminName = 'Admin';
    V.foremanEmail = 'ForemanFlow1@test.com';
};
