const $ = jQuery;
const JSCCommon = {
	// часть вызов скриптов здесь, для использования при AJAX
	btnToggleMenuMobile: [].slice.call(document.querySelectorAll(".toggle-menu-mobile--js")),
	menuMobile: document.querySelector(".menu-mobile--js"),
	menuMobileLink: [].slice.call(document.querySelectorAll(".menu-mobile--js ul li a")),
	body: document.querySelector("body"),

	modalCall() {
		$(".link-modal").fancybox({
			arrows: false,
			infobar: false,
			touch: false,
			type: 'inline',
			autoFocus: false,
			i18n: {
				en: {
					CLOSE: "Закрыть",
					NEXT: "Вперед",
					PREV: "Назад",
					// PLAY_START: "Start slideshow",
					// PLAY_STOP: "Pause slideshow",
					// FULL_SCREEN: "Full screen",
					// THUMBS: "Thumbnails",
					// DOWNLOAD: "Download",
					// SHARE: "Share",
					// ZOOM: "Zoom"
				},
			},
		});
		$(".modal-close-js").click(function () {
			$.fancybox.close();
		})
		$.fancybox.defaults.backFocus = false;
	},
	// /magnificPopupCall
	toggleMenu() {
		let _this = this;
		if (_this.btnToggleMenuMobile) {

			_this.btnToggleMenuMobile.forEach(function (element) {
				element.addEventListener('click', function () {

					_this.btnToggleMenuMobile.forEach(function (element) {
						element.classList.toggle("on");
					});
					_this.menuMobile.classList.toggle("active");
					_this.body.classList.toggle("fixed");

					return false;
				});
			});
		}
	},

	closeMenu() {
		let _this = this;
		if (_this.menuMobile) {

			_this.btnToggleMenuMobile.forEach(function (element) {
				element.classList.remove("on");

			});
			_this.menuMobile.classList.remove("active");
			_this.body.classList.remove("fixed");
		}

	},

	mobileMenu() {
		// закрыть/открыть мобильное меню
		let _this = this;
		if (_this.menuMobileLink) {

			_this.toggleMenu();
			// _this.menuMobileLink.forEach(function (element) {
			// 	element.addEventListener('click', function (e) {
			// 		console.log(element);
			// 		_this.closeMenu();

			// 	});
			// })
			document.addEventListener('mouseup', function (event) {
				let container = event.target.closest(".menu-mobile--js.active"); // (1)
				if (!container) {
					_this.closeMenu();

				}
			});
		}
	},
	// /mobileMenu

	// табы  . 
	tabscostume(tab) {
		$('.' + tab + '__caption').on('click', '.' + tab + '__btn:not(.active)', function (e) {
			$(this)
				.addClass('active').siblings().removeClass('active')
				.closest('.' + tab).find('.' + tab + '__content').hide().removeClass('active')
				.eq($(this).index()).show().addClass('active');

		});
	},
	// /табы  
	inputMask() {
		// mask for input
		$('input[type="tel"]').attr("pattern", "[+][0-9]{1}[(][0-9]{3}[)][0-9]{3}-[0-9]{2}-[0-9]{2}").inputmask("+9(999)999-99-99");
	}
	// /inputMask

};

