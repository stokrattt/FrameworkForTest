//======================check for debug mode=============================
var attrs = 2;
global.D = false;
if ('-d' == process.argv[attrs]) {
    console.log('debug enabled')
    D = true;
    attrs++;
}
//=====================set up bebDriver==================================
var webdriver = require('selenium-webdriver');
global.By = webdriver.By;
global.until = webdriver.until;

var SELENIUM_HOST = 'http://localhost:4444/wd/hub';
global.driver = new webdriver.Builder()
    .usingServer(SELENIUM_HOST)
    .withCapabilities({browserName: 'chrome'})
    .build();

webdriver.promise.controlFlow().on('uncaughtException', function (e) {
    driver.takeScreenshot().then(
        function (image, err) {
            require('fs').writeFile('out.png', image, 'base64', function (err) {
                console.log(err);
            });
            console.log('сделали скрин');
            console.log('Произошла ошибка: ', e);
        });
});

//========================set up global variables========================
global.Fiber = require('fibers');
global.busy = false;
global.Dtimeout = 10000;
global.V = {};
global.Debug = require("./DebugWD.js");
var SF = require('./ShortFunctionsWD.js');
var JSs = require('./JSsteps');
var LF = require('./LongFunctionsWD.js');
if (D) {
    Debug.console();
    Debug.pauseWatcher();
}
//=================reading parametres from CLI===========================
for (attrs; attrs < process.argv.length; attrs++) {
    if (process.argv[attrs].indexOf('=') != -1) {
        global[process.argv[attrs].substring(0, process.argv[attrs].indexOf('='))] = process.argv[attrs].substring(process.argv[attrs].indexOf('=') + 1);
    }
}
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
Fiber(require('./tests/createLocalMoving.js')).run();
