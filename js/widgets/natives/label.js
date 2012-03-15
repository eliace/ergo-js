
//= require <core/widget>


/**
 * Метка
 * 
 * Обертка для тега <label/>
 * 
 * @class
 * @name Ergo.widgets.Label
 * @extends Ergo.core.Widget
 */
Ergo.declare('Ergo.widgets.Label', 'Ergo.core.Widget', /** @lends Ergo.widgets.Label.prototype */{

	defaults: {
		html: '<label/>',
		binding: true
	},

//	$html: function() { return '<label></label>'; },
	
	$opt: function(o) {
		this.$super(o);
//		Ergo.widgets.Label.superclass.$opt.call(this, o);
		
//		if('text' in o)
//			this.el.text(o.text);
		if('forName' in o)
			this.el.attr('for', o.forName);
	},
	
	$dataChanged: function() {
		if(this.options.binding) this.el.text(this.getValue());		
	}
	
}, 'label');
