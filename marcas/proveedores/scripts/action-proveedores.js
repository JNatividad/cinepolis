
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

    //if (!detectmob()) {
    //    var s = skrollr.init({ forceHeight: false });
    //    skrollr.menu.init(s, {
    //        animate: true,
    //        easing: 'sqrt',
    //        duration: function (currentTop, targetTop) {
    //            return 500;
    //        }
    //    });
    //} else {
    //    $(".bgTopMin > div").css({ position: "absolute", top: 0 });
    //    $(".bgTop > div").css({ position: "absolute", top: 0 });
    //}

    /* Centro de ayuda */
    $('dt').click(function(){
      var dd = $(this).next();
      $("dd").not(dd).hide();
      $("dt").not(this).removeClass('opened');
      if(!dd.is(':animated')){
        dd.slideToggle(300);
        $(this).toggleClass('opened');
      }
        
    });
    
    $('a.button').click(function(){
      
      if($(this).hasClass('collapse')){
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

//pestañas
$(function () {
    $(".pestana-lics").click(function (e) {
        if ($("#preguntas").hasClass("toogleSlide")) {
            $(".preguntas").slideToggle("slow");
            $("#preguntas").removeClass("toogleSlide");
        }

        if ($("#licitaciones").hasClass("toogleSlide")) {
            $("#licitaciones").removeClass("toogleSlide");
            $(".licitaciones").slideToggle("slow");
        }

        else {
            $(".licitaciones").slideToggle("slow");
            $(".licitaciones").addClass("toogleSlide");
        }
        if ($(".pestana-faq").find('i').hasClass('icon-arrow-up')) {
            $(".pestana-faq").find('i').addClass('icon-arrow-down');
            $(".pestana-faq").find('i').removeClass('icon-arrow-up');
        }
        var $this = $(this);
        $this.find('i').toggleClass('icon-arrow-down icon-arrow-up');
        e.preventDefault();
    });
    $(".pestana-faq").click(function (e) {
        if ($("#licitaciones").hasClass("toogleSlide")) {
            $(".licitaciones").slideToggle("slow");
            $("#licitaciones").removeClass("toogleSlide");
        }
        if ($("#preguntas").hasClass("toogleSlide")) {
            $("#preguntas").removeClass("toogleSlide");
            $(".preguntas").slideToggle("slow");
        }
        else {
            $(".preguntas").slideToggle("slow");
            $(".preguntas").addClass("toogleSlide");
        }
        if ($(".pestana-lics").find('i').hasClass('icon-arrow-up')) {
            $(".pestana-lics").find('i').addClass('icon-arrow-down');
            $(".pestana-lics").find('i').removeClass('icon-arrow-up');
        }
        var $this = $(this);
        $this.find('i').toggleClass('icon-arrow-down icon-arrow-up');
        e.preventDefault();
    });
});

$(function () {
    $(".invoice").click(function () {
        $("#modal-factura").fadeIn("slow", function () {
            $("#nav-spacer").css("display","none");
            // Animation complete.
        });
    });

    $(".close").click(function () {
        $("#modal-factura").fadeOut("slow", function () {
            $("#nav-spacer").css("display","block");
            // Animation complete.
        });
    });
    $(".registrat").click(function () {
        $("#modal-registro").fadeIn("slow", function () {
            $("#nav-spacer").css("display","none");
            // Animation complete.
        });
    });

    $(".close").click(function () {
        $("#modal-registro").fadeOut("slow", function () {
            $("#nav-spacer").css("display","block");
            // Animation complete.
        });
    });
});