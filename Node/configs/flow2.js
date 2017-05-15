module.exports = function(config,V) {
    config.suite = [
        './tests/DefaultSettings.js',
        './tests/10_CompareQuotesLocal.js',
        './tests/12_CreateMov&StorFromFrontDownAndCompare.js',
        './tests/18_ForemanSignJob.js',
        './tests/17_LoadingHelpDownForm.js',
        './tests/14_LoadingHelpTopForm.js',
        './tests/SetReservationPrice.js',
        './tests/15_OvernightDownForm.js',
        './tests/8_SaveNothing.js',
        './tests/19_SignForemanJobAndUnssignetJob.js',
        './tests/13_UnloadingHelpTopForm.js',
        './tests/16_UnloadHelpDownFront.js',
        './tests/TheCleaner.js',//==============================уборка=========================
    ];
    config.chainFail = false;
    config.browser = 'chrome';
    V.frontURL = 'http://stage.themoveboard.com:8001/front_site/';
    V.accountURL = 'http://stage.themoveboard.com:8001/account/#/login';
    V.adminURL = 'http://stage.themoveboard.com:8001/moveBoard/#/login';
    V.adminLogin = 'AdminFlow2@test.com';
    V.adminPassword = 'test';
    V.foremanLogin = 'ForemanFlow2@test.com';
    V.foremanPassword = '123';
    V.foremanName = 'Foreman Flow2';

};
