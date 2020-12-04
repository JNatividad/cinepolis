
$(function(){
	var wAncho = $(window).width();

	$('.video-js').on('click', function(){
		$(this).addClass('reprod');	
	});


	$(".eventos li").hover( function(){ 
		$(this).find("img").animate({ opacity: 0.75 }, "fast"); 
	}, function(){ 
		$(this).find("img").animate({ opacity: 1.0 }, "slow"); 
	}); 
	
	var $portfolioClone = $(".eventos").clone();
	
	$(".filter a").click(function(e){
		$(".filter li").removeClass("current");	
		var $filterClass = $(this).parent().attr("class");
		if ( $filterClass == "all" ) {
			var $filteredPortfolio = $portfolioClone.find("li");
		} else {
			var $filteredPortfolio = $portfolioClone.find("li[data-type~=" + $filterClass + "]");
		}

		$(".eventos").quicksand( $filteredPortfolio, { 
			duration: 800, 
			easing: 'easeInOutQuad' 
		}, function(){
			$(".eventos li").hover( function(){ 
				$(this).find("img").animate({ opacity: 0.75 }, "fast"); 
			}, function(){ 
				$(this).find("img").animate({ opacity: 1.0 }, "slow"); 
			}); 
		});
		$(this).parent().addClass("current");
		e.preventDefault();

		$(".contAlternativos article .mensaje").remove();
		if ($filteredPortfolio.length <= 0)
		    $(".contAlternativos article").append("<h2 class='mensaje' style='text-align:center'>Por el momento no tenemos contenido de esta categoría.</h2>");
	})

	$("#gallery").click(function(e){
		e.preventDefault();
		$.swipebox([
			{href:'imagenes/img-arte01.jpg', title:"Título"}, 
			{href:'imagenes/img-arte02.jpg', title:'Título 2'}
		]);
	});

	if ($(".listaEventos li").length <= 0) {
	    $(".contAlternativos article").append("<h2 class='mensaje' style='text-align:center'>Por el momento no tenemos contenido de esta categoría.</h2>");
	}


	var imgEventosResponsive = $('figure.evento-img');
	if (imgEventosResponsive.length) {
		imgEventosResponsive.imgResponsive();
	}
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

