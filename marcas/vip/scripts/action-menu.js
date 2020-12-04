
function setExperiencia() {
	if ($('#vp-menu').length) {
		$('html').removeAttr('style').addClass('vp--is-loading');
		$('.modal-loading').addClass('modal-loading--white');
		$('-0')
		siteData();
		initExperiencia();
	}
}

function initExperiencia() {
}

function loader(){
	$('.modal-loading').delay(1600).fadeOut(function (){
		$('html').removeClass('vp--is-loading').addClass('vp--is-ready');
		initExperiencia();
	});
}

function siteData(index, data) {

    var url = "/marcas/vip/Data/data-vip-" + clavePais.replace("Cinepolis", "") + ".json";

	$.ajax({
        url: url,
		method: "GET",
		dataType: 'json',
		success: function(result){
			var $cData = $(result);

			menuData()

			$('#vp-menu').imagesLoaded( { background: true }, function() {
				loader();
			});

			function menuData() {
				$('.vp-menu-tt').html($cData[0].menuTitle);
				$('.vp-menu-txt').html($cData[0].menuInfo);

				$countMenu = 0;
				$.each($cData[0].products, function (index, value) {
					$("#vp-menu-elements").append(
						'<div class="vp-menu-el vp-menu-el--'+value.orientation+' '+value.selector+'">' +
							'<figure class="vp-menu-el-img">'+
								'<img src="'+value.imgSrc+'" alt="'+value.name+'" />'+
								'<div class="vp-gradient-circle">'+
									'<svg viewBox="-10 -10 220 220"> <g fill="none" stroke-width="6" transform="translate(100,100)"> <path d="M 0,-100 A 100,100 0 0,1 86.6,-50" stroke="url(#cl1)"/> <path d="M 86.6,-50 A 100,100 0 0,1 86.6,50" stroke="url(#cl2)"/> <path d="M 86.6,50 A 100,100 0 0,1 0,100" stroke="url(#cl3)"/> <path d="M 0,100 A 100,100 0 0,1 -86.6,50" stroke="url(#cl4)"/> <path d="M -86.6,50 A 100,100 0 0,1 -86.6,-50" stroke="url(#cl5)"/> <path d="M -86.6,-50 A 100,100 0 0,1 0,-100" stroke="url(#cl6)"/> </g> </svg> <svg viewBox="-10 -10 220 220"> <path d="M200,100 C200,44.771525 155.228475,0 100,0 C44.771525,0 0,44.771525 0,100 C0,155.228475 44.771525,200 100,200 C155.228475,200 200,155.228475 200,100 Z" stroke-dashoffset="629"></path> </svg>' +
								'</div>' +
							'</figure>' +
							'<div class="vp-menu-el-info">'+
								'<h2 class="vp-tt">'+value.boldTt+'<smal class="vp-tt--ligth">'+value.lightTt+'</smal></h2>' +
							'</div>' +
							'<!--  Defining Angle Gradient Colors  --><svg width="0" height="0" class="gradient-path"> <defs> <linearGradient id="cl1" gradientUnits="objectBoundingBox" x1="0" y1="0" x2="1" y2="1"> <stop stop-color="#fdcb50"/> <stop offset="100%" stop-color="#fdcb50"/> </linearGradient> <linearGradient id="cl2" gradientUnits="objectBoundingBox" x1="0" y1="0" x2="0" y2="1"> <stop stop-color="#fdcb50"/> <stop offset="100%" stop-color="#fdcb50"/> </linearGradient> <linearGradient id="cl3" gradientUnits="objectBoundingBox" x1="1" y1="0" x2="0" y2="1"> <stop stop-color="#fdcb50"/> <stop offset="100%" stop-color="#f7887c"/> </linearGradient> <linearGradient id="cl4" gradientUnits="objectBoundingBox" x1="1" y1="1" x2="0" y2="0"> <stop stop-color="#f7887c"/> <stop offset="100%" stop-color="#f7887c"/> </linearGradient> <linearGradient id="cl5" gradientUnits="objectBoundingBox" x1="0" y1="1" x2="0" y2="0"> <stop stop-color="#f7887c"/> <stop offset="100%" stop-color="#f7887c"/> </linearGradient> <linearGradient id="cl6" gradientUnits="objectBoundingBox" x1="0" y1="1" x2="1" y2="0"> <stop stop-color="#f7887c"/> <stop offset="100%" stop-color="#fdcb50"/> </linearGradient> </defs> </svg>' +
						'</div>');
					$countMenu++;
				});
			}

		 },
		error:function() {
			console.log('Something is wrong');
		}
	});
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

$(function(){
	setExperiencia()
});

// $(document).ready(function(){

// });
