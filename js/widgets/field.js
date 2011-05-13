
//= require "native"
//= require <layouts/hbox>
//= require <extensions/focusable>


Dino.declare('Dino.widgets.Field', 'Dino.core.Widget', {
	
	$html: function() {return '<div/>';},
	
	defaultOptions: {
		cls: 'dino-field',
		layout: 'hbox',
    components: {
      input: {
        dtype: 'input',
				width: 'auto',
				events: {
					'focus': function(e, w) {
						w.parent.setFocus();
					}
				}
      }
    },
		extensions: [Dino.Focusable],
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
		Dino.widgets.Field.superclass.$dataChanged.apply(this, arguments);
		
		if(this.options.rawValueOnFocus && this.hasFocus()) 
			this.input.el.val( this.getRawValue() );
		else
			this.input.el.val( this.getValue() );
	}	
	
}, 'field');
