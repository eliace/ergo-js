


$(document).ready(function(){

	growl = {
		
		// container: $.ergo({
			// etype: 'growl-panel',
			// renderTo: 'body',
			// timeout: 10000,
			// autoHeight: 'ignore'
		// }),
		
		
		/**
		 * добавляем гроул в контейнер
		 * 
		 * msg [string] текст сообщения
		 * title [string] заголовок
		 * icon [string] класс иконки
		 */
		_add: function(msg, title, icon, timeout) {
			
			var g = $.ergo({
				etype: 'growl-dialog',
				title: title,//'Ошибка',
				message: msg,//'Неправильно введен логин или пароль',
				icon: icon//'growl-error-big'
			});
			
			g.open();
			
			
			// growl.container.addGrowl({
				// icon: icon,
				// message: Ergo.pretty_print(msg),
				// title: title,
				// timeout: timeout
			// }, 0);
		},
		
		
		success: function(msg, title, timeout) {
			this._add(msg, title || 'Завершено', 'e-growl-icon-success', timeout);
		},
	
		warn: function(msg, title, timeout) {
			this._add(msg, title || 'Предупреждение', 'e-growl-icon-warn', timeout);
		},
		
		info: function(msg, title, timeout) {
			this._add(msg, title || 'Сообщение', 'e-growl-icon-info', timeout);
		},
		
		error: function(msg, title, timeout) {
			this._add(msg, title || 'Ошибка', 'e-growl-icon-error', timeout);
		}
		
	};
	
	
});
