module.exports = function(config,V) {
    config.suite = ['./tests/CreateAllRequestFromFront_PAUSE.js'];
    config.chainFail = false;
    V.frontURL = 'http://stage.themoveboard.com:8001/front_site/';
    V.accountURL = 'http://stage.themoveboard.com:8001/account/#/login';
    V.adminURL = 'http://stage.themoveboard.com:8001/moveBoard/#/login';
};


