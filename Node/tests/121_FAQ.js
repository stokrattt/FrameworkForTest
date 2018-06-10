module.exports = function main(SF, JS, MF, LF, JSstep, VD, V, By, until,FileDetector, system, condition, config,constants){
    global.fiber = Fiber.current;
    V.client = {};
    V.client.name = SF.randomBukva(6) + '_t';
    V.client.fam = SF.randomBukva(6) + '_t';
    V.client.phone = SF.randomCifra(10);
    V.client.email = SF.randomBukvaSmall(6) + '@' + SF.randomBukvaSmall(4) + '.tes';
    V.Question = SF.randomBukva(10);
    V.Answer = SF.randomBukva(30);

    SF.get(V.adminURL);
condition.nowWeDoing = 'идем в настроики FAQ, добавляем вопрос';

    LF.LoginToBoardAsCustom(V.adminLogin,V.adminPassword);
    MF.Board_OpenSettingsGeneral ();
    MF.Board_OpenSettingsAccountPageFAQ();
    SF.click(By.xpath('//div[@class="settings-account-faq__sort-settings"]//button[@ng-click="openCreateModal()"]'));
    MF.WaitWhileBusy();
    SF.click(By.xpath('//input[@ng-model="item.faq_question"]'));
    SF.send(By.xpath('//input[@ng-model="item.faq_question"]'),V.Question);
    SF.sleep(1);
    SF.click(By.xpath('//div[@placeholder=\"Answer\"]'));
    SF.send(By.xpath('//div[@ng-model="item.faq_answer"]//div[@ng-model="html"]'),V.Answer);
    SF.sleep(2);
    SF.click(By.xpath('//div[@class="modal-footer"]//button[@ng-click="save()"]'));
    MF.WaitWhileToaster();
    SF.sleep(2);
    MF.Board_LogoutAdmin();

condition.nowWeDoing = 'создаем реквест с фронта, проверяем в аккаунте вопрос который мы создали';
    SF.get(V.frontURL);
    LF.FullSmallCalcAsLocal(V.client);
    MF.Account_ClickViewRequest();
    SF.click(By.xpath('//div[@ng-repeat="item in questionArr"]//span[contains(text(), "'+V.Question+'")]'));
    SF.sleep(2);

condition.nowWeDoing = 'Проверяем совпадает ли ответ с тем который мы создали';
    driver.wait(driver.findElement(By.xpath('//div[@class="panel-collapse in collapse"]//div[@ng-bind-html="item.faq_answer"]')).getText().then(function(text) {
             VD.IWant(VD.ToEqual, V.Answer, text,'не совпадает ответ с тем что мы создавали');
    }),config.timeout);
    SF.click(By.xpath('//div[@class="panel-collapse in collapse"]//button[contains(text(), \"Yes\")]'));
    SF.sleep(1);

condition.nowWeDoing = 'возвращаемся на мувборд';
    LF.LogoutFromAccount();
    SF.get(V.adminURL);

condition.nowWeDoing = 'идем в настроики FAQ';

    LF.LoginToBoardAsCustom(V.adminLogin,V.adminPassword);
    MF.Board_OpenSettingsGeneral ();
    MF.Board_OpenSettingsAccountPageFAQ();

condition.nowWeDoing = 'Проверяем совпадает ли оценка';
    driver.wait(driver.findElement(By.xpath('//div[@class="score-box upvote"]')).getText().then(function(text) {
           VD.IWant(VD.ToEqual, SF.cleanPrice(text), 1, 'оценка не совпала');
    }),config.timeout);

condition.nowWeDoing = 'удаляем вопрос';
    SF.click(By.xpath('//div[@class="sizeset chat-widget"]//button[contains(text(), \"Remove\")]'));
    MF.WaitWhileBusy();
    MF.SweetConfirm();
    SF.endOfTest();
};