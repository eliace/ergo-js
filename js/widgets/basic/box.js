


/**
 * Блочный элемент, у которого все дочерние элементы тоже имеют тип `box`
 *
 * :`box`
 *
 * @class
 * @name Ergo.widgets.Box
 * @extends Ergo.core.Widget
 */
Ergo.defineClass('Ergo.widgets.Box', 'Ergo.core.Widget',  /** @lends Ergo.widgets.Box.prototype */{

	defaults: {
		tag: 'div',
//		html: '<div/>',
		defaultItem: {
			etype: 'box'
		},
		defaultComponent: {
			etype: 'box'
		}
	}

}, 'widgets:box');
