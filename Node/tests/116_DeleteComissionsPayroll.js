module.exports = function main(SF, JS, MF, LF, JSstep, VD, V, By, until,FileDetector, system, condition, config,constants) {
    global.fiber = Fiber.current;
    V.client = {};
    V.client.name = SF.randomBukva(6) + '_t';
    V.client.fam = SF.randomBukva(6) + '_t';
    V.client.phone = SF.randomCifra(10);
    V.client.email = SF.randomBukvaSmall(6) + '@' + SF.randomBukvaSmall(4) + '.tes';
    V.client.passwd = 123;


    SF.get(V.adminURL);
    LF.LoginToBoardAsCustom(V.adminLogin,V.adminPassword);

condition.nowWeDoing= 'создаем локал мув и сразу его конфермим';
    LF.CreateLocalMovingFromBoard(V.client);
    V.boardNumbers = {};
    LF.RememberDigitsRequestBoard(V.boardNumbers);
    JS.step(JSstep.selectTruck((V.boardNumbers.LaborTimeMax + V.boardNumbers.TravelTime)/60));
    MF.WaitWhileBusy();
    MF.EditRequest_SetAdressToFrom ();
    MF.EditRequest_SetToConfirmed ();
    MF.EditRequest_SaveChanges ();
    LF.closeEditRequest();

condition.nowWeDoing= 'идем в диспатч назначаем команду и закрываем работу мануально и добавляем сеилса в пеирол';
    MF.Board_OpenLocalDispatch();
    LF.findDayInLocalDispatch(V.boardNumbers.moveDate.Year, V.boardNumbers.moveDate.Month, V.boardNumbers.moveDate.Day);
    MF.Dispatch_GridView();
    LF.SelectRequestDispatch(V.boardNumbers.Id);
    V.foremanName = 'Test Foreman';
    LF.selectCrew(V.foremanName);
    MF.Dispach_ClickAddCrew();
    LF.OpenRequestDispatch(V.boardNumbers.Id);
    MF.EditRequest_SetLaborTimeCloseJob ('01:00');
    MF.EditRequest_CloseJob();
    MF.EditRequest_OpenPayroll();
    V.managerName = 'emilia';
    MF.EditRequest_PayrollAddManager(V.managerName);
    SF.click(By.xpath('//input[@ng-model="sale.for_commission "]'));
    SF.send(By.xpath('//input[@ng-model="sale.for_commission "]' ), '500');
    MF.EditRequest_PayrollSubmit();
    MF.EditRequest_CloseModal();
    LF.closeEditRequest();

condition.nowWeDoing= 'идем в большой пеирол, оттуда заходим в маленький нашей работы, и удаляем фореману все комисси';
    MF.Board_OpenPayroll();
    LF.selectDateInPayroll(V.boardNumbers.moveDate);
    LF.findTestForemanInPayroll(V.foremanName);
    SF.click(By.xpath('//td[contains(text(),"' +V.boardNumbers.Id+ '")]'));
    SF.click(By.xpath('//td[contains(text(),"' +V.boardNumbers.Id+ '")]'));
    MF.EditRequest_OpenPayroll();
    MF.EditRequest_PayrollOpenForemanTab();
    SF.click(By.xpath('//span[@ng-click="removeCommission(\'foreman\', foremanIndex, rateInd)"]'));
    SF.click(By.xpath('//span[@ng-click="removeCommission(\'foreman\', foremanIndex, rateInd)"]'));
    SF.click(By.xpath('//span[@ng-click="removeCommission(\'foreman\', foremanIndex, rateInd)"]'));
    SF.click(By.xpath('//span[@ng-click="removeCommission(\'foreman\', foremanIndex, rateInd)"]'));
    SF.click(By.xpath('//span[@ng-click="removeCommission(\'foreman\', foremanIndex, rateInd)"]'));
    SF.click(By.xpath('//span[@ng-click="removeCommission(\'foreman\', foremanIndex, rateInd)"]'));
    MF.EditRequest_PayrollSubmit();
    MF.EditRequest_CloseModal();
    LF.closeEditRequest();
    JS.scroll('div.total-payroll-panel div.total-title:contains(\"Paid\")');
    MF.Payroll_RefreshTable ();
    driver.wait(driver.findElement(By.xpath('//td[contains(text(),"'+V.boardNumbers.Id+'")]/../td[@ng-click="editRequest(\'cb_hourly_rate\', id, \'request\', dataObj.trip_job)"]')).getText().then(function(text){
        V.PayrollHourlyRateForeman = SF.cleanPrice(text);
        VD.IWant(VD.ToEqual, V.PayrollHourlyRateForeman, 0, ' Hourly Rate форемана не 0');
    }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//td[contains(text(),"'+V.boardNumbers.Id+'")]/../td[@ng-click="editRequest(\'c_materials\', id, \'request\', dataObj.trip_job)"]')).getText().then(function(text){
        V.PayrollPackingForeman = SF.cleanPrice(text);
        VD.IWant(VD.ToEqual, V.PayrollPackingForeman, 0, ' Packing форемана не 0');
    }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//td[contains(text(),"'+V.boardNumbers.Id+'")]/../td[@ng-click="editRequest(\'extra\', id, \'request\', dataObj.trip_job)"]')).getText().then(function(text){
        V.PayrollExtraForeman = SF.cleanPrice(text);
        VD.IWant(VD.ToEqual, V.PayrollExtraForeman, 0, ' Extra форемана не 0');
    }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//td[contains(text(),"'+V.boardNumbers.Id+'")]/../td[@ng-click="editRequest(\'tip\', id, \'request\', dataObj.trip_job)"]')).getText().then(function(text){
        V.PayrollTipForeman = SF.cleanPrice(text);
        VD.IWant(VD.ToEqual, V.PayrollTipForeman, 0, ' Tip форемана не 0');
    }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//td[contains(text(),"'+V.boardNumbers.Id+'")]/../td[@ng-click="editRequest(\'tj_bonus\', id, \'request\', dataObj.trip_job)"]')).getText().then(function(text){
        V.PayrollBonusForeman = SF.cleanPrice(text);
        VD.IWant(VD.ToEqual, V.PayrollBonusForeman, 0, ' Bonus форемана не 0');
    }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//td[contains(text(),"'+V.boardNumbers.Id+'")]/../td[@ng-click="editRequest(\'total\', id, \'request\', dataObj.trip_job)"]')).getText().then(function(text){
        V.PayrollTotalForeman = SF.cleanPrice(text);
        VD.IWant(VD.ToEqual, V.PayrollTotalForeman, 0, ' Total форемана не 0');
    }),config.timeout);

