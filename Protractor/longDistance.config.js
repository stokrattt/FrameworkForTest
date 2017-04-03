var HtmlScreenshotReporter = require('protractor-jasmine2-screenshot-reporter');

var reporter = new HtmlScreenshotReporter({
    dest: './report/screenshots',
    filename: 'my-report.html'
});

exports.config = {
    capabilities: {
        // You can use other browsers
        // like firefox, phantoms, safari, IE (-_-)
        'browserName': 'chrome'
    },
    // Setup the report before any tests start
    beforeLaunch: function() {
        return new Promise(function(resolve){
            reporter.beforeLaunch(resolve);
        });
    },
    // Assign the test reporter to each running instance
    onPrepare: function() {
        jasmine.getEnv().addReporter(reporter);
    },

    // Close the report after all tests finish
    afterLaunch: function(exitCode) {
        return new Promise(function(resolve){
            reporter.afterLaunch(resolve.bind(this, exitCode));
        });
    },

    specs: [
	//'e2e/TheMoveBoard.js',
        'e2e/LongDistance.js'
 	// 'e2e/boston_create_request_admin.js',	
 	// 'e2e/homepage_part1.js'
      	//  'e2e/boston_create_request.js',
      
      
    ],
    framework: 'jasmine',
    onPrepare: function() {
        jasmine.getEnv().addReporter(reporter);
        browser.driver.manage().window().setSize(1600, 900);
    },

    jasmineNodeOpts: {
        showColors: true,
        defaultTimeoutInterval: 900000,
        //maximumSpecCallbackDepth: 2000,
        isVerbose: true
    },
    allScriptsTimeout: 900000

};
