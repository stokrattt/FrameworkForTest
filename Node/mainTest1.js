var boston = require("./bostonTestFunctions.js"),
    webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until;

/*webdriver.promise.controlFlow().on('uncaughtException', function(e) {
 console.log('Произошла ошибка: ', e);
 });
 */
var SELENIUM_HOST = 'http://localhost:4444/wd/hub';
var URL = 'http://stage.themoveboard.com/';
var driver;
driver = new webdriver.Builder()
    .usingServer(SELENIUM_HOST)
    .withCapabilities({browserName: 'firefox'})
    .build();
var V = {};
boston.LookAtConsole(By,until,driver,V);

function click(selector){
    driver.wait(until.elementLocated(selector), 10000).click();
}
function send(selector,text){
    driver.wait(until.elementLocated(selector), 10000).sendKeys(text);
}

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
driver.get(URL);
send(By.xpath('//ultrasmall-form//input[@ng-model="request.zipFrom"]'),"02461");
send(By.xpath('//ultrasmall-form//input[@ng-model="request.zipTo"]'),"02111");

driver.findElement(By.xpath('//ultrasmall-form//input[@ng-model="moveDate"]')).click();

driver.findElements(By.css(".picker__day--infocus")).then(function(mas){mas[4].click();});

try { driver.findElement(By.xpath('//ultrasmall-form//input[@ng-click="Continue1(\'step1\')"]')).click();}
catch(e){console.error(e)}


//send(By.xpath('//ultrasmall-form//input[@ng-model="moveDate"]'),"March 3, 2017");


/*driver.getTitle().then(function(title) {
 assert.ok(title.indexOf('test — Яндекс: нашлось') > -1, 'Ничего не нашлось :(');
 });
 */
//driver.quit();
