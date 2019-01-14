# FrameworkForTest

e2e-testing system based on selenium and NodeJS fibers

Program for creating, debugging and running e2e-tests with abilities to make pauses and adding new steps of test while test already running. Can integrate with browsermob-proxy for logging HTTP requests.
Use it if you want, just leave callback. It's for my portfolio)
Just start selenium server (java -jar server.jar) and run tests(node mainTest config:complete) for example.
If you need to logging http requests, then run proxy(./browsermob-proxy-2.1.4/bin/browsermob-proxy -port 7700 , you need to download it separately) and run program with flag -p (node mainTest -p config:complete)
For server-systems like Jenkins you can use headless chrome, just uncomment one string in complete.js config.

Debug system: 
For use debug you need to run program with flag -d (node mainTest -d config:complete) Then you can use pause function in code (Debug.pause()) and call it from console.
To make a pause from console just put in ||| and enter. And the same for the continuing.
While code is paused you can try to execute new steps directly from console. Just put in '>>>' and press Enter. After that all what you typing will storing in buffer and will be executed after you putting in '<<<'. For example: 

>>> 
JS.click(By.xpath('some selector')); 
<<< 
Will click that button in opened browser. It's useful for testing new steps without restarting all test. (like in testim but without freezing).

There is one config which runs two tests for example.
How to organize your tests it's your business. I offer you to use /common/MediumFunctionWD.js to make a "dictionary" with xpaths and /common/LongFunctionsWD.js to store a few-steps parts of tests which often repeats.
If you want to feel all goods of system you MUST use functions from /system/ShortFunctionsWD.js as much as possible. If webdriver failind on some step, try to use equal function from /system/JSshortFunctions.js. (For example if WD.click() is failing try to use JS.click)
Sometimes executing code directly in browser is the better way. You can store that code in /common/JSsteps.js. Also It's possible to giving parameters to those JS steps and waiting for a responce.
