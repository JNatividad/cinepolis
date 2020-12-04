
var jshtmlAppend = "";
jshtmlAppend += '<script src="https://static.cinepolis.com/cortinillas/1/skin-sinopsis-it-2/scripts/action.js"></script>';

var sitio = location.host.substring(location.host.length - 2, 100)
var clavePais = "CinepolisMX";
var avengers  = location.pathname.indexOf("avengers-endgame") !== -1
var isStage = location.host.indexOf("stage") !== -1 || location.host.indexOf("localhost") !== -1;
var isPre = location.host.indexOf("preprod") !== -1 

if (location.pathname.indexOf("/pelicula") !== -1) {
    var tituloSinopsis = $("#ContentPlaceHolder1_ctl_sinopsis_ctl_titulo").text();
    tituloSinopsis = tituloSinopsis.replace(" | Cinépolis ENTRA","");
    $("#ContentPlaceHolder1_ctl_sinopsis_ctl_titulo").text(tituloSinopsis);
}


if (location.pathname === "/") {
   $("#ContentPlaceHolder1_iframeKlic").on('load', function () {
       $(this).contents().find(".price__loyalty-brand img").removeAttr("src").attr("src", "https://static.cinepolis.com/img/club-cinepolis-klic.png");
   });
}

function ObtenerClaveSitio()
{
    switch (sitio)
    {
        case "co":
            clavePais = "CinepolisCO";
            validarPreventa()
            break;
        case "pa":
            clavePais = "CinepolisPA";
            validarPreventa()
            break;
        case "pe":
            clavePais = "CinepolisPE";
            validarPreventa()
            break;
        case "gt":
            clavePais = "CinepolisGT";
            validarPreventa()
            break;
        case "sv":
            clavePais = "CinepolisSV";           
            validarPreventa()
            break;
        case "hn":
            clavePais = "CinepolisHN";
            validarPreventa()
            break;
        case "cr":
            clavePais = "CinepolisCR";
            validarPreventa()
            break;
        default:
            clavePais = "CinepolisMX";
            break;
    }
    return clavePais;
}
ObtenerClaveSitio();

function setLinkMobileAppLanding() {
    if (clavePais === "CinepolisCR") {

        var host = location.host;

        if (host.indexOf("stage") != -1 || host.indexOf("preprod") != -1) {
            $(".badge-appstore, .badge-google").removeAttr("href");
            $(".badge-appstore, .badge-google").attr("href","http://onelink.to/ty2hx4");    
            setTimeout(() => {
                $(".sb-button--download").removeAttr("href");
                $(".sb-button--download").attr("href","http://onelink.to/ty2hx4");    
            }, 2000);    
        }
        
    }
}
setLinkMobileAppLanding();

function validarPreventa(){
    if (location.pathname.indexOf("/preventas") !== -1) {
        $(".lstpreventas").css("visibility","visible")
    }
}

 if (!detectmob() && location.pathname === "/") {
    	AsignarEventosFigure();
 }

if(clavePais == "CinepolisMX" && location.pathname.indexOf("/club-cinepolis-id") != -1){
    $("#menu-principal ul li a").each(function(){
        var element = $(this);
        var url = element.attr("href").replace("static.","")
        element.removeAttr("href").attr("href",url);
    })
}

function avengersDescription() {

    if (avengers) {
        if (clavePais == "CinepolisCR") {
            $("#ContentPlaceHolder1_ctl_sinopsis_ctl_clasificacion").text("TP7").removeAttr("data-description").attr("data-description","");
        }else if (clavePais == "CinepolisSV") {
            $("#ContentPlaceHolder1_ctl_sinopsis_ctl_clasificacion").text("B").removeAttr("data-description").attr("data-description","Para mayores de 12 años, el contenido puede tener: violencia leve, desnudos en segundo o tercer plano de forma breve. Ocasionalmente puede presentar lenguaje soez, frases en doble sentido y consumo de alcohol y tabaco.");	
        }else if (clavePais == "CinepolisGT" || clavePais == "CinepolisHN") {
            $("#ContentPlaceHolder1_ctl_sinopsis_ctl_clasificacion").text("A").removeAttr("data-description").attr("data-description","Apta para todo público.");
        }
    } 
}
avengersDescription();

