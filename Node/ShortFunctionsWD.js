global.JSwait = function (selector) {
    console.log("return $('"+selector+"').length");
    driver.wait(new Promise(function (resolve, reject) {
        var waitTimer = setInterval(function () {
            driver.wait(driver.executeScript("return $('"+selector+"').length;").then(function (avai) {
                if (avai!=0){
                    console.log('появился '+selector);
                    resolve("result");
                    clearInterval(waitTimer);
                }
            }));
        }, 500);
    }),Dtimeout);
};
global.waitForDefined = function(VarName){
    driver.wait(new Promise(function (resolve, reject) {
        var playTimer = setInterval(function () {
            if (V[VarName]!==null) {
                console.log(V[VarName]);
                resolve("result");
                clearInterval(playTimer);
            }
        }, 2000);
    }), Dtimeout);
};
global.waitWhileEqual = function(varName, mustBe){
    driver.wait(new Promise(function (resolve, reject) {
        var playTimer = setInterval(function () {
            if (V[VarName]!==mustBe) {
                console.log(V[VarName]);
                resolve("result");
                clearInterval(playTimer);
            }
        }, 2000);
    }));
};
global.waitWhileNotEqual = function(varName, mustNotBe){
    driver.wait(new Promise(function (resolve, reject) {
        var playTimer = setInterval(function () {
            if (V[varName]==mustNotBe) {
                console.log(V[VarName]);
                resolve("result");
                clearInterval(playTimer);
            }
        }, 2000);
    }));
};
global.SFclick = function (selector) {
    driver.wait(driver.wait(until.elementIsVisible(driver.wait(until.elementLocated(selector), 10000))).click());
};
global.SFsend = function (selector, text) {
    driver.wait(driver.wait(until.elementLocated(selector), 10000).sendKeys(text));
};
global.JSclick = function(JQeurySelector){
    console.log('doing: '+"$(\""+JQeurySelector+"\").click();");
    driver.wait(driver.executeScript("$(\""+JQeurySelector+"\").click();"));
};
global.JSselect = function(JQuerySelector, OptionValue){
    console.log('doing: '+'$(\''+JQuerySelector+' option[value="'+OptionValue+'"]\').attr("selected","selected");');
    driver.wait(driver.executeScript('$(\''+JQuerySelector+' option[value="'+OptionValue+'"]\').attr("selected","selected");'));
};
global.JSlink = function (JQuerySelector){
    console.log('doing: '+'return $(\''+JQuerySelector+'\').attr("href");');
    driver.wait(driver.executeScript("return $('"+JQuerySelector+"').attr('href');")
        .then(function(link){ driver.get(link); }));
};
