

/**
 *
 * Каркас должен предоставлять следующие возможности:
 * 
 * 	- Включать гроулы (альтернатива стандартным алертам)
 * 	- Перехватывать ошибки ajax-запросов
 * 	- Обрабатывать события изменения размера окна
 * 
 *  
 */



Ergo.declare('Ergo.plugins.Application', 'Ergo.widgets.Box', {
	
	defaults: {
		mixins: [Ergo.Statable],
		renderTo: 'body',
		autoHeight: true
	},
	
	initialize: function(o) {
		this.$super(o);
		
		
		// var app = $.ergo(Ergo.smart_override({
			// renderTo: 'body',
			// autoHeight: true,
			// etype: 'box'
		// }, o));
		
		
		// Перехватываем ошибки ajax-запросов и выводим их в консоль и в гроулы
		$(document).ajaxError(function(e, xhr){
			if(console) console.log(xhr);
			if(console) growl.error(xhr.statusText);
		});
		
		
		// // Инициализируем приложение
		// var app = new Ergo.widgets.Box({
			// renderTo: 'body',
			// autoHeight: true
		// });
		
		var body_el = $('body');
		
		
		// Добавляем обработчик события onresize для объекта window
		$(window).resize(function(){
			
			var dh = body_el.outerHeight(true) - body_el.height();
			body_el.height($(window).height() - dh);
			
			app.$layoutChanged();		
			
		});
		
		var dh = body_el.outerHeight(true) - body_el.height();
		body_el.height($(window).height() - dh);
		
		
		this.$layoutChanged();				
	}
	
	
});
