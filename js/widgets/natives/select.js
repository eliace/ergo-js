
//= require <core/widget>


/**
 * @class
 * @name Dino.widgets.form.SelectOption
 * @extends Dino.core.Widget
 */
Dino.declare('Dino.widgets.SelectOption', 'Dino.core.Widget', /** @lends Dino.widgets.form.SelectOption.prototype */{
	
	$html: function() { return '<option/>'; },
	
	$opt: function(o) {
		Dino.widgets.SelectOption.superclass.$opt.apply(this, arguments);
		
		if('value' in o) this.el.attr('value', o.value);
		if('text' in o) this.el.text(o.text);
	}
	
}, 'select-option')



/**
 * @class
 * @name Dino.widgets.form.Select
 * @extends Dino.core.Container
 */
Dino.declare('Dino.widgets.Select', 'Dino.core.Container', /** @lends Dino.widgets.form.Select.prototype */{
	$html: function() { return '<select/>'; },
	
	defaults: {
		components: {
			optionsList: {
				dtype: 'container',
				defaultItem: {
					dtype: 'select-option'
				}
			}
		},
		optionsKey: 0,
		optionsValue: 1
	},
	
	$init: function(o) {
		Dino.widgets.Select.superclass.$init.call(this, o);
		
		o.components.optionsList.layout = new Dino.layouts.InheritedLayout({parentLayout: this.layout });
		
		if('options' in o) {
			var items = [];
			var opt_key = o.optionsKey; 
			var opt_val = o.optionsValue;
			for(var i = 0; i < o.options.length; i++) {
				var opt = o.options[i];
				if(Dino.isArray(opt) || Dino.isPlainObject(opt))
					items.push({ value: opt[opt_key], text: opt[opt_val] });
				else
					items.push({ value: i, text: opt });				
			}
			o.components.optionsList.items = items;
		}
	},
	
	
	$opt: function(o) {
		Dino.widgets.Select.superclass.$opt.call(this, o);
/*		
		if('options' in o){
			this.el.empty();
			for(var i in o.options){
				var option_el = $('<option/>');
				option_el.attr('value', i);
				option_el.text(o.options[i]);
				this.el.append(option_el);
			}
		}
*/		
		if('disabled' in o) this.el.attr('disabled', o.disabled);
		
	},
	
	$events: function(self) {
		Dino.widgets.Select.superclass.$events.call(this, self);
		
		this.el.change(function() { self.setValue( self.el.val() ); });
	},
	
	$dataChanged: function() {
		Dino.widgets.Select.superclass.$dataChanged.call(this);
		this.el.val( this.getValue() );
	}
	
}, 'select');
