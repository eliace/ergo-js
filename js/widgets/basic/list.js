

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
Ergo.defineClass('Ergo.widgets.List', /** @lends Ergo.widgets.List.prototype */{

	extends: 'Ergo.core.Widget',

	defaults: {
		tag: 'ul',
		cls: 'list',
		dynamic: true,
		defaultItem: {
			tag: 'li',
//			etype: 'html:li',
			binding: 'prop:text'
		},
		defaultComponent: {
			tag: 'li'
//			etype: 'html:li'
		}
	}

}, 'widgets:list');



Ergo.defineClass('Ergo.widgets.OrderedList', {

	extends: 'Ergo.widgets.List',

	defaults: {
		tag: 'ol'
	}

}, 'widgets:o-list');
