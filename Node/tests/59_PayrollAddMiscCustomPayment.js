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

condition.nowWeDoing = 'идем в пейрол вводи дату в промежутке 20 дней и нажимаем update payroll cache';
    MF.Board_OpenPayroll ();
    LF.Payroll_SelectPeriod20Days();

condition.nowWeDoing = 'заходим у форемана и счтаем сначала сумму в таблице и сравниваем с итого, перед этим удаляем все пейчеки если есть и миск пайменты';
    LF.findTestForemanInPayroll(V.foremanName);
    LF.Payroll_DeleteAllPaycheckPaycashCycle ();
    SF.sleep(2);
    LF.Payroll_DeleteAllMiscPaymentCycle ();
    JS.scroll('div.total-payroll-panel div.total-title:contains(\"Paid\")');
    MF.Payroll_RefreshTable ();
    driver.wait(driver.executeScript(JSstep.payrollTableSum).then(function (summa) {
        VD.IWant(VD.ToEqual, summa.sum, summa.balTop, 'Не совпали сумма посчитанная в таблице с балансом сверху внутри чувачка');
    }),config.timeout);
    driver.wait(driver.executeScript("return $('.mdDataTable-header-alternate td:last-child').text()").then(function (balanceDown) {
        V.balanceDown = SF.cleanPrice(balanceDown);
    }), config.timeout);
    SF.sleep(1);

condition.nowWeDoing = 'выделяем все работы и делаем оплату кэшем. После этого сравниваем что баланс =0 и что в пейд стал таким на сколько оплатили';
    MF.Payroll_SelectAllJobsCheckbox();
    MF.Payroll_ClickApplyPayment();
    MF.PayrollPayCheck_ClickSavePayment ();
    MF.Payroll_RefreshTable ();

    V.payrollNumbersInsidePaidCash = {};
    LF.RememberPayrollNumbers_InsideWorker (V.payrollNumbersInsidePaidCash);
    VD.IWant (VD.ToEqual, V.balanceDown, V.payrollNumbersInsidePaidCash.paid, 'Сумма которую должны были оплатить за все работы не совпала с тем что оплатили, неверные данные в строке Paid после оплаты Cash');
    VD.IWant (VD.ToEqual, V.payrollNumbersInsidePaidCash.balanceTop, 0, 'Баланс свверху у чувачка после оплаты кешем не ноль, а должен быть 0   после оплаты Cash');
condition.nowWeDoing = 'возвращаемся на шаг назад и проверяем что сумма которую оплатили кэшем отображается в пейд напротив имени форемана и что тотал равен 0';
    MF.Payroll_ClickStepBackToNameWorker ();
    V.payrollNumbersOutsideAfterPaidCash = {};
    LF.RememberPayrollNumbers_OutsideNameWorker (V.foremanName, V.payrollNumbersOutsideAfterPaidCash);
    VD.IWant (VD.ToEqual, V.payrollNumbersOutsideAfterPaidCash.paid, V.payrollNumbersInsidePaidCash.paid, 'Сумма которую оплатили внутри чувачка за все работы не совпала с тем что мы видим снаружи напротив имени чувака в строке Paid после оплаты Cash');
    VD.IWant (VD.ToEqual, V.payrollNumbersOutsideAfterPaidCash.total, 0, 'Тотал у форемана снаружи напротив имени чувака в строке Total не равен 0, а должен  после оплаты Cash');

