module.exports = function(config,V) {

    config.suite = ['./tests/32_AllMovingWithStorage.js'];
    config.chainFail = false;
    config.browser = 'chrome';
    config.timeout = 35000;
    //V.frontURL = 'http://stage.themoveboard.com:8005';                    //dev
    //V.accountURL = 'http://stage.themoveboard.com:8005/account/#/login';  //dev
    //V.adminURL = 'http://stage.themoveboard.com:8005/moveBoard/#/login';  //dev

     V.frontURL = 'http://stage.themoveboard.com:8001/front_site';
     V.accountURL = 'http://stage.themoveboard.com:8001/account/#/login';
     V.adminURL = 'http://stage.themoveboard.com:8001/moveBoard/#/login';

    // V.frontURL = 'http://stage.themoveboard.com:8071';
    // V.accountURL = 'http://stage.themoveboard.com:8071/account/#/login';
    // V.adminURL = 'http://stage.themoveboard.com:8071/moveBoard/#/login';
    //V.frontURL = 'http://89.223.29.231:8080/front_site/';
    //V.accountURL = 'http://89.223.29.231:8080/account/#/login';
    //V.adminURL = 'http://moversboard.net:8051/moveBoard/#/login';
    V.adminLogin = 'WorkAdmin';
    V.adminPassword = 'test';
    V.adminEmail = 'bostonflat.test@mail.ru';//сюда будут прилетать все письма
    V.foremanLogin = 'TestForeman';
    V.foremanLoginFlatRate = 'FlatRateForeman';
    V.foremanPassword = '123';
    V.foremanName = 'Test Foreman';
    V.foremanLogin2 = 'ForemanFlow1';
    V.foremanPassword2 = '123';
    V.foremanName2 = 'Foreman Flow1';
    V.helperName = 'Test Helper1';
    V.adminName = 'Test';
    V.foremanEmail = 'TestForeman@mail.com';
    V.managerName = 'emilia clark';
    V.managerFirstName = 'emilia';
    V.ForEmail = 'ivanforeman173@gmail.com';
    V.googleloginFor =  'ivanforeman173';
    V.googlePasFor =  'qwertyuio9';
    V.salesEmail = 'truks8158@gmail.com';
    V.googleloginSale =  'truks8158';
    V.googlePasSale =  'qwertyuio9';
    V.testMail = {
        login: 'test.boston',
        mail: 'bostonflat.test@mail.ru',
        password: 'YLZ60tO^ycpz'
    }


};


