module.exports = function (system, condition, config) {
	function getFnName(fn) {
		var f = typeof fn == 'function';
		var s = f && ((fn.name && ['', fn.name]) || fn.toString().match(/function ([^\(]+)/));
		return (!f && 'not a function') || (s && s[1] || 'anonymous');
	}
	
	function ALessB(a, b) {
		return a < b;
	}
	
	function ALessOrEqualB(a, b) {
		return a <= b;
	}
	
	function ToEqual(value1, value2) {
		return (value1 == value2);
	}
	
	function NotToEqual(value1, value2) {
		return (value1 != value2);
	}
	
	function IWant(func, value1, value2, e) {
		if (!func(value1, value2)) {
			condition.NotValid = true;
			e += '\nvalue1 = ' + value1 + '\nvalue2 = ' + value2 + '\n' + new Error().stack;
			console.log('Ошибка валидации: '.red, e);
			driver.wait(driver.takeScreenshot().then(function (image) {
				console.log("Сделал скрин".yellow);
				require('./fileSystem').writeErrorFiles(system, condition, image, e, config);
			}));
		} else {
			console.log((value1 + ' ' + getFnName(func) + ' ' + value2).green);
		}
	}
	
	function INeed(func, value1, value2, e) {
		if (!func(value1, value2)) {
			condition.NotValid = true;
			e += '\nvalue1 = ' + value1 + '\nvalue2 = ' + value2;
			throw e;
		}
	}
	
	return {
		ToEqual: ToEqual,
		NotToEqual: NotToEqual,
		IWant: IWant,
		INeed: INeed,
		ALessB: ALessB,
		ALessOrEqualB: ALessOrEqualB
	};
};