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
global.FileDetector = webdriver.FileDetector;
global.By = webdriver.By;
global.until = webdriver.until;
global.MyError = webdriver.error;
global.chainFail = false;
global.driver = 0;

function getNewDriver(){
    if (global.driver!==0){
        global.driver.quit();
    }
    var SELENIUM_HOST = 'http://localhost:4444/wd/hub';
    global.driver = new webdriver.Builder()

        .usingServer(SELENIUM_HOST)
        .withCapabilities({browserName: 'chrome'})
        .build();

    driver.manage().window().setSize(1400, 800);
}

function getTestName(string){
    let pos = 0;
    for (let i=0; i<string.length; i++) {if (string[i]=='/') {pos=i;}};
    return string.substring(pos, string.indexOf('.js'));
}

global.readyForNext = true;
global.errorNumber = 0;
global.testName = '';
global.path = require('path');
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
global.nowWeDoing = 'something';
webdriver.promise.controlFlow().on('uncaughtException', function (e) {
    driver.wait(driver.takeScreenshot().then(function (image) {
            let exist = fs.existsSync('reports/'+testName);
            if (!exist) {fs.mkdirSync('reports/'+testName);}
            fs.writeFile('reports/'+testName + '/' + errorNumber + '.png', image, 'base64', function (err) {
                console.log(err);
            });
            fs.writeFile('reports/'+testName + '/' + errorNumber + '.txt', nowWeDoing+'\n'+e, function (err) {
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

global.testPassed=[];
global.testN = 0;
var EventEmitter = require('events');
class MyEmitter extends EventEmitter {
}
global.myEmitter = new MyEmitter();
myEmitter.on('event', () => {
    if (testN>0) {if (!Success) {testPassed.push('Failed '+testName);} else {testPassed.push('Passed' + testName);}}
    if ((testN < suite.length)&&(!(chainFail&&!Success))) {
        global.Success = false;
        console.log('next...'+testN);
        testName = getTestName(suite[testN]);
        deleteFolderRecursive('reports/'+testName);
        getNewDriver();
        testN++;
        Fiber(require(suite[testN-1])).run();
    } else {
        if (global.driver!==0){
            global.driver.quit();
        }
        console.log('end...');
        for (let i=0; i<testPassed.length; i++){console.log(testPassed[i]);}
    }
});
global.Success = true;
myEmitter.emit('event');
