/**
 * Created by Ribka on 10.09.2016.
 */
describe('Protractor Demo App', function () {

	var adminURL = "http://secure.themoveboard.com/moveBoard/#/dashboard";
	var localDispatchURL = 'http://secure.themoveboard.com/moveBoard/#/dispatch/local';
	var clientPage = 'http://secure.themoveboard.com/account/#/login';
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
	var requestId;
	var now = new Date();
	var msInDay = 86400000;
	var future = new Date(now.getTime() + msInDay * 5);//4 дня вперёд
	var farFuture = new Date(now.getTime() + msInDay * 6);//8 дня вперёд
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
	var repeats = 20;

	it('admin Login', function () {

		browser.get(adminURL);
		browser.ignoreSynchronization = true; //без этого зависает
		TryToClickModel('email', function () {
			adminLogin();
			TryToClickXpath('//a[@ng-click="vm.openEditModal()"]');
		});

	});
	it('creating Client', function () {
		//element(by.xpath('//a[@ng-click="vm.openEditModal()"]')).click();
		browser.sleep(sleepTime * 2);
		element(by.xpath('//select[@ng-options="service.id as service.title for service in services"]/option[2]')).click();//выбираем Moving & Storage
		element(by.id('edit-move-date-datepicker-popup-0')).click();
		browser.sleep(sleepTime * 1);
		element(by.xpath('//td[@data-month="' + future.getMonth() + '" and @data-year="' + future.getFullYear() + '"]/a[contains(text(),"' + future.getDate() + '")]')).click();
		browser.sleep(sleepTime * 2);
		element(by.id('edit-date-storage-datepicker-popup-0')).click();
		browser.sleep(sleepTime * 1);
		element(by.xpath('//td[@data-month="' + farFuture.getMonth() + '" and @data-year="' + farFuture.getFullYear() + '"]/a[contains(text(),"' + farFuture.getDate() + '")]')).click();
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
		//element(by.xpath('//button[@ng-click="Calculate()"]')).click();
		TryToClickXpath('//button[@ng-click="Calculate()"]', function () {
			browser.sleep(sleepTime * 2);
			//element(by.xpath('//button[contains(text(),"Continue")]')).click();
			TryToClickXpath('//button[contains(text(),"Continue")]', function () {
				browser.sleep(sleepTime * 2);
				element(by.model("editrequest.account.fields.field_user_first_name")).sendKeys(firstName);
				element(by.model("editrequest.account.fields.field_user_last_name")).sendKeys(lastName);
				element(by.model("editrequest.account.mail")).sendKeys(email);
				element(by.model("editrequest.account.fields.field_primary_phone")).sendKeys(phone);
				browser.actions().sendKeys(protractor.Key.ENTER).perform();
				browser.sleep(sleepTime * 2);
				element(by.xpath('//button[contains(text(),"Create")]')).click();
				//browser.sleep(sleepTime * 15);
				TryToClickXpath('//li[@heading="Settings"]/a');
			});
		});

	});
	it('select manager', function () {
		browser.sleep(sleepTime * 2);
		//openRequest(70492);
		element(by.xpath('//li[@heading="Settings"]/a')).click();
		browser.sleep(sleepTime * 2);
		element(by.buttonText("Set Manager")).click();
		browser.sleep(500);
		element.all(by.repeater('manager in managersList')).then(function (managers) {
			managers[0].click();
		});
		browser.sleep(sleepTime * 1);
		sweetConfirm();
		browser.sleep(sleepTime * 3);
		sweetConfirm();
		browser.sleep(sleepTime * 3);
		element(by.xpath('//ul[@class="nav nav-tabs"]/li')).click();
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
		browser.sleep(sleepTime * 5);
		//-------------------------ставим Confirmed
		var status = element(by.id('edit-status'));
		status.click();
		browser.sleep(sleepTime * 1);
		status.all(by.tagName('option')).then(function (stats) {
			stats[2].click();
		});
		browser.sleep(sleepTime * 1);
		element(by.xpath('//ul[@class="nav nav-tabs"]/li[1]/a')).getText().then(function (text) {
			requestId = Number(text.substr(text.indexOf('#') + 1));
			element(by.model('request.field_moving_from.thoroughfare')).sendKeys(randomBukva(8) + requestId);
		});
		browser.sleep(sleepTime * 6);

		element(by.xpath("//button[contains(text(),'Changes')]")).click();
		browser.sleep(sleepTime * 6);
		element(by.xpath("//div[contains(text(),'Update request and send emails')]")).click();
		browser.sleep(sleepTime * 10);
		element(by.xpath('//div[@class="sa-confirm-button-container"]/button')).click();
		browser.sleep(sleepTime * 4);
		sweetConfirm();
		browser.sleep(sleepTime * 6);
		sweetConfirm();
		browser.actions().sendKeys(protractor.Key.ESCAPE).perform();
		browser.sleep(sleepTime * 3);
		element(by.xpath('//button[@ng-click="cancel()"]')).click();
		browser.sleep(sleepTime * 4);
	});
	it('local dispathing', function () {
		//---------------------------------идём в local dispatch
		browser.get(localDispatchURL);
		browser.sleep(sleepTime * 5);
		var findYear = function (target) {
			browser.sleep(sleepTime * 3);
			element(by.css(".ui-datepicker-year")).getText().then(function (result) {
				var current = Number(result);
				element(by.model("search")).clear();
				//element(by.model("search")).sendKeys('target:' + target + ' current:' + current);
				if (current != target) {
					//element(by.model("search")).sendKeys('Nain!');
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
		findYear(future.getFullYear());
		browser.sleep(sleepTime * 3);
		//ставим нужный месяц
		var findMonth = function (target) {
			browser.sleep(sleepTime * 4);
			element(by.css(".ui-datepicker-month")).getText().then(function (result) {
				var current = monthNumbers[result.toUpperCase()];
				element(by.model("search")).clear();
				//element(by.model("search")).sendKeys('tar:' + target + ' cur:' + current);
				if (current > target) {
					element(by.xpath('//a[@data-handler="prev"]/span')).click();
					return findMonth(target);
				} else if (current < target) {
					element(by.xpath('//a[@data-handler="next"]/span')).click();
					return findMonth(target);
				} else return true;
			});
		};
		findMonth(future.getMonth());
		browser.sleep(sleepTime * 3);
		element(by.xpath('//a[@class="ui-state-default" and contains(text(),' + future.getDate() + ')]')).click();
		//element(by.xpath('//a[@class="ui-state-default" and contains(text(),' + 18 + ')]')).click();
		browser.sleep(sleepTime * 10);
		//var reqString = "request_" + 70506;
		var reqString = "request_" + requestId;
		browser.sleep(sleepTime * 5);
		element(by.id(reqString)).click();
		browser.sleep(sleepTime * 6);
		element(by.model('vm.data.foreman')).click();
		browser.sleep(500);
		element(by.model('vm.data.foreman')).element(by.xpath("option[contains(text(),'Jack Nikolsan')]")).click();
		browser.sleep(500);
		var helpers = element.all(by.model('vm.data.baseCrew.helpers[$index]'));
		helpers.count().then(function (helpersCount) {

			helpers.get(0).click();
			helpers.get(0).element(by.xpath("optgroup/option[contains(text(),'Helper 3 3')]")).click();
			//browser.actions().sendKeys(protractor.Key.ARROW_DOWN).perform();
			//browser.actions().sendKeys(protractor.Key.ARROW_DOWN).perform();
			browser.sleep(500);
			if (helpersCount > 1) {
				helpers.get(1).click();
				helpers.get(1).element(by.xpath("optgroup/option[contains(text(),'Helper2 2')]")).click();
				browser.sleep(500);
			}

		});
		element(by.xpath('//a[@ng-click="vm.assignTeam(request)"]')).click();
		browser.sleep(sleepTime * 6);
		element(by.css(".confirm")).click();
		browser.sleep(sleepTime * 4);
		element(by.id(reqString)).click();
		browser.sleep(sleepTime * 15);
		//element(by.model('invoice.work_time')).sendKeys('04:00');
		element(by.model('invoice.work_time')).clear();
		element(by.model('invoice.work_time')).sendKeys('06:00');
		element(by.model('invoice.travel_time.value')).clear();
		element(by.model('invoice.travel_time.value')).sendKeys('01:00');
		browser.sleep(sleepTime * 2);
		//---------------------------------добавляем packing и additional services
		element(by.xpath('//label[@ng-click="openAddPackingInvoiceModal();"]')).click();
		browser.sleep(sleepTime * 2);
		var packingCost;
		var extras = element.all(by.repeater("extra_charge in extra_charges"));
		var additionals;
		var additionalsCost;
		var newCost = "";
		var maxMoney = Number(newCost);

		var prom1 = function (a) {
			return extras.count();
		};
		var prom2 = function (result) {
			result -= 2;
			extras.get(Math.floor(Math.random() * result + 1)).click();
			extras.get(Math.floor(Math.random() * result + 1)).click();
			extras.get(Math.floor(Math.random() * result + 1)).click();
			return element(by.xpath('//div[contains(text(),"Total Packings")]')).getText();
		};
		var prom3 = function (text) {
			packingCost = dollarAway(text);
			element(by.xpath('//button[@ng-click="save()"]')).click();
			browser.sleep(sleepTime * 6);
			element(by.xpath('//label[@ng-click="openAddServicesInvoiceModal();"]')).click();
			browser.sleep(sleepTime * 2);
			additionals = element.all(by.repeater("extra_charge in extra_charges"));
			return additionals.count();
		};
		var prom4 = function (result) {
			result -= 2;
			additionals.get(Math.floor(Math.random() * result + 1)).click();
			additionals.get(Math.floor(Math.random() * result + 1)).click();
			additionals.get(Math.floor(Math.random() * result + 1)).click();
			browser.sleep(sleepTime * 1);
			return element(by.xpath('//div[contains(text(),"Total Services")]')).getText();
		};
		var prom5 = function (text) {
			additionalsCost = dollarAway(text);
			element(by.xpath('//button[@ng-click="save()"]')).click();
			browser.sleep(sleepTime * 6);
			element(by.xpath('//div[@ng-click="closeJob();"]')).click();
			browser.sleep(sleepTime * 8);
			sweetConfirm();
			browser.sleep(sleepTime * 2);
			//-------------------------------считаем, какая должна быть зарплата Макса
			return element(by.xpath('//label[contains(text(),"Grand Total: ")]/../div')).getText();
		};
		var prom6 = function (totalCost) {
			for (var c = 1; c < totalCost.length; c++) {
				if (totalCost[c] != ',') {
					newCost += totalCost[c];
				}
			}
			maxMoney = Number(newCost);
			return element(by.xpath('//label[@ng-click="OpenSurchargeInvoiceModal();"]/../div')).getText();
		};
		var prom7 = function (fuelCost) {
			maxMoney -= dollarAway(fuelCost);
			return element(by.xpath('//label[@ng-click="openAddServicesInvoiceModal();"]/../div')).getText();
		};
		var prom8 = function (addServicesCost) {
			maxMoney -= dollarAway(addServicesCost);
			element(by.xpath('//div[@ng-click="openSalaryCommisionModal();"]')).click();
			browser.sleep(sleepTime * 10);
			return element(by.xpath('//label[@ng-init="calcWorkerTotal(\'salesPerson\')"]')).getText();
		};
		var prom9 = function (toMax) {
			expect(Math.floor(maxMoney * 5) / 100).toEqual(dollarAway(toMax));

			//----------------------------проверяем зарплату прораба
			element(by.xpath('//li[@heading="Foremen"]/a')).click();
			browser.sleep(sleepTime * 2);
			return element(by.xpath('//select/option[@selected="selected" and contains(text(),"Daily Rate")]/../../../td[5]/span')).getText();
		};
		var prom10 = function (dailyRate) {
			dailyRate = Number(dailyRate.substr(dailyRate.indexOf('$') + 1));
			expect(dailyRate).toEqual(10.00);
			return element(by.xpath('//select/option[@selected="selected" and contains(text(),"Hourly Rate")]/../../../td[5]/span')).getText();
		};
		var prom11 = function (hourlyRate) {
			hourlyRate = Number(hourlyRate.substr(hourlyRate.indexOf('$') + 1));
			expect(hourlyRate).toEqual(84.00);
			return element(by.xpath('//select/option[@selected="selected" and contains(text(),"Bonus")]/../../../td[5]/span')).getText();
		};
		var expectAdditionalService = function (bonus) {
			bonus = Number(bonus.substr(bonus.indexOf('$') + 1));
			expect(bonus).toEqual(14.00);
			return element(by.xpath('//select/option[@selected="selected" and contains(text(),"Additional Service")]/../../../td[5]/span')).getText();
		};
		var expectPackingComission = function (additionals) {
			additionals = Number(additionals.substr(additionals.indexOf('$') + 1));
			expect(additionals).toEqual(Math.floor(additionalsCost * 10) / 100);
			return element(by.xpath('//select/option[@selected="selected" and contains(text(),"Packing Comission")]/../../../td[5]/span')).getText();
		};
		var prom14 = function (addpackings) {
			addpackings = Number(addpackings.substr(addpackings.indexOf('$') + 1));
			expect(addpackings).toEqual(Math.floor(packingCost * 100) / 100);
			element(by.xpath('//li[@heading="Helpers"]/a')).click();
			browser.sleep(sleepTime * 2);
			return element(by.xpath('(//select/option[@selected="selected" and contains(text(),"Hourly Rate")]/../../../td[5]/span)[1]')).getText();
		};
		var prom15 = function (helper1) {
			helper1 = Number(helper1.substr(helper1.indexOf('$') + 1));
			expect(helper1).toEqual(91);
			return element(by.xpath('(//select/option[@selected="selected" and contains(text(),"Hourly Rate")]/../../../td[5]/span)[2]')).getText();
		};
		var prom16 = function (helper2) {
			helper2 = Number(helper2.substr(helper2.indexOf('$') + 1));
			expect(helper2).toEqual(91);
			browser.sleep(sleepTime * 2);
		};

		var promises = [prom1, prom2, prom3, prom4, prom5, prom6, prom7, prom8, prom9, prom10, prom11, expectAdditionalService, expectPackingComission, prom14, prom15, prom16];

		var promiseManager = function (promises, position, parameter) {
			//expect('Manager was called').toEqual(position);
			if (position < promises.length - 1) {
				//expect('parameter is ').toEqual(parameter);
				promises[position](parameter).then(function (secondParam) {
					promiseManager(promises, position + 1, secondParam);
				});
			} else {
				promises[position](parameter);
			}
		};

		promiseManager(promises, 0, 'poehali!');

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
		browser.ignoreSynchronization = true; //без этого зависает
		browser.sleep(12000);
		element(by.model('email')).sendKeys(login);
		element(by.model('password')).sendKeys(passwd);
		element(by.xpath("//button[contains(text(),'Login')]")).submit();
		browser.sleep(sleepTime * 5);
	}

	function adminLogin() {
		element(by.model('email')).sendKeys(Admin_EmailId);
		element(by.model('password')).sendKeys(Admin_Password);
		element(by.xpath("//button[contains(text(),'Login')]")).submit();
		//browser.ignoreSynchronization = false;
	}

	function NikolsanLogin() {
		browser.get('http://secure.themoveboard.com/account/#/login');
		browser.ignoreSynchronization = true; //без этого зависает
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
		element(by.xpath('//button[@ng-click="cancel()"]')).click();
		browser.sleep(sleepTime * 4);
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

})
;