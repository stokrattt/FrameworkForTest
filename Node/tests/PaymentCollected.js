module.exports = function main(SF, JS, MF, LF, JSstep, VD, V, By, until,FileDetector, system, condition, config, constants) {
    global.fiber = Fiber.current;
    V.client = {};
    V.client.name = SF.randomBukva(6) + '_t';
    V.client.fam = SF.randomBukva(6) + '_t';
    V.client.phone = SF.randomCifra(10);
    V.client.email = SF.randomBukvaSmall(6) + '@' + SF.randomBukvaSmall(4) + '.tes';
    V.client.passwd = 123;

    //=========================начинаем писать тест=============================

condition.nowWeDoing = 'создаем драфтовый реквест и добавляем в него минусовой екстра сервис, идем в логи проверить что все правильно отправилось и от тотала он отнялся';
    SF.get(V.adminURL);
    LF.LoginToBoardAsCustom(V.adminLogin,V.adminPassword);
    MF.Board_CreateDraftRequest();
    MF.EditRequest_SetAdressToFrom();
    V.boardNumbersBeforeAddMinusExtraServ = {};
    LF.RememberDigitsRequestBoard (V.boardNumbersBeforeAddMinusExtraServ);
    MF.EditRequest_OpenAddServices();
    MF.EditRequest_SetCustiomExtraServices(-150);
    MF.EditRequest_SaveAddServices();
    V.boardNumbersAfterAddMinusExtraServ = {};
    LF.RememberDigitsRequestBoard (V.boardNumbersAfterAddMinusExtraServ);
    VD.IWant(VD.ToEqual, V.boardNumbersAfterAddMinusExtraServ.AdServices, -150, 'не добавлися минусовой екстра сервис');
    VD.IWant(VD.ToEqual, V.boardNumbersAfterAddMinusExtraServ.TotalMin, (V.boardNumbersBeforeAddMinusExtraServ.TotalMin - 150), 'не отнялся минусовой екстра сервис от тотал мин');
    VD.IWant(VD.ToEqual, V.boardNumbersAfterAddMinusExtraServ.TotalMax, (V.boardNumbersBeforeAddMinusExtraServ.TotalMax - 150), 'не отнялся минусовой екстра сервис от тотал max');
    JS.step(JSstep.selectTruck((V.boardNumbersBeforeAddMinusExtraServ.LaborTimeMax + V.boardNumbersBeforeAddMinusExtraServ.TravelTime)/60));
    MF.WaitWhileBusy();
    MF.EditRequest_SetToNotConfirmed();
    MF.EditRequest_OpenClient();
    LF.SendClientInfoForDraftRequest(V.client);
    LF.SetClientPasswd(V.client.passwd);
    MF.EditRequest_OpenRequest();
    MF.EditRequest_SaveChanges();
    MF.EditRequest_OpenLogs();
    V.logNumbers = {};
    MF.EditRequest_ExpandNotConfirmEmail(V.client.email);
    driver.wait(driver.findElement(By.xpath('//h3[contains(text(),"Estimated Quote")]/../../../../../../' +
        'following-sibling::td[1]//div')).getText().then(function(text){
        V.logNumbers.QuoteMin=SF.cleanPrice(text.substring(0,text.indexOf('-')));
        V.logNumbers.QuoteMax=SF.cleanPrice(text.substring(text.indexOf('-')+1));
        VD.IWant(VD.ToEqual, V.logNumbers.QuoteMin, V.boardNumbersAfterAddMinusExtraServ.TotalMin, 'не совпала квота мин в письме нот конферм с реквестом');
        VD.IWant(VD.ToEqual, V.logNumbers.QuoteMax, V.boardNumbersAfterAddMinusExtraServ.TotalMax, 'не совпала квота max в письме нот конферм с реквестом');
    }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//td[contains(text(), "Custom Extra")]/following-sibling::td')).getText().then(function (text) {
        VD.IWant(VD.ToEqual, SF.cleanPrice(text), -150, 'не нашло в емейле минусового екстра сервиса');
    }),config.timeout);
    LF.closeEditRequest();
    MF.Board_LogoutAdmin();

