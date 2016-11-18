/**
 * Created by Ribka on 10.09.2016.
 */
describe('Searching test', function () {

	var zipFrom = "02461";
	var zipTo = "02111";
	var clientPage = 'http://stage.themoveboard.com/account/#/login';
	var adminPage = 'http://stage.themoveboard.com/moveBoard/#/dashboard';
	var temp, i, j, k;
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
	var sleepTime=1500;
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


	it('admin Login', function () {
		adminLogin();
	});


	it('creating Client', function () {
		element(by.xpath('//a[@ng-click="vm.openEditModal()"]')).click();
		browser.sleep(sleepTime*2);
		element(by.xpath('//select[@ng-options="service.id as service.title for service in services"]/option[1]')).click();//�������� Moving & Storage
		element(by.id('edit-move-date-datepicker-popup-0')).click();
		browser.sleep(sleepTime*1);
		element(by.xpath('//td[@data-month="' + future.getMonth() + '" and @data-year="' + future.getFullYear() + '"]/a[contains(text(),"' + future.getDate() + '")]')).click();
		browser.sleep(sleepTime*2);
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
		browser.sleep(sleepTime*2);
		element(by.xpath('//button[@ng-click="Calculate()"]')).click();
		browser.sleep(sleepTime*2);
		element(by.xpath('//button[contains(text(),"Continue")]')).click();
		browser.sleep(sleepTime*2);
		element(by.model("editrequest.account.fields.field_user_first_name")).sendKeys(firstName);
		element(by.model("editrequest.account.fields.field_user_last_name")).sendKeys(lastName);
		element(by.model("editrequest.account.mail")).sendKeys(email);
		element(by.model("editrequest.account.fields.field_primary_phone")).sendKeys(phone);
		browser.actions().sendKeys(protractor.Key.ENTER).perform();
		browser.sleep(sleepTime*2);
		element(by.xpath('//button[contains(text(),"Create")]')).click();
		browser.sleep(sleepTime*15);
		element(by.xpath('//ul[@class="nav nav-tabs"]/li[1]/a')).getText().then(function (text) {
			requestId = Number(text.substr(text.indexOf('#') + 1));
		});
		browser.sleep(sleepTime*4);
		element(by.xpath('//button[@ng-click="cancel()"]')).click();
		browser.sleep(sleepTime*2);
	});

	it('searching', function () {
		var search = element(by.model('search'));
		var checking = function (param){
			search.sendKeys(param);
			browser.sleep(sleepTime*3);
			expect(element(by.xpath('//li[@ng-click="requestEditModal(request)"]/div[1]')).getText()).toEqual(''+requestId);
			element.all(by.xpath('//li[@ng-click="requestEditModal(request)"]/div[2]/span')).count().then(function (spans){
				if (spans === 0) {
					expect(element(by.xpath('//li[@ng-click="requestEditModal(request)"]/div[2]')).getText()).toEqual(fullName);
				} else {
					expect(element(by.xpath('//li[@ng-click="requestEditModal(request)"]/div[2]/span')).getText()).toEqual(fullName);
				}
			});
			element.all(by.xpath('//li[@ng-click="requestEditModal(request)"]/div[3]/span')).count().then(function (spans){
				if (spans === 0) {
					expect(element(by.xpath('//li[@ng-click="requestEditModal(request)"]/div[3]')).getText()).toEqual(email);
				} else {
					expect(element(by.xpath('//li[@ng-click="requestEditModal(request)"]/div[3]/span')).getText()).toEqual(email);
				}
			});
			expect(element(by.xpath('//li[@ng-click="requestEditModal(request)"]/div[4]')).getText()).toEqual('('+phone.substr(0,3)+') '+phone.substr(3,3)+'-'+phone.substr(6));
			browser.sleep(sleepTime*3);
			search.clear();
		};
		checking(requestId);
		checking(fullName);
		checking(email);
		checking(phone);
	});



	function xpathLookingFor(string){
		var a = element.all(by.xpath(string)).count().then(function(count){
			if (count === 0){
				expect('Not Found '+string).toEqual('');
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
		browser.sleep(sleepTime*7);
	}

	function clientLogin(login, passwd) {
		browser.get(clientPage);
		browser.ignoreSynchronization = true; //��� ����� ��������
		browser.sleep(sleepTime*12);
		element(by.model('email')).sendKeys(login);
		element(by.model('password')).sendKeys(passwd);
		element(by.xpath("//button[contains(text(),'Login')]")).submit();
		browser.sleep(sleepTime*5);
	}

	function adminLogin() {
		browser.get(adminPage);
		browser.ignoreSynchronization = true; //��� ����� ��������
		browser.sleep(sleepTime*15);
		element(by.model('email')).sendKeys(Admin_EmailId);
		element(by.model('password')).sendKeys(Admin_Password);
		element(by.xpath("//button[contains(text(),'Login')]")).submit();
		//browser.ignoreSynchronization = false;
		browser.sleep(sleepTime*10);
	}

	function NikolsanLogin() {
		browser.get(adminPage);
		browser.ignoreSynchronization = true; //��� ����� ��������
		browser.sleep(sleepTime*15);
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
		element(by.xpath('//button[@ng-click="cancel()"]')).click();
		browser.sleep(sleepTime*4);
		element(by.css('.meta')).click();
		browser.sleep(sleepTime*3);
		element(by.css('[ng-click="vm.Logout()"]')).click();
		browser.sleep(sleepTime*4);
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

});
