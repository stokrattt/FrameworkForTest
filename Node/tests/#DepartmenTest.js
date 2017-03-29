function main() {
    global.fiber = Fiber.current;
    V.client = {};
    V.client.name = SFrandomBukva(6) + '_t';
    V.client.fam = SFrandomBukva(6) + '_t';
    V.client.phone = SFrandomCifra(10);
    V.client.email = SFrandomBukvaSmall(6) + '@' + SFrandomBukvaSmall(4) + '.tes';
    V.SalesLogin = ('jack2@ya.com');
    V.SalesPass = ('123');
    var URL = 'http://stage.themoveboard.com:8001/moveBoard/#/login';
    SFget(URL);

    SFsend(By.id('email'), 'roma4ke');
    SFsend(By.id('password'), 'root');
    JSclick('.btn-primary');
    SFsleep (5);
    SFclick (By.xpath('//button[@ng-click="toggleLeft()"]'));
    SFwaitForVisible (By.xpath('//button[@ng-click="toggleLeft()"]'));
    SFclick (By.xpath('//a[@ng-click="vm.goToPage(\'settings.general\', \'\')"]'));
    SFwaitForVisible (By.xpath('//a[@ng-click="vm.goToPage(\'settings.general\', \'\')"]'));
    SFclick (By.xpath('//a[@ui-sref="settings.department"]'));
    SFwaitForVisible (By.xpath('//a[@ui-sref="settings.department"]'));
    SFsleep(3);
nowWeDoing='Создаем менеджера***********************************************';
    SFclick (By.xpath('//div[@ng-click="vm.openCreateUserModal()"]'));
    SFwaitForVisible (By.xpath('//form[@name="createUserRequest"]'));
    V.managerFirstName = "mantest";
    V.managerLastName = "testman";
    SFsend (By.xpath('//input[@ng-model="request.firstName"]'), V.managerFirstName);
    SFsend (By.xpath('//input[@ng-model="request.lastName"]'), V.managerLastName);
    SFsend(By.xpath('//input[@ng-model="request.phone1"]'), 12345678960);
    SFclick (By.linkText('Account'));
    V.managerAccount = "mantest@ya.ya";
    V.managerPass = 123;
    SFsend (By.xpath('//input[@ng-model="request.login"]'), V.managerAccount);
    SFsend (By.xpath('//input[@ng-model="request.password"]'), V.managerPass);
    SFsend (By.xpath('//input[@ng-model="request.email"]'), V.managerAccount);
    SFclick (By.xpath('//button[@ng-click="submitted=true; create(createUserRequest)"]'));
    JSwaitForNotExist ('div.busyoverlay:visible');
    SFsleep(1);
    JSwaitForExist('div.toast-success');
    SFsleep(3);
    //SFwaitForLocated (By.xpath('//table[@class="clients table table-striped mdDataTable"]//tr//td[contains(text(), "mantest testman")]'));
    //SFsleep (3);
nowWeDoing='Создали менеджера****************************************';
    JSwaitForExist('div.toast-message');
    SFclick (By.xpath('//ul[@class="nav nav-pills nav-stacked compose-nav"]/li[2]/a'));
    SFsleep(2);

nowWeDoing='Создаем сейлса**************************************';
    SFclick (By.xpath('//div[@ng-click="vm.openCreateUserModal()"]'));
    SFwaitForVisible (By.xpath('//form[@name="createUserRequest"]'));
    V.salesFirstName = "salestest";
    V.salesLastName = "testsales";
    SFsend (By.xpath('//input[@ng-model="request.firstName"]'), V.salesFirstName);
    SFsend (By.xpath('//input[@ng-model="request.lastName"]'), V.salesLastName);
    SFsend(By.xpath('//input[@ng-model="request.phone1"]'), 12345678960);
    SFclick (By.linkText('Account'));
    V.salesAccount = "sales@ya.ya";
    V.salesPass = 123;
    SFsend (By.xpath('//input[@ng-model="request.login"]'), V.salesAccount);
    SFsend (By.xpath('//input[@ng-model="request.password"]'), V.salesPass);
    SFsend (By.xpath('//input[@ng-model="request.email"]'), V.salesAccount);
    SFclick (By.xpath('//button[@ng-click="submitted=true; create(createUserRequest)"]'));
    JSwaitForNotExist ('div.busyoverlay:visible');
    SFsleep(1);
    JSwaitForExist('div.toast-success');
    SFsleep(3);
    //SFwaitForLocated (By.xpath('//table[@class="clients table table-striped mdDataTable"]//tr//td[contains(text(), "salestest testsales")]'));
nowWeDoing='Создали сейлса**************************************';
    JSwaitForExist('div.toast-message');
    SFclick (By.xpath('//ul[@class="nav nav-pills nav-stacked compose-nav"]/li[3]/a'));
    SFsleep(2);
nowWeDoing='Создаем драйвера**************************************';
    SFclick (By.xpath('//div[@ng-click="vm.openCreateUserModal()"]'));
    SFwaitForVisible (By.xpath('//form[@name="createUserRequest"]'));
    V.driverFirstName = "drivertest";
    V.driverLastName = "testdriver";
    SFsend (By.xpath('//input[@ng-model="request.firstName"]'), V.driverFirstName);
    SFsend (By.xpath('//input[@ng-model="request.lastName"]'), V.driverLastName);
    SFsend(By.xpath('//input[@ng-model="request.phone1"]'), 12345678960);
    SFclick (By.xpath('//button[@ng-click="submitted=true; create(createUserRequest)"]'));
    SFwaitForLocated (By.xpath('//table[@class="clients table table-striped mdDataTable"]//tr//td[contains(text(), "drivertest testdriver")]'));
    SFsleep(3);
nowWeDoing='Создали драйвера**************************************';
    JSwaitForExist('div.toast-message');
    SFclick (By.xpath('//ul[@class="nav nav-pills nav-stacked compose-nav"]/li[4]/a'));
    SFsleep(2);
nowWeDoing='Создаем хелпера**************************************';
    SFclick (By.xpath('//div[@ng-click="vm.openCreateUserModal()"]'));
    SFwaitForVisible (By.xpath('//form[@name="createUserRequest"]'));
    V.helperFirstName = "helpertest";
    V.helperLastName = "testhelper";
    SFsend (By.xpath('//input[@ng-model="request.firstName"]'), V.helperFirstName);
    SFsend (By.xpath('//input[@ng-model="request.lastName"]'), V.helperLastName);
    SFsend(By.xpath('//input[@ng-model="request.phone1"]'), 12345678960);
    SFclick (By.xpath('//button[@ng-click="submitted=true; create(createUserRequest)"]'));
    SFwaitForLocated (By.xpath('//table[@class="clients table table-striped mdDataTable"]//tr//td[contains(text(), "helpertest testhelper")]'));
    SFsleep(3);
nowWeDoing='Создали хелпера**************************************';
    JSwaitForExist('div.toast-message');
    SFclick (By.xpath('//ul[@class="nav nav-pills nav-stacked compose-nav"]/li[5]/a'));
    SFsleep(2);
nowWeDoing='Создаем форемана**************************************';
    SFclick (By.xpath('//div[@ng-click="vm.openCreateUserModal()"]'));
    SFwaitForVisible (By.xpath('//form[@name="createUserRequest"]'));
    V.foremanFirstName = "foremantest";
    V.foremanLastName = "testforeman";
    SFsend (By.xpath('//input[@ng-model="request.firstName"]'), V.foremanFirstName);
    SFsend (By.xpath('//input[@ng-model="request.lastName"]'), V.foremanLastName);
    SFsend(By.xpath('//input[@ng-model="request.phone1"]'), 12345678960);
    SFclick (By.linkText('Account'));
    V.foremanAccount = "foremantest@ya.ya";
    V.foremanPass = 123;
    SFsend (By.xpath('//input[@ng-model="request.login"]'), V.foremanAccount);
    SFsend (By.xpath('//input[@ng-model="request.password"]'), V.foremanPass);
    SFsend (By.xpath('//input[@ng-model="request.email"]'), V.foremanAccount);
    SFclick (By.xpath('//button[@ng-click="submitted=true; create(createUserRequest)"]'));
    SFwaitForLocated (By.xpath('//table[@class="clients table table-striped mdDataTable"]//tr//td[contains(text(), "foremantest testforeman")]'));
    JSwaitForNotExist('div.toast-success');
    SFsleep(3);

nowWeDoing='Создали форемана**************************************';

    LogoutFromBoardAdmin ();

nowWeDoing='Заходим под созданным менеджером*************************************';
    SFwaitForVisible(By.xpath('//div[@ng-controller="LoginController"]//span[contains(text(),"Move")]'));
    SFsend(By.xpath('//input[@id="email"]'), V.managerAccount);
    SFsend(By.xpath('//input[@id="password"]'), V.managerPass);
    SFclick(By.xpath('//button[@type="submit"]'));
    SFwaitForLocated(By.id('main-content'));
    SFsleep (3);

    LogoutFromBoardAdmin ();

nowWeDoing='Заходим под созданным sales*************************************';

    SFwaitForVisible(By.xpath('//div[@ng-controller="LoginController"]//span[contains(text(),"Move")]'));
    SFsend(By.xpath('//input[@id="email"]'), V.salesAccount);
    SFsend(By.xpath('//input[@id="password"]'), V.salesPass);
    SFclick(By.xpath('//button[@type="submit"]'));
    SFwaitForLocated(By.id('main-content'));
    SFsleep (3);

    LogoutFromBoardAdmin ();

nowWeDoing='Заходим под созданным foreman*************************************';

    SFwaitForVisible(By.xpath('//div[@ng-controller="LoginController"]//span[contains(text(),"Move")]'));
    SFsend(By.xpath('//input[@id="email"]'), V.foremanAccount);
    SFsend(By.xpath('//input[@id="password"]'), V.foremanPass);
    SFclick(By.xpath('//button[@type="submit"]'));
    SFwaitForLocated(By.id('datatable'));
    SFsleep (3);

    LogoutFromBoardForeman ();

    SFsend(By.id('email'), 'roma4ke');
    SFsend(By.id('password'), 'root');
    JSclick('.btn-primary');

    CreateLocalMovingFromBoard ();
    SFsleep (2);
    driver.wait(driver.findElement(By.xpath('//a[@ng-click="select(tabs[0])"]')).getText().then(function(text){
        V.request.Id = SFcleanPrice(text);
    }));
    JSselect ('#edit-status', 3);
    SFsend (By.id('edit-moving-from'), 2342342342424);
    SFsend (By.xpath('//input[@ng-model="request.field_moving_to.thoroughfare"]'), 34654564564);
    JSstep (selectTruck);
    RememberDateFromRequest();

    SFclick (By.xpath('//button[@ng-click="UpdateRequest()"]'));
    SFwaitForVisible (By.xpath('//button[@ng-click="update(request)"]'));
    SFclick (By.xpath('//button[@ng-click="update(request)"]'));
    SFsleep (5);
    JSwaitForNotExist ('div.busyoverlay:visible');
    JSwaitForNotExist('div.toast-success');
    SFclick (By.xpath('//button[@ng-click="cancel()"]'));
    SFsleep (1);
    SFclick (By.xpath('//button[@ng-click="toggleLeft()"]'));
    SFclick (By.xpath('//a[@ng-click="vm.goToPage(\'dispatch.local\', \'\')"]'));
    SFsleep (7);
    SFwaitForLocated(By.xpath('//a[@class="ui-datepicker-next ui-corner-all"]'));
    findDayInLocalDispatch(V.boardNumbers.moveDate.Year,V.boardNumbers.moveDate.Month,V.boardNumbers.moveDate.Day);
    JSwaitForNotExist('div.busyoverlay:visible');
    SFsleep(1);
    SFclick(By.xpath('//i[contains(@ng-click,"view.grid = true;")]'));
    SelectRequestDispatch (V.request.Id);

   // SFclick (By.xpath('//select[@ng-model="vm.data.foreman"]'));
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
            IWant(VNotToEqual, counts.Foreman, 0, 'не нашло имя форемана');
            IWant(VNotToEqual, counts.Helper, 0, 'не нашло имя хелпера');
            IWant(VNotToEqual, counts.Driver, 0, 'не нашло имя драйвера');
    });
