function validaSoloLetras(e) {
    if ((e.keyCode < 65 || e.keyCode > 90) && e.keyCode != 8 && e.keyCode != 32 && e.keyCode != 37 && e.keyCode != 38 && e.keyCode != 39 && e.keyCode != 40 && e.keyCode != 0 && e.keyCode != 46 && e.keyCode != 9 && e.keyCode != 13)
        return false
};

function validaSoloNumeros(e) {
    var ctrlKey = 17;
    if ((e.keyCode == ctrlKey) || (e.keyCode == 86)) {
        return true;
    } else
        if (!((e.keyCode == 8) || (e.keyCode == 9) || (e.keyCode == 13) || (e.keyCode == 46) || (e.keyCode >= 35 && e.keyCode <= 40) || (e.keyCode >= 48 && e.keyCode <= 57) || (e.keyCode >= 96 && e.keyCode <= 105))) {
            e.preventDefault();
        }
};
