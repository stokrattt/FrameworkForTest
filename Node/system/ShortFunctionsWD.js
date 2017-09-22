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
            global.driver.quit().then(function(){
				console.log('закрыли браузер'.blue);
				system.myEmitter.emit('event');
            });
		}
	}

	function MoveFlyingCircle(selector) {
		driver.wait(driver.wait(until.elementLocated(selector), config.timeout).getLocation().then(function (location) {
			driver.executeScript(
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
				"circle.style.top='" + (isNaN(location.y) ? 0 : (location.y - 25)) + "px';" +
			    "circle.style.left='" + (isNaN(location.x) ? 0 : (location.x - 25)) + "px';"
			)
			;
		}), config.timeout);
	}
	function AddFlyingCircle(){
		driver.wait(driver.executeScript(
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
            "document.body.appendChild(circle);"
        ), config.timeout);
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
        console.log('click: '+selector);
		MoveFlyingCircle(selector);
        driver.wait(driver.wait(until.elementIsVisible(driver.wait(until.elementLocated(selector), config.timeout)), config.timeout).click(), config.timeout)
            .then(function (alala) {
                SFgo();
            });
        SFstop();
    }
    function send (selector, text) {
		MoveFlyingCircle(selector);
		driver.wait(driver.wait(until.elementLocated(selector), config.timeout).sendKeys(text), config.timeout).then(function () {
			SFgo();
        });
        SFstop();
    }
    function clear (selector) {
		MoveFlyingCircle(selector);
        driver.wait(driver.wait(until.elementLocated(selector), config.timeout).clear(), config.timeout).then(function () {
            SFgo();
        });
        SFstop();
    }
    function reset (selector) {
        MoveFlyingCircle(selector);
        driver.wait(driver.wait(until.elementLocated(selector), config.timeout).reset(), config.timeout).then(function () {
            SFgo();
        });
        SFstop();
    }
    function get (URL) {
        console.log('goto ' + URL);
        driver.wait(driver.get(URL), config.timeout).then(function () {
            AddFlyingCircle();
            SFgo();
        });
        SFstop();
    }
    function select (selector, value) {
		MoveFlyingCircle(selector);
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
    function dateToStringMMMDDYYYY(date) {
        return constants.monthNamesShort[date.Month] + ' ' + date.Day + ', ' + date.Year;
    } function dateToStringMMMMDDYYYY(date) {
        return constants.monthNames[date.Month] + ' ' + date.Day + ', ' + date.Year;
    }

    function parseDateInSIT(str) {
        return {
            Month: str.substring(0, str.indexOf('-')),
            Date: str.substring(str.indexOf('-') + 1, str.indexOf('-', str.indexOf('-') + 1)) - 1,
            Year: str.substring(str.indexOf('-', str.indexOf('-') + 1) + 1)
        };
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

    function FindShortMonthInString (str) {
        for (let i = 0; i < 12; i++) {
            if (str.indexOf(constants.monthNamesShort[i]) != -1) {
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
        dateToStringMMMDDYYYY:dateToStringMMMDDYYYY,
        dateToStringMMMMDDYYYY:dateToStringMMMMDDYYYY,
        parseDateInSIT:parseDateInSIT,
        FindMonthInString:FindMonthInString,
        FindShortMonthInString: FindShortMonthInString,
        openTab:openTab,
        reset:reset
    };
};
