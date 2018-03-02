module.exports = function(config,V) {
    config.suite = [
        './tests/DefaultSettings.js',
        './tests/48_Review.js',
        './tests/80_OverBookingVol1.js',
        './tests/91_Overbooking.js',
        './tests/4_CheckFuelCFitInventOffCalc.js',
        './tests/19_SignForemanJobAndUnssignetJob.js',
        './tests/7_DepartmenTest.js',
        './tests/DefaultSettings.js',
        './tests/47_SendMessage.js',
        './tests/21_LDFromAdminCheckPayroll.js',
        // './tests/TheCleaner.js',//==============================уборка=========================
        './tests/6_WithoutReservationMov&Stor.js',
        './tests/SetReservationPrice.js',
        './tests/9_TestNoteSaveNothing.js',
        './tests/1_AllLocalMoving.js',
        './tests/52_AllFlatRate.js',

        './tests/2_CheckPermissions.js',
        // './tests/TheCleaner.js',//==============================уборка=========================
        './tests/DefaultSettings.js',
        './tests/10_ComparQuotLocalCheckBilOfLad.js',
        './tests/12_CreateMov&StorFromFrontDownAndCompare.js',
        './tests/14_LoadingHelpTopForm.js',
        './tests/SetReservationPrice.js',
        // './tests/TheCleaner.js',//==============================уборка=========================
       // './tests/15_OvernightDownForm.js',
        './tests/13_UnloadingHelpTopForm.js',
        './tests/SetReservationPrice.js',
        './tests/16_UnloadHelpDownFrontCheckRateClosing.js',
        './tests/17_LoadHelpDownFormAndEquipFee.js',
        './tests/DefaultSettings.js',
        './tests/20_LDTopForm.js',
        './tests/118_CommercialPackingDayCalculatorOff.js',
        // './tests/TheCleaner.js',//==============================уборка=========================
        './tests/22_WeDontMoveToThisState.js',
        './tests/32_AllMovingWithStorage.js',
        './tests/25_ChangeDateDispatch.js',
        './tests/26_CloneRequest.js',
        './tests/27_Receipt.js',
        './tests/29_CheckFewMoverForUserCalcOffManual.js',
        // './tests/TheCleaner.js',//==============================уборка=========================
        './tests/30_StorageTenant.js',
        './tests/31_FlateRateBooking.js', /////////////////////////
        './tests/88_FlatRateHandClosing.js',
        './tests/49_FlatRateLocalMoveCheckSchedule.js',
        './tests/111_ZIPCode.js',
        './tests/116_DeleteComissionsPayroll.js',
        './tests/51_ServiceTypesOnOff.js',
        './tests/24_FiltrationMoveDateCreateDate.js',
    ];
    config.timeout = 90000;
    config.chainFail = false;
    config.browser = 'chrome';
    config.chromeOptions = { "args" : ["--no-sandbox", "--headless", "--disable-gpu"] };
    // V.frontURL = 'http://stage.themoveboard.com:8005';                    //dev
    // V.accountURL = 'http://stage.themoveboard.com:8005/account/#/login';  //dev
    // V.adminURL = 'http://stage.themoveboard.com:8005/moveBoard/#/login';  //dev
    V.frontURL = 'http://test1.stage.themoveboard.com:81/front_site/';
    V.accountURL = 'http://test1.stage.themoveboard.com:81/account/#/login';
    V.adminURL = 'http://test1.stage.themoveboard.com:81/moveBoard/#/login';
    V.adminLogin = 'TestAdmin';
    V.adminPassword = 'test';
    V.adminEmail = 'test.boston@mail.ru';//сюда будут прилетать все письма
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
    V.foremanLoginFlatRate = 'FlatRateForeman';
    V.foremanPassword = '123';
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
