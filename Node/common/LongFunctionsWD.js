module.exports = function (SF, JS, MF, JSstep, VD, V, By, until,FileDetector, system, condition, config,constants) {
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
        SF.send(By.xpath('//ultrasmall-form//input[@ng-model="request.first_name"]'), client.name);
        SF.send(By.xpath('//ultrasmall-form//input[@ng-model="request.last_name"]'), client.fam);
        SF.send(By.xpath('//ultrasmall-form//input[@ng-model="request.email"]'), client.email);
        SF.send(By.xpath('//ultrasmall-form//input[@ng-model="request.primaryPhone"]'), client.phone);
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
        JS.waitForExist('ultrasmall-form #congrats_menu[style="right: 0px;"] a:contains("Proceed To View Your Quote")');
        JS.link('ultrasmall-form a:contains("Proceed To View Your Quote")');
    }
    function FullSmallCalcAsFlateRate(client) {
        SF.sleep (4);
        SF.send(By.xpath('//ultrasmall-form//input[@ng-model="request.zipFrom"]'), "02461");
        SF.send(By.xpath('//ultrasmall-form//input[@ng-model="request.zipTo"]'), "07304");
        driver.wait(driver.executeScript("$('ultrasmall-form input[ng-model=\"request.moveDate\"]').focus();"));
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
        JS.waitForExist('ultrasmall-form #congrats_menu[style="right: 0px;"] a:contains("Proceed To View Your Quote")');
        JS.link('ultrasmall-form a:contains("Proceed To View Your Quote")');
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
        JS.waitForExist('ultrasmall-form #congrats_menu[style="right: 0px;"] a:contains("Proceed To View Your Quote")');
        JS.link('ultrasmall-form a:contains("Proceed To View Your Quote")');
    }
    function FullSmallCalcAsMovingWithStorage(client){
        SF.sleep(3);
        JS.click("input#extra-service");
        JS.select('select#edit-service',2);
        SF.send(By.xpath('//ultrasmall-form//input[@ng-model="request.zipFrom"]'), "02032");
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
        SF.click(By.xpath('//input[@type="field_moving_from"][@placeholder="From Address"]'));
        SF.send(By.xpath('//input[@type="field_moving_from"][@placeholder="From Address"]'), 'Otkuda edem');
        SF.sleep(2);
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
        SF.click(By.xpath('//input[@type="field_moving_to"][@placeholder="To Address"]'));
        SF.send(By.xpath('//input[@type="field_moving_to"][@placeholder="To Address"]'), 'Kuda edem');
        SF.sleep(2);
        SF.click(By.xpath('//button[@ng-click="update(client)"]'));
        JS.waitForExist('button.confirm:contains("Update")');
        SF.sleep(2);
        SF.click(By.xpath('//button[@class="confirm"][contains(text(),"Update")]'));
        JS.waitForExist('button.confirm:contains("OK")');
        SF.sleep(2);
        SF.click(By.xpath('//button[@class="confirm"][contains(text(),"OK")]'));
    }
    function AccountFlatRateAddInventory() {
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
        SF.click (By.xpath('//button[@ng-click="vm.saveListInventories()"]/span[contains(text(), "Next To Overview")]'));
        SF.sleep (3);
    }
    function AccountLocalAddInventory(accountNumbers) {
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
        if (accountNumbers != undefined) {
            driver.wait(driver.executeScript('return $(\'div.inventory__toolbar-item:contains("Total Estimated Cubic Feet:")\').text()').then(
                function (text) {
                    accountNumbers.InventoryCbf = SF.cleanPrice(text);
                    console.log("cbf = " + accountNumbers.InventoryCbf);
                }
            ),config.timeout);
        }
        JS.click('button#save-inventory.inventory__button');
        JS.waitForExist('button.confirm:contains("OK")');
        SF.sleep(2);
        SF.click(By.xpath('//button[@class="confirm"][contains(text(),"OK")]'));
        SF.sleep(2);
    }
    function AccountLocalAddAdditionalInventory() {
        JS.click('a[ng-click=\\"vm.select(tab)\\"]:contains(\\"Inventory\\")');
        JS.waitForExist('div[ng-repeat="filter in filters"]');
        SF.sleep(5);
        SF.click(By.xpath('(//button[@ng-click="changeValue(1, item)"])[1]'));
        SF.sleep(1);
        SF.click(By.xpath('(//button[@ng-click="changeValue(1, item)"])[1]'));
        SF.sleep(1);
        SF.click(By.xpath('(//button[@ng-click="changeValue(1, item)"])[1]'));
        SF.sleep(1);
        SF.click(By.xpath('(//button[@ng-click="changeValue(1, item)"])[1]'));
        SF.sleep(1);
        SF.click(By.xpath('(//button[@ng-click="changeValue(1, item)"])[2]'));
        SF.sleep(1);
        SF.click(By.xpath('(//button[@ng-click="changeValue(1, item)"])[2]'));
        SF.sleep(1);
        SF.click(By.xpath('(//button[@ng-click="changeValue(1, item)"])[2]'));
        SF.sleep(1);
        SF.click(By.xpath('(//button[@ng-click="changeValue(1, item)"])[2]'));
        SF.sleep(1);
        SF.click(By.xpath('(//button[@ng-click="changeValue(1, item)"])[2]'));
        SF.sleep(1);
        SF.click(By.xpath('(//button[@ng-click="changeValue(1, item)"])[2]'));
        SF.sleep(1);
        SF.click(By.xpath('(//button[@ng-click="changeValue(1, item)"])[2]'));
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
        MF.WaitWhileBusy ();
        SF.click(By.xpath('//button[@ng-click="saveDetails()"]'));
        driver.executeScript("$('body').scrollTop(0);");
        SF.sleep(5);
    }
    function AccountLoadingDetails() {
        JS.click('a[ng-click=\\"vm.select(tab)\\"]:contains(\\"Details\\")');
        JS.waitForNotExist('div.busyoverlay:visible');
        SF.sleep(5);
        JS.waitForNotExist('div.busyoverlay:visible');
        SF.sleep(1);
        SF.select(By.xpath('//select[@id="current_door_to_parking"]'), 60);
        SF.select(By.xpath('//select[@id="current_parking_permit"]'), "PDW");
        SF.sleep(1);
        SF.click(By.xpath('//button[@ng-click="saveDetails()"]'));
        driver.executeScript("$('body').scrollTop(0);");
        SF.sleep(5);
    }
    function AccountUnLoadingDetails() {
        JS.click('a[ng-click=\\"vm.select(tab)\\"]:contains(\\"Details\\")');
        JS.waitForNotExist('div.busyoverlay:visible');
        SF.sleep(5);
        JS.waitForNotExist('div.busyoverlay:visible');
        SF.sleep(1);
        SF.select(By.xpath('//select[@id="new_door_to_parking"]'), 60);
        SF.select(By.xpath('//select[@id="new_parking_permit"]'), "PDW");
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
        driver.wait(driver.findElement(By.xpath('//div[contains(text(),"Move Size")]/following-sibling::div[1]')).getText().then(
            function(text){
                accountNumbers.cbf = SF.cleanPrice(text.substring(text.indexOf('Inventory')+9, text.indexOf('c.f.')));
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
        SF.sleep (3);
    }
    function LoginToBoardAs_Roma4ke_Admin() {
        SF.waitForVisible(By.xpath('//div[@ng-controller="LoginController"]//span[contains(text(),"Move")]'));
        SF.send(By.xpath('//input[@id="email"]'), 'roma4ke');
        SF.send(By.xpath('//input[@id="password"]'), 'root');
        SF.click(By.xpath('//button[@type="submit"]'));
        SF.waitForVisible(By.xpath('//td[@ng-click="requestEditModal(request)"]'));
        SF.sleep (3);
    }
    function LoginToBoardAsForeman() {
        SF.waitForVisible(By.xpath('//div[@ng-controller="LoginController"]//span[contains(text(),"Move")]'));
        SF.send(By.xpath('//input[@id="email"]'), 'TestForeman');
        SF.send(By.xpath('//input[@id="password"]'), '123');
        SF.click(By.xpath('//button[@type="submit"]'));
        SF.waitForVisible(By.xpath('//tr[@ng-click="vm.editReservation(request.nid)"]'));
    }
    function LoginToBoardAsForemanDeliveryFlatRate() {
        SF.waitForVisible(By.xpath('//div[@ng-controller="LoginController"]//span[contains(text(),"Move")]'));
        SF.send(By.xpath('//input[@id="email"]'), 'FlatRateForeman');
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
        MF.WaitWhileBusy ();
    }
    function LoginToBoardAsCustomForeman(login, passwd) {
        SF.waitForVisible(By.xpath('//div[@ng-controller="LoginController"]//span[contains(text(),"Move")]'));
        SF.send(By.xpath('//input[@id="email"]'), login);
        SF.send(By.xpath('//input[@id="password"]'), passwd);
        SF.click(By.xpath('//button[@type="submit"]'));
        SF.waitForVisible(By.xpath('//tr[@ng-click="vm.editReservation(request.nid)"]'));
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
        MF.WaitWhileBusy ();
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
        MF.WaitWhileBusy();
        SF.sleep(2);
        MF.WaitWhileBusy();
    }
    function OpenRequestFlatRate(request) {
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
        SF.waitForVisible(By.xpath('//a[@ng-click="addOption()"]'));
        JS.waitForNotExist('div.busyoverlay:visible');
        SF.sleep(2);
        JS.waitForNotExist('div.busyoverlay:visible');
    }
    function CreateLocalMovingFromBoard(client) {
        JS.waitForNotExist('div.toast-success');
        JS.waitForNotExist('div.busyoverlay:visible');
        SF.click(By.linkText('Create Request'));
        SF.sleep(2);
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
        SF.sleep(4);
        SF.click(By.xpath('//button[@ng-click="Calculate()"]'));
        SF.sleep(1);
        JS.waitForNotExist('div.busyoverlay:visible');
        SF.sleep(1);
        SF.click(By.xpath('//button[@ng-click="step2 = false;step3 = true;"]'));
        SF.sleep(2);
        SF.send(By.xpath('//div[@class="step3"]//input[@ng-model="editrequest.account.fields.field_user_first_name"]'), client.name);
        SF.send(By.xpath('//div[@class="step3"]//input[@ng-model="editrequest.account.fields.field_user_last_name"]'), client.fam);
        SF.send(By.xpath('//div[@class="step3"]//input[@ng-model="editrequest.account.mail"]'), client.email);
        SF.send(By.xpath('//div[@class="step3"]//input[@ng-model="editrequest.account.fields.field_primary_phone"]'), client.phone);
        SF.click(By.xpath('//button[@ng-click="create()"]'));
        SF.waitForVisible(By.xpath('//div[@ng-click="chooseTruck(tid)"]'));
        SF.sleep(4);
        JS.waitForNotExist('div.busyoverlay:visible');
        console.log('создали реквест');
    }
    function CreateFlatRateFromBoard(client) {
        JS.waitForNotExist('div.toast-success');
        JS.waitForNotExist('div.busyoverlay:visible');
        SF.click(By.linkText('Create Request'));
        SF.sleep(2);
        SF.click(By.xpath('//div[@class="step1"]//select[@name="move_service_type"]/option[@value="number:5"]'));
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
        SF.send(By.id("edit-zip-code-from"), "02461");
        SF.send(By.id("edit-zip-code-to"), "07304");
        SF.sleep(4);
        SF.click(By.xpath('//button[@ng-click="Calculate()"]'));
        SF.sleep(1);
        JS.waitForNotExist('div.busyoverlay:visible');
        SF.sleep(1);
        SF.click(By.xpath('//button[@ng-click="step2 = false;step3 = true;"]'));
        SF.sleep(2);
        SF.send(By.xpath('//div[@class="step3"]//input[@ng-model="editrequest.account.fields.field_user_first_name"]'), client.name);
        SF.send(By.xpath('//div[@class="step3"]//input[@ng-model="editrequest.account.fields.field_user_last_name"]'), client.fam);
        SF.send(By.xpath('//div[@class="step3"]//input[@ng-model="editrequest.account.mail"]'), client.email);
        SF.send(By.xpath('//div[@class="step3"]//input[@ng-model="editrequest.account.fields.field_primary_phone"]'), client.phone);
        SF.click(By.xpath('//button[@ng-click="create()"]'));
        SF.waitForVisible(By.xpath('//div[@ng-click="chooseTruck(tid)"]'));
        SF.sleep(4);
        JS.waitForNotExist('div.busyoverlay:visible');
        console.log('создали реквест');
    }
    function CreateMovAndStorFromBoard(client, period) {
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
        if (period==undefined) {
            driver.wait(driver.executeScript(JSstep.Click8DaysCalendar).then(function (DelDate) {
                V.request.DeliveryDate = DelDate;
                console.log(V.request.DeliveryDate);
            }), config.timeout);
        } else {
            driver.wait(driver.executeScript(JSstep.ClickCustomDaysCalendar(period)).then(function (DelDate) {
                V.request.DeliveryDate = DelDate;
                console.log(V.request.DeliveryDate);
            }), config.timeout);
        }

        SF.sleep(0.5);
        SF.click(By.xpath('//ul[@class="chosen-choices"]'));
        SF.click(By.xpath('//ul[@class="chosen-results"]/li[@data-option-array-index="1"]'));
        SF.send(By.id("edit-zip-code-from"), "02032");
        SF.send(By.id("edit-zip-code-to"), "02136");
        SF.sleep(4);
        SF.click(By.xpath('//button[@ng-click="Calculate()"]'));
        MF.WaitWhileBusy();
        SF.click(By.xpath('//button[@ng-click="step2 = false;step3 = true;"]'));
        MF.WaitWhileBusy();
        SF.send(By.xpath('//div[@class="step3"]//input[@ng-model="editrequest.account.fields.field_user_first_name"]'), client.name);
        SF.send(By.xpath('//div[@class="step3"]//input[@ng-model="editrequest.account.fields.field_user_last_name"]'), client.fam);
        SF.send(By.xpath('//div[@class="step3"]//input[@ng-model="editrequest.account.mail"]'), client.email);
        SF.send(By.xpath('//div[@class="step3"]//input[@ng-model="editrequest.account.fields.field_primary_phone"]'), client.phone);
        SF.click(By.xpath('//button[@ng-click="create()"]'));
        SF.waitForVisible(By.xpath('//div[@ng-click="chooseTruck(tid)"]'));
        SF.sleep(4);
        console.log('создали реквест');
    }
    function CreateLongDistanceFromBoard(client) {
        SF.click(By.linkText('Create Request'));
        SF.sleep(3);
        SF.click(By.xpath('//div[@class="step1"]//select[@name="move_service_type"]/option[@value="number:7"]'));
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
        SF.send(By.id("edit-zip-code-to"), "90001");
        SF.sleep(4);
        SF.click(By.xpath('//button[@ng-click="Calculate()"]'));
        SF.sleep(1);
        MF.WaitWhileBusy ();
        SF.sleep(1);
        SF.click(By.xpath('//button[@ng-click="step2 = false;step3 = true;"]'));
        SF.sleep(2);
        SF.send(By.xpath('//div[@class="step3"]//input[@ng-model="editrequest.account.fields.field_user_first_name"]'), client.name);
        SF.send(By.xpath('//div[@class="step3"]//input[@ng-model="editrequest.account.fields.field_user_last_name"]'), client.fam);
        SF.send(By.xpath('//div[@class="step3"]//input[@ng-model="editrequest.account.mail"]'), client.email);
        SF.send(By.xpath('//div[@class="step3"]//input[@ng-model="editrequest.account.fields.field_primary_phone"]'), client.phone);
        SF.click(By.xpath('//button[@ng-click="create()"]'));
        SF.waitForVisible(By.xpath('//div[@ng-click="chooseTruck(tid)"]'));
        SF.sleep(2);
        MF.WaitWhileBusy ();
        console.log('создали реквест');
    }
    function CreateLoadingHelpFromBoard(client) {
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
        MF.WaitWhileBusy ();
        SF.click(By.xpath('//button[@ng-click="step2 = false;step3 = true;"]'));
        SF.send(By.xpath('//div[@class="step3"]//input[@ng-model="editrequest.account.fields.field_user_first_name"]'), client.name);
        SF.send(By.xpath('//div[@class="step3"]//input[@ng-model="editrequest.account.fields.field_user_last_name"]'), client.fam);
        SF.send(By.xpath('//div[@class="step3"]//input[@ng-model="editrequest.account.mail"]'), client.email);
        SF.send(By.xpath('//div[@class="step3"]//input[@ng-model="editrequest.account.fields.field_primary_phone"]'), client.phone);
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
        driver.wait(driver.findElements(By.xpath('//input[@ng-model="request.minimum_time.value"]')).then(function(elements){
            if (elements.length>0) {
                elements[0].getAttribute('value').then(function (value) {
                    boardNumbers.LaborTimeMin = SF.cleanPrice(value.substring(0, value.indexOf(':'))) * 60
                        + SF.cleanPrice(value.substring(value.indexOf(':')));
                });
            } else {
                boardNumbers.LaborTimeMin = 0;
            }
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
        MF.EditRequest_RememberCbf(boardNumbers);
        driver.wait(driver.findElements(By.xpath('//input[@ng-model="request.rate.value"]')).then(function(elements){
            if (elements.length>0) {
                elements[0].getAttribute('value').then(function (value) {
                    boardNumbers.HourlyRate = SF.cleanPrice(value);
                });
            } else {
                boardNumbers.HourlyRate = 0;
            }
        }),config.timeout);
        driver.wait(driver.findElement(By.xpath('//label[contains(text(),"Trucks:")]/following-sibling::div[1]')).getText().then(function (text) {
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
    function Validation_Compare_CalcLocalMove_Admin(LocalMoveAdminCalc, boardNumbers) {
        VD.IWant(VD.VToEqual, LocalMoveAdminCalc.CrewSize, boardNumbers.CrewSize, 'не совпали CrewSize калькулятора и борда');
        VD.IWant(VD.VToEqual, LocalMoveAdminCalc.HourlyRate, boardNumbers.HourlyRate, 'не совпали HourlyRate калькулятора и борда');
        VD.IWant(VD.VToEqual, LocalMoveAdminCalc.WorkTimeMin, boardNumbers.LaborTimeMin, 'не совпали LaborTimeMin калькулятора и борда');
        VD.IWant(VD.VToEqual, LocalMoveAdminCalc.WorkTimeMax, boardNumbers.LaborTimeMax, 'не совпали LaborTimeMax калькулятора и борда');
        VD.IWant(VD.VToEqual, LocalMoveAdminCalc.TravelTime, boardNumbers.TravelTime, 'не совпали TravelTime калькулятора и борда');
        VD.IWant(VD.VToEqual, LocalMoveAdminCalc.QuoteMin, boardNumbers.QuoteMin, 'не совпали QuoteMin калькулятора и борда');
        VD.IWant(VD.VToEqual, LocalMoveAdminCalc.QuoteMax, boardNumbers.QuoteMax, 'не совпали QuoteMax калькулятора и борда');
        VD.IWant(VD.VToEqual, LocalMoveAdminCalc.Trucks, boardNumbers.Trucks, 'не совпали Trucks калькулятора и борда');
        VD.IWant(VD.VToEqual, LocalMoveAdminCalc.TotalMin, boardNumbers.TotalMin, 'не совпали TotalMin калькулятора и борда');
        VD.IWant(VD.VToEqual, LocalMoveAdminCalc.TotalMax, boardNumbers.TotalMax, 'не совпали TotalMax калькулятора и борда');
        VD.IWant(VD.VToEqual, LocalMoveAdminCalc.Fuel, boardNumbers.Fuel, 'не совпали Fuel калькулятора и борда');
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
        SF.click(By.xpath('//button[contains(text(),"Assign sales person")]'));
        SF.click(By.xpath('//a[@ng-click="setManager(manager.uid)"][contains(text(),"' + name + '")]'));
        SF.sleep(1);
        SF.click(By.xpath('//button[@class="confirm"][contains(text(),"Confirm")]'));
        JS.waitForExist('div.toast-success:visible');
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
    function InvoiceOnlinePayment() {
        JS.waitForExist('input[ng-model="payment.card_num"]');
        SF.sleep(1);
        SF.send(By.xpath('//input[@ng-model="payment.lastName"]'), "Second Name");
        SF.send(By.xpath('//input[@ng-model="payment.card_num"]'), 4111111111111111);
        SF.send(By.xpath('//input[@ng-model="payment.exp_month"]'), 11);
        SF.send(By.xpath('//input[@ng-model="payment.exp_year"]'), 20);
        SF.send(By.xpath('//input[@ng-model="secure.cvc"]'), 323);
        SF.sleep(1);
        SF.click(By.xpath('//input[@ng-click="applyPayment()"]'));
    }
    function FillCardPayModalBuyCoupon() {
        JS.waitForExist('input[ng-model="payment.card_num"]');
        SF.sleep(1);
        SF.send(By.xpath('//input[@ng-model="payment.card_num"]'), 4111111111111111);
        SF.send(By.xpath('//input[@ng-model="payment.exp_month"]'), 11);
        SF.send(By.xpath('//input[@ng-model="payment.exp_year"]'), 20);
        SF.send(By.xpath('//input[@ng-model="secure.cvc"]'), 323);
        SF.send(By.xpath('//input[@ng-model="payment.billing_zip"]'), '02032');
        SF.sleep(2);
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
    function ConfirmRequestInAccount_WithReservationWithAdress() {
        SF.click (By.xpath('//div[@class="field-status notconfirmed ng-scope"]/a'));
        SF.click (By.xpath('//i[@class="fa fa-angle-down arrow-down"]'));
        SF.sleep (0.5);
        SF.click (By.id('terms'));
        SF.click (By.id('cancel_policy'));
        SF.click (By.id('paybutton'));
        SF.waitForVisible (By.xpath('//div[@class="sweet-alert showSweetAlert visible"]'));
        SF.click (By.xpath('//button[@class="confirm"]'));
        SF.waitForVisible (By.xpath('//div[@class="modal-body form-horizontal"]'));
        SF.send (By.id('edit-moving-from'), 'otkuda edem');
        SF.send (By.id('edit-moving-from-apt'), 324535);
        SF.send (By.xpath('//input[@ng-model="request.field_moving_to.thoroughfare"]'), 'kuda edem');
        SF.send (By.xpath('//input[@ng-value="request.apt_to.value"]'), 324535);
        SF.click (By.xpath('//button[@ng-click="update(client)"]'));
        SF.waitForVisible (By.xpath('//div[@class="sweet-alert showSweetAlert visible"]'));
        SF.click (By.xpath('//button[@class="confirm"]'));
        SF.waitForVisible (By.xpath('//div[@class="sweet-alert showSweetAlert visible"]'));
        SF.click (By.xpath('//button[@class="confirm"]'));
        SF.waitForVisible(By.xpath('//canvas[@id="signatureCanvasReserv"]'));
        MakeSignJS('signatureCanvasReserv');
        SF.sleep(0.5);
        SF.click(By.xpath('//button[@ng-click="saveReservSignature();logClickButtons(\'Save reservation sign button clicked\')"]'));
        SF.sleep (1);
        FillCardPayModal ();
        SF.sleep (5);
        SF.waitForVisible(By.xpath('//div[contains(text(),"Your move is confirmed and scheduled")]'));
        driver.wait(driver.findElement(By.xpath('//div[@class="field-status confirm ng-scope"]/div')).getText().then(function(confirmed){
            VD.IWant (VD.VToEqual, confirmed, 'YOUR MOVE IS CONFIRMED AND SCHEDULED', 'статус не конферм, хотя должен был быть');
        }), config.timeout);
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
        SF.waitForVisible (By.xpath('//div[@class="field-status confirm ng-scope"]'));
        driver.wait(driver.findElement(By.xpath('//div[@class="field-status confirm ng-scope"]/div')).getText().then(function(confirmed){
            VD.IWant (VD.VToEqual, confirmed, 'YOUR MOVE IS CONFIRMED AND SCHEDULED', 'статус не конферм, хотя должен был быть');
        }), config.timeout);
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
        SF.waitForVisible (By.xpath('//div[@class="field-status confirm ng-scope"]'));
        driver.wait(driver.findElement(By.xpath('//div[@class="field-status confirm ng-scope"]/div')).getText().then(function(confirmed){
            VD.IWant (VD.VToEqual, confirmed, 'YOUR MOVE IS CONFIRMED AND SCHEDULED', 'статус не конферм, хотя должен был быть');
        }), config.timeout);
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
                    driver.wait(driver.findElement(By.xpath('//td[contains(text(),"' + request + '")]')).click(), config.timeout);
                }
                driver.wait(driver.findElement(By.xpath('//td[contains(text(),"' + request + '")]')).click(), config.timeout).then(
                    function(){
                        if (!condition.busy) {
                            fiber.run();
                        }
                    }
                );
            }
        );
        if (!condition.busy) {
            Fiber.yield();
        }
    }
    function selectCrew(ForemanName) {
        SF.click(By.xpath("//select[@ng-model='vm.data.foreman']"));
        SF.click(By.xpath("//select[@ng-model='vm.data.foreman']/option[contains(text(),'"+ForemanName+"')]"));
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
        SF.sleep(2);
    }
    function selectCrewFlatRatePickUp(ForemanName) {
        SF.click(By.xpath("//select[@ng-model='super.vm.data.pickedUpCrew.foreman']"));
        SF.click(By.xpath("//select[@ng-model='super.vm.data.pickedUpCrew.foreman']/option[contains(text(),'"+ForemanName+"')]"));
        SF.click(By.xpath("//label[contains(text(),'Helper No. 2')]/following-sibling::select[@ng-model='super.vm.data.pickedUpCrew.helpers[$index]']"));
        SF.click(By.xpath("//label[contains(text(),'Helper No. 2')]/following-sibling::select[@ng-model='super.vm.data.pickedUpCrew.helpers[$index]']//option[contains(text(),'Test Helper1')]"));
        driver.wait(
            driver.findElements(By.xpath("//label[contains(text(),'Helper No. 3')]/following-sibling::select[@ng-model='super.vm.data.pickedUpCrew.helpers[$index]']")).then(function (count) {
                if (count.length > 0) {
                    driver.wait(driver.findElement(By.xpath("//label[contains(text(),'Helper No. 3')]/following-sibling::select[@ng-model='super.vm.data.pickedUpCrew.helpers[$index]']")).click());
                    driver.wait(driver.findElement(By.xpath("//label[contains(text(),'Helper No. 3')]/following-sibling::select[@ng-model='super.vm.data.pickedUpCrew.helpers[$index]']//option[contains(text(),'Test Helper2')]")).click());
                }
            }), config.timeout);
        driver.wait(
            driver.findElements(By.xpath("//label[contains(text(),'Helper No. 4')]/following-sibling::select[@ng-model='super.vm.data.pickedUpCrew.helpers[$index]']")).then(function (count) {
                if (count.length > 0) {
                    driver.wait(driver.findElement(By.xpath("//label[contains(text(),'Helper No. 4')]/following-sibling::select[@ng-model='super.vm.data.pickedUpCrew.helpers[$index]']")).click());
                    driver.wait(driver.findElement(By.xpath("//label[contains(text(),'Helper No. 4')]/following-sibling::select[@ng-model='super.vm.data.pickedUpCrew.helpers[$index]']//option[contains(text(),'Test Helper3')]")).click());
                }
            }), config.timeout);
        SF.click(By.xpath("//a[@ng-click=\"super.vm.assignTeam()\"]"));
        MF.WaitWhileBusy ();
        JS.waitForExist('div.toast-success');
        SF.sleep(2);
        JS.waitForNotExist('div.toast-success');
        SF.sleep(2);
    }
    function selectCrewFlatRateDelivery() {
        SF.click(By.xpath("//select[@ng-model='super.vm.data.deliveryCrew.foreman']"));
        SF.click(By.xpath("//select[@ng-model='super.vm.data.deliveryCrew.foreman']/option[contains(text(),'FlatRate Foreman')]"));
        SF.click(By.xpath("//label[contains(text(),'Helper No. 2')]/following-sibling::select[@ng-model='super.vm.data.deliveryCrew.helpers[$index]']"));
        SF.click(By.xpath("//label[contains(text(),'Helper No. 2')]/following-sibling::select[@ng-model='super.vm.data.deliveryCrew.helpers[$index]']//option[contains(text(),'Test Helper1')]"));
        driver.wait(
            driver.findElements(By.xpath("//label[contains(text(),'Helper No. 3')]/following-sibling::select[@ng-model='super.vm.data.deliveryCrew.helpers[$index]']")).then(function (count) {
                if (count.length > 0) {
                    driver.wait(driver.findElement(By.xpath("//label[contains(text(),'Helper No. 3')]/following-sibling::select[@ng-model='super.vm.data.deliveryCrew.helpers[$index]']")).click());
                    driver.wait(driver.findElement(By.xpath("//label[contains(text(),'Helper No. 3')]/following-sibling::select[@ng-model='super.vm.data.deliveryCrew.helpers[$index]']//option[contains(text(),'Test Helper2')]")).click());
                }
            }), config.timeout);
        driver.wait(
            driver.findElements(By.xpath("//label[contains(text(),'Helper No. 4')]/following-sibling::select[@ng-model='super.vm.data.deliveryCrew.helpers[$index]']")).then(function (count) {
                if (count.length > 0) {
                    driver.wait(driver.findElement(By.xpath("//label[contains(text(),'Helper No. 4')]/following-sibling::select[@ng-model='super.vm.data.deliveryCrew.helpers[$index]']")).click());
                    driver.wait(driver.findElement(By.xpath("//label[contains(text(),'Helper No. 4')]/following-sibling::select[@ng-model='super.vm.data.deliveryCrew.helpers[$index]']//option[contains(text(),'Test Helper3')]")).click());
                }
            }), config.timeout);
        JS.click('a[ng-click=\\"super.vm.assignTeam()\\"]:visible');
        MF.WaitWhileBusy ();
        JS.waitForExist('div.toast-success');
        SF.sleep(2);
        JS.waitForNotExist('div.toast-success');
        SF.sleep(2);
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
        SF.sleep(3);
        SF.click(By.xpath('//span[contains(text(),"Tenant Signature:")]/following-sibling::div[1]/div[@ng-click="openService(\'monthly_storage_fee\', 1)"]'));
        MakeSignJS("signatureCanvasService");
        SF.click(By.xpath('//button[@ng-click="saveService()"]'));
        SF.sleep(2);
        JS.waitForNotExist('.busyoverlay:visible');
        SF.sleep(1);
        JS.waitForNotExist('.busyoverlay:visible');
        SF.sleep(1);
    }
    function payRentalInventory(boardNumbers){
        SF.click(By.xpath('//button[@ng-click="openPayment()"]'));
        JS.waitForExist('input[ng-model=\\"charge_value.value\\"]');
        SF.sleep(1);
        if(boardNumbers!=undefined) {
            driver.wait(driver.executeScript('return $(\'input[ng-model="charge_value.value"]\').val()').then(function (text) {
                boardNumbers.prepaid = SF.cleanPrice(text);
            }), config.timeout);
        }
        SF.click(By.xpath('//button[@ng-click="goStepTwo();"]'));
        FillCardPayModal();
        MakeSignJS('signatureCanvasPayment');
        SF.click(By.xpath('//div[@ng-init="payment.canvasInit(\'signatureCanvasPayment\')"]//button[@ng-click="saveSignature()"]'));
        JS.waitForExist('input#inputImage');
    }
    function RememberDateFromRequest(boardNumbers) {
        driver.wait(driver.findElement(By.xpath('//input[@ng-model="moveDateInput"]')).getAttribute("value").then(function (dateString) {
            dateString = dateString.toUpperCase();
            boardNumbers.moveDate = {};
            boardNumbers.moveDate.Month = SF.FindMonthInString(dateString);
            boardNumbers.moveDate.Day = SF.cleanPrice(dateString.substring(0, dateString.indexOf(',')));
            boardNumbers.moveDate.Year = SF.cleanPrice(dateString.substring(dateString.indexOf(',')));
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
    function RememberAndValidatePayroll_In_EditRequest(boardNumbers) {
        boardNumbers.Payroll = {
            managerForCommission: {},
            foremanForCommission: {},
            helpersForComission: []
        };
        SF.sleep(3);
        driver.wait(driver.executeScript('return $(\'input[ng-model="sale.for_commission "]\').val()').then(function (text) {
            boardNumbers.Payroll.managerForCommission.office = SF.cleanPrice(text);
        }));
        SF.sleep(1);
        VD.IWant(VD.VToEqual, Math.floor(boardNumbers.Payroll.managerForCommission.office),
            Math.floor(boardNumbers.Total
                - boardNumbers.AdServices - boardNumbers.Packing - boardNumbers.Fuel - boardNumbers.Valuation - boardNumbers.Tips),
            'Не совпал ForCommission менеджера');

        driver.findElement(By.xpath('//label[@ng-init="calcWorkerTotal(\'salesPerson\')"]')).getText().then(function (text) {
            boardNumbers.Payroll.managerForCommission.total = SF.cleanPrice(text);
        });
        SF.click(By.xpath('//li[@heading="Foremen"]/a'));
        driver.wait(driver.executeScript('return ' +
            '$(\'tr:has(td>select>option[selected="selected"]:contains("Tips"))>td>input[ng-model="foreman.for_commission"]\').val()'
        ).then(function (text) {
            boardNumbers.Payroll.foremanForCommission.Tips = SF.cleanPrice(text);
        }));
        SF.sleep(1);
        VD.IWant(VD.VToEqual, Math.floor(boardNumbers.Payroll.foremanForCommission.Tips),
            Math.floor(boardNumbers.Tips / boardNumbers.CrewSize),
            'Не совпал Tips формена');

        driver.wait(driver.executeScript('return ' +
            '$(\'tr:has(td>select>option[selected="selected"]:contains("Extras Commission"))>td>input[ng-model="foreman.for_commission"]\').val()'
        ).then(function (text) {
            boardNumbers.Payroll.foremanForCommission.AdServices = SF.cleanPrice(text);
        }));
        SF.sleep(1);
        VD.IWant(VD.VToEqual, Math.floor(boardNumbers.Payroll.foremanForCommission.AdServices),
            Math.floor(boardNumbers.AdServices),
            'Не совпал Extras формена');

        driver.wait(driver.executeScript('return ' +
            '$(\'tr:has(td>select>option[selected="selected"]:contains("Packing Commission"))>td>input[ng-model="foreman.for_commission"]\').val()'
        ).then(function (text) {
            boardNumbers.Payroll.foremanForCommission.Packing = SF.cleanPrice(text);
        }));
        SF.sleep(1);
        VD.IWant(VD.VToEqual, Math.floor(boardNumbers.Payroll.foremanForCommission.Packing),
            Math.floor(boardNumbers.Packing),
            'Не совпал Packing формена');

        driver.findElement(By.xpath('//label[@ng-init="calcWorkerTotal(\'foreman\')"]')).getText().then(function (text) {
            boardNumbers.Payroll.foremanForCommission.total = SF.cleanPrice(text);
        });
        SF.sleep(1);
        SF.click(By.xpath('//li[@heading="Helpers"]/a'));
        driver.wait(driver.findElement(By.xpath('//label[@ng-init="calcWorkerTotal(\'helper\'); calcWorkerTotal(\'foremanAsHelper\')"]')).getText().then(function (text) {
            boardNumbers.Payroll.helpersForComission.total = SF.cleanPrice(text);
        }),config.timeout);
        SF.sleep(1);
    }
    function RememberAndValidatePayroll_In_EditRequestFlatRatePickup(boardNumbers) {
        boardNumbers.Payroll = {
            managerForCommission: {},
            foremanForCommission: {},
            helpersForComission: []
        };
        SF.sleep(3);
        driver.wait(driver.executeScript('return $(\'input[ng-model="sale.for_commission "]\').val()').then(function (text) {
            boardNumbers.Payroll.managerForCommission.office = SF.cleanPrice(text);
        }));
        SF.sleep(1);
        VD.IWant(VD.VToEqual, Math.floor(boardNumbers.Payroll.managerForCommission.office),
            Math.floor(boardNumbers.Total
                - boardNumbers.AdServices - boardNumbers.Packing - boardNumbers.Fuel - boardNumbers.Valuation - boardNumbers.Tips),
            'Не совпал ForCommission менеджера');

        driver.findElement(By.xpath('//label[@ng-init="calcWorkerTotal(\'salesPerson\')"]')).getText().then(function (text) {
            boardNumbers.Payroll.managerForCommission.total = SF.cleanPrice(text);
        });
        SF.click(By.xpath('//li[@heading="Foremen"]/a'));
        driver.wait(driver.executeScript('return ' +
            '$(\'tr:has(td>select>option[selected="selected"]:contains("Tips"))>td>input[ng-model="foreman.for_commission"]\').val()'
        ).then(function (text) {
            boardNumbers.Payroll.foremanForCommission.Tips = SF.cleanPrice(text);
        }));
        SF.sleep(1);
        VD.IWant(VD.VToEqual, Math.floor(boardNumbers.Payroll.foremanForCommission.Tips),
            Math.floor(boardNumbers.Tips / 4),
            'Не совпал Tips формена');

        driver.wait(driver.executeScript('return ' +
            '$(\'tr:has(td>select>option[selected="selected"]:contains("Extras Commission"))>td>input[ng-model="foreman.for_commission"]\').val()'
        ).then(function (text) {
            boardNumbers.Payroll.foremanForCommission.AdServices = SF.cleanPrice(text);
        }));
        SF.sleep(1);
        VD.IWant(VD.VToEqual, Math.floor(boardNumbers.Payroll.foremanForCommission.AdServices),
            Math.floor(boardNumbers.AdServices),
            'Не совпал Extras формена');

        driver.wait(driver.executeScript('return ' +
            '$(\'tr:has(td>select>option[selected="selected"]:contains("Packing Commission"))>td>input[ng-model="foreman.for_commission"]\').val()'
        ).then(function (text) {
            boardNumbers.Payroll.foremanForCommission.Packing = SF.cleanPrice(text);
        }));
        SF.sleep(1);
        VD.IWant(VD.VToEqual, Math.floor(boardNumbers.Payroll.foremanForCommission.Packing),
            Math.floor(boardNumbers.Packing),
            'Не совпал Packing формена');

        driver.findElement(By.xpath('//label[@ng-init="calcWorkerTotal(\'foreman\')"]')).getText().then(function (text) {
            boardNumbers.Payroll.foremanForCommission.total = SF.cleanPrice(text);
        });
        SF.sleep(1);
        SF.click(By.xpath('//li[@heading="Helpers"]/a'));
        driver.wait(driver.findElement(By.xpath('//label[@ng-init="calcWorkerTotal(\'helper\'); calcWorkerTotal(\'foremanAsHelper\')"]')).getText().then(function (text) {
            boardNumbers.Payroll.helpersForComission.total = SF.cleanPrice(text);
        }),config.timeout);
        SF.sleep(1);
    }
    function RememberAndValidatePayroll_In_EditRequestFlatRateDelivery(boardNumbers) {
        boardNumbers.Payroll = {
            foremanForCommission: {},
            helpersForComission: []
        };
        SF.sleep(3);

        SF.click(By.xpath('//li[@heading="Foremen"]/a'));
        driver.wait(driver.executeScript('return ' +
            '$(\'tr:has(td>select>option[selected="selected"]:contains("Tips"))>td>input[ng-model="foreman.for_commission"]\').val()'
        ).then(function (text) {
            boardNumbers.Payroll.foremanForCommission.Tips = SF.cleanPrice(text);
        }));
        SF.sleep(1);
        VD.IWant(VD.VToEqual, Math.floor(boardNumbers.Payroll.foremanForCommission.Tips),
            Math.floor(boardNumbers.Tips / 4),
            'Не совпал Tips формена');

        driver.wait(driver.executeScript('return ' +
            '$(\'tr:has(td>select>option[selected="selected"]:contains("Extras Commission"))>td>input[ng-model="foreman.for_commission"]\').val()'
        ).then(function (text) {
            boardNumbers.Payroll.foremanForCommission.AdServices = SF.cleanPrice(text);
        }));
        SF.sleep(1);
        VD.IWant(VD.VToEqual, Math.floor(boardNumbers.Payroll.foremanForCommission.AdServices),
            Math.floor(boardNumbers.AdServices),
            'Не совпал Extras формена');

        driver.wait(driver.executeScript('return ' +
            '$(\'tr:has(td>select>option[selected="selected"]:contains("Packing Commission"))>td>input[ng-model="foreman.for_commission"]\').val()'
        ).then(function (text) {
            boardNumbers.Payroll.foremanForCommission.Packing = SF.cleanPrice(text);
        }));
        SF.sleep(1);
        VD.IWant(VD.VToEqual, Math.floor(boardNumbers.Payroll.foremanForCommission.Packing),
            Math.floor(boardNumbers.Packing),
            'Не совпал Packing формена');

        driver.findElement(By.xpath('//label[@ng-init="calcWorkerTotal(\'foreman\')"]')).getText().then(function (text) {
            boardNumbers.Payroll.foremanForCommission.total = SF.cleanPrice(text);
        });
        SF.sleep(1);
        SF.click(By.xpath('//li[@heading="Helpers"]/a'));
        driver.wait(driver.findElement(By.xpath('//label[@ng-init="calcWorkerTotal(\'helper\'); calcWorkerTotal(\'foremanAsHelper\')"]')).getText().then(function (text) {
            boardNumbers.Payroll.helpersForComission.total = SF.cleanPrice(text);
        }),config.timeout);
        SF.sleep(1);
    }
    function findTestForemanInPayroll(ForemanName) {
        SF.click(By.xpath('//table[@id="datatable"]//td[contains(text(),"foreman")]'));
        SF.click(By.xpath('//table[@id="datatable"]//td[contains(text(),"foreman")]'));
        SF.sleep(1);
        JS.waitForNotExist('div.busyoverlay:visible');
        SF.click(By.xpath('//table[@id="datatable"]//td[contains(text(),"'+ ForemanName +'")]'));
        SF.click(By.xpath('//table[@id="datatable"]//td[contains(text(),"'+ ForemanName +'")]'));
        SF.sleep(1);
        JS.waitForNotExist('div.busyoverlay:visible');
        SF.sleep(2);
    }
    function findFlatRateDeliveryForemanInPayroll() {
        SF.click(By.xpath('//table[@id="datatable"]//td[contains(text(),"foreman")]'));
        SF.click(By.xpath('//table[@id="datatable"]//td[contains(text(),"foreman")]'));
        SF.sleep(1);
        JS.waitForNotExist('div.busyoverlay:visible');
        SF.click(By.xpath('//table[@id="datatable"]//td[contains(text(),"FlatRate Foreman")]'));
        SF.click(By.xpath('//table[@id="datatable"]//td[contains(text(),"FlatRate Foreman")]'));
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
    function findHelperInPayroll(name) {
        SF.click(By.xpath('//table[@id="datatable"]//td[contains(text(),"helper")]'));
        SF.click(By.xpath('//table[@id="datatable"]//td[contains(text(),"helper")]'));
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
    function CreateMovAndStorFromFrontDown(client) {
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
        JS.select ('#edit-size-move', 8);
        JS.select ('#edit-type-from', 2);
        JS.select ('#edit-type-to', 5);
        SF.sleep (0.5);
        JS.click ('#calculate_btn');
        SF.waitForLocated (By.xpath('//div[@class="form_block calc-form"]'));
        SF.sleep (4);
        SF.send(By.id('edit-first-name'), client.name);
        SF.send(By.id('edit-last-name'), client.fam);
        SF.sleep(0.3);
        SF.send(By.xpath('//div[@ng-if="!userLogin"]//input[@ng-model="request.primaryPhone"]'), client.phone);
        SF.sleep(0.3);
        SF.send(By.id('edit-additional-phone'), client.phone);
        SF.sleep(0.3);
        SF.send(By.xpath('//div[@ng-if="!userLogin"]//input[@ng-model="request.email"]'), client.email);
        SF.sleep(0.3);
        SF.send(By.id('edit-confirmemail'), client.email);
        SF.click(By.id('prefeefe'));
        SF.click (By.xpath('//div[@id="pref_popup"]//div[@class="select_item pre_2"]'));
        SF.select(By.xpath('//select[@ng-model="request.prefDelivery"]'), 3);
        SF.select(By.xpath('//select[@ng-model="request.poll"]'), 'Google search');
        SF.click (By.xpath('//button[@ng-click="goToSummery()"]'));
        SF.sleep(5);
        JS.waitForNotExist ('div[ng-if="loadingImg"]');
        SF.sleep(4);
    }

    function CreateOvernightDownForm(client){
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
        SF.send (By.id('edit-zip-code-from'), '02136');
        SF.send (By.id('edit-zip-code-to'), '02032');
        JS.select ('#edit-size-move', 8);
        JS.select ('#edit-type-from', 2);
        JS.select ('#edit-type-to', 5);
        SF.sleep (0.5);
        JS.click ('#calculate_btn');
        SF.waitForLocated (By.xpath('//div[@class="form_block calc-form"]'));
        SF.sleep (4);
        SF.send(By.id('edit-first-name'), client.name);
        SF.send(By.id('edit-last-name'), client.fam);
        SF.sleep(0.3);
        SF.send(By.xpath('//div[@ng-if="!userLogin"]//input[@ng-model="request.primaryPhone"]'), client.phone);
        SF.sleep(0.3);
        SF.send(By.id('edit-additional-phone'), client.phone);
        SF.sleep(0.3);
        SF.send(By.xpath('//div[@ng-if="!userLogin"]//input[@ng-model="request.email"]'), client.email);
        SF.sleep(0.3);
        SF.send(By.id('edit-confirmemail'), client.email);
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
            frontNumbersDown.CrewTo = SF.cleanPrice (text);
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
            frontNumbersDown.CrewFrom = SF.cleanPrice (text);
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
    function CreateLoadingHelpDownForm(client){
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
        SF.send (By.id('edit-zip-code-from'), '02032');
        JS.select ('#edit-size-move', 8);
        JS.select ('#edit-type-from', 2);
        JS.select ('#edit-type-to', 5);
        SF.sleep (0.5);
        JS.click ('#calculate_btn');
        SF.waitForLocated (By.xpath('//div[@class="form_block calc-form"]'));
        SF.sleep (4);
        SF.send(By.id('edit-first-name'), client.name);
        SF.send(By.id('edit-last-name'), client.fam);

        SF.sleep(0.3);
        SF.send(By.xpath('//div[@ng-if="!userLogin"]//input[@ng-model="request.primaryPhone"]'), client.phone);
        SF.sleep(0.3);
        SF.send(By.id('edit-additional-phone'), client.phone);
        SF.sleep(0.3);
        SF.send(By.xpath('//div[@ng-if="!userLogin"]//input[@ng-model="request.email"]'), client.email);
        SF.sleep(0.3);
        SF.send(By.id('edit-confirmemail'), client.email);
        SF.click(By.id('prefeefe'));
        SF.click (By.xpath('//div[@id="pref_popup"]//div[@class="select_item pre_2"]'));
        SF.select(By.xpath('//select[@ng-model="request.poll"]'), 'Google search');
        SF.click (By.xpath('//button[@ng-click="goToSummery()"]'));
        SF.sleep(2);
        JS.waitForNotExist ('div[ng-if="loadingImg"]');
        SF.sleep(4);
    }
    function CreateUnloadingHelpDownForm(client){
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
        SF.send (By.id('edit-zip-code-to'), '02032');
        JS.select ('#edit-size-move', 8);
        JS.select ('#edit-type-from', 2);
        JS.select ('#edit-type-to', 5);
        SF.sleep (0.5);
        JS.click ('#calculate_btn');
        SF.waitForLocated (By.xpath('//div[@class="form_block calc-form"]'));
        SF.sleep (4);
        SF.send(By.id('edit-first-name'), client.name);
        SF.send(By.id('edit-last-name'), client.fam);

        SF.sleep(0.3);
        SF.send(By.xpath('//div[@ng-if="!userLogin"]//input[@ng-model="request.primaryPhone"]'), client.phone);
        SF.sleep(0.3);
        SF.send(By.id('edit-additional-phone'), client.phone);
        SF.sleep(0.3);
        SF.send(By.xpath('//div[@ng-if="!userLogin"]//input[@ng-model="request.email"]'), client.email);
        SF.sleep(0.3);
        SF.send(By.id('edit-confirmemail'), client.email);
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
    function addInventoryBoard(boardNumbers) {
        SF.click(By.xpath('//ul[@class="nav nav-tabs"]//a[@ng-click="select(tabs[1])"]'));
        JS.waitForExist('div.busyoverlay');
        SF.sleep (5);
        JS.click('div[ng-repeat=\\"filter in filters\\"]:visible div:first');
        SF.click (By.xpath('//div[@class="inventory-item"]//div[@ng-if="!showAdd"]/descendant::button[1]'));
        SF.click (By.xpath('//div[@class="inventory-item"]//div[@ng-if="!showAdd"]/descendant::button[1]'));
        SF.click (By.xpath('//div[@class="inventory-item"]//div[@ng-if="!showAdd"]/descendant::button[1]'));
        SF.click (By.xpath('//div[@class="inventory-item"]//div[@ng-if="!showAdd"]/descendant::button[1]'));
        SF.click (By.xpath('//div[@class="inventory-item"]//div[@ng-if="!showAdd"]/descendant::button[1]'));
        SF.click (By.xpath('//div[@class="inventory-item"]//div[@ng-if="!showAdd"]/descendant::button[1]'));
        SF.click (By.xpath('//div[@class="inventory-item"]//div[@ng-if="!showAdd"]/descendant::button[1]'));
        if (boardNumbers!=undefined) {
            driver.wait(driver.findElement(By.xpath('//div[@ng-if="calcTotals.cfs > 0 && !isMobile"]')).getText().then(function (text) {
                boardNumbers.InventoryCubicFit = SF.cleanPrice(text.replace('Total Estimated Cubic Feet: ', ''));
            }), config.timeout);
        }
        SF.click(By.id("save-inventory"));
        SF.sleep (4);
    }
    function RememberStorageNumbers(storageNumbers) {
        driver.wait(driver.findElement(By.xpath('//div[@ng-if="data.rentals.move_request_id"]')).getText().then(function(text){
            storageNumbers.IdMoving = SF.cleanPrice(text);
        }),config.timeout);
        SF.sleep(1);

        driver.wait(driver.executeScript('return $(\'input[ng-model="data.rentals.moved_in_date"]\').val()').then(function(text){
            storageNumbers.inDate={};
            storageNumbers.inDate.Month = SF.FindShortMonthInString(text);
            storageNumbers.inDate.Day = SF.cleanPrice(text.substring(0, text.indexOf(',')));
            storageNumbers.inDate.Year = SF.cleanPrice(text.substring(text.indexOf(',')));
        }),config.timeout);
        driver.wait(driver.executeScript('return $(\'input[ng-model="data.rentals.moved_out_date"]\').val()').then(function(text){
            storageNumbers.outDate={};
            storageNumbers.outDate.Month = SF.FindShortMonthInString(text);
            storageNumbers.outDate.Day = SF.cleanPrice(text.substring(0, text.indexOf(',')));
            storageNumbers.outDate.Year = SF.cleanPrice(text.substring(text.indexOf(',')));
        }),config.timeout);
        driver.wait(driver.executeScript('return $(\'input[ng-model="data.rentals.volume_cuft"]\').val()').then(function(text){
            storageNumbers.cbf=SF.cleanPrice(text);
        }),config.timeout);
        driver.wait(driver.findElement(By.xpath('//p[contains(text(),("Prepaid Credit"))]/following-sibling::p[1]')).getText().then(
            function(text){
                storageNumbers.prepaid = SF.cleanPrice(text);
            }),config.timeout);
    }
    function ValidatePendingStorageRequest(storageNumbers, boardNumbersTo, boardNumbersFrom){
        VD.IWant(VD.VToEqual, storageNumbers.inDate.Day, boardNumbersTo.moveDate.Day,'день въезда не совпал');
        VD.IWant(VD.VToEqual, storageNumbers.inDate.Month, boardNumbersTo.moveDate.Month,'месяц въезда не совпал');
        VD.IWant(VD.VToEqual, storageNumbers.inDate.Year, boardNumbersTo.moveDate.Year,'год въезда не совпал');
        VD.IWant(VD.VToEqual, storageNumbers.outDate.Day, boardNumbersFrom.moveDate.Day,'день выезда не совпал');
        VD.IWant(VD.VToEqual, storageNumbers.outDate.Month, boardNumbersFrom.moveDate.Month,'месяц выезда не совпал');
        VD.IWant(VD.VToEqual, storageNumbers.outDate.Year, boardNumbersFrom.moveDate.Year,'год выезда не совпал');
        VD.IWant(VD.VToEqual, storageNumbers.cbf, boardNumbersTo.cbf,'объём не совпал');
        VD.IWant(VD.VToEqual, storageNumbers.prepaid, boardNumbersTo.prepaid,'предоплата не совпала');
    }
    function RememberCarrier(carrierData) {
        driver.wait(driver.executeScript('return $(\'input[ng-model="agentModel.data.name"]\').val()').then(function (text) {
            carrierData.name = text;
        }), config.timeout);
        driver.wait(driver.executeScript('return $(\'input[ng-model="agentModel.data.contact_person"]\').val()').then(function (text) {
            carrierData.contactPerson = text;
        }), config.timeout);
        driver.wait(driver.executeScript('return $(\'textarea[ng-model="agentModel.data.address"]\').val()').then(function (text) {
            carrierData.address = text;
        }), config.timeout);
        driver.wait(driver.executeScript('return $(\'input[ng-model="agentModel.data.zip_code"]\').val()').then(function (text) {
            carrierData.zipCode = text;
        }), config.timeout);
        driver.wait(driver.executeScript('return $(\'input[ng-model="agentModel.data.per_cf"]\').val()').then(function (text) {
            carrierData.perCf = text;
        }), config.timeout);
        driver.wait(driver.executeScript('return $(\'input[ng-model="agentModel.data.usdot_number"]\').val()').then(function (text) {
            carrierData.usdot = text;
        }), config.timeout);
        driver.wait(driver.executeScript('return $(\'input[ng-model="agentModel.data.web_site"]\').val()').then(function (text) {
            carrierData.webSite = text;
        }), config.timeout);
        driver.wait(driver.executeScript('return $(\'input[ng-model="agentModel.data.icc_mc_number"]\').val()').then(function (text) {
            carrierData.iccMc = text;
        }), config.timeout);
        driver.wait(driver.executeScript('return $(\'input[ng-model="agentModel.data.email"]\').val()').then(function (text) {
            carrierData.eMail = text;
        }), config.timeout);
        driver.wait(driver.executeScript('return $(\'input[ng-model="agentModel.data.phones[$index]"]\').val()').then(function (text) {
            carrierData.phoneNumber1 = text;
        }), config.timeout);
        SF.sleep(2);
    }
    function Contract_SignMainPayment(){
        MakeSignJS('signatureCanvasPayment');
        SF.click(By.xpath('//div[@ng-init="payment.canvasInit(\'signatureCanvasPayment\')"]//button[@ng-click="saveSignature()"]'));
    }
    function Contract_AddInventory(count){
        JS.scroll("tr[ng-repeat=\"n in rangeArr\"]:eq(0)");
        for (let i = 1, invCount = 1; i <= count; i++) {
            SF.click(By.xpath('//tr[@ng-repeat="n in rangeArr"][' + i + ']//button[1]'));
            SF.sleep(1);
            JS.click("ul#inventory-dropdown:visible li[ng-repeat=\\\"articles in  inventoryList | toArray | orderBy: 'title'  \\\"]:visible");
            SF.select(By.xpath('//tr[@ng-repeat="n in rangeArr"][' + i + ']//select[1]'), "CP");
            SF.click(By.xpath('//tr[@ng-repeat="n in rangeArr"][' + i + ']//button[@ng-click="openCondition(data[fieldName].inventory[n], n)"]'));
            JS.waitForExist('button[ng-click=\\"addCondition(key)\\"]:has(div:contains(\\"burned\\")):visible');
            SF.sleep(1);
            JS.click('button[ng-click=\\"addCondition(key)\\"]:has(div:contains(\\"burned\\"))');
            SF.click(By.xpath('//button[@ng-click="addLocation(symbol.key)"]/div[contains(text(),"veneer")]/..'));
            SF.click(By.xpath('//button[@ng-click="SaveExit()"]'));
            SF.sleep(2);
        }
    }
    function RememberLocalMoveDigitsCalc(LocalMoveAdminCalc) {
        driver.wait(driver.findElement(By.xpath('//td[contains(text(), "Rate:")]/following-sibling::td[1]')).getText().then(function(rate){
            LocalMoveAdminCalc.HourlyRate = rate.indexOf('$', 4) == -1 ?
                SF.cleanPrice(rate) :
                SF.cleanPrice(rate.substring(rate.indexOf('$', 4)));
        }),config.timeout);
        driver.wait(driver.findElement(By.xpath('//td[contains(text(), "Service Type:")]/following-sibling::td[1]')).getText().then(function(type){
            LocalMoveAdminCalc.Type = type;
            VD.IWant (VD.VToEqual, type, "Moving", "Сервис тайп не совпал, должен быть Moving");
        }),config.timeout);
        driver.wait(driver.findElement(By.xpath('//td[contains(text(), "TRUCK:")]/following-sibling::td[1]')).getText().then(function(truck){
            LocalMoveAdminCalc.Trucks = truck;
        }),config.timeout);
        driver.wait(driver.findElement(By.xpath('//td[contains(text(), "MOVERS:")]/following-sibling::td[1]')).getText().then(function(crew){
            LocalMoveAdminCalc.CrewSize = SF.cleanPrice (crew);
        }),config.timeout);
        driver.wait(driver.findElement(By.xpath('//td[contains(text(), "TRAVEL TIME:")]/following-sibling::td[1]')).getText().then(function(text){
            let hours = text.indexOf('hr') == -1 ? 0 : SF.cleanPrice(text.substring(0, text.indexOf('hr')));
            let minutes = text.indexOf('min') == -1 ? 0 : SF.cleanPrice(text.substring((text.indexOf('hr') + 1), text.indexOf('min')));
            LocalMoveAdminCalc.TravelTime = hours * 60 + minutes;
        }),config.timeout);
        SF.sleep (1);
        driver.wait(driver.findElement(By.xpath('//td[contains(text(), "Work Time")]/following-sibling::td[1]')).getText().then(function(text){
            let textMin = text.substring(0, text.indexOf('-'));
            let textMax = text.substring(text.indexOf('-') + 1);
            let hoursMin = textMin.indexOf('hr') == -1 ? 0 : SF.cleanPrice(textMin.substring(0, textMin.indexOf('hr')));
            let minutesMin = textMin.indexOf('min') == -1 ? 0 : SF.cleanPrice(textMin.substring((textMin.indexOf('hr') + 1), textMin.indexOf('min')));
            LocalMoveAdminCalc.WorkTimeMin = hoursMin * 60 + minutesMin;
            let hoursMax = textMax.indexOf('hr') == -1 ? 0 : SF.cleanPrice(textMax.substring(0, textMax.indexOf('hr')));
            let minutesMax = textMax.indexOf('min') == -1 ? 0 : SF.cleanPrice(textMax.substring((textMax.indexOf('hr') + 1), textMax.indexOf('min')));
            LocalMoveAdminCalc.WorkTimeMax = hoursMax * 60 + minutesMax;
        }),config.timeout);
        driver.wait(driver.findElement(By.xpath('//td[contains(text(), "Move Quote")]/following-sibling::td[1]')).getText().then(function(text){
            if (text.indexOf('$', text.indexOf('$') + 3) !== -1) {
                LocalMoveAdminCalc.QuoteMin = SF.cleanPrice(text.substring(text.indexOf('$'), text.indexOf('-')));
                LocalMoveAdminCalc.QuoteMax = SF.cleanPrice(text.substring(text.indexOf('$', text.indexOf('$') + 3)));
            } else {
                LocalMoveAdminCalc.Quote = SF.cleanPrice(text);
            }
        }),config.timeout);
        driver.wait(driver.findElement(By.xpath('//td[contains(text(), "Fuel Surcharge:")]/following-sibling::td[1]')).getText().then(function(text){
            LocalMoveAdminCalc.Fuel = SF.cleanPrice (text);
        }),config.timeout);
        driver.wait(driver.findElement(By.xpath('//td[contains(text(), "Grand Total")]/following-sibling::td[1]')).getText().then(function(text){
            if (text.indexOf('$', text.indexOf('$') + 3) !== -1) {
                LocalMoveAdminCalc.TotalMin = SF.cleanPrice(text.substring(text.indexOf('$'), text.indexOf('-')));
                LocalMoveAdminCalc.TotalMax = SF.cleanPrice(text.substring(text.indexOf('$', text.indexOf('$') + 3)));
            } else {
                LocalMoveAdminCalc.Total = SF.cleanPrice(text);
            }
        }),config.timeout);
        console.log (LocalMoveAdminCalc);
    }
    function CreateFlatRateDownForm(client) {
        SF.sleep (4);
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
        SF.send (By.id('edit-zip-code-from'), '02461');
        SF.send (By.id('edit-zip-code-to'), '07304');
        JS.select ('#edit-size-move', 10);
        JS.select ('#edit-type-from', 2);
        JS.select ('#edit-type-to', 5);
        SF.sleep (0.5);
        JS.click ('#calculate_btn');
        SF.waitForLocated (By.xpath('//div[@class="form_block calc-form"]'));
        SF.sleep (4);
        SF.send(By.id('edit-first-name'), client.name);
        SF.send(By.id('edit-last-name'), client.fam);
        SF.sleep(0.3);
        SF.send(By.xpath('//div[@ng-if="!userLogin"]//input[@ng-model="request.primaryPhone"]'), client.phone);
        SF.sleep(0.3);
        SF.send(By.id('edit-additional-phone'), client.phone);
        SF.sleep(0.3);
        SF.send(By.xpath('//div[@ng-if="!userLogin"]//input[@ng-model="request.email"]'), client.email);
        SF.sleep(0.3);
        SF.send(By.id('edit-confirmemail'), client.email);
        SF.click(By.id('prefeefe'));
        SF.click (By.xpath('//div[@id="pref_popup"]//div[@class="select_item pre_2"]'));
        SF.select(By.xpath('//select[@ng-model="request.poll"]'), 'Google search');
        SF.click (By.xpath('//button[@ng-click="goToSummery()"]'));
        SF.sleep(2);
        JS.waitForNotExist ('div[ng-if="loadingImg"]');
        SF.sleep(4);
        SF.click(By.id('submitRequestButton'));
        SF.sleep (2);
        SF.click(By.linkText('View Request Page'));
        SF.sleep(4);
    }
    function CreateStorageTenant(client) {
        SF.click(By.xpath('//button[@ng-click="pending.createModal()"]'));
        MF.WaitWhileBusy ();
        SF.sleep (2);
        SF.send(By.xpath('//input[@ng-model="data.user_info.name"]'), client.long);
        SF.send(By.xpath('//input[@ng-model="data.user_info.zip"]'), '02136');
        SF.send(By.xpath('//input[@ng-model="data.user_info.phone1"]'), client.phone);
        SF.send(By.xpath('//input[@ng-model="data.user_info.email"]'), client.email);
        var now = new Date();
        var msInDay = 86400000;
        var future = new Date(now.getTime() + msInDay * 4);
        var options = { month: 'short', day: 'numeric', year: 'numeric' };
        V.changedate = (future.toLocaleDateString('en-US', options));
        SF.send(By.xpath('//input[@ng-model="data.rentals.moved_in_date"]'), V.changedate);
        var now = new Date();
        var msInDay = 86400000;
        var future = new Date(now.getTime() + msInDay * 8);
        var options = { month: 'short', day: 'numeric', year: 'numeric' };
        V.changedateOut = (future.toLocaleDateString('en-US', options));
        SF.send(By.xpath('//input[@ng-model="data.rentals.moved_out_date"]'), V.changedateOut);
        SF.click(By.xpath('//input[@ng-model="data.user_info.phone2"]'));
        SF.click(By.xpath('//button[@ng-click="createNewStorageRequest()"]'));
        MF.WaitWhileBusy ();
        SF.sleep (3);
    }
    function Payroll_DeleteAllMiscPaymentCycle() {
        driver.wait(driver.executeScript("return $('table[dt-options=\"dtOptions\"] tr[ng-repeat=\"(id, dataObj) in userCurrentTbl.misc\"]').length").then(function (paycheck) {
            V.payMisc = paycheck;
            console.log(V.payMisc)
        }), config.timeout);
        SF.sleep(1);
        for (let i = 0; i < V.payMisc; i++) {
            SF.click(By.xpath('//table[@dt-options="dtOptions"]//tr[@ng-repeat="(id, dataObj) in userCurrentTbl.misc"]'));
            SF.sleep(0.5);
            SF.click(By.xpath('//table[@dt-options="dtOptions"]//tr[@ng-repeat="(id, dataObj) in userCurrentTbl.misc"]'));
            SF.waitForLocated (By.xpath('//button[@ng-click="removeMisc()"]'));
            MF.WaitWhileBusy();
            SF.click (By.xpath('//button[@ng-click="removeMisc()"]'));
            MF.SweetConfirm ();
            MF.WaitWhileBusy();
        }
    }
    function Payroll_DeleteAllPaycheckPaycashCycle() {
        driver.wait(driver.executeScript("return $('table[dt-options=\"dtOptionsPaycheck\"] tr[ng-repeat=\"(id, dataObj) in userCurrentTbl.users_paychecks\"]').length").then(function (paycheck) {
            V.paycheck = paycheck;
            console.log(V.paycheck)
        }), config.timeout);
        SF.sleep(1);
        for (let i = 0; i < V.paycheck; i++) {
            SF.click(By.xpath('//table[@dt-options="dtOptionsPaycheck"]//tr[@ng-repeat="(id, dataObj) in userCurrentTbl.users_paychecks"]'));
            SF.sleep(0.3);
            SF.click(By.xpath('//table[@dt-options="dtOptionsPaycheck"]//tr[@ng-repeat="(id, dataObj) in userCurrentTbl.users_paychecks"]'));
            SF.waitForLocated (By.xpath('//button[@ng-click="removePaycheck()"]'));
            MF.WaitWhileBusy();
            SF.click (By.xpath('//button[@ng-click="removePaycheck()"]'));
            MF.SweetConfirm ();
            MF.WaitWhileBusy();
        }
    }
    function Payroll_SelectPeriod20Days() {
        let now = new Date();
        let msInDay = 86400000;
        let future = new Date(now.getTime() - msInDay *10);
        let options = { month: 'short', day: 'numeric', year: 'numeric' };
        V.payrollDateFrom = (future.toLocaleDateString('en-US', options));
        now = new Date();
        msInDay = 86400000;
        future = new Date(now.getTime() + msInDay *10);
        options = { month: 'short', day: 'numeric', year: 'numeric' };
        V.payrollDateTo = (future.toLocaleDateString('en-US', options));
        SF.clear(By.xpath('//input[@ng-model="dateRange.from"]'));
        SF.send(By.xpath('//input[@ng-model="dateRange.from"]'), V.payrollDateFrom);
        SF.clear(By.xpath('//input[@ng-model="dateRange.to"]'));
        SF.send(By.xpath('//input[@ng-model="dateRange.to"]'), V.payrollDateTo);
        SF.click(By.xpath('//button[@ng-click="getByDate();bDateChange=false"]'));
        SF.sleep(1);
        MF.WaitWhileBusy ();
    }
    function RememberPayrollNumbers_InsideWorker(payrollNumbersInside) {
        driver.wait(driver.executeScript("return $('div.total-payroll-panel div.total-title:contains(\"Paid\")').next().text()").then(function (paid) {
            payrollNumbersInside.paid = SF.cleanPrice(paid);
        }), config.timeout);
        SF.sleep(1);
        driver.wait(driver.executeScript("return $('div.total-payroll-panel div.total-title:contains(\"Balance\")').next().text()").then(function (balanceTop) {
            payrollNumbersInside.balanceTop = SF.cleanPrice(balanceTop);
        }), config.timeout);
        SF.sleep(1);
        driver.wait(driver.executeScript("return $('.mdDataTable-header-alternate td:last-child').text()").then(function (balanceDown) {
            payrollNumbersInside.balanceDown = SF.cleanPrice(balanceDown);
        }), config.timeout);
        SF.sleep(1);
    }
    function RememberPayrollNumbers_OutsideNameWorker(workerName, payrollNumbersOutside) {
        driver.wait(driver.findElement(By.xpath('//td[contains(text(), "'+workerName+'")]/following-sibling::td[@ng-show="columns.fields[\'total\'].selected"][last()]')).getText().then(function (total) {
            payrollNumbersOutside.total = SF.cleanPrice (total);
        }),config.timeout);
        SF.sleep(0,5);
        driver.wait(driver.findElement(By.xpath('//td[contains(text(), "'+workerName+'")]/following-sibling::td[@ng-show="columns.fields[\'paid\'].selected"][last()]')).getText().then(function (paid) {
            payrollNumbersOutside.paid = SF.cleanPrice (paid);
        }),config.timeout);
        SF.sleep(0,5);
    }

    return {
        FullSmallCalcAsLocal: FullSmallCalcAsLocal,
        FullSmallCalcAsUnloading: FullSmallCalcAsUnloading,
        FullSmallCalcAsLoading: FullSmallCalcAsLoading,
        FullSmallCalcAsMovingWithStorage: FullSmallCalcAsMovingWithStorage,
        FullSmallCalcAsLD: FullSmallCalcAsLD,
        FullSmallCalcAsFlateRate: FullSmallCalcAsFlateRate,
        AccountLocalEnterAddress: AccountLocalEnterAddress,
        AccountLocalAddInventory: AccountLocalAddInventory,
        AccountLocalAddAdditionalInventory: AccountLocalAddAdditionalInventory,
        AccountFlatRateAddInventory: AccountFlatRateAddInventory,
        AccountLocalDetails: AccountLocalDetails,
        AccountLoadingDetails : AccountLoadingDetails,
        AccountUnLoadingDetails: AccountUnLoadingDetails,
        AccountUnloadingEnterAddress:AccountUnloadingEnterAddress,
        AccountLoadingEnterAddress: AccountLoadingEnterAddress,
        AccountToStorageEnterAddress: AccountToStorageEnterAddress,
        AccountFromStorageEnterAddress: AccountFromStorageEnterAddress,
        RememberAccountNumbers: RememberAccountNumbers,
        LogoutFromAccount: LogoutFromAccount,
        LogoutFromBoardForeman: LogoutFromBoardForeman,
        LoginToBoardAsAdmin: LoginToBoardAsAdmin,
        LoginToBoardAsForeman: LoginToBoardAsForeman,
        LoginToBoardAsForemanDeliveryFlatRate: LoginToBoardAsForemanDeliveryFlatRate,
        LoginToBoardAsCustom: LoginToBoardAsCustom,
        LoginToBoardAsCustomForeman: LoginToBoardAsCustomForeman,
        LoginToAccountAsClient: LoginToAccountAsClient,
        LoginToBoardAs_Roma4ke_Admin: LoginToBoardAs_Roma4ke_Admin,
        OpenRequest: OpenRequest,
        OpenRequestFlatRate: OpenRequestFlatRate,
        CreateMovAndStorFromFrontDown: CreateMovAndStorFromFrontDown,
        CreateUnloadingHelpDownForm: CreateUnloadingHelpDownForm,
        CreateLoadingHelpDownForm: CreateLoadingHelpDownForm,
        CreateOvernightDownForm: CreateOvernightDownForm,
        CreateLocalMovingFromBoard: CreateLocalMovingFromBoard,
        CreateMovAndStorFromBoard: CreateMovAndStorFromBoard,
        CreateLoadingHelpFromBoard: CreateLoadingHelpFromBoard,
        CreateFlatRateDownForm: CreateFlatRateDownForm,
        CreateStorageTenant: CreateStorageTenant,
        CreateFlatRateFromBoard: CreateFlatRateFromBoard,
        CreateLongDistanceFromBoard: CreateLongDistanceFromBoard,
        RememberDigitsRequestBoard_Up: RememberDigitsRequestBoard_Up,
        RememberDigitsRequestBoard_Down: RememberDigitsRequestBoard_Down,
        RememberDigitsRequestBoard: RememberDigitsRequestBoard,
        RememberFrontNumbersMovAndStorDown: RememberFrontNumbersMovAndStorDown,
        RememberLocalMoveDigitsCalc: RememberLocalMoveDigitsCalc,
        Validation_Compare_Account_Admin: Validation_Compare_Account_Admin,
        Validation_Compare_Account_Front_MovStorTo: Validation_Compare_Account_Front_MovStorTo,
        Validation_Compare_Account_Front_MovStorFrom: Validation_Compare_Account_Front_MovStorFrom,
        Validation_Compare_CalcLocalMove_Admin: Validation_Compare_CalcLocalMove_Admin,
        SetManager: SetManager,
        SetClientPasswd: SetClientPasswd,
        FillCardPayModal: FillCardPayModal,
        InvoiceOnlinePayment: InvoiceOnlinePayment,
        FillCardPayModalBuyCoupon: FillCardPayModalBuyCoupon,
        MakeSignJS: MakeSignJS,
        ConfirmRequestInAccount_WithReservation: ConfirmRequestInAccount_WithReservation,
        ConfirmRequestInAccount_NoReservation: ConfirmRequestInAccount_NoReservation,
        ConfirmRequestInAccount_WithReservationWithAdress: ConfirmRequestInAccount_WithReservationWithAdress,
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
        selectCrewFlatRatePickUp: selectCrewFlatRatePickUp,
        selectCrewFlatRateDelivery: selectCrewFlatRateDelivery,
        MakeSignInContract: MakeSignInContract,
        MakeSignInInventory: MakeSignInInventory,
        MakeSignInRental: MakeSignInRental,
        payRentalInventory: payRentalInventory,
        RememberDateFromRequest: RememberDateFromRequest,
        findDayInLocalDispatch: findDayInLocalDispatch,
        RememberAndValidatePayroll_In_EditRequest: RememberAndValidatePayroll_In_EditRequest,
        findTestForemanInPayroll: findTestForemanInPayroll,
        findFlatRateDeliveryForemanInPayroll: findFlatRateDeliveryForemanInPayroll,
        findSaleInPayroll: findSaleInPayroll,
        findHelperInPayroll: findHelperInPayroll,
        selectDateInPayroll: selectDateInPayroll,
        addToCleanerJob: addToCleanerJob,
        gotoSetingsLD: gotoSetingsLD,
        deletePendingRequest: deletePendingRequest,
        addInventoryBoard: addInventoryBoard,
        RememberStorageNumbers: RememberStorageNumbers,
        ValidatePendingStorageRequest: ValidatePendingStorageRequest,
        RememberCarrier: RememberCarrier,
        Contract_SignMainPayment:Contract_SignMainPayment,
        Contract_AddInventory:Contract_AddInventory,
        RememberAndValidatePayroll_In_EditRequestFlatRatePickup: RememberAndValidatePayroll_In_EditRequestFlatRatePickup,
        RememberAndValidatePayroll_In_EditRequestFlatRateDelivery: RememberAndValidatePayroll_In_EditRequestFlatRateDelivery,
//Payroll
        Payroll_DeleteAllMiscPaymentCycle: Payroll_DeleteAllMiscPaymentCycle,
        Payroll_DeleteAllPaycheckPaycashCycle: Payroll_DeleteAllPaycheckPaycashCycle,
        Payroll_SelectPeriod20Days: Payroll_SelectPeriod20Days,
        RememberPayrollNumbers_OutsideNameWorker: RememberPayrollNumbers_OutsideNameWorker,
        RememberPayrollNumbers_InsideWorker: RememberPayrollNumbers_InsideWorker
    };
};