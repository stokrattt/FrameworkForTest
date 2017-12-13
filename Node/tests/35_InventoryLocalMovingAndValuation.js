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
    V.accountNumbers={};
    LF.AccountLocalAddInventory();
    MF.Account_WaitForInventoryCheck();
    LF.RememberAccountNumbers(V.accountNumbers);
    LF.LogoutFromAccount();

condition.nowWeDoing = 'первый раз в админке';
    SF.get(V.adminURL);
    LF.LoginToBoardAsCustom(V.adminLogin,V.adminPassword);
    SF.sleep (3);
    MF.Board_OpenRequest(V.accountNumbers.Id);

condition.nowWeDoing = 'добавляем valuation';
    SF.click(By.xpath('//label[@ng-click="openValuationModal()"]'));
    SF.waitForLocated (By.xpath('//button[@ng-click="saveValuation()"]'));
    SF.sleep(1);
    SF.click(By.xpath('//input[@id="full-protection"]/..'));
    SF.click(By.xpath('//input[@ng-model="valuation.amount.liability"]'));
    SF.send(By.xpath('//input[@ng-model="valuation.amount.liability"]'), 10570);
    SF.click(By.xpath('//td[@ng-repeat="(key, value) in amoutValuation"][2]/div'));
    SF.click (By.xpath('//button[@ng-click="saveValuation()"]'));
    MF.SweetConfirm ();
    MF.WaitWhileBusy ();
    // VD.IWant(VD.ToEqual, V.accountNumbers.InventoryCbf, V.boardNumbers.cbf,'Не совпали cbf аккаунта и борда');
    // LF.addAdditionalInventoryBoard (V.boardNumbers);
    SF.sleep(4);
    V.boardNumbers={};
    LF.RememberDigitsRequestBoard(V.boardNumbers);
    driver.wait(driver.executeScript('return $(\'div.ValuationCost:visible\').text()').then(function (text) {
        V.Valuation = SF.cleanPrice(text.substring(text.indexOf('$')));
    }),config.timeout);
    MF.EditRequest_OpenClient();
    LF.SetClientPasswd(V.client.passwd);
    // MF.EditRequest_OpenRequest();
    // MF.EditRequest_SaveChanges();
    LF.closeEditRequest();
    SF.sleep(2);
    MF.Board_LogoutAdmin();

condition.nowWeDoing = 'второй раз в аккаунте';
    SF.get(V.accountURL);
    LF.LoginToAccountAsClient(V.client);
    MF.Account_CheckRequestStatus_Pending(V.accountNumbers.Id);
    MF.Account_OpenRequest(V.accountNumbers.Id);
    LF.RememberAccountNumbers(V.accountNumbers);
    driver.wait(driver.findElement(By.xpath('//span[@ng-if="vm.request.request_all_data.valuation.lability_amount"]')).getText().then(function (text) {
        text = SF.cleanPrice (text);
        VD.IWant (VD.ToEqual, text, 10570, 'не совпал full valuation с тем что выставили на админке в реквесте');
    }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//div[contains(text(), "Valuation charge")]/following-sibling::div')).getText().then(function (text) {
        text = SF.cleanPrice (text);
        VD.IWant (VD.ToEqual, text, V.Valuation, 'не совпал valuation charge с тем что на админке в реквесте');
    }),config.timeout);
    VD.IWant(VD.ToEqual, V.accountNumbers.cbf, V.boardNumbers.InventoryCubicFit);
    SF.sleep(2);

    //=========================закончили писать тест=============================
    SF.endOfTest();
};