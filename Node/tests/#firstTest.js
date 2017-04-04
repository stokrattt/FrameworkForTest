module.exports = function main(driver, SF, JS, JSstep, VD, V, By, until,FileDetector, system, condition, Debug,LF,config,constants){
    global.fiber = Fiber.current;

    SF.get('http://stage.themoveboard.com/moveBoard/#/login');
    LF.LoginToBoardAsAdmin();
    LF.OpenRequest(68251);
    Debug.pause();
    JS.step(JSstep.selectTruck);

    LF.RememberDigitsRequestBoard();

    VD.IWant(VD.VToEqual,V.boardNumbers.Fuel, 82.6,'Фуель не совпал');



    SF.endOfTest();
};
