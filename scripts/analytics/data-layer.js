//function DataLayerDetail(response){
//    var leerCookie = $.cookie("movies-detail");
//    if(PaisValido(location.host)){
//        if (!leerCookie.includes(response.clavePelicula)) {
//            dataLayer.push({
//                'ecommerce': {
//                  'detail': {
//                    'products': 
//                    [{
//                        'name': response.titulo, // {{Nombre de película}},
//                        'brand': response.Distribuidora, //{{Distribuidora}},
//                        //'dimension2': response.Horario, //{{Hora de la película}},
//                        //'dimension3': response.DiaFuncion, //{{Día de función}},
//                        'dimension4': response.TituloOriginal, //{{Nombre original de la película}},
//                        'dimension5': response.Idioma, //{{Idioma}},
//                        'dimension6': response.Genero, //{{Género de la película}},
//                        'dimension7': response.Clasificacion, //{{Clasificación de la película}},
//                        'dimension8': response.Director, //{{Director de la película}},
//                        'dimension9': response.Protagonista //{{Protagonista de la película}},
//                        //'dimension10': response.color, //{{Color predominante en cartel}},
//                        //'dimension11': response.BoletosText, //{{Enviar “Boletos”}}
//                     }]
//                   }
//                }
//            });   
//        }
//    }
//}  

//function DataLayerClick(response) {

//    if(PaisValido(location.host)){
//        dataLayer.push({
//            'event': 'productClick',
//            'ecommerce': {
//                'click': {
//                    'actionField': { 'list': response.Cine },//{{Nombre del cine de donde se le dió clic}}
//                    'products':
//                    [{
//                        'name': response.titulo, // {{Nombre de película}},
//                        'brand': response.Distribuidora, //{{Distribuidora}},
//                        'position': response.Posicion, //{{Posición del elemento}},
//                        //'dimension2': response.Horario, //{{Hora de la película}},
//                        //'dimension3': response.DiaFuncion, //{{Día de función}},
//                        'dimension4': response.TituloOriginal, //{{Nombre original de la película}},
//                        'dimension5': response.Idioma, //{{Idioma}},
//                        'dimension6': response.Genero, //{{Género de la película}},
//                        'dimension7': response.Clasificacion, //{{Clasificación de la película}},
//                        'dimension8': response.Director, //{{Director de la película}},
//                        'dimension9': response.Protagonista, //{{Protagonista de la película}},
//                        //'dimension10': response.color, //{{Color predominante en cartel}},
//                        //'dimension11': response.BoletosText, //{{Enviar “Boletos”}}
//                    }]
//                }
//            }
//        });   
//    }
//}

//function DataLayerImpression(response){
//    if (PaisValido(location.host)) {
//        var data = {
//            'ecommerce': {
//            'impressions':
//                [{
//                    'list': response.Cine,
//                    'position': response.Posicion,//{{Posición del elemento}}
//                    'name': response.Titulo, // {{Nombre de película}},
//                    'brand': response.Distribuidora, //{{Distribuidora}},
//                    //'dimension2': response.Horario, //{{Hora de la película}},
//                    //'dimension3': response.DiaFuncion, //{{Día de función}},
//                    'dimension4': response.TituloOriginal, //{{Nombre original de la película}},
//                    //'dimension5': response.Idioma, //{{Idioma}},
//                    'dimension6': response.Genero, //{{Género de la película}},
//                    'dimension7': response.Clasificacion, //{{Clasificación de la película}},
//                    'dimension8': response.Director, //{{Director de la película}},
//                    'dimension9': response.Actor //{{Protagonista de la película}},
//                    //'dimension10': response.color, //{{Color predominante en cartel}},
//                    //'dimension11': response.BoletosText, //{{Enviar “Boletos”}}
//                }]
//            }
//        }
//        dataLayer.push(data);
//        console.log(response.Titulo);
//        console.log(data);
//    }
//}