module.exports = function main(SF, JS, JSstep, VD, V, By, until,FileDetector, system, condition, LF,config,constants){
    global.fiber = Fiber.current;

    //=========================начинаем писать тест=============================
    V.client = {};
    V.client.name = SF.randomBukva(6) + '_t';
    V.client.fam = SF.randomBukva(6) + '_t';
    V.client.phone = SF.randomCifra(10);
    V.client.email = SF.randomBukvaSmall(6) + '@' + SF.randomBukvaSmall(4) + '.tes';
    V.client.passwd = 123;
    SF.get(V.adminURL);
    LF.LoginToBoardAsAdmin();
    LF.CreateLocalMovingFromBoard();
    V.boardNumbers={};
    LF.RememberDigitsRequestBoard_Up(V.boardNumbers);
    LF.addToCleanerJob(V.boardNumbers.Id);
    SF.click(By.xpath('//input[@ng-model="request.maximum_time.value"]'));
    SF.click(By.xpath('//li[@class="ui-timepicker-selected"]/following-sibling::li[2]'));
    SF.waitForVisible(By.xpath('//h2[contains(text(),"Are you sure you want set time manualy?")]'));
    SF.click(By.xpath('//button[contains(text(),"Yes, lel\'s do it!")]'));
    //=========================закончили писать тест=============================
    SF.endOfTest();
};
