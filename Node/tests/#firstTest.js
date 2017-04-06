module.exports = function main(SF, JS, JSstep, VD, V, By, until,FileDetector, system, condition, LF,config,constants){
    global.fiber = Fiber.current;

    //=========================начинаем писать тест=============================
    SF.get('http://stage.themoveboard.com/moveBoard/#/login');
    LF.LoginToBoardAsAdmin();
    LF.OpenRequest(68251);
    Debug.pause();
    JS.step(JSstep.selectTruck);
    V.boardNumbers = {};
    LF.RememberDigitsRequestBoard(V.boardNumbers);
    VD.IWant(VD.VToEqual,V.boardNumbers.Fuel, 82.6,'Фуель не совпал');

    //=========================закончили писать тест=============================
    SF.endOfTest();
};
