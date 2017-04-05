module.exports = function(driver, SF, JS, JSstep, VD, V, By, until,FileDetector, system, condition, LF,config,constants) {
    function pauseWatcher() {
        if (condition.busy) {
            console.log('пауза');
            driver.wait(new Promise(function (resolve, reject) {
                var playTimer = setInterval(function () {
                    // переведёт промис в состояние fulfilled с результатом "result"
                    if (!condition.busy) {
                        resolve("result");
                        clearInterval(playTimer);
                        fiber.run();
                    }
                }, 2000);
            }));

        }
    }
    function WDconsole() {
        var recording = false;
        var buffer = '';
        var args='driver, SF, JS, JSstep, VD, V, By, until,FileDetector, system, condition,LF,config,constants';
        process.stdin.setEncoding('utf8');
        process.stdin.on('data', function (chunk) {
            //var chunk = process.stdin.read();
            if (chunk !== null) {
                if ((chunk[0] === '|') && (chunk[1] === '|') && (chunk[2] === '|') && (!recording)) {
                    if (condition.busy) {
                        condition.busy = false;
                    } else {
                        condition.busy = true;
                        pauseWatcher();
                    }
                } else if ((chunk[0] === '>') && (chunk[1] === '>') && (chunk[2] === '>') && (!recording)) {
                    recording = true;
                } else if ((chunk[0] === '<') && (chunk[1] === '<') && (chunk[2] === '<') && (recording)) {
                    try {
                        recording = false;
                        var newFunc = new Function(args, buffer);
                        newFunc(driver, SF, JS, JSstep, VD, V, By, until,FileDetector, system, condition,LF,config,constants);
                    } catch (e) {
                        console.log('ошибка ' + e);
                    }
                    buffer = '';
                } else if (recording) {
                    buffer += chunk;
                }
            }
        });
        return true;
    }
    function pause() {
        if (config.D) {
            condition.busy = true;
            console.log('пауза');
            driver.wait(new Promise(function (resolve, reject) {
                var playTimer = setInterval(function () {
                    if (!condition.busy) {
                        resolve("result");
                        clearInterval(playTimer);
                        fiber.run();
                        console.log('играй...');
                    }
                }, 100);
            }));
            Fiber.yield();
        }
    }
    return {
        WDconsole: WDconsole,
        pauseWatcher: pauseWatcher,
        pause: pause
    }
};
