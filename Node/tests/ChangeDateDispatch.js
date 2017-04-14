module.exports = function main(SF, JS, JSstep, VD, V, By, until,FileDetector, system, condition, LF,config,constants){
    global.fiber = Fiber.current;
    V.client = {};
    V.client.name = SF.randomBukva(6) + '_t';
    V.client.fam = SF.randomBukva(6) + '_t';
    V.client.phone = SF.randomCifra(10);
    V.client.email = SF.randomBukvaSmall(6) + '@' + SF.randomBukvaSmall(4) + '.tes';

    //=========================начинаем писать тест=============================

    SF.get(V.adminURL);
    LF.LoginToBoardAsAdmin();
    JS.waitForNotExist ('div.busyoverlay:visible');
condition.nowWeDoing = 'создаем реквест ';




    Debug.pause();

    //=========================закончили писать тест=============================
    SF.endOfTest();
};
