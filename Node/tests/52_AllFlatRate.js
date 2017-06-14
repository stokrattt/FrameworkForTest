module.exports = function main(SF, JS, MF, LF, JSstep, VD, V, By, until,FileDetector, system, condition, config,constants) {
    global.fiber = Fiber.current;
    V.client = {};
    V.client.name = SF.randomBukva(6) + '_t';
    V.client.fam = SF.randomBukva(6) + '_t';
    V.client.phone = SF.randomCifra(10);
    V.client.email = SF.randomBukvaSmall(6) + '@' + SF.randomBukvaSmall(4) + '.tes';
    V.client.passwd = 123;

    //=========================начинаем писать тест=============================
condition.nowWeDoing = 'создаем флет рейт с верхней фронтовой формы';

    SF.get(V.frontURL);
    LF.FullSmallCalcAsFlateRate (V.client);

condition.nowWeDoing = 'перешли в аккаунт добавляем опции';
    MF.Account_ClickViewRequest();
    let now = new Date();
    let msInDay = 86400000;
    let future = new Date(now.getTime() + msInDay * 2);
    let options = { day: 'numeric', month: 'short', year: 'numeric' };
    V.changedateUp = (future.toLocaleDateString('en-US', options));
    SF.send(By.xpath('//div[contains(@class, "dateRange")]/input'), V.changedateUp);
    now = new Date();
    msInDay = 86400000;
    future = new Date(now.getTime() + msInDay * 3);
    options = { day: 'numeric', month: 'short', year: 'numeric' };
    V.changedateDelivery = (future.toLocaleDateString('en-US', options));
    SF.send(By.xpath('//div[contains(@class, "dateRange delivery")]/input'), V.changedateDelivery);
    SF.click(By.xpath('//div[contains(@class, "ng-pristine")]'));
    SF.select (By.xpath('//select[@ng-model="details.current_door"]'), 30);
    SF.select (By.xpath('//select[@ng-model="details.new_door"]'), 50);
    SF.select (By.xpath('//select[@ng-model="details.current_permit"]'), "PM");
    SF.select (By.xpath('//select[@ng-model="details.new_permit"]'), "PR");
    JS.click('button[ng-click=\\"saveDetails()\\"]:visible');
    MF.WaitWhileBusy ();
    SF.sleep (3);
condition.nowWeDoing = 'добавляем инвенторий в акке';
    LF.AccountFlatRateAddInventory();
    MF.Account_SubmitFlatRateAfterAddInventory ();
    JS.scroll ('a[ng-click=\\"vm.Logout()\\"]');
    driver.wait(driver.findElement(By.xpath('//div[contains(text(),"Request ID")]/span')).getText().then(function (text) {
        V.FRId = SF.cleanPrice(text);
    }),config.timeout);
    SF.sleep(1);
    LF.addToCleanerJob (V.FRId);
    LF.LogoutFromAccount ();
    SF.get(V.adminURL);
condition.nowWeDoing = 'пошли в админку, открыли реквест и заполняем опции';
    LF.LoginToBoardAsCustom(V.adminLogin,V.adminPassword);
    LF.OpenRequestFlatRate (V.FRId);
    SF.clear (By.xpath('//input[@ng-model="option.pickup"]'));
    SF.sleep (0.5);
    now = new Date();
    msInDay = 86400000;
    future = new Date(now.getTime() + msInDay * 2);
    options = { month: 'long', day: 'numeric', year: 'numeric' };
    V.changedateUpAdmin = (future.toLocaleDateString('en-US', options));
    SF.send(By.xpath('//input[@ng-model="option.pickup"]'), V.changedateUpAdmin);
    SF.select (By.xpath('//select[@ng-model="option.picktime1"]'), 3);
    SF.select (By.xpath('//select[@ng-model="option.picktime2"]'), 4);
    SF.sleep (0.5);
    now = new Date();
    msInDay = 86400000;
    future = new Date(now.getTime() + msInDay * 4);
    options = { month: 'long', day: 'numeric', year: 'numeric' };
    V.changedateDelAdmin = (future.toLocaleDateString('en-US', options));
    SF.send(By.xpath('//input[@ng-model="option.delivery"]'), V.changedateDelAdmin);
    SF.select (By.xpath('//select[@ng-model="option.deltime1"]'), 5);
    SF.select (By.xpath('//select[@ng-model="option.deltime2"]'), 6);
    SF.send(By.xpath('//input[@ng-model="option.rate"]'), 5000);
    SF.sleep (0.5);
    SF.click (By.xpath('//a[@ng-click="addOption()"]'));
    SF.sleep (1);
    SF.click(By.xpath('//a[@ng-click="saveOptions()"]'));
    SF.sleep (4);
    MF.WaitWhileBusy ();
    MF.WaitWhileBusy ();

    /**************************иногда выскакивает иногда нет************/

    // MF.SweetConfirm ();
    /*********************************************************************************************/
    MF.EditRequest_OpenClient ();
    LF.SetClientPasswd (V.client.passwd);
    LF.closeEditRequest ();
    MF.Board_LogoutAdmin ();
    SF.get(V.accountURL);
    LF.LoginToAccountAsClient (V.client);
condition.nowWeDoing = 'идем в акк подтвердить выбранную опцию';
    MF.Account_OpenRequest (V.FRId);
    MF.Account_ChooseOptionFlatRate();
    LF.LogoutFromAccount ();
    SF.get(V.adminURL);
    LF.LoginToBoardAsCustom(V.adminLogin,V.adminPassword);

condition.nowWeDoing = 'идем в админку ставить нот конферм, трак....';
    LF.OpenRequest (V.FRId);
    V.boardNumbers = {};
    LF.RememberDigitsRequestBoard (V.boardNumbers);
    SF.sleep (1);
    MF.EditRequest_SetAdressToFrom ();
    SF.click(By.xpath('//div[contains(@class, "dateRange ")]/input'));
    driver.executeScript(JSstep.Click8DaysCalendar);
    SF.sleep (1);
    SF.clear(By.xpath('//input[@ng-model="request.delivery_start_time.value"]'));
    SF.send(By.xpath('//input[@ng-model="request.delivery_start_time.value"]'),  '02:00 AM');
    SF.sleep (1);
    /**************************************************************************************************************/
    JS.step(JSstep.selectTruck((V.boardNumbers.LaborTimeMax + V.boardNumbers.TravelTime)/60));
    SF.sleep (1);
    VD.IWant (VD.VToEqual, 5000, V.boardNumbers.Total, 'тотал не совпал с выбранной суммой' );
    MF.EditRequest_SetToNotConfirmed ();
    SF.sleep (2);
    MF.EditRequest_SaveChanges ();
    MF.EditRequest_OpenSettings ();
    SF.sleep(2);
    SF.click (By.xpath('//button[contains(text(),"Assign sales person")]'));
    SF.click (By.xpath('//div[@ng-show="::PermissionsServices.hasPermission(\'canSignedSales\');"]//ul[@class="dropdown-menu"]/li/a[contains(text(), "JackSales")]'));
    MF.SweetConfirm();
    Debug.pause();
    SF.sleep (5);
    LF.closeEditRequest ();
    MF.Board_LogoutAdmin ();
    SF.get(V.accountURL);
condition.nowWeDoing = 'идем в акк под клиентом букать работу';
    LF.LoginToAccountAsClient (V.client);
    MF.Account_OpenRequest (V.FRId);
    MF.WaitWhileBusy ();
    SF.sleep(2);
    driver.wait(driver.findElement(By.xpath('//div[@ng-if="showQuote"]/div[contains(text(), "Flat Rate")]/following-sibling::div[1]/div/span')).getText().then(function (text) {
        V.quoteFlatRate = SF.cleanPrice (text);
        VD.IWant (VD.VToEqual, V.quoteFlatRate, 5000, 'не нашло цену флет рейт')
    }),config.timeout);
    SF.sleep(1);

    LF.ConfirmRequestInAccount_WithReservation ();

    LF.LogoutFromAccount ();
    SF.get (V.adminURL);
    LF.LoginToBoardAsCustom(V.adminLogin,V.adminPassword);
condition.nowWeDoing = 'идем в админку в диспач';
    MF.Board_OpenLocalDispatch ();
    LF.findDayInLocalDispatch (V.boardNumbers.moveDate.Year, V.boardNumbers.moveDate.Month, V.boardNumbers.moveDate.Day);
    MF.WaitWhileBusy();
    MF.WaitWhileBusy();
    MF.Dispatch_GridView();
    LF.SelectRequestDispatch(V.FRId);
    LF.selectCrewFlatRatePickUp(V.foremanName);
    SF.click(By.xpath('//li[@ng-click="vm.navigation.active = $index"]/a/span[contains(text(), "Delivery crew")]'));
    SF.sleep(2);
    LF.selectCrewFlatRateDelivery();
    MF.Board_LogoutAdmin ();
    LF.LoginToBoardAsCustomForeman(V.foremanLogin, V.foremanPassword);

condition.nowWeDoing = 'заходим под первым фореманом подписывать pick up контракт';
    LF.OpenRequestDispatch(V.FRId);
    MF.Contract_WaitConfirmationPage();
    MF.Contract_OpenBillOfLading ();
    SF.sleep(1);
    LF.MakeSignInContract();
    LF.MakeSignInContract();
    MF.Contract_DeclarationValueA();
    LF.MakeSignInContract();
    MF.Contract_ClickPay();
    MF.Contract_ClickTips10();
    MF.Contract_ClickAddTips();
    MF.Contract_ClickPaymentInfo();
    LF.FillCardPayModal();
    LF.MakeSignJS('signatureCanvasPayment');
    SF.click(By.xpath('//div[@ng-init="payment.canvasInit(\'signatureCanvasPayment\')"]//button[@ng-click="saveSignature()"]'));
    JS.waitForExist('input#inputImage');
    driver.wait(new FileDetector().handleFile(driver, system.path.resolve('./files/squirrel.jpg')).then(function (path) {
        V.path = path;
    }), config.timeout);
    SF.sleep(1);
    MF.Contract_UploadImage(V.path);
    MF.Contract_UploadImage(V.path);
    MF.Contract_SaveImages();
    MF.WaitWhileBusy ();
    LF.MakeSignInContract();
    LF.MakeSignInContract();
    MF.WaitWhileBusy ();
    SF.click (By.xpath('//button[@ng-click="submitContractBtn({pickup: true, isBtn: true })"]'));
    MF.SweetConfirm ();
    MF.Contract_ReturnToForeman();
    LF.LogoutFromBoardForeman ();

condition.nowWeDoing = 'заходим под вторым фореманом подписывать delivery контракт';
    LF.LoginToBoardAsForemanDeliveryFlatRate();
    LF.OpenRequestDispatch(V.FRId);
    MF.Contract_WaitConfirmationPage();
    MF.Contract_OpenBillOfLading ();
    SF.sleep(1);
    MF.Contract_ClickPay();
    MF.Contract_ClickTips10();
    MF.Contract_ClickAddTips();
    MF.Contract_ClickPaymentInfo();
    LF.FillCardPayModal();
    LF.MakeSignJS('signatureCanvasPayment');
    SF.click(By.xpath('//div[@ng-init="payment.canvasInit(\'signatureCanvasPayment\')"]//button[@ng-click="saveSignature()"]'));
    JS.waitForExist('input#inputImage');
    SF.sleep(1);
    MF.Contract_UploadImage(V.path);
    MF.Contract_UploadImage(V.path);
    MF.Contract_SaveImages();
    MF.WaitWhileBusy ();
    LF.MakeSignInContract();
    LF.MakeSignInContract();
    MF.WaitWhileBusy ();
    SF.click (By.xpath('//button[@ng-click="submitContractBtn({delivery: true, isBtn: true })"]'));
    MF.WaitWhileBusy ();
    MF.SweetConfirm ();
    MF.Contract_ReturnToForeman();
    LF.LogoutFromBoardForeman ();

condition.nowWeDoing = 'возвращаемся в диспач, проверяем что баланс 0, проверяем пейролл';
    LF.LoginToBoardAsCustom(V.adminLogin,V.adminPassword);
    MF.Board_OpenLocalDispatch();
    LF.findDayInLocalDispatch(V.boardNumbers.moveDate.Year, V.boardNumbers.moveDate.Month, V.boardNumbers.moveDate.Day);
    MF.WaitWhileBusy();
    MF.WaitWhileBusy();
    MF.Dispatch_GridView();
    MF.Dispatch_ShowDoneJobs();
    LF.OpenRequestDispatch(V.FRId);
    MF.EditRequest_WaitForBalanceVisible();
    LF.RememberDigitsRequestBoard_Down(V.boardNumbers);
    MF.EditRequest_ScrollDown();
    VD.IWant(VD.VToEqual, V.boardNumbers.Balance, 0, 'Баланс после закрытия не равен 0');
    V.boardNumbersPickup = {};
    LF.RememberDigitsRequestBoard_Down(V.boardNumbersPickup);
    MF.EditRequest_OpenPayrollPickupFlatRate ();
    LF.RememberAndValidatePayroll_In_EditRequestFlatRatePickup(V.boardNumbersPickup);
    SF.sleep (2);
    MF.EditRequest_CloseModal();
    V.boardNumbersDelivery = {};
    LF.RememberDigitsRequestBoard_Down(V.boardNumbersDelivery);
    MF.EditRequest_OpenPayrollDeliveryFlatRate();
    LF.RememberAndValidatePayroll_In_EditRequestFlatRateDelivery(V.boardNumbersDelivery);
    SF.sleep (2);
    MF.EditRequest_CloseModal();
    LF.closeEditRequest();

condition.nowWeDoing = 'сейчас идём в пейролл и проверяем работy';
    MF.Board_OpenPayroll();
    LF.selectDateInPayroll(V.boardNumbers.moveDate);
    LF.findTestForemanInPayroll(V.foremanName);
    V.payrollNumbersPickup = {
        Foreman:{}, Sale:{}, Helper:{}
    };
    driver.wait(driver.executeScript(JSstep.Payroll_GetForemanTotalForRequest(V.FRId)).then(function (text) {
        V.payrollNumbersPickup.Foreman.Total = SF.cleanPrice(text);
        VD.IWant(VD.VToEqual, V.payrollNumbersPickup.Foreman.Total, V.boardNumbersPickup.Payroll.foremanForCommission.total, 'не совпали цифры Pickup в Payroll foreman\n' +
            'id=' + V.FRId);
    }), config.timeout);
    SF.sleep(1);

    condition.nowWeDoing = 'выбираем цифры helper pickup';
    MF.Payroll_ClickAllDepartment();
    MF.WaitWhileBusy();
    LF.findHelperInPayroll('Test Helper1');
    driver.wait(driver.executeScript(JSstep.Payroll_GetSaleTotalForRequest(V.FRId)).then(function (text) {
        V.payrollNumbersPickup.Helper.Total = SF.cleanPrice(text);
    }), config.timeout);
    SF.sleep(1);
    VD.IWant(VD.VToEqual, V.payrollNumbersPickup.Helper.Total, V.boardNumbersPickup.Payroll.helpersForComission.total, 'не совпали цифры в Payroll pickup helper\n' +
        'id=' + V.FRId);
    SF.sleep(1);
    MF.Payroll_ClickAllDepartment();
    MF.WaitWhileBusy();

condition.nowWeDoing = 'проверяем цифры менеджера pickup';
    LF.findSaleInPayroll('JackSales do not delete');
    driver.wait(driver.executeScript(JSstep.Payroll_GetSaleTotalForRequest(V.FRId)).then(function (text) {
        V.payrollNumbersPickup.Sale.Total = SF.cleanPrice(text);
    }), config.timeout);
    SF.sleep(1);
    VD.IWant(VD.VToEqual, V.payrollNumbersPickup.Sale.Total, V.boardNumbersPickup.Payroll.managerForCommission.total, 'не совпали цифры в Payroll pickup manager\n' +
        'id=' + V.FRId);
    SF.sleep(2);

condition.nowWeDoing = 'начинаем проверять чувачком из delivery';
    MF.Payroll_ClickAllDepartment();
    MF.WaitWhileBusy ();
    LF.Payroll_SelectPeriod20Days();
    MF.WaitWhileBusy ();
    LF.findFlatRateDeliveryForemanInPayroll ();
    V.payrollNumbersDelivery = {
        Foreman:{}, Sale:{}, Helper:{}
    };
    driver.wait(driver.executeScript(JSstep.Payroll_GetForemanTotalForRequest(V.FRId)).then(function (text) {
        V.payrollNumbersDelivery.Foreman.Total = SF.cleanPrice(text);
        VD.IWant(VD.VToEqual, V.payrollNumbersDelivery.Foreman.Total, V.boardNumbersDelivery.Payroll.foremanForCommission.total, 'не совпали цифры delivery в Payroll foreman\n' +
            'id=' + V.FRId);
    }), config.timeout);
    SF.sleep(1);

condition.nowWeDoing = 'выбираем цифры helper delivery';
    MF.Payroll_ClickAllDepartment();
    MF.WaitWhileBusy();
    LF.findHelperInPayroll('Test Helper1');
    driver.wait(driver.executeScript(JSstep.Payroll_GetSaleTotalForRequest(V.FRId)).then(function (text) {
        V.payrollNumbersDelivery.Helper.Total = SF.cleanPrice(text);
    }), config.timeout);
    SF.sleep(1);

    VD.IWant(VD.VToEqual, V.payrollNumbersDelivery.Helper.Total, V.boardNumbersDelivery.Payroll.helpersForComission.total, 'не совпали цифры в Payroll helper\n' +
        'id=' + V.FRId);
    SF.sleep(1);


    //=========================закончили писать тест=============================
    SF.endOfTest();
};
