function main() {
    global.fiber = Fiber.current;
    V.client={};
    V.client.name = SFrandomBukva(6)+'_t';
    V.client.fam = SFrandomBukva(6)+'_t';
    V.client.phone = SFrandomCifra(10);
    V.client.email = SFrandomBukvaSmall(6)+'@'+SFrandomBukvaSmall(4)+'.tes';
    var URL = 'http://stage.themoveboard.com/';
    var accountURL = 'http://stage.themoveboard.com/account/#/login';
    var adminURL = 'http://stage.themoveboard.com/moveBoard/#/login';
    SFget(URL);

    FullSmallCalcAsLocal(V.client);
    console.log("заполнили форму");

    SFclick(By.xpath('//button[@ng-click="cancel()"][contains(text(),"View request")]'));
    SFsleep(2);
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
    SFclick(By.xpath('//button[contains(text(),"Set Sales")]'));
    SFclick(By.xpath('//a[@ng-click="setManager(manager.uid)"][contains(text(),"SaleNode")]'));
    SFsleep(1);
    SFclick(By.xpath('//button[@class="confirm"][contains(text(),"Confirm")]'));
    SFsleep(1);
    SFclick(By.xpath('//a[@ng-click="select(tabs[4])"]'));
    SFsend(By.xpath('//input[@ng-model="client.password"]'),123);
    SFclick(By.xpath('//button[@ng-click="update(client)"]'));
    SFsleep(3);
    SFclick(By.xpath('//a[@ng-click="select(tabs[0])"]'));
    SFsleep(1);
    SFselect(By.xpath('//select[@id="edit-status"]'),2);
    SFclick(By.xpath('//button[@ng-click="UpdateRequest()"]'));
    SFclick(By.xpath('//button[@ng-click="update(request)"]'));
    SFsleep(8);

    SFclick(By.xpath('//button[@ng-click="cancel()"]'));
    SFsleep(2);
    LogoutFromBoard();

    endOfTest();
}
//==================================================================================================

module.exports = main;

