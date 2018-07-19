module.exports = function main(SF, JS, MF, LF, JSstep, VD, V, By, until,FileDetector, system, condition, config,constants) {
    global.fiber = Fiber.current;
    V.client = {};
    V.client.name = SF.randomBukva(6) + '_t';
    V.client.fam = SF.randomBukva(6) + '_t';
    V.client.phone = SF.randomCifra(10);
    V.client.email = SF.randomBukvaSmall(6) + '@' + SF.randomBukvaSmall(4) + '.tes';
    V.client.passwd = 123;
    V.InvItemName = SF.randomBukva(5);
    V.InvDescription = SF.randomBukva(5);
    V.InvUnitCost = SF.randomCifra(2);
    V.InvQty = SF.randomCifra(2);

    SF.get(V.adminURL);
    LF.LoginToBoardAsCustom(V.adminLogin,V.adminPassword);

    condition.nowWeDoing = 'Открываем табу Total invoices и делаем проверки совпадают ли тоталы сумм и инвойсов';
    SF.click(By.xpath('//div[@ng-if="vm.canSeeInvoices"]'));
    driver.wait(driver.findElement(By.xpath('//div[@ng-if="vm.canSeeInvoices"]//span[@class="total text-center"]')).getText().then(function (text) {
        V.TotalInvoices = SF.cleanPrice (text);
    }), config.timeout);
    SF.sleep(1.5);
    driver.wait(driver.findElement(By.xpath('//div/span[@uib-tooltip="Total Paid"]')).getText().then(function (text) {
        V.TotalPaidInv = SF.cleanPrice(text.substring(text.indexOf('(')));
    }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//div/span[@uib-tooltip="Total Unpaid"]')).getText().then(function (text) {
        V.TotalUnpaidInv = SF.cleanPrice(text.substring(text.indexOf('(')));
    }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//div/span[@uib-tooltip="Total"]')).getText().then(function(text) {
        VD.IWant(VD.ToEqual, SF.cleanPrice(text.substring(text.indexOf('('))), V.TotalPaidInv+V.TotalUnpaidInv, 'не совпало количество инвойсов сверху в блоке при сумировании оплаченых и неоплаченых инвойсов');
    }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//div/span[@uib-tooltip="Total Paid"]')).getText().then(function (text) {
        V.TotalPaidSum = SF.cleanPrice(text.substring(0, text.indexOf('(')));
    }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//div/span[@uib-tooltip="Total Unpaid"]')).getText().then(function (text) {
        V.TotalUnpaidSum = SF.cleanPrice(text.substring(0, text.indexOf('(')));
    }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//div/span[@uib-tooltip="Total"]')).getText().then(function(text) {
        VD.IWant(VD.ToEqual, SF.cleanPrice(text.substring(0, text.indexOf('('))), V.TotalPaidSum+V.TotalUnpaidSum, 'не совпала сумма сверху в блоке при сумировании оплаченых и неоплаченых инвойслв');
    }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//div/span[@class="table-total"]')).getText().then(function(text) {
        VD.IWant(VD.ToEqual, SF.cleanPrice(text.substring(text.indexOf('$'))), V.TotalPaidSum+V.TotalUnpaidSum, 'не совпала сумма TOTAL справа, после сумирования оплаченых и неоплаченых инвойсов');
    }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//div[@class="table_info"]')).getText().then(function(text) {
        VD.IWant(VD.ToEqual, SF.cleanPrice(text.substring(text.indexOf('of'), text.indexOf('entries'))), V.TotalPaidInv+V.TotalUnpaidInv, 'не совпало количество инвойсов внизу, после сумирования колличества оплаченых/неоплаченых инвойсов');
    }),config.timeout);

    condition.nowWeDoing = 'создаем реквест';
    LF.CreateLocalMovingFromBoard(V.client);
    MF.EditRequest_SetToConfirmed ();
    MF.EditRequest_SetAdressToFrom ();
    V.boardNumbers = {};
    LF.RememberDigitsRequestBoard(V.boardNumbers);
    JS.step(JSstep.selectTruck((V.boardNumbers.LaborTimeMax + V.boardNumbers.TravelTime)/60));
    MF.WaitWhileBusy();
    MF.EditRequest_SaveChanges ();

    condition.nowWeDoing = 'создаем инвойс';
    SF.click(By.xpath('//div/label[@ng-click="OpenPaymentModal();"]'));
    SF.sleep(1);
    SF.click(By.xpath('//span[contains(text(), \"Create  Invoice\")]'));
    SF.sleep(0.5);
    SF.click(By.xpath('//input[@placeholder="Item Name"]'));
    SF.send(By.xpath('//input[@placeholder="Item Name"]'),V.InvItemName);
    SF.click(By.xpath('//input[@placeholder="Description"]'));
    SF.send(By.xpath('//input[@placeholder="Description"]'),V.InvDescription);
    SF.click(By.xpath('//input[@placeholder="Cost"]'));
    SF.send(By.xpath('//input[@placeholder="Cost"]'),V.InvUnitCost);
    SF.click(By.xpath('//input[@placeholder="Quantity"]'));
    SF.send(By.xpath('//input[@placeholder="Quantity"]'),V.InvQty);
    SF.click(By.xpath('//textarea[@placeholder="Notes"]'));
    driver.wait(driver.findElement(By.xpath('//div[@class="totals_row nopadding row totaldue"]/../div')).getText().then(function (text) {
        V.InvTotalDue = SF.cleanPrice (text);
    }), config.timeout);
    SF.click(By.xpath('//a[contains(text(), \"Proceed to send invoice\")]'));
    SF.sleep(1);
    SF.click(By.xpath('//a[contains(text(), \"Send & Close\")]'));

    condition.nowWeDoing = 'находим наш инвойс в списке и запоминаем его статус и дату';
    SF.waitForLocated (By.xpath('//tr[@ng-repeat="invoice in invoices track by $index"]//td[contains(text(), "'+V.InvDescription+'")]'));
    driver.wait(driver.findElement(By.xpath('//tr[@ng-repeat="invoice in invoices track by $index"]//td[contains(text(), "'+V.InvDescription+'")]/following-sibling::td[3]')).getText().then(function (text) {
        V.StatusInv = text;
    }), config.timeout);
    driver.wait(driver.findElement(By.xpath('//tr[@ng-repeat="invoice in invoices track by $index"]//td[contains(text(), "'+V.InvDescription+'")]/following-sibling::td[1]')).getText().then(function (text) {
        V.DateInv = text;
    }), config.timeout);
    SF.click(By.xpath('//button[contains(text(), \"Ok\")]'));
    SF.sleep(0.5);
    SF.click(By.xpath('//button[contains(text(), \"×\")]'));
    SF.sleep(0.5);
    SF.click(By.xpath('//i[@class="dashboard_icon icon-refresh"]'));
    SF.sleep(1.5);

    condition.nowWeDoing = 'проверяем появился ли новый инвойс и правильно ли увеличились сумма и количество';
    driver.wait(driver.findElement(By.xpath('//div[@ng-if="vm.canSeeInvoices"]//span[@class="total text-center"]')).getText().then(function (text) {
        VD.IWant(VD.ToEqual, SF.cleanPrice(text), V.TotalInvoices+1, 'не прибавился новый инвойс после создания к колличеству, сверху в блоке')
    }), config.timeout);
    driver.wait(driver.findElement(By.xpath('//div[@class="table_info"]')).getText().then(function(text) {
        VD.IWant(VD.ToEqual, SF.cleanPrice(text.substring(text.indexOf('of'), text.indexOf('entries'))), V.TotalPaidInv+V.TotalUnpaidInv+1, 'не совпало количество инвойсов внизу, после создания нового');
    }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//div/span[@uib-tooltip="Total Unpaid"]')).getText().then(function (text) {
        VD.IWant(VD.ToEqual, SF.cleanPrice(text.substring(0, text.indexOf('('))), V.TotalUnpaidSum+V.InvTotalDue, 'не прибавилась сумма нового инвойса сверху в блоке');
    }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//div/span[@uib-tooltip="Total Unpaid"]')).getText().then(function (text) {
        VD.IWant(VD.ToEqual, SF.cleanPrice(text.substring(text.indexOf('('))), V.TotalUnpaidInv+1, 'не прибавился новый инвойс к колличеству неоплаченых сверху в блоке');
    }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//td[contains(text(), "'+V.client.name+' '+V.client.fam+'")]')).getText().then(function (text) {
        V.ClientNameFam = text;
        VD.IWant(VD.ToEqual, (V.client.name + ' ' + V.client.fam), V.ClientNameFam, 'не совпали имя/фамилия клиента в строке созданого инвойса')
    }), config.timeout);
    SF.sleep(0.5);
    driver.wait(driver.findElement(By.xpath('//td[contains(text(), "'+V.ClientNameFam+'")]/following-sibling::td[1]')).getText().then(function (text) {
        VD.IWant(VD.ToEqual, text, V.InvDescription, 'не совпал дескрипшн в строке созданого инвойса')
    }), config.timeout);
