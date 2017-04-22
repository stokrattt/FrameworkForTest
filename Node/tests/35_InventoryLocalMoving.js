module.exports = function main(SF, JS, JSstep, VD, V, By, until, FileDetector, system, condition, LF, config, constants) {
    global.fiber = Fiber.current;

    //=========================начинаем писать тест=============================
    V.client = {};
    V.client.name = SF.randomBukva(6) + '_t';
    V.client.fam = SF.randomBukva(6) + '_t';
    V.client.phone = SF.randomCifra(10);
    V.client.email = SF.randomBukvaSmall(6) + '@' + SF.randomBukvaSmall(4) + '.tes';
    V.client.passwd = 123;

    condition.nowWeDoing = 'Создать с фронта local Moving';
    SF.get(V.frontURL);
    LF.FullSmallCalcAsLocal(V.client);

    condition.nowWeDoing = 'Зайти на аккаунт, добавить инвентарь, запомнить cbf';
    SF.click(By.xpath('//button[@ng-click="cancel()"][contains(text(),"View request")]'));
    JS.waitForNotExist('div.busyoverlay:visible');
    SF.sleep(5);
    JS.waitForNotExist('div.busyoverlay:visible');
    V.accountNumbers={};
    LF.AccountLocalAddInventory(V.accountNumbers);
    SF.waitForVisible(By.xpath('//li[@id="tab_Inventory"]//i[@class="icon-check"]'));
    LF.RememberAccountNumbers(V.accountNumbers);
    LF.LogoutFromAccount();

    condition.nowWeDoing = 'первый раз в админке';
    SF.get(V.adminURL);
    LF.LoginToBoardAsAdmin();
    SF.sleep (3);
    LF.OpenRequest(V.accountNumbers.Id);
    V.boardNumbers={};
    LF.RememberDigitsRequestBoard(V.boardNumbers);
    VD.IWant(VD.VToEqual, V.accountNumbers.InventoryCbf, V.boardNumbers.cbf,'Не совпали cbf аккаунта и борда');
    LF.addInventoryBoard (V.boardNumbers);
    SF.click(By.xpath('//a[@ng-click="select(tabs[4])"]'));
    LF.SetClientPasswd(V.client.passwd);
    SF.click(By.xpath('//a[@ng-click="select(tabs[0])"]'));
    SF.sleep(1);
    SF.click(By.xpath('//button[@ng-click="UpdateRequest()"]'));
    JS.waitForExist('button[ng-click="update(request)"]:visible');
    SF.click(By.xpath('//button[@ng-click="update(request)"]'));
    LF.closeEditRequest();
    SF.sleep(2);
    LF.LogoutFromBoardAdmin();

    condition.nowWeDoing = 'второй раз в аккаунте';
    SF.get(V.accountURL);
    LF.LoginToAccountAsClient(V.client);
    SF.waitForVisible(By.xpath('//td[contains(text(),"' + V.accountNumbers.Id + '")]/following-sibling::td[1]'));
    driver.wait(driver.findElement(By.xpath('//td[contains(text(),"' + V.accountNumbers.Id + '")]/following-sibling::td[1]')).getText().then(function (Status) {
        VD.IWant(VD.VToEqual, Status, 'Pending');
    }),config.timeout);
    SF.click(By.xpath('//td[contains(text(),"' + V.accountNumbers.Id + '")]/following-sibling::td/button[contains(text(),"View")]'));
    SF.sleep(2);
    JS.waitForNotExist('div.busyoverlay:visible');
    LF.RememberAccountNumbers(V.accountNumbers);
    VD.IWant(VD.VToEqual, V.accountNumbers.cbf, V.boardNumbers.InventoryCubicFit);

    //=========================закончили писать тест=============================
    SF.endOfTest();
};