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
    if (!busy) { Fiber.yield();}
};
global.SFsleep = function(sec){
    setTimeout(function(){
        if (!busy) { fiber.run();}
    },sec*1000);
    if (!busy) { Fiber.yield();}
};
global.waitForDefined = function (VarName) {
    driver.wait(new Promise(function (resolve, reject) {
        var playTimer = setInterval(function () {
            if (V[VarName] !== null) {
                console.log(V[VarName]);
                resolve("result");
                clearInterval(playTimer);
                if (!busy) { fiber.run();}
            }
        }, 2000);
    }), Dtimeout);
    if (!busy) { Fiber.yield();}
};
global.waitWhileEqual = function (varName, mustBe) {
    driver.wait(new Promise(function (resolve, reject) {
        var playTimer = setInterval(function () {
            if (V[VarName] !== mustBe) {
                console.log(V[VarName]);
                resolve("result");
                clearInterval(playTimer);
                if (!busy) { fiber.run();}
            }
        }, 2000);
    }));
    if (!busy) { Fiber.yield();}
};
global.waitWhileNotEqual = function (varName, mustNotBe) {
    driver.wait(new Promise(function (resolve, reject) {
        var playTimer = setInterval(function () {
            if (V[varName] == mustNotBe) {
                console.log(V[VarName]);
                resolve("result");
                clearInterval(playTimer);
                if (!busy) { fiber.run();}
            }
        }, 2000);
    }));
    if (!busy) { Fiber.yield();}
};
global.SFclick = function (selector) {
    driver.wait(driver.wait(until.elementIsVisible(driver.wait(until.elementLocated(selector), 10000))).click())
        .then(function () {
            if (!busy) { fiber.run();}
        });
    if (!busy) { Fiber.yield();}
};
global.SFsend = function (selector, text) {
    driver.wait(driver.wait(until.elementLocated(selector), 10000).sendKeys(text)).then(function () {
        if (!busy) { fiber.run();}
    });
    if (!busy) { Fiber.yield();}
};
global.JSclick = function (JQeurySelector) {
    console.log('doing: ' + "$(\"" + JQeurySelector + "\").click();");
    driver.wait(driver.executeScript("$(\"" + JQeurySelector + "\").click();")).then(function () {
        if (!busy) { fiber.run();}
    });
    if (!busy) { Fiber.yield();}
};
global.JSselect = function (JQuerySelector, OptionValue) {
    console.log('doing: ' + '$(\'' + JQuerySelector + ' option[value="' + OptionValue + '"]\').attr("selected","selected");');
    driver.wait(driver.executeScript('$(\'' + JQuerySelector + ' option[value="' + OptionValue + '"]\').attr("selected","selected");'))
        .then(function () {
            if (!busy) { fiber.run();}
        });
    if (!busy) { Fiber.yield();}
};
global.JSlink = function (JQuerySelector) {
    console.log('doing: ' + 'return $(\'' + JQuerySelector + '\').attr("href");');
    driver.wait(driver.executeScript("location.assign($('" + JQuerySelector + "').attr('href'));")
        .then(function () {
            if (!busy) { fiber.run();}
        }));
    if (!busy) { Fiber.yield();}
};
global.SFget = function (URL) {
    console.log('goto '+URL);
    driver.wait(driver.get(URL)).then(function(){
        if (!busy) { fiber.run();}
    });
    if (!busy) { Fiber.yield()};
};
global.endOfTest = function(){
    if (D) {Debug.pause();} else {myEmitter.emit('event');}
};
global.SFrandomBukva = function(count){
    var bukva = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    var s = "";
    for (i = 0; i < count; i++) {
        s += bukva.charAt(Math.floor(Math.random() * bukva.length));
    }
    return s;
};
global.SFrandomBukvaSmall = function(count){
    var bukva = "abcdefghijklmnopqrstuvwxyz";
    var s = "";
    for (i = 0; i < count; i++) {
        s += bukva.charAt(Math.floor(Math.random() * bukva.length));
    }
    return s;
};
global.SFrandomCifra = function(count){
    var bukva = "1234567890";
    var s = "";
    for (i = 0; i < count; i++) {
        s += bukva.charAt(Math.floor(Math.random() * bukva.length));
    }
    return s;
};