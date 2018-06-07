module.exports = function (SF, JS, JSstep, VD, V, By, until,FileDetector, system, condition, config, constants) {
    function WaitWhileToaster() {
        JS.waitForNotExist('div.toast-message:visible');
        JS.waitForNotExist('div.toast-success:visible');
    }
    function WaitWhileBusy() {
        SF.sleep(1);
        JS.waitForNotExist('.busyoverlay:visible, inhome-estimate-request-loading:visible');
        SF.sleep(1);
    }
    function WaitWhileBusySymbol() {
        SF.sleep(1);
        JS.waitForNotExist('.busy-symbol:visible');
        SF.sleep(1);
    }
    function WaitWhileSpinner() {
        SF.sleep(1);
        JS.waitForNotExist ('.spinner:visible');
        SF.sleep(1);
    }
    function WaitVisibleDashboard() {
        SF.waitForVisible(By.xpath('//td[@ng-click="requestEditModal(request)"]|//div[@ng-if="vm.pageParams.totalCount == 0"]'));
        WaitWhileBusy();
    }
    function WaitVisibleDashboardForeman() {
        SF.waitForVisible(By.xpath('//tr[@ng-click="vm.editReservation(request.nid)"]|//div[@ng-if="vm.pageParams.totalCount == 0"]'));
        WaitWhileBusy();
    }

    function SweetConfirm() {
        JS.waitForExist('button.confirm');
        SF.sleep(1.5);
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
    function ConfirmCalculatorOff() {
        SF.waitForVisible(By.xpath('//div[@class="sweet-alert showSweetAlert visible"]'));
        SF.click(By.xpath('//button[@class="confirm"]'));
    }
    //================================MAIL.RU  and Gmail=======================================

    function MailRu_CheckEmailExistBySubject(subject){
        driver.wait(driver.wait(driver.findElements(By.xpath('//a[@data-subject="'+subject+'"]')),config.timeout).then(function(elements){
            VD.IWant(VD.ToEqual, elements.length,1,'письмо не дошло');
        }),config.timeout);
    }



    ///===============================Create Request================================

    function CreateRequest_SelectServiceType(number) {
        SF.click(By.xpath('//div[@class="step1"]//select[@name="move_service_type"]/option[@value="number:'+number+'"]'));
    }
    function CreateRequest_ClickMoveDateInput() {
        SF.click(By.xpath('//input[@id="edit-move-date-datepicker-popup-0"]'));
    }
    function CreateRequest_SelectExtraRooms(number) {
        SF.click(By.xpath('//ul[@class="chosen-choices"]'));
        SF.click(By.xpath('//ul[@class="chosen-results"]/li[@data-option-array-index="'+number+'"]'));
    }
    function CreateRequest_SendZipToZipFrom(zipFrom, zipTo) {
        SF.send(By.id("edit-zip-code-from"), zipFrom);
        SF.send(By.id("edit-zip-code-to"), zipTo);
        SF.sleep(3);
    }
    function CreateRequest_ClickCalculate() {
        SF.sleep(1.5);
        SF.click(By.xpath('//button[@ng-click="Calculate()"]'));
        WaitWhileBusy ();
        SF.sleep(1);
    }
    function CreateRequest_ClickContinue() {
        SF.click(By.xpath('//button[@ng-click="step2 = false;step3 = true;"]'));
        SF.sleep(2);
    }
    function CreateRequest_SendClientInfo(client) {
        SF.send(By.xpath('//div[@class="step3"]//input[@ng-model="editrequest.account.fields.field_user_first_name"]'), client.name);
        SF.send(By.xpath('//div[@class="step3"]//input[@ng-model="editrequest.account.fields.field_user_last_name"]'), client.fam);
        SF.send(By.xpath('//div[@class="step3"]//input[@ng-model="editrequest.account.mail"]'), client.email);
        SF.send(By.xpath('//div[@class="step3"]//input[@ng-model="editrequest.account.fields.field_primary_phone"]'), client.phone);
        WaitWhileBusy();
    }
    function CreateRequest_OpenMailDialog() {
        SF.click(By.xpath("//div/i[@ng-click='openMailDialog()']"));
        WaitWhileBusy();
    }
    function CreateRequest_ClickCreate() {
        SF.click(By.xpath('//button[@ng-click="create()"]'));
        EditRequest_WaitForOpenRequest();
    }
    function CreateRequest_SelectCommercialMove() {
        SF.click(By.xpath('//select[@ng-model="editrequest.data.field_size_of_move"]/option[@value="number:11"]'));
        SF.click(By.xpath('//oi-select[@ng-model="commercialSize"]'));
        SF.click(By.xpath('//oi-select[@ng-model="commercialSize"]/div[2]//li[1]'));
    }
    function CreateRequest_SelectStairsToFrom() {
        SF.click(By.xpath('//select[@id="edit-type-from"]/option[@value="string:2"]'));
        SF.click(By.xpath('//select[@id="edit-type-to"]/option[@value="string:2"]'));
    }

    //====================================DISPACH=======================================

    function Dispach_ClickUnassignTeam() {
        JS.scroll('a[ng-click=\"vm.assignTeam(request)\"]');
        SF.sleep(1.5);
        SF.click(By.xpath('//a[@ng-click="vm.unAssignTeam()"]'));
    }
    function Dispach_ClickAddCrew() {
        SF.click(By.xpath('//a[@title="Add crew"]'));
        WaitWhileBusy ();
    }
    //=================================SIT==============================================

    function SIT_ClickAddTrip() {
        SF.click(By.xpath('//button[@ng-click="addTrip()"]'));
        SF.waitForVisible (By.xpath('//md-select[@ng-model="trip.data.details.flag"]'));
        SF.waitForVisible(By.xpath('//div[@class="trip-create-modal-form__form"]'));
    }
    function SIT_ChangeStatusTrip(status) {
        SF.click(By.xpath('//md-select[@ng-model="trip.data.details.flag"]'));
        SF.click(By.xpath('//div[text()="'+status+'"]'));
        SF.sleep(1);
    }
    function SIT_SelectCarrierName(carriername) {
        SF.click(By.xpath('//md-select[@ng-model="carrierId"]'));
        SF.click(By.xpath('//div[text()="'+ carriername +'"]'));
    }
    function SIT_AddRequestToTrip() {
        JS.click('span:contains(\\"Add requests to trip\\")');
        SF.waitForVisible(By.xpath('//input[@ng-model="trip.data.carrier.driver_name"]'));
        SF.sleep(2);
    }
    function SIT_GoToClosingTab() {
        JS.click('span:contains(\\"Closing\\")');
    }
    function SIT_ClickTripDetails() {
        JS.click('span:contains(\\"Trip details\\")');
        SF.waitForVisible(By.xpath('//h3[contains(text(), "Trip Info")]'));
    }
    function SIT_ClickUpdateTrip() {
        JS.click('span:contains(\\"Update\\")');
        SF.sleep(2);
        JS.waitForNotExist('span.toast-message:visible');
    }
    function SIT_ClickAddCarrier() {
        SF.click(By.xpath('//button[@ng-click="addCarrier()"]'));
        JS.waitForExist('input[ng-model=\\"agentModel.name\\"]');
        SF.sleep(2);
    }
    function SIT_ClickSaveCarrier() {
        SF.click(By.xpath('//button[@ng-click="create(agentModel)"]'));
        SF.waitForVisible(By.xpath('//input[@ng-model="searchTerm"]'));
    }
    function SIT_ClickAddPickupDelivery() {
        JS.click('span:contains(\\"Add Pickup/Delivery\\")');
        WaitWhileBusy();
    }

    function SIT_RefreshJobsInTrip() {
        JS.scroll('button[ng-click="getJobs()"]');
        SF.click(By.xpath('//button[@ng-click="getJobs()"]'));
        SF.sleep(3);
    }
    function SIT_ChangeStatusTripForemanHelper() {
        SF.click(By.xpath('//md-select[@ng-model="type"]'));
        SF.waitForVisible (By.xpath('//div[text()="Foreman/Helper"]'));
        SF.click(By.xpath('//div[text()="Foreman/Helper"]'));
    }
    function SIT_AddDescriptionAndInternalCode(description, internalCode) {
        SF.send (By.xpath('//textarea[@ng-model="trip.data.details.description"]'), description);
        SF.send (By.xpath('//input[@ng-model="trip.data.details.internal_code"]'), internalCode);
        SF.sleep(1.5);
    }
    ///===============================BOARD=========================================

    function Board_ClickLongDistanceDispach() {
        SF.click(By.xpath('//a[@ng-click="vm.goToPage(\'lddispatch.trip\', \'\')"]'));
    }

    function Board_LogoutAdmin() {
        JS.waitForNotExist('div.toast-success');
        JS.waitForNotExist('div.toast-message');
		JS.scroll('a[ng-click=\"vm.Logout()\"]');
        SF.click(By.xpath('//a[@ng-click="vm.Logout()"]/../../preceding-sibling::*[1]'));
        SF.sleep(1);
        SF.click(By.xpath('//a[@ng-click="vm.Logout()"]'));
        SF.waitForVisible(By.xpath('//form[@ng-submit="login()"]'));
        SF.sleep(2);
    }
    function HomeEstimate_Logout() {
		SF.click(By.xpath('//a[@ng-click="vm.Logout()"]/../../preceding-sibling::*[1]'));
		SF.sleep(1);
		SF.click(By.xpath('//a[@ng-click="vm.Logout()"]'));
        SF.waitForVisible(By.xpath('//form[@ng-submit="login()"]'));
        SF.sleep(2);
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
        WaitWhileBusy();
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
        SF.sleep (1);
        WaitWhileBusy ();
    }
    function Board_OpenStorage() {
        Board_OpenSideBar ();
        SF.click(By.xpath('//a[@ng-click="vm.goToPage(\'storages.pending\', \'\')"]'));
        SF.sleep (3);
        SF.click(By.xpath('//a[@ui-sref="storages.storage"]'));
        WaitWhileBusy ();
        SF.sleep (2);
        WaitWhileBusy ();
    }
    function Board_OpenStoragesTenant() {
        Board_OpenSideBar ();
        SF.click(By.xpath('//a[@ng-click="vm.goToPage(\'storages.pending\', \'\')"]'));
        SF.sleep (2);
        SF.click(By.xpath('//a[@ui-sref="storages.tenants"]'));
        WaitWhileBusy ();
        SF.sleep (2);
        WaitWhileBusy ();
    }
    function Board_OpenPayroll() {
        Board_OpenSideBar();
        SF.click(By.xpath("//a[@ng-click=\"vm.goToPage('dispatch.local', '')\"]"));
        SF.sleep(1);
        SF.click(By.xpath("//a[@ui-sref=\"dispatch.payroll\"]"));
        WaitWhileBusy();
    }
    function Board_OpenReview() {
        Board_OpenSideBar ();
        SF.click(By.xpath('//a[@ng-click="vm.goToPage(\'statistics.byrole\', \'\')"]'));
        SF.click(By.xpath('//a[@ui-sref="statistics.reviews"]'));
        SF.sleep(3);
    }

    function Board_OpenNotConfirmed() {
        SF.click(By.xpath('//div[@ng-click="vm.select(3)"]'));
        WaitWhileBusy();

    }
    function Board_OpenPendingRequest() {
        SF.click(By.xpath('//div[@ng-click="vm.select(0)"]'));
        WaitWhileBusy();
    }
    function Board_OpenConfirmed() {
        SF.click(By.xpath('//div[@ng-click="vm.select(2)"]'));
        WaitWhileBusy();
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
        SF.sleep(3);
    }

    function Board_OpenSchedule() {
        Board_OpenSideBar ();
        SF.click(By.xpath('//li[@ng-show="vm.PermissionsServices.hasPermission(\'canSeeScheduleMenu\')"]'));
        WaitWhileBusy();
        SF.sleep(2);
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
    function Board_OpenSettingsAccountPageFAQ() {
        SF.click(By.xpath('//a[@ui-sref="settings.accountPageSettings"]'));
        SF.sleep(3);
        SF.click(By.xpath('//li[@ng-repeat="menu in vm.menu"][9]'));
        SF.sleep(2);
    }
    function Board_OpenSettingsLongDistance() {
        SF.click(By.xpath('//a[@ui-sref="settings.longdistance"]'));
        SF.waitForVisible (By.xpath('//a[@ui-sref="settings.longdistance"]'));
        SF.sleep (4);
    }
    function Board_OpenSettingsAccountPagePendingInfo() {
	    SF.click(By.xpath('//a[@ui-sref="settings.accountPageSettings"]'));
	    SF.click(By.xpath('//span[@ng-if="greetingsSettings.showPeriod === \'first\'"]'));
	    SF.click(By.xpath('//li[@ng-repeat="menu in vm.menu"][10]'));
	    SF.sleep(2);
    }
    function BoardOpenSettingsLongDistanceStatus() {
        SF.click(By.xpath('//li[@ng-repeat="tab in vm.tabs"][5]'));
    }

    function Board_OpenSettingsDepartment() {
        Board_OpenSettingsGeneral();
        SF.click(By.xpath('//a[@ui-sref="settings.department"]'));
        SF.waitForVisible(By.xpath('//a[@ui-sref="settings.department"]'));
        SF.sleep(2);
        WaitWhileBusy();
    }
    function  Board_OpenSettingsValuation() {
        Board_OpenSideBar();
        SF.click(By.xpath('(//li[@ng-repeat="tab in vm.tabs"]/a[@ng-click="vm.select(tab)"])[13]'));
        SF.waitForVisible(By.xpath('//div[@class="valuation-plan-settings"]'));
        SF.sleep(1);
    }
    function Board_OpenSettingsContract() {
        Board_OpenSideBar();
        SF.click(By.xpath('//a[@ng-click="vm.goToPage(\'settings.general\', \'\')"]'));
        SF.waitForVisible(By.xpath('//a[@ng-click="vm.goToPage(\'settings.general\', \'\')"]'));
        Board_OpenSideBar();
        SF.click(By.xpath('(//li[@ng-repeat="tab in vm.tabs"]/a[@ng-click="vm.select(tab)"])[7]'));
        SF.waitForVisible(By.xpath('//h2[contains(text(),"Contract Settings")]'));
        SF.sleep(1);
    }
    function Board_OpenSettingsTemplateBuilder() {
        Board_OpenSettingsGeneral();
        SF.click(By.xpath('//a[@ui-sref="settings.templatebuilder"]'));
        SF.waitForVisible(By.xpath('//a[@ui-sref="settings.templatebuilder"]'));
        SF.sleep(2);
        WaitWhileBusy();

    }
	function Board_OpenSettingsCalculator() {
		Board_OpenSettingsGeneral();
		SF.click(By.xpath('//a[@ui-sref="settings.calculator"]'));
		SF.waitForVisible(By.xpath('//h3[contains(text(),"Test Calculator")]'));
		SF.sleep(2);
	}
    function Board_OpenDashboard() {
        SF.click(By.xpath('//a[@ui-sref="dashboard"]'));
        SF.sleep(2);
        WaitWhileBusy ();
    }
    function Board_RefreshDashboard(){
		SF.sleep(1);
        SF.click (By.xpath('//i[@ng-click="vm.refreshDashboard();"]'));
        WaitWhileBusy ();
    }
    function Board_SearchRequest(selector){
        SF.clear (By.id('gSearch'));
        SF.send (By.id('gSearch'), selector);
        SF.waitForLocated (By.xpath('//div[@ng-show="searchRequests.length"]'));
    }
    function Board_SearchOpenRequest(request) {
        SF.click(By.xpath('//div[@ng-bind-html="request.nid | searchfilter:search"]/span[contains(text(),"' + request.Id + '")]/..'));
        EditRequest_WaitForOpenRequest();
    }
    function Board_GetFirstFoundedId(request){
        SF.waitForLocated(By.xpath('//div[contains(@class, "requestsid")]'));
        WaitWhileBusy();
        driver.wait(driver.findElement(By.xpath('//div[contains(@class, "requestsid")]')).getText().then (function(text){
            request.Id = text;
        }), config.timeout);
        SF.sleep(1);
    }
    function Board_Refresh(){
        driver.navigate().refresh();
        SF.waitForLocated(By.linkText('Create Request'));
        SF.sleep (1.5);
        WaitWhileBusy();
    }
    function Board_OpenCourier() {
        SF.sleep(1);
        Board_ClickLongDistanceDispach();
        SF.sleep(1);
        SF.click(By.xpath('//a[@ui-sref="lddispatch.couriers"]'));
        SF.sleep(2);
    }
    function Board_OpenAgentFolio() {
        SF.sleep(1);
        Board_ClickLongDistanceDispach();
        SF.sleep(1);
        SF.click(By.xpath('//a[@ui-sref="lddispatch.agentFolio"]'));
        SF.sleep(2);
    }
    function Board_OpenJobsInSIT() {
        SF.sleep(1);
        Board_ClickLongDistanceDispach();
        SF.sleep(1);
        SF.click(By.xpath('//a[@ui-sref="lddispatch.sitJobs"]'));
        SF.sleep(3);
    }
    function BoardSIT_OpenStorages() {
        SF.sleep(1);
        Board_ClickLongDistanceDispach();
        SF.sleep(1);
        SF.click(By.xpath('//a[@ui-sref="lddispatch.lddispatchStorages"]'));
        SF.sleep(2);
    }
    function Board_OpenPickup() {
        SF.sleep(1);
        Board_ClickLongDistanceDispach();
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
        WaitWhileBusy();
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
        EditRequest_WaitForOpenRequest();
	}
    function Board_OpenFirstRequest(){
		SF.click(By.xpath('//td[@ng-click="requestEditModal(request)"]'));
		SF.click(By.xpath('//td[@ng-click="requestEditModal(request)"]'));
        EditRequest_WaitForOpenRequest();
    }

    function Board_CreateDraftRequest() {
        SF.click(By.xpath('//button[@ng-click="createDraft()"]'));
        EditRequest_WaitForOpenRequest();
    }
    function Board_OpenReserved() {
        SF.click(By.xpath('//div[@ng-click="vm.select(4)"]'));
        WaitWhileBusy ();
    }
    function Board_OpenReviewSettings() {
        SF.click(By.xpath('//button[@ng-click="openReviewSettings()"]'));
        SF.waitForLocated (By.id('template-container'));
    }
    function BoardSettings_ClickFuelSurcharge() {
        SF.click(By.linkText('Fuel Surcharge'));
        SF.sleep (2);
    }
    function Board_OpenInhomeEstimateTab() {
        SF.click(By.xpath('//div[@ng-click="vm.select(5)"]'));
        WaitWhileBusy();
    }
    function Board_ShowProtectionOnAccountPage(){
	    SF.click(By.xpath('//li[@uib-tooltip="Show Protection On Account Page"]'));
    }
    function Board_OpenPaymentCollected() {
        SF.click(By.xpath('//a[@ng-click="vm.goToPage(\'statistics.byrole\', \'\')"]'));
        SF.sleep(1);
        SF.click(By.xpath('//a[@ui-sref="statistics.paymentsCollected"]'));
        WaitWhileBusy();
    }


    //==============================CALCULATOR SETTINGS===========================
    function CalculatorSettings_OpenBasicSettings(){
		SF.click(By.xpath('(//a[@ng-click="vm.select(tab)"])[2]'));
    }
	function CalculatorSettings_OpenTravelTime(){
        SF.click(By.xpath('//h1[contains(text(),"General Settings")]'));
		SF.click(By.xpath('//li[@ng-repeat="tab in vm.tabs"][5]'));
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
	    SF.sleep(2);
        JS.scroll ('#conf_send,#conf_block :visible');
        SF.sleep (5);
        SF.click (By.xpath('//button[@ng-click="submitFlatRate()"]'));
        JS.waitForExist('button.confirm:contains("OK")');
        SF.sleep (2);
        SF.click(By.xpath('//button[@class="confirm"][contains(text(),"OK")]'));
    }
    function Account_Refresh() {
        driver.navigate().refresh();
        SF.waitForLocated (By.id('tab_Move Overview'));
        SF.sleep(2);
        WaitWhileBusy();
    }
    function Account_ClickViewRequest() {
        SF.sleep(1);
        SF.waitForLocated(By.xpath('//button[@ng-click="cancel()"][contains(text(),"View request")]'));
        SF.click(By.xpath('//button[@ng-click="cancel()"][contains(text(),"View request")]'));
        WaitWhileBusy ();
    }

    function Account_ClickPartialPacking() {
        SF.click(By.xpath('//label[@for="partial"]/input[@ng-model="vm.packing_service"]'));
        WaitWhileBusy();
        SF.sleep(6);
    }
    function Account_ClickFullPacking() {
        WaitWhileBusy();
        SF.click(By.xpath('//label[@for="full"]/input[@ng-model="vm.packing_service"]'));
        WaitWhileBusy();
        SF.sleep(6);
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
	function Account_CheckRequestStatus_PendingInfo() {
		SF.waitForVisible(By.xpath('//div[@ng-show="vm.statusText.length"]//div[contains(text(),"Pending-info")]'));
		driver.wait(driver.findElement(By.xpath('//div[@ng-show="vm.statusText.length"]//div[contains(text(),"Pending-info")]')).getText().then(function (Status) {
			VD.IWant(VD.ToEqual, Status, 'PENDING-INFO');
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
        SF.sleep(2);
    }

    function Account_OpenRequest(Id) {
	    WaitWhileBusy ();
        SF.click(By.xpath('//td[contains(text(),"' + Id + '")]/following-sibling::td/button[contains(text(),"View")]'));
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
        WaitWhileBusy();
    }

    function Account_WaitForDetailsCheck() {
        SF.waitForVisible(By.xpath('//li[@id="tab_Details"]//i[@class="icon-check"]'));
    }

    function Account_ClickFromStorage() {
        WaitWhileBusy();
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
    function Account_PreferredPickUpDate(firstDate, secondDate) {
        SF.click(By.xpath('//td[@data-month="'+ firstDate.Month +'"]/a[contains(text(),"'+ firstDate.Day +'")]'));
        SF.click(By.xpath('//td[@data-month="'+ secondDate.Month +'"]/a[contains(text(),"'+ secondDate.Day +'")]'));
    }
    function Account_PreferredDeliveryDate(firstDate, secondDate) {
        SF.click(By.xpath('//h4[contains(text(),"Preferred Delivery dates:")]/following-sibling::div[2]//td[@data-month="'+ firstDate.Month +'"]/a[contains(text(),"'+ firstDate.Day +'")]'));
        SF.click(By.xpath('//h4[contains(text(),"Preferred Delivery dates:")]/following-sibling::div[2]//td[@data-month="'+ secondDate.Month +'"]/a[contains(text(),"'+ secondDate.Day +'")]'));
    }

    function Account_ClickProceedBookYourMove() {
        SF.sleep(2);
        SF.click(By.xpath('//div[contains(@class,"notconfirmed")]'));
        WaitWhileBusy ();
    }
    function Account_ClickIAgreeWithAll() {
        SF.sleep(2);
        // SF.click(By.xpath('//input[@ng-model="vm.checkCancel"]'));
        SF.click(By.xpath('//input[@ng-model="vm.checkTerms"]'));
    }
    function Account_ClickConfirmReservation() {
        SF.click(By.xpath('//input[@ng-click="confirmReservation()"]'));
        SF.waitForVisible(By.xpath('//canvas[@id="signatureCanvasReservation"]'));
    }

    function Account_SweetUpdateConfirm() {
        JS.waitForExist('button.confirm:contains("Update")');
        SF.sleep(1.5);
        SF.click(By.xpath('//button[@class="confirm"][contains(text(),"Update")]'));
    }
    function Account_OpenAdressModal() {
        JS.click('span[ng-click=\\\"vm.openAddressModal()\\\"]:visible:first');
        SF.sleep(1);
    }
    function Account_WaitForLoadingAccount() {
        SF.waitForLocated (By.xpath('//div[@class="Move Overview"]'));
        SF.sleep (2);
    }
    function Account_ViewPackingRequest() {
        SF.click(By.xpath('//a[@ng-click="vm.goToNewRequest(vm.request.request_all_data.packing_request_id)"]'));
        WaitWhileBusy();
        SF.sleep(2);
    }

    function Account_ClickInventoryOpenTab() {
        WaitWhileBusy();
        SF.click(By.id('tab_Inventory'));
        WaitWhileBusy();
        JS.waitForExist('a[ng-repeat="filter in room.filters track by $id(filter)"]');
        SF.sleep(2);
    }
    function Account_ClickSaveInventory() {
        SF.sleep(2);
        SF.click(By.xpath('//span[contains(text(), "Save Inventory")]'));
        SF.sleep(3);
        SweetConfirm();
        SF.sleep(2);
    }
    function Account_OpenEditModal() {
        SF.click(By.xpath('//div[@ng-click="openEditModal()"]'));
        SF.sleep(1.5);
    }
    function Account_SetCommercialMoveSize() {
        SF.click(By.xpath('//oi-select[@ng-model="commercialSize"]'));
        SF.sleep(0.3);
        SF.click(By.xpath('//oi-select[@ng-model="commercialSize"]/div[2]//li[1]'));
    }
    function Account_SendAdressFromModalWindow() {
        SF.click(By.xpath('//input[@ng-value="request.field_moving_from.thoroughfare"]'));
        SF.send(By.xpath('//input[@ng-value="request.field_moving_from.thoroughfare"]'), 'blablabla');
        SF.send(By.xpath('//input[@ng-value="request.apt_from.value"]'), 123);
    }
    function Account_SendAdressToModalWindow() {
        SF.click(By.xpath('//input[@ng-value="request.field_moving_to.thoroughfare"]'));
        SF.send(By.xpath('//input[@ng-value="request.field_moving_to.thoroughfare"]'), 'tratatata');
        SF.send(By.xpath('//input[@ng-value="request.apt_to.value"]'), 258);
    }
    function Account_ClickUpdateClientInModalWindow() {
        SF.click(By.xpath('//button[@ng-click="update(client)"]'));
        SF.sleep(1);
    }
    function Account_ClickDetails() {
        WaitWhileBusy();
        SF.click(By.xpath('//li[@id="tab_Details"]'));
        WaitWhileBusy();
    }
    function Account_ClickSaveDetails() {
        WaitWhileBusy();
        SF.click(By.xpath('//button[@ng-click="saveDetails()"]'));
        driver.executeScript("$('body').scrollTop(0);");
        SF.sleep(4);
    }
    function Account_SelectParking() {
        SF.select (By.xpath('//select[@ng-model="details.current_permit"]'), "PM");
        SF.select (By.xpath('//select[@ng-model="details.new_permit"]'), "PR");
        SF.sleep(1);
    }
    function Account_ChangeAmountOfLiability(number){
        Account_ClickAndOpenFullValueModal();
	    SF.click(By.xpath('//input[@ng-model-options="{\'updateOn\': \'blur\'}"]'));
	    SF.send(By.xpath('//input[@ng-model-options="{\'updateOn\': \'blur\'}"]'),number);
	    SF.click(By.xpath('//div[@ng-bind-html="textforshow"]'));
        Account_ClickSaveFullValueModal();
    }
    function Account_ClickAndOpenFullValueModal() {
        SF.sleep(1);
        SF.click(By.xpath('//div[@ng-click="openValuationAccountModalForFullValue()"]'));
        SF.sleep(1);
    }
    function Account_SendAmountOfLiability(number) {
        SF.click(By.xpath('//input[@ng-model-options="{\'updateOn\': \'blur\'}"]'));
        SF.send(By.xpath('//input[@ng-model-options="{\'updateOn\': \'blur\'}"]'),number);
    }
    function Account_ClickSaveFullValueModal() {
        SF.click(By.xpath('//button[@ng-click="clickSave()"]'));
    }
    function Account_ConfirmationClickPayDeposit() {
        SF.click(By.xpath('//div[@ng-click="addReservationPayment()"]'));
        SF.waitForVisible(By.xpath('//canvas[@id="signatureCanvasReserv"]'));
    }
    function Account_ConfirmationClickSaveSignature() {
        SF.click(By.xpath('//button[contains(@ng-click,"saveReservSignature()")]'));
    }
    function Account_Click60centPerPound() {
        SF.click(By.xpath('//md-checkbox[@ng-change="setValuationType(valuationTypes.PER_POUND)"]'));
    }

    //===================================CONTRACT===================================

    function Contract_WaitConfirmationPage() {
        JS.waitForExist('h1:contains("Confirmation Page"):visible');
    }

    function Contract_WaitBillOfLading() {
        SF.waitForVisible(By.xpath('//local-moves[@id="main-contract"]//div[@class="empty-signature"]'));
    }

    function Contract_OpenBillOfLading() {
        WaitWhileBusy();
        SF.click(By.xpath('//li[@id="tab_Bill of lading"]'));
        SF.sleep(1);
    }

    function Contract_DeclarationValueA() {
		WaitWhileBusy();
		SF.select(By.xpath('//select[@ng-model="data.declarationValue.selected"]'), 'a');
    }

    function Contract_ClickPay() {
        WaitWhileBusy ();
        SF.sleep(1);
        JS.click('div[ng-click=\\"applyPayment(paymentButton())\\"]:visible');
        SF.sleep(1)
    }

    function Contract_ClickTips10() {
        SF.sleep(1);
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
        SF.sleep(1);
        SF.send(By.xpath('//input[@id="inputImage"]'), path);
        SF.sleep(1);
    }

    function Contract_SaveImages() {
        SF.click(By.xpath('//button[contains(@ng-click,"saveFile()")]'));
        JS.waitForNotExist("button[ng-click=\"saveFile()\"]");
        WaitWhileBusy();
    }

    function Contract_Submit(contractNumbers) {
        WaitWhileBusy();
        driver.wait(driver.executeScript('return $(\'tr[ng-if="contract_page.paymentTax.creditCharge.state"] span\').text()').then(function (text) {
            contractNumbers.CreditCardPercentSumm = SF.cleanPrice(text);
            console.log(contractNumbers.CreditCardPercentSumm);
        }),config.timeout);
        SF.sleep(2);
        SF.click(By.xpath('//button[@ng-click="submitContractBtn({ isBtn: true, lastPageSubmit: true})"]'));
        SF.sleep(15);
        SweetConfirm();
    }

    function Contract_ReturnToForeman() {
        JS.scroll('a:contains("Return to foreman page")');
        WaitWhileBusy();
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
    function Contract_ClickPlusForOpenSubMenuStorageAndOvernight() {
        SF.sleep(1);
        SF.click(By.xpath('//a[@ng-click="showTransit()"]'));
        SF.sleep(0.5);
    }
    function Contract_ClickCorningToStorage() {
        SF.click(By.xpath('//button[@ng-click="openInventory()"]'));
        SF.waitForVisible(By.xpath('//h4[contains(text(),"household goods descriptive inventory")]'));
    }
    function Contract_ClickDoneWithInventory() {
        SF.click(By.xpath('//button[@ng-click="doneWithInventory()"]'));
        SweetConfirm();
        WaitWhileBusy();
    }
    function Contract_RemoveMonthlyStorageFee() {
        SF.click(By.xpath('//input[@value="Monthly Storage Fee"]/../following-sibling::td[3]/p[@ng-click="removeCharge($index)"]'));
    }
    function Contract_PayCash(boardNumbers) {
        SF.click(By.xpath('//div[@ng-click="choosePayment(\'cashPay\')"]'));
        if (boardNumbers != undefined) {
            driver.wait(driver.executeScript('return $(\'input[ng-click="applyPayment()"]\').val()').then(function (text) {
                boardNumbers.paidContractCash = SF.cleanPrice(text);
            }), config.timeout);
        }
        SF.click(By.xpath('//input[@ng-click="applyPayment()"]'));
        WaitWhileBusy();
        SF.sleep(2);
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
        WaitWhileBusy();
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
    function ClickCreateStorageTenant() {
        SF.click(By.xpath('//button[@ng-click="pending.createModal()"]'));
        WaitWhileBusy ();
        SF.sleep (2);
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
    function EditRequest_ClickCreatePAckingDay() {
        SF.click(By.xpath('//img[@class="request-multiple-button__icon"]'));
        SF.sleep(1);
        SF.click(By.xpath('//img[@class="request-multiple-button__icon"]/following-sibling::img[@ng-click="doAction($index)"][3]'));
        SF.sleep(1);
        SweetConfirm ();
        WaitWhileBusy ();
        JS.waitForNotExist('div.busy:visible');
        SF.sleep (15);
    }
    function EditRequest_ClickCreateClone() {
        SF.click(By.xpath('//img[@class="request-multiple-button__icon"]'));
        SF.sleep(1);
        SF.click(By.xpath('//img[@class="request-multiple-button__icon"]/following-sibling::img[@ng-click="doAction($index)"][1]'));
        SF.sleep(1);
        SweetConfirm ();
        WaitWhileBusy ();
        JS.waitForNotExist('div.busy:visible');
        SF.sleep (15);
    }
    function EditRequest_WaitForVisibleCloneRequest() {
        SF.waitForLocated (By.xpath('//div[contains(@class,"requestModal status_1")]//a[@ng-click="select(tabs[0])"]'));
        WaitWhileBusy();
    }

    function EditRequest_OpenClient() {
        SF.click(By.xpath('//a[@ng-click="select(tabs[4])"]'));
    }
    function EditRequest_OpenMessages() {
        SF.click(By.xpath('//a[@ng-click="select(tabs[3])"]'));
        SF.sleep (1);
        WaitWhileBusy ();
    }
    function EditRequest_OpenRequest() {
        SF.click(By.xpath('//a[@ng-click="select(tabs[0])"]'));
        WaitWhileBusy();
    }
    function EditRequest_OpenPayment() {
        JS.click('label[ng-click=\\"OpenPaymentModal();\\"]:visible');
        SF.waitForVisible (By.xpath('//div[@class="inside_box"]'));
        SF.sleep (2);
        WaitWhileBusy();
    }
    function EditRequest_ClosePayment() {
		SF.click (By.xpath('//button[@ng-click="save()"]'));
		SF.sleep (3);
    }

    function EditRequest_SetToNotConfirmed() {
        SF.select(By.xpath('//select[@id="edit-status"]'), 2);
    }
	function EditRequest_SetToInhomeEstimate() {
		SF.select(By.xpath('//select[@id="edit-status"]'), 4);
	}
    function EditRequest_SetToConfirmed() {
        SF.select(By.xpath('//select[@id="edit-status"]'), 3);
    }
    function EditRequest_ChangeStatusRequest(number) {
        SF.select(By.xpath('//select[@id="edit-status"]'), number);
    }
    function EditRequest_SetToUploading() {
        SF.select(By.xpath('//select[@id="edit-service"]'), 3);
    }
    function EditRequest_SaveChanges() {
        JS.click('button[ng-click=\\"UpdateRequest()\\"]');
        JS.waitForExist('button[ng-click="update(request)"]:visible');
        SF.sleep(1);
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
        WaitWhileBusy();
    }
    function EditRequest_PayrollAddForeman(name){
        SF.click(By.xpath('//div[@ng-click="addWorker(\'foreman\')"]'));
        SF.click(By.xpath('(//select[@ng-model="selected.foreman[foremanIndex]"])[last()]'));
        SF.click(By.xpath('(//select[@ng-model="selected.foreman[foremanIndex]"])[last()]/option[contains(text(),"'+name+'")]'));
        WaitWhileBusy();
    }
    function EditRequest_PayrollAddHelper(name) {
        SF.click(By.xpath('//div[@ng-click="addWorker(\'helper\')"]'));
        SF.click(By.xpath('(//select[@ng-model="selected.helper[helperIndex]"])[last()]'));
        SF.click(By.xpath('(//select[@ng-model="selected.helper[helperIndex]"])[last()]/option[contains(text(),"'+name+'")]'));
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
    function EditRequest_PayrollOpenHelperTab() {
        SF.click(By.xpath('//li[@heading="Helpers"]/a'));
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
                objectToStore.total = Math.floor(SF.cleanPrice(text));
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
                    objectToStore.total = Math.floor(SF.cleanPrice(text));
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
        SF.sleep(2);
    }

    function EditRequest_OpenLogs() {
        WaitWhileBusy();
        SF.click(By.xpath('//a[@ng-click="select(tabs[5])"]'));
        WaitWhileBusy();
        JS.waitForExist('div[ng-repeat="log in allLogs | orderBy: \\\'-id\\\' track by $index "]:eq(3)');
    }

    function EditRequest_ExpandPendingEmail(email) {
        SF.click(By.xpath('//span[@ng-bind-html="toTrustedHTML(item.text)"][contains(text(),"Request Quote (Pending Status)")]' +
            '[contains(text(),"' + email + '")]/../../../following-sibling::div[1]'));
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
        JS.click('div[ng-show="::showManagerDropdown(currentManager.first_name)"] button');
        SF.click (By.xpath('//div[@ng-show="::showManagerDropdown(currentManager.first_name)"]//' +
            'ul[@ng-show="showManagerDropdown(currentManager.first_name)"]/li['+number+']'));
        SweetConfirm();
        SF.sleep (5);
    }
    function EditRequest_SetSizeOfMoveNumber(number){
        SF.select(By.xpath('//select[@id="edit-size-move"]'),number);
        SF.sleep(1);
    }

    function EditRequest_RememberCbf(boardNumbers){
        driver.wait(driver.findElement(By.xpath('//span[contains(text(),"c.f.")]/preceding-sibling::span[1]')).getText().then(function(text){
            boardNumbers.cbf = SF.cleanPrice(text);
        }),config.timeout);
        SF.sleep(1);
    }
    function EditRequest_RememberLbs(boardNumbers){
        driver.wait(driver.findElement(By.xpath('//span[contains(text(),"lbs")]/preceding-sibling::span[1]')).getText().then(function(text){
            boardNumbers.lbs = SF.cleanPrice(text);
        }),config.timeout);
        SF.sleep(1);
    }
    function EditRequest_SwitchCalculator(){
        SF.click(By.xpath('//span[@ng-click="switchCalc()"]'));
        WaitWhileBusy();
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
        WaitWhileBusy();
        SF.sleep(2)
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
        WaitWhileBusy();
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
        SF.sleep (3.5);
        WaitWhileBusy();
    }
    function EditRequest_OpenContractCloseJob() {
        driver.findElement(By.xpath('//a[contains(@class,"open_button_contract")]')).click();
        SF.sleep (3);
    }
    function EditRequest_Check1EmailExist(receiver, Subject) {
        driver.wait(driver.findElements(By.xpath('//div[@ng-show="tabs[0].selected"]//span[' +
            'contains(text(),\'Mail was sent to "'+receiver+'".\') and ' +
            'contains(text(),\'Subject: "'+Subject+'\')]')).then(function(array){
            VD.IWant(VD.ToEqual, array.length,1,'имейл '+Subject+' не был отправлен на '+receiver+' или отправлен несколько раз');
        }), config.timeout);
    }
    function EditRequest_Check1EmailNotExist(receiver, Subject) {
        driver.wait(driver.findElements(By.xpath('//div[@ng-show="tabs[0].selected"]//span[' +
            'contains(text(),\'Mail was sent to "'+receiver+'".\') and ' +
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
        SF.sleep(2);
        SF.click(By.xpath('//button[@ng-click="updateNote()"]'));
        WaitWhileToaster ();
    }

    function EditRequest_SaveNotesForeman() {
        SF.sleep(2);
        SF.click(By.xpath('//div[contains(@class, "foreman_notes")]/following-sibling::button[@ng-click="updateNote()"]'));
        WaitWhileToaster ();
    }
    function EditRequest_SaveNotesClient() {
        SF.sleep(2);
        SF.click(By.xpath('//div[contains(@class, "client_notes")]/following-sibling::button[@ng-click="updateNote()"]'));
        WaitWhileToaster ();
    }
    function EditRequest_ClickViewRequest() {
        SF.click(By.xpath('//button[@ng-click="goToRequest()"]'));
        SF.sleep(3);
    }
    function EditRequest_OpenPaymentModalWindow() {
        SF.click(By.xpath('//label[@ng-click="OpenPaymentModal();"]'));
        SF.waitForLocated (By.xpath('//button[@ng-click="cancel()"]'));
        WaitWhileBusy ();
    }
    function EditRequest_OpenDiscountModal() {
        SF.click(By.xpath('//label[@ng-click="OpenDiscountModal();"]'));
        SF.waitForLocated (By.xpath('//button[@ng-click="openCouponModal()"]'));
        SF.sleep(2);
    }
    function EditRequest_SendMoneyDiscount(number) {
        SF.click(By.xpath('//input[@ng-model="request.request_all_data.add_money_discount"]'));
        SF.send(By.xpath('//input[@ng-model="request.request_all_data.add_money_discount"]'), number);
        SF.click(By.xpath('//input[@ng-model="request.request_all_data.add_percent_discount"]'));
        SF.click(By.xpath('//button[@ng-click="Apply()"]'));
        SweetConfirm ();
        SF.sleep(3);
        WaitWhileToaster();
    }
    function EditRequest_OpenDetails() {
        SF.click(By.xpath('//a[@ng-click="select(tabs[2])"]'));
        WaitWhileBusy();
        SF.sleep(1);
    }
    function EditRequest_SaveDetails() {
        SF.click(By.xpath('//button[@ng-click="saveDetails()"]'));
        WaitWhileBusy();
    }
    function EditRequest_ClickDefaultCubFit() {
        SF.click (By.xpath('//div[@ng-click="selectList(1)"]'));
        SF.sleep(2);
    }
    function EditRequest_ClickSizeInventory() {
        SF.click (By.xpath('//div[@ng-click="selectList(2)"]'));
    }
    function EditRequest_ClickCustomCubFit() {
        SF.click (By.xpath('//div[@ng-click="selectList(3)"]'));
    }
    function EditRequest_SendNumberCustomCubFit(number) {
        SF.clear(By.xpath('//input[@ng-model="request.custom_weight.value"]'));
        SF.send(By.xpath('//input[@ng-model="request.custom_weight.value"]'), number);
        SF.click(By.xpath('//h3[contains(text(), "Auto Calculator")]'));
        SF.sleep(1);
    }
    function EditRequest_ClickFlatRateLocalMove() {
        SF.click(By.xpath('//input[@ng-model="request.field_flat_rate_local_move.value"]/..'));
    }
    function EditRequest_SendFlatRateSumm(sum) {
        SF.clear (By.xpath('//input[@ng-model="request.flat_rate_quote.value"]'));
        SF.send (By.xpath('//input[@ng-model="request.flat_rate_quote.value"]'), sum);
    }
    function EditRequest_SendRateForLD(rate) {
        SF.click(By.xpath('//input[@ng-model="request.field_long_distance_rate.value"]'));
        SF.clear(By.xpath('//input[@ng-model="request.field_long_distance_rate.value"]'));
        SF.send(By.xpath('//input[@ng-model="request.field_long_distance_rate.value"]'), rate);
        SF.sleep(1);
    }
    function EditRequest_WaitForOpenRequest() {
        SF.waitForVisible(By.xpath('//div[@ng-click="chooseTruck(tid)"]'));
        WaitWhileBusy ();
    }
    function EditRequest_ClickAddCustomPayment() {
        WaitWhileBusy();
        SF.click(By.xpath('//a[@ng-click="addCustomPayment()"]'));
        SF.waitForVisible (By.xpath('//form[@name="clientForm"]'));
    }
    function EditRequest_CloseCloneRequest() {
        SF.click(By.xpath('//div[contains(@class,"requestModal status_1")]//button[@ng-click="cancel()"]'));
        SF.sleep (2);
    }
    function EditRequest_OpenBindingPackingDayRequest() {
        SF.click(By.xpath('//span[@ng-click="openBindingRequest(request.request_all_data.packing_request_id)"]'));
    }
    function EditRequest_OpenPackingRequestFromRequest() {
        SF.click(By.xpath('//div[@ng-click="openBindingRequest(request.request_all_data.packing_request_id)"]'));
    }

    function EditRequest_ClientTabSendCompanyName(name) {
        SF.click(By.xpath('//input[@ng-model="request.field_commercial_company_name.value"]'));
        SF.send(By.xpath('//input[@ng-model="request.field_commercial_company_name.value"]'), name);
    }
    function EditRequest_OpenRemainderWindow() {
        SF.click(By.xpath('//span[@ng-click="openReminderBox()"]'));
        WaitWhileBusy();
    }
    function EditRequest_ClosePickUpJob() {
        SF.click(By.xpath('//h2[contains(text(),"Pickup")]/..//div[@ng-click="closeJob(\'Pickup Done\');"]'));
        WaitWhileBusy ();
    }
    function EditRequest_SetDeliveryStartTime() {
        SF.sleep (0.5);
        SF.clear(By.xpath('//input[@ng-model="request.delivery_start_time.value"]'));
        SF.send(By.xpath('//input[@ng-model="request.delivery_start_time.value"]'),  '02:00 AM');
    }
    function EditRequest_OpenFuelSurchModal() {
        SF.click(By.xpath('//label[@ng-click="OpenSurchargeModal();"]'));
        SF.waitForVisible(By.xpath('//input[@ng-model="request.request_all_data.surcharge_fuel"]'));
        SF.sleep(2);
    }
    function EditRequest_OpenInventoryTab() {
        SF.click(By.xpath('//ul[@class="nav nav-tabs"]//a[@ng-click="select(tabs[1])"]'));
        SF.sleep (2);
        WaitWhileBusy ();
    }
    function EditRequest_CreateCustomBedroom() {
        SF.sleep(2);
        SF.click(By.xpath('//div[@ng-click="createCustomRoom(\'2\')"]'));
        SweetConfirm();
        SF.sleep(6);
    }
    function EditRequest_CreateCustomRoom() {
        SF.sleep(1.5);
        SF.click(By.xpath('//div[@ng-click="createCustomRoom(\'1\')"]'));
        SF.sleep(1.5);
        SweetConfirm();
        SF.sleep(4);
    }
    function EditRequest_ClickSaveInventory() {
        SF.sleep(1);
        SF.click(By.xpath('//span[contains(text(), "Save Inventory")]'));
        SF.sleep(2);
    }
    function EditRequest_ClickHomeEstimateDate() {
        SF.click (By.xpath('//input[@ng-click="opentDatePicker()"]'));
    }

    function EditRequest_SaveChangesClosingTab() {
        SF.sleep(1);
        SF.click(By.xpath('//button[@ng-click="UpdateRequestInvoice()"]'));
        JS.waitForExist('button[ng-click="update(request)"]:visible');
        SF.sleep(1);
        SF.click(By.xpath('//button[@ng-click="update(request)"]'));
        JS.waitForExist("div.toast-success:visible");
        WaitWhileBusy();
    }
    function EditRequest_ChangeCrew(num) {
        SF.clear(By.xpath('//input[@ng-model="request.crew.value"]'));
        SF.send(By.xpath('//input[@ng-model="request.crew.value"]'), num);
    }
    function EditRequest_ChangeRate(rate) {
        SF.clear(By.xpath('//input[@ng-model="request.rate.value"]'));
        SF.send(By.xpath('//input[@ng-model="request.rate.value"]'), rate);
    }
    function EditRequest_SendFlatSurchargeInFuelWindow(sum) {
        SF.click(By.xpath('//input[@ng-change="changeSurcharge(\'request\',\'perc\')"]'));
        SF.send(By.xpath('//input[@ng-change="changeSurcharge(\'request\',\'perc\')"]'), sum);
    }
    function EditRequest_ClickApplyInFuelWindow() {
        SF.click(By.xpath('//button[@ng-click="Apply()"]'));
        SF.sleep(4);
        WaitWhileToaster();
    }
    function EditRequest_OpenMinPriceWindow() {
        SF.click(By.xpath('//div[@ng-click="openMinWeight()"]'));
        SF.waitForVisible(By.xpath('//input[@ng-model="min_price"]'));
    }
    function EditRequest_SetMinPrice(MinPrice) {
        SF.clear(By.xpath('//input[@ng-model="min_price"]'));
        SF.send(By.xpath('//input[@ng-model="min_price"]'), MinPrice);
    }
    function EditRequest_SetMinWeight(MinCF) {
        SF.clear(By.xpath('//input[@ng-model="min_weight"]'));
        SF.send(By.xpath('//input[@ng-model="min_weight"]'), MinCF);
    }
    function EditRequest_MinPriceWindowSwitchOnOff() {
        SF.click(By.xpath('//div[@class="col-md-5 text-center"]//span[@class="switchery switchery-small"]'));
    }
    function EditRequest_HomeEstimate_SaveChanges(){
        SF.click(By.xpath('//button[@ng-click="saveChanges()"]'));
        SF.click(By.xpath('//button[@ng-click="update(request)"]'));
	    WaitWhileToaster();
	    WaitWhileBusy();
    }
    function EditRequest_SetZipCodeFrom(zipFrom) {
        SF.click(By.xpath('//input[@ng-model="request.field_moving_from.postal_code"]'));
        driver.findElement(By.xpath('//input[@ng-model="request.field_moving_from.postal_code"]')).sendKeys(Key.chord((Key.CONTROL + 'a')));
        SF.send(By.xpath('//input[@ng-model="request.field_moving_from.postal_code"]'), zipFrom);
    }
    function EditRequest_SetZipTo(zipTo) {
        SF.click(By.xpath('//input[@ng-model="request.field_moving_to.postal_code"]'));
        driver.findElement(By.xpath('//input[@ng-model="request.field_moving_to.postal_code"]')).sendKeys(Key.chord((Key.CONTROL + 'a')));
        SF.send(By.xpath('//input[@ng-model="request.field_moving_to.postal_code"]'), zipTo);
    }
    function EditRequest_AddExtraPickUpZip(ExtraPickUpZip) {
        SF.click(By.xpath('//i[@ng-click="request.extraPickup=true"]'));
        SF.send(By.xpath('//input[@ng-model="request.field_extra_pickup.postal_code"]'), ExtraPickUpZip);
    }
    function EditRequest_AddExtraDropOffZip(ExtraDropOffZip) {
        SF.click(By.xpath('//i[@ng-click="request.extraDropoff=true"]'));
        SF.send(By.xpath('//input[@ng-model="request.field_extra_dropoff.postal_code"]'), ExtraDropOffZip);
    }
    function EditRequest_SetExtraPickUpAdress(ExtraPickUpAdress) {
        SF.send (By.xpath('//input[@ng-model="request.field_extra_pickup.thoroughfare"]'), ExtraPickUpAdress);
    }
    function EditRequest_SetExtraDropOffAdress(ExtraDropOffAdress) {
        SF.send (By.xpath('//input[@ng-model="request.field_extra_dropoff.thoroughfare"]'), ExtraDropOffAdress);
    }
    function EditRequest_SetExtraPickUpApt(ExtraPickUpApt) {
        SF.send(By.xpath('//input[@ng-model="request.field_extra_pickup.premise"]'), ExtraPickUpApt);
    }
    function EditRequest_SetExtraDropOffApt(ExtraDropOffApt) {
        SF.send(By.xpath('//input[@ng-model="request.field_extra_dropoff.premise"]'), ExtraDropOffApt);
    }
    function EditRequest_SetExtraPickUpStairs(number) {
        SF.select(By.xpath('//select[@ng-change="changeRequestField(\'field_extra_pickup\')"]'), number);
    }
    function EditRequest_SetExtraDropOffStairs(number) {
        SF.select(By.xpath('//select[@ng-change="changeRequestField(\'field_extra_dropoff\')"]'), number);
    }
    function EditRequest_ChangeStairsFrom(number) {
        SF.select(By.xpath('//select[@field="[request.type_from, \'type_from\']"]'), number);
        WaitWhileBusy();
    }
    function EditRequest_ChangeStairsTo(number) {
        SF.select(By.xpath('//select[@field="[request.type_to, \'type_to\']"]'), number);
        WaitWhileBusy();
    }
    function EditRequest_OpenSITmodal() {
        SF.click(By.xpath('//a[@ng-click="openSendRequestToSITModal()"]'));
        WaitWhileBusy();
    }
    function EditRequest_SITmodalSetStorage(nameStorage) {
        SF.click(By.xpath('//select[@ng-model="sit.storage_id"]'));
        SF.click(By.xpath('//option[text()="'+nameStorage+'"]'));
    }
    function EditRequest_SITmodalSetBlankets(blankets) {
        SF.click(By.xpath('//input[@ng-model="sit.blankets"]'));
        SF.clear(By.xpath('//input[@ng-model="sit.blankets"]'));
        SF.send(By.xpath('//input[@ng-model="sit.blankets"]'), blankets);
    }
    function EditRequest_SITmodalSetForeman(SITForeman) {
        SF.click(By.xpath('//select[@ng-model="sit.foreman"]'));
        SF.click(By.xpath('//option[text()="'+SITForeman+'"]'));
    }
    function EditRequest_SITmodalSendNumberRooms(SITRooms) {
        SF.clear(By.xpath('//input[@ng-model="sit.rooms"]'));
        SF.send(By.xpath('//input[@ng-model="sit.rooms"]'), SITRooms);
    }
    function EditRequest_SITmodalClickSave() {
        SF.click(By.xpath('//a[@ng-click="save()"]'));
        WaitWhileBusy();
    }
    function EditRequest_SITmodalSetMoveDate(request) {
        SF.clear(By.xpath('//input[@ng-model="moveInDate"]'));
        SF.send(By.xpath('//input[@ng-model="moveInDate"]'),SF.dateToStringMMMDDYYYY(request.moveDate));
    }
    function EditRequest_OpenFuelModalClosingTab() {
        SF.click(By.xpath('//label[@ng-click="OpenSurchargeInvoiceModal();"]'));
        SF.waitForVisible(By.xpath('//input[@ng-model="invoice.request_all_data.surcharge_fuel"]'));
    }
    function EditRequest_SendSumFuelModalClocingTab(sum) {
        SF.click(By.xpath('//input[@ng-model="invoice.request_all_data.surcharge_fuel"]'));
        SF.send(By.xpath('//input[@ng-model="invoice.request_all_data.surcharge_fuel"]'),sum);
    }
    function EditRequest_ClickSaveFuelModalClosingTab() {
        SF.click(By.xpath('//button[@ng-click="Apply()"]'));
        SF.waitForVisible(By.xpath('//div[@class="toast toast-success"]'));
        SF.sleep(1);
    }
    function EditRequest_ClosingTabOpenDiscountModal() {
        SF.click(By.xpath('//label[@ng-click="OpenDiscountInvoiceModal();"]'));
        SF.waitForLocated (By.xpath('//button[@ng-click="openCouponModal()"]'));
        SF.sleep(2);
    }
    function EditRequest_ClosingTabDiscountModalSendMoney(sum) {
        SF.click(By.xpath('//input[@ng-model="invoice.request_all_data.add_money_discount"]'));
        SF.clear(By.xpath('//input[@ng-model="invoice.request_all_data.add_money_discount"]'));
        SF.send(By.xpath('//input[@ng-model="invoice.request_all_data.add_money_discount"]'), sum);
        SF.click(By.xpath('//input[@ng-model="invoice.request_all_data.add_percent_discount"]'));
    }
    function EditRequest_ClosingTabDiscountModalClickSave() {
        SF.click(By.xpath('//button[@ng-click="Apply()"]'));
        SweetConfirm ();
        SF.waitForVisible(By.xpath('//div[@class="toast-message"]'));
    }
    function EditRequest_SelectDistanceFromCurentDoor(feet) {
        SF.select(By.xpath('//select[@ng-model="details.current_door"]'), feet);
    }
    function EditRequest_SelectDistanceFromNewDoor(feet) {
        SF.select(By.xpath('//select[@ng-model="details.new_door"]'), feet);
    }
    function EditRequest_SetStepsOnStairsOrigin(steps) {
        SF.select(By.xpath('//select[@ng-model="details.steps_origin"]'), steps);
    }
    function EditRequest_SetStepsOnStairsDestination(steps) {
        SF.select(By.xpath('//select[@ng-model="details.steps_destination"]'), steps);
    }
    function EditRequest_OpenValuationModal() {
        SF.click(By.xpath('//label[@ng-click="openValuationModal()"]'));
        SF.waitForLocated (By.xpath('//div[@class="valuation__modal"]'));
        SF.sleep(1);
    }
    function EditRequest_ClickTabFullValue() {
        SF.click(By.xpath('//div[@ng-click="setValuationType(valuationTypes.FULL_VALUE)"]'));
        SF.sleep(1);
    }
    function EditRequest_ClickSaveValuation() {
        SF.click (By.xpath('//button[@ng-click="clickSave()"]'));
        SweetConfirm ();
        WaitWhileBusy ();
    }
    function EditRequest_SendAmountOfLiability(sum) {
        SF.click(By.xpath('//input[@ng-model="valuation.selected.liability_amount"]'));
        SF.send(By.xpath('//input[@ng-model="valuation.selected.liability_amount"]'), sum);
    }
    function EditRequest_OpenFullValueProtection (){
        SF.click(By.xpath('//div[@ng-click="setValuationType(valuationTypes.FULL_VALUE)"]'));
    }

    //=================================LOCAL DISPATCH============================

    function Board_OpenLocalDispatch() {
        Board_OpenSideBar();
        SF.sleep(0.5);
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
    function Dispatch_ShowScheduledJobs() {
        SF.select(By.xpath('//select[@ng-model="vm.reqFilter.type"]'), 1);
        WaitWhileBusy();
    }

    function Dispatch_WaitForCalendar() {
        SF.waitForLocated(By.xpath('//a[@class="ui-datepicker-next ui-corner-all"]'));
    }

    //===================================PAYROLL=====================================
    function Payroll_ClickAllDepartment() {
        SF.click(By.xpath('//a[@ng-click="dTable=\'departments\';employee=\'\'"]'));
        WaitWhileBusy();
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
        JS.link('ultrasmall-form a.submit_btn ');
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
        SF.waitForVisible (By.xpath('//label[contains(text(),"Department:")]'));
    }

    function Department_OpenMansPermissions() {
        SF.click(By.linkText("Permissions"));
        SF.sleep(1);
    }

    function Department_ClickPermissionsRequests() {
        SF.click(By.xpath('//ul[@class="nav nav-tabs submenu_tab"]/li[@ng-click="activePermTab = 1"]'));
        SF.waitForVisible(By.xpath('//div[@ng-class="{\'active\': activePermTab === 1}"]')); //?
    }
    function Department_ClickPermissionsRequestWindow() {
        SF.click(By.xpath('//ul[@class="nav nav-tabs submenu_tab"]/li[@ng-click="activePermTab = 2"]'));
        SF.waitForVisible(By.xpath('//div[@ng-class="{\'active\': activePermTab === 2}"]'));
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
        SF.sleep(1);
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
    function Department_ClearSendGmailAdress(mail) {
        SF.click (By.xpath('//input[@ng-model="gmail"]'));
        SF.clear (By.xpath('//input[@ng-model="gmail"]'));
        SF.send (By.xpath('//input[@ng-model="gmail"]'), mail);
    }
    function Department_OpenNotificationTab() {
        SF.click(By.xpath('//li[@ng-click="activeMainTab = 6"]'));
        JS.waitForExist ('md-switch[ng-change=\\"turnAllNotifications()\\"]:visible');
        SF.sleep(3);
    }
    function Department_DeleteUser() {
        SF.click (By.xpath('//button[@ng-click="deleteWorker()"]'));
        SF.sleep(2);
        WaitWhileBusy ();
        SweetConfirm ();
        WaitWhileToaster ();
        WaitWhileBusy ();
    }
    function Department_SetGoogleMail(mail) {
        SF.click (By.xpath('//input[@ng-model="gmail"]'));
        SF.clear (By.xpath('//input[@ng-model="gmail"]'));
        SF.click (By.xpath('//input[@ng-model="gmail"]'));
        SF.send (By.xpath('//input[@ng-model="gmail"]'), mail);
        WaitWhileBusy();
    }
    function Department_TurnOnAllGmailCalendar() {
        SF.click (By.xpath('//input[@ng-model="inputValue"]'));
        SF.click (By.xpath('//li[contains(text(), "Archive Calendar")]'));
        SF.click (By.xpath('//li[contains(text(), "Pending Calendar")]'));
        SF.click (By.xpath('//li[contains(text(), "Not Confirmed Calendar")]'));
        SF.click (By.xpath('//li[contains(text(), "Confirmed Calendar")]'));
    }

    //===================================FRONT SITE======================================
    function FrontSiteDown_SendZipCode(zipFrom, zipTo) {
        SF.sleep(0.5);
        SF.send (By.id('edit-zip-code-from'), zipFrom);
        SF.send (By.id('edit-zip-code-to'), zipTo);
    }
    function FrontSiteDown_SendZipCodeFrom(zipFrom) {
        SF.sleep(0.5);
        SF.send (By.id('edit-zip-code-from'), zipFrom);
    }
    function FrontSiteDown_SendZipCodeTo(zipTo) {
        SF.sleep(0.5);
        SF.send (By.id('edit-zip-code-to'), zipTo);
    }
    function FrontDown_SelectMoveSize(sizeChislo) {
        JS.select ('#edit-size-move', sizeChislo);
    }
    function FrontDown_SetEntrance() {
        JS.select ('#edit-type-from', 2);
        JS.select ('#edit-type-to', 5);
        SF.sleep (3);
    }
    function FrontSite_ClickQuoteCalculator() {
        SF.click (By.xpath('//a[@href="#request"]'));
        SF.sleep (3);
    }
    function FrontSite_ClickDesireMoveDate() {
        SF.click (By.xpath('//label[contains(text(), "Desired Move Date:")]/following-sibling::input[1]'));
    }
    function FrontSite_ClickDeliveryDate() {
        SF.sleep(2);
        SF.click (By.xpath('//label[contains(text(), "Desired Delivery Date:")]/following-sibling::input[1]'));
    }
    function FrontSite_SelectServiceType(number) {
        SF.click (By.xpath('//label[contains(text(), "Service Type:")]/following-sibling::select/option['+number+']'));
    }
    function FrontSite_ClickCalculate() {
        JS.click ('#calculate_btn');
        SF.waitForLocated (By.xpath('//div[@class="form_block calc-form"]'));
        SF.sleep (6.5);
    }
    function FrontSite_SetClientInfoDown(client) {
        SF.send(By.id('edit-first-name'), client.name);
        SF.send(By.id('edit-last-name'), client.fam);
        SF.sleep(0.3);
        SF.send(By.xpath('//div[@ng-if="!userLogin"]//input[@ng-model="request.primaryPhone"]'), client.phone);
        SF.sleep(0.3);
        SF.send(By.id('edit-additional-phone'), client.phone);
        SF.sleep(0.3);
        SF.send(By.xpath('//div[@ng-if="!userLogin"]//input[@ng-model="request.email"]'), client.email);
        SF.sleep(0.3);
        SF.send(By.id('edit-confirmemail'), client.email);
    }
    function FrontSite_SelectPreferedStartTime() {
        SF.click(By.id('prefeefe'));
        SF.click (By.xpath('//div[@id="pref_popup"]//div[@class="select_item pre_2"]'));
    }
    function FrontSite_SelectPreferedDeliveryTime() {
        SF.select(By.xpath('//select[@ng-model="request.prefDelivery"]'), 3);
    }
    function FrontSite_SelectGoogleSearch() {
        JS.select('select[ng-model="request.poll"]', 'Google search');
    }
    function FrontSite_ClickGoToCalculatorResults() {
        SF.click (By.xpath('//button[@ng-click="goToSummery()"]'));
        SF.sleep(8);
        JS.waitForNotExist ('div[ng-if="loadingImg"]');
        SF.sleep(2);
    }
    function FrontSite_SelectCommercialExtraRooms(value) {
        JS.select('select[ng-model="request.field_commercial_extra_rooms"]', 'string:'+value+'');
    }
    function FrontSite_GoToConfirmation() {
        SF.click(By.id('submitRequestButton'));
        SF.sleep (2);
    }
    function FrontSite_ViewRequestPage() {
        SF.click(By.linkText('View Request Page'));
        SF.sleep(6);
    }
    function FrontSiteSmallCalc_SendZipCode(zipFrom, zipTo) {
        SF.sleep(2);
        SF.send(By.xpath('//ultrasmall-form//input[@ng-model="request.zipFrom"]'), zipFrom);
        SF.send(By.xpath('//ultrasmall-form//input[@ng-model="request.zipTo"]'), zipTo);
        SF.sleep(2);
    }
    function FrontSiteSmallCalc_ClickCalendar() {
        driver.wait(driver.executeScript("$('ultrasmall-form input[ng-model=\"request.moveDate\"]').focus();"),config.timeout);
        JS.waitForExist('div.er-picker__box:visible');
        SF.sleep(2);
    }
    function FrontSiteSmallCalc_ClickContinue() {
        SF.sleep(2);
        driver.wait(driver.executeScript("$('ultrasmall-form input[ng-click=\"Continue1(\\\'step1\\\')\"]').click();"),config.timeout);
        SF.sleep(1);
    }
    function FrontSiteSmallCalc_ClickChooseMoveSize() {
        JS.click("ultrasmall-form div[ng-click=\\'openSlide();\\']");
        SF.sleep(1);
    }
    function FrontSiteSmallCalc_SelectMoveSize(number) {
        JS.click("div[ng-click=\"MoveSizePreviewClick(\\'"+number+"\\')\"]");
        SF.sleep(1);
    }
    function FrontSiteSmallCalc_ClickDoneMoveSize() {
        JS.click("button.pull-right:first");
        SF.sleep(1);
    }
    function FrontSiteSmallCalc_SelectEntrance(from, to) {
        JS.select('ultrasmall-form select[ng-model="request.typeFrom"]', from);
        SF.sleep(1);
        JS.select('ultrasmall-form select[ng-model="request.typeTo"]', to);
        SF.sleep(1);
    }
    function FrontSiteSmallCalc_ClickContinueContractInfo() {
        JS.click('div[ng-click="Continue2(\\\'step2\\\')"]');
        SF.sleep(2);
    }
    function FrontSiteSmallCalc_SetClientInfo(client) {
        SF.send(By.xpath('//ultrasmall-form//input[@ng-model="request.first_name"]'), client.name);
        SF.send(By.xpath('//ultrasmall-form//input[@ng-model="request.last_name"]'), client.fam);
        SF.send(By.xpath('//ultrasmall-form//input[@ng-model="request.email"]'), client.email);
        SF.send(By.xpath('//ultrasmall-form//input[@ng-model="request.primaryPhone"]'), client.phone);
        SF.sleep(0.5);
    }
    function FrontSiteSmallCalc_SubmitQuoteAndGoToAccount() {
        JS.click('div[ng-click=\\"blockCalculateSmallForm = true; Calculate(1,\\\'Website\\\')\\"]');
        SF.sleep(3);
        JS.waitForExist('ultrasmall-form #request-form .step4 p:contains("Proceed To View Your Quote"):visible');
        SF.sleep(1);
        JS.link('ultrasmall-form #step4 a.submit_btn:visible');
    }
    function FrontSiteSmallCalc_SendZipTo(zipTo) {
        SF.send(By.xpath('//ultrasmall-form//input[@ng-model="request.zipTo"]'), zipTo);
        SF.sleep(1);
    }
    function FrontSiteSmallCalc_SendZipFrom(zipFrom) {
        SF.send(By.xpath('//ultrasmall-form//input[@ng-model="request.zipFrom"]'), zipFrom);
        SF.sleep(1);
    }
    function FrontSiteSmallCalc_ClickNeedStorageCheckbox() {
        SF.sleep(3.5);
        JS.click("input#extra-service");
        SF.sleep(1.5);
    }
    function FrontSiteSmallCalc_SelectServiceType(number) {
        JS.select('select#edit-service',number);
        SF.sleep(1.5);
    }

    //==================================LONG DISTANCE SETTINGS==========================

    function LongDistanceSettings_ClickOnMapState(state) {
        JS.click(state);
        SF.waitForVisible (By.xpath('//div[@ng-if="vm.showSidebar"]'));
        SF.sleep (3);
    }
    function LongDistanceSettings_SelectMABasedState() {
        SF.select (By.xpath('//select[@ng-model="vm.longdistance.basedState"]'), 'MA');
        SF.sleep (2);
    }
    function LongDistanceSettings_SetMinCF(minCF) {
        SF.clear(By.xpath('//input[@ng-model="vm.longdistance.stateRates[vm.longdistance.basedState][vm.stateCode].min_weight"]'));
        SF.send(By.xpath('//input[@ng-model="vm.longdistance.stateRates[vm.longdistance.basedState][vm.stateCode].min_weight"]'), minCF);
    }
    function LongDistanceSettings_SetMinPrice(minPrice) {
        SF.clear(By.xpath('//input[@ng-model="vm.longdistance.stateRates[vm.longdistance.basedState][vm.stateCode].minPrice"]'));
        SF.send(By.xpath('//input[@ng-model="vm.longdistance.stateRates[vm.longdistance.basedState][vm.stateCode].minPrice"]'), minPrice);
    }
    function LongDistanceSettings_SetStateRate(stateRate) {
        SF.clear(By.xpath('//input[@ng-model="vm.longdistance.stateRates[vm.longdistance.basedState][vm.stateCode].state_rate"]'));
        SF.send(By.xpath('//input[@ng-model="vm.longdistance.stateRates[vm.longdistance.basedState][vm.stateCode].state_rate"]'), stateRate);
    }
    function LongDistanceSettings_AddDiscount() {
        SF.click(By.xpath('//div[@ng-click="addDiscount(-1)"]/span[contains(text(), "Set discount for larger shipments")]'));
        SF.sleep(2);
    }

    //==============================REMAINDERS===========================================//




    //==================================TRIPS============================================


    return {
        WaitVisibleDashboardForeman:WaitVisibleDashboardForeman,
        WaitVisibleDashboard:WaitVisibleDashboard,
        WaitWhileToaster: WaitWhileToaster,
        WaitWhileBusy: WaitWhileBusy,
        WaitWhileSpinner: WaitWhileSpinner,
        SweetConfirm: SweetConfirm,
        SweetCancel: SweetCancel,
        BoardAccount_SendMessage: BoardAccount_SendMessage,
        WaitWhileBusySymbol:WaitWhileBusySymbol,
        ConfirmCalculatorOff:ConfirmCalculatorOff,
        //==================================MAIL.RU and GMAIL=========================================

		MailRu_CheckEmailExistBySubject:MailRu_CheckEmailExistBySubject,

        //==================================FRONT SITE======================================
        FrontSite_GoToAccount: FrontSite_GoToAccount,
        //==================================LONG DISTANCE SETTINGS==========================
        LongDistanceSettings_ClickOnMapState: LongDistanceSettings_ClickOnMapState,
        LongDistanceSettings_SelectMABasedState: LongDistanceSettings_SelectMABasedState,
        LongDistanceSettings_SetMinCF:LongDistanceSettings_SetMinCF,
        LongDistanceSettings_SetMinPrice:LongDistanceSettings_SetMinPrice,
        LongDistanceSettings_SetStateRate:LongDistanceSettings_SetStateRate,
        LongDistanceSettings_AddDiscount:LongDistanceSettings_AddDiscount,

        ///===============================Profit and loss===============================


        //==================================CREATE REQUEST=================================

        CreateRequest_SelectServiceType:CreateRequest_SelectServiceType,
        CreateRequest_ClickMoveDateInput:CreateRequest_ClickMoveDateInput,
        CreateRequest_SelectExtraRooms:CreateRequest_SelectExtraRooms,
        CreateRequest_SendZipToZipFrom:CreateRequest_SendZipToZipFrom,
        CreateRequest_ClickCalculate:CreateRequest_ClickCalculate,
        CreateRequest_ClickContinue:CreateRequest_ClickContinue,
        CreateRequest_SendClientInfo:CreateRequest_SendClientInfo,
        CreateRequest_OpenMailDialog:CreateRequest_OpenMailDialog,
        CreateRequest_ClickCreate:CreateRequest_ClickCreate,
        CreateRequest_SelectCommercialMove:CreateRequest_SelectCommercialMove,
        CreateRequest_SelectStairsToFrom:CreateRequest_SelectStairsToFrom,

        //====================================DISPACH=======================================

        Dispach_ClickUnassignTeam:Dispach_ClickUnassignTeam,
        Dispach_ClickAddCrew:Dispach_ClickAddCrew,

        //------------------------------------SIT-------------------------------------------//

        SIT_ClickAddTrip:SIT_ClickAddTrip,
        SIT_ChangeStatusTrip:SIT_ChangeStatusTrip,
        SIT_SelectCarrierName:SIT_SelectCarrierName,
        SIT_AddRequestToTrip:SIT_AddRequestToTrip,
        SIT_GoToClosingTab:SIT_GoToClosingTab,
        SIT_ClickTripDetails:SIT_ClickTripDetails,
        SIT_ClickUpdateTrip:SIT_ClickUpdateTrip,
        SIT_ClickAddCarrier:SIT_ClickAddCarrier,
        SIT_ClickSaveCarrier:SIT_ClickSaveCarrier,
        SIT_ClickAddPickupDelivery:SIT_ClickAddPickupDelivery,
        SIT_RefreshJobsInTrip:SIT_RefreshJobsInTrip,
        SIT_ChangeStatusTripForemanHelper:SIT_ChangeStatusTripForemanHelper,
        SIT_AddDescriptionAndInternalCode:SIT_AddDescriptionAndInternalCode,

        //------------------------------------BOARD=========================================
        Board_ClickLongDistanceDispach:Board_ClickLongDistanceDispach,
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
        Board_OpenReview: Board_OpenReview,
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
        Board_OpenSettingsContract:Board_OpenSettingsContract,
        Board_OpenStatistic: Board_OpenStatistic,
        Board_OpenProfitLoss: Board_OpenProfitLoss,
		Board_OpenRequest: Board_OpenRequest,
		Board_OpenFirstRequest: Board_OpenFirstRequest,
		Board_OpenSettingsCalculator: Board_OpenSettingsCalculator,
        Board_OpenSettingsValuation:Board_OpenSettingsValuation,
        Board_CreateDraftRequest:Board_CreateDraftRequest,
        Board_OpenReserved:Board_OpenReserved,
        Board_OpenReviewSettings:Board_OpenReviewSettings,
        BoardSettings_ClickFuelSurcharge:BoardSettings_ClickFuelSurcharge,
        Board_OpenInhomeEstimateTab:Board_OpenInhomeEstimateTab,
        Board_OpenSettingsAccountPageFAQ:Board_OpenSettingsAccountPageFAQ,
        BoardOpenSettingsLongDistanceStatus:BoardOpenSettingsLongDistanceStatus,
	    Board_OpenSettingsAccountPagePendingInfo:Board_OpenSettingsAccountPagePendingInfo,
        Board_ShowProtectionOnAccountPage : Board_ShowProtectionOnAccountPage,
        Board_OpenPaymentCollected:Board_OpenPaymentCollected,
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
        Account_ClickFullPacking:Account_ClickFullPacking,
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
        Account_PreferredPickUpDate: Account_PreferredPickUpDate,
        Account_PreferredDeliveryDate: Account_PreferredDeliveryDate,
        Account_ClickProceedBookYourMove:Account_ClickProceedBookYourMove,
        Account_ClickIAgreeWithAll:Account_ClickIAgreeWithAll,
        Account_ClickConfirmReservation:Account_ClickConfirmReservation,
        Account_SweetUpdateConfirm:Account_SweetUpdateConfirm,
        Account_OpenAdressModal:Account_OpenAdressModal,
        Account_WaitForLoadingAccount:Account_WaitForLoadingAccount,
        Account_ViewPackingRequest:Account_ViewPackingRequest,
        Account_ClickInventoryOpenTab:Account_ClickInventoryOpenTab,
        Account_ClickSaveInventory:Account_ClickSaveInventory,
        Account_OpenEditModal:Account_OpenEditModal,
        Account_SetCommercialMoveSize:Account_SetCommercialMoveSize,
        Account_SendAdressFromModalWindow:Account_SendAdressFromModalWindow,
        Account_ClickUpdateClientInModalWindow:Account_ClickUpdateClientInModalWindow,
        Account_ClickDetails:Account_ClickDetails,
        Account_ClickSaveDetails:Account_ClickSaveDetails,
        Account_SendAdressToModalWindow:Account_SendAdressToModalWindow,
        Account_SelectParking:Account_SelectParking,
	    Account_CheckRequestStatus_PendingInfo: Account_CheckRequestStatus_PendingInfo,
	    Account_ChangeAmountOfLiability: Account_ChangeAmountOfLiability,
        Account_ClickAndOpenFullValueModal:Account_ClickAndOpenFullValueModal,
        Account_SendAmountOfLiability:Account_SendAmountOfLiability,
        Account_ClickSaveFullValueModal:Account_ClickSaveFullValueModal,
        Account_ConfirmationClickPayDeposit:Account_ConfirmationClickPayDeposit,
        Account_ConfirmationClickSaveSignature:Account_ConfirmationClickSaveSignature,
        Account_Click60centPerPound:Account_Click60centPerPound,
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
        Contract_ClickPlusForOpenSubMenuStorageAndOvernight:Contract_ClickPlusForOpenSubMenuStorageAndOvernight,
        Contract_ClickCorningToStorage:Contract_ClickCorningToStorage,
        Contract_ClickDoneWithInventory:Contract_ClickDoneWithInventory,
        Contract_RemoveMonthlyStorageFee:Contract_RemoveMonthlyStorageFee,
        Contract_PayCash:Contract_PayCash,
        //=================================EDIT STORAGE REQUEST=====================================
        EditStorage_RememberId: EditStorage_RememberId,
        EditStorage_OpenLedger: EditStorage_OpenLedger,
        EditStorage_OpenLotNumbers: EditStorage_OpenLotNumbers,
        EditStorage_SelectMoveIn:EditStorage_SelectMoveIn,
        EditStorage_OpenReccuring: EditStorage_OpenReccuring,
        EditStorage_StartReccuring: EditStorage_StartReccuring,
        EditStorage_CloseOpenModal: EditStorage_CloseOpenModal,
        StorageTenant_OpenStorages: StorageTenant_OpenStorages,
        EditStorage_UpdateStorage: EditStorage_UpdateStorage,
        EditStorage_OpenDocuments: EditStorage_OpenDocuments,
        ClickCreateStorageTenant:ClickCreateStorageTenant,
        //=================================EDIT REQUEST=====================================
        EditRequest_OpenSettings: EditRequest_OpenSettings,
        EditRequest_OpenMessages: EditRequest_OpenMessages,
        EditRequest_OpenLogs: EditRequest_OpenLogs,
        EditRequest_OpenClient: EditRequest_OpenClient,
        EditRequest_OpenRequest: EditRequest_OpenRequest,
        EditRequest_SetToNotConfirmed: EditRequest_SetToNotConfirmed,
        EditRequest_SetToInhomeEstimate: EditRequest_SetToInhomeEstimate,
        EditRequest_SetToUploading: EditRequest_SetToUploading,
        EditRequest_SaveChanges: EditRequest_SaveChanges,
        EditRequest_WaitForBalanceVisible: EditRequest_WaitForBalanceVisible,
        EditRequest_ScrollDown: EditRequest_ScrollDown,
        EditRequest_OpenPayroll: EditRequest_OpenPayroll,
        EditRequest_PayrollAddManager: EditRequest_PayrollAddManager,
        EditRequest_PayrollAddForeman: EditRequest_PayrollAddForeman,
        EditRequest_PayrollAddHelper:EditRequest_PayrollAddHelper,
        EditRequest_PayrollSetManagerCommission: EditRequest_PayrollSetManagerCommission,
        EditRequest_PayrollGetManagerCommission:EditRequest_PayrollGetManagerCommission,
        EditRequest_PayrollOpenForemanTab: EditRequest_PayrollOpenForemanTab,
        EditRequest_PayrollOpenHelperTab:EditRequest_PayrollOpenHelperTab,
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
        EditRequest_RememberLbs:EditRequest_RememberLbs,
        EditRequest_SwitchCalculator:EditRequest_SwitchCalculator,
        EditRequest_AddRoomNumber:EditRequest_AddRoomNumber,
        EditRequest_OpenFuel:EditRequest_OpenFuel,
        EditRequest_GetValueFromFuelModal:EditRequest_GetValueFromFuelModal,
        EditRequest_CloseConfirmWork: EditRequest_CloseConfirmWork,
        EditRequest_SetAdressToFrom: EditRequest_SetAdressToFrom,
        EditRequest_SetAdressFrom: EditRequest_SetAdressFrom,
        EditRequest_SetAdressTo: EditRequest_SetAdressTo,
        EditRequest_SetToConfirmed: EditRequest_SetToConfirmed,
        EditRequest_ChangeStatusRequest:EditRequest_ChangeStatusRequest,
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
        EditRequest_ClickViewRequest:EditRequest_ClickViewRequest,
        EditRequest_OpenPaymentModalWindow:EditRequest_OpenPaymentModalWindow,
        EditRequest_OpenDiscountModal:EditRequest_OpenDiscountModal,
        EditRequest_SendMoneyDiscount:EditRequest_SendMoneyDiscount,
        EditRequest_OpenDetails:EditRequest_OpenDetails,
        EditRequest_SaveDetails:EditRequest_SaveDetails,
        EditRequest_ClickDefaultCubFit:EditRequest_ClickDefaultCubFit,
        EditRequest_ClickSizeInventory:EditRequest_ClickSizeInventory,
        EditRequest_ClickCustomCubFit:EditRequest_ClickCustomCubFit,
        EditRequest_SendNumberCustomCubFit:EditRequest_SendNumberCustomCubFit,
        EditRequest_ClickFlatRateLocalMove:EditRequest_ClickFlatRateLocalMove,
        EditRequest_SendFlatRateSumm:EditRequest_SendFlatRateSumm,
        EditRequest_SendRateForLD:EditRequest_SendRateForLD,
        EditRequest_WaitForOpenRequest:EditRequest_WaitForOpenRequest,
        EditRequest_ClickAddCustomPayment:EditRequest_ClickAddCustomPayment,
        EditRequest_ClickCreatePAckingDay:EditRequest_ClickCreatePAckingDay,
        EditRequest_ClickCreateClone:EditRequest_ClickCreateClone,
        EditRequest_CloseCloneRequest:EditRequest_CloseCloneRequest,
        EditRequest_OpenBindingPackingDayRequest:EditRequest_OpenBindingPackingDayRequest,
        EditRequest_OpenPackingRequestFromRequest:EditRequest_OpenPackingRequestFromRequest,
        EditRequest_ClientTabSendCompanyName:EditRequest_ClientTabSendCompanyName,
        EditRequest_OpenRemainderWindow:EditRequest_OpenRemainderWindow,
        EditRequest_ClosePickUpJob:EditRequest_ClosePickUpJob,
        EditRequest_SetDeliveryStartTime:EditRequest_SetDeliveryStartTime,
        EditRequest_OpenFuelSurchModal:EditRequest_OpenFuelSurchModal,
        EditRequest_OpenInventoryTab:EditRequest_OpenInventoryTab,
        EditRequest_CreateCustomBedroom:EditRequest_CreateCustomBedroom,
        EditRequest_CreateCustomRoom:EditRequest_CreateCustomRoom,
        EditRequest_ClickSaveInventory:EditRequest_ClickSaveInventory,
        EditRequest_ClickHomeEstimateDate:EditRequest_ClickHomeEstimateDate,

        EditRequest_SaveChangesClosingTab:EditRequest_SaveChangesClosingTab,
        EditRequest_ChangeCrew:EditRequest_ChangeCrew,
        EditRequest_ClosePayment:EditRequest_ClosePayment,
        EditRequest_ChangeRate:EditRequest_ChangeRate,
        EditRequest_SendFlatSurchargeInFuelWindow:EditRequest_SendFlatSurchargeInFuelWindow,
        EditRequest_ClickApplyInFuelWindow:EditRequest_ClickApplyInFuelWindow,
        EditRequest_OpenMinPriceWindow:EditRequest_OpenMinPriceWindow,
        EditRequest_SetMinPrice:EditRequest_SetMinPrice,
        EditRequest_SetMinWeight:EditRequest_SetMinWeight,
        EditRequest_MinPriceWindowSwitchOnOff:EditRequest_MinPriceWindowSwitchOnOff,
	    EditRequest_HomeEstimate_SaveChanges:EditRequest_HomeEstimate_SaveChanges,
        EditRequest_SetZipCodeFrom:EditRequest_SetZipCodeFrom,
        EditRequest_SetZipTo:EditRequest_SetZipTo,
        EditRequest_AddExtraPickUpZip:EditRequest_AddExtraPickUpZip,
        EditRequest_AddExtraDropOffZip:EditRequest_AddExtraDropOffZip,
        EditRequest_SetExtraPickUpAdress:EditRequest_SetExtraPickUpAdress,
        EditRequest_SetExtraDropOffAdress:EditRequest_SetExtraDropOffAdress,
        EditRequest_SetExtraPickUpApt:EditRequest_SetExtraPickUpApt,
        EditRequest_SetExtraDropOffApt:EditRequest_SetExtraDropOffApt,
        EditRequest_SetExtraPickUpStairs:EditRequest_SetExtraPickUpStairs,
        EditRequest_SetExtraDropOffStairs:EditRequest_SetExtraDropOffStairs,
        EditRequest_ChangeStairsFrom:EditRequest_ChangeStairsFrom,
        EditRequest_ChangeStairsTo:EditRequest_ChangeStairsTo,
        EditRequest_OpenSITmodal:EditRequest_OpenSITmodal,
        EditRequest_SITmodalSetStorage:EditRequest_SITmodalSetStorage,
        EditRequest_SITmodalSetForeman:EditRequest_SITmodalSetForeman,
        EditRequest_SITmodalSetBlankets:EditRequest_SITmodalSetBlankets,
        EditRequest_SITmodalSendNumberRooms:EditRequest_SITmodalSendNumberRooms,
        EditRequest_SITmodalClickSave:EditRequest_SITmodalClickSave,
        EditRequest_SITmodalSetMoveDate:EditRequest_SITmodalSetMoveDate,
        EditRequest_OpenFuelModalClosingTab:EditRequest_OpenFuelModalClosingTab,
        EditRequest_SendSumFuelModalClocingTab:EditRequest_SendSumFuelModalClocingTab,
        EditRequest_ClickSaveFuelModalClosingTab:EditRequest_ClickSaveFuelModalClosingTab,
        EditRequest_ClosingTabOpenDiscountModal:EditRequest_ClosingTabOpenDiscountModal,
        EditRequest_ClosingTabDiscountModalSendMoney:EditRequest_ClosingTabDiscountModalSendMoney,
        EditRequest_ClosingTabDiscountModalClickSave:EditRequest_ClosingTabDiscountModalClickSave,
        EditRequest_SelectDistanceFromCurentDoor:EditRequest_SelectDistanceFromCurentDoor,
        EditRequest_SelectDistanceFromNewDoor:EditRequest_SelectDistanceFromNewDoor,
        EditRequest_SetStepsOnStairsOrigin:EditRequest_SetStepsOnStairsOrigin,
        EditRequest_SetStepsOnStairsDestination:EditRequest_SetStepsOnStairsDestination,
        EditRequest_OpenValuationModal:EditRequest_OpenValuationModal,
        EditRequest_ClickTabFullValue:EditRequest_ClickTabFullValue,
        EditRequest_ClickSaveValuation:EditRequest_ClickSaveValuation,
        EditRequest_SendAmountOfLiability:EditRequest_SendAmountOfLiability,
        EditRequest_OpenFullValueProtection : EditRequest_OpenFullValueProtection,
        //=================================LOCAL DISPATCH===================================
        Dispatch_GridView: Dispatch_GridView,
        Dispatch_ShowDoneJobs: Dispatch_ShowDoneJobs,
        Dispatch_WaitForCalendar: Dispatch_WaitForCalendar,
        Dispatch_ShowScheduledJobs:Dispatch_ShowScheduledJobs,
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
        Department_ClickPermissionsRequestWindow: Department_ClickPermissionsRequestWindow,
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
        Department_AddRowOnRates:Department_AddRowOnRates,
        Department_ClearSendGmailAdress:Department_ClearSendGmailAdress,
        Department_OpenNotificationTab:Department_OpenNotificationTab,
        Department_DeleteUser:Department_DeleteUser,
        Department_SetGoogleMail:Department_SetGoogleMail,
        Department_TurnOnAllGmailCalendar:Department_TurnOnAllGmailCalendar,

        //====================================FRONT SITE====================================

        FrontSiteDown_SendZipCodeFrom:FrontSiteDown_SendZipCodeFrom,
        FrontSiteDown_SendZipCodeTo:FrontSiteDown_SendZipCodeTo,
        FrontSiteDown_SendZipCode:FrontSiteDown_SendZipCode,
        FrontDown_SelectMoveSize:FrontDown_SelectMoveSize,
        FrontDown_SetEntrance:FrontDown_SetEntrance,
        FrontSite_ClickQuoteCalculator:FrontSite_ClickQuoteCalculator,
        FrontSite_ClickDesireMoveDate:FrontSite_ClickDesireMoveDate,
        FrontSite_ClickDeliveryDate:FrontSite_ClickDeliveryDate,
        FrontSite_SelectServiceType:FrontSite_SelectServiceType,
        FrontSite_ClickCalculate:FrontSite_ClickCalculate,
        FrontSite_SetClientInfoDown:FrontSite_SetClientInfoDown,
        FrontSite_SelectPreferedStartTime:FrontSite_SelectPreferedStartTime,
        FrontSite_SelectPreferedDeliveryTime:FrontSite_SelectPreferedDeliveryTime,
        FrontSite_SelectGoogleSearch:FrontSite_SelectGoogleSearch,
        FrontSite_ClickGoToCalculatorResults:FrontSite_ClickGoToCalculatorResults,
        FrontSite_SelectCommercialExtraRooms:FrontSite_SelectCommercialExtraRooms,
        FrontSite_GoToConfirmation:FrontSite_GoToConfirmation,
        FrontSite_ViewRequestPage:FrontSite_ViewRequestPage,
        FrontSiteSmallCalc_SendZipCode:FrontSiteSmallCalc_SendZipCode,
        FrontSiteSmallCalc_ClickCalendar:FrontSiteSmallCalc_ClickCalendar,
        FrontSiteSmallCalc_ClickContinue:FrontSiteSmallCalc_ClickContinue,
        FrontSiteSmallCalc_ClickChooseMoveSize:FrontSiteSmallCalc_ClickChooseMoveSize,
        FrontSiteSmallCalc_SelectMoveSize:FrontSiteSmallCalc_SelectMoveSize,
        FrontSiteSmallCalc_ClickDoneMoveSize:FrontSiteSmallCalc_ClickDoneMoveSize,
        FrontSiteSmallCalc_SelectEntrance:FrontSiteSmallCalc_SelectEntrance,
        FrontSiteSmallCalc_ClickContinueContractInfo:FrontSiteSmallCalc_ClickContinueContractInfo,
        FrontSiteSmallCalc_SetClientInfo:FrontSiteSmallCalc_SetClientInfo,
        FrontSiteSmallCalc_SubmitQuoteAndGoToAccount:FrontSiteSmallCalc_SubmitQuoteAndGoToAccount,
        FrontSiteSmallCalc_SendZipTo:FrontSiteSmallCalc_SendZipTo,
        FrontSiteSmallCalc_SendZipFrom:FrontSiteSmallCalc_SendZipFrom,
        FrontSiteSmallCalc_ClickNeedStorageCheckbox:FrontSiteSmallCalc_ClickNeedStorageCheckbox,
        FrontSiteSmallCalc_SelectServiceType:FrontSiteSmallCalc_SelectServiceType,
		HomeEstimate_Logout:HomeEstimate_Logout,
        //====================================TRIPS==========================================

    };
};