module.exports = function main(SF, JS, MF, LF, JSstep, VD, V, By, until,FileDetector, system, condition, config,constants) {    global.fiber = Fiber.current;

    //=========================начинаем писать тест=============================
    V.NewClient = {};
    V.NewClient.name = SF.randomBukva(6) + '_t';
    V.NewClient.fam = SF.randomBukva(6) + '_t';
    V.NewClient.phone = SF.randomCifra(10);
    V.NewClient.email = SF.randomBukvaSmall(6) + '@' + SF.randomBukvaSmall(4) + '.tes';
    V.NewClient.passwd = 123;

    V.client = {};
    V.client.name = SF.randomBukva(6) + '_t';
    V.client.fam = SF.randomBukva(6) + '_t';
    V.client.phone = SF.randomCifra(10);
    V.client.email = SF.randomBukvaSmall(6) + '@' + SF.randomBukvaSmall(4) + '.tes';
    V.client.passwd = 123;

    condition.nowWeDoing='заполняем верхнюю форму как UnloadingHelp, создаем 1й реквест';
    SF.get(V.frontURL);
    LF.FullSmallCalcAsUnloading(V.NewClient);
    condition.nowWeDoing='зашли первый раз в аккаунт';
    MF.Account_ClickViewRequest();
    MF.WaitWhileBusy();
    SF.sleep(5);

    LF.AccountUnloadingEnterAddress();
    V.req1={};
    LF.RememberAccountNumbers(V.req1);
    LF.addToCleanerJob(V.req1.Id);
    LF.LogoutFromAccount();

    condition.nowWeDoing = 'первый раз в админке, заходим в 1й реквест, запоминаем email';
    SF.get(V.adminURL);
    LF.LoginToBoardAsCustom(V.adminLogin,V.adminPassword);
    MF.WaitWhileBusy();
    SF.sleep(1);
    MF.Board_OpenRequest(V.req1.Id);
    MF.EditRequest_OpenSettings();
    LF.SetManager('emilia');
    MF.EditRequest_OpenClient();
    LF.SetClientPasswd(V.NewClient.passwd);
    MF.EditRequest_OpenRequest();
    LF.closeEditRequest();
    SF.sleep(2);
    MF.Board_LogoutAdmin ();

    condition.nowWeDoing = 'создаём 2й реквест, мувинг с фронта';
    SF.get(V.frontURL);
    LF.FullSmallCalcAsLocal(V.client);
    MF.Account_ClickViewRequest();
    MF.WaitWhileBusy();
    SF.sleep(5);
    MF.Account_ClickPartialPacking();
    LF.AccountLocalEnterAddress();
    MF.WaitWhileBusy();
    V.accountNumbers={};
    LF.RememberAccountNumbers(V.accountNumbers);
    LF.addToCleanerJob(V.accountNumbers.Id);
    LF.LogoutFromAccount();

    condition.nowWeDoing = 'второй раз в админке, заходим во 2й реквест, меняем email';
    SF.get(V.adminURL);
    LF.LoginToBoardAsCustom(V.adminLogin,V.adminPassword);
    MF.Board_OpenRequest(V.accountNumbers.Id);
    MF.EditRequest_OpenClient();
    LF.SetClientPasswd(V.NewClient.passwd);
    SF.clear(By.xpath('//input[@ng-model="client.mail"]'));
    SF.send(By.xpath('//input[@ng-model="client.mail"]'),V.NewClient.email);
    SF.click(By.xpath('//button[@ng-click="update(client)"]'));
    MF.SweetConfirm();
    SF.sleep(3);
    MF.EditRequest_OpenRequest();
    LF.closeEditRequest();
    SF.sleep(3);
    MF.WaitWhileBusy();
    SF.click(By.xpath('//i[@ng-click="vm.refreshDashboard();"]'));
    MF.WaitWhileBusy();
    MF.WaitWhileBusy();

    condition.nowWeDoing = 'Проверяем привязку email к клиенту и изменение имени и фамилии, заходим во 2й реквест';
    MF.Board_OpenRequest(V.accountNumbers.Id);
    MF.WaitWhileBusy();
    MF.EditRequest_OpenClient();
    SF.sleep(1);
    driver.wait(driver.findElement(By.xpath('//input[@ng-model="client.field_user_first_name"]')).getAttribute('value').then(function(text) {
        V.NewName = text;
        VD.IWant(VD.ToEqual, V.NewClient.name, V.NewName,'не поменялся first name');
    }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//input[@ng-model="client.field_user_last_name"]')).getAttribute('value').then(function(text){
        V.NewFam = text;
        VD.IWant(VD.ToEqual, V.NewClient.fam, V.NewFam,'не поменялся last name');
    }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//input[@ng-model="client.mail"]')).getAttribute('value').then(function(text){
        V.NewEmail = text;
        VD.IWant(VD.ToEqual, V.NewClient.email, V.NewEmail,'не поменялся email');
    }),config.timeout);
    Debug.pause();
    MF.EditRequest_OpenRequest();
    LF.closeEditRequest();
    SF.sleep(2);
    MF.Board_LogoutAdmin ();

    condition.nowWeDoing = 'Идем в аккаунт проверить наличие 2х привязанных работ';
    SF.get(V.accountURL);
    LF.LoginToAccountAsClient(V.NewClient);
    MF.WaitWhileBusy();
    driver.wait(driver.findElement(By.xpath('//td[contains(text(), "'+V.req1.Id+'")]')).getText().then(function(text){
    }), config.timeout, 'не наидена 1я работа');
    driver.wait(driver.findElement(By.xpath('//td[contains(text(), "'+V.accountNumbers.Id+'")]')).getText().then(function(text){
    }), config.timeout, 'не наидена 2я работа');


    SF.endOfTest();
};





