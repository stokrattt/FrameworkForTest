module.exports = function main(SF, JS, MF, LF, JSstep, VD, V, By, until,FileDetector, system, condition, config,constants) {
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

condition.nowWeDoing = 'создаем реквест локал мув, запоминаем данные, добавляем инвентори, запоминаем данные, потом меняем кубик фит на дефолтный' +
    'и сравниваем данные, должны быть одинаковые';
    LF.CreateLocalMovingFromBoard(V.client);
    V.boardNumbersDefault = {};
    LF.RememberDigitsRequestBoard (V.boardNumbersDefault);
    LF.addInventoryBoard ();
    SF.sleep (5); // ждет обновления фуела и квоты после добавления инвентаря, почему то долго начало обновлятся
    V.boardNumbersInventory = {};
    LF.RememberDigitsRequestBoard (V.boardNumbersInventory);
    MF.EditRequest_OpenSettings ();
    MF.EditRequest_ClickDefaultCubFit();
    MF.EditRequest_OpenRequest ();
    MF.EditRequest_RememberId (V.request);
    // LF.addToCleanerJob (V.request.Id);
    MF.EditRequest_SaveChanges ();
    LF.closeEditRequest ();
    MF.Board_OpenRequest (V.request.Id);
    V.boardNumbersDefault2 = {};
    LF.RememberDigitsRequestBoard (V.boardNumbersDefault2);
    LF.Validation_Compare_Account_Admin (V.boardNumbersDefault2, V.boardNumbersDefault);
    MF.EditRequest_OpenSettings ();

condition.nowWeDoing = 'идем в аккаунт и проверяем что там стоит дефолтный кубик фит';
    MF.EditRequest_ClickViewRequest();
    SF.openTab (1);
    MF.Account_WaitForLoadingAccount();
    V.accountNumbersDefault = {};
    LF.RememberAccountNumbers (V.accountNumbersDefault);
    LF.Validation_Compare_Account_Admin (V.accountNumbersDefault, V.boardNumbersDefault2);
    driver.close();
    SF.openTab (0);
    SF.sleep (1);
    MF.EditRequest_ClickSizeInventory();
    MF.EditRequest_OpenRequest ();
    MF.EditRequest_SaveChanges ();
    LF.closeEditRequest ();
    MF.Board_OpenRequest (V.request.Id);

condition.nowWeDoing = 'теперь выставляем кубик фит на инвентори, закрыли и открыли, сравнили, должны быть данные по инвентори все одинаковые';
    V.boardNumbersInventory2 = {};
    LF.RememberDigitsRequestBoard (V.boardNumbersInventory2);
    LF.Validation_Compare_Account_Admin (V.boardNumbersInventory, V.boardNumbersInventory2);
    MF.EditRequest_OpenSettings ();

condition.nowWeDoing = 'идем в аккаунт и проверяем что там стоит инвентори кубик фит';
    MF.EditRequest_ClickViewRequest();
    SF.openTab (1);
    MF.Account_WaitForLoadingAccount();
    V.accountNumbersInventory = {};
    LF.RememberAccountNumbers (V.accountNumbersInventory);
    LF.Validation_Compare_Account_Admin (V.accountNumbersInventory, V.boardNumbersInventory2);
    driver.close();
    SF.openTab (0);
    SF.sleep (1);

condition.nowWeDoing = 'теперь выставляем кубик фит на кастомный 1500, закрыли и открыли, сравнили, должны быть данные по кастому все одинаковые';
    MF.EditRequest_ClickCustomCubFit();
    MF.EditRequest_SendNumberCustomCubFit(1500);
    MF.EditRequest_OpenRequest ();
    V.boardNumbersCustom = {};
    LF.RememberDigitsRequestBoard (V.boardNumbersCustom);
    MF.EditRequest_SaveChanges ();
    LF.closeEditRequest ();
    MF.Board_OpenRequest (V.request.Id);
    V.boardNumbersCustom2 = {};
    LF.RememberDigitsRequestBoard (V.boardNumbersCustom2);
    LF.Validation_Compare_Account_Admin (V.boardNumbersCustom, V.boardNumbersCustom2);
    MF.EditRequest_OpenSettings ();

condition.nowWeDoing = 'идем в аккаунт и проверяем что там стоит кастомный кубик фит';
    MF.EditRequest_ClickViewRequest();
    SF.openTab (1);
    MF.Account_WaitForLoadingAccount();
    V.accountNumbersCustom = {};
    LF.RememberAccountNumbers (V.accountNumbersCustom);
    LF.Validation_Compare_Account_Admin (V.accountNumbersCustom, V.boardNumbersCustom2);
    SF.sleep (1);

    //=========================закончили писать тест=============================
    SF.endOfTest();
};
