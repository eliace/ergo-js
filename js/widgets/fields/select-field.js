
//= require <widgets/field>


Ergo.declare('Ergo.widgets.SelectField', 'Ergo.widgets.Box', {
	
	defaults: {
		
		tabIndex: 0,
		cls: 'e-select-field',

		content: {
			cls: 'e-current-select'
		},
		
		defaultItem: {
			cls: 'e-select-arrow',
			components: {
				icon: {
					etype: 'box'
				}
			}
		},
		events: {
			'focus': function(e, w) {
//					w.getParent(Ergo.widgets.Field).setFocus();
			},
			'blur': function(e, w) {
//					w.getParent(Ergo.widgets.Field).clearFocus();
			}
		},

		buttons: [],
		
		set: {
			'text': function(v) {
				this.content.opt('text', v);
			}
		}
	},
	
	
	$init: function(o) {
//		o.fieldContent.items = o.buttons;
		this.$super(o);

		o.items = o.buttons;
	}
	
}, 'select-field');
