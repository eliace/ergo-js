


Dino.declare('Dino.widgets.TextField', 'Dino.widgets.ComboField', {
	
	defaultCls: 'dino-text-field',
	
	defaultOptions: {
		events: {
			'click': function(e) {
				e.stopPropagation();
			}
		},
		components: {
			input: {
        updateOnValueChange: true,
				events: {
					'focus': function(e, w) {
						w.parent.setFocus();
						if(w.states.is('default-text')) {
							w.el.val(w.getRawValue());
							w.states.clear('default-text');
						}
					}
				},
				format: function(val) {
					var empty_val = (val === '' || val === null || val === undefined);
					this.states.toggle('default-text', empty_val);
					return (empty_val) ? this.parent.options.defaultText : val;
				}
			}			
		},
		extensions: [Dino.Focusable],
		onFocus: function() {
		},
		onBlur: function() {
			var o = this.options;
			if(o.changeOnBlur)
				this.setValue( this.input.el.val() );
		},
		changeOnBlur: true,
		defaultText: ''
	},
	
	
	$opt: function(o) {
		Dino.widgets.TextField.superclass.$opt.apply(this, arguments);
		
//		if('defaultText' in o) {
//			this.input			
//		}
		
	}
	
}, 'text-field');
