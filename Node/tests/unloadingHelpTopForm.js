module.exports = function main(SF, JS, JSstep, VD, V, By, until,FileDetector, system, condition, LF, config,constants){
    global.fiber = Fiber.current;

    //=========================начинаем писать тест=============================
    V.clientWithRes = {};
    V.clientWithRes.name = SF.randomBukva(6) + '_t';
    V.clientWithRes.fam = SF.randomBukva(6) + '_t';
    V.clientWithRes.phone = SF.randomCifra(10);
    V.clientWithRes.email = SF.randomBukvaSmall(6) + '@' + SF.randomBukvaSmall(4) + '.tes';
    V.clientWithRes.passwd = 123;

    condition.nowWeDoing='заполняем верхнюю форму как UnloadingHelp';
    SF.get(V.frontURL);
    LF.FullSmallCalcAsUnloading(V.clientWithRes);
    JS.waitForExist('ultrasmall-form #congrats_menu[style="right: 0px;"] a:contains("Proceed To View Your Quote")');
    JS.link('ultrasmall-form a:contains("Proceed To View Your Quote")');
    condition.nowWeDoing='зашли первый раз в аккаунт';
    SF.click(By.xpath('//button[@ng-click="cancel()"][contains(text(),"View request")]'));
    JS.waitForNotExist('div.busyoverlay:visible');
    SF.sleep(5);
    JS.waitForNotExist('div.busyoverlay:visible');
    LF.AccountUnloadingEnterAddress();
    V.accountNumbersWithRes={};
    LF.RememberAccountNumbers(V.accountNumbersWithRes);
    LF.addToCleanerJob(V.accountNumbersWithRes.Id);
    LF.LogoutFromAccount();

    condition.nowWeDoing = 'первый раз в админке, ищем первый реквест';
    SF.get(V.adminURL);
    LF.LoginToBoardAsAdmin();
    LF.OpenRequest(V.accountNumbersWithRes.Id);
    SF.waitForVisible(By.xpath('//div[@ng-click="chooseTruck(tid)"]'));
    JS.step(JSstep.selectTruck);
    V.boardNumbersWithRes = {};
    LF.RememberDigitsRequestBoard(V.boardNumbersWithRes);
    condition.nowWeDoing = 'сравниваем аккаунт и админку с резервацией';
    LF.Validation_Compare_Account_Admin(V.accountNumbersWithRes,V.boardNumbersWithRes);
    driver.wait(driver.executeScript('return $("input#reserv_price").val()').then(function(text){
        V.boardNumbersWithRes.ReservationPrice = SF.cleanPrice(text);
    }),config.timeout);
    SF.sleep(1);
    VD.IWant(VD.VToEqual,V.boardNumbersWithRes.ReservationPrice, 150,'Резервация не равно 150');
    SF.click(By.xpath('//a[@ng-click="select(tabs[7])"]'));
    SF.sleep(1);
    LF.SetManager('emilia');
    SF.click(By.xpath('//a[@ng-click="select(tabs[4])"]'));
    LF.SetClientPasswd(V.clientWithRes.passwd);
    SF.click(By.xpath('//a[@ng-click="select(tabs[0])"]'));
    SF.sleep(1);
    SF.select(By.xpath('//select[@id="edit-status"]'), 2);
    SF.click(By.xpath('//button[@ng-click="UpdateRequest()"]'));
    JS.waitForExist('button[ng-click="update(request)"]:visible');
    SF.click(By.xpath('//button[@ng-click="update(request)"]'));
    JS.waitForNotExist("div.busyoverlay:visible");
    LF.closeEditRequest();
    SF.sleep(2);

    condition.nowWeDoing = 'лезем в настройки и ставим резервацию 0';
    SF.click(By.xpath('//button[@id="toggle-left"]'));
    SF.click(By.xpath('//a[@ng-click="vm.goToPage(\'settings.general\', \'\')"]'));
    SF.sleep(2);
    SF.click(By.xpath('//a[@ui-sref="settings.schedule"]'));
    SF.sleep(2);
    SF.click(By.xpath('//input[@ng-model="vm.scheduleSettings.localReservationRate"]'));
    SF.send(By.xpath('//input[@ng-model="vm.scheduleSettings.localReservationRate"]'),0);
    SF.click(By.xpath('//input[@ng-model="vm.scheduleSettings.flatReservationRate"]'));
    SF.sleep(2);
    LF.LogoutFromBoardAdmin();

    //================================второй реквест без резервации==================================================

    condition.nowWeDoing = 'создаём с верхнего калькулятора второй реквест, теперь без резервации';
    V.clientNoRes = {};
    V.clientNoRes.name = SF.randomBukva(6) + '_t';
    V.clientNoRes.fam = SF.randomBukva(6) + '_t';
    V.clientNoRes.phone = SF.randomCifra(10);
    V.clientNoRes.email = SF.randomBukvaSmall(6) + '@' + SF.randomBukvaSmall(4) + '.tes';
    V.clientNoRes.passwd = 123;

    SF.get(V.frontURL);
    LF.FullSmallCalcAsUnloading(V.clientNoRes);
    JS.waitForExist('ultrasmall-form #congrats_menu[style="right: 0px;"] a:contains("Proceed To View Your Quote")');
    JS.link('ultrasmall-form a:contains("Proceed To View Your Quote")');

    condition.nowWeDoing='зашли первый раз в аккаунт NoRes';
    SF.click(By.xpath('//button[@ng-click="cancel()"][contains(text(),"View request")]'));
    JS.waitForNotExist('div.busyoverlay:visible');
    SF.sleep(5);
    JS.waitForNotExist('div.busyoverlay:visible');
    LF.AccountUnloadingEnterAddress();
    V.accountNumbersNoRes={};
    LF.RememberAccountNumbers(V.accountNumbersNoRes);
    LF.addToCleanerJob(V.accountNumbersNoRes.Id);
    LF.LogoutFromAccount();

    condition.nowWeDoing = 'первый раз в админке, ищем первый реквест NoRes';
    SF.get(V.adminURL);
    LF.LoginToBoardAsAdmin();
    LF.OpenRequest(V.accountNumbersNoRes.Id);
    SF.waitForVisible(By.xpath('//div[@ng-click="chooseTruck(tid)"]'));
    JS.step(JSstep.selectTruck);
    V.boardNumbersNoRes = {};
    LF.RememberDigitsRequestBoard(V.boardNumbersNoRes);
    condition.nowWeDoing = 'сравниваем аккаунт и админку без резервации';
    LF.Validation_Compare_Account_Admin(V.accountNumbersWithRes,V.boardNumbersNoRes);
    driver.wait(driver.executeScript('return $("input#reserv_price").val()').then(function(text){
        V.boardNumbersNoRes.ReservationPrice = SF.cleanPrice(text);
    }),config.timeout);
    SF.sleep(1);
    VD.IWant(VD.VToEqual,V.boardNumbersNoRes.ReservationPrice, 0,'Резервация не равно 0');
    SF.click(By.xpath('//a[@ng-click="select(tabs[7])"]'));
    SF.sleep(1);
    LF.SetManager('emilia');
    SF.click(By.xpath('//a[@ng-click="select(tabs[4])"]'));
    LF.SetClientPasswd(V.clientNoRes.passwd);
    SF.click(By.xpath('//a[@ng-click="select(tabs[0])"]'));
    SF.sleep(1);
    SF.select(By.xpath('//select[@id="edit-status"]'), 2);
    SF.click(By.xpath('//button[@ng-click="UpdateRequest()"]'));
    JS.waitForExist('button[ng-click="update(request)"]:visible');
    SF.click(By.xpath('//button[@ng-click="update(request)"]'));
    JS.waitForNotExist("div.busyoverlay:visible");
    LF.closeEditRequest();
    SF.sleep(2);

    condition.nowWeDoing = 'лезем в настройки и возвращаем резервацию в 150';
    SF.click(By.xpath('//button[@id="toggle-left"]'));
    SF.click(By.xpath('//a[@ng-click="vm.goToPage(\'settings.general\', \'\')"]'));
    SF.sleep(2);
    SF.click(By.xpath('//a[@ui-sref="settings.schedule"]'));
    SF.sleep(2);
    SF.click(By.xpath('//input[@ng-model="vm.scheduleSettings.localReservationRate"]'));
    SF.send(By.xpath('//input[@ng-model="vm.scheduleSettings.localReservationRate"]'),150);
    SF.click(By.xpath('//input[@ng-model="vm.scheduleSettings.flatReservationRate"]'));
    SF.sleep(2);
    LF.LogoutFromBoardAdmin();

    condition.nowWeDoing = 'заходим в аккаунт под первым клиентом, должны спросить деньгу';
    SF.get(V.accountURL);
    LF.LoginToAccountAsClient(V.clientWithRes);
    SF.waitForVisible(By.xpath('//td[contains(text(),"' + V.accountNumbersWithRes.Id + '")]/following-sibling::td[1]'));
    driver.wait(driver.findElement(By.xpath('//td[contains(text(),"' + V.accountNumbersWithRes.Id + '")]/following-sibling::td[1]')).getText().then(function (Status) {
        VD.IWant(VD.VToEqual, Status, 'Not Confirmed');
    }),config.timeout);
    SF.click(By.xpath('//td[contains(text(),"' + V.accountNumbersWithRes.Id + '")]/following-sibling::td/button[contains(text(),"View")]'));
    SF.sleep(2);
    JS.waitForNotExist('div.busyoverlay:visible');
    LF.ConfirmRequestInAccount_WithReservation(V.boardNumbersWithRes.ReservationPrice);
    condition.nowWeDoing = 'подтвердили резервацию';
    SF.waitForVisible(By.xpath('//div[contains(text(),"Your move is confirmed and scheduled")]'));
    LF.LogoutFromAccount();

    condition.nowWeDoing = 'заходим в аккаунт под вторый клиентом, не должны просить деньгу';
    SF.get(V.accountURL);
    LF.LoginToAccountAsClient(V.clientNoRes);
    SF.waitForVisible(By.xpath('//td[contains(text(),"' + V.accountNumbersNoRes.Id + '")]/following-sibling::td[1]'));
    driver.wait(driver.findElement(By.xpath('//td[contains(text(),"' + V.accountNumbersNoRes.Id + '")]/following-sibling::td[1]')).getText().then(function (Status) {
        VD.IWant(VD.VToEqual, Status, 'Not Confirmed');
    }),config.timeout);
    SF.click(By.xpath('//td[contains(text(),"' + V.accountNumbersNoRes.Id + '")]/following-sibling::td/button[contains(text(),"View")]'));
    SF.sleep(2);
    JS.waitForNotExist('div.busyoverlay:visible');
    LF.ConfirmRequestInAccount_NoReservation();
    condition.nowWeDoing = 'подтвердили резервацию';
    SF.waitForVisible(By.xpath('//div[contains(text(),"Your move is confirmed and scheduled")]'));
    LF.LogoutFromAccount();

    //=========================закончили писать тест=============================
    SF.endOfTest();
};
