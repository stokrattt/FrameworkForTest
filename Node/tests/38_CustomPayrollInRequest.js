module.exports = function main(SF, JS, MF, LF, JSstep, VD, V, By, until,FileDetector, system, condition, config,constants) {
    global.fiber = Fiber.current;

    //=========================начинаем писать тест=============================
    V.client = {};
    V.client.name = SF.randomBukva(6) + '_t';
    V.client.fam = SF.randomBukva(6) + '_t';
    V.client.phone = SF.randomCifra(10);
    V.client.email = SF.randomBukvaSmall(6) + '@' + SF.randomBukvaSmall(4) + '.tes';
    V.client.passwd = 123;

condition.nowWeDoing = 'создать local Moving реквест с борда';
    SF.get(V.adminURL);
    LF.LoginToBoardAsCustom(V.adminLogin,V.adminPassword);
    LF.CreateLocalMovingFromBoard(V.client);

condition.nowWeDoing = 'Законфёрмить сразу реквест';
    V.boardNumbers = {};
    LF.addInventoryBoard ();
    LF.RememberDigitsRequestBoard(V.boardNumbers);
    // LF.addToCleanerJob(V.boardNumbers.Id);
    JS.step(JSstep.selectTruck((V.boardNumbers.LaborTimeMax + V.boardNumbers.TravelTime) / 60));
    MF.WaitWhileBusy();
    JS.scroll('div.ServicesCost:visible');
    MF.EditRequest_SetToConfirmed ();
    MF.EditRequest_SetAdressToFrom ();
    MF.EditRequest_SaveChanges ();
    MF.EditRequest_CloseConfirmWork ();
    MF.EditRequest_SetLaborTimeCloseJob ('01:00');
    MF.EditRequest_CloseJob ();

condition.nowWeDoing = 'добавить в пейролл людей и закрыть';
    MF.EditRequest_OpenPayroll ();
    MF.EditRequest_PayrollAddManager(V.managerName);
    MF.WaitWhileBusy ();
    MF.EditRequest_PayrollOpenForemanTab();
    MF.EditRequest_PayrollAddForeman(V.foremanName);
    MF.EditRequest_PayrollSubmit();
    MF.EditRequest_CloseModal();
    LF.closeEditRequest();

condition.nowWeDoing = 'снова открыть и найти людей';
    MF.Board_OpenConfirmed ();
    MF.Board_RefreshDashboard ();
    MF.Board_OpenRequest(V.boardNumbers.Id);
    MF.EditRequest_OpenPayroll();
    SF.sleep(1);
    driver.wait(driver.executeScript('return $(\'select[ng-model="selected.salesPerson[salesPersonIndex]"]:visible  option[selected="selected"]:contains("'+V.managerFirstName+'")\').length;')
        .then(function(count){
            V.countSales=count;
        }),config.timeout);
    SF.sleep(1);
    VD.IWant(VD.ToEqual, V.countSales, 1,'не сохранился Sale');
    SF.click(By.xpath('//a[@ng-click="select(tabs[1])"][contains(text(),"Foreman")]'));
    driver.wait(driver.executeScript('return $(\'select[ng-model="selected.foreman[foremanIndex]"]:visible  option[selected="selected"]:contains("'+V.foremanName+'")\').length;')
        .then(function(count){
            V.countForeman=count;
        }),config.timeout);
    SF.sleep(1);
    VD.IWant(VD.ToEqual, V.countForeman, 1,'не сохранился Foreman');
    SF.sleep(1);

    //=========================закончили писать тест=============================
    SF.endOfTest();
};