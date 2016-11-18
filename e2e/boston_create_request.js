var activity = require('./activity');

describe('Boston client requests', function(){
	beforeEach(function() {browser.ignoreSynchronization = true;});

	/*afterEach(function(done) {
	    done();
	});*/

    it('should login to account', function() {
    	activity.goToLoginPage();
		var countBefore;
		var countAfter;

	//	element(by.css('.userlogin.ng-scope')).click();
		browser.driver.sleep(6000);
    	activity.loginAccount();
    	browser.driver.sleep(6000);
   // 	activity.goToAccountHistoryPage(); it's do auto login to history
    	browser.getCurrentUrl().then(function(actualUrl) {
      		expect(actualUrl).toEqual("http://moversboard.net:8083/account/#/history");
    	});
    });

    var countBefore;
	var countAfter;

    it('should create request', function() {
		countBefore = element.all(by.css('[ng-repeat="request in vm.current_requests"]')).then(function(items) {
			countBefore = items.length;
			activity.goToHomePage();
			browser.driver.sleep(2000);

			element(by.css('[ng-model="moveDate"]')).click();
			element(by.css('.ui-datepicker-today')).click();

			var zipFrom = element.all(by.css('[ng-model="request.zipFrom"]')).get(0);
	    	var zipTo = element.all(by.css('[ng-model="request.zipTo"]')).get(0);
	    	zipFrom.sendKeys('02461');
	    	zipTo.sendKeys('02111');

	    	element.all(by.cssContainingText('option', 'Small 1 Bedroom Apartment')).get(0).click();
	    	element.all(by.css('[ng-model="request.typeFrom"]')).get(0).element(by.cssContainingText('option', 'Stairs - 2nd Floor')).click();
	    	element.all(by.css('[ng-model="request.typeTo"]')).get(0).element(by.cssContainingText('option', 'No Stairs - Ground Floor')).click();

	    	element(by.css('[ng-click="goToForm()"]')).click();
	    	browser.driver.sleep(3000);
	    	element(by.css('[ng-model="preferedTime"]')).click();
	    	element.all(by.css('.select_item.pre_2')).get(0).click();
	    	element(by.css('[ng-click="goToSummery()"]')).click();
	    	browser.driver.sleep(6000);
	    	element(by.id('submitRequestButton')).click();
	    	expect(countBefore).not.toBe(0);
	    	/*browser.getCurrentUrl().then(function(actualUrl) {
      			expect(actualUrl).toEqual("http://moversboard.net:8081/account/#/history");
    		});*/
		});
	});

	it('should check that request has been created', function() {
    	browser.driver.sleep(6000);
    	activity.goToAccountHistoryPage();
    	browser.driver.sleep(4000);
    	//browser.driver.sleep(2000);
    	countAfter = element.all(by.css('[ng-repeat="request in vm.current_requests"]')).then(function(items) {
    		countAfter = items.length;
    		expect(countBefore + 1).toEqual(countAfter);
    	});
	});

});
