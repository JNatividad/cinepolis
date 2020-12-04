(function ($, global) {
    var config;

    app.controller('synopsisController', ["$scope", "showtimesService", function ($scope, showtimesService) {
        function init() {
            $('.synopsis').first().addClass("active");
            config = $('.synopsis').first();
            
			//TODO: Al entrar a cartelera
	        //var dataLayer = config.find(".info-carrusel");
            ScrollDatalayer(config, "IMAX", ".info-carrusel");
            peliculasVistas(config, "IMAX", ".info-carrusel");

            $scope.synopsisEmpty = false;
            $scope.loading = true;
            $scope.complete = true;

            var c = config.attr("data-city");
            var arrCities = config.attr("data-cities").split(",");

            if (arrCities.indexOf(c) < 0) {
                c = arrCities[0];
            }


            getNowPlayingByMovie({ codigoPelicula: config.attr("data-movie"), codigoCiudad: c, ciudades: config.attr("data-cities"), complejo: config.attr("data-cinemas"), format: "IMAX" });

	        //console.log(dataLayer.html());
        }

	        setTimeout(function() {
			    peliculasVistas(config, "IMAX", ".info-carrusel");
		    },5000);
	    

	    function getNowPlayingByMovie(synopsis) {
            showtimesService.getSynopsisExperience(synopsis).then(function (data) {
                $scope.synopsis = data.d;
                $scope.loading = false;
                $scope.complete = data.d != null && data.d.Cinemas.length > 0;

                if (!$scope.complete) {
                    clearElement();
                    $scope.synopsisEmpty = true;
                }
                else {
                    $scope.city = data.d.Cinemas[0].CityKey;
                    if ($scope.synopsis != null && Object.keys($scope.synopsis.Dates).length) {
                        $scope.synopsisEmpty = false;
                        var key = Object.keys($scope.synopsis.Dates)[0]
                        $scope.filterDate = $scope.synopsis.Dates[key];
                    }
                    else {
                        $scope.synopsisEmpty = true;
                    }
                }

            }, function (error) {
                $scope.complete = false;
                console.log(error);
            });
        }

        function renderElements() {
            $.uniform.update('.active #cmbFechas');
            $.uniform.update('.active #cmbCiudadHorario');
        }

        function clearElement() {
            $.uniform.update('.active #cmbFechas');
        }

        $scope.getNowPlayingActive = function () {
            config = $('.synopsis.active');

        	//TODO: Al clickear sig o atras
            peliculasVistas(config, "IMAX", ".info-carrusel");
            var c = config.attr("data-city");
            var arrCities = config.attr("data-cities").split(",");

            if (arrCities.indexOf(c) < 0) {
                c = arrCities[0];
            }

            $scope.loading = true;
            $scope.complete = true;
            getNowPlayingByMovie({ codigoPelicula: config.attr("data-movie"), codigoCiudad: c, ciudades: config.attr("data-cities"), complejo: config.attr("data-cinemas"), format: "IMAX" });
            $scope.city = config.attr("data-city");
        }

        $scope.getNowPlayingByCity = function (selected) {
            $scope.loading = true;
            $scope.complete = true;

            var arrSelected = selected.split("|");
            var cinema = arrSelected[0];
            var city = arrSelected[1];

            $(".synopsis").attr("data-city", city);
            $(".synopsis").attr("data-cinemas", cinema);

            var data = { codigoPelicula: config.attr("data-movie"), codigoCiudad: city, ciudades: config.attr("data-cities"), complejo: cinema, format: "IMAX" };
            
            showtimesService.getSynopsisExperience(data).then(function (data) {
                $scope.synopsis = data.d;
                $scope.loading = false;
                $scope.complete = data.d != null && data.d.Cinemas.length > 0;

                if (!$scope.complete) {
                    clearElement();
                    $scope.synopsisEmpty = true;
                }
                else {
                    if ($scope.synopsis != null && Object.keys($scope.synopsis.Dates).length) {
                        $scope.synopsisEmpty = false;
                        var key = Object.keys($scope.synopsis.Dates)[0]
                        $scope.filterDate = $scope.synopsis.Dates[key];
                    }
                    else {
                        $scope.synopsisEmpty = true;
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
            FormatosImagen["IMAX"] = $(".synopsis").attr("data-country") == "CinepolisMX" ? "icon-imax.png" : "icon-imax.png";
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

        $scope.getUrl = function (VistaId, ShowtimeId) {
            var parameters = "&distributor={0}&originalTitle={1}&language={2}&genre={3}&rating={4}&director={5}&protagonist={6}"
            .replace(" ", "-")
            .replace("%20", "-")
            .replace("{0}", $(".info-carrusel").attr("data-distribuidora"))
            .replace("{1}", $(".info-carrusel").attr("data-originaltitle"))
            .replace("{2}", $(".info-carrusel").attr("data-lenguaje"))
            .replace("{3}", $(".info-carrusel").attr("data-genero"))
            .replace("{4}", $(".info-carrusel").attr("data-clasificacion"))
            .replace("{5}", $(".info-carrusel").attr("data-directores"))
            .replace("{6}", $(".info-carrusel").attr("data-actores"));

            var url = compraUrlPais(VistaId, ShowtimeId, parameters);
            return url;
        };

        init();
    }]);
})(window.jQuery, window);