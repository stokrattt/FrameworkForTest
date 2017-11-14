module.exports = function main(SF, JS, MF, LF, JSstep, VD, V, By, until,FileDetector, system, condition, config,constants) {
    global.fiber = Fiber.current;
    V.client = {};
    V.client.name = SF.randomBukva(6) + '_t';
    V.client.fam = SF.randomBukva(6) + '_t';
    V.client.phone = SF.randomCifra(10);
    V.client.email = SF.randomBukvaSmall(6) + '@' + SF.randomBukvaSmall(4) + '.tes';
    V.Outgoingemail = SF.randomBukvaSmall(8) + '@' + SF.randomBukvaSmall(4) + '.rrr';
    V.SalesSignature = SF.randomBukva(6) + '_t';

    SF.get(V.adminURL);

condition.nowWeDoing = 'идем в департмент, заходим за сеилса, добавляем outgoing email, проверяем Signature';
    LF.LoginToBoardAsCustom(V.adminLogin,V.adminPassword);
    MF.Board_OpenSettingsDepartment ();
    MF.Department_OpenSales();
    MF.Department_OpenHuman('Rick Pret');
    MF.Department_User_OpenAccount();
    SF.click (By.xpath('//input[@name="outgoingEmail"]'));
    SF.send (By.xpath('//input[@name="outgoingEmail"]'), V.Outgoingemail);
    MF.WaitWhileBusy ();
    SF.click (By.linkText('Signature'));
    MF.WaitWhileBusy ();
    driver.wait(driver.findElement(By.xpath('//div[@ng-model="request.signature.textSignature"]//p[contains(text(), "ddd")]')).getText().then(function (text) {
        V.SalesSig = text;
    }),config.timeout);
    MF.Department_SaveUser();
    MF.WaitWhileToaster ();
    SF.sleep(3);

condition.nowWeDoing = 'создаем реквест, назначаем нужного менеджера, проверяем Sales Signature и Email сеилса';
    LF.CreateLocalMovingFromBoard(V.client);
    MF.EditRequest_OpenSettings();
    LF.SetManager('Rick');
    MF.EditRequest_OpenRequest();
    SF.click(By.xpath('//span[@class="quick-send-emails"]'));
    MF.WaitWhileBusy();
    SF.click(By.xpath('//span[contains(.,"Default")]'));
    SF.sleep(1);
    SF.click(By.xpath('//h4[contains(text(), "Sales Signature")][1]'));
    SF.sleep(1);
    MF.EditRequest_MailDialog_ClickSend();
    MF.WaitWhileToaster();
    MF.EditRequest_OpenLogs();
    SF.click(By.xpath('//i[@ng-show="!allLogsShow[allLogsIndex]"][1]'));
    driver.wait(driver.findElement(By.xpath('//p[contains(text(),"'+V.SalesSig+'")]')).getText().then(function(text) {
        V.SignatReq = text;
        VD.IWant(VD.ToEqual, V.SalesSig, V.SignatReq,'не совпала или нет Signature');
    }),config.timeout);
    SF.sleep(2);
   driver.wait(driver.findElement(By.xpath('//span[@ng-bind-html="toTrustedHTML(item.text)"]')).getText().then(function(text) {
        V.OutgoingLogEmail = text;
        VD.IWant(VD.ToEqual, V.OutgoingLogEmail,('Mail was send to "'+V.client.email+'". From "'+V.Outgoingemail+'". Subject: "Sales Signature"'),'не совпал оугоинг емаил');
    }),config.timeout);
    SF.sleep(2);
    LF.closeEditRequest();

condition.nowWeDoing = 'идем в департмент, удаляем оутгоинг емаил';
    MF.Board_OpenSettingsDepartment ();
    MF.Department_OpenSales();
    MF.Department_OpenHuman('Rick Pret');
    MF.Department_User_OpenAccount();
    SF.click (By.xpath('//input[@name="outgoingEmail"]'));
    SF.clear (By.xpath('//input[@name="outgoingEmail"]'));
    MF.Department_SaveUser();

    SF.endOfTest();
};