nowWeDoing='зашли в настройки департмента';
    SFclick (By.xpath('//a[@ng-click="vm.goToPage(\'settings.general\', \'\')"]'));
    SFwaitForVisible (By.xpath('//a[@ng-click="vm.goToPage(\'settings.general\', \'\')"]'));
    SFclick (By.xpath('//a[@ui-sref="settings.department"]'));
    SFwaitForVisible (By.xpath('//a[@ui-sref="settings.department"]'));
    SFsleep(2);

nowWeDoing='идем удалять форемана';

    SFclick (By.xpath('//ul[@class="nav nav-pills nav-stacked compose-nav"]/li[5]/a'));
    SFsleep(2);
    driver.executeScript("$('.mdDataTable tbody tr td:contains(\"foremantest testforeman\")').dblclick();");
    SFsleep (2);
    SFclick (By.xpath('//button[@ng-click="deleteWorker()"]'));
    SFwaitForLocated (By.xpath('//div[@class="sweet-alert showSweetAlert visible"]'));
    SFclick (By.xpath('//button[@class="confirm"]'));
    JSwaitForNotExist('div.toast-message');
    SFsleep (2);

nowWeDoing='идем удалять хелпера';

    SFclick (By.xpath('//ul[@class="nav nav-pills nav-stacked compose-nav"]/li[4]/a'));
    SFsleep(2);
    driver.executeScript("$('.mdDataTable tbody tr td:contains(\"helpertest testhelper\")').dblclick();");
    SFsleep (2);
    SFclick (By.xpath('//button[@ng-click="deleteWorker()"]'));
    SFwaitForLocated (By.xpath('//div[@class="sweet-alert showSweetAlert visible"]'));
    SFclick (By.xpath('//button[@class="confirm"]'));
    JSwaitForNotExist('div.toast-message');
    SFsleep (2);

