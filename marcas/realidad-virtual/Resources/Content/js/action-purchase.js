function route(url)
{
    $.Url = /localhost/.test(document.URL) ? location.protocol + '//' + location.host + '/' : location.protocol + '//' + location.host + '/' + 'realidad-virtual/';
    return $.Url + url;
}
var urlPais = location.hostname;


if (urlPais === "localhost")
{
    urlPais = "MX";
}

var placeholderSelect = "";
$.ajax({
    type: "POST",
    url: route("copy"),
    datatype: "Json",
    async: false,
    data: { paisUrl: urlPais },
    success: function (data)
    {
        $(".recommend-list").html(data.recomendacionesCompra);
        $("#gira-movil").html(data.giraMovilCompra);
        $(".top-description").html(data.headerCompra);
        $("#chooseGame").html(data.btnCompra);
        $(".footer-link").attr("href", data.urlAvisoPrivacidad);
        $(".slogan-home").text(data.SlogaGame);
        $(".hour-label").text(data.LabelSeleccionaHora);
        $(".date-label").text(data.LabelSeleccionaFecha);
        $(".btn-back").text(data.BtnAtras);
        $(".btn-video").text(data.BtnVideo);
        $("#complejos").attr("placeholder", data.SeleccionComplejo);
        $(".location-text-footer").text(data.SloganLocation);
        placeholderSelect = data.SeleccionComplejo;
    }
});

$.ajax({
    type: "POST",
    url: route("juegos-usuario"),
    datatype: "Json",
    async: false,
    data: { pais: urlPais },
    success: function (data)
    {
        var count = 0;
        var html = "";
        $.each(data, function (index, value)
        {
            var salto = "";

            var classMonth = "";

            if (location.host.includes("localhost"))
            {
                if (index === 2)
                {
                    salto = "<br />";
                }

                if (index === 4)
                {
                    salto = "<br />";
                }
                count++;
            }


            //if (urlPais.endsWith(".com"))
            //{
            //    if (index === 2)
            //    {
            //        salto = "<br />";
            //    }

            //    if (index === 4)
            //    {
            //        salto = "<br />";
            //    }
            //    count++;
            //}
            //if (value.PeliculaId == 27939)
            //{
            //    $(".top-description").text("Descubre el juego del mes y juégalo por tan sólo $100");
            //    classMonth = "game_of_the_month";
            //}

            //if (count === 2)
            //{
            //    salto = "<br />";
            //}


            //if (count === 4)
            //{
            //    salto = "<br />";
            //}
            //count++;

            html += '<div class="slide ' + classMonth + ' swiper-slide">' +
                '<span class="slide-hov"></span>' +
                '<a class="slide-link" href="#" data-sessionvr id-generico=' + value.idGenerico + ' data-titulojuego="' + value.Titulo + '" data-vistaid="' + value.VistaId + '" data-juegopandora="' + value.PeliculaId + '" data-juegoid="' + value.PeliculaId + '">' +
                '<img src="' + value.Poster + '" alt="' + value.Titulo + '" title="' + value.Titulo + '">' +
                '</a>' + '<span class="slide-players">Max ' + value.NumeroJugadores + ' jugadores</span>' +
                '</div>' + salto;
        });

        if (html != "")
        {
            $("#seccion-juegos").append(html /*+ "<br />"*/);
        }

        $.ajax({
            type: "POST",
            url: route("juegos-usuario"),
            datatype: "Json",
            async: false,
            data: { pais: "lobby." + urlPais },
            success: function (data)
            {
                var session = "";
                html = "";
                count = 0;
                $.each(data, function (index, value)
                {


                    var classMonth = "";
                    var salto = "";

                    if (location.host.includes("localhost"))
                    {
                        if (index === 1)
                            salto = "<br />";

                        if (value.PeliculaId == 27939)
                        {
                            $(".top-description").text("Descubre el juego del mes y juégalo por tan sólo $100");
                            classMonth = "game_of_the_month";
                        }
                    }



                    //if (urlPais.endsWith(".com"))
                    //{
                    //    if (index === 1)
                    //        salto = "<br />";

                    //    if (value.PeliculaId == 27939)
                    //    {
                    //        $(".top-description").text("Descubre el juego del mes y juégalo por tan sólo $100");
                    //        classMonth = "game_of_the_month";
                    //    }
                    //}


                    else if (urlPais.endsWith(".co.cr"))
                    {
                        session = "data-sessionvr='26229'";
                    } else
                    {
                        session = "";
                    }
                    count++;
                    html += '<div class="slide ' + classMonth + ' swiper-slide">' +
                        '<span class="slide-hov"></span>' +
                        '<a class="slide-link" ' + session + ' id-generico=' + value.idGenerico + ' href="#" data-titulojuego="' + value.Titulo + '" data-vistaid="' + value.VistaId + '" data-juegopandora="' + value.PeliculaId + '" data-juegoid="' + value.PeliculaId + '">' +
                        '<img src="' + value.Poster + '" alt="' + value.Titulo + '">' +
                        '</a>' + '<span class="slide-players">Max ' + value.NumeroJugadores + ' jugadores</span>' +
                        '</div>' + salto;
                });
                $("#seccion-juegos").append(html);
            }
        });

        $('.slider').addClass('loaded');
    }
});

