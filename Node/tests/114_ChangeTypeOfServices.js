module.exports = function main(SF, JS, MF, LF, JSstep, VD, V, By, until,FileDetector, system, condition, config,constants){
    global.fiber = Fiber.current;
    V.client = {};
    V.client.name = SF.randomBukva(6) + '_t';
    V.client.fam = SF.randomBukva(6) + '_t';
    V.client.phone = SF.randomCifra(10);
    V.client.email = SF.randomBukvaSmall(6) + '@' + SF.randomBukvaSmall(4) + '.tes';
    V.client.passwd = 123;

    SF.get(V.frontURL);

condition.nowWeDoing = 'создаем лоадинг хелп с аккаунта';
    LF.FullSmallCalcAsLoading(V.client);
    MF.Account_ClickViewRequest();
    MF.Account_ClickPartialPacking();
    LF.AccountLoadingEnterAddress();
    LF.AccountLocalAddInventory();
    LF.AccountLoadingDetails();
    MF.Account_WaitForInventoryCheck();
    MF.Account_WaitForDetailsCheck();
    V.accountNumbers={};
    LF.RememberAccountNumbers(V.accountNumbers);
    LF.LogoutFromAccount();

condition.nowWeDoing = 'идем в админку,сравниваем данные, и меняем сервис тип на мувинг,меняем 2 зип кода, ставим в нот конферм';
    SF.get(V.adminURL);
    LF.LoginToBoardAsCustom(V.adminLogin,V.adminPassword);
    MF.Board_OpenRequest(V.accountNumbers.Id);
    V.boardNumbers = {};
    LF.RememberDigitsRequestBoard(V.boardNumbers);
    LF.Validation_Compare_Account_Admin(V.accountNumbers, V.boardNumbers);
    JS.step(JSstep.selectTruck((V.boardNumbers.LaborTimeMax + V.boardNumbers.TravelTime)/60));
    MF.WaitWhileBusy();
    SF.click(By.xpath('//select[@id="edit-service"]/option[@value="1"]'));
    SF.click(By.xpath('//input[@ng-model="request.field_moving_to.postal_code"]'));
    driver.findElement(By.xpath('//input[@ng-model="request.field_moving_to.postal_code"]')).sendKeys(Key.chord((Key.CONTROL + 'a')));
    SF.send(By.xpath('//input[@ng-model="request.field_moving_to.postal_code"]'), "02222");
    SF.click(By.xpath('//input[@ng-model="request.field_moving_from.postal_code"]'));
    driver.findElement(By.xpath('//input[@ng-model="request.field_moving_from.postal_code"]')).sendKeys(Key.chord((Key.CONTROL + 'a')));
    SF.send(By.xpath('//input[@ng-model="request.field_moving_from.postal_code"]'), "01101");
    MF.EditRequest_SetAdressToFrom ();
    MF.WaitWhileBusy();
    MF.EditRequest_SetToNotConfirmed();
    MF.EditRequest_SaveChanges();
    V.boardNumbersAfterChangeToMoving = {};
    LF.RememberDigitsRequestBoard(V.boardNumbersAfterChangeToMoving);
    MF.EditRequest_OpenLogs();
    MF.EditRequest_Check1EmailExist(V.client.email, "Request Local Quote (Not Confirmed Status)");
    MF.EditRequest_OpenClient();
    LF.SetClientPasswd(V.client.passwd);
    LF.closeEditRequest();
    MF.Board_LogoutAdmin();

condition.nowWeDoing = 'второй раз в аккаунте,  меняю зип и сервис тип на овернаит,';
    SF.get(V.accountURL);
    LF.LoginToAccountAsClient(V.client);
    MF.Account_CheckRequestStatus_NotConfirmed(V.accountNumbers.Id);
    MF.Account_OpenRequest(V.accountNumbers.Id);
    V.accountNumbersChangeToMoving={};
    LF.RememberAccountNumbers(V.accountNumbersChangeToMoving);
    LF.Validation_Compare_Account_Admin(V.accountNumbersChangeToMoving, V.boardNumbersAfterChangeToMoving);
    SF.sleep(1);
    SF.click(By.xpath('//div[@ng-click="openEditModal()"]'));
    SF.click(By.xpath('//select[@class="form-select form-control"]/option[@value="6"]'));
    SF.click(By.xpath('//input[@id="edit-moving-from-zip"]'));
    SF.clear(By.xpath('//input[@id="edit-moving-from-zip"]'));
    SF.send(By.xpath('//input[@id="edit-moving-from-zip"]'),'02134');
    MF.Account_ClickUpdateClientInModalWindow();
    MF.Account_SweetUpdateConfirm();
    MF.WaitWhileBusy();
    SF.waitForLocated(By.xpath('//a[@ng-click="vm.goToRequest(vm.request.storage_id)"]'));
    SF.sleep(7);
    V.accountNumbersChangeToOvernightFirst={};
    LF.RememberAccountNumbers(V.accountNumbersChangeToOvernightFirst);
    MF.Account_ClickFromStorage ();
    V.accountNumbersChangeToOvernightSecond = {};
    LF.RememberAccountNumbers(V.accountNumbersChangeToOvernightSecond);
    driver.wait(driver.findElement(By.xpath('//div[@id="move-size-block-account"]//span[@class="tip"]')).getText().then(function(text){
        V.accountNumbersChangeToOvernightSecondcbf = SF.cleanPrice(text);
        VD.IWant(VD.ToEqual, V.accountNumbersChangeToOvernightFirst.cbf,V.accountNumbersChangeToOvernightSecondcbf, 'не совпал c.f.овернаита 1го и 2го реквеста');
    }),config.timeout);
    LF.LogoutFromAccount ();

condition.nowWeDoing = 'иду в админку 2 реквеста овернаит, и там сравниваю все с аккаунтом, реквесты должны быть табе пендинг';
    SF.get (V.adminURL);
    LF.LoginToBoardAsCustom(V.adminLogin,V.adminPassword);
    MF.Board_OpenRequest(V.accountNumbersChangeToOvernightSecond.Id);
    V.boardNumbersSecondOvernight = {};
    LF.RememberDigitsRequestBoard(V.boardNumbersSecondOvernight);
    LF.Validation_Compare_Account_Admin(V.accountNumbersChangeToOvernightSecond,V.boardNumbersSecondOvernight);
    LF.closeEditRequest ();

condition.nowWeDoing = 'иду в админку 1 реквеста овернаит, и  сравниваю все с аккаунтом';
    MF.Board_OpenRequest(V.accountNumbersChangeToOvernightFirst.Id);
    V.boardNumbersFirstOvernight = {};
    LF.RememberDigitsRequestBoard(V.boardNumbersFirstOvernight);
    SF.sleep(1);
    LF.Validation_Compare_Account_Admin(V.accountNumbersChangeToOvernightFirst,V.boardNumbersFirstOvernight);
    SF.sleep(1);
    SF.endOfTest();
};


