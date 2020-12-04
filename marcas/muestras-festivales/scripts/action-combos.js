;jQuery(document).ready(function ($) {

    $("#ddlCiudad").change(function (e) {
        $('#ddlCiudad').parent().css('border', $("#ddlCiudad option:selected").val() == "0" ? '1px solid red' : '1px solid #E1E3E6');
    });

    $("#ddlComplejo").change(function (e) {        
        $('#ddlComplejo').parent().css('border', $("#ddlComplejo option:selected").val() == "0" ? '1px solid red' : '1px solid #E1E3E6');
    });

    $("#ddlFecha").change(function (e) {
        $('#ddlFecha').parent().css('border', $("#ddlFecha option:selected").val() == "0" ? '1px solid red' : '1px solid #E1E3E6');
    });

    $("#btnConsultarCartelera").click(function (e) {
        $('#ddlCiudad').parent().css('border', $("#ddlCiudad option:selected").val() == "0" ? '1px solid red' : '1px solid #E1E3E6');
        $('#ddlComplejo').parent().css('border', $("#ddlComplejo option:selected").val() == "0" ? '1px solid red' : '1px solid #E1E3E6');
        $('#ddlFecha').parent().css('border', $("#ddlFecha option:selected").val() == "0" ? '1px solid red' : '1px solid #E1E3E6');


        if ($("#ddlFecha option:selected").val() != "0") {
            $.cookie('FechaFestival', $("#ddlFecha option:selected").val(), { expires: 1, path: '/' });

            var urlCartelera = "/muestras-y-festivales/{0}{1}/{2}";
            var codigoCiudad = $("#ddlCiudad option:selected").val();
            var codigoComplejo = $("#ddlComplejo option:selected").val();
                                   
            //$.cookie('CiudadFestival', codigoCiudad, { expires: 1, path: '/' });
            //$.cookie('ComplejoFestival', codigoComplejo, { expires: 1, path: '/' });

            window.location = urlCartelera.replace("{0}", claveFestival).replace("{1}", codigoCiudad).replace("{2}", codigoComplejo);
        }
        e.preventDefault();
    });

    //setTimeout(function () {
    //    $("#ddlCiudad option[value='" + $.cookie('CiudadFestival') + "']").attr('selected', 'selected').trigger("change");        
    //}, 10);
});