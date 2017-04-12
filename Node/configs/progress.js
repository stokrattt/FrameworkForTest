module.exports = function(config,V) {
    config.suite = ['./tests/LDFromAdmin.js',  './tests/unloadingHelpDownForm.js',
        './tests/SetReservationPrice.js',
        './tests/LDTopForm.js',
        './tests/TheCleaner.js'];
    config.chainFail = false;
    config.timeout = 30000;
    V.frontURL = 'http://stage.themoveboard.com:8001/front_site/';
    V.accountURL = 'http://stage.themoveboard.com:8001/account/#/login';
    V.adminURL = 'http://stage.themoveboard.com:8001/moveBoard/#/login';
};


