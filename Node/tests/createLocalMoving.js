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
    JSclick('span[ng-click=\\\"vm.openAddressModal()\\\"]:visible:first');

    SFsend(By.xpath('//input[@type="field_moving_from"][@placeholder="From Address"]'),'Address From');
    SFsend(By.xpath('//input[@type="field_moving_to"][@placeholder="To Address"]'),'Address To');
    SFclick(By.xpath('//button[@ng-click="update(client)"]'));
    JSwaitForExist('button.confirm:contains("Update")');
    SFsleep(2);
    SFclick(By.xpath('//button[@class="confirm"][contains(text(),"Update")]'));
    JSwaitForExist('button.confirm:contains("OK")');
    SFsleep(2);
    SFclick(By.xpath('//button[@class="confirm"][contains(text(),"OK")]'));
    JSclick('a[ng-click=\\"vm.select(tab)\\"]:contains(\\"Inventory\\")');
    JSwaitForExist('div[ng-repeat="filter in filters"]');
    SFsleep(5);
    SFclick(By.xpath('(//div[@ng-repeat="item in currentFilter.items"]//button[@ng-click="changeValue(1, item)"])[1]'));
    SFsleep(0.5);
    SFclick(By.xpath('(//div[@ng-repeat="item in currentFilter.items"]//button[@ng-click="changeValue(1, item)"])[1]'));
    SFsleep(0.5);
    SFclick(By.xpath('(//div[@ng-repeat="item in currentFilter.items"]//button[@ng-click="changeValue(1, item)"])[2]'));
    SFsleep(0.5);
    SFclick(By.xpath('(//div[@ng-repeat="item in currentFilter.items"]//button[@ng-click="changeValue(1, item)"])[2]'));
    SFsleep(0.5);
    JSclick('button#save-inventory.inventory__button');
    JSwaitForExist('button.confirm:contains("OK")');
    SFsleep(2);
    SFclick(By.xpath('//button[@class="confirm"][contains(text(),"OK")]'));

    endOfTest();
}
//==================================================================================================

module.exports = main;

