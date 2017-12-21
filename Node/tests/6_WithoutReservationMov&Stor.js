module.exports = function main(SF, JS, MF, LF, JSstep, VD, V, By, until,FileDetector, system, condition, config,constants) {    global.fiber = Fiber.current;
    V.ReservationPrice = {};
    V.client = {};
    V.client.name = SF.randomBukva(6) + '_t';
    V.client.fam = SF.randomBukva(6) + '_t';
    V.client.phone = SF.randomCifra(10);
    V.client.email = SF.randomBukvaSmall(6) + '@' + SF.randomBukvaSmall(4) + '.tes';

    SF.get(V.adminURL);
    LF.LoginToBoardAsCustom(V.adminLogin,V.adminPassword);

    condition.nowWeDoing = 'идем в настройки и отключаем резервацию в 0';
    MF.Board_OpenSettingsSchedule();
    V.ReservationPrice = 0;
    MF.Schedule_SetReservationLocalTo(V.ReservationPrice);
    MF.Board_Refresh();

    condition.nowWeDoing = 'создаем реквест';
    LF.CreateMovAndStorFromBoard (V.client);
    V.boardNumbers = {};
    LF.RememberDigitsRequestBoard(V.boardNumbers);
    LF.addToCleanerJob(V.boardNumbers.Id);
    MF.EditRequest_SetToNotConfirmed();
    JS.step(JSstep.selectTruck((V.boardNumbers.LaborTimeMax + V.boardNumbers.TravelTime)/60));
    MF.WaitWhileBusy();
    MF.EditRequest_SetAdressFrom ();
    MF.EditRequest_SaveChanges();
    MF.EditRequest_OpenClient();
    V.client.passwd = 123;
    LF.SetClientPasswd(V.client.passwd);
    MF.EditRequest_CloseEditRequest();
    MF.Board_SearchRequest((V.boardNumbers.Id) + 1);
    SF.sleep(3);
    V.request.Id = (V.boardNumbers.Id) + 1;
    MF.Board_SearchOpenRequest (V.request);
    MF.EditRequest_SetToNotConfirmed();
    JS.step(JSstep.selectTruck((V.boardNumbers.LaborTimeMax + V.boardNumbers.TravelTime)/60));
    MF.WaitWhileBusy();
    MF.EditRequest_SetAdressTo ();
    MF.EditRequest_SaveChanges();
    MF.EditRequest_CloseEditRequest();


    MF.Board_LogoutAdmin ();

    condition.nowWeDoing = 'идем в аккаунт букать работу без резервации';
    SF.get(V.accountURL);
    LF.LoginToAccountAsClient (V.client, V.client.passwd);
    MF.Account_CheckRequestStatus_NotConfirmed(V.boardNumbers.Id);
    MF.Account_OpenRequest(V.boardNumbers.Id);
    MF.Account_ClickViewRequest();
    LF.ConfirmRequestInAccount_NoReservation();
    MF.Account_WaitForGreenTextAfterConfirm();
    MF.Account_ClickFromStorage ();
    LF.ConfirmRequestInAccount_NoReservation();
    MF.Account_WaitForGreenTextAfterConfirm();
    SF.endOfTest();
};