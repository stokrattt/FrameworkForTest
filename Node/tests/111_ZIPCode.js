module.exports = function main(SF, JS, MF, LF, JSstep, VD, V, By, until,FileDetector, system, condition, config,constants) {    global.fiber = Fiber.current;
    V.client = {};
    V.client.name = SF.randomBukva(6) + '_t';
    V.client.fam = SF.randomBukva(6) + '_t';
    V.client.phone = SF.randomCifra(10);
    V.client.email = SF.randomBukvaSmall(6) + '@' + SF.randomBukvaSmall(4) + '.tes';


    condition.nowWeDoing = 'идем на фронт и с нижней формы вводим валидные зипы, если что-то  будет не так,то выскачет алерт';

    SF.get(V.frontURL);

    MF.FrontSite_ClickQuoteCalculator();
    MF.FrontSiteDown_SendZipCode('01260', '06461');
    SF.sleep(2);
    SF.clear (By.id('edit-zip-code-from'));
    SF.clear (By.id('edit-zip-code-to'));
    MF.FrontSiteDown_SendZipCode('02536', '84008');
    SF.sleep(2);
    SF.clear (By.id('edit-zip-code-from'));
    SF.clear (By.id('edit-zip-code-to'));
    MF.FrontSiteDown_SendZipCode('02381', '75007');
    SF.sleep(2);
    SF.clear (By.id('edit-zip-code-from'));
    SF.clear (By.id('edit-zip-code-to'));
    MF.FrontSiteDown_SendZipCode('02382', '75755');
    SF.sleep(2);
    SF.clear (By.id('edit-zip-code-from'));
    SF.clear (By.id('edit-zip-code-to'));
    MF.FrontSiteDown_SendZipCode('01367', '86338');
    SF.sleep(2);
    SF.clear (By.id('edit-zip-code-from'));
    SF.clear (By.id('edit-zip-code-to'));
    MF.FrontSiteDown_SendZipCode('01462', '58227');
    SF.sleep(2);
    SF.clear (By.id('edit-zip-code-from'));
    SF.clear (By.id('edit-zip-code-to'));
    MF.FrontSiteDown_SendZipCode('01266', '58856');
    SF.sleep(2);
    SF.clear (By.id('edit-zip-code-from'));
    SF.clear (By.id('edit-zip-code-to'));
    MF.FrontSiteDown_SendZipCode('01346', '35112');
    SF.sleep(2);
    SF.clear (By.id('edit-zip-code-from'));
    SF.clear (By.id('edit-zip-code-to'));
    MF.FrontSiteDown_SendZipCode('02038', '40350');
    SF.sleep(2);
    SF.clear (By.id('edit-zip-code-from'));
    SF.clear (By.id('edit-zip-code-to'));
    MF.FrontSiteDown_SendZipCode('01344', '75007');
    SF.sleep(2);
    SF.clear (By.id('edit-zip-code-from'));
    SF.clear (By.id('edit-zip-code-to'));
    MF.FrontSiteDown_SendZipCode('01516', '68954');
    SF.sleep(2);
    SF.clear (By.id('edit-zip-code-from'));
    SF.clear (By.id('edit-zip-code-to'));
    MF.FrontSiteDown_SendZipCode('01075', '25044');
    SF.sleep(2);
    SF.clear (By.id('edit-zip-code-from'));
    SF.clear (By.id('edit-zip-code-to'));
    MF.FrontSiteDown_SendZipCode('02539', '25632');
    SF.sleep(2);
    SF.clear (By.id('edit-zip-code-from'));
    SF.clear (By.id('edit-zip-code-to'));
    MF.FrontSiteDown_SendZipCode('01223', '92860');
    SF.sleep(2);
    SF.clear (By.id('edit-zip-code-from'));
    SF.clear (By.id('edit-zip-code-to'));
    MF.FrontSiteDown_SendZipCode('02134', '93421');
    SF.sleep(2);
    SF.clear (By.id('edit-zip-code-from'));
    SF.clear (By.id('edit-zip-code-to'));
    MF.FrontSiteDown_SendZipCode('01718', '95253');
    SF.sleep(2);
    SF.clear (By.id('edit-zip-code-from'));
    SF.clear (By.id('edit-zip-code-to'));

    condition.nowWeDoing = 'с нижней формы вводим валидные зипы, по границам штата MA для CT,NY,NH ';
    MF.FrontSiteDown_SendZipCode('01081', '06076');
    SF.sleep(2);
    SF.clear (By.id('edit-zip-code-from'));
    SF.clear (By.id('edit-zip-code-to'));
    MF.FrontSiteDown_SendZipCode('01201', '12125');
    SF.sleep(2);
    SF.clear (By.id('edit-zip-code-from'));
    SF.clear (By.id('edit-zip-code-to'));
    MF.FrontSiteDown_SendZipCode('01475', '03470');
    SF.sleep(2);
    SF.clear (By.id('edit-zip-code-from'));
    SF.clear (By.id('edit-zip-code-to'));

    condition.nowWeDoing = 'с нижней формы вводим невалидные зипы и проверяем колонку слева';
    MF.FrontSiteDown_SendZipCode('55555', '00000');
    SF.sleep(2);
    driver.wait(driver.findElement(By.xpath('//div/span[contains(text(),"Not found zip code 55555.")]')).getText().then(function(text){
        V.WeDontFrom = text;
        VD.IWant(VD.ToEqual, V.WeDontFrom, text, 'не совпала надпись слева в колонке по мувинг фром');
    }),config.timeout);
    SF.sleep(1);
    driver.wait(driver.findElement(By.xpath('//div/span[contains(text(),"Not found zip code 00000.")]')).getText().then(function(text){
        V.WeDontTo = text;
        VD.IWant(VD.ToEqual, V.WeDontTo, text, 'не совпала надпись слева в колонке по мувинг ту');
    }),config.timeout);
    SF.sleep(1);



    SF.endOfTest();
};
