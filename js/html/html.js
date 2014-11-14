
/**
 * @namespace Ergo.html 
 */


//= require "iframe"
//= require "input"
//= require "select"
//= require "textarea"
//= require "button"
//= require "img"



/**
 * Основной класс для виджетов пространства имен $html
 * 
 * etype: html:widget
 *  
 * @class
 * @name Ergo.html.Widget
 * @extends Ergo.core.Widget
 */
Ergo.defineClass('Ergo.html.Widget', 'Ergo.core.Widget', {
	
	defaults: {
	}
	
}, 'html:widget');



Ergo.$html = function(o, etype) {
	
	if(!Ergo.alias(etype)) {
		
//		var _etype = etype;
		
		var i = etype.indexOf(':');
		if(i > 0) {
//			ns = etype.substr(0, i);
			etype = etype.substr(i+1);
		}
		
		// var _o = $.isArray(o) ? o[o.length-1] : o;
// 		
// //		o.etype = 'html:widget';
		// _o.html = '<'+_etype+'/>';
		
		o.unshift({html: '<'+etype+'/>'});
		
		etype = 'html:widget';
	}
	
	return Ergo.object(o, etype);
};

