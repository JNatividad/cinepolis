function ObtenerCarteleraFront(codigoCiudad) {
    if (EsVIP) {
        MostrarCargandoCartelera($('#cmbCiudadesCartelera').find('option:selected').text())
    }
    $.ajax({
        type: "POST",
        url: UrlCarteles + "/index.aspx/ObtenerCartelesFront",
        data: "{'codigoCiudad':'" + codigoCiudad + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (msg) {
            if (msg.d != null) {
                GuardarCambiarCiudad(codigoCiudad);
                Cartelera = msg.d;
                // if ($(window).width() > 790) $('.listCartelera').masonry('destroy');
                $('.listCartelera').remove();
                $('.contentWrapper .cartelera .col10').prepend("<ul class='listCartelera tituloPelicula'></ul>");
                var oculto_cartel = "";
                $.each(Cartelera.Peliculas, function (index, pelicula) {
                    if (index >= 9) oculto_cartel = "style='display:none;' class='cartel_oculto item mansori'";
                    else oculto_cartel = "class='cartel_visible item mansori'";
                    $(".listCartelera").append("<li " + oculto_cartel + ">" + pelicula.Recurso + "</li>")
                });
                if ($(".listCartelera li").length > 9) {
                    if ($(".listCartelera li").length == 10) {
                        $(".listCartelera li:last").removeClass("cartel_oculto").show();
                    }
                    else {
                        $(".listCartelera").append("<li><div class='btnConsultar'><a href='#'><span>CONSULTAR CARTELERA COMPLETA <i class='icon-chevron-right'></i></span></a></div></li>");
                    }
                }
                // if ($(window).width() > 790) {
                //     $('.listCartelera').masonry({
                //         columnWidth: ".item",
                //         "gutter": 18,
                //         itemSelector: 'li'
                //     });
                //     EventosMouseCartel()
                // } else {
                //     $(".listCartelera li.mansori figure img").unbind("click");
                //     $(".listCartelera li.mansori figure img").on("click", function (e) {
                //         ClickCartel(this);
                //         e.preventDefault()
                //     })
                // }
                // BindClickVerMas();

                masonryCartelera();


                $("a[id$=lbl_encartelera]").html("CARTELERA EN " + Cartelera.Nombre.toUpperCase() + "<i class='icon-chevron-right'></i>").attr("href", "cartelera/" + Cartelera.CodigoCiudad + "/").attr('Clave', Cartelera.CodigoCiudad);
                

                if ($wW <= 1025) {
                    $('.cartel_visible').fadeIn(800).attr('style', 'display: inline-block');
                } else {
                    $('.cartel_visible').fadeIn(800)
                }
    
                
            }
        },
        error: function (xhr) {
            if (!UsuarioAbortoPeticionAjax(xhr)) {
                jsUtil.fancyAlertRedirect("Error al intentar obtener la cartelera.", window.location.href, "Reintentar")
            }
        }
    })
}
