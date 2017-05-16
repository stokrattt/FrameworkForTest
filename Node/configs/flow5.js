module.exports = function(config,V) {
    config.suite = [

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
