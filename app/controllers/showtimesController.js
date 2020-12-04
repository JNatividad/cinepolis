(function ($, global) {
    var config,
        classLH = "locationHide",
        messageFilters = $(".emptyFilters"),
        presaleIndex = 0,
        moviePresale,
        validarExplorer = navigator.userAgent.indexOf("MSIE") > -1;;

    var months = new Array("enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre");
    var daysForFormatDate = { today: "", tomorrow: "", thirdDay: "", fourthDay: "", fifthDay: "" }

    app.controller('showtimesController', ["$scope", "showtimesService", function ($scope, showtimesService) {
        function getBool(val) {
            var num = +val;
            return !isNaN(num) ? !!num : !!String(val).toLowerCase().replace(!!0, '');
        }

        ////TODO: Se agregó evento click para validar en preventas las peliculas vistas.
        //   $(document).on("click", ".bx-next",
        //    function () {
        //	    peliculasVistas(".tituloPelicula li", "preventas", "span.preventa-data-layer");
        //    });

        //   //TODO: Se agregó evento click para validar en preventas las peliculas vistas.
        //   $(document).on("click", ".bx-prev",
        //    function () {
        //    	peliculasVistas(".tituloPelicula li", "preventas", "span.preventa-data-layer");
        //    });

        function init() {
            $scope.loading = true;
            $scope.complete = true;
            $scope.indexPresale = -1;

            $scope.segob = [];
            $scope.isPresaleActive = false;
            $scope.isPresaleFound = true;
            messageFilters.hide();

            $scope.isPresaleValidated = false;

            config = $('#carteleraCiudad');

            if (getBool(config.attr("data-presale")) == false)
                getNowPlaying({ claveCiudad: config.attr("data-city"), esVIP: getBool(config.attr("data-vip")) });
            else {
                if (Presales != null) {
                    $scope.presales = Presales;
                    $scope.isPresaleActive = true;
                    moviePresale = config.attr("data-movie");
                    getNowPlayingByMovie(moviePresale);
                }
                else {
                    $scope.loading = false;
                    $scope.complete = false;
                    $(".filtrosBusqueda").hide();
                }
            }
            fillDaysForFormatDate();
        }

        $scope.$watch('filterDate', function () {
            if ($("#carteleraCiudad").attr("data-pais") == "CinepolisMX") {
                setTimeout(function () {
                    $(".tituloPelicula > .descripcion > header a[data-title*='La Boda de Valentina']").parents(".descripcion").find("div.horarioExp.ORI").addClass("hovToolTip");
                    //$(".tituloPelicula > .descripcion[id*='finb-']").find("h3").append('<ul class="fn-incl"><li class="fn-incl-itm fn-incl--aud"></li><li class="fn-incl-itm fn-incl--int"></li></ul>');
                }, 100);
            }
        }, true);

        $scope.sendDataLayer = function (movie, cartelera, cine) {

            var data = {
                'event': 'productClick',
                'ecommerce': {
                    'click': {
                        'actionField': { 'list': cine },// Optional list property.
                        'products': [{
                            'name': movie.Title,
                            'brand': movie.Distributor,
                            'variant': "Sin datos",
                            'dimension4': movie.OriginalTitle,
                            'dimension6': movie.Gender,
                            'dimension7': movie.Rating,
                            'dimension8': movie.Director,
                            'dimension9': movie.Actors,
                            'dimension10': "Sin datos",
                            'dimension11': "boletos"
                        }]
                    }
                }
            }

            dataLayer.push(data);
            location.href = location.protocol + "//" + location.host + "/pelicula/" + movie.Key;

            ////TODO: Se llama a una función que valida el click de la pelicula seleccionada y redirecciona a sinopsis.
            //     	DataLayeWeb(cine, movie.Title, movie.Distributor, "Sin datos", movie.OriginalTitle, movie.Gender, movie.Rating, movie.Director, movie.Actors, "Sin datos", "click", "/pelicula/"+movie.Key);
        }

        function getNowPlayingByMovie(moviePresale, city) {
            var result;

            if (moviePresale != "") {
                presaleIndex = $.map($scope.presales, function (obj, index) { if (obj.Clave == moviePresale) return index; });

                if (presaleIndex.length >= 2)
                    presaleIndex = $scope.indexPresale;
            }
            $scope.presaleActive = (presaleIndex.length <= 0) ? Presales[0] : Presales[presaleIndex];
            if (presaleIndex.length <= 0)
                $scope.isPresaleFound = false;

            if (typeof (city) != "undefined")
                result = $.grep($scope.presaleActive.Ciudades, function (e) { return e.CodigoCiudad == city; });

            if (typeof (result) === "undefined" || result.length == 0) {
                result = $.grep($scope.presaleActive.Ciudades, function (e) { return e.CodigoCiudad == config.attr("data-city"); });
                $scope.currentCity = result.length == 0 ? $scope.presaleActive.Ciudades[0].CodigoCiudad : config.attr("data-city");
            }
            else
                $scope.currentCity = city

            showtimesService.getNowPlayingByMovie({ codigoPelicula: $scope.presaleActive.Clave, codigoCiudad: $scope.currentCity, tipos: $scope.presaleActive.Formatos.toString() }).then(function (data) {
                $scope.loading = false;
                $scope.city = data.d;

                if ($scope.city != null && Object.keys($scope.city.Dates).length) {
                    var key = Object.keys($scope.city.Dates)[0]
                    $scope.filterDate = $scope.city.Dates[key];
                }
                else
                    $scope.complete = false;

            }, function (error) {
                $scope.complete = false;
                console.log("Error al obtener horarios");
            });
        }

        function getNowPlaying(city) {

            showtimesService.getNowPlaying(city).then(function (data) {
                $scope.loading = false;
                if (data != null) {
                    $scope.city = data.d;
                    $scope.selectedCity = city;

                    if ($scope.city != null && Object.keys($scope.city.Dates).length) {
                        var key = Object.keys($scope.city.Dates)[0]
                        $scope.filterDate = $scope.city.Dates[key];
                    }
                }
                else
                    $scope.complete = false;

            }, function (error) {
                $scope.complete = false;
                console.log("Error al obtener horarios");
            });
        }

        function renderElements() {

            if (config.attr("data-location") != "") {

                var complejoHijos = null;
                $(".complejosLista").find("option").each(function (index, item) {
                    var item = $(item);
                    if (item.val() != config.attr("data-location")) {
                        $(String.format(".{0}", item.val())).addClass(classLH);
                        item.prop("selected", false);
                    }
                    else {
                        if ($scope.city.Cinemas[index].Children != "") {
                            complejoHijos = $scope.city.Cinemas[index].Children.replace(/\s/g, '').split(',');
                        }
                    }
                });

                if (complejoHijos != null) {
                    $(".complejosLista").find("option").each(function (index, item) {
                        var item = $(item);
                        if (complejoHijos.indexOf(item.attr("idcomplejo")) != -1) {
                            $(String.format(".{0}", item.val())).removeClass(classLH);
                            item.prop("selected", true);
                        }
                    });
                }

                //if (config.attr("data-location") == "cinepolis-escala-morelia-plaza-morelia") {
                //    $(".listaCarteleraHorario").append('<div class="divComplejo Complejo_cinepolis-morelia-centro" style="text-align:center">\
                //                                          <h2>\
                //                                           <img src="https://static.cinepolis.com/img/lg-cinepolis.png" alt="Cinépolis®">\
                //                                          </h2>\
                //                                          <div class="divComplejo--disabled-disclaimer disc">\
                //                                           <p class="disc-txt">Estimado cliente.</p>\
                //                                           <p class="disc-txt">\
                //                                            Le informamos que el servicio de\
                //                                            <span class="disc-txt--strong">\
                //                                             Cinépolis<sup>®</sup> Escala Morelia (Plaza Morelia) \
                //                                            </span>\
                //                                            se restablecerá a partir del sábado 21 de octubre de 2017, debido a la inauguración del FICM 2017.\
                //                                           </p>\
                //                                           <p class="disc-txt">Muchas gracias por su comprensión.</p>\
                //                                          </div>\
                //                                         </div>');
                //}
            }

            $(".complejosLista").trigger("chosen:updated");

            $(".zonasLista").chosen({
                disable_search_threshold: 10,
                width: "100%"
            });

            if ($(".zonasLista").find("option").length <= 1)
                $(".divZonas").hide();

            $(".chk_filtroFormato").not(":checked").prop("checked", "checked");
            $.uniform.restore('.chk_filtroFormato');

            $(".chk_filtroFormato").uniform();
            $.uniform.update('#cmbFechas');

            if (!detectmob()) {
                $(".btnInfoComplejo").each(function () {
                    $(this).autofix_anything({ widthContent: ".listaCarteleraHorario" });
                });
            }

            countTT();
        }

        function scrollMovie() {
            setTimeout(function () {
                if (!$.isEmptyObject($.cookie('ancla'))) {
                    if ($("a[href*='" + $.cookie('ancla') + "']:first").length > 0) {
                        $('html, body').stop().animate({
                            'scrollTop': $("a[href*='" + $.cookie('ancla') + "']:first").offset().top - 200
                        }, 900, 'swing', function () {
                            $.cookie('ancla', '', { expires: -1, path: '/' });
                        });
                    }
                }
            }, 100);
        }

        function parseFilters() {
            var languajes = ["SUB", "ESP", "ORI"];
            $(".horarioExp").each(function (index, item) {
                var _this = $(item),
                    _class = _this.attr("class").split(" ");

                if ($(this).parents(".divComplejo").find("a").attr("nombrecomplejo").indexOf(" VIP ") == -1) {

                    if (_class.length == 2) {
                        for (var j = 0; j < languajes.length; j++)
                            _class[1] = _class[1].replace(languajes[j], String.format("TRAD 2D {0}", languajes[j]));
                        _this.attr("class", _class.join(" "));
                    }
                    else {
                        var _class3d = _class.join(" ");

                        if (_class3d.indexOf("4DX") == -1 && _class3d.indexOf("IMAX") == -1) {
                            for (var j = 0; j < languajes.length; j++)
                                if (_class3d.indexOf(String.format("3D {0}", languajes[j])) != -1)
                                    _class3d = _class3d.replace(languajes[j], String.format("TRAD {0}", languajes[j]));
                            _this.attr("class", _class3d);
                        }
                    }
                }

                if (_this.find("span").html() == "ORI")
                    _this.find("span").html("");
            });
        }

        function fillDaysForFormatDate() {
            var dateNow = new Date();//mes empieza de cero Enero = 0

            daysForFormatDate.today = getDateFormatMonthDay(dateNow, 0);
            daysForFormatDate.tomorrow = getDateFormatMonthDay(dateNow, 1);
            daysForFormatDate.thirdDay = getDateFormatMonthDay(dateNow, 1);
            daysForFormatDate.fourthDay = getDateFormatMonthDay(dateNow, 1);
            daysForFormatDate.fifthDay = getDateFormatMonthDay(dateNow, 1);
        }

        function getDateFormatMonthDay(date, addDays) {
            date.setDate(date.getDate() + addDays);

            var day = date.getDate();
            return (day < 10 ? "0" + day : day) + " " + months[date.getMonth()];
        }

        $scope.getNowPlayingByCityZone = function (city) {
            var newCity;

            city.forEach(function (item) {
                var result = $.grep($scope.city.Cinemas, function (cinema) { return cinema.CityKey == item; });
                if (result.length == 0) newCity = item;
            });

            if (typeof newCity !== 'undefined') {
                showtimesService.getNowPlaying({ claveCiudad: newCity, esVIP: config.attr("data-vip") }).then(function (data) {
                    temporalCity = data.d;

                    temporalCity.Cinemas.forEach(function (cinema) {
                        $scope.city.Cinemas.push(cinema);
                    });

                    $.each(temporalCity.Dates, function (key, value) {
                        if (!(key in $scope.city.Dates)) $scope.city.Dates[key] = value;
                    });

                    $.each(temporalCity.Experiences, function (key, value) {
                        if (!(key in $scope.city.Experiences)) $scope.city.Experiences[key] = value;
                    });

                    $.each(temporalCity.Formats, function (key, value) {
                        if (!(key in $scope.city.Formats)) $scope.city.Formats[key] = value;
                    });

                    $.each(temporalCity.Languages, function (key, value) {
                        if (!(key in $scope.city.Languages)) $scope.city.Languages[key] = value;
                    });

                    $.each(temporalCity.Locations, function (key, value) {
                        if (!(key in $scope.city.Locations)) $scope.city.Locations[key] = value;
                    });

                }, function (error) {
                    console.log("Error al obtener horarios");
                });
            }
        }

        //Validacion de compra anticipada
        $scope.formatDate = function (date, cityKey, index, isPresale) {
            var desc = "";
            if (isPresale) {
                //si el ciudad tiene activada la compra anticipada se aplica el descuento.
                switch (date) {
                    case daysForFormatDate.tomorrow:
                    case daysForFormatDate.thirdDay:
                    case daysForFormatDate.fourthDay:
                        var desc = advance_purchase.getPercentage(cityKey, index);
                        if (desc != "")
                            desc = (" - " + desc + " de desc.");

                        $scope.isPresaleValidated = true;
                        break;
                }
            }

            //Formato de día
            switch (date) {
                case daysForFormatDate.today:
                    date = "Hoy (" + date + ")";
                    break;
                case daysForFormatDate.tomorrow:
                    date = "Mañana (" + date + ")";
                    break;
            }
            return date + desc;
        }

        $scope.getNowPlayingByMovie = function (city) {
            $scope.loading = true;
            $scope.complete = true;
            messageFilters.hide();
            $.uniform.update('.ciudadLista');
            getNowPlayingByMovie($scope.presaleActive.Clave, city, $scope.presaleActive.Formatos);
        }

        $scope.clickPresale = function (movie, index) {
            $scope.loading = true;
            $scope.complete = true;
            $scope.indexPresale = index;
            messageFilters.hide();
            moviePresale = movie;
            getNowPlayingByMovie(moviePresale);
        }

        $scope.$on('onRepeatLast', function (scope, element, attrs) {
            renderElements();
            parseFilters();
            scrollMovie();
        });

        $scope.$on('onRepeatLastPresale', function (scope, element, attrs) {
            $.uniform.update('.ciudadLista');
        });

        $scope.showTrailer = function (trailer) {
            return !(trailer.trim().length == 0)
        };

        $scope.DataLayerTrailer = function (title) {
            dataLayer.push({ 'event': 'reproducir', 'nombre de trailer': title });
        }

        $scope.getExperiences = function (format) {
            var url = "//static.cinepolis.com/img/experiencias/",
                FormatosImagen = {};

            FormatosImagen["ATMOS"] = "icon-xe-atmos.png";
            FormatosImagen["4DX"] = "icon-4d.png";
            FormatosImagen["SCREENX"] = "icon-screenx.png";
            FormatosImagen["4DXSCREENX"] = "icon-screenx-4dx.png";
            FormatosImagen["LED"] = "icon-led.png";
            FormatosImagen["IMAX"] = $("#carteleraCiudad").attr("data-pais") == "CinepolisMX" ? "icon-imax.png" : "icon-imax.png";
            FormatosImagen["SP"] = "icon-pluus.png";
            FormatosImagen["SJ"] = "icon-sala-junior.png";
            FormatosImagen["XE"] = "icon-xe.png";
            FormatosImagen["HFR"] = "icon-hfr.png";

            var arrayFormat = format.split(" "),
                experience = "",
                stbFormat = "";

            $.each(FormatosImagen, function (image) {
                arrayFormat.forEach(function (item) {
                    if (image.toLowerCase() == item.toLowerCase())
                        experience = item;
                });
            });

            if (experience == "XE") {
                if (format.indexOf("ATMOS") > -1) {
                    experience = "ATMOS";
                    format = format.replace("XE", "");
                }
            }

            var result = "";

            if (experience.length <= 0)
                result = "<p><span>" + arrayFormat.join("</span><span>") + "</span></p>";
            else {
                result = "<span><img src = '" + url + FormatosImagen[experience.toUpperCase().trim()] + "' alt = '" + experience + "' /></span>" + format.replace(experience, "");
                var arrResult = result.split("</span>");
                var tempImage = arrResult[0] + "</span>";
                arrResult.shift();
                result = tempImage + "<p><span>" + arrResult[0].trim().split(" ").join("</span><span>") + "</span></p>";
            }

            return result;
        };

        $scope.AddSegob = function (format, segob, movie) {
            var newSegob = movie + " " + format + " GOB: " + segob + " |";

            if ($scope.segob.indexOf(newSegob) == -1) {
                $scope.segob.push(newSegob);
            }
        };

        $scope.getHourFormat = function (ShowtimeAMPM, Time) {
            var pais = $("#carteleraCiudad").attr("data-pais");

            if (pais == "CinepolisPA")
                return ShowtimeAMPM;
            else
                return Time;
        }

        $scope.getUrl = function (VistaId, ShowtimeId, movie) {

            var parameters = "&distributor={0}&originalTitle={1}&language={2}&genre={3}&rating={4}&director={5}&protagonist={6}"
                .replace(" ", "-")
                .replace("%20", "-")
                .replace("{0}", movie.Distributor)
                .replace("{1}", movie.OriginalTitle)
                .replace("{2}", "")
                .replace("{3}", movie.Gender)
                .replace("{4}", movie.Rating)
                .replace("{5}", movie.Director)
                .replace("{6}", movie.Actors == null ? "Sin datos" : movie.Actors[0]);
            var url = compraUrlPais(VistaId, ShowtimeId, parameters);
            return url;
        };

        $scope.parseFormat = function (format) {
            var experience = format,
                Experiencia = {};
            Experiencia["SP"] = "PLUUS";
            Experiencia["XE"] = "Macro xe";

            $.each(Experiencia, function (item) {
                if (item.toLowerCase() == format.toLowerCase()) {
                    experience = Experiencia[item];
                    return;
                }
            });

            return experience.toUpperCase();
        };

        $scope.getLocation = function (name, status) {

            var pleca = status == 2 ? "<span class='nueva-ap'>Nueva apertura</span>" : "";
            name = name + pleca;

            var IconPais = {};
            IconPais["CinepolisMX"] = "<i class='icon-info-sign'></i>" + name;
            IconPais["CinepolisCR"] = "<i class='icon-info-sign'></i>" + name;
            IconPais["CinepolisGT"] = "<i class='icon-info-sign'></i>" + name;
            IconPais["CinepolisSV"] = "<i class='icon-info-sign'></i>" + name;
            IconPais["CinepolisHN"] = "<i class='icon-info-sign'></i>" + name;
            IconPais["CinepolisCO"] = name + " <span class='info-cine info-RA'>?</span></h2>";
            IconPais["CinepolisPE"] = name + " <span class='info-cine info-RA'>?</span></h2>";
            IconPais["CinepolisPA"] = name + " <span class='info-cine info-RA'>?</span></h2>";

            return IconPais[$("#carteleraCiudad").attr("data-pais")];
        };

        init();
    }]);
    //ScrollDatalayer(".proximamente article ul li", "proximamente-inferior", "span.data-layer");
})(window.jQuery, window);