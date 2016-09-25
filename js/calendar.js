function initDateBox(){
    var html = '',
        date = new Date(),
        cur_date = {
            year: date.getFullYear(),
            month: date.getMonth()+ 1,
            day: date.getDate()
        };
    $('#calendar').find('.date-now').data('data',cur_date);
    for(var i=1; i<43; i++){
        html+='<div class="date-box"></div>';
    }
    $('#date-content').html(html);
    fillDateBox();
}
function getDateData(date_obj, type){
    var cur_date;
    if(type == 'days'){
        cur_date = new Date(date_obj.year, date_obj.month, 0);
        return cur_date.getDate();
    } else if(type == 'week'){
        cur_date = new Date(date_obj.month + ' ' + 1 + ',' + date_obj.year);
        return cur_date.getDay();
    }
}
function switchMonthToEn(month){
    switch (parseInt(month)){
        case 1:
            return 'January';
            break;
        case 2:
            return 'February';
            break;
        case 3:
            return 'March';
            break;
        case 4:
            return 'April';
            break;
        case 5:
            return 'May';
            break;
        case 6:
            return 'June';
            break;
        case 7:
            return 'July';
            break;
        case 8:
            return 'August';
            break;
        case 9:
            return 'September';
            break;
        case 10:
            return 'October';
            break;
        case 11:
            return 'November';
            break;
        case 12:
            return 'December';
            break;
    }
}
function fillDateBox(){
    var $date_now = $('#calendar').find('.date-now'),
        cur_date = $date_now.data('data');
    $date_now.text(switchMonthToEn(cur_date.month)+'  '+cur_date.year);
    var days = getDateData(cur_date, 'days'),
        week_day_1th = getDateData(cur_date, 'week'),
        used_box = week_day_1th+days;
    $('#calendar').find('.date-box').each(function(i){
        var $this = $(this);
        $this.text('');
        if(i+1 > week_day_1th && i<days+week_day_1th){
            $this.text(i - week_day_1th +1);
        }
        if(used_box < 35 && i > 34){
            $this.hide();
        }else if(used_box > 35 && i > 34){
            $this.show();
        }
    })
}
initDateBox();
$('.btn-right').click(function(){
    var cur_date = $('#calendar').find('.date-now').data('data');
    if(cur_date.month == 12){
        cur_date.year = cur_date.year+1;
        cur_date.month = 1;
    } else {
        cur_date.month = cur_date.month+1;
    }
    fillDateBox()
});
$('.btn-left').click(function(){
    var cur_date = $('#calendar').find('.date-now').data('data');
    if(cur_date.month == 1){
        cur_date.year = cur_date.year-1;
        cur_date.month = 12;
    } else {
        cur_date.month = cur_date.month-1;
    }
    fillDateBox()
});