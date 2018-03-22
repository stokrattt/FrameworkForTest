let saveHAR = require('../proxy/commonFuncs').saveHAR;
let fs = require('fs');

module.exports.writeScreenshot = writeScreenshot;
function writeScreenshot(condition, image) {
	console.log("Сохраняю картинку".yellow);
	let fileName = 'reports/' + condition.testName + '/' + condition.errorNumber + '.png';
	fs.writeFile(fileName, image, 'base64', function (err) {
		if (err != null) {
			console.log(err);
		} else {
			console.log(`Скрин был записан в файл ${fileName}`.yellow);
		}
	});
}

module.exports.writeErrorText = writeErrorText;
function writeErrorText(condition, error) {
	console.log("Сохраняю текст".yellow);
	let fileName = 'reports/' + condition.testName + '/' + condition.errorNumber + '.txt';
	fs.writeFile(fileName, condition.nowWeDoing + '\n' + error + '\n' + error.stack, function (err) {
		if (err != null) {
			console.log(err);
		} else {
			console.log(`Ошибка была записана в файл ${fileName}`.yellow);
		}
	});
}

module.exports.makeDir = makeDir;
function makeDir(condition) {
	let exist = fs.existsSync('reports/' + condition.testName);
	if (!exist) {
		console.log("Создаю папку".yellow);
		fs.mkdirSync('reports/' + condition.testName);
	}
}

module.exports.writeErrorFiles = writeErrorFiles;
function writeErrorFiles(_condition, image, error, config) {
	_condition.errorNumber++;
	let condition = Object.assign({}, _condition);
	makeDir(condition);
	writeScreenshot(condition, image);
	writeErrorText(condition, error);
	if (config.P) saveHAR(condition);
}

module.exports.deleteFolderRecursive = deleteFolderRecursive;
function deleteFolderRecursive(path) {
	if (fs.existsSync(path)) {
		fs.readdirSync(path).forEach(function (file, index) {
			let curPath = path + "/" + file;
			if (fs.lstatSync(curPath).isDirectory()) { // recurse
				deleteFolderRecursive(curPath);
			} else { // delete file
				fs.unlinkSync(curPath);
			}
		});
		fs.rmdirSync(path);
	}
}

module.exports.writeFinalLog = writeFinalLog;
function writeFinalLog(logText, config) {
	let fileName = 'reports/' + config.fileName + '.txt';
	fs.writeFile(fileName, logText,
		function (err) {
			if (err != null) {
				console.log(err);
			}
		}
	);
}

module.exports.createReportsFolder = createReportsFolder;
function createReportsFolder() {
	let exist = fs.existsSync('reports');
	if (!exist) {
		fs.mkdirSync('reports');
	}
}