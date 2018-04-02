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

condition.nowWeDoing = 'создаём реквест localMoving';
	V.boardNumbers={HourlyRate:120};
	LF.CreateLocalMovingFromBoard(V.client);
	LF.RememberDigitsRequestBoard(V.boardNumbers);
	JS.step(JSstep.selectTruck((V.boardNumbers.LaborTimeMax + V.boardNumbers.TravelTime)/60));
    MF.WaitWhileBusy();
	MF.EditRequest_SetToConfirmed();
	MF.EditRequest_SetAdressToFrom();
	MF.EditRequest_SaveChanges();
	MF.EditRequest_CloseEditRequest();
	MF.Board_OpenSettingsRates();
	V.targets=[];
	driver.wait(driver.executeScript(JSstep.findAllDetermPrices(V.boardNumbers.HourlyRate)).then(function(array) {
		V.targets=array;
	}),config.timeout);
	SF.sleep(1);
	for (var t in V.targets) {
		SF.clear(By.xpath('(//input[@ng-change="vm.saveRates()"])['+(V.targets[t]+1)+']'));
		SF.send(By.xpath('(//input[@ng-change="vm.saveRates()"])['+(V.targets[t]+1)+']'),245);
	}
	SF.sleep(5);
	MF.Board_OpenDashboard();
	MF.Board_OpenConfirmed();
	MF.Board_OpenRequest(V.boardNumbers.Id);
	V.boardNumbers2={};
	LF.RememberDigitsRequestBoard(V.boardNumbers2);
	VD.IWant(VD.ToEqual, V.boardNumbers.HourlyRate, V.boardNumbers2.HourlyRate, 'Изменился rate');
	MF.EditRequest_CloseEditRequest();
	MF.Board_OpenSettingsRates();
	V.targets2=[];
	driver.wait(driver.executeScript(JSstep.findAllDetermPrices(245)).then(function(array) {
		V.targets2=array;
	}),config.timeout);
	SF.sleep(1);
	VD.IWant(VD.NotToEqual, V.targets2.length, 0, 'какая-то фигня с соххранением настроек Rates');
	for (var t in V.targets) {
		SF.sleep(1.5);
		SF.clear(By.xpath('(//input[@ng-change="vm.saveRates()"])['+(V.targets[t]+1)+']'));
		SF.sleep(0.5);
		SF.send(By.xpath('(//input[@ng-change="vm.saveRates()"])['+(V.targets[t]+1)+']'),V.boardNumbers.HourlyRate);
        SF.sleep(1.5);

    }
	SF.sleep(4);
    MF.Board_OpenDashboard();

    //=========================закончили писать тест=============================
    SF.endOfTest();
};
