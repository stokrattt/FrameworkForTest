var HtmlScreenshotReporter = require('protractor-jasmine2-screenshot-reporter');

var reporter = new HtmlScreenshotReporter({
    dest: './report/screenshots',
    filename: 'my-report.html'
});

exports.config = {
    /**
     * The params object will be passed directly to the Protractor instance,
     * and can be accessed from your test as browser.params. It is an arbitrary
     * object and can contain anything you may need in your test.
     * This can be changed via the command line as:
     *   --params.login.user "Joe"
     *
     * Example:
     * params: {
   *   login: {
   *     user: 'Jane',
   *     password: '1234'
   *   }
   * }
     */
    params: {
        localDispatchURL: 'http://stage.themoveboard.com/moveBoard/#/dispatch/local',
        accountURL: 'http://stage.themoveboard.com/account/#/login',
        adminURL: 'http://stage.themoveboard.com/moveBoard/#/dashboard'
    },
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
    suites: {
        localMoving: ['e2e/localMoving.js'],
        longDistance: ['e2e/longDistance.js'],
        dataPending: ['e2e/data-pending.js']
    },

    /*
    specs: [
        //'e2e/TheMoveBoard.js',
        'e2e/data-pending.js'
    ],
    */
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