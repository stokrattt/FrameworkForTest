/**
 * Created by Ribka on 19.08.2016.
 */
describe('Protractor Demo App', function () {

	var adminURL = "http://stage.themoveboard.com/moveBoard/#/dashboard";
	var clientURL = "http://stage.themoveboard.com/account/#/login";
	var pendingUrl = "http://stage.themoveboard.com/moveBoard/#/storages/pending";
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
	var msInDay = 86400000;
	var future = new Date(now.getTime() + msInDay * 4);//4 ��� �����
	var farFuture = new Date(now.getTime() + msInDay * 8);//8 ��� �����
	var moveDate = {month: 0, day: 0, year: 0};
	var monthNumbers = {
		JANUARY: 1,
		FEBRUARY: 2,
		MARCH: 3,
		APRIL: 4,
		MAY: 5,
		JUNE: 6,
		JULY: 7,
		AUGUST: 8,
		SEPTEMBER: 9,
		OCTOBER: 10,
		NOVEMBER: 11,
		DECEMBER: 12
	};
	var sleepTime = 1500;
	var repeats = 10;

	it('Fill 1st form', function () {
		browser.get('http://demo.themoveboard.com/');
		browser.sleep(sleepTime * 5);
		TryToClickXpath('//small-desktop-form//input[@ng-model="request.first_name"]', function () {
			var root = element(by.css('.sf-calculate-wrapper'));
			var firstNameField = root.element(by.model("request.first_name"));
			var lastNameField = root.element(by.model("request.last_name"));
			var emailField = root.element(by.id("edit-email"));
			var phoneField = root.element(by.id("primary_phone"));
			var datePicker = root.element(by.id("short-datepicker"));
			var storageDatePicker = root.element(by.id("edit-date-storage-datepicker-popup-0"));
			var submit = root.element(by.xpath("//input[@value='Get Quote Now']"));
			var editService = root.element(by.id("edit-service"));
			var fromZipInput = root.element(by.model("request.zipFrom"));
			var toZipInput = root.element(by.model("request.zipTo"));
			var movingSize = root.element(by.id("sf-move-size"));
			var typeFrom = root.element(by.model('request.typeFrom'));
			var typeTo = root.element(by.model('request.typeTo'));
			var calendarDay;


			firstNameField.sendKeys(firstName);
			lastNameField.sendKeys(lastName);
			emailField.sendKeys(email);
			phoneField.sendKeys(phone);

			datePicker.click();
			element(by.xpath('//td[@data-month="' + future.getMonth() + '" and @data-year="' + future.getFullYear() + '"]/a[contains(text(),"' + future.getDate() + '")]')).click();

			var editServices = editService.all(by.xpath("option[@value!='5']"));
			temp = editServices.count().then(function (result) {
				result--;
				editServices.get(1).click();
				return result;
			});

			temp = storageDatePicker.element(by.xpath("../..")).getAttribute("style").then(function (result) {
				if (result[9] != 'n') {
					storageDatePicker.click();
					element(by.xpath('//td[@data-month="' + farFuture.getMonth() + '" and @data-year="' + farFuture.getFullYear() + '"]/a[contains(text(),"' + farFuture.getDate() + '")]')).click();
				}
				return 1;
			});

			fromZipInput.sendKeys(zipFrom);
			toZipInput.sendKeys(zipTo);

			movingSize.click();
			browser.sleep(sleepTime * 2);
			root.element(by.id("edit-size-move")).click();
			browser.sleep(sleepTime * 2);
			var movingSizes = root.element(by.id("edit-size-move")).all(by.tagName("option")).then(function (result) {
				result[Math.floor(Math.random() * result.length - 2) + 2].click();
			});

			browser.sleep(sleepTime * 2);

			//-------------------------------------������ �������
			var checkBoxes = root.all(by.xpath("//div[@id='sf-rooms' and @style!='display:none;' and @style!='display: none;']/div"));
			temp = checkBoxes.count().then(function (result) {
				result--;
				browser.actions().click(checkBoxes.get(Math.floor(Math.random() * result))).perform();
				browser.actions().click(checkBoxes.get(Math.floor(Math.random() * result))).perform();
				return result;
			});

			root.element(by.xpath("//ng-slide-push-menu[@id='slide_menu']/div[@class='toolbar']/button[1]")).click();
			browser.sleep(sleepTime * 1);

			temp = typeFrom.getAttribute("disabled").then(function (result) {
				if (!result) {
					var entranceFrom = typeFrom.all(by.tagName("option"));
					temp = entranceFrom.count().then(function (result) {
						result--;//������ ��� count() ������� � 1
						entranceFrom.get(Math.floor(Math.random() * result + 1)).click();
						return result;
					});
				}
				return 1;
			});

			var entranceTo = typeTo.all(by.tagName("option"));
			temp = entranceTo.count().then(function (result) {
				result--;
				entranceTo.get(Math.floor(Math.random() * result + 1)).click();
				return result;
			});
			browser.sleep(sleepTime * 5);
			submit.click();
			browser.sleep(sleepTime * 7);
			//----------------------------��������� ��������� ������ �����
			//var temp = element(by.id('congrats_menu')).element(by.tagName('a')).click();
			//browser.sleep(sleepTime*5);
		});
	});

	it('Admin login', function () {
		browser.get(adminURL);
		browser.ignoreSynchronization = true; //��� ����� ��������
		TryToClickModel('email', function () {
			adminLogin();
			TryToClickXpath("//td[contains(text(),'" + fullName + "')]", function () {
				element(by.xpath("//td[contains(text(),'" + fullName + "')]")).click();
			});
		});
	});

	it('first time in Adminka, get ID from name', function () {
		//element(by.xpath("//td[contains(text(),'" + fullName + "')]")).click();

		//---------------------------------��������� packing � additional services
		browser.sleep(sleepTime * 2);
		TryToClickXpath('//label[@ng-click="openAddPackingModal();"]', function () {
			//element(by.xpath('//label[@ng-click="openAddPackingModal();"]')).click();
			element(by.xpath('//ul[@class="nav nav-tabs"]/li[1]/a')).getText().then(function (text) {
				requestId = Number(text.substr(text.indexOf('#') + 1));
			});
			browser.sleep(sleepTime * 4);
			var dollrs;
			var extras = element.all(by.repeater("extra_charge in extra_charges"));
			extras.count().then(function (result) {
				result -= 2;
				extras.get(Math.floor(Math.random() * result + 1)).click();
				extras.get(Math.floor(Math.random() * result + 1)).click();
				extras.get(Math.floor(Math.random() * result + 1)).click();
				element(by.xpath('//div[contains(text(),"Total Packings")]')).getText().then(function (text) {
					dollrs = Number(text.substr(text.indexOf('$') + 1));
					element(by.xpath('//button[@ng-click="save()"]')).click();
					browser.sleep(sleepTime * 6);
					element(by.xpath('//label[@ng-click="openAddServicesModal();"]')).click();
					browser.sleep(sleepTime * 4);
					var adddollrs;
					var additionals = element.all(by.repeater("extra_charge in extra_charges"));
					additionals.count().then(function (result) {
						result -= 3;
						additionals.get(Math.floor(Math.random() * result + 2)).click();
						additionals.get(Math.floor(Math.random() * result + 2)).click();
						additionals.get(Math.floor(Math.random() * result + 2)).click();
						browser.sleep(sleepTime * 1);
						element(by.xpath('//div[contains(text(),"Total Services")]')).getText().then(function (text) {
							adddollrs = Number(text.substr(text.indexOf('$') + 1));
							element(by.xpath('//button[@ng-click="save()"]')).click();
							browser.sleep(sleepTime * 6);
							element(by.xpath('//button[@ng-click="cancel()"]')).click();
							browser.sleep(sleepTime * 3);
							element(by.xpath("//td[contains(text(),'" + fullName + "')]")).click();
							browser.sleep(sleepTime * 4);
							TryToClickId('edit-status', function () {
								element(by.xpath('//label[@ng-click="openAddPackingModal();"]/../div')).getText().then(function (text) {
									expect(Number(text.substr(1))).toEqual(dollrs);
									element(by.xpath('//label[@ng-click="openAddServicesModal();"]/../div[2]')).getText().then(function (text) {
										expect(Number(text.substr(1))).toEqual(adddollrs);


										//----------------------------�������� ��������
										var trucks = element(by.css('.park_lot')).element(by.css('.trucks')).all(by.tagName('div'));
										trucks.count().then(function (c) {
											recurs = function (number, count, a) { //������� ������� �����, ����� ���������� � ������ �����
												if (number <= count) {  //���� �� �� ����� �� �����
													element.all(by.xpath('//tr[@ng-repeat="(tid,truck_name) in ::trucks"][' + number + ']/td/div/span')).count().then(function (result) { //������� ����� ������� ������
														if (result < 2) { //���� ������ ����, ����� ������ ��������
															browser.actions().click(trucks.get(number - 1)).perform();
															return true; //���������� true ��� ������������� ����
														} else { //����� ��� ������
															return recurs(number + 1, count, a); //���������� ��, ��� ��� ��������� �����
														}
													});

												} else {
													return false;
												}
											};
											var a1 = element.all(by.xpath('//tr[@ng-repeat="(tid,truck_name) in ::trucks"]')).count().then(function (a) {
												temp = recurs(1, a, a1);
											});
										});


										var status = element(by.id('edit-status'));
										status.click();
										browser.sleep(sleepTime * 1);
										status.all(by.tagName('option')).then(function (stats) {
											stats[1].click();
										});
										browser.sleep(sleepTime * 1);
										element(by.xpath("//button[contains(text(),'Changes')]")).click();
										browser.sleep(sleepTime * 4);
										element(by.xpath("//div[contains(text(),'Update request and send emails')]")).click();
										browser.sleep(sleepTime * 10);
										//-----------------------------------��� �� ������� Client
										TryToClickXpath('//li[@heading="Client"]/a', function () {
											//element(by.xpath('//li[@heading="Client"]/a')).click();
											browser.sleep(sleepTime * 2);
											element(by.model('client.password')).sendKeys('123');
											browser.sleep(sleepTime * 2);
											element(by.xpath("//button[contains(text(),'Update')]")).click();
											browser.sleep(sleepTime * 2);
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

	it('go to client', function () {
		//----------------------------------��������� ���� � �������, ��� � �������
		browser.get(clientURL);
		browser.ignoreSynchronization = true; //��� ����� ��������
		TryToClickModel('email', function () {
			//clientLogin('mCWstzLi@gmail.com', '123');
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

	it('Enter Address', function () {
		element(by.xpath("//span[@ng-click='vm.openAddressModal()']")).click();
		browser.sleep(sleepTime * 2);
		element(by.xpath('//input[@field="request.field_moving_to"]')).sendKeys(randomCifra(5));
		element(by.xpath('//input[@field="request.apt_to"]')).sendKeys(randomCifra(2));
		element(by.css('.modal-footer')).element(by.css('.btn-primary')).click();
		TryToClickXpath('//div[@class="sweet-alert showSweetAlert visible"]/div/div/button', function () {
			browser.sleep(sleepTime);
			TryToClickXpath('//div[@class="sweet-alert showSweetAlert visible"]/div/div/button', function () {
				browser.sleep(sleepTime * 4);
				element(by.xpath('//a[@ng-click="vm.goToRequest(vm.request.storage_id)"]')).click();
				browser.sleep(sleepTime * 2);
				element(by.xpath("//span[@ng-click='vm.openAddressModal()']")).click();
				browser.sleep(sleepTime * 2);
				element(by.xpath('//input[@field="request.field_moving_from"]')).sendKeys(randomCifra(5));
				element(by.xpath('//input[@field="request.apt_from"]')).sendKeys(randomCifra(2));
				element(by.css('.modal-footer')).element(by.css('.btn-primary')).click();
				TryToClickXpath('//div[@class="sweet-alert showSweetAlert visible"]/div/div/button', function () {
					TryToClickXpath('//div[@class="sweet-alert showSweetAlert visible"]/div/div/button', function () {
						browser.sleep(sleepTime * 5);
						element(by.xpath('//a[@ng-click="vm.goToRequest(vm.request.storage_id)"]')).click();
						browser.sleep(sleepTime * 3);
					});
				});
			});
		});
	});

	it('clicking all tabs, finish on inventory', function () {

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
		browser.sleep(sleepTime);
		TryToClickXpath('//div[@class="sweet-alert showSweetAlert visible"]/div/div/button', function () {
			browser.sleep(sleepTime);
			TryToClickXpath('//div[@class="sweet-alert showSweetAlert visible"]/div/div/button', function () {
				browser.sleep(500);

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
				element(by.buttonText("Save Move Details")).click();
				browser.sleep(sleepTime * 7);
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

	it('again in Adminka', function () {
		//-----------------------------------��� ������� � ������� ����� ����� ��������� Not Confirmed
		browser.sleep(sleepTime * 2);
		TryToClickId('edit-status', function () {
			var status = element(by.id('edit-status'));
			browser.sleep(sleepTime * 1);
			status.all(by.tagName('option')).then(function (stats) {
				stats[1].click();
				console.log("option 1 Click");
			});
			element(by.xpath("//button[contains(text(),'Changes')]")).click();
			browser.sleep(sleepTime * 4);
			element(by.xpath("//div[contains(text(),'Update request and send emails')]")).click();
			browser.sleep(sleepTime * 4);
			adminLogout();
			//������� ����� Not Confirmed, ������ ����� ���������� ���
		});
	});

	it('Goto Client Again', function () {
		browser.get(clientURL);
		browser.ignoreSynchronization = true; //��� ����� ��������
		TryToClickModel('email', clientLogin(email, '123'));
	});

	it('give a sign', function () {
		//clientLogin('YUtifVIa@gmail.com', '123');
		TryToClickXpath("//span[contains(text(),'Not Confirmed')]/../../td/button", function () {
			//temp = element(by.xpath("//span[contains(text(),'Not Confirmed')]/../../td/button[1]")).click();
			//temp = element(by.xpath("//td/button[1]")).click();
			browser.sleep(sleepTime * 3);
			var startButton = element.all(by.css('.request-button'));
			startButton.count().then(function (result) {
				if (result != 0) startButton.get(0).click();
			});
			browser.sleep(sleepTime * 2);
			element(by.xpath("//div[@class=\"field-status notconfirmed ng-scope\"]/a")).click();
			browser.sleep(sleepTime * 3);

			element(by.id('terms')).click();
			element(by.id('cancel_policy')).click();
			browser.sleep(sleepTime * 0.5);
			var payBtn = element.all(by.xpath("//*[@type='submit']"));
			payBtn.count().then(function (result) {
				if (result != 0) payBtn.get(0).click();
			});
			browser.sleep(sleepTime * 4);
			element(by.id("card_number")).sendKeys("4111111111111111");
			element(by.id("exp_month")).sendKeys("11");
			element(by.id("exp_year")).sendKeys("17");
			element(by.id("cvc")).sendKeys("333");

			element(by.xpath("//input[@type='submit']")).click();
			browser.sleep(sleepTime * 2);
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
				browser.sleep(sleepTime * 6);
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
				//element(by.xpath("//td[contains(text(),'" + requestId + "')]")).click();
			});
		});
	});

	it('select a Foreman', function () {

		browser.sleep(sleepTime * 5);
		//requestId=4875;//++++++++++++++��� �������
		element(by.xpath("//td[contains(text(),'" + requestId + "')]/../td[@class=\"dtDate ng-binding\"]")).getText().then(function (result) {
			/*moveDate.day = Number(result.substr(3, 2));
			 moveDate.month = Number(result.substr(0, 2));
			 moveDate.year = Number(result.substr(6, 4));
			 */
			//---------------------------------��� � local dispatch
			browser.get('http://secure.themoveboard.com/moveBoard/#/dispatch/local')
			browser.sleep(sleepTime * 3);

			//-------------------------------������ ���� ������� ������ ����
			//������ ������ ���

			var findYear = function (target) {
				browser.sleep(sleepTime * 3);
				element(by.css(".ui-datepicker-year")).getText().then(function (result) {
					var current = Number(result);
					element(by.model("search")).clear();
					element(by.model("search")).sendKeys('target:' + moveDate.year + ' current:' + current);
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
			findYear(future.getFullYear());
			browser.sleep(sleepTime * 3);
			//������ ������ �����
			var findMonth = function (target) {
				browser.sleep(sleepTime * 4);
				element(by.css(".ui-datepicker-month")).getText().then(function (result) {
					var current = monthNumbers[result.toUpperCase()];
					element(by.model("search")).clear();
					element(by.model("search")).sendKeys('tar:' + moveDate.month + ' cur:' + current);
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
			element(by.model("search")).clear();
			browser.sleep(sleepTime * 3);
			element(by.xpath('//a[@class="ui-state-default" and contains(text(),' + future.getDate() + ')]')).click();
			var reqString = "request_" + requestId;

			TryToClickId(reqString, function () {
				//element(by.id(reqString)).click();
				browser.sleep(sleepTime * 2);

				element(by.model('vm.data.foreman')).click();
				browser.sleep(sleepTime);
				element(by.model('vm.data.foreman')).element(by.xpath("option[contains(text(),'Jack Nikolsan')]")).click();
				browser.sleep(sleepTime);

				var helpers = element.all(by.model('vm.data.baseCrew.helpers[$index]'));
				helpers.count().then(function (helpersCount) {
					helpers.get(0).click();
					helpers.get(0).element(by.xpath("optgroup/option[contains(text(),'Helper2 2')]")).click();
					browser.sleep(sleepTime);

					if (helpersCount > 1) {
						helpers.get(1).click();
						helpers.get(1).element(by.xpath("optgroup/option[contains(text(),'Helper 3 3')]")).click();
						browser.sleep(sleepTime);
					}
				});

				element(by.linkText("Send")).click();
				TryToClickCss(".confirm", function () {
					element(by.css(".confirm")).click();
					browser.sleep(sleepTime * 3);
				});
			});
		});
	});

	/*
	 it('lookingForPending', function () {
	 browser.get(pendingUrl);
	 browser.sleep(sleepTime*6);
	 OpenRequest(requestId);
	 element(by.xpath('//button[@ng-click="closeModal()"]')).click();
	 browser.sleep(sleepTime*1);
	 });
	 */
	/*
	 it('AdminLogout', function () {
	 adminLogout();
	 });

	 it('nikolsoning', function () {
	 NikolsanLogin();

	 browser.sleep(sleepTime * 3);

	 openRequest(requestId);
	 //openRequest("4957");
	 browser.sleep(sleepTime * 4);
	 element(by.id('tab_Contract Page')).click();
	 browser.sleep(sleepTime * 2);

	 element(by.xpath('//div[@id="step_0" and @ng-click="clickOpenSignature()"]')).click();
	 browser.sleep(sleepTime * 2);
	 NikolsanSign();
	 browser.sleep(sleepTime * 5);
	 element(by.xpath('//div[@id="step_1" and @ng-click="clickOpenSignature()"]')).click();
	 browser.sleep(sleepTime * 2);
	 NikolsanSign();
	 browser.sleep(sleepTime * 5);
	 element(by.xpath('//div[@id="step_2" and @ng-click="clickOpenSignature()"]')).click();
	 browser.sleep(sleepTime * 5);
	 NikolsanSign();


	 browser.sleep(sleepTime * 5);
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
	 browser.sleep(sleepTime * 5);
	 element(by.xpath('//div[@id="step_4" and @ng-click="clickOpenSignature()"]')).click();
	 browser.sleep(sleepTime * 2);
	 NikolsanSign();
	 browser.sleep(sleepTime * 5);
	 //----------------------------------������ ���� ��������� ����
	 expect(element(by.xpath('//th[contains(text(),"Total hourly charge")]/../td[2]')).getText()).toEqual('6');

	 //----------------------------------������ ������ ������� ������
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
	 browser.sleep(sleepTime * 5);
	 element(by.xpath('//a[contains(text(),"+ add a service")]')).click();
	 browser.sleep(500);
	 var services = element.all(by.repeater('s in additionalServicesRef'));
	 services.count().then(function (count) {
	 count -= 3;
	 services.get(Math.floor(Math.random() * count + 1)).click();
	 });

	 //---------------------------------� ���������, ��� �� ��������
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
	 expect(Number(text)).toEqual('480');
	 });

	 //-----------------------------------���������, ����� Balance = 0
	 element(by.xpath('//p[contains(text(),"Total balance paid:")]/../../td[2]')).getText().then(function (text) {
	 //expect(text.substr(text.indexOf('$') + 1,5)).toEqual('Balance');
	 expect(Number(text.substr(text.indexOf('$') + 1, 5))).toEqual(0);
	 });
	 browser.sleep(sleepTime * 5);
	 element(by.xpath('//div[@ng-click="applyPayment()"]')).click();
	 browser.sleep(sleepTime * 5);
	 element(by.xpath('//button[@ng-click="goStepTwo();"]')).click();
	 browser.sleep(sleepTime * 3);
	 element(by.id("card_number")).sendKeys("4111111111111111");
	 element(by.id("exp_month")).sendKeys("11");
	 element(by.id("exp_year")).sendKeys("17");
	 element(by.id("cvc")).sendKeys("222");

	 element(by.xpath("//input[@type='submit']")).click();
	 browser.sleep(9000);
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
	 browser.sleep(sleepTime * 2);
	 element(by.xpath('//button[@ng-click="saveSignature()"]')).click();
	 browser.sleep(sleepTime * 6);
	 });

	 it('should upload a file', function () {

	 browser.sleep(sleepTime * 5);
	 var path = require('path');//��� �� ������ � NodeJS ����������� path
	 var slip_image = element(by.id("inputImage"));
	 var fileToUpload = "D:/git.jpg";//��� ���� � ����� (�� ����� ��� �� ������������ ����-��)
	 browser.sleep(sleepTime * 3);
	 var absolutePath = path.resolve(__dirname, fileToUpload); //����������� ������������� ���� � ����������(� ����� ������ ������ ������������� ����� �������)
	 browser.sleep(sleepTime * 3);
	 //slip_image.click();//�����, ��������, ����� � �� ������...
	 //browser.sleep(sleepTime*1);
	 //expect(absolutePath).toEqual('path.resolve'); //�������, ���� �� ��� ����������
	 slip_image.sendKeys(absolutePath);
	 browser.sleep(sleepTime * 3);
	 element(by.xpath("(//button[contains(text(),'Save')])[4]")).click();
	 browser.sleep(sleepTime * 3);
	 });

	 it('remaining sign', function () {
	 browser.sleep(sleepTime * 5);
	 element(by.xpath("//div[@id='step_5']/div[1]")).click();
	 NikolsanSign();
	 browser.sleep(sleepTime * 5);
	 element(by.xpath("//div[@id='step_6']/div[1]")).click();
	 NikolsanSign();
	 browser.sleep(sleepTime * 4);
	 //element(by.buttonText("Submit contract")).click();
	 element(by.xpath('//button[@ng-click="submitContractBtn({ isBtn: true })"]')).click();
	 browser.sleep(sleepTime * 8);
	 sweetConfirm();
	 });
	 */
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
		//element(by.xpath("//td[contains(text(),'" + r + "')]")).click();
		element(by.xpath("//td[contains(text(),'" + r + "')]")).click();
		//browser.sleep(sleepTime * 7);
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
		browser.get(clientURL);
		browser.ignoreSynchronization = true; //��� ����� ��������
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

	function randomCifra(length) {
		var s = "";
		for (i = 0; i < length; i++) {
			s += Math.floor(Math.random() * 10);
		}
		return s;
	}

	function OpenRequest(r) {
		element(by.xpath("//td[contains(text(),'" + r + "')]")).click();
		//element(by.xpath("//td[contains(text(),'" + r + "')]")).click();
		browser.sleep(sleepTime * 4);
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