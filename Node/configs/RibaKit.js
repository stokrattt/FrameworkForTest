module.exports = function(config,V) {

    config.timeout = 40000;

    config.suite = [
        './tests/56_LoadingAllSteps.js'
    ];
    config.chainFail = false;
    config.browser = 'chrome';

	//V.frontURL = 'http://stage.themoveboard.com:8005';                    //dev
	//V.accountURL = 'http://stage.themoveboard.com:8005/account/#/login';  //dev
	//V.adminURL = 'http://stage.themoveboard.com:8005/moveBoard/#/login';  //dev
	//V.frontURL = 'http://stage.themoveboard.com:8001/front_site/';        //rel
	//V.accountURL = 'http://stage.themoveboard.com:8001/account/#/login';  //rel
	//V.adminURL = 'http://stage.themoveboard.com:8001/moveBoard/#/login';  //rel
    V.frontURL = 'http://89.223.29.231:8080/front_site/';
    V.accountURL = 'http://89.223.29.231:8080/account/#/login';
    V.adminURL = 'http://89.223.29.231:8080/moveBoard/#/login';
    //V.adminLogin = 'RibaAdmin';
	V.adminLogin = 'TestAdmin';
    V.adminPassword = 'test';
    V.adminEmail = 'test.boston@mail.ru';//сюда будут прилетать все письма
    V.foremanLogin = 'TestForeman';
    V.foremanPassword = '123';
    V.foremanName = 'Test Foreman';
    V.adminName = 'Riba';
    V.foremanEmail = 'TestForeman@mail.com';
    V.managerName = 'emilia clark';
    V.managerFirstName = 'emilia';
	V.testMail = {
	    login: 'test.boston',
		mail: 'test.boston@mail.ru',
		password: 'YLZ60tO^ycpz'
	};
};


