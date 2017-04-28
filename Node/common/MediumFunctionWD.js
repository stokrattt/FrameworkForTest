module.exports = function (SF, JS, JSstep, VD, V, By, until,FileDetector, system, condition, config,constants) {
    function WaitWhileBusy(){
        SF.sleep(1);
        JS.waitForNotExist('.busyoverlay:visible');
        SF.sleep(1);
    }
    function SweetConfirm(){
        JS.waitForExist('button.confirm');
        SF.sleep(1);
        SF.click(By.xpath('//button[@class="confirm"]'));
    }

    ///===============================BOARD=========================================
    function Board_OpenSideBar(){
        SF.click(By.xpath("//button[@ng-click=\"toggleLeft()\"]"));
    }
    function Board_OpenPayroll(){
        Board_OpenSideBar();
        SF.click(By.xpath("//a[@ng-click=\"vm.goToPage('dispatch.local', '')\"]"));
        SF.sleep(1);
        SF.click(By.xpath("//a[@ui-sref=\"dispatch.payroll\"]"));
        WaitWhileBusy();
    }

    //==============================ACCOUNT=======================================

    function Account_ClickViewRequest(){
        SF.click(By.xpath('//button[@ng-click="cancel()"][contains(text(),"View request")]'));
    }
    function Account_ClickPartialPacking(){
        SF.click(By.xpath('//label[@for="partial"]/input[@ng-model="vm.packing_service"]'));
    }
    function Account_CheckRequestStatus_NotConfirmed(Id){
        SF.waitForVisible(By.xpath('//td[contains(text(),"' + Id + '")]/following-sibling::td[1]'));
        driver.wait(driver.findElement(By.xpath('//td[contains(text(),"' + Id + '")]/following-sibling::td[1]')).getText().then(function (Status) {
            VD.IWant(VD.VToEqual, Status, 'Not Confirmed');
        }),config.timeout);
    }
    function Account_OpenRequest(Id){
        SF.click(By.xpath('//td[contains(text(),"' + Id + '")]/following-sibling::td/button[contains(text(),"View")]'));
    }
    function Account_WaitForGreenTextAfterConfirm(){
        SF.waitForVisible(By.xpath('//div[contains(text(),"Your move is confirmed and scheduled")]'));
    }
    function Account_WaitForInventoryCheck(){
        SF.waitForVisible(By.xpath('//li[@id="tab_Inventory"]//i[@class="icon-check"]'));
    }
    function Account_WaitForDetailsCheck(){
        SF.waitForVisible(By.xpath('//li[@id="tab_Details"]//i[@class="icon-check"]'));
    }

    //===================================CONTRACT===================================

    function Contract_WaitConfirmationPage(){
        JS.waitForExist('h1:contains("Confirmation Page"):visible');
    }
    function Contract_OpenBillOfLading(){
        SF.click(By.xpath('//li[@id="tab_Bill of lading"]'));

    }
    function Contract_DeclarationValueA(){
        SF.select(By.xpath('//select[@ng-model="data.declarationValue.selected"]'), 'a');
    }
    function Contract_ClickPay(){
        SF.click(By.xpath('//div[@ng-click="applyPayment(paymentButton())"]'));
    }
    function Contract_ClickTips10(){
        SF.click(By.xpath('//div[@ng-click="tipsPercChange(10)"]'));
    }
    function Contract_ClickAddTips(){
        SF.click(By.xpath('//div[contains(text(),"ADD TIPS")]/parent::div[@ng-click="tipsSelected()"]'));
    }
    function Contract_ClickPaymentInfo() {
        SF.click(By.xpath('//button[@ng-click="goStepTwo();"]'));
    }
    function Contract_WaitForImageInput(){
        JS.waitForExist('input#inputImage');
    }
    function Contract_UploadImage(path){
        SF.send(By.xpath('//input[@id="inputImage"]'), path);
        SF.sleep(1);
    }
    function Contract_SaveImages(){
        SF.click(By.xpath('//button[contains(@ng-click,"saveFile()")]'));
        JS.waitForNotExist("button[ng-click=\"saveFile()\"]");
        JS.waitForNotExist('div.busyoverlay:visible');
        SF.sleep(2);
    }
    function Contract_Submit(){
        SF.click(By.xpath('//button[@ng-click="submitContractBtn({ isBtn: true })"]'));
        SweetConfirm();
    }
    function Contract_ReturnToForeman(){
        JS.scroll('a:contains("Return to foreman page")');
        JS.waitForNotExist('div.busyoverlay:visible');
        SF.sleep(1);
        SF.click(By.xpath('//a[contains(text(),"Return to foreman page")]'));
        JS.waitForExist('li.dropdown.profile:visible');
    }

    //================================EDIT REQUEST====================================

    function EditRequest_OpenSettings(){
        SF.click(By.xpath('//a[@ng-click="select(tabs[7])"]'));
        SF.sleep(1);
    }
    function EditRequest_OpenClient(){
        SF.click(By.xpath('//a[@ng-click="select(tabs[4])"]'));
    }
    function EditRequest_OpenRequest(){
        SF.click(By.xpath('//a[@ng-click="select(tabs[0])"]'));
        SF.sleep(1);
    }
    function EditRequest_SetToNotConfirmed(){
        SF.select(By.xpath('//select[@id="edit-status"]'), 2);
    }
    function EditRequest_SaveChanges(){
        SF.click(By.xpath('//button[@ng-click="UpdateRequest()"]'));
        JS.waitForExist('button[ng-click="update(request)"]:visible');
        SF.click(By.xpath('//button[@ng-click="update(request)"]'));
    }
    function EditRequest_WaitForBalanceVisible(){
        JS.waitForExist('label:contains("Balance:"):visible');
    }
    function EditRequest_ScrollDown(){
        JS.scroll('div.BalanceCost:visible');
    }
    function EditRequest_OpenPayroll(){
        SF.click(By.xpath('//div[@ng-click="openSalaryCommisionModal();"]'));
        SF.waitForVisible(By.xpath('//button[@ng-click="reSubmitPayroll()"]'));
        JS.waitForNotExist('div.busyoverlay:visible');
    }
    function EditRequest_CloseEditRequest(){
        SF.click(By.xpath('//button[@ng-click="cancel()"][contains(text(),"Close")]'));
        SF.sleep(2);
    }

    //=================================LOCAL DISPATCH============================

    function Board_OpenLocalDispatch(){
        SF.click(By.xpath('//a[@ng-click="vm.goToPage(\'dispatch.local\', \'\')"]'));
        SF.waitForLocated(By.xpath('//a[@class="ui-datepicker-next ui-corner-all"]'));
    }
    function Dispatch_GridView(){
        SF.click(By.xpath('//i[contains(@ng-click,"view.grid = true;")]'));
    }
    function Dispatch_ShowDoneJobs(){
        SF.select(By.xpath('//select[@ng-model="vm.reqFilter.type"]'), 0);
        WaitWhileBusy();
    }

    //===================================PAYROLL=====================================
    function Payroll_ClickAllDepartment(){
        SF.click(By.xpath('//a[@ng-click="dTable=\'departments\';employee=\'\'"]'));
    }

    return {
        //------------------------------------BOARD=========================================
        Board_OpenSideBar:Board_OpenSideBar,
        Board_OpenLocalDispatch:Board_OpenLocalDispatch,
        Board_OpenPayroll:Board_OpenPayroll,
        //====================================ACCOUNT=======================================
        WaitWhileBusy: WaitWhileBusy,
        SweetConfirm: SweetConfirm,
        Account_ClickViewRequest:Account_ClickViewRequest,
        Account_ClickPartialPacking: Account_ClickPartialPacking,
        Account_CheckRequestStatus_NotConfirmed: Account_CheckRequestStatus_NotConfirmed,
        Account_OpenRequest: Account_OpenRequest,
        Account_WaitForGreenTextAfterConfirm: Account_WaitForGreenTextAfterConfirm,
        Account_WaitForInventoryCheck:Account_WaitForInventoryCheck,
        Account_WaitForDetailsCheck:Account_WaitForDetailsCheck,
        //===================================CONTRACT=======================================
        Contract_WaitConfirmationPage:Contract_WaitConfirmationPage,
        Contract_OpenBillOfLading:Contract_OpenBillOfLading,
        Contract_DeclarationValueA:Contract_DeclarationValueA,
        Contract_ClickPay:Contract_ClickPay,
        Contract_ClickTips10:Contract_ClickTips10,
        Contract_ClickAddTips: Contract_ClickAddTips,
        Contract_ClickPaymentInfo:Contract_ClickPaymentInfo,
        Contract_WaitForImageInput: Contract_WaitForImageInput,
        Contract_UploadImage:Contract_UploadImage,
        Contract_SaveImages:Contract_SaveImages,
        Contract_Submit: Contract_Submit,
        Contract_ReturnToForeman:Contract_ReturnToForeman,
        //=================================EDIT REQUEST=====================================
        EditRequest_OpenSettings: EditRequest_OpenSettings,
        EditRequest_OpenClient: EditRequest_OpenClient,
        EditRequest_OpenRequest: EditRequest_OpenRequest,
        EditRequest_SetToNotConfirmed: EditRequest_SetToNotConfirmed,
        EditRequest_SaveChanges: EditRequest_SaveChanges,
        EditRequest_WaitForBalanceVisible:EditRequest_WaitForBalanceVisible,
        EditRequest_ScrollDown:EditRequest_ScrollDown,
        EditRequest_OpenPayroll:EditRequest_OpenPayroll,
        EditRequest_CloseEditRequest:EditRequest_CloseEditRequest,
        //=================================LOCAL DISPATCH===================================
        Dispatch_GridView:Dispatch_GridView,
        Dispatch_ShowDoneJobs:Dispatch_ShowDoneJobs,
        //===================================PAYROLL========================================
        Payroll_ClickAllDepartment:Payroll_ClickAllDepartment
    };
};