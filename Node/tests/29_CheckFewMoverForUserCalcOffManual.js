module.exports = function main(SF, JS, MF, LF, JSstep, VD, V, By, until,FileDetector, system, condition, config,constants) {
    global.fiber = Fiber.current;
    V.client = {};
    V.client.name = SF.randomBukva(6) + '_t';
    V.client.fam = SF.randomBukva(6) + '_t';
    V.client.phone = SF.randomCifra(10);
    V.client.email = SF.randomBukvaSmall(6) + '@' + SF.randomBukvaSmall(4) + '.tes';

    //=========================начинаем писать тест=============================
    SF.get(V.adminURL);
    LF.LoginToBoardAsCustom(V.adminLogin,V.adminPassword);
    LF.CreateMovAndStorFromBoard(V.client);
    MF.EditRequest_OpenClient ();
    driver.wait(driver.findElement(By.xpath('//a[@ng-click="select(tabs[0])"]')).getText().then(function(text){
        V.request.Id1 = SF.cleanPrice(text);
        LF.addToCleanerJob(V.request.Id1);
    }), config.timeout);
    LF.closeEditRequest ();
    LF.CreateLoadingHelpFromBoard(V.client);
    driver.wait(driver.findElement(By.xpath('//a[@ng-click="select(tabs[0])"]')).getText().then(function(text){
        V.request.Id2 = SF.cleanPrice(text);
        LF.addToCleanerJob(V.request.Id2);
    }), config.timeout);
    LF.closeEditRequest ();
    LF.CreateLocalMovingFromBoard(V.client);
    driver.wait(driver.findElement(By.xpath('//a[@ng-click="select(tabs[0])"]')).getText().then(function(text){
        V.request.Id2 = SF.cleanPrice(text);
        LF.addToCleanerJob(V.request.Id2);
    }), config.timeout);
    MF.EditRequest_OpenClient ();
    SF.sleep (3);
    driver.wait(driver.executeScript('return $("div:contains(\\"All Moves\\") tbody.ng-scope tr").length').then(function (length) {
        VD.IWant (VD.VToEqual, length, '3', 'на вкладке клиент нету всех работ данного юзера');
        console.log (length);
    }),config.timeout);
    SF.sleep(2);
    MF.EditRequest_OpenRequest ();
    SF.sleep(1);
    SF.click(By.xpath('//input[@ng-model="request.maximum_time.value"]'));
    SF.click(By.xpath('//li[@class="ui-timepicker-selected"]/following-sibling::li[2]'));
    SF.waitForVisible(By.xpath('//h2[contains(text(),"Are you sure you want set time manualy?")]'));
    SF.click(By.xpath('//button[contains(text(),"Yes, lel\'s do it!")]'));
    SF.sleep(1);
    // LF.closeEditRequest ();
    // MF.Board_LogoutAdmin ();

    //=========================закончили писать тест=============================
    SF.endOfTest();
};