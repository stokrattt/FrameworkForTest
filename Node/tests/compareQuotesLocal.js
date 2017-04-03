function main(){
    global.fiber = Fiber.current;
    V.client = {};
    V.client.name = SFrandomBukva(6) + '_t';
    V.client.fam = SFrandomBukva(6) + '_t';
    V.client.phone = SFrandomCifra(10);
    V.client.email = SFrandomBukvaSmall(6) + '@' + SFrandomBukvaSmall(4) + '.tes';
    V.client.passwd = 123;
    SFget(frontURL);
    nowWeDoing = 'заполняем калькулятор верхний';
    FullSmallCalcAsLocal(V.client);

    nowWeDoing = 'первый раз в аккаунте';
    SFclick(By.xpath('//button[@ng-click="cancel()"][contains(text(),"View request")]'));
    JSwaitForNotExist('div.busyoverlay:visible');
    SFsleep(5);
    JSwaitForNotExist('div.busyoverlay:visible');
    SFclick(By.xpath('//label[@for="partial"]/input[@ng-model="vm.packing_service"]'));
    RememberAccountNumbers();
    LogoutFromAccount();

    nowWeDoing = 'первый раз в админке';
    SFget(adminURL);
    LoginToBoardAsAdmin();
    OpenRequest(V.accountNumbers.Id);
    SFwaitForVisible(By.xpath('//div[@ng-click="chooseTruck(tid)"]'));
    RememberDigitsRequestBoard();
    Validation_Compare_Account_Admin();

    nowWeDoing = 'идём в логи';
    SFclick(By.xpath('//a[@ng-click="select(tabs[5])"]'));
    SFsleep(2);
    JSwaitForNotExist('div.busyoverlay:visible');

    V.logNumbers={};
    SFclick(By.xpath('//span[@ng-bind-html="toTrustedHTML(item.text)"][contains(text(),"Request Quote (Pending Status)")][contains(text(),"'+V.client.email+'")]/../../../following-sibling::div[1]'));
    driver.findElement(By.xpath('//span[@aria-hidden="false"]//h3[contains(text(),"Estimated Quote")]/../../../../../../' +
        'following-sibling::td[1]//div/div/div')).getText().then(function(text){
            V.logNumbers.QuoteMin=SFcleanPrice(text.substring(0,text.indexOf('-')));
            V.logNumbers.QuoteMax=SFcleanPrice(text.substring(text.indexOf('-')+1));
            console.log(V.logNumbers);
    });
    endOfTest();
}

//==================================================================================================
module.exports = main;
