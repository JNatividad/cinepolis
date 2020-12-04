$(function(){
	var wAncho = $(window).width();
	
});

$(window).resize(function() {
	if( $('.item').length ){
        $('.item').imagefill({runOnce:true});
     }
});

$(window).load(function () {
      if( $('.item').length ){
        $('.item').imagefill({runOnce:true});
      }
 });
