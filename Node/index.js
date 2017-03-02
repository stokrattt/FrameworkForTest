var sleep = require('sleep');
var webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until;

webdriver.promise.controlFlow().on('uncaughtException', function(e) {
    console.log('Произошла ошибка: ', e);
});

var SELENIUM_HOST = 'http://localhost:4444/wd/hub';
var URL = 'http://stage.themoveboard.com/';

var driver = new webdriver.Builder()
    .usingServer(SELENIUM_HOST)
    .withCapabilities({ browserName: 'chrome' })
    .build();

