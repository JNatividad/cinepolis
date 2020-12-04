var target = $("#buy_movie");

(function ($) {
    'use strict';

    var loader = function () {
        var loader = document.querySelector('.dx_loader_container');

        window.onload = function () {
            loader.style.display = 'none';
            //extraContent.init();
        };
    };

     loader();

 })(jQuery);

(function () {
    'use strict';
    // Calcular la altura del Header
    var headH = Math.floor($('header').outerHeight(true)),
			dxH = $('.dx'),
			dxHero = $('.dx_intro'),
			dxCont = $('.dx_container');

    function marginTop(item) {
        item.css('margin-top', headH + 'px');
    }

    function heroSize() {
        if (detectmob()) {
            dxHero.css('height', 'calc(100vh - ' + (headH - 1) + 'px)');

        } else {
            dxHero.css('height', 'calc(100vh - ' + (headH - 1) + 'px)');
        }
    }

     function reloadAngular($slideElement) {
         $('.synopsis').removeClass("active");
         $slideElement.find(".synopsis").addClass("active");

         var appElement = document.querySelector('[ng-app=cinepolisApp]');
         var appScope = angular.element(appElement).scope();
         var controllerScope = appScope.$$childHead;
         controllerScope.getNowPlayingActive();
     }

     function animation() {
         if (!detectmob()) {
             $('html, body').animate({
                 scrollTop: target.offset().top - headH + 1
             }, 1000);
         } else {
             $('html, body').animate({
                 scrollTop: target.offset().top
             }, 1000);
         }
     }

     $("li.preventa").click(function (e) {
         e.preventDefault();

         var newIndex = $(this).attr("data-key");
         var $slideElement = $(".slick-track > div[data-key='" + newIndex + "']");

         var index = $slideElement.index();
         slickMovies.slick('slickGoTo', parseInt(index));
         animation();
     });


    $('#intro_btn a').click(function () {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {

                animation();
                return false;
            }
        }
    });

    //marginTop(dxH);
    heroSize();

    $(window).resize(function () {
        headH = Math.floor($('header').outerHeight(true));
        //marginTop(dxH);
        heroSize();
    });


    //slick slider Características de la sala
    var featuresSlider = $('.dx-features-slider'),
        featuresSliderNav = $('.dx-features-nav ul > li');

    featuresSlider.slick({
        dots: false,
        arrows: true
    });

    // navegacion de este slider
    featuresSliderNav.each(function (i) {
        $('.slide-' + i).click(function () {
            featuresSlider.slick('slickGoTo', i);
        });
    });

    $('.slide-0').addClass('active');

    featuresSlider.on('beforeChange', function (event, slick, currentSlide, slickCurrentSlide) {

        switch (slickCurrentSlide) {
            case 0:
                $('.slide-0').addClass('active')
                                    .siblings()
                                    .removeClass('active');

                break;
            case 1:
                $('.slide-1').addClass('active')
                                    .siblings()
                                    .removeClass('active');
                break;
            case 2:
                $('.slide-2').addClass('active')
                                    .siblings()
                                    .removeClass('active');
                break;
            case 3:
                $('.slide-3').addClass('active')
                                    .siblings()
                                    .removeClass('active');
                break;
            case 4:
                $('.slide-4').addClass('active')
                                    .siblings()
                                    .removeClass('active');
                break;
            default:
                $('.slide-0').addClass('active')
                                    .siblings()
                                    .removeClass('active');
                break;
        }
    });

    // Slider de películas y twitter
    var $twFeed = $('.dx_twitter__timeline .timeline_tweetlist'),
			$bg1 = $('.dx-slide-0').attr('data-bg'),
			$bg2 = $('.dx-slide-1').attr('data-bg'),
			$bg3 = $('.dx-slide-2').attr('data-bg');

    var slickMovies = $('.dx-movie-slider').on('init', function (slick) {
		setTimeout(function () {
			var start = 0;
			if (window.location.hash) {
				try {
					if (window.location.hash != "#mexicali") {
						start = parseInt(window.location.hash.substring(1));
						slickMovies.slick('slickGoTo', parseInt(start));
					}
					animation();
				} catch (err) { }
			}
		}, 3500);
    }).slick({
        dots: false,
        arrows: true,
        infinite: false,
        swipe: true
    });

    $('.dx_btn--sinopsis a, .dx-info-btns a.info-sinopsis').on('click', function (e) {
        e.preventDefault();
        $('.dx_main_movie__sinopsis').addClass('dx_main_movie__sinopsis--show modal');
        $('.dx_main_movie__sinopsis p').html($(this).attr("data-sinopsis"));
    });

    $('.dx_main_movie__sinopsis__close').on('click', function () {
        $('.dx_main_movie__sinopsis').removeClass('dx_main_movie__sinopsis--show modal');
    });

    $('.dx_main_movie__bg_image').css('background-image', 'url("' + $(".dx-slide-0").attr('data-bg') + '")');

    // Aplicar la imagen de fondo
    $('.dx-movie-slider').on('beforeChange', function (event, slick, currentSlide, slickCurrentSlide) {
        reloadAngular($(".dx-slide-" + slickCurrentSlide));
        $('.dx_main_movie__bg_image').css('background-image', 'url("' + $(".dx-slide-" + slickCurrentSlide).attr('data-bg') + '")');
    });

    $('.dx_schedules__cinema__change').on('click', function () {
        $('.dx_cinemas_list').toggle();
    });

    $('.dx_cinemas_list ul li').on('click', function () {
        $('.dx_cinemas_list').fadeOut();
    });
    $('.slick-arrow').on('click', function () {
        $('.dx_cinemas_list').fadeOut();
    });

    $(document).mouseup(function (e) {
        var container = $(".dx_cinemas_list");

        if (!container.is(e.target) // if the target of the click isn't the container...
            && container.has(e.target).length === 0) // ... nor a descendant of the container
        {
            container.hide();
        }
    });


    $twFeed.slick({
        dots: false,
        arrows: false,
        autoplay: true,
        slidesToShow: 2
    });


  // Grid contenido adicional

  if ($('div.dx-grid-item').length >= 4) {
	// init Masonry
		var $grid = $('.dx-grid').masonry({
				columnWidth: '.dx-grid-size',
				itemSelector: '.dx-grid-item'
		});

	// layout Masonry after each image loads
		$grid.imagesLoaded().progress( function() {
		  $grid.masonry();
		});
	}
})();
