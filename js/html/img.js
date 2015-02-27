

/**
 * Виджет для <img>
 * 
 * etype: html:img
 *  
 * опции:
 * 	- src
 * 
 * @class
 * @name Ergo.html.Img
 * @extends Ergo.core.Widget
 */
Ergo.defineClass('Ergo.html.Img', 'Ergo.core.Widget', {
	
	defaults: {
		html: '<img/>'
	},
	
	set_src: function(v) {
		this.el.attr('src', v);
	} 
	
}, 'html:img');
