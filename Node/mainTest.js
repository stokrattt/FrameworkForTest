let startTests = new Date().getTime();
//========================set up global variables========================
var constants = require('./common/constants');
var SF={};
var JS={};
var JSstep={};
var VD={};
var V={};
var MF={};
var LF={};


var system={};
system.path = require('path');
system.fs = require('fs');
system.colors=require('colors');

global.Fiber = require('fibers');

var config={};
config.chainFail = false;
config.D = false;
config.timeout = 30000;
config.browser = 'chrome';

var condition={};
condition.readyForNext = true;
condition.errorNumber = 0;
condition.testName = '';
condition.busy = false;
condition.Success = false;
condition.NotValid=false;
condition.nowWeDoing = 'something';

//=======================creating reports folder ============================
let exist = system.fs.existsSync('reports');
if (!exist) {system.fs.mkdirSync('reports');}

//======================check for debug mode=============================
var attrs = 2;
if ('-d' == process.argv[attrs]) {
    console.log('debug enabled');
    config.D = true;
    attrs++;
}

//=================reading parametres from CLI===========================
for (attrs; attrs < process.argv.length; attrs++) {
    if (process.argv[attrs].indexOf('=') != -1) {
        V[process.argv[attrs].substring(0, process.argv[attrs].indexOf('='))] = process.argv[attrs].substring(process.argv[attrs].indexOf('=') + 1);
    } else if (process.argv[attrs].indexOf('config:') != -1) {
        config.fileName = process.argv[attrs].substring(process.argv[attrs].indexOf(':') + 1);
        require('./configs/'+config.fileName)(config,V);
    }
}

//=====================set up bebDriver==================================
var webdriver = require('selenium-webdriver');
var FileDetector = webdriver.FileDetector;
var By = webdriver.By;
var until = webdriver.until;
global.Key = webdriver.Key;
global.MyError = webdriver.error;

function getNewDriver() {
    var SELENIUM_HOST = 'http://localhost:4444/wd/hub';
    var newDriver = new webdriver.Builder()
        .usingServer(SELENIUM_HOST)
        .withCapabilities({browserName: config.browser})
        .build();
    newDriver.manage().window().setSize(1500, 850);
    console.log('получили новый драйвер'.blue);
    return newDriver;
}
global.driver=getNewDriver();

function getTestName(string){
    let pos = 0;
    for (let i=0; i<string.length; i++) {if (string[i]=='/') {pos=i;}}
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
    global.driver.wait(global.driver.takeScreenshot().then(function (image) {
            let exist = system.fs.existsSync('reports/'+condition.testName);
            if (!exist) {system.fs.mkdirSync('reports/'+condition.testName);}
        condition.errorNumber++;
        system.fs.writeFile('reports/'+condition.testName + '/' + condition.errorNumber + '.png', image, 'base64', function (err) {
                if (err!=null) {console.log(err);}
            });
        system.fs.writeFile('reports/'+condition.testName + '/' + condition.errorNumber + '.txt', condition.nowWeDoing+'\n'+e+'\n'+e.stack, function (err) {
                if (err!=null) {console.log(err);}
            });
            console.log('сделали скрин'.yellow);
            console.log('Произошла ошибка: '.red, e);
            if (!config.D) {
                global.driver.quit().then(function(){
					console.log('закрыли браузер'.blue);
					system.myEmitter.emit('event');
                });
            }

    }));
    if (config.D) {
        condition.busy = true;
        Debug.pauseWatcher();
    }
});

//=================================globals again=====================================

SF = require('./system/ShortFunctionsWD.js')(system, config, By, until,constants, condition);
JS = require('./system/JSshortFunctions.js')(system, config, By, until,constants, condition);
JSstep = require('./common/JSsteps');
VD = require('./system/ValidationsWD')(system, condition);
MF = require('./common/MediumFunctionWD.js')(SF, JS, JSstep, VD, V, By, until,FileDetector, system, condition, config,constants);
LF = require('./common/LongFunctionsWD.js')(SF, JS, MF, JSstep, VD, V, By, until,FileDetector, system, condition, config,constants);

//=================set Up Debug==========================================

//=====================enable debug========================================
global.Debug = require("./system/DebugWD.js")(SF, JS, MF, LF, JSstep, VD, V, By, until,FileDetector, system, condition, config,constants);
if (config.D) {
    Debug.WDconsole();
}
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

var testPassed=[];
condition.testN = 0;
var EventEmitter = require('events');
class MyEmitter extends EventEmitter {
}
system.myEmitter = new MyEmitter();
system.myEmitter.on('event', () => {
    if (condition.testN>0) {if (!condition.Success||condition.NotValid) {testPassed.push('Failed '.red+condition.testName);}
        else {testPassed.push('Passed'.green + condition.testName);}}
    if ((condition.testN < config.suite.length)&&(!(config.chainFail&&!condition.Success))) {
        condition.Success = false;
        condition.NotValid=false;
        condition.nowWeDoing = 'something';
        condition.errorNumber = 0;
        condition.testName = getTestName(config.suite[condition.testN]);
        console.log(('next...'+condition.testN + ' '+condition.testName).yellow);
        deleteFolderRecursive('reports/'+condition.testName);
        if (condition.testN>0) {global.driver=getNewDriver();}
        condition.testN++;
        Fiber(function(){require(config.suite[condition.testN-1])
        (SF, JS, MF, LF, JSstep, VD, V, By, until,FileDetector, system, condition, config,constants);}).run();
    } else {
        console.log('end...');
        let endLog='';
        for (let i=0; i<testPassed.length; i++){endLog+=testPassed[i]+'\n';console.log(testPassed[i]);}

        let endTests = Math.floor((new Date().getTime() - startTests)/1000);
        console.log(('сделали за '+ Math.floor(endTests/60)+'мин '+endTests%60+'сек').green);
        system.fs.writeFile('reports/'+config.fileName+ '.txt', endLog+
            'сделали за '+ Math.floor(endTests/60)+'мин '+endTests%60+'сек',
            function (err) { if (err!=null) {console.log(err);}}
        );
        system.myEmitter.removeAllListeners('event');

    }
});
condition.Success = true;
system.myEmitter.emit('event');
