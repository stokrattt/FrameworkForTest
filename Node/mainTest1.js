var webdriver = require('selenium-webdriver');
global.By = webdriver.By;
global.until = webdriver.until;

webdriver.promise.controlFlow().on('uncaughtException', function (e) {
    console.log('Произошла ошибка: ', e);
});

var SELENIUM_HOST = 'http://localhost:4444/wd/hub';
global.driver = new webdriver.Builder()
    .usingServer(SELENIUM_HOST)
    .withCapabilities({browserName: 'chrome'})
    .build();

global.busy = false;
global.V={};
var Debug = require("./DebugWD.js");
var SF = require('./ShortFunctionsWD.js');
var JSs = require('./JSsteps');
Debug.console();
Debug.pauseWatcher();

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
var URL = 'http://stage.themoveboard.com/';
driver.get(URL);
SFsend(By.xpath('//ultrasmall-form//input[@ng-model="request.zipFrom"]'), "02461");
SFsend(By.xpath('//ultrasmall-form//input[@ng-model="request.zipTo"]'), "02111");
//Debug.pause();
driver.wait(driver.executeScript("$('ultrasmall-form input[ng-model=\"moveDate\"]').focus();"));
V.Future = null;
driver.wait(driver.executeScript(Click4DaysNewCalendar).then(function (D) {
    V.Future = D;
}));
Debug.waitForDefined("Future");
driver.executeScript("$('ultrasmall-form input[ng-click=\"Continue1(\\\'step1\\\')\"]').click();");