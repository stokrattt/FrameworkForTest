module.exports.saveHAR = saveHAR;
function saveHAR(system, condition) {
	console.log('Пытаюсь получить от прокси HAR'.yellow);
	browserMobProxyClient.getHar().then(har => {
		console.log('Пытаюсь записать HAR в файл'.yellow);
		let fileName = 'reports/' + condition.testName + '/' + condition.errorNumber + '.har';
		system.fs.writeFile(fileName, JSON.stringify(har), function (err) {
			if (err != null) {
				console.log('Ошибка при записи HAR в файл'.red);
				console.log(err);
			} else {
				console.log(`HAR был записан в файл ${fileName}`.yellow);
			}
		});
	}, error => {
		console.log('Ошибка при получении HAR от прокси'.red);
		console.log(error);
	});
}