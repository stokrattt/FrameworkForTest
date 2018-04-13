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
        console.log(V.TotalInvoices);
    }), config.timeout);
    SF.sleep(2);
    driver.wait(driver.findElement(By.xpath('//div/span[@uib-tooltip="Total Paid"]')).getText().then(function (text) {
        V.TotalPaidInv = SF.cleanPrice(text.substring(text.indexOf('(')));
        console.log(V.TotalPaidInv);
    }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//div/span[@uib-tooltip="Total Unpaid"]')).getText().then(function (text) {
        V.TotalUnpaidInv = SF.cleanPrice(text.substring(text.indexOf('(')));
        console.log(V.TotalUnpaidInv);
    }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//div/span[@uib-tooltip="Total"]')).getText().then(function(text) {
        VD.IWant(VD.ToEqual, SF.cleanPrice(text.substring(text.indexOf('('))), V.TotalPaidInv+V.TotalUnpaidInv, 'не совпало количество инвойсов сверху в блоке');
    }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//div/span[@uib-tooltip="Total Paid"]')).getText().then(function (text) {
        V.TotalPaidSum = SF.cleanPrice(text.substring(0, text.indexOf('(')));
        console.log(V.TotalPaidSum);
    }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//div/span[@uib-tooltip="Total Unpaid"]')).getText().then(function (text) {
        V.TotalUnpaidSum = SF.cleanPrice(text.substring(0, text.indexOf('(')));
        console.log(V.TotalUnpaidSum);
    }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//div/span[@uib-tooltip="Total"]')).getText().then(function(text) {
        VD.IWant(VD.ToEqual, SF.cleanPrice(text.substring(0, text.indexOf('('))), V.TotalPaidSum+V.TotalUnpaidSum, 'не совпала сумма сверху в блоке');
    }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//div/span[@class="table-total"]')).getText().then(function(text) {
        VD.IWant(VD.ToEqual, SF.cleanPrice(text.substring(text.indexOf('$'))), V.TotalPaidSum+V.TotalUnpaidSum, 'не совпала сумма TOTAL');
    }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//div[@class="table_info"]')).getText().then(function(text) {
        VD.IWant(VD.ToEqual, SF.cleanPrice(text.substring(text.indexOf('of'), text.indexOf('entries'))), V.TotalPaidInv+V.TotalUnpaidInv, 'не совпало количество инвойсов внизу');
    }),config.timeout);

    condition.nowWeDoing = 'создаем реквест';
    LF.CreateLocalMovingFromBoard(V.client);
    MF.EditRequest_SetToConfirmed ();
    MF.EditRequest_SetAdressToFrom ();
    V.boardNumbers = {};
    LF.RememberDigitsRequestBoard(V.boardNumbers);
    JS.step(JSstep.selectTruck((V.boardNumbers.LaborTimeMax + V.boardNumbers.TravelTime)/60));
    MF.EditRequest_SaveChanges ();
    SF.sleep(1);

    condition.nowWeDoing = 'создаем инвойс';
    SF.click(By.xpath('//div/label[@ng-click="OpenPaymentModal();"]'));
    SF.sleep(1);
    SF.click(By.xpath('//span[contains(text(), \"Create  Invoice\")]'));
    SF.click(By.xpath('//input[@placeholder="Item Name"]'));
    SF.send(By.xpath('//input[@placeholder="Item Name"]'),V.InvItemName);
    SF.click(By.xpath('//input[@placeholder="Description"]'));
    SF.send(By.xpath('//input[@placeholder="Description"]'),V.InvDescription);
    SF.click(By.xpath('//input[@placeholder="Cost"]'));
    SF.send(By.xpath('//input[@placeholder="Cost"]'),V.InvUnitCost);
    SF.click(By.xpath('//input[@placeholder="Quantity"]'));
    SF.send(By.xpath('//input[@placeholder="Quantity"]'),V.InvQty);
    driver.wait(driver.findElement(By.xpath('//div[@class="title number nopadding text-right col-xs-7"]')).getText().then(function (text) {
        V.InvTotalDue = SF.cleanPrice (text);
        console.log(V.InvTotalDue);
    }), config.timeout);
    SF.click(By.xpath('//a[contains(text(), \"Proceed to send invoice\")]'));
    SF.sleep(2);
    SF.click(By.xpath('//a[contains(text(), \"Send & Close\")]'));
    SF.sleep(3);

    condition.nowWeDoing = 'находим наш инвойс в списке и запоминаем его статус и дату';
    driver.wait(driver.findElement(By.xpath('//tr[@ng-repeat="invoice in invoices track by $index"]//td[contains(text(), "'+V.InvDescription+'")]/following-sibling::td[3]')).getText().then(function (text) {
        V.StatusInv = text;
        console.log(V.StatusInv);
    }), config.timeout);
    driver.wait(driver.findElement(By.xpath('//tr[@ng-repeat="invoice in invoices track by $index"]//td[contains(text(), "'+V.InvDescription+'")]/following-sibling::td[1]')).getText().then(function (text) {
        V.DateInv = text;
        console.log(V.DateInv);
    }), config.timeout);
    SF.click(By.xpath('//button[contains(text(), \"Ok\")]'));
    SF.sleep(4);
    SF.click(By.xpath('//button[contains(text(), \"×\")]'));
    SF.sleep(1);
    SF.click(By.xpath('//i[@class="dashboard_icon icon-refresh"]'));
    SF.sleep(4);

    condition.nowWeDoing = 'проверяем появился ли новый инвойс и правильно ли увеличились сумма и количество';
    driver.wait(driver.findElement(By.xpath('//div[@ng-if="vm.canSeeInvoices"]//span[@class="total text-center"]')).getText().then(function (text) {
        VD.IWant(VD.ToEqual, SF.cleanPrice(text), V.TotalInvoices+1, 'не прибавился новый инвойс')
    }), config.timeout);
    driver.wait(driver.findElement(By.xpath('//div[@class="table_info"]')).getText().then(function(text) {
        VD.IWant(VD.ToEqual, SF.cleanPrice(text.substring(text.indexOf('of'), text.indexOf('entries'))), V.TotalPaidInv+V.TotalUnpaidInv+1, 'не совпало количество инвойсов внизу');
    }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//div/span[@uib-tooltip="Total Unpaid"]')).getText().then(function (text) {
        VD.IWant(VD.ToEqual, SF.cleanPrice(text.substring(0, text.indexOf('('))), V.TotalUnpaidSum+V.InvTotalDue, 'не прибавилась сумма нового инвойса');
    }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//div/span[@uib-tooltip="Total Unpaid"]')).getText().then(function (text) {
        VD.IWant(VD.ToEqual, SF.cleanPrice(text.substring(text.indexOf('('))), V.TotalUnpaidInv+1, 'не прибавился новый инвойс к колличеству неоплаченых');
    }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//td[contains(text(), "'+V.client.name+' '+V.client.fam+'")]')).getText().then(function (text) {
        V.ClientNameFam = text;
        VD.IWant(VD.ToEqual, (V.client.name + ' ' + V.client.fam), V.ClientNameFam, 'не совпали имя/фамилия клиента')
    }), config.timeout);
    SF.sleep(1);
    driver.wait(driver.findElement(By.xpath('//td[contains(text(), "'+V.ClientNameFam+'")]/following-sibling::td[1]')).getText().then(function (text) {
        VD.IWant(VD.ToEqual, text, V.InvDescription, 'не совпал дескрипшн')
    }), config.timeout);