condition.nowWeDoing = 'идем в аккаунт букать работу и проверить что минусовой екстра сервис там отображается и  на конфирмейшине в том числе';
    SF.get(V.accountURL);
    LF.LoginToAccountAsClient(V.client);
    MF.Account_CheckRequestStatus_NotConfirmed(V.boardNumbersBeforeAddMinusExtraServ.Id);
    MF.Account_OpenRequest(V.boardNumbersBeforeAddMinusExtraServ.Id);
    MF.Account_ClickViewRequest();
    V.accountNumbers={};
    LF.RememberAccountNumbers(V.accountNumbers);
    LF.Validation_Compare_Account_Admin(V.accountNumbers, V.boardNumbersAfterAddMinusExtraServ);
    LF.ConfirmRequestInAccount_WithReservation();
    MF.Account_WaitForGreenTextAfterConfirm();
    MF.Account_ClickViewConfirmationPage();
    V.ConfirmationPageAfterConfirm = {};
    driver.wait(driver.findElement(By.xpath('//h2[contains(text(), "Estimated Quote")]/following-sibling::div[1]/div/div')).getText().then(function (text) {
        if (text.indexOf('$', text.indexOf('$') + 3) !== -1) {
            V.ConfirmationPageAfterConfirm.TotalMin = SF.cleanPrice(text.substring(text.indexOf('$'), text.indexOf('-')));
            V.ConfirmationPageAfterConfirm.TotalMax = SF.cleanPrice(text.substring(text.indexOf('$', text.indexOf('$') + 3)));
        } else {
            V.ConfirmationPageAfterConfirm.Total = SF.cleanPrice(text);
        }
        VD.IWant(VD.ToEqual, V.ConfirmationPageAfterConfirm.TotalMin, V.boardNumbersAfterAddMinusExtraServ.TotalMin, 'не совпали TotalMin в конфирмейшн пейдж и борда после резервации');
        VD.IWant(VD.ToEqual, V.ConfirmationPageAfterConfirm.TotalMax, V.boardNumbersAfterAddMinusExtraServ.TotalMax, 'не совпали TotalMax в конфирмейшн пейдж и борда после резервации');
    }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//div[contains(text(),"Custom Extra:")]/following-sibling::div')).getText().then(function(text){
        V.ConfirmationPageAfterConfirm.AdServices = SF.cleanPrice(text.substring(text.indexOf('$')));
        VD.IWant(VD.ToEqual, V.ConfirmationPageAfterConfirm.AdServices, V.boardNumbersAfterAddMinusExtraServ.AdServices, 'не совпали AdServices в конфирмейшн пейдж и борда после резервации');
    }),config.timeout);
    LF.LogoutFromAccount();

condition.nowWeDoing = 'идем в админку проверять разные оплаты для паймент колектед, в  том числе и пендинг и общий тотал';
    SF.get(V.adminURL);
    LF.LoginToBoardAsCustom(V.adminLogin,V.adminPassword);
    MF.Board_OpenSideBar();
    MF.Board_OpenPaymentCollected();
    LF.PaymentCollected_ChooseCurrentDateStartEnd();
    MF.PaymentCollected_ChooseAdvancedFilter('Reservation by customer');
    MF.PaymentCollected_ClickApplyFilters();
    MF.PaymentCollected_SortByDESC();
    driver.wait(driver.findElement(By.xpath('//td[contains(text(), "'+ V.boardNumbersAfterAddMinusExtraServ.Id+'")]/following-sibling::td[3]')).getText().then(function (text) {
        VD.IWant(VD.ToEqual, text, 'Reservation by customer', 'не нашло слово Reservation by customer после оплаты резеервации на аккаунте клиентом');
    }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//td[contains(text(), "'+ V.boardNumbersAfterAddMinusExtraServ.Id+'")]/following-sibling::td[6]')).getText().then(function (text) {
        VD.IWant(VD.ToEqual, SF.cleanPrice(text), 150, 'не нашло сумму в 150 дол Reservation by customer после оплаты резеервации на аккаунте клиентом');
    }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//h2[contains(text(), "Total")]/following-sibling::h2')).getText().then(function (text) {
        V.TotalReceiptInTop = SF.cleanPrice(text);
    }),config.timeout);
    MF.Board_SearchRequest(V.boardNumbersAfterAddMinusExtraServ.Id);
    MF.Board_SearchOpenRequest(V.boardNumbersAfterAddMinusExtraServ);
    V.boardNumbersAfterAddMinusExtraServAfterConfirm = {};
    LF.RememberDigitsRequestBoard(V.boardNumbersAfterAddMinusExtraServAfterConfirm);
    LF.Validation_Compare_Account_Admin(V.accountNumbers, V.boardNumbersAfterAddMinusExtraServAfterConfirm);
    MF.EditRequest_OpenPaymentModalWindow();
    MF.EditRequest_SetPendingReceipt();
    MF.EditRequest_ClosePayment();
    LF.closeEditRequest();
    MF.PaymentCollected_RefreshTable();
    driver.wait(driver.findElement(By.xpath('//h2[contains(text(), "Total")]/following-sibling::h2')).getText().then(function (text) {
        V.TotalReceiptInTopAfterPendingReceipt = SF.cleanPrice(text);
        VD.IWant(VD.ToEqual, V.TotalReceiptInTopAfterPendingReceipt, (V.TotalReceiptInTop - 150), 'не сработала галочка пендинг в паймент колектед');
    }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//td[contains(text(), "'+ V.boardNumbersAfterAddMinusExtraServ.Id+'")]/following-sibling::td[3]')).getText().then(function (text) {
        VD.IWant(VD.ToEqual, text, 'Pending, Reservation by customer', 'не нашло слово Pending, Reservation by customer после галлочки пендинг на резеервацю');
    }),config.timeout);
    MF.PaymentCollected_ChoosePaymentFlag('Pending');
    // SF.click(By.xpath('//md-backdrop[@class="md-select-backdrop md-click-catcher"]'));
    MF.PaymentCollected_ClickApplyFilters();
    driver.wait(driver.findElement(By.xpath('//td[contains(text(), "'+ V.boardNumbersAfterAddMinusExtraServ.Id+'")]/following-sibling::td[3]')).getText().then(function (text) {
        VD.IWant(VD.ToEqual, text, 'Pending, Reservation by customer', 'не нашло слово Pending, Reservation by customer после галлочки пендинг на резеервацю и ' +
            'после выбора фильтров reservation by customer and pending');
    }),config.timeout);

