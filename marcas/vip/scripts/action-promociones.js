
$(function(){
	var wAncho = $(window).width();
	makeImagesResponsive();
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
				prevText: ''
		});
	});

	if(!detectmob()) {
		var s = skrollr.init({forceHeight: false});
	}else{
		$('.slidePromociones').css({position:"relative",top:0});
		$('.vip .navegacionVip').css({position:"absolute"});
	}

	if ($('.slideWrapperPromo').length) {
		$('.navegacionVip').hide();
	}
});

function makeImagesResponsive(){
	var viewport = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
	var images = $('.img-responsive');

	if( images.length === 0 ){
		return;
	}

	var hasAttr;
	if(!images[0].hasAttribute){ //IE <=7 fix
		hasAttr = function(el, attrName){ //IE does not support Object.Prototype
			return el.getAttribute(attrName) !== null;
		};
	} else {
		hasAttr = function(el, attrName){
			return el.hasAttribute(attrName);
		};
	}

	var retina = window.devicePixelRatio ? window.devicePixelRatio >= 1.2 ? 1 : 0 : 0;

	for (var i = 0; i < images.length; i++) {
		var image = images[i];
		var srcAttr = ( retina && hasAttr(image, 'data-src2x') ) ? 'data-src2x' : 'data-src';
		var baseAttr = ( retina && hasAttr(image, 'data-src-base2x') ) ? 'data-src-base2x' : 'data-src-base';

		if( !hasAttr(image, srcAttr) ){
			continue;
		}

		var basePath = hasAttr(image, baseAttr) ? image.getAttribute(baseAttr) : '';
		var queries = image.getAttribute(srcAttr);
		var queries_array = queries.split(',');

		for(var j = 0; j < queries_array.length; j++){
			var query = queries_array[j].replace(':','||').split('||');
			var condition = query[0];
			var response = query[1];
			var conditionpx;
			var bool;

			if(condition.indexOf('<') !== -1){
				conditionpx = condition.split('<');
				if(queries_array[(j -1)]){
					var prev_query = queries_array[(j - 1)].split(/:(.+)/);
					var prev_cond = prev_query[0].split('<');
					bool =  (viewport <= conditionpx[1] && viewport > prev_cond[1]);
				} else {
					bool =  (viewport <= conditionpx[1]);
				}
			} else {
				conditionpx = condition.split('>');
				if(queries_array[(j +1)]){
					var next_query = queries_array[(j +1)].split(/:(.+)/);
					var next_cond = next_query[0].split('>');
					bool = (viewport >= conditionpx[1] && viewport < next_cond[1]);
				} else {
					bool = (viewport >= conditionpx[1]);
				}
			}

			if(bool){
				var isCrossDomain = response.indexOf('//') !== -1 ? 1 : 0;
				var new_source;

				if(isCrossDomain === 1){
					new_source = response;
				} else {
					new_source = basePath + response;
				}

				if(image.src !== new_source){
					image.setAttribute('src', new_source);
				}
				break;
			}
		}
	}
}

$(window).load(function () {
	var wAncho = $(window).width();
});

$(window).resize(function() {
	var wAncho = $(window).width();
});

$(window).smartresize(function() {
	makeImagesResponsive();
});

