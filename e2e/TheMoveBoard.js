describe('Local moving', function () {
	var FirstName;
	var LastName;
	var Email;
	var Password = "s123456";
	var PrimaryPhone = "(123)124-4144";
	var ZipFrom = "02461";
	var ZipTo = "02111";
	var Address = "Indore";
	var RequestId;
	var URL_Homepage = "http://demo.themoveboard.com/";
	var URL_Login = "http://secure.themoveboard.com/account/#/login";
	var URL_Admin = "http://secure.themoveboard.com/moveBoard/#/login";
	var Admin_EmailId = "roma4ke";
	var Admin_Password = "root";
	var Apt = "29";
	var name = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
	var urlString;
	var now = new Date();
	var after_2_day = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 3);
	var after_2_day_actual_date = after_2_day.getDate();
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

	function goToAdminLoginPage() {
		browser.get(URL_Admin);
		browser.sleep(15 * sleepTime);
		browser.ignoreSynchronization = true;
		element(by.xpath("//input[@id='email']")).sendKeys(Admin_EmailId);
		element(by.xpath("//input[@id='password']")).sendKeys(Admin_Password);
		element(by.xpath("//button[contains(text(),'Login')]")).submit();
		browser.sleep(15 * sleepTime);
	}

	function sweetConfirm() {
		var confirmBtn = element.all(by.xpath('//div[@class="sweet-alert showSweetAlert visible"]/div/div/button'));
		confirmBtn.count().then(function (result) {
			if (result != 0) confirmBtn.get(0).click();
		});
	}

	function canvasSignature(canvas) {

		var canvas = element(by.id("signatureCanvas"));
		for (var _ii = 1; _ii < 100; _ii++) {
			browser.actions().mouseMove(canvas, {x: _ii, y: (_ii + 100)}).mouseDown().mouseMove(canvas, {
				x: (_ii + 150),
				y: (_ii + 150)
			}).mouseUp().perform();
		}

	}

	function canvasSignature2(canvas) {
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
		browser.sleep(10 * sleepTime);
	}


	it('Get new quote now', function () {
		browser.get(URL_Homepage);
		//make change
		FirstName = name.charAt(Math.floor(Math.random() * name.length)) + '_User';
		element(by.model("request.first_name")).sendKeys(FirstName);
		LastName = name.charAt(Math.floor(Math.random() * name.length)) + '_User';
		element(by.model("request.last_name")).sendKeys(LastName);
		Email = 'Test_user' + Math.floor(Math.random() * 100 * sleepTime);
		element(by.name("email")).sendKeys(Email + "@Test.com");
		element(by.name("phone")).sendKeys(PrimaryPhone);
		browser.sleep(sleepTime * 3);
		element(by.id('short-datepicker')).click();
		browser.sleep(sleepTime * 3);
		element(by.xpath("//td[@data-month=\"" + after_2_day.getMonth() + "\"]/a[contains(text(),'" + after_2_day_actual_date + "')]")).click();
		browser.sleep(sleepTime * 3);
		element(by.model("request.serviceType")).$('[value="1"]').click();
		element(by.model("request.zipFrom")).sendKeys(ZipFrom);
		element(by.model("request.zipTo")).sendKeys(ZipTo);
		element(by.xpath("//span[contains(text (), 'Choose Move Size')]")).click();
		browser.sleep(sleepTime * 3);
		var movesize = element(by.model("request.moveSize")).all(by.tagName('option'));
		movesize.count().then(function (numberOfItems) {
			return Math.floor(Math.random() * numberOfItems) + 1;
		}).then(function (randomNumber) {
			browser.sleep(sleepTime * 4);
			movesize.get(4).click();
			browser.sleep(8 * sleepTime);
			element(by.buttonText("Done")).click();
		});
		browser.sleep(5 * sleepTime);
		var Entrance_From = element(by.xpath("(//select[@id='edit-type-from'])[1]")).all(by.tagName('option'));
		Entrance_From.count().then(function (numberOfItems) {
			return Math.floor(Math.random() * numberOfItems) + 2;
		}).then(function (randomNumber) {
			Entrance_From.get(3).click();
		});
		browser.sleep(sleepTime * 1);
		var Entrance_To = element(by.xpath("(//select[@id='edit-type-from'])[2]")).all(by.tagName('option'));
		Entrance_To.count().then(function (numberOfItems) {
			return Math.floor(Math.random() * numberOfItems) + 1;
		}).then(function (randomNumber) {
			Entrance_To.get(2).click();
		});
		element(by.css(".form-control.btn.submit_btn")).click();
		browser.sleep(sleepTime * 4);
		element(by.css(".btn.submit_btn.mobileform")).click();
		browser.sleep(sleepTime * 2);
	});
	it('Save Inventory', function () {
		browser.sleep(10 * sleepTime);
		browser.actions().sendKeys(protractor.Key.ESCAPE).perform();
		browser.ignoreSynchronization = true;
		browser.sleep(sleepTime * 2);
		var tabs = element.all(by.repeater('tab in vm.tabs'));


		tabs.count().then(function (c) {
			c--;
			for (i = 0; i < 4; i++) {
				tabs.get(i).click();
				browser.sleep(sleepTime * 2);
			}
			tabs.get(1).click();
		});

		browser.sleep(sleepTime * 4);
		for (j = 0; j < 2; j++) {
			var inventoryItems = element(by.xpath('(//div[@class="inventory-item__col"]/div/button[@ng-click="changeValue(1, item)"])[3]')).click();
		}
		element(by.id('save-inventory')).click();
		browser.sleep(sleepTime * 4);
		sweetConfirm();
		browser.sleep(sleepTime * 8);
		sweetConfirm();
		browser.sleep(500);
	});
	it('Save Details', function () {
		browser.sleep(5 * sleepTime);
		element(by.id("tab_Details")).click();
		browser.sleep(7 * sleepTime);
		element(by.id('current_door_to_parking')).click();
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
				result--;
				select2.get(Math.floor(Math.random() * result)).click();
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
				result--;
				select4.get(Math.floor(Math.random() * result)).click();
			}
		});
		browser.sleep(5 * sleepTime);
		element(by.buttonText("Save Move Details")).click();
		browser.sleep(sleepTime * 2);
	});
	it('Edit the Address', function () {
		browser.sleep(5 * sleepTime);
		browser.ignoreSynchronization = true;
		element(by.xpath("//span[contains(text(),'Enter Address')]")).click();
		browser.sleep(sleepTime * 4);
		element(by.xpath("(//input[@id='edit-moving-from'])[1]")).sendKeys(Address); //Origin address
		element(by.xpath("(//input[@id='edit-moving-from-apt'])[1]")).sendKeys(Apt);
		element(by.xpath("(//input[@id='edit-moving-from-zip'])[1]")).sendKeys(ZipTo);
		element(by.xpath("(//select[@id='edit-size-move'])[1]")).$('[value="2"]').click();
		element(by.xpath("(//input[@id='edit-moving-from'])[3]")).sendKeys(Address); //Destination address
		element(by.xpath("(//input[@id='edit-moving-from-apt'])[3]")).sendKeys(Apt);
		element(by.xpath("(//input[@id='edit-moving-from-zip'])[3]")).sendKeys(ZipFrom);
		element(by.xpath("(//select[@id='edit-size-move'])[3]")).$('[value="3"]').click();
		element(by.buttonText("Update")).click();
		browser.sleep(7 * sleepTime);
		element(by.css(".confirm")).click();
		browser.sleep(8 * sleepTime);
		element(by.css(".confirm")).click();
	});
	it('Manage Your Quote', function () {
		browser.sleep(sleepTime * 3);
		browser.ignoreSynchronization = true;
		element(by.xpath("//div[contains(text(),'Manage Your Quote')]")).click();
		browser.sleep(sleepTime * 3);
		element(by.xpath("//select[@field='request.service_type']")).$('[value="1"]').click();    //service type
		element(by.xpath("//input[contains(@id,'dp')]")).click(); //Move Date
		browser.sleep(sleepTime * 2);
		element(by.xpath("//a[contains(text(),'" + after_2_day_actual_date + "')]")).click();
		browser.sleep(sleepTime * 2);
		element(by.xpath("(//select[@id='edit-size-move'])[1]")).$('[value="3"]').click();
		element(by.xpath("(//select[@id='edit-size-move'])[2]")).$('[value="2"]').click();       //Move Size
		element(by.xpath("//div[@id='edit_furnished_rooms_chosen']/ul")).click();               //Rooms
		element(by.xpath("//li[contains(text(),'dinning room')]")).click();
		var origin = element(by.xpath("(//input[@id='edit-moving-from'])[1]"));                   //Origin address
		origin.clear();
		origin.sendKeys(Address);
		element(by.xpath("(//input[@id='edit-moving-from-apt'])[1]")).sendKeys(Apt);
		element(by.xpath("(//input[@id='edit-moving-from-zip'])[1]")).sendKeys(ZipTo);
		element(by.xpath("(//select[@id='edit-size-move'])[1]")).$('[value="2"]').click();
		var destination = element(by.xpath("(//input[@id='edit-moving-from'])[3]"));            //Destination address
		destination.clear();
		destination.sendKeys(Address);
		element(by.xpath("(//input[@id='edit-moving-from-apt'])[3]")).sendKeys(Apt);
		element(by.xpath("(//input[@id='edit-moving-from-zip'])[3]")).sendKeys(ZipFrom);
		element(by.xpath("(//select[@id='edit-size-move'])[3]")).$('[value="2"]').click();
		element(by.buttonText("Update")).click();
		browser.sleep(sleepTime * 4);
		element(by.css(".confirm")).click();
		browser.sleep(sleepTime * 4);
		element(by.css(".confirm")).click();//popup confirmation
		browser.sleep(sleepTime * 3);
		element(by.xpath("//section[@id='main-content']/div/div/div[2]/div[1]/div/div[2]/div[2]/ng-include[1]/div[1]/div[2]/span")).getText().then(function (ID) {
			RequestId = ID.substr(1);
		});
		browser.sleep(6 * sleepTime);
		element(by.xpath("//section[@id='main-wrapper']/div[1]/header/div/nav[2]/li/a")).click();
		browser.sleep(sleepTime * 3);
		element(by.xpath('//a[@ng-click="vm.Logout()"]')).click();
		browser.sleep(sleepTime * 4);
		element(by.xpath('//a[@ng-click="vm.Logout()"]')).click();
		browser.sleep(sleepTime * 4);
	});
	it('Admin Login', function () {
		goToAdminLoginPage();
	});
	it('Update Request', function () {

		openRequest(RequestId);

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
		//-------------------------ставим Not Confirmed
		var status = element(by.id('edit-status'));
		status.click();
		browser.sleep(sleepTime * 1);
		status.all(by.tagName('option')).then(function (stats) {
			stats[1].click();
		});
		browser.sleep(sleepTime * 1);
		//---------------------------------добавляем packing и additional services
		element(by.xpath('//label[@ng-click="openAddPackingModal();"]')).click();
		browser.sleep(sleepTime * 2);

		extras = element.all(by.repeater("extra_charge in extra_charges"));
		extras.count().then(function (result) {
			result -= 2;
			extras.get(Math.floor(Math.random() * result + 1)).click();
			extras.get(Math.floor(Math.random() * result + 1)).click();
			extras.get(Math.floor(Math.random() * result + 1)).click();
			element(by.xpath('//div[contains(text(),"Total Packings")]')).getText().then(function (text) {
				TotalPackingsCost = Number(text.substr(text.indexOf('$') + 1));
				element(by.xpath('//button[@ng-click="save()"]')).click();
				browser.sleep(sleepTime * 6);
				element(by.xpath('//label[@ng-click="openAddServicesModal();"]')).click();
				browser.sleep(sleepTime * 2);

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
					});
				});
			});
		});

		browser.sleep(sleepTime * 3);
		element(by.xpath("//button[contains(text(),'Changes')]")).click();
		browser.sleep(sleepTime * 4);
		element(by.xpath("//div[contains(text(),'Update request and send emails')]")).click();
		browser.sleep(5 * sleepTime);
	});
	function adminLogout() {
		//browser.actions().sendKeys(protractor.Key.ESCAPE).perform();
		element(by.xpath('//button[@ng-click="cancel()"]')).click();
		browser.sleep(sleepTime * 4);
		element(by.css('.meta')).click();
		browser.sleep(sleepTime * 3);
		element(by.css('[ng-click="vm.Logout()"]')).click();
		browser.sleep(5 * sleepTime);
	}

	it('change password', function () {
		browser.sleep(5 * sleepTime);
		element(by.xpath('//li[@heading="Client"]/a')).click();
		browser.sleep(sleepTime * 4);
		element(by.model('client.password')).sendKeys('123');
		browser.sleep(sleepTime * 2);
		element(by.xpath('//button[@ng-click="update(client)"]')).click();
		browser.sleep(sleepTime * 4);
		adminLogout();
	});
	it('login as a client', function () {
		browser.get(URL_Login);
		browser.sleep(10 * sleepTime);
		browser.ignoreSynchronization = true;
		element(by.id("email")).sendKeys(Email + "@Test.com");
		browser.sleep(sleepTime * 3);
		element(by.id("password")).sendKeys("123");
		element(by.buttonText("Login")).click();
		browser.sleep(7 * sleepTime);
	});
	it('book your move', function () {
		browser.sleep(sleepTime * 3);
		element(by.buttonText("View")).click();
		browser.sleep(sleepTime * 4);
		browser.getCurrentUrl().then(function (url) {
			urlString = url;
			browser.sleep(sleepTime * 3);
		});
		browser.sleep(sleepTime * 2);
		browser.ignoreSynchronization = true;
		element(by.xpath("//a[contains(text(),'BOOK YOUR MOVE')]")).click();
		browser.sleep(sleepTime * 4);
		element(by.id("terms")).click();
		element(by.id("cancel_policy")).click();
		element(by.id("paybutton")).click();
		browser.sleep(sleepTime * 3);
		element(by.id("card_number")).sendKeys("4111111111111111");
		element(by.id("exp_month")).sendKeys("11");
		element(by.id("exp_year")).sendKeys("17");
		element(by.id("cvc")).sendKeys("333");
		browser.sleep(sleepTime * 3);
		element(by.xpath("(//input[@type='submit'])[1]")).click();
		browser.sleep(12 * sleepTime);
		element(by.xpath("//button[contains(text(),'OK')]")).click();
		browser.sleep(5 * sleepTime);
		var canvas = element(by.id("signatureCanvasReserv"));
		for (var _ii = 0; _ii < 100; _ii++) {
			browser.actions().mouseMove(canvas, {x: _ii, y: (_ii + 10)}).mouseDown().mouseMove(canvas, {
				x: (_ii + 5),
				y: (_ii + 15)
			}).mouseUp().perform();
		}
		browser.sleep(sleepTime * 4);
		element(by.css('[ng-click="saveReservSignature()"]')).click();
		browser.sleep(6 * sleepTime);
		element(by.xpath("//section[@id='main-wrapper']/div[1]/header/div/nav[2]/li/a")).click();
		browser.sleep(sleepTime * 3);
	});
	it('Login as admin', function () {

		goToAdminLoginPage();
		browser.sleep(sleepTime * 4);
		browser.get("http://secure.themoveboard.com/moveBoard/#/dispatch/local");
		browser.sleep(5 * sleepTime);

	});
	it('Dispatch item', function () {
		browser.sleep(sleepTime * 4);
		browser.ignoreSynchronization = true;
		var findYear = function (target) {
			browser.sleep(sleepTime * 3);
			element(by.css(".ui-datepicker-year")).getText().then(function (result) {
				var current = Number(result);
				element(by.model("search")).clear();
				element(by.model("search")).sendKeys('target:' + target + ' current:' + current);
				if (current != target) {
					element(by.model("search")).sendKeys('Nain!');
					if (current > target) {
						element(by.xpath('//a[@data-handler="prev"]/span')).click();
						return findYear(target);
					} else {
						element(by.xpath('//a[@data-handler="next"]span')).click();
						return findYear(target);
					}
				} else return true;
			});
		};
		findYear(after_2_day.getFullYear());
		//ставим нужный месяц
		var findMonth = function (target) {
			browser.sleep(sleepTime * 3);
			element(by.css(".ui-datepicker-month")).getText().then(function (result) {
				var current = monthNumbers[result.toUpperCase()];
				element(by.model("search")).clear();
				element(by.model("search")).sendKeys('tar:' + target + ' cur:' + current);
				if (current > target) {
					element(by.xpath('//a[@data-handler="prev"]/span')).click();
					return findMonth(target);
				} else if (current < target) {
					element(by.xpath('//a[@data-handler="next"]/span')).click();
					return findMonth(target);
				} else return true;
			});
		};
		findMonth(after_2_day.getMonth());
		browser.sleep(sleepTime * 3);
		element(by.xpath('//a[@class="ui-state-default" and contains(text(),"' + after_2_day.getDate() + '")]')).click();
		browser.sleep(10 * sleepTime);
		var reqString = "request_" + RequestId;
		element(by.id(reqString)).click();
		browser.sleep(6 * sleepTime);
		element(by.model('vm.data.foreman')).click();
		browser.sleep(500);
		element(by.model('vm.data.foreman')).element(by.xpath("option[contains(text(),'Jack Formen')]")).click();
		browser.sleep(500);
		element(by.model('vm.data.baseCrew.helpers[$index]')).click();
		element(by.model('vm.data.baseCrew.helpers[$index]')).element(by.xpath("optgroup/option[contains(text(),'Helper 3 3')]")).click();
		browser.sleep(sleepTime * 2);
		element(by.linkText("Send")).click();
		browser.sleep(sleepTime * 4);
		element(by.css(".confirm")).click();
		browser.sleep(sleepTime * 3);

	});


	function clientLogin(login, passwd) {
		browser.get(URL_Login);
		browser.ignoreSynchronization = true; //без этого зависает
		browser.sleep(12 * sleepTime);
		element(by.model('email')).sendKeys(login);
		element(by.model('password')).sendKeys(passwd);
		element(by.xpath("//button[contains(text(),'Login')]")).submit();
		browser.sleep(5 * sleepTime);
	}

	it('Contract page', function () {
		browser.sleep(sleepTime * 2);
		browser.get(urlString + "/contract");

		//clientLogin("Test_user68292@Test.com", 123);//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

		browser.sleep(sleepTime * 4);

		element(by.xpath("//a[contains(text(),'Contract Page')]")).click();
		browser.sleep(sleepTime * 4);

	});

	it('Contract', function () {

		element(by.xpath('//div[@id="step_0" and @ng-click="clickOpenSignature()"]')).click();
		browser.sleep(sleepTime * 2);
		NikolsanSign();
		browser.sleep(5 * sleepTime);
		element(by.xpath('//div[@id="step_1" and @ng-click="clickOpenSignature()"]')).click();
		browser.sleep(sleepTime * 2);
		NikolsanSign();
		browser.sleep(5 * sleepTime);
		element(by.xpath('//div[@id="step_2" and @ng-click="clickOpenSignature()"]')).click();
		browser.sleep(5 * sleepTime);
		NikolsanSign();


		browser.sleep(5 * sleepTime);
		var start_time = element(by.id("edit-start-time-0"));
		start_time.clear();
		start_time.sendKeys('10:30 AM');
		var off_time = element(by.id("edit-time-off-0"));
		off_time.clear();
		off_time.sendKeys('00:30');
		var end_time = element(by.id("edit-end-time-0"));
		end_time.clear();
		end_time.sendKeys('03:00 PM');
		var travel_time = element(by.id("edit-travel"));
		travel_time.clear();
		travel_time.sendKeys("2.00");
		element(by.xpath('//li[@ng-repeat="crew in data.crews"]')).click();
		browser.sleep(sleepTime * 2);
		element(by.xpath('//div[@id="step_3" and @ng-click="clickOpenSignature()"]')).click();
		browser.sleep(sleepTime * 2);
		NikolsanSign();
		browser.sleep(5 * sleepTime);
		element(by.xpath('//div[@id="step_4" and @ng-click="clickOpenSignature()"]')).click();
		browser.sleep(sleepTime * 2);
		NikolsanSign();
		browser.sleep(5 * sleepTime);
		//----------------------------------теперь надо проверить часы
		expect(element(by.xpath('//th[contains(text(),"Total hourly charge")]/../td[2]')).getText()).toEqual('6');

		//----------------------------------теперь тыкаем циферки справа
		element(by.model('p.name')).click();
		browser.actions().sendKeys(protractor.Key.TAB).perform();
		browser.actions().sendKeys(protractor.Key.ARROW_DOWN).perform();
		browser.actions().sendKeys(protractor.Key.ARROW_DOWN).perform();
		browser.actions().sendKeys(protractor.Key.TAB).perform();
		browser.actions().sendKeys(protractor.Key.TAB).perform();
		browser.actions().sendKeys(protractor.Key.TAB).perform();
		browser.actions().sendKeys(protractor.Key.ARROW_DOWN).perform();
		browser.actions().sendKeys(protractor.Key.ARROW_DOWN).perform();
		browser.actions().sendKeys(protractor.Key.TAB).perform();
		browser.actions().sendKeys(protractor.Key.TAB).perform();
		browser.actions().sendKeys(protractor.Key.TAB).perform();
		browser.actions().sendKeys(protractor.Key.ARROW_DOWN).perform();
		browser.actions().sendKeys(protractor.Key.ARROW_DOWN).perform();
		browser.sleep(5 * sleepTime);


		element(by.xpath('//a[contains(text(),"+ add a service")]')).click();
		browser.sleep(500);
		var services = element.all(by.repeater('s in additionalServicesRef'));
		services.count().then(function (count) {
			count -= 3;
			services.get(Math.floor(Math.random() * count + 1)).click();
		});

		//---------------------------------и проверяем, как он посчитал
		var summing = function (rows, count, current, sum, total, HowToLook) {
			if (current < count) {
				rows.get(current).getText().then(function (text) {
					if (isNaN(HowToLook(text))) {
						rows.get(current).element(by.tagName('input')).getAttribute('value').then(function (text) {
							//expect(Number(text)).toEqual('testing Input......');
							summing(rows, count, current + 1, sum + Number(text), total, HowToLook);
						});

					} else {
						//expect(Number(HowToLook(text))).toEqual('testing TD......');
						summing(rows, count, current + 1, sum + Number(HowToLook(text)), total, HowToLook);
					}
				});
			} else {
				element(by.xpath(total)).getText().then(function (text) {
					expect(Number(HowToLook(text))).toEqual(sum);
				});
				return 0;
			}
		};
		var HowToLook = function (text) {
			return text.substr(text.indexOf('$') + 1);
		};
		var packingCost = element.all(by.xpath('//table/tbody[1]/tr/td[4][contains(text(),"$")]'));
		packingCost.count().then(function (count) {
			count;
			//expect("count:").toEqual(count);
			summing(packingCost, count, 0, 0, '//p[contains(text(),"total packing charges")]/../../td[2]', HowToLook);
		});
		var servicesCost = element.all(by.xpath('//table/tbody[2]/tr/td[4][contains(text(),"$")]'));
		servicesCost.count().then(function (count) {
			count;
			//expect("count:").toEqual(count);
			summing(servicesCost, count, 0, 0, '//p[contains(text(),"total Extra charges")]/../../td[2]', HowToLook);
		});

		element(by.xpath('//table[@id="total_hours"]/tbody/tr[4]/td[@class="no-border-right ng-binding"]')).getText().then(function (text) {
			expect(Number(text)).toEqual(570);
		});


		//-----------------------------------проверяем, чтобы Balance = 0
		element(by.xpath('//p[contains(text(),"Total balance paid:")]/../../td[2]')).getText().then(function (text) {
			//expect(text.substr(text.indexOf('$') + 1,5)).toEqual('Balance');
			expect(Number(text.substr(text.indexOf('$') + 1, 5))).toEqual(0);
		});
		browser.sleep(5 * sleepTime);
		element(by.xpath('//div[@ng-click="applyPayment()"]')).click();
		browser.sleep(5 * sleepTime);
		element(by.xpath('//div[contains(text(),"SKIP")]')).click();
		browser.sleep(sleepTime * 1);
		//тут можно проверить последний раз сумму к оплате
		element(by.xpath('//button[@ng-click="goStepTwo();"]')).click();
		browser.sleep(sleepTime * 3);
		element(by.id("card_number")).sendKeys("4111111111111111");
		element(by.id("exp_month")).sendKeys("11");
		element(by.id("exp_year")).sendKeys("17");
		element(by.id("cvc")).sendKeys("222");

		element(by.xpath("//input[@type='submit']")).click();
		browser.sleep(9 * sleepTime);
		sweetConfirm();
		browser.sleep(sleepTime * 2);

		var canvas = element(by.id("signatureCanvasPayment"));
		for (i = 100; i < 300; i++) {
			browser.actions()
				.mouseMove(canvas, {x: i, y: i + 5})
				.mouseDown()
				.mouseMove(canvas, {x: i + 25, y: i + 15})
				.mouseUp()
				.perform();
		}
		browser.sleep(sleepTime * 4);
		element(by.xpath('//button[contains(text(),"Done")]')).click();
		//element(by.xpath('//button[@ng-click="saveSignature()"]')).click();
		browser.sleep(sleepTime * 4);
	});

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

	it('should upload a file', function () {

		browser.sleep(5 * sleepTime);
		var path = require('path');//тут мы просим у NodeJS зависимость path
		var slip_image = element(by.id("inputImage"));
		var fileToUpload = "D:/git.jpg";//наш путь к файлу (от корня или от исполняемого чего-то)
		browser.sleep(sleepTime * 3);
		var absolutePath = path.resolve(__dirname, fileToUpload); //преобразуем относительный путь в абсолютный(в нашем случае просто разворачиваем слеши обратно)
		browser.sleep(sleepTime * 3);
		//slip_image.click();//этого, наверное, можно и не делать...
		//browser.sleep(sleepTime*1);
		//expect(absolutePath).toEqual('path.resolve'); //смотрим, чего он там наресолвил
		slip_image.sendKeys(absolutePath);
		browser.sleep(sleepTime * 3);
		element(by.xpath('(//button[@ng-click="saveFile()"])')).click();
		browser.sleep(sleepTime * 3);
	});

	it('remaining sign', function () {
		browser.sleep(5 * sleepTime);
		element(by.xpath("//div[@id='step_5']/div[1]")).click();
		NikolsanSign();
		browser.sleep(5 * sleepTime);
		element(by.xpath("//div[@id='step_6']/div[1]")).click();
		NikolsanSign();
		browser.sleep(sleepTime * 4);
		//element(by.buttonText("Submit contract")).click();
		element(by.xpath('//button[@ng-click="submitContractBtn({ isBtn: true })"]')).click();
		browser.sleep(8 * sleepTime);
		sweetConfirm();
		//element(by.css(".confirm")).click();
		browser.sleep(sleepTime * 2);
	});


});
 
