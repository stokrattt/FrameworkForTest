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
    V.accountNumbers={};
    LF.AccountLocalAddInventory();
    MF.Account_WaitForInventoryCheck();
    LF.RememberAccountNumbers(V.accountNumbers);
    SF.sleep(1);
    LF.LogoutFromAccount();
SF.sleep(2);
condition.nowWeDoing = 'первый раз в админке';
    SF.get(V.adminURL);
    LF.LoginToBoardAsCustom(V.adminLogin,V.adminPassword);
    MF.Board_OpenRequest(V.accountNumbers.Id);

condition.nowWeDoing = 'добавляем valuation';
    SF.click(By.xpath('//label[@ng-click="openValuationModal()"]'));
    SF.waitForLocated (By.xpath('//div[@class="valuation__modal"]'));
    SF.sleep(1);
    SF.click(By.xpath('//div[@ng-click="setValuationType(valuationTypes.FULL_VALUE)"]'));
    SF.click(By.xpath('//input[@ng-model="valuation.selected.liability_amount"]'));
    SF.send(By.xpath('//input[@ng-model="valuation.selected.liability_amount"]'), 10570);
    SF.click(By.xpath('//table[@class="valuation-modal__info-table"]/tbody[2]/tr[2]/td[3]'));
    SF.click (By.xpath('//button[@ng-click="clickSave()"]'));
    MF.SweetConfirm ();
    MF.WaitWhileBusy ();
    MF.EditRequest_SetToNotConfirmed();
    MF.EditRequest_SetAdressToFrom();
    SF.sleep(4);
    V.boardNumbers={};
    LF.RememberDigitsRequestBoard(V.boardNumbers);
    driver.wait(driver.executeScript('return $(\'div.ValuationCost:visible\').text()').then(function (text) {
        V.Valuation = SF.cleanPrice(text.substring(text.indexOf('$')));
    }),config.timeout);
    JS.step(JSstep.selectTruck((V.boardNumbers.LaborTimeMax + V.boardNumbers.TravelTime) / 60));
    MF.WaitWhileBusy();
    MF.EditRequest_SaveChanges();
    MF.EditRequest_OpenClient();
    LF.SetClientPasswd(V.client.passwd);
    LF.closeEditRequest();
    MF.Board_LogoutAdmin();

condition.nowWeDoing = 'второй раз в аккаунте сверяем валюатион и букаем работу и проверяем что валюатион есть на конфирмейшине';
    SF.get(V.accountURL);
    LF.LoginToAccountAsClient(V.client);
    MF.Account_CheckRequestStatus_NotConfirmed(V.accountNumbers.Id);
    MF.Account_OpenRequest(V.accountNumbers.Id);
    LF.RememberAccountNumbers(V.accountNumbers);
    driver.wait(driver.findElement(By.xpath('//div[@ng-if="request.request_all_data.valuation.selected.valuation_type == valuationTypes.FULL_VALUE"]/div[2]')).getText().then(function (text) {
        text = SF.cleanPrice (text);
        VD.IWant (VD.ToEqual, text, 10570, 'не совпал full valuation с тем что выставили на админке в реквесте');
    }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//div[@ng-show="request.request_all_data.valuation.selected.valuation_charge"]/following-sibling::div')).getText().then(function (text) {
        text = SF.cleanPrice (text);
        VD.IWant (VD.ToEqual, text, V.Valuation, 'не совпал valuation charge с тем что на админке в реквесте');
    }),config.timeout);
    LF.Validation_Compare_Account_Admin (V.boardNumbers, V.accountNumbers);
    MF.Account_ClickProceedBookYourMove();

condition.nowWeDoing = 'перешли на конфирмейшн пейдж и сравним данные с бордом и проверяем валюейшн и квоту и фуел';
    V.ConfirmationPage = {};
    driver.wait(driver.findElement(By.xpath('//h2[contains(text(), "Estimated Quote")]/following-sibling::div[1]/div/div')).getText().then(function (text) {
        if (text.indexOf('$', text.indexOf('$') + 3) !== -1) {
            V.ConfirmationPage.TotalMin = SF.cleanPrice(text.substring(text.indexOf('$'), text.indexOf('-')));
            V.ConfirmationPage.TotalMax = SF.cleanPrice(text.substring(text.indexOf('$', text.indexOf('$') + 3)));
        } else {
            V.ConfirmationPage.Total = SF.cleanPrice(text);
        }
    }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//h2[contains(text(),"Fuel Surcharge")]/..')).getText().then(function(text){
        V.ConfirmationPage.Fuel = SF.cleanPrice(text.substring(text.indexOf('$')));
    }),config.timeout);
    SF.sleep(1);
    VD.IWant(VD.ToEqual, V.ConfirmationPage.TotalMin, V.boardNumbers.TotalMin, 'не совпали TotalMin в конфирмейшн пейдж и борда до резервации');
    VD.IWant(VD.ToEqual, V.ConfirmationPage.TotalMax, V.boardNumbers.TotalMax, 'не совпали TotalMax в конфирмейшн пейдж и борда до резервации');
    VD.IWant(VD.ToEqual, V.ConfirmationPage.Fuel, V.boardNumbers.Fuel, 'не совпали Fuel в конфирмейшн пейдж и борда до резервации');
    driver.wait(driver.findElement(By.xpath('//h2[contains(text(), "Full Value Protection Amount of Liability:")]/span')).getText().then(function (text) {
        VD.IWant(VD.ToEqual, SF.cleanPrice(text), 10570, 'не совпал full valuation на конфирмейшн с тем что выставили на админке в реквесте');
    }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//h2[contains(text(), "Valuation charge")]/span')).getText().then(function (text) {
        VD.IWant(VD.ToEqual, SF.cleanPrice(text), V.Valuation, 'не совпал valuation charge на конфирмейшине с тем что на админке в реквесте');
    }),config.timeout);
    MF.Account_ConfirmationBackToRequest();
    LF.ConfirmRequestInAccount_WithReservation();



    //=========================закончили писать тест=============================
    SF.endOfTest();
};