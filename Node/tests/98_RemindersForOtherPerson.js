module.exports = function main(SF, JS, MF, LF, JSstep, VD, V, By, until,FileDetector, system, condition, config,constants) {
    global.fiber = Fiber.current;
    V.client = {};
    V.client.name = SF.randomBukva(6) + '_t';
    V.client.fam = SF.randomBukva(6) + '_t';
    V.client.phone = SF.randomCifra(10);
    V.client.email = SF.randomBukvaSmall(6) + '@' + SF.randomBukvaSmall(4) + '.tes';
    V.RemaindText = SF.randomBukva(10) + '_t';
    V.salesLogin = 'Emilia';
    V.salesPassword = '123';

    SF.get(V.adminURL);

condition.nowWeDoing = 'создаем рекевст под оунером, добавляем римайндер, назначаем сеилса на римайндер';
    LF.LoginToBoardAsCustom(V.adminLogin,V.adminPassword);
    LF.CreateLocalMovingFromBoard(V.client);
    V.requestAdmin={};
    MF.EditRequest_RememberId(V.requestAdmin);
    MF.EditRequest_OpenSettings();
    LF.SetManager('emilia');
    MF.EditRequest_OpenRequest();
    MF.EditRequest_OpenRemainderWindow();
    SF.click(By.xpath('//select[@ng-model="$ctrl.uid"]//option[@label="emilia clark"]'));
    SF.click(By.xpath('//textarea[@name="description"]'));
    SF.send(By.xpath('//textarea[@name="description"]'),V.RemaindText);
    SF.sleep(2);
    SF.click(By.xpath('//button[@ng-click="$ctrl.switchDatepicker()"]'));
    SF.click(By.xpath('//button[@ng-click="move(1)"]'));
    SF.sleep(1);
    SF.click(By.xpath('//button[@ng-click="select(dt.date)"]//span[contains(text(),"01")]'));
    SF.click(By.xpath('//input[@type="time"]'));
    SF.send(By.xpath('//input[@type="time"]'),'0505');
    SF.click(By.xpath('//i[@class="fa fa-paint-brush"]'));
    MF.WaitWhileBusy();
    SF.click(By.xpath('//div[@style="background-color: rgb(128, 216, 255);"]'));
    driver.wait(driver.findElement(By.xpath('//div[@style="background-color: rgb(128, 216, 255);"]')).getCssValue("background-color").then(function (color) {
        V.RemaindTextAdmin = color;
    }),config.timeout);
    MF.WaitWhileBusy();
    SF.click(By.xpath('//button[@ng-click="$ctrl.saveReminder()"]'));
    SF.sleep(4);
    MF.WaitWhileToaster();
    LF.closeEditRequest();
    MF.Board_LogoutAdmin();

condition.nowWeDoing = 'заходим за сеилса, сверяем римайдер, удаляем, проверяем что текст стал PAST';
    LF.LoginToBoardAsCustom(V.salesLogin, V.salesPassword);
    MF.Board_OpenRequest(V.requestAdmin.Id);
    SF.click(By.xpath('//span[@ng-click="openReminderBox()"]'));
    SF.click(By.xpath('//li[@index="1"]'));
    MF.WaitWhileBusy();
    MF.WaitWhileBusy();
    driver.wait(driver.findElement(By.xpath('//span[contains(text(),"'+V.RemaindText+'")]')).getText().then(function(text) {
        V.RemaindTextSales = text;
        VD.IWant(VD.ToEqual, V.RemaindText, V.RemaindTextSales,'проверяем текст римайндера');
    }),config.timeout);
    SF.sleep(1);
    driver.wait(driver.findElement(By.xpath('//reminder-min[@ng-click="$ctrl.openDialog(reminder)"]')).getCssValue("background-color").then(function (color) {
        V.RemaindTextSales = color;
        VD.IWant(VD.ToEqual, V.RemaindTextAdmin, V.RemaindTextSales,'цвет римайндера не совпал');
    }),config.timeout);
    SF.sleep(4);
    SF.click(By.xpath('//button[@ng-click="$ctrl.reminder.dismiss();"]'));
    MF.WaitWhileToaster();
    MF.WaitWhileToaster();
    SF.sleep(4);
    driver.wait(driver.findElement(By.xpath('//div[@ng-if="expired.length"]')).getText().then(function(text) {
        V.TitleReq = text;
        VD.IWant(VD.ToEqual, V.TitleReq, 'PAST','текст не поменялся на PAST');
    }),config.timeout);
    SF.sleep(1);
    SF.click(By.xpath('//li[@index="0"]'));
    SF.click(By.xpath('//button[@ng-click="$ctrl.done()"]'));
    LF.closeEditRequest();

condition.nowWeDoing = 'идем во вкладку римайндеры, и ищем римайндер в PAST';
    SF.click(By.xpath('//div[@class="slide-panel-invoker"]'));
    MF.WaitWhileBusy();
    MF.WaitWhileBusy();
    SF.click(By.xpath('//button[@ng-click="$ctrl.isPickerOpened = !$ctrl.isPickerOpened"]'));
    SF.click(By.xpath('//button[@ng-click="move(1)"]'));
    SF.sleep(1);
    SF.click(By.xpath('//button[@ng-click="select(dt.date)"]//span[contains(text(),"01")]'));
    MF.WaitWhileBusy();
    SF.click(By.xpath('//li[@index="1"]'));
    driver.wait(driver.findElement(By.xpath('//span[@ng-bind="$ctrl.reminder.description" and contains(text(), "'+V.RemaindText+'")]')).getText().then(function(text) {
        V.RemaindText2 = text;
        VD.IWant(VD.ToEqual, V.RemaindText, V.RemaindText2,'римайндера нет в PAST');
    }),config.timeout);
    SF.sleep(1);

    SF.endOfTest();
};