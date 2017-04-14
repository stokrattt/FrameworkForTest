module.exports = function (SF, JS, JSstep, VD, V, By, until,FileDetector, system, condition, config, constants) {
    function FullSmallCalcAsLocal(client) {
        SF.send(By.xpath('//ultrasmall-form//input[@ng-model="request.zipFrom"]'), "02461");
        SF.send(By.xpath('//ultrasmall-form//input[@ng-model="request.zipTo"]'), "02111");
        driver.wait(driver.executeScript("$('ultrasmall-form input[ng-model=\"request.moveDate\"]').focus();"));
        SF.sleep(2);
        V.frontNumbers = {};
        driver.wait(driver.executeScript(JSstep.Click4DaysNewCalendar).then(function (D) {
            V.frontNumbers.moveDate = D;
            console.log(V.frontNumbers.moveDate);
        }));
        SF.sleep(2);
        driver.executeScript("$('ultrasmall-form input[ng-click=\"Continue1(\\\'step1\\\')\"]').click();");
        SF.sleep(1);
        JS.click("ultrasmall-form div[ng-click='openSlide();']");
        SF.sleep(1);
        JS.click("div[ng-click='MoveSizePreviewClick(\\\\\'4\\\\\')']");
        SF.sleep(1);
        JS.click("button.pull-right:first");
        SF.sleep(1);
        JS.select('ultrasmall-form select[ng-model="request.typeFrom"]', 4);
        SF.sleep(1);
        JS.select('ultrasmall-form select[ng-model="request.typeTo"]', 3);
        SF.sleep(1);
        JS.click('input[ng-click=\\"Continue2(\'step2\')\\"]');
        SF.sleep(2);
        SF.send(By.xpath('//ultrasmall-form//input[@ng-model="request.first_name"]'), client.name);
        SF.send(By.xpath('//ultrasmall-form//input[@ng-model="request.last_name"]'), client.fam);
        SF.send(By.xpath('//ultrasmall-form//input[@ng-model="request.email"]'), client.email);
        SF.send(By.xpath('//ultrasmall-form//input[@ng-model="request.primaryPhone"]'), client.phone);
        SF.sleep(1);
        JS.click('input[ng-click=\\"Calculate(\\\'Submit\\\')\\"]');
        JS.waitForExist('ultrasmall-form #congrats_menu[style="right: 0px;"] a:contains("Proceed To View Your Quote")');
        JS.link('ultrasmall-form a:contains("Proceed To View Your Quote")');
    }
    function FullSmallCalcAsLD (client) {
        SF.send(By.xpath('//ultrasmall-form//input[@ng-model="request.zipFrom"]'), "02461");
        SF.send(By.xpath('//ultrasmall-form//input[@ng-model="request.zipTo"]'), "90001");
        driver.wait(driver.executeScript("$('ultrasmall-form input[ng-model=\"request.moveDate\"]').focus();"));
        SF.sleep(2);
        V.frontNumbers = {};
        driver.wait(driver.executeScript(JSstep.Click4DaysNewCalendar).then(function (D) {
            V.frontNumbers.moveDate = D;
            console.log(V.frontNumbers.moveDate);
        }));
        SF.sleep(2);
        driver.executeScript("$('ultrasmall-form input[ng-click=\"Continue1(\\\'step1\\\')\"]').click();");
        SF.sleep(1);
        JS.click("ultrasmall-form div[ng-click='openSlide();']");
        SF.sleep(1);
        JS.click("div[ng-click='MoveSizePreviewClick(\\\\\'4\\\\\')']");
        SF.sleep(1);
        JS.click("button.pull-right:first");
        SF.sleep(1);
        JS.select('ultrasmall-form select[ng-model="request.typeFrom"]', 4);
        SF.sleep(1);
        JS.select('ultrasmall-form select[ng-model="request.typeTo"]', 3);
        SF.sleep(1);
        JS.click('input[ng-click=\\"Continue2(\'step2\')\\"]');
        SF.sleep(2);
        SF.send(By.xpath('//ultrasmall-form//input[@ng-model="request.first_name"]'), V.client.name);
        SF.send(By.xpath('//ultrasmall-form//input[@ng-model="request.last_name"]'), V.client.fam);
        SF.send(By.xpath('//ultrasmall-form//input[@ng-model="request.email"]'), V.client.email);
        SF.send(By.xpath('//ultrasmall-form//input[@ng-model="request.primaryPhone"]'), V.client.phone);
        SF.sleep(1);
        JS.click('input[ng-click=\\"Calculate(\\\'Submit\\\')\\"]');
        JS.waitForExist('ultrasmall-form #congrats_menu[style="right: 0px;"] a:contains("Proceed To View Your Quote")');
        JS.link('ultrasmall-form a:contains("Proceed To View Your Quote")');
    }
    function FullSmallCalcAsUnloading(client){
        JS.click("input#extra-service");
        JS.select('select#edit-service',4);
        SF.send(By.xpath('//ultrasmall-form//input[@ng-model="request.zipTo"]'), "02111");
        driver.wait(driver.executeScript("$('ultrasmall-form input[ng-model=\"request.moveDate\"]').focus();"),config.timeout);
        SF.sleep(2);
        V.frontNumbers = {};
        driver.wait(driver.executeScript(JSstep.Click4DaysNewCalendar).then(function (D) {
            V.frontNumbers.moveDate = D;
            console.log(V.frontNumbers.moveDate);
        }),config.timeout);
        SF.sleep(2);
        driver.executeScript("$('ultrasmall-form input[ng-click=\"Continue1(\\\'step1\\\')\"]').click();");
        SF.sleep(1);
        JS.click("ultrasmall-form div[ng-click='openSlide();']");
        SF.sleep(1);
        JS.click("div[ng-click='MoveSizePreviewClick(\\\\\'4\\\\\')']");
        SF.sleep(1);
        JS.click("button.pull-right:first");
        SF.sleep(1);
        JS.select('ultrasmall-form select[ng-model="request.typeFrom"]', 4);
        SF.sleep(1);
        JS.select('ultrasmall-form select[ng-model="request.typeTo"]', 3);
        SF.sleep(1);
        JS.click('input[ng-click=\\"Continue2(\'step2\')\\"]');
        SF.sleep(2);
        SF.send(By.xpath('//ultrasmall-form//input[@ng-model="request.first_name"]'), client.name);
        SF.send(By.xpath('//ultrasmall-form//input[@ng-model="request.last_name"]'), client.fam);
        SF.send(By.xpath('//ultrasmall-form//input[@ng-model="request.email"]'), client.email);
        SF.send(By.xpath('//ultrasmall-form//input[@ng-model="request.primaryPhone"]'), client.phone);
        SF.sleep(1);
        JS.click('input[ng-click=\\"Calculate(\\\'Submit\\\')\\"]');
    }
    function FullSmallCalcAsLoading(client){
        JS.click("input#extra-service");
        JS.select('select#edit-service',3);
        SF.send(By.xpath('//ultrasmall-form//input[@ng-model="request.zipFrom"]'), "02111");
        driver.wait(driver.executeScript("$('ultrasmall-form input[ng-model=\"request.moveDate\"]').focus();"),config.timeout);
        SF.sleep(2);
        V.frontNumbers = {};
        driver.wait(driver.executeScript(JSstep.Click4DaysNewCalendar).then(function (D) {
            V.frontNumbers.moveDate = D;
            console.log(V.frontNumbers.moveDate);
        }),config.timeout);
        SF.sleep(2);
        driver.executeScript("$('ultrasmall-form input[ng-click=\"Continue1(\\\'step1\\\')\"]').click();");
        SF.sleep(1);
        JS.click("ultrasmall-form div[ng-click='openSlide();']");
        SF.sleep(1);
        JS.click("div[ng-click='MoveSizePreviewClick(\\\\\'4\\\\\')']");
        SF.sleep(1);
        JS.click("button.pull-right:first");
        SF.sleep(1);
        JS.select('ultrasmall-form select[ng-model="request.typeFrom"]', 4);
        SF.sleep(1);
        JS.select('ultrasmall-form select[ng-model="request.typeTo"]', 3);
        SF.sleep(1);
        JS.click('input[ng-click=\\"Continue2(\'step2\')\\"]');
        SF.sleep(2);
        SF.send(By.xpath('//ultrasmall-form//input[@ng-model="request.first_name"]'), client.name);
        SF.send(By.xpath('//ultrasmall-form//input[@ng-model="request.last_name"]'), client.fam);
        SF.send(By.xpath('//ultrasmall-form//input[@ng-model="request.email"]'), client.email);
        SF.send(By.xpath('//ultrasmall-form//input[@ng-model="request.primaryPhone"]'), client.phone);
        SF.sleep(1);
        JS.click('input[ng-click=\\"Calculate(\\\'Submit\\\')\\"]');
    }
    function FullSmallCalcAsMovingWithStorage(client){
        JS.click("input#extra-service");
        JS.select('select#edit-service',2);
        SF.send(By.xpath('//ultrasmall-form//input[@ng-model="request.zipFrom"]'), "02111");
        SF.send(By.xpath('//ultrasmall-form//input[@ng-model="request.zipTo"]'), "02461");
        driver.wait(driver.executeScript("$('ultrasmall-form input[ng-model=\"request.moveDate\"]').focus();"),config.timeout);
        SF.sleep(2);
        V.frontNumbers = {};
        driver.wait(driver.executeScript(JSstep.Click4DaysNewCalendar).then(function (D) {
            V.frontNumbers.moveDate = D;
            console.log(V.frontNumbers.moveDate);
        }),config.timeout);
        SF.sleep(2);
        driver.wait(driver.executeScript("$('ultrasmall-form input[ng-model=\"request.deliveryDate\"]').focus();"),config.timeout);
        SF.sleep(2);
        driver.wait(driver.executeScript(JSstep.Click8DaysNewCalendar).then(function (D) {
            V.frontNumbers.deliveryDate = D;
            console.log(V.frontNumbers.deliveryDate);
        }),config.timeout);
        driver.executeScript("$('ultrasmall-form input[ng-click=\"Continue1(\\\'step1\\\')\"]').click();");
        SF.sleep(1);
        JS.click("ultrasmall-form div[ng-click='openSlide();']");
        SF.sleep(1);
        JS.click("div[ng-click='MoveSizePreviewClick(\\\\\'4\\\\\')']");
        SF.sleep(1);
        JS.click("button.pull-right:first");
        SF.sleep(1);
        JS.select('ultrasmall-form select[ng-model="request.typeFrom"]', 4);
        SF.sleep(1);
        JS.select('ultrasmall-form select[ng-model="request.typeTo"]', 3);
        SF.sleep(1);
        JS.click('input[ng-click=\\"Continue2(\'step2\')\\"]');
        SF.sleep(2);
        SF.send(By.xpath('//ultrasmall-form//input[@ng-model="request.first_name"]'), client.name);
        SF.send(By.xpath('//ultrasmall-form//input[@ng-model="request.last_name"]'), client.fam);
        SF.send(By.xpath('//ultrasmall-form//input[@ng-model="request.email"]'), client.email);
        SF.send(By.xpath('//ultrasmall-form//input[@ng-model="request.primaryPhone"]'), client.phone);
        SF.sleep(1);
        JS.click('input[ng-click=\\"Calculate(\\\'Submit\\\')\\"]');
    }
    function AccountLocalEnterAddress() {
        JS.click('span[ng-click=\\\"vm.openAddressModal()\\\"]:visible:first');
        SF.sleep(1);
        SF.send(By.xpath('//input[@type="field_moving_from"][@placeholder="From Address"]'), 'Address From');
        SF.send(By.xpath('//input[@type="field_moving_to"][@placeholder="To Address"]'), 'Address To');
        SF.click(By.xpath('//button[@ng-click="update(client)"]'));
        JS.waitForExist('button.confirm:contains("Update")');
        SF.sleep(2);
        SF.click(By.xpath('//button[@class="confirm"][contains(text(),"Update")]'));
        JS.waitForExist('button.confirm:contains("OK")');
        SF.sleep(2);
        SF.click(By.xpath('//button[@class="confirm"][contains(text(),"OK")]'));
    }
    function AccountUnloadingEnterAddress() {
        JS.click('span[ng-click=\\\"vm.openAddressModal()\\\"]:visible:first');
        SF.sleep(1);
        SF.send(By.xpath('//input[@type="field_moving_to"][@placeholder="To Address"]'), 'Address To');
        SF.click(By.xpath('//button[@ng-click="update(client)"]'));
        JS.waitForExist('button.confirm:contains("Update")');
        SF.sleep(2);
        SF.click(By.xpath('//button[@class="confirm"][contains(text(),"Update")]'));
        JS.waitForExist('button.confirm:contains("OK")');
        SF.sleep(2);
        SF.click(By.xpath('//button[@class="confirm"][contains(text(),"OK")]'));
    }
    function AccountLoadingEnterAddress() {
        JS.click('span[ng-click=\\\"vm.openAddressModal()\\\"]:visible:first');
        SF.sleep(1);
        SF.send(By.xpath('//input[@type="field_moving_from"][@placeholder="From Address"]'), 'From Address');
        SF.click(By.xpath('//button[@ng-click="update(client)"]'));
        JS.waitForExist('button.confirm:contains("Update")');
        SF.sleep(2);
        SF.click(By.xpath('//button[@class="confirm"][contains(text(),"Update")]'));
        JS.waitForExist('button.confirm:contains("OK")');
        SF.sleep(2);
        SF.click(By.xpath('//button[@class="confirm"][contains(text(),"OK")]'));
    }
    function AccountToStorageEnterAddress() {
        JS.click('span[ng-click=\\\"vm.openAddressModal()\\\"]:visible:first');
        SF.sleep(1);
        SF.send(By.xpath('//input[@type="field_moving_from"][@placeholder="From Address"]'), 'From Address');
        SF.click(By.xpath('//button[@ng-click="update(client)"]'));
        JS.waitForExist('button.confirm:contains("Update")');
        SF.sleep(2);
        SF.click(By.xpath('//button[@class="confirm"][contains(text(),"Update")]'));
        JS.waitForExist('button.confirm:contains("OK")');
        SF.sleep(2);
        SF.click(By.xpath('//button[@class="confirm"][contains(text(),"OK")]'));
    }
    function AccountFromStorageEnterAddress() {
        JS.click('span[ng-click=\\\"vm.openAddressModal()\\\"]:visible:first');
        SF.sleep(1);
        SF.send(By.xpath('//input[@type="field_moving_to"][@placeholder="To Address"]'), 'To Address');
        SF.click(By.xpath('//button[@ng-click="update(client)"]'));
        JS.waitForExist('button.confirm:contains("Update")');
        SF.sleep(2);
        SF.click(By.xpath('//button[@class="confirm"][contains(text(),"Update")]'));
        JS.waitForExist('button.confirm:contains("OK")');
        SF.sleep(2);
        SF.click(By.xpath('//button[@class="confirm"][contains(text(),"OK")]'));
    }
    function AccountLocalAddInventory() {
        JS.click('a[ng-click=\\"vm.select(tab)\\"]:contains(\\"Inventory\\")');
        JS.waitForExist('div[ng-repeat="filter in filters"]');
        SF.sleep(5);
        SF.click(By.xpath('(//div[@ng-repeat="item in currentFilter.items"]//button[@ng-click="changeValue(1, item)"])[1]'));
        SF.sleep(1);
        SF.click(By.xpath('(//div[@ng-repeat="item in currentFilter.items"]//button[@ng-click="changeValue(1, item)"])[1]'));
        SF.sleep(1);
        SF.click(By.xpath('(//div[@ng-repeat="item in currentFilter.items"]//button[@ng-click="changeValue(1, item)"])[1]'));
        SF.sleep(1);
        SF.click(By.xpath('(//div[@ng-repeat="item in currentFilter.items"]//button[@ng-click="changeValue(1, item)"])[2]'));
        SF.sleep(1);
        SF.click(By.xpath('(//div[@ng-repeat="item in currentFilter.items"]//button[@ng-click="changeValue(1, item)"])[2]'));
        SF.sleep(1);
        SF.click(By.xpath('(//div[@ng-repeat="item in currentFilter.items"]//button[@ng-click="changeValue(1, item)"])[2]'));
        SF.sleep(1);
        SF.click(By.xpath('(//div[@ng-repeat="item in currentFilter.items"]//button[@ng-click="changeValue(1, item)"])[2]'));
        SF.sleep(1);
        JS.click('button#save-inventory.inventory__button');
        JS.waitForExist('button.confirm:contains("OK")');
        SF.sleep(2);
        SF.click(By.xpath('//button[@class="confirm"][contains(text(),"OK")]'));
        SF.sleep(2);
    }
    function AccountLocalDetails() {
        JS.click('a[ng-click=\\"vm.select(tab)\\"]:contains(\\"Details\\")');
        JS.waitForNotExist('div.busyoverlay:visible');
        SF.sleep(5);
        JS.waitForNotExist('div.busyoverlay:visible');
        SF.sleep(1);
        SF.select(By.xpath('//select[@id="current_door_to_parking"]'), 60);
        SF.select(By.xpath('//select[@id="new_door_to_parking"]'), 60);
        SF.select(By.xpath('//select[@id="current_parking_permit"]'), "PDW");
        SF.select(By.xpath('//select[@id="new_parking_permit"]'), "PDW");
        driver.executeScript("$('select#new_parking_permit').get(0).scrollIntoView();");
        SF.sleep(1);
        SF.click(By.xpath('//button[@ng-click="saveDetails()"]'));
        driver.executeScript("$('body').scrollTop(0);");
        SF.sleep(5);
    }
    function RememberAccountNumbers(accountNumbers) {
        driver.wait(driver.executeScript('return $("div:contains(\\"Move Date :\\"):last").next().text()').then(function (dateString) {
            dateString = dateString.toUpperCase();
            accountNumbers.moveDate = {};
            accountNumbers.moveDate.Month = SF.FindMonthInString(dateString);
            accountNumbers.moveDate.Day = SF.cleanPrice(dateString.substring(0, dateString.indexOf(',')));
            accountNumbers.moveDate.Year = SF.cleanPrice(dateString.substring(dateString.indexOf(',')));
        }),config.timeout);
        driver.wait(driver.executeScript('return $("div:contains(\\"Crew Size :\\"):last").next().text()').then(function (text) {
            accountNumbers.CrewSize = SF.cleanPrice(text);
        }),config.timeout);
        driver.wait(driver.executeScript('return $("div:contains(\\"Truck :\\"):last").next().text()').then(function (text) {
            accountNumbers.Trucks = SF.cleanPrice(text);
        }),config.timeout);
        driver.wait(driver.executeScript('return $("div:contains(\\"Hourly Rate :\\"):last").next().text()').then(function (text) {
            accountNumbers.HourlyRate = text.indexOf('$', 4) == -1 ?
                SF.cleanPrice(text) :
                SF.cleanPrice(text.substring(text.indexOf('$', 4)));
        }),config.timeout);
        driver.wait(driver.findElement(By.xpath('//div[contains(text(),"Fuel Surcharge")]/../div[2]')).getText().then(function (text) {
            accountNumbers.Fuel = SF.cleanPrice(text);
        }),config.timeout);
        driver.wait(driver.executeScript(JSstep.getServicesCostAccount), config.timeout).then(function (ServicesText) {
            accountNumbers.AdServices = SF.cleanPrice(ServicesText);
        });
        driver.wait(driver.executeScript(JSstep.getPackingsCostAccount), config.timeout).then(function (ServicesText) {
            accountNumbers.Packing = SF.cleanPrice(ServicesText);
        });
        driver.wait(driver.findElement(By.xpath('//span[contains(text(),"Estimated Travel Time")]/../following-sibling::div[1]')).getText().then(function (text) {
            let hours = text.indexOf('hr') == -1 ? 0 : SF.cleanPrice(text.substring(0, text.indexOf('hr')));
            let minutes = text.indexOf('min') == -1 ? 0 : SF.cleanPrice(text.substring((text.indexOf('hr') + 1), text.indexOf('min')));
            accountNumbers.TravelTime = hours * 60 + minutes;
        }),config.timeout);

        driver.wait(driver.findElement(By.xpath('//div[contains(text(),"Estimated Labor time")]/following-sibling::div[1]')).getText().then(function (text) {
            let textMin = text.substring(0, text.indexOf('-'));
            let textMax = text.substring(text.indexOf('-') + 1);
            let hoursMin = textMin.indexOf('hr') == -1 ? 0 : SF.cleanPrice(textMin.substring(0, textMin.indexOf('hr')));
            let minutesMin = textMin.indexOf('min') == -1 ? 0 : SF.cleanPrice(textMin.substring((textMin.indexOf('hr') + 1), textMin.indexOf('min')));
            accountNumbers.LaborTimeMin = hoursMin * 60 + minutesMin;
            let hoursMax = textMax.indexOf('hr') == -1 ? 0 : SF.cleanPrice(textMax.substring(0, textMax.indexOf('hr')));
            let minutesMax = textMax.indexOf('min') == -1 ? 0 : SF.cleanPrice(textMax.substring((textMax.indexOf('hr') + 1), textMax.indexOf('min')));
            accountNumbers.LaborTimeMax = hoursMax * 60 + minutesMax;
        }),config.timeout);

        driver.wait(driver.findElement(By.xpath('//div[contains(text(),"Estimated Job Time")]/../div[2]')).getText().then(function (text) {
            let textMin = text.substring(0, text.indexOf('-'));
            let textMax = text.substring(text.indexOf('-') + 1);
            let hoursMin = textMin.indexOf('hr') == -1 ? 0 : SF.cleanPrice(textMin.substring(0, textMin.indexOf('hr')));
            let minutesMin = textMin.indexOf('min') == -1 ? 0 : SF.cleanPrice(textMin.substring((textMin.indexOf('hr') + 1), textMin.indexOf('min')));
            accountNumbers.JobTimeMin = hoursMin * 60 + minutesMin;
            let hoursMax = textMax.indexOf('hr') == -1 ? 0 : SF.cleanPrice(textMax.substring(0, textMax.indexOf('hr')));
            let minutesMax = textMax.indexOf('min') == -1 ? 0 : SF.cleanPrice(textMax.substring((textMax.indexOf('hr') + 1), textMax.indexOf('min')));
            accountNumbers.JobTimeMax = hoursMax * 60 + minutesMax;
        }),config.timeout);

        driver.wait(driver.findElement(By.xpath('//div[contains(text(),"Estimated Quote")]/following-sibling::div[1]')).getText().then(function (text) {
            if (text.indexOf("You save") !== -1) {
                let t = text.substring(0, text.indexOf("You save"));
                t = t.substring(t.indexOf('$', t.indexOf('$', t.indexOf('$') + 1) + 1));
                accountNumbers.TotalMin = SF.cleanPrice(t.substring(0, t.indexOf('-')));
                accountNumbers.TotalMax = SF.cleanPrice(t.substring(t.indexOf('-') + 1));
            } else {
                console.log('ещё не делали без скидок');
            }

        }),config.timeout);
        driver.wait(driver.findElement(By.xpath('//div[contains(text(),"Request ID")]/span')).getText().then(function (text) {
            accountNumbers.Id = SF.cleanPrice(text);
        }),config.timeout);
        SF.sleep(2);
        console.log(accountNumbers);
    }
    function LogoutFromAccount() {
        JS.scroll("a[ng-click=\"vm.Logout()\"]");
        SF.click(By.xpath('//a[@ng-click="vm.Logout()"]'));
        SF.waitForVisible(By.xpath('//form[@ng-submit="login()"]'));
        SF.sleep(5);
    }
    function LogoutFromBoardAdmin() {
        JS.waitForNotExist('div.toast-success');
        JS.waitForNotExist('div.toast-message');
        JS.scroll('a[ng-click=\"vm.Logout()\"]');
        SF.click(By.xpath('//a[@ng-click="vm.Logout()"]/../../preceding-sibling::*[1]'));
        SF.sleep(1);
        SF.click(By.xpath('//a[@ng-click="vm.Logout()"]'));
        SF.waitForVisible(By.xpath('//form[@ng-submit="login()"]'));
        SF.sleep(5);
    }
    function LogoutFromBoardForeman() {
        JS.waitForNotExist('div.toast-success:visible');
        JS.waitForNotExist('div.toast-message:visible');
        SF.sleep(2);
        JS.scroll('li.dropdown.profile:visible');
        SF.click(By.xpath('//li[contains(@class,"dropdown") and contains(@class,"profile")]/a[contains(@class,"dropdown-toggle")]'));
        SF.sleep(1);
        SF.click(By.xpath('//a[@ng-click="vm.Logout()"]'));
        SF.waitForVisible(By.xpath('//form[@ng-submit="login()"]'));
        SF.sleep(2);
    }
    function LoginToBoardAsAdmin() {
        SF.waitForVisible(By.xpath('//div[@ng-controller="LoginController"]//span[contains(text(),"Move")]'));
        SF.send(By.xpath('//input[@id="email"]'), 'TestAdmin');
        SF.send(By.xpath('//input[@id="password"]'), 'test');
        SF.click(By.xpath('//button[@type="submit"]'));
        SF.waitForVisible(By.xpath('//td[@ng-click="requestEditModal(request)"]'));
    }
    function LoginToBoardAsForeman() {
        SF.waitForVisible(By.xpath('//div[@ng-controller="LoginController"]//span[contains(text(),"Move")]'));
        SF.send(By.xpath('//input[@id="email"]'), 'TestForeman');
        SF.send(By.xpath('//input[@id="password"]'), '123');
        SF.click(By.xpath('//button[@type="submit"]'));
        SF.waitForVisible(By.xpath('//tr[@ng-click="vm.editReservation(request.nid)"]'));
    }
    function LoginToBoardAsCustom(login, passwd) {
        SF.waitForVisible(By.xpath('//div[@ng-controller="LoginController"]//span[contains(text(),"Move")]'));
        SF.send(By.xpath('//input[@id="email"]'), login);
        SF.send(By.xpath('//input[@id="password"]'), passwd);
        SF.click(By.xpath('//button[@type="submit"]'));
        SF.waitForVisible(By.xpath('//td[@ng-click="requestEditModal(request)"]'));
    }
    function LoginToAccountAsClient(client) {
        SF.sleep(1);
        SF.waitForVisible(By.xpath('//form[@ng-submit="login()"]'));
        SF.sleep(1);
        SF.send(By.xpath('//input[@id="email"]'), client.email);
        SF.send(By.xpath('//input[@id="password"]'), client.passwd);
        SF.click(By.xpath('//button[@type="submit"]'));
        SF.sleep(2);
    }
    function OpenRequest(request) {
        driver.wait(driver.wait(until.elementLocated(By.xpath('//td[@ng-click="requestEditModal(request)"][contains(text(),"' + request + '")]/..')), config.timeout)
            .getAttribute('class').then(function (classStr) {
                    if (classStr.indexOf('active_row') == -1) {
                        driver.wait(driver.findElement(By.xpath('//td[@ng-click="requestEditModal(request)"][contains(text(),"' + request + '")]')).click(), config.timeout);
                        driver.wait(driver.findElement(By.xpath('//td[@ng-click="requestEditModal(request)"][contains(text(),"' + request + '")]')).click(), config.timeout);
                    } else {
                        driver.wait(driver.findElement(By.xpath('//td[@ng-click="requestEditModal(request)"][contains(text(),"' + request + '")]')).click(), config.timeout);
                    }
                    if (!condition.busy) {
                        fiber.run();
                    }
                }
            ), config.timeout);
        if (!condition.busy) {
            Fiber.yield();
        }
        SF.waitForVisible(By.xpath('//div[@ng-click="chooseTruck(tid)"]'));
        JS.waitForNotExist('div.busyoverlay:visible');
        SF.sleep(2);
        JS.waitForNotExist('div.busyoverlay:visible');
    }
    function CreateLocalMovingFromBoard() {
        JS.waitForNotExist('div.toast-success');
        JS.waitForNotExist('div.busyoverlay:visible');
        SF.click(By.linkText('Create Request'));
        SF.sleep(3);
        SF.click(By.xpath('//div[@class="step1"]//select[@name="move_service_type"]/option[@value="number:1"]'));
        SF.click(By.xpath('//input[@id="edit-move-date-datepicker-popup-0"]'));
        V.request = {};
        driver.wait(driver.executeScript(JSstep.Click4DaysCalendar).then(function (calDate) {
            V.request.moveDate = calDate;
            console.log(V.request);
        }),config.timeout);
        SF.sleep(0.5);
        SF.click(By.xpath('//ul[@class="chosen-choices"]'));
        SF.click(By.xpath('//ul[@class="chosen-results"]/li[@data-option-array-index="1"]'));
        driver.wait(driver.findElement(By.xpath('//input[@ng-model="editrequest.data.field_date"]')).getAttribute("value").then(function(mdate){
            V.request.mdate = (mdate);
        }),config.timeout);
        console.log (V.request.mdate);
        SF.send(By.id("edit-zip-code-from"), "02032");
        SF.send(By.id("edit-zip-code-to"), "02136");
        SF.sleep(5);
        SF.click(By.xpath('//button[@ng-click="Calculate()"]'));
        SF.sleep(1);
        JS.waitForNotExist('div.busyoverlay:visible');
        SF.sleep(1);
        SF.click(By.xpath('//button[@ng-click="step2 = false;step3 = true;"]'));
        SF.sleep(2);
        SF.send(By.xpath('//div[@class="step3"]//input[@ng-model="editrequest.account.fields.field_user_first_name"]'), V.client.name);
        SF.send(By.xpath('//div[@class="step3"]//input[@ng-model="editrequest.account.fields.field_user_last_name"]'), V.client.fam);
        SF.send(By.xpath('//div[@class="step3"]//input[@ng-model="editrequest.account.mail"]'), V.client.email);
        SF.send(By.xpath('//div[@class="step3"]//input[@ng-model="editrequest.account.fields.field_primary_phone"]'), V.client.phone);
        SF.click(By.xpath('//button[@ng-click="create()"]'));
        SF.waitForVisible(By.xpath('//div[@ng-click="chooseTruck(tid)"]'));
        SF.sleep(4);
        console.log('создали реквест');
    }
    function CreateMovAndStorFromBoard() {
        SF.click(By.linkText('Create Request'));
        SF.sleep(2);
        SF.click(By.xpath('//div[@class="step1"]//select[@name="move_service_type"]/option[@value="number:2"]'));
        SF.click(By.xpath('//input[@id="edit-move-date-datepicker-popup-0"]'));
        V.request = {};
        driver.wait(driver.executeScript(JSstep.Click4DaysCalendar).then(function (calDate) {
            V.request.moveDate = calDate;
            console.log(V.request);
        }),config.timeout);
        SF.sleep(2);
        SF.click(By.xpath('//input[@id="edit-date-storage-datepicker-popup-0"]'));
        driver.wait(driver.executeScript(JSstep.Click8DaysCalendar).then(function (DelDate) {
            V.request.DeliveryDate = DelDate;
            console.log(V.request.DeliveryDate);
        }),config.timeout);

        SF.sleep(0.5);
        SF.click(By.xpath('//ul[@class="chosen-choices"]'));
        SF.click(By.xpath('//ul[@class="chosen-results"]/li[@data-option-array-index="1"]'));
        SF.send(By.id("edit-zip-code-from"), "02032");
        SF.send(By.id("edit-zip-code-to"), "02136");
        SF.sleep(4);
        SF.click(By.xpath('//button[@ng-click="Calculate()"]'));
        SF.sleep(5);
        SF.click(By.xpath('//button[@ng-click="step2 = false;step3 = true;"]'));
        SF.send(By.xpath('//div[@class="step3"]//input[@ng-model="editrequest.account.fields.field_user_first_name"]'), V.client.name);
        SF.send(By.xpath('//div[@class="step3"]//input[@ng-model="editrequest.account.fields.field_user_last_name"]'), V.client.fam);
        SF.send(By.xpath('//div[@class="step3"]//input[@ng-model="editrequest.account.mail"]'), V.client.email);
        SF.send(By.xpath('//div[@class="step3"]//input[@ng-model="editrequest.account.fields.field_primary_phone"]'), V.client.phone);
        SF.click(By.xpath('//button[@ng-click="create()"]'));
        SF.waitForVisible(By.xpath('//div[@ng-click="chooseTruck(tid)"]'));
        SF.sleep(4);
        console.log('создали реквест');
    }
    function CreateLoadingHelpFromBoard() {
        SF.click(By.linkText('Create Request'));
        SF.sleep(4);
        SF.click(By.xpath('//div[@class="step1"]//select[@name="move_service_type"]/option[@value="number:3"]'));
        SF.click(By.xpath('//input[@id="edit-move-date-datepicker-popup-0"]'));
        V.request = {};
        driver.wait(driver.executeScript(JSstep.Click4DaysCalendar).then(function (calDate) {
            V.request.moveDate = calDate;
            console.log(V.request);
        }),config.timeout);
        SF.sleep(0.5);
        SF.click(By.xpath('//ul[@class="chosen-choices"]'));
        SF.click(By.xpath('//ul[@class="chosen-results"]/li[@data-option-array-index="1"]'));
        SF.send(By.id("edit-zip-code-from"), "02032");
        SF.sleep(1);
        SF.click(By.xpath('//button[@ng-click="Calculate()"]'));
        SF.sleep(4);
        SF.click(By.xpath('//button[@ng-click="step2 = false;step3 = true;"]'));
        SF.send(By.xpath('//div[@class="step3"]//input[@ng-model="editrequest.account.fields.field_user_first_name"]'), V.client.name);
        SF.send(By.xpath('//div[@class="step3"]//input[@ng-model="editrequest.account.fields.field_user_last_name"]'), V.client.fam);
        SF.send(By.xpath('//div[@class="step3"]//input[@ng-model="editrequest.account.mail"]'), V.client.email);
        SF.send(By.xpath('//div[@class="step3"]//input[@ng-model="editrequest.account.fields.field_primary_phone"]'), V.client.phone);
        SF.click(By.xpath('//button[@ng-click="create()"]'));
        SF.waitForVisible(By.xpath('//div[@ng-click="chooseTruck(tid)"]'));
        SF.sleep(2);
        console.log('создали реквест');
    }
    function RememberDigitsRequestBoard_Up(boardNumbers) {
        driver.wait(driver.findElement(By.xpath('//input[@ng-model="moveDateInput"]')).getAttribute("value").then(function (dateString) {
            dateString = dateString.toUpperCase();
            boardNumbers.moveDate = {};
            boardNumbers.moveDate.Month = SF.FindMonthInString(dateString);
            boardNumbers.moveDate.Day = SF.cleanPrice(dateString.substring(0, dateString.indexOf(',')));
            boardNumbers.moveDate.Year = SF.cleanPrice(dateString.substring(dateString.indexOf(',')));
        }),config.timeout);
        driver.wait(driver.findElement(By.xpath('//input[@ng-model="request.minimum_time.value"]')).getAttribute('value').then(function (value) {
            boardNumbers.LaborTimeMin = SF.cleanPrice(value.substring(0, value.indexOf(':'))) * 60
                + SF.cleanPrice(value.substring(value.indexOf(':')));
        }),config.timeout);
        driver.wait(driver.findElement(By.xpath('//input[@ng-model="request.maximum_time.value"]')).getAttribute('value').then(function (value) {
            boardNumbers.LaborTimeMax = SF.cleanPrice(value.substring(0, value.indexOf(':'))) * 60
                + SF.cleanPrice(value.substring(value.indexOf(':')));
        }),config.timeout);
        driver.wait(driver.findElement(By.xpath('//input[@ng-model="request.travel_time.value"]')).getAttribute('value').then(function (value) {
            boardNumbers.TravelTime = SF.cleanPrice(value.substring(0, value.indexOf(':'))) * 60
                + SF.cleanPrice(value.substring(value.indexOf(':')));
        }),config.timeout);
        driver.wait(driver.findElement(By.xpath('//input[@id="edit-movers-crew"]')).getAttribute('value').then(function (value) {
            boardNumbers.CrewSize = SF.cleanPrice(value);
        }),config.timeout);
        driver.wait(driver.findElement(By.xpath('//input[@ng-model="request.rate.value"]')).getAttribute('value').then(function (value) {
            boardNumbers.HourlyRate = SF.cleanPrice(value);
        }),config.timeout);
        driver.wait(driver.findElement(By.xpath('//label[contains(text(),"Trucks:")]/following-sibling::div[1]')).getText('text').then(function (text) {
            boardNumbers.Trucks = SF.cleanPrice(text);
        }),config.timeout);
        driver.wait(driver.findElement(By.xpath('//a[@ng-click="select(tabs[0])"]')).getText().then(function(text){
            boardNumbers.Id = SF.cleanPrice(text);
        }),config.timeout);
        SF.sleep(1);
        console.log(boardNumbers);
    }
    function RememberDigitsRequestBoard_Down(boardNumbers) {
        driver.wait(driver.executeScript('return $(\'div.QuoteCost:visible\').text()').then(function (text) {
            if (text.indexOf('$', text.indexOf('$') + 3) !== -1) {
                boardNumbers.QuoteMin = SF.cleanPrice(text.substring(text.indexOf('$'), text.indexOf('-')));
                boardNumbers.QuoteMax = SF.cleanPrice(text.substring(text.indexOf('$', text.indexOf('$') + 3)));
            } else {
                boardNumbers.Quote = SF.cleanPrice(text);
            }
        }),config.timeout);
        driver.wait(driver.executeScript('return $(\'div.FuelCost:visible\').text()').then(function (text) {
            boardNumbers.Fuel = SF.cleanPrice(text.substring(text.indexOf('$')));
        }),config.timeout);
        driver.wait(driver.executeScript('return $(\'div.ValuationCost:visible\').text()').then(function (text) {
            boardNumbers.Valuation = SF.cleanPrice(text.substring(text.indexOf('$')));
        }),config.timeout);
        driver.wait(driver.executeScript('return $(\'div.PackingCost:visible\').text()').then(function (text) {
            boardNumbers.Packing = SF.cleanPrice(text.substring(text.indexOf('$')));
        }),config.timeout);
        driver.wait(driver.executeScript('return $(\'div.ServicesCost:visible\').text()').then(function (text) {
            boardNumbers.AdServices = SF.cleanPrice(text.substring(text.indexOf('$')));
        }),config.timeout);
        driver.wait(driver.executeScript('return $(\'div.DiscountCost:visible\').text()').then(function (text) {
            boardNumbers.Discount = SF.cleanPrice(text.substring(text.indexOf('$')));
        }),config.timeout);
        driver.wait(driver.executeScript('return $(\'div.TipsCost:visible input\').val()').then(function (text) {
            if (text != null) {
                boardNumbers.Tips = SF.cleanPrice(text.substring(text.indexOf('$')));
            } else {
                boardNumbers.Tips = 0;
            }
        }),config.timeout);
        driver.wait(driver.executeScript('return $(\'div.TotalCost:visible\').text()').then(function (text) {
            if (text.indexOf('$', text.indexOf('$') + 3) !== -1) {
                boardNumbers.TotalMin = SF.cleanPrice(text.substring(text.indexOf('$'), text.indexOf('-')));
                boardNumbers.TotalMax = SF.cleanPrice(text.substring(text.indexOf('$', text.indexOf('$') + 3)));
            } else {
                boardNumbers.Total = SF.cleanPrice(text);
            }
        }),config.timeout);
        driver.wait(driver.executeScript('return $(\'div.PaymentCost:visible\').text()').then(function (text) {
            boardNumbers.Payment = SF.cleanPrice(text.substring(text.indexOf('$')));
        }),config.timeout);
        driver.wait(driver.executeScript('return $(\'div.BalanceCost:visible\').text()').then(function (text) {
            if (text.indexOf('$', text.indexOf('$') + 3) !== -1) {
                boardNumbers.BalanceMin = SF.cleanPrice(text.substring(text.indexOf('$'), text.indexOf('-')));
                boardNumbers.BalanceMax = SF.cleanPrice(text.substring(text.indexOf('$', text.indexOf('$') + 3)));
            } else {
                boardNumbers.Balance = SF.cleanPrice(text);
            }
        }),config.timeout);
        SF.sleep(1);
        console.log(boardNumbers);
    }
    function RememberDigitsRequestBoard(boardNumbers) {
        RememberDigitsRequestBoard_Up(boardNumbers);
        RememberDigitsRequestBoard_Down(boardNumbers);
    }

    function Validation_Compare_Account_Admin(accountNumbers,boardNumbers) {
        VD.IWant(VD.VToEqual, accountNumbers.moveDate.Day, boardNumbers.moveDate.Day, 'не совпали даты аккаунта и борда');
        VD.IWant(VD.VToEqual, accountNumbers.moveDate.Month, boardNumbers.moveDate.Month, 'не совпали даты аккаунта и борда');
        VD.IWant(VD.VToEqual, accountNumbers.moveDate.Year, boardNumbers.moveDate.Year, 'не совпали даты аккаунта и борда');
        VD.IWant(VD.VToEqual, accountNumbers.CrewSize, boardNumbers.CrewSize, 'не совпали CrewSize аккаунта и борда');
        VD.IWant(VD.VToEqual, accountNumbers.HourlyRate, boardNumbers.HourlyRate, 'не совпали HourlyRate аккаунта и борда');
        VD.IWant(VD.VToEqual, accountNumbers.LaborTimeMin, boardNumbers.LaborTimeMin, 'не совпали LaborTimeMin аккаунта и борда');
        VD.IWant(VD.VToEqual, accountNumbers.LaborTimeMax, boardNumbers.LaborTimeMax, 'не совпали LaborTimeMax аккаунта и борда');
        VD.IWant(VD.VToEqual, accountNumbers.TravelTime, boardNumbers.TravelTime, 'не совпали TravelTime аккаунта и борда');
        VD.IWant(VD.VToEqual, accountNumbers.Packing, boardNumbers.Packing, 'не совпали Packing аккаунта и борда');
        VD.IWant(VD.VToEqual, accountNumbers.AdServices, boardNumbers.AdServices, 'не совпали Services аккаунта и борда');
        VD.IWant(VD.VToEqual, accountNumbers.Trucks, boardNumbers.Trucks, 'не совпали Trucks аккаунта и борда');
        VD.IWant(VD.VToEqual, accountNumbers.TotalMin, boardNumbers.TotalMin, 'не совпали TotalMin аккаунта и борда');
        VD.IWant(VD.VToEqual, accountNumbers.TotalMax, boardNumbers.TotalMax, 'не совпали TotalMax аккаунта и борда');
        VD.IWant(VD.VToEqual, accountNumbers.Fuel, boardNumbers.Fuel, 'не совпали Fuel аккаунта и борда');
    }

    function Validation_Compare_Account_Front_MovStorTo(accountNumbers,frontNumbersDown) {

        VD.IWant(VD.VToEqual, accountNumbers.CrewSize, frontNumbersDown.CrewTo, 'не совпали CrewSize аккаунта и фронта');
        VD.IWant(VD.VToEqual, accountNumbers.HourlyRate, frontNumbersDown.RateTo, 'не совпали HourlyRate аккаунта и фронта');

        VD.IWant(VD.VToEqual, accountNumbers.TravelTime, frontNumbersDown.TravelTimeTo, 'не совпали TravelTime аккаунта и фронта');

        VD.IWant(VD.VToEqual, accountNumbers.TotalMin, frontNumbersDown.QuoteMinTo, 'не совпали TotalMin аккаунта и фронта');
        VD.IWant(VD.VToEqual, accountNumbers.TotalMax, frontNumbersDown.QuoteMaxTo, 'не совпали TotalMax аккаунта и фронта');
        VD.IWant(VD.VToEqual, accountNumbers.Fuel, frontNumbersDown.FuelTo, 'не совпали Fuel аккаунта и борда');
        VD.IWant(VD.VToEqual, accountNumbers.JobTimeMin, frontNumbersDown.JobTimeMinTo, 'не совпали TotalMax аккаунта и фронта');
        VD.IWant(VD.VToEqual, accountNumbers.JobTimeMax, frontNumbersDown.JobTimeMaxTo, 'не совпали Fuel аккаунта и фронта');
    }

    function Validation_Compare_Account_Front_MovStorFrom(accountNumbers,frontNumbersDown) {

        VD.IWant(VD.VToEqual, accountNumbers.CrewSize, frontNumbersDown.CrewFrom, 'не совпали CrewSize аккаунта и фронта From');
        VD.IWant(VD.VToEqual, accountNumbers.HourlyRate, frontNumbersDown.RateFrom, 'не совпали HourlyRate аккаунта и фронта From');

        VD.IWant(VD.VToEqual, accountNumbers.TravelTime, frontNumbersDown.TravelTimeFrom, 'не совпали TravelTime аккаунта и фронта From');

        VD.IWant(VD.VToEqual, accountNumbers.TotalMin, frontNumbersDown.QuoteMinFrom, 'не совпали TotalMin аккаунта и фронта From');
        VD.IWant(VD.VToEqual, accountNumbers.TotalMax, frontNumbersDown.QuoteMaxFrom, 'не совпали TotalMax аккаунта и фронта From');
        VD.IWant(VD.VToEqual, accountNumbers.Fuel, frontNumbersDown.FuelFrom, 'не совпали Fuel аккаунта и борда From');
        VD.IWant(VD.VToEqual, accountNumbers.JobTimeMin, frontNumbersDown.JobTimeMinFrom, 'не совпали TotalMax аккаунта и фронта From');
        VD.IWant(VD.VToEqual, accountNumbers.JobTimeMax, frontNumbersDown.JobTimeMaxFrom, 'не совпали Fuel аккаунта и фронта From');
    }

    function SetManager(name) {
        SF.click(By.xpath('//button[contains(text(),"Set Sales")]'));
        SF.click(By.xpath('//a[@ng-click="setManager(manager.uid)"][contains(text(),"' + name + '")]'));
        SF.sleep(1);
        SF.click(By.xpath('//button[@class="confirm"][contains(text(),"Confirm")]'));
        SF.sleep(1);
    }
    function SetClientPasswd(passwd) {
        SF.send(By.xpath('//input[@ng-model="client.password"]'), passwd);
        SF.click(By.xpath('//button[@ng-click="update(client)"]'));
        SF.sleep(3);
    }
    function FillCardPayModal() {
        JS.waitForExist('input[ng-model="payment.card_num"]');
        SF.sleep(1);
        SF.send(By.xpath('//input[@ng-model="payment.card_num"]'), 4111111111111111);
        SF.send(By.xpath('//input[@ng-model="payment.exp_month"]'), 11);
        SF.send(By.xpath('//input[@ng-model="payment.exp_year"]'), 20);
        SF.send(By.xpath('//input[@ng-model="secure.cvc"]'), 323);
        SF.sleep(1);
        SF.click(By.xpath('//input[@ng-click="applyPayment()"]'));
    }
    function MakeSignJS(canvasID) {
        JS.waitForExist('canvas#' + canvasID);
        SF.sleep(1);
        JS.step("var canva = document.getElementById('" + canvasID + "');" +
            "var width=canva.getAttribute('width');" +
            "var height=canva.getAttribute('height');" +
            "var w=width/100; var h=height/100;" +
            "cont = canva.getContext('2d');" +
            "cont.beginPath();" +
            "cont.moveTo(50*w, 50*h);" +
            "cont.lineTo(80*w, 80*h);" +
            "cont.lineTo(20*w, 70*h);" +
            "cont.lineTo(80*w, 20*h);" +
            "cont.lineTo(30*w, 30*h);" +
            "cont.closePath();" +
            "cont.stroke();");
        SF.sleep(1);
    }
    function ConfirmRequestInAccount_WithReservation(ReservationPrice) {
        SF.click(By.xpath('//div[contains(@class,"notconfirmed")]'));
        SF.sleep(2);
        JS.waitForExist('div.confirm');
        JS.scroll('div.confirm');
        if (ReservationPrice!=undefined) {
            let ReservationSee = 0;
            driver.findElement(By.xpath('//h2[contains(text(),"Deposit:")]')).getText().then(function(text){
                ReservationSee=SF.cleanPrice(text);
            });
            SF.sleep(1);
            VD.IWant(VD.VToEqual, ReservationSee, ReservationPrice, 'Резервация на аккаунте не совпала');
        }
        SF.click(By.xpath('//input[@ng-model="vm.checkCancel"]'));
        SF.click(By.xpath('//input[@ng-model="vm.checkTerms"]'));
        SF.click(By.xpath('//div[@ng-click="addReservationPayment()"]'));
        SF.waitForVisible(By.xpath('//canvas[@id="signatureCanvasReserv"]'));
        MakeSignJS('signatureCanvasReserv');
        SF.click(By.xpath('//button[contains(@ng-click,"saveReservSignature()")]'));
        FillCardPayModal();
    }
    function ConfirmRequestInAccount_NoReservation() {
        SF.click(By.xpath('//div[contains(@class,"notconfirmed")]'));
        SF.sleep(2);
        JS.waitForExist('div.confirm');
        JS.scroll('div.confirm');
        SF.click(By.xpath('//input[@ng-model="vm.checkCancel"]'));
        SF.click(By.xpath('//input[@ng-model="vm.checkTerms"]'));
        SF.click(By.xpath('//input[@ng-click="confirmReservation()"]'));
        SF.waitForVisible(By.xpath('//canvas[@id="signatureCanvasReservation"]'));
        MakeSignJS('signatureCanvasReservation');
        SF.click(By.xpath('//button[@ng-click="saveSignature()"]'));
        JS.waitForExist('button.confirm');
        SF.sleep(1);
        SF.click(By.xpath('//button[@class="confirm"]'));
    }
//Permissions for Sales --- start
    function PermissionsClear() {
        driver.wait(driver.executeScript("if($('input[ng-model=\"request.permissions.canSeeOtherLeads\"]').hasClass('ng-empty')){return true;}else{$('input[ng-model=\"request.permissions.canSeeOtherLeads\"]').parent().click()}"));
        driver.wait(driver.executeScript("if($('input[ng-model=\"request.permissions.canSearchOtherLeads\"]').hasClass('ng-empty')){return true;}else{$('input[ng-model=\"request.permissions.canSearchOtherLeads\"]').parent().click()}"));
        driver.wait(driver.executeScript("if($('input[ng-model=\"request.permissions.canEditOtherLeads\"]').hasClass('ng-empty')){return true;}else{$('input[ng-model=\"request.permissions.canEditOtherLeads\"]').parent().click()}"));
        driver.wait(driver.executeScript("if($('input[ng-model=\"request.permissions.canSeeUnsignedLeads\"]').hasClass('ng-empty')){return true;}else{$('input[ng-model=\"request.permissions.canSeeUnsignedLeads\"]').parent().click()}"));
        driver.wait(driver.executeScript("if($('input[ng-model=\"request.permissions.canSignedSales\"]').hasClass('ng-empty')){return true;}else{$('input[ng-model=\"request.permissions.canSignedSales\"]').parent().click()}"));

    }
    function PermissionCanSeeOtherLeads() {
        driver.wait(driver.executeScript("$('input[ng-model=\"request.permissions.canSeeOtherLeads\"]').parent().click()"));
        SF.click(By.xpath('//input[@ng-model="request.permissions.canSeeOtherLeads"]/..'));
    }
    function PermissionCanSearchOtherLeads() {
        driver.wait(driver.executeScript("$('input[ng-model=\"request.permissions.canSearchOtherLeads\"]').click()"));
    }
    function PermissionCanEditOtherLeads() {
        driver.wait(driver.executeScript("$('input[ng-model=\"request.permissions.canEditOtherLeads\"]').click()"));
    }
    function PermissionCanSeeUnsignedLeads() {
        driver.wait(driver.executeScript("$('input[ng-model=\"request.permissions.canSeeUnsignedLeads\"]').click()"));
    }
    function PermissionCanSignedSales() {
        driver.wait(driver.executeScript("$('input[ng-model=\"request.permissions.canSignedSales\"]').click()"));
    }
//Permissions for Sales --- end
    function closeEditRequest() {
        JS.waitForNotExist("div.busyoverlay:visible");
        JS.waitForNotExist('div.toast-message:visible');
        JS.waitForNotExist('div.toast-top-right:visible');
        JS.waitForNotExist('div.toast-success:visible');
        JS.waitForNotExist('div.visible-overflow');
        SF.sleep(2);
        JS.waitForNotExist("div.busyoverlay:visible");
        JS.waitForNotExist('div.toast-message:visible');
        JS.waitForNotExist('div.toast-top-right:visible');
        JS.waitForNotExist('div.toast-success:visible');
        JS.waitForNotExist('div.visible-overflow');
        SF.sleep(1);
        SF.click(By.xpath('//button[@ng-click="cancel()"]'));
        SF.sleep(2);
    }
    function SelectRequestDispatch(request) {
        driver.wait(until.elementLocated(By.xpath('//td[contains(text(),"' + request + '")]/..')), config.timeout)
            .getAttribute('class').then(function (classStr) {
                if (classStr.indexOf('active_row') == -1) {
                    driver.findElement(By.xpath('//td[contains(text(),"' + request + '")]')).click();
                }
                if (!condition.busy) {
                    fiber.run();
                }
            }
        );
        if (!condition.busy) {
            Fiber.yield();
        }
    }
    function OpenRequestDispatch(request) {
        driver.wait(until.elementLocated(By.xpath('//td[contains(text(),"' + request + '")]/..')), config.timeout)
            .getAttribute('class').then(function (classStr) {
                if (classStr.indexOf('active_row') == -1) {
                    driver.findElement(By.xpath('//td[contains(text(),"' + request + '")]')).click();
                }
                driver.findElement(By.xpath('//td[contains(text(),"' + request + '")]')).click();
                if (!condition.busy) {
                    fiber.run();
                }
            }
        );
        if (!condition.busy) {
            Fiber.yield();
        }
    }
    function selectCrew() {
        SF.click(By.xpath("//select[@ng-model='vm.data.foreman']"));
        SF.click(By.xpath("//select[@ng-model='vm.data.foreman']/option[contains(text(),'Test Foreman')]"));
        SF.click(By.xpath("//label[contains(text(),'Helper No. 2')]/following-sibling::select[@ng-model='vm.data.baseCrew.helpers[$index]']"));
        SF.click(By.xpath("//label[contains(text(),'Helper No. 2')]/following-sibling::select[@ng-model='vm.data.baseCrew.helpers[$index]']//option[contains(text(),'Test Helper1')]"));
        driver.wait(
            driver.findElements(By.xpath("//label[contains(text(),'Helper No. 3')]/following-sibling::select[@ng-model='vm.data.baseCrew.helpers[$index]']")).then(function (count) {
                if (count.length > 0) {
                    driver.wait(driver.findElement(By.xpath("//label[contains(text(),'Helper No. 3')]/following-sibling::select[@ng-model='vm.data.baseCrew.helpers[$index]']")).click());
                    driver.wait(driver.findElement(By.xpath("//label[contains(text(),'Helper No. 3')]/following-sibling::select[@ng-model='vm.data.baseCrew.helpers[$index]']//option[contains(text(),'Test Helper2')]")).click());
                }
            }), config.timeout);
        driver.wait(
            driver.findElements(By.xpath("//label[contains(text(),'Helper No. 4')]/following-sibling::select[@ng-model='vm.data.baseCrew.helpers[$index]']")).then(function (count) {
                if (count.length > 0) {
                    driver.wait(driver.findElement(By.xpath("//label[contains(text(),'Helper No. 4')]/following-sibling::select[@ng-model='vm.data.baseCrew.helpers[$index]']")).click());
                    driver.wait(driver.findElement(By.xpath("//label[contains(text(),'Helper No. 4')]/following-sibling::select[@ng-model='vm.data.baseCrew.helpers[$index]']//option[contains(text(),'Test Helper3')]")).click());
                }
            }), config.timeout);
        SF.click(By.xpath("//a[@ng-click=\"vm.assignTeam(request)\"]"));
        JS.waitForExist('div.toast-success');
        SF.sleep(2);
        JS.waitForNotExist('div.toast-success');
    }
    function MakeSignInContract() {
        SF.click(By.xpath('//div[@class="empty-signature"]'));
        MakeSignJS("signatureCanvas");
        SF.click(By.xpath('//button[@ng-click="saveStep()"]'));
        SF.sleep(2);
    }
    function MakeSignInInventory(step) {
        SF.click(By.xpath('//div[@id="step_inventoryMoving_'+step+'"]/div[@class="empty-signature"]/..'));
        MakeSignJS("signatureInventoryCanvas");
        SF.click(By.xpath('//div[@id="signatureInventoryPad"]//button[@ng-click="saveStep()"]'));
        SF.sleep(2);
    }
    function MakeSignInRental(){
        SF.sleep(1);
        SF.click(By.xpath('//span[contains(text(),"Tenant Signature:")]/following-sibling::div[1]/div[@ng-click="openService(\'monthly_storage_fee\', 1)"]'));
        MakeSignJS("signatureCanvasService");
        SF.click(By.xpath('//button[@ng-click="saveService()"]'));
        SF.sleep(2);
        JS.waitForNotExist('.busyoverlay:visible');
        SF.sleep(1);
        JS.waitForNotExist('.busyoverlay:visible');
        SF.sleep(1);
    }
    function payRentalInventory(){
        SF.click(By.xpath('//button[@ng-click="openPayment()"]'));
        SF.click(By.xpath('//button[@ng-click="goStepTwo();"]'));
        FillCardPayModal();
        MakeSignJS('signatureCanvasPayment');
        SF.click(By.xpath('//div[@ng-init="payment.canvasInit(\'signatureCanvasPayment\')"]//button[@ng-click="saveSignature()"]'));
    }
    function RememberDateFromRequest() {
        if (V.boardNumbers==undefined) {V.boardNumbers = {};}
        driver.wait(driver.findElement(By.xpath('//input[@ng-model="moveDateInput"]')).getAttribute("value").then(function (dateString) {
            dateString = dateString.toUpperCase();
            V.boardNumbers.moveDate = {};
            V.boardNumbers.moveDate.Month = SF.FindMonthInString(dateString);
            V.boardNumbers.moveDate.Day = SF.cleanPrice(dateString.substring(0, dateString.indexOf(',')));
            V.boardNumbers.moveDate.Year = SF.cleanPrice(dateString.substring(dateString.indexOf(',')));
        }),config.timeout);
        SF.sleep(1);
    }
    function findDayInLocalDispatch(futureYear, futureMonth, futureDay) {
        var target = futureYear;
        var current = 'a';
        while (isNaN(current)) {
            driver.wait(driver.wait(driver.executeScript('return $(\'span.ui-datepicker-year:visible\').text()'), config.timeout).then(function (text) {
                current = Number(text);
                console.log('получил год' + current);
            }), config.timeout);
            SF.sleep(1);
        }
        console.log('current year:' + current + ' tagret:' + target);
        while (current !== target) {
            JS.waitForNotExist('div#datePicker-block.disabled');
            if (current > target) {
                SF.click(By.xpath('//a[@data-handler="prev"]'));
            } else {
                SF.click(By.xpath('//a[@data-handler="next"]'));
            }
            var current = 'a';
            while (isNaN(current)) {
                driver.wait(driver.wait(driver.executeScript('return $(\'span.ui-datepicker-year:visible\').text()'), config.timeout).then(function (text) {
                    current = Number(text);
                    console.log('получил год' + current);
                }), config.timeout);
                SF.sleep(1);
            }
            console.log('current year:' + current + ' tagret:' + target);
        }
        console.log('выбрали год');
        target = futureMonth;
        var current = 'a';
        while (isNaN(current)) {
            driver.wait(driver.wait(driver.executeScript('return $(\'span.ui-datepicker-month:visible\').text()'), config.timeout).then(function (text) {
                current = constants.monthNumbers[text.toUpperCase()];
                console.log('получил месяц' + current);
            }), config.timeout);
            SF.sleep(1);
        }
        console.log('current Month:' + current + ' tagret:' + target);
        while (current !== target) {
            JS.waitForNotExist('div#datePicker-block.disabled');
            if (current > target) {
                SF.click(By.xpath('//a[@data-handler="prev"]'));
            } else {
                SF.click(By.xpath('//a[@data-handler="next"]'));
            }
            var current = 'a';
            while (isNaN(current)) {
                driver.wait(driver.wait(driver.executeScript('return $(\'span.ui-datepicker-month:visible\').text()'), config.timeout).then(function (text) {
                    current = constants.monthNumbers[text.toUpperCase()];
                    console.log('получил месяц' + current);
                }), config.timeout);
                SF.sleep(1);
            }
            console.log('current Month:' + current + ' tagret:' + target);
        }
        console.log('выбрали месяц');
        var EQ = futureDay;
        JS.waitForNotExist('div#datePicker-block.disabled');
        SF.click(By.xpath('(//td[@data-handler="selectDay"])[' + EQ + ']'));
    }
    function RememberAndValidatePayroll_In_EditRequest() {
        V.boardNumbers.Payroll = {
            managerForCommission: {},
            foremanForCommission: {},
            helpersForComission: []
        };
        SF.sleep(1);
        driver.wait(driver.executeScript('return $(\'input[ng-model="sale.for_commission "]\').val()').then(function (text) {
            V.boardNumbers.Payroll.managerForCommission.office = SF.cleanPrice(text);
        }));
        SF.sleep(1);
        VD.IWant(VD.VToEqual, Math.floor(V.boardNumbers.Payroll.managerForCommission.office),
            Math.floor(V.boardNumbers.Total
                - V.boardNumbers.AdServices - V.boardNumbers.Packing - V.boardNumbers.Fuel - V.boardNumbers.Valuation - V.boardNumbers.Tips),
            'Не совпал ForCommission менеджера');

        driver.findElement(By.xpath('//label[@ng-init="calcWorkerTotal(\'salesPerson\')"]')).getText().then(function (text) {
            V.boardNumbers.Payroll.managerForCommission.total = SF.cleanPrice(text);
        });
        SF.click(By.xpath('//li[@heading="Foremen"]/a'));
        driver.wait(driver.executeScript('return ' +
            '$(\'tr:has(td>select>option[selected="selected"]:contains("Tips"))>td>input[ng-model="foreman.for_commission"]\').val()'
        ).then(function (text) {
            V.boardNumbers.Payroll.foremanForCommission.Tips = SF.cleanPrice(text);
        }));
        SF.sleep(1);
        VD.IWant(VD.VToEqual, Math.floor(V.boardNumbers.Payroll.foremanForCommission.Tips),
            Math.floor(V.boardNumbers.Tips / V.boardNumbers.CrewSize),
            'Не совпал Tips формена');

        driver.wait(driver.executeScript('return ' +
            '$(\'tr:has(td>select>option[selected="selected"]:contains("Extras Commission"))>td>input[ng-model="foreman.for_commission"]\').val()'
        ).then(function (text) {
            V.boardNumbers.Payroll.foremanForCommission.AdServices = SF.cleanPrice(text);
        }));
        SF.sleep(1);
        VD.IWant(VD.VToEqual, Math.floor(V.boardNumbers.Payroll.foremanForCommission.AdServices),
            Math.floor(V.boardNumbers.AdServices),
            'Не совпал Extras формена');

        driver.wait(driver.executeScript('return ' +
            '$(\'tr:has(td>select>option[selected="selected"]:contains("Packing Commission"))>td>input[ng-model="foreman.for_commission"]\').val()'
        ).then(function (text) {
            V.boardNumbers.Payroll.foremanForCommission.Packing = SF.cleanPrice(text);
        }));
        SF.sleep(1);
        VD.IWant(VD.VToEqual, Math.floor(V.boardNumbers.Payroll.foremanForCommission.Packing),
            Math.floor(V.boardNumbers.Packing),
            'Не совпал Packing формена');

        driver.findElement(By.xpath('//label[@ng-init="calcWorkerTotal(\'foreman\')"]')).getText().then(function (text) {
            V.boardNumbers.Payroll.foremanForCommission.total = SF.cleanPrice(text);
        });
    }
    function findTestForemanInPayroll() {
        SF.click(By.xpath('//table[@id="datatable"]//td[contains(text(),"foreman")]'));
        SF.click(By.xpath('//table[@id="datatable"]//td[contains(text(),"foreman")]'));
        SF.sleep(1);
        JS.waitForNotExist('div.busyoverlay:visible');
        SF.click(By.xpath('//table[@id="datatable"]//td[contains(text(),"Test Foreman")]'));
        SF.click(By.xpath('//table[@id="datatable"]//td[contains(text(),"Test Foreman")]'));
        SF.sleep(1);
        JS.waitForNotExist('div.busyoverlay:visible');
        SF.sleep(2);
    }
    function findSaleInPayroll(name) {
        SF.click(By.xpath('//table[@id="datatable"]//td[contains(text(),"sales")]'));
        SF.click(By.xpath('//table[@id="datatable"]//td[contains(text(),"sales")]'));
        SF.sleep(1);
        JS.waitForNotExist('div.busyoverlay:visible');
        SF.click(By.xpath('//table[@id="datatable"]//td[contains(text(),"' + name + '")]'));
        SF.click(By.xpath('//table[@id="datatable"]//td[contains(text(),"' + name + '")]'));
        SF.sleep(1);
        JS.waitForNotExist('div.busyoverlay:visible');
        SF.sleep(2);
    }
    function selectDateInPayroll(date) {

        SF.clear(By.xpath('//input[@ng-model="dateRange.from"]'));
        SF.send(By.xpath('//input[@ng-model="dateRange.from"]'), constants.monthNamesShort[date.Month] +
            ' ' + date.Day + ', ' + date.Year);
        SF.clear(By.xpath('//input[@ng-model="dateRange.to"]'));
        SF.send(By.xpath('//input[@ng-model="dateRange.to"]'), constants.monthNamesShort[date.Month] +
            ' ' + date.Day + ', ' + date.Year);
        SF.click(By.xpath('//button[@ng-click="getByDate();bDateChange=false"]'));
        SF.sleep(1);
        JS.waitForNotExist('div.busyoverlay:visible');
    }
    function CreateMovAndStorFromFrontDown() {
        SF.click (By.xpath('//a[@href="#request"]'));
        SF.sleep (2);
        SF.click (By.xpath('//label[contains(text(), "Desired Move Date:")]/following-sibling::input[1]'));
        V.request={};
        driver.wait(driver.executeScript(JSstep.Click4DaysNewCalendar).then(function(MovDateFront){
            V.request.moveDate = MovDateFront;
            console.log(V.request);
        }), config.timeout);
        SF.sleep (0.5);
        SF.click (By.xpath('//label[contains(text(), "Service Type:")]/following-sibling::select/option[2]'));
        SF.click (By.xpath('//label[contains(text(), "Desired Delivery Date:")]/following-sibling::input[1]'));
        driver.wait(driver.executeScript(JSstep.Click8DaysNewCalendar).then(function(DelDateFront){
            V.request.DelDate = DelDateFront;
            console.log(V.request.DelDate);
        }), config.timeout);
        SF.send (By.id('edit-zip-code-from'), '02136');
        SF.send (By.id('edit-zip-code-to'), '02032');
        JS.select ('#edit-size-move', 10);
        JS.select ('#edit-type-from', 2);
        JS.select ('#edit-type-to', 5);
        SF.sleep (0.5);
        JS.click ('#calculate_btn');
        SF.waitForLocated (By.xpath('//div[@class="form_block calc-form"]'));
        SF.sleep (4);
        SF.send(By.id('edit-first-name'), V.client.name);
        SF.send(By.id('edit-last-name'), V.client.fam);
        SF.sleep(0.3);
        SF.send(By.xpath('//div[@ng-if="!userLogin"]//input[@ng-model="request.primaryPhone"]'), V.client.phone);
        SF.sleep(0.3);
        SF.send(By.id('edit-additional-phone'), V.client.phone);
        SF.sleep(0.3);
        SF.send(By.xpath('//div[@ng-if="!userLogin"]//input[@ng-model="request.email"]'), V.client.email);
        SF.sleep(0.3);
        SF.send(By.id('edit-confirmemail'), V.client.email);
        SF.click(By.id('prefeefe'));
        SF.click (By.xpath('//div[@id="pref_popup"]//div[@class="select_item pre_2"]'));
        SF.select(By.xpath('//select[@ng-model="request.prefDelivery"]'), 3);
        SF.select(By.xpath('//select[@ng-model="request.poll"]'), 'Google search');
        SF.click (By.xpath('//button[@ng-click="goToSummery()"]'));
        SF.sleep(2);
        JS.waitForNotExist ('div[ng-if="loadingImg"]');
        SF.sleep(4);
    }

    function CreateOvernightDownForm(){
        SF.click (By.xpath('//a[@href="#request"]'));
        SF.sleep (2);
        SF.click (By.xpath('//label[contains(text(), "Desired Move Date:")]/following-sibling::input[1]'));
        V.request={};
        driver.wait(driver.executeScript(JSstep.Click4DaysNewCalendar).then(function(MovDateFront){
            V.request.moveDate = MovDateFront;
            console.log(V.request);
        }), config.timeout);
        SF.sleep (0.5);
        SF.click (By.xpath('//label[contains(text(), "Service Type:")]/following-sibling::select/option[6]'));
        condition.nowWeDoing = 'создаем овернайт реквест';
        SF.send (By.id('edit-zip-code-from'), '02136');
        SF.send (By.id('edit-zip-code-to'), '02032');
        JS.select ('#edit-size-move', 10);
        JS.select ('#edit-type-from', 2);
        JS.select ('#edit-type-to', 5);
        SF.sleep (0.5);
        JS.click ('#calculate_btn');
        SF.waitForLocated (By.xpath('//div[@class="form_block calc-form"]'));
        SF.sleep (4);
        SF.send(By.id('edit-first-name'), V.client.name);
        SF.send(By.id('edit-last-name'), V.client.fam);
        SF.sleep(0.3);
        SF.send(By.xpath('//div[@ng-if="!userLogin"]//input[@ng-model="request.primaryPhone"]'), V.client.phone);
        SF.sleep(0.3);
        SF.send(By.id('edit-additional-phone'), V.client.phone);
        SF.sleep(0.3);
        SF.send(By.xpath('//div[@ng-if="!userLogin"]//input[@ng-model="request.email"]'), V.client.email);
        SF.sleep(0.3);
        SF.send(By.id('edit-confirmemail'), V.client.email);
        SF.click(By.id('prefeefe'));
        SF.click (By.xpath('//div[@id="pref_popup"]//div[@class="select_item pre_2"]'));
        SF.select(By.xpath('//select[@ng-model="request.prefDelivery"]'), 3);
        SF.select(By.xpath('//select[@ng-model="request.poll"]'), 'Google search');
        SF.click (By.xpath('//button[@ng-click="goToSummery()"]'));
        SF.sleep(2);
        JS.waitForNotExist ('div[ng-if="loadingImg"]');
        SF.sleep(4);
    }

    function RememberFrontNumbersMovAndStorDown(frontNumbersDown){
        condition.nowWeDoing = 'запоминаем данные с мувинг сторадж TУ';

        driver.wait(driver.findElement(By.xpath('//div[@class="box_info from_storage storage"]//div[@ng-if="storageCalcResult.to.surcharge_fuel"]/span')).getText().then(function(text){
            frontNumbersDown.FuelTo = SF.cleanPrice (text.replace('$', ''));
        }), config.timeout);
        driver.wait(driver.findElement(By.xpath('//div[@class="box_info from_storage storage"]//div[@ng-if="storageCalcResult.to.isMinHourLessThenMaxTime"]/span')).getText().then(function(text){
            frontNumbersDown.QuoteMinTo = SF.cleanPrice(text.substring(0, text.indexOf('-')));
            frontNumbersDown.QuoteMaxTo = SF.cleanPrice(text.substring(text.indexOf('-') + 1));
        }), config.timeout);
        driver.wait(driver.findElement(By.xpath('//div[@ng-if="storageCalcResult.to.travelTime"]/span')).getText().then(function (text) {
            frontNumbersDown.TravelTimeTo = SF.cleanPrice(text.substring(text.indexOf('min')));
        }), config.timeout);
        driver.wait(driver.findElement(By.xpath('//div[@class="box_info from_storage storage"]//div[4]/span')).getText().then(function (text) {
            frontNumbersDown.CrewTo = text.replace('Movers', '');
        }), config.timeout);
        driver.wait(driver.findElement(By.xpath('//div[@class="box_info from_storage storage"]//div[@class="moving-date rate"]/span')).getText().then(function (text) {
            frontNumbersDown.RateTo = text.indexOf('$', 4) == -1 ?
                SF.cleanPrice(text) :
                SF.cleanPrice(text.substring(text.indexOf('$', 4)));
        }), config.timeout);
        driver.wait(driver.findElement(By.xpath('//span[@ng-if="storageCalcResult.to.isMinHourLessThenMaxTime"]')).getText().then(function (text) {
            let textMin = text.substring(0, text.indexOf('-'));
            let textMax = text.substring(text.indexOf('-') + 1);
            let hoursMin = textMin.indexOf('Hrs') == -1 ? 0 : SF.cleanPrice(textMin.substring(0, textMin.indexOf('Hrs')));
            let minutesMin = textMin.indexOf('Min') == -1 ? 0 : SF.cleanPrice(textMin.substring((textMin.indexOf('Hrs') + 1), textMin.indexOf('Min')));
            frontNumbersDown.JobTimeMinTo = hoursMin * 60 + minutesMin;
            let hoursMax = textMax.indexOf('Hrs') == -1 ? 0 : SF.cleanPrice(textMax.substring(0, textMax.indexOf('Hrs')));
            let minutesMax = textMax.indexOf('Min') == -1 ? 0 : SF.cleanPrice(textMax.substring((textMax.indexOf('Hrs') + 1), textMax.indexOf('Min')));
            frontNumbersDown.JobTimeMaxTo = hoursMax * 60 + minutesMax;
        }), config.timeout);

        condition.nowWeDoing = 'запоминаем данные с мувинг сторадж FROM';

        driver.wait(driver.findElement(By.xpath('//div[@class="box_info to_storage storage"]//div[@ng-if="storageCalcResult.from.surcharge_fuel"]/span')).getText().then(function(text){
            frontNumbersDown.FuelFrom = SF.cleanPrice (text.replace('$', ''));
        }), config.timeout);
        driver.wait(driver.findElement(By.xpath('//div[@class="box_info to_storage storage"]//div[@ng-if="storageCalcResult.from.isMinHourLessThenMaxTime"]/span')).getText().then(function(text){
            frontNumbersDown.QuoteMinFrom = SF.cleanPrice(text.substring(0, text.indexOf('-')));
            frontNumbersDown.QuoteMaxFrom = SF.cleanPrice(text.substring(text.indexOf('-') + 1));
        }), config.timeout);
        driver.wait(driver.findElement(By.xpath('//div[@ng-if="storageCalcResult.from.travelTime"]/span')).getText().then(function (text) {
            frontNumbersDown.TravelTimeFrom = SF.cleanPrice(text.substring(text.indexOf('min')));
        }), config.timeout);
        driver.wait(driver.findElement(By.xpath('//div[@class="box_info to_storage storage"]//div[4]/span')).getText().then(function (text) {
            frontNumbersDown.CrewFrom = text.replace('Movers', '');
        }), config.timeout);
        driver.wait(driver.findElement(By.xpath('//div[@class="box_info to_storage storage"]//div[5]/span')).getText().then(function (text) {
            frontNumbersDown.RateFrom = text.indexOf('$', 4) == -1 ?
                SF.cleanPrice(text) :
                SF.cleanPrice(text.substring(text.indexOf('$', 4)));
        }), config.timeout);
        driver.wait(driver.findElement(By.xpath('//span[@ng-if="storageCalcResult.from.isMinHourLessThenMaxTime"]')).getText().then(function (text) {
            let textMin = text.substring(0, text.indexOf('-'));
            let textMax = text.substring(text.indexOf('-') + 1);
            let hoursMin = textMin.indexOf('Hrs') == -1 ? 0 : SF.cleanPrice(textMin.substring(0, textMin.indexOf('Hrs')));
            let minutesMin = textMin.indexOf('Min') == -1 ? 0 : SF.cleanPrice(textMin.substring((textMin.indexOf('Hrs') + 1), textMin.indexOf('Min')));
            frontNumbersDown.JobTimeMinFrom = hoursMin * 60 + minutesMin;
            let hoursMax = textMax.indexOf('Hrs') == -1 ? 0 : SF.cleanPrice(textMax.substring(0, textMax.indexOf('Hrs')));
            let minutesMax = textMax.indexOf('Min') == -1 ? 0 : SF.cleanPrice(textMax.substring((textMax.indexOf('Hrs') + 1), textMax.indexOf('Min')));
            frontNumbersDown.JobTimeMaxFrom = hoursMax * 60 + minutesMax;
        }), config.timeout);

        condition.nowWeDoing = 'запоминаем данные с мувинг сторадж Estimated Labor и Estimated Monthly Storage';

        driver.wait(driver.findElement(By.xpath('//div[@class="box_info total storage"]//div/span')).getText().then(function(text){
            frontNumbersDown.EstimatedLaborMin = SF.cleanPrice(text.substring(0, text.indexOf('-')));
            frontNumbersDown.EstimatedLaborMax = SF.cleanPrice(text.substring(text.indexOf('-') + 1));
        }), config.timeout);
        driver.wait(driver.findElement(By.xpath('//div[@ng-if="!overnightMove"]/span')).getText().then(function(text){
            frontNumbersDown.MonthlyStorageMin = SF.cleanPrice(text.substring(0, text.indexOf('-')));
            frontNumbersDown.MonthlyStorageMax = SF.cleanPrice(text.substring(text.indexOf('-') + 1));
        }), config.timeout);
        SF.sleep(1);
        console.log(frontNumbersDown);
    }
    function CreateLoadingHelpDownForm(){
        SF.click (By.xpath('//a[@href="#request"]'));
        SF.sleep (2);
        SF.click (By.xpath('//label[contains(text(), "Desired Move Date:")]/following-sibling::input[1]'));
        V.request={};
        driver.wait(driver.executeScript(JSstep.Click4DaysNewCalendar).then(function(MovDateFront){
            V.request.moveDate = MovDateFront;
            console.log(V.request);
        }), config.timeout);
        SF.sleep (0.5);
        SF.click (By.xpath('//label[contains(text(), "Service Type:")]/following-sibling::select/option[3]'));
        condition.nowWeDoing = 'создаем Loading реквест';

        SF.send (By.id('edit-zip-code-from'), '02032');
        JS.select ('#edit-size-move', 10);
        JS.select ('#edit-type-from', 2);
        JS.select ('#edit-type-to', 5);
        SF.sleep (0.5);
        JS.click ('#calculate_btn');
        SF.waitForLocated (By.xpath('//div[@class="form_block calc-form"]'));
        SF.sleep (4);
        SF.send(By.id('edit-first-name'), V.client.name);
        SF.send(By.id('edit-last-name'), V.client.fam);

        SF.sleep(0.3);
        SF.send(By.xpath('//div[@ng-if="!userLogin"]//input[@ng-model="request.primaryPhone"]'), V.client.phone);
        SF.sleep(0.3);
        SF.send(By.id('edit-additional-phone'), V.client.phone);
        SF.sleep(0.3);
        SF.send(By.xpath('//div[@ng-if="!userLogin"]//input[@ng-model="request.email"]'), V.client.email);
        SF.sleep(0.3);
        SF.send(By.id('edit-confirmemail'), V.client.email);
        SF.click(By.id('prefeefe'));
        SF.click (By.xpath('//div[@id="pref_popup"]//div[@class="select_item pre_2"]'));
        SF.select(By.xpath('//select[@ng-model="request.poll"]'), 'Google search');
        SF.click (By.xpath('//button[@ng-click="goToSummery()"]'));
        SF.sleep(2);
        JS.waitForNotExist ('div[ng-if="loadingImg"]');
        SF.sleep(4);
    }
    function CreateUnloadingHelpDownForm(){
        JS.scroll('move-calculator');
        SF.click (By.xpath('//a[@href="#request"]'));
        SF.sleep (2);
        SF.click (By.xpath('//label[contains(text(), "Desired Move Date:")]/following-sibling::input[1]'));
        V.request={};
        driver.wait(driver.executeScript(JSstep.Click4DaysNewCalendar).then(function(MovDateFront){
            V.request.moveDate = MovDateFront;
            console.log(V.request);
        }), config.timeout);
        SF.sleep (0.5);
        SF.click (By.xpath('//label[contains(text(), "Service Type:")]/following-sibling::select/option[4]'));
        condition.nowWeDoing = 'создаем Unloading реквест';

        SF.send (By.id('edit-zip-code-to'), '02032');
        JS.select ('#edit-size-move', 10);
        JS.select ('#edit-type-from', 2);
        JS.select ('#edit-type-to', 5);
        SF.sleep (0.5);
        JS.click ('#calculate_btn');
        SF.waitForLocated (By.xpath('//div[@class="form_block calc-form"]'));
        SF.sleep (4);
        SF.send(By.id('edit-first-name'), V.client.name);
        SF.send(By.id('edit-last-name'), V.client.fam);

        SF.sleep(0.3);
        SF.send(By.xpath('//div[@ng-if="!userLogin"]//input[@ng-model="request.primaryPhone"]'), V.client.phone);
        SF.sleep(0.3);
        SF.send(By.id('edit-additional-phone'), V.client.phone);
        SF.sleep(0.3);
        SF.send(By.xpath('//div[@ng-if="!userLogin"]//input[@ng-model="request.email"]'), V.client.email);
        SF.sleep(0.3);
        SF.send(By.id('edit-confirmemail'), V.client.email);
        SF.click(By.id('prefeefe'));
        SF.click (By.xpath('//div[@id="pref_popup"]//div[@class="select_item pre_2"]'));
        SF.select(By.xpath('//select[@ng-model="request.poll"]'), 'Google search');
        SF.click (By.xpath('//button[@ng-click="goToSummery()"]'));
        SF.sleep(2);
        JS.waitForNotExist ('div[ng-if="loadingImg"]');
        SF.sleep(4);
    }
    function addToCleanerJob(Id){
        if (V.cleanerJob==undefined) {V.cleanerJob=[];}
        V.cleanerJob.push(Id);
    }
    function gotoSetingsLD() {
        SF.click (By.xpath('//button[@ng-click="toggleLeft()"]'));
        SF.waitForVisible (By.xpath('//button[@ng-click="toggleLeft()"]'));
        SF.click (By.xpath('//a[@ng-click="vm.goToPage(\'settings.general\', \'\')"]'));
        SF.waitForVisible (By.xpath('//a[@ng-click="vm.goToPage(\'settings.general\', \'\')"]'));
        SF.click(By.xpath('//a[@ui-sref="settings.longdistance"]'));
        SF.waitForVisible (By.xpath('//a[@ui-sref="settings.longdistance"]'));
        SF.sleep (4);
    }
    function deletePendingRequest() {
        SF.select(By.xpath('//select[@id="edit-status"]'), 14);
        SF.click(By.xpath('//button[@ng-click="UpdateRequest()"]'));
        JS.waitForExist('button[ng-click="update(request)"]:visible');
        SF.click(By.xpath('//button[@ng-click="update(request)"]'));
        JS.waitForNotExist("div.busyoverlay:visible");
        closeEditRequest();
        SF.sleep(2);
    }
    return {
        FullSmallCalcAsLocal: FullSmallCalcAsLocal,
        FullSmallCalcAsUnloading: FullSmallCalcAsUnloading,
        FullSmallCalcAsLoading: FullSmallCalcAsLoading,
        FullSmallCalcAsMovingWithStorage: FullSmallCalcAsMovingWithStorage,
        FullSmallCalcAsLD: FullSmallCalcAsLD,
        AccountLocalEnterAddress: AccountLocalEnterAddress,
        AccountLocalAddInventory: AccountLocalAddInventory,
        AccountLocalDetails: AccountLocalDetails,
        AccountUnloadingEnterAddress:AccountUnloadingEnterAddress,
        AccountLoadingEnterAddress: AccountLoadingEnterAddress,
        AccountToStorageEnterAddress: AccountToStorageEnterAddress,
        AccountFromStorageEnterAddress: AccountFromStorageEnterAddress,
        RememberAccountNumbers: RememberAccountNumbers,
        LogoutFromAccount: LogoutFromAccount,
        LogoutFromBoardAdmin: LogoutFromBoardAdmin,
        LogoutFromBoardForeman: LogoutFromBoardForeman,
        LoginToBoardAsAdmin: LoginToBoardAsAdmin,
        LoginToBoardAsForeman: LoginToBoardAsForeman,
        LoginToBoardAsCustom: LoginToBoardAsCustom,
        LoginToAccountAsClient: LoginToAccountAsClient,
        OpenRequest: OpenRequest,
        CreateMovAndStorFromFrontDown: CreateMovAndStorFromFrontDown,
        CreateUnloadingHelpDownForm: CreateUnloadingHelpDownForm,
        CreateLoadingHelpDownForm: CreateLoadingHelpDownForm,
        CreateOvernightDownForm: CreateOvernightDownForm,
        CreateLocalMovingFromBoard: CreateLocalMovingFromBoard,
        CreateMovAndStorFromBoard: CreateMovAndStorFromBoard,
        CreateLoadingHelpFromBoard: CreateLoadingHelpFromBoard,
        RememberDigitsRequestBoard_Up: RememberDigitsRequestBoard_Up,
        RememberDigitsRequestBoard_Down: RememberDigitsRequestBoard_Down,
        RememberDigitsRequestBoard: RememberDigitsRequestBoard,
        RememberFrontNumbersMovAndStorDown: RememberFrontNumbersMovAndStorDown,
        Validation_Compare_Account_Admin: Validation_Compare_Account_Admin,
        Validation_Compare_Account_Front_MovStorTo: Validation_Compare_Account_Front_MovStorTo,
        Validation_Compare_Account_Front_MovStorFrom: Validation_Compare_Account_Front_MovStorFrom,
        SetManager: SetManager,
        SetClientPasswd: SetClientPasswd,
        FillCardPayModal: FillCardPayModal,
        MakeSignJS: MakeSignJS,
        ConfirmRequestInAccount_WithReservation: ConfirmRequestInAccount_WithReservation,
        ConfirmRequestInAccount_NoReservation: ConfirmRequestInAccount_NoReservation,
//Permissions for Sales --- start
        PermissionsClear: PermissionsClear,
        PermissionCanSeeOtherLeads: PermissionCanSeeOtherLeads,
        PermissionCanSearchOtherLeads: PermissionCanSearchOtherLeads,
        PermissionCanEditOtherLeads: PermissionCanEditOtherLeads,
        PermissionCanSeeUnsignedLeads: PermissionCanSeeUnsignedLeads,
        PermissionCanSignedSales: PermissionCanSignedSales,
//Permissions for Sales --- end
        closeEditRequest: closeEditRequest,
        SelectRequestDispatch: SelectRequestDispatch,
        OpenRequestDispatch: OpenRequestDispatch,
        selectCrew: selectCrew,
        MakeSignInContract: MakeSignInContract,
        MakeSignInInventory: MakeSignInInventory,
        MakeSignInRental: MakeSignInRental,
        payRentalInventory: payRentalInventory,
        RememberDateFromRequest: RememberDateFromRequest,
        findDayInLocalDispatch: findDayInLocalDispatch,
        RememberAndValidatePayroll_In_EditRequest: RememberAndValidatePayroll_In_EditRequest,
        findTestForemanInPayroll: findTestForemanInPayroll,
        findSaleInPayroll: findSaleInPayroll,
        selectDateInPayroll: selectDateInPayroll,
        addToCleanerJob: addToCleanerJob,
        gotoSetingsLD: gotoSetingsLD,
        deletePendingRequest: deletePendingRequest
    };
};