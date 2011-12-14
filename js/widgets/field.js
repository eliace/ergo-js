
//= require <layouts/hbox>
//= require <extensions/focusable>
//= require "natives/all"
//= require "images/all"


Ergo.declare('Ergo.widgets.Field', 'Ergo.widgets.Box', {
	
//	$html: function() {return '<div/>';},
	
	defaults: {
		cls: 'ergo-field',
		layout: 'hbox',
    components: {
      input: {
        etype: 'input',
				autoWidth: true,
				role: 'input',
				events: {
					'focus': function(e, w) {
						w.parent.setFocus();
					}
				}
      }
    },
		extensions: ['focusable'],
		onFocus: function() {
			var o = this.options;
			if(o.rawValueOnFocus)
				this.input.el.val(this.data.get());			
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
			this.input.el.val( this.data.get() );
		else
			this.input.el.val( this.getValue() );
	}	
	
}, 'field');
