module.exports = main;
function main(){
    global.fiber = Fiber.current;
    var URL = 'http://stage.themoveboard.com/';
    driver.get(URL);
    SFsend(By.xpath('//ultrasmall-form//input[@ng-model="request.zipFrom"]'), "02461");
    SFsend(By.xpath('//ultrasmall-form//input[@ng-model="request.zipTo"]'), "02111");
    //Debug.pause();
    driver.wait(driver.executeScript("$('ultrasmall-form input[ng-model=\"moveDate\"]').focus();"));
    driver.sleep(2000);
    V.Future = null;
    driver.wait(driver.executeScript(Click4DaysNewCalendar).then(function (D) {
        V.Future = D;
    }));
    waitForDefined("Future");
    driver.executeScript("$('ultrasmall-form input[ng-click=\"Continue1(\\\'step1\\\')\"]').click();");
    JSclick("ultrasmall-form div[ng-click='openSlide();']");
    JSclick("div[ng-click='MoveSizePreviewClick(\\\\\'4\\\\\')']");
    JSclick("button.pull-right:first");
    JSselect('ultrasmall-form select[ng-model="request.typeFrom"]',4);
    JSselect('ultrasmall-form select[ng-model="request.typeTo"]',3);
    JSclick('input[ng-click=\\"Continue2(\'step2\')\\"]');
    SFsend(By.xpath('//ultrasmall-form//input[@ng-model="request.first_name"]'), 'TestName');
    SFsend(By.xpath('//ultrasmall-form//input[@ng-model="request.last_name"]'), 'TestFam');
    SFsend(By.xpath('//ultrasmall-form//input[@ng-model="request.email"]'), 'first@email.com');
    SFsend(By.xpath('//ultrasmall-form//input[@ng-model="request.primaryPhone"]'), '8475960443');
    JSclick('input[ng-click=\\"Calculate(\\\'Submit\\\')\\"]');
    JSwait('ultrasmall-form #congrats_menu[style="right: 0px;"] a:contains("Proceed To View Your Quote")');
    JSlink('ultrasmall-form a:contains("Proceed To View Your Quote")');
    console.log('мы типа в конце');
}


