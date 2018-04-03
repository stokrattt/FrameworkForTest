module.exports = function main(SF, JS, MF, LF, JSstep, VD, V, By, until,FileDetector, system, condition, config,constants){
    global.fiber = Fiber.current;
    V.client = {};
    V.client.name = SF.randomBukva(6) + '_t';
    V.client.fam = SF.randomBukva(6) + '_t';
    V.client.phone = SF.randomCifra(10);
    V.client.email = SF.randomBukvaSmall(6) + '@' + SF.randomBukvaSmall(4) + '.tes';
    V.client.passwd = 123;
    SF.get(V.adminURL);
    LF.LoginToBoardAsAdmin();

condition.nowWeDoing = 'первый раз в админке';
    LF.CreateLocalMovingFromBoard(V.client);
    MF.EditRequest_OpenClient();
    LF.SetClientPasswd(V.client.passwd);
    LF.closeEditRequest ();
    MF.Board_OpenSettingsGeneral ();
    MF.Board_OpenSettingsAccountPageCustomTooltips();
    MF.Board_OpenSideBar();
    driver.wait(driver.findElement(By.xpath('//span[contains(text(), "Job Time = Labor Time + Travel Time")]')).getText().then(function(text){
        V.jobTimeText = text;
    }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//span[contains(text(), "Labor Time start")]')).getText().then(function(text){
        V.laborTimeText = text;
    }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//span[contains(text(), "Travel Time - time added to Labor Time")]')).getText().then(function(text){
        V.travelTimeText = text;
    }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//span[contains(text(), "Fuel Surcharge Tooltip")]')).getText().then(function(text){
        V.fuelSurchargeText = text;
    }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//span[contains(text(), "Myself Packing Tooltip")]')).getText().then(function(text){
        V.myselfPackingText = text;
    }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//span[contains(text(), "Partial Packing Tooltip")]')).getText().then(function(text){
        V.partialPackingText = text;
    }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//span[contains(text(), "Full Packing Tooltip")]')).getText().then(function(text){
        V.fullPackingText = text;
    }),config.timeout);
    MF.Board_LogoutAdmin();