//Al seleccionar el juego, se hace el llamado de los complejos donde esté disponible
$("#seccion-juegos").on("click", ".slide-link", function (e)
{

    var juegoId = $(this).attr("data-juegoid");
    var juegoIdAux = $(this).attr("data-juegoid");
    var aux = $(this).attr("data-sessionvr");
    if (aux != undefined || aux != "")
    {
        juegoId = aux;
    }

    if (aux === "")
    {
        juegoId = juegoIdAux;
    }

    var vista = $(this).attr("data-vistaid");
    var juegoPandora = $(this).attr("id-generico");

    $("#complejos").empty();
    $(".lista-dias").empty();
    $("#lista-horarios").empty();

    $.ajax({
        type: "POST",
        url: route("juegos"),
        datatype: "Json",
        async: false,
        data: { id: juegoPandora },
        success: function (data)
        {
            $("#trailer-juego").remove();
            if (data.EsArena)
            {
                if (data.PeliculaId !== "26959")
                {
                    $("#logo-experiencia").removeClass("vrcade");
                    $("#logo-experiencia").addClass("zero");

                } else
                {
                    $("#logo-experiencia").removeClass("zero");
                    $("#logo-experiencia").addClass("vrcade");
                }
            }
            else
            {
                $("#logo-experiencia").removeClass("zero");
                $("#logo-experiencia").addClass("vrcade");
            }

            if (data.Video === "javascript:void(0);")
            {
                $("#trailer-juego").remove();
            } else
            {
                var html = '<a class="vrbtn vrbtn--game" data-fancybox id="trailer-juego" href="https://www.youtube.com/watch?v=_sI_Ps7JSEk">' +
                    '<span class="vrbtn--game-hover btn-video" >VIVE LA EXPERIENCIA</span >' +
                    '</a>';
                $(".game-logo").append(html);
            }

            $("#trailer-juego").removeAttr("href");
            $("#trailer-juego").attr("href", "https://www.youtube.com/watch?v=" + data.Video);



            $("#titulo-juego").text("");
            $("#titulo-juego").text(data.Titulo);

            $("#numero-jugadores").text("");
            $("#numero-jugadores").text(data.NumeroJugadores + " JUGADORES");

            $("#sinopsis-juego").text("");
            $("#sinopsis-juego").text(data.Descripcion);

            $("#cover-juego").removeAttr("src");
            $("#cover-juego").attr("src", data.Fondo);


            $("#logo-juego").removeAttr("src");
            var logo = data.Logo === "" || data.Logo == null ? route("Resources/Content/img/logos/lg-cinepolis-vr.svg") : data.Logo;
            $("#logo-juego").attr("src", logo);

            $.ajax({
                type: "POST",
                url: route("complejos"),
                datatype: "Json",
                async: false,
                data:
                    {
                        id: juegoId,
                        pais: urlPais
                    },
                success: function (data)
                {

                    $("#complejos").append('<option value="" selected>' + placeholderSelect + '</option>');
                    $.each(data, function (index, value)
                    {
                        $("#complejos").append("<option value='" + value.Id + "' data-idcomplejo='" + value.Id + "' data-juegoid='" + juegoId + "' data-vistaid='" + vista + "'>" + value.Nombre + "</option>");
                    });
                }
            })
        }
    })
});

//Al seleccionar el complejo, hace el llamado de los días disponibles del juego en el complejo seleccionado
$('#complejos').change(function ()
{
    var idComplejo = $("#complejos option:selected").val();
    var idJuego = $("#complejos option:selected").attr("data-juegoid");
    if (idComplejo === "" || idComplejo === undefined)
    {
        return false;
    }

    if (idJuego === "" || idJuego === undefined)
    {
        return false;
    }

    $.ajax({
        type: "POST",
        url: route("dias-juego"),
        datatype: "Json",
        data:
            {
                complejoId: idComplejo,
                juegoId: idJuego,
                pais: urlPais
            },
        success: function (data)
        {
            $(".lista-dias").empty();
            $("#lista-horarios").empty();
            var html = "";
            $.each(data, function (index, value)
            {
                html +=
                    '<li class="carousel-item fecha" data-date="' + value.Date + '" dia-mes="' + value.DiaMes + '">' +
                    '<a class="carousel-card">' +
                    '<span class="card-text">' + value.DiaSemana + '</span>' +
                    '<span class="card-date">' + value.DiaMes + '</span>' +
                    '<span class="card-text">' + value.Mes + '</span>' +
                    '</a>' +
                    '</li>';
            });
            $(".lista-dias").html(html);
            html = "";
        }
    });
});

//Al seleccionar el día, se hace el llamado del horario disponible en esa fecha
$('#fechas').on("click", "li.fecha", function (e)
{
    var idComplejo = $("#complejos option:selected").val();
    var idJuego = $("#complejos option:selected").attr("data-juegoid");
    if (idComplejo != "")
    {
        var day = $(this).attr("data-date");
        var d = $(this).attr("dia-mes");

        $.ajax({
            type: "POST",
            url: route("horas-dia"),
            async: false,
            datatype: "Json",
            data:
                {
                    id: idJuego,
                    dia: d,
                    complejoId: idComplejo,
                    pais: urlPais
                },
            success: function (data)
            {
                $("#lista-horarios").empty();
                var html = "";
                $.each(data, function (index, value)
				{
					var nuevoProceso = "https://compra.cinepolis.com/?cinemaVistaId=" + value.ComplejoIdVista + "&showtimeVistaId=" + value.HorarioIdVista;
                    var urlCompra = value.UrilCompra;
                    
                    var url = location.host.indexOf("preprod") !== -1 ? nuevoProceso : urlCompra
					html += '<a class="purchase-time-link" target="_blank" href="' + nuevoProceso + '">' + value.Hora + '</a>';

                });
                $("#lista-horarios").append(html);
            }
        });
    }
});
