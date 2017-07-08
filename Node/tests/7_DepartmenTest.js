module.exports = function main(SF, JS, MF, LF, JSstep, VD, V, By, until,FileDetector, system, condition, config,constants) {    global.fiber = Fiber.current;
 //   V.boardNumbers={moveDate:{}};
    V.client = {};
    V.client.name = SF.randomBukva(6) + '_t';
    V.client.fam = SF.randomBukva(6) + '_t';
    V.client.phone = SF.randomCifra(10);
    V.client.email = SF.randomBukvaSmall(6) + '@' + SF.randomBukvaSmall(4) + '.tes';

    SF.get(V.adminURL);

    LF.LoginToBoardAs_Roma4ke_Admin();
    MF.Board_OpenSettingsDepartment ();

condition.nowWeDoing='Создаем менеджера***********************************************';
    MF.WaitWhileBusy();
    SF.click (By.xpath('//ul[@class="nav nav-pills nav-stacked compose-nav"]/li[2]/a'));
    SF.sleep(3);
    MF.WaitWhileBusy();
    SF.click (By.xpath('//div[@ng-click="vm.openCreateUserModal()"]'));
    SF.waitForVisible (By.xpath('//form[@name="createUserRequest"]'));
    V.managerFirstName1 = "mantest";
    V.managerLastName1 = "testman";
    SF.send (By.xpath('//input[@ng-model="request.firstName"]'), V.managerFirstName1);
    SF.send (By.xpath('//input[@ng-model="request.lastName"]'), V.managerLastName1);
    SF.send(By.xpath('//input[@ng-model="request.phone1"]'), 12345678960);
    SF.click (By.linkText('Account'));
    V.managerAccount = "mantest@ya.ya";
    V.managerPass = 123;
    SF.send (By.xpath('//input[@ng-model="request.login"]'), V.managerAccount);
    SF.send (By.xpath('//input[@ng-model="request.password"]'), V.managerPass);
    SF.click(By.xpath('//button[@ng-click="submitted=true; create(createUserRequest)"]'));
    MF.WaitWhileBusy();
    MF.WaitWhileToaster ();
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
    SF.click(By.xpath('//button[@ng-click="submitted=true; create(createUserRequest)"]'));
    MF.WaitWhileBusy ();
    MF.WaitWhileToaster ();
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
    MF.WaitWhileBusy ();
    MF.WaitWhileToaster ();
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
    MF.WaitWhileBusy ();
    MF.WaitWhileToaster ();
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
    SF.sleep(2);
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
    SF.click(By.xpath('//button[@ng-click="submitted=true; create(createUserRequest)"]'));
   // SF.waitForLocated (By.xpath('//table[@class="clients table table-striped mdDataTable"]//tr//td[contains(text(), "foremantest testforeman")]'));
    MF.WaitWhileBusy ();
    MF.WaitWhileToaster ();
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
    SF.sleep (3);    LF.LogoutFromBoardForeman ();

    LF.LoginToBoardAs_Roma4ke_Admin ();
condition.nowWeDoing = 'заходим под админом и создаем реквест';
    LF.CreateLocalMovingFromBoard (V.client);
    SF.sleep (2);
    driver.wait(driver.findElement(By.xpath('//a[@ng-click="select(tabs[0])"]')).getText().then(function(text){
        V.request.Id = SF.cleanPrice(text);
        LF.addToCleanerJob(V.request.Id);
    }),config.timeout);
    MF.EditRequest_SetToConfirmed ();
    MF.EditRequest_SetAdressToFrom ();
    V.boardNumbers = {};
    LF.RememberDigitsRequestBoard(V.boardNumbers);
    JS.step(JSstep.selectTruck((V.boardNumbers.LaborTimeMax + V.boardNumbers.TravelTime)/60));

    LF.RememberDateFromRequest(V.boardNumbers);
    MF.EditRequest_SaveChanges ();
    LF.closeEditRequest ();
    condition.nowWeDoing = 'идем в локал диспач';
    MF.Board_OpenLocalDispatch ();
    LF.findDayInLocalDispatch(V.boardNumbers.moveDate.Year,V.boardNumbers.moveDate.Month,V.boardNumbers.moveDate.Day);
    MF.WaitWhileBusy();
    MF.WaitWhileBusy();
    MF.Dispatch_GridView();
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
            VD.IWant(VD.NotToEqual, counts.Foreman, 0, 'не нашло имя форемана');
            VD.IWant(VD.NotToEqual, counts.Helper, 0, 'не нашло имя хелпера');
            VD.IWant(VD.NotToEqual, counts.Driver, 0, 'не нашло имя драйвера');
    });
    SF.sleep(1);
    MF.Board_OpenSideBar ();
