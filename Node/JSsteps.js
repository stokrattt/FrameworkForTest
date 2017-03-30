global.Click4DaysNewCalendar = function () {
    var monthNumbers = {
        JANUARY: 0,
        FEBRUARY: 1,
        MARCH: 2,
        APRIL: 3,
        MAY: 4,
        JUNE: 5,
        JULY: 6,
        AUGUST: 7,
        SEPTEMBER: 8,
        OCTOBER: 9,
        NOVEMBER: 10,
        DECEMBER: 11
    };

    function checkMonth() {
        while (Number(($('div.picker--opened div.picker__year').get(0).innerHTML)) < future.getFullYear()) {
            console.log('current Year ' + $('div.picker--opened div.picker__year').get(0).innerHTML);
            $('div.picker--opened div.picker__nav--next').click();
        }

        while (Number(($('div.picker--opened div.picker__year').get(0).innerHTML)) > future.getFullYear()) {
            console.log('current Year ' + $('div.picker--opened div.picker__year').get(0).innerHTML);
            $('div.picker--opened div.picker__nav--prev').click();
        }
        console.log('current Year ' + $('div.picker--opened div.picker__year').get(0).innerHTML);

        while (monthNumbers[$('div.picker--opened div.picker__month').get(0).innerHTML.toUpperCase()] < future.getMonth()) {
            console.log('current Month ' + $('div.picker--opened div.picker__month').get(0).innerHTML);
            $('div.picker--opened div.picker__nav--next').click();
        }
        while (monthNumbers[$('div.picker--opened div.picker__month').get(0).innerHTML.toUpperCase()] > future.getMonth()) {
            console.log('current Month ' + $('div.picker--opened div.picker__month').get(0).innerHTML);
            $('div.picker--opened div.picker__nav--prev').click();
        }
    }

    var now = new Date();
    var msInDay = 86400000;
    var future = new Date(now.getTime() + msInDay * 4);//4

    var i = 5;
    checkMonth();
    while ($("div.picker--opened table.picker__table>tbody>tr>td>div.picker__day--infocus.calendarDay5:contains('" + future.getDate() + "'):first").length !== 0) {
        future = new Date(now.getTime() + msInDay * i);
        checkMonth();
        i++;
    }

    console.log("div.picker--opened table.picker__table>tbody>tr>td>div.picker__day--infocus:contains('" + future.getDate() + "'):first");
    $("div.picker--opened table.picker__table>tbody>tr>td>div.picker__day--infocus:contains('" + future.getDate() + "'):first").click();

    return {
        Year: future.getFullYear(),
        Month: future.getMonth(),
        Day: future.getDate()
    };
}.toString().substring(12);

global.Click8DaysNewCalendar = function () {
    var monthNumbers = {
        JANUARY: 0,
        FEBRUARY: 1,
        MARCH: 2,
        APRIL: 3,
        MAY: 4,
        JUNE: 5,
        JULY: 6,
        AUGUST: 7,
        SEPTEMBER: 8,
        OCTOBER: 9,
        NOVEMBER: 10,
        DECEMBER: 11
    };

    function checkMonth() {
        while (Number(($('div.picker--opened div.picker__year').get(0).innerHTML)) < farFuture.getFullYear()) {
            console.log('current Year ' + $('div.picker--opened div.picker__year').get(0).innerHTML);
            $('div.picker--opened div.picker__nav--next').click();
        }

        while (Number(($('div.picker--opened div.picker__year').get(0).innerHTML)) > farFuture.getFullYear()) {
            console.log('current Year ' + $('div.picker--opened div.picker__year').get(0).innerHTML);
            $('div.picker--opened div.picker__nav--prev').click();
        }
        console.log('current Year ' + $('div.picker--opened div.picker__year').get(0).innerHTML);

        while (monthNumbers[$('div.picker--opened div.picker__month').get(0).innerHTML.toUpperCase()] < farFuture.getMonth()) {
            console.log('current Month ' + $('div.picker--opened div.picker__month').get(0).innerHTML);
            $('div.picker--opened div.picker__nav--next').click();
        }
        while (monthNumbers[$('div.picker--opened div.picker__month').get(0).innerHTML.toUpperCase()] > farFuture.getMonth()) {
            console.log('current Month ' + $('div.picker--opened div.picker__month').get(0).innerHTML);
            $('div.picker--opened div.picker__nav--prev').click();
        }
    }

    var now = new Date();
    var msInDay = 86400000;
    var farFuture = new Date(now.getTime() + msInDay * 8);//8

    var i = 9;
    checkMonth();
    while ($("div.picker--opened table.picker__table>tbody>tr>td>div.picker__day--infocus.calendarDay5:contains('" + farFuture.getDate() + "'):first").length !== 0) {
        farFuture = new Date(now.getTime() + msInDay * i);
        checkMonth();
        i++;
    }

    console.log("div.picker--opened table.picker__table>tbody>tr>td>div.picker__day--infocus:contains('" + farFuture.getDate() + "'):first");
    $("div.picker--opened table.picker__table>tbody>tr>td>div.picker__day--infocus:contains('" + farFuture.getDate() + "'):first").click();

    return {
        Year: farFuture.getFullYear(),
        Month: farFuture.getMonth(),
        Day: farFuture.getDate()
    };
}.toString().substring(12);

