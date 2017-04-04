module.exports = function (driver, system, config, By, until,constants) {
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
        waitForExist: function (selector) {
            console.log("return $('" + selector + "').length");
            driver.wait(new Promise(function (resolve, reject) {
                let f = function () {
                    driver.wait(driver.executeScript("return $('" + selector + "').length;").then(function (avai) {
                        if (avai != 0) {
                            console.log('появился ' + selector);
                            resolve("result");
                            SFgo();
                        } else {
                            setTimeout(f, 500)
                        }
                    }));
                };
                setTimeout(f, 500);
            }), config.timeout);
            SFstop();
        },
        waitForNotExist: function (selector) {
            console.log("return $('" + selector + "').length");
            driver.wait(new Promise(function (resolve, reject) {
                let f = function () {
                    driver.wait(driver.executeScript("return $('" + selector + "').length;").then(function (avai) {
                        if (avai == 0) {
                            console.log('убрался ' + selector);
                            resolve("result");
                            SFgo();
                        } else {
                            setTimeout(f, 500)
                        }
                    }));
                };
                setTimeout(f, 500);
            }), config.timeout);
            SFstop();
        },
        click: function (JQeurySelector) {
            console.log('doing: ' + "$(\"" + JQeurySelector + "\").click();");
            driver.wait(driver.executeScript("$(\"" + JQeurySelector + "\").click();"), config.timeout).then(function () {
                SFgo();
            });
            SFstop();
        },
        select: function (JQuerySelector, OptionValue) {
            console.log('doing: ' + '$(\'' + JQuerySelector + ' option[value="' + OptionValue + '"]\').attr("selected","selected");');
            driver.wait(driver.executeScript('$(\'' + JQuerySelector + ' option[value="' + OptionValue + '"]\').attr("selected","selected");' +
                '$(\'' + JQuerySelector + '\').change();'), config.timeout)
                .then(function () {
                    SFgo();
                });
            SFstop();
        },
        link: function (JQuerySelector) {
            console.log("doing: " + "return $('" + JQuerySelector + "').attr(\"href\");");
            driver.wait(driver.executeScript("location.assign($('" + JQuerySelector + "').attr(\"href\"));")
                .then(function () {
                    SFgo();
                }), config.timeout);
            SFstop();
        },
        scroll: function (JQselector) {
            driver.wait(driver.executeScript("$('" + JQselector + "').get(0).scrollIntoView();"), config.timeout).then(function () {
                SFgo();
            });
            SFstop();
        },
        step: function (JSString) {
            console.log('doing: JSStep');
            driver.wait(driver.executeScript(JSString), config.timeout).then(function () {
                SFgo();
            });
            SFstop();
        }
    };
};