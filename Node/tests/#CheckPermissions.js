function main() {
    global.fiber = Fiber.current;
    V.client = {};
    V.client.name = SFrandomBukva(6) + '_t';
    V.client.fam = SFrandomBukva(6) + '_t';
    V.client.phone = SFrandomCifra(10);
    V.client.email = SFrandomBukvaSmall(6) + '@' + SFrandomBukvaSmall(4) + '.tes';
    V.SalesLogin = ('jack2@ya.com');
    V.SalesPass = ('123');

    global.fiber = Fiber.current;
    var URL = 'http://stage.themoveboard.com/moveBoard/#/login';
    SFget(URL);

    SFsend(By.id('email'), 'TestAdmin');
    SFsend(By.id('password'), 'test');
    JSclick('.btn-primary');

    SFclick (By.xpath('//button[@ng-click="toggleLeft()"]'));
    SFwaitForVisible (By.xpath('//button[@ng-click="toggleLeft()"]'));
    SFclick (By.xpath('//a[@ng-click="vm.goToPage(\'settings.general\', \'\')"]'));
    SFwaitForVisible (By.xpath('//a[@ng-click="vm.goToPage(\'settings.general\', \'\')"]'));
    SFclick (By.xpath('//a[@ui-sref="settings.department"]'));
    SFwaitForVisible (By.xpath('//a[@ui-sref="settings.department"]'));
    SFsleep(2);
    SFclick (By.xpath('//ul[@class="nav nav-pills nav-stacked compose-nav"]/li[2]/a'));
    SFwaitForVisible (By.xpath('//ul[@class="nav nav-pills nav-stacked compose-nav"]/li[2]/a'));
    SFsleep(2);
    driver.executeScript("$('.mdDataTable tbody tr td:contains(\"JackSales do not delete\")').dblclick();");
    SFclick(By.linkText("Permissions"));
    SFwaitForVisible (By.linkText("Permissions"));
    SFclick(By.xpath('//ul[@class="nav nav-tabs submenu_tab"]/li[@ng-click="activePermTab = 1"]'));
    SFwaitForVisible (By.xpath('//div[@ng-class="{\'active\': activePermTab === 1}"]')); //?

    PermissionsClear ();
    PermissionCanSeeOtherLeads ();
    PermissionCanSearchOtherLeads ();
    PermissionCanEditOtherLeads ();
    PermissionCanSignedSales ();
    SFclick(By.xpath('//button[@ng-click="submitted=true; create(createUserRequest)"]'));
    SFwaitForVisible (By.xpath('//button[@class="confirm"]'));
    SFclick (By.xpath('//button[@class="confirm"]'));
    SFwaitForVisible (By.xpath('//ul[@class="nav nav-pills nav-stacked compose-nav"]/li[2]/a'));

    CreateLocalMovingFromBoard();

    driver.wait(driver.findElement(By.xpath('//a[@ng-click="select(tabs[0])"]')).getText().then(function(text){
        V.request.Id = SFcleanPrice(text);
    }));

    OpenRequest(V.request.Id);

    LoginToBoardAsCustom(V.SalesLogin,V.SalesPass);

    endOfTest();
}

//==================================================================================================

module.exports = main;
