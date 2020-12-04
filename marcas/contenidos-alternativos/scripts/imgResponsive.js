/*global window*/
/*global jQuery*/
;(function(window, document, $, undefined) {

	var ImgResponsive = {
		init: function(elem) {
			var _this = this;

			_this.elem = elem;
			_this.$elem = $(elem);
			_this.$document = $(document);

			_this.pickImg();
			$(window).resize(function() { _this.resize(); });
		},

		pickImg: function() {
			var imgSizes = this.$elem.data(),
				documentWidth = this.$document.width() + 10,
				img, dataWidths = [];


			for (var key in imgSizes) {
				if (imgSizes.hasOwnProperty(key)) {
					var dataWidth = key.replace('media', '') !== '' ? window.parseInt(key.replace('media', ''), 10) : 0;

					dataWidths.push(dataWidth);
				}
			}

			dataWidths.sort();

			dataWidths.forEach(function(val) {
				if (documentWidth >= val && val !== 0) {
					img = imgSizes['media'+val];
				} else if (val === 0) {
					img = imgSizes.media;
				}
			});

			this.$elem.find('img').attr('src', img);
		},

		resize: function() {
			var _this = this,
				resizeId = 0;

			window.clearTimeout(resizeId);
			resizeId = window.setTimeout(function() {
				_this.pickImg();
			}, 100);
		},
	};

	$.fn.imgResponsive = function() {
		return this.each(function() {
			var imgResponsive = Object.create(ImgResponsive);
			imgResponsive.init(this);
		});
	};

})(window, window.document, jQuery);