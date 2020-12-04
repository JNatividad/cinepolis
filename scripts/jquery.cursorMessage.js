// jQuery Cursor Message Plugin
if (jQuery) {
    (function ($) {
        $.cursorMessageData = {};

        $(window).ready(function (e) {
            if ($('#cursorMessageDiv').length == 0) {
                $('body').append('<div id="cursorMessageDiv">&nbsp;</div>');
                $('#cursorMessageDiv').hide();
            }

            $('body').mousemove(function (e) {
                $.cursorMessageData.mouseX = e.pageX;
                $.cursorMessageData.mouseY = e.pageY;
                if ($.cursorMessageData.options != undefined) $._showCursorMessage();
            });
        });
        $.extend({
            cursorMessage: function (message, options) {
                if (options == undefined) options = {};
                if (options.offsetX == undefined) options.offsetX = 5;
                if (options.offsetY == undefined) options.offsetY = 5;
                if (options.hideTimeout == undefined) options.hideTimeout = 1500;

                $('#cursorMessageDiv').html(decHTMLifEnc(message)).fadeIn('slow');
                if (jQuery.cursorMessageData.hideTimeoutId != undefined) clearTimeout(jQuery.cursorMessageData.hideTimeoutId);
                if (options.hideTimeout > 0) jQuery.cursorMessageData.hideTimeoutId = setTimeout($.hideCursorMessage, options.hideTimeout);
                jQuery.cursorMessageData.options = options;
                $._showCursorMessage();
            },
            hideCursorMessage: function () {
                $('#cursorMessageDiv').fadeOut('slow');
            },
            _showCursorMessage: function () {
                $('#cursorMessageDiv').css({ top: ($.cursorMessageData.mouseY + $.cursorMessageData.options.offsetY) + 'px', left: ($.cursorMessageData.mouseX + $.cursorMessageData.options.offsetX) });
            }
        });
    })(jQuery);
}

function isEncHTML(str) {
    if (str.search(/&amp;/g) != -1 || str.search(/&lt;/g) != -1 || str.search(/&gt;/g) != -1)
        return true;
    else
        return false;
};

function decHTMLifEnc(str) {
    if (isEncHTML(str))
        return str.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>');
    return str;
}