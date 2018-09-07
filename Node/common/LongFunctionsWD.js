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
		SF.sleep(1.5);
		driver.wait(driver.executeScript("$('ultrasmall-form input[ng-model=\"request.deliveryDate\"]').focus();"), config.timeout);
		JS.waitForExist('div.er-picker__box:visible');
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
        MF.Account_ClickUpdateClientInModalWindow();
		// MF.Account_SweetUpdateConfirm();
		MF.SweetConfirm();
		MF.WaitWhileBusy();
	}

	function AccountUnloadingEnterAddress() {
		MF.Account_OpenAdressModal();
		SF.send(By.xpath('//input[@type="field_moving_to"][@placeholder="To Address"]'), 'Address To');
        MF.Account_ClickUpdateClientInModalWindow();
		//MF.Account_SweetUpdateConfirm();
		MF.SweetConfirm();
		MF.WaitWhileBusy();
	}

	function AccountLoadingEnterAddress() {
		MF.Account_OpenAdressModal();
		SF.click(By.xpath('//input[@type="field_moving_from"][@placeholder="From Address"]'));
		SF.send(By.xpath('//input[@type="field_moving_from"][@placeholder="From Address"]'), 'From Address');
        MF.Account_ClickUpdateClientInModalWindow();
		//MF.Account_SweetUpdateConfirm();
		MF.SweetConfirm();
		MF.WaitWhileBusy();
	}

	function AccountToStorageEnterAddress() {
		MF.Account_OpenAdressModal();
		SF.click(By.xpath('//input[@type="field_moving_from"][@placeholder="From Address"]'));
		SF.send(By.xpath('//input[@type="field_moving_from"][@placeholder="From Address"]'), 'Otkuda edem');
		SF.sleep(1);
        MF.Account_ClickUpdateClientInModalWindow();
		//MF.Account_SweetUpdateConfirm();
		MF.SweetConfirm();
		MF.WaitWhileBusy();
	}

	function AccountFromStorageEnterAddress() {
		MF.Account_OpenAdressModal();
		SF.click(By.xpath('//input[@type="field_moving_to"][@placeholder="To Address"]'));
		SF.send(By.xpath('//input[@type="field_moving_to"][@placeholder="To Address"]'), 'Kuda edem');
		SF.sleep(1);
        MF.Account_ClickUpdateClientInModalWindow();
		//MF.Account_SweetUpdateConfirm();
		MF.SweetConfirm();
		MF.WaitWhileBusy();
	}

	function AccountFlatRateAddInventory() {
		SF.sleep(1);
		JS.waitForExist('a[ng-repeat="filter in room.filters track by $id(filter)"]');
		SF.sleep(2);
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
		MF.WaitWhileBusy();
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
    function AccountLocalAddInventoryWhenCalcOff(accountNumbers) {
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
        SF.sleep(1);
        SF.click(By.xpath('//span[contains(text(), "Save Inventory")]'));
        MF.WaitWhileBusy();
        // MF.Account_ClickSaveInventory();
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
		SF.sleep(3);
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
	}

	function ContractAdditionalInventoryAdd() {
		SF.sleep(1);
		SF.click(By.xpath('//button[@ng-click="openAdditionalInventory()"]'));
		JS.waitForExist('a[ng-repeat="filter in room.filters track by $id(filter)"]');
		SF.sleep(1.5);
		SF.click(By.xpath('(//div[@class="new-inventory-item"])[1]//button[@ng-click="onClickCounter(1)"]'));
		SF.click(By.xpath('(//div[@class="new-inventory-item"])[2]//button[@ng-click="onClickCounter(1)"]'));
		SF.click(By.xpath('(//div[@class="new-inventory-item"])[3]//button[@ng-click="onClickCounter(1)"]'));
		SF.click(By.xpath('(//div[@class="new-inventory-item"])[4]//button[@ng-click="onClickCounter(1)"]'));
		SF.click(By.xpath('(//div[@class="new-inventory-item"])[5]//button[@ng-click="onClickCounter(1)"]'));
		SF.click(By.xpath('(//div[@class="new-inventory-item"])[6]//button[@ng-click="onClickCounter(1)"]'));
		SF.click(By.xpath('//a[@ng-click="setCustomItemMode()"]'));
		SF.sleep(3);
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
		SF.sleep(1);
		MF.WaitWhileBusy();
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
    function AccountLocalAddAdditionalInventoryWhenCalcOff() {
        MF.WaitWhileBusy();
        JS.click('a[ng-click=\\"vm.select(tab)\\"]:contains(\\"Inventory\\")');
        SF.sleep(1);
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
        SF.sleep(1);
        SF.click(By.xpath('//span[contains(text(), "Save Inventory")]'));
        MF.WaitWhileBusy();
    }
	function Account_DeleteInventory() {
        SF.click (By.xpath('//div[@class="new-inventory-item__col"]//button[@ng-click="onClickCounter(-1)"]'));
        SF.click (By.xpath('//div[@class="new-inventory-item__col"]//button[@ng-click="onClickCounter(-1)"]'));
        SF.click (By.xpath('//div[@class="new-inventory-item__col"]//button[@ng-click="onClickCounter(-1)"]'));
        SF.click (By.xpath('//div[@class="new-inventory-item__col"]//button[@ng-click="onClickCounter(-1)"]'));
        SF.click (By.xpath('//div[@class="new-inventory-item__col"]//button[@ng-click="onClickCounter(-1)"]'));
        SF.click (By.xpath('//div[@class="new-inventory-item__col"]//button[@ng-click="onClickCounter(-1)"]'));
        SF.click (By.xpath('//div[@class="new-inventory-item__col"]//button[@ng-click="onClickCounter(-1)"]'));
        SF.click (By.xpath('//div[@class="new-inventory-item__col"]//button[@ng-click="onClickCounter(-1)"]'));
        SF.click (By.xpath('//div[@class="new-inventory-item__col"]//button[@ng-click="onClickCounter(-1)"]'));
        MF.Account_ClickSaveInventory();
        MF.WaitWhileBusy();
    }

	function HomeEstimate_CheckStatusinMoveboard() {
		MF.Board_OpenDashboard();
		MF.Board_OpenInhomeEstimateTab();
		driver.wait(driver.findElement(By.xpath('//td[contains(text(), "' + V.boardNumbers.Id + '")]')).getText().then(function (text) {
			V.InhomeDashboard = SF.cleanPrice(text);
			VD.IWant(VD.ToEqual, V.InhomeDashboard, V.boardNumbers.Id, 'реквеста нет в табе Inhome Estimate на дашборде')
		}), config.timeout);
		MF.Board_LogoutAdmin();
	}

	function AccountLocalDetails() {
	    MF.Account_ClickDetails();
		SF.select(By.xpath('//select[@id="current_door_to_parking"]'), 60);
		SF.select(By.xpath('//select[@id="new_door_to_parking"]'), 60);
		SF.select(By.xpath('//select[@id="current_parking_permit"]'), "PDW");
		SF.select(By.xpath('//select[@id="new_parking_permit"]'), "PDW");
		driver.executeScript("$('select#new_parking_permit').get(0).scrollIntoView();");
		MF.Account_ClickSaveDetails();
	}

	function AccountLoadingDetails() {
        MF.Account_ClickDetails();
		SF.select(By.xpath('//select[@id="current_door_to_parking"]'), 60);
		SF.select(By.xpath('//select[@id="current_parking_permit"]'), "PDW");
		MF.Account_ClickSaveDetails();
	}

	function AccountUnLoadingDetails() {
        MF.Account_ClickDetails();
		SF.select(By.xpath('//select[@id="new_door_to_parking"]'), 60);
		SF.select(By.xpath('//select[@id="new_parking_permit"]'), "PDW");
        MF.Account_ClickSaveDetails();
	}
    function Account_LongDistanceDetailsAdd() {
        MF.Account_ClickDetails();
        SF.select(By.xpath('//select[@id="current_door_to_parking"]'), 60);
        SF.select(By.xpath('//select[@id="new_door_to_parking"]'), 60);
        SF.select(By.xpath('//select[@id="current_parking_permit"]'), "PDW");
        SF.select(By.xpath('//select[@id="new_parking_permit"]'), "PDW");
        driver.executeScript("$('select#new_parking_permit').get(0).scrollIntoView();");
        SF.click(By.xpath('//div[@ng-blur="details_change(\'Additional Comments\',details.addcomment, \'addcomment\')"]'));
        MF.Account_ClickSaveDetails();
    }
	function Account_CheckSignature() {
		MF.Account_ClickViewConfirmationPage();
		MF.Account_CheckSignOnConfirmationPage();
		MF.Account_ConfirmationBackToRequest();
	}

	function RememberAccountNumbers(accountNumbers) {
		SF.sleep(2.5);
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
		SF.sleep(1);
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
		SF.sleep(1);
		SF.click(By.xpath('//a[@ng-click="vm.Logout()"]'));
		SF.waitForVisible(By.xpath('//form[@ng-submit="login()"]'));
		SF.sleep(1);
	}

	function LogoutFromBoardForeman() {
		MF.WaitWhileToaster();
		JS.scroll('li.dropdown.profile:visible');
		SF.click(By.xpath('//li[contains(@class,"dropdown") and contains(@class,"profile")]/a[contains(@class,"dropdown-toggle")]'));
		SF.sleep(1);
		SF.click(By.xpath('//a[@ng-click="vm.Logout()"]'));
		SF.waitForVisible(By.xpath('//form[@ng-submit="login()"]'));
		SF.sleep(1);
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
		MF.WaitWhileBusy();
	}

    function CreateOvernightFromBoard(client) {
        MF.WaitWhileBusy();
        MF.Board_ClickCreate();
        MF.CreateRequest_SelectServiceType(6);
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
        SF.send(By.id("edit-zip-code-from"), client.zipFrom == undefined ? "01101" : client.zipFrom);
        SF.send(By.id("edit-zip-code-to"), client.zipTo == undefined ? "01102" : client.zipTo);
        SF.sleep(3);
        MF.CreateRequest_ClickCalculate();
        MF.CreateRequest_ClickContinue();
        MF.CreateRequest_SendClientInfo(client);
        MF.CreateRequest_ClickCreate();
    }

	function CreateLocalMovingFromBoard(client) {
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
		SF.sleep(3);
		MF.CreateRequest_ClickCalculate();
		MF.CreateRequest_ClickContinue();
		MF.CreateRequest_SendClientInfo(client);
		MF.CreateRequest_ClickCreate();
	}

	function CreateFlatRateFromBoard(client) {
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
		SF.sleep(3);
		MF.CreateRequest_ClickCalculate();
		MF.CreateRequest_ClickContinue();
		MF.CreateRequest_SendClientInfo(client);
		MF.CreateRequest_ClickCreate();
	}
	function CreateLongDistanceFromBoardWithCommercialMoveSizeAndStairs() {
        MF.Board_ClickCreate();
        MF.CreateRequest_ClickMoveDateInput();
        V.request = {};
        driver.wait(driver.executeScript(JSstep.Click4DaysCalendar).then(function (calDate) {
            V.request.moveDate = calDate;
        }),config.timeout);
        SF.sleep(0.5);
        MF.CreateRequest_SelectCommercialMove();
        MF.CreateRequest_SelectStairsToFrom();
        MF.CreateRequest_SendZipToZipFrom ('02032', '90001');
        MF.CreateRequest_ClickCalculate();
        MF.CreateRequest_ClickContinue();
        MF.CreateRequest_SendClientInfo(V.client);
        MF.CreateRequest_ClickCreate();
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
		SF.sleep(3);
		MF.CreateRequest_ClickCalculate();
		MF.CreateRequest_ClickContinue();
		MF.CreateRequest_SendClientInfo(client);
		MF.CreateRequest_ClickCreate();
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
		SF.sleep(3);
		MF.CreateRequest_ClickCalculate();
		MF.CreateRequest_ClickContinue();
		MF.CreateRequest_SendClientInfo(client);
		MF.CreateRequest_ClickCreate();
	}

	function RememberDigitsRequestBoard_Up(boardNumbers) {
		driver.wait(driver.findElement(By.xpath('//input[@ng-click="openCalendar()"]')).getAttribute("value").then(function (dateString) {
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
	function Validation_Compare_Account_Admin_WhenSetNewRate(boardNumbers, accountNumbers) {
        VD.IWant (VD.ToEqual, boardNumbers.TotalMin, accountNumbers.TotalMin, 'не совпала квота изменения на  реквест/аккаунт');
        VD.IWant (VD.ToEqual, boardNumbers.TotalMax, accountNumbers.TotalMax, 'не совпала квота  изменения на  реквест/аккаунт');
        VD.IWant(VD.ToEqual, boardNumbers.TravelTime,accountNumbers.TravelTime,'не совпал трэвел тайм изменения на реквест/аккаунт');
        VD.IWant(VD.ToEqual, boardNumbers.Packing , accountNumbers.Packing,'не совпал пэкинг изменения на реквест/аккаунт');
        VD.IWant(VD.ToEqual, boardNumbers.Fuel, accountNumbers.Fuel,'не совпал фюел изменения на  реквест/аккаунт');
        VD.IWant(VD.ToEqual, boardNumbers.NewHourlyRate, accountNumbers.HourlyRate,'не совпал рейт  изменения на  реквест/аккаунт');
        VD.IWant(VD.ToEqual, boardNumbers.Trucks, accountNumbers.Trucks,'не совпало количество траков  изменения на  реквест/аккаунт');
        VD.IWant(VD.ToEqual, boardNumbers.AdServices, accountNumbers.AdServices,'не совпали сервисы  изменения на реквест/аккаунт');
        VD.IWant(VD.ToEqual, boardNumbers.CrewSize, accountNumbers.CrewSize,'не совпал крюсайз  изменения на  реквест/аккаунт');
        VD.IWant(VD.ToEqual, boardNumbers.cbf, accountNumbers.cbf,'не совпали кубикфиты изменения на реквест/аккаунт');
    }
    function Validation_Compare_Admin_HomePortal(boardNumbers, homeestimateNumbers) {
        VD.IWant(VD.ToEqual, boardNumbers.Duration, homeestimateNumbers.DurationPortal, 'не совпал отрезок времени работы хоум эстимейтора на мувборде/ портале');
        VD.IWant (VD.ToEqual, boardNumbers.TotalMin, homeestimateNumbers.TotalMin, 'не совпала минимальная квота на мувборде/ в портале');
        VD.IWant (VD.ToEqual, boardNumbers.TotalMax, homeestimateNumbers.TotalMax, 'не совпала максимальная квота на мувборде/ в портале ');
        VD.IWant(VD.ToEqual, boardNumbers.TravelTime, homeestimateNumbers.TravelTime,'не совпал трэвел тайм на мувборде / в портале');
        VD.IWant(VD.ToEqual, boardNumbers.Packing , homeestimateNumbers.Packing,'не совпал пэкинг на мувборде/ в портале');
        VD.IWant(VD.ToEqual, boardNumbers.Fuel, homeestimateNumbers.Fuel,'не совпал фюел на мувборде/ в портале');
        VD.IWant(VD.ToEqual, boardNumbers.HourlyRate, homeestimateNumbers.HourlyRate,'не совпал рейт на мувборде / в портале');
        VD.IWant(VD.ToEqual, boardNumbers.Trucks, homeestimateNumbers.Trucks,'не совпало количество траков на мувборде/ в портале');
        VD.IWant(VD.ToEqual, boardNumbers.AdServices, homeestimateNumbers.AdServices,'не совпали адишинал сервисы на мувборде/ в портале');
        VD.IWant(VD.ToEqual, boardNumbers.CrewSize, homeestimateNumbers.CrewSize,'не совпал крюсайз на мувборде/ в портале');
        VD.IWant(VD.ToEqual, boardNumbers.cbf, homeestimateNumbers.cbf,'не совпали кубикфиты на мувборде/ в портале');
    }
    function Validation_Compare_CarrierInfo(carrierNew, carrierNew2, carrierNew3) {
        VD.IWant(VD.NotToEqual,carrierNew.name, carrierNew2.name,'Поля совпадают');
        VD.IWant(VD.NotToEqual,carrierNew.contactPerson, carrierNew2.contactPerson,'Поля совпадают');
        VD.IWant(VD.NotToEqual,carrierNew.contactPersonPhone, carrierNew2.contactPersonPhone,'Поля совпадают');
        VD.IWant(VD.NotToEqual,carrierNew.address, carrierNew2.address,'Поля совпадают');
        VD.IWant(VD.NotToEqual,carrierNew.zipCode, carrierNew2.zipCode,'Поля совпадают');
        VD.IWant(VD.NotToEqual,carrierNew.perCf, carrierNew2.perCf,'Поля совпадают');
        VD.IWant(VD.NotToEqual,carrierNew.iccMc, carrierNew2.iccMc,'Поля совпадают');
        VD.IWant(VD.NotToEqual,carrierNew.usdot, carrierNew2.usdot,'Поля совпадают');
        VD.IWant(VD.NotToEqual,carrierNew.eMail, carrierNew2.eMail,'Поля совпадают');
        VD.IWant(VD.NotToEqual,carrierNew.webSite, carrierNew2.webSite,'Поля совпадают');
        VD.IWant(VD.NotToEqual,carrierNew.phoneNumber1, carrierNew2.phoneNumber1,'Поля совпадают');
        VD.IWant(VD.ToEqual,carrierNew3.name, carrierNew2.name,'Поля не совпадают');
        VD.IWant(VD.ToEqual,carrierNew3.contactPerson, carrierNew2.contactPerson,'Поля не совпадают');
        VD.IWant(VD.ToEqual,-SF.cleanPrice(carrierNew3.contactPersonPhone), carrierNew2.contactPersonPhone,'Поля не совпадают');
        VD.IWant(VD.ToEqual,carrierNew3.address, carrierNew2.address,'Поля не совпадают');
        VD.IWant(VD.ToEqual,carrierNew3.zipCode, carrierNew2.zipCode,'Поля не совпадают');
        VD.IWant(VD.ToEqual,carrierNew3.perCf, carrierNew2.perCf,'Поля не совпадают');
        VD.IWant(VD.ToEqual,carrierNew3.iccMc, carrierNew2.iccMc,'Поля не совпадают');
        VD.IWant(VD.ToEqual,carrierNew3.usdot, carrierNew2.usdot,'Поля не совпадают');
        VD.IWant(VD.ToEqual,carrierNew3.eMail, carrierNew2.eMail,'Поля не совпадают');
        VD.IWant(VD.ToEqual,carrierNew3.webSite, carrierNew2.webSite,'Поля не совпадают');
        VD.IWant(VD.ToEqual,-SF.cleanPrice(carrierNew3.phoneNumber1), carrierNew2.phoneNumber1,'Поля не совпадают');
    }
    function Validation_Compare_SITstorageInfo(storage1, storage2, storage3) {
        VD.IWant(VD.NotToEqual,storage1.name, storage2.name,'Поля совпадают');
        VD.IWant(VD.NotToEqual,storage1.address, storage2.address,'Поля совпадают');
        VD.IWant(VD.NotToEqual,storage1.zip, storage2.zip,'Поля совпадают');
        VD.IWant(VD.NotToEqual,storage1.email, storage2.email,'Поля совпадают');
        VD.IWant(VD.NotToEqual,storage1.notes, storage2.notes,'Поля совпадают');
        VD.IWant(VD.NotToEqual,storage1.phone, storage2.phone,'Поля совпадают');
        VD.IWant(VD.ToEqual,storage3.name, storage2.name,'Поля не совпадают');
        VD.IWant(VD.ToEqual,storage3.address, storage2.address,'Поля не совпадают');
        VD.IWant(VD.ToEqual,storage3.zip, storage2.zip,'Поля не совпадают');
        VD.IWant(VD.ToEqual,storage3.email, storage2.email,'Поля не совпадают');
        VD.IWant(VD.ToEqual,storage3.notes, storage2.notes,'Поля не совпадают');
        VD.IWant(VD.ToEqual,-SF.cleanPrice(storage3.phone), storage2.phone,'Поля не совпадают');
    }
    function RememberAndCompare_Admin_ConfirmationPage_LongDistance(boardNumbers) {
        driver.wait(driver.findElement(By.xpath('//h2[contains(text(),"Grand Total")]/following-sibling::span')).getText().then(function(text){
            text = SF.cleanPrice(text.substring(text.indexOf('$')));
            VD.IWant(VD.ToEqual, text,boardNumbers.Total, 'не совпал Total на Confirmation Page с Total в дашборде');
        }),config.timeout);
        driver.wait(driver.findElement(By.xpath('//span[@ng-if="!!vm.longDistanceServicesTotal"]')).getText().then(function (text) {
            text = SF.cleanPrice(text.substring(text.indexOf('$')));
            VD.IWant(VD.ToEqual, text,boardNumbers.AdServices, 'не совпал AddServices на Confirmation Page с AddServices в дашборде');
        }),config.timeout);
        driver.wait(driver.findElement(By.xpath('//span[@ng-if="!!vm.fuelSurcharge"]')).getText().then(function (text) {
            text = SF.cleanPrice(text.substring(text.indexOf('$')));
            VD.IWant(VD.ToEqual, text, boardNumbers.Fuel, 'не совпал Fuel на Confirmation Page с Fuel в дашборде');
        }),config.timeout);
        driver.wait(driver.findElement(By.xpath('//span[@ng-if="!!vm.longDistanceQuote"]')).getText().then(function (text) {
            text = SF.cleanPrice(text.substring(text.indexOf('$')));
            VD.IWant(VD.ToEqual, text, boardNumbers.Quote, 'не совпал Quote на Confirmation Page c Quote в дашборде');
        }),config.timeout);
    }
    function CheckCrewInCrewPreview(boardNumbers, crewForemanName, firstHelperName, secondHelperName) {
    driver.wait(driver.findElement(By.xpath('//div[contains(@job-id,"'+ boardNumbers +'")]/div/div[1]/span[@class="crew-preview__user-name"]')).getText().then(function(text){
        VD.IWant(VD.ToEqual, text,  crewForemanName, 'Фореман не отображается или отображается неправильно в крю первью диспача');
    }),config.timeout);
    SF.click(By.xpath('//div[contains(@job-id,"'+ boardNumbers +'")]/div/div[1]/span[@class="crew-preview__user-name"]'));
    driver.wait(driver.findElement(By.xpath('//div[contains(@job-id,"'+ boardNumbers +'")]/div/div[2]/span[@class="crew-preview__row__additional__text"]')).getText().then(function(text){
        VD.IWant(VD.ToEqual, text,   firstHelperName, 'Хелпер №1 не отображается или отображается неправильно в крю первью диспача');
    }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//div[contains(@job-id,"'+ boardNumbers +'")]/div/div[3]/span[@class="crew-preview__row__additional__text"]')).getText().then(function(text){
        VD.IWant(VD.ToEqual, text,   secondHelperName, 'Хелпер №2 не отображается или отображается неправильно в крю первью диспача');
    }),config.timeout);
    }
    function CheckDisabledCrewInWorkWithSameStartTime(crewForemanName, firstHelperName, secondHelperName, crewName) {
    driver.wait(driver.findElement(By.xpath('//select[@ng-model="vm.data.foreman"]//option[contains(text(),"'+crewForemanName+'") and @ng-selected="user.uid == vm.data.foreman"]')).getAttribute('aria-disabled').then(function(text){
        VD.IWant(VD.ToEqual, text, 'true','Не сработала проверка по времени. Не дисейблед фореман занятый на другой работе в этот старт тайм');
    }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//label[contains(text(),"Helper No. 2")]/following-sibling::select/optgroup/option[contains(text(),"'+crewForemanName+'") ' +
		'and @ng-init="oldValue = worker"]')).getAttribute('aria-disabled').then(function(text){
        VD.IWant(VD.ToEqual, text, 'true','Не сработала проверка по времени. В селект листе для хелпера №1 не дисейблед фореман занятый на другой работе в этот старт тайм');
    }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//label[contains(text(),"Helper No. 3")]/following-sibling::select/optgroup/option[contains(text(),"'+crewForemanName+'") ' +
		'and @ng-init="oldValue = worker"]')).getAttribute('aria-disabled').then(function(text){
        VD.IWant(VD.ToEqual, text, 'true','Не сработала проверка по времени. В селект листе для хелпера №2 не дисейблед фореман занятый на другой работе в этот старт тайм');
    }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//label[contains(text(),"Helper No. 3")]/following-sibling::select/optgroup/option[contains(text(),"'+firstHelperName+'")' +
		' and @ng-init="oldValue = worker"]')).getAttribute('aria-disabled').then(function(text){
        VD.IWant(VD.ToEqual, text, 'true','Не сработала проверка по времени. Не дисейблед хелпер №1 занятый на другой работе в этот старт тайм');
    }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//label[contains(text(),"Helper No. 2")]/following-sibling::select/optgroup/option[contains(text(),"'+firstHelperName+'")' +
		' and @ng-init="oldValue = worker"]')).getAttribute('aria-disabled').then(function(text){
        VD.IWant(VD.ToEqual, text, 'true','Не сработала проверка по времени. В селект листе для хелпера №2 не дисейблед хелпер №1 занятый на другой работе в этот старт тайм');
    }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//label[contains(text(),"Helper No. 3")]/following-sibling::select/optgroup/option[contains(text(),"'+secondHelperName+'") ' +
		'and @ng-init="oldValue = worker"]')).getAttribute('aria-disabled').then(function(text){
        VD.IWant(VD.ToEqual, text, 'true','Не сработала проверка по времени. Не дисейблед хелпер №1 занятый на другой работе в этот старт тайм');
    }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//label[contains(text(),"Helper No. 2")]/following-sibling::select/optgroup/option[contains(text(),"'+secondHelperName+'") ' +
		'and @ng-init="oldValue = worker"]')).getAttribute('aria-disabled').then(function(text){
        VD.IWant(VD.ToEqual, text, 'true','Не сработала проверка по времени. В селект листе для хелпера №1 не дисейблед хелпер №2 занятый на другой работе в этот старт тайм');
    }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//select[@ng-model="vm.data.crew"]//option[@label="'+ crewName +'"]')).getAttribute('disabled').then(function(text){
        VD.IWant(VD.ToEqual, text, 'true','Не сработала проверка по времени. Крю, занятая на другой работе, не дисейблед');
    }),config.timeout);
    }
    function CheckDisabledCrewInSameWork(crewForemanName, firstHelperName, secondHelperName) {
         driver.wait(driver.findElement(By.xpath('//select[@ng-model="vm.data.foreman"]//option[contains(text(),"'+crewForemanName+'") ' +
			 'and @selected="selected"]')).getAttribute('aria-disabled').then(function(text){
           VD.IWant(VD.ToEqual, text, 'true','Назначен неправильный крю фореман или он не дисейблед');
       }),config.timeout);
        driver.wait(driver.findElement(By.xpath('//label[contains(text(),"Helper No. 2")]/following-sibling::select/optgroup/option[contains(text(),"'+crewForemanName+'") ' +
			'and @ng-init="oldValue = worker"]')).getAttribute('aria-disabled').then(function(text){
           VD.IWant(VD.ToEqual, text, 'true','Назначеный в крю фореман не дисейблед в селект листе хелпера №2');
       }),config.timeout);
        driver.wait(driver.findElement(By.xpath('//label[contains(text(),"Helper No. 3")]/following-sibling::select/optgroup/option[contains(text(),"'+crewForemanName+'")' +
			' and @ng-init="oldValue = worker"]')).getAttribute('aria-disabled').then(function(text){
           VD.IWant(VD.ToEqual, text, 'true','Назначеный в крю фореман не дисейблед в селект листе хелпера №2');
       }),config.timeout);
        driver.wait(driver.findElement(By.xpath('//select[@ng-model="vm.data.baseCrew.helpers[$index]"]//optgroup[@label=" Helper"]//option[contains(text(),"'+firstHelperName+'")' +
			' and @selected="selected"]')).getAttribute('aria-disabled').then(function(text){
           VD.IWant(VD.ToEqual, text, 'true','Назначен неправильный крю хелпер (первый) или он не дисейблед');
       }),config.timeout);
       driver.wait(driver.findElement(By.xpath('//label[contains(text(),"Helper No. 3")]/following-sibling::select/optgroup/option[contains(text(),"'+firstHelperName+'") ' +
		   'and @ng-init="oldValue = worker"]')).getAttribute('aria-disabled').then(function(text){
            VD.IWant(VD.ToEqual, text, 'true','Назначеный в крю хелпер №1 не дисейблед в селект листе хелпера №2');
       }),config.timeout);
       driver.wait(driver.findElement(By.xpath('//label[contains(text(),"Helper No. 3")]/following-sibling::select/optgroup/option[contains(text(),"'+secondHelperName+'") ' +
		   'and @ng-init="oldValue = worker"]')).getAttribute('aria-disabled').then(function(text){
           VD.IWant(VD.ToEqual, text, 'true','Назначен неправильный крю хелпер (первый) или он не дисейблед');
       }),config.timeout);
       driver.wait(driver.findElement(By.xpath('//label[contains(text(),"Helper No. 2")]/following-sibling::select/optgroup/option[contains(text(),"'+secondHelperName+'") ' +
		   'and @ng-init="oldValue = worker"]')).getAttribute('aria-disabled').then(function(text){
           VD.IWant(VD.ToEqual, text, 'true','Назначеный в крю хелпер №2 не дисейблед в селект листе хелпера №1');
       }),config.timeout);
    }

    function CheckWorkersInAdCrew(crewForemanName, firstHelperName, secondHelperName) {
    SF.sleep(1.5);
    SF.click(By.xpath('//li[@ng-click="vm.addCrew()"]'));
    driver.wait(driver.executeScript("return $('li[ng-click=\"vm.data.active = $index + 1\"]').length").then(function (text) {
        VD.IWant(VD.ToEqual, text, 1, 'Нет блока Crew 2 после нажатия на Add Crew в диспаче');
    }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//select[@ng-change="vm.setWorker(crew.helpers[$index], oldValue)"]//optgroup[@label="Foreman"]//option[contains(text(),"'+crewForemanName+'")' +
		' and @ng-selected="helper.uid == addHelper"]')).getAttribute('aria-disabled').then(function(text){
        VD.IWant(VD.ToEqual, text, 'true','Фореман с основной команды не дисейблед в адишенал крю');
    }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//select[@ng-change="vm.setWorker(crew.helpers[$index], oldValue)"]//optgroup[@label=" Helper"]//option[contains(text(),"'+firstHelperName+'")' +
		' and @ng-selected="helper.uid == addHelper"]')).getAttribute('aria-disabled').then(function(text){
        VD.IWant(VD.ToEqual, text, 'true','Хелпер №1 с основной команды не дисейблед в адишенал крю');
    }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//select[@ng-change="vm.setWorker(crew.helpers[$index], oldValue)"]//optgroup[@label=" Helper"]//option[contains(text(),"'+secondHelperName+'")' +
		' and @ng-selected="helper.uid == addHelper"]')).getAttribute('aria-disabled').then(function(text){
        VD.IWant(VD.ToEqual, text, 'true','Хелпер №2 с основной команды не дисейблед в адишенал крю');
    }),config.timeout);
    SF.click(By.xpath('//a[@ng-click="vm.removeCrew($index)"]'));
    driver.wait(driver.executeScript("return $('li[ng-click=\"vm.data.active = $index + 1\"]').length").then(function (text) {
        VD.IWant(VD.ToEqual, text, 0, 'Не удаляется блок Crew 2 после нажатия на иконку remove');
    }),config.timeout);
    }

    function CheckWorkersInAddNewWorkerList(crewForemanName, firstHelperName, secondHelperName) {
    SF.sleep(1);
    JS.scroll('button[ng-click=\"vm.assignTeam()\"]');
    SF.click(By.xpath("//button[@ng-click='vm.addWorker()']"));
    driver.wait(driver.findElement(By.xpath('//label[contains(text(),"Helper No. 4")]/following-sibling::select/optgroup/option[contains(text(),"'+crewForemanName+'")' +
		' and @ng-init="oldValue = worker"]')).getAttribute('aria-disabled').then(function(text){
        VD.IWant(VD.ToEqual, text, 'true','Крю фореман не дисейблед в селект листе нового работника (добавлен через знак +)');
    }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//label[contains(text(),"Helper No. 4")]/following-sibling::select/optgroup/option[contains(text(),"'+firstHelperName+'") ' +
		'and @ng-init="oldValue = worker"]')).getAttribute('aria-disabled').then(function(text){
        VD.IWant(VD.ToEqual, text, 'true','Крю хелпер №1 не дисейблед в селект листе нового работника (добавлен через знак +)');
    }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//label[contains(text(),"Helper No. 4")]/following-sibling::select/optgroup/option[contains(text(),"'+secondHelperName+'") ' +
		'and @ng-init="oldValue = worker"]')).getAttribute('aria-disabled').then(function(text){
        VD.IWant(VD.ToEqual, text, 'true','Крю хелпер №2 не дисейблед в селект листе нового работника (добавлен через знак +)');
    }),config.timeout);
    SF.click(By.xpath("//button[@ng-click='vm.deleteWorker()']"));
    SF.sleep(5);
    driver.wait(driver.executeScript("return $('div label:contains(\"Helper No. 4\")').length").then(function (check) {
        VD.IWant (VD.ToEqual, check, 0, 'Не работает кнопка Delete worker в диспаче');
    }),config.timeout);
    }

