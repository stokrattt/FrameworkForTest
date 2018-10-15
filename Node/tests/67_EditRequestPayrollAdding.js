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
    SF.sleep(1);
    JS.step(JSstep.selectTruck((V.boardNumbers.LaborTimeMax + V.boardNumbers.TravelTime)/60));
    MF.WaitWhileBusy();
    MF.EditRequest_SaveChanges();
    MF.EditRequest_CloseEditRequest();
    MF.Board_OpenLocalDispatch();
    LF.findDayInLocalDispatch(V.boardNumbers.moveDate.Year, V.boardNumbers.moveDate.Month, V.boardNumbers.moveDate.Day);
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
    SF.sleep(1);
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
    VD.IWant(VD.ToEqual, Math.floor(V.payrollNumbers.Sale.Total), V.boardNumbers.Payroll.managerForCommission.total, 'не совпали цифры в Payroll manager\n' +
        'id=' + V.boardNumbers.Id);
    SF.sleep(1);
    MF.Payroll_ClickAllDepartment();
    LF.findTestForemanInPayroll(V.foremanName);
    MF.Payroll_getTotalById(V.boardNumbers.Id, V.payrollNumbers.Foreman);
    SF.sleep(1);
    VD.IWant(VD.ToEqual, Math.floor(V.payrollNumbers.Foreman.Total), V.boardNumbers.Payroll.foremanForCommission.Total, 'не совпали цифры в Payroll foreman\n' +
        'id=' + V.boardNumbers.Id);

condition.nowWeDoing = 'тут будем проверять hourly rate, что он сейчас совпадает с маленьким пейролом, потом мы в маленьком пейроле поставим ноль, сделаем ресабмит' +
    'обновим большой пейрол и проверим что hourly rate стал нульом в большом пейроле';
    driver.wait(driver.findElement(By.xpath('//td[contains(text(), "'+V.boardNumbers.Id+'")]/../td[@ng-show="columns.fields[\'ca_hours\'].selected"]')).getText().then(function (text) {
        V.hours = SF.cleanPrice(text);
    }),config.timeout);
    SF.click(By.xpath('//td[contains(text(), "'+V.boardNumbers.Id+'")]'));
    SF.click(By.xpath('//td[contains(text(), "'+V.boardNumbers.Id+'")]'));
    MF.EditRequest_WaitForOpenRequest();
    MF.EditRequest_OpenPayroll ();
    MF.EditRequest_PayrollOpenForemanTab();
    VD.IWant(VD.ToEqual, V.hours, V.boardNumbers.Payroll.foremanForCommission.Hourly.forCommission, 'не совпал hourly rate в большом и в маленьком пейроле в реквесте');
    MF.EditRequest_PayrollSetForemanCommission(V.foremanName,'Hourly Rate',0,0);
    MF.EditRequest_PayrollSubmit();
    MF.EditRequest_CloseModal();
    MF.EditRequest_CloseEditRequest();
    MF.Payroll_RefreshTable();
    driver.wait(driver.findElement(By.xpath('//td[contains(text(), "'+V.boardNumbers.Id+'")]/../td[@ng-show="columns.fields[\'ca_hours\'].selected"]')).getText().then(function (text) {
        V.hoursZeroMustBe = SF.cleanPrice(text);
        VD.IWant(VD.ToEqual, V.hoursZeroMustBe, 0, 'полсе ресабмита маленького пейрола с hourly rate =0 в большом пейроле он не поменял свое значение на ноль "'+V.boardNumbers.Id+'"');
    }),config.timeout);
	MF.Payroll_ClickAllDepartment();
	LF.findTestForemanInPayroll(V.foremanName2);
	MF.Payroll_getTotalById(V.boardNumbers.Id, V.payrollNumbers.Foreman2);
	VD.IWant(VD.ToEqual, V.payrollNumbers.Foreman2.Total, V.boardNumbers.Payroll.foreman2ForCommission.Total, 'не совпали цифры в Payroll foreman\n' +
		'id=' + V.boardNumbers.Id);
	SF.sleep (1);

    //=========================закончили писать тест=============================
    SF.endOfTest();
};
