exports.Click4DaysNewCalendar = function () {
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

exports.Click8DaysNewCalendar = function () {
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

exports.Click4DaysCalendar = function () {
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
        Year: future.getFullYear(),
        Month: future.getMonth(),
        Day: future.getDate()
    };

}.toString().substring(12);

exports.Click31DaysCalendar = function () {
    var now = new Date();
    var msInDay = 86400000;
    var future = new Date(now.getTime() + msInDay * 31);//31

    var date = future.getDate();
    var i = 32;
    while ($("tr>td[data-month='" + future.getMonth() + "'][data-year='" + future.getFullYear() + "'].Block:contains('" + date + "') > a:first").length !== 0) {
        future = new Date(now.getTime() + msInDay * i);
        date = future.getDate();
        i++;
    }

    console.log("tr>td[data-month='" + future.getMonth() + "'][data-year='" + future.getFullYear() + "']:contains('" + date + "') > a:first");
    $("tr>td[data-month='" + future.getMonth() + "'][data-year='" + future.getFullYear() + "']:contains('" + date + "') > a:first").trigger('click');

    return {
        Year: future.getFullYear(),
        Month: future.getMonth(),
        Day: future.getDate()
    };

}.toString().substring(12);

exports.Click8DaysCalendar = function () {
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
        Year: farFuture.getFullYear(),
        Month: farFuture.getMonth(),
        Day: farFuture.getDate()
    };

}.toString().substring(12);

