var sliderSwiper;

$(function(){

	var $mScroll = $('.caption_ct');

	//Menu
	$('.btn-menu').on('click',function(e) {
		e.preventDefault();
		if ($('#menu-principal').hasClass('active')){
			$('.ct-menu').removeClass('in').addClass('out').fadeOut(600);
			setTimeout(function(){
				$('#menu-principal').removeClass('active');
			}, 500);
		}else{
			$('#menu-principal').addClass('active');
			$('.ct-menu').removeClass('out').fadeIn(600).addClass('in');
		}
	});

	//Open new window
	$('.view').click(function (event) {
		event.preventDefault(); 
		var url = $(this).attr("href");
		var win = window.open(url, '_blank');
		win.focus();
	});

	$('#abrir-modal').click(function (event) {
		event.preventDefault();
		$('#cinepolis-modal').fadeIn(function(){
			if ($mScroll.length) {
				$mScroll.perfectScrollbar();
			}
		});
		return false;
	});

	$('#cerrar-modal').click(function (event) {
		event.preventDefault();
		$('#cinepolis-modal').fadeOut();
	});

	var wW = $(window).width();
	if (wW < 760 || detectmob()) {
		$('.swiper-button-prev').fadeOut();
		$('.swiper-button-next').fadeOut();
	}else{
		$('.swiper-button-prev').fadeIn();
		$('.swiper-button-next').fadeIn();
	}

	//Init Page
	createSlider();

});

function createSlider() {
	if (location.pathname.indexOf("/promociones") != -1 || location.pathname.indexOf("/ganadores") != -1) {
		makeImagesResponsive();
	}

	$('.swiper-container').fadeIn();

	sliderSwiper = new Swiper('.swiper-container', {
		effect: 'fade',
		fadeEffect: {
			crossFade: true
		},
		watchOverflow: true,
		spaceBetween: 0,
		preloadImages: true,
		updateOnImagesReady: true,
		autoHeight: true,
		pagination: {
			el: '.swiper-pagination',
			type: 'bullets',
			clickable: true
		},
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev'
		}
	});

	$(window).smartresize(function(){
		if (location.pathname.indexOf("/promociones") != -1 || location.pathname.indexOf("/ganadores") != -1) {
			makeImagesResponsive();
			setTimeout(function(){
				sliderSwiper.update();
			},100);
		}
	});
}

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