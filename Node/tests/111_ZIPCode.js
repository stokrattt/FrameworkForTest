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
    SF.sleep(5);
    driver.wait(driver.findElement(By.xpath('//div/span[contains(text(),"Юг Ли, MA 01260")]')).getText().then(function(text){
        V.WeDontFrom1 = text;
        VD.IWant(VD.ToEqual,V.WeDontFrom1, text, 'не совпала надпись слева в колонке по мувинг ту');
    }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//div/span[contains(text(),"Милфорд, CT 06461")]')).getText().then(function(text){
        V.WeDontTo1 = text;
        VD.IWant(VD.ToEqual, V.WeDontTo1, text, 'не совпала надпись слева в колонке по мувинг ту');
    }),config.timeout);
    SF.clear (By.id('edit-zip-code-from'));
    SF.clear (By.id('edit-zip-code-to'));
    MF.FrontSiteDown_SendZipCode('02536', '84008');
    SF.sleep(5);
    driver.wait(driver.findElement(By.xpath('//div/span[contains(text(),"Восток Фолмут, MA 02536")]')).getText().then(function(text){
        V.WeDontFrom2 = text;
        VD.IWant(VD.ToEqual, V.WeDontFrom2, text, 'не совпала надпись слева в колонке по мувинг ту');
    }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//div/span[contains(text(),"Бонанса, UT 84008")]')).getText().then(function(text){
        V.WeDontTo2 = text;
        VD.IWant(VD.ToEqual, V.WeDontTo2, text, 'не совпала надпись слева в колонке по мувинг ту');
    }),config.timeout);
    SF.clear (By.id('edit-zip-code-from'));
    SF.clear (By.id('edit-zip-code-to'));
    MF.FrontSiteDown_SendZipCode('02381', '75007');
    SF.sleep(5);
    driver.wait(driver.findElement(By.xpath('//div/span[contains(text(),"Плимут, MA 02381")]')).getText().then(function(text){
       V.WeDontFrom3 = text;
       VD.IWant(VD.ToEqual, V.WeDontFrom3, text, 'не совпала надпись слева в колонке по мувинг ту');
    }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//div/span[contains(text(),"Кэрролтон, TX 75007")]')).getText().then(function(text){
        V.WeDontTo3 = text;
        VD.IWant(VD.ToEqual, V.WeDontTo3, text, 'не совпала надпись слева в колонке по мувинг ту');
    }),config.timeout);
    SF.clear (By.id('edit-zip-code-from'));
    SF.clear (By.id('edit-zip-code-to'));
    MF.FrontSiteDown_SendZipCode('02382', '75755');
    SF.sleep(5);
    driver.wait(driver.findElement(By.xpath('//div/span[contains(text(),"Уитмен, MA 02382")]')).getText().then(function(text){
        V.WeDontFrom4 = text;
        VD.IWant(VD.ToEqual, V.WeDontFrom4, text, 'не совпала надпись слева в колонке по мувинг ту');
    }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//div/span[contains(text(),"Биг Санди, TX 75755")]')).getText().then(function(text){
        V.WeDontTo4 = text;
        VD.IWant(VD.ToEqual, V.WeDontTo4, text, 'не совпала надпись слева в колонке по мувинг ту');
    }),config.timeout);
    SF.clear (By.id('edit-zip-code-from'));
    SF.clear (By.id('edit-zip-code-to'));
    MF.FrontSiteDown_SendZipCode('01367', '86338');
    SF.sleep(5);
    driver.wait(driver.findElement(By.xpath('//div/span[contains(text(),"Роу, MA 01367")]')).getText().then(function(text){
        V.WeDontFrom5 = text;
        VD.IWant(VD.ToEqual, V.WeDontFrom5, text, 'не совпала надпись слева в колонке по мувинг ту');
    }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//div/span[contains(text(),"Скалл Вэлли, AZ 86338")]')).getText().then(function(text){
        V.WeDontTo5 = text;
        VD.IWant(VD.ToEqual, V.WeDontTo5, text, 'не совпала надпись слева в колонке по мувинг ту');
    }),config.timeout);
    SF.clear (By.id('edit-zip-code-from'));
    SF.clear (By.id('edit-zip-code-to'));
    MF.FrontSiteDown_SendZipCode('01462', '58227');
    SF.sleep(5);
    driver.wait(driver.findElement(By.xpath('//div/span[contains(text(),"Луненберг, MA 01462")]')).getText().then(function(text){
        V.WeDontFrom6 = text;
        VD.IWant(VD.ToEqual, V.WeDontFrom6, text, 'не совпала надпись слева в колонке по мувинг ту');
    }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//div/span[contains(text(),"Эдинберг, ND 58227")]')).getText().then(function(text){
        V.WeDontTo6 = text;
        VD.IWant(VD.ToEqual, V.WeDontTo6, text, 'не совпала надпись слева в колонке по мувинг ту');
    }),config.timeout);
    SF.clear (By.id('edit-zip-code-from'));
    SF.clear (By.id('edit-zip-code-to'));
    MF.FrontSiteDown_SendZipCode('01266', '58856');
    SF.sleep(5);
    driver.wait(driver.findElement(By.xpath('//div/span[contains(text(),"Запад Стокбридж, MA 01266")]')).getText().then(function(text){
        V.WeDontFrom7 = text;
        VD.IWant(VD.ToEqual, V.WeDontFrom7, text, 'не совпала надпись слева в колонке по мувинг ту');
    }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//div/span[contains(text(),"Зал, ND 58856")]')).getText().then(function(text){
        V.WeDontTo7 = text;
        VD.IWant(VD.ToEqual, V.WeDontTo7, text, 'не совпала надпись слева в колонке по мувинг ту');
    }),config.timeout);
    SF.clear (By.id('edit-zip-code-from'));
    SF.clear (By.id('edit-zip-code-to'));
    MF.FrontSiteDown_SendZipCode('01346', '35112');
    SF.sleep(5);
    driver.wait(driver.findElement(By.xpath('//div/span[contains(text(),"Хит, MA 01346")]')).getText().then(function(text){
     V.WeDontFrom8 = text;
        VD.IWant(VD.ToEqual, V.WeDontFrom8, text, 'не совпала надпись слева в колонке по мувинг ту');
    }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//div/span[contains(text(),"Маргарет, AL 35112")]')).getText().then(function(text){
    V.WeDontTo8 = text;
        VD.IWant(VD.ToEqual, V.WeDontTo8, text, 'не совпала надпись слева в колонке по мувинг ту');
    }),config.timeout);
    SF.clear (By.id('edit-zip-code-from'));
    SF.clear (By.id('edit-zip-code-to'));
    MF.FrontSiteDown_SendZipCode('02038', '40350');
    SF.sleep(5);
    driver.wait(driver.findElement(By.xpath('//div/span[contains(text(),"Франклин, MA 02038")]')).getText().then(function(text){
        V.WeDontFrom9 = text;
        VD.IWant(VD.ToEqual, V.WeDontFrom9, text, 'не совпала надпись слева в колонке по мувинг ту');
    }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//div/span[contains(text(),"Мурфилд, KY 40350")]')).getText().then(function(text){
        V.WeDontTo9 = text;
        VD.IWant(VD.ToEqual, V.WeDontTo9, text, 'не совпала надпись слева в колонке по мувинг ту');
    }),config.timeout);
    SF.clear (By.id('edit-zip-code-from'));
    SF.clear (By.id('edit-zip-code-to'));
    MF.FrontSiteDown_SendZipCode('01344', '75007');
    SF.sleep(5);
    driver.wait(driver.findElement(By.xpath('//div/span[contains(text(),"Эрвинг, MA 01344")]')).getText().then(function(text){
        V.WeDontFrom10 = text;
        VD.IWant(VD.ToEqual, V.WeDontFrom10, text, 'не совпала надпись слева в колонке по мувинг ту');
    }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//div/span[contains(text(),"Кэрролтон, TX 75007")]')).getText().then(function(text){
        V.WeDontTo10 = text;
        VD.IWant(VD.ToEqual, V.WeDontTo10, text, 'не совпала надпись слева в колонке по мувинг ту');
    }),config.timeout);
    SF.clear (By.id('edit-zip-code-from'));
    SF.clear (By.id('edit-zip-code-to'));
    MF.FrontSiteDown_SendZipCode('01516', '68954');
    SF.sleep(5);
    driver.wait(driver.findElement(By.xpath('//div/span[contains(text(),"Дуглас, MA 01516")]')).getText().then(function(text){
        V.WeDontFrom11 = text;
        VD.IWant(VD.ToEqual, V.WeDontFrom11, text, 'не совпала надпись слева в колонке по мувинг ту');
    }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//div/span[contains(text(),"Инленд, NE 68954")]')).getText().then(function(text){
        V.WeDontTo11 = text;
        VD.IWant(VD.ToEqual, V.WeDontTo11, text, 'не совпала надпись слева в колонке по мувинг ту');
    }),config.timeout);
    SF.clear (By.id('edit-zip-code-from'));
    SF.clear (By.id('edit-zip-code-to'));
    MF.FrontSiteDown_SendZipCode('01075', '25044');
    SF.sleep(5);
    driver.wait(driver.findElement(By.xpath('//div/span[contains(text(),"Юг Хадли, MA 01075")]')).getText().then(function(text){
        V.WeDontFrom12 = text;
        VD.IWant(VD.ToEqual, V.WeDontFrom12, text, 'не совпала надпись слева в колонке по мувинг ту');
    }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//div/span[contains(text(),"Юг Хадли, MA 01075")]')).getText().then(function(text){
        V.WeDontTo12 = text;
       VD.IWant(VD.ToEqual, V.WeDontTo12, text, 'не совпала надпись слева в колонке по мувинг ту');
    }),config.timeout);
    SF.clear (By.id('edit-zip-code-from'));
    SF.clear (By.id('edit-zip-code-to'));
    MF.FrontSiteDown_SendZipCode('02539', '25632');
    SF.sleep(5);
    driver.wait(driver.findElement(By.xpath('//div/span[contains(text(),"Эдгартаун, MA 02539")]')).getText().then(function(text){
        V.WeDontFrom13 = text;
        VD.IWant(VD.ToEqual, V.WeDontFrom13, text, 'не совпала надпись слева в колонке по мувинг ту');
    }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//div/span[contains(text(),"Лайберн, WV 25632")]')).getText().then(function(text){
        V.WeDontTo13 = text;
        VD.IWant(VD.ToEqual, V.WeDontTo13, text, 'не совпала надпись слева в колонке по мувинг ту');
    }),config.timeout);
    SF.clear (By.id('edit-zip-code-from'));
    SF.clear (By.id('edit-zip-code-to'));
    MF.FrontSiteDown_SendZipCode('01223', '92860');
    SF.sleep(5);
    driver.wait(driver.findElement(By.xpath('//div/span[contains(text(),"Бекет, MA 01223")]')).getText().then(function(text){
        V.WeDontFrom14 = text;
        VD.IWant(VD.ToEqual, V.WeDontFrom14, text, 'не совпала надпись слева в колонке по мувинг ту');
    }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//div/span[contains(text(),"Норко, CA 92860")]')).getText().then(function(text){
        V.WeDontTo14 = text;
        VD.IWant(VD.ToEqual, V.WeDontTo14, text, 'не совпала надпись слева в колонке по мувинг ту');
    }),config.timeout);
    SF.clear (By.id('edit-zip-code-from'));
    SF.clear (By.id('edit-zip-code-to'));
    MF.FrontSiteDown_SendZipCode('02134', '93421');
    SF.sleep(4);
    driver.wait(driver.findElement(By.xpath('//div/span[contains(text(),"Аллстон, MA 02134")]')).getText().then(function(text){
        V.WeDontFrom15 = text;
        VD.IWant(VD.ToEqual, V.WeDontFrom15, text, 'не совпала надпись слева в колонке по мувинг ту');
    }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//div/span[contains(text(),"Арройо Гранде, CA 93421")]')).getText().then(function(text){
        V.WeDontTo15 = text;
        VD.IWant(VD.ToEqual, V.WeDontTo15, text, 'не совпала надпись слева в колонке по мувинг ту');
    }),config.timeout);
    SF.clear (By.id('edit-zip-code-from'));
    SF.clear (By.id('edit-zip-code-to'));
    MF.FrontSiteDown_SendZipCode('01718', '95253');
    SF.sleep(5);
    driver.wait(driver.findElement(By.xpath('//div/span[contains(text(),"Acton, MA 01718")]')).getText().then(function(text){
        V.WeDontFrom16 = text;
        VD.IWant(VD.ToEqual, V.WeDontFrom16, text, 'не совпала надпись слева в колонке по мувинг ту');
    }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//div/span[contains(text(),"Виктор, CA 95253")]')).getText().then(function(text){
        V.WeDontTo16 = text;
        VD.IWant(VD.ToEqual, V.WeDontTo16, text, 'не совпала надпись слева в колонке по мувинг ту');
    }),config.timeout);
    SF.clear (By.id('edit-zip-code-from'));
    SF.clear (By.id('edit-zip-code-to'));
    MF.FrontSiteDown_SendZipCode('02222', '01101');
    SF.sleep(5);
    driver.wait(driver.findElement(By.xpath('//div/span[contains(text(),"Бостон, MA 02222")]')).getText().then(function(text){
       V.WeDontFrom17 = text;
       VD.IWant(VD.ToEqual, V.WeDontFrom17, text, 'не совпала надпись слева в колонке по мувинг ту');
    }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//div/span[contains(text(),"Спрингфилд, MA 01101")]')).getText().then(function(text){
       V.WeDontTo17 = text;
       VD.IWant(VD.ToEqual, V.WeDontTo17, text, 'не совпала надпись слева в колонке по мувинг ту');
    }),config.timeout);
    SF.clear (By.id('edit-zip-code-from'));
    SF.clear (By.id('edit-zip-code-to'));

    condition.nowWeDoing = 'с нижней формы вводим валидные зипы, по границам штата MA для CT,NY,NH ';
    MF.FrontSiteDown_SendZipCode('01081', '06076');
    SF.sleep(5);
    driver.wait(driver.findElement(By.xpath('//div/span[contains(text(),"Уэльс, MA 01081")]')).getText().then(function(text){
        V.WeDontFrom18 = text;
        VD.IWant(VD.ToEqual, V.WeDontFrom18, text, 'не совпала надпись слева в колонке по мувинг ту');
    }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//div/span[contains(text(),"Стаффорд Спрингс, CT 06076")]')).getText().then(function(text){
       V.WeDontTo18 = text;
       VD.IWant(VD.ToEqual, V.WeDontTo18, text, 'не совпала надпись слева в колонке по мувинг ту');
    }),config.timeout);
    SF.clear (By.id('edit-zip-code-from'));
    SF.clear (By.id('edit-zip-code-to'));
    MF.FrontSiteDown_SendZipCode('01201', '12125');
    SF.sleep(5);
    driver.wait(driver.findElement(By.xpath('//div/span[contains(text(),"Питсфилд, MA 01201")]')).getText().then(function(text){
        V.WeDontFrom19 = text;
        VD.IWant(VD.ToEqual, V.WeDontFrom19, text, 'не совпала надпись слева в колонке по мувинг ту');
    }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//div/span[contains(text(),"Нью Лебанон, NY 12125")]')).getText().then(function(text){
    V.WeDontTo19 = text;
    VD.IWant(VD.ToEqual, V.WeDontTo19, text, 'не совпала надпись слева в колонке по мувинг ту');
    }),config.timeout);
    SF.clear (By.id('edit-zip-code-from'));
    SF.clear (By.id('edit-zip-code-to'));
    MF.FrontSiteDown_SendZipCode('01475', '03470');
    SF.sleep(5);
    driver.wait(driver.findElement(By.xpath('//div/span[contains(text(),"Уинчендон, MA 01475")]')).getText().then(function(text){
        V.WeDontFrom20 = text;
        VD.IWant(VD.ToEqual, V.WeDontFrom20, text, 'не совпала надпись слева в колонке по мувинг ту');
    }),config.timeout);
    driver.wait(driver.findElement(By.xpath('//div/span[contains(text(),"Уинчестер, NH 03470")]')).getText().then(function(text){
    V.WeDontTo20 = text;
    VD.IWant(VD.ToEqual, V.WeDontTo20, text, 'не совпала надпись слева в колонке по мувинг ту');
    }),config.timeout);
    SF.clear (By.id('edit-zip-code-from'));
    SF.clear (By.id('edit-zip-code-to'));

condition.nowWeDoing = 'с нижней формы вводим невалидные зипы и проверяем колонку слева';
    MF.FrontSiteDown_SendZipCode('55555', '00000');
    SF.sleep(5);
       driver.wait(driver.findElement(By.xpath('//div/span[contains(text(),"Not found zip code 55555.")]')).getText().then(function(text){
       V.WeDontFrom21 = text;
    VD.IWant(VD.ToEqual, V.WeDontFrom21, text, 'не совпала надпись слева в колонке по мувинг фром');
    }),config.timeout);
       driver.wait(driver.findElement(By.xpath('//div/span[contains(text(),"Not found zip code 00000.")]')).getText().then(function(text){
       V.WeDontTo22 = text;
    VD.IWant(VD.ToEqual, V.WeDontTo22, text, 'не совпала надпись слева в колонке по мувинг ту');
    }),config.timeout);
    SF.sleep(1);



    SF.endOfTest();
};
