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
    MF.WaitWhileBusy();
    SF.click (By.xpath('//ul[@class="nav nav-pills nav-stacked compose-nav"]/li[3]/a'));
    MF.WaitWhileBusy ();
    driver.actions().mouseMove(driver.findElement(By.xpath('//td[contains(text(), "Rick Pret")]'))).doubleClick().perform();
    SF.sleep (2);
    SF.click (By.linkText('Account'));
    MF.WaitWhileBusy ();
    SF.click (By.xpath('//input[@name="outgoingEmail"]'));
    SF.send (By.xpath('//input[@name="outgoingEmail"]'), V.Outgoingemail);
    MF.WaitWhileBusy ();
    SF.click (By.linkText('Signature'));
    MF.WaitWhileBusy ();
    driver.wait(driver.findElement(By.xpath('//div[@ng-model="request.signature.textSignature"]//p[contains(text(), "ddd")]')).getText().then(function (text) {
        V.SalesSig = text;
    }),config.timeout);
    MF.WaitWhileBusy();
    SF.click(By.xpath('//button[@ng-click="submitted=true; create(createUserRequest)"]'));
    MF.SweetConfirm();
    MF.WaitWhileBusy();
    MF.WaitWhileToaster ();
    MF.WaitWhileToaster ();
    SF.sleep(3);


    condition.nowWeDoing = 'создаем реквест, назначаем нужного менеджера, проверяем Sales Signature и Email сеилса';
    MF.Board_OpenDashboard();
    LF.CreateLocalMovingFromBoard(V.client);
    MF.EditRequest_OpenSettings();
    LF.SetManager('Rick');
    SF.click(By.xpath('//a[@ng-click="select(tabs[0])"]'));
    SF.sleep(2);
    SF.click(By.xpath('//i[@uib-tooltip="Quick send emails"]'));
    MF.WaitWhileBusy();
    SF.click(By.xpath('//span[contains(.,"Default")]'));
    SF.sleep(1);
    SF.click(By.xpath('//h4[contains(text(), "Sales Signature")][1]'));
    SF.sleep(1);
    SF.click(By.xpath('//a[@ng-click="sendEmailsAndClose()"]'));
    MF.WaitWhileToaster();
    MF.WaitWhileBusy();
    MF.EditRequest_OpenLogs();
    MF.WaitWhileBusy();
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
    MF.WaitWhileBusy();

    condition.nowWeDoing = 'идем в департмент, удаляем оутгоинг емаил';
    MF.Board_OpenSettingsDepartment ();
    MF.WaitWhileBusy();
    SF.click (By.xpath('//ul[@class="nav nav-pills nav-stacked compose-nav"]/li[3]/a'));
    MF.WaitWhileBusy ();
    driver.actions().mouseMove(driver.findElement(By.xpath('//td[contains(text(), "Rick Pret")]'))).doubleClick().perform();
    SF.sleep (2);
    SF.click (By.linkText('Account'));
    MF.WaitWhileBusy ();
    SF.click (By.xpath('//input[@name="outgoingEmail"]'));
    SF.clear (By.xpath('//input[@name="outgoingEmail"]'));
    MF.WaitWhileBusy();
    SF.click(By.xpath('//button[@ng-click="submitted=true; create(createUserRequest)"]'));
    MF.SweetConfirm();
    MF.WaitWhileBusy();
    MF.WaitWhileToaster ();



    SF.endOfTest();
};





