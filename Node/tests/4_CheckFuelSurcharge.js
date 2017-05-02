module.exports = function main(SF, JS, MF, LF, JSstep, VD, V, By, until,FileDetector, system, condition, config,constants) {    global.fiber = Fiber.current;
    V.client = {};
    V.client.name = SF.randomBukva(6) + '_t';
    V.client.fam = SF.randomBukva(6) + '_t';
    V.client.phone = SF.randomCifra(10);
    V.client.email = SF.randomBukvaSmall(6) + '@' + SF.randomBukvaSmall(4) + '.tes';

    SF.get(V.adminURL);
    LF.LoginToBoardAsAdmin();
    LF.CreateLocalMovingFromBoard(V.client);
    V.boardNumbers = {};
    LF.RememberDigitsRequestBoard(V.boardNumbers);


    //*****************************************************************************
    condition.nowWeDoing = 'считаем бензин';
    MF.EditRequest_OpenFuel();
    MF.EditRequest_GetValueFromFuelModal(V.boardNumbers);

    MF.EditRequest_CloseModal();
    V.summQuote = (parseFloat((V.boardNumbers.QuoteMin + V.boardNumbers.QuoteMax)/2)).toFixed(2);
    V.calcFuel = (V.summQuote * V.boardNumbers.FuelPerc/100).toFixed(2);
    VD.IWant(VD.VToEqual, V.calcFuel, V.boardNumbers.Fuel, 'Бензин посчитан неправильно');
    SF.sleep (3);
//*******************************************************************************************
    SF.endOfTest();
};
