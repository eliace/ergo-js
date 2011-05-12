
//= require <widgets/combo-field>



Dino.declare('Dino.widgets.TextField', 'Dino.widgets.ComboField', {
	
	defaultCls: 'dino-text-field',
	
	defaultOptions: {
		events: {
			'click': function(e) {
				e.stopPropagation();
			}
		},
//		components: {
//			input: {
//        updateOnValueChange: true,
//				format: function(val) {
//					var po = this.parent.options;
//					if(po.format) val = po.format.call(this, val);
//					var empty_val = (val === '' || val === null || val === undefined);
//					this.states.toggle('default-text', empty_val);
//					return (empty_val) ? po.defaultText : val;
//				},
//				parser: function(val) {
//					return (this.parent.options.parser) ? this.parent.options.parser.call(this, val) : val;
//				}
//			}			
//		},
		onFocus: function() {
//			else
//				this.input.el.val(this.getValue());

			if(this.states.is('default-text')) {
				this.input.el.val(this.getRawValue());
				this.states.clear('default-text');				
			}
			
//			this.states.toggle('default-text', false);
			
//			if(this.states.is('default-text')) {
////				this.input.el.val(this.getRawValue());
//				this.states.clear('default-text');
//			}				
		},
		onBlur: function() {
			var o = this.options;
			if(o.changeOnBlur)
				this.setValue( this.input.el.val() );
//			this.states.toggle('default-text', false);
		},
		changeOnBlur: true,
    updateOnValueChange: true,
		defaultText: '',
		
		format: function(val) {
			var o = this.options;
			var empty_val = (val === '' || val === null || val === undefined);
			this.states.toggle('default-text', empty_val);
			return (empty_val) ? o.defaultText : val;
		}
	}	
	
//	$opt: function(o) {
//		Dino.widgets.TextField.superclass.$opt.apply(this, arguments);
//		
//		if('defaultText' in o) {
//			this.input			
//		}
//		
//	}
	
}, 'text-field');
