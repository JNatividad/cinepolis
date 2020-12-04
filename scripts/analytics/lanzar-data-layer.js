$.removeCookie("movies-impression");
//function LanzarDataLayer(pathname) {

//    var fecha = new Date();
//    var dia = fecha.getDate();
//    var mes = (fecha.getMonth() + 1);

//    if (dia === 31 && mes === 12) {
//        $.cookie("movies-impression", "");
//    }
    
//    if (pathname === "/") {
//        //ScrollDatalayer(".tituloPelicula .descripcion", undefined, ".data-layer");     
//    }

//    if (pathname.includes("/cartelera")) {
//        ImpressionsEvent(".tituloPelicula .descripcion", ".data-layer");
//        ImpressionsEvent(".tituloPelicula li", ".data-layer");

//        ScrollDebounceDatalayer(".tituloPelicula .descripcion", "", ".data-layer");  
//        ScrollDebounceDatalayer(".tituloPelicula li", "", ".data-layer");
//    }

//    if (pathname.includes("/pelcula")) {
//        //ScrollDatalayer(".tituloPelicula .descripcion", undefined, ".data-layer");     
//    }

//    if (pathname.includes("/garantia-cinepolis")) {
//        //ScrollDatalayer(".tituloPelicula .descripcion", undefined, ".data-layer");     
//    }

//    if (pathname.includes("/contenidos-alternativos")) {
//        ImpressionsEvent(".listaEventos li", ".data-layer");
//        ScrollDebounceDatalayer(".listaEventos li", undefined, ".data-layer"); 
//    }

//    if (pathname.includes("/muestras-y-festivales")) {
//        ImpressionsEvent(".tituloPelicula li", ".data-layer");
//        ScrollDebounceDatalayer(".tituloPelicula li", "", ".data-layer");    
//    }

//    if (pathname.includes("/promociones")) {
//        ScrollDatalayer(".tituloPelicula .descripcion", undefined, ".data-layer");     
//    }

//    if (pathname.includes("/proximos-estrenos")) {
//        ImpressionsEvent(".tituloPelicula .descripcion", ".data-layer");
//        ImpressionsEvent(".tituloPelicula li", ".data-layer");
//        ScrollDebounceDatalayer(".tituloPelicula .descripcion", "", ".data-layer");
//        ScrollDebounceDatalayer(".tituloPelicula li", "", ".data-layer");   
//    }

//    if (pathname.includes("/preventas")) {
//        ImpressionsEvent(".tituloPelicula .descripcion", ".data-layer");
//        ImpressionsEvent(".tituloPelicula li", ".data-layer");

//        ScrollDebounceDatalayer(".tituloPelicula .descripcion", "", ".data-layer");
//        ScrollDebounceDatalayer(".tituloPelicula li", "", ".data-layer"); 
//    }

//    if (pathname.includes("/sala-de-arte")) {
//        ScrollDatalayer(".tituloPelicula .descripcion", undefined, ".data-layer");     
//    }   

//    if (pathname.includes("/4dx-mx")) {
//        ScrollDatalayer(".tituloPelicula .descripcion", undefined, ".data-layer");     
//    }

//    if (pathname.includes("/imax-mx")) {
//        ScrollDatalayer(".tituloPelicula .descripcion", undefined, ".data-layer");     
//    }

//    if (pathname.includes("/macro-xe")) {
//        ScrollDatalayer(".tituloPelicula .descripcion", undefined, ".data-layer");     
//    }

//    if (pathname.includes("/vip")) {
//        ScrollDatalayer(".tituloPelicula .descripcion", undefined, ".data-layer");     
//    }
//}

//$(document).ready(function () {
//    setTimeout(function () {
//        LanzarDataLayer(location.pathname);
//    }, 600);
//})