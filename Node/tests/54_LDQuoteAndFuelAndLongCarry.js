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
    MF.LongDistanceSettings_ClickOnMapState('#jqvmap1_ca');
    driver.wait(driver.executeScript("if($('input[ng-model=\"vm.longdistance.stateRates[vm.longdistance.basedState][vm.stateCode].longDistance\"]').hasClass('ng-not-empty')){" +
        "return true;}else{" +
        "$('input[ng-model=\"vm.longdistance.stateRates[vm.longdistance.basedState][vm.stateCode].longDistance\"]').click()}"),config.timeout);
    SF.clear (By.xpath('//input[@ng-model="vm.longdistance.stateRates[vm.longdistance.basedState][vm.stateCode].min_weight"]'));
    SF.send(By.xpath('//input[@ng-model="vm.longdistance.stateRates[vm.longdistance.basedState][vm.stateCode].min_weight"]'), 200);
    SF.sleep (2);
    SF.clear (By.xpath('//input[@ng-model="vm.longdistance.stateRates[vm.longdistance.basedState][vm.stateCode].state_rate"]'));
    SF.send(By.xpath('//input[@ng-model="vm.longdistance.stateRates[vm.longdistance.basedState][vm.stateCode].state_rate"]'), 10);
    SF.sleep (3);
    driver.wait(driver.executeScript("if($('input[ng-model=\"vm.longdistance.acceptAllQuotes\"]').hasClass('ng-not-empty')){" +
        "return true;}else{" +
        "$('input[ng-model=\"vm.longdistance.acceptAllQuotes\"]').click()}"),config.timeout);
    SF.sleep (1);
    driver.wait(driver.executeScript("if($('input[ng-model=\"vm.longdistance.stateRates[vm.longdistance.basedState][vm.stateCode].minPriceEnabled\"]').hasClass('ng-empty')){" +
        "return true;}else{" +
        "$('input[ng-model=\"vm.longdistance.stateRates[vm.longdistance.basedState][vm.stateCode].minPriceEnabled\"]').click()}"),config.timeout);
    SF.sleep (1);
    MF.LongDistanceSettings_SelectMABasedState();
    SF.click(By.xpath('//input[@ng-model="vm.longdistance.stateRates[vm.longdistance.basedState][vm.stateCode].delivery_days"]'));
    SF.sleep (3);
    MF.Board_OpenSideBar ();
    MF.Board_OpenSettingsGeneral ();
    MF.BoardSettings_ClickFuelSurcharge();
    SF.click(By.xpath('//input[@ng-model="vm.fuel_surcharge.def_ld"]'));
    SF.send(By.xpath('//input[@ng-model="vm.fuel_surcharge.def_ld"]'), 10);
    SF.click(By.xpath('//input[@ng-model="vm.fuel_surcharge.settingsByMileageLD.amount"]'));
    SF.sleep(3);
    driver.navigate().refresh();
    SF.sleep(10);

condition.nowWeDoing = 'создаем лонг дистанс реквест и проверяем квоту, фуел и тотал';
    LF.CreateLongDistanceFromBoard(V.client);
    V.boardNumbers = {};
    LF.RememberDigitsRequestBoard(V.boardNumbers);
    V.quote = V.boardNumbers.cbf * 10;
    VD.IWant(VD.ToEqual,V.boardNumbers.Quote, V.quote, 'квота не правильно посчиталась');
    V.fuel = (V.boardNumbers.Quote * 10) / 100;
    VD.IWant(VD.ToEqual,V.boardNumbers.Fuel, V.fuel, 'fuel не правильно посчитался');
    V.total = V.fuel + V.quote + V.boardNumbers.AdServices;
    VD.IWant(VD.ToEqual,V.boardNumbers.Total, V.total, 'total не правильно посчитался');

condition.nowWeDoing = 'добавляем комнаты и опять пересчитываем фуел, квоту и тотал';
    MF.EditRequest_SetSizeOfMoveNumber (9);
    MF.EditRequest_SetAdressFrom ();
    SF.sleep(2);
    V.boardNumbersAddRoom = {};
    LF.RememberDigitsRequestBoard(V.boardNumbersAddRoom);
    V.quoteAddRoom = V.boardNumbersAddRoom.cbf * 10;
    VD.IWant(VD.ToEqual,V.boardNumbersAddRoom.Quote, V.quoteAddRoom, 'квота не правильно посчиталась после добавления комнат');
    V.fuelAddRoom = (V.boardNumbersAddRoom.Quote * 10) / 100;
    VD.IWant(VD.ToEqual,V.boardNumbersAddRoom.Fuel, V.fuelAddRoom, 'fuel не правильно посчитался после добавления комнат');
    V.totalAddRoom = V.fuelAddRoom + V.quoteAddRoom + V.boardNumbersAddRoom.AdServices;
    VD.IWant(VD.ToEqual,V.boardNumbersAddRoom.Total, V.totalAddRoom, 'total не правильно посчитался после добавления комнат');

