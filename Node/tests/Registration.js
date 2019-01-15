module.exports = function main(SF, JS, MF, LF, JSstep, VD, V, By, until,FileDetector, system, condition, config,constants) {
    global.fiber = Fiber.current;
    V.client = {};
    V.client.name = 'test_registr';
    V.client.fam = 'test_registr';
    V.client.phone = SF.randomCifra(10);
    V.client.email = 'test_registr' + '@' + 'test' + '.tes';
    V.client.passwd = '123456789abcd';

    //=========================начинаем писать тест=============================
    SF.get('https://ua1xbet.com/en/line/');
    SF.click(By.id('registation_button'));
    SF.waitForLocated(By.id('button_registration')); //дождались загрузки формы регистрации
    SF.click(By.xpath('//ul[@id="reg_tabs"]/li[3]')); // перешли на регистрацию по емейлу
    SF.waitForLocated(By.xpath('//span[contains(text(), "protected by ")]')); // дождались ее
    SF.click(By.xpath('//div[contains(text(), ("Select region"))]'));
    SF.sleep(0.3);
    SF.click(By.xpath('//div[contains(text(), ("Vinnitskaya obl."))]'));
    SF.sleep(0.2);
    SF.click(By.xpath('//div[@data-value="2540"]')); // выбрали город Виница
    SF.send(By.id('reg_name'), V.client.name);
    SF.send(By.id('reg_surname'), V.client.fam);
    SF.send(By.id('reg_password'), V.client.passwd);
    SF.send(By.id('reg_password_again'), V.client.passwd);
    SF.send(By.id('reg_email'), V.client.email);
    SF.click(By.id('button_registration'));
    //дальше не написал так как там рекапча и нужно через апи тестировать

/***************************************************************************************************************/
    // ниже будет тест на логин

    SF.get('https://ua1xbet.com/en/line/');
    SF.click(By.id('curLoginForm'));
    SF.send(By.id('userLogin'), V.client.email);
    SF.send(By.id('userPassword'), V.client.passwd);
    SF.click(By.id('userConButton'));
//дальше не написал так как там рекапча и нужно через апи тестировать

    //=========================закончили писать тест=============================
    SF.endOfTest();
};
