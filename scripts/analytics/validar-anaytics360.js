//function PeliculaVistaCookieImpression(objectElements) {
    
//    var leerCookie = $.cookie("movies-impression");
//    if (leerCookie === undefined) {
//        $.cookie("movies-impression", "");
//    }
//    leerCookie = $.cookie("movies-impression").split(",");
//    return !leerCookie.includes(objectElements.Titulo+objectElements.Cine);
//}


//function PeliculaVistaArrayImpression(impressionsElement, movieImpresisonId){
//    return !impressionsElement.includes(movieImpresisonId);
//}

//function PaisValido(urlHost){
//    switch (urlHost) {
//        //case "cinepolis.com":
//        //    return true;

//        //case "cinepolis.com.gt":
//        //    return true;

//        //case "cinepolis.com.sv":
//        //    return true;

//        //case "cinepolis.com.hn":
//        //    return true;

//        //case "cinepolis.co.cr":
//        //    return true;

//        case "aws-ami.cinepolis.com":
//            return true;

//        case "aws-ami.cinepolis.com.gt":
//            return true;

//        case "aws-ami.cinepolis.com.sv":
//            return true;

//        case "aws-ami.cinepolis.com.hn":
//            return true;

//        case "aws-ami.cinepolis.co.cr":
//            return true;

//       case "stage.cinepolis.com":
//            return true;

//        case "stage.cinepolis.com.gt":
//            return true;

//        case "stage.cinepolis.com.sv":
//            return true;
            
//        case "stage.cinepolis.com.hn":
//            return true;
            
//        case "stage.cinepolis.co.cr":
//            return true;
    
//        default:
//        return false;
//    }
//}