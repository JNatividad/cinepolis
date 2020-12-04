(function ($, angular, global) {
    var app = angular.module('cinepolisApp', [])
    .config([
    '$compileProvider',
    function ($compileProvider) {
        $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|javascript|javascript:|mailto|chrome-extension):/);
        // Angular before v1.2 uses $compileProvider.urlSanitizationWhitelist(...)
    }
    ]);

    global.app = app;
})(window.jQuery, window.angular, window);