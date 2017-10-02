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

    condition.nowWeDoing = 'перешли в аккаунт добавляем опции и двойную preferred date';
    MF.Account_ClickViewRequest();
    let now = new Date();
    let msInDay = 86400000;
    let future = new Date(now.getTime() + msInDay * 2);
    let second_future = new Date(now.getTime() + msInDay * 4);
    let month = { month: 'numeric'};
    let day = {day: 'numeric'};
    V.firstDate = {};
    V.secondDate = {};
    V.firstDate.Month = (future.toLocaleDateString('en-US', month)) - 1;
    V.firstDate.Day = (future.toLocaleDateString('en-US', day));
    V.secondDate.Month = (second_future.toLocaleDateString('en-US', month)) - 1;
    V.secondDate.Day = (second_future.toLocaleDateString('en-US', day));
    SF.click(By.xpath('//h4[contains(text(),"Preferred Pick Up dates:")]/following-sibling::div[2]'));
    SF.sleep(1);
    MF.Account_PreferredPickUpDate(V.firstDate, V.secondDate);
    SF.click(By.xpath('//h2[contains(text(), "Flat Rate Request")]'));
    SF.sleep(2);

    now = new Date();
    msInDay = 86400000;
    future = new Date(now.getTime() + msInDay * 5);
    second_future = new Date(now.getTime() + msInDay * 7);
    month = { month: 'numeric'};
    day = {day: 'numeric'};
    V.firstDate = {};
    V.secondDate = {};
    V.firstDate.Month = (future.toLocaleDateString('en-US', month)) - 1;
    V.firstDate.Day = (future.toLocaleDateString('en-US', day));
    V.secondDate.Month = (second_future.toLocaleDateString('en-US', month)) - 1;
    V.secondDate.Day = (second_future.toLocaleDateString('en-US', day));
    SF.click(By.xpath('//h4[contains(text(),"Preferred Delivery dates:")]/following-sibling::div[2]'));
    SF.sleep(1);
    MF.Account_PreferredDeliveryDate(V.firstDate, V.secondDate);
    SF.click(By.xpath('//h2[contains(text(), "Flat Rate Request")]'));
    SF.sleep(2);

    driver.wait(driver.findElement(By.xpath('//div[contains(@class, "dateRange")]/input')).getAttribute("value").then(function(text){
       V.pickupDate = text;
    }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//div[contains(@class, "dateRange delivery")]/input')).getAttribute("value").then(function(text){
       V.deliveryDates = text;
    }),config.timeout);

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
    condition.nowWeDoing = 'проверяем двойную дату';

    driver.wait(driver.findElement(By.xpath('//div[contains(text(), "Preferred Pick Up:")]/following-sibling::div')).getText().then(function(text){
        VD.IWant(VD.ToEqual, text, V.pickupDate, 'не совпали prefered pickupDate на акаунте');
    }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//div[contains(text(), "Preferred Delivery:")]/following-sibling::div')).getText().then(function(text){
        VD.IWant(VD.ToEqual, text, V.deliveryDates, 'не совпали prefered deliveryDate на акаунте');
    }),config.timeout);

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
    V.newChangedateDelAdmin = (future.toLocaleDateString('en-US', options));
    SF.send(By.xpath('//input[@ng-model="option.delivery"]'), V.newChangedateDelAdmin);
    SF.select (By.xpath('//select[@ng-model="option.deltime1"]'), 5);
    SF.select (By.xpath('//select[@ng-model="option.deltime2"]'), 6);
    SF.send(By.xpath('//input[@ng-model="option.rate"]'), 5000);
    SF.sleep (0.5);
    SF.click (By.xpath('//a[@ng-click="addOption()"]'));
    SF.sleep (1);
    SF.click(By.xpath('//a[@ng-click="saveOptions()"]'));
    SF.sleep (2);
    MF.WaitWhileBusy ();

    /**************************иногда выскакивает иногда нет************/

    MF.SweetConfirm ();
    /*********************************************************************************************/
    MF.EditRequest_OpenClient ();
    LF.SetClientPasswd (V.client.passwd);
    LF.closeEditRequest ();
    MF.Board_LogoutAdmin ();
    SF.get(V.accountURL);
    LF.LoginToAccountAsClient (V.client);
    condition.nowWeDoing = 'идем в акк подтвердить выбранную опцию';
    MF.Account_OpenRequest (V.FRId);
    MF.Account_ChooseOptionFlatRate();
    SF.click(By.xpath('//i[@class="icon-pencil"]'));
    SF.sleep(3);
    SF.click(By.xpath('//i[@ng-click="extraPickup=true"]'));
    SF.sleep(1);
    SF.send(By.xpath('//input[@ng-value="request.field_extra_pickup.postal_code"]'),'02461');
    SF.select(By.xpath('//select[@ng-value="request.field_extra_pickup.organisation_name"]'),2);
    SF.click(By.xpath('//i[@ng-click="extraDropoff=true"]'));
    SF.sleep(1);
    SF.send(By.xpath('//input[@ng-value="request.field_extra_dropoff.postal_code"]'),'07304');
    SF.select(By.xpath('//select[@ng-value="request.field_extra_dropoff.organisation_name"]'),3);
    SF.click(By.xpath('//label[contains(text(),"Move Date")]'));
    SF.sleep(1);
    SF.click(By.xpath('//button[@ng-click="update(client)"]'));
    MF.SweetConfirm();
    MF.WaitWhileBusy();
    SF.waitForVisible(By.xpath('//button[contains(text(),"OK")]'));
    SF.click(By.xpath('//button[contains(text(),"OK")]'));
    SF.sleep(2);

    LF.LogoutFromAccount ();
    SF.get(V.adminURL);
    LF.LoginToBoardAsCustom(V.adminLogin,V.adminPassword);

    condition.nowWeDoing = 'идем в админку ставить нот конферм, трак....';
    MF.Board_OpenRequest (V.FRId);
    SF.sleep(1);
    MF.EditRequest_SetToConfirmed();
    SF.sleep (1);
    MF.EditRequest_SetAdressToFrom ();
    SF.click(By.xpath('//div[contains(@class, "dateRange ")]/input'));
    driver.executeScript(JSstep.Click8DaysCalendar);
    SF.sleep (1);
    SF.clear(By.xpath('//input[@ng-model="request.delivery_start_time.value"]'));
    SF.send(By.xpath('//input[@ng-model="request.delivery_start_time.value"]'),  '02:00 AM');
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
    SF.sleep (1);
    V.boardNumbers = {};
    LF.RememberDigitsRequestBoard (V.boardNumbers);
    SF.sleep(2);
    /**************************************************************************************************************/
    JS.step(JSstep.selectTruck((V.boardNumbers.LaborTimeMax + V.boardNumbers.TravelTime)/60));
    SF.sleep(3);
    driver.wait(driver.findElement(By.xpath('//select[@ng-model="request.field_extra_pickup.organisation_name"]')).getAttribute("value").then(function(text){
        VD.IWant(VD.ToEqual, text, 2, 'не совпали extra pick up етажи на акаунте и мувборде');
    }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//select[@ng-model="request.field_extra_dropoff.organisation_name"]')).getAttribute("value").then(function(text){
        VD.IWant(VD.ToEqual, text, 3, 'не совпали drop off етажи на акаунте и мувборде');
    }),config.timeout);

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

    SF.sleep (2);
    condition.nowWeDoing = 'в админке включаем Quote Explanation';
    MF.Board_OpenSettingsGeneral();
    MF.Board_OpenSettingsAccountPageFlatRate();
    driver.wait(driver.findElements(By.xpath('//h3[contains(text(),"Show Explanation Quote")]/following-sibling::input[contains(@class,"ng-not-empty")]')).then(function(arr){
        V.QuoteExplanation=(arr.length==1);
    }),config.timeout);
    if (V.QuoteExplanation) {console.log('вкл Quote Explanation');SF.click(By.xpath('//input[@ng-model="vm.faAccountSettings.explanation"]/following-sibling::span'));}
    MF.Board_LogoutAdmin();
    condition.nowWeDoing = 'в акаунте проверяем Quote Explanation';
    SF.get(V.accountURL);
    LF.LoginToAccountAsClient (V.client);
    SF.click(By.xpath('//button[@ng-click="vm.viewRequest(request.nid)"]'));
    SF.sleep(2);

    driver.wait(driver.findElements(By.xpath('//p[contains(text(),"Flat Rate Quote Explanation")]')).then(function(arr){
        V.QuoteExplanation=(arr.length==1);
    }),config.timeout);

    //=========================закончили писать тест=============================
    SF.endOfTest();
};