module.exports = {
    console: function () {
        var recording = false;
        var bufferInit = "global.fiber = Fiber.current;";
        var buffer = '';
        var pauseFunc = new Function('', 'Fiber.yield();');
        process.stdin.setEncoding('utf8');
        process.stdin.on('data', function (chunk) {
            //var chunk = process.stdin.read();
            if (chunk !== null) {
                if ((chunk[0] === '|') && (chunk[1] === '|') && (chunk[2] === '|') && (!recording)) {
                    busy ? busy=false : Debug.pause();
                } else if ((chunk[0] === '>') && (chunk[1] === '>') && (chunk[2] === '>') && (!recording)) {
                    recording = true;
                } else if ((chunk[0] === '<') && (chunk[1] === '<') && (chunk[2] === '<') && (recording)) {
                    try {
                        recording = false;
                        var newFunc = new Function('', buffer);
                        newFunc();
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
    },
    pauseWatcher: function () {
        setInterval( function() {
            if (busy) {
                driver.wait(new Promise(function (resolve, reject) {
                    var playTimer = setInterval(function () {
                        // переведёт промис в состояние fulfilled с результатом "result"
                        if (!busy) {
                            resolve("result");
                            clearInterval(playTimer);
                            fiber.run();
                        }
                    }, 2000);
                }));
            }
        }, 500);
    },
    pause: function(){
        if (Debug) {
            busy = true;
            console.log('пауза');
            driver.wait(new Promise(function (resolve, reject) {
                var playTimer = setInterval(function () {
                    if (!busy) {
                        resolve("result");
                        clearInterval(playTimer);
                        fiber.run();
                        console.log('играй...');
                    }
                }, 100);
            }));
            Fiber.yield();
        }
    },
};

