//INFORMACIÓN COMPLEJO
var DatosComplejo = {};
var CargueScriptGoogleMaps = false;
var CarguePrimeroDatosComplejo = false;
var Mapa = null;
var Marcador = null;

$(document).ready(function() {
    $(".btnCerrarComplejo").click(function (e) {
        $("#publiboardTop").show();
        $(".infoComplejo article").slideToggle(200);
        MostrarOcultarOverlayInfo()
        e.preventDefault();
        e.stopPropagation();
    });

    setTimeout(function () {
        $("#sasMultiExpand").css("z-index", "1");
        $("#leaderboard").hover(function () {
            $("#sasMultiExpand").css("z-index", "1000");
        }, function () {
            $("#sasMultiExpand").css("z-index", "1");
        });
    }, 2000);
    
});

function MostrarOcultarOverlayInfo() {
    if ($(".overlay_info").length <= 0) {
        $(".infoComplejo").prepend("<div class='overlay_info' style='background-color: black;width: 100%; height: 100%;position: fixed; z-index: -1; opacity: .3;'></div>");
        $(".overlay_info").click(function () {
            $(".btnCerrarComplejo").trigger("click");
        });
    }
    else {
        $(".overlay_info").remove();
    }
}

function ObtenerInformacionComplejo(complejo, simbolo) {
    $.ajax({
        type: "POST",
        url: "/Cartelera.aspx/ObtenerInformacionComplejo",
        data: "{'idComplejo':" + complejo.IdComplejo + ",'HijosComplejo':'" + complejo.HijosComplejos + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: true,
        success: function (msg) {
            if (!$.isEmptyObject(msg.d))
            {
                var precios = msg.d.imgPrecios;
                $(".politica-precio").empty();
                if (precios !== "")
                {
                    $(".politica-precio").empty();
                    $(".politica-precio").empty().append("<img src='" + precios + "' alt='Política de precios' />");
                }

                DatosComplejo = msg.d.datos_complejo;

                if (DatosComplejo.Conceptos.length <= 0)
                {
                    $("#politicasPrecios").parent().css("display", "none");
                    $("#politicasPrecios").css("display", "none");
                }

                if (DatosComplejo.Restriccion === "")
                {
                    $(".restricciones > p").css("display", "none");
                }
                DatosComplejo.SalasVip = msg.d.numsalas_vip;
                setTimeout(function () {
                    if (CargueScriptGoogleMaps) {
                        ParseaDatosComplejo(simbolo);
                    }
                    else {
                        CarguePrimeroDatosComplejo = true;
                    }
                }, 10);
            }
            else {
                $(".infoComplejo .bgpreload_Gris").remove();
                generarErrorBusqueda($('.infoComplejo article .cf').first(), "Información del complejo no disponible");
                $(".infoComplejo .errorBusqueda").css('padding-bottom', '90px');
            }
        },
        error: function (xhr) {
            if (!UsuarioAbortoPeticionAjax(xhr)) {
                alert("Error al intentar obtener la información del complejo");
            }
        }
    });
}

