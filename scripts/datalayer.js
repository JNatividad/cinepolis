// ScrollDatalayer(".tituloPelicula .descripcion", undefined, ".data-layer");
// ScrollDatalayer(".tituloPelicula li", undefined, ".data-layer");

var impressionsElement = new Array();
function ImpressionsEvent(classElement, findDataLayer){
  $(classElement).each(function(){
    var movieData = $(this); //Obtiene el elemento iterado
    var impressionData = movieData.find(findDataLayer); //Obtiene el elemento del contenedor de la info de película
    var movieImpresisonId = undefined //Obtiene el id de peícula iterado

    if (movieData.attr("id")) {
        movieImpresisonId = movieData.attr("id");
    }

    //Se arma la información de la película
    var objectElements = ElementsData(
      impressionData.attr("data-list"),
      impressionData.attr("data-titulo"),
      impressionData.attr("data-titulooriginal"),
      impressionData.attr("data-distribuidora"), //brand
      impressionData.attr("data-fotmatopelicula"),//variant
      impressionData.attr("data-genero"),
      impressionData.attr("data-clasificacion"),
      impressionData.attr("data-director"),
      impressionData.attr("data-actor"),
      "",//data-moviekey
      ""//hrefClick?
    );
  
    if (movieImpresisonId !== undefined) {
        if (Calculate(movieData)) { //Realza el calculo del elemento a iterar
            if (!impressionsElement.includes(movieImpresisonId)) //Valida que el elemento iterado no esté en la lista
            {
                impressionsElement.push(movieImpresisonId); //Se agrega a un arreglo de películas vistas con scroll
                ImpressionsData(objectElements) //Se manda información al dataLayer
            }
        }
    }
  });
}

var cicksElement = new Array();
function ClickEvent(element, type, find){
  
}

function DetailEvent(element, type, find){
  
}

function ScrollDatalayer(element, type, find) {
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

  var scrollEvent = debounce(function () {
    ImpressionsEvent(element, find);
  }, 2000);
  var dom = $(document);
  dom.scroll(function () {
    scrollEvent();
  });
}

function Calculate(element){
  var posTopView = $(window).scrollTop() - $("header").height();
  var posButView = posTopView + $(window).height();
  var elemTop = element.offset().top;
  var elemBottom = elemTop + element.height();
  var resp = ((elemBottom < posButView && elemBottom > posTopView) || (elemTop > posTopView && elemTop < posButView));
  return resp;
}

//Valida la url para el redirect despues de mandar el dataLayer
function ClickValidate(type, movieKey, optionalKey, optionalhref){
  var url =`${location.protocol}//${location.host}`;

  if (type === "cartelera") {
      url += `/pelicula/${movieKey}`;
  }

  if (type === "muestras-y-festivales") {
    url += `/muestras-y-festivales/${location.pathname.split("/")[2]}/${movieKey}`;
  }
  return url;
}

function ElementsData(
  list, 
  titulo,
  tituloOriginal,
  distribuidora,
  formatoPelicula,
  genero,
  clasificacion,
  director,
  actor,
  clavePelicula,
  enlace){
     var elementData = {
      list : list === '' || list === undefined ? "Sin datos" : list,
      titulo : titulo === '' || titulo === undefined ? "Sin datos" : titulo,
      tituloOriginal : tituloOriginal === '' || tituloOriginal === undefined ? "Sin datos" : tituloOriginal,
      distribuidora : distribuidora === '' || distribuidora === undefined ? "Sin datos" : distribuidora,
      formatoPelicula : formatoPelicula === '' || formatoPelicula === undefined ? "Sin datos" : formatoPelicula,
      genero : genero === '' || genero === undefined ? "Sin datos" : genero,
      clasificacion : clasificacion === '' || clasificacion === undefined ? "Sin datos" : clasificacion,
      director : director === '' || director === undefined || director  === "['']" || director === [] ? "Sin datos" : director,
      actor : actor === '' || actor === undefined || actor === '[""]' || actor  === [] ? "Sin datos" : actor,
      clavePelicula : clavePelicula === '' || clavePelicula === undefined ? "Sin datos" : clavePelicula,
      enlace : enlace === '' || enlace === undefined ? "Sin datos" : enlace
    };
    return elementData;
}

