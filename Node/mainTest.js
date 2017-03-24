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
global.MyError = webdriver.error;
global.chainFail = false;

function getNewDriver(){
    var SELENIUM_HOST = 'http://localhost:4444/wd/hub';
    global.driver = new webdriver.Builder()

        .usingServer(SELENIUM_HOST)
        .withCapabilities({browserName: 'chrome'})
        .build();

    driver.manage().window().setSize(1400, 800);
}

global.readyForNext = true;
global.errorNumber = 0;
global.testName = '';
global.fs = require('fs');
global.deleteFolderRecursive = function(path) {
    if( fs.existsSync(path) ) {
        fs.readdirSync(path).forEach(function(file,index){
            var curPath = path + "/" + file;
            if(fs.lstatSync(curPath).isDirectory()) { // recurse
                deleteFolderRecursive(curPath);
            } else { // delete file
                fs.unlinkSync(curPath);
            }
        });
        fs.rmdirSync(path);
    }
};

webdriver.promise.controlFlow().on('uncaughtException', function (e) {
    driver.wait(driver.takeScreenshot().then(function (image) {
            let exist = fs.existsSync('reports/'+testName);
            if (!exist) {fs.mkdirSync('reports/'+testName);}
            fs.writeFile('reports/'+testName + '/' + errorNumber + '.png', image, 'base64', function (err) {
                console.log(err);
            });
            fs.writeFile('reports/'+testName + '/' + errorNumber + '.txt', e, function (err) {
                console.log(err);
            });
            console.log('сделали скрин');
            console.log('Произошла ошибка: ', e);
            if (!D) {
                myEmitter.emit('event');
            }

    }));
    if (D) {
        busy = true;
        Debug.pauseWatcher();
    }
});

//========================set up global variables========================
global.Fiber = require('fibers');
global.busy = false;
global.Dtimeout = 25000;
global.V = {};
global.Debug = require("./DebugWD.js");
var GB = require('./constants');
var SF = require('./ShortFunctionsWD.js');
var JSs = require('./JSsteps');
var LF = require('./LongFunctionsWD.js');
var VD = require('./ValidationsWD');
if (D) {
    Debug.console();
}
//=================reading parametres from CLI===========================
for (attrs; attrs < process.argv.length; attrs++) {
    if (process.argv[attrs].indexOf('=') != -1) {
        global[process.argv[attrs].substring(0, process.argv[attrs].indexOf('='))] = process.argv[attrs].substring(process.argv[attrs].indexOf('=') + 1);
    } else if (process.argv[attrs].indexOf('config:') != -1) {
        global.config = require('./configs/'+process.argv[attrs].substring(process.argv[attrs].indexOf(':') + 1));
    }
}
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++


global.testN = 0;
var EventEmitter = require('events');
class MyEmitter extends EventEmitter {
}
global.myEmitter = new MyEmitter();
myEmitter.on('event', () => {
    if ((testN < suite.length)&&(!(chainFail&&!Success))) {
        global.Success = false;
        console.log('next...'+testN);
        testName = suite[testN].substring(suite[testN].indexOf('#')+1, suite[testN].indexOf('.js'));
        deleteFolderRecursive('reports/'+testName);
        getNewDriver();
        testN++;
        Fiber(require(suite[testN-1])).run();
    } else {console.log('end...');}
});
global.Success = true;
myEmitter.emit('event');
