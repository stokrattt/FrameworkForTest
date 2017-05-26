module.exports = function main(SF, JS, MF, LF, JSstep, VD, V, By, until,FileDetector, system, condition, config,constants) {
    global.fiber = Fiber.current;
    V.client = {};
    V.client.name = SF.randomBukva(6) + '_t';
    V.client.fam = SF.randomBukva(6) + '_t';
    V.client.phone = SF.randomCifra(10);
    V.client.email = SF.randomBukvaSmall(6) + '@' + SF.randomBukvaSmall(4) + '.tes';
    V.client.passwd = 123;

    //=========================начинаем писать тест=============================
    SF.get('http://stage.themoveboard.com:8090/moveBoard/#/login');
    LF.LoginToBoardAs_Roma4ke_Admin ();
    condition.nowWeDoing = 'Заходим в Агент фолио';
    MF.Board_OpenSideBar ();
    MF.Board_OpenAgentFolio ();
    MF.Board_OpenSideBar ();
    SF.click(By.xpath('//md-switch[@ng-model="hideZero"]'));
    SF.sleep(2);
    condition.nowWeDoing = 'вибираем карьера, вибираем работи и отправляем инвоис';
    SF.click(By.xpath('//div[text()="Name"]'));
    SF.sleep(2);
    SF.click(By.xpath('//md-checkbox[@ng-model="selectAll"]'));
    SF.sleep(2);
    SF.click(By.xpath('//button[@ng-click="openInvoice($event, charge, false, selectedJobs, total.to_receive)"]'));
    SF.sleep(2);
    SF.click(By.xpath('//button[@ng-click="sendInvoice()"]'));
    SF.sleep(4);
    SF.click(By.xpath('//a[@ng-click="save()"]'));
    SF.sleep(2);
    condition.nowWeDoing = 'переходим на страницу просмотра иновоиса и делаем оплату инвоиса';
    SF.click(By.xpath('//md-fab-trigger[@aria-haspopup="true"]'));
    SF.sleep(2);
    SF.click(By.xpath('//ng-md-icon[@icon="remove_red_eye"]'));
    SF.openTab(1);
    SF.waitForVisible(By.xpath('//a[@ng-click="vm.invoicePayment();"]'));
    SF.sleep(4);
    SF.click(By.xpath('//a[@ng-click="vm.invoicePayment();"]'));
    SF.sleep(4);
    LF.InvoiceOnlinePayment();
    SF.openTab(0);
    condition.nowWeDoing = 'Проверяем есть ли в реситах оплачений инвоис';
    SF.sleep(5);
    driver.wait(driver.findElement(By.xpath('//span[contains(text(), "Amount")]/..')).getText().then(function(text){
        V.amount = SF.cleanPrice(text);
    }),config.timeout)
    SF.sleep(3);
    JS.click('span:contains(\\"Receipts\\")');
    SF.sleep(3);
    driver.wait(driver.findElement(By.xpath('//span[contains(text(), "Amount")]/..')).getText().then(function(text){
        V.receiptsAmount = SF.cleanPrice(text);
        VD.IWant(VD.VToEqual, V.amount, V.receiptsAmount, 'не совпали Amount');
    }),config.timeout)
    SF.click(By.xpath('//div[@ng-click="showList(item)"]'));
    condition.nowWeDoing = 'Проверяем есть ли в вкладке Invoices инвоис';
    JS.click('span:contains(\\"Invoices\\")');
    SF.sleep(3);
    driver.wait(driver.findElement(By.xpath('//span[contains(text(), "Amount")]/..')).getText().then(function(text){
        V.invoicesAmount = SF.cleanPrice(text);
        VD.IWant(VD.VToEqual, V.amount, V.invoicesAmount, 'не совпали Amount');
    }),config.timeout)
    SF.click(By.xpath('//div[@ng-click="showList(item)"]'));
    condition.nowWeDoing = 'удаляем инвоис';
    JS.click('span:contains(\\"Payment details\\")');
    SF.sleep(2);
    SF.click(By.xpath('//md-fab-trigger[@aria-haspopup="true"]'));
    SF.sleep(2);
    SF.click(By.xpath('//button[@ng-click="removeInvoice(item.invoice_id)"]'));


    //=========================закончили писать тест=============================
    SF.endOfTest();
};