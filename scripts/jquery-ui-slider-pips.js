/* jquery slider pips plugin, version 1.1 */
	
; (function ($) {
    var extensionMethods = {
        pips: function (settings) {
            var options = {

                first: "label",
                last: "label",
                rest: "pip",
                labels: false,
                prefix: "",
                suffix: ""	
            };

            $.extend(options, settings);
            this.options.labels = options.labels
            this.element.addClass('ui-slider-pips').find('.ui-slider-pip').remove();
            var pips = (this.options.max - this.options.min) / this.options.step;

            for (i = 0; i <= pips; i++) {
                var label = (this.options.labels) ? this.options.labels[i] : (this.options.min + (this.options.step * i));
                if (typeof (label) === "undefined") { label = ""; }

                var s = $('<span class="ui-slider-pip ui-slider-pip-' + i + '"><span class="ui-slider-line"></span><span class="ui-slider-label">' + options.prefix + label + options.suffix + '</span></span>');

                if (0 == i) {
                    s.addClass('ui-slider-pip-first');
                    if ("label" == options.first) { s.addClass('ui-slider-pip-label'); }
                    if (false == options.first) { s.addClass('ui-slider-pip-hide'); }
                } else if (pips == i) {
                    s.addClass('ui-slider-pip-last');
                    if ("label" == options.last) { s.addClass('ui-slider-pip-label'); }
                    if (false == options.last) { s.addClass('ui-slider-pip-hide'); }
                } else {
                    if ("label" == options.rest) { s.addClass('ui-slider-pip-label'); }
                    if (false == options.rest) { s.addClass('ui-slider-pip-hide'); }
                }

                if (this.options.orientation == "horizontal")
                    s.css({ left: '' + (100 / pips) * i + '%' });
                else
                    s.css({ top: '' + (100 / pips) * i + '%' });
                this.element.append(s);
            }
        }
    };

    $.extend(true, $['ui']['slider'].prototype, extensionMethods);
})(jQuery);

/* jquery slider float plugin, version 1.1 */

; (function ($) {
    var extensionMethods = {
        float: function (settings) {

            var options = {
                handle: true,
                labels: true,
                prefix: "",
                suffix: ""
            };
            $.extend(options, settings);

            this.element.addClass('ui-slider-float');

            if (options.handle) {
                if (this.options.values) {
                    var $tip = [
                        $('<span class="ui-slider-tip">' + options.prefix + this.options.values[0] + options.suffix + '</span>'),
                        $('<span class="ui-slider-tip">' + options.prefix + this.options.values[1] + options.suffix + '</span>')
                    ];
                } else
                    var $tip = $('<span class="ui-slider-tip">' + options.prefix + this.options.value + options.suffix + '</span>');

                this.element.find('.ui-slider-handle').each(function (k, v) {
                    $(v).append($tip[k]);
                });
            }

            if (options.labels) {
                this.element.find('.ui-slider-label').each(function (k, v) {
                    var $e = $(v).clone().removeClass('ui-slider-label').addClass('ui-slider-tip-label');
                    $e.insertAfter($(v));
                });
            }

            this.element.on('slidechange slide', function (e, ui) {
                $(ui.handle).find('.ui-slider-tip').html(options.prefix + ui.value + options.suffix);
            });
        }
    };

    $.extend(true, $['ui']['slider'].prototype, extensionMethods);
})(jQuery);