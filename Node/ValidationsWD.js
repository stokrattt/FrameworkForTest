global.WDWantToEqual = function(value1, value2,e){
    if (value1!==value2) {
        driver.takeScreenshot().then(function (image) {
            let exist = fs.existsSync(testName);
            if (!exist) {fs.mkdirSync(testName);}
            errorNumber++;
            var temp = 3;
            require('fs').writeFile('./'+testName + '/' + errorNumber + '.png', image, 'base64', function (err) {
                console.log(err);
                if (!busy) {
                    temp--;
                    if (temp == 0) {
                        fiber.run();
                    }
                }
            });
            require('fs').writeFile('./'+testName + '/' + errorNumber + '.txt', e, function (err) {
                console.log(err);
                if (!busy) {
                    temp--;
                    if (temp == 0) {
                        fiber.run();
                    }
                }
            });
            console.log('сделали скрин');
            console.log('Ошибка валидации: ', e);
            if (!busy) {
                temp--;
                if (temp == 0) {
                    fiber.run();
                }
            }

        });
        if (!busy) {
            Fiber.yield();
        }
    }
};
global.WDMustBeEqual = function(value1, value2, e){
    if (value1!==value2) {
        MyError.throwDecodedError({error:404, message:e});
        endOfTest();
    }
};