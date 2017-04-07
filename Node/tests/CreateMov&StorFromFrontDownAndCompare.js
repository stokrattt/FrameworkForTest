module.exports = function main(SF, JS, JSstep, VD, V, By, until,FileDetector, system, condition, LF,config,constants){
    global.fiber = Fiber.current;
    V.ReservationPrice = {};
    V.client = {};
    V.frontNumbersDown ={};
    V.accountNumbers = {};
    V.client.name = SF.randomBukva(6) + '_t';
    V.client.fam = SF.randomBukva(6) + '_t';
    V.client.phone = SF.randomCifra(10);
    V.client.email = SF.randomBukvaSmall(6) + '@' + SF.randomBukvaSmall(4) + '.tes';

    SF.get(V.frontURL);
    JS.waitForExist ('#loader');

    LF.CreateMovAndStorFromFrontDown ();

    driver.wait(driver.findElement(By.xpath('//div[@class="box_info general"]/div/span')).getText().then(function(text){
        V.nameRequest = text;
        VD.IWant(VD.VToEqual, V.nameRequest, 'Moving & Storage', 'тип реквеста не совпал с созданным');
    }), config.timeout);

    LF.RememberFrontNumbersMovAndStorDown(V.frontNumbersDown);

    SF.click(By.id('submitRequestButton'));
    SF.sleep (2);
    SF.click(By.linkText('View Request Page'));
    SF.sleep(4);
    SF.openTab (1);

    condition.nowWeDoing = 'пошли в аккаунт';

    SF.sleep (3);
    SF.waitForVisible (By.xpath('//div[@class="storagehelp"]'));
    SF.click (By.xpath('//button[@ng-click="cancel()"]'));
    SF.sleep (0.5);

    LF.RememberAccountNumbers(V.accountNumbers);

    LF.Validation_Compare_Account_Front_MovStorTo(V.accountNumbers,V.frontNumbersDown);

    SF.click(By.xpath('//a[@ng-click="vm.goToRequest(vm.request.storage_id)"]'));
    SF.sleep (2);

    V.accountNumbersFrom = {};
    SF.sleep (0.5);
    LF.RememberAccountNumbers(V.accountNumbersFrom);
    LF.Validation_Compare_Account_Front_MovStorFrom (V.accountNumbersFrom,V.frontNumbersDown);


    SF.endOfTest();
};
