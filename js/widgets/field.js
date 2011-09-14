
//= require <layouts/hbox>
//= require <extensions/focusable>
//= require "natives/all"
//= require "images/all"


Ergo.declare('Ergo.widgets.Field', 'Ergo.core.Widget', {
	
	$html: function() {return '<div/>';},
	
	defaults: {
		cls: 'ergo-field',
		layout: 'hbox',
    components: {
      input: {
        etype: 'input',
				width: 'auto',
				events: {
					'focus': function(e, w) {
						w.parent.setFocus();
					}
				}
      }
    },
		extensions: [Ergo.Focusable],
		onFocus: function() {
			var o = this.options;
			if(o.rawValueOnFocus)
				this.input.el.val(this.getRawValue());			
		},
		onKeyDown: function(e) {
			var o = this.options;
			if(e.keyCode == 13) {
				if(o.changeOnEnter)
					this.setValue( this.input.el.val() );
			}
		}
	},
	
	$dataChanged: function() {
		this.$super();
//		Ergo.widgets.Field.superclass.$dataChanged.apply(this, arguments);
		
		if(this.options.rawValueOnFocus && this.hasFocus()) 
			this.input.el.val( this.getRawValue() );
		else
			this.input.el.val( this.getValue() );
	}	
	
}, 'field');
