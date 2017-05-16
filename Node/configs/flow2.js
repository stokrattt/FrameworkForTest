module.exports = function(config,V) {
    config.suite = [
        './tests/2_CheckPermissions.js',
        './tests/9_TestNotes.js',
        './tests/12_CreateMov&StorFromFrontDownAndCompare.js',
        './tests/18_ForemanSignJob.js',
        './tests/26_CloneRequest.js',
        './tests/27_Receipt.js',
        './tests/30_StorageTenant.js',
        './tests/48_Review.js',
        './tests/38_CustomPayrollInRequest.js',
        './tests/40_PayrollTableCheckSumJobs.js',
        './tests/42_DrivingTimeLocalMove.js'

    ];
    config.chainFail = false;
    config.browser = 'chrome';
    V.frontURL = 'http://stage.themoveboard.com:8001/front_site/';
    V.accountURL = 'http://stage.themoveboard.com:8001/account/#/login';
    V.adminURL = 'http://stage.themoveboard.com:8001/moveBoard/#/login';
    V.adminLogin = 'AdminFlow2';
    V.adminPassword = 'test';
    V.foremanLogin = 'ForemanFlow2';
    V.foremanPassword = '123';
    V.foremanName = 'Foreman Flow2';

};
