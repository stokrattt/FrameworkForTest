var activity = require('./activity');

describe('Boston admin requests', function(){
	beforeEach(function() {browser.ignoreSynchronization = true;});

	afterEach(function(done) {
	    done();
	});

    it('should login to account 11', function() {
    	// activity.goToAccountPage();
    	// browser.driver.sleep(3000);
	    // browser.actions().mouseMove(element(by.css('[ng-click="userPage()"]')));
    	activity.goToAdminLoginPage();
    	browser.driver.sleep(1000);
    	activity.loginAdminAccount();
    	browser.driver.sleep(6000);
		var countBefore;
		var countAfter;
		element(by.css('.userlogin.ng-scope')).click();
    	activity.loginAccount();
    	browser.driver.sleep(3000);

    	browser.getCurrentUrl().then(function(actualUrl) {
      		expect(actualUrl).toEqual("http://moversboard.net:8083/account/#/history");
    	});
    });

    it('should create request', function(){
    	element(by.css('[data-cc-request-btn]')).click();
    	browser.driver.sleep(1000);
		element(by.css('[ng-model="editrequest.data.field_date"]')).click();
		element(by.css('.ui-datepicker-today')).click();

		browser.driver.executeScript("$('#edit-furnished-rooms').trigger('click');");
		var postalFrom = element(by.css('[type="field_moving_from"]'));
		var postalTo = element(by.css('[type="field_moving_to"]'));
		postalFrom.sendKeys('69120');
		postalTo.sendKeys('69129');
	    element.all(by.css('[ng-model="editrequest.data.field_type_of_entrance_from"]')).get(0).element(by.cssContainingText('option', 'Stairs - 2nd Floor')).click();
	    element.all(by.css('[ng-model="editrequest.data.field_type_of_entrance_to_"]')).get(0).element(by.cssContainingText('option', 'No Stairs - Ground Floor')).click();
		element(by.css('[ng-click="Calculate()"]')).click();
		browser.driver.sleep(3000);
		element(by.css('[ng-click="step2 = false;step3 = true;"]')).click();
		browser.driver.sleep(3000);
		var name = element(by.css('[ng-model="editrequest.account.fields.field_user_first_name"]'));
		var lastName = element(by.css('[ng-model="editrequest.account.fields.field_user_last_name"]'));
		var email = element(by.css('[ng-model="editrequest.account.mail"]'));
		var phone = element(by.css('[ng-model="editrequest.account.fields.field_primary_phone"]'));
		name.sendKeys('testuser');
		lastName.sendKeys('testuser');
		email.sendKeys('testuser@email.com');
		phone.sendKeys('9999999999');
		element(by.css('[ng-click="create()"]')).click();
	    browser.driver.sleep(16000);
    });

    it('should edit pending request', function(){

		// choose truck

		
    	var moveFrom = element(by.css('[ng-value="request.field_moving_from.thoroughfare"]'));
    	var moveTo = element(by.css('[ng-value="request.field_moving_to.thoroughfare"]'));
	    var select = element(by.css('[data-field="[request.status, \'status\']"]'));
	    var option = select.element(by.css('option[value="3"]'));
	    moveFrom.sendKeys('199 W Jefferson Ave');
		moveTo.sendKeys('489 Cutler Ave');
	    select.click();
    	option.click();

	    element.all(by.css('[ng-click="UpdateRequest()"]')).click();
    	browser.driver.sleep(1000);
    	element(by.css('[ng-click="update(request)"]')).click();
    	browser.driver.sleep(6000);
    	browser.setLocation('dispatch/local');
		element(by.css('.modal-header')).element(by.partialButtonText('×')).click();
    	browser.driver.sleep(3000);
		expect(browser.getCurrentUrl())
		    .toBe('http://moversboard.net:8081/moveBoard/#/dispatch/local');
    	browser.driver.sleep(6000);
    });

    it('should assignTeam to request',function(){
    	var request;
		request = element.all(by.repeater('request in vm.filteredReq')).last();//.then(function(item){
			// request =  item.last();
			request.click();
			console.log(element.all(by.css('right-sidebar select#foreman')).get(2));
			var foreman = element.all(by.css('.right-sidebar select#foreman')).get(2);
			foreman.click();
			foreman.all(by.css('option')).get(3).click();
			var helper = element.all(by.css('.right-sidebar select.workers')).get(3);//.element(by.css('[name="helper"]'));
			helper.click();
			helper.all(by.css('option')).get(3).click();
			element(by.css('[ng-click="vm.assignTeam(request)"')).click();
			//click button success on alert
    		browser.driver.sleep(10000);
			element(by.css('.sa-confirm-button-container .confirm')).click();
			request.click();
    		browser.driver.sleep(10000);
			element(by.css('.open_button_contract')).click().then(function () {
		        browser.getAllWindowHandles().then(function (handles) {
		            newWindowHandle = handles[1]; // this is your new window
		            browser.switchTo().window(newWindowHandle).then(function () {
		                // fill in the form here
	    				browser.driver.sleep(20000);
		                expect(browser.getCurrentUrl()).toMatch(/\/url/);
		            });
		        });
		    });
			 var attrs =  browser.driver.executeScript("$('#datatable2 tbody tr').get(0).attributes");
		 console.log(attrs, attrs.size);
			 for(var i=0; i<attrs.size; i++){
				if(attrs[i].name == 'data-nid'){
			 		var nid = attrs[i].value
				console.log(attrs[i].value);
			 	}
			 }
		 var path = 'request/'+ nid +'/contract';
		browser.driver.sleep(6000);
	    	var foreman = element(by.css('[ng-model="vm.data.foreman"]'));
		   var foremanOption = foreman.element(by.css('option[value="5510"]'));
		   foreman.click();
	   	foremanOption.click();
			 var helper = element(by.css('[ng-click="oldValue = vm.data.baseCrew.helpers[$index]"]'));
		   helper.click();
		    helper.all(by.repeater('(role, helpers) in vm.helpers')).then(function(opt){
		    	var helperOption = opt[0].element(by.css('option[value="5511"]'));
	  			helperOption.click();
	   			element(by.css('[ng-click="vm.assignTeam(request)"]')).click();
	  	browser.driver.sleep(6000);
	    	//sweet alert
	   	element(by.css('.confirm')).click();
	    	browser.driver.sleep(3000);
	    
	     browser.setLocation(path);
		 });
		 });
			   	
    });

    it('should subbmit contract',function(){
	  	 browser.driver.sleep(3000);
	  	var el = element.all(by.css('ul li'));
	 	console.log(element.all(by.css('[ng-repeat="page in navigation.pages track by $index"]')));
	 	element.all(by.css('[ng-repeat="page in navigation.pages track by $index"]')).then(function (elm) {
			console.log(elm);
		    elm[1].click();
		 });
	  	 el.get(1).click()
	   browser.switchTo().window(allHandles[0]);
	  browser.driver.sleep(10000);
  	element(by.css('#step_0')).click();
		var  signature = element(by.css('canvas'));
  			Actions builder = new Actions(browser.driver);
		 Action drawSignature = builder.dragAndDrop(signature, signature |{x:600, y:700})
		 							  .dragAndDrop(signature, signature |{x:650, y:300});
		 drawSignature.perform();
	});

   it('should create request', function() {
    	//activity.goToAccountHistoryPage();
		var countBefore;
		var countAfter;

		//browser.driver.sleep(2000);
		countBefore = element.all(by.css('[ng-repeat="request in vm.current_requests"]')).then(function(items) {
			countBefore = items.length;
			activity.goToAccountPage();
			browser.driver.sleep(2000);

			element(by.css('[ng-model="moveDate"]')).click();
			element(by.css('.ui-datepicker-days-cell-over.Regular.ui-datepicker-today')).click();

			var zipFrom = element(by.css('[ng-model="request.zipFrom"]'));
	    	var zipTo = element(by.css('[ng-model="request.zipTo"]'));
	    	zipFrom.sendKeys('69120');
	    	zipTo.sendKeys('69129');

	    	element(by.cssContainingText('option', 'Small 1 Bedroom Apartment')).click();
	    	element(by.css('[ng-model="request.typeFrom"]')).element(by.cssContainingText('option', 'Stairs - 2nd Floor')).click();
	    	element(by.css('[ng-model="request.typeTo"]')).element(by.cssContainingText('option', 'No Stairs - Ground Floor')).click();

	    	element(by.css('[ng-click="goToForm()"]')).click();
	    	browser.driver.sleep(1000);
	    	element(by.css('[ng-model="preferedTime"]')).click();
	    	element(by.css('.select_item.pre_2')).click();
	    	element(by.css('[ng-click="goToSummery()"]')).click();

	    	element(by.id('submitRequestButton')).click();
	    	browser.driver.sleep(4000);
	    	activity.goToAccountHistoryPage();
	    	//browser.driver.sleep(2000);
	    	countAfter = element.all(by.css('[ng-repeat="request in vm.current_requests"]')).then(function(items) {
	    		countAfter = items.length;
	    		expect(countBefore + 1).toEqual(countAfter);
	    	});
		});
	});
});
