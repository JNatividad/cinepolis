var Cartelera = [];
var ClaveCiudadElegida = null;

//$("#navegacion_masterVip").remove();

$("#cmbCiudadesCartelera").html($("select[id$=cmbCiudades]").html());
$.uniform.update("#cmbCiudadesCartelera");

//$(document).on("click", ".btn-call a", function () {
    
//    var obj = $(this);
    
//    if (obj.text() === "Ver Sinopsis") {
//        ;
//        var item = obj.parent().parent().parent().parent();
//        var data = item.find("span.data-layer");
//        var dataObj = {
//            titulo: data.attr("data-titulo"),
//            distribuidora: data.attr("data-distribuidora"),
//            variante: data.attr("data-variante"),
//            titulooriginal: data.attr("data-titulooriginal"),
//            genero: data.attr("data-genero"),
//            clasificaicon: data.attr("data-clasificaicon"),
//            director: data.attr("data-director"),
//            actor: data.attr("data-actor"),
//            list: data.attr("data-list")
//        };

//        //Eliminar los acentos del título de la película
//        var movieKey = dataObj.titulo.toLowerCase()
//            .replace(" ", "-")
//            .replace(new RegExp(/[àáâãäå]/g), "a")
//            .replace(new RegExp(/[èéêë]/g), "e")
//            .replace(new RegExp(/[ìíîï]/g), "i")
//            .replace(new RegExp(/ñ/g), "n")
//            .replace(new RegExp(/[òóôõö]/g), "o")
//            .replace(new RegExp(/[ùúûü]/g), "u");
//        DataLayeWeb("Front", dataObj.titulo, dataObj.distribuidora, "", dataObj.titulooriginal, dataObj.genero, dataObj.clasificaicon, dataObj.director, dataObj.protagonista, "", "click", "pelicula/" + data.attr("data-keymovie"));
//    }
//});

//ScrollDatalayer(".listCartelera li", "Front", "span.data-layer");

$(document).ready(function () {

    $("#cmbCiudadesCartelera").on("change", function (e) {
        if ($(this).find("option").index($(this).find("option:selected")) > 0) {
            ClaveCiudadElegida = $("#cmbCiudadesCartelera option:selected").attr("clave");
            MostrarCargandoCartelera($("#cmbCiudadesCartelera").find("option:selected").text());
            ObtenerCarteleraFront($("#cmbCiudadesCartelera option:selected").attr("clave"));
	       // ScrollDatalayer(".listCartelera li", "Front", "span.data-layer");
        }
    });
        
   // BindClickVerMas();

    $("a[id$=lbl_encartelera]").on("click", function (e) {
        e.preventDefault();
        var ClaveCiudad = $(this).attr("Clave");
        if (!EstaVacio(ClaveCiudad)) {
        	GuardarCambiarCiudad(ClaveCiudad);

            if (EsVIP) {
                var LinkVip = document.location.href.indexOf("/vip/") == -1 ? "vip/" : "";
                document.location.href = LinkVip + "cartelera/" + ClaveCiudad;
            }
            else
                document.location.href = "cartelera/" + ClaveCiudad;
        }        
    });
 });

//function BindClickVerMas()
//{
//    $(".btnConsultar a").click(function (e) {
//        e.preventDefault();

//        $(".cartel_oculto").show();
//        $(".listCartelera li").last().hide();
//        $("html").addClass("skin--is-complete");

//        var wAncho = $(window).width();
//        if (wAncho > 790) {
//            $(".listCartelera").masonry({
//                columnWidth: ".item",
//                "gutter": 18,
//                itemSelector: "li"
//            });
//        }

//        $("img.lazy").each(function () {
//            $(this).attr("src", $(this).attr("data-src"));
//        });
//	    //setTimeout(function() {
//		   // peliculasVistas(".listCartelera li", "Front", "span.data-layer");
//	    //},2000);
//    });
//}

function MostrarCargandoCartelera(NombreCiudad)
{
    var strVIP = EsVIP ? " VIP " : " ";
    var ClasePreload = EsVIP ? "bgpreload_Negro" : "bgpreload_Blanco";
    $("a[id$=lbl_encartelera]").html("CARTELERA" + strVIP + "EN " + NombreCiudad.toUpperCase() + " <i class='icon-chevron-right'></i>").attr("href", "cartelera/" + $("#cmbCiudadesCartelera option:selected").attr("clave")).attr("Clave", $("#cmbCiudadesCartelera option:selected").attr("clave"));
    $(".listCartelera li").remove();
    //$(".btnVerCartelera").hide();
    if ($(".listCartelera").find("#preloadCartelera").length <= 0) {
        generarPreloadCartelera($(".listCartelera"), "Cargando cartelera", ClasePreload);
    }
}

