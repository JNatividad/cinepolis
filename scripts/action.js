var Geolocalizacion = null;
var wAlto = $(window).height();

$(function () {

	mobileMenu();

    function DataLayerSearch(key) {
        dataLayer.push({
            'busqueda': key,
            'event': 'Buscador'
        });
    }

    // Tooltip Verano Cinépolis
    var tooltip = $('.enciendeEmo__tooltip');
    $('.enciendeEmo').on({
        mouseenter: function () {
            tooltip.delay(200).fadeIn('400');
        },
        mouseleave: function () {
            tooltip.fadeOut('400');
        }
    })


    /*Analytics EsMás*/
    $('.verano-cinepolis a').click(function () { dataLayer.push({ 'event': 'Semana Cinépolis Menú' }); });
    $('.cont-banner .col3 a').click(function () { dataLayer.push({ 'event': 'Banner Semana Cinépolis' }); });

    $("#navegacion_master .navComp .navComp__link").not(".abrirContent").click(function (e) {
        dataLayer.push({ "event": "Front Menu Top " + $(this).text() });
    });

    $("#navegacion_master .navComp .navComp__link.abrirContent").click(function (e) {
        if (!$(this).hasClass("active"))
            dataLayer.push({ "event": "Front Menu Top " + $(this).text() });
    });

    $("#menuNavega #ListaSecciones li a").click(function (e) {
        dataLayer.push({ "event": "Front Menu " + $(this).find("span").text() });
    });

    /*Fin Analytics*/

    if ($('#txbCinepolisIdMaster').val() != '') {
        $(this).parent(".textInput").find("label").removeClass('focus active');
        $('#txbContrasenaMaster').parent(".textInput").find("label").removeClass('focus active').addClass('active');
    }


    $(".contentWrapper").prepend("<div class='cont-busqueda-mov row'></div>");
    var wAncho = $(window).width();

    /*Estilo de Formularios*/
    $("select:not(.complejosLista, #selectPelicula, .ddlFormato, .ddlHorarios, .ddlComplejo, .ddlCiudad, .dx_form_control, .skipFormat), input[type='radio']:not(.rankingSubmit) , input[type='checkbox']:not(.chk_filtroFormato, .dx_form_control--checkbox, .skipFormat), input[type='file']").uniform();
    $('[placeholder]').focus(function () {
        var input = $(this);
        if (input.val() == input.attr('placeholder')) {
            input.val('');
            input.removeClass('placeholder');
        }
    }).blur(function () {
        var input = $(this);
        if (input.val() == '' || input.val() == input.attr('placeholder')) {
            input.addClass('placeholder');
            input.val(input.attr('placeholder'));
        }
    }).blur();

    var $active,
    $content,
    $links = $("a.abrirContent");

    $links.click(function (e) {

        var $idvar = $(this).attr('href');
        var $item = $($idvar);
        var $visible = $(".dropdown:visible");

        $("footer nav ul li").closest('li').siblings('li').find('ul:visible').hide();

        if ($visible.length > 0 && $idvar !== ("#" + $visible.attr('id'))) {
            $visible.hide();
            $item.slideToggle(200);
            $links.toggleClass('active');
            $links.find("i").toggleClass('icon-arrow-down icon-arrow-up');
            if ($(this).attr('id') == "btnAbrirNav") {
                if (!detectmob())
                    MostrarOcultarOverlay();
            }
            else
                $(".overlay_cerrar").remove();
        }
        else {
            $(this).toggleClass('active');
            $item.slideToggle(200, function () {
                if (!$("ul#ListaMarcasMasCinepolis").hasClass("blackwhite"))
                    $("ul#ListaMarcasMasCinepolis").addClass("blackwhite");
            });
            if ($(this).attr('id') == "btnAbrirNav") {
                $(this).find("i").toggleClass('icon-arrow-down icon-arrow-up');
                if (!detectmob())
                    MostrarOcultarOverlay();
            }
        }

        if ($(".overlay_info").length > 0) {
            $(".overlay_info").remove();
            $(".infoComplejo article").slideToggle(200);
        }

        e.preventDefault();
        e.stopPropagation();

        $("img.lazy").each(function () {
            $(this).attr("src", $(this).attr("data-src"));
        });

        /*Analytics Klic*/
        var linkKlic = $("#menuNavega .links-a ul li a img[alt*='Klic']").parents("a");
        linkKlic.unbind("click");
        linkKlic.click(function (e) {
            dataLayer.push({ 'event': 'Ver peliculas en Klic' });
        });
        /* Fin Analytics Klic*/

        if ($(this).hasClass("btnId") && $(this).hasClass("active")) {
            dataLayer.push({ 'event': 'Iniciar ID' });
        }

        return false;
    });

    function MostrarOcultarOverlay() {
        if ($(".overlay_cerrar").length <= 0) {
            $("#wrapper").prepend("<div class='overlay_cerrar' style='background-color: black;width: 100%; height: 100%;position: fixed; z-index: 99; opacity: .3;'></div>");
            $(".overlay_cerrar").click(function () {
                $("#btnAbrirNav.active").find("i").toggleClass('icon-arrow-down icon-arrow-up');
                $("#menuNavega").slideToggle(200);
                $(this).remove();
                $("#btnAbrirNav.active").removeClass('active');
            });
        }
        else {
            $(".overlay_cerrar").remove();
        }
    }

    $(".closebutton").click(function (e) {
        $(this).parent().parent().fadeOut("400");
        e.preventDefault();
        e.stopPropagation();
        return false;
    });


    $(".textInput input").blur(function () {
        if (!$(this).data('hasTyped')) {
            $(this).parent(".textInput").find("label").removeClass('focus active');
        }
    }).keyup(function () {
        $(this).data('hasTyped', this.value.length);
        $(this).parent(".textInput").find("label").addClass('active');
    }).focus(function () {
        if (!$(this).data('hasTyped')) {
            $(this).parent(".textInput").find("label").addClass('focus');
        }
    });

    var $oe_menu_pais = $('#opcionPais');
    var $oe_menu_list = $oe_menu_pais.children('.selectPais');
    if (detectmob()) {
        $oe_menu_list.click(function (e) {
            var $this = $(this);
            var $parentli = $this.children('.submenu');
            var _this = this;
            efectoFooter($parentli, _this);

            if (_this.attr("href") === typeof undefined) {
                e.preventDefault();
                e.stopPropagation();
            }
        });
    } else {
        $oe_menu_list.bind('mouseenter', function () {
            var $this = $(this);
            $this.addClass('slided selected');
            $this.parent().find("a > i.icon-caret-up, a > i.icon-caret-down").toggleClass('icon-caret-up icon-caret-down');
            $this.children('.submenu').css('z-index', '9999').stop(true, true).slideDown(200, function () {
                $oe_menu_list.not('.slided').children('div').hide();
                $this.removeClass('slided');
            });
        }).bind('mouseleave', function () {
            var $this = $(this);
            $this.removeClass('selected').children('div').css('z-index', '1');
            $this.parent().find("a > i.icon-caret-up, a > i.icon-caret-down").toggleClass('icon-caret-up icon-caret-down');
        });

        $oe_menu_pais.bind('mouseenter', function () {
            var $this = $(this);
            $this.addClass('hovered');
        }).bind('mouseleave', function () {
            var $this = $(this);
            $this.removeClass('hovered');
            $oe_menu_list.children('.submenu').hide();
        })

    }


    if (wAncho <= 700) {
        $("#menuNavega").removeClass("dropdown");
    }

    $('#selectPelicula').selectize({
        valueField: 'title',
        labelField: 'title',
        searchField: 'title',
        options: [],
        create: false,
        openOnFocus: true,
        render: {
            item: function (item, escape) {
                return '<div rel="' + item.key + '">' + item.title + '</div>';
            },
            option: function (item, escape) {
                var actors = [];
                for (var i = 0, n = item.abridged_cast.length; i < n; i++) {
                    actors.push('<span>' + escape(item.abridged_cast[i].name) + '</span>');
                }

                return '<div>' +
                    '<img src="' + escape(item.posters.thumbnail) + '" alt="">' +
                    '<span class="title" data-value="' + item.key + '">' +
                        '<span class="name">' + escape(item.title) + '</span>' +
                    '</span>' +
                    '<span class="description">' + escape(item.synopsis || 'Sinopsis no disponible') + '</span>' +
                    '<span class="actors">' + (actors.length ? 'Actores ' + actors.join(', ') : '') + '</span>' +
                '</div>';
            }
        },
        load: function (query, callback) {
            if (!query.length || query.length < 3) return callback();
            $.ajax({
                type: "POST",
                url: "/manejadores/CatalogoPeliculas.ashx?queryPeliculas=" + query,
                data: "{}",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                async: true,
                success: function (msg) {

                    callback(msg);
                }
            });
        },
        onItemAdd: function (value, $item) {
            DataLayerSearch($($item).attr("rel"));
            window.location = "/pelicula/" + $($item).attr("rel");
        }
    });

    if (detectmob()) {
        $(".navMobile").hide();
        $("html").css("overflow-y", "scroll");
        $(window).load(function () {

            if (wAncho <= 760) {
                $(".navMobile").show();
            } else if (wAncho <= 896 && wAlto <= 414) {
            	// if iPhoneX
            	$(".navMobile").show();
            }
        });
    }


    var ModalEffects = (function () {
        function init() {
            var $overlay = $('.md-overlay'),
            $showTrailer = $('.btnTrailer'),
            $close = $("#videoTrailers").find('.btnClose');

            function removeModal() {
                $("#videoTrailers").removeClass('md-show');
                $("#videoContent").html('');
                videojs("videoTrailerPlay").dispose();
            }
            $(document).on('click', '.btnTrailer', function (e) {
                //$showTrailer.bind("click", function (e) {
                var idVideo = $(this).attr("data-video");
                if (idVideo) {
                    $("#videoTrailers").addClass('md-show');
                    setupVideo(idVideo);
                }
                e.preventDefault();
                e.stopPropagation();
                if ($(".popover").length) {
                    $(".popover").css("z-index", "98");
                }
            });
            $close.bind("click", function (e) {
                removeModal();
                e.preventDefault();
                e.stopPropagation();
                if ($(".popover").length) {
                    $(".popover").css("z-index", "1010");
                }
            });
        }
        init();
    })();

    if (!detectmob())
        $(".lnkPhone").css("cursor", "default").attr("href", "#");
    $(".dropdown .btnRegresar").hide();

    $("#publiboardTop div").removeAttr("style");
    $("#publiboardTop object").removeAttr("style");
    $("#publiboardTop img").removeAttr("style");

    $('.btnCloseID').on('click', Clear);
    function Clear() {
        sessionStorage.clear();
    }


});