condition.nowWeDoing = 'тут проверяем оплату кастомный онлайн пайментом созданным в конртакт сеттингс';
    MF.Board_SearchRequest(V.boardNumbersAfterAddMinusExtraServ.Id);
    MF.Board_SearchOpenRequest(V.boardNumbersAfterAddMinusExtraServ);
    MF.EditRequest_OpenPaymentModalWindow();
    MF.EditRequest_ClickAddOnlinePayment();
    MF.EditRequest_SetSumOnlinePaymentAndClickPaymentInfo(20);
    MF.EditRequest_PayCustomOnlinePayment('forTestNotDelete');
    MF.EditRequest_ClosePayment();
    LF.closeEditRequest();
    MF.PaymentCollected_RemoveFilters();

    LF.PaymentCollected_ChooseCurrentDateStartEnd();
    MF.PaymentCollected_ChoosePaymentFilter('Custom');
    MF.PaymentCollected_ClickApplyFilters();
    MF.PaymentCollected_SortByDESC();
    driver.wait(driver.findElement(By.xpath('//td[contains(text(), "'+ V.boardNumbersAfterAddMinusExtraServ.Id+'")]/following-sibling::td[3]')).getText().then(function (text) {
        VD.IWant(VD.ToEqual, text, 'Сustom receipt', 'не нашло слово Сustom receipt прии оплате кастомным онлайн пайментом');
    }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//td[contains(text(), "'+ V.boardNumbersAfterAddMinusExtraServ.Id+'")]/following-sibling::td[4]')).getText().then(function (text) {
        VD.IWant(VD.ToEqual, text, 'forTestNotDelete', 'не нашло оплату кастомным онлайн пайментом');
    }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//td[contains(text(), "'+ V.boardNumbersAfterAddMinusExtraServ.Id+'")]/following-sibling::td[6]')).getText().then(function (text) {
        VD.IWant(VD.ToEqual, SF.cleanPrice(text), 20, 'не нашло 20 dol при оплате кастомным онлайн пайментом');
    }),config.timeout);

condition.nowWeDoing = 'тут делаем оплату чеком (онлайн паймент) и прoверяем что он отобразится в паймент колектед';
    MF.Board_SearchRequest(V.boardNumbersAfterAddMinusExtraServ.Id);
    MF.Board_SearchOpenRequest(V.boardNumbersAfterAddMinusExtraServ);
    MF.EditRequest_OpenPaymentModalWindow();
    MF.EditRequest_ClickAddOnlinePayment();
    MF.EditRequest_SetSumOnlinePaymentAndClickPaymentInfo(30);
    MF.EditRequest_PayCheckOnlinePayment();
    MF.EditRequest_ClosePayment();
    LF.closeEditRequest();
    MF.PaymentCollected_ChoosePaymentFilter('Check');
    MF.PaymentCollected_ClickApplyFilters();
    driver.wait(driver.findElement(By.xpath('//td[contains(text(), "'+ V.boardNumbersAfterAddMinusExtraServ.Id+'")]/following-sibling::td[2]')).getText().then(function (text) {
        VD.IWant(VD.ToEqual, text, 'Check', 'не нашло слово Check прии оплате чеком (онлайн паймент)');
    }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//td[contains(text(), "'+ V.boardNumbersAfterAddMinusExtraServ.Id+'")]/following-sibling::td[6]')).getText().then(function (text) {
        VD.IWant(VD.ToEqual, SF.cleanPrice(text), 30, 'не нашло 30 dol при оплате чеком (онлайн паймент)');
    }),config.timeout);

