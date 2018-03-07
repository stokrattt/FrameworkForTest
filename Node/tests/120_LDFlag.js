module.exports = function main(SF, JS, MF, LF, JSstep, VD, V, By, until,FileDetector, system, condition, config,constants) {
    global.fiber = Fiber.current;
    V.client = {};
    V.client.name = SF.randomBukva(6) + '_t';
    V.client.fam = SF.randomBukva(6) + '_t';
    V.client.phone = SF.randomCifra(10);
    V.client.email = SF.randomBukvaSmall(6) + '@' + SF.randomBukvaSmall(4) + '.tes';
    V.client.passwd = 123;


    SF.get(V.adminURL);
    LF.LoginToBoardAsCustom(V.adminLogin,V.adminPassword);

condition.nowWeDoing = 'Идем в настройки  ЛД и создаем флаг';
    MF.Board_OpenSettingsGeneral ();
    MF.Board_OpenSettingsLongDistance ();
    MF.BoardOpenSettingsLongDistanceStatus();
    LF.LongDistanceSettings_AddLDStatusFlag('Flag');

condition.nowWeDoing = 'Создаем реквест, и проверяем есть ли в нем флаг';
    MF.Board_CreateDraftRequest();
    SF.click(By.xpath('//select[@id="edit-service"]/option[@value="7"]'));
    SF.click(By.xpath('//select[@ng-model="request.ld_status"]/option[contains(text(),"Flag")]'));
    LF.closeEditRequest();
    SF.click(By.xpath('//button[@ng-click="quit()"]'));

condition.nowWeDoing = 'Проверяем есть ли в SIT флаг в Пикап и в Деливери';
    MF.Board_OpenSideBar();
    SF.sleep(1);
    MF.Board_ClickLongDistanceDispach();
    MF.Board_OpenPickup();
    MF.Board_OpenSideBar();
    SF.click(By.xpath('//md-select[@ng-model="selectedStatus"]'));
    SF.sleep(1);
    SF.click(By.xpath('//md-option[@ng-repeat="item in ldStatuses"]/div[text()="Flag"]'));
    MF.Board_OpenSideBar();
    MF.Board_ClickLongDistanceDispach();
    SF.sleep(1);
    SF.click(By.xpath('//a[@ui-sref="lddispatch.pick_up"]'));
    SF.sleep(2);
    SF.click(By.xpath('//a[@ui-sref="lddispatch.ld_delivery"]'));
    SF.sleep(2);
    SF.click(By.xpath('//md-select[@ng-model="selectedStatus"]'));
    SF.sleep(1);
    SF.click(By.xpath('//md-option[@ng-repeat="item in ldStatuses"]/div[text()="Flag"]'));
    SF.sleep(2);

condition.nowWeDoing = 'Идем в настройки  ЛД и удаляем флаг';
    MF.Board_OpenSideBar();
    MF.Board_OpenSettingsGeneral ();
    MF.Board_OpenSettingsLongDistance ();
    SF.click(By.xpath('//input[@ng-model="search"]'));
    MF.BoardOpenSettingsLongDistanceStatus();
    SF.click(By.xpath('//tr[@ng-repeat="values in longdistance.ldStatus track by $index"]/../tr[last()]/td/div[@ng-click="removeFlag($index,values)"]'));
    SF.sleep(1);


    SF.endOfTest();
};