function SetManager(name) {
		JS.click('div[ng-show="::showManagerDropdown(currentManager.first_name)"] button');
		SF.click(By.xpath('//a[@ng-click="setManager(manager.uid)"][contains(text(),"' + name + '")]'));
		MF.SweetConfirm();
		SF.sleep(1);
		MF.WaitWhileToaster();
	}

	function SetClientPasswd(passwd) {
		SF.sleep(1);
		SF.send(By.xpath('//input[@ng-model="client.password"]'), passwd);
		MF.Account_ClickUpdateClientInModalWindow();
        SF.sleep(1);
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
        MF.Account_ClickProceedBookYourMove();
        JS.waitForExist('div.confirm');
        JS.scroll('div.confirm');
        MF.Account_ClickIAgreeWithAll();
		SF.click(By.id('paybutton'));
		MF.SweetConfirm();
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
		MF.Account_ClickUpdateClientInModalWindow();
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
    function ConfirmRequestInAccount_AfterReservationFromBoard() {
        MF.Account_ClickProceedBookYourMove();
        JS.waitForExist('div.confirm');
        JS.scroll('div.confirm');
        MF.Account_ClickIAgreeWithAll();
        MF.Account_ClickConfirmReservationAfterCharge();
        MakeSignJS('signatureCanvasReserv');
        SF.click(By.xpath('//button[@ng-click="saveReservSignature();logClickButtons(\'Save reservation sign button clicked\')"]'));
        MF.WaitWhileSpinner();
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
		driver.wait(driver.executeScript("if($('input[ng-model=\"request.permissions.canSeeScheduleMenu\"]').hasClass('ng-empty')){" +
			"return true;}else{$('input[ng-model=\"request.permissions.canSeeScheduleMenu\"]').parent().click()}"));
		driver.wait(driver.executeScript("if($('input[ng-model=\"request.permissions.canSeeDispatchMenu\"]').hasClass('ng-empty')){" +
			"return true;}else{$('input[ng-model=\"request.permissions.canSeeDispatchMenu\"]').parent().click()}"));
	}
    function AdminPermissionsTurnOn() {
        driver.wait(driver.executeScript("if($('input[ng-model=\"request.permissions.canSeeSettingsMenu\"]').hasClass('ng-not-empty')){" +
            "return true;}else{$('input[ng-model=\"request.permissions.canSeeSettingsMenu\"]').parent().click()}"));
        driver.wait(driver.executeScript("if($('input[ng-model=\"request.permissions.canSeeStatisticsMenu\"]').hasClass('ng-not-empty')){" +
            "return true;}else{$('input[ng-model=\"request.permissions.canSeeStatisticsMenu\"]').parent().click()}"));
        driver.wait(driver.executeScript("if($('input[ng-model=\"request.permissions.canSeeStorageMenu\"]').hasClass('ng-not-empty')){" +
            "return true;}else{$('input[ng-model=\"request.permissions.canSeeStorageMenu\"]').parent().click()}"));
        driver.wait(driver.executeScript("if($('input[ng-model=\"request.permissions.canSeeLongDistanceMenu\"]').hasClass('ng-not-empty')){" +
            "return true;}else{$('input[ng-model=\"request.permissions.canSeeLongDistanceMenu\"]').parent().click()}"));
        driver.wait(driver.executeScript("if($('input[ng-model=\"request.permissions.canSeeScheduleMenu\"]').hasClass('ng-not-empty')){" +
            "return true;}else{$('input[ng-model=\"request.permissions.canSeeScheduleMenu\"]').parent().click()}"));
        driver.wait(driver.executeScript("if($('input[ng-model=\"request.permissions.canSeeDispatchMenu\"]').hasClass('ng-not-empty')){" +
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
		// JS.waitForNotExist('div.toast-message:visible');
		// JS.waitForNotExist('div.visible-overflow');
		JS.waitForNotExist('div.toast-message:visible');
		JS.waitForNotExist('div.toast-success:visible');
        JS.waitForNotExist('.busyoverlay:visible, inhome-estimate-request-loading:visible');
        SF.click(By.xpath('//button[@ng-click="cancel()"]'));
		SF.sleep(1);
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
		SF.sleep(1);
		MF.WaitWhileBusy();
		driver.wait(driver.findElement(By.xpath('//td[contains(text(),"' + request + '")]')).click(), config.timeout);
		driver.wait(driver.findElement(By.xpath('//td[contains(text(),"' + request + '")]')).click(), config.timeout);
	}

	function selectCrew(ForemanName) {
		SF.click(By.xpath("//select[@ng-model='vm.data.foreman']"));
		SF.click(By.xpath("//select[@ng-model='vm.data.foreman']/option[contains(text(),'" + ForemanName + "')]"));
		SF.click(By.xpath("//label[contains(text(),'Helper No. 2')]/following-sibling::select[@ng-model='vm.data.baseCrew.helpers[$index]']"));
		SF.click(By.xpath("//label[contains(text(),'Helper No. 2')]/following-sibling::select[@ng-model='vm.data.baseCrew.helpers[$index]']//option[contains(text(),'Test Helper1')]"));
		JS.scroll('button[ng-click="vm.openFullView();"]');
		driver.wait(
			driver.findElements(By.xpath("//label[contains(text(),'Helper No. 3')]/following-sibling::select[@ng-model='vm.data.baseCrew.helpers[$index]']")).then(function (count) {
				if (count.length > 0) {
					driver.wait(driver.findElement(By.xpath("//label[contains(text(),'Helper No. 3')]/following-sibling::select[@ng-model='vm.data.baseCrew.helpers[$index]']")).click());
					driver.wait(driver.findElement(By.xpath("//label[contains(text(),'Helper No. 3')]/following-sibling::select[@ng-model='vm.data.baseCrew.helpers[$index]']" +
						"//option[contains(text(),'Test Helper2')]")).click());
				}
			}), config.timeout);
		// JS.click('button[ng-click="vm.assignTeam()"]');
        SF.sleep(1.5);
		driver.wait(
			driver.findElements(By.xpath("//label[contains(text(),'Helper No. 4')]/following-sibling::select[@ng-model='vm.data.baseCrew.helpers[$index]']")).then(function (count) {
				if (count.length > 0) {
					driver.wait(driver.findElement(By.xpath("//label[contains(text(),'Helper No. 4')]/following-sibling::select[@ng-model='vm.data.baseCrew.helpers[$index]']")).click());
                    driver.wait(driver.findElement(By.xpath("//label[contains(text(),'Helper No. 4')]/following-sibling::select[@ng-model='vm.data.baseCrew.helpers[$index]']" +
						"//option[contains(text(),'Test Helper3')]")).click());
				}
			}), config.timeout);
        SF.sleep(0.5);
        // JS.scroll('button[ng-click=\"vm.assignTeam()\"]');
        // SF.sleep(1.5);
        driver.wait(
            driver.findElements(By.xpath("//label[contains(text(),'Helper No. 5')]/following-sibling::select[@ng-model='vm.data.baseCrew.helpers[$index]']")).then(function (count) {
                if (count.length > 0) {
                    driver.wait(driver.findElement(By.xpath("//label[contains(text(),'Helper No. 5')]/following-sibling::select[@ng-model='vm.data.baseCrew.helpers[$index]']")).click());
                    driver.wait(driver.findElement(By.xpath("//label[contains(text(),'Helper No. 5')]/following-sibling::select[@ng-model='vm.data.baseCrew.helpers[$index]']" +
                        "//option[contains(text(),'Test Helper4')]")).click());
                }
            }), config.timeout);
		JS.scroll('button[ng-click=\"vm.assignTeam()\"]');
		SF.sleep(1);
        JS.click('button[ng-click="vm.assignTeam()"]');
        JS.waitForExist('div.toast-success');
		MF.WaitWhileToaster();
	}
    function createNewTeam(crewForemanName, firstHelperName, secondHelperName, crewName) {
        JS.click('img[ng-click=\\"vm.openCrewModal()\\"]');
        SF.waitForVisible (By.xpath('//button[@ng-click="saveAllCrews()"]'));
        SF.sleep(1);
        SF.click(By.xpath('//div[@ng-click="addCrew()"]'));
        SF.waitForVisible (By.xpath('//div[@class="crew-modal__body-crew-control crews-tab"]'));
        SF.click(By.xpath('//select[@ng-model="activeCrew.foreman.uid"]//option[@label="'+ crewForemanName +'"]'));
        SF.click(By.xpath('//oi-select[@ng-model="activeCrew.helpers"]'));
        SF.click(By.xpath('//div[@class="select-dropdown"]/ul/li[contains(text(), "'+ firstHelperName +'")]'));
        SF.click(By.xpath('//oi-select[@ng-model="activeCrew.helpers"]'));
        SF.click(By.xpath('//div[@class="select-dropdown"]/ul/li[contains(text(), "'+ secondHelperName +'")]'));
        driver.actions().mouseMove(driver.findElement(By.xpath('//span[@class="crew-modal__crew-name"][contains(text(), "'+ crewForemanName +'")]'))).doubleClick().perform();
        SF.click(By.xpath('//div[@class="crew-modal__crew-button editable-crew"]'));
        SF.clear(By.xpath('//div[@class="crew-modal__crew-button editable-crew"]//input[@ng-change="changeCrewTitle(crew)"]'));
        SF.send(By.xpath('//div[@class="crew-modal__crew-button editable-crew"]//input[@ng-change="changeCrewTitle(crew)"]'), crewName);
        SF.sleep(1);
        SF.click(By.xpath('//button[@ng-click="saveAllCrews()"]'));
        MF.WaitWhileBusy();
        SF.click(By.xpath('//button[@ng-click="closeCrewManagementModal()"]'));
        SF.sleep(1);
    }
    function deleteTeam(crewName) {
        JS.click('img[ng-click=\\"vm.openCrewModal()\\"]');
        SF.waitForVisible (By.xpath('//button[@ng-click="saveAllCrews()"]'));
        SF.sleep(1);
        SF.click(By.xpath('//span[@class="crew-modal__crew-name"][contains(text(), "'+ crewName +'")]'));
        SF.click(By.xpath('//div[@class="crew-modal__crew-button editable-crew"]/i[@ng-click="removeCrew($index)"]'));
        MF.SweetConfirm();
        MF.WaitWhileBusy();
        SF.click(By.xpath('//button[@ng-click="closeCrewManagementModal()"]'));
        SF.sleep(1);
    }
    function selectNewTeam(crewName) {
        SF.click(By.xpath('//select[@ng-model="vm.data.crew"]//option[@label="'+ crewName +'"]'));
        JS.scroll('button[ng-click=\"vm.assignTeam()\"]');
        SF.sleep(1);
        JS.click('button[ng-click="vm.assignTeam()"]');
        JS.waitForExist('div.toast-success');
        MF.WaitWhileToaster();
    }
    function selectBigCrew(ForemanName) {
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
        SF.sleep(1.5);
        JS.scroll('label:contains("Helper No. 4")');
        SF.sleep(1.5);
        driver.wait(
            driver.findElements(By.xpath("//label[contains(text(),'Helper No. 4')]/following-sibling::select[@ng-model='vm.data.baseCrew.helpers[$index]']")).then(function (count) {
                if (count.length > 0) {
                    driver.wait(driver.findElement(By.xpath("//label[contains(text(),'Helper No. 4')]/following-sibling::select[@ng-model='vm.data.baseCrew.helpers[$index]']")).click());
                    driver.wait(driver.findElement(By.xpath("//label[contains(text(),'Helper No. 4')]/following-sibling::select[@ng-model='vm.data.baseCrew.helpers[$index]']" +
                        "//option[contains(text(),'Test Helper3')]")).click());
                }
            }), config.timeout);
        SF.sleep(0.5);
        driver.wait(
            driver.findElements(By.xpath("//label[contains(text(),'Helper No. 5')]/following-sibling::select[@ng-model='vm.data.baseCrew.helpers[$index]']")).then(function (count) {
                if (count.length > 0) {
                    driver.wait(driver.findElement(By.xpath("//label[contains(text(),'Helper No. 5')]/following-sibling::select[@ng-model='vm.data.baseCrew.helpers[$index]']")).click());
                    driver.wait(driver.findElement(By.xpath("//label[contains(text(),'Helper No. 5')]/following-sibling::select[@ng-model='vm.data.baseCrew.helpers[$index]']" +
                        "//option[contains(text(),'Test Helper4')]")).click());
                }
            }), config.timeout);
        JS.scroll('button[ng-click=\"vm.assignTeam()\"]');
        SF.sleep(1);
        JS.click('button[ng-click="vm.assignTeam()"]');
        JS.waitForExist('div.toast-success');
        MF.WaitWhileToaster();
    }

	function selectCrewFlatRatePickUp(ForemanName) {
		SF.click(By.xpath("//select[@ng-model='super.vm.data.pickedUpCrew.foreman']"));
		SF.click(By.xpath("//select[@ng-model='super.vm.data.pickedUpCrew.foreman']/option[contains(text(),'" + ForemanName + "')]"));
		SF.click(By.xpath("//label[contains(text(),'Helper No. 2')]/following-sibling::select[@ng-model='super.vm.data.pickedUpCrew.helpers[$index]']"));
		SF.click(By.xpath("//label[contains(text(),'Helper No. 2')]/following-sibling::select[@ng-model='super.vm.data.pickedUpCrew.helpers[$index]']//option[contains(text(),'Test Helper1')]"));
		JS.scroll('button[ng-click=\"super.vm.assignTeam(request)\"]');
		driver.wait(
			driver.findElements(By.xpath("//label[contains(text(),'Helper No. 3')]/following-sibling::select[@ng-model='super.vm.data.pickedUpCrew.helpers[$index]']")).then(function (count) {
				if (count.length > 0) {
					driver.wait(driver.findElement(By.xpath("//label[contains(text(),'Helper No. 3')]/following-sibling::select[@ng-model='super.vm.data.pickedUpCrew.helpers[$index]']")).click());
					driver.wait(driver.findElement(By.xpath("//label[contains(text(),'Helper No. 3')]/following-sibling::select[@ng-model='super.vm.data.pickedUpCrew.helpers[$index]']//option[contains(text(),'Test Helper2')]")).click());
				}
			}), config.timeout);
		// driver.wait(
		// 	driver.findElements(By.xpath("//label[contains(text(),'Helper No. 4')]/following-sibling::select[@ng-model='super.vm.data.pickedUpCrew.helpers[$index]']")).then(function (count) {
		// 		if (count.length > 0) {
		// 			driver.wait(driver.findElement(By.xpath("//label[contains(text(),'Helper No. 4')]/following-sibling::select[@ng-model='super.vm.data.pickedUpCrew.helpers[$index]']")).click());
		// 			driver.wait(driver.findElement(By.xpath("//label[contains(text(),'Helper No. 4')]/following-sibling::select[@ng-model='super.vm.data.pickedUpCrew.helpers[$index]']//option[contains(text(),'Test Helper3')]")).click());
		// 		}
		// 	}), config.timeout);
		JS.scroll('button[ng-click=\"super.vm.assignTeam(request)\"]');
		SF.sleep(2);
		SF.click(By.xpath("//button[@ng-click=\"super.vm.assignTeam(request)\"]"));
		MF.WaitWhileBusy();
		JS.waitForExist('div.toast-success');
		MF.WaitWhileToaster();
	}

	function selectCrewFlatRateDelivery() {
		SF.click(By.xpath("//select[@ng-model='super.vm.data.deliveryCrew.foreman']"));
		SF.click(By.xpath("//select[@ng-model='super.vm.data.deliveryCrew.foreman']/option[contains(text(),'FlatRate Foreman')]"));
		SF.click(By.xpath("//label[contains(text(),'Helper No. 2')]/following-sibling::select[@ng-model='super.vm.data.deliveryCrew.helpers[$index]']"));
		SF.click(By.xpath("//label[contains(text(),'Helper No. 2')]/following-sibling::select[@ng-model='super.vm.data.deliveryCrew.helpers[$index]']//option[contains(text(),'Test Helper1')]"));
		JS.scroll('button[ng-click=\"super.vm.assignTeam()\"]:visible');
		SF.sleep(1);
		driver.wait(
			driver.findElements(By.xpath("//label[contains(text(),'Helper No. 3')]/following-sibling::select[@ng-model='super.vm.data.deliveryCrew.helpers[$index]']")).then(function (count) {
				if (count.length > 0) {
					driver.wait(driver.findElement(By.xpath("//label[contains(text(),'Helper No. 3')]/following-sibling::select[@ng-model='super.vm.data.deliveryCrew.helpers[$index]']")).click());
					driver.wait(driver.findElement(By.xpath("//label[contains(text(),'Helper No. 3')]/following-sibling::select[@ng-model='super.vm.data.deliveryCrew.helpers[$index]']//option[contains(text(),'Test Helper2')]")).click());
				}
			}), config.timeout);
		// driver.wait(
		// 	driver.findElements(By.xpath("//label[contains(text(),'Helper No. 4')]/following-sibling::select[@ng-model='super.vm.data.deliveryCrew.helpers[$index]']")).then(function (count) {
		// 		if (count.length > 0) {
		// 			driver.wait(driver.findElement(By.xpath("//label[contains(text(),'Helper No. 4')]/following-sibling::select[@ng-model='super.vm.data.deliveryCrew.helpers[$index]']")).click());
		// 			driver.wait(driver.findElement(By.xpath("//label[contains(text(),'Helper No. 4')]/following-sibling::select[@ng-model='super.vm.data.deliveryCrew.helpers[$index]']//option[contains(text(),'Test Helper3')]")).click());
		// 		}
		// 	}), config.timeout);
		JS.scroll('button[ng-click=\"super.vm.assignTeam()\"]');
		SF.sleep(2);
		JS.click('button[ng-click=\\"super.vm.assignTeam()\\"]:visible');
		MF.WaitWhileBusy();
		MF.WaitWhileToaster();
	}

	function MakeSignInContract() {
		MF.WaitWhileBusy();
		SF.click(By.xpath('//local-moves[@id="main-contract"]//div[@class="empty-signature"]'));
		MakeSignJS("signatureCanvas");
		SF.click(By.xpath('//button[@ng-click="saveStep()"]'));
		SF.sleep(1);
	}
	function MakeSignInAddContract() {
        SF.click(By.xpath('//div[@class="empty-signature"]'));
        MakeSignJS("signatureCanvas");
        SF.click(By.xpath('//button[@ng-click="saveStep()"]'));
        SF.sleep(1);
    }
    function MakeSignInContractFlatRate() {
        MF.WaitWhileBusy();
        SF.click(By.xpath('//div[@id="local_moves"]//div[@class="empty-signature"]'));
        MakeSignJS("signatureCanvas");
        SF.click(By.xpath('//button[@ng-click="saveStep()"]'));
        SF.sleep(1);
    }

	function MakeSignInInventory(step) {
		SF.click(By.xpath('//div[@id="step_inventoryMoving_' + step + '"]/div[@class="empty-signature"]/..'));
		MakeSignJS("signatureInventoryCanvas");
		SF.click(By.xpath('//div[@id="signatureInventoryPad"]//button[@ng-click="saveStep()"]'));
		SF.sleep(1);
	}
	function MakeSignInAddInventory(step) {
        SF.click(By.xpath('//div[@id="step_addInventoryMoving_' + step + '"]/div[@class="empty-signature"]/..'));
        MakeSignJS("signatureAddInventoryCanvas");
        SF.click(By.xpath('//div[@id="signatureAddInventoryPad"]//button[@ng-click="saveStep()"]'));
        SF.sleep(1);
	}

	function MakeSignInRental() {
		SF.sleep(1);
		SF.click(By.xpath('//span[contains(text(),"Tenant Signature:")]/following-sibling::div[1]/div[@ng-click="openService(\'monthly_storage_fee\', 1)"]'));
		MakeSignJS("signatureCanvasService");
		SF.click(By.xpath('//button[@ng-click="saveService()"]'));
		SF.sleep(1);
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
	}
    function payRentalInventoryCash(boardNumbers) {
        SF.click(By.xpath('//button[@ng-click="openPayment()"]'));
        JS.waitForExist('input[ng-model=\\"charge_value.value\\"]');
        SF.sleep(1);
        if (boardNumbers != undefined) {
            driver.wait(driver.executeScript('return $(\'input[ng-model="charge_value.value"]\').val()').then(function (text) {
                boardNumbers.prepaid = SF.cleanPrice(text);
            }), config.timeout);
        }
        SF.click(By.xpath('//button[@ng-click="goStepTwo();"]'));
        MF.Contract_PayCash();
    }
	function RememberDateFromRequest(boardNumbers) {
		driver.wait(driver.findElement(By.xpath('//input[@ng-click="openCalendar()"]')).getAttribute("value").then(function (dateString) {
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
		SF.sleep(2);
		VD.IWant(VD.ToEqual, Math.round(boardNumbers.Payroll.managerForCommission.forCommission),
			Math.round(boardNumbers.Total
				- boardNumbers.AdServices - boardNumbers.Packing - boardNumbers.Fuel - boardNumbers.Valuation - boardNumbers.Tips - contractNumbers.CreditCardPercentSumm),
			'Не совпал ForCommission менеджера');

		driver.wait(driver.findElement(By.xpath('//label[@ng-init="calcWorkerTotal(\'salesPerson\')"]')).getText().then(function (text) {
			boardNumbers.Payroll.managerForCommission.total = SF.cleanPrice(text);
		}), config.timeout);
		SF.sleep(1);
		MF.EditRequest_PayrollOpenForemanTab();
		EditRequestPayroll_RememberForeman(V.foremanName, boardNumbers.Payroll.foremanForCommission);
		SF.sleep(2);
		MF.EditRequest_PayrollGetForemansTotal(boardNumbers.Payroll.foremanForCommission);

		VD.IWant(VD.ToEqual, Math.round(boardNumbers.Payroll.foremanForCommission.Tips.forCommission),
			Math.round(boardNumbers.Tips / boardNumbers.CrewSize),
			'Не совпал Tips формена');
		VD.IWant(VD.ToEqual, Math.round(boardNumbers.Payroll.foremanForCommission.AdServices.forCommission),
			Math.round(boardNumbers.AdServices),
			'Не совпал Extras формена');
		VD.IWant(VD.ToEqual, Math.round(boardNumbers.Payroll.foremanForCommission.Packing.forCommission),
			Math.round(boardNumbers.Packing),
			'Не совпал Packing формена');
		VD.IWant(VD.ToEqual, Math.round(boardNumbers.Payroll.foremanForCommission.fromTotal.forCommission),
			Math.round(boardNumbers.Total
				- boardNumbers.AdServices - boardNumbers.Packing - boardNumbers.Fuel - boardNumbers.Valuation - boardNumbers.Tips - contractNumbers.CreditCardPercentSumm),
			'Не совпал FromTotal формена');
		VD.IWant(VD.ToEqual, Math.round(boardNumbers.Payroll.foremanForCommission.Daily.forCommission),
			Math.round(10),
			'Не совпал Daily формена');
		VD.IWant(VD.ToEqual, Math.round(boardNumbers.Payroll.foremanForCommission.Hourly.percent),
			Math.round(10),
			'Не совпал Hourly формена');
		// VD.IWant(VD.ToEqual, Math.round(boardNumbers.Payroll.foremanForCommission.Bonus.percent),
		//     Math.round(10),
		//     'Не совпал Bonus формена');
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
		SF.sleep(1);
		driver.wait(driver.executeScript('return $(\'input[ng-model="sale.for_commission "]\').val()').then(function (text) {
			boardNumbers.Payroll.managerForCommission.office = SF.cleanPrice(text);
		}), config.timeout);
		SF.sleep(1);
		VD.IWant(VD.ToEqual, Math.round(boardNumbers.Payroll.managerForCommission.office), 5000, 'Не совпал ForCommission менеджера');

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
		VD.IWant(VD.ToEqual, Math.round(boardNumbers.Payroll.foremanForCommission.AdServices),
			Math.round(boardNumbers.AdServices),
			'Не совпал Extras формена');

		driver.wait(driver.executeScript('return ' +
			'$(\'tr:has(td>select>option[selected="selected"]:contains("Packing Commission"))>td>input[ng-model="foreman.for_commission"]\').val()'
		).then(function (text) {
			boardNumbers.Payroll.foremanForCommission.Packing = SF.cleanPrice(text);
		}), config.timeout);
		SF.sleep(1);
		VD.IWant(VD.ToEqual, Math.round(boardNumbers.Payroll.foremanForCommission.Packing),
			Math.round(boardNumbers.Packing),
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
		SF.sleep(2);

		MF.EditRequest_PayrollOpenForemanTab();
		driver.wait(driver.executeScript('return ' +
			'$(\'tr:has(td>select>option[selected="selected"]:contains("Extras Commission"))>td>input[ng-model="foreman.for_commission"]\').val()'
		).then(function (text) {
			boardNumbers.Payroll.foremanForCommission.AdServices = SF.cleanPrice(text);
		}), config.timeout);
		SF.sleep(1);
		VD.IWant(VD.ToEqual, Math.round(boardNumbers.Payroll.foremanForCommission.AdServices),
			Math.round(boardNumbers.AdServices),
			'Не совпал Extras формена');

		driver.wait(driver.executeScript('return ' +
			'$(\'tr:has(td>select>option[selected="selected"]:contains("Packing Commission"))>td>input[ng-model="foreman.for_commission"]\').val()'
		).then(function (text) {
			boardNumbers.Payroll.foremanForCommission.Packing = SF.cleanPrice(text);
		}), config.timeout);
		SF.sleep(1);
		VD.IWant(VD.ToEqual, Math.round(boardNumbers.Payroll.foremanForCommission.Packing),
			Math.round(boardNumbers.Packing),
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
		SF.sleep(2);
		VD.IWant(VD.ToEqual, V.countSales, 1, 'не сохранился Sale');
		SF.click(By.xpath('//a[@ng-click="select(tabs[1])"][contains(text(),"Foreman")]'));
		SF.sleep(1);
		driver.wait(driver.executeScript('return $(\'select[ng-model="selected.foreman[foremanIndex]"]:visible  option[selected="selected"]:contains("' + foremaName + '")\').length;')
			.then(function (count) {
				V.countForeman = count;
			}), config.timeout);
		SF.sleep(1);
		VD.IWant(VD.ToEqual, V.countForeman, 1, 'не сохранился Foreman');
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

    function CreateLocalMoveFromFrontDown(client) {
        MF.FrontSite_ClickQuoteCalculator();
        MF.FrontSite_ClickDesireMoveDate();
        V.request = {};
        driver.wait(driver.executeScript(JSstep.Click4DaysNewCalendar).then(function (MovDateFront) {
            V.request.moveDate = MovDateFront;
            console.log(V.request);
        }), config.timeout);
        SF.sleep(0.5);
        MF.FrontSiteDown_SendZipCode('02032', '02136');
        MF.FrontDown_SelectMoveSize(8);
        MF.FrontDown_SetEntrance();
        MF.FrontSite_ClickCalculate();
        MF.FrontSite_SetClientInfoDown(client);
        MF.FrontSite_SelectPreferedStartTime();
        MF.FrontSite_SelectGoogleSearch();
        MF.FrontSite_ClickGoToCalculatorResults();
    }
    function CreateLongDistanceFromFrontDown(client) {
        MF.FrontSite_ClickQuoteCalculator();
        MF.FrontSite_ClickDesireMoveDate();
        V.request = {};
        driver.wait(driver.executeScript(JSstep.Click4DaysNewCalendar).then(function (MovDateFront) {
            V.request.moveDate = MovDateFront;
            console.log(V.request);
        }), config.timeout);
        SF.sleep(0.5);
        MF.FrontSiteDown_SendZipCode('02032', '90001');
        MF.FrontDown_SelectMoveSize(8);
        MF.FrontDown_SetEntrance();
        MF.FrontSite_ClickCalculate();
        MF.FrontSite_SetClientInfoDown(client);
        MF.FrontSite_SelectPreferedStartTime();
        MF.FrontSite_SelectGoogleSearch();
        MF.FrontSite_ClickGoToCalculatorResults();
    }
	function CreateOvernightDownForm(client) {
		MF.FrontSite_ClickQuoteCalculator();
		MF.FrontSite_ClickDesireMoveDate();
		V.request = {};
		driver.wait(driver.executeScript(JSstep.Click4DaysNewCalendar).then(function (MovDateFront) {
			V.request.moveDate = MovDateFront;
		}), config.timeout);
		SF.sleep(2);
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

		condition.nowWeDoing = 'запоминаем данные с мувинг сторадж Estimated Labor и Estimated Monthly Storage';

		driver.wait(driver.findElement(By.xpath('//div[contains(@class, form_block)]/div[@ng-if="getFrontQuoteExplanation()"]' +
		    '//h3[contains(text(), "Estimated labor:")]/following-sibling::span')).getText().then(function(text){
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

    function CreatePackingDayDownForm(client) {
        MF.FrontSite_ClickQuoteCalculator();
        MF.FrontSite_ClickDesireMoveDate();
        V.request = {};
        driver.wait(driver.executeScript(JSstep.Click4DaysNewCalendar).then(function (MovDateFront) {
            V.request.moveDate = MovDateFront;
            console.log(V.request);
        }), config.timeout);
        SF.sleep(0.5);
        MF.FrontSite_SelectServiceType(8);
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
		SF.sleep(2);
	}

	function deletePendingRequest() {
		SF.select(By.xpath('//select[@id="edit-status"]'), 14);
		MF.EditRequest_SaveChanges();
		MF.WaitWhileBusy();
		closeEditRequest();
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
		SF.sleep(2.5);
		MF.WaitWhileBusy();
	}

	function addAdditionalInventoryBoard(boardNumbers) {
		SF.click(By.xpath('//ul[@class="nav nav-tabs"]//a[@ng-click="select(tabs[1])"]'));
		MF.WaitWhileBusy();
		SF.sleep(1.5);
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
		SF.sleep(3);
		MF.WaitWhileBusy();
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
		SF.sleep(1);
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
		driver.wait(driver.executeScript('return $(\'input[ng-model="agentModel.name"]\').val()').then(function (text) {
			carrierData.name = text;
		}), config.timeout);
		driver.wait(driver.executeScript('return $(\'input[ng-model="agentModel.contact_person"]\').val()').then(function (text) {
			carrierData.contactPerson = text;
		}), config.timeout);
		driver.wait(driver.executeScript('return $(\'input[ng-model="agentModel.contact_person_phone"]\').val()').then(function (text) {
			carrierData.contactPersonPhone = text;
		}), config.timeout);
		driver.wait(driver.executeScript('return $(\'textarea[ng-model="agentModel.address"]\').val()').then(function (text) {
			carrierData.address = text;
		}), config.timeout);
		driver.wait(driver.executeScript('return $(\'input[ng-model="agentModel.zip_code"]\').val()').then(function (text) {
			carrierData.zipCode = text;
		}), config.timeout);
		driver.wait(driver.executeScript('return $(\'input[ng-model="agentModel.per_cf"]\').val()').then(function (text) {
			carrierData.perCf = SF.cleanPrice(text);
		}), config.timeout);
		driver.wait(driver.executeScript('return $(\'input[ng-model="agentModel.usdot_number"]\').val()').then(function (text) {
			carrierData.usdot = text;
		}), config.timeout);
		driver.wait(driver.executeScript('return $(\'input[ng-model="agentModel.web_site"]\').val()').then(function (text) {
			carrierData.webSite = text;
		}), config.timeout);
		driver.wait(driver.executeScript('return $(\'input[ng-model="agentModel.icc_mc_number"]\').val()').then(function (text) {
			carrierData.iccMc = text;
		}), config.timeout);
		driver.wait(driver.executeScript('return $(\'input[ng-model="agentModel.email"]\').val()').then(function (text) {
			carrierData.eMail = text;
		}), config.timeout);
		driver.wait(driver.executeScript('return $(\'input[ng-model="agentModel.phones[$index]"]\').val()').then(function (text) {
			carrierData.phoneNumber1 = text;
		}), config.timeout);
		SF.sleep(1);
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
		SF.sleep(1);
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
			SF.sleep(1.5);
			SF.select(By.xpath('//tr[@ng-repeat="n in rangeArr"][' + i + ']//select[1]'), "CP");
            SF.sleep(1.5);
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
		SF.sleep(3);
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
		SF.sleep(2);
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
		driver.wait(driver.executeScript("return $('div.total-payroll-panel div.total-title:contains(\"Balance\")').next().text()").then(function (balanceTop) {
			payrollNumbersInside.balanceTop = SF.cleanPrice(balanceTop);
		}), config.timeout);
		driver.wait(driver.executeScript("return $('.mdDataTable-header-alternate td:last-child').text()").then(function (balanceDown) {
			payrollNumbersInside.balanceDown = SF.cleanPrice(balanceDown);
		}), config.timeout);
		SF.sleep(1);
	}

	function RememberPayrollNumbers_OutsideNameWorker(workerName, payrollNumbersOutside) {
		driver.wait(driver.findElement(By.xpath('//td[contains(text(), "' + workerName + '")]/following-sibling::td[@ng-show="columns.fields[\'total\'].selected"][last()]')).getText().then(function (total) {
			payrollNumbersOutside.total = SF.cleanPrice(total);
		}), config.timeout);
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
        SF.clear (By.xpath('//input[@ng-model="option.pickup"]'));
        SF.sleep (0.5);
        let now = new Date();
        let msInDay = 86400000;
        let future = new Date(now.getTime() + msInDay * 2);
        let options = { month: 'long', day: 'numeric', year: 'numeric' };
        V.changedateUpAdmin = (future.toLocaleDateString('en-US', options));
        SF.send(By.xpath('//input[@ng-model="option.pickup"]'), V.changedateUpAdmin);
        SF.select (By.xpath('//select[@ng-model="option.picktime1"]'), 3);
        SF.select (By.xpath('//select[@ng-model="option.picktime2"]'), 4);
        SF.sleep (0.5);
        now = new Date();
        msInDay = 86400000;
        future = new Date(now.getTime() + msInDay * 4);
        options = { month: 'long', day: 'numeric', year: 'numeric' };
        V.changedateDelAdmin = (future.toLocaleDateString('en-US', options));
        SF.send(By.xpath('//input[@ng-model="option.delivery"]'), V.changedateDelAdmin);
        SF.select (By.xpath('//select[@ng-model="option.deltime1"]'), 5);
        SF.select (By.xpath('//select[@ng-model="option.deltime2"]'), 6);
        SF.send(By.xpath('//input[@ng-model="option.rate"]'), 5000);
        SF.sleep (0.5);
        SF.click (By.xpath('//a[@ng-click="addOption()"]'));
        SF.sleep (2.5);

        condition.nowWeDoing = 'заполняем опции 2';
        SF.clear (By.xpath('//input[@ng-model="option.pickup"]'));
        SF.sleep (0.5);
        now = new Date();
        msInDay = 86400000;
        future = new Date(now.getTime() + msInDay * 3);
        options = { month: 'long', day: 'numeric', year: 'numeric' };
        V.changedateUpAdminLong = (future.toLocaleDateString('en-US', options));
        SF.send(By.xpath('//input[@ng-model="option.pickup"]'), V.changedateUpAdminLong);
        SF.select (By.xpath('//select[@ng-model="option.picktime1"]'), 5);
        SF.select (By.xpath('//select[@ng-model="option.picktime2"]'), 7);
        SF.sleep (0.5);
        now = new Date();
        msInDay = 86400000;
        future = new Date(now.getTime() + msInDay * 5);
        options = { month: 'long', day: 'numeric', year: 'numeric' };
        V.changedateDelAdminLong = (future.toLocaleDateString('en-US', options));
        SF.send(By.xpath('//input[@ng-model="option.delivery"]'), V.changedateDelAdminLong);
        SF.select (By.xpath('//select[@ng-model="option.deltime1"]'), 8);
        SF.select (By.xpath('//select[@ng-model="option.deltime2"]'), 9);
        SF.send(By.xpath('//input[@ng-model="option.rate"]'), 6000);
        SF.sleep (0.5);
        JS.scroll ('a[ng-click=\\"addOption()\\"]');
        SF.click (By.xpath('//a[@ng-click="addOption()"]'));
        SF.sleep (2);
        SF.click(By.xpath('//a[@ng-click="saveOptions()"]'));
        SF.sleep (1.5);
        MF.WaitWhileToaster();
        MF.SweetConfirm ();
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
		SF.click(By.xpath('//input[@ng-model="payment.creditCardFee"]'));
		FillCardPayModal();
		MF.WaitWhileBusy();
        driver.actions().mouseMove(driver.findElement(By.xpath('//tr[@ng-dblclick="showReceipt(receipt.id)"]'))).doubleClick().perform();
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
	}

	function HomeEstimate_SalesGoInPortalandOpenRequest(salesLogin, salesPassword, boardNumbers) {
		SF.waitForVisible(By.xpath('//h1[@ng-click="homeEstimate = true; moveBoard = false;"]'));
		SF.click(By.xpath('//h1[@ng-click="homeEstimate = true; moveBoard = false;"]'));
		SF.send(By.xpath('//input[@id="email"]'), salesLogin);
		SF.send(By.xpath('//input[@id="password"]'), salesPassword);
		SF.click(By.xpath('//button[@type="submit"]'));
		SF.waitForVisible(By.xpath('//div[@ng-repeat="request in vm.inHomeEstimateRequests"]'));
		SF.sleep(2);
		//JS.scroll(V.boardNumbers.Id);
		JS.click('div.card-root__card:contains(\\"' + boardNumbers.Id + '\\") div.card-root__footer' +
			' button.card-root__view-request.btn.btn-default');
		SF.waitForVisible(By.xpath('//div[@ng-hide="states.invoiceState"]'));
		MF.WaitWhileBusy();
	}
	function HomeEstimate_ReservationPage() {
		MF.WaitWhileBusy();
		SF.waitForVisible(By.xpath('//button[@ng-click="openReservationPage()"]'));
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
		MF.Account_ClickUpdateClientInModalWindow();
		MF.WaitWhileBusy();
	}
	function EditRequest_EditRateCalculOff(rate){
		JS.click('div span.field-prefix.field-prefix_display-block ' +
			'i[ng-click="OpenDiscountRateModal();"]');
		SF.click(By.xpath('//div/input[@ng-change="calcDiscount()"]'));
		SF.sleep(1);
		SF.send(By.xpath('//div/input[@ng-change="calcDiscount()"]'),rate);
		SF.sleep(1);
		SF.click(By.xpath('//div/button[@ng-class="{\'disabled\': request.request_all_data.add_rate_discount == request.rate.value}"]'));
		MF.SweetConfirm();
	}
	function EditRequest_EditCrewCalculOff() {
		SF.click(By.xpath('//div[@class="col-md-1 col-xs-1 form-item form-type-textfield form-item-movers-crew"]' +
			'/input[@oldvalue="request.crew.old"]'));
		SF.clear(By.xpath('//div[@class="col-md-1 col-xs-1 form-item form-type-textfield form-item-movers-crew"]' +
			'/input[@oldvalue="request.crew.old"]'));
		SF.send(By.xpath('//div[@class="col-md-1 col-xs-1 form-item form-type-textfield form-item-movers-crew"]' +
			'/input[@oldvalue="request.crew.old"]'),'4');
	}
	function EditRequest_SetMaxWorkTimeAndTravelTimeWhenCalcOff() {
        SF.click(By.xpath('//input[@ng-model="request.maximum_time.value"]'));
        SF.click(By.xpath('//input[@ng-model="request.minimum_time.value"]'));
        SF.click(By.xpath('//input[@ng-model="request.maximum_time.value"]'));
        SF.sleep(0.5);
        SF.click(By.xpath('//div[contains(@class, "ui-timepicker-wrapper") and contains(@style,"display: block;")]/ul/li[contains(text(),"07:15")]'));
        SF.click(By.xpath('//input[@ng-model="request.travel_time.value"]'));
        SF.click(By.xpath('//input[@ng-model="request.minimum_time.value"]'));
        SF.click(By.xpath('//input[@ng-model="request.travel_time.value"]'));
        SF.sleep(0.5);
        SF.click(By.xpath('//div[contains(@class, "ui-timepicker-wrapper") and contains(@style,"display: block;")]/ul/li[contains(text(),"01:30")]'));
    }
    function LongDistanceSettings_SetDiscounts(numberDiscount, DiscountPrice, DiscountPriceCF) {
        SF.clear(By.xpath('//table[@ng-show="!discountTabActive"]//tr[@ng-repeat="row in discounts"]['+numberDiscount+']//input[@ng-model="row.rate"]'));
        SF.send(By.xpath('//table[@ng-show="!discountTabActive"]//tr[@ng-repeat="row in discounts"]['+numberDiscount+']//input[@ng-model="row.rate"]'),DiscountPrice);
        SF.clear(By.xpath('//table[@ng-show="!discountTabActive"]//tr[@ng-repeat="row in discounts"]['+numberDiscount+']//input[@ng-model="row.startWeight"]'));
        SF.send(By.xpath('//table[@ng-show="!discountTabActive"]//tr[@ng-repeat="row in discounts"]['+numberDiscount+']//input[@ng-model="row.startWeight"]'),DiscountPriceCF);
        SF.sleep(2.5);
    }
    function LongDistanceSettings_AddLDStatusFlag(text) {
        SF.click(By.xpath('//button[@ng-click="vm.addNewStatus(); vm.addFlag = true"]'));
        SF.click(By.xpath('//input[@ng-model="newFlag.name"]'));
        SF.send(By.xpath('//input[@ng-model="newFlag.name"]'), text);
        SF.click(By.xpath('//input[@ng-model="newFlag.color"]'));
        SF.clear(By.xpath('//input[@ng-model="newFlag.color"]'));
        SF.send(By.xpath('//input[@ng-model="newFlag.color"]'), '#4f2e2e');
        SF.sleep(1);
        SF.click(By.xpath('//button[@ng-click="saveNewFlag(); "]'));
        SF.sleep(2);
    }
	function PayCheck() {
        JS.waitForExist('input[ng-model="payment.card_num"]');
        SF.sleep(1);
        SF.click(By.xpath('//div[@ng-click="choosePayment(\'checkPay\');"]'));
        SF.sleep(1);
        SF.send(By.xpath('//input[@ng-model="paymentCheck.check_num"]'), 3453453453453);
        SF.sleep(1);
        SF.click(By.xpath('//input[@ng-click="applyPayment()"]'));
        SF.sleep(2);
    }
	function SendClientInfoForDraftRequest(client) {
        SF.clear(By.xpath('//input[@ng-model="client.field_user_first_name"]'));
        SF.send(By.xpath('//input[@ng-model="client.field_user_first_name"]'), client.name);
        SF.clear(By.xpath('//input[@ng-model="client.field_user_last_name"]'));
        SF.send(By.xpath('//input[@ng-model="client.field_user_last_name"]'), client.fam);
        SF.clear(By.xpath('//input[@ng-model="client.field_primary_phone"]'));
        SF.send(By.xpath('//input[@ng-model="client.field_primary_phone"]'), client.phone);
        SF.clear(By.xpath('//input[@ng-model="client.mail"]'));
        SF.send(By.xpath('//input[@ng-model="client.mail"]'), client.email);
        SF.sleep(1.5);
    }

    ///===============================Profit and loss===============================

    function ProfitLoss_AddExpense(suma, categoria, notes) {
        SF.click(By.xpath('//button[@ng-click="vm.createExpense()"]'));
        MF.WaitWhileBusy ();
        SF.click(By.xpath('//input[@ng-model="expense.amount"]'));
        SF.send(By.xpath('//input[@ng-model="expense.amount"]'), suma);
        SF.select(By.xpath('//select[@ng-model="expense.category"]'), categoria);
        SF.send(By.xpath('//textarea[@ng-model="expense.notes"]'), notes);
        SF.click(By.xpath('//button[@ng-click="saveExpense()"]'));
        MF.SweetConfirm ();
        MF.WaitWhileBusy ();
        MF.SweetConfirm ();
        MF.WaitWhileBusy ();
    }

    ///===============================Profit and loss===============================

    function MailRu_Login(login, password){
        SF.send(By.xpath('//input[@id="mailbox__login"]'),login);
        SF.send(By.xpath('//input[@id="mailbox__password"]'),password);
        SF.click(By.xpath('//input[@id="mailbox__auth__button"]'));
        SF.waitForVisible(By.xpath('//div[contains(@class,"b-datalist__item")]'));
        SF.sleep(1);
    }


    function Gmail_Login(login, password) {
        SF.send(By.xpath('//input[@type="email"]'), login);
        SF.sleep(2);
        SF.click(By.xpath('//span[@class="RveJvd snByac"]'));
        SF.sleep(3);
        SF.send(By.xpath('//input[@type="password"]'), password);
        SF.sleep(2);
        SF.click(By.xpath('//span[@class="RveJvd snByac"]'));
        SF.sleep(10);
    }
    function AccountFR_SeelectOptions() {
        SF.select (By.xpath('//select[@ng-model="details.current_door"]'), 30);
        SF.select (By.xpath('//select[@ng-model="details.new_door"]'), 50);
        SF.select (By.xpath('//select[@ng-model="details.current_permit"]'), "PM");
        SF.select (By.xpath('//select[@ng-model="details.new_permit"]'), "PR");
        SF.sleep(1);
        JS.click('button[ng-click=\\"saveDetails()\\"]:visible');
        SF.sleep(1);
        MF.WaitWhileBusy ();
        SF.sleep (1);
    }
    function EditRequest_AddPacking() {
        MF.WaitWhileBusy ();
        SF.click(By.xpath('//label[@ng-click="openAddPackingModal();"]'));
        SF.waitForVisible (By.xpath('//li[@ng-click="addExtraCharges(extra_charge)"][1]'));
        SF.click(By.xpath('//li[@ng-click="addExtraCharges(extra_charge)"][1]'));
        SF.sleep (0.5);
        SF.click(By.xpath('//li[@ng-click="addExtraCharges(extra_charge)"][2]'));
        SF.sleep (0.5);
        SF.click(By.xpath('//li[@ng-click="addExtraCharges(extra_charge)"][3]'));
        SF.sleep (0.5);
        SF.click(By.xpath('//button[@ng-click="save()"]'));
        MF.WaitWhileBusy ();
        SF.sleep (2);
    }
    function EditRequest_AddPackingAndFullPAcking() {
        SF.click(By.xpath('//label[@ng-click="openAddPackingModal();"]'));
        SF.waitForVisible (By.xpath('//li[@ng-click="addExtraCharges(extra_charge)"][1]'));
        MF.WaitWhileBusy ();
        SF.click(By.xpath('//li[@ng-click="addExtraCharges(extra_charge)"][1]'));
        SF.sleep (0.5);
        SF.click(By.xpath('//li[@ng-click="addExtraCharges(extra_charge)"][2]'));
        SF.sleep (0.5);
        SF.click(By.xpath('//li[@ng-click="addExtraCharges(extra_charge)"][3]'));
        SF.sleep (0.5);
        JS.click('label[ng-model="packing_service"]:contains("Full Packing"):visible');
        SF.sleep(0.5);
        SF.click(By.xpath('//button[@ng-click="save()"]'));
        SF.sleep (2);
        MF.WaitWhileBusy ();
    }
    function EditRequest_AddPartialPacking() {
        SF.click(By.xpath('//label[@ng-click="openAddPackingModal();"]'));
        SF.waitForVisible (By.xpath('//li[@ng-click="addExtraCharges(extra_charge)"][1]'));
        MF.WaitWhileBusy ();
        JS.click('label[ng-model="packing_service"]:contains("Partial Packing"):visible');
        SF.sleep(0.5);
        SF.click(By.xpath('//button[@ng-click="save()"]'));
        SF.sleep (2);
        MF.WaitWhileBusy ();
    }
    function EditRequest_AddFullPacking() {
        SF.click(By.xpath('//label[@ng-click="openAddPackingModal();"]'));
        SF.waitForVisible (By.xpath('//li[@ng-click="addExtraCharges(extra_charge)"][1]'));
        MF.WaitWhileBusy ();
        JS.click('label[ng-model="packing_service"]:contains("Full Packing"):visible');
        SF.sleep(0.5);
        SF.click(By.xpath('//button[@ng-click="save()"]'));
        SF.sleep (2);
        MF.WaitWhileBusy ();
    }
    function EditRequest_AddAdditionalServicesFullPack() {
        MF.EditRequest_OpenAddServices();
        SF.click(By.xpath('//div[@class="charge_list"]/li[1]'));
        SF.click(By.xpath('//div[@class="charge_list"]/li[3]'));
        SF.click(By.xpath('//div[@class="charge_list"]/li[4]'));
        MF.EditRequest_SaveAddServices();
    }
    function EditRequest_AddValuation() {
        MF.EditRequest_OpenValuationModal();
        SF.click(By.xpath('//div[@ng-click="setValuationType(valuationTypes.FULL_VALUE)"]'));
        SF.sleep(2);
        SF.click(By.xpath('//table[@class="valuation-modal__info-table"]/tbody[2]/tr[2]/td[3]'));
        SF.click (By.xpath('//button[@ng-click="clickSave()"]'));
        MF.SweetConfirm ();
        MF.WaitWhileBusy ();
    }
    function EditRequest_AddPackingClosingTab() {
        SF.click(By.xpath('//label[@ng-click="openAddPackingInvoiceModal();"]'));
        SF.waitForVisible (By.xpath('//li[@ng-click="addExtraCharges(extra_charge)"][1]'));
        SF.click(By.xpath('//li[@ng-click="addExtraCharges(extra_charge)"][1]'));
        SF.sleep (0.5);
        SF.click(By.xpath('//li[@ng-click="addExtraCharges(extra_charge)"][2]'));
        SF.sleep (0.5);
        SF.click(By.xpath('//li[@ng-click="addExtraCharges(extra_charge)"][3]'));
        SF.sleep (0.5);
        SF.click(By.xpath('//button[@ng-click="save()"]'));
        MF.WaitWhileBusy ();
        SF.sleep (2);
    }

    function EditRequest_AddSpecialPackingClosingTab() {
        SF.click(By.xpath('//label[@ng-click="openAddPackingInvoiceModal();"]'));
        SF.waitForVisible (By.xpath('//li[@ng-click="addExtraCharges(extra_charge)"][1]'));
        SF.sleep(1);
        SF.click(By.xpath('//li[@ng-click="addExtraCharges(extra_charge)"][5]'));
        SF.sleep (0.5);
        SF.click(By.xpath('//li[@ng-click="addExtraCharges(extra_charge)"][6]'));
        SF.sleep (0.5);
        SF.click(By.xpath('//li[@ng-click="addExtraCharges(extra_charge)"][7]'));
        SF.sleep (0.5);
        SF.click(By.xpath('//button[@ng-click="save()"]'));
        MF.WaitWhileBusy ();
        SF.sleep (2);
    }

    function EditRequest_AddAdditionalServClosingTab() {
        SF.click(By.xpath('//label[@ng-click="openAddServicesInvoiceModal();"]'));
        SF.waitForVisible (By.id('extra-service-modal'));
        SF.sleep(2);
        SF.click(By.xpath('//div[@class="charge_list"]/li[1]'));
        SF.click(By.xpath('//div[@class="charge_list"]/li[3]'));
        SF.click(By.xpath('//div[@class="charge_list"]/li[4]'));
        SF.click(By.xpath('//div[@class="charge_list"]/li[5]'));
        SF.click(By.xpath('//div[@class="charge_list"]/li[7]'));
        SF.click(By.xpath('//button[@ng-click="save()"]'));
        MF.WaitWhileBusy ();
        SF.sleep (2);
    }
    function EditRequest_AddAdditionalServSalesTab() {
        MF.EditRequest_OpenAddServices();
        SF.click(By.xpath('//div[@class="charge_list"]/li[1]'));
        SF.click(By.xpath('//div[@class="charge_list"]/li[3]'));
        SF.click(By.xpath('//div[@class="charge_list"]/li[4]'));
        MF.EditRequest_SaveAddServices();
    }
    function BoardRequestPage_SetStartEndDate(start, end) {
        SF.clear (By.xpath('//input[@ng-model="dateFrom"]'));
        SF.send (By.xpath('//input[@ng-model="dateFrom"]'), start);
        SF.clear (By.xpath('//input[@ng-model="dateTo"]'));
        SF.send (By.xpath('//input[@ng-model="dateTo"]'), end);
        SF.sleep(2);
        SF.click (By.xpath('//button[@ng-click="GetMonthStats()"]'));
        MF.WaitWhileBusy ();
        SF.sleep(2);
    }
    function EditStorage_AddLotNumber() {
        SF.click(By.xpath('//button[@id="addColor"]'));
        SF.send(By.xpath('//input[@ng-model="lotNumber.number"]'), 'test');
        SF.click(By.xpath('//button[@id="colorPick"]'));
        SF.click(By.xpath('//button[@id="colorPick"]/following-sibling::ul/li[3]'));
        SF.send(By.xpath('//input[@ng-model="lotNumber.from"]'), 111111);
        SF.send(By.xpath('//input[@ng-model="lotNumber.to"]'), 222222);
        MF.EditStorage_UpdateStorage ();
    }
    function EditRequest_AddCustomCommersialMove(name, weight) {
        SF.click(By.xpath('//input[@ng-model="query"]'));
        SF.send(By.xpath('//input[@ng-model="query"]'), name);
        driver.actions().sendKeys(Key.ENTER).perform();
        MF.SweetConfirm();
        SF.waitForLocated(By.xpath('//button[@ng-click="updateCommercialMoveSizes()"]'));
        SF.click(By.xpath('//input[@ng-model="commercialItem.cubic_feet"]'));
        SF.clear(By.xpath('//input[@ng-model="commercialItem.cubic_feet"]'));
        SF.send(By.xpath('//input[@ng-model="commercialItem.cubic_feet"]'), weight);
        SF.click(By.xpath('//button[@ng-click="updateCommercialMoveSizes()"]'));
        MF.WaitWhileBusy();
    }
    function EditRequest_AddPAckingOnClosingTab() {
        SF.click(By.xpath('//label[@ng-click="openAddPackingInvoiceModal();"]'));
        SF.waitForVisible (By.xpath('//li[@ng-click="addExtraCharges(extra_charge)"][1]'));
        SF.click(By.xpath('//li[@ng-click="addExtraCharges(extra_charge)"][1]'));
        SF.click(By.xpath('//li[@ng-click="addExtraCharges(extra_charge)"][2]'));
        SF.click(By.xpath('//li[@ng-click="addExtraCharges(extra_charge)"][3]'));
        SF.click(By.xpath('//button[@ng-click="save()"]'));
        MF.WaitWhileToaster();
    }
    function Contract_CheckOriginBlockNameZip(zipCode, clientName, clientFam) {
        driver.wait(driver.findElement(By.xpath('//p[@ng-bind="$ctrl.data.name"]')).getText().then(function (text) {
            VD.IWant(VD.ToEqual, text, 'ORIGIN', 'не нашло блок орижин на контракте');
        }),config.timeout);
        driver.wait(driver.findElement(By.xpath('//trip-data[@data="contract_page.origin"]//span[@ng-bind="$ctrl.data.customerName"]/following-sibling::b')).getText().then(function (text) {
            VD.IWant(VD.ToEqual, text, (clientName + ' '+ clientFam).toUpperCase(), 'не нашло в орижин на контракте имя кастомера');
        }),config.timeout);
        driver.wait(driver.findElement(By.xpath('//trip-data[@data="contract_page.origin"]//span[@ng-bind="$ctrl.data.zip"]/following-sibling::b')).getText().then(function (text) {
            VD.IWant(VD.ToEqual, text, zipCode, 'не нашло в орижин на контракте zip origin');
        }),config.timeout);
    }
    function Contract_CheckDestinationBlockNameZip(zipCode, clientName, clientFam) {
        driver.wait(driver.findElement(By.xpath('//trip-data[@data="contract_page.destination"]/p[@ng-bind="$ctrl.data.name"]')).getText().then(function (text) {
            VD.IWant(VD.ToEqual, text, 'DESTINATION', 'не нашло блок destination на контракте');
        }),config.timeout);
        driver.wait(driver.findElement(By.xpath('//trip-data[@data="contract_page.destination"]//span[@ng-bind="$ctrl.data.customerName"]/following-sibling::b')).getText().then(function (text) {
            VD.IWant(VD.ToEqual, text, (clientName + ' '+ clientFam).toUpperCase(), 'не нашло в destination на контракте имя кастомера');
        }),config.timeout);
        driver.wait(driver.findElement(By.xpath('//trip-data[@data="contract_page.destination"]//span[@ng-bind="$ctrl.data.zip"]/following-sibling::b')).getText().then(function (text) {
            VD.IWant(VD.ToEqual, text, zipCode, 'не нашло в destination на контракте zip destination');
        }),config.timeout);
    }
    function AddPackingOnContract() {
        SF.select(By.xpath('//tr[@ng-repeat="p in extra.selectedPackings track by $index "][1]//select[@ng-model="p.quantity"]'),5);
        SF.select(By.xpath('//tr[@ng-repeat="p in extra.selectedPackings track by $index "][2]//select[@ng-model="p.quantity"]'),5);
        SF.select(By.xpath('//tr[@ng-repeat="p in extra.selectedPackings track by $index "][6]//select[@ng-model="p.quantity"]'),5);
        SF.click(By.xpath('//a[@ng-click="showPackingServicesRef.show = !showPackingServicesRef.show"]'));
        SF.sleep(0.3);
        SF.click(By.xpath('//li[@ng-click="addPacking()"]'));
        SF.sleep(0.3);
        SF.select(By.xpath('//tr[@ng-repeat="p in extra.selectedPackings track by $index "][9]//select[@ng-model="p.quantity"]'),5);
        SF.clear(By.xpath('//tr[@ng-repeat="p in extra.selectedPackings track by $index "][9]//input[@ng-model="p.rate"]'));
        SF.send(By.xpath('//tr[@ng-repeat="p in extra.selectedPackings track by $index "][9]//input[@ng-model="p.rate"]'),10);
        SF.sleep(0.5);
    }
    function PaymentCollected_ChooseCurrentDateStartEnd() {
        let now = new Date();
        let options = {month: 'short', day: '2-digit', year: 'numeric'};
        V.dateStart = (now.toLocaleDateString('en-US', options));
        V.dateEnd = (now.toLocaleDateString('en-US', options));
        SF.clear(By.xpath('//md-datepicker[@ng-model="$ctrl.date.from"]/div/input'));
        SF.send(By.xpath('//md-datepicker[@ng-model="$ctrl.date.from"]/div/input'), V.dateStart);
        SF.sleep(1);
        SF.clear(By.xpath('//md-datepicker[@ng-model="$ctrl.date.to"]/div/input'));
        SF.send(By.xpath('//md-datepicker[@ng-model="$ctrl.date.to"]/div/input'), V.dateEnd);
        SF.sleep(2);
    }
    function FlatRateEditRequest_SendDeliveryDates() {
        let now = new Date();
        let msInDay = 86400000;
        let future = new Date(now.getTime() + msInDay * 4);
        let second_future = new Date(now.getTime() + msInDay * 7);
        let month = { month: 'numeric'};
        let day = {day: 'numeric'};
        V.firstDate = {};
        V.secondDate = {};
        V.firstDate.Month = (future.toLocaleDateString('en-US', month)) - 1;
        V.firstDate.Day = (future.toLocaleDateString('en-US', day));
        V.secondDate.Month = (second_future.toLocaleDateString('en-US', month)) - 1;
        V.secondDate.Day = (second_future.toLocaleDateString('en-US', day));
        SF.sleep(1);
        SF.click(By.xpath('//div[contains(@class, "dateRange")]/input'));
        MF.Account_PreferredPickUpDate(V.firstDate, V.secondDate);
        SF.sleep (2);
    }
    function Schedule_CheckFlatRateTruck(Id) {
        driver.wait(driver.findElement(By.xpath('//span[contains(@class, "current-date")]')).getText().then(function(date){
            V.current = date;
            let now = new Date();
            let msInDay = 86400000;
            let future = new Date(now.getTime() + msInDay * 2);
            let options = {  month: 'long', year: 'numeric' };
            V.Dates = (future.toLocaleDateString('en-US', options));
        }), config.timeout);
        SF.sleep(8);
        if (V.current == V.Dates) {
            let now = new Date();
            let msInDay = 86400000;
            let future = new Date(now.getTime() + msInDay * 2);
            let options = { day: 'numeric' };
            V.datescedule = (future.toLocaleDateString('en-US', options));
            SF.click(By.xpath('//div[contains(@class, "cal-day-inmonth")]/span[contains(@class, "pull-right") and contains(text(), "' + V.datescedule + '")]'));
            SF.sleep(5);
            driver.wait(driver.executeScript("return $('div.line1:contains("+Id+")').length").then (function (checkSchedule) {
                VD.IWant(VD.NotToEqual, checkSchedule, 0, 'трак (желтая линия, реквест) на таблице траков в календаре не нашелся '+Id+'');
            }),config.timeout);
        } else {
            let now = new Date();
            let msInDay = 86400000;
            let future = new Date(now.getTime() + msInDay * 2);
            let options = { day: 'numeric' };
            V.datescedule = (future.toLocaleDateString('en-US', options));
            SF.click(By.xpath('//i[@ng-click="vm.nextMonth()"]'));
            SF.sleep(5);
            SF.click(By.xpath('//div[contains(@class, "cal-day-inmonth")]/span[contains(@class, "pull-right") and contains(text(), "' + V.datescedule + '")]'));
            SF.sleep(5);
            driver.wait(driver.executeScript("return $('div.line1:contains("+Id+")').length").then (function (checkSchedule) {
                VD.IWant(VD.NotToEqual, checkSchedule, 0, 'трак (желтая линия, реквест) на таблице траков в календаре не нашелся (вторая проверка)'+Id+'');
            }),config.timeout);
        }

    }
    function AccountFlatRate_ChoosePickupAndDeliveryDate() {
        let now = new Date();
        let msInDay = 86400000;
        let future = new Date(now.getTime() + msInDay * 2);
        let options = { day: 'numeric', month: 'short', year: 'numeric' };
        V.changedateUp = (future.toLocaleDateString('en-US', options));
        SF.send(By.xpath('//div[contains(@class, "dateRange")]/input'), V.changedateUp);
        now = new Date();
        msInDay = 86400000;
        future = new Date(now.getTime() + msInDay * 3);
        options = { day: 'numeric', month: 'short', year: 'numeric' };
        V.changedateDelivery = (future.toLocaleDateString('en-US', options));
        SF.send(By.xpath('//div[contains(@class, "dateRange delivery")]/input'), V.changedateDelivery);
        MF.WaitWhileBusy ();
    }
    function Payroll_SetDeliveryDateOnlyFlatRate() {
        let now = new Date();
        let msInDay = 86400000;
        let future = new Date(now.getTime() + msInDay * 4);
        let options = { month: 'short', day: 'numeric', year: 'numeric' };
        V.changedateDelPayrolol = (future.toLocaleDateString('en-US', options));
        MF.Payroll_ClickAllDepartment();
        SF.clear(By.xpath('//input[@ng-model="dateRange.from"]'));
        SF.send(By.xpath('//input[@ng-model="dateRange.from"]'), V.changedateDelPayrolol);
        SF.clear(By.xpath('//input[@ng-model="dateRange.to"]'));
        SF.send(By.xpath('//input[@ng-model="dateRange.to"]'), V.changedateDelPayrolol);
        SF.click(By.xpath('//button[@ng-click="getByDate();bDateChange=false"]'));
        SF.sleep(1);
        MF.WaitWhileBusy ();
    }
    function AccountFlatRate_SendTwoPrefferedDate() {
        let now = new Date();
        let msInDay = 86400000;
        let future = new Date(now.getTime() + msInDay * 2);
        let second_future = new Date(now.getTime() + msInDay * 4);
        let month = { month: 'numeric'};
        let day = {day: 'numeric'};
        V.firstDate = {};
        V.secondDate = {};
        V.firstDate.Month = (future.toLocaleDateString('en-US', month)) - 1;
        V.firstDate.Day = (future.toLocaleDateString('en-US', day));
        V.secondDate.Month = (second_future.toLocaleDateString('en-US', month)) - 1;
        V.secondDate.Day = (second_future.toLocaleDateString('en-US', day));
        SF.click(By.xpath('//h4[contains(text(),"Preferred Pick Up dates:")]/following-sibling::div[2]'));
        SF.sleep(1);
        MF.Account_PreferredPickUpDate(V.firstDate, V.secondDate);
        SF.click(By.xpath('//h2[contains(text(), "Flat Rate Request")]'));
        SF.sleep(2);
        now = new Date();
        msInDay = 86400000;
        future = new Date(now.getTime() + msInDay * 4);
        second_future = new Date(now.getTime() + msInDay * 7);
        month = { month: 'numeric'};
        day = {day: 'numeric'};
        V.firstDate = {};
        V.secondDate = {};
        V.firstDate.Month = (future.toLocaleDateString('en-US', month)) - 1;
        V.firstDate.Day = (future.toLocaleDateString('en-US', day));
        V.secondDate.Month = (second_future.toLocaleDateString('en-US', month)) - 1;
        V.secondDate.Day = (second_future.toLocaleDateString('en-US', day));
        SF.click(By.xpath('//h4[contains(text(),"Preferred Delivery dates:")]/following-sibling::div[2]'));
        SF.sleep(1);
        MF.Account_PreferredDeliveryDate(V.firstDate, V.secondDate);
    }
    function AccountFlatRate_AddExtraPickupAndDropOff() {
        SF.sleep(2);
        SF.click(By.xpath('//i[@ng-click="extraPickup=true"]'));
        SF.sleep(1);
        SF.send(By.xpath('//input[@ng-value="request.field_extra_pickup.postal_code"]'),'02461');
        SF.select(By.xpath('//select[@ng-value="request.field_extra_pickup.organisation_name"]'),2);
        SF.click(By.xpath('//i[@ng-click="extraDropoff=true"]'));
        SF.sleep(1);
        SF.send(By.xpath('//input[@ng-value="request.field_extra_dropoff.postal_code"]'),'07304');
        SF.select(By.xpath('//select[@ng-value="request.field_extra_dropoff.organisation_name"]'),3);
    }
    function EditRequest_AddCustomPacking(quantity, rate) {
        SF.click(By.xpath('//label[@ng-click="openAddPackingModal();"]'));
        SF.waitForVisible (By.xpath('//li[@ng-click="addExtraCharges(extra_charge)"][1]'));
        SF.click(By.xpath('//input[@ng-model="add_extra_charge.quantity"][1]'));
        SF.clear(By.xpath('//input[@ng-model="add_extra_charge.quantity"][1]'));
        SF.send(By.xpath('//input[@ng-model="add_extra_charge.quantity"][1]'), quantity);
        SF.click(By.xpath('//input[@ng-model="add_extra_charge.rate"][1]'));
        SF.clear(By.xpath('//input[@ng-model="add_extra_charge.rate"][1]'));
        SF.send(By.xpath('//input[@ng-model="add_extra_charge.rate"][1]'), rate);
        SF.click(By.xpath('//button[@ng-click="save()"]'));
        MF.WaitWhileBusy ();
        SF.sleep (2);
    }
    function EditRequest_ChangeMoveDate(dateInFuture) {
        SF.click (By.xpath('//input[@ng-click="openCalendar()"]'));
        let now = new Date();
        let msInDay = 86400000;
        let future = new Date(now.getTime() + msInDay * dateInFuture);
        let month = { month: '2-digit'};
        let day = {day: '2-digit'};
        V.firstDate = {};
        V.firstDate.Month = (future.toLocaleDateString('en-US', month));
        V.firstDate.Day = (future.toLocaleDateString('en-US', day));
        SF.click(By.xpath('//div[@ng-click="prevMonth()"]'));
        SF.click(By.xpath('//div[@class="erDatepicker"]//div[@date-attribute="2018-'+ V.firstDate.Month + '-' + V.firstDate.Day +'"]'));
        MF.WaitWhileBusy();
    }
    function EditRequest_SetFirstDeliveryDay(dateInFuture) {
        MF.EditRequest_OpenDetails();
        SF.sleep(2);
        SF.click(By.xpath('//input[@ng-model="disableDeliveryDatesCheckbox.checkboxValue"]'));
        SF.sleep(2);
        SF.click(By.xpath('//input[@ng-model="details.delivery"]'));
        let now = new Date();
        let msInDay = 86400000;
        let future = new Date(now.getTime() + msInDay * dateInFuture);
        let options = { month: 'long', day: 'numeric', year: 'numeric' };
        V.deliveryDay = (future.toLocaleDateString('en-US', options));
        SF.send(By.xpath('//input[@ng-model="details.delivery"]'), V.deliveryDay);
        SF.sleep(0.5);
        SF.click(By.xpath('//button[contains(text(), "Done")]'));
        MF.EditRequest_SaveDetails();
    }
    function EditRequest_SetScheduleDeliveryDate(dateInFuture) {
        SF.click(By.xpath('//er-datepicker-input[@er-value="scheduleDeliveryDate"]'));
        now = new Date();
        msInDay = 86400000;
        future = new Date(now.getTime() + msInDay * dateInFuture);
        let month = { month: '2-digit'};
        let day = {day: '2-digit'};
        V.scheduleDate = {};
        V.scheduleDate.Month = (future.toLocaleDateString('en-US', month));
        V.scheduleDate.Day = (future.toLocaleDateString('en-US', day));
        SF.click(By.xpath('//div[@class="erDatepicker"]//div[@date-attribute="2018-'+ V.scheduleDate.Month + '-' + V.scheduleDate.Day +'"]'));
        SF.sleep(3);
        SF.click(By.xpath('//input[@ng-model="request.inventory.move_details.delivery_days"]'));
        SF.sleep(2);
    }
    function EditRequest_SetInHomeEstimateDate(dateInFuture) {
        let now = new Date();
        let msInDay = 86400000;
        let future = new Date(now.getTime() + msInDay * dateInFuture);
        let month = { month: 'numeric'};
        let day = {day: 'numeric'};
        V.firstDate = {};
        V.firstDate.Month = (future.toLocaleDateString('en-US', month)) - 1;
        V.firstDate.Day = (future.toLocaleDateString('en-US', day));
        SF.click(By.xpath('//div[@id="ui-datepicker-div"]//td[@data-month="'+ V.firstDate.Month +'"]/a[contains(text(),"'+ V.firstDate.Day +'")]'));
        MF.WaitWhileBusy();
    }
    function SIT_CreateCarrier(carrierInfo) {
        MF.SIT_ClickAddCarrier();
        carrierInfo.name = SF.randomBukva(6) + '_t';
        carrierInfo.contactPerson = SF.randomBukva(6) + '_t';
        carrierInfo.contactPersonPhone = SF.randomCifra(10);
        SF.send(By.xpath('//input[@ng-model="agentModel.name"]'), carrierInfo.name);
        SF.send(By.xpath('//input[@ng-model="agentModel.contact_person"]'), carrierInfo.contactPerson);
        SF.send(By.xpath('//input[@ng-model="agentModel.contact_person_phone"]'), carrierInfo.contactPersonPhone);
        carrierInfo.address = SF.randomBukva(6) + '_t';
        carrierInfo.zipCode = "90001";
        SF.send(By.xpath('//textarea[@ng-model="agentModel.address"]'), carrierInfo.address);
        SF.send(By.xpath('//input[@ng-model="agentModel.zip_code"]'), carrierInfo.zipCode);
        SF.sleep(2);
        SF.click(By.xpath('//md-checkbox[@ng-model="agentModel.company_carrier"]'));
        carrierInfo.perCf = "2";
        carrierInfo.iccMc = SF.randomCifra(10);
        SF.send(By.xpath('//input[@ng-model="agentModel.per_cf"]'), carrierInfo.perCf);
        SF.send(By.xpath('//input[@ng-model="agentModel.icc_mc_number"]'), carrierInfo.iccMc);
        carrierInfo.usdot = SF.randomCifra(10);
        carrierInfo.eMail = SF.randomBukvaSmall(6) + '@' + SF.randomBukvaSmall(4) + '.tes';
        SF.send(By.xpath('//input[@ng-model="agentModel.usdot_number"]'), carrierInfo.usdot);
        SF.send(By.xpath('//input[@ng-model="agentModel.email"]'), carrierInfo.eMail);
        carrierInfo.webSite = "fdsfd.com";
        carrierInfo.phoneNumber1 = SF.randomCifra(10);
        SF.send(By.xpath('//input[@ng-model="agentModel.web_site"]'), carrierInfo.webSite);
        SF.send(By.xpath('//input[@ng-model="agentModel.phones[$index]"]'), carrierInfo.phoneNumber1);
        SF.sleep(2);
        MF.SIT_ClickSaveCarrier();
    }
    function SIT_CreateCustomPaymentInTPcollectedInClosing(sum, tripNumbers) {
        SF.click(By.xpath('//input[@id="customPaymentAmount"]'));
        SF.send(By.xpath('//input[@id="customPaymentAmount"]'), sum);
        driver.wait(driver.findElement(By.xpath('//div[@class="add-custom-payment-form__toolbar__info"]//span[2]')).getText().then(function(text){
            tripNumbers.NewTPCollected = SF.cleanPrice(text.substring(text.indexOf('$')));
        }),config.timeout);
        SF.click(By.xpath('//input[@ng-model="payment.description"]'));
        SF.send(By.xpath('//input[@ng-model="payment.description"]'),'test');
        SF.click(By.xpath('//button[@ng-click="save()"]'));
        SF.waitForVisible(By.xpath('//div[@class="jobs-trip-list__body__item"][contains(text(),"test")]'));
        SF.click(By.xpath('//button[@ng-click="back()"]'));
        SF.sleep(3.5);
    }
    function EditRequest_AddAdditionalContact(Name, Fam, emeil, AdditionalPhone) {
        SF.click(By.xpath('//i[@class="icon-user-follow"]'));
        SF.send(By.xpath('//input[@ng-model="request.field_additional_user.first_name"]'),Name);
        SF.send(By.xpath('//input[@ng-model="request.field_additional_user.last_name"]'),Fam);
        SF.send(By.xpath('//input[@ng-model="request.field_additional_user.mail"]'), emeil);
        SF.send(By.xpath('//input[@ng-model="request.field_additional_user.phone"]'),AdditionalPhone);
        SF.send(By.xpath('//input[@ng-model="client.field_user_additional_phone"]'), '1234567890');
        SF.click(By.xpath('//button[@ng-click="saveAddContact()"]'));
        SF.click(By.xpath('//button[@ng-click="updateAddContact()"]'));
        MF.WaitWhileToaster();
    }
    function SIT_SetDateTripForemanHelper(date) {
        let now = new Date();
        let msInDay = 86400000;
        let future = new Date(now.getTime() + msInDay * date);
        let options = {month: 'short', day: '2-digit', year: 'numeric'};
        V.dateStart = (now.toLocaleDateString('en-US', options));
        V.dateEnd = (future.toLocaleDateString('en-US', options));
        SF.clear(By.xpath('//md-datepicker[@ng-model="trip.data.details.end"]/div/input'));
        SF.send(By.xpath('//md-datepicker[@ng-model="trip.data.details.end"]/div/input'), V.dateEnd);
        SF.click(By.xpath('//input[@ng-model="search"]'));
        SF.sleep(3.5);
    }
    function SIT_CreateStorage(storageSit) {
        SF.clear (By.xpath('//input[@ng-model="newStorage.name"]'));
        SF.send (By.xpath('//input[@ng-model="newStorage.name"]'), storageSit.name);
        SF.clear (By.xpath('//textarea[@ng-model="newStorage.address"]'));
        SF.send (By.xpath('//textarea[@ng-model="newStorage.address"]'), storageSit.address);
        SF.clear (By.xpath('//input[@ng-model="newStorage.zip_code"]'));
        SF.send (By.xpath('//input[@ng-model="newStorage.zip_code"]'), storageSit.zip);
        SF.sleep(2);
        SF.click (By.xpath('//md-checkbox[@ng-model="newStorage.default_storage"]'));
        SF.clear (By.xpath('//input[@ng-model="newStorage.notes"]'));
        SF.send (By.xpath('//input[@ng-model="newStorage.notes"]'), storageSit.notes);
        SF.clear (By.xpath('//input[@ng-model="newStorage.email"]'));
        SF.send (By.xpath('//input[@ng-model="newStorage.email"]'), storageSit.email);
        SF.clear (By.xpath('//input[@ng-model="newStorage.phones[$index]"]'));
        SF.send (By.xpath('//input[@ng-model="newStorage.phones[$index]"]'), storageSit.phone);
        SF.sleep(1);
        JS.click('span:contains(\\"Save\\")');
    }
    function EditRequest_CustomPay(sum) {
        SF.click (By.xpath('//input[@ng-model="receipt.amount"]'));
        SF.send (By.xpath('//input[@ng-model="receipt.amount"]'),sum);
        SF.click(By.xpath('//textarea[@ng-model="receipt.description"]'));
        SF.sleep (1);
        SF.click(By.xpath('//button[@ng-click="Save()"]'));
        SF.sleep (1);
        MF.WaitWhileToaster();
        SF.sleep (1);
        MF.WaitWhileBusy ();
    }
    function EditRequest_CustomPayCreditCard(sum, nameCard) {
        SF.click (By.xpath('//input[@ng-model="receipt.amount"]'));
        SF.send (By.xpath('//input[@ng-model="receipt.amount"]'),sum);
		SF.select(By.xpath('//select[@ng-model="receipt.cctype"]'), nameCard);
        SF.send (By.xpath('//input[@ng-model="receipt.ccardN"]'), 4111111111111111);
        SF.send (By.xpath('//input[@ng-model="receipt.cvv"]'), 123);
        SF.select(By.xpath('//select[@ng-model="receipt.expmonth"]'), 5);
        SF.select(By.xpath('//select[@ng-model="receipt.expyear"]'), 2019);
        SF.send (By.xpath('//input[@ng-model="receipt.auth_code"]'), 5555);
        SF.click(By.xpath('//textarea[@ng-model="receipt.description"]'));
        SF.sleep (1);
        SF.click(By.xpath('//button[@ng-click="Save()"]'));
        SF.sleep (1);
        MF.WaitWhileToaster();
        JS.click('button[ng-click=\\"save()\\"]:visible');
        SF.sleep (1);
        MF.WaitWhileBusy ();
    }

    function CalculatorSettings_ShowQuoteTurnON() {
        SF.sleep(1);
        driver.wait(driver.executeScript("if($('input[ng-model=\"vm.calcSettings.calcauto\"]').hasClass('ng-not-empty')){" +
            "return true;}else{$('input[ng-model=\"vm.calcSettings.calcauto\"] ~span').click()}"),config.timeout);
        SF.sleep(0.5);
        driver.wait(driver.executeScript("if($('div[ng-repeat=\"(id, value) in vm.allowedServiceTypes\"]:has(label:contains(\"Moving\")):first input:first').hasClass('ng-not-empty')){" +
            "return true;}else{$('div[ng-repeat=\"(id, value) in vm.allowedServiceTypes\"]:has(label:contains(\"Moving\")):first span:first').click()}"),config.timeout);
        driver.wait(driver.executeScript("if($('div[ng-repeat=\"(id, value) in vm.allowedServiceTypes\"]:has(label:contains(\"Moving\")):first input:last').hasClass('ng-not-empty')){" +
            "return true;}else{$('div[ng-repeat=\"(id, value) in vm.allowedServiceTypes\"]:has(label:contains(\"Moving\")):first span:last').click()}"),config.timeout);
        SF.sleep(0.5);
        driver.wait(driver.executeScript("if($('div[ng-repeat=\"(id, value) in vm.allowedServiceTypes\"]:has(label:contains(\"Moving & Storage\")):first input:first').hasClass('ng-not-empty')){" +
            "return true;}else{$('div[ng-repeat=\"(id, value) in vm.allowedServiceTypes\"]:has(label:contains(\"Moving & Storage\")):first span:first').click()}"),config.timeout);
        driver.wait(driver.executeScript("if($('div[ng-repeat=\"(id, value) in vm.allowedServiceTypes\"]:has(label:contains(\"Moving & Storage\")):first input:last').hasClass('ng-not-empty')){" +
            "return true;}else{$('div[ng-repeat=\"(id, value) in vm.allowedServiceTypes\"]:has(label:contains(\"Moving & Storage\")):first span:last').click()}"),config.timeout);
        SF.sleep(0.5);
        driver.wait(driver.executeScript("if($('div[ng-repeat=\"(id, value) in vm.allowedServiceTypes\"]:has(label:contains(\"Loading Help\")):first input:first').hasClass('ng-not-empty')){" +
            "return true;}else{$('div[ng-repeat=\"(id, value) in vm.allowedServiceTypes\"]:has(label:contains(\"Loading Help\")):first span:first').click()}"),config.timeout);
        driver.wait(driver.executeScript("if($('div[ng-repeat=\"(id, value) in vm.allowedServiceTypes\"]:has(label:contains(\"Loading Help\")):first input:last').hasClass('ng-not-empty')){" +
            "return true;}else{$('div[ng-repeat=\"(id, value) in vm.allowedServiceTypes\"]:has(label:contains(\"Loading Help\")):first span:last').click()}"),config.timeout);
        SF.sleep(0.5);
        driver.wait(driver.executeScript("if($('div[ng-repeat=\"(id, value) in vm.allowedServiceTypes\"]:has(label:contains(\"Unloading Help\")):first input:first').hasClass('ng-not-empty')){" +
            "return true;}else{$('div[ng-repeat=\"(id, value) in vm.allowedServiceTypes\"]:has(label:contains(\"Unloading Help\")):first span:first').click()}"),config.timeout);
        driver.wait(driver.executeScript("if($('div[ng-repeat=\"(id, value) in vm.allowedServiceTypes\"]:has(label:contains(\"Unloading Help\")):first input:last').hasClass('ng-not-empty')){" +
            "return true;}else{$('div[ng-repeat=\"(id, value) in vm.allowedServiceTypes\"]:has(label:contains(\"Unloading Help\")):first span:last').click()}"),config.timeout);
        SF.sleep(0.5);
        driver.wait(driver.executeScript("if($('div[ng-repeat=\"(id, value) in vm.allowedServiceTypes\"]:has(label:contains(\"Flat Rate\")):first input:first').hasClass('ng-not-empty')){" +
            "return true;}else{$('div[ng-repeat=\"(id, value) in vm.allowedServiceTypes\"]:has(label:contains(\"Flat Rate\")):first span:first').click()}"),config.timeout);
        driver.wait(driver.executeScript("if($('div[ng-repeat=\"(id, value) in vm.allowedServiceTypes\"]:has(label:contains(\"Flat Rate\")):first input:last').hasClass('ng-not-empty')){" +
            "return true;}else{$('div[ng-repeat=\"(id, value) in vm.allowedServiceTypes\"]:has(label:contains(\"Flat Rate\")):first span:last').click()}"),config.timeout);
        SF.sleep(0.5);
        driver.wait(driver.executeScript("if($('div[ng-repeat=\"(id, value) in vm.allowedServiceTypes\"]:has(label:contains(\"Overnight\")):first input:first').hasClass('ng-not-empty')){" +
            "return true;}else{$('div[ng-repeat=\"(id, value) in vm.allowedServiceTypes\"]:has(label:contains(\"Overnight\")):first span:first').click()}"),config.timeout);
        driver.wait(driver.executeScript("if($('div[ng-repeat=\"(id, value) in vm.allowedServiceTypes\"]:has(label:contains(\"Overnight\")):first input:last').hasClass('ng-not-empty')){" +
            "return true;}else{$('div[ng-repeat=\"(id, value) in vm.allowedServiceTypes\"]:has(label:contains(\"Overnight\")):first span:last').click()}"),config.timeout);
        SF.sleep(0.5);
        driver.wait(driver.executeScript("if($('div[ng-repeat=\"(id, value) in vm.allowedServiceTypes\"]:has(label:contains(\"Long Distance\")):first input:first').hasClass('ng-not-empty')){" +
            "return true;}else{$('div[ng-repeat=\"(id, value) in vm.allowedServiceTypes\"]:has(label:contains(\"Long Distance\")):first span:first').click()}"),config.timeout);
        driver.wait(driver.executeScript("if($('div[ng-repeat=\"(id, value) in vm.allowedServiceTypes\"]:has(label:contains(\"Long Distance\")):first input:last').hasClass('ng-not-empty')){" +
            "return true;}else{$('div[ng-repeat=\"(id, value) in vm.allowedServiceTypes\"]:has(label:contains(\"Long Distance\")):first span:last').click()}"),config.timeout);
        driver.wait(driver.executeScript("if($('div[ng-repeat=\"(id, value) in vm.allowedServiceTypes\"]:has(label:contains(\"Packing Day\")):first input:first').hasClass('ng-not-empty')){" +
            "return true;}else{$('div[ng-repeat=\"(id, value) in vm.allowedServiceTypes\"]:has(label:contains(\"Packing Day\")):first span:first').click()}"),config.timeout);
        driver.wait(driver.executeScript("if($('div[ng-repeat=\"(id, value) in vm.allowedServiceTypes\"]:has(label:contains(\"Packing Day\")):first input:last').hasClass('ng-not-empty')){" +
            "return true;}else{$('div[ng-repeat=\"(id, value) in vm.allowedServiceTypes\"]:has(label:contains(\"Packing Day\")):first span:last').click()}"),config.timeout);
        driver.wait(driver.executeScript("if($('div[ng-repeat=\"(id, value) in vm.allowedServiceTypes\"]:has(label:contains(\"Commercial Move\")):first input:first').hasClass('ng-not-empty')){" +
            "return true;}else{$('div[ng-repeat=\"(id, value) in vm.allowedServiceTypes\"]:has(label:contains(\"Commercial Move\")):first span:first').click()}"),config.timeout);
        driver.wait(driver.executeScript("if($('div[ng-repeat=\"(id, value) in vm.allowedServiceTypes\"]:has(label:contains(\"Commercial Move\")):first input:last').hasClass('ng-not-empty')){" +
            "return true;}else{$('div[ng-repeat=\"(id, value) in vm.allowedServiceTypes\"]:has(label:contains(\"Commercial Move\")):first span:last').click()}"),config.timeout);
        SF.sleep(2);
        JS.scroll('.pageheader');
    }
    function CalculatorSettings_ShowQuoteTurnOFF() {
        SF.sleep(1);
        driver.wait(driver.executeScript("if($('input[ng-model=\"vm.calcSettings.calcauto\"]').hasClass('ng-empty')){" +
            "return true;}else{$('input[ng-model=\"vm.calcSettings.calcauto\"] ~span').click()}"),config.timeout);
        SF.sleep(0.5);
        driver.wait(driver.executeScript("if($('div[ng-repeat=\"(id, value) in vm.allowedServiceTypes\"]:has(label:contains(\"Moving\")):first input:first').hasClass('ng-empty')){" +
            "return true;}else{$('div[ng-repeat=\"(id, value) in vm.allowedServiceTypes\"]:has(label:contains(\"Moving\")):first span:first').click()}"),config.timeout);
        driver.wait(driver.executeScript("if($('div[ng-repeat=\"(id, value) in vm.allowedServiceTypes\"]:has(label:contains(\"Moving\")):first input:last').hasClass('ng-empty')){" +
            "return true;}else{$('div[ng-repeat=\"(id, value) in vm.allowedServiceTypes\"]:has(label:contains(\"Moving\")):first span:last').click()}"),config.timeout);
        SF.sleep(0.5);
        driver.wait(driver.executeScript("if($('div[ng-repeat=\"(id, value) in vm.allowedServiceTypes\"]:has(label:contains(\"Moving & Storage\")):first input:first').hasClass('ng-empty')){" +
            "return true;}else{$('div[ng-repeat=\"(id, value) in vm.allowedServiceTypes\"]:has(label:contains(\"Moving & Storage\")):first span:first').click()}"),config.timeout);
        driver.wait(driver.executeScript("if($('div[ng-repeat=\"(id, value) in vm.allowedServiceTypes\"]:has(label:contains(\"Moving & Storage\")):first input:last').hasClass('ng-empty')){" +
            "return true;}else{$('div[ng-repeat=\"(id, value) in vm.allowedServiceTypes\"]:has(label:contains(\"Moving & Storage\")):first span:last').click()}"),config.timeout);
        SF.sleep(0.5);
        driver.wait(driver.executeScript("if($('div[ng-repeat=\"(id, value) in vm.allowedServiceTypes\"]:has(label:contains(\"Loading Help\")):first input:first').hasClass('ng-empty')){" +
            "return true;}else{$('div[ng-repeat=\"(id, value) in vm.allowedServiceTypes\"]:has(label:contains(\"Loading Help\")):first span:first').click()}"),config.timeout);
        driver.wait(driver.executeScript("if($('div[ng-repeat=\"(id, value) in vm.allowedServiceTypes\"]:has(label:contains(\"Loading Help\")):first input:last').hasClass('ng-empty')){" +
            "return true;}else{$('div[ng-repeat=\"(id, value) in vm.allowedServiceTypes\"]:has(label:contains(\"Loading Help\")):first span:last').click()}"),config.timeout);
        SF.sleep(0.5);
        driver.wait(driver.executeScript("if($('div[ng-repeat=\"(id, value) in vm.allowedServiceTypes\"]:has(label:contains(\"Unloading Help\")):first input:first').hasClass('ng-empty')){" +
            "return true;}else{$('div[ng-repeat=\"(id, value) in vm.allowedServiceTypes\"]:has(label:contains(\"Unloading Help\")):first span:first').click()}"),config.timeout);
        driver.wait(driver.executeScript("if($('div[ng-repeat=\"(id, value) in vm.allowedServiceTypes\"]:has(label:contains(\"Unloading Help\")):first input:last').hasClass('ng-empty')){" +
            "return true;}else{$('div[ng-repeat=\"(id, value) in vm.allowedServiceTypes\"]:has(label:contains(\"Unloading Help\")):first span:last').click()}"),config.timeout);
        SF.sleep(0.5);
        driver.wait(driver.executeScript("if($('div[ng-repeat=\"(id, value) in vm.allowedServiceTypes\"]:has(label:contains(\"Flat Rate\")):first input:first').hasClass('ng-empty')){" +
            "return true;}else{$('div[ng-repeat=\"(id, value) in vm.allowedServiceTypes\"]:has(label:contains(\"Flat Rate\")):first span:first').click()}"),config.timeout);
        driver.wait(driver.executeScript("if($('div[ng-repeat=\"(id, value) in vm.allowedServiceTypes\"]:has(label:contains(\"Flat Rate\")):first input:last').hasClass('ng-empty')){" +
            "return true;}else{$('div[ng-repeat=\"(id, value) in vm.allowedServiceTypes\"]:has(label:contains(\"Flat Rate\")):first span:last').click()}"),config.timeout);
        SF.sleep(0.5);
        driver.wait(driver.executeScript("if($('div[ng-repeat=\"(id, value) in vm.allowedServiceTypes\"]:has(label:contains(\"Overnight\")):first input:first').hasClass('ng-empty')){" +
            "return true;}else{$('div[ng-repeat=\"(id, value) in vm.allowedServiceTypes\"]:has(label:contains(\"Overnight\")):first span:first').click()}"),config.timeout);
        driver.wait(driver.executeScript("if($('div[ng-repeat=\"(id, value) in vm.allowedServiceTypes\"]:has(label:contains(\"Overnight\")):first input:last').hasClass('ng-empty')){" +
            "return true;}else{$('div[ng-repeat=\"(id, value) in vm.allowedServiceTypes\"]:has(label:contains(\"Overnight\")):first span:last').click()}"),config.timeout);
        SF.sleep(0.5);
        driver.wait(driver.executeScript("if($('div[ng-repeat=\"(id, value) in vm.allowedServiceTypes\"]:has(label:contains(\"Long Distance\")):first input:first').hasClass('ng-empty')){" +
            "return true;}else{$('div[ng-repeat=\"(id, value) in vm.allowedServiceTypes\"]:has(label:contains(\"Long Distance\")):first span:first').click()}"),config.timeout);
        driver.wait(driver.executeScript("if($('div[ng-repeat=\"(id, value) in vm.allowedServiceTypes\"]:has(label:contains(\"Long Distance\")):first input:last').hasClass('ng-empty')){" +
            "return true;}else{$('div[ng-repeat=\"(id, value) in vm.allowedServiceTypes\"]:has(label:contains(\"Long Distance\")):first span:last').click()}"),config.timeout);
        driver.wait(driver.executeScript("if($('div[ng-repeat=\"(id, value) in vm.allowedServiceTypes\"]:has(label:contains(\"Packing Day\")):first input:first').hasClass('ng-empty')){" +
            "return true;}else{$('div[ng-repeat=\"(id, value) in vm.allowedServiceTypes\"]:has(label:contains(\"Packing Day\")):first span:first').click()}"),config.timeout);
        driver.wait(driver.executeScript("if($('div[ng-repeat=\"(id, value) in vm.allowedServiceTypes\"]:has(label:contains(\"Packing Day\")):first input:last').hasClass('ng-empty')){" +
            "return true;}else{$('div[ng-repeat=\"(id, value) in vm.allowedServiceTypes\"]:has(label:contains(\"Packing Day\")):first span:last').click()}"),config.timeout);
        driver.wait(driver.executeScript("if($('div[ng-repeat=\"(id, value) in vm.allowedServiceTypes\"]:has(label:contains(\"Commercial Move\")):first input:first').hasClass('ng-empty')){" +
            "return true;}else{$('div[ng-repeat=\"(id, value) in vm.allowedServiceTypes\"]:has(label:contains(\"Commercial Move\")):first span:first').click()}"),config.timeout);
        driver.wait(driver.executeScript("if($('div[ng-repeat=\"(id, value) in vm.allowedServiceTypes\"]:has(label:contains(\"Commercial Move\")):first input:last').hasClass('ng-empty')){" +
            "return true;}else{$('div[ng-repeat=\"(id, value) in vm.allowedServiceTypes\"]:has(label:contains(\"Commercial Move\")):first span:last').click()}"),config.timeout);
        SF.sleep(3);
        JS.scroll('.pageheader');
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
        AccountLocalAddInventoryWhenCalcOff:AccountLocalAddInventoryWhenCalcOff,
        AccountLocalAddAdditionalInventory: AccountLocalAddAdditionalInventory,
        AccountLocalAddAdditionalInventoryWhenCalcOff:AccountLocalAddAdditionalInventoryWhenCalcOff,
        Account_DeleteInventory:Account_DeleteInventory,
        ContractAdditionalInventoryAdd: ContractAdditionalInventoryAdd,
        AccountFlatRateAddInventory: AccountFlatRateAddInventory,
        AddInventory_InHomeEstimate: AddInventory_InHomeEstimate,
        AccountLocalDetails: AccountLocalDetails,
        AccountLoadingDetails: AccountLoadingDetails,
        AccountUnLoadingDetails: AccountUnLoadingDetails,
        Account_LongDistanceDetailsAdd:Account_LongDistanceDetailsAdd,
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
        CreateLocalMoveFromFrontDown:CreateLocalMoveFromFrontDown,
        CreateLongDistanceFromFrontDown:CreateLongDistanceFromFrontDown,
        CreatePackingDayDownForm:CreatePackingDayDownForm,
        CreateUnloadingHelpDownForm: CreateUnloadingHelpDownForm,
        CreateLoadingHelpDownForm: CreateLoadingHelpDownForm,
        CreateOvernightDownForm: CreateOvernightDownForm,
        CreateLocalMovingFromBoard: CreateLocalMovingFromBoard,
        CreateOvernightFromBoard: CreateOvernightFromBoard,
        CreateMovAndStorFromBoard: CreateMovAndStorFromBoard,
        CreateLoadingHelpFromBoard: CreateLoadingHelpFromBoard,
        CreatePackingDayFromBoard: CreatePackingDayFromBoard,
        CreateFlatRateDownForm: CreateFlatRateDownForm,
        CreateStorageTenant: CreateStorageTenant,
        CreateFlatRateFromBoard: CreateFlatRateFromBoard,
        CreateLongDistanceFromBoard: CreateLongDistanceFromBoard,
        CreateLongDistanceFromBoardWithCommercialMoveSizeAndStairs:CreateLongDistanceFromBoardWithCommercialMoveSizeAndStairs,
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
        Validation_Compare_Account_Admin_WhenSetNewRate:Validation_Compare_Account_Admin_WhenSetNewRate,
        Validation_Compare_Admin_HomePortal:Validation_Compare_Admin_HomePortal,
        Validation_Compare_CarrierInfo:Validation_Compare_CarrierInfo,
        Validation_Compare_SITstorageInfo:Validation_Compare_SITstorageInfo,
        RememberAndCompare_Admin_ConfirmationPage_LongDistance:RememberAndCompare_Admin_ConfirmationPage_LongDistance,
        CheckDisabledCrewInSameWork: CheckDisabledCrewInSameWork,
        CheckDisabledCrewInWorkWithSameStartTime: CheckDisabledCrewInWorkWithSameStartTime,
        CheckWorkersInAdCrew: CheckWorkersInAdCrew,
        CheckCrewInCrewPreview: CheckCrewInCrewPreview,
        CheckWorkersInAddNewWorkerList: CheckWorkersInAddNewWorkerList,
        SetManager: SetManager,
        SetClientPasswd: SetClientPasswd,
        FillCardPayModal: FillCardPayModal,
        InvoiceOnlinePayment: InvoiceOnlinePayment,
        FillCardPayModalBuyCoupon: FillCardPayModalBuyCoupon,
        MakeSignJS: MakeSignJS,
        ConfirmRequestInAccount_WithReservation: ConfirmRequestInAccount_WithReservation,
        ConfirmRequestInAccount_NoReservation: ConfirmRequestInAccount_NoReservation,
        ConfirmRequestInAccount_AfterReservationFromBoard:ConfirmRequestInAccount_AfterReservationFromBoard,
        ConfirmRequestInAccount_WithReservationWithAdress: ConfirmRequestInAccount_WithReservationWithAdress,
//Permissions for Sales --- start
        PermissionsClear: PermissionsClear,
        AdminPermissionsClear: AdminPermissionsClear,
        PermissionCanSeeOtherLeads: PermissionCanSeeOtherLeads,
        PermissionCanSearchOtherLeads: PermissionCanSearchOtherLeads,
        PermissionCanEditOtherLeads: PermissionCanEditOtherLeads,
        PermissionCanSeeUnsignedLeads: PermissionCanSeeUnsignedLeads,
        PermissionCanSignedSales: PermissionCanSignedSales,
        AdminPermissionsTurnOn:AdminPermissionsTurnOn,
//Permissions for Sales --- end
        closeEditRequest: closeEditRequest,
        SelectRequestDispatch: SelectRequestDispatch,
        OpenRequestDispatch: OpenRequestDispatch,
        OpenRequestInForemanPage: OpenRequestInForemanPage,
        selectCrew: selectCrew,
        selectBigCrew: selectBigCrew,
        createNewTeam: createNewTeam,
        selectNewTeam: selectNewTeam,
        deleteTeam: deleteTeam,
        selectCrewFlatRatePickUp: selectCrewFlatRatePickUp,
        selectCrewFlatRateDelivery: selectCrewFlatRateDelivery,
        MakeSignInContract: MakeSignInContract,
        MakeSignInAddContract:MakeSignInAddContract,
        MakeSignInContractFlatRate:MakeSignInContractFlatRate,
        MakeSignInInventory: MakeSignInInventory,
        MakeSignInAddInventory : MakeSignInAddInventory,
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
        HomeEstimate_SalesGoInPortalandOpenRequest: HomeEstimate_SalesGoInPortalandOpenRequest,
        HomeEstimate_ReservationPage: HomeEstimate_ReservationPage,
        HomeEstimate_EditClientInfo:  HomeEstimate_EditClientInfo,
        EditRequest_EditRateCalculOff:EditRequest_EditRateCalculOff,
        EditRequest_EditCrewCalculOff:EditRequest_EditCrewCalculOff,
        EditRequest_SetMaxWorkTimeAndTravelTimeWhenCalcOff:EditRequest_SetMaxWorkTimeAndTravelTimeWhenCalcOff,
        LongDistanceSettings_SetDiscounts:LongDistanceSettings_SetDiscounts,
        LongDistanceSettings_AddLDStatusFlag:LongDistanceSettings_AddLDStatusFlag,
        payRentalInventoryCash:payRentalInventoryCash,
        PayCheck:PayCheck,
        SendClientInfoForDraftRequest:SendClientInfoForDraftRequest,


        ProfitLoss_AddExpense: ProfitLoss_AddExpense,

        MailRu_Login:MailRu_Login,
        Gmail_Login:Gmail_Login,
        AccountFR_SeelectOptions:AccountFR_SeelectOptions,
        EditRequest_AddPacking: EditRequest_AddPacking,
        EditRequest_AddPackingAndFullPAcking:EditRequest_AddPackingAndFullPAcking,
        EditRequest_AddPartialPacking: EditRequest_AddPartialPacking,
        EditRequest_AddFullPacking: EditRequest_AddFullPacking,
        EditRequest_AddAdditionalServicesFullPack: EditRequest_AddAdditionalServicesFullPack,
        EditRequest_AddValuation: EditRequest_AddValuation,
        EditRequest_AddPackingClosingTab:EditRequest_AddPackingClosingTab,
        EditRequest_AddSpecialPackingClosingTab:EditRequest_AddSpecialPackingClosingTab,
        EditRequest_AddAdditionalServClosingTab:EditRequest_AddAdditionalServClosingTab,
        EditRequest_AddAdditionalServSalesTab:EditRequest_AddAdditionalServSalesTab,
        BoardRequestPage_SetStartEndDate:BoardRequestPage_SetStartEndDate,
        EditStorage_AddLotNumber: EditStorage_AddLotNumber,
        EditRequest_AddCustomCommersialMove:EditRequest_AddCustomCommersialMove,
        EditRequest_AddPAckingOnClosingTab:EditRequest_AddPAckingOnClosingTab,
        Contract_CheckOriginBlockNameZip:Contract_CheckOriginBlockNameZip,
        Contract_CheckDestinationBlockNameZip:Contract_CheckDestinationBlockNameZip,
        AddPackingOnContract:AddPackingOnContract,
        PaymentCollected_ChooseCurrentDateStartEnd:PaymentCollected_ChooseCurrentDateStartEnd,
        FlatRateEditRequest_SendDeliveryDates:FlatRateEditRequest_SendDeliveryDates,
        Schedule_CheckFlatRateTruck:Schedule_CheckFlatRateTruck,
        AccountFlatRate_ChoosePickupAndDeliveryDate:AccountFlatRate_ChoosePickupAndDeliveryDate,
        Payroll_SetDeliveryDateOnlyFlatRate:Payroll_SetDeliveryDateOnlyFlatRate,
        AccountFlatRate_SendTwoPrefferedDate:AccountFlatRate_SendTwoPrefferedDate,
        AccountFlatRate_AddExtraPickupAndDropOff:AccountFlatRate_AddExtraPickupAndDropOff,
        EditRequest_AddCustomPacking:EditRequest_AddCustomPacking,
        EditRequest_ChangeMoveDate:EditRequest_ChangeMoveDate,
        EditRequest_SetFirstDeliveryDay:EditRequest_SetFirstDeliveryDay,
        EditRequest_SetScheduleDeliveryDate:EditRequest_SetScheduleDeliveryDate,
        EditRequest_SetInHomeEstimateDate:EditRequest_SetInHomeEstimateDate,
        SIT_CreateCarrier:SIT_CreateCarrier,
        SIT_CreateCustomPaymentInTPcollectedInClosing:SIT_CreateCustomPaymentInTPcollectedInClosing,
        EditRequest_AddAdditionalContact:EditRequest_AddAdditionalContact,
        SIT_SetDateTripForemanHelper:SIT_SetDateTripForemanHelper,
        SIT_CreateStorage:SIT_CreateStorage,
        EditRequest_CustomPay:EditRequest_CustomPay,
        EditRequest_CustomPayCreditCard:EditRequest_CustomPayCreditCard,
        CalculatorSettings_ShowQuoteTurnON:CalculatorSettings_ShowQuoteTurnON,
        CalculatorSettings_ShowQuoteTurnOFF:CalculatorSettings_ShowQuoteTurnOFF,
    };
};
