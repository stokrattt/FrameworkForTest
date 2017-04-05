module.exports = function main(driver, SF, JS, JSstep, VD, V, By, until,FileDetector, system, condition, LF,config,constants){
    global.fiber = Fiber.current;
    V.client = {};
    V.client.name = SF.randomBukva(6) + '_t';
    V.client.fam = SF.randomBukva(6) + '_t';
    V.client.phone = SF.randomCifra(10);
    V.client.email = SF.randomBukvaSmall(6) + '@' + SF.randomBukvaSmall(4) + '.tes';
    V.note = {};

    SF.get(V.adminURL);
    LF.LoginToBoardAsAdmin();
    LF.CreateLocalMovingFromBoard();
    driver.wait(driver.findElement(By.xpath('//a[@ng-click="select(tabs[0])"]')).getText().then(function(text){
        V.request.Id = SF.cleanPrice(text);
    }));
    SF.click(By.xpath('//div[@ng-model="request.inventory.move_details.admincomments"]//div[@ng-model="html"]'));
    SF.clear(By.xpath('//div[@ng-model="request.inventory.move_details.admincomments"]//div[@ng-model="html"]'));
    V.note = SF.randomBukva(7);
    SF.send(By.xpath('//div[@ng-model="request.inventory.move_details.admincomments"]//div[@ng-model="html"]'), V.note);
    JS.step(JSstep.selectTruck);
    SF.click(By.xpath('//button[@ng-click="UpdateRequest()"]'));
    SF.waitForVisible(By.xpath('//div[@class="modal-content"]'));
    SF.sleep (3);
    driver.wait(driver.findElement(By.xpath('//div[@ng-if="message.label == \'Notes\'"]')).getText().then(function(text) {
      VD.IWant(VD.VToEqual, text, 'Notes was update');
    }),config.timeout);
    SF.click(By.xpath('//button[@ng-click="update(request)"]'));
    JS.waitForNotExist('div.toast-success');
    SF.sleep(4);
    SF.click (By.xpath('//button[@ng-click="cancel()"]'));
    SF.sleep(4);
    LF.OpenRequest(V.request.Id);
    SF.waitForVisible(By.xpath('//div[@ng-click="chooseTruck(tid)"]'));
    console.log(V.note);
    driver.wait(driver.findElement(By.xpath('//div[@ng-model="request.inventory.move_details.admincomments"]//div[@ng-model="html"]')).getText().then(function(text) {
      VD.IWant(VD.VToEqual, text, V.note, 'Не совпали заметочки.');
    }),config.timeout);
    SF.endOfTest();
};
