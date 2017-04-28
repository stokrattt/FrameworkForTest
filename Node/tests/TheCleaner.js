module.exports = function main(SF, JS, MF, LF, JSstep, VD, V, By, until,FileDetector, system, condition, config,constants) {
    global.fiber = Fiber.current;
    //=========================начинаем писать тест=============================
    if (V.cleanerJob.length!=0) {
        SF.get(V.adminURL);
        LF.LoginToBoardAsAdmin();
        for (let i = 0; i < V.cleanerJob.length; i++) {
            SF.clear(By.xpath('//input[@ng-model="search"]'));
            SF.send(By.xpath('//input[@ng-model="search"]'), V.cleanerJob[i]);
            SF.waitForVisible(By.xpath('//div[@ng-bind-html="request.nid | searchfilter:search"]/span[contains(text(),"' + V.cleanerJob[i] + '")]'));
            SF.click(By.xpath('//div[@ng-bind-html="request.nid | searchfilter:search"]/span[contains(text(),"' + V.cleanerJob[i] + '")]/..'));
            SF.waitForVisible(By.xpath('//div[@ng-click="chooseTruck(tid)"]'));
            JS.waitForNotExist('div.busyoverlay:visible');
            SF.sleep(2);

            let Release = 0;
            driver.wait(driver.findElements(By.xpath('//span[@ng-click="ReleaseEdit()"]')).then(function (array) {
                Release = array.length;
            }), config.timeout);
            SF.sleep(1);
            if (Release != 0) {
                SF.click(By.xpath('//span[@ng-click="ReleaseEdit()"]'));
                SF.sleep(1);
                JS.waitForNotExist('div.busyoverlay:visible');
            }
            let Closed = 0;
            driver.wait(driver.findElements(By.xpath('//div[@ng-if="Job_Completed"][@ng-click="openJob();"]')).then(function (array) {
                Closed = array.length;
            }), config.timeout);
            SF.sleep(1);
            if (Closed != 0) {
                SF.click(By.xpath('//div[@ng-if="Job_Completed"][@ng-click="openJob();"]'));
                SF.sleep(1);
                JS.waitForNotExist('div.busyoverlay:visible');
            }
            let Sales = 0;
            driver.wait(driver.findElements(By.xpath('//div[contains(@class,"sales_type")]')).then(function (array) {
                Sales = array.length;
            }), config.timeout);
            let SalesActive = 0;
            driver.wait(driver.findElements(By.xpath('//div[contains(@class,"sales_type")][contains(@class,"active")]')).then(function (array) {
                SalesActive = array.length;
            }), config.timeout);
            SF.sleep(1);
            if ((Sales != 0)&&(SalesActive == 0)) {
                SF.click(By.xpath('//div[contains(@class,"sales_type")]'));
                SF.sleep(1);
                JS.waitForNotExist('div.busyoverlay:visible');
            }

            SF.select(By.xpath('//select[@id="edit-status"]'), 14);
            SF.click(By.xpath('//button[@ng-click="UpdateRequest()"]'));
            JS.waitForExist('button[ng-click="update(request)"]:visible');
            SF.click(By.xpath('//button[@ng-click="update(request)"]'));
            JS.waitForNotExist("div.busyoverlay:visible");
            LF.closeEditRequest();
            SF.sleep(2);
            console.log('удалили реквест '.green+(V.cleanerJob[i]+'').yellow);
        }
        V.cleanerJob=[];
    }
    //=========================закончили писать тест=============================
    SF.endOfTest();
};
