(function ($, global) {
    var config;

    var months = new Array("enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre");
    var daysForFormatDate = { today: "", tomorrow: "", thirdDay: "", fourthDay: "", fifthDay: "" }

    app.controller('synopsisController', ["$scope", "showtimesService", function ($scope, showtimesService) {


        function init() {
            config = $('#synopsis');

            //loading(config);
            $scope.loading = true;
            $scope.complete = true;

            $scope.isPresaleValidated = false;
			//TODO: Cambio de Emma.
            $scope.city = (typeof ciudadFB !== "undefined") ? ciudadFB : config.attr("data-city");
            getNowPlayingByMovie({ codigoPelicula: config.attr("data-movie"), codigoCiudad: $scope.city });
            fillDaysForFormatDate();
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



        function getNowPlayingByMovie(synopsis) {
            showtimesService.getSynopsis(synopsis).then(function (data) {
                $scope.synopsis = data.d;
                $scope.loading = false;

                $scope.isPresaleValidated = false;
                $scope.complete = data.d != null && data.d.Cinemas.length > 0;

                if (!$scope.complete) {
                    clearElement();
                }
                else
                {
                    $scope.city = data.d.Cinemas[0].CityKey;
                    if ($scope.synopsis != null && Object.keys($scope.synopsis.Dates).length) {
                        var key = Object.keys($scope.synopsis.Dates)[0]
                        $scope.filterDate = $scope.synopsis.Dates[key];
                    }
                }

            }, function (error) {
                $scope.complete = false;
                console.log(error);
            });
        }

        function renderElements() {
            $(".complejosLista").trigger("chosen:updated");
            $.uniform.update('#cmbFechas');
            $.uniform.update('#cmbCiudadesHorario');

            $(".location").each(function () {
                if ($(this).find(".format").length == 0)
                    $(this).hide();
                else
                    $(this).show();
            });

            if ($(".complejosLista option:selected").length <= 0) {
                $(".complejosLista option:first").prop('selected', 'selected');
                $(".complejosLista").trigger("chosen:updated");
            }

            $(".complejosLista option").each(function () {
                if ($(this).prop("selected"))
                    $(String.format(".{0}", $(this).val())).removeClass("locationHide");
                else 
                    $(String.format(".{0}", $(this).val())).addClass("locationHide");
            });

            var cinemaFB = (typeof complejoFB !== "undefined") ? complejoFB : "-1";
            $(".complejosLista option").each(function () {
                if (cinemaFB != "-1" && $(this).val() != cinemaFB) {
                    //$(String.format(".{0}", item.val())).addClass(classLH);
                    $(this).prop("selected", false);
                }
            });

            $(".horariosDesc").addClass("no_empty");

            if ($("#synopsis").attr("data-pais") == "CinepolisMX") {
                setTimeout(function () {
                    $("#synopsis[data-movie*='la-boda-de-valentina'] > .horariosDesc span:contains('ORI')").addClass("hovToolTip");
                  //  $("#synopsis[data-movie*='finb-']").parents(".sinopsisCont").find(".infoPelicula .infoAdicional").prepend('<ul class="fn-incl"><li class="fn-incl-itm fn-incl--aud"></li><li class="fn-incl-itm fn-incl--int"></li></ul>');

                }, 100);
            }

        }

        function clearElement() {
            $('.complejosLista').val('').trigger("chosen:updated");
            $.uniform.update('#cmbFechas');
        }

        $scope.$watch('filterDate', function () {
            console.log("Cambios");
            if ($("#synopsis").attr("data-pais") == "CinepolisMX") {
                setTimeout(function () {
                    $("#synopsis[data-movie*='la-boda-de-valentina'] > .horariosDesc span:contains('ORI')").addClass("hovToolTip");
                }, 100);
            }
        }, true);

        $scope.getNowPlayingByCity = function (city) {
            $scope.loading = true;
            $scope.complete = true;
            $scope.isPresaleValidated = false;
            var data = { codigoPelicula: config.attr("data-movie"), codigoCiudad: city };

            showtimesService.getSynopsis(data).then(function (data) {
                $scope.synopsis = data.d;
                $scope.loading = false;
                $scope.complete = data.d.Cinemas.length > 0;

                if (!$scope.complete) {
                    clearElement();
                }
                else {
                    if ($scope.synopsis != null && Object.keys($scope.synopsis.Dates).length) {
                        var key = Object.keys($scope.synopsis.Dates)[0]
                        $scope.filterDate = $scope.synopsis.Dates[key];
                    }
                }

            }, function (error) {
                console.log(error);
            });
        }
                
        $scope.$on('onRepeatLast', function (scope, element, attrs) {
            renderElements();
        });

	    //TODO: Cambio de Emma.
        $scope.getExperiences = function (format) {
            var url = "//static.cinepolis.com/img/experiencias/",
            FormatosImagen = {};
            FormatosImagen["ATMOS"] = "icon-xe-atmos.png";
            FormatosImagen["4DX"] = "icon-4d.png";
            FormatosImagen["SCREENX"] = "icon-screenx.png";
            FormatosImagen["4DXSCREENX"] = "icon-screenx-4dx.png";
	        FormatosImagen["IMAX"] = $("#synopsis").attr("data-pais") == "CinepolisMX" ? "icon-imax.png" : "icon-imax.png";
            FormatosImagen["SP"] = "icon-pluus.png";
            FormatosImagen["SJ"] = "icon-sala-junior.png";
            FormatosImagen["XE"] = "icon-xe.png";
            FormatosImagen["HFR"] = "icon-hfr.png";
            FormatosImagen["LED"] = "icon-led.png";

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
                result = "<p><span>" + arrayFormat.join(" </span><span>") + "</span></p>";
            else {
                result = "<span><img src = '" + url + FormatosImagen[experience.toUpperCase().trim()] + "' alt = '" + experience + "' /></span>" + format.replace(experience, "");
                var arrResult = result.split("</span>");
                var tempImage = arrResult[0] + "</span>";
                arrResult.shift();
                result = tempImage + "<p><span>" + arrResult[0].trim().split(" ").join(" </span><span>") + "</span></p>";
            }

            return result;
        };

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
                            desc = (" - " + desc + " de desc.")

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

        $scope.getHourFormat = function (ShowtimeAMPM, Time) {
            var pais = $("#synopsis").attr("data-pais");

            if (pais == "CinepolisPA")
                return ShowtimeAMPM;
            else
                return Time;
        }
        
        $scope.getUrl = function (VistaId, ShowtimeId, movie) {
            movie = $("#detail-movie");
            //var CompraPais = {};
            //CompraPais["CinepolisMX"] = "https://inetvis.cineticket.com.mx/compra/visSelectTickets.aspx";
            //CompraPais["CinepolisCR"] = "https://cr.cineticket-la.com/compra_cr/visSelectTickets.aspx";
            //CompraPais["CinepolisGT"] = "https://gt.cineticket-la.com/compra_gt/visSelectTickets.aspx";
            //CompraPais["CinepolisSV"] = "https://sv.cineticket-la.com/compra/visSelectTickets.aspx";
            //CompraPais["CinepolisHN"] = "https://hn.cineticket-la.com/compra/visSelectTickets.aspx";
            //CompraPais["CinepolisCO"] = "https://co.cineticket-la.com/compra/visSelectTickets.aspx";
            //CompraPais["CinepolisPE"] = "https://pe.cineticket-la.com/compra/visSelectTickets.aspx";
            //CompraPais["CinepolisPA"] = "https://pa.cineticket-la.com/compra/visSelectTickets.aspx";

            //var showtimesFicm = ["96571","96498","96495","96499","96500","96496","96501","96497","96502","96508","96504","96509","96510","96505","96638","96506","96507","96639","96513","96517","96503","96518","96519","96514","96520","96515","96521","96516","96522","96526","96572","96523","96527","96573","96524","96528","96574","96529","96525","96557","96530","96534","96558","96559","96535","96531","96532","96536","96560","96533","96537","96561","96538","96542","96563","96575","96564","96539","96544","96540","96565","96541","96545","96576","96550","96546","96566","96551","96568","96547","96569","96552","96548","96570","96553","96549",
            //"196847","196844","196845","196846","196848","196849","196850","196851","196852","196861","196862","196863","196864","196865","196878","196879","196880","196881","196882","196883","196884","196885","196886","196887","196888","196889","196890","196891","196892","196893",
            //"4944","4945","4946","4947","4971","4948","4949","4950","4951","4952","4953","4954","4955","4956","4957","4958","4959","4960","4961","4962","4963","4964","4965","4966","4967","4968","4969","4970",
            //"20535","20536","20537","20538","20539","20540","20541","20542","20543","20544","20545","20546","20547","20548","20550","20568","20552","20553","20567","20555","20556","20557","20558","20559","20560","20561","20562","20563","20564","20565",
            //"41307","41308","41309","41310","41323","41324","41325","41367","41327","41328","41329","41330","41339","41340","41341","41342","41347","41348","41349","41350","41351","41352","41353","41354","41363","41364","41365","41366"];
            
            var parameters = "&distributor={0}&originalTitle={1}&language={2}&genre={3}&rating={4}&director={5}&protagonist={6}"
             .replace(" ", "-")
             .replace("%20", "-")
                .replace("{0}", movie.attr("data-distribuidora"))
                .replace("{1}", movie.attr("data-titulooriginal"))
             .replace("{2}", "")
                .replace("{3}", movie.attr("data-genero"))
                .replace("{4}", movie.attr("data-clasificacion"))
                .replace("{5}", movie.attr("data-director"))
                .replace("{6}", movie.attr("data-actor"));
            var url = compraUrlPais(VistaId, ShowtimeId, parameters);
            return url;
            //var movies = ["sesion-vr", "vr-engineerium", "vr-singularity", "vr-zombie-survival"];
            //if (movies.indexOf(config.attr("data-movie")) != -1) {
            //    return "https://inetvis.cineticket.com.mx/compravr/" + "?tkn=&cinemacode=" + VistaId + "&txtSessionId=" + ShowtimeId + parameters;
            //}

            //var cinemas = ["446", "579", "673", "180", "155"];
            //if (cinemas.indexOf(VistaId) != -1) {
            //    if (showtimesFicm.indexOf(ShowtimeId) != -1) {
            //        CompraPais["CinepolisMX"] = "https://inetvis.cineticket.com.mx/compraficm/visSelectTickets.aspx"+parameters;
            //    }
            //}

            //return CompraPais[$("#synopsis").attr("data-pais")] + "?tkn=&cinemacode=" + VistaId + "&txtSessionId=" + ShowtimeId + parameters;
        };

        init();
    }]);
})(window.jQuery, window);