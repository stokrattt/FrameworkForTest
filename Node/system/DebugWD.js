module.exports = function(SF, JS, MF, LF, JSstep, VD, V, By, until,FileDetector, system, condition, config,constants) {
    function pauseWatcher() {
        if (condition.busy) {
            console.log('пауза'.yellow);
            driver.wait(new Promise(function (resolve, reject) {
                let f = function() {
                    if (!condition.busy) {
                        resolve("result");
                        fiber.run();
                    } else {
                        setTimeout(f, 500);
                    }
                };
                setTimeout(f, 1000);
            }));

        }
    }
    function WDconsole() {
        var recording = false;
        var buffer = '';
        var args='SF, JS, MF, LF, JSstep, VD, V, By, until,FileDetector, system, condition, config,constants';
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
                        console.log('ошибка '.red + e);
                    }
                    buffer = '';
                } else if (recording) {
                    buffer += chunk;
                }
            }
        });
    }
    function pause() {
        if (config.D) {
            condition.busy = true;
            console.log('пауза'.yellow);
            driver.wait(new Promise(function (resolve, reject) {
                let f = function() {
                    if (!condition.busy) {
                        resolve("result");
                        fiber.run();
                    } else {
                        setTimeout(f, 500);
                    }
                };
                setTimeout(f, 1000);
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
