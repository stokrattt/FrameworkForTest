module.exports = function (config, V) {

	config.timeout = 120000;

	config.suite = [
		'./tests/19_SignForemanJobAndUnssignetJob.js'
		// './tests/31_FlateRateBooking.js
	];
	config.chainFail = false;
	config.browser = 'chrome';

	//V.frontURL = 'http://dev.stage.themoveboard.com:90/';                    //dev
	//V.accountURL = 'http://dev.stage.themoveboard.com:90/account/#/login';  //dev
	//V.adminURL = 'http://dev.stage.themoveboard.com:90/moveBoard/#/login';  //dev
	V.frontURL = 'http://stage.stage.themoveboard.com:91/';        //stage
	V.accountURL = 'http://stage.stage.themoveboard.com:91/account/#/login';  //stage
	V.adminURL = 'http://stage.stage.themoveboard.com:91/moveBoard/#/login';  //stage
	//V.adminURL = 'http://moversboard.net:8051/moveBoard/#/login';
	//V.accountURL = 'http://moversboard.net:8051/account/#/login';
	//V.adminLogin = 'RibaAdmin';
	//V.adminLogin = 'JACK_RATE';
	//V.adminPassword = '123';
	V.adminLogin = 'AnnS';
	V.adminPassword = '1234';
	V.adminEmail = 'test.boston@mail.ru';//сюда будут прилетать все письма
	V.foremanLogin = 'TestForeman';
	V.foremanPassword = '123';
	V.foremanName = 'Test Foreman';
	V.adminName = 'Riba';
	V.foremanEmail = 'TestForeman@mail.com';
	V.salesName = "emilia clarck";
	V.salesLogin ="emilia";
	V.salesPassword ="123";
	V.foremanName2 = 'Foreman Flow1';
	V.foremanLogin2 = 'ForemanFlow1';
	V.foremanPassword2 = '123';
	V.managerFirstName = 'emilia';
	V.foremanLoginFlatRate = 'FlatRateForeman';
	V.foremanPassword = '123';
	V.managerName = 'emilia clark';
	V.ForEmail = 'dd4978255@gmail.com';
	V.testMail = {
		login: 'test.boston',
		mail: 'test.boston@mail.ru',
		password: 'YLZ60tO^ycpz'
	};
};