function mobileMenu() {
    if (detectmob()) {
        var cambiarRight = 0, cambiarContent = 0, dir = true;
        $("#btnMenu a").click(function (e) {
            dir = !dir;
            cambiarContent = dir ? 0 : 80;
            $(this).toggleClass('active');
            $(".wrapper").stop().animate({ left: cambiarContent + "%" }, 300, function () {
                if (cambiarContent == 80) {
                    $("body, html").stop().animate({ height: "100%" });
                    $(".navMobile").css("overflow-y", "auto");
                    $('header').toggleClass('header--is-open')
                } else {
                    $("body, html").css({ height: "auto" });
                    $(".navMobile .marcas").stop().animate({ left: '-100%' }, 100);
                    $(".navMobile").css("overflow-y", "hidden");
                    $('header').toggleClass('header--is-open');
                }
            });
            e.preventDefault();
            e.stopPropagation();
            return false;
        });

        $("<div class='navMobile' id='masCinepolis'/>").insertBefore(".wrapper");
        var $navMobile;
        $navMobile = $(".navegacion").clone();
        $navMobile.find(".navContent").removeClass('dropdown').removeAttr("id");
        $navMobile.appendTo(".navMobile");

        $(".nuestrasMarcas a").click(function (e) {
            $(".navMobile .marcas").stop().animate({ left: '0px' }, 300);
            e.preventDefault();
            e.stopPropagation();
            return false;
        });
        $("a.btnRegresar").click(function (e) {
            $(".navMobile .marcas").stop().animate({ left: '-100%' }, 300);
            e.preventDefault();
            e.stopPropagation();
            return false;
        });
    } else {
        $('.navMobile').remove();
    }
}

