module.exports = function main(SF, JS, MF, LF, JSstep, VD, V, By, until,FileDetector, system, condition, config,constants) {
    global.fiber = Fiber.current;
    V.client = {};
    V.client.name = SF.randomBukva(6) + '_t';
    V.client.fam = SF.randomBukva(6) + '_t';
    V.client.phone = SF.randomCifra(10);
    V.client.email = SF.randomBukvaSmall(6) + '@' + SF.randomBukvaSmall(4) + '.tes';
    V.client.passwd = 123;
    V.SalesLogin = "jack2@ya.com";
    V.Salespass = ('123');

    //=========================начинаем писать тест=============================
    SF.get(V.frontURL);
condition.nowWeDoing = 'заполняем калькулятор верхний';
    LF.FullSmallCalcAsLocal(V.client);

condition.nowWeDoing = 'первый раз в аккаунте, отправляем смс админу';
    MF.Account_ClickViewRequest();
    MF.WaitWhileBusy();
    SF.sleep(2);
    MF.WaitWhileBusy();
    V.accountNumbers={};
    LF.RememberAccountNumbers(V.accountNumbers);
    LF.addToCleanerJob(V.accountNumbers.Id);
    MF.Account_OpenMessage();
    V.toAdmin = SF.randomBukva(6) + '_toAdmin';
    MF.BoardAccount_SendMessage(V.toAdmin);

    LF.LogoutFromAccount ();
    SF.get(V.adminURL);
    LF.LoginToBoardAsCustom(V.adminLogin,V.adminPassword);
condition.nowWeDoing = 'зашли в админку идем в раздел сообщения на дашборде и смотрим что смс есть от клиента админу';
    MF.Board_OpenSideBar ();
    MF.Board_OpenMessage ();
    SF.click (By.xpath('//tr[@ng-click="showComments(request)"]/td[contains(text(), "'+V.accountNumbers.Id+'")]'));
    MF.WaitWhileBusy ();
    driver.wait(driver.findElement(By.xpath('//span[contains(text(), "'+ V.client.name +'")]/../following-sibling::div[1]//p/p')).getText().then(function (text) {
        VD.IWant (VD.ToEqual, V.toAdmin, text, 'не нашло текст который мы отправили от клиента админу');
    }),config.timeout);
    SF.sleep(1);
    V.toClientFromAdmin = SF.randomBukva(6) + '_toClientFromAdmin';
    MF.BoardAccount_SendMessage(V.toClientFromAdmin);
    MF.Board_OpenDashboard ();
    MF.Board_OpenRequest (V.accountNumbers.Id);
condition.nowWeDoing = 'зашли в реквест';
    MF.EditRequest_OpenClient ();
    LF.SetClientPasswd(V.client.passwd);
    MF.EditRequest_OpenSettings ();
    SF.sleep(2);
    SF.click (By.xpath('//button[contains(text(),"Assign sales person")]'));
    SF.click (By.xpath('//div[@ng-show="::PermissionsServices.hasPermission(\'canSignedSales\');"]//ul[@class="dropdown-menu"]/li/a[contains(text(), "JackSales")]'));
    MF.SweetConfirm();
    SF.sleep (5);
    MF.EditRequest_OpenLogs ();
    MF.EditRequest_Check1EmailExist("info@lmmoving.com", "New Message From "+V.client.name+"");
    MF.EditRequest_Check1EmailExist(V.client.email, "New Message From ");

    LF.closeEditRequest ();
    MF.Board_LogoutAdmin ();
    SF.get(V.accountURL);
    LF.LoginToAccountAsClient (V.client);
    MF.Account_OpenRequest (V.accountNumbers.Id);
    MF.Account_OpenMessage();
    driver.wait(driver.findElement(By.xpath('//a[contains(text(), "'+V.adminName+'")]/following-sibling::span[2]/p/p')).getText().then(function (text) {
        VD.IWant (VD.ToEqual, V.toClientFromAdmin, text, 'не нашло текст который мы отправили клиенту от админа');
    }),config.timeout);
    SF.sleep(1);
    V.toSalesFromClient = SF.randomBukva(6) + '_toSalesFromClient';
    MF.BoardAccount_SendMessage(V.toSalesFromClient);
    LF.LogoutFromAccount ();
    SF.get(V.adminURL);
    LF.LoginToBoardAsCustom (V.SalesLogin, V.Salespass);
condition.nowWeDoing = 'Идем под сейлсом и проверяем что у него есть смс от клиента';
    MF.Board_OpenMessage ();
    SF.click (By.xpath('//tr[@ng-click="showComments(request)"]/td[contains(text(), "'+V.accountNumbers.Id+'")]'));
    MF.WaitWhileBusy ();
    driver.wait(driver.findElement(By.xpath('//span[contains(text(), "'+ V.client.name +'")]/../following-sibling::div[1]//p/p')).getText().then(function (text) {
        VD.IWant (VD.ToEqual, V.toSalesFromClient, text, 'не нашло смс который мы отправили от клиента сейлсу');
    }),config.timeout);
    SF.sleep(1);
    V.toClientFromSales = SF.randomBukva(6) + '_toClientFromSales';
    // JS.scroll ('div[ng-click=\"markAllMessagesAsRead()\"]');
    JS.scroll ('h2:contains("Requests")');
    MF.BoardAccount_SendMessage(V.toClientFromSales);
    LF.LogoutFromBoardForeman ();
    SF.get(V.accountURL);
condition.nowWeDoing = 'Идем под клиентом и проверяем что у него есть смс от сейлса';
    LF.LoginToAccountAsClient (V.client);
    MF.Account_OpenRequest (V.accountNumbers.Id);
    MF.Account_OpenMessage();
    driver.wait(driver.findElement(By.xpath('//a[contains(text(), "JackSales")]/following-sibling::span[2]/p/p')).getText().then(function (text) {
        VD.IWant (VD.ToEqual, V.toClientFromSales, text, 'не нашло текст который мы отправили клиенту от sales');
    }),config.timeout);
    SF.sleep(1);
    // LF.LogoutFromAccount ();

    //=========================закончили писать тест=============================
    SF.endOfTest();
};
