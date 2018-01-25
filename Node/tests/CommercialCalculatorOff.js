module.exports = function main(SF, JS, MF, LF, JSstep, VD, V, By, until,FileDetector, system, condition, config,constants) {
    global.fiber = Fiber.current;
    V.client = {};
    V.client.name = SF.randomBukva(6) + '_t';
    V.client.fam = SF.randomBukva(6) + '_t';
    V.client.phone = SF.randomCifra(10);
    V.client.email = SF.randomBukvaSmall(6) + '@' + SF.randomBukvaSmall(4) + '.tes';
    V.client.passwd = 123;

    //=========================начинаем писать тест=============================

condition.nowWeDoing = 'создаем пакинг дей с фронта с выбором комершиала мув сайза';
    SF.get(V.frontURL);
    MF.FrontSiteSmallCalc_ClickNeedStorageCheckbox();
    MF.FrontSiteSmallCalc_SelectServiceType(8);
    MF.FrontSiteSmallCalc_SendZipFrom('02032');
    MF.FrontSiteSmallCalc_ClickCalendar();
    V.frontNumbers = {};
    driver.wait(driver.executeScript(JSstep.Click4DaysNewCalendar).then(function (D) {
        V.frontNumbers.moveDate = D;
        console.log(V.frontNumbers.moveDate);
    }),config.timeout);
    MF.FrontSiteSmallCalc_ClickContinue();
    MF.FrontSiteSmallCalc_ClickChooseMoveSize();
    MF.FrontSiteSmallCalc_SelectMoveSize(11);
    MF.FrontSiteSmallCalc_ClickDoneMoveSize();
    MF.FrontSiteSmallCalc_SelectEntrance(4, 3);
    MF.FrontSiteSmallCalc_ClickContinueContractInfo();
    MF.FrontSiteSmallCalc_SetClientInfo(V.client);
    MF.FrontSite_SelectGoogleSearch();
    MF.FrontSiteSmallCalc_SubmitQuoteAndGoToAccount();
    MF.Account_ClickViewRequest();
    SF.click(By.xpath('//div[@ng-click="openEditModal()"]'));
    SF.click(By.xpath('//oi-select[@ng-model="commercialSize"]'));
    SF.sleep(0.3);
    SF.click(By.xpath('//oi-select[@ng-model="commercialSize"]/div[2]//li[1]'));
    SF.send(By.xpath('//input[@ng-value="request.field_moving_from.thoroughfare"]'), 'blablabla');
    SF.send(By.xpath('//input[@ng-value="request.apt_from.value"]'), 123);
    SF.click(By.xpath('//button[@ng-click="update(client)"]'));
    MF.SweetConfirm();
    MF.SweetConfirm();
    LF.AccountLocalAddInventory ();
    V.accountNumbers = {};
    LF.RememberAccountNumbers(V.accountNumbers);
    LF.LogoutFromAccount();

condition.nowWeDoing = 'идем в админку сверять данные, выключать калькулятор, поменять время ворк тай и травел тайм и еще что то)';
    SF.get(V.adminURL);
    LF.LoginToBoardAsCustom(V.adminLogin, V.adminPassword);
    MF.Board_OpenRequest(V.accountNumbers.Id);
    V.boardNumbers = {};
    LF.RememberDigitsRequestBoard (V.boardNumbers);
    LF.Validation_Compare_Account_Admin (V.accountNumbers, V.boardNumbers);
    MF.EditRequest_SwitchCalculator();
    // SF.click(By.xpath('//input[@ng-model="request.maximum_time.value"]'));
    // SF.click(By.xpath('//input[@ng-model="request.minimum_time.value"]'));
    // SF.sleep(0.5);
    // SF.click(By.xpath('//li[@class="ui-timepicker-selected"]/following-sibling::li[2]'));
    SF.click(By.xpath('//input[@ng-model="request.maximum_time.value"]'));
    SF.click(By.xpath('//input[@ng-model="request.minimum_time.value"]'));
    SF.click(By.xpath('//input[@ng-model="request.maximum_time.value"]'));
    SF.sleep(0.5);
    SF.click(By.xpath('//div[contains(@class, "ui-timepicker-wrapper") and contains(@style,"display: block;")]/ul/li[contains(text(),"07:15")]'));
    SF.click(By.xpath('//input[@ng-model="request.travel_time.value"]'));
    SF.click(By.xpath('//input[@ng-model="request.minimum_time.value"]'));
    SF.click(By.xpath('//input[@ng-model="request.travel_time.value"]'));
    SF.sleep(0.5);
    SF.click(By.xpath('//div[contains(@class, "ui-timepicker-wrapper") and contains(@style,"display: block;")]/ul/li[contains(text(),"01:30")]'));

    SF.clear(By.xpath('//input[@ng-model="request.crew.value"]'));
    SF.send(By.xpath('//input[@ng-model="request.crew.value"]'), 5);

    SF.clear(By.xpath('//input[@ng-model="request.rate.value"]'));
    SF.send(By.xpath('//input[@ng-model="request.rate.value"]'), 98);

    JS.step(JSstep.selectTruck(2));
    MF.WaitWhileBusy();
    MF.EditRequest_OpenFuelSurchModal();
    SF.click(By.xpath('//input[@ng-change="changeSurcharge(\'request\',\'perc\')"]'));
    SF.send(By.xpath('//input[@ng-change="changeSurcharge(\'request\',\'perc\')"]'), 150);
    SF.click(By.xpath('//button[@ng-click="Apply()"]'));
    MF.WaitWhileToaster();
    MF.EditRequest_AddPacking();
    MF.EditRequest_AddAdditionalServicesFullPack ();
    MF.EditRequest_SetToNotConfirmed ();
    V.boardNumbersAfterCalcOff = {};
    LF.RememberDigitsRequestBoard (V.boardNumbersAfterCalcOff);
    MF.EditRequest_SaveChanges();
    MF.EditRequest_OpenClient();
    LF.SetClientPasswd (V.client.passwd);
    MF.EditRequest_CloseEditRequest();
    MF.Board_LogoutAdmin();
    SF.get(V.accountURL);
    LF.LoginToAccountAsClient (V.client);
    MF.Account_OpenRequest(V.accountNumbers.Id);
    V.accountNumbersAfterCalcOff={};
    LF.RememberAccountNumbers(V.accountNumbersAfterCalcOff);
    LF.Validation_Compare_Account_Admin(V.accountNumbersAfterCalcOff, V.boardNumbersAfterCalcOff);
    LF.ConfirmRequestInAccount_WithReservation();


    //=========================закончили писать тест=============================
    SF.endOfTest();
};
