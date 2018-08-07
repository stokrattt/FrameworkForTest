module.exports = function main(SF, JS, MF, LF, JSstep, VD, V, By, until,FileDetector, system, condition, config,constants){
    global.fiber = Fiber.current;
    V.client = {};
    V.client.name = SF.randomBukva(6) + '_t';
    V.client.fam = SF.randomBukva(6) + '_t';
    V.client.phone = SF.randomCifra(10);
    V.client.email = SF.randomBukvaSmall(6) + '@' + SF.randomBukvaSmall(4) + '.tes';
    V.client.passwd = "123";
    V.Question = SF.randomBukva(10);
    V.Answer = SF.randomBukva(30);
    V.managername = "manager";
    V.managerpasswd = "123";


    SF.get(V.adminURL);
condition.nowWeDoing = 'идем в настроики FAQ, добавляем вопрос и заходим в Miscellaneous, что бы установить настройки для' +
    'повышения тарифов на резервацию';

    LF.LoginToBoardAsCustom(V.managername,V.managerpasswd);
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
    // здесь идем в настройки и ставим Increase и условия,"через 48 часов до мувдейта резервация работы
    // увеличится на 200 долларов по фиксированному тарифу "
    SF.click(By.xpath('//li[@ng-show="vm.PermissionsServices.hasPermission(\'canSeeSettingsMenu\');"]//span[contains(text(), \"Miscellaneous\")]'));
    SF.sleep(1);
    MF.Board_MiscellaneousChangeReservationRateIncrease48Hour();
    MF.Board_ChangeReservationRateIncreaseFixPrice(200);
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
    LF.LoginToBoardAsCustom(V.managername,V.managerpasswd);
    MF.Board_OpenRequest(V.accountNumbers.Id);
    LF.EditRequest_ChangeMoveDate(2);
    MF.EditRequest_SetAdressToFrom();
    MF.EditRequest_SetToNotConfirmed();
    SF.waitForVisible(By.xpath('//div[@data-has-confirm-button="true"]'));
    driver.wait(driver.findElement(By.xpath('//div[@data-has-confirm-button="true"]/h2')).getText().then(function(text){
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
    LF.SetClientPasswd(V.client.passwd);
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
    SF.sleep(5); //пропадает тостер
    condition.nowWeDoing = 'Заходим под клиентом, делаем проверку резервации на конфирмейшн пэйдж,оплачиваем резервацию';
    MF.Board_LogoutAdmin();
    SF.get(V.accountURL);
    LF.LoginToAccountAsClient(V.client);
    MF.Account_OpenRequest(V.boardNumbers.Id);
    V.accountNumbersAfterIncreased = {};
    LF.RememberAccountNumbers(V.accountNumbersAfterIncreased);
    LF.Validation_Compare_Account_Admin(V.accountNumbersAfterIncreased,V.boardNumbers);
    MF.Account_ClickProceedBookYourMove();
    driver.wait(driver.findElement(By.xpath('//div[@ng-class="{\'disabled\':vm.admin}"]/div/h2[contains(text(),"Deposit: ")]')).getText().then(function (text) {
        text = SF.cleanPrice(text);
        VD.IWant(VD.ToEqual, text, 150 + 200 , 'после пересчета по настройкам резервация не совпала на конфирмейшн пэйдж');
    }),config.timeout);
    MF.Account_ClickIAgreeWithAll();
    MF.Account_ConfirmationClickPayDeposit();
    LF.MakeSignJS('signatureCanvasReserv');
    SF.click(By.xpath('//button[contains(@ng-click,"saveReservSignature()")]'));
    LF.FillCardPayModal();
    MF.WaitWhileSpinner();
    MF.Account_WaitForGreenTextAfterConfirm();
    LF.LogoutFromAccount();

    condition.nowWeDoing = 'Заходим на мувборд, чекаем наш реквест в табе конферм и проверяем оплату резервации в пэйментах' +
        'далее заходим в настройки и меняем время и ставим процент от квоты.создаем новый реквест';
    SF.get(V.adminURL);
    LF.LoginToBoardAsCustom(V.managername, V.managerpasswd);
    MF.Board_OpenConfirmed();
    MF.Board_OpenRequest(V.boardNumbers.Id);
    MF.EditRequest_OpenPayment();
    driver.wait(driver.findElement(By.xpath('//tr[@ng-click="prepareToDelete($index, receipt.id)"]/td[4]')).getText().then(function (text) {
        text = SF.cleanPrice(text);
        VD.IWant(VD.ToEqual, text, 350, 'оплата не совпала с той суммой,которую мы оплатили на конфирмейшн пэйдж');
    }),config.timeout);
    SF.click(By.xpath('//button[@ng-click="cancel()"]'));
    SF.sleep(1);
    MF.EditRequest_CloseEditRequest();
    MF.Board_OpenMiscellaneous();
    MF.Board_MiscellaneousChangeReservationRateIncrease72Hour();
    MF.Board_ChangeReservationRateIncreaseFixPrice(0);
    MF.Board_ChangeReservationRateIncreasePercentMaxQoute(20);
    SF.click(By.xpath('//section[@ng-controller="ScheduleContorller as vm"]'));
    SF.sleep(1);
    driver.navigate().refresh();
    LF.CreateLocalMovingFromBoard(V.client);
    LF.EditRequest_ChangeMoveDate(3);
    MF.EditRequest_SetToNotConfirmed();
    SF.waitForVisible(By.xpath('//div[@data-has-confirm-button="true"]'));
    driver.wait(driver.findElement(By.xpath('//div[@data-has-confirm-button="true"]/h2')).getText().then(function(text){
        VD.IWant(VD.ToEqual, text, "Due to less than 72 hours move date rule, the reservation price was increased",'не тот текст в свит-алерте');
    }),config.timeout);
    MF.SweetConfirm();
    MF.EditRequest_SetAdressToFrom();
    MF.EditRequest_OpenClient();
    LF.SetClientPasswd(V.client.passwd);
    MF.EditRequest_OpenRequest();
    JS.step(JSstep.selectTruck(4));
    MF.WaitWhileBusy();
    MF.EditRequest_SetSizeOfMoveNumber(5);
    MF.EditRequest_SaveChanges();
    V.boardNumbersAfterIncreasedSecondRequest = {};
    LF.RememberDigitsRequestBoard(V.boardNumbersAfterIncreasedSecondRequest);
    V.ReservationAfterIncreasedSecondRequest = {};
    driver.wait(driver.executeScript('return $("input#reserv_price").val()').then(function(text){
        V.ReservationAfterIncreasedSecondRequest = SF.cleanPrice(text);
        V.ReservationCalculations = Math.round(V.boardNumbersAfterIncreasedSecondRequest.QuoteMax * 0.2)+ 150;
        VD.IWant(VD.ToEqual, V.ReservationAfterIncreasedSecondRequest, V.ReservationCalculations , 'не совпала сумма резервации после пересчета по настройке');
    }),config.timeout);
    MF.EditRequest_CloseEditRequest();
    MF.Board_LogoutAdmin();

    condition.nowWeDoing = 'Заходим под клиентом, делаем проверку резервации на конфирмейшн пэйдж,оплачиваем резервацию';
    SF.get(V.accountURL);
    LF.LoginToAccountAsClient(V.client);
    MF.Account_OpenRequest(V.boardNumbersAfterIncreasedSecondRequest.Id);
    V.accountNumbersSecondRequest = {};
    LF.RememberAccountNumbers(V.accountNumbersSecondRequest);
    LF.Validation_Compare_Account_Admin(V.accountNumbersSecondRequest,V.boardNumbersAfterIncreasedSecondRequest);
    MF.Account_ClickProceedBookYourMove();
    driver.wait(driver.findElement(By.xpath('//div[@ng-class="{\'disabled\':vm.admin}"]/div/h2[contains(text(),"Deposit: ")]')).getText().then(function (text) {
        text = SF.cleanPrice(text);
        VD.IWant(VD.ToEqual, text,V.ReservationCalculations, 'после пересчета по настройкам резервация не совпала на конфирмейшн пэйдж');
    }),config.timeout);
    MF.Account_ClickIAgreeWithAll();
    MF.Account_ConfirmationClickPayDeposit();
    LF.MakeSignJS('signatureCanvasReserv');
    SF.click(By.xpath('//button[contains(@ng-click,"saveReservSignature()")]'));
    LF.FillCardPayModal();
    MF.WaitWhileSpinner();
    MF.Account_WaitForGreenTextAfterConfirm();
    LF.LogoutFromAccount();

    condition.nowWeDoing = 'Заходим на мувборд, чекаем наш реквест в табе конферм и проверяем оплату резервации в пэйментах' +
        'далее заходим в настройки SMTP и делаем там проверку на работоспособность подключения';
    SF.get(V.adminURL);
    LF.LoginToBoardAsCustom(V.managername, V.managerpasswd);
    MF.Board_OpenConfirmed();
    MF.Board_OpenRequest(V.boardNumbersAfterIncreasedSecondRequest.Id);
    JS.scroll('label[ng-click="OpenPaymentModal();"]');
    SF.click(By.xpath('//label[@ng-click="OpenPaymentModal();"]'));
    SF.waitForVisible(By.xpath('//tr[@ng-dblclick="showReceipt(receipt.id)"]'));
    driver.wait(driver.findElement(By.xpath('//tr[@ng-click="prepareToDelete($index, receipt.id)"]/td[4]')).getText().then(function (text) {
        text = SF.cleanPrice(text);
        VD.IWant(VD.ToEqual, text, V.ReservationCalculations, 'оплата не совпала с той суммой,которую мы оплатили на конфирмейшн пэйдж');
    }),config.timeout);
    SF.click(By.xpath('//button[@ng-click="cancel()"]'));
    SF.sleep(1);
    MF.EditRequest_CloseEditRequest();

    //condition.nowWeDoing = 'заходим в настройки SMTP';
    //MF.Board_OpenSettingsSMTP();
    //SF.click(By.xpath('//input[@checkstyle="green"]'));
    //JS.click('input[ng-model="vm.smtpEncryptionSettings.ssl"]');
    //SF.click(By.xpath('//button[@ng-click="vm.updateSMTP()"]'));
    //SF.sleep(0.5);
    //driver.navigate().refresh();
    //SF.click(By.xpath('(//li[@ng-repeat="tab in vm.tabs"]/a[@ng-click="vm.select(tab)"])[16]'));
    //driver.findElement(By.xpath('//input[@ng-model="vm.smtpEncryptionSettings.tls"]')).isSelected()
        //.then(function(result) {
          //  if (result == true) {
            //    driver.return('true');
            //} else {
              //  console.log('ошибка!');
            //}
        //});
    //driver.wait(driver.executeScript("if ($('input[ng-model=\"vm.smtpEncryptionSettings.tls\"]').hasClass('ng-empty')){" +
      //  "return true;}else{}"),config.timeout);



    SF.endOfTest();
};