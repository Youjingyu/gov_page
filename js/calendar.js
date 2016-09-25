var $calendar = $('#calendar');
$('#calendar').find('.date-now').text(Date());
function initDateBox(){
    var html = '';
    var date = new Date(),
        year = date.getFullYear(),
        month = date.getMonth()+ 1,
        day = date.getDate();
    var days = getDateData(year,month,day,'days'),
        week_day_1th = getDateData(year,month,1,'week');
    console.log(days,week_day_1th);
    var month_day;
    for(var i=1; i<36; i++){
        if(i>week_day_1th && i<days+week_day_1th+1){
            month_day = i - week_day_1th;
            html+='<div class="date-box">'+month_day+'</div>';
        } else {
            html+='<div class="date-box"></div>';
        }
    }
    $('#date-content').html(html);
}
function getDateData(year, month, day, type){
    var cur_date;
    if(type == 'days'){
        cur_date = new Date(year, month, 0);
        return cur_date.getDate();
    } else if(type == 'week'){
        cur_date = new Date(month + ' ' + day + ',' + year);
        return cur_date.getDay();
    }
}
initDateBox();