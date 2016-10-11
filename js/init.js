$(document).ready(function() {
    //$('#map').height($('#map').width());
    /*$('#calendar').height($('#calendar').width());
    var calendar_width = $('#calendar').width();
    $('.date-box').each(function(){
        var $this = $(this);
        $this.height(calendar_width/6);
    });*/
    $('.modal-close').click(function () {
        $('#modal').hide().find('input, textarea').val('');
    });
    $('.slidebar-menu').on('mouseenter', 'li', function(){
        $(this).addClass('active');
    });
    $('.slidebar-menu').on('mouseleave', 'li', function(){
        $(this).removeClass('active');
    });
});