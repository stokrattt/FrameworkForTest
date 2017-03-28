function main() {
    global.fiber = Fiber.current;
    V.client = {};
    V.client.name = SFrandomBukva(6) + '_t';
    V.client.fam = SFrandomBukva(6) + '_t';
    V.client.phone = SFrandomCifra(10);
    V.client.email = SFrandomBukvaSmall(6) + '@' + SFrandomBukvaSmall(4) + '.tes';
    V.SalesLogin = ('jack2@ya.com');
    V.SalesPass = ('123');
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
    SFclick(By.xpath('//input[@ng-model="request.permissions.canSeeOtherLeads"]/..'));
    SFclick(By.xpath('//input[@ng-model="request.permissions.canSearchOtherLeads"]/..'));
    SFclick(By.xpath('//input[@ng-model="request.permissions.canEditOtherLeads"]/..'));
    //SFclick(By.xpath('//input[@ng-model="request.permissions.canSeeUnsignedLeads"]/..'));
    SFclick(By.xpath('//input[@ng-model="request.permissions.canSignedSales"]/..'));
    SFclick(By.xpath('//button[@ng-click="submitted=true; create(createUserRequest)"]'));
    SFwaitForVisible (By.xpath('//button[@class="confirm"]'));
    SFsleep (1);
    SFclick (By.xpath('//button[@class="confirm"]'));
    SFsleep (3);

    CreateLocalMovingFromBoard();

    driver.wait(driver.findElement(By.xpath('//a[@ng-click="select(tabs[0])"]')).getText().then(function(text){
        V.request.Id = SFcleanPrice(text);
    }));
    SFclick (By.xpath('//a[@ng-click="select(tabs[7])"]'));
    SFsleep (1);
    driver.findElement(By.xpath('//span[@ng-show="currentManager"]')).getText().then (function (text){
        V.SalesOnAdmin = text;
        });
    SFsleep (1);
    JSwaitForNotExist('div.toast-success');
    SFclick (By.xpath('//button[@ng-click="cancel()"]'));
    SFsleep (1);

    LogoutFromBoardAdmin ();
    LoginToBoardAsCustom(V.SalesLogin,V.SalesPass);
    OpenRequest(V.request.Id);
    SFwaitForVisible(By.xpath('//div[@ng-click="chooseTruck(tid)"]'));

    SFclick (By.xpath('//a[@ng-click="select(tabs[7])"]'));
    driver.findElement(By.xpath('//span[@ng-show="currentManager"]')).getText().then (function (text){
        V.SalesOnSales = text;
    });
    IWant (VToEqual, V.SalesOnAdmin, V.SalesOnSales, 'Сейлсы не совпадают на админке и на менеджере');
    SFclick (By.xpath('//button[contains(text(),"Set Sales")]'));
    SFclick (By.xpath('//div[@ng-show="::PermissionsServices.hasPermission(\'canSignedSales\');"]//ul[@class="dropdown-menu"]/li[2]'));
    SFwaitForVisible (By.xpath('//div[@class="sweet-alert showSweetAlert visible"]'));
    SFsleep (1);
    SFclick (By.xpath('//button[@class="confirm"]'));
    SFsleep (3);
    driver.findElement(By.xpath('//span[@ng-show="currentManager"]')).getText().then (function (text){
        V.NewSalesOnSales = text;
    });
    IWant (VNotToEqual, V.NewSalesOnSales, V.SalesOnSales, 'пермишины не сработали, так как сейл не изменился');
    SFclick (By.xpath('//a[@ng-click="select(tabs[0])"]'));
    SFsleep (0.5);
    SFclick (By.xpath('//select[@id="edit-size-move"]/option[8]'));
    SFsleep (0.5);
    SFclick (By.xpath('//button[@ng-click="UpdateRequest()"]'));
    SFwaitForVisible (By.xpath('//button[@ng-click="update(request)"]'));
    SFclick (By.xpath('//button[@ng-click="update(request)"]'));
    SFsleep (3);
    JSwaitForNotExist('div.toast-success');

    SFclick (By.xpath('//button[@ng-click="cancel()"]'));
    SFsleep (1);
    SFclick (By.xpath('//i[@ng-click="vm.refreshDashboard();"]'));
    SFsleep (2);
    SFsend (By.id('gSearch'), V.request.Id);
    SFsleep(5);
    SFwaitForLocated (By.xpath('//div[@ng-show="searchRequests.length"]'));

    driver.wait(driver.findElement(By.xpath('//div[@class="requestsid ng-binding"]')).getText().then (function(text){
       V.SearchRequest = text;
       console.log(V.SearchRequest);
    }));
    SFsleep(0,1);
    IWant (VToEqual, V.request.Id, V.SearchRequest, 'Поиск по другим пермишинам не работает'); //и пошёл дальше...
    LogoutFromBoardAdmin ();


    endOfTest();
}

//==================================================================================================

module.exports = main;
