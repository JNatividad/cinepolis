var FacebookSDK = FacebookSDK || (function () {
    return {
        init: function (appid) {
            window.fbAsyncInit = function() {
                FB.init({
                    appId: appid,
                    xfbml: true,
                    version: 'v2.3'
                });
            };
        },
        share: function (caption, title, video) {
            FB.ui(
            {
                method: 'feed',
                name: title,
                caption: caption,
                description: (
                    title
                ),
                link: video
            }
        );
            ga('send', 'event', 'Contenido', 'Share', 'facebook');
        }
    };
}());