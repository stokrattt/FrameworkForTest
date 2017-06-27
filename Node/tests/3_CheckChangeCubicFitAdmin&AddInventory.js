module.exports = function main(SF, JS, MF, LF, JSstep, VD, V, By, until,FileDetector, system, condition, config,constants) {    global.fiber = Fiber.current;
    V.client = {};
    V.client.name = SF.randomBukva(6) + '_t';
    V.client.fam = SF.randomBukva(6) + '_t';
    V.client.phone = SF.randomCifra(10);
    V.client.email = SF.randomBukvaSmall(6) + '@' + SF.randomBukvaSmall(4) + '.tes';

    SF.get(V.adminURL);
    LF.LoginToBoardAsCustom(V.adminLogin,V.adminPassword);
    LF.CreateLocalMovingFromBoard(V.client);

    V.boardNumbers={};
    MF.EditRequest_RememberCbf(V.boardNumbers);
    MF.EditRequest_AddRoomNumber(4);
    MF.EditRequest_AddRoomNumber(5);
    MF.EditRequest_AddRoomNumber(6);
    SF.sleep (2);

    Debug.pause ();
    V.boardNumbersNew={};
    MF.EditRequest_RememberCbf(V.boardNumbersNew);
    VD.IWant(VD.NotToEqual, V.boardNumbers.cbf, V.boardNumbersNew.cbf, 'Кубик фит не изменился, хотя должен был');
    V.boardNumbers = {};
    V.boardNumbersNew = {};
    MF.EditRequest_RememberCbf(V.boardNumbers);

    condition.nowWeDoing = 'выключили калькулятор';
    MF.EditRequest_SwitchCalculator();
    MF.EditRequest_AddRoomNumber(2);
    MF.EditRequest_AddRoomNumber(7);
    SF.sleep (2);
    MF.EditRequest_RememberCbf(V.boardNumbersNew);
    VD.IWant(VD.NotToEqual, V.boardNumbers.cbf, V.boardNumbersNew.cbf, 'Кубик фит не изменился, хотя должен был');

    condition.nowWeDoing = 'включили калькулятор';
    MF.EditRequest_SwitchCalculator();
    LF.addInventoryBoard (V.boardNumbers);
    MF.EditRequest_RememberCbf(V.boardNumbers);
    SF.sleep (2);
    VD.IWant (VD.ToEqual, V.boardNumbers.cbf, V.boardNumbers.InventoryCubicFit, 'Кубик фит не совпадает с инвенторием, а должен');

    SF.endOfTest();
};