condition.nowWeDoing= 'теперь добавляем комисию ему же в маленьком пеироле и проверяем в большом';
    SF.click(By.xpath('//td[contains(text(),"' +V.boardNumbers.Id+ '")]'));
    MF.EditRequest_OpenPayroll();
    MF.EditRequest_PayrollOpenForemanTab();
    MF.EditRequest_PayrollAddForemanCommission(V.foremanName, 'Bonus');
    SF.click(By.xpath('//input[@ng-model="foreman.rate"]'));
    SF.send(By.xpath('//input[@ng-model="foreman.rate"]'),'100');
    driver.wait(driver.findElement(By.xpath('//span[@ng-hide="disableRate(\'foreman\', foremanIndex,  foreman.id)"]')).getText().then(function (text) {
        V.SmallPayrollAfterAddBonusForeman = SF.cleanPrice(text);
    }),config.timeout);
    SF.sleep(1);
    MF.EditRequest_PayrollSubmit();
    MF.EditRequest_CloseModal();
    LF.closeEditRequest();
    JS.scroll('div.total-payroll-panel div.total-title:contains(\"Paid\")');
    MF.Payroll_RefreshTable ();
    driver.wait(driver.findElement(By.xpath('//td[contains(text(),"'+V.boardNumbers.Id+'")]/../td[@ng-click="editRequest(\'tj_bonus\', id, \'request\', dataObj.trip_job)"]')).getText().then(function(text){
        V.PayrollAfterAddBonusForeman = SF.cleanPrice(text);
        VD.IWant(VD.ToEqual, V.PayrollAfterAddBonusForeman, V.SmallPayrollAfterAddBonusForeman, ' Bonus форемана не совпал после добавления комиссии в маленьком пеироле');
    }),config.timeout);
    MF.Payroll_ClickStepBackToNameWorker();

