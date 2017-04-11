module.exports = function (system, config, By, until, constants, condition) {
    function SFstop () {
        if (!condition.busy) {
            if (config.D) {console.log('yield');}
            Fiber.yield();
        }
    }
    function SFgo () {
        if (!condition.busy) {
            if (config.D) {console.log('run');}
            fiber.run();
        }
    }
    function endOfTest () {
        if (config.D) {
            Debug.pause();
        } else {
            condition.Success = true;
            driver.quit();
            console.log('закрыли браузер'.blue);
            system.myEmitter.emit('event');
        }
    }
    function waitForVisible (selector) {
        console.log('ждём ' + selector);
        driver.wait(until.elementIsVisible(driver.wait(until.elementLocated(selector), config.timeout)), config.timeout).then(function () {
            console.log('дождались ' + selector);
            SFgo();
        });
        SFstop();
    }
    function waitForLocated (selector) {
        console.log('ждём ' + selector);
        driver.wait(until.elementLocated(selector), config.timeout).then(function () {
            console.log('дождались ' + selector);
            SFgo();
        });
        SFstop();
    }
    function waitForNotVisible (selector) {
        console.log('ждём ' + selector);
        driver.wait(until.elementIsNotVisible(driver.wait(until.elementLocated(selector), config.timeout)), config.timeout).then(function () {
            console.log('дождались ' + selector);
            SFgo();
        });
        SFstop();
    }
    function sleep (sec) {
        driver.sleep(sec * 1000).then(function () {
            SFgo();
        });
        SFstop();
    }
    function waitForDefined (VarName) {
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
    }
    function waitWhileEqual (VarName, mustBe) {
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
    }
    function waitWhileNotEqual(VarName, mustNotBe) {
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
    }
    function click(selector) {
        driver.wait(driver.wait(until.elementIsVisible(driver.wait(until.elementLocated(selector), config.timeout)), config.timeout).click(), config.timeout)
            .then(function () {
                SFgo();
            });
        SFstop();
    }
    function send (selector, text) {
        driver.wait(driver.wait(until.elementLocated(selector), config.timeout).sendKeys(text), config.timeout).then(function () {
            SFgo();
        });
        SFstop();
    }
    function clear (selector) {
        driver.wait(driver.wait(until.elementLocated(selector), config.timeout).clear(), config.timeout).then(function () {
            SFgo();
        });
        SFstop();
    }
    function get (URL) {
        console.log('goto ' + URL);
        driver.wait(driver.get(URL), config.timeout).then(function () {
            SFgo();
        });
        SFstop();
    }
    function select (selector, value) {
        console.log('select ' + selector + '->' + value);
        driver.wait(until.elementLocated(selector), config.timeout).click();
        driver.wait(until.elementLocated(selector), config.timeout).findElement(selector)
            .findElement(By.xpath('option[@value="' + value + '"]'))
            .click()
            .then(function () {
                SFgo();
            });
        SFstop();
    }

    function randomBukva(count) {
        var bukva = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
        var s = "";
        for (i = 0; i < count; i++) {
            s += bukva.charAt(Math.floor(Math.random() * bukva.length));
        }
        return s;
    }
    function randomBukvaSmall (count) {
        var bukva = "abcdefghijklmnopqrstuvwxyz";
        var s = "";
        for (i = 0; i < count; i++) {
            s += bukva.charAt(Math.floor(Math.random() * bukva.length));
        }
        return s;
    }
    function randomCifra(count) {
        var bukva = "1234567890";
        var s = "";
        for (i = 0; i < count; i++) {
            s += bukva.charAt(Math.floor(Math.random() * bukva.length));
        }
        return s;
    }
    function cleanPrice(dirtyText) {
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
    }
    function FindMonthInString (str) {
        for (let i = 0; i < 12; i++) {
            if (str.indexOf(constants.monthNames[i]) != -1) {
                return i;
            }
        }
        console.log('не нашел месяц'.red);
        return 12;
    }

    function openTab (numberTab) {
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
    return {
        endOfTest:endOfTest,
        waitForVisible:waitForVisible,
        waitForLocated:waitForLocated,
        waitForNotVisible:waitForNotVisible,
        sleep:sleep,
        waitForDefined:waitForDefined,
        waitWhileEqual:waitWhileEqual,
        waitWhileNotEqual:waitWhileNotEqual,
        click:click,
        send:send,
        clear:clear,
        get:get,
        select:select,
        randomBukva:randomBukva,
        randomBukvaSmall:randomBukvaSmall,
        randomCifra:randomCifra,
        cleanPrice:cleanPrice,
        FindMonthInString:FindMonthInString,
        openTab:openTab
    };
};
