module.exports = function main(SF, JS, MF, LF, JSstep, VD, V, By, until,FileDetector, system, condition, config, constants) {
    global.fiber = Fiber.current;
    V.client = {};
    V.client.name = SF.randomBukva(6) + '_t';
    V.client.fam = SF.randomBukva(6) + '_t';
    V.client.phone = SF.randomCifra(10);
    V.client.email = SF.randomBukvaSmall(6) + '@' + SF.randomBukvaSmall(4) + '.tes';
    V.client.passwd = 123;
    V.manager = {};
    V.manager.name =' manager' ;
    V.manager.passwd = '123';



    condition.nowWeDoing = 'создаем флет-рейт, c фронтовой нижней формы';
    SF.get(V.frontURL);
    LF.CreateFlatRateDownForm(V.client);
    MF.Account_ClickViewRequest();
    LF.AccountFlatRate_ChoosePickupAndDeliveryDate();
    SF.click(By.xpath('//div[contains(@class, "ng-pristine")]'));
    LF.AccountFR_SeelectOptions();

    condition.nowWeDoing = 'добавляем инвенторий в акке';
    LF.AccountFlatRateAddInventory();
    SF.sleep(1);
    MF.WaitWhileBusy();
    driver.wait(driver.findElement(By.xpath('//span[@ng-if="vm.request.field_useweighttype.value == \'2\' && vm.request.inventory_weight.cfs"]')).getText().then(function(text) {
        V.CBFinAccount = SF.cleanPrice(text);
    }),config.timeout);
    MF.Account_SubmitFlatRateAfterAddInventory ();
    JS.scroll ('a[ng-click=\\"vm.Logout()\\"]');
    driver.wait(driver.findElement(By.xpath('//div[contains(text(),"Request ID")]/span')).getText().then(function (text) {
        V.FRId = SF.cleanPrice(text);
    }),config.timeout);
    SF.sleep(10);
    LF.LogoutFromAccount ();
    SF.get(V.adminURL);

    condition.nowWeDoing = 'идем на админку,заполняем опции,запоминаем резервацию, ставим вручную рейт, выбираем трак,ставим нот конферм';
    SF.get(V.adminURL);
    LF.LoginToBoardAsCustom(V.manager.name,V.manager.passwd);
    LF.OpenRequestFlatRate(V.FRId);
    LF.FlatRateEditRequest_AddTwoOption();
    MF.EditRequest_OpenClient();
    LF.SetClientPasswd(V.client.passwd);
    MF.EditRequest_OpenRequest();
    driver.wait(driver.findElement(By.xpath('//input[@ng-change="changeReservationManually();"]')).getText().then(function (text) {
        V.ReservationinBoard = SF.cleanPrice(text);
    }),config.timeout);
    MF.WaitWhileBusy();
    V.boardNumbers= {};
    LF.RememberDigitsRequestBoard(V.boardNumbers);
    MF.EditRequest_CloseEditRequest();
    MF.Board_LogoutAdmin();

    condition.nowWeDoing = 'переходим на аккаунт, сравниваем числа, выбираем опцию';
    SF.get(V.accountURL);
    LF.LoginToAccountAsClient(V.client);
    MF.Account_OpenRequest(V.boardNumbers.Id);
    MF.Account_ChooseOptionFlatRate();
    V.accountNumbersFlatRate = {};
    LF.(V.accountNumbersFlatRate);
    LF.Validation_Compare_Account_Admin(V.accountNumbersFlatRate, V.boardNumbers);
    LF.LogoutFromAccount ();
    SF.get(V.adminURL);

    condition.nowWeDoing = 'пошли в админку 2 раз, ставить трак, нот конферм';
    LF.LoginToBoardAsCustom(V.adminLogin,V.adminPassword);
    MF.Board_OpenRequest (V.FRId);
    V.boardNumbers = {};
    LF.RememberDigitsRequestBoard (V.boardNumbers);
    LF.FlatRateEditRequest_SendDeliveryDates();
    JS.step(JSstep.selectTruck((V.boardNumbers.LaborTimeMax + V.boardNumbers.TravelTime)/60));
    MF.WaitWhileBusy();
    VD.IWant (VD.ToEqual, 4500, V.boardNumbers.Total, 'тотал не совпал с выбранной суммой');
    MF.EditRequest_SetToNotConfirmed ();
    SF.click (By.xpath('//button[@ng-click="DeliveryDay()"]'));
    MF.WaitWhileBusy();
    MF.EditRequest_SaveChanges();






};