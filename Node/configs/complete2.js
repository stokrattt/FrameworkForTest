module.exports = function(config,V) {
    config.suite = [

        './tests/DefaultSettings.js',
        './tests/52_AllFlatRate.js',
        './tests/33_AddCarrier.js',
        './tests/34_ContractPageCustomBlock.js',
        './tests/35_InventoryLocalMovingAndValuation.js',
        './tests/36_DatePending.js',
        './tests/37_PendingStorage.js',
        './tests/38_CustomPayrollInRequest.js',
        // './tests/TheCleaner.js',//==============================уборка=========================
        './tests/41_ContractPageSettings.js',
        './tests/43_WeightType.js',
        './tests/75_UnassTeamAfter3SignMake4Sign.js',
        './tests/46_FuelByMileage.js',
        './tests/50_AddJobToTrip.js',
        './tests/53_ManualClosingWork.js',
        './tests/54_LDQuoteAndFuel.js',
        './tests/57_UnloadingAllSteps.js',
        './tests/55_CreateFlagAndCheckOnDashboard.js',
        './tests/58_Discount.js',
        './tests/59_PayrollAddMiscCustomPayment.js',
        // './tests/TheCleaner.js',//==============================уборка=========================
        './tests/60_Excludes.js',
        './tests/62_MovingCustomBlock.js',
        './tests/63_MovingStorageCustomBlock.js',
        './tests/64_LoadingHelpCustomBlock.js',
        './tests/65_StorageEmailTemplate.js',
        './tests/66_ProfitAndLoss.js',
        './tests/67_EditRequestPayrollAdding.js',
        './tests/69_SITAddStorage.js',
        './tests/68_SITPickUpDelivery.js',
        // './tests/71_ManualEmailing.js',
        './tests/70_SITAddTripPersonallyForeman.js',
        './tests/61_SITInvoices.js',
        './tests/72_ChangingRateAfterConfirming.js',

        './tests/73_CustomTrackSpeed.js',
        // './tests/TheCleaner.js',//==============================уборка=========================
        './tests/74_AddEmailsWhenCreatReqCheckLDQuote.js',
        './tests/76_RezervedConfirmProcess.js',
        // './tests/44_CreateForemanAndAssignCheck.js',
        './tests/77_CustomTooltips.js',
        './tests/40_PayrollTableCheckSumJobs.js',


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