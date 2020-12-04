var ddlCiudad = $("#ddlCiudad"),
    ddlCiudadCumple = $("#ddlCiudadCumple"),
    ddlCiudadEscuela = $("#ddlCiudadEscuela"),
    ddlCiudadRenta = $("#ddlCiudadRenta"),
	ddlComplejo = $("#ddlComplejo"),
    ddlComplejoCumple = $("#ddlComplejoCumple"),
    ddlComplejoEscuela = $("#ddlComplejoEscuela"),
    ddlComplejoRenta = $("#ddlComplejoRenta"),
	ddlPelicula = $("#ddlPelicula"),
    ddlFecha = $("#ddlFecha"),
    ddlCPHorario = $("#ddlCPHorario");

$(function () {

    ddlCiudad.change(function () {
        var url = $(this).attr("data-url"),
			id = $(this).val(),
			datos = { idCiudad: id };
        consultarAjax(url, datos, ddlComplejo, "Selecciona un complejo", "Error al obtener complejos", false);
    });

    ddlComplejo.change(function () {
        var url = $(this).attr("data-url"),
			id = $(this).val(),
			datos = { idCiudad: ddlCiudad.val(), idComplejo: id };
        consultarAjax(url, datos, ddlPelicula, "Selecciona una película", "Error al obtener peliculas", false);
    });

    ddlPelicula.change(function () {
        var url = $(this).attr("data-url"),
			id = $(this).val(),
			datos = { idComplejo: ddlComplejo.val(), idPelicula: id };
        consultarAjax(url, datos, ddlFecha, "Selecciona una fecha", "Error al obtener fechas", false);
    });

    ddlFecha.change(function () {
        var url = $(this).attr("data-url"),
			id = $(this).val(),
			datos = { idComplejo: ddlComplejo.val(), idPelicula: ddlPelicula.val(), fecha: id };
        consultarAjax(url, datos, $("#horarios"), "", "Error al obtener horarios", true);
    });


    ddlCiudadCumple.change(function () {
        var url = $(this).attr("data-url"),
			id = $(this).val(),
			datos = { idCiudad: id };
        consultarAjax(url, datos, ddlComplejoCumple, "Selecciona un complejo", "Error al obtener complejos", false);
    });

    ddlCiudadEscuela.change(function () {
        var url = $(this).attr("data-url"),
			id = $(this).val(),
			datos = { idCiudad: id };
        consultarAjax(url, datos, ddlComplejoEscuela, "Selecciona un complejo", "Error al obtener complejos", false);
    });

    ddlCiudadRenta.change(function () {
        var url = $(this).attr("data-url"),
			id = $(this).val(),
			datos = { idCiudad: id };
        consultarAjax(url, datos, ddlComplejoRenta, "Selecciona un complejo", "Error al obtener complejos", false);
    });

    $("#btnReservaCumple, #btnReservaEscuela, #btnReservaRenta").click(function (e) {
        var type = $(this).attr("data-type");
        var frm = $(this).attr("data-form");
        var url = $(this).attr("data-url");
        var dataValues;
        var chkTerms;
        switch (type) {
            case "cumple":
                chkTerms = $("#chkCumple");
                dataValues = { nombre: $("#txtNombreCumple").val(), correo: $("#txtCorreoCumple").val(), idComplejo: $("#ddlComplejoCumple").val(), fecha: $("#txtFechaCumple").val(), telefono: $("#txtTelefonoCumple").val(), tipo: type, invitados: $("#sj-value-cumple").text() };
                break;
            case "escuela":
                chkTerms = $("#chkEscuela");
                dataValues = { nombre: $("#txtNombreEscuela").val(), correo: $("#txtCorreoEscuela").val(), idComplejo: $("#ddlComplejoEscuela").val(), fecha: $("#txtFechaEscuela").val(), telefono: $("#txtTelefonoEscuela").val(), tipo: type, invitados: $("#sj-value-escuela").text() };
                break;
            case "renta":
                chkTerms = $("#chkRenta");
                dataValues = { nombre: $("#txtNombreRenta").val(), correo: $("#txtCorreoRenta").val(), idComplejo: $("#ddlComplejoRenta").val(), fecha: $("#txtFechaRenta").val(), telefono: $("#txtTelefonoRenta").val(), tipo: type, invitados: $("#sj-value-renta").text() };
                break;
        }

        if (chkTerms.is(":checked")) {
            $.ajax({
                type: 'POST',
                url: url,
                dataType: 'json',
                data: dataValues,
                success: function (response) {
                    console.log(response);
                    var jsonResult = JSON.parse(response);
                    console.log(jsonResult);
                    if (jsonResult.status == "ok") {
                        alertify.alert(jsonResult.message);
                        $("#" + frm).clearForm();
                    }
                    else
                        alertify.alert(jsonResult.message);
                },
                error: function (ex) {
                    console.log(ex);
                }
            });
        }
        else {
            alertify.alert("Es necesario aceptar el aviso de privacidad.");
        }

        e.preventDefault();
    });
});

$.fn.clearForm = function () {
    return this.each(function () {
        var type = this.type, tag = this.tagName.toLowerCase();
        if (tag == 'form')
            return $(':input', this).clearForm();
        if (type == 'text' || type == 'password' || type == 'date' || tag == 'textarea')
            this.value = '';
        else if (type == 'checkbox' || type == 'radio')
            this.checked = false;
        else if (tag == 'select')
            this.selectedIndex = 0;
    });
};

function refreshUniform() {
	$.uniform.update();
}

function consultarAjax(url, datos, control, title, error, esAjaxHorarios) {
	$.ajax({
		type: 'POST',
		url: url,
		dataType: 'json',
		data: datos,
		success: function (items) {
		    control.empty();
		    if (!esAjaxHorarios) {		        
		        control.append("<option value='0'>" + title + "</option>");
		        if (items.length != 0) {
		            $.each(items, function (i, item) {
		                if (control.attr("id") == "ddlPelicula" || control.attr("id") == "ddlCPPelicula")
		                    control.append("<option value='" + item.IdVista + "' data-id='" + item.Id + "' data-key='"+ item.Clave +"'>" + item.Nombre + "</option>");
		                else
		                    control.append("<option value='" + item.Value + "'>" + item.Text + "</option>");
		                refreshUniform();
		            });
		        }
		    }
		    else {
		        $(".sj-bilboard-cinema").html(ddlComplejo.find("option:selected").text());
		        $("h2.sj-bilboard-title").html("<a target='_blank' href='//cinepolis.com/pelicula/" + ddlPelicula.find("option:selected").attr("data-key") + "'>" + ddlPelicula.find("option:selected").text() + "</a>");
		        $("figure.sj-bilboard-movie a").attr("href", "//cinepolis.com/pelicula/" + ddlPelicula.find("option:selected").attr("data-key"));
		        $("figure.sj-bilboard-movie img").css("visibility", "visible").attr("src", "https://static.cinepolis.com/img/peliculas/" + ddlPelicula.find("option:selected").attr("data-id") + "/1/1/" + ddlPelicula.find("option:selected").attr("data-id") + ".jpg");
		        $.each(items, function (i, item) {
		            control.append("<li>" + item + "</li>");
		        });
		    }
		},
		error: function (ex) {
			console.log(ex);
		}
	});
}
