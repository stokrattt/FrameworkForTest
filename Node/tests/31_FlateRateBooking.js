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
    LF.LoginToBoardAsAdmin ();
    SF.click(By.xpath('//a[@ng-click="vm.goToPage(\'settings.general\', \'\')"]'));
    SF.sleep (3);
    JS.scroll ('input[ng-model=\\"vm.basicSettings.isflat_rate_miles\\"]');
    driver.wait(driver.executeScript("if($('input[ng-model=\"vm.basicSettings.isflat_rate_miles\"]').hasClass('ng-not-empty')){return true;}else{$('input[ng-model=\"vm.basicSettings.isflat_rate_miles\"]').click()}"));
    LF.LogoutFromBoardAdmin ();
    SF.get(V.frontURL);
    SF.sleep (4);
    JS.scroll('move-calculator');
    SF.click (By.xpath('//a[@href="#request"]'));
    SF.sleep (2);
    SF.click (By.xpath('//label[contains(text(), "Desired Move Date:")]/following-sibling::input[1]'));
    V.request={};
    driver.wait(driver.executeScript(JSstep.Click4DaysNewCalendar).then(function(MovDateFront){
        V.request.moveDate = MovDateFront;
        console.log(V.request);
    }), config.timeout);
    SF.sleep (0.5);
condition.nowWeDoing = 'создаем Flat Rate реквест';
    SF.send (By.id('edit-zip-code-from'), '02461');
    SF.send (By.id('edit-zip-code-to'), '07304');
    JS.select ('#edit-size-move', 10);
    JS.select ('#edit-type-from', 2);
    JS.select ('#edit-type-to', 5);
    SF.sleep (0.5);
    JS.click ('#calculate_btn');
    SF.waitForLocated (By.xpath('//div[@class="form_block calc-form"]'));
    SF.sleep (4);
    SF.send(By.id('edit-first-name'), V.client.name);
    SF.send(By.id('edit-last-name'), V.client.fam);
    SF.sleep(0.3);
    SF.send(By.xpath('//div[@ng-if="!userLogin"]//input[@ng-model="request.primaryPhone"]'), V.client.phone);
    SF.sleep(0.3);
    SF.send(By.id('edit-additional-phone'), V.client.phone);
    SF.sleep(0.3);
    SF.send(By.xpath('//div[@ng-if="!userLogin"]//input[@ng-model="request.email"]'), V.client.email);
    SF.sleep(0.3);
    SF.send(By.id('edit-confirmemail'), V.client.email);
    SF.click(By.id('prefeefe'));
    SF.click (By.xpath('//div[@id="pref_popup"]//div[@class="select_item pre_2"]'));
    SF.select(By.xpath('//select[@ng-model="request.poll"]'), 'Google search');
    SF.click (By.xpath('//button[@ng-click="goToSummery()"]'));
    SF.sleep(2);
    JS.waitForNotExist ('div[ng-if="loadingImg"]');
    SF.sleep(4);
    driver.wait(driver.findElement(By.xpath('//h3[contains(text(), "Distance:")]/following-sibling::p')).getText().then(function (miles) {
        V.distance = SF.cleanPrice (miles);
    }),config.timeout);
    SF.click(By.id('submitRequestButton'));
    SF.sleep (2);
    SF.click(By.linkText('View Request Page'));
    SF.sleep(4);
condition.nowWeDoing = 'перешли в аккаунт добавляем опции';
    SF.waitForLocated (By.xpath('//button[@ng-click="cancel()"]'));
    SF.click (By.xpath('//button[@ng-click="cancel()"]'));
    SF.sleep (0.5);
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
    SF.click(By.xpath('//div[contains(@class, "ng-pristine")]'));
    SF.select (By.xpath('//select[@ng-model="details.current_door"]'), 30);
    SF.select (By.xpath('//select[@ng-model="details.new_door"]'), 50);
    SF.select (By.xpath('//select[@ng-model="details.current_permit"]'), "PM");
    SF.select (By.xpath('//select[@ng-model="details.new_permit"]'), "PR");
    JS.click('button[ng-click=\\"saveDetails()\\"]:visible');
    JS.waitForNotExist('div.busyoverlay:visible');
    SF.sleep (3);
