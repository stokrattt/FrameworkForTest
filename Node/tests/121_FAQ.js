module.exports = function main(SF, JS, MF, LF, JSstep, VD, V, By, until,FileDetector, system, condition, config,constants){
    global.fiber = Fiber.current;
    V.client = {};
    V.client.name = SF.randomBukva(6) + '_t';
    V.client.fam = SF.randomBukva(6) + '_t';
    V.client.phone = SF.randomCifra(10);
    V.client.email = SF.randomBukvaSmall(6) + '@' + SF.randomBukvaSmall(4) + '.tes';
    V.Question = SF.randomBukva(10);
    V.Answer = SF.randomBukva(30);


    SF.get(V.adminURL);
condition.nowWeDoing = 'идем в настроики FAQ, добавляем вопрос и заходим в Miscellaneous, что бы установить настройки для' +
    'повышения тарифов на резервацию';

    LF.LoginToBoardAsCustom(V.adminLogin,V.adminPassword);
    MF.Board_OpenSettingsGeneral ();
    MF.Board_OpenSettingsAccountPageFAQ();
    SF.click(By.xpath('//div[@class="settings-account-faq__sort-settings"]//button[@ng-click="openCreateModal()"]'));
    MF.WaitWhileBusy();
    SF.click(By.xpath('//input[@ng-model="item.faq_question"]'));
    SF.send(By.xpath('//input[@ng-model="item.faq_question"]'),V.Question);
    SF.sleep(1);
    SF.click(By.xpath('//div[@placeholder=\"Answer\"]'));
    SF.send(By.xpath('//div[@ng-model="item.faq_answer"]//div[@ng-model="html"]'),V.Answer);
    SF.sleep(2);
    SF.click(By.xpath('//div[@class="modal-footer"]//button[@ng-click="save()"]'));
    MF.WaitWhileToaster();
    SF.sleep(2);
    SF.click(By.xpath('//li[@ng-show="vm.PermissionsServices.hasPermission(\'canSeeSettingsMenu\');"]//span[contains(text(), \"Miscellaneous\")]'));
    SF.click(By.xpath('//select[@ng-model="vm.scheduleSettings.whenReservationRateIncrease"]'));
    SF.click(By.xpath('//select[@ng-model="vm.scheduleSettings.whenReservationRateIncrease"]//option[@value= 48]'));
    SF.click(By.xpath('//input[@ng-model="vm.scheduleSettings.ReservationRateIncreaseRate"]'));
    SF.send(By.xpath('//input[@ng-model="vm.scheduleSettings.ReservationRateIncreaseRate"]'),200);
    SF.click(By.xpath('//section[@ng-controller="ScheduleContorller as vm"]'));
    MF.Board_LogoutAdmin();

condition.nowWeDoing = 'создаем реквест с фронта, проверяем в аккаунте вопрос который мы создали';
    SF.get(V.frontURL);
    LF.FullSmallCalcAsLocal(V.client);
    MF.Account_ClickViewRequest();
    V.accountNumbers = {};
    LF.RememberAccountNumbers(V.accountNumbers);
    SF.click(By.xpath('//div[@ng-repeat="item in questionArr"]//span[contains(text(), "'+V.Question+'")]'));
    SF.sleep(2);

condition.nowWeDoing = 'Проверяем совпадает ли ответ с тем который мы создали';
    driver.wait(driver.findElement(By.xpath('//div[@class="panel-collapse in collapse"]//div[@ng-bind-html="item.faq_answer"]')).getText().then(function(text) {
             VD.IWant(VD.ToEqual, V.Answer, text,'не совпадает ответ с тем что мы создавали');
    }),config.timeout);
    SF.click(By.xpath('//div[@class="panel-collapse in collapse"]//button[contains(text(), \"Yes\")]'));
    SF.sleep(1);

condition.nowWeDoing = 'возвращаемся на мувборд';
    LF.LogoutFromAccount();
    SF.get(V.adminURL);

condition.nowWeDoing = 'идем в наш реквест,делаем проверку на появление свит-алерта и текста в нем, проверяем увеличение резервации';
    LF.LoginToBoardAsCustom(V.adminLogin,V.adminPassword);
    MF.Board_OpenRequest(V.accountNumbers);
    LF.EditRequest_ChangeMoveDate(2);
    MF.EditRequest_SetAdressToFrom();
    MF.EditRequest_SetToNotConfirmed();
    SF.waitForVisible(By.xpath('//div[@data-has-confirm-button="true"]'));
    driver.wait(driver.findElement(By.xpath('//div[@data-has-confirm-button="true"]/h2[contains( text(),' +
        '"Due to less than 48 hours move date rule, the reservation price was increased")]')).then(function(text){
        VD.IWant(VD.ToEqual, text, "Due to less than 48 hours move date rule, the reservation price was increased",'не тот текст в свит-алерте');
    }),config.timeout);
    MF.SweetConfirm();
    V.ReservationAfterIncreased = {};
    driver.wait(driver.executeScript('return $("input#reserv_price").val()').then(function(text){
        V.ReservationAfterIncreased = SF.cleanPrice(text);
        VD.IWant(VD.ToEqual, V.ReservationAfterIncreased, 150 + 200, 'не совпала сумма резервации после пересчета по настройке');
    }),config.timeout);
    JS.step(JSstep.selectTruck(4));
    MF.WaitWhileBusy();
    MF.EditRequest_OpenClient();
    LF.SetClientPasswd();
    MF.EditRequest_OpenRequest();
    V.boardNumbers = {};
    LF.RememberDigitsRequestBoard(V.boardNumbers);
    MF.EditRequest_SaveChanges();
    MF.EditRequest_CloseEditRequest();

    condition.nowWeDoing = 'заходим в настройки FAQ';
    MF.Board_OpenSettingsGeneral ();
    MF.Board_OpenSettingsAccountPageFAQ();

condition.nowWeDoing = 'Проверяем совпадает ли оценка';
    driver.wait(driver.findElement(By.xpath('//div[@class="score-box upvote"]')).getText().then(function(text) {
           VD.IWant(VD.ToEqual, SF.cleanPrice(text), 1, 'оценка не совпала');
    }),config.timeout);

condition.nowWeDoing = 'удаляем вопрос';
    SF.click(By.xpath('//div[@class="sizeset chat-widget"]//button[contains(text(), \"Remove\")]'));
    MF.WaitWhileBusy();
    MF.SweetConfirm();

    condition.nowWeDoing = 'Заходим под клиентом, делаем проверку резервации на конфирмейшн пэйдж,оплачиваем резервацию';
    LF.Board_LogoutAdmin();
    SF.get(V.accountURL);
    LF.LoginToAccountAsClient(V.client);
    MF.Account_OpenRequest(V.boardNumbers);
    V.accountNumbersAfterIncreased = {};
    LF.Validation_Compare_Account_Admin(V.accountNumbersAfterIncreased,V.boardNumbers);
    MF.Account_ClickProceedBookYourMove();
    Debug.pause();
    driver.wait(driver.findElement(By.xpath('//div[@ng-class="{\'disabled\':vm.admin}"]/div/h2[contains(text(),"Deposit: ")]')).getText().then(function (text) {
        text = SF.cleanPrice(text);
        VD.IWant(VD.ToEqual, text, 150 + 200 , 'после пересчета по настройкам резервация не совпала на конфирмейшн пэйдж');
    }),config.timeout);
    MF.Account_ClickIAgreeWithAll();
    MF.Account_ClickConfirmReservation();
    LF.MakeSignJS('signatureCanvasReserv');
    SF.click(By.xpath('//button[contains(@ng-click,"saveReservSignature()")]'));
    LF.FillCardPayModal();
    MF.WaitWhileSpinner();
    MF.Account_WaitForGreenTextAfterConfirm();
    LF.LogoutFromAccount();

    condition.nowWeDoing = 'Заходим на мувборд, чекаем наш реквест в табе конферм и проверяем оплату резервации в пэйментах' +
        'далее заходим в настройки и меняем время и ставим процент от квоты.создаем новый реквест';
    SF.get(V.adminURL);
    LF.LoginToBoardAsCustom(V.adminLogin, V.adminPassword);
    MF.Board_OpenConfirmed();
    MF.Board_OpenRequest(V.boardNumbers.Id);
    JS.scroll('label[ng-click="OpenPaymentModal();"]');
    SF.click(By.xpath('//label[@ng-click="OpenPaymentModal();"]'));
    SF.sleep(1);
    driver.wait(driver.findElement(By.xpath('//tr[@ng-click="prepareToDelete($index, receipt.id)"]/td[4]')).getText().then(function (text) {
        text = SF.cleanPrice(text);
        VD.IWant(VD.ToEqual, text, 350, 'оплата не совпала с той суммой,которую мы оплатили на конфирмейшн пэйдж');
    }),config.timeout);
    SF.click(By.xpath('//button[@ng-click="cancel()"]'));
    MF.EditRequest_CloseEditRequest();
    Debug.pause();
    MF.Board_OpenMiscellaneous();
    SF.click(By.xpath('//select[@ng-model="vm.scheduleSettings.whenReservationRateIncrease"]'));
    SF.click(By.xpath('//select[@ng-model="vm.scheduleSettings.whenReservationRateIncrease"]//option[@value= 72]'));
    SF.click(By.xpath('//input[@ng-model="vm.scheduleSettings.ReservationRateIncreaseRate"]'));
    SF.send(By.xpath('//input[@ng-model="vm.scheduleSettings.ReservationRateIncreaseRate"]'),0);
    SF.click(By.xpath('//select[@ng-class="{\'fadeout\':vm.scheduleSettings.ReservationRateIncreaseRate}"]/option[@value = 20]'));
    SF.click(By.xpath('//section[@ng-controller="ScheduleContorller as vm"]'));
    SF.sleep(1);
    LF.CreatePackingDayFromBoard(V.client);
    Debug.pause();
    LF.EditRequest_ChangeMoveDate(3);
    MF.EditRequest_SetToNotConfirmed();
    SF.waitForVisible(By.xpath('//div[@data-has-confirm-button="true"]'));
    driver.wait(driver.findElement(By.xpath('//div[@data-has-confirm-button="true"]/h2[contains( text(),' +
        '"Due to less than 72 hours move date rule, the reservation price was increased")]')).then(function(text){
        VD.IWant(VD.ToEqual, text, "Due to less than 72 hours move date rule, the reservation price was increased",'не тот текст в свит-алерте');
    }),config.timeout);
    MF.SweetConfirm();
    V.MaxQuote = {};
    driver.wait(driver.findElement(By.xpath('//div[@ng-hide="request.service_type.raw == 5 || request.service_type.raw == 7 || states.invoiceState"]/div')).then(function(text){
        V.MaxQuote = SF.cleanPrice(text);
    }),config.timeout);
    MF.EditRequest_SetAdressFrom();
    V.ReservationAfterIncreasedSecondRequest = {};
    driver.wait(driver.executeScript('return $("input#reserv_price").val()').then(function(text){
        V.ReservationAfterIncreasedSecondRequest = SF.cleanPrice(text);
        VD.IWant(VD.ToEqual, V.ReservationAfterIncreasedSecondRequest, (V.MaxQuote * 0.2) + V.MaxQuote, 'не совпала сумма резервации после пересчета по настройке');
    }),config.timeout);
    MF.EditRequest_OpenClient();
    LF.SetClientPasswd();
    MF.EditRequest_OpenRequest();
    JS.step(JSstep.selectTruck(4));
    MF.WaitWhileBusy();
    MF.EditRequest_SaveChanges();
    V.boardNumbersAfterIncreasedSecondRequest = {};
    LF.RememberDigitsRequestBoard(V.boardNumbersAfterIncreasedSecondRequest);
    MF.EditRequest_CloseEditRequest();
    LF.Board_LogoutAdmin();

    condition.nowWeDoing = 'Заходим под клиентом, делаем проверку резервации на конфирмейшн пэйдж,оплачиваем резервацию';
    SF.get(V.accountURL);
    LF.LoginToAccountAsClient(V.client);
    MF.Account_OpenRequest(V.boardNumbersAfterIncreasedSecondRequest.Id);
    MF.Account_ClickViewRequest();
    V.accountNumbersAfterIncreasedSecondRequest = {};
    LF.RememberAccountNumbers(V.accountNumbersAfterIncreasedSecondRequest);
    LF.Validation_Compare_Account_Admin(V.accountNumbersAfterIncreasedSecondRequest,V.boardNumbersAfterIncreasedSecondRequest);
    MF.Account_ClickProceedBookYourMove();
    driver.wait(driver.findElement(By.xpath('//div[@ng-class="{\'disabled\':vm.admin}"]/div/h2[contains(text(),"Deposit: ")]')).getText().then(function (text) {
        text = SF.cleanPrice(text);
        VD.IWant(VD.ToEqual, text,(V.MaxQuote * 0.2) + V.MaxQuote  , 'после пересчета по настройкам резервация не совпала на конфирмейшн пэйдж');
    }),config.timeout);
    MF.Account_ClickIAgreeWithAll();
    MF.Account_ClickConfirmReservation();
    LF.MakeSignJS('signatureCanvasReserv');
    SF.click(By.xpath('//button[contains(@ng-click,"saveReservSignature()")]'));
    LF.FillCardPayModal();
    MF.WaitWhileSpinner();
    MF.Account_WaitForGreenTextAfterConfirm();
    LF.LogoutFromAccount();

    condition.nowWeDoing = 'Заходим на мувборд, чекаем наш реквест в табе конферм и проверяем оплату резервации в пэйментах' +
        'далее заходим в настройки SMTP и делаем там проверку на работоспособность подключения';
    SF.get(V.adminURL);
    LF.LoginToBoardAsCustom(V.adminLogin, V.adminPassword);
    MF.Board_OpenConfirmed();
    MF.Board_OpenRequest(V.boardNumbersAfterIncreasedSecondRequest.Id);
    JS.scroll('label[ng-click="OpenPaymentModal();"]');
    SF.click(By.xpath('//label[@ng-click="OpenPaymentModal();"]'));
    SF.sleep(1);
    Debug.pause();
    driver.wait(driver.findElement(By.xpath('//tr[@ng-click="prepareToDelete($index, receipt.id)"]/td[4]')).getText().then(function (text) {
        text = SF.cleanPrice(text);
        VD.IWant(VD.ToEqual, text, 350, 'оплата не совпала с той суммой,которую мы оплатили на конфирмейшн пэйдж');
    }),config.timeout);
    SF.click(By.xpath('//button[@ng-click="cancel()"]'));
    MF.EditRequest_CloseEditRequest();

    condition.nowWeDoing = 'заходим в настройки SMTP';
    MF.Board_OpenSettingsSMTP();
    SF.click(By.xpath('//input[@ng-model="vm.smtpEncryptionSettings.ssl"]'));
    SF.click(By.xpath('//button[@ng-click="vm.updateSMTP()"]'));
    driver.navigate().refresh();
    MF.Board_OpenSettingsSMTP();
    driver.wait(driver.executeScript("if ($('input[ng-model=\"vm.smtpEncryptionSettings.ssl\"]').hasClass('ng-empty')){" +
        "return true;}"),config.timeout);

    SF.endOfTest();
};