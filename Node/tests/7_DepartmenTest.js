module.exports = function main(SF, JS, MF, LF, JSstep, VD, V, By, until,FileDetector, system, condition, config,constants) {    global.fiber = Fiber.current;
 //   V.boardNumbers={moveDate:{}};
    V.client = {};
    V.client.name = SF.randomBukva(6) + '_t';
    V.client.fam = SF.randomBukva(6) + '_t';
    V.client.phone = SF.randomCifra(10);
    V.client.email = SF.randomBukvaSmall(6) + '@' + SF.randomBukvaSmall(4) + '.tes';

    SF.get(V.adminURL);

    LF.LoginToBoardAs_Roma4ke_Admin();
    SF.click (By.xpath('//button[@ng-click="toggleLeft()"]'));
    SF.waitForVisible (By.xpath('//button[@ng-click="toggleLeft()"]'));
    SF.click (By.xpath('//a[@ng-click="vm.goToPage(\'settings.general\', \'\')"]'));
    SF.waitForVisible (By.xpath('//a[@ng-click="vm.goToPage(\'settings.general\', \'\')"]'));
    SF.click (By.xpath('//a[@ui-sref="settings.department"]'));
    SF.waitForVisible (By.xpath('//a[@ui-sref="settings.department"]'));
    SF.sleep(3);
    condition.nowWeDoing='Создаем менеджера***********************************************';
    SF.click (By.xpath('//ul[@class="nav nav-pills nav-stacked compose-nav"]/li[2]/a'));
    SF.sleep(2);
    SF.click (By.xpath('//div[@ng-click="vm.openCreateUserModal()"]'));
    SF.waitForVisible (By.xpath('//form[@name="createUserRequest"]'));
    V.managerFirstName = "mantest";
    V.managerLastName = "testman";
    SF.send (By.xpath('//input[@ng-model="request.firstName"]'), V.managerFirstName);
    SF.send (By.xpath('//input[@ng-model="request.lastName"]'), V.managerLastName);
    SF.send(By.xpath('//input[@ng-model="request.phone1"]'), 12345678960);
    SF.click (By.linkText('Account'));
    V.managerAccount = "mantest@ya.ya";
    V.managerPass = 123;
    SF.send (By.xpath('//input[@ng-model="request.login"]'), V.managerAccount);
    SF.send (By.xpath('//input[@ng-model="request.password"]'), V.managerPass);
    SF.send (By.xpath('//input[@ng-model="request.email"]'), V.managerAccount);
    SF.click(By.xpath('//button[@ng-click="submitted=true; create(createUserRequest)"]'));
    JS.waitForNotExist ('div.busyoverlay:visible');
    SF.sleep(1);
    JS.waitForExist('div.toast-success:visible');
    SF.sleep(3);
    //SF.waitForLocated (By.xpath('//table[@class="clients table table-striped mdDataTable"]//tr//td[contains(text(), "mantest testman")]'));
    //SF.sleep (3);
    condition.nowWeDoing='Создали менеджера****************************************';
    //JS.waitForExist('div.toast-message');
    SF.click (By.xpath('//ul[@class="nav nav-pills nav-stacked compose-nav"]/li[3]/a'));
    SF.sleep(2);

    condition.nowWeDoing='Создаем сейлса**************************************';
    SF.click (By.xpath('//div[@ng-click="vm.openCreateUserModal()"]'));
    SF.waitForVisible (By.xpath('//form[@name="createUserRequest"]'));
    V.salesFirstName = "salestest";
    V.salesLastName = "testsales";
    SF.send (By.xpath('//input[@ng-model="request.firstName"]'), V.salesFirstName);
    SF.send (By.xpath('//input[@ng-model="request.lastName"]'), V.salesLastName);
    SF.send(By.xpath('//input[@ng-model="request.phone1"]'), 12345678960);
    SF.click (By.linkText('Account'));
    V.salesAccount = "sales@ya.ya";
    V.salesPass = 123;
    SF.send (By.xpath('//input[@ng-model="request.login"]'), V.salesAccount);
    SF.send (By.xpath('//input[@ng-model="request.password"]'), V.salesPass);
    SF.send (By.xpath('//input[@ng-model="request.email"]'), V.salesAccount);
    SF.click(By.xpath('//button[@ng-click="submitted=true; create(createUserRequest)"]'));
    JS.waitForNotExist ('div.busyoverlay:visible');
    SF.sleep(1);
    JS.waitForExist('div.toast-success');
    SF.sleep(3);
    //SF.waitForLocated (By.xpath('//table[@class="clients table table-striped mdDataTable"]//tr//td[contains(text(), "salestest testsales")]'));
condition.nowWeDoing='Создали сейлса**************************************';
    //JS.waitForExist('div.toast-message');
    SF.click (By.xpath('//ul[@class="nav nav-pills nav-stacked compose-nav"]/li[4]/a'));
    SF.sleep(2);
condition.nowWeDoing='Создаем драйвера**************************************';
    SF.click (By.xpath('//div[@ng-click="vm.openCreateUserModal()"]'));
    SF.waitForVisible (By.xpath('//form[@name="createUserRequest"]'));
    V.driverFirstName = "drivertest";
    V.driverLastName = "testdriver";
    SF.send (By.xpath('//input[@ng-model="request.firstName"]'), V.driverFirstName);
    SF.send (By.xpath('//input[@ng-model="request.lastName"]'), V.driverLastName);
    SF.send(By.xpath('//input[@ng-model="request.phone1"]'), 12345678960);
    SF.click(By.xpath('//button[@ng-click="submitted=true; create(createUserRequest)"]'));
    JS.waitForNotExist ('div.busyoverlay:visible');
    SF.sleep(1);
    JS.waitForExist('div.toast-success');
    SF.sleep(3);
    //SF.waitForLocated (By.xpath('//table[@class="clients table table-striped mdDataTable"]//tr//td[contains(text(), "drivertest testdriver")]'));
    //SF.sleep(3);
condition.nowWeDoing='Создали драйвера**************************************';
   // JS.waitForExist('div.toast-message');
    SF.click (By.xpath('//ul[@class="nav nav-pills nav-stacked compose-nav"]/li[5]/a'));
    SF.sleep(2);
condition.nowWeDoing='Создаем хелпера**************************************';
    SF.click (By.xpath('//div[@ng-click="vm.openCreateUserModal()"]'));
    SF.waitForVisible (By.xpath('//form[@name="createUserRequest"]'));
    V.helperFirstName = "helpertest";
    V.helperLastName = "testhelper";
    SF.send (By.xpath('//input[@ng-model="request.firstName"]'), V.helperFirstName);
    SF.send (By.xpath('//input[@ng-model="request.lastName"]'), V.helperLastName);
    SF.send(By.xpath('//input[@ng-model="request.phone1"]'), 12345678960);
    SF.click(By.xpath('//button[@ng-click="submitted=true; create(createUserRequest)"]'));
    JS.waitForNotExist ('div.busyoverlay:visible');
    SF.sleep(1);
    JS.waitForExist('div.toast-success');
    SF.sleep(3);
    //SF.waitForLocated (By.xpath('//table[@class="clients table table-striped mdDataTable"]//tr//td[contains(text(), "helpertest testhelper")]'));
    //SF.sleep(3);
condition.nowWeDoing='Создали хелпера**************************************';
  //  JS.waitForExist('div.toast-message');
    SF.click (By.xpath('//ul[@class="nav nav-pills nav-stacked compose-nav"]/li[6]/a'));
    SF.sleep(2);
condition.nowWeDoing='Создаем форемана**************************************';
    SF.click (By.xpath('//div[@ng-click="vm.openCreateUserModal()"]'));
    SF.waitForVisible (By.xpath('//form[@name="createUserRequest"]'));
    V.foremanFirstName = "foremantest";
    V.foremanLastName = "testforeman";
    SF.send (By.xpath('//input[@ng-model="request.firstName"]'), V.foremanFirstName);
    SF.send (By.xpath('//input[@ng-model="request.lastName"]'), V.foremanLastName);
    SF.send(By.xpath('//input[@ng-model="request.phone1"]'), 12345678960);
    SF.click (By.linkText('Account'));
    V.foremanAccount = "foremantest@ya.ya";
    V.foremanPass = 123;
    SF.send (By.xpath('//input[@ng-model="request.login"]'), V.foremanAccount);
    SF.send (By.xpath('//input[@ng-model="request.password"]'), V.foremanPass);
    SF.send (By.xpath('//input[@ng-model="request.email"]'), V.foremanAccount);
    SF.click(By.xpath('//button[@ng-click="submitted=true; create(createUserRequest)"]'));
   // SF.waitForLocated (By.xpath('//table[@class="clients table table-striped mdDataTable"]//tr//td[contains(text(), "foremantest testforeman")]'));
    JS.waitForNotExist ('div.busyoverlay:visible');
    SF.sleep(1);
    JS.waitForNotExist('div.toast-success');
    SF.sleep(3);

condition.nowWeDoing='Создали форемана**************************************';

    MF.Board_LogoutAdmin ();

condition.nowWeDoing='Заходим под созданным менеджером*************************************';
    SF.waitForVisible(By.xpath('//div[@ng-controller="LoginController"]//span[contains(text(),"Move")]'));
    SF.send(By.xpath('//input[@id="email"]'), V.managerAccount);
    SF.send(By.xpath('//input[@id="password"]'), V.managerPass);
    SF.click(By.xpath('//button[@type="submit"]'));
    SF.waitForLocated(By.id('main-content'));
    SF.sleep (3);

    MF.Board_LogoutAdmin ();

condition.nowWeDoing='Заходим под созданным sales*************************************';

    SF.waitForVisible(By.xpath('//div[@ng-controller="LoginController"]//span[contains(text(),"Move")]'));
    SF.send(By.xpath('//input[@id="email"]'), V.salesAccount);
    SF.send(By.xpath('//input[@id="password"]'), V.salesPass);
    SF.click(By.xpath('//button[@type="submit"]'));
    SF.waitForLocated(By.id('main-content'));
    SF.sleep (3);

    MF.Board_LogoutAdmin ();

condition.nowWeDoing='Заходим под созданным foreman*************************************';

    SF.waitForVisible(By.xpath('//div[@ng-controller="LoginController"]//span[contains(text(),"Move")]'));
    SF.send(By.xpath('//input[@id="email"]'), V.foremanAccount);
    SF.send(By.xpath('//input[@id="password"]'), V.foremanPass);
    SF.click(By.xpath('//button[@type="submit"]'));
    SF.waitForLocated(By.id('datatable'));
    SF.sleep (3);

    LF.LogoutFromBoardForeman ();

    LF.LoginToBoardAs_Roma4ke_Admin ();
condition.nowWeDoing = 'заходим под админом и создаем реквест';
    LF.CreateLocalMovingFromBoard (V.client);
    SF.sleep (2);
    driver.wait(driver.findElement(By.xpath('//a[@ng-click="select(tabs[0])"]')).getText().then(function(text){
        V.request.Id = SF.cleanPrice(text);
        LF.addToCleanerJob(V.request.Id);
    }));
    JS.select ('#edit-status', 3);
    SF.send (By.id('edit-moving-from'), 2342342342424);
    SF.send (By.xpath('//input[@ng-model="request.field_moving_to.thoroughfare"]'), 34654564564);
    V.boardNumbers = {};
    LF.RememberDigitsRequestBoard(V.boardNumbers);
    JS.step(JSstep.selectTruck((V.boardNumbers.LaborTimeMax + V.boardNumbers.TravelTime)/60));

    LF.RememberDateFromRequest(V.boardNumbers);

    JS.click ("button[ng-click=\\\"UpdateRequest()\\\"]");
    SF.waitForVisible (By.xpath('//button[@ng-click="update(request)"]'));
    SF.click (By.xpath('//button[@ng-click="update(request)"]'));
    SF.sleep (5);
    JS.waitForNotExist ('div.busyoverlay:visible');
    JS.waitForNotExist('div.toast-success');
    SF.click (By.xpath('//button[@ng-click="cancel()"]'));
    SF.sleep (1);
    condition.nowWeDoing = 'идем в локал диспач';
    SF.click (By.xpath('//button[@ng-click="toggleLeft()"]'));
    SF.click (By.xpath('//a[@ng-click="vm.goToPage(\'dispatch.local\', \'\')"]'));
    SF.sleep (7);
    SF.waitForLocated(By.xpath('//a[@class="ui-datepicker-next ui-corner-all"]'));
    LF.findDayInLocalDispatch(V.boardNumbers.moveDate.Year,V.boardNumbers.moveDate.Month,V.boardNumbers.moveDate.Day);
    JS.waitForNotExist('div.busyoverlay:visible');
    SF.sleep(1);
    JS.waitForNotExist('div.busyoverlay:visible');
    SF.click(By.xpath('//i[contains(@ng-click,"view.grid = true;")]'));
    LF.SelectRequestDispatch (V.request.Id);

    driver.executeScript (
        function () {
            var a = $('option[ng-repeat="(uid, user) in vm.users.foreman | orderBy:\'name\'"]:contains("foremantest testforeman")').length;
            var b = $('option[ng-repeat="helper in helpers   | orderBy:\'name\'"]:contains("helpertest testhelper")').length;
            var c = $('option[ng-repeat="helper in helpers   | orderBy:\'name\'"]:contains("drivertest testdriver")').length;
            return {
                Foreman:a,
                Helper:b,
                Driver:c
            };
        }.toString().substring(12)
        ).then(function(counts){
            VD.IWant(VD.VNotToEqual, counts.Foreman, 0, 'не нашло имя форемана');
            VD.IWant(VD.VNotToEqual, counts.Helper, 0, 'не нашло имя хелпера');
            VD.IWant(VD.VNotToEqual, counts.Driver, 0, 'не нашло имя драйвера');
    });
condition.nowWeDoing='зашли в настройки департмента';
    SF.click (By.xpath('//a[@ng-click="vm.goToPage(\'settings.general\', \'\')"]'));
    SF.waitForVisible (By.xpath('//a[@ng-click="vm.goToPage(\'settings.general\', \'\')"]'));
    SF.click (By.xpath('//a[@ui-sref="settings.department"]'));
    SF.sleep(2);
    SF.waitForVisible (By.xpath('//a[@ui-sref="settings.department"]'));
    JS.waitForNotExist('div.busyoverlay:visible');
    SF.sleep(3);

condition.nowWeDoing='идем удалять форемана';

    SF.click (By.xpath('//ul[@class="nav nav-pills nav-stacked compose-nav"]/li[6]/a'));
    SF.sleep(3);
    driver.wait(driver.executeScript("$('.mdDataTable tbody tr td:contains(\"foremantest testforeman\")').dblclick();"),config.timeout);
    SF.sleep (3);
    SF.click (By.xpath('//button[@ng-click="deleteWorker()"]'));
    SF.waitForLocated (By.xpath('//div[@class="sweet-alert showSweetAlert visible"]'));
    SF.click (By.xpath('//button[@class="confirm"]'));
    JS.waitForNotExist('div.toast-message');
    JS.waitForNotExist('div.busyoverlay:visible');
    SF.sleep (2);

condition.nowWeDoing='идем удалять хелпера';

    SF.click (By.xpath('//ul[@class="nav nav-pills nav-stacked compose-nav"]/li[5]/a'));
    SF.sleep(2);
    let count=0;
    JS.waitForNotExist('div.busyoverlay:visible');
    driver.wait(driver.executeScript("return $('.mdDataTable tbody tr td:contains(\"helpertest testhelper\")').length;").then(function(c){
        count=c;
    }),config.timeout);
    SF.sleep(0.5);
    console.log(count);
    while (count>0){
        driver.wait(driver.executeScript("$('.mdDataTable tbody tr td:contains(\"helpertest testhelper\"):eq(0)').dblclick();"),config.timeout);
        SF.sleep (2);
        SF.click (By.xpath('//button[@ng-click="deleteWorker()"]'));
        SF.waitForLocated (By.xpath('//div[@class="sweet-alert showSweetAlert visible"]'));
        SF.click (By.xpath('//button[@class="confirm"]'));
        JS.waitForNotExist('div.toast-message');
        JS.waitForNotExist('div.busyoverlay:visible');
        SF.sleep (2);
        driver.wait(driver.executeScript("return $('.mdDataTable tbody tr td:contains(\"helpertest testhelper\")').length;").then(function(c){
            count=c;
        }),config.timeout);
        SF.sleep(1);
        console.log(count);
    }
    JS.waitForNotExist('div.busyoverlay:visible');
    SF.sleep(1);

condition.nowWeDoing='идем удалять драйвера';

    SF.click (By.xpath('//ul[@class="nav nav-pills nav-stacked compose-nav"]/li[4]/a'));
    SF.sleep(2);
    count=0;
    JS.waitForNotExist('div.busyoverlay:visible');
    driver.wait(driver.executeScript("return $('.mdDataTable tbody tr td:contains(\"drivertest testdriver\")').length;").then(function(c){
        count=c;
    }),config.timeout);
    SF.sleep(0.5);
    console.log(count);
    while (count>0){
        driver.wait(driver.executeScript("$('.mdDataTable tbody tr td:contains(\"drivertest testdriver\"):eq(0)').dblclick();"),config.timeout);
        SF.sleep (2);
        SF.click (By.xpath('//button[@ng-click="deleteWorker()"]'));
        SF.waitForLocated (By.xpath('//div[@class="sweet-alert showSweetAlert visible"]'));
        SF.click (By.xpath('//button[@class="confirm"]'));
        JS.waitForNotExist('div.toast-message');
        JS.waitForNotExist('div.busyoverlay:visible');
        SF.sleep (2);
        driver.wait(driver.executeScript("return $('.mdDataTable tbody tr td:contains(\"drivertest testdriver\")').length;").then(function(c){
            count=c;
        }),config.timeout);
        SF.sleep(1);
        console.log(count);
    }
    SF.sleep(1);

condition.nowWeDoing='идем удалять сейлса';

    SF.click (By.xpath('//ul[@class="nav nav-pills nav-stacked compose-nav"]/li[3]/a'));
    SF.sleep(2);
    driver.executeScript("$('.mdDataTable tbody tr td:contains(\"salestest testsales\")').dblclick();");
    SF.sleep (2);
    SF.click (By.xpath('//button[@ng-click="deleteWorker()"]'));
    SF.waitForLocated (By.xpath('//div[@class="sweet-alert showSweetAlert visible"]'));
    SF.click (By.xpath('//button[@class="confirm"]'));
    JS.waitForNotExist('div.toast-message');
    SF.sleep (2);

condition.nowWeDoing='идем удалять менеджера';

    SF.click (By.xpath('//ul[@class="nav nav-pills nav-stacked compose-nav"]/li[2]/a'));
    SF.sleep(2);
    driver.executeScript("$('.mdDataTable tbody tr td:contains(\"mantest testman\")').dblclick();");
    SF.sleep (2);
    SF.click (By.xpath('//button[@ng-click="deleteWorker()"]'));
    SF.waitForLocated (By.xpath('//div[@class="sweet-alert showSweetAlert visible"]'));
    SF.click (By.xpath('//button[@class="confirm"]'));
    SF.sleep (1);
    JS.waitForNotExist('div.toast-message');
    JS.waitForExist('div.toast-message');

    JS.waitForExist('div.toast-success');
    JS.waitForNotExist('div.toast-success');

    LF.LogoutFromBoardForeman ();

    SF.endOfTest();
};