function isMobile()
{
    if (navigator.userAgent.match(/Touch/i) || navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPod/i) || navigator.userAgent.match(/BlackBerry/i) || navigator.userAgent.match(/Windows Phone/i))
    {
        return true;
    } else { return false }
}

var ancho = $(window).width();
var alturaAnterior = $(".listCartelera li:first").height();


$(window).resize(function () {
    ValidarClicks();
});

$(document).ready(function () {
    $(".listCartelera li.mansori .sellos").hide();
    ValidarClicks();
});

function ValidarClicks() {
    ancho = $(window).width();

    if (ancho > 1025) {
        $(".listCartelera li.mansori figure img").removeClass("esclick").unbind("click");
    }
    else {
        $(".listCartelera li.mansori figure img").removeClass("esclick").unbind("click");
        if (!$(".listCartelera li.mansori figure img").hasClass("esclick"))
            $(".listCartelera li.mansori figure img").addClass("esclick").bind("click", function (e) { ClickCartel(this); e.preventDefault(); });
    }
}

function LinkCartelera(_this) {
    var url = $(_this).attr("href");
    if ($(_this).hasClass("lnkCartelera"))
        $.cookie('ancla', $(_this).next().attr("href").replace("pelicula/", ""), { expires: 1, path: '/' });
    window.location = url;//+ "?utm_source=boton-cartelera&utm_medium=" + $(_this).next().attr("href").replace("pelicula/", "") + "&utm_campaign=front";
}

function LinkSinopsis(_this) {
    var url = $(_this).attr("href");
    window.location = url;//+ "?utm_source=boton-sinopsis&utm_medium=" + $(_this).attr("href").replace("pelicula/", "") + "&utm_campaign=front";
}

var pausar = false;
function ClickCartel(_this)
{

    if (isMobile() && location.pathname === "/" || location.pathname === "/index.aspx" || location.pathname === "/index.aspx/" && $("body").hasClass("pais-mx"))
    {
        movieSelected = location.protocol + "//" + location.host + "/" + $(_this).parent().find(".btn-call").find("a:nth-child(2)").attr("href");
        isHomeMx = true;
        location.href = movieSelected;
        return true;
    }

    if (!pausar) {
        pausar = true;
        $(".listCartelera li.mansori .sellos").hide();
        $(".listCartelera li.mansori").animate({
            height: alturaAnterior
        }, 10);

        if (!$(_this).parent().parent().hasClass("1")) {
            $(".listCartelera li.mansori").removeClass("1");
            $(_this).parent().parent().addClass("1");

            alturaAnterior = $(_this).parent().parent().height();
            var altura = ancho < 464 ? 270 : $(_this).parent().parent().height() + 160;
            $(_this).parent().parent().animate({
                height: altura + 10
            }, function () {
                $(_this).parent().parent().find(".sellos").css({
                    "margin-top": ancho < 464 ? "-124px" : "-156px",
                    "height": "110px"
                }).fadeIn("fast");
                pausar = false;
            });

            $(_this).parent().parent().find(".sellos span").click(function (e) {
                pausar = false;
                $(".listCartelera li.mansori").removeClass("1");
                $(".listCartelera li.mansori .sellos").hide();
                $(".listCartelera li.mansori").animate({
                    height: alturaAnterior
                }, 10);
                e.preventDefault();
            });
        }
        else {
            $(_this).parent().parent().removeClass("1");
            pausar = false;
        }
    }
}

function ObtenerLinkSellos(sellos) {
    var linkSellos = "";


    if (sellos != "" && sellos != undefined) {
        if (sellos.indexOf(",") != -1) {
            var arrSellos = sellos.split(",");
            for (var i = 0; i < arrSellos.length; i++)
                linkSellos += "<span><img alt='' src='{0}'></a>".format(arrSellos[i]);
            return linkSellos;
        }
        else
            return "<span><img alt='' src='{0}'></span>".format(sellos);
    }
    else
        return "";
}

function LimpiarSellos() {
    $(".listCartelera li .sellos").hide();
    $(".listCartelera li.mansori").removeClass("1");

    if ($(".listCartelera li").attr('style') !== undefined) {
        var style = $(".listCartelera li").attr('style');
        $(".listCartelera li").attr('style', style.replace(/height[^;]+;?/g, ''));
    }
    alturaAnterior = $(".listCartelera li:first").height();
}