condition.nowWeDoing = 'добавляем инвенторий и опять пересчитываем фуел, квоту и тотал';
    LF.addInventoryBoard ();
    SF.sleep(2); // ждем обновления фуела
    V.boardNumbersAddInventory = {};
    LF.RememberDigitsRequestBoard(V.boardNumbersAddInventory);
    V.quoteAddInventory = V.boardNumbersAddInventory.cbf * 10;
    VD.IWant(VD.ToEqual,V.boardNumbersAddInventory.Quote, V.quoteAddInventory, 'квота не правильно посчиталась после добавления инвентория');
    V.fuelAddInventory = (V.boardNumbersAddInventory.Quote * 10) / 100;
    VD.IWant(VD.ToEqual,V.boardNumbersAddInventory.Fuel, V.fuelAddInventory, 'fuel не правильно посчитался после добавления инвентория');
    V.totalAddInventory = V.fuelAddInventory + V.quoteAddInventory  + V.boardNumbersAddInventory.AdServices;
    VD.IWant(VD.ToEqual,V.boardNumbersAddInventory.Total, V.totalAddInventory, 'total не правильно посчитался после добавления инвентория');

condition.nowWeDoing = 'добавляем пакинг и сервисы и проверяем что гранд тотал верный';
    LF.EditRequest_AddPacking ();
    SF.sleep(3);
    V.boardNumbersAddServices = {};
    LF.RememberDigitsRequestBoard(V.boardNumbersAddServices);
    V.totalAllServices = V.boardNumbersAddInventory.Quote + V.boardNumbersAddInventory.Fuel + V.boardNumbersAddServices.Packing + V.boardNumbersAddServices.AdServices;
    VD.IWant(VD.ToEqual,V.boardNumbersAddServices.Total, V.totalAllServices, 'total не правильно посчитался после добавления всех сервисов и инвентория');

condition.nowWeDoing = 'тут будем проверять long carry идем в детаилс и добавим шагов больше 70 на  фром и на ту';
    MF.EditRequest_OpenDetails();
    MF.EditRequest_SelectDistanceFromCurentDoor(140);
    MF.EditRequest_SaveDetails();
    driver.wait(driver.executeScript('return $(\'div.ServicesCost:visible\').text()').then(function (text) {
        V.AdServices = SF.cleanPrice(text.substring(text.indexOf('$')));
        VD.IWant(VD.ToEqual, V.AdServices, 100, 'после добавления в деталях шагов для лонг кари фи в реквесте не добавился екстра сервис лонг кари фи, должен был добавится по формуле 70 шагов это 10 дол за каждые 100 кубик фит');
    }), config.timeout);
    MF.EditRequest_OpenDetails();
    MF.EditRequest_SelectDistanceFromNewDoor(140);
    MF.EditRequest_SaveDetails();
    driver.wait(driver.executeScript('return $(\'div.ServicesCost:visible\').text()').then(function (text) {
        V.AdServices = SF.cleanPrice(text.substring(text.indexOf('$')));
        VD.IWant(VD.ToEqual, V.AdServices, 200, 'после второго добавления в деталях шагов для лонг кари фи в реквесте не добавился екстра сервис лонг кари фи, должен был добавится по формуле 70 шагов это 10 дол за каждые 100 кубик фит');
    }), config.timeout);

condition.nowWeDoing = 'тут проверим Charge for stairs, пойдем в детаилс и будем добавлять и проверять что они есть в екстра сервисах';
    MF.EditRequest_OpenDetails();
    MF.EditRequest_SetStepsOnStairsOrigin(100);
    MF.EditRequest_SaveDetails();
    driver.wait(driver.executeScript('return $(\'div.ServicesCost:visible\').text()').then(function (text) {
        V.AdServices = SF.cleanPrice(text.substring(text.indexOf('$')));
        VD.IWant(VD.ToEqual, V.AdServices, 207, 'после добавления в деталях шагов для stairs в реквесте не добавился екстра сервис charge stairs, должен был добавится по формуле 7 дол за каждые 50 шагов (первые 50 бесплатно)');
    }), config.timeout);
    MF.EditRequest_OpenDetails();
    MF.EditRequest_SetStepsOnStairsDestination(100);
    MF.EditRequest_SaveDetails();
    driver.wait(driver.executeScript('return $(\'div.ServicesCost:visible\').text()').then(function (text) {
        V.AdServices = SF.cleanPrice(text.substring(text.indexOf('$')));
        VD.IWant(VD.ToEqual, V.AdServices, 214, 'после второго добавления в деталях шагов для stairs в реквесте не добавился екстра сервис charge stairs, должен был добавится по формуле 7 дол за каждые 50 шагов (первые 50 бесплатно)');
    }), config.timeout);
    MF.EditRequest_SaveChanges ();
    V.boardNumbersAddServices = {};
    LF.RememberDigitsRequestBoard(V.boardNumbersAddServices);
    MF.EditRequest_OpenClient();
    LF.SetClientPasswd(V.client.passwd);
    LF.closeEditRequest ();

