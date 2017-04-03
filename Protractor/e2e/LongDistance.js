describe('LongDistance test', function () {

    var zipFrom = "02461";
    var zipTo = "90001";
    var temp, i, j, k;
    var clientURL = browser.params.clientURL;
    var adminURL = browser.params.adminURL;
    var requestPage = browser.params.requestURL;
    var Admin_EmailId = "roma4ke";
    var Admin_Password = "root";
    var firstName = randomBukva(6) + "_name";
    var lastName = randomBukva(5) + "_fam";
    var fullName = firstName + ' ' + lastName;
    var phone = randomCifra(10);
    var email = randomBukvaSmall(8) + "@gmail.com";
    var requestId;
    var now = new Date();
    var msInDay = 86400000;
    var future = new Date(now.getTime() + msInDay * 4);//4 ��� �����
    var farFuture = new Date(now.getTime() + msInDay * 8);//8 ��� �����
    var moveDate = {month: 0, day: 0, year: 0};
    var sleepTime = 1500;
    var repeats = 20;
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
    var monthWords = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    browser.ignoreSynchronization = true; //��� ����� ��������

    /*
     it('Admin login', function () {
     browser.get(adminURL);
     browser.ignoreSynchronization = true; //��� ����� ��������
     TryToClickModel('email', function () {
     adminLogin();
     TryToClickXpath('//a[@ng-click="vm.openEditModal()"]');
     });
     });
     it('creating Client', function () {
     //element(by.xpath('//a[@ng-click="vm.openEditModal()"]')).click();
     browser.sleep(sleepTime * 2);
     element(by.xpath('//select[@ng-model="editrequest.data.field_move_service_type"]/option[@label="Long Distance"]')).click();//�������� Lond Distance
     element(by.id('edit-move-date-datepicker-popup-0')).click();
     browser.sleep(sleepTime * 2);
     element(by.xpath('//td[@data-month="' + future.getMonth() + '" and @data-year="' + future.getFullYear() + '"]/a[contains(text(),"' + future.getDate() + '")]/..'))
     .getAttribute('class').then(function(result){
     console.log('result'+result);
     if (result===" Block this day"){
     console.log(':Block this day');
     var future = new Date(now.getTime() + msInDay * 5);
     }
     element(by.xpath('//td[@data-month="' + future.getMonth() + '" and @data-year="' + future.getFullYear() + '"]/a[contains(text(),"' + future.getDate() + '")]')).click()
     .then(function(){},function(err){console.log(err.message)});
     });
     browser.sleep(sleepTime * 2);
     var sizeOfMove = element.all(by.xpath('//select[@ng-model="editrequest.data.field_size_of_move"]/option'));
     sizeOfMove.count().then(function (count) {
     count--;
     sizeOfMove.get(Math.floor(Math.random() * count)).click();
     });
     var moveFrom = element.all(by.xpath('//select[@id="edit-type-from"]/option'));
     moveFrom.count().then(function (count) {
     count -= 2;
     //moveFrom.get(Math.floor(Math.random() * count) + 1).click();
     moveFrom.get(3).click();
     });
     element(by.xpath('(//input[@id="edit-zip-code-from"])[1]')).sendKeys(zipFrom);

     var moveTo = element.all(by.xpath('//select[@id="edit-type-to"]/option'));
     moveTo.count().then(function (count) {
     count -= 2;
     //moveTo.get(Math.floor(Math.random() * count) + 1).click();
     moveTo.get(3).click();
     });
     element(by.xpath('(//input[@id="edit-zip-code-from"])[2]')).sendKeys(zipTo);
     browser.actions().sendKeys(protractor.Key.ENTER).perform();
     browser.sleep(sleepTime * 2);
     element(by.xpath('//button[@ng-click="Calculate()"]')).click();
     browser.sleep(sleepTime * 2);
     element(by.xpath('//button[contains(text(),"Continue")]')).click();
     browser.sleep(sleepTime * 4);
     TryToClickModel("editrequest.account.fields.field_user_first_name", function () {
     element(by.model("editrequest.account.fields.field_user_first_name")).sendKeys(firstName);
     element(by.model("editrequest.account.fields.field_user_last_name")).sendKeys(lastName);
     element(by.model("editrequest.account.mail")).sendKeys(email);
     element(by.model("editrequest.account.fields.field_primary_phone")).sendKeys(phone);
     browser.actions().sendKeys(protractor.Key.ENTER).perform();
     browser.sleep(sleepTime * 2);
     TryToClickXpath('//button[contains(text(),"Create")]');
     browser.sleep(sleepTime * 4);
     });
     });
     it('give a passwd', function () {
     TryToClickId('edit-status', function () {
     element(by.xpath('//ul[@class="nav nav-tabs"]/li[1]/a')).getText().then(function (text) {
     requestId = Number(text.substr(text.indexOf('#') + 1));
     element(by.model('request.field_moving_from.thoroughfare')).sendKeys(randomBukva(8) + requestId);
     });
     browser.sleep(sleepTime * 4);

     //-----------------------------------��� �� ������� Client
     element(by.xpath('//li[@heading="Client"]/a')).click();
     browser.sleep(sleepTime * 2);
     element(by.model('client.password')).sendKeys('123');
     browser.sleep(sleepTime * 2);
     element(by.xpath("//button[contains(text(),'Update')]")).click();
     browser.sleep(sleepTime * 2);
     adminLogout();
     });
     });
     */
    it('go to client', function () {
        //----------------------------------��������� ���� � �������, ��� � �������
        browser.get(clientURL);
        TryToClickModel('email', function () {
            clientLogin('vubrxdxb@gmail.com', '123');
            //clientLogin(email, '123');
            TryToClickXpath("//span[contains(text(),'Pending')]/../../td/button", function () {
                //temp = element(by.xpath("//span[contains(text(),'Not Confirmed')]/../../td/button")).click();
                browser.sleep(sleepTime * 3);
                var startButton = element.all(by.css('.request-button'));
                startButton.count().then(function (result) {
                    if (result != 0) startButton.get(0).click();
                });
                browser.sleep(sleepTime * 1);
            });
        });
    });
    it('clicking all tabs, finish on inventory', function () {

        var tabs = element.all(by.repeater('tab in vm.tabs'));


        tabs.count().then(function (c) {
            c--;
            tabs.get(1).click();
            console.log('tab' + 1);
            browser.sleep(2000).then(function(){
                tabs.get(2).click();
                console.log('tab' + 2).then(function() {
                    browser.sleep(2000);
                    tabs.get(3).click().then(function() {
                        console.log('tab' + 3);
                        browser.sleep(2000).then(function() {
                            tabs.get(4).click();
                            console.log('tab' + 4);
                            browser.sleep(2000);
                        });
                    });
                });
            });


            tabs.get(1).click().then(function () {
                browser.sleep(sleepTime * 10);
                var plot0=element(by.xpath('(//div[@class="inventory-item__col"]/div/button[@ng-click="changeValue(1, item)"])[3]'));
                browser.actions()
                    .mouseMove(plot0, {x: 10, y: 10}) // 100px from left, 100 px from top of plot0
                    .mouseDown()
                    .mouseUp() // 400px to the right of current location
                    .perform();
                browser.sleep(sleepTime * 10);
                TryToClickXpath('//div[@class="inventory-item__item"]/div[@class="inventory-item__col"]/div[@class="ng-scope"]/button[@ng-click="changeValue(1, item)"]', function () {
                    browser.sleep(sleepTime * 10);
                    for (j = 0; j < 2; j++) {
                        var inventoryItems = element(by.xpath('(//div[@class="inventory-item__col"]/div/button[@ng-click="changeValue(1, item)"])[3]')).click();
                        console.log('inventory' + j);
                        browser.sleep(sleepTime * 1);
                    }

                    element(by.id('save-inventory')).click();
                    console.log('saved');
                    browser.sleep(sleepTime);
                    TryToClickXpath('//div[@class="sweet-alert showSweetAlert visible"]/div/div/button', function () {
                        browser.sleep(sleepTime);


                        tabs.get(0).click();
                        browser.sleep(sleepTime * 2);
                        element(by.id("partial")).click();
                        browser.sleep(sleepTime * 2);
                        xpathLookingFor('//div[contains(text(),"Estimate Partial Packing:")]');
                        tabs.get(2).click();
                        browser.sleep(sleepTime * 3);

                        var select1 = element(by.id('current_door_to_parking')).all(by.tagName('option'));
                        select1.count().then(function (result) {
                            if (result != 0) {
                                result--;
                                select1.get(Math.floor(Math.random() * result)).click();
                            }
                        });
                        var select2 = element(by.model('details.current_permit')).all(by.tagName('option'));
                        select2.count().then(function (result) {
                            if (result != 0) {
                                result -= 2;
                                select2.get(Math.floor(Math.random() * result) + 1).click();
                            }
                        });
                        var select3 = element(by.model('details.new_door')).all(by.tagName('option'));
                        select3.count().then(function (result) {
                            if (result != 0) {
                                result--;
                                select3.get(Math.floor(Math.random() * result)).click();
                            }
                        });
                        var select4 = element(by.model('details.new_permit')).all(by.tagName('option'));
                        select4.count().then(function (result) {
                            if (result != 0) {
                                result -= 2;
                                select4.get(Math.floor(Math.random() * result) + 1).click();
                            }
                        });
                        browser.sleep(sleepTime * 2);
                        element(by.model("details.delivery")).clear();
                        element(by.model("details.delivery")).sendKeys(monthWords[farFuture.getMonth()] + " " + farFuture.getDate() + ", " + farFuture.getFullYear());
                        element(by.buttonText("Save Move Details")).click();
                        browser.sleep(sleepTime * 8);
                        tabs.get(0).click();
                        TryToClickId("partial");
                    });
                });
            });
        });


    });
    /*
     it('Enter Address', function () {
     var tabs = element.all(by.repeater('tab in vm.tabs'));
     element(by.xpath("//span[@ng-click='vm.openAddressModal()']")).click();
     browser.sleep(sleepTime * 4);
     element(by.xpath('//input[@field="request.field_moving_from"]')).sendKeys(randomCifra(5));
     element(by.xpath('//input[@field="request.apt_from"]')).sendKeys(randomCifra(2));
     element(by.xpath('//input[@field="request.field_moving_to"]')).sendKeys(randomCifra(5));
     element(by.xpath('//input[@field="request.apt_to"]')).sendKeys(randomCifra(2));
     element(by.css('.modal-footer')).element(by.css('.btn-primary')).click();
     TryToClickXpath('//div[@class="sweet-alert showSweetAlert visible"]/div/div/button', function () {
     TryToClickXpath('//div[@class="sweet-alert showSweetAlert visible"]/div/div/button', function () {
     browser.sleep(sleepTime * 2);
     browser.get(requestPage + requestId);
     browser.sleep(sleepTime * 10);
     xpathLookingFor('//div[contains(text(),"Estimate Partial Packing:")]');
     xpathLookingFor('//div[contains(text(),"Floors Extra to fee:")]');
     xpathLookingFor('//li[@id="tab_Inventory"]/span/i[@class="icon-check"]');
     xpathLookingFor('//li[@id="tab_Details"]/span/i[@class="icon-check"]');
     browser.sleep(sleepTime * 1);
     TryToClickXpath('//a[@ng-click="vm.Logout()"]', function () {
     browser.sleep(sleepTime * 2);
     });
     });
     });
     });
     it('Admin login', function () {
     browser.get(adminURL);
     browser.ignoreSynchronization = true; //��� ����� ��������
     TryToClickModel('email', function () {
     adminLogin();
     TryToClickXpath("//td[contains(text(),'" + requestId + "')]", function () {
     element(by.xpath("//td[contains(text(),'" + requestId + "')]")).click();

     });
     });
     });

     var TotalPackingsCost;
     var AdditionalServiesCost;
     var extras;
     var GrandTotal;

     it('confirming', function () {
     //-------------------------������ Not Confirmed
     TryToClickId('edit-status', function () {
     var status = element(by.id('edit-status'));
     browser.sleep(sleepTime * 1);
     status.all(by.tagName('option')).then(function (stats) {
     stats[1].click();
     });
     //openRequest(70511);
     //----------------------------�������� ��������
     var trucks = element.all(by.xpath('//div[@class="park_lot"]/div[@class="trucks"]/div'));
     trucks.count().then(function (c) {
     recurs = function (number, count, a, timeZone) { //������� ������� �����, ����� ���������� � ������ ����� � ������
     if (number < count) {  //���� ��� �� ����� �� �����
     trucks.get(number).getAttribute('class').then(function (css) {
     a.get(number).all(by.xpath('td/div/span')).count().then(function (result) { //������� ����� ������� ������
     if ((css == "dhx_matrix_scell truckid ng-binding ng-scope") && (result < (2 + timeZone))) { //���� ������ ���� � �������� �����, ����� ������ ��������
     browser.actions().click(trucks.get(number)).perform();
     //expect('tiknuli' + number).toEqual('');
     return true; //���������� true ��� ������������� ����
     } else { //����� ��� ������
     //expect('goNext:' + (number + 1)).toEqual('');
     return recurs(number + 1, count, a, timeZone); //���������� ��, ��� ��� ��������� �����
     }
     });
     });
     } else {

     element.all(by.xpath('//input[@value="8:00 AM"]')).count().then(function (count) {
     if (count > 0) {
     //expect('trying to change time').toEqual('');
     var truckTime = element(by.xpath('//input[@name="start_time"]'));
     truckTime.clear();
     truckTime.sendKeys("2:00 PM");
     recurs(0, c, a, timeZone + 1);
     } else {
     //expect('returning false').toEqual('');
     return false;
     }
     });
     }
     };
     var a = element.all(by.xpath('//tr[@ng-repeat="(tid,truck_name) in ::trucks"]'));
     var vibrali = recurs(0, c, a, 0);
     });
     browser.sleep(sleepTime * 5);

     //---------------------------------��������� packing � additional services
     element(by.xpath('//label[@ng-click="openAddPackingModal();"]')).click();
     browser.sleep(sleepTime * 5);
     extras = element.all(by.repeater("extra_charge in extra_charges"));
     extras.count().then(function (result) {
     result -= 2;
     extras.get(Math.floor(Math.random() * result + 1)).click();
     extras.get(Math.floor(Math.random() * result + 1)).click();
     extras.get(Math.floor(Math.random() * result + 1)).click();
     element(by.xpath('//div[contains(text(),"Total Packings")]')).getText().then(function (text) {
     TotalPackingsCost = Number(text.substr(text.indexOf('$') + 1));
     element(by.xpath('//button[@ng-click="save()"]')).click();
     TryToClickXpath('//label[@ng-click="openAddServicesModal();"]', function () {
     //element(by.xpath('//label[@ng-click="openAddServicesModal();"]')).click();
     browser.sleep(sleepTime * 5);
     var additionals = element.all(by.repeater("extra_charge in extra_charges"));
     additionals.count().then(function (result) {
     result -= 3;
     additionals.get(Math.floor(Math.random() * result + 2)).click();
     additionals.get(Math.floor(Math.random() * result + 2)).click();
     additionals.get(Math.floor(Math.random() * result + 2)).click();
     browser.sleep(sleepTime * 1);
     element(by.xpath('//div[contains(text(),"Total Services")]')).getText().then(function (text) {
     AdditionalServiesCost = Number(text.substr(text.indexOf('$') + 1));
     element(by.xpath('//button[@ng-click="save()"]')).click();
     browser.sleep(sleepTime * 6);
     element(by.xpath("//label[contains(text(),'Balance:')]/../div")).getText().then(function (balance) {
     GrandTotal = dollarAway(balance);
     });
     TryToClickXpath("//button[contains(text(),'Changes')]", function () {
     //element(by.xpath("//button[contains(text(),'Changes')]")).click();
     TryToClickXpath('//button[@ng-click="update(request)"]', function () {
     //element(by.xpath('//button[@ng-click="update(request)"]')).click();
     TryToClickXpath('//li[@heading="Settings"]/a', function () {

     //element(by.xpath('//li[@heading="Settings"]/a')).click();
     browser.sleep(sleepTime * 2);
     element(by.buttonText("Set Manager")).click();
     browser.sleep(sleepTime);
     element.all(by.repeater('manager in managersList')).then(function (managers) {
     managers[0].click();
     });
     TryToClickXpath('//div[@class="sweet-alert showSweetAlert visible"]/div/div/button', function () {
     TryToClickXpath('//div[@class="sweet-alert showSweetAlert visible"]/div/div/button', function () {
     adminLogout();
     });
     });
     });
     });
     });
     });
     });
     });
     });
     });
     });
     });
     it('go to client again', function () {
     browser.get(clientURL);
     browser.ignoreSynchronization = true; //��� ����� ��������
     TryToClickModel('email', function () {
     //clientLogin('oOaDeUZx@gmail.com', '123');
     clientLogin(email, '123');
     TryToClickXpath("//span[contains(text(),'Not Confirmed')]/../../td/button", function () {
     //temp = element(by.xpath("//span[contains(text(),'Not Confirmed')]/../../td/button")).click();
     browser.sleep(sleepTime * 3);
     var startButton = element.all(by.css('.request-button'));
     startButton.count().then(function (result) {
     if (result != 0) startButton.get(0).click();
     });
     browser.sleep(sleepTime * 1);
     });
     });
     });
     it('give a sign', function () {

     var totalPlace = element(by.xpath("//div[contains(text(),'Additional Services:')]/../div[2]/div/div[contains(text(),'Total')]/../div[2]"));
     totalPlace.getText().then(function (text) {
     expect((dollarAway(text) * 100) / 100).toEqual((AdditionalServiesCost * 100) / 100);
     });

     browser.sleep(sleepTime * 2);
     var startButton = element.all(by.css('.request-button'));
     startButton.count().then(function (result) {
     if (result != 0) startButton.get(0).click();
     });
     browser.sleep(sleepTime * 2);

     element(by.xpath("//div[@class=\"field-status notconfirmed ng-scope\"]/a")).click();
     browser.sleep(sleepTime * 3);

     element(by.xpath("//h2[contains(text(),'Grand Total')]/..")).getText().then(function (grandTotal) {
     expect(GrandTotal).toEqual(dollarAway(grandTotal));
     });


     element(by.id('terms')).click();
     element(by.id('cancel_policy')).click();
     browser.sleep(sleepTime);
     var payBtn = element.all(by.xpath("//*[@type='submit']"));
     payBtn.count().then(function (result) {
     if (result != 0) payBtn.get(0).click();
     });
     browser.sleep(sleepTime * 3);
     element(by.id("card_number")).sendKeys("4111111111111111");
     element(by.id("exp_month")).sendKeys("11");
     element(by.id("exp_year")).sendKeys("17");
     element(by.id("cvc")).sendKeys("333");

     element(by.xpath("//input[@type='submit']")).click();
     TryToClickXpath('//div[@class="sweet-alert showSweetAlert visible"]/div/div/button', function () {
     browser.sleep(sleepTime * 2);
     var canvas = element(by.id("signatureCanvasReserv"));
     for (i = 0; i < 100; i++) {
     browser.actions().mouseMove(canvas, {x: i, y: (i + 10)}).mouseDown().mouseMove(canvas, {
     x: (i),
     y: (i + 15)
     }).mouseUp().perform();
     }
     browser.sleep(sleepTime * 2);
     element(by.css('[ng-click="saveReservSignature()"]')).click();
     TryToClickXpath('//a[@ng-click="vm.Logout()"]', function () {
     //element(by.xpath('//a[@ng-click="vm.Logout()"]')).click();
     browser.sleep(sleepTime * 2);
     });
     });
     });
     */
    function xpathLookingFor(string) {
        var a = element.all(by.xpath(string)).count().then(function (count) {
            if (count === 0) {
                expect('Not Found ' + string).toEqual('');
            }
        });
    }

    function dollarAway(string) {
        return Number(string.substr(string.indexOf('$') + 1));
    }

    function NikolsanSign() {
        var canvas = element(by.id("signatureCanvas"));
        for (i = 100; i < 300; i++) {
            browser.actions()
                .mouseMove(canvas, {x: i, y: i + 5})
                .mouseDown()
                .mouseMove(canvas, {x: i + 25, y: i + 15})
                .mouseUp()
                .perform();
        }
        element(by.xpath('//button[@ng-click="saveStep()"]')).click();
    }

    function openRequest(r) {
        element(by.xpath("//td[contains(text(),'" + r + "')]")).click();
        element(by.xpath("//td[contains(text(),'" + r + "')]")).click();
        browser.sleep(sleepTime * 7);
    }

    function clientLogin(login, passwd) {
        element(by.model('email')).sendKeys(login);
        element(by.model('password')).sendKeys(passwd);
        element(by.xpath("//button[contains(text(),'Login')]")).submit();
        browser.sleep(sleepTime * 3);
    }

    function adminLogin() {
        element(by.model('email')).sendKeys(Admin_EmailId);
        element(by.model('password')).sendKeys(Admin_Password);
        element(by.xpath("//button[contains(text(),'Login')]")).submit();
        //browser.ignoreSynchronization = false;
    }

    function NikolsanLogin() {
        browser.get('http://secure.themoveboard.com/account/#/login');
        browser.ignoreSynchronization = true; //��� ����� ��������
        browser.sleep(sleepTime * 15);
        element(by.model('email')).sendKeys('nikolsan');
        element(by.model('password')).sendKeys('123');
        element(by.xpath("//button[contains(text(),'Login')]")).submit();
        //browser.ignoreSynchronization = false;
        browser.sleep(20000);
    }

    function sweetConfirm() {
        var confirmBtn = element.all(by.xpath('//div[@class="sweet-alert showSweetAlert visible"]/div/div/button'));
        confirmBtn.count().then(function (result) {
            if (result != 0) confirmBtn.get(0).click();
        });
    }

    function adminLogout() {
        //browser.actions().sendKeys(protractor.Key.ESCAPE).perform();


        var TryToClick2 = function (count) {
            browser.sleep(sleepTime * 2);
            if (count === undefined) count = 0;
            element(by.css('.meta')).click().then(function () {
                browser.sleep(sleepTime * 2);
                element(by.css('[ng-click="vm.Logout()"]')).click();
                browser.sleep(sleepTime * 4);
            }, function (err) {
                if (count < repeats) {
                    TryToClick2(count + 1);
                } else {
                    console.error("can't logout " + err);
                    throw err;
                }
            });
        };
        var TryToClick1 = function (count) {
            browser.sleep(sleepTime * 2);
            if (count === undefined) count = 0;
            element(by.xpath('//button[@ng-click="cancel()"]')).click().then(function () {
                TryToClick2();
            }, function (err) {
                if (count < repeats) {
                    TryToClick1(count + 1);
                } else {
                    TryToClick2();
                }
            });
        };

        TryToClick1(10);

    }

    function randomBukva(length) {
        var bukva = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
        var s = "";
        for (i = 0; i < length; i++) {
            s += bukva.charAt(Math.floor(Math.random() * bukva.length));
        }
        return s;
    }

    function randomBukvaSmall(length) {
        var bukva = "abcdefghijklmnopqrstuvwxyz";
        var s = "";
        for (i = 0; i < length; i++) {
            s += bukva.charAt(Math.floor(Math.random() * bukva.length));
        }
        return s;
    }

    function randomCifra(length) {
        var s = "";
        for (i = 0; i < length; i++) {
            s += Math.floor(Math.random() * 10);
        }
        return s;
    }

    function TryToClickModel(string, next, count) {
        if (next === undefined) {
            next = function () {
                browser.sleep(sleepTime);
            };
        }
        busy = 'T';
        browser.sleep(sleepTime * 2);
        if (count === undefined) count = 0;
        element(by.model(string)).click().then(function () {
            console.log("Clicked!");
            busy = 'F';
            next();
        }, function (err) {
            if (count < repeats) {
                console.log("Trying to click " + string + '...' + count);
                TryToClickModel(string, next, count + 1);
            } else {
                expect('model ' + string + ' notClickable!!!').toEqual('');
                throw err;
            }
        });
    }

    function TryToClickXpath(string, next, count) {
        if (next === undefined) {
            next = function () {
                browser.sleep(sleepTime);
            };
        }
        busy = 'T';
        browser.sleep(sleepTime * 2);
        if (count === undefined) count = 0;
        element(by.xpath(string)).click().then(function () {
            console.log("Clicked!");
            busy = 'F';
            next();
        }, function (err) {
            if (count < repeats) {
                console.log("Trying to click " + string + '...' + count);
                TryToClickXpath(string, next, count + 1);
            } else {
                expect('Xpath ' + string + ' notClickable!!!').toEqual('');
                throw err;
            }
        });
    }

    function TryToClickId(string, next, count) {
        if (next === undefined) {
            next = function () {
                browser.sleep(sleepTime);
            };
        }
        busy = 'T';
        browser.sleep(sleepTime * 2);
        if (count === undefined) count = 0;
        element(by.id(string)).click().then(function () {
            console.log("Clicked!");
            busy = 'F';
            next();
        }, function (err) {
            if (count < repeats) {
                console.log("Trying to click " + string + '...' + count);
                TryToClickId(string, next, count + 1);
            } else {
                expect('Id ' + string + ' notClickable!!!').toEqual('');
                throw err;
            }
        });
    }

    function TryToClickCss(string, next, count) {
        if (next === undefined) {
            next = function () {
                browser.sleep(sleepTime);
            };
        }
        busy = 'T';
        browser.sleep(sleepTime * 2);
        if (count === undefined) count = 0;
        element(by.css(string)).click().then(function () {
            console.log("Clicked!");
            busy = 'F';
            next();
        }, function (err) {
            if (count < repeats) {
                console.log("Trying to click " + string + '...' + count);
                TryToClickCss(string, next, count + 1);
            } else {
                expect('css ' + string + ' notClickable!!!').toEqual('');
                throw err;
            }
        });
    }
});
