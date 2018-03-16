module.exports = (SF, JS, MF, LF, JSstep, VD, V, By, until, FileDetector, system, condition, config, constants, webdriverSetup) => {
	startTests = new Date().getTime();
	console.log('running tests...'.green);
	
	let fileSystem = require("./fileSystem");
	let EventEmitter = require('events');
	class MyEmitter extends EventEmitter {
	}
	let testPassed = [];
	condition.testN = 0;
	condition.fails = 0;
	condition.Success = true;
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
			fileSystem.deleteFolderRecursive(system, 'reports/' + condition.testName);
			webdriverSetup.getNewDriver().then(res => {
				condition.testN++;
				global.Fiber(function () {
					require('../tests/' + condition.testName)
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
			fileSystem.writeFinalLog(endLog + timeString);
			system.myEmitter.removeAllListeners('event');
			if (condition.fails) {
				console.log('Process will die with failure code'.red);
				process.exitCode = 1;
			}
		}
	});
	
	system.myEmitter.emit('event');
};

function getTestName(string) {
	let pos = 0;
	for (let i = 0; i < string.length; i++) {
		if (string[i] == '/') {
			pos = i + 1;
		}
	}
	return string.substring(pos, string.indexOf('.js'));
}