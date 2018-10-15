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
    V.AdditionalEmail = SF.randomBukvaSmall(7) + '@' + SF.randomBukvaSmall(4) + '.adtes';
    V.adminEmailTemperary = 'test.boston@mail.ru';

condition.nowWeDoing = 'создаем мувинг с мувборда';
    SF.get(V.adminURL);
    LF.LoginToBoardAsCustom(V.adminLogin,V.adminPassword);
    LF.CreateLocalMovingFromBoard(V.client);

condition.nowWeDoing = 'создаем адишенал контакт';
    MF.EditRequest_OpenClient();
    LF.EditRequest_AddAdditionalContact(V.AdditionalName, V.AdditionalFam, V.AdditionalEmail, V.AdditionalPhone);
    MF.Account_ClickUpdateClientInModalWindow();
    MF.WaitWhileBusySymbol();
    MF.WaitWhileToaster();
    MF.WaitWhileBusy();
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
    driver.wait(driver.findElement(By.xpath('//div [@ng-repeat="detail in log.details"]//div[@ng-repeat="item in detail.text"]//span [contains (text(), "Mail was sent")]')).getText().then(function(text) {
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
    MF.EditRequest_OpenClient();
    LF.SetClientPasswd(V.client.passwd);
    LF.closeEditRequest();

condition.nowWeDoing = 'проверяем поиск по телефону';
    MF.Board_SearchRequest(V.client.phone);
    V.SearchRequest={};
    SF.sleep(2);
    MF.Board_GetFirstFoundedId(V.SearchRequest);
    VD.IWant (VD.ToEqual, V.boardNumbers.Id, V.SearchRequest.Id, 'не нашло реквест по поиску телефона');
    SF.sleep(1);
    MF.Board_LogoutAdmin();

condition.nowWeDoing = 'Зайти в аккаунт на конфирмейшн и проверить что есть и основной контакт доп телефон и доп контакт, а  также проверить компани полиси что открывается и сенселатион полиси';
    SF.get(V.accountURL);
    LF.LoginToAccountAsClient(V.client);
    MF.Account_OpenRequest(V.boardNumbers.Id);
    MF.Account_ClickViewRequest();
    MF.Account_ClickViewConfirmationPage();
    driver.wait(driver.findElement(By.xpath('//h2[@ng-if="!vm.isCommercial || !vm.commercialName.length"]')).getText().then(function (text) {
        VD.IWant(VD.ToEqual, text.toUpperCase(), (V.client.name + ' '+ V.client.fam).toUpperCase(), 'не нашло или не совпало на конфирмейшине имя и фамилия основного контакта');
    }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//div[@class="phone"]')).getText().then(function (text) {
        VD.IWant(VD.ToEqual, SF.cleanPrice(text), -V.client.phone, 'не нашло или не совпало на конфирмейшине phone основного контакта');
    }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//div[@class="additional-phone"]')).getText().then(function (text) {
        VD.IWant(VD.ToEqual, SF.cleanPrice(text), -1234567890, 'не нашло или не совпало на конфирмейшине additional phone основного контакта');
    }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//div[@class="email"]')).getText().then(function (text) {
        VD.IWant(VD.ToEqual, text, V.client.email, 'не нашло или не совпало на конфирмейшине email основного контакта');
    }),config.timeout);

    driver.wait(driver.findElement(By.xpath('//div[@ng-if="vm.isEmptyFieldAdditionalUser"]/h2')).getText().then(function (text) {
        VD.IWant(VD.ToEqual, text, 'Additional Client Contacts', 'не нашло заголовок адишианл контакта на конфирмейшине');
    }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//span[@class="additional_name_field"]')).getText().then(function (text) {
        VD.IWant(VD.ToEqual, text.toUpperCase(), (V.AdditionalName).toUpperCase(), 'не нашло или не совпало на конфирмейшине имя additional контакта');
    }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//span[@ng-if="vm.request.field_additional_user.last_name"]')).getText().then(function (text) {
        VD.IWant(VD.ToEqual, text.toUpperCase(), (V.AdditionalFam).toUpperCase(), 'не нашло или не совпало на конфирмейшине familiya additional контакта');
    }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//div[@ng-if="vm.request.field_additional_user.phone"]')).getText().then(function (text) {
        VD.IWant(VD.ToEqual, SF.cleanPrice(text), -V.AdditionalPhone, 'не нашло или не совпало на конфирмейшине phone additional контакта');
    }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//div[@ng-if="vm.request.field_additional_user.mail"]')).getText().then(function (text) {
        VD.IWant(VD.ToEqual, text, V.AdditionalEmail, 'не нашло или не совпало на конфирмейшине email additional контакта');
    }),config.timeout);
    MF.AccountConfirmationPage_ClickBackToRequest();
    SF.click(By.xpath('//a[@ng-click="openPolicyModal(\'cancelation\')"]'));
    SF.waitForLocated(By.xpath('//a[@ng-click="cancel()"]'));
    JS.click('a[ng-click="cancel()"]');
    SF.sleep(1.5);
    SF.click(By.xpath('//a[@ng-click="openPolicyModal(\'company\')"]'));
    SF.waitForLocated(By.xpath('//a[@ng-click="cancel()"]'));
    JS.click('a[ng-click="cancel()"]');
    SF.sleep(1);



    SF.endOfTest();
};