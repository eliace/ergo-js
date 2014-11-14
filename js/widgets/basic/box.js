


/**
 * Простой <div/>, у которого дочерние виджеты по умолчанию тоже имеют тип "box"
 *  
 * `etype: 'box'`
 * 
 * @class
 * @name Ergo.widgets.Box
 * @extends Ergo.core.Widget
 */
Ergo.defineClass('Ergo.widgets.Box', 'Ergo.core.Widget',  /** @lends Ergo.widgets.Box.prototype */{
	
	defaults: {
		html: '<div/>',
		defaultItem: {
			etype: 'box'
		},
		defaultComponent: {
			etype: 'box'
		}
	}
	
}, 'widgets:box');
