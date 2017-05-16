module.exports = function(config,V) {
    config.suite = [
        './tests/DefaultSettings.js',

        './tests/6_WithoutReservationMov&Stor.js',
        './tests/5_ReservationMov&Stor.js',
        './tests/13_UnloadingHelpTopForm.js',
        './tests/14_LoadingHelpTopForm.js',
        './tests/15_OvernightDownForm.js',
        './tests/16_UnloadHelpDownFront.js',
        './tests/17_LoadingHelpDownForm.js',
        './tests/41_ContractPageSettings.js',
        './tests/46_FuelByMileage.js',
        './tests/51_ServiceTypesOnOff.js',

        './tests/DefaultSettings.js'
    ];
    config.chainFail = false;
    config.browser = 'chrome';
    V.frontURL = 'http://stage.themoveboard.com:8001/front_site/';
    V.accountURL = 'http://stage.themoveboard.com:8001/account/#/login';
    V.adminURL = 'http://stage.themoveboard.com:8001/moveBoard/#/login';
    V.adminLogin = 'AdminFlow5';
    V.adminPassword = 'test';
    V.foremanLogin = 'ForemanFlow5';
    V.foremanPassword = '123';
    V.foremanName = 'Foreman Flow5';

};
