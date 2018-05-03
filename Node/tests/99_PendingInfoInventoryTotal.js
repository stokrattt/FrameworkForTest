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

condition.nowWeDoing = 'создаем локал мув с борда и ставим ему нот конферм';
    LF.LoginToBoardAsCustom(V.adminLogin,V.adminPassword);
    LF.CreateLocalMovingFromBoard(V.client);
    MF.EditRequest_OpenClient();
    LF.SetClientPasswd(V.client.passwd);
    MF.EditRequest_OpenRequest();
    V.boardNumbers = {};
    LF.RememberDigitsRequestBoard(V.boardNumbers);
    JS.step(JSstep.selectTruck((V.boardNumbers.LaborTimeMax + V.boardNumbers.TravelTime)/60));
    MF.WaitWhileBusy();
    MF.EditRequest_SetToNotConfirmed();
	driver.wait(driver.findElement(By.xpath('//span[@ng-if="!states.invoiceState"]')).getText().then(function(text){
		V.CBFinAdmin = SF.cleanPrice(text);
	}),config.timeout);
    MF.EditRequest_SaveChanges();
    LF.closeEditRequest();
    MF.Board_LogoutAdmin();

condition.nowWeDoing = 'идем в аккаунт добавлять инвентори и после этого запомнить все суммы';
    SF.get(V.accountURL);
    LF.LoginToAccountAsClient (V.client);
    MF.Account_CheckRequestStatus_NotConfirmed(V.boardNumbers.Id);
    MF.Account_OpenRequest(V.boardNumbers.Id);
    MF.Account_ClickViewRequest();
    MF.Account_ClickPartialPacking();
    MF.SweetConfirm();
    LF.AccountLocalAddInventory();
    LF.AccountLocalAddAdditionalInventory();
    MF.Account_WaitForInventoryCheck();
	driver.wait(driver.findElement(By.xpath('//span[@ng-if="vm.request.field_useweighttype.value == \'2\' && vm.request.inventory_weight.cfs"]')).getText().then(function(text){
		V.CBFinAccount = SF.cleanPrice(text);
		VD.IWant(VD.NotToEqual, V.CBFinAccount ,V.CBFinAdmin,'не обновился вес после добавления инвентория во второй раз.( значит бага)');
	}),config.timeout);
    V.accountNumbers={};
    LF.RememberAccountNumbers(V.accountNumbers);
    LF.LogoutFromAccount();

condition.nowWeDoing = 'пошли в админку и проверили, что реквест стал пендинг инфо и что суммы все сходятся с аккаунтом';
    SF.get(V.adminURL);
    LF.LoginToBoardAsCustom(V.adminLogin,V.adminPassword);
    MF.Board_OpenRequest(V.boardNumbers.Id);
    V.boardNumbers = {};
    LF.RememberDigitsRequestBoard(V.boardNumbers);
    LF.Validation_Compare_Account_Admin(V.accountNumbers, V.boardNumbers);
	JS.scroll('div[ng-show="!request.isInventory"]');
	driver.wait(driver.findElement(By.xpath('//div[@ng-show="!request.isInventory"]')).getText().then(function(text) {
		V.CBFinAdmin2 = SF.cleanPrice(text);
		console.log(V.CBFinAdmin2);
		VD.IWant(VD.ToEqual, V.CBFinAccount ,V.CBFinAdmin2,'не совпал вес после добавления инвентаря в аккаунте и реквесте на мувборде');
	}),config.timeout);
    SF.sleep(1);

    //=========================закончили писать тест=============================
    SF.endOfTest();
};
