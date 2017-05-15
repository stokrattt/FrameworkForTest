module.exports = function main(SF, JS, MF, LF, JSstep, VD, V, By, until,FileDetector, system, condition, config,constants) {    global.fiber = Fiber.current;
    V.client = {};
    V.client.name = SF.randomBukva(6) + '_t';
    V.client.fam = SF.randomBukva(6) + '_t';
    V.client.phone = SF.randomCifra(10);
    V.client.email = SF.randomBukvaSmall(6) + '@' + SF.randomBukvaSmall(4) + '.tes';

    SF.get(V.adminURL);

    LF.LoginToBoardAsCustom(V.adminLogin,V.adminPassword);
    condition.nowWeDoing = 'создаем реквест и конфермим его';
    LF.CreateLocalMovingFromBoard(V.client);
    SF.sleep (2);
    V.boardNumbers = {};
    LF.RememberDigitsRequestBoard(V.boardNumbers);
    JS.step(JSstep.selectTruck((V.boardNumbers.LaborTimeMax + V.boardNumbers.TravelTime)/60));
    MF.EditRequest_RememberId(V.request);

    LF.addToCleanerJob(V.request.Id);
    MF.EditRequest_SetToConfirmed ();
    MF.EditRequest_SetAdressToFrom ();
    MF.EditRequest_SaveChanges ();
    MF.EditRequest_OpenSettings();
    MF.EditRequest_SetSaleNumber(2);

    MF.EditRequest_OpenRequest();
    condition.nowWeDoing = 'закрываем работу и переходим в на страницу bill of ladding';

    MF.EditRequest_CloseConfirmWork();
    MF.EditRequest_SetLaborTimeCloseJob();

    MF.EditRequest_CloseJob();
    MF.EditRequest_OpenContractCloseJob();
    SF.openTab (1);
    SF.sleep (3);
    MF.WaitWhileBusy();
    MF.SweetConfirm();
    MF.Contract_OpenBillOfLading();
    MF.Contract_WaitBillOfLading ();
    MF.Contract_CheckLoadBillOfLadding();
    SF.endOfTest();
};
