module.exports = function(config,V) {
    config.suite = ['./tests/8_SaveNothing.js'];
    config.chainFail = true;
    V.frontURL = 'http://stage.themoveboard.com:8001/front_site/';
    V.accountURL = 'http://stage.themoveboard.com:8001/account/#/login';
    V.adminURL = 'http://stage.themoveboard.com:8001/moveBoard/#/login';
    //return config;
};