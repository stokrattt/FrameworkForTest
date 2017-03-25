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

    SFclick (By.xpath('//button[@ng-click="toggleLeft()"]'));
    SFwaitForVisible (By.xpath('//button[@ng-click="toggleLeft()"]'));
    SFclick (By.xpath('//a[@ng-click="vm.goToPage(\'settings.general\', \'\')"]'));
    SFwaitForVisible (By.xpath('//a[@ng-click="vm.goToPage(\'settings.general\', \'\')"]'));
    SFclick (By.xpath('//a[@ui-sref="settings.department"]'));
    SFwaitForVisible (By.xpath('//a[@ui-sref="settings.department"]'));
    SFsleep(2);
//Создаем менеджера***********************************************
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
    SFwaitForLocated (By.xpath('//table[@class="clients table table-striped mdDataTable"]//tr//td[contains(text(), "mantest testman")]'));
// Создали****************************************
    SFclick (By.xpath('//ul[@class="nav nav-pills nav-stacked compose-nav"]/li[2]/a'));
    SFsleep(2);

// Создаем сейлса**************************************
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
    SFwaitForLocated (By.xpath('//table[@class="clients table table-striped mdDataTable"]//tr//td[contains(text(), "salestest testsales")]'));
// Создали сейлса**************************************
    SFclick (By.xpath('//ul[@class="nav nav-pills nav-stacked compose-nav"]/li[3]/a'));
    SFsleep(2);
// Создаем драйвера**************************************
    SFclick (By.xpath('//div[@ng-click="vm.openCreateUserModal()"]'));
    SFwaitForVisible (By.xpath('//form[@name="createUserRequest"]'));
    V.driverFirstName = "drivertest";
    V.driverLastName = "testdriver";
    SFsend (By.xpath('//input[@ng-model="request.firstName"]'), V.driverFirstName);
    SFsend (By.xpath('//input[@ng-model="request.lastName"]'), V.driverLastName);
    SFsend(By.xpath('//input[@ng-model="request.phone1"]'), 12345678960);
    SFclick (By.xpath('//button[@ng-click="submitted=true; create(createUserRequest)"]'));
    SFwaitForLocated (By.xpath('//table[@class="clients table table-striped mdDataTable"]//tr//td[contains(text(), "drivertest testdriver")]'));
// Создали драйвера**************************************
    SFclick (By.xpath('//ul[@class="nav nav-pills nav-stacked compose-nav"]/li[4]/a'));
    SFsleep(2);
// Создаем хелпера**************************************
    SFclick (By.xpath('//div[@ng-click="vm.openCreateUserModal()"]'));
    SFwaitForVisible (By.xpath('//form[@name="createUserRequest"]'));
    V.helperFirstName = "helpertest";
    V.helperLastName = "testhelper";
    SFsend (By.xpath('//input[@ng-model="request.firstName"]'), V.helperFirstName);
    SFsend (By.xpath('//input[@ng-model="request.lastName"]'), V.helperLastName);
    SFsend(By.xpath('//input[@ng-model="request.phone1"]'), 12345678960);
    SFclick (By.xpath('//button[@ng-click="submitted=true; create(createUserRequest)"]'));
    SFwaitForLocated (By.xpath('//table[@class="clients table table-striped mdDataTable"]//tr//td[contains(text(), "helpertest testhelper")]'));
// Создали хелпера**************************************
    SFclick (By.xpath('//ul[@class="nav nav-pills nav-stacked compose-nav"]/li[5]/a'));
    SFsleep(2);
// Создаем форемана**************************************
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
// Создали форемана**************************************

    LogoutFromBoard ();

//Заходим под созданным менеджером*************************************
    SFwaitForVisible(By.xpath('//div[@ng-controller="LoginController"]//span[contains(text(),"Move")]'));
    SFsend(By.xpath('//input[@id="email"]'), V.managerAccount);
    SFsend(By.xpath('//input[@id="password"]'), V.managerPass);
    SFclick(By.xpath('//button[@type="submit"]'));
    SFwaitForVisible(By.id('main-content'));

    LogoutFromBoard ();

//Заходим под созданным sales*************************************

    SFwaitForVisible(By.xpath('//div[@ng-controller="LoginController"]//span[contains(text(),"Move")]'));
    SFsend(By.xpath('//input[@id="email"]'), V.salesAccount);
    SFsend(By.xpath('//input[@id="password"]'), V.salesPass);
    SFclick(By.xpath('//button[@type="submit"]'));
    SFwaitForVisible(By.id('main-content'));

    LogoutFromBoard ();

//Заходим под созданным foreman*************************************

    SFwaitForVisible(By.xpath('//div[@ng-controller="LoginController"]//span[contains(text(),"Move")]'));
    SFsend(By.xpath('//input[@id="email"]'), V.foremanAccount);
    SFsend(By.xpath('//input[@id="password"]'), V.foremanPass);
    SFclick(By.xpath('//button[@type="submit"]'));
    SFwaitForVisible(By.id('datatable'));

    LogoutFromBoard ();

    SFsend(By.id('email'), 'roma4ke');
    SFsend(By.id('password'), 'root');
    JSclick('.btn-primary');

    CreateLocalMovingFromBoard ();
    driver.wait(driver.findElement(By.xpath('//a[@ng-click="select(tabs[0])"]')).getText().then(function(text){
        V.request.Id = SFcleanPrice(text);
    }));
    JSselect ('#edit-status', 3);
    SFsend (By.id('edit-moving-from'), 2342342342424);
    SFsend (By.xpath('//input[@ng-model="request.field_moving_to.thoroughfare"]'), 34654564564);
    JSstep (selectTruck);
    SFclick (By.xpath('//button[@ng-click="UpdateRequest()"]'));
    SFwaitForVisible (By.xpath('//button[@ng-click="update(request)"]'));
    SFclick (By.xpath('//button[@ng-click="update(request)"]'));
    SFsleep (5);
    JSwaitForNotExist('div.toast-success');
    SFclick (By.xpath('//button[@ng-click="cancel()"]'));
    SFsleep (1);
    SFclick (By.xpath('//button[@ng-click="toggleLeft()"]'));
    SFclick (By.xpath('//a[@ng-click="vm.goToPage(\'dispatch.local\', \'\')"]'));
    SFsleep (3);
    JSstep ()






    SFclick (By.xpath('//button[@ng-click="toggleLeft()"]'));
    SFwaitForVisible (By.xpath('//button[@ng-click="toggleLeft()"]'));
    SFclick (By.xpath('//a[@ng-click="vm.goToPage(\'settings.general\', \'\')"]'));
    SFwaitForVisible (By.xpath('//a[@ng-click="vm.goToPage(\'settings.general\', \'\')"]'));
    SFclick (By.xpath('//a[@ui-sref="settings.department"]'));
    SFwaitForVisible (By.xpath('//a[@ui-sref="settings.department"]'));
    SFsleep(2);




    // V.ForemanName = SFrandomBukvaSmall(6);   ng-model="request."
    //V.ForemanPasswd = 123;

//    $x('//option[@ng-repeat="(uid, user) in vm.users.foreman | orderBy:\'name\'"][contains(text(),"Test Foreman")]').length

  //  driver.executeScript('return ').then(function(count){IWant(VNotEqual, count, 0)})

    endOfTest();
}



//==================================================================================================

module.exports = main;