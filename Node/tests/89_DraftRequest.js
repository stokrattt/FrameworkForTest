// import {Key} from "selenium-webdriver/lib/input";
module.exports = function main(SF, JS, MF, LF, JSstep, VD, V, By, until, FileDetector, system, condition, config, constants) {
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
    MF.Board_CreateDraftRequest();
    MF.EditRequest_OpenClient();
    SF.clear(By.xpath('//input[@ng-model="client.field_user_first_name"]'));
    SF.send(By.xpath('//input[@ng-model="client.field_user_first_name"]'), V.client.name);
    SF.clear(By.xpath('//input[@ng-model="client.field_user_last_name"]'));
    SF.send(By.xpath('//input[@ng-model="client.field_user_last_name"]'), V.client.fam);
    SF.clear(By.xpath('//input[@ng-model="client.field_primary_phone"]'));
    SF.send(By.xpath('//input[@ng-model="client.field_primary_phone"]'), V.client.phone);
    SF.clear(By.xpath('//input[@ng-model="client.mail"]'));
    SF.send(By.xpath('//input[@ng-model="client.mail"]'), V.client.email);
    LF.SetClientPasswd(V.client.passwd);
    MF.EditRequest_OpenRequest();
    LF.addInventoryBoard();
    MF.EditRequest_AddPacking ();
    MF.EditRequest_AddAdditionalServicesFullPack ();
    SF.click(By.xpath('//input[@ng-model="request.field_moving_to.postal_code"]'));
    driver.findElement(By.xpath('//input[@ng-model="request.field_moving_to.postal_code"]')).sendKeys(Key.chord((Key.CONTROL + 'a')));
    SF.send(By.xpath('//input[@ng-model="request.field_moving_to.postal_code"]'), "01247");
    MF.EditRequest_SetAdressToFrom ();
    SF.sleep(15);
    V.boardNumbers = {};
    LF.RememberDigitsRequestBoard (V.boardNumbers);
    JS.step(JSstep.selectTruck((V.boardNumbers.LaborTimeMax + V.boardNumbers.TravelTime)/60));
    MF.WaitWhileBusy();
    MF.EditRequest_SetToNotConfirmed ();
    MF.EditRequest_SaveChanges ();
    MF.EditRequest_CloseEditRequest();
    MF.Board_LogoutAdmin();
    SF.get(V.accountURL);
    LF.LoginToAccountAsClient (V.client);
    MF.Account_CheckRequestStatus_NotConfirmed(V.boardNumbers.Id);
    MF.Account_OpenRequest(V.boardNumbers.Id);
    MF.Account_ClickViewRequest();
    V.accountNumbers={};
    LF.RememberAccountNumbers(V.accountNumbers);
    LF.Validation_Compare_Account_Admin(V.accountNumbers, V.boardNumbers);
    LF.ConfirmRequestInAccount_WithReservation();
    MF.Account_WaitForGreenTextAfterConfirm();

    //=========================закончили писать тест=============================
    SF.endOfTest();
};
