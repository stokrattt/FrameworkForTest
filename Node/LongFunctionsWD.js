global.FullSmallCalcAsLocal =  function(client){
    SFsend(By.xpath('//ultrasmall-form//input[@ng-model="request.zipFrom"]'), "02461");
    SFsend(By.xpath('//ultrasmall-form//input[@ng-model="request.zipTo"]'), "02111");
    driver.wait(driver.executeScript("$('ultrasmall-form input[ng-model=\"moveDate\"]').focus();"));
    SFsleep(2);
    V.request={};
    driver.wait(driver.executeScript(Click4DaysNewCalendar).then(function (D) {
        V.request.moveDate = D;
    }));
    driver.executeScript("$('ultrasmall-form input[ng-click=\"Continue1(\\\'step1\\\')\"]').click();");
    JSclick("ultrasmall-form div[ng-click='openSlide();']");
    JSclick("div[ng-click='MoveSizePreviewClick(\\\\\'4\\\\\')']");
    JSclick("button.pull-right:first");
    JSselect('ultrasmall-form select[ng-model="request.typeFrom"]',4);
    JSselect('ultrasmall-form select[ng-model="request.typeTo"]',3);
    JSclick('input[ng-click=\\"Continue2(\'step2\')\\"]');
    driver.sleep(2000);
    SFsend(By.xpath('//ultrasmall-form//input[@ng-model="request.first_name"]'), client.name);
    SFsend(By.xpath('//ultrasmall-form//input[@ng-model="request.last_name"]'), client.fam);
    SFsend(By.xpath('//ultrasmall-form//input[@ng-model="request.email"]'), client.email);
    SFsend(By.xpath('//ultrasmall-form//input[@ng-model="request.primaryPhone"]'), client.phone);
    JSclick('input[ng-click=\\"Calculate(\\\'Submit\\\')\\"]');
    JSwaitForExist('ultrasmall-form #congrats_menu[style="right: 0px;"] a:contains("Proceed To View Your Quote")');
    JSlink('ultrasmall-form a:contains("Proceed To View Your Quote")');
};
global.AccountLocalEnterAddress = function (){
    JSclick('span[ng-click=\\\"vm.openAddressModal()\\\"]:visible:first');
    SFsend(By.xpath('//input[@type="field_moving_from"][@placeholder="From Address"]'),'Address From');
    SFsend(By.xpath('//input[@type="field_moving_to"][@placeholder="To Address"]'),'Address To');
    SFclick(By.xpath('//button[@ng-click="update(client)"]'));
    JSwaitForExist('button.confirm:contains("Update")');
    SFsleep(2);
    SFclick(By.xpath('//button[@class="confirm"][contains(text(),"Update")]'));
    JSwaitForExist('button.confirm:contains("OK")');
    SFsleep(2);
    SFclick(By.xpath('//button[@class="confirm"][contains(text(),"OK")]'));
};
global.AccountLocalAddInventory = function (){
    JSclick('a[ng-click=\\"vm.select(tab)\\"]:contains(\\"Inventory\\")');
    JSwaitForExist('div[ng-repeat="filter in filters"]');
    SFsleep(5);
    SFclick(By.xpath('(//div[@ng-repeat="item in currentFilter.items"]//button[@ng-click="changeValue(1, item)"])[1]'));
    SFsleep(0.5);
    SFclick(By.xpath('(//div[@ng-repeat="item in currentFilter.items"]//button[@ng-click="changeValue(1, item)"])[1]'));
    SFsleep(0.5);
    SFclick(By.xpath('(//div[@ng-repeat="item in currentFilter.items"]//button[@ng-click="changeValue(1, item)"])[2]'));
    SFsleep(0.5);
    SFclick(By.xpath('(//div[@ng-repeat="item in currentFilter.items"]//button[@ng-click="changeValue(1, item)"])[2]'));
    SFsleep(0.5);
    JSclick('button#save-inventory.inventory__button');
    JSwaitForExist('button.confirm:contains("OK")');
    SFsleep(2);
    SFclick(By.xpath('//button[@class="confirm"][contains(text(),"OK")]'));
    SFsleep(2);
};
global.AccountLocalDetails = function (){
    JSclick('a[ng-click=\\"vm.select(tab)\\"]:contains(\\"Details\\")');
    SFselect(By.xpath('//select[@id="current_door_to_parking"]'),60);
    SFselect(By.xpath('//select[@id="new_door_to_parking"]'),60);
    SFselect(By.xpath('//select[@id="current_parking_permit"]'),"PDW");
    SFselect(By.xpath('//select[@id="new_parking_permit"]'),"PDW");
    driver.executeScript("$('select#new_parking_permit').get(0).scrollIntoView();");
    SFclick(By.xpath('//button[@ng-click="saveDetails()"]'));
    driver.executeScript("$('body').scrollTop(0);");
    SFsleep(5);
};
global.AccountRememberInfoFirstTime = function (){
    V.account={};
    driver.findElement(By.xpath('//div[contains(text(),"Fuel Surcharge")]/../div[2]')).getText().then(function(text){
        V.account.Fuel = SFcleanPrice(text)/10;
    });
    driver.findElement(By.xpath('//div[contains(text(),"Estimate Partial Packing:")]/../div[2]')).getText().then(function(text){
        V.account.Packing = SFcleanPrice(text)/10;
    });
    driver.findElement(By.xpath('//span[contains(text(),"Estimated Travel Time")]/../../div[2]')).getText().then(function(text){
        let d = SFcleanPrice(text);
        V.account.TravelTime = Math.floor(d/100)*60 + (d % 100);
        console.log('V.account');
        console.log(V.account);
    });
    driver.findElement(By.xpath('//div[contains(text(),"Request ID")]/span')).getText().then(function(text){
        V.request.Id = SFcleanPrice(text);
        console.log(V.request.Id);
    });
};
