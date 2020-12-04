$(function(){
    var wAncho = $(window).width();
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
    
