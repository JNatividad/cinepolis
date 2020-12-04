// Variables
var $mobBtn = $('.sj-btn-mobile'),
	$nav = ('.sj-nav'),
	$navLink = $('.sj-btn-menu'),
	$navList = $('.sj-nav-list'),
	$navCont = $('.sj-nav-container'),
	$navFilter = $('.sj-btn-tkts-filter'),
	$navStage = $('.sj-btn-evento-stage'),
	$navLat = $('.sj-btn-nav'),
	$shFilters = $('.sj-tkts-filters'),
	$mozMask = $('.sj-moz-mask'),
	$mozObjt = $('.sj-moz-object'),
	$listItem = $('.sj-tabs-link'),
	$stage = $('.sj-stage'),
	$stgFirst = $('.sj-evento-mob-stage--first'),
	$stgLast = $('.sj-evento-mob-stage--last'),
	$showLegals = $('.sj-evento-disc-link-mob'),
	$wWidth = $(window).width();


$(function(){
	// Mobile functions
		$mobBtn.on('click', function(e) {
			e.preventDefault();
			menuBar();
		});
		ripplyScott.init('sj-ripple-btn', 0.75);

		// if is mobile
		$navLink.on('click', function(e) {
			if ($('.sj-nav').hasClass('sj-nav-is-mobile')) {
				menuBar();
				$('html,body').scrollTo(this.hash, this.hash);
			}
		});

		// if is iPad
		$navLink.on('click', function(e) {
			if ($('.sj-nav').hasClass('sj-nav-is-tablet')) {
				$('html,body').scrollTo(this.hash, this.hash);
			}
		});
		$navLat.on('click', function(e) {
			if ($('.sj-nav').hasClass('sj-nav-is-tablet')) {
				$('html,body').scrollTo(this.hash, this.hash);
			}
		});

		// Filters
		$navFilter.on('click', function(e) {
			e.preventDefault();
			filters();
		});

		// Change stages
		changeStages();

		$('#ddlFecha').on('change', function() {
			if ($('#ddlFecha').val() != 0) {
				filters();
			}
			else {
				filters();
			}
		});

		$showLegals.on('click', function(e){
			showRegals();
			e.preventDefault();
		});

	// Desktop Animations
		explorer();
		addAnim();
		desktopWidth();

		// $(document).scrollsnap({
		// 	direction: 'x',
		// 	snaps: '.sj-page',
		// 	proximity: 800
		// });

	// General functions
		// Increase Values
		// increaseValue();
		addValueSchool();
		addValueCumple();

		// Custom Scroll Events
		$('.sj-scroll-ov-flow').perfectScrollbar({
			suppressScrollX: true
		});

		// Drop Downs
		$("select").uniform();

		// Tabs
		tabs();

		// if is Desktop
		$navLink.on('click', function(e) {
			if ($('.sj-nav').hasClass('sj-nav-is-desktop')) {
				$('html,body').scrollTo(this.hash, this.hash);
			}
		});
		$navLat.on('click', function(e) {
			if ($('.sj-nav').hasClass('sj-nav-is-desktop')) {
				$('html,body').scrollTo(this.hash, this.hash);
			}
		});
});

	// Slider
	var $sjSlider = $('.sj-slides').bxSlider({
		auto: true,
		nextSelector: '#slide-next',
		prevSelector: '#slide-prev',
		nextText: '',
		prevText: '',
	});

	var player;

	function onYouTubeIframeAPIReady() {
		player = new YT.Player('player', {
		    videoId: $(".sj-slides-video").attr("data-video-id"),
			playerVars: {
				rel: '0',
				iv_load_policy: 3,
				showinfo: '0',
				controls: '0',
				wmode: "transparent",
				modestbranding: 1,
			},
			events: {
				'onStateChange': onPlayerStateChange
			}
		});
		$('.sj-slides-video').on('click', function () {
			var url = $(this).attr('data-video-id');
			player.cueVideoById(url);
			player.playVideo();
			$('.bx-controls-direction').addClass('bx-controls-direction--is-playing');
			$('.sj-slider-video').fadeIn();
			$sjSlider.stopAuto();
		});
	}

	function onPlayerStateChange(event) {
		if(event.data === 0) {
			$('.sj-slider-video').fadeOut();
			$('.bx-controls-direction').removeClass('bx-controls-direction--is-playing');
			$sjSlider.startAuto();
		}
	}

	$('.sj-slider-video-close, .sj-btn-menu, .sj-btn-nav').on('click', function(){
		stopVideoFrame();
	});


	$("html").niceScroll({
		cursorwidth:"30px",
		autohidemode: false,
		cursorcolor: "#d4d71e",
		cursorborder: "none",
		cursorborderradius: "0",
		zindex: "99999"
	}).scrollend(function(info){
		stopVideoFrame();
	});
	$.jInvertScroll(['.sj-scroll'],{
		height: 'auto'
	});

	$('.sj-main').on('scroll', _.debounce(function() {
		stopVideoFrame();
	}, 100));

	function stopVideoFrame() {
		$('.sj-slider-video').fadeOut();
		$('.bx-controls-direction').removeClass('bx-controls-direction--is-playing');
		player.pauseVideo();
		$sjSlider.startAuto();
	}

