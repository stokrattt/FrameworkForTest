module.exports = function main(SF, JS, MF, LF, JSstep, VD, V, By, until,FileDetector, system, condition, config,constants) {
    global.fiber = Fiber.current;
    V.client = {};
    V.client.name = SF.randomBukva(6) + '_t';
    V.client.fam = SF.randomBukva(6) + '_t';
    V.client.phone = SF.randomCifra(10);
    V.client.email = SF.randomBukvaSmall(6) + '@' + SF.randomBukvaSmall(4) + '.tes';
    V.client.passwd = 123;

    //=========================начинаем писать тест=============================
    condition.nowWeDoing = 'создаем флет рейт с верхней фронтовой формы';

    SF.get(V.frontURL);
    LF.FullSmallCalcAsFlateRate (V.client);

    condition.nowWeDoing = 'перешли в аккаунт добавляем опции';
    MF.Account_ClickViewRequest();
    let now = new Date();
    let msInDay = 86400000;
    let future = new Date(now.getTime() + msInDay * 2);
    let options = { day: 'numeric', month: 'short', year: 'numeric' };
    V.changedateUp = (future.toLocaleDateString('en-US', options));
    SF.send(By.xpath('//div[contains(@class, "dateRange")]/input'), V.changedateUp);
    now = new Date();
    msInDay = 86400000;
    future = new Date(now.getTime() + msInDay * 3);
    options = { day: 'numeric', month: 'short', year: 'numeric' };
    V.changedateDelivery = (future.toLocaleDateString('en-US', options));
    SF.send(By.xpath('//div[contains(@class, "dateRange delivery")]/input'), V.changedateDelivery);
    SF.click(By.xpath('//div[contains(@class, "ng-pristine")]'));
    SF.select (By.xpath('//select[@ng-model="details.current_door"]'), 30);
    SF.select (By.xpath('//select[@ng-model="details.new_door"]'), 50);
    SF.select (By.xpath('//select[@ng-model="details.current_permit"]'), "PM");
    SF.select (By.xpath('//select[@ng-model="details.new_permit"]'), "PR");
    JS.click('button[ng-click=\\"saveDetails()\\"]:visible');
    SF.sleep(1);
    MF.WaitWhileBusy ();
    SF.sleep (3);
    condition.nowWeDoing = 'добавляем инвенторий в акке';
    LF.AccountFlatRateAddInventory();
    MF.Account_SubmitFlatRateAfterAddInventory ();
    JS.scroll ('a[ng-click=\\"vm.Logout()\\"]');
    driver.wait(driver.findElement(By.xpath('//div[contains(text(),"Request ID")]/span')).getText().then(function (text) {
        V.FRId = SF.cleanPrice(text);
    }),config.timeout);
    SF.sleep(1);
    LF.addToCleanerJob (V.FRId);
    LF.LogoutFromAccount ();
    SF.get(V.adminURL);
    condition.nowWeDoing = 'пошли в админку, открыли реквест и заполняем опции';
    LF.LoginToBoardAsCustom(V.adminLogin,V.adminPassword);
    LF.OpenRequestFlatRate (V.FRId);
    SF.clear (By.xpath('//input[@ng-model="option.pickup"]'));
    SF.sleep (0.5);
    now = new Date();
    msInDay = 86400000;
    future = new Date(now.getTime() + msInDay * 2);
    options = { month: 'long', day: 'numeric', year: 'numeric' };
    V.changedateUpAdmin = (future.toLocaleDateString('en-US', options));
    SF.send(By.xpath('//input[@ng-model="option.pickup"]'), V.changedateUpAdmin);
    SF.select (By.xpath('//select[@ng-model="option.picktime1"]'), 3);
    SF.select (By.xpath('//select[@ng-model="option.picktime2"]'), 4);
    SF.sleep (0.5);
    now = new Date();
    msInDay = 86400000;
    future = new Date(now.getTime() + msInDay * 4);
    options = { month: 'long', day: 'numeric', year: 'numeric' };
    V.changedateDelAdmin = (future.toLocaleDateString('en-US', options));
    SF.send(By.xpath('//input[@ng-model="option.delivery"]'), V.changedateDelAdmin);
    SF.select (By.xpath('//select[@ng-model="option.deltime1"]'), 5);
    SF.select (By.xpath('//select[@ng-model="option.deltime2"]'), 6);
    SF.send(By.xpath('//input[@ng-model="option.rate"]'), 5000);
    SF.sleep (0.5);
    SF.click (By.xpath('//a[@ng-click="addOption()"]'));
    SF.sleep (1);
    SF.click(By.xpath('//a[@ng-click="saveOptions()"]'));
    SF.sleep (4);
    MF.WaitWhileBusy ();
    MF.WaitWhileBusy ();

    /**************************иногда выскакивает иногда нет************/

    MF.SweetConfirm ();

    MF.EditRequest_OpenRequest();
    SF.sleep(2);
    SF.clear (By.xpath('//input[@ng-model="request.flat_rate_quote.value"]'));
    SF.send (By.xpath('//input[@ng-model="request.flat_rate_quote.value"]'), 3000);
    SF.click(By.xpath('//label[@ng-click="OpenSurchargeModal();"]'));
    SF.waitForVisible(By.xpath('//input[@ng-model="request.request_all_data.surcharge_fuel"]'));
    SF.sleep(2);
    SF.clear(By.xpath('//input[@ng-model="request.request_all_data.surcharge_fuel"]'));
    SF.send(By.xpath('//input[@ng-model="request.request_all_data.surcharge_fuel"]'), 50);
    SF.click(By.xpath('//button[@ng-click="Apply()"]'));
    MF.WaitWhileToaster ();
    SF.sleep(4);
    MF.EditRequest_SetToConfirmed();
    JS.step(JSstep.selectTruck(5));
    MF.EditRequest_SetAdressToFrom();
    V.boardNumbers = {};
    LF.RememberDigitsRequestBoard(V.boardNumbers);
    SF.click(By.xpath('//a[@ng-click="select(tabs[4])"]'));
    SF.waitForVisible(By.xpath('//button[@ng-click="delete(client)"]'));
    SF.send(By.xpath('//input[@ng-model="client.password"]'), V.client.passwd);
    SF.click(By.xpath('//button[@ng-click="update(client)"]'));
    SF.waitForVisible(By.xpath('//div[contains(text(),"Client info was updated")]'));
    MF.EditRequest_OpenRequest();
    now = new Date();
    msInDay = 86400000;
    future = new Date(now.getTime());
    options = { month: 'long', day: 'numeric', year: 'numeric' };
    V.changedateDelAdmin = (future.toLocaleDateString('en-US', options));
    SF.send(By.xpath('//input[@ng-model="deliveryDateInput"]'), V.changedateDelAdmin);
    SF.send(By.xpath('//input[@ng-model="deliveryDateSecondInput"]'), V.changedateDelAdmin);

    SF.click(By.xpath('//input[@ng-model="request.dstart_time1.value"]'));
    SF.sleep(1);
    SF.click(By.xpath('//li[contains(text(), "12:00 AM")]'));
    MF.WaitWhileBusy ();
    // SF.click(By.xpath('//input[@ng-model="request.dstart_time2.value"]'));
    // SF.sleep(1);
    // SF.click(By.xpath('//li[contains(text(), "02:00 AM")]'));
    // MF.WaitWhileBusy ();
    // MF.EditRequest_SaveChanges();

    SF.click(By.xpath('//div[@ng-click="changeSalesClosingTab(\'closing\')"]'));
    SF.sleep(1);
    SF.click(By.xpath('//button[@ng-click="update(request)"]'));
    MF.WaitWhileBusy ();
    SF.click(By.xpath('//h2[contains(text(),"Pickup")]/..//div[@ng-click="closeJob(\'Pickup Done\');"]'));
    MF.WaitWhileBusy ();
    SF.click(By.xpath('//h2[contains(text(),"Pickup")]/..//div[@ng-click="openSalaryCommisionModal(\'pickedUpCrew\');"]'));
    V.boardNumbers.Payroll = {
        managerForCommission: {},
        foremanForCommission: {},
        foreman2ForCommission: {}
    };
    SF.sleep(6);
    MF.EditRequest_PayrollAddManager(V.managerName);
    SF.sleep(3);
    MF.EditRequest_PayrollSetManagerCommission('emilia clark','Office Commission', 123, 80);
    LF.EditRequestPayroll_RememberManager(V.managerName, V.boardNumbers.Payroll.managerForCommission);
    MF.EditRequest_PayrollOpenForemanTab();
    V.foremanName2 = 'Foreman Flow1';
    MF.EditRequest_PayrollAddForeman(V.foremanName);
    MF.EditRequest_PayrollAddForemanCommission(V.foremanName, 'Bonus', 150, 60);
    LF.EditRequestPayroll_RememberForeman(V.foremanName, V.boardNumbers.Payroll.foremanForCommission);
    // MF.EditRequest_PayrollAddForeman(V.foremanName2);
    // MF.EditRequest_PayrollSetForemanCommission(V.foremanName2,'Bonus',7,90);
    // LF.EditRequestPayroll_RememberForeman(V.foremanName2, V.boardNumbers.Payroll.foreman2ForCommission);
    //submit payroll
    MF.EditRequest_PayrollSubmit();
    MF.EditRequest_CloseModal();

    // SF.click(By.xpath('//h2[contains(text(),"Delivery")]/..//div[@ng-click="closeJob(\'Delivery Done\');"]'));
    // MF.WaitWhileBusy ();
    // SF.click(By.xpath('//h2[contains(text(),"Delivery")]/..//div[@ng-click="openSalaryCommisionModal(\'deliveryCrew\');"]'));
    // V.boardNumbers.PayrollDelivery = {
    //     managerForCommission: {},
    //     foremanForCommission: {},
    //     foreman2ForCommission: {}
    // };
    // SF.sleep(6);
    // MF.EditRequest_PayrollAddManager(V.managerName);
    // SF.sleep(3);
    // MF.EditRequest_PayrollSetManagerCommission('emilia clark','Office Commission', 120, 70);
    // LF.EditRequestPayroll_RememberManager(V.managerName, V.boardNumbers.PayrollDelivery.managerForCommission);
    // MF.EditRequest_PayrollOpenForemanTab();
    // V.foremanName2 = 'Foreman Flow1';
    // LF.EditRequestPayroll_RememberForeman(V.foremanName, V.boardNumbers.PayrollDelivery.foremanForCommission);
    // MF.EditRequest_PayrollAddForeman(V.foremanName2);
    // MF.EditRequest_PayrollAddForemanCommission(V.foremanName2, 'Bonus');
    // MF.EditRequest_PayrollSetForemanCommission(V.foremanName2,'Bonus',6,80);
    // LF.EditRequestPayroll_RememberForeman(V.foremanName2, V.boardNumbers.PayrollDelivery.foreman2ForCommission);
    // //submit payroll
    // MF.EditRequest_PayrollSubmit();
    // MF.EditRequest_CloseModal();




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
    VD.IWant(VD.ToEqual, V.payrollNumbers.Sale.Total, V.boardNumbers.Payroll.managerForCommission.total, '1 не совпали цифры в Payroll manager\n' +
        'id=' + V.boardNumbers.Id);
    SF.sleep(2);
    MF.Payroll_ClickAllDepartment();
    MF.WaitWhileBusy ();
    LF.findTestForemanInPayroll(V.foremanName);
    MF.Payroll_getTotalById(V.boardNumbers.Id, V.payrollNumbers.Foreman);
    SF.sleep(2);
    VD.IWant(VD.ToEqual, V.payrollNumbers.Foreman.Total, V.boardNumbers.Payroll.foremanForCommission.Total, '2 не совпали цифры в Payroll foreman\n' +
        'id=' + V.boardNumbers.Id);
    MF.Payroll_ClickAllDepartment();
    MF.WaitWhileBusy ();
    // LF.findTestForemanInPayroll(V.foremanName2);
    // MF.Payroll_getTotalById(V.boardNumbers.Id, V.payrollNumbers.Foreman2);
    // VD.IWant(VD.ToEqual, V.payrollNumbers.Foreman2.Total, V.boardNumbers.Payroll.foreman2ForCommission.Total, '3 не совпали цифры в Payroll foreman\n' +
    //     'id=' + V.boardNumbers.Id);

    SF.sleep (2);
    MF.Board_OpenSettingsGeneral();
    MF.Board_OpenSettingsAccountPageFlatRate();
    driver.wait(driver.findElements(By.xpath('//h3[contains(text(),"Show Explanation Quote")]/following-sibling::input[contains(@class,"ng-not-empty")]')).then(function(arr){
        V.QuoteExplanation=(arr.length==1);
    }),config.timeout);
    if (V.QuoteExplanation) {console.log('вкл Quote Explanation');SF.click(By.xpath('//input[@ng-model="vm.faAccountSettings.explanation"]/following-sibling::span'));}
    MF.Board_LogoutAdmin();
    condition.nowWeDoing = 'первый раз в акаунте';
    SF.get(V.accountURL);
    LF.LoginToAccountAsClient (V.client);
    SF.click(By.xpath('//button[@ng-click="vm.viewRequest(request.nid)"]'));
    SF.sleep(2);
    // SF.click(By.xpath('//button[@ng-click="cancel()"]'));
    // SF.sleep(2);
    driver.wait(driver.findElements(By.xpath('//p[contains(text(),"Flat Rate Quote Explanation")]')).then(function(arr){
        V.QuoteExplanation=(arr.length==1);
    }),config.timeout);

    //=========================закончили писать тест=============================
    SF.endOfTest();
};