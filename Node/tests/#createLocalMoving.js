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
    JSwaitForNotExist('div.busyoverlay:not(.ng-hide)');
    SFsleep(1);
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
    SetManager();
    SFclick(By.xpath('//a[@ng-click="select(tabs[4])"]'));
    SetClientPasswd();
    SFclick(By.xpath('//a[@ng-click="select(tabs[0])"]'));
    SFsleep(1);
    SFselect(By.xpath('//select[@id="edit-status"]'),2);
    SFclick(By.xpath('//button[@ng-click="UpdateRequest()"]'));
    SFclick(By.xpath('//button[@ng-click="update(request)"]'));
    SFsleep(8);
    JSwaitForNotExist('div.toast-success');
    SFclick(By.xpath('//button[@ng-click="cancel()"]'));
    SFsleep(2);
    LogoutFromBoard();

    SFget(accountURL);
    LoginToAccountAsClient();
    SFwaitForVisible(By.xpath('//td[contains(text(),"'+V.accountNumbers.Id+'")]/following-sibling::td[1]'));
    driver.wait(driver.findElement(By.xpath('//td[contains(text(),"'+V.accountNumbers.Id+'")]/following-sibling::td[1]')).getText().then(function(Status){
        IWant(VToEqual,Status,'Not Confirmed');
    }));
    SFclick(By.xpath('//td[contains(text(),"'+V.accountNumbers.Id+'")]/following-sibling::td/button[contains(text(),"View")]'));
    SFsleep(2);
    RememberAccountNumbers();
    Validation_Compare_Account_Admin();

    ConfirmRequestInAccount_WithReservation();

    SFwaitForVisible(By.xpath('//div[contains(text(),"Your move is confirmed and scheduled")]'));
    LogoutFromAccount();

    endOfTest();
}
//==================================================================================================

module.exports = main;

