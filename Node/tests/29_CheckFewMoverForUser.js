module.exports = function main(SF, JS, JSstep, VD, V, By, until,FileDetector, system, condition, LF,config,constants){
    global.fiber = Fiber.current;
    V.client = {};
    V.client.name = SF.randomBukva(6) + '_t';
    V.client.fam = SF.randomBukva(6) + '_t';
    V.client.phone = SF.randomCifra(10);
    V.client.email = SF.randomBukvaSmall(6) + '@' + SF.randomBukvaSmall(4) + '.tes';

    //=========================начинаем писать тест=============================
    SF.get('http://stage.themoveboard.com/moveBoard/#/login');
    LF.LoginToBoardAsAdmin();
    LF.CreateMovAndStorFromBoard(V.client);
    driver.wait(driver.findElement(By.xpath('//a[@ng-click="select(tabs[0])"]')).getText().then(function(text){
        V.request.Id1 = SF.cleanPrice(text);
        LF.addToCleanerJob(V.request.Id1);
    }), config.timeout);
    LF.closeEditRequest ();
    LF.CreateLoadingHelpFromBoard(V.client);
    driver.wait(driver.findElement(By.xpath('//a[@ng-click="select(tabs[0])"]')).getText().then(function(text){
        V.request.Id2 = SF.cleanPrice(text);
        LF.addToCleanerJob(V.request.Id2);
    }), config.timeout);
    LF.closeEditRequest ();
    LF.CreateLocalMovingFromBoard(V.client);
    driver.wait(driver.findElement(By.xpath('//a[@ng-click="select(tabs[0])"]')).getText().then(function(text){
        V.request.Id2 = SF.cleanPrice(text);
        LF.addToCleanerJob(V.request.Id2);
    }), config.timeout);
    SF.click (By.xpath('//a[@ng-click="select(tabs[4])"]'));
    SF.sleep (3);
    driver.wait(driver.executeScript('return $("div:contains(\\"All Moves\\") tbody.ng-scope tr").length').then(function (length) {
        VD.IWant (VD.VToEqual, length, '3', 'на вкладке клиент нету всех работ данного юзера');
        console.log (length);
    }),config.timeout);
    LF.LogoutFromBoardAdmin ();

    //=========================закончили писать тест=============================
    SF.endOfTest();
};
