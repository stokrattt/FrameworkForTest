module.exports = function(config,V) {
    config.suite = ['./tests/5_TotalInvoices.js'];
    config.chainFail = false;
    config.browser = 'chrome';
    config.timeout = 25000;
    V.frontURL = 'http://stage.stage.themoveboard.com:91/';
    V.accountURL = 'http://stage.stage.themoveboard.com:91/account/#/login';
    V.adminURL = 'http://stage.stage.themoveboard.com:91/moveBoard/#/login';
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