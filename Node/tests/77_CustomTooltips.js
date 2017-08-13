
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
    SF.click(By.xpath('//a[@ng-click="select(tabs[4])"]'));
    SF.waitForVisible(By.xpath('//button[@ng-click="delete(client)"]'));
    SF.send(By.xpath('//input[@ng-model="client.password"]'), V.client.passwd);
    SF.click(By.xpath('//button[@ng-click="update(client)"]'));
    SF.waitForVisible(By.xpath('//div[contains(text(),"Client info was updated")]'));
    LF.closeEditRequest ();
    MF.Board_OpenSideBar();
    SF.click(By.xpath('//a[@ng-click="vm.goToPage(\'settings.general\', \'\')"]'));
    MF.Board_OpenSettingsAccountPageCustomTooltips();
    MF.Board_OpenSideBar();
    driver.wait(driver.findElement(By.xpath('//div[contains(text(), "Job Time")]')).getText().then(function(text){
        V.jobTimeText = text;
    }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//div[contains(text(), "Labor Time start ")]')).getText().then(function(text){
        V.laborTimeText = text;
    }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//div[contains(text(), "Travel Time - time added to Labor Time")]')).getText().then(function(text){
        V.travelTimeText = text;
    }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//p[contains(text(), "Fuel Surcharge tooltip")]')).getText().then(function(text){
        V.fuelSurchargeText = text;
    }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//span[contains(text(), "Myself Packing tooltip")]')).getText().then(function(text){
        V.myselfPackingText = text;
    }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//h5[contains(text(), "Partial Packing tooltip")]')).getText().then(function(text){
        V.partialPackingText = text;
    }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//p[contains(text(), "Full Packing tooltip")]')).getText().then(function(text){
        V.fullPackingText = text;
    }),config.timeout);
    MF.Board_LogoutAdmin();

    condition.nowWeDoing = 'первый раз в акаунте';
    SF.get(V.accountURL);
    LF.LoginToAccountAsClient (V.client);
    SF.click(By.xpath('//button[@ng-click="vm.viewRequest(request.nid)"]'));
    SF.sleep(1);
    SF.click(By.xpath('//button[@ng-click="cancel()"]'));
    SF.sleep(2);

    SF.click(By.xpath('//i[@ng-show="vm.tooltipData.jobTime.isDisplay"]'));
    driver.wait(driver.findElement(By.xpath('//div[contains(text(), "Job Time = Labor Time + Travel Time")]')).getText().then(function(text){
        VD.IWant(VD.ToEqual, V.jobTimeText, text, 'не совпали Job Time tooltip');
    }),config.timeout);
    SF.click(By.xpath('//i[@ng-show="vm.tooltipData.laborTime.isDisplay"]'));
    driver.wait(driver.findElement(By.xpath('//div[contains(text(), "Labor Time start")]')).getText().then(function(text){
        VD.IWant(VD.ToEqual, V.laborTimeText, text, 'не совпали Labor Time tooltip');
    }),config.timeout);
    SF.click(By.xpath('//i[@ng-show="vm.tooltipData.travelTime.isDisplay"]'));
    driver.wait(driver.findElement(By.xpath('//div[contains(text(), "Travel Time - time added to Labor Time")]')).getText().then(function(text){
        VD.IWant(VD.ToEqual, V.travelTimeText, text, 'не совпали Travel Time tooltip');
    }),config.timeout);
    SF.click(By.xpath('//i[@ng-show="vm.tooltipData.fuelSurchrge.isDisplay"]'));
    driver.wait(driver.findElement(By.xpath('//p[contains(text(), "Fuel Surcharge tooltip")]')).getText().then(function(text){
        VD.IWant(VD.ToEqual, V.fuelSurchargeText, text, 'не совпали Fuel Surcharge tooltip');
    }),config.timeout);
    SF.click(By.xpath('//i[@ng-show="vm.tooltipData.myselfPacking.isDisplay"]'));
    driver.wait(driver.findElement(By.xpath('//span[contains(text(), "Myself Packing tooltip")]')).getText().then(function(text){
        VD.IWant(VD.ToEqual, V.myselfPackingText, text, 'не совпали Myself Packing tooltip');
    }),config.timeout);
    SF.click(By.xpath('//i[@ng-show="vm.tooltipData.partialPacking.isDisplay"]'));
    driver.wait(driver.findElement(By.xpath('//h5[contains(text(), "Partial Packing tooltip")]')).getText().then(function(text){
        VD.IWant(VD.ToEqual, V.partialPackingText, text, 'не совпали Partial Packing tooltip');
    }),config.timeout);
    // SF.click(By.xpath('//i[@ng-show="vm.tooltipData.fuelSurchrge.isDisplay"]'));
    // SF.sleep(1);
    SF.click(By.xpath('//i[@ng-if="vm.tooltipData.fullPacking.isDisplay"]'));
    driver.wait(driver.findElement(By.xpath('//p[contains(text(), "Full Packing tooltip")]')).getText().then(function(text){
        VD.IWant(VD.ToEqual, V.fullPackingText, text, 'не совпали Full Packing tooltip');
    }),config.timeout);


    SF.endOfTest();
};
