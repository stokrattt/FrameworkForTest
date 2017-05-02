module.exports = function main(SF, JS, MF, LF, JSstep, VD, V, By, until,FileDetector, system, condition, config,constants) {    global.fiber = Fiber.current;
    V.ReservationPrice = {};
    V.client = {};
    V.frontNumbersDown ={};
    V.accountNumbersTo = {};
    V.client.name = SF.randomBukva(6) + '_t';
    V.client.fam = SF.randomBukva(6) + '_t';
    V.client.phone = SF.randomCifra(10);
    V.client.email = SF.randomBukvaSmall(6) + '@' + SF.randomBukvaSmall(4) + '.tes';

    SF.get(V.frontURL);
    SF.sleep (4);
    condition.nowWeDoing = 'заполняем нижний калькулятор на фронте';
    LF.CreateMovAndStorFromFrontDown (V.client);

    driver.wait(driver.findElement(By.xpath('//div[@class="box_info general"]/div/span')).getText().then(function(text){
        V.nameRequest = text;
        VD.IWant(VD.VToEqual, V.nameRequest, 'Moving & Storage', 'тип реквеста не совпал с созданным');
    }), config.timeout);
    condition.nowWeDoing = 'запоминаем данные которые посчитал кальк';

    LF.RememberFrontNumbersMovAndStorDown(V.frontNumbersDown);

    SF.click(By.id('submitRequestButton'));
    SF.sleep (2);
    SF.click(By.linkText('View Request Page'));
    SF.sleep(4);
    SF.openTab (1);

    condition.nowWeDoing = 'пошли в аккаунт';

    SF.sleep (3);
    SF.waitForVisible (By.xpath('//div[@class="storagehelp"]'));
    SF.click (By.xpath('//button[@ng-click="cancel()"]'));
    SF.sleep (0.5);
    condition.nowWeDoing = 'запомнили данные в аке и сравниваем с калькулятором';

    LF.RememberAccountNumbers(V.accountNumbersTo);
    LF.addToCleanerJob(V.accountNumbersTo.Id);
    LF.Validation_Compare_Account_Front_MovStorTo(V.accountNumbersTo,V.frontNumbersDown);

    SF.click(By.xpath('//a[@ng-click="vm.goToRequest(vm.request.storage_id)"]'));
    SF.sleep (2);

    V.accountNumbersFrom = {};
    SF.sleep (0.5);
    LF.RememberAccountNumbers(V.accountNumbersFrom);
    LF.addToCleanerJob(V.accountNumbersFrom.Id);
    LF.Validation_Compare_Account_Front_MovStorFrom (V.accountNumbersFrom,V.frontNumbersDown);

    LF.LogoutFromAccount ();
    SF.get (V.adminURL);
    LF.LoginToBoardAsAdmin();
    condition.nowWeDoing = 'зашли под админом заполнили данные и сравниваем с акком первый реквест';

    LF.OpenRequest(V.accountNumbersTo.Id); /********************************************************************/

    V.boardNumbersTo = {};
    LF.RememberDigitsRequestBoard(V.boardNumbersTo);
    condition.nowWeDoing = 'сравниваем аккаунт и админку';
    LF.Validation_Compare_Account_Admin(V.accountNumbersTo,V.boardNumbersTo);
    JS.step(JSstep.selectTruck((V.boardNumbersTo.LaborTimeMax + V.boardNumbersTo.TravelTime)/60));
    JS.select ('#edit-status', 2);
    SF.click (By.xpath('//button[@ng-click="UpdateRequest()"]'));
    SF.waitForVisible (By.xpath('//button[@ng-click="update(request)"]'));
    SF.click (By.xpath('//button[@ng-click="update(request)"]'));
    SF.sleep (5);
    SF.click (By.xpath('//a[@ng-click="select(tabs[4])"]'));
    SF.sleep (0.5);
    V.client.passwd = 123;
    SF.send (By.id('inputPassword3'), V.client.passwd);
    SF.click (By.xpath('//button[@ng-click="update(client)"]'));
    SF.sleep (3);
    JS.waitForNotExist('div.toast-success');
    SF.click (By.xpath('//button[@ng-click="cancel()"]'));
    SF.sleep (5);
    condition.nowWeDoing = 'зашли под админом заполнили данные и сравниваем с акком второй реквест';

    LF.OpenRequest(V.accountNumbersFrom.Id); /********************************************************************/

    V.boardNumbersFrom = {};
    LF.RememberDigitsRequestBoard(V.boardNumbersFrom);
    condition.nowWeDoing = 'сравниваем аккаунт и админку';
    LF.Validation_Compare_Account_Admin(V.accountNumbersFrom,V.boardNumbersFrom);
    JS.step(JSstep.selectTruck((V.boardNumbersFrom.LaborTimeMax + V.boardNumbersFrom.TravelTime)/60));
    JS.select ('#edit-status', 2);
    SF.click (By.xpath('//button[@ng-click="UpdateRequest()"]'));
    SF.waitForVisible (By.xpath('//button[@ng-click="update(request)"]'));
    SF.click (By.xpath('//button[@ng-click="update(request)"]'));
    JS.waitForNotExist('button[ng-click="update(request)"]:visible');
    JS.waitForNotExist('div.toast-success:visible');
    LF.closeEditRequest ();

    LF.LogoutFromBoardAdmin ();
    SF.get(V.accountURL);
    condition.nowWeDoing = 'зашли под клиентом и букаем первую работу';

    LF.LoginToAccountAsClient (V.client, V.client.passwd);

    SF.waitForVisible(By.xpath('//td[contains(text(),"'+V.accountNumbersTo.Id+'")]/following-sibling::td[1]'));
    driver.wait(driver.findElement(By.xpath('//td[contains(text(),"'+V.accountNumbersTo.Id+'")]/following-sibling::td[1]')).getText().then(function(Status){
        VD.IWant(VD.VToEqual,Status,'Not Confirmed');
    }), config.timeout);
    //*******************************************************************************
    SF.sleep (1);
    SF.click(By.xpath('//td[contains(text(),"'+V.accountNumbersTo.Id+'")]/following-sibling::td/button[contains(text(),"View")]'));
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
    SF.click (By.xpath('//button[@ng-click="update(client)"]'));
    SF.waitForVisible (By.xpath('//div[@class="sweet-alert showSweetAlert visible"]'));
    SF.click (By.xpath('//button[@class="confirm"]'));

    //SF.waitForVisible (By.xpath('//div[@class="sweet-alert showSweetAlert visible"]'));
    //SF.click (By.xpath('//button[@class="confirm"]'));

    SF.waitForVisible(By.xpath('//canvas[@id="signatureCanvasReserv"]'));
    LF.MakeSignJS('signatureCanvasReserv');
    SF.sleep(0.5);
    JS.waitForExist ('div[class="sweet-overlay"]:visible');
    SF.click (By.xpath('//button[@class="confirm"]'));
    SF.sleep (1);

    SF.click(By.xpath('//button[@ng-click="saveReservSignature();logClickButtons(\'Save reservation sign button clicked\')"]'));
    SF.sleep (1);
    LF.FillCardPayModal ();
    SF.waitForVisible (By.xpath('//div[@class="field-status confirm ng-scope"]'));
    driver.wait(driver.findElement(By.xpath('//div[@class="field-status confirm ng-scope"]/div')).getText().then(function(confirmed){
        VD.IWant (VD.VToEqual, confirmed, 'YOUR MOVE IS CONFIRMED AND SCHEDULED', 'статус не конферм, хотя должен был быть');
    }), config.timeout);
    condition.nowWeDoing = 'зашли под клиентом и букаем вторую работу';
    JS.waitForNotExist('div.busyoverlay:visible');
    SF.click(By.xpath('//a[@ng-click="vm.goToRequest(vm.request.storage_id)"]'));
    SF.sleep (2);
condition.nowWeDoing = 'букаем вторую работу мувинга и стораджа';
    SF.click (By.xpath('//div[@class="field-status notconfirmed ng-scope"]/a'));
    SF.click (By.xpath('//i[@class="fa fa-angle-down arrow-down"]'));
    SF.sleep (0.5);
    SF.click (By.id('terms'));
    SF.click (By.id('cancel_policy'));
    SF.click (By.id('paybutton'));

    SF.waitForVisible (By.xpath('//div[@class="sweet-alert showSweetAlert visible"]'));
    SF.click (By.xpath('//button[@class="confirm"]'));
    SF.waitForVisible (By.xpath('//div[@class="modal-body form-horizontal"]'));
    SF.send (By.xpath('//input[@ng-model="request.field_moving_to.thoroughfare"]'), 'otkuda edem');
    SF.send (By.xpath('//input[@ng-value="request.apt_to.value"]'), 324535);
    SF.click (By.xpath('//button[@ng-click="update(client)"]'));
    SF.waitForVisible (By.xpath('//div[@class="sweet-alert showSweetAlert visible"]'));
    SF.click (By.xpath('//button[@class="confirm"]'));
    JS.waitForExist ('div[class="sweet-overlay"]:visible');
    SF.click (By.xpath('//button[@class="confirm"]'));
    SF.waitForVisible(By.xpath('//canvas[@id="signatureCanvasReserv"]'));
    LF.MakeSignJS('signatureCanvasReserv');
    SF.sleep(0.5);

    SF.click (By.xpath('//button[@ng-click="saveReservSignature();logClickButtons(\'Save reservation sign button clicked\')"]'));
    SF.sleep (1);
    LF.FillCardPayModal ();
    SF.waitForVisible (By.xpath('//div[@class="field-status confirm ng-scope"]'));
    driver.wait(driver.findElement(By.xpath('//div[@class="field-status confirm ng-scope"]/div')).getText().then(function(confirmed){
        VD.IWant (VD.VToEqual, confirmed, 'YOUR MOVE IS CONFIRMED AND SCHEDULED', 'статус не конферм, хотя должен был быть');
    }), config.timeout);
    JS.waitForNotExist('div.busyoverlay:visible');
    LF.LogoutFromAccount ();


    SF.endOfTest();
};
