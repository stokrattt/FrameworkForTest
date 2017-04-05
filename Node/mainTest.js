//========================set up global variables========================
var constants = require('./common/constants');
var SF={};
var JS={};
var JSstep={};
var VD={};
var V={};
var LF={};

var system={};
system.path = require('path');
system.fs = require('fs');
global.Fiber = require('fibers');

var config={};
config.chainFail = false;
config.D = false;
config.timeout = 25000;

var condition={};
condition.readyForNext = true;
condition.errorNumber = 0;
condition.testName = '';
condition.busy = false;
condition.Success = false;
condition.NotValid=false;
condition.nowWeDoing = 'something';

//=====================set up bebDriver==================================
var webdriver = require('selenium-webdriver');
var FileDetector = webdriver.FileDetector;
var By = webdriver.By;
var until = webdriver.until;


function getNewDriver() {
    var SELENIUM_HOST = 'http://localhost:4444/wd/hub';
    let driverNew = new webdriver.Builder()

        .usingServer(SELENIUM_HOST)
        .withCapabilities({browserName: 'chrome'})
        .build();

    driverNew.manage().window().setSize(1400, 800);
    return driverNew;
}

driver = getNewDriver();

function getTestName(string){
    let pos = 0;
    for (let i=0; i<string.length; i++) {if (string[i]=='/') {pos=i;}};
    return string.substring(pos, string.indexOf('.js'));
}


var deleteFolderRecursive = function(path) {
    if( system.fs.existsSync(path) ) {
        system.fs.readdirSync(path).forEach(function(file,index){
            var curPath = path + "/" + file;
            if(system.fs.lstatSync(curPath).isDirectory()) { // recurse
                deleteFolderRecursive(curPath);
            } else { // delete file
                system.fs.unlinkSync(curPath);
            }
        });
        system.fs.rmdirSync(path);
    }
};

webdriver.promise.controlFlow().on('uncaughtException', function (e) {
    driver.wait(driver.takeScreenshot().then(function (image) {
            let exist = system.fs.existsSync('reports/'+condition.testName);
            if (!exist) {system.fs.mkdirSync('reports/'+condition.testName);}
        condition.errorNumber++;
        system.fs.writeFile('reports/'+condition.testName + '/' + condition.errorNumber + '.png', image, 'base64', function (err) {
                console.log(err);
            });
        system.fs.writeFile('reports/'+condition.testName + '/' + condition.errorNumber + '.txt', condition.nowWeDoing+'\n'+e.stack, function (err) {
                console.log(err);
            });
            console.log('сделали скрин');
            console.log('Произошла ошибка: ', e);
            if (!config.D) {
                system.myEmitter.emit('event');
            }

    }));
    if (config.D) {
        condition.busy = true;
        Debug.pauseWatcher();
    }
});

//=================================globals again=====================================

SF = require('./system/ShortFunctionsWD.js')(driver, system, config, By, until,constants, condition);
JS = require('./system/JSshortFunctions.js')(driver, system, config, By, until,constants, condition);
JSstep = require('./common/JSsteps');
VD = require('./system/ValidationsWD')(system, driver, condition);
LF = require('./common/LongFunctionsWD.js')(driver, SF, JS, JSstep, VD, V, By, until,FileDetector, system, condition, config,constants);

//=================set Up Debug==========================================
//======================check for debug mode=============================
var attrs = 2;
if ('-d' == process.argv[attrs]) {
    console.log('debug enabled');
    config.D = true;
    attrs++;
}
global.Debug = require("./system/DebugWD.js")(driver, SF, JS, JSstep, VD, V, By, until,FileDetector, system, condition, LF,config,constants);
if (config.D) {
    Debug.WDconsole();
}

//=================reading parametres from CLI===========================
for (attrs; attrs < process.argv.length; attrs++) {
    if (process.argv[attrs].indexOf('=') != -1) {
        V[process.argv[attrs].substring(0, process.argv[attrs].indexOf('='))] = process.argv[attrs].substring(process.argv[attrs].indexOf('=') + 1);
    } else if (process.argv[attrs].indexOf('config:') != -1) {
        require('./configs/'+process.argv[attrs].substring(process.argv[attrs].indexOf(':') + 1))(config,V);
    }
}
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

var testPassed=[];
condition.testN = 0;
var EventEmitter = require('events');
class MyEmitter extends EventEmitter {
}
system.myEmitter = new MyEmitter();
system.myEmitter.on('event', () => {
    if (condition.testN>0) {if (!condition.Success||condition.NotValid) {testPassed.push('Failed '+condition.testName);}
        else {testPassed.push('Passed' + condition.testName);}}
    if ((condition.testN < config.suite.length)&&(!(config.chainFail&&!condition.Success))) {
        condition.Success = false;
        condition.NotValid=false;
        condition.nowWeDoing = 'something';
        condition.errorNumber = 0;
        condition.testName = getTestName(config.suite[condition.testN]);
        console.log('next...'+condition.testN + ' '+condition.testName);
        deleteFolderRecursive('reports/'+condition.testName);
        if (driver == null) {driver = getNewDriver();}
        condition.testN++;
        Fiber(function(){require(config.suite[condition.testN-1])
        (driver, SF, JS, JSstep, VD, V, By, until,FileDetector, system, condition, LF, config,constants);}).run();
    } else {
        if (driver!==null){
            driver.quit();
        }
        console.log('end...');
        for (let i=0; i<testPassed.length; i++){console.log(testPassed[i]);}
    }
});
condition.Success = true;
system.myEmitter.emit('event');
