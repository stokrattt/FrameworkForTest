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
    LF.LoginToBoardAsCustom(V.adminLogin,V.adminPassword);
    LF.CreateMovAndStorFromBoard(V.client, 40);

condition.nowWeDoing = 'Законфёрмить сразу реквест';
    V.boardNumbersTo = {};
    LF.addInventoryBoard ();
    LF.RememberDigitsRequestBoard(V.boardNumbersTo);
    LF.addToCleanerJob(V.boardNumbersTo.Id);
    LF.addToCleanerJob(V.boardNumbersTo.Id+1);
    JS.step(JSstep.selectTruck((V.boardNumbersTo.LaborTimeMax + V.boardNumbersTo.TravelTime) / 60));
    JS.scroll('div.ServicesCost:visible');
    MF.EditRequest_OpenSettings ();
    LF.SetManager('emilia');
    MF.EditRequest_OpenClient ();
    LF.SetClientPasswd(V.client.passwd);
    MF.EditRequest_OpenRequest ();
    SF.sleep(1);
    MF.EditRequest_SetToConfirmed ();
    SF.send(By.xpath('//input[@ng-model="request.field_moving_from.thoroughfare"]'),'Address From');
    MF.EditRequest_SaveChanges ();
    LF.closeEditRequest();
    SF.sleep(2);

condition.nowWeDoing = 'Зайти в local Dispatch, найти первый реквест, назначить команду и отправить работу.';
    MF.Board_OpenLocalDispatch ();
    LF.findDayInLocalDispatch(V.boardNumbersTo.moveDate.Year, V.boardNumbersTo.moveDate.Month, V.boardNumbersTo.moveDate.Day);
    SF.sleep(1);
    MF.WaitWhileBusy ();
    SF.sleep(2);
    MF.WaitWhileBusy ();
    MF.Dispatch_GridView ();
    SF.sleep(1);
    LF.SelectRequestDispatch(V.boardNumbersTo.Id);
    LF.selectCrew(V.foremanName);
    SF.sleep(2);
    MF.Board_LogoutAdmin();

condition.nowWeDoing = 'Зайти под форменом, найти первую работу, зайти в Inventory, добавить состояния предметов, запомнить их';
    LF.LoginToBoardAsCustomForeman(V.foremanLogin, V.foremanPassword);
    LF.OpenRequestDispatch(V.boardNumbersTo.Id);
    MF.Contract_WaitConfirmationPage();
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
    MF.Contract_UploadImage(V.path);
    MF.Contract_UploadImage(V.path);
    MF.Contract_SaveImages();

condition.nowWeDoing = 'закончили с инвентарём, подписываем первый контракт';
    driver.wait(driver.executeScript(JSstep.CheckSumsInContract).then(function (costs) {
        VD.IWant(VD.VToEqual, costs.sumPacking, costs.totalPacking, 'Не совпали суммы Packing');
        VD.IWant(VD.VToEqual, costs.sumServices, costs.totalServices, 'Не совпали суммы Services');
    }));
    LF.MakeSignInContract();
    LF.MakeSignInContract();
    MF.Contract_DeclarationValueA();
    LF.MakeSignInContract();
    LF.MakeSignInContract();
    LF.MakeSignInContract();
    MF.Contract_ClickPay();
    MF.Contract_ClickTips10();
    MF.Contract_ClickAddTips();
    MF.Contract_ClickPaymentInfo();
    LF.FillCardPayModal();
    LF.MakeSignJS('signatureCanvasPayment');
    SF.click(By.xpath('//div[@ng-init="payment.canvasInit(\'signatureCanvasPayment\')"]//button[@ng-click="saveSignature()"]'));
    JS.waitForExist('input#inputImage');
    driver.wait(new FileDetector().handleFile(driver, system.path.resolve('./files/squirrel.jpg')).then(function (path) {
        V.path = path;
    }), config.timeout);
    SF.sleep(1);
    MF.Contract_UploadImage(V.path);
    MF.Contract_UploadImage(V.path);
    MF.Contract_SaveImages();
    LF.MakeSignInContract();
    LF.MakeSignInContract();
    MF.Contract_Submit();
    MF.Contract_ReturnToForeman();
    LF.LogoutFromBoardForeman();

    //*****************************************второй реквест******************************************

condition.nowWeDoing = 'From storage, выставить трак, проверить, запомнить и сравнить все цифры с аккаунтом, выставить sales, дать клиенту пароль, поставить Not Confirmed, сохранить.';
    SF.get(V.adminURL);
    LF.LoginToBoardAsCustom(V.adminLogin,V.adminPassword);
    LF.OpenRequest(V.boardNumbersTo.Id+1);
    V.boardNumbersFrom = {};
    LF.RememberDigitsRequestBoard(V.boardNumbersFrom);
    JS.step(JSstep.selectTruck((V.boardNumbersFrom.LaborTimeMax + V.boardNumbersFrom.TravelTime) / 60));
    JS.scroll('div.ServicesCost:visible');
    MF.EditRequest_SetToConfirmed ();
    MF.EditRequest_SetAdressTo ();
    MF.EditRequest_SaveChanges ();
    LF.closeEditRequest();
    SF.sleep(2);

