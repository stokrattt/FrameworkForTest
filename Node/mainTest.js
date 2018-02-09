let startTests = new Date().getTime();
//============================initializing globals====================
let system = {};
let constants = require('./common/constants');
let SF = {};
let JS = {};
let JSstep = {};
let VD = {};
let V = {};
let MF = {};
let LF = {};
let config = {};
let condition = {};
let webdriver = require('selenium-webdriver');
let proxy = require('selenium-webdriver/proxy');
let FileDetector = webdriver.FileDetector;
let By = webdriver.By;
let until = webdriver.until;
system.colors = require('colors');
system.path = require('path');
system.fs = require('fs');
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

//=======================creating reports folder ============================
let exist = system.fs.existsSync('reports');
if (!exist) {
	system.fs.mkdirSync('reports');
}

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
	let getNewDriver = webdriverSetup.getNewDriver;
	
	webdriverSetup.initErrorHandler().then(() => {
	
//========================linking all modules============================
		
		SF = require('./system/ShortFunctionsWD.js')(system, config, By, until, constants, condition);
		JS = require('./system/JSshortFunctions.js')(system, config, By, until, constants, condition);
		JSstep = require('./common/JSsteps');
		VD = require('./system/ValidationsWD')(system, condition, config);
		MF = require('./common/MediumFunctionWD.js')(SF, JS, JSstep, VD, V, By, until, FileDetector, system, condition, config, constants);
		LF = require('./common/LongFunctionsWD.js')(SF, JS, MF, JSstep, VD, V, By, until, FileDetector, system, condition, config, constants);

//=====================enable debug========================================
		global.Debug = require("./system/DebugWD.js")(SF, JS, MF, LF, JSstep, VD, V, By, until, FileDetector, system, condition, config, constants);
		if (config.D) {
			Debug.WDconsole();
		}

//=====================running tests=======================================
		
		function getTestName(string) {
			let pos = 0;
			for (let i = 0; i < string.length; i++) {
				if (string[i] == '/') {
					pos = i;
				}
			}
			return string.substring(pos, string.indexOf('.js'));
		}
		let deleteFolderRecursive = require("./system/fileSystem").deleteFolderRecursive;
		
		let testPassed = [];
		condition.testN = 0;
		condition.fails = 0;
		let EventEmitter = require('events');
		class MyEmitter extends EventEmitter {
		}
		system.myEmitter = new MyEmitter();
		system.myEmitter.on('event', () => {
			if (condition.testN > 0) {
				if (!condition.Success || condition.NotValid) {
					testPassed.push('Failed '.red + condition.testName);
					condition.fails++;
				}
				else {
					testPassed.push('Passed'.green + condition.testName);
				}
			}
			if ((condition.testN < config.suite.length) && (!(config.chainFail && !condition.Success))) {
				condition.Success = false;
				condition.NotValid = false;
				condition.nowWeDoing = 'something';
				condition.errorNumber = 0;
				condition.testName = getTestName(config.suite[condition.testN]);
				console.log(('next...' + condition.testN + ' ' + condition.testName).yellow);
				deleteFolderRecursive(system, 'reports/' + condition.testName);
				getNewDriver().then(res => {
					condition.testN++;
					Fiber(function () {
						require(config.suite[condition.testN - 1])
						(SF, JS, MF, LF, JSstep, VD, V, By, until, FileDetector, system, condition, config, constants);
					}).run();
				});
			} else {
				console.log('======Тесты кончились======'.blue);
				let endLog = '';
				for (let i = 0; i < testPassed.length; i++) {
					endLog += testPassed[i] + '\n';
					console.log(testPassed[i]);
				}
				
				let endTests = Math.floor((new Date().getTime() - startTests) / 1000);
				let timeString = 'Это длилось ' + Math.floor(endTests / 60) + ' мин ' + endTests % 60 + ' сек';
				console.log(timeString.green);
				system.fs.writeFile('reports/' + config.fileName + '.txt', endLog + timeString,
					function (err) {
						if (err != null) {
							console.log(err);
						}
					}
				);
				system.myEmitter.removeAllListeners('event');
				if (condition.fails) {
					console.log('Process will die with failure code'.red);
					process.exitCode = 1;
				}
			}
		});
		condition.Success = true;
		system.myEmitter.emit('event');
		
	});
});