function CambiarCarteleraVIP(Ciudad, NombreCiudad) {
    $(".listCartelera ul").html("");
    $("#preloadCartelera").remove();
    
    $.each(Ciudad.Peliculas, function (index, pelicula) {
        btn - call
        $(".listCartelera ul").append("<li class='col2'>\
							<figure>\
							    <a href='/vip/pelicula/" + pelicula.Clave + "/'>\
							        <div class='corner 4dx'>" + ObtenerRecurso(pelicula) + "</div>\
                                    <img src='" + pelicula.Cartel + "' alt='" + pelicula.Titulo + "' data-pelicula='" + pelicula.Clave +"'>\
								    <figcaption>" + pelicula.Titulo + "</figcaption>\
								</a>\
							 </figure>\
						</li>");
    });

    $(".listCartelera .col2 ").hide();
    $(".listCartelera .col2 ").fadeIn(800);

    var LinkVip = document.location.href.indexOf("/vip/") == -1 ? "vip/" : "";
    $("a[id$=lbl_encartelera]").html("CARTELERA VIP EN " + Ciudad.Nombre.toUpperCase() + " <i class='icon-chevron-right'></i>").attr("href", LinkVip + "cartelera/" + Ciudad.CodigoCiudad + "/").attr("Clave", Ciudad.CodigoCiudad);    
    $(".btnVerCartelera").show();
}

function ObtenerRecurso(pelicula) {
    var Imagen = "";
    if (pelicula.Recurso != null && pelicula.Recurso != "")
        Imagen = "<img src='" + pelicula.Recurso + "' alt='" + pelicula.Recurso + "'>";
    return Imagen;
}

