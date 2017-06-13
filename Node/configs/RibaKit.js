module.exports = function(config,V) {
    config.suite = [
        './tests/49_FlatRateLocalMove.js'
    ];
    config.chainFail = false;
    /*V.adminURL = 'localhost:8080/moveBoard/#/dashboard';
    V.accountURL = 'localhost:8080/account/#/login';
    V.frontURL = 'localhost:8080/front_site/esquiremoving/';*/
    V.frontURL = 'http://89.223.29.231:8080/front_site/';
    V.accountURL = 'http://89.223.29.231:8080/account/#/login';
    V.adminURL = 'http://89.223.29.231:8080/moveBoard/#/login';
    V.adminLogin = 'RibaKitAdmin';
    V.adminPassword = 'test';
    V.foremanLogin = 'RibaKitForeman';
    V.foremanPassword = '123';
    V.foremanName = 'Foreman Riba';
    V.foremanEmail = 'RibaKitForeman@test.test';
    V.managerName = 'emilia clark';
    V.managerFirstName = 'emilia';
};


