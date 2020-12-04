$(function(){
	$('.ck-w-comp-carousel').lightSlider({
		autoWidth:true,
		item:5,
		loop:true,
		pager: false,
		slideMove:2,
		slideMargin:16,
		responsive: [
			{
				breakpoint: 414,
				settings: {
					item: 2,
					slideMove: 1
				}
			}
		]
	});
});
