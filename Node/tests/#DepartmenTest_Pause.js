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
    SFclick (By.xpath('//div[@ng-click="vm.openCreateUserModal()"]'));
    SFwaitForVisible (By.xpath('//form[@name="createUserRequest"]'));
    SFsend (By.xpath('//input[@ng-model="request.firstName"]'), V.client.name);
    SFsend (By.xpath('//input[@ng-model="request.lastName"]'), V.client.fam);

   // V.ForemanName = SFrandomBukvaSmall(6);
    //V.ForemanPasswd = 123;

//    $x('//option[@ng-repeat="(uid, user) in vm.users.foreman | orderBy:\'name\'"][contains(text(),"Test Foreman")]').length

  //  driver.executeScript('return ').then(function(count){IWant(VNotEqual, count, 0)})

    endOfTest();
}



//==================================================================================================

module.exports = main;