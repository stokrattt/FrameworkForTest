global.FullSmallCalcAsLocal = function (client) {
    SFsend(By.xpath('//ultrasmall-form//input[@ng-model="request.zipFrom"]'), "02461");
    SFsend(By.xpath('//ultrasmall-form//input[@ng-model="request.zipTo"]'), "02111");
    driver.wait(driver.executeScript("$('ultrasmall-form input[ng-model=\"request.moveDate\"]').focus();"));
    SFsleep(2);
    V.frontNumbers = {};
    driver.wait(driver.executeScript(Click4DaysNewCalendar).then(function (D) {
        V.frontNumbers.moveDate = D;
        console.log(V.frontNumbers.moveDate);
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
    SFsleep(1);
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
global.RememberAccountNumbers = function () {
    V.accountNumbers = {};
    driver.executeScript('return $("div:contains(\\"Move Date :\\"):last").next().text()').then(function(dateString){
        dateString=dateString.toUpperCase();
        V.accountNumbers.moveDate={};
        V.accountNumbers.moveDate.Month = SFFindMonthInString(dateString);
        V.accountNumbers.moveDate.Day = SFcleanPrice(dateString.substring(0,dateString.indexOf(',')));
        V.accountNumbers.moveDate.Year = SFcleanPrice(dateString.substring(dateString.indexOf(',')));
    });
    driver.executeScript('return $("div:contains(\\"Crew Size :\\"):last").next().text()').then(function(text){
        V.accountNumbers.CrewSize=SFcleanPrice(text);
    });
    driver.executeScript('return $("div:contains(\\"Truck :\\"):last").next().text()').then(function(text){
        V.accountNumbers.Trucks=SFcleanPrice(text);
    });
    driver.executeScript('return $("div:contains(\\"Hourly Rate :\\"):last").next().text()').then(function(text){
        V.accountNumbers.HourlyRate = text.indexOf('$', 4) ==-1 ?
            SFcleanPrice(text) :
            SFcleanPrice(text.substring(text.indexOf('$', 4)));
    });
    driver.findElement(By.xpath('//div[contains(text(),"Fuel Surcharge")]/../div[2]')).getText().then(function (text) {
        V.accountNumbers.Fuel = SFcleanPrice(text) / 100;
    });
    driver.wait(driver.executeScript(getServicesCostAccount),Dtimeout).then(function(ServicesText){
        V.accountNumbers.AdServices = SFcleanPrice(ServicesText) / 100;
    });
    driver.findElement(By.xpath('//span[contains(text(),"Estimated Travel Time")]/../../div[2]')).getText().then(function (text) {
        let hours = text.indexOf('hrs')==-1 ? 0 : SFcleanPrice(text.substring(0,text.indexOf('hrs')));
        let minutes = text.indexOf('min')==-1 ? 0 : SFcleanPrice(text.substring((text.indexOf('hrs')+1), text.indexOf('min')));
        V.accountNumbers.TravelTime = hours*60 + minutes;
    });

    driver.findElement(By.xpath('//div[contains(text(),"Estimated Labor time")]/../div[2]')).getText().then(function (text) {
        let textMin = text.substring(0,text.indexOf('-'));
        let textMax = text.substring(text.indexOf('-'));
        let hoursMin = textMin.indexOf('hrs')==-1 ? 0 : SFcleanPrice(textMin.substring(0,textMin.indexOf('hrs')));
        let minutesMin = textMin.indexOf('min')==-1 ? 0 : SFcleanPrice(textMin.substring((textMin.indexOf('hrs')+1), textMin.indexOf('min')));
        V.accountNumbers.LaborTimeMin = hoursMin*60 + minutesMin;
        let hoursMax = textMax.indexOf('hrs')==-1 ? 0 : SFcleanPrice(textMax.substring(0,textMax.indexOf('hrs')));
        let minutesMax = textMax.indexOf('min')==-1 ? 0 : SFcleanPrice(textMax.substring((textMax.indexOf('hrs')+1), textMax.indexOf('min')));
        V.accountNumbers.LaborTimeMax = hoursMax*60 + minutesMax;
    });

    driver.findElement(By.xpath('//div[contains(text(),"Estimated Labor time")]/../div[2]')).getText().then(function (text) {
        let textMin = text.substring(0,text.indexOf('-'));
        let textMax = text.substring(text.indexOf('-'));
        let hoursMin = textMin.indexOf('hrs')==-1 ? 0 : SFcleanPrice(textMin.substring(0,textMin.indexOf('hrs')));
        let minutesMin = textMin.indexOf('min')==-1 ? 0 : SFcleanPrice(textMin.substring((textMin.indexOf('hrs')+1), textMin.indexOf('min')));
        V.accountNumbers.LaborTimeMin = hoursMin*60 + minutesMin;
        let hoursMax = textMax.indexOf('hrs')==-1 ? 0 : SFcleanPrice(textMax.substring(0,textMax.indexOf('hrs')));
        let minutesMax = textMax.indexOf('min')==-1 ? 0 : SFcleanPrice(textMax.substring((textMax.indexOf('hrs')+1), textMax.indexOf('min')));
        V.accountNumbers.LaborTimeMax = hoursMax*60 + minutesMax;
    });

    driver.findElement(By.xpath('//div[contains(text(),"Estimated Quote")]/following-sibling::div[1]')).getText().then(function(text){
        if (text.indexOf("You save")!== -1) {
            let t = text.substring(0,text.indexOf("You save"));
            t = t.substring(t.indexOf('$',t.indexOf('$',t.indexOf('$')+1)+1));
            V.accountNumbers.TotalMin = SFcleanPrice(t.substring(0, t.indexOf('-')))/100;
            V.accountNumbers.TotalMax = SFcleanPrice(t.substring(t.indexOf('-')))/100;
        } else {console.log('ещё не делали без скидок');}
    });
    driver.findElement(By.xpath('//div[contains(text(),"Request ID")]/span')).getText().then(function (text) {
        V.accountNumbers.Id = SFcleanPrice(text);
    });
    SFsleep(3);
    console.log(V.accountNumbers);
};
global.LogoutFromAccount = function () {
    driver.executeScript("$('a[ng-click=\"vm.Logout()\"]').get(0).scrollIntoView();");
    SFclick(By.xpath('//a[@ng-click="vm.Logout()"]'));
    SFwaitForVisible(By.xpath('//form[@ng-submit="login()"]'));
    SFsleep(5);
};
global.LogoutFromBoard = function () {
    driver.executeScript("$('a[ng-click=\"vm.Logout()\"]').get(0).scrollIntoView();");
    SFclick(By.xpath('//a[@ng-click="vm.Logout()"]/../../preceding-sibling::*[1]'));
    SFsleep(1);
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
global.LoginToAccountAsClient = function(){
    SFsleep(1);
    SFwaitForVisible(By.xpath('//form[@ng-submit="login()"]'));
    SFsleep(1);
    SFsend(By.xpath('//input[@id="email"]'), V.client.email);
    SFsend(By.xpath('//input[@id="password"]'), 123);
    SFclick(By.xpath('//button[@type="submit"]'));
    SFsleep(2);
};
global.OpenRequest = function (request) {

    driver.wait(until.elementLocated(By.xpath('//td[@ng-click="requestEditModal(request)"][contains(text(),"' + request + '")]/..')),10000)
        .getAttribute('class').then(function (classStr) {
            if (classStr.indexOf('request ng-scope active_row') == -1) {
                driver.findElement(By.xpath('//td[@ng-click="requestEditModal(request)"][contains(text(),"' + request + '")]/..')).click();
            }
            driver.findElement(By.xpath('//td[@ng-click="requestEditModal(request)"][contains(text(),"' + request + '")]/..')).click();
            if (!busy) { global.fiber.run(); }
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
    SFsleep(4);
    console.log ('создали реквест');
};

global.RememberDigitsRequestBoard = function () {

    // запомнили все цифры реквеста

    V.boardNumbers={};
    driver.findElement(By.xpath('//input[@ng-model="moveDateInput"]')).getAttribute("value").then(function(dateString){
        dateString=dateString.toUpperCase();
        V.boardNumbers.moveDate={};
        V.boardNumbers.moveDate.Month = SFFindMonthInString(dateString);
        V.boardNumbers.moveDate.Day = SFcleanPrice(dateString.substring(0,dateString.indexOf(',')));
        V.boardNumbers.moveDate.Year = SFcleanPrice(dateString.substring(dateString.indexOf(',')));
    });
    driver.findElement(By.xpath('//input[@ng-model="request.minimum_time.value"]')).getAttribute('value').then(function(value){
        V.boardNumbers.LaborTimeMin=SFcleanPrice(value.substring(0,value.indexOf(':')))*60
            + SFcleanPrice(value.substring(value.indexOf(':')));
    });
    driver.findElement(By.xpath('//input[@ng-model="request.maximum_time.value"]')).getAttribute('value').then(function(value){
        V.boardNumbers.LaborTimeMax=SFcleanPrice(value.substring(0,value.indexOf(':')))*60
            + SFcleanPrice(value.substring(value.indexOf(':')));
    });
    driver.findElement(By.xpath('//input[@ng-model="request.travel_time.value"]')).getAttribute('value').then(function(value){
        V.boardNumbers.TravelTime=SFcleanPrice(value.substring(0,value.indexOf(':')))*60
            + SFcleanPrice(value.substring(value.indexOf(':')));
    });
    driver.findElement(By.xpath('//input[@id="edit-movers-crew"]')).getAttribute('value').then(function(value){
        V.boardNumbers.CrewSize=SFcleanPrice(value);
    });
    driver.findElement(By.xpath('//input[@ng-model="request.rate.value"]')).getAttribute('value').then(function(value){
        V.boardNumbers.HourlyRate=SFcleanPrice(value);
    });

    driver.findElement(By.xpath('//label[contains(text(),"Trucks:")]/following-sibling::div[1]')).getText('text').then(function(text){
        V.boardNumbers.Trucks=SFcleanPrice(text);
    });

    driver.findElement(By.xpath("//div[not(contains(@class,'ng-hide'))]/label[contains(text(), 'Quote:')]/following-sibling::div[1]")).getText().then(function(text){
        V.boardNumbers.QuoteMin = SFcleanPrice(text.substring(0, text.indexOf('$',3)))/100;
        V.boardNumbers.QuoteMax = SFcleanPrice(text.substring(text.indexOf('$',3)))/100;
    });
    driver.findElement(By.xpath("//div[not(contains(@class,'ng-if'))]/label[contains(text(), 'Fuel Surcharge:')]/following-sibling::div[1]")).getText().then(function(text) {
        V.boardNumbers.Fuel = SFcleanPrice(text.substring(text.indexOf('$'))) / 100;
    });
    driver.findElement(By.xpath("//div/label[contains(text(), 'Valuation:')]/following-sibling::div[1]")).getText().then(function(text) {
        V.boardNumbers.Valuation = SFcleanPrice (text.substring(text.indexOf('$')))/100;
    });
    driver.findElement(By.xpath("//div/label[contains(text(), 'Packing:')]/following-sibling::div[1]")).getText().then(function(text) {
        V.boardNumbers.Packing = SFcleanPrice (text.substring(text.indexOf('$')))/100;
    });
    driver.findElement(By.xpath("//div/label[contains(text(), 'Additional Services:')]/following-sibling::div[2]")).getText().then(function(text) {
        V.boardNumbers.AdServices = SFcleanPrice (text.substring(text.indexOf('$')))/100;
    });
    driver.findElement(By.xpath("//div/label[contains(text(), 'Discount:')]/following-sibling::div[1]")).getText().then(function(text) {
        V.boardNumbers.Discount = SFcleanPrice (text.substring(text.indexOf('$')))/100;
    });
    driver.findElement(By.xpath("//div[not(contains(@class,'ng-hide'))]/label[contains(text(), 'Grand Total:')]/following-sibling::div[1]")).getText().then(function(text){
        V.boardNumbers.TotalMin = SFcleanPrice(text.substring(0, text.indexOf('$',3)))/100;
        V.boardNumbers.TotalMax = SFcleanPrice(text.substring(text.indexOf('$',3)))/100;
    });
    driver.findElement(By.xpath("//div/label[contains(text(), 'Payment:')]/following-sibling::div[1]")).getText().then(function(text) {
        V.boardNumbers.Payment = SFcleanPrice (text.substring(text.indexOf('$')))/100;
    });
    driver.findElement(By.xpath("//div[not(contains(@class,'ng-if'))]/label[contains(text(), 'Balance:')]/following-sibling::div[1]")).getText().then(function(text){
        V.boardNumbers.BalanceMin = SFcleanPrice(text.substring(0, text.indexOf('$',3)))/100;
        V.boardNumbers.BalanceMax = SFcleanPrice(text.substring(text.indexOf('$',3)))/100;
    });
    SFsleep(3);
    console.log(V.boardNumbers);
};
global.Validation_Compare_Account_Admin = function(){
    IWant(VToEqual,V.accountNumbers.moveDate.Day, V.boardNumbers.moveDate.Day, 'не совпали даты аккаунта и борда');
    IWant(VToEqual,V.accountNumbers.moveDate.Month, V.boardNumbers.moveDate.Month, 'не совпали даты аккаунта и борда');
    IWant(VToEqual,V.accountNumbers.moveDate.Year, V.boardNumbers.moveDate.Year, 'не совпали даты аккаунта и борда');
    IWant(VToEqual,V.accountNumbers.CrewSize, V.boardNumbers.CrewSize, 'не совпали CrewSize аккаунта и борда');
    IWant(VToEqual,V.accountNumbers.HourlyRate, V.boardNumbers.HourlyRate, 'не совпали HourlyRate аккаунта и борда');
    IWant(VToEqual,V.accountNumbers.LaborTimeMin, V.boardNumbers.LaborTimeMin, 'не совпали LaborTimeMin аккаунта и борда');
    IWant(VToEqual,V.accountNumbers.LaborTimeMax, V.boardNumbers.LaborTimeMax, 'не совпали LaborTimeMax аккаунта и борда');
    IWant(VToEqual,V.accountNumbers.TravelTime, V.boardNumbers.TravelTime, 'не совпали TravelTime аккаунта и борда');
    IWant(VToEqual,V.accountNumbers.Packing, V.boardNumbers.Packing, 'не совпали Packing аккаунта и борда');
    IWant(VToEqual,V.accountNumbers.AdServices, V.boardNumbers.AdServices, 'не совпали Services аккаунта и борда');
    IWant(VToEqual,V.accountNumbers.Trucks, V.boardNumbers.Trucks, 'не совпали Trucks аккаунта и борда');
    IWant(VToEqual,V.accountNumbers.TotalMin, V.boardNumbers.TotalMin, 'не совпали TotalMin аккаунта и борда');
    IWant(VToEqual,V.accountNumbers.TotalMax, V.boardNumbers.TotalMax, 'не совпали TotalMax аккаунта и борда');
    IWant(VToEqual,V.accountNumbers.Fuel, V.boardNumbers.Fuel, 'не совпали Fuel аккаунта и борда');
};
global.SetManager = function (){
    SFclick(By.xpath('//button[contains(text(),"Set Sales")]'));
    SFclick(By.xpath('//a[@ng-click="setManager(manager.uid)"][contains(text(),"SaleNode")]'));
    SFsleep(1);
    SFclick(By.xpath('//button[@class="confirm"][contains(text(),"Confirm")]'));
    SFsleep(1);
};
global.SetClientPasswd = function (){
    SFsend(By.xpath('//input[@ng-model="client.password"]'),123);
    SFclick(By.xpath('//button[@ng-click="update(client)"]'));
    SFsleep(3);
};