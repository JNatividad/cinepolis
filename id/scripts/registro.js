window.fbAsyncInit = function () {
    var x = FB.init({
        appId: '579868282052507',
        status: true,
        cookie: true,
        oauth: true,
        xfbml: true
    });

};

(function (d) {
    var js, id = 'facebook-jssdk';
    if (d.getElementById(id)) {
        return;
    }
    js = d.createElement('script');
    js.id = id;
    js.async = true;
    js.src = '//connect.facebook.net/es_LA/all.js';
    d.getElementsByTagName('head')[0].appendChild(js);
}(document));
var FaceBookLoign;
FaceBookLoign = {

    login: function () {
        FB.login(
            function (response) {
                if (response.authResponse != null) {
                    try {
                        FB.getLoginStatus(function (responseStatus) {
                            FB.api('/me', function (response) {
                                var apellidos = response.last_name.split(' ');
                                //var fecha = response.birthday.split('/');
                                //var mes = fecha[1].replace('0', '');
                                $("#txtNombre").val(response.first_name);
                                $("#txtApellidoPaterno").val(apellidos[0]);
                                $("#txtApellidoMaterno").val(apellidos[1]);
                                $("#txtCinepolisID").val(response.email);
                                //$("#ddlDia option[value='" + fecha[0] + "']").attr("selected", "selected");
                                //$("#ddlMes option[value='" + mes + "']").attr("selected", "selected");
                                //$("#ddlAnio option[value='" + fecha[2] + "']").attr("selected", "selected");
                            });
                        });
                    } catch (e) {
                        console.log(e);
                    }
                }
            },
            {
                scope: 'email, publish_stream,user_birthday'
            }
        );
    },

    logout: function () {
        FB.logout(function (response) { });
    }
};