condition.nowWeDoing= 'идем в большой пеирол, оттуда заходим в маленький нашей работы, и удаляем хелперу все комисси';
    MF.Payroll_ClickAllDepartment();
    MF.Payroll_GoToWorkerJobs('helper');
    MF.Payroll_GoToWorkerJobs('Test Helper1');
    SF.click(By.xpath('//td[contains(text(),"' +V.boardNumbers.Id+ '")]'));
    SF.click(By.xpath('//td[contains(text(),"' +V.boardNumbers.Id+ '")]'));
    MF.EditRequest_OpenPayroll();
    MF.EditRequest_PayrollOpenHelperTab();
    SF.click(By.xpath('//span[@ng-click="removeCommission(\'helper\', helperIndex, rateInd)"]'));
    SF.click(By.xpath('//span[@ng-click="removeCommission(\'helper\', helperIndex, rateInd)"]'));
    SF.click(By.xpath('//span[@ng-click="removeCommission(\'helper\', helperIndex, rateInd)"]'));
    SF.click(By.xpath('//span[@ng-click="removeCommission(\'helper\', helperIndex, rateInd)"]'));
    SF.click(By.xpath('//span[@ng-click="removeCommission(\'helper\', helperIndex, rateInd)"]'));
    SF.click(By.xpath('//span[@ng-click="removeCommission(\'helper\', helperIndex, rateInd)"]'));
    MF.EditRequest_PayrollSubmit();
    MF.EditRequest_CloseModal();
    LF.closeEditRequest();
    MF.Payroll_RefreshTable ();
    driver.wait(driver.findElement(By.xpath('//td[contains(text(),"'+V.boardNumbers.Id+'")]/../td[@ng-click="editRequest(\'cb_hourly_rate\', id, \'request\', dataObj.trip_job)"]')).getText().then(function(text){
        V.PayrollHourlyRateHelper = SF.cleanPrice(text);
        VD.IWant(VD.ToEqual, V.PayrollHourlyRateHelper, 0, ' Hourly Rate  хелпера не 0');
    }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//td[contains(text(),"'+V.boardNumbers.Id+'")]/../td[@ng-click="editRequest(\'c_materials\', id, \'request\', dataObj.trip_job)"]')).getText().then(function(text){
        V.PayrollPackingHelper = SF.cleanPrice(text);
        VD.IWant(VD.ToEqual, V.PayrollPackingHelper, 0, ' Packing хелпера не 0');
    }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//td[contains(text(),"'+V.boardNumbers.Id+'")]/../td[@ng-click="editRequest(\'extra\', id, \'request\', dataObj.trip_job)"]')).getText().then(function(text){
        V.PayrollExtraHelper = SF.cleanPrice(text);
        VD.IWant(VD.ToEqual, V.PayrollExtraHelper, 0, ' Extra хелпера не 0');
    }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//td[contains(text(),"'+V.boardNumbers.Id+'")]/../td[@ng-click="editRequest(\'tip\', id, \'request\', dataObj.trip_job)"]')).getText().then(function(text){
        V.PayrollTipHelper = SF.cleanPrice(text);
        VD.IWant(VD.ToEqual, V.PayrollTipHelper, 0, ' Tip хелпера не 0');
    }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//td[contains(text(),"'+V.boardNumbers.Id+'")]/../td[@ng-click="editRequest(\'tj_bonus\', id, \'request\', dataObj.trip_job)"]')).getText().then(function(text){
        V.PayrollBonusHelper = SF.cleanPrice(text);
        VD.IWant(VD.ToEqual, V.PayrollBonusHelper, 0, ' Bonus хелпера не 0');
    }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//td[contains(text(),"'+V.boardNumbers.Id+'")]/../td[@ng-click="editRequest(\'total\', id, \'request\', dataObj.trip_job)"]')).getText().then(function(text){
        V.PayrollTotalHelper = SF.cleanPrice(text);
        VD.IWant(VD.ToEqual, V.PayrollTotalHelper, 0, ' Total хелпера не 0');
    }),config.timeout);

    MF.Payroll_ClickStepBackToNameWorker();
condition.nowWeDoing= 'идем за сеилса и удаляем сеилса из работы';
    MF.Payroll_ClickAllDepartment();
    MF.Payroll_GoToWorkerJobs('sales');
    MF.Payroll_GoToWorkerJobs('emilia clark');
    driver.wait(driver.findElement(By.xpath('//td[contains(text(),"'+V.boardNumbers.Id+'")]/../td[@ng-click="editRequest(\'total\', id, \'request\', dataObj.trip_job)"]')).getText().then(function(text){
        V.PayrollTotalSales = SF.cleanPrice(text);
        VD.IWant(VD.ToEqual, V.PayrollTotalSales, 50, ' Total сеилса не совпал');
    }),config.timeout);
    SF.click(By.xpath('//td[contains(text(),"' +V.boardNumbers.Id+ '")]'));
    SF.click(By.xpath('//td[contains(text(),"' +V.boardNumbers.Id+ '")]'));
    MF.EditRequest_OpenPayroll();
    SF.click(By.xpath('//span[@ng-click="removeWorker(salesPersonIndex, \'salesPerson\')"]'));
    MF.SweetConfirm();
    MF.WaitWhileToaster();
    SF.sleep(2);
    MF.EditRequest_PayrollSubmit();
    MF.EditRequest_CloseModal();
    LF.closeEditRequest();
    MF.Payroll_RefreshTable ();
    driver.wait(driver.findElements(By.xpath('//td[contains(text(),"'+V.boardNumbers.Id+'")]')).then(function(array){
        VD.IWant(VD.ToEqual, array.length,0, 'работа не удалилась из пеирола');
    }), config.timeout);
    SF.sleep(1);

    SF.endOfTest();
};
