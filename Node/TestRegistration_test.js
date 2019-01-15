
Feature('Registration form');

Scenario('test something', (I) => {
    I.amOnPage('https://ua1xbet.com/en/line/');
    I.click('.register_button_main');
    I.see('Register and receive ');
    I.click('By e-mail');
    I.selectOption('Vinnitskaya obl.', '79');

});
