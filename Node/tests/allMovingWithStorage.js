module.exports = function main(SF, JS, JSstep, VD, V, By, until,FileDetector, system, condition, LF,config,constants){
    global.fiber = Fiber.current;

    //=========================начинаем писать тест=============================
    V.client = {};
    V.client.name = SF.randomBukva(6) + '_t';
    V.client.fam = SF.randomBukva(6) + '_t';
    V.client.phone = SF.randomCifra(10);
    V.client.email = SF.randomBukvaSmall(6) + '@' + SF.randomBukvaSmall(4) + '.tes';
    V.client.passwd = 123;

    condition.nowWeDoing='заполняем верхнюю форму как MovingWithStorage';
    SF.get(V.frontURL);
    LF.FullSmallCalcAsMovingWithStorage(V.client);
    JS.waitForExist('ultrasmall-form #congrats_menu[style="right: 0px;"] a:contains("Proceed To View Your Quote")');
    JS.link('ultrasmall-form a:contains("Proceed To View Your Quote")');
    condition.nowWeDoing='зашли первый раз в аккаунт';
    SF.click(By.xpath('//button[@ng-click="cancel()"][contains(text(),"View request")]'));
    JS.waitForNotExist('div.busyoverlay:visible');
    SF.sleep(5);
    JS.waitForNotExist('div.busyoverlay:visible');
    LF.AccountToStorageEnterAddress();
    LF.AccountLocalAddInventory();
    LF.AccountLocalDetails();
    SF.waitForVisible(By.xpath('//li[@id="tab_Inventory"]//i[@class="icon-check"]'));
    SF.waitForVisible(By.xpath('//li[@id="tab_Details"]//i[@class="icon-check"]'));
    V.accountNumbersTo={};
    LF.RememberAccountNumbers(V.accountNumbersTo);
    SF.sleep(1);
    condition.nowWeDoing='запомнили цифры ToStorage идём на From';
    SF.click(By.xpath('//a[@ng-click="vm.goToRequest(vm.request.storage_id)"]'));
    JS.waitForNotExist('div.busyoverlay:visible');
    SF.sleep(5);
    JS.waitForNotExist('div.busyoverlay:visible');
    //LF.AccountToStorageEnterAddress();
    V.accountNumbersFrom={};
    LF.RememberAccountNumbers(V.accountNumbersFrom);
    LF.LogoutFromAccount();

    condition.nowWeDoing='Зайти на админку, найти реквест To storage, выставить трак, проверить, запомнить и сравнить все цифры с аккаунтом, выставить sales, дать клиенту пароль, поставить Not Confirmed, сохранить.';
    SF.get(V.adminURL);
    LF.LoginToBoardAsAdmin();
    LF.OpenRequest(V.accountNumbersTo.Id);
    JS.step(JSstep.selectTruck);


    //=========================закончили писать тест=============================
    SF.endOfTest();
};