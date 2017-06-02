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
    Debug.pause();
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
    MF.EditRequest_OpenPayroll();
    //addSalesPayroll
    SF.click(By.xpath('//div[@ng-click="addWorker(\'salesPerson\')"]'));
    //selectEmilia
    SF.click(By.xpath('//select[@ng-model="selected.salesPerson[salesPersonIndex]"]'),6070);
    MF.WaitWhileBusy();

    Debug.pause();

    //=========================закончили писать тест=============================
    SF.endOfTest();
};
