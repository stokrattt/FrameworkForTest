sleep = require('sleep');

exports.LookAtConsole = function(By,until,driver,V){
    var recording = false;
    var buffer=' ';
    process.stdin.setEncoding('utf8');
    process.stdin.on('data', function(chunk){
        //var chunk = process.stdin.read();
    if (chunk !== null) {
        if ((chunk[0] === '>')&&(chunk[1] === '>')&&(chunk[2] === '>')&&(!recording)) {
            recording = true;
        } else if ((chunk[0] === '<')&&(chunk[1] === '<')&&(chunk[2] === '<')&&(recording)){
            try {
                recording = false;
                var newFunc = new Function('By,until,driver,V', buffer);
                newFunc(By,until,driver,V);
            } catch(e){console.log('ошибка '+e);}
            buffer=' ';
        } else if (recording) {
            buffer+=chunk;
        }
    }
});
};