function eventHandler() { 
	JSCCommon.modalCall();

	JSCCommon.tabscostume('tabs');

	JSCCommon.mobileMenu();

	JSCCommon.inputMask();

	// JSCCommon.CustomInputFile();
	// добавляет подложку для pixel perfect
	// $(".main-wrapper").after('<div class="pixel-perfect" style="background-image: url(screen/frame2.jpg);"></div>')
	// /добавляет подложку для pixel perfect


 

	// /закрыть/открыть мобильное меню

	function heightses() {
 
		// скрывает моб меню

		const topH = document.querySelector('header').scrollHeight * .6;
		let stickyElement = document.querySelector('.top-nav')
	 
		window.onscroll = () => {
			if ($(window).scrollTop() > topH) {

				stickyElement.classList.add('fixed');
			} else {
				stickyElement.classList.remove('fixed'); 
			}
		};
		// конец добавил
		if (window.matchMedia("(min-width: 992px)").matches) {
			JSCCommon.closeMenu();
		}
	}

	window.addEventListener('resize', () => {
		heightses();

	});

	heightses();

	// листалка по стр
	$(" .top-nav li a, .scroll-link").click(function () {
		const elementClick = $(this).attr("href");
		const destination = $(elementClick).offset().top;

		$('html, body').animate({ scrollTop: destination }, 1100);

		return false;
	});

	let defaultSl = {

	}
	const swiper4 = new Swiper('.color-slider', {
		// slidesPerView: 5,
		...defaultSl,
		slidesPerView: 'auto',
		watchOverflow: true,
		spaceBetween: 0,
		freeMode: true,
		watchOverflow: true,
		slidesPerGroup: 3,

		// centeredSlides: true,
		loop: true,
		loopFillGroupWithBlank: true,
		touchRatio: 0.2,
		slideToClickedSlide: true,
		freeModeMomentum: true,
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		},

	});
	// modal window
 
	//luckyoneJS
	$('.block-header-js').click(function () {
		$(this).toggleClass('active');

		$(this.parentElement).find('.block-content-js').slideToggle(function () {
			$(this).toggleClass('active');
		});

	});

	//timer
	function tikTak(parentQselector){
		//html elements
		let parent = document.querySelector(parentQselector);
		if (!parent) return

		let days = parent.querySelector('.days');
		let hours = parent.querySelector('.hours');
		let minutes = parent.querySelector('.minutes');
		let seconds = parent.querySelector('.seconds');

		//date elements
		let now = new Date();

		// d === days.innerHtml + now.getDate... others the same way
		let d = getTime(days, now.getDate());
		let h = getTime(hours, now.getHours());
		let m = getTime(minutes, now.getMinutes());
		let s = getTime(seconds, now.getSeconds());

		let targetDate = new Date(now.getFullYear(), now.getMonth(), d, h, m, s);

		//interval
		tikTakReadOut(parent, targetDate, ThisReadOutID, days, hours, minutes, seconds);
		let ThisReadOutID = window.setInterval(tikTakReadOut.bind(null,parent, targetDate, ThisReadOutID, days, hours, minutes, seconds), 1000);
	}
	tikTak('.timer-box-js');
	//additional funcs to tikTak

	function tikTakReadOut(parent,targetDate, ReadOutID, days, hours, minutes, seconds){
		let now = new Date();
		let timeLeft = (targetDate - now) / 1000;

		if (timeLeft < 1) {
			window.clearInterval(ReadOutID);
			//to do something after timer ends
			$(parent).fadeOut();
		}

		days.innerHTML = Math.floor(timeLeft / 60 / 60 / 24);
		timeLeft = ((timeLeft / 60 / 60 / 24) - Math.floor(timeLeft / 60 / 60 / 24)) * 60 * 60 * 24;

		hours.innerHTML = Math.floor(timeLeft / 60 / 60);
		timeLeft = ((timeLeft / 60 / 60) - Math.floor(timeLeft / 60 / 60)) * 60 * 60;

		minutes.innerHTML = Math.floor((timeLeft / 60));
		timeLeft = ((timeLeft / 60) - Math.floor((timeLeft / 60))) * 60;

		seconds.innerHTML = Math.floor(timeLeft);
	}

	function getTime(htmlEl, currentTimeItem) {
		let timeItem = Number(htmlEl.innerHTML);
		if (timeItem) {
			timeItem += currentTimeItem;
		}
		else {
			timeItem = currentTimeItem;
		}
		return timeItem
	}
	//footer date
	function footerDate(){
		let footerDate = document.querySelector('.set-footer-date-js');
		footerDate.innerHTML = '2008—' + new Date().getFullYear() + ' © издательство Info-DVD.Ru'
	}

	footerDate();

	//
	let studentsSlider = new Swiper('.students-slider-js', {
		slidesPerView: 1,
		loop: true,
		autoHeight: true,
		//nav
		navigation: {
			nextEl: '.master-slider-next',
			prevEl: '.master-slider-prev',
		},

		//pugin
		pagination: {
			el: $(this).find('.master-sl-pugin'),
			clickable: true,
		},
		//lazy
		lazy: {
			loadPrevNext: true,
			//loadPrevNextAmount: 2,
		},
	});
	//footer ancor
	function smoothScroll(qSelector){
		let elements = document.querySelectorAll(qSelector);
		if (elements.length === 0) return

		for (let elem of elements){
			elem.addEventListener('click', function () {
				event.preventDefault();

				let destinyID = this.getAttribute('href'); //this.attributes.href.nodeValue
				let destinyElem = document.querySelector(destinyID);
				if (!destinyElem) return

				let destinyTop = getCoords(destinyElem).top;

				window.scrollTo({
					top: destinyTop,
					behavior: "smooth"
				});

			});
		}
	}
	smoothScroll('.ancor-js');
	function getCoords(elem) { // crossbrowser version
		var box = elem.getBoundingClientRect();

		var body = document.body;
		var docEl = document.documentElement;

		var scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop;
		var scrollLeft = window.pageXOffset || docEl.scrollLeft || body.scrollLeft;

		var clientTop = docEl.clientTop || body.clientTop || 0;
		var clientLeft = docEl.clientLeft || body.clientLeft || 0;

		var top  = box.top +  scrollTop - clientTop;
		var left = box.left + scrollLeft - clientLeft;

		return { top: Math.round(top), left: Math.round(left) };
	}

	//end luckyoneJS
	var isIE11 = !!window.MSInputMethodContext && !!document.documentMode;
	if (isIE11) {
		$("body").prepend(`<p   class="browsehappy container">К сожалению, вы используете устаревший браузер. Пожалуйста, <a href="http://browsehappy.com/" target="_blank">обновите ваш браузер</a>, чтобы улучшить производительность, качество отображаемого материала и повысить безопасность.</p>`)

	}

	// First we get the viewport height and we multiple it by 1% to get a value for a vh unit
	let vh = window.innerHeight * 0.01;
	// Then we set the value in the --vh custom property to the root of the document
	document.documentElement.style.setProperty('--vh', `${vh}px`);

	// We listen to the resize event
	window.addEventListener('resize', () => {
		// We execute the same script as before
		let vh = window.innerHeight * 0.01;
		document.documentElement.style.setProperty('--vh', `${vh}px`);
	}, {passive : true});
};
if (document.readyState !== 'loading') {
	eventHandler();
} else {
	document.addEventListener('DOMContentLoaded', eventHandler);
}

