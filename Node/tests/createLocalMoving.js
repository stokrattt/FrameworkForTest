function main() {
    global.fiber = Fiber.current;
    V.client={};
    V.client.name = SFrandomBukva(6)+'_t';
    V.client.fam = SFrandomBukva(6)+'_t';
    V.client.phone = SFrandomCifra(10);
    V.client.email = SFrandomBukvaSmall(6)+'@'+SFrandomBukvaSmall(4)+'.tes';
    SFget(frontURL);

    FullSmallCalcAsLocal(V.client);
    console.log("заполнили форму");

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
    SFselect(By.xpath('//select[@id="edit-status"]'),2);
    SFclick(By.xpath('//button[@ng-click="UpdateRequest()"]'));
    SFclick(By.xpath('//button[@ng-click="update(request)"]'));
    SFsleep(8);
    closeEditRequest();
    SFsleep(2);
    LogoutFromBoardAdmin();

    SFget(accountURL);
    LoginToAccountAsClient();
    SFwaitForVisible(By.xpath('//td[contains(text(),"'+V.accountNumbers.Id+'")]/following-sibling::td[1]'));
    driver.wait(driver.findElement(By.xpath('//td[contains(text(),"'+V.accountNumbers.Id+'")]/following-sibling::td[1]')).getText().then(function(Status){
        IWant(VToEqual,Status,'Not Confirmed');
    }));
    SFclick(By.xpath('//td[contains(text(),"'+V.accountNumbers.Id+'")]/following-sibling::td/button[contains(text(),"View")]'));
    SFsleep(2);
    JSwaitForNotExist('div.busyoverlay:visible');
    RememberAccountNumbers();
    Validation_Compare_Account_Admin();
    ConfirmRequestInAccount_WithReservation();
    SFwaitForVisible(By.xpath('//div[contains(text(),"Your move is confirmed and scheduled")]'));
    LogoutFromAccount();

    SFget(adminURL);
    LoginToBoardAsAdmin();
    SFclick(By.xpath('//a[@ng-click="vm.goToPage(\'dispatch.local\', \'\')"]'));
    SFwaitForLocated(By.xpath('//a[@class="ui-datepicker-next ui-corner-all"]'));
    JSstep(findDayInLocalDispatch(V.boardNumbers.moveDate.Year,V.boardNumbers.moveDate.Month,V.boardNumbers.moveDate.Day));
    JSwaitForNotExist('div.busyoverlay:visible');
    SFclick(By.xpath('//i[contains(@ng-click,"view.grid = true;")]'));
    SelectRequestDispatch(V.accountNumbers.Id);
    selectCrew();
    LogoutFromBoardAdmin();

    LoginToBoardAsForeman();
    OpenRequestDispatch(V.accountNumbers.Id);
    JSwaitForExist('h1:contains("Confirmation Page"):visible');
    SFclick(By.xpath('//li[@id="tab_Bill of lading"]'));
    SFsleep(1);
    MakeSignInContract();
    MakeSignInContract();
    SFselect(By.xpath('//select[@ng-model="data.declarationValue.selected"]'),'a');
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

    new FileDetector().handleFile(driver,path.resolve ('./files/squirrel.jpg')).then(function(path){
        console.log(path);
        driver.findElement(By.xpath('//input[@id="inputImage"]').sendKeys(path);
    });
    new FileDetector().handleFile(driver,path.resolve ('./files/squirrel.jpg')).then(function(path){
        console.log(path);
        driver.findElement(By.xpath('//input[@id="inputImage"]').sendKeys(path);
    });
    SFclick(By.xpath('//button[@ng-click="saveFile()"]'));
    JSwaitForExist('div.signature-box.error:visible');
    MakeSignInContract();
    MakeSignInContract();
    SFclick(By.xpath('//button[@ng-click="submitContractBtn({ isBtn: true })"]'));
    JSwaitForExist('div.sa-placeholder:visible');
    SFsleep(1);
    SFclick(By.xpath('//button[@class="confirm"]'));
    JSscroll('a:contains("Return to foreman page")');
    SFclick(By.xpath('//a[contains(text(),"Return to foreman page")]'));
    JSwaitForExist('li.dropdown.profile:visible');
    LogoutFromBoardForeman();

    endOfTest();
}
//==================================================================================================

module.exports = main;

