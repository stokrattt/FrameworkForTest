module.exports = function main(SF, JS, MF, LF, JSstep, VD, V, By, until,FileDetector, system, condition, config,constants) {
    global.fiber = Fiber.current;
    V.client = {};
    V.client.name = SF.randomBukva(6) + '_t';
    V.client.fam = SF.randomBukva(6) + '_t';
    V.client.phone = SF.randomCifra(10);
    V.client.email = SF.randomBukvaSmall(6) + '@' + SF.randomBukvaSmall(4) + '.tes';

    //=========================начинаем писать тест=============================
    SF.get(V.adminURL);
    LF.LoginToBoardAsCustom(V.adminLogin,V.adminPassword);
condition.nowWeDoing = 'создаем реквест 1';
    LF.CreateLocalMovingFromBoard(V.client);
    SF.sleep (2);
    driver.wait(driver.findElement(By.xpath('//a[@ng-click="select(tabs[0])"]')).getText().then(function(text){
        V.Id1 = SF.cleanPrice(text);
    }),config.timeout);
    LF.closeEditRequest ();
condition.nowWeDoing = 'создаем реквест 2';
    V.client = {};
    V.client.name = SF.randomBukva(6) + '_t';
    V.client.fam = SF.randomBukva(6) + '_t';
    V.client.phone = SF.randomCifra(10);
    V.client.email = SF.randomBukvaSmall(6) + '@' + SF.randomBukvaSmall(4) + '.tes';
    LF.CreateLocalMovingFromBoard(V.client);
    SF.sleep (2);
    driver.wait(driver.findElement(By.xpath('//a[@ng-click="select(tabs[0])"]')).getText().then(function(text){
        V.Id2 = SF.cleanPrice(text);
    }),config.timeout);
    LF.closeEditRequest ();
condition.nowWeDoing = 'создаем реквест 3';
    V.client = {};
    V.client.name = SF.randomBukva(6) + '_t';
    V.client.fam = SF.randomBukva(6) + '_t';
    V.client.phone = SF.randomCifra(10);
    V.client.email = SF.randomBukvaSmall(6) + '@' + SF.randomBukvaSmall(4) + '.tes';
    LF.CreateLocalMovingFromBoard(V.client);
    SF.sleep (2);
    driver.wait(driver.findElement(By.xpath('//a[@ng-click="select(tabs[0])"]')).getText().then(function(text){
        V.Id3 = SF.cleanPrice(text);
    }),config.timeout);
    LF.closeEditRequest ();
condition.nowWeDoing = 'создаем реквест 4';
    V.client = {};
    V.client.name = SF.randomBukva(6) + '_t';
    V.client.fam = SF.randomBukva(6) + '_t';
    V.client.phone = SF.randomCifra(10);
    V.client.email = SF.randomBukvaSmall(6) + '@' + SF.randomBukvaSmall(4) + '.tes';
    MF.WaitWhileBusy ();
    SF.click(By.linkText('Create Request'));
    SF.sleep(3);
    SF.click(By.xpath('//div[@class="step1"]//select[@name="move_service_type"]/option[@value="number:1"]'));
    SF.click(By.xpath('//input[@id="edit-move-date-datepicker-popup-0"]'));
    driver.wait(driver.executeScript(JSstep.Click31DaysCalendar).then(function (calDate) {
        V.moveDateLong = calDate;
    }),config.timeout);
    SF.sleep(0.5);
    SF.click(By.xpath('//ul[@class="chosen-choices"]'));
    SF.click(By.xpath('//ul[@class="chosen-results"]/li[@data-option-array-index="1"]'));
    driver.wait(driver.findElement(By.xpath('//input[@ng-model="editrequest.data.field_date"]')).getAttribute("value").then(function(mdate){
        V.mdateLong = (mdate);
    }),config.timeout);
    SF.send(By.id("edit-zip-code-from"), "02032");
    SF.send(By.id("edit-zip-code-to"), "02136");
    SF.sleep(5);
    SF.click(By.xpath('//button[@ng-click="Calculate()"]'));
    SF.sleep(1);
    MF.WaitWhileBusy ();
    SF.sleep(1);
    SF.click(By.xpath('//button[@ng-click="step2 = false;step3 = true;"]'));
    SF.sleep(2);
    SF.send(By.xpath('//div[@class="step3"]//input[@ng-model="editrequest.account.fields.field_user_first_name"]'), V.client.name);
    SF.send(By.xpath('//div[@class="step3"]//input[@ng-model="editrequest.account.fields.field_user_last_name"]'), V.client.fam);
    SF.send(By.xpath('//div[@class="step3"]//input[@ng-model="editrequest.account.mail"]'), V.client.email);
    SF.send(By.xpath('//div[@class="step3"]//input[@ng-model="editrequest.account.fields.field_primary_phone"]'), V.client.phone);
    SF.click(By.xpath('//button[@ng-click="create()"]'));
    MF.EditRequest_WaitForOpenRequest();
    driver.wait(driver.findElement(By.xpath('//a[@ng-click="select(tabs[0])"]')).getText().then(function(text){
        V.Id4Long = SF.cleanPrice(text);
    }),config.timeout);
    LF.closeEditRequest ();
condition.nowWeDoing = 'создаем реквест 5';
    V.client = {};
    V.client.name = SF.randomBukva(6) + '_t';
    V.client.fam = SF.randomBukva(6) + '_t';
    V.client.phone = SF.randomCifra(10);
    V.client.email = SF.randomBukvaSmall(6) + '@' + SF.randomBukvaSmall(4) + '.tes';
    MF.WaitWhileBusy ();
    SF.click(By.linkText('Create Request'));
    SF.sleep(3);
    SF.click(By.xpath('//div[@class="step1"]//select[@name="move_service_type"]/option[@value="number:1"]'));
    SF.click(By.xpath('//input[@id="edit-move-date-datepicker-popup-0"]'));
    driver.wait(driver.executeScript(JSstep.Click31DaysCalendar).then(function (calDate) {
        V.moveDateLong = calDate;
    }),config.timeout);
    SF.sleep(0.5);
    SF.click(By.xpath('//ul[@class="chosen-choices"]'));
    SF.click(By.xpath('//ul[@class="chosen-results"]/li[@data-option-array-index="1"]'));
    driver.wait(driver.findElement(By.xpath('//input[@ng-model="editrequest.data.field_date"]')).getAttribute("value").then(function(mdate){
        V.mdateLong = (mdate);
    }),config.timeout);
    SF.send(By.id("edit-zip-code-from"), "02032");
    SF.send(By.id("edit-zip-code-to"), "02136");
    SF.sleep(5);
    SF.click(By.xpath('//button[@ng-click="Calculate()"]'));
    SF.sleep(1);
    MF.WaitWhileBusy ();
    SF.sleep(1);
    SF.click(By.xpath('//button[@ng-click="step2 = false;step3 = true;"]'));
    SF.sleep(2);
    SF.send(By.xpath('//div[@class="step3"]//input[@ng-model="editrequest.account.fields.field_user_first_name"]'), V.client.name);
    SF.send(By.xpath('//div[@class="step3"]//input[@ng-model="editrequest.account.fields.field_user_last_name"]'), V.client.fam);
    SF.send(By.xpath('//div[@class="step3"]//input[@ng-model="editrequest.account.mail"]'), V.client.email);
    SF.send(By.xpath('//div[@class="step3"]//input[@ng-model="editrequest.account.fields.field_primary_phone"]'), V.client.phone);
    SF.click(By.xpath('//button[@ng-click="create()"]'));
    MF.EditRequest_WaitForOpenRequest();
    driver.wait(driver.findElement(By.xpath('//a[@ng-click="select(tabs[0])"]')).getText().then(function(text){
        V.Id5Long = SF.cleanPrice(text);
    }),config.timeout);
    LF.closeEditRequest ();

condition.nowWeDoing = 'создаем реквест 6';
    V.client = {};
    V.client.name = SF.randomBukva(6) + '_t';
    V.client.fam = SF.randomBukva(6) + '_t';
    V.client.phone = SF.randomCifra(10);
    V.client.email = SF.randomBukvaSmall(6) + '@' + SF.randomBukvaSmall(4) + '.tes';
    MF.WaitWhileBusy ();
    SF.click(By.linkText('Create Request'));
    SF.sleep(3);
    SF.click(By.xpath('//div[@class="step1"]//select[@name="move_service_type"]/option[@value="number:1"]'));
    SF.click(By.xpath('//input[@id="edit-move-date-datepicker-popup-0"]'));
    driver.wait(driver.executeScript(JSstep.Click31DaysCalendar).then(function (calDate) {
        V.moveDateLong = calDate;
    }),config.timeout);
    SF.sleep(0.5);
    SF.click(By.xpath('//ul[@class="chosen-choices"]'));
    SF.click(By.xpath('//ul[@class="chosen-results"]/li[@data-option-array-index="1"]'));
    driver.wait(driver.findElement(By.xpath('//input[@ng-model="editrequest.data.field_date"]')).getAttribute("value").then(function(mdate){
        V.mdateLong = (mdate);
    }),config.timeout);
    SF.send(By.id("edit-zip-code-from"), "02032");
    SF.send(By.id("edit-zip-code-to"), "02136");
    SF.sleep(5);
    SF.click(By.xpath('//button[@ng-click="Calculate()"]'));
    SF.sleep(1);
    MF.WaitWhileBusy ();
    SF.sleep(1);
    SF.click(By.xpath('//button[@ng-click="step2 = false;step3 = true;"]'));
    SF.sleep(2);
    SF.send(By.xpath('//div[@class="step3"]//input[@ng-model="editrequest.account.fields.field_user_first_name"]'), V.client.name);
    SF.send(By.xpath('//div[@class="step3"]//input[@ng-model="editrequest.account.fields.field_user_last_name"]'), V.client.fam);
    SF.send(By.xpath('//div[@class="step3"]//input[@ng-model="editrequest.account.mail"]'), V.client.email);
    SF.send(By.xpath('//div[@class="step3"]//input[@ng-model="editrequest.account.fields.field_primary_phone"]'), V.client.phone);
    SF.click(By.xpath('//button[@ng-click="create()"]'));
    MF.EditRequest_WaitForOpenRequest();
    driver.wait(driver.findElement(By.xpath('//a[@ng-click="select(tabs[0])"]')).getText().then(function(text){
        V.Id6Long = SF.cleanPrice(text);
    }),config.timeout);
    LF.closeEditRequest ();
condition.nowWeDoing = 'получаем текущую дату';
    var d = new Date();
    var options = { month: 'short', day: 'numeric', year: 'numeric' };
    V.createdate = (d.toLocaleDateString('en-US', options));

condition.nowWeDoing = 'идем на реквест пейдж проверять фильтрацию по create date';
    MF.Board_OpenAllRequest();
    SF.clear (By.xpath('//input[@ng-model="dateFrom"]'));
    SF.send (By.xpath('//input[@ng-model="dateFrom"]'), V.createdate);
    SF.clear (By.xpath('//input[@ng-model="dateTo"]'));
    SF.send (By.xpath('//input[@ng-model="dateTo"]'), V.createdate);
    SF.click (By.xpath('//button[@ng-click="GetMonthStats()"]'));
    MF.WaitWhileBusy ();

    driver.wait(driver.findElement(By.xpath('//td[@ng-click="requestEditModal(request)"][contains(text(),"' + V.Id1 + '")]')).getText().then(function (id1) {
        VD.IWant (VD.ToEqual, V.Id1, id1, 'не нашел реквест1 по фильтрации create date')
    }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//td[@ng-click="requestEditModal(request)"][contains(text(),"' + V.Id2 + '")]')).getText().then(function (id2) {
        VD.IWant (VD.ToEqual, V.Id2, id2, 'не нашел реквест2 по фильтрации create date')
    }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//td[@ng-click="requestEditModal(request)"][contains(text(),"' + V.Id3 + '")]')).getText().then(function (id3) {
        VD.IWant (VD.ToEqual, V.Id3, id3, 'не нашел реквест3 по фильтрации create date')
    }),config.timeout);
    SF.sleep (2);

