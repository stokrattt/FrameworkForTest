module.exports = function (driver, system, config, By, until, constants) {
    var SFstop = function () {
        if (!config.busy) {
            console.log('yield');
            Fiber.yield();
        }
    };
    var SFgo = function () {
        if (!config.busy) {
            console.log('run');
            fiber.run();
        }
    };
    return {
        endOfTest: function () {
            if (config.D) {
                system.Debug.pause();
            } else {
                driver.quit();
                driver=null;
                condition.Success = true;
                system.myEmitter.emit('event');
            }
        },
        waitForVisible: function (selector) {
            console.log('ждём ' + selector);
            driver.wait(until.elementIsVisible(driver.wait(until.elementLocated(selector), config.timeout)), config.timeout).then(function () {
                console.log('дождались ' + selector);
                SFgo();
            });
            SFstop();
        },
        waitForLocated: function (selector) {
            console.log('ждём ' + selector);
            driver.wait(until.elementLocated(selector), config.timeout).then(function () {
                console.log('дождались ' + selector);
                SFgo();
            });
            SFstop();
        },
        waitForNotVisible: function (selector) {
            console.log('ждём ' + selector);
            driver.wait(until.elementIsNotVisible(driver.wait(until.elementLocated(selector), config.timeout)), config.timeout).then(function () {
                console.log('дождались ' + selector);
                SFgo();
            });
            SFstop();
        },
        sleep: function (sec) {
            driver.sleep(sec * 1000).then(function () {
                SFgo();
            });
            SFstop();
        },
        waitForDefined: function (VarName) {
            driver.wait(new Promise(function (resolve, reject) {
                var playTimer = setInterval(function () {
                    if (V[VarName] !== null) {
                        console.log(V[VarName]);
                        resolve("result");
                        clearInterval(playTimer);
                        SFgo();
                    }
                }, 2000);
            }), config.timeout);
            SFstop();
        },
        waitWhileEqual: function (VarName, mustBe) {
            driver.wait(new Promise(function (resolve, reject) {
                var playTimer = setInterval(function () {
                    if (V[VarName] !== mustBe) {
                        console.log(V[VarName]);
                        resolve("result");
                        clearInterval(playTimer);
                        SFgo();
                    }
                }, 2000);
            }), config.timeout);
            SFstop();
        },
        waitWhileNotEqual: function (VarName, mustNotBe) {
            driver.wait(new Promise(function (resolve, reject) {
                var playTimer = setInterval(function () {
                    if (V[VarName] == mustNotBe) {
                        console.log(V[VarName]);
                        resolve("result");
                        clearInterval(playTimer);
                        SFgo();
                    }
                }, 2000);
            }), config.timeout);
            SFstop();
        },
        click: function (selector) {
            driver.wait(driver.wait(until.elementIsVisible(driver.wait(until.elementLocated(selector), config.timeout)), config.timeout).click(), config.timeout)
                .then(function () {
                    SFgo();
                });
            SFstop();
        },
        send: function (selector, text) {
            driver.wait(driver.wait(until.elementLocated(selector), config.timeout).sendKeys(text), config.timeout).then(function () {
                SFgo();
            });
            SFstop();
        },
        clear: function (selector) {
            driver.wait(driver.wait(until.elementLocated(selector), config.timeout).clear(), config.timeout).then(function () {
                SFgo();
            });
            SFstop();
        },
        get: function (URL) {
            console.log('goto ' + URL);
            driver.wait(driver.get(URL), config.timeout).then(function () {
                SFgo();
            });
            SFstop();
        },
        select: function (selector, value) {
            console.log('select ' + selector + '->' + value);
            driver.wait(until.elementLocated(selector), config.timeout).click();
            driver.wait(until.elementLocated(selector), config.timeout).findElement(selector)
                .findElement(By.xpath('option[@value="' + value + '"]'))
                .click()
                .then(function () {
                    SFgo();
                });
            SFstop();
        },

        randomBukva: function (count) {
            var bukva = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
            var s = "";
            for (i = 0; i < count; i++) {
                s += bukva.charAt(Math.floor(Math.random() * bukva.length));
            }
            return s;
        },
        randomBukvaSmall: function (count) {
            var bukva = "abcdefghijklmnopqrstuvwxyz";
            var s = "";
            for (i = 0; i < count; i++) {
                s += bukva.charAt(Math.floor(Math.random() * bukva.length));
            }
            return s;
        },
        randomCifra: function (count) {
            var bukva = "1234567890";
            var s = "";
            for (i = 0; i < count; i++) {
                s += bukva.charAt(Math.floor(Math.random() * bukva.length));
            }
            return s;
        },
        cleanPrice: function (dirtyText) {
            let allow = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
            let result = '';
            let minus = false;
            for (let i = 0; i < dirtyText.length; i++) {
                if ((dirtyText[i] in allow) || (dirtyText[i] == '.')) {
                    result += dirtyText[i];
                } else if (dirtyText[i] == '-') {
                    minus = true;
                }
            }
            return minus ? 0 - parseFloat(result) : parseFloat(result);
        },
        FindMonthInString: function (str) {
            for (let i = 0; i < 12; i++) {
                if (str.indexOf(monthNames[i]) != -1) {
                    return i;
                }
            }
            IWant(VNotToEqual, i, 12, 'неверный месяц');
            return 12;
        },

        openTab: function (numberTab) {
            driver.wait(driver.getAllWindowHandles().then(function (handles) {
                console.log(handles);
                driver.switchTo().window(handles[numberTab]);
                driver.getWindowHandle().then(function (handle) {
                    console.log(handle);
                });
            }), config.timeout).then(function () {
                SFgo();
            });
            SFstop();
        }
    };
};