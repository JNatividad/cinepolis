
    $(document).ready(function() {
        reloadAngular();
    });

    var galleryTop = new Swiper('.gallery-top', {
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        hashNavigation: {
            watchState: true,
        },
        on: {
            slideChange: function () {
                reloadAngular();
            }
        }
    });

    new Swiper('.gallery-thumbs', {
        spaceBetween: 10,
        slidesPerView: 'auto',
        slideToClickedSlide: true,
        simulateTouch: false,
        breakpoints: {
            480: {
                slidesPerView: 3,
            }
        }
    });

    $("li.estreno").click(function (e) {
        e.preventDefault();

        var newIndex = $(this).find("a").attr("data-slide-index");
        
        var $slideElement = $(".slides > li:eq(" + newIndex + ")");
        reloadAngular($slideElement);

        galleryTop.slideTo(newIndex, 600, false);

       // reloadAngular();

        $("html, body").animate({
            scrollTop: 0
        }, 600);
    });

    var btnTabs = $(".cd-tabs-navigation a");

    btnTabs.click(function (e) {
        e.preventDefault();
        btnTabs.removeClass("selected");
        var _this = $(this);
        _this.addClass("selected");

        $(".cd-tabs-content li").removeClass("selected");
        $(".cd-tabs-content li[data-content='" + _this.attr("data-content") + "']").addClass("selected");
    });

    if (!detectmob()) {
        $(".ga-poster .img").hover(function () {
            $(".overlay").css("height", "100%");
        },
            function () {
                $(".overlay").css("height", "0%");
            });
    } else {
        $(".overlay").css("display", "none");
    }

    $("a[rel*=example_group]").fancybox({
        'transitionIn': 'none',
        'transitionOut': 'none',
        'titlePosition': 'over',
        'titleFormat': function (title, currentArray, currentIndex, currentOpts) {
            return 'Image ' + (currentIndex + 1) + ' / ' + currentArray.length + ' ' + title + '';
        }
    });

    $('.ga-cll-tt').on('click', function () {
        $('.ga-cll-cont-right').addClass('ga-show');
    });

    $('.ga-cll-cont-right').before().click(function () {
        $('.ga-cll-cont-right').removeClass('ga-show');
    });


    function activateSynopsis($slideElement) {
        $('.synopsis').removeClass("active");
        $slideElement.find(".synopsis").addClass("active");

        var appElement = document.querySelector('[ng-app=cinepolisApp]');
        var appScope = angular.element(appElement).scope();
        if (appScope !== undefined) {
            appScope.getNowPlayingActive();
        }
    }

    function reloadAngular($slideElement) {

        if ($slideElement === undefined) {
            setTimeout(function () {
                var newIndex = $(".swiper-slide-active").find("figure img").attr("data-slide-index");
                $slideElement = $(".slides > li:eq(" + newIndex + ")");
                activateSynopsis($slideElement);
            }, 200);
        } else {
            activateSynopsis($slideElement);
        }
    }