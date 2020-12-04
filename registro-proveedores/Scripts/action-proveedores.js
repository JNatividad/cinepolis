
$(function () {

    //funcion de siguiente del formulario
    $("#siguiente-contacto").on("click", function () {
        $(".datos-contacto").css("display", "block");
        $(".info-empresa").css("display", "none");
        return false;
    });
    $("#siguiente-info").on("click", function () {
        $(".datos-contacto").css("display", "none");
        $(".adicional").css("display", "block");
        return false;
    });
    var wAncho = $(window).width();

    /* Centro de ayuda */
    $('dt').click(function () {
        var dd = $(this).next();
        $("dd").not(dd).hide();
        $("dt").not(this).removeClass('opened');
        if (!dd.is(':animated')) {
            dd.slideToggle(300);
            $(this).toggleClass('opened');
        }

    });

    $('a.button').click(function () {

        if ($(this).hasClass('collapse')) {
            $('dt.opened').click();
        }
        else $('dt:not(.opened)').click();

        $(this).toggleClass('expand collapse');

        return false;
    });


    if (typeof pagina != 'undefined') {
        $(".navOpciones li").removeClass("active");
        $("." + pagina).addClass("active");
    }

});

$(window).resize(function () {
    var wAncho = $(window).width();
    if ($('.item').length) {
        $('.item').imagefill({ runOnce: true });
    }
});

$(window).load(function () {
    var wAncho = $(window).width();
    if ($('.item').length) {
        $('.item').imagefill({ runOnce: true });
    }

});

            function DropDown(el) {
            this.dd = el;
            this.placeholder = this.dd.children('span');
            this.opts = this.dd.find('ul.dropdown > li');
            this.val = '';
            this.index = -1;
            this.initEvents();
        }
        DropDown.prototype = {
            initEvents: function () {
                var obj = this;

                obj.dd.on('click', function (event) {
                    $(this).toggleClass('active');
                    return false;
                });

                obj.opts.on('click', function () {
                    var opt = $(this);
                    obj.val = opt.text();
                    obj.index = opt.index();
                    obj.placeholder.text(obj.val);
                });
            },
            getValue: function () {
                return this.val;
            },
            getIndex: function () {
                return this.index;
            }
        }
        $(function () {

    var dd = new DropDown($('#dd'));

    $(document).click(function () {
        // all dropdowns
        $('.wrapper-dropdown-3').removeClass('active');
    });

})
$(function () {
    var pestanaLincs = $(".pestana-lics"),
        pestanaFaq = $(".pestana-faq");


    pestanaLincs.on('click',function () {
        pestanaLincs.find('i').toggleClass('icon-angle-down icon-angle-up');

        if ($("#preguntas").hasClass("toogleSlide")) {
            $(".preguntas").slideToggle("slow");
            $("#preguntas").removeClass("toogleSlide");
            pestanaFaq.find('i').toggleClass('icon-angle-down icon-angle-up');
        }
        $(".licitaciones").slideToggle("slow").addClass("toogleSlide");
    });

    pestanaFaq.on('click',function () {
        pestanaFaq.find('i').toggleClass('icon-angle-down icon-angle-up');
        if ($("#licitaciones").hasClass("toogleSlide")) {
            $(".licitaciones").slideToggle("slow");
            $("#licitaciones").removeClass("toogleSlide");
            pestanaLincs.find('i').toggleClass('icon-angle-down icon-angle-up');
        }
        $(".preguntas").slideToggle("slow").addClass("toogleSlide");
    });
});

$(function () {
    $(".invoice").click(function () {
        $("#modal-factura").fadeIn("slow", function () {
            // Animation complete.
        });
    });

    $(".close").click(function () {
        $("#modal-factura").fadeOut("slow", function () {
            // Animation complete.
        });
    });
    $(".registrat").click(function () {
        $("#modal-registro").fadeIn("slow", function () {
            // Animation complete.
        });
    });

    $(".close").click(function () {
        $("#modal-registro").fadeOut("slow", function () {
            // Animation complete.
        });
    });
});