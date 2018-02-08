module.exports = (system, config, condition, webdriver, proxy, proxyAddr) => {
	
	function getNewDriver() {
		return new Promise((resolve, rej) => {
			browserMobProxyClient.newHar(true, true,true, true, true).then(res => {
				let SELENIUM_HOST = 'http://localhost:4444/wd/hub';
				let newDriver = new webdriver.Builder()
					.usingServer(SELENIUM_HOST)
					.withCapabilities({
						browserName: config.browser,
						chromeOptions: config.chromeOptions
					})
					.setProxy(proxy.manual({http: proxyAddr}))
					.build();
				
				newDriver.manage().window().setSize(1500, 850).then(res => {
					console.log('получили новый драйвер'.blue);
					global.driver = newDriver;
					resolve();
				});
			});
		});
	}
	
	function initErrorHandler() {
		return new Promise((resolve, rej) => {
			getNewDriver().then(res => {
				webdriver.promise.controlFlow().on('uncaughtException', function (e) {
					global.driver.wait(global.driver.takeScreenshot().then(function (image) {
						let exist = system.fs.existsSync('reports/' + condition.testName);
						if (!exist) {
							system.fs.mkdirSync('reports/' + condition.testName);
						}
						condition.errorNumber++;
						system.fs.writeFile('reports/' + condition.testName + '/' + condition.errorNumber + '.png', image, 'base64', function (err) {
							if (err != null) {
								console.log(err);
							}
						});
						system.fs.writeFile('reports/' + condition.testName + '/' + condition.errorNumber + '.txt', condition.nowWeDoing + '\n' + e + '\n' + e.stack, function (err) {
							if (err != null) {
								console.log(err);
							}
						});
						
						console.log('Пытаемся получить от прокси HAR'.yellow);
						browserMobProxyClient.getHar().then(har => {
							console.log('Пытаемся записать HAR в файл'.yellow);
							system.fs.writeFile('reports/' + condition.testName + '/' + condition.errorNumber + '.har', JSON.stringify(har), function (err) {
								if (err != null) {
									console.log('ошибка при записи HAR в файл'.yellow);
									console.log(err);
								}
							});
						}, error => {
							console.log('Ошибка при получении HAR от прокси'.red);
							console.log(error);
						});
						
						console.log('сделали скрин'.yellow);
						console.log('Произошла ошибка: '.red, e);
						if (!config.D) {
							global.driver.quit().then(function () {
								console.log('закрыли браузер'.blue);
								system.myEmitter.emit('event');
							});
						}
						
					}));
					if (config.D) {
						condition.busy = true;
						Debug.pauseWatcher();
					}
				});
				global.driver.quit().then(res => {
					console.log('закрыли браузер'.blue);
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