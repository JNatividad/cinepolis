(function (global) {
    app.factory('showtimesService', ['$http', '$q', function ($http, $q) {
        var factory = {};

        factory.getNowPlaying = function (city) {
            return $http.post("/Cartelera.aspx/GetNowPlayingByCity", city).then(function (results) {
                return results.data;
            });
        }

        factory.getNowPlayingByMovie = function (config) {
            return $http.post("/Cartelera.aspx/GetPresaleByCityMovie", config).then(function (results) {
                return results.data;
            });
        }

        factory.getSynopsis = function (synopsis) {
            return $http.post("/Sinopsis.aspx/GetNowPlayingByMovie", synopsis).then(function (results) {
                return results.data;
            });
        }

        factory.getSynopsisExperience = function (synopsis) {
            return $http.post("/Sinopsis.aspx/GetNowPlayingByMovieExperience", synopsis).then(function (results) {
                return results.data;
            });
        }

        return factory;
    }]);
})(window);