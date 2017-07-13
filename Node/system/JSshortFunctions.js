module.exports = function (system, config, By, until, constants, condition) {
    function SFstop() {
        if (!condition.busy) {
            if (config.D) {
                console.log('yield');
            }
            Fiber.yield();
        }
    }

    function SFgo() {
        if (!condition.busy) {
            if (config.D) {
                console.log('run');
            }
            fiber.run();
        }
    }
	function MoveFlyingCircle(selector){
		driver.wait(driver.executeScript("var a = $('"+selector+"').position();" +
            "$('#FlyingCircle').css('top',a.top+'px');" +
				"$('#FlyingCircle').css('left',a.left+'px');"), config.timeout);
	}

    function waitForExist(selector) {
        console.log("return $('" + selector + "').length");
        let timeStart = new Date().getTime();
        driver.wait(new Promise(function (resolve, reject) {
            let f = function (timeStart) {
                if (timeStart+28000>new Date().getTime()) {
                    driver.wait(driver.executeScript("return $('" + selector + "').length;").then(function (avai) {
                        if (avai != 0) {
                            console.log('появился ' + selector);
                            resolve("result");
                            SFgo();
                        } else {
                            setTimeout(f, 1000, timeStart);
                        }
                    }), config.timeout);
                } else {console.log('хватит!'.red);}
            };
            f(timeStart);
        }), config.timeout);
        SFstop();
    }

    function waitForNotExist(selector) {
        console.log("return $('" + selector + "').length");
        let timeStart = new Date().getTime();
        driver.wait(new Promise(function (resolve, reject) {
            let f = function (timeStart) {
                if (timeStart+28000>new Date().getTime()) {
                    driver.wait(driver.executeScript("return $('" + selector + "').length;").then(function (avai) {
                        if (avai == 0) {
                            console.log('убрался ' + selector);
                            resolve("result");
                            SFgo();
                        } else {
                            setTimeout(f, 1000, timeStart);
                        }
                    }), config.timeout);
                } else {console.log('хватит!'.red);}
            };
            f(timeStart);
        }), config.timeout);
        SFstop();
    }

    function click(JQuerySelector) {
		MoveFlyingCircle(JQuerySelector);
        console.log('doing: ' + "$(\"" + JQuerySelector + "\").click();");
        driver.wait(driver.executeScript("$(\"" + JQuerySelector + "\").click();"), config.timeout).then(function () {
            SFgo();
        });
        SFstop();
    }

    function select(JQuerySelector, OptionValue) {
		MoveFlyingCircle(JQuerySelector);
        console.log('doing: ' + '$(\'' + JQuerySelector + ' option[value="' + OptionValue + '"]\').attr("selected","selected");');
        driver.wait(driver.executeScript('$(\'' + JQuerySelector + ' option[value="' + OptionValue + '"]\').attr("selected","selected");' +
            '$(\'' + JQuerySelector + '\').change();'), config.timeout)
            .then(function () {
                SFgo();
            });
        SFstop();
    }

    function link(JQuerySelector) {
		MoveFlyingCircle(JQuerySelector);
        console.log("doing: " + "return $('" + JQuerySelector + "').attr(\"href\");");
        driver.wait(driver.executeScript("location.assign($('" + JQuerySelector + "').attr(\"href\"));")
            .then(function () {
                SFgo();
            }), config.timeout);
        SFstop();
    }

    function scroll(JQselector) {
		MoveFlyingCircle(JQselector);
        console.log('JSscroll: '+"$('" + JQselector + "').get(0).scrollIntoView();");
        driver.wait(driver.executeScript("$('" + JQselector + "').get(0).scrollIntoView();"), config.timeout).then(function () {
            SFgo();
        });
        SFstop();
    }

    function step(JSString) {
        console.log('doing: JSStep');
        driver.wait(driver.executeScript(JSString), config.timeout).then(function () {
            SFgo();
        });
        SFstop();
    }

    return {
        waitForExist: waitForExist,
        waitForNotExist: waitForNotExist,
        click: click,
        select: select,
        link: link,
        scroll: scroll,
        step: step
    };
};
