module.exports = function main(SF, JS, JSstep, VD, V, By, until,FileDetector, system, condition, LF,config,constants){
    global.fiber = Fiber.current;
    V.client = {};
    V.client.name = SF.randomBukva(6) + '_t';
    V.client.fam = SF.randomBukva(6) + '_t';
    V.client.phone = SF.randomCifra(10);
    V.client.email = SF.randomBukvaSmall(6) + '@' + SF.randomBukvaSmall(4) + '.tes';

    //=========================начинаем писать тест=============================
    SF.get(V.adminURL);
    LF.LoginToBoardAsAdmin();
    SF.sleep (3);
condition.nowWeDoing = 'выставляем настройки лонг дистанс для айовы только ассепт алл квотс';
    LF.gotoSetingsLD ();
    JS.click('#jqvmap1_ia');
    SF.waitForVisible (By.xpath('//div[@ng-if="vm.showSidebar"]'));
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
    SF.clear (By.xpath('//td[contains(text(), "319")]/../td[2]/input[@ng-change="vm.saveSettings()"]'));
    SF.sleep (0.5);
    SF.clear (By.xpath('//td[contains(text(), "515")]/../td[2]/input[@ng-change="vm.saveSettings()"]'));
    SF.sleep (0.5);
    SF.clear (By.xpath('//td[contains(text(), "563")]/../td[2]/input[@ng-change="vm.saveSettings()"]'));
    SF.sleep (0.5);
    SF.clear (By.xpath('//td[contains(text(), "641")]/../td[2]/input[@ng-change="vm.saveSettings()"]'));
    SF.sleep (0.5);
    SF.clear (By.xpath('//td[contains(text(), "712")]/../td[2]/input[@ng-change="vm.saveSettings()"]'));
    SF.sleep (0.5);
    JS.scroll('div.pageheader:visible');
    SF.sleep (0.5);
    SF.select (By.xpath('//select[@ng-model="vm.longdistance.basedState"]'), 'MA');
    SF.sleep (2);
    SF.click(By.xpath('//input[@ng-model="vm.longdistance.stateRates[vm.longdistance.basedState][vm.stateCode].delivery_days"]'));
    SF.sleep (2);
    LF.LogoutFromBoardAdmin ();
    SF.get(V.frontURL);

condition.nowWeDoing = 'создаем реквест с фронтовой верхней формы с вкл галкой ассепт алл квотс должно пускать иначе ошибка';

    SF.sleep (4);
    SF.send(By.xpath('//ultrasmall-form//input[@ng-model="request.zipFrom"]'), "02111");
    SF.send(By.xpath('//ultrasmall-form//input[@ng-model="request.zipTo"]'), "50201");
    SF.sleep(8);
    driver.wait(driver.executeScript("$('ultrasmall-form input[ng-model=\"request.moveDate\"]').focus();"));
    SF.sleep(1);
    V.frontNumbers = {};
    driver.wait(driver.executeScript(JSstep.Click4DaysNewCalendar).then(function (D) {
        V.frontNumbers.moveDate = D;
        console.log(V.frontNumbers.moveDate);
    }));
    SF.sleep(1);
    driver.executeScript("$('ultrasmall-form input[ng-click=\"Continue1(\\\'step1\\\')\"]').click();");
    SF.sleep(1);
    SF.waitForVisible(By.xpath('//input[@ng-click="Continue2(\'step2\')"]'));
    driver.navigate().refresh();
    SF.sleep (4);

condition.nowWeDoing = 'создаем реквест с фронтовой нижней формы с вкл галкой ассепт алл квотс должно пускать иначе ошибка';

    SF.sleep (3);
    SF.click (By.xpath('//a[@href="#request"]'));
    SF.sleep (2);
    SF.click (By.xpath('//label[contains(text(), "Desired Move Date:")]/following-sibling::input[1]'));
    V.request={};
    driver.wait(driver.executeScript(JSstep.Click4DaysNewCalendar).then(function(MovDateFront){
        V.request.moveDate = MovDateFront;
        console.log(V.request);
    }), config.timeout);
    SF.sleep (0.5);
    SF.send (By.id('edit-zip-code-from'), '02111');
    SF.send (By.id('edit-zip-code-to'), '50201');
    JS.select ('#edit-size-move', 10);
    JS.select ('#edit-type-from', 2);
    JS.select ('#edit-type-to', 5);
    SF.sleep (4);
    JS.click ('#calculate_btn');
    SF.waitForLocated (By.xpath('//div[@class="form_block calc-form"]'));
    SF.sleep (7);
    //JS.waitForNotExist("div.overlay-loader:visible");
    SF.click(By.id('prefeefe'));
    SF.click (By.xpath('//div[@id="pref_popup"]//div[@class="select_item pre_2"]'));
    SF.select(By.xpath('//select[@ng-model="request.poll"]'), 'Google search');
    SF.sleep (2);

    SF.get(V.adminURL);
    LF.LoginToBoardAsAdmin();
    SF.sleep (3);
    condition.nowWeDoing = 'выставляем настройки лонг дистанс для айовы - снимаем все галки';
    LF.gotoSetingsLD ();
    SF.sleep (2);
    JS.click('#jqvmap1_ia');
    SF.sleep (2);
    SF.waitForVisible (By.xpath('//div[@ng-if="vm.showSidebar"]'));
    SF.sleep (2);
    driver.wait(driver.executeScript("if($('input[ng-model=\"vm.longdistance.stateRates[vm.longdistance.basedState][vm.stateCode].longDistance\"]').hasClass('ng-empty')){" +
        "return true;}else{" +
        "$('input[ng-model=\"vm.longdistance.stateRates[vm.longdistance.basedState][vm.stateCode].longDistance\"]').click()}"),config.timeout);
    SF.sleep (2);
    driver.wait(driver.executeScript("if($('input[ng-model=\"vm.longdistance.acceptAllQuotes\"]').hasClass('ng-empty')){" +
        "return true;}else{" +
        "$('input[ng-model=\"vm.longdistance.acceptAllQuotes\"]').click()}"),config.timeout);
    SF.sleep (2);
    LF.LogoutFromBoardAdmin ();
    SF.get(V.frontURL);

condition.nowWeDoing = 'создаем реквест с фронтовой верхней формы с выкл галкой ассепт алл квотс, не должно пускать иначе ошибка';

    SF.send(By.xpath('//ultrasmall-form//input[@ng-model="request.zipFrom"]'), "02111");
    SF.send(By.xpath('//ultrasmall-form//input[@ng-model="request.zipTo"]'), "50201");
    SF.sleep(2);
    SF.waitForVisible (By.xpath('//div[@class="sweet-alert showSweetAlert visible"]'));
    SF.click (By.xpath('//button[@class="confirm"]'));
    SF.sleep (2);
    driver.navigate().refresh();
    SF.sleep (5);

condition.nowWeDoing = 'создаем реквест с фронтовой нижней формы с выкл галкой ассепт алл квотс, не должно пускать иначе ошибка';

    SF.click (By.xpath('//a[@href="#request"]'));
    SF.sleep (2);
    SF.send (By.id('edit-zip-code-from'), '02111');
    SF.send (By.id('edit-zip-code-to'), '50201');
    SF.sleep(2);
    SF.waitForVisible (By.xpath('//div[@class="sweet-alert showSweetAlert visible"]'));
    SF.click (By.xpath('//button[@class="confirm"]'));

    SF.get(V.adminURL);
    LF.LoginToBoardAsAdmin();
    SF.sleep (3);
condition.nowWeDoing = 'выставляем настройки лонг дистанс для айовы - снимаем галку All acept quotes и ставим галочку Move to this state и выставить для всех area какую-нибудь цену';
    LF.gotoSetingsLD ();
    JS.click('#jqvmap1_ia');
    SF.waitForVisible (By.xpath('//div[@ng-if="vm.showSidebar"]'));
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
    SF.clear (By.xpath('//td[contains(text(), "319")]/../td[2]/input[@ng-change="vm.saveSettings()"]'));
    SF.sleep (0.5);
    SF.send(By.xpath('//td[contains(text(), "319")]/../td[2]/input[@ng-change="vm.saveSettings()"]'), 20);
    SF.sleep (0.5);
    SF.clear (By.xpath('//td[contains(text(), "515")]/../td[2]/input[@ng-change="vm.saveSettings()"]'));
    SF.sleep (0.5);
    SF.send(By.xpath('//td[contains(text(), "515")]/../td[2]/input[@ng-change="vm.saveSettings()"]'), 10);
    SF.sleep (0.5);
    SF.clear (By.xpath('//td[contains(text(), "563")]/../td[2]/input[@ng-change="vm.saveSettings()"]'));
    SF.sleep (0.5);
    SF.send(By.xpath('//td[contains(text(), "563")]/../td[2]/input[@ng-change="vm.saveSettings()"]'), 30);
    SF.sleep (0.5);
    SF.clear (By.xpath('//td[contains(text(), "641")]/../td[2]/input[@ng-change="vm.saveSettings()"]'));
    SF.sleep (0.5);
    SF.send(By.xpath('//td[contains(text(), "641")]/../td[2]/input[@ng-change="vm.saveSettings()"]'), 5);
    SF.sleep (0.5);
    SF.clear (By.xpath('//td[contains(text(), "712")]/../td[2]/input[@ng-change="vm.saveSettings()"]'));
    SF.sleep (0.5);
    SF.send(By.xpath('//td[contains(text(), "712")]/../td[2]/input[@ng-change="vm.saveSettings()"]'), 15);
    SF.sleep (0.5);
    JS.scroll('div.pageheader:visible');
    SF.sleep (0.5);
    SF.click(By.xpath('//input[@ng-model="vm.longdistance.stateRates[vm.longdistance.basedState][vm.stateCode].delivery_days"]'));
    SF.sleep (2);
    LF.LogoutFromBoardAdmin ();
    SF.get(V.frontURL);
condition.nowWeDoing = 'создаем реквест с верхней формы третий раз, должно пускать, если нет то ошибка';
    SF.sleep (4);
    SF.send(By.xpath('//ultrasmall-form//input[@ng-model="request.zipFrom"]'), "02111");
    SF.send(By.xpath('//ultrasmall-form//input[@ng-model="request.zipTo"]'), "50201");
    SF.sleep(8);
    driver.wait(driver.executeScript("$('ultrasmall-form input[ng-model=\"request.moveDate\"]').focus();"));
    SF.sleep(1);
    V.frontNumbers = {};
    driver.wait(driver.executeScript(JSstep.Click4DaysNewCalendar).then(function (D) {
        V.frontNumbers.moveDate = D;
        console.log(V.frontNumbers.moveDate);
    }));
    SF.sleep(1);
    driver.executeScript("$('ultrasmall-form input[ng-click=\"Continue1(\\\'step1\\\')\"]').click();");
    SF.sleep(3);
    SF.waitForVisible(By.xpath('//input[@ng-click="Continue2(\'step2\')"]'));
    driver.navigate().refresh();

condition.nowWeDoing = 'создаем реквест с нижней формы третий раз, должно пускать, если нет то ошибка';

    SF.sleep (3);
    SF.click (By.xpath('//a[@href="#request"]'));
    SF.sleep (2);
    SF.click (By.xpath('//label[contains(text(), "Desired Move Date:")]/following-sibling::input[1]'));
    V.request={};
    driver.wait(driver.executeScript(JSstep.Click4DaysNewCalendar).then(function(MovDateFront){
        V.request.moveDate = MovDateFront;
        console.log(V.request);
    }), config.timeout);
    SF.sleep (0.5);
    SF.send (By.id('edit-zip-code-from'), '02111');
    SF.send (By.id('edit-zip-code-to'), '50201');
    SF.sleep(8);
    JS.select ('#edit-size-move', 10);
    JS.select ('#edit-type-from', 2);
    JS.select ('#edit-type-to', 5);
    SF.sleep (2);
    JS.click ('#calculate_btn');
    SF.waitForLocated (By.xpath('//div[@class="form_block calc-form"]'));
    SF.sleep (5);
    SF.click(By.id('prefeefe'));
    SF.click (By.xpath('//div[@id="pref_popup"]//div[@class="select_item pre_2"]'));
    SF.select(By.xpath('//select[@ng-model="request.poll"]'), 'Google search');
    SF.sleep (1);
    driver.navigate().refresh();
    SF.sleep (3);
    SF.get (V.adminURL);
    LF.LoginToBoardAsAdmin();
    SF.sleep (3);
condition.nowWeDoing = 'удаляем общую цену для всего штата и назначить одну цену на какую-то территорию';
    LF.gotoSetingsLD ();
    JS.click('#jqvmap1_ia');
    SF.waitForVisible (By.xpath('//div[@ng-if="vm.showSidebar"]'));
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
    SF.clear (By.xpath('//td[contains(text(), "319")]/../td[2]/input[@ng-change="vm.saveSettings()"]'));
    SF.sleep (0.5);
    SF.clear (By.xpath('//td[contains(text(), "515")]/../td[2]/input[@ng-change="vm.saveSettings()"]'));
    SF.sleep (0.5);
    SF.clear (By.xpath('//td[contains(text(), "563")]/../td[2]/input[@ng-change="vm.saveSettings()"]'));
    SF.sleep (0.5);
    SF.clear (By.xpath('//td[contains(text(), "641")]/../td[2]/input[@ng-change="vm.saveSettings()"]'));
    SF.sleep (0.5);
    SF.clear (By.xpath('//td[contains(text(), "712")]/../td[2]/input[@ng-change="vm.saveSettings()"]'));
    SF.sleep (0.5);
    SF.send(By.xpath('//td[contains(text(), "712")]/../td[2]/input[@ng-change="vm.saveSettings()"]'), 15);
    SF.sleep (0.5);
    JS.scroll('div.pageheader:visible');
    SF.sleep (0.5);
    SF.click(By.xpath('//input[@ng-model="vm.longdistance.stateRates[vm.longdistance.basedState][vm.stateCode].delivery_days"]'));
    SF.sleep (2);
    LF.LogoutFromBoardAdmin ();
    SF.get(V.frontURL);
condition.nowWeDoing = 'создаем реквест с верхней формы 4 раз в ту территорию в которую выставилу цену, должно пускать, если нет то ошибка';

    SF.sleep (4);
    SF.send(By.xpath('//ultrasmall-form//input[@ng-model="request.zipFrom"]'), "02111");
    SF.send(By.xpath('//ultrasmall-form//input[@ng-model="request.zipTo"]'), "50588");
    SF.sleep(6);
    driver.wait(driver.executeScript("$('ultrasmall-form input[ng-model=\"request.moveDate\"]').focus();"));
    SF.sleep(2);
    driver.wait(driver.executeScript(JSstep.Click4DaysNewCalendar),config.timeout);
    SF.sleep(2);
    driver.executeScript("$('ultrasmall-form input[ng-click=\"Continue1(\\\'step1\\\')\"]').click();");
    SF.sleep(2);
    SF.waitForVisible(By.xpath('//input[@ng-click="Continue2(\'step2\')"]'));
    driver.navigate().refresh();

condition.nowWeDoing = 'создаем реквест с нижней формы 4 раз в ту территорию в которую выставилу цену, должно пускать, если нет то ошибка';

    SF.sleep (4);
    SF.click (By.xpath('//a[@href="#request"]'));
    SF.sleep (2);
    SF.click (By.xpath('//label[contains(text(), "Desired Move Date:")]/following-sibling::input[1]'));
    V.request={};
    driver.wait(driver.executeScript(JSstep.Click4DaysNewCalendar).then(function(MovDateFront){
        V.request.moveDate = MovDateFront;
        console.log(V.request);
    }), config.timeout);
    SF.sleep (0.5);
    SF.send (By.id('edit-zip-code-from'), '02111');
    SF.send (By.id('edit-zip-code-to'), '50588');
    SF.sleep(6);
    JS.select ('#edit-size-move', 10);
    JS.select ('#edit-type-from', 2);
    JS.select ('#edit-type-to', 5);
    SF.sleep (2);
    JS.click ('#calculate_btn');
    SF.waitForLocated (By.xpath('//div[@class="form_block calc-form"]'));
    SF.sleep (5);
    SF.click(By.id('prefeefe'));
    SF.click (By.xpath('//div[@id="pref_popup"]//div[@class="select_item pre_2"]'));
    SF.select(By.xpath('//select[@ng-model="request.poll"]'), 'Google search');
    driver.navigate().refresh();
    SF.sleep (4);

condition.nowWeDoing = 'создаем реквест с верхней формы 5 раз, должно ne пускать, если da то ошибка, так как создаем реквест в ту ареа где цена не выставлена';

    SF.send(By.xpath('//ultrasmall-form//input[@ng-model="request.zipFrom"]'), "02111");
    SF.send(By.xpath('//ultrasmall-form//input[@ng-model="request.zipTo"]'), "50701");
    SF.sleep(3);
    SF.waitForVisible (By.xpath('//div[@class="sweet-alert showSweetAlert visible"]'));
    SF.click (By.xpath('//button[@class="confirm"]'));
    SF.sleep (2);
    driver.navigate().refresh();
    SF.sleep (5);

condition.nowWeDoing = 'создаем реквест с фронтовой нижней формы 5 раз, должно ne пускать, если da то ошибка, так как создаем реквест в ту ареа где цена не выставлена';

    SF.click (By.xpath('//a[@href="#request"]'));
    SF.sleep (2);
    SF.send (By.id('edit-zip-code-from'), '02111');
    SF.send (By.id('edit-zip-code-to'), '50701');
    SF.sleep(3);
    SF.waitForVisible (By.xpath('//div[@class="sweet-alert showSweetAlert visible"]'));
    SF.click (By.xpath('//button[@class="confirm"]'));
    SF.sleep (3);

    SF.get (V.adminURL);
    LF.LoginToBoardAsAdmin();
    SF.sleep (3);
condition.nowWeDoing = 'заходим в админку и удаляем Move to this state при этом цена в один ареа код остается';
    LF.gotoSetingsLD ();
    JS.click('#jqvmap1_ia');
    SF.waitForVisible (By.xpath('//div[@ng-if="vm.showSidebar"]'));
    driver.wait(driver.executeScript("if($('input[ng-model=\"vm.longdistance.stateRates[vm.longdistance.basedState][vm.stateCode].longDistance\"]').hasClass('ng-empty')){" +
        "return true;}else{" +
        "$('input[ng-model=\"vm.longdistance.stateRates[vm.longdistance.basedState][vm.stateCode].longDistance\"]').click()}"),config.timeout);
    SF.sleep (2);

    LF.LogoutFromBoardAdmin ();
    SF.get(V.frontURL);

    condition.nowWeDoing = 'создаем реквест с верхней формы 6 раз, в территорию с указанной ценой и выключеной галкой Move to this state, должно выкинуть';

    SF.send(By.xpath('//ultrasmall-form//input[@ng-model="request.zipFrom"]'), "02111");
    SF.send(By.xpath('//ultrasmall-form//input[@ng-model="request.zipTo"]'), "50588");
    SF.sleep(3);
    SF.waitForVisible (By.xpath('//div[@class="sweet-alert showSweetAlert visible"]'));
    SF.click (By.xpath('//button[@class="confirm"]'));
    SF.sleep (2);
    driver.navigate().refresh();
    SF.sleep (5);

    condition.nowWeDoing = 'создаем реквест с нижней формы 6 раз, в территорию с указанной ценой и выключеной галкой Move to this state, должно выкинуть';

    SF.click (By.xpath('//a[@href="#request"]'));
    SF.sleep (2);
    SF.send (By.id('edit-zip-code-from'), '02111');
    SF.send (By.id('edit-zip-code-to'), '50588');
    SF.sleep(3);
    SF.waitForVisible (By.xpath('//div[@class="sweet-alert showSweetAlert visible"]'));
    SF.click (By.xpath('//button[@class="confirm"]'));
    SF.sleep (3);


    //=========================закончили писать тест=============================
    SF.endOfTest();
};
