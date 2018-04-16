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

condition.nowWeDoing = 'создаем локал мув и добавляем кастомный комершиал мувсайз';
    LF.CreateLocalMovingFromBoard (V.client);
    MF.EditRequest_SetSizeOfMoveNumber (11);
    LF.EditRequest_AddCustomCommersialMove('TestComercial', 1000);

condition.nowWeDoing = 'проверяем что сервис тип стал тоже комершиалом, также проверяем что кубик фит стал тем какой мы ввели, ' +
    'идем в клиента инфо и добавляем company name и проверяем что вверху отобразился он. Также запоминаем все данные';
    driver.wait(driver.findElement(By.xpath('//span[@ng-if="request.move_size.raw == 11"]')).getText().then(function (text) {
        VD.IWant(VD.ToEqual, text, '- COMMERCIAL MOVE', 'после выбора мувсайза комершиал не сменился сервис тип на комершиал')
    }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//span[contains(text(),"c.f.")]/preceding-sibling::span[1]')).getText().then(function(text){
        VD.IWant(VD.ToEqual, text, '1000', 'после добавления мувсайза комершиал кубик фит не сменился')
    }),config.timeout);
    MF.EditRequest_OpenClient ();
    MF.EditRequest_ClientTabSendCompanyName('CompanyTestName');
    LF.SetClientPasswd(V.client.passwd);
    driver.wait(driver.findElement(By.xpath('//span[@ng-if="request.move_size.raw == 11 && request.field_commercial_company_name.value.length"]')).getText().then(function (text) {
        VD.IWant(VD.ToEqual, text, 'CompanyTestName', 'вверху реквеста не показалось company name');
    }),config.timeout);
    MF.EditRequest_OpenRequest();
    MF.EditRequest_SetAdressToFrom();
    V.boardNumbers = {};
    LF.RememberDigitsRequestBoard(V.boardNumbers);

condition.nowWeDoing = 'ставим трак нот конферм и идем в логи проверять, что есть все нужные письма и что квота клиенту правильная отправилась';
    JS.step(JSstep.selectTruck((V.boardNumbers.LaborTimeMax + V.boardNumbers.TravelTime)/60));
    MF.WaitWhileBusy();
    MF.EditRequest_SetToNotConfirmed();
    MF.EditRequest_SaveChanges();
    V.managerFirstName = 'emilia';
    MF.EditRequest_OpenSettings();
    LF.SetManager(V.managerFirstName);
    MF.EditRequest_OpenLogs();
    MF.EditRequest_Check1EmailExist(V.client.email, "Thank you for submitting a quote.");
    MF.EditRequest_Check1EmailExist(V.client.email, "How To Work With Your New Account.");
    MF.EditRequest_Check1EmailExist(V.client.email, "Request Quote (Pending Status)");
    MF.EditRequest_Check1EmailExist(V.adminEmail, "Request Quote (Pending Status)");
    MF.EditRequest_Check1EmailExist(V.client.email, "Request Local Quote (Not Confirmed Status)");
    SF.click(By.xpath('//span[@ng-bind-html="toTrustedHTML(item.text)"][contains(text(),"Request Local Quote (Not Confirmed Status)")]' +
        '[contains(text(),"'+V.client.email+'")]/../../../following-sibling::div[1]'));
    driver.wait(driver.findElement(By.xpath('//h3[contains(text(),"Estimated Quote")]/../../../../../../' +
        'following-sibling::td[1]//div')).getText().then(function(text){
        V.LogsQuoteMin = SF.cleanPrice(text.substring(text.indexOf('$'), text.indexOf('-')));
        V.LogsQuotelMax = SF.cleanPrice(text.substring(text.indexOf('$', text.indexOf('$') + 3)));
    }),config.timeout);
    SF.sleep(1);
    VD.IWant(VD.ToEqual, V.LogsQuoteMin, V.boardNumbers.TotalMin, 'в письме клиенту  тотал min отправился неверный');
    VD.IWant(VD.ToEqual, V.LogsQuotelMax, V.boardNumbers.TotalMax, 'в письме клиенту  тотал max отправился неверный');
    LF.closeEditRequest();

condition.nowWeDoing = 'переходим на вкладку нот конферм, открываем наш реквест и еще раз сверяем данные которые были до закрытия';
    MF.Board_OpenNotConfirmed();
    MF.Board_RefreshDashboard();
    MF.Board_OpenRequest(V.boardNumbers.Id);
    V.boardNumbersNotConfirm = {};
    LF.RememberDigitsRequestBoard(V.boardNumbersNotConfirm);
    LF.Validation_Compare_Account_Admin (V.boardNumbers, V.boardNumbersNotConfirm);
    driver.wait(driver.findElement(By.xpath('//span[contains(text(),"c.f.")]/preceding-sibling::span[1]')).getText().then(function(text){
        VD.IWant(VD.ToEqual, text, '1000', 'открыл нот конферм работу и смотрим что кубик фит остался 1000')
    }),config.timeout);
    LF.closeEditRequest();
    MF.Board_LogoutAdmin();

