module.exports = function(config,V) {
    config.suite = [
       './tests/DefaultSettings.js',
        './tests/24_FiltrationMoveDateCreateDate.js',
        './tests/48_Review.js',
       './tests/80_OverBookingVol1.js',
        './tests/91_Overbooking.js',
        './tests/4_CheckFuelCFitInventOffCalc.js',
        './tests/19_SignForemanJobAndUnssignetJob.js',
        './tests/7_DepartmenTest.js',
        './tests/DefaultSettings.js',
        './tests/47_SendMessage.js',
        // './tests/TheCleaner.js',//==============================уборка=========================
        './tests/6_WithoutReservationMov&Stor.js',
        './tests/SetReservationPrice.js',
        './tests/9_TestNoteSaveNothing.js',
        './tests/1_AllLocalMoving.js',
        './tests/2_CheckPermissions.js',
       // './tests/TheCleaner.js',//==============================уборка=========================
        './tests/DefaultSettings.js',
        './tests/10_ComparQuotLocalCheckBilOfLad.js',
        './tests/12_CreateMov&StorFromFrontDownAndCompare.js',
        './tests/14_LoadingHelpTopForm.js',
        './tests/SetReservationPrice.js',
       // './tests/TheCleaner.js',//==============================уборка=========================
        './tests/15_OvernightDownForm.js',
        './tests/13_UnloadingHelpTopForm.js',
        './tests/SetReservationPrice.js',
        './tests/16_UnloadHelpDownFrontCheckRateClosing.js',
        './tests/17_LoadHelpDownFormAndEquipFee.js',
        './tests/DefaultSettings.js',
        './tests/20_LDTopForm.js',
        // './tests/TheCleaner.js',//==============================уборка=========================
        './tests/22_WeDontMoveToThisState.js',

        './tests/25_ChangeDateDispatch.js',
        './tests/27_Receipt.js',
        './tests/29_CheckFewMoverForUserCalcOffManual.js',
        // './tests/TheCleaner.js',//==============================уборка=========================
        './tests/30_StorageTenant.js',
        './tests/31_FlateRateBooking.js', /////////////////////////
        './tests/88_FlatRateHandClosing.js',
        './tests/49_FlatRateLocalMoveCheckSchedule.js',
        './tests/52_AllFlatRate.js',
        './tests/32_AllMovingWithStorage.js',
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
        './tests/54_LDQuoteAndFuelAndLongCarry.js',

        './tests/55_CreateFlagAndCheckOnDashboard.js',
        './tests/58_Discount.js',
        // './tests/59_PayrollAddMiscCustomPayment.js',
       // './tests/TheCleaner.js',//==============================уборка=========================
        './tests/60_Excludes.js',

        './tests/62_MovingCustomBlock.js',
        './tests/63_MovingStorageCustomBlock.js',
        // './tests/64_LoadingHelpCustomBlock.js',
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
        './tests/78_CheckRateAndTrucks.js',
        // './tests/40_PayrollTableCheckSumJobs.js',
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
        './tests/DefaultSettings.js',
        './tests/103_AdditionalInventoryForLocalMove.js',
        './tests/96_CommercialMoveFromFront.js',
        './tests/97_OutgoingEmailAndSignature.js',
        './tests/99_PendingInfoInventoryTotal.js',
        './tests/101_CustomCommMoveWithInventory.js',
        './tests/98_RemindersForOtherPerson.js',
        // './tests/57_UnloadingAllSteps.js',
        './tests/100_LeadScoring.js',
        './tests/105_ChangeMinCFAndDriverPayroll.js',
        './tests/109_SITBalance.js',
        // './tests/102_InhomeEstimate.js',
        './tests/104_AddBedroomAddRoom.js',
        './tests/106_AdditionalContact.js',
        './tests/116_DeleteComissionsPayroll.js',
        './tests/110_LeadScoringAdmin.js',
        './tests/112_ExtraDropLocalMove.js',
        './tests/119_LDDiscount.js',
        './tests/118_CommercialPackingDayCalculatorOff.js',
        './tests/115_LDCommercialMoveSizeInSIT.js',
        './tests/95_Statistic.js',
        './tests/113_CheckAdminPermissions.js',
        './tests/120_LDFlag.js',
        './tests/121_FAQ.js',
        './tests/21_LDFromAdminCheckPayroll.js',
        './tests/117_HomeEstimatePortal.js',
        './tests/111_ZIPCode.js',

        './tests/122_MovingAndMovStorageCalcOffCheck.js',
        './tests/123_DraftCheckRateDoubleDriveTime.js',
        './tests/DefaultSettings.js',
        './tests/125_PendingInfoOn-Off.js',
        './tests/51_ServiceTypesOnOff.js',

        './tests/56_LoadingAllSteps.js',
        './tests/26_CloneRequest.js',

        // './tests/107_SallaryProfitLossAndPayroll.js',

    ];
    config.timeout = 50000;
    config.chainFail = false;
	config.browser = 'chrome';
    // config.chromeOptions = { "args" : ["--no-sandbox", "--headless", "--disable-gpu"] };
	//V.frontURL = 'http://stage.themoveboard.com:8005';                    //dev
	//V.accountURL = 'http://stage.themoveboard.com:8005/account/#/login';  //dev
	//V.adminURL = 'http://stage.themoveboard.com:8005/moveBoard/#/login';  //dev
	V.frontURL = 'http://stage.stage.themoveboard.com:91';
	V.accountURL = 'http://stage.stage.themoveboard.com:91/account/#/login';
	V.adminURL = 'http://stage.stage.themoveboard.com:91/moveBoard/#/login';

    // V.frontURL = 'http://stage.themoveboard.com:8071';
    // V.accountURL = 'http://stage.themoveboard.com:8071/account/#/login';
    // V.adminURL = 'http://stage.themoveboard.com:8071/moveBoard/#/login';

//	V.frontURL = 'http://89.223.29.231:8080/front_site/';
	//V.accountURL = 'http://89.223.29.231:8080/account/#/login';
	//V.adminURL = 'http://89.223.29.231:8080/moveBoard/#/login';
	V.adminLogin = 'TestAdmin';
	V.adminPassword = 'test';
	V.adminEmail = 'test.boston@mail.ru';//сюда будут прилетать все письма
	V.foremanLogin = 'TestForeman';
    V.foremanLoginFlatRate = 'FlatRateForeman';
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
    V.ForEmail = 'foremanforeman137@gmail.com';
    V.googleloginFor =  'foremanforeman137';
    V.googlePasFor =  'zaqwsxcv';
    V.salesEmail = 'truks8158@gmail.com';
    V.googleloginSale =  'truks8158';
    V.googlePasSale =  'qwertyuio9';
    V.testMail = {
		login: 'bostonflat.test',
		mail: 'bostonflat.test@mail.ru',
		password: 'YLZ60tO^ycpz'
	};

};
