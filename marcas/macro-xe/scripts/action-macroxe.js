$(function(){
    var wAncho = $(window).width();
    
    if(!detectmob()) {
      
    }else{
      $('.seccionesExperiencia section .tableCell > div').css({position:"relative"});
    }
    var animacion = $.fn.fullpage({
        anchors: ['inicio', 'pantalla', 'sonido', 'realismo', '3d', 'beneficios', 'ubicacion', 'cartelera'],
        menu: '#navigation',
        autoScrolling: false,
        paddingTop: '122px',
        paddingBottom: '0px',
        afterLoad: function(anchorLink, index){
          startSlide(anchorLink, index);
        },
        onLeave: function(index, direction){
          endSlide(index);
        }
    });

    $(".btnSigSec").click(function(e){
      animacion.moveSlideDown();
    });

    if($(".parrallax").length){
      $(".parrallax").parallax();
    }

    startSlide("",1);

    $('.slides').imagesLoaded( function() {
      var $flexslider = $('.slides'),
          $slides = $flexslider.find('li'),
          stripComment = function(string) {
            return string.replace(/<!--/g, '').replace(/-->/g, '');
          },
          initItem = function(item) {
            var $this = $(item);
            if(!$this.hasClass('init')) {
                $this.html(stripComment($this.html())).addClass('init');
            }
          };
   
       $flexslider.bxSlider({
          slideshow: true,
          auto: true,
          nextText: '',
          infiniteLoop: false,
          hideControlOnEnd: true,
          prevText: ''
      });
       if(detectmob()) {
          $(".bx-prev").css({opacity:1,left:0});
          $(".bx-next").css({opacity:1,right:0});
        }
    });

    animacionBocinaRightBig();
    animacionBocinaRightSmall();
    animacionBocinaRightBottom();
    animacionBocinaLeftBig();
    animacionBocinaLeftSmall();
    animacionBocinaLeftBottom();

    $(".lnk-macro").click(function (e) {
        $.cookie('experiencia', "XE", { expires: 1, path: '/' });
        window.location = $(this).attr("href");
        e.preventDefault();
    });
});

$(window).load(function () {
  var wAncho = $(window).width();
  if( $('.item').length ){
    $('.item').imagefill({runOnce:true});
  }
  if(detectmob()) {
    $('.seccionesExperiencia section .tableCell > div').css({position:"relative"});
  }
});

$(window).resize(function() {
  var wAncho = $(window).width();
  /*if( $('.item').length ){
    $('.item').imagefill({runOnce:true});
  }*/
});

function startSlide(anchorLink, index){
  switch(index){
    case 1:
      $("#section1 h3").stop().delay(100).animate({ opacity: 1, top: "5%" }, 500, "swing");
      $("#section1 .logoXE").stop().delay(50).animate({ opacity: 1, top: "5%" }, 800, "swing");
      $("#section1 .imgClientes").stop().delay(100).animate({ opacity: 1, bottom:"10%" }, 800);
      $(".seccionXE nav ul li a").removeAttr('style');
    break;
    case 2:
      $("#section2 h2").stop().delay(100).animate({ opacity: 1, top: "5%" }, 800, "easeOutCubic");
      $("#section2 .txtContent").stop().delay(80).animate({ opacity: 1 , top: "26%"}, 500);
      $("#section2 .bganimar").stop().delay(50).animate({ opacity: 1, top: 0 }, 800);
      $(".seccionXE nav ul li a").removeAttr('style');
    break;
    case 3:
      $(".seccionXE nav ul li a").removeAttr('style');
      $("#section3 .imgClientes").stop().delay(50).animate({ opacity: 1, bottom:"10%" }, 800);
    break;
    case 4:
      $(".seccionXE nav ul li a").delay(50).css({border: "3px solid #838b98"});
      $("#section4 .item").stop().delay(50).animate({ opacity: 1, top: 0 }, 800);
    break;
    case 5:
      $(".seccionXE nav ul li a").removeAttr('style');
      $("#section5 .palomitas").stop().delay(80).animate({ top: '50%' }, 800);
      $("#section5 .palomitas2").stop().delay(50).animate({ top: '30%' }, 800);
    break;
    case 7:
      $(".seccionXE nav ul li a").show();
    break;
    case 8:
      $(".seccionXE nav ul li a").hide();
    break;

  }
}

