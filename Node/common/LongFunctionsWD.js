module.exports = function (SF, JS, MF, JSstep, VD, V, By, until, FileDetector, system, condition, config, constants) {
	function FullSmallCalcAsLocal(client) {
		SF.sleep(2.5);
		MF.FrontSiteSmallCalc_SendZipCode('02461', '02032');
		MF.FrontSiteSmallCalc_ClickCalendar();
		V.frontNumbers = {};
		driver.wait(driver.executeScript(JSstep.Click4DaysNewCalendar).then(function (D) {
			V.frontNumbers.moveDate = D;
			console.log(V.frontNumbers.moveDate);
		}), config.timeout);
		MF.FrontSiteSmallCalc_ClickContinue();
		MF.FrontSiteSmallCalc_ClickChooseMoveSize();
		MF.FrontSiteSmallCalc_SelectMoveSize(4);
		MF.FrontSiteSmallCalc_ClickDoneMoveSize();
		MF.FrontSiteSmallCalc_SelectEntrance(4, 3);
		MF.FrontSiteSmallCalc_ClickContinueContractInfo();
		MF.FrontSiteSmallCalc_SetClientInfo(client);
		MF.FrontSite_SelectGoogleSearch();
		MF.FrontSiteSmallCalc_SubmitQuoteAndGoToAccount();
	}

	function FullSmallCalcAsLD(client) {
		SF.sleep(2.5);
		MF.FrontSiteSmallCalc_SendZipCode('02461', '90001');
		MF.FrontSiteSmallCalc_ClickCalendar();
		V.frontNumbers = {};
		driver.wait(driver.executeScript(JSstep.Click4DaysNewCalendar).then(function (D) {
			V.frontNumbers.moveDate = D;
			console.log(V.frontNumbers.moveDate);
		}), config.timeout);
		MF.FrontSiteSmallCalc_ClickContinue();
		MF.FrontSiteSmallCalc_ClickChooseMoveSize();
		MF.FrontSiteSmallCalc_SelectMoveSize(4);
		MF.FrontSiteSmallCalc_ClickDoneMoveSize();
		MF.FrontSiteSmallCalc_SelectEntrance(4, 3);
		MF.FrontSiteSmallCalc_ClickContinueContractInfo();
		MF.FrontSiteSmallCalc_SetClientInfo(client);
		MF.FrontSite_SelectGoogleSearch();
		MF.FrontSiteSmallCalc_SubmitQuoteAndGoToAccount();
	}

	function FullSmallCalcAsUnloading(client) {
		MF.FrontSiteSmallCalc_ClickNeedStorageCheckbox();
		MF.FrontSiteSmallCalc_SelectServiceType(4);
		MF.FrontSiteSmallCalc_SendZipTo('02111');
		MF.FrontSiteSmallCalc_ClickCalendar();
		V.frontNumbers = {};
		driver.wait(driver.executeScript(JSstep.Click4DaysNewCalendar).then(function (D) {
			V.frontNumbers.moveDate = D;
			console.log(V.frontNumbers.moveDate);
		}), config.timeout);
		MF.FrontSiteSmallCalc_ClickContinue();
		MF.FrontSiteSmallCalc_ClickChooseMoveSize();
		MF.FrontSiteSmallCalc_SelectMoveSize(4);
		MF.FrontSiteSmallCalc_ClickDoneMoveSize();
		MF.FrontSiteSmallCalc_SelectEntrance(4, 3);
		MF.FrontSiteSmallCalc_ClickContinueContractInfo();
		MF.FrontSiteSmallCalc_SetClientInfo(client);
		MF.FrontSite_SelectGoogleSearch();
		MF.FrontSiteSmallCalc_SubmitQuoteAndGoToAccount();
	}

	function FullSmallCalcAsFlateRate(client) {
		SF.sleep(2.5);
		MF.FrontSiteSmallCalc_SendZipCode('02461', '07304');
		MF.FrontSiteSmallCalc_ClickCalendar();
		V.frontNumbers = {};
		driver.wait(driver.executeScript(JSstep.Click4DaysNewCalendar).then(function (D) {
			V.frontNumbers.moveDate = D;
			console.log(V.frontNumbers.moveDate);
		}), config.timeout);
		MF.FrontSiteSmallCalc_ClickContinue();
		MF.FrontSiteSmallCalc_ClickChooseMoveSize();
		MF.FrontSiteSmallCalc_SelectMoveSize(4);
		MF.FrontSiteSmallCalc_ClickDoneMoveSize();
		MF.FrontSiteSmallCalc_SelectEntrance(4, 3);
		MF.FrontSiteSmallCalc_ClickContinueContractInfo();
		MF.FrontSiteSmallCalc_SetClientInfo(client);
		MF.FrontSite_SelectGoogleSearch();
		MF.FrontSiteSmallCalc_SubmitQuoteAndGoToAccount();
	}

	function FullSmallCalcAsLoading(client) {
		MF.FrontSiteSmallCalc_ClickNeedStorageCheckbox();
		MF.FrontSiteSmallCalc_SelectServiceType(3);
		MF.FrontSiteSmallCalc_SendZipFrom('02032');
		MF.FrontSiteSmallCalc_ClickCalendar();
		V.frontNumbers = {};
		driver.wait(driver.executeScript(JSstep.Click4DaysNewCalendar).then(function (D) {
			V.frontNumbers.moveDate = D;
			console.log(V.frontNumbers.moveDate);
		}), config.timeout);
		MF.FrontSiteSmallCalc_ClickContinue();
		MF.FrontSiteSmallCalc_ClickChooseMoveSize();
		MF.FrontSiteSmallCalc_SelectMoveSize(4);
		MF.FrontSiteSmallCalc_ClickDoneMoveSize();
		MF.FrontSiteSmallCalc_SelectEntrance(4, 3);
		MF.FrontSiteSmallCalc_ClickContinueContractInfo();
		MF.FrontSiteSmallCalc_SetClientInfo(client);
		MF.FrontSite_SelectGoogleSearch();
		MF.FrontSiteSmallCalc_SubmitQuoteAndGoToAccount();
	}

	function FullSmallCalcAsMovingWithStorage(client) {
		MF.FrontSiteSmallCalc_ClickNeedStorageCheckbox();
		MF.FrontSiteSmallCalc_SelectServiceType(2);
		MF.FrontSiteSmallCalc_SendZipCode('02461', '02032');
		MF.FrontSiteSmallCalc_ClickCalendar();
		V.frontNumbers = {};
		driver.wait(driver.executeScript(JSstep.Click4DaysNewCalendar).then(function (D) {
			V.frontNumbers.moveDate = D;
			console.log(V.frontNumbers.moveDate);
		}), config.timeout);
		SF.sleep(2);
		driver.wait(driver.executeScript("$('ultrasmall-form input[ng-model=\"request.deliveryDate\"]').focus();"), config.timeout);
		JS.waitForExist('div.picker__box:visible');
		SF.sleep(2);
		driver.wait(driver.executeScript(JSstep.Click8DaysNewCalendar).then(function (D) {
			V.frontNumbers.deliveryDate = D;
			console.log(V.frontNumbers.deliveryDate);
		}), config.timeout);
		SF.sleep(1);
		MF.FrontSiteSmallCalc_ClickContinue();
		MF.FrontSiteSmallCalc_ClickChooseMoveSize();
		MF.FrontSiteSmallCalc_SelectMoveSize(4);
		MF.FrontSiteSmallCalc_ClickDoneMoveSize();
		MF.FrontSiteSmallCalc_SelectEntrance(4, 3);
		MF.FrontSiteSmallCalc_ClickContinueContractInfo();
		MF.FrontSiteSmallCalc_SetClientInfo(client);
		MF.FrontSite_SelectGoogleSearch();
		MF.FrontSiteSmallCalc_SubmitQuoteAndGoToAccount();
	}

	function AccountLocalEnterAddress() {
		MF.Account_OpenAdressModal();
		SF.send(By.xpath('//input[@type="field_moving_from"][@placeholder="From Address"]'), 'Address From');
		SF.send(By.xpath('//input[@type="field_moving_to"][@placeholder="To Address"]'), 'Address To');
		SF.click(By.xpath('//button[@ng-click="update(client)"]'));
		MF.Account_SweetUpdateConfirm();
		MF.SweetConfirm();
		MF.WaitWhileBusy();
	}

	function AccountUnloadingEnterAddress() {
		MF.Account_OpenAdressModal();
		SF.send(By.xpath('//input[@type="field_moving_to"][@placeholder="To Address"]'), 'Address To');
		SF.click(By.xpath('//button[@ng-click="update(client)"]'));
		MF.Account_SweetUpdateConfirm();
		MF.SweetConfirm();
		MF.WaitWhileBusy();
	}

	function AccountLoadingEnterAddress() {
		MF.Account_OpenAdressModal();
		SF.click(By.xpath('//input[@type="field_moving_from"][@placeholder="From Address"]'));
		SF.send(By.xpath('//input[@type="field_moving_from"][@placeholder="From Address"]'), 'From Address');
		SF.click(By.xpath('//button[@ng-click="update(client)"]'));
		MF.Account_SweetUpdateConfirm();
		MF.SweetConfirm();
		MF.WaitWhileBusy();
	}

	function AccountToStorageEnterAddress() {
		MF.Account_OpenAdressModal();
		SF.click(By.xpath('//input[@type="field_moving_from"][@placeholder="From Address"]'));
		SF.send(By.xpath('//input[@type="field_moving_from"][@placeholder="From Address"]'), 'Otkuda edem');
		SF.sleep(2);
		SF.click(By.xpath('//button[@ng-click="update(client)"]'));
		MF.Account_SweetUpdateConfirm();
		MF.SweetConfirm();
		MF.WaitWhileBusy();
	}

	function AccountFromStorageEnterAddress() {
		MF.Account_OpenAdressModal();
		SF.click(By.xpath('//input[@type="field_moving_to"][@placeholder="To Address"]'));
		SF.send(By.xpath('//input[@type="field_moving_to"][@placeholder="To Address"]'), 'Kuda edem');
		SF.sleep(2);
		SF.click(By.xpath('//button[@ng-click="update(client)"]'));
		MF.Account_SweetUpdateConfirm();
		MF.SweetConfirm();
		MF.WaitWhileBusy();
	}

	function AccountFlatRateAddInventory() {
		JS.waitForExist('a[ng-repeat="filter in room.filters track by $id(filter)"]');
		SF.sleep(5);
		SF.click(By.xpath('(//div[@class="new-inventory-item"])[1]//button[@ng-click="onClickCounter(1)"]'));
		SF.click(By.xpath('(//div[@class="new-inventory-item"])[2]//button[@ng-click="onClickCounter(1)"]'));
		SF.click(By.xpath('(//div[@class="new-inventory-item"])[3]//button[@ng-click="onClickCounter(1)"]'));
		SF.click(By.xpath('(//div[@class="new-inventory-item"])[4]//button[@ng-click="onClickCounter(1)"]'));
		SF.click(By.xpath('(//div[@class="new-inventory-item"])[5]//button[@ng-click="onClickCounter(1)"]'));
		SF.click(By.xpath('(//div[@class="new-inventory-item"])[6]//button[@ng-click="onClickCounter(1)"]'));
		SF.click(By.xpath('(//div[@class="new-inventory-item"])[7]//button[@ng-click="onClickCounter(1)"]'));
		SF.click(By.xpath('(//div[@class="new-inventory-item"])[8]//button[@ng-click="onClickCounter(1)"]'));
		SF.click(By.xpath('(//div[@class="new-inventory-item"])[1]//button[@ng-click="onClickCounter(-1)"]/following-sibling::button'));
		SF.click(By.xpath('(//div[@class="new-inventory-item"])[2]//button[@ng-click="onClickCounter(-1)"]/following-sibling::button'));
		SF.click(By.xpath('(//div[@class="new-inventory-item"])[3]//button[@ng-click="onClickCounter(-1)"]/following-sibling::button'));
		SF.click(By.xpath('(//div[@class="new-inventory-item"])[4]//button[@ng-click="onClickCounter(-1)"]/following-sibling::button'));
		SF.click(By.xpath('//span[contains(text(), "Save Inventory")]'));
		SF.sleep(7);
	}

	function AccountLocalAddInventory(accountNumbers) {
		MF.Account_ClickInventoryOpenTab();
		SF.click(By.xpath('(//div[@class="new-inventory-item"])[1]//button[@ng-click="onClickCounter(1)"]'));
		SF.click(By.xpath('(//div[@class="new-inventory-item"])[2]//button[@ng-click="onClickCounter(1)"]'));
		SF.click(By.xpath('(//div[@class="new-inventory-item"])[3]//button[@ng-click="onClickCounter(1)"]'));
		SF.click(By.xpath('(//div[@class="new-inventory-item"])[4]//button[@ng-click="onClickCounter(1)"]'));
		SF.click(By.xpath('(//div[@class="new-inventory-item"])[5]//button[@ng-click="onClickCounter(1)"]'));
		SF.click(By.xpath('(//div[@class="new-inventory-item"])[6]//button[@ng-click="onClickCounter(1)"]'));
		SF.click(By.xpath('(//div[@class="new-inventory-item"])[7]//button[@ng-click="onClickCounter(1)"]'));
		SF.click(By.xpath('(//div[@class="new-inventory-item"])[8]//button[@ng-click="onClickCounter(1)"]'));
		SF.click(By.xpath('(//div[@class="new-inventory-item"])[1]//button[@ng-click="onClickCounter(-1)"]/following-sibling::button'));
		SF.click(By.xpath('(//div[@class="new-inventory-item"])[2]//button[@ng-click="onClickCounter(-1)"]/following-sibling::button'));
		SF.click(By.xpath('(//div[@class="new-inventory-item"])[3]//button[@ng-click="onClickCounter(-1)"]/following-sibling::button'));
		SF.click(By.xpath('(//div[@class="new-inventory-item"])[4]//button[@ng-click="onClickCounter(-1)"]/following-sibling::button'));
		SF.click(By.xpath('(//div[@class="new-inventory-item"])[5]//button[@ng-click="onClickCounter(-1)"]/following-sibling::button'));
		MF.Account_ClickSaveInventory();
		// if (accountNumbers != undefined) {
		//     driver.wait(driver.executeScript('return $(\'div.inventory__toolbar-item:contains("Total Estimated Cubic Feet:")\').text()').then(
		//         function (text) {
		//             accountNumbers.InventoryCbf = SF.cleanPrice(text);
		//             console.log("cbf = " + accountNumbers.InventoryCbf);
		//         }
		//     ),config.timeout);
		// }
	}

	function AddInventory_InHomeEstimate() {
		JS.scroll('a[ng-click="select(tabs[1])"]');
		SF.click(By.xpath('//a[@ng-click="select(tabs[1])"]'));
		SF.sleep(5);
		SF.click(By.xpath('(//div[@class="new-inventory-item"])[1]//button[@ng-click="onClickCounter(1)"]'));
		SF.click(By.xpath('(//div[@class="new-inventory-item"])[2]//button[@ng-click="onClickCounter(1)"]'));
		SF.click(By.xpath('(//div[@class="new-inventory-item"])[3]//button[@ng-click="onClickCounter(1)"]'));
		SF.click(By.xpath('(//div[@class="new-inventory-item"])[4]//button[@ng-click="onClickCounter(1)"]'));
		SF.click(By.xpath('(//div[@class="new-inventory-item"])[5]//button[@ng-click="onClickCounter(1)"]'));
		SF.click(By.xpath('(//div[@class="new-inventory-item"])[6]//button[@ng-click="onClickCounter(1)"]'));
		SF.click(By.xpath('(//div[@class="new-inventory-item"])[7]//button[@ng-click="onClickCounter(1)"]'));
		SF.click(By.xpath('(//div[@class="new-inventory-item"])[8]//button[@ng-click="onClickCounter(1)"]'));
		SF.click(By.xpath('(//div[@class="new-inventory-item"])[1]//button[@ng-click="onClickCounter(-1)"]/following-sibling::button'));
		SF.click(By.xpath('//button[@class="inventory__save-button md-button md-ink-ripple"]'));
		MF.WaitWhileBusy();
		SF.sleep(1);
	}

	function ContractAdditionalInventoryAdd() {
		SF.sleep(1);
		SF.click(By.xpath('//button[@ng-click="openAdditionalInventory()"]'));
		JS.waitForExist('a[ng-repeat="filter in room.filters track by $id(filter)"]');
		SF.sleep(4);
		SF.click(By.xpath('(//div[@class="new-inventory-item"])[1]//button[@ng-click="onClickCounter(1)"]'));
		SF.click(By.xpath('(//div[@class="new-inventory-item"])[2]//button[@ng-click="onClickCounter(1)"]'));
		SF.click(By.xpath('(//div[@class="new-inventory-item"])[3]//button[@ng-click="onClickCounter(1)"]'));
		SF.click(By.xpath('(//div[@class="new-inventory-item"])[4]//button[@ng-click="onClickCounter(1)"]'));
		SF.click(By.xpath('(//div[@class="new-inventory-item"])[5]//button[@ng-click="onClickCounter(1)"]'));
		SF.click(By.xpath('(//div[@class="new-inventory-item"])[6]//button[@ng-click="onClickCounter(1)"]'));
		SF.click(By.xpath('//a[@ng-click="setCustomItemMode()"]'));
		SF.sleep(4);
		SF.send(By.id('customInventoryName'), 'custom item sofa');
		SF.sleep(0.5);
		SF.send(By.xpath('//input[@ng-model="newItem.height.value"]'), 40);
		SF.sleep(0.5);
		SF.send(By.xpath('//input[@ng-model="newItem.depth.value"]'), 70);
		SF.sleep(0.5);
		SF.send(By.xpath('//input[@ng-model="newItem.width.value"]'), 50);
		SF.sleep(0.5);
		SF.send(By.xpath('//input[@ng-model="newItem.count.value"]'), 3);
		SF.sleep(0.5);
		SF.click(By.xpath('//button[@ng-click="customItemForm.$setSubmitted()"]'));

	}

	function AccountLocalAddAdditionalInventory() {
		MF.WaitWhileBusy();
		JS.click('a[ng-click=\\"vm.select(tab)\\"]:contains(\\"Inventory\\")');
		SF.sleep(8);
		SF.click(By.xpath('(//div[@class="new-inventory-item"])[1]//button[@ng-click="onClickCounter(-1)"]/following-sibling::button'));
		SF.click(By.xpath('(//div[@class="new-inventory-item"])[2]//button[@ng-click="onClickCounter(-1)"]/following-sibling::button'));
		SF.click(By.xpath('(//div[@class="new-inventory-item"])[3]//button[@ng-click="onClickCounter(-1)"]/following-sibling::button'));
		SF.click(By.xpath('(//div[@class="new-inventory-item"])[4]//button[@ng-click="onClickCounter(-1)"]/following-sibling::button'));
		SF.click(By.xpath('(//div[@class="new-inventory-item"])[5]//button[@ng-click="onClickCounter(-1)"]/following-sibling::button'));
		SF.click(By.xpath('(//div[@class="new-inventory-item"])[6]//button[@ng-click="onClickCounter(-1)"]/following-sibling::button'));
		SF.click(By.xpath('(//div[@class="new-inventory-item"])[7]//button[@ng-click="onClickCounter(-1)"]/following-sibling::button'));
		SF.click(By.xpath('(//div[@class="new-inventory-item"])[8]//button[@ng-click="onClickCounter(-1)"]/following-sibling::button'));
		SF.click(By.xpath('(//div[@class="new-inventory-item"])[1]//button[@ng-click="onClickCounter(-1)"]/following-sibling::button'));
		SF.click(By.xpath('(//div[@class="new-inventory-item"])[2]//button[@ng-click="onClickCounter(-1)"]/following-sibling::button'));
		SF.click(By.xpath('(//div[@class="new-inventory-item"])[3]//button[@ng-click="onClickCounter(-1)"]/following-sibling::button'));
		MF.Account_ClickSaveInventory();
	}


	function HomeEstimate_CheckStatusinMoveboard() {
		MF.Board_OpenDashboard();
		MF.Board_OpenInhomeEstimateTab();
		driver.wait(driver.findElement(By.xpath('//td[contains(text(), "' + V.boardNumbers.Id + '")]')).getText().then(function (text) {
			V.InhomeDashboard = SF.cleanPrice(text);
			VD.IWant(VD.ToEqual, V.InhomeDashboard, V.boardNumbers.Id, 'реквеста нет в табе Inhome Estimate на дашборде')
		}), config.timeout);
		SF.sleep(1);
		MF.Board_LogoutAdmin();
	}

	function AccountLocalDetails() {
		JS.click('a[ng-click=\\"vm.select(tab)\\"]:contains(\\"Details\\")');
		MF.WaitWhileBusy();
		SF.sleep(3);
		MF.WaitWhileBusy();
		SF.select(By.xpath('//select[@id="current_door_to_parking"]'), 60);
		SF.select(By.xpath('//select[@id="new_door_to_parking"]'), 60);
		SF.select(By.xpath('//select[@id="current_parking_permit"]'), "PDW");
		SF.select(By.xpath('//select[@id="new_parking_permit"]'), "PDW");
		driver.executeScript("$('select#new_parking_permit').get(0).scrollIntoView();");
		SF.sleep(1);
		MF.WaitWhileBusy();
		SF.click(By.xpath('//button[@ng-click="saveDetails()"]'));
		driver.executeScript("$('body').scrollTop(0);");
		SF.sleep(5);
	}

	function AccountLoadingDetails() {
		JS.click('a[ng-click=\\"vm.select(tab)\\"]:contains(\\"Details\\")');
		MF.WaitWhileBusy();
		SF.sleep(3);
		MF.WaitWhileBusy();
		SF.select(By.xpath('//select[@id="current_door_to_parking"]'), 60);
		SF.select(By.xpath('//select[@id="current_parking_permit"]'), "PDW");
		SF.sleep(2);
		SF.click(By.xpath('//button[@ng-click="saveDetails()"]'));
		driver.executeScript("$('body').scrollTop(0);");
		SF.sleep(3);
	}

	function AccountUnLoadingDetails() {
		JS.click('a[ng-click=\\"vm.select(tab)\\"]:contains(\\"Details\\")');
		MF.WaitWhileBusy();
		SF.sleep(3);
		MF.WaitWhileBusy();
		SF.select(By.xpath('//select[@id="new_door_to_parking"]'), 60);
		SF.select(By.xpath('//select[@id="new_parking_permit"]'), "PDW");
		SF.sleep(2);
		SF.click(By.xpath('//button[@ng-click="saveDetails()"]'));
		driver.executeScript("$('body').scrollTop(0);");
		SF.sleep(3);
	}

	function Account_CheckSignature() {
		MF.Account_ClickViewConfirmationPage();
		MF.Account_CheckSignOnConfirmationPage();
		MF.Account_ConfirmationBackToRequest();
	}

	function RememberAccountNumbers(accountNumbers) {
		driver.wait(driver.executeScript('return $("div:contains(\\"Move Date :\\"):last").next().text()').then(function (dateString) {
			dateString = dateString.toUpperCase();
			accountNumbers.moveDate = {};
			accountNumbers.moveDate.Month = SF.FindMonthInString(dateString);
			accountNumbers.moveDate.Day = SF.cleanPrice(dateString.substring(0, dateString.indexOf(',')));
			accountNumbers.moveDate.Year = SF.cleanPrice(dateString.substring(dateString.indexOf(',')));
		}), config.timeout);
		driver.wait(driver.executeScript('return $("div:contains(\\"Crew Size :\\"):last").next().text()').then(function (text) {
			accountNumbers.CrewSize = SF.cleanPrice(text);
		}), config.timeout);
		driver.wait(driver.executeScript('return $("div:contains(\\"Truck :\\"):last").next().text()').then(function (text) {
			accountNumbers.Trucks = SF.cleanPrice(text);
		}), config.timeout);
		driver.wait(driver.executeScript('return $("div:contains(\\"Hourly Rate :\\"):last").next().text()').then(function (text) {
			accountNumbers.HourlyRate = text.indexOf('$', 4) == -1 ?
				SF.cleanPrice(text) :
				SF.cleanPrice(text.substring(text.indexOf('$', 4)));
		}), config.timeout);
		driver.wait(driver.findElement(By.xpath('//div[contains(text(),"Move Size")]/following-sibling::div[1]')).getText().then(function (text) {
			accountNumbers.cbf = SF.cleanPrice(text.substring(text.indexOf('Inventory') + 9, text.indexOf('c.f.')));
		}), config.timeout);
		driver.wait(driver.findElement(By.xpath('//span[contains(text(),"Fuel Surcharge")]/../../div[2]')).getText().then(function (text) {
			accountNumbers.Fuel = SF.cleanPrice(text);
		}), config.timeout);
		driver.wait(driver.executeScript(JSstep.getServicesCostAccount), config.timeout).then(function (ServicesText) {
			accountNumbers.AdServices = SF.cleanPrice(ServicesText);
		});
		driver.wait(driver.executeScript(JSstep.getPackingsCostAccount), config.timeout).then(function (ServicesText) {
			accountNumbers.Packing = SF.cleanPrice(ServicesText);
		});
		driver.wait(driver.findElement(By.xpath('//span[contains(text(),"Travel Time")]/../following-sibling::div[1]')).getText().then(function (text) {
			let hours = text.indexOf('hr') == -1 ? 0 : SF.cleanPrice(text.substring(0, text.indexOf('hr')));
			let minutes = text.indexOf('min') == -1 ? 0 : SF.cleanPrice(text.substring((text.indexOf('hr') + 1), text.indexOf('min')));
			accountNumbers.TravelTime = hours * 60 + minutes;
		}), config.timeout);

		driver.wait(driver.findElement(By.xpath('//div[contains(text(),"Estimated Labor time")]/following-sibling::div[1]')).getText().then(function (text) {
			let textMin = text.substring(0, text.indexOf('-'));
			let textMax = text.substring(text.indexOf('-') + 1);
			let hoursMin = textMin.indexOf('hr') == -1 ? 0 : SF.cleanPrice(textMin.substring(0, textMin.indexOf('hr')));
			let minutesMin = textMin.indexOf('min') == -1 ? 0 : SF.cleanPrice(textMin.substring((textMin.indexOf('hr') + 1), textMin.indexOf('min')));
			accountNumbers.LaborTimeMin = hoursMin * 60 + minutesMin;
			let hoursMax = textMax.indexOf('hr') == -1 ? 0 : SF.cleanPrice(textMax.substring(0, textMax.indexOf('hr')));
			let minutesMax = textMax.indexOf('min') == -1 ? 0 : SF.cleanPrice(textMax.substring((textMax.indexOf('hr') + 1), textMax.indexOf('min')));
			accountNumbers.LaborTimeMax = hoursMax * 60 + minutesMax;
		}), config.timeout);

		driver.wait(driver.findElement(By.xpath('//div[contains(text(),"Estimated Job Time")]/../div[2]')).getText().then(function (text) {
			let textMin = text.substring(0, text.indexOf('-'));
			let textMax = text.substring(text.indexOf('-') + 1);
			let hoursMin = textMin.indexOf('hr') == -1 ? 0 : SF.cleanPrice(textMin.substring(0, textMin.indexOf('hr')));
			let minutesMin = textMin.indexOf('min') == -1 ? 0 : SF.cleanPrice(textMin.substring((textMin.indexOf('hr') + 1), textMin.indexOf('min')));
			accountNumbers.JobTimeMin = hoursMin * 60 + minutesMin;
			let hoursMax = textMax.indexOf('hr') == -1 ? 0 : SF.cleanPrice(textMax.substring(0, textMax.indexOf('hr')));
			let minutesMax = textMax.indexOf('min') == -1 ? 0 : SF.cleanPrice(textMax.substring((textMax.indexOf('hr') + 1), textMax.indexOf('min')));
			accountNumbers.JobTimeMax = hoursMax * 60 + minutesMax;
		}), config.timeout);

		driver.wait(driver.findElement(By.xpath('//div[contains(text(),"Estimated Quote")]/following-sibling::div[1]')).getText().then(function (text) {
			if (text.indexOf("You save") !== -1) {
				let t = text.substring(0, text.indexOf("You save"));
				t = t.substring(t.indexOf('$', t.indexOf('$', t.indexOf('$') + 1) + 1));
				accountNumbers.TotalMin = SF.cleanPrice(t.substring(0, t.indexOf('-')));
				accountNumbers.TotalMax = SF.cleanPrice(t.substring(t.indexOf('-') + 1));
			} else {
				console.log('ещё не делали без скидок');
				accountNumbers.TotalMin = SF.cleanPrice(text.substring(0, text.indexOf('-')));
				accountNumbers.TotalMax = SF.cleanPrice(text.substring(text.indexOf('-') + 1));
				console.log(accountNumbers.TotalMin, accountNumbers.TotalMax);
			}
		}), config.timeout);
		driver.wait(driver.findElement(By.xpath('//div[contains(text(),"Request ID")]/span')).getText().then(function (text) {
			accountNumbers.Id = SF.cleanPrice(text);
		}), config.timeout);
		SF.sleep(2);
		console.log(accountNumbers);
	}

	function RememberAccountNumbersLD(accountNumbersLD) {
		driver.wait(driver.executeScript('return $("div:contains(\\"Move Date (Pick Up Day):\\"):last").next().text()').then(function (dateString) {
			dateString = dateString.toUpperCase();
			accountNumbersLD.moveDate = {};
			accountNumbersLD.moveDate.Month = SF.FindMonthInString(dateString);
			accountNumbersLD.moveDate.Day = SF.cleanPrice(dateString.substring(0, dateString.indexOf(',')));
			accountNumbersLD.moveDate.Year = SF.cleanPrice(dateString.substring(dateString.indexOf(',')));
		}), config.timeout);
		driver.wait(driver.findElement(By.xpath('//div[contains(text(),"Move Size")]/following-sibling::div[1]')).getText().then(function (text) {
			accountNumbersLD.cbf = SF.cleanPrice(text.substring(text.indexOf('Inventory') + 9, text.indexOf('c.f.')));
		}), config.timeout);

		driver.wait(driver.executeScript(JSstep.getServicesCostAccount), config.timeout).then(function (ServicesText) {
			accountNumbersLD.AdServices = SF.cleanPrice(ServicesText);
		});
		driver.wait(driver.executeScript(JSstep.getPackingsCostAccount), config.timeout).then(function (ServicesText) {
			accountNumbersLD.Packing = SF.cleanPrice(ServicesText);
		});
		driver.wait(driver.findElement(By.xpath('//span[contains(text(),"Fuel Surcharge")]/../../div[2]')).getText().then(function (text) {
			accountNumbersLD.Fuel = SF.cleanPrice(text);
		}), config.timeout);
		driver.wait(driver.findElement(By.xpath('//div[contains(text(),"Long Distance Grand Total")]/following-sibling::div[1]')).getText().then(function (text) {
			if (text.indexOf("You save") !== -1) {
				let t = text.substring(0, text.indexOf("You save"));
				t = t.substring(t.indexOf('$', t.indexOf('$', t.indexOf('$') + 1)));
				accountNumbersLD.Total = SF.cleanPrice(t);
			} else {
				console.log('ещё не делали без скидок');
				accountNumbersLD.Total = SF.cleanPrice(text);
			}
		}), config.timeout);
		driver.wait(driver.findElement(By.xpath('//div[contains(text(),"Request ID")]/span')).getText().then(function (text) {
			accountNumbersLD.Id = SF.cleanPrice(text);
		}), config.timeout);
		SF.sleep(1);
		console.log(accountNumbersLD);

	}

	function LogoutFromAccount() {
		JS.scroll("a[ng-click=\"vm.Logout()\"]");
		SF.click(By.xpath('//a[@ng-click="vm.Logout()"]'));
		SF.waitForVisible(By.xpath('//form[@ng-submit="login()"]'));
		SF.sleep(3);
	}

	function LogoutFromBoardForeman() {
		MF.WaitWhileToaster();
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
		MF.WaitVisibleDashboard();
	}

	function LoginToBoardAs_Roma4ke_Admin() {
		SF.waitForVisible(By.xpath('//div[@ng-controller="LoginController"]//span[contains(text(),"Move")]'));
		SF.send(By.xpath('//input[@id="email"]'), 'roma4ke');
		SF.send(By.xpath('//input[@id="password"]'), 'root');
		SF.click(By.xpath('//button[@type="submit"]'));
		MF.WaitVisibleDashboard();
	}

	function LoginToBoardAsForeman() {
		SF.waitForVisible(By.xpath('//div[@ng-controller="LoginController"]//span[contains(text(),"Move")]'));
		SF.send(By.xpath('//input[@id="email"]'), 'TestForeman');
		SF.send(By.xpath('//input[@id="password"]'), '123');
		SF.click(By.xpath('//button[@type="submit"]'));
		MF.WaitVisibleDashboardForeman();
	}

	function LoginToBoardAsForemanDeliveryFlatRate() {
		SF.waitForVisible(By.xpath('//div[@ng-controller="LoginController"]//span[contains(text(),"Move")]'));
		SF.send(By.xpath('//input[@id="email"]'), 'FlatRateForeman');
		SF.send(By.xpath('//input[@id="password"]'), '123');
		SF.click(By.xpath('//button[@type="submit"]'));
		MF.WaitVisibleDashboardForeman();
	}

	function LoginToBoardAsCustom(login, passwd) {
		SF.waitForVisible(By.xpath('//div[@ng-controller="LoginController"]//span[contains(text(),"Move")]'));
		SF.send(By.xpath('//input[@id="email"]'), login);
		SF.send(By.xpath('//input[@id="password"]'), passwd);
		SF.click(By.xpath('//button[@type="submit"]'));
		MF.WaitVisibleDashboard();
	}

	function LoginToBoardAsCustomForeman(login, passwd) {
		SF.waitForVisible(By.xpath('//div[@ng-controller="LoginController"]//span[contains(text(),"Move")]'));
		SF.send(By.xpath('//input[@id="email"]'), login);
		SF.send(By.xpath('//input[@id="password"]'), passwd);
		SF.click(By.xpath('//button[@type="submit"]'));
		MF.WaitVisibleDashboardForeman();
	}

	function LoginToAccountAsClient(client) {
		SF.sleep(1);
		SF.waitForVisible(By.xpath('//form[@ng-submit="login()"]'));
		SF.sleep(1);
		SF.send(By.xpath('//input[@id="email"]'), client.email);
		SF.send(By.xpath('//input[@id="password"]'), client.passwd);
		SF.click(By.xpath('//button[@type="submit"]'));
		SF.sleep(3);
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
		SF.sleep(2);
		MF.WaitWhileBusy();
	}

	function CreateLocalMovingFromBoard(client) {
		JS.waitForNotExist('div.toast-success');
		MF.WaitWhileBusy();
		MF.Board_ClickCreate();
		MF.CreateRequest_SelectServiceType(1);
		MF.CreateRequest_ClickMoveDateInput();
		V.request = {};
		driver.wait(driver.executeScript(JSstep.Click4DaysCalendar).then(function (calDate) {
			V.request.moveDate = calDate;
			console.log(V.request);
		}), config.timeout);
		SF.sleep(0.5);
		MF.CreateRequest_SelectExtraRooms(1);
		driver.wait(driver.findElement(By.xpath('//input[@ng-model="editrequest.data.field_date"]')).getAttribute("value").then(function (mdate) {
			V.request.mdate = (mdate);
		}), config.timeout);
		console.log(V.request.mdate);
		SF.send(By.id("edit-zip-code-from"), client.zipFrom == undefined ? "02032" : client.zipFrom);
		SF.send(By.id("edit-zip-code-to"), client.zipTo == undefined ? "02136" : client.zipTo);
		SF.sleep(5);
		MF.CreateRequest_ClickCalculate();
		MF.CreateRequest_ClickContinue();
		MF.CreateRequest_SendClientInfo(client);
		MF.CreateRequest_ClickCreate();
		console.log('создали реквест');
	}

	function CreateFlatRateFromBoard(client) {
		JS.waitForNotExist('div.toast-success');
		MF.WaitWhileBusy();
		MF.Board_ClickCreate();
		MF.CreateRequest_SelectServiceType(5);
		MF.CreateRequest_ClickMoveDateInput();
		V.request = {};
		driver.wait(driver.executeScript(JSstep.Click4DaysCalendar).then(function (calDate) {
			V.request.moveDate = calDate;
			console.log(V.request);
		}), config.timeout);
		SF.sleep(0.5);
		MF.CreateRequest_SelectExtraRooms(1);
		driver.wait(driver.findElement(By.xpath('//input[@ng-model="editrequest.data.field_date"]')).getAttribute("value").then(function (mdate) {
			V.request.mdate = (mdate);
		}), config.timeout);
		console.log(V.request.mdate);
		MF.CreateRequest_SendZipToZipFrom("02461", "07304");
		MF.CreateRequest_ClickCalculate();
		MF.CreateRequest_ClickContinue();
		MF.CreateRequest_SendClientInfo(client);
		MF.CreateRequest_ClickCreate();
		console.log('создали реквест');
	}

	function CreateMovAndStorFromBoard(client, period) {
		MF.Board_ClickCreate();
		MF.CreateRequest_SelectServiceType(2);
		MF.CreateRequest_ClickMoveDateInput();
		V.request = {};
		driver.wait(driver.executeScript(JSstep.Click4DaysCalendar).then(function (calDate) {
			V.request.moveDate = calDate;
			console.log(V.request);
		}), config.timeout);
		SF.sleep(2);
		SF.click(By.xpath('//input[@id="edit-date-storage-datepicker-popup-0"]'));
		if (period == undefined) {
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

		SF.sleep(2);
		MF.CreateRequest_SelectExtraRooms(1);
		MF.CreateRequest_SendZipToZipFrom("02032", "02136");
		MF.CreateRequest_ClickCalculate();
		MF.CreateRequest_ClickContinue();
		MF.CreateRequest_SendClientInfo(client);
		MF.CreateRequest_ClickCreate();
		console.log('создали реквест');
	}

	function CreateLongDistanceFromBoard(client) {
		if (client.zipFrom == undefined) {
			client.zipFrom = '02032';
		}
		if (client.zipTo == undefined) {
			client.zipTo = '90001';
		}
		MF.Board_ClickCreate();
		MF.CreateRequest_SelectServiceType(7);
		MF.CreateRequest_ClickMoveDateInput();
		V.request = {};
		driver.wait(driver.executeScript(JSstep.Click4DaysCalendar).then(function (calDate) {
			V.request.moveDate = calDate;
			console.log(V.request);
		}), config.timeout);
		SF.sleep(0.5);
		MF.CreateRequest_SelectExtraRooms(1);
		SF.send(By.id("edit-zip-code-from"), client.zipFrom);
		SF.send(By.id("edit-zip-code-to"), client.zipTo);
		SF.sleep(4);
		MF.CreateRequest_ClickCalculate();
		MF.CreateRequest_ClickContinue();
		MF.CreateRequest_SendClientInfo(client);
		MF.CreateRequest_ClickCreate();
		console.log('создали реквест');
	}

	function CreateCarrier() {
		V.carrierNew = {};
		V.carrierNew2 = {};
		V.carrierNew3 = {};

		condition.nowWeDoing = 'Создаем карьера';
		SF.click(By.xpath('//button[@ng-click="addCarrier()"]'));
		JS.waitForExist('input[ng-model=\\"agentModel.data.name\\"]');
		SF.sleep(2);
		V.carrierNew.name = SF.randomBukva(6) + '_t';
		V.carrierNew.contactPerson = SF.randomBukva(6) + '_t';
		V.carrierNew.contactPersonPhone = SF.randomCifra(10);
		SF.send(By.xpath('//input[@ng-model="agentModel.data.name"]'), V.carrierNew.name);
		SF.send(By.xpath('//input[@ng-model="agentModel.data.contact_person"]'), V.carrierNew.contactPerson);
		SF.send(By.xpath('//input[@ng-model="agentModel.data.contact_person_phone"]'), V.carrierNew.contactPersonPhone);
		V.carrierNew.address = SF.randomBukva(6) + '_t';
		V.carrierNew.zipCode = "90001";
		SF.send(By.xpath('//textarea[@ng-model="agentModel.data.address"]'), V.carrierNew.address);
		SF.send(By.xpath('//input[@ng-model="agentModel.data.zip_code"]'), V.carrierNew.zipCode);
		SF.sleep(2);
		SF.click(By.xpath('//md-checkbox[@ng-model="agentModel.data.company_carrier"]'));
		SF.click(By.xpath('//md-checkbox[@ng-model="agentModel.data.active"]'));
		V.carrierNew.perCf = "2";
		V.carrierNew.iccMc = SF.randomCifra(10);
		SF.send(By.xpath('//input[@ng-model="agentModel.data.per_cf"]'), V.carrierNew.perCf);
		SF.send(By.xpath('//input[@ng-model="agentModel.data.icc_mc_number"]'), V.carrierNew.iccMc);
		V.carrierNew.usdot = SF.randomCifra(10);
		V.carrierNew.eMail = SF.randomBukvaSmall(6) + '@' + SF.randomBukvaSmall(4) + '.tes';
		SF.send(By.xpath('//input[@ng-model="agentModel.data.usdot_number"]'), V.carrierNew.usdot);
		SF.send(By.xpath('//input[@ng-model="agentModel.data.email"]'), V.carrierNew.eMail);
		V.carrierNew.webSite = "fdsfd.com";
		V.carrierNew.phoneNumber1 = SF.randomCifra(10);
		SF.send(By.xpath('//input[@ng-model="agentModel.data.web_site"]'), V.carrierNew.webSite);
		SF.send(By.xpath('//input[@ng-model="agentModel.data.phones[$index]"]'), V.carrierNew.phoneNumber1);
		SF.sleep(2);
		JS.click('span:contains(\\"Save\\")');
		SF.waitForVisible(By.xpath('//input[@ng-model="searchTerm"]'));
	}

	function CreateLoadingHelpFromBoard(client) {
		MF.Board_ClickCreate();
		MF.CreateRequest_SelectServiceType(3);
		MF.CreateRequest_ClickMoveDateInput();
		V.request = {};
		driver.wait(driver.executeScript(JSstep.Click4DaysCalendar).then(function (calDate) {
			V.request.moveDate = calDate;
			console.log(V.request);
		}), config.timeout);
		SF.sleep(0.5);
		MF.CreateRequest_SelectExtraRooms(1);
		MF.FrontSiteDown_SendZipCodeFrom('02032');
		SF.sleep(4);
		MF.CreateRequest_ClickCalculate();
		MF.CreateRequest_ClickContinue();
		MF.CreateRequest_SendClientInfo(client);
		MF.CreateRequest_ClickCreate();
		console.log('создали реквест');
	}

	function CreatePackingDayFromBoard(client) {
		MF.Board_ClickCreate();
		MF.CreateRequest_SelectServiceType(8);
		MF.CreateRequest_ClickMoveDateInput();
		V.request = {};
		driver.wait(driver.executeScript(JSstep.Click4DaysCalendar).then(function (calDate) {
			V.request.moveDate = calDate;
			console.log(V.request);
		}), config.timeout);
		SF.sleep(0.5);
		MF.CreateRequest_SelectExtraRooms(1);
		MF.FrontSiteDown_SendZipCodeFrom('02136');
		SF.sleep(4);
		MF.CreateRequest_ClickCalculate();
		MF.CreateRequest_ClickContinue();
		MF.CreateRequest_SendClientInfo(client);
		MF.CreateRequest_ClickCreate();
		console.log('создали реквест');
	}

	function RememberDigitsRequestBoard_Up(boardNumbers) {
		driver.wait(driver.findElement(By.xpath('//input[@ng-model="moveDateInput"]')).getAttribute("value").then(function (dateString) {
			dateString = dateString.toUpperCase();
			boardNumbers.moveDate = {};
			boardNumbers.moveDate.Month = SF.FindMonthInString(dateString);
			boardNumbers.moveDate.Day = SF.cleanPrice(dateString.substring(0, dateString.indexOf(',')));
			boardNumbers.moveDate.Year = SF.cleanPrice(dateString.substring(dateString.indexOf(',')));
		}), config.timeout);
		driver.wait(driver.findElements(By.xpath('//input[@ng-model="request.minimum_time.value"]')).then(function (elements) {
			if (elements.length > 0) {
				elements[0].getAttribute('value').then(function (value) {
					boardNumbers.LaborTimeMin = SF.cleanPrice(value.substring(0, value.indexOf(':'))) * 60
						+ SF.cleanPrice(value.substring(value.indexOf(':')));
				});
			} else {
				boardNumbers.LaborTimeMin = 0;
			}
		}), config.timeout);
		driver.wait(driver.findElement(By.xpath('//input[@ng-model="request.maximum_time.value"]')).getAttribute('value').then(function (value) {
			boardNumbers.LaborTimeMax = SF.cleanPrice(value.substring(0, value.indexOf(':'))) * 60
				+ SF.cleanPrice(value.substring(value.indexOf(':')));
		}), config.timeout);
		driver.wait(driver.findElement(By.xpath('//input[@ng-model="request.travel_time.value"]')).getAttribute('value').then(function (value) {
			boardNumbers.TravelTime = SF.cleanPrice(value.substring(0, value.indexOf(':'))) * 60
				+ SF.cleanPrice(value.substring(value.indexOf(':')));
		}), config.timeout);
		driver.wait(driver.findElement(By.xpath('//input[@id="edit-movers-crew"]')).getAttribute('value').then(function (value) {
			boardNumbers.CrewSize = SF.cleanPrice(value);
		}), config.timeout);
		MF.EditRequest_RememberCbf(boardNumbers);
		driver.wait(driver.findElements(By.xpath('//input[@ng-model="request.rate.value"]')).then(function (elements) {
			if (elements.length > 0) {
				elements[0].getAttribute('value').then(function (value) {
					boardNumbers.HourlyRate = SF.cleanPrice(value);
				});
			} else {
				boardNumbers.HourlyRate = 0;
			}

		}), config.timeout);
		driver.wait(driver.findElement(By.xpath('//label[contains(text(),"Trucks:")]/following-sibling::div[1]')).getText().then(function (text) {
			boardNumbers.Trucks = SF.cleanPrice(text);
		}), config.timeout);
		driver.wait(driver.findElement(By.xpath('//a[@ng-click="select(tabs[0])"]')).getText().then(function (text) {
			boardNumbers.Id = SF.cleanPrice(text);
		}), config.timeout);
		SF.sleep(1);
		console.log(boardNumbers);
	}

	function RememberDigitsRequestBoard_Down(boardNumbers) {
		driver.wait(driver.executeScript('return $(\'div.quote-cost:visible\').text()').then(function (text) {
			if (text.indexOf('$', text.indexOf('$') + 3) !== -1) {
				boardNumbers.QuoteMin = SF.cleanPrice(text.substring(text.indexOf('$'), text.indexOf('-')));
				boardNumbers.QuoteMax = SF.cleanPrice(text.substring(text.indexOf('$', text.indexOf('$') + 3)));
			} else {
				boardNumbers.Quote = SF.cleanPrice(text);
			}
		}), config.timeout);
		driver.wait(driver.executeScript('return $(\'div.FuelCost:visible\').text()').then(function (text) {
			boardNumbers.Fuel = SF.cleanPrice(text.substring(text.indexOf('$')));
		}), config.timeout);
		driver.wait(driver.executeScript('return $(\'div.ValuationCost:visible\').text()').then(function (text) {
			boardNumbers.Valuation = SF.cleanPrice(text.substring(text.indexOf('$')));
		}), config.timeout);
		driver.wait(driver.executeScript('return $(\'div.PackingCost:visible\').text()').then(function (text) {
			boardNumbers.Packing = SF.cleanPrice(text.substring(text.indexOf('$')));
		}), config.timeout);
		driver.wait(driver.executeScript('return $(\'div.ServicesCost:visible\').text()').then(function (text) {
			boardNumbers.AdServices = SF.cleanPrice(text.substring(text.indexOf('$')));
		}), config.timeout);
		driver.wait(driver.executeScript('return $(\'div.DiscountCost:visible\').text()').then(function (text) {
			boardNumbers.Discount = SF.cleanPrice(text.substring(text.indexOf('$')));
		}), config.timeout);
		driver.wait(driver.executeScript('return $(\'div.TipsCost:visible input\').val()').then(function (text) {
			if (text != null) {
				boardNumbers.Tips = SF.cleanPrice(text.substring(text.indexOf('$')));
			} else {
				boardNumbers.Tips = 0;
			}
		}), config.timeout);
		driver.wait(driver.executeScript('return $(\'div.TotalCost:visible\').text()').then(function (text) {
			if (text.indexOf('$', text.indexOf('$') + 3) !== -1) {
				boardNumbers.TotalMin = SF.cleanPrice(text.substring(text.indexOf('$'), text.indexOf('-')));
				boardNumbers.TotalMax = SF.cleanPrice(text.substring(text.indexOf('$', text.indexOf('$') + 3)));
			} else {
				boardNumbers.Total = SF.cleanPrice(text);
			}
		}), config.timeout);
		driver.wait(driver.executeScript('return $(\'div.PaymentCost:visible\').text()').then(function (text) {
			boardNumbers.Payment = SF.cleanPrice(text.substring(text.indexOf('$')));
		}), config.timeout);
		driver.wait(driver.executeScript('return $(\'div.BalanceCost:visible\').text()').then(function (text) {
			if (text.indexOf('$', text.indexOf('$') + 3) !== -1) {
				boardNumbers.BalanceMin = SF.cleanPrice(text.substring(text.indexOf('$'), text.indexOf('-')));
				boardNumbers.BalanceMax = SF.cleanPrice(text.substring(text.indexOf('$', text.indexOf('$') + 3)));
			} else {
				boardNumbers.Balance = SF.cleanPrice(text);
			}
		}), config.timeout);
		SF.sleep(1);
		console.log(boardNumbers);
	}

	function RememberDigitsRequestBoard(boardNumbers) {
		RememberDigitsRequestBoard_Up(boardNumbers);
		RememberDigitsRequestBoard_Down(boardNumbers);
	}

	function Validation_Compare_CalcLocalMove_Admin(LocalMoveAdminCalc, boardNumbers) {
		VD.IWant(VD.ToEqual, LocalMoveAdminCalc.CrewSize, boardNumbers.CrewSize, 'не совпали CrewSize калькулятора и борда');
		VD.IWant(VD.ToEqual, LocalMoveAdminCalc.HourlyRate, boardNumbers.HourlyRate, 'не совпали HourlyRate калькулятора и борда');
		VD.IWant(VD.ToEqual, LocalMoveAdminCalc.WorkTimeMin, boardNumbers.LaborTimeMin, 'не совпали LaborTimeMin калькулятора и борда');
		VD.IWant(VD.ToEqual, LocalMoveAdminCalc.WorkTimeMax, boardNumbers.LaborTimeMax, 'не совпали LaborTimeMax калькулятора и борда');
		VD.IWant(VD.ToEqual, LocalMoveAdminCalc.TravelTime, boardNumbers.TravelTime, 'не совпали TravelTime калькулятора и борда');
		VD.IWant(VD.ToEqual, LocalMoveAdminCalc.QuoteMin, boardNumbers.QuoteMin, 'не совпали QuoteMin калькулятора и борда');
		VD.IWant(VD.ToEqual, LocalMoveAdminCalc.QuoteMax, boardNumbers.QuoteMax, 'не совпали QuoteMax калькулятора и борда');
		VD.IWant(VD.ToEqual, LocalMoveAdminCalc.Trucks, boardNumbers.Trucks, 'не совпали Trucks калькулятора и борда');
		VD.IWant(VD.ToEqual, LocalMoveAdminCalc.TotalMin, boardNumbers.TotalMin, 'не совпали TotalMin калькулятора и борда');
		VD.IWant(VD.ToEqual, LocalMoveAdminCalc.TotalMax, boardNumbers.TotalMax, 'не совпали TotalMax калькулятора и борда');
		VD.IWant(VD.ToEqual, LocalMoveAdminCalc.Fuel, boardNumbers.Fuel, 'не совпали Fuel калькулятора и борда');
	}

	function Validation_Compare_Account_Admin(accountNumbers, boardNumbers) {
		VD.IWant(VD.ToEqual, accountNumbers.moveDate.Day, boardNumbers.moveDate.Day, 'не совпали даты аккаунта и борда');
		VD.IWant(VD.ToEqual, accountNumbers.moveDate.Month, boardNumbers.moveDate.Month, 'не совпали даты аккаунта и борда');
		VD.IWant(VD.ToEqual, accountNumbers.moveDate.Year, boardNumbers.moveDate.Year, 'не совпали даты аккаунта и борда');
		VD.IWant(VD.ToEqual, accountNumbers.CrewSize, boardNumbers.CrewSize, 'не совпали CrewSize аккаунта и борда');
		VD.IWant(VD.ToEqual, accountNumbers.HourlyRate, boardNumbers.HourlyRate, 'не совпали HourlyRate аккаунта и борда');
		VD.IWant(VD.ToEqual, accountNumbers.LaborTimeMin, boardNumbers.LaborTimeMin, 'не совпали LaborTimeMin аккаунта и борда');
		VD.IWant(VD.ToEqual, accountNumbers.LaborTimeMax, boardNumbers.LaborTimeMax, 'не совпали LaborTimeMax аккаунта и борда');
		VD.IWant(VD.ToEqual, accountNumbers.TravelTime, boardNumbers.TravelTime, 'не совпали TravelTime аккаунта и борда');
		VD.IWant(VD.ToEqual, accountNumbers.Packing, boardNumbers.Packing, 'не совпали Packing аккаунта и борда');
		VD.IWant(VD.ToEqual, accountNumbers.AdServices, boardNumbers.AdServices, 'не совпали Services аккаунта и борда');
		VD.IWant(VD.ToEqual, accountNumbers.Trucks, boardNumbers.Trucks, 'не совпали Trucks аккаунта и борда');
		VD.IWant(VD.ToEqual, accountNumbers.TotalMin, boardNumbers.TotalMin, 'не совпали TotalMin аккаунта и борда');
		VD.IWant(VD.ToEqual, accountNumbers.TotalMax, boardNumbers.TotalMax, 'не совпали TotalMax аккаунта и борда');
		VD.IWant(VD.ToEqual, accountNumbers.Fuel, boardNumbers.Fuel, 'не совпали Fuel аккаунта и борда');
	}

	function Validation_Compare_Account_Admin_PackingDay(accountNumbers, boardNumbers) {
		VD.IWant(VD.NotToEqual, accountNumbers.moveDate.Day, boardNumbers.moveDate.Day, 'даты стали одинаковы, а должны быть разные');
		VD.IWant(VD.ToEqual, accountNumbers.moveDate.Month, boardNumbers.moveDate.Month, 'не совпали даты аккаунта и борда');
		VD.IWant(VD.ToEqual, accountNumbers.moveDate.Year, boardNumbers.moveDate.Year, 'не совпали даты аккаунта и борда');
		VD.IWant(VD.ToEqual, accountNumbers.CrewSize, boardNumbers.CrewSize, 'не совпали CrewSize аккаунта и борда');
		VD.IWant(VD.ToEqual, accountNumbers.HourlyRate, boardNumbers.HourlyRate, 'не совпали HourlyRate аккаунта и борда');
		VD.IWant(VD.ToEqual, accountNumbers.LaborTimeMin, boardNumbers.LaborTimeMin, 'не совпали LaborTimeMin аккаунта и борда');
		VD.IWant(VD.ToEqual, accountNumbers.LaborTimeMax, boardNumbers.LaborTimeMax, 'не совпали LaborTimeMax аккаунта и борда');
		VD.IWant(VD.ToEqual, accountNumbers.TravelTime, boardNumbers.TravelTime, 'не совпали TravelTime аккаунта и борда');
		VD.IWant(VD.ToEqual, accountNumbers.Packing, boardNumbers.Packing, 'не совпали Packing аккаунта и борда');
		VD.IWant(VD.ToEqual, accountNumbers.AdServices, boardNumbers.AdServices, 'не совпали Services аккаунта и борда');
		VD.IWant(VD.ToEqual, accountNumbers.Trucks, boardNumbers.Trucks, 'не совпали Trucks аккаунта и борда');
		VD.IWant(VD.ToEqual, accountNumbers.TotalMin, boardNumbers.TotalMin, 'не совпали TotalMin аккаунта и борда');
		VD.IWant(VD.ToEqual, accountNumbers.TotalMax, boardNumbers.TotalMax, 'не совпали TotalMax аккаунта и борда');
		VD.IWant(VD.ToEqual, accountNumbers.Fuel, boardNumbers.Fuel, 'не совпали Fuel аккаунта и борда');
	}

	function Validation_Compare_Account_Admin_LongDistance(accountNumbersLD, boardNumbers) {
		VD.IWant(VD.ToEqual, accountNumbersLD.moveDate.Day, boardNumbers.moveDate.Day, 'не совпали даты аккаунта и борда для лонг дистанса');
		VD.IWant(VD.ToEqual, accountNumbersLD.moveDate.Month, boardNumbers.moveDate.Month, 'не совпали даты аккаунта и борда для лонг дистанса');
		VD.IWant(VD.ToEqual, accountNumbersLD.moveDate.Year, boardNumbers.moveDate.Year, 'не совпали даты аккаунта и борда для лонг дистанса');
		VD.IWant(VD.ToEqual, accountNumbersLD.Total, boardNumbers.Total, 'не совпали Total аккаунта и борда для лонг дистанса');
		VD.IWant(VD.ToEqual, accountNumbersLD.Fuel, boardNumbers.Fuel, 'не совпали Fuel аккаунта и борда для лонг дистанса');
		VD.IWant(VD.ToEqual, accountNumbersLD.Packing, boardNumbers.Packing, 'не совпали Packing аккаунта и борда для лонг дистанса');
		VD.IWant(VD.ToEqual, accountNumbersLD.AdServices, boardNumbers.AdServices, 'не совпали Services аккаунта и борда для лонг дистанса');
	}

	function Validation_Compare_Account_Front_MovStorTo(accountNumbers, frontNumbersDown) {

		VD.IWant(VD.ToEqual, accountNumbers.CrewSize, frontNumbersDown.CrewTo, 'не совпали CrewSize аккаунта и фронта');
		VD.IWant(VD.ToEqual, accountNumbers.HourlyRate, frontNumbersDown.RateTo, 'не совпали HourlyRate аккаунта и фронта');
		VD.IWant(VD.ToEqual, accountNumbers.TravelTime, frontNumbersDown.TravelTimeTo, 'не совпали TravelTime аккаунта и фронта');
		VD.IWant(VD.ToEqual, accountNumbers.TotalMin, frontNumbersDown.QuoteMinTo, 'не совпали TotalMin аккаунта и фронта');
		VD.IWant(VD.ToEqual, accountNumbers.TotalMax, frontNumbersDown.QuoteMaxTo, 'не совпали TotalMax аккаунта и фронта');
		VD.IWant(VD.ToEqual, accountNumbers.Fuel, frontNumbersDown.FuelTo, 'не совпали Fuel аккаунта и борда');
		VD.IWant(VD.ToEqual, accountNumbers.JobTimeMin, frontNumbersDown.JobTimeMinTo, 'не совпали JobTimeMin аккаунта и фронта');
		VD.IWant(VD.ToEqual, accountNumbers.JobTimeMax, frontNumbersDown.JobTimeMaxTo, 'не совпали JobTimeMax аккаунта и фронта');
	}

	function Validation_Compare_Account_Front_MovStorFrom(accountNumbers, frontNumbersDown) {

		VD.IWant(VD.ToEqual, accountNumbers.CrewSize, frontNumbersDown.CrewFrom, 'не совпали CrewSize аккаунта и фронта From');
		VD.IWant(VD.ToEqual, accountNumbers.HourlyRate, frontNumbersDown.RateFrom, 'не совпали HourlyRate аккаунта и фронта From');
		VD.IWant(VD.ToEqual, accountNumbers.TravelTime, frontNumbersDown.TravelTimeFrom, 'не совпали TravelTime аккаунта и фронта From');
		VD.IWant(VD.ToEqual, accountNumbers.TotalMin, frontNumbersDown.QuoteMinFrom, 'не совпали TotalMin аккаунта и фронта From');
		VD.IWant(VD.ToEqual, accountNumbers.TotalMax, frontNumbersDown.QuoteMaxFrom, 'не совпали TotalMax аккаунта и фронта From');
		VD.IWant(VD.ToEqual, accountNumbers.Fuel, frontNumbersDown.FuelFrom, 'не совпали Fuel аккаунта и борда From');
		VD.IWant(VD.ToEqual, accountNumbers.JobTimeMin, frontNumbersDown.JobTimeMinFrom, 'не совпали JobTimeMin аккаунта и фронта From');
		VD.IWant(VD.ToEqual, accountNumbers.JobTimeMax, frontNumbersDown.JobTimeMaxFrom, 'не совпали JobTimeMax аккаунта и фронта From');
	}

	function SetManager(name) {
		JS.click('div[ng-show="::showManagerDropdown(currentManager.first_name)"] button');
		SF.click(By.xpath('//a[@ng-click="setManager(manager.uid)"][contains(text(),"' + name + '")]'));
		MF.SweetConfirm();
		SF.sleep(1);
		MF.WaitWhileToaster();
	}

	function SetClientPasswd(passwd) {
		SF.sleep(2);
		SF.send(By.xpath('//input[@ng-model="client.password"]'), passwd);
		SF.click(By.xpath('//button[@ng-click="update(client)"]'));
		MF.WaitWhileBusySymbol();
		SF.sleep(1);
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
		SF.sleep(2);
	}

	function InvoiceOnlinePayment() {
		JS.waitForExist('input[ng-model="payment.card_num"]');
		SF.sleep(1);
		SF.send(By.xpath('//input[@ng-model="payment.firstName"]'), "First Name");
		SF.send(By.xpath('//input[@ng-model="payment.lastName"]'), "Second Name");
		SF.send(By.xpath('//input[@ng-model="payment.card_num"]'), 4111111111111111);
		SF.send(By.xpath('//input[@ng-model="payment.exp_month"]'), 11);
		SF.send(By.xpath('//input[@ng-model="payment.exp_year"]'), 20);
		SF.send(By.xpath('//input[@ng-model="secure.cvc"]'), 323);
		SF.send(By.xpath('//input[@ng-model="payment.billing_zip"]'), '02222');
		SF.sleep(1);
		SF.click(By.xpath('//input[@ng-click="applyPayment()"]'));
		MF.WaitWhileBusy();
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
		SF.click(By.xpath('//div[contains(@class, "notconfirmed")]/a'));
		SF.sleep(2);
		SF.click(By.xpath('//i[@class="fa fa-angle-down arrow-down"]'));
		SF.sleep(1);
		SF.click(By.id('terms'));
		SF.click(By.id('cancel_policy'));
		SF.click(By.id('paybutton'));
		SF.waitForLocated(By.xpath('//div[@class="sweet-alert showSweetAlert visible"]'));
		SF.click(By.xpath('//button[@class="confirm"]'));
		SF.waitForLocated(By.xpath('//div[@class="modal-body form-horizontal"]'));
		SF.sleep(2);
		SF.click(By.id('edit-moving-from'));
		SF.send(By.id('edit-moving-from'), 'otkuda edem');
		SF.click(By.id('edit-moving-from-apt'));
		SF.send(By.id('edit-moving-from-apt'), 324535);
		SF.click(By.xpath('//input[@ng-value="request.field_moving_to.thoroughfare"]'));
		SF.send(By.xpath('//input[@ng-value="request.field_moving_to.thoroughfare"]'), 'kuda edem');
		SF.click(By.xpath('//input[@ng-value="request.apt_to.value"]'));
		SF.send(By.xpath('//input[@ng-value="request.apt_to.value"]'), 324535);
		SF.click(By.xpath('//button[@ng-click="update(client)"]'));
		SF.sleep(2);
		MF.SweetConfirm();
		SF.sleep(2);
		MF.SweetConfirm();
		SF.waitForVisible(By.xpath('//canvas[@id="signatureCanvasReserv"]'));
		MakeSignJS('signatureCanvasReserv');
		SF.sleep(0.5);
		SF.click(By.xpath('//button[@ng-click="saveReservSignature();logClickButtons(\'Save reservation sign button clicked\')"]'));
		SF.sleep(1);
		FillCardPayModal();
		MF.WaitWhileSpinner();
		MF.Account_WaitForGreenTextAfterConfirm();
		SF.sleep(1);
	}

	function ConfirmRequestInAccount_WithReservation(ReservationPrice) {
		MF.Account_ClickProceedBookYourMove();
		JS.waitForExist('div.confirm');
		JS.scroll('div.confirm');
		if (ReservationPrice != undefined) {
			let ReservationSee = 0;
			driver.findElement(By.xpath('//h2[contains(text(),"Deposit:")]')).getText().then(function (text) {
				ReservationSee = SF.cleanPrice(text);
			});
			SF.sleep(1);
			VD.IWant(VD.ToEqual, ReservationSee, ReservationPrice, 'Резервация на аккаунте не совпала');
		}
		MF.Account_ClickIAgreeWithAll();
		SF.click(By.xpath('//div[@ng-click="addReservationPayment()"]'));
		SF.waitForVisible(By.xpath('//canvas[@id="signatureCanvasReserv"]'));
		MakeSignJS('signatureCanvasReserv');
		SF.click(By.xpath('//button[contains(@ng-click,"saveReservSignature()")]'));
		FillCardPayModal();
		MF.WaitWhileSpinner();
		MF.Account_WaitForGreenTextAfterConfirm();

	}

	function ConfirmRequestInAccount_NoReservation() {
		MF.Account_ClickProceedBookYourMove();
		JS.waitForExist('div.confirm');
		JS.scroll('div.confirm');
		MF.Account_ClickIAgreeWithAll();
		MF.Account_ClickConfirmReservation();
		MakeSignJS('signatureCanvasReservation');
		SF.click(By.xpath('//button[@ng-click="saveSignature()"]'));
		MF.SweetConfirm();
		MF.Account_WaitForGreenTextAfterConfirm();

	}

//Permissions for Sales --- start
	function PermissionsClear() {
		driver.wait(driver.executeScript("if($('input[ng-model=\"request.permissions.canSeeOtherLeads\"]').hasClass('ng-empty')){" +
			"return true;}else{$('input[ng-model=\"request.permissions.canSeeOtherLeads\"]').parent().click()}"));
		driver.wait(driver.executeScript("if($('input[ng-model=\"request.permissions.canSearchOtherLeads\"]').hasClass('ng-empty')){" +
			"return true;}else{$('input[ng-model=\"request.permissions.canSearchOtherLeads\"]').parent().click()}"));
		driver.wait(driver.executeScript("if($('input[ng-model=\"request.permissions.canEditOtherLeads\"]').hasClass('ng-empty')){" +
			"return true;}else{$('input[ng-model=\"request.permissions.canEditOtherLeads\"]').parent().click()}"));
		driver.wait(driver.executeScript("if($('input[ng-model=\"request.permissions.canSeeUnsignedLeads\"]').hasClass('ng-empty')){" +
			"return true;}else{$('input[ng-model=\"request.permissions.canSeeUnsignedLeads\"]').parent().click()}"));
		driver.wait(driver.executeScript("if($('input[ng-model=\"request.permissions.canSignedSales\"]').hasClass('ng-empty')){" +
			"return true;}else{$('input[ng-model=\"request.permissions.canSignedSales\"]').parent().click()}"));

	}

	function AdminPermissionsClear() {
		driver.wait(driver.executeScript("if($('input[ng-model=\"request.permissions.canSeeSettingsMenu\"]').hasClass('ng-empty')){" +
			"return true;}else{$('input[ng-model=\"request.permissions.canSeeSettingsMenu\"]').parent().click()}"));
		driver.wait(driver.executeScript("if($('input[ng-model=\"request.permissions.canSeeStatisticsMenu\"]').hasClass('ng-empty')){" +
			"return true;}else{$('input[ng-model=\"request.permissions.canSeeStatisticsMenu\"]').parent().click()}"));
		driver.wait(driver.executeScript("if($('input[ng-model=\"request.permissions.canSeeStorageMenu\"]').hasClass('ng-empty')){" +
			"return true;}else{$('input[ng-model=\"request.permissions.canSeeStorageMenu\"]').parent().click()}"));
		driver.wait(driver.executeScript("if($('input[ng-model=\"request.permissions.canSeeLongDistanceMenu\"]').hasClass('ng-empty')){" +
			"return true;}else{$('input[ng-model=\"request.permissions.canSeeLongDistanceMenu\"]').parent().click()}"));
		driver.wait(driver.executeScript("if($('input[ng-model=\"request.permissions.canSeeScheduleMen\"]').hasClass('ng-empty')){" +
			"return true;}else{$('input[ng-model=\"request.permissions.canSeeScheduleMenu\"]').parent().click()}"));
		driver.wait(driver.executeScript("if($('input[ng-model=\"request.permissions.canSeeDispatchMenu\"]').hasClass('ng-empty')){" +
			"return true;}else{$('input[ng-model=\"request.permissions.canSeeDispatchMenu\"]').parent().click()}"));

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
		JS.waitForNotExist('div.toast-message:visible');
		JS.waitForNotExist('div.visible-overflow');
		JS.waitForNotExist('div.toast-message:visible');
		JS.waitForNotExist('div.toast-success:visible');
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
					function () {
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

	function OpenRequestInForemanPage(request) {
		SF.click(By.xpath('//input[@ng-model="vm.pageParams.conditions.nid"]'));
		SF.send(By.xpath('//input[@ng-model="vm.pageParams.conditions.nid"]'), request);
		SF.sleep(2);
		MF.WaitWhileBusy();
		driver.wait(driver.findElement(By.xpath('//td[contains(text(),"' + request + '")]')).click(), config.timeout);
		driver.wait(driver.findElement(By.xpath('//td[contains(text(),"' + request + '")]')).click(), config.timeout);
	}

	function selectCrew(ForemanName) {
		SF.click(By.xpath("//select[@ng-model='vm.data.foreman']"));
		SF.click(By.xpath("//select[@ng-model='vm.data.foreman']/option[contains(text(),'" + ForemanName + "')]"));
		SF.click(By.xpath("//label[contains(text(),'Helper No. 2')]/following-sibling::select[@ng-model='vm.data.baseCrew.helpers[$index]']"));
		SF.click(By.xpath("//label[contains(text(),'Helper No. 2')]/following-sibling::select[@ng-model='vm.data.baseCrew.helpers[$index]']//option[contains(text(),'Test Helper1')]"));
		driver.wait(
			driver.findElements(By.xpath("//label[contains(text(),'Helper No. 3')]/following-sibling::select[@ng-model='vm.data.baseCrew.helpers[$index]']")).then(function (count) {
				if (count.length > 0) {
					driver.wait(driver.findElement(By.xpath("//label[contains(text(),'Helper No. 3')]/following-sibling::select[@ng-model='vm.data.baseCrew.helpers[$index]']")).click());
					driver.wait(driver.findElement(By.xpath("//label[contains(text(),'Helper No. 3')]/following-sibling::select[@ng-model='vm.data.baseCrew.helpers[$index]']" +
						"//option[contains(text(),'Test Helper2')]")).click());
				}
			}), config.timeout);
		JS.scroll('a[ng-click=\"vm.assignTeam(request)\"]');
		SF.sleep(1);
		driver.wait(
			driver.findElements(By.xpath("//label[contains(text(),'Helper No. 4')]/following-sibling::select[@ng-model='vm.data.baseCrew.helpers[$index]']")).then(function (count) {
				if (count.length > 0) {
					driver.wait(driver.findElement(By.xpath("//label[contains(text(),'Helper No. 4')]/following-sibling::select[@ng-model='vm.data.baseCrew.helpers[$index]']")).click());
					driver.wait(driver.findElement(By.xpath("//label[contains(text(),'Helper No. 4')]/following-sibling::select[@ng-model='vm.data.baseCrew.helpers[$index]']" +
						"//option[contains(text(),'Test Helper3')]")).click());
				}
			}), config.timeout);
		JS.scroll('a[ng-click=\"vm.assignTeam(request)\"]');
		SF.sleep(1);
		SF.click(By.xpath("//a[@ng-click=\"vm.assignTeam(request)\"]"));
		JS.waitForExist('div.toast-success');
		MF.WaitWhileToaster();
	}

	function selectCrewFlatRatePickUp(ForemanName) {
		SF.click(By.xpath("//select[@ng-model='super.vm.data.pickedUpCrew.foreman']"));
		SF.click(By.xpath("//select[@ng-model='super.vm.data.pickedUpCrew.foreman']/option[contains(text(),'" + ForemanName + "')]"));
		SF.click(By.xpath("//label[contains(text(),'Helper No. 2')]/following-sibling::select[@ng-model='super.vm.data.pickedUpCrew.helpers[$index]']"));
		SF.click(By.xpath("//label[contains(text(),'Helper No. 2')]/following-sibling::select[@ng-model='super.vm.data.pickedUpCrew.helpers[$index]']//option[contains(text(),'Test Helper1')]"));
		JS.scroll('a[ng-click=\"super.vm.assignTeam()\"]');
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
		JS.scroll('a[ng-click=\"super.vm.assignTeam()\"]');
		SF.sleep(1);
		SF.click(By.xpath("//a[@ng-click=\"super.vm.assignTeam()\"]"));
		MF.WaitWhileBusy();
		JS.waitForExist('div.toast-success');
		MF.WaitWhileToaster();
	}

	function selectCrewFlatRateDelivery() {
		SF.click(By.xpath("//select[@ng-model='super.vm.data.deliveryCrew.foreman']"));
		SF.click(By.xpath("//select[@ng-model='super.vm.data.deliveryCrew.foreman']/option[contains(text(),'FlatRate Foreman')]"));
		SF.click(By.xpath("//label[contains(text(),'Helper No. 2')]/following-sibling::select[@ng-model='super.vm.data.deliveryCrew.helpers[$index]']"));
		SF.click(By.xpath("//label[contains(text(),'Helper No. 2')]/following-sibling::select[@ng-model='super.vm.data.deliveryCrew.helpers[$index]']//option[contains(text(),'Test Helper1')]"));
		JS.scroll('a[ng-click=\"super.vm.assignTeam()\"]:visible');
		SF.sleep(1);
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
		JS.scroll('a[ng-click=\"super.vm.assignTeam()\"]');
		SF.sleep(1);
		JS.click('a[ng-click=\\"super.vm.assignTeam()\\"]:visible');
		MF.WaitWhileBusy();
		MF.WaitWhileToaster();
	}

	function MakeSignInContract() {
		MF.WaitWhileBusy();
		SF.click(By.xpath('//div[@id="main-contract"]//div[@class="empty-signature"]'));
		MakeSignJS("signatureCanvas");
		SF.click(By.xpath('//button[@ng-click="saveStep()"]'));
		SF.sleep(3);
	}

	function MakeSignInInventory(step) {
		SF.click(By.xpath('//div[@id="step_inventoryMoving_' + step + '"]/div[@class="empty-signature"]/..'));
		MakeSignJS("signatureInventoryCanvas");
		SF.click(By.xpath('//div[@id="signatureInventoryPad"]//button[@ng-click="saveStep()"]'));
		SF.sleep(2);
	}

	function MakeSignInRental() {
		SF.sleep(3);
		SF.click(By.xpath('//span[contains(text(),"Tenant Signature:")]/following-sibling::div[1]/div[@ng-click="openService(\'monthly_storage_fee\', 1)"]'));
		MakeSignJS("signatureCanvasService");
		SF.click(By.xpath('//button[@ng-click="saveService()"]'));
		SF.sleep(2);
		MF.WaitWhileBusy();
	}

	function payRentalInventory(boardNumbers) {
		SF.click(By.xpath('//button[@ng-click="openPayment()"]'));
		JS.waitForExist('input[ng-model=\\"charge_value.value\\"]');
		SF.sleep(1);
		if (boardNumbers != undefined) {
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
		}), config.timeout);
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
		MF.WaitWhileBusy();
	}

	function EditRequestPayroll_RememberManager(name, managerForCommission) {
		MF.EditRequest_PayrollGetManagerCommission(name, managerForCommission);
		SF.sleep(1);
	}

	function EditRequestPayroll_RememberForeman(name, foremanForCommission) {
		foremanForCommission.Tips = {};
		foremanForCommission.fromTotal = {};
		foremanForCommission.AdServices = {};
		foremanForCommission.Daily = {};
		foremanForCommission.Hourly = {};
		foremanForCommission.Packing = {};
		foremanForCommission.Bonus = {};
		foremanForCommission.Total = 0;
		MF.EditRequest_PayrollGetForemanCommission(name, 'Tips', foremanForCommission.Tips);
		MF.EditRequest_PayrollGetForemanCommission(name, 'Commission from total', foremanForCommission.fromTotal);
		MF.EditRequest_PayrollGetForemanCommission(name, 'Extras Commission', foremanForCommission.AdServices);
		MF.EditRequest_PayrollGetForemanCommission(name, 'Daily Rate', foremanForCommission.Daily);
		MF.EditRequest_PayrollGetForemanCommission(name, 'Hourly Rate', foremanForCommission.Hourly);
		MF.EditRequest_PayrollGetForemanCommission(name, 'Packing Commission', foremanForCommission.Packing);
		MF.EditRequest_PayrollGetForemanCommission(name, 'Bonus', foremanForCommission.Bonus);

		for (let type in foremanForCommission) {
			if ((foremanForCommission[type].forCommission != 'not Exist')
				&& (foremanForCommission[type].total != undefined)) {
				console.log(('прибавляем к total ' + foremanForCommission[type].total).blue);
				foremanForCommission.Total += foremanForCommission[type].total;
			}
		}
	}

	function RememberAndValidatePayroll_In_EditRequest(managerName, boardNumbers, contractNumbers) {
		boardNumbers.Payroll = {
			managerForCommission: {},
			foremanForCommission: {},
			helpersForCommission: []
		};
		EditRequestPayroll_RememberManager(managerName, boardNumbers.Payroll.managerForCommission);
		SF.sleep(3);
		VD.IWant(VD.ToEqual, Math.floor(boardNumbers.Payroll.managerForCommission.forCommission),
			Math.floor(boardNumbers.Total
				- boardNumbers.AdServices - boardNumbers.Packing - boardNumbers.Fuel - boardNumbers.Valuation - boardNumbers.Tips - contractNumbers.CreditCardPercentSumm),
			'Не совпал ForCommission менеджера');

		driver.wait(driver.findElement(By.xpath('//label[@ng-init="calcWorkerTotal(\'salesPerson\')"]')).getText().then(function (text) {
			boardNumbers.Payroll.managerForCommission.total = SF.cleanPrice(text);
		}), config.timeout);
		SF.sleep(1);
		MF.EditRequest_PayrollOpenForemanTab();
		EditRequestPayroll_RememberForeman(V.foremanName, boardNumbers.Payroll.foremanForCommission);
		SF.sleep(3);
		MF.EditRequest_PayrollGetForemansTotal(boardNumbers.Payroll.foremanForCommission);

		VD.IWant(VD.ToEqual, Math.floor(boardNumbers.Payroll.foremanForCommission.Tips.forCommission),
			Math.floor(boardNumbers.Tips / boardNumbers.CrewSize),
			'Не совпал Tips формена');
		VD.IWant(VD.ToEqual, Math.floor(boardNumbers.Payroll.foremanForCommission.AdServices.forCommission),
			Math.floor(boardNumbers.AdServices),
			'Не совпал Extras формена');
		VD.IWant(VD.ToEqual, Math.floor(boardNumbers.Payroll.foremanForCommission.Packing.forCommission),
			Math.floor(boardNumbers.Packing),
			'Не совпал Packing формена');
		VD.IWant(VD.ToEqual, Math.floor(boardNumbers.Payroll.foremanForCommission.fromTotal.forCommission),
			Math.floor(boardNumbers.Total
				- boardNumbers.AdServices - boardNumbers.Packing - boardNumbers.Fuel - boardNumbers.Valuation - boardNumbers.Tips - contractNumbers.CreditCardPercentSumm),
			'Не совпал FromTotal формена');
		VD.IWant(VD.ToEqual, Math.floor(boardNumbers.Payroll.foremanForCommission.Daily.forCommission),
			Math.floor(10),
			'Не совпал Daily формена');
		VD.IWant(VD.ToEqual, Math.floor(boardNumbers.Payroll.foremanForCommission.Hourly.percent),
			Math.floor(10),
			'Не совпал Hourly формена');
		// VD.IWant(VD.ToEqual, Math.floor(boardNumbers.Payroll.foremanForCommission.Bonus.percent),
		//     Math.floor(10),
		//     'Не совпал Bonus формена');
		SF.sleep(1);
		MF.EditRequest_PayrollOpenHelperTab();
		driver.wait(driver.findElement(By.xpath('//label[@ng-init="calcWorkerTotal(\'helper\'); calcWorkerTotal(\'foremanAsHelper\'); calcWorkerTotal(\'driver\');"]')).getText().then(function (text) {
			boardNumbers.Payroll.helpersForCommission.total = SF.cleanPrice(text);
		}), config.timeout);
		SF.sleep(1);
	}

	function RememberAndValidatePayroll_In_EditRequestFlatRatePickup(boardNumbers, contractNumbers) {
		boardNumbers.Payroll = {
			managerForCommission: {},
			foremanForCommission: {},
			helpersForComission: {}
		};
		SF.sleep(3);
		driver.wait(driver.executeScript('return $(\'input[ng-model="sale.for_commission "]\').val()').then(function (text) {
			boardNumbers.Payroll.managerForCommission.office = SF.cleanPrice(text);
		}), config.timeout);
		SF.sleep(1);
		VD.IWant(VD.ToEqual, Math.floor(boardNumbers.Payroll.managerForCommission.office), 5000, 'Не совпал ForCommission менеджера');

		driver.wait(driver.findElement(By.xpath('//label[@ng-init="calcWorkerTotal(\'salesPerson\')"]')).getText().then(function (text) {
			boardNumbers.Payroll.managerForCommission.total = SF.cleanPrice(text);
		}), config.timeout);
		MF.EditRequest_PayrollOpenForemanTab();

		driver.wait(driver.executeScript('return ' +
			'$(\'tr:has(td>select>option[selected="selected"]:contains("Extras Commission"))>td>input[ng-model="foreman.for_commission"]\').val()'
		).then(function (text) {
			boardNumbers.Payroll.foremanForCommission.AdServices = SF.cleanPrice(text);
		}), config.timeout);
		SF.sleep(1);
		VD.IWant(VD.ToEqual, Math.floor(boardNumbers.Payroll.foremanForCommission.AdServices),
			Math.floor(boardNumbers.AdServices),
			'Не совпал Extras формена');

		driver.wait(driver.executeScript('return ' +
			'$(\'tr:has(td>select>option[selected="selected"]:contains("Packing Commission"))>td>input[ng-model="foreman.for_commission"]\').val()'
		).then(function (text) {
			boardNumbers.Payroll.foremanForCommission.Packing = SF.cleanPrice(text);
		}), config.timeout);
		SF.sleep(1);
		VD.IWant(VD.ToEqual, Math.floor(boardNumbers.Payroll.foremanForCommission.Packing),
			Math.floor(boardNumbers.Packing),
			'Не совпал Packing формена');

		driver.wait(driver.findElement(By.xpath('//label[@ng-init="calcWorkerTotal(\'foreman\')"]')).getText().then(function (text) {
			boardNumbers.Payroll.foremanForCommission.total = SF.cleanPrice(text);
		}), config.timeout);
		SF.sleep(1);
		MF.EditRequest_PayrollOpenHelperTab();
		driver.wait(driver.findElement(By.xpath('//label[@ng-init="calcWorkerTotal(\'helper\'); calcWorkerTotal(\'foremanAsHelper\'); calcWorkerTotal(\'driver\');"]')).getText().then(function (text) {
			boardNumbers.Payroll.helpersForComission.total = SF.cleanPrice(text);
		}), config.timeout);
		SF.sleep(1);
	}

	function RememberAndValidatePayroll_In_EditRequestFlatRateDelivery(boardNumbers) {
		boardNumbers.Payroll = {
			foremanForCommission: {},
			helpersForComission: []
		};
		SF.sleep(3);

		MF.EditRequest_PayrollOpenForemanTab();
		driver.wait(driver.executeScript('return ' +
			'$(\'tr:has(td>select>option[selected="selected"]:contains("Extras Commission"))>td>input[ng-model="foreman.for_commission"]\').val()'
		).then(function (text) {
			boardNumbers.Payroll.foremanForCommission.AdServices = SF.cleanPrice(text);
		}), config.timeout);
		SF.sleep(1);
		VD.IWant(VD.ToEqual, Math.floor(boardNumbers.Payroll.foremanForCommission.AdServices),
			Math.floor(boardNumbers.AdServices),
			'Не совпал Extras формена');

		driver.wait(driver.executeScript('return ' +
			'$(\'tr:has(td>select>option[selected="selected"]:contains("Packing Commission"))>td>input[ng-model="foreman.for_commission"]\').val()'
		).then(function (text) {
			boardNumbers.Payroll.foremanForCommission.Packing = SF.cleanPrice(text);
		}), config.timeout);
		SF.sleep(1);
		VD.IWant(VD.ToEqual, Math.floor(boardNumbers.Payroll.foremanForCommission.Packing),
			Math.floor(boardNumbers.Packing),
			'Не совпал Packing формена');

		driver.wait(driver.findElement(By.xpath('//label[@ng-init="calcWorkerTotal(\'foreman\')"]')).getText().then(function (text) {
			boardNumbers.Payroll.foremanForCommission.total = SF.cleanPrice(text);
		}), config.timeout);
		SF.sleep(1);
		MF.EditRequest_PayrollOpenHelperTab();
		driver.wait(driver.findElement(By.xpath('//label[@ng-init="calcWorkerTotal(\'helper\'); calcWorkerTotal(\'foremanAsHelper\'); calcWorkerTotal(\'driver\');"]')).getText().then(function (text) {
			boardNumbers.Payroll.helpersForComission.total = SF.cleanPrice(text);
		}), config.timeout);
		SF.sleep(1);
	}

	function ValidationWorkersSmallPayroll_In_EditRequest(managerName, foremaName, helperName) {
		driver.wait(driver.executeScript('return $(\'select[ng-model="selected.salesPerson[salesPersonIndex]"]:visible  option[selected="selected"]:contains("' + managerName + '")\').length;')
			.then(function (count) {
				V.countSales = count;
			}), config.timeout);
		SF.sleep(1);
		VD.IWant(VD.ToEqual, V.countSales, 1, 'не сохранился Sale');
		SF.click(By.xpath('//a[@ng-click="select(tabs[1])"][contains(text(),"Foreman")]'));
		SF.sleep(1);
		driver.wait(driver.executeScript('return $(\'select[ng-model="selected.foreman[foremanIndex]"]:visible  option[selected="selected"]:contains("' + foremaName + '")\').length;')
			.then(function (count) {
				V.countForeman = count;
			}), config.timeout);
		SF.sleep(1);
		VD.IWant(VD.ToEqual, V.countForeman, 1, 'не сохранился Foreman');
		SF.sleep(2);
		SF.click(By.xpath('//a[@ng-click="select(tabs[2])"][contains(text(),"Helpers")]'));
		SF.sleep(1);
		driver.wait(driver.executeScript('return $(\'select[ng-model="selected.helper[helperIndex]"]:visible  option[selected="selected"]:contains("' + helperName + '")\').length;')
			.then(function (count) {
				V.countForeman = count;
			}), config.timeout);
		SF.sleep(1);
		VD.IWant(VD.ToEqual, V.countForeman, 1, 'не сохранился Helper');
	}

	function findTestForemanInPayroll(ForemanName) {
		SF.click(By.xpath('//table[@id="print-area"]//td[contains(text(),"foreman")]'));
		SF.click(By.xpath('//table[@id="print-area"]//td[contains(text(),"foreman")]'));
		SF.sleep(1);
		MF.WaitWhileBusy();
		SF.click(By.xpath('//table[@id="print-area"]//td[contains(text(),"' + ForemanName + '")]'));
		SF.click(By.xpath('//table[@id="print-area"]//td[contains(text(),"' + ForemanName + '")]'));
		SF.sleep(1);
		MF.WaitWhileBusy();
	}

	function findFlatRateDeliveryForemanInPayroll() {
		SF.click(By.xpath('//table[@id="print-area"]//td[contains(text(),"foreman")]'));
		SF.click(By.xpath('//table[@id="print-area"]//td[contains(text(),"foreman")]'));
		SF.sleep(1);
		MF.WaitWhileBusy();
		SF.click(By.xpath('//table[@id="print-area"]//td[contains(text(),"FlatRate Foreman")]'));
		SF.click(By.xpath('//table[@id="print-area"]//td[contains(text(),"FlatRate Foreman")]'));
		SF.sleep(1);
		MF.WaitWhileBusy();
	}

	function findSaleInPayroll(name) {
		SF.click(By.xpath('//table[@id="print-area"]//td[contains(text(),"sales")]'));
		SF.click(By.xpath('//table[@id="print-area"]//td[contains(text(),"sales")]'));
		SF.sleep(1);
		MF.WaitWhileBusy();
		SF.click(By.xpath('//table[@id="print-area"]//td[contains(text(),"' + name + '")]'));
		SF.click(By.xpath('//table[@id="print-area"]//td[contains(text(),"' + name + '")]'));
		SF.sleep(1);
		MF.WaitWhileBusy();
	}

	function findHelperInPayroll(name) {
		SF.click(By.xpath('//table[@id="print-area"]//td[contains(text(),"helper")]'));
		SF.click(By.xpath('//table[@id="print-area"]//td[contains(text(),"helper")]'));
		SF.sleep(1);
		MF.WaitWhileBusy();
		SF.click(By.xpath('//table[@id="print-area"]//td[contains(text(),"' + name + '")]'));
		SF.click(By.xpath('//table[@id="print-area"]//td[contains(text(),"' + name + '")]'));
		SF.sleep(1);
		MF.WaitWhileBusy();
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
		MF.WaitWhileBusy();
	}

	function CreateMovAndStorFromFrontDown(client) {
		MF.FrontSite_ClickQuoteCalculator();
		MF.FrontSite_ClickDesireMoveDate();
		V.request = {};
		driver.wait(driver.executeScript(JSstep.Click4DaysNewCalendar).then(function (MovDateFront) {
			V.request.moveDate = MovDateFront;
			console.log(V.request);
		}), config.timeout);
		SF.sleep(0.5);
		MF.FrontSite_SelectServiceType(2);
		MF.FrontSite_ClickDeliveryDate();
		driver.wait(driver.executeScript(JSstep.Click8DaysNewCalendar).then(function (DelDateFront) {
			V.request.DelDate = DelDateFront;
			console.log(V.request.DelDate);
		}), config.timeout);
		MF.FrontSiteDown_SendZipCode('02032', '02136');
		MF.FrontDown_SelectMoveSize(8);
		MF.FrontDown_SetEntrance();
		MF.FrontSite_ClickCalculate();
		MF.FrontSite_SetClientInfoDown(client);
		MF.FrontSite_SelectPreferedStartTime();
		MF.FrontSite_SelectPreferedDeliveryTime();
		MF.FrontSite_SelectGoogleSearch();
		MF.FrontSite_ClickGoToCalculatorResults();
	}

	function CreateOvernightDownForm(client) {
		MF.FrontSite_ClickQuoteCalculator();
		MF.FrontSite_ClickDesireMoveDate();
		V.request = {};
		driver.wait(driver.executeScript(JSstep.Click4DaysNewCalendar).then(function (MovDateFront) {
			V.request.moveDate = MovDateFront;
			console.log(V.request);
		}), config.timeout);
		SF.sleep(1);
		MF.FrontSite_SelectServiceType(6);
		MF.FrontSiteDown_SendZipCode('02032', '02136');
		MF.FrontDown_SelectMoveSize(8);
		MF.FrontDown_SetEntrance();
		MF.FrontSite_ClickCalculate();
		MF.FrontSite_SetClientInfoDown(client);
		MF.FrontSite_SelectPreferedStartTime();
		MF.FrontSite_SelectPreferedDeliveryTime();
		MF.FrontSite_SelectGoogleSearch();
		MF.FrontSite_ClickGoToCalculatorResults();
	}

	function RememberFrontNumbersMovAndStorDown(frontNumbersDown) {
		condition.nowWeDoing = 'запоминаем данные с мувинг сторадж TУ';
		driver.wait(driver.findElement(By.xpath('//div[contains(@class, from_storage)]//div[@ng-if="storageCalcResult.to.surcharge_fuel"]/span')).getText().then(function (text) {
			frontNumbersDown.FuelTo = SF.cleanPrice(text.replace('$', ''));
		}), config.timeout);
		driver.wait(driver.findElement(By.xpath('//div[contains(@class, from_storage)]//div[@ng-if="!storageCalcResult.to.small_job"]/span')).getText().then(function (text) {
			frontNumbersDown.QuoteMinTo = SF.cleanPrice(text.substring(0, text.indexOf('-')));
			frontNumbersDown.QuoteMaxTo = SF.cleanPrice(text.substring(text.indexOf('-') + 1));
		}), config.timeout);
		driver.wait(driver.findElement(By.xpath('//div[@ng-if="storageCalcResult.to.travelTime"]/span')).getText().then(function (text) {
			frontNumbersDown.TravelTimeTo = SF.cleanPrice(text.substring(text.indexOf('min')));
		}), config.timeout);
		driver.wait(driver.findElement(By.xpath('//div[contains(@class, from_storage)]//h3[contains(text(), "Crew Size:")]/following-sibling::span')).getText().then(function (text) {
			frontNumbersDown.CrewTo = SF.cleanPrice(text);
		}), config.timeout);
		driver.wait(driver.findElement(By.xpath('//div[contains(@class, from_storage)]//div[@class="moving-date rate"]/span')).getText().then(function (text) {
			frontNumbersDown.RateTo = text.indexOf('$', 4) == -1 ?
				SF.cleanPrice(text) :
				SF.cleanPrice(text.substring(text.indexOf('$', 4)));
		}), config.timeout);
		driver.wait(driver.findElement(By.xpath('//span[@ng-if="!storageCalcResult.to.small_job"]')).getText().then(function (text) {
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

		driver.wait(driver.findElement(By.xpath('//div[contains(@class, to_storage)]//div[@ng-if="storageCalcResult.from.surcharge_fuel"]/span')).getText().then(function (text) {
			frontNumbersDown.FuelFrom = SF.cleanPrice(text.replace('$', ''));
		}), config.timeout);
		driver.wait(driver.findElement(By.xpath('//div[contains(@class, to_storage)]//div[@ng-if="!storageCalcResult.from.small_job"]/span')).getText().then(function (text) {
			frontNumbersDown.QuoteMinFrom = SF.cleanPrice(text.substring(0, text.indexOf('-')));
			frontNumbersDown.QuoteMaxFrom = SF.cleanPrice(text.substring(text.indexOf('-') + 1));
		}), config.timeout);
		driver.wait(driver.findElement(By.xpath('//div[@ng-if="storageCalcResult.from.travelTime"]/span')).getText().then(function (text) {
			frontNumbersDown.TravelTimeFrom = SF.cleanPrice(text.substring(text.indexOf('min')));
		}), config.timeout);
		driver.wait(driver.findElement(By.xpath('//div[contains(@class, to_storage)]//h3[contains(text(), "Crew Size:")]/following-sibling::span')).getText().then(function (text) {
			frontNumbersDown.CrewFrom = SF.cleanPrice(text);
		}), config.timeout);
		driver.wait(driver.findElement(By.xpath('//span[contains(text(), "Move from storage")]/..//h3[contains(text(), "Hourly Rate:")]/following-sibling::span')).getText().then(function (text) {
			frontNumbersDown.RateFrom = text.indexOf('$', 4) == -1 ?
				SF.cleanPrice(text) :
				SF.cleanPrice(text.substring(text.indexOf('$', 4)));
			// console.log(V.frontNumbersDown.RateFrom);
		}), config.timeout);
		driver.wait(driver.findElement(By.xpath('//span[@ng-if="!storageCalcResult.from.small_job"]')).getText().then(function (text) {
			let textMin = text.substring(0, text.indexOf('-'));
			let textMax = text.substring(text.indexOf('-') + 1);
			let hoursMin = textMin.indexOf('Hrs') == -1 ? 0 : SF.cleanPrice(textMin.substring(0, textMin.indexOf('Hrs')));
			let minutesMin = textMin.indexOf('Min') == -1 ? 0 : SF.cleanPrice(textMin.substring((textMin.indexOf('Hrs') + 1), textMin.indexOf('Min')));
			frontNumbersDown.JobTimeMinFrom = hoursMin * 60 + minutesMin;
			let hoursMax = textMax.indexOf('Hrs') == -1 ? 0 : SF.cleanPrice(textMax.substring(0, textMax.indexOf('Hrs')));
			let minutesMax = textMax.indexOf('Min') == -1 ? 0 : SF.cleanPrice(textMax.substring((textMax.indexOf('Hrs') + 1), textMax.indexOf('Min')));
			frontNumbersDown.JobTimeMaxFrom = hoursMax * 60 + minutesMax;
		}), config.timeout);

		// condition.nowWeDoing = 'запоминаем данные с мувинг сторадж Estimated Labor и Estimated Monthly Storage';
		//
		// driver.wait(driver.findElement(By.xpath('//div[contains(@class, form_block)]/div[@ng-if="basicsettings.showQuoteFront[request.serviceType]"]' +
		//     '//h3[contains(text(), "Estimated labor:")]/following-sibling::span')).getText().then(function(text){
		//     frontNumbersDown.EstimatedLaborMin = SF.cleanPrice(text.substring(0, text.indexOf('-')));
		//     frontNumbersDown.EstimatedLaborMax = SF.cleanPrice(text.substring(text.indexOf('-') + 1));
		// }), config.timeout);
		// driver.wait(driver.findElement(By.xpath('//div[@ng-if="!overnightMove"]/span')).getText().then(function(text){
		//     frontNumbersDown.MonthlyStorageMin = SF.cleanPrice(text.substring(0, text.indexOf('-')));
		//     frontNumbersDown.MonthlyStorageMax = SF.cleanPrice(text.substring(text.indexOf('-') + 1));
		// }), config.timeout);
		SF.sleep(1);
		console.log(frontNumbersDown);
	}

	function CreateLoadingHelpDownForm(client) {
		MF.FrontSite_ClickQuoteCalculator();
		MF.FrontSite_ClickDesireMoveDate();
		V.request = {};
		driver.wait(driver.executeScript(JSstep.Click4DaysNewCalendar).then(function (MovDateFront) {
			V.request.moveDate = MovDateFront;
			console.log(V.request);
		}), config.timeout);
		SF.sleep(0.5);
		MF.FrontSite_SelectServiceType(3);
		MF.FrontSiteDown_SendZipCodeFrom('02032');
		MF.FrontDown_SelectMoveSize(8);
		MF.FrontDown_SetEntrance();
		MF.FrontSite_ClickCalculate();
		MF.FrontSite_SetClientInfoDown(client);
		MF.FrontSite_SelectPreferedStartTime();
		SF.sleep(0.5);
		MF.FrontSite_SelectGoogleSearch();
		MF.FrontSite_ClickGoToCalculatorResults();
	}

	function CreateUnloadingHelpDownForm(client) {
		JS.scroll('move-calculator');
		MF.FrontSite_ClickQuoteCalculator();
		MF.FrontSite_ClickDesireMoveDate();
		V.request = {};
		driver.wait(driver.executeScript(JSstep.Click4DaysNewCalendar).then(function (MovDateFront) {
			V.request.moveDate = MovDateFront;
			console.log(V.request);
		}), config.timeout);
		SF.sleep(0.5);
		MF.FrontSite_SelectServiceType(4);
		SF.send(By.id('edit-zip-code-to'), '02032');
		MF.FrontDown_SelectMoveSize(8);
		MF.FrontDown_SetEntrance();
		MF.FrontSite_ClickCalculate();
		SF.waitForVisible(By.id('edit-first-name'));
		MF.FrontSite_SetClientInfoDown(client);
		MF.FrontSite_SelectPreferedStartTime();
		MF.FrontSite_SelectGoogleSearch();
		MF.FrontSite_ClickGoToCalculatorResults();
	}

	function addToCleanerJob(Id) {
		if (V.cleanerJob == undefined) {
			V.cleanerJob = [];
		}
		V.cleanerJob.push(Id);
	}

	function gotoSetingsLD() {
		SF.click(By.xpath('//button[@ng-click="toggleLeft()"]'));
		SF.waitForVisible(By.xpath('//button[@ng-click="toggleLeft()"]'));
		SF.click(By.xpath('//a[@ng-click="vm.goToPage(\'settings.general\', \'\')"]'));
		SF.waitForVisible(By.xpath('//a[@ng-click="vm.goToPage(\'settings.general\', \'\')"]'));
		SF.click(By.xpath('//a[@ui-sref="settings.longdistance"]'));
		SF.waitForVisible(By.xpath('//a[@ui-sref="settings.longdistance"]'));
		SF.sleep(4);
	}

	function deletePendingRequest() {
		SF.select(By.xpath('//select[@id="edit-status"]'), 14);
		MF.EditRequest_SaveChanges();
		MF.WaitWhileBusy();
		closeEditRequest();
		SF.sleep(2);
	}

	function addInventoryBoard(boardNumbers) {
		SF.click(By.xpath('//ul[@class="nav nav-tabs"]//a[@ng-click="select(tabs[1])"]'));
		SF.sleep(2);
		MF.WaitWhileBusy();
		SF.click(By.xpath('(//div[@class="new-inventory-item"])[1]//button[@ng-click="onClickCounter(1)"]'));
		SF.click(By.xpath('(//div[@class="new-inventory-item"])[2]//button[@ng-click="onClickCounter(1)"]'));
		SF.click(By.xpath('(//div[@class="new-inventory-item"])[3]//button[@ng-click="onClickCounter(1)"]'));
		SF.click(By.xpath('(//div[@class="new-inventory-item"])[4]//button[@ng-click="onClickCounter(1)"]'));
		SF.click(By.xpath('(//div[@class="new-inventory-item"])[5]//button[@ng-click="onClickCounter(1)"]'));
		SF.click(By.xpath('(//div[@class="new-inventory-item"])[6]//button[@ng-click="onClickCounter(1)"]'));
		SF.click(By.xpath('(//div[@class="new-inventory-item"])[7]//button[@ng-click="onClickCounter(1)"]'));
		SF.click(By.xpath('(//div[@class="new-inventory-item"])[8]//button[@ng-click="onClickCounter(1)"]'));
		SF.click(By.xpath('(//div[@class="new-inventory-item"])[1]//button[@ng-click="onClickCounter(-1)"]/following-sibling::button'));

		if (boardNumbers != undefined) {
			driver.wait(driver.findElement(By.xpath('//div[@ng-if="total.total_cf > 0 && (!isAccount || isContractPage)"]/span[@ng-bind="total.total_cf"][1]')).getText().then(function (text) {
				boardNumbers.InventoryCubicFit = SF.cleanPrice(text.replace('Total Estimated Cubic Feet:', ''));
			}), config.timeout);
		}
		SF.click(By.xpath('//span[contains(text(), "Save Inventory")]'));
		SF.sleep(4);
	}

	function addAdditionalInventoryBoard(boardNumbers) {
		SF.click(By.xpath('//ul[@class="nav nav-tabs"]//a[@ng-click="select(tabs[1])"]'));
		MF.WaitWhileBusy();
		SF.sleep(3);
		SF.click(By.xpath('(//div[@class="new-inventory-item"])[1]//button[@ng-click="onClickCounter(-1)"]/following-sibling::button'));
		SF.click(By.xpath('(//div[@class="new-inventory-item"])[2]//button[@ng-click="onClickCounter(-1)"]/following-sibling::button'));
		SF.click(By.xpath('(//div[@class="new-inventory-item"])[3]//button[@ng-click="onClickCounter(-1)"]/following-sibling::button'));
		SF.click(By.xpath('(//div[@class="new-inventory-item"])[4]//button[@ng-click="onClickCounter(-1)"]/following-sibling::button'));
		SF.click(By.xpath('(//div[@class="new-inventory-item"])[5]//button[@ng-click="onClickCounter(-1)"]/following-sibling::button'));
		SF.click(By.xpath('(//div[@class="new-inventory-item"])[6]//button[@ng-click="onClickCounter(-1)"]/following-sibling::button'));
		SF.click(By.xpath('(//div[@class="new-inventory-item"])[7]//button[@ng-click="onClickCounter(-1)"]/following-sibling::button'));
		SF.click(By.xpath('(//div[@class="new-inventory-item"])[8]//button[@ng-click="onClickCounter(-1)"]/following-sibling::button'));
		SF.click(By.xpath('(//div[@class="new-inventory-item"])[1]//button[@ng-click="onClickCounter(-1)"]/following-sibling::button'));
		SF.click(By.xpath('(//div[@class="new-inventory-item"])[2]//button[@ng-click="onClickCounter(-1)"]/following-sibling::button'));
		if (boardNumbers != undefined) {
			driver.wait(driver.findElement(By.xpath('//div[@ng-if="total.total_cf > 0 && (!isAccount || isContractPage)"]/span[@ng-bind="total.total_cf"][1]')).getText().then(function (text) {
				boardNumbers.InventoryCubicFit = SF.cleanPrice(text.replace('Total Estimated Cubic Feet:', ''));
			}), config.timeout);
		}
		SF.click(By.xpath('//span[contains(text(), "Save Inventory")]'));
		SF.sleep(4);
	}

	function RememberStorageNumbers(storageNumbers) {
		driver.wait(driver.findElement(By.xpath('//div[@ng-if="data.rentals.move_request_id"]')).getText().then(function (text) {
			storageNumbers.IdMoving = SF.cleanPrice(text);
		}), config.timeout);
		SF.sleep(1);

		driver.wait(driver.executeScript('return $(\'input[ng-model="data.rentals.moved_in_date"]\').val()').then(function (text) {
			storageNumbers.inDate = {};
			storageNumbers.inDate.Month = SF.FindShortMonthInString(text);
			storageNumbers.inDate.Day = SF.cleanPrice(text.substring(0, text.indexOf(',')));
			storageNumbers.inDate.Year = SF.cleanPrice(text.substring(text.indexOf(',')));
		}), config.timeout);
		driver.wait(driver.executeScript('return $(\'input[ng-model="data.rentals.moved_out_date"]\').val()').then(function (text) {
			storageNumbers.outDate = {};
			storageNumbers.outDate.Month = SF.FindShortMonthInString(text);
			storageNumbers.outDate.Day = SF.cleanPrice(text.substring(0, text.indexOf(',')));
			storageNumbers.outDate.Year = SF.cleanPrice(text.substring(text.indexOf(',')));
		}), config.timeout);
		driver.wait(driver.executeScript('return $(\'input[ng-model="data.rentals.volume_cuft"]\').val()').then(function (text) {
			storageNumbers.cbf = SF.cleanPrice(text);
		}), config.timeout);
		driver.wait(driver.findElement(By.xpath('//p[contains(text(),("Prepaid Credit"))]/following-sibling::p[1]')).getText().then(
			function (text) {
				storageNumbers.prepaid = SF.cleanPrice(text);
			}), config.timeout);
	}

	function ValidatePendingStorageRequest(storageNumbers, boardNumbersTo, boardNumbersFrom) {
		VD.IWant(VD.ToEqual, storageNumbers.inDate.Day, boardNumbersTo.moveDate.Day, 'день въезда не совпал');
		VD.IWant(VD.ToEqual, storageNumbers.inDate.Month, boardNumbersTo.moveDate.Month, 'месяц въезда не совпал');
		VD.IWant(VD.ToEqual, storageNumbers.inDate.Year, boardNumbersTo.moveDate.Year, 'год въезда не совпал');
		VD.IWant(VD.ToEqual, storageNumbers.outDate.Day, boardNumbersFrom.moveDate.Day, 'день выезда не совпал');
		VD.IWant(VD.ToEqual, storageNumbers.outDate.Month, boardNumbersFrom.moveDate.Month, 'месяц выезда не совпал');
		VD.IWant(VD.ToEqual, storageNumbers.outDate.Year, boardNumbersFrom.moveDate.Year, 'год выезда не совпал');
		VD.IWant(VD.ToEqual, storageNumbers.cbf, boardNumbersTo.cbf, 'объём не совпал');
		VD.IWant(VD.ToEqual, storageNumbers.prepaid, boardNumbersTo.prepaid, 'предоплата не совпала');
	}

	function RememberCarrier(carrierData) {
		driver.wait(driver.executeScript('return $(\'input[ng-model="agentModel.data.name"]\').val()').then(function (text) {
			carrierData.name = text;
		}), config.timeout);
		driver.wait(driver.executeScript('return $(\'input[ng-model="agentModel.data.contact_person"]\').val()').then(function (text) {
			carrierData.contactPerson = text;
		}), config.timeout);
		driver.wait(driver.executeScript('return $(\'input[ng-model="agentModel.data.contact_person_phone"]\').val()').then(function (text) {
			carrierData.contactPersonPhone = text;
		}), config.timeout);
		driver.wait(driver.executeScript('return $(\'textarea[ng-model="agentModel.data.address"]\').val()').then(function (text) {
			carrierData.address = text;
		}), config.timeout);
		driver.wait(driver.executeScript('return $(\'input[ng-model="agentModel.data.zip_code"]\').val()').then(function (text) {
			carrierData.zipCode = text;
		}), config.timeout);
		driver.wait(driver.executeScript('return $(\'input[ng-model="agentModel.data.per_cf"]\').val()').then(function (text) {
			carrierData.perCf = SF.cleanPrice(text);
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

	function RememberStorage(storageData) {
		driver.wait(driver.executeScript('return $(\'input[ng-model="newStorage.name"]\').val()').then(function (text) {
			storageData.name = text;
		}), config.timeout);
		driver.wait(driver.executeScript('return $(\'textarea[ng-model="newStorage.address"]\').val()').then(function (text) {
			storageData.address = text;
		}), config.timeout);
		driver.wait(driver.executeScript('return $(\'input[ng-model="newStorage.zip_code"]\').val()').then(function (text) {
			storageData.zip = text;
		}), config.timeout);
		driver.wait(driver.executeScript('return $(\'input[ng-model="newStorage.notes"]\').val()').then(function (text) {
			storageData.notes = text;
		}), config.timeout);
		driver.wait(driver.executeScript('return $(\'input[ng-model="newStorage.email"]\').val()').then(function (text) {
			storageData.email = text;
		}), config.timeout);
		driver.wait(driver.executeScript('return $(\'input[ng-model="newStorage.phones[$index]"]\').val()').then(function (text) {
			storageData.phone = text;
		}), config.timeout);
		SF.sleep(2);
	}

	function Contract_SignMainPayment() {
		MakeSignJS('signatureCanvasPayment');
		SF.click(By.xpath('//div[@ng-init="payment.canvasInit(\'signatureCanvasPayment\')"]//button[@ng-click="saveSignature()"]'));
	}

	function Contract_AddInventory(count) {
		JS.scroll("tr[ng-repeat=\"n in rangeArr\"]:eq(0)");
		for (let i = 1, invCount = 1; i <= count; i++) {
			SF.click(By.xpath('//tr[@ng-repeat="n in rangeArr"][' + i + ']//button[1]'));
			SF.sleep(1);
			JS.click("ul#inventory-dropdown:visible li[ng-repeat=\"articles in  inventoryList | toArray | orderBy: \\'title\\'  \"]:visible");
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
	function Contract_SubmitInventoryDelivery(count) {
		JS.scroll("tr[ng-repeat=\"n in rangeArr\"]:eq(0)");
		for (let i = 1, submitCount = 1; i <= count; i++) {
			SF.click(By.xpath('//tr[@ng-repeat="n in rangeArr"][' + i + ']//input[@ng-model="data[fieldName].inventory[n].checkshipper"]/..'));
			SF.sleep(0.5);
			SF.send(By.xpath('//tr[@ng-repeat="n in rangeArr"][' + i + ']//textarea[@ng-model="data[fieldName].inventory[n].destinationCondition"]'), 'good');
			SF.sleep(1);
		}
	}


	function Contract_ReviewGive(stars, text) {
		MF.Contract_ReviewClickStar(stars);
		MF.Contract_ReviewTypeFeedback(text);
		MF.Contract_ReviesSend();
		MF.Contract_OpenBillOfLading();
	}

	function RememberLocalMoveDigitsCalc(LocalMoveAdminCalc) {
		driver.wait(driver.findElement(By.xpath('//td[contains(text(), "Rate:")]/following-sibling::td[1]')).getText().then(function (rate) {
			LocalMoveAdminCalc.HourlyRate = rate.indexOf('$', 4) == -1 ?
				SF.cleanPrice(rate) :
				SF.cleanPrice(rate.substring(rate.indexOf('$', 4)));
		}), config.timeout);
		driver.wait(driver.findElement(By.xpath('//td[contains(text(), "Service Type:")]/following-sibling::td[1]')).getText().then(function (type) {
			LocalMoveAdminCalc.Type = type;
			VD.IWant(VD.ToEqual, type, "Moving", "Сервис тайп не совпал, должен быть Moving");
		}), config.timeout);
		driver.wait(driver.findElement(By.xpath('//td[contains(text(), "TRUCK:")]/following-sibling::td[1]')).getText().then(function (truck) {
			LocalMoveAdminCalc.Trucks = truck;
		}), config.timeout);
		driver.wait(driver.findElement(By.xpath('//td[contains(text(), "MOVERS:")]/following-sibling::td[1]')).getText().then(function (crew) {
			LocalMoveAdminCalc.CrewSize = SF.cleanPrice(crew)
		}), config.timeout);
		driver.wait(driver.findElement(By.xpath('//td[contains(text(), "Travel Time:")]/following-sibling::td[1]')).getText().then(function (text) {
			let hours = text.indexOf('hr') == -1 ? 0 : SF.cleanPrice(text.substring(0, text.indexOf('hr')));
			let minutes = text.indexOf('min') == -1 ? 0 : SF.cleanPrice(text.substring((text.indexOf('hr') + 1), text.indexOf('min')));
			LocalMoveAdminCalc.TravelTime = hours * 60 + minutes;
		}), config.timeout);
		SF.sleep(1);
		driver.wait(driver.findElement(By.xpath('//td[contains(text(), "Work Time")]/following-sibling::td[1]')).getText().then(function (text) {
			let textMin = text.substring(0, text.indexOf('-'));
			let textMax = text.substring(text.indexOf('-') + 1);
			let hoursMin = textMin.indexOf('hr') == -1 ? 0 : SF.cleanPrice(textMin.substring(0, textMin.indexOf('hr')));
			let minutesMin = textMin.indexOf('min') == -1 ? 0 : SF.cleanPrice(textMin.substring((textMin.indexOf('hr') + 1), textMin.indexOf('min')));
			LocalMoveAdminCalc.WorkTimeMin = hoursMin * 60 + minutesMin;
			let hoursMax = textMax.indexOf('hr') == -1 ? 0 : SF.cleanPrice(textMax.substring(0, textMax.indexOf('hr')));
			let minutesMax = textMax.indexOf('min') == -1 ? 0 : SF.cleanPrice(textMax.substring((textMax.indexOf('hr') + 1), textMax.indexOf('min')));
			LocalMoveAdminCalc.WorkTimeMax = hoursMax * 60 + minutesMax;
		}), config.timeout);
		driver.wait(driver.findElement(By.xpath('//td[contains(text(), "Move Quote")]/following-sibling::td[1]')).getText().then(function (text) {
			if (text.indexOf('$', text.indexOf('$') + 3) !== -1) {
				LocalMoveAdminCalc.QuoteMin = SF.cleanPrice(text.substring(text.indexOf('$'), text.indexOf('-')));
				LocalMoveAdminCalc.QuoteMax = SF.cleanPrice(text.substring(text.indexOf('$', text.indexOf('$') + 3)));
			} else {
				LocalMoveAdminCalc.Quote = SF.cleanPrice(text);
			}
		}), config.timeout);
		driver.wait(driver.findElement(By.xpath('//td[contains(text(), "Fuel Surcharge:")]/following-sibling::td[1]')).getText().then(function (text) {
			LocalMoveAdminCalc.Fuel = SF.cleanPrice(text);
		}), config.timeout);
		driver.wait(driver.findElement(By.xpath('//td[contains(text(), "Grand Total")]/following-sibling::td[1]')).getText().then(function (text) {
			if (text.indexOf('$', text.indexOf('$') + 3) !== -1) {
				LocalMoveAdminCalc.TotalMin = SF.cleanPrice(text.substring(text.indexOf('$'), text.indexOf('-')));
				LocalMoveAdminCalc.TotalMax = SF.cleanPrice(text.substring(text.indexOf('$', text.indexOf('$') + 3)));
			} else {
				LocalMoveAdminCalc.Total = SF.cleanPrice(text);
			}
		}), config.timeout);
		console.log(LocalMoveAdminCalc);
	}

	function CreateFlatRateDownForm(client) {
		SF.sleep(4);
		JS.scroll('move-calculator');
		MF.FrontSite_ClickQuoteCalculator();
		MF.FrontSite_ClickDesireMoveDate();
		V.request = {};
		driver.wait(driver.executeScript(JSstep.Click4DaysNewCalendar).then(function (MovDateFront) {
			V.request.moveDate = MovDateFront;
			console.log(V.request);
		}), config.timeout);
		MF.FrontSiteDown_SendZipCode('02461', '07304');
		SF.sleep(1);
		MF.FrontDown_SelectMoveSize(10);
		MF.FrontDown_SetEntrance();
		MF.FrontSite_ClickCalculate();
		MF.FrontSite_SetClientInfoDown(client);
		MF.FrontSite_SelectPreferedStartTime();
		MF.FrontSite_SelectGoogleSearch();
		MF.FrontSite_ClickGoToCalculatorResults();
		MF.FrontSite_GoToConfirmation();
		MF.FrontSite_ViewRequestPage();
	}

	function CreateStorageTenant(client) {
		MF.ClickCreateStorageTenant();
		SF.send(By.xpath('//input[@ng-model="data.user_info.name"]'), client.long);
		SF.send(By.xpath('//input[@ng-model="data.user_info.zip"]'), '02136');
		SF.send(By.xpath('//input[@ng-model="data.user_info.phone1"]'), client.phone);
		SF.send(By.xpath('//input[@ng-model="data.user_info.email"]'), client.email);
		var now = new Date();
		var msInDay = 86400000;
		var future = new Date(now.getTime() + msInDay * 4);
		var options = {month: 'short', day: 'numeric', year: 'numeric'};
		V.changedate = (future.toLocaleDateString('en-US', options));
		SF.send(By.xpath('//input[@ng-model="data.rentals.moved_in_date"]'), V.changedate);
		var now = new Date();
		var msInDay = 86400000;
		var future = new Date(now.getTime() + msInDay * 8);
		var options = {month: 'short', day: 'numeric', year: 'numeric'};
		V.changedateOut = (future.toLocaleDateString('en-US', options));
		SF.send(By.xpath('//input[@ng-model="data.rentals.moved_out_date"]'), V.changedateOut);
		SF.click(By.xpath('//input[@ng-model="data.rentals.volume_cuft"]'));
		SF.clear(By.xpath('//input[@ng-model="data.rentals.volume_cuft"]'));
		SF.send(By.xpath('//input[@ng-model="data.rentals.volume_cuft"]'), 200);
		SF.click(By.xpath('//input[@ng-model="data.user_info.phone2"]'));
		SF.click(By.xpath('//button[@ng-click="createNewStorageRequest()"]'));
		MF.WaitWhileBusy();
		SF.sleep(3);
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
			SF.waitForLocated(By.xpath('//button[@ng-click="removeMisc()"]'));
			MF.WaitWhileBusy();
			SF.click(By.xpath('//button[@ng-click="removeMisc()"]'));
			MF.SweetConfirm();
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
			SF.waitForLocated(By.xpath('//button[@ng-click="removePaycheck()"]'));
			MF.WaitWhileBusy();
			SF.click(By.xpath('//button[@ng-click="removePaycheck()"]'));
			MF.SweetConfirm();
			MF.WaitWhileBusy();
		}
	}

	function Payroll_SelectPeriod20Days() {
		let now = new Date();
		let msInDay = 86400000;
		let future = new Date(now.getTime() - msInDay * 10);
		let options = {month: 'short', day: 'numeric', year: 'numeric'};
		V.payrollDateFrom = (future.toLocaleDateString('en-US', options));
		now = new Date();
		msInDay = 86400000;
		future = new Date(now.getTime() + msInDay * 6);
		options = {month: 'short', day: 'numeric', year: 'numeric'};
		V.payrollDateTo = (future.toLocaleDateString('en-US', options));
		SF.clear(By.xpath('//input[@ng-model="dateRange.from"]'));
		SF.send(By.xpath('//input[@ng-model="dateRange.from"]'), V.payrollDateFrom);
		SF.clear(By.xpath('//input[@ng-model="dateRange.to"]'));
		SF.send(By.xpath('//input[@ng-model="dateRange.to"]'), V.payrollDateTo);
		SF.click(By.xpath('//button[@ng-click="getByDate();bDateChange=false"]'));
		MF.WaitWhileBusy();
	}

	function ProfitAndLoss_SelectPeriod20Days() {
		let now = new Date();
		let msInDay = 86400000;
		let future = new Date(now.getTime() - msInDay * 10);
		let options = {month: 'short', day: 'numeric', year: 'numeric'};
		V.profitlossDateFrom = (future.toLocaleDateString('en-US', options));
		now = new Date();
		msInDay = 86400000;
		future = new Date(now.getTime() + msInDay * 6);
		options = {month: 'short', day: 'numeric', year: 'numeric'};
		V.profitlossDateTo = (future.toLocaleDateString('en-US', options));
		MF.WaitWhileBusy();
		SF.clear(By.xpath('//input[@ng-model="vm.dates.from"]'));
		MF.WaitWhileBusy();
		MF.WaitWhileBusy();
		SF.send(By.xpath('//input[@ng-model="vm.dates.from"]'), V.profitlossDateFrom);
		MF.WaitWhileBusy();
		MF.WaitWhileBusy();
		SF.clear(By.xpath('//input[@ng-model="vm.dates.to"]'));
		MF.WaitWhileBusy();
		MF.WaitWhileBusy();
		SF.send(By.xpath('//input[@ng-model="vm.dates.to"]'), V.profitlossDateTo);
		MF.WaitWhileBusy();
		SF.sleep(3);
		MF.WaitWhileBusy();
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
		driver.wait(driver.findElement(By.xpath('//td[contains(text(), "' + workerName + '")]/following-sibling::td[@ng-show="columns.fields[\'total\'].selected"][last()]')).getText().then(function (total) {
			payrollNumbersOutside.total = SF.cleanPrice(total);
		}), config.timeout);
		SF.sleep(0, 5);
		driver.wait(driver.findElement(By.xpath('//td[contains(text(), "' + workerName + '")]/following-sibling::td[@ng-show="columns.fields[\'paid\'].selected"][last()]')).getText().then(function (paid) {
			payrollNumbersOutside.paid = SF.cleanPrice(paid);
		}), config.timeout);
		SF.sleep(0, 5);
	}

	function Department_TurnOnAllCommission() {
		MF.Department_AddRowOnRates();
		SF.click(By.xpath('//div[@ng-hide="request.workerPosition == \'Manager\'' +
			' || request.workerPosition == \'Sales\' || request.workerPosition == \'Customer service\' ' +
			'|| request.workerPosition.split(\' \')[0] == \'Customer\'"]/div[3]//input[@ng-model="rateCommission[$index].input"]'));
		SF.send(By.xpath('//div[@ng-hide="request.workerPosition == \'Manager\'' +
			' || request.workerPosition == \'Sales\' || request.workerPosition == \'Customer service\' ' +
			'|| request.workerPosition.split(\' \')[0] == \'Customer\'"]/div[3]//input[@ng-model="rateCommission[$index].input"]'), 10);
		MF.Department_AddRowOnRates();
		SF.click(By.xpath('//div[@ng-hide="request.workerPosition == \'Manager\'' +
			' || request.workerPosition == \'Sales\' || request.workerPosition == \'Customer service\' ' +
			'|| request.workerPosition.split(\' \')[0] == \'Customer\'"]/div[4]//input[@ng-model="rateCommission[$index].input"]'));
		SF.send(By.xpath('//div[@ng-hide="request.workerPosition == \'Manager\'' +
			' || request.workerPosition == \'Sales\' || request.workerPosition == \'Customer service\' ' +
			'|| request.workerPosition.split(\' \')[0] == \'Customer\'"]/div[4]//input[@ng-model="rateCommission[$index].input"]'), 10);
		MF.Department_AddRowOnRates();
		SF.click(By.xpath('//div[@ng-hide="request.workerPosition == \'Manager\'' +
			' || request.workerPosition == \'Sales\' || request.workerPosition == \'Customer service\' ' +
			'|| request.workerPosition.split(\' \')[0] == \'Customer\'"]/div[5]//input[@ng-model="rateCommission[$index].input"]'));
		SF.send(By.xpath('//div[@ng-hide="request.workerPosition == \'Manager\'' +
			' || request.workerPosition == \'Sales\' || request.workerPosition == \'Customer service\' ' +
			'|| request.workerPosition.split(\' \')[0] == \'Customer\'"]/div[5]//input[@ng-model="rateCommission[$index].input"]'), 10);
		MF.Department_AddRowOnRates();
		SF.click(By.xpath('//div[@ng-hide="request.workerPosition == \'Manager\'' +
			' || request.workerPosition == \'Sales\' || request.workerPosition == \'Customer service\' ' +
			'|| request.workerPosition.split(\' \')[0] == \'Customer\'"]/div[6]//input[@ng-model="rateCommission[$index].input"]'));
		SF.send(By.xpath('//div[@ng-hide="request.workerPosition == \'Manager\'' +
			' || request.workerPosition == \'Sales\' || request.workerPosition == \'Customer service\' ' +
			'|| request.workerPosition.split(\' \')[0] == \'Customer\'"]/div[6]//input[@ng-model="rateCommission[$index].input"]'), 10);
	}

	function CreateGeneralDefaultStorage() {
		SF.click(By.xpath('//a[@ng-click="storage.openModal()"]//div'));
		SF.waitForLocated(By.xpath('//button[@ng-click="closeModal()"]'));
		MF.WaitWhileBusy();
		SF.send(By.xpath('//input[@ng-model="modalSave.name"]'), 'Test Storage');
		SF.send(By.xpath('//textarea[@ng-model="modalSave.address"]'), 'Pensilvania, 34532');
		SF.send(By.xpath('//input[@ng-model="modalSave.zip"]'), '02032');
		SF.send(By.xpath('//input[@ng-model="modalSave.phone1"]'), 1234567890);
		SF.send(By.xpath('//input[@ng-model="modalSave.email"]'), 'test@ya.cc');
		SF.click(By.xpath('//input[@ng-model="modalSave.tax"]'));
		SF.send(By.xpath('//input[@ng-model="modalSave.tax"]'), 3);
		SF.click(By.xpath('//input[@ng-model="modalSave.rate_per_cuft"]'));
		SF.send(By.xpath('//input[@ng-model="modalSave.rate_per_cuft"]'), 10);
		SF.click(By.xpath('//input[@ng-model="modalSave.late_fee"]'));
		SF.send(By.xpath('//input[@ng-model="modalSave.late_fee"]'), 10);
		SF.click(By.xpath('//input[@ng-model="modalSave.apply_late_fee_in"]'));
		SF.send(By.xpath('//input[@ng-model="modalSave.apply_late_fee_in"]'), 1);
		SF.clear(By.xpath('//input[@ng-model="modalSave.min_cuft"]'));
		SF.click(By.xpath('//input[@ng-model="modalSave.min_cuft"]'));
		SF.send(By.xpath('//input[@ng-model="modalSave.min_cuft"]'), 25);

		SF.clear(By.xpath('//input[@ng-model="modalSave.reminder1Days"]'));
		SF.click(By.xpath('//input[@ng-model="modalSave.reminder1Days"]'));
		SF.send(By.xpath('//input[@ng-model="modalSave.reminder1Days"]'), 2);

		SF.clear(By.xpath('//input[@ng-model="modalSave.reminder2Days"]'));
		SF.click(By.xpath('//input[@ng-model="modalSave.reminder2Days"]'));
		SF.send(By.xpath('//input[@ng-model="modalSave.reminder2Days"]'), 3);

		SF.clear(By.xpath('//input[@ng-model="modalSave.reminder3Days"]'));
		SF.click(By.xpath('//input[@ng-model="modalSave.reminder3Days"]'));
		SF.send(By.xpath('//input[@ng-model="modalSave.reminder3Days"]'), 4);

		SF.click(By.xpath('//input[@ng-model="modalSave.default"]'));
		SF.click(By.xpath('//button[@ng-click="isUpdate? saveStorage() : addNewStorage()"]'));
		MF.WaitWhileBusy();
		SF.click(By.xpath('//button[@ng-click="closeModal()"]'));
		MF.WaitWhileBusy();
	}

	function FlatRateEditRequest_AddTwoOption() {
		SF.clear(By.xpath('//input[@ng-model="option.pickup"]'));
		SF.sleep(0.5);
		let now = new Date();
		let msInDay = 86400000;
		let future = new Date(now.getTime() + msInDay * 2);
		let options = {month: 'long', day: 'numeric', year: 'numeric'};
		V.changedateUpAdmin = (future.toLocaleDateString('en-US', options));
		SF.send(By.xpath('//input[@ng-model="option.pickup"]'), V.changedateUpAdmin);
		SF.select(By.xpath('//select[@ng-model="option.picktime1"]'), 3);
		SF.select(By.xpath('//select[@ng-model="option.picktime2"]'), 4);
		SF.sleep(0.5);
		now = new Date();
		msInDay = 86400000;
		future = new Date(now.getTime() + msInDay * 4);
		options = {month: 'long', day: 'numeric', year: 'numeric'};
		V.newChangedateDelAdmin = (future.toLocaleDateString('en-US', options));
		SF.send(By.xpath('//input[@ng-model="option.delivery"]'), V.newChangedateDelAdmin);
		SF.select(By.xpath('//select[@ng-model="option.deltime1"]'), 5);
		SF.select(By.xpath('//select[@ng-model="option.deltime2"]'), 6);
		SF.send(By.xpath('//input[@ng-model="option.rate"]'), 5000);
		SF.sleep(0.5);
		SF.click(By.xpath('//a[@ng-click="addOption()"]'));
		SF.sleep(1);
		SF.click(By.xpath('//a[@ng-click="saveOptions()"]'));
		SF.sleep(2);
		MF.WaitWhileBusy();
		MF.SweetConfirm();
	}

	function EditRequest_Payment_AddOnlinePayment() {
		let creditFee = 3;
		let amount = 100;
		SF.click(By.xpath('//a[@ng-show="basicSettings.AuthPaymentSSL"]'));
		SF.sleep(1);
		SF.send(By.xpath('//p/input[@ng-model="charge_value.value"]'), amount);
		SF.click(By.xpath('//button[@ng-click="goStepTwo();"]'));
		MF.WaitWhileBusy();
		SF.waitForLocated(By.xpath('//strong[contains(text(), "Insert Credit Card processing fee %")]'));
		driver.wait(driver.findElement(By.xpath('//strong[contains(text(), "Insert Credit Card processing fee %")]')).getText().then(function (text) {
			VD.IWant(VD.ToEqual, text, `Insert Credit Card processing fee %${creditFee}`, 'неправильные процент на кредитку');
		}), config.timeout);
		SF.sleep(1);
		SF.click(By.xpath('//input[@ng-model="payment.creditCardFee"]'));
		FillCardPayModal();
		MF.WaitWhileBusy();
		SF.waitForVisible(By.xpath('//div[@ng-show="receipt.transaction_id != \'Custom Payment\' || isAccount"]'));
		driver.wait(driver.findElement(By.xpath('//span[contains(text(), "Amount: ")]/following-sibling::span')).getText().then(function (text) {
			V.PaymentInsert = SF.cleanPrice(text);
			VD.IWant(VD.ToEqual, V.PaymentInsert, amount * (1 + creditFee / 100), 'оплата не совпала')
		}), config.timeout);
		MF.WaitWhileBusy();
		SF.click(By.xpath('//h2[contains(text(), "Receipt ")]/../../..//button[@ng-click="cancel()"]'));
		SF.sleep(2);
	}

	function HomeEstimateRequest_Check() {
		SF.click(By.xpath('//a[@ng-click="vm.goToPage(\'requests.child\')"]'));
		MF.WaitWhileBusy();
		SF.select(By.xpath('//select[@id="fstatus"]'), 4);
		driver.wait(driver.findElement(By.xpath('//td[contains(text(),"' + V.boardNumbers.Id + '")]')).getText().then(function (text) {
			V.InhomeReq = SF.cleanPrice(text);
			VD.IWant(VD.ToEqual, V.InhomeReq, V.boardNumbers.Id, 'реквеста нет в списке Inhome Estimate')
		}), config.timeout);
		SF.sleep(1);
	}

	function HomeEstimate_CheckAccount() {
		SF.get(V.accountURL);
		LoginToAccountAsClient(V.client);
		MF.Account_OpenRequest(V.boardNumbers.Id);
		MF.Account_ClickViewRequest();
		driver.wait(driver.findElement(By.xpath('//div[@ng-show="vm.statusText.length"]//div[contains(text()," In-home Estimate")]')).getText().then(function (Status) {
		 	VD.IWant(VD.ToEqual, Status, 'In-home Estimate');
		 }), config.timeout);
		MF.Board_LogoutAdmin();
		SF.sleep(1);
	}

	function HomeEstimate_SalesGoInPortal() {
		SF.get(V.adminURL);
		SF.waitForVisible(By.xpath('//h1[@ng-click="homeEstimate = true; moveBoard = false;"]'));
		SF.click(By.xpath('//h1[@ng-click="homeEstimate = true; moveBoard = false;"]'));
		SF.send(By.xpath('//input[@id="email"]'), V.salesLogin);
		SF.send(By.xpath('//input[@id="password"]'), V.salesPassword);
		SF.click(By.xpath('//button[@type="submit"]'));
		SF.waitForVisible(By.xpath('//div[@ng-repeat="request in vm.inHomeEstimateRequests"]'));
		SF.sleep(2);
		//JS.scroll(V.boardNumbers.Id);
		JS.click('div.card-root__card:contains(\\"' + V.boardNumbers.Id + '\\") div.card-root__footer' +
			' button.card-root__view-request.btn.btn-default');
		MF.WaitWhileBusy();
	}
	function HomeEstimate_ReservationPage() {
		SF.click(By.xpath('//button[@ng-click="openReservationPage()"]'));
		MF.Contract_WaitConfirmationPage();
		MF.Account_ClickIAgreeWithAll();
		SF.click(By.xpath('//div[@ng-click="addReservationPayment()"]'));
		SF.waitForVisible(By.xpath('//canvas[@id="signatureCanvasReserv"]'));
		MakeSignJS('signatureCanvasReserv');
		SF.click(By.xpath('//button[contains(@ng-click,"saveReservSignature()")]'));
		FillCardPayModal();
		MF.WaitWhileSpinner();
	}
	function HomeEstimate_EditClientInfo(){
		SF.click(By.xpath('//li/a[@ng-click="select(tabs[4])"]'));
		SF.click(By.xpath('//input[@ng-model="client.field_user_first_name"]'));
		SF.send(By.xpath('//input[@ng-model="client.field_user_first_name"]'),'hwieufhwefhieu');
		SF.click(By.xpath('//input[@ng-model="client.field_user_last_name"]'));
		SF.send(By.xpath('//input[@ng-model="client.field_user_last_name"]'), 'efgeirfu');
		SF.click(By.xpath('//div/button[@ng-click="update(client)"]'));
		MF.WaitWhileBusy();
	}
	function EditRequest_EditRateCalculOff(rate){
		JS.click('div span.field-prefix.field-prefix_display-block ' +
			'i[ng-click="OpenDiscountRateModal();"]');
		SF.click(By.xpath('//div/input[@ng-change="calcDiscount()"]'));
		SF.sleep(1);
		SF.send(By.xpath('//div/input[@ng-change="calcDiscount()"]'),rate);
		SF.sleep(1);
		SF.click(By.xpath('//div/button[@ng-click="Apply()"]'));
		SF.sleep(1);
		SF.click(By.xpath('//div/button[@class="confirm"]'));
		SF.sleep(1);
	}
	function EditRequest_EditCrewCalculOff() {
		SF.click(By.xpath('//div[@class="col-md-1 col-xs-1 form-item form-type-textfield form-item-movers-crew"]' +
			'/input[@oldvalue="request.crew.old"]'));
		SF.clear(By.xpath('//div[@class="col-md-1 col-xs-1 form-item form-type-textfield form-item-movers-crew"]' +
			'/input[@oldvalue="request.crew.old"]'));
		SF.send(By.xpath('//div[@class="col-md-1 col-xs-1 form-item form-type-textfield form-item-movers-crew"]' +
			'/input[@oldvalue="request.crew.old"]'),'4');
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
		ContractAdditionalInventoryAdd: ContractAdditionalInventoryAdd,
		AccountFlatRateAddInventory: AccountFlatRateAddInventory,
		AddInventory_InHomeEstimate: AddInventory_InHomeEstimate,
		AccountLocalDetails: AccountLocalDetails,
		AccountLoadingDetails: AccountLoadingDetails,
		AccountUnLoadingDetails: AccountUnLoadingDetails,
		AccountUnloadingEnterAddress: AccountUnloadingEnterAddress,
		AccountLoadingEnterAddress: AccountLoadingEnterAddress,
		AccountToStorageEnterAddress: AccountToStorageEnterAddress,
		AccountFromStorageEnterAddress: AccountFromStorageEnterAddress,
		Account_CheckSignature: Account_CheckSignature,
		RememberAccountNumbers: RememberAccountNumbers,
		RememberAccountNumbersLD: RememberAccountNumbersLD,
		LogoutFromAccount: LogoutFromAccount,
		LogoutFromBoardForeman: LogoutFromBoardForeman,
		LoginToBoardAsAdmin: LoginToBoardAsAdmin,
		LoginToBoardAsForeman: LoginToBoardAsForeman,
		LoginToBoardAsForemanDeliveryFlatRate: LoginToBoardAsForemanDeliveryFlatRate,
		LoginToBoardAsCustom: LoginToBoardAsCustom,
		LoginToBoardAsCustomForeman: LoginToBoardAsCustomForeman,
		LoginToAccountAsClient: LoginToAccountAsClient,
		LoginToBoardAs_Roma4ke_Admin: LoginToBoardAs_Roma4ke_Admin,
		OpenRequestFlatRate: OpenRequestFlatRate,
		CreateMovAndStorFromFrontDown: CreateMovAndStorFromFrontDown,
		CreateUnloadingHelpDownForm: CreateUnloadingHelpDownForm,
		CreateLoadingHelpDownForm: CreateLoadingHelpDownForm,
		CreateOvernightDownForm: CreateOvernightDownForm,
		CreateLocalMovingFromBoard: CreateLocalMovingFromBoard,
		CreateMovAndStorFromBoard: CreateMovAndStorFromBoard,
		CreateLoadingHelpFromBoard: CreateLoadingHelpFromBoard,
		CreatePackingDayFromBoard: CreatePackingDayFromBoard,
		CreateFlatRateDownForm: CreateFlatRateDownForm,
		CreateStorageTenant: CreateStorageTenant,
		CreateFlatRateFromBoard: CreateFlatRateFromBoard,
		CreateLongDistanceFromBoard: CreateLongDistanceFromBoard,
		CreateCarrier: CreateCarrier,
		RememberDigitsRequestBoard_Up: RememberDigitsRequestBoard_Up,
		RememberDigitsRequestBoard_Down: RememberDigitsRequestBoard_Down,
		RememberDigitsRequestBoard: RememberDigitsRequestBoard,
		RememberFrontNumbersMovAndStorDown: RememberFrontNumbersMovAndStorDown,
		RememberLocalMoveDigitsCalc: RememberLocalMoveDigitsCalc,
		Validation_Compare_Account_Admin: Validation_Compare_Account_Admin,
		Validation_Compare_Account_Admin_PackingDay: Validation_Compare_Account_Admin_PackingDay,
		Validation_Compare_Account_Admin_LongDistance: Validation_Compare_Account_Admin_LongDistance,
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
		AdminPermissionsClear: AdminPermissionsClear,
		PermissionCanSeeOtherLeads: PermissionCanSeeOtherLeads,
		PermissionCanSearchOtherLeads: PermissionCanSearchOtherLeads,
		PermissionCanEditOtherLeads: PermissionCanEditOtherLeads,
		PermissionCanSeeUnsignedLeads: PermissionCanSeeUnsignedLeads,
		PermissionCanSignedSales: PermissionCanSignedSales,
//Permissions for Sales --- end
		closeEditRequest: closeEditRequest,
		SelectRequestDispatch: SelectRequestDispatch,
		OpenRequestDispatch: OpenRequestDispatch,
		OpenRequestInForemanPage: OpenRequestInForemanPage,
		selectCrew: selectCrew,
		selectCrewFlatRatePickUp: selectCrewFlatRatePickUp,
		selectCrewFlatRateDelivery: selectCrewFlatRateDelivery,
		MakeSignInContract: MakeSignInContract,
		MakeSignInInventory: MakeSignInInventory,
		MakeSignInRental: MakeSignInRental,
		payRentalInventory: payRentalInventory,
		RememberDateFromRequest: RememberDateFromRequest,
		findDayInLocalDispatch: findDayInLocalDispatch,
		EditRequestPayroll_RememberManager: EditRequestPayroll_RememberManager,
		EditRequestPayroll_RememberForeman: EditRequestPayroll_RememberForeman,
		RememberAndValidatePayroll_In_EditRequest: RememberAndValidatePayroll_In_EditRequest,
		ValidationWorkersSmallPayroll_In_EditRequest: ValidationWorkersSmallPayroll_In_EditRequest,
		findTestForemanInPayroll: findTestForemanInPayroll,
		findFlatRateDeliveryForemanInPayroll: findFlatRateDeliveryForemanInPayroll,
		findSaleInPayroll: findSaleInPayroll,
		findHelperInPayroll: findHelperInPayroll,
		selectDateInPayroll: selectDateInPayroll,
		addToCleanerJob: addToCleanerJob,
		gotoSetingsLD: gotoSetingsLD,
		deletePendingRequest: deletePendingRequest,
		addInventoryBoard: addInventoryBoard,
		addAdditionalInventoryBoard: addAdditionalInventoryBoard,
		RememberStorageNumbers: RememberStorageNumbers,
		ValidatePendingStorageRequest: ValidatePendingStorageRequest,
		RememberCarrier: RememberCarrier,
		RememberStorage: RememberStorage,
		Contract_SignMainPayment: Contract_SignMainPayment,
		Contract_AddInventory: Contract_AddInventory,
		Contract_SubmitInventoryDelivery:Contract_SubmitInventoryDelivery,
		Contract_ReviewGive: Contract_ReviewGive,
		RememberAndValidatePayroll_In_EditRequestFlatRatePickup: RememberAndValidatePayroll_In_EditRequestFlatRatePickup,
		RememberAndValidatePayroll_In_EditRequestFlatRateDelivery: RememberAndValidatePayroll_In_EditRequestFlatRateDelivery,
		FlatRateEditRequest_AddTwoOption: FlatRateEditRequest_AddTwoOption,
//Payroll
		Payroll_DeleteAllMiscPaymentCycle: Payroll_DeleteAllMiscPaymentCycle,
		Payroll_DeleteAllPaycheckPaycashCycle: Payroll_DeleteAllPaycheckPaycashCycle,
		Payroll_SelectPeriod20Days: Payroll_SelectPeriod20Days,
		RememberPayrollNumbers_OutsideNameWorker: RememberPayrollNumbers_OutsideNameWorker,
		RememberPayrollNumbers_InsideWorker: RememberPayrollNumbers_InsideWorker,
		ProfitAndLoss_SelectPeriod20Days: ProfitAndLoss_SelectPeriod20Days,
//Departmnet
		Department_TurnOnAllCommission: Department_TurnOnAllCommission,

		CreateGeneralDefaultStorage: CreateGeneralDefaultStorage,

		EditRequest_Payment_AddOnlinePayment: EditRequest_Payment_AddOnlinePayment,
		HomeEstimateRequest_Check: HomeEstimateRequest_Check,
		HomeEstimate_CheckStatusinMoveboard: HomeEstimate_CheckStatusinMoveboard,
		HomeEstimate_CheckAccount: HomeEstimate_CheckAccount,
		HomeEstimate_SalesGoInPortal: HomeEstimate_SalesGoInPortal,
		HomeEstimate_ReservationPage: HomeEstimate_ReservationPage,
		HomeEstimate_EditClientInfo:  HomeEstimate_EditClientInfo,
		EditRequest_EditRateCalculOff:EditRequest_EditRateCalculOff,
		EditRequest_EditCrewCalculOff:EditRequest_EditCrewCalculOff
	};
};
