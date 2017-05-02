module.exports = function main(SF, JS, MF, LF, JSstep, VD, V, By, until,FileDetector, system, condition, config,constants) {    global.fiber = Fiber.current;
    V.client = {};
    V.client.name = SF.randomBukva(6) + '_t';
    V.client.fam = SF.randomBukva(6) + '_t';
    V.client.phone = SF.randomCifra(10);
    V.client.email = SF.randomBukvaSmall(6) + '@' + SF.randomBukvaSmall(4) + '.tes';

    SF.get(V.adminURL);

    LF.LoginToBoardAsAdmin ();
    condition.nowWeDoing = 'создаем реквест и конфермим его';
    LF.CreateLocalMovingFromBoard(V.client);
    SF.sleep (2);
    V.boardNumbers = {};
    LF.RememberDigitsRequestBoard(V.boardNumbers);
    JS.step(JSstep.selectTruck((V.boardNumbers.LaborTimeMax + V.boardNumbers.TravelTime)/60));
    MF.EditRequest_RememberId(V.request);

    LF.addToCleanerJob(V.request.Id);
    MF.Board_OpenConfirmed ();
    MF.Board_OpenSetAdressToFrom ();
    MF.EditRequest_SaveChanges ();
    MF.EditRequest_OpenSettings();
    MF.EditRequest_SetSaleNumber(2);

    MF.EditRequest_OpenRequest();
    condition.nowWeDoing = 'закрываем работу и переходим в на страницу bill of ladding';

    SF.click (By.xpath('//div[@ng-click="changeSalesClosingTab(\'closing\')"]'));
    JS.waitForNotExist ('div.busyoverlay:visible');
    SF.sleep (0.5);
    SF.clear (By.xpath('//input[@ng-model="invoice.work_time"]'));
    JS.waitForNotExist ('div.busyoverlay:visible');
    SF.send (By.xpath('//input[@ng-model="invoice.work_time"]'), '01:00');
    JS.waitForNotExist ('div.busyoverlay:visible');

    SF.click (By.xpath('//div[@ng-click="closeJob();"]'));
    SF.sleep (8);
    JS.waitForNotExist ('div.busyoverlay:visible');
    JS.waitForNotExist('div.toast-success');
    driver.findElement(By.xpath('//a[contains(@class,"open_button_contract")]')).click();
    SF.sleep (3);
    SF.openTab (1);
    SF.sleep (3);
    JS.waitForNotExist ('div.busyoverlay:visible');
    SF.waitForLocated (By.xpath('//div[@class="sweet-alert showSweetAlert visible"]'));
    SF.click (By.xpath('//button[@class="confirm"]'));
    SF.sleep (0.5);
    SF.click (By.linkText('Bill of lading'));
    SF.sleep (2);
    driver.wait(driver.findElement(By.xpath('//button[@ng-if="data.isSubmitted"]')).getText().then(function(text) {
        VD.IWant (VD.VToEqual, text, 'Job is Done', 'страница бил оф ладинг не загрузилась')
    }),config.timeout);
    SF.endOfTest();
};