function CambiarCartelera(Ciudad, NombreCiudad) {
    //if ($(window).width() > 790)
        //$(".listCartelera").masonry("destroy");
    $(".listCartelera").remove();    
    $(".col10").prepend("<ul class='listCartelera tituloPelicula'></ul>");

    var oculto_cartel = "";
    $.each(Ciudad.Peliculas, function (index, pelicula) {
        if (index >= 9)
            oculto_cartel = "style='display:none;' class='cartel_oculto item mansori'";
        else
            oculto_cartel = "class='cartel_visible item mansori'";

        var cartelSellos = "<figure class='overlay'>\
                                <img alt='{1}' src='{0}' width='139' height='203' data-pelicula='" + pelicula.Clave +"'/>\
                                <figcaption class='cintillo {3}'>{2}</figcaption>\
                                <div class='opcion-sellos' style='display: none; padding-top: 0px; opacity: 0;'>\
                                    <h1>{1}</h1>\
                                    {4}\
                                </div>\
                            </figure>";

        var btnSinopsis = "<nav class='btn-call'>\
                                <a class='lnkCartelera' onclick='LinkCartelera(this); return false;' href='/cartelera/{1}'>\
                                    Ver Cartelera\
                                </a>\
								<a href='pelicula/{0}' class='lnkSinopsis' onclick='LinkSinopsis(this); return false;'>\
									Ver Sinopsis\
								</a>\
							</nav>";

        var claseSello = "estreno";

        var lstRutaSellos = new  Array();
        for (var i = 0; i < pelicula.SellosLogo.length; i++)
            lstRutaSellos.push(pelicula.SellosLogo[i].Sello);

        if (pelicula.SellosTexto.length > 0) {
            switch (ReemplazaCaracteresInvalidosEspacioGuion(pelicula.SellosTexto[0].Nombre).toString().toLowerCase()) {                
                case "estreno": claseSello = "estreno"; break;
                case "garantia": claseSello = "garantia"; break;
                case "sala-de-arte": claseSello = "sala-arte"; break;
                case "preventa": claseSello = "preventa"; break;
                case "promocion": claseSello = "promocion"; break;
                case "de-festival": claseSello = "festivales"; break;
                default: claseSello = "estreno"; break;
            }
        }

        if (pelicula.SellosLogo.length <= 0 && pelicula.SellosTexto.length > 0)
            cartelSellos = cartelSellos.replace("data-sellos=", "").format(pelicula.Cartel, pelicula.Titulo, pelicula.SellosTexto[0].Nombre, claseSello, btnSinopsis.format(pelicula.Clave, Ciudad.CodigoCiudad));
        else if (pelicula.SellosLogo.length > 0) {
            switch (pelicula.SellosLogo.length) {
                case 0:
                    var strSelloTexto = pelicula.SellosTexto.length > 0 ? pelicula.SellosTexto[0].Nombre : "";
                    var cartelCopy = strSelloTexto + " <span class='btn-icon'>\
                                                                            <a href='" + (pelicula.SellosLogo[0].Link != "#" ? pelicula.SellosLogo[0].Link : ("pelicula/" + pelicula.Clave)) + "'>\
                                                                                <img alt='" + pelicula.Titulo + "' src='" + pelicula.SellosLogo[0].Sello + "' data-pelicula='" + pelicula.Clave +"'/>\
                                                                            </a>\
                                                                        </span>";
                    claseSello += " logo";
                    cartelSellos = cartelSellos.format(pelicula.Cartel, pelicula.Titulo, cartelCopy, claseSello, btnSinopsis.format(pelicula.Clave, Ciudad.CodigoCiudad));
                    break;
                default:
                    var filaA = (Math.floor(pelicula.SellosLogo.length / 2)) + (Math.floor(pelicula.SellosLogo.length % 2));
                    var filaB = (Math.floor(pelicula.SellosLogo.length / 2));
                    var colsA = 12 / filaA;
                    var colsB = pelicula.SellosLogo.length == 2 ? 6 : 12 / (filaB == 0 ? 1 : filaB);

                    var columnaLogos = "";

                    if (pelicula.SellosLogo.length > 2) {
                        columnaLogos = "<nav class='row'>";
                        for (var i = 0; i < filaA; i++)
                            columnaLogos += "<span class='col" + colsA + "' href='" + (pelicula.SellosLogo[i].Link != "#" ? pelicula.SellosLogo[i].Link : ("pelicula/" + pelicula.Clave)) + "'><img src='" + pelicula.SellosLogo[i].Sello + "' alt='' /></span>";
                        columnaLogos += "</nav>";
                    }

                    columnaLogos += "<nav class='row'>";
                    for (var i = pelicula.SellosLogo.length <= 2 ? 0 : filaA; i < (filaA + filaB) ; i++)
                        columnaLogos += "<span class='col" + colsB + "' href='" + (pelicula.SellosLogo[i].Link != "#" ? pelicula.SellosLogo[i].Link : ("pelicula/" + pelicula.Clave)) + "'><img src='" + pelicula.SellosLogo[i].Sello + "' alt='' /></span>";
                    columnaLogos += "</nav>";


                    var strFigCaption = "";
                    if (pelicula.SellosTexto.length > 0)
                        strFigCaption = "<figcaption class='cintillo {0}'>{1}</figcaption>".format(claseSello, pelicula.SellosTexto[0].Nombre);
                    else
                        strFigCaption = "<figcaption class='cintillo' style='background-color:transparent'></figcaption>";

                    btnSinopsis = btnSinopsis.format(pelicula.Clave, Ciudad.CodigoCiudad);
                    cartelSellos = "<figure class='overlay' >\
								        <img alt='{0}' src='{1}' width='139' height='203' data-pelicula='" + pelicula.Clave +"'>\
                                        {4}\
								        <div class='opcion-sellos sellos-{2}' style='display: none; padding-top: 0px; opacity: 0;'>\
                                            <h1>{0}</h1>\
                                            {3}\
                                        </div>\
                                    </figure>".format(pelicula.Titulo, pelicula.Cartel, pelicula.SellosLogo.length, columnaLogos + btnSinopsis, strFigCaption);
                    break;
            }
        }
        else if (pelicula.SellosLogo.length <= 0 && pelicula.SellosTexto.length <= 0) {
            cartelSellos = "<figure class='overlay'>\
								<img alt='{0}' src='{1}' width='139' height='203' data-pelicula='" + pelicula.Clave +"'>\
								<div class='opcion-sellos' style='display: none; padding-top: 0px; opacity: 0;'>\
                                    <h1>{0}</h1>\
                                {2}\
                                </div>\
                            </figure>".format(pelicula.Titulo, pelicula.Cartel, btnSinopsis.format(pelicula.Clave, Ciudad.CodigoCiudad));
        }

        
        $(".listCartelera").append("<li " + oculto_cartel + ">" + cartelSellos + GenerarSellosCartelMovil(pelicula.Titulo, pelicula.Clave, pelicula.SellosLogo, Ciudad.CodigoCiudad) + "</li>");
    });

    if ($(".listCartelera li").length > 9)
    {
        $(".listCartelera").append("<li><div class='btnConsultar'><a href='#'><span>CONSULTAR CARTELERA COMPLETA <i class='icon-chevron-right'></i></span></a></div></li>");
    }
    else {
        $(".listCartelera li.mansori figure img").unbind("click");
        $(".listCartelera li.mansori figure img").on("click", function (e) {
            ClickCartel(this);
            e.preventDefault();
        });
    }
    
    //if ($(window).width() > 790) {
    //    $(".listCartelera").masonry({
    //        columnWidth: ".item",
    //        "gutter": 18,
    //        itemSelector: "li"
    //    });

        EventosMouseCartel();
 

   // BindClickVerMas();

    $("a[id$=lbl_encartelera]").html("CARTELERA EN " + Ciudad.Nombre.toUpperCase() + "<i class='icon-chevron-right'></i>").attr("href", "cartelera/" + Ciudad.CodigoCiudad + "/").attr("Clave", Ciudad.CodigoCiudad);
    $(".cartel_visible").hide();
    $(".cartel_visible").fadeIn(800);

    //masonryCartelera();
}

