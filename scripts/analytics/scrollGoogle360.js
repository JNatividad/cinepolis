//function ScrollDebounceDatalayer(element, type, find) {
//    function debounce(func, wait, immediate) {
//        var timeout;
//        return function () {
//            var context = this, args = arguments;
//            var later = function () {
//                timeout = null;
//                if (!immediate){
//                    func.apply(context, args);
//                }
//            };
  
//            var callNow = immediate && !timeout;
//            clearTimeout(timeout);
//            timeout = setTimeout(later, wait);
//            if (callNow){
//                func.apply(context, args);
//            }
//        };
//    };
  
//    var scrollEvent = debounce(function () {
//        ImpressionsEvent(element, find);
//    }, 2000);
//    var dom = $(document);
//    dom.scroll(function () {
//      scrollEvent();
//    });
//}

//function Calculate(element){
//    var posTopView = $(window).scrollTop() - $("header").height();
//    var posButView = posTopView + $(window).height();
//    var elemTop = element.offset().top;
//    var elemBottom = elemTop + element.height();
//    var resp = ((elemBottom < posButView && elemBottom > posTopView) || (elemTop > posTopView && elemTop < posButView));
//    return resp;
//}

//var impressionsElement = new Array();
//var movieList = new Array();
//function ImpressionsEvent(classElement, findDataLayer, seccion){
//    var position = 1;
//  $(classElement).each(function(){
//    var movieData = $(this); //Obtiene el elemento iterado
//    var impressionData = movieData.find(findDataLayer); //Obtiene el elemento del contenedor de la info de película
//    var movieImpresisonId = undefined //Obtiene el id de peícula iterado

//    if (movieData.attr("id")) {
//        movieImpresisonId = movieData.attr("id");
//    }
//// ImpressionsEvent(".tituloPelicula .descripcion", ".data-layer");
//// ScrollDatalayer(".tituloPelicula .descripcion", undefined, ".data-layer");
//    var objectElements = {
//        Titulo : impressionData.attr("data-titulo"),
//        Distribuidora : impressionData.attr("data-distribuidora"),
//        TituloOriginal : impressionData.attr("data-titulooriginal"),
//        Idioma : impressionData.attr("data-idioma"), 
//        Genero : impressionData.attr("data-genero"),
//        Clasificacion : impressionData.attr("data-clasificacion"),
//        Director : impressionData.attr("data-director"),
//        Protagonista : impressionData.attr("data-protagonista"),
//        Actor : impressionData.attr("data-actor"),
//        Cine : impressionData.attr("data-list"),
//        ClavePelicula : impressionData.attr("data-moviekey"),
//        Redirect : impressionData.attr("data-redirect"),
//        Posicion : position
//    };

//    if (objectElements.Titulo === undefined || objectElements.Titulo === "") {
//        objectElements.Titulo = "";
//    }

//    if (objectElements.Distribuidora === undefined || objectElements.Distribuidora === "") {
//        objectElements.Distribuidora = "";
//    }

//    if (objectElements.Idioma === undefined || objectElements.Idioma === "") {
//        objectElements.Idioma = "";
//    }

//    if (objectElements.Genero === undefined || objectElements.Genero === "") {
//        objectElements.Genero = "";
//    }

//    if (objectElements.Clasificacion === undefined || objectElements.Clasificacion === "") {
//        objectElements.Clasificacion = "";
//    }
    
//    if (objectElements.Director === undefined || objectElements.Director === "") {
//        objectElements.Director = "";
//    }

//    if (objectElements.Protagonista === undefined || objectElements.Protagonista === "") {
//        objectElements.Protagonista = "";
//    }

//    if (objectElements.Actor === undefined || objectElements.Actor === "") {
//        objectElements.Actor = "";
//    }

//    if (objectElements.Cine === undefined || objectElements.Cine === "") {
//        objectElements.Cine = "";
//    }
    
//    if (objectElements.ClavePelicula === undefined || objectElements.ClavePelicula === "") {
//        objectElements.ClavePelicula = "";
//    }

//    if (objectElements.Redirect === undefined || objectElements.Redirect === "") {
//        objectElements.Redirect = location.host;
//    }

//    var protagonista = objectElements.Protagonista.replace("[", "").replace("]", "").replace('"', '').replace('"', '').replace('"', '').replace('"', '').replace('  ', ' ').split(",")[0];
//    var actor = objectElements.Actor.replace("[", "").replace("]", "").replace('"', '').replace('"', '').replace('"', '').replace('"', '').replace('  ', ' ').split(",")[0];
//    var director = objectElements.Director.replace("[", "").replace("]", "").replace('"', '').replace('"', '').replace('"', '').replace('"', '').replace('  ', ' ').split(",")[0];
      
//    if (protagonista === undefined || protagonista === null)
//    {
//        objectElements.Protagonista = objectElements.Protagonista.replace("[", "").replace("]", "").replace('"', '').replace('"', '').replace('"', '').replace('"', '').replace('  ', ' ').split(",");
//    }
//    else
//    {
//        objectElements.Protagonista = protagonista;
//    }

//    if (actor === undefined || actor === null)
//    {
//        objectElements.Actor = objectElements.Actor.replace("[", "").replace("]", "").replace('"', '').replace('"', '').replace('"', '').replace('"', '').replace('  ', ' ').split(",");
//    }
//    else
//    {
//        objectElements.Actor = actor;
//    }

//    if (director === undefined || director === null)
//    {
//        objectElements.Director = objectElements.Director.replace("[", "").replace("]", "").replace('"', '').replace('"', '').replace('"', '').replace('"', '').replace('  ', ' ').split(",");
//    }
//    else
//    {
//        objectElements.Director = director;
//    }

//    position++;
  
//    if (movieImpresisonId !== undefined && movieImpresisonId !== null && movieImpresisonId !== "") {
//        if (Calculate(movieData)) { //Realza el calculo del elemento a iterar
//            if (PeliculaVistaArrayImpression(impressionsElement, movieImpresisonId)) //Valida que el elemento iterado no esté en la lista
//            {
//                if (PeliculaVistaCookieImpression(objectElements)) {
//                    impressionsElement.push(movieImpresisonId); //Se agrega a un arreglo de películas vistas con scroll
//                    DataLayerImpression(objectElements); //Se manda información al dataLayer
//                    if (objectElements.Titulo !== "") {
//                        movieList.push(objectElements.Titulo+objectElements.Cine);
//                        //$.cookie("movies-impression", movieList);
//                    }  
//                }
//            }
//        }
//    }
//  });
//}