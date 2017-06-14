module.exports = function main(SF, JS, MF, LF, JSstep, VD, V, By, until,FileDetector, system, condition, config,constants) {
    global.fiber = Fiber.current;
    V.client = {};
    V.client.name = SF.randomBukva(6) + '_t';
    V.client.fam = SF.randomBukva(6) + '_t';
    V.client.phone = SF.randomCifra(10);
    V.client.email = SF.randomBukvaSmall(6) + '@' + SF.randomBukvaSmall(4) + '.tes';
    V.client.passwd = 123;

    //=========================начинаем писать тест=============================
condition.nowWeDoing = 'идем в админку проверяем что стоит галка на флет рейт';
    SF.get(V.adminURL);
    LF.LoginToBoardAsCustom(V.adminLogin,V.adminPassword);
    MF.Board_OpenSettingsGeneral ();
    SF.sleep (3);
    JS.scroll ('input[ng-model=\\"vm.basicSettings.isflat_rate_miles\\"]');
    driver.wait(driver.executeScript("if($('input[ng-model=\"vm.basicSettings.isflat_rate_miles\"]').hasClass('ng-not-empty')){return true;}else{$('input[ng-model=\"vm.basicSettings.isflat_rate_miles\"]').click()}"));
    MF.Board_LogoutAdmin ();
    SF.get(V.frontURL);
condition.nowWeDoing = 'создаем Flat Rate реквест';
    LF.CreateFlatRateDownForm(V.client);
condition.nowWeDoing = 'перешли в аккаунт добавляем опции';
    MF.Account_ClickViewRequest();
    let now = new Date();
    let msInDay = 86400000;
    let future = new Date(now.getTime() + msInDay * 2);
    let options = { day: 'numeric', month: 'short', year: 'numeric' };
    V.changedateUp = (future.toLocaleDateString('en-US', options));
    SF.send(By.xpath('//div[contains(@class, "dateRange")]/input'), V.changedateUp);
     now = new Date();
     msInDay = 86400000;
     future = new Date(now.getTime() + msInDay * 3);
     options = { day: 'numeric', month: 'short', year: 'numeric' };
    V.changedateDelivery = (future.toLocaleDateString('en-US', options));
    SF.send(By.xpath('//div[contains(@class, "dateRange delivery")]/input'), V.changedateDelivery);
    MF.WaitWhileBusy ();
    SF.click(By.xpath('//div[contains(@class, "ng-pristine")]'));
    SF.select (By.xpath('//select[@ng-model="details.current_door"]'), 30);
    SF.select (By.xpath('//select[@ng-model="details.new_door"]'), 50);
    SF.select (By.xpath('//select[@ng-model="details.current_permit"]'), "PM");
    SF.select (By.xpath('//select[@ng-model="details.new_permit"]'), "PR");
    JS.click('button[ng-click=\\"saveDetails()\\"]:visible');
    JS.waitForNotExist('div.busyoverlay:visible');
    SF.sleep (3);
condition.nowWeDoing = 'добавляем инвенторий в акке';
    LF.AccountFlatRateAddInventory();
    SF.sleep(2);
    MF.Account_SubmitFlatRateAfterAddInventory ();
    JS.scroll ('a[ng-click=\\"vm.Logout()\\"]');
    driver.wait(driver.findElement(By.xpath('//span[@ng-if="vm.request.inventory_weight.cfs"]')).getText().then(function (text) {
        V.accountFRCubicFit = SF.cleanPrice(text.substring(0, text.indexOf('c')));
    }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//div[contains(text(),"Request ID")]/span')).getText().then(function (text) {
        V.FRId = SF.cleanPrice(text);
    }),config.timeout);
    LF.LogoutFromAccount ();
    SF.get(V.adminURL);
