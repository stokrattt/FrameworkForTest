module.exports = function (system, condition) {
    function getFnName(fn) {
        var f = typeof fn == 'function';
        var s = f && ((fn.name && ['', fn.name]) || fn.toString().match(/function ([^\(]+)/));
        return (!f && 'not a function') || (s && s[1] || 'anonymous');
    }

    function VToEqual (value1, value2) {
        this.name='';
        return (value1 == value2);
    }
    function VNotToEqual (value1, value2) {
        return (value1 != value2);
    }
    function IWant (func, value1, value2, e) {
        if (!func(value1, value2)) {
            condition.NotValid = true;
            e += '\nvalue1 = ' + value1 + '\nvalue2 = ' + value2 + '\n' + new Error().stack;
            driver.wait(driver.takeScreenshot().then(function (image) {
                let exist = system.fs.existsSync('reports/' + condition.testName);
                if (!exist) {
                    system.fs.mkdirSync('reports/' + condition.testName);
                }
                condition.errorNumber++;
                var temp = 3;
                system.fs.writeFile('reports/' + condition.testName + '/' + condition.errorNumber + '.png', image, 'base64', function (err) {
                    if (err!=null) {console.log(err)};
                });
                system.fs.writeFile('reports/' + condition.testName + '/' + condition.errorNumber + '.txt', condition.nowWeDoing +'\n'+e, function (err) {
                    if (err!=null) {console.log(err)};
                });
                console.log('сделали скрин'.yellow);
                console.log('Ошибка валидации: '.red, e);

            }));
        } else {console.log((value1+' '+getFnName(func)+' '+value2).green);}
    }
    function INeed (func, value1, value2, e) {
        if (!func(value1, value2)) {
            condition.NotValid = true;
            e += '\nvalue1 = ' + value1 + '\nvalue2 = ' + value2;
                throw e;
        }
    }
    return {
        VToEqual:VToEqual,
        VNotToEqual:VNotToEqual,
        IWant:IWant,
        INeed:INeed
    };
};