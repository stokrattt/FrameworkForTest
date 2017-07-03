module.exports = function(config,V) {
    config.suite = ['./tests/12_CreateMov&StorFromFrontDownAndCompare.js'];
    config.chainFail = false;
    config.browser = 'chrome';
    config.timeout = 25000;
    V.frontURL = 'http://stage.themoveboard.com:8001/front_site/';
    V.accountURL = 'http://stage.themoveboard.com:8001/account/#/login';
    V.adminURL = 'http://stage.themoveboard.com:8001/moveBoard/#/login';
    V.adminLogin = 'TestAdmin';
    V.adminPassword = 'test';
    V.foremanLogin = 'TestForeman';
    V.foremanPassword = '123';
    V.foremanName = 'Test Foreman';
    V.adminName = 'Test';
    V.foremanEmail = 'TestForeman@mail.com';
    V.adminEmail = 'test@boston.com';//сюда будут прилетать все письма
    V.managerName = 'emilia clark';
    V.testMail = {
        login: 'test.boston',
        mail: 'test.boston@mail.ru',
        password: 'YLZ60tO^ycpz'
    };


};


