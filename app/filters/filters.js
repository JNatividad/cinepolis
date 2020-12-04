(function () {
    'use strict';
    angular.module('cinepolisApp')
    .filter('ReplaceUrl', ReplaceUrl)

    function ReplaceUrl() {
        return function (value) {
            value = value.replace("static.cinepol.is", "static.cinepolis.com");
            value = value.replace("videos.cinepolis.com", "static.cinepolis.com/videos");
            value = value.replace("dsoh5jykc8zh3.cloudfront.net", "static.cinepolis.com");
            value = value.replace("http://videos.cinepolis.com", "https://static.cinepolis.com/videos");
            value = value.replace("http://static.cinepolis.com", "https://static.cinepolis.com");
            value = value.replace("http://", "https://");
            return value;
        }
    }

})(window.jQuery, window);