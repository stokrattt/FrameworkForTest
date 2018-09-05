module.exports = function main(SF, JS, MF, LF, JSstep, VD, V, By, until,FileDetector, system, condition, config,constants) {
    global.fiber = Fiber.current;
    V.client = {};
    V.client.name = SF.randomBukva(6) + '_t';
    V.client.fam = SF.randomBukva(6) + '_t';
    V.client.phone = SF.randomCifra(10);
    V.client.email = SF.randomBukvaSmall(6) + '@' + SF.randomBukvaSmall(4) + '.tes';

    //=========================начинаем писать тест=============================

condition.nowWeDoing = 'создаем три реквеста на одно чувачка и потом идем в один из ' +
    'реквестов проверяем, что у него есть все вот эти работы созданные';
    SF.get(V.adminURL);
    LF.LoginToBoardAsCustom(V.adminLogin,V.adminPassword);
    LF.CreateMovAndStorFromBoard(V.client);
    driver.wait(driver.findElement(By.xpath('//a[@ng-click="select(tabs[0])"]')).getText().then(function(text){
        V.request.Id1 = SF.cleanPrice(text);
        // LF.addToCleanerJob(V.request.Id1);
    }), config.timeout);
    LF.closeEditRequest ();
    LF.CreateLoadingHelpFromBoard(V.client);
    driver.wait(driver.findElement(By.xpath('//a[@ng-click="select(tabs[0])"]')).getText().then(function(text){
        V.request.Id2 = SF.cleanPrice(text);
        // LF.addToCleanerJob(V.request.Id2);
    }), config.timeout);
    LF.closeEditRequest ();
    LF.CreateLocalMovingFromBoard(V.client);
    driver.wait(driver.findElement(By.xpath('//a[@ng-click="select(tabs[0])"]')).getText().then(function(text){
        V.request.Id2 = SF.cleanPrice(text);
        // LF.addToCleanerJob(V.request.Id3);
    }), config.timeout);
    MF.EditRequest_OpenClient ();
    SF.sleep (3);
    driver.wait(driver.executeScript('return $("div:contains(\\"All Moves\\") tbody tr td.sorting_1").length').then(function (length) {
        VD.IWant (VD.ToEqual, length, '3', 'на вкладке клиент нету всех работ данного юзера');
    }),config.timeout);

condition.nowWeDoing = 'меняем макс ворк тайм но калькулятор не выключаем, то есть не сохраняем изменения и потом проверим, что время не поменялось и что калькулятор остался включенным и что нет измененных сохранений';
    driver.wait(driver.findElement(By.xpath('//td[@class="dtStatus "]/span[@ng-hide="request.status.raw == 9 && request.service_type.raw == 7"]')).getText().then(function
        (text) {
        VD.IWant(VD.ToEqual, 'Pending', text, 'не нашло статус реквеста на табе клиент или не совпало' );
    }), config.timeout);
    MF.EditRequest_OpenRequest ();
    V.boardNumbersBeforeTryCalcOFF = {};
    MF.EditRequest_RememberWorkTime(V.boardNumbersBeforeTryCalcOFF);
    SF.click(By.xpath('//input[@ng-model="request.maximum_time.value"]'));
    SF.click(By.xpath('//li[@class="ui-timepicker-selected"]/following-sibling::li[5]'));
    SF.waitForVisible(By.xpath('//h2[contains(text(),"Are you sure you want to set time manualy?")]'));
    SF.sleep(2);
    SF.click(By.xpath('//button[contains(text(),"No, cancel pls!")]'));
    JS.click('button[ng-click=\\"UpdateRequest()\\"]');
    JS.waitForExist("h2:contains(\"Nothing to Update!\")");
    // MF.SweetConfirm();
    LF.closeEditRequest ();
    MF.Board_OpenRequest(V.request.Id2);
    V.boardNumbersAfterTryCalcOFF = {};
    MF.EditRequest_RememberWorkTime(V.boardNumbersAfterTryCalcOFF);
    SF.sleep(1);
    VD.IWant(VD.ToEqual, V.boardNumbersBeforeTryCalcOFF.LaborTimeMin, V.boardNumbersAfterTryCalcOFF.LaborTimeMin, 'перерсчитался мин ворк тайм, а не должен был, потому что мы отказались выключать калькуялтор');
    VD.IWant(VD.ToEqual, V.boardNumbersBeforeTryCalcOFF.LaborTimeMax, V.boardNumbersAfterTryCalcOFF.LaborTimeMax, 'перерсчитался макс ворк тайм, а не должен был, потому что мы отказались выключать калькуялтор');

condition.nowWeDoing = 'тут проверяем одной функцией или совпадате или вообще есть статус реквеста на табе клиент';
    SF.click(By.xpath('//input[@ng-model="request.maximum_time.value"]'));
    SF.click(By.xpath('//li[@class="ui-timepicker-selected"]/following-sibling::li[2]'));
    SF.waitForVisible(By.xpath('//h2[contains(text(),"Are you sure you want to set time manualy?")]'));
    SF.sleep(2);
    SF.click(By.xpath('//button[contains(text(),"Yes, let\'s do it!")]'));
    SF.sleep(1);
    MF.EditRequest_OpenSettings ();
    V.managerFirstName = 'emilia';
    LF.SetManager(V.managerFirstName);
    MF.EditRequest_OpenRequest ();
    MF.EditRequest_SaveChanges();
    LF.closeEditRequest ();
    SF.click(By.xpath('//td[@ng-click="requestEditModal(request)"][contains(text(),"' + V.request.Id2 + '")]/..' +
        '//span[@ng-show="request.manager.first_name"]'));
    JS.click('a:contains("JackSales"):visible');
    MF.SweetConfirm();
    MF.WaitWhileBusy ();
    MF.WaitWhileToaster ();
    MF.WaitWhileToaster ();
    MF.Board_OpenRequest(V.request.Id2);
    MF.EditRequest_OpenLogs();
    driver.wait(driver.findElement(By.xpath('//div[@ng-repeat="item in detail.text"]/' +
        'span[@ng-if="item.text.search(\'Lot\') == -1 && item.text.search(\'Charges\') == -1 && item.text != \'client notes\'"]' +
        '/span[2]/span[2]')).getText().then(function (text) {
        VD.IWant(VD.ToEqual, text, 'JackSales donotdelete', 'в логах не отобразилась смена менеджера');
    }),config.timeout);
    SF.sleep(1.5);

    //=========================закончили писать тест=============================
    SF.endOfTest();
};