condition.nowWeDoing = 'сохранили и закрыли ревест. Идем на дашборд, открываем и сравниваем, проверяем что все осталось на своих местах(последние изменения)';
    MF.Board_OpenDashboard ();
    JS.scroll ('div[ng-click=\\"vm.select(3)\\"]');
    MF.Board_OpenRequest (V.boardNumbers.Id);
    V.boardNumbersLast = {};
    LF.RememberDigitsRequestBoard(V.boardNumbersLast);
    LF.Validation_Compare_Account_Admin (V.boardNumbersAddServices, V.boardNumbersLast);
    SF.sleep(1);
    LF.closeEditRequest ();
    MF.Board_LogoutAdmin();

condition.nowWeDoing = 'идем в аккаунт проверять и там поменяем детаилс и посмотрим что екстра сервисы пересчитываются';
    SF.get(V.accountURL);
    LF.LoginToAccountAsClient (V.client, V.client.passwd);
    MF.Account_OpenRequest(V.boardNumbers.Id);
    MF.Account_ClickViewRequest();
    V.accountNumbers = {};
    LF.RememberAccountNumbersLD(V.accountNumbers);
    LF.Validation_Compare_Account_Admin_LongDistance (V.accountNumbers, V.boardNumbersAddServices);
    MF.Account_ClickDetails();
    MF.EditRequest_SelectDistanceFromCurentDoor(200);
    MF.Account_SelectParking();
    SF.click(By.xpath('//div[@ng-model="html"]'));
    MF.Account_ClickSaveDetails();
    SF.sleep(3);
    driver.wait(driver.executeScript(JSstep.getServicesCostAccount), config.timeout).then(function (ServicesText) {
        V.accountAdServices = SF.cleanPrice(ServicesText);
        VD.IWant(VD.ToEqual, V.accountAdServices, 264, 'после смены в деталях аккаунта шагов для лонг кари фи в реквесте аккаунта не пересчитался екстра сервис лонг кари фи')
    });

    MF.Account_ClickDetails();
    MF.EditRequest_SelectDistanceFromNewDoor(35);
    SF.click(By.xpath('//div[@ng-model="html"]'));
    MF.Account_ClickSaveDetails();
    SF.sleep(3);
    driver.wait(driver.executeScript(JSstep.getServicesCostAccount), config.timeout).then(function (ServicesText) {
        V.accountAdServices = SF.cleanPrice(ServicesText);
        VD.IWant(VD.ToEqual, V.accountAdServices, 164, 'после второй смены в деталях аккаунта шагов для лонг кари фи в реквесте аккаунта не пересчитался екстра сервис лонг кари фи')
    });

condition.nowWeDoing = 'тут проверим Charge for stairs для аккаунта, пойдем в детаилс и будем добавлять и проверять что они есть в екстра сервисах';
    MF.Account_ClickDetails();
    MF.EditRequest_SetStepsOnStairsOrigin(50);
    SF.click(By.xpath('//div[@ng-model="html"]'));
    MF.Account_ClickSaveDetails();
    SF.sleep(3);
    driver.wait(driver.executeScript(JSstep.getServicesCostAccount), config.timeout).then(function (ServicesText) {
        V.accountAdServices = SF.cleanPrice(ServicesText);
        VD.IWant(VD.ToEqual, V.accountAdServices, 157, 'после добавления в деталях аккаунта шагов, для stairs в реквесте аккаунта не пересчитался екстра сервис charge stairs')
    });
    MF.Account_ClickDetails();
    MF.EditRequest_SetStepsOnStairsDestination(70);
    SF.click(By.xpath('//div[@ng-model="html"]'));
    MF.Account_ClickSaveDetails();
    SF.sleep(3);
    driver.wait(driver.executeScript(JSstep.getServicesCostAccount), config.timeout).then(function (ServicesText) {
        V.accountAdServices = SF.cleanPrice(ServicesText);
        VD.IWant(VD.ToEqual, V.accountAdServices, 157, 'после второго добавления в деталях аккаунта, шагов для stairs в реквесте аккаунта не пересчитался екстра сервис charge stairs')
    });
    V.accountNumbersChangeDetails = {};
    LF.RememberAccountNumbersLD(V.accountNumbersChangeDetails);
    LF.LogoutFromAccount();

condition.nowWeDoing = 'второй раз в админке, вторая проверка, что после смены на акке, в админке тоже все пересчитало';
    SF.get(V.adminURL);
    LF.LoginToBoardAsCustom(V.adminLogin,V.adminPassword);
    MF.Board_OpenRequest(V.boardNumbers.Id);
    V.boardNumbersLastCheck = {};
    LF.RememberDigitsRequestBoard (V.boardNumbersLastCheck);
    LF.Validation_Compare_Account_Admin_LongDistance (V.accountNumbersChangeDetails, V.boardNumbersLastCheck);


    //=========================закончили писать тест=============================
    SF.endOfTest();
};
