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
    SF.sleep (2);

    LF.addInventoryBoard ();
    condition.nowWeDoing = 'запоминаем все данные';

    V.boardNumbers = {};
    LF.RememberDigitsRequestBoard(V.boardNumbers);
    JS.step(JSstep.selectTruck((V.boardNumbers.LaborTimeMax + V.boardNumbers.TravelTime)/60));
    LF.RememberDateFromRequest ();

    driver.wait(driver.findElement(By.xpath('//a[@ng-click="select(tabs[0])"]')).getText().then(function(text){
        V.request.Id = SF.cleanPrice(text);
        console.log (V.request.Id);
        LF.addToCleanerJob(V.request.Id);
    }), config.timeout);
    JS.select ('#edit-status', 3);
    SF.send (By.id('edit-moving-from'), 2342342342424);
    SF.send (By.xpath('//input[@ng-model="request.field_moving_to.thoroughfare"]'), 34654564564);
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
condition.nowWeDoing = 'идем в админку в диспач второй раз, проверить что работа есть в done и что баланс равен 0 после подписания';

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
    LF.closeEditRequest ();
    LF.LogoutFromBoardAdmin ();


    //=========================закончили писать тест=============================
    SF.endOfTest();
};
