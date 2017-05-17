module.exports = function (SF, JS, JSstep, VD, V, By, until,FileDetector, system, condition, config, constants) {
    function WaitToastExit() {
        JS.waitForNotExist('div.toast-message:visible');
        JS.waitForNotExist('div.toast-success:visible');
    }
    function WaitWhileBusy() {
        SF.sleep(1);
        JS.waitForNotExist('.busyoverlay:visible');
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

    ///===============================BOARD=========================================
    function Board_LogoutAdmin() {
        JS.waitForNotExist('div.toast-success');
        JS.waitForNotExist('div.toast-message');
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

    function Board_OpenSideBar() {
        SF.click(By.xpath("//button[@ng-click=\"toggleLeft()\"]"));
        SF.waitForVisible(By.xpath('//button[@ng-click="toggleLeft()"]'));
    }
    function Board_OpenAllRequest() {
        Board_OpenSideBar();
        SF.click(By.xpath('//a[@ng-click="vm.goToPage(\'all_requests\', \'\')"]'));
        WaitWhileBusy ();
    }
    function Board_OpenStorages() {
        SF.click(By.xpath('//a[@ng-click="vm.goToPage(\'pending\', \'\')"]'));
        WaitWhileBusy ();
        SF.sleep (3);
        WaitWhileBusy ();
    }
    function Board_OpenStoragesTenant() {
        Board_OpenSideBar ();
        SF.click(By.xpath('//a[@ng-click="vm.goToPage(\'pending\', \'\')"]'));
        SF.click(By.xpath('//a[@ui-sref="tenants"]'));
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
    }
    function Board_OpenDashboard() {
        SF.click(By.xpath('//a[@ui-sref="dashboard"]'));
        SF.sleep(5);
    }
    function Board_RefreshDashboard(){
        SF.click (By.xpath('//i[@ng-click="vm.refreshDashboard();"]'));
        SF.sleep (3);
        WaitWhileBusy ();
    }
    function Board_SearchRequest(selector){
        SF.send (By.id('gSearch'), selector);
        SF.waitForLocated (By.xpath('//div[@ng-show="searchRequests.length"]'));
    }
    function Board_GetFirstFoundedId(request){
        SF.waitForVisible(By.xpath('//div[@class="requestsid ng-binding"]'));
        driver.wait(driver.findElement(By.xpath('//div[@class="requestsid ng-binding"]')).getText().then (function(text){
            request.Id = text;
        }), config.timeout);
        SF.sleep(1);
    }
    function Board_Refresh(){
        driver.navigate().refresh();
        SF.waitForLocated(By.linkText('Create Request'));
        SF.sleep (3);
    }
    function Board_OpenCourier() {
        SF.sleep(1);
        SF.click(By.xpath('//a[@ng-click="vm.goToPage(\'trip\', \'\')"]'));
        SF.sleep(1);
        SF.click(By.xpath('//a[@ui-sref="couriers"]'));
        SF.sleep(2);
    }
    function Board_OpenTripPlanner() {
        SF.click(By.xpath('//a[@ng-class="{active:vm.isCurrent(\'trip planner\')}"]'));
        SF.sleep(2);
    }
    function Board_OpenCarriersAndAgents() {
        SF.click(By.xpath('//a[@ng-class="{active:vm.isCurrent(\'carriers and agents\')}"]'));
    }

    //==============================ACCOUNT=======================================

    function Account_SubmitFlatRateAfterAddInventory() {
        JS.scroll ('#conf_block:visible');
        SF.sleep (2);
        SF.click (By.xpath('//button[@ng-click="submitFlatRate()"]'));
        JS.waitForExist('button.confirm:contains("OK")');
        SF.click(By.xpath('//button[@class="confirm"][contains(text(),"OK")]'));
    }

    function Account_ClickViewRequest() {
        SF.sleep(1);
        SF.click(By.xpath('//button[@ng-click="cancel()"][contains(text(),"View request")]'));
    }

    function Account_ClickPartialPacking() {
        SF.click(By.xpath('//label[@for="partial"]/input[@ng-model="vm.packing_service"]'));
    }

    function Account_CheckRequestStatus_NotConfirmed(Id) {
        SF.waitForVisible(By.xpath('//td[contains(text(),"' + Id + '")]/following-sibling::td[1]'));
        driver.wait(driver.findElement(By.xpath('//td[contains(text(),"' + Id + '")]/following-sibling::td[1]')).getText().then(function (Status) {
            VD.IWant(VD.VToEqual, Status, 'Not Confirmed');
        }), config.timeout);
    }
    function Account_CheckRequestStatus_Pending(Id) {
        SF.waitForVisible(By.xpath('//td[contains(text(),"' + Id + '")]/following-sibling::td[1]'));
        driver.wait(driver.findElement(By.xpath('//td[contains(text(),"' + Id + '")]/following-sibling::td[1]')).getText().then(function (Status) {
            VD.IWant(VD.VToEqual, Status, 'Pending');
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

    function Account_WaitForInventoryCheck() {
        SF.waitForVisible(By.xpath('//li[@id="tab_Inventory"]//i[@class="icon-check"]'));
    }

    function Account_WaitForDetailsCheck() {
        SF.waitForVisible(By.xpath('//li[@id="tab_Details"]//i[@class="icon-check"]'));
    }

    function Account_ClickFromStorage() {
        SF.click(By.xpath('//a[@ng-click="vm.goToRequest(vm.request.storage_id)"]'));
    }

    //===================================CONTRACT===================================

    function Contract_WaitConfirmationPage() {
        JS.waitForExist('h1:contains("Confirmation Page"):visible');
    }

    function Contract_WaitBillOfLading() {
        SF.waitForVisible(By.xpath('//div[@class="empty-signature"]'));
    }

    function Contract_OpenBillOfLading() {
        WaitWhileBusy();
        SF.click(By.xpath('//li[@id="tab_Bill of lading"]'));

    }

    function Contract_DeclarationValueA() {
        SF.select(By.xpath('//select[@ng-model="data.declarationValue.selected"]'), 'a');
    }

    function Contract_ClickPay() {
        SF.click(By.xpath('//div[@ng-click="applyPayment(paymentButton())"]'));
    }

    function Contract_ClickTips10() {
        SF.click(By.xpath('//div[@ng-click="tipsPercChange(10)"]'));
    }

    function Contract_ClickAddTips() {
        SF.click(By.xpath('//div[contains(text(),"ADD TIPS")]/parent::div[@ng-click="tipsSelected()"]'));
    }

    function Contract_ClickPaymentInfo() {
        SF.click(By.xpath('//button[@ng-click="goStepTwo();"]'));
    }

    function Contract_WaitForImageInput() {
        JS.waitForExist('input#inputImage');
    }

    function Contract_UploadImage(path) {
        SF.send(By.xpath('//input[@id="inputImage"]'), path);
        SF.sleep(1);
    }

    function Contract_SaveImages() {
        SF.click(By.xpath('//button[contains(@ng-click,"saveFile()")]'));
        JS.waitForNotExist("button[ng-click=\"saveFile()\"]");
        JS.waitForNotExist('div.busyoverlay:visible');
        SF.sleep(2);
    }

    function Contract_Submit() {
        SF.click(By.xpath('//button[@ng-click="submitContractBtn({ isBtn: true })"]'));
        SF.sleep(2);
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
        JS.click('li[ng-click=\\"data[fieldName].tapeColor = \'' + color + '\'; saveInventory()\\"]');
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
            VD.IWant (VD.VToEqual, text, 'Job is Done', 'страница бил оф ладинг не загрузилась')
        }),config.timeout);
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

    function EditRequest_CloseEditRequest() {
        SF.click(By.xpath('//button[@ng-click="cancel()"]'));
        SF.sleep(2);
    }

    function EditRequest_CloseModal() {
        SF.click(By.xpath('//div[@class="modal-footer"]/button[@ng-click="cancel()"]'));
        SF.sleep(2);
    }

    function EditRequest_OpenLogs() {
        SF.click(By.xpath('//a[@ng-click="select(tabs[5])"]'));
        SF.sleep(2);
        JS.waitForNotExist('div.busyoverlay:visible');
        JS.waitForExist('div[ng-repeat="log in allLogs | orderBy: \\\'-date\\\' track by $index "]:eq(3)');
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
        SF.click(By.xpath('//label[@ng-click="openAddPackingModal();"]'));
        SF.waitForVisible (By.xpath('//div[@class="inside_box"]'));
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
        SF.click(By.xpath('//label[@ng-model="packing_service"][3]'));
        SF.click(By.xpath('//button[@ng-click="save()"]'));
        WaitWhileBusy ();
        SF.sleep (2);
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
    function EditRequest_SetLaborTimeCloseJob() {
        SF.clear (By.xpath('//input[@ng-model="invoice.work_time"]'));
        JS.waitForNotExist ('div.busyoverlay:visible');
        SF.send (By.xpath('//input[@ng-model="invoice.work_time"]'), '01:00');
        JS.waitForNotExist ('div.busyoverlay:visible');
    }
    function EditRequest_CloseJob() {
        SF.click (By.xpath('//div[@ng-click="closeJob();"]'));
        SF.sleep (2);
        JS.waitForNotExist ('div.busyoverlay:visible');
        JS.waitForNotExist('div.toast-success');
    }
    function EditRequest_OpenContractCloseJob() {
        driver.findElement(By.xpath('//a[contains(@class,"open_button_contract")]')).click();
        SF.sleep (3);
    }
    function EditRequest_Check1EmailExist(receiver, Subject) {
        driver.wait(driver.findElements(By.xpath('//div[@ng-show="tabs[0].selected"]//span[' +
            'contains(text(),\'Mail was send to "'+receiver+'".\') and ' +
            'contains(text(),\'Subject: "'+Subject+'\')]')).then(function(array){
            VD.IWant(VD.VToEqual, array.length,1,'имейл '+Subject+' не был отправлен или отправлен несколько раз');
        }), config.timeout);
    }

    //=================================LOCAL DISPATCH============================

    function Board_OpenLocalDispatch() {
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
        WaitToastExit: WaitToastExit,
        WaitWhileBusy: WaitWhileBusy,
        SweetConfirm: SweetConfirm,
        SweetCancel: SweetCancel,
        BoardAccount_SendMessage: BoardAccount_SendMessage,
        //==================================FRONT SITE======================================
        FrontSite_GoToAccount: FrontSite_GoToAccount,
        //==================================LONG DISTANCE SETTINGS==========================
        LongDistanceSettings_ClickOnMapCaliforniya: LongDistanceSettings_ClickOnMapCaliforniya,
        LongDistanceSettings_SelectMABasedState: LongDistanceSettings_SelectMABasedState,

        //------------------------------------BOARD=========================================
        Board_LogoutAdmin: Board_LogoutAdmin,
        Board_ClickCreate: Board_ClickCreate,
        Board_OpenSideBar: Board_OpenSideBar,
        Board_OpenDashboard: Board_OpenDashboard,
        Board_OpenLocalDispatch: Board_OpenLocalDispatch,
        Board_OpenPayroll: Board_OpenPayroll,
        Board_OpenNotConfirmed: Board_OpenNotConfirmed,
        Board_OpenConfirmed: Board_OpenConfirmed,
        Board_OpenSettingsSchedule: Board_OpenSettingsSchedule,
        Board_OpenCompanyServices:Board_OpenCompanyServices,
        Board_OpenSettingsGeneral: Board_OpenSettingsGeneral,
        Board_OpenSettingsDepartment: Board_OpenSettingsDepartment,
        Board_RefreshDashboard:Board_RefreshDashboard,
        Board_SearchRequest:Board_SearchRequest,
        Board_GetFirstFoundedId:Board_GetFirstFoundedId,
        Board_Refresh:Board_Refresh,
        Board_OpenMessage: Board_OpenMessage,
        Board_OpenSchedule: Board_OpenSchedule,
        Board_OpenReviewSettings: Board_OpenReviewSettings,
        Board_OpenSettingsLongDistance: Board_OpenSettingsLongDistance,
        Board_OpenAllRequest: Board_OpenAllRequest,
        Board_OpenStorages: Board_OpenStorages,
        Board_OpenStoragesTenant: Board_OpenStoragesTenant,
        Board_OpenCourier : Board_OpenCourier,
        Board_OpenTripPlanner: Board_OpenTripPlanner,
        Board_OpenCarriersAndAgents: Board_OpenCarriersAndAgents,
        //====================================ACCOUNT=======================================
        Account_ClickViewRequest: Account_ClickViewRequest,
        Account_ClickPartialPacking: Account_ClickPartialPacking,
        Account_CheckRequestStatus_NotConfirmed: Account_CheckRequestStatus_NotConfirmed,
        Account_CheckRequestStatus_Pending: Account_CheckRequestStatus_Pending,
        Account_OpenRequest: Account_OpenRequest,
        Account_WaitForGreenTextAfterConfirm: Account_WaitForGreenTextAfterConfirm,
        Account_WaitForInventoryCheck: Account_WaitForInventoryCheck,
        Account_WaitForDetailsCheck: Account_WaitForDetailsCheck,
        Account_ClickFromStorage: Account_ClickFromStorage,
        Account_OpenMessage: Account_OpenMessage,
        Account_SubmitFlatRateAfterAddInventory: Account_SubmitFlatRateAfterAddInventory,
        Account_ChooseOptionFlatRate: Account_ChooseOptionFlatRate,
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
        //=================================LOCAL DISPATCH===================================
        Dispatch_GridView: Dispatch_GridView,
        Dispatch_ShowDoneJobs: Dispatch_ShowDoneJobs,
        Dispatch_WaitForCalendar: Dispatch_WaitForCalendar,
        //===================================PAYROLL========================================
        Payroll_ClickAllDepartment: Payroll_ClickAllDepartment,
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
        Department_SaveUser: Department_SaveUser
        //====================================TRIPS==========================================

    };
};