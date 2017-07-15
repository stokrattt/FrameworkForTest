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
	function MoveFlyingCircle(selector) {
		driver.wait(driver.executeScript(
			"var circle = document.getElementById('FlyingCircle');" +
			"if (circle==undefined){" +
			"var circle = document.createElement('div');" +
			"circle.id='FlyingCircle';" +
			"circle.style.borderWidth = '10px';" +
			"circle.style.borderStyle = 'double';" +
			"circle.style.borderColor = 'red';" +
			"circle.style.width = '50px';" +
			"circle.style.height = '50px';" +
			"circle.style.borderRadius = '50%';" +
			"circle.style.position = 'absolute';" +
			"circle.style.zIndex = '9999999999';" +
			"circle.style.pointerEvents = 'none';" +
			"document.body.appendChild(circle);" +
			"}" +
			"var circle = document.getElementById('FlyingCircle');" +
			"var a = $('" + selector + "').position();" +
			"circle.style.top=(isNaN(a.top) ? 0 : (a.top - 25)) + 'px';" +
			"circle.style.left=(isNaN(a.left) ? 0 : (a.left - 25)) + 'px';"
		), config.timeout);
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
        console.log('doing: ' + "$('" + JQuerySelector + "').click();");
        driver.wait(driver.executeScript("$('" + JQuerySelector + "').click();"), config.timeout).then(function () {
            SFgo();
        });
        SFstop();
    }

    function select(JQuerySelector, OptionValue) {
		MoveFlyingCircle(JQuerySelector);
        console.log("doing: " + "$('" + JQuerySelector + " option[value=\\'" + OptionValue + "\\']').attr('selected','selected');");
        driver.wait(driver.executeScript("$('" + JQuerySelector + " option[value=\\'" + OptionValue + "\\']').attr('selected','selected');" +
            "$('" + JQuerySelector + "').change();"), config.timeout)
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
