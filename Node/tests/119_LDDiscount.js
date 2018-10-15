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
    LF.LoginToBoardAsCustom(V.adminLogin,  V.adminPassword);

condition.nowWeDoing = 'Заходим в админку идем в Настройики лонг дистанса и виставляем min Price min Cubic fee и State rate для штата Монтана';
    MF.Board_OpenSettingsGeneral();
    MF.Board_OpenSettingsLongDistance ();
    MF.LongDistanceSettings_ClickOnMapState('#jqvmap1_mt');
    driver.wait(driver.executeScript("if($('input[ng-model=\"vm.longdistance.stateRates[vm.longdistance.basedState][vm.stateCode].minPriceEnabled\"]').hasClass('ng-not-empty')){" +
       "return true;}else{$('input[ng-model=\"vm.longdistance.stateRates[vm.longdistance.basedState][vm.stateCode].minPriceEnabled\"]').click()}"),config.timeout);
    SF.sleep(0.5);
    V.minCF = 350;
    V.minPrice = 100;
    V.stateRate = 5;
    MF.LongDistanceSettings_SetMinCF(V.minCF);
    MF.LongDistanceSettings_SetMinPrice(V.minPrice);
    MF.LongDistanceSettings_SetStateRate(V.stateRate);
    MF.Board_OpenSideBar();
    MF.LongDistanceSettings_AddDiscount();

condition.nowWeDoing = 'Добавляем 3 дисконта';
    V.DiscountPriceFirst = 2;
    V.DiscountPriceCFFirst = 700;

    LF.LongDistanceSettings_SetDiscounts(1, V.DiscountPriceFirst, V.DiscountPriceCFFirst);
    SF.click(By.xpath('//table[@ng-show="!discountTabActive"]//div[@ng-click="addDiscount($index)"]'));
    V.DiscountPriceSecond = 3;
    V.DiscountPriceCFSecond = 900;
    LF.LongDistanceSettings_SetDiscounts(2, V.DiscountPriceSecond, V.DiscountPriceCFSecond);
    SF.click(By.xpath('//table[@ng-show="!discountTabActive"]//tr[@ng-repeat="row in discounts"][2]//div[@ng-click="addDiscount($index)"]'));
    V.DiscountPriceThird = 4;
    V.DiscountPriceCFThird = 1300;
    LF.LongDistanceSettings_SetDiscounts(3, V.DiscountPriceThird, V.DiscountPriceCFThird);
    MF.LongDistanceSettings_SetMinPrice(V.minPrice);
    SF.sleep(4);
    MF.Board_LogoutAdmin();

condition.nowWeDoing = 'Создаем ЛД в наш штат с верхней фронт формы';
    SF.get(V.frontURL);
    MF.FrontSiteSmallCalc_SendZipCode('02461', '59401');
    MF.FrontSiteSmallCalc_ClickCalendar();
    V.frontNumbers = {};
    driver.wait(driver.executeScript(JSstep.Click4DaysNewCalendar).then(function (D) {
        V.frontNumbers.moveDate = D;
    }), config.timeout);
    MF.FrontSiteSmallCalc_ClickContinue();
    MF.FrontSiteSmallCalc_ClickChooseMoveSize();
    MF.FrontSiteSmallCalc_SelectMoveSize(3);
    MF.FrontSiteSmallCalc_ClickDoneMoveSize();
    MF.FrontSiteSmallCalc_SelectEntrance(1, 1);
    MF.FrontSiteSmallCalc_ClickContinueContractInfo();
    MF.FrontSiteSmallCalc_SetClientInfo(V.client);
    MF.FrontSite_SelectGoogleSearch();
    MF.FrontSiteSmallCalc_SubmitQuoteAndGoToAccount();
    MF.Account_ClickViewRequest();
    SF.sleep(3);
    V.accountNumbersLD={};
    LF.RememberAccountNumbersLD(V.accountNumbersLD);
    driver.wait(driver.findElement(By.xpath('//div[contains(text(),"Move Size")]/following-sibling::div[1]')).getText().then(function (text) {
       V.accountcb = SF.cleanPrice(text.substring(text.indexOf('Inventory') + 30, text.indexOf('c.f.')));
    }), config.timeout);
    SF.sleep(0.5);
    V.WhenCreateRequest = V.accountNumbersLD.Total - V.accountNumbersLD.Fuel;
    VD.IWant(VD.ToEqual, V.WhenCreateRequest, 100,'гранд тотал не совпал с настроиками');

