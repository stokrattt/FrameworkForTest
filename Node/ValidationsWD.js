global.VToEqual = function(value1, value2){return (value1==value2);};
global.VNotToEqual = function(value1, value2){return (value1!=value2);};
global.IWant = function(func, value1, value2, e){
    if (!func(value1,value2)) {
        NotValid=true;
        e+='\nvalue1 = '+value1+'\nvalue2 = '+value2;
        driver.wait(driver.takeScreenshot().then(function (image) {
            let exist = fs.existsSync('reports/'+testName);
            if (!exist) {fs.mkdirSync('reports/'+testName);}
            errorNumber++;
            var temp = 3;
            fs.writeFile('reports/'+testName + '/' + errorNumber + '.png', image, 'base64', function (err) {
                console.log(err);
            });
            fs.writeFile('reports/'+testName + '/' + errorNumber + '.txt', nowWeDoing+'\n'+e, function (err) {
                console.log(err);
            });
            console.log('сделали скрин');
            console.log('Ошибка валидации: ', e);

        }));
    }
};
global.WDMustBeEqual = function(value1, value2, e){
    if (value1!==value2) {
        MyError.throwDecodedError({error:404, message:e});
        endOfTest();
    }
};