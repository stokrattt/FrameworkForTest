module.exports = function(config,V) {
    config.suite = [
        './tests/33_AddCarrier.js',
        './tests/34_ContractPageCustomBlock.js',
        './tests/35_InventoryLocalMoving.js',
        './tests/36_DatePending.js',
        './tests/37_PendingStorage.js',
        './tests/38_CustomPayrollInRequest.js',
        // './tests/39_CloneRequest.js',
        './tests/40_PayrollTableCheckSumJobs.js',
        './tests/41_ContractPageSettings.js',
        './tests/42_DrivingTimeLocalMove.js',
        './tests/43_WeightType.js',

        './tests/45_MovStorAddInventConfirmClient.js',
        './tests/46_FuelByMileage.js',
        './tests/47_SendMessage.js',
        './tests/48_Review.js',
        './tests/TheCleaner.js',//==============================уборка=========================

    ];
    config.chainFail = false;
    config.browser = 'chrome';
    V.frontURL = 'http://stage.themoveboard.com:8001/front_site/';
    V.accountURL = 'http://stage.themoveboard.com:8001/account/#/login';
    V.adminURL = 'http://stage.themoveboard.com:8001/moveBoard/#/login';
    V.adminLogin = 'AdminFlow5@test.com';
    V.adminPassword = 'test';
    V.foremanLogin = 'ForemanFlow5@test.com';
    V.foremanPassword = '123';
    V.foremanName = 'Foreman Flow5';

};
