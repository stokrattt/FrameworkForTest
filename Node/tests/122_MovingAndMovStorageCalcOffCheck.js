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
    LF.CreateLocalMovingFromBoard (V.client);
    MF.EditRequest_OpenClient();
    LF.SetClientPasswd(V.client.passwd);
    MF.EditRequest_OpenRequest();
    MF.EditRequest_SwitchCalculator();
    MF.EditRequest_SaveChanges();
    V.boardNumbersLM = {};
    LF.RememberDigitsRequestBoard(V.boardNumbersLM);
    MF.EditRequest_CloseEditRequest();

condition.nowWeDoing = 'создаем moving storage из  драфта и выключаем калькулятор';
    V.clientMS = {};
    V.clientMS.name = SF.randomBukva(6) + '_t';
    V.clientMS.fam = SF.randomBukva(6) + '_t';
    V.clientMS.phone = SF.randomCifra(10);
    V.clientMS.email = SF.randomBukvaSmall(6) + '@' + SF.randomBukvaSmall(4) + '.tes';
    V.clientMS.passwd = 123;

    MF.Board_CreateDraftRequest();
    MF.EditRequest_SetZipCodeFrom('02136');
    MF.EditRequest_SetZipTo('02032');
    MF.EditRequest_SetAdressToFrom();
    SF.sleep(5);
    MF.EditRequest_SaveChanges();
    MF.FrontSiteSmallCalc_SelectServiceType(2);
    MF.SweetConfirm();
    SF.waitForLocated (By.xpath('//div[@style="z-index: 1060; display: block;"]//a[@ng-click="select(tabs[0])"]'));
    MF.WaitWhileBusy();
    SF.click(By.xpath('//div[@style="z-index: 1060; display: block;"]//button[@ng-click="cancel()"]'));
    SF.sleep(2);
    MF.EditRequest_OpenClient();
    LF.SendClientInfoForDraftRequest(V.clientMS);
    MF.Account_ClickUpdateClientInModalWindow();
    MF.Account_ClickUpdateClientInModalWindow();
    SF.waitForLocated(By.xpath('//button[@ng-click="updateAll()"]'));
    SF.sleep(2);
    SF.click(By.xpath('//button[@ng-click="updateAll()"]'));
    MF.WaitWhileBusySymbol();
    MF.WaitWhileToaster();
    LF.SetClientPasswd(V.clientMS.passwd);
    MF.EditRequest_OpenRequest();
    MF.EditRequest_SwitchCalculator();
    MF.EditRequest_SaveChanges();
    V.boardNumbersMSto = {};
    LF.RememberDigitsRequestBoard(V.boardNumbersMSto);
    MF.EditRequest_CloseEditRequest();
    MF.Board_RefreshDashboard();
    MF.Board_OpenRequest(V.boardNumbersMSto.Id + 1);
    MF.EditRequest_SwitchCalculator();
    MF.EditRequest_SaveChanges();
    V.boardNumbersMSfrom = {};
    LF.RememberDigitsRequestBoard(V.boardNumbersMSfrom);
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
    MF.Account_SendAdressFromModalWindow();
    MF.Account_SendAdressToModalWindow();
    SF.sleep(10); // долго обновляется смена мув сайза на акке
    Debug.pause();
    MF.Account_ClickUpdateClientInModalWindow();
    MF.SweetConfirm();
    MF.SweetConfirm();
    SF.sleep(20); // долго обновляется смена мув сайза на акке
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
    SF.sleep(20);
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

condition.nowWeDoing = 'заходим в аккаунт для мувинг стораджа первого который ТУ';
    LF.LoginToAccountAsClient(V.clientMS);
    MF.Account_OpenRequest(V.boardNumbersMSto.Id);
    MF.Account_ClickViewRequest();
    V.accountNumbersMSto = {};
    LF.RememberAccountNumbers (V.accountNumbersMSto);

condition.nowWeDoing = 'первое сравнение мувинг стораджа ТУ просто нечего не меняя в акке ';
    LF.Validation_Compare_Account_Admin (V.boardNumbersMSto, V.accountNumbersMSto);

condition.nowWeDoing = 'мувинг сторадж ТУ - меняем мув сайз и после него сравним второй раз, если упадет то бага, потому как кальк выключен и не должно ничено не пересчитываться';
    MF.Account_OpenEditModal ();
    SF.select(By.xpath('//select[@field="request.move_size"]'), 9);
    MF.Account_SendAdressFromModalWindow();
    SF.sleep(10); // долго обновляется смена мув сайза на акке
    MF.Account_ClickUpdateClientInModalWindow();
    MF.SweetConfirm();
    MF.SweetConfirm();
    SF.sleep(20); // долго обновляется смена мув сайза на акке
    V.accountNumbersMStoChangeMoveSize = {};
    LF.RememberAccountNumbers (V.accountNumbersMStoChangeMoveSize);
    LF.Validation_Compare_Account_Admin (V.boardNumbersMSto, V.accountNumbersMStoChangeMoveSize);

condition.nowWeDoing= 'мувинг сторадж ТУ - меняем зип код и опять сверяем если упадет то бага, потому как кальк выключен и не должно ничено не пересчитываться';
    MF.Account_OpenEditModal ();
    SF.clear(By.xpath('//input[@ng-value="request.field_moving_from.postal_code"]'));
    SF.send(By.xpath('//input[@ng-value="request.field_moving_from.postal_code"]'), '01001');
    SF.sleep(10);
    MF.Account_ClickUpdateClientInModalWindow();
    MF.SweetConfirm();
    MF.SweetConfirm();
    SF.sleep(20);
    V.accountNumbersMStoChangeMoveSizeChangeZip = {};
    LF.RememberAccountNumbers (V.accountNumbersMStoChangeMoveSizeChangeZip);
    LF.Validation_Compare_Account_Admin (V.boardNumbersMSto, V.accountNumbersMStoChangeMoveSizeChangeZip);