function endSlide(index, direction){
  switch(index){
    case 1:
      $("#section1 .imgClientes").animate({ opacity: 0,bottom: "-20%" }, 300);
      $("#section1 h3").stop().animate({ opacity: 0, top: "50%" }, 300, "swing");
      $("#section1 .logoXE").stop().animate({ opacity: 0, top: "-5%" }, 300);
    break;
    case 2:
      $("#section2 .bganimar").animate({ opacity: 0, top: "-50%" }, 300);
      $("#section2 h2").stop().animate({ opacity: 0, top: "80%" }, 300, "easeOutCubic");
      $("#section2 .txtContent").stop().animate({ opacity: 0 , top: "60%"}, 300);
    break;
    case 3:
      $("#section3 .imgClientes").animate({ opacity: 0,bottom:"-20%" }, 300);
    break;
    case 4:
      $("#section4 .item").stop().delay(50).animate({ opacity: 0, top: "-20%" }, 800);
    break;
    case 5:
      $("#section5 .palomitas").stop().animate({ top: '-50%' }, 800);
      $("#section5 .palomitas2").stop().animate({ top: '80%' }, 800);
    break;
    case 7:
      $(".seccionXE nav ul li a").show();
    break;
  }
}


var animacionBocinaRightBig = function(){
    $('#bocinaRightBig').animate(
        { right: '73px', top: '39px', width: '56px' }, //VALORES DEL ELEMENTO A ANIMAR
        500, //DURACIÓN DEL EVENTO Y ACELERACIÓN
        function(){
        $(this).animate(
            { right: '75px', top: '42px', width: '49px' }, //VALORES DEL ELEMENTO A ANIMAR
            500, //DURACIÓN DEL EVENTO Y ACELERACIÓN
            function () {
                setTimeout(animacionBocinaRightBig, 500);
            }
        );
    });
};

var animacionBocinaRightSmall = function(){
    $('#bocinaRightSmall').animate(
        { right: '80px', top: '-6px', width: '37px' }, //VALORES DEL ELEMENTO A ANIMAR
        500, //DURACIÓN DEL EVENTO Y ACELERACIÓN
        function(){
        $(this).animate(
            { right: '84px', top: '-5px', width: '33px' }, //VALORES DEL ELEMENTO A ANIMAR
            500, //DURACIÓN DEL EVENTO Y ACELERACIÓN
            function () {
                setTimeout(animacionBocinaRightSmall, 1200);
            }
        );
    });
};

var animacionBocinaRightBottom = function(){
    $('#bocinaRightBottom').animate(
        { right: '77px', top: '136px', width: '52px' }, //VALORES DEL ELEMENTO A ANIMAR
        500, //DURACIÓN DEL EVENTO Y ACELERACIÓN
        function(){
        $(this).animate(
            { right: '76px', top: '138px', width: '48px' }, //VALORES DEL ELEMENTO A ANIMAR
            500, //DURACIÓN DEL EVENTO Y ACELERACIÓN
            function () {
                setTimeout(animacionBocinaRightBottom, 700);
            }
        );
    });
};

var animacionBocinaLeftBig = function(){
    $('#bocinaLeftBig').animate(
        { left: '51px', top: '39px', width: '56px' }, //VALORES DEL ELEMENTO A ANIMAR
        500, //DURACIÓN DEL EVENTO Y ACELERACIÓN
        function(){
        $(this).animate(
            { left: '54px', top: '42px', width: '49px' }, //VALORES DEL ELEMENTO A ANIMAR
            500, //DURACIÓN DEL EVENTO Y ACELERACIÓN
            function () {
                setTimeout(animacionBocinaLeftBig, 500);
            }
        );
    });
};

var animacionBocinaLeftSmall = function(){
    $('#bocinaLeftSmall').animate(
        { left: '61px', top: '-6px', width: '37px' }, //VALORES DEL ELEMENTO A ANIMAR
        500, //DURACIÓN DEL EVENTO Y ACELERACIÓN
        function(){
        $(this).animate(
            { left: '63px', top: '-5px', width: '33px' }, //VALORES DEL ELEMENTO A ANIMAR
            500, //DURACIÓN DEL EVENTO Y ACELERACIÓN
            function () {
                setTimeout(animacionBocinaLeftSmall, 1200);
            }
        );
    });
};

var animacionBocinaLeftBottom = function(){
    $('#bocinaLeftBottom').animate(
        { left: '53px', top: '136px', width: '52px' }, //VALORES DEL ELEMENTO A ANIMAR
        500, //DURACIÓN DEL EVENTO Y ACELERACIÓN
        function(){
        $(this).animate(
            { left: '55px', top: '138px', width: '48px' }, //VALORES DEL ELEMENTO A ANIMAR
            500, //DURACIÓN DEL EVENTO Y ACELERACIÓN
            function () {
                setTimeout(animacionBocinaLeftBottom, 700);
            }
        );
    });
};

