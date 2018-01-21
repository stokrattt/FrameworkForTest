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
    MF.Board_ClickCreate();
    MF.CreateRequest_SelectServiceType(1);
    MF.CreateRequest_ClickMoveDateInput();
    driver.wait(driver.executeScript(JSstep.Click31DaysCalendar).then(function (calDate) {
        V.moveDateLong = calDate;
    }),config.timeout);
    SF.sleep(1);
    MF.CreateRequest_SelectExtraRooms(1);
    driver.wait(driver.findElement(By.xpath('//input[@ng-model="editrequest.data.field_date"]')).getAttribute("value").then(function(mdate){
        V.mdateLong = (mdate);
    }),config.timeout);
    MF.FrontSiteDown_SendZipCode('02111', '02136');
    SF.sleep(5);
    MF.CreateRequest_ClickCalculate();
    MF.CreateRequest_ClickContinue();
    MF.CreateRequest_SendClientInfo(V.client);
    MF.CreateRequest_ClickCreate();
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
    MF.Board_ClickCreate();
    MF.CreateRequest_SelectServiceType(1);
    MF.CreateRequest_ClickMoveDateInput();
    driver.wait(driver.executeScript(JSstep.Click31DaysCalendar).then(function (calDate) {
        V.moveDateLong = calDate;
    }),config.timeout);
    SF.sleep(0.5);
    MF.CreateRequest_SelectExtraRooms(1);
    driver.wait(driver.findElement(By.xpath('//input[@ng-model="editrequest.data.field_date"]')).getAttribute("value").then(function(mdate){
        V.mdateLong = (mdate);
    }),config.timeout);
    MF.FrontSiteDown_SendZipCode('02111', '02136');
    SF.sleep(5);
    MF.CreateRequest_ClickCalculate();
    MF.CreateRequest_ClickContinue();
    MF.CreateRequest_SendClientInfo(V.client);
    MF.CreateRequest_ClickCreate();
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
    MF.Board_ClickCreate();
    MF.CreateRequest_SelectServiceType(1);
    MF.CreateRequest_ClickMoveDateInput();
    driver.wait(driver.executeScript(JSstep.Click31DaysCalendar).then(function (calDate) {
        V.moveDateLong = calDate;
    }),config.timeout);
    SF.sleep(0.5);
    MF.CreateRequest_SelectExtraRooms(1);
    driver.wait(driver.findElement(By.xpath('//input[@ng-model="editrequest.data.field_date"]')).getAttribute("value").then(function(mdate){
        V.mdateLong = (mdate);
    }),config.timeout);
    MF.FrontSiteDown_SendZipCode('02111', '02136');
    SF.sleep(5);
    MF.CreateRequest_ClickCalculate();
    MF.CreateRequest_ClickContinue();
    MF.CreateRequest_SendClientInfo(V.client);
    MF.CreateRequest_ClickCreate();
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
    MF.BoardRequestPage_SetStartEndDate(V.createdate,  V.createdate);
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
    MF.BoardRequestPage_SetStartEndDate(V.mdateLong,  V.mdateLong);
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

    //=========================закончили писать тест=============================
    SF.endOfTest();
};
