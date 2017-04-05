module.exports = function main(driver, SF, JS, JSstep, VD, V, By, until,FileDetector, system, condition, LF,config,constants){
    global.fiber = Fiber.current;
    V.client = {};
    V.client.name = SF.randomBukva(6) + '_t';
    V.client.fam = SF.randomBukva(6) + '_t';
    V.client.phone = SF.randomCifra(10);
    V.client.email = SF.randomBukvaSmall(6) + '@' + SF.randomBukvaSmall(4) + '.tes';
    V.client.passwd = 123;
    SF.get(V.frontURL);
    condition.nowWeDoing = 'заполняем калькулятор верхний';
    LF.FullSmallCalcAsLocal(V.client);

    console.log("заполнили форму");
    condition.nowWeDoing = 'первый раз в аккаунте';
    SF.click(By.xpath('//button[@ng-click="cancel()"][contains(text(),"View request")]'));
    JS.waitForNotExist('div.busyoverlay:visible');
    SF.sleep(5);
    JS.waitForNotExist('div.busyoverlay:visible');
    SF.click(By.xpath('//label[@for="partial"]/input[@ng-model="vm.packing_service"]'));
    LF.AccountLocalEnterAddress();
    LF.AccountLocalAddInventory();
    LF.AccountLocalDetails();
    SF.waitForVisible(By.xpath('//li[@id="tab_Inventory"]//i[@class="icon-check"]'));
    SF.waitForVisible(By.xpath('//li[@id="tab_Details"]//i[@class="icon-check"]'));
    LF.RememberAccountNumbers();

    LF.LogoutFromAccount();
    console.log('закончили с аккаунтом');

    condition.nowWeDoing = 'первый раз в админке';
    SF.get(V.adminURL);
    LF.LoginToBoardAsAdmin();
    LF.OpenRequest(V.accountNumbers.Id);

    SF.waitForVisible(By.xpath('//div[@ng-click="chooseTruck(tid)"]'));
    JS.step(JSstep.selectTruck);

    LF.RememberDigitsRequestBoard();
    LF.Validation_Compare_Account_Admin();

    SF.click(By.xpath('//a[@ng-click="select(tabs[7])"]'));
    SF.sleep(1);
    LF.SetManager('emilia');
    SF.click(By.xpath('//a[@ng-click="select(tabs[4])"]'));
    LF.SetClientPasswd();
    SF.click(By.xpath('//a[@ng-click="select(tabs[0])"]'));
    SF.sleep(1);
    SF.select(By.xpath('//select[@id="edit-status"]'), 2);
    SF.click(By.xpath('//button[@ng-click="UpdateRequest()"]'));
    JS.waitForExist('button[ng-click="update(request)"]:visible');
    SF.click(By.xpath('//button[@ng-click="update(request)"]'));
    JS.waitForNotExist("div.busyoverlay:visible");
    LF.closeEditRequest();
    SF.sleep(2);
    LF.LogoutFromBoardAdmin();

    condition.nowWeDoing = 'второй раз в аккаунте, конфёрмим';
    SF.get(V.accountURL);
    LF.LoginToAccountAsClient(V.client);
    SF.waitForVisible(By.xpath('//td[contains(text(),"' + V.accountNumbers.Id + '")]/following-sibling::td[1]'));
    driver.wait(driver.findElement(By.xpath('//td[contains(text(),"' + V.accountNumbers.Id + '")]/following-sibling::td[1]')).getText().then(function (Status) {
        VD.IWant(VD.VToEqual, Status, 'Not Confirmed');
    }));
    SF.click(By.xpath('//td[contains(text(),"' + V.accountNumbers.Id + '")]/following-sibling::td/button[contains(text(),"View")]'));
    SF.sleep(2);
    JS.waitForNotExist('div.busyoverlay:visible');
    LF.RememberAccountNumbers();
    LF.Validation_Compare_Account_Admin();
    LF.ConfirmRequestInAccount_WithReservation();
    SF.waitForVisible(By.xpath('//div[contains(text(),"Your move is confirmed and scheduled")]'));
    LF.LogoutFromAccount();

    condition.nowWeDoing = 'второй раз в админке, локал диспатч';
    SF.get(V.adminURL);
    LF.LoginToBoardAsAdmin();
    SF.click(By.xpath('//a[@ng-click="vm.goToPage(\'dispatch.local\', \'\')"]'));
    SF.waitForLocated(By.xpath('//a[@class="ui-datepicker-next ui-corner-all"]'));
    LF.findDayInLocalDispatch(V.boardNumbers.moveDate.Year, V.boardNumbers.moveDate.Month, V.boardNumbers.moveDate.Day);
    JS.waitForNotExist('div.busyoverlay:visible');
    SF.sleep(1);
    SF.click(By.xpath('//i[contains(@ng-click,"view.grid = true;")]'));
    JS.waitForNotExist('div.busyoverlay:visible');
    SF.sleep(1);
    LF.SelectRequestDispatch(V.accountNumbers.Id);
    LF.selectCrew();
    LF.LogoutFromBoardAdmin();

    condition.nowWeDoing = 'заходим под форменом, открываем контракт';
    LF.LoginToBoardAsForeman();
    LF.OpenRequestDispatch(V.accountNumbers.Id);
    JS.waitForExist('h1:contains("Confirmation Page"):visible');
    SF.click(By.xpath('//li[@id="tab_Bill of lading"]'));
    SF.sleep(1);
    driver.wait(driver.executeScript(JSstep.CheckSumsInContract).then(function (costs) {
        VD.IWant(VD.VToEqual, costs.sumPacking, costs.totalPacking, 'Не совпали суммы Packing');
        VD.IWant(VD.VToEqual, costs.sumServices, costs.totalServices, 'Не совпали суммы Services');
    }));
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
    driver.wait(new FileDetector().handleFile(driver, system.path.resolve('./files/squirrel.jpg')).then(function (path) {
        V.path = path;
    }), config.timeout);
    SF.sleep(1);
    console.log(V.path);
    SF.send(By.xpath('//input[@id="inputImage"]'), V.path);
    SF.sleep(1);
    SF.send(By.xpath('//input[@id="inputImage"]'), V.path);
    SF.sleep(1);
    SF.click(By.xpath('//button[contains(@ng-click,"saveFile()")]'));
    JS.waitForNotExist("button[ng-click=\"saveFile()\"]");
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

    condition.nowWeDoing = 'возвращаемся в диспатч, смотрим пейролл';
    LF.LoginToBoardAsAdmin();
    SF.click(By.xpath('//a[@ng-click="vm.goToPage(\'dispatch.local\', \'\')"]'));
    SF.waitForLocated(By.xpath('//a[@class="ui-datepicker-next ui-corner-all"]'));
    LF.findDayInLocalDispatch(V.boardNumbers.moveDate.Year, V.boardNumbers.moveDate.Month, V.boardNumbers.moveDate.Day);
    JS.waitForNotExist('div.busyoverlay:visible');
    SF.sleep(1);
    SF.click(By.xpath('//i[contains(@ng-click,"view.grid = true;")]'));
    SF.select(By.xpath('//select[@ng-model="vm.reqFilter.type"]'), 0);
    JS.waitForNotExist('div.busyoverlay:visible');
    SF.sleep(1);
    LF.OpenRequestDispatch(V.accountNumbers.Id);
    JS.waitForExist('label:contains("Balance:"):visible');

    LF.RememberDigitsRequestBoard_Down();
    if (V.boardNumbers.Balance !== 0) {
        JS.scroll('div.BalanceCost:visible');
    }
    VD.IWant(VD.VToEqual, V.boardNumbers.Balance, 0, 'Баланс после закрытия не равен 0');
    SF.click(By.xpath('//div[@ng-click="openSalaryCommisionModal();"]'));
    SF.waitForVisible(By.xpath('//button[@ng-click="reSubmitPayroll()"]'));
    JS.waitForNotExist('div.busyoverlay:visible');

    LF.RememberAndValidatePayroll_In_EditRequest();

    condition.nowWeDoing = 'сейчас идём в пейролл';
    SF.click(By.xpath('//button[@ng-click="cancel()"][contains(text(),"Close")]'));
    SF.sleep(2);
    LF.closeEditRequest();
    SF.click(By.xpath("//button[@ng-click=\"toggleLeft()\"]"));
    SF.click(By.xpath("//a[@ng-click=\"vm.goToPage('dispatch.local', '')\"]"));
    SF.sleep(1);
    SF.click(By.xpath("//a[@ui-sref=\"dispatch.payroll\"]"));
    SF.sleep(1);
    JS.waitForNotExist('div.busyoverlay:visible');
    LF.findTestForemanInPayroll();
    LF.selectDateInPayroll(V.boardNumbers.moveDate);

    condition.nowWeDoing = 'выбираем цифры формена';
    V.payrollNumbers = {
        Foreman:{}, Sale:{}
    };
    driver.wait(driver.executeScript('return $("tr:has(td[ng-click=\\\"editRequest(\'a_job_misc\', id, \'request\')\\\"]:contains(\'' +
        V.accountNumbers.Id + '\'))' +
        ' td[ng-click=\\\"editRequest(\'total\', id, \'request\')\\\"]").text()').then(function (text) {
        V.payrollNumbers.Foreman.Total = SF.cleanPrice(text);
        VD.IWant(VD.VToEqual, V.payrollNumbers.Foreman.Total, V.boardNumbers.Payroll.foremanForCommission.total, 'не совпали цифры в Payroll foreman\n' +
            'id=' + V.accountNumbers.Id);
    }), config.timeout);
    SF.sleep(1);

    SF.click(By.xpath('//a[@ng-click="dTable=\'departments\';employee=\'\'"]'));
    SF.sleep(1);
    JS.waitForNotExist('div.busyoverlay:visible');

    condition.nowWeDoing = 'выбираем цифры менеджера';
    LF.findSaleInPayroll('emilia clark');
    driver.wait(driver.executeScript('return $("tr:has(td[ng-click=\\\"editRequest(\'a_job_misc\', id, \'request\')\\\"]:contains(\'' +
        V.accountNumbers.Id + '\'))' +
    ' td[ng-click=\\\"editRequest(\'total\', id, \'request\')\\\"]").text()').then(function (text) {
        V.payrollNumbers.Sale.Total = SF.cleanPrice(text);
    }), config.timeout);
    SF.sleep(1);

    VD.IWant(VD.VToEqual, V.payrollNumbers.Sale.Total, V.boardNumbers.Payroll.managerForCommission.total, 'не совпали цифры в Payroll manager\n' +
        'id=' + V.accountNumbers.Id);


    SF.endOfTest();
};