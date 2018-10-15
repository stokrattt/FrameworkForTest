var HtmlScreenshotReporter = require('protractor-jasmine2-screenshot-reporter');

var reporter = new HtmlScreenshotReporter({
    dest: './report/localMoving',
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
    // Close the report after all tests finish
    afterLaunch: function(exitCode) {
        return new Promise(function(resolve){
            reporter.afterLaunch(resolve.bind(this, exitCode));
        });
    },
    seleniumAddress: 'http://localhost:4444/wd/hub',
    specs: [
        'e2e/localMoving.js'
    ],
    framework: 'jasmine',
    // Assign the test reporter to each running instance
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
