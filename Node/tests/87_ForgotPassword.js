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
    SF.click(By.xpath('//a[@ng-click="openModal()"]'));
    JS.waitForExist('input[ng-model=\\"client.mail\\"]');
    SF.clear(By.xpath('//input[@ng-model="client.mail"]'));
    SF.send(By.xpath('//input[@ng-model="client.mail"]'),V.client.newEmaila);
    JS.click('button[ng-click=\\"update(client)\\"]:visible');
    MF.WaitWhileBusy();
    LF.LogoutFromAccount ();
    SF.click (By.xpath('//small[contains(text(),"Forgot password?")]'));
    SF.sleep(1);
    SF.waitForVisible(By.xpath('//input[@id="email"]'));
    SF.sleep(1);
    SF.send(By.xpath('//input[@id="email"]'), V.client.newEmaila );
    SF.click(By.xpath('//button[@type="submit"]'));
    MF.SweetConfirm();

    SF.endOfTest();
};


