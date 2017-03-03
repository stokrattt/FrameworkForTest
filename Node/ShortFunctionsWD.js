global.SFclick = function (selector) {
    driver.wait(driver.wait(until.elementIsVisible(driver.wait(until.elementLocated(selector), 10000))).click());
};
global.SFsend = function (selector, text) {
    driver.wait(driver.wait(until.elementLocated(selector), 10000).sendKeys(text));
};
global.JSclick = function(JQeurySelector){
    driver.wait(driver.executeScript("$('"+JQeurySelector+"').click();"));
};

