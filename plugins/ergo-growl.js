

/**
 * 
 * TODO
 * 
 * Добавляет глобальный объект growl для замены alert
 * 
 * 
 * 
 */



// инициализируем гроулы


$(document).ready(function(){

	growl = {
		
		container: $.ergo({
			etype: 'growl-panel',
			renderTo: 'body',
			timeout: 10000,
			autoHeight: 'ignore'
		}),
		
		
		/**
		 * добавляем гроул в контейнер
		 * 
		 * msg [string] текст сообщения
		 * title [string] заголовок
		 * icon [string] класс иконки
		 */
		_add: function(msg, title, icon) {
			growl.container.addGrowl({
				icon: icon,
				message: Ergo.pretty_print(msg),
				title: title
			}, 0);
		},
		
		
		success: function(msg, title) {
			this._add(msg, title || 'Завершено', 'e-growl-icon-success');
		},
	
		warn: function(msg, title) {
			this._add(msg, title || 'Предупреждение', 'e-growl-icon-warn');
		},
		
		info: function(msg, title) {
			this._add(msg, title || 'Сообщение', 'e-growl-icon-info');
		},
		
		error: function(msg, title) {
			this._add(msg, title || 'Ошибка', 'e-growl-icon-error');
		}
		
	};
	
	
});