condition.nowWeDoing = 'Найти второй реквест, назначить команду и отправить работу.';
    MF.Board_OpenLocalDispatch ();
    LF.findDayInLocalDispatch(V.boardNumbersFrom.moveDate.Year, V.boardNumbersFrom.moveDate.Month, V.boardNumbersFrom.moveDate.Day);
    SF.sleep(1);
    MF.WaitWhileBusy ();
    SF.sleep(2);
    MF.WaitWhileBusy ();
    MF.Dispatch_GridView ();
    LF.SelectRequestDispatch(V.boardNumbersFrom.Id);
    LF.selectCrew(V.foremanName);
    SF.sleep(2);
    MF.Board_LogoutAdmin();

condition.nowWeDoing = 'Найти вторую работу, зайти в Inventory, подтвердить состояния предметов, запомнить их';
    LF.LoginToBoardAsCustomForeman(V.foremanLogin, V.foremanPassword);
    LF.OpenRequestDispatch(V.boardNumbersFrom.Id);
    MF.Contract_WaitConfirmationPage ();
    SF.click(By.xpath('//li[@id="tab_Inventory"]'));
    SF.waitForVisible(By.xpath('//h4[contains(text(),"household goods descriptive inventory")]'));
    SF.sleep(1);

    LF.MakeSignInInventory(2);
    LF.MakeSignInInventory(3);
    SF.click(By.xpath('//button[@ng-click="saveInventory(\'submit\')"]'));
    SF.sleep(1);

condition.nowWeDoing = 'закончили с инвентарём, подписываем второй контракт';
    SF.waitForVisible(By.xpath('//div[@id="main-contract"]//div[@class="empty-signature"]'));
    driver.wait(driver.executeScript(JSstep.CheckSumsInContract).then(function (costs) {
        VD.IWant(VD.VToEqual, costs.sumPacking, costs.totalPacking, 'Не совпали суммы Packing');
        VD.IWant(VD.VToEqual, costs.sumServices, costs.totalServices, 'Не совпали суммы Services');
    }), config.timeout);
    LF.MakeSignInContract();
    LF.MakeSignInContract();
    MF.Contract_DeclarationValueA();
    LF.MakeSignInContract();
    LF.MakeSignInContract();
    LF.MakeSignInContract();
    MF.Contract_ClickPay();
    MF.Contract_ClickTips10();
    MF.Contract_ClickAddTips();
    MF.Contract_ClickPaymentInfo();
    LF.FillCardPayModal();
    LF.MakeSignJS('signatureCanvasPayment');
    SF.click(By.xpath('//div[@ng-init="payment.canvasInit(\'signatureCanvasPayment\')"]//button[@ng-click="saveSignature()"]'));
    JS.waitForExist('input#inputImage');
    driver.wait(new FileDetector().handleFile(driver, system.path.resolve('./files/squirrel.jpg')).then(function (path) {
        V.path = path;
    }), config.timeout);
    SF.sleep(1);
    MF.Contract_UploadImage(V.path);
    MF.Contract_UploadImage(V.path);
    MF.Contract_SaveImages();
    LF.MakeSignInContract();
    LF.MakeSignInContract();
    MF.Contract_Submit();
    MF.Contract_ReturnToForeman();
    LF.LogoutFromBoardForeman();

condition.nowWeDoing="Зайти в Storsge pending, найти реквест";
    LF.LoginToBoardAsCustom(V.adminLogin,V.adminPassword);
    MF.Board_OpenSideBar ();
    MF.Board_OpenStorages ();
    SF.waitForVisible(By.xpath('//td[contains(text(),"'+V.client.name+' '+V.client.fam+'")]'));
    LF.OpenRequestDispatch(V.client.name+' '+V.client.fam);
    SF.waitForVisible(By.xpath('//div[@ng-if="data.rentals.move_request_id"]'));

    V.storageNumbers={};
    LF.RememberStorageNumbers(V.storageNumbers);
    VD.INeed(VD.VToEqual, V.storageNumbers.IdMoving, V.boardNumbersTo.Id, 'номер реквеста не совпадает');
    SF.sleep(1);
    LF.ValidatePendingStorageRequest(V.storageNumbers, V.boardNumbersTo, V.boardNumbersFrom);
    MF.EditStorage_SelectMoveIn ();
    MF.EditStorage_UpdateStorage ();
    MF.EditStorage_OpenDocuments ();
    driver.wait(driver.executeScript('return $(\'tr[ng-repeat="doc in data.user_info.documents track by $index"]\').length').then(function(count){
        VD.IWant(VD.VNotToEqual, count,0,'нет документов');
    }),config.timeout);
    SF.sleep(1);
    MF.EditStorage_OpenLedger ();
    SF.click(By.xpath('//button[@ng-click="createInvoice()"]'));
    SF.send(By.xpath('//input[@ng-model="charge.name"]'),'testChagre');
    SF.send(By.xpath('//input[@ng-model="charge.description"]'),'testDesc');
    SF.send(By.xpath('//input[@ng-model="charge.cost"]'),V.storageNumbers.prepaid);
    SF.send(By.xpath('//input[@ng-model="charge.qty"]'),1);
    SF.click(By.xpath('//a[@ng-click="sendInvoice()"]'));
    SF.sleep(1);
    MF.WaitWhileBusy ();
    SF.sleep(1);
    SF.click(By.xpath('//a[@ng-click="save()"]'));
    SF.sleep(1);
    driver.findElement(By.xpath('//span[contains(text(),"Balance :")]/span')).getText().then(function(text){
        V.storageNumbers.balance = SF.cleanPrice(text);
    });
    SF.sleep(2);
    VD.IWant(VD.VToEqual, V.storageNumbers.balance, 0, 'баланс не нулевой');
    SF.sleep(1);

    //=========================закончили писать тест=============================
    SF.endOfTest();
};