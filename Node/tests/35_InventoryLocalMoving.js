module.exports = function main(SF, JS, MF, LF, JSstep, VD, V, By, until,FileDetector, system, condition, config,constants) {
    global.fiber = Fiber.current;

    //=========================начинаем писать тест=============================
    V.client = {};
    V.client.name = SF.randomBukva(6) + '_t';
    V.client.fam = SF.randomBukva(6) + '_t';
    V.client.phone = SF.randomCifra(10);
    V.client.email = SF.randomBukvaSmall(6) + '@' + SF.randomBukvaSmall(4) + '.tes';
    V.client.passwd = 123;

    condition.nowWeDoing = 'Создать с фронта local Moving';
    SF.get(V.frontURL);
    LF.FullSmallCalcAsLocal(V.client);

    condition.nowWeDoing = 'Зайти на аккаунт, добавить инвентарь, запомнить cbf';
    MF.Account_ClickViewRequest();
    MF.WaitWhileBusy();
    SF.sleep(5);
    MF.WaitWhileBusy();
    V.accountNumbers={};
    LF.AccountLocalAddInventory(V.accountNumbers);
    MF.Account_WaitForInventoryCheck();
    LF.RememberAccountNumbers(V.accountNumbers);
    LF.LogoutFromAccount();

    condition.nowWeDoing = 'первый раз в админке';
    SF.get(V.adminURL);
    LF.LoginToBoardAsCustom(V.adminLogin,V.adminPassword);
    SF.sleep (3);
    MF.Board_OpenRequest(V.accountNumbers.Id);
    V.boardNumbers={};
    LF.RememberDigitsRequestBoard(V.boardNumbers);
    VD.IWant(VD.VToEqual, V.accountNumbers.InventoryCbf, V.boardNumbers.cbf,'Не совпали cbf аккаунта и борда');
    LF.addInventoryBoard (V.boardNumbers);
    MF.EditRequest_OpenClient();
    LF.SetClientPasswd(V.client.passwd);
    MF.EditRequest_OpenRequest();
    MF.EditRequest_SaveChanges();
    LF.closeEditRequest();
    SF.sleep(2);
    MF.Board_LogoutAdmin();

    condition.nowWeDoing = 'второй раз в аккаунте';
    SF.get(V.accountURL);
    LF.LoginToAccountAsClient(V.client);
    MF.Account_CheckRequestStatus_Pending(V.accountNumbers.Id);
    MF.Account_OpenRequest(V.accountNumbers.Id);
    LF.RememberAccountNumbers(V.accountNumbers);
    VD.IWant(VD.VToEqual, V.accountNumbers.cbf, V.boardNumbers.InventoryCubicFit);
    SF.sleep(2);

    //=========================закончили писать тест=============================
    SF.endOfTest();
};