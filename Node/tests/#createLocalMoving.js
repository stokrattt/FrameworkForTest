function main() {
    V.client={};
    V.client.name = SFrandomBukva(6)+'_t';
    V.client.fam = SFrandomBukva(6)+'_t';
    V.client.phone = SFrandomCifra(10);
    V.client.email = SFrandomBukvaSmall(6)+'@'+SFrandomBukvaSmall(4)+'.tes';
    WDWantToEqual(5,6,'ошибочка');

    global.fiber = Fiber.current;
    var URL = 'http://stage.themoveboard.com/';
    var accountURL = 'http://stage.themoveboard.com/account/#/login';
    var adminURL = 'http://stage.themoveboard.com/moveBoard/#/login';
    SFget(URL);
    FullSmallCalcAsLocal(V.client);
    console.log("заполнили форму");

    WDMustBeEqual(5,6,'ошибища');

    SFclick(By.xpath('//button[@ng-click="cancel()"][contains(text(),"View request")]'));
    SFsleep(2);
    SFclick(By.xpath('//label[@for="partial"]/input[@ng-model="vm.packing_service"]'));
    AccountLocalEnterAddress();
    AccountLocalAddInventory();
    AccountLocalDetails();
    SFwaitForVisible(By.xpath('//li[@id="tab_Inventory"]//i[@class="icon-check"]'));
    SFwaitForVisible(By.xpath('//li[@id="tab_Details"]//i[@class="icon-check"]'));
    AccountRememberInfoFirstTime();

    LogoutFromAccount();
    console.log('закончили с аккаунтом');

    SFget(adminURL);
    LoginToBoardAsAdmin();
    OpenRequest(V.request.Id);

    SFwaitForVisible(By.xpath('//div[@ng-click="chooseTruck(tid)"]'));
    driver.executeScript(selectTruck);



    endOfTest();
}
//==================================================================================================

module.exports = main;

