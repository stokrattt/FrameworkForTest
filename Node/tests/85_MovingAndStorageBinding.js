
module.exports = function main(SF, JS, MF, LF, JSstep, VD, V, By, until,FileDetector, system, condition, config,constants) {
    global.fiber = Fiber.current;

    //=========================начинаем писать тест=============================
    V.client = {};
    V.client.name = SF.randomBukva(6) + '_t';
    V.client.fam = SF.randomBukva(6) + '_t';
    V.client.phone = SF.randomCifra(10);
    V.client.email = SF.randomBukvaSmall(6) + '@' + SF.randomBukvaSmall(4) + '.tes';
    V.client.passwd = 123;
    V.managerName = 'emilia clark';

    SF.get(V.adminURL);
    LF.LoginToBoardAsCustom(V.adminLogin,V.adminPassword);
    LF.CreateMovAndStorFromBoard(V.client);
    V.boardNumbers1 = {};
    V.boardNumbers2 = {};
    LF.RememberDigitsRequestBoard_Up(V.boardNumbers1);
    V.boardNumbers2.Id = V.boardNumbers1.Id + 1;
    SF.click(By.xpath('//i[@ng-click="openRelinkModal()"]'));
    JS.waitForExist('input[ng-model="secondRequestNid"]:visible');
    driver.wait(driver.findElement(By.xpath('//input[@ng-model="secondRequestNid"]')).getAttribute('value').then(function(text){
        V.secondRequestId = text;
    }),config.timeout);
    JS.click('button[ng-click=\\"close()\\"]:visible');
    SF.sleep(1);
    LF.closeEditRequest();
    MF.Board_OpenRequest(V.boardNumbers2.Id);

    VD.IWant(VD.ToEqual, V.boardNumbers2.Id, V.secondRequestId, 'не совпали айдишки реквестов 1');
    JS.click('i[ng-click=\\"openRelinkModal()\\"]:visible');
    JS.waitForExist('input[ng-model="secondRequestNid"]:visible');
    driver.wait(driver.findElement(By.xpath('//input[@ng-model="secondRequestNid"]')).getAttribute('value').then(function(text){
        V.firstRequestId = text;
        VD.IWant(VD.ToEqual, V.boardNumbers1.Id, V.firstRequestId, 'не совпали айдишки реквестов 2');
    }),config.timeout);
    SF.sleep(1);
    SF.clear(By.xpath('//input[@ng-model="secondRequestNid"]'));
    driver.wait(driver.findElement(By.xpath('//input[@ng-model="secondRequestNid"]')).getAttribute('value').then(function(text){
        V.emptyId1 = text;
    }),config.timeout);
    JS.click('button[ng-click=\\"update()\\"]:visible');
    SF.sleep(1);
    LF.closeEditRequest();
    MF.Board_OpenRequest(V.boardNumbers1.Id);
    SF.click(By.xpath('//img[@ng-click="openGroupModal()"]'));
    JS.waitForExist('input[ng-model="secondRequestNid"]:visible');
    SF.send(By.xpath('//input[@ng-model="secondRequestNid"]'), V.boardNumbers2.Id);
    JS.click('button[ng-click=\\"update()\\"]:visible');
    JS.waitForExist ('img[ng-click=\\"OpenModal(request.storage_id || request.request_all_data.baseRequestNid)\\"]:visible');
    SF.sleep(6);
    JS.click('img[ng-click=\\"OpenModal(request.storage_id || request.request_all_data.baseRequestNid)\\"]:visible');
    SF.waitForVisible(By.xpath('//a[contains(text(),"Request #'+V.boardNumbers2.Id+'")]/../../../following-sibling::div//div[@ng-click="chooseTruck(tid)"]'));
    JS.click('i[ng-click=\\"openRelinkModal()\\"]:visible');
    SF.sleep(1);
    driver.wait(driver.findElement(By.xpath('//input[@ng-model="secondRequestNid"]')).getAttribute('value').then(function(text){
        VD.IWant(VD.ToEqual, V.boardNumbers1.Id, text, 'не совпали айдишки реквестов 3');
    }),config.timeout);



    //=========================закончили писать тест=============================
    SF.endOfTest();
};
