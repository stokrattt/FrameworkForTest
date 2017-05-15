module.exports = function main(SF, JS, MF, LF, JSstep, VD, V, By, until,FileDetector, system, condition, config,constants) {    global.fiber = Fiber.current;
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
    MF.Account_ClickViewRequest();
    MF.WaitWhileBusy();
    SF.sleep(5);
    MF.WaitWhileBusy();
    V.accountNumbers={};
    LF.RememberAccountNumbers(V.accountNumbers);
    LF.LogoutFromAccount();

    condition.nowWeDoing = 'первый раз в админке';
    SF.get(V.adminURL);
    LF.LoginToBoardAsCustom(V.adminLogin,V.adminPassword);
    LF.OpenRequest(V.accountNumbers.Id);
    V.boardNumbers = {};
    LF.RememberDigitsRequestBoard(V.boardNumbers);
    LF.Validation_Compare_Account_Admin(V.accountNumbers,V.boardNumbers);

    condition.nowWeDoing = 'идём в логи';
    MF.EditRequest_OpenLogs();
    V.logNumbers={};
    MF.EditRequest_ExpandPendingEmail(V.client.email);
    driver.findElement(By.xpath('//span[@aria-hidden="false"]//h3[contains(text(),"Estimated Quote")]/../../../../../../' +
        'following-sibling::td[1]//div/div/div')).getText().then(function(text){
            V.logNumbers.QuoteMin=SF.cleanPrice(text.substring(0,text.indexOf('-')));
            V.logNumbers.QuoteMax=SF.cleanPrice(text.substring(text.indexOf('-')+1));
            console.log(V.logNumbers);
            VD.IWant(VD.VToEqual, V.logNumbers.QuoteMin, V.boardNumbers.TotalMin);
            VD.IWant(VD.VToEqual, V.logNumbers.QuoteMax, V.boardNumbers.TotalMax);
    });
    SF.sleep(1);
    SF.endOfTest();
};
