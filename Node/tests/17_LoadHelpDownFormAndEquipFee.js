module.exports = function main(SF, JS, MF, LF, JSstep, VD, V, By, until,FileDetector, system, condition, config,constants) {    global.fiber = Fiber.current;
    V.ReservationPrice = {};
    V.client = {};
    V.frontNumbersLoadingDown ={};
    V.accountNumbers = {};
    V.boardNumbers = {};
    V.client.name = SF.randomBukva(6) + '_t';
    V.client.fam = SF.randomBukva(6) + '_t';
    V.client.phone = SF.randomCifra(10);
    V.client.email = SF.randomBukvaSmall(6) + '@' + SF.randomBukvaSmall(4) + '.tes';

    SF.get(V.adminURL);
    LF.LoginToBoardAsCustom(V.adminLogin,V.adminPassword);

condition.nowWeDoing = 'зашли под админом и включаем еквипмент фии';
    MF.Board_OpenSettingsGeneral ();
    SF.click(By.linkText('Extra Services'));
    SF.sleep(3);
    driver.wait(driver.executeScript("return $('tr[ng-repeat=\"(index,  value) in vm.equipment_fee.by_mileage\"]').length").then(function (check) {
        V.FeeLength = check;
    }),config.timeout);
    SF.sleep(1);
    if (V.FeeLength != 0) {
        for (let i=0; i < V.FeeLength; i++) {
            SF.click (By.xpath('//div[@ng-click="vm.removeEquipmentFee(index)"]/i'));
            MF.SweetConfirm ();
            SF.sleep(1);
        }
    }
    SF.clear(By.id('equipment-fee-name'));
    SF.send(By.id('equipment-fee-name'), 'Travel charge');
    SF.click(By.xpath('//button[@ng-click="vm.addNewEquipmentFee(); vm.addEquipmentFee = true"]'));
    SF.sleep(1.5);
    SF.send(By.xpath('//input[@ng-model="vm.newEquipmentFee.from"]'), '0');
    SF.send(By.xpath('//input[@ng-model="vm.newEquipmentFee.to"]'), '50');
    SF.click(By.xpath('//input[@ng-model="vm.newEquipmentFee.amount"]'));
    SF.send(By.xpath('//input[@ng-model="vm.newEquipmentFee.amount"]'), '100');
    SF.click(By.xpath('//button[@ng-click="vm.saveNewEquipmentFee(); "]'));
    SF.sleep(3);
    MF.Board_Refresh ();
    MF.Board_LogoutAdmin ();
    SF.get(V.frontURL);
    JS.waitForExist ('#loader');
    SF.sleep (4);

condition.nowWeDoing = 'заполняем нижний кальк';
    LF.CreateLoadingHelpDownForm (V.client);

condition.nowWeDoing = 'запоминаем данные';
    driver.wait(driver.findElement(By.xpath('//h3[contains(text(),"Crew Size:")]/following-sibling::span')).getText().then(function (text) {
        V.frontNumbersLoadingDown.Crew = text.replace('Movers', '');
    }), config.timeout);
    driver.wait(driver.findElement(By.xpath('//h3[contains(text(),"Truck:")]/following-sibling::span')).getText().then(function (text) {
        V.frontNumbersLoadingDown.Truck = SF.cleanPrice (text);
    }), config.timeout);
    driver.wait(driver.findElement(By.xpath('//div[@ng-if="calcsettings.travelTime"]/span')).getText().then(function (text) {
        let hours = text.indexOf('Hr') == -1 ? 0 : SF.cleanPrice(text.substring(0, text.indexOf('Hr')));
        let minutes = text.indexOf('Min') == -1 ? 0 : SF.cleanPrice(text.substring((text.indexOf('Hrs') + 1), text.indexOf('Min')));
        V.frontNumbersLoadingDown.TravelTime = hours * 60 + minutes;
    }), config.timeout);
    SF.sleep (1);
    driver.wait(driver.findElement(By.xpath('//div[contains(@class, "box_info")]//div[@class="moving-date rate"]/span')).getText().then(function (text) {
        V.frontNumbersLoadingDown.Rate = text.indexOf('$', 4) == -1 ?
            SF.cleanPrice(text) :
            SF.cleanPrice(text.substring(text.indexOf('$', 4)));
    }), config.timeout);
    driver.wait(driver.findElement(By.xpath('//div[@ng-if="equipmentFee.amount"]/span')).getText().then(function (text) {
        V.frontNumbersLoadingDown.travelCharge = SF.cleanPrice (text);
    }),config.timeout);
    SF.sleep(1);
    MF.FrontSite_GoToConfirmation();
    MF.FrontSite_ViewRequestPage();
    SF.openTab (1);

condition.nowWeDoing = 'пошли в аккаунт';
    MF.Account_ClickViewRequest ();

condition.nowWeDoing = 'сравниваем данные калькулятора и акка';
    LF.RememberAccountNumbers (V.accountNumbers);
    driver.wait(driver.findElement(By.xpath('//div[contains(text(), "Travel charge:")]/following-sibling::div')).getText().then(function (text) {
        V.accountNumbers.travelCharge = SF.cleanPrice (text);
    }),config.timeout);
    SF.sleep(1);
    // LF.addToCleanerJob(V.accountNumbers.Id);
    VD.IWant(VD.ToEqual, V.accountNumbers.CrewSize, V.frontNumbersLoadingDown.Crew, 'не совпали CrewSize аккаунта и фронта');
    VD.IWant(VD.ToEqual, V.accountNumbers.HourlyRate, V.frontNumbersLoadingDown.Rate, 'не совпали HourlyRate аккаунта и фронта');
    VD.IWant(VD.ToEqual, V.accountNumbers.TravelTime, V.frontNumbersLoadingDown.TravelTime, 'не совпали TravelTime аккаунта и фронта');
    VD.IWant(VD.ToEqual, V.accountNumbers.Trucks, V.frontNumbersLoadingDown.Truck, 'не совпали Trucks аккаунта и фронта');
    VD.IWant(VD.ToEqual, V.accountNumbers.travelCharge, V.frontNumbersLoadingDown.travelCharge, 'не совпали эквипмент фии аккаунта и фронта');
    LF.LogoutFromAccount ();
    SF.get (V.adminURL);
    LF.LoginToBoardAsCustom(V.adminLogin,V.adminPassword);

condition.nowWeDoing = 'зашли под админом и сравниваем данные акка и админки';
    MF.Board_OpenRequest(V.accountNumbers.Id);
    LF.RememberDigitsRequestBoard(V.boardNumbers);
    JS.step(JSstep.selectTruck((V.boardNumbers.LaborTimeMax + V.boardNumbers.TravelTime)/60));
    MF.WaitWhileBusy();

condition.nowWeDoing = 'сравниваем аккаунт и админку';
    LF.Validation_Compare_Account_Admin(V.accountNumbers,V.boardNumbers);
    VD.IWant(VD.ToEqual, V.accountNumbers.travelCharge, V.boardNumbers.AdServices, 'не совпали эквипмент фии аккаунта и мувборда');
    MF.EditRequest_SetToNotConfirmed ();
    MF.EditRequest_SaveChanges ();
    MF.EditRequest_OpenClient ();
    V.client.passwd = 123;
    LF.SetClientPasswd (V.client.passwd);
    MF.EditRequest_OpenLogs();
    MF.EditRequest_Check1EmailExist(V.client.email, "Thank you for submitting a quote.");
    MF.EditRequest_Check1EmailExist(V.client.email, "How To Work With Your New Account.");
    MF.EditRequest_Check1EmailExist(V.adminEmail, "New Request Notification");
    LF.closeEditRequest ();
    MF.Board_LogoutAdmin ();
    SF.get(V.accountURL);
    LF.LoginToAccountAsClient (V.client, V.client.passwd);

condition.nowWeDoing = 'зашли под клиенто и букаем работу';
    MF.Account_CheckRequestStatus_NotConfirmed (V.accountNumbers.Id);
    MF.Account_OpenRequest (V.accountNumbers.Id);
    MF.Account_ClickProceedBookYourMove();
    SF.click (By.xpath('//i[@class="fa fa-angle-down arrow-down"]'));
    SF.sleep (0.5);
    SF.click (By.id('cancel_policy'));
    SF.click (By.id('paybutton'));
    MF.SweetConfirm();
    SF.waitForVisible (By.xpath('//div[@class="modal-body form-horizontal"]'));
    SF.sleep(2);
    SF.send (By.id('edit-moving-from'), 'otkuda edem');
    SF.send (By.id('edit-moving-from-apt'), 324535);
    MF.Account_ClickUpdateClientInModalWindow();
    SF.sleep(1);
    MF.SweetConfirm();
    SF.sleep(1);
    MF.SweetConfirm();
    SF.waitForVisible(By.xpath('//canvas[@id="signatureCanvasReserv"]'));
    LF.MakeSignJS('signatureCanvasReserv');
    SF.sleep(0.5);
    SF.click(By.xpath('//button[@ng-click="saveReservSignature();logClickButtons(\'Save reservation sign button clicked\')"]'));
    SF.sleep (1);
    LF.FillCardPayModal ();
    MF.WaitWhileSpinner ();
    SF.waitForVisible(By.xpath('//div[contains(text(),"Your move is confirmed and scheduled")]'));
    LF.LogoutFromAccount ();
    SF.get(V.adminURL);
    LF.LoginToBoardAsCustom(V.adminLogin,V.adminPassword);

condition.nowWeDoing = 'зашли под админом и удаляем еквипмент фии';
    MF.Board_OpenSettingsGeneral ();
    SF.click(By.linkText('Extra Services'));
    SF.sleep(3);
    driver.wait(driver.executeScript("return $('tr[ng-repeat=\"(index,  value) in vm.equipment_fee.by_mileage\"]').length").then(function (check) {
        V.FeeLength = check;
    }),config.timeout);
    SF.sleep(1);
    if (V.FeeLength != 0) {
        for (let i=0; i < V.FeeLength; i++) {
            SF.click (By.xpath('//div[@ng-click="vm.removeEquipmentFee(index)"]/i'));
            MF.SweetConfirm ();
            SF.sleep(1);
        }
    }
    SF.sleep(1.5);
    SF.endOfTest();
};