condition.nowWeDoing = 'пошли в админку, открыли реквест и заполняем опции 1';
    LF.LoginToBoardAsCustom(V.adminLogin,V.adminPassword);
    LF.OpenRequestFlatRate (V.FRId);
    SF.clear (By.xpath('//input[@ng-model="option.pickup"]'));
    SF.sleep (0.5);
     now = new Date();
     msInDay = 86400000;
     future = new Date(now.getTime() + msInDay * 2);
     options = { month: 'long', day: 'numeric', year: 'numeric' };
    V.changedateUpAdmin = (future.toLocaleDateString('en-US', options));
    SF.send(By.xpath('//input[@ng-model="option.pickup"]'), V.changedateUpAdmin);
    SF.select (By.xpath('//select[@ng-model="option.picktime1"]'), 3);
    SF.select (By.xpath('//select[@ng-model="option.picktime2"]'), 4);
    SF.sleep (0.5);
     now = new Date();
     msInDay = 86400000;
     future = new Date(now.getTime() + msInDay * 4);
     options = { month: 'long', day: 'numeric', year: 'numeric' };
    V.changedateDelAdmin = (future.toLocaleDateString('en-US', options));
    SF.send(By.xpath('//input[@ng-model="option.delivery"]'), V.changedateDelAdmin);
    SF.select (By.xpath('//select[@ng-model="option.deltime1"]'), 5);
    SF.select (By.xpath('//select[@ng-model="option.deltime2"]'), 6);
    SF.send(By.xpath('//input[@ng-model="option.rate"]'), 5000);
    SF.sleep (0.5);
    SF.click (By.xpath('//a[@ng-click="addOption()"]'));
    SF.sleep (4);
condition.nowWeDoing = 'заполняем опции 2';
    SF.clear (By.xpath('//input[@ng-model="option.pickup"]'));
    SF.sleep (0.5);
     now = new Date();
     msInDay = 86400000;
     future = new Date(now.getTime() + msInDay * 3);
     options = { month: 'long', day: 'numeric', year: 'numeric' };
    V.changedateUpAdminLong = (future.toLocaleDateString('en-US', options));
    SF.send(By.xpath('//input[@ng-model="option.pickup"]'), V.changedateUpAdminLong);
    SF.select (By.xpath('//select[@ng-model="option.picktime1"]'), 5);
    SF.select (By.xpath('//select[@ng-model="option.picktime2"]'), 7);
    SF.sleep (0.5);
     now = new Date();
     msInDay = 86400000;
     future = new Date(now.getTime() + msInDay * 5);
     options = { month: 'long', day: 'numeric', year: 'numeric' };
    V.changedateDelAdminLong = (future.toLocaleDateString('en-US', options));
    SF.send(By.xpath('//input[@ng-model="option.delivery"]'), V.changedateDelAdminLong);
    SF.select (By.xpath('//select[@ng-model="option.deltime1"]'), 8);
    SF.select (By.xpath('//select[@ng-model="option.deltime2"]'), 9);
    SF.send(By.xpath('//input[@ng-model="option.rate"]'), 6000);
    SF.sleep (0.5);
    JS.scroll ('a[ng-click=\\"addOption()\\"]');
    SF.click (By.xpath('//a[@ng-click="addOption()"]'));
    SF.sleep (2);
    SF.click(By.xpath('//a[@ng-click="saveOptions()"]'));
    SF.sleep (3);
    JS.waitForNotExist('div.toast-message:visible');
    JS.waitForNotExist('div.toast-success:visible');
    /**************************иногда выскакивает иногда нет************/
    // MF.SweetConfirm ();
    /*********************************************************************************************/
    MF.EditRequest_OpenClient ();
    LF.SetClientPasswd (V.client.passwd);
    LF.closeEditRequest ();
    MF.Board_LogoutAdmin ();
    SF.get(V.accountURL);
