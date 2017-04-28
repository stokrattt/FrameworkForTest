module.exports = function main(SF, JS, MF, LF, JSstep, VD, V, By, until,FileDetector, system, condition, config,constants) {    global.fiber = Fiber.current;
    V.client={};
    V.client.name = SF.randomBukva(6)+'_t';
    V.client.fam = SF.randomBukva(6)+'_t';
    V.client.phone = SF.randomCifra(10);
    V.client.email = SF.randomBukvaSmall(6)+'@'+SF.randomBukvaSmall(4)+'.tes';
    V.boardNumbers={};

    condition.nowWeDoing='создаём реквест';
    SF.get(V.adminURL);
    LF.LoginToBoardAsAdmin();
    LF.CreateLocalMovingFromBoard(V.client);

    condition.nowWeDoing='получаем id, редактируем немного и сохраняем';

    LF.RememberDigitsRequestBoard(V.boardNumbers);
    LF.addToCleanerJob(V.boardNumbers.Id);
    JS.step(JSstep.selectTruck((V.boardNumbers.LaborTimeMax + V.boardNumbers.TravelTime)/60));
    SF.select(By.xpath('//select[@id="edit-status"]'),2);
    SF.click(By.xpath('//button[@ng-click="UpdateRequest()"]'));
    JS.waitForExist('button[ng-click="update(request)"]:visible');
    SF.click(By.xpath('//button[@ng-click="update(request)"]'));
    JS.waitForExist("div.toast-success:visible");
    LF.closeEditRequest();

    condition.nowWeDoing='ищем его в not Confirmed, открываем и пытаемся сохранить ничего не изменяя';
    SF.click(By.xpath('//div[@ng-click="vm.select(3)"]'));
    SF.sleep (5);
    LF.OpenRequest(V.boardNumbers.Id);
    JS.click('button[ng-click=\\"UpdateRequest()\\"]');
    condition.nowWeDoing='сейчас должно появиться Nothing to Update!';
    JS.waitForExist("h2:contains(\"Nothing to Update!\")");
    SF.sleep(1);
    SF.click(By.xpath('//button[@class="confirm"]'));
    SF.sleep(1);
    SF.endOfTest();
};