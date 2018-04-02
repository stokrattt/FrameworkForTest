//============================initializing globals====================
let system = {};
let constants = require('./common/constants');
let V = {};
let config = {};
let condition = {};
let webdriver = require('selenium-webdriver');
global.Key = webdriver.Key;
let proxy = require('selenium-webdriver/proxy');
let FileDetector = webdriver.FileDetector;
let By = webdriver.By;
let until = webdriver.until;
let fileSystem = require("./system/fileSystem");
system.colors = require('colors');
system.path = require('path');
global.Fiber = require('fibers');
config.chainFail = false;
config.D = false;
config.timeout = 30000;
config.browser = 'chrome';
condition.readyForNext = true;
condition.errorNumber = 0;
condition.testName = '';
condition.busy = false;
condition.Success = false;
condition.NotValid = false;
condition.nowWeDoing = 'something';

fileSystem.createReportsFolder();

//=================reading parametres from CLI===========================
for (attrs = 2; attrs < process.argv.length; attrs++) {
	if ('-d' == process.argv[attrs]) {
		console.log('Debug enabled'.blue);
		config.D = true;
	} else if ('-p' == process.argv[attrs]) {
		console.log('Proxy enabled'.blue);
		config.P = true;
	} else if (process.argv[attrs].indexOf('=') != -1) {
		V[process.argv[attrs].substring(0, process.argv[attrs].indexOf('='))] = process.argv[attrs].substring(process.argv[attrs].indexOf('=') + 1);
	} else if (process.argv[attrs].indexOf('config:') != -1) {
		config.fileName = process.argv[attrs].substring(process.argv[attrs].indexOf(':') + 1);
		require(`./configs/${config.fileName}.js`)(config, V);
	}
}

//=====================initializing webDriver===========================
require('./system/proxy/proxySetup')(config.P).then(proxyAddr => {
	
	let webdriverSetup = require('./system/webdriverSetup')(system, config, condition, webdriver, proxy, proxyAddr);
	
	webdriverSetup.initErrorHandler().then(() => {

//========================linking all modules============================
		
		let SF = require('./system/ShortFunctionsWD.js')(system, config, By, until, constants, condition);
		let JS = require('./system/JSshortFunctions.js')(system, config, By, until, constants, condition);
		let JSstep = require('./common/JSsteps');
		let VD = require('./system/ValidationsWD')(system, condition, config);
		let MF = require('./common/MediumFunctionWD.js')(SF, JS, JSstep, VD, V, By, until, FileDetector, system, condition, config, constants);
		let LF = require('./common/LongFunctionsWD.js')(SF, JS, MF, JSstep, VD, V, By, until, FileDetector, system, condition, config, constants);

//=====================enable debug========================================
		global.Debug = require("./system/DebugWD.js")(SF, JS, MF, LF, JSstep, VD, V, By, until, FileDetector, system, condition, config, constants);
		if (config.D) {
			Debug.WDconsole();
		}

//=====================running tests=======================================
		require('./system/testRunner')
		(SF, JS, MF, LF, JSstep, VD, V, By, until, FileDetector, system, condition, config, constants, webdriverSetup, fileSystem);
	});
});