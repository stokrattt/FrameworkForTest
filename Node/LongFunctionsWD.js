global.FullSmallCalcAsLocal = function (client) {
    SFsend(By.xpath('//ultrasmall-form//input[@ng-model="request.zipFrom"]'), "02461");
    SFsend(By.xpath('//ultrasmall-form//input[@ng-model="request.zipTo"]'), "02111");
    driver.wait(driver.executeScript("$('ultrasmall-form input[ng-model=\"request.moveDate\"]').focus();"));
    SFsleep(2);
    V.request = {};
    driver.wait(driver.executeScript(Click4DaysNewCalendar).then(function (D) {
        V.request.moveDate = D;
    }));
    SFsleep(2);
    driver.executeScript("$('ultrasmall-form input[ng-click=\"Continue1(\\\'step1\\\')\"]').click();");
    SFsleep(1);
    JSclick("ultrasmall-form div[ng-click='openSlide();']");
    SFsleep(1);
    JSclick("div[ng-click='MoveSizePreviewClick(\\\\\'4\\\\\')']");
    SFsleep(1);
    JSclick("button.pull-right:first");
    SFsleep(1);
    JSselect('ultrasmall-form select[ng-model="request.typeFrom"]', 4);
    SFsleep(1);
    JSselect('ultrasmall-form select[ng-model="request.typeTo"]', 3);
    SFsleep(1);
    JSclick('input[ng-click=\\"Continue2(\'step2\')\\"]');
    SFsleep(2);
    SFsend(By.xpath('//ultrasmall-form//input[@ng-model="request.first_name"]'), client.name);
    SFsend(By.xpath('//ultrasmall-form//input[@ng-model="request.last_name"]'), client.fam);
    SFsend(By.xpath('//ultrasmall-form//input[@ng-model="request.email"]'), client.email);
    SFsend(By.xpath('//ultrasmall-form//input[@ng-model="request.primaryPhone"]'), client.phone);
    SFsleep(1);
    JSclick('input[ng-click=\\"Calculate(\\\'Submit\\\')\\"]');
    JSwaitForExist('ultrasmall-form #congrats_menu[style="right: 0px;"] a:contains("Proceed To View Your Quote")');
    JSlink('ultrasmall-form a:contains("Proceed To View Your Quote")');
};
global.AccountLocalEnterAddress = function () {
    JSclick('span[ng-click=\\\"vm.openAddressModal()\\\"]:visible:first');
    SFsend(By.xpath('//input[@type="field_moving_from"][@placeholder="From Address"]'), 'Address From');
    SFsend(By.xpath('//input[@type="field_moving_to"][@placeholder="To Address"]'), 'Address To');
    SFclick(By.xpath('//button[@ng-click="update(client)"]'));
    JSwaitForExist('button.confirm:contains("Update")');
    SFsleep(2);
    SFclick(By.xpath('//button[@class="confirm"][contains(text(),"Update")]'));
    JSwaitForExist('button.confirm:contains("OK")');
    SFsleep(2);
    SFclick(By.xpath('//button[@class="confirm"][contains(text(),"OK")]'));
};
global.AccountLocalAddInventory = function () {
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
global.AccountLocalDetails = function () {
    JSclick('a[ng-click=\\"vm.select(tab)\\"]:contains(\\"Details\\")');
    SFselect(By.xpath('//select[@id="current_door_to_parking"]'), 60);
    SFselect(By.xpath('//select[@id="new_door_to_parking"]'), 60);
    SFselect(By.xpath('//select[@id="current_parking_permit"]'), "PDW");
    SFselect(By.xpath('//select[@id="new_parking_permit"]'), "PDW");
    driver.executeScript("$('select#new_parking_permit').get(0).scrollIntoView();");
    SFclick(By.xpath('//button[@ng-click="saveDetails()"]'));
    driver.executeScript("$('body').scrollTop(0);");
    SFsleep(5);
};
global.AccountRememberInfoFirstTime = function () {
    V.account = {};

    driver.executeScript('return $("div:contains(\\"Hourly Rate :\\"):last").next().text()').then(function(text){
        V.request.HourlyRate = text.indexOf('$', 4) ==-1 ?
            SFcleanPrice(text) :
            SFcleanPrice(text.substring(text.indexOf('$', 4)));
    });
    driver.findElement(By.xpath('//div[contains(text(),"Fuel Surcharge")]/../div[2]')).getText().then(function (text) {
        V.account.Fuel = SFcleanPrice(text) / 100;
    });
    driver.findElement(By.xpath('//div[contains(text(),"Estimate Partial Packing:")]/../div[2]')).getText().then(function (text) {
        V.account.Packing = SFcleanPrice(text) / 100;
    });
    driver.findElement(By.xpath('//span[contains(text(),"Estimated Travel Time")]/../../div[2]')).getText().then(function (text) {
        let hours = text.indexOf('hrs')==-1 ? 0 : SFcleanPrice(text.substring(0,text.indexOf('hrs')));
        let minutes = text.indexOf('min')==-1 ? 0 : SFcleanPrice(text.substring((text.indexOf('hrs')+1), text.indexOf('min')));
        V.account.TravelTime = hours*60 + minutes;
    });

    driver.findElement(By.xpath('//div[contains(text(),"Estimated Labor time")]/../div[2]')).getText().then(function (text) {
        let textMin = text.substring(0,text.indexOf('-'));
        console.log(textMin);
        let textMax = text.substring(text.indexOf('-'));
        console.log(textMax);
        let hoursMin = textMin.indexOf('hrs')==-1 ? 0 : SFcleanPrice(textMin.substring(0,textMin.indexOf('hrs')));
        let minutesMin = textMin.indexOf('min')==-1 ? 0 : SFcleanPrice(textMin.substring((textMin.indexOf('hrs')+1), textMin.indexOf('min')));
        V.account.LaborTimeMin = hoursMin*60 + minutesMin;
        let hoursMax = textMax.indexOf('hrs')==-1 ? 0 : SFcleanPrice(textMax.substring(0,textMax.indexOf('hrs')));
        let minutesMax = textMax.indexOf('min')==-1 ? 0 : SFcleanPrice(textMax.substring((textMax.indexOf('hrs')+1), textMax.indexOf('min')));
        V.account.LaborTimeMax = hoursMax*60 + minutesMax;
    });

    driver.findElement(By.xpath('//div[contains(text(),"Estimated Labor time")]/../div[2]')).getText().then(function (text) {
        let textMin = text.substring(0,text.indexOf('-'));
        console.log(textMin);
        let textMax = text.substring(text.indexOf('-'));
        console.log(textMax);
        let hoursMin = textMin.indexOf('hrs')==-1 ? 0 : SFcleanPrice(textMin.substring(0,textMin.indexOf('hrs')));
        let minutesMin = textMin.indexOf('min')==-1 ? 0 : SFcleanPrice(textMin.substring((textMin.indexOf('hrs')+1), textMin.indexOf('min')));
        V.account.LaborTimeMin = hoursMin*60 + minutesMin;
        let hoursMax = textMax.indexOf('hrs')==-1 ? 0 : SFcleanPrice(textMax.substring(0,textMax.indexOf('hrs')));
        let minutesMax = textMax.indexOf('min')==-1 ? 0 : SFcleanPrice(textMax.substring((textMax.indexOf('hrs')+1), textMax.indexOf('min')));
        V.account.LaborTimeMax = hoursMax*60 + minutesMax;
    });

    driver.findElement(By.xpath('//div[contains(text(),"Estimated Quote")]/following-sibling::div[1]')).getText().then(function(text){
        if (text.indexOf("You save")!== -1) {
            let t = text.substring(0,text.indexOf("You save"));
            t = t.substring(t.indexOf('$',t.indexOf('$',t.indexOf('$')+1)+1));
            V.account.QuoteMin = SFcleanPrice(t.substring(0, t.indexOf('-')))/100;
            V.account.QuoteMax = SFcleanPrice(t.substring(t.indexOf('-')))/100;
        } else {console.log('ещё не делали без скидок');}
        console.log('V.account');
        console.log(V.account);
    });
    driver.findElement(By.xpath('//div[contains(text(),"Request ID")]/span')).getText().then(function (text) {
        V.request.Id = SFcleanPrice(text);
        console.log('V.request');
        console.log(V.request);
    });
};
global.LogoutFromAccount = function () {
    driver.executeScript("$('a[ng-click=\"vm.Logout()\"]').get(0).scrollIntoView();");
    SFclick(By.xpath('//a[@ng-click="vm.Logout()"]'));
    SFwaitForVisible(By.xpath('//form[@ng-submit="login()"]'));
    SFsleep(5);
};
global.LoginToBoardAsAdmin = function () {
    SFwaitForVisible(By.xpath('//div[@ng-controller="LoginController"]//span[contains(text(),"Move")]'));
    SFsend(By.xpath('//input[@id="email"]'), 'TestAdmin');
    SFsend(By.xpath('//input[@id="password"]'), 'test');
    SFclick(By.xpath('//button[@type="submit"]'));
    SFwaitForVisible(By.xpath('//td[@ng-click="requestEditModal(request)"]'));
};
global.OpenRequest = function (request) {

    driver.wait(until.elementLocated(By.xpath('//td[@ng-click="requestEditModal(request)"][contains(text(),"' + request + '")]/..')),10000)
        .getAttribute('class').then(function (classStr) {
            if (classStr.indexOf('request ng-scope active_row') == -1) {
                driver.findElement(By.xpath('//td[@ng-click="requestEditModal(request)"][contains(text(),"' + request + '")]/..')).click();
            }
            driver.findElement(By.xpath('//td[@ng-click="requestEditModal(request)"][contains(text(),"' + request + '")]/..')).click();
            if (!busy) { fiber.run(); }
        }
    );
    if (!busy) { Fiber.yield(); }
};
global.CreateLocalMovingFromBoard = function(){
    SFclick(By.linkText('Create Request'));
    driver.sleep(4000);
    SFclick (By.xpath('//div[@class="step1"]//select[@name="move_service_type"]/option[@value="number:1"]'));
    SFclick(By.xpath('//input[@id="edit-move-date-datepicker-popup-0"]'));
    V.request={};
    driver.wait(driver.executeScript(Click4DaysCalendar)).then(function(calDate){
        V.request.moveDate = calDate;
        console.log(V.request);
    });
    SFsleep(2);
    SFclick(By.xpath('//ul[@class="chosen-choices"]'));
    SFclick(By.xpath('//ul[@class="chosen-results"]/li[@data-option-array-index="1"]'));
    SFsend (By.id("edit-zip-code-from"), "02032");
    SFsend (By.id("edit-zip-code-to"), "02136");
    driver.sleep(4000);
    SFclick (By.xpath('//button[@ng-click="Calculate()"]'));
    driver.sleep(4000);
    SFclick (By.xpath('//button[@ng-click="step2 = false;step3 = true;"]'));
    SFsend (By.xpath('//div[@class="step3"]//input[@ng-model="editrequest.account.fields.field_user_first_name"]'), V.client.name);
    SFsend (By.xpath('//div[@class="step3"]//input[@ng-model="editrequest.account.fields.field_user_last_name"]'), V.client.fam);
    SFsend (By.xpath('//div[@class="step3"]//input[@ng-model="editrequest.account.mail"]'), V.client.email);
    SFsend (By.xpath('//div[@class="step3"]//input[@ng-model="editrequest.account.fields.field_primary_phone"]'), V.client.phone);
    SFclick (By.xpath('//button[@ng-click="create()"]'));
    SFwaitForVisible(By.xpath('//div[@ng-click="chooseTruck(tid)"]'));
    console.log ('создали реквест');
}