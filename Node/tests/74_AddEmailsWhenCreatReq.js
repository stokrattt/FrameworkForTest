module.exports = function main(SF, JS, MF, LF, JSstep, VD, V, By, until,FileDetector, system, condition, config,constants) {    global.fiber = Fiber.current;
    V.boardNumbers = {};
    V.client = {};
    V.client.name = SF.randomBukva(6) + '_t';
    V.client.fam = SF.randomBukva(6) + '_t';
    V.client.phone = SF.randomCifra(10);
    V.client.email = SF.randomBukvaSmall(6) + '@' + SF.randomBukvaSmall(4) + '.tes';

    SF.get(V.adminURL);
    LF.LoginToBoardAsCustom(V.adminLogin,V.adminPassword);

condition.nowWeDoing = 'создаем ЛД реквест';

    MF.Board_ClickCreate();
    MF.CreateRequest_SelectServiceType(7);
    MF.CreateRequest_ClickMoveDateInput();
    V.request = {};
    driver.wait(driver.executeScript(JSstep.Click4DaysCalendar).then(function (calDate) {
        V.request.moveDate = calDate;
    }),config.timeout);
    SF.sleep(0.5);
    MF.CreateRequest_SelectExtraRooms(1);
    MF.CreateRequest_SendZipToZipFrom("02032", "90001");
    MF.CreateRequest_ClickCalculate();
    MF.CreateRequest_ClickContinue();
    MF.CreateRequest_SendClientInfo(V.client);
    MF.CreateRequest_OpenMailDialog();

    condition.nowWeDoing = 'добавляем письма';
    SF.click(By.xpath('//span[contains(.,"Default")]'));
    SF.sleep(1);
    SF.click(By.xpath('//h4[contains(text(), "Review $50")][1]'));
    SF.sleep(1);
    SF.click(By.xpath('//h4[contains(text(), "Holiday test")][1]'));
    SF.sleep(1);
    SF.click(By.xpath('//div[@ng-hide="isSendEmails"]/a[@ng-click="save()"]'));
    SF.sleep(5);
    MF.CreateRequest_ClickCreate();
    V.request.Id = {};
    driver.wait(driver.findElement(By.xpath('//a[@ng-click="select(tabs[0])"]')).getText().then(function(text){
        V.request.Id = SF.cleanPrice(text);
        LF.addToCleanerJob(V.request.Id);
    }), config.timeout);

    condition.nowWeDoing = 'идём в логи';
    MF.EditRequest_OpenLogs();
    MF.EditRequest_Check1EmailExist(V.client.email, "Happy Holiday");
    MF.EditRequest_Check1EmailExist(V.client.email, "Thank You");
    SF.sleep(2);

    SF.endOfTest();
};

