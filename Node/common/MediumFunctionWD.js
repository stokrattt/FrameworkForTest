module.exports = function (SF, JS, JSstep, VD, V, By, until,FileDetector, system, condition, config, constants) {
    function WaitWhileToaster() {
        JS.waitForNotExist('div.toast-message:visible');
        JS.waitForNotExist('div.toast-success:visible');
    }
    function WaitWhileBusy() {
        SF.sleep(1);
        JS.waitForNotExist('.busyoverlay:visible');
        SF.sleep(1);
    }
    function WaitWhileSpinner() {
        SF.sleep(1);
        JS.waitForNotExist ('.spinner:visible');
        SF.sleep(1);
    }

    function SweetConfirm() {
        JS.waitForExist('button.confirm');
        SF.sleep(2);
        SF.click(By.xpath('//button[@class="confirm"]'));
    }

    function SweetCancel() {
        JS.waitForExist('div.showSweetAlert button.cancel:visible');
        SF.sleep(1);
        JS.click('div.showSweetAlert button.cancel:visible');
    }
    function BoardAccount_SendMessage(text) {
        SF.send (By.xpath('//div[@ng-model="html"]'), text);
        SF.sleep(0.5);
        SF.click (By.xpath('//button[@ng-click="addMessage()"]'));
        SF.sleep(2);
    }
    //================================MAIL.RU=======================================
    function MailRu_Login(login, password){
        SF.send(By.xpath('//input[@id="mailbox__login"]'),login);
        SF.send(By.xpath('//input[@id="mailbox__password"]'),password);
        SF.click(By.xpath('//input[@id="mailbox__auth__button"]'));
        SF.waitForVisible(By.xpath('//div[contains(@class,"b-datalist__item")]'));
        SF.sleep(1);
    }
    function MailRu_CheckEmailExistBySubject(subject){
        driver.wait(driver.wait(driver.findElements(By.xpath('//a[@data-subject="'+subject+'"]')),config.timeout).then(function(elements){
            VD.IWant(VD.ToEqual, elements.length,1,'письмо не дошло');
        }),config.timeout);
    }


    ///===============================Profit and loss===============================

    function ProfitLoss_AddExpense(suma, categoria, notes) {
        SF.click(By.xpath('//button[@ng-click="vm.createExpense()"]'));
        WaitWhileBusy ();
        SF.click(By.xpath('//input[@ng-model="expense.amount"]'));
        SF.send(By.xpath('//input[@ng-model="expense.amount"]'), suma);
        SF.select(By.xpath('//select[@ng-model="expense.category"]'), categoria);
        SF.send(By.xpath('//textarea[@ng-model="expense.notes"]'), notes);
        SF.click(By.xpath('//button[@ng-click="saveExpense()"]'));
        SweetConfirm ();
        SweetConfirm ();
        WaitWhileBusy ();
    }

    ///===============================BOARD=========================================

    function Board_LogoutAdmin() {
        JS.waitForNotExist('div.toast-success');
        JS.waitForNotExist('div.toast-message');
		WaitWhileBusy ();
		SF.sleep(1);
		JS.scroll('a[ng-click=\"vm.Logout()\"]');
        SF.click(By.xpath('//a[@ng-click="vm.Logout()"]/../../preceding-sibling::*[1]'));
        SF.sleep(1);
        SF.click(By.xpath('//a[@ng-click="vm.Logout()"]'));
        SF.waitForVisible(By.xpath('//form[@ng-submit="login()"]'));
        SF.sleep(5);
    }
    function Board_ClickCreate(){
        SF.click(By.linkText('Create Request'));
        JS.waitForExist('select[ng-model=\\"editrequest.data.field_move_service_type\\"]');
        SF.sleep(2);
    }
    function Board_OpenStatistic() {
        Board_OpenSideBar ();
        SF.click(By.xpath('//a[@ng-click="vm.goToPage(\'statistics.byrole\', \'\')"]'));
        SF.sleep(2);
    }
    function Board_OpenProfitLoss() {
        SF.click(By.xpath('//a[@ui-sref="statistics.ProfitLose"]'));
        SF.sleep(2);
        WaitWhileBusy ();
    }

    function Board_OpenSideBar() {
        SF.click(By.xpath("//button[@ng-click=\"toggleLeft()\"]"));
        SF.waitForVisible(By.xpath('//button[@ng-click="toggleLeft()"]'));
    }
    function Board_OpenAllRequest() {
        Board_OpenSideBar();
        SF.click(By.xpath('//a[@ng-click="vm.goToPage(\'requests.child\')"]'));
        WaitWhileBusy ();
    }
    function Board_OpenStorages() {
        SF.click(By.xpath('//a[@ng-click="vm.goToPage(\'storages.pending\', \'\')"]'));
        WaitWhileBusy ();
        SF.sleep (3);
        WaitWhileBusy ();
    }
    function Board_OpenStorage() {
        Board_OpenSideBar ();
        SF.click(By.xpath('//a[@ng-click="vm.goToPage(\'storages.pending\', \'\')"]'));
        SF.sleep (3);
        SF.click(By.xpath('//a[@ui-sref="storages.storage"]'));
        WaitWhileBusy ();
        SF.sleep (3);
        WaitWhileBusy ();
    }
    function Board_OpenStoragesTenant() {
        Board_OpenSideBar ();
        SF.click(By.xpath('//a[@ng-click="vm.goToPage(\'storages.pending\', \'\')"]'));
        SF.sleep (3);
        SF.click(By.xpath('//a[@ui-sref="storages.tenants"]'));
        WaitWhileBusy ();
        SF.sleep (3);
        WaitWhileBusy ();
    }
    function Board_OpenPayroll() {
        Board_OpenSideBar();
        SF.click(By.xpath("//a[@ng-click=\"vm.goToPage('dispatch.local', '')\"]"));
        SF.sleep(1);
        SF.click(By.xpath("//a[@ui-sref=\"dispatch.payroll\"]"));
        WaitWhileBusy();
    }
    function Board_OpenReviewSettings() {
        Board_OpenSideBar ();
        SF.click(By.xpath('//a[@ng-click="vm.goToPage(\'statistics.byrole\', \'\')"]'));
        SF.click(By.xpath('//a[@ui-sref="statistics.reviews"]'));
        SF.sleep(3);
    }

    function Board_OpenNotConfirmed() {
        SF.click(By.xpath('//div[@ng-click="vm.select(3)"]'));
        SF.sleep(3);
    }
    function Board_OpenPendingRequest() {
        SF.click(By.xpath('//div[@ng-click="vm.select(0)"]'));
        SF.sleep(3);
    }
    function Board_OpenConfirmed() {
        SF.click(By.xpath('//div[@ng-click="vm.select(2)"]'));
        SF.sleep(3);
    }

    function Board_OpenSettingsSchedule() {
        Board_OpenSideBar();
        SF.click(By.xpath('//a[@ng-click="vm.goToPage(\'settings.general\', \'\')"]'));
        SF.sleep(2);
        SF.click(By.xpath('//a[@ui-sref="settings.schedule"]'));
        SF.sleep(2);
    }
    function Board_OpenCompanyServices() {
        Board_OpenSideBar();
        SF.click(By.xpath('//a[@ng-click="vm.goToPage(\'settings.general\', \'\')"]'));
        SF.sleep(2);
        JS.scroll ('a:contains("Calendar")');
        SF.sleep(1);
        SF.click(By.xpath('(//a[@ng-click="vm.select(tab)"])[10]'));
        JS.waitForExist('input[ng-model=\\"vm.basicSettings.services.localMoveOn\\"]');
        SF.sleep(4);
    }

    function Board_OpenSchedule() {
        Board_OpenSideBar ();
        SF.click(By.xpath('//li[@ng-show="vm.PermissionsServices.hasPermission(\'canSeeScheduleMenu\')"]'));
        JS.waitForNotExist('div.busyoverlay:visible');
        SF.sleep(3);
        JS.waitForNotExist('div.busyoverlay:visible');
        SF.sleep(4);
    }

    function Board_OpenSettingsGeneral() {
        Board_OpenSideBar();
        SF.click(By.xpath('//a[@ng-click="vm.goToPage(\'settings.general\', \'\')"]'));
        SF.waitForVisible(By.xpath('//a[@ng-click="vm.goToPage(\'settings.general\', \'\')"]'));
        SF.sleep(2);
    }
	function Board_OpenSettingsRates() {
		Board_OpenSideBar();
		SF.click(By.xpath('//a[@ng-click="vm.goToPage(\'settings.general\', \'\')"]'));
		SF.waitForVisible(By.xpath('//a[@ng-click="vm.goToPage(\'settings.general\', \'\')"]'));
		SF.sleep(2);
		SF.click(By.xpath('(//li[@ng-repeat="tab in vm.tabs"]/a[@ng-click="vm.select(tab)"])[3]'));
		SF.waitForVisible(By.xpath('//input[@ng-change="vm.saveRates()"]'));
		SF.sleep(1);
	}
    function Board_OpenSettingsAccountPageCustomBlock() {
        SF.click(By.xpath('//a[@ui-sref="settings.accountPageSettings"]'));
        SF.sleep(3);
        SF.click(By.xpath('//li[@ng-repeat="menu in vm.menu"][5]'));
        SF.sleep(2);
    }
    function Board_OpenSettingsAccountPageCustomTooltips() {
        SF.click(By.xpath('//a[@ui-sref="settings.accountPageSettings"]'));
        SF.sleep(3);
        SF.click(By.xpath('//li[@ng-repeat="menu in vm.menu"][6]'));
        SF.sleep(2);
    }
    function Board_OpenSettingsAccountPageFlatRate() {
        SF.click(By.xpath('//a[@ui-sref="settings.accountPageSettings"]'));
        SF.sleep(3);
        SF.click(By.xpath('//li[@ng-repeat="menu in vm.menu"][2]'));
        SF.sleep(2);
    }
    function Board_OpenSettingsLongDistance() {
        SF.click(By.xpath('//a[@ui-sref="settings.longdistance"]'));
        SF.waitForVisible (By.xpath('//a[@ui-sref="settings.longdistance"]'));
        SF.sleep (4);
    }

    function Board_OpenSettingsDepartment() {
        Board_OpenSettingsGeneral();
        SF.click(By.xpath('//a[@ui-sref="settings.department"]'));
        SF.waitForVisible(By.xpath('//a[@ui-sref="settings.department"]'));
        SF.sleep(3);
        WaitWhileBusy();
    }
    function Board_OpenSettingsTemplateBuilder() {
        Board_OpenSettingsGeneral();
        SF.click(By.xpath('//a[@ui-sref="settings.templatebuilder"]'));
        SF.waitForVisible(By.xpath('//a[@ui-sref="settings.templatebuilder"]'));
        SF.sleep(3);
    }
	function Board_OpenSettingsCalculator() {
		Board_OpenSettingsGeneral();
		SF.click(By.xpath('//a[@ui-sref="settings.calculator"]'));
		SF.waitForVisible(By.xpath('//h3[contains(text(),"Test Calculator")]'));
		SF.sleep(3);
	}
    function Board_OpenDashboard() {
        SF.click(By.xpath('//a[@ui-sref="dashboard"]'));
        SF.sleep(2);
        WaitWhileBusy ();
    }
    function Board_RefreshDashboard(){
		WaitWhileBusy ();
		SF.sleep(1);
		WaitWhileBusy ();
        SF.click (By.xpath('//i[@ng-click="vm.refreshDashboard();"]'));
        WaitWhileBusy ();
        SF.sleep (1);
    }
    function Board_SearchRequest(selector){
        SF.clear (By.id('gSearch'));
        SF.send (By.id('gSearch'), selector);
        SF.waitForLocated (By.xpath('//div[@ng-show="searchRequests.length"]'));
    }
    function Board_SearchOpenRequest(request) {
        SF.click(By.xpath('//div[@ng-bind-html="request.nid | searchfilter:search"]/span[contains(text(),"' + request.Id + '")]/..'));
        SF.waitForVisible(By.xpath('//div[@ng-click="chooseTruck(tid)"]'));
        WaitWhileBusy ();
        SF.sleep(1);
    }
    function Board_GetFirstFoundedId(request){
        SF.waitForLocated(By.xpath('//div[@class="requestsid ng-binding"]'));
        WaitWhileBusy();
        driver.wait(driver.findElement(By.xpath('//div[@class="requestsid ng-binding"]')).getText().then (function(text){
            request.Id = text;
        }), config.timeout);
        SF.sleep(1);
    }
    function Board_Refresh(){
        driver.navigate().refresh();
        SF.waitForLocated(By.linkText('Create Request'));
        SF.sleep (3);
        WaitWhileBusy();
    }
    function Board_OpenCourier() {
        SF.sleep(1);
        SF.click(By.xpath('//a[@ng-click="vm.goToPage(\'lddispatch.trip\', \'\')"]'));
        SF.sleep(1);
        SF.click(By.xpath('//a[@ui-sref="lddispatch.couriers"]'));
        SF.sleep(2);
    }
    function Board_OpenAgentFolio() {
        SF.sleep(1);
        SF.click(By.xpath('//a[@ng-click="vm.goToPage(\'lddispatch.trip\', \'\')"]'));
        SF.sleep(1);
        SF.click(By.xpath('//a[@ui-sref="lddispatch.agentFolio"]'));
        SF.sleep(2);
    }
    function Board_OpenJobsInSIT() {
        SF.sleep(1);
        SF.click(By.xpath('//a[@ng-click="vm.goToPage(\'lddispatch.trip\', \'\')"]'));
        SF.sleep(1);
        SF.click(By.xpath('//a[@ui-sref="lddispatch.sitJobs"]'));
        SF.sleep(2);
    }
    function BoardSIT_OpenStorages() {
        SF.sleep(1);
        SF.click(By.xpath('//a[@ng-click="vm.goToPage(\'lddispatch.trip\', \'\')"]'));
        SF.sleep(1);
        SF.click(By.xpath('//a[@ui-sref="lddispatch.lddispatchStorages"]'));
        SF.sleep(2);
    }
    function Board_OpenPickup() {
        SF.sleep(1);
        SF.click(By.xpath('//a[@ng-click="vm.goToPage(\'lddispatch.trip\', \'\')"]'));
        SF.sleep(1);
        SF.click(By.xpath('//a[@ui-sref="lddispatch.pick_up"]'));
        SF.sleep(2);
    }
    function Board_OpenTripPlanner() {
        SF.click(By.xpath('//a[@ng-class="{active:vm.isCurrent(\'trip planner\')}"]'));
        SF.sleep(2);
    }
    function Board_OpenCarriersAndAgents() {
        SF.click(By.xpath('//a[@ng-class="{active:vm.isCurrent(\'carriers and agents\')}"]'));
    }
	function Board_OpenRequest(request) {
		WaitWhileBusy ();
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
		SF.waitForVisible(By.xpath('//div[@ng-click="chooseTruck(tid)"]'));
		WaitWhileBusy();
		SF.sleep(2);
		WaitWhileBusy();
	}
    function Board_OpenFirstRequest(){
		SF.click(By.xpath('//td[@ng-click="requestEditModal(request)"]'));
		SF.click(By.xpath('//td[@ng-click="requestEditModal(request)"]'));
		SF.waitForVisible(By.xpath('//div[@ng-click="chooseTruck(tid)"]'));
		WaitWhileBusy();
		SF.sleep(2);
		WaitWhileBusy();
    }

    function Board_CreateDraftRequest() {
        SF.click(By.xpath('//button[@ng-click="createDraft()"]'));
        SF.waitForVisible(By.xpath('//div[@ng-click="chooseTruck(tid)"]'));
        WaitWhileBusy();
        SF.sleep(2);
        WaitWhileBusy();
    }
    //==============================CALCULATOR SETTINGS===========================
    function CalculatorSettings_OpenBasicSettings(){
		SF.click(By.xpath('(//a[@ng-click="vm.select(tab)"])[2]'));
    }
	function CalculatorSettings_OpenTravelTime(){
        SF.click(By.xpath('//h1[contains(text(),"General Settings")]'));
		SF.click(By.xpath('(//a[@ng-click="vm.select(tab)"])[4]'));
		SF.waitForVisible(By.xpath("//h1[contains(text(),'Travel Time')]"));
	}
    function CalculatorSettings_CustomTrackSpeedTurnOff(){
		driver.wait(driver.findElement(By.xpath('//input[@ng-change="switchTruckSpeedEnabled()"]')).getAttribute('class').then(
		    function(value){
		        if (value.indexOf('ng-not-empty')!=-1){
		            driver.findElement(By.xpath('//input[@ng-change="switchTruckSpeedEnabled()"]/following-sibling::span[1]')).click();
                }
		    }
        ),config.timeout);
		SF.sleep(1);
    }
	function CalculatorSettings_CustomTrackSpeedTurnOn(){
		driver.wait(driver.findElement(By.xpath('//input[@ng-change="switchTruckSpeedEnabled()"]')).getAttribute('class').then(
			function(value){
				if (value.indexOf('ng-not-empty')==-1){
					driver.findElement(By.xpath('//input[@ng-change="switchTruckSpeedEnabled()"]/following-sibling::span[1]')).click();
				}
			}
		),config.timeout);
		SF.sleep(1);
	}
	function CalculatorSettings_SetCustomTrackSpeed(speed){
		SF.clear(By.xpath('//input[@ng-model="vm.calcSettings.customTrackSpeed.customSpeed"]'));
	    SF.send(By.xpath('//input[@ng-model="vm.calcSettings.customTrackSpeed.customSpeed"]'), speed);
		SF.click(By.xpath('//input[@ng-model="vm.calcSettings.customTrackSpeed.customSpeed"]/../preceding-sibling::*[1]'));
    }
	function CalculatorSettings_SetCustomTrackSpeedBorder(border){
		SF.clear(By.xpath('//input[@ng-model="vm.calcSettings.customTrackSpeed.useWhenDistMoreThan"]'));
		SF.send(By.xpath('//input[@ng-model="vm.calcSettings.customTrackSpeed.useWhenDistMoreThan"]'), border);
		SF.click(By.xpath('//input[@ng-model="vm.calcSettings.customTrackSpeed.useWhenDistMoreThan"]/../preceding-sibling::*[1]'));
	}
    //==============================ACCOUNT=======================================

    function Account_SubmitFlatRateAfterAddInventory() {
        JS.scroll ('#conf_send,#conf_block :visible');
        SF.sleep (2);
        SF.click (By.xpath('//button[@ng-click="submitFlatRate()"]'));
        JS.waitForExist('button.confirm:contains("OK")');
        SF.sleep (2);
        SF.click(By.xpath('//button[@class="confirm"][contains(text(),"OK")]'));
    }
    function Account_Refresh() {
        driver.navigate().refresh();
        SF.waitForLocated (By.id('tab_Move Overview'));
        SF.sleep(6);
        WaitWhileBusy();
    }
    function Account_ClickViewRequest() {
        SF.sleep(1);
        SF.waitForLocated(By.xpath('//button[@ng-click="cancel()"][contains(text(),"View request")]'));
        SF.click(By.xpath('//button[@ng-click="cancel()"][contains(text(),"View request")]'));
        SF.sleep(2);
        WaitWhileBusy ();
    }

    function Account_ClickPartialPacking() {
        SF.click(By.xpath('//label[@for="partial"]/input[@ng-model="vm.packing_service"]'));
    }

    function Account_CheckRequestStatus_NotConfirmed(Id) {
        SF.waitForVisible(By.xpath('//td[contains(text(),"' + Id + '")]/following-sibling::td[1]'));
        driver.wait(driver.findElement(By.xpath('//td[contains(text(),"' + Id + '")]/following-sibling::td[1]')).getText().then(function (Status) {
            VD.IWant(VD.ToEqual, Status, 'Not Confirmed');
        }), config.timeout);
    }
    function Account_CheckRequestStatus_Pending(Id) {
        SF.waitForVisible(By.xpath('//td[contains(text(),"' + Id + '")]/following-sibling::td[1]'));
        driver.wait(driver.findElement(By.xpath('//td[contains(text(),"' + Id + '")]/following-sibling::td[1]')).getText().then(function (Status) {
            VD.IWant(VD.ToEqual, Status, 'Pending');
        }), config.timeout);
    }

    function Account_ChooseOptionFlatRate() {
        SF.click(By.xpath('//button[@ng-click="vm.chooseOption(option)"]'));
        SF.sleep(2);
        SF.waitForLocated(By.xpath('//button[@ng-click="update()"]'));
        SF.sleep(1);
        SF.click(By.xpath('//button[@ng-click="update()"]'));
        WaitWhileBusy ();
        SF.sleep(1);
        SweetConfirm ();
        SF.sleep(3);
    }

    function Account_OpenRequest(Id) {
	    WaitWhileBusy ();
        SF.click(By.xpath('//td[contains(text(),"' + Id + '")]/following-sibling::td/button[contains(text(),"View")]'));
        SF.sleep(2);
        WaitWhileBusy();
    }
    function Account_OpenMessage() {
        SF.click (By.id('tab_Messages'));
        SF.sleep(2);
        WaitWhileBusy();
    }

    function Account_WaitForGreenTextAfterConfirm() {
        SF.waitForVisible(By.xpath('//div[contains(text(),"Your move is confirmed and scheduled")]'));
    }
    function Account_ClickViewConfirmationPage() {
		WaitWhileBusy();
		SF.sleep(2);
        SF.click(By.xpath('//a[contains(text(),"View confirmation page")]'));
        WaitWhileBusy();
    }
    function Account_CheckSignOnConfirmationPage(){
        SF.waitForVisible(By.xpath('//img[@ng-click="vm.openCardPhoto(image)"]'));
    }
    function Account_ConfirmationBackToRequest(){
        SF.click(By.xpath('//a[contains(text(),"Back To Request")]'));
        WaitWhileBusy();
    }

    function Account_WaitForInventoryCheck() {
        SF.waitForVisible(By.xpath('//li[@id="tab_Inventory"]//i[@class="icon-check"]'));
    }

    function Account_WaitForDetailsCheck() {
        SF.waitForVisible(By.xpath('//li[@id="tab_Details"]//i[@class="icon-check"]'));
    }

    function Account_ClickFromStorage() {
        SF.click(By.xpath('//a[@ng-click="vm.goToRequest(vm.request.storage_id)"]'));
        SF.sleep(2);
        WaitWhileBusy ();
    }
    function Account_ClickToStorage() {
        SF.click(By.xpath('//a[@ng-click="vm.goToRequest(vm.request.storage_id || vm.request.request_all_data.baseRequestNid)"]'));
        SF.sleep(2);
        WaitWhileBusy ();
    }
    function AccountConfirmationPage_ClickBackToRequest() {
        SF.click(By.id('printinerary'));
        SF.sleep(2);
        WaitWhileBusy ();
    }
    function PreferredPickUpDate(firstDate, secondDate) {
        SF.click(By.xpath('//td[@data-month="'+ firstDate.Month +'"]/a[contains(text(),"'+ firstDate.Day +'")]'));
        SF.click(By.xpath('//td[@data-month="'+ secondDate.Month +'"]/a[contains(text(),"'+ secondDate.Day +'")]'));
    }
    function PreferredDeliveryDate(firstDate, secondDate) {
        SF.click(By.xpath('//h4[contains(text(),"Preferred Delivery dates:")]/following-sibling::div[2]//td[@data-month="'+ firstDate.Month +'"]/a[contains(text(),"'+ firstDate.Day +'")]'));
        SF.click(By.xpath('//h4[contains(text(),"Preferred Delivery dates:")]/following-sibling::div[2]//td[@data-month="'+ secondDate.Month +'"]/a[contains(text(),"'+ secondDate.Day +'")]'));
    }

    //===================================CONTRACT===================================

    function Contract_WaitConfirmationPage() {
        JS.waitForExist('h1:contains("Confirmation Page"):visible');
    }

    function Contract_WaitBillOfLading() {
        SF.waitForVisible(By.xpath('//div[@id="main-contract"]//div[@class="empty-signature"]'));
    }

    function Contract_OpenBillOfLading() {
        WaitWhileBusy();
        SF.click(By.xpath('//li[@id="tab_Bill of lading"]'));

    }

    function Contract_DeclarationValueA() {
		WaitWhileBusy();
		SF.select(By.xpath('//select[@ng-model="data.declarationValue.selected"]'), 'a');
    }

    function Contract_ClickPay() {
        WaitWhileBusy ();
        SF.sleep(1);
        // SF.click(By.xpath('//div[@ng-click="applyPayment(paymentButton())"]'));
        JS.click('div[ng-click=\\"applyPayment(paymentButton())\\"]:visible');
        SF.sleep(1)
    }

    function Contract_ClickTips10() {
        SF.sleep(2);
        SF.click(By.xpath('//div[@ng-click="tipsPercChange(10); editField(\'tipsPercent\');"]'));
    }

    function Contract_ClickAddTips() {
        SF.sleep(2);
        SF.click(By.xpath('//div[contains(text(),"ADD TIPS")]/parent::div[@ng-click="tipsSelected()"]'));
    }

    function Contract_ClickPaymentInfo() {
        SF.sleep(1);
        SF.click(By.xpath('//button[@ng-click="goStepTwo();"]'));
    }

    function Contract_WaitForImageInput() {
        JS.waitForExist('input#inputImage');
    }

    function Contract_UploadImage(path) {
        SF.sleep(3);
        SF.send(By.xpath('//input[@id="inputImage"]'), path);
        SF.sleep(1);
    }

    function Contract_SaveImages() {
        SF.click(By.xpath('//button[contains(@ng-click,"saveFile()")]'));
        JS.waitForNotExist("button[ng-click=\"saveFile()\"]");
        JS.waitForNotExist('div.busyoverlay:visible');
        WaitWhileBusy();
        SF.sleep(2);
    }

    function Contract_Submit(contractNumbers) {
        WaitWhileBusy();
        driver.wait(driver.executeScript('return $(\'tr[ng-if="contract_page.paymentTax.creditCharge.state"] span\').text()').then(function (text) {
            contractNumbers.CreditCardPercentSumm = SF.cleanPrice(text);
            console.log(contractNumbers.CreditCardPercentSumm);
        }),config.timeout);
        SF.sleep(2);
        SF.click(By.xpath('//button[@ng-click="submitContractBtn({ isBtn: true })"]'));
        SF.sleep(25);
        SweetConfirm();

    }

    function Contract_ReturnToForeman() {
        JS.scroll('a:contains("Return to foreman page")');
        JS.waitForNotExist('div.busyoverlay:visible');
        SF.sleep(1);
        SF.click(By.xpath('//a[contains(text(),"Return to foreman page")]'));
        JS.waitForExist('li.dropdown.profile:visible');
    }

    function Contract_OpenInventory() {
        SF.click(By.xpath('//li[@id="tab_Inventory"]'));
        SF.waitForVisible(By.xpath('//h4[contains(text(),"household goods descriptive inventory")]'));
        SF.sleep(1);
    }

    function Contract_SetTapeNumber(num) {
        SF.clear(By.xpath('//input[@ng-model="data[fieldName].tapeNumbers"]'));
        SF.send(By.xpath('//input[@ng-model="data[fieldName].tapeNumbers"]'), num);
    }

    function Contract_SetTapeColorGreen(color) {
        SF.click(By.xpath('//button[@id="btn-append-to-body"]'));
        JS.click('li[ng-click="data[fieldName].tapeColor = \\\'' + color + '\\\'; saveInventory()"]');
    }

    function Contract_SubmitInventory() {
        SF.click(By.xpath('//button[@ng-click="saveInventory(\'submit\')"]'));
        SF.sleep(1);
    }

    function Contract_WaitForRental() {
        SF.waitForVisible(By.xpath('//input[@ng-model="data.agreement.phone"]'));
    }

    function Contract_SetRentalPhone(phone) {
        SF.send(By.xpath('//input[@ng-model="data.agreement.phone"]'), phone);
    }

    function Contract_SetRentalAddress(address) {
        SF.send(By.xpath('//input[@ng-model="data.agreement.address"]'), address);
    }

    function Contract_SetRentalZip(zip) {
        SF.send(By.xpath('//input[@ng-model="data.agreement.zipCode"]'), zip);
    }
    function Contract_CheckLoadBillOfLadding() {
        driver.wait(driver.findElement(By.xpath('//button[@ng-if="data.isSubmitted"]')).getText().then(function(text) {
            VD.IWant (VD.ToEqual, text, 'Job is Done', 'страница бил оф ладинг не загрузилась')
        }),config.timeout);
    }
    function Contract_ReviewClickStar(stars){
        SF.click(By.xpath('//li[@ng-repeat="star in stars"]['+stars+']'));
    }
    function Contract_ReviewTypeFeedback(text){
        SF.send(By.xpath('//textarea[@ng-model="feedBack.comments"]'), text);
    }
    function Contract_ReviesSend(){
        SF.click(By.xpath('//button[@ng-click="saveFeedBack()"]'));
        SweetConfirm();
    }
    //=================================EDIT STORAGE REQUEST=====================================

    function EditStorage_RememberId(storage) {
        driver.wait(driver.findElement(By.xpath('//a[@ng-click="tabs.setTab(1)"]/span')).getText().then(function(text){
            storage.Id = SF.cleanPrice(text);
        }),config.timeout);
        SF.sleep(1);
    }
    function EditStorage_OpenLedger() {
        SF.click(By.xpath('//a[@ng-click="tabs.setTab(4)"]'));
        SF.sleep(1);
    }
    function EditStorage_OpenLotNumbers() {
        SF.click(By.xpath('//a[@ng-click="tabs.setTab(6)"]'));
        SF.sleep(1);
    }
    function EditStorage_AddLotNumber() {
        SF.click(By.xpath('//button[@id="addColor"]'));
        SF.send(By.xpath('//input[@ng-model="lotNumber.number"]'), 'test');
        SF.click(By.xpath('//button[@id="colorPick"]'));
        SF.click(By.xpath('//button[@id="colorPick"]/following-sibling::ul/li[3]'));
        SF.send(By.xpath('//input[@ng-model="lotNumber.from"]'), 111111);
        SF.send(By.xpath('//input[@ng-model="lotNumber.to"]'), 222222);
        EditStorage_UpdateStorage ();
    }
    function EditStorage_UpdateStorage() {
        SF.click(By.xpath('//button[@ng-click="updateStorageRequest(data)"]'));
        WaitWhileBusy ();
        JS.waitForNotExist('div.toast-message:visible');
    }
    function EditStorage_SelectMoveIn() {
        SF.select (By.xpath('//select[@ng-model="data.rentals.status_flag"]'), 'string:2');
    }
    function EditStorage_OpenReccuring() {
        SF.click(By.xpath('//a[@ng-click="tabs.setTab(5)"]'));
        SF.sleep(1);
    }
    function EditStorage_StartReccuring() {
        JS.click('span[ng-hide=\\"data.recurring.start\\"]');
        JS.waitForNotExist ('div.busyoverlay:visible');
    }
    function EditStorage_CloseOpenModal() {
        SF.click(By.xpath('//button[@ng-click="closeModal()"]'));
        SF.sleep (3);
    }
    function StorageTenant_OpenStorages(Id) {
        driver.wait(driver.findElement(By.xpath('//tr[@ng-click="openModal(request, id)"]/td[contains(text(),"' + Id + '")]')).click(), config.timeout);
        driver.wait(driver.findElement(By.xpath('//tr[@ng-click="openModal(request, id)"]/td[contains(text(),"' + Id + '")]')).click(), config.timeout);
        WaitWhileBusy ();
    }
    function EditStorage_OpenDocuments() {
        SF.click(By.xpath('//a[@ng-click="tabs.setTab(2)"]'));
    }
    //================================EDIT REQUEST====================================

    function EditRequest_OpenSettings() {
        SF.click(By.xpath('//a[@ng-click="select(tabs[7])"]'));
        SF.sleep(1);
    }
    function EditRequest_ClickCloneRequest() {
        SF.click(By.xpath('//button[@ng-click="cloneRequest(request)"]'));
        SweetConfirm ();
        WaitWhileBusy ();
        JS.waitForNotExist('div.busy:visible');
        SF.sleep (15);
    }
    function EditRequest_WaitForVisibleCloneRequest() {
        SF.waitForLocated (By.xpath('//div[contains(@class,"requestModal status_1")]//a[@ng-click="select(tabs[0])"]'));
        SF.sleep(1);
    }

    function EditRequest_OpenClient() {
        SF.click(By.xpath('//a[@ng-click="select(tabs[4])"]'));
    }
    function EditRequest_OpenMessages() {
        SF.click(By.xpath('//a[@ng-click="select(tabs[3])"]'));
        SF.sleep (2);
        WaitWhileBusy ();
    }
    function EditRequest_OpenRequest() {
        SF.click(By.xpath('//a[@ng-click="select(tabs[0])"]'));
        SF.sleep(1);
    }
    function EditRequest_OpenPayment() {
        JS.click('label[ng-click=\\"OpenPaymentModal();\\"]:visible');
        SF.waitForVisible (By.xpath('//div[@class="inside_box"]'));
        SF.sleep (3);
        WaitWhileBusy();
    }

    function EditRequest_SetToNotConfirmed() {
        SF.select(By.xpath('//select[@id="edit-status"]'), 2);
    }
    function EditRequest_SetToConfirmed() {
        SF.select(By.xpath('//select[@id="edit-status"]'), 3);
    }
    function EditRequest_SetToUploading() {
        SF.select(By.xpath('//select[@id="edit-service"]'), 3);
    }
    function EditRequest_SaveChanges() {
        JS.click('button[ng-click=\\"UpdateRequest()\\"]');
        JS.waitForExist('button[ng-click="update(request)"]:visible');
        SF.sleep(2);
        SF.click(By.xpath('//button[@ng-click="update(request)"]'));
        JS.waitForExist("div.toast-success:visible");
        WaitWhileBusy();
    }

    function EditRequest_WaitForBalanceVisible() {
        JS.waitForExist('label:contains("Balance:"):visible');
    }

    function EditRequest_ScrollDown() {
        JS.scroll('div.BalanceCost:visible');
    }

    function EditRequest_OpenPayroll() {
        JS.waitForNotExist('div.busyoverlay:visible');
        SF.click(By.xpath('//div[@ng-click="openSalaryCommisionModal();"]'));
        SF.waitForVisible(By.xpath('//button[@ng-click="reSubmitPayroll()"]'));
        JS.waitForNotExist('div.busyoverlay:visible');
    }
    function EditRequest_OpenPayrollPickupFlatRate() {
        JS.waitForNotExist('div.busyoverlay:visible');
        SF.click(By.xpath('//div[@ng-click="openSalaryCommisionModal(\'pickedUpCrew\');"]'));
        SF.waitForVisible(By.xpath('//button[@ng-click="reSubmitPayroll()"]'));
        JS.waitForNotExist('div.busyoverlay:visible');
    }
    function EditRequest_OpenPayrollDeliveryFlatRate() {
        JS.waitForNotExist('div.busyoverlay:visible');
        SF.click(By.xpath('//div[@ng-click="openSalaryCommisionModal(\'deliveryCrew\');"]'));
        SF.waitForVisible(By.xpath('//button[@ng-click="reSubmitPayroll()"]'));
        JS.waitForNotExist('div.busyoverlay:visible');
    }
    function EditRequest_PayrollAddManager(name){
        SF.click(By.xpath('//div[@ng-click="addWorker(\'salesPerson\')"]'));
        SF.click(By.xpath('(//select[@ng-model="selected.salesPerson[salesPersonIndex]"])[last()]'));
        SF.click(By.xpath('(//select[@ng-model="selected.salesPerson[salesPersonIndex]"])[last()]/option[contains(text(),"'+name+'")]'));
    }
    function EditRequest_PayrollAddForeman(name){
        SF.click(By.xpath('//div[@ng-click="addWorker(\'foreman\')"]'));
        SF.click(By.xpath('(//select[@ng-model="selected.foreman[foremanIndex]"])[last()]'));
        SF.click(By.xpath('(//select[@ng-model="selected.foreman[foremanIndex]"])[last()]/option[contains(text(),"'+name+'")]'));
        SF.sleep(1);
        WaitWhileBusy();
    }
    function EditRequest_PayrollSetManagerCommission(name, type, forCommission, percent) {
        SF.send(By.xpath('//option[contains(text(),"'+name+'") and @selected="selected"]/../../../../..//' +
            'td[contains(text(),"'+type+'")]/..//input[@ng-model="sale.for_commission "]'),forCommission);
        SF.send(By.xpath('//option[contains(text(),"'+name+'") and @selected="selected"]/../../../../..//' +
            'td[contains(text(),"'+type+'")]/..//input[@ng-model="sale.rate"]'),percent);
    }
    function EditRequest_PayrollOpenForemanTab() {
        SF.click(By.xpath('//li[@heading="Foreman"]/a'));
        WaitWhileBusy();
    }
    function EditRequest_PayrollSetForemanCommission(name, type, forCommission, percent){
        SF.send(By.xpath('//div[@id="invoice_content"]//option[contains(text(),"'+name+'") and @selected="selected"]' +
            '/../../../../../..//option[contains(text(),"'+type+'") and @selected="selected"]' +
            '/../../..//input[@ng-model="foreman.for_commission"]'),forCommission);
        if ((type != 'Tips') && (type != 'Daily Rate')) {
            SF.send(By.xpath('//div[@id="invoice_content"]//option[contains(text(),"' + name + '") and @selected="selected"]' +
                '/../../../../../..//option[contains(text(),"' + type + '") and @selected="selected"]' +
                '/../../..//input[@ng-model="foreman.rate"]'), percent);
        }
    }
    function EditRequest_PayrollGetManagerCommission(name, objectToStore){
        driver.wait(driver.findElement(By.xpath('//div[@id="invoice_content"]//option[contains(text(),"'+name+'") and @selected="selected"]' +
            '/../../../../..//tr[1]//input[@ng-model="sale.for_commission "]')).getAttribute('value').then(
            function(text){objectToStore.forCommission=SF.cleanPrice(text);}
        ),config.timeout);
        driver.wait(driver.findElement(By.xpath('//div[@id="invoice_content"]//option[contains(text(),"'+name+'") and @selected="selected"]' +
            '/../../../../..//tr[1]//input[@ng-model="sale.rate"]')).getAttribute('value').then(
            function (text) {
                objectToStore.percent = SF.cleanPrice(text);
            }
        ), config.timeout);
        driver.wait(driver.findElement(By.xpath('//div[@id="invoice_content"]//option[contains(text(),"'+name+'") and @selected="selected"]' +
            '/../../../../..//tr[1]//input[@ng-model="sale.rate"]/../following-sibling::td[1]')).getText().then(
            function (text) {
                objectToStore.total = SF.cleanPrice(text);
            }
        ), config.timeout);
        SF.sleep(1);
        console.log('manager ForCommission '); console.log(objectToStore);
    }
    function EditRequest_PayrollGetForemanCommission(name, type, objectToStore){
        let count=0;
        driver.wait(driver.findElements(By.xpath('//div[@id="invoice_content"]//option[contains(text(),"'+name+'") and @selected="selected"]' +
            '/../../../../../..//option[contains(text(),"'+type+'") and @selected="selected"]' +
            '/../../..//input[@ng-model="foreman.for_commission"]')).then(function(elements){
                count=elements.length;
        }),config.timeout);
        SF.sleep(1);
        if (count>0) {
            driver.wait(driver.findElement(By.xpath('//div[@id="invoice_content"]//option[contains(text(),"' + name + '") and @selected="selected"]' +
                '/../../../../../..//option[contains(text(),"' + type + '") and @selected="selected"]' +
                '/../../..//input[@ng-model="foreman.for_commission"]')).getAttribute('value').then(
                function (text) {
                    objectToStore.forCommission = SF.cleanPrice(text);
                }
            ), config.timeout);
            if ((type == 'Tips') || (type == 'Daily Rate')) {
                objectToStore.percent = 100;
            }
            else {
                driver.wait(driver.findElement(By.xpath('//div[@id="invoice_content"]//option[contains(text(),"' + name + '") and @selected="selected"]' +
                    '/../../../../../..//option[contains(text(),"' + type + '") and @selected="selected"]' +
                    '/../../..//input[@ng-model="foreman.rate"]')).getAttribute('value').then(
                    function (text) {
                        objectToStore.percent = SF.cleanPrice(text);
                    }
                ), config.timeout);
            }
            driver.wait(driver.findElement(By.xpath('//div[@id="invoice_content"]//option[contains(text(),"' + name + '") and @selected="selected"]' +
                '/../../../../../..//option[contains(text(),"' + type + '") and @selected="selected"]' +
                '/../../..//input[@ng-model="foreman.for_commission"]/../following-sibling::td[2]/span')).getText().then(
                function (text) {
                    objectToStore.total = SF.cleanPrice(text);
                }
            ), config.timeout);
        } else {
            objectToStore.forCommission = 'not Exist';
        }
        SF.sleep(1);
        console.log(type+' '); console.log(objectToStore);
    }
    function EditRequest_PayrollAddForemanCommission(name, type) {
        SF.click(By.xpath('//div[@id="invoice_content"]//option[contains(text(),"' + name + '") and @selected="selected"]' +
            '/../../../../../tbody/tr[last()]//button[@ng-click="addNewCommission(\'foreman\', foremanIndex, foremans.uid)"]'));
        SF.click(By.xpath('//div[@id="invoice_content"]//option[contains(text(),"' + name + '") and @selected="selected"]' +
            '/../../../../../tbody/tr[last()]/preceding-sibling::tr[1]//select[@ng-model="foreman.id"]/option[contains(text(),"'+type+'")]'));
    }
    function EditRequest_PayrollGetForemansTotal(foremanForCommission) {
        driver.findElement(By.xpath('//label[@ng-init="calcWorkerTotal(\'foreman\')"]')).getText().then(function (text) {
            foremanForCommission.total = SF.cleanPrice(text);
        });
    }
    function EditRequest_PayrollSubmit(){
		SF.click(By.xpath('//button[@ng-click="reSubmitPayroll()"]'));
		SweetConfirm();
		SweetConfirm();
		SF.sleep(2);
    }

    function EditRequest_CloseEditRequest() {
        SF.click(By.xpath('//button[@ng-click="cancel()"]'));
        SF.sleep(2);
    }

    function EditRequest_CloseModal() {
        SF.click(By.xpath('//div[@class="modal-footer"]/button[@ng-click="cancel()"]'));
        //SweetConfirm();
        SF.sleep(2);
    }

    function EditRequest_OpenLogs() {
        SF.click(By.xpath('//a[@ng-click="select(tabs[5])"]'));
        SF.sleep(2);
        JS.waitForNotExist('div.busyoverlay:visible');
        JS.waitForExist('div[ng-repeat="log in allLogs | orderBy: \\\'-id\\\' track by $index "]:eq(3)');
    }

    function EditRequest_ExpandPendingEmail(email) {
        SF.click(By.xpath('//span[@ng-bind-html="toTrustedHTML(item.text)"][contains(text(),"Request Quote (Pending Status)")][contains(text(),"' + email + '")]/../../../following-sibling::div[1]'));
    }

    function EditRequest_RememberId(request){
        driver.wait(driver.findElement(By.xpath('//a[@ng-click="select(tabs[0])"]')).getText().then(function(text){
            request.Id = SF.cleanPrice(text);
        }), config.timeout);
    }
    function EditRequest_RememberSale(request){
        driver.wait(driver.findElement(By.xpath('//span[@ng-show="currentManager"]')).getText().then (function (text){
            request.SaleName = text;
        }), config.timeout);
        SF.sleep (1);
    }
    function EditRequest_SetSaleNumber(number) {
        SF.click (By.xpath('//button[contains(text(),"Assign sales person")]'));
        SF.click (By.xpath('//div[@ng-show="::PermissionsServices.hasPermission(\'canSignedSales\');"]//ul[@class="dropdown-menu"]/li['+number+']'));
        SweetConfirm();
        SF.sleep (5);
    }
    function EditRequest_SetSizeOfMoveNumber(number){
        SF.select(By.xpath('//select[@id="edit-size-move"]'),number);
        SF.sleep(1);
    }
    function EditRequest_AddPacking() {
        WaitWhileBusy ();
        SF.click(By.xpath('//label[@ng-click="openAddPackingModal();"]'));
        SF.waitForVisible (By.xpath('//li[@ng-click="addExtraCharges(extra_charge)"][1]'));
        SF.click(By.xpath('//li[@ng-click="addExtraCharges(extra_charge)"][1]'));
        SF.sleep (0.5);
        SF.click(By.xpath('//li[@ng-click="addExtraCharges(extra_charge)"][2]'));
        SF.sleep (0.5);
        SF.click(By.xpath('//li[@ng-click="addExtraCharges(extra_charge)"][3]'));
        SF.sleep (0.5);
        SF.click(By.xpath('//button[@ng-click="save()"]'));
        WaitWhileBusy ();
        SF.sleep (3);
    }
    function EditRequest_AddAdditionalServicesFullPack() {
        SF.click(By.xpath('//label[@ng-click="openAddServicesModal();"]'));
        SF.waitForVisible (By.id('extra-service-modal'));
        SF.sleep(3);
        SF.click(By.xpath('//div[@class="charge_list"]/li[1]'));
        SF.click(By.xpath('//div[@class="charge_list"]/li[3]'));
        SF.click(By.xpath('//div[@class="charge_list"]/li[4]'));
        SF.click(By.xpath('//button[@ng-click="save()"]'));
        WaitWhileBusy ();
        SF.sleep (2);
    }
    function EditRequest_AddValuation() {
        SF.click(By.xpath('//label[@ng-click="openValuationModal()"]'));
        SF.waitForLocated (By.xpath('//button[@ng-click="saveValuation()"]'));
        SF.sleep(1);
        SF.click(By.xpath('//input[@id="full-protection"]/..'));
        SF.sleep(2);
        SF.click(By.xpath('//td[@ng-repeat="(key, value) in amoutValuation"][2]/div'));
        SF.click (By.xpath('//button[@ng-click="saveValuation()"]'));
        SweetConfirm ();
        WaitWhileBusy ();
    }
    function EditRequest_RememberCbf(boardNumbers){
        driver.wait(driver.findElement(By.xpath('//span[contains(text(),"c.f.")]/preceding-sibling::span[1]')).getText().then(function(text){
            boardNumbers.cbf = SF.cleanPrice(text);
        }),config.timeout);
    }
    function EditRequest_SwitchCalculator(){
        SF.click(By.xpath('//div[@class="actions pull-right"]/span[@ng-click="switchCalc()"]'));
    }
    function EditRequest_AddRoomNumber(number){
        SF.click(By.xpath('//ul[@class="chosen-choices"]'));
        SF.click(By.xpath('//ul[@class="chosen-results"]/li[@data-option-array-index="'+number+'"]'));
        SF.sleep(1);
    }
    function EditRequest_OpenFuel(){
        SF.click (By.xpath("//div[not(contains(@class,'ng-if'))]/label[contains(text(), 'Fuel Surcharge:')]"));
        SF.sleep (3);
    }
    function EditRequest_GetValueFromFuelModal(boardNumbers){
        driver.wait(driver.findElement(By.xpath('//input[@ng-model="request.request_all_data.surcharge_fuel_avg"]')).getAttribute('value').then(function(value){
            boardNumbers.FuelPerc = SF.cleanPrice(value.replace('%', ''));
        }),config.timeout);
    }
    function EditRequest_SetAdressToFrom() {
        SF.send (By.id('edit-moving-from'), 2342342342424);
        SF.send (By.xpath('//input[@ng-model="request.field_moving_to.thoroughfare"]'), 34654564564);
    }
    function EditRequest_SetAdressFrom() {
        SF.send (By.id('edit-moving-from'), 2342342342424);
    }
    function EditRequest_SetAdressTo() {
        SF.send (By.xpath('//input[@ng-model="request.field_moving_to.thoroughfare"]'), 34654564564);
    }

    function EditRequest_CloseConfirmWork() {
        SF.click (By.xpath('//div[@ng-click="changeSalesClosingTab(\'closing\')"]'));
        JS.waitForNotExist ('div.busyoverlay:visible');
        SF.sleep (0.5);
    }
    function EditRequest_OpenConfirmWork() {
        SF.click(By.xpath('//div[@ng-click="changeSalesClosingTab(\'sales\')"]'));
        SF.sleep(3);
    }
    function EditRequest_SetLaborTimeCloseJob(time) {
        WaitWhileBusy();
        SF.click (By.xpath('//input[@ng-model="invoice.work_time"]'));
        SF.click(By.xpath('//input[@ng-model="invoice.travel_time.value"]'));
        SF.click (By.xpath('//input[@ng-model="invoice.work_time"]'));
        SF.sleep(1);
        SF.click(By.xpath('//div[contains(@class, "ui-timepicker-wrapper") and contains(@style,"display: block;")]/ul/li[contains(text(),"'+time+'")]'));
        JS.waitForNotExist ('div.busyoverlay:visible');
    }
    function EditRequest_SetStartTime(time) {
        SF.click(By.id('edit-start-time'));
        SF.click(By.id('edit-start-time2'));
        SF.click(By.id('edit-start-time'));
        SF.sleep(1);
        SF.click(By.xpath('//div[contains(@class, "ui-timepicker-wrapper") and contains(@style,"display: block;")]/ul/li[contains(text(),"'+time+'")]'));
    }
    function EditRequest_CloseJob() {
        SF.click (By.xpath('//div[@ng-click="closeJob();"]'));
        SF.sleep (5);
        WaitWhileBusy();
    }
    function EditRequest_OpenContractCloseJob() {
        driver.findElement(By.xpath('//a[contains(@class,"open_button_contract")]')).click();
        SF.sleep (3);
    }
    function EditRequest_Check1EmailExist(receiver, Subject) {
        driver.wait(driver.findElements(By.xpath('//div[@ng-show="tabs[0].selected"]//span[' +
            'contains(text(),\'Mail was send to "'+receiver+'".\') and ' +
            'contains(text(),\'Subject: "'+Subject+'\')]')).then(function(array){
            VD.IWant(VD.ToEqual, array.length,1,'имейл '+Subject+' не был отправлен на '+receiver+' или отправлен несколько раз');
        }), config.timeout);
    }
    function EditRequest_Check1EmailNotExist(receiver, Subject) {
        driver.wait(driver.findElements(By.xpath('//div[@ng-show="tabs[0].selected"]//span[' +
            'contains(text(),\'Mail was send to "'+receiver+'".\') and ' +
            'contains(text(),\'Subject: "'+Subject+'\')]')).then(function(array){
            VD.IWant(VD.ToEqual, array.length,0,'имейл '+Subject+' был отправлен на '+receiver+' хотя не должен был');
        }), config.timeout);
    }

    function EditRequest_OpenMailDialog(){
        SF.click(By.xpath('//i[@ng-click="openMailDialog()"]'));
    }
    function EditRequest_MailDialog_SetEmail(number, email){
        SF.clear(By.xpath('//input[@ng-model="selected.mail"]['+number+']'));
		SF.send(By.xpath('//input[@ng-model="selected.mail"]['+number+']'), email);
		SF.click(By.xpath('//h2[contains(text(),"Selected email")]'));
    }
    function EditRequest_MailDialog_AddTemplate(group, name){
        SF.click(By.xpath('//span[contains(text(),"'+group+'")]/../../a[@ng-click="toggleOpen()"]'));
        SF.sleep(1);
		SF.click(By.xpath('//span[contains(text(),"'+group+'")]/../../a[@ng-click="toggleOpen()"]/../../../div[contains(@class,"collapse")]' +
            '/div/div/h4[contains(text(),"'+name+'")]/..'));
		SF.click(By.xpath('//span[contains(text(),"'+group+'")]/../../a[@ng-click="toggleOpen()"]'));
    }
    function EditRequest_MailDialog_SetSubject(number, text){
        SF.clear(By.xpath('//input[@ng-model="email.subject"]['+number+']'));
		SF.send(By.xpath('//input[@ng-model="email.subject"]['+number+']'),text);
    }
    function EditRequest_MailDialog_ClickSend(){
        SF.click(By.xpath('//a[@ng-click="sendEmailsAndClose()"]'));
    }
    function EditRequest_SaveNotesSales() {
        SF.sleep(3);
        SF.click(By.xpath('//button[@ng-click="updateNote()"]'));
        WaitWhileToaster ();
    }

    function EditRequest_SaveNotesForeman() {
        SF.sleep(3);
        SF.click(By.xpath('//div[contains(@class, "foreman_notes")]/following-sibling::button[@ng-click="updateNote()"]'));
        WaitWhileToaster ();
    }
    function EditRequest_SaveNotesClient() {
        SF.sleep(3);
        SF.click(By.xpath('//div[contains(@class, "client_notes")]/following-sibling::button[@ng-click="updateNote()"]'));
        WaitWhileToaster ();
    }
    //=================================LOCAL DISPATCH============================

    function Board_OpenLocalDispatch() {
        Board_OpenSideBar();
        SF.click(By.xpath('//a[@ng-click="vm.goToPage(\'dispatch.local\', \'\')"]'));
        SF.waitForLocated(By.xpath('//a[@class="ui-datepicker-next ui-corner-all"]'));
        WaitWhileBusy();
    }
    function Board_OpenMessage() {
        SF.click(By.xpath('//a[@ui-sref="messages"]'));
        SF.sleep(2);
        WaitWhileBusy ();
    }

    function Dispatch_GridView() {
        SF.click(By.xpath('//i[contains(@ng-click,"view.grid = true;")]'));
        WaitWhileBusy();
    }

    function Dispatch_ShowDoneJobs() {
        SF.select(By.xpath('//select[@ng-model="vm.reqFilter.type"]'), 0);
        WaitWhileBusy();
    }

    function Dispatch_WaitForCalendar() {
        SF.waitForLocated(By.xpath('//a[@class="ui-datepicker-next ui-corner-all"]'));
    }

    //===================================PAYROLL=====================================
    function Payroll_ClickAllDepartment() {
        SF.click(By.xpath('//a[@ng-click="dTable=\'departments\';employee=\'\'"]'));
    }
    function Payroll_RefreshTable() {
        SF.sleep(1.5);
        SF.click(By.xpath('//a[@ng-click="getByDate()"]/i'));
        WaitWhileBusy ();
    }
    function Payroll_UpdateCache() {
        SF.click(By.xpath('//button[@ng-click="updatePayrollCache()"]'));
        SF.sleep (60);
        WaitWhileBusy ();
        SF.sleep(1);
        WaitWhileBusy ();
    }
    function Payroll_SelectAllJobsCheckbox() {
        SF.click(By.xpath('//input[@ng-model="global"]/..'));
    }
    function PayrollPayCheck_ClickSavePayment() {
        WaitWhileBusy ();
        SF.click (By.xpath('//button[@ng-click="savePayment()"]'));
        WaitWhileBusy ();
        SF.sleep(2);
    }
    function Payroll_ClickApplyPayment() {
        SF.click(By.xpath('//a[@ng-click="applyPayment()"]'));
        SF.waitForLocated (By.xpath('//button[@ng-click="savePayment()"]'));
        WaitWhileBusy ();
    }
    function Payroll_ClickStepBackToNameWorker() {
        JS.click('a[ng-click="dTable=\\\'workers\\\';employee=\\\'\\\'"]:visible');
        WaitWhileBusy ();
    }
    function Payroll_ClickStepBackToAllDepartments() {
        JS.click('a[ng-click="dTable=\\\'departments\\\';employee=\\\'\\\'"]:visible');
        WaitWhileBusy ();
    }
    function Payroll_GoToWorkerJobs(foremanName) {
        SF.click(By.xpath('//table[@id="print-area"]//td[contains(text(),"'+ foremanName +'")]'));
        SF.click(By.xpath('//table[@id="print-area"]//td[contains(text(),"'+ foremanName +'")]'));
        WaitWhileBusy ();
    }
    function Payroll_OpenPayCheckCash() {
        SF.click(By.xpath('//tr[@ng-repeat="(id, dataObj) in userCurrentTbl.users_paychecks track by id"]'));
        SF.sleep(0.3);
        SF.click(By.xpath('//tr[@ng-repeat="(id, dataObj) in userCurrentTbl.users_paychecks track by id"]'));
        SF.waitForLocated (By.xpath('//button[@ng-click="removePaycheck()"]'));
        WaitWhileBusy();
    }
    function PayrollPayCheck_ClickDeleteAndConfirm() {
        SF.click (By.xpath('//button[@ng-click="removePaycheck()"]'));
        SweetConfirm ();
        WaitWhileBusy();
    }
    function PayrollPayCheck_SelectCheckPayment() {
        SF.select(By.xpath('//select[@ng-model="payment.formPayment"]'), 'string:0');
    }
    function Payroll_ClickAddMiscPayment() {
        SF.click(By.xpath('//a[@ng-click="openModal(\'addMiscPayment\')"]'));
        SF.waitForLocated (By.xpath('//button[@ng-click="saveMisc()"]'));
        WaitWhileBusy ();
    }
    function PayrollMiscPayment_ClickAmount() {
        SF.click(By.xpath('//input[@id="fields-amount"]/..'));
    }
    function PayrollMiscPayment_ClickSave() {
        SF.click (By.xpath('//button[@ng-click="saveMisc()"]'));
        WaitWhileBusy();
    }
    function PayrollMiscPayment_ClickAmountDeduct() {
        SF.click(By.xpath('//input[@id="fields-amount"]/..'));
        SF.click(By.xpath('//input[@id="fields-deduct"]/..'));
    }
    function PayrollMiscPayment_ClickAmountPaid() {
        SF.click(By.xpath('//input[@id="fields-amount"]/..'));
        SF.click(By.xpath('//input[@id="fields-receivable"]/..'));
    }
    function PayrollMiscPayment_SendAmountSumm(suma) {
        SF.clear(By.xpath('//input[@ng-model="misc.amount"]'));
        SF.send(By.xpath('//input[@ng-model="misc.amount"]'), suma);
    }
    function Payroll_getTotalById(Id, storage){
		driver.wait(driver.findElement(By.xpath('//td[contains(text(),"'+Id+'")]/../td[last()]')).getText().then(
		    function(text){
				console.log("нашли тотал "+text);
				storage.Total=SF.cleanPrice(text);
            }
        ),config.timeout);
		SF.sleep(1);
    }

    //================================FRONT SITE======================================
    function FrontSite_GoToAccount() {
        JS.link('ultrasmall-form a:contains("Proceed To View Your Quote")');
    }

    //================================SETTINGS========================================
    function Schedule_SetReservationLocalTo(price) {
        SF.click(By.xpath('//input[@ng-model="vm.scheduleSettings.localReservationRate"]'));
        SF.send(By.xpath('//input[@ng-model="vm.scheduleSettings.localReservationRate"]'), price);
        SF.click(By.xpath('//input[@ng-model="vm.scheduleSettings.flatReservationRate"]'));
        SF.sleep(2);
    }

    //=================================DEPARTMENT=========================================
    function Department_OpenSales() {
        SF.click(By.xpath('//ul[@class="nav nav-pills nav-stacked compose-nav"]/li[3]/a'));
        SF.sleep(3);
        SF.waitForVisible(By.xpath('//ul[@class="nav nav-pills nav-stacked compose-nav"]/li[3]/a'));
        SF.sleep(2);
    }

    function Department_OpenHuman(name) {
        driver.wait(driver.executeScript("$('.mdDataTable tbody tr td:contains(\"" + name + "\")').dblclick();"), config.timeout);
        SF.waitForLocated(By.linkText("Permissions"));
    }

    function Department_OpenMansPermissions() {
        SF.click(By.linkText("Permissions"));
        SF.sleep(1);
    }

    function Department_ClickPermissionsRequests() {
        SF.click(By.xpath('//ul[@class="nav nav-tabs submenu_tab"]/li[@ng-click="activePermTab = 1"]'));
        SF.waitForVisible(By.xpath('//div[@ng-class="{\'active\': activePermTab === 1}"]')); //?
    }

    function Department_ClickCanSeeOtherLeads() {
        SF.click(By.xpath('//input[@ng-model="request.permissions.canSeeOtherLeads"]/..'));
    }

    function Department_ClickCanSearchOtherLeads() {
        SF.click(By.xpath('//input[@ng-model="request.permissions.canSearchOtherLeads"]/..'));
    }

    function Department_ClickCanEditOtherLeads() {
        SF.click(By.xpath('//input[@ng-model="request.permissions.canEditOtherLeads"]/..'));
    }

    function Department_ClickCanAssignToOther() {
        SF.click(By.xpath('//input[@ng-model="request.permissions.canSignedSales"]/..'));
    }

    function Department_SaveUser() {
        SF.click(By.xpath('//button[@ng-click="submitted=true; create(createUserRequest)"]'));
        SF.waitForVisible(By.xpath('//button[@class="confirm"]'));
        SweetConfirm();
        SF.sleep(2);
        WaitWhileBusy ();
    }
    function Department_CreateUser() {
        SF.click(By.xpath('//button[@ng-click="submitted=true; create(createUserRequest)"]'));
        WaitWhileBusy();
        WaitWhileToaster ();
        SF.sleep(8);
    }

    function Department_ClickCreateUser() {
        SF.click (By.xpath('//div[@ng-click="vm.openCreateUserModal()"]'));
        SF.waitForVisible (By.xpath('//form[@name="createUserRequest"]'));
    }

    function Department_SendFirstLastNameAndPhone(firstname, lastname, phone) {
        SF.send (By.xpath('//input[@ng-model="request.firstName"]'), firstname);
        SF.send (By.xpath('//input[@ng-model="request.lastName"]'), lastname);
        SF.send(By.xpath('//input[@ng-model="request.phone1"]'), phone);
    }
    function Department_SendAccountNameAndPassword(loginName, password) {
        SF.send (By.xpath('//input[@ng-model="request.login"]'), loginName);
        SF.send (By.xpath('//input[@ng-model="request.password"]'), password);
    }
    function Department_User_OpenAccount() {
        SF.click (By.linkText('Account'));
    }
    function Department_User_OpenNotificationTab() {
        SF.click(By.xpath('//li[@ng-click="activeMainTab = 6"]'));
    }
    function Department_SendNotificationEmail(email) {
        SF.send(By.xpath('//input[@ng-model="request.email"]'), email);
    }
    function Department_OpenManager() {
        SF.click (By.xpath('//ul[@class="nav nav-pills nav-stacked compose-nav"]/li[2]/a'));
        SF.sleep(3);
        WaitWhileBusy();
    }
    function Department_OpenDriver() {
        SF.click (By.xpath('//ul[@class="nav nav-pills nav-stacked compose-nav"]/li[4]/a'));
        SF.sleep(3);
        WaitWhileBusy();
    }
    function Department_OpenHelper() {
        SF.click (By.xpath('//ul[@class="nav nav-pills nav-stacked compose-nav"]/li[5]/a'));
        SF.sleep(3);
        WaitWhileBusy();
    }
    function Department_OpenForeman() {
        SF.click (By.xpath('//ul[@class="nav nav-pills nav-stacked compose-nav"]/li[6]/a'));
        SF.sleep(3);
        WaitWhileBusy();
    }
    function Department_OpenRateCommissions() {
        SF.click (By.linkText('Rates & Commission'));
    }
    function Department_SendLocalMoveOfficeCom(number) {
        SF.click(By.xpath('//input[@ng-model="request.localMoveRateCommissionInput1"]'));
        SF.send(By.xpath('//input[@ng-model="request.localMoveRateCommissionInput1"]'), number);
    }
    function Department_SendLongDistanseOfficeCom(number) {
        SF.click(By.xpath('//input[@ng-model="request.longDistanceMoveRateCommissionInput1"]'));
        SF.send(By.xpath('//input[@ng-model="request.longDistanceMoveRateCommissionInput1"]'), number);
    }
    function Department_OpenAddServices() {
        SF.click(By.xpath('//button[@ng-click="excludedAdditionalServices()"]'));
        SF.sleep(3);
    }
    function Department_SaveAddServices() {
        SF.click(By.xpath('//button[@ng-click="saveSettings()"]'));
        SF.sleep(1);
    }
    function Department_ClickClosingPrice() {
        SF.click(By.xpath('//input[@ng-model="request.estimatedClosingPrice"]'));
    }
    function Department_SelectCommissionFromTotal() {
        SF.select(By.xpath('//select[@ng-model="rateCommission[trueIndex].option"]'), "Commission from total");
        SF.sleep(1);
    }
    function Department_SendCommissionFromTotal(number) {
        SF.click(By.xpath('//input[@ng-model="rateCommission[$index].input"]'));
        SF.send(By.xpath('//input[@ng-model="rateCommission[$index].input"]'), number);
    }
    function Department_AddRowOnRates() {
        SF.click(By.xpath('//div[@ng-click="addRow()"]'));
    }

    //==================================LONG DISTANCE SETTINGS==========================

    function LongDistanceSettings_ClickOnMapCaliforniya() {
        JS.click('#jqvmap1_ca');
        SF.waitForVisible (By.xpath('//div[@ng-if="vm.showSidebar"]'));
        SF.sleep (3);
    }
    function LongDistanceSettings_SelectMABasedState() {
        SF.select (By.xpath('//select[@ng-model="vm.longdistance.basedState"]'), 'MA');
        SF.sleep (2);
    }

    //==================================TRIPS============================================


    return {
        WaitWhileToaster: WaitWhileToaster,
        WaitWhileBusy: WaitWhileBusy,
        WaitWhileSpinner: WaitWhileSpinner,
        SweetConfirm: SweetConfirm,
        SweetCancel: SweetCancel,
        BoardAccount_SendMessage: BoardAccount_SendMessage,
        //==================================MAIL.RU=========================================
		MailRu_Login:MailRu_Login,
		MailRu_CheckEmailExistBySubject:MailRu_CheckEmailExistBySubject,
        //==================================FRONT SITE======================================
        FrontSite_GoToAccount: FrontSite_GoToAccount,
        //==================================LONG DISTANCE SETTINGS==========================
        LongDistanceSettings_ClickOnMapCaliforniya: LongDistanceSettings_ClickOnMapCaliforniya,
        LongDistanceSettings_SelectMABasedState: LongDistanceSettings_SelectMABasedState,

        ///===============================Profit and loss===============================

        ProfitLoss_AddExpense: ProfitLoss_AddExpense,

        //------------------------------------BOARD=========================================
        Board_LogoutAdmin: Board_LogoutAdmin,
        Board_ClickCreate: Board_ClickCreate,
        Board_OpenSideBar: Board_OpenSideBar,
        Board_OpenDashboard: Board_OpenDashboard,
        Board_OpenLocalDispatch: Board_OpenLocalDispatch,
        Board_OpenPayroll: Board_OpenPayroll,
        Board_OpenPendingRequest:Board_OpenPendingRequest,
        Board_OpenNotConfirmed: Board_OpenNotConfirmed,
        Board_OpenConfirmed: Board_OpenConfirmed,
        Board_OpenSettingsSchedule: Board_OpenSettingsSchedule,
        Board_OpenCompanyServices:Board_OpenCompanyServices,
        Board_OpenSettingsGeneral: Board_OpenSettingsGeneral,
		Board_OpenSettingsRates: Board_OpenSettingsRates,
        Board_OpenSettingsDepartment: Board_OpenSettingsDepartment,
        Board_OpenSettingsTemplateBuilder: Board_OpenSettingsTemplateBuilder,
        Board_RefreshDashboard:Board_RefreshDashboard,
        Board_SearchRequest:Board_SearchRequest,
        Board_SearchOpenRequest: Board_SearchOpenRequest,
        Board_GetFirstFoundedId:Board_GetFirstFoundedId,
        Board_Refresh:Board_Refresh,
        Board_OpenMessage: Board_OpenMessage,
        Board_OpenSchedule: Board_OpenSchedule,
        Board_OpenReviewSettings: Board_OpenReviewSettings,
        Board_OpenSettingsLongDistance: Board_OpenSettingsLongDistance,
        Board_OpenAllRequest: Board_OpenAllRequest,
        Board_OpenStorages: Board_OpenStorages,
        Board_OpenStorage: Board_OpenStorage,
        Board_OpenStoragesTenant: Board_OpenStoragesTenant,
        Board_OpenCourier : Board_OpenCourier,
        Board_OpenAgentFolio: Board_OpenAgentFolio,
        Board_OpenJobsInSIT: Board_OpenJobsInSIT,
        BoardSIT_OpenStorages: BoardSIT_OpenStorages,
        Board_OpenPickup: Board_OpenPickup,
        Board_OpenTripPlanner: Board_OpenTripPlanner,
        Board_OpenCarriersAndAgents: Board_OpenCarriersAndAgents,
        Board_OpenSettingsAccountPageCustomBlock: Board_OpenSettingsAccountPageCustomBlock,
        Board_OpenSettingsAccountPageCustomTooltips:Board_OpenSettingsAccountPageCustomTooltips,
        Board_OpenSettingsAccountPageFlatRate: Board_OpenSettingsAccountPageFlatRate,
        Board_OpenStatistic: Board_OpenStatistic,
        Board_OpenProfitLoss: Board_OpenProfitLoss,
		Board_OpenRequest: Board_OpenRequest,
		Board_OpenFirstRequest: Board_OpenFirstRequest,
		Board_OpenSettingsCalculator: Board_OpenSettingsCalculator,
        Board_CreateDraftRequest:Board_CreateDraftRequest,
        //====================================SETTINGS CALCULATOR===========================
        CalculatorSettings_OpenBasicSettings: CalculatorSettings_OpenBasicSettings,
		CalculatorSettings_OpenTravelTime: CalculatorSettings_OpenTravelTime,
		CalculatorSettings_CustomTrackSpeedTurnOff: CalculatorSettings_CustomTrackSpeedTurnOff,
		CalculatorSettings_CustomTrackSpeedTurnOn: CalculatorSettings_CustomTrackSpeedTurnOn,
		CalculatorSettings_SetCustomTrackSpeed: CalculatorSettings_SetCustomTrackSpeed,
		CalculatorSettings_SetCustomTrackSpeedBorder: CalculatorSettings_SetCustomTrackSpeedBorder,
        //====================================ACCOUNT=======================================
        Account_ClickViewRequest: Account_ClickViewRequest,
        Account_ClickPartialPacking: Account_ClickPartialPacking,
        Account_CheckRequestStatus_NotConfirmed: Account_CheckRequestStatus_NotConfirmed,
        Account_CheckRequestStatus_Pending: Account_CheckRequestStatus_Pending,
        Account_OpenRequest: Account_OpenRequest,
        Account_WaitForGreenTextAfterConfirm: Account_WaitForGreenTextAfterConfirm,
		Account_ClickViewConfirmationPage: Account_ClickViewConfirmationPage,
		Account_CheckSignOnConfirmationPage: Account_CheckSignOnConfirmationPage,
		Account_ConfirmationBackToRequest: Account_ConfirmationBackToRequest,
        Account_WaitForInventoryCheck: Account_WaitForInventoryCheck,
        Account_WaitForDetailsCheck: Account_WaitForDetailsCheck,
        Account_ClickFromStorage: Account_ClickFromStorage,
        Account_ClickToStorage: Account_ClickToStorage,
        Account_OpenMessage: Account_OpenMessage,
        Account_SubmitFlatRateAfterAddInventory: Account_SubmitFlatRateAfterAddInventory,
        Account_ChooseOptionFlatRate: Account_ChooseOptionFlatRate,
        Account_Refresh: Account_Refresh,
        AccountConfirmationPage_ClickBackToRequest: AccountConfirmationPage_ClickBackToRequest,
        PreferredPickUpDate: PreferredPickUpDate,
        PreferredDeliveryDate: PreferredDeliveryDate,
        //===================================CONTRACT=======================================
        Contract_WaitConfirmationPage: Contract_WaitConfirmationPage,
        Contract_WaitBillOfLading: Contract_WaitBillOfLading,
        Contract_OpenBillOfLading: Contract_OpenBillOfLading,
        Contract_DeclarationValueA: Contract_DeclarationValueA,
        Contract_ClickPay: Contract_ClickPay,
        Contract_ClickTips10: Contract_ClickTips10,
        Contract_ClickAddTips: Contract_ClickAddTips,
        Contract_ClickPaymentInfo: Contract_ClickPaymentInfo,
        Contract_WaitForImageInput: Contract_WaitForImageInput,
        Contract_UploadImage: Contract_UploadImage,
        Contract_SaveImages: Contract_SaveImages,
        Contract_Submit: Contract_Submit,
        Contract_ReturnToForeman: Contract_ReturnToForeman,
        Contract_OpenInventory: Contract_OpenInventory,
        Contract_SetTapeNumber: Contract_SetTapeNumber,
        Contract_SetTapeColorGreen: Contract_SetTapeColorGreen,
        Contract_SubmitInventory: Contract_SubmitInventory,
        Contract_WaitForRental: Contract_WaitForRental,
        Contract_SetRentalPhone: Contract_SetRentalPhone,
        Contract_SetRentalAddress: Contract_SetRentalAddress,
        Contract_SetRentalZip: Contract_SetRentalZip,
        Contract_CheckLoadBillOfLadding: Contract_CheckLoadBillOfLadding,
        Contract_ReviewClickStar: Contract_ReviewClickStar,
        Contract_ReviewTypeFeedback: Contract_ReviewTypeFeedback,
        Contract_ReviesSend: Contract_ReviesSend,
        //=================================EDIT STORAGE REQUEST=====================================
        EditStorage_RememberId: EditStorage_RememberId,
        EditStorage_OpenLedger: EditStorage_OpenLedger,
        EditStorage_OpenLotNumbers: EditStorage_OpenLotNumbers,
        EditStorage_AddLotNumber: EditStorage_AddLotNumber,
        EditStorage_SelectMoveIn:EditStorage_SelectMoveIn,
        EditStorage_OpenReccuring: EditStorage_OpenReccuring,
        EditStorage_StartReccuring: EditStorage_StartReccuring,
        EditStorage_CloseOpenModal: EditStorage_CloseOpenModal,
        StorageTenant_OpenStorages: StorageTenant_OpenStorages,
        EditStorage_UpdateStorage: EditStorage_UpdateStorage,
        EditStorage_OpenDocuments: EditStorage_OpenDocuments,
        //=================================EDIT REQUEST=====================================
        EditRequest_OpenSettings: EditRequest_OpenSettings,
        EditRequest_OpenMessages: EditRequest_OpenMessages,
        EditRequest_OpenLogs: EditRequest_OpenLogs,
        EditRequest_OpenClient: EditRequest_OpenClient,
        EditRequest_OpenRequest: EditRequest_OpenRequest,
        EditRequest_SetToNotConfirmed: EditRequest_SetToNotConfirmed,
        EditRequest_SetToUploading: EditRequest_SetToUploading,
        EditRequest_SaveChanges: EditRequest_SaveChanges,
        EditRequest_WaitForBalanceVisible: EditRequest_WaitForBalanceVisible,
        EditRequest_ScrollDown: EditRequest_ScrollDown,
        EditRequest_OpenPayroll: EditRequest_OpenPayroll,
        EditRequest_PayrollAddManager: EditRequest_PayrollAddManager,
        EditRequest_PayrollAddForeman: EditRequest_PayrollAddForeman,
        EditRequest_PayrollSetManagerCommission: EditRequest_PayrollSetManagerCommission,
        EditRequest_PayrollGetManagerCommission:EditRequest_PayrollGetManagerCommission,
        EditRequest_PayrollOpenForemanTab: EditRequest_PayrollOpenForemanTab,
        EditRequest_PayrollGetForemansTotal: EditRequest_PayrollGetForemansTotal,
        EditRequest_PayrollSetForemanCommission: EditRequest_PayrollSetForemanCommission,
        EditRequest_PayrollGetForemanCommission: EditRequest_PayrollGetForemanCommission,
        EditRequest_PayrollAddForemanCommission:EditRequest_PayrollAddForemanCommission,
		EditRequest_PayrollSubmit: EditRequest_PayrollSubmit,

        EditRequest_CloseEditRequest: EditRequest_CloseEditRequest,
        EditRequest_CloseModal: EditRequest_CloseModal,
        EditRequest_ExpandPendingEmail: EditRequest_ExpandPendingEmail,
        EditRequest_RememberId:EditRequest_RememberId,
        EditRequest_RememberSale:EditRequest_RememberSale,
        EditRequest_SetSaleNumber:EditRequest_SetSaleNumber,
        EditRequest_SetSizeOfMoveNumber:EditRequest_SetSizeOfMoveNumber,
        EditRequest_RememberCbf:EditRequest_RememberCbf,
        EditRequest_SwitchCalculator:EditRequest_SwitchCalculator,
        EditRequest_AddRoomNumber:EditRequest_AddRoomNumber,
        EditRequest_OpenFuel:EditRequest_OpenFuel,
        EditRequest_GetValueFromFuelModal:EditRequest_GetValueFromFuelModal,
        EditRequest_CloseConfirmWork: EditRequest_CloseConfirmWork,
        EditRequest_SetAdressToFrom: EditRequest_SetAdressToFrom,
        EditRequest_SetAdressFrom: EditRequest_SetAdressFrom,
        EditRequest_SetAdressTo: EditRequest_SetAdressTo,
        EditRequest_SetToConfirmed: EditRequest_SetToConfirmed,
        EditRequest_SetLaborTimeCloseJob: EditRequest_SetLaborTimeCloseJob,
        EditRequest_CloseJob: EditRequest_CloseJob,
        EditRequest_OpenContractCloseJob: EditRequest_OpenContractCloseJob,
        EditRequest_Check1EmailExist:EditRequest_Check1EmailExist,
        EditRequest_OpenConfirmWork: EditRequest_OpenConfirmWork,
        EditRequest_ClickCloneRequest: EditRequest_ClickCloneRequest,
        EditRequest_WaitForVisibleCloneRequest: EditRequest_WaitForVisibleCloneRequest,
        EditRequest_OpenPayment: EditRequest_OpenPayment,
        EditRequest_OpenPayrollPickupFlatRate: EditRequest_OpenPayrollPickupFlatRate,
        EditRequest_OpenPayrollDeliveryFlatRate: EditRequest_OpenPayrollDeliveryFlatRate,
        EditRequest_AddPacking: EditRequest_AddPacking,
        EditRequest_AddAdditionalServicesFullPack: EditRequest_AddAdditionalServicesFullPack,
        EditRequest_AddValuation: EditRequest_AddValuation,
		EditRequest_OpenMailDialog: EditRequest_OpenMailDialog,
		EditRequest_MailDialog_SetEmail: EditRequest_MailDialog_SetEmail,
		EditRequest_MailDialog_AddTemplate: EditRequest_MailDialog_AddTemplate,
		EditRequest_MailDialog_SetSubject: EditRequest_MailDialog_SetSubject,
		EditRequest_MailDialog_ClickSend:EditRequest_MailDialog_ClickSend,
        EditRequest_SaveNotesSales:EditRequest_SaveNotesSales,
        EditRequest_SaveNotesForeman:EditRequest_SaveNotesForeman,
        EditRequest_SaveNotesClient:EditRequest_SaveNotesClient,
        EditRequest_Check1EmailNotExist:EditRequest_Check1EmailNotExist,
        EditRequest_SetStartTime:EditRequest_SetStartTime,
        //=================================LOCAL DISPATCH===================================
        Dispatch_GridView: Dispatch_GridView,
        Dispatch_ShowDoneJobs: Dispatch_ShowDoneJobs,
        Dispatch_WaitForCalendar: Dispatch_WaitForCalendar,
        //===================================PAYROLL========================================
        Payroll_ClickAllDepartment: Payroll_ClickAllDepartment,
        Payroll_RefreshTable: Payroll_RefreshTable,
        Payroll_UpdateCache: Payroll_UpdateCache,
        Payroll_SelectAllJobsCheckbox: Payroll_SelectAllJobsCheckbox,
        PayrollPayCheck_ClickSavePayment: PayrollPayCheck_ClickSavePayment,
        Payroll_ClickApplyPayment: Payroll_ClickApplyPayment,
        Payroll_ClickStepBackToNameWorker: Payroll_ClickStepBackToNameWorker,
        Payroll_ClickStepBackToAllDepartments: Payroll_ClickStepBackToAllDepartments,
        Payroll_GoToWorkerJobs: Payroll_GoToWorkerJobs,
        Payroll_OpenPayCheckCash: Payroll_OpenPayCheckCash,
        PayrollPayCheck_ClickDeleteAndConfirm: PayrollPayCheck_ClickDeleteAndConfirm,
        PayrollPayCheck_SelectCheckPayment: PayrollPayCheck_SelectCheckPayment,
        Payroll_ClickAddMiscPayment: Payroll_ClickAddMiscPayment,
        PayrollMiscPayment_ClickAmount: PayrollMiscPayment_ClickAmount,
        PayrollMiscPayment_ClickSave: PayrollMiscPayment_ClickSave,
        PayrollMiscPayment_ClickAmountDeduct: PayrollMiscPayment_ClickAmountDeduct,
        PayrollMiscPayment_ClickAmountPaid: PayrollMiscPayment_ClickAmountPaid,
        PayrollMiscPayment_SendAmountSumm: PayrollMiscPayment_SendAmountSumm,
		Payroll_getTotalById: Payroll_getTotalById,
        //==================================SCHEDULE========================================
        Schedule_SetReservationLocalTo: Schedule_SetReservationLocalTo,
        //==================================DEPARTMENT======================================
        Department_OpenSales: Department_OpenSales,
        Department_OpenHuman: Department_OpenHuman,
        Department_OpenMansPermissions: Department_OpenMansPermissions,
        Department_ClickPermissionsRequests: Department_ClickPermissionsRequests,
        Department_ClickCanSeeOtherLeads: Department_ClickCanSeeOtherLeads,
        Department_ClickCanSearchOtherLeads: Department_ClickCanSearchOtherLeads,
        Department_ClickCanEditOtherLeads: Department_ClickCanEditOtherLeads,
        Department_ClickCanAssignToOther: Department_ClickCanAssignToOther,
        Department_SaveUser: Department_SaveUser,
        Department_ClickCreateUser:Department_ClickCreateUser,
        Department_SendFirstLastNameAndPhone:Department_SendFirstLastNameAndPhone,
        Department_SendAccountNameAndPassword:Department_SendAccountNameAndPassword,
        Department_User_OpenAccount:Department_User_OpenAccount,
        Department_User_OpenNotificationTab:Department_User_OpenNotificationTab,
        Department_SendNotificationEmail:Department_SendNotificationEmail,
        Department_CreateUser:Department_CreateUser,
        Department_OpenManager:Department_OpenManager,
        Department_OpenRateCommissions:Department_OpenRateCommissions,
        Department_SendLocalMoveOfficeCom:Department_SendLocalMoveOfficeCom,
        Department_SendLongDistanseOfficeCom:Department_SendLongDistanseOfficeCom,
        Department_OpenAddServices:Department_OpenAddServices,
        Department_SaveAddServices:Department_SaveAddServices,
        Department_OpenDriver:Department_OpenDriver,
        Department_OpenHelper:Department_OpenHelper,
        Department_OpenForeman:Department_OpenForeman,
        Department_ClickClosingPrice:Department_ClickClosingPrice,
        Department_SelectCommissionFromTotal:Department_SelectCommissionFromTotal,
        Department_SendCommissionFromTotal:Department_SendCommissionFromTotal,
        Department_AddRowOnRates:Department_AddRowOnRates
        //====================================TRIPS==========================================

    };
};