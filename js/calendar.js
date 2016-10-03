$(document).ready(function() {
    var schedule_data = {
        2016: {
            9: {
                10: {
                    start: '11:00',
                    end: '12:00',
                    theme: 'have lunch',
                    content: 'go to first floor to have lunch',
                    allDay: false
                }
            },
            10: {
                23: {
                    start: '18:00',
                    end: '19:00',
                    theme: 'get off work',
                    content: 'get off work and go home',
                    allDay: false
                }
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
            $date_now.text(switchMonthToEn(sun_date.getMonth()) + ' ' + sun_date.getDate() + '-' +
                switchMonthToEn(sat_date.getMonth()) + ' ' + sat_date.getDate()+ ','+
                sat_date.getFullYear());
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
                    $this.data('schedule', data[year_str][month_str][date_str]);
                    $schedule_box.text($this.data('schedule')['theme']);
                }
            }
            if (used_box < 35 && i > 34) {
                $this.hide();
            } else if (used_box > 35 && i > 34) {
                $this.show();
            }
        })
    }

    initDateBox();

    $('#calendar_day').click(function(){
        $('#calendar_month_tab, #calendar_week_tab').hide();
        fillCalendarHead('day');
        $('#calendar_day_tab').show();
    });
    $('#calendar_week').click(function(){
        $('#calendar_month_tab, #calendar_day_tab').hide();
        fillCalendarHead('week');
        $('#calendar_week_tab').show();
    });
    $('#calendar_month').click(function(){
        $('#calendar_day_tab, #calendar_week_tab').hide();
        fillCalendarHead('month');
        $('#calendar_month_tab').show();
    });
    $('.btn-right').click(function () {
        var cur_date = $('#calendar').find('.date-now').data('data');
        if(cur_date.type == 'month'){
            if (cur_date.month == 12) {
                cur_date.year = cur_date.year + 1;
                cur_date.month = 0;
            } else {
                cur_date.month = cur_date.month + 1;
            }
            cur_date.day = 1;
            fillDateBox(schedule_data)
        } else if(cur_date.type == 'week'){

        } else{

        }
    });
    $('.btn-left').click(function () {
        var cur_date = $('#calendar').find('.date-now').data('data');
        if (cur_date.month == 1) {
            cur_date.year = cur_date.year - 1;
            cur_date.month = 11;
        } else {
            cur_date.month = cur_date.month - 1;
        }
        fillDateBox(schedule_data)
    });
    $('#calendar').on('click', '.date-box', function () {
        var $this = $(this),
            $modal = $('#modal'),
            cur_date = $this.data('date'),
            cur_schedule = $this.data('schedule');
        if ($this.find('.date-num').text() != '') {
            $modal.find('.modal-header>.modal-date').text('日期' + cur_date.year_str + '年' + cur_date.month_str + '月' + cur_date.date_str + '日');
            if (cur_schedule) {
                $modal.find('.modal-body>.modal-start>input').val(cur_schedule['start']);
                $modal.find('.modal-body>.modal-end>input').val(cur_schedule['end']);
                $modal.find('.modal-body>.modal-theme>input').val(cur_schedule['theme']);
                $modal.find('.modal-body>.modal-content>textarea').val(cur_schedule['content']);
            }
            $modal.show();
        }
    });
    function initWeekBox(){
        var time_html = '', week_tab_html = '';
        for(var i=0; i<24; i++){
            time_html+='<div class="time-content"></div><div class="time-bro"></div>';
        }
        time_html = '<div><div class="time-all-day"></div>' + time_html + '</div>';
        for(var j=0; j<8; j++){
            week_tab_html = week_tab_html+time_html;
        }
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
        day_html = '<div><div class="time-all-day"></div>' + day_html + '</div>';
        day_tab_html = day_html + day_html;
        $('#day_tab_content').append(day_tab_html).find('div:first').find('.time-content').each(function(i){
            $(this).text(i>9 ? i+':00' : '0'+i+':00');
        });
        $('#day_tab_content').find('.time-all-day')[0].innerHTML = 'all day';
    }
    initDayBox();
});