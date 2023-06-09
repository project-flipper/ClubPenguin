if (typeof Disney === 'undefined') {
	Disney = {};
}

if (!Disney.CP) {
	Disney.CP = {};
}

(function ($) {
	Disney.CP.Rules = function () {
		this.currentIndex = 0;
		this.modal = new Disney.CP.Modal({
			showClose: true,
			contentCloseDelegate: '.modal-close',
			onOpenComplete: function () { },
			onCloseComplete: function () { },
			onCloseStart: function () { },
			onOpenStart: function () { }
		});
	};


	Disney.CP.Rules.prototype.showRules = function (lang) {
		var self = this;
		var lang = document.documentElement.lang.toLowerCase().substr(0, 2);
		if (lang == 'en') {
			lang = '';
		} else {
			lang = '.' + lang;
		}
		$('#modal-content').load('rules-overlay' + lang + '.html #rules-wrap', function () {
			//open modal
			self.modal.open('', function () {
				self.initRules();
			}, function () {
				clearInterval(self.rulesInterval);
			});
		});
	};

	Disney.CP.Rules.prototype.setTimer = function (currentIndex) {
		var self = this;
		self.rulesInterval = setInterval(function () {
			self.currentIndex = (self.currentIndex + 1) % $("#rules ul li").length;
			self.showRule(self.currentIndex);
		}, 5000);
	};

	Disney.CP.Rules.prototype.initRules = function () {
		var self = this;
		if ($("#rules").length > 0) {
			$("#rules ul li").mouseover(function () {
				self.currentIndex = $("#rules ul li").index(this);
				self.showRule(self.currentIndex);
			});

			$("#rules ul li").mouseenter(function () {
				clearInterval(self.rulesInterval);
			}).mouseleave(function () {
				self.currentIndex = $("#rules ul li").index(this);
				self.setTimer(self.currentIndex);
			});
			self.setTimer(0);
		}
	};

	Disney.CP.Rules.prototype.showRule = function (index) {
		$("#rules ul li").removeClass("active");
		$($("#rules ul li")[index]).addClass("active");

		$("#rules-container").html($($("#rules ul li")[index]).html());
	};

})(window.jQuery);

window.jQuery(document).ready(function (e) {
	Disney.CP.rules = new Disney.CP.Rules();
});
