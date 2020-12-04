
function setExperiencia() {
	if ($('#experiencia').length) {
		$('html').removeAttr('style').addClass('vp--is-loading');
		siteData();
	}
}

function initExperiencia() {
	info();
	hashur();
}

function loader(){
	$('.modal-loading').delay(1600).fadeOut(function (){
		$('html').removeClass('vp--is-loading').addClass('vp--is-ready');
		initExperiencia();
	});
}

function siteData(index, data) {
    var url = "/marcas/vip/Data/data-vip-" + clavePais.replace("Cinepolis", "")+".json";
	$.ajax({
		url: url,
		method: "GET",
		dataType: 'json',
		success: function(result){
			var $cData = $(result);

			experienciasData()

			$('#experiencia').imagesLoaded( { background: true }, function() {
				loader();
			});

			function experienciasData() {
				$countSections = 0;
				$.each($cData[0].experienciaSections, function (index, value) {
					$("#experiencia").append(
						'<section class="'+ value.titleClass +'" id="'+ value.titleID +'">' +
							'<div class="vp-info">'+
								'<a href="" class="vp-ttip-link">'+ value.titleTtip +'</a>'+
								'<div class="vp-tt-info-area">'+
									'<div class="vp-tt-info">' +
											'<span class="vp-tt-info-close icon-remove"></span>' +
											'<h2 class="vp-ttt">'+ value.descTT +'</h2>' +
											'<p class="vp-txt">'+ value.descTxt +'</p>' +
										'</div>' +
									'</div>' +
								'</div>'+

							'<figure class="vp-img-responsive" data-src-base="'+ value.imgSrc + '" data-src="<896:'+ value.imgMov+',>896:'+ value.imgDsk+'" class="vp-img-responsive"></figure>' +
							'<div class="vp-nav">' +
								'<a href="'+ value.nextLink+'" class="vp-btn-next"><span class="icon-arrow-down"></span><p class="vp-txt">'+ value.nextTitle +'</p></a>' +
							'</div>' +
						'</section>');
					$countSections++;
				});

				makeImagesResponsive();

				$(window).smartresize(function() {
					makeImagesResponsive();
				});
			}

		 },
		error:function() {
			console.log('Something is wrong');
		}
	});
}

function info() {
	function showInfo() {
		$('.vp-ttip-link').on('click', function(e){
			e.preventDefault();
			$(this).parent().toggleClass('vp-tt-info--is-open');
			$(this).toggleClass('vp-ttip-link--is-open');
		})
	}

	function hideInfo() {
		$('.vp-tt-info-close').on('click', function() {
			var $parent = $(this).parent().parent().parent();

			$parent.toggleClass('vp-tt-info--is-open');
			$parent.find('.vp-ttip-link').toggleClass('vp-ttip-link--is-open');
		});
	}

	showInfo();
	hideInfo();
}

function makeImagesResponsive(){
	var viewport = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
	var images = $('.vp-img-responsive');

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
					image.setAttribute("style", "background-image: url("+new_source+");");
				}
				break;
			}
		}
	}
}

var $navSpacer = 0;

function hashur() {
	$('.vp-btn-next').click(function (e) {
		e.preventDefault();

		var $wW = $(window).width();

		if ($wW >= 760) {
			$navSpacer = 122;
		}

		$('html, body').animate({
			scrollTop: $($(this).attr('href')).offset().top - $navSpacer+'px'
		}, 500);

		console.log($navSpacer);
		return false;
	});
}

$(function(){
	setExperiencia()
});

$(window).smartresize(function(){
	hashur();
});
