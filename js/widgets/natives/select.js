
//= require <core/container>


/**
 * @class
 * @name Ergo.widgets.form.SelectOption
 * @extends Ergo.core.Widget
 */
Ergo.declare('Ergo.widgets.SelectOption', 'Ergo.core.Widget', /** @lends Ergo.widgets.form.SelectOption.prototype */{
	
	$html: function() { return '<option/>'; },
	
	$opt: function(o) {
		this.$super(o);
//		Ergo.widgets.SelectOption.superclass.$opt.apply(this, arguments);
		
		if('value' in o) this.el.attr('value', o.value);
		if('text' in o) this.el.text(o.text);
	}
	
}, 'select-option')



/**
 * @class
 * @name Ergo.widgets.form.Select
 * @extends Ergo.core.Container
 */
Ergo.declare('Ergo.widgets.Select', 'Ergo.core.Container', /** @lends Ergo.widgets.form.Select.prototype */{
	$html: function() { return '<select/>'; },
	
	defaults: {
		components: {
			optionsList: {
				etype: 'container',
				defaultItem: {
					etype: 'select-option'
				}
			}
		},
		optionsKey: 0,
		optionsValue: 1
	},
	
	$init: function(o) {
		this.$super(o);
//		Ergo.widgets.Select.superclass.$init.call(this, o);
		
		if('options' in o) {
			var items = [];
			var opt_key = o.optionsKey; 
			var opt_val = o.optionsValue;
			for(var i = 0; i < o.options.length; i++) {
				var opt = o.options[i];
				if($.isArray(opt) || $.isPlainObject(opt))
					items.push({ value: opt[opt_key], text: opt[opt_val] });
				else
					items.push({ value: i, text: opt });				
			}
			o.components.optionsList.items = items;
		}
	},
	
	
	$construct: function(o) {
		o.components.optionsList.layout = new Ergo.layouts.InheritedLayout({parentLayout: this.layout });

		this.$super(o);
//		Ergo.widgets.Select.superclass.$construct.apply(this, arguments);		
	},
	
		
	$opt: function(o) {
		this.$super(o);
//		Ergo.widgets.Select.superclass.$opt.call(this, o);
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
		this.$super(self);
//		Ergo.widgets.Select.superclass.$events.call(this, self);
		
		this.el.change(function() { self.setValue( self.el.val() ); });
	},
	
	$dataChanged: function() {
		this.$super();
//		Ergo.widgets.Select.superclass.$dataChanged.call(this);
		this.el.val( this.getValue() );
	}
	
}, 'select');