function GenerarSellosCartelMovil(titulo, clave, selloLogo, ciudad) {
    var strGenerico = "<div class='sellos'>\
                            <span>X</span>\
                            <h1>{0}</h1>\
                            <nav>{1}</nav>\
                            <nav>\
                                <a href='/cartelera/{2}' class='lnkCartelera' onclick='LinkCartelera(this); return false;'>Ver Cartelera</a>\
                                <a href='/pelicula/{3}' onclick='LinkSinopsis(this); return false;'>Ver Sinopsis</span></a>\
                            </nav>\
                        </div>";
    var strSellos = "";

    var lstRutaSellos = new Array();
    for (var i = 0; i < selloLogo.length; i++)
        strSellos += "<span><img src='{0}' alt='' /></span>".format(selloLogo[i].Sello);

    return strGenerico.format(titulo, strSellos, ciudad, clave);
}

function EventosMouseCartel() {
    $("figure.overlay").bind("mouseenter", function () {
        $(this).find(".opcion-sellos").fadeIn("fast", function () {
            $(this).animate({
                paddingTop: "60px",
                opacity: 1
            });
        });
        $(this).find(".ver-mas span").removeClass("icon-plus2").addClass("icon-minus2").css("color", "#FECA30");
    });

    $("figure.overlay").bind("mouseleave", function () {
        $(this).find(".opcion-sellos").fadeOut("fast", function () {
            $(this).animate({
                paddingTop: 0,
                opacity: 0
            });
        });
        $(this).find(".ver-mas span").removeClass("icon-minus2").addClass("icon-plus2").css("color", "#0B5BA1");
    });
}

function ReemplazaCaracteresInvalidosEspacioGuion(str) {
    var caracteresInvalidos = new Array("á", "à", "ä", "â", "ª", "Á", "À", "Â", "Ä",
                                                "é", "è", "ë", "ê", "É", "È", "Ê", "Ë",
                                                "í", "ì", "ï", "î", "Í", "Ì", "Ï", "Î",
                                                "ó", "ò", "ö", "ô", "Ó", "Ò", "Ö", "Ô",
                                                "ú", "ù", "ü", "û", "Ú", "Ù", "Û", "Ü",
                                                "ñ", "Ñ", "ç", "Ç", " ");
    var caracteresReemplazo = new Array("a", "a", "a", "a", "a", "A", "A", "A", "A",
                                            "e", "e", "e", "e", "E", "E", "E", "E",
                                            "i", "i", "i", "i", "I", "I", "I", "I",
                                            "o", "o", "o", "o", "O", "O", "O", "O",
                                            "u", "u", "u", "u", "U", "U", "U", "U",
                                            "n", "N", "c", "C", "-");

    if (caracteresInvalidos.length == caracteresReemplazo.length)
        for (var i = 0; i < caracteresInvalidos.length; i++) {
            var RegCaracter = new RegExp(caracteresInvalidos[i].toString(), "g");
            str = str.replace(RegCaracter, caracteresReemplazo[i]);
        }

    var caracteresURL = new Array("\\?", "¿", "&", "#", ";", "/", ":", "=", "%", "<", ">", "~", "®", "{", "}");

    for (var i = 0; i < caracteresURL.length; i++) {
        var RegCaracterSigno = new RegExp(caracteresURL[i].toString(), "g");
        str = str.replace(RegCaracterSigno, "");
    }
    str = str.replace("--", "-").replace("--", "-").trim();
    return str;
}