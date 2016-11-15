/**
 * Created by Ribka on 10.09.2016.
 */
describe('Protractor Demo App', function () {

	var pendingUrl = "http://secure.themoveboard.com/moveBoard/#/storages/pending";
	var adminUrl = 'http://secure.themoveboard.com/moveBoard/#/dashboard';
	var zipFrom = "02461";
	var zipTo = "02111";
	var temp, i, j, k;
	var Admin_EmailId = "roma4ke";
	var Admin_Password = "root";
	var firstName = randomBukva(6) + "_name";
	var lastName = randomBukva(5) + "_fam";
	var fullName = firstName + ' ' + lastName;
	var phone = randomCifra(10);
	var email = randomBukva(8) + "@gmail.com";
	var requestId;
	var now = new Date();
	var future = new Date(now.getFullYear(), now.getMonth() + 1, now.getDate()+2);
	var farFuture = new Date(now.getFullYear(), now.getMonth() + 3, now.getDate()+2);
	var monthNamesForRequest = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
	var moveDate = {month: 0, day: 0, year: 0};
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

	it('admin Login', function () {
		adminLogin();
	});


	it('creating Client', function () {
		element(by.xpath('//a[@ng-click="vm.openEditModal()"]')).click();
		browser.sleep(2000);
		element(by.xpath('//select[@ng-options="service.id as service.title for service in services"]/option[2]')).click();//выбираем Moving & Storage
		browser.sleep(2000);
		element(by.id('edit-move-date-datepicker-popup-0')).clear();
		element(by.id('edit-move-date-datepicker-popup-0')).sendKeys(monthNamesForRequest[future.getMonth()] + " " + future.getDate() + ", " + future.getFullYear());
		browser.sleep(2000);
		element(by.id('edit-date-storage-datepicker-popup-0')).clear();
		element(by.id('edit-date-storage-datepicker-popup-0')).sendKeys(monthNamesForRequest[farFuture.getMonth()] + " " + farFuture.getDate() + ", " + farFuture.getFullYear());
		browser.sleep(2000);
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
		element(by.xpath('//button[@ng-click="Calculate()"]')).click();
		browser.sleep(2000);
		element(by.xpath('//button[contains(text(),"Continue")]')).click();
		browser.sleep(2000);
		element(by.model("editrequest.account.fields.field_user_first_name")).sendKeys(firstName);
		element(by.model("editrequest.account.fields.field_user_last_name")).sendKeys(lastName);
		element(by.model("editrequest.account.mail")).sendKeys(email);
		element(by.model("editrequest.account.fields.field_primary_phone")).sendKeys(phone);
		element(by.xpath('//button[contains(text(),"Create")]')).click();
		browser.sleep(20000);
	});


	it('select truck & confirm', function () {
		//----------------------------выбираем грузовик
		var trucks = element.all(by.xpath('//div[@class="park_lot"]/div[@class="trucks"]/div'));
		trucks.count().then(function (c) {
			recurs = function (number, count, a, timeZone) { //передаём текущий номер, общее количество и массив строк и проход
				if (number < count) {  //Если ещё не дошли до конца
					trucks.get(number).getAttribute('class').then(function (css) {
						a.get(number).all(by.xpath('td/div/span')).count().then(function (result) { //считаем спаны текущей строки
							if ((css == "dhx_matrix_scell truckid ng-binding ng-scope") && (result < (2 + timeZone))) { //если спанов мало и грузовик виден, тогда тыкаем грузовик
								browser.actions().click(trucks.get(number)).perform();
								//expect('tiknuli' + number).toEqual('');
								return true; //возвращаем true как подтверждение тыка
							} else { //иначе идём дальше
								//expect('goNext:' + (number + 1)).toEqual('');
								return recurs(number + 1, count, a, timeZone); //возвращаем то, что нам передадут позже
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
		//-------------------------ставим Confirmed
		var status = element(by.id('edit-status'));
		status.click();
		browser.sleep(1000);
		status.all(by.tagName('option')).then(function (stats) {
			stats[2].click();
		});
		browser.sleep(1000);
		element(by.xpath('//ul[@class="nav nav-tabs"]/li[1]/a')).getText().then(function (text) {
			requestId = Number(text.substr(text.indexOf('#') + 1));
			element(by.model('request.field_moving_from.thoroughfare')).sendKeys(randomBukva(8) + requestId);
		});
		browser.sleep(2000);

		element(by.xpath("//button[contains(text(),'Changes')]")).click();
		browser.sleep(6000);
		element(by.xpath("//div[contains(text(),'Update request and send emails')]")).click();
		browser.sleep(10000);
		element(by.xpath('//div[@class="sa-confirm-button-container"]/button')).click();
		browser.sleep(4000);
		sweetConfirm();
		browser.sleep(4000);
		element(by.xpath('//button[@ng-click="closeModal()"]')).click();
		browser.sleep(4000);
		element(by.xpath('//button[@ng-click="cancel()"]')).click();
		browser.sleep(4000);

	});


	it('GoToPending', function () {
		//requestId = 70543;//*************************************************************!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
		browser.get(pendingUrl);
		browser.sleep(6000);
		element(by.xpath('//th[contains(text(),"Move Request #")]')).click();
		browser.sleep(1000);
		element(by.xpath('//th[contains(text(),"Move Request #")]')).click();
		browser.sleep(2000);
		OpenRequest(requestId);
	});

	it('ExpectPending', function () {
		expect(element(by.binding('data.user_info.name')).getText()).toEqual(fullName);
		expect(element(by.binding('data.user_info.phone1')).getText()).toEqual('('+phone.substr(0,3)+') '+phone.substr(3,3)+'-'+phone.substr(6));
		expect(element(by.binding('data.user_info.email')).getText()).toEqual(email);
		element(by.model('data.rentals.volume_cuft')).clear();
		element(by.model('data.rentals.volume_cuft')).sendKeys(600);
		element(by.xpath('//button[@ng-click="updateStorageRequest(data)"]')).click();
		browser.sleep(4000);
		element(by.css('.sa-confirm-button-container')).element(by.tagName('button')).click();
		browser.sleep(4000);
		element(by.xpath('//button[@ng-click="closeModal()"]')).click();
		browser.sleep(2000);
		ReOpenRequest(requestId);
		element(by.model('data.rentals.volume_cuft')).sendKeys("");
		browser.sleep(2000);
		expect(element(by.model('data.rentals.volume_cuft')).getAttribute('value')).toEqual('600');
		expect(element(by.id("monthlyRate")).getAttribute('value')).toEqual('$240.00');
	});
	it('Logs', function () {
		element(by.xpath('//li[@heading="Log"]')).click();
		browser.sleep(4000);
		xpathLookingFor('//b[contains(text(),"Storage Request was created")]');
		xpathLookingFor('//b[contains(text(),"Volume cuft was changed")]');
		browser.sleep(2000);
	});
	it('GoToLedger', function () {
		element(by.xpath('//li[@heading="Ledger"]')).click();
		browser.sleep(2000);
		element(by.xpath('(//button[@ng-click="openPayment()"])[2]')).click();
		browser.sleep(4000);
	});
	it('FirstPay', function () {
		element(by.xpath('(//a[@ng-click="addAuthPayment()"])')).click();
		browser.sleep(2000);
		element(by.model('charge_value.value')).sendKeys(240);
		element(by.xpath('(//button[@ng-click="goStepTwo();"])')).click();
		browser.sleep(3000);
		element(by.id("card_number")).sendKeys("4111111111111111");
		element(by.id("exp_month")).sendKeys("11");
		element(by.id("exp_year")).sendKeys("17");
		element(by.id("cvc")).sendKeys("333");
		element(by.xpath("//input[@type='submit']")).click();
		browser.sleep(12000);
		element(by.css('.sa-confirm-button-container')).element(by.tagName('button')).click();
		browser.sleep(4000);
		sweetConfirm();
		browser.sleep(4000);
		element(by.buttonText("Close")).click();
		browser.sleep(2000);
	});
	it('ProRating', function () {
		element(by.xpath('//a[@ng-click="proRate()"]')).click();
		browser.sleep(4000);
		//считаем стоимость дня в гараже
		var days1 = new Date(future.getFullYear(), future.getMonth() + 1, 0).getDate();//количество дней в первом месяце хранения
		var days1Cost = Math.floor((240 / days1) * (days1 - future.getDate()));
		expect(element(by.xpath('//div[contains(text(),"Total Due")]/../div[2]')).getText()).toEqual(days1Cost);
		browser.sleep(500);
		element(by.xpath('//a[@ng-click="sendInvoice()"]')).click();
		browser.sleep(3000);
		element(by.xpath('//a[@ng-click="save()"]')).click();
		browser.sleep(3000);
		element(by.buttonText("Close")).click();
		browser.sleep(4000);
		element(by.xpath('//div[contains(text(),"Balance :")]/span')).getText().then(function (text) {
			expect(dollarAway(text)).toEqual(240 - days1Cost);
		});
		browser.sleep(2000);
		element(by.xpath('//button[contains(text(),"Ok")]')).click();
		browser.sleep(2000);
	});
	it('GoToRecurring', function () {
		element(by.xpath('//li[@heading="Recurring"]')).click();
		expect('Clicked recurring').toEqual('');
		browser.sleep(2000);
		element(by.xpath('//select[@ng-model="data.recurring.how_often"]/option[@label="Monthly"]')).click();
		element(by.model('data.recurring.start_point')).clear();
		var nextMonth1st = new Date(future.getFullYear(), future.getMonth() + 1, 1);
		element(by.model('data.recurring.start_point')).sendKeys(monthNamesForRequest[nextMonth1st.getMonth()] + " " + nextMonth1st.getDate() + ", " + nextMonth1st.getFullYear());
		browser.sleep(4000);
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

	function OpenRequest(r) {
		element(by.xpath("//td[contains(text(),'" + r + "')]")).click();
		element(by.xpath("//td[contains(text(),'" + r + "')]")).click();
		browser.sleep(4000);
	}

	function ReOpenRequest(r) {
		element(by.xpath("//td[contains(text(),'" + r + "')]")).click();
		browser.sleep(4000);
	}

	function clientLogin(login, passwd) {
		browser.get('http://secure.themoveboard.com/account/#/login');
		browser.ignoreSynchronization = true; //без этого зависает
		browser.sleep(12000);
		element(by.model('email')).sendKeys(login);
		element(by.model('password')).sendKeys(passwd);
		element(by.xpath("//button[contains(text(),'Login')]")).submit();
		browser.sleep(5000);
	}

	function adminLogin() {
		browser.get('https://moversboard.net:8083/moveBoard/#/login');
		browser.ignoreSynchronization = true; //без этого зависает
		browser.sleep(15000);
		element(by.model('email')).sendKeys(Admin_EmailId);
		element(by.model('password')).sendKeys(Admin_Password);
		element(by.xpath("//button[contains(text(),'Login')]")).submit();
		//browser.ignoreSynchronization = false;
		browser.sleep(10000);
	}

	function NikolsanLogin() {
		browser.get('http://secure.themoveboard.com/account/#/login');
		browser.ignoreSynchronization = true; //без этого зависает
		browser.sleep(15000);
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
		browser.sleep(4000);
		element(by.css('.meta')).click();
		browser.sleep(3000);
		element(by.css('[ng-click="vm.Logout()"]')).click();
		browser.sleep(4000);
	}

	function randomBukva(length) {
		var bukva = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
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
})
;