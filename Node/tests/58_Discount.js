module.exports = function main(SF, JS, MF, LF, JSstep, VD, V, By, until,FileDetector, system, condition, config,constants) {
    global.fiber = Fiber.current;
    V.client = {};
    V.client.name = SF.randomBukva(6) + '_t';
    V.client.fam = SF.randomBukva(6) + '_t';
    V.client.phone = SF.randomCifra(10);
    V.client.email = SF.randomBukvaSmall(6) + '@' + SF.randomBukvaSmall(4) + '.tes';
    V.client.passwd = 123;

    //=========================начинаем писать тест=============================
    SF.get(V.frontURL);

condition.nowWeDoing = 'создаем локал мув с фронта с верхней формы';
    LF.FullSmallCalcAsLocal (V.client);
    MF.Account_ClickViewRequest();
    MF.WaitWhileBusy();
    SF.sleep(3);
    MF.WaitWhileBusy();

condition.nowWeDoing = 'добавляем два разы инвенторий и ставим фул паккинг и запоминаем данные';
    LF.AccountLocalAddInventory ();
    LF.AccountLocalAddAdditionalInventory ();
    SF.click(By.xpath('//input[@ng-model="vm.packing_service"]/following-sibling::span[contains(text(), "I need Full Packing")]'));
    SF.sleep(3);
    MF.WaitWhileBusy ();
    V.accountNumbers = {};
    LF.RememberAccountNumbers (V.accountNumbers);
    LF.LogoutFromAccount ();
    SF.get(V.adminURL);
    LF.LoginToBoardAsCustom(V.adminLogin,V.adminPassword);

condition.nowWeDoing = 'пошли на дашборд, открываем реквест, сравниваем данные, ставим в настройках показать дискаунт на акке и добавляем в реквесте тоже дискаунт, запоминаем данные';
    LF.OpenRequest (V.accountNumbers.Id);
    V.boardNumbers = {};
    LF.RememberDigitsRequestBoard (V.boardNumbers);
    SF.sleep(1);
    LF.Validation_Compare_Account_Admin (V.accountNumbers, V.boardNumbers);
    SF.sleep(1);
    MF.EditRequest_OpenSettings ();
    SF.click(By.xpath('//input[@ng-model="request.request_all_data.showCoupons"]/following-sibling::span'));
    SF.sleep(1);
    MF.EditRequest_OpenClient ();
    LF.SetClientPasswd (V.client.passwd);
    MF.EditRequest_OpenRequest ();
    SF.click(By.xpath('//label[@ng-click="OpenDiscountModal();"]'));
    SF.waitForLocated (By.xpath('//button[@ng-click="openCouponModal()"]'));
    SF.sleep(2);
    SF.click(By.xpath('//input[@ng-model="request.request_all_data.add_money_discount"]'));
    SF.send(By.xpath('//input[@ng-model="request.request_all_data.add_money_discount"]'), 500);
    SF.click(By.xpath('//input[@ng-model="request.request_all_data.add_percent_discount"]'));
    SF.click(By.xpath('//button[@ng-click="Apply()"]'));
    MF.SweetConfirm ();
    SF.sleep(1);
    V.boardNumbersDiscount = {};
    LF.RememberDigitsRequestBoard (V.boardNumbersDiscount);
    VD.IWant (VD.VNotToEqual, V.boardNumbers.TotalMin, V.boardNumbersDiscount.TotalMin, 'скидка не применилась');
    MF.EditRequest_SetAdressToFrom ();
    MF.EditRequest_SaveChanges ();
    LF.closeEditRequest ();
    MF.Board_LogoutAdmin ();
    SF.get(V.accountURL);
    LF.LoginToAccountAsClient (V.client);

condition.nowWeDoing = 'идем в акк запоминаем данные и сравниваем с админкой и используем купон';
    MF.Account_OpenRequest (V.accountNumbers.Id);
    V.accountNumbersDiscount = {};
    LF.RememberAccountNumbers (V.accountNumbersDiscount);
    LF.Validation_Compare_Account_Admin (V.accountNumbersDiscount, V.boardNumbersDiscount);
    SF.click(By.id('tab_Coupons'));
    SF.waitForLocated (By.xpath('//a[@ng-click="setRequestNid()"]'));
    MF.WaitWhileBusy ();
    SF.click (By.xpath('//a[@ng-click="setRequestNid()"]'));
    MF.WaitWhileBusy ();
    SF.click(By.xpath('//a[@ng-click="vm.couponPayment();"]'));
    LF.FillCardPayModalBuyCoupon ();
    MF.WaitWhileBusy ();
    LF.MakeSignJS ('signatureCanvasPayment');
    SF.click(By.xpath('//button[@ng-click="saveSignature()"]'));
    JS.waitForExist('button.confirm');
    SF.sleep(1);
    driver.wait(driver.findElement(By.xpath('//h3[contains(text(), "We have sent you an email with coupon details.")]/following-sibling::h3/b')).getText().then(function (cod) {
        V.DiscountCode = cod;
    }),config.timeout);
    SF.sleep(1);
    SF.click(By.xpath('//button[@class="confirm"]'));
    SF.sleep(3);
    MF.WaitWhileBusy ();
    LF.LogoutFromAccount ();
    SF.get(V.adminURL);
    LF.LoginToBoardAsCustom(V.adminLogin,V.adminPassword);

condition.nowWeDoing = 'пошли в админку второй раз, конфермим работу идем в диспач назначаем команду';
    LF.OpenRequest (V.accountNumbers.Id);
    JS.step(JSstep.selectTruck((V.boardNumbers.LaborTimeMax + V.boardNumbers.TravelTime)/60));
    MF.EditRequest_SetToConfirmed ();
    MF.EditRequest_SaveChanges ();
    LF.closeEditRequest ();
    MF.Board_OpenLocalDispatch ();
    LF.findDayInLocalDispatch(V.boardNumbers.moveDate.Year, V.boardNumbers.moveDate.Month, V.boardNumbers.moveDate.Day);
    MF.WaitWhileBusy();
    MF.WaitWhileBusy();
    MF.Dispatch_GridView();
    LF.SelectRequestDispatch(V.accountNumbers.Id);
    LF.selectCrew(V.foremanName);
    MF.Board_LogoutAdmin();

condition.nowWeDoing = 'заходим под форменом, открываем контракт, запоминавем тотал, используем купон и проверяем что сумма уменьшилась';
    LF.LoginToBoardAsCustomForeman(V.foremanLogin, V.foremanPassword);
    LF.OpenRequestDispatch(V.accountNumbers.Id);
    MF.Contract_WaitConfirmationPage();
    MF.Contract_OpenBillOfLading();
    SF.sleep(1);
    LF.MakeSignInContract();
    LF.MakeSignInContract();
    MF.Contract_DeclarationValueA();
    LF.MakeSignInContract();
    LF.MakeSignInContract();
    LF.MakeSignInContract();
    SF.click(By.xpath('//span[@ng-click="showDiscountInContract()"]'));
    driver.wait(driver.findElement(By.xpath('//p[contains(text(), "Total less deposit received:")]/../following-sibling::td')).getText().then(function (text) {
        V.TotalLess = SF.cleanPrice(text);
        console.log(V.TotalLess);
    }),config.timeout);
    SF.sleep(1);
    SF.click(By.xpath('//button[@ng-click="openCouponModal()"]'));
    JS.waitForExist('button.confirm');
    SF.sleep(1);
    SF.send(By.xpath('//input[@placeholder="Promo code"]'), V.DiscountCode);
    MF.WaitWhileBusy ();
    SF.click(4);
    SF.click(By.xpath('//button[@class="confirm"]'));
    MF.SweetConfirm ();
    driver.wait(driver.findElement(By.xpath('//p[contains(text(), "Total less deposit received:")]/../following-sibling::td')).getText().then(function (text) {
        V.TotalLessWithDiscount = SF.cleanPrice(text);
        console.log(V.TotalLessWithDiscount);
    }),config.timeout);
    SF.sleep(1);
    VD.IWant (VD.VNotToEqual, V.TotalLess, V.TotalLessWithDiscount, 'скидка-купон на контракте не применилась');
    SF.sleep(1);
    MF.Contract_ClickPay();
    SF.click(By.xpath('//div[@ng-click="tipsSelected()"]'));
    SF.sleep(1);
    driver.wait(driver.findElement(By.xpath('//input[@ng-model="charge_value.value"]')).getAttribute('value').then(function (text) {
        V.Payment = SF.cleanPrice (text);
        console.log(V.Payment);
    }),config.timeout);
    SF.sleep(1);
    VD.IWant (VD.VToEqual, V.Payment, V.TotalLessWithDiscount, 'в модальном окне при оплате скидка-купон на контракте не применилась');
    SF.sleep(1);
    MF.Contract_ClickPaymentInfo();
    SF.click(By.xpath('//div[@ng-click="choosePayment(\'checkPay\');"]'));
    SF.sleep(1);
    driver.wait(driver.findElement(By.xpath('//div[@ng-init="payment.setPaymentBlockHeight(\'.credit_form.credit-pay\')"]/div[1]')).getText().then(function (text) {
        V.PaymentCheck = SF.cleanPrice (text);
        console.log(V.PaymentCheck);
    }),config.timeout);
    SF.sleep(1);
    VD.IWant (VD.VToEqual, V.PaymentCheck, V.TotalLessWithDiscount, 'в модальном окне при оплате Check скидка-купон на контракте не применилась');
    SF.sleep(1);
    SF.send (By.xpath('//input[@ng-model="paymentCheck.check_num"]'), 56556566);
    SF.click(By.xpath('//input[@ng-click="applyPayment()"]'));
    MF.WaitWhileBusy ();
    SF.sleep(3);
    LF.MakeSignInContract();
    LF.MakeSignInContract();
    MF.Contract_Submit();
    MF.Contract_ReturnToForeman();
    LF.LogoutFromBoardForeman();
    SF.get(V.accountURL);
    LF.LoginToAccountAsClient (V.client);

condition.nowWeDoing = 'идем в акк третий раз в конце после подписи проверять паймент на аккаунте';
    MF.Account_OpenRequest (V.accountNumbers.Id);
    MF.WaitWhileBusy ();
    MF.Account_WaitForGreenTextAfterConfirm ();
    SF.click(By.xpath('//li[@id="tab_Payment Receipts"]'));
    driver.wait(driver.findElement(By.xpath('//tr[@ng-repeat="receipt in vm.request.receipts track by $index"]/td[3]')).getText().then(function (text) {
        V.PaymentAccount = SF.cleanPrice (text);
        console.log(V.PaymentAccount);
    }),config.timeout);
    SF.sleep(1);
    VD.IWant (VD.VToEqual, V.PaymentAccount, V.TotalLessWithDiscount, 'на аккаунте во вкладке паймент не совпала оплата которая была на контракте');
    SF.sleep(1);
    SF.click(By.xpath('//tr[@ng-repeat="receipt in vm.request.receipts track by $index"]/td[4]'));
    SF.waitForLocated (By.xpath('//div[@class="payment-receipt-modal ng-scope printSection"]'));
    driver.wait(driver.findElement(By.xpath('//span[contains(text(), "Amount:")]/following-sibling::span')).getText().then(function (text) {
        V.PaymentReceipt = SF.cleanPrice (text);
        console.log(V.PaymentReceipt);
    }),config.timeout);
    SF.sleep(1);
    VD.IWant (VD.VToEqual, V.PaymentReceipt, V.TotalLessWithDiscount, 'на аккаунте во вкладке паймент в ресите не совпала оплата которая была на контракте');
    SF.sleep(1);
    SF.click(By.xpath('//button[@ng-click="cancel()"]'));
    LF.LogoutFromAccount ();

    //=========================закончили писать тест=============================
    SF.endOfTest();
};