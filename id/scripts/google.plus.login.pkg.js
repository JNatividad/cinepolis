var $_GET = jsUtil.getScriptsQueryString('google\\.plus\\.login\\.pkg\\.js');
var llamado = false;
var strFalloIngreso = "Ocurrió un error al ingresar. Por favor, inténtalo nuevamente más tarde.";
var strFalloSalir = "Ocurrió un error al intentar terminar la sesión, por favor inténtalo nuevamente más tarde.";
var strFalloDatosUsuario = "Ocurrió un error al obtener los datos del usuario. Por favor, inténtalo nuevamente más tarde.";
var strFalloComentario = "Ocurrió un error al intentar guardar el comentario, por favor inténtalo nuevamente más tarde";
var strComentarioVacio = "Favor de ingresar el comentario.";
var strComentarioMinimo = "El comentario debe tener al menos 5 carácteres.";
var strComentarioHashtag = "El comentario no puede ser sólo el hashtag.";
var strComentarioCorrecto = "Tu comentario ha sido recibido, pronto será publicado.";
var strNoDisponible = "No disponible por el momento.";

$(document).ready(function () {
    var additionalParams = {
        'callback': LlamadaInicioSesionGoogle
    };

    //$("." + $_GET["btnLogin"]).click(function (e) {
    $(".btnPlusConnect").click(function (e) {
        e.preventDefault();
        gapi.auth.signIn(additionalParams);
        return false;
    });
});

function LlamadaInicioSesionGoogle(ResultadoAutorizacion) {
    if (llamado) {
        if (ResultadoAutorizacion['status']['signed_in']) {
            gapi.client.load('plus', 'v1', function () {
                if (ResultadoAutorizacion['access_token']) {
                    window.location = "/id/index.aspx?gp_token=" + ResultadoAutorizacion['access_token'];
                } else if (ResultadoAutorizacion['error']) {
                    alert(strFalloIngreso);
                }
            });
        } else {
            //alert(strFalloIngreso);
        }
    }
    else {
        llamado = true;
    }
}