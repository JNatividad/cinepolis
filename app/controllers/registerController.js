(function ($, global) {

    app
     .controller('UserController', ['UserService', function (UserService) {
         var self = this;

         //variables
         self.patternEmail = new RegExp(/^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/);
         self.patternName = new RegExp(/^([a-z ñáéíóú]{2,60})$/i);
         self.patternTcc = new RegExp(/^([0-9]{16})$/);
         self.cities = [];
         self.cinemas = [];
         self.selectedCity = undefined;
         self.selectedCinema = undefined;
         self.path = '';
         self.user = {
             Name: '',
             Email: '',
             Cinema: '',
             Tcc: '',
             IdMarca: '',
             TYC: false
         };
         self.message = '';

         self.activate = activate;

         function activate(path) {
             self.path = path;

             UserService.getCities(self.path).then(function (data) {
                 self.cities = data;
             });
         }



         self.getCinemas = function (key) {
             console.log(self.selectedCinema);
             self.cinemas = UserService.getCinemasByCityId(self.cities, key);
         }

         self.save = function () {
             if (!self.patternName.test(self.user.Name)) {
                 self.message += '- El nombre no cumple con el formato correcto.<br>';
             }
             if (!self.patternEmail.test(self.user.Email)) {
                 self.message += '- El correo electrónico no es correcto.<br>';
             }
             if (self.selectedCity === undefined || self.selectedCity === null) {
                 self.message += '- Debes seleccionar una ciudad.<br>';
             }
             if (self.selectedCinema === undefined || self.selectedCinema === null) {
                 self.message += '- Debes seleccionar tu complejo favorito.<br>';
             }
             else {
                 if (!(/^\d+$/.test(self.selectedCinema.CinemaId))) {
                     self.message += '- El complejo favorito seleccionado no es correcto.<br>';
                     return;
                 }
             }
             

             if (!self.patternTcc.test(self.user.Tcc)) {
                 self.message += '- La Tarjeta Club Cinépolis® no cumple con el formato correcto.<br>';
             }
             if (!self.user.TYC) {
                 self.message += '- Debes aceptar el Aviso de Privacidad';
             }
             if (self.message !== '') {
                 alertify.alert(self.message);
                 self.message = '';
                 return;
             }

             self.user.Cinema = self.selectedCinema.CinemaId;
             UserService.saveUser(self.user).then(function (data) {
                 var result = JSON.parse(data);
                 alertify.alert(result.content);
             });
             self.user = {};
             self.selectedCinema = undefined;
             self.selectedCity = undefined;
         }

     }]);
})(window.jQuery, window);