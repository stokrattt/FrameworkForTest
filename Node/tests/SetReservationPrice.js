module.exports = function main(SF, JS, MF, LF, JSstep, VD, V, By, until,FileDetector, system, condition, config,constants) {
    global.fiber = Fiber.current;

    //=========================начинаем писать тест=============================
    SF.get(V.adminURL);
    LF.LoginToBoardAsAdmin();
    SF.sleep (3);
    SF.click (By.xpath('//button[@ng-click="toggleLeft()"]'));
    SF.waitForVisible (By.xpath('//button[@ng-click="toggleLeft()"]'));
    SF.click (By.xpath('//a[@ng-click="vm.goToPage(\'settings.general\', \'\')"]'));
    SF.waitForVisible (By.xpath('//a[@ng-click="vm.goToPage(\'settings.general\', \'\')"]'));
    SF.click (By.xpath('//a[@ui-sref="settings.schedule"]'));
    SF.waitForVisible (By.xpath('//a[@ui-sref="settings.schedule"]'));
    SF.sleep(3);

    SF.click (By.xpath('//input[@ng-model="vm.scheduleSettings.localReservationRate"]'));
    SF.sleep (2);
    SF.send (By.xpath('//input[@ng-model="vm.scheduleSettings.localReservationRate"]'), 150);
    SF.sleep (2);
    SF.click (By.xpath('//input[@ng-model="vm.scheduleSettings.flatReservationRate"]'));
    SF.sleep(2);
    driver.navigate().refresh();
    SF.waitForLocated(By.linkText('Create Request'));
    SF.sleep (3);
    LF.LogoutFromBoardAdmin ();


    //=========================закончили писать тест=============================
    SF.endOfTest();
};
