function main() {
    V.client={};
    V.client.name = SFrandomBukva(6)+'_t';
    V.client.fam = SFrandomBukva(6)+'_t';
    V.client.phone = SFrandomCifra(10);
    V.client.email = SFrandomBukvaSmall(6)+'@'+SFrandomBukvaSmall(4)+'.tes';

    global.fiber = Fiber.current;
    var URL = 'http://stage.themoveboard.com/';
    SFget(URL);
    FullSmallCalcAsLocal(V.client);
    console.log("заполнили форму");

    SFclick(By.xpath('//button[@ng-click="cancel()"][contains(text(),"View request")]'));
    SFclick(By.xpath('//label[@for="partial"]/input[@ng-model="vm.packing_service"]'));

    AccountLocalEnterAddress();
    AccountLocalAddInventory();
    AccountLocalDetails();

    SFwaitForVisible(By.xpath('//li[@id="tab_Inventory"]//i[@class="icon-check"]'));
    SFwaitForVisible(By.xpath('//li[@id="tab_Details"]//i[@class="icon-check"]'));

    AccountRememberInfoFirstTime();

    endOfTest();
}
//==================================================================================================

module.exports = main;

