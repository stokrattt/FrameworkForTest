module.exports = function main(SF, JS, MF, LF, JSstep, VD, V, By, until,FileDetector, system, condition, config,constants) {    global.fiber = Fiber.current;
    V.ReservationPrice = {};
    V.client = {};
    V.frontNumbersUnloadingDown ={};
    V.accountNumbers = {};
    V.client.name = SF.randomBukva(6) + '_t';
    V.client.fam = SF.randomBukva(6) + '_t';
    V.client.phone = SF.randomCifra(10);
    V.client.email = SF.randomBukvaSmall(6) + '@' + SF.randomBukvaSmall(4) + '.tes';
    V.ForgotPassword2 = 'fghdgfbdgf@gfhdgh.dsru';
    V.client.newEmaila= 'test.boston@mail.ru';


    SF.get(V.frontURL);
    condition.nowWeDoing = 'заполняем калькулятор верхний';
    LF.FullSmallCalcAsLocal(V.client);


    condition.nowWeDoing = ' в аккаунте';
    MF.Account_ClickViewRequest();
    MF.WaitWhileBusy();
    SF.sleep(5);
    MF.WaitWhileBusy();
    SF.click(By.xpath('//a[@ng-click="openModal()"]'));
    JS.waitForExist('input[ng-model=\\"client.mail\\"]');
    SF.clear(By.xpath('//input[@ng-model="client.mail"]'));
    SF.send(By.xpath('//input[@ng-model="client.mail"]'),V.client.newEmaila);
    JS.click('button[ng-click=\\"update(client)\\"]:visible');
    MF.WaitWhileBusy();
    SF.sleep(1);
    LF.LogoutFromAccount ();
    SF.sleep(2);
    //JS.waitForNotExist ('div[ng-if="loadingImg"]');
    SF.click (By.xpath('//small[contains(text(),"Forgot password?")]'));
    SF.sleep(1);
    SF.waitForVisible(By.xpath('//input[@id="email"]'));
    SF.sleep(1);
    SF.send(By.xpath('//input[@id="email"]'), V.client.newEmaila );
    SF.click(By.xpath('//button[@type="submit"]'));
    SF.waitForVisible(By.xpath('//button[@class="confirm"]'));
    SF.click(By.xpath('//button[@class="confirm"]'));
    SF.sleep(4);



   // SF.click (By.xpath('//small[contains(text(),"Forgot password?")]'));
    //SF.sleep(1);
    //SF.waitForVisible(By.xpath('//input[@id="email"]'));
    //SF.sleep(1);
   // SF.send(By.xpath('//input[@id="email"]'), V.ForgotPassword2 );
   // SF.click(By.xpath('//button[@type="submit"]'));
    //SF.waitForVisible(By.xpath('//div[@class="restore-email-error-message ng-binding"]'));



    SF.endOfTest();
};


