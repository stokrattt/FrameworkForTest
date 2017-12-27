module.exports = function main(SF, JS, MF, LF, JSstep, VD, V, By, until,FileDetector, system, condition, config,constants) {    global.fiber = Fiber.current;
 //   V.boardNumbers={moveDate:{}};
    V.client = {};
    V.client.name = SF.randomBukva(6) + '_t';
    V.client.fam = SF.randomBukva(6) + '_t';
    V.client.phone = SF.randomCifra(10);
    V.client.email = SF.randomBukvaSmall(6) + '@' + SF.randomBukvaSmall(4) + '.tes';

    SF.get(V.adminURL);
    LF.LoginToBoardAs_Roma4ke_Admin();
    MF.Board_OpenSettingsDepartment ();

condition.nowWeDoing='Создаем менеджера***********************************************';
    MF.WaitWhileBusy();
    MF.Department_OpenManager();
    MF.Department_ClickCreateUser();
    V.managerFirstName1 = SF.randomBukva(5)+ '_man';
    V.managerLastName1 = SF.randomBukva(5) + '_man';
    MF.Department_SendFirstLastNameAndPhone (V.managerFirstName1, V.managerLastName1, '12345678960');
    MF.Department_User_OpenAccount();
    V.managerAccount = SF.randomBukvaSmall(6) + '@' + SF.randomBukvaSmall(4) + '.tes';
    V.managerPass = 123;
    MF.Department_SendAccountNameAndPassword(V.managerAccount, V.managerPass);
    MF.Department_CreateUser();

condition.nowWeDoing='Создали менеджера****************************************';
    MF.Department_OpenSales();

condition.nowWeDoing='Создаем сейлса**************************************';
    MF.Department_ClickCreateUser();
    V.salesFirstName = SF.randomBukva(5)+ '_sa';
    V.salesLastName = SF.randomBukva(5)+ '_sa';
    MF.Department_SendFirstLastNameAndPhone (V.salesFirstName, V.salesLastName, '12345678960');
    MF.Department_User_OpenAccount();
    V.salesAccount = SF.randomBukvaSmall(6) + '@' + SF.randomBukvaSmall(4) + '.tes';
    V.salesPass = 123;
    MF.Department_SendAccountNameAndPassword(V.salesAccount, V.salesPass);
    MF.Department_CreateUser();

condition.nowWeDoing='Создали сейлса**************************************';
    MF.Department_OpenDriver();

condition.nowWeDoing='Создаем драйвера**************************************';
    MF.Department_ClickCreateUser();
    V.driverFirstName = "drivertest";
    V.driverLastName = "testdriver";
    MF.Department_SendFirstLastNameAndPhone (V.driverFirstName, V.driverLastName, '12345678960');
    MF.Department_CreateUser();

condition.nowWeDoing='Создали драйвера**************************************';
    MF.Department_OpenHelper();

condition.nowWeDoing='Создаем хелпера**************************************';
    MF.Department_ClickCreateUser();
    V.helperFirstName = "helpertest";
    V.helperLastName = "testhelper";
    MF.Department_SendFirstLastNameAndPhone (V.helperFirstName, V.helperLastName, '12345678960');
    MF.Department_CreateUser();
    SF.sleep(5);

condition.nowWeDoing='Создали хелпера**************************************';
    MF.Department_OpenForeman();

condition.nowWeDoing='Создаем форемана**************************************';
    MF.Department_ClickCreateUser();
    V.foremanFirstName = SF.randomBukva(5)+ '_for';
    V.foremanLastName = SF.randomBukva(5)+ '_for';
    MF.Department_SendFirstLastNameAndPhone (V.foremanFirstName, V.foremanLastName, '12345678960');
    MF.Department_User_OpenAccount();
    V.foremanAccount = SF.randomBukvaSmall(6) + '@' + SF.randomBukvaSmall(4) + '.tes';
    V.foremanPass = 123;
    MF.Department_SendAccountNameAndPassword(V.foremanAccount, V.foremanPass);
    MF.Department_CreateUser();

condition.nowWeDoing='Создали форемана**************************************';

    MF.Board_LogoutAdmin ();

condition.nowWeDoing='Заходим под созданным менеджером*************************************';
    SF.waitForVisible(By.xpath('//div[@ng-controller="LoginController"]//span[contains(text(),"Move")]'));
    SF.send(By.xpath('//input[@id="email"]'), V.managerAccount);
    SF.send(By.xpath('//input[@id="password"]'), V.managerPass);
    SF.click(By.xpath('//button[@type="submit"]'));
    SF.waitForLocated(By.id('main-content'));
    SF.sleep (3);
    MF.Board_LogoutAdmin ();

condition.nowWeDoing='Заходим под созданным sales*************************************';
    SF.waitForVisible(By.xpath('//div[@ng-controller="LoginController"]//span[contains(text(),"Move")]'));
    SF.send(By.xpath('//input[@id="email"]'), V.salesAccount);
    SF.send(By.xpath('//input[@id="password"]'), V.salesPass);
    SF.click(By.xpath('//button[@type="submit"]'));
    SF.waitForLocated(By.id('main-content'));
    SF.sleep (3);
    MF.Board_LogoutAdmin ();

condition.nowWeDoing='Заходим под созданным foreman*************************************';
    SF.waitForVisible(By.xpath('//div[@ng-controller="LoginController"]//span[contains(text(),"Move")]'));
    SF.send(By.xpath('//input[@id="email"]'), V.foremanAccount);
    SF.send(By.xpath('//input[@id="password"]'), V.foremanPass);
    SF.click(By.xpath('//button[@type="submit"]'));
    SF.waitForLocated(By.xpath('//input[@ng-model="vm.pageParams.conditions.nid"]'));
    SF.sleep (3);
    LF.LogoutFromBoardForeman ();
    LF.LoginToBoardAs_Roma4ke_Admin ();

condition.nowWeDoing = 'заходим под админом и создаем реквест';
    LF.CreateLocalMovingFromBoard (V.client);
    SF.sleep (2);
    driver.wait(driver.findElement(By.xpath('//a[@ng-click="select(tabs[0])"]')).getText().then(function(text){
        V.request.Id = SF.cleanPrice(text);
        LF.addToCleanerJob(V.request.Id);
    }),config.timeout);
    MF.EditRequest_SetToConfirmed ();
    MF.EditRequest_SetAdressToFrom ();
    V.boardNumbers = {};
    LF.RememberDigitsRequestBoard(V.boardNumbers);
    JS.step(JSstep.selectTruck((V.boardNumbers.LaborTimeMax + V.boardNumbers.TravelTime)/60));
    MF.WaitWhileBusy();
    LF.RememberDateFromRequest(V.boardNumbers);
    MF.EditRequest_SaveChanges ();
    LF.closeEditRequest ();

condition.nowWeDoing = 'идем в локал диспач';
    MF.Board_OpenLocalDispatch ();
    LF.findDayInLocalDispatch(V.boardNumbers.moveDate.Year,V.boardNumbers.moveDate.Month,V.boardNumbers.moveDate.Day);
    MF.Dispatch_GridView();
    LF.SelectRequestDispatch (V.request.Id);
    driver.wait(driver.executeScript(JSstep.checkUserLocalDispach(V.foremanFirstName)).then(function(counts){
        VD.IWant(VD.NotToEqual, counts.Foreman, 0, 'не нашло имя форемана');
        VD.IWant(VD.NotToEqual, counts.Helper, 0, 'не нашло имя хелпера');
        VD.IWant(VD.NotToEqual, counts.Driver, 0, 'не нашло имя драйвера');
    }),config.timeout);
    SF.sleep(1);
    MF.Board_OpenSideBar ();

condition.nowWeDoing='зашли в настройки департмента';
    MF.Board_OpenSettingsDepartment ();
    MF.WaitWhileBusy ();

condition.nowWeDoing='идем удалять форемана';
    MF.Department_OpenForeman();
    driver.actions().mouseMove(driver.findElement(By.xpath('//td[contains(text(), "'+V.foremanFirstName+'")]'))).doubleClick().perform();
    SF.sleep (3);
    MF.Department_DeleteUser();

condition.nowWeDoing='идем удалять хелпера';
    MF.Department_OpenHelper();
    let count=0;
    MF.WaitWhileBusy ();
    driver.wait(driver.executeScript("return $('.mdDataTable tbody tr td:contains(\"helpertest testhelper\")').length;").then(function(c){
        count=c;
    }),config.timeout);
    SF.sleep(0.5);
    while (count>0){
        driver.wait(driver.executeScript("$('.mdDataTable tbody tr td:contains(\"helpertest testhelper\"):eq(0)').dblclick();"),config.timeout);
        SF.sleep (2);
        MF.Department_DeleteUser();
        driver.wait(driver.executeScript("return $('.mdDataTable tbody tr td:contains(\"helpertest testhelper\")').length;").then(function(c){
            count=c;
        }),config.timeout);
        SF.sleep(1);
    }
    MF.WaitWhileBusy ();
    SF.sleep(1);

condition.nowWeDoing='идем удалять драйвера';
    MF.Department_OpenDriver();
    count=0;
    MF.WaitWhileBusy ();
    driver.wait(driver.executeScript("return $('.mdDataTable tbody tr td:contains(\"drivertest testdriver\")').length;").then(function(c){
        count=c;
    }),config.timeout);
    SF.sleep(0.5);
    while (count>0){
        driver.wait(driver.executeScript("$('.mdDataTable tbody tr td:contains(\"drivertest testdriver\"):eq(0)').dblclick();"),config.timeout);
        SF.sleep (2);
        MF.Department_DeleteUser();
        driver.wait(driver.executeScript("return $('.mdDataTable tbody tr td:contains(\"drivertest testdriver\")').length;").then(function(c){
            count=c;
        }),config.timeout);
        SF.sleep(1);
    }
    MF.WaitWhileBusy ();

condition.nowWeDoing='идем удалять сейлса';
    MF.Department_OpenSales();
    driver.actions().mouseMove(driver.findElement(By.xpath('//td[contains(text(), "'+V.salesFirstName+'")]'))).doubleClick().perform();
    SF.sleep (2);
    MF.Department_DeleteUser();

condition.nowWeDoing='идем удалять менеджера';
    MF.WaitWhileBusy();
    MF.Department_OpenManager();
    driver.actions().mouseMove(driver.findElement(By.xpath('//td[contains(text(), "'+V.managerFirstName1+'")]'))).doubleClick().perform();
    SF.sleep (2);
    MF.Department_DeleteUser();

    SF.endOfTest();
};