condition.nowWeDoing = 'первый раз в акаунте';
    SF.get(V.accountURL);
    LF.LoginToAccountAsClient (V.client);
    SF.click(By.xpath('//button[@ng-click="vm.viewRequest(request.nid)"]'));
    MF.Account_ClickViewRequest();
    SF.click(By.xpath('//i[@ng-show="vm.tooltipData.jobTime.isDisplay"]'));
    driver.wait(driver.findElement(By.xpath('//div[@class="tips rmtips"]//span[contains(text(), "Job Time = Labor Time + Travel Time")]')).getText().then(function(text){
        VD.IWant(VD.ToEqual, V.jobTimeText, text, 'не совпали Job Time tooltip');
    }),config.timeout);
    SF.click(By.xpath('//i[@ng-show="vm.tooltipData.laborTime.isDisplay"]'));
    driver.wait(driver.findElement(By.xpath('//div[@class="tips rmtips"]//span[contains(text(), "Labor Time start")]')).getText().then(function(text){
        VD.IWant(VD.ToEqual, V.laborTimeText, text, 'не совпали Labor Time tooltip');
    }),config.timeout);
    SF.click(By.xpath('//i[@ng-show="vm.tooltipData.travelTime.isDisplay"]'));
    driver.wait(driver.findElement(By.xpath('//span[contains(text(), "Travel Time - time added to Labor Time")]')).getText().then(function(text){
        VD.IWant(VD.ToEqual, V.travelTimeText, text, 'не совпали Travel Time tooltip');
    }),config.timeout);
    SF.click(By.xpath('//i[@ng-show="vm.tooltipData.fuelSurchrge.isDisplay"]'));
    driver.wait(driver.findElement(By.xpath('//span[contains(text(), "Fuel Surcharge Tooltip")]')).getText().then(function(text){
        VD.IWant(VD.ToEqual, V.fuelSurchargeText, text, 'не совпали Fuel Surcharge Tooltip');
    }),config.timeout);
    SF.click(By.xpath('//i[@ng-show="vm.tooltipData.myselfPacking.isDisplay"]'));
    driver.wait(driver.findElement(By.xpath('//span[contains(text(), "Myself Packing Tooltip")]')).getText().then(function(text){
        VD.IWant(VD.ToEqual, V.myselfPackingText, text, 'не совпали Myself Packing Tooltip');
    }),config.timeout);
    SF.click(By.xpath('//i[@ng-if="vm.tooltipData.fullPacking.isDisplay"]'));
    SF.sleep(8);
    driver.wait(driver.findElement(By.xpath('//span[contains(text(), "Full Packing Tooltip")]')).getText().then(function(text){
        VD.IWant(VD.ToEqual, V.fullPackingText, text, 'не совпали Full Packing tooltip');
    }),config.timeout);
    SF.click(By.xpath('//i[@ng-show="vm.tooltipData.partialPacking.isDisplay"]'));
    SF.sleep(8);
    driver.wait(driver.findElement(By.xpath('//span[contains(text(), "Partial Packing Tooltip")]')).getText().then(function(text){
        VD.IWant(VD.ToEqual, V.partialPackingText, text, 'не совпали Partial Packing tooltip');
    }),config.timeout);
    LF.LogoutFromAccount();
    SF.get(V.adminURL);
    LF.LoginToBoardAsAdmin();
    MF.Board_OpenSettingsCalculator();
    SF.click(By.xpath('//li[@ng-repeat="tab in vm.tabs"][7]'));
    SF.waitForVisible(By.xpath("//span[contains(text(),'Datepicker tooltips')]"));
    SF.click(By.xpath("//span[contains(text(),'Datepicker tooltips')]"));
    SF.sleep(2);
    driver.wait(driver.executeScript("if ($('input[ng-model=\"vm.movecalcFormSettings.rateTooltips.showGiant\"]').hasClass('ng-not-empty')){" +
        "return true;} else {$('input[ng-model=\"vm.movecalcFormSettings.rateTooltips.showGiant\"]~span').click()}"),config.timeout);
    driver.wait(driver.executeScript("if ($('input[ng-model=\"vm.movecalcFormSettings.rateTooltips.showBig\"]').hasClass('ng-not-empty')){" +
        "return true;} else {$('input[ng-model=\"vm.movecalcFormSettings.rateTooltips.showBig\"]~span').click()}"),config.timeout);
    driver.wait(driver.executeScript("if ($('input[ng-model=\"vm.movecalcFormSettings.rateTooltips.showSmall\"]').hasClass('ng-not-empty')){" +
        "return true;} else {$('input[ng-model=\"vm.movecalcFormSettings.rateTooltips.showSmall\"]~span').click()}"),config.timeout);
    driver.wait(driver.findElement(By.xpath('//div//span[contains(text(), "general tooltip")]')).getText().then(function(text){
        V.generalTooltip = text;
    }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//div//span[contains(text(), "discount tooltip")]')).getText().then(function(text){
        V.discountTooltip = text;
    }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//div//span[contains(text(), "regular tooltip")]')).getText().then(function(text){
        V.regularTooltip = text;
    }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//div//span[contains(text(), "subpeak tooltip")]')).getText().then(function(text){
        V.subpeakTooltip = text;
    }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//div//span[contains(text(), "peak tooltips")]')).getText().then(function(text){
        V.peakTooltip = text;
    }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//div//span[contains(text(), "hipeak tooltip")]')).getText().then(function(text){
        V.hipeakTooltip = text;
    }),config.timeout);
    SF.sleep(1);
    MF.Board_LogoutAdmin();
    SF.get(V.frontURL);
    JS.waitForExist('input[ng-change=\\"serviceneed = true\\"]:visible');
    SF.sleep(2);
    MF.FrontSiteSmallCalc_ClickCalendar();
    driver.wait(driver.executeScript(function(){
        return $('.calendarTypeTitle .datepickerGiantTooltip :eq(0)').text();
    }.toString().substr(11)).then(tooltipText => {
        V.tempText = tooltipText;
        VD.IWant(VD.ToEqual, V.generalTooltip , V.tempText, 'не совпали general tooltip');
    }),config.timeout);
    driver.wait(driver.executeScript(function(){
        return $('.calendarType0 .datepickerTooltip :eq(0)').text();
    }.toString().substr(11)).then(tooltipText => {
        V.discountTooltip2 = tooltipText;
        VD.IWant(VD.ToEqual, V.discountTooltip , V.discountTooltip2, 'не совпали discount tooltip');
    }),config.timeout);
    driver.wait(driver.executeScript(function(){
        return $('.calendarType1 .datepickerTooltip :eq(0)').text();
    }.toString().substr(11)).then(tooltipText => {
        V.regularTooltip2 = tooltipText;
        VD.IWant(VD.ToEqual, V.regularTooltip , V.regularTooltip2, 'не совпали Regular tooltip');
    }),config.timeout);
    driver.wait(driver.executeScript(function(){
        return $('.calendarType2 .datepickerTooltip :eq(0)').text();
    }.toString().substr(11)).then(tooltipText => {
        V.subpeakTooltip2 = tooltipText;
        VD.IWant(VD.ToEqual, V.subpeakTooltip , V.subpeakTooltip2, 'не совпали SubPeak tooltip');
    }),config.timeout);
    driver.wait(driver.executeScript(function(){
        return $('.calendarType3 .datepickerTooltip :eq(0)').text();
    }.toString().substr(11)).then(tooltipText => {
        V.peakTooltip2 = tooltipText;
        VD.IWant(VD.ToEqual, V.peakTooltip , V.peakTooltip2, 'не совпали Peak tooltip');
    }),config.timeout);
    driver.wait(driver.executeScript(function(){
        return $('.calendarType4 .datepickerTooltip :eq(0)').text();
    }.toString().substr(11)).then(tooltipText => {
        V.hipeakTooltip2 = tooltipText;
        VD.IWant(VD.ToEqual, V.hipeakTooltip , V.hipeakTooltip2, 'не совпали HiPeak tooltip');
    }),config.timeout);
    SF.sleep(1);

    SF.endOfTest();
};
