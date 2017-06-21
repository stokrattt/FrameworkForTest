module.exports = function(config,V) {
    config.suite = ['./tests/70_SITAddTripPersonallyForeman.js'
    ];

    config.chainFail = false;
    config.timeout = 25000;
    // V.frontURL = 'http://stage.themoveboard.com:8090/front_site/';
    // V.accountURL = 'http://stage.themoveboard.com:8090/account/#/login';
    // V.adminURL = 'http://stage.themoveboard.com:8090/moveBoard/#/login';

    // V.frontURL = 'http://stage.themoveboard.com:8001/front_site/';
    // V.accountURL = 'http://stage.themoveboard.com:8001/account/#/login';
    // V.adminURL = 'http://stage.themoveboard.com:8001/moveBoard/#/login';
    // V.adminLogin = 'WorkAdmin';
    // V.adminPassword = 'test';
     V.frontURL = 'http://stage.themoveboard.com:8001/front_site/';
    V.accountURL = 'http://stage.themoveboard.com:8001/account/#/login';
    V.adminURL = 'http://stage.themoveboard.com:8001/moveBoard/#/login';
    // V.adminLogin = 'TestAdmin';
    // V.adminPassword = 'test';
    // V.foremanLogin = 'TestForeman';
    // V.foremanPassword = '123';
    // V.foremanName = 'Test Foreman';
    // V.foremanEmail = 'TestForeman@mail.com';
    V.adminLogin = 'AdminFlow1';
    V.adminPassword = 'test';
    V.foremanLogin = 'ForemanFlow1';
    V.foremanPassword = 'test';
    V.foremanName = 'Foreman Flow1';
    V.adminName = 'Admin';
    V.foremanEmail = 'ForemanFlow1@test.com';

    V.managerName = 'emilia clark';
    V.managerFirstName = 'emilia';
};
