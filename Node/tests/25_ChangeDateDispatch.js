module.exports = function main(SF, JS, JSstep, VD, V, By, until,FileDetector, system, condition, LF,config,constants){
    global.fiber = Fiber.current;
    V.client = {};
    V.client.name = SF.randomBukva(6) + '_t';
    V.client.fam = SF.randomBukva(6) + '_t';
    V.client.phone = SF.randomCifra(10);
    V.client.email = SF.randomBukvaSmall(6) + '@' + SF.randomBukvaSmall(4) + '.tes';

    //=========================начинаем писать тест=============================

    SF.get(V.adminURL);
    LF.LoginToBoardAsAdmin();
    JS.waitForNotExist ('div.busyoverlay:visible');

condition.nowWeDoing = 'создаем реквест ';

    LF.CreateLocalMovingFromBoard (V.client);
    SF.sleep (2);
    driver.wait(driver.findElement(By.xpath('//a[@ng-click="select(tabs[0])"]')).getText().then(function(text){
        V.request.Id = SF.cleanPrice(text);
        LF.addToCleanerJob(V.request.Id);
    }));
    JS.select ('#edit-status', 3);
    SF.send (By.id('edit-moving-from'), 2342342342424);
    SF.send (By.xpath('//input[@ng-model="request.field_moving_to.thoroughfare"]'), 34654564564);
    V.boardNumbers = {};
    LF.RememberDigitsRequestBoard(V.boardNumbers);
    JS.step(JSstep.selectTruck((V.boardNumbers.LaborTimeMax + V.boardNumbers.TravelTime)/60));
    LF.RememberDateFromRequest(V.boardNumbers);
    JS.click ("button[ng-click=\\\"UpdateRequest()\\\"]");
    SF.waitForVisible (By.xpath('//button[@ng-click="update(request)"]'));
    SF.click (By.xpath('//button[@ng-click="update(request)"]'));
    SF.sleep (2);
    JS.waitForNotExist ('div.busyoverlay:visible');
    JS.waitForNotExist('div.toast-success');
    SF.click(By.xpath('//div[@ng-click="changeSalesClosingTab(\'closing\')"]'));
    SF.sleep(2);
    LF.closeEditRequest();
condition.nowWeDoing = 'идем в локал диспач и меняем дату';
    SF.click (By.xpath('//button[@ng-click="toggleLeft()"]'));
    SF.click (By.xpath('//a[@ng-click="vm.goToPage(\'dispatch.local\', \'\')"]'));
    SF.sleep (7);
    SF.waitForLocated(By.xpath('//a[@class="ui-datepicker-next ui-corner-all"]'));
    LF.findDayInLocalDispatch(V.boardNumbers.moveDate.Year,V.boardNumbers.moveDate.Month,V.boardNumbers.moveDate.Day);
    JS.waitForNotExist('div.busyoverlay:visible');
    SF.sleep(1);
    SF.click(By.xpath('//i[contains(@ng-click,"view.grid = true;")]'));
    LF.OpenRequestDispatch (V.request.Id);
    JS.waitForExist('label:contains("Balance:"):visible');
    SF.click(By.xpath('//div[@ng-click="changeSalesClosingTab(\'sales\')"]'));
    SF.sleep(2);

    SF.click (By.xpath('//input[@ng-model="moveDateInput"]'));
    driver.wait(driver.executeScript(JSstep.Click8DaysCalendar),config.timeout);
    SF.sleep (4);
    LF.RememberDateFromRequest(V.boardNumbers);
    SF.sleep(4);
    JS.waitForExist('label:contains("Balance:"):visible');
    JS.step(JSstep.selectTruck((V.boardNumbers.LaborTimeMax + V.boardNumbers.TravelTime)/60));
    SF.waitForVisible (By.xpath('//div[@class="sweet-alert showSweetAlert visible"]'));
    SF.click (By.xpath('//button[@class="confirm"]'));
    JS.click ("button[ng-click=\\\"UpdateRequest()\\\"]");
    SF.waitForVisible (By.xpath('//button[@ng-click="update(request)"]'));
    SF.click (By.xpath('//button[@ng-click="update(request)"]'));
    SF.sleep (2);
    JS.waitForNotExist ('div.busyoverlay:visible');
    JS.waitForNotExist('div.toast-success');
    SF.click(By.xpath('//div[@ng-click="changeSalesClosingTab(\'closing\')"]'));
    SF.sleep(2);
    LF.closeEditRequest();

condition.nowWeDoing = 'ищем второй раз в диспатче реквест с другой датой и проверяем поменялась ли она, если не открылся реквест значит его там нету и дата не поменялась';

    SF.waitForLocated(By.xpath('//a[@class="ui-datepicker-next ui-corner-all"]'));
    LF.findDayInLocalDispatch(V.boardNumbers.moveDate.Year,V.boardNumbers.moveDate.Month,V.boardNumbers.moveDate.Day);
    JS.waitForNotExist('div.busyoverlay:visible');
    SF.sleep(1);
    SF.click(By.xpath('//i[contains(@ng-click,"view.grid = true;")]'));
    LF.OpenRequestDispatch (V.request.Id);
    JS.waitForExist('label:contains("Balance:"):visible');
    LF.closeEditRequest();
    LF.LogoutFromBoardAdmin ();


    //=========================закончили писать тест=============================
    SF.endOfTest();
};
