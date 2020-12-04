var generado = false;
var wAncho = 0;
var $flexslider;
var clickArrowSlider = false;
var $wW = $(window).width();

;$(function () {
	wAncho = $(window).width();
	bannerAction(wAncho);

	// Cerrar Notificación
	$('.cerrar-notificacion').bind('click' , function(e) {
	  $(this).parent().animate({
	      height: 0,
	  },100, function(){
	      $(this).remove();
	  });
	  e.preventDefault();
	});

	$('figure.responsive').picture();

	$('.responsive').imagefill({ runOnce: true });

	$('.slides').imagesLoaded(function () {
	  $flexslider = $('.slides'),
	      $slides = $flexslider.find('li'),
	      stripComment = function (string) {
	          return string.replace(/<!--/g, '').replace(/-->/g, '');
	      },
	      initItem = function (item) {
	          var $this = $(item);
	          if (!$this.hasClass('init')) {
	              $this.html(stripComment($this.html())).addClass('init');
	          }
	      };

	  $flexslider.bxSlider({
	      slideshow: true,
	      auto: true,
	      nextText: '',
	      infiniteLoop: true,
	      pagerCustom: '.thumb-cinepolis',
	      hideControlOnEnd: true,
	      prevText: '',
	      pause: 5000,
	      onSliderLoad: function () {
	          $('.responsive').imagefill({ runOnce: true });
	      },
	      onSlideNext: function () {
	          $('.responsive').imagefill({ runOnce: true });
	      },
	      onSlidePrev: function () {
	          $('.responsive').imagefill({ runOnce: true });
	      }
	  });
	});

	if (!detectmob()) {
		AsignarEventosFigure();
	}

	masonryCartelera();
});

$(window).resize(function () {
    var wAncho = $(window).width();
    bannerAction(wAncho);

    if (detectmob())
        LimpiarSellos();

    $('.responsive').imagefill({ runOnce: true });
});

function bannerAction(wAncho) {
    var imagenAnterior = $(".boxBanner a").find("img").attr('src');
    var ruta = "imagenes/comercializacion/offline/";
    if (wAncho < 790) {
        if ((wAncho > 740)) {
            $(".front-interno, #banner-interno-front, #banner-interno-front-dfp").show();
            $(".front-movil, #banner-interno-movil, #banner-interno-front-responsivo-dfp").hide();
        } else {
            $(".front-interno, #banner-interno-front, #banner-interno-front-dfp").hide();
            $(".front-movil, #banner-interno-movil, #banner-interno-front-responsivo-dfp").show();
        }

    } else {
        if (wAncho > 800) {
            $(".front-interno, #banner-interno-front, #banner-interno-front-dfp").show();
            $(".front-movil, #banner-interno-movil, #banner-interno-front-responsivo-dfp").hide();
        }
    }
}

function AsignarEventosFigure() {
    $('figure.overlay').bind("mouseenter", function () {
        $(this).find('.opcion-sellos').fadeIn('fast', function () {
            $(this).animate({
                paddingTop: '72px',
                opacity: 1
            });
        });
    });

    $('figure.overlay').bind("mouseleave", function () {
        $(this).find('.opcion-sellos').fadeOut('fast', function () {
            $(this).animate({
                paddingTop: 0,
                opacity: 0
            });
        });
    });
}

function masonryCartelera() {
	var $container = $('.listCartelera'),
			$itemMsnry = $('.listCartelera li'),
			generado = false,
			$masonryOptions = {
				columnWidth: ".item",
				"gutter": 16,
				itemSelector: 'li',
				isAnimated: true
			};

	msonry();

	function msonry() {
		if (!detectmob()) {
			if ($wW >= 1025) {
				$container.masonry($masonryOptions);
				generado = true;

				$(".listCartelera li").removeClass("mansori");
				$(".listCartelera li figure").addClass("overlay");
			} else {
				$(".listCartelera li figure").removeClass("overlay");
				$('figure').unbind("mouseenter");
				$('figure').unbind("mouseleave");
			}
		}
	}

	// On Smart Resize
	$(window).smartresize(function(){
		$wW = $(window).width();
		if ($wW <= 1025) {
			if (generado) {
				$container.masonry('destroy');
				$container.removeAttr('style');
				$itemMsnry.removeAttr('style');
				$(".listCartelera li").addClass("mansori");
				$(".listCartelera li figure").removeClass("overlay");
				$('figure').unbind("mouseenter");
				$('figure').unbind("mouseleave");
			}
			generado = false;
		} else {
			if (!generado) {
				$container.masonry($masonryOptions);

				$(".listCartelera li").removeClass("mansori");
				$(".listCartelera li figure").addClass("overlay");
				AsignarEventosFigure();
			}
			generado = true;
		}
	});
}

