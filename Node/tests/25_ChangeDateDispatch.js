module.exports = function main(SF, JS, MF, LF, JSstep, VD, V, By, until,FileDetector, system, condition, config,constants) {    global.fiber = Fiber.current;
    V.client = {};
    V.client.name = SF.randomBukva(6) + '_t';
    V.client.fam = SF.randomBukva(6) + '_t';
    V.client.phone = SF.randomCifra(10);
    V.client.email = SF.randomBukvaSmall(6) + '@' + SF.randomBukvaSmall(4) + '.tes';

    //=========================начинаем писать тест=============================

    SF.get(V.adminURL);
    LF.LoginToBoardAsCustom(V.adminLogin,V.adminPassword);
    MF.WaitWhileBusy ();
condition.nowWeDoing = 'создаем реквест ';
    LF.CreateLocalMovingFromBoard (V.client);
    SF.sleep (2);
    MF.EditRequest_RememberId (V.request);
    LF.addToCleanerJob(V.request.Id);
    MF.EditRequest_SetToConfirmed ();
    MF.EditRequest_SetAdressToFrom ();
    V.boardNumbers = {};
    LF.RememberDigitsRequestBoard(V.boardNumbers);
    JS.step(JSstep.selectTruck((V.boardNumbers.LaborTimeMax + V.boardNumbers.TravelTime)/60));
    LF.RememberDateFromRequest(V.boardNumbers);
    MF.EditRequest_SaveChanges ();
    MF.EditRequest_CloseConfirmWork();
    LF.closeEditRequest();
condition.nowWeDoing = 'идем в локал диспач и меняем дату';
    MF.Board_OpenLocalDispatch();
    LF.findDayInLocalDispatch(V.boardNumbers.moveDate.Year,V.boardNumbers.moveDate.Month,V.boardNumbers.moveDate.Day);
    MF.WaitWhileBusy ();
    SF.sleep(1);
    MF.WaitWhileBusy ();
    MF.Dispatch_GridView();
    LF.OpenRequestDispatch (V.request.Id);
    MF.EditRequest_WaitForBalanceVisible();
    MF.EditRequest_OpenConfirmWork();

    SF.clear (By.xpath('//input[@ng-model="moveDateInput"]'));
    SF.click (By.xpath('//input[@ng-model="moveDateInput"]'));
    let now = new Date();
    let msInDay = 86400000;
    let future = new Date(now.getTime() + msInDay * 8);
    let options = { day: 'numeric', month: 'long', year: 'numeric' };
    V.dateDispach = (future.toLocaleDateString('en-US', options));
    SF.send (By.xpath('//input[@ng-model="moveDateInput"]'), V.dateDispach);
    driver.actions().sendKeys(Key.ENTER).perform();
    SF.click (By.xpath('//button[contains(@class, "ui-datepicker-close")]'));
    SF.sleep (6);
    LF.RememberDateFromRequest(V.boardNumbers);
    SF.sleep(4);
    MF.EditRequest_WaitForBalanceVisible();
    JS.step(JSstep.selectTruck((V.boardNumbers.LaborTimeMax + V.boardNumbers.TravelTime)/60));
    MF.SweetConfirm ();
    MF.EditRequest_SaveChanges ();
    MF.EditRequest_CloseConfirmWork();
    LF.closeEditRequest();
condition.nowWeDoing = 'ищем второй раз в диспатче реквест с другой датой и проверяем поменялась ли она, если не открылся реквест значит его там нету и дата не поменялась';
    SF.waitForLocated(By.xpath('//a[@class="ui-datepicker-next ui-corner-all"]'));
    LF.findDayInLocalDispatch(V.boardNumbers.moveDate.Year,V.boardNumbers.moveDate.Month,V.boardNumbers.moveDate.Day);
    MF.WaitWhileBusy ();
    SF.sleep(1);
    MF.WaitWhileBusy ();
    LF.OpenRequestDispatch (V.request.Id);
    MF.EditRequest_WaitForBalanceVisible();
    LF.closeEditRequest();
    LF.LogoutFromBoardAdmin ();

    //=========================закончили писать тест=============================
    SF.endOfTest();
};
