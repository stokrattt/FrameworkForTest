module.exports = function main(SF, JS, MF, LF, JSstep, VD, V, By, until,FileDetector, system, condition, config,constants) {    global.fiber = Fiber.current;
    V.ReservationPrice = {};
    V.client = {};
    V.client.name = SF.randomBukva(6) + '_t';
    V.client.fam = SF.randomBukva(6) + '_t';
    V.client.phone = SF.randomCifra(10);
    V.client.email = SF.randomBukvaSmall(6) + '@' + SF.randomBukvaSmall(4) + '.tes';

    SF.get(V.adminURL);
    LF.LoginToBoardAsCustom(V.adminLogin,V.adminPassword);

    condition.nowWeDoing = 'идем в настройки и выставляем резервацию';
    // MF.Board_OpenSettingsSchedule();
    // V.ReservationPrice = 150;
    // MF.Schedule_SetReservationLocalTo(V.ReservationPrice);
    // MF.Board_Refresh();

    condition.nowWeDoing = 'создаем реквест';
    LF.CreateMovAndStorFromBoard (V.client);
    MF.WaitWhileBusy();

    V.boardNumbers = {};
    LF.RememberDigitsRequestBoard(V.boardNumbers);
    LF.addToCleanerJob(V.boardNumbers.Id);
    MF.EditRequest_SetToNotConfirmed();
    JS.step(JSstep.selectTruck((V.boardNumbers.LaborTimeMax + V.boardNumbers.TravelTime)/60));
    MF.EditRequest_SetAdressFrom ();
    MF.EditRequest_SaveChanges();
    MF.EditRequest_OpenClient();
    V.client.passwd = 123;
    LF.SetClientPasswd(V.client.passwd);
    MF.EditRequest_CloseEditRequest();
    MF.Board_LogoutAdmin ();

    condition.nowWeDoing = 'зашли под клиентом в акк';
    SF.get(V.accountURL);
    LF.LoginToAccountAsClient (V.client, V.client.passwd);
    MF.Account_CheckRequestStatus_NotConfirmed(V.boardNumbers.Id);
    MF.Account_OpenRequest(V.boardNumbers.Id);
    MF.Account_ClickViewRequest();
    MF.WaitWhileBusy();
    SF.sleep(5);
    MF.WaitWhileBusy();
    SF.click(By.id('tab_Moving Insurance'));
    SF.sleep(2);
    driver.wait(driver.findElements(By.xpath('//p[@ng-bind-html="vm.basicSettings.insurance_text"]')).then(function (len) {
        VD.IWant(VD.VToEqual, (len.length), 1, 'не нашло moving insurance на аккаунте')
    }),config.timeout);
    SF.sleep(2);
    LF.ConfirmRequestInAccount_WithReservation();
    MF.Account_WaitForGreenTextAfterConfirm();
    LF.LogoutFromAccount ();
    SF.endOfTest();
};