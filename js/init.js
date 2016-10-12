$(document).ready(function() {
    //$('#map').height($('#map').width());
    /*$('#calendar').height($('#calendar').width());
    var calendar_width = $('#calendar').width();
    $('.date-box').each(function(){
        var $this = $(this);
        $this.height(calendar_width/6);
    });*/
    $('.slidebar-menu').on('mouseenter', 'li', function(){
        $(this).addClass('active');
    }).on('mouseleave', 'li', function(){
        $(this).removeClass('active');
    });
    $('.function-body').on('mouseenter', '.function-item', function(){
        $(this).addClass('item-active');
    }).on('mouseleave', '.function-item', function(){
        $(this).removeClass('item-active');
    });
});