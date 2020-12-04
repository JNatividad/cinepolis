var FaceBook;
jQuery(document).ready(function () {
    var $_GET = jsUtil.getScriptsQueryString('facebook\\.registrar\\.pkg\\.js');
    FaceBook = {

        login: function () {
            FB.login(
                function (response) {
                    if ($_GET['server'] == 'true') {
                        window.location.href = $_GET['url'] + '?return=' + $_GET['referrer'] + '&AT=' + response.authResponse.accessToken;
                    } else {
                        FaceBook.datos();
                    }
                },
                {
                    scope: 'email, publish_stream'
                }
            );
        },

        logout: function () {
            FB.logout(function (response) { });
        },

        datos: function () {
            try {
                FB.getLoginStatus(function (responseStatus) {


                    if (responseStatus.authResponse) {

                        if ($_GET['server'] == 'true') {
                            window.location.href = $_GET['url'] + '?return=' + $_GET['referrer'] + '&AT=' + responseStatus.authResponse.accessToken;
                        } else {
                            FB.api('/me', function (response) {

                                var segundoNombre = typeof (response.middle_name) == 'undefined' ? '' : response.middle_name;

                                jQuery('#' + $_GET['facebookID']).val(response.id);
                                jQuery('#' + $_GET['nombre']).val(response.first_name + ' ' + segundoNombre);
                                jQuery('#' + $_GET['apellidos']).val(typeof (response.last_name) == 'undefined' ? '' : response.last_name);
                                jQuery('#' + $_GET['mail']).val(response.email);


                                try {
                                    var nombreCompleto = response.first_name;
                                    nombreCompleto += ' ' + segundoNombre;
                                    nombreCompleto += ' ';
                                    nombreCompleto += (typeof (response.last_name) == 'undefined') ? '' : response.last_name;

                                    $("#ctl00_ctl00_ContentPlaceHolder1_contenidoInterior_txbRegNombre").val(nombreCompleto);
                                    $("#ctl00_ctl00_ContentPlaceHolder1_contenidoInterior_txbRegTCC").val($("#ctl00_ctl00_ContentPlaceHolder1_contenidoInterior_txbTCC").val());
                                    $("#ctl00_ctl00_ContentPlaceHolder1_contenidoInterior_txbRegContrasena").val($("#ctl00_ctl00_ContentPlaceHolder1_contenidoInterior_txbContrasena").val());
                                    $("#ctl00_ctl00_ContentPlaceHolder1_contenidoInterior_txbRegCinepolisID").val(response.email);

                                    $(".modalOculto").fadeIn(300);
                                }
                                catch (e) {
                                }
                            });
                        }
                    }
                });
            } catch (ex) {
                jsUtil.tryLog(ex);
            }
        }

    };

    jQuery(window).load(function () {
        try {
            var $_url = jsUtil.getUrlQueryString();
            if ($_url["AT"].toString() != "") {
                FaceBook.login();
            }
        } catch (e) { }
    });

});