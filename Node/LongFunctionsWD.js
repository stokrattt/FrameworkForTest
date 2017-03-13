global.FullSmallCalcAsLocal =  function(client){
    SFsend(By.xpath('//ultrasmall-form//input[@ng-model="request.zipFrom"]'), "02461");
    SFsend(By.xpath('//ultrasmall-form//input[@ng-model="request.zipTo"]'), "02111");
    driver.wait(driver.executeScript("$('ultrasmall-form input[ng-model=\"moveDate\"]').focus();"));
    SFsleep(2);
    V.request={};
    V.request.moveDate = null;
    driver.wait(driver.executeScript(Click4DaysNewCalendar).then(function (D) {
        V.request.moveDate = D;
    }));
    waitForDefined("moveDate");
    driver.executeScript("$('ultrasmall-form input[ng-click=\"Continue1(\\\'step1\\\')\"]').click();");
    JSclick("ultrasmall-form div[ng-click='openSlide();']");
    JSclick("div[ng-click='MoveSizePreviewClick(\\\\\'4\\\\\')']");
    JSclick("button.pull-right:first");
    JSselect('ultrasmall-form select[ng-model="request.typeFrom"]',4);
    JSselect('ultrasmall-form select[ng-model="request.typeTo"]',3);
    JSclick('input[ng-click=\\"Continue2(\'step2\')\\"]');
    driver.sleep(2000);
    SFsend(By.xpath('//ultrasmall-form//input[@ng-model="request.first_name"]'), client.name);
    SFsend(By.xpath('//ultrasmall-form//input[@ng-model="request.last_name"]'), client.fam);
    SFsend(By.xpath('//ultrasmall-form//input[@ng-model="request.email"]'), client.email);
    SFsend(By.xpath('//ultrasmall-form//input[@ng-model="request.primaryPhone"]'), client.phone);
    JSclick('input[ng-click=\\"Calculate(\\\'Submit\\\')\\"]');
    JSwait('ultrasmall-form #congrats_menu[style="right: 0px;"] a:contains("Proceed To View Your Quote")');
    JSlink('ultrasmall-form a:contains("Proceed To View Your Quote")');
};
