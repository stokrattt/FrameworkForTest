exports.config = {
    capabilities: {
        // You can use other browsers
        // like firefox, phantoms, safari, IE (-_-)
        'browserName': 'chrome'
    },
    specs: [
	//'e2e/TheMoveBoard.js',
        'e2e/pendingStorage.js'
 	// 'e2e/boston_create_request_admin.js',	
 	// 'e2e/homepage_part1.js'
      	//  'e2e/boston_create_request.js',
      
      
    ],
    framework: 'jasmine',
    jasmineNodeOpts: {
        showColors: true,
        defaultTimeoutInterval: 900000,
        //maximumSpecCallbackDepth: 2000,
        isVerbose: true
    },
    allScriptsTimeout: 900000,
    
    onPrepare: function() {
        browser.driver.manage().window().setSize(1600, 900);
    }
};
