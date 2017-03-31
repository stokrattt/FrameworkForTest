global.suite = [ './tests/CheckPermissions.js',

    './tests/CheckBillOfLadding.js',

   ];
global.chainFail = false;
global.frontURL = 'http://stage.themoveboard.com:8001/front_site/';
global.accountURL = 'http://stage.themoveboard.com:8001/account/#/login';
global.adminURL = 'http://stage.themoveboard.com:8001/moveBoard/#/login';


/*список тестов  для вставки выше
 #CheckChangeCubicFitAdmin&AddInventoriy
 #CheckFuelSurcharge
 #CheckPermissions
 #ReservationMov&Stor
 #WithoutReservationMov&Stor
 #DepartmenTest
 createLocalMoving
 #TestNotes
 CheckBillOfLadding
 saveNothing

 './tests/#ReservationMov&Stor.js', './tests/CheckPermissions.js', './tests/#WithoutReservationMov&Stor.js',
 './tests/#CheckChangeCubicFitAdmin&AddInventoriy.js', './tests/#CheckFuelSurcharge.js', './tests/#DepartmenTest.js',
 './tests/createLocalMoving.js', './tests/CheckBillOfLadding.js', './tests/saveNothing.js',
 './tests/#TestNotes.js'

 */