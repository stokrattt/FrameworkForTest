module.exports = function main(SF, JS, MF, LF, JSstep, VD, V, By, until,FileDetector, system, condition, config,constants) {
    global.fiber = Fiber.current;
    V.client = {};
    V.client.name = SF.randomBukva(6) + '_t';
    V.client.fam = SF.randomBukva(6) + '_t';
    V.client.phone = SF.randomCifra(10);
    V.client.email = SF.randomBukvaSmall(6) + '@' + SF.randomBukvaSmall(4) + '.tes';
    V.client.passwd = 123;

    //=========================начинаем писать тест=============================

condition.nowWeDoing='Заходим в настройки Company Services';
    SF.get(V.adminURL);
    LF.LoginToBoardAsCustom(V.adminLogin,V.adminPassword);
    MF.Board_OpenCompanyServices();

condition.nowWeDoing='Включаем только Local,Loading,Unloading,Long';

    //========================селекторы галочек
    V.localSelector = '//input[@ng-model="vm.basicSettings.services.localMoveOn"]';
    V.overnightSelector = '//input[@ng-model="vm.basicSettings.services.overnightStorageOn"]';
    V.loadingSelector = '//input[@ng-model="vm.basicSettings.services.loadingHelpOn"]';
    V.unloadingSelector = '//input[@ng-model="vm.basicSettings.services.unloadingHelpOn"]';
    V.storageSelector = '//input[@ng-model="vm.basicSettings.services.localMoveStorageOn"]';
    V.flatSelector = '//input[@ng-model="vm.basicSettings.isflat_rate_miles"]';
    V.longSelector = '//input[@ng-model="vm.basicSettings.islong_distance_miles"]';

    V.CompanyServices={};
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
    JS.scroll ('h4:contains("Company Services Settings")');
    SF.sleep(2);
    if (!V.CompanyServices.Local) {console.log('вкл Local');SF.click(By.xpath(V.localSelector+'/..'));}
    if (V.CompanyServices.Overnight) {console.log('выкл Over');SF.click(By.xpath(V.overnightSelector+'/..'));}
    if (!V.CompanyServices.Loading) {console.log('вкл Load');SF.click(By.xpath(V.loadingSelector+'/..'));}
    if (!V.CompanyServices.Unloading) {console.log('вкл Unload');SF.click(By.xpath(V.unloadingSelector+'/..'));}
    if (V.CompanyServices.Storage) {console.log('выкл Stor');SF.click(By.xpath(V.storageSelector+'/..'));}
    if (!V.CompanyServices.Flat) {console.log('вкл Flat');SF.click(By.xpath(V.flatSelector+'/..'));}
    SF.sleep(1);
    if (V.CompanyServices.Long) {console.log('выкл Long');SF.click(By.xpath(V.longSelector+'/..'));}
    JS.scroll ('div:contains("General Settings")');
    SF.sleep(5);
    MF.Board_Refresh ();
    MF.Board_LogoutAdmin();

condition.nowWeDoing='проверяем на фронте: включено ли только Local,Loading,Unloading,Flat';
    SF.get(V.frontURL);
    JS.waitForExist('input[ng-change=\\"serviceneed = true\\"]:visible');
    SF.sleep(6);
    SF.click(By.xpath('//input[@ng-change="serviceneed = true"]/..'));
    driver.wait(driver.findElements(By.xpath('//select[@ng-model="request.serviceType"]/option[contains(text(),"Local Moving") and ' +
        'not (contains(@class,"ng-hide"))]')).then(function(array){
            VD.IWant(VD.ToEqual,array.length,2,'не работает настройка Local Moving');
    }),config.timeout);
    driver.wait(driver.findElements(By.xpath('//select[@ng-model="request.serviceType"]/option[contains(text(),"Moving With Storage") and ' +
        'not (contains(@class,"ng-hide"))]')).then(function(array){
        VD.IWant(VD.ToEqual,array.length,0,'не работает настройка Moving With Storage');
    }),config.timeout);
    driver.wait(driver.findElements(By.xpath('//select[@ng-model="request.serviceType"]/option[contains(text(),"Loading Help") and ' +
        'not (contains(@class,"ng-hide"))]')).then(function(array){
        VD.IWant(VD.ToEqual,array.length,2,'не работает настройка Loading Help');
    }),config.timeout);
    driver.wait(driver.findElements(By.xpath('//select[@ng-model="request.serviceType"]/option[contains(text(),"Unloading Help") and ' +
        'not (contains(@class,"ng-hide"))]')).then(function(array){
        VD.IWant(VD.ToEqual,array.length,2,'не работает настройка Unloading Help');
    }),config.timeout);
    driver.wait(driver.findElements(By.xpath('//select[@ng-model="request.serviceType"]/option[contains(text(),"Flat Rate") and ' +
        'not (contains(@class,"ng-hide"))]')).then(function(array){
        VD.IWant(VD.ToEqual,array.length,2,'не работает настройка Flat Rate');
    }),config.timeout);
    driver.wait(driver.findElements(By.xpath('//select[@ng-model="request.serviceType"]/option[contains(text(),"Overnight") and ' +
        'not (contains(@class,"ng-hide"))]')).then(function(array){
        VD.IWant(VD.ToEqual,array.length,0,'не работает настройка Overnight');
    }),config.timeout);
    driver.wait(driver.findElements(By.xpath('//select[@ng-model="request.serviceType"]/option[contains(text(),"Long Distance") and ' +
        'not (contains(@class,"ng-hide"))]')).then(function(array){
        VD.IWant(VD.ToEqual,array.length,0,'не работает настройка Long Distance');
    }),config.timeout);

condition.nowWeDoing='проверяем на борде: включено ли только Local,Loading,Unloading,Flat';
    SF.get(V.adminURL);
    LF.LoginToBoardAsCustom(V.adminLogin,V.adminPassword);
    MF.Board_ClickCreate();
    driver.wait(driver.findElements(By.xpath('//select[@ng-model="editrequest.data.field_move_service_type"]/option[contains(text(),"Moving") and ' +
        'not(contains(text(),"Storage"))]')).then(function(array){
        VD.IWant(VD.ToEqual,array.length,1,'не работает настройка Local Moving');
    }),config.timeout);
    driver.wait(driver.findElements(By.xpath('//select[@ng-model="editrequest.data.field_move_service_type"]/option[contains(text(),"Moving & Storage")]'))
        .then(function(array){
        VD.IWant(VD.ToEqual,array.length,0,'не работает настройка Moving & Storage');
    }),config.timeout);
    driver.wait(driver.findElements(By.xpath('//select[@ng-model="editrequest.data.field_move_service_type"]/option[contains(text(),"Loading")]'))
        .then(function(array){
            VD.IWant(VD.ToEqual,array.length,1,'не работает настройка Loading');
        }),config.timeout);
    driver.wait(driver.findElements(By.xpath('//select[@ng-model="editrequest.data.field_move_service_type"]/option[contains(text(),"Unloading")]'))
        .then(function(array){
            VD.IWant(VD.ToEqual,array.length,1,'не работает настройка Unloading');
        }),config.timeout);
    driver.wait(driver.findElements(By.xpath('//select[@ng-model="editrequest.data.field_move_service_type"]/option[contains(text(),"Flat")]'))
        .then(function(array){
            VD.IWant(VD.ToEqual,array.length,1,'не работает настройка Flat');
        }),config.timeout);
    driver.wait(driver.findElements(By.xpath('//select[@ng-model="editrequest.data.field_move_service_type"]/option[contains(text(),"Overnight")]'))
        .then(function(array){
            VD.IWant(VD.ToEqual,array.length,0,'не работает настройка Overnight');
        }),config.timeout);
    driver.wait(driver.findElements(By.xpath('//select[@ng-model="editrequest.data.field_move_service_type"]/option[contains(text(),"Long")]'))
        .then(function(array){
            VD.IWant(VD.ToEqual,array.length,0,'не работает настройка Long');
        }),config.timeout);
    MF.EditRequest_CloseEditRequest();

condition.nowWeDoing='Включаем только Storage,Overnight,Long';
    MF.Board_OpenCompanyServices();
    JS.scroll ('h4:contains("Company Services Settings")');
    SF.sleep(2);
    V.CompanyServices={};
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
    if (V.CompanyServices.Local) {SF.click(By.xpath(V.localSelector+'/..'));}
    if (!V.CompanyServices.Overnight) {SF.click(By.xpath(V.overnightSelector+'/..'));}
    if (V.CompanyServices.Loading) {SF.click(By.xpath(V.loadingSelector+'/..'));}
    if (V.CompanyServices.Unloading) {SF.click(By.xpath(V.unloadingSelector+'/..'));}
    if (!V.CompanyServices.Storage) {SF.click(By.xpath(V.storageSelector+'/..'));}
    if (V.CompanyServices.Flat) {SF.click(By.xpath(V.flatSelector+'/..'));}
    SF.sleep(1);
    if (!V.CompanyServices.Long) {SF.click(By.xpath(V.longSelector+'/..'));}
    SF.sleep(6);
    MF.Board_Refresh ();
    MF.Board_LogoutAdmin();

condition.nowWeDoing='проверяем на фронте: включено ли только Storage,Overnight,Long';
    SF.get(V.frontURL);
    JS.waitForExist('select[ng-model=\\"request.serviceType\\"]:visible');
    SF.sleep(8);
    driver.wait(driver.findElements(By.xpath('//select[@ng-model="request.serviceType"]/option[contains(text(),"Local Moving") and ' +
        'not (contains(@class,"ng-hide"))]')).then(function(array){
        VD.IWant(VD.ToEqual,array.length,0,'не работает настройка Local Moving');
    }),config.timeout);
    driver.wait(driver.findElements(By.xpath('//select[@ng-model="request.serviceType"]/option[contains(text(),"Moving With Storage") and ' +
        'not (contains(@class,"ng-hide"))]')).then(function(array){
        VD.IWant(VD.ToEqual,array.length,2,'не работает настройка Moving With Storage');
    }),config.timeout);
    driver.wait(driver.findElements(By.xpath('//select[@ng-model="request.serviceType"]/option[contains(text(),"Loading Help") and ' +
        'not (contains(@class,"ng-hide"))]')).then(function(array){
        VD.IWant(VD.ToEqual,array.length,0,'не работает настройка Loading Help');
    }),config.timeout);
    driver.wait(driver.findElements(By.xpath('//select[@ng-model="request.serviceType"]/option[contains(text(),"Unloading Help") and ' +
        'not (contains(@class,"ng-hide"))]')).then(function(array){
        VD.IWant(VD.ToEqual,array.length,0,'не работает настройка Unloading Help');
    }),config.timeout);
    driver.wait(driver.findElements(By.xpath('//select[@ng-model="request.serviceType"]/option[contains(text(),"Flat Rate") and ' +
        'not (contains(@class,"ng-hide"))]')).then(function(array){
        VD.IWant(VD.ToEqual,array.length,0,'не работает настройка Flat Rate');
    }),config.timeout);
    driver.wait(driver.findElements(By.xpath('//select[@ng-model="request.serviceType"]/option[contains(text(),"Overnight") and ' +
        'not (contains(@class,"ng-hide"))]')).then(function(array){
        VD.IWant(VD.ToEqual,array.length,2,'не работает настройка Overnight');
    }),config.timeout);
    driver.wait(driver.findElements(By.xpath('//select[@ng-model="request.serviceType"]/option[contains(text(),"Long Distance") and ' +
        'not (contains(@class,"ng-hide"))]')).then(function(array){
        VD.IWant(VD.ToEqual,array.length,2,'не работает настройка Long Distance');
    }),config.timeout);

condition.nowWeDoing='проверяем на борде: включено ли только Storage,Overnight,Long';
    SF.get(V.adminURL);
    LF.LoginToBoardAsCustom(V.adminLogin,V.adminPassword);
    MF.Board_ClickCreate();
    driver.wait(driver.findElements(By.xpath('//select[@ng-model="editrequest.data.field_move_service_type"]/option[contains(text(),"Moving") and ' +
        'not(contains(text(),"Storage"))]')).then(function(array){
        VD.IWant(VD.ToEqual,array.length,0,'не работает настройка Local Moving');
    }),config.timeout);
    driver.wait(driver.findElements(By.xpath('//select[@ng-model="editrequest.data.field_move_service_type"]/option[contains(text(),"Moving & Storage")]'))
        .then(function(array){
            VD.IWant(VD.ToEqual,array.length,1,'не работает настройка Moving & Storage');
        }),config.timeout);
    driver.wait(driver.findElements(By.xpath('//select[@ng-model="editrequest.data.field_move_service_type"]/option[contains(text(),"Loading")]'))
        .then(function(array){
            VD.IWant(VD.ToEqual,array.length,0,'не работает настройка Loading');
        }),config.timeout);
    driver.wait(driver.findElements(By.xpath('//select[@ng-model="editrequest.data.field_move_service_type"]/option[contains(text(),"Unloading")]'))
        .then(function(array){
            VD.IWant(VD.ToEqual,array.length,0,'не работает настройка Unloading');
        }),config.timeout);
    driver.wait(driver.findElements(By.xpath('//select[@ng-model="editrequest.data.field_move_service_type"]/option[contains(text(),"Flat")]'))
        .then(function(array){
            VD.IWant(VD.ToEqual,array.length,0,'не работает настройка Flat');
        }),config.timeout);
    driver.wait(driver.findElements(By.xpath('//select[@ng-model="editrequest.data.field_move_service_type"]/option[contains(text(),"Overnight")]'))
        .then(function(array){
            VD.IWant(VD.ToEqual,array.length,1,'не работает настройка Overnight');
        }),config.timeout);
    driver.wait(driver.findElements(By.xpath('//select[@ng-model="editrequest.data.field_move_service_type"]/option[contains(text(),"Long")]'))
        .then(function(array){
            VD.IWant(VD.ToEqual,array.length,1,'не работает настройка Long');
        }),config.timeout);
    MF.EditRequest_CloseEditRequest();

condition.nowWeDoing='Возвращаем как было';
    MF.Board_OpenCompanyServices();
    JS.scroll ('h4:contains("Company Services Settings")');
    SF.sleep(2);
    V.CompanyServices={};
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
    SF.sleep(3);
    //=========================закончили писать тест=============================
    SF.endOfTest();
};
