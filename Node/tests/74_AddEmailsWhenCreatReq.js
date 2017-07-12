module.exports = function main(SF, JS, MF, LF, JSstep, VD, V, By, until,FileDetector, system, condition, config,constants) {    global.fiber = Fiber.current;
    V.boardNumbers = {};
    V.client = {};
    V.client.name = SF.randomBukva(6) + '_t';
    V.client.fam = SF.randomBukva(6) + '_t';
    V.client.phone = SF.randomCifra(10);
    V.client.email = SF.randomBukvaSmall(6) + '@' + SF.randomBukvaSmall(4) + '.tes';

    SF.get(V.adminURL);
    LF.LoginToBoardAsCustom(V.adminLogin,V.adminPassword);
    SF.sleep (3);

      condition.nowWeDoing = 'создаем ЛД реквест';

    SF.click(By.linkText('Create Request'));
    SF.sleep(5);
    SF.click(By.xpath('//div[@class="step1"]//select[@name="move_service_type"]/option[@value="number:7"]'));
    SF.click(By.xpath('//input[@id="edit-move-date-datepicker-popup-0"]'));
    V.request = {};
    driver.wait(driver.executeScript(JSstep.Click4DaysCalendar).then(function (calDate) {
        V.request.moveDate = calDate;
    }),config.timeout);
    SF.sleep(0.5);
    SF.click(By.xpath('//ul[@class="chosen-choices"]'));
    SF.click(By.xpath('//ul[@class="chosen-results"]/li[@data-option-array-index="1"]'));
    SF.send(By.id("edit-zip-code-from"), "02032");
    SF.send(By.id("edit-zip-code-to"), "90001");
    SF.sleep(4);
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
    SF.click(By.xpath("//div[@ng-click='openMailDialog()']"));
    MF.WaitWhileBusy();
    SF.click(By.xpath('//span[contains(.,"Default")]'));
    SF.sleep(1);
    V.lstde = driver.findElements(By.xpath("//div[@ng-repeat='email in menu.templates']"));
    SF.click(By.xpath('//h4[contains(text(), "Review $50")][1]'));
    SF.sleep(1);
    SF.click(By.xpath('//h4[contains(text(), "Holiday test")][1]'));
    SF.sleep(1);
    SF.click(By.xpath('//div[@ng-hide="isSendEmails"]/a[@ng-click="save()"]'));
    SF.sleep(5);
    SF.click(By.xpath("//button[@ng-click='create()']"));
    SF.waitForVisible(By.xpath('//div[@ng-click="chooseTruck(tid)"]'));
    SF.sleep(4);
    LF.RememberDigitsRequestBoard_Down (V.boardNumbers);
    SF.sleep (1);
    V.request.Id = {};
    driver.wait(driver.findElement(By.xpath('//a[@ng-click="select(tabs[0])"]')).getText().then(function(text){
        V.request.Id = SF.cleanPrice(text);
        LF.addToCleanerJob(V.request.Id);
    }), config.timeout);

    condition.nowWeDoing = 'идём в логи';
    MF.EditRequest_OpenLogs();

    function EditRequest_Check2EmailExist(receiver, Subject) {
        driver.wait(driver.findElements(By.xpath("//div[@class='log-content ng-scope']//span[" +
            'contains(text(),\'Mail was send to "'+receiver+'".\') and ' +
            'contains(text(),\'Subject: "'+Subject+'\')]')).then(function(array){
            VD.IWant(VD.ToEqual, array.length,2,'имейл '+Subject+' не был отправлен на '+receiver+' или отправлен несколько раз');
        }), config.timeout);
    }
    EditRequest_Check2EmailExist(V.adminEmail, "Happy Holiday");
    EditRequest_Check2EmailExist(V.adminEmail, "Thank You");
    SF.endOfTest();
};

