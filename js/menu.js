"use strict";
(function () {

	var menu = document.querySelector(".navbar");
	var banner = document.querySelector("#introducao");
	var footer = document.querySelector("footer");

	var btnSairMenu = document.querySelector("#btn-sair-menu");
	var btnMenu = document.querySelector("#btn-menu");

	btnMenu.addEventListener("click", function(e){
		e.preventDefault();
		menu.classList.add("navbar--active");
	});

	btnSairMenu.addEventListener("click",function (e) {
		e.preventDefault();
		menu.classList.remove("navbar--active");
	});

	document.addEventListener("click", function(e){
		if(!e.target.classList.contains('btn-menu')){
			menu.classList.remove("navbar--active");
		}
	});

	var links = Array.prototype.slice.call(document.querySelectorAll(".menu-itens li a"));
	links.forEach(function(link){
		link.addEventListener("click",function () {
			desmarcaTodos(menuItens);
			this.classList.toggle("active");
		});
	});

	var menuItens =	links.reduce(function (menuItens, link) {
		menuItens[link.getAttribute("href").substr(1)] = link;
		return menuItens;
	}, {});

	var sections = Array.prototype.map.call(document.querySelectorAll("section"), function(section, index){
		return {
			element: section
			,top: function(){
				return section.getBoundingClientRect().top + window.scrollY - (menu.getBoundingClientRect().height)
			}
			,bottom: function(){
				return section.getBoundingClientRect().top + window.scrollY + section.offsetHeight - (menu.getBoundingClientRect().height)
			}
		}
	});

	window.onscroll = _throttle(function markCurrentSection(){
		var $currentSection = sections.reduce(function($currentSection, section){
			if($currentSection){
				return $currentSection
			}
			if(scrollY >= section.top() && scrollY <= section.bottom()){
				return section.element
			}
		}, null)

		desmarcaTodos(menuItens)
		if($currentSection){
			menuItens[$currentSection.getAttribute('id')].classList.add("active");
		}
	}, 300)

	function desmarcaTodos(itens) {
		for(var prop in itens) {
			itens[prop].classList.remove("active");
		}
	}

	function _debounce(fn, timeinmilis){
		var intervaloSyncEdicao;
		return function(){
			clearInterval(intervaloSyncEdicao);
			intervaloSyncEdicao = setTimeout(function(){
				fn.apply(this, arguments);
			}, timeinmilis);
		}
	}

	function _throttle(fn, timeWindow){
		var that;
		var args;
		var lastTime = new Date().getTime() - timeWindow;
		var newTime;
		var triggger = function(){
			lastTime = newTime;
			fn.apply(that, args);
		}
		var shouldTrigger = function(time){
			return (lastTime + timeWindow) < time;
		}
		var triggerIfLastTime = _debounce(triggger,timeWindow);
		return function(){
			that = this;
			args = arguments;
			newTime = new Date().getTime();
			triggerIfLastTime();
			if(shouldTrigger(newTime)){
				lastTime = newTime;
				fn.apply(this, arguments);
			}
		}
	}
})();