function ParseaDatosComplejo(simbolo) {

    var SimbolosPais = {};
    SimbolosPais["CinepolisMX"] = "$";
    SimbolosPais["CinepolisCR"] = "¢";
    SimbolosPais["CinepolisGT"] = "Q.";
    SimbolosPais["CinepolisCO"] = "$";
    SimbolosPais["CinepolisSV"] = "$";
    SimbolosPais["CinepolisHN"] = "L";
    SimbolosPais["CinepolisPE"] = "S/.";
    SimbolosPais["CinepolisPA"] = "$";


    $(".politicasPrecios table").html('');
    $("#lgNegocios, #lgTiposSalas").html('');
    $(".comp_direccion").html(DatosComplejo.Direccion);
    $(".comp_telefonos").html(DatosComplejo.Telefonos);
    $(".infoComplejo .col2 span").html(DatosComplejo.Salas);
    $(".restricciones span").html(DatosComplejo.Restriccion);
    $(".numSalasVip").remove();
    $(".infoComplejo .col2 span").css('background-color', '#0b5ba1');
    if (DatosComplejo.SalasVip > 0) {
        $(".infoComplejo .col2 .lgInformacion").append("<span title='Salas VIP' class='numSalasVip' style='background-color:black; margin-left:3px;'>" + DatosComplejo.SalasVip + "</span>");
    }
    else {
        if (DatosComplejo.Nombre.toLowerCase().indexOf('vip') >= 0)
        {
            $(".infoComplejo .col2 span").css('background-color', 'black');
        }
    }
    if (!EstaVacio(DatosComplejo.Conceptos)) {
        $.each(DatosComplejo.Conceptos, function (index, concepto) {
            $(".politicasPrecios table").append("<tr><td>" + concepto.Nombre + "</td><td><strong> " + (EstaVacio(simbolo) ? SimbolosPais[PaisCompra] : simbolo) + " " + concepto.Precio + "</strong></td></tr>");
        });
    }

    if (!EstaVacio(DatosComplejo.Negocios)) {
        $.each(DatosComplejo.Negocios, function (index, negocio) {
            $("#lgNegocios").append("<img src='" + negocio.Logo + "' title='" + negocio.Nombre + "' alt='" + negocio.Nombre + "'>");
        });

        if (DatosComplejo.Negocios.length <= 0)
            $("#lgNegocios").parent().hide();
        else
            $("#lgNegocios").parent().show();
    }
    else
        $("#lgNegocios").parent().hide();

    if (!EstaVacio(DatosComplejo.TipoSalas)) {
        $.each(DatosComplejo.TipoSalas, function (index, sala) {
            $("#lgTiposSalas").append("<a href='"+sala.Link+"'><img src='" + sala.Logo.replace("imagenes","img") + "' title='" + sala.Nombre + "' alt='" + sala.Nombre + "'></a>");
        });

        if (DatosComplejo.TipoSalas.length <= 0)
            $("#lgTiposSalas").parent().hide();
        else
            $("#lgTiposSalas").parent().show();
    }
    else
        $("#lgTiposSalas").parent().hide();

    $(".politicasPrecios").css('overflow-y', 'scroll');
    //if (!detectmob()) {
    //    $('.politicasPrecios').niceScroll();
    //} else {
    //    $(".politicasPrecios").css('overflow-y', 'scroll');
    //    $(".politicasPrecios .content").css('height', 'auto');
    //}

    MostrarMapa();
    $(".infoComplejo .cf .row").show();
    $(".infoComplejo #preloadCartelera").remove();

    //if (PaisCompra == "CinepolisCO") {
    //    $(".politica-precio").empty().append("<img src='//static.cinepolis.com/img/politica-precios/" + PaisCompra.toLowerCase() + "/pp-" + DatosComplejo.CodigoComplejo + ".jpg' alt='Política de precios' />");
    //}
}

$(document).on('click', '.btnInfoComplejo', function (e) {
    e.preventDefault();
    e.stopPropagation();
    $(".infoComplejo .errorBusqueda").remove();
    if (!CargueScriptGoogleMaps) {
        CargarScriptGoogleMaps();
    }

    var complejo_seleccionado = {
        IdComplejo: $(this).attr('idComplejo'),
        HijosComplejos: $(this).attr('idcomplejohijo'),
        Nombre: $(this).attr('nombrecomplejo'),
        Ciudad: $(this).attr('nombreciudad')
    }

        ObtenerInformacionComplejo(complejo_seleccionado, $("section.infoComplejo").attr("data-simbolo"));
    
    if (!detectmob()) {
        $(".infoComplejo article").slideDown(200);
    } else {
        $("html, body").animate({ scrollTop: $('.infoComplejo').position().top - 140 }, $('.btnInfoComplejo').index($(this)) == 0 ? 0 : 400, function () { $(".infoComplejo article").slideDown(200); });
    }
    MostrarOcultarOverlayInfo();
    
    $(".infoComplejo header h2").html(complejo_seleccionado.Ciudad + ", " + complejo_seleccionado.Nombre);
    $(".infoComplejo .cf .row").hide();
    generarPreloadCartelera($('.infoComplejo article .cf').first(), "", "bgpreload_Gris");//Obteniendo datos del complejo
    $(".infoComplejo .bgpreload_Gris").css({ 'height': '380px', 'margin': 'auto' }).find('p').css('margin-bottom', '160px');
    $("#publiboardTop").hide();
});

function MostrarMapa() {
    var centro = new google.maps.LatLng(DatosComplejo.Latitud, DatosComplejo.Longitud);
    if (Mapa == null) {
        var mapOptions = {
            zoom: 14,
            center: centro,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };

        Mapa = new google.maps.Map(document.getElementById('map-canvas'),
            mapOptions);
        var image = "/imagenes/marcador-cine.png"

        Marcador = new google.maps.Marker({ icon: image });
        Marcador.setPosition(centro);
        Marcador.setMap(Mapa);
    }
    else {
        Mapa.setZoom(14);
        Mapa.setCenter(centro);
        Marcador.setPosition(centro);
    }
}

//MAPA COMPLEJO
function TermineCargaScriptGoogleMaps() {
    CargueScriptGoogleMaps = true;
    if (CarguePrimeroDatosComplejo) {
        ParseaDatosComplejo();
    }
}

function CargarScriptGoogleMaps() {
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://maps.googleapis.com/maps/api/js?v=3.exp&sensor=false&' +
        'callback=TermineCargaScriptGoogleMaps';
    document.body.appendChild(script);
}