// Validating viewports
$(window).setBreakpoints({
	distinct: true,
	breakpoints: [
		320,
		1024,
		1040
	]
});
$(window).bind('enterBreakpoint320',function() {
	$('.sj-nav').addClass('sj-nav-is-mobile');
	$('.sj-nav').removeClass('sj-nav-is-tablet, sj-nav-is-desktop');
});
$(window).bind('enterBreakpoint1024',function() {
	$('.sj-nav').removeClass('sj-nav-is-mobile, sj-nav-is-desktop');
	$('.sj-nav').addClass('sj-nav-is-tablet');
});
$(window).bind('enterBreakpoint1040',function() {
	$('.sj-nav').removeClass('sj-nav-is-mobile, sj-nav-is-tablet');
	$('.sj-nav').addClass('sj-nav-is-desktop');
});

$(window).smartresize(function(){
	riseWidth();
	desktopWidth();
});

function desktopWidth() {
	var $wWidth = $(window).width();

	if ($wWidth < 1040) {
		$stage.removeClass('sj-stage-desktop').removeAttr('style');
	} else {
		$stage.addClass('sj-stage-desktop');
		riseWidth();
	}
}
function changeStages() {
	$navStage.on('click', function(e){
		e.preventDefault();
		$stgFirst.addClass('sj-evento-mob-stage--first--left');
		$stgLast.addClass('sj-evento-mob-stage--last--right');
	})
}
function filters() {
	$('body').toggleClass('sj-is-filtering');
	$navFilter.toggleClass('sj-btn-tkts-filter--active')
	$shFilters.toggleClass('sj-tkts-filters--visible');
}
function menuBar() {
	$mobBtn.toggleClass('sj-btn-mobile--active');
	$navList.toggleClass('sj-nav-list--open');
	$navCont.toggleClass('sj-nav-container--open');
}
function riseWidth(){
	var $wWidth = $(window).width(),
		$totalWidth = $wWidth * 5
	$('.sj-stage-desktop').css({width: $totalWidth});
	$('.sj-page-desktop').css({width: $wWidth});
}
function tabs() {
	var currentClass;
	$listItem.on('click', function(e) {
		e.preventDefault();
		$(this).parent().addClass("sj-tabs-item--current");
		$(this).parent().siblings().removeClass("sj-tabs-item--current");
		var tab = $(this).attr("href"),
				mod = $(this).data('tab'),
				containerClass = 'sj-tabs-box--' + mod;

		// $(tab).siblings().css("display", "none");
		// $(tab).parent().removeClass(currentClass).addClass(containerClass);
		// $(tab).fadeIn();

		$(tab).siblings().removeClass('active-tab');
		$(tab).parent().removeClass(currentClass).addClass(containerClass);
		$(tab).addClass('active-tab');

		currentClass = containerClass;
		$('.sj-scroll-ov-flow').perfectScrollbar('update');
	});
}

