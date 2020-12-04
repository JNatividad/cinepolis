; (function (window, $) {
    var emptyLocations = $(".emptyLocations");
    'use strict',
    isSelectVIP = false;

    var locations = $(".complejosLista"),
        classLH = "locationHide",
        messageFilters = $(".emptyFilters");

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
    var nowPlaying = {
        datesChange: function () {
            $("#cmbFechas").change(function () {
                setTimeout(function () {
                    $(".divComplejo").each(function () {
                        locationsChange($(this));
                    });
                }, 100);
            });
        },
        zonasChange: function () {
            $(".zonasLista").change(function (sender, seleccionado) {
                var blExistenComplejos = false;
                if (!$.isEmptyObject(seleccionado)) {
                    if (!$.isEmptyObject(seleccionado.selected)) {
                        locations.find("option").each(function (index, item) {
                            var item = $(item);
                            if (item.attr("data-ciudad") == seleccionado.selected) {
                                $(String.format(".{0}", item.val())).removeClass(classLH);
                                item.prop("selected", true);
                            }
                        });
                    }
                    else {
                        locations.find("option").each(function (index, item) {
                            var item = $(item);
                            if (item.attr("data-ciudad") == seleccionado.deselected) {
                                $(String.format(".{0}", item.val())).addClass(classLH);
                                item.prop("selected", false);
                            }
                        });
                    }

                    locations.trigger("chosen:updated");
                }
            });
        },


        locationChange: function () {

            locations.change(function (sender) {
                $(".listaCarteleraHorario .Complejo_cinepolis-morelia-centro").remove();
                emptyLocations.hide();

                // get all options
                const options = sender.currentTarget.getElementsByTagName('option');
                Array.prototype.slice.call(options).forEach(item => { // item => simple option
                    if (!item.selected) {
                        // unselected item
                        $("." + item.value).addClass(classLH);

                        if ($(".divComplejo").length == $(".divComplejo.locationHide").length)
                            emptyLocations.show(); // not selected any

                        if (item.value.indexOf("-vip-") != -1) {
                            $("#vip").removeAttr('checked');
                            $.uniform.update("#vip");
                        }

                    } else {
                        // selected item
                        emptyLocations.hide(); // hide not selected message

                        $("." + item.value).removeClass(classLH);

                        try {
                            var children = $("." + item.value + " > a").attr("idcomplejohijo").split(',');

                            $.each(children, function (index, valor) {
                                var id = parseInt(valor);
                                var itemSelect = $(".complejosLista option[idcomplejo='" + id + "']");

                                itemSelect.prop('selected', true);

                                $("." + itemSelect.attr("value")).removeClass(classLH);

                            });

                            $(".complejosLista").trigger("chosen:updated");

                        } catch (e) { }

                        if (item.value.indexOf("-vip-") != -1) {
                            $("#vip").prop('checked', "checked");
                            $.uniform.update("#vip");
                        } else {
                            $(".chk_filtroFormato").each(function () {
                                formatsChange($(this));
                            });
                        }

                    }
                });
            });
        },

        slideTimeChange: function () {
            $("#slider-range").bind("slidestop", function (event, ui) {
                if (typeof ui == "undefined") {
                    ui = new Object();
                    ui.handle = $("#a.ui-slider-handle");
                    ui.values = new Array();
                    ui.values[0] = 0;
                    ui.values[1] = 15;
                }

                var diferencia = 9,
                    base = 100,
                    min = (ui.values[0] + diferencia) * base,
                    max = (ui.values[1] + diferencia) * base;

                $('time').each(function () {
                    var time = $(this),
                        hour = parseInt(time.attr("value").replace(":", ""));

                    if (hour >= min && hour <= max)
                        time.show().attr("data-oculto", "0");
                    else
                        time.hide().attr("data-oculto", "1");
                });

                $(".horarioExp").each(function (index) {
                    var _this = $(this),
                    horariosvisibles = _this.find("time[data-oculto='0']").length;

                    if (horariosvisibles <= 0)
                        _this.hide().attr('data-ocultoporhorario', '1');
                    else//if (parseInt(_this.attr('data-conteo')) == 0)
                        _this.show().attr('data-ocultoporhorario', '0');
                });

                $("article.tituloPelicula").each(function (index) {
                    var _this = $(this),
                        formatosvisibles = _this.find(".horarioExp[data-conteo='0'][data-ocultoporhorario='0']").length;
                    if (formatosvisibles > 0)
                        _this.show().attr('data-oculto', '0');
                    else
                        _this.hide().attr('data-oculto', '1');
                });

                $('.divComplejo').each(function (index) {
                    locationsChange($(this));
                });
            });
        },

        formatChange: function () {
            $(document).on("change", ".chk_filtroFormato", function () {
                var filter = $(this).val().toUpperCase();


                if (filter == "VIP") {
                    if ($(this).is(":checked")) {
                        var cmp_vip = $(".complejosLista option[value*='-vip-']:first").val();
                        $(".complejosLista option[value*='-vip-']:first").prop("selected", true);
                        locations.trigger("change", { "selected": cmp_vip });
                        $(".complejosLista").trigger("chosen:updated");
                    }
                    else {
                        $(".complejosLista option").each(function () {
                            if ($(this).val().indexOf("-vip-") != -1) {
                                $(this).prop('selected', false);
                                locations.trigger("change", { "deselected": $(this).val() });
                                $(".complejosLista").trigger("chosen:updated");
                                return;
                            }
                        });
                    }
                } else {
                    formatsChange($(this))
                }
            });
        }
    };

    function locationsChange(_this) {
        var peliculasvisibles = _this.find("article.tituloPelicula[data-oculto='0']").length;
        if (peliculasvisibles > 0)
            _this.attr('data-oculto', '0').show();
        else
            _this.attr('data-oculto', '1').hide();
    }

    function formatsChange(_this) {
        var filter = _this.val().toUpperCase();

        var format = $(".divComplejo").not("." + classLH).find("." + filter);
        if (_this.is(":checked")) {
            format.each(function () {
                var _item = $(this),
                    dataConteo = parseFloat(_item.attr('data-conteo'));

                dataConteo = (dataConteo <= 0) ? 0 : dataConteo - 1;
                _item.attr("data-conteo", dataConteo);
                if (dataConteo == 0) {
                    if (parseFloat(_item.attr("data-ocultoporhorario")) == 0)
                        _item.show();
                }
                else
                    _item.hide();
            });
        }
        else {
            format.each(function () {
                var _item = $(this);
                _item.hide().attr('data-conteo', parseFloat(_item.attr('data-conteo')) + 1);
            });
        }

        $(".divComplejo").each(function (index) {
            $("article.tituloPelicula").each(function (index, item) {
                var _item = $(item),
                    formatosvisibles = _item.find(".horarioExp[data-conteo='0'][data-ocultoporhorario='0']").length;

                if (formatosvisibles > 0)
                    _item.show().attr('data-oculto', '0');
                else
                    _item.hide().attr('data-oculto', '1');
            });

            var _this = $(this),
                peliculasvisibles = _this.find("article.tituloPelicula[data-oculto='0']").length;

            if (peliculasvisibles == 0) {
                _this.attr('data-oculto', '1').hide();

                if ($(".divComplejo").length == $(".divComplejo[data-oculto=1]").length)
                    messageFilters.show();
            }
            else {
                _this.attr('data-oculto', '0').show();
                messageFilters.hide();
            }
        });
    }

    $(document).ready(function () {
        emptyLocations.hide();

        messageFilters.hide();
        if (Presales == null) {
            nowPlaying.zonasChange();
        }

        nowPlaying.locationChange();
        nowPlaying.slideTimeChange();
        nowPlaying.formatChange();
        nowPlaying.datesChange();
    });

})(window, jQuery);