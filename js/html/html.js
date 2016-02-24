
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
Ergo.defineClass('Ergo.html.Widget', {

	extends: 'Ergo.core.Widget',

	defaults: {
	}

}, 'html:widget');




/**
 * Универсальный виджет для простых html-элементов
 *
 * etype: `widgets:html`
 *
 * Свойства: `href`, `forName`, `checked`, `src`, `type`, `placeholder`
 *
 * @class
 * @name Ergo.widgets.Html
 * @extends Ergo.core.Widget
 */

Ergo.defineClass('Ergo.widgets.Html', /** @lends Ergo.widgets.Html.prototype */{

	extends: 'Ergo.core.Widget',

	defaults: {
		defaultItem: {
			etype: 'html'
		},
		defaultComponent: {
			etype: 'html'
		}
	},

	props: {
		'href': $ergo.DOMAttribute,
		'forName': {
			set: function(v) { this.vdom.el.setAttribute('for', v) },
			get: function(v) { return this.vdom.el.getAttribute('for') }
		},
		'checked': {
			set: function(v) { this.vdom.el.checked = !!v; },//setAttribute('checked', '') : this.vdom.el.removeAttribute('checked') },
			get: function(v) { return this.vdom.el.checked; }//.hasAttribute('checked') }
		},
		'src': $ergo.DOMAttribute,
		'type': $ergo.DOMAttribute,
		'placeholder': $ergo.DOMAttribute,
	}

}, 'widgets:html');







Ergo.$html = function(etype, o) {

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

	return Ergo.object('html', etype, o);
};
