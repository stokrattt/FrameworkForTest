module.exports = function main(SF, JS, MF, LF, JSstep, VD, V, By, until,FileDetector, system, condition, config,constants) {    global.fiber = Fiber.current;
    V.client = {};
    V.client.name = SF.randomBukva(6) + '_t';
    V.client.fam = SF.randomBukva(6) + '_t';
    V.client.phone = SF.randomCifra(10);
    V.client.email = SF.randomBukvaSmall(6) + '@' + SF.randomBukvaSmall(4) + '.tes';

    //=========================начинаем писать тест=============================
    SF.get(V.adminURL);
    LF.LoginToBoardAsAdmin();
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
    LF.CreateLocalMovingFromBoard(V.client);
    SF.sleep (2);
    driver.wait(driver.findElement(By.xpath('//a[@ng-click="select(tabs[0])"]')).getText().then(function(text){
        V.Id4 = SF.cleanPrice(text);
    }),config.timeout);
    LF.closeEditRequest ();
condition.nowWeDoing = 'создаем реквест 5';
    V.client = {};
    V.client.name = SF.randomBukva(6) + '_t';
    V.client.fam = SF.randomBukva(6) + '_t';
    V.client.phone = SF.randomCifra(10);
    V.client.email = SF.randomBukvaSmall(6) + '@' + SF.randomBukvaSmall(4) + '.tes';
    LF.CreateLocalMovingFromBoard(V.client);
    SF.sleep (2);
    driver.wait(driver.findElement(By.xpath('//a[@ng-click="select(tabs[0])"]')).getText().then(function(text){
        V.Id5 = SF.cleanPrice(text);
    }),config.timeout);
    LF.closeEditRequest ();
condition.nowWeDoing = 'идем на реквест пейдж проверять фильтрацию';
    MF.Board_OpenAllRequest();
    SF.select (By.xpath('//select[@ng-model="dateFields.selected"]'), 2);
    MF.WaitWhileBusy ();
    SF.clear (By.xpath('//input[@ng-model="dateFrom"]'));
    SF.send (By.xpath('//input[@ng-model="dateFrom"]'), V.request.mdate);
    SF.clear (By.xpath('//input[@ng-model="dateTo"]'));
    SF.send (By.xpath('//input[@ng-model="dateTo"]'), V.request.mdate);
    SF.click (By.xpath('//button[@ng-click="GetMonthStats()"]'));
    MF.WaitWhileBusy ();

    driver.wait(driver.findElement(By.xpath('//td[@ng-click="requestEditModal(request)"][contains(text(),"' + V.Id1 + '")]')).getText().then(function (id1) {
        VD.IWant (VD.VToEqual, V.Id1, id1, 'не нашел реквест по фильтрации1')
    }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//td[@ng-click="requestEditModal(request)"][contains(text(),"' + V.Id2 + '")]')).getText().then(function (id2) {
        VD.IWant (VD.VToEqual, V.Id2, id2, 'не нашел реквест по фильтрации2')
    }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//td[@ng-click="requestEditModal(request)"][contains(text(),"' + V.Id3 + '")]')).getText().then(function (id3) {
        VD.IWant (VD.VToEqual, V.Id3, id3, 'не нашел реквест по фильтрации3')
    }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//td[@ng-click="requestEditModal(request)"][contains(text(),"' + V.Id4 + '")]')).getText().then(function (id4) {
        VD.IWant (VD.VToEqual, V.Id4, id4, 'не нашел реквест по фильтрации4')
    }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//td[@ng-click="requestEditModal(request)"][contains(text(),"' + V.Id5 + '")]')).getText().then(function (id5) {
        VD.IWant (VD.VToEqual, V.Id5, id5, 'не нашел реквест по фильтрации5')
    }),config.timeout);
condition.nowWeDoing = 'идем удалять созданные реквесты';
    LF.OpenRequest (V.Id1);
    LF.deletePendingRequest ();
    LF.OpenRequest (V.Id2);
    LF.deletePendingRequest ();
    LF.OpenRequest (V.Id3);
    LF.deletePendingRequest ();
    LF.OpenRequest (V.Id4);
    LF.deletePendingRequest ();
    LF.OpenRequest (V.Id5);
    LF.deletePendingRequest ();
    LF.LogoutFromBoardAdmin ();

    //=========================закончили писать тест=============================
    SF.endOfTest();
};
