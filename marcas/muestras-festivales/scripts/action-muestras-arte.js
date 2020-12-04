;$(function(){
	var wAncho = $(window).width();
	var clickOrTouch = (('ontouchend' in window)) ? 'touchclick' : 'click';

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
          prevText: '',
          onSliderLoad: function(){
              $flexslider.find('.flex-active-slide, .clone').each(function(){
                initItem(this);
              });
              
          },
          onSlideNext: function(){
              $slides.each(function(){
                initItem(this);
              });
          }
      });
    });

  if(!detectmob()) {
    var s = skrollr.init({forceHeight: false});
  }else{
    $('.bgTop > div').css({position:"relative",top:0});
  }

  if($('#videoSinopsis').length){
    videojs("videoSinopsis", {"height":"auto", "width":"auto"}).ready(function(){
      var myPlayer = this;    
      var aspectRatio = 5/12; 

      function resizeVideoJS(){
        var width = document.getElementById(myPlayer.id()).parentElement.offsetWidth;
        myPlayer.width(width).height( width * aspectRatio );
      }

      resizeVideoJS(); 
      window.onresize = resizeVideoJS;
    });
  }

  $('ul.navOpciones').each(function(){
    var $active, $content, $links = $(this).find('a');
    $active = $($links.filter('[href="'+location.hash+'"]')[0] || $links[0]);
    $active.parent().addClass('active');
    $content = $($active.attr('href'));
    $links.not($active).each(function () {
      $($(this).attr('href')).hide();
    });

    $(this).find('a').click(function(e){
      $active.parent().removeClass('active');
      $content.hide().removeClass('active');
      $active = $(this);
      $content = $($(this).attr('href'));
      $active.parent().addClass('active');
      $content.fadeIn(400).addClass('active');
      e.preventDefault();
    });
  });
	
});

$(window).load(function () {
  var wAncho = $(window).width();
  if( $('.responsive').length ){
    $('.responsive').imagefill({runOnce:true});
  }
  
});
$(window).resize(function() {
  var wAncho = $(window).width();
  if( $('.responsive').length ){
    $('.responsive').imagefill({runOnce:true});
  }
});