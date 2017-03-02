var webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until;
module.exports = function (driver) {
    return {
        click: function (selector) {
            driver.wait(until.elementLocated(selector), 10000).click();
        },
        send: function (selector, text) {
            driver.wait(until.elementLocated(selector), 10000).sendKeys(text);
        }
    }
};