condition.nowWeDoing = 'идем в акк под клиентом выбирать опцию';
    LF.LoginToAccountAsClient (V.client);
    MF.Account_OpenRequest (V.FRId);
    SF.sleep(2);
    MF.Account_ChooseOptionFlatRate();
    LF.LogoutFromAccount ();
    SF.get(V.adminURL);
    condition.nowWeDoing = 'пошли в админку 2 раз, ставить трак, нот конферм';
    LF.LoginToBoardAsCustom(V.adminLogin,V.adminPassword);
    SF.sleep (3);
    LF.OpenRequest (V.FRId);
    V.boardNumbers = {};
    LF.RememberDigitsRequestBoard (V.boardNumbers);
    SF.sleep (1);
    SF.click(By.xpath('//div[contains(@class, "dateRange ")]/input'));
    driver.executeScript(JSstep.Click8DaysCalendar);
    SF.sleep (1);
    SF.clear(By.xpath('//input[@ng-model="request.delivery_start_time.value"]'));
    SF.send(By.xpath('//input[@ng-model="request.delivery_start_time.value"]'),  '02:00 AM');
    SF.sleep (1);
    // SF.clear(By.xpath('//input[@ng-model="deliveryDateSecondInput"]'));
    // SF.send(By.xpath('//input[@ng-model="deliveryDateSecondInput"]'), V.changedateDelAdmin);
    // driver.actions().sendKeys(Key.ENTER).perform();

    /**************************************************************************************************************/
    JS.step(JSstep.selectTruck((V.boardNumbers.LaborTimeMax + V.boardNumbers.TravelTime)/60));
    SF.sleep (1);
    VD.IWant (VD.VToEqual, 5000, V.boardNumbers.Total, 'тотал не совпал с выбранной суммой' );
    MF.EditRequest_SetToNotConfirmed ();
    SF.click (By.xpath('//button[@ng-click="DeliveryDay()"]'));
    MF.WaitWhileBusy ();
    SF.sleep (15);
    driver.wait(driver.executeScript("return $('div.line1:contains("+V.FRId+")').length").then (function (check) {
        VD.IWant(VD.VToEqual, check, 1, 'трак (желтая линия, реквест) на таблице траков в реквесте не нашелся в деливери дейт');
    }),config.timeout);
    SF.sleep (2);
    MF.EditRequest_SaveChanges ();

    MF.EditRequest_OpenLogs();

    MF.EditRequest_Check1EmailExist(V.client.email, "Thank you for submitting a quote.");
    MF.EditRequest_Check1EmailExist(V.client.email, "How To Work With Your New Account.");
    MF.EditRequest_Check1EmailExist("roman@elromco.com", "Request Quote (Pending Status)");

    LF.closeEditRequest ();
    MF.Board_LogoutAdmin ();
    SF.get (V.accountURL);
    LF.LoginToAccountAsClient (V.client);
condition.nowWeDoing = 'идем в акк под клиентом 2 раз букать работу';
    MF.Account_OpenRequest (V.FRId);
    SF.sleep(3);
    LF.ConfirmRequestInAccount_WithReservationWithAdress();
    LF.LogoutFromAccount ();
    SF.get (V.adminURL);
    LF.LoginToBoardAsCustom(V.adminLogin,V.adminPassword);
condition.nowWeDoing = 'идем в админку проверять что работа конферм';
    MF.Board_OpenConfirmed ();
    LF.OpenRequest (V.FRId);
    SF.sleep (3);
    LF.closeEditRequest ();
    MF.Board_OpenSchedule ();
    condition.nowWeDoing = 'идем в календарь проверять что трак есть на календаре';
    driver.wait(driver.findElement(By.xpath('//span[contains(@class, "current-date")]')).getText().then(function(date){
        V.current = date;
         now = new Date();
         msInDay = 86400000;
         future = new Date(now.getTime() + msInDay * 2);
         options = {  month: 'long', year: 'numeric' };
        V.Dates = (future.toLocaleDateString('en-US', options));
    }), config.timeout);
    SF.sleep(8);
            if (V.current == V.Dates) {
                 now = new Date();
                 msInDay = 86400000;
                 future = new Date(now.getTime() + msInDay * 2);
                 options = { day: 'numeric' };
                V.datescedule = (future.toLocaleDateString('en-US', options));
                SF.click(By.xpath('//div[contains(@class, "cal-day-inmonth")]/span[contains(@class, "pull-right") and contains(text(), "' + V.datescedule + '")]'));
                SF.sleep(5);
                driver.wait(driver.executeScript("return $('div.line1:contains("+V.FRId+")').length").then (function (checkSchedule) {
                    VD.INeed(VD.VNotToEqual, checkSchedule, 0, 'трак (желтая линия, реквест) на таблице траков в календаре не нашелся ');
                }),config.timeout);
            } else {
                SF.click(By.xpath('//i[@ng-click="vm.nextMonth()"]'));
                SF.sleep(5);
                SF.click(By.xpath('//div[contains(@class, "cal-day-inmonth")]/span[contains(@class, "pull-right")] and [contains(text(), "' + V.datescedule + '")]'));
                SF.sleep(5);
                driver.wait(driver.executeScript("return $('div.line1:contains("+V.FRId+")').length").then (function (checkSchedule) {
                    VD.INeed(VD.VNotToEqual, checkSchedule, 0, 'трак (желтая линия, реквест) на таблице траков в календаре не нашелся (вторая проверка)');
                }),config.timeout);
            }

    // MF.Board_LogoutAdmin ();
    
    //=========================закончили писать тест=============================
    SF.endOfTest();
};
