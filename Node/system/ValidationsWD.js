module.exports = function (system, condition) {
    function VToEqual (value1, value2) {
        return (value1 == value2);
    }
    function VNotToEqual (value1, value2) {
        return (value1 != value2);
    }
    function IWant (func, value1, value2, e) {
        if (!func(value1, value2)) {
            condition.NotValid = true;
            e += '\nvalue1 = ' + value1 + '\nvalue2 = ' + value2;
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
                system.fs.writeFile('reports/' + condition.testName + '/' + condition.errorNumber + '.txt', condition.nowWeDoing +'\n'+e+ '\n' + e.stack, function (err) {
                    if (err!=null) {console.log(err)};
                });
                console.log('сделали скрин');
                console.log('Ошибка валидации: ', e);

            }));
        }
    }
    function INeed (value1, value2, e) {
        if (value1 !== value2) {
            MyError.throwDecodedError({error: 404, message: e});
            endOfTest();
        }
    }
    return {
        VToEqual:VToEqual,
        VNotToEqual:VNotToEqual,
        IWant:IWant,
        INeed:INeed
    };
};