(function ($, global) {
    var config;

    app.controller('synopsisController', ["$scope", "showtimesService", function ($scope, showtimesService) {
        function init() {
            $('.synopsis').first().addClass("active");
            config = $('.synopsis').first();
            
            $scope.tabShowtimes = "selected";
            $scope.tabGallery = "";
            $scope.loading = true;
            $scope.complete = true;
            getNowPlayingByMovie({ codigoPelicula: config.attr("data-movie"), codigoCiudad: config.attr("data-city") });
            $scope.city = config.attr("data-city");
        }

        function getNowPlayingByMovie(synopsis) {
            showtimesService.getSynopsis(synopsis).then(function (data) {
                $scope.synopsis = data.d;
                $scope.loading = false;
                $scope.complete = data.d != null && data.d.Cinemas.length > 0;

                if (!$scope.complete) {

                    $scope.tabShowtimes = "disabled";
                    $scope.tabGallery = "selected";

                    clearElement();
                }
                else {
                    $scope.city = data.d.Cinemas[0].CityKey;
                    if ($scope.synopsis != null && Object.keys($scope.synopsis.Dates).length) {
                        var key = Object.keys($scope.synopsis.Dates)[0]
                        $scope.filterDate = $scope.synopsis.Dates[key];
                        $scope.tabShowtimes = "selected";
                        $scope.tabGallery = "";
                    }
                }

            }, function (error) {
                $scope.complete = false;
                console.log(error);
            });
        }

        function renderElements() {
            $.uniform.update(".active select[id*='cmbFechas']");
            $.uniform.update(".active select[id*='cmbCiudadHorario']");

            $(".ga-cartelera_complejo").parent().show();
            $(".ga-cartelera_complejo").each(function () {
                if ($(this).parent().find("article").length <= 0)
                    $(this).parent().hide();
            });
        }

        function clearElement() {
            $.uniform.update('.active #cmbFechas');
        }

        $scope.getNowPlayingActive = function () {
            $scope.tabShowtimes = "selected";
            $scope.tabGallery = "";
            config = $('.synopsis.active');

            $scope.loading = true;
            $scope.complete = true;
            getNowPlayingByMovie({ codigoPelicula: config.attr("data-movie"), codigoCiudad: config.attr("data-city") });
            $scope.city = config.attr("data-city");
        }

        $scope.getNowPlayingByCity = function (city) {
            $scope.loading = true;
            $scope.complete = true;
            var data = { codigoPelicula: config.attr("data-movie"), codigoCiudad: city };

            showtimesService.getSynopsis(data).then(function (data) {
                $scope.synopsis = data.d;
                $scope.loading = false;
                $scope.complete = data.d.Cinemas.length > 0;

                if (!$scope.complete) {
                    $scope.tabShowtimes = "disabled";
                    $scope.tabGallery = "selected";
                    clearElement();
                }
                else {
                    if ($scope.synopsis != null && Object.keys($scope.synopsis.Dates).length) {
                        var key = Object.keys($scope.synopsis.Dates)[0]
                        $scope.filterDate = $scope.synopsis.Dates[key];

                        $scope.tabShowtimes = "selected";
                        $scope.tabGallery = "";
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
	        FormatosImagen["IMAX"] = $(".synopsis").attr("data-pais") == "CinepolisMX" ? "icon-imax.png" : "icon-imax.png";
            FormatosImagen["SP"] = "icon-pluus.png";
            FormatosImagen["SJ"] = "icon-sala-junior.png";
            FormatosImagen["XE"] = "icon-xe.png";
            FormatosImagen["LED"] = "icon-led.png";
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
            var url = compraUrlPais(VistaId, ShowtimeId, "");
            return url;
        };

        init();
    }]);
})(window.jQuery, window);