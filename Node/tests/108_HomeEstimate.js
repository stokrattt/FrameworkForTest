module.exports = function main(SF, JS, MF, LF, JSstep, VD, V, By, until, FileDetector, system, condition, config, constants) {
	global.fiber = Fiber.current;
	
	global.driver.quit();
	
	let webdriver2 = require('selenium-webdriver');
	let SELENIUM_HOST2 = 'http://localhost:4444/wd/hub';
	const {Options} = require('selenium-webdriver/chrome');
	let newDriver2 = new webdriver2.Builder()
		.forBrowser('chrome')
		.usingServer(SELENIUM_HOST2)
		.setChromeOptions(
			new Options().setMobileEmulation({
				deviceName: 'iPad'
			}))
		.build();
	console.log('получили новый драйвер для мобильника'.blue);
	global.driver=newDriver2;
	
	V.client = {};
	V.client.name = SF.randomBukva(6) + '_t';
	V.client.fam = SF.randomBukva(6) + '_t';
	V.client.phone = SF.randomCifra(10);
	V.client.email = SF.randomBukvaSmall(6) + '@' + SF.randomBukvaSmall(4) + '.tes';
	V.client.passwd = 123;
	
	condition.nowWeDoing = 'заходим в портал как сейлс';
	SF.get(V.adminURL);
	SF.waitForVisible(By.xpath('//h1[@ng-click="homeEstimate = true; moveBoard = false;"]'));
	SF.click(By.xpath('//h1[@ng-click="homeEstimate = true; moveBoard = false;"]'));
	SF.send(By.xpath('//input[@id="email"]'), V.adminLogin);
	SF.send(By.xpath('//input[@id="password"]'), V.adminPassword);
	SF.click(By.xpath('//button[@type="submit"]'));
	SF.waitForVisible(By.xpath('//div[@ng-repeat="request in vm.inHomeEstimateRequests"]'));
	Debug.pause();
	
	SF.endOfTest();
};