condition.nowWeDoing = 'добавляем инвентарь 1й раз, и проверям гранд тотал, должна быть цена по скидке = мин к.ф.+ разница к.ф.* реит. Здесь расчеты для 1й скидки';
    driver.wait(driver.findElement(By.xpath('//span[@ng-if="vm.request.field_useweighttype.value == \'1\' && vm.request.total_weight.weight"]')).getText().then(function(text) {
		V.CBFinAccount = SF.cleanPrice(text);
	}),config.timeout);
    LF.AccountLocalAddInventory();
    V.accountNumbersLDAfterFirsrInventory={};
    LF.RememberAccountNumbersLD(V.accountNumbersLDAfterFirsrInventory);
    V.DiffrentAfterFirstInventory = V.accountNumbersLDAfterFirsrInventory.cbf -V.accountcb;//считаем разницу к.ф. до и после инвентаря
    V.PriceAfterFirstInventory = V.DiffrentAfterFirstInventory * 2; //считаем цену за доп.вес разнцица* реит(1я скидка)
    V.TotalAfterFirstInventory = V.PriceAfterFirstInventory + V.accountNumbersLDAfterFirsrInventory.Fuel + 100;// считаем гранд тотал
    VD.IWant(VD.ToEqual, V.TotalAfterFirstInventory, V.accountNumbersLDAfterFirsrInventory.Total,'гранд тотал не правильно посчитался после первого инвентаря');
    driver.wait(driver.findElement(By.xpath('//span[@ng-if="vm.request.field_useweighttype.value == \'2\' && vm.request.inventory_weight.cfs"]')).getText().then(function(text) {
		V.CBFinAccountAfterInventory = SF.cleanPrice(text);
		VD.IWant(VD.NotToEqual, V.CBFinAccount ,V.CBFinAccountAfterInventory,'совпал вес до добавления инвенторя и после или иная ошибка');
    }),config.timeout);
condition.nowWeDoing = '2й раз добавляем инвентарь, подгоняем под 2ю скидку';
    MF.Account_ClickInventoryOpenTab();
    SF.click(By.xpath('(//div[@class="new-inventory-item"])[3]//button[@ng-click="onClickCounter(-1)"]/following-sibling::button'));
    SF.click(By.xpath('(//div[@class="new-inventory-item"])[4]//button[@ng-click="onClickCounter(-1)"]/following-sibling::button'));
    SF.click(By.xpath('(//div[@class="new-inventory-item"])[5]//button[@ng-click="onClickCounter(-1)"]/following-sibling::button'));
    MF.Account_ClickSaveInventory();
	driver.wait(driver.findElement(By.xpath('//span[@ng-if="vm.request.field_useweighttype.value == \'2\' && vm.request.inventory_weight.cfs"]')).getText().then(function(text) {
		V.CBFinAccountAfterInventory2 = SF.cleanPrice(text);
		VD.IWant(VD.NotToEqual, V.CBFinAccountAfterInventory2 ,V.CBFinAccountAfterInventory,'совпал вес после добавления инвентаря  второй раз или иная ошибка ');
	}),config.timeout);
    V.accountNumbersLDAfterSecondInventory={};
    LF.RememberAccountNumbersLD(V.accountNumbersLDAfterSecondInventory);
    V.DiffrentAfterSecondInventory = V.accountNumbersLDAfterSecondInventory.cbf - V.accountcb;//считаем разницу к.ф. до и после инвентаря
    V.PriceAfterSecondInventory = V.DiffrentAfterSecondInventory * 3; //считаем цену за доп.вес разнцица* реит(1я скидка)
    V.TotalAfterSecondInventory = V.PriceAfterSecondInventory + V.accountNumbersLDAfterSecondInventory.Fuel + 100;// считаем гранд тотал
    VD.IWant(VD.ToEqual, V.TotalAfterSecondInventory, V.accountNumbersLDAfterSecondInventory.Total,'гранд тотал не правильно посчитался после второго инвентаря');
    LF.LogoutFromAccount();

condition.nowWeDoing = 'идем в модалку проверяем цену, ставим кастомный вес, проверяем 3ю скидку';
    SF.get(V.adminURL);
    LF.LoginToBoardAsCustom(V.adminLogin,V.adminPassword);
    MF.Board_OpenRequest(V.accountNumbersLD.Id);
	driver.wait(driver.findElement(By.xpath('//div[@ng-show="!request.isInventory"]')).getText().then(function(text) {
		V.CBFinAdmin = SF.cleanPrice(text);
		VD.IWant(VD.ToEqual, V.CBFinAccountAfterInventory2 ,V.CBFinAdmin,'не совпал вес инвентаря в аккаунте и реквесте на мувборде');
	}),config.timeout);
    V.boardNumbers = {};
    LF.RememberDigitsRequestBoard(V.boardNumbers);
    JS.step(JSstep.selectTruck((V.boardNumbers.LaborTimeMax + V.boardNumbers.TravelTime)/60));
    MF.WaitWhileBusy();
    driver.wait(driver.findElement(By.xpath('//input[@ng-model="request.field_long_distance_rate.value"]')).getAttribute('value').then(function (rate) {
        V.RateLDAfterCustomWeight = rate;
        VD.IWant(VD.ToEqual, V.RateLDAfterCustomWeight, V.DiscountPriceSecond, 'реит при входе в модалку не совпадает с настроиками 2й скидки');
    }),config.timeout);
    SF.sleep(1);
    MF.EditRequest_SetAdressToFrom();
    MF.EditRequest_OpenSettings();
    MF.EditRequest_ClickCustomCubFit();
    MF.EditRequest_SendNumberCustomCubFit(1300);
	driver.wait(driver.findElement(By.xpath('//input[@ng-model="request.custom_weight.value"]')).getAttribute('value').then(function(text) {
		V.CBFCustom = SF.cleanPrice(text);
	}),config.timeout);
    MF.EditRequest_OpenRequest();
    MF.EditRequest_SaveChanges();
    driver.wait(driver.findElement(By.xpath('//input[@ng-model="request.field_long_distance_rate.value"]')).getAttribute('value').then(function (rate) {
        V.RateLDAfterCustomWeight = rate;
        VD.IWant(VD.ToEqual, V.RateLDAfterCustomWeight, V.DiscountPriceThird, 'реит не поменялся при смене веса на кастомный, это 3я скидка');
    }),config.timeout);

