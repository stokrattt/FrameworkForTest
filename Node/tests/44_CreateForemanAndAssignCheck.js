module.exports = function main(SF, JS, MF, LF, JSstep, VD, V, By, until,FileDetector, system, condition, config,constants) {
    global.fiber = Fiber.current;
    V.client = {};
    V.client.name = SF.randomBukva(6) + '_t';
    V.client.fam = SF.randomBukva(6) + '_t';
    V.client.phone = SF.randomCifra(10);
    V.client.email = SF.randomBukvaSmall(6) + '@' + SF.randomBukvaSmall(4) + '.tes';
    V.client.passwd = 123;

    //=========================начинаем писать тест=============================
    SF.get(V.adminURL);
    LF.LoginToBoardAs_Roma4ke_Admin ();

condition.nowWeDoing = 'создаем форемана, и ставим ему комиссию hourly rate';
    MF.Board_OpenSettingsDepartment ();
    SF.sleep(3);
    SF.click (By.xpath('//ul[@class="nav nav-pills nav-stacked compose-nav"]/li[6]/a'));
    SF.sleep(2);
    SF.click (By.xpath('//div[@ng-click="vm.openCreateUserModal()"]'));
    SF.waitForVisible (By.xpath('//form[@name="createUserRequest"]'));
    V.foremanFirstName = SF.randomBukva(5) + '_for';
    V.foremanLastName = SF.randomBukva(5) + '_for';
    SF.send (By.xpath('//input[@ng-model="request.firstName"]'), V.foremanFirstName);
    SF.send (By.xpath('//input[@ng-model="request.lastName"]'), V.foremanLastName);
    SF.send(By.xpath('//input[@ng-model="request.phone1"]'), 12345678960);
    SF.click (By.linkText('Account'));
    V.foremanAccount = SF.randomBukvaSmall(6) + '@' + SF.randomBukvaSmall(4) + '.tes';
    V.foremanPass = 123;
    SF.send (By.xpath('//input[@ng-model="request.login"]'), V.foremanAccount);
    SF.send (By.xpath('//input[@ng-model="request.password"]'), V.foremanPass);
    SF.send (By.xpath('//input[@ng-model="request.email"]'), V.foremanAccount);
    SF.click (By.xpath('//li[@ng-click="activeMainTab = 2"]'));
    SF.select(By.xpath('//select[@ng-model="rateCommission[trueIndex].option"]'), "Hourly Rate");
    SF.clear (By.xpath('//input[@ng-model="rateCommission[$index].input"]'));
    SF.send (By.xpath('//input[@ng-model="rateCommission[$index].input"]'), "150");
    SF.click(By.xpath('//button[@ng-click="submitted=true; create(createUserRequest)"]'));
    MF.WaitWhileBusy ();
    SF.sleep(1);
    MF.WaitWhileBusy ();
    SF.sleep(3);

condition.nowWeDoing = 'создаем реквест, конфермим его';
    LF.CreateLocalMovingFromBoard(V.client);
    V.boardNumbers = {};
    LF.RememberDigitsRequestBoard(V.boardNumbers);
    JS.step(JSstep.selectTruck((V.boardNumbers.LaborTimeMax + V.boardNumbers.TravelTime)/60));
    MF.EditRequest_SetAdressToFrom ();
    LF.addToCleanerJob (V.boardNumbers.Id);
    MF.EditRequest_SetToConfirmed ();
    MF.EditRequest_SaveChanges ();
    LF.closeEditRequest ();

condition.nowWeDoing = 'идем в диспач ищем работу и назначем ей созданного форемана';
    MF.Board_OpenLocalDispatch ();
    LF.findDayInLocalDispatch (V.boardNumbers.moveDate.Year,V.boardNumbers.moveDate.Month,V.boardNumbers.moveDate.Day);
    MF.WaitWhileBusy();
    MF.WaitWhileBusy();
    MF.Dispatch_GridView();
    LF.SelectRequestDispatch(V.boardNumbers.Id);
    SF.sleep (2);
    SF.click (By.xpath('//select[@ng-model="vm.data.foreman"]'));
    SF.click(By.xpath('//select[@ng-model="vm.data.foreman"]/option[contains(text(), "'+V.foremanFirstName+'")]'));
    SF.click(By.xpath("//label[contains(text(),'Helper No. 2')]/following-sibling::select[@ng-model='vm.data.baseCrew.helpers[$index]']"));
    SF.click(By.xpath("//label[contains(text(),'Helper No. 2')]/following-sibling::select[@ng-model='vm.data.baseCrew.helpers[$index]']//option[contains(text(),'Test Helper1')]"));
    SF.click(By.xpath("//a[@ng-click=\"vm.assignTeam(request)\"]"));
    MF.WaitToastExit ();
    SF.sleep(2);
    MF.WaitToastExit ();
    SF.sleep(2);
    MF.Board_LogoutAdmin ();

condition.nowWeDoing = 'зашли  под созданным фореманом и подписываем работу';
    SF.waitForVisible(By.xpath('//div[@ng-controller="LoginController"]//span[contains(text(),"Move")]'));
    SF.send(By.xpath('//input[@id="email"]'), V.foremanAccount);
    SF.send(By.xpath('//input[@id="password"]'), '123');
    SF.click(By.xpath('//button[@type="submit"]'));
    SF.waitForVisible(By.xpath('//tr[@ng-click="vm.editReservation(request.nid)"]'));
    LF.OpenRequestDispatch(V.boardNumbers.Id);
    MF.Contract_WaitConfirmationPage();
    MF.Contract_OpenBillOfLading ();
    SF.sleep(1);
    LF.MakeSignInContract();
    LF.MakeSignInContract();
    MF.Contract_DeclarationValueA();
    LF.MakeSignInContract();
    LF.MakeSignInContract();
    LF.MakeSignInContract();
    MF.Contract_ClickPay();
    MF.Contract_ClickTips10();
    MF.Contract_ClickAddTips();
    MF.Contract_ClickPaymentInfo();
    LF.FillCardPayModal();
    LF.Contract_SignMainPayment();
    driver.wait(new FileDetector().handleFile(driver, system.path.resolve('./files/squirrel.jpg')).then(function (path) {
        V.path = path;
    }), config.timeout);
    SF.sleep(1);
    MF.Contract_UploadImage(V.path);
    MF.Contract_UploadImage(V.path);
    MF.Contract_SaveImages();
    SF.sleep (2);
    LF.MakeSignInContract();
    LF.MakeSignInContract();
    MF.Contract_Submit();
    MF.Contract_ReturnToForeman();
    LF.LogoutFromBoardForeman();
    LF.LoginToBoardAs_Roma4ke_Admin ();
    /*********************************************************************************/
condition.nowWeDoing = 'идем в диспач ищем работу, проверяем баланс = 0, открываем в реквесте пейролл, проверяем комиссию = 150 за час';
    MF.Board_OpenLocalDispatch();
    LF.findDayInLocalDispatch(V.boardNumbers.moveDate.Year, V.boardNumbers.moveDate.Month, V.boardNumbers.moveDate.Day);
    MF.WaitWhileBusy();
    MF.WaitWhileBusy();
    MF.Dispatch_GridView();
    MF.Dispatch_ShowDoneJobs();
    LF.OpenRequestDispatch(V.boardNumbers.Id);
    MF.EditRequest_WaitForBalanceVisible();
    LF.RememberDigitsRequestBoard_Down(V.boardNumbers);
    SF.sleep (2);
    if (V.boardNumbers.Balance !== 0) {
        JS.scroll('div.BalanceCost:visible');
    }
    VD.IWant(VD.VToEqual, V.boardNumbers.Balance, 0, 'Баланс после закрытия не равен 0');
    MF.EditRequest_OpenPayroll();
    SF.click(By.xpath('//div[@id="invoice"]//a[@ng-click="select(tabs[1])"]'));
    driver.findElement(By.xpath('//label[@ng-init="calcWorkerTotal(\'foreman\')"]')).getText().then(function (text) {
        V.RequestPayrollTotal = SF.cleanPrice(text);
    });
    SF.sleep(1);
    MF.EditRequest_CloseModal();
    LF.closeEditRequest();

condition.nowWeDoing = 'идем в пейрол ищем форемана и проверяем комиссию';
    MF.Board_OpenPayroll();
    LF.selectDateInPayroll(V.boardNumbers.moveDate);
    SF.click(By.xpath('//table[@id="datatable"]//td[contains(text(),"foreman")]'));
    SF.click(By.xpath('//table[@id="datatable"]//td[contains(text(),"foreman")]'));
    SF.sleep(1);
    MF.WaitWhileBusy ();
    SF.click(By.xpath('//table[@id="datatable"]//td[contains(text(),"'+V.foremanFirstName+'")]'));
    SF.click(By.xpath('//table[@id="datatable"]//td[contains(text(),"'+V.foremanFirstName+'")]'));
    SF.sleep(1);
    MF.WaitWhileBusy ();
    SF.sleep(2);
    driver.wait(driver.executeScript(JSstep.Payroll_GetForemanTotalForRequest(V.boardNumbers.Id)).then(function (text) {
        V.payrollNumbersTotal = SF.cleanPrice(text);
        VD.IWant(VD.VToEqual, V.payrollNumbersTotal, V.RequestPayrollTotal, 'не совпали цифры новосозданного форемана в Payroll foreman' + V.boardNumbers.Id);
    }), config.timeout);
    SF.sleep(1);

condition.nowWeDoing='идем удалять форемана';
    MF.Board_OpenSideBar ();
    SF.sleep(1);
    MF.Board_OpenSettingsDepartment ();
    SF.sleep(2);
    SF.click (By.xpath('//ul[@class="nav nav-pills nav-stacked compose-nav"]/li[6]/a'));
    SF.sleep(2);
    MF.WaitWhileBusy ();
    driver.wait(driver.executeScript("$('.mdDataTable tbody tr td:contains(" + V.foremanFirstName + ")').dblclick();"),config.timeout);
    SF.sleep (3);
    SF.click (By.xpath('//button[@ng-click="deleteWorker()"]'));
    MF.SweetConfirm ();
    MF.WaitToastExit ();
    MF.WaitWhileBusy ();
    SF.sleep (2);
    MF.Board_LogoutAdmin ();

    //=========================закончили писать тест=============================
    SF.endOfTest();
};
