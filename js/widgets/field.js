
//= require <widgets/natives/all>
//= require <extensions/focusable>


Ergo.declare('Ergo.widgets.Field', 'Ergo.widgets.Box', {
	
	defaults: {
		cls: 'e-field',
		extensions: ['focusable'],
		components: {
			label: {
				cls: 'e-field-label',
				content: {
					etype: 'label'
				}
			},
			content: {
				cls: 'e-field-content'
			}
		},
		fieldContent: {},
		set: {
			'label': function(v) { this.label.opt('text', v); }
		}
	},
	
	
	$init: function(o) {
		this.$super(o);
		
		o.components.content.content = o.fieldContent;
	}
	
}, 'field');
