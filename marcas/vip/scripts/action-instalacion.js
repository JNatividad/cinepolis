var Slider = function($flexslider) {
  $flexslider.bxSlider({
    slideshow: true,
    auto: false,
    nextText: "",
    prevText: "",
    infiniteLoop: false
  });
};

$(function() {
  var wAncho = $(window).width();
  var $isGallery = $('.gallery');
  var $navegacion = $('.navegacion')[1];

  imgActions();

  $(".slides").imagesLoaded(function() {
    var $flexslider = $(".slides"),
      	$slides = $flexslider.find("li"),
				stripComment = function(string) {
					return string.replace(/<!--/g, "").replace(/-->/g, "");
				},
				initItem = function(item) {
					var $this = $(item);
					if (!$this.hasClass("init")) {
						$this.html(stripComment($this.html())).addClass("init");
					}
				};

    Slider($flexslider);
  });
  $(".SALA, .BAR, .MENU").click(function(e) {
    var primero = $(".slides")
      .find("." + $(this).attr("class") + ":first")
      .index();
    $(".bx-pager-link[data-slide-index=" + primero + "]").trigger("click");
    e.preventDefault();
  });
});

function imgActions() {
	$('figure.responsive').picture();

  if ($(".item").length) {
		$(".item").imagefill({ runOnce: true });
	}
}

$(window).smartresize(function(){
	imgActions();
});