$(window).smartresize(function(){
    var wAncho = $(window).width();
    if (wAncho <= 740) {
        $("#menuNavega").removeClass("dropdown");
    } else {
        $(".filtroBusqueda").removeClass("dropdown");
        $("#menuNavega").addClass("dropdown");
    }
});

function generarPreloadCircular(contentDiv) {
    $("<div class='preloadCircular'/>").appendTo(contentDiv);
}

function generarPreloadCartelera(contentDiv, txtContenido, fondo) {
    $("<div id='preloadCartelera' class=" + fondo + "><p>" + txtContenido + "</p></div>").appendTo(contentDiv);
}

function generarErrorBusqueda(contentDiv, txtContenido) {
    $("<div class='errorBusqueda cf'><span class='col3'>:(</span><p class='col9'>" + txtContenido + "</p></div>").appendTo(contentDiv);
}

function EstaVacio(obj) {
    if (typeof obj == 'undefined' || obj === null || obj === '') return true;
    if (typeof obj == 'number' && isNaN(obj)) return true;
    if (obj instanceof Date && isNaN(Number(obj))) return true;
    return false;
}

function setupVideo(idVideo) {
    var videoName = idVideo;

    var indexOfExtension = videoName.lastIndexOf(".");
    var extension = videoName.substr(indexOfExtension, videoName.length - indexOfExtension);

    var ogguri = encodeURI(videoName.replace(extension, ".ogg"));
    var webmuri = encodeURI(videoName.replace(extension, ".webm"));
    var mp4uri = encodeURI(videoName.replace(extension, ".mp4"));

    $("#videoContent").html('');
    var HTML = '<video id="videoTrailerPlay" class="video-js player-cinepolis vjs-big-play-centered" controls autoplay preload="auto"><source src="' + mp4uri + '" type="video/mp4"><source src="' + ogguri + '" type="video/ogg"></video>'

    $('#videoContent').append(HTML);

    videojs("videoTrailerPlay", { "height": "auto", "width": "auto" }).ready(function () {
        var myPlayer = this;
        var aspectRatio = 8 / 12;

        function resizeVideoJS() {
            var width = document.getElementById(myPlayer.id()).parentElement.offsetWidth;
            myPlayer.width(width).height("auto");
        }

        resizeVideoJS();
        window.onresize = resizeVideoJS;
    });

}

