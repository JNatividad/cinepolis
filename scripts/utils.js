var sitio = location.host.substring(location.host.length - 2, 100)
var clavePais = "CinepolisMX";
function ObtenerClaveSitioWeb()
{
    switch (sitio)
    {
        case "co":
            clavePais = "CinepolisCO";
            break;
        case "pa":
            clavePais = "CinepolisPA";
            break;
        case "pe":
            clavePais = "CinepolisPE";
            break;
        case "gt":
            clavePais = "CinepolisGT";
            break;
        case "sv":
            clavePais = "CinepolisSV";
            break;
        case "hn":
            clavePais = "CinepolisHN";
            break;
        case "cr":
            clavePais = "CinepolisCR";
            break;
        default:
            clavePais = "CinepolisMX";
            break;
    }
    return clavePais;
}
ObtenerClaveSitioWeb();

function isMobile()
{
    if (navigator.userAgent.match(/Touch/i) || navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPod/i) || navigator.userAgent.match(/BlackBerry/i) || navigator.userAgent.match(/Windows Phone/i))
    {
        return true;
    } else { return false }
}

function appAdds()
{
    var $addUrl = '',
        $isPlat = {
            Android: function ()
            {
                return navigator.userAgent.match(/Android/i);
            },
            iOS: function ()
            {
                return navigator.userAgent.match(/iPhone|iPad|iPod/i);
            }
        },
        $addClose = $('.encuesta__cerrar');

    if ($isPlat.iOS())
    {
        $addUrl = 'https://itunes.apple.com/mx/app/cinepolis/id352134875?mt=8';
    } else if ($isPlat.Android())
    {
        $addUrl = 'https://play.google.com/store/apps/details?id=air.Cinepolis';
    }
    
    if (clavePais === "CinepolisMX")
    {
        var $addHtml = '' +
            '<aside class="encuesta">' +
            '<div class="panel cf">' +
            '<div class="descargaApp">' +
            '<a href="' + $addUrl + '" class="descargaApp-link" target="_blank">' +
            '<img src="//static.cinepolis.com/img/icon-app-movil-retina.png" alt="Cinépolis App">' +
            '<span>¡Agréganos a tu teléfono!</span>' +
            '<span>Descarga aquí nuestra App</span>' +
            '</a>' +
            '</div>' +
            '<a href="#" class="encuesta__cerrar icon-remove"></a>' +
            '</div>' +
            '</aside>';

        $('body').prepend($addHtml);
        $('.navMobile').addClass('navMobile--add');

        $('.encuesta').on('click', '.encuesta__cerrar', function (e)
        {
            e.preventDefault();
            $('.encuesta').slideUp(function ()
            {
                $(this).remove();
                $('.navMobile').removeClass('navMobile--add');
            })
        });
    }
}