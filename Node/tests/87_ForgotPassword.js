module.exports = function main(SF, JS, MF, LF, JSstep, VD, V, By, until,FileDetector, system, condition, config,constants) {
    global.fiber = Fiber.current;
    V.ForgotPassword = 'xljaap@vvhd.tes';
    V.ForgotPassword2 = 'fghdgfbdgf@gfhdgh.dsru';
    SF.get(V.adminURL);
    SF.click (By.xpath('//small[contains(text(),"Forgot password?")]'));
    SF.sleep(1);
    SF.waitForVisible(By.xpath('//input[@id="email"]'));
    SF.sleep(1);
    SF.send(By.xpath('//input[@id="email"]'), V.ForgotPassword );
    SF.click(By.xpath('//button[@type="submit"]'));
    SF.waitForVisible(By.xpath('//button[@class="confirm"]'));
    SF.click(By.xpath('//button[@class="confirm"]'));
    SF.sleep(4);

    SF.click (By.xpath('//small[contains(text(),"Forgot password?")]'));
    SF.sleep(1);
    SF.waitForVisible(By.xpath('//input[@id="email"]'));
    SF.sleep(1);
    SF.send(By.xpath('//input[@id="email"]'), V.ForgotPassword2 );
    SF.click(By.xpath('//button[@type="submit"]'));
    SF.waitForVisible(By.xpath('//div[@class="restore-email-error-message ng-binding"]'));



    SF.endOfTest();
};


