var FaceBookLoign;
jQuery(document).ready(function ($) {
    
    var $_GET = jsUtil.getScriptsQueryString('facebook\\.login\\.pkg\\.js');
    FaceBookLoign = {
        login: function() {
            FB.login(
                function(response) {
                    if (response.authResponse != null) {
                        try {
                            window.location.href = "http://cinepolis.com/id/index.aspx" + '?&AT=' + response.authResponse.accessToken + '&ChannelID=' + $_GET["ChannelID"] + '&referer=' + $_GET["referer"];
                        } catch (e) {
                            window.location.href = "http://cinepolis.com/id/index.aspx" + '?&AT=' + response.authResponse.accessToken + '&ChannelID=' + $_GET["ChannelID"];
                        }
                    }
                },
                {
                	scope: 'email, publish_actions , user_friends'
                }
            );
        },

        logout: function() {
            FB.logout(function(response) {});
        }
    };

    $(".log-facebook, .btnFaceConect").click(function () {
        //FB.init();
        $(".log-in").fadeOut(300);
        FaceBookLoign.login();
        return false;
    });
});