condition.nowWeDoing= 'мувинг сторадж ТУ - меняем details и опять сверяем если упадет то бага, потому как кальк выключен и не должно ничено не пересчитываться';
    MF.Account_ClickDetails ();
    MF.AccountFR_SeelectOptions();
    MF.Account_WaitForDetailsCheck();
    V.accountNumbersMStoChangeMoveSizeChangeZipChangeDetails = {};
    LF.RememberAccountNumbers (V.accountNumbersMStoChangeMoveSizeChangeZipChangeDetails);
    LF.Validation_Compare_Account_Admin (V.boardNumbersMSto, V.accountNumbersMStoChangeMoveSizeChangeZipChangeDetails);

condition.nowWeDoing= 'мувинг сторадж ТУ - добавляем инветорий и опять сверяем если упадет то бага, потому как кальк выключен и не должно ничено не пересчитываться';
    LF.AccountLocalAddInventoryWhenCalcOff ();
    SF.sleep(3);
    V.accountNumbersMStoChangeMoveSizeChangeZipChangeDetailsAddInventory = {};
    LF.RememberAccountNumbers (V.accountNumbersMStoChangeMoveSizeChangeZipChangeDetailsAddInventory);
    LF.Validation_Compare_Account_Admin (V.boardNumbersMSto, V.accountNumbersMStoChangeMoveSizeChangeZipChangeDetailsAddInventory);

condition.nowWeDoing = 'переходим на фром сторадж';
    MF.Account_ClickFromStorage();

condition.nowWeDoing = 'заходим в аккаунт для мувинг стораджа второго который фром';
    V.accountNumbersMSfrom = {};
    LF.RememberAccountNumbers (V.accountNumbersMSfrom);

condition.nowWeDoing = 'первое сравнение мувинг стораджа From просто нечего не меняя в акке ';
    LF.Validation_Compare_Account_Admin (V.boardNumbersMSfrom, V.accountNumbersMSfrom);

condition.nowWeDoing = 'мувинг сторадж from - меняем мув сайз и после него сравним, если упадет то бага, потому как кальк выключен и не должно ничено не пересчитываться';
    MF.Account_OpenEditModal ();
    SF.select(By.xpath('//select[@field="request.move_size"]'), 9);
    MF.Account_SendAdressToModalWindow();
    SF.sleep(10); // долго обновляется смена мув сайза на акке
    MF.Account_ClickUpdateClientInModalWindow();
    MF.SweetConfirm();
    MF.SweetConfirm();
    SF.sleep(20); // долго обновляется смена мув сайза на акке
    V.accountNumbersMSfromChangeMoveSize = {};
    LF.RememberAccountNumbers (V.accountNumbersMSfromChangeMoveSize);
    LF.Validation_Compare_Account_Admin (V.boardNumbersMSfrom, V.accountNumbersMSfromChangeMoveSize);

condition.nowWeDoing= 'мувинг сторадж from - меняем зип код и опять сверяем если упадет то бага, потому как кальк выключен и не должно ничено не пересчитываться';
    MF.Account_OpenEditModal ();
    SF.clear(By.xpath('//input[@ng-value="request.field_moving_to.postal_code"]'));
    SF.send(By.xpath('//input[@ng-value="request.field_moving_to.postal_code"]'), '01001');
    SF.sleep(10);
    MF.Account_ClickUpdateClientInModalWindow();
    MF.SweetConfirm();
    MF.SweetConfirm();
    SF.sleep(20);
    V.accountNumbersMSfromChangeMoveSizeChangeZip = {};
    LF.RememberAccountNumbers (V.accountNumbersMSfromChangeMoveSizeChangeZip);
    LF.Validation_Compare_Account_Admin (V.boardNumbersMSfrom, V.accountNumbersMSfromChangeMoveSizeChangeZip);

condition.nowWeDoing= 'мувинг сторадж from - меняем details и опять сверяем если упадет то бага, потому как кальк выключен и не должно ничено не пересчитываться';
    MF.Account_ClickDetails ();
    MF.AccountFR_SeelectOptions();
    MF.Account_WaitForDetailsCheck();
    V.accountNumbersMSfromChangeMoveSizeChangeZipChangeDetails = {};
    LF.RememberAccountNumbers (V.accountNumbersMSfromChangeMoveSizeChangeZipChangeDetails);
    LF.Validation_Compare_Account_Admin (V.boardNumbersMSfrom, V.accountNumbersMSfromChangeMoveSizeChangeZipChangeDetails);

condition.nowWeDoing= 'мувинг сторадж from - добавляем инветорий и опять сверяем если упадет то бага, потому как кальк выключен и не должно ничено не пересчитываться';
    LF.AccountLocalAddAdditionalInventoryWhenCalcOff ();
    SF.sleep(3);
    V.accountNumbersMSfromChangeMoveSizeChangeZipChangeDetailsAddInventory = {};
    LF.RememberAccountNumbers (V.accountNumbersMSfromChangeMoveSizeChangeZipChangeDetailsAddInventory);
    LF.Validation_Compare_Account_Admin (V.boardNumbersMSfrom, V.accountNumbersMSfromChangeMoveSizeChangeZipChangeDetailsAddInventory);
    SF.sleep(1);

    //=========================закончили писать тест=============================
    SF.endOfTest();
};
