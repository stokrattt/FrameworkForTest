module.exports = function main(SF, JS, MF, LF, JSstep, VD, V, By, until,FileDetector, system, condition, config,constants) {    global.fiber = Fiber.current;

    //=========================начинаем писать тест=============================
    V.clientWithRes = {};
    V.clientWithRes.name = SF.randomBukva(6) + '_t';
    V.clientWithRes.fam = SF.randomBukva(6) + '_t';
    V.clientWithRes.phone = SF.randomCifra(10);
    V.clientWithRes.email = SF.randomBukvaSmall(6) + '@' + SF.randomBukvaSmall(4) + '.tes';
    V.clientWithRes.passwd = 123;

    condition.nowWeDoing='заполняем верхнюю форму как UnloadingHelp';
    SF.get(V.frontURL);
    LF.FullSmallCalcAsUnloading(V.clientWithRes);
    condition.nowWeDoing='зашли первый раз в аккаунт';
    MF.Account_ClickViewRequest();
    LF.AccountUnloadingEnterAddress();
    V.accountNumbersWithRes={};
    LF.RememberAccountNumbers(V.accountNumbersWithRes);
    LF.addToCleanerJob(V.accountNumbersWithRes.Id);
    LF.LogoutFromAccount();

    condition.nowWeDoing = 'первый раз в админке, ищем первый реквест';
    SF.get(V.adminURL);
    LF.LoginToBoardAsCustom(V.adminLogin,V.adminPassword);
    MF.Board_OpenRequest(V.accountNumbersWithRes.Id);
    V.boardNumbersWithRes = {};
    LF.RememberDigitsRequestBoard(V.boardNumbersWithRes);
    JS.step(JSstep.selectTruck((V.boardNumbersWithRes.LaborTimeMax + V.boardNumbersWithRes.TravelTime)/60));
    MF.WaitWhileBusy();
    condition.nowWeDoing = 'сравниваем аккаунт и админку с резервацией';
    LF.Validation_Compare_Account_Admin(V.accountNumbersWithRes,V.boardNumbersWithRes);
    driver.wait(driver.executeScript('return $("input#reserv_price").val()').then(function(text){
        V.boardNumbersWithRes.ReservationPrice = SF.cleanPrice(text);
    }),config.timeout);
    SF.sleep(1);
    VD.IWant(VD.ToEqual,V.boardNumbersWithRes.ReservationPrice, 150,'Резервация не равно 150');
    MF.EditRequest_OpenSettings();
    LF.SetManager('emilia');
    MF.EditRequest_OpenClient();
    LF.SetClientPasswd(V.clientWithRes.passwd);
    MF.EditRequest_OpenRequest();
    MF.EditRequest_SetToNotConfirmed();
    MF.EditRequest_SaveChanges();
    LF.closeEditRequest();

    condition.nowWeDoing = 'лезем в настройки и ставим резервацию 0';
    MF.Board_OpenSettingsSchedule();
    MF.Schedule_SetReservationLocalTo(0);
    MF.Board_LogoutAdmin();

    //================================второй реквест без резервации==================================================

    condition.nowWeDoing = 'создаём с верхнего калькулятора второй реквест, теперь без резервации';
    V.clientNoRes = {};
    V.clientNoRes.name = SF.randomBukva(6) + '_t';
    V.clientNoRes.fam = SF.randomBukva(6) + '_t';
    V.clientNoRes.phone = SF.randomCifra(10);
    V.clientNoRes.email = SF.randomBukvaSmall(6) + '@' + SF.randomBukvaSmall(4) + '.tes';
    V.clientNoRes.passwd = 123;

    SF.get(V.frontURL);
    LF.FullSmallCalcAsUnloading(V.clientNoRes);

    condition.nowWeDoing='зашли первый раз в аккаунт NoRes';
    MF.Account_ClickViewRequest ();
    LF.AccountUnloadingEnterAddress();
    V.accountNumbersNoRes={};
    LF.RememberAccountNumbers(V.accountNumbersNoRes);
    LF.addToCleanerJob(V.accountNumbersNoRes.Id);
    LF.LogoutFromAccount();

    condition.nowWeDoing = 'первый раз в админке, ищем первый реквест NoRes';
    SF.get(V.adminURL);
    LF.LoginToBoardAsCustom(V.adminLogin,V.adminPassword);
    MF.Board_OpenRequest(V.accountNumbersNoRes.Id);
    V.boardNumbersNoRes = {};
    LF.RememberDigitsRequestBoard(V.boardNumbersNoRes);
    JS.step(JSstep.selectTruck((V.boardNumbersNoRes.LaborTimeMax + V.boardNumbersNoRes.TravelTime)/60));
    MF.WaitWhileBusy();
    SF.click(By.xpath('//input[@ng-model="request.reservation_rate.value"]'));
    SF.click(By.xpath('//input[@ng-model="request.field_moving_to.thoroughfare"]'));
    SF.sleep(1);
    condition.nowWeDoing = 'сравниваем аккаунт и админку без резервации';
    LF.Validation_Compare_Account_Admin(V.accountNumbersNoRes,V.boardNumbersNoRes);
    driver.wait(driver.executeScript('return $("input#reserv_price").val()').then(function(text){
        V.boardNumbersNoRes.ReservationPrice = SF.cleanPrice(text);
    }),config.timeout);
    SF.sleep(1);
    VD.IWant(VD.ToEqual,V.boardNumbersNoRes.ReservationPrice, 0,'Резервация не равно 0');
    MF.EditRequest_OpenSettings();
    LF.SetManager('emilia');
    MF.EditRequest_OpenClient();
    LF.SetClientPasswd(V.clientNoRes.passwd);
    MF.EditRequest_OpenRequest();
    MF.EditRequest_SetToNotConfirmed();
    MF.EditRequest_SaveChanges();
    LF.closeEditRequest();

    condition.nowWeDoing = 'лезем в настройки и возвращаем резервацию в 150';
    MF.Board_OpenSettingsSchedule();
    MF.Schedule_SetReservationLocalTo(150);
    MF.Board_LogoutAdmin();

    condition.nowWeDoing = 'заходим в аккаунт под первым клиентом, должны спросить деньгу';
    SF.get(V.accountURL);
    LF.LoginToAccountAsClient(V.clientWithRes);
    MF.Account_CheckRequestStatus_NotConfirmed(V.accountNumbersWithRes.Id);
    MF.Account_OpenRequest(V.accountNumbersWithRes.Id);
    LF.ConfirmRequestInAccount_WithReservation(V.boardNumbersWithRes.ReservationPrice);
    condition.nowWeDoing = 'подтвердили резервацию';
    SF.waitForVisible(By.xpath('//div[contains(text(),"Your move is confirmed and scheduled")]'));
    LF.LogoutFromAccount();

    condition.nowWeDoing = 'заходим в аккаунт под вторый клиентом, не должны просить деньгу';
    SF.get(V.accountURL);
    LF.LoginToAccountAsClient(V.clientNoRes);
    MF.Account_CheckRequestStatus_NotConfirmed(V.accountNumbersNoRes.Id);
    MF.Account_OpenRequest(V.accountNumbersNoRes.Id);
    LF.ConfirmRequestInAccount_NoReservation();
    condition.nowWeDoing = 'подтвердили резервацию';
    SF.waitForVisible(By.xpath('//div[contains(text(),"Your move is confirmed and scheduled")]'));
    LF.LogoutFromAccount();

    //=========================закончили писать тест=============================
    SF.endOfTest();
};
