/*
Libreria de utilidades JS
Fecha de creacion: 08-12-2012
Creada por: Jesus Lair Ortege Dehonor
Última fecha de mofidicación: 24-07-2013
Descripción: agregar método para medir la fortaleza de una contraseña
*/
var jsUtil = {
    /*
    Obtiene los parametros pasados por GET a un script js
        <script src='scripts/jquery.scroll.js?id=.scrollSinopsis'></script>
    */
    getScriptsQueryString: function (script) {
        var QueryString = new Array();
        try {

            var QS = jQuery('script[src*=' + script + '\\?]').attr('src').match(/[a-zA-Z0-9]+=[a-zA-Z0-9\.\_\-\/\#\, ]*/g);

            var t, i = QS.length;
            while (i--) {
                t = QS[i].split('=');
                QueryString.push(t[0]);
                QueryString[t[0]] = t[1];
            }
        } catch (ex) {
            jsUtil.tryLog(ex);
        }
        return QueryString;
    },
    /*
    Obtiene los parametros pasados GET a la pagina actual
    */
    getUrlQueryString: function () {
        var vars = new Array(), hash;
        try {
            var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
            for (var i = 0; i < hashes.length; i++) {
                hash = hashes[i].split('=');
                vars.push(hash[0]);
                vars[hash[0]] = hash[1];
            }
        }
        catch (ex) {
            jsUtil.tryLog(ex);
        }
        return vars;
    },
    /*
    Realiza un intento de console.log, si lanza algun error
    reintenta mediante un alert
    */
    tryLog: function (log) {
        try {
            console.log(log);
        } catch (ex) { }
    },
    /*
    Obtiene el HashTag que tiene la url
    */
    getHash: function () {
        try {
            return window.location.hash.substring(1);
        } catch (e) {
            return '';
        }
    },
    /*
    Manda un mensaje de tipo dialogo (http://jqueryui.com/dialog/),
    si el mensaje no puede contruir la ventana manda el mensaje en un alert.
    Dependencias:
	    jquery-x.js
	    jquery.ui.core.js
	    jquery.ui.widget.js
	    jquery.ui.mouse.js
	    jquery.ui.position.js
	    jquery.ui.dialog.js
	    jquery.bgiframe-2.1.2.js (opcional)
	    jquery.ui.draggable.js (opcional)
	    jquery.ui.resizable.js (opcional)
        jquery.ui.all.css (opcional)
    */
    mensaje: function (strTitulo, strMensaje, blModal, strUrl) {
        try {
            jQuery('#modal-generico').dialog('close');
            jQuery('#modal-generico').remove();
            jQuery('body').append('<div id="modal-generico"></div>');


            if (strUrl == '') {
                jQuery('#modal-generico').dialog({
                    autoOpen: false,
                    modal: blModal
                });
            } else {
                jQuery('#modal-generico').dialog({
                    autoOpen: false,
                    modal: blModal,
                    close: function (event, ui) {
                        window.location = strUrl;
                    }
                });
            }

            try {
                jQuery('#modal-generico').parent().find('span.ui-dialog-title').html(strTitulo);
            } catch (ex) { }


            try {
                jQuery('#modal-generico').html(strMensaje);
            } catch (ex) { }

            jQuery('#modal-generico').dialog('open');
        } catch (ex) {
            alert('' + strMensaje);
        }
    },
    /*
    Evalua si un elemento es nulo o si existe
    */
    isNullOrEmpty: function (obj) {
        if (typeof obj == 'undefined' || obj === null || obj === '') return true;
        if (typeof obj == 'number' && isNaN(obj)) return true;
        if (obj instanceof Date && isNaN(Number(obj))) return true;
        return false;
    },
    /*
    Agregar separador de miles a un numero entero
    */
    separarMiles: function (numero) {
        var num = new String(numero);
        var result = '';
        while (num.length > 3) {
            result = ',' + num.substr(num.length - 3) + result;
            num = num.substring(0, num.length - 3);
        }
        result = num + result;
        return result;
    },
    /*
    Formatea N segundos en HH:MM:SS
    */
    formatoSegundos: function (segundos) {

        var horas = Math.floor(segundos / 3600);
        var minutos = Math.floor((segundos - (horas * 3600)) / 60);
        var segundos = segundos - (horas * 3600) - (minutos * 60);

        if (horas.toString().length < 2) {
            horas = '0' + horas;
        }

        if (minutos.toString().length < 2) {
            minutos = '0' + minutos;
        }

        if (segundos.toString().length < 2) {
            segundos = '0' + segundos;
        }

        return horas + ':' + minutos + ':' + segundos;

    },

    necesitaScroll: function (contenedor) {

        blRetorno = false;

        var altura = 0, margin = 0, padding = 0;

        jQuery.each(jQuery(contenedor).children(), function (i, element) {
            altura += parseInt(jQuery(element).height());

            margin += parseInt(jQuery(element).css('margin-top').replace('px', ''));
            margin += parseInt(jQuery(element).css('margin-bottom').replace('px', ''));

            padding += parseInt(jQuery(element).css('padding-top').replace('px', ''));
            padding += parseInt(jQuery(element).css('padding-bottom').replace('px', ''));
        });

        var alto = altura + margin + padding;

        return alto > jQuery(contenedor).height() ? true : false;
    },
    /*
    Valida una cadena en base a cuatro filtros.
        1) Que la longitud de la cadena.
        2) Contenga numeros ( al menos uno )
        3) Contenga mayusculas y minusculas ( al menos una )
        4) No contenga letras, numeros o palabras consecutivas

    Retorna un entero con el numero de filtro que pasa
    */
    fortalezaContrasena: function (contrasena) {

        var filtros = 0;

        var patronMayusculas = /[A-Z]+/g;
        var patronMinusculas = /[a-z]+/g;
        var patronNumeros = /[0-9]+/;
        var longitud = 8;
        var patronConsecutivos = /(.)\1+/g;

        if (contrasena.toString().length >= longitud) {
            filtros += 1;
        }
        if (patronNumeros.test(contrasena)) {
            filtros += 1;
        }
        if (patronMayusculas.test(contrasena) && patronMinusculas.test(contrasena)) {
            filtros += 1;
        }
        if (!patronConsecutivos.test(contrasena) && contrasena.toString().length > 1) {
            filtros += 1;
        }

        return filtros;
    },

    fancyAlert: function (mensaje, lblAceptar) {
        alertify.set({
            labels: {
                ok: lblAceptar
            }
        });
        alertify.alert(mensaje);
    },

    fancyAlertRedirect: function (mensaje, url, lblAceptar) {
        alertify.set({
            labels: {
                ok: lblAceptar
            }
        });
        alertify.alert(mensaje, function (e) {
            if (e) {
                window.location = url;
            }
        });
    },

    fancyConfirm: function (mensaje, lblAceptar, lblCancelar, actionOK, actionCancel) {
        alertify.set({
            labels: {
                ok: lblAceptar,
                cancel: lblCancelar
            }
        });
        alertify.confirm(mensaje, function (e) {
            setTimeout(function () {
                if (e) {
                    if (actionOK != "")
                        eval(actionOK);
                } else {
                    if (actionCancel != "")
                        eval(actionCancel);
                }
            }, 1000);
        });
    },

    fancyPrompt: function (mensaje, lblAceptar, lblCancelar) {
        alertify.set({
            labels: {
                ok: lblAceptar,
                cancel: lblCancelar
            }
        });
        $alertify("prompt").onclick = function () {
            alertify.prompt(mensaje, function (e, str) {
                if (e) {
                    alertify.success("You've clicked OK and typed: " + str);
                } else {
                    alertify.error("You've clicked Cancel");
                }
            }, "Default Value");
            return false;
        };
    },

    share: function (share, compartirEn) {

        var toShare = "";
        switch (compartirEn.toString().toLowerCase()) {
            case "facebook":
            case "fb":
                toShare = "http://www.facebook.com/sharer.php?u=" + share;
                break;
            case "twitter":
            case "tw":
                toShare = "https://twitter.com/intent/tweet?source=webclient&text=" + share;
                break;
        }

        if (share != "") {
            day = new Date();
            id = day.getTime();
            eval("page" + id + " = window.open(toShare, '" + id + "', 'toolbar=0,scrollbars=0,location=0,statusbar=0,menubar=0,resizable=0,width=635,height=390,left = 150,top = 10');");
        }

    }
};