condition.nowWeDoing = 'идем на реквест пейдж проверять фильтрацию по Move date';
    SF.select (By.xpath('//select[@ng-model="dateFields.selected"]'), 2);
    MF.WaitWhileBusy ();
    SF.clear (By.xpath('//input[@ng-model="dateFrom"]'));
    SF.send (By.xpath('//input[@ng-model="dateFrom"]'), V.mdateLong);
    SF.clear (By.xpath('//input[@ng-model="dateTo"]'));
    SF.send (By.xpath('//input[@ng-model="dateTo"]'), V.mdateLong);
    SF.click (By.xpath('//button[@ng-click="GetMonthStats()"]'));
    MF.WaitWhileBusy ();

    driver.wait(driver.findElement(By.xpath('//td[@ng-click="requestEditModal(request)"][contains(text(),"' + V.Id4Long + '")]')).getText().then(function (id4Long) {
        VD.IWant (VD.ToEqual, V.Id4Long, id4Long, 'не нашел реквест4 по фильтрации по Move date')
    }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//td[@ng-click="requestEditModal(request)"][contains(text(),"' + V.Id5Long + '")]')).getText().then(function (id5Long) {
        VD.IWant (VD.ToEqual, V.Id5Long, id5Long, 'не нашел реквест5 по фильтрации по Move date')
    }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//td[@ng-click="requestEditModal(request)"][contains(text(),"' + V.Id6Long + '")]')).getText().then(function (id6Long) {
        VD.IWant (VD.ToEqual, V.Id6Long, id6Long, 'не нашел реквест6 по фильтрации по Move date')
    }),config.timeout);
    SF.sleep(2);
