
//= require <widgets/natives/box>

Ergo.declare('Ergo.widgets.Switcher', 'Ergo.widgets.Box', {
	
	defaults: {
		cls: 'e-choice',
		components: {
			left: {
				etype: 'label',
				binding: false
			},
			content: {
				content: {
					text: '|||'
				}
			},
			right: {
				etype: 'label',
				binding: false
			}
		},
		onClick: function() {
			this.setValue(!this.getValue());
//			this.opt('value', !this.opt('value'));
//			this.states.toggle('checked');
		},
		
		binding: function(v) {
			this.states.toggle('checked', v);
		},
		
		set: {
			'left': function(v) { this.left.opt('text', v); },
			'right': function(v) { this.right.opt('text', v); }
		}
		
		// value: function(v) {
			// if(arguments.length == 0)
				// return this.states.is('checked');
			// else
				// this.states.toggle('checked', v);
		// }
	}
	
/*	
	setValue: function(val) {
		var o = this.options;
		
		if(this.data){
			o.store ? o.store.call(this, val) : this.data.set(val);
		}
		else {
			this.states.toggle('checked', v);
		}		
		
	},
	
	getValue: function() {
		var val;
		var o = this.options;
		if(this.data)
			val = this.data.get();
		else
			val = this.states.is('checked');
		
		// если присутствует функция форматирования, то используем ее
		if(this.options.format)
			val = o.format.call(this, val);		
		
		return val;
		
	}
*/	
	
}, 'switcher');
