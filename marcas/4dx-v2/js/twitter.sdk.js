var TwitterSDK = TwitterSDK || (function () {
    var _url;
    return {
        init: function(url) {
            _url = window.location.origin + url;
        },
        share: function (title, video) {
            $.ajax({
                type: "POST",
                url: _url,
                data: JSON.stringify( { 'tweet': title, 'video': video }),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (resp) {
                    var result = JSON.parse(resp.d);
                    window.open(result.url, "", "width=500, height=400");
                }
            });
        }
    };
}());