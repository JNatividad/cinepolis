;

var SharePais = {};
SharePais["CinepolisMX"] = "Checa";
SharePais["CinepolisCR"] = "Mirá";
SharePais["CinepolisGT"] = "Mira";
SharePais["CinepolisCO"] = "Ve";
SharePais["CinepolisSV"] = "Mira";
SharePais["CinepolisHN"] = "Mira";
SharePais["CinepolisPE"] = "Ve";
SharePais["CinepolisPA"] = "Ve";

var DominioPais = {};
DominioPais["CinepolisMX"] = ".com";
DominioPais["CinepolisCR"] = ".co.cr";
DominioPais["CinepolisGT"] = ".com.gt";
DominioPais["CinepolisCO"] = ".com.co";
DominioPais["CinepolisSV"] = ".com.sv";
DominioPais["CinepolisHN"] = ".com.hn";
DominioPais["CinepolisPE"] = ".com.pe";
DominioPais["CinepolisPA"] = ".com.pa";

var TwitterPais = {};
TwitterPais["CinepolisMX"] = "@Cinepolis";
TwitterPais["CinepolisCR"] = "@CinepolisCR";
TwitterPais["CinepolisGT"] = "@CinepolisGT";
TwitterPais["CinepolisCO"] = "@CinepolisCO";
TwitterPais["CinepolisSV"] = "@CinepolisSV";
TwitterPais["CinepolisHN"] = "@CinepolisHN";
TwitterPais["CinepolisPE"] = "@CinepolisPE";
TwitterPais["CinepolisPA"] = "@CinepolisPA";

jQuery(document).ready(function ($) {
    $(".comparteTW").click(function (e) {
        var seccion = $(this).parents("section");
        var titulo = seccion.find(".infoPelicula h3 span").html();

        var link = window.location.href.replace("http://", "");
        link = link.substring(link.indexOf("/") + 1, link.length);

        var url = encodeURI("cinepolis" + DominioPais[PaisCompra] + "/" + link + "&text=" + SharePais[PaisCompra] + " la sinopsis de " + titulo + " a través de " + TwitterPais[PaisCompra] + ".");
        window.open("http://twitter.com/share?url=http%3A%2F%2F" + url, 'ventanacompartir', 'toolbar=0, status=0, width=650, height=450');

        e.preventDefault();
    });
});