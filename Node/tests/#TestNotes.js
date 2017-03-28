function main(){
    global.fiber = Fiber.current;
    V.client = {};
    V.client.name = SFrandomBukva(6) + '_t';
    V.client.fam = SFrandomBukva(6) + '_t';
    V.client.phone = SFrandomCifra(10);
    V.client.email = SFrandomBukvaSmall(6) + '@' + SFrandomBukvaSmall(4) + '.tes';
    V.note = {};

    SFget('http://movecalc.local/moveBoard/#/login');
    LoginToBoardAsAdmin();
    CreateLocalMovingFromBoard();
    driver.wait(driver.findElement(By.xpath('//a[@ng-click="select(tabs[0])"]')).getText().then(function(text){
        V.request.Id = SFcleanPrice(text);
    }));
    SFclick(By.xpath('//div[@ng-model="request.inventory.move_details.admincomments"]//div[@ng-model="html"]'));
    SFclear(By.xpath('//div[@ng-model="request.inventory.move_details.admincomments"]//div[@ng-model="html"]'));
    V.note = SFrandomBukva(7);
    SFsend(By.xpath('//div[@ng-model="request.inventory.move_details.admincomments"]//div[@ng-model="html"]'), V.note);
    JSstep(selectTruck);
    SFclick(By.xpath('//button[@ng-click="UpdateRequest()"]'));
    SFwaitForVisible(By.xpath('//div[@class="modal-content"]'));
    driver.wait(driver.findElement(By.xpath('//div[@ng-if="message.label == \'Notes\'"]')).getText().then(function(resolve) {
      IWant(VToEqual, resolve, 'Notes was update');
    }));
    SFclick(By.xpath('//button[@ng-click="update(request)"]'));
    JSwaitForNotExist('div.toast-success');
    SFsleep(4);
    SFclick (By.xpath('//button[@ng-click="cancel()"]'));
    SFsleep(4);
    OpenRequest(V.request.Id);
    console.log(V.note);
    driver.wait(driver.findElement(By.xpath('//div[@ng-model="request.inventory.move_details.admincomments"]//div[@ng-model="html"]')).getText().then(function(resolve) {
      IWant(VToEqual, resolve, V.note, 'Не совпали заметочки.');
    }));
    endOfTest();
}
//==================================================================================================
module.exports = main;
