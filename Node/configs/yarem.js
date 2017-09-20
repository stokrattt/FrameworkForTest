module.exports = function(config,V) {
    config.suite = ['./tests/83_PayrollAllDepartment.js'];
    config.chainFail = false;
    config.browser = 'chrome';
    config.timeout = 60000;
    V.frontURL = 'http://stage.themoveboard.com:8001/front_site/';
    V.accountURL = 'http://stage.themoveboard.com:8001/account/#/login';
    V.adminURL = 'http://stage.themoveboard.com:8001/moveBoard/#/login';
    V.adminLogin = 'TestYarem';
    V.adminPassword = 'test';
    V.adminEmail = 'test.boston@mail.ru';//сюда будут прилетать все письма
    V.foremanLogin = 'TestForeman';
    V.foremanPassword = '123';
    V.foremanName = 'Test Foreman';
    V.foremanEmail = 'TestForeman@mail.com';
    V.testMail = {
        login: 'test.boston',
        mail: 'test.boston@mail.ru',
        password: 'YLZ60tO^ycpz'
    }

};