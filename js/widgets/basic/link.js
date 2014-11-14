


/**
 * <a href="#"/>
 *  
 * `etype: 'link'`
 * 
 * Опции:
 * 	`href`
 * 
 * @class
 * @name Ergo.widgets.Link
 * @extends Ergo.core.Widget
 */
Ergo.defineClass('Ergo.widgets.Link', 'Ergo.core.Widget', /** @lends Ergo.widgets.Link.prototype */{
	
	defaults: {
		html: '<a href="#"/>',
		binding: 'text'
	},
	
	set_href: function(v) {
		this.el.attr('href', v);
	}
	
}, 'widgets:link');
