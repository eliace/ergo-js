


/**
 * Список
 * 
 * Обертка для тега <ul/>
 * 
 * @class
 * @name Ergo.widgets.List
 * @extends Ergo.core.Widget
 */
Ergo.declare('Ergo.widgets.List', 'Ergo.core.Widget', /** @lends Ergo.widgets.List.prototype */{
	
	defaults: {
		html: '<ul/>',
		defaultItem: {
			etype: 'text',
			html: '<li/>'
//			binding: function(v) { this.opt('text', v) }
		}
	}
	
}, 'list');
