var cinemasCountry = [
    {
        "Country": "CinepolisMX",
        "ViewId": "",
        "IsActive" : true
    }
];

function getUrlCompraCinepolis(VistaId, ShowtimeId, parameters) {
    var CompraPais = {};
    var tkn = "";
    CompraPais["CinepolisMX"] = "https://compra.cinepolis.com/";
    CompraPais["CinepolisCR"] = "https://cr.cineticket-la.com/compra_cr/visSelectTickets.aspx";
    CompraPais["CinepolisGT"] = "https://gt.cineticket-la.com/compra_gt/visSelectTickets.aspx";
    CompraPais["CinepolisSV"] = "https://sv.cineticket-la.com/compra/visSelectTickets.aspx";
    CompraPais["CinepolisHN"] = "https://hn.cineticket-la.com/compra/visSelectTickets.aspx";
    CompraPais["CinepolisCO"] = "https://co.cineticket-la.com/compra/visSelectTickets.aspx";
    CompraPais["CinepolisPE"] = "https://pe.cineticket-la.com/compra/visSelectTickets.aspx";
    CompraPais["CinepolisPA"] = "https://pa.cineticket-la.com/compra/visSelectTickets.aspx";

    var url = CompraPais[clavePais] + "?tkn=" + tkn + "&cinemacode=" + VistaId + "&txtSessionId=" + ShowtimeId + parameters;
    switch (clavePais) {
        case "CinepolisMX":
            url = CompraPais[clavePais] + "?cinemaVistaId="+VistaId+"&showtimeVistaId="+ShowtimeId;        
            break;
    }
    return url;
}

function getUrlCompraInetvis(VistaId, ShowtimeId, parameters) {
    var CompraPais = {};
    var tkn = "";
    CompraPais["CinepolisMX"] = "https://inetvis.cineticket.com.mx/compra/visSelectTickets.aspx";
    CompraPais["CinepolisCR"] = "https://cr.cineticket-la.com/compra_cr/visSelectTickets.aspx";
    CompraPais["CinepolisGT"] = "https://gt.cineticket-la.com/compra_gt/visSelectTickets.aspx";
    CompraPais["CinepolisSV"] = "https://sv.cineticket-la.com/compra/visSelectTickets.aspx";
    CompraPais["CinepolisHN"] = "https://hn.cineticket-la.com/compra/visSelectTickets.aspx";
    CompraPais["CinepolisCO"] = "https://co.cineticket-la.com/compra/visSelectTickets.aspx";
    CompraPais["CinepolisPE"] = "https://pe.cineticket-la.com/compra/visSelectTickets.aspx";
    CompraPais["CinepolisPA"] = "https://pa.cineticket-la.com/compra/visSelectTickets.aspx";
  
    return CompraPais[clavePais] + "?tkn=" + tkn + "&cinemacode=" + VistaId + "&txtSessionId=" + ShowtimeId + parameters;
}

function compraUrlPais(VistaId, ShowtimeId, parameters) {

    var urlinetvis = getUrlCompraInetvis(VistaId, ShowtimeId, parameters);
    var urlCinepolis = getUrlCompraCinepolis(VistaId, ShowtimeId);

    var countryCinemaItem = cinemasCountry.find(function (element) {
        return element.Country.indexOf(clavePais) != -1;
    });

    if (countryCinemaItem !== undefined) {
        if (countryCinemaItem.ViewId.length > 0) {
            return countryCinemaItem.ViewId.indexOf(VistaId) != -1 ? urlCinepolis  : urlinetvis;   
        }
        return countryCinemaItem.IsActive ? urlCinepolis : urlinetvis;
    }
    return urlinetvis;
}