module.exports = function main(SF, JS, MF, LF, JSstep, VD, V, By, until,FileDetector, system, condition, config,constants) {
    global.fiber = Fiber.current;
	V.client = {};
	V.client.name = SF.randomBukva(6) + '_t';
	V.client.fam = SF.randomBukva(6) + '_t';
	V.client.phone = SF.randomCifra(10);
	V.client.email = SF.randomBukvaSmall(6) + '@' + SF.randomBukvaSmall(4) + '.tes';
	V.client.passwd = 123;
	V.client.zipFrom = "02111";
	V.client.zipTo = "01608";

    //=========================начинаем писать тест=============================
	SF.get(V.adminURL);
	LF.LoginToBoardAsCustom(V.adminLogin,V.adminPassword);
	condition.nowWeDoing = 'создаём реквест localMoving';
	LF.CreateLocalMovingFromBoard(V.client);
	V.boardNumbers={};
	LF.RememberDigitsRequestBoard(V.boardNumbers);
	MF.EditRequest_CloseEditRequest();
	MF.Board_OpenSettingsCalculator();
	MF.CalculatorSettings_OpenTravelTime();
	MF.CalculatorSettings_CustomTrackSpeedTurnOn();
	MF.CalculatorSettings_SetCustomTrackSpeed(1000);
	MF.CalculatorSettings_SetCustomTrackSpeedBorder(10);
	MF.Board_OpenDashboard();
	LF.CreateLocalMovingFromBoard(V.client);
	V.boardNumbers2={};
	LF.RememberDigitsRequestBoard(V.boardNumbers2);
	VD.IWant(VD.ALessB, V.boardNumbers2.TravelTime, V.boardNumbers.TravelTime, 'время как-то глючит');
	MF.EditRequest_CloseEditRequest();
	MF.Board_OpenSettingsCalculator();
	SF.sleep(3);
	MF.CalculatorSettings_OpenTravelTime();
	MF.CalculatorSettings_CustomTrackSpeedTurnOff();
	//=========================закончили писать тест=============================
    SF.endOfTest();
};
