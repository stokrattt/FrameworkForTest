module.exports = function main(SF, JS, MF, LF, JSstep, VD, V, By, until,FileDetector, system, condition, config,constants) {
    global.fiber = Fiber.current;
    V.client = {};
    V.client.name = SF.randomBukva(6) + '_t';
    V.client.fam = SF.randomBukva(6) + '_t';
    V.client.phone = SF.randomCifra(10);
    V.client.email = SF.randomBukvaSmall(6) + '@' + SF.randomBukvaSmall(4) + '.tes';
    V.client.passwd = 123;

    //=========================начинаем писать тест=============================
    SF.get(V.frontURL);
condition.nowWeDoing = 'создаем мув и сторадж с верхней формы, добавляем инвентори в первую работу';
    SF.sleep (2);
    LF.FullSmallCalcAsMovingWithStorage (V.client);
    MF.FrontSite_GoToAccount();
    MF.Account_ClickViewRequest();
    MF.WaitWhileBusy();
    LF.AccountLocalAddInventory();
    MF.Account_WaitForInventoryCheck();
    SF.sleep(6);
    V.accountNumbersTo = {};
    LF.RememberAccountNumbers(V.accountNumbersTo);
    LF.addToCleanerJob(V.accountNumbersTo.Id);
    SF.sleep(1);
condition.nowWeDoing = 'Идём на From запоминаем данные';
    MF.Account_ClickFromStorage();
    MF.WaitWhileBusy();
    V.accountNumbersFrom = {};
    LF.RememberAccountNumbers(V.accountNumbersFrom);
    LF.addToCleanerJob(V.accountNumbersFrom.Id);
    LF.LogoutFromAccount();
    SF.get(V.adminURL);
    LF.LoginToBoardAsCustom(V.adminLogin,V.adminPassword);
condition.nowWeDoing = 'зашли в админку To storage ставим нот конферм, адрес и пароль клиенту, сравниваем данные с аккаунтом';
    MF.Board_OpenRequest(V.accountNumbersTo.Id);
    V.boardNumbersTo = {};
    LF.RememberDigitsRequestBoard(V.boardNumbersTo);
    JS.step(JSstep.selectTruck((V.boardNumbersTo.LaborTimeMax + V.boardNumbersTo.TravelTime) / 60));
    MF.WaitWhileBusy();
    LF.Validation_Compare_Account_Admin(V.accountNumbersTo, V.boardNumbersTo);
    MF.EditRequest_OpenClient();
    LF.SetClientPasswd(V.client.passwd);
    MF.EditRequest_OpenRequest();
    MF.EditRequest_SetAdressFrom ();
    MF.EditRequest_SetToNotConfirmed();
    MF.EditRequest_SaveChanges();
    LF.closeEditRequest();
condition.nowWeDoing = 'To storage ставим нот конферм, адрес и выставляем кубик фит в настройках с инвенторием и запоминаем данные с инвентори';
    MF.WaitWhileBusy();
    MF.Board_OpenRequest(V.accountNumbersFrom.Id);
    V.boardNumbersFrom = {};
    LF.RememberDigitsRequestBoard(V.boardNumbersFrom);
    JS.step(JSstep.selectTruck((V.boardNumbersFrom.LaborTimeMax + V.boardNumbersFrom.TravelTime) / 60));
    MF.WaitWhileBusy();
    LF.Validation_Compare_Account_Admin(V.accountNumbersFrom, V.boardNumbersFrom);
    SF.sleep(1);
    MF.EditRequest_OpenSettings();
    SF.click (By.xpath('//div[@ng-click="selectList(2)"]'));
    MF.EditRequest_OpenRequest();
    SF.sleep (3);
    V.boardNumbersFromWithInventory = {};
    LF.RememberDigitsRequestBoard(V.boardNumbersFromWithInventory);
    MF.EditRequest_SetToNotConfirmed();
    MF. EditRequest_SetAdressTo ();
    MF.EditRequest_SaveChanges();
    LF.closeEditRequest();
    MF.Board_LogoutAdmin();
    SF.get(V.accountURL);
    LF.LoginToAccountAsClient(V.client);
condition.nowWeDoing = 'идем в акк букаем первую работу';
    MF.Account_CheckRequestStatus_NotConfirmed(V.accountNumbersTo.Id);
    MF.Account_OpenRequest(V.accountNumbersTo.Id);
    LF.ConfirmRequestInAccount_WithReservation();
    MF.Account_WaitForGreenTextAfterConfirm();
condition.nowWeDoing = 'идем букаем вторую работу и сравнивем данные, так как выставили кастомный кубик фит с инвентори для второй работы';
    MF.Account_ClickFromStorage();
    MF.WaitWhileBusy();
    V.accountNumbersFromWithInventory = {};
    LF.RememberAccountNumbers(V.accountNumbersFromWithInventory);
    LF.Validation_Compare_Account_Admin (V.accountNumbersFromWithInventory, V.boardNumbersFromWithInventory);
    SF.sleep(1);
    LF.ConfirmRequestInAccount_WithReservation();
    MF.Account_WaitForGreenTextAfterConfirm();
    LF.LogoutFromAccount ();
 //=========================закончили писать тест=============================
    SF.endOfTest();
};
