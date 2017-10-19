module.exports = function(config,V) {
    config.suite = [
        './tests/4_CheckFuelCFitInventOffCalc.js',
        './tests/7_DepartmenTest.js',//использует roma4ke
        './tests/44_CreateForemanAndAssignCheck.js',//использует roma4ke
        './tests/20_LDTopForm.js',
        './tests/21_LDFromAdminCheckPayroll.js',
        './tests/22_WeDontMoveToThisState.js',
        './tests/33_AddCarrier.js',
        './tests/34_ContractPageCustomBlock.js',
        './tests/35_InventoryLocalMovingAndValuation.js',
        './tests/36_DatePending.js',
        './tests/45_MovStorAddInventConfirmClient.js',
        './tests/47_SendMessage.js',
        './tests/TheCleaner.js'//==============================уборка=========================

    ];
    config.chainFail = false;
    config.browser = 'chrome';
    V.frontURL = 'http://stage.themoveboard.com:8001/front_site/';
    V.accountURL = 'http://stage.themoveboard.com:8001/account/#/login';
    V.adminURL = 'http://stage.themoveboard.com:8001/moveBoard/#/login';
    V.adminLogin = 'AdminFlow4';
    V.adminPassword = 'test';
    V.foremanLogin = 'ForemanFlow4';
    V.foremanPassword = '123';
    V.foremanName = 'Foreman Flow4';
    V.adminName = 'Admin';
    V.foremanEmail = 'ForemanFlow1@test.com';


};
