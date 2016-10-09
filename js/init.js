$(document).ready(function() {
    (function (doc, win) {
        var docEl = doc.documentElement,
            //resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
            recalc = function () {
                var clientWidth = docEl.clientWidth;
                if (!clientWidth) return;
                docEl.style.fontSize = 12.5 * (clientWidth / 1200) + 'px';
            };
        if (doc.addEventListener){
            win.addEventListener('resize', recalc, false);
            //doc.addEventListener('DOMContentLoaded', recalc, false);
        } else{
            win.attachEvent('onresize', recalc);
            //doc.attachEvent('onDOMContentLoaded', recalc);
        }
        recalc();
    })(document, window);
    $('#map').height($('#map').width());
    $('#calendar').height($('#calendar').width());
    var calendar_width = $('#calendar').width();
    $('.date-box').each(function(){
        var $this = $(this);
        $this.height(calendar_width/6);
    });
    $('.modal-close').click(function () {
        $('#modal').hide().find('input, textarea').val('');
    });
});