module.exports = function main(driver, SF, JS, JSstep, VD, V, By, until,FileDetector, system, condition, LF,config,constants){
    global.fiber = Fiber.current;
    V.client = {};
    V.client.name = SF.randomBukva(6) + '_t';
    V.client.fam = SF.randomBukva(6) + '_t';
    V.client.phone = SF.randomCifra(10);
    V.client.email = SF.randomBukvaSmall(6) + '@' + SF.randomBukvaSmall(4) + '.tes';
    V.SalesLogin = ('jack2@ya.com');
    V.SalesPass = ('123');
    SF.get(V.adminURL);
    SF.sleep(3);

    SF.send(By.id('email'), 'TestAdmin');
    SF.send(By.id('password'), 'test');
    JS.click('.btn-primary');

    SF.click (By.xpath('//button[@ng-click="toggleLeft()"]'));
    SF.waitForVisible (By.xpath('//button[@ng-click="toggleLeft()"]'));
    SF.click (By.xpath('//a[@ng-click="vm.goToPage(\'settings.general\', \'\')"]'));
    SF.waitForVisible (By.xpath('//a[@ng-click="vm.goToPage(\'settings.general\', \'\')"]'));
    SF.click (By.xpath('//a[@ui-sref="settings.department"]'));
    SF.waitForVisible (By.xpath('//a[@ui-sref="settings.department"]'));
    SF.sleep(3);
    SF.click (By.xpath('//ul[@class="nav nav-pills nav-stacked compose-nav"]/li[2]/a'));
    SF.sleep(3);
    SF.waitForVisible (By.xpath('//ul[@class="nav nav-pills nav-stacked compose-nav"]/li[2]/a'));
    SF.sleep(2);
    driver.wait(driver.executeScript("$('.mdDataTable tbody tr td:contains(\"JackSales do not delete\")').dblclick();"), config.timeout);
    SF.waitForLocated (By.linkText("Permissions"));
    SF.click(By.linkText("Permissions"));
    SF.sleep (1);
    SF.click(By.xpath('//ul[@class="nav nav-tabs submenu_tab"]/li[@ng-click="activePermTab = 1"]'));
    SF.waitForVisible (By.xpath('//div[@ng-class="{\'active\': activePermTab === 1}"]')); //?

    LF.PermissionsClear ();
    SF.click(By.xpath('//input[@ng-model="request.permissions.canSeeOtherLeads"]/..'));
    SF.click(By.xpath('//input[@ng-model="request.permissions.canSearchOtherLeads"]/..'));
    SF.click(By.xpath('//input[@ng-model="request.permissions.canEditOtherLeads"]/..'));
    //SF.click(By.xpath('//input[@ng-model="request.permissions.canSeeUnsignedLeads"]/..'));
    SF.click(By.xpath('//input[@ng-model="request.permissions.canSignedSales"]/..'));
    SF.click(By.xpath('//button[@ng-click="submitted=true; create(createUserRequest)"]'));
    SF.waitForVisible (By.xpath('//button[@class="confirm"]'));
    SF.sleep (1);
    SF.click (By.xpath('//button[@class="confirm"]'));
    SF.sleep (3);

    LF.CreateLocalMovingFromBoard();

    driver.wait(driver.findElement(By.xpath('//a[@ng-click="select(tabs[0])"]')).getText().then(function(text){
        V.request.Id = SF.cleanPrice(text);
    }), config.timeout);
    SF.click (By.xpath('//a[@ng-click="select(tabs[7])"]'));
    SF.sleep (1);
    driver.wait(driver.findElement(By.xpath('//span[@ng-show="currentManager"]')).getText().then (function (text){
        V.SalesOnAdmin = text;
        }), config.timeout);
    SF.sleep (1);
    JS.waitForNotExist('div.toast-success');
    SF.click (By.xpath('//button[@ng-click="cancel()"]'));
    SF.sleep (1);

    LF.LogoutFromBoardAdmin ();
    LF.LoginToBoardAsCustom(V.SalesLogin,V.SalesPass);
    LF.OpenRequest(V.request.Id);
    SF.waitForVisible(By.xpath('//div[@ng-click="chooseTruck(tid)"]'));

    SF.click (By.xpath('//a[@ng-click="select(tabs[7])"]'));
    SF.sleep (2);
    driver.wait(driver.findElement(By.xpath('//span[@ng-show="currentManager"]')).getText().then (function (text){
        V.SalesOnSales = text;
    }), config.timeout);
    SF.sleep(2);
    VD.IWant (VD.VToEqual, V.SalesOnAdmin, V.SalesOnSales, 'Сейлсы не совпадают на админке и на менеджере');
    SF.click (By.xpath('//button[contains(text(),"Set Sales")]'));
    SF.click (By.xpath('//div[@ng-show="::PermissionsServices.hasPermission(\'canSignedSales\');"]//ul[@class="dropdown-menu"]/li[2]'));
    SF.waitForVisible (By.xpath('//div[@class="sweet-alert showSweetAlert visible"]'));
    SF.sleep (1);
    SF.click (By.xpath('//button[@class="confirm"]'));
    SF.sleep (3);
    driver.wait(driver.findElement(By.xpath('//span[@ng-show="currentManager"]')).getText().then (function (text){
        V.NewSalesOnSales = text;
    }), config.timeout);
    VD.IWant (VD.VNotToEqual, V.NewSalesOnSales, V.SalesOnSales, 'пермишины не сработали, так как сейл не изменился');
    SF.click (By.xpath('//a[@ng-click="select(tabs[0])"]'));
    SF.sleep (0.5);
    SF.click (By.xpath('//select[@id="edit-size-move"]/option[8]'));
    SF.sleep (0.5);
    JS.click ('button[ng-click=\\"UpdateRequest()\\"]');
    SF.waitForVisible (By.xpath('//button[@ng-click="update(request)"]'));
    SF.click (By.xpath('//button[@ng-click="update(request)"]'));
    SF.sleep (3);
    JS.waitForNotExist('div.toast-success');

    SF.click (By.xpath('//button[@ng-click="cancel()"]'));
    SF.sleep (1);
    SF.click (By.xpath('//i[@ng-click="vm.refreshDashboard();"]'));
    SF.sleep (3);
    SF.send (By.id('gSearch'), V.request.Id);
    SF.sleep(5);
    SF.waitForLocated (By.xpath('//div[@ng-show="searchRequests.length"]'));

    driver.wait(driver.findElement(By.xpath('//div[@class="requestsid ng-binding"]')).getText().then (function(text){
       V.SearchRequest = text;
       console.log(V.SearchRequest);
    }), config.timeout);
    SF.sleep(0,1);
    VD.IWant (VD.VToEqual, V.request.Id, V.SearchRequest, 'Поиск по другим пермишинам не работает'); //и пошёл дальше...
    LF.LogoutFromBoardAdmin ();


    SF.endOfTest();
};
