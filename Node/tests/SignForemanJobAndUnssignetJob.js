module.exports = function main(SF, JS, JSstep, VD, V, By, until, FileDetector, system, condition, LF, config, constants){
    global.fiber = Fiber.current;
    V.client = {};
    V.client.name = SF.randomBukva(6) + '_t';
    V.client.fam = SF.randomBukva(6) + '_t';
    V.client.phone = SF.randomCifra(10);
    V.client.email = SF.randomBukvaSmall(6) + '@' + SF.randomBukvaSmall(4) + '.tes';
    V.boardNumbers = {};

    SF.get(V.adminURL);

    SF.send(By.id('email'), 'TestAdmin');
    SF.send(By.id('password'), 'test');
    JS.click('.btn-primary');
    SF.sleep(3);

    JS.waitForNotExist('div.toast-success');
    JS.waitForNotExist('div.busyoverlay:visible');
    SF.click(By.linkText('Create Request'));
    SF.sleep(5);
    SF.click(By.xpath('//div[@class="step1"]//select[@name="move_service_type"]/option[@value="number:3"]'));
    SF.click(By.xpath('//input[@id="edit-move-date-datepicker-popup-0"]'));
    V.request = {};
    driver.wait(driver.executeScript(JSstep.Click4DaysCalendar).then(function (calDate) {
        V.request.moveDate = calDate;
        console.log(V.request);
    }),config.timeout);
    SF.sleep(0.5);
    SF.click(By.xpath('//ul[@class="chosen-choices"]'));
    SF.click(By.xpath('//ul[@class="chosen-results"]/li[@data-option-array-index="1"]'));
    SF.send(By.id("edit-zip-code-from"), "02032");
    SF.sleep(2);
    SF.click(By.xpath('//button[@ng-click="Calculate()"]'));
    SF.sleep(1);
    JS.waitForNotExist('div.busyoverlay:visible');
    SF.sleep(1);
    SF.click(By.xpath('//button[@ng-click="step2 = false;step3 = true;"]'));
    SF.sleep(2);
    SF.send(By.xpath('//div[@class="step3"]//input[@ng-model="editrequest.account.fields.field_user_first_name"]'), V.client.name);
    SF.send(By.xpath('//div[@class="step3"]//input[@ng-model="editrequest.account.fields.field_user_last_name"]'), V.client.fam);
    SF.send(By.xpath('//div[@class="step3"]//input[@ng-model="editrequest.account.mail"]'), V.client.email);
    SF.send(By.xpath('//div[@class="step3"]//input[@ng-model="editrequest.account.fields.field_primary_phone"]'), V.client.phone);
    SF.click(By.xpath('//button[@ng-click="create()"]'));
    SF.waitForVisible(By.xpath('//div[@ng-click="chooseTruck(tid)"]'));
    SF.sleep(4);
    console.log('создали реквест');

    SF.sleep (2);

    LF.RememberDateFromRequest ();
    driver.wait(driver.findElement(By.xpath('//a[@ng-click="select(tabs[0])"]')).getText().then(function(text){
        V.request.Id = SF.cleanPrice(text);
        console.log (V.request.Id);
        LF.addToCleanerJob(V.request.Id);
    }), config.timeout);
    JS.select ('#edit-status', 3);
    JS.step(JSstep.selectTruck);

    SF.send (By.id('edit-moving-from'), 2342342342424);
    JS.click ('button[ng-click=\\"UpdateRequest()\\"]');
    SF.waitForVisible (By.xpath('//button[@ng-click="update(request)"]'));
    SF.click (By.xpath('//button[@ng-click="update(request)"]'));
    SF.sleep (5);
    LF.closeEditRequest();
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
    condition.nowWeDoing = 'идем в админку в диспач второй раз, удалить форемана';

    LF.LoginToBoardAsAdmin();
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

    SF.click(By.xpath('//div[@ng-click="openSalaryCommisionModal();"]'));
    SF.waitForVisible(By.xpath('//button[@ng-click="reSubmitPayroll()"]'));
    JS.waitForNotExist('div.busyoverlay:visible');
    SF.click(By.xpath('//div[@id="invoice"]//a[@ng-click="select(tabs[1])"]'));
    SF.click(By.xpath('//span[@ng-click="removeWorker(foremanIndex, \'foreman\')"]'));
    SF.waitForLocated (By.xpath('//div[@class="sweet-alert showSweetAlert visible"]'));
    SF.click(By.xpath('//button[@class="confirm"]'));
    SF.sleep (2);
    JS.waitForNotExist('div.toast-success');
    SF.click (By.xpath('//button[@ng-click="reSubmitPayroll()"]'));
    SF.waitForLocated (By.xpath('//div[@class="sweet-alert showSweetAlert visible"]'));
    SF.click(By.xpath('//button[@class="confirm"]'));
    SF.waitForLocated (By.xpath('//div[@class="sweet-alert showSweetAlert visible"]'));
    SF.click(By.xpath('//button[@class="confirm"]'));
    SF.sleep (3);
    //SF.click(By.xpath('//button[@ng-click="cancel()"]'));
    SF.click(By.xpath('//button[@ng-click="cancel()"][contains(text(),"Close")]'));
    SF.sleep(2);
    LF.closeEditRequest ();
    LF.LogoutFromBoardAdmin();
    LF.LoginToBoardAsForeman ();

    condition.nowWeDoing = 'идем на форемана проверить что он удалился с  работы';

    SF.sleep (3);

    driver.wait(driver.executeScript("return $('td:contains("+V.request.Id+")').length").then (function (check) {
        VD.INeed(VD.VToEqual, check, 0, 'фореман не удалился с реквеста');
    }),config.timeout);
    SF.sleep (1);
    SF.click(By.xpath('//a[@ui-sref="foreman.done"]'));
    SF.sleep (5);
    driver.wait(driver.executeScript("return $('td:contains("+V.request.Id+")').length").then (function (check) {
        VD.INeed(VD.VToEqual, check, 0, 'фореман не удалился с реквеста');
    }),config.timeout);
    SF.sleep (1);
    LF.LogoutFromBoardForeman();




    //=========================закончили писать тест=============================
    SF.endOfTest();
};
