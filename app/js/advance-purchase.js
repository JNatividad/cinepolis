var compra = {};
compra.compraAnticipada = new Array();
compra.compraAnticipada[0] = new Array();
compra.compraAnticipada[0][0] = '';
compra.compraAnticipada[0][1] = '30%';
compra.compraAnticipada[0][2] = '40%';
compra.compraAnticipada[0][3] = '60%';

compra.compraAnticipada[1] = new Array();
compra.compraAnticipada[1][0] = '';
compra.compraAnticipada[1][1] = '20%';
compra.compraAnticipada[1][2] = '30%';
compra.compraAnticipada[1][3] = '50%';

var RutaCompra = "/img/genericos/";
var EsCompraActiva = true;
var advance_purchase = {
    getPercentage: function (ciudad, index) {
        var porcentaje = "";
        if (EsCompraActiva && index < compra.compraAnticipada[1].length )
            switch (ciudad) {
                case "guadalajara":
                case "guadalajara-centro":
                case "guadalajara-norte":
                case "guadalajara-norte-poniente":
                case "guadalajara-oriente":
                case "guadalajara-poniente":
                case "guadalajara-sur":
                case "morelia":
                case "torreon":
                case "chihuahua":
                case "cuernavaca":
                    porcentaje = compra.compraAnticipada[1][index];
                    break;
            }

        return porcentaje;
    }
}