//    driver.wait(driver.findElement(By.xpath('//td[contains(text(), "'+V.ClientNameFam+'")]/following-sibling::td[2]')).getText().then(function (text) {
//        VD.IWant(VD.ToEqual, text, V.DateInv, 'не совпала дата в строке созданого инвойса')
//    }), config.timeout);
    driver.wait(driver.findElement(By.xpath('//td[contains(text(), "'+V.ClientNameFam+'")]/following-sibling::td[3]')).getText().then(function (text) {
        VD.IWant(VD.ToEqual, SF.cleanPrice(text), V.InvTotalDue, 'не совпала сумма в строке созданого инвойса')
    }), config.timeout);
    driver.wait(driver.findElement(By.xpath('//td[contains(text(), "'+V.ClientNameFam+'")]/following-sibling::td[4]')).getText().then(function (text) {
        VD.IWant(VD.ToEqual, text, V.StatusInv, 'не совпал статус инвойса в строке созданого инвойса')
    }), config.timeout);

    condition.nowWeDoing = 'фильтруем по unpaid';
    SF.click(By.xpath('//div[contains(text(), \"All\")]'));
    SF.waitForLocated (By.xpath('//md-option[@id="select_option_17"]//div[contains(text(), \"unpaid\")]'));
    SF.click(By.xpath('//md-option[@id="select_option_17"]//div[contains(text(), \"unpaid\")]'));
    SF.sleep(1);

    condition.nowWeDoing = 'проверяем что Тотал Паид стал 0 сверху и что есть наш инвойс';
    driver.wait(driver.findElement(By.xpath('//div/span[@uib-tooltip="Total Paid"]')).getText().then(function (text) {
        VD.IWant (VD.ToEqual, SF.cleanPrice(text.substring(text.indexOf('('))), 0, 'тотал пейд не стал 0 после сортировки по unpaid');
    }), config.timeout);
    driver.wait(driver.findElement(By.xpath('//div/span[@uib-tooltip="Total Paid"]')).getText().then(function (text) {
        VD.IWant (VD.ToEqual, SF.cleanPrice(text.substring(0, text.indexOf('('))), 0, 'сумма пейд не стала 0 после сортировки по unpaid');
    }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//td[contains(text(), "'+V.ClientNameFam+'")]')).getText().then(function (text) {
        VD.IWant(VD.ToEqual, text, V.ClientNameFam, 'после сортировки не совпали имя фамилия клиента')
    }), config.timeout);

    condition.nowWeDoing = 'открываем реквест, и через логи идем его оплачивать, паралельно проверив статус инвойса';
    JS.click('td:contains(\\"Open Request #'+V.boardNumbers.Id+'\\")');
    SF.sleep(2);
    SF.click(By.xpath('//a[contains(text(), \"Log\")]'));
    SF.sleep(1);
    SF.click(By.xpath('//span[contains(text(), \"Expand\")]'));
    SF.click(By.xpath('//a[contains(text(), \"vIEW INVOICE\")]'));
    SF.sleep(3);
    SF.openTab(1);
    SF.waitForLocated (By.xpath('//td[contains(text(), "'+V.ClientNameFam+'")]'));
    driver.wait(driver.findElement(By.xpath('//td[contains(text(), "'+V.ClientNameFam+'")]')).getText().then(function (text) {
        VD.IWant(VD.ToEqual, text.substring(0, +17), V.client.name + ' ' + V.client.fam, 'не совпали имя/фамилия клиента на странице оплаты инвойса')
    }), config.timeout);
    driver.wait(driver.findElement(By.xpath('//b[contains(text(), \"Balance Due (USD)\")]/../span')).getText().then(function (text) {
        VD.IWant(VD.ToEqual, SF.cleanPrice(text), V.InvTotalDue, 'не совпала сумма в Balance Due на странице оплаты инвойса')
    }), config.timeout);
    driver.wait(driver.findElement(By.xpath('//b[contains(text(), \"Total Balance Due (USD):\")]/../span/b')).getText().then(function (text) {
        VD.IWant(VD.ToEqual, SF.cleanPrice(text), V.InvTotalDue, 'не совпала сумма в Total Balance Due на странице оплаты инвойса')
    }), config.timeout);
    SF.openTab(0);
    SF.click(By.xpath('//a[contains(text(), "Request #'+V.boardNumbers.Id+'")]'));
    SF.click(By.xpath('//div/label[@ng-click="OpenPaymentModal();"]'));
    SF.waitForLocated (By.xpath('//tr[@ng-repeat="invoice in invoices track by $index"]//td[contains(text(), "'+V.InvDescription+'")]'));
    driver.wait(driver.findElement(By.xpath('//tr[@ng-repeat="invoice in invoices track by $index"]//td[contains(text(), "'+V.InvDescription+'")]/following-sibling::td[3]')).getText().then(function (text) {
        VD.IWant(VD.ToEqual, text, 'viewed', 'статус инвойса не поменялся на viewed в окне инвойсов модалки реквеста, после того как мы открыли инвойс в новой табе');
    }), config.timeout);
    SF.sleep(1);
    SF.click(By.xpath('//button[contains(text(), \"Ok\")]'));
    SF.sleep(1);
    SF.click(By.xpath('//button[contains(text(), \"×\")]'));
    SF.sleep(1);
    SF.click(By.xpath('//i[@class="dashboard_icon icon-refresh"]'));
    SF.sleep(4);
    driver.wait(driver.findElement(By.xpath('//td[contains(text(), "'+V.ClientNameFam+'")]/following-sibling::td[4]')).getText().then(function (text) {
        VD.IWant(VD.ToEqual, text, 'viewed', 'статус инвойса не поменялся на viewed на странице инвойсов, после того как мы открыли инвойс в новой табе')
    }), config.timeout);
    SF.openTab(1);
    SF.click(By.xpath('//a[@ng-click="vm.invoicePayment();"]'));
    JS.waitForExist('input[ng-model="payment.card_num"]');
    SF.sleep(1);
    SF.send(By.xpath('//input[@ng-model="payment.card_num"]'), 4111111111111111);
    SF.send(By.xpath('//input[@ng-model="payment.exp_month"]'), 11);
    SF.send(By.xpath('//input[@ng-model="payment.exp_year"]'), 20);
    SF.send(By.xpath('//input[@ng-model="payment.firstName"]'), V.client.name);
    SF.send(By.xpath('//input[@ng-model="payment.lastName"]'), V.client.fam);
    SF.send(By.xpath('//input[@ng-model="secure.cvc"]'), 323);
    SF.send(By.xpath('//input[@ng-model="payment.billing_zip"]'), "02032");
    SF.sleep(1);
    SF.click(By.xpath('//input[@ng-click="applyPayment()"]'));
    MF.WaitWhileSpinner ();
    SF.waitForLocated (By.xpath('//img[@ng-if="vm.invoicePaid"]'));
    driver.navigate().refresh();
    SF.waitForLocated (By.xpath('//img[@ng-if="vm.invoicePaid"]'));
    SF.sleep(3);
    driver.wait(driver.findElement(By.xpath('//b[contains(text(), \"Balance Due (USD)\")]/../span')).getText().then(function (text) {
        VD.IWant(VD.ToEqual, SF.cleanPrice(text), 0, 'после оплаты не стал 0 в Balance Due на странице оплаты инвойса')
    }), config.timeout);
    driver.wait(driver.findElement(By.xpath('//b[contains(text(), \"Total Balance Due (USD):\")]/../span/b')).getText().then(function (text) {
        VD.IWant(VD.ToEqual, SF.cleanPrice(text), 0, 'после оплаты не стал 0 в Total Balance Due на странице оплаты инвойса')
    }), config.timeout);
    SF.sleep(1);
    driver.close();
    SF.openTab (0);

    condition.nowWeDoing = 'фильтруем по paid';
    SF.click(By.xpath('//div[contains(text(), \"unpaid\")]'));
    SF.sleep(1);
    SF.click(By.xpath('//md-option[@id="select_option_16"]//div[contains(text(), \"paid\")]'));
    SF.sleep(2);

    condition.nowWeDoing = 'проверяем что Тотал АнПаид стал 0 сверху, и что есть наш инвойс и что у него статус Paid, а также суммы';
    driver.wait(driver.findElement(By.xpath('//div/span[@uib-tooltip="Total Unpaid"]')).getText().then(function (text) {
        VD.IWant (VD.ToEqual, SF.cleanPrice(text.substring(text.indexOf('('))), 0, 'тотал анпейд не стал 0 после сортировки по paid');
    }), config.timeout);
    driver.wait(driver.findElement(By.xpath('//div/span[@uib-tooltip="Total Unpaid"]')).getText().then(function (text) {
        VD.IWant (VD.ToEqual, SF.cleanPrice(text.substring(0, text.indexOf('('))), 0, 'сумма анпейд не стала 0 после сортировки по paid');
    }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//div/span[@uib-tooltip="Total Paid"]')).getText().then(function (text) {
        VD.IWant(VD.ToEqual, SF.cleanPrice(text.substring(0, text.indexOf('('))), V.TotalPaidSum+V.InvTotalDue, 'не прибавилась сумма нового инвойса к оплаченым, после оплаты');
    }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//div/span[@uib-tooltip="Total Paid"]')).getText().then(function (text) {
        VD.IWant(VD.ToEqual, SF.cleanPrice(text.substring(text.indexOf('('))), V.TotalPaidInv+1, 'не прибавился новый инвойс к колличеству оплаченых, после оплаты');
    }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//div/span[@uib-tooltip="Total"]')).getText().then(function(text) {
        VD.IWant(VD.ToEqual, SF.cleanPrice(text.substring(text.indexOf('('))), V.TotalPaidInv+1, 'не совпало количество инвойсов сверху в блоке Total, после оплаты');
    }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//div/span[@uib-tooltip="Total"]')).getText().then(function(text) {
        VD.IWant(VD.ToEqual, SF.cleanPrice(text.substring(0, text.indexOf('('))), V.TotalPaidSum+V.InvTotalDue, 'не совпала сумма сверху в блоке, после оплаты');
    }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//div/span[@class="table-total"]')).getText().then(function(text) {
        VD.IWant(VD.ToEqual, SF.cleanPrice(text.substring(text.indexOf('$'))), V.TotalPaidSum+V.InvTotalDue, 'не совпала сумма TOTAL справа, после оплаты');
    }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//td[contains(text(), "'+V.ClientNameFam+'")]')).getText().then(function (text) {
        VD.IWant(VD.ToEqual, text, V.ClientNameFam, 'после сортировки по paid не совпали имя/фамилия клиента')
    }), config.timeout);
    driver.wait(driver.findElement(By.xpath('//td[contains(text(), "'+V.ClientNameFam+'")]/following-sibling::td[4]')).getText().then(function (text) {
        VD.IWant(VD.ToEqual, text, 'paid', 'статус инвойса не поменялся на paid в строки инвойса, после оплаты')
    }), config.timeout);

    condition.nowWeDoing = 'открываем реквест, сравниваем суммы: Payment, и Total в окне инвойсов, + сравниваем что поменялся статус';
    JS.click('td:contains(\\"Open Request #'+V.boardNumbers.Id+'\\")');
    SF.waitForLocated (By.xpath('//div/label[@ng-click="OpenPaymentModal();"]'));
    driver.wait(driver.findElement(By.xpath('//label[contains(text(), "Payment: ")]/../div')).getText().then(function (text) {
        VD.IWant(VD.ToEqual, SF.cleanPrice(text), V.InvTotalDue, 'не совпала сумма Payment в окне реквеста, после оплаты')
    }), config.timeout);
    SF.click(By.xpath('//div/label[@ng-click="OpenPaymentModal();"]'));
    SF.waitForLocated (By.xpath('//tr[@ng-repeat="invoice in invoices track by $index"]//td[contains(text(), "'+V.InvDescription+'")]'));
    driver.wait(driver.findElement(By.xpath('//tr[@ng-repeat="invoice in invoices track by $index"]//td[contains(text(), "'+V.InvDescription+'")]/following-sibling::td[3]')).getText().then(function (text) {
        VD.IWant(VD.ToEqual, text, 'paid', 'статус инвойса не поменялся на paid в окне создания инвойсов, после оплаты');
    }), config.timeout);
    SF.sleep(0.5);
    driver.wait(driver.findElement(By.xpath('//div[contains(text(), \"Total\")]')).getText().then(function(text) {
        VD.IWant(VD.ToEqual, SF.cleanPrice(text), V.InvTotalDue, 'не совпала сумма Total в окне инвойсов сверху, после оплаты');
    }),config.timeout);
    SF.click(By.xpath('//button[contains(text(), \"Ok\")]'));
    SF.sleep(1);
    SF.click(By.xpath('//button[contains(text(), \"×\")]'));
    SF.sleep(1);

    condition.nowWeDoing = 'идем статистику/инвойсы, и сравниваем вверху в блоках суммы и колличество';
    MF.Board_OpenStatistic ();
    SF.click(By.xpath('//a[@ui-sref="statistics.invoices"]'));
    SF.sleep (3);
    driver.wait(driver.findElement(By.xpath('//div[@class="panel-body blueBox"]/span')).getText().then(function(text) {
        VD.IWant(VD.ToEqual, SF.cleanPrice(text.substring(0, text.indexOf('('))), V.TotalPaidSum+V.TotalUnpaidSum+V.InvTotalDue, 'в статистике инвойсов не совпала общая сумма инвойсов сверху в голубом блоке');
    }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//div[@class="panel-body blueBox"]/span')).getText().then(function(text) {
        VD.IWant(VD.ToEqual, SF.cleanPrice(text.substring(text.indexOf('('))), V.TotalPaidInv+V.TotalUnpaidInv+1, 'в статистике инвойсов не совпало общее колличество инвойсов сверху в голубом блоке');
    }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//div[@class="panel-body greenBox"]/span')).getText().then(function(text) {
        VD.IWant(VD.ToEqual, SF.cleanPrice(text.substring(0, text.indexOf('('))), V.TotalPaidSum+V.InvTotalDue, 'в статистике инвойсов не совпала общая сумма оплаченых инвойсов сверху в зеленом блоке');
    }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//div[@class="panel-body greenBox"]/span')).getText().then(function(text) {
        VD.IWant(VD.ToEqual, SF.cleanPrice(text.substring(text.indexOf('('))), V.TotalPaidInv+1, 'в статистике инвойсов не совпало общее колличество оплаченых инвойсов сверху в зеленом блоке');
    }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//div[@class="panel-body redBox"]/span')).getText().then(function(text) {
        VD.IWant(VD.ToEqual, SF.cleanPrice(text.substring(0, text.indexOf('('))), V.TotalUnpaidSum, 'в статистике инвойсов не совпала общая сумма НЕоплаченых инвойсов сверху в красном блоке');
    }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//div[@class="panel-body redBox"]/span')).getText().then(function(text) {
        VD.IWant(VD.ToEqual, SF.cleanPrice(text.substring(text.indexOf('('))), V.TotalUnpaidInv, 'в статистике инвойсов не совпало общее колличество НЕоплаченых инвойсов сверху в красном блоке');
    }),config.timeout);

    SF.endOfTest();
};