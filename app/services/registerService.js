(function (global) {
    app
    .factory('UserService', ['$http', function ($http) {
        var service = {
            getCities: function (path) {
                return $http({
                    method: "POST",
                    url: window.location.protocol +
                        '//' +
                        window.location.host + path
                        ,
                    data: {},
                    headers: { "Content-Type": "application/json" },
                    responseType: 'json'
                })
               .then(function (response) {
                   return response.data.d;
               })
               .catch(function (error) {
                   console.log(error);
               });
            },
            getCinemasByCityId: function (cinemas, cityId) {
                for (var i = 0; i < cinemas.length; i++) {
                    if (cinemas[i].Id === cityId) {
                        return cinemas[i].Cinemas;
                    }
                }
                return [];
            },
            saveUser: function (user) {              


                return $http({
                    method: "POST",
                    url: window.location.protocol +
                        '//' +
                        window.location.host + '/marcas/4dx-v2/index.aspx/SaveUser'
                        ,
                    data: {name:user.Name,email:user.Email, cinema:user.Cinema,tcc:user.Tcc,idmarca:user.IdMarca, tyc:user.TYC},
                    headers: { "Content-Type": "application/json" },
                    responseType: 'json'
                })
               .then(function (response) {
                   return response.data.d;
               })
               .catch(function (error) {
                   console.log(error);
               });
            }
        };
        return service;
    }]);
})(window);