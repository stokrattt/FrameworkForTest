module.exports = function main(SF, JS, MF, LF, JSstep, VD, V, By, until,FileDetector, system, condition, config,constants) {
    global.fiber = Fiber.current;

    //=========================начинаем писать тест=============================
    V.client = {};
    V.client.name = SF.randomBukva(6) + '_t';
    V.client.fam = SF.randomBukva(6) + '_t';
    V.client.phone = SF.randomCifra(10);
    V.client.email = SF.randomBukvaSmall(6) + '@' + SF.randomBukvaSmall(4) + '.tes';
    V.client.passwd = 123;

    condition.nowWeDoing = 'создаём с борда MovingWithStorage';
    SF.get(V.adminURL);
    LF.LoginToBoardAsAdmin();
    //Debug.pause();
    LF.CreateMovAndStorFromBoard(V.client, 40);

    condition.nowWeDoing = 'Законфёрмить сразу реквест';
    V.boardNumbersTo = {};
    LF.addInventoryBoard ();
    LF.RememberDigitsRequestBoard(V.boardNumbersTo);
    LF.addToCleanerJob(V.boardNumbersTo.Id);
    LF.addToCleanerJob(V.boardNumbersTo.Id+1);
    JS.step(JSstep.selectTruck((V.boardNumbersTo.LaborTimeMax + V.boardNumbersTo.TravelTime) / 60));
    JS.scroll('div.ServicesCost:visible');
    SF.click(By.xpath('//a[@ng-click="select(tabs[7])"]'));
    SF.sleep(1);
    LF.SetManager('emilia');
    SF.click(By.xpath('//a[@ng-click="select(tabs[4])"]'));
    LF.SetClientPasswd(V.client.passwd);
    SF.click(By.xpath('//a[@ng-click="select(tabs[0])"]'));
    SF.sleep(1);
    SF.select(By.xpath('//select[@id="edit-status"]'), 3);
    SF.send(By.xpath('//input[@ng-model="request.field_moving_from.thoroughfare"]'),'Address From');
    JS.click('button[ng-click=\\"UpdateRequest()\\"]');
    JS.waitForExist('button[ng-click="update(request)"]:visible');
    SF.click(By.xpath('//button[@ng-click="update(request)"]'));
    LF.closeEditRequest();
    SF.sleep(2);

    condition.nowWeDoing = 'Зайти в local Dispatch, найти первый реквест, назначить команду и отправить работу.';
    SF.click(By.xpath('//a[@ng-click="vm.goToPage(\'dispatch.local\', \'\')"]'));
    SF.waitForLocated(By.xpath('//a[@class="ui-datepicker-next ui-corner-all"]'));
    LF.findDayInLocalDispatch(V.boardNumbersTo.moveDate.Year, V.boardNumbersTo.moveDate.Month, V.boardNumbersTo.moveDate.Day);
    SF.sleep(1);
    JS.waitForNotExist('div.busyoverlay:visible');
    SF.sleep(2);
    JS.waitForNotExist('div.busyoverlay:visible');
    SF.click(By.xpath('//i[contains(@ng-click,"view.grid = true;")]'));
    JS.waitForNotExist('div.busyoverlay:visible');
    SF.sleep(1);
    LF.SelectRequestDispatch(V.boardNumbersTo.Id);
    LF.selectCrew();
    SF.sleep(2);
    LF.LogoutFromBoardAdmin();

    condition.nowWeDoing = 'Зайти под форменом, найти первую работу, зайти в Inventory, добавить состояния предметов, запомнить их';
    LF.LoginToBoardAsForeman();
    LF.OpenRequestDispatch(V.boardNumbersTo.Id);
    JS.waitForExist('h1:contains("Confirmation Page"):visible');
    SF.click(By.xpath('//li[@id="tab_Inventory"]'));
    SF.waitForVisible(By.xpath('//h4[contains(text(),"household goods descriptive inventory")]'));
    SF.sleep(1);
    JS.scroll("tr[ng-repeat=\"n in rangeArr\"]:eq(0)");

    for (let i = 1, invCount = 1; i <= 7; i++) {
        SF.click(By.xpath('//tr[@ng-repeat="n in rangeArr"][' + i + ']//button[1]'));
        SF.sleep(1);
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
    LF.payRentalInventory(V.boardNumbersTo);
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
    SF.sleep(4);
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
    LF.OpenRequest(V.boardNumbersTo.Id+1);
    V.boardNumbersFrom = {};
    LF.RememberDigitsRequestBoard(V.boardNumbersFrom);
    JS.step(JSstep.selectTruck((V.boardNumbersFrom.LaborTimeMax + V.boardNumbersFrom.TravelTime) / 60));
    JS.scroll('div.ServicesCost:visible');
    SF.select(By.xpath('//select[@id="edit-status"]'), 3);
    SF.send(By.xpath('//input[@ng-model="request.field_moving_to.thoroughfare"]'),'Address To');
    JS.click('button[ng-click=\\"UpdateRequest()\\"]');
    JS.waitForExist('button[ng-click="update(request)"]:visible');
    SF.click(By.xpath('//button[@ng-click="update(request)"]'));
    JS.waitForExist('div.toast-success:visible');
    LF.closeEditRequest();
    SF.sleep(2);

    condition.nowWeDoing = 'Найти второй реквест, назначить команду и отправить работу.';
    SF.click(By.xpath('//a[@ng-click="vm.goToPage(\'dispatch.local\', \'\')"]'));
    SF.waitForLocated(By.xpath('//a[@class="ui-datepicker-next ui-corner-all"]'));
    LF.findDayInLocalDispatch(V.boardNumbersFrom.moveDate.Year, V.boardNumbersFrom.moveDate.Month, V.boardNumbersFrom.moveDate.Day);
    SF.sleep(1);
    JS.waitForNotExist('div.busyoverlay:visible');
    SF.sleep(2);
    JS.waitForNotExist('div.busyoverlay:visible');
    SF.click(By.xpath('//i[contains(@ng-click,"view.grid = true;")]'));
    JS.waitForNotExist('div.busyoverlay:visible');
    SF.sleep(1);
    LF.SelectRequestDispatch(V.boardNumbersFrom.Id);
    LF.selectCrew();
    SF.sleep(2);
    LF.LogoutFromBoardAdmin();

    condition.nowWeDoing = 'Найти вторую работу, зайти в Inventory, подтвердить состояния предметов, запомнить их';
    LF.LoginToBoardAsForeman();
    LF.OpenRequestDispatch(V.boardNumbersFrom.Id);
    JS.waitForExist('h1:contains("Confirmation Page"):visible');
    SF.click(By.xpath('//li[@id="tab_Inventory"]'));
    SF.waitForVisible(By.xpath('//h4[contains(text(),"household goods descriptive inventory")]'));
    SF.sleep(1);

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
    SF.sleep(4);
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

    condition.nowWeDoing="Зайти в Storsge pending, найти реквест";
    LF.LoginToBoardAsAdmin();
    SF.click(By.xpath('//button[@ng-click="toggleLeft()"]'));
    SF.click(By.xpath('//a[@ng-click="vm.goToPage(\'pending\', \'\')"]'));
    SF.waitForVisible(By.xpath('//td[contains(text(),"'+V.client.name+' '+V.client.fam+'")]'));
    LF.OpenRequestDispatch(V.client.name+' '+V.client.fam);
    SF.waitForVisible(By.xpath('//div[@ng-if="data.rentals.move_request_id"]'));

    V.storageNumbers={};
    LF.RememberStorageNumbers(V.storageNumbers);
    VD.INeed(VD.VToEqual, V.storageNumbers.IdMoving, V.boardNumbersTo.Id, 'номер реквеста не совпадает');
    SF.sleep(1);
    LF.ValidatePendingStorageRequest(V.storageNumbers, V.boardNumbersTo, V.boardNumbersFrom);
    SF.select(By.xpath('//select[@ng-model="data.rentals.status_flag"]'),'string:2');
    SF.click(By.xpath('//button[@ng-click="updateStorageRequest(data)"]'));
    SF.sleep(1);
    JS.waitForNotExist('div.busyoverlay:visible');
    SF.sleep(1);
    SF.click(By.xpath('//a[@ng-click="tabs.setTab(2)"]'));
    driver.wait(driver.executeScript('return $(\'tr[ng-repeat="doc in data.user_info.documents track by $index"]\').length').then(function(count){
        VD.IWant(VD.VNotToEqual, count,0,'нет документов');
    }),config.timeout);
    SF.sleep(1);
    SF.click(By.xpath('//a[@ng-click="tabs.setTab(4)"]'));
    SF.click(By.xpath('//button[@ng-click="createInvoice()"]'));
    SF.send(By.xpath('//input[@ng-model="charge.name"]'),'testChagre');
    SF.send(By.xpath('//input[@ng-model="charge.description"]'),'testDesc');
    SF.send(By.xpath('//input[@ng-model="charge.cost"]'),V.storageNumbers.prepaid);
    SF.send(By.xpath('//input[@ng-model="charge.qty"]'),1);
    SF.click(By.xpath('//a[@ng-click="sendInvoice()"]'));
    SF.sleep(1);
    JS.waitForNotExist('div.busyoverlay:visible');
    SF.sleep(1);
    SF.click(By.xpath('//a[@ng-click="save()"]'));
    SF.sleep(1);
    driver.findElement(By.xpath('//span[contains(text(),"Balance :")]/span')).getText().then(function(text){
        V.storageNumbers.balance = SF.cleanPrice(text);
        console.log(V.storageNumbers.balance);
    });
    SF.sleep(2);
    VD.IWant(VD.VToEqual, V.storageNumbers.balance, 0, 'баланс не нулевой');
    SF.sleep(1);

    //=========================закончили писать тест=============================
    SF.endOfTest();
};