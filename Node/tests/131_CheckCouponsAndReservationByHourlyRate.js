module.exports = function main(SF, JS, MF, LF, JSstep, VD, V, By, until,FileDetector, system, condition, config,constants) {
    global.fiber = Fiber.current;
    V.client = {};
    V.client.name = SF.randomBukva(6) + '_t';
    V.client.fam = SF.randomBukva(6) + '_t';
    V.client.phone = SF.randomCifra(10);
    V.client.email = SF.randomBukvaSmall(6) + '@' + SF.randomBukvaSmall(4) + '.tes';
    V.client.passwd = 123;

    SF.get(V.adminURL);
    LF.LoginToBoardAsCustom(V.adminLogin,V.adminPassword);

    condition.nowWeDoing = 'Идём в настройки и включаем для local move почасовую резервацию';
    MF.Board_OpenSettingsSchedule();
    V.ReservationPrice = 0;
    MF.Schedule_SetReservationLocalTo(V.ReservationPrice);
    V.ReservationHour = 2;
    MF.Schedule_SetHourReservationLocalTo(V.ReservationHour);
    MF.Board_Refresh();

    condition.nowWeDoing = 'Создаём локал мув, добавляем инвентарь и этажи, проверяем что рейт и резервация поменялись.';
    LF.CreateLocalMovingFromBoard(V.client);
    V.requestNumber={};
    MF.EditRequest_RememberId(V.requestNumber);
    driver.wait(driver.findElement(By.xpath('//input[@ng-model="request.rate.value"]')).getAttribute('value').then(function (text) {
        V.Rate = SF.cleanPrice(text);
    }), config.timeout);
    driver.wait(driver.executeScript('return $("input#reserv_price").val()').then(function(text){
        V.ReservationPrice = SF.cleanPrice(text);
        VD.IWant(VD.ToEqual,V.ReservationPrice, V.Rate*V.ReservationHour,'Неправильно посчитана резервация при включенной настройке почасовой резервации ');
    }),config.timeout);
    MF.EditRequest_OpenClient();
    LF.SetClientPasswd(V.client.passwd);
    LF.addInventoryBoard();
    LF.addAdditionalInventoryBoard();
    MF.EditRequest_ChangeStairsTo(4);
    MF.EditRequest_ChangeStairsFrom(4);
    driver.wait(driver.findElement(By.xpath('//input[@ng-model="request.rate.value"]')).getAttribute('value').then(function (text) {
        V.RateNew = SF.cleanPrice(text);
        VD.IWant(VD.NotToEqual,V.RateNew, V.Rate,'Рейт не поменялся после добавления инвентаря ');
    }), config.timeout);
    driver.wait(driver.executeScript('return $("input#reserv_price").val()').then(function(text){
        V.ReservationPriceNew = SF.cleanPrice(text);
        VD.IWant(VD.ToEqual,V.ReservationPriceNew, V.RateNew *2 ,'Резевация не поменялясь или посчитана неправильно после того как мы добавили инвентарь и изменился рейт ');
    }), config.timeout);

    condition.nowWeDoing = 'Снова меняем этажи, проверяем что рейт и резервация изменились. Ставим статус not confirmed, сохраняем, открываем реквест заново и проверяем, что всё сохранилось';
    MF.EditRequest_ChangeStairsTo(1);
    MF.EditRequest_ChangeStairsFrom(1);
    MF.EditRequest_OpenSettings();
    V.managerFirstName = 'emilia';
    LF.SetManager(V.managerFirstName);
    MF.EditRequest_OpenRequest();
    driver.wait(driver.executeScript('return $("input#reserv_price").val()').then(function(text){
        V.ReservationPriceNew1 = SF.cleanPrice(text);
        VD.IWant(VD.NotToEqual,V.ReservationPriceNew1, V.ReservationPriceNew ,'Резевация не поменялясь или посчитана неправильно после того как мы поменяли рейт ');
    }), config.timeout);
    MF.EditRequest_SetAdressToFrom ();
    MF.EditRequest_SetToNotConfirmed();
    V.boardNumbers = {};
    LF.RememberDigitsRequestBoard(V.boardNumbers);
    JS.step(JSstep.selectTruck((V.boardNumbers.LaborTimeMax + V.boardNumbers.TravelTime)/60));
    MF.WaitWhileBusy();
    MF.EditRequest_SaveChanges();
    MF.EditRequest_CloseEditRequest();
    MF.Board_OpenDashboard();
    MF.Board_OpenNotConfirmed();
    MF.Board_OpenRequest(V.requestNumber.Id);
    driver.wait(driver.executeScript('return $("input#reserv_price").val()').then(function(text){
        text = SF.cleanPrice(text);
        VD.IWant(VD.ToEqual,text,  V.ReservationPriceNew1,'Резевация не сохранилась после того как мы перевели работу в Not Confirmed и повторно открыли реквест ');
    }), config.timeout);
    MF.EditRequest_CloseEditRequest();
    MF.Board_LogoutAdmin();

    condition.nowWeDoing = 'переходим в аккаунт,делаем сравнения';
    SF.get(V.accountURL);
    LF.LoginToAccountAsClient(V.client);
    MF.Account_OpenRequest(V.boardNumbers.Id);
    MF.Account_ClickViewRequest();
    V.accountNumbers= {};
    LF.RememberAccountNumbers(V.accountNumbers);
    LF.Validation_Compare_Account_Admin(V.accountNumbers,V.boardNumbers);

    condition.nowWeDoing = 'Оплачиваем резервацияю, проверяем что сумма совпадает с той, что была в реквесте.';
    LF.ConfirmRequestInAccount_WithReservation ();
    MF.Account_ClickViewConfirmationPage();
    driver.wait(driver.findElement(By.xpath('//h2[contains(text(),"Deposit Collected")]')).getText().then(function (text) {
        text = SF.cleanPrice(text);
        VD.IWant(VD.ToEqual,  V.ReservationPriceNew1, text,'не совпал reservation price на реквесте и на странице confirmation page');
    }), config.timeout);
    LF.LogoutFromAccount ();

    condition.nowWeDoing = 'Возвращаемся на мувборд, назначаем команду.';
    SF.get (V.adminURL);
    LF.LoginToBoardAsCustom(V.adminLogin,V.adminPassword);
    MF.Board_OpenLocalDispatch();
    LF.findDayInLocalDispatch(V.boardNumbers.moveDate.Year, V.boardNumbers.moveDate.Month, V.boardNumbers.moveDate.Day);
    MF.Dispatch_GridView();
    LF.SelectRequestDispatch(V.accountNumbers.Id);
    LF.selectCrew(V.foremanName);
    MF.Board_LogoutAdmin();

    condition.nowWeDoing = 'Заходим под фореманом, ставим несколько подсписей, проверяем start/end time, рейт команды, тотал';
    LF.LoginToBoardAsCustomForeman(V.foremanLogin, V.foremanPassword);
    LF.OpenRequestInForemanPage(V.accountNumbers.Id);
    MF.Contract_WaitConfirmationPage();
    MF.Contract_OpenBillOfLading();
    LF.MakeSignInContract();
    LF.MakeSignInContract();
    MF.Contract_DeclarationValueA();
    LF.MakeSignInContract();
    SF.click(By.xpath('//input[@ng-value="crew.timer.start  || request.start_time1.value"]'));
    SF.waitForVisible (By.xpath('//li[contains(text(), "04:00 PM")]'));
    SF.click(By.xpath('//li[contains(text(), "04:00 PM")]'));
    SF.sleep(1);
    LF.MakeSignInContract();
    SF.sleep(2);
    SF.click(By.xpath('//input[@ng-value="crew.timer.stop || request.start_time2.value"]'));
    SF.sleep(1);
    SF.waitForVisible (By.xpath('//div[4]/ul/li[contains(text(), "07:00 PM")]'));
    SF.click(By.xpath('//div[4]/ul/li[contains(text(), "07:00 PM")]'));
    SF.sleep(1);
    LF.MakeSignInContract();
    SF.sleep(2);
    driver.wait(driver.findElement(By.xpath('//tr[@ng-repeat="crew in data.crews"]/td[4]')).getText().then(function(text){
        VD.IWant(VD.ToEqual, '3', text, 'Не совпали Crew hours');
    }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//tr[@ng-repeat="crew in data.crews"]/td[3]')).getText().then(function(text){
        V.RatePerHW = SF.cleanPrice(text);
    }),config.timeout);
    SF.sleep(1);
    V.crewTotal = (V.RatePerHW * 3);
    driver.wait(driver.findElement(By.xpath('//tr[@ng-repeat="crew in data.crews"]/td[5]')).getText().then(function(text){
        V.cleanCrewTotal = SF.cleanPrice(text);
        VD.IWant(VD.ToEqual, V.crewTotal, V.cleanCrewTotal, 'Не совпали Crew total price');
    }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//tr[@ng-hide="!travelTimeSetting && !isDoubleDriveTime"]/following-sibling::tr/td[2]')).getText().then(function(text){
        V.totalHW = text;
    }),config.timeout);

    condition.nowWeDoing = 'Добавляем дискаунт купон Yelp coupon, выставляем сумму. Меняем Yelp на website coupon. Подписываем контракт, проверяем что подписи сохранились.';
    SF.click(By.xpath('//i[@ng-if="!showDiscount"]'));
    SF.click(By.xpath('//input[@ng-model="finance.discount"]'));
    SF.clear(By.xpath('//input[@ng-model="finance.discount"]'));
    SF.send(By.xpath('//input[@ng-model="finance.discount"]'), 120);
    SF.select(By.xpath('//select[@ng-change="selectCoupon()"]'), 'website');
    MF.Contract_ClickPay();
    MF.Contract_ClickTips10();
    MF.Contract_ClickAddTips();
    MF.Contract_ClickPaymentInfo();
    LF.PayCheck();
    LF.MakeSignInContract();
    LF.MakeSignInContract();
    driver.wait(driver.executeScript("return $('div[ng-if=\"data.signatures[stepId].value\"] img').length").then(function (text) {
        VD.IWant(VD.ToEqual, text, 7, 'не сохранились подписи на контракте');
    }),config.timeout);
    V.contractNumbers = {};
    MF.Contract_Submit(V.contractNumbers);
    MF.Contract_ReturnToForeman();
    LF.LogoutFromBoardForeman();

    condition.nowWeDoing= "Открываем реквест, проверяем labor time, купон и его сумму";
    LF.LoginToBoardAsCustom(V.adminLogin,V.adminPassword);
    MF.Board_OpenConfirmed();
    MF.Board_OpenRequest(V.requestNumber.Id);
    driver.wait(driver.findElement(By.xpath('//input[@ng-model="invoice.work_time"]')).getAttribute('value').then(function (text) {
        VD.IWant(VD.ToEqual, text, '03:00', 'не совпал лабор тайм с тем что выставили на контракте');
    }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//div[@ng-if="states.invoiceState && contract_discount && contract_discountType"]/label')).getText().then(function(text){
        VD.IWant(VD.ToEqual, text, 'Website Coupon:', 'Website coupon не отображается на табе клоузинг после того как мы выбрали его на контракте');
    }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//div[@ng-if="states.invoiceState && contract_discount && contract_discountType"]/div[1]/span')).getText().then(function(text){
        text = SF.cleanPrice(text);
        VD.IWant(VD.ToEqual, text, 120, 'Сумма выбранного купона на контракте не совпадает с суммой на табе клоузинг');
    }),config.timeout);
    LF.closeEditRequest();

    condition.nowWeDoing = 'Идём в настройки и включаем обратно для local move фиксированую резервацию';
    MF.Board_OpenSettingsSchedule();
    V.ReservationHour = 0;
    MF.Schedule_SetHourReservationLocalTo(V.ReservationHour);
    V.ReservationPrice = 150;
    MF.Schedule_SetReservationLocalTo(V.ReservationPrice);

    SF.sleep(1);
    SF.endOfTest();

};