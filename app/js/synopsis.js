; (function (window, $) {

    var emptyLocations = $(".emptyLocations"),
        classLH = "locationHide",
        playVideo = $(".vjs-big-play-button");
    /*UTILS*/
    if (!String.format) {
        String.format = function (format) {
            var args = Array.prototype.slice.call(arguments, 1);
            return format.replace(/{(\d+)}/g, function (match, number) {
                return typeof args[number] != 'undefined' ? args[number] : match;
            });
        };
    }

    /*NowPlaying*/
    var cartelera = {
        locationChange: function () {
            if ($(".complejosLista").length > 0) {
                $(".complejosLista").chosen({
                    disable_search_threshold: 10,
                    width: "100%"
                }).change(function (sender, seleccionado) {
                    emptyLocations.hide();
                    if (!$.isEmptyObject(seleccionado.deselected)) {
                        $(String.format(".{0}", seleccionado.deselected)).addClass(classLH);

                        if ($(".location").length == $(".location.locationHide").length)
                            emptyLocations.show();
                    }
                    else if (!$.isEmptyObject(seleccionado.selected)) {
                        $(String.format(".{0}", seleccionado.selected)).removeClass(classLH);

                        try {
                            var children = $("." + seleccionado.selected).attr("idcomplejohijo").split(',');
                            $.each(children, function (index, valor) {
                                var id = parseInt(valor);
                                var key = $("[idcomplejo='" + id + "']").attr("key");
                                var itemSelect = $(".complejosLista option[value='" + key + "']");
                                itemSelect.prop('selected', true);
                                $("." + itemSelect.attr("value")).removeClass(classLH);
                            });
                            $(".complejosLista").trigger("chosen:updated");
                        } catch (e) { console.log(e); }

                    }
                });
            }
        },

        citysChange: function () {
            $("#cmbCiudadesHorario").change(function () {
                emptyLocations.hide();
                $(".sinopsis a[id$=link_encartelera]").html("<i class='icon-chevron-left'></i>CARTELERA EN " + $(this).find("option:selected").text().toUpperCase()).attr("href", "/cartelera/" + $("select[id$='cmbCiudadesHorario'] option:selected").val());
            });
        }
    };

    function perfectScroll() {
        setTimeout(function () {
            if ($('.ov-flow').length > 0) {
                $('.ov-flow').perfectScrollbar({ suppressScrollX: true });
                $(".horariosDesc").css("min-height", "400px");
            }
        }, 1000);
    }

    $(document).ready(function () {
        emptyLocations.hide();
        cartelera.locationChange();
        cartelera.citysChange();
        perfectScroll();
    });

    $(window).load(function () {
        playVideo.click(function (e) {
            var titulo = $("span[id*='ctl_titulo']").text();
            dataLayer.push({ 'nombre de trailer': titulo, 'event': 'reproducir' });
        });
    });

})(window, jQuery);