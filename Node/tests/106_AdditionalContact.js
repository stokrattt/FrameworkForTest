module.exports = function main(SF, JS, MF, LF, JSstep, VD, V, By, until,FileDetector, system, condition, config,constants) {
    global.fiber = Fiber.current;
    V.client = {};
    V.client.name = SF.randomBukva(6) + '_t';
    V.client.fam = SF.randomBukva(6) + '_t';
    V.client.phone = SF.randomCifra(10);
    V.client.email = SF.randomBukvaSmall(6) + '@' + SF.randomBukvaSmall(4) + '.tes';
    V.client.passwd = 123;
    V.AdditionalName = SF.randomBukva(7) + '_t';
    V.AdditionalFam = SF.randomBukva(7) + '_t';
    V.AdditionalPhone = SF.randomCifra(10);
    V.AdditionalEmail = SF.randomBukvaSmall(7) + '@' + SF.randomBukvaSmall(4) + '.tes';
    V.adminEmailTemperary = 'test.boston@mail.ru';

condition.nowWeDoing = 'создаем мувинг с фронта';
    SF.get(V.adminURL);
    LF.LoginToBoardAsCustom(V.adminLogin,V.adminPassword);
    LF.CreateLocalMovingFromBoard(V.client);

condition.nowWeDoing = 'создаем адишенал контакт';
    MF.EditRequest_OpenClient();
    SF.click(By.xpath('//i[@class="icon-user-follow"]'));
    SF.send(By.xpath('//input[@ng-model="request.field_additional_user.first_name"]'),V.AdditionalName);
    SF.send(By.xpath('//input[@ng-model="request.field_additional_user.last_name"]'),V.AdditionalFam);
    SF.send(By.xpath('//input[@ng-model="request.field_additional_user.mail"]'),V.AdditionalEmail);
    SF.send(By.xpath('//input[@ng-model="request.field_additional_user.phone"]'),V.AdditionalPhone);
    SF.click(By.xpath('//button[@ng-click="saveAddContact()"]'));
    MF.WaitWhileToaster();
    MF.EditRequest_OpenRequest();
    V.boardNumbers = {};
    LF.RememberDigitsRequestBoard(V.boardNumbers);
    JS.step(JSstep.selectTruck((V.boardNumbers.LaborTimeMax + V.boardNumbers.TravelTime)/60));
    MF.WaitWhileBusy();
    MF.EditRequest_SetToNotConfirmed();

condition.nowWeDoing = 'включяем отправку писем адишенал контакту, конфермим, поверяем в логах, что письма отправились 2м';
    MF.EditRequest_OpenClient();
    SF.click(By.xpath('//input[@ng-change="switchAdditionalEmail()"]/following-sibling::span'));
    SF.click(By.xpath('//button[@ng-click="updateAddContact()"]'));
    MF.WaitWhileToaster();
    MF.EditRequest_OpenRequest();
    MF.EditRequest_SetAdressToFrom ();
    MF.EditRequest_ChangeStatusRequest(3);
    MF.EditRequest_SaveChanges();
    MF.EditRequest_OpenLogs();
    driver.wait(driver.findElement(By.xpath('//div [@ng-repeat="detail in log.details"]//span [contains (@class,"lot-numbers-item")]')).getText().then(function(text) {
        V.Check2EmailForUsers = text;
        VD.IWant(VD.ToEqual, V.Check2EmailForUsers,('Mail was sent to "'+V.client.email+'", "'+V.AdditionalEmail+'" . From "'+V.adminEmailTemperary+'". Subject: "Request Local Quote (Confirmed)"'),'Письма не отправилтсь на 2 почты');
    }),config.timeout);
    SF.sleep(1);

condition.nowWeDoing = 'отправиляем письмо вручную, и проверяем лог';
    MF.EditRequest_OpenRequest();
    MF.CreateRequest_OpenMailDialog();
    SF.click(By.xpath('//span[contains(.,"Default")]'));
    SF.sleep(1);
    SF.click(By.xpath('//h4[contains(text(), "Sales Signature")][1]'));
    SF.sleep(1);
    MF.EditRequest_MailDialog_ClickSend();
    MF.WaitWhileToaster();
    MF.EditRequest_OpenLogs();
    driver.wait(driver.findElement(By.xpath('//span[@ng-bind-html="toTrustedHTML(item.text)"]')).getText().then(function(text) {
        V.ManualEmailSend = text;
        VD.IWant(VD.ToEqual, V.ManualEmailSend,('Mail was sent to "'+V.client.email+'", "'+V.AdditionalEmail+'" . From "'+V.adminEmailTemperary+'". Subject: "Sales Signature"'),'не отправились письма после ручного выбора писем');
    }),config.timeout);
    SF.sleep(2);

    SF.endOfTest();
};