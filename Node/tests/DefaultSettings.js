module.exports = function main(SF, JS, MF, LF, JSstep, VD, V, By, until,FileDetector, system, condition, config,constants) {
        global.fiber = Fiber.current;

    //=========================начинаем писать тест=============================
    SF.get(V.adminURL);
    LF.LoginToBoardAsAdmin();
    SF.click (By.xpath('//button[@ng-click="toggleLeft()"]'));
    SF.waitForLocated (By.xpath('//button[@ng-click="toggleLeft()"]'));
    SF.click (By.xpath('//a[@ng-click="vm.goToPage(\'settings.general\', \'\')"]'));
    SF.waitForVisible (By.xpath('//a[@ng-click="vm.goToPage(\'settings.general\', \'\')"]'));
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
    // SF.click(By.linkText('Form Style'));
    // SF.sleep(2);
    // driver.wait(driver.executeScript("return $('div[ng-if=\"isSecondStepFirst()\"]').length").then(function (length) {
    //     V.lengthCalc = length;
    //     console.log(V.lengthCalc);
    // }),config.timeout);
    // SF.sleep(1);
    // driver.actions().mouseMove(driver.findElement(By.xpath('//li[@ng-click="selectStep(\'second\')"]'))).mouseDown().mouseMove(driver.findElement(By.xpath('//li[@ng-click="selectStep(\'third\')"]'))).mouseUp().perform();
    // from = driver.findElement(By.xpath('//li[@ng-click="selectStep(\'second\')"]/div[3]'));
    // to = driver.findElement(By.xpath('//li[@ng-click="selectStep(\'third\')"]/div[3]'));
    // driver.actions().dragAndDrop(from, to).perform();
    // driver.actions().dragAndDrop(driver.findElement(By.xpath('//li[@ng-click="selectStep(\'second\')"]')),{x:300,y:0}).perform();
    // driver.actions().mouseMove(driver.findElement(By.xpath('//li[@ng-click="selectStep(\'third\')"]/..')),{x:640,y:70}).mouseDown()
    //     .mouseUp().perform();
    //
    // if (V.lengthCalc = 0) {
    //     SF.sleep(2);
    // } else {
    //     LF.LogoutFromBoardAdmin ();
    // }
    // driver.actions().mouseMove(driver.findElement(By.xpath('//li[@ng-click="selectStep(\'second\')"]'))).mouseDown().mouseMove(driver.findElement(By.xpath('//li[@ng-click="selectStep(\'third\')"]'))).mouseUp().perform();
    // //driver.findElements();
    // //driver.actions().dragAndDrop(driver.findElement(By.xpath('//tr[@ng-click="prepareToDelete($index, receipt.id)"]')), By.xpath()).perform();

    LF.LogoutFromBoardAdmin ();

    //=========================закончили писать тест=============================
    SF.endOfTest();
};
