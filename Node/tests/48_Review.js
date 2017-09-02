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
    LF.LoginToBoardAsCustom(V.adminLogin,V.adminPassword);
condition.nowWeDoing = 'идем в админку в настройки ревью и проверяем что они включены';
    MF.Board_OpenReviewSettings();
    SF.click(By.xpath('//button[@ng-click="openReviewSettings()"]'));
    SF.waitForLocated (By.id('template-container'));
    driver.wait(driver.executeScript("if($('input[ng-model=\"autoSend\"]').hasClass('ng-not-empty')){" +
        "return true;}else{$('input[ng-model=\"autoSend\"] ~span').click()}"),config.timeout);
    SF.sleep(0.5);
    SF.select(By.xpath('//select[@ng-model="selectedDay"]'), 0);
    SF.click(By.xpath('//button[@ng-click="apply()"]'));
    SF.click(By.xpath('//button[@ng-click="cancel()"]'));
    SF.sleep(5);

condition.nowWeDoing = 'создаем локал мув, конфермим его и закрываем работу';
    LF.CreateLocalMovingFromBoard (V.client);
    MF.EditRequest_SetAdressToFrom ();
    V.boardNumbers = {};
    LF.RememberDigitsRequestBoard (V.boardNumbers);
    SF.sleep(1);
    JS.step(JSstep.selectTruck((V.boardNumbers.LaborTimeMax + V.boardNumbers.TravelTime)/60));
    MF.WaitWhileBusy();
    LF.addToCleanerJob (V.boardNumbers.Id);
    MF.EditRequest_OpenClient();
    LF.SetClientPasswd(V.client.passwd);
    MF.EditRequest_OpenRequest();
    MF.EditRequest_SetToConfirmed ();
    MF.EditRequest_SaveChanges ();
    MF.EditRequest_CloseConfirmWork ();
    MF.EditRequest_SetLaborTimeCloseJob ('01:00');
    MF.EditRequest_CloseJob();

    MF.EditRequest_OpenLogs ();
    MF.WaitWhileBusy ();
    SF.sleep(2);
    MF.EditRequest_Check1EmailExist (V.client.email, "Review");
    SF.click(By.xpath('//span[@ng-bind-html="toTrustedHTML(item.text)"][contains(text(),"Review")][contains(text(),"'+V.client.email+'")]/../../../following-sibling::div[1]'));
    SF.click(By.xpath('//font[@color="#7e7e7e"]/a[5]'));
    SF.sleep (2);

condition.nowWeDoing = 'переходим с логов по ссылке в акк и ставим 5 звезд, подтверждаем';
    // SF.openTab (1);
    LF.LoginToAccountAsClient (V.client);
    SF.waitForLocated (By.id('reviews-moveboard'));
    SF.sleep(2);
    SF.click(By.xpath('//i[@ng-click="cancel()"]'));
    MF.WaitWhileToaster ();
    MF.Account_ClickViewRequest ();
    SF.sleep(2);
    LF.LogoutFromAccount ();
    SF.get(V.adminURL);
    LF.LoginToBoardAsCustom(V.adminLogin,V.adminPassword);
    SF.waitForVisible(By.xpath('//td[@ng-click="requestEditModal(request)"]'));

condition.nowWeDoing = 'идем в админку в настройки ревью и проверяем что появились наши 5 звезд и текст';
    MF.Board_OpenReviewSettings ();
    SF.sleep(3);
    driver.wait(driver.findElement(By.xpath('//div[contains(text(), "'+V.client.name+'")]/following-sibling::div[1]/p')).getText().then(function (text) {
        VD.IWant(VD.ToEqual, text, 'Review from email', 'не нашло наш текст для звезд, а может и звезды');
    }),config.timeout);
    SF.sleep(1);

condition.nowWeDoing = 'теперь отключаем отсылание ревью и создаем реквест и проверяем что ревью не отсылаются';
    SF.click(By.xpath('//button[@ng-click="openReviewSettings()"]'));
    SF.waitForLocated (By.id('template-container'));
    driver.wait(driver.executeScript("if($('input[ng-model=\"autoSend\"]').hasClass('ng-empty')){" +
        "return true;}else{$('input[ng-model=\"autoSend\"] ~span').click()}"),config.timeout);
    SF.sleep(0.5);
    SF.click(By.xpath('//button[@ng-click="apply()"]'));
    SF.click(By.xpath('//button[@ng-click="cancel()"]'));
    SF.sleep(2);
    V.client = {};
    V.client.name = SF.randomBukva(6) + '_t';
    V.client.fam = SF.randomBukva(6) + '_t';
    V.client.phone = SF.randomCifra(10);
    V.client.email = SF.randomBukvaSmall(6) + '@' + SF.randomBukvaSmall(4) + '.tes';
    LF.CreateLocalMovingFromBoard (V.client);
    MF.EditRequest_OpenLogs ();
    MF.WaitWhileBusy ();
    SF.sleep(2);
    MF.EditRequest_Check1EmailNotExist (V.client.email, "Review");
    SF.sleep(1);
    MF.EditRequest_OpenRequest ();
    V.boardNumbers = {};
    LF.RememberDigitsRequestBoard (V.boardNumbers);
    SF.sleep(1);
    JS.step(JSstep.selectTruck((V.boardNumbers.LaborTimeMax + V.boardNumbers.TravelTime)/60));
    MF.WaitWhileBusy();
    LF.addToCleanerJob (V.boardNumbers.Id);
    MF.EditRequest_SetAdressToFrom ();
    MF.EditRequest_SetToConfirmed ();
    MF.EditRequest_SaveChanges ();
    MF.EditRequest_CloseConfirmWork ();
    MF.EditRequest_SetLaborTimeCloseJob ('01:00');
    MF.EditRequest_CloseJob();

    MF.EditRequest_OpenLogs ();
    MF.WaitWhileBusy ();
    SF.sleep(2);
    MF.EditRequest_Check1EmailNotExist (V.client.email, "Review");
    SF.sleep(2);
    //=========================закончили писать тест=============================
    SF.endOfTest();
};
