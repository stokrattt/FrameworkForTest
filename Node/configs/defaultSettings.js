module.exports = function(config,V) {
    config.suite = [
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
