describe('Protractor Demo App', function () {

    var localDispatchURL = browser.params.localDispatchURL;
    var clientPage = browser.params.accountURL;
    var adminPage = browser.params.adminURL;
    var zipFrom = "02461";
    var zipTo = "02111";
    var temp, i, j, k;
    var Admin_EmailId = "roma4ke";
    var Admin_Password = "root";
    var firstName = randomBukva(6) + "_name";
    var lastName = randomBukva(5) + "_fam";
    var fullName = firstName + ' ' + lastName;
    var phone = randomCifra(10);
    var email = randomBukvaSmall(8) + "@gmail.com";
    var requestId1;
    var requestId2;
    var requestId3;
    var now = new Date();
    var msInDay = 86400000;
    var future = new Date(now.getTime() + msInDay * 5);//4 ��� �����
    var farFuture = new Date(now.getTime() + msInDay * 6);//8 ��� �����
    var moveDate = {month: 0, day: 0, year: 0};
    var sleepTime = 1500;
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
    var theTruck;
    var theTime = '';

    it('admin Login', function () {
        console.log(browser.params);
        adminLogin();
    });
    it('creating Client', function () {
        element(by.xpath('//a[@ng-click="vm.openEditModal()"]')).click();
        browser.sleep(sleepTime * 2);
        element(by.xpath('//select[@ng-options="service.id as service.title for service in services"]/option[1]')).click();//�������� Moving & Storage
        element(by.id('edit-move-date-datepicker-popup-0')).click();
        browser.sleep(sleepTime * 1);
        element(by.xpath('//td[@data-month="' + future.getMonth() + '" and @data-year="' + future.getFullYear() + '"]/a[contains(text(),"' + future.getDate() + '")]')).click();
        browser.sleep(sleepTime * 2);
        var sizeOfMove = element.all(by.xpath('//select[@ng-model="editrequest.data.field_size_of_move"]/option'));
        sizeOfMove.count().then(function (count) {
            count--;
            sizeOfMove.get(Math.floor(Math.random() * count)).click();
        });
        var moveFrom = element.all(by.xpath('//select[@id="edit-type-from"]/option'));
        moveFrom.count().then(function (count) {
            count -= 2;
            moveFrom.get(Math.floor(Math.random() * count) + 1).click();
        });
        element(by.xpath('(//input[@id="edit-zip-code-from"])[1]')).sendKeys(zipFrom);

        var moveTo = element.all(by.xpath('//select[@id="edit-type-to"]/option'));
        moveTo.count().then(function (count) {
            count -= 2;
            moveTo.get(Math.floor(Math.random() * count) + 1).click();
        });
        element(by.xpath('(//input[@id="edit-zip-code-from"])[2]')).sendKeys(zipTo);
        browser.actions().sendKeys(protractor.Key.ENTER).perform();
        browser.sleep(sleepTime * 2);
        element(by.xpath('//button[@ng-click="Calculate()"]')).click();
        browser.sleep(sleepTime * 2);
        element(by.xpath('//button[contains(text(),"Continue")]')).click();
        browser.sleep(sleepTime * 10);
        element(by.model("editrequest.account.fields.field_user_first_name")).sendKeys(firstName);
        element(by.model("editrequest.account.fields.field_user_last_name")).sendKeys(lastName);
        element(by.model("editrequest.account.mail")).sendKeys(email);
        element(by.model("editrequest.account.fields.field_primary_phone")).sendKeys(phone);
        browser.actions().sendKeys(protractor.Key.ENTER).perform();
        browser.sleep(sleepTime * 2);
        element(by.xpath('//button[contains(text(),"Create")]')).click();
        browser.sleep(sleepTime * 15);
    });
    it('select truck & confirm', function () {
        //----------------------------�������� ��������
        var trucks = element.all(by.xpath('//div[@class="park_lot"]/div[@class="trucks"]/div'));
        trucks.count().then(function (c) {
            recurs = function (number, count, a, timeZone) { //������� ������� �����, ����� ���������� � ������ ����� � ������
                if (number < count) {  //���� ��� �� ����� �� �����
                    trucks.get(number).getAttribute('class').then(function (css) {
                        a.get(number).all(by.xpath('td/div/span')).count().then(function (result) { //������� ����� ������� ������
                            if ((css == "dhx_matrix_scell truckid ng-binding ng-scope") && (result < (2 + timeZone))) { //���� ������ ���� � �������� �����, ����� ������ ��������
                                browser.actions().click(trucks.get(number)).perform();
                                theTruck = number;
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
                            theTime = true;
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
        //-------------------------������ NOT Confirmed
        var status = element(by.id('edit-status'));
        status.click();
        browser.sleep(sleepTime * 1);
        status.all(by.tagName('option')).then(function (stats) {
            stats[1].click();
        });
        browser.sleep(sleepTime * 1);
        element(by.xpath('//ul[@class="nav nav-tabs"]/li[1]/a')).getText().then(function (text) {
            requestId1 = Number(text.substr(text.indexOf('#') + 1));
            element(by.model('request.field_moving_from.thoroughfare')).sendKeys(randomBukva(8) + requestId1);
        });
        browser.sleep(sleepTime * 6);

        element(by.xpath("//button[contains(text(),'Changes')]")).click();
        browser.sleep(sleepTime * 6);
        element(by.xpath("//div[contains(text(),'Update request and send emails')]")).click();
        browser.sleep(sleepTime * 10);
        //-----------------------------------��� �� ������� Client
        element(by.xpath('//li[@heading="Client"]/a')).click();
        browser.sleep(sleepTime * 2);
        element(by.model('client.password')).sendKeys('123');
        browser.sleep(sleepTime * 2);
        element(by.xpath("//button[contains(text(),'Update')]")).click();
        browser.sleep(sleepTime * 7);
        element(by.xpath('//button[@ng-click="cancel()"]')).click();
        browser.sleep(sleepTime * 4);
    });
    it('creating Client2', function () {
        element(by.xpath('//a[@ng-click="vm.openEditModal()"]')).click();
        browser.sleep(sleepTime * 2);
        element(by.xpath('//select[@ng-options="service.id as service.title for service in services"]/option[1]')).click();//�������� Moving & Storage
        element(by.id('edit-move-date-datepicker-popup-0')).click();
        browser.sleep(sleepTime * 1);
        element(by.xpath('//td[@data-month="' + future.getMonth() + '" and @data-year="' + future.getFullYear() + '"]/a[contains(text(),"' + future.getDate() + '")]')).click();
        browser.sleep(sleepTime * 2);
        var sizeOfMove = element.all(by.xpath('//select[@ng-model="editrequest.data.field_size_of_move"]/option'));
        sizeOfMove.count().then(function (count) {
            count--;
            sizeOfMove.get(Math.floor(Math.random() * count)).click();
        });
        var moveFrom = element.all(by.xpath('//select[@id="edit-type-from"]/option'));
        moveFrom.count().then(function (count) {
            count -= 2;
            moveFrom.get(Math.floor(Math.random() * count) + 1).click();
        });
        element(by.xpath('(//input[@id="edit-zip-code-from"])[1]')).sendKeys(zipFrom);

        var moveTo = element.all(by.xpath('//select[@id="edit-type-to"]/option'));
        moveTo.count().then(function (count) {
            count -= 2;
            moveTo.get(Math.floor(Math.random() * count) + 1).click();
        });
        element(by.xpath('(//input[@id="edit-zip-code-from"])[2]')).sendKeys(zipTo);
        browser.actions().sendKeys(protractor.Key.ENTER).perform();
        browser.sleep(sleepTime * 2);
        element(by.xpath('//button[@ng-click="Calculate()"]')).click();
        browser.sleep(sleepTime * 2);
        element(by.xpath('//button[contains(text(),"Continue")]')).click();
        browser.sleep(sleepTime * 10);
        element(by.model("editrequest.account.fields.field_user_first_name")).sendKeys(firstName + "2");
        element(by.model("editrequest.account.fields.field_user_last_name")).sendKeys(lastName + "2");
        element(by.model("editrequest.account.mail")).sendKeys(randomBukvaSmall(8) + "@gmail2.com");
        element(by.model("editrequest.account.fields.field_primary_phone")).sendKeys(randomCifra(10));
        browser.actions().sendKeys(protractor.Key.ENTER).perform();
        browser.sleep(sleepTime * 2);
        element(by.xpath('//button[contains(text(),"Create")]')).click();
        browser.sleep(sleepTime * 15);
    });
    it('select truck & confirm 2', function () {
        //----------------------------�������� ��������
        var trucks = element.all(by.xpath('//div[@class="park_lot"]/div[@class="trucks"]/div'));
        if (theTime !== '') {
            var truckTime = element(by.xpath('//input[@name="start_time"]'));
            truckTime.clear();
            truckTime.sendKeys("2:00 PM");
        }
        browser.actions().click(trucks.get(theTruck)).perform();
        browser.sleep(sleepTime * 5);

        //-------------------------������ NOT Confirmed
        var status = element(by.id('edit-status'));
        status.click();
        browser.sleep(sleepTime * 1);
        status.all(by.tagName('option')).then(function (stats) {
            stats[1].click();
        });
        browser.sleep(sleepTime * 1);
        element(by.xpath('//ul[@class="nav nav-tabs"]/li[1]/a')).getText().then(function (text) {
            requestId2 = Number(text.substr(text.indexOf('#') + 1));
            element(by.model('request.field_moving_from.thoroughfare')).sendKeys(randomBukva(8) + requestId2);
        });
        browser.sleep(sleepTime * 6);

        element(by.xpath("//button[contains(text(),'Changes')]")).click();
        browser.sleep(sleepTime * 6);
        element(by.xpath("//div[contains(text(),'Update request and send emails')]")).click();
        browser.sleep(sleepTime * 10);
        //-----------------------------------��� �� ������� Client
        element(by.xpath('//li[@heading="Client"]/a')).click();
        browser.sleep(sleepTime * 2);
        element(by.model('client.password')).sendKeys('123');
        browser.sleep(sleepTime * 2);
        element(by.xpath("//button[contains(text(),'Update')]")).click();
        browser.sleep(sleepTime * 7);
        element(by.xpath('//button[@ng-click="cancel()"]')).click();
        browser.sleep(sleepTime * 4);
    });

    it('creating Client3', function () {
        element(by.xpath('//a[@ng-click="vm.openEditModal()"]')).click();
        browser.sleep(sleepTime * 2);
        element(by.xpath('//select[@ng-options="service.id as service.title for service in services"]/option[1]')).click();//�������� Moving & Storage
        element(by.id('edit-move-date-datepicker-popup-0')).click();
        browser.sleep(sleepTime * 1);
        element(by.xpath('//td[@data-month="' + future.getMonth() + '" and @data-year="' + future.getFullYear() + '"]/a[contains(text(),"' + future.getDate() + '")]')).click();
        browser.sleep(sleepTime * 2);
        var sizeOfMove = element.all(by.xpath('//select[@ng-model="editrequest.data.field_size_of_move"]/option'));
        sizeOfMove.count().then(function (count) {
            count--;
            sizeOfMove.get(Math.floor(Math.random() * count)).click();
        });
        var moveFrom = element.all(by.xpath('//select[@id="edit-type-from"]/option'));
        moveFrom.count().then(function (count) {
            count -= 2;
            moveFrom.get(Math.floor(Math.random() * count) + 1).click();
        });
        element(by.xpath('(//input[@id="edit-zip-code-from"])[1]')).sendKeys(zipFrom);

        var moveTo = element.all(by.xpath('//select[@id="edit-type-to"]/option'));
        moveTo.count().then(function (count) {
            count -= 2;
            moveTo.get(Math.floor(Math.random() * count) + 1).click();
        });
        element(by.xpath('(//input[@id="edit-zip-code-from"])[2]')).sendKeys(zipTo);
        browser.actions().sendKeys(protractor.Key.ENTER).perform();
        browser.sleep(sleepTime * 2);
        element(by.xpath('//button[@ng-click="Calculate()"]')).click();
        browser.sleep(sleepTime * 2);
        element(by.xpath('//button[contains(text(),"Continue")]')).click();
        browser.sleep(sleepTime * 10);
        element(by.model("editrequest.account.fields.field_user_first_name")).sendKeys(firstName + "3");
        element(by.model("editrequest.account.fields.field_user_last_name")).sendKeys(lastName + "3");
        element(by.model("editrequest.account.mail")).sendKeys(randomBukvaSmall(8) + "@gmail3.com");
        element(by.model("editrequest.account.fields.field_primary_phone")).sendKeys(randomCifra(10));
        browser.actions().sendKeys(protractor.Key.ENTER).perform();
        browser.sleep(sleepTime * 2);
        element(by.xpath('//button[contains(text(),"Create")]')).click();
        browser.sleep(sleepTime * 15);
    });
    it('select truck & confirm 3', function () {
        //----------------------------�������� ��������
        var trucks = element.all(by.xpath('//div[@class="park_lot"]/div[@class="trucks"]/div'));
        if (theTime !== '') {
            var truckTime = element(by.xpath('//input[@name="start_time"]'));
            truckTime.clear();
            truckTime.sendKeys("2:00 PM");
        }
        browser.actions().click(trucks.get(theTruck)).perform();
        browser.sleep(sleepTime * 5);

        //-------------------------������ NOT Confirmed
        var status = element(by.id('edit-status'));
        status.click();
        browser.sleep(sleepTime * 1);
        status.all(by.tagName('option')).then(function (stats) {
            stats[1].click();
        });
        browser.sleep(sleepTime * 1);
        element(by.xpath('//ul[@class="nav nav-tabs"]/li[1]/a')).getText().then(function (text) {
            requestId3 = Number(text.substr(text.indexOf('#') + 1));
            element(by.model('request.field_moving_from.thoroughfare')).sendKeys(randomBukva(8) + requestId3);
        });
        browser.sleep(sleepTime * 6);
        element(by.xpath("//button[contains(text(),'Changes')]")).click();
        browser.sleep(sleepTime * 6);
        element(by.xpath("//div[contains(text(),'Update request and send emails')]")).click();
        browser.sleep(sleepTime * 10);
        //-----------------------------------��� �� ������� Client
        element(by.xpath('//li[@heading="Client"]/a')).click();
        browser.sleep(sleepTime * 2);
        element(by.model('client.password')).sendKeys('123');
        browser.sleep(sleepTime * 2);
        element(by.xpath("//button[contains(text(),'Update')]")).click();
        browser.sleep(sleepTime * 7);
        element(by.xpath('//button[@ng-click="cancel()"]')).click();
        browser.sleep(sleepTime * 4);
    });

    it('logout', function () {
        adminLogout();
    });


    it('go to client', function () {
        //clientLogin('suabetpf@gmail.com', '123');
        clientLogin(email, '123');
        temp = element(by.xpath("//span[contains(text(),'Not Confirmed')]/../../td/button")).click();
        browser.sleep(sleepTime * 3);
        var startButton = element.all(by.css('.request-button'));
        startButton.count().then(function (result) {
            if (result != 0) startButton.get(0).click();
        });
        browser.sleep(sleepTime * 1);
    });
    it('give a sign', function () {
        element(by.xpath("//div[@class=\"field-status notconfirmed ng-scope\"]/a")).click();
        browser.sleep(sleepTime * 3);

        element(by.id('terms')).click();
        element(by.id('cancel_policy')).click();
        browser.sleep(500);
        var payBtn = element.all(by.xpath("//*[@type='submit']"));
        payBtn.count().then(function (result) {
            if (result != 0) payBtn.get(0).click();
        });
        browser.sleep(sleepTime * 4);
        sweetConfirm();
        browser.sleep(sleepTime * 4);
        element(by.xpath('//input[@field="request.apt_from"]')).sendKeys(randomCifra(2));
        element(by.xpath('//input[@field="request.field_moving_to"]')).sendKeys(randomBukva(5));
        element(by.xpath('//input[@field="request.apt_to"]')).sendKeys(randomCifra(2));
        element(by.xpath('//button[@ng-click="update(client)"]')).click();
        browser.sleep(sleepTime * 1);
        sweetConfirm();
        browser.sleep(sleepTime * 3);
        sweetConfirm();
        browser.sleep(sleepTime * 4);
        element(by.id("card_number")).sendKeys("4111111111111111");
        element(by.id("exp_month")).sendKeys("11");
        element(by.id("exp_year")).sendKeys("18");
        element(by.id("cvc")).sendKeys("333");

        element(by.xpath("//input[@type='submit']")).click();
        browser.sleep(sleepTime * 8);
        sweetConfirm();
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
        browser.sleep(sleepTime * 8);
        element(by.xpath('//a[@ng-click="vm.Logout()"]')).click();
        browser.sleep(sleepTime * 8);
    });

    it('admin Login', function () {
        adminLogin();
    });
    it('looking for data-pending', function () {
        xpathLookingFor('//td[@ng-click="requestEditModal(request)" and contains(text(),"' + requestId2 + '")]/../td/span[contains(text(),"Date Pending")]');
        xpathLookingFor('//td[@ng-click="requestEditModal(request)" and contains(text(),"' + requestId3 + '")]/../td/span[contains(text(),"Date Pending")]');
    });


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
        browser.get(clientPage);
        browser.ignoreSynchronization = true; //��� ����� ��������
        browser.sleep(sleepTime * 2);
        element(by.model('email')).sendKeys(login);
        element(by.model('password')).sendKeys(passwd);
        element(by.xpath("//button[contains(text(),'Login')]")).submit();
        browser.sleep(sleepTime * 5);
    }

    function adminLogin() {
        browser.get(adminPage);
        browser.ignoreSynchronization = true; //��� ����� ��������
        browser.sleep(sleepTime * 15);
        element(by.model('email')).sendKeys(Admin_EmailId);
        element(by.model('password')).sendKeys(Admin_Password);
        element(by.xpath("//button[contains(text(),'Login')]")).submit();
        //browser.ignoreSynchronization = false;
        browser.sleep(sleepTime * 10);
    }

    function NikolsanLogin() {
        browser.get('http://secure.themoveboard.com/account/#/login');
        browser.ignoreSynchronization = true; //��� ����� ��������
        browser.sleep(sleepTime * 15);
        element(by.model('email')).sendKeys('nikolsan');
        element(by.model('password')).sendKeys('123');
        element(by.xpath("//button[contains(text(),'Login')]")).submit();
        //browser.ignoreSynchronization = false;
        browser.sleep(sleepTime * 20);
    }

    function sweetConfirm() {
        var confirmBtn = element.all(by.xpath('//div[@class="sweet-alert showSweetAlert visible"]/div/div/button'));
        confirmBtn.count().then(function (result) {
            if (result != 0) confirmBtn.get(0).click();
        });
    }

    function adminLogout() {
        element(by.css('.meta')).click();
        browser.sleep(sleepTime * 3);
        element(by.css('[ng-click="vm.Logout()"]')).click();
        browser.sleep(sleepTime * 4);
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

    function xpathLookingFor(string) {
        var a = element.all(by.xpath(string)).count().then(function (count) {
            if (count === 0) {
                expect('Not Found ' + string).toEqual('');
            }
        });
    }
});