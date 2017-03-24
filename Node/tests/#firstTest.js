function main(){
    global.fiber = Fiber.current;

    SFget('http://stage.themoveboard.com/moveBoard/#/login');
    LoginToBoardAsAdmin();
    OpenRequest(68251);
    Debug.pause();
    JSstep(selectTruck);

    RememberDigitsRequestBoard();

    IWant(VToEqual,V.boardNumbers.Fuel, 82.6,'Фуель не совпал');



    endOfTest();
}

//==================================================================================================
module.exports = main;
