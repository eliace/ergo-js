
//= require <widgets/field>


Ergo.declare('Ergo.widgets.SelectField', 'Ergo.widgets.Field', {
	
	defaults: {
		fieldContent: {
			tabIndex: 0,
			cls: 'e-select',
			components: {
				text: {
					cls: 'e-current-select'
				}
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
					w.parent(Ergo.widgets.Field).setFocus();
				},
				'blur': function(e, w) {
					w.parent(Ergo.widgets.Field).clearFocus();
				}
			}
		},
		buttons: [{
			iconCls: 'arrow-down'
		}]
	},
	
	
	$init: function(o) {
		o.fieldContent.items = o.buttons;
		this.$super(o);
	}
	
}, 'select-field');
