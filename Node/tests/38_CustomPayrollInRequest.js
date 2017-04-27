module.exports = function main(SF, JS, JSstep, VD, V, By, until, FileDetector, system, condition, LF, config, constants) {
    global.fiber = Fiber.current;

    //=========================начинаем писать тест=============================
    V.client = {};
    V.client.name = SF.randomBukva(6) + '_t';
    V.client.fam = SF.randomBukva(6) + '_t';
    V.client.phone = SF.randomCifra(10);
    V.client.email = SF.randomBukvaSmall(6) + '@' + SF.randomBukvaSmall(4) + '.tes';
    V.client.passwd = 123;

    condition.nowWeDoing = 'создать local Moving реквест с борда';
    SF.get(V.adminURL);

    LF.LoginToBoardAsAdmin();
    LF.CreateLocalMovingFromBoard(V.client);

    condition.nowWeDoing = 'Законфёрмить сразу реквест';
    V.boardNumbers = {};
    LF.addInventoryBoard ();
    LF.RememberDigitsRequestBoard(V.boardNumbers);
    LF.addToCleanerJob(V.boardNumbers.Id);
    JS.step(JSstep.selectTruck((V.boardNumbers.LaborTimeMax + V.boardNumbers.TravelTime) / 60));
    JS.scroll('div.ServicesCost:visible');

    SF.select(By.xpath('//select[@id="edit-status"]'), 3);
    SF.send(By.xpath('//input[@ng-model="request.field_moving_from.thoroughfare"]'),'Address From');
    SF.send(By.xpath('//input[@ng-model="request.field_moving_to.thoroughfare"]'),'Address To');
    JS.click('button[ng-click=\\"UpdateRequest()\\"]');
    JS.waitForExist('button[ng-click="update(request)"]:visible');
    SF.click(By.xpath('//button[@ng-click="update(request)"]'));
    JS.waitForExist('div.toast-success:visible');
    JS.waitForNotExist('div.busyoverlay:visible');
    SF.click(By.xpath('//div[@ng-click="changeSalesClosingTab(\'closing\')"]'));
    SF.clear(By.xpath('//input[@ng-model="invoice.work_time"]'));
    SF.send(By.xpath('//input[@ng-model="invoice.work_time"]'),'02:00');
    SF.click(By.xpath('//div[@ng-click="closeJob();"]'));
    JS.waitForExist('div.toast-success:visible');
    JS.waitForNotExist('div.busyoverlay:visible');

    condition.nowWeDoing = 'добавить в пейролл людей и закрыть';
    SF.click(By.xpath('//div[@ng-click="openSalaryCommisionModal();"]'));
    JS.waitForExist('button[ng-click="reSubmitPayroll()"]');
    SF.click(By.xpath('//div[@ng-click="addWorker(\'salesPerson\')"]'));
    SF.select(By.xpath('//select[@ng-model="selected.salesPerson[salesPersonIndex]"]'),6070);
    SF.click(By.xpath('//a[@ng-click="select(tabs[1])"][contains(text(),"Foremen")]'));
    SF.click(By.xpath('//div[@ng-click="addWorker(\'foreman\')"]'));
    SF.select(By.xpath('//select[@ng-model="selected.foreman[foremanIndex]"]'),6204);
    SF.sleep(2);
    SF.click(By.xpath('//button[@ng-click="reSubmitPayroll()"]'));
    SF.sleep(2);
    SF.click(By.xpath('//button[@class="confirm"]'));
    JS.waitForExist('div.sa-success:visible');
    SF.sleep(1);
    SF.click(By.xpath('//div[@class="modal-footer"]/button[@ng-click="cancel()"]'));
    SF.sleep(1);
    LF.closeEditRequest();

    condition.nowWeDoing = 'снова открыть и найти людей';
    SF.click(By.xpath('//div[@ng-click="vm.select(2)"]'));
    SF.click(By.xpath('//i[@ng-click="vm.refreshDashboard();"]'));
    SF.sleep(1);
    JS.waitForNotExist('div.busyoverlay:visible');
    SF.sleep(1);
    LF.OpenRequest(V.boardNumbers.Id);
    SF.click(By.xpath('//div[@ng-click="openSalaryCommisionModal();"]'));
    JS.waitForExist('button[ng-click="reSubmitPayroll()"]');
    driver.wait(driver.executeScript('return $(\'select[ng-model="selected.salesPerson[salesPersonIndex]"]:visible  option[selected="selected"]:contains("emilia")\').length;')
        .then(function(count){
            V.countSales=count;
        }),config.timeout);
    VD.IWant(VD.VToEqual, V.countSales, 1,'не сохранился Sale');
    SF.click(By.xpath('//a[@ng-click="select(tabs[1])"][contains(text(),"Foremen")]'));
    driver.wait(driver.executeScript('return $(\'select[ng-model="selected.foreman[foremanIndex]"]:visible  option[selected="selected"]:contains("Test Foreman")\').length;')
        .then(function(count){
            V.countForeman=count;
        }),config.timeout);
    VD.IWant(VD.VToEqual, V.countForeman, 1,'не сохранился Foreman');

    //=========================закончили писать тест=============================
    SF.endOfTest();
};