condition.nowWeDoing = 'добавляем инвенторий в акке';
    JS.waitForExist('div[ng-repeat="filter in filters"]');
    SF.sleep(5);
    SF.click(By.xpath('(//div[@ng-repeat="item in currentFilter.items"]//button[@ng-click="changeValue(1, item)"])[1]'));
    SF.sleep(1);
    SF.click(By.xpath('(//div[@ng-repeat="item in currentFilter.items"]//button[@ng-click="changeValue(1, item)"])[1]'));
    SF.sleep(1);
    SF.click(By.xpath('(//div[@ng-repeat="item in currentFilter.items"]//button[@ng-click="changeValue(1, item)"])[1]'));
    SF.sleep(1);
    SF.click(By.xpath('(//div[@ng-repeat="item in currentFilter.items"]//button[@ng-click="changeValue(1, item)"])[2]'));
    SF.sleep(1);
    SF.click(By.xpath('(//div[@ng-repeat="item in currentFilter.items"]//button[@ng-click="changeValue(1, item)"])[2]'));
    SF.sleep(1);
    SF.click(By.xpath('(//div[@ng-repeat="item in currentFilter.items"]//button[@ng-click="changeValue(1, item)"])[2]'));
    SF.sleep(1);
    SF.click(By.xpath('(//div[@ng-repeat="item in currentFilter.items"]//button[@ng-click="changeValue(1, item)"])[2]'));
    SF.sleep(1);
    SF.click (By.xpath('//button[@ng-click="vm.saveListInventories()"]/span[contains(text(), "Next To Overview")]'));
    SF.sleep (2);
    JS.scroll ('#conf_block:visible');
    SF.sleep (2);
    SF.click (By.xpath('//button[@ng-click="submitFlatRate()"]'));
    JS.waitForExist('button.confirm:contains("OK")');
    SF.click(By.xpath('//button[@class="confirm"][contains(text(),"OK")]'));
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
    LF.LoginToBoardAsAdmin ();
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
    SF.waitForVisible (By.xpath('//div[@class="sweet-alert showSweetAlert visible"]'));
    SF.click (By.xpath('//button[@class="confirm"]'));
    /*********************************************************************************************/
    SF.click (By.xpath('//a[@ng-click="select(tabs[4])"]'));
    SF.sleep (0.5);
    SF.send (By.id('inputPassword3'), V.client.passwd);
    SF.click (By.xpath('//button[@ng-click="update(client)"]'));
    SF.sleep (3);
    JS.waitForNotExist('div.toast-success:visible');
    LF.closeEditRequest ();
    LF.LogoutFromBoardAdmin ();
    SF.get(V.accountURL);
condition.nowWeDoing = 'идем в акк под клиентом';
    LF.LoginToAccountAsClient (V.client);
    SF.waitForVisible(By.xpath('//td[contains(text(),"'+V.FRId+'")]/following-sibling::td[1]'));
    SF.click(By.xpath('//td[contains(text(),"'+V.FRId+'")]/following-sibling::td/button[contains(text(),"View")]'));
    SF.sleep(3);
    SF.click(By.xpath('//button[@ng-click="vm.chooseOption(option)"]'));
    SF.waitForVisible(By.xpath('//button[@ng-click="update()"]'));
    SF.click(By.xpath('//button[@ng-click="update()"]'));
    JS.waitForNotExist('div.busyoverlay:visible');
    JS.waitForExist('button.confirm:contains("OK")');
    SF.click (By.xpath('//button[@class="confirm"]'));
    LF.LogoutFromAccount ();
    SF.get(V.adminURL);
    condition.nowWeDoing = 'пошли в админку 2 раз, ставить трак, нот конферм';
    LF.LoginToBoardAsAdmin ();
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
    /**************************************************************************************************************/
    JS.step(JSstep.selectTruck((V.boardNumbers.LaborTimeMax + V.boardNumbers.TravelTime)/60));
    SF.sleep (1);
    VD.IWant (VD.VToEqual, 5000, V.boardNumbers.Total, 'тотал не совпал с выбранной суммой' );
    JS.select ('#edit-status', 2);
    SF.click (By.xpath('//button[@ng-click="DeliveryDay()"]'));
    JS.waitForNotExist("div.busyoverlay:visible");
    Debug.pause ();
    SF.sleep (7);
    driver.wait(driver.executeScript("return $('div.line1:contains("+V.FRId+")').length").then (function (check) {
        VD.INeed(VD.VToEqual, check, 1, 'трак (желтая линия, реквест) на таблице траков в реквесте не нашелся в деливери дейт');
        console.log(check);
    }),config.timeout);
    SF.sleep (2);
    SF.click (By.xpath('//button[@ng-click="UpdateRequest()"]'));
    SF.waitForVisible (By.xpath('//button[@ng-click="update(request)"]'));
    SF.click (By.xpath('//button[@ng-click="update(request)"]'));
    SF.sleep (5);
    JS.waitForNotExist("div.busyoverlay:visible");
    JS.waitForNotExist('div.toast-message:visible');
    JS.waitForNotExist('div.toast-success:visible');
    LF.closeEditRequest ();
    LF.LogoutFromBoardAdmin ();
    SF.get (V.accountURL);
    LF.LoginToAccountAsClient (V.client);
