module.exports = function(config,V) {
    config.suite = [
        './tests/DefaultSettings.js',

        './tests/78_CheckRateAndTrucks.js',
        './tests/40_PayrollTableCheckSumJobs.js',
        './tests/79_ExtraFeeForAdditionalPickUp.js',
        './tests/81_NewPackingAddCrew.js',
        './tests/82_LDSetPrice.js',
        './tests/83_PayrollAllDepartment.js',
        './tests/84_MovingAndStorageBinding.js',
        './tests/85_SITAddTripTPDelivery.js',
        './tests/86_SITAddPersonallyForemanTripPayroll.js',
        './tests/87_ForgotPassword.js',
        './tests/90_ChangeEmailUser.js',
        './tests/42_DrivingTimeLocalMoveMarketToolsOFF.js',
        './tests/93_PackingDayFromLocMove.js',
        './tests/92_PackingDay.js',
        './tests/94_CommercialMoveFromBord.js',
        './tests/89_DraftRequest.js',
        './tests/103_AdditionalInventoryForLocalMove.js',
        './tests/96_CommercialMoveFromFront.js',
        './tests/97_OutgoingEmailAndSignature.js',
        './tests/99_PendingInfoInventoryTotal.js',
        './tests/101_CustomCommMoveWithInventory.js',
        './tests/98_RemindersForOtherPerson.js',
        './tests/56_LoadingAllSteps.js',
        './tests/95_Statistic.js',
        './tests/100_LeadScoring.js',
        './tests/105_ChangeMinCFAndDriverPayroll.js',
        './tests/109_SITBalance.js',
        './tests/102_InhomeEstimate.js',
        './tests/104_AddBedroomAddRoom.js',
        './tests/106_AdditionalContact.js',
        './tests/110_LeadScoringAdmin.js',
        './tests/112_ExtraDropLocalMove.js',

        // './tests/107_SallaryProfitLossAndPayroll.js',

    ];
    config.timeout = 80000;
    config.chainFail = false;
    config.browser = 'chrome';
    // config.chromeOptions = { "args" : ["--no-sandbox", "--headless", "--disable-gpu"] };
    //V.frontURL = 'http://stage.themoveboard.com:8005';                    //dev
    //V.accountURL = 'http://stage.themoveboard.com:8005/account/#/login';  //dev
    //V.adminURL = 'http://stage.themoveboard.com:8005/moveBoard/#/login';  //dev
    V.frontURL = 'http://stage.themoveboard.com:8001/front_site/';
    V.accountURL = 'http://stage.themoveboard.com:8001/account/#/login';
    V.adminURL = 'http://stage.themoveboard.com:8001/moveBoard/#/login';

    // V.frontURL = 'http://stage.themoveboard.com:8071';
    // V.accountURL = 'http://stage.themoveboard.com:8071/account/#/login';
    // V.adminURL = 'http://stage.themoveboard.com:8071/moveBoard/#/login';

//	V.frontURL = 'http://89.223.29.231:8080/front_site/';
    //V.accountURL = 'http://89.223.29.231:8080/account/#/login';
    //V.adminURL = 'http://89.223.29.231:8080/moveBoard/#/login';
    V.adminLogin = 'TestAdmin';
    V.adminPassword = 'test';
    V.adminEmail = 'bostonflat.test@mail.ru';//сюда будут прилетать все письма
    V.foremanLogin = 'TestForeman';
    V.foremanPassword = '123';
    V.foremanName = 'Test Foreman';
    V.foremanLogin2 = 'ForemanFlow1';
    V.foremanPassword2 = '123';
    V.foremanName2 = 'Foreman Flow1';
    V.helperName = 'Test Helper1';
    V.adminName = 'Test';
    V.foremanEmail = 'TestForeman@mail.com';
    V.managerName = 'emilia clark';
    V.managerFirstName = 'emilia';
    V.ForEmail = 'dd4978255@gmail.com';
    V.googleloginFor =  'dd4978255';
    V.googlePasFor =  'qwertyuio90';
    V.salesEmail = 'truks8158@gmail.com';
    V.googleloginSale =  'truks8158';
    V.googlePasSale =  'qwertyuio9';
    V.testMail = {
        login: 'bostonflat.test',
        mail: 'bostonflat.test@mail.ru',
        password: 'YLZ60tO^ycpz'
    };

};