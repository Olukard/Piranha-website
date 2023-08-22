$(document).ready(function () {

	console.log('все готово!');

	var modal = $('.modal'),
	modalBtn = $('[data-toggle=modal]'),
	closeBtn = $('.modal__close'),

	modalSuccess = $('.success'),
	closeBtnSuccess = $('.success__close');

	modalBtn.on('click', function () {
		modal.toggleClass('modal--visible');
	});

	closeBtn.on('click', function () {
		modal.toggleClass('modal--visible');
	});

	closeBtnSuccess.on('click', function() {
		modalSuccess.toggleClass('success--visible');
	});
		
// закрытие модального окна нажатием на кнопку Esc
	$(document).keydown(function (e) {
		if (e.code == 'Escape') {
			modal.removeClass('modal--visible');
		};
	});
// закрытие модального окна при нажатие на любое место вне его
	$(document).on('click', function (e) {
		if (modal.is(e.target)) {
			modal.removeClass('modal--visible');
		};
	});

	// закрытие модального окна нажатием на кнопку Esc
	$(document).keydown(function (e) {
		if (e.code == 'Escape') {
			modalSuccess.removeClass('success--visible');
		};
	});
// закрытие модального окна при нажатие на любое место вне его
	$(document).on('click', function (e) {
		if (modalSuccess.is(e.target)) {
			modalSuccess.removeClass('success--visible');
		};
	});

//Слайдер!

	let mySwiper = new Swiper('.swiper-container', {
		 // Default parameters
		spaceBetween: 100,
		slidePerView: 1,
		slidePerGroup: 1,
		normalizeSlideIndex: 1,
		// Optional parameters
		// loop: true,
		speed: 1000,	
        // loop: true,	
        autoplay: {
        delay: 5000,
				// disableOnInteraction: false,
      },
		// If we need pagination
		pagination: {
			el: '.swiper-pagination',
			clickable: 'true',
		},
	});

//Валидация формы!
	const validForm = (selector) => {
		$(selector).validate({
			errorClass: "form__invalid",
			errorElement: "div",
			rules: {
				// simple rule, converted to {required:true}
				userName: {
					required: true,
					minlength: 2,
					maxlength: 15
				},
				userPhone: {
					required: true,
					minlength: 17, //c учетом пробелов, скобочек и дефисов
				},
				userQuestion: "required",
				policyCheckbox: {
					required: true
				},
				// compound rule
				userEmail: {
					required: true,
					email: true
				}
			},
			messages: {
				userName: {
					required: "Имя обязательно",
					minlength: jQuery.validator.format("Имя не короче {0} букв!"),
					maxlength: jQuery.validator.format("Имя не длиннее {0} букв!"),
				},
				userPhone: "Телефон обязателен",
				userQuestion: "Задайте свой вопрос",
				policyCheckbox: "Отметьте, чтобы продолжить",
				userEmail: {
					required: "Обязательно укажите email",
					email: "Введите в формате: name@domain.com"
				}
			},
			submitHandler: function(selector) {
				$.ajax({
					type: "POST",
					url: "send.php",
					data: $(selector).serialize(),
					success: function (response) {
						console.log('Ajax сработал! Ответ сервера:' + response);
						$(selector)[0].reset();
						modal.removeClass('modal--visible');
						modalSuccess.toggleClass('success--visible');
					},
					error: function(response) {
						console.error('Ajax НЕ сработал! Ответ сервера: ' + response);
					}        
				});
			}
		});
	}
	validForm('#modal-form');	

//Маска для телефона
	$('[type=tel]').mask('+7(000) 000-00-00', {
		placeholder: "+7(xxx) xxx-xx-xx"
	});

//Плавная прокрутка
	$(function(){
		$("a[href^='#']").click(function(){
						var _href = $(this).attr("href");
						$("html, body").animate({scrollTop: $(_href).offset().top + -80 + "px"});
						return false;
		});	
	});

//Создание яндекс карт!	
	var YaMapsShown = false;

	$(window).scroll(function() {
		if (!YaMapsShown){
			if($(window).scrollTop() + $(window).height() > $(document).height() - 1400) {
					var script   = document.createElement("script");
					script.src   = "https://api-maps.yandex.ru/2.1-dev/?apikey=057df9fb-aaa6-46cb-8eb2-f64b1c607492&lang=ru_RU";
					$("body").after(script);
//НАЧАЛО ПЕРВОЙ КАРТЫ
				setTimeout(function(){
					ymaps.ready(function () {		
						var myMap = new ymaps.Map('map', {
							center: [55.76, 37.64],
							zoom: 10
					}, {
							searchControlProvider: 'yandex#search'
					}),
					objectManager = new ymaps.ObjectManager({
							// Чтобы метки начали кластеризоваться, выставляем опцию.
							clusterize: true,
							// ObjectManager принимает те же опции, что и кластеризатор.
							gridSize: 32,
							clusterDisableClickZoom: true
					});
	
			// Чтобы задать опции одиночным объектам и кластерам,
			// обратимся к дочерним коллекциям ObjectManager.
			objectManager.objects.options.set('preset', 'islands#greenDotIcon');
			objectManager.clusters.options.set('preset', 'islands#greenClusterIcons');
			myMap.geoObjects.add(objectManager);
	
			$.ajax({
					url: "data.json"
			}).done(function(data) {
					objectManager.add(data);
			});
					});
				}, 1000);
//КОНЕЦ ПЕРВОЙ КАРТЫ
				YaMapsShown = true;
			}
		}
	});
	
	// $(window).scroll(function() {
	// 	if (!YaMapsShown){
	// 		if($(window).scrollTop() + $(window).height() > $(document).height() - 1400) {
	// 				var script   = document.createElement("script");
	// 				script.src   = "https://api-maps.yandex.ru/2.1-dev/?apikey=0ad61110-60c9-437a-a48b-de0e00cb64de&lang=ru_RU";
	// 				$("body").after(script);
	// 			//карты
				
	// 			YaMapsShown = true;
	// 		}
	// 	}
	// });

	$('.header__burger').click(function(event){
		$('.header__burger, .header__menu').toggleClass('active');	
		$('body').toggleClass('lock');
		$('.header__link, .header__logo-link').click(function(event){
			$('.header__burger, .header__menu').removeClass('active');
			$('body').removeClass('lock');
		});
	});

});
