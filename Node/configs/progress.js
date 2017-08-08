module.exports = function(config,V) {
    config.suite = ['./tests/29_CheckFewMoverForUserCalcOffManual.js'];
    config.chainFail = false;
    config.browser = 'chrome';
    config.timeout = 30000;
    //V.frontURL = 'http://stage.themoveboard.com:8005';                    //dev
    //V.accountURL = 'http://stage.themoveboard.com:8005/account/#/login';  //dev
    //V.adminURL = 'http://stage.themoveboard.com:8005/moveBoard/#/login';  //dev
     V.frontURL = 'http://stage.themoveboard.com:8001/front_site';
     V.accountURL = 'http://stage.themoveboard.com:8001/account/#/login';
     V.adminURL = 'http://stage.themoveboard.com:8001/moveBoard/#/login';
    //V.frontURL = 'http://89.223.29.231:8080/front_site/';
    //V.accountURL = 'http://89.223.29.231:8080/account/#/login';
    //V.adminURL = 'http://89.223.29.231:8080/moveBoard/#/login';
    V.adminLogin = 'WorkAdmin';
    V.adminPassword = 'test';
    V.adminEmail = 'test.boston@mail.ru';//сюда будут прилетать все письма
    V.foremanLogin = 'TestForeman';
    V.foremanPassword = '123';
    V.foremanName = 'Test Foreman';
    V.foremanLogin2 = 'ForemanFlow1';
    V.foremanPassword2 = '123';
    V.foremanName2 = 'Foreman Flow1';
    V.adminName = 'Test';
    V.foremanEmail = 'TestForeman@mail.com';
    V.managerName = 'emilia clark';
    V.managerFirstName = 'emilia';
    V.testMail = {
        login: 'test.boston',
        mail: 'test.boston@mail.ru',
        password: 'YLZ60tO^ycpz'
    };


};


