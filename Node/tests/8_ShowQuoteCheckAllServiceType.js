module.exports = function main(SF, JS, MF, LF, JSstep, VD, V, By, until,FileDetector, system, condition, config,constants) {
    global.fiber = Fiber.current;
    V.clientLM = {};
    V.clientLM.name = SF.randomBukva(6) + '_t';
    V.clientLM.fam = SF.randomBukva(6) + '_t';
    V.clientLM.phone = SF.randomCifra(10);
    V.clientLM.email = SF.randomBukvaSmall(6) + '@' + SF.randomBukvaSmall(4) + '.tes';
    V.clientLM.passwd = 123;

    V.clientLMcom = {};
    V.clientLMcom.name = SF.randomBukva(6) + '_t';
    V.clientLMcom.fam = SF.randomBukva(6) + '_t';
    V.clientLMcom.phone = SF.randomCifra(10);
    V.clientLMcom.email = SF.randomBukvaSmall(6) + '@' + SF.randomBukvaSmall(4) + '.tes';
    V.clientLMcom.passwd = 123;

    V.clientLMcomCalcOff = {};
    V.clientLMcomCalcOff.name = SF.randomBukva(6) + '_t';
    V.clientLMcomCalcOff.fam = SF.randomBukva(6) + '_t';
    V.clientLMcomCalcOff.phone = SF.randomCifra(10);
    V.clientLMcomCalcOff.email = SF.randomBukvaSmall(6) + '@' + SF.randomBukvaSmall(4) + '.tes';
    V.clientLMcomCalcOff.passwd = 123;

    V.clientMS = {};
    V.clientMS.name = SF.randomBukva(6) + '_t';
    V.clientMS.fam = SF.randomBukva(6) + '_t';
    V.clientMS.phone = SF.randomCifra(10);
    V.clientMS.email = SF.randomBukvaSmall(6) + '@' + SF.randomBukvaSmall(4) + '.tes';
    V.clientMS.passwd = 123;

    V.clientLH = {};
    V.clientLH.name = SF.randomBukva(6) + '_t';
    V.clientLH.fam = SF.randomBukva(6) + '_t';
    V.clientLH.phone = SF.randomCifra(10);
    V.clientLH.email = SF.randomBukvaSmall(6) + '@' + SF.randomBukvaSmall(4) + '.tes';
    V.clientLH.passwd = 123;

    V.clientUH = {};
    V.clientUH.name = SF.randomBukva(6) + '_t';
    V.clientUH.fam = SF.randomBukva(6) + '_t';
    V.clientUH.phone = SF.randomCifra(10);
    V.clientUH.email = SF.randomBukvaSmall(6) + '@' + SF.randomBukvaSmall(4) + '.tes';
    V.clientUH.passwd = 123;

    V.clientOV = {};
    V.clientOV.name = SF.randomBukva(6) + '_t';
    V.clientOV.fam = SF.randomBukva(6) + '_t';
    V.clientOV.phone = SF.randomCifra(10);
    V.clientOV.email = SF.randomBukvaSmall(6) + '@' + SF.randomBukvaSmall(4) + '.tes';
    V.clientOV.passwd = 123;

    V.clientLD = {};
    V.clientLD.name = SF.randomBukva(6) + '_t';
    V.clientLD.fam = SF.randomBukva(6) + '_t';
    V.clientLD.phone = SF.randomCifra(10);
    V.clientLD.email = SF.randomBukvaSmall(6) + '@' + SF.randomBukvaSmall(4) + '.tes';
    V.clientLD.passwd = 123;

    V.clientPD = {};
    V.clientPD.name = SF.randomBukva(6) + '_t';
    V.clientPD.fam = SF.randomBukva(6) + '_t';
    V.clientPD.phone = SF.randomCifra(10);
    V.clientPD.email = SF.randomBukvaSmall(6) + '@' + SF.randomBukvaSmall(4) + '.tes';
    V.clientPD.passwd = 123;

    //=========================начинаем писать тест=============================
    SF.get(V.adminURL);

condition.nowWeDoing = 'идем на мувборд в настройки калькулятора и отключаем все галочки show quote';
    LF.LoginToBoardAsCustom(V.adminLogin,V.adminPassword);
    MF.Board_OpenSettingsCalculator();
    MF.CalculatorSettings_OpenBasicSettings();
    LF.CalculatorSettings_ShowQuoteTurnOFF();
    MF.Board_LogoutAdmin ();

condition.nowWeDoing = 'идем на фронт сайт, нижняя форма и будем поочередно создавать реквесты и проверять что квота не показывается и на формах и на аккаунте. Создаем локал мув';
    SF.get(V.frontURL);
    LF.CreateLocalMoveFromFrontDown(V.clientLM);
    driver.wait(driver.findElement(By.xpath('//h3[contains(text(), "Type of Service:")]/following-sibling::span')).getText().then(function (text) {
        VD.IWant(VD.ToEqual, text, 'Local Move', 'сервис тип не локал мув а должен');
    }),config.timeout);
    driver.wait(driver.executeScript("return $('div[ng-if=\"getFrontQuoteExplanation()\"]').length").then(function (text) {
            VD.IWant(VD.ToEqual, text, 0, 'на фронтовой нижней форме отобразился блок с квотой для локал мув, а не должен был');
    }),config.timeout);
    MF.FrontSite_GoToConfirmation();
    MF.FrontSite_ViewRequestPage();
    SF.openTab (1);
    MF.Account_ClickViewRequest ();
    driver.wait(driver.findElement(By.xpath('//div[contains(text(),"Request ID")]/span')).getText().then(function (text) {
        V.accountNumbersLMId = SF.cleanPrice(text);
    }), config.timeout);
    SF.sleep(1);
    driver.wait(driver.executeScript("return $('ng-include[ng-if=\"!showQuote\"]').length").then(function (text) {
        VD.IWant(VD.ToEqual, text, 1, 'на аккаунте отобразился блок с квотой для локал мув, а не должен был');
    }),config.timeout);
    LF.LogoutFromAccount ();

condition.nowWeDoing = 'идем на фронт сайт, нижняя форма и будем поочередно создавать реквесты и проверять что квота не показывается и на формах и на аккаунте. Создаем moving storage';
    SF.get(V.frontURL);
    LF.CreateMovAndStorFromFrontDown(V.clientMS);
    driver.wait(driver.findElement(By.xpath('//h3[contains(text(), "Type of Service:")]/following-sibling::span')).getText().then(function (text) {
        VD.IWant(VD.ToEqual, text, 'Moving With Storage', 'сервис тип не moving storage а должен');
    }),config.timeout);
    driver.wait(driver.executeScript("return $('div[ng-if=\"getFrontQuoteExplanation()\"]').length").then(function (text) {
        VD.IWant(VD.ToEqual, text, 0, 'на фронтовой нижней форме отобразился блок с квотой для moving storage, а не должен был');
    }),config.timeout);
    MF.FrontSite_GoToConfirmation();
    MF.FrontSite_ViewRequestPage();
    SF.openTab (2);
    MF.Account_ClickViewRequest ();
    driver.wait(driver.findElement(By.xpath('//div[contains(text(),"Request ID")]/span')).getText().then(function (text) {
        V.accountNumbersMSId = SF.cleanPrice(text);
    }), config.timeout);
    driver.wait(driver.executeScript("return $('ng-include[ng-if=\"!showQuote\"]').length").then(function (text) {
        VD.IWant(VD.ToEqual, text, 1, 'на аккаунте отобразился блок с квотой для moving TO storage, а не должен был');
    }),config.timeout);
    MF.Account_ClickFromStorage();
    driver.wait(driver.executeScript("return $('ng-include[ng-if=\"!showQuote\"]').length").then(function (text) {
        VD.IWant(VD.ToEqual, text, 1, 'на аккаунте отобразился блок с квотой для moving FROM storage, а не должен был');
    }),config.timeout);
    LF.LogoutFromAccount ();
    driver.close();
    SF.openTab (1);
    driver.close();
    SF.openTab (0);
    driver.navigate().refresh();
    SF.sleep(4);

condition.nowWeDoing = 'идем на фронт сайт, нижняя форма и будем поочередно создавать реквесты и проверять что квота не показывается и на формах и на аккаунте. Создаем Loading help';
    LF.CreateLoadingHelpDownForm(V.clientLH);
    driver.wait(driver.findElement(By.xpath('//h3[contains(text(), "Type of Service:")]/following-sibling::span')).getText().then(function (text) {
        VD.IWant(VD.ToEqual, text, 'Loading Help', 'сервис тип не Loading help а должен');
    }),config.timeout);
    driver.wait(driver.executeScript("return $('div[ng-if=\"getFrontQuoteExplanation()\"]').length").then(function (text) {
        VD.IWant(VD.ToEqual, text, 0, 'на фронтовой нижней форме отобразился блок с квотой для Loading help, а не должен был');
    }),config.timeout);
    MF.FrontSite_GoToConfirmation();
    MF.FrontSite_ViewRequestPage();
    SF.openTab (1);
    MF.Account_ClickViewRequest ();
    driver.wait(driver.findElement(By.xpath('//div[contains(text(),"Request ID")]/span')).getText().then(function (text) {
        V.accountNumbersLHId = SF.cleanPrice(text);
    }), config.timeout);
    driver.wait(driver.executeScript("return $('ng-include[ng-if=\"!showQuote\"]').length").then(function (text) {
        VD.IWant(VD.ToEqual, text, 1, 'на аккаунте отобразился блок с квотой для  Loading help, а не должен был');
    }),config.timeout);
    LF.LogoutFromAccount ();
    SF.get (V.frontURL);

condition.nowWeDoing = 'идем на фронт сайт, нижняя форма и будем поочередно создавать реквесты и проверять что квота не показывается и на формах и на аккаунте. Создаем UNLoading help';
    LF.CreateUnloadingHelpDownForm(V.clientUH);
    driver.wait(driver.findElement(By.xpath('//h3[contains(text(), "Type of Service:")]/following-sibling::span')).getText().then(function (text) {
        VD.IWant(VD.ToEqual, text, 'Unloading Help', 'сервис тип не UNLoading help а должен');
    }),config.timeout);
    driver.wait(driver.executeScript("return $('div[ng-if=\"getFrontQuoteExplanation()\"]').length").then(function (text) {
        VD.IWant(VD.ToEqual, text, 0, 'на фронтовой нижней форме отобразился блок с квотой для UNLoading help, а не должен был');
    }),config.timeout);
    MF.FrontSite_GoToConfirmation();
    MF.FrontSite_ViewRequestPage();
    SF.openTab (2);
    MF.Account_ClickViewRequest ();
    driver.wait(driver.findElement(By.xpath('//div[contains(text(),"Request ID")]/span')).getText().then(function (text) {
        V.accountNumbersUNId = SF.cleanPrice(text);
    }), config.timeout);
    driver.wait(driver.executeScript("return $('ng-include[ng-if=\"!showQuote\"]').length").then(function (text) {
        VD.IWant(VD.ToEqual, text, 1, 'на аккаунте отобразился блок с квотой для  UNLoading help, а не должен был');
    }),config.timeout);
    LF.LogoutFromAccount ();
    driver.close();
    SF.openTab (1);
    driver.close();
    SF.openTab (0);
    driver.navigate().refresh();
    SF.sleep(4);

condition.nowWeDoing = 'идем на фронт сайт, нижняя форма и будем поочередно создавать реквесты и проверять что квота не показывается и на формах и на аккаунте. Создаем Overnight';
    LF.CreateOvernightDownForm(V.clientOV);
    driver.wait(driver.findElement(By.xpath('//h3[contains(text(), "Type of Service:")]/following-sibling::span')).getText().then(function (text) {
        VD.IWant(VD.ToEqual, text, 'Overnight', 'сервис тип не Overnight а должен');
    }),config.timeout);
    driver.wait(driver.executeScript("return $('div[ng-if=\"getFrontQuoteExplanation()\"]').length").then(function (text) {
        VD.IWant(VD.ToEqual, text, 0, 'на фронтовой нижней форме отобразился блок с квотой для Overnight, а не должен был');
    }),config.timeout);
    MF.FrontSite_GoToConfirmation();
    MF.FrontSite_ViewRequestPage();
    SF.openTab (1);
    MF.Account_ClickViewRequest ();
    driver.wait(driver.findElement(By.xpath('//div[contains(text(),"Request ID")]/span')).getText().then(function (text) {
        V.accountNumbersOVId = SF.cleanPrice(text);
    }), config.timeout);
    driver.wait(driver.executeScript("return $('ng-include[ng-if=\"!showQuote\"]').length").then(function (text) {
        VD.IWant(VD.ToEqual, text, 1, 'на аккаунте отобразился блок с квотой для  Overnight To, а не должен был');
    }),config.timeout);
    MF.Account_ClickFromStorage ();
    driver.wait(driver.executeScript("return $('ng-include[ng-if=\"!showQuote\"]').length").then(function (text) {
        VD.IWant(VD.ToEqual, text, 1, 'на аккаунте отобразился блок с квотой для Overnight from, а не должен был');
    }),config.timeout);
    LF.LogoutFromAccount ();
    SF.get (V.frontURL);

condition.nowWeDoing = 'идем на фронт сайт, нижняя форма и будем поочередно создавать реквесты и проверять что квота не показывается и на формах и на аккаунте. Создаем Long distance';
    LF.CreateLongDistanceFromFrontDown(V.clientLD);
    SF.sleep(2);
    driver.wait(driver.findElement(By.xpath('//div[@ng-show="request.serviceType == 7"]/h3[contains(text(), "Type of Service:")]/following-sibling::span')).getText().then(function (text) {
        VD.IWant(VD.ToEqual, text, 'Long Distance', 'сервис тип не Long distance а должен');
    }),config.timeout);
    driver.wait(driver.executeScript("return $('div[ng-if=\"getFrontQuoteExplanation()\"]').length").then(function (text) {
        VD.IWant(VD.ToEqual, text, 0, 'на фронтовой нижней форме отобразился блок с квотой для Long distance, а не должен был');
    }),config.timeout);
    MF.FrontSite_GoToConfirmation();
    MF.FrontSite_ViewRequestPage();
    MF.Account_ClickViewRequest ();
    driver.wait(driver.findElement(By.xpath('//div[contains(text(),"Request ID")]/span')).getText().then(function (text) {
        V.accountNumbersLDId = SF.cleanPrice(text);
    }), config.timeout);
    driver.wait(driver.executeScript("return $('ng-include[ng-if=\"!showQuote\"]').length").then(function (text) {
        VD.IWant(VD.ToEqual, text, 1, 'на аккаунте отобразился блок с квотой для Long distance, а не должен был');
    }),config.timeout);
    LF.LogoutFromAccount ();
    driver.close();
    SF.openTab (0);
    driver.navigate().refresh();
    SF.sleep(4);

condition.nowWeDoing = 'идем на фронт сайт, нижняя форма и будем поочередно создавать реквесты и проверять что квота не показывается и на формах и на аккаунте. Создаем Packing Day';
    LF.CreatePackingDayDownForm(V.clientPD);
    driver.wait(driver.findElement(By.xpath('//h3[contains(text(), "Type of Service:")]/following-sibling::span')).getText().then(function (text) {
        VD.IWant(VD.ToEqual, text, 'Packing Day', 'сервис тип не Packing Day а должен');
    }),config.timeout);
    driver.wait(driver.executeScript("return $('div[ng-if=\"getFrontQuoteExplanation()\"]').length").then(function (text) {
        VD.IWant(VD.ToEqual, text, 0, 'на фронтовой нижней форме отобразился блок с квотой для Packing Day, а не должен был');
    }),config.timeout);
    MF.FrontSite_GoToConfirmation();
    MF.FrontSite_ViewRequestPage();
    SF.openTab (1);
    MF.Account_ClickViewRequest ();
    driver.wait(driver.findElement(By.xpath('//div[contains(text(),"Request ID")]/span')).getText().then(function (text) {
        V.accountNumbersPDId = SF.cleanPrice(text);
    }), config.timeout);
    driver.wait(driver.executeScript("return $('ng-include[ng-if=\"!showQuote\"]').length").then(function (text) {
        VD.IWant(VD.ToEqual, text, 1, 'на аккаунте отобразился блок с квотой для Packing Day, а не должен был');
    }),config.timeout);
    LF.LogoutFromAccount ();
    SF.get (V.frontURL);
    driver.close();
    SF.openTab (0);
    driver.navigate().refresh();
    SF.sleep(4);

condition.nowWeDoing = 'идем на мувборд и проверим что для локал мува и лонг дистанса работает глазик в реквесте - показать квоту';
    SF.get(V.adminURL);
    LF.LoginToBoardAsCustom(V.adminLogin,V.adminPassword);
    MF.Board_OpenRequest(V.accountNumbersLMId);
    SF.click(By.xpath('//i[@ng-click="switchShowingQuote()"]'));
    MF.SweetConfirm();
    MF.EditRequest_OpenAccountPageInNewWindow();
    driver.wait(driver.executeScript("return $('ng-include[ng-if=\"!showQuote\"]').length").then(function (text) {
        VD.IWant(VD.ToEqual, text, 0, 'на аккаунте не отобразился блок с квотой для локал мув, а должен был');
    }),config.timeout);
    driver.close();
    SF.openTab (0);
    LF.closeEditRequest ();

    JS.scroll('.greenBox');
    MF.Board_OpenRequest(V.accountNumbersLDId);
    SF.click(By.xpath('//i[@ng-click="switchShowingQuote()"]'));
    MF.SweetConfirm();
    MF.EditRequest_OpenAccountPageInNewWindow();
    driver.wait(driver.executeScript("return $('ng-include[ng-if=\"!showQuote\"]').length").then(function (text) {
        VD.IWant(VD.ToEqual, text, 0, 'на аккаунте не отобразился блок с квотой для лонг дистанс, а должен был');
    }),config.timeout);
    driver.close();
    SF.openTab (0);
    LF.closeEditRequest ();

condition.nowWeDoing = 'идем в настройки калькулятора и включаем только комершиал мув и будем создавать локал мув с комершиал и квота должна отобразится на фронте и аккаунте';
    MF.Board_OpenSettingsCalculator();
    MF.CalculatorSettings_OpenBasicSettings();
    driver.wait(driver.executeScript("if($('div[ng-repeat=\"(id, value) in vm.allowedServiceTypes\"]:has(label:contains(\"Commercial Move\")):first input:first').hasClass('ng-not-empty')){" +
        "return true;}else{$('div[ng-repeat=\"(id, value) in vm.allowedServiceTypes\"]:has(label:contains(\"Commercial Move\")):first span:first').click()}"),config.timeout);
    driver.wait(driver.executeScript("if($('div[ng-repeat=\"(id, value) in vm.allowedServiceTypes\"]:has(label:contains(\"Commercial Move\")):first input:last').hasClass('ng-not-empty')){" +
        "return true;}else{$('div[ng-repeat=\"(id, value) in vm.allowedServiceTypes\"]:has(label:contains(\"Commercial Move\")):first span:last').click()}"),config.timeout);
    SF.sleep(2);
    JS.scroll('.pageheader');
    MF.Board_LogoutAdmin ();

    SF.get(V.frontURL);
    MF.FrontSite_ClickQuoteCalculator();
    MF.FrontSite_ClickDesireMoveDate();
    V.request={};
    driver.wait(driver.executeScript(JSstep.Click4DaysNewCalendar).then(function(MovDateFront){
        V.request.moveDate = MovDateFront;
    }), config.timeout);
    SF.sleep (0.5);
    MF.CreateRequest_SendZipToZipFrom('02136', '02032');
    MF.FrontDown_SelectMoveSize(11);
    MF.FrontSite_SelectCommercialExtraRooms(2);
    MF.FrontDown_SetEntrance();
    MF.FrontSite_ClickCalculate();
    MF.FrontSite_SetClientInfoDown(V.clientLMcom);
    MF.FrontSite_SelectPreferedStartTime();
    MF.FrontSite_SelectGoogleSearch();
    MF.FrontSite_ClickGoToCalculatorResults();
    driver.wait(driver.findElement(By.xpath('//span[@ng-show="request.moveSize == 11"]')).getText().then(function (text) {
        VD.IWant(VD.ToEqual, text, '- Commercial Move', 'на фронтовом калькуляторе не отобразился сервис тип комершиал');
    }),config.timeout);
    driver.wait(driver.executeScript("return $('div[ng-if=\"getFrontQuoteExplanation()\"]').length").then(function (text) {
        VD.IWant(VD.ToEqual, text, 1, 'на фронтовой нижней форме не отобразился блок с квотой для локал мув комершиал, а должен был');
    }),config.timeout);
    MF.FrontSite_GoToConfirmation();
    MF.FrontSite_ViewRequestPage();
    SF.openTab(1);
    MF.Account_ClickViewRequest ();
    driver.wait(driver.findElement(By.xpath('//div[contains(text(),"Request ID")]/span')).getText().then(function (text) {
        V.accountNumbersLMcomId = SF.cleanPrice(text);
    }), config.timeout);
    SF.sleep(1);
    driver.wait(driver.executeScript("return $('ng-include[ng-if=\"!showQuote\"]').length").then(function (text) {
        VD.IWant(VD.ToEqual, text, 0, 'на аккаунте не отобразился блок с квотой для локал мув коммершиал, а должен был');
    }),config.timeout);
    LF.LogoutFromAccount ();
    driver.close();
    SF.openTab (0);
    driver.navigate().refresh();
    SF.sleep(4);

condition.nowWeDoing = 'идем на мувборд в настройки включить локал мув показ квоты а для комершиал выключить и создать с фронта опять локал мув ' +
    'с комершиал и на этот раз квота на фронте и на акке не должна отображаться';
    SF.get(V.adminURL);
    LF.LoginToBoardAsCustom(V.adminLogin,V.adminPassword);
    MF.Board_OpenSettingsCalculator();
    MF.CalculatorSettings_OpenBasicSettings();
    LF.CalculatorSettings_ShowQuoteTurnON();
    driver.wait(driver.executeScript("if($('div[ng-repeat=\"(id, value) in vm.allowedServiceTypes\"]:has(label:contains(\"Commercial Move\")):first input:first').hasClass('ng-empty')){" +
        "return true;}else{$('div[ng-repeat=\"(id, value) in vm.allowedServiceTypes\"]:has(label:contains(\"Commercial Move\")):first span:first').click()}"),config.timeout);
    driver.wait(driver.executeScript("if($('div[ng-repeat=\"(id, value) in vm.allowedServiceTypes\"]:has(label:contains(\"Commercial Move\")):first input:last').hasClass('ng-empty')){" +
        "return true;}else{$('div[ng-repeat=\"(id, value) in vm.allowedServiceTypes\"]:has(label:contains(\"Commercial Move\")):first span:last').click()}"),config.timeout);
    SF.sleep(2);
    JS.scroll('.pageheader');
    MF.Board_LogoutAdmin ();

    SF.get(V.frontURL);
    MF.FrontSite_ClickQuoteCalculator();
    MF.FrontSite_ClickDesireMoveDate();
    V.request={};
    driver.wait(driver.executeScript(JSstep.Click4DaysNewCalendar).then(function(MovDateFront){
        V.request.moveDate = MovDateFront;
    }), config.timeout);
    SF.sleep (0.5);
    MF.CreateRequest_SendZipToZipFrom('02136', '02032');
    MF.FrontDown_SelectMoveSize(11);
    MF.FrontSite_SelectCommercialExtraRooms(2);
    MF.FrontDown_SetEntrance();
    MF.FrontSite_ClickCalculate();
    MF.FrontSite_SetClientInfoDown(V.clientLMcomCalcOff);
    MF.FrontSite_SelectPreferedStartTime();
    MF.FrontSite_SelectGoogleSearch();
    MF.FrontSite_ClickGoToCalculatorResults();
    driver.wait(driver.findElement(By.xpath('//span[@ng-show="request.moveSize == 11"]')).getText().then(function (text) {
        VD.IWant(VD.ToEqual, text, '- Commercial Move', 'на фронтовом калькуляторе не отобразился сервис тип комершиал');
    }),config.timeout);
    driver.wait(driver.executeScript("return $('div[ng-if=\"getFrontQuoteExplanation()\"]').length").then(function (text) {
        VD.IWant(VD.ToEqual, text, 0, 'на фронтовой нижней форме отобразился блок с квотой для локал мув комершиал, а ne должен был');
    }),config.timeout);
    MF.FrontSite_GoToConfirmation();
    MF.FrontSite_ViewRequestPage();
    SF.openTab(1);
    MF.Account_ClickViewRequest ();
    driver.wait(driver.findElement(By.xpath('//div[contains(text(),"Request ID")]/span')).getText().then(function (text) {
        V.accountNumbersLMcomCalcOFFId = SF.cleanPrice(text);
    }), config.timeout);
    SF.sleep(1);
    driver.wait(driver.executeScript("return $('ng-include[ng-if=\"!showQuote\"]').length").then(function (text) {
        VD.IWant(VD.ToEqual, text, 1, 'на аккаунте отобразился блок с квотой для локал мув коммершиал, а ne должен был');
    }),config.timeout);
    LF.LogoutFromAccount ();
    driver.close();
    SF.openTab (0);
    driver.navigate().refresh();
    SF.sleep(4);

condition.nowWeDoing = 'идем на мувборд в настройки включить все по дефолту';
    SF.get(V.adminURL);
    LF.LoginToBoardAsCustom(V.adminLogin,V.adminPassword);
    MF.Board_OpenSettingsCalculator();
    MF.CalculatorSettings_OpenBasicSettings();
    LF.CalculatorSettings_ShowQuoteTurnON();
    SF.sleep(2);
    JS.scroll('.pageheader');
    MF.Board_LogoutAdmin ();
    //=========================закончили писать тест=============================
    SF.endOfTest();
};
