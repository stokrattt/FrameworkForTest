module.exports = main;
function main(){
    global.fiber = Fiber.current;
    var URL = 'http://stage.themoveboard.com/';
    driver.get(URL);
    FullSmallCalcAsLocal();
    console.log('мы типа в конце');
}