nowWeDoing='идем удалять драйвера';

    SFclick (By.xpath('//ul[@class="nav nav-pills nav-stacked compose-nav"]/li[3]/a'));
    SFsleep(2);
    driver.executeScript("$('.mdDataTable tbody tr td:contains(\"drivertest testdriver\")').dblclick();");
    SFsleep (2);
    SFclick (By.xpath('//button[@ng-click="deleteWorker()"]'));
    SFwaitForLocated (By.xpath('//div[@class="sweet-alert showSweetAlert visible"]'));
    SFclick (By.xpath('//button[@class="confirm"]'));
    JSwaitForNotExist('div.toast-message');
    SFsleep (2);

nowWeDoing='идем удалять сейлса';

    SFclick (By.xpath('//ul[@class="nav nav-pills nav-stacked compose-nav"]/li[2]/a'));
    SFsleep(2);
    driver.executeScript("$('.mdDataTable tbody tr td:contains(\"salestest testsales\")').dblclick();");
    SFsleep (2);
    SFclick (By.xpath('//button[@ng-click="deleteWorker()"]'));
    SFwaitForLocated (By.xpath('//div[@class="sweet-alert showSweetAlert visible"]'));
    SFclick (By.xpath('//button[@class="confirm"]'));
    JSwaitForNotExist('div.toast-message');
    SFsleep (2);

nowWeDoing='идем удалять менеджера';

    SFclick (By.xpath('//ul[@class="nav nav-pills nav-stacked compose-nav"]/li[1]/a'));
    SFsleep(2);
    driver.executeScript("$('.mdDataTable tbody tr td:contains(\"mantest testman\")').dblclick();");
    SFsleep (2);
    SFclick (By.xpath('//button[@ng-click="deleteWorker()"]'));
    SFwaitForLocated (By.xpath('//div[@class="sweet-alert showSweetAlert visible"]'));
    SFclick (By.xpath('//button[@class="confirm"]'));
    SFsleep (1);    
    LogoutFromBoardForeman ();


    endOfTest();
}



//==================================================================================================

module.exports = main;