function ImpressionsData(response){
    var aux = "";

    response.actor = response.actor.replace("[", "").replace("]", "").replace('"', '').replace('"', '').replace('"', '').replace('"', '').replace('  ', ' ');
    response.director = response.director.replace("[", "").replace("]", "").replace('"', '').replace('"', '').replace('"', '').replace('"', '').replace('  ', ' ');

    var actor = response.actor.split(",")[0];
    var director = response.director.split(",")[0];

    if (actor !== null || actor !== undefined) {
        response.actor = actor;
    }

    if (director !== null || director !== undefined) {
        response.director = director;
    }

    //var dim9 = response.actor.split(',');

    //if (dim9 !== undefined || dim9 !== null) {
    //    dim9 = dim9[0].replace("[", "").replace('"', '').replace('"', '');
    //}
  if (response.list === "muestras-y-festivales") {
    aux = "-"+location.pathname.split("/")[2];
  }
    var data = {
        'event': 'productImpression',
    'ecommerce': {
      'impressions': [
       {
         'name': response.titulo, //Titulo Película
         'brand': response.distribuidora, //Distribuidora
         'variant': response.formatoPelicula, //Formato de película.
         'list': response.list+aux, //Origen del evento.
         'dimension4':response.tituloOriginal, //Título original película
         'dimension6':response.genero, //Genéro de la película
         'dimension7':response.clasificacion, //Clasificación de la película
         'dimension8':response.director, //Director(es) de la película
         'dimension9': response.actor, //Actor(es) de la película
         'dimension10': 'Sin datos', //Boletos
         'dimension11': 'boletos' //Boletos
       }]
    }
  };    
  dataLayer.push(data);
    
}

function ClickData(response){
    dataLayer.push({
        'event': 'productClick',
        'ecommerce': {
          'click': {
            'actionField': {'list': 'Search Results'}, //Origen del evento.
            'products': [{
               'name': '', //Titulo Película
               'brand': '', //Distribuidora
               'variant': '', //Formato de película.
               'dimension4':'', //Título original película
               'dimension6':'', //Genéro de la película
               'dimension7':'', //Clasificación de la película
               'dimension8':'', //Director(es) de la película
               'dimension9':'', //Actor(es) de la película
               'dimension10':'' //Boletos
             }]
           }
         },
         'eventCallback': function() {
           document.location = productObj.url
         }
      });
}

function DetailData(response){
      dataLayer.push({
      'ecommerce': {
        'detail': {
          'actionField': {'list': 'Apparel Gallery'}, //Origen del evento.
          'products': [{
            'name': '', //Titulo Película
              'brand': '', //Distribuidora
              'variant': '', //Formato de película.
              'dimension4':'', //Título original película
              'dimension6':'', //Genéro de la película
              'dimension7':'', //Clasificación de la película
              'dimension8':'', //Director(es) de la película
              'dimension9':'', //Actor(es) de la película
              'dimension10':'' //Boletos
          }]
        }
      }
    });
}

function ImaxScroll(event) {
    var type = "IMAX";
    var classElement = ".synopsis";
    

    if (location.pathname === "/4dx-mx") {
        type = "4DX";
        classElement = ".synopsis-dx";
    }

    $(classElement).each(function () {
        var elem = $(this);
        var data = elem.find(".info-carrusel");
        var id = eleme.attr("id");
        if (elem.attr("aria-hidden") === "false") {

          var objectElements = ElementsData(
            movieImpresisonId,
            data.attr("data-titulo"),
            data.attr("data-titulooriginal"),
            data.attr("data-distribuidora"), //brand
            data.attr("data-fotmatopelicula"),//variant
            data.attr("data-genero"),
            data.attr("data-clasificacion"),
            data.attr("data-director"),
            data.attr("data-actor"),
            "",//data-moviekey
            ""//hrefClick?
          );
         
            if (objectElements.list === "proximamente-inferior") {
                type = "proximamente-inferior";
            }

            if (location.pathname === "/4dx-mx") {
                type = "4DX";
            }

            if (Calculate(elem)) {
                if (!(impressionData.includes(id))) {
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