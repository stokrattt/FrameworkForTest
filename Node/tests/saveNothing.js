function main(){
    global.fiber = Fiber.current;
    V.client={};
    V.client.name = SFrandomBukva(6)+'_t';
    V.client.fam = SFrandomBukva(6)+'_t';
    V.client.phone = SFrandomCifra(10);
    V.client.email = SFrandomBukvaSmall(6)+'@'+SFrandomBukvaSmall(4)+'.tes';
    V.boardNumbers={};

    nowWeDoing='создаём реквест';
    SFget(adminURL);
    LoginToBoardAsAdmin();
    CreateLocalMovingFromBoard();

    nowWeDoing='получаем id, редактируем немного и сохраняем';
    driver.wait(driver.findElement(By.xpath('//a[@ng-click="select(tabs[0])"]')).getText().then(function(text){
        V.boardNumbers.Id = SFcleanPrice(text);
    }));
    JSstep(selectTruck);
    SFselect(By.xpath('//select[@id="edit-status"]'),2);
    SFclick(By.xpath('//button[@ng-click="UpdateRequest()"]'));
    JSwaitForExist('button[ng-click="update(request)"]:visible');
    SFclick(By.xpath('//button[@ng-click="update(request)"]'));
    JSwaitForExist("div.toast-success:visible");
    closeEditRequest();

    nowWeDoing='ищем его в not Confirmed, открываем и пытаемся сохранить ничего не изменяя';
    SFclick(By.xpath('//div[@ng-click="vm.select(3)"]'));
    SFsleep (5);
    OpenRequest(V.boardNumbers.Id);
    SFclick(By.xpath('//button[@ng-click="UpdateRequest()"]'));
    nowWeDoing='сейчас должно появиться Nothing to Update!';
    JSwaitForExist("h2:contains(\"Nothing to Update!\")");
    SFsleep(1);
    SFclick(By.xpath('//button[@class="confirm"]'));
    SFsleep(1);

    endOfTest();
}

//==================================================================================================
module.exports = main;
