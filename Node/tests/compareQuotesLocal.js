module.exports = function main(driver, SF, JS, JSstep, VD, V, By, until,FileDetector, system, condition, LF,config,constants){
    global.fiber = Fiber.current;
    V.client = {};
    V.client.name = SF.randomBukva(6) + '_t';
    V.client.fam = SF.randomBukva(6) + '_t';
    V.client.phone = SF.randomCifra(10);
    V.client.email = SF.randomBukvaSmall(6) + '@' + SF.randomBukvaSmall(4) + '.tes';
    V.client.passwd = 123;
    SF.get(V.frontURL);
    condition.nowWeDoing = 'заполняем калькулятор верхний';
    LF.FullSmallCalcAsLocal(V.client);

    condition.nowWeDoing = 'первый раз в аккаунте';
    SF.click(By.xpath('//button[@ng-click="cancel()"][contains(text(),"View request")]'));
    JS.waitForNotExist('div.busyoverlay:visible');
    SF.sleep(5);
    JS.waitForNotExist('div.busyoverlay:visible');
    SF.click(By.xpath('//label[@for="partial"]/input[@ng-model="vm.packing_service"]'));
    LF.RememberAccountNumbers();
    LF.LogoutFromAccount();

    condition.nowWeDoing = 'первый раз в админке';
    SF.get(V.adminURL);
    LF.LoginToBoardAsAdmin();
    LF.OpenRequest(V.accountNumbers.Id);
    SF.waitForVisible(By.xpath('//div[@ng-click="chooseTruck(tid)"]'));
    LF.RememberDigitsRequestBoard();
    LF.Validation_Compare_Account_Admin();

    condition.nowWeDoing = 'идём в логи';
    SF.click(By.xpath('//a[@ng-click="select(tabs[5])"]'));
    SF.sleep(2);
    JS.waitForNotExist('div.busyoverlay:visible');

    V.logNumbers={};
    SF.click(By.xpath('//span[@ng-bind-html="toTrustedHTML(item.text)"][contains(text(),"Request Quote (Pending Status)")][contains(text(),"'+V.client.email+'")]/../../../following-sibling::div[1]'));
    driver.findElement(By.xpath('//span[@aria-hidden="false"]//h3[contains(text(),"Estimated Quote")]/../../../../../../' +
        'following-sibling::td[1]//div/div/div')).getText().then(function(text){
            V.logNumbers.QuoteMin=SF.cleanPrice(text.substring(0,text.indexOf('-')));
            V.logNumbers.QuoteMax=SF.cleanPrice(text.substring(text.indexOf('-')+1));
            console.log(V.logNumbers);
    });
    SF.endOfTest();
};
