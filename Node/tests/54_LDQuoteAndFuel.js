module.exports = function main(SF, JS, MF, LF, JSstep, VD, V, By, until,FileDetector, system, condition, config,constants) {
    global.fiber = Fiber.current;
    V.client = {};
    V.client.name = SF.randomBukva(6) + '_t';
    V.client.fam = SF.randomBukva(6) + '_t';
    V.client.phone = SF.randomCifra(10);
    V.client.email = SF.randomBukvaSmall(6) + '@' + SF.randomBukvaSmall(4) + '.tes';
    V.client.passwd = 123;

    //=========================начинаем писать тест=============================
    SF.get(V.adminURL);
    LF.LoginToBoardAsCustom(V.adminLogin,V.adminPassword);

condition.nowWeDoing = 'идем в настройки выставляем для калифорнии цену и выставляем фуел 10%';
    MF.Board_OpenSettingsGeneral ();
    MF.Board_OpenSettingsLongDistance ();
    MF.LongDistanceSettings_ClickOnMapCaliforniya();
    driver.wait(driver.executeScript("if($('input[ng-model=\"vm.longdistance.stateRates[vm.longdistance.basedState][vm.stateCode].longDistance\"]').hasClass('ng-not-empty')){" +
        "return true;}else{" +
        "$('input[ng-model=\"vm.longdistance.stateRates[vm.longdistance.basedState][vm.stateCode].longDistance\"]').click()}"),config.timeout);
    SF.clear (By.xpath('//input[@ng-model="vm.longdistance.stateRates[vm.longdistance.basedState][vm.stateCode].min_weight"]'));
    SF.send(By.xpath('//input[@ng-model="vm.longdistance.stateRates[vm.longdistance.basedState][vm.stateCode].min_weight"]'), 200);
    SF.sleep (2);
    SF.clear (By.xpath('//input[@ng-model="vm.longdistance.stateRates[vm.longdistance.basedState][vm.stateCode].state_rate"]'));
    SF.send(By.xpath('//input[@ng-model="vm.longdistance.stateRates[vm.longdistance.basedState][vm.stateCode].state_rate"]'), 10);
    SF.sleep (2);
    driver.wait(driver.executeScript("if($('input[ng-model=\"vm.longdistance.acceptAllQuotes\"]').hasClass('ng-not-empty')){" +
        "return true;}else{" +
        "$('input[ng-model=\"vm.longdistance.acceptAllQuotes\"]').click()}"),config.timeout);
    SF.sleep (4);
    MF.LongDistanceSettings_SelectMABasedState();
    SF.click(By.xpath('//input[@ng-model="vm.longdistance.stateRates[vm.longdistance.basedState][vm.stateCode].delivery_days"]'));
    MF.Board_OpenSettingsGeneral ();
    SF.click(By.linkText('Fuel Surcharge'));
    SF.sleep (2);
    SF.click(By.xpath('//input[@ng-model="vm.fuel_surcharge.def_ld"]'));
    SF.send(By.xpath('//input[@ng-model="vm.fuel_surcharge.def_ld"]'), 10);
    SF.click(By.xpath('//input[@ng-model="vm.fuel_surcharge.settingsByMileageLD.amount"]'));
    SF.sleep(3);

condition.nowWeDoing = 'создаем лонг дистанс реквест и проверяем квоту, фуел и тотал';
    LF.CreateLongDistanceFromBoard(V.client);
    V.boardNumbers = {};
    LF.RememberDigitsRequestBoard(V.boardNumbers);
    V.quote = V.boardNumbers.cbf * 10;
    VD.IWant(VD.VToEqual,V.boardNumbers.Quote, V.quote, 'квота не правильно посчиталась');
    V.fuel = (V.boardNumbers.Quote * 10) / 100;
    VD.IWant(VD.VToEqual,V.boardNumbers.Fuel, V.fuel, 'fuel не правильно посчитался');
    V.total = V.fuel + V.quote;
    VD.IWant(VD.VToEqual,V.boardNumbers.Total, V.total, 'total не правильно посчитался');
    SF.sleep(1);

condition.nowWeDoing = 'добавляем комнаты и опять пересчитываем фуел, квоту и тотал';
    MF.EditRequest_SetSizeOfMoveNumber (9);
    MF.EditRequest_SetAdressFrom ();
    SF.sleep(4);
    V.boardNumbersAddRoom = {};
    LF.RememberDigitsRequestBoard(V.boardNumbersAddRoom);
    V.quoteAddRoom = V.boardNumbersAddRoom.cbf * 10;
    VD.IWant(VD.VToEqual,V.boardNumbersAddRoom.Quote, V.quoteAddRoom, 'квота не правильно посчиталась после добавления комнат');
    V.fuelAddRoom = (V.boardNumbersAddRoom.Quote * 10) / 100;
    VD.IWant(VD.VToEqual,V.boardNumbersAddRoom.Fuel, V.fuelAddRoom, 'fuel не правильно посчитался после добавления комнат');
    V.totalAddRoom = V.fuelAddRoom + V.quoteAddRoom;
    VD.IWant(VD.VToEqual,V.boardNumbersAddRoom.Total, V.totalAddRoom, 'total не правильно посчитался после добавления комнат');
    SF.sleep(1);

condition.nowWeDoing = 'добавляем инвенторий и опять пересчитываем фуел, квоту и тотал';
    LF.addInventoryBoard ();
    SF.sleep(1);
    V.boardNumbersAddInventory = {};
    LF.RememberDigitsRequestBoard(V.boardNumbersAddInventory);
    V.quoteAddInventory = V.boardNumbersAddInventory.cbf * 10;
    VD.IWant(VD.VToEqual,V.boardNumbersAddInventory.Quote, V.quoteAddInventory, 'квота не правильно посчиталась после добавления инвентория');
    V.fuelAddInventory = (V.boardNumbersAddInventory.Quote * 10) / 100;
    VD.IWant(VD.VToEqual,V.boardNumbersAddInventory.Fuel, V.fuelAddInventory, 'fuel не правильно посчитался после добавления инвентория');
    V.totalAddInventory = V.fuelAddInventory + V.quoteAddInventory;
    VD.IWant(VD.VToEqual,V.boardNumbersAddInventory.Total, V.totalAddInventory, 'total не правильно посчитался после добавления инвентория');
    SF.sleep(1);

condition.nowWeDoing = 'добавляем пакинг и сервисы и проверяем что гранд тотал верный';
    MF.EditRequest_AddPacking ();
    MF.EditRequest_AddAdditionalServicesFullPack ();
    V.boardNumbersAddServices = {};
    LF.RememberDigitsRequestBoard(V.boardNumbersAddServices);
    V.totalAllServices = V.boardNumbersAddInventory.Quote + V.boardNumbersAddInventory.Fuel + V.boardNumbersAddServices.Packing + V.boardNumbersAddServices.AdServices;
    VD.IWant(VD.VToEqual,V.boardNumbersAddServices.Total, V.totalAllServices, 'total не правильно посчитался после добавления всех сервисов и инвентория');
    SF.sleep(1);
    MF.EditRequest_SaveChanges ();
    LF.closeEditRequest ();

condition.nowWeDoing = 'сохранили и закрыли ревест. Идем на дашборд, открываем и сравниваем, проверяем что все осталось на своих местах(последние изменения)';
    MF.Board_OpenDashboard ();
    JS.scroll ('div[ng-click=\\"vm.select(3)\\"]');
    LF.OpenRequest (V.boardNumbers.Id);
    V.boardNumbersLast = {};
    LF.RememberDigitsRequestBoard(V.boardNumbersLast);
    LF.Validation_Compare_Account_Admin (V.boardNumbersAddServices, V.boardNumbersLast);
    LF.closeEditRequest ();
    MF.Board_LogoutAdmin ();
    //=========================закончили писать тест=============================
    SF.endOfTest();
};