$(document).ready(function() {
    var schedule_data = {
        2016: {
            9: {
                10: [{
                    start: '11:00',
                    end: '12:00',
                    theme: 'have lunch',
                    content: 'go to first floor to have lunch',
                    allDay: false
                }]
            },
            10: {
                23: [{
                    start: '18:00',
                    end: '19:00',
                    theme: 'get off work',
                    content: 'get off work and go home',
                    allDay: false
                }],
                8: [{
                    start: '18:00',
                    end: '19:00',
                    theme: 'get off work',
                    content: 'get off work and go home',
                    allDay: false
                    },
                    {
                        start: '13:00',
                        end: '15:00',
                        theme: 'get off work',
                        content: 'get off work and go home',
                        allDay: true
                    }
                ]
            }
        }
    };


    function initDateBox() {
        var html = '',
            date = new Date(),
            cur_date = {
                year: date.getFullYear(),
                month: date.getMonth(),
                day: date.getDate(),
                type: 'month'
            };
        $('#calendar').find('.date-now').data('data', cur_date);
        for (var i = 1; i < 43; i++) {
            html += '<div class="date-box"><div class="date-num"></div><div class="date-schedule"></div></div>';
        }
        $('#calendar_month_tab').find('.month-tab-content').html(html);
        fillDateBox(schedule_data);
    }

    initDateBox();

    function getDateData(date_obj, type) {
        var cur_date;
        if (type == 'days') {
            cur_date = new Date(date_obj.year, date_obj.month, 0);
            return cur_date.getDate();
        } else if (type == 'week_1th') {
            cur_date = new Date(date_obj.year, date_obj.month, 1);
            return cur_date.getDay();
        } else if(type == 'cur_week') {
            cur_date = new Date(date_obj.year, date_obj.month, date_obj.day);
            return cur_date.getDay();
        }
    }


    function fillCalendarHead(type){
        var $date_now = $('#calendar').find('.date-now'),
            cur_date = $date_now.data('data');
        if(type == 'month'){
            cur_date.type = 'month';
            $date_now.text(switchMonthToEn(cur_date.month) + '  ' + cur_date.year);
        } else if(type == 'week'){
            cur_date.type = 'week';
            var cur_week = getDateData(cur_date, 'cur_week'),
                sat_date = new Date(cur_date.year, cur_date.month, cur_date.day),
                sun_date = new Date(cur_date.year, cur_date.month, cur_date.day);
            sat_date.setDate(sat_date.getDate()+(6-cur_week));
            sun_date.setDate(sun_date.getDate()-cur_week);
            var date_now_text = '';
            if(sat_date.getFullYear() == sun_date.getFullYear()){
                date_now_text = switchMonthToEn(sun_date.getMonth()) + ' ' + sun_date.getDate() + '-';
                if(sun_date.getMonth() == sat_date.getMonth()){
                    date_now_text +=sat_date.getDate();
                } else{
                    date_now_text +=switchMonthToEn(sat_date.getMonth()) + ' '+sat_date.getDate();
                }
                date_now_text += ','+sat_date.getFullYear();
            } else{
                date_now_text = switchMonthToEn(sun_date.getMonth()) + ' ' + sun_date.getDate() + ','+sun_date.getFullYear()+
                    '-'+switchMonthToEn(sat_date.getMonth()) + ' ' + sat_date.getDate() + ','+sat_date.getFullYear();
            }
            $date_now.text(date_now_text);
            // 在week的head部分绑定日期
            var year_str,month_str,date_str,
                $week_head = $('.week-head>div');
            $('.week-tab-content>.week-tab-col').each(function(i){
                if(i>0){
                    sun_date.setDate(sun_date.getDate() + 1);
                }
                year_str = sun_date.getFullYear().toString();
                month_str = (sun_date.getMonth()+1).toString();
                date_str = sun_date.getDate().toString();
                $(this).data('date', {
                    year_str: year_str,
                    month_str: month_str,
                    date_str: date_str
                });
                $($week_head[i+1]).find('span').text(month_str+'/'+date_str);
            });
        } else{
            cur_date.type = 'day';
            $date_now.text(switchMonthToEn(cur_date.month) + '  ' + cur_date.day + ',' + cur_date.year);
        }
    }

    function switchMonthToEn(month) {
        switch (parseInt(month)) {
            case 0:
                return 'January';
                break;
            case 1:
                return 'February';
                break;
            case 2:
                return 'March';
                break;
            case 3:
                return 'April';
                break;
            case 4:
                return 'May';
                break;
            case 5:
                return 'June';
                break;
            case 6:
                return 'July';
                break;
            case 7:
                return 'August';
                break;
            case 8:
                return 'September';
                break;
            case 9:
                return 'October';
                break;
            case 10:
                return 'November';
                break;
            case 11:
                return 'December';
                break;
        }
    }

    function fillDateBox(data) {
        var cur_date = $('#calendar').find('.date-now').data('data'),
            year_str = cur_date.year.toString(),
            month_str = (cur_date.month+1).toString();
        fillCalendarHead('month');

        var days = getDateData(cur_date, 'days'),
            week_day_1th = getDateData(cur_date, 'week_1th'),
            used_box = week_day_1th + days;

        $('#calendar').find('.date-box').each(function (i) {
            var $this = $(this),
                $num_box = $this.find('.date-num'),
                $schedule_box = $this.find('.date-schedule');
            $num_box.text('');
            $schedule_box.text('');

            var isSchedule = false,
                date_str;
            if (i + 1 > week_day_1th && i < days + week_day_1th) {
                date_str = (i - week_day_1th + 1).toString();
                $this.data('date', {
                    year_str: year_str,
                    month_str: month_str,
                    date_str: date_str
                });
                $num_box.text(date_str);
                isSchedule = data[year_str] &&
                    data[year_str][month_str] &&
                    data[year_str][month_str][date_str];
                if (isSchedule) {
                    $this.data('schedule', data[year_str][month_str][date_str])
                    var schedule_arr = $this.data('schedule'),
                        schedule_text = schedule_arr[0]['theme'];
                    for(var j=1; j<schedule_arr.length; j++){
                        schedule_text+='<br>'+schedule_arr[j]['theme']
                    }
                    $schedule_box.text(schedule_text);
                }
            }
            if (used_box < 35 && i > 34) {
                $this.hide();
            } else if (used_box > 35 && i > 34) {
                $this.show();
            }
        })
    }

    function fillWeekBox(data){
        fillCalendarHead('week');
        $('.week-tab-content>.week-tab-col').each(function(){
            addScheduleLabel($(this), data);
        });
    }

    function fillDayBox(data){
        fillCalendarHead('day');
        $('.day-tab-content>.day-tab-col').each(function(){
            var $this = $(this);
            var cur_date = $('#calendar').find('.date-now').data('data'),
                year_str = cur_date.year.toString(),
                month_str = (cur_date.month+1).toString(),
                day_str = cur_date.day.toString();
            $this.data('date', {
                year_str: year_str,
                month_str: month_str,
                date_str: day_str
            });
            addScheduleLabel($this, data);
        });
    }

    function addScheduleLabel($ele, data){
        var date = $ele.data('date'),
            isSchedule = data[date.year_str] &&
                data[date.year_str][date.month_str] &&
                data[date.year_str][date.month_str][date.date_str];
        $ele.find('.week-schedule').remove();
        if(isSchedule){
            $ele.data('schedule', data[date.year_str][date.month_str][date.date_str]);
            var schedule_html = '',
                schedule_arr = $ele.data('schedule'),
                start_time, end_time, top, height;
            for(var j=0; j<schedule_arr.length; j++){
                if(schedule_arr[j]['allDay'] == false){
                    start_time = schedule_arr[j]['start'].split(':');
                    end_time = schedule_arr[j]['end'].split(':');
                    start_time[0] = Number(start_time[0]);
                    if(start_time[1] == '30'){
                        start_time[0] = Number(start_time[0]) + 0.5;
                    } else {
                        start_time[0] = Number(start_time[0]);
                    }
                    top =  (start_time[0] + 1)*4 +'%';
                    if(end_time[1] == '30'){
                        end_time[0] = Number(end_time[0]) + 0.5;
                    } else {
                        end_time[0] = Number(end_time[0]);
                    }
                    height = (end_time[0]-start_time[0])*4 + '%';

                    schedule_html += '<div class="week-schedule" style="top:'+top+';min-height:'+height+';">' +
                        '<div>'+schedule_arr[j]['start']+'-'+schedule_arr[j]['end']+'</div>'
                        +schedule_arr[j]['theme']+'</div>';
                } else{
                    schedule_html += '<div class="week-schedule" style="top: 0 ;min-height: 4%">' +
                        '<div>'+schedule_arr[j]['start']+'-'+schedule_arr[j]['end']+'</div>'
                        +schedule_arr[j]['theme']+'</div>';
                }
            }
            $ele.append(schedule_html);
        }
    }

    $('#calendar_day').click(function(){
        $('#calendar_month_tab, #calendar_week_tab').hide();
        fillDayBox(schedule_data);
        $('#calendar_day_tab').show();
    });
    $('#calendar_week').click(function(){
        $('#calendar_month_tab, #calendar_day_tab').hide();
        fillWeekBox(schedule_data);
        $('#calendar_week_tab').show();
    });
    $('#calendar_month').click(function(){
        $('#calendar_day_tab, #calendar_week_tab').hide();
        fillDateBox(schedule_data);
        $('#calendar_month_tab').show();
    });
    $('.btn-right').click(function () {
        var cur_date = $('#calendar').find('.date-now').data('data'),
            date = new Date(cur_date.year, cur_date.month, cur_date.day);
        if(cur_date.type == 'month'){
            if (cur_date.month == 11) {
                cur_date.year = cur_date.year + 1;
                cur_date.month = 0;
            } else {
                cur_date.month = cur_date.month + 1;
            }
            cur_date.day = 1;
            fillDateBox(schedule_data);
        } else if(cur_date.type == 'week'){
            date.setDate(date.getDate()+7);
            cur_date.year = date.getFullYear();
            cur_date.month = date.getMonth();
            cur_date.day = date.getDate();
            fillWeekBox(schedule_data);
        } else{
            date.setDate(date.getDate()+1);
            cur_date.year = date.getFullYear();
            cur_date.month = date.getMonth();
            cur_date.day = date.getDate();
            fillDayBox(schedule_data);
        }
    });
    $('.btn-left').click(function () {
        var cur_date = $('#calendar').find('.date-now').data('data'),
            date = new Date(cur_date.year, cur_date.month, cur_date.day);
        if(cur_date.type == 'month') {
            if (cur_date.month == 0) {
                cur_date.year = cur_date.year - 1;
                cur_date.month = 11;
            } else {
                cur_date.month = cur_date.month - 1;
            }
            cur_date.day = 1;
            fillDateBox(schedule_data);
        } else if(cur_date.type == 'week'){
            date.setDate(date.getDate()-7);
            cur_date.year = date.getFullYear();
            cur_date.month = date.getMonth();
            cur_date.day = date.getDate();
            fillWeekBox(schedule_data);
        } else{
            date.setDate(date.getDate()-1);
            cur_date.year = date.getFullYear();
            cur_date.month = date.getMonth();
            cur_date.day = date.getDate();
            fillDayBox(schedule_data);
        }
    });
    $('#calendar').on('click', '.date-box, .week-tab-col, .day-tab-col', function () {
        var $this = $(this),
            $modal = $('#modal'),
            cur_date = $this.data('date'),
            cur_schedule;
        if ($this.attr('class')=='date-box' && $this.find('.date-num').text() == '') {
            return false;
        }
        $modal.find('.modal-header>.modal-date').text('日期' + cur_date.year_str + '年' + cur_date.month_str + '月' + cur_date.date_str + '日');
        if ($this.data('schedule')) {
            cur_schedule = $this.data('schedule')[0];
            $modal.find('.modal-body>.modal-start>input').val(cur_schedule['start']);
            $modal.find('.modal-body>.modal-end>input').val(cur_schedule['end']);
            $modal.find('.modal-body>.modal-theme>input').val(cur_schedule['theme']);
            $modal.find('.modal-body>.modal-content>textarea').val(cur_schedule['content']);
        }
        $modal.show();
    });
    function initWeekBox(){
        var time_html = '', week_tab_html = '';
        for(var i=0; i<24; i++){
            time_html+='<div class="time-content"></div><div class="time-bro"></div>';
        }
        for(var j=0; j<7; j++){
            week_tab_html += '<div class="week-tab-col"><div class="time-all-day"></div>' + time_html + '</div>';
        }
        time_html = '<div><div class="time-all-day"></div>' + time_html + '</div>';
        week_tab_html = time_html + week_tab_html;
        $('#week_tab_content').append(week_tab_html).find('div:first').find('.time-content').each(function(i){
            $(this).text(i>9 ? i+':00' : '0'+i+':00');
        });
        $('#week_tab_content').find('.time-all-day')[0].innerHTML = 'all day';
    }
    initWeekBox();

    function initDayBox(){
        var day_html = '', day_tab_html = '';
        for(var i=0; i<24; i++){
            day_html+='<div class="time-content"></div><div class="time-bro"></div>';
        }
        day_tab_html = '<div><div class="time-all-day"></div>' + day_html + '</div>'+
            '<div class="day-tab-col"><div class="time-all-day"></div>' + day_html + '</div>';
        $('#day_tab_content').append(day_tab_html).find('div:first').find('.time-content').each(function(i){
            $(this).text(i>9 ? i+':00' : '0'+i+':00');
        });
        $('#day_tab_content').find('.time-all-day')[0].innerHTML = 'all day';
    }
    initDayBox();
});