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
    LF.addToCleanerJob(V.accountNumbersTo.Id);
    SF.sleep(1);
    condition.nowWeDoing='запомнили цифры ToStorage идём на From';
    SF.click(By.xpath('//a[@ng-click="vm.goToRequest(vm.request.storage_id)"]'));
    JS.waitForNotExist('div.busyoverlay:visible');
    SF.sleep(5);
    JS.waitForNotExist('div.busyoverlay:visible');
    LF.AccountFromStorageEnterAddress();
    V.accountNumbersFrom={};
    LF.RememberAccountNumbers(V.accountNumbersFrom);
    LF.addToCleanerJob(V.accountNumbersFrom.Id);
    LF.LogoutFromAccount();

    condition.nowWeDoing='Зайти на админку, найти реквест To storage, выставить трак, проверить, запомнить и сравнить все цифры с аккаунтом, выставить sales, дать клиенту пароль, поставить Not Confirmed, сохранить.';
    SF.get(V.adminURL);
    LF.LoginToBoardAsAdmin();
    LF.OpenRequest(V.accountNumbersTo.Id);
    V.boardNumbersTo = {};
    LF.RememberDigitsRequestBoard(V.boardNumbersTo);
    JS.step(JSstep.selectTruck((V.boardNumbersTo.LaborTimeMax + V.boardNumbersTo.TravelTime)/60));
    JS.scroll('div.ServicesCost:visible');
    LF.Validation_Compare_Account_Admin(V.accountNumbersTo, V.boardNumbersTo);
    SF.click(By.xpath('//a[@ng-click="select(tabs[7])"]'));
    SF.sleep(1);
    LF.SetManager('emilia');
    SF.click(By.xpath('//a[@ng-click="select(tabs[4])"]'));
    LF.SetClientPasswd(V.client.passwd);
    SF.click(By.xpath('//a[@ng-click="select(tabs[0])"]'));
    SF.sleep(1);
    SF.select(By.xpath('//select[@id="edit-status"]'), 2);
    SF.click(By.xpath('//button[@ng-click="UpdateRequest()"]'));
    JS.waitForExist('button[ng-click="update(request)"]:visible');
    SF.click(By.xpath('//button[@ng-click="update(request)"]'));
    LF.closeEditRequest();
    SF.sleep(2);
    condition.nowWeDoing='From storage, выставить трак, проверить, запомнить и сравнить все цифры с аккаунтом, выставить sales, дать клиенту пароль, поставить Not Confirmed, сохранить.';
    LF.OpenRequest(V.accountNumbersFrom.Id);
    V.boardNumbersFrom = {};
    LF.RememberDigitsRequestBoard(V.boardNumbersFrom);
    JS.step(JSstep.selectTruck((V.boardNumbersFrom.LaborTimeMax + V.boardNumbersFrom.TravelTime)/60));
    JS.scroll('div.ServicesCost:visible');
    LF.Validation_Compare_Account_Admin(V.accountNumbersFrom, V.boardNumbersFrom);
    SF.click(By.xpath('//a[@ng-click="select(tabs[7])"]'));
    SF.sleep(1);
    LF.SetManager('emilia');
    SF.click(By.xpath('//a[@ng-click="select(tabs[4])"]'));
    LF.SetClientPasswd(V.client.passwd);
    SF.click(By.xpath('//a[@ng-click="select(tabs[0])"]'));
    SF.sleep(1);
    SF.select(By.xpath('//select[@id="edit-status"]'), 2);
    SF.click(By.xpath('//button[@ng-click="UpdateRequest()"]'));
    JS.waitForExist('button[ng-click="update(request)"]:visible');
    SF.click(By.xpath('//button[@ng-click="update(request)"]'));
    JS.waitForExist('div.toast-success:visible');
    LF.closeEditRequest();
    SF.sleep(2);
    LF.LogoutFromBoardAdmin();

    condition.nowWeDoing='Зайти в аккаунт и подтвердить первый реквест. Можно ещё раз сравнить все цифры с админкой';
    SF.get(V.accountURL);
    LF.LoginToAccountAsClient(V.client);
    SF.waitForVisible(By.xpath('//td[contains(text(),"' + V.accountNumbersTo.Id + '")]/following-sibling::td[1]'));
    driver.wait(driver.findElement(By.xpath('//td[contains(text(),"' + V.accountNumbersTo.Id + '")]/following-sibling::td[1]')).getText().then(function (Status) {
        VD.IWant(VD.VToEqual, Status, 'Not Confirmed');
    }),config.timeout);
    SF.click(By.xpath('//td[contains(text(),"' + V.accountNumbersTo.Id + '")]/following-sibling::td/button[contains(text(),"View")]'));
    SF.sleep(2);
    JS.waitForNotExist('div.busyoverlay:visible');
    V.accountNumbersTo={};
    LF.RememberAccountNumbers(V.accountNumbersTo);
    LF.Validation_Compare_Account_Admin(V.accountNumbersTo, V.boardNumbersTo);
    LF.ConfirmRequestInAccount_WithReservation();
    SF.waitForVisible(By.xpath('//div[contains(text(),"Your move is confirmed and scheduled")]'));
    SF.sleep(2);
    JS.waitForNotExist('div.busyoverlay:visible');
    condition.nowWeDoing='Подтвердить второй реквест. Можно ещё раз сравнить все цифры с админкой';
    SF.click(By.xpath('//a[@ng-click="vm.goToRequest(vm.request.storage_id)"]'));
    SF.sleep(2);
    JS.waitForNotExist('div.busyoverlay:visible');
    V.accountNumbersFrom={};
    LF.RememberAccountNumbers(V.accountNumbersFrom);
    LF.Validation_Compare_Account_Admin(V.accountNumbersFrom, V.boardNumbersFrom);
    LF.ConfirmRequestInAccount_WithReservation();
    SF.waitForVisible(By.xpath('//div[contains(text(),"Your move is confirmed and scheduled")]'));
    LF.LogoutFromAccount();

    condition.nowWeDoing='Зайти в local Dispatch, найти первый реквест, назначить команду и отправить работу.';
    SF.get(V.adminURL);
    LF.LoginToBoardAsAdmin();
    SF.click(By.xpath('//a[@ng-click="vm.goToPage(\'dispatch.local\', \'\')"]'));
    SF.waitForLocated(By.xpath('//a[@class="ui-datepicker-next ui-corner-all"]'));
    LF.findDayInLocalDispatch(V.boardNumbersTo.moveDate.Year, V.boardNumbersTo.moveDate.Month, V.boardNumbersTo.moveDate.Day);
    JS.waitForNotExist('div.busyoverlay:visible');
    SF.sleep(1);
    SF.click(By.xpath('//i[contains(@ng-click,"view.grid = true;")]'));
    JS.waitForNotExist('div.busyoverlay:visible');
    SF.sleep(1);
    LF.SelectRequestDispatch(V.accountNumbersTo.Id);
    LF.selectCrew();
    condition.nowWeDoing='Найти второй реквест, назначить команду и отправить работу.';
    LF.findDayInLocalDispatch(V.boardNumbersFrom.moveDate.Year, V.boardNumbersFrom.moveDate.Month, V.boardNumbersFrom.moveDate.Day);
    JS.waitForNotExist('div.busyoverlay:visible');
    SF.sleep(1);
    LF.SelectRequestDispatch(V.accountNumbersFrom.Id);
    LF.selectCrew();

    //=========================закончили писать тест=============================
    SF.endOfTest();
};