condition.nowWeDoing = 'идем в аккаунт букать работу и проверять что есть имя компании, сервис тип равен комершиал, что все числа сходятся' +
    'вес тот же что и на борде';
    SF.get(V.accountURL);
    LF.LoginToAccountAsClient (V.client, V.client.passwd);
    MF.Account_CheckRequestStatus_NotConfirmed(V.boardNumbers.Id);
    MF.Account_OpenRequest(V.boardNumbers.Id);
    MF.Account_ClickViewRequest();
    driver.wait(driver.findElement(By.xpath('//h4[@ng-if="moveSize == 11 && companyName.length"]/strong')).getText().then(function (text) {
        VD.IWant(VD.ToEqual, text, 'CompanyTestName', 'не нашло company name на аккаунте');
    }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//span[@ng-if="vm.request.move_size.raw == 11"]')).getText().then(function (text) {
        VD.IWant(VD.ToEqual, text, '- COMMERCIAL MOVE', 'после выбора мувсайза комершиал не сменился сервис тип на комершиал');
    }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//div[contains(text(),"Move Size")]/following-sibling::div[2]/div')).getText().then(function(text){
        V.accountcbf = SF.cleanPrice(text.substring(text.indexOf('TestComercial ')+13, text.indexOf('c.f.')));
        VD.IWant(VD.ToEqual, V.accountcbf, V.boardNumbers.cbf, 'не совпал кубик фит на акке с бордом');
    }),config.timeout);
    V.accountNumbers = {};
    LF.RememberAccountNumbers(V.accountNumbers);
    LF.Validation_Compare_Account_Admin (V.accountNumbers, V.boardNumbers);
    MF.Account_ClickProceedBookYourMove();

condition.nowWeDoing = 'перешли на конфирмейшн пейдж и сравним данные с бордом и потом букаем работу';
    driver.wait(driver.findElement(By.xpath('//span[@ng-if="vm.request.move_size.raw == 11"]')).getText().then(function (text) {
        VD.IWant(VD.ToEqual, text, '- COMMERCIAL MOVE', 'после выбора мувсайза комершиал не сменился сервис тип на комершиал')
    }),config.timeout);
    V.ConfirmationPage = {};
    driver.wait(driver.findElement(By.xpath('//h2[contains(text(), "Estimated Quote")]/following-sibling::div[1]/div/div')).getText().then(function (text) {
        if (text.indexOf('$', text.indexOf('$') + 3) !== -1) {
            V.ConfirmationPage.TotalMin = SF.cleanPrice(text.substring(text.indexOf('$'), text.indexOf('-')));
            V.ConfirmationPage.TotalMax = SF.cleanPrice(text.substring(text.indexOf('$', text.indexOf('$') + 3)));
        } else {
            V.ConfirmationPage.Total = SF.cleanPrice(text);
        }
    }),config.timeout);
    SF.sleep(1);
    driver.wait(driver.findElement(By.xpath('//h2[contains(text(),"Fuel Surcharge")]/..')).getText().then(function(text){
        V.ConfirmationPage.Fuel = SF.cleanPrice(text.substring(text.indexOf('$')));
    }),config.timeout);
    SF.sleep(1);
    VD.IWant(VD.ToEqual, V.ConfirmationPage.TotalMin, V.boardNumbers.TotalMin, 'не совпали TotalMin в конфирмейшн пейдж и борда до резервации');
    VD.IWant(VD.ToEqual, V.ConfirmationPage.TotalMax, V.boardNumbers.TotalMax, 'не совпали TotalMax в конфирмейшн пейдж и борда до резервации');
    VD.IWant(VD.ToEqual, V.ConfirmationPage.Fuel, V.boardNumbers.Fuel, 'не совпали Fuel в конфирмейшн пейдж и борда до резервации');
    MF.Account_ConfirmationBackToRequest ();
    LF.ConfirmRequestInAccount_WithReservation();
    LF.LogoutFromAccount();

condition.nowWeDoing = 'идем в админку в локал диспач и назначаем команду';
    SF.get(V.adminURL);
    LF.LoginToBoardAsCustom(V.adminLogin,V.adminPassword);
    MF.Board_OpenLocalDispatch();
    LF.findDayInLocalDispatch(V.boardNumbers.moveDate.Year, V.boardNumbers.moveDate.Month, V.boardNumbers.moveDate.Day);
    MF.Dispatch_GridView();
    LF.SelectRequestDispatch(V.boardNumbers.Id);
    V.foremanName = 'Test Foreman';
    LF.selectCrew(V.foremanName);
    MF.Board_LogoutAdmin();