condition.nowWeDoing = 'тут снова заходим в чувака второй раз и удаляем пей кэшем который делали и делаем пей через Check и снова все проверяем';
    MF.Payroll_GoToWorkerJobs (V.foremanName);
    MF.WaitWhileBusy ();
    MF.Payroll_OpenPayCheckCash ();
    MF.PayrollPayCheck_ClickDeleteAndConfirm ();
    MF.Payroll_RefreshTable ();
    MF.Payroll_SelectAllJobsCheckbox();
    MF.Payroll_ClickApplyPayment();
    MF.PayrollPayCheck_SelectCheckPayment();
    MF.PayrollPayCheck_ClickSavePayment ();
    MF.Payroll_RefreshTable ();

    V.payrollNumbersInsidePaidCheck = {};
    LF.RememberPayrollNumbers_InsideWorker (V.payrollNumbersInsidePaidCheck);
    VD.IWant (VD.ToEqual, V.balanceDown, V.payrollNumbersInsidePaidCheck.paid, 'Сумма которую должны были оплатить за все работы не совпала с тем что оплатили, неверные данные в строке Paid после оплаты Check');
    VD.IWant (VD.ToEqual, V.payrollNumbersInsidePaidCheck.balanceTop, 0, 'Баланс свверху у чувачка после оплаты кешем не ноль, а должен быть 0  после оплаты Check');

condition.nowWeDoing = 'возвращаемся на шаг назад (второй раз) и проверяем что сумма которую оплатили чеком отображается в пейд напротив имени форемана и что тотал равен 0';
    MF.Payroll_ClickStepBackToNameWorker ();
    V.payrollNumbersOutsideAfterPaidCheck = {};
    LF.RememberPayrollNumbers_OutsideNameWorker (V.foremanName, V.payrollNumbersOutsideAfterPaidCheck);
    VD.IWant (VD.ToEqual, V.payrollNumbersOutsideAfterPaidCheck.paid, V.payrollNumbersInsidePaidCheck.paid, 'Сумма которую оплатили внутри чувачка за все работы не совпала с тем что мы видим снаружи напротив имени чувака в строке Paid после оплаты Check');
    VD.IWant (VD.ToEqual, V.payrollNumbersOutsideAfterPaidCheck.total, 0, 'Тотал у форемана снаружи напротив имени чувака в строке Total не равен 0, а должен  после оплаты Check');

condition.nowWeDoing = 'тут снова заходим в чувака третий раз и удаляем пей чеком который делали и добавляем миск пайменты и снова все проверяем';
    MF.Payroll_GoToWorkerJobs (V.foremanName);
    MF.Payroll_OpenPayCheckCash ();
    MF.PayrollPayCheck_ClickDeleteAndConfirm ();
    MF.Payroll_RefreshTable ();

condition.nowWeDoing = 'добавляем миск пайменты  To Paid';
    V.payrollNumbersInsideAfterDeletePayCheck = {};
    LF.RememberPayrollNumbers_InsideWorker (V.payrollNumbersInsideAfterDeletePayCheck);
    VD.IWant (VD.ToEqual, V.payrollNumbersInsideAfterDeletePayCheck.paid, 0, 'Должно быть 0 так как мы все пайменты удалили');
    MF.Payroll_ClickAddMiscPayment();
    MF.PayrollMiscPayment_ClickAmount();
    MF.PayrollMiscPayment_SendAmountSumm (200);
    MF.PayrollMiscPayment_ClickSave();
    MF.Payroll_RefreshTable ();
    V.balanceAfterToPaid = V.payrollNumbersInsideAfterDeletePayCheck.balanceDown + 200;

    V.payrollNumbersInsideAfterToPaid = {};
    LF.RememberPayrollNumbers_InsideWorker (V.payrollNumbersInsideAfterToPaid);
    VD.IWant (VD.ToEqual, V.payrollNumbersInsideAfterToPaid.balanceDown, V.balanceAfterToPaid, 'сумма не увеличилась на 200 to paid или стала намного больше');
    VD.IWant (VD.ToEqual, V.payrollNumbersInsideAfterToPaid.paid, 0, 'после оплаты to paid, стало не ноль, а должно быть ноль');

// тут мы вышли на шаг назад

    MF.Payroll_ClickStepBackToNameWorker ();
    V.payrollNumbersOutsideAfterToPaid = {};
    LF.RememberPayrollNumbers_OutsideNameWorker (V.foremanName, V.payrollNumbersOutsideAfterToPaid);
    VD.IWant (VD.ToEqual, V.payrollNumbersOutsideAfterToPaid.total, V.balanceAfterToPaid, 'Тотал у форемана снаружи напротив имени чувака не совпал с тоталом внутри после оплаты To Paid');
    VD.IWant (VD.ToEqual, V.payrollNumbersOutsideAfterToPaid.paid, 0, 'To paid которую оплатили внутри чувачка снаружи увеличилась, а должно быть ноль');

