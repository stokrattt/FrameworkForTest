module.exports = function main(SF, JS, MF, LF, JSstep, VD, V, By, until,FileDetector, system, condition, config,constants) {
    global.fiber = Fiber.current;

    //=========================начинаем писать тест=============================
    V.client = {};
    V.client.name = SF.randomBukva(6) + '_t';
    V.client.fam = SF.randomBukva(6) + '_t';
    V.client.phone = SF.randomCifra(10);
    V.client.email = SF.randomBukvaSmall(6) + '@' + SF.randomBukvaSmall(4) + '.tes';
    V.client.passwd = 123;

    condition.nowWeDoing = 'создать local Moving реквест с борда';
    SF.get(V.adminURL);

    LF.LoginToBoardAsAdmin();
    LF.CreateLocalMovingFromBoard(V.client);

    condition.nowWeDoing = 'Добавить сервисы, пекинг и запомнить';
    LF.addInventoryBoard ();
    SF.sleep(1);
    SF.click(By.xpath('//label[@ng-click="openAddPackingModal();"]'));
    SF.waitForVisible(By.xpath('//li[@ng-click="addExtraCharges(extra_charge)"]'));
    SF.sleep(1);
    SF.click(By.xpath('//li[@ng-click="addExtraCharges(extra_charge)"][2]'));
    SF.click(By.xpath('//li[@ng-click="addExtraCharges(extra_charge)"][3]'));
    SF.click(By.xpath('//button[@ng-click="save()"]'));
    SF.sleep(1);
    MF.WaitWhileBusy();
    SF.click(By.xpath('//label[@ng-click="openAddServicesModal();"]'));
    SF.waitForVisible(By.xpath('//li[@ng-repeat="extra_charge in extra_charges"]'));
    SF.sleep(1);
    SF.click(By.xpath('//li[@ng-repeat="extra_charge in extra_charges"][3]'));
    SF.click(By.xpath('//li[@ng-repeat="extra_charge in extra_charges"][5]'));
    SF.click(By.xpath('//li[@ng-repeat="extra_charge in extra_charges"][6]'));
    SF.click(By.xpath('//button[@ng-click="save()"]'));
    MF.WaitWhileBusy();
    V.boardNumbers = {};
    LF.RememberDigitsRequestBoard(V.boardNumbers);
    SF.click(By.xpath('//a[@ng-click="select(tabs[7])"]'));
    SF.sleep(1);
    LF.SetManager('emilia');
    SF.click(By.xpath('//button[@ng-click="cloneRequest(request)"]'));
    MF.SweetConfirm();
    JS.waitForExist('div.requestModal:eq(1)');
    SF.sleep(1);
    SF.waitForVisible(By.xpath('(//div[@class="trucks"])[2]/div[@ng-click="chooseTruck(tid)"]'));
    SF.sleep(2);
    V.boardNumbers2 = {};
    LF.RememberDigitsRequestBoard(V.boardNumbers2);
    V.boardNumbers2.AdServices = V.boardNumbers.AdServices;
    V.boardNumbers2.Packing = V.boardNumbers.Packing;
    LF.Validation_Compare_Account_Admin(V.boardNumbers,V.boardNumbers2);
    SF.sleep (4);

    //=========================закончили писать тест=============================
    SF.endOfTest();
};