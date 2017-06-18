module.exports = function(config,V) {

    config.timeout = 60000;

    config.suite = [
        './tests/20_LDTopForm.js'
    ];
    config.chainFail = false;
    config.browser = 'chrome';
    V.frontURL = 'http://89.223.29.231:8080/front_site/';
    V.accountURL = 'http://89.223.29.231:8080/account/#/login';
    V.adminURL = 'http://89.223.29.231:8080/moveBoard/#/login';
    V.adminLogin = 'TestAdmin';
    V.adminPassword = 'test';
    V.adminEmail = 'test@boston.com';//сюда будут прилетать все письма
    V.foremanLogin = 'TestForeman';
    V.foremanPassword = '123';
    V.foremanName = 'Test Foreman';
    V.adminName = 'Test';
    V.foremanEmail = 'TestForeman@mail.com';
    V.managerName = 'emilia clark';
    V.managerFirstName = 'emilia';
};


