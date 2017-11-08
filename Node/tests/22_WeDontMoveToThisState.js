module.exports = function main(SF, JS, MF, LF, JSstep, VD, V, By, until,FileDetector, system, condition, config,constants) {    global.fiber = Fiber.current;
    V.client = {};
    V.client.name = SF.randomBukva(6) + '_t';
    V.client.fam = SF.randomBukva(6) + '_t';
    V.client.phone = SF.randomCifra(10);
    V.client.email = SF.randomBukvaSmall(6) + '@' + SF.randomBukvaSmall(4) + '.tes';

    //=========================начинаем писать тест=============================
    SF.get(V.adminURL);
    LF.LoginToBoardAsCustom(V.adminLogin,V.adminPassword);
    SF.sleep (3);
condition.nowWeDoing = 'выставляем настройки лонг дистанс для айовы только ассепт алл квотс';
    LF.gotoSetingsLD ();
    SF.sleep(2);
    JS.click('#jqvmap1_ia');
    SF.waitForVisible (By.xpath('//div[@ng-if="vm.showSidebar"]'));
    SF.sleep (3);
    driver.wait(driver.executeScript("if($('input[ng-model=\"vm.longdistance.stateRates[vm.longdistance.basedState][vm.stateCode].longDistance\"]').hasClass('ng-empty')){" +
        "return true;}else{" +
        "$('input[ng-model=\"vm.longdistance.stateRates[vm.longdistance.basedState][vm.stateCode].longDistance\"]').click()}"),config.timeout);
    SF.sleep (2);
    driver.wait(driver.executeScript("if($('input[ng-model=\"vm.longdistance.acceptAllQuotes\"]').hasClass('ng-not-empty')){" +
        "return true;}else{" +
        "$('input[ng-model=\"vm.longdistance.acceptAllQuotes\"]').click()}"),config.timeout);
    SF.sleep (2);
    SF.clear (By.xpath('//input[@ng-model="vm.longdistance.stateRates[vm.longdistance.basedState][vm.stateCode].state_rate"]'));
    SF.sleep (0.5);
    SF.clear (By.xpath('//td[contains(text(), "319")]/../td[2]/input[@ng-model="vm.longdistance.stateRates[vm.longdistance.basedState][vm.stateCode].rate[codes]"]'));
    SF.sleep (0.5);
    SF.clear (By.xpath('//td[contains(text(), "515")]/../td[2]/input[@ng-model="vm.longdistance.stateRates[vm.longdistance.basedState][vm.stateCode].rate[codes]"]'));
    SF.sleep (0.5);
    SF.clear (By.xpath('//td[contains(text(), "563")]/../td[2]/input[@ng-model="vm.longdistance.stateRates[vm.longdistance.basedState][vm.stateCode].rate[codes]"]'));
    SF.sleep (0.5);
    SF.clear (By.xpath('//td[contains(text(), "641")]/../td[2]/input[@ng-model="vm.longdistance.stateRates[vm.longdistance.basedState][vm.stateCode].rate[codes]"]'));
    SF.sleep (0.5);
    SF.clear (By.xpath('//td[contains(text(), "712")]/../td[2]/input[@ng-model="vm.longdistance.stateRates[vm.longdistance.basedState][vm.stateCode].rate[codes]"]'));
    SF.sleep (0.5);
    JS.scroll('div.pageheader:visible');
    SF.sleep (0.5);
    SF.select (By.xpath('//select[@ng-model="vm.longdistance.basedState"]'), 'MA');
    SF.sleep (2);
    SF.click(By.xpath('//input[@ng-model="vm.longdistance.stateRates[vm.longdistance.basedState][vm.stateCode].delivery_days"]'));
    SF.sleep (2);
    MF.Board_LogoutAdmin ();
    SF.get(V.frontURL);
condition.nowWeDoing = 'создаем реквест с фронтовой верхней формы с вкл галкой ассепт алл квотс должно пускать иначе ошибка';
    SF.sleep (4);
    MF.FrontSiteSmallCalc_SendZipCode('02111', '50201');
    SF.sleep(6);
    MF.FrontSiteSmallCalc_ClickCalendar();
    V.frontNumbers = {};
    driver.wait(driver.executeScript(JSstep.Click4DaysNewCalendar).then(function (D) {
        V.frontNumbers.moveDate = D;
    }),config.timeout);
    MF.FrontSiteSmallCalc_ClickContinue();
    SF.waitForVisible(By.xpath('//div[@ng-click="Continue2(\'step2\')"]'));
    driver.navigate().refresh();
    SF.sleep (4);
condition.nowWeDoing = 'создаем реквест с фронтовой нижней формы с вкл галкой ассепт алл квотс должно пускать иначе ошибка';
    SF.sleep (3);
    MF.FrontSite_ClickQuoteCalculator();
    MF.FrontSite_ClickDesireMoveDate();
    V.request={};
    driver.wait(driver.executeScript(JSstep.Click4DaysNewCalendar).then(function(MovDateFront){
        V.request.moveDate = MovDateFront;
    }), config.timeout);
    MF.FrontSiteDown_SendZipCode('02111', '50201');
    MF.FrontDown_SelectMoveSize(10);
    MF.FrontDown_SetEntrance();
    MF.FrontSite_ClickCalculate();
    MF.FrontSite_SelectPreferedStartTime();
    MF.FrontSite_SelectGoogleSearch();

    SF.get(V.adminURL);
    LF.LoginToBoardAsCustom(V.adminLogin,V.adminPassword);
    SF.sleep (3);
condition.nowWeDoing = 'выставляем настройки лонг дистанс для айовы - снимаем все галки';
    LF.gotoSetingsLD ();
    SF.sleep (2);
    JS.click('#jqvmap1_ia');
    SF.sleep (3);
    SF.waitForVisible (By.xpath('//div[@ng-if="vm.showSidebar"]'));
    SF.sleep (3);
    driver.wait(driver.executeScript("if($('input[ng-model=\"vm.longdistance.stateRates[vm.longdistance.basedState][vm.stateCode].longDistance\"]').hasClass('ng-empty')){" +
        "return true;}else{" +
        "$('input[ng-model=\"vm.longdistance.stateRates[vm.longdistance.basedState][vm.stateCode].longDistance\"]').click()}"),config.timeout);
    SF.sleep (2);
    driver.wait(driver.executeScript("if($('input[ng-model=\"vm.longdistance.acceptAllQuotes\"]').hasClass('ng-empty')){" +
        "return true;}else{" +
        "$('input[ng-model=\"vm.longdistance.acceptAllQuotes\"]').click()}"),config.timeout);
    SF.sleep (3);
    MF.Board_LogoutAdmin ();
    SF.get(V.frontURL);
    SF.sleep(5);
condition.nowWeDoing = 'создаем реквест второй раз с фронтовой верхней формы с выкл галкой ассепт алл квотс, не должно пускать иначе ошибка';
    MF.FrontSiteSmallCalc_SendZipCode('02111', '50201');
    MF.SweetConfirm();
    SF.sleep (2);
    driver.navigate().refresh();
    SF.sleep (5);
condition.nowWeDoing = 'создаем реквест второй раз с фронтовой нижней формы с выкл галкой ассепт алл квотс, не должно пускать иначе ошибка';
    MF.FrontSite_ClickQuoteCalculator();
    MF.FrontSiteDown_SendZipCode('02111', '50201');
    SF.sleep(2);
    MF.SweetConfirm();
    SF.get(V.adminURL);
    LF.LoginToBoardAsCustom(V.adminLogin,V.adminPassword);
    SF.sleep (3);
condition.nowWeDoing = 'выставляем настройки лонг дистанс для айовы - снимаем галку All acept quotes и ставим галочку Move to this state и выставить для всех area какую-нибудь цену';
    LF.gotoSetingsLD ();
    SF.sleep(2);
    JS.click('#jqvmap1_ia');
    SF.waitForVisible (By.xpath('//div[@ng-if="vm.showSidebar"]'));
    SF.sleep (3);
    driver.wait(driver.executeScript("if($('input[ng-model=\"vm.longdistance.stateRates[vm.longdistance.basedState][vm.stateCode].longDistance\"]').hasClass('ng-not-empty')){" +
        "return true;}else{" +
        "$('input[ng-model=\"vm.longdistance.stateRates[vm.longdistance.basedState][vm.stateCode].longDistance\"]').click()}"),config.timeout);
    SF.sleep (2);
    driver.wait(driver.executeScript("if($('input[ng-model=\"vm.longdistance.acceptAllQuotes\"]').hasClass('ng-empty')){" +
        "return true;}else{" +
        "$('input[ng-model=\"vm.longdistance.acceptAllQuotes\"]').click()}"),config.timeout);
    SF.sleep (2);
    SF.clear (By.xpath('//input[@ng-model="vm.longdistance.stateRates[vm.longdistance.basedState][vm.stateCode].state_rate"]'));
    SF.sleep (0.5);
    SF.clear (By.xpath('//td[contains(text(), "319")]/../td[2]/input[@ng-model="vm.longdistance.stateRates[vm.longdistance.basedState][vm.stateCode].rate[codes]"]'));
    SF.sleep (0.5);
    SF.send(By.xpath('//td[contains(text(), "319")]/../td[2]/input[@ng-model="vm.longdistance.stateRates[vm.longdistance.basedState][vm.stateCode].rate[codes]"]'), 20);
    SF.sleep (0.5);
    SF.clear (By.xpath('//td[contains(text(), "515")]/../td[2]/input[@ng-model="vm.longdistance.stateRates[vm.longdistance.basedState][vm.stateCode].rate[codes]"]'));
    SF.sleep (0.5);
    SF.send(By.xpath('//td[contains(text(), "515")]/../td[2]/input[@ng-model="vm.longdistance.stateRates[vm.longdistance.basedState][vm.stateCode].rate[codes]"]'), 10);
    SF.sleep (0.5);
    SF.clear (By.xpath('//td[contains(text(), "563")]/../td[2]/input[@ng-model="vm.longdistance.stateRates[vm.longdistance.basedState][vm.stateCode].rate[codes]"]'));
    SF.sleep (0.5);
    SF.send(By.xpath('//td[contains(text(), "563")]/../td[2]/input[@ng-model="vm.longdistance.stateRates[vm.longdistance.basedState][vm.stateCode].rate[codes]"]'), 30);
    SF.sleep (0.5);
    SF.clear (By.xpath('//td[contains(text(), "641")]/../td[2]/input[@ng-model="vm.longdistance.stateRates[vm.longdistance.basedState][vm.stateCode].rate[codes]"]'));
    SF.sleep (0.5);
    SF.send(By.xpath('//td[contains(text(), "641")]/../td[2]/input[@ng-model="vm.longdistance.stateRates[vm.longdistance.basedState][vm.stateCode].rate[codes]"]'), 5);
    SF.sleep (0.5);
    SF.clear (By.xpath('//td[contains(text(), "712")]/../td[2]/input[@ng-model="vm.longdistance.stateRates[vm.longdistance.basedState][vm.stateCode].rate[codes]"]'));
    SF.sleep (0.5);
    SF.send(By.xpath('//td[contains(text(), "712")]/../td[2]/input[@ng-model="vm.longdistance.stateRates[vm.longdistance.basedState][vm.stateCode].rate[codes]"]'), 15);
    SF.sleep (2);
    JS.scroll('div.pageheader:visible');
    SF.sleep (0.5);
    SF.click(By.xpath('//input[@ng-model="vm.longdistance.stateRates[vm.longdistance.basedState][vm.stateCode].delivery_days"]'));
    SF.sleep (2);
    MF.Board_LogoutAdmin ();
    SF.get(V.frontURL);
condition.nowWeDoing = 'создаем реквест с верхней формы третий раз, должно пускать, если нет то ошибка';
    SF.sleep (4);
    MF.FrontSiteSmallCalc_SendZipCode('02111', '50201');
    SF.sleep(6);
    MF.FrontSiteSmallCalc_ClickCalendar();
    V.frontNumbers = {};
    driver.wait(driver.executeScript(JSstep.Click4DaysNewCalendar).then(function (D) {
        V.frontNumbers.moveDate = D;
    }),config.timeout);
    MF.FrontSiteSmallCalc_ClickContinue();
    SF.waitForVisible(By.xpath('//div[@ng-click="Continue2(\'step2\')"]'));
    driver.navigate().refresh();
condition.nowWeDoing = 'создаем реквест с нижней формы третий раз, должно пускать, если нет то ошибка';
    SF.sleep (3);
    MF.FrontSite_ClickQuoteCalculator();
    MF.FrontSite_ClickDesireMoveDate();
    V.request={};
    driver.wait(driver.executeScript(JSstep.Click4DaysNewCalendar).then(function(MovDateFront){
        V.request.moveDate = MovDateFront;
    }), config.timeout);
    MF.FrontSiteDown_SendZipCode('02111', '50201');
    SF.sleep(6);
    MF.FrontDown_SelectMoveSize(10);
    MF.FrontDown_SetEntrance();
    MF.FrontSite_ClickCalculate();
    MF.FrontSite_SelectPreferedStartTime();
    MF.FrontSite_SelectGoogleSearch();
    driver.navigate().refresh();
    SF.sleep (3);
    SF.get (V.adminURL);
    LF.LoginToBoardAsCustom(V.adminLogin,V.adminPassword);
    SF.sleep (3);
condition.nowWeDoing = 'удаляем общую цену для всего штата и назначить одну цену на какую-то территорию';
    LF.gotoSetingsLD ();
    SF.sleep(2);
    JS.click('#jqvmap1_ia');
    SF.waitForVisible (By.xpath('//div[@ng-if="vm.showSidebar"]'));
    SF.sleep (3);
    driver.wait(driver.executeScript("if($('input[ng-model=\"vm.longdistance.stateRates[vm.longdistance.basedState][vm.stateCode].longDistance\"]').hasClass('ng-not-empty')){" +
        "return true;}else{" +
        "$('input[ng-model=\"vm.longdistance.stateRates[vm.longdistance.basedState][vm.stateCode].longDistance\"]').click()}"),config.timeout);
    SF.sleep (2);
    driver.wait(driver.executeScript("if($('input[ng-model=\"vm.longdistance.acceptAllQuotes\"]').hasClass('ng-empty')){" +
        "return true;}else{" +
        "$('input[ng-model=\"vm.longdistance.acceptAllQuotes\"]').click()}"),config.timeout);
    SF.sleep (2);
    SF.clear (By.xpath('//input[@ng-model="vm.longdistance.stateRates[vm.longdistance.basedState][vm.stateCode].state_rate"]'));
    SF.sleep (0.5);
    SF.clear (By.xpath('//td[contains(text(), "319")]/../td[2]/input[@ng-model="vm.longdistance.stateRates[vm.longdistance.basedState][vm.stateCode].rate[codes]"]'));
    SF.sleep (0.5);
    SF.clear (By.xpath('//td[contains(text(), "515")]/../td[2]/input[@ng-model="vm.longdistance.stateRates[vm.longdistance.basedState][vm.stateCode].rate[codes]"]'));
    SF.sleep (0.5);
    SF.clear (By.xpath('//td[contains(text(), "563")]/../td[2]/input[@ng-model="vm.longdistance.stateRates[vm.longdistance.basedState][vm.stateCode].rate[codes]"]'));
    SF.sleep (0.5);
    SF.clear (By.xpath('//td[contains(text(), "641")]/../td[2]/input[@ng-model="vm.longdistance.stateRates[vm.longdistance.basedState][vm.stateCode].rate[codes]"]'));
    SF.sleep (0.5);
    SF.clear (By.xpath('//td[contains(text(), "712")]/../td[2]/input[@ng-model="vm.longdistance.stateRates[vm.longdistance.basedState][vm.stateCode].rate[codes]"]'));
    SF.sleep (0.5);
    SF.send  (By.xpath('//td[contains(text(), "712")]/../td[2]/input[@ng-model="vm.longdistance.stateRates[vm.longdistance.basedState][vm.stateCode].rate[codes]"]'), 20);
    SF.sleep (2);
    SF.click (By.xpath('//td[contains(text(), "641")]/../td[2]/input[@ng-model="vm.longdistance.stateRates[vm.longdistance.basedState][vm.stateCode].rate[codes]"]'));
    JS.scroll('div.pageheader:visible');
    SF.sleep (0.5);
    SF.click(By.xpath('//input[@ng-model="vm.longdistance.stateRates[vm.longdistance.basedState][vm.stateCode].delivery_days"]'));
    SF.sleep (2);
    MF.Board_LogoutAdmin ();
    SF.get(V.frontURL);
condition.nowWeDoing = 'создаем реквест с верхней формы 4 раз в ту территорию в которую выставилу цену, должно пускать, если нет то ошибка';
    SF.sleep (4);
    MF.FrontSiteSmallCalc_SendZipCode('02111', '50588');
    SF.sleep(6);
    MF.FrontSiteSmallCalc_ClickCalendar();
    driver.wait(driver.executeScript(JSstep.Click4DaysNewCalendar),config.timeout);
    MF.FrontSiteSmallCalc_ClickContinue();
    SF.waitForVisible(By.xpath('//div[@ng-click="Continue2(\'step2\')"]'));
    driver.navigate().refresh();
condition.nowWeDoing = 'создаем реквест с нижней формы 4 раз в ту территорию в которую выставилу цену, должно пускать, если нет то ошибка';
    SF.sleep (4);
    MF.FrontSite_ClickQuoteCalculator();
    MF.FrontSite_ClickDesireMoveDate();
    V.request={};
    driver.wait(driver.executeScript(JSstep.Click4DaysNewCalendar).then(function(MovDateFront){
        V.request.moveDate = MovDateFront;
    }), config.timeout);
    MF.FrontSiteDown_SendZipCode('02111', '50588');
    SF.sleep(6);
    MF.FrontDown_SelectMoveSize(10);
    MF.FrontDown_SetEntrance();
    MF.FrontSite_ClickCalculate();
    MF.FrontSite_SelectPreferedStartTime();
    MF.FrontSite_SelectGoogleSearch();
    driver.navigate().refresh();
    SF.sleep (4);
condition.nowWeDoing = 'создаем реквест с верхней формы 5 раз, должно ne пускать, если da то ошибка, так как создаем реквест в ту ареа где цена не выставлена';
    MF.FrontSiteSmallCalc_SendZipCode('02111', '50701');
    SF.sleep(3);
    MF.SweetConfirm();
    SF.sleep (2);
    driver.navigate().refresh();
    SF.sleep (5);
condition.nowWeDoing = 'создаем реквест с фронтовой нижней формы 5 раз, должно ne пускать, если da то ошибка, так как создаем реквест в ту ареа где цена не выставлена';
    MF.FrontSite_ClickQuoteCalculator();
    MF.FrontSiteDown_SendZipCode('02111', '50701');
    SF.sleep(3);
    MF.SweetConfirm();
    SF.sleep (3);

    SF.get (V.adminURL);
    LF.LoginToBoardAsCustom(V.adminLogin,V.adminPassword);
    SF.sleep (3);
condition.nowWeDoing = 'заходим в админку и удаляем Move to this state при этом цена в один ареа код остается';
    LF.gotoSetingsLD ();
    SF.sleep(2);
    JS.click('#jqvmap1_ia');
    SF.waitForVisible (By.xpath('//div[@ng-if="vm.showSidebar"]'));
    SF.sleep (3);
    driver.wait(driver.executeScript("if($('input[ng-model=\"vm.longdistance.stateRates[vm.longdistance.basedState][vm.stateCode].longDistance\"]').hasClass('ng-empty')){" +
        "return true;}else{" +
        "$('input[ng-model=\"vm.longdistance.stateRates[vm.longdistance.basedState][vm.stateCode].longDistance\"]').click()}"),config.timeout);
    SF.sleep (2);
    MF.Board_LogoutAdmin ();
    SF.get(V.frontURL);
    SF.sleep(4);
condition.nowWeDoing = 'создаем реквест с верхней формы 6 раз, в территорию с указанной ценой и выключеной галкой Move to this state, должно выкинуть';
    MF.FrontSiteSmallCalc_SendZipCode('02111', '50588');
    MF.SweetConfirm();
    SF.sleep (2);
    driver.navigate().refresh();
    SF.sleep (5);
condition.nowWeDoing = 'создаем реквест с нижней формы 6 раз, в территорию с указанной ценой и выключеной галкой Move to this state, должно выкинуть';
    MF.FrontSite_ClickQuoteCalculator();
    MF.FrontSiteDown_SendZipCode('02111', '50588');
    SF.sleep(3);
    MF.SweetConfirm();
    SF.sleep (1);

    //=========================закончили писать тест=============================
    SF.endOfTest();
};
