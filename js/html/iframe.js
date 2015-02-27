

/**
 * Виджет для <iframe>
 * 
 * etype: html:iframe
 *  
 * опции:
 * 	- src
 * 
 * @class
 * @name Ergo.html.Iframe
 * @extends Ergo.core.Widget
 */
Ergo.defineClass('Ergo.html.Iframe', 'Ergo.core.Widget', {
	
	defaults: {
		html: '<iframe/>'
	},
	
	set_src: function(v) {
		this.el.attr('src', v);
	}
	
}, 'html:iframe');
