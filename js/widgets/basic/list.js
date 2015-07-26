

/**
 * Список
 * 
 * :list
 * \s [~]:html:li
 *  
 * 
 * @class
 * @name Ergo.widgets.List
 * @extends Ergo.core.Widget
 */
Ergo.defineClass('Ergo.widgets.List', 'Ergo.widgets.Box', /** @lends Ergo.widgets.List.prototype */{
	
	defaults: {
		html: '<ul/>',
		baseCls: 'list',
		dynamic: true,
		defaultItem: {
			html: '<li/>',
//			etype: 'html:li',
			binding: 'text'
		},
		defaultComponent: {
			html: '<li/>'
//			etype: 'html:li'			
		}
	}
	
}, 'widgets:list');



Ergo.defineClass('Ergo.widgets.OrderedList', 'Ergo.widgets.List', {
	
	defaults: {
		html: '<ol/>'
	}
	
}, 'widgets:o-list');
