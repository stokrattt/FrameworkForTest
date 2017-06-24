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
	LF.CreateLocalMovingFromBoard(V.client);
	V.boardNumbers={};
	LF.RememberDigitsRequestBoard(V.boardNumbers);
	JS.step(JSstep.selectTruck((V.boardNumbers.LaborTimeMax + V.boardNumbers.TravelTime)/60));
	MF.EditRequest_SetToConfirmed();
	MF.EditRequest_SetAdressToFrom();
	MF.EditRequest_SaveChanges();
	MF.EditRequest_CloseEditRequest();
	MF.Board_OpenSettingsRates();
	driver.wait(driver.executeScript(JSstep.changeAllDetermPrices(V.boardNumbers.HourlyRate, 999)),config.timeout);
	SF.sleep(1);
	MF.Board_OpenDashboard();
	MF.Board_OpenConfirmed();
	MF.Board_OpenRequest(V.boardNumbers.Id);
	V.boardNumbers2={};
	LF.RememberDigitsRequestBoard(V.boardNumbers2);
	VD.IWant(VD.VToEqual, V.boardNumbers.HourlyRate, V.boardNumbers2.HourlyRate, 'Изменился rate');
	MF.EditRequest_CloseEditRequest();
	MF.Board_OpenSettingsRates();
	driver.wait(driver.executeScript(JSstep.changeAllDetermPrices(999, V.boardNumbers.HourlyRate)),config.timeout);
	SF.sleep(1);
	MF.Board_OpenDashboard();

	//=========================закончили писать тест=============================
    SF.endOfTest();
};