//    driver.wait(driver.findElement(By.xpath('//td[contains(text(), "'+V.ClientNameFam+'")]/following-sibling::td[2]')).getText().then(function (text) {
//        VD.IWant(VD.ToEqual, text, V.DateInv, 'не совпала дата')
//    }), config.timeout);
    driver.wait(driver.findElement(By.xpath('//td[contains(text(), "'+V.ClientNameFam+'")]/following-sibling::td[3]')).getText().then(function (text) {
        VD.IWant(VD.ToEqual, SF.cleanPrice(text), V.InvTotalDue, 'не совпала сумма')
    }), config.timeout);
    driver.wait(driver.findElement(By.xpath('//td[contains(text(), "'+V.ClientNameFam+'")]/following-sibling::td[4]')).getText().then(function (text) {
        VD.IWant(VD.ToEqual, text, V.StatusInv, 'не совпал статус инвойса')
    }), config.timeout);

    condition.nowWeDoing = 'фильтруем по unpaid';
    SF.click(By.xpath('//div[contains(text(), \"All\")]'));
    SF.sleep(1);
    SF.click(By.xpath('//md-option[@id="select_option_17"]//div[contains(text(), \"unpaid\")]'));
    SF.sleep(2);

    condition.nowWeDoing = 'проверяем что Тотал Паид стал 0 сверху и что есть наш инвойс';
    driver.wait(driver.findElement(By.xpath('//div/span[@uib-tooltip="Total Paid"]')).getText().then(function (text) {
        VD.IWant (VD.ToEqual, SF.cleanPrice(text.substring(text.indexOf('('))), 0, 'тотал пейд не стал 0');
    }), config.timeout);
    driver.wait(driver.findElement(By.xpath('//div/span[@uib-tooltip="Total Paid"]')).getText().then(function (text) {
        VD.IWant (VD.ToEqual, SF.cleanPrice(text.substring(0, text.indexOf('('))), 0, 'сумма пейд не стала 0');
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
        VD.IWant(VD.ToEqual, text.substring(0, +17), V.client.name + ' ' + V.client.fam, 'не совпали имя/фамилия клиента')
    }), config.timeout);
    driver.wait(driver.findElement(By.xpath('//b[contains(text(), \"Balance Due (USD)\")]/../span')).getText().then(function (text) {
        VD.IWant(VD.ToEqual, SF.cleanPrice(text), V.InvTotalDue, 'не совпала сумма в Balance Due')
    }), config.timeout);
    driver.wait(driver.findElement(By.xpath('//b[contains(text(), \"Total Balance Due (USD):\")]/../span/b')).getText().then(function (text) {
        VD.IWant(VD.ToEqual, SF.cleanPrice(text), V.InvTotalDue, 'не совпала сумма в Total Balance Due')
    }), config.timeout);
    SF.openTab(0);
    SF.click(By.xpath('//a[contains(text(), "Request #'+V.boardNumbers.Id+'")]'));
    SF.click(By.xpath('//div/label[@ng-click="OpenPaymentModal();"]'));
    SF.sleep(2);
    driver.wait(driver.findElement(By.xpath('//tr[@ng-repeat="invoice in invoices track by $index"]//td[contains(text(), "'+V.InvDescription+'")]/following-sibling::td[3]')).getText().then(function (text) {
        VD.IWant(VD.ToEqual, text, 'viewed', 'статус инвойса не viewed');
    }), config.timeout);
    SF.sleep(1);
    SF.click(By.xpath('//button[contains(text(), \"Ok\")]'));
    SF.sleep(1);
    SF.click(By.xpath('//button[contains(text(), \"×\")]'));
    SF.sleep(1);
    SF.click(By.xpath('//i[@class="dashboard_icon icon-refresh"]'));
    SF.sleep(4);
    driver.wait(driver.findElement(By.xpath('//td[contains(text(), "'+V.ClientNameFam+'")]/following-sibling::td[4]')).getText().then(function (text) {
        VD.IWant(VD.ToEqual, text, 'viewed', 'статус инвойса не viewed')
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
        VD.IWant(VD.ToEqual, SF.cleanPrice(text), 0, 'после оплаты не стал 0 в Balance Due')
    }), config.timeout);
    driver.wait(driver.findElement(By.xpath('//b[contains(text(), \"Total Balance Due (USD):\")]/../span/b')).getText().then(function (text) {
        VD.IWant(VD.ToEqual, SF.cleanPrice(text), 0, 'после оплаты не стал 0 в Total Balance Due')
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
        VD.IWant (VD.ToEqual, SF.cleanPrice(text.substring(text.indexOf('('))), 0, 'тотал анпейд не стал 0');
    }), config.timeout);
    driver.wait(driver.findElement(By.xpath('//div/span[@uib-tooltip="Total Unpaid"]')).getText().then(function (text) {
        VD.IWant (VD.ToEqual, SF.cleanPrice(text.substring(0, text.indexOf('('))), 0, 'сумма анпейд не стала 0');
    }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//div/span[@uib-tooltip="Total Paid"]')).getText().then(function (text) {
        VD.IWant(VD.ToEqual, SF.cleanPrice(text.substring(0, text.indexOf('('))), V.TotalPaidSum+V.InvTotalDue, 'не прибавилась сумма нового инвойса к оплаченым');
    }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//div/span[@uib-tooltip="Total Paid"]')).getText().then(function (text) {
        VD.IWant(VD.ToEqual, SF.cleanPrice(text.substring(text.indexOf('('))), V.TotalPaidInv+1, 'не прибавился новый инвойс к колличеству оплаченых');
    }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//div/span[@uib-tooltip="Total"]')).getText().then(function(text) {
        VD.IWant(VD.ToEqual, SF.cleanPrice(text.substring(text.indexOf('('))), V.TotalPaidInv+1, 'не совпало количество инвойсов сверху в блоке Total');
    }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//div/span[@uib-tooltip="Total"]')).getText().then(function(text) {
        VD.IWant(VD.ToEqual, SF.cleanPrice(text.substring(0, text.indexOf('('))), V.TotalPaidSum+V.InvTotalDue, 'не совпала сумма сверху в блоке');
    }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//div/span[@class="table-total"]')).getText().then(function(text) {
        VD.IWant(VD.ToEqual, SF.cleanPrice(text.substring(text.indexOf('$'))), V.TotalPaidSum+V.InvTotalDue, 'не совпала сумма TOTAL');
    }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//td[contains(text(), "'+V.ClientNameFam+'")]')).getText().then(function (text) {
        VD.IWant(VD.ToEqual, text, V.ClientNameFam, 'после сортировки не совпали имя фамилия клиента')
    }), config.timeout);
    driver.wait(driver.findElement(By.xpath('//td[contains(text(), "'+V.ClientNameFam+'")]/following-sibling::td[4]')).getText().then(function (text) {
        VD.IWant(VD.ToEqual, text, 'paid', 'статус инвойса не paid')
    }), config.timeout);

    condition.nowWeDoing = 'открываем реквест, сравниваем суммы: Payment, и Total в окне инвойсов, + сравниваем что поменялся статус';
    JS.click('td:contains(\\"Open Request #'+V.boardNumbers.Id+'\\")');
    SF.waitForLocated (By.xpath('//div/label[@ng-click="OpenPaymentModal();"]'));
    driver.wait(driver.findElement(By.xpath('//div[@class="col-md-7 col-xs-7 nopadding"]')).getText().then(function (text) {
        VD.IWant(VD.ToEqual, SF.cleanPrice(text), V.InvTotalDue, 'не совпала сумма Payment')
    }), config.timeout);
    SF.click(By.xpath('//div/label[@ng-click="OpenPaymentModal();"]'));
    SF.sleep(2);
    driver.wait(driver.findElement(By.xpath('//tr[@ng-repeat="invoice in invoices track by $index"]//td[contains(text(), "'+V.InvDescription+'")]/following-sibling::td[3]')).getText().then(function (text) {
        VD.IWant(VD.ToEqual, text, 'paid', 'статус инвойса не paid');
    }), config.timeout);
    driver.wait(driver.findElement(By.xpath('//div[@class="col-md-3 pull-right"]')).getText().then(function(text) {
        VD.IWant(VD.ToEqual, SF.cleanPrice(text), V.InvTotalDue, 'не совпала сумма в окне инвойсов');
    }),config.timeout);
    SF.click(By.xpath('//button[contains(text(), \"Ok\")]'));
    SF.sleep(2);
    SF.click(By.xpath('//button[contains(text(), \"×\")]'));

    SF.endOfTest();
};