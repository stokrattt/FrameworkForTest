
function goToLoginPage() {
    browser.driver.get('http://moversboard.net:8083/account/#/login');
}
function goToHomePage() {
    browser.driver.get('https://moversboard.net:8083/front_site/bostonbestrate/');
}

function goToAccountHistoryPage() {
    browser.driver.get('https://moversboard.net:8083/account/#/history');
}

function goToAdminLoginPage() {
    browser.driver.get('https://moversboard.net:8083/moveBoard/#/login');
}

function loginAccount() {
    var emailInput = browser.element(by.id('email'));
    var passwordInput = browser.element(by.id('password'));
    emailInput.sendKeys('roma4ke@yahoo.com');
    passwordInput.sendKeys('123');
    browser.element(by.css('.btn.btn-primary.block.full-width.m-b')).click();
}

function loginAdminAccount() {
    var emailInput = browser.element(by.id('email'));
    var passwordInput = browser.element(by.id('password'));
    emailInput.sendKeys('roma4ke');
    passwordInput.sendKeys('root');
    browser.element(by.css('.btn.btn-primary.block.full-width.m-b')).click();
}
function logoutClient(){
    browser.waitForAngular();
    browser.actions().mouseMove(element(by.css('.userlogin'))).perform();
    browser.actions().mouseMove(element(by.css('[ng-click="user_logout()"]'))).perform();
    element(by.css('[ng-click="user_logout()"]')).click();
}

module.exports = {
    goToLoginPage: goToLoginPage,
    goToAccountHistoryPage: goToAccountHistoryPage,
    loginAccount: loginAccount,
    goToAdminLoginPage: goToAdminLoginPage,
    loginAdminAccount: loginAdminAccount,
    logoutClient: logoutClient,
    goToHomePage: goToHomePage
};