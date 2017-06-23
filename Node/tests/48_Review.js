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
    // MF.SweetConfirm ();
    SF.sleep(2);
    Debug.pause();

condition.nowWeDoing = 'создаем локал мув, конфермим его и закрываем работу';
    LF.CreateLocalMovingFromBoard (V.client);
    MF.EditRequest_SetAdressToFrom ();
    V.boardNumbers = {};
    LF.RememberDigitsRequestBoard (V.boardNumbers);
    SF.sleep(1);
    JS.step(JSstep.selectTruck((V.boardNumbers.LaborTimeMax + V.boardNumbers.TravelTime)/60));
    LF.addToCleanerJob (V.boardNumbers.Id);
    MF.EditRequest_OpenClient();
    LF.SetClientPasswd(V.client.passwd);
    MF.EditRequest_OpenRequest();
    MF.EditRequest_SetToConfirmed ();
    MF.EditRequest_SaveChanges ();
    MF.EditRequest_CloseConfirmWork ();
    MF.EditRequest_SetLaborTimeCloseJob ();
    MF.EditRequest_CloseJob();
//     LF.closeEditRequest ();
//     MF.Board_LogoutAdmin ();
// condition.nowWeDoing = 'Идем на апи и дергаем крон';
//     SF.get ('http://api.moversboard.net:8084/admin/config/system/cron');
//     SF.waitForLocated (By.id('user-login'));
//     SF.send (By.xpath('//input[@id="edit-name"]'), "TestAdmin");
//     SF.send (By.xpath('//input[@id="edit-pass"]'), "test");
//     SF.click(By.xpath('//input[@id="edit-submit"]'));
//     SF.waitForLocated (By.xpath('//div[@class="overflow-fix"]'));
//     SF.sleep(2);
//     SF.click(By.xpath('//b[contains(text(), "move_reviews")]/../following-sibling::td/a[contains(text(), "Force run")]'));
//     SF.sleep(2);
//     driver.switchTo().alert().accept();
//     SF.sleep(14);
//
//     SF.click(By.xpath('//li[@class="admin-menu-action"]/a[contains(text(), "Log out")]'));
//     SF.sleep (5);
//     SF.get (V.adminURL);
//     LF.LoginToBoardAsCustom(V.adminLogin,V.adminPassword);
// condition.nowWeDoing = 'идем в админку, открываем реквест и идем в логи, проверять что отправилась клиенту ревьюха';
//     MF.Board_OpenConfirmed ();
//     MF.Board_OpenRequest (V.boardNumbers.Id);
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
    // SF.click (By.xpath('//div[@id="review_settings"]/div//i[5]'));
    // SF.send(By.xpath('//div[@ng-model="html"]'), 'five stars it is good');
    // SF.click(By.xpath('//button[@ng-click="apply()"]'));
    // SF.sleep(2);
    SF.click(By.xpath('//i[@ng-click="cancel()"]'));
    // MF.SweetConfirm ();
    MF.WaitWhileToaster ();
    MF.Account_ClickViewRequest ();
    SF.sleep(2);
    LF.LogoutFromAccount ();
    SF.get(V.adminURL);
    LF.LoginToBoardAsCustom(V.adminLogin,V.adminPassword);
    SF.waitForVisible(By.xpath('//td[@ng-click="requestEditModal(request)"]'));
condition.nowWeDoing = 'идем в админку в настройки ревью и проверяем что появились наши 5 звезд и текст';
    MF.Board_OpenReviewSettings ();
    driver.wait(driver.findElement(By.xpath('//div[contains(text(), "'+V.client.name+'")]/following-sibling::div[1]/p')).getText().then(function (text) {
        VD.IWant(VD.VToEqual, text, 'Review from email', 'не нашло наш текст для звезд, а может и звезды');
    }),config.timeout);
    SF.sleep(1);

    //=========================закончили писать тест=============================
    SF.endOfTest();
};
