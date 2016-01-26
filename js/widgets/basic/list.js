

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
		tag: 'ul',
		cls: 'list',
		dynamic: true,
		defaultItem: {
			tag: 'li',
//			etype: 'html:li',
			binding: 'text'
		},
		defaultComponent: {
			tag: 'li'
//			etype: 'html:li'
		}
	}

}, 'widgets:list');



Ergo.defineClass('Ergo.widgets.OrderedList', 'Ergo.widgets.List', {

	defaults: {
		tag: 'ol'
	}

}, 'widgets:o-list');
