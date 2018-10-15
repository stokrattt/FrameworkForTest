module.exports = function main(SF, JS, MF, LF, JSstep, VD, V, By, until,FileDetector, system, condition, config,constants) {
    global.fiber = Fiber.current;
    V.client = {};
    V.client.name = SF.randomBukva(6) + '_t';
    V.client.fam = SF.randomBukva(6) + '_t';
    V.client.phone = SF.randomCifra(10);
    V.client.email = SF.randomBukvaSmall(6) + '@' + SF.randomBukvaSmall(4) + '.tes';
    V.client.passwd = 123;

    //=========================начинаем писать тест=============================
    SF.get(V.adminURL);
    LF.LoginToBoardAsCustom(V.adminLogin,V.adminPassword);

condition.nowWeDoing = 'создаем локал мув, конфермим его';
    LF.CreateLocalMovingFromBoard(V.client);
    MF.EditRequest_SetAdressToFrom ();
    V.boardNumbers = {};
    LF.RememberDigitsRequestBoard(V.boardNumbers);
    MF.EditRequest_RememberId(V.request);
    // LF.addToCleanerJob(V.request.Id);
    JS.step(JSstep.selectTruck((V.boardNumbers.LaborTimeMax + V.boardNumbers.TravelTime)/60));
    MF.WaitWhileBusy();
    MF.EditRequest_SetToConfirmed ();
    MF.EditRequest_SaveChanges();
    LF.closeEditRequest ();

condition.nowWeDoing = 'идем в диспач назначем команду';
    MF.Board_OpenLocalDispatch ();
    LF.findDayInLocalDispatch(V.boardNumbers.moveDate.Year, V.boardNumbers.moveDate.Month, V.boardNumbers.moveDate.Day);
    MF.Dispatch_GridView();
    LF.SelectRequestDispatch(V.request.Id);
    LF.selectCrew(V.foremanName);

condition.nowWeDoing = 'переходим сразу с диспача на контракт и подписываем его не до конца ';
    JS.scroll('button[ng-click=\"vm.assignTeam()\"]');
    // JS.scroll('img[ng-click="vm.openCrewModal()"]');
    SF.sleep(1.5);
    JS.click('button[ng-click="vm.openContractInBlack()"]');
    SF.openTab (1);
    MF.Contract_WaitConfirmationPage ();
    MF.Contract_OpenBillOfLading ();
    MF.Contract_WaitBillOfLading ();
    LF.MakeSignInContract ();
    LF.MakeSignInContract ();
    MF.Contract_DeclarationValueA ();
    LF.MakeSignInContract ();
    LF.MakeSignInContract ();
    LF.MakeSignInContract ();
    SF.openTab (0);

condition.nowWeDoing = 'возвращаемся в настройки на мувборд и переходим в настройки контракта, проверять галочки';
    MF.Board_OpenSideBar ();
    MF.Board_OpenSettingsGeneral ();
    SF.sleep(3);
    JS.scroll('.pageheader');
    SF.click(By.linkText('Contract page'));
    SF.sleep (2);
    JS.scroll('.pageheader');
    SF.click (By.xpath('//a[@href="/account/#/request/contract"]'));
    SF.openTab (2);
    SF.sleep (4);
    SF.openTab (1);

condition.nowWeDoing = 'проверяем настройку Credit Card processing fee';
    driver.wait(driver.executeScript("return $('td p:contains(\"Credit Card processing fee:\")').length").then(function (check) {
        V.CreditCardFee = check;
    }),config.timeout);
    SF.sleep(1);
    if (V.CreditCardFee == 1) {
        SF.openTab (2);
        SF.sleep(3);
        SF.click(By.xpath('//input[@ng-model="vm.contract_page.paymentTax.creditCharge.state"]/following-sibling::span[1]'));
        SF.click(By.xpath('//button[@ng-click="vm.save(true)"]'));
        MF.WaitWhileBusy ();
        MF.SweetConfirm ();
        SF.openTab (1);
        driver.navigate().refresh();
        SF.sleep(3);
        MF.Contract_WaitConfirmationPage ();
        MF.Contract_OpenBillOfLading ();
        MF.Contract_WaitBillOfLading ();
        driver.wait(driver.executeScript("return $('td p:contains(\"Credit Card processing fee:\")').length").then(function (check) {
            VD.IWant (VD.ToEqual, check, 0, 'настройка Credit Card processing fee не отключилась');
        }),config.timeout);
    } else {
        SF.openTab (2);
        SF.sleep(3);
        SF.click(By.xpath('//input[@ng-model="vm.contract_page.paymentTax.creditCharge.state"]/following-sibling::span[1]'));
        SF.click(By.xpath('//button[@ng-click="vm.save(true)"]'));
        MF.WaitWhileBusy ();
        MF.SweetConfirm ();
        SF.openTab (1);
        driver.navigate().refresh();
        SF.sleep(3);
        MF.Contract_WaitConfirmationPage ();
        MF.Contract_OpenBillOfLading ();
        MF.Contract_WaitBillOfLading ();
        driver.wait(driver.executeScript("return $('td p:contains(\"Credit Card processing fee:\")').length").then(function (check) {
            VD.IWant (VD.ToEqual, check, 1, 'настройка Credit Card processing fee не включилась');
        }),config.timeout);
    }
condition.nowWeDoing = 'проверяем настройку Custom';
    driver.wait(driver.executeScript("return $('tr[ng-if=\"contract_page.paymentTax.customTax.state\"]').length").then(function (check) {
        V.Custom = check;
    }),config.timeout);
    SF.sleep(1);
    if (V.Custom == 0) {
        SF.openTab (2);
        SF.sleep(3);
        SF.click(By.xpath('//input[@ng-model="vm.contract_page.paymentTax.customTax.state"]/following-sibling::span[1]'));
        SF.click(By.xpath('//button[@ng-click="vm.save(true)"]'));
        MF.WaitWhileBusy ();
        MF.SweetConfirm ();
        SF.openTab (1);
        driver.navigate().refresh();
        SF.sleep(3);
        MF.Contract_WaitConfirmationPage ();
        MF.Contract_OpenBillOfLading ();
        MF.Contract_WaitBillOfLading ();
        driver.wait(driver.executeScript("return $('tr[ng-if=\"contract_page.paymentTax.customTax.state\"]').length").then(function (check) {
            VD.IWant (VD.ToEqual, check, 1, 'настройка Custom не включилась');
        }),config.timeout);
    } else {
        SF.openTab (2);
        SF.sleep(3);
        SF.click(By.xpath('//input[@ng-model="vm.contract_page.paymentTax.customTax.state"]/following-sibling::span[1]'));
        SF.click(By.xpath('//button[@ng-click="vm.save(true)"]'));
        MF.WaitWhileBusy ();
        MF.SweetConfirm ();
        SF.openTab (1);
        driver.navigate().refresh();
        SF.sleep(3);
        MF.Contract_WaitConfirmationPage ();
        MF.Contract_OpenBillOfLading ();
        MF.Contract_WaitBillOfLading ();
        driver.wait(driver.executeScript("return $('tr[ng-if=\"contract_page.paymentTax.customTax.state\"]').length").then(function (check) {
            VD.IWant (VD.ToEqual, check, 0, 'настройка Custom не отключилась');
        }),config.timeout);
    }
condition.nowWeDoing = 'проверяем настройку CASH (DISCOUNT)';
    driver.wait(driver.executeScript("return $('td p:contains(\"Cash (discount):\")').length").then(function (check) {
        V.CashDiscount = check;
    }),config.timeout);
    SF.sleep(1);
    if (V.CreditCardFee == 1) {
        SF.openTab (2);
        SF.sleep(3);
        SF.click(By.xpath('//input[@ng-model="vm.contract_page.paymentTax.cashCharge.state"]/following-sibling::span[1]'));
        SF.click(By.xpath('//button[@ng-click="vm.save(true)"]'));
        MF.WaitWhileBusy ();
        MF.SweetConfirm ();
        SF.openTab (1);
        driver.navigate().refresh();
        SF.sleep(3);
        MF.Contract_WaitConfirmationPage ();
        MF.Contract_OpenBillOfLading ();
        MF.Contract_WaitBillOfLading ();
        driver.wait(driver.executeScript("return $('td p:contains(\"Cash (discount):\")').length").then(function (check) {
            VD.IWant (VD.ToEqual, check, 0, 'настройка CASH (DISCOUNT) не отключилась');
        }),config.timeout);
    } else {
        SF.openTab (2);
        SF.sleep(3);
        SF.click(By.xpath('//input[@ng-model="vm.contract_page.paymentTax.cashCharge.state"]/following-sibling::span[1]'));
        SF.click(By.xpath('//button[@ng-click="vm.save(true)"]'));
        MF.WaitWhileBusy ();
        MF.SweetConfirm ();
        SF.openTab (1);
        driver.navigate().refresh();
        SF.sleep(3);
        MF.Contract_WaitConfirmationPage ();
        MF.Contract_OpenBillOfLading ();
        MF.Contract_WaitBillOfLading ();
        driver.wait(driver.executeScript("return $('td p:contains(\"Cash (discount):\")').length").then(function (check) {
            VD.IWant (VD.ToEqual, check, 1, 'настройка CASH (DISCOUNT) не включилась');
        }),config.timeout);
    }

condition.nowWeDoing = 'тут делаем поалту нашим добавленный кастомным пайментом в настройках и проверяем что процент работает';
    driver.wait(driver.findElement(By.xpath('//td[@class="red_total"]')).getText().then(function (text) {
        V.totalDeposit = SF.cleanPrice(text);
    }),config.timeout);
    SF.sleep(0.5);
    V.customPaymentPercent = (V.totalDeposit * 0.10) + V.totalDeposit;

    MF.Contract_ClickPay();
    SF.click(By.xpath('//div[@ng-if="tips.perc == 0 && tips.amount == 0"]'));
    SF.sleep(3);
    MF.Contract_ClickPaymentInfo();
    SF.click(By.xpath('//div[@ng-click="choosePayment(option.name);"]/p[contains(text(), "forTestNotDelete")]'));
    SF.sleep(2);
    driver.wait(driver.findElement(By.xpath('//div[@ng-if="step2"]/div')).getText().then(function (text) {
        V.totalPaymentWithPercent = SF.cleanPrice(text);
        VD.IWant (VD.ToEqual, (V.totalPaymentWithPercent).toFixed(1), (V.customPaymentPercent).toFixed(1), 'настройка с процентами которую делал Антон не сработала))');
    }),config.timeout);
    SF.click(By.xpath('//input[@ng-click="applyPayment()"]'));

condition.nowWeDoing = 'идем обратно в настройки контракта и включаем по умолчанию кэш дискаунт, кредит кард фии и выключаем кастом';
    SF.openTab (2);
    SF.sleep(2);
    driver.wait(driver.executeScript("if($('input[ng-model=\"vm.contract_page.paymentTax.cashCharge.state\"]').hasClass('ng-not-empty')){" +
        "return true;}else{$('input[ng-model=\"vm.contract_page.paymentTax.cashCharge.state\"] ~span').click()}"),config.timeout);
    SF.sleep(0.5);
    driver.wait(driver.executeScript("if($('input[ng-model=\"vm.contract_page.paymentTax.creditCharge.state\"]').hasClass('ng-not-empty')){" +
        "return true;}else{$('input[ng-model=\"vm.contract_page.paymentTax.creditCharge.state\"] ~span').click()}"),config.timeout);
    SF.sleep(0.5);
    driver.wait(driver.executeScript("if($('input[ng-model=\"vm.contract_page.paymentTax.customTax.state\"]').hasClass('ng-empty')){" +
        "return true;}else{$('input[ng-model=\"vm.contract_page.paymentTax.customTax.state\"] ~span').click()}"),config.timeout);
    SF.sleep(0.5);
    SF.click(By.xpath('//button[@ng-click="vm.save(true)"]'));
    MF.WaitWhileBusy ();
    MF.SweetConfirm ();

    //=========================закончили писать тест=============================
    SF.endOfTest();
};
