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

    condition.nowWeDoing = 'создаем локал мув и выключаем калькулятор';
    LF.LoginToBoardAsCustom(V.adminLogin,V.adminPassword);
    // LF.CreateLocalMovingFromBoard (V.client);
    // MF.EditRequest_OpenClient();
    // LF.SetClientPasswd(V.client.passwd);
    // MF.EditRequest_OpenRequest();
    // MF.EditRequest_SwitchCalculator();
    // MF.EditRequest_SaveChanges();
    // V.boardNumbersLM = {};
    // LF.RememberDigitsRequestBoard(V.boardNumbersLM);
    // MF.EditRequest_CloseEditRequest();

    condition.nowWeDoing = 'создаем moving storage и выключаем калькулятор';
    V.clientMS = {};
    V.clientMS.name = SF.randomBukva(6) + '_t';
    V.clientMS.fam = SF.randomBukva(6) + '_t';
    V.clientMS.phone = SF.randomCifra(10);
    V.clientMS.email = SF.randomBukvaSmall(6) + '@' + SF.randomBukvaSmall(4) + '.tes';
    V.clientMS.passwd = 123;

    MF.Board_CreateDraftRequest(V.clientMS);
    MF.FrontSiteSmallCalc_SelectServiceType(2);
    MF.EditRequest_OpenClient();
    LF.SetClientPasswd(V.clientMS.passwd);
    MF.EditRequest_OpenRequest();
    MF.EditRequest_SwitchCalculator();
    MF.EditRequest_SaveChanges();
    V.boardNumbersMS = {};
    LF.RememberDigitsRequestBoard(V.boardNumbersMS);
    MF.EditRequest_CloseEditRequest();
    MF.Board_LogoutAdmin();

    condition.nowWeDoing = 'заходим в акк под первым клиентом у которого локал мув и начинаем менять всякие мувсайзы инвентарь и сравнивать это все с админкой, что данные не меняются потому как кальк вылючен';
    SF.get(V.accountURL);
    LF.LoginToAccountAsClient(V.client);
    MF.Account_OpenRequest(V.boardNumbersLM.Id);
    MF.Account_ClickViewRequest();
    V.accountNumbersLM = {};
    LF.RememberAccountNumbers (V.accountNumbersLM);

    condition.nowWeDoing = 'первое сравнение просто нечего не меняя в акке ЛМ';
    LF.Validation_Compare_Account_Admin (V.boardNumbersLM, V.accountNumbersLM);

    condition.nowWeDoing = 'меняем мув сайз и после него сравним второй раз, если упадет то бага, потому как кальк выключен и не должно ничено не пересчитываться';
    MF.Account_OpenEditModal ();
    SF.select(By.xpath('//select[@field="request.move_size"]'), 9);
    SF.sleep(13); // долго обновляется смена мув сайза на акке
    MF.Account_ClickUpdateClientInModalWindow();
    MF.SweetConfirm();
    MF.SweetConfirm();
    V.accountNumbersLMChangeMoveSize = {};
    LF.RememberAccountNumbers (V.accountNumbersLMChangeMoveSize);
    LF.Validation_Compare_Account_Admin (V.boardNumbersLM, V.accountNumbersLMChangeMoveSize);

    condition.nowWeDoing= 'меняем зип код и опять сверяем если упадет то бага, потому как кальк выключен и не должно ничено не пересчитываться';
    MF.Account_OpenEditModal ();
    SF.clear(By.xpath('//input[@ng-value="request.field_moving_to.postal_code"]'));
    SF.send(By.xpath('//input[@ng-value="request.field_moving_to.postal_code"]'), '01001');
    SF.sleep(10);
    MF.Account_ClickUpdateClientInModalWindow();
    MF.SweetConfirm();
    MF.SweetConfirm();
    SF.sleep(3);
    V.accountNumbersLMChangeMoveSizeChangeZip = {};
    LF.RememberAccountNumbers (V.accountNumbersLMChangeMoveSizeChangeZip);
    LF.Validation_Compare_Account_Admin (V.boardNumbersLM, V.accountNumbersLMChangeMoveSizeChangeZip);

    condition.nowWeDoing= 'меняем details и опять сверяем если упадет то бага, потому как кальк выключен и не должно ничено не пересчитываться';
    MF.Account_ClickDetails ();
    MF.AccountFR_SeelectOptions();
    MF.Account_WaitForDetailsCheck();
    V.accountNumbersLMChangeMoveSizeChangeZipChangeDetails = {};
    LF.RememberAccountNumbers (V.accountNumbersLMChangeMoveSizeChangeZipChangeDetails);
    LF.Validation_Compare_Account_Admin (V.boardNumbersLM, V.accountNumbersLMChangeMoveSizeChangeZipChangeDetails);

    condition.nowWeDoing= 'добавляем инветорий и опять сверяем если упадет то бага, потому как кальк выключен и не должно ничено не пересчитываться';
    LF.AccountLocalAddInventoryWhenCalcOff ();
    SF.sleep(3);
    V.accountNumbersLMChangeMoveSizeChangeZipChangeDetailsAddInventory = {};
    LF.RememberAccountNumbers (V.accountNumbersLMChangeMoveSizeChangeZipChangeDetailsAddInventory);
    LF.Validation_Compare_Account_Admin (V.boardNumbersLM, V.accountNumbersLMChangeMoveSizeChangeZipChangeDetailsAddInventory);

LF.LogoutFromAccount();


    //=========================закончили писать тест=============================
    SF.endOfTest();
};