function efectoFooter($parentli, _this) {
    $(".dropdown:visible").hide();
    $parentli.stop().slideToggle(200);
    $(_this).parent().find("a > i.icon-caret-up, a > i.icon-caret-down").toggleClass('icon-caret-up icon-caret-down');
}

var previousScroll = 0,
headerOrgOffset = $('.wrapper > header').height() + 150;

$(window).scroll(function () {
    var currentScroll = $(this).scrollTop();
    if (currentScroll > headerOrgOffset) {
        if (currentScroll > previousScroll) {
            $('.dropdown').slideUp(200);
            var $id = $('.active').attr('id');
            if ($id == "btnAbrirNav")
                $('.abrirContent').find("i").toggleClass('icon-arrow-down icon-arrow-up');
            $('.abrirContent').removeClass('active');
            $('.overlay_cerrar').remove();
        } else {
            $('.dropdown').slideUp(200);
            var $id = $('.active').attr('id');
            if ($id == "btnAbrirNav")
                $('.abrirContent').find("i").toggleClass('icon-arrow-down icon-arrow-up');
            $('.abrirContent').removeClass('active');
            $('.overlay_cerrar').remove();
        }
    }
    previousScroll = currentScroll;
});

$(window).load(function () {
    $.each($(".textInput input"), function () {
        if ($(this).val() != "")
            $(this).parent(".textInput").find("label").addClass('focus active');
    });



});

function cerrarMasCinepolis() {
    $('.AbrirNav a.abrirContent').trigger("click");
}

function actCombCarteleraSemanal() {
    $("select:not(.complejosLista, #selectPelicula, .ddlFormato, .ddlHorarios, .ddlComplejo, .ddlCiudad)").uniform();
}

String.prototype.format = function () {
    var s = this,
        i = arguments.length;

    while (i--) {
        s = s.replace(new RegExp('\\{' + i + '\\}', 'gm'), arguments[i]);
    }
    return s;
};

