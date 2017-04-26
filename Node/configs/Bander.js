module.exports = function(config,V) {
    config.suite = ['./tests/33_AddCarrier.js'];

    config.chainFail = false;
    config.timeout = 30000;
    V.frontURL = 'http://stage.themoveboard.com:8090/front_site/';
    V.accountURL = 'http://stage.themoveboard.com:8090/account/#/login';
    V.adminURL = 'http://stage.themoveboard.com:8090/moveBoard/#/login';
};
