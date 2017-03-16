function main() {
    global.fiber = Fiber.current;
    V.client={};
    V.client.name = SFrandomBukva(6)+'_t';
    V.client.fam = SFrandomBukva(6)+'_t';
    V.client.phone = SFrandomCifra(10);
    V.client.email = SFrandomBukvaSmall(6)+'@'+SFrandomBukvaSmall(4)+'.tes';
    var URL = 'http://stage.themoveboard.com/';
    var accountURL = 'http://stage.themoveboard.com/account/#/login';
    var adminURL = 'http://stage.themoveboard.com/moveBoard/#/login';
    SFget(URL);

    FullSmallCalcAsLocal(V.client);
    console.log("заполнили форму");

    SFclick(By.xpath('//button[@ng-click="cancel()"][contains(text(),"View request")]'));
    SFsleep(2);
    SFclick(By.xpath('//label[@for="partial"]/input[@ng-model="vm.packing_service"]'));
    AccountLocalEnterAddress();
    AccountLocalAddInventory();
    AccountLocalDetails();
    SFwaitForVisible(By.xpath('//li[@id="tab_Inventory"]//i[@class="icon-check"]'));
    SFwaitForVisible(By.xpath('//li[@id="tab_Details"]//i[@class="icon-check"]'));
    AccountRememberInfoFirstTime();

    LogoutFromAccount();
    console.log('закончили с аккаунтом');

    SFget(adminURL);
    LoginToBoardAsAdmin();
    OpenRequest(V.request.Id);

    SFwaitForVisible(By.xpath('//div[@ng-click="chooseTruck(tid)"]'));
    JSstep(selectTruck);

    V.boardNumbers={};
    driver.findElement(By.xpath('//input[@ng-model="moveDateInput"]')).getAttribute("value").then(function(dateString){
        dateString=dateString.toUpperCase();
        V.boardNumbers.moveDate={};
        V.boardNumbers.moveDate.Month = SFFindMonthInString(dateString);
        V.boardNumbers.moveDate.Day = SFcleanPrice(dateString.substring(0,dateString.indexOf(',')));
        V.boardNumbers.moveDate.Year = SFcleanPrice(dateString.substring(dateString.indexOf(',')));
        console.log(V.boardNumbers.moveDate);
    });
    driver.findElement(By.xpath('//input[@ng-model="request.minimum_time.value"]')).getAttribute('value').then(function(value){
        console.log(value);
        V.boardNumbers.WorkTimeMin=SFcleanPrice(value.substring(0,value.indexOf(':')))*60
            + SFcleanPrice(value.substring(value.indexOf(':')));
    });
    driver.findElement(By.xpath('//input[@ng-model="request.maximum_time.value"]')).getAttribute('value').then(function(value){
        console.log(value);
        V.boardNumbers.WorkTimeMax=SFcleanPrice(value.substring(0,value.indexOf(':')))*60
            + SFcleanPrice(value.substring(value.indexOf(':')));
    });
    driver.findElement(By.xpath('//input[@ng-model="request.travel_time.value"]')).getAttribute('value').then(function(value){
        console.log(value);
        V.boardNumbers.TravelTime=SFcleanPrice(value.substring(0,value.indexOf(':')))*60
            + SFcleanPrice(value.substring(value.indexOf(':')));
    });
    driver.findElement(By.xpath('//input[@id="edit-movers-crew"]')).getAttribute('value').then(function(value){
        console.log(value);
        V.boardNumbers.CrewSize=SFcleanPrice(value);
    });
    driver.findElement(By.xpath('//label[contains(text(),"Trucks:")]/following-sibling::div[1]')).getText('text').then(function(text){
        console.log(text);
        V.boardNumbers.Trucks=SFcleanPrice(text);
        console.log(V.boardNumbers);
    });




    endOfTest();
}
//==================================================================================================

module.exports = main;

