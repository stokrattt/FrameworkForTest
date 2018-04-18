module.exports = function main(SF, JS, MF, LF, JSstep, VD, V, By, until,FileDetector, system, condition, config,constants) {
    global.fiber = Fiber.current;
    V.client = {};
    V.client.name = SF.randomBukva(6) + '_t';
    V.client.fam = SF.randomBukva(6) + '_t';
    V.client.phone = SF.randomCifra(10);
    V.client.email = SF.randomBukvaSmall(6) + '@' + SF.randomBukvaSmall(4) + '.tes';
    V.client.passwd = 123;

    //=========================начинаем писать тест=============================
condition.nowWeDoing = 'Создаем реквест с борда. Выставляем зип, адреса, назначаем трак и добавляем partial packing';
    SF.get(V.adminURL);
    LF.LoginToBoardAsCustom(V.adminLogin,V.adminPassword);
    LF.CreateLocalMovingFromBoard(V.client);
    MF.EditRequest_OpenClient();
    LF.SetClientPasswd(V.client.passwd);
    MF.EditRequest_OpenRequest();
    MF.EditRequest_SetAdressFrom();
    MF.EditRequest_SetAdressTo();
    MF.EditRequest_SetZipCodeFrom('02222');
    LF.EditRequest_AddPartialPacking();
    V.boardNumbers = {};
    LF.RememberDigitsRequestBoard (V.boardNumbers);
    JS.step(JSstep.selectTruck((V.boardNumbers.LaborTimeMax + V.boardNumbers.TravelTime)/60));
    MF.WaitWhileBusy();
condition.nowWeDoing = 'Меняем статус реквеста на Confirmed, меняем мув зайз, переводим реквест в closing и проверяем, чтобы partial packing не были перенесен в closing';

    MF.EditRequest_SetToConfirmed();
    MF.EditRequest_SetSizeOfMoveNumber(8);
    V.boardNumbers2 = {};
    LF.RememberDigitsRequestBoard_Down (V.boardNumbers2);
    MF.EditRequest_CloseConfirmWork();
    SF.click(By.xpath('//button[@ng-click="update(request)"]'));
    MF.WaitWhileBusy();
    MF.EditRequest_WaitForBalanceVisible();
    V.boardNumbersClosing = {};
    LF.RememberDigitsRequestBoard_Down (V.boardNumbersClosing);
    VD.IWant(VD.ToEqual, V.boardNumbersClosing.Packing, 0, 'Partial packing был перенесен в табу closing после изменения мув сайза в зелёном реквесте');

condition.nowWeDoing = 'Открываем контракт и проверяем, чтобы partial packing не отображался на bill of lading';
    MF.EditRequest_OpenContractCloseJob();
    SF.openTab(1);
    MF.SweetConfirm();
    MF.Contract_OpenBillOfLading();
    MF.Contract_WaitBillOfLading();
    driver.wait(driver.findElement(By.xpath('//tbody[@ng-if="requestReady"]/tr[11]/td[2]')).getText().then(function (text) {
        text = SF.cleanPrice(text.substring(text.indexOf('$')));
        VD.IWant(VD.ToEqual, text,V.boardNumbersClosing.Packing, 'Partial packing был добавлен и включён в сумму контракта на bill of lading');
    }),config.timeout);
    SF.openTab(0);
    MF.EditRequest_WaitForBalanceVisible();
    MF.EditRequest_CloseEditRequest();
    MF.Board_LogoutAdmin ();
    
condition.nowWeDoing = 'Идём клиентом на аккаунт, открываем confirmation page и проверяем, чтобы partial packing отображался на странице.';
    SF.get(V.accountURL);
    LF.LoginToAccountAsClient (V.client, V.client.passwd);
    MF.Account_OpenRequest(V.boardNumbers.Id);
    MF.Account_ClickViewRequest();
    MF.Account_ClickViewConfirmationPage();
    driver.wait(driver.findElement(By.xpath('//div[@ng-repeat="packing in vm.packings"]/div[5]')).getText().then(function (text) {
        text = SF.cleanPrice(text.substring(text.indexOf('$')));
        VD.IWant(VD.ToEqual, text,V.boardNumbers2.Packing, 'Не отображается partial packing на confirmation page');
    }),config.timeout);
    SF.sleep(1);
    SF.endOfTest();
};