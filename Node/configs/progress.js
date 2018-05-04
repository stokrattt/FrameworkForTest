module.exports = function(config,V) {

    config.suite = ['./tests/90_ChangeEmailUser.js'];
    config.chainFail = false;
    config.browser = 'chrome';
    config.timeout = 25000;
    // V.frontURL = 'http://test1.stage.themoveboard.com:81/front_site/';
    // V.accountURL = 'http://test1.stage.themoveboard.com:81/account/';  //dev
    // V.adminURL = 'http://test1.stage.themoveboard.com:81/moveBoard/';  //dev

    // V.frontURL = 'http://test2.stage.themoveboard.com:82/front_site/';
    // V.accountURL = 'http://test2.stage.themoveboard.com:82/account/';  //dev
    // V.adminURL = 'http://test2.stage.themoveboard.com:82/moveBoard/';  //dev

    // V.frontURL = 'http://test3.stage.themoveboard.com:83/front_site/';
    // V.accountURL = 'http://test3.stage.themoveboard.com:83/account/';  //dev
    // V.adminURL = 'http://test3.stage.themoveboard.com:83/moveBoard/';  //dev


    V.frontURL = 'http://stage.stage.themoveboard.com:91';                       //stage
     V.accountURL = 'http://stage.stage.themoveboard.com:91/account/#/login';    //stage
     V.adminURL = 'http://stage.stage.themoveboard.com:91/moveBoard/#/login';    //stage

    // V.frontURL = 'http://stage.themoveboard.com:8082';
    // V.accountURL = 'http://stage.themoveboard.com:8082/account/#/login';
    // V.adminURL = 'http://stage.themoveboard.com:8082/moveBoard/#/login';

    // V.frontURL = 'http://dev.stage.themoveboard.com:90/';                       //dev
    // V.accountURL = 'http://dev.stage.themoveboard.com:90/account/#/login';      //dev
    // V.adminURL = 'http://dev.stage.themoveboard.com:90/moveBoard/#/login';      //dev

    V.adminLogin = 'WorkAdmin';
    // V.adminLogin = 'TestAdmin';
    V.adminPassword = 'test';
    V.adminEmail = 'test.boston@mail.ru';//сюда будут прилетать все письма
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


