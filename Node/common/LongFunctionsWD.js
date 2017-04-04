module.exports = function (driver, SF, JS, JSstep, VD, V, By, until,FileDetector, system, condition, Debug,config, constants) {
    return {
        FullSmallCalcAsLocal: function (client) {
            SF.send(By.xpath('//ultrasmall-form//input[@ng-model="request.zipFrom"]'), "02461");
            SF.send(By.xpath('//ultrasmall-form//input[@ng-model="request.zipTo"]'), "02111");
            driver.wait(driver.executeScript("$('ultrasmall-form input[ng-model=\"request.moveDate\"]').focus();"));
            SF.sleep(2);
            V.frontNumbers = {};
            driver.wait(driver.executeScript(Click4DaysNewCalendar).then(function (D) {
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
        },
        AccountLocalEnterAddress: function () {
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
        },
        AccountLocalAddInventory: function () {
            JS.click('a[ng-click=\\"vm.select(tab)\\"]:contains(\\"Inventory\\")');
            JS.waitForExist('div[ng-repeat="filter in filters"]');
            SF.sleep(5);
            SF.click(By.xpath('(//div[@ng-repeat="item in currentFilter.items"]//button[@ng-click="changeValue(1, item)"])[1]'));
            SF.sleep(1);
            SF.click(By.xpath('(//div[@ng-repeat="item in currentFilter.items"]//button[@ng-click="changeValue(1, item)"])[1]'));
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
        },
        AccountLocalDetails: function () {
            JS.click('a[ng-click=\\"vm.select(tab)\\"]:contains(\\"Details\\")');
            JS.waitForNotExist('div.busyoverlay:visible');
            SF.sleep(2);
            SF.select(By.xpath('//select[@id="current_door_to_parking"]'), 60);
            SF.select(By.xpath('//select[@id="new_door_to_parking"]'), 60);
            SF.select(By.xpath('//select[@id="current_parking_permit"]'), "PDW");
            SF.select(By.xpath('//select[@id="new_parking_permit"]'), "PDW");
            driver.executeScript("$('select#new_parking_permit').get(0).scrollIntoView();");
            SF.click(By.xpath('//button[@ng-click="saveDetails()"]'));
            driver.executeScript("$('body').scrollTop(0);");
            SF.sleep(5);
        },
        RememberAccountNumbers: function () {
            V.accountNumbers = {};
            driver.wait(driver.executeScript('return $("div:contains(\\"Move Date :\\"):last").next().text()').then(function (dateString) {
                dateString = dateString.toUpperCase();
                V.accountNumbers.moveDate = {};
                V.accountNumbers.moveDate.Month = SF.FindMonthInString(dateString);
                V.accountNumbers.moveDate.Day = SF.cleanPrice(dateString.substring(0, dateString.indexOf(',')));
                V.accountNumbers.moveDate.Year = SF.cleanPrice(dateString.substring(dateString.indexOf(',')));
            }));
            driver.wait(driver.executeScript('return $("div:contains(\\"Crew Size :\\"):last").next().text()').then(function (text) {
                V.accountNumbers.CrewSize = SF.cleanPrice(text);
            }));
            driver.wait(driver.executeScript('return $("div:contains(\\"Truck :\\"):last").next().text()').then(function (text) {
                V.accountNumbers.Trucks = SF.cleanPrice(text);
            }));
            driver.wait(driver.executeScript('return $("div:contains(\\"Hourly Rate :\\"):last").next().text()').then(function (text) {
                V.accountNumbers.HourlyRate = text.indexOf('$', 4) == -1 ?
                    SF.cleanPrice(text) :
                    SF.cleanPrice(text.substring(text.indexOf('$', 4)));
            }));
            driver.wait(driver.findElement(By.xpath('//div[contains(text(),"Fuel Surcharge")]/../div[2]')).getText().then(function (text) {
                V.accountNumbers.Fuel = SF.cleanPrice(text);
            }));
            driver.wait(driver.executeScript(JSstep.getServicesCostAccount), config.timeout).then(function (ServicesText) {
                V.accountNumbers.AdServices = SF.cleanPrice(ServicesText);
            });
            driver.wait(driver.executeScript(JSstep.getPackingsCostAccount), config.timeout).then(function (ServicesText) {
                V.accountNumbers.Packing = SF.cleanPrice(ServicesText);
            });
            driver.wait(driver.findElement(By.xpath('//span[contains(text(),"Estimated Travel Time")]/../../div[2]')).getText().then(function (text) {
                let hours = text.indexOf('hrs') == -1 ? 0 : SF.cleanPrice(text.substring(0, text.indexOf('hrs')));
                let minutes = text.indexOf('min') == -1 ? 0 : SF.cleanPrice(text.substring((text.indexOf('hrs') + 1), text.indexOf('min')));
                V.accountNumbers.TravelTime = hours * 60 + minutes;
            }));

            driver.wait(driver.findElement(By.xpath('//div[contains(text(),"Estimated Labor time")]/../div[2]')).getText().then(function (text) {
                let textMin = text.substring(0, text.indexOf('-'));
                let textMax = text.substring(text.indexOf('-') + 1);
                let hoursMin = textMin.indexOf('hrs') == -1 ? 0 : SF.cleanPrice(textMin.substring(0, textMin.indexOf('hrs')));
                let minutesMin = textMin.indexOf('min') == -1 ? 0 : SF.cleanPrice(textMin.substring((textMin.indexOf('hrs') + 1), textMin.indexOf('min')));
                V.accountNumbers.LaborTimeMin = hoursMin * 60 + minutesMin;
                let hoursMax = textMax.indexOf('hrs') == -1 ? 0 : SF.cleanPrice(textMax.substring(0, textMax.indexOf('hrs')));
                let minutesMax = textMax.indexOf('min') == -1 ? 0 : SF.cleanPrice(textMax.substring((textMax.indexOf('hrs') + 1), textMax.indexOf('min')));
                V.accountNumbers.LaborTimeMax = hoursMax * 60 + minutesMax;
            }));

            driver.wait(driver.findElement(By.xpath('//div[contains(text(),"Estimated Quote")]/following-sibling::div[1]')).getText().then(function (text) {
                if (text.indexOf("You save") !== -1) {
                    let t = text.substring(0, text.indexOf("You save"));
                    t = t.substring(t.indexOf('$', t.indexOf('$', t.indexOf('$') + 1) + 1));
                    V.accountNumbers.TotalMin = SF.cleanPrice(t.substring(0, t.indexOf('-')));
                    V.accountNumbers.TotalMax = SF.cleanPrice(t.substring(t.indexOf('-') + 1));
                } else {
                    console.log('ещё не делали без скидок');
                }
            }));
            driver.wait(driver.findElement(By.xpath('//div[contains(text(),"Request ID")]/span')).getText().then(function (text) {
                V.accountNumbers.Id = SF.cleanPrice(text);
            }));
            SF.sleep(2);
            console.log(V.accountNumbers);
        },
        LogoutFromAccount: function () {
            driver.executeScript("$('a[ng-click=\"vm.Logout()\"]').get(0).scrollIntoView();");
            SF.click(By.xpath('//a[@ng-click="vm.Logout()"]'));
            SF.waitForVisible(By.xpath('//form[@ng-submit="login()"]'));
            SF.sleep(5);
        },
        LogoutFromBoardAdmin: function () {
            JS.waitForNotExist('div.toast-success');
            JS.waitForNotExist('div.toast-message');
            JS.scroll('a[ng-click=\"vm.Logout()\"]');
            SF.click(By.xpath('//a[@ng-click="vm.Logout()"]/../../preceding-sibling::*[1]'));
            SF.sleep(1);
            SF.click(By.xpath('//a[@ng-click="vm.Logout()"]'));
            SF.waitForVisible(By.xpath('//form[@ng-submit="login()"]'));
            SF.sleep(5);
        },
        LogoutFromBoardForeman: function () {
            JS.waitForNotExist('div.toast-success');
            JS.waitForNotExist('div.toast-message');
            JS.scroll('li.dropdown.profile:visible');
            SF.click(By.xpath('//li[contains(@class,"dropdown") and contains(@class,"profile")]/a[contains(@class,"dropdown-toggle")]'));
            SF.sleep(1);
            SF.click(By.xpath('//a[@ng-click="vm.Logout()"]'));
            SF.waitForVisible(By.xpath('//form[@ng-submit="login()"]'));
            SF.sleep(2);
        },
        LoginToBoardAsAdmin: function () {
            SF.waitForVisible(By.xpath('//div[@ng-controller="LoginController"]//span[contains(text(),"Move")]'));
            SF.send(By.xpath('//input[@id="email"]'), 'TestAdmin');
            SF.send(By.xpath('//input[@id="password"]'), 'test');
            SF.click(By.xpath('//button[@type="submit"]'));
            SF.waitForVisible(By.xpath('//td[@ng-click="requestEditModal(request)"]'));
        },
        LoginToBoardAsForeman: function () {
            SF.waitForVisible(By.xpath('//div[@ng-controller="LoginController"]//span[contains(text(),"Move")]'));
            SF.send(By.xpath('//input[@id="email"]'), 'TestForeman');
            SF.send(By.xpath('//input[@id="password"]'), '123');
            SF.click(By.xpath('//button[@type="submit"]'));
            SF.waitForVisible(By.xpath('//tr[@ng-click="vm.editReservation(request.nid)"]'));
        },
        LoginToBoardAsCustom: function (login, passwd) {
            SF.waitForVisible(By.xpath('//div[@ng-controller="LoginController"]//span[contains(text(),"Move")]'));
            SF.send(By.xpath('//input[@id="email"]'), login);
            SF.send(By.xpath('//input[@id="password"]'), passwd);
            SF.click(By.xpath('//button[@type="submit"]'));
            SF.waitForVisible(By.xpath('//td[@ng-click="requestEditModal(request)"]'));
        },
        LoginToAccountAsClient: function (client) {
            SF.sleep(1);
            SF.waitForVisible(By.xpath('//form[@ng-submit="login()"]'));
            SF.sleep(1);
            SF.send(By.xpath('//input[@id="email"]'), client.email);
            SF.send(By.xpath('//input[@id="password"]'), 123);
            SF.click(By.xpath('//button[@type="submit"]'));
            SF.sleep(2);
        },
        OpenRequest: function (request) {

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
        },
        CreateLocalMovingFromBoard: function () {
            JS.waitForNotExist('div.toast-success');
            JS.waitForNotExist('div.busyoverlay:visible');
            SF.click(By.linkText('Create Request'));
            SF.sleep(5);
            SF.click(By.xpath('//div[@class="step1"]//select[@name="move_service_type"]/option[@value="number:1"]'));
            SF.click(By.xpath('//input[@id="edit-move-date-datepicker-popup-0"]'));
            V.request = {};
            driver.wait(driver.executeScript(JSstep.Click4DaysCalendar)).then(function (calDate) {
                V.request.moveDate = calDate;
                console.log(V.request);
            });
            SF.sleep(0.5);
            SF.click(By.xpath('//ul[@class="chosen-choices"]'));
            SF.click(By.xpath('//ul[@class="chosen-results"]/li[@data-option-array-index="1"]'));
            SF.send(By.id("edit-zip-code-from"), "02032");
            Debug.pause();
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
        },
        CreateMovAndStorFromBoard: function () {
            SF.click(By.linkText('Create Request'));
            SF.sleep(2);
            SF.click(By.xpath('//div[@class="step1"]//select[@name="move_service_type"]/option[@value="number:2"]'));
            SF.click(By.xpath('//input[@id="edit-move-date-datepicker-popup-0"]'));
            V.request = {};
            driver.wait(driver.executeScript(JSstep.Click4DaysCalendar)).then(function (calDate) {
                V.request.moveDate = calDate;
                console.log(V.request);
            });
            SF.sleep(2);
            SF.click(By.xpath('//input[@id="edit-date-storage-datepicker-popup-0"]'));
            driver.wait(driver.executeScript(JSstep.Click8DaysCalendar)).then(function (DelDate) {
                V.request.DeliveryDate = DelDate;
                console.log(V.request.DeliveryDate);
            });

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
        },
        CreateLoadingHelpFromBoard: function () {
            SF.click(By.linkText('Create Request'));
            SF.sleep(4);
            SF.click(By.xpath('//div[@class="step1"]//select[@name="move_service_type"]/option[@value="number:3"]'));
            SF.click(By.xpath('//input[@id="edit-move-date-datepicker-popup-0"]'));
            V.request = {};
            driver.wait(driver.executeScript(JSstep.Click4DaysCalendar)).then(function (calDate) {
                V.request.moveDate = calDate;
                console.log(V.request);
            });
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
        },
        RememberDigitsRequestBoard_Up: function () {

            if (V.boardNumbers == undefined) {
                V.boardNumbers = {};
            }
            driver.wait(driver.findElement(By.xpath('//input[@ng-model="moveDateInput"]')).getAttribute("value").then(function (dateString) {
                dateString = dateString.toUpperCase();
                V.boardNumbers.moveDate = {};
                V.boardNumbers.moveDate.Month = SF.FindMonthInString(dateString);
                V.boardNumbers.moveDate.Day = SF.cleanPrice(dateString.substring(0, dateString.indexOf(',')));
                V.boardNumbers.moveDate.Year = SF.cleanPrice(dateString.substring(dateString.indexOf(',')));
            }));
            driver.wait(driver.findElement(By.xpath('//input[@ng-model="request.minimum_time.value"]')).getAttribute('value').then(function (value) {
                V.boardNumbers.LaborTimeMin = SF.cleanPrice(value.substring(0, value.indexOf(':'))) * 60
                    + SF.cleanPrice(value.substring(value.indexOf(':')));
            }));
            driver.wait(driver.findElement(By.xpath('//input[@ng-model="request.maximum_time.value"]')).getAttribute('value').then(function (value) {
                V.boardNumbers.LaborTimeMax = SF.cleanPrice(value.substring(0, value.indexOf(':'))) * 60
                    + SF.cleanPrice(value.substring(value.indexOf(':')));
            }));
            driver.wait(driver.findElement(By.xpath('//input[@ng-model="request.travel_time.value"]')).getAttribute('value').then(function (value) {
                V.boardNumbers.TravelTime = SF.cleanPrice(value.substring(0, value.indexOf(':'))) * 60
                    + SF.cleanPrice(value.substring(value.indexOf(':')));
            }));
            driver.wait(driver.findElement(By.xpath('//input[@id="edit-movers-crew"]')).getAttribute('value').then(function (value) {
                V.boardNumbers.CrewSize = SF.cleanPrice(value);
            }));
            driver.wait(driver.findElement(By.xpath('//input[@ng-model="request.rate.value"]')).getAttribute('value').then(function (value) {
                V.boardNumbers.HourlyRate = SF.cleanPrice(value);
            }));
            driver.wait(driver.findElement(By.xpath('//label[contains(text(),"Trucks:")]/following-sibling::div[1]')).getText('text').then(function (text) {
                V.boardNumbers.Trucks = SF.cleanPrice(text);
            }));
            SF.sleep(1);
            console.log(V.boardNumbers);
        },
        RememberDigitsRequestBoard_Down: function () {

            if (V.boardNumbers == undefined) {
                V.boardNumbers = {};
            }
            driver.wait(driver.executeScript('return $(\'div.QuoteCost:visible\').text()').then(function (text) {
                if (text.indexOf('$', text.indexOf('$') + 3) !== -1) {
                    V.boardNumbers.QuoteMin = SF.cleanPrice(text.substring(text.indexOf('$'), text.indexOf('-')));
                    V.boardNumbers.QuoteMax = SF.cleanPrice(text.substring(text.indexOf('$', text.indexOf('$') + 3)));
                } else {
                    V.boardNumbers.Quote = SF.cleanPrice(text);
                }
            }));
            driver.wait(driver.executeScript('return $(\'div.FuelCost:visible\').text()').then(function (text) {
                V.boardNumbers.Fuel = SF.cleanPrice(text.substring(text.indexOf('$')));
            }));
            driver.wait(driver.executeScript('return $(\'div.ValuationCost:visible\').text()').then(function (text) {
                V.boardNumbers.Valuation = SF.cleanPrice(text.substring(text.indexOf('$')));
            }));
            driver.wait(driver.executeScript('return $(\'div.PackingCost:visible\').text()').then(function (text) {
                V.boardNumbers.Packing = SF.cleanPrice(text.substring(text.indexOf('$')));
            }));
            driver.wait(driver.executeScript('return $(\'div.ServicesCost:visible\').text()').then(function (text) {
                V.boardNumbers.AdServices = SF.cleanPrice(text.substring(text.indexOf('$')));
            }));
            driver.wait(driver.executeScript('return $(\'div.DiscountCost:visible\').text()').then(function (text) {
                V.boardNumbers.Discount = SF.cleanPrice(text.substring(text.indexOf('$')));
            }));
            driver.wait(driver.executeScript('return $(\'div.TipsCost:visible input\').val()').then(function (text) {
                if (text != null) {
                    V.boardNumbers.Tips = SF.cleanPrice(text.substring(text.indexOf('$')));
                } else {
                    V.boardNumbers.Tips = 0;
                }
            }));
            driver.wait(driver.executeScript('return $(\'div.TotalCost:visible\').text()').then(function (text) {
                if (text.indexOf('$', text.indexOf('$') + 3) !== -1) {
                    V.boardNumbers.TotalMin = SF.cleanPrice(text.substring(text.indexOf('$'), text.indexOf('-')));
                    V.boardNumbers.TotalMax = SF.cleanPrice(text.substring(text.indexOf('$', text.indexOf('$') + 3)));
                } else {
                    V.boardNumbers.Total = SF.cleanPrice(text);
                }
            }));
            driver.wait(driver.executeScript('return $(\'div.PaymentCost:visible\').text()').then(function (text) {
                V.boardNumbers.Payment = SF.cleanPrice(text.substring(text.indexOf('$')));
            }));
            driver.wait(driver.executeScript('return $(\'div.BalanceCost:visible\').text()').then(function (text) {
                if (text.indexOf('$', text.indexOf('$') + 3) !== -1) {
                    V.boardNumbers.BalanceMin = SF.cleanPrice(text.substring(text.indexOf('$'), text.indexOf('-')));
                    V.boardNumbers.BalanceMax = SF.cleanPrice(text.substring(text.indexOf('$', text.indexOf('$') + 3)));
                } else {
                    V.boardNumbers.Balance = SF.cleanPrice(text);
                }
            }));
            SF.sleep(1);
            console.log(V.boardNumbers);
        },
        RememberDigitsRequestBoard: function () {
            RememberDigitsRequestBoard_Up();
            RememberDigitsRequestBoard_Down();
        },

        Validation_Compare_Account_Admin: function () {
            VD.IWant(VD.VToEqual, V.accountNumbers.moveDate.Day, V.boardNumbers.moveDate.Day, 'не совпали даты аккаунта и борда');
            VD.IWant(VD.VToEqual, V.accountNumbers.moveDate.Month, V.boardNumbers.moveDate.Month, 'не совпали даты аккаунта и борда');
            VD.IWant(VD.VToEqual, V.accountNumbers.moveDate.Year, V.boardNumbers.moveDate.Year, 'не совпали даты аккаунта и борда');
            VD.IWant(VD.VToEqual, V.accountNumbers.CrewSize, V.boardNumbers.CrewSize, 'не совпали CrewSize аккаунта и борда');
            VD.IWant(VD.VToEqual, V.accountNumbers.HourlyRate, V.boardNumbers.HourlyRate, 'не совпали HourlyRate аккаунта и борда');
            VD.IWant(VD.VToEqual, V.accountNumbers.LaborTimeMin, V.boardNumbers.LaborTimeMin, 'не совпали LaborTimeMin аккаунта и борда');
            VD.IWant(VD.VToEqual, V.accountNumbers.LaborTimeMax, V.boardNumbers.LaborTimeMax, 'не совпали LaborTimeMax аккаунта и борда');
            VD.IWant(VD.VToEqual, V.accountNumbers.TravelTime, V.boardNumbers.TravelTime, 'не совпали TravelTime аккаунта и борда');
            VD.IWant(VD.VToEqual, V.accountNumbers.Packing, V.boardNumbers.Packing, 'не совпали Packing аккаунта и борда');
            VD.IWant(VD.VToEqual, V.accountNumbers.AdServices, V.boardNumbers.AdServices, 'не совпали Services аккаунта и борда');
            VD.IWant(VD.VToEqual, V.accountNumbers.Trucks, V.boardNumbers.Trucks, 'не совпали Trucks аккаунта и борда');
            VD.IWant(VD.VToEqual, V.accountNumbers.TotalMin, V.boardNumbers.TotalMin, 'не совпали TotalMin аккаунта и борда');
            VD.IWant(VD.VToEqual, V.accountNumbers.TotalMax, V.boardNumbers.TotalMax, 'не совпали TotalMax аккаунта и борда');
            VD.IWant(VD.VToEqual, V.accountNumbers.Fuel, V.boardNumbers.Fuel, 'не совпали Fuel аккаунта и борда');
        },
        SetManager: function (name) {
            SF.click(By.xpath('//button[contains(text(),"Set Sales")]'));
            SF.click(By.xpath('//a[@ng-click="setManager(manager.uid)"][contains(text(),"' + name + '")]'));
            SF.sleep(1);
            SF.click(By.xpath('//button[@class="confirm"][contains(text(),"Confirm")]'));
            SF.sleep(1);
        },
        SetClientPasswd: function () {
            SF.send(By.xpath('//input[@ng-model="client.password"]'), V.client.passwd);
            SF.click(By.xpath('//button[@ng-click="update(client)"]'));
            SF.sleep(3);
        },
        FillCardPayModal: function () {
            JS.waitForExist('input[ng-model="payment.card_num"]');
            SF.sleep(1);
            SF.send(By.xpath('//input[@ng-model="payment.card_num"]'), 4111111111111111);
            SF.send(By.xpath('//input[@ng-model="payment.exp_month"]'), 11);
            SF.send(By.xpath('//input[@ng-model="payment.exp_year"]'), 20);
            SF.send(By.xpath('//input[@ng-model="secure.cvc"]'), 323);
            SF.sleep(1);
            SF.click(By.xpath('//input[@ng-click="applyPayment()"]'));
        },
        MakeSignJS: function (canvasID) {
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
        },
        ConfirmRequestInAccount_WithReservation: function () {
            SF.click(By.xpath('//div[contains(@class,"notconfirmed")]'));
            SF.sleep(2);
            JS.waitForExist('div.confirm');
            JS.scroll('div.confirm');
            SF.click(By.xpath('//input[@ng-model="vm.checkCancel"]'));
            SF.click(By.xpath('//input[@ng-model="vm.checkTerms"]'));
            SF.click(By.xpath('//div[@ng-click="addReservationPayment()"]'));
            LF.FillCardPayModal();
            SF.waitForVisible(By.xpath('//canvas[@id="signatureCanvasReserv"]'));
            JS.makeSign('signatureCanvasReserv');
            SF.click(By.xpath('//button[@ng-click="saveReservSignature()"]'));
        },
//Permissions for Sales --- start
        PermissionsClear: function () {
            driver.wait(driver.executeScript("if($('input[ng-model=\"request.permissions.canSeeOtherLeads\"]').hasClass('ng-empty')){return true;}else{$('input[ng-model=\"request.permissions.canSeeOtherLeads\"]').parent().click()}"));
            driver.wait(driver.executeScript("if($('input[ng-model=\"request.permissions.canSearchOtherLeads\"]').hasClass('ng-empty')){return true;}else{$('input[ng-model=\"request.permissions.canSearchOtherLeads\"]').parent().click()}"));
            driver.wait(driver.executeScript("if($('input[ng-model=\"request.permissions.canEditOtherLeads\"]').hasClass('ng-empty')){return true;}else{$('input[ng-model=\"request.permissions.canEditOtherLeads\"]').parent().click()}"));
            driver.wait(driver.executeScript("if($('input[ng-model=\"request.permissions.canSeeUnsignedLeads\"]').hasClass('ng-empty')){return true;}else{$('input[ng-model=\"request.permissions.canSeeUnsignedLeads\"]').parent().click()}"));
            driver.wait(driver.executeScript("if($('input[ng-model=\"request.permissions.canSignedSales\"]').hasClass('ng-empty')){return true;}else{$('input[ng-model=\"request.permissions.canSignedSales\"]').parent().click()}"));

        },
        PermissionCanSeeOtherLeads: function () {
            driver.wait(driver.executeScript("$('input[ng-model=\"request.permissions.canSeeOtherLeads\"]').parent().click()"));
            SF.click(By.xpath('//input[@ng-model="request.permissions.canSeeOtherLeads"]/..'));
        },
        PermissionCanSearchOtherLeads: function () {
            driver.wait(driver.executeScript("$('input[ng-model=\"request.permissions.canSearchOtherLeads\"]').click()"));
        },
        PermissionCanEditOtherLeads: function () {
            driver.wait(driver.executeScript("$('input[ng-model=\"request.permissions.canEditOtherLeads\"]').click()"));
        },
        PermissionCanSeeUnsignedLeads: function () {
            driver.wait(driver.executeScript("$('input[ng-model=\"request.permissions.canSeeUnsignedLeads\"]').click()"));
        },
        PermissionCanSignedSales: function () {
            driver.wait(driver.executeScript("$('input[ng-model=\"request.permissions.canSignedSales\"]').click()"));
        },
//Permissions for Sales --- end
        closeEditRequest: function () {
            JS.waitForNotExist('div.toast-message');
            JS.waitForNotExist('div.toast-top-right');
            JS.waitForNotExist('div.toast-success');
            SF.sleep(2);
            JS.waitForNotExist('div.toast-success:visible');
            JS.waitForNotExist('div.toast-success');
            SF.sleep(1);
            SF.click(By.xpath('//button[@ng-click="cancel()"]'));
            SF.sleep(2);
        },
        SelectRequestDispatch: function (request) {
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
        },
        OpenRequestDispatch: function (request) {
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
        },
        selectCrew: function () {
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
            SF.click(By.xpath("//a[@ng-click=\"vm.assignTeam(request)\"]"));
            JS.waitForExist('div.toast-success');
            SF.sleep(2);
            JS.waitForNotExist('div.toast-success');
        },
        MakeSignInContract: function () {
            SF.click(By.xpath('//div[@class="empty-signature"]'));
            JS.makeSign("signatureCanvas");
            SF.click(By.xpath('//button[@ng-click="saveStep()"]'));
            SF.sleep(2);
        },
        RememberDateFromRequest: function () {
            V.boardNumbers = {};
            driver.findElement(By.xpath('//input[@ng-model="moveDateInput"]')).getAttribute("value").then(function (dateString) {
                dateString = dateString.toUpperCase();
                V.boardNumbers.moveDate = {};
                V.boardNumbers.moveDate.Month = SF.FindMonthInString(dateString);
                V.boardNumbers.moveDate.Day = SF.cleanPrice(dateString.substring(0, dateString.indexOf(',')));
                V.boardNumbers.moveDate.Year = SF.cleanPrice(dateString.substring(dateString.indexOf(',')));
            });
        },
        findDayInLocalDispatch: function (futureYear, futureMonth, futureDay) {
            var target = futureYear;
            var current = 'a';
            while (isNaN(current)) {
                driver.wait(driver.wait(driver.executeScript('return $(\'span.ui-datepicker-year\').text()'), config.timeout).then(function (text) {
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
                    driver.wait(driver.wait(driver.executeScript('return $(\'span.ui-datepicker-year\').text()'), config.timeout).then(function (text) {
                        current = Number(text);
                        console.log('получил год' + current);
                    }), config.timeout);
                    SF.sleep(1);
                }
                console.log('current year:' + current + ' tagret:' + target);
            }
            console.log('выбрали год');
            target = futureMonth;
            var monthNumbers = {
                JANUARY: 0,
                FEBRUARY: 1,
                MARCH: 2,
                APRIL: 3,
                MAY: 4,
                JUNE: 5,
                JULY: 6,
                AUGUST: 7,
                SEPTEMBER: 8,
                OCTOBER: 9,
                NOVEMBER: 10,
                DECEMBER: 11
            };
            var current = 'a';
            while (isNaN(current)) {
                driver.wait(driver.wait(driver.executeScript('return $(\'span.ui-datepicker-month\').text()'), config.timeout).then(function (text) {
                    current = monthNumbers[text.toUpperCase()];
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
                    driver.wait(driver.wait(driver.executeScript('return $(\'span.ui-datepicker-month\').text()'), config.timeout).then(function (text) {
                        current = monthNumbers[text.toUpperCase()];
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
        },
        RememberAndValidatePayroll_In_EditRequest: function () {
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
        },
        findTestForemanInPayroll: function () {
            SF.click(By.xpath('//table[@id="datatable"]//td[contains(text(),"foreman")]'));
            SF.click(By.xpath('//table[@id="datatable"]//td[contains(text(),"foreman")]'));
            SF.sleep(1);
            JS.waitForNotExist('div.busyoverlay:visible');
            SF.click(By.xpath('//table[@id="datatable"]//td[contains(text(),"Test Foreman")]'));
            SF.click(By.xpath('//table[@id="datatable"]//td[contains(text(),"Test Foreman")]'));
            SF.sleep(1);
            JS.waitForNotExist('div.busyoverlay:visible');
            SF.sleep(2);
        },
        findSaleInPayroll: function (name) {
            SF.click(By.xpath('//table[@id="datatable"]//td[contains(text(),"sales")]'));
            SF.click(By.xpath('//table[@id="datatable"]//td[contains(text(),"sales")]'));
            SF.sleep(1);
            JS.waitForNotExist('div.busyoverlay:visible');
            SF.click(By.xpath('//table[@id="datatable"]//td[contains(text(),"' + name + '")]'));
            SF.click(By.xpath('//table[@id="datatable"]//td[contains(text(),"' + name + '")]'));
            SF.sleep(1);
            JS.waitForNotExist('div.busyoverlay:visible');
            SF.sleep(2);
        },
        selectDateInPayroll: function (date) {

            SF.clear(By.xpath('//input[@ng-model="dateRange.from"]'));
            SF.send(By.xpath('//input[@ng-model="dateRange.from"]'), monthNamesShort[date.Month] +
                ' ' + date.Day + ', ' + date.Year);
            SF.clear(By.xpath('//input[@ng-model="dateRange.to"]'));
            SF.send(By.xpath('//input[@ng-model="dateRange.to"]'), monthNamesShort[date.Month] +
                ' ' + date.Day + ', ' + date.Year);
            SF.click(By.xpath('//button[@ng-click="getByDate();bDateChange=false"]'));
            SF.sleep(1);
            JS.waitForNotExist('div.busyoverlay:visible');
        }
    };
};