condition.nowWeDoing='зашли в настройки департмента';
    MF.Board_OpenSettingsDepartment ();

condition.nowWeDoing='идем удалять форемана';

    SF.click (By.xpath('//ul[@class="nav nav-pills nav-stacked compose-nav"]/li[6]/a'));
    SF.sleep(3);
    driver.wait(driver.executeScript("$('.mdDataTable tbody tr td:contains(\"foremantest testforeman\")').dblclick();"),config.timeout);
    SF.sleep (3);
    SF.click (By.xpath('//button[@ng-click="deleteWorker()"]'));
    SF.sleep(2);
    MF.WaitWhileBusy ();
    MF.SweetConfirm ();
    MF.WaitWhileToaster ();
    MF.WaitWhileBusy ();

condition.nowWeDoing='идем удалять хелпера';

    SF.click (By.xpath('//ul[@class="nav nav-pills nav-stacked compose-nav"]/li[5]/a'));
    SF.sleep(2);
    let count=0;
    MF.WaitWhileBusy ();
    driver.wait(driver.executeScript("return $('.mdDataTable tbody tr td:contains(\"helpertest testhelper\")').length;").then(function(c){
        count=c;
    }),config.timeout);
    SF.sleep(0.5);
    while (count>0){
        driver.wait(driver.executeScript("$('.mdDataTable tbody tr td:contains(\"helpertest testhelper\"):eq(0)').dblclick();"),config.timeout);
        SF.sleep (2);
        SF.click (By.xpath('//button[@ng-click="deleteWorker()"]'));
        MF.SweetConfirm ();
        MF.WaitWhileToaster ();
        MF.WaitWhileBusy ();
        SF.sleep (2);
        driver.wait(driver.executeScript("return $('.mdDataTable tbody tr td:contains(\"helpertest testhelper\")').length;").then(function(c){
            count=c;
        }),config.timeout);
        SF.sleep(1);
    }
    MF.WaitWhileBusy ();
    SF.sleep(1);

condition.nowWeDoing='идем удалять драйвера';

    SF.click (By.xpath('//ul[@class="nav nav-pills nav-stacked compose-nav"]/li[4]/a'));
    SF.sleep(2);
    count=0;
    MF.WaitWhileBusy ();
    driver.wait(driver.executeScript("return $('.mdDataTable tbody tr td:contains(\"drivertest testdriver\")').length;").then(function(c){
        count=c;
    }),config.timeout);
    SF.sleep(0.5);
    while (count>0){
        driver.wait(driver.executeScript("$('.mdDataTable tbody tr td:contains(\"drivertest testdriver\"):eq(0)').dblclick();"),config.timeout);
        SF.sleep (2);
        SF.click (By.xpath('//button[@ng-click="deleteWorker()"]'));
        MF.SweetConfirm ();
        MF.WaitWhileToaster ();
        MF.WaitWhileBusy ();
        SF.sleep (2);
        driver.wait(driver.executeScript("return $('.mdDataTable tbody tr td:contains(\"drivertest testdriver\")').length;").then(function(c){
            count=c;
        }),config.timeout);
        SF.sleep(1);
    }
    SF.sleep(1);

condition.nowWeDoing='идем удалять сейлса';

    SF.click (By.xpath('//ul[@class="nav nav-pills nav-stacked compose-nav"]/li[3]/a'));
    SF.sleep(2);
    driver.executeScript("$('.mdDataTable tbody tr td:contains(\"salestest testsales\")').dblclick();");
    SF.sleep (2);
    SF.click (By.xpath('//button[@ng-click="deleteWorker()"]'));
    MF.SweetConfirm ();
    MF.WaitWhileToaster ();
    MF.WaitWhileBusy ();

condition.nowWeDoing='идем удалять менеджера';

    SF.click (By.xpath('//ul[@class="nav nav-pills nav-stacked compose-nav"]/li[2]/a'));
    SF.sleep(2);
    driver.executeScript("$('.mdDataTable tbody tr td:contains(\"mantest testman\")').dblclick();");
    SF.sleep (2);
    SF.click (By.xpath('//button[@ng-click="deleteWorker()"]'));
    MF.SweetConfirm ();
    MF.WaitWhileToaster ();
    MF.WaitWhileBusy ();

    // LF.LogoutFromBoardForeman ();

    SF.endOfTest();
};