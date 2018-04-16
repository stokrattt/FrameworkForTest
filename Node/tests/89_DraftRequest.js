module.exports = function main(SF, JS, MF, LF, JSstep, VD, V, By, until, FileDetector, system, condition, config, constants) {
    global.fiber = Fiber.current;
    V.client = {};
    V.client.name = SF.randomBukva(6) + '_t';
    V.client.fam = SF.randomBukva(6) + '_t';
    V.client.phone = SF.randomCifra(10);
    V.client.email = SF.randomBukvaSmall(6) + '@' + SF.randomBukvaSmall(4) + '.tes';
    V.client.passwd = 123;

    //=========================начинаем писать тест=============================
    SF.get(V.adminURL);
    LF.LoginToBoardAsCustom(V.adminLogin,V.adminPassword);
    MF.Board_CreateDraftRequest();
    MF.EditRequest_OpenClient();
    LF.SendClientInfoForDraftRequest(V.client);
    LF.SetClientPasswd(V.client.passwd);
    MF.EditRequest_OpenRequest();
    LF.addInventoryBoard();
    LF.addAdditionalInventoryBoard();
    LF.EditRequest_AddPacking ();
    LF.EditRequest_AddAdditionalServicesFullPack ();
    SF.click(By.xpath('//input[@ng-model="request.field_moving_to.postal_code"]'));
    driver.findElement(By.xpath('//input[@ng-model="request.field_moving_to.postal_code"]')).sendKeys(Key.chord((Key.CONTROL + 'a')));
    SF.send(By.xpath('//input[@ng-model="request.field_moving_to.postal_code"]'), "01247");
    MF.EditRequest_SetAdressToFrom ();
    SF.sleep(5);
    V.boardNumbers = {};
    LF.RememberDigitsRequestBoard (V.boardNumbers);

condition.nowWeDoing = 'тут меняем этажи и проверяем что время пересчитывается и рейт и крю';
    MF.EditRequest_ChangeStairsFrom(5);
    V.boardNumbersChangeStairsFrom = {};
    LF.RememberDigitsRequestBoard (V.boardNumbersChangeStairsFrom);
    VD.IWant(VD.NotToEqual, V.boardNumbers.LaborTimeMin, V.boardNumbersChangeStairsFrom.LaborTimeMin, 'не пересчитало LaborTimeMin в реквесте после смены этажей from');
    VD.IWant(VD.NotToEqual, V.boardNumbers.LaborTimeMax, V.boardNumbersChangeStairsFrom.LaborTimeMax, 'не пересчитало LaborTimeMax в реквесте после смены этажей from');
    VD.IWant(VD.NotToEqual, V.boardNumbers.CrewSize, V.boardNumbersChangeStairsFrom.CrewSize, 'не пересчитало crew size в реквесте после смены этажей from');
    VD.IWant(VD.NotToEqual, V.boardNumbers.HourlyRate, V.boardNumbersChangeStairsFrom.HourlyRate, 'не пересчитало Rate в реквесте после смены этажей from');
    MF.EditRequest_ChangeStairsTo(5);
    V.boardNumbersChangeStairsTo = {};
    LF.RememberDigitsRequestBoard (V.boardNumbersChangeStairsTo);
    VD.IWant(VD.NotToEqual, V.boardNumbers.LaborTimeMin, V.boardNumbersChangeStairsTo.LaborTimeMin, 'не пересчитало LaborTimeMin в реквесте после смены этажей to');
    VD.IWant(VD.NotToEqual, V.boardNumbers.LaborTimeMax, V.boardNumbersChangeStairsTo.LaborTimeMax, 'не пересчитало LaborTimeMax в реквесте после смены этажей to');
    JS.step(JSstep.selectTruck((V.boardNumbersChangeStairsTo.LaborTimeMax + V.boardNumbersChangeStairsTo.TravelTime)/60));
    MF.WaitWhileBusy();
    MF.EditRequest_SetToNotConfirmed ();
    MF.EditRequest_SaveChanges ();
    MF.EditRequest_CloseEditRequest();
    MF.Board_LogoutAdmin();
    SF.get(V.accountURL);
    LF.LoginToAccountAsClient (V.client);
    MF.Account_CheckRequestStatus_NotConfirmed(V.boardNumbers.Id);
    MF.Account_OpenRequest(V.boardNumbers.Id);
    MF.Account_ClickViewRequest();
    V.accountNumbers={};
    LF.RememberAccountNumbers(V.accountNumbers);
    LF.Validation_Compare_Account_Admin(V.accountNumbers, V.boardNumbersChangeStairsTo);
    LF.ConfirmRequestInAccount_WithReservation();
    MF.Account_WaitForGreenTextAfterConfirm();

    //=========================закончили писать тест=============================
    SF.endOfTest();
};
