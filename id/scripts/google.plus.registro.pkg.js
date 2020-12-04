var $_Datos = jsUtil.getScriptsQueryString('google\\.plus\\.registro\\.pkg\\.js');
var strFalloIngreso = "Ocurrió un error al ingresar, por favor, inténtalo nuevamente más tarde.";
var strFalloSalir = "Ocurrió un error al intentar terminar la sesión, por favor inténtalo nuevamente más tarde.";
var strFalloDatosUsuario = "Ocurrió un error al obtener los datos del usuario, por favor inténtalo nuevamente más tarde";
var strFalloComentario = "Ocurrió un error al intentar guardar el comentario, por favor inténtalo nuevamente más tarde";
var strComentarioVacio = "Favor de ingresar el comentario.";
var strComentarioMinimo = "El comentario debe tener al menos 5 carácteres.";
var strComentarioHashtag = "El comentario no puede ser sólo el hashtag.";
var strComentarioCorrecto = "Tu comentario ha sido recibido, pronto será publicado.";
var strNoDisponible = "No disponible por el momento.";

$(document).ready(function () {
    var llamado = false;
    var additionalParams = {
        'callback': Registro
    };

    $(".googleConect").click(function (e) {
        e.preventDefault();
        gapi.auth.signIn(additionalParams);
        return false;
    });
});
function Registro(ResultadoAutorizacion) {
    if (llamado) {
        if (ResultadoAutorizacion['status']['signed_in']) {
            gapi.client.load('plus', 'v1', function () {
                if (ResultadoAutorizacion['access_token']) {
                    var request = gapi.client.plus.people.get({
                        'userId': 'me'
                    });
                    request.execute(function (resp) {
                        //console.log(resp);
                        var apellidos = resp.name.familyName.split(' ');
                        $('#txtNombre').val(resp.name.givenName);
                        $("#txtApellidoPaterno").val(apellidos[0]);
                        $("#txtApellidoMaterno").val(apellidos[1]);
                        $("#txtCinepolisID").val(resp.emails[0].value);
                    });
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