/*
Fecha de creación: 21/08/2013
Creado por: Jesús Lair Ortega Dehonor
Descripción: 
    Evalúa una cadena contra cuatro filtros
        1) Longitud mínima (N caracteres definido en el constructos "default 8").
        2) Contiene letras minúsculas.
        3) Contiene letras mayúculas.
        4) Contiene números.
    Si tiene caracteres consecutivos resta in punto al
    nivel máximo obtenido

Asigna una clase a un selector en base a su valor ( value | $.val() )
las validaciones se disparan al evento KEYUP
los nombres de las clases son pesonalizables desde el constructor.
de pendiendo del número de validaciones que supere suma un punto
    
    USO:
    Valores por defecto:
        $(":password").passwordMeter();

    Parámetros personalizados:
        $(":password").passwordMeter({
            classes: Array("Corta", "Debil", "Buena", "Fuerte"),
            minLen: 2
        });

    Dependencias:
        jQuery-1.X o superior
*/
(function ($) {
    $.fn.passwordMeter = function (opciones) {

        var defaults = {
            classes: Array(
                "passCorta",
                "passDebil",
                "passBuena",
                "passFuerte"
            ),
            minLen: 8,
            regexp: {
                may: /[a-z]/,
                min: /[A-Z]/,
                num: /[0-9]/
            },
            Consecutive: /(.)\1+/
        };

        var _defaults = $.extend(defaults, opciones);

        this.each(function () {

            $(this).keyup(function (Key) {

                var _val = $(this).val();
                clearAllStyle(this);
                var filters = 0;
                if (_val.toString().length >= _defaults.minLen) {
                    filters = 1;
                    for (var r in _defaults.regexp) {
                        if (_defaults.regexp[r].test(_val)) {
                            filters += 1;
                        }
                    }
                }
                if (_defaults.Consecutive.test(_val) && filters > 0) {
                    filters -= 1;
                }

                filters = filters > 0 ? filters - 1 : 0;
                $(this).addClass(_defaults.classes[filters]);
                if (!_val || /^\s*$/.test(_val)) {
                    clearAllStyle(this);
                }
            });
        });

        function clearAllStyle(_this) {
            for (var c in defaults.classes) {
                try {
                    $(_this).removeClass(defaults.classes[c]);
                } catch (e) { }
            }
        }
    }
})(jQuery);