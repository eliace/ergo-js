
/**
 * @namespace Ergo.html
 */


//= require iframe
//= require input
//= require text-input
//= require checkbox
//= require radio
//= require select
//= require textarea
//= require button
//= require img
//= require label
//= require a
//= require text
//= require form



/**
 * Основной класс для виджетов пространства имен $html
 *
 * etype: html:widget
 *
 * @class
 * @name Ergo.html.Widget
 * @extends Ergo.core.Widget
 */
Ergo.defineClass('Ergo.html.Widget', null, {

	extends: 'Ergo.core.Widget',

	defaults: {
	}

}, 'html:widget');



Ergo.$html = function(o, etype) {

	if(!Ergo.alias('html:'+etype)) {

//		var _etype = etype;

// 		var i = etype.indexOf(':');
// 		if(i > 0) {
// //			ns = etype.substr(0, i);
// 			etype = etype.substr(i+1);
// 		}

		// var _o = $.isArray(o) ? o[o.length-1] : o;
//
// //		o.etype = 'html:widget';
		// _o.html = '<'+_etype+'/>';

//		o.unshift({html: '<'+etype+'/>'});
		o.unshift({tag: etype});

		etype = 'widget';
	}

	return Ergo.object('html', o, etype);
};
