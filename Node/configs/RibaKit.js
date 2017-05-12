module.exports = function(config,V) {
    config.suite = [
        './tests/1_AllLocalMoving.js'
    ];
    config.chainFail = false;
    /*V.adminURL = 'localhost:8080/moveBoard/#/dashboard';
    V.accountURL = 'localhost:8080/account/#/login';
    V.frontURL = 'localhost:8080/front_site/esquiremoving/';*/
    V.frontURL = 'http://stage.themoveboard.com:8001/front_site/';
    V.accountURL = 'http://stage.themoveboard.com:8001/account/#/login';
    V.adminURL = 'http://stage.themoveboard.com:8001/moveBoard/#/login';
    V.adminLogin = 'WorkAdmin';
    V.adminPassword = 'test';
};


