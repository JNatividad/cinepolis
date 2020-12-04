; (function (window, $) {
    var sliderPreventa,
    wAncho,
    count = 0,
    propertiesSlider = {
        minSlides: 3,
        maxSlides: 6,
        slideWidth: 140,
        slideMargin: 17,
        pager: false,
        infiniteLoop: false,
        nextText: '',
        prevText: '',
        moveSlides: 2,
        onSliderLoad: function () {//TODO: Se agregó función para validar preventas visibles
	        $(".listpreventas").css("visibility", "visible");
        }

    },
    itemImage = $(".item"),
    contenedorPreventa = $('.lstpreventas ul.tituloPelicula'),
    $notification = $('.ci-notification'),
    $closeNotif = $('.ci-notification-close');

    function removeNotification() {
        $notification.fadeOut();
    }

    function imageFill() {
        if (itemImage.length)
            itemImage.imagefill({ runOnce: true });
    }

    function slidePreventas(wAncho) {
        count = 0;
        if (wAncho > 900) count = 4;
        if (wAncho > 640 && wAncho < 900) count = 4;
        if (wAncho > 300 && wAncho < 640) count = 3;

        contenedorPreventa.css("opacity", 1);
        if (contenedorPreventa.find("li").length > count) {
            try { contenedorPreventa.destroySlider(); } catch (ex) { }
            contenedorPreventa.bxSlider(propertiesSlider);

            if (detectmob()) {
                $(".bx-prev").css({ opacity: 1, left: 0 });
                $(".bx-next").css({ opacity: 1, right: 0 });
            }
        }

        if (contenedorPreventa.find("li").length <= 1)
            contenedorPreventa.hide();
    }

    var presales = {
        init: function () {
            wAncho = $(window).width();
            contenedorPreventa.css("opacity", 0);
            imageFill();

            if ($("#carteleraCiudad").attr("data-pais") == "CinepolisMX") {
                //$('.lstpreventas ul.tituloPelicula li:eq(0)').before('<li><figure><a relpreventa="0" href="https://goo.gl/dfJ7Cb" target="blank"><img src="//static.cinepolis.com/img/ficm-inauguracion.jpg" alt="FICM 2016"><figcaption>FICM 2016</figcaption></a></figure></li>')
            }

            slidePreventas(wAncho);

            $notification.addClass('ci-notification--visible');
            setTimeout(removeNotification, 5000);

            $closeNotif.on('click', function (e) {
                e.preventDefault();
                removeNotification();
            });
        },

        reload: function () {
            wAncho = $(window).width();
            slidePreventas(wAncho);
            imageFill();
        }
    };

    $(window).load(function () {
        presales.init();
    });

    $(window).resize(function () {
        presales.reload();
    });
})(window, jQuery);