exports.ClickCustomDaysCalendar = function(period) {
    var f=function() {
        var period='##';
        var now = new Date();
        var msInDay = 86400000;
        var farFuture = new Date(now.getTime() + msInDay * period);

        var date = farFuture.getDate();
        var i = period+1;
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
        var checkMonth = function(){
            while (monthNumbers[$('span.ui-datepicker-month:first').text().toUpperCase()]<farFuture.getMonth()) {
                $('a.ui-datepicker-next').click();}
        };
        checkMonth();
        while ($("tr>td[data-month='" + farFuture.getMonth() + "'][data-year='" + farFuture.getFullYear() + "'].Block:contains('" + date + "') > a:first").length !== 0) {
            console.log('смотрим '+farFuture);
            checkMonth();
            farFuture = new Date(now.getTime() + msInDay * i);
            date = farFuture.getDate();
            i++;
        }
        checkMonth();

        console.log("tr>td[data-month='" + farFuture.getMonth() + "'][data-year='" + farFuture.getFullYear() + "']:contains('" + date + "') > a:first");
        $("tr>td[data-month='" + farFuture.getMonth() + "'][data-year='" + farFuture.getFullYear() + "']:contains('" + date + "') > a:first").trigger('click');

        return {
            Year: farFuture.getFullYear(),
            Month: farFuture.getMonth(),
            Day: farFuture.getDate()
        };

    }.toString().substring(12);
    return f.replace(/##/, period);
};

exports.selectTruck = function (hours) {
    var f = function () {
        var hours = '##';
        var onlyDig = function (str) {
            var res = '';
            for (var i = 0; i < str.length; i++) {
                if ((!isNaN(str[i])) || (str[i] == '.')) {
                    res += str[i]
                }
            }
            return parseFloat(res);
        };
        var selected = false;
        var trucks = 'div.truckid:visible';
        var startDay = 7.5 * 50;
        var endDay = 24 * 50;
        var needWidth = hours * 50 + 100;
        console.log('need ' + needWidth);

        for (var number = 0, count = $(trucks).length; (number < count && !selected); number++) {
            var arrayChaos = $('div.dhx_matrix_line:visible:eq("' + number + '") span[ng-repeat="current in parklot[tid] track by $index"],' +
                'div.dhx_matrix_line:visible:eq("' + number + '") [ng-repeat="current in fpl[tid] track by $index"],' +
                'div.dhx_matrix_line:visible:eq("' + number + '") [ng-repeat="current in unconparklot[tid]"]');
            var array=[];
            var ChaosEnd=startDay;
            for (var m=0; m<arrayChaos.length; m++){
                var element={};
                element.start = onlyDig(getComputedStyle(arrayChaos.get(m)).left);
                element.end = element.start + onlyDig(getComputedStyle(arrayChaos.get(m)).width);
                if (element.end > ChaosEnd){ChaosEnd=element.end;}
                array.push(element);
            }
            console.log('энд '+ChaosEnd);
            var intStart=startDay;
            var intEnd=startDay;
            var p = startDay;
            var inChaos=false;
            console.log('truck ' + number);
            console.log(arrayChaos);
            console.log(array);
            while ((p <= endDay)&&(!selected)) {
                console.log('свободно с '+p);
                do {
                    inChaos = false;
                    for (var r = 0; r < array.length; r++) {
                        if ((p >= array[r].start) && (p <= array[r].end)) {
                            inChaos = true;
                        }
                    }
                    p++;
                } while ((!inChaos) && (p <= endDay));
                console.log('до '+p);
                if (p - intStart >= needWidth) {
                    console.log('подошло');
                    intStart += 25;
                    var startH = Math.floor(intStart / 50);
                    var startM = Math.floor(intStart % 50 / 5 * 6 / 30) * 30;
                    var startTime = startH + ':' + (startM==0 ? '00': startM);
                    if (startH >= 12) {
                        startTime += ' PM';
                    } else {
                        startTime += ' AM';
                    }
                    console.log('время ' + startTime);
                    $('[field="request.start_time1"]').val(startTime);
                    $('[field="request.start_time1"]').change();
                    $(trucks + ':eq("' + number + '")').click();
                    selected = true;
                } else do {
                    inChaos = false;
                    for (var r = 0; r < array.length; r++) {
                        if ((p >= array[r].start) && (p <= array[r].end)) {
                            inChaos = true;
                        }
                    }
                    p++;
                } while ((inChaos) && (p <= endDay));
                console.log('занято до'+p);
                intStart=p;
            }
        }
        return selected ? number : -1;
    }.toString().substring(12);
    return f.replace(/##/, hours);
};

exports.findAllDetermPrices = function (target){
	var f = function () {
		var target = "##";
		var result = [];
		var len = $('input[ng-model*="vm.ratesSettings"]').length;
		var i;
		for (i = 0; i < len; i++) {
			var element = $('input[ng-model*="vm.ratesSettings"]:eq(' + i + ')');
			if (element.val() == target) {
				result.push(i);
			}
		}
		return result;
	}.toString().substring(12);
	return f.replace(/##/, target);
};

exports.getServicesCostAccount = function () {
    var a = $('div[ng-repeat="service in vm.extraServices"]').length;
    if (a > 1) {
        return $('div[ng-repeat="service in vm.extraServices"]:last').next().text();
    } else if (a==1)  {
        return $('div[ng-repeat="service in vm.extraServices"]:last').text();
    } else {return '$0'}
}.toString().substring(12);

exports.getPackingsCostAccount = function () {
    var a = $('div[ng-repeat="packing in vm.packingSettings"]').length;
    if (a > 1) {
        return $('div[ng-repeat="packing in vm.packingSettings"]:last').next().text();
    } else if (a==1)  {
        return $('div[ng-repeat="packing in vm.packingSettings"]:last div:last').text();
    } else {return '$0'}
}.toString().substring(12);

exports.checkUserLocalDispach = function(name){
    var f=function() {
        var name = "##";
        var a = $('option[ng-repeat="(uid, user) in vm.users.foreman | orderBy:\'name\'"]:contains('+name+')').length;
        var b = $('option[ng-repeat="helper in helpers   | orderBy:\'name\'"]:contains("helpertest testhelper")').length;
        var c = $('option[ng-repeat="helper in helpers   | orderBy:\'name\'"]:contains("drivertest testdriver")').length;
        return {
            Foreman:a,
            Helper:b,
            Driver:c
        };
    }.toString().substring(12);
    return f.replace(/##/, name);
};

exports.sendRequestNoParam = function(type, url){
    var f=function() {
        var type='##';
        var url='##';
        var request = new XMLHttpRequest();
        request.open(type, url, true);
        request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        request.send();
    }.toString().substring(12);
    return f.replace(/##/, type).replace(/##/, url);
};
exports.payrollTableSum = function () {
    var clearText = function(dirtyText){return dirtyText.replace (/\$|,/gi,  ''); };
    var css = '#print-area';
    var selector = css+' td:last-child';
    var sum = 0;
    var len =  $(selector).length-1;
    console.log('len '+len);
    for(var i=0; i<len; i++){
        console.log(Number(clearText($(selector)[i].innerHTML)));
        sum=sum+Number(clearText($(selector)[i].innerHTML));
    }
    sum = Math.round(sum*100)/100;
    console.log('sum mus be '+Number(clearText($(selector)[len].innerHTML)));
    var balTop = Number(clearText($('div.total-payroll-panel  div.total-title:contains("Balance")').next().text()));
    console.log('сверху написано '+balTop);
    return {sum:sum, balTop:balTop};
}.toString().substring(12);


exports.payrollTableMainPage = function (field, title) {
    var f = function () {

        var field = "##";
        var title = "##";
        var clearText = function (dirtyText) {
            return dirtyText.replace(/\$|,/gi, '');
        };
        var css = '#print-area';
        var selector = css + ' td[ng-show="columns.fields[\''+field+'\'].selected"]';
        var sum = 0;
        var len = $(selector).length - 1;
        console.log('len ' + len);
        for (var i = 0; i < len; i++) {
            console.log(Number(clearText($(selector)[i].innerHTML)));
            sum = sum + Number(clearText($(selector)[i].innerHTML));
        }
        sum = Math.round(sum * 100) / 100;
        console.log('sum mus be ' + Number(clearText($(selector)[len].innerHTML)));
        var balTop = Number(clearText($('div.total-payroll-panel  div.total-title:contains('+title+'):eq(0)').next().text()));
        console.log('сверху написано ' + balTop);
        return {sum:sum, balTop:balTop};
    }.toString().substring(12);
    return f.replace(/##/, field).replace(/##/, title);
};


exports.CheckSumsInContract = function () {
    var HowToLook = function (text) {
        console.log('грязный текст:'+text);
        var cifra=parseFloat(text.replace(/[^\d'.']/g,''));
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

exports.Payroll_GetForemanTotalForRequest = function(Id){
    return 'return $("tr:has(td[ng-click=\\\"editRequest(\'a_job_misc\', id, \'request\')\\\"]:contains(\'' +
    Id + '\'))' +
    ' td[ng-click=\\\"editRequest(\'total\', id, \'request\')\\\"]").text()';
};

exports.Payroll_GetSaleTotalForRequest = function (Id){
    return 'return $("tr:has(td[ng-click=\\\"editRequest(\'a_job_misc\', id, \'request\')\\\"]:contains(\'' +
    Id + '\'))' +
    ' td[ng-click=\\\"editRequest(\'total\', id, \'request\')\\\"]").text()';
};