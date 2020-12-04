var up = false;
var posterVisto = [];
function ScrollDatalayer(element, type, find) {//".listCartelera li", "cartelera-front", "span.data-layer"
    function debounce(func, wait, immediate) {
        var timeout;
        return function () {
            var context = this, args = arguments;
            var later = function () {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };

            var callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    };

    var upScrollViewMovie = debounce(function () {
    	peliculasVistas(element, type, find);
    }, 2000);

    var bottomScrollViewMovie = debounce(function () {
    	peliculasVistas(element, type, find);
    }, 2000);

    var dom = $(document);
    var topScroll = dom.scrollTop();
    
    dom.scroll(function () {
        var topUp = $(this).scrollTop();
        switch (topUp > topScroll) {
            case true:
                up = false;
                bottomScrollViewMovie();
                break;
            case false:
                up = true;
                upScrollViewMovie();
                break;
        }
        topScroll = topUp;
    });
}

var vlistasClick = [];
function peliculasVistasclick(element, type, elementFind) {

    if (location.pathname === "/imax-mx" || location.pathname === "/4dx-mx") {
        ImaxScroll("click");
        return false;
    }

	var elem;
	if (type === "muestras-y-festivales") {
		elem = element;
	} else {
		elem = $(element);
	}
		
		var data = elem.find(elementFind);//span.data-layer
		if (!elem.is(':hidden')) {

			var dataLayerMovie = obj(elem, data.attr("data-titulo"),
								 data.attr("data-distribuidora"),
								 data.attr("data-variante"),
								 data.attr("data-titulooriginal"),
								 data.attr("data-genero"),
								 data.attr("data-clasificaicon"),
								 data.attr("data-director"),
								 data.attr("data-actor"),
								 data.attr("data-list"));
			
            var url = "";//data-clasificaicon
			//if (location.pathname === "/proximos-estrenos") {
			//	url = "/pelicula/" + dataLayerMovie.titulo.replace(" ", "-").toLowerCase();
   //         }


            if (location.pathname.includes("/muestras-y-festivales")) {
                url = "";
                url = "http://" + location.host+ "/muestras-y-festivales/" + location.pathname.split("/")[2] + "/" + data.attr("data-moviekey");

                DataLayeWeb("Front", dataLayerMovie.titulo, dataLayerMovie.distribuidora, "", dataLayerMovie.titulooriginal, dataLayerMovie.genero, dataLayerMovie.clasificaicon, dataLayerMovie.director, dataLayerMovie.protagonista, "", "click", url);
                //if (type.split(",").length >= 3) {
                //    url = location.hostname +
                //        "/muestras-y-festivales/" +
                //        type.split(",")[3] +
                //        "/" +
                //        data.attr("data-moviekey");
                //} else {
                //    url = location.href + "/" + data.attr("data-moviekey");
                //}
                
            }

            //

			if (!(vlistasClick.includes(dataLayerMovie.idMovie))) {
				if (elem.attr("id")) {
					vlistasClick.push(dataLayerMovie.idMovie);
					DataLayeWeb(type,
						dataLayerMovie.titulo,
						dataLayerMovie.distribuidora,
						"",
						dataLayerMovie.tituloOriginal,
						dataLayerMovie.genero,
						dataLayerMovie.clasificacion,
						dataLayerMovie.director,
						dataLayerMovie.protagonista,
						dataLayerMovie.color,
						"click", url);
				}
			}
		}
	//});
}

var obj = function(elem,
	titulo,
	distribuidora,
	formatoMarca,
	tituloOriginal,
	genero,
	clasificacion,
	director,
	protagonista,
	list) {
	var dataLayerMovie =
	{
            idMovie: elem.attr("id"),
            list: list == "" || list == undefined ? "Sin datos" : list,
            titulo: titulo == "" || titulo == undefined ? "Sin datos" : titulo,
            distribuidora: distribuidora == "" || distribuidora == undefined ? "Sin datos" : distribuidora,
            formatoMarca: formatoMarca == "" || formatoMarca == undefined ? "Sin datos" : formatoMarca,
            tituloOriginal: tituloOriginal == "" || tituloOriginal == undefined ? "Sin datos" : tituloOriginal,
            genero: genero == "" || genero == undefined ? "Sin datos" : genero,
            clasificacion: clasificacion == "" || clasificacion == undefined ? "Sin datos" : clasificacion,
            director: director == "" || director == undefined ? "Sin datos" : director,
            protagonista: protagonista == "" || protagonista == undefined ? "Sin datos" : protagonista,
		    color: "Sin datos",
		    boletos: "boletos"
	};
	return dataLayerMovie;
}

function DataLayeWeb(list, titulo, distribuidora, formatoMarca, tituloOriginal, genero, clasificacion, director, protagonista, color, type, url) {

	var data;
	if (type === "click") {

		if ((posterVisto.includes(titulo+"-"+type))) {
			return false;
		}
		vlistasClick.push(titulo + "-" + type);
		data = {
			'event': 'productClick',
			'ecommerce': {//impressions
				'click': {
					'actionField': { 'list': list },// Optional list property.
					'products': [{
						'name': titulo === "" || titulo === undefined ? "Sin datos":titulo,
                        'brand': distribuidora === "" || distribuidora === undefined ? "Sin datos" : distribuidora,//{{Distribuidora}}
                        'variant': formatoMarca === "" || formatoMarca === undefined ? "Sin datos" : formatoMarca,//{{formato de película}}
                        'dimension4': tituloOriginal === "" || tituloOriginal === undefined ? "Sin datos" : tituloOriginal,//{{Nombre original de la película}}
                        'dimension6': genero === "" || genero === undefined ? "Sin datos" : genero,//{{Género de la película}},
                        'dimension7': clasificacion === "" || clasificacion === undefined ? "Sin datos" : clasificacion,//{{Clasificación de la película}}
                        'dimension8': director === "" || director === undefined ? "Sin datos" : director,//{{Director de la película}}
                        'dimension9': protagonista === "" || protagonista === undefined ? "Sin datos" : protagonista,//{{Protagonista de la película}}
                        'dimension10': color === "" || color === undefined ? "Sin datos" : color,//{{Color predominante en cartel}}
						'dimension11': 'boletos'
					}]
				}
			},
            'eventCallback': function () {

                if (location.pathname === "/preventas") {
                    return false;
                } else {
                    location.href = url;
                }
			}
		};

		dataLayer.push(data);
		
	}
	else if (type === "impressions")
	{
		data = {
			'event': 'productImpression',
			'ecommerce': {
				'impressions': [{
				    'name': titulo === "" || titulo === undefined ? "Sin datos" : titulo,
				    'brand': distribuidora === "" || distribuidora === undefined ? "Sin datos" : distribuidora,//{{Distribuidora}}
				    'variant': formatoMarca === "" || formatoMarca === undefined ? "Sin datos" : formatoMarca,//{{formato de película}}
					'list': list, // Optional list property.
					'dimension4': tituloOriginal === "" || tituloOriginal === undefined ? "Sin datos" : tituloOriginal,//{{Nombre original de la película}}
					'dimension6': genero === "" || genero === undefined ? "Sin datos" : genero,//{{Género de la película}},
					'dimension7': clasificacion === "" || clasificacion === undefined ? "Sin datos" : clasificacion,//{{Clasificación de la película}}
					'dimension8': director === "" || director === undefined ? "Sin datos" : director,//{{Director de la película}}
					'dimension9': protagonista === "" || protagonista === undefined ? "Sin datos" : protagonista,//{{Protagonista de la película}}
					'dimension10': color === "" || color === undefined ? "Sin datos" : color,//{{Color predominante en cartel}}
					'dimension11': 'boletos'
				}]
			}
		};
		dataLayer.push(data);
	    
    }
}

//TODO: Revisar que hacer con esto :v
function eventCallback(type, typeDataLayer) {

}

function sizeViewPort(type) {

	var typeSumScrollUp = 0;
	var typeSumScrollBottom = 0;
	var size = [];
	switch (type) {
		case "Front":
			typeSumScrollUp = $(window).scrollTop() + $("header").height() + 10;
			typeSumScrollBottom = $(window).scrollTop() - $("header").height() * 1.6;

			size.push(typeSumScrollUp);
			size.push(typeSumScrollBottom);
			break;

		case "cartelera":
			typeSumScrollUp = $(window).scrollTop() + $("header").height() + 10;
			typeSumScrollBottom = $(window).scrollTop() - $("header").height() *
				1.2;
			size.push(typeSumScrollUp);
			size.push(typeSumScrollBottom);
			break;
		case "proximamente-inferior":
			typeSumScrollUp = $(window).scrollTop();
			typeSumScrollBottom = $(window).scrollTop();
			size.push(typeSumScrollUp);
			size.push(typeSumScrollBottom);
			break;

		case "proximos-estrenos":
			typeSumScrollUp = $(window).scrollTop() + $("header").height() + 10;
			typeSumScrollBottom = $(window).scrollTop() - $("header").height() * 1.6;
			size.push(typeSumScrollUp);
			size.push(typeSumScrollBottom);
			break;

		case "preventas":
		    typeSumScrollUp = $(window).scrollTop() + $("header").height() + 10;
		    typeSumScrollBottom = $(window).scrollTop() - $("header").height() *
		        1.2;
		    size.push(typeSumScrollUp);
		    size.push(typeSumScrollBottom);
			break;

		case "4DX":
			typeSumScrollUp = $(window).scrollTop() + $("header").height() + 10;
			typeSumScrollBottom = $(window).scrollTop() - $("header").height() * 1.6;
			size.push(typeSumScrollUp);
			size.push(typeSumScrollBottom);
			break;

		case "IMAX":
			typeSumScrollUp = $(window).scrollTop() + $("header").height() + 10;
			typeSumScrollBottom = $(window).scrollTop() - $("header").height() * 1.6;
			size.push(typeSumScrollUp);
			size.push(typeSumScrollBottom);
            break;


        case "garantia_cinepolis":
		    typeSumScrollUp = $(window).scrollTop() + $("header").height() + 10;
		    typeSumScrollBottom = $(window).scrollTop() - $("header").height() * 1.6;
		    size.push(typeSumScrollUp);
		    size.push(typeSumScrollBottom);
		    break;
            //

		case "sala-de-arte":
			size.push(typeSumScrollUp);
			size.push(typeSumScrollBottom);
			break;

		case "macro-xe":
			size.push(typeSumScrollUp);
			size.push(typeSumScrollBottom);
			break;

		case "garantia-cinepolis":
		    typeSumScrollUp = $(window).scrollTop() + $("header").height() + 10;
		    typeSumScrollBottom = $(window).scrollTop() - $("header").height() * 1.6;
		    size.push(typeSumScrollUp);
		    size.push(typeSumScrollBottom);
			break;

        case "contenidos-alternativos":
            typeSumScrollUp = $(window).scrollTop() + $("header").height() + 10;
            typeSumScrollBottom = $(window).scrollTop() - $("header").height() * 1.6;
			size.push(typeSumScrollUp);
			size.push(typeSumScrollBottom);
			break;

		case "muestras-y-festivales":
			typeSumScrollUp = $(window).scrollTop() + $("header").height() + 10;
			typeSumScrollBottom = $(window).scrollTop() - $("header").height() * 1.2;
			size.push(typeSumScrollUp);
			size.push(typeSumScrollBottom);
			break;
		default:
			size.push(0);
			size.push(0);
			break;
	}
	return size;
}

function peliculasVistas(element, type, elementFind) {

	///element: clase del elemento a iterar.
	///type: idica de donde fue lanzado el script
	///elementFind inica que elemento se va a obtener sus propiedades

    if (location.pathname === "/imax-mx" || location.pathname === "/4dx-mx") {
        ImaxScroll("impressions");
		return false;
	}


	$(element).each(function (i, val) {
		//.listCartelera li
		var elem = $(this);
		var data = elem.find(elementFind);//span.data-layer
		if (!elem.is(':hidden')) {

			var dataLayerMovie = obj(elem, data.attr("data-titulo"),
				data.attr("data-distribuidora"),
				data.attr("data-variante"),
				data.attr("data-titulooriginal"),
				data.attr("data-genero"),
                data.attr("data-clasificacion"),
				data.attr("data-director"),
				data.attr("data-actor"),
				data.attr("data-list"));


            if (type === "preventas") {
                dataLayerMovie.list = dataLayerMovie.list.replace("Cartelera","preventas");
            }
			var size = sizeViewPort(type);
			var posTopView = up ? size[0] : size[1];

			var posButView = posTopView + $(window).height();

			var elemTop = elem.offset().top;
			var elemBottom = elemTop + elem.height();
			var resp = ((elemBottom < posButView && elemBottom > posTopView) || (elemTop > posTopView && elemTop < posButView));

			if (dataLayerMovie.list === "proximamente-inferior") {
				type = "proximamente-inferior";
			}

			if (resp) {
				if (!(posterVisto.includes(dataLayerMovie.idMovie))) {
					if (elem.attr("id")) {
						
						posterVisto.push(dataLayerMovie.idMovie);
                        DataLayeWeb(dataLayerMovie.list,
							dataLayerMovie.titulo,
							dataLayerMovie.distribuidora,
							"",
							dataLayerMovie.tituloOriginal,
							dataLayerMovie.genero,
							dataLayerMovie.clasificacion,
							dataLayerMovie.director,
							dataLayerMovie.protagonista,
							"",
							"impressions","");
					}
				}
			}
		}
	});
}

function ImaxScroll(event) {
    var type = "IMAX";
    var classElement = ".synopsis";
    var obj = function (elem,
        titulo,
        distribuidora,
        formatoMarca,
        tituloOriginal,
        genero,
        clasificacion,
        director,
        protagonista,
        list) {
        var dataLayerMovie =
            {
                idMovie: elem.attr("id"),
                list: list == "" || list == undefined ? "Sin datos" : list,
                titulo: titulo == "" || titulo == undefined ? "Sin datos" : titulo,
                distribuidora: distribuidora == "" || distribuidora == undefined ? "Sin datos" : distribuidora,
                formatoMarca: formatoMarca == "" || formatoMarca == undefined ? "Sin datos" : formatoMarca,
                tituloOriginal: tituloOriginal == "" || tituloOriginal == undefined ? "Sin datos" : tituloOriginal,
                genero: genero == "" || genero == undefined ? "Sin datos" : genero,
                clasificacion: clasificacion == "" || clasificacion == undefined ? "Sin datos" : clasificacion,
                director: director == "" || director == undefined ? "Sin datos" : director,
                protagonista: protagonista == "" || protagonista == undefined ? "Sin datos" : protagonista,
                color: "Sin datos",
                boletos: "boletos"
            };
        return dataLayerMovie;
    }

    if (location.pathname === "/4dx-mx") {
        type = "4DX";
        classElement = ".synopsis-dx";

    }

    $(classElement).each(function () {
        var elem = $(this);
        var data = elem.find(".info-carrusel");
        if (elem.attr("aria-hidden") === "false") {
            var dataLayerMovie =
                obj(elem, data.attr("data-titulo"),
                data.attr("data-distribuidora"),
                data.attr("data-variante"),
                data.attr("data-titulooriginal"),
                data.attr("data-genero"),
                data.attr("data-clasificacion"),
                data.attr("data-director"),
                data.attr("data-actor"),
                data.attr("data-list"));
                
            var size = sizeViewPort(type);
            var posTopView = up ? size[0] : size[1];

            var posButView = posTopView + $(window).height();

            var elemTop = elem.offset().top;
            var elemBottom = elemTop + elem.height();
            var resp = ((elemBottom < posButView && elemBottom > posTopView) || (elemTop > posTopView && elemTop < posButView));

            if (dataLayerMovie.list === "proximamente-inferior") {
                type = "proximamente-inferior";
            }

            if (location.pathname === "/4dx-mx") {
                type = "4DX";
            }

            if (resp) {
                if (!(posterVisto.includes(dataLayerMovie.idMovie))) {
                    if (elem.attr("id")) {
                        

                        if (event === "click") {
                            vlistasClick.push(dataLayerMovie.idMovie);
                        } else {
                            posterVisto.push(dataLayerMovie.idMovie);
                        }
                        
                        DataLayeWeb(type,
                            dataLayerMovie.titulo,
                            dataLayerMovie.distribuidora,
                            "",
                            dataLayerMovie.tituloOriginal,
                            dataLayerMovie.genero,
                            dataLayerMovie.clasificacion,
                            dataLayerMovie.director,
                            dataLayerMovie.protagonista,
                            "",
                            event,
                            "");
                    }
                }
            }
		}
	});
}
//---IMAX/4DX
