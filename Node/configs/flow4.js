module.exports = function(config,V) {
    config.suite = [
        './tests/30_StorageTenant.js',
        './tests/31_FlateRateBooking.js',
        './tests/49_FlatRateLocalMove.js',
        './tests/1_AllLocalMoving.js',
        './tests/32_AllMovingWithStorage.js',
        './tests/TheCleaner.js',//==============================уборка=========================
    ];
    config.chainFail = false;
    config.browser = 'chrome';
    V.frontURL = 'http://stage.themoveboard.com:8001/front_site/';
    V.accountURL = 'http://stage.themoveboard.com:8001/account/#/login';
    V.adminURL = 'http://stage.themoveboard.com:8001/moveBoard/#/login';
    V.adminLogin = 'AdminFlow4@test.com';
    V.adminPassword = 'test';
    V.foremanLogin = 'ForemanFlow4@test.com';
    V.foremanPassword = '123';
    V.foremanName = 'Foreman Flow4';

};
