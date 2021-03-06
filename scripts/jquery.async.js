﻿/*jQuery Asynchronous Plugin 1.0 RC1*/
(function ($) {
    $.whileAsync = function (opts) {
        var delay = Math.abs(opts.delay) || 10,
            bulk = isNaN(opts.bulk) ? 500 : Math.abs(opts.bulk),
            test = opts.test || function () { return true; },
            loop = opts.loop || function () { },
            end = opts.end || function () { };

        (function () {
            var t = false,
                begin = new Date();
            while (t = test()) {
                loop();
                if (bulk === 0 || (new Date() - begin) > bulk) {
                    break;
                }
            }
            if (t)
                setTimeout(arguments.callee, delay);
            else
                end();
        })();
    }

    $.eachAsync = function (array, opts) {
        var i = 0,
            l = array.length,
            loop = opts.loop || function () { };
        $.whileAsync(
            $.extend(opts, {
                test: function () { return i < l; },
                loop: function () {
                    var val = array[i];
                    return loop.call(val, i++, val);
                }
            })
        );
    }

    $.fn.eachAsync = function (opts) {
        $.eachAsync(this, opts);
        return this;
    }
})(jQuery);