condition.nowWeDoing = 'идем в акк под клиентом 2 раз букать работу';
    SF.waitForVisible(By.xpath('//td[contains(text(),"'+V.FRId+'")]/following-sibling::td[1]'));
    SF.click(By.xpath('//td[contains(text(),"'+V.FRId+'")]/following-sibling::td/button[contains(text(),"View")]'));
    SF.sleep(3);
    SF.click (By.xpath('//div[@class="field-status notconfirmed ng-scope"]/a'));
    SF.click (By.xpath('//i[@class="fa fa-angle-down arrow-down"]'));
    SF.sleep (0.5);
    SF.click (By.id('terms'));
    SF.click (By.id('cancel_policy'));
    SF.click (By.id('paybutton'));
    SF.waitForVisible (By.xpath('//div[@class="sweet-alert showSweetAlert visible"]'));
    SF.click (By.xpath('//button[@class="confirm"]'));
    SF.waitForVisible (By.xpath('//div[@class="modal-body form-horizontal"]'));
    SF.send (By.id('edit-moving-from'), 'otkuda edem');
    SF.send (By.id('edit-moving-from-apt'), 324535);
    SF.send (By.xpath('//input[@ng-model="request.field_moving_to.thoroughfare"]'), 'kuda edem');
    SF.send (By.xpath('//input[@ng-value="request.apt_to.value"]'), 324535);
    SF.click (By.xpath('//button[@ng-click="update(client)"]'));
    SF.waitForVisible (By.xpath('//div[@class="sweet-alert showSweetAlert visible"]'));
    SF.click (By.xpath('//button[@class="confirm"]'));
    SF.waitForVisible (By.xpath('//div[@class="sweet-alert showSweetAlert visible"]'));
    SF.click (By.xpath('//button[@class="confirm"]'));
    SF.waitForVisible(By.xpath('//canvas[@id="signatureCanvasReserv"]'));
    LF.MakeSignJS('signatureCanvasReserv');
    SF.sleep(0.5);
    SF.click(By.xpath('//button[@ng-click="saveReservSignature();logClickButtons(\'Save reservation sign button clicked\')"]'));
    SF.sleep (1);
    LF.FillCardPayModal ();
    SF.sleep (5);
    SF.waitForVisible(By.xpath('//div[contains(text(),"Your move is confirmed and scheduled")]'));
    driver.wait(driver.findElement(By.xpath('//div[@class="field-status confirm ng-scope"]/div')).getText().then(function(confirmed){
        VD.IWant (VD.VToEqual, confirmed, 'YOUR MOVE IS CONFIRMED AND SCHEDULED', 'статус не конферм, хотя должен был быть');
    }), config.timeout);
    LF.LogoutFromAccount ();
    SF.get (V.adminURL);
    LF.LoginToBoardAsAdmin ();
condition.nowWeDoing = 'идем в админку проверять что работа конферм';
    SF.click (By.xpath('//div[@ng-click="vm.select(2)"]'));
    SF.sleep (3);
    LF.OpenRequest (V.FRId);
    SF.sleep (3);
    LF.closeEditRequest ();
    SF.sleep (2);
    SF.click (By.xpath('//button[@ng-click="toggleLeft()"]'));
    SF.waitForVisible (By.xpath('//button[@ng-click="toggleLeft()"]'));
    SF.click(By.xpath('//li[@ng-show="vm.PermissionsServices.hasPermission(\'canSeeScheduleMenu\')"]'));
    JS.waitForNotExist('div.busyoverlay:visible');
    SF.sleep(5);
    JS.waitForNotExist('div.busyoverlay:visible');
    SF.sleep(5);
    condition.nowWeDoing = 'идем в календарь проверять что трак есть на календаре';
    driver.wait(driver.findElement(By.xpath('//span[contains(@class, "current-date")]')).getText().then(function(date){
        V.current = date;
         now = new Date();
         msInDay = 86400000;
         future = new Date(now.getTime() + msInDay * 2);
         options = {  month: 'long', year: 'numeric' };
        V.Dates = (future.toLocaleDateString('en-US', options));
    }), config.timeout);
    SF.sleep(5);
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

    LF.LogoutFromBoardAdmin ();
    
    //=========================закончили писать тест=============================
    SF.endOfTest();
};