global.Click4DaysCalendar = function () {
    var now = new Date();
    var msInDay = 86400000;
    var future = new Date(now.getTime() + msInDay * 4);//4

    var date = future.getDate();
    var i = 5;
    while ($("tr>td[data-month='" + future.getMonth() + "'][data-year='" + future.getFullYear() + "'].Block:contains('" + date + "') > a:first").length !== 0) {
        future = new Date(now.getTime() + msInDay * i);
        date = future.getDate();
        i++;
    }

    console.log("tr>td[data-month='" + future.getMonth() + "'][data-year='" + future.getFullYear() + "']:contains('" + date + "') > a:first");
    $("tr>td[data-month='" + future.getMonth() + "'][data-year='" + future.getFullYear() + "']:contains('" + date + "') > a:first").trigger('click');

    return {
        futureYear: future.getFullYear(),
        futureMonth: future.getMonth(),
        futureDay: future.getDate()
    };

}.toString().substring(12);

global.Click8DaysCalendar = function () {
    var now = new Date();
    var msInDay = 86400000;
    var farFuture = new Date(now.getTime() + msInDay * 8);//8

    var date = farFuture.getDate();
    var i = 9;
    while ($("tr>td[data-month='" + farFuture.getMonth() + "'][data-year='" + farFuture.getFullYear() + "'].Block:contains('" + date + "') > a:first").length !== 0) {
        farFuture = new Date(now.getTime() + msInDay * i);
        date = farFuture.getDate();
        i++;
    }

    console.log("tr>td[data-month='" + farFuture.getMonth() + "'][data-year='" + farFuture.getFullYear() + "']:contains('" + date + "') > a:first");
    $("tr>td[data-month='" + farFuture.getMonth() + "'][data-year='" + farFuture.getFullYear() + "']:contains('" + date + "') > a:first").trigger('click');

    return {
        farFutureYear: farFuture.getFullYear(),
        farFutureMonth: farFuture.getMonth(),
        farFutureDay: farFuture.getDate()
    };

}.toString().substring(12);

global.selectTruck = function () {
    var selected = false;
    var trucks = 'div.truckid:visible';
    var lines = 'div.dhx_matrix_line:visible';
    var timeZone = 0;
    for (var number = 0, count = $(trucks).length; (number < count && !selected); number++) {
        var len = $(lines + ':eq("' + number + '") > span').length;
        if (len < (2 + timeZone)) {
            //$('#edit-moving-from').val('line '+number+' spans '+len);
            $(trucks + ':eq("' + number + '")').click();
            selected = true;
        }
    }
    if (!selected) {
        $('[field="request.start_time1"]').val("07:00 PM");
        $('[field="request.start_time1"]').trigger('change');
        timeZone++;
        for (var number = 0, count = $(trucks).length; (number < count && !selected); number++) {
            var len = $(lines + ':eq("' + number + '") > span').length;
            if (len < (2 + timeZone)) {
                //$('#edit-moving-from').val('line '+number+' spans '+len);
                $(trucks + ':eq("' + number + '")').click();
                selected = true;
            }
        }
    }
    return selected ? number : -1;
}.toString().substring(12);

global.getServicesCostAccount = function () {
    var a = $('div[ng-repeat="service in vm.extraServices"]').length;
    if (a > 1) {
        return $('div[ng-repeat="service in vm.extraServices"]:last').next().text();
    } else if (a==1)  {
        return $('div[ng-repeat="service in vm.extraServices"]:last').text();
    } else {return '$0'}
}.toString().substring(12);
global.getPackingsCostAccount = function () {
    var a = $('div[ng-repeat="packing in vm.packingSettings"]').length;
    if (a > 1) {
        return $('div[ng-repeat="packing in vm.packingSettings"]:last').next().text();
    } else if (a==1)  {
        return $('div[ng-repeat="packing in vm.packingSettings"]:last div:last').text();
    } else {return '$0'}
}.toString().substring(12);
global.CheckSumsInContract = function () {
    var HowToLook = function (text) {
        console.log('грязный текст:'+text);
        var cifra='';
        var index=text.indexOf('$');
        if (index!==-1) {
            var i=index+1;
            while ( ( (!isNaN(text[i])) || (text[i]==='.') || (text[i]===',') || (text[i]===' ') ) && (i<text.length) ){
                if (text[i]!==',') cifra+=text[i];
                i++;
            }
            cifra=Number(cifra);
        } else {
            cifra=Number(text);
        }
        console.log('цифра:'+cifra);
        return cifra;
    };

    var sumPacking=0;
    var packingCost = 'tbody:has(tr>th>p:contains("packing and unpacking"))>tr[ng-repeat]>td:last-child';
    console.log('нашли строк packing: '+$(packingCost).length);
    var len=$(packingCost).length;
    for (var i=0; i<len; i++){
        var currentRow=HowToLook( $(packingCost).get(i).innerHTML );
        sumPacking+=currentRow;
    }

    var sumServices=0;
    var servicesCost = 'tbody:has(tr>th>p:contains("ADDITIONAL SERVICE CHARGE"))>tr[ng-repeat]>td:last-child>input';
    len = $(servicesCost).length;
    console.log('нашли строк services: '+len);
    for (i=0; i<len; i++){
        var currentRow=HowToLook( $(servicesCost).get(i).value );
        sumServices+=currentRow;
    }

    var totalPacking = HowToLook($('tr:has(td>p:contains("total packing charges"))>td:last-child').text());
    var totalServices = HowToLook($('tr:has(td>p:contains("total Extra charges")) td:last-child').text());

    var totalCost = HowToLook($('tr:has(td>p:contains("total cost:")) td:last-child').text());

    return {sumPacking:sumPacking, totalPacking:totalPacking, sumServices:sumServices, totalServices:totalServices};
}.toString().substring(12);