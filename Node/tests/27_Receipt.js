module.exports = function main(SF, JS, JSstep, VD, V, By, until,FileDetector, system, condition, LF,config,constants){
    global.fiber = Fiber.current;
    V.client = {};
    V.client.name = SF.randomBukva(6) + '_t';
    V.client.fam = SF.randomBukva(6) + '_t';
    V.client.phone = SF.randomCifra(10);
    V.client.email = SF.randomBukvaSmall(6) + '@' + SF.randomBukvaSmall(4) + '.tes';

    SF.get(V.adminURL);

    SF.send(By.id('email'), 'TestAdmin');
    SF.send(By.id('password'), 'test');
    JS.click('.btn-primary');
    SF.sleep(3);
    LF.CreateLocalMovingFromBoard(V.client);
    SF.sleep(2);
    V.boardNumbers = {};
    LF.addInventoryBoard(V.boardNumbers);
    condition.nowWeDoing = 'запоминаем все данные';

    LF.RememberDigitsRequestBoard(V.boardNumbers);
    JS.step(JSstep.selectTruck((V.boardNumbers.LaborTimeMax + V.boardNumbers.TravelTime) / 60));
    LF.RememberDateFromRequest();

    driver.wait(driver.findElement(By.xpath('//a[@ng-click="select(tabs[0])"]')).getText().then(function (text) {
        V.request.Id = SF.cleanPrice(text);
        console.log(V.request.Id);
        LF.addToCleanerJob(V.request.Id);
    }), config.timeout);
    JS.select('#edit-status', 2);
    SF.send (By.id('edit-moving-from'), 2342342342424);
    SF.send (By.xpath('//input[@ng-model="request.field_moving_to.thoroughfare"]'), 34654564564);
    JS.click ('button[ng-click=\\"UpdateRequest()\\"]');
    SF.waitForVisible (By.xpath('//button[@ng-click="update(request)"]'));
    SF.click (By.xpath('//button[@ng-click="update(request)"]'));
    SF.sleep (6);
    SF.click (By.xpath('//a[@ng-click="select(tabs[4])"]'));
    SF.sleep (0.5);
    V.client.passwd = 123;
    SF.send (By.id('inputPassword3'), V.client.passwd);
    SF.click (By.xpath('//button[@ng-click="update(client)"]'));
    SF.sleep (3);
    JS.waitForNotExist('div.toast-success');
    LF.closeEditRequest();
    SF.sleep (2);
condition.nowWeDoing = 'зашли под клиентом в акк';
    LF.LogoutFromBoardAdmin ();
    SF.get(V.accountURL);
    LF.LoginToAccountAsClient (V.client, V.client.passwd);
    SF.waitForVisible(By.xpath('//td[contains(text(),"'+V.request.Id+'")]/following-sibling::td[1]'));
    driver.wait(driver.findElement(By.xpath('//td[contains(text(),"'+V.request.Id+'")]/following-sibling::td[1]')).getText().then(function(Status){
        VD.IWant(VD.VToEqual,Status,'Not Confirmed');
    }));
    SF.click(By.xpath('//td[contains(text(),"'+V.request.Id+'")]/following-sibling::td/button[contains(text(),"View")]'));
    SF.sleep(2);
    SF.waitForVisible (By.xpath('//button[@ng-click="cancel()"]'));
    SF.click (By.xpath('//button[@ng-click="cancel()"]'));
    SF.sleep (0.5);
    SF.click (By.xpath('//div[@class="field-status notconfirmed ng-scope"]/a'));
    SF.click (By.xpath('//i[@class="fa fa-angle-down arrow-down"]'));
    SF.sleep (0.5);
    SF.click (By.id('terms'));
    SF.click (By.id('cancel_policy'));
    SF.sleep (2);
    SF.click (By.id('paybutton'));
    /*SF.waitForVisible (By.xpath('//div[@class="sweet-alert showSweetAlert visible"]'));
    SF.click (By.xpath('//button[@class="confirm"]'));
*/

    SF.waitForVisible(By.xpath('//canvas[@id="signatureCanvasReserv"]'));
    LF.MakeSignJS('signatureCanvasReserv');
    SF.sleep(0.5);
    /*JS.waitForExist ('div[class="sweet-overlay"]:visible');
    SF.click (By.xpath('//button[@class="confirm"]'));*/
    SF.click(By.xpath('//button[@ng-click="saveReservSignature();logClickButtons(\'Save reservation sign button clicked\')"]'));
    SF.sleep (1);
    LF.FillCardPayModal ();
    SF.waitForVisible (By.xpath('//div[@class="field-status confirm ng-scope"]'));
    driver.wait(driver.findElement(By.xpath('//div[@class="field-status confirm ng-scope"]/div')).getText().then(function(confirmed){
        VD.IWant (VD.VToEqual, confirmed, 'YOUR MOVE IS CONFIRMED AND SCHEDULED', 'статус не конферм, хотя должен был быть');
    }), config.timeout);
    LF.LogoutFromAccount ();


    SF.get (V.adminURL);
    LF.LoginToBoardAsAdmin ();
    SF.sleep (2);
condition.nowWeDoing = 'идем в диспач первый раз';
    SF.click (By.xpath('//button[@ng-click="toggleLeft()"]'));
    SF.click (By.xpath('//a[@ng-click="vm.goToPage(\'dispatch.local\', \'\')"]'));
    SF.sleep (7);
    SF.waitForLocated(By.xpath('//a[@class="ui-datepicker-next ui-corner-all"]'));
    LF.findDayInLocalDispatch(V.boardNumbers.moveDate.Year,V.boardNumbers.moveDate.Month,V.boardNumbers.moveDate.Day);
    JS.waitForNotExist('div.busyoverlay:visible');
    SF.sleep(1);
    SF.click(By.xpath('//i[contains(@ng-click,"view.grid = true;")]'));
    LF.SelectRequestDispatch (V.request.Id);
    LF.selectCrew();
    LF.LogoutFromBoardAdmin();
condition.nowWeDoing = 'заходим под форменом, открываем контракт';
    LF.LoginToBoardAsForeman();
    LF.OpenRequestDispatch(V.request.Id);
    JS.waitForExist('h1:contains("Confirmation Page"):visible');
    SF.click(By.xpath('//li[@id="tab_Bill of lading"]'));
    SF.sleep(1);
    LF.MakeSignInContract();
    LF.MakeSignInContract();
    SF.select(By.xpath('//select[@ng-model="data.declarationValue.selected"]'), 'a');
    LF.MakeSignInContract();
    LF.MakeSignInContract();
    LF.MakeSignInContract();
    SF.click(By.xpath('//div[@ng-click="applyPayment(paymentButton())"]'));
    SF.click(By.xpath('//div[@ng-click="tipsPercChange(10)"]'));
    SF.click(By.xpath('//div[contains(text(),"ADD TIPS")]/parent::div[@ng-click="tipsSelected()"]'));
    SF.click(By.xpath('//button[@ng-click="goStepTwo();"]'));
    LF.FillCardPayModal();
    LF.MakeSignJS('signatureCanvasPayment');
    SF.click(By.xpath('//div[@ng-init="payment.canvasInit(\'signatureCanvasPayment\')"]//button[@ng-click="saveSignature()"]'));
    JS.waitForExist('input#inputImage');
    /**********************************************************************************************************************************************/
    driver.wait(new FileDetector().handleFile(driver, system.path.resolve('./files/squirrel.jpg')).then(function (path) {
        V.path = path;
    }), config.timeout);
    SF.sleep(1);
    /**********************************************************************************************************************************************/
    console.log(V.path);
    SF.send(By.xpath('//input[@id="inputImage"]'), V.path);
    SF.sleep(1);
    SF.send(By.xpath('//input[@id="inputImage"]'), V.path);
    SF.sleep(1);
    SF.click(By.xpath('//button[contains(@ng-click,"saveFile()")]'));
    JS.waitForNotExist("button[ng-click=\"saveFile()\"]");
    JS.waitForNotExist('div.busyoverlay:visible');
    SF.sleep (3);
    LF.MakeSignInContract();
    LF.MakeSignInContract();
    SF.click(By.xpath('//button[@ng-click="submitContractBtn({ isBtn: true })"]'));
    JS.waitForExist('div.sa-placeholder:visible');
    SF.sleep(1);
    SF.click(By.xpath('//button[@class="confirm"]'));
    JS.scroll('a:contains("Return to foreman page")');
    JS.waitForNotExist('div.busyoverlay:visible');
    SF.sleep(1);
    SF.click(By.xpath('//a[contains(text(),"Return to foreman page")]'));
    JS.waitForExist('li.dropdown.profile:visible');
    LF.LogoutFromBoardForeman();
condition.nowWeDoing = 'идем в админку в диспач второй раз, проверить что работа есть в done и что баланс равен 0 после подписания';
    LF.LoginToBoardAsAdmin();
    SF.sleep (3);
    SF.click(By.xpath('//a[@ng-click="vm.goToPage(\'dispatch.local\', \'\')"]'));
    SF.waitForLocated(By.xpath('//a[@class="ui-datepicker-next ui-corner-all"]'));
    LF.findDayInLocalDispatch(V.boardNumbers.moveDate.Year, V.boardNumbers.moveDate.Month, V.boardNumbers.moveDate.Day);
    JS.waitForNotExist('div.busyoverlay:visible');
    SF.sleep(1);
    SF.click(By.xpath('//i[contains(@ng-click,"view.grid = true;")]'));
    SF.select(By.xpath('//select[@ng-model="vm.reqFilter.type"]'), 0);
    JS.waitForNotExist('div.busyoverlay:visible');
    SF.sleep(3);
    LF.OpenRequestDispatch(V.request.Id);
    JS.waitForExist('label:contains("Balance:"):visible');
    LF.RememberDigitsRequestBoard_Down(V.boardNumbers);
    SF.sleep (2);
    if (V.boardNumbers.Balance !== 0) {
        JS.scroll('div.BalanceCost:visible');
    }
    VD.IWant(VD.VToEqual, V.boardNumbers.Balance, 0, 'Баланс после закрытия не равен 0');
condition.nowWeDoing = 'идем в паймент и проверяем что данные оплаты совпадают с тем что написано в receipt';
    JS.click('label[ng-click=\\"OpenPaymentModal();\\"]');
    SF.waitForVisible (By.xpath('//div[@class="inside_box"]'));
    SF.sleep (3);
    driver.wait(driver.findElement(By.xpath('//tbody/tr[1][@ng-click="prepareToDelete($index, receipt.id)"]/td[4]')).getText().then(function(text){
        V.payment1 = SF.cleanPrice (text);
        console.log (V.payment1);
    }),config.timeout);
    //driver.wait(driver.executeScript("$('tbody tr:nth-child(1)[ng-click=\"prepareToDelete($index, receipt.id)\"]:visible').dblclick();"), config.timeout);
    driver.actions().mouseMove(driver.findElement(By.xpath('//tr[@ng-click="prepareToDelete($index, receipt.id)"]'))).doubleClick().perform();
    JS.waitForNotExist('div.busyoverlay:visible');
    SF.waitForVisible (By.xpath('//span[contains(text(), "Amount: ")]'));
    driver.wait(driver.findElement(By.xpath('//span[contains(text(), "Amount: ")]/following-sibling::span')).getText().then(function(text){
        V.paymentAmount1 = SF.cleanPrice (text);
        VD.IWant (VD.VToEqual, V.paymentAmount1, V.payment1, 'оплата не совпала')
    }),config.timeout);
    SF.sleep (3);
    SF.click (By.xpath('//h2[contains(text(), "Receipt ")]/../../..//button[@ng-click="cancel()"]'));
    SF.sleep(3);

    driver.wait(driver.findElement(By.xpath('//tbody/tr[2][@ng-click="prepareToDelete($index, receipt.id)"]/td[4]')).getText().then(function(text){
        V.payment2 = SF.cleanPrice (text);
        console.log (V.payment2);
    }),config.timeout);
    driver.actions().mouseMove(driver.findElement(By.xpath('//tr[2][@ng-click="prepareToDelete($index, receipt.id)"]'))).doubleClick().perform();
    SF.sleep(3);
    JS.waitForNotExist('div.busyoverlay:visible');
    SF.waitForVisible (By.xpath('//span[contains(text(), "Amount: ")]'));
    driver.wait(driver.findElement(By.xpath('//span[contains(text(), "Amount: ")]/following-sibling::span')).getText().then(function(text){
        V.paymentAmount2 = SF.cleanPrice (text);
        VD.IWant (VD.VToEqual, V.paymentAmount2, V.payment2, 'оплата не совпала')
    }),config.timeout);
    SF.sleep (3);
    SF.click (By.xpath('//h2[contains(text(), "Receipt ")]/../../..//button[@ng-click="cancel()"]'));
    SF.sleep(3);
    SF.click (By.xpath('//a[@ng-click="createInvoice()"]/../..//button[@ng-click="cancel()"]'));
    SF.sleep(2);
    LF.closeEditRequest ();
    LF.LogoutFromBoardAdmin ();


    //=========================закончили писать тест=============================
    SF.endOfTest();
};
