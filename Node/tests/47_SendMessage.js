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
    V.accountNumbers={};
    LF.RememberAccountNumbers(V.accountNumbers);
    // LF.addToCleanerJob(V.accountNumbers.Id);
    MF.Account_OpenMessage();
    V.toAdmin = SF.randomBukva(6) + '_toAdmin';
    MF.BoardAccount_SendMessage(V.toAdmin);
    SF.sleep(1);
    LF.LogoutFromAccount ();
    SF.get(V.adminURL);
    LF.LoginToBoardAsCustom(V.adminLogin,V.adminPassword);

condition.nowWeDoing = 'зашли в админку идем в раздел сообщения на дашборде и смотрим что смс есть от клиента админу, ' +
    'также проверяем что в главной табе уменьшиться число сообщений после прочтения';
    driver.wait(driver.findElement(By.xpath('//div[@ng-click="vm.select(1)"]//span[1]')).getText().then(function (text) {
        V.ChisloSMSdoProchteniya = text;
    }),config.timeout);
    MF.Board_OpenSideBar ();
    MF.Board_OpenMessage ();
    SF.click (By.xpath('//tr[@ng-click="showComments(request)"]/td[contains(text(), "'+V.accountNumbers.Id+'")]'));
    MF.WaitWhileBusy ();
    driver.wait(driver.findElement(By.xpath('//span[contains(text(), "'+ V.client.name +'")]/../following-sibling::div[1]//p/p')).getText().then(function (text) {
        VD.IWant (VD.ToEqual, V.toAdmin, text, 'не нашло текст который мы отправили от клиента админу');
    }),config.timeout);
    V.toClientFromAdmin = SF.randomBukva(6) + '_toClientFromAdmin';
    MF.BoardAccount_SendMessage(V.toClientFromAdmin);
    MF.WaitWhileBusy();
    SF.click(By.xpath('//span[contains(text(), "'+ V.client.name +'")]/../following-sibling::div[1]//p/p'));
    MF.Board_OpenDashboard ();
    driver.wait(driver.findElement(By.xpath('//div[@ng-click="vm.select(1)"]//span[1]')).getText().then(function (text) {
        VD.IWant(VD.NotToEqual, V.ChisloSMSdoProchteniya, text, 'после прочтения сообщения в главной табе на дашборде не изменилось число');
    }),config.timeout);
    MF.Board_OpenRequest (V.accountNumbers.Id);

condition.nowWeDoing = 'зашли в реквест';
    MF.EditRequest_OpenClient ();
    LF.SetClientPasswd(V.client.passwd);
    MF.EditRequest_OpenSettings ();
    SF.sleep(2);
    LF.SetManager('JackSales');
    MF.EditRequest_OpenLogs ();
    MF.EditRequest_Check1EmailExist("test.boston@mail.ru", "New Message From "+V.client.name+"");
    MF.EditRequest_Check1EmailExist(V.client.email, "New Message From ");
    condition.nowWeDoing = 'проверяем красный кружочек о новом сообщении';
       driver.wait(driver.findElement(By.xpath('//span[@ng-show="request.messages"]')).getText().then(function (text) {
    }),config.timeout);
    LF.closeEditRequest ();
    MF.WaitWhileToaster();
    MF.Board_LogoutAdmin ();
    SF.get(V.accountURL);
    LF.LoginToAccountAsClient (V.client);
    MF.Account_OpenRequest (V.accountNumbers.Id);
    MF.Account_OpenMessage();
    driver.wait(driver.findElement(By.xpath('//p[contains(text(), "'+V.toClientFromAdmin+'")]')).getText().then(function (text) {
        VD.IWant (VD.ToEqual, V.toClientFromAdmin, text, 'не нашло текст который мы отправили клиенту от админа');
    }),config.timeout);
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
    V.toClientFromSales = SF.randomBukva(6) + '_toClientFromSales';
    JS.scroll ('h2:contains("Requests")');
    MF.BoardAccount_SendMessage(V.toClientFromSales);
    MF.Board_OpenDashboard ();
    MF.Board_OpenRequest (V.accountNumbers.Id);
    MF.EditRequest_OpenLogs();
    MF.EditRequest_Check1EmailExist(V.client.email, "New Message From JackSales");
    LF.closeEditRequest();
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

    //=========================закончили писать тест=============================
    SF.endOfTest();
};
