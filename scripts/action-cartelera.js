var slider = $('.proximamente ul').bxSlider({ pager: false, nextText: '', prevText: '', infiniteLoop: false, slideWidth: 140 });

$(function () {
     var diferencia = 9;
     var wAncho = $(window).width();
     var startTime;
     var endTime;
     var now = new Date();
     var slider = $("#slider-range").slider({
         range: true,
         min: 0,
         max: 15,
         values: [((now.getHours() + (diferenciaHoraria)) < 10 ? 0 : (now.getHours() + (diferenciaHoraria)) - diferencia), 15],
         step: 1,
         slide: function (event, ui) {

             var values = ui.values[0] <= 0 ? ui.values[0] : ui.values[0] + diferencia;
             var values2 = ui.values[1] <= 0 ? ui.values[1] : ui.values[1] + diferencia;

             var hours1 = Math.floor(values);
             var minutes1 = values - (hours1);

             if (hours1.length < 10) hours1 = '0' + hours;
             if (minutes1.length < 10) minutes1 = '0' + minutes;

             if (minutes1 == 0) minutes1 = '00';

             var hours2 = Math.floor(values2);
             var minutes2 = values2 - (hours2);

             if (hours2.length < 10) hours2 = '0' + hours;
             if (minutes2.length < 10) minutes2 = '0' + minutes;

             if (minutes2 == 0) minutes2 = '00';
             startTime = getTime(hours1, minutes1);
             endTime = getTime(hours2, minutes2);

             $('.rangoTiempo').text(startTime + ' - ' + endTime);
         },
         stop: function (event, ui) {
         }
     });
     $('#slider-range').slider('pips');

     startTime = getTime((now.getHours() + (diferenciaHoraria)), "00");

     $('.rangoTiempo').text(startTime + ' - 11:59 PM');

     $(".btnAbrirFiltro").click(function (e) {
         $(this).find("i").toggleClass('icon-caret-down icon-caret-up');
         $(".filtrosBusqueda").slideToggle(200);

         e.preventDefault();
         e.stopPropagation();
     });

     $(".groupFiltro h3").click(function (e) {
         $(this).find("i").toggleClass('icon-caret-down icon-caret-up');
         $(this).next("div").slideToggle(200);
         e.preventDefault();
         e.stopPropagation();
     });

     $('.rankingSubmit').rating({
         callback: function (value, link) { }
     });

     $(".complejosLista").chosen({
         disable_search_threshold: 10,
         width: "100%"
     });

    if (detectmob())
        $('.vip .navegacionVip, .vip .subNavegacion').css({ position: "absolute", top: 0 });
});

function getTime(hours, minutes) {
    var time = null;
    var hour = hours;
    minutes = minutes + "";
    if (hours < 12)
        time = "AM";
    else
        time = "PM";
    if (hours == 0)
        hours = 12;
    if (hours > 12)
        hours = hours - 12;
    if (minutes.length == 1)
        minutes = "0" + minutes;
    if (hour == 24)
        return "11:59 PM";

    return hours + ":" + minutes + " " + time;
}

$(window).resize(function () {
    var wAncho = $(window).width();
    slideCartelera(wAncho, slider);
    if ($('.autofix_sb').length)
        $(".autofix_sb").css({ width: $(".listaCarteleraHorario").width() });
});

$(window).load(function () {
    var wAncho = $(window).width();
    slideCartelera(wAncho, slider);
});

function countTT() {
	var $tt = $('.listaCarteleraHorario h2'),
			$ttLength = $tt.text().length,
			$ttA = $('.listaCarteleraHorario a.btnInfoComplejo');

	$.each($tt, function() {
		if($(this).text().length >= 30) {
			$ttA.addClass('tt-colapsed');
		}
	});
}

function slideCartelera(wAncho, slider) {
    if (slider != null && slider !== undefined && slider.length > 0) {
        if (wAncho < 920) {
            slider.reloadSlider({
                minSlides: 3,
                maxSlides: 5,
                slideWidth: 140,
                slideMargin: 10,
                pager: false,
                infiniteLoop: false,
                nextText: '',
                prevText: '',
                moveSlides: 2
            });
            if (detectmob()) {
                $(".bx-prev").css({ opacity: 1, left: 0 });
                $(".bx-next").css({ opacity: 1, right: 0 });
            }
        }
        else {
            slider.destroySlider();
            slider.removeAttr("style");
            $(".preventaCartelera article .listpreventas").css("visibility", "visible");
            slider.find("li").removeAttr("style");
        }
    }
}

$.fn.is_on_screen = function () {
    var win = $(window);
    var viewport = {
        top: win.scrollTop() + 150,
        left: win.scrollLeft()
    };
    viewport.right = viewport.left + win.width();
    viewport.bottom = viewport.top + win.height();
    var bounds = this.offset();
    bounds.right = bounds.left + this.outerWidth();
    bounds.bottom = bounds.top + this.outerHeight();

    return (!(viewport.right < bounds.left || viewport.left > bounds.right || viewport.bottom < bounds.top || viewport.top > bounds.bottom));
};

if (!detectmob()) {
    var previousScroll = 0;
    $(window).scroll(function () {
        ValidarPosicionFiltros();
    });
}

function ValidarPosicionFiltros() {

    var alturaExtra = $(".preventaCartelera").length == 0 ? 210 : 520;

    var currentScroll = $(document).scrollTop();
    if ($(".filtrosBusqueda").height() + currentScroll < $(".listaCarteleraHorario").height()) {
        $(".cont").css({
            "height": ($(window).height() - 150) + "px",
            "overflow-y": "auto"
        });

        $(".filtrosBusqueda").css("padding-top", (currentScroll - alturaExtra) + "px");
    }
    if (currentScroll <= 1) {
        $(".filtrosBusqueda").css("padding-top", "0px");
        $(".cont").removeAttr("style");
    }

    previousScroll = currentScroll;
};
