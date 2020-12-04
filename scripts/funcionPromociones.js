$(function(){
    var wAncho = $(window).width();
    $('figure.responsive').picture();
	
	var isMobile = /webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent);
  	var clickOrTouch = isMobile ? "touchstart" : "click";

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

      var start = 0;
      var blHash = false;

      if (window.location.hash)
          try {
              start = parseInt(window.location.hash.substring(1));
              blHash = true;
          } catch (err) { }
   
      $flexslider.bxSlider({
          slideshow: true,
          adaptiveHeight: true,
          pagerCustom: '.sepUl',
          startSlide: start,
          auto: blHash ? false: true,
          nextText: '',
          prevText: '',
          onSliderLoad: function () {
              var current = $flexslider.getCurrentSlide();
              var color = $("a[data-slide-index=" + current + "]").attr("data-color");
              $(".bannerColor").css("background", "none repeat scroll 0 0 " + color);
          },
          onSlideBefore: function () {
              var current = $flexslider.getCurrentSlide();
              var obj = $("a[data-slide-index=" + current + "]");
              var color = obj.attr("data-color");
              var name = obj.attr("data-nombre");

              dataLayer.push({
                  'promo': name,
                  'event': 'impresionpromo'
              });
              $(".bannerColor").css("background", "none repeat scroll 0 0 " + color);
          }
      });
      if(detectmob()) {
        $(".bx-prev").css({opacity:1,left:0});
        $(".bx-next").css({opacity:1,right:0});
      }
    });

	$(".thumb-promo").on("click", function () {
	    dataLayer.push({
	        'promo': $(this).attr("data-nombre"),
	        'event': 'clicthumb'
	    });

	});

	$(".slider-promo").on("click", function () {
	    dataLayer.push({
	        'promo': $(this).attr("data-name"),
	        'event': 'clicbanner'
	    });

	});
});