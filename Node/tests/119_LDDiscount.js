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
    JS.click('#jqvmap1_mt');
    SF.waitForVisible (By.xpath('//div[@ng-if="vm.showSidebar"]'));
    SF.sleep (3);
    SF.sleep(2);
    driver.wait(driver.executeScript("if($('input[ng-model=\"vm.longdistance.stateRates[vm.longdistance.basedState][vm.stateCode].minPriceEnabled\"]').hasClass('ng-not-empty')){" +
       "return true;}else{$('input[ng-model=\"vm.longdistance.stateRates[vm.longdistance.basedState][vm.stateCode].minPriceEnabled\"]').click()}"),config.timeout);
    SF.sleep(0.5);
    V.minCF = 350;
    V.minPrice = 100;
    V.stateRate = 5;
    SF.clear(By.xpath('//input[@ng-model="vm.longdistance.stateRates[vm.longdistance.basedState][vm.stateCode].min_weight"]'));
    SF.send(By.xpath('//input[@ng-model="vm.longdistance.stateRates[vm.longdistance.basedState][vm.stateCode].min_weight"]'), V.minCF);
    SF.clear(By.xpath('//input[@ng-model="vm.longdistance.stateRates[vm.longdistance.basedState][vm.stateCode].minPrice"]'));
    SF.send(By.xpath('//input[@ng-model="vm.longdistance.stateRates[vm.longdistance.basedState][vm.stateCode].minPrice"]'), V.minPrice);
    SF.clear(By.xpath('//input[@ng-model="vm.longdistance.stateRates[vm.longdistance.basedState][vm.stateCode].state_rate"]'));
    SF.send(By.xpath('//input[@ng-model="vm.longdistance.stateRates[vm.longdistance.basedState][vm.stateCode].state_rate"]'), V.stateRate);
    MF.Board_OpenSideBar();
    SF.sleep(1);
    SF.click(By.xpath('//tbody/tr[@ng-click="addDiscount(-1)"]'));
    SF.sleep(1);

condition.nowWeDoing = 'Добавляем 3 дисконта';
    V.DiscountPriceFirst = 2;
    V.DiscountPriceCFFirst = 700;
    SF.sleep(2);
    SF.clear(By.xpath('//tr[@ng-repeat="row in discounts"][1]//input[@ng-model="row.rate"]'));
    SF.sleep(2);
    SF.send(By.xpath('//tr[@ng-repeat="row in discounts"][1]//input[@ng-model="row.rate"]'),V.DiscountPriceFirst);
    SF.sleep(2);
    SF.clear(By.xpath('//tr[@ng-repeat="row in discounts"][1]//input[@ng-model="row.startWeight"]'));
    SF.sleep(2);
    SF.send(By.xpath('//tr[@ng-repeat="row in discounts"][1]//input[@ng-model="row.startWeight"]'),V.DiscountPriceCFFirst);
    SF.sleep(1);
    SF.click(By.xpath('//div[@ng-click="addDiscount($index)"]'));
    V.DiscountPriceSecond = 3;
    V.DiscountPriceCFSecond = 900;
    SF.sleep(2);
    SF.clear(By.xpath('//tr[@ng-repeat="row in discounts"][2]//input[@ng-blur="saveSettings()"]'));
    SF.sleep(2);
    SF.send(By.xpath('//tr[@ng-repeat="row in discounts"][2]//input[@ng-blur="saveSettings()"]'),V.DiscountPriceSecond);
    SF.sleep(2);
    SF.clear(By.xpath('//tr[@ng-repeat="row in discounts"][2]//input[@ng-blur="sortDiscount()"]'));
    SF.sleep(2);
    SF.send(By.xpath('//tr[@ng-repeat="row in discounts"][2]//input[@ng-blur="sortDiscount()"]'),V.DiscountPriceCFSecond);
    SF.sleep(1);
    SF.click(By.xpath('//tr[@ng-repeat="row in discounts"][2]//div[@ng-click="addDiscount($index)"]'));
    V.DiscountPriceThird = 4;
    V.DiscountPriceCFThird = 1300;
    SF.sleep(2);
    SF.clear(By.xpath('//tr[@ng-repeat="row in discounts"][3]//input[@ng-model="row.rate"]'));
    SF.sleep(2);
    SF.send(By.xpath('//tr[@ng-repeat="row in discounts"][3]//input[@ng-model="row.rate"]'),V.DiscountPriceThird);
    SF.sleep(2);
    SF.clear(By.xpath('//tr[@ng-repeat="row in discounts"][3]//input[@ng-model="row.startWeight"]'));
    SF.sleep(2);
    SF.send(By.xpath('//tr[@ng-repeat="row in discounts"][3]//input[@ng-model="row.startWeight"]'),V.DiscountPriceCFThird);
    SF.sleep(10);
    MF.Board_LogoutAdmin();

