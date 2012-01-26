


Ergo.declare('Ergo.widgets.SelectField2', 'Ergo.widgets.Field2', {
	
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
					w.getParent(Ergo.widgets.Field2).setFocus();
				},
				'blur': function(e, w) {
					w.getParent(Ergo.widgets.Field2).clearFocus();
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
	
}, 'select-field-2');
