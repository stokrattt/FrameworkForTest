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
    condition.nowWeDoing = 'создаём local moving';
    LF.LoginToBoardAsCustom(V.adminLogin,V.adminPassword);
    LF.CreateLocalMovingFromBoard(V.client);
    MF.EditRequest_SetToConfirmed();
    MF.EditRequest_SetAdressFrom();
    MF.EditRequest_SetAdressTo();
    V.boardNumbers = {};
    LF.RememberDigitsRequestBoard(V.boardNumbers);
    JS.step(JSstep.selectTruck((V.boardNumbers.LaborTimeMax + V.boardNumbers.TravelTime)/60));
    MF.EditRequest_SaveChanges();
    MF.EditRequest_CloseEditRequest();
    MF.Board_OpenLocalDispatch();
    LF.findDayInLocalDispatch(V.boardNumbers.moveDate.Year, V.boardNumbers.moveDate.Month, V.boardNumbers.moveDate.Day);
    MF.WaitWhileBusy();
    MF.WaitWhileBusy();
    MF.Dispatch_GridView();
    LF.SelectRequestDispatch(V.boardNumbers.Id);
    LF.selectCrew(V.foremanName);
    LF.OpenRequestDispatch(V.boardNumbers.Id);
    MF.EditRequest_SetLaborTimeCloseJob('3:00');
    MF.EditRequest_CloseJob();
    LF.RememberDigitsRequestBoard_Down(V.boardNumbers);
    V.boardNumbers.Payroll = {
        managerForCommission: {},
        foremanForCommission: {},
		foreman2ForCommission: {}
    };
    MF.EditRequest_OpenPayroll();
    MF.EditRequest_PayrollAddManager(V.managerName);
    MF.EditRequest_PayrollSetManagerCommission('emilia clark','Office Commission', 123, 80);
    LF.EditRequestPayroll_RememberManager(V.managerName, V.boardNumbers.Payroll.managerForCommission);
    //open Foreman tab
    MF.EditRequest_PayrollOpenForemanTab();
    V.foremanName2 = 'Foreman Flow1';
    LF.EditRequestPayroll_RememberForeman(V.foremanName, V.boardNumbers.Payroll.foremanForCommission);
    MF.EditRequest_PayrollAddForeman(V.foremanName2);
    MF.EditRequest_PayrollAddForemanCommission(V.foremanName2, 'Bonus');
    MF.EditRequest_PayrollSetForemanCommission(V.foremanName2,'Bonus',7,90);
    LF.EditRequestPayroll_RememberForeman(V.foremanName2, V.boardNumbers.Payroll.foreman2ForCommission);
    //submit payroll
	MF.EditRequest_PayrollSubmit();
    MF.EditRequest_CloseModal();
    MF.EditRequest_CloseEditRequest();
    MF.Board_OpenPayroll();
    LF.selectDateInPayroll(V.boardNumbers.moveDate);
    LF.findSaleInPayroll(V.managerName);
    V.payrollNumbers = {
        Sale:{},
        Foreman:{},
		Foreman2:{}
    };
	MF.Payroll_getTotalById(V.boardNumbers.Id, V.payrollNumbers.Sale);
    VD.IWant(VD.ToEqual, V.payrollNumbers.Sale.Total, V.boardNumbers.Payroll.managerForCommission.total, 'не совпали цифры в Payroll manager\n' +
        'id=' + V.boardNumbers.Id);
    SF.sleep(2);
    Debug.pause ();
    MF.Payroll_ClickAllDepartment();
    MF.WaitWhileBusy ();
    LF.findTestForemanInPayroll(V.foremanName);
    MF.Payroll_getTotalById(V.boardNumbers.Id, V.payrollNumbers.Foreman);
    SF.sleep(2);
    VD.IWant(VD.ToEqual, V.payrollNumbers.Foreman.Total, V.boardNumbers.Payroll.foremanForCommission.Total, 'не совпали цифры в Payroll foreman\n' +
        'id=' + V.boardNumbers.Id);
	MF.Payroll_ClickAllDepartment();
	MF.WaitWhileBusy ();
	LF.findTestForemanInPayroll(V.foremanName2);
	MF.Payroll_getTotalById(V.boardNumbers.Id, V.payrollNumbers.Foreman2);
	VD.IWant(VD.ToEqual, V.payrollNumbers.Foreman2.Total, V.boardNumbers.Payroll.foreman2ForCommission.Total, 'не совпали цифры в Payroll foreman\n' +
		'id=' + V.boardNumbers.Id);
	SF.sleep (2);

    //=========================закончили писать тест=============================
    SF.endOfTest();
};
