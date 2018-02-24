let saveHAR = require('../proxy/commonFuncs').saveHAR;

module.exports.writeScreenshot = writeScreenshot;
function writeScreenshot(system, condition, image) {
	console.log("Сохраняю картинку".yellow);
	let fileName = 'reports/' + condition.testName + '/' + condition.errorNumber + '.png';
	system.fs.writeFile(fileName, image, 'base64', function (err) {
		if (err != null) {
			console.log(err);
		} else {
			console.log(`Скрин был записан в файл ${fileName}`.yellow);
		}
	});
}

module.exports.writeErrorText = writeErrorText;
function writeErrorText(system, condition, error) {
	console.log("Сохраняю текст".yellow);
	let fileName = 'reports/' + condition.testName + '/' + condition.errorNumber + '.txt';
	system.fs.writeFile(fileName, condition.nowWeDoing + '\n' + error + '\n' + error.stack, function (err) {
		if (err != null) {
			console.log(err);
		} else {
			console.log(`Ошибка была записана в файл ${fileName}`.yellow);
		}
	});
}

module.exports.makeDir = makeDir;
function makeDir(system, condition) {
	let exist = system.fs.existsSync('reports/' + condition.testName);
	if (!exist) {
		console.log("Создаю папку".yellow);
		system.fs.mkdirSync('reports/' + condition.testName);
	}
}

module.exports.writeErrorFiles = writeErrorFiles;
function writeErrorFiles(system, _condition, image, error, config) {
	let condition = Object.assign({}, _condition);
	makeDir(system, condition);
	condition.errorNumber++;
	writeScreenshot(system, condition, image);
	writeErrorText(system, condition, error);
	if (config.P) saveHAR(system, condition);
}

module.exports.deleteFolderRecursive = deleteFolderRecursive;
function deleteFolderRecursive(system, path) {
	if (system.fs.existsSync(path)) {
		system.fs.readdirSync(path).forEach(function (file, index) {
			let curPath = path + "/" + file;
			if (system.fs.lstatSync(curPath).isDirectory()) { // recurse
				deleteFolderRecursive(curPath);
			} else { // delete file
				system.fs.unlinkSync(curPath);
			}
		});
		system.fs.rmdirSync(path);
	}
}