var moviesId = ["30482", "30754"];
var moviesKey = ["roma", "osc19-roma"];
var showTimeMovieId = ["", ""];
var horariosC = "Para esta película y función los boletos únicamente se podrán obtener en la taquilla del conjunto Cinépolis® donde esté disponible. Solo durante la vigencia del 21 al 28 de febrero de 2019 o hasta agotar cupo en salas, los boletos no tendrán costo. Limitado a la obtención de dos boletos por persona. Beneficio otorgado por Cinépolis de México, S.A. de C.V., sujeto a modificación o terminación sin previo aviso.";
var movieKey = $("#synopsis").attr("data-movie");
var removido = false;

function removerEnlaceCarteleraMovieFree()
{
    $("div > div > div.col9.cf > time > a").each(function ()
    {
        var x = $(this).parent().parent().parent().parent().parent().find(".data-layer").attr("data-moviekey");
        if (moviesKey.indexOf(x) != -1)
        {
            $(this).removeAttr("href");
            $(this).attr("href", "#");
            removido = true;
        }
    });

    if (moviesKey.indexOf(movieKey) != -1)
    {
        $("#synopsis div > div > time > a ").removeAttr("href");
        $("#synopsis div > div > time > a").attr("href", "#");
    }

    if (!removido)
        ValidarSinopsisFree();

    $(document).on("click", "div > div > div.col9.cf > time", function (e)
    {
        var x = $(this).parent().parent().parent().parent().find(".data-layer").attr("data-moviekey");
        if (moviesKey.indexOf(x) != -1)
        {
            e.preventDefault();
            alert(horariosC);
            return false;
        }
    });
    
    
    $(document).on("click", "#synopsis div > div > time > a", function ()
    {
        if (moviesKey.indexOf(movieKey) != -1)
            alert(horariosC);
    });
}

function ValidarSinopsisFree()
{
    if (location.pathname.indexOf("cartelera") != -1 || location.pathname.indexOf("pelicula") != -1)
    {
        if ($("div > div > div.col9.cf > time > a").length > 0 || $("#synopsis div > div > time").length > 0)
            removerEnlaceCarteleraMovieFree();
        if (!removido)
            ValidarSinopsisFree();  
    }
}
//ValidarSinopsis();

function explorer() {
    if (/MSIE 9/i.test(navigator.userAgent) || /MSIE 10/i.test(navigator.userAgent) || /rv:11.0/i.test(navigator.userAgent)) {
        $('body').addClass('ie');
    }
    if (/Edge/i.test(navigator.userAgent)) {
        $('body').addClass('edge');
    }
    if (/rv:11.0/i.test(navigator.userAgent)) {
        $('body').addClass('ie-11')
    }
}
explorer();

if (clavePais === "CinepolisMX") {
    $("body").append(jshtmlAppend);
}

$("#cmbCiudadesCartelera").on("change", function(){
	setTimeout(function(){AsignarEventosFigure();},1000);
});

function redirectProximosEstrenosPelicula(){

    if (location.pathname.indexOf("/proximos-estrenos") != -1 && clavePais === "CinepolisMX") {
        var redirecMovietList = [
            {
                key : "23-tour-de-cine-frances",
                redirect : "https://www.cinepolis.com/muestras-y-festivales/23-tour-de-cine-frances"
            },
            {
                key : "fiesta-del-cine-mexicano",
                redirect : "https://www.cinepolis.com/muestras-y-festivales/fiesta-del-cine-mexicano"
            },
            {
                key : "24-tour-de-cine-frances",
                redirect : "https://www.cinepolis.com/muestras-y-festivales/24-tour-de-cine-frances"
            }
        ];
        
        $(".tituloPelicula li figure a").each(function(){
            var element = $(this);
            var url = element.attr("href");
            
            for (let i = 0; i < redirecMovietList.length; i++) {
                const item = redirecMovietList[i];
                if (url.indexOf(item.key) != -1) {
                    element.removeAttr("href");
                    element.attr("href", item.redirect);
                    console.log(item.redirect);
                }
            }
        });
    }
}


function configurarPreventa() {
    if (location.pathname === "/preventas") {
        var preventasCount = $(".lstpreventas ul li").toArray().length

        if (preventasCount > 0 && preventasCount <= 4) {
            $(".preventaCartelera article .listpreventas").css("visibility","visible");
        }
    }
}

configurarPreventa();

redirectProximosEstrenosPelicula();