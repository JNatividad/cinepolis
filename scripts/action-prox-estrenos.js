var bxSliderInstances = {};
var $slider = $('div.listProxEstreno ul');
var noSliderMx = $('.proxEstrenos');
if (!noSliderMx.hasClass('CinepolisMX'))
{
    $slider.each(function (index, element)
    {
        bxSliderInstances["slider" + index] = $slider.eq(index).bxSlider({ pager: false, nextText: '', prevText: '', infiniteLoop: false, slideWidth: 140 });
    });
}

$(function ()
{
    var wAncho = $(window).width();
    if (detectmob())
    {
        if (wAncho < 640)
        {
            $(".diaEstreno").click(function (e)
            {
                $(this).next().slideToggle(400);
                $(this).not($(this)).next(':visible').slideUp(200);
                e.preventDefault();
                e.stopPropagation();
            });
        }
    }
});

$(window).resize(function ()
{
    var wAncho = $(window).width();
    $slider.each(function (index, element) { slideCartelera(wAncho, bxSliderInstances["slider" + index], $slider.eq(index)); });
});

$(window).load(function ()
{

    //$(".tituloPelicula li").on("click", function() {
    //	peliculasVistasclick($(this), "proximos-estrenos", "span.data-layer");
    //});

    //ScrollDatalayer(".tituloPelicula li", "proximos-estrenos", "span.data-layer");
    var wAncho = $(window).width();

    if (!noSliderMx.hasClass('mx'))
    {
        $slider.each(function (index, element) { slideCartelera(wAncho, bxSliderInstances["slider" + index], $slider.eq(index)); });
    }

    setTimeout(function ()
    {
        // Show encuesta
        $('.encuesta__btn').bind('click', function (e)
        {
            $('.encuesta__frame').fadeIn();
            $('#encuesta__frame').attr('src', window.location.origin + '/encuesta-cinepolis');
            e.preventDefault();
        });

        $(".encuesta__frame a").bind("click", function (e)
        {
            $('.encuesta__frame').fadeOut();
            e.preventDefault();
        });

        // Hide encuesta
        $(document).keyup(function (e)
        {
            if (e.keyCode == 27)
            {
                $('.encuesta__frame').fadeOut();
            }
        });
        $('.encuesta__cerrar').bind('click', function (e)
        {
            $('.encuesta__frame').fadeOut();
            e.preventDefault();
        });
    }, 100);
});

function slideCartelera(wAncho, $sliderItem, $sliderLista)
{
    var count = 0;
    if (wAncho > 900) count = 5;
    if (wAncho > 640 && wAncho < 900) count = 4;
    if (wAncho > 300 && wAncho < 640) count = 3;

    if ($sliderLista.find('li').size() > count && count > 3)
    {
        $sliderItem.reloadSlider({
            minSlides: 5,
            maxSlides: 5,
            slideWidth: 140,
            slideMargin: 17,
            pager: false,
            infiniteLoop: false,
            nextText: '',
            prevText: '',
            moveSlides: 2
        });
        if (detectmob())
        {
            $(".bx-prev").css({ opacity: 1, left: 0 });
            $(".bx-next").css({ opacity: 1, right: 0 });
        }
    }
    else
    {
        if ($sliderItem !== undefined)
        {
            $sliderItem.destroySlider();
            $sliderItem.removeAttr("style");
            $sliderItem.find("li").removeAttr("style");
        }
    }
}
