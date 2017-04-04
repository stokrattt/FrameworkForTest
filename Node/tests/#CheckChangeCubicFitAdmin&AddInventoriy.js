function main() {
    global.fiber = Fiber.current;
    V.client = {};
    V.client.name = SFrandomBukva(6) + '_t';
    V.client.fam = SFrandomBukva(6) + '_t';
    V.client.phone = SFrandomCifra(10);
    V.client.email = SFrandomBukvaSmall(6) + '@' + SFrandomBukvaSmall(4) + '.tes';

    var URL = 'http://stage.themoveboard.com/moveBoard/#/login';
    SFget(URL);

    SFsend(By.id('email'), 'TestAdmin');
    SFsend(By.id('password'), 'test');
    JSclick('.btn-primary');

    CreateLocalMovingFromBoard();

    driver.findElement(By.xpath("(//div[@ng-show='!request.isInventory']/span)[1]")).getText().then(function (text){
        V.boardNumbersCubFit = SFcleanPrice (text);

    });
    SFclick(By.xpath('//ul[@class="chosen-choices"]'));
    SFclick(By.xpath('//ul[@class="chosen-results"]/li[@data-option-array-index="4"]'));
    SFclick(By.xpath('//ul[@class="chosen-choices"]'));
    SFclick(By.xpath('//ul[@class="chosen-results"]/li[@data-option-array-index="5"]'));
    SFclick(By.xpath('//ul[@class="chosen-choices"]'));
    SFclick(By.xpath('//ul[@class="chosen-results"]/li[@data-option-array-index="6"]'));
    SFsleep (2);

    driver.findElement(By.xpath("(//div[@ng-show='!request.isInventory']/span)[1]")).getText().then(function (text){
        V.boardNumbersCubFitChange = SFcleanPrice (text);
    });
    SFsleep (0.5);
    IWant(VNotToEqual, V.boardNumbersCubFit, V.boardNumbersCubFitChange, 'Кубик фит не изменился, хотя должен был');
    SFsleep (2);

///////////////////////////
    V.boardNumbersCubFit = {};
    V.boardNumbersCubFitChange = {};
    driver.findElement(By.xpath("(//div[@ng-show='!request.isInventory']/span)[1]")).getText().then(function (text){
        V.boardNumbersCubFit = SFcleanPrice (text);
    });

    SFclick(By.xpath('//div[@class="actions pull-right"]/span[@ng-click="switchCalc()"]')); //выключили калькулятор
    SFclick(By.xpath('//ul[@class="chosen-choices"]'));
    SFclick(By.xpath('//ul[@class="chosen-results"]/li[@data-option-array-index="2"]'));
    SFclick(By.xpath('//ul[@class="chosen-choices"]'));
    SFclick(By.xpath('//ul[@class="chosen-results"]/li[@data-option-array-index="7"]'));
    SFsleep (2);

    driver.findElement(By.xpath("(//div[@ng-show='!request.isInventory']/span)[1]")).getText().then(function (text){
        V.boardNumbersCubFitChange = SFcleanPrice (text);
    });
    SFsleep (2);
    IWant(VNotToEqual, V.boardNumbersCubFit, V.boardNumbersCubFitChange, 'Кубик фит не изменился, хотя должен был');

    SFclick(By.xpath('//div[@class="actions pull-right"]/span[@ng-click="switchCalc()"]')); // включили калькулятор
//выбор инвентория
    SFclick(By.xpath('//ul[@class="nav nav-tabs"]//a[@ng-click="select(tabs[1])"]'));
    JSwaitForExist('div.busyoverlay');
    nowWeDoing = 'ждем инвентория';

    //чтобы сначала ждал пока появится бизи, а потом пока свалит и плюс пару сек для анимаций
    SFsleep (7);
    SFclick (By.xpath('//div[@ng-if="!myInventory.opened && !searchText && currentFilter"]//div[@ng-if="!showAdd"]/descendant::button[1]'));
    SFclick (By.xpath('//div[@ng-if="!myInventory.opened && !searchText && currentFilter"]//div[@ng-if="!showAdd"]/descendant::button[1]'));
    SFclick (By.xpath('//div[@ng-if="!myInventory.opened && !searchText && currentFilter"]//div[@ng-if="!showAdd"]/descendant::button[1]'));
    SFclick (By.xpath('//div[@ng-if="!myInventory.opened && !searchText && currentFilter"]//div[@ng-if="!showAdd"]/descendant::button[1]'));
    SFclick (By.xpath('//div[@ng-if="!myInventory.opened && !searchText && currentFilter"]//div[@ng-if="!showAdd"]/descendant::button[1]'));
    SFclick (By.xpath('//div[@ng-if="!myInventory.opened && !searchText && currentFilter"]//div[@ng-if="!showAdd"]/descendant::button[1]'));
    SFclick (By.xpath('//div[@ng-if="!myInventory.opened && !searchText && currentFilter"]//div[@ng-if="!showAdd"]/descendant::button[1]'));
    driver.findElement(By.xpath('//div[@ng-if="calcTotals.cfs > 0 && !isMobile"]')).getText().then(function(text) {
        V.InventoryCubicFit = SFcleanPrice (text.replace ('Total Estimated Cubic Feet: ', ''));
        });

    SFclick(By.id("save-inventory"));
    SFsleep (3);
    driver.findElement(By.xpath("(//div[@ng-show='!request.isInventory']/span)[1]")).getText().then(function (text){
        V.boardNumbersCubFit = SFcleanPrice (text);
    });
    SFsleep (3);
    IWant (VToEqual, V.InventoryCubicFit, V.boardNumbersCubFit, 'Кубик фит не совпадает с инвенторием, а должен');

    endOfTest();
}
//==================================================================================================

module.exports = main;
