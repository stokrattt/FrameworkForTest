module.exports = function main(SF, JS, MF, LF, JSstep, VD, V, By, until,FileDetector, system, condition, config,constants) {
    global.fiber = Fiber.current;
    V.client = {};
    V.client.name = SF.randomBukva(6) + '_t';
    V.client.fam = SF.randomBukva(6) + '_t';
    V.client.phone = SF.randomCifra(10);
    V.client.email = SF.randomBukvaSmall(6) + '@' + SF.randomBukvaSmall(4) + '.tes';
    V.client.passwd = 123;

    //=========================начинаем писать тест=============================
    SF.get(V.adminURL);
    LF.LoginToBoardAs_Roma4ke_Admin();
    MF.Board_OpenSettingsGeneral ();

condition.nowWeDoing = 'выставляем адреса и зип коды на странице дженерал';
    SF.clear(By.xpath('//input[@ng-model="vm.basicSettings.company_name"]'));
    SF.send(By.xpath('//input[@ng-model="vm.basicSettings.company_name"]'), 'Stage Themovebaord');

    SF.clear(By.xpath('//input[@ng-model="vm.basicSettings.company_email"]'));
    SF.send(By.xpath('//input[@ng-model="vm.basicSettings.company_email"]'), 'bostonflat.test@mail.ru');

    SF.clear(By.xpath('//input[@ng-model="vm.basicSettings.company_phone"]'));
    SF.send(By.xpath('//input[@ng-model="vm.basicSettings.company_phone"]'), '(111) 111-11111');

    SF.clear(By.xpath('//input[@ng-model="vm.basicSettings.company_address"]'));
    SF.send(By.xpath('//input[@ng-model="vm.basicSettings.company_address"]'), 'Boston, 02135');

    SF.select(By.xpath('//select[@ng-model="vm.basicSettings.main_state"]'), 'MA');

    SF.clear(By.xpath('//input[@ng-model="vm.basicSettings.parking_address"]'));
    SF.send(By.xpath('//input[@ng-model="vm.basicSettings.parking_address"]'), '02135');

    SF.clear(By.xpath('//input[@ng-model="vm.basicSettings.storage_city"]'));
    SF.send(By.xpath('//input[@ng-model="vm.basicSettings.storage_city"]'), 'Company Storage');

    SF.clear(By.xpath('//input[@ng-model="vm.basicSettings.website_url"]'));
    SF.send(By.xpath('//input[@ng-model="vm.basicSettings.website_url"]'), 'http://stage.themoveboard.com:8001/');

    SF.clear(By.xpath('//input[@ng-model="vm.basicSettings.client_page_url"]'));
    SF.send(By.xpath('//input[@ng-model="vm.basicSettings.client_page_url"]'), 'http://stage.themoveboard.com:8001/');

    SF.clear(By.xpath('//input[@ng-model="vm.basicSettings.company_logo_url"]'));
    SF.send(By.xpath('//input[@ng-model="vm.basicSettings.company_logo_url"]'), 'http://stage.themoveboard.com:8001/moveBoard/content/img/moveboardlogo.png');

    JS.scroll ('input[ng-model=\\"basicSettings.isflat_rate_miles\\"]');
    driver.wait(driver.executeScript("if($('input[ng-model=\"basicSettings.isflat_rate_miles\"]').hasClass('ng-not-empty')){" +
        "return true;}else{$('input[ng-model=\"basicSettings.isflat_rate_miles\"]').click()}"),config.timeout);
    SF.sleep(3);
    SF.clear(By.xpath('//input[@ng-model="basicSettings.flat_rate_miles"]'));
    SF.send(By.xpath('//input[@ng-model="basicSettings.flat_rate_miles"]'), '150');

    driver.wait(driver.executeScript("if($('input[ng-model=\"basicSettings.long_distance_miles\"]').hasClass('ng-not-empty')){" +
        "return true;}else{$('input[ng-model=\"basicSettings.long_distance_miles\"]').click()}"),config.timeout);
    SF.sleep(3);
    SF.clear(By.xpath('//input[@ng-model="basicSettings.long_distance_miles"]'));
    SF.send(By.xpath('//input[@ng-model="basicSettings.long_distance_miles"]'), '325');

condition.nowWeDoing = 'создаем траки 10 штук';
    JS.scroll ('.pageheader');
    SF.click (By.linkText('Trucks'));
    SF.waitForLocated (By.xpath('button[@ng-click="vm.isAddTruck = true"]'));
    SF.click(By.xpath('//button[@ng-click="vm.isAddTruck = true"]'));
    SF.send(By.xpath('//input[@ng-model="vm.new_truck.name"]'), "For Test1");
    SF.click(By.xpath('//div[@ng-click="vm.addTruck(vm.new_truck, false)"]'));
    SF.sleep(2);
    SF.click(By.xpath('//button[@ng-click="vm.isAddTruck = true"]'));
    SF.send(By.xpath('//input[@ng-model="vm.new_truck.name"]'), "For Test2");
    SF.click(By.xpath('//div[@ng-click="vm.addTruck(vm.new_truck, false)"]'));
    SF.sleep(2);SF.click(By.xpath('//button[@ng-click="vm.isAddTruck = true"]'));
    SF.send(By.xpath('//input[@ng-model="vm.new_truck.name"]'), "For Test3");
    SF.click(By.xpath('//div[@ng-click="vm.addTruck(vm.new_truck, false)"]'));
    SF.sleep(2);SF.click(By.xpath('//button[@ng-click="vm.isAddTruck = true"]'));
    SF.send(By.xpath('//input[@ng-model="vm.new_truck.name"]'), "For Test4");
    SF.click(By.xpath('//div[@ng-click="vm.addTruck(vm.new_truck, false)"]'));
    SF.sleep(2);SF.click(By.xpath('//button[@ng-click="vm.isAddTruck = true"]'));
    SF.send(By.xpath('//input[@ng-model="vm.new_truck.name"]'), "For Test5");
    SF.click(By.xpath('//div[@ng-click="vm.addTruck(vm.new_truck, false)"]'));
    SF.sleep(2);SF.click(By.xpath('//button[@ng-click="vm.isAddTruck = true"]'));
    SF.send(By.xpath('//input[@ng-model="vm.new_truck.name"]'), "For Test6");
    SF.click(By.xpath('//div[@ng-click="vm.addTruck(vm.new_truck, false)"]'));
    SF.sleep(2);SF.click(By.xpath('//button[@ng-click="vm.isAddTruck = true"]'));
    SF.send(By.xpath('//input[@ng-model="vm.new_truck.name"]'), "For Test7");
    SF.click(By.xpath('//div[@ng-click="vm.addTruck(vm.new_truck, false)"]'));
    SF.sleep(2);SF.click(By.xpath('//button[@ng-click="vm.isAddTruck = true"]'));
    SF.send(By.xpath('//input[@ng-model="vm.new_truck.name"]'), "For Test8");
    SF.click(By.xpath('//div[@ng-click="vm.addTruck(vm.new_truck, false)"]'));
    SF.sleep(2);SF.click(By.xpath('//button[@ng-click="vm.isAddTruck = true"]'));
    SF.send(By.xpath('//input[@ng-model="vm.new_truck.name"]'), "For Test9");
    SF.click(By.xpath('//div[@ng-click="vm.addTruck(vm.new_truck, false)"]'));
    SF.sleep(2);SF.click(By.xpath('//button[@ng-click="vm.isAddTruck = true"]'));
    SF.send(By.xpath('//input[@ng-model="vm.new_truck.name"]'), "For Test10");
    SF.click(By.xpath('//div[@ng-click="vm.addTruck(vm.new_truck, false)"]'));
    SF.sleep(2);
condition.nowWeDoing = 'включаем паймент если выключен';
    SF.click (By.linkText('Payments'));
    driver.wait(driver.executeScript("if($('input[ng-model=\"vm.basicSettings.AuthPaymentSSL\"]').hasClass('ng-not-empty')){" +
        "return true;}else{$('input[ng-model=\"vm.basicSettings.AuthPaymentSSL\"] ~span').click()}"),config.timeout);
    SF.clear(By.xpath('//input[@ng-model="vm.login_id"]'));
    SF.send(By.xpath('//input[@ng-model="vm.login_id"]'), '4s8A8m3Lj');
    SF.clear(By.xpath('//input[@ng-model="vm.transaction_key"]'));
    SF.send(By.xpath('//input[@ng-model="vm.transaction_key"]'), '66sqEb8Cb385y5Ea');
condition.nowWeDoing = 'включаем маркетинг тулс';
    SF.click(By.linkText('Marketing Tools'));
    SF.sleep(0.5);
    driver.wait(driver.executeScript("if($('input[ng-model=\"vm.basicSettings.promoTextOn\"]').hasClass('ng-not-empty')){" +
        "return true;}else{$('input[ng-model=\"vm.basicSettings.promoTextOn\"]').parent().click()}"),config.timeout);
    SF.sleep(0.5);
    SF.click(By.xpath('//input[@ng-model="vm.basicSettings.promoTextOn"]'));
    SF.clear(By.xpath('//input[@ng-model="vm.basicSettings.promoText"]'));
    SF.send(By.xpath('//input[@ng-model="vm.basicSettings.promoText"]'), 'Promotion for all');
    driver.wait(driver.executeScript("if($('input[ng-model=\"vm.basicSettings.localDistountOn\"]').hasClass('ng-not-empty')){" +
        "return true;}else{$('input[ng-model=\"vm.basicSettings.localDistountOn\"]').parent().click()}"),config.timeout);
    SF.sleep(0.5);
    SF.clear(By.xpath('//input[@ng-model="vm.basicSettings.localDistount"]'));
    SF.send(By.xpath('//input[@ng-model="vm.basicSettings.localDistount"]'), '25');

    driver.wait(driver.executeScript("if($('input[ng-model=\"vm.basicSettings.longDistanceDistountOn\"]').hasClass('ng-not-empty')){" +
        "return true;}else{$('input[ng-model=\"vm.basicSettings.longDistanceDistountOn\"]').parent().click()}"),config.timeout);
    SF.sleep(0.5);
    SF.clear(By.xpath('//input[@ng-model="vm.basicSettings.longDistanceDistount"]'));
    SF.send(By.xpath('//input[@ng-model="vm.basicSettings.longDistanceDistount"]'), '25');
    driver.wait(driver.executeScript("if($('input[ng-model=\"vm.basicSettings.globalShowCoupons\"]').hasClass('ng-not-empty')){" +
        "return true;}else{$('input[ng-model=\"vm.basicSettings.globalShowCoupons\"] ~span').click()}"),config.timeout);
    SF.click(By.xpath('//button[@ng-click="vm.createCoupon()"]'));
    SF.waitForLocated (By.xpath('//button[@ng-click="createNewCoupon()"]'));
    SF.sleep(2);
    SF.click(By.xpath('//input[@ng-change="changeLimit()"]'));
    SF.click(By.xpath('//button[@ng-click="createNewCoupon()"]'));
    SF.sleep(3);

condition.nowWeDoing = 'идем в департмент создавать всех юзеров для тестов';
    MF.Board_OpenSettingsDepartment ();
    MF.WaitWhileBusy ();
    MF.Department_ClickCreateUser ();

condition.nowWeDoing = 'create Test Admin';

    MF.Department_SendFirstLastNameAndPhone ('Test', 'Admin', 12345678960);
    MF.Department_User_OpenAccount();
    MF.Department_SendAccountNameAndPassword ('TestAdmin', 'test');
    MF.Department_User_OpenNotificationTab();
    MF.Department_SendNotificationEmail ('TestAdmin@ya.com');
    MF.Department_CreateUser();

condition.nowWeDoing = 'create emilia';

    MF.Department_OpenSales();
    MF.Department_ClickCreateUser ();
    MF.Department_SendFirstLastNameAndPhone ('emilia', 'clark', 12345678960);
    MF.Department_User_OpenAccount();
    MF.Department_SendAccountNameAndPassword ('emilia', '123');
    MF.Department_User_OpenNotificationTab();
    MF.Department_SendNotificationEmail ('emilia@ya.com');
    MF.Department_OpenRateCommissions ();
    SF.click(By.xpath('//input[@ng-model="request.excludeFuelMS"]/..'));
    SF.click(By.xpath('//input[@ng-model="request.excludeValuationMS"]/..'));
    SF.click(By.xpath('//input[@ng-model="request.excludePackingMS"]/..'));
    SF.click(By.xpath('//input[@ng-model="request.excludeAdditionalMS"]/..'));
    MF.Department_SendLocalMoveOfficeCom (10);
    MF.Department_SendLongDistanseOfficeCom (10);
    MF.Department_CreateUser();

condition.nowWeDoing = 'create Jack Sales';
    MF.Department_ClickCreateUser ();
    MF.Department_SendFirstLastNameAndPhone ('JackSales', 'donotdelete', 12345678960);
    MF.Department_User_OpenAccount();
    MF.Department_SendAccountNameAndPassword ('jack2@ya.com', '123');
    MF.Department_User_OpenNotificationTab();
    MF.Department_SendNotificationEmail ('jack2@ya.com');
    MF.Department_OpenRateCommissions ();
    MF.Department_SendLocalMoveOfficeCom (10);
    MF.Department_SendLongDistanseOfficeCom (10);
    MF.Department_CreateUser();

condition.nowWeDoing = 'create SalesExclude';
    MF.Department_ClickCreateUser ();
    MF.Department_SendFirstLastNameAndPhone ('SalesExclude', 'Test', 12345678960);
    MF.Department_User_OpenAccount();
    MF.Department_SendAccountNameAndPassword ('SalesExclude', '123');
    MF.Department_User_OpenNotificationTab();
    MF.Department_SendNotificationEmail ('SalesExclude@ya.com');
    MF.Department_OpenRateCommissions ();
    SF.click(By.xpath('//input[@ng-model="request.excludeFuelMS"]/..'));
    SF.click(By.xpath('//input[@ng-model="request.excludePackingMS"]/..'));
    SF.click(By.xpath('//input[@ng-model="request.excludeAdditionalMS"]/..'));
    MF.Department_SendLocalMoveOfficeCom (10);
    MF.Department_SendLongDistanseOfficeCom (10);
    MF.Department_OpenAddServices ();
    SF.click(By.xpath('//label[contains(text(), "Parking Ticket")]/div'));
    MF.Department_SaveAddServices();
    MF.Department_CreateUser();

condition.nowWeDoing = 'создаем test driver';
    MF.Department_OpenDriver();
    MF.Department_ClickCreateUser ();
    MF.Department_SendFirstLastNameAndPhone ('test', 'driver', 12345678960);
    MF.Department_CreateUser();

condition.nowWeDoing = 'создаем Test Helper 1';
    MF.Department_OpenHelper ();
    MF.Department_ClickCreateUser ();
    MF.Department_SendFirstLastNameAndPhone ('Test', 'Helper1', 12345678960);
    MF.Department_OpenRateCommissions ();
    // MF.Department_ClickClosingPrice ();
    MF.Department_SelectCommissionFromTotal();
    MF.Department_SendCommissionFromTotal (10);
    SF.click(By.xpath('//input[@ng-model="request.excludeFuelMS"]/..'));
    SF.click(By.xpath('//input[@ng-model="request.excludeAdditionalMS"]/..'));
    LF.Department_TurnOnAllCommission ();
    MF.Department_CreateUser();

condition.nowWeDoing = 'создаем Test Helper 2';
    MF.Department_ClickCreateUser ();
    MF.Department_SendFirstLastNameAndPhone ('Test', 'Helper2', 12345678960);
    MF.Department_OpenRateCommissions ();
    // MF.Department_ClickClosingPrice ();
    MF.Department_SelectCommissionFromTotal();
    MF.Department_SendCommissionFromTotal (10);
    SF.click(By.xpath('//input[@ng-model="request.excludeFuelMS"]/..'));
    SF.click(By.xpath('//input[@ng-model="request.excludeAdditionalMS"]/..'));
    LF.Department_TurnOnAllCommission ();
    MF.Department_CreateUser();

condition.nowWeDoing = 'создаем Test Helper 3';
    MF.Department_ClickCreateUser ();
    MF.Department_SendFirstLastNameAndPhone ('Test', 'Helper3', 12345678960);
    MF.Department_OpenRateCommissions ();
    // MF.Department_ClickClosingPrice ();
    MF.Department_SelectCommissionFromTotal();
    MF.Department_SendCommissionFromTotal (10);
    MF.Department_CreateUser();
condition.nowWeDoing = 'создаем FlatRateForeman';
    MF.Department_OpenForeman();
    MF.Department_ClickCreateUser ();
    MF.Department_SendFirstLastNameAndPhone ('FlatRate', 'Foreman', 12345678960);
    MF.Department_User_OpenAccount();
    MF.Department_SendAccountNameAndPassword ('FlatRateForeman', '123');
    MF.Department_User_OpenNotificationTab();
    SF.send(By.xpath('//input[@ng-model="request.field_notification_mail"]'), 'FlatRateForeman@mail.com');
    MF.Department_OpenRateCommissions ();
    // MF.Department_ClickClosingPrice ();
    MF.Department_SelectCommissionFromTotal();
    MF.Department_SendCommissionFromTotal (10);
    SF.click(By.xpath('//input[@ng-model="request.excludeFuelMS"]/..'));
    SF.click(By.xpath('//input[@ng-model="request.excludeValuationMS"]/..'));
    SF.click(By.xpath('//input[@ng-model="request.excludePackingMS"]/..'));
    SF.click(By.xpath('//input[@ng-model="request.excludeAdditionalMS"]/..'));
    LF.Department_TurnOnAllCommission ();
    MF.Department_CreateUser();
condition.nowWeDoing = 'создаем ForemanExclude';
    MF.Department_OpenForeman();
    MF.Department_ClickCreateUser ();
    MF.Department_SendFirstLastNameAndPhone ('ForemanExclude', 'Test', 12345678960);
    MF.Department_User_OpenAccount();
    MF.Department_SendAccountNameAndPassword ('ForemanExclude', '123');
    MF.Department_User_OpenNotificationTab();
    SF.send(By.xpath('//input[@ng-model="request.field_notification_mail"]'), 'ForemanExclude@ya.com');
    MF.Department_OpenRateCommissions ();
    // MF.Department_ClickClosingPrice ();
    MF.Department_SelectCommissionFromTotal();
    MF.Department_SendCommissionFromTotal (10);
    SF.click(By.xpath('//input[@ng-model="request.excludeFuelMS"]/..'));
    SF.click(By.xpath('//input[@ng-model="request.excludePackingMS"]/..'));
    SF.click(By.xpath('//input[@ng-model="request.excludeAdditionalMS"]/..'));
    LF.Department_TurnOnAllCommission ();
    MF.Department_CreateUser();
condition.nowWeDoing = 'создаем TEstForeman';
    MF.Department_OpenForeman();
    MF.Department_ClickCreateUser ();
    MF.Department_SendFirstLastNameAndPhone ('Test', 'Foreman', 12345678960);
    MF.Department_User_OpenAccount();
    MF.Department_SendAccountNameAndPassword ('TestForeman', '123');
    MF.Department_User_OpenNotificationTab();
    SF.send(By.xpath('//input[@ng-model="request.field_notification_mail"]'), 'TestForeman@mail.com');
    MF.Department_OpenRateCommissions ();
    // MF.Department_ClickClosingPrice ();
    MF.Department_SelectCommissionFromTotal();
    MF.Department_SendCommissionFromTotal (10);
    SF.click(By.xpath('//input[@ng-model="request.excludeFuelMS"]/..'));
    SF.click(By.xpath('//input[@ng-model="request.excludeValuationMS"]/..'));
    SF.click(By.xpath('//input[@ng-model="request.excludePackingMS"]/..'));
    SF.click(By.xpath('//input[@ng-model="request.excludeAdditionalMS"]/..'));
    LF.Department_TurnOnAllCommission ();
    MF.Department_CreateUser();

condition.nowWeDoing = 'создаем ForemanFlow1';
    MF.Department_OpenForeman();
    MF.Department_ClickCreateUser ();
    MF.Department_SendFirstLastNameAndPhone ('Foreman', 'Flow1', 12345678960);
    MF.Department_User_OpenAccount();
    MF.Department_SendAccountNameAndPassword ('ForemanFlow1', '123');
    MF.Department_User_OpenNotificationTab();
    SF.send(By.xpath('//input[@ng-model="request.field_notification_mail"]'), 'for@flow1.co');
    MF.Department_CreateUser();
condition.nowWeDoing = 'create default storage';
    MF.Board_OpenSideBar();
    MF.Board_OpenStorage();
    LF.CreateGeneralDefaultStorage();


    //=========================закончили писать тест=============================
    SF.endOfTest();
};
