$(function () {
    var wAncho = $(window).width();

    sizeTime();

    $('.rankingSubmit').rating({
        callback: function (value, link) {

        }
    });

    if (!detectmob())
        var s = skrollr.init({ forceHeight: false });
    else
        $('.vip .navegacionVip, .vip .subNavegacion').css({ position: "absolute", top: 0 });

    if ($('#ContentPlaceHolder1_ctl_sinopsis_ctl_trailer').length) {
        videojs("ContentPlaceHolder1_ctl_sinopsis_ctl_trailer", { "height": "auto", "width": "auto" }).ready(function () {
            var myPlayer = this;
            var aspectRatio = 5 / 12;

            function resizeVideoJS() {
                var width = document.getElementById(myPlayer.id()).parentElement.offsetWidth;
                myPlayer.width(width).height(220);
            }

            resizeVideoJS();
            window.onresize = resizeVideoJS;
        });
    }


    slideCartelera(wAncho, slider);
});

$(window).load(function () {
    var wAncho = $(window).width();
    if ($('.item').length) {
        $('.item').imagefill({ runOnce: true });
    }

    AjusteHorarios();

    new ResizeSensor(jQuery('.selectHorario'), function () {
        sizeTime();
    });

});

$(window).resize(function () {
    var wAncho = $(window).width();
    if ($('.item').length) {
        $('.item').imagefill({ runOnce: true });
    }
    slideCartelera(wAncho, slider);

    AjusteHorarios();
});

function AjusteHorarios() {
    var wAncho = $(window).width();

    if (wAncho < 700) {
        $(".horariosPelicula").insertBefore($(".infoPelicula .info:first"));
        $(".horariosPelicula").show().removeClass("col3").addClass("row");
    }
    else {
        $(".sinopsisCont aside").before($(".horariosPelicula"));
        $(".horariosPelicula").removeClass("row").addClass("col3");
    }
}

function slideCartelera(wAncho, slider) {
    if (slider != null && slider !== undefined && slider.length > 0){
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
            slider.find("li").removeAttr("style");
        }
    }
}


function sizeTime() {
    if(!detectmob()){
        // CalcHeight
        var newHeight = $(".infoPelicula").innerHeight() - $(".horariosPelicula > h2").height() - $(".selectHorario").height() + "px";
        $(".horariosDesc").css("height", newHeight);
    }
}

var slider = $('.proximamente ul').bxSlider({ pager: false, nextText: '', prevText: '', infiniteLoop: false, slideWidth: 140 });