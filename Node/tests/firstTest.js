module.exports = function main(SF, JS, MF, LF, JSstep, VD, V, By, until,FileDetector, system, condition, config,constants) {
    global.fiber = Fiber.current;
    V.client = {};
    V.client.name = SF.randomBukva(6) + '_t';
    V.client.fam = SF.randomBukva(6) + '_t';
    V.client.phone = SF.randomCifra(10);
    V.client.email = SF.randomBukvaSmall(6) + '@' + SF.randomBukvaSmall(4) + '.tes';
    V.client.passwd = 123;

    //=========================начинаем писать тест=============================
    SF.get('http://stage.themoveboard.com/moveBoard/#/login');
    LF.LoginToBoardAsAdmin();
    LF.CreateLocalMovingFromBoard(V.client);
    Debug.pause();
    V.boardNumbers = {};
    LF.RememberDigitsRequestBoard(V.boardNumbers);
    JS.step(JSstep.selectTruck((V.boardNumbers.LaborTimeMax + V.boardNumbers.TravelTime)/60));
    VD.IWant(VD.VToEqual,V.boardNumbers.Fuel, 82.6,'Фуель не совпал');

    //=========================закончили писать тест=============================
    SF.endOfTest();
};
