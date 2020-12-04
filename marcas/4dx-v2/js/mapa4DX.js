var CenterArray = {};
CenterArray["CinepolisMX"] = new google.maps.LatLng(20.68017, -101.35437);
CenterArray["CinepolisCR"] = new google.maps.LatLng(10.021913, -84.079056);
CenterArray["CinepolisGT"] = new google.maps.LatLng(14.613172, -90.535026);
CenterArray["CinepolisCO"] = new google.maps.LatLng(4.600017, -74.071884);
CenterArray["CinepolisPA"] = new google.maps.LatLng(8.944925, -79.638176);
CenterArray["CinepolisPE"] = new google.maps.LatLng(-12.043035, -77.035446);

function MM_swapImgRestore() { //v3.0
    var i, x, a = document.MM_sr; for (i = 0; a && i < a.length && (x = a[i]) && x.oSrc; i++) x.src = x.oSrc;
}
function MM_preloadImages() { //v3.0
    var d = document; if (d.images) {
        if (!d.MM_p) d.MM_p = new Array();
        var i, j = d.MM_p.length, a = MM_preloadImages.arguments; for (i = 0; i < a.length; i++)
            if (a[i].indexOf("#") != 0) { d.MM_p[j] = new Image; d.MM_p[j++].src = a[i]; }
    }
}

function MM_findObj(n, d) { //v4.01
    var p, i, x; if (!d) d = document; if ((p = n.indexOf("?")) > 0 && parent.frames.length) {
        d = parent.frames[n.substring(p + 1)].document; n = n.substring(0, p);
    }
    if (!(x = d[n]) && d.all) x = d.all[n]; for (i = 0; !x && i < d.forms.length; i++) x = d.forms[i][n];
    for (i = 0; !x && d.layers && i < d.layers.length; i++) x = MM_findObj(n, d.layers[i].document);
    if (!x && d.getElementById) x = d.getElementById(n); return x;
}

function MM_swapImage() { //v3.0
    var i, j = 0, x, a = MM_swapImage.arguments; document.MM_sr = new Array; for (i = 0; i < (a.length - 2) ; i += 3)
        if ((x = MM_findObj(a[i])) != null) { document.MM_sr[j++] = x; if (!x.oSrc) x.oSrc = x.src; x.src = a[i + 2]; }
}



var mc = null;
var map = null;
var mgr = null;

function toggleMarkerClusterer() {
    mc = new MarkerClusterer(map, markers.conjuntos, { maxZoom: 4 });
}

function initialize() {    
    var myLatLng = CenterArray[CodigoSitio];
    var myOptions = {
        zoom: 6,
        center: myLatLng,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    map = new google.maps.Map(document.getElementById("map"), myOptions);

    if (markers) {
        for (var level in markers) {
            for (var i = 0; i < markers[level].length; i++) {
                var details = markers[level][i];
                markers[level][i] = new google.maps.Marker({
                    title: details.level,
                    icon: details.icon,
                    position: new google.maps.LatLng(details.location[0], details.location[1]),
                    clickable: true,
                    draggable: false,
                    flat: true,
                    tooltip: details.tooltip,
                    url: details.url,
                    id: details.name,
                    city: details.city
                });

                google.maps.event.addListener(markers[level][i], 'click', function () {
                    $(".map-info").show();
                    $(".cinema-location").html(this.tooltip + "<br><br>" + this.url);
                });

                if ($.cookie("Ciudad") == details.city) {
                    map.setCenter({
                        lat: details.location[0],
                        lng: details.location[1]
                    });

                    $(".map-info").show();
                    $(".cinema-location").html(details.tooltip + "<br><br>" + details.url);
                }
            }
        }
    }
}

google.maps.event.addDomListener(window, 'load', initialize);
google.maps.event.addDomListener(window, 'load', toggleMarkerClusterer);