function addAnim() {
	var $item = $('.sj-logo'),
		$listItem = $('.sj-list-item')

	$item.addClass('sj-logo--bounce')
	setTimeout(function(){$listItem.addClass('sj-list-item--bounce')}, 500);
}

// function increaseValue() {
// 	$('.sj-evento-numbers').on('click', function(e) {
// 		e.preventDefault();
// 		var $button = $(this);
// 		var oldValue = $('.sj-evento-value').val();

// 		if ($button.hasClass('sj-icon-arrow-up')) {
// 			var newVal = parseFloat(oldValue) + 1;
// 		} else {
// 			if (oldValue > 10) {
// 				var newVal = parseFloat(oldValue) - 1;
// 			} else {
// 				newVal = 10;
// 			}
// 		}

// 		if (newVal > 50) newVal = 50;
// 		$('.sj-evento-value').val(newVal);
// 	});
// }

function disable(target){
	target.addClass('disabled');
}

function enable(target) {
	target.removeClass('disabled');
}

function showRegals() {
	$('.sj-evento-disc--small--mob').toggleClass('sj-evento-disc--small--mob--active');
	$('.sj-evento-disc-link-mob').toggleClass('sj-evento-disc-link-mob--active');
}

function addValueCumple(){
	$('.guest-cumple').on('click', function(e) {
		e.preventDefault();
		var $button = $(this);
		var initialValue = $('#sj-value-cumple').html();

		if ($button.hasClass('sj-icon-arrow-up')) {
			if (initialValue >= 10 && initialValue < 40){
				initialValue++;
				var actualValue = initialValue ;
				$('#sj-value-cumple').html(actualValue);

			}
		} else {
			if (initialValue > 10 && initialValue <= 40){
				initialValue--;
				var actualValue = initialValue;
				$('#sj-value-cumple').html(actualValue);
			}
		}


	if (initialValue == 10) {
		disable($('.sj-icon-arrow-dn.guest-cumple'));
	} else {
		enable($('.sj-icon-arrow-dn.guest-cumple'));
	}

	if (initialValue == 40) {
		disable($('.sj-icon-arrow-up.guest-cumple'));
		  } else {
		enable($('.sj-icon-arrow-up.guest-cumple'));
	}
});
}

function addValueSchool(){
	$('.guest-school').on('click', function(e) {
		e.preventDefault();
		var $button = $(this);
		var initialValue = $('#sj-value-escuela').html();

		if ($button.hasClass('sj-icon-arrow-up')) {
			if (initialValue >= 15 && initialValue < 40){
				initialValue++;
				var actualValue = initialValue ;
				$('#sj-value-escuela').html(actualValue);
			}
		} else {
			if (initialValue > 15 && initialValue <= 40){
				initialValue--;
				var actualValue = initialValue;
				$('#sj-value-escuela').html(actualValue);
			}
		}
	if (initialValue == 15) {
	disable($('.sj-icon-arrow-dn.guest-school'));
	  } else {
	enable($('.sj-icon-arrow-dn.guest-school'));
	  }

	if (initialValue == 40) {
		disable($('.sj-icon-arrow-up.guest-school'));
		  } else {
		enable($('.sj-icon-arrow-up.guest-school'));
		  }
	});
}

function explorer() {
	if (/MSIE 9/i.test(navigator.userAgent)) {
		$('.sj-main').addClass('sj-main--ie9');
	}
	if (/MSIE 10/i.test(navigator.userAgent)) {
		$('.sj-main').addClass('sj-main--ie10');
	}
	if (/rv:11.0/i.test(navigator.userAgent)) {
		$('.sj-main').addClass('sj-main--ie11');
	}
	if (/Edge\/\d./i.test(navigator.userAgent)){
		$('.sj-main').addClass('sj-main--edge');
	}
}