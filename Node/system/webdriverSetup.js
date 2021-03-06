module.exports = (system, config, condition, webdriver, proxy, proxyAddr) => {
	let writeErrorFiles = require('./fileSystem').writeErrorFiles;
	
	function getNewDriver() {
		return new Promise((resolve, rej) => {
			if (config.P) {
				browserMobProxyClient.newHar(true, true,true, true, true).then(getDriver);
			} else {
				getDriver();
			}
			function getDriver(res) {
				let SELENIUM_HOST = 'http://localhost:4444/wd/hub';
				let newDriver = new webdriver.Builder()
					.usingServer(SELENIUM_HOST)
					.withCapabilities({
						browserName: config.browser,
						chromeOptions: config.chromeOptions
					});
				if (config.P) newDriver = newDriver.setProxy(proxy.manual({http: proxyAddr}));
				newDriver = newDriver.build();
				
				newDriver.manage().window().setSize(1500, 850).then(res => {
					console.log('Получил новый драйвер'.blue);
					global.driver = newDriver;
					resolve();
				});
			}
		});
	}
	
	function initErrorHandler() {
		return new Promise((resolve, rej) => {
			getNewDriver().then(res => {
				webdriver.promise.controlFlow().on('uncaughtException', function (e) {
					console.log('uncaughtException'.red);
					global.driver.getSession()
						.then(() => {
							console.log('Ошибка selenium: '.red, e);
							global.driver.wait(global.driver.takeScreenshot().then(function (image) {
								console.log("Сделал скрин".yellow);
                                //
                                // driver.manage().logs().get("browser").then(function(logsEntries) {
                                //     logsEntries.forEach( (item) => {
                                //         console.log( "LOG LEVEL:", item.level.name, item.message );
                                //     });
                                // });

                                global.driver.wait(driver.manage().logs().get("browser").then(function(logsEntries) {
                                    logsEntries.forEach( (item) => {
                                    writeErrorFiles(condition, image, e, logsEntries, item.message, config);
                                    if (!config.D) {
                                        global.driver.quit().then(function () {
                                            console.log('Закрыл браузер'.blue);
                                            system.myEmitter.emit('event');
                                        });
                                    }
                                })}));
							}));
						})
						.catch(() => {
							console.log('Закрылось окно: '.red, e);
							if (!config.D) {
								system.myEmitter.emit('event');
							}
						});
					if (config.D) {
						condition.busy = true;
						Debug.pauseWatcher();
					}
				});
				global.driver.quit().then(res => {
					console.log('Закрыл браузер'.blue);
					resolve();
				});
			});
		});
	}
	
	return {
		getNewDriver: getNewDriver,
		initErrorHandler: initErrorHandler
	};
};
