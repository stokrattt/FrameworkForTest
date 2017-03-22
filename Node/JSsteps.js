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