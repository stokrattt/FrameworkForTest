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
    Debug.pause();
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
    V.boardNumbers.Payroll = {
        managerForCommission:{},
        foremanForCommission:{},
        helpersForComission:[]
    };
    driver.wait(driver.executeScript('return $(\'input[ng-model="sale.for_commission "]\').val()').then(function (text) {
        V.boardNumbers.Payroll.managerForCommission.office = SFcleanPrice(text);
        IWant(VToEqual, Math.floor(V.boardNumbers.Payroll.managerForCommission.office),
            Math.floor(V.boardNumbers.Total
                - V.boardNumbers.AdServices - V.boardNumbers.Packing - V.boardNumbers.Fuel - V.boardNumbers.Valuation),
            'Не совпал ForCommission менеджера');
    }));
    driver.findElement(By.xpath('//label[@ng-init="calcEmployeesTotal()"]')).getText().then(function(text){
        V.boardNumbers.Payroll.managerForCommission.total=SFcleanPrice(text);
    });
    SFclick(By.xpath('//li[@heading="Foremen"]/a'));
    SFsleep(1);
    driver.wait(driver.executeScript('return ' +
        '$(\'tr:has(td>select>option[selected="selected"]:contains("Tips"))>td>input[ng-model="foreman.for_commission"]\').val()'
    ).then(function (text) {
        V.boardNumbers.Payroll.foremanForCommission.Tips = SFcleanPrice(text);
        IWant(VToEqual, Math.floor(V.boardNumbers.Payroll.foremanForCommission.Tips),
            Math.floor(V.boardNumbers.Tips),
            'Не совпал Tips формена');
    }));
    driver.wait(driver.executeScript('return ' +
        '$(\'tr:has(td>select>option[selected="selected"]:contains("Extras Commission"))>td>input[ng-model="foreman.for_commission"]\').val()'
    ).then(function (text) {
        V.boardNumbers.Payroll.foremanForCommission.AdServices = SFcleanPrice(text);
        IWant(VToEqual, Math.floor(V.boardNumbers.Payroll.foremanForCommission.AdServices),
            Math.floor(V.boardNumbers.AdServices),
            'Не совпал Extras формена');
    }));
    driver.wait(driver.executeScript('return ' +
        '$(\'tr:has(td>select>option[selected="selected"]:contains("Packing Commission"))>td>input[ng-model="foreman.for_commission"]\').val()'
    ).then(function (text) {
        V.boardNumbers.Payroll.foremanForCommission.Packing = SFcleanPrice(text);
        IWant(VToEqual, Math.floor(V.boardNumbers.Payroll.foremanForCommission.Packing),
            Math.floor(V.boardNumbers.Packing),
            'Не совпал Extras формена');
    }));
    driver.findElement(By.xpath('//label[@ng-init="calcEmployeesTotal()"]')).getText().then(function(text){
        V.boardNumbers.Payroll.foremanForCommission.total=SFcleanPrice(text);
    });


    endOfTest();
}
//==================================================================================================

module.exports = main;