condition.nowWeDoing = 'Создаем ЛД в наш штат с верхней фронт формы';
    SF.get(V.frontURL);
    SF.sleep(2.5);
    MF.FrontSiteSmallCalc_SendZipCode('02461', '59012');
    MF.FrontSiteSmallCalc_ClickCalendar();
    V.frontNumbers = {};
    driver.wait(driver.executeScript(JSstep.Click4DaysNewCalendar).then(function (D) {
        V.frontNumbers.moveDate = D;
        console.log(V.frontNumbers.moveDate);
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
    V.accountNumbersLD={};
    LF.RememberAccountNumbersLD(V.accountNumbersLD);
    driver.wait(driver.findElement(By.xpath('//div[contains(text(),"Move Size")]/following-sibling::div[1]')).getText().then(function (text) {
       V.accountcb = SF.cleanPrice(text.substring(text.indexOf('Inventory') + 30, text.indexOf('c.f.')));
          console.log( V.accountcb);
    }), config.timeout);
    SF.sleep(2);
    V.WhenCreateRequest = V.accountNumbersLD.Total - V.accountNumbersLD.Fuel;
    VD.IWant(VD.ToEqual, V.WhenCreateRequest, 100,'гранд тотал не совпал с настроиками');

condition.nowWeDoing = 'добавляем инвентарь 1й раз, и проверям гранд тотал, должна быть цена по скидке = мин к.ф.+ разница к.ф.* реит. Здесь расчеты для 1й скидки';
    LF.AccountLocalAddInventory();
    V.accountNumbersLDAfterFirsrInventory={};
    LF.RememberAccountNumbersLD(V.accountNumbersLDAfterFirsrInventory);
    V.DiffrentAfterFirstInventory = V.accountNumbersLDAfterFirsrInventory.cbf -V.accountcb;//считаем разницу к.ф. до и после инвентаря
    V.PriceAfterFirstInventory = V.DiffrentAfterFirstInventory * 2; //считаем цену за доп.вес разнцица* реит(1я скидка)
    V.TotalAfterFirstInventory = V.PriceAfterFirstInventory + V.accountNumbersLDAfterFirsrInventory.Fuel + 100;// считаем гранд тотал
    VD.IWant(VD.ToEqual, V.TotalAfterFirstInventory, V.accountNumbersLDAfterFirsrInventory.Total,'гранд тотал не правильно посчитался после первого инвентаря');
    SF.sleep(3);

condition.nowWeDoing = '2й раз добавляем инвентарь, подгоняем под 2ю скидку';
    MF.Account_ClickInventoryOpenTab();
    SF.click(By.xpath('(//div[@class="new-inventory-item"])[3]//button[@ng-click="onClickCounter(-1)"]/following-sibling::button'));
    SF.click(By.xpath('(//div[@class="new-inventory-item"])[4]//button[@ng-click="onClickCounter(-1)"]/following-sibling::button'));
    SF.click(By.xpath('(//div[@class="new-inventory-item"])[5]//button[@ng-click="onClickCounter(-1)"]/following-sibling::button'));
    MF.Account_ClickSaveInventory();
    V.accountNumbersLDAfterSecondInventory={};
    LF.RememberAccountNumbersLD(V.accountNumbersLDAfterSecondInventory);
    V.DiffrentAfterSecondInventory = V.accountNumbersLDAfterSecondInventory.cbf - V.accountcb;//считаем разницу к.ф. до и после инвентаря
    console.log(V.DiffrentAfterSecondInventory);
    V.PriceAfterSecondInventory = V.DiffrentAfterSecondInventory * 3; //считаем цену за доп.вес разнцица* реит(1я скидка)
    console.log(V.PriceAfterSecondInventory);
    V.TotalAfterSecondInventory = V.PriceAfterSecondInventory + V.accountNumbersLDAfterSecondInventory.Fuel + 100;// считаем гранд тотал
    console.log(V.TotalAfterSecondInventory);
    VD.IWant(VD.ToEqual, V.TotalAfterSecondInventory, V.accountNumbersLDAfterSecondInventory.Total,'гранд тотал не правильно посчитался после второго инвентаря');
    SF.sleep(5);
    LF.LogoutFromAccount();

condition.nowWeDoing = 'идем в модалку проверяем цену, ставим кастомный вес, проверяем 3ю скидку';
    SF.get(V.adminURL);
    LF.LoginToBoardAsCustom(V.adminLogin,V.adminPassword);
    MF.Board_OpenRequest(V.accountNumbersLD.Id);
    V.boardNumbers = {};
    LF.RememberDigitsRequestBoard(V.boardNumbers);
    JS.step(JSstep.selectTruck((V.boardNumbers.LaborTimeMax + V.boardNumbers.TravelTime)/60));
    MF.WaitWhileBusy();
    SF.sleep(2);
    driver.wait(driver.findElement(By.xpath('//input[@ng-model="request.field_long_distance_rate.value"]')).getAttribute('value').then(function (rate) {
        V.RateLDAfterCustomWeight = rate;
        VD.IWant(VD.ToEqual, V.RateLDAfterCustomWeight, V.DiscountPriceSecond, 'реит при входе в модалку не совпадает с настроиками 2й скидки');
    }),config.timeout);
    SF.sleep(1);
    MF.EditRequest_SetAdressToFrom();
    MF.EditRequest_OpenSettings();
    MF.EditRequest_ClickCustomCubFit();
    MF.EditRequest_SendNumberCustomCubFit(1300);
    MF.EditRequest_OpenRequest();
    MF.EditRequest_SaveChanges();
    driver.wait(driver.findElement(By.xpath('//input[@ng-model="request.field_long_distance_rate.value"]')).getAttribute('value').then(function (rate) {
        V.RateLDAfterCustomWeight = rate;
        VD.IWant(VD.ToEqual, V.RateLDAfterCustomWeight, V.DiscountPriceThird, 'реит не поменялся при смене веса на кастомный, это 3я скидка');
    }),config.timeout);
    SF.sleep(2);

condition.nowWeDoing = 'конфермим, переводим в клоузинг, проверяем, что все впорядке с реитом и суммами';
    MF.EditRequest_ChangeStatusRequest (3);
    MF.WaitWhileBusy();
    MF.EditRequest_SaveChanges();
    MF.EditRequest_AddPacking();
    V.boardNumbersSales = {};
    LF.RememberDigitsRequestBoard_Down (V.boardNumbersSales);
    MF.EditRequest_CloseConfirmWork ();
    driver.wait(driver.findElement(By.xpath('//input[@ng-model="request.field_long_distance_rate.value"]')).getAttribute('value').then(function (rate) {
        V.RateLDAfterCustomWeightClosing = rate;
        VD.IWant(VD.ToEqual, V.RateLDAfterCustomWeightClosing, V.DiscountPriceThird, 'реит не поменялся при смене веса на кастомный, это 3я скидка');
    }),config.timeout);
    SF.sleep(2);
    V.boardNumbersClosing = {};
    LF.RememberDigitsRequestBoard_Down (V.boardNumbersClosing);
    VD.IWant (VD.ToEqual, V.boardNumbersSales.Quote, V.boardNumbersClosing.Quote, 'не совпал транспортэишен в сэилс и клоузинг');
    VD.IWant (VD.ToEqual, V.boardNumbersSales.Fuel, V.boardNumbersClosing.Fuel, 'не совпал фуел в сэилс и клоузинг ');
    VD.IWant (VD.ToEqual, V.boardNumbersSales.Packing, V.boardNumbersClosing.Packing, 'не совпал пакинг в сэилс и клоузинг ');
    SF.sleep(1);

condition.nowWeDoing = 'заходим из-под админа в аккаунт сверяем цифры';
    MF.EditRequest_OpenSettings();
    MF.EditRequest_ClickViewRequest();
    SF.openTab(1);
    SF.sleep(15);
    V.accountNumbersLDAfterCustomWeight={};
    LF.RememberAccountNumbersLD(V.accountNumbersLDAfterCustomWeight);
    SF.sleep(2);
    VD.IWant (VD.ToEqual, V.boardNumbersSales.Total, V.accountNumbersLDAfterCustomWeight.Total, 'не совпал тотал в сэилс и аккаунте');
    VD.IWant (VD.ToEqual, V.boardNumbersSales.Fuel, V.accountNumbersLDAfterCustomWeight.Fuel, 'не совпал фуел в сэилс и аккаунте ');
    VD.IWant (VD.ToEqual, V.boardNumbersSales.Packing,  V.accountNumbersLDAfterCustomWeight.Packing, 'не совпал пакинг в сэилс и аккаунте ');
    SF.sleep(3);
    driver.close();
    SF.openTab(0);
    SF.waitForLocated(By.xpath('//button[@ng-click="goToConfirmation()"]'));
    LF.closeEditRequest();

condition.nowWeDoing = 'Идем в настроику ЛД, удалем настроики для штата';
    MF.Board_OpenSettingsGeneral();
    MF.Board_OpenSettingsLongDistance ();
    JS.click('#jqvmap1_mt');
    SF.waitForVisible (By.xpath('//div[@ng-if="vm.showSidebar"]'));
    MF.Board_OpenSideBar();
    SF.sleep (3);
    SF.click (By.xpath('//div[@class="manageRow"]/div[@ng-click="removeDiscount($index)"]'));
    SF.click (By.xpath('//div[@class="manageRow"]/div[@ng-click="removeDiscount($index)"]'));
    SF.click (By.xpath('//div[@class="manageRow"]/div[@ng-click="removeDiscount($index)"]'));
    SF.sleep(1);


    SF.endOfTest();
};