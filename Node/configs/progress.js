module.exports = function(config,V) {
    config.suite = ['./tests/7_DepartmenTest.js'];
    config.chainFail = false;
    config.browser = 'chrome';
    config.timeout = 25000;
    V.frontURL = 'http://stage.themoveboard.com:8001/front_site/';
    V.accountURL = 'http://stage.themoveboard.com:8001/account/#/login';
    V.adminURL = 'http://stage.themoveboard.com:8001/moveBoard/#/login';
    V.adminLogin = 'WorkAdmin';
    V.adminPassword = 'test';
    V.foremanLogin = 'TestForeman';
    V.foremanPassword = '123';
    V.foremanName = 'Test Foreman';
    V.adminName = 'Work';
    V.foremanEmail = 'TestForeman@mail.com';

};