condition.nowWeDoing = 'заходим под форменом, открываем контракт';
    LF.LoginToBoardAsCustomForeman(V.foremanLogin, V.foremanPassword);
    LF.OpenRequestInForemanPage(V.boardNumbers.Id);
    MF.Contract_WaitConfirmationPage();
    MF.Contract_OpenBillOfLading();
    LF.MakeSignInContract();
    LF.MakeSignInContract();
    MF.Contract_DeclarationValueA();
    LF.MakeSignInContract();
    LF.MakeSignInContract();
    LF.MakeSignInContract();
    MF.Contract_ClickPay();
    MF.Contract_ClickTips10();
    MF.Contract_ClickAddTips();
    MF.Contract_ClickPaymentInfo();
    LF.FillCardPayModal();
    LF.Contract_SignMainPayment();
    driver.wait(new FileDetector().handleFile(driver, system.path.resolve('./files/squirrel.jpg')).then(function (path) {
        V.path = path;
    }), config.timeout);
    SF.sleep(1);
    MF.Contract_UploadImage(V.path);
    MF.Contract_UploadImage(V.path);
    MF.Contract_SaveImages();
    LF.MakeSignInContract();
    LF.MakeSignInContract();
    V.contractNumbers = {};
    MF.Contract_Submit(V.contractNumbers);
    MF.Contract_ReturnToForeman();
    LF.LogoutFromBoardForeman();

condition.nowWeDoing = 'возвращаемся в диспатч, смотрим пейролл';
    LF.LoginToBoardAsCustom(V.adminLogin,V.adminPassword);
    MF.Board_OpenLocalDispatch();
    LF.findDayInLocalDispatch(V.boardNumbers.moveDate.Year, V.boardNumbers.moveDate.Month, V.boardNumbers.moveDate.Day);
    MF.Dispatch_GridView();
    MF.Dispatch_ShowDoneJobs();
    LF.OpenRequestDispatch(V.boardNumbers.Id);
    MF.EditRequest_WaitForBalanceVisible();
    LF.RememberDigitsRequestBoard_Down(V.boardNumbers);
    MF.EditRequest_ScrollDown();
    driver.wait(driver.findElement(By.xpath('//span[contains(text(),"c.f.")]/preceding-sibling::span[1]')).getText().then(function(text){
        VD.IWant(VD.ToEqual, text, '1000', 'после подписания контракта в реквесте поменялся кубик фит зачем то')
    }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//input[@ng-model="invoice.rate.value"]')).getAttribute('value').then(function (text) {
        VD.IWant(VD.ToEqual, text, V.boardNumbers.HourlyRate, 'не совпал рейт после подписи контракта в реквесте');
    }),config.timeout);
    VD.IWant(VD.ToEqual, V.boardNumbers.Balance, 0, 'Баланс после закрытия не равен 0');
    MF.EditRequest_OpenPayroll();
    SF.sleep (2);
    LF.RememberAndValidatePayroll_In_EditRequest(V.managerName, V.boardNumbers, V.contractNumbers);
    MF.EditRequest_CloseModal();
    LF.closeEditRequest();

condition.nowWeDoing = 'сейчас идём в пейролл';
    MF.Board_OpenPayroll();
    LF.selectDateInPayroll(V.boardNumbers.moveDate);
    LF.findTestForemanInPayroll(V.foremanName);

condition.nowWeDoing = 'выбираем цифры формена';
    V.payrollNumbers = {
        Foreman:{}, Sale:{}
    };
    MF.Payroll_getTotalById(V.boardNumbers.Id, V.payrollNumbers.Foreman);
    VD.IWant(VD.ToEqual, V.payrollNumbers.Foreman.Total, V.boardNumbers.Payroll.foremanForCommission.total, 'не совпали цифры в Payroll foreman\n' +
        'id=' + V.boardNumbers.Id);
    MF.Payroll_ClickAllDepartment();

condition.nowWeDoing = 'выбираем цифры менеджера';
    LF.findSaleInPayroll(V.managerName);
    MF.Payroll_getTotalById(V.boardNumbers.Id, V.payrollNumbers.Sale);
    VD.IWant(VD.ToEqual, V.payrollNumbers.Sale.Total, V.boardNumbers.Payroll.managerForCommission.total, 'не совпали цифры в Payroll manager\n' +
        'id=' + V.boardNumbers.Id);
    SF.sleep(1);

    //=========================закончили писать тест=============================
    SF.endOfTest();
};
