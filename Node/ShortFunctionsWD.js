global.endOfTest = function () {
    if (D) {
        Debug.pause();
    } else {
        myEmitter.emit('event');
    }
};
global.JSwaitForExist = function (selector) {
    console.log("return $('" + selector + "').length");
    driver.wait(new Promise(function (resolve, reject) {
        var waitTimer = setInterval(function () {
            driver.wait(driver.executeScript("return $('" + selector + "').length;").then(function (avai) {
                if (avai != 0) {
                    console.log('появился ' + selector);
                    resolve("result");
                    clearInterval(waitTimer);
                    if (!busy) {
                        fiber.run();
                    }
                }
            }));
        }, 500);
    }), Dtimeout);
    if (!busy) {
        Fiber.yield();
    }
};
global.SFwaitForVisible = function (selector) {
    console.log('ждём ' + selector);
    driver.wait(until.elementIsVisible(driver.wait(until.elementLocated(selector)), 10000)).then(function () {
        if (!busy) {
            fiber.run();
        }
        console.log('дождались ' + selector);
    });
    if (!busy) {
        Fiber.yield();
    }
};
global.SFsleep = function (sec) {
    setTimeout(function () {
        if (!busy) {
            fiber.run();
        }
    }, sec * 1000);
    if (!busy) {
        Fiber.yield();
    }
};
global.waitForDefined = function (VarName) {
    driver.wait(new Promise(function (resolve, reject) {
        var playTimer = setInterval(function () {
            if (V[VarName] !== null) {
                console.log(V[VarName]);
                resolve("result");
                clearInterval(playTimer);
                if (!busy) {
                    fiber.run();
                }
            }
        }, 2000);
    }), Dtimeout);
    if (!busy) {
        Fiber.yield();
    }
};
global.waitWhileEqual = function (VarName, mustBe) {
    driver.wait(new Promise(function (resolve, reject) {
        var playTimer = setInterval(function () {
            if (V[VarName] !== mustBe) {
                console.log(V[VarName]);
                resolve("result");
                clearInterval(playTimer);
                if (!busy) {
                    fiber.run();
                }
            }
        }, 2000);
    }));
    if (!busy) {
        Fiber.yield();
    }
};
global.waitWhileNotEqual = function (VarName, mustNotBe) {
    driver.wait(new Promise(function (resolve, reject) {
        var playTimer = setInterval(function () {
            if (V[VarName] == mustNotBe) {
                console.log(V[VarName]);
                resolve("result");
                clearInterval(playTimer);
                if (!busy) {
                    fiber.run();
                }
            }
        }, 2000);
    }));
    if (!busy) {
        Fiber.yield();
    }
};
global.SFclick = function (selector) {
    driver.wait(driver.wait(until.elementIsVisible(driver.wait(until.elementLocated(selector), 10000))).click())
        .then(function () {
            if (!busy) {
                fiber.run();
            }
        });
    if (!busy) {
        Fiber.yield();
    }
};
global.SFsend = function (selector, text) {
    driver.wait(driver.wait(until.elementLocated(selector), 10000).sendKeys(text)).then(function () {
        if (!busy) {
            fiber.run();
        }
    });
    if (!busy) {
        Fiber.yield();
    }
};
global.JSclick = function (JQeurySelector) {
    console.log('doing: ' + "$(\"" + JQeurySelector + "\").click();");
    driver.wait(driver.executeScript("$(\"" + JQeurySelector + "\").click();")).then(function () {
        if (!busy) {
            fiber.run();
        }
    });
    if (!busy) {
        Fiber.yield();
    }
};
global.JSselect = function (JQuerySelector, OptionValue) {
    console.log('doing: ' + '$(\'' + JQuerySelector + ' option[value="' + OptionValue + '"]\').attr("selected","selected");');
    driver.wait(driver.executeScript('$(\'' + JQuerySelector + ' option[value="' + OptionValue + '"]\').attr("selected","selected");' +
        '$(\'' + JQuerySelector + '\').change();'))
        .then(function () {
            if (!busy) {
                fiber.run();
            }
        });
    if (!busy) {
        Fiber.yield();
    }
};
global.JSlink = function (JQuerySelector) {
    console.log('doing: ' + 'return $(\'' + JQuerySelector + '\').attr("href");');
    driver.wait(driver.executeScript("location.assign($('" + JQuerySelector + "').attr('href'));")
        .then(function () {
            if (!busy) {
                fiber.run();
            }
        }));
    if (!busy) {
        Fiber.yield();
    }
};
global.JSstep = function (JSString) {
    console.log('doing: JSStep');
    driver.wait(driver.executeScript(JSString)).then(function () {
        if (!busy) {
            fiber.run();
        }
    });
    if (!busy) {
        Fiber.yield();
    }
};
global.SFget = function (URL) {
    console.log('goto ' + URL);
    driver.wait(driver.get(URL)).then(function () {
        if (!busy) {
            fiber.run();
        }
    });
    if (!busy) {
        Fiber.yield()
    }
    ;
};
global.SFselect = function (selector, value) {
    console.log('select ' + selector + '->' + value);
    driver.wait(until.elementLocated(selector)).findElement(selector)
        .findElement(By.xpath('option[@value="' + value + '"]'))
        .click()
        .then(function () {
            if (!busy) {
                fiber.run();
            }
        });
    if (!busy) {
        Fiber.yield();
    }
};

global.SFrandomBukva = function (count) {
    var bukva = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    var s = "";
    for (i = 0; i < count; i++) {
        s += bukva.charAt(Math.floor(Math.random() * bukva.length));
    }
    return s;
};
global.SFrandomBukvaSmall = function (count) {
    var bukva = "abcdefghijklmnopqrstuvwxyz";
    var s = "";
    for (i = 0; i < count; i++) {
        s += bukva.charAt(Math.floor(Math.random() * bukva.length));
    }
    return s;
};
global.SFrandomCifra = function (count) {
    var bukva = "1234567890";
    var s = "";
    for (i = 0; i < count; i++) {
        s += bukva.charAt(Math.floor(Math.random() * bukva.length));
    }
    return s;
};
global.SFcleanPrice = function (dirtyText) {
    let allow = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    let result = '';
    for (let i = 0; i < dirtyText.length; i++) {
        if (dirtyText[i] in allow) {
            result += dirtyText[i];
        }
    }
    return parseFloat(result);
};
global.SFFindMonthInString = function (str) {
    for (let i = 0; i < 12; i++) {
        if (str.indexOf(monthNames[i]) != -1) {
            return i;
        }
    }
    IWant(VNotToEqual, i, 12, 'неверный месяц');
    return 12;
};