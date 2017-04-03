function main() {
    global.fiber = Fiber.current;
    V.client = {};
    V.client.name = SFrandomBukva(6) + '_t';
    V.client.fam = SFrandomBukva(6) + '_t';
    V.client.phone = SFrandomCifra(10);
    V.client.email = SFrandomBukvaSmall(6) + '@' + SFrandomBukvaSmall(4) + '.tes';
    V.client.passwd = 123;
    SFget(frontURL);
    nowWeDoing = 'заполняем калькулятор верхний';
    FullSmallCalcAsLocal(V.client);

    console.log("заполнили форму");
    nowWeDoing = 'первый раз в аккаунте';
    SFclick(By.xpath('//button[@ng-click="cancel()"][contains(text(),"View request")]'));
    JSwaitForNotExist('div.busyoverlay:visible');
    SFsleep(5);
    JSwaitForNotExist('div.busyoverlay:visible');
    SFclick(By.xpath('//label[@for="partial"]/input[@ng-model="vm.packing_service"]'));
    AccountLocalEnterAddress();
    AccountLocalAddInventory();
    AccountLocalDetails();
    SFwaitForVisible(By.xpath('//li[@id="tab_Inventory"]//i[@class="icon-check"]'));
    SFwaitForVisible(By.xpath('//li[@id="tab_Details"]//i[@class="icon-check"]'));
    RememberAccountNumbers();

    LogoutFromAccount();
    console.log('закончили с аккаунтом');

    nowWeDoing = 'первый раз в админке';
    SFget(adminURL);
    LoginToBoardAsAdmin();
    OpenRequest(V.accountNumbers.Id);

    SFwaitForVisible(By.xpath('//div[@ng-click="chooseTruck(tid)"]'));
    JSstep(selectTruck);

    RememberDigitsRequestBoard();
    Validation_Compare_Account_Admin();

    SFclick(By.xpath('//a[@ng-click="select(tabs[7])"]'));
    SFsleep(1);
    SetManager('emilia');
    SFclick(By.xpath('//a[@ng-click="select(tabs[4])"]'));
    SetClientPasswd();
    SFclick(By.xpath('//a[@ng-click="select(tabs[0])"]'));
    SFsleep(1);
    SFselect(By.xpath('//select[@id="edit-status"]'), 2);
    SFclick(By.xpath('//button[@ng-click="UpdateRequest()"]'));
    JSwaitForExist('button[ng-click="update(request)"]:visible');
    SFclick(By.xpath('//button[@ng-click="update(request)"]'));
    JSwaitForNotExist("div.busyoverlay:visible");
    closeEditRequest();
    SFsleep(2);
    LogoutFromBoardAdmin();

    nowWeDoing = 'второй раз в аккаунте, конфёрмим';
    SFget(accountURL);
    LoginToAccountAsClient(V.client);
    SFwaitForVisible(By.xpath('//td[contains(text(),"' + V.accountNumbers.Id + '")]/following-sibling::td[1]'));
    driver.wait(driver.findElement(By.xpath('//td[contains(text(),"' + V.accountNumbers.Id + '")]/following-sibling::td[1]')).getText().then(function (Status) {
        IWant(VToEqual, Status, 'Not Confirmed');
    }));
    SFclick(By.xpath('//td[contains(text(),"' + V.accountNumbers.Id + '")]/following-sibling::td/button[contains(text(),"View")]'));
    SFsleep(2);
    JSwaitForNotExist('div.busyoverlay:visible');
    RememberAccountNumbers();
    Validation_Compare_Account_Admin();
    ConfirmRequestInAccount_WithReservation();
    SFwaitForVisible(By.xpath('//div[contains(text(),"Your move is confirmed and scheduled")]'));
    LogoutFromAccount();

    nowWeDoing = 'второй раз в админке, локал диспатч';
    SFget(adminURL);
    LoginToBoardAsAdmin();
    SFclick(By.xpath('//a[@ng-click="vm.goToPage(\'dispatch.local\', \'\')"]'));
    SFwaitForLocated(By.xpath('//a[@class="ui-datepicker-next ui-corner-all"]'));
    findDayInLocalDispatch(V.boardNumbers.moveDate.Year, V.boardNumbers.moveDate.Month, V.boardNumbers.moveDate.Day);
    JSwaitForNotExist('div.busyoverlay:visible');
    SFsleep(1);
    SFclick(By.xpath('//i[contains(@ng-click,"view.grid = true;")]'));
    JSwaitForNotExist('div.busyoverlay:visible');
    SFsleep(1);
    SelectRequestDispatch(V.accountNumbers.Id);
    selectCrew();
    LogoutFromBoardAdmin();

    nowWeDoing = 'заходим под форменом, открываем контракт';
    LoginToBoardAsForeman();
    OpenRequestDispatch(V.accountNumbers.Id);
    JSwaitForExist('h1:contains("Confirmation Page"):visible');
    SFclick(By.xpath('//li[@id="tab_Bill of lading"]'));
    SFsleep(1);
    driver.wait(driver.executeScript(CheckSumsInContract).then(function (costs) {
        IWant(VToEqual, costs.sumPacking, costs.totalPacking, 'Не совпали суммы Packing');
        IWant(VToEqual, costs.sumServices, costs.totalServices, 'Не совпали суммы Services');
    }));
    MakeSignInContract();
    MakeSignInContract();
    SFselect(By.xpath('//select[@ng-model="data.declarationValue.selected"]'), 'a');
    MakeSignInContract();

    MakeSignInContract();
    MakeSignInContract();
    SFclick(By.xpath('//div[@ng-click="applyPayment(paymentButton())"]'));
    SFclick(By.xpath('//div[@ng-click="tipsPercChange(10)"]'));
    SFclick(By.xpath('//div[contains(text(),"ADD TIPS")]/parent::div[@ng-click="tipsSelected()"]'));
    SFclick(By.xpath('//button[@ng-click="goStepTwo();"]'));
    FillCardPayModal();
    JSmakeSign('signatureCanvasPayment');
    SFclick(By.xpath('//div[@ng-init="payment.canvasInit(\'signatureCanvasPayment\')"]//button[@ng-click="saveSignature()"]'));
    JSwaitForExist('input#inputImage');
    driver.wait(new FileDetector().handleFile(driver, path.resolve('./files/squirrel.jpg')).then(function (path) {
        V.path = path;
    }), Dtimeout);
    SFsleep(1);
    console.log(V.path);
    SFsend(By.xpath('//input[@id="inputImage"]'), V.path);
    SFsleep(1);
    SFsend(By.xpath('//input[@id="inputImage"]'), V.path);
    SFsleep(1);
    SFclick(By.xpath('//button[@ng-click="saveFile()"]'));
    JSwaitForNotExist("button[ng-click=\"saveFile()\"]");
    MakeSignInContract();
    MakeSignInContract();
    SFclick(By.xpath('//button[@ng-click="submitContractBtn({ isBtn: true })"]'));
    JSwaitForExist('div.sa-placeholder:visible');
    SFsleep(1);
    SFclick(By.xpath('//button[@class="confirm"]'));
    JSscroll('a:contains("Return to foreman page")');
    JSwaitForNotExist('div.busyoverlay:visible');
    SFsleep(1);
    SFclick(By.xpath('//a[contains(text(),"Return to foreman page")]'));
    JSwaitForExist('li.dropdown.profile:visible');
    LogoutFromBoardForeman();

    nowWeDoing = 'возвращаемся в диспатч, смотрим пейролл';
    LoginToBoardAsAdmin();
    SFclick(By.xpath('//a[@ng-click="vm.goToPage(\'dispatch.local\', \'\')"]'));
    SFwaitForLocated(By.xpath('//a[@class="ui-datepicker-next ui-corner-all"]'));
    findDayInLocalDispatch(V.boardNumbers.moveDate.Year, V.boardNumbers.moveDate.Month, V.boardNumbers.moveDate.Day);
    JSwaitForNotExist('div.busyoverlay:visible');
    SFsleep(1);
    SFclick(By.xpath('//i[contains(@ng-click,"view.grid = true;")]'));
    SFselect(By.xpath('//select[@ng-model="vm.reqFilter.type"]'), 0);
    JSwaitForNotExist('div.busyoverlay:visible');
    SFsleep(1);
    OpenRequestDispatch(V.accountNumbers.Id);
    JSwaitForExist('label:contains("Balance:"):visible');

    RememberDigitsRequestBoard_Down();
    if (V.boardNumbers.Balance !== 0) {
        JSscroll('div.BalanceCost:visible');
    }
    IWant(VToEqual, V.boardNumbers.Balance, 0, 'Баланс после закрытия не равен 0');
    SFclick(By.xpath('//div[@ng-click="openSalaryCommisionModal();"]'));
    SFwaitForVisible(By.xpath('//button[@ng-click="reSubmitPayroll()"]'));
    JSwaitForNotExist('div.busyoverlay:visible');

    RememberAndValidatePayroll_In_EditRequest();

    nowWeDoing = 'сейчас идём в пейролл';
    SFclick(By.xpath('//button[@ng-click="cancel()"][contains(text(),"Close")]'));
    SFsleep(2);
    closeEditRequest();
    SFclick(By.xpath("//button[@ng-click=\"toggleLeft()\"]"));
    SFclick(By.xpath("//a[@ng-click=\"vm.goToPage('dispatch.local', '')\"]"));
    SFsleep(1);
    SFclick(By.xpath("//a[@ui-sref=\"dispatch.payroll\"]"));
    SFsleep(1);
    JSwaitForNotExist('div.busyoverlay:visible');
    findTestForemanInPayroll();
    selectDateInPayroll(V.boardNumbers.moveDate);

    nowWeDoing = 'выбираем цифры формена';
    V.payrollNumbers = {
        Foreman:{}, Sale:{}
    };
    driver.wait(driver.executeScript('return $("tr:has(td[ng-click=\\\"editRequest(\'a_job_misc\', id, \'request\')\\\"]:contains(\'' +
        V.accountNumbers.Id + '\'))' +
        ' td[ng-click=\\\"editRequest(\'total\', id, \'request\')\\\"]").text()').then(function (text) {
        V.payrollNumbers.Foreman.Total = SFcleanPrice(text);
        IWant(VToEqual, V.payrollNumbers.Foreman.Total, V.boardNumbers.Payroll.foremanForCommission.total, 'не совпали цифры в Payroll foreman\n' +
            'id=' + V.accountNumbers.Id);
    }), Dtimeout);
    SFsleep(1);

    SFclick(By.xpath('//a[@ng-click="dTable=\'departments\';employee=\'\'"]'));
    SFsleep(1);
    JSwaitForNotExist('div.busyoverlay:visible');

    nowWeDoing = 'выбираем цифры менеджера';
    findSaleInPayroll('emilia clark');
    driver.wait(driver.executeScript('return $("tr:has(td[ng-click=\\\"editRequest(\'a_job_misc\', id, \'request\')\\\"]:contains(\'' +
        V.accountNumbers.Id + '\'))' +
    ' td[ng-click=\\\"editRequest(\'total\', id, \'request\')\\\"]").text()').then(function (text) {
        V.payrollNumbers.Sale.Total = SFcleanPrice(text);
    }), Dtimeout);
    SFsleep(1);

    IWant(VToEqual, V.payrollNumbers.Sale.Total, V.boardNumbers.Payroll.managerForCommission.total, 'не совпали цифры в Payroll manager\n' +
        'id=' + V.accountNumbers.Id);


    endOfTest();
}
//==================================================================================================

module.exports = main;