condition.nowWeDoing = 'идем удалять созданные реквесты';
    // MF.Board_OpenRequest (V.Id4Long);
    // LF.deletePendingRequest ();
    // MF.Board_OpenRequest (V.Id5Long);
    // LF.deletePendingRequest ();
    // MF.Board_OpenRequest (V.Id6Long);
    // LF.deletePendingRequest ();
    // SF.select (By.xpath('//select[@ng-model="dateFields.selected"]'), 1);
    // MF.WaitWhileBusy ();
    // SF.clear (By.xpath('//input[@ng-model="dateFrom"]'));
    // SF.send (By.xpath('//input[@ng-model="dateFrom"]'), V.createdate);
    // SF.clear (By.xpath('//input[@ng-model="dateTo"]'));
    // SF.send (By.xpath('//input[@ng-model="dateTo"]'), V.createdate);
    // SF.click (By.xpath('//button[@ng-click="GetMonthStats()"]'));
    // MF.WaitWhileBusy ();
    // MF.Board_OpenRequest (V.Id1);
    // LF.deletePendingRequest ();
    // MF.Board_OpenRequest (V.Id2);
    // LF.deletePendingRequest ();
    // MF.Board_OpenRequest (V.Id3);
    // LF.deletePendingRequest ();
    // MF.Board_LogoutAdmin ();


    //=========================закончили писать тест=============================
    SF.endOfTest();
};
