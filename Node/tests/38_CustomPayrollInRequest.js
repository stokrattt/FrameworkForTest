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
    LF.addToCleanerJob(V.boardNumbers.Id);
    JS.step(JSstep.selectTruck((V.boardNumbers.LaborTimeMax + V.boardNumbers.TravelTime) / 60));
    JS.scroll('div.ServicesCost:visible');
    MF.EditRequest_SetToConfirmed ();
    MF.EditRequest_SetAdressToFrom ();
    MF.EditRequest_SaveChanges ();
    MF.EditRequest_CloseConfirmWork ();
    MF.EditRequest_SetLaborTimeCloseJob ();
    MF.EditRequest_CloseJob ();

condition.nowWeDoing = 'добавить в пейролл людей и закрыть';
    MF.EditRequest_OpenPayroll ();
	MF.EditRequest_PayrollAddManager(V.managerName);
    MF.WaitWhileBusy ();
	MF.EditRequest_PayrollOpenForemanTab();
	MF.EditRequest_PayrollAddForeman(V.foremanName);
	SF.click(By.xpath('//button[@ng-click="reSubmitPayroll()"]'));
    SF.sleep(2);
    SF.click(By.xpath('//button[@class="confirm"]'));
    JS.waitForExist('div.sa-success:visible');
    SF.sleep(1);
    SF.click(By.xpath('//button[@class="confirm"]'));
    SF.sleep(1);
    SF.click(By.xpath('//div[@class="modal-footer"]/button[@ng-click="cancel()"]'));
    SF.sleep(1);
    LF.closeEditRequest();

condition.nowWeDoing = 'снова открыть и найти людей';
    MF.Board_OpenConfirmed ();
    MF.Board_RefreshDashboard ();
    LF.OpenRequest(V.boardNumbers.Id);
    MF.EditRequest_OpenPayroll();
    driver.wait(driver.executeScript('return $(\'select[ng-model="selected.salesPerson[salesPersonIndex]"]:visible  option[selected="selected"]:contains("'+V.managerFirstName+'")\').length;'));

    driver.wait(driver.executeScript('return $(\'select[ng-model="selected.salesPerson[salesPersonIndex]"]:visible  option[selected="selected"]:contains("JackSales do not delete")\').length;')
        .then(function(count){
            V.countSales=count;
        }),config.timeout);
    SF.sleep(1);
    VD.IWant(VD.VToEqual, V.countSales, 1,'не сохранился Sale');
    SF.click(By.xpath('//a[@ng-click="select(tabs[1])"][contains(text(),"Foremen")]'));
    driver.wait(driver.executeScript('return $(\'select[ng-model="selected.foreman[foremanIndex]"]:visible  option[selected="selected"]:contains("'+V.foremanName+'")\').length;')
        .then(function(count){
            V.countForeman=count;
        }),config.timeout);
    SF.sleep(1);
    VD.IWant(VD.VToEqual, V.countForeman, 1,'не сохранился Foreman');
    SF.sleep(2);

    //=========================закончили писать тест=============================
    SF.endOfTest();
};