module.exports = function main(SF, JS, MF, LF, JSstep, VD, V, By, until,FileDetector, system, condition, config,constants) {
        global.fiber = Fiber.current;

    //=========================начинаем писать тест=============================
    SF.get(V.adminURL);
    LF.LoginToBoardAsCustom(V.adminLogin,V.adminPassword);
    MF.Board_OpenSettingsGeneral();
    SF.click(By.linkText('Extra Services'));
    SF.sleep(3);
    driver.wait(driver.executeScript("return $('tr[ng-repeat=\"(index,  value) in vm.equipment_fee.by_mileage\"]').length").then(function (check) {
        V.FeeLength = check;
    }),config.timeout);
    SF.sleep(1);
    if (V.FeeLength != 0) {
        for (let i=0; i < V.FeeLength; i++) {
            SF.click (By.xpath('//div[@ng-click="vm.removeEquipmentFee(index)"]/i'));
            MF.SweetConfirm ();
            SF.sleep(2);
        }
    }
    MF.BoardSettings_ClickFuelSurcharge();
    SF.clear (By.xpath('//input[@ng-model="vm.fuel_surcharge.def_local"]'));
    SF.send (By.xpath('//input[@ng-model="vm.fuel_surcharge.def_local"]'), 10);
    driver.wait(driver.executeScript("return $('tr[ng-repeat=\"(index, amount) in vm.surcharge\"]').length").then(function (check) {
        V.FuelMileage = check;
    }),config.timeout);
    SF.sleep(1);
    JS.scroll('.acc_title');
    SF.sleep(2);
    if (V.FuelMileage != 0) {
        for (let i=0; i < V.FuelMileage; i++) {
            SF.click (By.xpath('//div[@ng-click="vm.removeSurcharge(index)"]/i'));
            MF.SweetConfirm ();
            SF.sleep(1);
        }
    }
    SF.click(By.linkText('Contract page'));
    SF.sleep (2);
    driver.wait(driver.executeScript("if($('input[ng-model=\"contract_page.pushTips\"]').hasClass('ng-not-empty')){" +
        "return true;}else{$('input[ng-model=\"contract_page.pushTips\"]').click()}"),config.timeout);
    SF.sleep(0.5);
    driver.wait(driver.executeScript("if($('input[ng-model=\"contract_page.lessInitialContract\"]').hasClass('ng-empty')){" +
        "return true;}else{$('input[ng-model=\"contract_page.lessInitialContract\"]').click()}"),config.timeout);
    SF.sleep(0.5);
    SF.click (By.xpath('//button[@ng-click="save()"]'));
    SF.sleep (5); //сохранялка

    SF.click(By.xpath('//a[@ui-sref="settings.calculator"]'));
    SF.sleep(2);

    SF.click(By.linkText('Basic Settings'));
    SF.sleep(1);
    driver.wait(driver.executeScript("if($('input[ng-model=\"vm.calcSettings.calcauto\"]').hasClass('ng-not-empty')){" +
        "return true;}else{$('input[ng-model=\"vm.calcSettings.calcauto\"] ~span').click()}"),config.timeout);
    SF.sleep(0.5);
    driver.wait(driver.executeScript("if($('div[ng-repeat=\"(id, value) in vm.allowedServiceTypes\"]:has(label:contains(\"Moving\")):first input:first').hasClass('ng-not-empty')){" +
        "return true;}else{$('div[ng-repeat=\"(id, value) in vm.allowedServiceTypes\"]:has(label:contains(\"Moving\")):first span:first').click()}"),config.timeout);
    driver.wait(driver.executeScript("if($('div[ng-repeat=\"(id, value) in vm.allowedServiceTypes\"]:has(label:contains(\"Moving\")):first input:last').hasClass('ng-not-empty')){" +
        "return true;}else{$('div[ng-repeat=\"(id, value) in vm.allowedServiceTypes\"]:has(label:contains(\"Moving\")):first span:last').click()}"),config.timeout);
    SF.sleep(0.5);
    driver.wait(driver.executeScript("if($('div[ng-repeat=\"(id, value) in vm.allowedServiceTypes\"]:has(label:contains(\"Moving & Storage\")):first input:first').hasClass('ng-not-empty')){" +
        "return true;}else{$('div[ng-repeat=\"(id, value) in vm.allowedServiceTypes\"]:has(label:contains(\"Moving & Storage\")):first span:first').click()}"),config.timeout);
    driver.wait(driver.executeScript("if($('div[ng-repeat=\"(id, value) in vm.allowedServiceTypes\"]:has(label:contains(\"Moving & Storage\")):first input:last').hasClass('ng-not-empty')){" +
        "return true;}else{$('div[ng-repeat=\"(id, value) in vm.allowedServiceTypes\"]:has(label:contains(\"Moving & Storage\")):first span:last').click()}"),config.timeout);
    SF.sleep(0.5);
    driver.wait(driver.executeScript("if($('div[ng-repeat=\"(id, value) in vm.allowedServiceTypes\"]:has(label:contains(\"Loading Help\")):first input:first').hasClass('ng-not-empty')){" +
        "return true;}else{$('div[ng-repeat=\"(id, value) in vm.allowedServiceTypes\"]:has(label:contains(\"Loading Help\")):first span:first').click()}"),config.timeout);
    driver.wait(driver.executeScript("if($('div[ng-repeat=\"(id, value) in vm.allowedServiceTypes\"]:has(label:contains(\"Loading Help\")):first input:last').hasClass('ng-not-empty')){" +
        "return true;}else{$('div[ng-repeat=\"(id, value) in vm.allowedServiceTypes\"]:has(label:contains(\"Loading Help\")):first span:last').click()}"),config.timeout);
    SF.sleep(0.5);
    driver.wait(driver.executeScript("if($('div[ng-repeat=\"(id, value) in vm.allowedServiceTypes\"]:has(label:contains(\"Unloading Help\")):first input:first').hasClass('ng-not-empty')){" +
        "return true;}else{$('div[ng-repeat=\"(id, value) in vm.allowedServiceTypes\"]:has(label:contains(\"Unloading Help\")):first span:first').click()}"),config.timeout);
    driver.wait(driver.executeScript("if($('div[ng-repeat=\"(id, value) in vm.allowedServiceTypes\"]:has(label:contains(\"Unloading Help\")):first input:last').hasClass('ng-not-empty')){" +
        "return true;}else{$('div[ng-repeat=\"(id, value) in vm.allowedServiceTypes\"]:has(label:contains(\"Unloading Help\")):first span:last').click()}"),config.timeout);
    SF.sleep(0.5);
    driver.wait(driver.executeScript("if($('div[ng-repeat=\"(id, value) in vm.allowedServiceTypes\"]:has(label:contains(\"Flat Rate\")):first input:first').hasClass('ng-not-empty')){" +
        "return true;}else{$('div[ng-repeat=\"(id, value) in vm.allowedServiceTypes\"]:has(label:contains(\"Flat Rate\")):first span:first').click()}"),config.timeout);
    driver.wait(driver.executeScript("if($('div[ng-repeat=\"(id, value) in vm.allowedServiceTypes\"]:has(label:contains(\"Flat Rate\")):first input:last').hasClass('ng-not-empty')){" +
        "return true;}else{$('div[ng-repeat=\"(id, value) in vm.allowedServiceTypes\"]:has(label:contains(\"Flat Rate\")):first span:last').click()}"),config.timeout);
    SF.sleep(0.5);
    driver.wait(driver.executeScript("if($('div[ng-repeat=\"(id, value) in vm.allowedServiceTypes\"]:has(label:contains(\"Overnight\")):first input:first').hasClass('ng-not-empty')){" +
        "return true;}else{$('div[ng-repeat=\"(id, value) in vm.allowedServiceTypes\"]:has(label:contains(\"Overnight\")):first span:first').click()}"),config.timeout);
    driver.wait(driver.executeScript("if($('div[ng-repeat=\"(id, value) in vm.allowedServiceTypes\"]:has(label:contains(\"Overnight\")):first input:last').hasClass('ng-not-empty')){" +
        "return true;}else{$('div[ng-repeat=\"(id, value) in vm.allowedServiceTypes\"]:has(label:contains(\"Overnight\")):first span:last').click()}"),config.timeout);
    SF.sleep(0.5);
    driver.wait(driver.executeScript("if($('div[ng-repeat=\"(id, value) in vm.allowedServiceTypes\"]:has(label:contains(\"Long Distance\")):first input:first').hasClass('ng-not-empty')){" +
        "return true;}else{$('div[ng-repeat=\"(id, value) in vm.allowedServiceTypes\"]:has(label:contains(\"Long Distance\")):first span:first').click()}"),config.timeout);
    driver.wait(driver.executeScript("if($('div[ng-repeat=\"(id, value) in vm.allowedServiceTypes\"]:has(label:contains(\"Long Distance\")):first input:last').hasClass('ng-not-empty')){" +
        "return true;}else{$('div[ng-repeat=\"(id, value) in vm.allowedServiceTypes\"]:has(label:contains(\"Long Distance\")):first span:last').click()}"),config.timeout);
    SF.sleep(1);
    SF.click(By.linkText('Travel Time'));
    SF.sleep(2);
    driver.wait(driver.executeScript("if($('input[ng-model=\"vm.calcSettings.travelTime\"]').hasClass('ng-not-empty')){" +
        "return true;}else{$('input[ng-model=\"vm.calcSettings.travelTime\"] ~span').click()}"),config.timeout);
    SF.sleep(1);

    driver.wait(driver.executeScript("if ($('input[ng-model=\"vm.calcSettings.doubleDriveTime\"]').hasClass('ng-empty')){" +
        "return true;} else {$('input[ng-model=\"vm.calcSettings.doubleDriveTime\"]~span').click()}"),config.timeout);
    SF.sleep(1);
    driver.wait(driver.executeScript("if($('input[ng-model=\"vm.calcSettings.doubleDriveTime\"]').hasClass('ng-empty')){" +
        "return true;}else{$('input[ng-model=\"vm.calcSettings.doubleDriveTime\"] ~span').click()}"),config.timeout);
    SF.sleep(1);
    SF.click(By.xpath('//input[@ng-model="vm.calcSettings.doubleDriveTimeName"]'));
    SF.sleep(4);
    SF.click(By.linkText('Form Style'));
    SF.sleep(2);
    driver.wait(driver.executeScript("return $('div[ng-if=\"isSecondStepFirst()\"]').length").then(function (length) {
        V.lengthCalc = length;
    }),config.timeout);
    SF.sleep(1);
    if (V.lengthCalc == 0) {
        SF.click(By.xpath('//span[@ng-click="changeStepsOrder()"]/i[2]'));
        SF.sleep(3);
    }

    SF.click(By.linkText('Top Form Text'));
    SF.sleep(2);
    driver.wait(driver.executeScript("if ($('input[ng-model=\"vm.movecalcFormSettings.showHowDidYouHearAboutUsField\"]').hasClass('ng-not-empty')){" +
        "return true;} else {$('input[ng-model=\"vm.movecalcFormSettings.showHowDidYouHearAboutUsField\"]~span:visible').click()}"),config.timeout);
    SF.sleep(2);

    SF.click(By.linkText('Basic Settings'));
    SF.select(By.xpath('//select[@ng-model="vm.calcSettings.min_hours"]'),1);
    MF.Board_OpenCompanyServices();
	//========================селекторы галочек
	V.localSelector = '//input[@ng-model="vm.basicSettings.services.localMoveOn"]';
	V.overnightSelector = '//input[@ng-model="vm.basicSettings.services.overnightStorageOn"]';
	V.loadingSelector = '//input[@ng-model="vm.basicSettings.services.loadingHelpOn"]';
	V.unloadingSelector = '//input[@ng-model="vm.basicSettings.services.unloadingHelpOn"]';
	V.storageSelector = '//input[@ng-model="vm.basicSettings.services.localMoveStorageOn"]';
	V.flatSelector = '//input[@ng-model="vm.basicSettings.isflat_rate_miles"]';
	V.longSelector = '//input[@ng-model="vm.basicSettings.islong_distance_miles"]';

    V.CompanyServices={};
    JS.scroll ('h4:contains("Company Services Settings")');
    SF.sleep(2);
    driver.wait(driver.findElements(By.xpath(V.localSelector+'/parent::div[contains(@class,"checked")]')).then(function(arr){
        V.CompanyServices.Local=(arr.length==1);
    }),config.timeout);
    driver.wait(driver.findElements(By.xpath(V.overnightSelector+'/parent::div[contains(@class,"checked")]')).then(function(arr){
        V.CompanyServices.Overnight=(arr.length==1);
    }),config.timeout);
    driver.wait(driver.findElements(By.xpath(V.loadingSelector+'/parent::div[contains(@class,"checked")]')).then(function(arr){
        V.CompanyServices.Loading=(arr.length==1);
    }),config.timeout);
    driver.wait(driver.findElements(By.xpath(V.unloadingSelector+'/parent::div[contains(@class,"checked")]')).then(function(arr){
        V.CompanyServices.Unloading=(arr.length==1);
    }),config.timeout);
    driver.wait(driver.findElements(By.xpath(V.storageSelector+'/parent::div[contains(@class,"checked")]')).then(function(arr){
        V.CompanyServices.Storage=(arr.length==1);
    }),config.timeout);
    driver.wait(driver.findElements(By.xpath(V.flatSelector+'/parent::div[contains(@class,"checked")]')).then(function(arr){
        V.CompanyServices.Flat=(arr.length==1);
    }),config.timeout);
    driver.wait(driver.findElements(By.xpath(V.longSelector+'/parent::div[contains(@class,"checked")]')).then(function(arr){
        V.CompanyServices.Long=(arr.length==1);
    }),config.timeout);
    SF.sleep(1);
    if (!V.CompanyServices.Local) {SF.click(By.xpath(V.localSelector+'/..'));}
    if (!V.CompanyServices.Overnight) {SF.click(By.xpath(V.overnightSelector+'/..'));}
    if (!V.CompanyServices.Loading) {SF.click(By.xpath(V.loadingSelector+'/..'));}
    if (!V.CompanyServices.Unloading) {SF.click(By.xpath(V.unloadingSelector+'/..'));}
    if (!V.CompanyServices.Storage) {SF.click(By.xpath(V.storageSelector+'/..'));}
    if (!V.CompanyServices.Flat) {SF.click(By.xpath(V.flatSelector+'/..'));}
    if (!V.CompanyServices.Long) {SF.click(By.xpath(V.longSelector+'/..'));}
    SF.sleep(2);
    MF.Board_OpenSettingsGeneral ();
    SF.sleep (3);
    JS.scroll ('h1:contains("General Settings ")');
    SF.click(By.xpath('(//li[@ng-repeat="tab in vm.tabs"]/a[@ng-click="vm.select(tab)"])[1]'));
    SF.sleep (3);
    JS.scroll ('input[ng-model=\\"basicSettings.isflat_rate_miles\\"]');
    driver.wait(driver.executeScript("if($('input[ng-model=\"basicSettings.isflat_rate_miles\"]').hasClass('ng-not-empty')){" +
        "return true;}else{$('input[ng-model=\"basicSettings.isflat_rate_miles\"]').click()}"));
    SF.sleep(3);

    condition.nowWeDoing = 'тут заходим в маркетинг тулс и выключаем их';
    JS.scroll ('h1:contains("General Settings ")');
    SF.click(By.linkText('Marketing Tools'));
    SF.sleep(3);
    driver.wait(driver.executeScript("if($('input[ng-model=\"vm.basicSettings.promoTextOn\"]').hasClass('ng-not-empty')){" +
        "return true;}else{$('input[ng-model=\"vm.basicSettings.promoTextOn\"]').click()}"),config.timeout);
    SF.sleep(3);
    driver.wait(driver.executeScript("if($('input[ng-model=\"vm.basicSettings.localDistountOn\"]').hasClass('ng-not-empty')){" +
        "return true;}else{$('input[ng-model=\"vm.basicSettings.localDistountOn\"]').click()}"),config.timeout);
    SF.sleep(3);
    driver.wait(driver.executeScript("if($('input[ng-model=\"vm.basicSettings.longDistanceDistountOn\"]').hasClass('ng-not-empty')){" +
        "return true;}else{$('input[ng-model=\"vm.basicSettings.longDistanceDistountOn\"]').click()}"),config.timeout);
    SF.sleep(4);

	condition.nowWeDoing = 'включение настройки пэдинг-инфо,если тест упал';
	MF.Board_OpenSettingsGeneral();
	MF.Board_OpenSettingsAccountPagePendingInfo();
	driver.wait(driver.executeScript("if($('input[ng-model=\"setting\"] span').hasClass('ng-not-empty')){return true;}else{$('input[ng-model=\"setting\"] span').click()}"),config.timeout);
	SF.sleep(2);
	MF.WaitWhileToaster();

    //=========================закончили писать тест=============================
    SF.endOfTest();
};