condition.nowWeDoing = 'добавляем миск паймент Deduct и проверяем что он сработал ';
    MF.Payroll_GoToWorkerJobs (V.foremanName);
    MF.Payroll_ClickAddMiscPayment();
    MF.PayrollMiscPayment_ClickAmountDeduct ();
    MF.PayrollMiscPayment_SendAmountSumm (200);
    MF.PayrollMiscPayment_ClickSave();
    MF.Payroll_RefreshTable ();

    V.payrollNumbersInsideAfterToPaidAndDeduct = {};
    LF.RememberPayrollNumbers_InsideWorker (V.payrollNumbersInsideAfterToPaidAndDeduct);
    VD.IWant (VD.ToEqual, V.payrollNumbersInsideAfterToPaidAndDeduct.balanceDown, V.payrollNumbersInsideAfterDeletePayCheck.balanceDown, 'сумма изменилась, а должна быть такой какой была до добавления To paid и Deduct');
    VD.IWant (VD.ToEqual, V.payrollNumbersInsideAfterToPaidAndDeduct.paid, 0, 'после оплаты to paid и Deduct стало не ноль, а должно быть ноль');

    MF.Payroll_ClickStepBackToNameWorker ();
    V.payrollNumbersOutsideAfterToPaidAndToDeduct = {};
    LF.RememberPayrollNumbers_OutsideNameWorker (V.foremanName, V.payrollNumbersOutsideAfterToPaidAndToDeduct);
    VD.IWant (VD.ToEqual, V.payrollNumbersOutsideAfterToPaidAndToDeduct.total, V.payrollNumbersInsideAfterDeletePayCheck.balanceDown, 'Тотал у форемана снаружи напротив имени чувака не совпал с тоталом внутри после оплаты To Paid и оплаты Deduct');
    VD.IWant (VD.ToEqual, V.payrollNumbersOutsideAfterToPaidAndToDeduct.paid, 0, 'To paid и Deduct которую оплатили внутри чувачка снаружи поменялась, а должно быть ноль');

condition.nowWeDoing = 'идем удалять миск пайменты, и еще раз перепроверим сумму в столбце с итого';
    MF.Payroll_GoToWorkerJobs (V.foremanName);
    LF.Payroll_DeleteAllMiscPaymentCycle ();
    SF.sleep(2);
    driver.wait(driver.executeScript(JSstep.payrollTableSum).then(function (summa) {
        VD.IWant(VD.ToEqual, summa.sum, summa.balTop, 'Не совпали сумма посчитанная в таблице и с балансом сверху внутри чувачка после проведения всех платежей и их удаления');
    }),config.timeout);
    MF.WaitWhileToaster ();

condition.nowWeDoing = 'возващаемся на шаг наз, проверяем что после удаления всех миск пайментов, напротив имени чувачка тотал такой какой был вначале и paid = 0';
    MF.Payroll_ClickStepBackToNameWorker ();
    V.payrollNumbersOutsideAfterDeleteAllPayment = {};
    LF.RememberPayrollNumbers_OutsideNameWorker (V.foremanName, V.payrollNumbersOutsideAfterDeleteAllPayment);
    VD.IWant (VD.ToEqual, V.payrollNumbersOutsideAfterDeleteAllPayment.total, V.balanceDown, 'Тотал у форемана снаружи напротив имени чувака изменился с тем который был вначале до добавления и после удаления всех пайментов');
    VD.IWant (VD.ToEqual, V.payrollNumbersOutsideAfterDeleteAllPayment.paid, 0, 'пейд снаружи у чувачка не ноль, а должен быть нулем');
    SF.sleep(0,5);

    //=========================закончили писать тест=============================
    SF.endOfTest();
};
