$.ajax({
    type: "POST",
    url: route("ubicaciones"),
    datatype: "JSON",
    //async: !1,
    data: { paisUrl: location.hostname },
    success: function (response) {

        var latPais = 0;
        var lngPais = 0;
        var zoom = 0;
        if (response[0].CvePais == "CR") {
            latPais = 9.9280694;
            lngPais = -84.09072459999999;
            zoom = 10;
        } else {
            latPais = 23.765237;
            lngPais = -102.370605;
            zoom = 5;

            $(".top-description").text("Elige tu juego y compra tus boletos.");
        }
        var e = new GMaps({
            el: "#map",
            lat: latPais,
            lng: lngPais,
            zoom: zoom,
            disableDefaultUI: !0,
            scrollwheel: !1,
            mapTypeControl: !1,
            zoomControl: !0,
            zoomControlOptions: {
                position: google.maps.ControlPosition.RIGHT_CENTER
            }
        });
        $.each(response, function (o, i) {
            if ("arena" === i.Tipo) {
                var n = '<div id="content" class="contentMaps"><div id="siteNotice"></div><div id="bodyContent"><b> ' + i.NombreComplejo + " </b><p> " + i.DireccionComplejo + " </p></div></div>"
                  , t = new google.maps.InfoWindow({
                      content: n
                  })
                  , a = e.addMarker({
                      lat: i.Latitud,
                      lng: i.Longitud,
                      animation: google.maps.Animation.DROP,
                      icon: {
                          url: route("Resources/Content/img/icons/ico-pin-arena.png")
                      }
                  });
                a.addListener("click", function () {
                    $(".gm-style-iw").prev().remove(),
                    $(".gm-style-iw").next().remove(),
                    $(".gm-style-iw").remove(),
                    t.close(),
                    t.setContent(n),
                    t.open(map, a),
                    console.log($(this))
                })
            } else {
                var n = '<div id="content2" class="contentMaps"><div id="siteNotice"></div><div id="bodyContent"><b> ' + i.NombreComplejo + " </b><p> " + i.DireccionComplejo + " </p></div></div>"
                  , t = new google.maps.InfoWindow({
                      content: n
                  })
                  , a = e.addMarker({
                      lat: i.Latitud,
                      lng: i.Longitud,
                      animation: google.maps.Animation.DROP,
                      icon: {
                          url: route("Resources/Content/img/icons/ico-pin-lobby.png")
                      }
                  });
                a.addListener("click", function () {
                    $(".gm-style-iw").prev().remove(),
                    $(".gm-style-iw").next().remove(),
                    $(".gm-style-iw").remove(),
                    t.close(),
                    t.setContent(n),
                    t.open(map, a)
                })
            }
        })
    }
});
