module.exports = function main(SF, JS, MF, LF, JSstep, VD, V, By, until,FileDetector, system, condition, config,constants) {    global.fiber = Fiber.current;
    V.client={};
    V.client.name = SF.randomBukva(6)+'_t';
    V.client.fam = SF.randomBukva(6)+'_t';
    V.client.phone = SF.randomCifra(10);
    V.client.email = SF.randomBukvaSmall(6)+'@'+SF.randomBukvaSmall(4)+'.tes';
    V.boardNumbers={};

    condition.nowWeDoing='создаём реквест';
    SF.get(V.adminURL);
    LF.LoginToBoardAsCustom(V.adminLogin,V.adminPassword);
    LF.CreateLocalMovingFromBoard(V.client);

    condition.nowWeDoing='получаем id, редактируем немного и сохраняем';

    LF.RememberDigitsRequestBoard(V.boardNumbers);
    LF.addToCleanerJob(V.boardNumbers.Id);
    JS.step(JSstep.selectTruck((V.boardNumbers.LaborTimeMax + V.boardNumbers.TravelTime)/60));
    MF.EditRequest_SetToNotConfirmed();
    MF.EditRequest_SaveChanges();
    LF.closeEditRequest();

    condition.nowWeDoing='ищем его в not Confirmed, открываем и пытаемся сохранить ничего не изменяя';
    MF.Board_OpenNotConfirmed();
    LF.OpenRequest(V.boardNumbers.Id);
    JS.click('button[ng-click=\\"UpdateRequest()\\"]');
    condition.nowWeDoing='сейчас должно появиться Nothing to Update!';
    JS.waitForExist("h2:contains(\"Nothing to Update!\")");
    MF.SweetConfirm();
    SF.endOfTest();
};