condition.nowWeDoing = 'конфермим, переводим в клоузинг, проверяем, что все впорядке с реитом и суммами';
    MF.EditRequest_ChangeStatusRequest (3);
    MF.WaitWhileBusy();
    MF.EditRequest_SaveChanges();
    LF.EditRequest_AddPacking();
    V.boardNumbersSales = {};
    LF.RememberDigitsRequestBoard_Down (V.boardNumbersSales);
    MF.EditRequest_CloseConfirmWork ();
    driver.wait(driver.findElement(By.xpath('//input[@ng-model="invoice.field_long_distance_rate.value"]')).getAttribute('value').then(function (rate) {
        V.RateLDAfterCustomWeightClosing = rate;
        VD.IWant(VD.ToEqual, V.RateLDAfterCustomWeightClosing, V.DiscountPriceThird, 'реит не поменялся при смене веса на кастомный, это 3я скидка');
    }),config.timeout);
    V.boardNumbersClosing = {};
    LF.RememberDigitsRequestBoard_Down (V.boardNumbersClosing);
    VD.IWant (VD.ToEqual, V.boardNumbersSales.Quote, V.boardNumbersClosing.Quote, 'не совпал транспортэишен в сэилс и клоузинг');
    VD.IWant (VD.ToEqual, V.boardNumbersSales.Fuel, V.boardNumbersClosing.Fuel, 'не совпал фуел в сэилс и клоузинг ');
    VD.IWant (VD.ToEqual, V.boardNumbersSales.Packing, V.boardNumbersClosing.Packing, 'не совпал пакинг в сэилс и клоузинг ');

condition.nowWeDoing = 'заходим из-под админа в аккаунт сверяем цифры';
    MF.EditRequest_OpenSettings();
    MF.EditRequest_ClickViewRequest();
    SF.openTab(1);
    SF.sleep(6);
	driver.wait(driver.findElement(By.xpath('//span[@ng-if="vm.request.field_useweighttype.value == \'3\' && vm.request.custom_weight.value"]')).getText().then(function(text) {
		V.CBFCustominAccount = SF.cleanPrice(text);
		VD.IWant(VD.ToEqual,V.CBFCustom, V.CBFCustominAccount, 'не совпали кубикфты после добавления кастомного кубикфита на реквесте и на аккаунте');
	}),config.timeout);
    V.accountNumbersLDAfterCustomWeight={};
    LF.RememberAccountNumbersLD(V.accountNumbersLDAfterCustomWeight);
    VD.IWant (VD.ToEqual, V.boardNumbersSales.Total, V.accountNumbersLDAfterCustomWeight.Total, 'не совпал тотал в сэилс и аккаунте');
    VD.IWant (VD.ToEqual, V.boardNumbersSales.Fuel, V.accountNumbersLDAfterCustomWeight.Fuel, 'не совпал фуел в сэилс и аккаунте ');
    VD.IWant (VD.ToEqual, V.boardNumbersSales.Packing,  V.accountNumbersLDAfterCustomWeight.Packing, 'не совпал пакинг в сэилс и аккаунте ');
    driver.close();
    SF.openTab(0);
    SF.waitForLocated(By.xpath('//button[@ng-click="goToConfirmation()"]'));
    LF.closeEditRequest();

condition.nowWeDoing = 'Идем в настроику ЛД, удалем настроики для штата';
    MF.Board_OpenSettingsGeneral();
    MF.Board_OpenSettingsLongDistance ();
    MF.LongDistanceSettings_ClickOnMapState('#jqvmap1_mt');
    MF.Board_OpenSideBar();
    SF.click (By.xpath('//table[@ng-show="!discountTabActive"]//div[@class="manageRow"]/div[@ng-click="removeDiscount($index)"]'));
    SF.sleep(2);
    SF.click (By.xpath('//table[@ng-show="!discountTabActive"]//div[@class="manageRow"]/div[@ng-click="removeDiscount($index)"]'));
    SF.sleep(2);
    SF.click (By.xpath('//table[@ng-show="!discountTabActive"]//div[@class="manageRow"]/div[@ng-click="removeDiscount($index)"]'));
    SF.sleep(4);


    SF.endOfTest();
};