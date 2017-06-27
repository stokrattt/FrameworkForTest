module.exports = function main(SF, JS, MF, LF, JSstep, VD, V, By, until,FileDetector, system, condition, config,constants) {
    global.fiber = Fiber.current;
    V.client = {};
    V.client.name = SF.randomBukva(6) + '_t';
    V.client.fam = SF.randomBukva(6) + '_t';
    V.client.phone = SF.randomCifra(10);
    V.client.email = SF.randomBukvaSmall(6) + '@' + SF.randomBukvaSmall(4) + '.tes';

    SF.get(V.adminURL);
    LF.LoginToBoardAsCustom(V.adminLogin,V.adminPassword);
    LF.CreateLocalMovingFromBoard(V.client);
    V.boardNumbers = {};
    LF.RememberDigitsRequestBoard(V.boardNumbers);
    MF.EditRequest_AddRoomNumber(4);
    MF.EditRequest_AddRoomNumber(5);
    MF.EditRequest_AddRoomNumber(6);
    SF.sleep (4);

    //*****************************************************************************
    condition.nowWeDoing = 'считаем бензин';
    MF.EditRequest_OpenFuel();
    MF.EditRequest_GetValueFromFuelModal(V.boardNumbers);

    MF.EditRequest_CloseModal();
    V.summQuote = (parseFloat((V.boardNumbers.QuoteMin + V.boardNumbers.QuoteMax)/2)).toFixed(2);
    V.calcFuel = (V.summQuote * V.boardNumbers.FuelPerc/100).toFixed(2);
    VD.IWant(VD.ToEqual, V.calcFuel, V.boardNumbers.Fuel, 'Бензин посчитан неправильно');
    SF.sleep (1);

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
    MF.EditRequest_SaveChanges ();
    LF.closeEditRequest ();

condition.nowWeDoing = 'идем в нот коферм и проверяем букед и move дейт';
    MF.Board_OpenConfirmed ();
    SF.select(By.xpath('//select[@ng-model="vm.conf_filter"]'), 2);
    MF.WaitWhileBusy ();
    SF.sleep(63);
    driver.wait(driver.executeScript("return $('tr[ng-repeat=\"request in requests track by $index\"]:visible').length").then(function (text) {
        VD.IWant (VD.NotToEqual, text, 0, 'пропали реквесты после того как выбрали Move date');
    }),config.timeout);
    SF.sleep(1);
    // SF.select(By.xpath('//select[@ng-model="vm.conf_filter"]'), 1);
    // MF.WaitWhileBusy ();
    // SF.sleep(63);
    // driver.wait(driver.executeScript("return $('tr[ng-repeat=\"request in requests track by $index\"]:visible').length").then(function (text) {
    //     VD.IWant (VD.NotToEqual, text, 0, 'пропали реквесты после того как выбрали Booked date');
    // }),config.timeout);
    // SF.sleep(1);

//*******************************************************************************************
    SF.endOfTest();
};
