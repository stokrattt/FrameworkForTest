module.exports = function main(SF, JS, JSstep, VD, V, By, until, FileDetector, system, condition, LF, config, constants) {
    global.fiber = Fiber.current;

    //=========================начинаем писать тест=============================
    V.client = {};
    V.client.name = SF.randomBukva(6) + '_t';
    V.client.fam = SF.randomBukva(6) + '_t';
    V.client.phone = SF.randomCifra(10);
    V.client.email = SF.randomBukvaSmall(6) + '@' + SF.randomBukvaSmall(4) + '.tes';
    V.client.passwd = 123;

    condition.nowWeDoing = 'заполняем верхнюю форму как MovingWithStorage';
    SF.get(V.frontURL);
    LF.FullSmallCalcAsMovingWithStorage(V.client);
    JS.waitForExist('ultrasmall-form #congrats_menu[style="right: 0px;"] a:contains("Proceed To View Your Quote")');
    JS.link('ultrasmall-form a:contains("Proceed To View Your Quote")');
    condition.nowWeDoing = 'зашли первый раз в аккаунт';
    SF.click(By.xpath('//button[@ng-click="cancel()"][contains(text(),"View request")]'));
    JS.waitForNotExist('div.busyoverlay:visible');
    SF.sleep(5);
    JS.waitForNotExist('div.busyoverlay:visible');
    LF.AccountToStorageEnterAddress();
    LF.AccountLocalAddInventory();
    LF.AccountLocalDetails();
    SF.waitForVisible(By.xpath('//li[@id="tab_Inventory"]//i[@class="icon-check"]'));
    SF.waitForVisible(By.xpath('//li[@id="tab_Details"]//i[@class="icon-check"]'));
    V.accountNumbersTo = {};
    LF.RememberAccountNumbers(V.accountNumbersTo);
    LF.addToCleanerJob(V.accountNumbersTo.Id);
    SF.sleep(1);
    condition.nowWeDoing = 'запомнили цифры ToStorage идём на From';
    SF.click(By.xpath('//a[@ng-click="vm.goToRequest(vm.request.storage_id)"]'));
    JS.waitForNotExist('div.busyoverlay:visible');
    SF.sleep(5);
    JS.waitForNotExist('div.busyoverlay:visible');
    LF.AccountFromStorageEnterAddress();
    V.accountNumbersFrom = {};
    LF.RememberAccountNumbers(V.accountNumbersFrom);
    LF.addToCleanerJob(V.accountNumbersFrom.Id);
    LF.LogoutFromAccount();

    condition.nowWeDoing = 'Зайти на админку, найти реквест To storage, выставить трак, проверить, запомнить и сравнить все цифры с аккаунтом, выставить sales, дать клиенту пароль, поставить Not Confirmed, сохранить.';
    SF.get(V.adminURL);
    LF.LoginToBoardAsAdmin();
    LF.OpenRequest(V.accountNumbersTo.Id);
    V.boardNumbersTo = {};
    LF.RememberDigitsRequestBoard(V.boardNumbersTo);
    JS.step(JSstep.selectTruck((V.boardNumbersTo.LaborTimeMax + V.boardNumbersTo.TravelTime) / 60));
    JS.scroll('div.ServicesCost:visible');
    LF.Validation_Compare_Account_Admin(V.accountNumbersTo, V.boardNumbersTo);
    SF.click(By.xpath('//a[@ng-click="select(tabs[7])"]'));
    SF.sleep(1);
    LF.SetManager('emilia');
    SF.click(By.xpath('//a[@ng-click="select(tabs[4])"]'));
    LF.SetClientPasswd(V.client.passwd);
    SF.click(By.xpath('//a[@ng-click="select(tabs[0])"]'));
    SF.sleep(1);
    SF.select(By.xpath('//select[@id="edit-status"]'), 2);
    SF.click(By.xpath('//button[@ng-click="UpdateRequest()"]'));
    JS.waitForExist('button[ng-click="update(request)"]:visible');
    SF.click(By.xpath('//button[@ng-click="update(request)"]'));
    LF.closeEditRequest();
    SF.sleep(2);
    LF.LogoutFromBoardAdmin();

    condition.nowWeDoing = 'Зайти в аккаунт и подтвердить первый реквест. Можно ещё раз сравнить все цифры с админкой';
    SF.get(V.accountURL);
    LF.LoginToAccountAsClient(V.client);
    SF.waitForVisible(By.xpath('//td[contains(text(),"' + V.accountNumbersTo.Id + '")]/following-sibling::td[1]'));
    driver.wait(driver.findElement(By.xpath('//td[contains(text(),"' + V.accountNumbersTo.Id + '")]/following-sibling::td[1]')).getText().then(function (Status) {
        VD.IWant(VD.VToEqual, Status, 'Not Confirmed');
    }), config.timeout);
    SF.click(By.xpath('//td[contains(text(),"' + V.accountNumbersTo.Id + '")]/following-sibling::td/button[contains(text(),"View")]'));
    SF.sleep(2);
    JS.waitForNotExist('div.busyoverlay:visible');
    V.accountNumbersTo = {};
    LF.RememberAccountNumbers(V.accountNumbersTo);
    LF.Validation_Compare_Account_Admin(V.accountNumbersTo, V.boardNumbersTo);
    LF.ConfirmRequestInAccount_WithReservation();
    SF.waitForVisible(By.xpath('//div[contains(text(),"Your move is confirmed and scheduled")]'));
    SF.sleep(2);
    JS.waitForNotExist('div.busyoverlay:visible');
    LF.LogoutFromAccount();

    condition.nowWeDoing = 'Зайти в local Dispatch, найти первый реквест, назначить команду и отправить работу.';
    SF.get(V.adminURL);
    LF.LoginToBoardAsAdmin();
    SF.click(By.xpath('//a[@ng-click="vm.goToPage(\'dispatch.local\', \'\')"]'));
    SF.waitForLocated(By.xpath('//a[@class="ui-datepicker-next ui-corner-all"]'));
    LF.findDayInLocalDispatch(V.boardNumbersTo.moveDate.Year, V.boardNumbersTo.moveDate.Month, V.boardNumbersTo.moveDate.Day);
    JS.waitForNotExist('div.busyoverlay:visible');
    SF.sleep(1);
    SF.click(By.xpath('//i[contains(@ng-click,"view.grid = true;")]'));
    JS.waitForNotExist('div.busyoverlay:visible');
    SF.sleep(1);
    LF.SelectRequestDispatch(V.accountNumbersTo.Id);
    LF.selectCrew();
    SF.sleep(2);
    LF.LogoutFromBoardAdmin();

    condition.nowWeDoing = 'Зайти под форменом, найти первую работу, зайти в Inventory, добавить состояния предметов, запомнить их';
    LF.LoginToBoardAsForeman();
    LF.OpenRequestDispatch(V.accountNumbersTo.Id);
    JS.waitForExist('h1:contains("Confirmation Page"):visible');
    SF.click(By.xpath('//li[@id="tab_Inventory"]'));
    SF.waitForVisible(By.xpath('//h4[contains(text(),"household goods descriptive inventory")]'));
    SF.sleep(1);
    JS.scroll("tr[ng-repeat=\"n in rangeArr\"]:eq(0)");

    for (let i = 1, invCount = 1; i <= 7; i++) {
        SF.click(By.xpath('//tr[@ng-repeat="n in rangeArr"][' + i + ']//button[1]'));
        SF.sleep(1);
        /*driver.wait(driver.executeScript('return $("ul#inventory-dropdown:visible li[ng-repeat=\\\"articles in  inventoryList | toArray | orderBy: \'title\'  \\\"]:visible").length').then(function(len){
         invCount=len-1;
         }),config.timeout);*/
        JS.click("ul#inventory-dropdown:visible li[ng-repeat=\\\"articles in  inventoryList | toArray | orderBy: 'title'  \\\"]:visible");
        SF.select(By.xpath('//tr[@ng-repeat="n in rangeArr"][' + i + ']//select[1]'), "CP");
        SF.click(By.xpath('//tr[@ng-repeat="n in rangeArr"][' + i + ']//button[@ng-click="openCondition(data[fieldName].inventory[n], n)"]'));
        JS.waitForExist('button[ng-click=\\"addCondition(key)\\"]:has(div:contains(\\"burned\\")):visible');
        SF.sleep(1);
        JS.click('button[ng-click=\\"addCondition(key)\\"]:has(div:contains(\\"burned\\"))');
        SF.click(By.xpath('//button[@ng-click="addLocation(symbol.key)"]/div[contains(text(),"veneer")]/..'));
        SF.click(By.xpath('//button[@ng-click="SaveExit()"]'));
        SF.sleep(2);
    }
    SF.clear(By.xpath('//input[@ng-model="data[fieldName].tapeNumbers"]'));
    SF.send(By.xpath('//input[@ng-model="data[fieldName].tapeNumbers"]'), 1);
    SF.click(By.xpath('//button[@id="btn-append-to-body"]'));
    JS.click('li[ng-click=\\"data[fieldName].tapeColor = \'Green\'; saveInventory()\\"]');
    LF.MakeSignInInventory(0);
    LF.MakeSignInInventory(1);
    SF.click(By.xpath('//button[@ng-click="saveInventory(\'submit\')"]'));
    SF.sleep(1);
    JS.waitForExist('div.showSweetAlert button.cancel:visible');
    JS.click('div.showSweetAlert button.cancel:visible');
    SF.waitForVisible(By.xpath('//input[@ng-model="data.agreement.phone"]'));
    SF.send(By.xpath('//input[@ng-model="data.agreement.phone"]'), V.client.phone);
    SF.send(By.xpath('//input[@ng-model="data.agreement.address"]'), 'Address To');
    SF.send(By.xpath('//input[@ng-model="data.agreement.zipCode"]'), '02461');
    LF.MakeSignInRental();
    LF.payRentalInventory();
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
    JS.waitForNotExist('div.busyoverlay:visible');
    SF.sleep(2);

    condition.nowWeDoing = 'закончили с инвентарём, подписываем первый контракт';
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
    JS.waitForNotExist('div.busyoverlay:visible');

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


    //*****************************************второй реквест******************************************

    condition.nowWeDoing = 'From storage, выставить трак, проверить, запомнить и сравнить все цифры с аккаунтом, выставить sales, дать клиенту пароль, поставить Not Confirmed, сохранить.';
    SF.get(V.adminURL);
    LF.LoginToBoardAsAdmin();
    LF.OpenRequest(V.accountNumbersFrom.Id);
    V.boardNumbersFrom = {};
    LF.RememberDigitsRequestBoard(V.boardNumbersFrom);
    JS.step(JSstep.selectTruck((V.boardNumbersFrom.LaborTimeMax + V.boardNumbersFrom.TravelTime) / 60));
    JS.scroll('div.ServicesCost:visible');
    LF.Validation_Compare_Account_Admin(V.accountNumbersFrom, V.boardNumbersFrom);
    SF.click(By.xpath('//a[@ng-click="select(tabs[7])"]'));
    SF.sleep(1);
    LF.SetManager('emilia');
    SF.click(By.xpath('//a[@ng-click="select(tabs[4])"]'));
    LF.SetClientPasswd(V.client.passwd);
    SF.click(By.xpath('//a[@ng-click="select(tabs[0])"]'));
    SF.sleep(1);
    SF.select(By.xpath('//select[@id="edit-status"]'), 2);
    SF.click(By.xpath('//button[@ng-click="UpdateRequest()"]'));
    JS.waitForExist('button[ng-click="update(request)"]:visible');
    SF.click(By.xpath('//button[@ng-click="update(request)"]'));
    JS.waitForExist('div.toast-success:visible');
    LF.closeEditRequest();
    SF.sleep(2);
    LF.LogoutFromBoardAdmin();

    condition.nowWeDoing = 'Подтвердить второй реквест. Можно ещё раз сравнить все цифры с админкой';
    SF.get(V.accountURL);
    LF.LoginToAccountAsClient(V.client);
    SF.waitForVisible(By.xpath('//td[contains(text(),"' + V.accountNumbersFrom.Id + '")]/following-sibling::td[1]'));
    driver.wait(driver.findElement(By.xpath('//td[contains(text(),"' + V.accountNumbersFrom.Id + '")]/following-sibling::td[1]')).getText().then(function (Status) {
        VD.IWant(VD.VToEqual, Status, 'Not Confirmed');
    }), config.timeout);
    SF.click(By.xpath('//td[contains(text(),"' + V.accountNumbersFrom.Id + '")]/following-sibling::td/button[contains(text(),"View")]'));
    SF.sleep(2);
    JS.waitForNotExist('div.busyoverlay:visible');
    SF.sleep(2);
    JS.waitForNotExist('div.busyoverlay:visible');
    V.accountNumbersFrom = {};
    LF.RememberAccountNumbers(V.accountNumbersFrom);
    LF.Validation_Compare_Account_Admin(V.accountNumbersFrom, V.boardNumbersFrom);
    LF.ConfirmRequestInAccount_WithReservation();
    SF.waitForVisible(By.xpath('//div[contains(text(),"Your move is confirmed and scheduled")]'));
    LF.LogoutFromAccount();

    condition.nowWeDoing = 'Найти второй реквест, назначить команду и отправить работу.';
    SF.get(V.adminURL);
    LF.LoginToBoardAsAdmin();
    SF.click(By.xpath('//a[@ng-click="vm.goToPage(\'dispatch.local\', \'\')"]'));
    SF.waitForLocated(By.xpath('//a[@class="ui-datepicker-next ui-corner-all"]'));
    LF.findDayInLocalDispatch(V.boardNumbersFrom.moveDate.Year, V.boardNumbersFrom.moveDate.Month, V.boardNumbersFrom.moveDate.Day);
    JS.waitForNotExist('div.busyoverlay:visible');
    SF.sleep(1);
    SF.click(By.xpath('//i[contains(@ng-click,"view.grid = true;")]'));
    JS.waitForNotExist('div.busyoverlay:visible');
    SF.sleep(1);
    LF.SelectRequestDispatch(V.accountNumbersFrom.Id);
    LF.selectCrew();
    SF.sleep(2);
    LF.LogoutFromBoardAdmin();

    condition.nowWeDoing = 'Найти вторую работу, зайти в Inventory, подтвердить состояния предметов, запомнить их';
    LF.LoginToBoardAsForeman();
    LF.OpenRequestDispatch(V.accountNumbersFrom.Id);
    JS.waitForExist('h1:contains("Confirmation Page"):visible');
    SF.click(By.xpath('//li[@id="tab_Inventory"]'));
    SF.waitForVisible(By.xpath('//h4[contains(text(),"household goods descriptive inventory")]'));
    SF.sleep(1);

    //тут нужно будет вставить валидацию инвентаря на контракте from storage

    LF.MakeSignInInventory(2);
    LF.MakeSignInInventory(3);
    SF.click(By.xpath('//button[@ng-click="saveInventory(\'submit\')"]'));
    SF.sleep(1);

    condition.nowWeDoing = 'закончили с инвентарём, подписываем второй контракт';
    SF.waitForVisible(By.xpath('//div[@class="empty-signature"]'));
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
    SF.sleep(2);
    JS.waitForNotExist('div.busyoverlay:visible');
    SF.sleep(2);
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

    condition.nowWeDoing="Вернуться в localDispatch, найти первый реквест, проверить и запомнить Payroll";
    LF.LoginToBoardAsAdmin();
    SF.click(By.xpath('//a[@ng-click="vm.goToPage(\'dispatch.local\', \'\')"]'));
    SF.waitForLocated(By.xpath('//a[@class="ui-datepicker-next ui-corner-all"]'));
    LF.findDayInLocalDispatch(V.boardNumbersTo.moveDate.Year, V.boardNumbersTo.moveDate.Month, V.boardNumbersTo.moveDate.Day);
    JS.waitForNotExist('div.busyoverlay:visible');
    SF.sleep(1);
    SF.click(By.xpath('//i[contains(@ng-click,"view.grid = true;")]'));
    SF.select(By.xpath('//select[@ng-model="vm.reqFilter.type"]'), 0);
    JS.waitForNotExist('div.busyoverlay:visible');
    SF.sleep(1);
    LF.OpenRequestDispatch(V.accountNumbersTo.Id);
    JS.waitForExist('label:contains("Balance:"):visible');
    LF.RememberDigitsRequestBoard_Down(V.boardNumbersTo);
    if (V.boardNumbersTo.Balance !== 0) {
        JS.scroll('div.BalanceCost:visible');
    }
    VD.IWant(VD.VToEqual, V.boardNumbersTo.Balance, 0, 'Баланс после закрытия не равен 0');
    JS.waitForExist('div[ng-click=\\"openSalaryCommisionModal();\\"]:visible');
    SF.click(By.xpath('//div[@ng-click="openSalaryCommisionModal();"]'));
    SF.waitForVisible(By.xpath('//button[@ng-click="reSubmitPayroll()"]'));
    JS.waitForNotExist('div.busyoverlay:visible');
    LF.RememberAndValidatePayroll_In_EditRequest(V.boardNumbersTo);
    SF.click(By.xpath('//button[@ng-click="cancel()"][contains(text(),"Close")]'));
    SF.sleep(2);
    LF.closeEditRequest();

    condition.nowWeDoing="найти второй реквест, проверить и запомнить Payroll";
    SF.waitForLocated(By.xpath('//a[@class="ui-datepicker-next ui-corner-all"]'));
    LF.findDayInLocalDispatch(V.boardNumbersFrom.moveDate.Year, V.boardNumbersFrom.moveDate.Month, V.boardNumbersFrom.moveDate.Day);
    JS.waitForNotExist('div.busyoverlay:visible');
    SF.sleep(1);
    SF.click(By.xpath('//i[contains(@ng-click,"view.grid = true;")]'));
    SF.select(By.xpath('//select[@ng-model="vm.reqFilter.type"]'), 0);
    JS.waitForNotExist('div.busyoverlay:visible');
    SF.sleep(1);
    LF.OpenRequestDispatch(V.accountNumbersFrom.Id);
    JS.waitForExist('label:contains("Balance:"):visible');
    LF.RememberDigitsRequestBoard_Down(V.boardNumbersFrom);
    if (V.boardNumbersFrom.Balance !== 0) {
        JS.scroll('div.BalanceCost:visible');
    }
    VD.IWant(VD.VToEqual, V.boardNumbersFrom.Balance, 0, 'Баланс после закрытия не равен 0');
    JS.waitForExist('div[ng-click=\\"openSalaryCommisionModal();\\"]:visible');
    JS.waitForNotExist('div.busyoverlay:visible');
    SF.click(By.xpath('//div[@ng-click="openSalaryCommisionModal();"]'));
    SF.waitForVisible(By.xpath('//button[@ng-click="reSubmitPayroll()"]'));
    JS.waitForNotExist('div.busyoverlay:visible');
    LF.RememberAndValidatePayroll_In_EditRequest(V.boardNumbersFrom);
    SF.click(By.xpath('//button[@ng-click="cancel()"][contains(text(),"Close")]'));
    SF.sleep(2);
    LF.closeEditRequest();

    condition.nowWeDoing = 'сейчас идём в пейролл и проверяем первую работы';
    SF.click(By.xpath("//button[@ng-click=\"toggleLeft()\"]"));
    SF.click(By.xpath("//a[@ng-click=\"vm.goToPage('dispatch.local', '')\"]"));
    SF.sleep(1);
    SF.click(By.xpath("//a[@ui-sref=\"dispatch.payroll\"]"));
    SF.sleep(1);
    JS.waitForNotExist('div.busyoverlay:visible');
    LF.selectDateInPayroll(V.boardNumbersTo.moveDate);
    LF.findTestForemanInPayroll();
    V.payrollNumbersTo = {
        Foreman:{}, Sale:{}
    };
    driver.wait(driver.executeScript('return $("tr:has(td[ng-click=\\\"editRequest(\'a_job_misc\', id, \'request\')\\\"]:contains(\'' +
        V.accountNumbersTo.Id + '\'))' +
        ' td[ng-click=\\\"editRequest(\'total\', id, \'request\')\\\"]").text()').then(function (text) {
        V.payrollNumbersTo.Foreman.Total = SF.cleanPrice(text);
        VD.IWant(VD.VToEqual, V.payrollNumbersTo.Foreman.Total, V.boardNumbersTo.Payroll.foremanForCommission.total, 'не совпали цифры ToStorage в Payroll foreman\n' +
            'id=' + V.accountNumbersTo.Id);
    }), config.timeout);
    SF.sleep(1);
    LF.selectDateInPayroll(V.boardNumbersFrom.moveDate);
    V.payrollNumbersFrom = {
        Foreman:{}, Sale:{}
    };
    driver.wait(driver.executeScript('return $("tr:has(td[ng-click=\\\"editRequest(\'a_job_misc\', id, \'request\')\\\"]:contains(\'' +
        V.accountNumbersFrom.Id + '\'))' +
        ' td[ng-click=\\\"editRequest(\'total\', id, \'request\')\\\"]").text()').then(function (text) {
        V.payrollNumbersFrom.Foreman.Total = SF.cleanPrice(text);
        VD.IWant(VD.VToEqual, V.payrollNumbersFrom.Foreman.Total, V.boardNumbersFrom.Payroll.foremanForCommission.total, 'не совпали цифры FromStorage в Payroll foreman\n' +
            'id=' + V.accountNumbersFrom.Id);
    }), config.timeout);
    SF.sleep(1);
    SF.click(By.xpath('//a[@ng-click="dTable=\'departments\';employee=\'\'"]'));
    SF.sleep(1);
    JS.waitForNotExist('div.busyoverlay:visible');

    condition.nowWeDoing = 'выбираем цифры менеджера';
    LF.findSaleInPayroll('emilia clark');
    LF.selectDateInPayroll(V.boardNumbersTo.moveDate);
    driver.wait(driver.executeScript('return $("tr:has(td[ng-click=\\\"editRequest(\'a_job_misc\', id, \'request\')\\\"]:contains(\'' +
        V.accountNumbersTo.Id + '\'))' +
        ' td[ng-click=\\\"editRequest(\'total\', id, \'request\')\\\"]").text()').then(function (text) {
        V.payrollNumbersTo.Sale.Total = SF.cleanPrice(text);
    }), config.timeout);
    SF.sleep(1);
    VD.IWant(VD.VToEqual, V.payrollNumbersTo.Sale.Total, V.boardNumbersTo.Payroll.managerForCommission.total, 'не совпали цифры в Payroll manager\n' +
        'id=' + V.accountNumbersTo.Id);
    LF.selectDateInPayroll(V.boardNumbersFrom.moveDate);
    driver.wait(driver.executeScript('return $("tr:has(td[ng-click=\\\"editRequest(\'a_job_misc\', id, \'request\')\\\"]:contains(\'' +
        V.accountNumbersFrom.Id + '\'))' +
        ' td[ng-click=\\\"editRequest(\'total\', id, \'request\')\\\"]").text()').then(function (text) {
        V.payrollNumbersFrom.Sale.Total = SF.cleanPrice(text);
    }), config.timeout);
    SF.sleep(1);
    VD.IWant(VD.VToEqual, V.payrollNumbersFrom.Sale.Total, V.boardNumbersFrom.Payroll.managerForCommission.total, 'не совпали цифры в Payroll manager\n' +
        'id=' + V.accountNumbersFrom.Id);


    //=========================закончили писать тест=============================
    SF.endOfTest();
};