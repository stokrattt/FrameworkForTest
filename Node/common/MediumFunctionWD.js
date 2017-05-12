module.exports = function (SF, JS, JSstep, VD, V, By, until,FileDetector, system, condition, config, constants) {
    function WaitWhileBusy() {
        SF.sleep(1);
        JS.waitForNotExist('.busyoverlay:visible');
        SF.sleep(1);
    }

    function SweetConfirm() {
        JS.waitForExist('button.confirm');
        SF.sleep(1);
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
    function Board_OpenSideBar() {
        SF.click(By.xpath("//button[@ng-click=\"toggleLeft()\"]"));
        SF.waitForVisible(By.xpath('//button[@ng-click="toggleLeft()"]'));
    }

    function Board_OpenPayroll() {
        Board_OpenSideBar();
        SF.click(By.xpath("//a[@ng-click=\"vm.goToPage('dispatch.local', '')\"]"));
        SF.sleep(1);
        SF.click(By.xpath("//a[@ui-sref=\"dispatch.payroll\"]"));
        WaitWhileBusy();
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

    function Board_OpenSettingsGeneral() {
        Board_OpenSideBar();
        SF.click(By.xpath('//a[@ng-click="vm.goToPage(\'settings.general\', \'\')"]'));
        SF.waitForVisible(By.xpath('//a[@ng-click="vm.goToPage(\'settings.general\', \'\')"]'));
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

    //==============================ACCOUNT=======================================

    function Account_ClickViewRequest() {
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

    //================================EDIT REQUEST====================================

    function EditRequest_OpenSettings() {
        SF.click(By.xpath('//a[@ng-click="select(tabs[7])"]'));
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

    function EditRequest_SetToNotConfirmed() {
        SF.select(By.xpath('//select[@id="edit-status"]'), 2);
    }
    function EditRequest_SetToConfirmed() {
        SF.select(By.xpath('//select[@id="edit-status"]'), 3);
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

    return {
        WaitWhileBusy: WaitWhileBusy,
        SweetConfirm: SweetConfirm,
        SweetCancel: SweetCancel,
        BoardAccount_SendMessage: BoardAccount_SendMessage,
        //==================================FRONT SITE======================================
        FrontSite_GoToAccount: FrontSite_GoToAccount,
        //------------------------------------BOARD=========================================
        Board_OpenSideBar: Board_OpenSideBar,
        Board_OpenDashboard: Board_OpenDashboard,
        Board_OpenLocalDispatch: Board_OpenLocalDispatch,
        Board_OpenPayroll: Board_OpenPayroll,
        Board_OpenNotConfirmed: Board_OpenNotConfirmed,
        Board_OpenConfirmed: Board_OpenConfirmed,
        Board_OpenSettingsSchedule: Board_OpenSettingsSchedule,
        Board_OpenSettingsGeneral: Board_OpenSettingsGeneral,
        Board_OpenSettingsDepartment: Board_OpenSettingsDepartment,
        Board_RefreshDashboard:Board_RefreshDashboard,
        Board_SearchRequest:Board_SearchRequest,
        Board_GetFirstFoundedId:Board_GetFirstFoundedId,
        Board_Refresh:Board_Refresh,
        Board_OpenMessage: Board_OpenMessage,
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
        //=================================EDIT REQUEST=====================================
        EditRequest_OpenSettings: EditRequest_OpenSettings,
        EditRequest_OpenMessages: EditRequest_OpenMessages,
        EditRequest_OpenLogs: EditRequest_OpenLogs,
        EditRequest_OpenClient: EditRequest_OpenClient,
        EditRequest_OpenRequest: EditRequest_OpenRequest,
        EditRequest_SetToNotConfirmed: EditRequest_SetToNotConfirmed,
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
    };
};