condition.nowWeDoing = 'тут делаем оплату кешем (онлайн паймент) и прoверяем что он отобразится в паймент колектед';
    MF.Board_SearchRequest(V.boardNumbersAfterAddMinusExtraServ.Id);
    MF.Board_SearchOpenRequest(V.boardNumbersAfterAddMinusExtraServ);
    MF.EditRequest_OpenPaymentModalWindow();
    MF.EditRequest_ClickAddOnlinePayment();
    MF.EditRequest_SetSumOnlinePaymentAndClickPaymentInfo(25);
    MF.Contract_PayCash();
    SF.waitForLocated(By.xpath('//button[@ng-click="cancel()"]'));
    SF.click(By.xpath('//button[@ng-click="cancel()"]'));
    MF.EditRequest_ClosePayment();
    LF.closeEditRequest();
    MF.PaymentCollected_ChoosePaymentFilter('Cash');
    MF.PaymentCollected_ClickApplyFilters();
    driver.wait(driver.findElement(By.xpath('//td[contains(text(), "'+ V.boardNumbersAfterAddMinusExtraServ.Id+'")]/following-sibling::td[2]')).getText().then(function (text) {
        VD.IWant(VD.ToEqual, text, 'Cash', 'не нашло слово Cash прии оплате Cash (онлайн паймент)');
    }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//td[contains(text(), "'+ V.boardNumbersAfterAddMinusExtraServ.Id+'")]/following-sibling::td[6]')).getText().then(function (text) {
        VD.IWant(VD.ToEqual, SF.cleanPrice(text), 25, 'не нашло 30 dol при оплате Cash (онлайн паймент)');
    }),config.timeout);

condition.nowWeDoing = 'тут открываем реквест и делаем платеж онлайн пайментом - пендином и проверим что он отобразится в пендинге в паймент колектед';
    MF.Board_SearchRequest(V.boardNumbersAfterAddMinusExtraServ.Id);
    MF.Board_SearchOpenRequest(V.boardNumbersAfterAddMinusExtraServ);
    MF.EditRequest_OpenPaymentModalWindow();
    SF.click(By.xpath('//span[contains(text(), "#forTestNotDelete")]/../following-sibling::td[4]/input[@ng-click="changePending(receipt)"]'));
    MF.EditRequest_ClosePayment();
    LF.closeEditRequest();
    MF.PaymentCollected_ChoosePaymentFilter('Custom');
    MF.PaymentCollected_ChoosePaymentFlag('Pending');
    driver.wait(driver.findElement(By.xpath('//td[contains(text(), "'+ V.boardNumbersAfterAddMinusExtraServ.Id+'")]/following-sibling::td[3]')).getText().then(function (text) {
        VD.IWant(VD.ToEqual, text, 'Сustom receipt, Pending', 'не нашло слово Сustom receipt, Pending после галлочки пендинг на кастомный онлайн паймент forTestNoDelete и ' +
            'после выбора фильтров Сustom and pending');
    }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//td[contains(text(), "'+ V.boardNumbersAfterAddMinusExtraServ.Id+'")]/following-sibling::td[6]')).getText().then(function (text) {
        VD.IWant(VD.ToEqual, SF.cleanPrice(text), 20, 'не нашло 20 dol в  пендинге после галлочки пендинг на кастомный онлайн паймент forTestNoDelete и '  +
            ' после выбора фильтров Сustom and pending');
    }),config.timeout);
    MF.PaymentCollected_RemoveFilters();

condition.nowWeDoing = 'открываем реквест и делаем кастомный платеж кешем и проверим что он отобразится в пендинге в паймент колектед';
    MF.Board_SearchRequest(V.boardNumbersAfterAddMinusExtraServ.Id);
    MF.Board_SearchOpenRequest(V.boardNumbersAfterAddMinusExtraServ);
    MF.EditRequest_OpenPaymentModalWindow();
    MF.EditRequest_ClickAddCustomPayment();
    MF.EditRequest_CustomPayCash(33);
    LF.closeEditRequest();







    //=========================закончили писать тест=============================
    SF.endOfTest();
};
