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

condition.nowWeDoing = 'идем в настройки рейтов и выставляем свой рейт 97 для регуляр';
    MF.Board_OpenSettingsRates();
    V.boardNumbers={HourlyRate:90};
    V.targets=[];
    driver.wait(driver.executeScript(JSstep.findAllDetermPrices(V.boardNumbers.HourlyRate)).then(function(array) {
        V.targets=array;
    }),config.timeout);
    SF.sleep(1);
    for (let t in V.targets) {
        SF.clear(By.xpath('(//input[@ng-change="vm.saveRates()"])['+(V.targets[t]+1)+']'));
        SF.send(By.xpath('(//input[@ng-change="vm.saveRates()"])['+(V.targets[t]+1)+']'),97);
    }
    SF.sleep(3);

condition.nowWeDoing = 'идем в настройки калькулятора и включаем дабл драйв тайм и ставим 15 минут';
    MF.Board_OpenSettingsCalculator();
    MF.CalculatorSettings_OpenTravelTime();
    MF.BoardSettingsCalculator_DoubleDriveTimeON();
    MF.BoardCalculatorSettings_SelectMinDoubleDriveTime(15);

condition.nowWeDoing = 'идем на дашборд и создаем драфт реквест и проверяем что драфт создался с новым рейтом и что есть дабл драйв тайм 15 минут';
    MF.Board_OpenDashboard();
    MF.Board_Refresh();
    MF.Board_CreateDraftRequest();
    driver.wait(driver.findElement(By.xpath('//input[@ng-model="request.field_double_travel_time.value"]')).getAttribute('value').then(function (text) {
        VD.IWant(VD.ToEqual, text, '00:15', 'не нашелся дабл драйв тайм в реквесте, хотя мы его включали');
    }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//input[@ng-model="request.rate.value"]')).getAttribute('value').then(function (text) {
        VD.IWant(VD.ToEqual, text, 97, 'рейт для драфта не подтянулся из настроек на тот который мы поменяли');
    }), config.timeout);
    MF.EditRequest_SetAdressToFrom();

condition.nowWeDoing = 'меняем мувдейт в реквесте и конфермим его, запоминаем все данные';
    LF.EditRequest_ChangeMoveDate(6);
    driver.wait(driver.findElement(By.xpath('//input[@ng-model="request.rate.value"]')).getAttribute('value').then(function (text) {
        VD.IWant(VD.ToEqual, text, 97, 'после смены мув дейт рейт поменялся, а не должен');
    }), config.timeout);
    LF.RememberDigitsRequestBoard(V.boardNumbers);
    JS.step(JSstep.selectTruck((V.boardNumbers.LaborTimeMax + V.boardNumbers.TravelTime)/60));
    MF.WaitWhileBusy();
    MF.EditRequest_SetToConfirmed();
    MF.EditRequest_SaveChanges();
    MF.EditRequest_CloseEditRequest();

condition.nowWeDoing = 'идем в настройки рейтов и меняем новый рейт на старый который был до этого (был 90)';
    MF.Board_OpenSettingsRates();
    V.targets2=[];
    driver.wait(driver.executeScript(JSstep.findAllDetermPrices(97)).then(function(array) {
        V.targets2=array;
    }),config.timeout);
    SF.sleep(1);
    VD.IWant(VD.NotToEqual, V.targets2.length, 0, 'какая-то фигня с соххранением настроек Rates');
    for (let t in V.targets) {
        SF.sleep(1.5);
        SF.clear(By.xpath('(//input[@ng-change="vm.saveRates()"])['+(V.targets[t]+1)+']'));
        SF.sleep(0.5);
        SF.send(By.xpath('(//input[@ng-change="vm.saveRates()"])['+(V.targets[t]+1)+']'),90);
    }
    SF.sleep(2);

condition.nowWeDoing = 'идем на дашборд в конферм реквесты, проверяем что работа законфермилась, дата сменилась, рейт остался новый а не старый и что все данные совпадают и что дабл драйв тайм на месте';
    MF.Board_OpenDashboard();
    MF.Board_OpenConfirmed();
    MF.Board_OpenRequest(V.boardNumbers.Id);
    V.boardNumbers2={};
    LF.RememberDigitsRequestBoard(V.boardNumbers2);
    VD.IWant(VD.ToEqual, V.boardNumbers.HourlyRate, V.boardNumbers2.HourlyRate, 'Изменился rate в конферм работе а не должен');
    LF.Validation_Compare_Account_Admin(V.boardNumbers, V.boardNumbers2);
    driver.wait(driver.findElement(By.xpath('//input[@ng-model="request.field_double_travel_time.value"]')).getAttribute('value').then(function (text) {
        VD.IWant(VD.ToEqual, text, '00:15', 'не нашелся дабл драйв тайм , хотя он не должен был пропасть в конферм работе');
    }),config.timeout);
    SF.sleep(1);
    MF.EditRequest_CloseEditRequest();

condition.nowWeDoing = 'идем в настройки калькулятора и выключаем дабл драйв тайм';
    MF.Board_OpenSettingsCalculator();
    MF.CalculatorSettings_OpenTravelTime();
    MF.BoardSettingsCalculator_DoubleDriveTimeOFF();



    //=========================закончили писать тест=============================
    SF.endOfTest();
};
